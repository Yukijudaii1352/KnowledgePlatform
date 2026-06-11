### AGILE: 环境交互学习代理 (AGILE)

```yaml
id: agile
name: AGILE
full_name: 环境交互学习代理 (AGILE)
year: '2024.05'
org: ByteDance Research
paper_url: https://arxiv.org/abs/2405.14751
category: online_rl
parent: werewolf_rl
motivation: 把记忆工具求助纳入统一RL代理
```

#### 📝 一句话总结
AGILE 将 LLM、记忆、工具和执行器统一成一个 token 级强化学习代理，并把“向人类专家求助”也做成可学习动作，从而让模型在复杂问答中同时学会检索、调用工具、反思和控制求助成本。

#### 🎯 核心要点
- 把 agent 形式化为 token-level MDP：LLM 是策略，状态由 `context + memory` 组成，executor 负责执行函数动作并推动环境转移。
- 统一四个核心模块：`LLM / memory / tools / executor`，并允许与用户和人类专家交互。
- 定义显式函数动作集：`[GetQuestion]`、`[RetrieveMemory]`、`[SeekAdvice]`、`[Reflection]`、`[UpdateMemory]`、`[SearchProduct]`、`[PredictAnswer]`、`[SubmitAnswer]`、`[ClearContext]`。
- 训练采用两阶段：先用带动作标注的轨迹做 imitation learning，再对 action token 做 PPO 优化。
- 提出 ProductQA 基准：88,229 条问答、26 个商品品类任务，重点考察工具使用、记忆利用、反思与适应新类别能力。
- 把“求助专家”建模为带成本的动作；模型既能用它保证当前正确率，也能通过 reflection 把专家反馈蒸馏进 memory。

#### 🔬 深入细节
![AGILE 框架图](https://ar5iv.labs.arxiv.org/html/2405.14751/assets/x1.png)
*图：AGILE 由 LLM、memory、tools 和 executor 组成，executor 解释函数 token 并把环境反馈重新写回上下文。*

```python
# AGILE 的抽象执行与训练流程
context = ["[BOS]"]
memory = init_memory()

while not done:
    action = llm.sample(context)  # 动作空间就是词表 token
    context.append(action)

    if action in FUNCTIONS:
        context, memory, reward, done = executor.step(
            action=action,
            context=context,
            memory=memory,
            env=environment,
        )

# 仅对 action token 做 IL / PPO 更新
ppo_update(policy=llm, action_tokens=trajectory.actions, rewards=trajectory.rewards)
```

论文的核心建模不是“再给 LLM 加几个外挂模块”，而是把整个 agent 过程直接写成 RL。若记 `context` 为 \(c_t\)、memory 为 \(m_t\)，则状态可写作 \(s_t=(c_t,m_t)\)，动作 \(a_t\) 则是词表中的一个 token。只要这个 token 命中某个注册函数名，executor 就会执行相应逻辑，把搜索结果、检索到的记忆或专家反馈附加回上下文，再把控制权交回 LLM。这样一来，工具调用、记忆读写、清空上下文等都进入了同一策略空间。

AGILE 的关键不是普通的 tool use，而是 executor 驱动的“函数 token”机制。论文 Table 1 明确给出一组函数：`[GetQuestion]` 负责向用户取题，`[RetrieveMemory]` 从 memory 追加相关条目，`[SearchProduct]` 调产品搜索工具，`[SeekAdvice]` 请求人类专家答案，`[UpdateMemory]` 把上下文片段写回记忆，`[ClearContext]` 将上下文重置到 `[BOS]`。其中 `[Reflection]` 和 `[PredictAnswer]` 是轻量动作，本身不执行外部副作用，而是让模型继续生成反思文本或答案文本。论文还特别说明，executor 可以删除部分旧上下文，因此训练时真正看到的 \(c_i\) 不一定等于所有历史 token 的简单拼接。

“求助专家”是这篇论文最有辨识度的设计。对于 ProductQA，提交错误答案奖励为 \(0\)，提交正确答案奖励为 \(1\)，若先求助再正确回答，总奖励为 \(1-c\)，其中 \(c\) 是求助成本，因此单轮奖励集合为 \(\{0, 1, 1-c\}\)。这让模型必须自己学会平衡三件事：当前题目有多难、专家建议对后续任务是否还有复用价值、以及人类成本是否值得。论文进一步用 `[Reflection]` 把专家反馈转成可复用知识并写入 memory，因此求助不只是“兜底”，还是显式的适应新任务机制。

训练分成两个阶段。第一阶段从带动作监督的轨迹中做 imitation learning；第二阶段只对 action token 做 PPO 更新，而不是对 executor 自动附加的环境 token 一起反传。实验上，AGILE 在 ProductQA 上相对 GPT-4 的 total score 提升 9.2%，相对 GPT-3.5 提升 90.8%；相对 SFT 版 `agile-vic13b-sft`，PPO 版又多出 2.3% 的 total score。消融也很直接：移除 tools 或 memory 会分别让 advice rate 上升 25.9% 和 17.4%，并带来 9.3% 和 4.0% 的 total score 下降；禁用 `SeekAdvice` 会让准确率下降 10.7%。在 MedMCQA 上，`agile-mek7b-ppo` 把基础模型准确率从 53.4% 拉到 85.2%，其中 31.6% 的样本触发过求助，说明这套“带成本求助 + 反思写回记忆”的机制确实在起作用。

> 💡 关键：AGILE 不是把 memory、tool、expert 分别做成独立 pipeline，而是让它们都变成同一个 RL policy 可选择的动作。

> ⚠️ 注意：论文优化的是“何时调用模块、何时求助、何时清上下文”这类策略问题，不是单纯提高单轮文本生成质量。

#### 🧪 练习题
```yaml
question: "AGILE 中将 [SeekAdvice] 设计为带成本动作的主要目的是什么？"
options:
  - "让模型始终优先复制人类答案，避免自主推理"
  - "把专家反馈仅作为测试阶段外挂，不进入训练闭环"
  - "让模型在正确率、未来知识收益和人力成本之间学习策略性权衡"
  - "用专家回答替代 memory 模块，简化系统结构"
answer: 2
explain: "AGILE 把求助写进奖励设计，奖励集合包含 1-c，因此模型必须学会只在值得时求助，并进一步通过 reflection 把反馈沉淀进 memory。"
```
