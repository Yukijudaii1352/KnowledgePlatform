### Atropos: 稀疏 Transformer 处理器

```yaml
id: atropos
name: Atropos
full_name: 稀疏Transformer处理器 (Atropos Sparse Transformer Processor)
year: '2026'
org: IEEE
paper_url: https://ieeexplore.ieee.org/abstract/document/11435429/
category: efficiency
parent: ampere_24_sparsity
motivation: 12nm稀疏处理器达18.1TFLOPs/W能效比
```

#### 📝 一句话总结

Atropos 是一颗 12 nm 稀疏 Transformer 推理处理器，用第一层输出熵统一驱动提前退出、FP4/FP8 混合精度和细粒度电压频率缩放，在 BERT/ALBERT 类边缘推理中把输入复杂度直接转化为延迟与能耗预算。

#### 🎯 核心要点

- 12 nm FinFET Transformer processor，核心面积约 4.60 mm²，集成在含 RISC-V CPU、systolic array 与 scratchpad 的 64 mm² SoC 中
- 以中间分类输出的 self-entropy \(H(z^{(\ell)})\) 作为统一控制信号，判断是否提前退出、预测退出层、选择 FP4/FP8 精度并设置 V/F
- 提前退出从逐层被动判断改成第一层后预测退出深度；SST-2 上平均推理深度约 3.9/12 层，论文报告 BERT 推理延迟最高降低 6.13 倍
- 混合精度 MAC 支持 FP8 E4M3 与 FP4 E3M0；FP4 路径用 per-vector exponent bias 补偿动态范围，实现更高吞吐而避免 per-tensor FP4 精度崩溃
- 电源管理使用 cell-based PMOS power header、free-running LDO 与 DCO，查表选择 16 组 V/F 点，在单 query/prompt 粒度缩放供电和频率
- 稀疏执行还包括 attention head pruning、bit-mask encoder/decoder、256 KB data SRAM 与 32 KB mask SRAM，减少无效 attention head 与稀疏元素搬运
- 论文报告峰值能效 18.1 TFLOPs/W、65 mJ/inference，并相对传统 BERT 推理达到 7.14 倍能量改善

#### 🔬 深入细节

##### 核心示意图

![Atropos 熵计算与控制路径](https://www.researchgate.net/publication/402463422/figure/download/fig1/AS%3A11431282005363128%401773723108473/mplementation-of-the-entropy-function-whose-value-on-the-1st-layer-Transformer-output-is.png)
*图：Atropos 论文 Figure 5，展示片上熵函数实现及其输出如何驱动 V/F Scaling、Mixed-Precision Predication 和 Early Exit。来源为作者公开的 IEEE OJSSC 2026 论文图页，ResearchGate 标注 CC BY 4.0。*

##### 算法伪代码

```python
# Atropos Early Exit Inference 的简化版
def entropy_from_logits(x):
    # z = softmax(x)，用 max trick 避免 exp 溢出
    m = max(x)
    exp_sum = sum(exp(x_i - m) for x_i in x)
    weighted = sum(x_i * exp(x_i - m) for x_i in x)
    return log(exp_sum) + m - weighted / exp_sum

def atropos_infer(sentence, target_latency_T, entropy_threshold):
    # Phase 1: 第一层用高频执行，尽快获得复杂度信号
    z1 = transformer_layer(sentence, layer=1, precision="fp8", vf="max")
    H1 = entropy_from_logits(classifier(z1))

    if H1 < entropy_threshold:
        return classify(z1)  # 简单输入直接退出

    # Phase 2: 用第一层熵预测退出层和剩余计算预算
    exit_layer = LUT_EE(H1, entropy_threshold)
    remaining_cycles = estimate_cycles_until(exit_layer)
    elapsed = read_timer()
    f_prime = remaining_cycles / (target_latency_T - elapsed)
    vdd_prime = LUT_DVFS(f_prime)

    # 熵越低越倾向 FP4，熵高则保守使用 FP8
    precision = LUT_PRECISION(H1)
    set_local_voltage_and_clock(vdd_prime, f_prime)

    # Phase 3: 按预测预算执行剩余层，同时仍允许更早退出
    h = z1
    for layer in range(2, exit_layer + 1):
        h = transformer_layer(h, layer=layer, precision=precision, vf=(vdd_prime, f_prime))
        Hl = entropy_from_logits(classifier(h))
        if Hl < entropy_threshold:
            break

    return classify(h)
```

##### 熵作为统一控制信号

Atropos 的核心观察是：对 BERT/ALBERT 这类 encoder-only 分类模型，简单输入在较浅层就会给出稳定分类分布，复杂输入则需要更多 Transformer 层。论文把每层 early-exit head 的 softmax 输出写成 \(z^{(\ell)}\)，并用 self-entropy 衡量“不确定性”：

$$
H(z^{(\ell)})=-\sum_{i=1}^{n}z_i^{(\ell)}\log z_i^{(\ell)}.
$$

若 \(H(z^{(\ell)})<E_T\)，说明分类分布足够尖锐，可以提前退出。传统 early-exit 算法在每层都计算熵并决定是否退出，虽然省计算，但总延迟不稳定：一个 query 可能 2 层结束，另一个 query 可能跑满 12 层。Atropos 的改动是在第一层之后用 \(H(z^{(1)})\) 和阈值 \(E_T\) 查表预测最终退出层 \(L\)，把“不知道何时结束”的问题变成“知道大约还要跑多少周期”的调度问题。

这个调度直接连接到电源管理。若剩余周期数为 \(N\)，目标响应时间为 \(T\)，当前已经消耗 \(T_{\mathrm{curr}}\)，则所需频率近似为

$$
f'=\frac{N}{T-T_{\mathrm{curr}}},\qquad
V'_{DD}=\mathrm{LUT}_{\mathrm{DVFS}}(f').
$$

