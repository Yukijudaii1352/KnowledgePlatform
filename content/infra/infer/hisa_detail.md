### HISA: 层次化索引稀疏注意力 (HISA)

```yaml
id: hisa
name: HISA
full_name: 层次化索引稀疏注意力 (HISA)
year: '2026'
org: Y Xu等
paper_url: https://arxiv.org/abs/2603.28458
category: attention
parent: nsa
motivation: 层次化索引实现细粒度稀疏注意力
```

#### 📝 一句话总结

HISA 通过层次化索引在粗粒度块和细粒度 token 之间逐级筛选注意力目标，让稀疏注意力既能细粒度选择关键 token，又保持可扩展的检索成本。

#### 🎯 核心要点

- 构建层次化索引，先选粗块再选细粒度 token/子块
- 降低直接在全部历史 token 上打分的成本
- 保留比纯块级稀疏更细的关键 token 选择能力
- 面向长上下文推理/训练的硬件友好稀疏 attention
- 继承 NSA 路线中动态稀疏和局部窗口互补的思想

#### 🔬 深入细节

![HISA 核心示意图](https://ar5iv.labs.arxiv.org/html/2603.28458/assets/x1.png)
*图：HISA 的层次化索引稀疏注意力框架。*

```python
# HISA hierarchical selection
coarse_scores = score(Q, coarse_block_index(KV))
coarse_blocks = topk(coarse_scores, k1)
fine_scores = score(Q, fine_index(KV, coarse_blocks))
fine_units = topk(fine_scores, k2)
out = attend(Q, gather(KV, fine_units) + local_window(KV))
```

##### 动机与背景

动态稀疏 attention 若直接给每个历史 token 打分，索引成本可能接近全注意力；若只按大块选择，又容易把块内无关 token 一并读入。HISA 的目标是在选择精度和索引成本之间做层次化折中。

##### 核心机制

HISA 先用粗粒度索引快速定位可能相关的历史区域，再在这些区域内部做细粒度选择。这样候选集逐层缩小，最终 attention 只访问更少但更精确的 K/V。

##### 训练/推理流程

预处理或在线维护 block/token 层级索引；每步 decode 先计算 query 与粗索引的相似度，选择若干块；再对子块或 token 级索引评分；最后对选中单元和局部窗口执行精确 attention。

##### 与传统方法的区别

相比 NSA 的块级选择，HISA 更强调索引层次；相比纯 token top-k，它避免对全历史逐 token 打分。它是一种把信息检索结构引入 sparse attention 的方法。

#### 🧪 练习题

```yaml
question: "HISA 为什么使用层次化索引？"
options:
  - "先粗后细降低选择成本并保留细粒度"
  - "为了增加 YAML 字段"
  - "为了删除局部窗口"
  - "为了把模型变成 CNN"
answer: 0
explain: "层次化索引先缩小候选块，再细选 token/子块，兼顾效率和精度。"
```
