### NowcastNet

```yaml
id: nowcastnet
name: NowcastNet
full_name: 临近预报网络 (NowcastNet)
year: '2023'
org: Tsinghua University
paper_url: https://www.nature.com/articles/s41586-023-06184-4
category: meteo_ai
parent: dgmr
motivation: 物理演变算子+深度学习极端降水预报
```

#### 📝 一句话总结

NowcastNet 将可微的降水物理演变算子与条件生成模型结合起来，用演变网络保证平流守恒和中尺度结构，用生成网络补足对流尺度细节，解决了极端降水临近预报中“纯外推会扩散、纯深度生成会违背物理”的矛盾。

#### 🎯 核心要点

- **物理条件生成框架**：由确定性的 evolution network \(\phi\) 与随机 generative network \(\theta\) 组成，输入过去雷达序列，输出未来降水集合预报
- **可微演变算子**：基于二维连续方程，将降水演化拆成 motion field 平流和 intensity residual 增减两部分
- **两路 U-Net 演变网络**：共享 evolution encoder，分别用 motion decoder 和 intensity decoder 预测 \(v_{1:T}\) 与 \(s_{1:T}\)
- **Physics-conditioning**：nowcast decoder 通过 spatially adaptive normalization 条件化于演变网络输出，把 20 km 中尺度物理结构注入 1-2 km 对流细节生成
- **GAN 式对流细节学习**：temporal discriminator 判断未来雷达序列真假，促使生成网络恢复纯平流模型遗漏的尖锐、多尺度降水纹理
- **Pool regularization**：对集合成员和观测做空间池化后匹配，避免逐像素损失过度惩罚混沌对流的位置偏差
- **极端降水训练权重**：加权 \(L_1\) 距离使用 \(w(x)=\min(24,1+x)\)，提高强降水像素在损失中的权重
- **3 小时高分辨率预报**：基于美国 MRMS 和中国雷达资料，可生成 \(2048\text{ km}\times2048\text{ km}\) 区域、最长 3 小时 lead time 的临近预报

#### 🔬 深入细节

##### 图示与可访问来源

