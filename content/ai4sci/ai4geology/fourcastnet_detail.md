### FourCastNet

```yaml
id: fourcastnet
name: FourCastNet
full_name: 傅里叶预报网络 (Fourier Forecasting Neural Network)
year: '2022'
org: NVIDIA
paper_url: https://arxiv.org/abs/2202.11214
category: meteo_ai
parent: convlstm
motivation: 傅里叶神经算子处理全球尺度物理场
```

#### 📝 一句话总结

FourCastNet 将全球天气预报建模为高分辨率物理场的神经算子学习问题，用 Vision Transformer 骨架和 Adaptive Fourier Neural Operator（AFNO）在频域完成全局 token mixing，解决了卷积模型难以在 0.25° 全球网格上兼顾长程依赖、细尺度结构和快速集合预报的问题。

#### 🎯 核心要点

- **AFNO 天气预报骨架**：把 \(720 \times 1440\) 经纬度场切成 patch token，在傅里叶域进行全局混合，再用通道 MLP 更新每个 token
- **20 个 ERA5 预报变量**：使用 1979-2015 年 ERA5 训练、2016-2017 年验证、2018 年以后测试，以 6 小时间隔学习 \(X_t \rightarrow X_{t+6h}\)
- **两阶段训练**：先做单步监督预训练，再用两步自由运行 fine-tuning 显式降低自回归滚动时的误差累积
- **降水诊断模型**：总降水不放入动力骨架，而由单独 AFNO 诊断 6 小时累计降水，并对稀疏长尾降水做 log transform
- **高分辨率与长程依赖兼容**：AFNO 用 FFT 将空间混合复杂度压低到适合百万像素全球场的量级，避免普通 CNN 在高分辨率下需要极深感受野
- **快速集合预报**：论文报告一周预报少于 2 秒，100 成员 24 小时集合预报可在单个 4×A100 节点上约 7 秒完成
- **极端天气能力**：在台风、飓风、近地面风速和大气河等细尺度结构上明显优于低分辨率深度学习天气模型

#### 🔬 深入细节

##### 图示与可访问来源

