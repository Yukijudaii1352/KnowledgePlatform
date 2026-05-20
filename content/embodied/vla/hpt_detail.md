### HPT: Heterogeneous Pre-trained Transformers

```yaml
id: hpt
name: HPT
full_name: 异构预训练Transformer (Heterogeneous Pre-trained Transformers)
year: 2024
org: 清华大学 / Meta AI
paper_url: https://neurips.cc/virtual/2024/poster/112233
category: transformer_policy
parent: rt_x
motivation: 处理不同机器人本体感知差异
```

#### 📝 一句话总结

HPT 提出异构预训练Transformer架构，通过模块化的 Stem-Trunk-Head 设计将不同机器人本体（embodiment）的异构传感器和动作空间统一映射到共享表征空间，支持大规模跨本体数据联合预训练后快速迁移到新机器人任务。

#### 🎯 核心要点

- **Stem-Trunk-Head 模块化架构**：感知 Stem（本体特定编码器）将异构传感器数据映射为统一 token，共享 Trunk（Transformer）在统一表征空间学习，动作 Head（本体特定解码器）将表征映射回具体动作
- **跨本体大规模预训练**：在 52 个数据集、多种机器人本体（单臂、双臂、四足、无人机等）上联合训练，总数据量超 20 万条轨迹
- **异构感知对齐**：通过可学习的 Stem 投影器将不同模态（RGB、深度、关节状态、IMU 等）和不同数量的传感器统一为固定长度的 token 序列
- **动作空间解耦**：Head 模块针对不同本体（位置控制、速度控制、关节力矩等）输出相应格式的动作，支持离散和连续动作
- **迁移学习高效**：新机器人仅需少量数据微调 Stem 和 Head，冻结 Trunk 权重保持通用表征能力
- **缩放定律验证**：预训练数据量和模型参数量与下游任务性能呈正相关，验证了机器人基础模型的缩放潜力

#### 🔬 深入细节

##### 4.1 核心示意图

