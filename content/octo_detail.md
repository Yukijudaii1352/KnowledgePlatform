### Octo: An Open-Source Generalist Robot Policy (Octo)

```yaml
id: octo
name: Octo
full_name: Octo: An Open-Source Generalist Robot Policy
year: "2024"
org: UC Berkeley / Stanford / CMU / UT Austin
paper_url: https://arxiv.org/abs/2405.12213
category: foundation
parent: —
motivation: 构建开源通用机器人基础策略，支持灵活微调到新机器人、新传感器和新动作空间
```

#### 📝 一句话总结

Octo 提出了一个基于 Transformer 的模块化通用机器人策略，通过扩散解码头（DDPM）预测动作块（action chunk），在 80 万条机器人轨迹上预训练，支持零样本多机器人控制和高效微调到新形态，是目前最大规模的开源通用机器人基础模型。

#### 🎯 核心要点

- **模块化三组件架构**：输入分词器（T5-base + CNN Patch Encoder）→ Transformer 骨干 → 扩散动作解码头，各部分可独立替换
- **Block-wise 因果注意力**：观测 token 仅关注当前及之前时间步，任务 token 可被全局关注，支持训练时灵活增减模态
- **Readout Token 机制**：类似 BERT 的 [CLS] token，被动读取 Transformer 内部嵌入而不影响输入处理，输出紧凑的序列嵌入向量
- **DDPM 扩散动作解码**：仅一次 Transformer 前向传播，之后的多步去噪全部在轻量扩散头内完成，优于 MSE 和离散化动作预测
- **Action Chunk 预测**：一次输出连续多个时间步的动作，提升时序一致性
- **25 个数据集混合预训练**：从 Open X-Embodiment 中精心筛选，按多样性加权，涵盖多种机器人形态和传感器配置
- **两版模型**：Octo-Small (27M) 和 Octo-Base (93M)，分别对应 ViT-S 和 ViT-B 规模
- **开源完整生态**：模型权重、预训练管线、微调脚本、数据加载器全部开源

#### 🔬 深入细节

##### 整体架构

