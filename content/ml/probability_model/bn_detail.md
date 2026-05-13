### BN — 贝叶斯网络 (Bayesian Network)

```yaml
id: bn
name: BN
full_name: 贝叶斯网络 (Bayesian Network)
year: '1988'
org: UCLA
paper_url: http://bayes.cs.ucla.edu/jp_home.html
category: foundation
parent: —
motivation: 有向图表达因果依赖关系
```

#### 📝 一句话总结

Pearl 提出贝叶斯网络（Bayesian Network），用有向无环图（DAG）编码随机变量间的条件独立关系，并给出基于消息传递的高效精确推断算法（信念传播），将联合概率分布的表示与推理从指数级复杂度降至可处理规模，奠定了概率图模型与因果推断的理论基础。

#### 🎯 核心要点

- **有向无环图（DAG）表示**：每个节点代表一个随机变量，有向边表示直接概率依赖（因果影响），缺失的边编码条件独立性假设
- **联合分布分解**：利用链式法则与条件独立性，将联合概率分解为局部条件概率表（CPT）的乘积：\(P(X_1, \ldots, X_n) = \prod_{i=1}^{n} P(X_i \mid \text{Parents}(X_i))\)
- **d-分离准则（d-separation）**：图结构上的路径阻断判定法则，可直接从 DAG 拓扑读出任意变量集间的条件独立关系
- **信念传播算法（Belief Propagation）**：在树结构贝叶斯网上的精确推断算法，通过节点间传递 \(\lambda\) 消息（自底向上的似然证据）和 \(\pi\) 消息（自顶向下的先验信息）实现高效后验计算
- **马尔可夫毯（Markov Blanket）**：一个节点的父节点、子节点及子节点的其他父节点构成其马尔可夫毯，给定马尔可夫毯后该节点与网络中其余所有节点条件独立
- **因果语义**：DAG 的有向边天然承载因果方向信息，为后续因果推断（do-calculus）奠定图结构基础

#### 🔬 深入细节

##### 模型框架示意

