### Nanophotonic NN: 逆向设计纳米光子神经网络

```yaml
id: nanophotonic_nn
name: Nanophotonic NN
full_name: 逆向设计纳米光子神经网络 (Inverse-Designed Nanophotonic Neural Network)
year: '2026'
org: Nature Comms
paper_url: https://www.nature.com/articles/s41467-026-68648-1
category: photonic
parent: —
motivation: 逆向设计实现超紧凑片上光学计算
```

#### 📝 一句话总结

Nanophotonic NN 提出一种基于 3D-FDTD 与伴随变量法的逆向设计光子神经网络，把分类权重直接固化为 SOI 纳米散射结构，解决传统 MZI mesh / microring 光神经网络面积大、调谐功耗高、难以密集集成的问题。论文在 20 × 20 µm² 与 30 × 20 µm² 器件中分别实现 MNIST 与 MedNIST 片上分类，实验准确率达到 89% 与 90%。

#### 🎯 核心要点

- 采用拓扑优化逆向设计：每个亚波长 voxel 都是可训练自由度，最终形成任务专用的纳米散射介质
- 使用 3D-FDTD 捕获高折射率差 SOI 器件中的完整 Maxwell 波动传播，而不是用有效折射率近似
- 利用 Maxwell 方程线性性，将大量训练样本的光场响应重构为少量独立 forward mode 的线性组合
- 每个训练 epoch 只需约 \(N + C\) 次 FDTD 仿真，其中 \(N\) 是输入端口数、\(C\) 是类别输出数，显著降低逆向设计成本
- 用 photodetector 输出功率形成类别证据分布，通过交叉熵损失和伴随梯度更新材料分布
- 在 SOI 平台制备两块器件：MNIST PNN 为 20 × 20 µm²，MedNIST PNN 为 30 × 20 µm²
- 计算密度约 400 million trainable parameters/mm²；MNIST 与 MedNIST 设计约含 \(1.6 \times 10^5\)、\(2.4 \times 10^5\) 个训练参数
- 提出堆叠 PNN core + photodetector 非线性 + patch/weight sharing 的扩展路径，可向更深更宽的光子网络扩展
- 支持 wavelength / polarization multiplexing；补充实验展示双波长单芯片同时分类 MNIST 与 MedNIST

#### 🔬 深入细节

##### 核心示意图

