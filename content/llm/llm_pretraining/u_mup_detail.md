### u-μP：Unit-Scaled Maximal Update Parametrization

```yaml
id: u_mup
name: u-μP
full_name: Unit-Scaled Maximal Update Parametrization (u-μP)
year: 2025
org: Graphcore / Aleph Alpha
paper_url: https://arxiv.org/abs/2407.17465
category: training_technique
parent: μP
motivation: 结合Unit Scaling与μP，解决μP在实际应用中的HP搜索效率、HP迁移性、FP8低精度训练等问题
```

#### 📝 一句话总结

u-μP 将 Unit Scaling 技术融入 μP（Maximal Update Parametrization）框架，通过 abc-对称性消除初始化缩放超参、移除 base-shape 依赖、重新设计 α 缩放因子体系，使得超参数搜索可在极小代理模型上以近乎独立的一维扫描高效完成，并原生支持 FP8 低精度训练，在 7B 规模 LLM 上验证了从小模型到大模型的超参迁移有效性。

#### 🎯 核心要点

- **abc-参数化统一框架**：将权重矩阵的前向缩放 \(a_W\)、初始化缩放 \(b_W\)、学习率缩放 \(c_W\) 纳入统一的 abc-参数化体系，揭示三者之间存在 abc-对称性（可在保持训练动态不变的前提下重新分配缩放）
- **消除 \(\sigma_W\) 超参**：利用 abc-对称性将初始化标准差固定为 1（unit init），从而减少一个需要调优的超参维度
- **移除 base-shape 依赖**：标准 μP 需要指定一个"基础模型宽度"来定义缩放基准，u-μP 通过将缩放因子直接嵌入前向传播（Unit Scaling 风格）完全消除此依赖
- **重新定义 α 缩放因子**：将 α 与操作（而非权重）关联，定义 6 个独立的 α 超参：\(\alpha_{\text{ffn-act}}\)、\(\alpha_{\text{attn-softmax}}\)、\(\alpha_{\text{out}}\)、\(\alpha_{\text{res}}\)、\(\alpha_{\text{res-attn-ratio}}\)、\(\alpha_{\text{loss-softmax}}\)
- **新的 Embedding 学习率规则**：提出 \(c_{\text{emb}} = 1/\sqrt{d_{\text{model}}}\) 的 embedding 层学习率缩放，修正了标准 μP 中 embedding 学习率不随宽度缩放的问题
- **独立超参搜索策略**：证明 u-μP 下超参近乎独立，可先扫描学习率（9 次运行），再对其他 α 参数进行独立一维扫描，总搜索成本极低
- **原生 FP8 支持**：约 70% 矩阵乘法可直接转为 FP8，仅需保留少数关键张量（注意力 dense 投影、最终 FFN 层、decoder head）为高精度
- **大规模验证**：在 1B/3B/7B 参数的 Llama 风格模型上（SlimPajama 300B tokens）验证了超参迁移和 FP8 训练的有效性

#### 🔬 深入细节

##### 核心框架示意

