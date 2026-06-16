### ESM-IF — 从预测结构中学习的蛋白逆折叠模型

```yaml
id: esmif
name: ESM-IF
full_name: ESM-IF (ESM Inverse Folding)
year: '2022.04'
org: Meta AI
paper_url: https://www.biorxiv.org/content/10.1101/2022.04.10.487779v1
category: protein_design
parent: —
motivation: 几何图神经网络实现逆折叠
```

#### 📝 一句话总结

ESM-IF 把固定骨架蛋白设计建模为“给定 backbone 坐标生成氨基酸序列”的自回归条件语言建模问题，并用 1200 万条 AlphaFold2 预测结构扩充训练数据，使 GVP-Transformer 在结构 held-out 测试上达到约 51% native sequence recovery。

#### 🎯 核心要点

- **逆折叠任务定义**：输入每个残基的 \(N, C_\alpha, C\) backbone 坐标，输出最可能折叠到该骨架的氨基酸序列
- **预测结构扩容训练集**：用 AlphaFold2 为 UniRef50 中 1200 万条序列预测结构，将结构监督规模相对 CATH 实验结构扩大近三个数量级
- **GVP-Transformer 架构**：先用 GVP-GNN 提取旋转/平移不变的几何特征，再接通用 encoder-decoder Transformer 做自回归序列生成
- **坐标不变性设计**：模型输出满足 \(p(Y|X)=p(Y|TX)\)，即整体旋转和平移输入骨架不改变序列分布
- **span masking 训练**：随机屏蔽连续 backbone 片段，使模型能处理缺失坐标、局部重设计和多链复合物设计
- **性能提升**：GVP-Transformer + AF2 预测结构训练在 CATH topology split 上达到约 51.6% recovery，埋藏残基 recovery 约 72%
- **官方实现**：Meta ESM repo 提供 `esm_if1_gvp4_t16_142M_UR50` 权重、采样脚本和 log-likelihood scoring 脚本

#### 🔬 深入细节

##### 模型与任务图示

