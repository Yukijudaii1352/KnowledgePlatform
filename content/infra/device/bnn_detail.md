### 二值神经网络 (Binarized Neural Networks)

```yaml
id: bnn
name: BNN
full_name: 二值神经网络 (Binarized Neural Networks)
year: '2016'
org: MILA
paper_url: —
category: efficiency
parent: —
motivation: 权重和激活限制为1位极大简化硬件乘法器
```

#### 📝 一句话总结

BNN 提出在运行时将权重和激活都约束为 \(\{-1,+1\}\) 的训练方法，用 Sign 二值化和直通估计器解决离散化不可导问题。它把大部分乘加替换为 XNOR 与 popcount，使神经网络推理更适合位级并行硬件。

#### 🎯 核心要点

- 同时二值化权重和激活：隐藏层推理主要使用 1-bit 值，显著减少模型存储和中间激活访问
- 训练保留实值影子权重：前向/反向使用二值权重，参数更新在实值权重上完成，并裁剪到 \([-1,1]\)
- 使用 Sign 二值化：确定性二值化取符号，随机二值化按裁剪概率采样
- 用 Straight-Through Estimator 反传：在 \(|r| \le 1\) 的饱和区间内传递梯度，区间外截断梯度
- 位运算替代乘法：二值向量点积可通过 XNOR 统计相同符号位，再用 popcount 得到结果
- 引入 shift-based BatchNorm 与 shift-based AdaMax：用近似 2 的幂和位移减少训练时乘除法
- 在 MNIST、CIFAR-10、SVHN 上接近当时非二值模型效果，并给出二值矩阵乘 GPU kernel 的加速验证

#### 🔬 深入细节

##### 核心示意图

