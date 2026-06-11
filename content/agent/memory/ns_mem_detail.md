### NS-Mem: 神经符号长期记忆 (NS-Mem)

```yaml
id: ns_mem
name: NS-Mem
full_name: 神经符号长期记忆 (NS-Mem)
year: '2026.03'
org: UNSW/Zhejiang University
paper_url: https://arxiv.org/abs/2603.15280
category: multimodal
parent: mma
motivation: 引入规则层让记忆支持演绎推理
```

#### 📝 一句话总结
NS-Mem提出了一种**三层神经符号长期记忆框架**，通过引入Logic Layer存储过程性知识的符号化有向无环图（Procedural DAG），并结合自动化的SK-Gen记忆构建机制与混合检索策略，使多模态Agent在约束密集的推理任务中比纯向量记忆系统提升12.5%的准确率。

#### 🎯 核心要点
- **三层记忆原型的统一架构**：Episodic Layer（多模态事件）、Semantic Layer（实体属性及类型）、Logic Layer（过程性DAG+神经索引），三层通过entity anchor和episodic links垂直关联
- **SK-Gen自动记忆构建与增量维护**：五步蒸馏流水线（动作序列提取→频繁序列挖掘→符号DAG构建→验证→神经索引计算），支持指数移动平均（EMA）增量更新
- **混合检索与符号增强**：查询分类（factual/constraint/character）→多粒度检索（goal-level + step-level双索引）→符号查询函数进行DAG确定性遍历
- **显著提升约束推理能力**：在M3-Bench等多模态基准上总体提升4.35%，约束类查询提升12.5%，证明符号结构为推理提供了严谨的逻辑底座

#### 🔬 深入细节
```python
# 记忆系统的抽象流程
mem = store.load()
ctx = store.retrieve(query, mem)
answer = agent.respond(query, ctx)
store.update(query, answer, mem)
```

