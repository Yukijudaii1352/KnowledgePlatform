### AI Feynman — AI费曼 (AI Feynman)

```yaml
id: ai_feynman
name: AI Feynman
full_name: AI费曼 (AI Feynman)
year: '2020'
org: MIT
paper_url: https://www.science.org/doi/abs/10.1126/sciadv.aay2631
category: physics_discovery
parent: —
motivation: 物理对称性与递归分解发现公式
```

#### 📝 一句话总结

AI Feynman 提出一种物理启发的符号回归算法，用神经网络探测维度、对称性、可分性和变量变换，把高维公式发现递归拆成更低维、更易搜索的子问题。

#### 🎯 核心要点

- **目标任务**：给定输入变量表和函数值，自动恢复解析表达式，而不是只训练一个黑盒预测器
- **核心策略**：按模块依次尝试维度分析、低阶多项式拟合、暴力符号搜索、神经网络插值、对称性检测、可分性检测、变量相等化和函数变换
- **递归分解**：一旦发现平移/缩放对称性或加法/乘法可分性，就生成变量更少的新数据集，并把子问题重新送入完整算法
- **神经网络角色**：NN 不负责输出最终公式，而是作为高维平滑插值器，在未观测点测试隐藏结构
- **复杂度控制**：先用物理先验压缩搜索空间，再用短表达式优先的 brute-force 或多项式拟合求闭式解
- **基准结果**：在 Feynman Lectures 100 个方程上全部恢复；在更难的物理测试集上将当时公开工具的成功率从约 15% 提升到约 90%
- **主要局限**：依赖足够干净的数据、变量单位或可采样区间；若目标函数缺少可检测的对称性/可分性，仍会退化为昂贵符号搜索

#### 🔬 深入细节

##### 可访问来源与核心示意图

论文正式页面是 Science Advances: https://www.science.org/doi/abs/10.1126/sciadv.aay2631；可访问全文与图像可见于 arXiv/ar5iv: https://arxiv.org/abs/1905.11481 和 https://ar5iv.labs.arxiv.org/html/1905.11481；开源实现位于 https://github.com/SJ001/AI-Feynman。

