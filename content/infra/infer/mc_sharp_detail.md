### MC#: 混合压缩器 (MC#)

```yaml
id: mc_sharp
name: MC#
full_name: 混合压缩器 (MC#)
year: '2026'
org: IEEE TPAMI
paper_url: https://ieeexplore.ieee.org/document/10884444/
category: quantize
parent: awq
motivation: 自适应混合精度量化+在线剪枝压缩MoE
```

#### 📝 一句话总结

MC# 提出 Mixture-Compressor-sharp 框架，用预加载混合精度量化压缩 MoE 专家权重，并用在线 Top-any 剪枝按 token 动态减少激活专家，解决 MoE-LLM/VLM 需要预加载所有专家且推理仍激活冗余专家的问题。

#### 🎯 核心要点

- 两阶段压缩：Pre-Loading Mixed-Precision Quantization (PMQ) 负责静态专家权重量化，Online Top-any Pruning (OTP) 负责推理时动态专家剪枝
- 专家重要性建模：同时考虑专家激活频率、路由权重和单专家量化后的激活重构误差，而不是按层统一给定 bit-width
- PMQ 将专家 bit 分配写成整数规划/线性规划问题，在 1、2、3 bit 等候选精度中满足平均 bit 预算并最小化量化损失
- OTP 将专家保留/剪枝视为 token 级 mask 选择问题，用 Gumbel-Softmax 近似离散 mask，使 Top-any 专家数量可学习且可微
- 静态部分兼容 GPTQ/HQQ 等 PTQ 部署工具，非专家模块如 attention、gate、shared experts 可采用统一 4-bit 量化
- 面向 Mixtral 等 MoE-LLM 和 DeepSeek-VL2 等 MoE-VLM；论文报告 DeepSeek-VL2-L 约 2.57 bit 时达到 6.2× 权重压缩、五个多模态基准平均仅约 1.7% 性能损失，OTP 还能进一步减少约 20% 专家激活且损失低于 1%

#### 🔬 深入细节

##### 论文图与整体流程

