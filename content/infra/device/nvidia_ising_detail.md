### NVIDIA Ising — 面向量子校准与纠错的开放 AI 模型族

```yaml
id: nvidia_ising
name: NVIDIA Ising
full_name: NVIDIA Ising量子AI模型 (NVIDIA Ising Quantum AI Model)
year: '2026'
org: NVIDIA
paper_url: https://nvidianews.nvidia.com/news/nvidia-ising-open-source-quantum-ai-models
category: quantum_hybrid
parent: —
motivation: AI优化量子纠错实现微秒级混合控制
```

#### 📝 一句话总结

NVIDIA Ising 提出面向量子计算的开放 AI 模型族和训练框架，用视觉语言模型自动化量子处理器校准，并用 3D CNN 预解码器降低表面码纠错的延迟和逻辑错误率。

#### 🎯 核心要点

- 模型族覆盖两类关键任务：Ising Calibration 用于读取和解释量子实验/校准图，Ising Decoding 用于实时量子纠错预解码。
- Ising Calibration 1 是基于 Qwen3.5-35B-A3B 的开放权重 VLM，在 QCalEval 量子校准图基准上达到 74.7 零样本平均分。
- QCalEval 覆盖 243 个样本、87 类场景、22 个实验族，包含超导量子比特和中性原子平台，并评估 6 类校准理解问题。
- Ising Decoder SurfaceCode 1 提供 Fast 和 Accurate 两个 3D CNN 预解码模型，分别面向更低延迟和更低逻辑错误率。
- NVIDIA 官方说明中，Fast 模型在 \(d=13, p=0.003\) 条件下相对 PyMatching 延迟快 2.5x、准确率高 1.1x，Accurate 模型延迟快 2.3x、准确率高 1.5x。
- 训练和部署栈包括 cuQuantum cuStabilizer、PyTorch、TensorRT、CUDA-Q QEC 和 NVQLink，用于从数据生成、模型训练到 GPU-QPU 实时闭环控制。

#### 🔬 深入细节

