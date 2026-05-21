### NeuroVLA

```yaml
id: neurovla
name: NeuroVLA
full_name: 神经形态视觉-语言-动作 (NeuroVLA)
year: '2026.01'
org: AI2 Robotics / HKUST(GZ)
paper_url: https://arxiv.org/abs/2601.14628
project_url: ''
category: transformer_policy
parent: hpt
motivation: 模拟皮层-小脑-脊髓分层控制，实现低功耗快速反射
```

#### 📝 一句话总结
NeuroVLA 提出了一种模仿皮层、小脑和脊髓分工的神经形态 VLA 架构，把高层语义规划、基于本体感觉的运动稳定化和脉冲式快速执行拆成三级控制回路，在真实机器人上同时实现了更平滑的动作、更低的能耗以及小于 20ms 的安全反射。

#### 🎯 核心要点
- 提出 **Neuromorphic Vision-Language-Action (NeuroVLA)**：首个部署到真实机器人的神经形态 VLA
- 三层类脑架构：**Cortical** 负责语义规划，**Cerebellar** 负责高频传感反馈下的稳定化调制，**Spinal** 负责超低时延动作生成
- Cerebellar 模块使用 **GRU + gated FiLM + iterative refinement**，把本体感觉历史转成对高层意图的动态增益调制
- Spinal 模块采用 **LIF 脉冲神经网络** 与脉冲残差结构，利用神经形态处理器执行动作解码
- 在无额外指导信号的情况下，涌现出抖动抑制、时序记忆、能量稀疏和快速反射等“生物运动特性”
- 论文强调 **0.4W 神经形态功耗** 与 **<20ms 安全反射**，对实时具身控制尤其关键
- 通过少量下游样本微调即可超过纯预训练基线，体现出生物启发分层结构带来的样本效率

#### 🔬 深入细节
##### 核心架构图

