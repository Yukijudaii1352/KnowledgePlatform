### OpenVLA-OFT

```yaml
id: openvla2
name: OpenVLA-OFT
full_name: 开源VLA优化微调 (OpenVLA-OFT)
year: '2025.02'
org: Stanford
paper_url: https://arxiv.org/abs/2502.19645
category: vlm_finetune
parent: openvla
motivation: 并行解码与连续动作兼顾速度、质量和高频控制
```

#### 📝 一句话总结
OpenVLA-OFT 系统研究了 OpenVLA 的微调设计空间，提出结合并行解码、动作分块、连续动作表示和 L1 回归目标的 OFT 配方，在保留 OpenVLA 语义泛化能力的同时，将 LIBERO 平均成功率从 76.5% 提升到 97.1%，并把动作生成吞吐提升到原始 OpenVLA 的 26 倍。

#### 🎯 核心要点
- 以 **OpenVLA** 为基础 VLA，研究微调阶段的关键设计选择，而不是重新训练一个全新骨干
- 提出 **OFT (Optimized Fine-Tuning)** 配方：并行解码、动作分块、连续动作表示、L1 回归目标
- 提出 **OpenVLA-OFT**：在 LIBERO 四套任务上达到 **97.1%** 平均成功率，显著高于原始 OpenVLA 的 **76.5%**
- 推理侧通过 **parallel decoding + action chunking** 将动作生成吞吐提升 **26x**，同时降低控制延迟
- 支持更灵活的输入输出规格：多相机输入、可选本体状态、单臂/双臂控制、高频动作块输出
- 在真实世界 **双臂 ALOHA** 平台上，OFT 配方支持高频语言驱动控制，并可通过 **FiLM** 增强语言接地能力形成 **OpenVLA-OFT+**
- 在真实机器人评测中，超过按默认配方微调的 **π0** 和 **RDT-1B**，以及从零训练的 **ACT** 和 **Diffusion Policy**，平均成功率最高可领先 **15%**
- 保持 OpenVLA 的参数高效微调范式，可结合 **LoRA** 训练，不需要重新做全参数预训练

#### 🔬 深入细节
##### 核心架构图

