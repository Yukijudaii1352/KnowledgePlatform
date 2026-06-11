### DimMem: 维度化长期记忆 (DimMem)

```yaml
id: dimmem
name: DimMem
full_name: 维度化长期记忆 (DimMem)
year: '2026.05'
org: StepOS/Xiamen University
paper_url: https://arxiv.org/abs/2605.15759
category: structured
parent: h_mem
motivation: 把记忆原子化为可按维召回单元
```

#### 📝 一句话总结
DimMem 提出维度化记忆架构（Dimensional Memory），将记忆视作可动态组合的维度化Token，通过“结构化锚点+语义检索+关系遍历”三路索引实现线性时间检索，并引入基于信息论的信息过载（Information Overload, IO）显式控制机制；在此基础上提出 ResMem-Augmented Fine-Tuning，首次使 0.5B 参数模型在长上下文任务中与 GPT-4o 性能持平。

#### 🎯 核心要点
- 提出维度化记忆架构（Dimensional Memory），每个记忆单元由多维度属性组成的 Schema 定义，支持结构化存储与检索
- 三路索引机制：结构化锚点（Anchor-based）、语义向量检索（Semantic Retrieval）、关系图遍历（Relational Traversal），统一为线性时间复杂度的检索范式
- 显式信息过载（Information Overload, IO）控制：基于信息论定义 IO 指标，动态裁剪检索结果，防止上下文超载
- ResMem-Augmented Fine-Tuning：将检索到的记忆作为残差（Residual Memory）注入 Transformer 层，实现记忆增强微调
- 0.5B 参数模型在长上下文基准（如 LongBench、∞Bench）中首次达到 GPT-4o 同级水平
- 支持记忆的动态增量更新与维度演化，无需全量重索引
- 开源实现与基准测试套件，覆盖检索效率、记忆利用率和端到端任务性能

#### 🔬 深入细节
##### 1. 核心架构：维度化记忆与三路检索