![ESM-IF1 逆折叠示例](https://raw.githubusercontent.com/facebookresearch/esm/main/examples/inverse_folding/illustration.png)
*图：Meta ESM 官方 inverse folding 示例图。论文 Figure 1 展示了“CATH 实验结构 + 1200 万 AF2 预测结构 → GVP encoder + Transformer decoder”的训练流程，可访问 PDF 为 `https://proceedings.mlr.press/v162/hsu22a/hsu22a.pdf`。*

ESM-IF 的论文正式收录于 ICML 2022 PMLR，题名为 *Learning inverse folding from millions of predicted structures*。bioRxiv 链接对应预印本；PMLR 页面和 Meta 官方 GitHub README 均可访问，并给出代码、权重和使用脚本。

##### 算法伪代码

```python
# ESM-IF1 / GVP-Transformer 逆折叠伪代码
def esm_if_design(backbone_coords, temperature=1.0, masked_spans=None):
    # backbone_coords: [L, 3, 3], 每个残基的 N, CA, C 坐标
    coords = apply_span_mask(backbone_coords, masked_spans)

    # 1. 构建几何图：节点为残基，边为空间近邻
    graph = build_knn_graph(coords, atom_types=["N", "CA", "C"])
    node_scalar, node_vector = featurize_dihedrals_and_local_vectors(coords)
    edge_scalar, edge_vector = featurize_relative_geometry(graph, coords)

    # 2. GVP encoder 提取几何特征，并转为局部参考系下的不变特征
    h_geo = gvp_encoder(graph, node_scalar, node_vector, edge_scalar, edge_vector)
    h_inv = project_vectors_to_local_frames(h_geo, coords)

    # 3. Transformer encoder-decoder 自回归生成序列
    memory = transformer_encoder(h_inv)
    sequence = ["<bos>"]
    for i in range(L):
        logits_i = transformer_decoder(sequence, memory)
        prob_i = softmax(logits_i / temperature)
        sequence.append(sample(prob_i))

    return "".join(sequence[1:])
```

##### 概率建模与损失函数

论文把逆折叠形式化为条件分布学习。给定长度为 \(n\) 的蛋白 backbone 坐标：

$$
X=(x_1,\ldots,x_{3n})
$$

其中每个残基有 \(N, C_\alpha, C\) 三个 backbone 原子坐标，目标是预测氨基酸序列：

$$
Y=(y_1,\ldots,y_n)
$$

模型采用自回归 encoder-decoder：

$$
p(Y|X)=\prod_{i=1}^{n}p(y_i|y_{i-1},\ldots,y_1;X)
$$

训练目标是最小化 native sequence 的负对数似然：

$$
\mathcal{L}_{\text{NLL}}=-\sum_{i=1}^{n}\log p_\theta(y_i|y_{<i},X)
$$

推理时可用低温采样提升 native recovery，也可用较高温度增加设计多样性。官方 README 指出温度越高序列越多样，但 native sequence recovery 通常下降；若目标是最大化 recovery，推荐接近确定性的低温采样，如 \(T=10^{-6}\)。

##### GVP-Transformer 架构

ESM-IF 研究了三类架构：原始 GVP-GNN、放宽宽度/深度的 GVP-GNN-large，以及最终表现最好的 GVP-Transformer。GVP 层同时处理 scalar features 和 vector features：标量通道表达二面角、距离等旋转不变信息，向量通道表达局部方向；每层对向量特征做旋转等变变换，对标量特征做旋转不变更新。

最终的 142M 参数 GVP-Transformer 由 4 层 GVP-GNN encoder、8 层 Transformer encoder 和 8 层 Transformer decoder 组成。GVP 部分负责把三维几何压缩成对全局旋转/平移不敏感的局部表征；Transformer 部分负责长程序列依赖、自回归条件生成和处理缺失骨架上下文。

> 💡 关键：纯 GVP-GNN 在小规模 CATH 上表现强，但不能充分吸收 1200 万预测结构；更大的 GVP-Transformer 才能把预测结构规模转化为 recovery 提升。

##### 预测结构如何提升逆折叠

实验结构数据太少是早期逆折叠模型的瓶颈。论文统计 CATH topology split 训练集只有约 1.6 万条结构，而 UniRef50 序列空间远大于 PDB 结构空间。ESM-IF 的做法类似机器翻译中的 back-translation：用 AlphaFold2 先为大量序列预测结构，再用这些“合成结构-天然序列”对训练从结构到序列的逆向模型。

训练时每个 epoch 混合实验结构和 10% 的 AF2 预测结构，比例约为 1:80。为了减少低置信预测区域的噪声，论文屏蔽 pLDDT 低于 90 的预测坐标，并把 pLDDT 通过 Gaussian radial basis functions 作为额外特征输入。训练中还加入约 0.1 Å 坐标噪声，提高模型对预测结构误差的鲁棒性。

结果显示，小型 1M GVP-GNN 加入预测结构反而退化，但 GVP-GNN-large 和 GVP-Transformer 均显著受益。GVP-Transformer 从只用 CATH 的约 38.3% recovery 提升到使用 AF2 预测结构后的约 51.6%，说明“数据规模”和“模型容量/架构”必须同时匹配。

##### Span masking、多链和多状态设计

ESM-IF 不只做完整单链骨架恢复。论文在训练时随机选择最长 30 个残基的连续 span，直到约 15% backbone 坐标被 mask，使模型可以在缺失坐标时仍根据上下文设计序列。这对局部 loop 重设计、部分未知结构和 flexible regions 很有用。

多链复合物设计时，官方脚本支持 `--multichain-backbone`：encoder 读取整个复合物的 backbone，decoder 只为指定链生成或打分序列。论文发现对于复合物中某条链，给定完整复合物坐标通常比只给单链坐标 perplexity 更低，说明模型利用了界面附近链间几何。

多状态设计则把同一序列需要兼容的多个构象联合起来。若状态为 \(A\) 和 \(B\)，可用几何平均 likelihood 作为代理目标：

$$
\log p(Y|A,B) \approx \frac{1}{2}\left[\log p(Y|A)+\log p(Y|B)\right]
$$

这使模型能为 flexible proteins、酶构象或结合前后状态设计兼容序列。

##### 与传统方法的区别

传统 Rosetta 类方法通常显式搜索侧链构象并优化物理能量函数；ESM-IF 则直接学习 \(p(\text{sequence}|\text{backbone})\)，用数据中的天然序列统计替代手工能量项。与 ProteinMPNN 相比，ESM-IF 的核心特色是更大规模的预测结构训练集和 GVP-Transformer 结合，而不是单纯依靠消息传递网络。

ESM-IF 的局限也很清楚：它主要条件在 backbone \(N,C_\alpha,C\) 坐标上，不显式联合生成 backbone；设计结果仍需 AlphaFold/实验或能量评估做二次筛选；surface residues 的 recovery 明显低于 buried residues，因为表面残基天然可替代性更高。但作为逆折叠和零样本突变打分模型，它证明了预测结构可以成为蛋白设计模型的重要训练数据。

#### 🧪 练习题

```yaml
question: "ESM-IF 中加入 1200 万 AlphaFold2 预测结构的关键作用是什么？"
options:
  - "让模型直接输出 AlphaFold2 的坐标，不再生成序列"
  - "扩大结构-序列监督规模，使大容量 GVP-Transformer 能学习更广泛的骨架到序列映射"
  - "替代自回归 decoder，使模型变成无监督语言模型"
  - "只提高小型 GVP-GNN 的性能，与模型容量无关"
answer: 1
explain: "论文显示小型 GVP-GNN 加入预测结构会退化，而大容量 GVP-GNN-large/GVP-Transformer 能利用 1200 万预测结构，将 recovery 提升到约 51%。"
```
