### ASTRA: 硅光子随机 Transformer 加速器

```yaml
id: astra_photonic
name: ASTRA
full_name: 硅光子随机Transformer加速器 (ASTRA Silicon Photonic Transformer Accelerator)
year: '2026'
org: ACM TECS
paper_url: https://dl.acm.org/doi/abs/10.1145/3769092
category: photonic
parent: —
motivation: 硅光子随机计算降低注意力机制功耗
```

#### 📝 一句话总结

ASTRA 提出首个面向 Transformer 的随机计算硅光子加速器，用光学随机有符号乘法器（OSSM）和 homodyne analog accumulation 替代传统多级模拟幅度编码，解决 photonic Transformer 加速中 DAC 功耗、异频串扰、动态 attention 数据流适配差的问题。论文在 Transformer-base、BERT-base、Albert-base、ViT-base、OPT-350 等模型上评估，报告相对先进 Transformer 加速器至少 7.6× 加速和 1.3× 能耗降低。

#### 🎯 核心要点

- 引入 Optical Stochastic Signed Multiplier（OSSM），将乘法转化为随机 bitstream 的光学 AND 操作
- 使用 binary-to-stochastic（B_to_S）转换、TCU 编码和 bit-position correlation，降低随机乘法误差
- 每个 VDP core 由多个 wavelength-specific VDPE 组成，每个 VDPE 只在单一波长上独立工作，避免传统 WDM VDPE 的 heterodyne crosstalk
- OSSM 输出按正负符号分成两条 homodyne 光学通道，由 photodetector / photo-charge accumulator 完成模拟域累加
- 避免随机加法链路，使用 temporal analog accumulation 聚合点积部分和，降低误差与数据搬移
- Transformer 中 QKV projection、attention score、attention-value、FFN GEMM 等静态/动态矩阵乘都映射到 VDP cores
- 非线性函数如 ReLU、GELU、Softmax 在数字 LUT / control unit 中完成，避免额外光电/电光转换
- 评估采用 8-bit 量化、128-bit stochastic stream 加 sign bit，精度相对 FP32 下降控制在约 1.2% 内
- 器件级分析显示每个 wavelength 可支持约 1024 个 OAG/OSSM，OAG 速度可超过 30 Gbps，支持大规模并行点积

#### 🔬 深入细节

##### 核心示意图