![Nanophotonic NN 逆向设计流程](https://media.springernature.com/lw685/springer-static/image/art%3A10.1038%2Fs41467-026-68648-1/MediaObjects/41467_2026_68648_Fig1_HTML.png)
*图：Nature Communications 论文 Fig. 1，展示输入特征经相干光幅度编码后进入拓扑优化散射区，输出端口功率对应类别证据；下半部分是 latent topology、3D-FDTD forward/reverse mode、AVM 物理梯度和训练循环。*

##### 训练与推理伪代码

```python
# Nanophotonic NN: 基于 Maxwell 线性性的逆向设计训练流程
def train_inverse_designed_pnn(dataset, n_inputs, n_classes, epochs):
    rho = initialize_latent_topology()          # 可训练材料分布参数

    for epoch in range(epochs):
        eps = parameterize_to_permittivity(rho) # rho -> SOI/air permittivity map

        # 1) 对每个输入端口做一次独立 3D-FDTD forward simulation
        forward_modes = []
        for i in range(n_inputs):
            E_i = fdtd_forward(eps, source_port=i, wavelength=1550e-9)
            forward_modes.append(E_i)

        # 2) 用线性叠加重构每个样本的光场，不为每个样本重新跑 FDTD
        losses = []
        class_scores = []
        for x, label in dataset:
            E_sample = sum(x[i] * forward_modes[i] for i in range(n_inputs))
            power = detect_output_power(E_sample, ports=n_classes)
            prob = power / power.sum()
            losses.append(cross_entropy(prob, label))
            class_scores.append(prob)

        # 3) 对每个输出类别做 reverse/adjoint simulation，得到物理梯度
        adjoint_modes = []
        dL_dpower = differentiate_loss(class_scores, dataset.labels)
        for c in range(n_classes):
            E_adj_c = fdtd_adjoint(eps, output_port=c, seed=dL_dpower[:, c])
            adjoint_modes.append(E_adj_c)

        grad_rho = avm_gradient(forward_modes, adjoint_modes, rho)
        rho = optimizer_step(rho, grad_rho)

    return fabricate_topology(rho)


def pnn_inference(fabricated_device, input_features):
    optical_amplitudes = encode_features_as_coherent_inputs(input_features)
    output_power = fabricated_device.propagate_and_detect(optical_amplitudes)
    return argmax(output_power)
```

##### 光学计算模型

Nanophotonic NN 的核心不是在光路上摆放一组可调 MZI 或 microring 权重，而是把整个散射区当作一个可训练的线性算子。输入特征 \(x_1,\ldots,x_N\) 被编码为同一波长下 \(N\) 个相干输入端口的复振幅；在优化后的散射介质中，光经历多次散射、干涉和模式混合，最终在 \(C\) 个输出端口形成类别相关的光功率。推理时不需要重新配置权重，器件本身就是训练后的物理权重矩阵。

对第 \(i\) 个输入端口单独激励得到的电场记为 \({\bf E}_i({\bf r})\)。由于 Maxwell 方程在固定材料分布和线性介质下满足叠加性，样本 \({\bf x}\) 的连续波场可以写成：

$$
{\bf E}_{\bf x}({\bf r}) = \sum_{i=1}^{N} x_i {\bf E}_i({\bf r})
$$

这条线性叠加是论文降低训练成本的关键。朴素做法需要对每个训练样本都跑一次 3D-FDTD；该方法只需要对 \(N\) 个输入 basis 跑 forward simulation，再用矩阵乘法重构所有样本光场。输出端口 \(c\) 的类别证据来自探测功率：

$$
P_c({\bf x}) = \int_{\Omega_c} |{\bf E}_{\bf x}({\bf r})|^2 d{\bf r}, \qquad
p_c = \frac{P_c}{\sum_{j=1}^{C} P_j}
$$

训练目标可写成标准交叉熵：

$$
\mathcal{L}({\bf x}, y) = -\log p_y
$$

##### 逆向设计与伴随梯度

设计变量 \(\rho\) 表示离散化后的 latent topology，经过滤波、投影或 B-spline 平滑后映射为真实介电常数分布 \(\epsilon_r({\bf r})\)。在 SOI 平台中，优化器实际上是在决定每个亚波长 voxel 更接近硅还是空气，从而雕刻出高折射率差的复杂散射结构。高折射率差带来更强的光场约束、内部共振和干涉表达能力，但也使有效折射率近似不够可靠，所以论文选择全 3D-FDTD。

梯度计算采用 adjoint variable method。直观地说，forward field 告诉我们当前输入光如何穿过器件，adjoint field 则从输出误差反向注入，表示“如果希望某个输出端口功率增减，哪些空间位置最该改变材料”。简化的拓扑梯度形式可以理解为 forward 与 adjoint 场的局部重叠：

$$
\frac{\partial \mathcal{L}}{\partial \epsilon({\bf r})}
\propto
-\operatorname{Re}\left\{ {\bf E}_{\mathrm{fwd}}({\bf r}) \cdot {\bf E}_{\mathrm{adj}}({\bf r}) \right\}
$$

在实际训练中，论文把 \(L\) 个样本的光场由 \(N\) 个 forward mode 重构，把 \(T\) 个反向误差信号由 \(C\) 个 reverse mode 聚合，因此每个 epoch 的 FDTD 主成本约为 \(N+C\)，而不是训练集大小。MNIST 与 MedNIST 设计在 RTX 5090 单节点上分别约需 29.7 小时与 56.3 小时；多 GPU 节点调度可继续降低总时间。

##### 与传统光神经网络的区别

传统可编程 PNN 常用 MZI mesh、microring 或衰减器来实现矩阵乘法。这类架构的优点是权重可重配置，但代价是面积、热调谐功耗、校准复杂度和器件间串扰。Nanophotonic NN 选择更像 photonic ASIC 的路线：离线训练一次，制备后用于稳定推理，运行时没有大规模权重调谐。它牺牲了在线可编程性，换取超小面积、低静态功耗和更高空间计算密度。

这种路线也解释了论文为什么强调“in-memory optical single-shot run-time operation”。权重不是从片外存储加载到计算单元，而是直接以材料边界和折射率分布的形式嵌入传播介质。光从输入端到输出端一次传播即完成线性分类层，主要延迟由光传播和探测决定，而不是电子矩阵乘法的数据搬移。

##### 实验结果与扩展路径

论文制备并测试了两类 SOI 设备：MNIST 使用 10 输入、10 输出的 20 × 20 µm² PNN，实验片上准确率为 89%；MedNIST 使用 15 输入、6 输出的 30 × 20 µm² PNN，实验片上准确率为 90%。数值优化中，MedNIST 6 类任务在 150 个 epoch 附近达到 99.1% 峰值准确率；实验与仿真差异主要来自制程误差、相位扰动、耦合/测量误差等硬件因素。

![可扩展 PNN 堆叠架构](https://media.springernature.com/lw685/springer-static/image/art%3A10.1038%2Fs41467-026-68648-1/MediaObjects/41467_2026_68648_Fig7_HTML.png)
*图：Nature Communications 论文 Fig. 7，展示将图像切成 patch 后，使用多组 PNN core 与 photodetector nonlinearity 构成更深更宽网络的扩展方案。*

更大模型的扩展依赖三件事。第一，宽度上可对图像 patch 做 weight sharing，并行复用同一组 PNN core。第二，深度上可在 PNN core 之间插入 photodetector 非线性，将光功率转换为下一阶段输入特征。第三，吞吐上可使用 wavelength 或 polarization multiplexing，让同一芯片承载多个任务或多个并行通道。论文补充结果显示，双波长 30 × 20 µm² 单芯片可同时分类 MNIST 与 MedNIST，测试准确率分别为 95.1% 和 98.0%，说明多路复用不是纯概念，而是与这类逆向设计器件兼容。

> 💡 关键：Nanophotonic NN 的“神经网络参数”不是电子权重表，而是纳米尺度材料分布。训练阶段昂贵但可离线并行；推理阶段极简，输入光场一次穿过器件即可得到类别输出。

#### 🧪 练习题

```yaml
question: "Nanophotonic NN 为什么每个训练 epoch 不需要对每个样本都运行一次 3D-FDTD？"
options:
  - "因为 Maxwell 方程在线性介质中满足叠加性，可用少量输入 basis 光场线性重构样本光场"
  - "因为输出类别由电子 GPU 完全计算，光学器件只负责存储标签"
  - "因为论文只训练最后一层电子分类器，光子结构不参与优化"
  - "因为所有输入样本在光学上都被编码成同一个相位模式"
answer: 0
explain: "论文利用线性叠加，把样本响应表示为输入端口 forward modes 的线性组合，因此 FDTD 主成本随输入/输出端口数增长，而不是随训练样本数增长。"
```
