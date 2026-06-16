### PySR — Python符号回归 (PySR)

```yaml
id: pysr
name: PySR
full_name: Python符号回归 (PySR)
year: '2023'
org: Miles Cranmer
paper_url: https://arxiv.org/abs/2305.01582
category: physics_discovery
parent: —
motivation: 进化算法提取物理表达式
```

#### 📝 一句话总结

PySR 是面向科学发现的高性能符号回归系统，用多种群进化搜索、表达式简化和常数优化在数据中发现简洁可解释的解析公式，并通过 Julia 后端 SymbolicRegression.jl 提供并行、可定制和可导生态接口。

#### 🎯 核心要点

- **表达式树搜索**：候选模型表示为由变量、常数、一元/二元算子组成的 expression tree
- **多种群进化**：维护多个独立“岛屿”种群异步演化，并周期性迁移优秀表达式以兼顾探索与利用
- **锦标赛选择**：随机抽取子集，按适应度以概率选择较优个体，再执行变异或交叉
- **evolve-simplify-optimize 循环**：先通过变异/交叉探索结构，再代数化简，再用 BFGS 等方法优化实数常数
- **年龄正则化**：替换最老表达式而非只替换最差表达式，降低早熟收敛风险
- **模拟退火**：高温阶段允许更多劣化变异以扩展搜索，低温阶段聚焦高适应度表达式
- **复杂度-Pareto 前沿**：按复杂度保留最优表达式，让用户在准确率与可解释性之间选择
- **科学场景适配**：支持自定义算子、自定义损失、约束、加权样本、噪声去除、特征选择和 SymPy/JAX/PyTorch 导出
- **EmpiricalBench**：论文引入科学经验公式基准，用历史经验定律和合成数据评估符号回归算法

#### 🔬 深入细节

##### 可访问来源与核心示意图

主要来源为论文 https://arxiv.org/abs/2305.01582、PDF https://arxiv.org/pdf/2305.01582、PySR 仓库 https://github.com/MilesCranmer/PySR，以及论文源码仓库 https://github.com/MilesCranmer/pysr_paper。算法循环图见论文 PDF 的 Figure 3/4；论文源码中也提供了对应的图源 `https://raw.githubusercontent.com/MilesCranmer/pysr_paper/main/src/static/pysr_diagram_v6.pdf`。