因此，低熵输入不仅可能更早退出，还能在后续层用更低电压/频率跑完；高熵输入则保留更多层数和更高精度。这个设计把 early exit、mixed precision 和 DVFS 三个原本分散的优化合并到一个控制闭环里。

##### 混合精度 FP4/FP8 MAC 与 per-vector expbias

Atropos 的 MAC 路径支持 FP8 E4M3 和 FP4 E3M0。FP8 保留更多动态范围和尾数精度，适合高熵、分类仍不确定的输入；FP4 只有符号位和指数相关信息，吞吐更高但精度脆弱，适合低熵或对误差更不敏感的阶段。论文的关键不是简单切换数据类型，而是在 FP4 上使用 per-vector exponent bias：

$$
x_{\mathrm{fp4}}\approx (-1)^{s}\cdot 2^{e+\mathrm{expbias}/\gamma}.
$$

per-tensor expbias 让整个张量共享一个动态范围，遇到离群值时大量普通元素被压扁；per-vector expbias 则让每个向量有自己的指数偏置，显著减小局部量化误差。论文表格显示，SST-2 上 FP4 per-tensor expbias 只有约 69.0% 准确率，改成 FP4 per-vector 后到约 88.3%，再结合熵引导的 FP4/FP8 混合精度后达到约 91.0%，接近 FP32/Baseline 的 92.2%。

> 💡 关键：Atropos 的 FP4 是“按输入复杂度使用”的硬件策略，不是把全部层无条件压到 4 bit。熵信号越低，系统越敢使用 FP4 和低 V/F；熵高时则回到 FP8 或更保守的时钟电压点。

##### 电路与 SoC 数据流

图中的熵计算单元用 max trick 实现 softmax entropy，避免指数溢出。若 logits 为 \(x\)，令 \(m=\max_i x_i\)，则

$$
H(\mathrm{softmax}(x))
= \log\sum_i e^{x_i-m}+m
-\frac{\sum_i x_i e^{x_i-m}}{\sum_i e^{x_i-m}}.
$$

这正对应图中的 `max`、`exp`、累加、`ln`、除法等流水级。结果一方面送入 early-exit comparator，与 \(H_{\mathrm{Thresh}}\) 比较；另一方面送到 V/F scaling 和 mixed-precision predication 控制逻辑。因为这个控制路径在片上完成，Atropos 可以做到 prompt/query 粒度的响应，而不是批处理或 workload 粒度的粗 DVFS。

电源侧，Atropos 使用标准单元 PMOS header、本地 free-running LDO 和由本地电压驱动的 DCO。free-running LDO 不依赖传统反馈环稳定过程，而是用预表征电阻/LUT 选择输出点；DCO 随本地电压自然改变频率。论文描述 16 组离散 V/F 点，并把相关 LUT 与归一化常数、attention pruning 元数据放在 SFU 的 32 KB 辅助缓冲中。数据路径侧，稀疏矩阵由 bit-mask decoder/encoder 处理，非零 FP8 元素和索引分别使用 data SRAM 与 mask SRAM，attention head pruning 则跳过有效跨度不足的 head。

##### 与传统 Transformer 加速器的区别

传统边缘 Transformer 加速器通常在固定层数、固定精度和固定电压频率下运行，然后用 worst-case latency 设计满足 QoS。Atropos 反过来把 QoS 当作实时约束：第一层先判断 query 难度，再决定跑到第几层、用 FP4 还是 FP8、用哪个 V/F 点。它牺牲了一部分控制逻辑复杂度，换来更细的能耗-延迟匹配。

从系统指标看，Atropos 报告 18.1 TFLOPs/W 峰值能效和 65 mJ/inference；SST-2 上平均退出层约 3.9/12，能量相对传统 BERT 推理改善 7.14 倍。更重要的是，它展示了一种算法-架构-电路协同模板：用模型内部置信度信号直接驱动数据精度和供电策略，而不是把量化、稀疏和 DVFS 当成相互独立的优化开关。

资料来源：IEEE Xplore 论文页 https://ieeexplore.ieee.org/abstract/document/11435429/；Tambe Lab publication list https://tambelab.stanford.edu/publications；作者公开全文/图页 https://www.researchgate.net/publication/402463422_A_181TFLOPsW_Transformer_Accelerator_with_Fine-Grained_Per-Query_Latency_and_Power_Management_in_12-nm_FinFET。

#### 🧪 练习题

```yaml
question: "Atropos 为什么要在第一层后预测退出层，而不是只在每层独立判断是否提前退出？"
options:
  - "为了在推理早期估计剩余周期并选择 V/F 点，使延迟目标可控"
  - "因为后续层没有 logits，无法计算熵"
  - "为了完全取消 softmax 计算"
  - "因为 FP4 MAC 只能运行第一层"
answer: 0
explain: "第一层熵可用于预测输入复杂度和退出层，Atropos 由此计算剩余周期、查表选择电压频率，并在满足 QoS 的同时降低能耗。"
```
