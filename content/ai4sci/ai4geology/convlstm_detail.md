### ConvLSTM

```yaml
id: convlstm
name: ConvLSTM
full_name: 卷积长短期记忆网络 (Convolutional LSTM)
year: '2015'
org: HKU
paper_url: https://arxiv.org/abs/1506.04214
category: meteo_ai
parent: —
motivation: 首创时空序列卷积建模降水预报
```

#### 📝 一句话总结

ConvLSTM 把 LSTM 的输入到状态、状态到状态变换从全连接改成卷积，使隐藏状态保留二维空间网格，解决了雷达回波临近预报中“既要记住时间演化、又要捕捉局部运动”的时空序列建模问题。

#### 🎯 核心要点

- **时空序列预测形式化**：将降水临近预报写成过去雷达图序列 \(\mathbf{X}_{1:J}\) 到未来雷达图序列 \(\mathbf{X}_{J+1:J+K}\) 的端到端学习问题
- **ConvLSTM 单元**：所有输入、门控、记忆单元和隐藏状态都是三维张量，最后两个维度对应雷达图的行列空间
- **卷积状态转移**：用卷积替代 FC-LSTM 的矩阵乘法，输入到状态和状态到状态都只连接局部邻域，显式编码空间局部性和平移共享
- **编码-预测结构**：用 stacked ConvLSTM encoder 压缩历史雷达序列，再把最终状态复制给 forecasting network 递归生成未来多帧
- **核大小控制运动感受野**：状态到状态卷积核越大，隐藏状态随时间扩展的空间范围越大，更适合捕捉快速移动回波
- **实证基准**：在 Moving-MNIST 和香港 2011-2013 年雷达回波数据上，ConvLSTM 优于 FC-LSTM，并超过当时业务 ROVER 光流外推算法

#### 🔬 深入细节

##### 图示与整体架构