![NeuroVLA 架构总览](https://ar5iv.labs.arxiv.org/html/2601.14628/assets/x1.png)
*图：论文总览图。NeuroVLA 将控制链条拆为皮层规划、小脑调制和脊髓执行三层，分别对应低频语义决策、中频状态稳定化和高频脉冲式动作生成。*

##### 结果图：能效与快速反射

![NeuroVLA 的神经形态能效与反射能力](https://ar5iv.labs.arxiv.org/html/2601.14628/assets/x6.png)
*图：论文结果图之一，展示神经形态执行层在低功耗和快速反射上的优势。*

##### 核心伪代码

```python
# NeuroVLA: cortex -> cerebellum -> spinal cord
# I_t: image observation, L: language instruction
# s_hist: proprioceptive history (joint / velocity / force)

z_sem = cortex_vlm(I_t, L)                 # high-level goal / semantic intent
h_t = GRU(s_hist)                          # compact dynamic state
g_t = sigmoid(W_g @ proj(h_t))             # gating from proprioception
gamma_t, beta_t = film_params(h_t)         # modulation parameters

z_mod = (1.0 + gamma_t) * (z_sem * g_t) + beta_t

for _ in range(K):                         # iterative refinement loop
    z_mod = refine_with_forward_model(z_mod, s_hist)

spikes = spinal_snn(z_mod)                 # LIF spiking rollout on neuromorphic chip
action = decode_action(spikes)
```

##### 动机与背景

传统 VLA 模型的强项在于把视觉和语言语义对齐后直接映射到动作，但它们通常仍像“大一统前馈策略”一样工作：高层理解、运动稳定、快速反射都被塞在同一条控制通路里。这会带来两个典型问题。第一，策略容易抖动，因为模型缺少类似生物小脑那样针对动态误差做高频阻尼和修正的结构。第二，安全反射不够快，因为所有信息都要经过高层语义回路，无法像脊髓反射那样本地快速闭环。

NeuroVLA 的思路不是单纯增大 VLA 规模，而是重新设计控制分工。论文把生物神经系统里的皮层、小脑、脊髓映射到具身模型里：皮层负责“做什么”，小脑负责“怎么更稳”，脊髓负责“怎么更快”。这让系统从一开始就具有多时标、多路径的控制结构，而不是让单一模型同时兼顾所有控制目标。

> 💡 关键：NeuroVLA 的创新点不只是“把 SNN 接到 VLA 后面”，而是把具身控制问题显式分解为语义规划、动态稳定和快速执行三种不同时间尺度的子问题，再用不同计算底层分别实现。

##### 核心机制一：皮层语义计划 + 小脑状态调制

论文将控制过程抽象为一个层级组合：

$$
a_t = \Phi_{\text{spine}}\big(\Phi_{\text{cerebellum}}(\Phi_{\text{cortex}}(I_t, L), h_t)\big)
$$

其中 \(I_t\) 是视觉输入，\(L\) 是语言指令，\(h_t\) 是由本体感觉历史提取出的动态上下文。高层的 Cortical 模块先从图像和语言得到语义意图 \(z_{\text{sem}}\)，而不是直接出最终动作。之后，小脑模块再用来自关节位置、速度、力/力矩等本体感觉历史的信息，去重新塑形这个语义意图。

具体地，Cerebellar 模块使用一个 GRU 对状态历史编码，并通过 gated FiLM 风格的调制把动态身体状态写回语义 latent：

$$
z_{\text{mod}} = (1+\gamma_t)\,(z_{\text{sem}}\cdot g_t) + \beta_t
$$

这里 \(g_t\) 是门控因子，\(\gamma_t\) 和 \(\beta_t\) 是由本体感觉上下文生成的调制参数。直觉上，这一步相当于“让身体状态去修正意图”。例如，当机器人检测到接触扰动或运动抖动时，小脑模块不必重新调用重型 VLM 做语义重推理，而是直接基于动态反馈对高层意图做增益抑制、偏置补偿和阻尼修正。

##### 核心机制二：迭代精炼与数字化传出副本

论文进一步加入了 iterative refinement loop，用来模拟生物系统中的 efference copy。也就是说，系统并不是只调制一次高层意图就结束，而是把“当前动作计划会引起怎样的状态变化”纳入一个短回路里反复精炼。这个机制的意义在于：在动作真正交给执行层之前，模型已经提前在内部做了一次或多次快速动力学修正。

这类设计与普通 Transformer 的多层前馈不同，它不是单纯加深网络，而是在结构上显式引入“动作意图 - 预测状态 - 再修正意图”的闭环。对于机器人控制，这一步尤其重要，因为真实误差很多并不来自视觉理解，而来自摩擦、关节迟滞、重力补偿不准和瞬时接触扰动。论文报告的抖动下降和更平滑的轨迹，本质上就是这种中频稳定化回路在起作用。

> ⚠️ 注意：NeuroVLA 的目标不是让皮层模块更强，而是让高层规划不要承担本该由低层控制系统处理的快速稳定任务。这样既减少高层负担，也使高频控制不再被大模型推理延迟拖慢。

##### 核心机制三：脊髓式脉冲执行与快速反射

NeuroVLA 最具“神经形态”特征的部分在于 Spinal 层。这里论文使用 LIF（Leaky Integrate-and-Fire）神经元构建脉冲网络，并部署到神经形态处理器上做动作执行。典型的膜电位更新形式可以写成：

$$
u_i^{(l)}[\tau] = \beta u_i^{(l)}[\tau-1] + \sum_j w_{ij}s_j^{(l-1)}[\tau] - s_i^{(l)}[\tau-1]\theta
$$

其中 \(u\) 是膜电位，\(\beta\) 是衰减系数，\(s\) 是离散脉冲发放，\(\theta\) 是发放阈值。与常规 ANN 不同，这种状态会在时间上自然积累和泄漏，因此不需要显式 RNN，也能保留一部分短时动态记忆。论文把这种性质与 temporal memory、temporal sparsity 以及快速 reflex 联系起来。

更重要的是，这个脊髓层不必经过完整的高层语义通路就能响应高风险输入。于是碰撞或异常力反馈出现时，可以直接触发本地快速反射，论文给出的量级是 **小于 20ms**。这和依赖高层 VLM 重新规划的路径相比，时延差距是决定性的。与此同时，神经形态执行层的功耗只有 **0.4W**，说明它不仅快，而且便宜，适合长时间运行的实体机器人。

##### 与传统 VLA 的区别

如果把 OpenVLA、RT-2 这类方法看作“强语义、大一统”的 VLA，那么 NeuroVLA 更像“多层闭环控制系统”。它没有放弃 VLA 的语义能力，而是承认机器人控制里存在不同的时间尺度和不同的计算需求：高层需要强语义，中层需要状态估计和阻尼，低层需要快速局部反射。传统方法通常把这些问题都压到单一大模型里统一求解，而 NeuroVLA 则通过结构分工把它们拆开。

这也是为什么论文强调的不只是成功率，而是一些更偏控制系统属性的指标：**抖动降低、时序记忆、反射延迟、能耗**。这些指标共同说明，NeuroVLA 不仅在“会不会做任务”上发力，也在“动作是否更像一个真实生物控制系统”上发力。对于 VLA 进入高速、接触丰富、人机共处的真实场景，这种转向是有意义的。

#### 🧪 练习题

```yaml
question: "NeuroVLA 中负责利用高频本体感觉反馈对高层语义意图进行稳定化调制的模块是哪个？"
options:
  - "Cortical 模块，因为它负责理解语言和视觉"
  - "Cerebellar 模块，因为它负责基于状态历史进行动态增益调制"
  - "Spinal 模块，因为它直接在神经形态芯片上输出动作"
  - "训练数据清洗模块，因为它降低了动作噪声"
answer: 1
explain: "NeuroVLA 的 Cerebellar 模块对应生物小脑，核心职责就是读取本体感觉历史并通过 gated FiLM 和迭代精炼去修正高层意图，从而抑制抖动并提升运动稳定性。"
```
