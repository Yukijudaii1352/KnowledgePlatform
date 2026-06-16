### Sub-MoE: 子空间 MoE 压缩

```yaml
id: sub_moe
name: Sub-MoE
full_name: 子空间MoE压缩 (Sub-MoE)
year: '2026'
org: AAAI 2026
paper_url: https://ojs.aaai.org/index.php/AAAI/article/view/39464
category: hybrid
parent: switch_transformer
motivation: 子空间专家合并压缩缓解显存压力
```

#### 📝 一句话总结

Sub-MoE 提出一种训练后、无需微调的 MoE 专家合并框架：先按专家输出相似度自适应聚类，再用联合 SVD 把同组专家对齐到共享子空间，只合并专家特有的 \(V\) 分量，从而缓解直接权重平均造成的参数冲突。

#### 🎯 核心要点

- 面向 MoE LLM 的显存、存储和部署压力，压缩对象是专家数量与专家内部维度，而不是 dense backbone。
- Adaptive Expert Clustering 使用校准数据上的专家输出余弦相似度进行 K-means 聚类，保证只合并功能相近的专家。
- Subspace Expert Merging 对同组专家权重做 Experts Union SVD，提取共享 \(U\Sigma\) 基底，并对专家特有 \(V\) 矩阵做频率加权合并。
- 频率权重来自路由器 Top-\(k\) 激活次数，高频专家在合并后贡献更大，同时保留低频专家的部分能力。
- Sub-MoE† 进一步引入 activation-aware truncated SVD，在合并专家内部截断低重要性奇异值以提高压缩率。
- 论文在 Mixtral、DeepSeek、Qwen1.5/3 MoE 上评估，摘要报告 Mixtral-8x7B 在 25%/50% expert reduction 下保留约 96%/86% 原始性能。

#### 🔬 深入细节

##### 核心示意图

