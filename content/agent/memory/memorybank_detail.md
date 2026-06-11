### MemoryBank: 记忆库 (MemoryBank)

```yaml
id: memorybank
name: MemoryBank
full_name: 记忆库 (MemoryBank)
year: '2023.05'
org: Sun Yat-sen University
paper_url: https://arxiv.org/abs/2305.10250
category: episodic
parent: generative_agents
motivation: 用遗忘曲线筛存长期个性化记忆
```

#### 📝 一句话总结
MemoryBank 是一种为 LLM 设计的长时记忆机制，受 Ebbinghaus 遗忘曲线启发，通过“记忆存储—检索—更新”三阶段流程使 AI 能选择性遗忘、强化记忆、理解用户个性，从而支撑长期 AI 陪伴场景。

#### 🎯 核心要点
- **三层记忆存储**: 原始对话记录 → 每日事件摘要 → 全局摘要，并持续推断用户个性画像。
- **双塔检索**: 采用 DPR (Dense Passage Retrieval) 双塔模型编码每一段记忆片段，通过 FAISS 进行向量索引和高效召回。
- **遗忘曲线更新**: 核心公式 \\(R = e^{-t/S}\\)，其中 \\(S\\) 为记忆强度（每次回忆 +1），\\(t\\) 为距上次回忆的时间。回忆时重置 \\(t=0\\) 并提升 \\(S\\)，未回忆的记忆随时间衰减，概率性被遗忘。
- **SiliconFriend 验证**: 基于 ChatGPT/ChatGLM/BELLE 三种 LLM，用 38k 心理咨询对话数据 LoRA 微调，集成 MemoryBank 后在定性(真实用户)和定量(模拟多角色)实验中均展现出记忆回忆、个性理解和共情能力。
- **模型无关**: 同时支持闭源 (ChatGPT) 和开源 (ChatGLM, BELLE) 模型。

#### 🔬 深入细节
```python
# 记忆系统的抽象流程
mem = store.load()
ctx = store.retrieve(query, mem)
answer = agent.respond(query, ctx)
store.update(query, answer, mem)
```

![MemoryBank 示意图](https://ar5iv.labs.arxiv.org/html/2305.10250/assets/x1.png)
*图：MemoryBank 的核心框架或评测示意。*

**1. 研究动机**
LLM 缺乏持久化长期记忆，导致在多轮交互（如 AI 伴侣、心理咨询、秘书服务）中无法维护上下文和用户画像。MemoryBank 旨在赋予 LLM 类人的记忆能力。

**2. 系统架构（Figure 1）**
MemoryBank 包含三大组件：

| 组件 | 功能 |
|------|------|
| **Memory Storage** (§2.1) | 将每次多轮对话按时间戳存储；LLM 自动生成每日摘要 → 全局摘要；根据对话推断用户个性特征 |
| **Memory Retrieval** (§2.2) | 双塔 DPR 编码器将每个记忆片段编码为向量 \\(h_m\\)，预建 FAISS 索引；查询时编码用户输入 → 向量相似度召回 top-k 相关记忆 |
| **Memory Updating** (§2.3) | Ebbinghaus 遗忘曲线 \\(R = e^{-t/S}\\)；\\(S\\) 初始为 1，每次被检索到 +1 并重置 \\(t=0\\)；长期未被回忆的记忆以指数衰减，低于阈值后被删除 |

**3. SiliconFriend 实现**
- **阶段一**: 用 38k 在线心理对话数据，通过 LoRA (rank r=8) 对开源 LLM (ChatGLM-6B, BELLE-7B) 进行参数高效微调，使其具备共情回应能力。
- **阶段二**: 集成 MemoryBank 记忆系统，使 chatbot 能回忆过往、理解用户个性。
- **三种底座**: ChatGPT (闭源通用)、ChatGLM (6.2B 双语)、BELLE (LLaMA-7B 中文微调)。

**4. 实验与评估**
- **定性评估**: 招募真实用户与 SiliconFriend 长期对话，展示记忆召回、个性适配和共情陪伴案例（Figure 2-4）。
- **定量评估**: ChatGPT 模拟多个不同性格用户，生成跨多天、多话题的长程对话。评估指标包括记忆召回准确率、答案相关性、个性一致性。
- **结果**: MemoryBank 增强后的 SiliconFriend 在记忆召回、共情质量、用户个性理解上均显著优于无记忆基线。

**5. 关键公式**
遗忘曲线：\\[R = e^{-\\frac{t}{S}}\\]
- \\(R\\): 记忆保留率
- \\(t\\): 距上次学习/回忆的时间
- \\(S\\): 记忆强度（离散值，初值 1，每次检索 +1）

**6. 局限与展望**
- 遗忘曲线模型高度简化，真实记忆受情绪、睡眠、意义性等多因素影响。
- 当前仅在 AI 陪伴场景验证，推广到其他长程任务需进一步探索。
- 记忆存储随对话增长会产生较大存储和检索开销。

> 论文链接: [arxiv.org/abs/2305.10250](https://arxiv.org/abs/2305.10250) | 代码: [github.com/zhongwanjun/MemoryBank-SiliconFriend](https://github.com/zhongwanjun/MemoryBank-SiliconFriend)

#### 🧪 练习题
```yaml
question: "MemoryBank 中遗忘曲线 \\(R = e^{-t/S}\\) 里的 \\(S\\) 变大，最直接意味着什么？"
options:
  - "记忆被检索后更容易立刻删除"
  - "记忆衰减更慢，更可能被长期保留"
  - "向量检索的 top-k 会自动增大"
  - "系统会跳过每日摘要生成"
answer: 1
explain: "在 MemoryBank 中，S 表示记忆强度；每次被回忆后 S 增加，意味着同样的时间间隔下保留率更高、遗忘更慢。"
```