![Ising Calibration 1 在 QCalEval 上的表现](https://developer-blogs.nvidia.com/wp-content/uploads/2026/04/Ising-Benchmark.webp)
*图：NVIDIA Technical Blog Figure 1，展示 Ising Calibration 1 与 Gemini、Claude、GPT 系列在 QCalEval 六类问题上的对比。*

**量子校准的瓶颈是“看懂实验图并决定下一步”。** 量子处理器 bring-up 和 retune 过程中，实验人员需要反复查看谱线、Rabi/Ramsey 曲线、保真度拟合图、稳定性图等校准输出，再决定下一轮脉冲、频率或控制参数。NVIDIA Ising Calibration 把这个专家判读过程建模为 VLM 任务：输入校准图和问题，输出技术描述、实验结论、参数提取、拟合质量判断或下一步建议。QCalEval 的贡献在于把这件事标准化为可评测的 6 类语义任务，而 Ising Calibration 1 进一步证明领域监督微调能让开放 VLM 在专业量子校准图上超过通用模型。

```python
# Ising Calibration 1 的两阶段监督微调抽象
model = load_vlm("Qwen3.5-35B-A3B")

# Phase 1: ICL 格式，让模型学习“示例校准图 + 问答 -> 新图推理”
for batch in icl_formatted_calibration_data:
    images, demonstrations, question, answer = batch
    loss = model.loss(images=images, context=demonstrations, prompt=question, target=answer)
    update(model, loss)

# Phase 2: zero-shot 格式，让模型直接回答单张/多张校准图问题
for batch in zeroshot_calibration_data:
    images, question, answer = batch
    loss = model.loss(images=images, prompt=question, target=answer)
    update(model, loss)
```

**纠错解码的瓶颈是“必须比错误扩散更快”。** 表面码会在空间和时间上持续产生 syndrome，解码器必须在量子控制窗口内把 syndrome 解释为纠错操作。经典 MWPM/PyMatching 解码器可靠但全局图匹配开销较高；单纯神经网络又可能难以覆盖所有长距离错误。Ising Decoding 采用模块化预解码：先由 3D CNN 在局部时空窗口中消除大部分物理错误，再把残余 syndrome 交给 PyMatching 等全局解码器。这不是替代全局解码器，而是降低其输入密度和复杂度。

![Ising Decoding 预解码器性能区域](https://developer-blogs.nvidia.com/wp-content/uploads/2026/04/Pre-decoder-1.webp)
*图：NVIDIA Technical Blog 预解码器图，展示 Fast/Accurate pre-decoder 与 PyMatching 级联后在不同码距和物理错误率下的取舍。*

**3D CNN 的输入是综合征的时空体积。** 可把表面码一段时间内的测量结果整理为 \(X \in \{0,1\}^{B \times C \times T \times D \times D}\)，其中 \(B\) 是 batch，\(C\) 是 syndrome/边界/基类型通道，\(T\) 是纠错轮数，\(D\) 是码距。卷积核在 \((T, x, y)\) 三个维度上滑动，使模型学习局部错误链在时间和空间中的模式。若每层使用 kernel size 3 且 stride 1，\(L\) 层 same-padding 卷积的感受野近似为：

$$
R = 1 + \sum_{i=1}^{L}(k_i-1) = 1 + 2L
$$

Fast 版本可用更浅层数换低延迟，Accurate 版本用更深网络扩大 \(R\) 来捕获更长错误链。same-padding 很重要：它保证输入和输出的时空坐标一一对应，预解码器可以对每个局部 syndrome 位置给出修正或残差信号，然后与后续全局解码器无缝衔接。

```python
# Ising SurfaceCode pre-decoder + PyMatching 推理伪代码
def realtime_qec_decode(raw_syndrome_stream):
    # 1. GPU 上把连续 syndrome 轮次组织为 3D 时空体积
    volume = make_syndrome_volume(raw_syndrome_stream)  # [B, C, T, D, D]

    # 2. TensorRT/3D CNN 低延迟预解码，输出局部修正概率或 logits
    local_logits = predecoder_3d_cnn(volume)
    local_correction = threshold_or_sample(local_logits)

    # 3. 从原始 syndrome 中扣除局部修正解释掉的部分，降低残余图密度
    residual_syndrome = apply_local_correction(volume, local_correction)

    # 4. CPU 或异构流水线上的 PyMatching/MWPM 处理剩余长程关联
    global_correction = pymatching_decode(residual_syndrome)

    return compose(local_correction, global_correction)
```

**训练框架用模拟器解决数据规模和硬件差异问题。** 官方 Ising Decoding 训练框架通过 cuQuantum/cuStabilizer 生成 syndrome 样本，并允许用户指定噪声参数；README 中还提到训练时可对稀疏噪声做 upscaling，使训练集 syndrome 更密，评估时仍保留原始噪声模型。这对应一个实用观点：预解码器要从大量局部错误模式中学习鲁棒特征，而真实 QPU 噪声可能稀疏、漂移且难以完整建模。框架还支持预计算 frame、恢复训练、导出 ONNX/TensorRT，用来服务实时闭环。

**部署栈强调端到端延迟，而不是单模型吞吐。** CUDA-QX 的实时 predecoder + PyMatching 示例使用 TensorRT 加速神经网络，在 GPU 上降低 syndrome density，再把残余 detector 输入 CPU 侧 PyMatching worker pool，并统计 latency、throughput、syndrome density 和 logical error rate。NVQLink 的意义在这里体现：QPU 测量数据必须快速进入 GPU/CPU 纠错流水线，纠错结果再回到控制系统；只优化 3D CNN 本身并不足够，数据注入、图匹配、回传控制都要落在微秒级预算内。

**与传统方案相比，Ising 的创新是把 AI 放进量子控制回路的两个端点。** 校准端从“人看图”变成“VLM agent 看图并提出下一步”，纠错端从“全局解码器直接吃原始 syndrome”变成“GPU 预解码降低残差复杂度，再由经典解码器兜底”。这种设计保留了领域工具链的可解释边界：Calibration 模型不直接替代物理实验，Decoder 也不完全替代 PyMatching；它们都插在高成本人工或高延迟算法之前，承担最适合深度模型的模式识别部分。

#### 🧪 练习题

```yaml
question: "Ising Decoder SurfaceCode 1 为什么采用“3D CNN 预解码器 + PyMatching”的级联，而不是只用一个神经网络完成全部纠错？"
options:
  - "因为 3D CNN 只能处理图像，不能处理 syndrome"
  - "因为预解码器适合快速消除局部错误，PyMatching 适合处理残余全局关联，级联能同时兼顾低延迟和低逻辑错误率"
  - "因为 PyMatching 只能在 GPU 上运行"
  - "因为量子纠错不需要全局信息"
answer: 1
explain: "3D CNN 利用局部时空模式快速降低 syndrome 密度，PyMatching 再处理剩余长程关联。这样既利用 AI 的并行速度，也保留经典全局解码器的可靠性。"
```