![Sub-MoE 框架公开快照](https://moonlight-paper-snapshot.s3.ap-northeast-2.amazonaws.com/arxiv/sub-moe-efficient-mixture-of-expert-llms-compression-via-subspace-expert-merging-1.png)
*图：Moonlight 对 Sub-MoE 论文图的公开 PNG 快照，对应论文中的专家聚类与 Subspace Expert Merging 流程；官方论文来源为 AAAI 页面 PDF。*

##### 算法伪代码

```python
# Sub-MoE expert compression for one or multiple MoE layers
def sub_moe_compress(model, calibration_tokens, target_expert_counts):
    for layer_group in select_layer_groups(model.moe_layers):
        # 1) Adaptive Expert Clustering
        outputs = {}
        for expert in layer_group.experts:
            outputs[expert] = [expert(x) for x in calibration_tokens]

        sim = cosine_similarity_matrix(outputs)
        clusters = kmeans(features=outputs, k=target_expert_counts[layer_group])

        # 2) Subspace Expert Merging
        for cluster in clusters:
            for weight_name in ["W_gate", "W_up", "W_down"]:
                weights = [expert[weight_name] for expert in cluster]
                W_stack = concat_along_input_or_output(weights)
                U, Sigma, V_blocks = union_svd(W_stack)

                freq = [
                    routing_frequency(expert, calibration_tokens)
                    for expert in cluster
                ]
                V_blocks = [ties_sparsify(V) for V in V_blocks]
                V_merged = weighted_average(V_blocks, weights=freq)
                W_merged = U @ Sigma @ V_merged.T
                write_weight(cluster.merged_expert, weight_name, W_merged)

            redirect_router(cluster.original_experts, cluster.merged_expert)

    # Optional Sub-MoE dagger: activation-aware truncated SVD
    for expert in model.merged_experts:
        expert = activation_aware_truncated_svd(expert, calibration_tokens)
    return model
```

##### 方法机制解读

Sub-MoE 要解决的是专家合并中的 parameter conflict。MoE 层对 token \(x\) 的输出可以写成：

$$
y=\sum_{i=1}^{n}G_i(x)\cdot E_i(x),
\quad
E_i(x)=\left(\sigma(xW_{\mathrm{gate}}^i)\odot xW_{\mathrm{up}}^i\right)W_{\mathrm{down}}^i
$$

路由器会把不同输入分配给不同专家，长期训练后专家形成不同参数空间。直接做 \(W_{\mathrm{merged}}=\sum_i\alpha_iW^{(i)}\) 往往把彼此冲突的方向平均掉，尤其在 Mixtral 这类专家相似度较低的模型上会显著损伤性能。因此 Sub-MoE 不在原始参数空间直接合并，而是先找到可共享的子空间。

第一阶段用功能相似度决定谁能合并。给定校准 token 集合 \(X=\{x_1,\dots,x_m\}\)，两个专家的相似度定义为输出余弦相似度平均：

$$
\mathrm{Sim}(E_i,E_j)=
\frac{1}{m}\sum_{\ell=1}^{m}
\frac{E_i(x_\ell)\cdot E_j(x_\ell)}
{\|E_i(x_\ell)\|\|E_j(x_\ell)\|}
$$

K-means 的目标是把专家输出表示分到 \(k\) 个簇 \(Q_i\)，最小化簇内距离：

$$
J=\sum_{i=1}^{k}\sum_{E_j\in Q_i}\|Y_j-C_i\|^2
$$

这里 \(Y_j\) 是专家 \(E_j\) 在校准集上的输出集合，\(C_i\) 是簇中心。使用输出而不是权重相似度很关键，因为两个专家即使权重坐标不同，也可能对真实数据产生相似函数行为；反过来，权重接近也不保证经过 SwiGLU 等非线性后输出相似。

第二阶段是 Subspace Expert Merging。对一个簇 \(Q\) 内的专家，分别对 \(W_{\mathrm{gate}}, W_{\mathrm{up}}, W_{\mathrm{down}}\) 做联合分解。论文把同组专家权重拼接后做 SVD：

$$
\mathrm{SVD}\left([W^{(1)};\ldots;W^{(n)}]\right)
=
U\Sigma [V^{(1)};\ldots;V^{(n)}]^T
$$

其中 \(U\Sigma\) 被看作同组专家共享的正交基底，\(V^{(i)}\) 则保留第 \(i\) 个专家在该共享基底下的特有投影。这样，容易冲突的原始参数先被对齐到同一个低维子空间，再只对 \(V\) 侧做合并，避免把未对齐的权重方向直接平均。

合并 \(V\) 时，Sub-MoE 使用路由频率作为权重。对专家 \(i\)，采样频率为：

$$
f(V_i)=
\frac{\sum_{x\in X}\mathbf{1}[i\in\mathrm{TopK}(G(x),k)]}{|X|}
$$

合并后的 \(V\) 为：

$$
V_{\mathrm{merged}}=
\frac{\sum_{i\in Q}f(V_i)\cdot V_i}{\sum_{i\in Q}f(V_i)}
$$

最终重构：

$$
W_{\mathrm{merged}}=U\Sigma V_{\mathrm{merged}}^T
$$

这个设计的直觉是：共享 \(U\Sigma\) 负责对齐同组专家的共同表达空间，频率加权的 \(V_{\mathrm{merged}}\) 负责按真实路由分布保留更常用专家的特征。论文还在合并前对 \(V_i\) 使用 TIES-style sparsification，以减少方向符号冲突。

Sub-MoE† 进一步压缩专家内部维度。它用输入激活统计构造 whitening/activation-aware 矩阵 \(S_i\)，先分解激活加权权重：

$$
W_i' = W_iS_i,\quad
\mathrm{SVD}([W'^{(1)};\ldots;W'^{(n)}])
=
U'\Sigma'[V'^{(1)};\ldots;V'^{(n)}]^T
$$

合并时把 \(S_i^{-1}\) 映射回原空间：

$$
V_{\mathrm{merged}}=
\frac{\sum_{i\in Q}f(V_i)\cdot V'^{(i)}S_i^{-1}}{\sum_{i\in Q}f(V_i)}
$$

再通过截断 \(\Sigma'\) 中较小或低重要性的奇异值控制压缩率：

$$
W_{\mathrm{merged}}^{\mathrm{trunc}}
=
U'\cdot\mathrm{Trunc}(\Sigma')\cdot V_{\mathrm{merged}}^T
$$

这一步把专家数量压缩与专家内部低秩压缩串联起来，适合显存预算更紧的部署场景。它的风险也更高，因为截断奇异值会直接丢弃部分表达能力，因此论文把它作为 Sub-MoE 的扩展版本，而非基础专家合并的必要步骤。

> 💡 关键：Sub-MoE 的核心不是“平均相似专家”，而是“先把专家权重投到共享子空间，再在专家特有分量上按路由频率融合”。

##### 与剪枝和普通合并的区别

专家剪枝直接删除低频或低贡献专家，优点是简单，缺点是丢掉专家知识；普通专家合并在原始权重空间做加权平均，容易产生参数冲突。Sub-MoE 处在两者之间：它保留每个被合并专家在 \(V\) 分量中的投影，再通过共享 \(U\Sigma\) 对齐后重构一个代表专家，因此比剪枝保留更多信息，也比原始权重平均更稳定。

#### 🧪 练习题

```yaml
question: "Sub-MoE 为什么要在联合 SVD 后主要合并 V 矩阵？"
options:
  - "UΣ 表示同组专家共享子空间，V 保留专家特有投影；只合并 V 能减少未对齐权重的参数冲突"
  - "V 矩阵不参与前向传播，因此可以随意平均而不影响模型"
  - "U 矩阵只能用于图像模型，不能用于语言模型专家"
  - "联合 SVD 的目的只是把权重量化成 INT8"
answer: 0
explain: "Sub-MoE 先用联合 SVD 对齐共享基底，再按路由频率融合专家特有 V 分量，避免直接平均原始权重。"
```
