### GigaMoE

```yaml
id: gigamoe
name: GigaMoE
full_name: 十亿像素MoE (GigaMoE)
year: 2026
org: AAAI
paper_url: https://ojs.aaai.org/index.php/AAAI/article/view/38810
category: sparsity_deploy
parent: nm_sparsity
motivation: 稀疏引导MoE高效十亿像素检测
```

#### 📝 一句话总结

GigaMoE 将高分辨率广域图像检测 backbone 中昂贵的 FFN 替换为稀疏引导 MoE，用稀疏区域选择已有的重要性分数决定每个窗口调用多少专家，解决了 gigapixel detection 中所有候选区域被迫消耗同等计算的问题。它把“选哪些区域处理”的空间稀疏进一步扩展为“给重要区域分配更多计算”的条件计算稀疏。

#### 🎯 核心要点

- 面向 HRW/gigapixel object detection，基于 SparseFormer 等稀疏区域处理范式
- 观察到 SparseFormer backbone 中 FFN 占主要计算量，论文报告其占 backbone FLOPs 的 61.4%
- 在 GigaMoE Local Block 中保留局部窗口注意力，将标准 FFN 替换为 shared expert + specialized experts
- shared expert 处理所有被选窗口，提供稳定基础表征；specialized experts 只服务于需要额外容量的窗口
- Sparsity-Guided Routing 复用 ScoreNet 的窗口重要性分数，先决定每个窗口的专家数量 \(k_w\)，再由 router 选择具体专家
- 使用 inverted-pyramid 分配策略，论文最佳配置 \(P=(0.4,0.3,0.2,0.1)\)，让 top 10% 窗口调用 3 个专家
- 每个 expert 的隐藏维度按 \(C_{\mathrm{expert}}=C_{\mathrm{ffn}}/(k_{\max}+1)\) 缩小，避免最坏情况下超过原 FFN 计算规模
- 使用无辅助损失的在线 expert load balancing，通过随训练衰减的 bias 更新平衡专家负载
- 在 PANDA benchmark 上报告 DINO+GigaMoE 达到 79.1% AP，并相比 DINO+SparseFormer 降低 32.3% GFLOPs

#### 🔬 深入细节

