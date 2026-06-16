### FlowER — 电子再分配流匹配模型

```yaml
id: flower
name: FlowER
full_name: 电子再分配流匹配模型 (FlowER)
year: '2025.09'
org: MIT
paper_url: https://news.mit.edu/2025/system-developed-mit-realistic-predictions-chemical-reactions-0903
category: reaction
parent: molecular_transformer
motivation: 引入质量守恒和电子守恒约束，防止化学幻觉
```

#### 📝 一句话总结

FlowER 将反应预测从“生成产物字符串”改写为“在固定原子集合上生成电子再分配轨迹”，用 Bond-Electron 矩阵和条件流匹配同时约束质量守恒与电子守恒。它解决了 Molecular Transformer、Graph2SMILES 等序列模型容易凭空增删原子或电子的化学幻觉问题，并能递归生成可解释的机理步骤。

#### 🎯 核心要点

- 反应状态用 Ugi Bond-Electron (BE) 矩阵表示：原子身份固定，矩阵条目记录孤对电子与成键电子，因此生成过程中不会改变原子集合
- 生成目标不是直接输出 SMILES，而是预测 \(\Delta B = B_{\text{product}} - B_{\text{reactant}}\) 的电子流速度场
- 条件流匹配把反应建模为 \(t=0\) 反应物电子分布到 \(t=1\) 产物电子分布的连续传输路径
- 主干为图 Transformer：输入 BE 矩阵、原子特征和伪时间 \(t\)，输出孤对电子与成键电子的变化量
- 通过对称、零和噪声与零和输出投影保证电子总数守恒；后处理用 sum-safe rounding 将连续电子数离散化且不改变总电子数
- 递归生成 elementary step，重复采样可得到分支机理、潜在副产物和不同反应条件下的路径
- 训练数据由约 110 万 USPTO-Full 专利反应经 1,220 个专家模板补全机理，形成 252 个反应类别、约 140 万 elementary steps
- 可追溯论文为 arXiv:2502.12979 与 Nature 2025；worker 给出的 MIT 新闻页是二级报道

#### 🔬 深入细节

![FlowER 框架示意图](https://arxiv.org/html/2502.12979v1/x1.png)
*图：FlowER 的核心表示与模型流程。反应被表示为 BE 矩阵上的电子再分配；图 Transformer 在任意伪时间点预测电子流变化，并约束孤对电子与成键电子变化总和为 0。*

##### 算法伪代码

```python
# FlowER: electron redistribution with conditional flow matching
def train_flower(mechanistic_steps):
    for reactant, product, atom_features in mechanistic_steps:
        B0 = bond_electron_matrix(reactant)       # fixed atoms, reactant electrons
        B1 = bond_electron_matrix(product)        # same atoms, product electrons
        eps = symmetric_zero_sum_noise(B0.shape)
        t = uniform(0.0, 1.0)

        x_t = (1 - t) * B0 + t * B1 + sigma(t) * eps
        target_velocity = B1 - B0

        pred_velocity = graph_transformer(x_t, atom_features, t)
        pred_velocity = project_symmetric_zero_sum(pred_velocity)
        loss = mse(pred_velocity, target_velocity)
        update(loss)

def sample_mechanism(reactants, atom_features, max_steps, dt):
    B = bond_electron_matrix(reactants)
    pathway = []
    for _ in range(max_steps):
        x = B + symmetric_zero_sum_noise(B.shape)
        for t in arange(0.0, 1.0, dt):
            v = graph_transformer(x, atom_features, t)
            x = x + dt * project_symmetric_zero_sum(v)

        B_next = sum_safe_round(x)
        pathway.append(B_next)
        if is_stable_product(B_next):
            break
        B = B_next
    return pathway
```

##### 关键公式

设 \(B_0\) 是反应物 BE 矩阵，\(B_1\) 是目标 elementary step 后的 BE 矩阵。FlowER 使用线性条件路径加零和对称噪声构造训练样本：

$$
x_t = (1-t)B_0 + tB_1 + \sigma(t)\epsilon,\quad
\epsilon=\epsilon^\top,\quad \sum_{i \le j}\epsilon_{ij}=0
$$

在该路径下，条件向量场的核心监督信号可写成电子矩阵差：

$$
u_t(x\mid z) \approx B_1 - B_0 = \Delta B
$$

条件流匹配损失为：

$$
\mathcal{L}_{\mathrm{CFM}}(\theta)
= \mathbb{E}_{t,z,x_t}
\left\|v_\theta(t, x_t, A) - u_t(x_t\mid z)\right\|_2^2
$$

其中 \(A\) 是原子特征，\(v_\theta\) 是图 Transformer 预测的电子速度场。守恒约束通过两个位置进入模型：采样噪声满足零和，预测速度也被投影到零和空间：

$$
\sum_{i \le j}\Delta B_{ij}=0
$$

这意味着模型可以移动电子，但不能创建或删除电子；原子身份固定则意味着质量守恒。

##### 方法机制解释

传统反应预测把反应物和试剂编码成 SMILES 序列，然后自回归生成产物序列。这个设计的弱点是“语法正确”并不等于“物理守恒”：模型只要在 token 空间中犯错，就可能漏掉一个氢、凭空多出一个重原子，或者生成无法配平的产物。FlowER 的关键改变是把输出空间换成 BE 矩阵空间，生成动作只是在固定原子集合之间重新分配电子。

BE 矩阵提供了类似箭推机理的可解释中间表示。对角线可理解为原子局部电子状态，非对角线描述原子对之间的成键电子；一次 elementary step 就是矩阵中若干条目的增减。模型输出不再是“产物长什么样”，而是“哪些孤对电子减少、哪些键电子增加或减少”，这与有机化学中的亲核进攻、离去基团离去、质子转移等机理语言直接对应。

流匹配部分负责把离散的电子重排转化为连续生成问题。训练时，模型在任意 \(t\) 时刻看到一个介于反应物和产物之间的带噪 BE 矩阵，学习指向产物 BE 矩阵的速度；推理时，从带噪反应物状态出发，用 Euler 等 ODE 积分器沿着学到的速度场前进。由于重复采样的噪声不同，同一组反应物可以生成不同产物或不同中间路径，适合描述副反应和条件依赖。

与 Molecular Transformer 的主要区别在于约束位置不同：Transformer 序列模型把守恒性留给数据统计规律去“学会”，而 FlowER 把守恒性嵌入表示和生成空间。论文报道 Graph2SMILES 即使在配平的机理数据上训练，仍经常违反重原子、质子或电子守恒；FlowER 则通过 BE 矩阵结构天然满足这些守恒约束，剩下主要学习的是“哪一种电子迁移在化学上合理”。

> 💡 关键：FlowER 的创新不是简单加一个守恒惩罚项，而是把反应预测的坐标系换成守恒坐标系；无效产物不再只是低概率事件，而是在表示层面被排除。

#### 🧪 练习题

```yaml
question: "FlowER 为什么能避免序列反应模型中常见的质量守恒幻觉？"
options:
  - "因为它在 SMILES 生成后用规则删除非法 token"
  - "因为它固定反应原子集合，并只在 BE 矩阵上预测零和电子再分配"
  - "因为它完全不用神经网络，只使用专家反应模板"
  - "因为它只预测单一最终产物，不生成中间体"
answer: 1
explain: "FlowER 的状态空间固定原子身份，生成动作是 BE 矩阵中的电子迁移，并约束电子变化总和为 0，因此模型不能凭空创建或删除原子与电子。"
```