![ConvLSTM 内部结构](https://ar5iv.labs.arxiv.org/html/1506.04214/assets/x2.png)
*图：论文 Figure 2 的 ConvLSTM 单元结构。输入、隐藏状态和记忆单元都保留空间网格，门控计算中的线性变换由卷积完成。*

![ConvLSTM 编码-预测网络](https://ar5iv.labs.arxiv.org/html/1506.04214/assets/x3.png)
*图：论文 Figure 3 的 encoding-forecasting 结构。编码网络读取历史帧，预测网络从编码状态出发输出未来雷达序列。*

##### 算法伪代码

```python
# ConvLSTM precipitation nowcasting 伪代码
def convlstm_nowcast(past_radar_frames, encoder, forecaster, out_conv, pred_steps):
    """
    past_radar_frames: [T_in, B, C, H, W]
    return: [T_out, B, C, H, W]
    """
    # 1. Encoder: 逐帧读取历史雷达图，更新多层 ConvLSTM 状态
    states = encoder.init_states(batch_size=past_radar_frames.shape[1])
    for x_t in past_radar_frames:
        states = encoder.step(x_t, states)

    # 2. Forecasting network: 把 encoder 最终状态作为初始状态
    forecast_states = copy_states(states)
    x_t = zeros_like(past_radar_frames[-1])  # 或使用上一帧/上一预测作为解码输入
    predictions = []
    for _ in range(pred_steps):
        forecast_states = forecaster.step(x_t, forecast_states)
        h_top = forecast_states[-1].hidden
        y_t = sigmoid(out_conv(h_top))
        predictions.append(y_t)
        x_t = y_t

    return stack(predictions)
```

##### 从 FC-LSTM 到 ConvLSTM

标准 FC-LSTM 把输入 \(\mathbf{x}_t\)、隐藏状态 \(\mathbf{h}_t\) 和记忆单元 \(\mathbf{c}_t\) 都当作向量处理。对于雷达图，这意味着必须先把二维图像展平，任意两个像素都可能通过全连接权重直接相连。这样有两个问题：参数量大，而且模型不知道相邻像素比远距离像素更可能共同构成一个移动回波。

ConvLSTM 保留空间维度。设输入 \(\mathbf{X}_t\in\mathbb{R}^{C\times H\times W}\)，隐藏状态 \(\mathbf{H}_t\in\mathbb{R}^{D\times H\times W}\)，记忆单元 \(\mathbf{C}_t\in\mathbb{R}^{D\times H\times W}\)。核心门控为：

$$
\mathbf{i}_t=\sigma(\mathbf{W}_{xi} * \mathbf{X}_t+\mathbf{W}_{hi} * \mathbf{H}_{t-1}+\mathbf{W}_{ci}\circ \mathbf{C}_{t-1}+\mathbf{b}_i)
$$

$$
\mathbf{f}_t=\sigma(\mathbf{W}_{xf} * \mathbf{X}_t+\mathbf{W}_{hf} * \mathbf{H}_{t-1}+\mathbf{W}_{cf}\circ \mathbf{C}_{t-1}+\mathbf{b}_f)
$$

$$
\mathbf{C}_t=\mathbf{f}_t\circ\mathbf{C}_{t-1}
+\mathbf{i}_t\circ\tanh(\mathbf{W}_{xc} * \mathbf{X}_t+\mathbf{W}_{hc} * \mathbf{H}_{t-1}+\mathbf{b}_c)
$$

$$
\mathbf{o}_t=\sigma(\mathbf{W}_{xo} * \mathbf{X}_t+\mathbf{W}_{ho} * \mathbf{H}_{t-1}+\mathbf{W}_{co}\circ \mathbf{C}_{t}+\mathbf{b}_o)
$$

$$
\mathbf{H}_t=\mathbf{o}_t\circ\tanh(\mathbf{C}_t)
$$

其中 \(*\) 是卷积，\(\circ\) 是逐元素乘法。与 FC-LSTM 相比，ConvLSTM 的关键变化是 \(\mathbf{W}_{h\*}\) 不再是稠密矩阵，而是卷积核。某个网格点的新状态只由该点附近的输入和隐藏状态决定，因此天然适合雷达回波、视频帧和遥感序列这类局部连续场。

##### 卷积核大小为什么重要

论文特别强调 state-to-state kernel 的大小。若隐藏状态转移只用 \(1\times1\) 卷积，那么每个位置的时间更新不看邻居，状态感受野不会随时间扩张；模型只能学习每个像素自己的时间变化，很难表示回波平移。若使用 \(5\times5\) 或更大的状态卷积，\(\mathbf{H}_{t-1}\) 中邻近区域会参与当前网格点更新，经过多步递推后感受野继续扩大，可以表达云团移动、拉伸和合并。

这个设计和光流外推的直觉相似，但学习方式不同。ROVER 等传统算法先估计运动场，再按半拉格朗日方法外推雷达图；ConvLSTM 不显式估计光流，而是在门控状态中隐式学习“哪些局部结构应被保留、遗忘或移动”。因此它可以端到端利用预测误差反向调整所有卷积核。

##### 编码-预测结构

论文使用两个 stacked ConvLSTM 网络：encoding network 和 forecasting network。编码阶段读取历史帧：

$$
(\mathbf{H}_J,\mathbf{C}_J)=\mathrm{Encoder}(\mathbf{X}_{1:J})
$$

预测阶段从编码得到的最终状态出发，生成未来序列：

$$
\hat{\mathbf{X}}_{J+1:J+K}
=\mathrm{Forecaster}(\mathbf{H}_J,\mathbf{C}_J)
$$

这种 seq2seq 结构比单步预测更适合临近预报，因为业务需求通常不是下一帧，而是未来 1-6 小时的连续降水演化。论文雷达实验中，香港雷达每 6 分钟记录一帧，模型用 5 帧历史预测 15 帧未来；数据来自 2011-2013 年 97 个雨日，共构造 8148 个训练序列、2037 个验证序列和 2037 个测试序列。

##### 损失函数和训练目标

论文把雷达图像素变换为灰度强度后训练多步预测模型，可用逐像素序列损失表示：

$$
\mathcal{L}(\theta)=
\sum_{t=J+1}^{J+K}
\sum_{u,v}
\ell\left(\mathbf{X}_{t,u,v},\hat{\mathbf{X}}_{t,u,v}^{(\theta)}\right)
$$

在 Moving-MNIST 实验中 \(\ell\) 是像素级交叉熵；在雷达回波实验中，模型同样通过反向传播穿越时间（BPTT）优化多帧输出误差。直觉上，损失要求每一个未来时刻的每个网格点都接近真实回波强度，而 ConvLSTM 的门控状态负责在时间上携带局部运动信息。

> 💡 关键：ConvLSTM 的贡献不是简单把 CNN 接到 LSTM 前面，而是把 LSTM 内部的状态转移本身卷积化，使记忆单元也具有空间结构。

##### 与后续天气 AI 的关系

ConvLSTM 是后续雷达临近预报深度模型的重要基线。它的优势是结构简单、端到端、可多步输出；局限是预测分布通常趋向平均，长时效会产生模糊，且没有显式概率建模。DGMR、NowcastNet 等后续方法正是在这个基础上继续解决“多解性、极端降水、概率一致性”和“物理约束”问题。

#### 🧪 练习题

```yaml
question: "ConvLSTM 相比 FC-LSTM 解决雷达回波预测的关键改动是什么？"
options:
  - "把所有雷达图像展平后使用更大的全连接层"
  - "在 LSTM 的输入到状态和状态到状态变换中使用卷积，保留二维空间结构"
  - "只预测下一帧，不再做多步序列预测"
  - "用固定光流场替代神经网络训练"
answer: 1
explain: "ConvLSTM 的输入、隐藏状态和记忆单元都是空间张量，门控计算通过卷积连接局部邻域，因此能同时建模时间记忆和空间运动。"
```