![DimMem 整体架构示意](https://arxiv.org/html/2605.15759v1/assets/dimmem_architecture.png)
*图：DimMem 维度化记忆架构总览——左侧为记忆写入流程（Schema化分维存储），右侧为三路检索通路（锚点+语义+关系图）。*

DimMem 的核心洞察在于将传统向量数据库的扁平化存储升级为**维度化结构**：每条记忆不再是一个简单的 \( \langle k, v \rangle \) 对，而是按预定义维度（如时间、主体、事件类型、置信度等）组织的多字段记录。这一设计直接使得检索可以从“纯语义匹配”升级为“结构化筛选+语义精排”的两阶段模式，**将检索复杂度从 \( O(N) \) 的全库扫描降为 \( O(\sqrt[d]{N}) \) 的分桶检索**（其中 \( d \) 为有效分桶维度数）。

##### 2. 算法伪代码：三路检索与信息过载控制

```python
# DimMem 三路检索核心逻辑
def retrieve(query, memory_store, io_budget):
    # 路1: 结构化锚点检索 —— O(1) 定位到维度分桶
    anchors = anchor_match(query.dimensions, memory_store.index)
    
    # 路2: 语义向量检索 —— 仅在锚点桶内做 ANN
    candidates = semantic_search(query.embedding, anchors, top_k=K_sem)
    
    # 路3: 关系图遍历 —— 沿知识图谱边扩展关联记忆
    relational = graph_traverse(candidates, max_hops=H)
    
    # 合并 & 信息过载控制
    merged = merge_and_dedup(candidates, relational)
    result = io_control(merged, io_budget, method="information_gain")
    return result

def io_control(items, budget, method):
    """基于信息增益的IO控制：贪心选取最大化边际信息增益的记忆"""
    selected = []
    for item in sorted(items, key=lambda x: x.info_gain, reverse=True):
        if sum(s.token_len for s in selected) + item.token_len <= budget:
            selected.append(item)
    return selected
```

##### 3. 信息过载（IO）控制机制详解

DimMem 首次将**信息过载**这一认知科学概念形式化引入 Agent 记忆系统。其核心定义如下：

给定检索到的候选记忆集合 \( \mathcal{M} = \{m_i\} \)，每条记忆 \( m_i \) 携带信息量 \( I(m_i) \) 和 token 长度 \( L(m_i) \)，在总预算 \( B \) 的约束下，IO 控制的目标是：

\[
\max \sum_{m_i \in \mathcal{S}} I(m_i) \quad \text{s.t.} \sum_{m_i \in \mathcal{S}} L(m_i) \leq B
\]

其中 \( I(m_i) \) 由两部分组成：**语义相关性**（与当前查询的余弦相似度）和**维度化信息密度**（该记忆在所属维度分桶中的区分度，用局部熵衡量）。这一形式化使得检索不再盲目追求 recall，而是在有限上下文窗口内最大化有用信息密度。

> 💡 **关键**：IO 控制本质是一个背包问题，DimMem 采用贪心近似（按单位 token 信息量排序截断），从而保持整体检索的线性时间复杂度。

##### 4. ResMem-Augmented Fine-Tuning：记忆残差注入

DimMem 的另一关键贡献是**残差记忆增强微调（ResMem-Augmented Fine-Tuning, RMAFT）**。不同于 RAG 仅在输入层拼接检索文本，RMAFT 将检索到的记忆作为**残差信号**注入 Transformer 的多个中间层：

\[
h_l' = h_l + \alpha_l \cdot \text{MemEnc}(m_{\text{retrieved}})
\]

其中 \( h_l \) 为第 \( l \) 层的原始隐状态，\( \text{MemEnc} \) 为记忆编码器（一个轻量 MLP + Cross-Attention），\( \alpha_l \) 为可学习的层级别缩放因子。这种设计的优势在于：
- **层级化知识注入**：不同层可以自适应地选择利用记忆的程度（浅层可能更依赖语言模型先验，深层更依赖检索事实）
- **残差形式保护预训练权重**：记忆注入以加性方式进行，不破坏原有表征空间，微调稳定
- **端到端可微**：检索器（双编码器）与主模型联合训练，检索质量随任务提升

##### 5. 维度 Schema 的动态演化

DimMem 的记忆维度并非静态预定义，而是支持**在线维度演化**。当系统检测到某维度分桶的局部熵超过阈值（即桶内记忆过于混杂），会自动触发维度分裂（Dimension Splitting），将粗粒度维度细化为子维度。反之，长期低利用率的维度会被合并（Dimension Merging），避免索引碎片化。这一机制使得记忆系统在长周期运行中保持高效的检索结构。

> ⚠️ **注意**：维度演化是后台异步操作，不阻塞在线检索——分裂/合并后的索引通过写时复制（Copy-on-Write）策略平滑切换。

##### 6. 实验亮点

在 LongBench 和 ∞Bench 两个长上下文基准上，DimMem + RMAFT 以 **0.5B 参数**的基座模型取得了与 GPT-4o（估计 >200B）持平甚至更优的单任务得分。具体而言：
- **检索效率**：三路索引在 10^6 规模记忆中保持 <50ms 检索延迟，相较全库语义扫描快 20×
- **IO 控制有效性**：在固定 4K token 预算下，启用 IO 控制的任务得分比无控制高 12.3%
- **维度演化收益**：30 天连续运行中，检索精度下降仅 2.1%（静态 Schema 下降 8.7%）

#### 🧪 练习题
```yaml
question: "DimMem 的信息过载（IO）控制机制核心优化目标是什么？"
options:
  - "最大化检索记忆的数量"
  - "最大化检索记忆的语义相似度之和"
  - "在token预算约束下最大化检索记忆的总信息量"
  - "最小化检索延迟"
answer: 2
explain: "IO控制形式化为预算约束背包问题，目标是在上下文窗口限制下贪心选取单位token信息量最高的记忆，而非单纯追求数量或相似度。"
```
