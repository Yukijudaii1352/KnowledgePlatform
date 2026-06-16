### DeepONet

```yaml
id: deeponet
name: DeepONet
full_name: 深度算子网络 (Deep Operator Network)
year: '2021'
org: Brown University
paper_url: https://www.nature.com/articles/s42256-021-00302-5
category: neural_operator
parent: —
motivation: Branch-Trunk双网络通用算子学习
```

#### 📝 一句话总结

DeepONet 提出了 Branch Net 编码输入函数、Trunk Net 编码输出查询位置的双网络结构，用可训练基函数展开学习非线性算子 \(G:u\mapsto G(u)\)，解决了从离散观测直接泛化到函数到函数映射的问题。

#### 🎯 核心要点

- **学习对象是算子**：目标不是普通函数 \(f(x)\)，而是输入函数 \(u\) 到输出函数 \(G(u)\) 的映射
- **Branch-Trunk 双网络**：Branch Net 输入固定 sensor 上的函数值 \([u(x_1),\ldots,u(x_m)]\)，Trunk Net 输入输出位置 \(y\)
- **内积式输出**：通过 \(\sum_{k=1}^p b_k(u)t_k(y)\) 合成 \(\hat{G}(u)(y)\)，可理解为“输入相关系数 + 位置相关基函数”
- **Stacked 与 Unstacked 两版**：stacked DeepONet 使用 \(p\) 个 branch nets；unstacked DeepONet 用一个 branch net 输出 \(p\) 维系数，参数更少且泛化更好
- **mesh-free 输出查询**：训练数据只要求输入函数使用同一组 sensors，输出函数可在任意位置 \(y\) 采样
- **理论来源清晰**：结构受非线性算子通用逼近定理启发，并把浅层定理扩展为更易训练的深层网络
- **训练目标简单**：用输入函数样本、查询点和真实输出值组成 triples，以均方误差监督
- **应用覆盖广**：论文展示了积分、分数阶 Laplacian、ODE/PDE 解算子、确定性与随机动力系统等多类显式和隐式算子

#### 🔬 深入细节

##### 架构示意

