### NeuroVLA: 类脑视觉-语言-动作模型

```yaml
id: neurovla
full_name: 类脑VLA (Neuromorphic Vision-Language-Action)
year: 2026
org: AI² Robotics (智平方) / HKUST(GZ)
category: transformer_policy
parent: hpt
arxiv: "2601.14628"
paper_url: "https://arxiv.org/abs/2601.14628"
motivation: >
  模拟生物运动神经系统(皮层-小脑-脊髓)三层分工架构，
  在神经形态芯片上实现0.4W功耗、<20ms安全反射、
  75%抖动抑制、few-shot学习超越预训练基线。
```

**一句话总结**：NeuroVLA首次在物理机器人上部署神经形态VLA，通过模拟皮层（语义规划）→小脑（状态调制/阻尼）→脊髓（脉冲SNN执行）三层生物运动架构，在仅用几百条下游样本微调的情况下，自发涌现出平滑轨迹、节能脉冲、时序记忆和<20ms碰撞反射等生物运动特性，抖动降低75%以上，神经形态芯片功耗仅0.4W。

---

### 核心要点

1. **三层生物启发的解耦架构**：将VLA控制分解为Cortical（Qwen-VL + Q-Former生成语义意图）、Cerebellar（GRU状态估计 + Gated FiLM增益调制）、Spinal（LIF脉冲神经网络 + Spiking ResNet）三个功能模块，分别运行在CUDA计算层和神经形态芯片层，严格对应生物运动系统的皮层→小脑→脊髓通路。

2. **小脑计算原理是关键创新**：Cerebellar模块实现了Gated Feature-wise Linear Modulation (FiLM)——用GRU编码本体感觉历史(关节角/速度/力矩)→产生scale & shift参数→对皮层语义latent进行仿射调制，同时通过Iterative Refinement Loop (K=2)模拟Efference Copy（传出副本）的前向内部模型，实现"数字肌肉记忆"，无需重新调用重型的VLM即可实时补偿摩擦力/重力。

3. **脉冲神经网络的涌现特性**：Spinal LIF网络采用stateful membrane dynamics（膜电位跨时间步保持），自然获得隐式时序工作记忆；网络自发涌现temporal sparsity（静止时神经元休眠）和spatial disentanglement（高维控制信号自动分离为不同行为模式），无需显式监督即实现节能和功能专门化。

4. **极致的能效与快速反射**：神经形态芯片仅0.4W功耗；碰撞检测到撤回反射<20ms（绕过>200ms的皮层回路延迟），实现"生存先于理解"的安全保障；few-shot微调（仅几百条样本）即超越预训练基线。

5. **抖动抑制与身体智能涌现**：小脑模块作为自适应阻尼器，将运动学jerk降低75%以上；在嘈杂视觉反馈下仍保持时序节律性（预测任务阶段而非单纯反应），展现出生物运动特有的平滑流畅特性。

---

### 深入细节

#### 1. 三层架构的形式化分解 (POMDP + Tri-Level Controller)

论文将具身控制建模为POMDP：每时刻t接收多模态观测o_t（RGB图像I_t、语言指令L、本体感觉历史s_{t-H:t}含关节位置/速度/末端6-DoF力），目标为生成连续动作a_t。控制策略被严格分解为三个映射函数的层级组合：

```
a_t = Phi_spine( Phi_cerebellum( Phi_cortex(I_t, L), h_t ) )
```

其中动态上下文向量h_t由神经状态估计器从本体感觉历史中提取。这种分解明确了各模块的功能边界和运作时标：
- **Cortical (CUDA)**: 抽象语义意图z_sem，低频（~5-10Hz级），处理"做什么"
- **Cerebellar (CUDA)**: 基于物理状态的增益调制，中频（~50Hz级），处理"如何协调"
- **Spinal (神经形态芯片)**: 脉冲驱动动作解码，高频（>100Hz级），处理"精准执行"

