### DeepSeek-V3

```yaml
id: deepseek_v3
name: DeepSeek-V3
full_name: DeepSeek-V3: A 671B Mixture-of-Experts Language Model with Multi-head Latent Attention
year: 2024
org: DeepSeek-AI
paper_url: https://arxiv.org/abs/2412.19437
category: architecture
parent: DeepSeek-V2
motivation: 通过多头潜在注意力(MLA)和DeepSeekMoE架构实现高效推理与训练，结合多Token预测(MTP)和FP8混合精度训练，以极低成本达到顶级性能
```

#### 📝 一句话总结
DeepSeek-V3 提出了多头潜在注意力（MLA）和 DeepSeekMoE 架构，结合无辅助损失的负载均衡策略与多 Token 预测（MTP）训练目标，在仅 14.8T tokens 上以约 $5.6M 的训练成本达到了与 GPT-4o 和 Claude-3.5-Sonnet 等顶级闭源模型相当的性能。

#### 🎯 核心要点
- **多头潜在注意力（MLA）**：将 KV 缓存压缩到极低维潜在空间（KV 压缩维 512，Query 压缩维 1536），大幅降低推理时的显存占用
- **DeepSeekMoE 架构**：1 个共享专家 + 256 个路由专家，每个 Token 激活前 8 个专家（top-8 routing），总参数 671B，激活参数仅 37B
- **无辅助损失的负载均衡**：引入动态偏置项（dynamic bias），在训练过程中自动调整专家选择倾向，避免了传统辅助损失对模型性能的损害
- **多 Token 预测（MTP）**：每个位置同时预测未来 D=1 个 Token，提升数据效率与模型性能
- **FP8 混合精度训练**：首次在超大规模 MoE 模型上验证 FP8 训练，提出细粒度量化策略（tile-wise 和 block-wise）和累加高精度提升机制
- **极低训练成本**：完整预训练仅需 2.788M H800 GPU 小时（约 $5.576M），在 14.8T tokens 上完成
- **61 层 Transformer**，hidden size 7168，128 个注意力头，128K 词表
- **SFT + RL + 从 DeepSeek-R1 蒸馏**的对齐流水线

#### 🔬 深入细节

##### 核心架构图

