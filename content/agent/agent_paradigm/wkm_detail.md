### WKM: 世界知识模型 (World Knowledge Model)

```yaml
id: wkm
name: WKM
full_name: 世界知识模型 (World Knowledge Model)
year: '2024.05'
org: Zhejiang University
paper_url: https://arxiv.org/abs/2405.14205
category: search
parent: rap
motivation: 用全局先验和局部状态知识导规划
```

#### 📝 一句话总结
WKM 提出了一个**参数化的世界知识模型**，从专家轨迹和采样轨迹中自合成任务知识，为 LLM Agent 提供全局先验知识（指导整体规划）和局部动态状态知识（辅助每步动作选择），从而有效缓解 LLM Agent 在复杂交互任务中的"无脑试错"和"幻觉动作"问题。

#### 🎯 核心要点
1. **问题定位**：LLM Agent 在全局规划中缺乏对物理世界的先验理解，导致盲目试错（brainless trial-and-error）；在局部执行中缺乏对当前状态的真实感知，导致生成幻觉动作（hallucinatory actions）。
2. **核心方案**：模仿人类在大脑中的"世界知识模型"，提出参数化的 WKM，包含两大知识组件：
   - **Prior Task Knowledge**：任务级的全局先验知识，在任务开始前注入 Agent，引导高层规划方向。
   - **Dynamic State Knowledge**：实例级的动态状态知识，在执行过程中实时更新，辅助低层动作选择。
3. **知识自合成**：无需人工标注——利用专家轨迹和多样本采样轨迹，引导 Agent 模型**自合成**任务知识，将隐式经验显式化为可迁移的结构化知识。
4. **模型无关**：WKM 以插件式方式与 Agent 模型协作，可与 Mistral-7B、Gemma-7B 和 Llama-3-8B 等多种开源 LLM 配合使用。
5. **关键发现**：
   - 实例级任务知识比任务级知识具有更好的**跨任务泛化能力**；
   - **弱 WKM 可以引导强 Agent 模型**进行更优规划（知识质量比模型规模更关键）；
   - 统一 WKM 训练（多任务联合训练）展示出进一步提升的潜力。

#### 🔬 深入细节
##### 1. 动机与背景

传统 LLM Agent（如 ReAct、Reflexion、RAP）直接使用 LLM 作为规划器，在 Web 导航、具身交互等复杂环境中面临两个固有问题：

- **全局规划盲目**：Agent 没有任务开始前的先验世界知识，只能在每一步通过 prompt 中拼接的历史观察来猜测下一步做什么，如同"蒙着眼睛走迷宫"。
- **局部动作幻觉**：由于缺乏对真实物理状态的动态建模，Agent 在局部决策时容易生成不可执行的动作（如点击不存在的按钮、输入无效的命令），即产生 hallucinatory actions。

WKM 的灵感来源于认知科学中的"心智世界模型"理论——人类在执行任务前会在脑中构建一个对环境的粗略理解（prior），并在执行过程中不断更新这一理解（dynamic）。论文将这一机制落地为可训练的参数化模型。

##### 2. 核心框架

