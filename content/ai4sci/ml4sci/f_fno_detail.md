### F-FNO — 分解傅里叶神经算子 (Factorized FNO)

```yaml
id: f_fno
name: F-FNO
full_name: 分解傅里叶神经算子 (Factorized FNO)
year: '2022'
org: Caltech
paper_url: https://arxiv.org/abs/2111.13587
category: operators
parent: fno
motivation: 维度分解减少参数量
```

#### 📝 一句话总结

F-FNO 将 FNO 的多维傅里叶卷积拆成按空间维度独立处理的可分离频谱层，并配合后置残差连接、Markov 训练、噪声增强和余弦学习率，使神经算子能用更少参数堆到更深层，在规则网格、点云和结构网格 PDE 上显著优于 FNO/geo-FNO。

#### 🎯 核心要点

- **来源说明**：任务元信息中的 `https://arxiv.org/abs/2111.13587` 实际指向 AFNO；F-FNO 对应官方论文为 `https://arxiv.org/abs/2111.13802`，ICLR 2023 版本见 `https://openreview.net/forum?id=tmIiMPl4IPa`，代码和图示见 `https://github.com/alasdairtran/fourierflow`
- **可分离频谱层**：把原 FNO 的 \(D\) 维 FFT 权重 \(R^{(\ell)}\) 改为每个维度的 \(R_d^{(\ell)}\)，复杂度从 \(O(LH^2M^D)\) 降到 \(O(LH^2MD)\)
- **后置残差连接**：在非线性和两层前馈块之后再加 \(z^{(\ell)}\)，保留输入表示，缓解深层 FNO/geo-FNO 随层数增加不收敛的问题
- **深层可扩展**：论文实验中 FNO/geo-FNO 在 24 层附近性能恶化或不收敛，F-FNO 可扩展到 24 层并继续受益
- **训练策略组合**：teacher forcing、一阶 Markov 假设、输入高斯噪声、AdamW/权重衰减、梯度裁剪、warmup + cosine decay 是效果的重要组成
- **几何泛化**：保留 geo-FNO 的坐标形变 \(\phi\)，可处理规则网格、点云、结构网格和 3D 时空输出
- **输入上下文灵活**：Navier-Stokes 任务可把涡量、速度、坐标、黏度 \(\nu\)、外力 \(f_t\) 作为不同通道输入
- **经验结果**：在 Navier-Stokes 上相对 FNO 降低约 83% 误差；在弹性、翼型、塑性锻造任务上相对 geo-FNO 分别降低约 31%、57%、60% 误差

#### 🔬 深入细节

##### 核心架构示意

