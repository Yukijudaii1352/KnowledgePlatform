### EfficientQAT

```yaml
id: efficientqat
name: EfficientQAT
full_name: 高效量化感知训练 (EfficientQAT)
year: 2025
org: 北大
paper_url: https://aclanthology.org/2025.acl-long.498/
category: quantization
parent: qat
motivation: 显著降低大模型量化训练资源消耗
```

#### 📝 一句话总结

EfficientQAT 提出面向大语言模型的两阶段高效量化感知训练框架，用 Block-AP 逐块训练所有参数、再用 E2E-QP 端到端只训练量化 step size，从而在接近 PTQ 成本下获得更接近 QAT 的低比特精度。

#### 🎯 核心要点

- 面向 2/3/4-bit 低比特 LLM 量化，重点解决传统 QAT 训练代价过高、PTQ 在极低比特下掉点严重的问题
- 使用两阶段流程：Block-wise training of All Parameters (Block-AP) 和 End-to-End training of Quantization Parameters (E2E-QP)
- Block-AP 在每个 Transformer block 内直接训练原始权重 \(\mathbf{W}\)、step size \(s\) 和 zero point \(z\)，用逐块重建损失控制显存
- E2E-QP 固定低比特整数权重，只端到端训练 step size \(s\)，用语言建模或目标任务损失捕捉跨模块交互
- 采用 uniform group-wise 权重量化，量化公式由 \(\mathbf{W}_{int}\)、\(s\)、\(z\) 和目标位宽 \(N\) 定义，便于部署到低比特 kernel
- 论文报告可在单张 A100-80GB 上用 41 小时得到 2-bit Llama-2-70B，平均准确率 69.48，对比 FP16 的 72.41 下降不到 3 个点
- 评测覆盖 Llama-2、Llama-3、base LLM、instruction-tuned LLM 和多模态 LLM，并在 2-bit 场景明显优于多种 uniform PTQ/Q-PEFT 方法

#### 🔬 深入细节

