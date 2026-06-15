### AIST++ — 面向音乐条件 3D 舞蹈生成的数据集与 FACT 基线

```yaml
id: aistpp
name: AIST++
full_name: "AI编舞师 (AI Choreographer)"
year: "2021"
org: "Google"
paper_url: "https://arxiv.org/abs/2101.08779"
category: "body_motion"
parent: "groovenet"
motivation: "大规模舞蹈数据集与基线"
```

#### 📝 一句话总结

AIST++ 提供大规模音乐-3D 舞蹈动作配对数据，并提出 FACT 全注意力跨模态 Transformer，从音乐和短 seed motion 自回归生成长时 3D 舞蹈。

#### 🎯 核心要点

- **数据集贡献**：5.2 小时、1408 个 3D 舞蹈序列、约 1.1M 帧、30 名舞者、10 类舞蹈、60 段音乐
- **多视角重建**：基于 AIST 多视角视频和相机标定，拟合/重建 SMPL 3D motion 与全局位移
- **输出表示**：舞蹈表示为 joint rotations 加 global translation，便于角色重定向
- **FACT 模型**：Full-Attention Cross-modal Transformer，融合 music encoder 和 seed motion encoder
- **future-N supervision**：一次预测多个未来帧，缓解自回归模型的冻结和漂移
- **early fusion**：早期跨模态融合音乐与动作，使生成动作更依赖输入音乐差异
- **评估方式**：包含客观指标和用户研究，关注动作真实感与音乐相关性

#### 🔬 深入细节

##### 核心示意图

![AIST++ FACT 框架](https://ar5iv.labs.arxiv.org/html/2101.08779/assets/figs/model.png)
*图：FACT 接收音乐片段和 2 秒 seed motion，经跨模态 Transformer 预测未来动作，并自回归生成长舞蹈序列。*

##### 核心流程伪代码

```python
# FACT 训练与生成简化
for music, motion in AISTpp:
    seed = motion[t - seed_len:t]
    target = motion[t:t + future_N]
    music_window = extract_music_features(music, t)

    music_tokens = music_transformer(music_window)
    seed_tokens = motion_transformer(seed)
    fused = cross_modal_transformer(music_tokens, seed_tokens)  # full attention
    pred_future = motion_head(fused)

    loss = rotation_loss(pred_future, target)
    loss += translation_loss(pred_future.root, target.root)
    loss += velocity_smoothness_loss(pred_future)
    loss.backward()

def generate_dance(music, seed):
    motion = list(seed)
    while not end(music):
        pred = FACT(music_window(music), last_2_seconds(motion))
        motion.extend(pred[:step_size])  # autoregressive rollout
    return motion
```

##### 方法解读

AIST++ 的第一贡献是把“跳舞视频”变成可训练的 3D 动作数据。原始 AIST Dance Video Database 有多视角同步视频和音乐，论文利用相机参数、2D pose 检测和 SMPL fitting 重建 3D 人体运动。最终每帧包含 SMPL pose、global translation、3D/2D keypoints 等标注，使音乐条件舞蹈生成从小规模 mocap 走向较大规模视频重建数据。

音乐到舞蹈是强一对多问题：同一段音乐可以有很多合理编舞，同一动作也能配不同音乐。AIST++ 的基线不是把音乐直接回归成下一帧，而是给模型一段 seed motion，让生成保持当前舞蹈风格和相位，再由音乐决定后续节奏与动作变化。

FACT 的三个关键设计是 full attention、future-N supervision 和 early fusion。full attention 让 seed motion 和音乐 token 在较短上下文内充分交互；future-N supervision 让模型一次学习一段未来动作，而非只预测一帧，从而减少自回归 rollout 时的均值化和冻结；early fusion 则迫使模型在深层前就建立音乐-动作对应，而不是最后简单拼接条件。

形式上，模型学习：

$$
\hat{X}_{t:t+N}=F_\theta(M_{t-w:t+N}, X_{t-s:t})
$$

其中 \(M\) 是音乐特征，\(X_{t-s:t}\) 是 seed motion，输出是未来 \(N\) 帧舞蹈。测试时不断把已生成片段作为新 seed，滚动生成长序列。

与 GrooveNet 早期的 FCRBM 相比，AIST++ 的差异在数据规模、3D 表示和模型容量。GrooveNet 证明了实时音乐驱动动作的可能性，但训练数据很小；AIST++ 提供更大、更标准的 3D 舞蹈 benchmark，并把 Transformer 作为跨模态建模基线。

> 💡 关键：AIST++ 的长期影响不只在 FACT，而是把音乐-舞蹈生成任务标准化为可复现的数据集和评测问题。

#### 🧪 练习题

```yaml
question: "FACT 中 future-N supervision 的主要目的是什么？"
options:
  - "一次预测多个未来帧，减少自回归生成中的冻结和漂移"
  - "只预测音乐节拍，不预测动作"
  - "把 3D 动作转换为 2D 图片"
  - "删除 seed motion 输入"
answer: 0
explain: "如果只预测下一帧，自回归 rollout 容易回归到均值并逐渐冻结。future-N supervision 让模型学习一段未来运动结构，提高长序列稳定性。"
```
