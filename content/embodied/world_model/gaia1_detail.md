### 自动驾驶生成式AI (GAIA-1)

```yaml
id: gaia1
name: GAIA-1
full_name: 自动驾驶生成式AI (Generative AI for Autonomy)
year: "2023.10"
org: Wayve
paper_url: "https://arxiv.org/abs/2309.17080"
category: generative
parent: videogpt
motivation: "9B参数模型预测驾驶场景理解交通规则"
```

#### 📝 一句话总结

GAIA-1 将自动驾驶世界建模表述为多模态 token 的下一 token 预测问题，用视频、文本和动作条件生成可控驾驶视频，解决了真实道路长尾场景难以穷尽采集和测试的问题。

#### 🎯 核心要点

- **多模态输入**：同时利用视频、文本和动作信号，生成真实感驾驶场景
- **统一 token 序列建模**：将视频和文本离散化为 token，将速度、曲率等动作标量投影到共享表示
- **自回归 world model**：核心 6.5B 参数 Transformer 根据历史图像 token、文本 token 和动作 token 预测未来图像 token
- **视频扩散解码器**：2.6B 参数 diffusion decoder 将预测出的图像 token 转回像素视频，提高视觉真实感和时序一致性
- **总规模超过 9B 参数**：Wayve 技术报告版本比早期 1B GAIA-1 扩展到 9B 级别
- **驾驶数据训练**：使用 2019-2023 年在伦敦采集的约 4,700 小时专有驾驶数据
- **可控生成能力**：支持未来 rollout、文本改写场景属性、动作控制 ego vehicle 行为、无条件采样等模式

#### 🔬 深入细节

##### 核心示意图

![GAIA-1 模型架构](https://wayve.ai/wp-content/uploads/2023/09/gaia_schematic_animated_v2.gif)
*图：GAIA-1 将视频、文本和动作编码到共享 token 序列，经 autoregressive transformer 预测未来 token，再用视频 diffusion decoder 还原为驾驶视频。*

##### 动机与背景

自动驾驶系统需要理解未来可能发生什么，尤其是 ego vehicle 的动作会如何改变周围交通参与者和道路状态。真实世界采集覆盖不了所有危险组合，传统仿真又常缺少视觉真实感和行为多样性。GAIA-1 的目标是做一个神经世界模型，让模型从真实驾驶数据中学习“场景如何随动作和语义条件演化”。

GAIA-1 把世界建模转成类似语言模型的 next-token prediction。给定历史视频 token \(v_{\le t}\)、文本 token \(c\) 和动作 token \(a_{t:t+H}\)，world model 学习未来视觉 token 分布：

$$
p_\theta(v_{t+1:t+H} \mid v_{\le t}, c, a_{t:t+H})
=
\prod_{i=t+1}^{t+H}
p_\theta(v_i \mid v_{<i}, c, a_{t:i})
$$

视频 tokenizer/encoder 负责把视觉输入离散化，文本 encoder 负责将提示词变成条件 token，动作 encoder 则把速度、曲率等连续控制量投影到同一个时间轴上。所有条件在时间上对齐后输入 Transformer。

生成出的并不是最终像素，而是未来图像 token。GAIA-1 再用视频 diffusion decoder 将 token 转换为像素空间视频。这个设计结合了 autoregressive token model 的可控序列建模能力和 diffusion decoder 的高保真视觉生成能力。

##### 算法伪代码

```python
# GAIA-1 world model training
initialize(video_encoder, text_encoder, action_encoder)
initialize(autoregressive_world_model, video_diffusion_decoder)

for clip, text_prompt, ego_actions in driving_batches:
    video_tokens = video_encoder.discretize(clip)
    text_tokens = text_encoder(text_prompt)
    action_tokens = action_encoder(ego_actions)  # speed, curvature, steering-like signals

    aligned_tokens = temporal_align(video_tokens, text_tokens, action_tokens)
    logits = autoregressive_world_model(aligned_tokens[:-1])
    token_loss = cross_entropy(logits, video_tokens[1:])

    predicted_tokens = sample_or_teacher_force(logits)
    reconstructed_video = video_diffusion_decoder(predicted_tokens)
    decoder_loss = diffusion_reconstruction_loss(reconstructed_video, clip)

    optimize(all_trainable_modules, token_loss + decoder_loss)

# Controlled generation
context_tokens = video_encoder.discretize(context_video)
condition = encode(text="make it snowy at night", actions=future_speed_curvature)
future_tokens = autoregressive_sample(world_model, context_tokens, condition)
future_video = video_diffusion_decoder(future_tokens)
```

##### 方法机制拆解

GAIA-1 的文本条件可以修改场景属性，例如天气、光照、交通灯颜色或道路状态；动作条件可以控制 ego vehicle 的未来行为，例如转向、速度和曲率。多模态条件让生成结果不仅是“看起来像驾驶视频”，还可以成为可干预的 what-if 场景。

与 VideoGPT 相比，GAIA-1 的任务更具体也更具控制需求。VideoGPT 主要展示通用视频生成，而 GAIA-1 面向自动驾驶：它需要生成道路几何、交通参与者、信号灯、车道线和 ego motion 之间的耦合关系。这要求模型同时学习视觉语义和交通动力学。

与传统仿真相比，GAIA-1 不依赖显式建模所有几何和材质，而是从真实驾驶视频中学习分布。优势是视觉真实感和场景多样性更强；限制是自回归长视频生成计算成本高，且 GAIA-1 技术报告阶段主要聚焦单摄像头输出，完整多相机闭环评估仍是后续方向。

> 💡 关键：GAIA-1 的世界模型不是单纯的视频生成器，而是条件化的驾驶未来预测器。动作条件使它能回答“如果车这样开，场景会怎样变化”。

#### 🧪 练习题

```yaml
question: "GAIA-1 将驾驶世界建模为 next-token prediction 的主要好处是什么？"
options:
  - "可以把视频、文本和动作统一到序列建模框架中，并预测可控的未来驾驶场景"
  - "可以完全不需要驾驶视频数据"
  - "可以只用单帧图像完成所有交通规则推理"
  - "可以避免任何形式的视频解码器"
answer: 0
explain: "GAIA-1 把不同模态映射为 token 序列，用自回归 Transformer 预测未来视觉 token，再由视频扩散解码器生成像素视频。"
```
