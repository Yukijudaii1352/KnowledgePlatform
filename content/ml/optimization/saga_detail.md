### SAGA

```yaml
id: saga
name: SAGA
full_name: 支持非强凸复合目标的快速增量梯度法 (SAGA)
year: '2014'
org: INRIA / ENS
paper_url: https://arxiv.org/abs/1407.0202
category: stochastic
parent: svrg
motivation: 无偏梯度估计，支持近端算子
```

#### 📝 一句话总结
SAGA 是一种表格型方差缩减方法：它通过维护每个样本分量的历史梯度，构造对全梯度的无偏估计，在保持线性收敛的同时原生支持近端算子和非强凸复合目标。相比 SAG 与 SVRG，它最大的优点是“无偏 + 支持 prox + 不需要外层全梯度快照”。

#### 🎯 核心要点
- 维护每个样本分量 \(f_i\) 的历史梯度表，以及它们的平均值，形成“表格型”方差缩减。
- 核心无偏估计器为 \(f'_j(x^k)-f'_j(\phi_j^k)+\frac{1}{n}\sum_i f'_i(\phi_i^k)\)，期望恰好等于全梯度。
- 原生支持复合目标 \(\min_x \frac1n\sum_i f_i(x)+h(x)\)，可直接接近端算子 \(\mathrm{prox}_{\gamma h}\)。
- 强凸情形下可用 \(\gamma=\frac{1}{2(\mu n+L)}\) 获得线性收敛，复杂度为 \(O((n+L/\mu)\log(1/\varepsilon))\)。
- 非强凸情形下用 \(\gamma=\frac{1}{3L}\) 可得到 \(O(n/k)\) 的函数值收敛，无需外层快照循环。
- 从方法结构上看，SAGA 处在 SAG 与 SVRG 的中间：既保留了增量存储结构，又保留了无偏控制变量估计。

#### 🔬 深入细节
![SAGA 算法流程示意图](https://quickchart.io/graphviz?graph=digraph%7Brankdir%3DLR%3B%20node%20%5Bshape%3Dbox%2C%20style%3Drounded%5D%3B%20A%5Blabel%3D%22Sample%20j%22%5D%3B%20B%5Blabel%3D%22Current%20gradient%20g_j%28x_k%29%22%5D%3B%20C%5Blabel%3D%22Stored%20gradient%20g_j%28phi_j%29%22%5D%3B%20E%5Blabel%3D%22Average%20stored%20gradient%22%5D%3B%20D%5Blabel%3D%22Variance-reduced%20estimator%0Ag_j%28x_k%29-g_j%28phi_j%29%2Bavg%22%5D%3B%20F%5Blabel%3D%22Prox%20%2F%20gradient%20step%22%5D%3B%20G%5Blabel%3D%22Update%20x_%7Bk%2B1%7D%22%5D%3B%20H%5Blabel%3D%22Replace%20table%20entry%20phi_j%20%3C-%20x_k%22%5D%3B%20A-%3EB%3B%20C-%3ED%3B%20B-%3ED%3B%20E-%3ED%3B%20D-%3EF%3B%20F-%3EG%3B%20G-%3EH%3B%7D)
*图：根据论文 Section 2 的更新公式整理的 SAGA 主流程。其本质是用一份“历史梯度表”构造对全梯度的低方差、无偏近似。*

```python
# SAGA
initialize x = x0
initialize phi[i] = x0 for all i
initialize table[i] = grad_i(phi[i]) for all i
g_bar = average(table)

for k in range(K):
    j = sample_uniform(0, n - 1)
    grad_new = grad_j(x)
    grad_old = table[j]

    direction = grad_new - grad_old + g_bar
    w = x - gamma * direction
    x = prox_gamma_h(w)

    table[j] = grad_new
    phi[j] = x
    g_bar = g_bar + (grad_new - grad_old) / n
```

SAGA 要解决的是有限和优化里的经典问题：
$$
\min_{x\in\mathbb{R}^d} F(x)=\frac{1}{n}\sum_{i=1}^n f_i(x)+h(x),
$$
其中每个 \(f_i\) 是光滑凸函数，而 \(h(x)\) 可以是 \(\ell_1\) 正则这类可做 proximal 的非光滑项。普通 SGD 的问题在于：单样本梯度虽然便宜，但方差在靠近最优解时也不自动消失，因此通常必须把步长逐渐降到 0，难以获得线性收敛。

SAGA 的核心构造是控制变量估计器。论文把它放在一个更一般的框架里：若 \(X\) 是当前随机梯度样本，\(Y\) 是与之高度相关的旧梯度样本，则
$$
\theta_\alpha=\alpha(X-Y)+\mathbb{E}[Y]
$$
可以显著降低方差。SAG 采用的是带偏版本，等价于较小的 \(\alpha\)；SAGA 则直接取无偏形式 \(\alpha=1\)。于是当随机抽到索引 \(j\) 时，SAGA 使用
$$
v_k=f'_j(x^k)-f'_j(\phi_j^k)+\frac{1}{n}\sum_{i=1}^n f'_i(\phi_i^k),
$$
并且
$$
\mathbb{E}_j[v_k] = \frac{1}{n}\sum_{i=1}^n f'_i(x^k)=\nabla f(x^k).
$$
这就是它相较 SAG 最重要的理论优势：方向估计无偏，证明更干净，同时常数更好。

有了这个无偏低方差方向后，SAGA 的更新就很自然了：
$$
w^{k+1}=x^k-\gamma v_k,\qquad
x^{k+1}=\operatorname{prox}_{\gamma h}(w^{k+1}),
$$
其中 proximal 算子定义为
$$
\operatorname{prox}_{\gamma h}(y)=\arg\min_x\left\{h(x)+\frac{1}{2\gamma}\|x-y\|^2\right\}.
$$
这一步非常关键，因为它让 SAGA 天然兼容复合优化，而不必像一些早期方差缩减算法那样只能处理纯光滑目标。与此同时，梯度表只更新被采样到的一个分量，因此每步的随机梯度开销仍然是常数级。

在线性收敛方面，论文给出的强凸结果是：当 \(f=\frac1n\sum_i f_i\) 为 \(\mu\)-强凸、每个 \(f_i\) 为 \(L\)-光滑时，取
$$
\gamma=\frac{1}{2(\mu n+L)},
$$
即可得到
$$
\mathbb{E}\|x^k-x^\*\|^2 \le
\left(1-\frac{\mu}{2(\mu n+L)}\right)^k \cdot C,
$$
从而总复杂度为
$$
O\!\left(\left(n+\frac{L}{\mu}\right)\log\frac{1}{\varepsilon}\right).
$$
对非强凸目标，论文又证明取 \(\gamma=\frac{1}{3L}\) 时，平均迭代点满足 \(O(n/k)\) 收敛。更有意思的是，如果问题实际上带有隐含强凸性，SAGA 在这个非强凸步长下还能“自动适应”到线性收敛，这也是图 1 中论文强调的一个差异点。

> 💡 关键：SAGA 的真正创新不是“存梯度表”本身，而是把这个梯度表用成了一个无偏控制变量，从而同时拿到低方差、prox 支持和较干净的收敛理论。

> ⚠️ 注意：SAGA 与 SVRG 的主要取舍是“空间换时间”。SAGA 不需要周期性全梯度快照，但要维护一张梯度表；SVRG 则反过来，用更少存储换取周期性的全梯度计算。

#### 🧪 练习题
```yaml
question: "为什么说 SAGA 的方向估计比 SAG 更适合做理论分析？"
options:
  - "因为 SAGA 每一步都精确计算全梯度"
  - "因为 SAGA 的方向估计是无偏的，而 SAG 的对应估计带偏"
  - "因为 SAGA 不需要保存任何历史梯度"
  - "因为 SAGA 只能处理强凸问题"
answer: 1
explain: "SAGA 的更新方向对全梯度是无偏估计，这让收敛证明显著简化；SAG 的方向估计带偏，因此理论分析更复杂，也不易直接推广到 prox 情形。"
```
