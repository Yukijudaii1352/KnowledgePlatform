### 视觉交互网络 (Visual Interaction Networks)

```yaml
id: vin
name: VIN
full_name: 视觉交互网络 (Visual Interaction Networks)
year: "2017.12"
org: DeepMind
paper_url: https://proceedings.neurips.cc/paper/7040-visual-interaction-networks
category: physics
parent: interaction_networks
motivation: 从原始视频中学习物理模拟器
```

#### 📝 一句话总结

Visual Interaction Networks 将 CNN 视觉编码器与 Interaction Network 动力学预测器端到端结合，从少量原始视频帧中解析对象 latent 状态并执行物理 rollout，解决 IN 依赖显式对象状态、无法直接从视觉观测学习模拟器的问题。

#### 🎯 核心要点

- **视觉前端 + IN 后端**：CNN 从视频帧估计对象状态，IN 在对象状态图上预测未来动力学
- **六帧输入长期预测**：论文展示模型可从 6 个输入视频帧预测数百步未来轨迹
- **factored latent object representation**：视觉模块被动力学任务驱动，学习对象分解式 latent 表示
- **多物理域评估**：弹簧、重力、磁力、弹球和漂移等二维物理系统
- **不可见对象推断**：可从可见物体受力效果推断不可见物体的未来状态
- **隐式物理属性推断**：模型能从运动中隐式估计未知质量等物理属性

#### 🔬 深入细节

![VIN 预测器结构](https://ar5iv.labs.arxiv.org/html/1706.01433/assets/Predictor.png)
*图：VIN 的 dynamics predictor 基于 Interaction Network，对对象 latent 状态执行交互推理与未来 rollout。*

##### 算法伪代码

```python
# Visual Interaction Network
def vin_forward(video_frames, relation_graph, rollout_steps):
    # 1. 视觉编码：用连续帧估计对象状态
    state_codes = []
    for triplet in sliding_window(video_frames, size=3):
        state_codes.append(cnn_encoder(triplet))

    # 2. 从多个 state code 估计当前位置/速度等 latent state
    object_states = infer_object_state(state_codes)

    # 3. IN 动力学 rollout
    predictions = []
    for _ in range(rollout_steps):
        delta_state = interaction_network(object_states, relation_graph)
        object_states = integrate(object_states, delta_state)
        predictions.append(object_states)

    return predictions
```

##### 动机与背景

Interaction Network 已证明对象-关系图是学习物理模拟器的强归纳偏置，但它假设对象状态、关系属性和外部效应已经可得。真实机器人或视觉系统通常只看到像素视频，不直接知道每个物体的位置、速度、质量或相互作用。

VIN 的问题设定因此更接近感知到规划的闭环：输入是视频帧，输出是未来物体轨迹。模型必须同时解决感知解析和动力学学习，而且这两部分要互相配合。视觉模块不需要显式监督“这是第几个物体”，而是通过预测未来轨迹的损失被迫学习适合物理推理的对象 latent。

##### 架构拆解

VIN 由两个模块组成：

$$
s_t = E_{\theta}(I_{t-2:t})
$$

$$
\hat{s}_{t+1:t+H} = D_{\phi}(s_t, R)
$$

其中 \(E_{\theta}\) 是基于 CNN 的 visual encoder，输入若干帧图像以推断位置和速度等状态；\(D_{\phi}\) 是 Interaction Network 风格的 dynamics predictor，输入对象状态和关系图 \(R\)，递推未来状态。

由于单帧无法确定速度，VIN 使用多个连续帧形成 state code。论文中视觉编码器通常取三帧片段，模型整体从六帧视频中估计当前动力学状态。

##### 动力学预测器如何使用 IN

预测器保留 IN 的核心结构：对每条关系计算 interaction effect，再聚合到每个对象并预测状态变化。若对象状态为 \(o_i\)，关系为 \(r_{ij}\)，则：

$$
e_{ij} = f_R(o_i, o_j, r_{ij})
$$

$$
\bar{e}_j = \sum_i e_{ij}
$$

$$
\Delta o_j = f_O(o_j, \bar{e}_j)
$$

这让 VIN 不只是从像素拟合轨迹，而是在 latent 对象空间里执行类似物理引擎的结构化推理。

##### 与传统视觉预测的区别

普通视频预测模型直接预测未来像素，容易把物理规律混在纹理生成中；VIN 先解析对象状态，再在对象图上预测动力学。这样做的优势是长期 rollout 更稳定，也能自然处理不同关系类型，如弹簧、重力、磁力和碰撞。

论文还展示了隐变量推断能力：当某些对象不可见时，VIN 可通过可见对象受到的影响推断隐藏因素；当质量未知时，模型可从历史运动中形成足以预测未来的 latent 表示。

> ⚠️ 注意：VIN 仍需要监督目标对象状态，视觉编码器并不是完全无监督对象发现；它的贡献是把视觉解析与关系动力学端到端对齐。

#### 🧪 练习题

```yaml
question: "VIN 相比原始 Interaction Network 主要增加了什么能力？"
options:
  - "从原始视频帧中学习对象状态表示并进行物理 rollout"
  - "用哈密顿量保证能量守恒"
  - "把所有对象合并成一个全局向量"
  - "只预测单步像素重建"
answer: 0
explain: "VIN 在 IN 前加入 CNN 感知模块，使模型可从视频观测中解析对象 latent 状态，再用 IN 预测未来物理轨迹。"
```
