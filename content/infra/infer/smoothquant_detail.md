### SmoothQuant: 平滑量化 (SmoothQuant)

```yaml
id: smoothquant
name: SmoothQuant
full_name: 平滑量化 (SmoothQuant)
year: '2022'
org: MIT
paper_url: https://arxiv.org/abs/2211.10438
category: quantize
parent: —
motivation: 迁移激活值量化难度实现W8A8推理
```

#### 📝 一句话总结

SmoothQuant 提出一种训练无关的等价通道缩放，把 LLM 激活 outlier 的量化难度离线迁移到更容易量化的权重上，从而让 Transformer 中主要 GEMM/BMM 可以执行硬件友好的 W8A8 INT8 推理。

#### 🎯 核心要点

- 针对 LLM 激活通道中的系统性 outlier，解决直接 INT8 激活量化时有效比特不足的问题
- 利用线性层等价变换 \(Y=XW=(X\operatorname{diag}(s)^{-1})(\operatorname{diag}(s)W)\)
- 用每通道平滑因子 \(s_j\) 缩小激活动态范围，并等价放大对应输入通道权重
- 引入迁移强度 \(\alpha\)，在激活量化难度和权重量化难度之间连续折中
- 离线用校准样本统计激活最大值，论文实验使用 Pile 验证集随机句子校准
- 将 smoothing factor 融合进前序 LayerNorm/linear 或 residual 分支，避免运行时额外 kernel
- 在线推理把 linear 和 attention BMM 的输入/权重映射到 INT8，保留 Softmax、LayerNorm 等轻量算子为 FP16

#### 🔬 深入细节

![SmoothQuant intuition](https://raw.githubusercontent.com/mit-han-lab/smoothquant/main/figures/intuition.png)
*图：SmoothQuant 官方 GitHub 仓库中的 intuition 图；左侧激活 outlier 拉大量化范围，右侧通过平滑变换把难度迁移到权重后，激活和权重都更容易量化。*

```python
# SmoothQuant: offline smoothing and W8A8 deployment
def smoothquant_linear(W, calibration_acts, alpha=0.5):
    # act_absmax[j]: input channel j 上校准激活的最大绝对值
    act_absmax = max_abs_per_input_channel(calibration_acts)
    # weight_absmax[j]: W 的输入通道 j 对应整行/整组权重最大绝对值
    weight_absmax = max_abs_per_input_channel(W)

    s = (act_absmax ** alpha) / (weight_absmax ** (1 - alpha))
    W_smooth = diag(s) @ W
    return W_smooth, s

def int8_inference(X, W_smooth, s):
    X_smooth = X @ diag(1 / s)      # 实际部署中通常离线融合掉这一步
    X_int8, sx = quantize_int8(X_smooth)
    W_int8, sw = quantize_int8(W_smooth)
    return int8_gemm(X_int8, W_int8, sx, sw)
```

LLM 的激活量化难点在于 outlier 会支配统一量化步长。对 \(N\)-bit 对称均匀量化，常见量化步长为：

$$
\bar X_{\mathrm{INT8}}=\left\lceil \frac{X_{\mathrm{FP16}}}{\Delta}\right\rfloor,\qquad
\Delta=\frac{\max(|X|)}{2^{N-1}-1}
$$

当某些通道的 \(\max(|X|)\) 远高于其他值时，大部分普通激活只能落在很少的离散格点上，有效比特数下降。LLM.int8() 通过混合精度保留 outlier 可以保精度，但 outlier 分解会让硬件实现变复杂，难以把所有大矩阵乘法都落到高效 INT8 kernel 上。

SmoothQuant 的核心是一个完全等价的对角缩放。对 Transformer 线性层 \(Y=XW\)，选择每个输入通道的正缩放因子 \(s_j\)，有：

$$
Y=XW=(X\operatorname{diag}(s)^{-1})(\operatorname{diag}(s)W)=\hat X\hat W
$$

这意味着激活通道可以除以 \(s_j\) 变“平滑”，而权重对应输入通道乘以 \(s_j\) 后承担这部分尺度。因为权重通常比激活更稳定、更容易做 per-channel 或 per-tensor INT8 量化，所以把一部分难度迁移过去能同时保持精度和硬件友好性。

迁移强度由 \(\alpha\) 控制，论文给出的平滑因子是：

$$
s_j=\frac{\max(|X_j|)^\alpha}{\max(|W_j|)^{1-\alpha}}
$$

\(\alpha=0\) 时几乎不处理激活 outlier，\(\alpha=1\) 时把激活范围强行拉平但会让权重更难量化。论文发现 OPT/BLOOM 多数情况下 \(\alpha=0.5\) 是平衡点，GLM-130B 这类激活 outlier 更强的模型可以用更大的 \(\alpha\)，如 0.75。

部署流程分为离线校准和平滑融合。离线阶段记录每层输入激活的通道最大值，计算 \(s\)，再把 \(\operatorname{diag}(s)\) 融入当前层权重，把 \(\operatorname{diag}(s)^{-1}\) 尽量融合进上一层 LayerNorm、linear 或 residual 分支。这样运行时看到的是已经平滑后的激活分布，不需要额外插入昂贵的逐元素缩放 kernel。

SmoothQuant 与 GPTQ/AWQ 这类 weight-only 低比特方法的目标不同。GPTQ 追求 3/4-bit 权重压缩，矩阵乘通常仍要处理 FP16 激活；SmoothQuant 追求 W8A8，把权重和激活都变成 INT8，使 linear、attention BMM 这类主要算子能直接使用成熟 INT8 GEMM。它牺牲了一部分压缩率，但换来更通用的硬件加速路径。

> 💡 关键：SmoothQuant 并不是“消除 outlier”，而是用数学等价变换改变 outlier 所在张量。输出不变，量化难度的位置变了。

#### 🧪 练习题

```yaml
question: "SmoothQuant 中参数 alpha 的作用是什么？"
options:
  - "控制迁移多少激活量化难度到权重上"
  - "决定模型训练轮数"
  - "选择剪枝后的稀疏率"
  - "替代 attention 的 softmax 温度"
answer: 0
explain: "alpha 越大，激活被平滑得越强，更多动态范围压力会转移到权重；alpha 过大或过小都会让一侧量化误差变大。"
```
