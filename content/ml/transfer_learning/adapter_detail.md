### Adapter — 参数高效迁移学习

```yaml
id: adapter
name: Adapter
full_name: 参数高效迁移学习 (Parameter-Efficient Transfer Learning for NLP)
year: 2019
org: Google
paper_url: https://arxiv.org/abs/1902.00751
category: foundation
parent: —
motivation: 在冻结预训练模型参数的前提下，通过插入少量可训练瓶颈模块实现高效多任务迁移
```

#### 📝 一句话总结

Adapter 提出在冻结的预训练 Transformer 各层中插入轻量级瓶颈模块（adapter），仅训练约 3.6% 的新增参数即可达到接近全量微调的性能，解决了多任务场景下每个任务都需要独立存储完整模型副本的参数效率问题。

#### 🎯 核心要点

- 提出 Adapter 模块：瓶颈结构（down-project → 非线性激活 → up-project）+ 残差连接，插入 Transformer 每层的注意力和前馈子层之后
- 冻结原始预训练参数，每个任务仅训练 adapter 参数、层归一化参数和分类头
- 瓶颈维度 \(m \ll d\) 控制参数量，每个 adapter 仅增加 \(2md + d + m\) 个参数
- 近零初始化策略确保训练初期 adapter 近似恒等映射，不破坏预训练表征
- GLUE 基准：仅用 3.6% 参数达到全量微调 0.4% 以内的性能差距（80.0 vs 80.4）
- 17 个分类任务：1.14% 参数达到全量微调 0.4% 以内差距（73.3 vs 73.7）
- 消融实验表明高层 adapter 比低层更重要，模型自动学习"聚焦高层"的策略

#### 🔬 深入细节

