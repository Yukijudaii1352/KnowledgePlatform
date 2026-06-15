### 回顾式智能体 (Retroformer)

```yaml
id: retroformer
name: Retroformer
full_name: 回顾式智能体 (Retroformer)
year: '2024'
org: Salesforce
paper_url: https://proceedings.iclr.cc/paper_files/paper/2024/hash/29f421fbdcc82aeb349d784d3aaccdb3-Abstract-Conference.html
category: planning
parent: reflexion
motivation: 策略梯度优化反思模块加速学习
```

#### 📝 一句话总结

Retroformer 将 Reflexion 中的反思模块改造成可训练的 retrospective model，用环境奖励和策略梯度优化反思文本，从而在不更新 Actor LLM 的情况下提升语言智能体的学习速度和最终成功率。

#### 🎯 核心要点

- **可训练反思模块**：学习一个 plug-in retrospective model，而不是依赖冻结 LLM 直接自我反思
- **Actor LLM 固定**：把闭源或大规模 Actor LLM 视作环境的一部分，不反传梯度
- **环境奖励驱动**：利用任务成功率、分数或 reward-labeled 数据优化反思生成
- **策略梯度/RLHF 流程**：先用正样本 SFT，再进行 reward modeling 和 PPO 风格优化
- **自动 prompt refinement**：反思模型总结失败根因，并生成下一轮 Actor prompt 的行动建议
- **长上下文反思**：实验中使用 LongChat-7B-16k 类模型承载长轨迹与反馈
- **插件式适配**：可插入 ReAct/Reflexion 类 agent 架构，也可扩展到记忆或摘要模块

#### 🔬 深入细节

##### 核心示意图

![Retroformer 框架图](https://ar5iv.labs.arxiv.org/html/2308.02151/assets/x2.png)
*图：Retroformer 框架总览。冻结 Actor LLM 执行任务，retrospective model 根据历史轨迹与环境反馈生成改进 prompt，并通过策略优化学习更有用的反思。图源：ar5iv 论文 HTML。*

##### 算法伪代码

```python
# Retroformer 训练与推理伪代码
def collect_retroformer_data(actor_llm, retro_model, tasks, env, n_trials):
    dataset = []
    for task in tasks:
        memory = []
        for _ in range(n_trials):
            refined_prompt = retro_model.generate(task, memory)
            trajectory = actor_llm.run(refined_prompt, env)
            reward, feedback = env.evaluate(trajectory)
            dataset.append((task, memory, refined_prompt, trajectory, reward, feedback))
            memory.append((trajectory, reward, feedback))
    return dataset

def train_retroformer(retro_model, dataset):
    positive = [x for x in dataset if x.reward > success_threshold]
    retro_model.sft(positive)
    reward_model = train_reward_model(dataset)
    retro_model.ppo(
        prompts=[x.task_and_memory for x in dataset],
        reward_fn=lambda prompt, reflection: reward_model(prompt, reflection)
    )
    return retro_model

def run_retroformer(task, actor_llm, retro_model, env, max_trials):
    memory = []
    for _ in range(max_trials):
        prompt_update = retro_model.generate(task, memory)
        trajectory = actor_llm.run(prompt_update, env)
        reward, feedback = env.evaluate(trajectory)
        if env.success(reward):
            return trajectory
        memory.append((trajectory, reward, feedback))
```

##### 方法解读

Reflexion 的反思来自冻结 LLM，它可能只能复述过去行为，而不能准确定位失败根因。Retroformer 认为这本质上是 credit assignment 问题：哪一步行动导致最终失败，下一轮 prompt 应该怎样改？如果反思模块从未针对环境奖励训练，它生成的建议很容易泛泛而谈。

Retroformer 的架构把 Actor LLM 和环境一起视作黑盒。Actor 可以是 GPT-3、GPT-4 或其他无法微调的模型；环境提供状态转移和奖励。可训练部分是 retrospective model \(M_r\)，它读取用户任务、历史轨迹、奖励和反馈，输出一段 refined prompt 或行动计划给 Actor。

优化目标不是直接最大化 Actor 的 token 概率，而是让 \(M_r\) 生成的反思使后续轨迹获得更高奖励。可概括为：

$$\max_{\phi}\ \mathbb{E}_{y\sim M_\phi(\cdot\mid x,m)}[R(\tau(y))] - \beta\,\mathrm{KL}(M_\phi \parallel M_{\text{ref}})$$

其中 \(y\) 是反思文本，\(\tau(y)\) 是 Actor 在该反思指导下产生的轨迹，\(R\) 是环境奖励，KL 项约束反思模型不要偏离参考模型过远。

实践中，论文采用离线 RL 流程：先 rollout 冻结 Actor 和初始化反思模型，收集带评分数据；用高分样本做监督微调；再训练 reward model 并用 PPO 优化 retrospective model。这样避免在线直接对昂贵 Actor 大规模探索，同时仍能利用奖励信号改进反思。

与 Reflexion 相比，Retroformer 的学习发生在反思生成器参数中；与传统 RL 微调 LLM agent 相比，它不需要访问 Actor 参数，也不把梯度穿过外部环境和工具。这个折中适合云端闭源 LLM 场景：保留强 Actor 的能力，同时用小型反思模块针对任务奖励学习。

> 💡 关键：Retroformer 不是训练 Actor 怎么行动，而是训练“给 Actor 的下一轮提示应该如何总结失败和规划改进”。

#### 🧪 练习题

```yaml
question: "Retroformer 相比 Reflexion 的核心改进是什么？"
options:
  - "取消反思记忆，只保留一次性回答"
  - "用策略梯度优化一个可训练的 retrospective model 来生成更有用的反思"
  - "把所有环境反馈替换为人工标签"
  - "要求直接微调闭源 Actor LLM"
answer: 1
explain: "Retroformer 保持 Actor LLM 固定，训练反思模块利用环境奖励生成更能提升后续尝试的 prompt refinement。"
```