![DeepSeek-V3 整体架构](https://arxiv.org/html/2412.19437v2/assets/x1.png)
*图：DeepSeek-V3 的模型架构概览，展示了 MLA 注意力机制与 DeepSeekMoE FFN 层的集成，以及多 Token 预测的训练框架。*

##### 基础架构：Transformer 主干

DeepSeek-V3 采用 61 层 Transformer 架构，hidden size 为 7168。与标准 Transformer 的两点核心区别：
1. **注意力层**使用多头潜在注意力（MLA）替代标准 Multi-Head Attention
2. **FFN 层**使用 DeepSeekMoE 替代标准 FFN

每个 Transformer Block 的结构为：`Input → MLA → Add&Norm → DeepSeekMoE → Add&Norm → Output`。

##### 1. 多头潜在注意力（MLA）

MLA 的核心动机是解决推理时的 KV 缓存灾难。在标准 MHA 中，每个 Token 需要缓存全部的 Key 和 Value 向量，当批量推理或长序列场景下显存占用巨大。

> **MLA 的创新**：引入低维潜在向量（latent vector）来压缩 Key 和 Value 的表示，将 KV 缓存从每个 Token 的 \(d_{model} \times n_{heads}\) 维压缩到仅需存储一个尺寸为 512 的潜在向量，解压缩矩阵则在计算时现场应用。

**具体机制**：
- 输入 hidden state 通过下投影矩阵 \(W^{DKV} \in \mathbb{R}^{d_{model} \times d_c}\) 压缩为维度 \(d_c = 512\) 的 KV 压缩潜在向量 \(c_t^{KV}\)
- 从 \(c_t^{KV}\) 分别通过上投影矩阵恢复 Key 和 Value：
  - \(k_t^C = W^{UK} c_t^{KV}\)，其中 \(W^{UK} \in \mathbb{R}^{d_c \times d_h n_h}\)
  - \(v_t^C = W^{UV} c_t^{KV}\)，其中 \(W^{UV} \in \mathbb{R}^{d_c \times d_h n_h}\)
- 对于 Query，同样引入压缩维度 \(d_c' = 1536\) 的潜在向量 \(c_t^Q\)，再通过上投影恢复
- 注意力计算仍使用 RoPE（旋转位置编码），但 RoPE 施加在 Key 的解耦维度上，避免了与低秩压缩的矛盾

> **关键优势**：推理时每个 Token 仅需缓存一个 512 维的潜在向量，而非完整的 KV 矩阵。KV 缓存压缩比约为 \(2 \times n_h \times d_h / d_c\)，在 DeepSeek-V3 的配置（128 heads × 128 head dim）下，压缩比约 64 倍。

##### 2. DeepSeekMoE 架构

DeepSeekMoE 在 DeepSeek-V2 的基础上进一步改进了专家路由设计：

**专家配置**：
- 1 个**共享专家**（Shared Expert），所有 Token 始终通过，捕获通用知识
- 256 个**路由专家**（Routed Experts），每个 Token 通过门控机制选择 top-8 个激活
- 每个专家的隐藏维度为 2048，总计 256 个路由专家 + 1 个共享专家

**门控机制**：
- 输入 hidden state 经过一个 sigmoid 门控网络，输出每个路由专家的亲和度得分
- 选择得分最高的 8 个专家，计算加权组合：\(FFN_{MoE}(x) = \sum_{i \in TopK} g_i(x) \cdot E_i(x)\)，其中 \(g_i(x)\) 为 softmax 归一化后的专家权重

> **总参数量**：671B 总参数，激活参数仅 37B（约 5.5%），使得单次前向计算的计算量仅相当于一个约 37B 的稠密模型。

##### 3. 无辅助损失的负载均衡

传统 MoE 模型通常引入辅助损失（auxiliary loss）来鼓励均匀的专家利用率，但这会引入一个与语言建模目标竞争的训练信号，损害模型性能。

DeepSeek-V3 的创新方案：

> **动态偏置机制**：为每个路由专家维护一个可学习的偏置项 \(b_i\)，在 top-K 选择时，实际使用的得分为 \(g_i(x) + b_i\)。训练过程中动态调整偏置：对过载的专家降低偏置，对使用不足的专家提高偏置。这种调整与主损失函数完全解耦，避免了辅助损失对模型质量的负面影响。

具体更新规则：
- 监控每个 step 中各专家的 token 分配数
- 当某专家处理的 token 数超过平衡值时，将其偏置降低一个小步长 \(\gamma\)
- 当低于平衡值时，将其偏置提高同样步长
- 加上约束 \(\sum b_i = 0\) 保证调整的零均值性

##### 4. 多 Token 预测（MTP）

MTP 是 DeepSeek-V3 训练的另一关键创新：

> **核心思想**：除了预测下一个 token 外，模型还同时预测再下一个 token（即 D=1 深度）。这迫使模型学习更远期规划，提升对长程依赖的建模能力。

**实现方式**：
- 每个 Transformer Block 的 hidden state 额外输入到独立的 MTP 模块
- MTP 模块使用一个简单的 Transformer 层（cross-attention 形式），以上一层的 hidden state 和当前 token 的 embedding 为输入
- 输出预测下一个位置的 token
- 额外的预测头与主预测头共享 embedding 层，减少参数冗余

> **训练损失**：总损失为 \(L = L_{main} + \lambda L_{MTP}\)，其中 \(\lambda\) 为 MTP 损失的权重（通常设为 0.3）。

##### 5. FP8 混合精度训练

DeepSeek-V3 是**首个**在超大规模 MoE 模型上成功验证 FP8 混合精度训练的实践：

**细粒度量化策略**：
- 对**激活**采用 **1×128 tile-wise 量化**（沿 token 维度分组），以 token 为单位计算缩放因子
- 对**权重**采用 **128×128 block-wise 量化**，以 block 为单位计算缩放因子
- 这种细粒度策略显著减少了量化误差，特别是在异常值较多的激活中

**累加高精度提升**：
- 矩阵乘法（GEMM）在 FP8 精度下执行
- 但累加器（accumulator）保留在更高精度（BF16 或 FP32），避免下溢
- 通过 CUDA 定制 kernel 实现高效的 FP8 GEMM + FP32 累加

> **训练效率**：FP8 混合精度使计算吞吐量提高约 2 倍（相比 BF16），显存占用降低约 40%。

##### 6. 训练超参数与计算成本

| 参数 | 值 |
|------|-----|
| 总参数量 | 671B |
| 激活参数量 | 37B |
| 层数 | 61 |
| Hidden Size | 7168 |
| 注意力头数 | 128 |
| 注意力头维度 | 128 |
| 词表大小 | 128,000 |
| 预训练 Token 量 | 14.8T |
| 优化器 | AdamW (β1=0.9, β2=0.95) |
| 学习率调度 | Warmup + Cosine Decay |
| 最大学习率 | 2.4e-4 |
| 批次大小 | 3072 序列 / batch |
| 序列长度 | 4K → 32K → 128K 逐步扩展 |
| GPU | 2048 块 NVIDIA H800 |
| 训练时间 | 约 3.7 周 |
| 总 GPU 小时 | 2.788M H800 小时 |
| 估计训练成本 | $5.576M |

##### 7. 对齐训练与蒸馏

预训练完成后，DeepSeek-V3 采用 SFT + RL 的对齐流水线：
- **SFT 阶段**：在高质量指令数据上微调，包括代码、数学、写作、对话等
- **RL 阶段**：使用基于人类反馈和 AI 反馈的奖励模型进行强化学习
- **DeepSeek-R1 蒸馏**：从 DeepSeek-R1（推理专用模型）蒸馏推理能力到 V3，提升数学和代码任务的 Chain-of-Thought 性能

> **核心创新**：V3 对齐阶段引入了"从推理模型中蒸馏"这一步骤，将 R1 的长链推理能力迁移至通用 V3 模型，同时保持了模型在一般对话任务上的泛化性。

#### 🧪 练习题

```yaml
question: "DeepSeek-V3 的 MLA 机制主要通过什么方式降低推理时的显存占用？"
options:
  - "减少注意力头的数量"
  - "将 KV 缓存压缩到低维潜在空间，仅存储压缩后的潜在向量"
  - "使用更小的词表"
  - "减少模型层数"
answer: 1
explain: "MLA 通过下投影矩阵将 KV 表示压缩为维度仅 512 的潜在向量，推理时仅需缓存该压缩向量，而非完整的多头 KV 矩阵，从而大幅降低 KV 缓存显存占用（压缩比约 64 倍）。"
```
