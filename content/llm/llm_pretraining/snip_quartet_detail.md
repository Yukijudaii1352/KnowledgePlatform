### SNIP/Quartet

```yaml
id: snip_quartet
name: SNIP/Quartet
full_name: SNIP/Quartet (Native FP4 Training)
year: '2026'
org: NeurIPS
paper_url: https://arxiv.org/abs/2410.20574
category: training
parent: mixed_precision
motivation: 原生FP4训练层级动态量化
```

#### 📝 一句话总结

SNIP 和 Quartet 分别从“自适应层级混合精度”和“端到端原生 FP4 训练”两条路线推进 sub-byte LLM 训练：前者根据量化导致的 loss/weight divergence 动态决定各层 FP4/FP8，后者用 MXFP4/优化 kernel 和低精度 scaling law 证明主要线性层可原生 FP4。它们共同解决的是 FP4 训练吞吐高但收敛和精度容易崩的问题。

#### 🎯 核心要点

- Manifest URL 指向不相关数学论文；正文依据 SNIP arXiv:2602.01410 与 Quartet arXiv:2505.14669 补足
- SNIP 周期性收集 activations、gradients、optimizer states 统计，评估量化对训练质量的影响
- SNIP 定义 forward loss divergence 和 backward weight divergence，作为层级精度选择的优化代理
- SNIP 将“多少 FP4 FLOPs”作为效率预算，在满足质量约束下求 layer-wise FP4/FP8 配置
- Quartet 聚焦 Blackwell 支持的 FP4/MXFP4，试图让主要 linear layers 的 forward/backward 都原生低精度
- Quartet 通过低精度 scaling law 分析不同 bit-width/训练设置的 accuracy-vs-compute tradeoff
- 二者都继承混合精度思想，但把粒度从 FP16/FP32 扩展到 FP4/FP8/BF16 的动态组合

#### 🔬 深入细节

![SNIP 系统总览](https://ar5iv.labs.arxiv.org/html/2602.01410/assets/x2.png)
*图：SNIP 论文 Figure 2，展示周期性统计收集、层级量化影响评估和 FP4/FP8 配置更新。*

![Quartet 低精度训练分析](https://ar5iv.labs.arxiv.org/html/2505.14669/assets/x1.png)
*图：Quartet 论文 Figure 1，展示低精度训练设置下的 scaling-law/accuracy-compute 分析。Manifest 中 paper_url 不匹配，正文使用 SNIP 与 Quartet 的公开论文补足。*

```python
# SNIP + Quartet 风格 sub-byte 训练伪代码
def subbyte_train(model, data, fp4_budget):
    precision = {layer: "FP8" for layer in model.linear_layers}

    for step, batch in enumerate(data):
        if step % profile_interval == 0:
            stats = collect_stats(model, batch, tensors=["act", "grad", "optimizer"])
            costs = {}
            for layer in model.linear_layers:
                loss_div = estimate_loss_divergence(layer, stats, quant="FP4")
                weight_div = estimate_weight_divergence(layer, stats, quant="FP4")
                costs[layer] = loss_div + lambda_w * weight_div
            precision = solve_layer_precision(costs, fp4_budget)

        with quantized_linear_policy(precision, fp4_kernel="MXFP4"):
            loss = model(batch)
            loss.backward()
            optimizer_step_with_master_states(model)
```

**动机与背景：FP4 的计算收益很大，但统一 FP4 太粗暴。** Blackwell 等硬件让 FP4 GEMM 具备很高理论吞吐，但 LLM 训练对数值误差极其敏感。若把所有线性层、所有阶段都统一降到 FP4，forward loss 会因为激活/权重量化误差上升，backward 更新也会因梯度和 optimizer 状态误差偏离，最终表现为收敛变慢或质量崩溃。

**SNIP 的核心机制：把精度选择变成有预算的优化问题。** SNIP 不用固定规则说“前几层 FP8、后几层 FP4”，而是定期 profile 当前模型状态。它用 loss divergence 衡量某层 forward 量化让训练 loss 增加多少，用 weight divergence 衡量 backward/更新误差会让参数轨迹偏离多少。然后在给定 FP4 FLOPs 比例预算下，选择最适合降到 FP4 的层。

$$
\min_{q_1,\ldots,q_L}\sum_{\ell=1}^{L} C_\ell(q_\ell)
\quad \text{s.t.}\quad
\sum_{\ell=1}^{L}\text{FLOPs}_\ell\mathbf{1}[q_\ell=\text{FP4}]\ge B
$$

**Quartet 的核心机制：把 FP4 做成端到端训练路径。** Quartet 关注硬件支持的 MXFP4/NVFP4 类格式，用 per-block scale、量化 kernel 和训练规则让主要线性层 forward/backward 都走 FP4，而不是在关键路径频繁 fallback 到 BF16/FP16。它还通过 scaling law 比较 BF16、FP8、FP4 在不同模型规模和 token 预算下的损失曲线，寻找计算最优的低精度配置。

**二者的互补关系：SNIP 管策略，Quartet 管原生算子。** SNIP 更像 precision scheduler，回答“哪些层、什么时候可以用 FP4”；Quartet 更像 FP4 training recipe/kernel stack，回答“用 FP4 时怎样量化、缩放和执行才不掉太多精度”。实际系统可以把 SNIP 的层级策略与 Quartet 的 MXFP4 kernel 结合。

**与 2018 混合精度的区别：从 FP16 安全加速到 sub-byte 动态控制。** 经典混合精度只需解决 FP16 下溢和 FP32 master weight；FP4 训练还要处理更强的量化噪声、block scale、outlier、梯度路径偏移和层间敏感度差异。因此 FP4 不能简单套用 loss scaling，而需要动态量化误差评估和硬件感知 kernel。

> ⚠️ 注意：SNIP/Quartet 并不意味着所有训练状态都变成 4 bit；优化器状态、累积器或部分敏感路径仍可能需要更高精度保护。

#### 🧪 练习题

```yaml
question: "SNIP 决定某层是否使用 FP4 时主要看什么？"
options:
  - "层名字是否包含 attention"
  - "量化导致的 loss divergence 和 weight divergence，并结合 FP4 FLOPs 预算"
  - "该层参数是否全为正数"
  - "训练数据文件大小"
answer: 1
explain: "SNIP 用前向损失偏移和反向权重轨迹偏移估计量化影响，再求层级混合精度配置。"
```