![ASTRA arXiv PDF 公开预览](https://image.thum.io/get/width/1200/crop/1600/https://arxiv.org/pdf/2604.09759%23page=2)
*图：作者 2026 arXiv 扩展摘要 “Sustainable Transformer Neural Network Acceleration with Stochastic Photonic Computing” 的公开 PDF 页面预览，摘要复用 ASTRA 的 OSSM、OAG、VDP/VDPE 与能耗评估图；ACM DOI 正文页面受访问限制，正文解读基于 ACM TECS DOI 元数据、作者上传全文 OCR 和该 arXiv 摘要。*

##### ASTRA 推理伪代码

```python
# ASTRA: Transformer GEMM/attention 的随机硅光子执行流程
def astra_transformer_layer(x, weights, astra):
    # 1) 线性层和注意力投影，动态/静态矩阵都转为 VDP core 任务
    q = astra_gemm(x, weights.W_q, astra)
    k = astra_gemm(x, weights.W_k, astra)
    v = astra_gemm(x, weights.W_v, astra)

    # 2) attention score: Q K^T / sqrt(d)
    score = astra_gemm(q, transpose(k), astra) / sqrt(q.head_dim)
    attn = digital_softmax_lut(score)
    context = astra_gemm(attn, v, astra)

    # 3) output projection + FFN
    y = astra_gemm(context, weights.W_o, astra)
    h = digital_gelu_lut(astra_gemm(y, weights.W_1, astra))
    return astra_gemm(h, weights.W_2, astra)


def astra_gemm(X_binary, W_binary, astra):
    # X/W 是量化后的二进制数；符号和幅值分开处理
    X_stream = B_to_S_with_TCU_and_correlation(X_binary.magnitude)
    W_stream = B_to_S_with_TCU(W_binary.magnitude)

    outputs = []
    for tile in map_matrix_to_vdp_cores(X_stream, W_stream, astra.vdp_cores):
        pos_charge = 0
        neg_charge = 0

        for bit_time in range(stochastic_stream_length):
            # OSSM/OAG 在光域完成 AND：1&1 表示一次随机乘法命中
            optical_hits = optical_and(tile.X_bits[bit_time], tile.W_bits[bit_time])
            pos, neg = route_by_sign(optical_hits, X_binary.sign, W_binary.sign)

            # 同波长 homodyne 聚合，PD/PCA 把光脉冲累加为模拟电荷
            pos_charge += photodetect_and_accumulate(pos)
            neg_charge += photodetect_and_accumulate(neg)

        outputs.append(stochastic_to_binary(pos_charge - neg_charge))

    return assemble_gemm_output(outputs)
```

##### 随机计算为什么适合光子乘法

传统光子矩阵乘通常用振幅或相位的多级模拟值表示权重和输入，再通过 microring 或 MZI 阵列调制光强。这条路线对 DAC、调制线性度、相位噪声和动态范围要求很高；在 Transformer 中，attention 的 operand 还会随 token 动态生成，weight-stationary 的光学数据流难以高效覆盖。ASTRA 的转向是把乘法从“高精度模拟幅度”改成“随机 bitstream 的时间密度”。

随机计算的基本关系是：

$$
P(X=1)=x,\qquad P(W=1)=w,\qquad P(X \land W=1)=xw
$$

也就是说，只要两个 bitstream 满足合适的统计关系，一个 AND gate 的输出中 1 的比例就近似乘积。ASTRA 把这个 AND gate 做成 optical AND gate（OAG），再封装成 OSSM。相比多级 DAC，这只需要 ON/OFF 型调制和光学逻辑事件，光学动态范围更小，器件更容易复制到大量并行通道。

##### OSSM、符号和 analog accumulation

Transformer GEMM 需要全范围有符号乘法，而不是只处理 \([0,1]\) 的无符号概率。ASTRA 因此把幅值和符号分开：幅值进入 B_to_S 单元生成随机 bitstream，符号决定 OSSM 输出进入正通道还是负通道。一个点积可写为：

$$
y_j = \sum_i s_i \cdot |x_i| \cdot |w_{ij}|,\qquad
s_i \in \{+1,-1\}
$$

在硬件中，正贡献和负贡献分别通过同一波长上的 homodyne 光学叠加到不同 lane。photodetector 把多个 OSSM 的光脉冲转换为电荷，photo-charge accumulator 在时间上累加，最后做差得到有符号结果：

$$
y_j \approx Q_j^+ - Q_j^-
$$

这一步避免了随机计算里最容易引入误差的 stochastic addition。换言之，ASTRA 只把“乘法命中”放到随机/光学域，把加法转移到模拟电荷累加域，最后再转回二进制。这种混合路径是其精度与能耗之间的关键折中。

##### VDP core 和 Transformer 数据流

ASTRA 的 VDP core 由 laser comb、microring wavelength routing、多个 wavelength-specific VDPE、B_to_S 单元、serializer、OSSM、photodetector/PCA 和电子控制单元组成。与传统 WDM photonic tensor core 把多个波长混在同一 VDPE 中不同，ASTRA 把每个 VDPE 绑定到一个波长。这样牺牲了一点共享灵活性，但避免了异频拍频引发的 heterodyne crosstalk，也减少长级联 microring 的插入损耗。

Transformer 层的主要开销来自矩阵乘：

$$
\mathrm{Attention}(Q,K,V)=\mathrm{softmax}\left(\frac{QK^\top}{\sqrt{d_k}}\right)V
$$

ASTRA 把 \(Q,K,V\) projection、\(QK^\top\)、\(\mathrm{softmax}(\cdot)V\)、output projection 和 FFN 两个 GEMM 都映射为 output-stationary 的 VDP core 任务。动态 attention score 不再需要先写回主存再重新配置固定权重阵列，而是由 ECU 对矩阵 tile 做资源分配，B_to_S / serializer 将当前 operand 转成随机流后直接送入 OSSM 阵列。GELU、ReLU、Softmax 这类非线性则保留在数字 LUT 中，减少反复电-光转换。

##### 精度、规模和性能直觉

随机计算的风险是 bitstream 太短会带来方差，bitstream 相关性不当会产生系统性误差。论文使用 deterministic B_to_S、B_to_TCU 和 bit-position correlation encoder 让两个随机向量满足低误差乘法条件；评估中采用 8-bit 量化、128-bit stochastic stream 与 sign bit，使五个 Transformer 模型相对 FP32 的准确率损失保持在约 1.2% 内。

器件级模拟显示，低光功率 OAG 与 homodyne VDPE 可以把每个波长的 OAG/OSSM 数量推到约 1024，速度超过 30 Gbps。架构级评估覆盖 Transformer-base、BERT-base、Albert-base、ViT-base 和 OPT-350，并与 CPU、GPU、TPU、FPGA_ACC、TransPIM、Lightning-Transformer、TRON、SCONNA 等平台比较。报告结果中，ASTRA 至少达到 7.6× 加速和 1.3× 能耗降低；相对 CPU/GPU/TPU 的归一化能耗下降超过三个数量级，主要来自减少 DAC、减少数据搬移、避免 heterodyne crosstalk 以及大量 OSSM 并行。

> 💡 关键：ASTRA 不是把数字 Transformer 原封不动搬到光域，而是把乘法改写成随机 bitstream 命中统计，把累加放到光电模拟电荷域，再把控制和非线性留给数字电路。

#### 🧪 练习题

```yaml
question: "ASTRA 为什么用 temporal analog accumulation，而不是继续用随机加法完成点积累加？"
options:
  - "随机加法会显著增加误差，PD/PCA 的电荷累加可以更稳定地聚合大量 OSSM 输出"
  - "因为 Transformer 中没有矩阵乘法，只需要执行 Softmax"
  - "因为光学 AND gate 只能处理负数，不能处理正数"
  - "因为 VDP core 只能存储权重，无法处理动态 operand"
answer: 0
explain: "ASTRA 将乘法保留在随机光学域，而把求和交给 homodyne photodetection 和 photo-charge accumulation，避免随机加法链式误差并减少中间数据搬移。"
```