![NowcastNet 架构图](https://media.springernature.com/lw685/springer-static/image/art%3A10.1038%2Fs41586-023-06184-4/MediaObjects/41586_2023_6184_Fig1_HTML.png)
*图：NowcastNet 的整体架构、演变网络和演变算子。若图片直链受网络策略影响，可访问 Nature 图页：https://www.nature.com/articles/s41586-023-06184-4/figures/1。论文为开放访问 Nature 文章。*

##### 背景：极端降水临近预报的两难

降水 nowcasting 通常依赖雷达回波序列，目标是在分钟到数小时尺度上预测未来降水。传统 pySTEPS/DARTS 一类外推方法使用平流思想：估计运动场，然后把当前雷达图像沿运动场搬运到未来。这类方法符合部分物理直觉，1 小时内常有效，但在对流触发、增长、衰减和强降水爆发时会迅速积累位置误差和模糊。

DGMR 等深度生成模型能产生时空连贯、较锐利的雷达序列，但如果只从数据中学习，可能出现不自然运动、强度漂移或违背平流守恒的结构。NowcastNet 的设计目标是把这两类方法合并：先用可微物理演变网络产生可信的中尺度轨迹，再用条件生成网络补足小尺度对流细节和不确定性。

##### 概率建模形式

NowcastNet 预测未来雷达/降水场 \(\hat{\mathbf{x}}_{1:T}\)，条件是过去雷达序列 \(\mathbf{x}_{-T_0:0}\) 和演变网络输出 \(\phi(\mathbf{x}_{-T_0:0})\)。随机性来自高斯潜变量 \(\mathbf{z}\)：

$$
P(\hat{\mathbf{x}}_{1:T}\mid \mathbf{x}_{-T_0:0},\phi;\theta)
=
\int
P(\hat{\mathbf{x}}_{1:T}\mid \mathbf{x}_{-T_0:0},
\phi(\mathbf{x}_{-T_0:0}), \mathbf{z};\theta)
P(\mathbf{z})\,d\mathbf{z}
$$

这意味着同一个初始雷达序列可以采样多个未来，形成集合预报。对于对流降水这种强混沌系统，集合比单一确定性图像更合理，因为小尺度触发位置常不可完全确定。

##### 演变网络：把连续方程做成可微算子

论文将降水演化写成修改后的二维连续方程：

$$
\frac{\partial \mathbf{x}}{\partial t}+(\mathbf{v}\cdot\nabla)\mathbf{x}=\mathbf{s}
$$

\(\mathbf{x}\) 是降水率或雷达场，\(\mathbf{v}\) 是运动场，\(\mathbf{s}\) 是强度残差。左侧的 \((\mathbf{v}\cdot\nabla)\mathbf{x}\) 表示平流搬运，右侧 \(\mathbf{s}\) 表示降水增长、衰减、生成和消散等非守恒过程。对每个未来步，NowcastNet 执行：

$$
\mathbf{x}'_t=\operatorname{Advect}(\mathbf{x}''_{t-1},\mathbf{v}_t)
$$

$$
\mathbf{x}''_t=\mathbf{x}'_t+\mathbf{s}_t
$$

演变网络用两路 U-Net 从过去雷达序列一次性预测所有未来步的 \(\mathbf{v}_{1:T}\) 和 \(\mathbf{s}_{1:T}\)。平流算子采用 backward semi-Lagrangian scheme；训练 motion field 时使用双线性插值保证梯度，实际演化时使用最近邻插值减少多步插值导致的模糊，并在相邻时间步之间 stop-gradient 提升稳定性。

##### 演变网络损失

演变网络的加权距离为：

$$
L_{\rm wdis}(\mathbf{x}_t,\mathbf{x}'_t)
=
\left\|
(\mathbf{x}_t-\mathbf{x}'_t)\odot \mathbf{w}(\mathbf{x}_t)
\right\|_1,
\qquad
\mathbf{w}(\mathbf{x})=\min(24,1+\mathbf{x})
$$

累积损失同时约束平流后结果和加入强度残差后的结果：

$$
J_{\rm accum}
=
\sum_{t=1}^{T}
\left[
L_{\rm wdis}(\mathbf{x}_t,(\mathbf{x}'_t)_{\rm bili})
+
L_{\rm wdis}(\mathbf{x}_t,\mathbf{x}''_t)
\right]
$$

运动场还要平滑，避免无物理意义的剧烈局地跳变：

$$
J_{\rm motion}
=
\sum_{t=1}^{T}
\left(
\|\nabla \mathbf{v}^{1}_{t}\odot \sqrt{\mathbf{w}(\mathbf{x}_t)}\|_2^2
+
\|\nabla \mathbf{v}^{2}_{t}\odot \sqrt{\mathbf{w}(\mathbf{x}_t)}\|_2^2
\right)
$$

总损失为：

$$
J_{\rm evolution}=J_{\rm accum}+\lambda J_{\rm motion}
$$

其中论文设置 \(\lambda=10^{-2}\)。强降水像素通过 \(\mathbf{w}(\mathbf{x})\) 获得更大权重，避免模型为了最小化平均误差而只拟合占多数的弱降水和无雨区域。

##### 生成网络：用物理条件控制对流细节

演变网络输出的是较可信的中尺度预测 \(\mathbf{x}''_{1:T}\)，但对流尺度的 1-2 km 细节常具有强随机性，不能只靠确定性平流得到。NowcastNet 的生成网络使用 nowcast encoder-decoder 和潜变量 \(\mathbf{z}\)，并在 decoder 中对每层激活做 spatially adaptive normalization：先归一化当前激活，再用从 \(\mathbf{x}''_{1:T}\) 计算出的空间位置相关均值/方差调制。

直觉上，演变网络告诉生成器“雨带应该往哪里走、哪些区域应持续有雨”，潜变量和 radar context 负责生成“雨带内部的纹理、局地增强和对流细胞”。这种 conditioning 减少了纯 GAN 任意生成的自由度，也避免了外推方法只会搬运旧图像的僵硬性。

##### 生成网络损失

temporal discriminator \(D\) 对未来序列做真假判别：

$$
J_{\rm disc}
=
L_{\rm ce}(D(\mathbf{x}_{1:T}),1)
+
L_{\rm ce}(D(\hat{\mathbf{x}}_{1:T}),0)
$$

生成器的对抗损失为：

$$
J_{\rm adv}=L_{\rm ce}(D(\hat{\mathbf{x}}_{1:T}),1)
$$

为了避免生成器因为对流位置微小偏差而被逐像素损失过度惩罚，NowcastNet 使用空间池化 \(Q(\cdot)\) 做 ensemble 级一致性约束。给定 \(k\) 个潜变量样本：

$$
J_{\rm pool}
=
L_{\rm wdis}\left(
Q(\mathbf{x}_{1:T}),
\frac{1}{k}\sum_{i=1}^{k}Q(\hat{\mathbf{x}}^{\mathbf{z}_i}_{1:T})
\right)
$$

生成网络目标为：

$$
J_{\rm generative}=\beta J_{\rm adv}+\gamma J_{\rm pool}
$$

论文中 \(k=4\)、\(\beta=6\)、\(\gamma=20\)。pool regularization 的关键作用是保留降水面积、强度和中尺度位置的一致性，同时允许对流细胞在小范围内有合理随机位移。

##### 伪代码：NowcastNet 训练/推理核心

```python
# NowcastNet 核心逻辑：物理演变 + 条件生成
def evolution_network(past_radar):
    context = evolution_encoder(past_radar)
    motion = motion_decoder(context)      # v_1:T
    residual = intensity_decoder(context) # s_1:T

    x_prev = past_radar[-1]
    evolved = []
    for t in range(T):
        x_advect = backward_semi_lagrangian(x_prev, motion[t])
        x_next = x_advect + residual[t]
        evolved.append(x_next)
        x_prev = stop_gradient(x_next)  # 提升多步演变稳定性
    return motion, residual, stack(evolved)  # x''_1:T


def nowcastnet_forward(past_radar, num_members=4):
    motion, residual, physics_forecast = evolution_network(past_radar)
    members = []
    for _ in range(num_members):
        z = normal_sample()
        h = nowcast_encoder(concat(past_radar, physics_forecast))
        # decoder 每层由 physics_forecast 产生空间自适应归一化参数
        pred = physics_conditioned_decoder(h, z, condition=physics_forecast)
        members.append(pred)
    return members, physics_forecast


def train_step(past_radar, future_radar):
    members, physics_forecast = nowcastnet_forward(past_radar)
    loss_evo = accumulation_loss(future_radar, physics_forecast) + motion_reg()
    loss_disc = discriminator_loss(future_radar, members)
    loss_gen = adversarial_loss(members) + pool_regularization(future_radar, members)
    return loss_evo, loss_disc, loss_gen
```

##### 与 DGMR 和 pySTEPS 的关键区别

相对于 pySTEPS，NowcastNet 不再把运动场估计、平流外推和强度变化当成分离模块，而是把它们变成可反向传播的 neural evolution operator，直接优化整个预报时段的误差。相对于 DGMR，NowcastNet 不只依赖生成器从雷达历史中学习未来分布，而是让生成器显式条件化在满足平流物理的演变预测上。

> 💡 关键：NowcastNet 不是简单把“物理模型输出”拼到神经网络输入里，而是用演变网络给生成器的每层 decoder 激活提供空间自适应归一化条件，从结构上约束生成过程跟随物理演变。

##### 局限性

NowcastNet 嵌入的是降水连续方程和平流守恒，尚未显式建模动量、热力、水汽微物理等完整大气过程。它适合雷达覆盖区域内的 0-3 小时降水 nowcasting；对缺少高质量雷达观测的地区，需要依赖迁移学习或引入卫星、数值模式等额外资料。

#### 🧪 练习题

```yaml
question: "NowcastNet 中 evolution network 的主要作用是什么？"
options:
  - "只负责把雷达图像压缩成低维文本描述"
  - "基于可微平流和强度残差生成符合降水演化物理的中尺度预测"
  - "替代 temporal discriminator 判断真假"
  - "将所有未来降水都预测为历史平均值"
answer: 1
explain: "evolution network 学习 motion fields 和 intensity residuals，并通过可微演变算子迭代得到物理上更可信的中尺度未来降水场，再作为生成网络的条件。"
```
