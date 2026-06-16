### Borzoi — 以 524 kb DNA 上下文预测 RNA-seq 覆盖与遗传变异效应

```yaml
id: borzoi
name: Borzoi
full_name: Borzoi (Borzoi)
year: '2024.03'
org: Google DeepMind
paper_url: https://www.biorxiv.org/content/10.1101/2023.08.30.555582v1
category: genomics
parent: enformer
motivation: 支持524kb超长输入序列
```

#### 📝 一句话总结

Borzoi 将 Enformer 式 sequence-to-function 模型扩展到 524 kb 输入和 RNA-seq 覆盖预测，以 32 bp 分辨率直接建模基因表达、剪接、polyadenylation 与远距离调控信号。它通过卷积下采样、Transformer 长程建模和 U-Net 式上采样，把 DNA 序列变异转化为可解释的转录输出变化。

#### 🎯 核心要点

- **超长 DNA 输入**：输入长度为 524,288 bp，比 Enformer 的约 200 kb 上下文更长，覆盖更多 enhancer-gene、splice 和 polyA 相关远距离依赖
- **32 bp 输出分辨率**：输出中心区域的 RNA-seq/功能组学 coverage bins，使模型不仅预测总表达，还预测转录本结构相关的空间 profile
- **多模态训练目标**：官方仓库说明训练数据包括 ENCODE、GTEx RNA-seq，以及 reprocessed Enformer 数据中的 ChIP-seq、DNase、ATAC-seq、CAGE 等
- **双物种 heads**：参数文件包含 human head 和 mouse head，分别输出 7,611 个人类 targets 与 2,608 个小鼠 targets
- **Conv + Transformer + U-Net 架构**：先用卷积残差塔压缩序列，再用 8 层多头 Transformer 建模长程调控，最后用两级 U-Net convolution 提升输出分辨率
- **Poisson-multinomial 损失**：把 coverage 预测拆成总量和沿基因组位置的 profile，兼顾表达强度与转录结构形状
- **变异效应分析**：通过 reference/alternate allele 两次前向预测，计算 eQTL、sQTL、polyadenylation QTL、isoform polyA QTL 等效应分数
- **来源限制**：任务给出的 bioRxiv 页面当前受 Cloudflare challenge 影响不可直接抓取；方法细节依据 Nature Genetics 论文页、官方 `calico/borzoi` 仓库和公开参数文件核对

#### 🔬 深入细节

##### 模型示意图与可访问来源