![MC# 两阶段专家压缩流程](https://arxiv.org/html/2510.10962v1/x3.png)
*图源：MC# arXiv HTML 公开预印本 Figure 3。图中左侧是 PMQ 的预加载混合精度量化，右侧是 OTP 的在线 Top-any 专家剪枝。*

##### 核心伪代码

```python
# MC# pipeline: PMQ + OTP
def mc_sharp_compress(moe_model, calibration_batches, target_avg_bits):
    stats = {}
    for layer in moe_model.moe_layers:
        for expert in layer.experts:
            # 1. 在 16-bit 原模型上收集专家使用统计
            freq = activation_frequency(expert, calibration_batches)
            route_weight = average_router_weight(expert, calibration_batches)

            # 2. 分别试量化到候选 bit，并度量该专家导致的输出重构误差
            quant_loss = {}
            for b in [1, 2, 3]:
                q_expert = ptq_quantize(expert, bits=b)  # GPTQ/HQQ 等 PTQ
                quant_loss[b] = activation_reconstruction_error(
                    moe_model, layer, expert, q_expert, calibration_batches
                )
            stats[(layer.id, expert.id)] = (freq, route_weight, quant_loss)

        # 3. 每个 MoE 层求解整数规划：在 bit 预算下给专家分配不同精度
        bit_plan = solve_integer_program(
            experts=layer.experts,
            stats=stats,
            target_avg_bits=target_avg_bits,
            candidates=[1, 2, 3],
        )
        apply_mixed_precision_ptq(layer.experts, bit_plan)

    # 4. 训练轻量 mask router，用少量样本学习 token-aware top-any 剪枝
    for layer in moe_model.moe_layers:
        layer.mask_router = train_gumbel_mask_router(
            quantized_model=moe_model,
            layer=layer,
            calibration_batches=calibration_batches,
            loss_terms=["distill_logits", "mask_sparsity"],
        )
    return moe_model


def mc_sharp_infer(quantized_moe, token):
    for layer in quantized_moe.moe_layers:
        x = layer.before_moe(token)
        selected, gate = layer.router.topk(x)
        mask = layer.mask_router.sample_mask(x, gate)  # Gumbel-Softmax 训练，推理取硬 mask
        active = [e for e, keep in zip(selected, mask) if keep]
        token = sum(gate[e] * layer.experts[e](x) for e in active) + layer.shared_experts(x)
    return quantized_moe.output_head(token)
```

##### 机制拆解

MoE 的基本负担来自两个方向：部署前必须把所有专家权重放入显存，部署时每个 token 又会由 gate 选择多个专家执行。对第 \(t\) 个 token，MoE 层可抽象为

$$
y_t=\sum_{i\in \operatorname{TopK}(g_t)} g_{t,i}E_i(x_t)+E_{\mathrm{shared}}(x_t),
$$

其中 \(g_{t,i}\) 是 gate 给专家 \(E_i\) 的路由权重。传统 dense LLM 的 AWQ/GPTQ 类方法通常按层或按组压缩权重，但 MoE 的关键异质性在专家维度：有些专家高频、路由权重大、量化后误差敏感；另一些专家很少被访问或对输出重构影响较小。统一 2-bit 或统一 4-bit 会把同等预算浪费在低贡献专家上，也会让高贡献专家过度失真。

PMQ 的做法是先在校准集上度量专家重要性。论文使用激活频率与路由权重描述专家在数据分布中的使用强度，再用单专家量化后的 Frobenius 范数重构误差描述该专家对输出的敏感度。可以把第 \(i\) 个专家在 bit \(b\) 下的代价抽象为

$$
\ell_{i,b}=\left\|Y_{\mathrm{fp16}}-Y_{i,b}\right\|_F^2,\qquad
s_i=\alpha f_i+\beta r_i,
$$

其中 \(f_i\) 是访问频率，\(r_i\) 是平均路由权重，\(s_i\) 是加权重要性。随后令 \(z_{i,b}\in\{0,1\}\) 表示专家 \(i\) 是否选择 bit \(b\)，在平均 bit 预算下求解：

$$
\min_{z}\sum_i\sum_{b\in\mathcal{B}} z_{i,b}\,w(s_i)\ell_{i,b}
\quad\text{s.t.}\quad
\sum_{b\in\mathcal{B}}z_{i,b}=1,\quad
\frac{1}{N}\sum_i\sum_{b\in\mathcal{B}}z_{i,b}b\le \bar b.
$$

这不是重新训练 MoE，而是在预加载阶段决定每个专家使用 1/2/3 bit 中哪一种，并用 GPTQ/HQQ 等 PTQ 执行实际量化。低 bit 专家的存储、加载和反量化开销降低，高重要性专家则被保护在更高精度，因而同样平均 bit 下比 uniform quantization 更稳。

OTP 处理的是另一个瓶颈：即使权重已经低 bit，router 的 Top-K 仍会激活固定数量专家。规则式剪枝常按路由分数阈值删掉低分专家，但在 DeepSeek-VL2 这类候选专家很多、token 分布多样的 MoE-VLM 中，固定阈值难以覆盖不同输入。MC# 把候选专家的保留模式写成 mask \(m_t\)，并通过轻量 router 预测 mask 分布 \(\pi_t\)。离散采样不可导，所以使用 Gumbel-Softmax：

$$
\tilde m_t=\operatorname{softmax}\left(\frac{\log \pi_t+g}{\tau}\right),
\qquad
g=-\log(-\log u),\ u\sim \operatorname{Uniform}(0,1).
$$

温度 \(\tau\) 下降时，\(\tilde m_t\) 趋近 one-hot 或少量 hard mask。训练目标同时约束蒸馏误差和稀疏度：

$$
\mathcal{L}_{\mathrm{OTP}}
=\mathcal{L}_{\mathrm{distill}}\left(y_{\mathrm{masked}},y_{\mathrm{full}}\right)
+\lambda\left\|m\right\|_1.
$$

第一项要求剪枝后的量化 MoE 接近不剪枝输出，第二项阻止模型学成全保留。推理阶段则用 hard mask 直接跳过低收益专家，实现 token 级 Top-any：不同 token 可以保留不同数量专家，而不是固定 Top-1 或 Top-2。

与只做量化的 AWQ/GPTQ 相比，MC# 的重点不在单个线性层的 scale 搜索，而在 MoE 专家之间的资源分配；与只做专家剪枝的方法相比，PMQ 先降低所有专家的预加载成本，OTP 再降低实际激活成本。两者组合后，存储压缩和运行时计算压缩作用在不同阶段，正好贴合 MoE “总参数大、激活参数稀疏但仍冗余” 的结构性问题。

#### 🧪 练习题

```yaml
question: "MC# 中 PMQ 和 OTP 分别主要解决什么问题？"
options:
  - "PMQ 压缩预加载专家权重，OTP 在推理时按 token 动态减少激活专家"
  - "PMQ 训练新的 tokenizer，OTP 扩大上下文窗口"
  - "PMQ 只压缩 attention，OTP 只改变位置编码"
  - "PMQ 删除所有低频专家，OTP 固定保留 Top-1 专家"
answer: 0
explain: "PMQ 是静态混合精度量化，降低专家权重存储和加载成本；OTP 是可学习动态 mask，降低每个 token 的实际专家计算。"
```