![EfficientQAT 两阶段整体流程](https://arxiv.org/html/2407.11062v3/x3.png)
*图：来源为论文 Figure 2 的 arXiv HTML 图片。左侧展示传统 QAT 的端到端全参数训练，右侧展示 EfficientQAT 的 Block-AP 与 E2E-QP 两阶段流程。*

```python
# EfficientQAT 两阶段训练伪代码
def efficient_qat(fp_model, train_data, n_bits=2, group_size=64):
    q_model = copy_model(fp_model)

    # Phase 1: Block-AP，逐块训练所有参数 W、s、z
    for block_id, block in enumerate(q_model.transformer_blocks):
        block_inputs = collect_inputs_after_previous_quantized_blocks(
            q_model, train_data, block_id
        )
        fp_targets = fp_model.transformer_blocks[block_id](block_inputs).detach()

        initialize_groupwise_quant_params(block, n_bits, group_size)
        set_trainable(block, weights=True, step_size=True, zero_point=True)

        for epoch in range(2):
            for x, y_ref in minibatches(block_inputs, fp_targets):
                y_q = block.forward_with_fake_quant(x)  # round/clamp 用 STE 传梯度
                loss = mse(y_q, y_ref)
                loss.backward()
                optimizer_block_ap.step()

        freeze_quantized_block(block)

    # Phase 2: E2E-QP，固定整数权重，只训练 step size
    freeze_integer_weights(q_model)
    set_trainable(q_model, weights=False, step_size=True, zero_point=False)

    for batch in train_data:
        logits = q_model(batch.input_ids)
        loss = language_modeling_loss(logits, batch.labels)
        loss.backward()
        optimizer_e2e_qp.step()

    return q_model
```

EfficientQAT 的出发点是 QAT 和 PTQ 的矛盾。原生 QAT 把量化约束放进训练图中，并允许全模型端到端调整，所以低比特精度好；但对 70B 级 LLM 来说，全参数、全优化器状态、全数据训练几乎不可接受。PTQ 或 block-wise reconstruction 显著便宜，却常常限制可训练变量，例如只训 rounding、clipping threshold 或 step size；这减少了过拟合风险，也压缩了优化空间，在 2-bit 和 3-bit 下很难恢复损失信息。

论文采用的 uniform 量化和反量化写作：

$$
\mathbf{W}_{int}=
\mathrm{clamp}\left(
\left\lfloor\frac{\mathbf{W}}{s}\right\rceil+z,\ 0,\ 2^N-1
\right)
$$

$$
\widehat{\mathbf{W}}=(\mathbf{W}_{int}-z)\cdot s
$$

其中 \(N\) 是目标位宽，\(s\) 是分组共享的 FP16 step size，\(z\) 是 zero point。Block-AP 把这两个式子放进每个 block 的计算图，用 straight-through estimator 近似 round/clamp 的梯度，并且直接训练 \(\mathbf{W},s,z\)。简化地说，第 \(b\) 个 block 的优化目标可以写成：

$$
\mathcal{L}_{\mathrm{BlockAP}}^{(b)}
=\left\|B_b^{q}(\mathbf{H}_b;\mathbf{W},s,z)
-B_b^{fp}(\mathbf{H}_b)\right\|_2^2
$$

这里 \(\mathbf{H}_b\) 是该 block 的输入，\(B_b^{fp}\) 是浮点 block 输出，\(B_b^{q}\) 是带 fake quantization 的量化 block 输出。逐块训练的关键好处是显存只需容纳当前 block、当前 block 的优化器状态和样本激活，而不需要同时反传整条 70B 模型；同时，训练所有内生参数又比只训练少数代理变量更有表达能力。

E2E-QP 弥补 Block-AP 的局部性。逐块重建只保证每个 block 在给定输入上贴近浮点输出，但量化误差会跨层累积，最终影响语言建模概率。第二阶段从 Block-AP 得到的量化模型出发，固定 \(\mathbf{W}_{int}\)，默认只训练 \(s\)，端到端最小化目标任务损失：

$$
\mathcal{L}_{\mathrm{E2E}}
=-\sum_t \log p_{\widehat{\theta}(s)}(x_t\mid x_{<t})
$$

因为这一阶段不再执行新的 quantize，只做 \(\widehat{w}=(w_q-z)s\) 的反量化，step size 的梯度很直接：\(\partial\widehat{w}/\partial s=w_q-z\)。论文消融显示，E2E-QP 训练 \(s\)、\(z\) 或二者的精度接近；但把 \(z\) 从低比特格式转成 FP16 可训练变量会增加平均位宽，因此默认只训练 \(s\)，以获得更好的内存和模型大小权衡。

> 💡 关键：Block-AP 负责“给每个 block 足够大的可优化空间”，E2E-QP 负责“让整网知道各 block 的误差如何相互作用”。两者相加才是 EfficientQAT 的核心，而不是单纯的 block-wise PTQ。

实验也支持这种分工。以 Llama-2-7B w2g64 为例，不用两个组件时平均 PPL 极高；只用 Block-AP 或只用 E2E-QP 都能明显改善，二者叠加达到最佳平均准确率 60.14。训练参数消融中，Block-AP 同时训练 \(s,z,\mathbf{W}\) 优于只训练 clipping、\(s,z\)、rounding 或 \(\mathbf{W}\)；原因是从预训练模型出发时，直接调整 step size 和 zero point 可以最小化量化误差，而原始权重只需较小改动即可保留已学知识。对部署而言，group size 也形成精度和模型大小的权衡：更小 group 更细粒度但额外量化参数更多，论文默认在 2-bit 下常用 g64 或 g128。

#### 🧪 练习题

```yaml
question: "EfficientQAT 的 E2E-QP 阶段默认只训练 step size s 的主要原因是什么？"
options:
  - "s 是唯一参与前向计算的参数，zero point 不参与反量化"
  - "训练 s、z 或二者精度接近，但训练 z 需要把低比特 z 转成 FP16，增加平均位宽"
  - "E2E-QP 不需要任何训练数据，只需重新排序权重"
  - "Block-AP 已经删除了所有 zero point，因此只能训练 s"
answer: 1
explain: "论文消融显示训练 s 与训练 z 的效果非常接近；默认只训练 s 可以保持低内存和低平均比特数，同时捕捉跨 block 交互。"
```
