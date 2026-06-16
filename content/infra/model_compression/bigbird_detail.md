### BigBird

```yaml
id: bigbird
name: BigBird
full_name: 大鸟 (BigBird)
year: 2020
org: Google
paper_url: https://proceedings.neurips.cc/paper/2020/hash/c8512d142a2d849725f31a9a7a361ab9-Abstract.html
category: sparsity_deploy
parent: longformer
motivation: 引入随机注意力块保持全图连通
```

#### 📝 一句话总结

BigBird 提出由随机注意力、滑动窗口注意力和全局注意力组成的块稀疏 Transformer，在把长序列注意力复杂度降为线性的同时，保留 Transformer 的通用逼近能力和图灵完备性等理论性质。

#### 🎯 核心要点

- 稀疏注意力由三类连接组成：random attention、sliding window attention、global attention
- 使用 block sparse attention，把 token 分块后按稀疏图计算注意力，适合 GPU/TPU 上紧凑执行
- 随机连接提供远距离短路径，使稀疏注意力图具备更好的连通性和快速信息传播
- 滑动窗口连接保留文本序列的局部结构，对语法、短语和邻近上下文建模稳定
- 全局 token 与全序列双向连接，可采用 BigBird-itc 的内部全局 token 或 BigBird-etc 的额外全局 token
- 当窗口块数 \(w\)、随机块数 \(r\)、全局块数 \(g\) 固定时，注意力连接数随序列长度 \(n\) 线性增长
- 理论上证明包含 star graph 的稀疏注意力仍可作为序列函数的 universal approximator，并可在 encoder-decoder 架构中保持图灵完备性
- 实验覆盖问答、摘要和基因组序列建模，最长可在相近硬件上处理比既有模型更长的序列

#### 🔬 深入细节

![BigBird 组合注意力模式](https://ar5iv.labs.arxiv.org/html/2007.14062/assets/x4.png)
*图：来自论文 Figure 1(d) 的 BigBird 组合模式。白色表示无连接，最终注意力由随机块、局部窗口块和全局块叠加而成。*

```python
# BigBird block sparse attention 伪代码
def bigbird_attention(tokens, block_size, window_blocks, random_blocks, global_blocks):
    blocks = split_into_blocks(tokens, block_size)
    outputs = {}

    for i, block in enumerate(blocks):
        if i in global_blocks:
            attend = set(range(len(blocks)))              # global block attends all blocks
        else:
            attend = set()
            attend.update(local_neighbor_blocks(i, window_blocks))
            attend.update(sample_random_blocks(i, random_blocks, len(blocks)))
            attend.update(global_blocks)                  # all blocks attend global blocks

        outputs[i] = block_sparse_attention(query=blocks[i],
                                            keys=[blocks[j] for j in attend],
                                            values=[blocks[j] for j in attend])
    return merge_blocks(outputs)
```

BigBird 的出发点比 Longformer 更理论化：如果只用局部窗口，复杂度可以线性化，但远距离 token 的信息传播需要很多层；如果加入少量全局 token，任务汇聚变得容易，但普通 token 之间的长程路径仍可能受限。BigBird 将注意力矩阵看成有向图 \(D\)：节点是 token 或 block，边表示 query 可以 attend 到哪些 key。设计好的稀疏图需要同时满足局部结构、远距离短路径和全局汇聚。

三类边的职责很清晰。滑动窗口边让第 \(i\) 个 block 关注附近 block：

$$
\mathcal{A}_{\mathrm{window}}(i)=\{j:\ |i-j|\le w/2\}
$$

随机边让每个 query block 额外连接 \(r\) 个随机 key block：

$$
\mathcal{A}_{\mathrm{random}}(i)=\{j_1,\ldots,j_r\},\quad j_k\sim \mathrm{Uniform}([1,n])
$$

全局边让少量全局 block \(G\) 与全序列双向连接：

$$
\mathcal{A}_{\mathrm{global}}(i)=G,\qquad \mathcal{A}(g)=\{1,\ldots,n\},\ g\in G
$$

最终 BigBird 的可见集合可以概括为：

$$
\mathcal{A}_{\mathrm{BigBird}}(i)=
\mathcal{A}_{\mathrm{window}}(i)\cup
\mathcal{A}_{\mathrm{random}}(i)\cup
\mathcal{A}_{\mathrm{global}}(i)
$$

若每个 block 的窗口连接数 \(w\)、随机连接数 \(r\)、全局连接数 \(g\) 都固定，则总连接数近似为：

$$
|\mathcal{E}|=O(n(w+r+g))
$$

这使注意力计算和显存从 full attention 的 \(O(n^2)\) 降为 \(O(n)\) 级别。论文采用 block sparse 的原因也在这里：实际硬件上按单个 token 随机 gather 往往低效，按 block 组织稀疏矩阵能更好地打包局部窗口、全局列和随机列，在 GPU/TPU 上执行更紧凑。

随机注意力是 BigBird 相比 Longformer 的核心差异。论文借鉴随机图和 small-world network 的直觉：在只有 \(\tilde{\Theta}(n)\) 条边的随机图中，任意节点间的最短路径通常是对数级，信息混合速度明显好于纯局部链式结构。对注意力图来说，随机边不是噪声，而是廉价的远程捷径；它让远隔数千 token 的片段可以通过少量层建立通信路径。

全局 token 则承担理论和任务两方面的角色。论文讨论了两种设计：BigBird-itc 将现有输入中的一部分 token 设为 global；BigBird-etc 额外引入全局 token，并可按任务结构设计，例如 question token、paragraph token 或 `[CLS]`。理论证明中，包含以特殊 token 为中心的 star graph \(S\) 是关键条件：若稀疏图 \(D\) 包含 \(S\)，则对连续序列函数 \(f\)，存在稀疏 Transformer \(g\) 可以逼近它：

$$
\forall f\in \mathcal{F}_{\mathrm{CD}},\ \forall \epsilon>0,\quad
\exists g\in \mathcal{T}_{D}^{H,m,q}\ \text{s.t.}\ d_p(f,g)\le \epsilon
$$

直观解释是，全局 token 先收集全序列的上下文编码，再通过后续层把上下文广播回各位置，从而补偿稀疏注意力缺失的直接全连接。论文进一步说明，稀疏 encoder-decoder Transformer 在相同理想化精度条件下仍可模拟图灵机，说明 BigBird 并不是单纯工程剪枝，而是在理论表达能力上保留了 full Transformer 的关键性质。

> 💡 关键：BigBird 的三类连接分别解决三个问题：窗口边保局部结构，随机边降图直径，全局边做汇聚和理论上的信息中转。

与 Longformer 对比，BigBird 的 local + global 部分相似，但额外随机边让图连通性更强，也带来了 universal approximation 和 Turing completeness 的证明。代价是实现和调参更复杂：随机 block 的采样、稀疏 gather、全局 token 的任务设计都会影响性能。部署时，BigBird 更适合需要极长上下文且长程交互重要的任务，如多跳问答、长文档摘要和 DNA 序列建模；若任务主要依赖邻近上下文和少量聚合 token，Longformer 的确定性窗口结构可能更简单。

#### 🧪 练习题

```yaml
question: "BigBird 中 random attention 的核心作用是什么？"
options:
  - "用少量远程随机边缩短稀疏注意力图中的路径，改善长距离信息传播"
  - "随机删除所有全局 token"
  - "把滑动窗口大小固定为 1"
  - "将模型权重量化为 4 bit"
answer: 0
explain: "随机边让原本局部链式传播的稀疏图获得远程捷径，与窗口边和全局边共同维持线性复杂度下的连通性。"
```