![DeepONet 架构示意](https://media.springernature.com/m312/springer-static/image/art%3A10.1038%2Fs42256-021-00302-5/MediaObjects/42256_2021_302_Fig1_HTML.png)
*图：Nature Machine Intelligence 论文 Fig. 1，展示输入/输出函数设定、training data、stacked DeepONet 与 unstacked DeepONet。*

![DeepONet arXiv 版架构图](https://ar5iv.labs.arxiv.org/html/1910.03193/assets/x1.png)
*图：arXiv 早期版本的 Fig. 1，可更清楚地看到 Branch Net 输出系数 \(b_k\)、Trunk Net 输出基函数 \(t_k\) 后做逐项乘积求和。*

##### 核心算法伪代码

```python
# DeepONet 训练流程
def train_deeponet(dataset, sensors):
    # dataset: [(u_values_at_sensors, y_query, target_value), ...]
    branch = BranchNet(input_dim=len(sensors), output_dim=p)
    trunk = TrunkNet(input_dim=dim_y, output_dim=p)
    bias = learnable_scalar()

    for batch in dataloader(dataset):
        u_sensor, y, target = batch
        b = branch(u_sensor)        # (batch, p), coefficients depending on input function u
        t = trunk(y)                # (batch, p), basis values depending on output coordinate y
        pred = (b * t).sum(dim=-1) + bias

        loss = mean_squared_error(pred, target)
        loss.backward()
        optimizer.step()
        optimizer.zero_grad()

    return branch, trunk, bias
```

##### 问题设定：从函数学习函数

普通监督学习通常拟合有限维映射 \(f:\mathbb{R}^d\to\mathbb{R}^q\)。科学计算中的许多问题更自然地表示为算子：给定一个输入函数 \(u(x)\)，输出另一个函数 \(s(y)=G(u)(y)\)。例如，\(u\) 可以是初始条件、边界条件、源项、介质系数或随机激励，\(G(u)\) 可以是 ODE/PDE 的解函数。

DeepONet 的训练样本不是完整连续函数，而是三元组：

$$
\left([u_i(x_1),\ldots,u_i(x_m)],\; y_{ij},\; G(u_i)(y_{ij})\right)
$$

其中 \(x_1,\ldots,x_m\) 是固定 sensors，用来离散表示输入函数；\(y_{ij}\) 是输出函数的查询点，可以是不规则、非网格、每个样本不同的位置。这一点使 DeepONet 和把函数当图像处理的 CNN 方法明显不同。

##### Branch-Trunk 公式

DeepONet 的核心公式非常紧凑。Branch Net 读取输入函数在 sensors 上的值并输出 \(p\) 个系数，Trunk Net 读取查询点并输出 \(p\) 个基函数值：

$$
b(u)=\left[b_1(u),\ldots,b_p(u)\right]
$$

$$
t(y)=\left[t_1(y),\ldots,t_p(y)\right]
$$

最终预测为二者内积加偏置：

$$
\hat{G}_{\theta}(u)(y)
= \sum_{k=1}^{p} b_k\left(u(x_1),\ldots,u(x_m)\right)t_k(y) + b_0
$$

直觉上，Trunk Net 学到一组全局共享的“输出空间基函数”，Branch Net 根据输入函数 \(u\) 预测这些基函数的组合系数。与固定 Fourier/多项式基不同，\(t_k(y)\) 本身也是从数据中学出来的，因而能适应非线性动力系统的解空间。

##### 损失函数与训练数据

训练目标是对所有采样三元组最小化均方误差：

$$
\min_{\theta}
\frac{1}{N}\sum_{i=1}^{n}\sum_{j=1}^{q_i}
\left|
\hat{G}_{\theta}(u_i)(y_{ij}) - G(u_i)(y_{ij})
\right|^2
$$

这里 \(q_i\) 是第 \(i\) 个输入函数对应的输出查询点数量。一个输入函数可以搭配多个 \(y\) 产生多条训练样本，因此模型学习的不是固定网格上的输出向量，而是可被任意查询的连续输出函数。

##### Stacked 与 Unstacked DeepONet

论文从算子通用逼近定理得到 stacked 结构：一个 trunk net 输出 \(t_1,\ldots,t_p\)，并行的 \(p\) 个 branch nets 分别输出 \(b_1,\ldots,b_p\)。这和理论形式高度一致，但计算和内存开销较大。

Unstacked DeepONet 把 \(p\) 个 branch nets 合并为一个共享网络，一次输出 \(p\) 维系数。形式上仍然是同一个内积公式，但参数量更小、训练更快。论文实验中，unstacked 版本常出现训练误差略高但测试误差更低的现象，说明共享 branch 参数起到了正则化作用，降低了泛化误差。

##### 为什么这种结构适合算子学习？

如果直接把 \([u(x_1),\ldots,u(x_m),y]\) 拼接后送入普通 FNN，网络需要同时学习“输入函数如何影响解”和“输出坐标如何参数化解”这两件不同的事。DeepONet 把二者拆开：Branch 只负责识别输入函数，Trunk 只负责表达输出域。这个归纳偏置与算子本身的结构一致，因此即使子网络只是普通 FNN，也能比直接拼接的 FNN 泛化得更好。

这种结构也解释了 DeepONet 与 PINN/FNO 的区别。PINN 通常针对单个 PDE 实例优化一个解函数，DeepONet 学的是跨许多输入函数的解算子；FNO 通常在规则网格上用 Fourier 卷积学习场到场映射，DeepONet 的输出查询天然是 mesh-free 的，但输入 sensors 通常需要在训练集中保持一致。

##### 传感器数量与离散化误差

算子学习的一个关键误差来源是：连续输入函数 \(u\) 被有限个 sensors 表示。如果 sensors 太少，Branch Net 看到的离散值不足以区分不同输入函数；如果 sensors 很多，优化和泛化难度上升。论文理论分析表明，所需 sensor 数与输入函数族的光滑性有关。例如从带 RBF kernel 的 Gaussian random field 采样时，length scale 越大，函数越平滑，较少 sensors 就能有效表示输入。

> 💡 关键：DeepONet 的误差不仅来自神经网络逼近能力，还来自输入函数离散化、训练优化和有限数据泛化。Branch-Trunk 结构主要是在后两者上提供更好的归纳偏置。

#### 🧪 练习题

```yaml
question: "DeepONet 中 Branch Net 和 Trunk Net 的分工是什么？"
options:
  - "Branch Net 编码输入函数在 sensors 上的值，Trunk Net 编码输出查询位置 y"
  - "Branch Net 负责求 PDE 残差，Trunk Net 负责自动微分"
  - "Branch Net 只用于训练，Trunk Net 只用于推理"
  - "Branch Net 编码时间，Trunk Net 编码优化器状态"
answer: 0
explain: "DeepONet 的核心是把输入函数和输出位置分开建模：Branch Net 产生依赖 u 的系数，Trunk Net 产生依赖 y 的基函数值，二者内积得到 G(u)(y)。"
```
