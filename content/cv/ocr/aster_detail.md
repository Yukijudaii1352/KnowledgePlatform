### ASTER: An Attentional Scene Text Recognizer with Flexible Rectification

```yaml
id: aster
name: ASTER
full_name: "注意力场景文本识别器 (An Attentional Scene Text Recognizer with Flexible Rectification)"
year: 2018
org: HUST
paper_url: "https://arxiv.org/abs/1811.04413"
category: recognition
parent: crnn
motivation: "TPS校正+注意力解码"
```

#### 📝 一句话总结

ASTER 提出了薄板样条(TPS)空间变换校正网络与注意力序列到序列识别网络的端到端级联框架，通过自适应几何校正将弯曲、透视等不规则文本转化为规则水平文本后再识别，在不规则文本基准上大幅超越先前方法。

#### 🎯 核心要点

- 提出 TPS 校正网络：通过定位网络预测 K=20 个控制点，利用薄板样条变换实现灵活的非刚性几何校正
- 端到端无监督校正：校正模块无需任何几何标注，仅通过识别损失梯度反传自动学习最优校正策略
- 双向注意力解码器：同时从左到右和从右到左解码，取置信度更高的结果，缓解注意力漂移问题
- 识别网络采用 ResNet 编码器 + BiLSTM + Attention-GRU 解码器的 seq2seq 架构
- 在 7 个标准基准上评测，不规则文本数据集 (CUTE80, SVT-P, IC15) 上取得显著提升（CUTE80: 79.5% vs 先前 59.2%）

#### 🔬 深入细节

```
输入图像 (不规则/弯曲文本)
    │
    ▼
┌───────────────────────────────────────┐
│         校正网络 (Rectification)        │
│  [定位CNN] → K=20控制点 → [TPS变换]    │
│         → 双线性采样 → 校正图像         │
└───────────────────────────────────────┘
    │  32×100 规则图像
    ▼
┌───────────────────────────────────────┐
│         识别网络 (Recognition)          │
│  [ResNet编码器] → [BiLSTM] →           │
│  [注意力GRU解码器(L→R)] ─┐             │
│  [注意力GRU解码器(R→L)] ─┤→ 取高置信度  │
└───────────────────────────────────────┘
    │
    ▼
  预测: "GOOGLE"
```
*图：ASTER 整体框架——上半部分为 TPS 校正网络（定位网络→TPS变换→校正图像），下半部分为双向注意力识别网络*

```python
# ASTER 核心流程伪代码
class ASTER:
    def __init__(self, K=20):
        self.localization_net = CNN_FC(output=2*K)  # 预测K个控制点坐标
        self.tps_transform = TPS(K)                  # 薄板样条变换
        self.encoder = ResNet() + BiLSTM(256)        # 视觉+序列编码
        self.decoder_fwd = AttentionGRU('L2R')       # 正向解码
        self.decoder_bwd = AttentionGRU('R2L')       # 反向解码

    def forward(self, img, target=None):
        # Step 1: 校正
        ctrl_points = self.localization_net(img)       # [B, K, 2]
        rectified = self.tps_transform(img, ctrl_points)  # [B, 3, 32, 100]
        
        # Step 2: 编码
        features = self.encoder(rectified)             # [B, T, 512]
        
        # Step 3: 双向解码
        if training:
            return CE_loss(decoder_fwd(features, target)) + \
                   CE_loss(decoder_bwd(features, reverse(target)))
        else:
            pred_fwd, score_fwd = decoder_fwd.decode(features)
            pred_bwd, score_bwd = decoder_bwd.decode(features)
            return pred_fwd if score_fwd > score_bwd else reverse(pred_bwd)
```

**动机与背景**

自然场景文本常呈现弯曲、透视变形、旋转等不规则形态。传统识别器（如 CRNN）假设文本水平排列，面对不规则文本性能急剧下降。早期的空间变换网络 (STN) 仅使用仿射变换（6 自由度），无法处理弯曲等非刚性变形。ASTER 的核心思想是：**与其让识别网络直接处理复杂的不规则文本，不如先将其"摆正"为规则形态，降低后续识别难度。**

**核心机制一：TPS 校正网络**

TPS（Thin-Plate Spline）是一种灵活的非刚性 2D 变换，其数学表达为：

