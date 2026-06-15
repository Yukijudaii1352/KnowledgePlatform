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

BigBird 提出由局部窗口、随机连接和全局 token 组成的块稀疏注意力，在保持线性复杂度的同时保留 Transformer 的通用逼近和图连通性质，解决了长序列稀疏注意力缺少理论保证的问题。

#### 🎯 核心要点

- 三类稀疏边：window attention、random attention、global attention
- 使用 block sparse attention，把 token 分块后按稀疏图计算注意力
- 复杂度从 \(O(n^2)\) 降到 \(O(n)\) 级别，可处理更长序列
- 随机边改善远距离信息传播和图连通性
- 全局 token 如 `[CLS]` 连接全序列，承担汇聚和广播角色
- 理论上证明保留通用逼近能力和图灵完备性

#### 🔬 深入细节

![BigBird 注意力模式](https://ar5iv.labs.arxiv.org/html/2007.14062/assets/x4.png)
*图：BigBird 将随机注意力、窗口注意力和全局注意力组合成线性复杂度的稀疏注意力模式。*

```python
# BigBird block sparse attention 伪代码
blocks = split_sequence(tokens, block_size)
for block_i in blocks:
    attend_blocks = local_neighbors(block_i, window=w)
    attend_blocks += random_blocks(block_i, r=num_random)
    attend_blocks += global_blocks
    if block_i in global_blocks:
        attend_blocks = blocks
    output[block_i] = block_attention(block_i, attend_blocks)
```

Longformer 证明局部窗口加全局 token 在实践中有效，但纯局部模式的信息传播依赖层数，且理论表达能力容易被质疑。BigBird 把稀疏 attention 看成图结构：token 是节点，attention 边决定信息流。要在长序列上高效又不失表达能力，稀疏图必须既局部稳定，又有远距离连接和全局枢纽。

三类边分别承担不同角色。窗口边捕捉邻近上下文；随机边让远距离 token 之间出现短路径，提高图连通性；全局边让少数 token 与所有 token 相连，用于序列级汇聚。总连接数随 \(n\) 线性增长：

$$
|\mathcal{E}|=O(n(w+r+g))
$$

当窗口数 \(w\)、随机块数 \(r\)、全局 token 数 \(g\) 固定时，复杂度为 \(O(n)\)。

> 💡 关键：BigBird 的随机注意力不是噪声，而是用少量远距离边降低稀疏图直径，使信息更容易跨长文档传播。

论文还给出理论结果：在适当稀疏模式下，BigBird 仍是序列函数的 universal approximator，并保持图灵完备性。这一点让它不同于纯经验设计的稀疏注意力，说明稀疏化不必然牺牲 Transformer 的基本表达能力。

部署上，BigBird 适合问答、摘要和基因序列等长上下文任务。相比 full attention，它牺牲部分任意两点直接交互，换来大幅长度扩展；相比 Longformer，它多了随机远程连接和更强理论论证。

#### 🧪 练习题

```yaml
question: "BigBird 中随机注意力块的主要作用是什么？"
options:
  - "增加远距离连接，改善稀疏注意力图的连通性和信息传播"
  - "把所有 token 的 embedding 随机初始化"
  - "替代所有局部窗口注意力"
  - "压缩权重到 4 bit"
answer: 0
explain: "随机边提供少量跨文档远程路径，与局部窗口和全局 token 一起构成高效且连通的稀疏图。"
```