![BNN CIFAR-10 训练曲线](https://ar5iv.labs.arxiv.org/html/1602.02830/assets/training_curves.png)
*图 1：BNN 论文 Figure 1，比较 CIFAR-10 ConvNet 在不同二值化方法下的训练损失和验证错误率。图源为 ar5iv 对论文公开版本的转换；论文公开版本见 https://arxiv.org/abs/1602.02830。*

![BNN 二值 GPU kernel 对比](https://ar5iv.labs.arxiv.org/html/1602.02830/assets/kernels.png)
*图 2：BNN 论文 Figure 3，展示普通矩阵乘 kernel 与二值矩阵乘 kernel 的运行时间对比。该图用于说明二值运算可以映射到位级并行执行。*

##### 算法伪代码

```python
# BNN 训练伪代码：保留实值权重 W_real，用二值权重/激活计算
for minibatch in data:
    a = minibatch.inputs
    binary_cache = []

    # forward
    for layer in layers:
        Wb = sign(layer.W_real)               # {-1, +1}
        ab = sign(a) if not layer.is_first else quantize_input_bits(a)
        z = binary_matmul(Wb, ab)             # XNOR + popcount 或等价整数计算
        a = batch_norm(z, layer.bn_params)
        binary_cache.append((Wb, ab, z))

    loss = criterion(a, minibatch.labels)

    # backward with straight-through estimator
    grad = dloss_da(loss)
    for layer in reversed(layers):
        grad = backprop_batch_norm(grad, layer.bn_params)
        grad_Wb, grad_ab = binary_layer_backward(grad, binary_cache[layer])
        grad_W_real = grad_Wb * indicator(abs(layer.W_real) <= 1)
        layer.W_real = optimizer_update(layer.W_real, grad_W_real)
        layer.W_real = clip(layer.W_real, -1, 1)
        grad = grad_ab
```

##### 二值化机制

BNN 的核心约束是把连续值 \(r\) 映射到 1-bit 符号值。确定性二值化最简单：

$$
x^b = \mathrm{Sign}(x) =
\begin{cases}
+1, & x \ge 0 \\
-1, & x < 0
\end{cases}
$$

论文也讨论随机二值化，即令 \(x^b\) 以与 \(x\) 相关的概率取 \(+1\)。常见写法是：

$$
P(x^b = +1) = \sigma(x) = \mathrm{clip}\left(\frac{x+1}{2}, 0, 1\right)
$$

随机版本能表达量化不确定性，但需要随机数生成，硬件和训练实现更贵；确定性 Sign 计算便宜，论文的 Theano 实验主要使用确定性激活二值化。无论哪种方式，运行时层间传递的是二值激活，权重也以二值形式参与前向计算。

##### 梯度如何穿过 Sign

Sign 函数几乎处处导数为 0，直接反向传播会让梯度消失。BNN 采用 Straight-Through Estimator (STE)：前向仍执行离散 Sign，反向则近似认为 Sign 在未饱和区间内像 hard-tanh 一样可导，在过大或过小的输入处截断梯度：

$$
\frac{\partial C}{\partial r}
\approx
\frac{\partial C}{\partial q}\mathbf{1}_{|r|\le 1},
\qquad q=\mathrm{Sign}(r)
$$

这个设计的直觉是：如果实值影子权重 \(r\) 已经远离 0，改变它的幅度不会改变二值权重的符号，继续传递大梯度只会让实值权重发散。因此 BNN 在更新后把实值权重裁剪到 \([-1,1]\)，既配合 STE 的有效区间，也防止权重尺度无意义增大。

##### 位级矩阵乘

当权重 \(w_i\) 和激活 \(x_i\) 都属于 \(\{-1,+1\}\) 时，乘法只有“符号相同得 +1、符号不同得 -1”两种结果。将 \(-1/+1\) 编码成 0/1 后，符号相同可由 XNOR 得到。长度为 \(n\) 的二值点积可写成：

$$
\sum_{i=1}^{n} w_i x_i
= 2\cdot \mathrm{popcount}(\mathrm{xnor}(w_{\mathrm{bits}}, x_{\mathrm{bits}})) - n
$$

这使得多个乘法可以打包进一个机器字或 SIMD lane 中同时处理。硬件上不再需要通用乘法器阵列，而是使用 XNOR 门、位计数器和少量整数加法器。对内存系统而言，1-bit 权重和激活还把带宽压力降低到 32-bit 浮点表示的约 \(1/32\)，这通常比单个算术操作的节省更关键。

##### 训练/推理流程与边界

BNN 训练时并不是只保存二值权重。若直接在 \(\{-1,+1\}\) 上做小步梯度更新，参数几乎无法表达“接近翻转但尚未翻转”的状态；因此论文保留实值权重 \(W\)，每次前向临时生成 \(W^b=\mathrm{Sign}(W)\)，反向用 STE 得到近似梯度，再更新并裁剪实值 \(W\)。推理时才可以丢弃实值影子权重，只保留二值权重、BatchNorm 参数和必要的第一层输入量化逻辑。

第一层是 BNN 的一个特殊点：原始图像输入通常不是二值，而是 8-bit 或浮点像素。论文指出视觉模型第一层通道数较少，计算占比通常小于内部卷积层；也可以把 8-bit 输入拆成 bit-plane，与二值权重做多次位运算再按位权重求和。最后一层是否二值化也常按任务实现调整，因为分类 logits 有时需要更高精度表达。

与 BinaryConnect 只二值化权重相比，BNN 同时二值化激活，因此硬件收益更大：中间特征图也能用 1-bit 存储和传输，层与层之间不必恢复成高精度表示。但这也让优化更难，对 BatchNorm、初始化、学习率和 STE 细节更敏感。BNN 的贡献在于给出一套可训练流程，证明极端 1-bit 约束并不只是推理后处理，而可以纳入端到端训练。

> ⚠️ 注意：BNN 的“乘法器消失”主要适用于二值化后的隐藏层矩阵乘/卷积；BatchNorm、第一层输入处理、输出层和训练时实值权重更新仍可能需要更高精度计算。

#### 🧪 练习题

```yaml
question: "BNN 使用 Straight-Through Estimator 的主要目的是什么？"
options:
  - "把二值权重压缩成 Huffman 码"
  - "在反向传播中近似穿过不可导的 Sign 二值化函数"
  - "让所有 BatchNorm 参数固定为 0"
  - "把稀疏矩阵转换成 CSR 格式"
answer: 1
explain: "Sign 函数几乎处处导数为 0，STE 在未饱和区间内近似传递梯度，使实值影子权重可以通过梯度下降学习。"
```