![WKM 框架示意图](https://raw.githubusercontent.com/zjunlp/WKM/main/model_pic.png)
*图：WKM 整体架构——Prior Task Knowledge 注入全局规划，Dynamic State Knowledge 辅助局部动作选择*

WKM 包含两个关键阶段：

**阶段一：知识自合成 (Knowledge Self-Synthesis)**

1. 收集**专家轨迹**（成功执行的任务轨迹）和**采样轨迹**（Agent 自行探索生成的多样本轨迹）。
2. 将轨迹输入 LLM，引导其提炼出两种结构化的任务知识：
   - **Task Knowledge \(K_{task}\)**：总结该类型任务的通用目标、约束和子任务分解策略。
   - **State Knowledge \(K_{state}\)**：总结在不同状态下的决策经验（什么状态下应该采取什么动作）。
3. 合成的知识以自然语言形式存储，形成 WKM 的知识库。

**阶段二：知识引导规划 (Knowledge-Guided Planning)**

1. **全局规划阶段**：在执行开始时，根据任务描述检索最相关的 Prior Task Knowledge \(K_{task}\)，将其拼入 Agent 的系统 prompt 或初始上下文，为 Agent 提供"任务蓝图"。
2. **局部执行阶段**：在每一步动作前，根据当前观察状态检索相关的 Dynamic State Knowledge \(K_{state}\)，辅助 Agent 判断当前应该采取的最优动作。
3. Agent 模型本身不变，WKM 以 **plug-and-play** 的方式提供知识增强。

##### 3. 训练与推理

```python
# WKM 知识引导规划伪代码
def wkm_guided_planning(task, wkm, agent_model):
    # Step 1: 检索全局先验知识
    prior_knowledge = wkm.retrieve_task_knowledge(task)
    context = prior_knowledge  # 注入 Agent 上下文

    trajectory = []
    for step in range(max_steps):
        # Step 2: 获取当前观察
        observation = env.get_observation()

        # Step 3: 检索动态状态知识
        state_knowledge = wkm.retrieve_state_knowledge(observation)
        context += state_knowledge

        # Step 4: Agent 根据增强上下文生成动作
        action = agent_model.generate(context, observation)
        trajectory.append((observation, action))

        # Step 5: 执行动作，获取反馈
        result = env.step(action)
        if result.is_terminal:
            break

    return trajectory
```

- **知识合成训练**：利用 (task, expert_trajectory) 对，通过监督微调训练 WKM 生成高质量的知识摘要。同时也利用采样轨迹进行对比学习，让 WKM 学会区分好决策和坏决策。
- **推理时**：WKM 冻结，仅作为知识检索器工作。检索基于语义相似度匹配当前任务/状态与知识库中的条目。
- **损失函数**：知识合成阶段使用标准的 cross-entropy loss 优化知识文本生成；可选地加入 contrastive loss 增强知识区分度。

##### 4. 实验与结果

论文在三个复杂真实世界模拟数据集上进行了验证：

| 数据集 | 领域 | 特点 |
|--------|------|------|
| **WebArena** | Web 导航 | 模拟真实网站交互，需要理解网页结构和动态内容 |
| **ALFWorld** | 具身家务 | 文本化的室内交互，如"把苹果放进冰箱" |
| **ScienceWorld** | 科学推理 | 需要多步科学实验操作和逻辑推理 |

实验使用三种开源 LLM 作为 Agent 基座模型：Mistral-7B、Gemma-7B 和 Llama-3-8B，对比了多种强基线方法（ReAct、Reflexion、RAP 等）。

**核心实验结果**：
- WKM 在所有三个数据集上均**显著优于**所有基线方法，任务成功率平均提升 10-15 个百分点。
- 消融实验表明：去掉 Prior Task Knowledge 或 Dynamic State Knowledge 均会导致性能明显下降，两者**互补且缺一不可**。
- 实例级知识（instance-level，从具体轨迹中提取）比任务级知识（task-level，宏观总结）具有更好的泛化性，能有效迁移到未见过的任务变体。
- "弱 WKM 引导强 Agent"现象：用一个 7B 模型训练的 WKM，可以为 70B 的 Agent 模型提供有效规划指导，说明**知识质量比模型规模更关键**。
- 多任务统一训练的 WKM 展现出正向的迁移学习效应，表明 WKM 有潜力发展为通用的世界知识底座。

##### 5. 与传统方法的区别

| 维度 | ReAct / Reflexion | RAP (推理-行动规划) | **WKM** |
|------|-------------------|---------------------|---------|
| 知识来源 | 仅当前轨迹上下文 | 搜索树 + 世界模型 | **自合成的显式参数化知识** |
| 全局先验 | 无 | 隐式（在搜索中） | **显式 Prior Task Knowledge** |
| 局部动态 | 纯反应式 | 基于模拟预测 | **检索式 Dynamic State Knowledge** |
| 泛化能力 | 差 | 中等 | **强（实例级知识跨任务迁移）** |
| 训练开销 | 无 | 需要在线搜索 | **离线合成 + 即插即用** |

> 💡 关键创新：WKM 首次将"世界知识"从 Agent 推理的隐式副产品提升为**独立的可训练模块**，实现了知识的显式化、可迁移和可复用。

> ⚠️ 局限：目前 WKM 的知识合成依赖于专家轨迹的可获取性；在完全无专家示范的全新环境中，知识质量可能下降。此外，WKM 的知识以自然语言形式存储，检索效率在知识库极大时可能成为瓶颈。

#### 🧪 练习题
```yaml
question: "WKM 中的 Prior Task Knowledge 和 Dynamic State Knowledge 分别用于解决 Agent Planning 中的什么问题？"
options:
  - "Prior 解决全局试错问题，Dynamic 解决局部幻觉问题"
  - "Prior 用于训练 Agent 模型，Dynamic 用于推理加速"
  - "Prior 用于检索历史轨迹，Dynamic 用于生成新动作"
  - "两者都是用来替换 Agent 模型的参数"
answer: 0
explain: "Prior Task Knowledge 在任务开始前提供全局先验，避免 Agent 盲目试错；Dynamic State Knowledge 在执行中根据实时状态辅助决策，减少幻觉动作。两者互补，分别从全局和局部层面增强 Agent 对世界的理解。"
```
