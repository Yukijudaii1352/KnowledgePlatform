### Mobile-Agent-v3.5

```yaml
id: mobile_agent_v3_5
name: Mobile-Agent-v3.5
full_name: "Mobile-Agent-v3.5: Unifying Device Control with a Compact GUI Agent Ecosystem"
year: "2025"
org: "Alibaba"
paper_url: "https://arxiv.org/abs/2602.16855"
category: "mm_agent"
parent: "—"
motivation: "实现跨平台统一操作"
```

#### 📝 一句话总结

Mobile-Agent-v3.5 提出了以 **混合数据飞轮（Hybrid Data Flywheel）** 构建大规模高质量 GUI 训练数据、以 **统一 Agent 能力增强** 提升感知-推理-协作能力、以 **多平台强化学习优化（MRPO）** 实现跨 Android/Web/Desktop 统一设备操控的紧凑型 GUI Agent 生态系统，在多个主流基准上取得 SOTA。

#### 🎯 核心要点

- **GUI-Owl-1.5 模型族**：基于 Qwen3-VL 构建 2B/4B/8B/32B/235B 的 instruct 与 thinking 系列变体，覆盖从端侧到云端的全尺寸部署需求
- **混合数据飞轮（Hybrid Data Flywheel）**：融合 DAG 自动轨迹生成、虚拟环境采集与人工标注三条数据管线，实现大规模、高质量、可持续的 GUI 训练数据生产
- **统一 Agent 能力增强**：通过 GUI 知识注入（Grounding + OCR + 图标描述）、CoT 推理合成与多智能体协作（Manager/Worker/Reflector/Notetaker 四角色）三个维度全面提升模型能力
- **MRPO（Multi-platform Reinforcement Preference Optimization）**：包含在线 Rollout Buffer、Token-ID Transport、交替多设备优化与混合奖励信号四大创新，首次在真实多平台环境中进行 GUI Agent 强化学习
- **跨平台 SOTA**：OSWorld 56.5%、AndroidWorld 71.6%、WebArena 48.4%、ScreenSpotPro 80.3%，全面超越 GPT-4o、Claude 等闭源模型

#### 🔬 深入细节

##### 框架总览