![OpenVLA-OFT 在双臂 ALOHA 上的总体框架](https://openvla-oft.github.io/static/images/openvla_oft_figure_1.jpeg)
*图：OpenVLA-OFT / OpenVLA-OFT+ 的整体思路。方法仍以 OpenVLA 为骨干，但把原始逐 token、自回归、离散动作解码改成更适合控制的并行连续动作块输出，并在真实双臂 ALOHA 场景中验证高频控制与语言跟随能力。*

##### 推理效率结果图

![OpenVLA-OFT 在 LIBERO 上的推理效率结果](https://openvla-oft.github.io/static/images/libero_inference_efficiency_results.png)
*图：论文项目页给出的 LIBERO 推理效率对比。OpenVLA-OFT 通过并行解码和动作分块显著降低延迟，并将动作生成吞吐提升到原始 OpenVLA 的约 26 倍。*

##### 核心伪代码

```python
# OpenVLA-OFT: continuous chunk prediction with parallel decoding
# o: image observations, l: language instruction, p: proprio state (optional)
# H: action chunk length

tokens = tokenize_images_and_text(o, l, p)
hidden = openvla_backbone(tokens)

# Reserve H output positions and decode all action steps in parallel
chunk_states = hidden[-H:]
pred_actions = action_head(chunk_states)      # shape: [H, action_dim]

loss = 0.0
for t in range(H):
    loss += l1(pred_actions[t], gt_actions[t])
loss = loss / H

loss.backward()
optimizer.step()
```

##### 动机与背景

原始 OpenVLA 的核心优势在于把大规模视觉语言预训练迁移到机器人控制中，但它仍继承了典型的 VLM 风格动作输出方式: 先把连续动作离散成 token，再逐 token 自回归生成。这种设计在语义对齐上很自然，却会直接带来两个控制层面的代价。第一，**推理太慢**。每次控制都要顺序解出整段动作 token，控制频率很容易被卡住。第二，**动作表示和控制需求不匹配**。真实机器人要的是连续、平滑、成块的动作轨迹，而不是语言模型式的离散词表采样。

OFT 这篇论文的切入点不是“再造一个更大的 VLA”，而是更务实的问题：如果我们已经有了 OpenVLA 这样的强骨干，怎样微调才能同时提高成功率、速度和部署灵活性？作者把设计空间拆成几个最关键的维度来系统比较：是自回归还是并行解码，是离散动作还是连续动作，是单步还是动作分块，以及损失函数该用交叉熵、MSE 还是 L1。最后他们给出的答案不是某一个单点技巧，而是一整套组合配方 OFT。

> 💡 关键：OFT 的贡献本质上是把 “面向语言建模的输出方式” 改造成 “面向机器人控制的输出方式”。它没有推翻 OpenVLA 的视觉语言骨干，而是把最影响控制效率和动作质量的输出层与训练目标重新设计了一遍。

##### 核心机制一：从自回归离散 token 到并行连续动作块

原始 OpenVLA 的动作预测可以概括为一个标准自回归形式：

$$
p(a_{1:T}\mid o, l)=\prod_{t=1}^{T} p(a_t \mid a_{<t}, o, l)
$$

这里的 \(a_t\) 不是直接的连续控制量，而是离散化后的动作 token。这样做的优点是完全复用语言模型的 next-token 预测机制，但问题是每个 token 都要顺序生成，延迟会随着输出长度线性累积。对于机器人控制，尤其是双臂、高频、长动作序列场景，这种方式非常吃亏。

OFT 改成预测一个长度为 \(H\) 的连续动作块：

$$
\hat{\mathbf A}_{1:H} = f_\theta(o, l, p)
$$

其中 \(p\) 是可选的本体状态输入，\(\hat{\mathbf A}_{1:H}\) 表示接下来 \(H\) 步的连续动作向量。也就是说，模型一次前向就给出整段动作块，而不是一个 token 一个 token 地吐。这样设计有两个直接后果。其一，**parallel decoding** 让延迟显著下降；其二，**action chunking** 让模型天然学习短时间范围内的轨迹连贯性，而不是孤立地预测每一个原子动作。

##### 核心机制二：为什么连续动作和 L1 目标反而更适合微调

论文的一个重要结论是，在 OpenVLA 微调这个问题上，更复杂的动作生成目标未必更好。作者比较了离散动作、连续动作、不同解码方式和不同损失目标后，发现一个简洁但非常有效的组合：**连续动作表示 + L1 回归**。训练目标可以写成：

$$
\mathcal{L}_{\text{OFT}} = \frac{1}{H}\sum_{t=1}^{H}\lVert \mathbf a_t - \hat{\mathbf a}_t \rVert_1
$$

这个设计有很强的工程直觉。离散动作虽然兼容语言模型，但会引入量化误差；而 MSE 会更重地惩罚离群值，在示教数据稍有噪声时容易把策略往“平均动作”上拉。L1 则更稳健，特别是在真实机器人演示含有轻微抖动、深浅不一致、末端偏移等噪声时，L1 往往会学到更保守但更可靠的中位型控制策略。论文项目页还专门展示了一个现象：扩散策略会精确复现演示里的坏习惯，而 L1 策略反而会把这些噪声“滤掉”。

> ⚠️ 注意：作者并没有声称 L1 在所有 imitation learning 问题上都优于 diffusion。论文更准确的结论是，在 OpenVLA 微调和当前真实机器人示教噪声条件下，L1 配合高容量 VLA 骨干是一种更稳、更快、更容易部署的折中。

##### 核心机制三：多输入与高频双臂控制

OFT 还解决了原始 OpenVLA 在输入输出规格上的不灵活问题。原版 OpenVLA 更偏向单图像、单臂、低频动作接口，而真实机器人通常需要多视角相机、可选本体状态，以及更高的控制频率。OFT 把这些都纳入统一微调配方：LIBERO 设置里可以使用第三视角和腕部相机；ALOHA 设置里可以同时输入第三视角和双腕相机，再配合 14 维双臂动作输出与更长的 action chunk，形成能直接驱动双臂操作的高频控制策略。

在语言跟随上，作者进一步提出 **OpenVLA-OFT+**，在视觉特征中注入 **FiLM** 调制，让语言信息不只出现在输入 prompt 中，而是更深地影响视觉表征。这个调制形式可写成：

$$
\mathrm{FiLM}(v; l)=\gamma(l)\odot v + \beta(l)
$$

其中 \(v\) 是视觉特征，\(\gamma(l)\) 和 \(\beta(l)\) 由语言条件生成。这样做的作用，是把“这次到底要 scoop pretzels 还是 scoop raisins”这类语言差异更强地灌进每一层视觉处理过程里，从而提升细粒度语言接地和多任务切换能力。

##### 与 OpenVLA 和扩散式 VLA 的区别

和原始 OpenVLA 相比，OpenVLA-OFT 的核心不是更大，而是**更像一个控制策略**。OpenVLA 侧重把 VLM 接到动作 token 上，证明开源 VLA 可行；OFT 则进一步证明，真正把 VLA 用到实际微调和部署时，输出头、动作表示和损失目标比单纯增大骨干更关键。相比扩散式 VLA 如 \( \pi_0 \) 或 RDT-1B，OFT 牺牲了部分生成分布表达能力，但换来更低延迟、更高吞吐，以及在噪声示教条件下更强的执行稳定性。

这也是为什么它在论文里能同时出现两类提升：一类是 **LIBERO 上从 76.5% 到 97.1% 的成功率提升**，另一类是 **26x 的动作生成吞吐提升**。前者说明这不是“只快不准”的工程优化，后者说明它又不是“只准不实用”的离线模型。对 VLA 真正走向真实机器人部署而言，这种同时优化成功率和控制频率的配方，比单纯再做一个更大的 foundation model 更有落地意义。

#### 🧪 练习题

```yaml
question: "下列哪一组设计最准确地构成了 OpenVLA-OFT 的核心 OFT 配方？"
options:
  - "自回归解码 + 离散动作 bin + 交叉熵损失 + 单步输出"
  - "并行解码 + 动作分块 + 连续动作表示 + L1 回归目标"
  - "扩散采样 + 连续动作表示 + 奖励模型重排序 + PPO 优化"
  - "多智能体协作 + 检索增强推理 + 3D 点云世界模型"
answer: 1
explain: "OFT 的核心贡献不是换骨干，而是给 OpenVLA 设计了一套更适合控制的微调配方：并行解码、动作分块、连续动作表示和 L1 回归，这四者共同带来了速度和成功率提升。"
```