![NS-Mem 示意图](https://ar5iv.labs.arxiv.org/html/2603.15280/assets/x1.png)
*图：NS-Mem 的核心框架或评测示意。*

##### 1. Motivation：纯向量记忆的边界与符号推理的必要性
论文用一个典型场景揭示了纯向量检索记忆系统的根本缺陷：Jack正在制作水果沙拉，Agent已知水果已切好（ID 798）、家里的碗坏了（ID 2341）、楼下商店有碗且仅需1分钟（ID 5231）。当用户问"What should Jack do next?"时，纯向量系统基于语义相似度只能检索到"水果沙拉→混合"的记忆片段，完全忽略了"碗已损坏"和"附近可获取碗"这两个关键约束——因为这些约束在语义嵌入空间中的位置与查询无关。NS-Mem通过Logic Layer中的过程DAG显式编码步骤依赖与前置条件，使Agent能进行"需要碗→碗已坏→替代方案：楼下购买"这样的演绎推理链。

##### 2. 三层架构设计
┌────────────────────────────────────────────┐
│  Logic Layer (ℒ_logic)                     │
│  • 每个Logic Node = 神经索引 + 过程DAG     │
│  • DAG节点：v₁→v₂→v₃（步骤+转移概率）     │
│  • 双索引向量：i_goal + i_step             │
│  • episodic_links ⟂ 底层证据追溯           │
├────────────────────────────────────────────┤
│  Semantic Layer (ℒ_sem)                    │
│  • 实体类型 + 属性键值对                    │
│  • 例：{type: Bowl, entity: Jack's bowl,    │
│          status: broken}                   │
├────────────────────────────────────────────┤
│  Episodic Layer (ℒ_epi)                    │
│  • (t, 文本描述d, 神经嵌入v_e)              │
│  • 多模态：ArcFace人脸 + ERes2Net语音       │
│  • 时间戳维护时序而非显式边                  │
└────────────────────────────────────────────┘
关键设计：Logic Layer与Semantic Layer之间通过"概念扩展"关联——Semantic层存储静态实体属性，Logic层捕获涉及这些实体的动态行为模式。Logic Nodes彼此独立（不同过程），但通过episodic_links向下连接到具体的Episodic证据节点，实现了从抽象过程到具体观测的可追溯性。

##### 3. SK-Gen：从观测流到符号记忆的全自动化构建

**Algorithm 1伪代码（核心逻辑）**：
Algorithm 1: SK-Gen: Memory Construction and Maintenance
Input: Observation stream O={o₁,...,o_K}, thresholds τ_pos, τ_neg, σ, τ, δ, EMA β
Output: Memory system M=(ℒ_epi, ℒ_sem, ℒ_logic)

// Phase 1: Observation Processing
A ← ∅; ℒ_epi ← ∅; ℒ_sem ← ∅
for each clip o_k in O:
    F_k ← ArcFace(o_k); U_k ← ERes2Net(o_k)   // 感知特征提取
    A ← ClusterAndTrack(A, F_k, U_k)           // 实体锚点更新
    D_k, C_k ← VLM(o_k, A)                    // VLM生成描述+结论
    for each description d in D_k:            // 构建Episodic节点
        e ← (t_k, d, ϕ(d)); ℒ_epi ← ℒ_epi ∪ {e}
    for each conclusion c in C_k:             // 更新Semantic层
        ℒ_sem ← MergeOrCreate(ℒ_sem, c)

// Phase 2: Logic Node Distillation (周期性触发)
S ← ExtractActionSequences(ℒ_epi)             // Step 1: 动作序列提取
F ← FrequentPatternMining(S, σ)               // Step 2: 频繁模式挖掘
for each pattern f in F:
    G ← BuildProceduralDAG(f)                 // Step 3: 构建过程DAG
    if VerifyDAG(G, ℒ_epi, τ):                // Step 4: 验证
        i_goal, i_step ← ComputeIndices(G)    // Step 5: 神经索引计算
        N ← (G, i_goal, i_step, ...)
        ℒ_logic ← ℒ_logic ∪ {N}

// Phase 3: Incremental Maintenance (增量触发)
for each new observation chunk:
    // EMA更新神经索引: i_new = β·i_obs + (1-β)·i_old
    // 更新DAG边转移频率P(v_j|v_i)
    // 结构性修改：添加/删除边或节点

五步蒸馏流水线详解：
1. **动作序列提取**：从时间有序的Episodic记忆中提取每个会话的动作序列S_v
2. **频繁序列挖掘**：跨会话使用序列模式挖掘（支持度阈值σ），发现反复出现的任务模式
3. **符号DAG构建**：将频繁过程转化为有向无环图，节点为步骤、边为转移概率P(v_j|v_i)
4. **验证**：通过positive/negative consolidation thresholds (τ_pos, τ_neg)和验证阈值τ过滤噪声
5. **神经索引计算**：对DAG的目标描述和步骤序列分别编码为i_goal和i_step向量

增量更新策略避免了全量重建：使用指数移动平均(EMA)平滑更新神经索引，仅修改受影响边的转移频率，必要时通过结构性修改增删DAG边和节点。

##### 4. 混合检索与符号增强推理
查询到达后经过三个阶段：
- **查询分类**：规则+LLM两阶段分类器区分factual（事实召回）、constraint（约束求解）、character（角色推断）三类，指导后续检索权重分配
- **多粒度检索**：Stage I用神经双索引（goal-level和step-level，权重α=0.3平衡总体意图与具体步骤匹配）进行相似度搜索召回候选集；Stage II根据查询类型重排——约束查询优先Logic Nodes，事实查询优先Episodic证据
- **符号查询函数**：对检索到的Logic Node的DAG执行确定性操作，包括路径枚举（O(|Π|·L)）、属性约束过滤（如"需要碗→status≠broken"）、跨过程聚合统计。这些操作快速、可复现，避免了LLM从非结构化文本"猜测"的不确定性

##### 5. 实验洞察
在Online Video Understanding和Agent benchmark上，NS-Mem对比M3-Agent（SOTA向量记忆方法）：
- 总体准确率：53.6% vs 48.9%（+4.35%）
- 按查询类型：factual +1.8%，procedural +11.9%，**constraint +12.5%**
- 消融实验揭示：Logic Layer移除导致约束查询骤降，验证符号结构的核心贡献
- 检索权重α=0.3达到最优，说明适度偏向具体步骤匹配的同时保留目标级语义对齐效果最好
- 检索轮次和时间的效率实验表明符号查询O(|Π|·L)的计算开销远低于大模型多次推理

#### 🧪 练习题
```yaml
question: "NS-Mem 在 constraint 类查询上显著优于纯向量记忆，最根本的原因是什么？"
options:
  - "它把所有视频帧都直接放进上下文窗口"
  - "它在 Logic Layer 中显式保存过程 DAG 和约束关系，可做确定性的符号过滤与路径推理"
  - "它完全放弃了 Episodic Layer，只保留规则"
  - "它依赖更大的基础模型参数量"
answer: 1
explain: "constraint 查询需要处理前置条件、冲突状态和步骤依赖，NS-Mem 的 Logic Layer 提供了向量检索难以表达的显式过程结构。"
```