![Octo 模型架构图](https://arxiv.org/html/2405.12213v1/x1.png)

*图：Octo 架构全景——左：输入分词器将语言、图像目标、观测分别编码为 token 序列；中上：Transformer 骨干通过 block-wise 因果掩码处理 token 并产出 readout 嵌入；中下：微调时可灵活增减输入模态和输出头；右：扩散头对 readout 嵌入进行多步去噪生成动作块。*

##### 一、输入分词器（Input Tokenizers）

Octo 将异构输入统一为 token 序列，支持三种模态：

| 模态 | 编码方式 | 细节 |
|------|----------|------|
| **语言指令** | T5-base (111M) 预训练 Transformer | 先分词再通过 T5，产出语言嵌入 token 序列 |
| **图像观测/目标** | 浅层 CNN 卷积栈 → 展平为 patch 序列 | 类似 ViT 的 patch embedding，非 ResNet 深层编码 |
| **观测历史** | 独立编码后加上可学习位置嵌入 | 按时间顺序排列形成序列 |

> 💡 关键：使用**浅层 CNN + Transformer 主导**（"Transformer-first"）设计，将绝大部分参数和 FLOPs 集中在 Transformer 骨干中，区别于传统 ResNet 编码 + 小 Transformer 的方案。实验证明在大规模多数据集训练下，ViT 架构显著优于 ResNet 架构。

##### 二、Transformer 骨干（Block-wise Causal Mask）

输入 token 序列被送入 Transformer 骨干，核心创新在于**注意力掩码设计**：

- **观测 token**：只能因果地关注到当前及之前时间步的观测 token 以及所有任务 token
- **任务 token**（语言+图像目标）：可被所有 token 全局关注（绿色掩码）
- **缺失模态 token**：完全被掩码（如无语言标注的数据集），不参与注意力计算

这一设计支持训练时混合不同传感器和标注配置的数据集——缺失的传感器通道直接 mask 掉，不影响骨干训练。微调时添加新传感器（如力-力矩）也无需修改既有权重。

##### 三、Readout Token 与动作解码

受 BERT [CLS] token 启发，Octo 在序列中插入 **可学习的 readout token**（紫色块）。其注意力规则不对称：

> ⚠️ 注意：Readout token 可关注其位置之前的观测和任务 token，但**任何观测或任务 token 都不能关注它**。这意味着 readout token 被动地从序列中提取信息，不会影响输入嵌入的计算。

Readout token 的输出嵌入作为动作解码的紧凑向量表示，送入**扩散动作头**：

##### 四、DDPM 扩散动作解码

Octo 使用 DDPM（Denoising Diffusion Probabilistic Models）预测连续、多模态的动作分布，生成一个连续多步的**动作块（action chunk）**。

**关键公式**（去噪过程）：

```
x^{k-1} = alpha * (x^k - gamma * epsilon_theta(x^k, e, k)) + N(0, sigma^2 * I)
```

其中：
- x^K ~ N(0, I) 为初始高斯噪声
- K 步去噪，由可学习的去噪网络 epsilon_theta 逐步预测噪声
- e 为 readout token 的嵌入输出（仅计算一次）
- alpha, gamma, sigma 遵循标准余弦噪声调度（cosine schedule）

> 💡 关键：**仅需一次 Transformer 前向传播**——readout 嵌入 e 产生后，所有 K 步去噪迭代都在轻量扩散头内部完成，不重复调用昂贵的 Transformer 骨干。

**训练目标**：标准 DDPM 损失——向数据集动作添加高斯噪声，训练去噪网络重建原始动作。

与替代方案对比（消融实验）：

| 动作预测方式 | 成功率 | 分析 |
|--------------|--------|------|
| **扩散解码（Octo）** | **83%** | 可建模多模态分布 + 保持连续精度 |
| 离散交叉熵 | 18% | 丢失动作连续性精度 |
| MSE 回归 | 35% | 无法建模多模态，策略犹豫不决 |

##### 五、训练数据与配方

**数据组成**：从 Open X-Embodiment 数据集中精选 **25 个数据集**，包含约 **80 万条**机器人演示轨迹。筛选标准：必须有图像观测和末端执行器 delta 控制；去除过度重复、低分辨率或过于窄域的数据集。

**加权策略**：按多样性将数据集分为"更丰富"和"较单一"两类，前者权重翻倍；对大而重复的数据集进行降权。

**训练细节**：

| 参数 | Octo-Small | Octo-Base |
|------|-----------|-----------|
| Transformer 规模 | ViT-S | ViT-B |
| 参数量 | 27M | 93M |
| 训练步数 | — | 300k |
| Batch Size | — | 2048 |
| 硬件 | — | TPU v4-128 (14h) |
| 微调硬件 | — | 单卡 A5000 24GB (~5h) |

**关键训练技巧**：
- **2 帧观测历史**：首帧外额外帧收益递减明显
- **Hindsight Goal Relabeling**：从轨迹未来帧中随机采样作为目标图像
- **随机掩码模态**：训练时随机丢弃语言指令或目标图像，使模型可以仅依赖其中一种条件
- **图像数据增强**：标准增强策略
- **优化器**：AdamW，inverse square root decay，weight decay 0.1，gradient clipping 1.0

##### 六、微调灵活性

Octo 核心优势在于**模块化设计**使微调极其灵活。添加新模态或动作空间时：

- **新传感器输入**（如力-力矩）：仅新增位置嵌入和轻量编码器，保留全部预训练 Transformer 权重
- **新动作空间**（如关节位置控制）：仅替换动作头参数
- **新机器人形态**（如双臂）：新增对应输入头，共享骨干

全局微调（更新所有参数）优于冻结部分参数，标准微调配方：约 100 条目标域轨迹，50k 步，cosine decay + linear warmup。

##### 七、核心实验结果

**零样本控制**：在 9 个真实机器人平台（4 个机构）上测试，Octo 平均比 RT-1-X 高 **29%** 成功率，与 55B 参数的 RT-2-X 性能相当；目标图像条件比语言条件高 25% 成功率。

**数据高效微调**：6 个新域场景中，微调 Octo 平均比从头训练或 VC-1 预训练高 **52%**。

**扩展性**：随模型从 Tiny→Small→Base 增大，零样本性能单调提升，Base 模型视觉场景感知更鲁棒。

**局限性**：
- 腕部相机利用不足（仅 27% 训练数据含腕部相机）
- 语言条件弱于目标图像条件（仅 56% 数据含语言标注）
- 对新行为（如翻转、精密插入）零样本性能退化明显

#### 🧪 练习题

```yaml
question: "Octo 的 Readout Token 机制与 BERT [CLS] token 的关键相似之处是什么？"
options:
  - "两者都用于生成下一帧的图像预测"
  - "两者都可以关注所有输入 token，但输入 token 不能关注它们"
  - "两者都需要通过扩散去噪来生成输出"
  - "两者只能关注因果历史，不能关注未来 token"
answer: 1
explain: "Readout token 可因果地关注之前的观测/任务 token，但观测和任务 token 不能关注 readout token（被动读取），与 BERT [CLS] 机制类似——[CLS] 聚合全局信息但其他 token 不关注它。"
```