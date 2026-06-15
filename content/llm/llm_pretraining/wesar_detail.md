### WeSaR

```yaml
id: wesar
name: WeSaR
full_name: WeSaR (Weight Scaling as Reparameterization)
year: '2025.10'
org: 学术界
paper_url: https://arxiv.org/abs/2410.16682
category: training
parent: —
motivation: 可学习门控抑制梯度爆炸
```

#### 📝 一句话总结

WeSaR 通过给每个权重矩阵引入可学习缩放门控 \(\alpha\)，把模型实际使用的权重写成 \(\alpha W\)，从而解耦权重初始化范数和前向所需尺度，缓解 LLM 预训练中的 loss spike。它解决的是 Transformer 不同矩阵范数不均导致 update ratio 失衡、部分层对梯度更新过度敏感的问题。

#### 🎯 核心要点

- 正确公开论文为 Initialization of Large Language Models via Reparameterization to Mitigate Loss Spikes, arXiv:2410.05052
- 将每个参数矩阵 \(W\) 重参数化为 \(\bar{W}=\alpha W\)，其中 \(\alpha\) 是可训练 gate scalar
- 原始 \(W\) 可用统一较小标准差初始化，功能尺度由 \(\alpha\) 调整到满足梯度传播需求
- 目标是稳定各层 update ratio \(\|\Delta W\|/\|W\|\)，降低小范数矩阵在早期训练中的过大相对更新
- 推理时可把 \(\alpha\) 合并进权重矩阵，不增加推理计算成本
- 在 130M、1.3B、13B Transformer decoder 上减少 loss spike 并加速收敛
- 与 \(\sigma\)Reparam、Residual Scaling 等方法相比，WeSaR 更简单，按矩阵粒度即可生效

#### 🔬 深入细节

![WeSaR loss spike 与 update ratio](https://ar5iv.labs.arxiv.org/html/2410.05052/assets/x1.png)
*图：WeSaR 论文 Figure 1，展示 13B Transformer 训练中 loss spike 与特定矩阵 update ratio 的关系，以及 WeSaR 对 update ratio 的稳定作用。Manifest 中 paper_url 指向不相关论文，正文依据 arXiv:2410.05052 补足。*

```python
# WeSaR 参数化伪代码
class WeSaRLinear:
    def __init__(self, din, dout, sigma):
        self.W = normal(shape=(dout, din), std=sigma)  # 统一小范数初始化
        self.alpha = Parameter(init_required_scale(din, dout))

    def forward(self, x):
        return x @ (self.alpha * self.W).T

def fold_wesar_for_inference(module):
    module.W = module.alpha * module.W
    module.alpha = None
    return module
```

**动机与背景：loss spike 常与 update ratio 失衡同时出现。** 预训练大模型时，loss 可能突然上升甚至发散。论文观察到，在某些矩阵如 MLP down projection \(W_d\) 上，早期训练的 \(\|\Delta W_d\|/\|W_d\|\) 明显偏大；loss spike 后该比值又会突然下降。这说明问题不只是梯度范数绝对值大，而是某些小范数参数对同样大小的更新过于敏感。

**核心机制：把“功能尺度”和“可训练参数范数”分开。** Transformer 初始化通常要让激活和梯度跨层稳定，这会要求不同矩阵有不同尺度。但不同尺度又导致 update ratio 不均。WeSaR 写作：

$$
\bar{W} = \alpha W
$$

其中 \(\bar{W}\) 是模型实际使用的矩阵，\(W\) 可以统一初始化，\(\alpha\) 负责满足前向/反向传播所需尺度。这样参数更新主要作用在范数更均匀的 \(W\) 上，而 scale 的慢变化交给 gate。

**训练流程：只改线性层参数化，不改 optimizer 主体。** 实现上，对 QKV、Proj、FC1、FC2 等矩阵都加一个可学习 scalar gate。优化器照常更新 \(W\) 和 \(\alpha\)。由于 \(\alpha\) 是标量，额外参数量可以忽略；推理或导出时直接将 \(\alpha W\) 折叠为普通权重矩阵，不影响部署。

**为什么能抑制梯度爆炸式失稳。** 若某矩阵 \(W\) 的范数过小，固定学习率下相对更新 \(\|\Delta W\|/\|W\|\) 会变大，模型功能可能被一次更新剧烈改变。WeSaR 让 \(W\) 的基础范数更均匀，\(\alpha\) 吸收层间尺度差异，因此同一优化器步长下各矩阵相对变化更接近，减少触发 loss spike 的极端层。

**与 residual scaling/\(\sigma\)Reparam 的区别。** Residual scaling 通常缩放残差分支输出，\(\sigma\)Reparam 通过谱归一化和 scale 控制矩阵 Lipschitz；WeSaR 更直接，只在每个参数矩阵前放一个 learnable scalar。它不要求每步做谱范数估计，因此工程成本更低，更像一种初始化和训练稳定性补丁。

> 💡 关键：WeSaR 不是简单把权重乘小，而是让可学习 gate 承担尺度，权重本体保持更均匀的可更新状态。

#### 🧪 练习题

```yaml
question: "WeSaR 中可学习 gate α 的作用是什么？"
options:
  - "决定 tokenizer 的 BPE 合并规则"
  - "承担当层功能尺度，使原始权重 W 可用更均匀范数初始化和更新"
  - "删除所有残差连接"
  - "把 softmax 换成 ReLU"
answer: 1
explain: "模型实际使用 αW，α 调整尺度，W 本体避免因范数不均导致过大的相对更新。"
```
