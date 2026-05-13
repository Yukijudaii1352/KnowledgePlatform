### HALP

```yaml
id: halp
name: HALP
full_name: 幻觉感知潜在探测 (Hallucination-Aware Latent Probing)
year: 2025
org: Microsoft / Meta / UBC
paper_url: https://arxiv.org/abs/2603.05465
category: llm_safety
parent: —
motivation: 通过分析VLM内部表示在生成前预测幻觉风险
```

#### 📝 一句话总结

HALP 提出了一种轻量级探测框架，通过在视觉语言模型（VLM）生成文本**之前**的单次前向传播中提取三类内部表示（视觉特征、视觉 token 隐状态、查询 token 隐状态），训练 MLP 探针预测幻觉风险，在 8 个主流 VLM 上实现了最高 0.93 AUROC 的幻觉检测性能，且推理开销不足 1%。

#### 🎯 核心要点

- **预生成幻觉检测**：在 VLM 解码生成文本之前，仅通过 prefill 阶段的内部表示即可预测幻觉风险，无需等待完整生成
- **三类探测特征**：Visual Features (VF) — 视觉编码器全局池化输出；Vision Token (VT) — 解码器中视觉 token 最后位置的隐状态；Query Token (QT) — 解码器中查询 token 最后位置的隐状态
- **轻量 MLP 探针**：3 层 MLP（512→256→128），ReLU 激活，二分类输出幻觉概率分数 \(s^j \in [0,1]\)
- **大规模基准评测**：构建 10,000 样本多模态幻觉检测数据集，覆盖 11 个任务领域、4 种回答格式、7 类幻觉问题
- **8 个 VLM 系统评估**：Gemma3-12B、LLaVA-Next-8B、Llama-3.2-11B、Phi4-VL-5.6B、Molmo-7B、Qwen2.5-VL-7B、SmolVLM2-2.2B、FastVLM-7B
- **QT 特征一致性最优**：查询 token 表示在 7/8 模型上 AUROC 达 0.90–0.94，平均 0.87，显著优于 VF（0.69）和 VT（0.69）
- **层级分析**：QT 性能随解码器深度单调递增，3L/4 层为最优提取点；VT 性能跨层稳定但有限（~0.65–0.70）
- **实际部署开销极低**：探针推理仅 10–15ms，相对完整生成开销 <1%

#### 🔬 深入细节

##### 框架总览