![AI Feynman 总体递归流程](https://ar5iv.labs.arxiv.org/html/1905.11481/assets/x1.png)
*图：AI Feynman 不是单一搜索器，而是一组按顺序尝试的物理启发模块；多个模块会产生新的低维数据集并递归调用完整流程。*

![AI Feynman 发现引力公式示例](https://ar5iv.labs.arxiv.org/html/1905.11481/assets/x2.png)
*图：引力公式示例中，算法先做维度分析，再发现平移对称性与乘法可分性，最后用多项式拟合和倒数变换分别求解子表达式。*

##### 算法伪代码

```python
# AI Feynman 核心流程伪代码
def ai_feynman(data, variables, units=None):
    # data: rows of (x_1, ..., x_n, y)
    # variables: symbolic names for x_i

    if units is not None:
        reduced = dimensional_analysis(data, variables, units)
        solution = ai_feynman(reduced.data, reduced.variables, units=None)
        if solution is not None:
            return lift_dimensionless_solution(solution, reduced.transform)

    solution = fit_low_order_polynomial(data, variables)
    if solution is not None:
        return solution

    solution = brute_force_symbolic_search(data, variables)
    if solution is not None:
        return solution

    f_nn, validation_error = train_smooth_interpolator(data)

    symmetry = detect_translation_scaling_or_rotation_symmetry(f_nn, data)
    if symmetry is not None:
        reduced_data = apply_symmetry_reduction(f_nn, data, symmetry)
        solution = ai_feynman(reduced_data, reduced_variables(symmetry))
        if solution is not None:
            return undo_symmetry_reduction(solution, symmetry)

    split = detect_additive_or_multiplicative_separability(f_nn, data)
    if split is not None:
        data_a, data_b = build_separable_subproblems(f_nn, data, split)
        sol_a = ai_feynman(data_a, split.vars_a)
        sol_b = ai_feynman(data_b, split.vars_b)
        if sol_a is not None and sol_b is not None:
            return combine(sol_a, sol_b, split.kind)

    for pair in variable_pairs(variables):
        collapsed = set_variables_equal_and_divide_out(f_nn, data, pair)
        solution = ai_feynman(collapsed.data, collapsed.variables)
        if solution is not None:
            return undo_variable_equality(solution, collapsed.transform)

    for transform in [sqrt, square, log, exp, inverse, sin, cos, tan, asin, acos, atan]:
        transformed = transform_output_or_inputs(data, transform)
        solution = ai_feynman(transformed.data, transformed.variables)
        if solution is not None:
            return undo_transform(solution, transform)

    return None
```

##### 动机：符号回归难在哪里

符号回归要从有限数值样本中找到一个表达式 \(f(x_1,\ldots,x_n)\)。如果直接枚举表达式字符串，搜索空间会随长度指数增长；如果用遗传算法，也很容易在大量等价或近似表达式中消耗搜索预算。物理公式却常有额外结构：单位一致、低阶多项式片段、简单组合、平滑性、平移/缩放对称性、加法或乘法可分性。AI Feynman 的核心判断是：与其让搜索器盲目找公式，不如先把这些结构找出来，把原问题变小。

因此 AI Feynman 的输出仍然是解析公式，但它的主要创新不是一个新的神经符号网络，而是一个递归问题化简器。每次化简都减少变量数、降低表达式复杂度，或把一个高维公式分解成若干低维公式。最后求解器常常只需要处理单变量、多项式或短表达式。

##### 维度分析模块

如果变量带有物理单位，AI Feynman 先把有量纲问题转成无量纲问题。设第 \(i\) 个输入变量单位向量为 \(\mathbf{u}_i\)，目标变量单位为 \(\mathbf{b}\)。选择指数向量 \(\mathbf{p}\) 使

$$
M\mathbf{p}=\mathbf{b},
$$

其中 \(M=[\mathbf{u}_1,\ldots,\mathbf{u}_n]\)。再取 \(M\) 的零空间基 \(U\)，构造无量纲变量：

$$
y'=\frac{y}{\prod_i x_i^{p_i}}, \qquad
z_j=\prod_i x_i^{U_{ij}}.
$$

原问题 \(y=f(x_1,\ldots,x_n)\) 就变成 \(y'=g(z_1,\ldots,z_k)\)，其中 \(k\) 是零空间维度，通常小于原变量数。若 \(k=0\)，函数甚至可被压缩成一个常数因子；若 \(k\) 较小，后续符号搜索也显著容易。

##### 神经网络只做结构探测

论文中神经网络的作用很克制：训练一个平滑前馈网络 \(\hat f_\theta(x)\) 拟合数据，用它在任意输入点上查询函数值，从而检测数据表中没有直接出现的关系。比如要测试 \(x_i,x_j\) 是否只通过差值 \(x_i-x_j\) 影响输出，就需要比较大量形如

$$
\hat f_\theta(\ldots,x_i+\delta,\ldots,x_j+\delta,\ldots)
\quad \text{与} \quad
\hat f_\theta(\ldots,x_i,\ldots,x_j,\ldots)
$$

的值是否一致。如果一致，就可以把两个变量替换成一个差值变量，变量数减少 1。类似地，缩放对称性可把两个变量替换成比值；旋转对称性可把多个坐标替换成半径或内积类变量。

> 💡 关键：NN 在这里不是最终答案，也不需要可解释；它只是一个可微、可查询的函数代理，用来发现可解释的低维结构。

##### 可分性检测与递归求解

可分性是 AI Feynman 最能降低难度的模块。若函数满足乘法可分：

$$
f(\mathbf{x}_A,\mathbf{x}_B)=g(\mathbf{x}_A)h(\mathbf{x}_B),
$$

则对固定参考点 \((\mathbf{x}_A^0,\mathbf{x}_B^0)\)，有

$$
f(\mathbf{x}_A,\mathbf{x}_B)
\approx
\frac{f(\mathbf{x}_A,\mathbf{x}_B^0)f(\mathbf{x}_A^0,\mathbf{x}_B)}
{f(\mathbf{x}_A^0,\mathbf{x}_B^0)}.
$$

若函数满足加法可分：

$$
f(\mathbf{x}_A,\mathbf{x}_B)=g(\mathbf{x}_A)+h(\mathbf{x}_B),
$$

则有

$$
f(\mathbf{x}_A,\mathbf{x}_B)
\approx
f(\mathbf{x}_A,\mathbf{x}_B^0)
+f(\mathbf{x}_A^0,\mathbf{x}_B)
-f(\mathbf{x}_A^0,\mathbf{x}_B^0).
$$

检测通过后，算法不再搜索 \(n\) 变量表达式，而是构造两个低维子数据集，分别求 \(g\) 和 \(h\)。递归求解成功后再把子表达式相乘或相加。引力公式示例中，维度分析和对称性先把距离项压缩，随后乘法可分把质量因子和距离因子拆开，使两个子问题都能被简单拟合解决。

##### 多项式、暴力搜索与变换

AI Feynman 保留了传统符号回归组件，但把它们放在更适合的位置使用。低阶多项式拟合通过线性最小二乘直接求系数，适合 \(x^2+y^2\)、动能项、某些变换后的表达式。暴力搜索按表达式复杂度从小到大枚举语法合法的逆波兰表示，并用最小描述长度偏好短而精确的公式：

$$
\mathrm{score}(s)
=
\mathrm{complexity}(s)
+ \lambda \log \mathrm{error}(s).
$$

如果直接搜索失败，算法还会尝试对目标值或输入做 \(\log,\exp,\sqrt{\cdot},(\cdot)^2,1/(\cdot),\sin,\cos,\tan\) 等变换。例如一个根号距离公式在平方后可能变成低阶多项式，一个指数公式在取对数后可能变成线性或多项式。

##### 与传统符号回归的区别

| 维度 | 遗传/暴力符号回归 | AI Feynman |
|------|-------------------|------------|
| 搜索对象 | 原始高维表达式 | 递归化简后的低维子表达式 |
| 神经网络用途 | 通常直接拟合或生成表达式 | 只作为结构探测的插值器 |
| 物理先验 | 通常弱或需人工给定字典 | 显式使用单位、对称性、可分性和变量变换 |
| 复杂度控制 | 靠表达式长度和误差筛选 | 先降维/分解，再搜索 |
| 适用场景 | 通用但搜索昂贵 | 对物理型、结构化函数特别高效 |

AI Feynman 的思想与科学发现流程很接近：先问“这个量纲是否允许简化”“这些变量是否只通过差值或比值进入”“公式是否能拆成两个独立部分”，再做代数搜索。它不能保证解决任意函数，但对物理公式这种高度结构化目标，递归化简会把看似不可搜索的问题变成一串可处理的小问题。

#### 🧪 练习题

```yaml
question: "AI Feynman 中神经网络的主要作用是什么？"
options:
  - "直接生成最终的符号表达式并替代符号搜索"
  - "作为平滑插值器，在未观测点测试对称性、可分性等隐藏结构"
  - "把所有变量映射到固定维度的潜空间后做分类"
  - "用强化学习选择下一个数学符号"
answer: 1
explain: "AI Feynman 的最终答案仍由多项式拟合、暴力搜索或递归组合得到；神经网络主要用于查询函数代理，从而发现可降维的物理结构。"
```
