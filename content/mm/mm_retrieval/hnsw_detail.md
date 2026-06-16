### HNSW — 分层可导航小世界图 (HNSW)

```yaml
id: hnsw
name: HNSW
full_name: 分层可导航小世界图 (HNSW)
year: '2016'
org: —
paper_url: https://arxiv.org/abs/1603.09320
category: vector_ann
parent: —
motivation: 多层导航图平衡精度与速度
```

#### 📝 一句话总结

HNSW 提出可增量构建的分层 NSW 近邻图，用稀疏高层做长距离导航、稠密底层做精细搜索，解决单层图检索容易陷入局部极小和大规模搜索效率不足的问题。

#### 🎯 核心要点

- 分层图结构：每个向量随机分配最高层级，层级越高节点越少、边越长
- 两阶段查询：高层用 `ef=1` 贪心下降到底层，底层用较大的 `efSearch` 维护候选集
- 增量插入：新点从全局入口点开始逐层搜索，并在目标层及以下连接邻居
- 近邻选择启发式：优先保留方向多样的邻居，缓解聚簇数据中边界处卡住的问题
- 关键参数：`M` 控制每层连接数与内存，`efConstruction` 控制建图质量，`efSearch` 控制查询召回与延迟
- 复杂度直觉：指数衰减的层级分布使高层节点数按比例缩小，近似得到对数级导航路径

#### 🔬 深入细节

![HNSW 分层搜索示意图](https://cdn.sanity.io/images/vr8gru94/production/e63ca5c638bc3cd61cc1cd2ab33b101d82170426-1920x1080.png)
*图：HNSW 查询从最高层入口点开始贪心移动，逐层下降到底层后扩展候选集并返回近邻。*

```python
# HNSW 查询与插入的核心流程
def search_hnsw(graph, query, top_k, ef_search):
    ep = graph.entry_point

    # 高层只做贪心导航，快速接近查询所在区域
    for level in range(graph.max_level, 0, -1):
        ep = search_layer(graph, query, [ep], ef=1, level=level)[0]

    # 底层保留 ef_search 个候选，最后截取 top_k
    candidates = search_layer(graph, query, [ep], ef=ef_search, level=0)
    return sorted(candidates, key=lambda x: distance(query, x))[:top_k]

def insert_hnsw(graph, x, M, ef_construction, m_L):
    level_x = floor(-log(uniform(0, 1)) * m_L)
    ep = graph.entry_point

    for level in range(graph.max_level, level_x, -1):
        ep = search_layer(graph, x, [ep], ef=1, level=level)[0]

    for level in range(min(graph.max_level, level_x), -1, -1):
        candidates = search_layer(graph, x, [ep], ef=ef_construction, level=level)
        neighbors = select_neighbors_heuristic(x, candidates, M)
        graph.add_bidirectional_edges(x, neighbors, level)
        graph.shrink_overfull_neighbors(level)
        ep = candidates
```

HNSW 的出发点是改造 Navigable Small World 图。单层 NSW 通过近邻边和少量长边支持贪心搜索，但当数据量变大或分布强聚簇时，查询路径可能在局部最小点停住；如果单纯提高每个点的度数，又会推高内存和距离计算。HNSW 的核心想法是把“长距离跳转”和“局部精修”拆到不同层：顶层只保留少数点，承担粗导航；底层包含所有点，承担最终近邻判定。

层级由指数衰减分布生成。论文插入算法中，新点最高层级为：

$$
l=\left\lfloor-\ln(U)\cdot m_L\right\rfloor,\quad U\sim \operatorname{Uniform}(0,1)
$$

因此更高层的节点数快速减少，可理解为图版本的 skip list。若 \(P(l\geq t)\approx e^{-t/m_L}\)，每下降一层都会进入更密的候选空间；高层长边降低全局路径长度，底层短边提高局部精度。

查询阶段分两段。第一段从入口点 `ep` 在最高层开始，每层运行 `SEARCH-LAYER(q, ep, ef=1)`，只保留当前最近点并继续向下。这一步不追求完整召回，只负责把入口点搬到查询附近。第二段在第 0 层运行 `SEARCH-LAYER(q, ep, efSearch)`，维护一个大小为 `efSearch` 的动态候选集合 \(W\)。当待扩展候选 \(c\) 已经比 \(W\) 中最远元素还远时，可以停止扩展：

$$
d(c,q)> \max_{w\in W} d(w,q)
$$

`efSearch` 是运行时最重要的精度-速度旋钮。更大的 `efSearch` 会访问更多邻居，召回率更高，但距离计算和延迟也更高；返回 \(K\) 个结果时通常要求 `efSearch >= K`。

插入阶段与查询类似，但在新点所属层及以下把搜索结果当成连边候选。朴素做法是直接选最近的 \(M\) 个候选；HNSW 论文进一步提出邻居选择启发式：按离新点距离从近到远检查候选，只保留那些不被已选邻居“遮挡”的点。直觉上，它不是只堆叠同一方向的近邻，而是保留覆盖不同方向的边，让图在聚簇边界处仍有跨区域通路。

> 💡 关键：`M` 决定图的平均出度和内存，`efConstruction` 决定建图时候选搜索深度，`efSearch` 决定查询时召回。HNSW 的工程优势正来自这三个参数把内存、构建时间、查询延迟和召回率分开调节。

与 IVF/PQ 这类量化或聚类索引相比，HNSW 不需要先训练粗量化器，也不把空间切成固定桶；它依赖图导航动态逼近查询区域。这使它在高召回 ANN 场景中非常强，但代价是图边会占用较多内存，并且大规模批量构建时 `efConstruction` 和 `M` 的选择会明显影响构建成本。

#### 🧪 练习题

```yaml
question: "HNSW 中 efSearch 参数的主要作用是什么？"
options:
  - "决定每个向量最高能进入哪一层"
  - "控制底层查询阶段保留和扩展的候选集合大小"
  - "控制每个节点最多连接多少条边"
  - "决定向量是否需要乘积量化"
answer: 1
explain: "efSearch 越大，底层搜索会保留更多候选并访问更多邻居，通常召回更高但延迟也更高。"
```
