### WebRL: 自演化在线课程网页强化学习 (WebRL)

```yaml
id: webrl
name: WebRL
full_name: 自演化在线课程网页强化学习 (WebRL)
year: '2024.11'
org: Tsinghua/Zhipu AI
paper_url: https://arxiv.org/abs/2411.02337
category: online_rl
parent: agent_q
motivation: 以自演化课程缓解稀疏网页奖励
```

#### 📝 一句话总结
WebRL提出自演化在线课程强化学习框架，通过从失败任务中自动生成新课程任务 + 结果监督奖励模型(ORM) + 自适应RL策略，将开源Llama-3.1-8B在WebArena-Lite上的成功率从4.8%提升至42.4%，超越GPT-4o(13.9%)等闭源模型。

#### 🎯 核心要点
- **自演化课程(Self-Evolving Curriculum)**：从模型执行失败的任务出发，使用GPT-4o生成语义相似但难度递增的新任务，8个阶段逐步扩展训练任务池
- **结果监督奖励模型(ORM)**：在WebArena-Lite 1,186条轨迹基础上，通过指令改写+跨基线方法采集12,200条轨迹训练ORM，提供离散成功/失败二元信号
- **自适应强化学习策略**：基于PPO + KL散度约束（约束模型输出分布不偏离SFT模型），融合经验回放缓冲区中的历史成功数据
- **双层价值函数**：instruction-level critic评估整体任务完成概率，step-level critic评估当前步骤的即时价值
- **重放缓冲区筛选机制**：仅保留perplexity在 [1/0.95, 1/0.5] 之间的历史数据，避免数据质量退化
- **开源突破**：将Llama-3.1-8B提升至42.4%，GLM-4-9B至43%，Llama-3.1-70B至49.1%，全面超越GPT-4系列

#### 🔬 深入细节
##### 1. 核心框架图

![WebRL Framework Overview](https://arxiv.org/html/2411.02337v3/x1.png)
*图1：WebRL框架总览——包含(1)自演化课程从失败样本中生成新任务，(2)ORM提供结果监督奖励，(3)自适应RL策略融合在线探索与历史经验回放，(4)基于PPO+KL约束的策略优化。*

##### 2. 算法伪代码

Algorithm 1: WEBRL Training Process
─────────────────────────────────────────────────
Input: SFT-trained policy π_sft, WebArena-Lite training set D_train
Output: Trained policy π_θ

1. Fine-tune π_θ from open LLM using SFT on D_train
2. Initialize replay buffer B ← ∅, failure set F ← ∅
3. Run π_θ on D_train instructions to populate B and F
4. for phase = 1 to 8 do:
5.     // Self-Evolving Curriculum
6.     if phase > 1 then
7.         select 500 new instructions from GPT-4o generated set
             that satisfy filtering criteria
8.         add selected instructions to training set
9.     end if
10.    // Online Interaction
11.    for each instruction in current training set do:
12.        rollout trajectory τ = (s_1,a_1,...,s_T,a_T) using π_θ
13.        compute ORM reward R(τ) ∈ {0,1}
14.        add (τ, R) to replay buffer B
15.        if R=0: add instruction to failure set F
16.    end for
17.    // Curriculum Generation (for next phase)
18.    if phase < 8:
19.        for each failed instruction in F:
20.            prompt GPT-4o to generate similar but harder tasks
21.    // Adaptive RL Training
22.    sample historical data from B where ppl ∈ [1/0.95, 1/0.5]
23.    (limit historical samples to 2× current interaction data)
24.    train actor π_θ and critic V using PPO with KL constraint
         （对instruction-level reward + step-level advantage）
25. end for
26. return π_θ

##### 3. 深入方法解释

**动机与背景**。LLM网页智能体在WebArena等真实环境中展现出强大潜力，但现有方案严重依赖GPT-4等昂贵闭源API。开源LLM（如Llama-3.1-8B）直接使用时成功率仅4.8%，即使经过SFT也仅提升至约15%。核心挑战有三：(1)**训练任务稀缺**——WebArena-Lite仅提供812个训练任务，远不足以覆盖网页交互的多样性；(2)**反馈信号稀疏**——网页任务只有最终的二元成功/失败信号，无中间步骤反馈；(3)**在线策略漂移**——RL训练中策略不断变化，历史数据分布与当前策略不匹配。

**自演化课程**。WebRL最核心的创新是自我演化课程机制。模型首先在初始训练集上执行任务，收集失败案例。然后利用GPT-4o作为"任务生成器"，提示GPT-4o基于每个失败任务生成语义相似但难度更高的新任务（如改变搜索条件、增加约束、引入干扰项）。新任务需满足过滤标准（与已有任务不重复、符合WebArena环境约束等），每个阶段筛选500个高质量任务加入训练池。8个阶段后，任务多样性大幅提升，模型逐步从简单任务过渡到复杂长序列任务。

**结果监督奖励模型(ORM)**。由于网页任务只能获得二元成功/失败结果，WebRL训练了一个多步结果监督奖励模型(MORM)。训练数据构建：在WebArena-Lite的1,186条原始轨迹基础上，(1)通过指令改写扩充任务，(2)使用SFT/Filtered BC/AWR/DigiRL等多种基线方法在新任务上采集rollouts，(3)使用环境提供的replay函数自动标注每条轨迹的成功/失败。最终获得12,200条标注轨迹训练ORM，在验证集上达到92.6%的准确率。

> 💡 关键：ORM将"是否成功完成网页任务"建模为序列级别的二分类问题，输入为完整动作轨迹，输出为{0,1}二元奖励，替代了传统RL中的手工奖励函数。

**自适应RL训练**。策略优化采用PPO算法，并引入两项关键设计：
- **KL散度约束**：对策略输出分布施加KL惩罚 \\(D_{KL}(\pi_{\theta} \| \pi_{sft})\\)，防止策略在RL微调中偏离原始SFT模型过远导致灾难性遗忘。
- **双层Critic架构**：Instruction-level critic \\(V_{\text{inst}}(x)\\) 评估整个任务的期望成功率（用于最终奖励分配），Step-level critic \\(V_{\text{step}}(h_t)\\) 评估在已执行历史 \\(h_t\\) 下完成任务的概率（用于逐步骤优势估计）。

经验回放缓冲区采用**perplexity筛选**机制：仅保留模型在当前策略下perplexity在 [1/0.95, 1/0.5] 之间的历史轨迹进行重放，排除过于简单(perplexity过低)或过于困难/异常(perplexity过高)的数据，且历史数据量限制为当前交互数据量的2倍。

**与传统方法的差异**。相比DigiRL（在固定任务集上在线学习），WebRL通过课程机制持续扩展任务空间，使模型不断增强对长序列任务的鲁棒性。对比AWR（Advantage Weighted Regression），WebRL的PPO+KL约束提供了更稳定的策略更新。实验表明，去除课程学习后性能从42.4%降至20.6%，去除重放缓冲区后降至32.7%，验证了每个组件的关键作用。

#### 🧪 练习题
```yaml
question: "WebRL的自演化课程机制的核心作用是什么？"
options:
  - "加速模型训练收敛速度"
  - "从失败任务中自动生成难度递增的新任务，扩充训练任务空间，解决任务稀缺问题"
  - "减少对GPT-4o API的依赖"
  - "提高ORM奖励模型的训练精度"
answer: 1
explain: "自演化课程利用GPT-4o基于模型失败的任务生成语义相似但难度更高的新任务，通过8个阶段逐步扩展训练任务池，直接解决了WebArena训练任务不足的瓶颈。"
```
