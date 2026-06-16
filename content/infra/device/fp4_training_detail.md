### FP4 Training: FP4 全量化训练

```yaml
id: fp4_training
name: FP4 Training
full_name: FP4全量化训练 (FP4 Fully Quantized LLM Training)
year: '2026'
org: NeurIPS
paper_url: https://proceedings.neurips.cc/paper_files/paper/2025/hash/8340b085045cf13f1f0b6c2c4cc0a89c-Abstract-Conference.html
category: efficiency
parent: bnn
motivation: 首次实现FP4精度全量化LLM训练
```

#### 📝 一句话总结

FP4 All the Way 首次展示权重、激活和梯度都以 FP4 为主的 LLM 全量化训练路径，通过 NVFP4、Split Rounding 和 QAF 收尾，使 7B 模型在大规模训练后达到与 BF16 基线相当的下游表现。

#### 🎯 核心要点

- 目标是 Fully Quantized Training：训练中的 forward、backward、update 三类 GEMM 都能使用低精度输入，而不只量化权重或激活
- 采用 NVFP4 格式：FP4 E2M1 数据、每 16 个值一个 E4M3 FP8 scale，相比 MXFP4 的 32 值块和 E8M0 scale 更稳定
- 系统比较 block size、scale format 和 rounding mode，发现 E4M3/E3M4 scale 最优，block size 小于 16 的收益开始变小
- 提出 Split Rounding：forward GEMM 的权重和激活使用 round-to-nearest，backward/update 中的梯度及 update 激活使用 stochastic rounding
- 理论分析指出当每坐标梯度标准差接近 \(\sqrt{3}\) 倍量化噪声标准差以下时，FP4 梯度更新效率明显下降
- 提出 QAF 收尾：训练末期 forward 保持 FP4，backward 与 update 切回 BF16，提高信噪比并闭合与 BF16 的 loss gap
- 在 Llama2 7B、256 块 Intel Gaudi2 上进行大规模实验，论文报告 FP4+QAF 的零样本下游表现与 BF16 基线相当

#### 🔬 深入细节

##### 核心示意图

