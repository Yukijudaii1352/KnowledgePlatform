### Learned Index

```yaml
id: learned_index
name: Learned Index
full_name: 学习索引 (Learned Index)
year: '2018'
org: Google
paper_url: https://dl.acm.org/doi/10.1145/3183713.3196909
category: emerging
parent: —
motivation: ML替代B+树,查询加速
```

#### 📝 一句话总结

Learned Index 将范围索引、哈希索引和存在性索引重新表述为“学习数据分布的模型”，用小型神经网络/线性模型预测键的位置或成员关系，并用误差边界与局部搜索保留索引语义。

#### 🎯 核心要点

- 核心观察：B-Tree 可视为从 key 到有序数组位置的回归模型，Bloom Filter 可视为二分类模型
- 范围索引建模为 CDF 估计：模型预测 \(P(Y \le k)\)，再映射为数组位置
- 提出 Recursive Model Index (RMI)：多阶段模型按预测结果路由到下一阶段专家模型
- LIF 框架将训练好的 TensorFlow 模型抽取权重并生成轻量 C++ 推理代码，避免在线使用 TensorFlow
- Hybrid Index 在误差过大时用 B-Tree 替换末层模型，给最坏情况查询提供传统索引兜底
- 搜索阶段存储每个末层模型的 min/max error，用 model-biased binary search 或 quaternary search 修正预测误差
- 论文在只读内存分析场景下展示学习索引可比 cache-optimized B-Tree 更快且占用更少内存，但写密集、分布漂移和磁盘分页仍是开放问题

#### 🔬 深入细节

![B-Tree 与 Learned Index 对比](https://ar5iv.labs.arxiv.org/html/1712.01208/assets/x1.png)
*图：论文 Figure 1 展示 B-Tree 与 learned index 都把 key 映射到数据位置；学习索引用模型预测位置，再在误差窗口内查找。来源：arXiv/ar5iv 论文图。*

![RMI 分阶段专家模型](https://ar5iv.labs.arxiv.org/html/1712.01208/assets/x3.png)
*图：论文 Figure 3 展示 Recursive Model Index，上一阶段模型的输出直接选择下一阶段模型，末阶段输出最终位置。来源：arXiv/ar5iv 论文图。*

```python
# Recursive Model Index 查询伪代码
def lookup(key, rmi, sorted_keys):
    model_id = 0
    pred = 0
    for stage in range(len(rmi.stages)):
        model = rmi.stages[stage][model_id]
        pred = model.predict(key)
        if stage + 1 < len(rmi.stages):
            next_width = len(rmi.stages[stage + 1])
            model_id = clamp(int(pred / len(sorted_keys) * next_width), 0, next_width - 1)

    leaf = rmi.stages[-1][model_id]
    lo = max(0, int(pred - leaf.max_under_error))
    hi = min(len(sorted_keys) - 1, int(pred + leaf.max_over_error))
    return lower_bound(sorted_keys, key, lo, hi)
```

学习索引的第一步是把“索引结构”变成“预测问题”。对一个按 key 排序的数组，范围索引要找的是第一个大于等于查询键 \(k\) 的位置。论文指出这等价于学习经验 CDF：

$$
\hat{p}(k) = N \cdot \hat{F}(k)
$$

其中 \(N\) 是记录数，\(\hat{F}(k)\) 是模型估计的“键小于等于 \(k\)”的比例。B-Tree 实际上也在近似这个 CDF，只是它用分支节点分段缩小范围；学习索引用线性模型、神经网络或混合模型直接拟合分布形状。如果数据分布接近线性，位置预测甚至可以退化成一次乘加。

RMI 解决的是单个模型“最后一公里”精度不足的问题。一个模型很容易把 1 亿条记录缩小到几千条范围，但要精确到几十条可能需要更复杂的网络，反而失去速度优势。RMI 用顶层模型学习全局 CDF，再把预测值映射到下一层模型编号，让下层专家只拟合局部子分布：

$$
j_{i+1} = \left\lfloor \frac{M_{i,j_i}(k)}{N} \cdot m_{i+1} \right\rfloor
$$

其中 \(M_{i,j_i}\) 是第 \(i\) 层第 \(j_i\) 个模型，\(m_{i+1}\) 是下一层模型数量。它像树一样逐步缩小数据区域，但阶段之间没有传统树查找中的比较循环，模型输出直接成为下一层路由。

学习索引不能只追求平均误差，因为数据库索引必须能找到正确记录。论文的做法是在训练后对每个末层模型跑一遍训练键，记录最大低估和高估误差：

$$
window(k) = [\hat{p}(k) - \epsilon_{under},\ \hat{p}(k) + \epsilon_{over}]
$$

查询时只在这个窗口里做 `lower_bound`、biased binary search 或 quaternary search。这样模型负责把搜索空间从全表压缩到一个很小的局部窗口，传统搜索负责恢复精确语义。若某个局部分布太难学习，Hybrid Index 会把该末层模型替换为 B-Tree，使最坏情况退化为传统索引而不是错误返回。

与 B+Tree 的关键差别在于成本结构。B+Tree 查询主要是分支判断和随机访存，缓存未命中会带来几十到上百个 cycle；学习索引主要是小模型推理和紧邻位置的局部搜索，适合 SIMD、批量推理和未来 ML 加速器。代价是它更依赖数据分布稳定性：只读或 append-heavy 的时间戳、地理位置等索引很适合；频繁中间插入、强分布漂移、多页磁盘布局则需要 delta index、重训练、分页感知模型或传统索引兜底。

> 💡 关键：Learned Index 不是“用神经网络硬替 B+Tree”，而是把可学习的分布形状交给模型，把必须保证正确性的部分交给误差边界、局部搜索和混合索引。

#### 🧪 练习题

```yaml
question: "RMI 在 Learned Index 中主要解决什么问题？"
options:
  - "让每次查询都必须遍历所有模型以提高准确率"
  - "用多阶段专家模型先拟合全局分布再拟合局部子分布，降低最后一公里误差"
  - "把所有键随机打散以适配哈希表"
  - "完全取消误差边界和局部搜索"
answer: 1
explain: "RMI 让上层模型负责粗粒度定位，下层模型只学习局部区域，因此能以较小模型成本获得更窄的搜索窗口。"
```