![PySR 论文快照](https://raw.githubusercontent.com/MilesCranmer/pysr_paper/main/html/abstract_snapshot.png)
*图：PySR 论文页面快照；算法级图示见 arXiv PDF 中的 Figure 3/4，分别描述内层 evolve-simplify-optimize 循环与多岛屿迁移。*

##### 算法伪代码

```python
# PySR 多种群符号回归伪代码
def pysr(X, y):
    populations = [random_expression_population(size=L) for _ in range(n_pop)]
    hall_of_fame = ParetoFront()  # 每个复杂度下的最佳表达式

    for outer_iter in range(n_iterations):
        parallel_for population in populations:
            # evolve: 多次锦标赛选择 + 变异/交叉
            for k in range(n_cycles):
                if rand() > p_crossover:
                    expr = tournament_select(population, X, y)
                    T = 1.0 - k / n_cycles
                    new_expr = mutate_with_annealing(expr, T)
                    replace_oldest(population, new_expr)
                else:
                    e1 = tournament_select(population, X, y)
                    e2 = tournament_select(population, X, y)
                    c1, c2 = crossover(e1, e2)
                    replace_oldest_two(population, c1, c2)

            # simplify + optimize constants
            for expr in population:
                expr = algebraic_simplify(expr)
                expr = optimize_constants(expr, X, y)  # 默认可用 BFGS
                hall_of_fame.update(expr, loss(expr, X, y), complexity(expr))

        # migration: 在岛屿间交换优秀表达式
        for population in populations:
            population.inject(sample_from(hall_of_fame), rate=alpha_H)
            population.inject(sample_from_other_islands(populations), rate=alpha_M)

    return hall_of_fame
```

##### 符号回归目标

给定数据 \(\{(\mathbf{x}_i,y_i)\}_{i=1}^{n}\)，符号回归希望找到一个解析表达式 \(E(\mathbf{x})\)，在误差小的同时保持简单。最基础的加权均方误差可写为：

$$
\mathcal{L}(E)=
\frac{1}{n}\sum_{i=1}^{n}
w_i\left(E(\mathbf{x}_i)-y_i\right)^2.
$$

但科学发现通常不只追求最低误差。一个表达式如果多出大量嵌套函数，只获得微小误差下降，往往不如稍粗糙但可解释的公式。PySR 因此维护复杂度 \(C(E)\) 与损失 \(\mathcal{L}(E)\) 的 Pareto front：

$$
\mathcal{P}=
\left\{
E:\nexists E'
\text{ such that }
C(E')\le C(E),\ 
\mathcal{L}(E')\le \mathcal{L}(E)
\right\}.
$$

默认复杂度通常是表达式树节点数，节点包括变量、常数和算子；但 PySR 允许用户自定义复杂度，使某些领域算子更便宜或更昂贵。这样可以把“什么公式更可解释”交给具体科学领域定义。

##### 表达式树与变异操作

PySR 的候选公式是一棵树。例如：

$$
E(x_0,x_1)=x_0^2+\cos(x_1)-2
$$

可以表示为根节点 \(+\)，左子树为 \(\operatorname{square}(x_0)\)，右子树为 \(\cos(x_1)-2\)。进化搜索通过局部修改树结构来探索公式空间。论文列出的主要变异包括：扰动常数、替换同元数算子、在根或叶子处追加节点、在中间插入节点、删除子树、化简树、生成全新树以及空操作。

对一次候选变异 \(E\rightarrow E^\*\)，模拟退火接受概率可概括为：

$$
q_{anneal}=
\exp\left(
-
\frac{\mathcal{L}(E^\*)-\mathcal{L}(E)}
{\alpha T}
\right),
$$

其中 \(T\in[0,1]\) 是退火温度，\(\alpha\) 控制温度尺度。当 \(T\) 高时，搜索更愿意接受较差但多样的新表达式；当 \(T\) 低时，搜索更偏向保留当前更优结构。

##### evolve-simplify-optimize 的意义

普通遗传编程主要依靠变异/交叉找到结构，但科学公式常含未知实数常数，例如 \(a\exp(-bt)+c\)。如果把常数也完全交给随机变异，搜索会非常慢。PySR 将结构搜索和连续常数优化分开：

1. evolve 阶段改变树结构，探索“公式长什么样”
2. simplify 阶段用代数规则减少冗余，如 \(x+0\rightarrow x\)
3. optimize 阶段固定结构，用数值优化器拟合常数

固定结构后的常数优化可写为：

$$
\mathbf{c}^\star=
\arg\min_{\mathbf{c}}
\frac{1}{n}\sum_{i=1}^{n}
\left(E(\mathbf{x}_i;\mathbf{c})-y_i\right)^2.
$$

这一步对物理发现很重要：真实经验公式往往结构简单但常数非平凡，例如比例系数、指数、偏置、归一化常数等。

##### 多种群与迁移

PySR 同时维护 \(n_p\) 个种群 \(P_1,\ldots,P_{n_p}\)。每个种群独立执行内层进化，相当于多个搜索岛屿并行探索不同区域。每轮外层循环后，系统从两个来源迁移表达式：

$$
H=\text{全局 hall-of-fame},\qquad
M_i=\text{第 }i\text{ 个种群的优秀表达式集合}.
$$

以概率 \(\alpha_H\) 从全局最优集合 \(H\) 注入表达式，以概率 \(\alpha_M\) 从其他岛屿的优秀表达式集合注入。这样既保留并行搜索的多样性，又能让局部发现扩散到其他种群继续改进。

##### 科学发现功能

PySR 的价值不只是“能跑遗传算法”。论文强调科学符号回归需要处理现实数据的复杂性：

- **噪声数据**：可先用 Gaussian process 去噪，核函数可包含 RBF、white-noise 和常数项：

$$
k(x,x')=
\sigma^2\exp\left(-\frac{\|x-x'\|^2}{2l^2}\right)
+\alpha\delta(x-x')+C.
$$

- **加权样本**：若样本测量不确定度为 \(\sigma_i\)，可令 \(w_i\propto 1/\sigma_i^2\)，降低高噪声样本影响
- **自定义损失**：用户可定义负对数似然、分类损失、隐式方程损失或带物理约束的目标
- **自定义算子**：领域函数如 Bessel 函数、特殊激活、聚合算子可作为普通一元/二元节点进入搜索
- **硬约束**：可限制表达式总大小、树深度、特定算子的子表达式复杂度，防止出现无意义嵌套
- **特征选择**：用梯度提升树先筛选重要变量，再交给符号搜索，缓解高维输入的组合爆炸

##### 与 SINDy 和黑箱模型的关系

SINDy 预先给定候选项字典 \(\Theta(X)\)，通过稀疏回归选择线性组合：

$$
\dot{X}=\Theta(X)\Xi.
$$

它在动力系统方程发现上非常高效，但搜索空间受候选库限制。PySR 则直接搜索表达式树，能组合出更灵活的非线性结构和领域算子；代价是搜索空间更大，需要进化启发式、并行种群和常数优化共同控制复杂度。

与神经网络黑箱回归相比，PySR 的输出是解析公式。黑箱模型可能获得更低插值误差，但公式模型更容易做量纲检查、极限分析、外推判断和理论解释。对 AI for Science 来说，这种“可读模型”往往比单纯预测精度更有价值。

#### 🧪 练习题

```yaml
question: "PySR 中 evolve-simplify-optimize 循环的核心目的是什么？"
options:
  - "只保留固定候选库中的线性项"
  - "先搜索表达式结构，再化简冗余形式，并对公式中的实数常数做连续优化"
  - "把所有表达式都转换成神经网络权重"
  - "强制每个候选公式具有相同复杂度"
answer: 1
explain: "PySR 将离散结构搜索和连续常数拟合分开处理，使复杂公式空间更可搜索，也更适合包含未知实数常数的科学经验公式。"
```