![F-FNO 架构海报与算子层示意](https://github.com/alasdairtran/fourierflow/blob/main/figures/poster.png?raw=true)
*图：作者仓库公开海报中的 F-FNO 架构。右上展示从输入函数经形变、lifting、多个算子层、projection 到输出函数的流程；中间的算子层把 2D 问题中的 \(x\)、\(y\) 方向分别做 FFT、频谱权重乘法和 IFFT，再在物理空间合并。论文 Figure 2 的 PDF 图可从 arXiv 源码 `figures/diagram.pdf` 获得。*

##### 算法伪代码

```python
# F-FNO 前向传播伪代码（2D 版本，省略 batch/channel 维细节）
def ffno_forward(a, coords=None, context=None):
    # 可选：geo-FNO 风格坐标形变，把点云/结构网格映射到规则计算域
    x = deform_to_uniform(a, coords) if coords is not None else a

    # 输入表示可拼接涡量、坐标、黏度、外力等上下文
    x = concatenate_channels(x, context)
    z = lifting_P(x)

    for layer in range(L):
        # 按空间维度分解傅里叶算子，而不是一次性学习 D 维频谱权重
        spectral = 0
        for dim in spatial_dims:
            z_hat = fft(z, dim=dim)
            z_hat = keep_low_modes(z_hat, M)
            z_hat = complex_mul(R[layer][dim], z_hat)
            spectral = spectral + ifft(z_hat, dim=dim)

        # 两层前馈 + 后置残差
        h = relu(W1[layer](spectral) + b1[layer])
        h = relu(W2[layer](h) + b2[layer])
        z = z + h

    u = projection_Q(z)
    return deform_back(u, coords) if coords is not None else u

# 训练要点
for step in range(num_steps):
    omega_t, omega_next, context = sample_batch()
    omega_t = omega_t + gaussian_noise_like(omega_t)
    pred = ffno_forward(omega_t, context=context)  # 一阶 Markov: 只预测下一步
    loss = normalized_mse(pred, omega_next)
    loss.backward()
    clip_grad_value_(model.parameters(), 0.1)
    adamw.step()
    cosine_scheduler.step()
```

##### 动机与背景

FNO 的核心优势是把神经算子的积分核写成傅里叶卷积，从而用 FFT 高效捕获全局相互作用。但原始 FNO 的频谱权重是 \(D\) 维联合张量，若隐藏维度为 \(H\)、保留频率模态数为 \(M\)、层数为 \(L\)、问题维度为 \(D\)，参数量主要来自：

$$O(LH^2M^D)$$

这在高维问题中增长很快。更关键的是，论文作者观察到原始 FNO 和 geo-FNO 随网络层数加深会退化，甚至在 24 层附近不收敛；即使 4 层模型，在 Kolmogorov flow 这类湍流预测上仍与数值求解器有明显误差。F-FNO 的目标不是重新发明神经算子，而是在 FNO/geo-FNO 框架内把频谱表示和深层稳定性做得更可扩展。

##### 从 FNO 到 F-FNO 的关键计算

原始 FNO/geo-FNO 的整体算子可写为：

$$u = \mathcal{G}(a) =
(\phi \circ \mathcal{Q} \circ \mathcal{L}^{(L)} \circ \cdots \circ \mathcal{L}^{(1)} \circ \mathcal{P} \circ \phi^{-1})(a)$$

其中 \(\mathcal{P}\) 是 lifting，\(\mathcal{Q}\) 是 projection，\(\phi\) 是处理不规则几何时使用的可学习坐标形变。原始 FNO 的每层通常是：

$$\mathcal{L}^{(\ell)}(z^{(\ell)}) =
\sigma\left(W^{(\ell)}z^{(\ell)} + b^{(\ell)} + \mathcal{K}^{(\ell)}(z^{(\ell)})\right)$$

频谱核积分算子为：

$$\mathcal{K}^{(\ell)}(z^{(\ell)}) =
\operatorname{IFFT}\left(R^{(\ell)} \cdot \operatorname{FFT}(z^{(\ell)})\right)$$

F-FNO 改成先做维度分解，再将各维贡献相加：

$$\mathcal{K}^{(\ell)}(z^{(\ell)}) =
\sum_{d \in D}
\operatorname{IFFT}\left(
R_d^{(\ell)} \cdot \operatorname{FFT}_d(z^{(\ell)})
\right)$$

直觉上，原始 FNO 学的是一个完整 \(D\) 维频谱卷积核；F-FNO 学的是沿每个坐标轴的可分离全局混合。它牺牲了一部分全维频率耦合的直接表达，换来参数量和内存的大幅降低，也让 3D 或时空问题更容易训练。论文还指出可以跨层共享 \(R_d\)，进一步把复杂度降到 \(O(H^2MD)\)。

##### 后置残差为什么重要

F-FNO 的层更新写成：

$$\mathcal{L}^{(\ell)}(z^{(\ell)}) =
z^{(\ell)} + \sigma\left[
W_2^{(\ell)} \sigma\left(
W_1^{(\ell)} \mathcal{K}^{(\ell)}(z^{(\ell)}) + b_1^{(\ell)}
\right) + b_2^{(\ell)}
\right]$$

与原 FNO 把 \(Wz + b + \mathcal{K}(z)\) 放进同一个激活不同，F-FNO 在非线性变换之后再把输入 \(z^{(\ell)}\) 加回来。这更接近 ResNet/Transformer 前馈块的思想：每层只学习对当前函数表示的增量修正，而不是每层都重新改写完整表示。对于长时间 PDE rollout，这种设计能降低深层堆叠时的信息损失。

##### 训练与推理流程

在 Navier-Stokes/Kolmogorov flow 任务中，F-FNO 使用一阶 Markov 形式学习 \(\omega_t \mapsto \omega_{t+1}\)，而不是把多步历史全部作为输入。训练时使用 teacher forcing，即当前步输入来自真实轨迹而非模型上一步预测，避免早期误差滚雪球污染训练信号。推理时则自回归 rollout，把预测的 \(\hat{\omega}_{t+1}\) 送回模型继续预测。

评价损失使用归一化均方误差：

$$\text{N-MSE} =
\frac{1}{B}\sum_{i=1}^{B}
\frac{\|\hat{\omega}_i - \omega_i\|_2}{\|\omega_i\|_2}$$

论文还用涡量相关系数衡量长时间仿真的稳定性：

$$\rho(\omega,\hat{\omega}) =
\sum_i\sum_j
\frac{\omega_{ij}}{\|\omega\|_2}
\frac{\hat{\omega}_{ij}}{\|\hat{\omega}\|_2}$$

这比单步误差更接近真实仿真需求：如果相关性很快跌破阈值，即使单步 loss 好看，模型也无法替代长期数值模拟。

##### 与 FNO/geo-FNO 的区别

| 方面 | FNO | geo-FNO | F-FNO |
|------|-----|---------|-------|
| 频谱层 | 联合多维 FFT 权重 \(R\) | 结合几何形变的 FNO | 按维度分解 \(R_d\)，各维频谱贡献求和 |
| 参数复杂度 | \(O(LH^2M^D)\) | 仍受频谱权重规模影响 | \(O(LH^2MD)\)，可共享到 \(O(H^2MD)\) |
| 几何 | 规则网格 | 点云/结构网格 | 保留 geo-FNO 形变，可处理多几何 |
| 深层训练 | 层数增加易退化 | 复杂几何下也会退化 | 后置残差 + 分解层支持 24 层 |
| 输入上下文 | 通常固定输入变量 | 可结合几何坐标 | 显式支持黏度、外力、坐标等通道 |

> 💡 关键：F-FNO 的“分解”不是把 PDE 拆成多个子问题，而是把傅里叶域的全局混合按空间维度分解；这样保留 FFT 的长程建模能力，同时把参数增长从指数型的 \(M^D\) 拉回线性型的 \(MD\)。

#### 🧪 练习题

```yaml
question: "F-FNO 将原始 FNO 的频谱核从 R 改为按维度的 R_d，最直接解决的问题是什么？"
options:
  - "让模型完全不需要训练数据"
  - "把频谱层参数复杂度从 O(LH^2M^D) 降到 O(LH^2MD)"
  - "把所有 PDE 强制转化为一维常微分方程"
  - "消除傅里叶变换对周期边界的任何假设"
answer: 1
explain: "F-FNO 的核心是维度分解的傅里叶表示，每个空间维度独立做 FFT 和频谱权重乘法，因此参数量随维度线性增长，而不是随 M^D 指数式增长。"
```