![FourCastNet AFNO 架构与训练/推理模式](https://ar5iv.labs.arxiv.org/html/2202.11214/assets/afno_plus_v1.png)
*图：FourCastNet 的 AFNO Transformer 骨架、两步 fine-tuning、降水诊断模型和自回归推理模式。来源为论文 ar5iv HTML 图像；论文页见 https://arxiv.org/abs/2202.11214。*

##### 方法背景：为什么用傅里叶神经算子

FourCastNet 面对的是全球 0.25° ERA5 网格，单个时间片约为 \(720 \times 1440\) 个格点，每个样本包含 20 个大气或地表变量。低分辨率天气网络可以用普通 CNN 或 ConvLSTM 做局部卷积，但在这种百万像素级输入上，卷积模型要么感受野不足，难以连接远距离天气系统；要么需要堆叠大量层，显存和推理成本迅速上升。论文中将这种问题归结为高分辨率物理场里的全局依赖建模，而不是普通图像预测。

AFNO 的关键选择是把空间 token mixing 放到傅里叶域。对纬度-经度 patch token 做二维 FFT 后，每个频率分量天然包含全局空间信息；再用共享的块对角 MLP 对频率和通道做可学习变换，并用 soft-thresholding 抑制不重要频率。这样模型既保留了 Transformer/Vision Transformer 的 token 表示，又避免标准自注意力在 \(N\) 个 patch 上的 \(O(N^2)\) 代价。

##### AFNO 层的核心计算

设输入天气状态为 \(X_t \in \mathbb{R}^{C \times H \times W}\)，其中 \(C=20\)，\(H=720\)，\(W=1440\)。Patch embedding 将其变成 token 网格 \(u \in \mathbb{R}^{H_p \times W_p \times d}\)。一个 AFNO block 可概括为：

$$
\hat{u}=\mathcal{F}_{2D}(u)
$$

$$
z_{m} = W_{2,m}\,\sigma(W_{1,m}\hat{u}_{m}+b_{1,m})+b_{2,m}
$$

$$
\tilde{z}_{m} = \operatorname{SoftShrink}_{\lambda}(z_m)
= \operatorname{sign}(z_m)\max(|z_m|-\lambda, 0)
$$

$$
u' = u + \mathcal{F}_{2D}^{-1}(\tilde{z})
$$

这里 \(m\) 表示通道块或频率块，块对角权重减少参数和计算量；\(\lambda\) 控制频率稀疏性。直觉上，低频部分承载大尺度环流，高频部分承载锋面、降水边界、地形影响等细尺度结构；soft-thresholding 让模型只保留对预测有用的频谱响应，减少噪声和过拟合。

##### 训练目标与自回归 fine-tuning

FourCastNet 的基础骨架学习 6 小时映射：

$$
\hat{X}_{t+1}=f_{\theta}(X_t), \qquad t+1 \equiv t+6\text{h}
$$

预训练阶段使用单步监督损失：

$$
\mathcal{L}_{1}(\theta)=\left\| f_{\theta}(X_t)-X_{t+1}\right\|_2^2
$$

但真实中期预报需要反复把模型输出喂回自身。单步误差在自由运行时会积累，因此论文进一步做两步 fine-tuning：

$$
\hat{X}_{t+1}=f_{\theta}(X_t),\qquad
\hat{X}_{t+2}=f_{\theta}(\hat{X}_{t+1})
$$

$$
\mathcal{L}_{2}(\theta)=
\left\|\hat{X}_{t+1}-X_{t+1}\right\|_2^2+
\left\|\hat{X}_{t+2}-X_{t+2}\right\|_2^2
$$

这一步的作用不是让模型只会预测 12 小时，而是让模型在训练时看到“自己的预测作为下一步输入”这一分布偏移。它直接针对自回归 rollout 的暴露偏差，使 3-7 天预报不会因为前几步的小误差迅速漂移。

##### 降水为什么单独诊断

总降水 \(P\) 与温度、风、位势高度这类连续大气变量不同：大量格点为零，少数强降水格点形成长尾分布，而且降水对后续大尺度动力变量的反作用不如温压风场直接。FourCastNet 因此把降水作为诊断变量，由独立 AFNO 模型 \(g_{\psi}\) 从骨架预测的大气状态中输出 6 小时累计降水：

$$
\hat{P}_{t+1}=g_{\psi}(\hat{X}_{t+1})
$$

训练时使用 log 变换缓解稀疏和长尾：

$$
P^{\log}=\log(1+P/\epsilon)
$$

并在输出端用 ReLU 约束降水非负。这个拆分有一个工程上很重要的含义：骨架专注于学习决定天气演化的连续状态变量，降水模型专注于从这些状态中恢复稀疏、高频、局地化的降水诊断。

##### 伪代码：训练与 10 天预报

```python
# FourCastNet 核心流程：6小时步长的 AFNO 自回归天气预报
def train_backbone(batch):
    x_t, x_t1, x_t2 = batch  # ERA5: t, t+6h, t+12h

    # 1. 单步预训练
    pred_t1 = AFNO_backbone(x_t)
    loss_pretrain = mse(pred_t1, x_t1)

    # 2. 两步 fine-tuning：第二步输入使用模型自己的输出
    pred_t2 = AFNO_backbone(pred_t1)
    loss_finetune = mse(pred_t1, x_t1) + mse(pred_t2, x_t2)

    return loss_pretrain, loss_finetune


def forecast_10_days(x0):
    x = x0
    trajectory = []
    for step in range(40):  # 10天 / 6小时 = 40步
        x = AFNO_backbone(x)
        precip = precipitation_AFNO(x)  # 6小时累计降水诊断
        trajectory.append({"state": x, "tp6h": precip})
    return trajectory
```

##### 与传统数值预报和 CNN 预报的差异

传统 NWP 通过离散化大气动力学方程、物理参数化和数据同化来积分未来状态，优点是物理一致性强，缺点是依赖超级计算资源，集合预报成本高。FourCastNet 不显式求解 Navier-Stokes 或原始方程，而是从 ERA5 再分析数据中学习状态转移算子；它牺牲了硬物理约束，换来极快推理和大规模集合能力。

相对于 CNN/ConvLSTM，FourCastNet 的核心差异是“全局频域混合”。CNN 的局部卷积适合平移等变图像模式，但天气系统有跨洋盆、跨纬带的远程相互作用，且在 0.25° 网格上单纯扩大感受野代价很高。AFNO 的频域 token mixing 一步就能看到全局模式，因此更适合罗斯贝波、急流、热带气旋路径这类多尺度耦合问题。

> 💡 关键：FourCastNet 的贡献不只是“用深度学习做天气预报”，而是把全球高分辨率天气状态当作连续物理场的算子学习任务，并用 AFNO 解决高分辨率下全局混合的计算瓶颈。

##### 局限性

FourCastNet 仍是纯数据驱动模型，不保证能量、水汽或动量守恒；论文也指出它在部分极端降水上仍会偏平滑。它建模的变量数量和垂直层数远少于业务 IFS，因此更适合作为快速中期预报和集合预报工具，而不是完整替代所有数值天气预报流程。

#### 🧪 练习题

```yaml
question: "FourCastNet 使用 AFNO 的主要原因是什么？"
options:
  - "把天气预报变成文本生成任务"
  - "在高分辨率全球网格上用傅里叶域 token mixing 高效建模长程空间依赖"
  - "完全消除自回归误差累积"
  - "用显式物理方程替代 ERA5 数据训练"
answer: 1
explain: "AFNO 通过 FFT 在频域混合空间 token，能在百万像素级全球场上捕捉长程依赖，同时比标准注意力或极深卷积更适合高分辨率天气预报。"
```