![Adapter 模块架构](https://ar5iv.labs.arxiv.org/html/1902.00751/assets/x2.png)
*图：左侧为 Adapter 在 Transformer 层中的插入位置（注意力子层后和前馈子层后各一个），右侧为 Adapter 内部的瓶颈结构（down-project → ReLU → up-project + skip connection）*

```python
# Adapter 模块伪代码
class AdapterModule:
    def __init__(self, d_model, bottleneck_size):
        # 下投影: d_model -> bottleneck_size
        self.down_project = Linear(d_model, bottleneck_size)
        # 上投影: bottleneck_size -> d_model
        self.up_project = Linear(bottleneck_size, d_model)
        # 近零初始化，使输出接近零向量
        init_near_zero(self.down_project)
        init_near_zero(self.up_project)
    
    def forward(self, x):
        # x: [batch, seq_len, d_model]
        residual = x
        h = self.down_project(x)       # [batch, seq_len, m]
        h = relu(h)                     # 非线性激活
        h = self.up_project(h)          # [batch, seq_len, d_model]
        return h + residual             # 残差连接保证近恒等初始化

# Transformer 层中的集成方式
class TransformerLayerWithAdapter:
    def forward(self, x):
        # 多头注意力 + adapter
        attn_out = multi_head_attention(x)
        attn_out = adapter_1(attn_out)      # 第一个 adapter
        x = layer_norm(x + attn_out)
        
        # 前馈网络 + adapter
        ffn_out = feed_forward(x)
        ffn_out = adapter_2(ffn_out)        # 第二个 adapter
        x = layer_norm(x + ffn_out)
        return x
```

**动机与背景**

预训练语言模型（如 BERT）在 NLP 任务中取得了突破性进展，标准做法是对每个下游任务进行全量微调（fine-tuning）。然而，当需要服务大量任务时，每个任务都需要存储一份完整的模型副本。以 BERT-Large 为例，每个任务需要约 340M 参数。若有 N 个任务，总参数量为 N × 340M，这在实际部署中造成巨大的存储和管理负担。

传统的参数共享方法（如只微调顶层几层）虽然减少了参数，但往往以显著的性能损失为代价。论文的核心问题是：**能否在几乎不损失性能的前提下，将每个任务的新增参数压缩到原模型的百分之几？**

**核心机制详解**

Adapter 的设计遵循三个关键原则：

1. **瓶颈结构实现参数压缩**：adapter 将输入从维度 \(d\) 下投影到瓶颈维度 \(m\)，经过非线性变换后再上投影回 \(d\)。参数量为 \(2md + d + m\)（包含偏置），当 \(m \ll d\) 时（如 \(m=64, d=1024\)），每个 adapter 仅约 131K 参数，远小于 Transformer 层本身的参数量。

2. **残差连接保证稳定训练**：adapter 的输出加上输入的跳跃连接：

$$\text{Adapter}(x) = W_{up} \cdot \text{ReLU}(W_{down} \cdot x + b_{down}) + b_{up} + x$$

当 \(W_{up}\) 和 \(W_{down}\) 初始化为接近零时，adapter 输出接近零，整个模块近似恒等映射。这意味着训练开始时，带 adapter 的模型行为与原始预训练模型几乎相同，避免了随机初始化带来的灾难性干扰。

3. **双位置插入最大化表达能力**：每个 Transformer 层插入两个 adapter（注意力后 + 前馈后），论文实验表明这比仅在注意力后插入一个 adapter 效果更好。两个位置的 adapter 可以分别学习调整注意力模式和特征变换。

**训练策略**

训练时冻结原始 BERT 的所有参数（约 110M/340M for BASE/LARGE），仅训练：
- 所有 adapter 模块的参数
- 每层的 layer normalization 参数（这些参数量极小但对适配很重要）
- 任务特定的分类头

这使得不同任务可以共享同一个冻结的 BERT 主干，每个任务仅需额外存储其 adapter 参数（约 0.5%-8% 的原始模型大小）。

**实验验证与对比**

在 GLUE 基准上，使用 BERT-Large：

| 方法 | 平均分 | 每任务参数量 | N 任务总参数 |
|------|--------|-------------|-------------|
| 全量微调 | 80.4 | 100% (340M) | N × 340M |
| 仅微调顶2层 | 73.3 | ~22% | 共享底层 + N × 顶层 |
| Adapter (size=64) | 80.0 | 3.6% (~12M) | 340M + N × 12M |

关键发现：
- adapter size 为 64 时（约 3.6% 参数），GLUE 平均分仅比全量微调低 0.4 分
- 在 17 个额外分类任务上，adapter 仅用 1.14% 参数即达到全量微调 0.4% 以内
- SQuAD 抽取式问答：adapter size 64（2% 参数）达到 F1 90.4 vs 全量微调 90.7
- 即使 adapter size 低至 2（0.1% 参数），SQuAD F1 仍有 89.9

**与传统方法的区别**

| 对比维度 | 全量微调 | 特征提取 | Adapter |
|---------|---------|---------|---------|
| 训练参数 | 全部 | 仅分类头 | adapter + LN + 分类头 |
| 性能 | 最优 | 较差 | 接近最优 |
| 存储效率 | 差（N份完整模型） | 好 | 极好（共享主干） |
| 灵活性 | 高 | 低 | 高 |

相比视觉领域的 adapter 工作（Rebuffi et al., 2017），NLP adapter 使用瓶颈结构而非 1×1 卷积，可以将参数压缩到更小（1-3% vs 11%），且通过残差连接和近零初始化保证训练稳定性。

> ⚠️ 注意：消融实验表明，低层 adapter 的影响较小（移除第 0-4 层 adapter 对 MNLI 性能几乎无影响），而高层 adapter 更为关键。这与"低层提取通用特征、高层构建任务特定特征"的直觉一致。adapter 能自动学习这种层次化的重要性分配。

#### 🧪 练习题

```yaml
question: "Adapter 模块使用近零初始化的主要目的是什么？"
options:
  - "加速模型收敛"
  - "确保训练初期模型行为接近原始预训练模型，避免破坏已学表征"
  - "减少 adapter 的参数量"
  - "防止梯度消失问题"
answer: 1
explain: "近零初始化使 adapter 输出接近零，加上残差连接后整个模块近似恒等映射，保证训练起点与预训练模型一致，避免随机初始化对已有表征的灾难性干扰。"
```