![FP4 Training 中不同 scale format 的训练稳定性对比](https://arxiv.org/html/2505.19115v2/x1.png)
*图：FP4 All the Way Figure 1，来源为 arXiv HTML 论文图。图中比较 350M Llama 风格模型在 E1M6 到 E8M0 不同 scale format 下的训练 loss，E4M3 是 NVFP4 使用的 scale 格式。*

##### 算法伪代码

```python
# FP4 All the Way: NVFP4 + Split Rounding + QAF 的简化训练循环
def quantize_nvfp4(x, block_size=16, rounding="rtn"):
    q_blocks, scales = [], []
    for block in split_consecutive(x, block_size):
        # NVFP4: E2M1 data + E4M3 scale
        s = quantize_to_e4m3(max_abs(block) / fp4_e2m1_max())
        y = block / s
        if rounding == "rtn":
            q = round_to_nearest_e2m1(y)
        else:
            q = stochastic_round_e2m1(y)
        q_blocks.append(pack_fp4(q))
        scales.append(s)
    return q_blocks, scales

def fp4_gemm(a, b, rounding_a, rounding_b):
    qa, sa = quantize_nvfp4(a, rounding=rounding_a)
    qb, sb = quantize_nvfp4(b, rounding=rounding_b)
    return matmul_dequantized_fp4(qa, qb, sa, sb, accumulate="bf16/fp32")

def train_step(model, batch, phase):
    # Forward GEMM: Q_rtn(W) @ Q_rtn(a)
    activations = batch.x
    for layer in model.layers:
        activations = fp4_gemm(layer.weight, activations,
                               rounding_a="rtn", rounding_b="rtn")

    loss = cross_entropy(activations, batch.y)

    if phase == "fp4_fqt":
        # Backward GEMM: Q_rtn(W^T) @ Q_sr(delta)
        deltas = loss_gradient(loss)
        for layer in reversed(model.layers):
            deltas = fp4_gemm(layer.weight.T, deltas,
                              rounding_a="rtn", rounding_b="sr")

        # Update GEMM: Q_sr(delta) @ Q_sr(a^T)
        for layer in model.layers:
            grad_w = fp4_gemm(layer.delta, layer.input.T,
                              rounding_a="sr", rounding_b="sr")
            optimizer_update_bf16_master_weight(layer.weight, grad_w)

    elif phase == "qaf":
        # 收尾阶段: forward 仍按 FP4 暴露量化误差，反向和更新回 BF16
        bf16_backward_and_update(loss, model)

for step, batch in enumerate(dataloader):
    phase = "qaf" if step >= qaf_start_step else "fp4_fqt"
    train_step(model, batch, phase)
```

##### NVFP4 为什么优于 MXFP4

FP4 的基础表示极窄。以常用 E2M1 为例，4 bit 需要同时编码符号、2 位指数和 1 位尾数，直接表示 Transformer 权重、激活和梯度会产生很大量化误差。论文把问题拆成“低比特值”和“scale 元数据”：对每个 block \(B\)，选择一个 FP8 scale，把局部动态范围映射到 FP4 网格：

$$
s_B=\mathrm{Quant}_{\mathrm{E4M3}}\left(\frac{\max_{x\in B}|x|}{q_{\max}}\right),\qquad
\widehat{x}=\mathrm{Round}_{\mathrm{E2M1}}\left(\frac{x}{s_B}\right),\qquad
\widetilde{x}=s_B\widehat{x}.
$$

MXFP4 和 NVFP4 的值格式都是 E2M1，但 MXFP4 用 32 个值共享一个 E8M0 scale，NVFP4 用 16 个值共享一个 E4M3 scale。E8M0 只有指数没有尾数，scale 只能落在 2 的幂附近；E4M3 有 3 位尾数，虽然动态范围较窄但能更精细地贴合局部最大值。论文的 scale-format sweep 显示，E4M3 和 E3M4 的训练 loss 最好，E1M6 甚至会发散；这从实证上支持 NVFP4 的硬件格式选择。

##### Split Rounding 的设计逻辑

训练中每个线性层至少涉及三类 GEMM：forward 用 \(W a\)，backward 用 \(W^\top \delta\)，update 用 \(\delta a^\top\)。FP4 全量化训练的关键不是所有位置统一舍入，而是按误差后果选择舍入方式：

$$
\mathrm{Forward}:\quad Q_{\mathrm{RtN}}(W)\,Q_{\mathrm{RtN}}(a)
$$

$$
\mathrm{Backward}:\quad Q_{\mathrm{RtN}}(W^\top)\,Q_{\mathrm{SR}}(\delta)
$$

$$
\mathrm{Update}:\quad Q_{\mathrm{SR}}(\delta)\,Q_{\mathrm{SR}}(a^\top).
$$

Round-to-nearest (RtN) 的均方误差小，适合 forward：前向激活噪声会层层传播，降低方差比保持无偏更重要。Stochastic rounding (SR) 的单次噪声更大，但期望无偏，适合梯度和权重更新：如果 update 的梯度长期带有确定性偏差，优化会收敛到错误位置或留下不可消除的残差损失。论文的 rounding ablation 说明，把 RtN 放到 update/backward 的神经梯度位置会提高训练 loss；而 forward 权重/激活用 RtN 反而更稳。

##### 量化 SGD 的临界噪声

论文用带随机舍入噪声的 SGD 分析解释为什么 FP4 训练后期会变难。若量化梯度噪声方差为 \(\sigma_q^2\)，二阶近似下单步期望 loss 变化可写成：

$$
\mathbb{E}[L(\theta_{t+1})-L(\theta_t)]
\approx
-\eta\|\nabla L(\theta_t)\|_2^2
+\frac{1}{2}\eta^2\nabla L(\theta_t)^\top H(\theta_t)\nabla L(\theta_t)
+\frac{1}{2}\eta^2\sigma_q^2\mathrm{tr}(H(\theta_t)).
$$

前两项是正常梯度下降和曲率影响，最后一项是量化噪声带来的损失上升。推导最敏感点后，论文给出临界噪声近似：

$$
\sigma_{\mathrm{critical}}
=\frac{\|\nabla L(\theta_t)\|_2}{\sqrt{3d}}.
$$

直觉是：训练早期梯度大，FP4 噪声只是扰动；训练后期梯度小，量化噪声与真实梯度同量级，更新方向的信噪比下降。论文把这个阈值解释为切换到更高精度收尾的信号：当每坐标梯度幅度下降到约 \(\sqrt{3}\) 倍量化噪声标准差附近，继续全 FP4 更新的边际收益变差。

##### QAF 收尾与全量化训练边界

QAF (Quantization-Aware Finetuning) 的做法很克制：forward 继续使用 FP4，让模型保持对低精度前向路径的适配；backward 和 update 切回 BF16，让最后阶段的梯度信号摆脱 FP4 噪声。这样既避免了训练后再做 PTQ 的分布错配，又能在 loss gap 出现后快速贴回 BF16 基线。

论文在 7B 规模实验中使用 Llama2 架构和 256 块 Intel Gaudi2 训练。需要注意的是，Gaudi2 本身不提供原生 FP4 Tensor Core，因此实验中的 FP4 计算是模拟路径，论文主要证明数值可行性，而不是直接给出真实 FP4 硬件吞吐。作者基于 FP4 相对 FP8/BF16 GEMM 的吞吐关系估计，原生 FP4 硬件上会有明显 time-to-train 收益；但从工程落地看，收益仍依赖硬件是否高效支持 packed FP4、scale 加载、SR 和低精度累加。

##### 与此前 FP4 训练工作的区别

此前工作通常只覆盖一部分训练矩阵乘：有的量化权重和激活但保留梯度高精度，有的只研究梯度压缩或 MXFP4 梯度更新。FP4 All the Way 的贡献在于把三类张量都纳入 FP4 训练闭环，并明确指出不同位置的舍入策略和后期精度切换边界。换句话说，它不是单个量化器，而是一套训练制度：NVFP4 决定数值网格，Split Rounding 决定噪声偏差，QAF 决定何时退出全 FP4 更新。

资料来源：NeurIPS 2025 论文页 https://proceedings.neurips.cc/paper_files/paper/2025/hash/8340b085045cf13f1f0b6c2c4cc0a89c-Abstract-Conference.html；论文 PDF https://proceedings.neurips.cc/paper_files/paper/2025/file/8340b085045cf13f1f0b6c2c4cc0a89c-Paper-Conference.pdf；arXiv HTML https://arxiv.org/html/2505.19115v2；参考实现 https://github.com/Anonymous1252022/fp4-all-the-way。

#### 🧪 练习题

```yaml
question: "FP4 All the Way 中 Split Rounding 的核心原因是什么？"
options:
  - "前向传播更需要低方差，梯度更新更需要无偏噪声"
  - "RtN 只能用于 Blackwell，SR 只能用于 Gaudi2"
  - "所有 FP4 张量都必须随机舍入，否则无法打包"
  - "QAF 阶段要求权重永久冻结"
answer: 0
explain: "forward 噪声会逐层传播，RtN 的均方误差更低；backward 和 update 直接决定优化方向，SR 的无偏性更重要，可避免梯度偏差长期积累。"
```