![GigaMoE AAAI poster thumbnail](https://assets.underline.io/lecture/141368/poster_document_thumbnail/large-090b5475cd4d9b4bf5ff5c66e52213cf.jpg)
*图：AAAI 论文页面的 Poster 链接跳转到 Underline，图中 URL 是该官方展示页公开的 poster thumbnail。论文 PDF Figure 2 展示了四阶段层级 backbone、ScoreNet 选窗、Heuristic Mapping 分配 \(k\)、Router 选择专家和 shared/specialized expert pool 的整体结构。*

```python
# GigaMoE local block: sparsity-guided expert allocation
for feature_map in hierarchical_stages:
    z = global_attention_on_aggregated_windows(feature_map)
    scores = ScoreNet(z - window_average(z))        # window importance
    selected_windows = topk_windows(z, scores, K)

    ranks = rank_descending(scores[selected_windows])
    for w in selected_windows:
        # Heuristic Mapping: score rank -> number of specialized experts
        k_w = allocate_expert_count(rank=ranks[w], distribution=P)

        z_w = layer_norm(local_window_attention(w.features))
        pooled = mean_pool(z_w)
        gate = router(pooled) + expert_bias
        chosen = topk(gate, k=k_w)

        y_w = shared_expert(z_w)
        for i in chosen:
            y_w += softmax(gate)[i] * specialized_expert[i](z_w)

    # Loss-free online load balancing
    counts = count_assignments(chosen, num_experts=Ns)
    error = mean(counts) - counts
    expert_bias += update_rate(t) * sign(error)
```

Gigapixel/HRW 图像的核心困难不是单张图像语义更复杂，而是像素巨大、目标稀疏且尺度变化极端。SparseFormer 类方法先把全图切成窗口，用 ScoreNet 选择信息量高的窗口，只在这些窗口上做昂贵的局部处理。这已经减少了“处理哪里”的冗余，但论文进一步发现：即便窗口已经被筛过，标准 Transformer FFN 仍对所有被选窗口一视同仁。背景边缘、空旷天空、稀疏道路和密集人群都通过同一个大 FFN，导致内容简单区域浪费计算，复杂区域又没有额外容量。

GigaMoE 的第一步仍沿用稀疏处理框架。窗口聚合特征经过全局注意力补充长程上下文，再用 ScoreNet 产生窗口重要性：

$$
\mathrm{ScoreNet}(z,\hat{z})=\mathrm{SoftMax}(\mathrm{MLP}(z-\hat{z}))
$$

接着通过 top-k selection 得到稀疏窗口集合：

$$
Z_{\mathrm{sparse}}=M_{\mathrm{select}}\cdot Z
$$

关键变化发生在 GigaMoE Local Block：局部窗口注意力之后，原本的单体 FFN 被拆成一个 shared expert 和 \(N_s\) 个 specialized experts。shared expert 总是执行，保证每个窗口至少得到基础变换；specialized experts 按需执行，为复杂窗口提供额外表达能力。

专家数量不是 router 自己拍脑袋决定，而是由窗口分数排序决定。令 \(S=\{s_w\}_{w=1}^{K}\) 为被选窗口分数，按分数从高到低得到 rank \(r_w\)。给定分布 \(P=(p_0,\ldots,p_{k_{\max}})\)，窗口 \(w\) 被分配的 specialized expert 数量为：

$$
k_w=j,\quad
K\sum_{i=j+1}^{k_{\max}}p_i < r_w \le K\sum_{i=j}^{k_{\max}}p_i
$$

论文最佳配置 \(k_{\max}=3\)、\(P=(0.4,0.3,0.2,0.1)\)：最低 40% 窗口只过 shared expert，接下来的 30%/20%/10% 分别调用 1/2/3 个 specialized experts。这种 inverted-pyramid 让高分窗口拿到更多预算，同时限制平均 FLOPs。

在专家身份选择上，router \(G\) 对窗口归一化特征的均值池化表示打分：

$$
g_w=G(\mathrm{mean}(\mathrm{LN}(z_w)))
$$

输出是 shared expert 加上 top-\(k_w\) specialized experts 的加权和：

$$
y_w=E_{\mathrm{shared}}(z_w')+
\sum_{i\in \mathrm{TopK}(g_w,k_w)}
\mathrm{SoftMax}(g_w)_i\cdot E_i(z_w')
$$

这里的 \(k_w\) 控制“用多少专家”，router 控制“用哪些专家”。这比普通 top-k MoE 多了一层稀疏检测信号注入：区域选择分数既决定该不该处理，也决定处理到什么深度。

> 💡 关键：GigaMoE 的路由不是只看 token feature，而是复用稀疏检测流程已有的重要性信号，让“目标更可能出现、内容更复杂”的窗口获得更多专家计算。

MoE 常见风险是 expert collapse：router 总是选择少数专家，其他专家训练不足。传统做法通常加 auxiliary load-balancing loss，但这会引入额外损失权重，且可能干扰检测主目标。GigaMoE 使用 bias-based online balancing：每个 specialized expert 有一个 bias \(b_i\)，训练时统计当前 batch 分配量 \(c_i\)，计算 \(e_i=\bar{c}-c_i\)，再更新

$$
b_i \leftarrow b_i + u_t\cdot \mathrm{sign}(e_i)
$$

若专家使用不足，\(e_i>0\)，bias 增大，之后更容易被选中；若专家过载，bias 降低。更新率 \(u_t=u_{\mathrm{init}}\alpha_t\) 随训练步数线性或余弦衰减，前期快速纠偏，后期减少对已形成路由模式的扰动。

从计算设计看，GigaMoE 不是简单“加专家提高容量”。论文把每个 expert 的隐藏维度设置为 \(C_{\mathrm{expert}}=C_{\mathrm{ffn}}/(k_{\max}+1)\)，因此即使某窗口经过 shared expert 和最多 \(k_{\max}\) 个 specialized experts，总计算也与原来的大 FFN 大致可比；大多数窗口由于 \(k_w<k_{\max}\)，实际平均成本更低。这解释了为什么它能在 PANDA 上同时提高 AP 并降低 FLOPs。

与 N:M Sparsity 的固定硬件规则稀疏不同，GigaMoE 是输入相关的条件计算稀疏。N:M 在权重矩阵里固定每组保留几个非零，用于部署时的矩阵乘加速；GigaMoE 不删除专家权重，而是在每张图、每个窗口上动态决定激活哪些专家。它特别适合 gigapixel detection：同一张图里有极大背景、密集小目标、建筑边缘和复杂纹理，静态统一 FFN 难以同时满足效率和精度。

论文实验也符合这个直觉：SparseFormer 已经能筛掉大量空间冗余，但它的 FFN 仍是瓶颈；GigaMoE 把这个瓶颈改造成按重要性分配的专家计算后，在 DINO 检测头下报告 79.1% AP、51.24 GFLOPs，而 SparseFormer 对应为 75.71 GFLOPs。更重要的是，小目标和复杂区域获得更高预算，这正对应 PANDA 这类人群/车辆密集场景的检测难点。

#### 🧪 练习题

```yaml
question: "GigaMoE 中 Sparsity-Guided Routing 的核心作用是什么？"
options:
  - "用稀疏 backbone 的区域重要性分数决定每个窗口调用多少 specialized experts"
  - "把所有专家都固定激活"
  - "删除目标检测 head"
  - "将图像下采样到 224x224 后再检测"
answer: 0
explain: "GigaMoE 先用 ScoreNet 分数排序窗口，再按预设分布映射出 \\(k_w\\)，让复杂或高分窗口调用更多专家，简单窗口只用 shared expert 或少量专家。"
```
