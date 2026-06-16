### DeepONet — 深度算子网络 (Deep Operator Network)

```yaml
id: deeponet
name: DeepONet
full_name: 深度算子网络 (Deep Operator Network)
year: '2021'
org: 宾大
paper_url: https://www.nature.com/articles/s42256-021-00302-5
category: pde_solving
parent: —
motivation: 双分支架构学习函数空间映射
```

#### 📝 一句话总结

DeepONet 将算子近似写成“输入函数编码”和“输出位置编码”的内积：branch net 编码传感器上的输入函数值，trunk net 编码查询坐标 \(y\)，从而把通用算子逼近定理落到可训练的深度网络架构中。

#### 🎯 核心要点

- **算子输入离散化**：用固定传感器位置 \(x_1,\dots,x_m\) 上的函数值 \([u(x_1),\dots,u(x_m)]\) 表示输入函数 \(u\)
- **双分支结构**：branch net 处理输入函数采样值，trunk net 处理输出函数的查询位置 \(y\)，二者输出同维向量后做点积
- **连续输出查询**：训练后可在任意输出位置 \(y\) 评估 \(\mathcal{G}(u)(y)\)，不要求所有输出点落在固定规则网格上
- **stacked 与 unstacked 版本**：stacked DeepONet 使用多个并行 branch nets，unstacked DeepONet 用一个 branch net 一次性输出全部系数，计算和存储更高效
- **核心公式**：\(\mathcal{G}_\theta(u)(y)=\sum_{k=1}^{p} b_k(u(x_1),...,u(x_m))\,t_k(y)+b_0\)
- **理论来源**：基于非线性连续算子的通用逼近定理，并扩展到深层 branch/trunk 子网络
- **代表任务**：antiderivative operator、非线性 ODE/重力摆、带源项扩散-反应 PDE 等，论文系统考察传感器数量、数据量、网络宽度和输入函数空间复杂度对误差的影响

#### 🔬 深入细节

##### 可访问来源与核心示意图

任务给出的 Nature Machine Intelligence 链接是正式发表版本；为了获得可直接嵌入的图示和公式上下文，这里参考作者公开 arXiv/html 版本：https://ar5iv.labs.arxiv.org/html/1910.03193，以及论文代码仓库：https://github.com/lululxvi/deeponet。