$$T(p) = A \begin{bmatrix} p \\ 1 \end{bmatrix} + \sum_{k=1}^{K} w_k \cdot U(\|p - c_k\|)$$

其中 \(A \in \mathbb{R}^{2 \times 3}\) 为仿射部分，\(w_k\) 为控制点权重，\(U(r) = r^2 \log r\) 为 TPS 径向基函数。20 个控制点（上下各 10 个）提供 40+6 个自由度，远超仿射变换的 6 个自由度，足以拟合弯曲和透视变形。

> 💡 关键：TPS 等价于在无限薄金属板上施加点力后的变形，天然具有"最小弯曲能"性质——在所有满足控制点约束的变换中，TPS 的弯曲能量最小，因此变换结果平滑自然。

定位网络是一个轻量 CNN（6 层卷积 + 2 层全连接），从输入图像直接回归 K 个控制点的归一化坐标。整个 TPS 变换过程可微分，梯度链为：

$$\frac{\partial \mathcal{L}}{\partial c_k} = \frac{\partial \mathcal{L}}{\partial I'} \cdot \frac{\partial I'}{\partial G} \cdot \frac{\partial G}{\partial T} \cdot \frac{\partial T}{\partial c_k}$$

这使得校正网络在**没有任何几何监督**的情况下，仅靠识别损失即可学会正确的校正行为。

**核心机制二：注意力识别网络**

编码器采用修改版 ResNet（在高度方向 stride=2 压缩、宽度方向 stride=1 保留序列长度），将 32×100 的校正图像编码为长度约 25 的特征序列，再经 2 层 BiLSTM 增强上下文建模。

解码器采用基于 GRU 的注意力机制，第 \(t\) 步：
1. 状态更新：\(s_t = \text{GRU}(s_{t-1}, [e(y_{t-1}); c_{t-1}])\)
2. 注意力计算：\(\alpha_{t,i} = \text{softmax}(v^T \tanh(W_s s_t + W_h h_i))\)
3. 上下文向量：\(c_t = \sum_i \alpha_{t,i} \cdot h_i\)
4. 字符预测：\(p(y_t) = \text{softmax}(W_o [s_t; c_t])\)

**核心机制三：双向解码策略**

注意力解码器存在"注意力漂移"——某步出错会级联传播。ASTER 同时训练正向（L→R）和反向（R→L）两个解码器，推理时分别生成候选序列，取序列对数概率 \(\log P = \sum_t \log p(y_t|y_{<t})\) 更高者为最终结果。两个解码器共享编码器但各有独立的 GRU 参数。

**与传统方法的区别**

| 方面 | CRNN (2015) | RARE (2016) | ASTER (2018) |
|------|-------------|-------------|--------------|
| 校正 | 无 | TPS | TPS |
| 编码器 | VGG-7层 | VGG | ResNet (更深更强) |
| 序列建模 | BiLSTM | 无 | BiLSTM |
| 解码 | CTC | 单向 Attention | **双向 Attention** |
| CUTE80 | 54.9% | 59.2% | **79.5%** |

> ⚠️ 注意：ASTER 可视为 RARE 的全面增强版——相同的 TPS 校正思想，但更强的编码器、更鲁棒的双向解码器，以及端到端联合优化带来了 20+ 百分点的提升。

**消融实验关键结论**

- TPS 校正对不规则文本贡献最大（CUTE80: +10.4%）
- 注意力解码优于 CTC（+4~6%）
- 双向解码额外贡献约 1~3%
- 校正网络对已规则文本几乎不做变换（自动退化为近似恒等映射）

#### 🧪 练习题

```yaml
question: "ASTER 中 TPS 校正网络能够在无几何标注的情况下学会校正，其根本原因是什么？"
options:
  - "TPS 变换本身具有自校正能力，无需学习"
  - "定位网络使用了预训练的关键点检测模型提供初始监督"
  - "整个 TPS 采样过程可微分，识别损失的梯度可反传至定位网络"
  - "训练数据中包含了校正前后的配对图像作为隐式监督"
answer: 2
explain: "TPS 变换中的网格生成和双线性采样均可微分，因此识别损失可通过采样器→网格→TPS参数→控制点的完整梯度链反传到定位网络，使其学会产生有利于识别的校正。"
```