![贝叶斯网络结构示意图](https://upload.wikimedia.org/wikipedia/commons/thumb/0/0e/SimpleBayesNet.svg/400px-SimpleBayesNet.svg.png)
*图：一个简单贝叶斯网络示例。有向边表示变量间的直接概率依赖关系，联合分布可分解为各节点给定其父节点的条件概率之积。*

##### 算法伪代码

```python
# Pearl 信念传播算法（树结构精确推断）伪代码
def belief_propagation(bn_tree, evidence):
    """
    bn_tree: 树结构贝叶斯网络（节点含 CPT）
    evidence: 观测证据 {node: observed_value}
    返回: 每个节点的后验概率 P(X_i | evidence)
    """
    # 1. 初始化消息
    for node in bn_tree.nodes:
        node.lambda_val = uniform()       # λ(x): 来自子节点的似然消息
        node.pi_val = uniform()           # π(x): 来自父节点的先验消息
        if node in evidence:
            node.lambda_val = indicator(evidence[node])  # 证据节点: δ 函数

    # 2. 自底向上传递 λ 消息（叶→根）
    for node in reverse_topological_order(bn_tree):
        if node.is_leaf and node not in evidence:
            node.lambda_val = ones()      # 非证据叶节点: 全 1
        else:
            # λ(x_i) = ∏_child λ_child→i(x_i)
            node.lambda_val = product(
                lambda_message(child, node) for child in node.children
            )
        # 向父节点发送 λ 消息
        if node.parent:
            # λ_node→parent(x_parent) = Σ_{x_node} P(x_node|x_parent) · λ(x_node)
            msg = sum_over(node.cpt * node.lambda_val, axis=node)
            send_lambda(node, node.parent, msg)

    # 3. 自顶向下传递 π 消息（根→叶）
    for node in topological_order(bn_tree):
        if node.is_root:
            node.pi_val = node.prior      # 根节点: 先验分布
        else:
            # π(x_i) = Σ_{x_parent} P(x_i|x_parent) · π_parent→i(x_parent)
            node.pi_val = sum_over(node.cpt * pi_message(node.parent, node))
        # 向子节点发送 π 消息
        for child in node.children:
            # π_node→child(x_node) = π(x_node) · ∏_{other_child} λ_{other→node}(x_node)
            msg = node.pi_val * product(
                lambda_message(c, node) for c in node.children if c != child
            )
            send_pi(node, child, msg)

    # 4. 计算后验: BEL(x_i) = α · λ(x_i) · π(x_i)
    for node in bn_tree.nodes:
        node.belief = normalize(node.lambda_val * node.pi_val)

    return {node: node.belief for node in bn_tree.nodes}
```

##### 动机与背景

20 世纪 80 年代，人工智能领域的知识表示与推理面临严峻挑战。基于规则的专家系统（如 MYCIN）在处理不确定性时依赖确定性因子（certainty factor）等临时性方法，缺乏严格的概率论基础，导致推理结果不一致且难以维护。另一方面，直接使用完整的联合概率分布进行推理在计算上是不可行的——\(n\) 个二值变量的联合分布需要 \(2^n - 1\) 个独立参数，存储和计算都呈指数增长。

Judea Pearl 在 UCLA 的研究团队提出了一个优雅的解决方案：**利用有向无环图（DAG）显式编码变量间的条件独立关系**，从而将高维联合分布分解为低维局部条件分布的乘积。这一思想的核心洞察是——现实世界中的变量之间通常只存在稀疏的直接依赖关系，大量变量在给定少数中间变量后是条件独立的。通过图结构捕获这种稀疏性，可以将指数级的参数空间压缩到线性级别。

Pearl 的 1988 年专著《Probabilistic Reasoning in Intelligent Systems: Networks of Plausible Inference》系统地建立了贝叶斯网络的理论框架，包括图结构的语义定义、条件独立性的图判定准则（d-分离）、以及高效的推断算法（信念传播）。这部著作不仅统一了此前分散的概率推理方法，更开创了概率图模型这一全新研究领域。

##### 核心机制：联合分布的图分解

贝叶斯网络的数学基础建立在**条件独立性**与**链式法则**的结合之上。对于任意联合分布，链式法则给出：

$$P(X_1, X_2, \ldots, X_n) = \prod_{i=1}^{n} P(X_i \mid X_1, \ldots, X_{i-1})$$

在一般情况下，每个条件概率 \(P(X_i \mid X_1, \ldots, X_{i-1})\) 可能依赖于所有前序变量。贝叶斯网络的关键假设是：**每个变量在给定其父节点后，与所有非后代节点条件独立**，即：

$$P(X_i \mid X_1, \ldots, X_{i-1}) = P(X_i \mid \text{Parents}(X_i))$$

这一局部马尔可夫性质使得联合分布可以紧凑地分解为：

$$P(X_1, X_2, \ldots, X_n) = \prod_{i=1}^{n} P(X_i \mid \text{Parents}(X_i))$$

> 💡 **关键直觉**：贝叶斯网络的图分解本质上是一种"知识压缩"——通过显式声明哪些变量之间**没有**直接依赖，将联合分布的参数量从指数级降至与网络边数成正比的线性级。例如，一个包含 100 个二值变量、每个变量最多 3 个父节点的贝叶斯网络，仅需约 \(100 \times 2^3 = 800\) 个参数，而完整联合分布需要 \(2^{100} - 1 \approx 10^{30}\) 个参数。

##### 核心机制：d-分离准则

Pearl 提出的 **d-分离（d-separation）** 准则是贝叶斯网络理论中最优雅的贡献之一。它提供了一种纯图论方法，仅通过检查 DAG 的拓扑结构即可判定任意两组变量在给定第三组变量时是否条件独立。

d-分离的判定基于三种基本连接模式：

1. **链式连接（Chain）**：\(A \to B \to C\)。给定 \(B\) 后，\(A\) 与 \(C\) 条件独立（信息流被阻断）
2. **分叉连接（Fork）**：\(A \gets B \to C\)。给定 \(B\) 后，\(A\) 与 \(C\) 条件独立（共同原因被观测）
3. **对撞连接（Collider / V-structure）**：\(A \to B \gets C\)。**未**给定 \(B\)（及其后代）时，\(A\) 与 \(C\) 独立；给定 \(B\) 后反而变得**不独立**（"解释消除"效应）

> ⚠️ **注意**：对撞结构（V-structure）的行为与前两种恰好相反——观测对撞节点会**打开**原本阻断的路径。这是贝叶斯网络中最反直觉但也最重要的现象，它使得条件独立关系不能简单地通过"观测越多越独立"来推断。

形式化定义：给定变量集 \(Z\)，若从 \(X\) 到 \(Y\) 的所有路径都被 \(Z\) d-分离（即每条路径上至少存在一个被阻断的节点），则 \(X \perp\!\!\!\perp Y \mid Z\)。

##### 核心机制：信念传播算法

Pearl 提出的信念传播（Belief Propagation）算法是贝叶斯网络上的高效精确推断方法。对于**树结构**（多叉树/多连通树）的贝叶斯网络，该算法通过两轮消息传递即可计算所有节点的后验概率。

算法的核心思想是将全局推断分解为局部计算。每个节点维护两个量：

- **\(\pi\) 值**（因果支持）：来自父节点方向的先验信息，\(\pi(x_i) = P(x_i \mid \text{上方证据})\)
- **\(\lambda\) 值**（诊断支持）：来自子节点方向的似然信息，\(\lambda(x_i) = P(\text{下方证据} \mid x_i)\)

节点的后验概率（信念）由两者的乘积归一化得到：

$$\text{BEL}(x_i) = P(x_i \mid \text{所有证据}) = \alpha \cdot \pi(x_i) \cdot \lambda(x_i)$$

其中 \(\alpha\) 为归一化常数。

> 💡 **关键直觉**：信念传播的精妙之处在于将贝叶斯定理的"先验 × 似然 ∝ 后验"这一全局运算，分解为沿图结构的局部消息传递。每个节点只需与其邻居通信，无需了解整个网络的结构，这使得算法天然适合分布式计算。

对于一般的 DAG（含环或多连通结构），精确推断是 NP-hard 的。后续发展出多种近似方法：
- **联合树算法（Junction Tree）**：将一般 DAG 转化为团树后进行精确推断
- **环路信念传播（Loopy BP）**：在含环图上直接运行信念传播，虽无收敛保证但实践中常有效
- **变分推断**与**蒙特卡洛采样**：适用于大规模网络的近似推断

##### 与传统方法的区别

| 特性 | 规则系统（专家系统） | 完整联合分布 | 贝叶斯网络 (BN) |
|------|---------------------|-------------|-----------------|
| 不确定性处理 | 确定性因子（ad hoc） | 精确概率论 | 精确概率论 |
| 参数规模 | 规则数量 | \(O(2^n)\) 指数级 | \(O(n \cdot 2^k)\)，\(k\) 为最大父节点数 |
| 推理一致性 | 可能不一致 | 保证一致 | 保证一致 |
| 可解释性 | 规则链 | 无结构 | DAG 可视化因果关系 |
| 推理效率 | 依赖规则匹配 | 不可行 | 树结构 \(O(n)\)，一般 NP-hard |
| 因果语义 | 无 | 无 | 有向边表达因果方向 |

与同时期的**马尔可夫随机场（MRF）**相比，贝叶斯网络的独特优势在于：（1）有向边天然表达因果方向，而 MRF 的无向边只表达相关性；（2）参数化更直观——条件概率表（CPT）直接对应专家知识或数据统计；（3）d-分离准则比 MRF 的全局马尔可夫性更精细，能捕获对撞结构带来的条件依赖。

#### 🧪 练习题

```yaml
question: "在贝叶斯网络的对撞结构 A → C ← B 中，以下哪个说法是正确的？"
options:
  - "A 和 B 始终独立，无论是否观测 C"
  - "给定 C 后，A 和 B 变为条件独立"
  - "未观测 C 时 A 和 B 边际独立，观测 C 后 A 和 B 变为条件相关"
  - "A 和 B 始终相关，无论是否观测 C"
answer: 2
explain: "对撞结构（V-structure）的特殊性质：未观测对撞节点 C 时，A 和 B 边际独立；一旦观测 C（或其后代），路径被'打开'，A 和 B 变为条件相关。这与链式和分叉结构的行为恰好相反。"
```