![DeepONet 问题设置、stacked 与 unstacked 架构](https://ar5iv.labs.arxiv.org/html/1910.03193/assets/x1.png)
*图：DeepONet 的输入由函数传感器值和查询位置组成；stacked 版本包含多个 branch nets，unstacked 版本用一个 branch net 输出全部系数。*

##### 算法伪代码

```python
# Unstacked DeepONet 训练伪代码

def deeponet_forward(sensor_values, y):
    """
    sensor_values: [batch, m]，输入函数 u 在固定传感器 x_1...x_m 的取值
    y:             [batch, d_y]，输出函数的查询坐标
    """
    b = branch_net(sensor_values)     # [batch, p]
    t = trunk_net(y)                  # [batch, p]
    out = sum(b * t, axis=-1) + bias  # G_theta(u)(y)
    return out

for batch in dataloader:
    # 每条样本可来自同一个输入函数 u 的多个输出查询点 y
    sensor_values = batch["u_at_sensors"]
    query_y = batch["query_location"]
    target = batch["G_u_at_y"]

    pred = deeponet_forward(sensor_values, query_y)
    loss = mean((pred - target) ** 2)
    optimizer.step(loss)

# 推理时固定一个输入函数 u，只改变 y，就能连续查询整条输出函数
sensor_values = evaluate_input_function(u_new, sensors)
solution_curve = [deeponet_forward(sensor_values, y) for y in query_grid]
```

##### 从通用逼近定理到网络结构

DeepONet 的起点是算子学习：给定一个非线性连续算子

$$
\mathcal{G}: u \mapsto \mathcal{G}(u),
$$

希望对任意输入函数 \(u\) 和任意输出位置 \(y\)，预测标量或向量值 \(\mathcal{G}(u)(y)\)。由于神经网络无法直接接收无限维函数，论文采用传感器离散化：

$$
u \quad \longrightarrow \quad
\left[u(x_1),u(x_2),\dots,u(x_m)\right].
$$

通用算子逼近定理表明，在合适紧集和连续性条件下，可以用有限个“输入函数相关系数”和“输出位置相关基函数”的组合逼近 \(\mathcal{G}(u)(y)\)。DeepONet 把这个结构参数化为：

$$
\mathcal{G}_\theta(u)(y)
=
\sum_{k=1}^{p}
b_k\left(u(x_1),\dots,u(x_m)\right)
t_k(y)
b_0.
$$

这里 \(b_k\) 由 branch net 输出，表示“这个输入函数激活了哪些算子基”；\(t_k(y)\) 由 trunk net 输出，表示“在查询位置 \(y\) 上这些基函数取什么值”。二者内积就是预测。

##### Branch net 与 trunk net 的分工

Branch net 的输入维度固定为传感器数量 \(m\)，它不关心输出位置。它的工作类似于把整条输入函数压缩成一组系数：

$$
\mathbf{b}(u)=
\left[
b_1(u),\dots,b_p(u)
\right].
$$

Trunk net 的输入是输出坐标 \(y\)，它不关心当前是哪一个输入函数。它产生位置相关的表示：

$$
\mathbf{t}(y)=
\left[
t_1(y),\dots,t_p(y)
\right].
$$

最终输出为：

$$
\mathcal{G}_\theta(u)(y)
=
\mathbf{b}(u)^\top \mathbf{t}(y)+b_0.
$$

这种分解非常像低秩函数展开，但系数和基函数都由深度网络学习，而且可以表示非线性算子。它的优势是把“函数身份”和“空间/时间位置”分开建模，因此同一个输入函数可对应多个输出查询点，同一个 trunk net 也可服务不同输入函数。

##### stacked 与 unstacked DeepONet

论文从定理结构出发提出 stacked DeepONet：每个输出通道 \(b_k\) 可以由一个独立 branch net 产生，所有 branch nets 与同一个 trunk net 相乘求和。这样最贴近理论表达，但当 \(p\) 较大时计算和显存都很重。

Unstacked DeepONet 将多个 branch nets 合并为一个网络，一次性输出向量 \(\mathbf{b}\)。实践中 \(p\) 往往至少几十，因此 unstacked 版本更常用。论文实验中也观察到 unstacked DeepONet 通常具有更小的泛化误差和更稳定的训练表现。

> 💡 关键：DeepONet 的点积不是简单的 late fusion 技巧，而是把算子近似写成“输入函数决定展开系数、输出坐标决定基函数值”的结构化归纳偏置。

##### 数据组织方式

DeepONet 对训练数据的要求比图像到图像模型宽松。对每个输入函数 \(u_i\)，传感器位置 \(x_1,\dots,x_m\) 要保持一致，使 branch net 的输入维度稳定；但输出查询点 \(y_{ij}\) 不必固定，也不必是规则网格。训练样本可以写成：

$$
\left(
\left[u_i(x_1),\dots,u_i(x_m)\right],
y_{ij},
\mathcal{G}(u_i)(y_{ij})
\right).
$$

这让 DeepONet 很适合处理 scattered observations、不同空间点上的 PDE 解查询、或者时间连续动力系统输出。对一个输入函数 \(u_i\)，采样更多 \(y_{ij}\) 会增加该函数的输出监督密度；采样更多不同 \(u_i\) 则提升对输入函数分布的覆盖。

##### 与 FNN/CNN 直接拼接的区别

一种朴素做法是把 \([u(x_1),...,u(x_m),y]\) 直接拼接后送入普通 FNN。论文指出，这样虽然理论上也可能近似目标函数，但没有利用算子结构，泛化误差往往更大。

DeepONet 的结构把问题拆成两个子问题：branch net 学“输入函数属于什么样的 forcing/initial condition/parameter field”，trunk net 学“输出位置上的响应模式”。这种分工使模型对不同 \(y\) 的共享更强，也使同一输入函数的多个查询点能共同约束一组 branch 系数。

| 方法 | 输入表示 | 输出位置处理 | 适用限制 |
|------|----------|--------------|----------|
| FNN 直接拼接 | \([u(x_1),...,u(x_m),y]\) | 与函数值混在一起建模 | 归纳偏置弱，泛化通常较差 |
| CNN image-to-image | 规则网格数组 | 固定输出网格 | 难处理 scattered sensors 和任意查询点 |
| DeepONet | branch 编码函数，trunk 编码位置 | 任意 \(y\) 连续查询 | 传感器数量和位置设计会影响精度 |

##### 误差来源与传感器数量

DeepONet 的误差可以从三方面理解。第一是输入函数离散化误差：传感器太少时，\([u(x_i)]\) 无法充分代表复杂函数。第二是网络近似和优化误差：branch/trunk 宽度、深度和训练超参数会限制可表达性。第三是泛化误差：训练函数样本数量不足时，新函数上的预测会不稳定。

论文系统研究了传感器数 \(m\)、训练样本数和输入函数空间复杂度。直觉上，输入函数越高频、越粗糙，固定传感器越难捕获其形状，因此需要更大的 \(m\)。这也是 DeepONet 与 FNO 的一个实际差异：DeepONet 的输入端依赖传感器设计，而 FNO 更偏向规则网格上的全场频域表示。

##### PDE 示例：扩散-反应系统

论文的 PDE 示例之一是带源项的扩散-反应系统，目标是学习从源项函数 \(u(x,t)\) 到 PDE 解 \(s(x,t)\) 的算子：

$$
\mathcal{G}: u(x,t)\mapsto s(x,t).
$$

训练时先用有限差分求解器在 \(100\times 100\) 网格上生成参考解，再从每个输入源项对应的输出解中抽取若干随机查询点作为监督。DeepONet 不需要把整张 \(100\times 100\) 解场一次性作为输出；每个训练样本只需一个或多个查询点 \((x,t)\) 和对应的解值。这种数据组织方式解释了它为什么适合不规则观测和多查询推理。

> ⚠️ 注意：DeepONet 本身不自动保证 PDE 残差为零。若训练数据来自高精度数值解，它学习的是数据驱动的解算子；若要显式加入物理约束，需要使用 physics-informed DeepONet 等后续变体。

#### 🧪 练习题

```yaml
question: "标准 DeepONet 中 branch net 和 trunk net 分别负责什么？"
options:
  - "branch net 编码输入函数的传感器值，trunk net 编码输出查询位置"
  - "branch net 计算 PDE 残差，trunk net 计算边界条件误差"
  - "branch net 只处理时间维度，trunk net 只处理频率维度"
  - "branch net 是优化器，trunk net 是数值求解器"
answer: 0
explain: "DeepONet 的核心结构是 branch net 输出输入函数相关系数，trunk net 输出位置相关基函数值，二者点积得到 G(u)(y)。"
```
