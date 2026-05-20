### RT-1: Robotics Transformer for Real-World Control at Scale

```yaml
id: rt1
name: RT-1
full_name: Robotics Transformer (RT-1)
year: "2022"
org: Google Robotics
paper_url: https://arxiv.org/abs/2212.06817
category: vla
parent: "—"
motivation: 用Transformer架构统一多任务机器人控制，解决大规模真实世界机器人操作中的泛化和鲁棒性问题
```

#### 📝 一句话总结

RT-1 提出 Robotics Transformer 架构，将图像-语言输入编码为离散动作 token，在 130k 真实机器人演示数据上训练，实现 700+ 指令的 97% 成功率和比最佳基线高 25% 的新任务泛化能力。

#### 🎯 核心要点

- 端到端 Transformer 架构：FiLM-EfficientNet（图像编码）+ TokenLearner（压缩）+ Transformer（序列决策）
- 大规模真实世界数据：130k demos，13 个机器人，17 个月收集，覆盖 700+ 指令、8 类技能
- 离散化动作空间：将动作（arm position + base movement + gripper）离散化为 256 个 bin，使用 CCE loss 训练
- 3Hz 闭环推理：通过 TokenLearner 压缩视觉 token（从 81 到 8），移除自回归动作生成，实现实时推理
- 异构数据融合：仿真数据 + 不同机器人数据合训，提升长程任务泛化
- 新任务零样本泛化：76% 未见指令成功率，背景鲁棒性比基线高 18%

#### 🔬 深入细节

##### 动机与背景

机器人学习面临三大挑战：
1. **数据稀缺**：机器人数据远少于视觉/语言领域
2. **任务多样性**：传统方法每任务单独建模，无法泛化
3. **实时推理**：Transformer 推理速度难以满足机器人闭环控制

RT-1 借鉴 CV/NLP 的大规模预训练范式，首次在真实机器人数据集上训练统一 Transformer 模型，同时处理 visual、language、action 多模态信号。

##### 核心架构

![RT-1 架构总览](https://ar5iv.labs.arxiv.org/html/2212.06817/assets/figures/fig1.png)
*图：RT-1 架构总览。图像经 FiLM-EfficientNet 编码后与指令文本融合，通过 TokenLearner 压缩为 8 个 token 输入 Transformer，输出离散化动作。*

**输入阶段：FiLM-conditioned EfficientNet**

- 6 帧历史图像（300×300×3）→ ImageNet 预训练 EfficientNet-B3 提取特征
- 文本指令通过 Universal Sentence Encoder 编码为 512 维嵌入
- FiLM 层将语言特征作为条件注入视觉编码器（仿射变换：γ·x + β），实现早期多模态融合
- 输出：9×9×512 = 81 个视觉 token

**TokenLearner 压缩**

- 将 81 个视觉 token 学习加权压缩为 8 个 token
- 每个输出 token 是 81 个输入的空间注意力加权和
- 大幅降低 Transformer 计算量（81² → 8²），保证 3Hz 推理

**Transformer 序列建模**

- 仅 8 层 decoder-only Transformer（35M 参数，比原 Gato 1.2B 小 34 倍）
- 输入：TokenLearner 输出的 8 个视觉 token + 历史 6 步动作 token
- 输出：下一时刻动作 token

**离散化动作空间**

所有动作维度统一离散化到 256 个 bin：

- Base displacement (x, y, yaw)：11 个类别（7 种平移 + 3 种旋转 + stop）
- Arm position (x, y, z, roll, pitch, gripper open)：每维 256 bin
- 动作 head 使用 **Categorical Cross Entropy loss**（而非连续回归）
- 每个时间步独立吞吐，无自回归（保证 3Hz：~330ms/step）

##### 训练数据

| 技能 | 数量 | 示例指令 |
|------|------|----------|
| Pick Object | 130 | pick iced tea can |
| Move Object Near | 337 | move pepsi can near rxbar |
| Place Upright | 8 | place water bottle upright |
| Knock Over | 8 | knock redbull can over |
| Open/Close Drawer | 6 | open the top drawer |
| Place into Receptacle | 84 | place chip bag into bowl |
| Pick from Receptacle | 162 | pick jalapeno chip bag from bowl |
| Long-horizon | 9 | open jar of pistachios, grab scooper |

总计 744 条指令，130k demonstrations，13 台机器人 17 个月收集。

##### 实验结果

| 指标 | Gato | BC-Z | BC-Z XL | **RT-1** |
|------|------|------|---------|----------|
| Seen Tasks | 65% | 72% | — | **97%** |
| Unseen Tasks | 52% | — | — | **76%** |
| Distractors | 43% | — | — | **83%** |
| Backgrounds | 35% | 41% | — | **59%** |
| Long-horizon L1/L2/L3 | 63/25/0 | 38/50/50 | 63/75/38 | **88/75/50** |

RT-1 在各项指标上全面超越基线，尤其在 seen tasks 超 Gato 32%，unseen tasks 超 24%，long-horizon 综合 70% vs Gato 30%。

##### 关键消融发现

- **TokenLearner 至关重要**：移除后 Transformer 输入从 8 → 81，推理延迟翻倍，无法达到 3Hz
- **FiLM 条件优于 late fusion**：早期视觉-语言融合比 Transformer 中拼接文本更强
- **离散化动作 + CCE loss** 优于连续回归 MSE loss
- **数据多样性 > 数据量**：增加技能种类比增加同类数据更有效
- 异构数据合训（仿真 + 不同机器人）将长程任务 L3 泛化从 0 → 50%

> 💡 关键：RT-1 的核心创新不在 Transformer 架构本身，而在于 (1) 大规模真实数据收集 + (2) TokenLearner 视觉压缩 + (3) 离散化动作空间，三者的工程耦合使得 Transformer 首次能够在真实机器人上达到实用级性能。

> ⚠️ 注意：RT-1 未使用自回归动作生成——每个时间步的动作直接 one-shot 输出，这牺牲了一定的动作连续性但换取了 3Hz 的关键延迟优势。

#### 🧪 练习题

```yaml
question: "RT-1 中 TokenLearner 的主要作用是什么？"
options:
  - "增强文本指令的语义理解能力"
  - "将 81 个视觉 token 压缩为 8 个，降低 Transformer 计算量以实现实时推理"
  - "生成更高质量的动作离散化 bin"
  - "替代 ImageNet 预训练的 EfficientNet 编码器"
answer: 1
explain: "TokenLearner 通过空间注意力将 81 个视觉 token 压缩到 8 个，使 Transformer 计算量从 O(81²) 降至 O(8²)，是实现 3Hz 实时推理的关键设计。"
```