![HALP 框架示意图](https://arxiv.org/html/2603.05465v1/x2.png)
*图：HALP 从 VLM 的单次前向传播中提取三类内部表示（VF、VT、QT），分别训练探针检测幻觉风险*

HALP 的核心思想是：VLM 在生成文本之前的 prefill 阶段，其内部表示已经编码了足够的信息来预测即将发生的幻觉。该框架无需修改模型权重，不依赖生成结果，可在解码前实时评估风险。

##### 算法流程

```python
# HALP 幻觉检测框架伪代码
def halp_pipeline(vlm, images, queries, ground_truths):
    # === 阶段 1: 幻觉标注 (离线) ===
    for (I, Q, Y) in zip(images, queries, ground_truths):
        Y_hat = vlm.generate(I, Q)                    # VLM 标准推理
        b = llm_judge(Y_hat, Y, Q)                     # LLM-as-a-Judge 判断幻觉 {0,1}
    
    # === 阶段 2: 特征提取 (单次前向传播) ===
    for (I, Q) in zip(images, queries):
        # 视觉特征 VF: 视觉编码器输出的全局平均池化
        u_bar = mean_pool(vision_encoder(I))            # shape: [d_vision]
        
        # 视觉 token 表示 VT: 解码器第 ℓ 层视觉序列最后位置
        # 查询 token 表示 QT: 解码器第 ℓ 层查询序列最后位置
        hidden_states = vlm.prefill(I, Q)               # 仅 prefill，不解码
        for ℓ in {1, L//4, L//2, 3*L//4, L}:
            vt[ℓ] = hidden_states[ℓ][last_vision_pos]  # shape: [d_model]
            qt[ℓ] = hidden_states[ℓ][last_query_pos]   # shape: [d_model]
    
    # === 阶段 3: 探针训练 ===
    for feature_type in [VF, VT, QT]:
        probe = MLP(input_dim, 512, 256, 128, 1)       # 3 层 MLP + sigmoid
        probe.train(features, labels_b, epochs=50, lr=0.001)
    
    # === 阶段 4: 推理时幻觉风险评估 ===
    score = probe(extract_qt(vlm.prefill(I_new, Q_new)))  # 10-15ms
    if score > threshold:
        flag_as_high_risk()  # 拒绝回答 / 路由到更强模型
```

##### 动机与背景

VLM 幻觉（hallucination）是指模型生成与视觉输入不一致的文本内容，包括虚构不存在的物体、错误描述属性/关系、编造事实等。现有幻觉检测方法主要分为两类：

1. **后生成检测**：需要模型完成整个生成过程后，通过对比参考答案或多次采样一致性来判断，计算开销大且无法实时干预
2. **生成过程中检测**：利用 token 级别的 logit 不确定性或注意力模式，但仍需部分解码过程

> 💡 **关键洞察**：HALP 发现 VLM 在 prefill 阶段（处理输入但尚未生成任何 token）的内部表示中，已经包含了丰富的幻觉预测信号。这意味着可以在**零生成开销**下评估风险。

##### 三类特征的设计原理

**Visual Features (VF)** 捕获纯视觉感知信号：

$$\bar{\mathbf{u}} = \frac{1}{M}\sum_{i=1}^{M}\mathbf{u}_i$$

其中 \(\mathbf{u}_i\) 是视觉编码器输出的第 \(i\) 个 patch token，\(M\) 为 patch 总数。VF 在多模态投影层之前提取，反映模型对图像的"纯视觉理解"。如果视觉编码器本身就无法正确感知图像内容，后续的语言生成必然会产生幻觉。

**Vision Token (VT)** 捕获视觉信息在语言解码器中的融合表示。提取解码器第 \(\ell\) 层视觉 token 序列最后位置的隐状态，反映视觉信息经过多模态投影和 Transformer 层处理后的状态。

**Query Token (QT)** 捕获完整的多模态推理结果。由于 Transformer 的因果注意力机制，查询序列最后位置的隐状态聚合了所有视觉 token 和文本 token 的信息，是模型即将开始生成时的"决策状态"。

> ⚠️ **注意**：QT 提取的是拼接序列 \((V, Q)\) 的最后位置，而非仅文本查询的最后位置。这意味着它包含了完整的视觉-文本交互信息。

##### 实验结果深入分析

**主结果（Table 2）** 显示了三类特征在 8 个 VLM 上的 AUROC：

| 模型 | VF | VT | QT | 平均 |
|------|-----|-----|-----|------|
| Gemma3-12B | 0.674 | 0.596 | **0.935** | 0.735 |
| Qwen2.5-VL-7B | 0.787 | 0.668 | **0.915** | 0.790 |
| Llama-3.2-11B | 0.770 | 0.738 | **0.896** | 0.801 |
| Phi4-VL-5.6B | 0.617 | 0.774 | **0.903** | 0.765 |
| Molmo-7B | 0.683 | 0.687 | **0.919** | 0.763 |
| SmolVLM2-2.2B | 0.724 | 0.689 | **0.901** | 0.772 |
| LLaVA-Next-8B | 0.611 | 0.627 | **0.903** | 0.714 |
| FastVLM-7B | 0.683 | **0.703** | 0.614 | 0.667 |
| **平均** | 0.694 | 0.685 | **0.873** | 0.751 |

三个关键发现：

1. **QT 一致性优势**：7/8 模型的 QT AUROC 在 0.90–0.94 之间，说明幻觉信号在多模态推理完成后最为集中
2. **架构异质性**：Qwen2.5-VL 和 Llama-3.2 的 VF 已达 0.77–0.79（视觉编码器本身信息丰富），而 LLaVA-Next 和 Phi4-VL 的 VF 仅 0.61（更依赖后续融合）
3. **FastVLM 异常**：唯一 VT > QT 的模型（0.703 vs 0.614），暗示其架构在早期融合阶段就完成了关键推理

**层级分析** 揭示了幻觉信号在解码器中的演化规律：
- QT 性能随层深单调递增，典型模式如 Gemma3：\(0.717 \to 0.812 \to 0.925 \to 0.932 \to 0.935\)
- VT 性能跨层基本稳定（0.65–0.70），说明视觉信息在解码器中的变化有限
- 最优提取层为 \(3L/4\)，在大多数模型上达到峰值或接近峰值性能

##### 与现有方法的区别

| 维度 | 后生成方法 | 生成中方法 | HALP（预生成） |
|------|-----------|-----------|---------------|
| 检测时机 | 生成完成后 | 解码过程中 | prefill 阶段 |
| 计算开销 | 高（完整生成+评估） | 中（部分解码） | 极低（<1%） |
| 干预能力 | 无（事后） | 有限 | 完全（可拒绝/路由） |
| 是否需要参考答案 | 通常需要 | 不需要 | 训练时需要，推理时不需要 |

##### 实际应用场景

HALP 支持两种部署模式：
- **选择性拒绝**：当探针分数超过阈值时拒绝回答，用安全提示替代。论文在附录中展示了覆盖率-准确率权衡曲线
- **选择性路由**：高风险输入路由到更强的 VLM 或工具增强管线，低风险输入由基础模型直接处理，平衡延迟与可靠性

#### 🧪 练习题

```yaml
question: "HALP 框架中，哪种内部表示在大多数 VLM 上提供了最强的幻觉预测能力？"
options:
  - "Visual Features (VF) — 视觉编码器的全局池化输出"
  - "Vision Token (VT) — 解码器中视觉 token 的隐状态"
  - "Query Token (QT) — 解码器中查询 token 最后位置的隐状态"
  - "注意力权重矩阵的熵值"
answer: 2
explain: "QT 表示在 7/8 模型上 AUROC 达 0.90–0.94（平均 0.87），因为查询序列最后位置通过因果注意力聚合了完整的视觉-文本交互信息，是最接近生成决策的内部状态。"
```