![Mobile-Agent-v3.5 整体框架](https://arxiv.org/html/2602.16855v1/x1.png)
*图：Mobile-Agent-v3.5 整体架构——从数据飞轮到能力增强再到多平台强化学习的完整流水线*

Mobile-Agent-v3.5 的核心思路可概括为三个层次：**数据（Data）→ 能力（Capability）→ 优化（Optimization）**。首先通过混合数据飞轮大规模生产高质量 GUI 训练数据；然后在 SFT 阶段注入 GUI 感知知识、合成 CoT 推理链并引入多智能体协作框架；最后通过 MRPO 在真实多平台环境中进行强化学习，持续提升 Agent 的决策质量。

##### 问题形式化

GUI Agent 任务被形式化为一个马尔可夫决策过程（MDP）。给定用户指令 \(q\)，Agent 在每一步 \(t\) 观察当前屏幕截图 \(o_t\)，生成包含思维链推理 \(r_t\) 和具体操作 \(a_t\) 的输出：

$$a_t = \pi_\theta(o_t, q, h_t)$$

其中 \(h_t = \{(o_1, a_1), \ldots, (o_{t-1}, a_{t-1})\}\) 为历史交互记录，\(\pi_\theta\) 为参数化的 VLM 策略。动作空间包括 `click(x, y)`、`type(text)`、`scroll(direction)`、`hotkey(keys)` 等统一操作原语，通过归一化坐标实现跨平台一致性。

##### 混合数据飞轮（Hybrid Data Flywheel）

数据飞轮是 Mobile-Agent-v3.5 的基础设施，解决了 GUI Agent 训练数据稀缺且质量参差不齐的核心瓶颈。

**1. DAG 自动轨迹生成**

论文提出基于有向无环图（DAG）的自动轨迹生成方法。核心思想是：将 App 的 UI 状态建模为 DAG 的节点，将操作建模为边，通过图遍历自动生成大量合法操作轨迹。

```python
# DAG 轨迹生成伪代码
def generate_trajectories(app_dag):
    trajectories = []
    for start_node in app_dag.entry_nodes:
        # BFS/DFS 遍历 DAG，生成多条路径
        for path in enumerate_paths(app_dag, start_node, max_depth=K):
            trajectory = []
            for (src, action, dst) in path:
                screenshot = capture(src)
                trajectory.append((screenshot, action))
            # 使用 VLM 为轨迹生成自然语言指令
            instruction = vlm_annotate(trajectory)
            trajectories.append((instruction, trajectory))
    return trajectories
```

> 💡 关键：DAG 方法的优势在于可以系统性地覆盖 App 的功能空间，避免随机探索的低效和遗漏，同时通过图结构保证生成轨迹的合法性。

**2. 虚拟环境采集**

在 Android 模拟器和 Web 浏览器等虚拟环境中，Agent 执行真实交互并记录轨迹。虚拟环境提供了安全的试错空间和可复现的评测条件。

**3. 人工标注**

对于高难度、长步骤的复杂任务（如跨应用操作），引入人工标注确保数据质量。三条管线互补：DAG 提供广度覆盖，虚拟环境提供真实交互，人工标注提供质量保障。

##### 统一 Agent 能力增强

**1. GUI 知识注入**

在 SFT 阶段，通过三类任务将 GUI 感知知识注入模型：

- **Grounding（定位）**：给定元素描述，预测其在屏幕上的坐标位置
- **OCR（文字识别）**：识别屏幕截图中的文本内容及位置
- **图标描述**：为 GUI 图标生成功能性描述

这些任务使模型建立起对 GUI 元素的精确感知能力，为后续的操作决策奠定基础。

**2. CoT 推理合成**

论文使用强大的教师模型（如 Qwen3-VL-235B）为训练轨迹生成详细的思维链（Chain-of-Thought）推理过程。CoT 包含：
- 当前屏幕状态分析
- 任务进度评估
- 下一步操作的推理依据
- 具体操作指令

> ⚠️ 注意：CoT 合成不是简单的标注，而是要求推理过程与实际操作逻辑一致，错误的 CoT 会误导模型学习。

**3. 多智能体协作框架**

![多智能体协作架构](https://arxiv.org/html/2602.16855v1/x3.png)
*图：Manager/Worker/Reflector/Notetaker 四角色多智能体协作框架*

Mobile-Agent-v3.5 设计了四角色多智能体协作系统：

| 角色 | 职责 |
|------|------|
| **Manager** | 任务规划与分解，将复杂指令拆解为子任务序列 |
| **Worker** | 执行具体 GUI 操作，基于当前截图和子任务生成动作 |
| **Reflector** | 操作后验证，判断操作是否成功、是否需要回退或重试 |
| **Notetaker** | 维护全局记忆，记录关键信息（如搜索结果、中间状态）供后续步骤引用 |

四个角色形成闭环：Manager 规划 → Worker 执行 → Reflector 验证 → Notetaker 记录 → Manager 根据反馈调整计划。这种设计将复杂的长序列决策分解为可管理的子问题，显著提升了多步骤任务的成功率。

##### MRPO：多平台强化学习优化

MRPO 是本文最核心的技术创新，首次实现了在真实多平台环境中对 GUI Agent 进行强化学习。

**动机**：SFT 训练的模型存在分布偏移问题——训练时看到的是专家轨迹，但推理时需要从自身的（可能有误的）操作历史中恢复。强化学习通过让模型在真实环境中试错来弥补这一差距。

**核心挑战**：GUI Agent 的 RL 面临三大难题：
1. **环境交互慢**：每步操作需要等待 App 响应、截图、渲染，延迟远高于文本 RL
2. **多平台异构**：Android/Web/Desktop 的动作空间、观察格式、奖励信号各不相同
3. **长序列稀疏奖励**：一个任务可能需要 10-30 步操作，只有最终成功/失败的二值奖励

**MRPO 四大创新**：

**① 在线 Rollout Buffer**

传统 RL 中 rollout 和训练交替进行，GPU 在等待环境响应时空闲。MRPO 引入异步 rollout buffer：

$$\text{Buffer} = \{(\tau_i, r_i, p_i)\}_{i=1}^{N}$$

其中 \(\tau_i\) 为轨迹，\(r_i\) 为奖励，\(p_i\) 为平台标识。多个环境实例并行采集轨迹存入 buffer，训练进程从 buffer 中采样进行更新，实现采集与训练的流水线并行。

**② Token-ID Transport**

不同平台的 GUI 元素具有不同的标识方式（Android 用 resource-id，Web 用 CSS selector，Desktop 用 accessibility API）。Token-ID Transport 将这些异构标识统一映射到模型的 token 空间：

$$\text{id}_{\text{unified}} = \text{Tokenize}(\text{Normalize}(\text{id}_{\text{platform}}))$$

这使得模型可以用统一的方式处理不同平台的元素引用，实现跨平台知识迁移。

**③ 交替多设备优化**

MRPO 在每个训练 epoch 中交替优化不同平台的数据：

```python
# MRPO 交替多设备优化伪代码
for epoch in range(num_epochs):
    for platform in shuffle([Android, Web, Desktop]):
        # 从 rollout buffer 采样该平台的轨迹
        batch = buffer.sample(platform, batch_size)
        # 计算偏好优化损失
        for (chosen, rejected) in batch.pairs:
            ratio = π_θ(chosen) / π_ref(chosen)
            loss = -log(σ(β * (log(ratio) - log(π_θ(rejected) / π_ref(rejected)))))
        optimizer.step(loss)
    # 同步更新 reference model
    π_ref = EMA(π_ref, π_θ, α)
```

交替优化避免了单一平台数据主导训练，促进跨平台能力的均衡发展。

**④ 混合奖励信号**

MRPO 结合多种奖励信号来缓解稀疏奖励问题：

- **任务完成奖励**：二值信号，任务成功为 +1，失败为 0
- **中间步骤奖励**：基于 GUI 状态变化判断操作是否有效
- **格式奖励**：检查输出是否符合预定义的动作格式

$$R_{\text{total}} = R_{\text{task}} + \lambda_1 R_{\text{step}} + \lambda_2 R_{\text{format}}$$

> 💡 关键：混合奖励将稀疏的任务级信号分解为密集的步骤级反馈，显著加速了 RL 训练的收敛。

##### 实验结果

Mobile-Agent-v3.5 在多个权威基准上取得全面 SOTA：

| 基准 | 平台 | GUI-Owl-1.5-32B | 此前最佳 | 提升 |
|------|------|:---:|:---:|:---:|
| **OSWorld** | Desktop | **56.5** | 43.0 (Claude) | +13.5 |
| **AndroidWorld** | Android | **71.6** | 59.5 | +12.1 |
| **WebArena** | Web | **48.4** | 35.8 | +12.6 |
| **ScreenSpotPro** | 跨平台 | **80.3** | 73.6 | +6.7 |
| **MobileBench** | Android | **71.4** | — | — |

关键发现：
- **8B 模型即超越 GPT-4o**：GUI-Owl-1.5-8B 在多个基准上超越 GPT-4o，证明了专用训练的小模型可以胜过通用大模型
- **Thinking 变体显著提升复杂任务**：thinking 版本在需要多步推理的 OSWorld 上比 instruct 版本提升约 5-8 个百分点
- **MRPO 带来一致性提升**：相比纯 SFT 模型，MRPO 在所有平台上均带来 3-7 个百分点的提升
- **多智能体协作在长任务上优势明显**：在平均步骤数 >15 的任务上，多智能体框架比单 Agent 提升超过 10 个百分点

##### 与传统方法的对比

| 维度 | 传统 GUI Agent | Mobile-Agent-v3.5 |
|------|---------------|-------------------|
| 数据来源 | 人工标注或简单爬取 | 混合数据飞轮（DAG + 虚拟环境 + 人工） |
| 训练范式 | 纯 SFT | SFT + MRPO 强化学习 |
| 平台支持 | 单平台专用 | Android/Web/Desktop 统一 |
| 协作机制 | 单 Agent | Manager/Worker/Reflector/Notetaker 四角色 |
| 模型规模 | 依赖闭源大模型 | 2B-235B 全尺寸开源模型族 |

#### 🧪 练习题

```yaml
question: "MRPO 中引入在线 Rollout Buffer 的主要目的是什么？"
options:
  - "增加训练数据的多样性"
  - "解决 GUI 环境交互延迟导致的 GPU 空闲问题，实现采集与训练的流水线并行"
  - "存储历史模型的参数用于 KL 散度约束"
  - "缓存屏幕截图以减少重复渲染开销"
answer: 1
explain: "GUI 环境的交互延迟远高于文本环境，在线 Rollout Buffer 通过异步并行采集轨迹，使 GPU 在等待环境响应时仍可从 buffer 中采样训练，显著提升了硬件利用率。"
```