![Borzoi model overview](https://media.springernature.com/lw1200/springer-static/image/art%3A10.1038%2Fs41588-024-02053-6/MediaObjects/41588_2024_2053_Fig1_HTML.png)
*图：Nature Genetics Fig. 1。Borzoi 从长 DNA 序列输入出发，预测多实验、多组织的 RNA-seq coverage，并用 reference/alternate 序列差异解释遗传变异效应。*

可访问来源说明：bioRxiv 原始链接 `https://www.biorxiv.org/content/10.1101/2023.08.30.555582v1` 当前被网页 challenge 拦截；可访问的正式论文页为 `https://www.nature.com/articles/s41588-024-02053-6`，官方代码与参数在 `https://github.com/calico/borzoi`，公开预测参数文件在 `https://raw.githubusercontent.com/calico/borzoi/main/examples/params_pred.json`。

##### 算法伪代码

```python
# Borzoi 简化训练/推理伪代码
def borzoi_forward(one_hot_dna, species):
    # one_hot_dna: [524288, 4]
    x = conv_dna(one_hot_dna, filters=512, kernel_size=15, pool=2)
    x = residual_conv_tower(x, repeats=6, filters=608, filters_end=1536, pool=2)

    for _ in range(8):
        x = transformer_block(
            x,
            heads=8,
            key_size=64,
            relative_position_features=32,
            dropout=0.2,
        )

    x = unet_conv_upsample(x, kernel_size=3)
    x = unet_conv_upsample(x, kernel_size=3)
    x = crop_center_bins(x)
    x = conv_nac(x, filters=1920, dropout=0.1)

    if species == "human":
        return softplus(linear(x, units=7611))
    return softplus(linear(x, units=2608))


def score_variant(reference_seq, alternate_seq, target_index, region_bins):
    y_ref = borzoi_forward(one_hot(reference_seq), species="human")
    y_alt = borzoi_forward(one_hot(alternate_seq), species="human")
    delta = y_alt[:, target_index] - y_ref[:, target_index]
    return aggregate(delta[region_bins])  # eQTL / sQTL / paQTL 等任务可换聚合方式
```

##### 为什么需要 524 kb 上下文

基因表达不是只由启动子附近几十个碱基决定。enhancer 可以跨越数十万碱基调控目标基因，剪接和 polyadenylation 信号也需要结合外显子、内含子、转录方向和组织背景来判断。Enformer 已经证明 Transformer 能把较长 DNA 输入映射到功能组学轨道，但 RNA-seq coverage 对上下文更敏感：一个 variant 可能改变总表达，也可能改变某个外显子的 inclusion、3' UTR 使用或 polyA site 选择。

Borzoi 因此把输入设为：

$$
X \in \{0,1\}^{524288\times 4}
$$

其中 4 个通道对应 A/C/G/T one-hot。模型输出是按 32 bp bin 排列的多 target coverage：

$$
\hat{Y} \in \mathbb{R}_{\ge 0}^{B\times T}
$$

这里 \(B\) 是中心区域 bin 数，\(T\) 是实验/组织 target 数。官方参数文件中 human head 的 \(T=7611\)，mouse head 的 \(T=2608\)，最终激活函数为 softplus，保证 coverage 非负：

$$
\hat{y}_{b,t} = \log(1+\exp z_{b,t})
$$

##### 架构拆解：从局部 motif 到长程调控再回到 coverage profile

Borzoi 的第一段是卷积与残差塔。`conv_dna` 使用 15 bp 卷积核识别局部 motif，并通过 pooling 降低序列长度；随后 6 个 residual convolution tower 继续扩大感受野，同时把通道数从约 608 提升到 1536。这个阶段类似把原始碱基序列变成较粗粒度的 regulatory feature map。

第二段是 Transformer tower。官方参数文件显示它包含 8 个 block、8 个 heads、key size 64，并使用相对位置特征。自注意力的核心计算为：

$$
\mathrm{Attention}(Q,K,V)
= \mathrm{softmax}\left(
\frac{QK^\top}{\sqrt{d}} + R_{\Delta}
\right)V
$$

其中 \(R_{\Delta}\) 是相对位置偏置或相对位置特征贡献。卷积层适合识别局部 motif，Transformer 则让相距很远的 enhancer、promoter、splice signal 和 polyA signal 直接交互，这是 Borzoi 相比短上下文 CNN 的主要优势。

第三段是两层 U-Net convolution。长输入经过多轮 pooling 后分辨率下降，如果直接输出会损失转录本结构细节；U-Net 式上采样把长程上下文带回更细的 32 bp bin。对 RNA-seq 来说，这一步很关键，因为 exon boundary、splice junction 邻域和 polyA site 附近的 profile 形状比单一表达量更有信息。

##### Poisson-multinomial coverage 损失

RNA-seq coverage 同时包含两个信号：一个 target 的总 read count，和 reads 沿基因组位置如何分布。Borzoi 参数文件中的训练损失为 `poisson_mn`，可理解为把总量建模和 profile 建模结合起来。对某个 target \(t\)，设观测 coverage 为 \(y_{b,t}\)，预测 coverage 为 \(\hat{y}_{b,t}\)：

$$
Y_t = \sum_b y_{b,t},
\quad
\hat{Y}_t = \sum_b \hat{y}_{b,t}
$$

profile 分布为：

$$
p_{b,t} = \frac{y_{b,t}}{Y_t+\epsilon},
\quad
\hat{p}_{b,t} = \frac{\hat{y}_{b,t}}{\hat{Y}_t+\epsilon}
$$

简化损失可以写作：

$$
\mathcal{L}_{\mathrm{PM}}
= \lambda \left(\hat{Y}_t - Y_t \log \hat{Y}_t\right)
- \sum_b y_{b,t}\log \hat{p}_{b,t}
$$

第一项约束总表达强度，第二项约束 coverage 形状。官方参数文件中 `total_weight` 为 0.2，体现了总量项和 profile 项之间的权衡。这个设计比单纯逐 bin Poisson 更适合 RNA-seq：模型不能只把总 read 数预测对，还要把 reads 放在正确的外显子、UTR 或 polyA 相关位置上。

##### 训练与变异推理流程

训练时，Borzoi 对每个 524 kb 窗口读取参考 DNA one-hot，并配对多个实验的 coverage tracks。数据增强包括 reverse-complement 和小幅 shift：reverse-complement 让模型学习 DNA 双链等价性，shift 则降低模型对窗口边界的过拟合。优化器为 Adam，公开参数文件中的学习率为 \(6\times10^{-5}\)，并使用 warmup、gradient clipping 和 L2 regularization。

推理变异效应时，流程非常直接：把 reference allele 放入同一长上下文前向一次，把 alternate allele 放入同一位置再前向一次，然后比较目标组织/实验的输出差异：

$$
\Delta_{b,t} =
\hat{y}_{b,t}^{\mathrm{alt}}
- \hat{y}_{b,t}^{\mathrm{ref}}
$$

若聚合目标是 gene body 总 coverage，就得到表达效应近似；若聚合 splice junction 或 exon 相关 bins，就可构造 sQTL 分数；若聚合 3' 端或 polyA site 邻域，就可得到 paQTL/ipaQTL 分数。Borzoi 的优势在于同一个模型输出完整 profile，因此不需要为表达、剪接和 polyA 分别设计完全不同的特征工程。

##### 与 Enformer 的关系

| 维度 | Enformer | Borzoi |
|------|----------|--------|
| 主要输出 | ChIP/DNase/CAGE 等 regulatory tracks | RNA-seq coverage 与多组学 tracks |
| 输入上下文 | 约 200 kb 级别 | 524,288 bp |
| 关键任务 | 长程调控元素到功能组学信号 | 表达、剪接、polyA 与变异效应 |
| 输出解释 | 多 target functional tracks | 32 bp coverage profile，可映射转录结构 |
| 架构变化 | Conv + Transformer | Conv + Transformer + U-Net 式分辨率恢复 |

> 💡 关键：Borzoi 不是只把输入窗口加长，而是把“长程调控信息”和“RNA-seq profile 形状”同时放入训练目标，使模型能把非编码变异连接到表达量、剪接和 3' 端使用变化。

#### 🧪 练习题

```yaml
question: "Borzoi 使用 Poisson-multinomial 损失的主要目的是什么？"
options:
  - "同时约束 RNA-seq 的总 coverage 和沿基因组位置的 profile 形状"
  - "把 DNA 碱基翻译成蛋白质氨基酸序列"
  - "让模型只预测 promoter 是否存在，不预测 coverage"
  - "完全去掉 Transformer，只保留卷积层"
answer: 0
explain: "RNA-seq 既有总 read count，也有外显子、UTR、polyA 等位置分布；Poisson-multinomial 损失分别建模总量和 profile，从而更适合 coverage 预测。"
```