![NeuroVLA架构总览](https://ar5iv.labs.arxiv.org/html/2601.14628/assets/x1.png)

#### 2. Cerebellar Module的Gated FiLM与迭代精炼机制

这是论文最具原创性的设计，模拟小脑的传出副本（Efference Copy）原理。具体流程：

**步骤一：GRU状态估计**
本体感觉历史s_{t-H:t}（含关节角度、速度、6-DoF力/力矩）通过GRU编码为紧凑的动态上下文h_t。GRU能捕捉变化率和接触瞬态（如碰撞脉冲），这些是静态MLP编码器无法获取的关键物理信息。

**步骤二：门控FiLM调制**
首先通过可学习门控因子g_t = sigma(W_g · Proj(h_t))选择性调控物理上下文对皮层计划的影响程度——防止稳定阶段的感受噪声淹没语义意图。随后将h_t投影为仿射变换参数(gamma_t, beta_t)，对皮层语义latent z_sem进行调制：

```
z_mod = (1 + gamma_t) * (z_sem * g_t) + beta_t
```

这一操作实现严格的增益控制：例如碰撞检测时，可将前向速度编码抑制（gamma_t ≈ -1）并注入撤回偏置（beta_t），实时重写运动计划，无需唤醒皮层VLM。

**步骤三：迭代精炼循环（K=2）**
每轮迭代预测试探性动作latent → 更新预期状态演化 → 重新调制输入。这一递归过程充当计算化的"心理模拟"，在执行前预先补偿预期动力学误差（重力、摩擦等），有效缩小Sim-to-Real差距。

```python
# Cerebellar FiLM + Iterative Refinement 伪代码
z_mod = z_sem  # 初始化为皮层语义latent
for k in range(K):  # K=2, 迭代精炼次数
    h_t = GRU(s_hist)                    # 状态估计 (本体感觉历史)
    g_t = sigmoid(W_g @ proj(h_t))       # 门控因子 [0,1]
    gamma_t, beta_t = f_gamma(h_t), f_beta(h_t)  # 调制参数
    z_mod = (1 + gamma_t) * (z_mod * g_t) + beta_t  # FiLM调制
    s_next = predict_state(z_mod)        # 前向内部模型: 预测下一状态
    s_hist = update(s_hist, s_next)      # 更新状态历史 (Efference Copy反馈)
return z_mod  # 调制后的运动latent，送入Spinal模块
```

#### 3. 脉冲神经网络的LIF动力学与Spiking ResNet架构

**Stateful LIF神经元**：脊髓模块采用Leaky Integrate-and-Fire (LIF)模型，关键设计是膜电位u在连续时间步之间严格保持（非每步归零）：

```
u_i^(l)[tau] = beta * u_i^(l)[tau-1]
             + sum_j w_ij * s_j^(l-1)[tau]
             - s_i^(l)[tau-1] * theta
```

其中beta∈(0,1)为膜衰减因子，s_j^(l-1)[tau]∈{0,1}为前层脉冲序列，theta为复位电压。这一stateful设计赋予脊髓底物**隐式时序工作记忆**——无需显式循环门控单元（如LSTM）即可编码历史依赖特征。当输入静止时，膜电位自然衰减至静息态（temporal sparsity涌现），大幅降低功耗。

**深度脉冲残差架构**：为避免深层SNN的信号退化，采用Spiking ResNet设计：

```
x^(l+1) = x^(l) + LIF( Linear( x^(l) ) )
```

残差跳跃连接保证梯度无损传播，使深层SNN能学习复杂的感觉运动转换，同时保持脉冲编码的稀疏优势和时序记忆能力。

#### 4. 涌现的生物运动特性与实验结果

论文报告了四项无需额外数据或显式监督即自发涌现的生物运动能力：

| 涌现特性 | 表现 | 生物学对应 |
|---------|------|-----------|
| **运动阻尼** | 高频意图震颤被抑制，jerk降低>75% | 小脑对运动指令的平滑滤波 |
| **时序节律** | 在噪声视觉下仍预测任务阶段 | 小脑时序记忆与误差校正 |
| **时空稀疏** | 静止时神经元自发休眠 | 生物神经元的能量最小化 |
| **碰撞反射** | <20ms触觉反射（vs皮层>200ms）| 脊髓反射弧绕过脑皮层 |

**Few-shot学习能力**：仅使用VLM预训练权重加几百条下游样本微调，任务成功率超越使用大规模专家数据预训练的基线方法，证实层次化解耦架构的样本效率优势。

**能效**：神经形态芯片层（Spinal SNN）运行功耗仅0.4W，相比传统需要GPU全时推理的VLA方案，在大规模部署中具有显著的能耗优势。

![神经形态芯片能效对比](https://ar5iv.labs.arxiv.org/html/2601.14628/assets/x6.png)

#### 5. 训练策略：混合目标函数与代理梯度

系统端到端训练，采用混合目标函数：行为克隆损失（MSE/负对数似然）+ 脉冲分量代理梯度（surrogate gradient method处理不可微的脉冲发放函数）。关键设计是三层模块虽功能解耦，但通过端到端梯度流保持功能一致性——皮层语义latent的更新受下游小脑调制效果和脊髓执行结果的反馈约束，确保"what to do"和"how to do"在优化层面保持协同。

---

### 练习题（选做）

1. **架构分析**：Cerebellar Module的Iterative Refinement（K=2）与标准Transformer的multi-step reasoning有何本质区别？如果K增大至5，可能带来什么副作用？

2. **神经形态实现**：LIF神经元的stateful membrane dynamics提供了隐式时序记忆。请设计实验验证这一记忆机制对周期性运动任务（如搅拌、擦桌子）的性能提升是否超过显式GRU/LSTM。

3. **安全与反射**：碰撞反射<20ms绕过了>200ms的皮层回路。如果机器人在高速运动中频繁触发这种短路反射，可能对任务成功率造成什么影响？如何在反射速度与任务坚持之间取得平衡？

4. **可解释性**：Gated FiLM的调制参数(gamma_t, beta_t)提供了物理状态的"可读"编码。请提出一种可视化方法，展示不同任务阶段（接近物体→抓取→提起）的这些调制参数如何变化，并分析其与小脑功能区域（前庭小脑/脊髓小脑/大脑小脑）的对应关系。