![HPT 架构图](https://liruiw.github.io/hpt/media/figures/framework.png)
*图：HPT 的 Stem-Trunk-Head 模块化架构，不同机器人本体通过共享 Trunk 实现表征统一*

![HPT 概念图](https://liruiw.github.io/hpt/media/figures/concept.png)
*图：HPT 核心思想——不同本体（embodiment）的感知和动作通过可学习的投影和反投影模块对齐到共享空间*

##### 4.2 算法伪代码

```python
# HPT 前向传播核心流程
def hpt_forward(obs, embodiment_id):
    # 1. Stem: 本体特定编码，将异构观测投影为统一token序列
    # obs 可以是任意数量/模态的传感器数据
    tokens = stem[embodiment_id](obs)  # stem: 可学习的线性投影或浅层MLP
    
    # 2. Trunk: 共享Transformer处理统一token序列
    # trunk在所有本体间共享权重
    unified_repr = trunk(tokens)  # Multi-head Self-Attention + FFN
    
    # 3. Head: 本体特定解码，输出对应动作格式
    action = head[embodiment_id](unified_repr)
    return action

# 预训练阶段：在所有数据集上联合训练
for batch in mixed_embodiment_dataloader:
    action_pred = hpt_forward(batch.obs, batch.embodiment_id)
    loss = behavior_cloning_loss(action_pred, batch.action)
    loss.backward()
    optimizer.step()

# 迁移阶段：冻结trunk，仅微调stem和head
trunk.requires_grad = False
for batch in new_robot_dataloader:
    action_pred = hpt_forward(batch.obs, new_embodiment_id)
    loss = behavior_cloning_loss(action_pred, batch.action)
    (stem_loss + head_loss).backward()  # 仅更新新本体的stem和head
    optimizer.step()
```

##### 4.3 方法细节

**动机与背景**：机器人学习领域长期面临数据稀缺问题——传统方法针对特定机器人本体从头训练策略，无法利用其他本体的大量数据。不同机器人的传感器配置（相机数量、是否有力传感器）、动作空间（关节角度 vs 末端位姿、连续 vs 离散）千差万别，直接拼接训练会导致表征空间混乱。HPT 的核心动机是将"本体"（embodiment）视为一个可建模的变量，通过显式的模块化设计实现异构数据的统一预训练。

**核心机制——Stem-Trunk-Head 拆解**：Stem 模块负责"消化"本体特异性。每个本体拥有独立的 Stem，将原始观测 \(o_i\)（可能是一张 RGB 图、一组关节角度、一段力传感器读数，或它们的任意组合）映射为固定数量（如 64 个）的统一维度 token 序列。映射方式灵活——对于图像用轻量 CNN/ViT patch embedding，对于低维向量用 MLP 投影 + 可学习位置编码区分不同传感器通道。Trunk 是核心的共享 Transformer，采用标准的 Multi-head Self-Attention 堆叠，在所有本体间共享权重，这正是实现知识迁移的关键。Head 模块是 Stem 的逆过程——将 Trunk 输出的统一表征解码为特定本体的动作格式，可以是末端位姿的 6D 向量、关节角度序列，甚至离散的动作 token。

> 💡 关键：Stem 和 Head 的设计保证了 Trunk 内部始终处理**相同形状**的 token 序列，无论上游有多少摄像头、下游控制几个关节。这让 Trunk 成为一个真正的"通用策略大脑"。

**训练与迁移流程**：预训练阶段采用行为克隆（Behavior Cloning）目标，在全部 52 个数据集的混合批次上联合优化：\(\mathcal{L} = \mathbb{E}_{(o, a) \sim \mathcal{D}} \| \text{Head}(\text{Trunk}(\text{Stem}(o))) - a \|^2\)（连续动作）或交叉熵（离散动作）。关键技巧是**按本体平衡采样**，防止大数据集本体主导梯度更新。迁移到新机器人时，冻结 Trunk 权重，仅需用少量（如 50-100 条）新本体轨迹微调新的 Stem 和 Head。这种"即插即用"方式大幅降低了新机器人的数据需求，同时保留了预训练学到的通用视觉-运动关联。

**与相关工作的对比**：不同于 RT-X（在固定动作空间的同构机器人间共享数据，本质是数据混合而非架构统一），HPT 首次实现了真正异构本体间的架构级统一。相比 Octo 等基于单一本体设计的通用策略模型，HPT 的模块化设计允许动态扩展新本体类型而无需修改 Trunk 结构。与传统域自适应方法（如 finetuning 全网络）相比，冻结 Trunk 的策略防止了小样本场景下的灾难性遗忘。

##### 4.4 关键公式

**统一观测编码**：设本体 \(e\) 有 \(K_e\) 个传感器，第 \(k\) 个传感器观测为 \(\mathbf{s}_k \in \mathbb{R}^{d_k}\)。Stem 将每个传感器独立编码后拼接为统一 token 序列：

$$\mathbf{z}_k = \text{MLP}_k^{(e)}(\mathbf{s}_k) \in \mathbb{R}^{D} \quad \Rightarrow \quad \mathbf{Z}^{(e)} = [\mathbf{z}_1; \mathbf{z}_2; \dots; \mathbf{z}_{K_e}] \in \mathbb{R}^{K_e \times D}$$

对于图像传感器，MLP 替换为轻量 CNN 或 patch embedding 投影。所有本体投影后的 token 维度 \(D\) 统一（如 \(D=512\)），但 token 数量 \(K_e\) 可不同。

**共享 Transformer 处理**：

$$\mathbf{H}^{(l+1)} = \text{LN}\big(\mathbf{H}^{(l)} + \text{MHA}(\mathbf{H}^{(l)})\big), \quad \mathbf{H}^{(l+2)} = \text{LN}\big(\mathbf{H}^{(l+1)} + \text{FFN}(\mathbf{H}^{(l+1)})\big)$$

其中 \(\mathbf{H}^{(0)} = \mathbf{Z}^{(e)} + \mathbf{P}^{(e)}\)（\(\mathbf{P}^{(e)}\) 为本体特定的可学习位置编码），MHA 为多头自注意力，FFN 为两层 MLP。

**预训练损失（多本体联合 BC）**：

$$\mathcal{L}_{\text{pretrain}} = \sum_{e \in \mathcal{E}} \frac{1}{|\mathcal{D}_e|} \sum_{(o,a) \in \mathcal{D}_e} \ell\big(\text{Head}_e(\text{Trunk}(\text{Stem}_e(o))), a\big)$$

其中 \(\ell\) 为 MSE（连续动作）或交叉熵（离散动作），\(\mathcal{E}\) 为所有训练本体集合。

> ⚠️ 注意：Stem 输出的 token 数量因本体传感器数量而异，但 Trunk 中的自注意力机制天然支持变长序列，因此无需 padding 到统一长度，这避免了不必要的计算浪费。

#### 🧪 练习题

```yaml
question: "HPT 进行新机器人迁移训练时，以下哪个模块的权重通常被冻结？"
options:
  - "Stem（本体特定编码器）"
  - "Trunk（共享 Transformer）"
  - "Head（本体特定解码器）"
  - "所有模块均参与训练"
answer: 1
explain: "迁移时冻结 Trunk 以保留预训练的通用视觉-运动表征，仅微调新本体的 Stem 和 Head，从而在小样本场景下避免过拟合和灾难性遗忘。"
```

#### ✅ 格式校验

- [x] 标题格式：`### HPT: Heterogeneous Pre-trained Transformers`
- [x] YAML 元信息块：紧跟标题，字段与输入元信息一致，`motivation` 保持原样
- [x] 所有小节标题：`📝 一句话总结`、`🎯 核心要点`、`🔬 深入细节`（含 4.1/4.2/4.3/4.4）、`🧪 练习题`，一字不差
- [x] 图片使用完整 URL：`https://liruiw.github.io/hpt/media/figures/framework.png` 和 `concept.png`
- [x] 公式 KaTeX 语法正确：行间 `$$...$$`，行内 `\(...\)`，反斜杠正确转义
- [x] `🔬 深入细节` 含示意图（4.1）、伪代码（4.2）、方法细节 ≥3 段（4.3 含动机与背景、核心机制拆解、训练与迁移流程、与相关工作对比共 4 段）、公式（4.4）