### UniMotion
```yaml
id: unimotion
name: UniMotion
full_name: "统一运动合成与理解 (Unifying 3D Human Motion Synthesis)"
year: "2025"
org: "ICRA 2025"
paper_url: "https://arxiv.org/abs/2502.23456"
category: body_motion
parent: mdm
motivation: "双向Transformer统一生成与理解"
```

#### 📝 一句话总结
UniMotion 提出统一的多模态运动扩散模型，把全局文本、帧级局部文本和 3D motion 放进同一个概率框架，同时支持层级 text-to-motion、motion-to-text 和联合生成。

#### 🎯 核心要点
- 统一合成与理解：同一模型既能从文本生成 motion，也能从 motion 预测帧级文本，还能无条件联合采样 motion 与局部描述。
- 全局+局部双层文本控制：全局文本描述整段动作意图，局部文本按时间对齐到具体动作片段，实现 hierarchical control。
- 多模态扩散：对 pose 和局部文本分别使用扩散时间变量，训练时覆盖不同条件组合和无条件分布。
- 时序对齐编码：局部文本 token 与 motion frame 对齐，避免只有 sequence-level prompt 时无法说明“什么时候发生什么动作”。
- 资料限制：manifest 中 `2502.23456` 返回不可用；本文使用公开论文 `https://arxiv.org/abs/2409.15904` 和项目页 `https://coral79.github.io/uni-motion/`。

#### 🔬 深入细节
##### 核心示意图/框架图
![UniMotion universality](https://arxiv.org/html/2409.15904v1/x1.png)
*图：UniMotion 的任务统一能力，包括层级文本生成运动、motion-to-text、无条件联合生成和文本编辑。*

##### 核心流程伪代码
```python
# UniMotion joint motion-text diffusion
for motion, global_text, local_text_segments in merged_dataset:
    x0 = encode_motion(motion)
    y0 = align_local_text_to_frames(local_text_segments)
    c = encode_global_text(global_text) if use_global_condition() else null

    tx = sample_motion_diffusion_step()
    ty = sample_text_diffusion_step()
    xt = diffuse_motion(x0, tx)
    yt = diffuse_local_text(y0, ty)

    condition_mask = sample_condition_subset(["global", "local", "motion", "none"])
    pred = transformer(xt, yt, c, tx, ty, condition_mask)
    loss = motion_denoise_loss(pred.motion, x0) + local_text_loss(pred.text, y0)
    update(loss)

def sample(global_text=None, local_text=None, observed_motion=None):
    return reverse_diffusion_with_available_conditions(global_text, local_text, observed_motion)
```

##### 方法解读
传统 text-to-motion 通常只接收一句全局 prompt，例如“a person walks then waves”。这种条件适合表达整体意图，但不擅长指定帧级时间线；反过来，帧级脚本能精确控制每段动作，却要求用户提供很细的标注。UniMotion 的出发点是把两种控制层级合并，并让模型同时具备运动理解能力。

在概率建模上，UniMotion 不是只学习 \(p(x\mid c)\)，而是学习 motion \(x\)、局部文本 \(y\) 与全局文本 \(c\) 之间的多种条件分布。可以把它理解为：
$$
p_\theta(x,y\mid c),\quad p_\theta(x\mid y,c),\quad p_\theta(y\mid x,c),\quad p_\theta(x,y).
$$
训练时随机遮蔽不同模态，让模型见到“只有全局文本”“只有局部文本”“全局+局部”“给定 motion 预测文本”等组合。

局部文本的时序对齐是核心机制。模型将每个动作片段的文本 token 对齐到 motion frame，使 Transformer 能在同一时间索引上比较“这一段文本”和“这一段姿态”。这比简单把所有文本拼成一句 prompt 更适合编辑，因为用户修改某个局部描述后，模型可以只在对应时间段重采样或调整 motion。

论文继承了 MDM 式的 motion diffusion 思想，但把文本也纳入多模态扩散。不同模态可拥有不同 diffusion timestep，意味着模型可以在“motion 很 noisy、文本较清晰”或“文本 noisy、motion 清晰”的状态下学习互相补全。这个设计是 motion-to-text 和联合生成的基础。

与 MotionGPT3 的差异在于，UniMotion 不强调 LLM 语言智能，而强调 motion 与帧级文本的概率统一和时序可编辑性；与普通 MDM 相比，它不只是生成动作，还能输出动作发生时间对应的文字解释。

#### 🧪 练习题
```yaml
question: "UniMotion 相比只使用全局 prompt 的 text-to-motion 模型，关键增强是什么？"
options:
  - "只生成单帧人体姿态"
  - "引入与 motion frame 对齐的局部文本，实现层级控制和帧级理解"
  - "完全取消扩散过程"
  - "只支持无条件生成"
answer: 1
explain: "UniMotion 将局部文本按时间对齐到动作帧，并与全局文本共同建模，因此能控制和解释动作在时间轴上的发生位置。"
```