![u-μP 主要实验结果](https://ar5iv.labs.arxiv.org/html/2407.17465v3/assets/x1.png)
*图 1：u-μP 的三大核心优势——(a) 高效超参搜索：仅需 9 次 LR 扫描即可接近完整网格搜索效果；(b) 超参从小模型到大模型的可靠迁移；(c) FP8 低精度训练的原生支持*

##### abc-参数化与对称性

u-μP 的理论基础是 **abc-参数化**。对于一个权重矩阵 \(W\)，其在前向传播中的实际作用可以表示为：

$$y = a_W \cdot (x \cdot W)$$

其中 \(W\) 的初始化为 \(W_{ij} \sim \mathcal{N}(0, b_W^2)\)，学习率为 \(\eta \cdot c_W\)。这三个缩放因子 \((a_W, b_W, c_W)\) 完全决定了该层的训练动态。

> 💡 **关键洞察——abc-对称性**：对于任意正实数 \(\lambda\)，变换 \(a_W \to \lambda \cdot a_W\)，\(b_W \to b_W / \lambda\)，\(c_W \to c_W / \lambda\) 不改变训练动态。这意味着我们可以自由地在三个缩放因子之间"搬运"尺度。

利用这一对称性，u-μP 做出了一个关键选择：**固定 \(b_W = 1\)**（即所有权重以标准正态分布初始化）。这不仅消除了初始化标准差这个超参，还使得权重天然处于 FP8 的有效表示范围内。

##### u-μP 缩放规则

基于 abc-对称性和 Unit Scaling 原则，u-μP 为 Transformer 的不同层定义了如下缩放规则：

```
┌─────────────────────────────────────────────────────────────┐
│                    u-μP 缩放规则 (Table 2)                    │
├──────────┬──────────────┬────────┬──────────────────────────┤
│  层类型   │  前向缩放 aW  │ 初始化 bW │  学习率缩放 cW            │
├──────────┼──────────────┼────────┼──────────────────────────┤
│ Hidden   │ 1/√fan_in    │   1    │  η / √fan_in             │
│ Input    │ 1            │   1    │  η / √fan_out  (新规则!)  │
│ Output   │ 1/fan_in     │   1    │  η / √depth              │
├──────────┴──────────────┴────────┴──────────────────────────┤
│ 残差连接缩放：1/√depth                                       │
└─────────────────────────────────────────────────────────────┘
```

对应的伪代码实现：

```python
# u-μP Transformer 前向传播伪代码
def u_mup_transformer(x, layers, params):
    """
    x: input token ids [batch, seq_len]
    layers: list of transformer blocks
    params: {W_emb, W_head, W_q, W_k, W_v, W_o, W_up, W_gate, W_down}
    """
    depth = len(layers)
    d_model = params.W_emb.shape[1]

    # === Input Embedding (Input 层规则) ===
    # aW=1, bW=1, cW=η/√fan_out=η/√d_model
    h = x @ params.W_emb  # W_emb ~ N(0,1), LR = η/√d_model

    for l in range(depth):
        residual = h

        # === RMSNorm (非参数化版本，对μP迁移至关重要) ===
        h_norm = rms_norm(h)  # 无可学习的 γ 参数

        # === Attention (Hidden 层规则) ===
        # aW=1/√d_model, bW=1, cW=η/√d_model
        Q = (1/sqrt(d_model)) * (h_norm @ params.W_q[l])
        K = (1/sqrt(d_model)) * (h_norm @ params.W_k[l])
        V = (1/sqrt(d_model)) * (h_norm @ params.W_v[l])

        # Scaled dot-product attention
        # α_attn_softmax 控制 softmax 温度
        attn_logits = Q @ K.T  # 已经被 1/√d 缩放过
        attn_logits = attn_logits * alpha_attn_softmax
        attn_weights = softmax(attn_logits)
        attn_out = attn_weights @ V

        # Output projection (Hidden 层规则)
        attn_out = (1/sqrt(d_model)) * (attn_out @ params.W_o[l])

        # === 残差连接 ===
        # 缩放因子 1/√depth，α_res 和 α_res_attn_ratio 控制比例
        h = residual + (1/sqrt(depth)) * alpha_res * attn_out

        # === FFN (SwiGLU, Hidden 层规则) ===
        residual = h
        h_norm = rms_norm(h)

        gate = (1/sqrt(d_model)) * (h_norm @ params.W_gate[l])
        up   = (1/sqrt(d_model)) * (h_norm @ params.W_up[l])
        # α_ffn_act 控制激活函数缩放
        ffn_out = silu(gate * alpha_ffn_act) * up
        ffn_out = (1/sqrt(d_ffn)) * (ffn_out @ params.W_down[l])

        h = residual + (1/sqrt(depth)) * alpha_res * ffn_out

    # === Output Head (Output 层规则) ===
    # aW=1/fan_in=1/d_model, bW=1, cW=η/√depth
    h_norm = rms_norm(h)
    logits = (1/d_model) * (h_norm @ params.W_head)
    logits = logits * alpha_out

    # α_loss_softmax 控制 loss softmax 温度
    loss = cross_entropy(logits * alpha_loss_softmax, targets)
    return loss
```

##### 动机与背景：μP 的实际困境

μP（Maximal Update Parametrization）由 Yang et al. (2022) 提出，其核心承诺是：**在小模型上搜索到的最优超参数可以直接迁移到大模型**。然而在实际应用中，μP 面临四个严重问题：

**问题 1：Llama 风格模型的迁移失败。** 标准 μP 假设使用 LayerNorm，但现代 LLM（如 Llama）使用 RMSNorm 且带有可学习的缩放参数 \(\gamma\)。论文发现，**参数化的 norm 层会破坏 μP 的超参迁移性**。解决方案是使用非参数化的 RMSNorm（去掉 \(\gamma\)），并配合独立的 weight decay 设置。

**问题 2：超参搜索空间不清晰。** μP 引入了多个 α 缩放因子，但未明确哪些需要调优、哪些可以固定，且超参之间存在复杂的相互依赖关系。

**问题 3：base-shape 的困扰。** μP 需要指定一个"基础模型"的形状作为缩放参考点，这增加了使用复杂度且引入了额外的隐式超参。

**问题 4：FP8 兼容性差。** 标准 μP 的初始化标准差 \(\sigma_W\) 随宽度缩放（如 \(1/\sqrt{d}\)），在大模型中会变得极小，超出 FP8 的有效表示范围。

##### 核心机制详解

**1. Unit Init 与 FP8 兼容性**

通过 abc-对称性将 \(b_W\) 固定为 1，所有权重初始化为标准正态分布。这意味着权重值集中在 \([-3, 3]\) 范围内，完美适配 FP8 E4M3 格式（范围 \([-448, 448]\)）。相比之下，标准 μP 中 7B 模型的 hidden 层初始化标准差约为 \(1/\sqrt{4096} \approx 0.0156\)，大量权重值会落入 FP8 的低精度区域。

**2. 新的 Embedding 学习率规则**

标准 μP 中 embedding 层的学习率缩放为 \(c_{\text{emb}} = 1\)（不随宽度变化），这导致 embedding 更新幅度随宽度增大而增大。u-μP 通过分析发现，正确的缩放应为：

$$c_{\text{emb}} = \frac{1}{\sqrt{d_{\text{model}}}}$$

这确保了 embedding 层的更新幅度在不同宽度下保持一致。论文通过实验验证，这一修正显著改善了学习率从小模型到大模型的迁移效果。

![Embedding 学习率规则对比](https://ar5iv.labs.arxiv.org/html/2407.17465v3/assets/x3.png)
*图 3：不同 embedding 学习率规则下的 LR 迁移对比。u-μP 的新规则（右）相比标准 μP（左）实现了更一致的最优 LR 迁移*

**3. α 超参的重新设计**

u-μP 将 α 缩放因子从"与权重关联"改为"与操作关联"，定义了 6 个语义清晰的 α 参数：

| α 参数 | 作用位置 | 物理含义 |
|--------|---------|---------|
| \(\alpha_{\text{ffn-act}}\) | FFN 激活函数前 | 控制 SwiGLU 激活的输入幅度 |
| \(\alpha_{\text{attn-softmax}}\) | 注意力 softmax 前 | 控制注意力分布的锐度（温度） |
| \(\alpha_{\text{out}}\) | 输出 logits | 控制 logits 的整体幅度 |
| \(\alpha_{\text{res}}\) | 残差连接 | 控制残差分支的相对贡献 |
| \(\alpha_{\text{res-attn-ratio}}\) | attention vs FFN 残差 | 控制 attention 和 FFN 残差的相对比例 |
| \(\alpha_{\text{loss-softmax}}\) | loss 计算的 softmax | 控制交叉熵 loss 的 softmax 温度 |

> 💡 **关键发现——超参独立性**：在 u-μP 框架下，这些 α 参数与学习率之间近乎独立。这意味着可以先固定默认 α 值扫描最优 LR，然后独立地对每个 α 进行一维扫描，而不需要昂贵的联合网格搜索。

**4. 独立超参搜索流程**

论文提出了一个高效的两阶段搜索策略：

- **阶段 1**：在小代理模型上，固定所有 α 为默认值，仅扫描学习率 η（约 9 个值）
- **阶段 2**：固定最优 η，对每个 α 参数独立进行一维扫描（每个约 5 个值）

由于各 α 参数独立，阶段 2 的所有扫描可以**并行执行**。总搜索成本仅为 \(9 + 6 \times 5 = 39\) 次小模型训练，远低于联合网格搜索的 \(9 \times 5^6 = 140625\) 次。

论文通过实验量化了超参独立性：μP 的超参迁移误差（transfer error）约为 0.03，而 u-μP 仅为 0.005，降低了 6 倍。

![超参迁移误差对比](https://ar5iv.labs.arxiv.org/html/2407.17465v3/assets/x4.png)
*图 4：μP vs u-μP 的超参迁移误差。u-μP 在各超参维度上的迁移误差显著更低*

**5. FP8 训练策略**

u-μP 的 unit init 天然适配 FP8，但并非所有张量都适合低精度。论文通过逐层分析 per-tensor RMS，识别出三类需要保持高精度的关键张量：

1. **注意力 dense 投影**（\(W_o\) 的输出）：因为注意力权重经 softmax 后分布极不均匀
2. **最终 FFN 层**（最后一个 transformer block 的 FFN）：对输出影响最大
3. **Decoder head**（\(W_{\text{head}}\)）：直接影响 logits 精度

保留这些张量为 BF16/FP16 后，约 70% 的矩阵乘法仍可在 FP8 下执行，实现了精度与效率的良好平衡。

##### 与标准 μP 的关键区别

| 特性 | 标准 μP | u-μP |
|------|---------|------|
| 初始化 | \(\sigma_W\) 随宽度缩放 | 固定 \(b_W = 1\)（unit init） |
| Base shape | 需要指定基础模型宽度 | 完全不需要 |
| Embedding LR | \(c_{\text{emb}} = 1\) | \(c_{\text{emb}} = 1/\sqrt{d_{\text{model}}}\) |
| α 定义 | 与权重关联 | 与操作关联（6 个独立 α） |
| HP 搜索 | 联合网格搜索 | 先 LR 后独立 α 扫描 |
| Norm 层 | 支持参数化 LayerNorm | 要求非参数化 RMSNorm |
| FP8 支持 | 困难（小 \(\sigma_W\)） | 原生支持（unit init） |
| Weight decay | 与 LR 耦合 | 独立设置 |

##### 大规模实验验证

论文在 SlimPajama 数据集（300B tokens）上训练了 1B、3B、7B 参数的 Llama 风格模型：

- **HP 迁移有效性**：从 width=2048 的代理模型搜索到的超参，直接应用于 7B 模型（width=4096），性能与在 7B 上直接搜索的结果相当
- **FP8 训练**：u-μP FP8 模型在 7B 规模上的 benchmark 性能与标准参数化 BF16 模型相当，验证 loss 差距极小
- **LR 迁移跨维度泛化**：最优 LR 不仅跨宽度迁移，还跨训练步数、batch size、深度等维度迁移

> ⚠️ **注意**：u-μP 要求使用非参数化的 RMSNorm（去掉可学习的 \(\gamma\)），以及独立于学习率的 weight decay 设置。这两个条件是超参迁移成功的必要前提。

#### 🧪 练习题

```yaml
question: "u-μP 通过什么机制将所有权重的初始化标准差固定为 1？"
options:
  - "通过引入额外的归一化层来约束权重分布"
  - "利用 abc-对称性将初始化缩放转移到前向传播的缩放因子中"
  - "在训练过程中动态调整权重的标准差"
  - "使用特殊的正交初始化方法替代高斯初始化"
answer: 1
explain: "abc-对称性表明 (aW, bW, cW) 可以在保持训练动态不变的前提下重新分配缩放。u-μP 利用这一性质，将 bW 固定为 1，同时相应调整 aW（前向缩放）和 cW（学习率缩放），从而实现 unit init 而不改变模型行为。"
```