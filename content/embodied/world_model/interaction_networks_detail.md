### 交互网络 (Interaction Networks)

```yaml
id: interaction_networks
name: IN
full_name: 交互网络 (Interaction Networks)
year: "2016.12"
org: DeepMind
paper_url: https://proceedings.neurips.cc/paper/2016/hash/3147da8ab4a0437c15ef51a5cc7f2dc4-Abstract.html
category: physics
parent: "—"
motivation: 通过对象关系图建模实现物理系统推理
```

#### 📝 一句话总结

Interaction Networks 提出把物理系统表示为对象和关系组成的图，并分别用关系模型和对象模型计算交互效应与状态更新，解决普通神经网络难以泛化到不同对象数量、关系结构和物理组合的问题。

#### 🎯 核心要点

- **对象-关系图输入**：节点表示对象状态，边表示物理关系或约束，外部效应单独作为输入
- **关系模型 \(f_R\)**：对每条边计算 sender 对 receiver 的 interaction effect
- **对象模型 \(f_O\)**：聚合所有作用到同一对象的 effect，再预测对象未来状态
- **共享权重与置换不变性**：同一个 \(f_R\)、\(f_O\) 作用于所有边和节点，可泛化到不同对象数
- **可学习物理引擎**：在 n-body、弹性碰撞、非刚体弹簧系统中学习多步 rollout
- **抽象属性推断**：可加 global abstraction model 估计系统势能等整体属性

#### 🔬 深入细节

![Interaction Network 框架图](https://ar5iv.labs.arxiv.org/html/1612.00222/assets/x1.png)
*图：Interaction Network 先计算关系交互效应，再把效应聚合到对象上执行对象动力学更新。*

##### 算法伪代码

```python
# Interaction Network one-step prediction
def interaction_network(objects, relations, external_effects):
    # objects: O_j, relations: (receiver_i, sender_i, attr_i)
    effects_by_receiver = defaultdict(list)

    for receiver, sender, rel_attr in relations:
        b_ij = concat(objects[receiver], objects[sender], rel_attr)
        e_ij = f_R(b_ij)                       # relation-centric reasoning
        effects_by_receiver[receiver].append(e_ij)

    predictions = []
    for j, obj in enumerate(objects):
        e_bar = sum(effects_by_receiver[j])    # commutative aggregation
        c_j = concat(obj, external_effects[j], e_bar)
        p_j = f_O(c_j)                         # object-centric dynamics
        predictions.append(p_j)

    return predictions
```

##### 动机与背景

物理系统的复杂性来自组合：同一种物体、同一种关系可以在不同数量、不同拓扑和不同初始条件下反复出现。普通 MLP 若把所有状态展平成向量，就把“第 1 个物体”和“第 2 个物体”绑定到固定输入位置，难以迁移到 3 个、6 个或 12 个物体。

IN 的关键假设是物理推理应分解为两类局部计算：关系计算和对象更新。关系模型学习“两个对象之间的相互作用”，对象模型学习“对象在外部效应和所有交互作用下如何变化”。这种分解与传统物理引擎的接触/力计算非常接近，但参数由神经网络从数据中学习。

##### 核心公式

设对象集合为 \(O = \{o_j\}\)，关系集合为 \(R = \langle R_r, R_s, R_a\rangle\)，其中 \(R_r\) 和 \(R_s\) 分别索引 receiver 与 sender，\(R_a\) 是关系属性。IN 的基本计算为：

$$
B = m(O, R)
$$

$$
E = \phi_R(B)
$$

$$
C = a(O, R, E, X)
$$

$$
P = \phi_O(C)
$$

其中 \(m\) 是 marshalling function，把对象和关系整理成每条边的输入；\(\phi_R\) 是共享的关系 MLP；\(a\) 把同一 receiver 的边效应求和聚合；\(\phi_O\) 是共享的对象 MLP。

##### 为什么能泛化

IN 的泛化来自两个结构约束。第一，\(f_R\) 在所有边上共享，相当于学习一种局部相互作用规则；第二，边效应用 sum 聚合，满足交换律和结合律，因此对象顺序不会改变结果：

$$
\bar{e}_j = \sum_{i: r(i)=j} e_i
$$

这让模型可以处理训练时未见过的对象数量和关系图。例如论文中 n-body 训练用 6 个天体，测试可以评估 3 个和 12 个天体；弹簧串训练一种端点固定方式，测试不同长度和固定方式。

##### 训练与 rollout

论文主要用监督方式训练单步速度预测：

$$
\mathcal{L} = \| \hat{v}_{t+1} - v_{t+1} \|_2^2
$$

多步 rollout 时，把模型输出的速度用于更新位置，再作为下一步输入。虽然只训练单步，IN 在 n-body、bouncing balls 和 string 系统中可以滚动上千步并保持物理上合理的轨迹。

> 💡 关键：IN 把“可学习神经网络”放进“对象-关系-聚合”的物理归纳偏置里，是后续 Graph Network Simulator、Visual Interaction Networks 和很多学习型物理引擎的基础模板。

#### 🧪 练习题

```yaml
question: "Interaction Network 为什么能泛化到不同数量的对象？"
options:
  - "因为它固定只处理 6 个对象"
  - "因为关系模型和对象模型在所有边/节点上共享，并用求和聚合交互效应"
  - "因为它不使用对象属性"
  - "因为它只预测系统总能量"
answer: 1
explain: "共享的 f_R 和 f_O 学习局部规则，sum 聚合保证置换不变性，因此同一模型可应用到不同规模和拓扑的对象关系图。"
```
