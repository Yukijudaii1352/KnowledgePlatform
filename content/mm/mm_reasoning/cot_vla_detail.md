### CoT-VLA — 视觉语言动作思维链 (Chain-of-Thought for Vision-Language-Action)

```yaml
id: cot_vla
name: CoT-VLA
full_name: "视觉语言动作思维链 (Chain-of-Thought for Vision-Language-Action)"
year: "2025"
org: "Stanford"
paper_url: "http://openaccess.thecvf.com/content/CVPR2025/html/Zhao_CoT-VLA_Visual_Chain-of-Thought_Reasoning_for_Vision-Language-Action_Models_CVPR_2025_paper.html"
category: compositional
parent: "llava_cot"
motivation: "CoT扩展至具身智能，提升机器人决策"
```

#### 📝 一句话总结

CoT-VLA 将视觉思维链引入视觉-语言-动作模型，在输出动作前先自回归生成未来子目标图像作为视觉推理中间状态，再预测短动作序列，解决现有 VLA 直接从当前观测到动作、缺少时间规划和视觉想象的问题。

#### 🎯 核心要点

- 把 CoT 从文本推理扩展到机器人控制：中间思维不是文字，而是未来子目标图像
- 基于统一视觉-语言模型生成视觉 token、文本 token 和动作 token
- 视觉 CoT 阶段预测未来图像帧，使模型先“想象目标状态”再行动
- 动作表示为 7-DoF 连续控制离散化后的 token，每个维度映射到 256 个 bin
- 使用 action chunking，一次预测 10 个连续动作以降低闭环控制的自回归开销
- 混合注意力机制：图像/文本 token 保持因果生成，动作 token 使用全注意力互相协调
- 两阶段训练：先用机器人演示和无动作视频预训练视觉预测，再在目标机器人数据上适配

#### 🔬 深入细节

##### 核心示意图

![CoT-VLA 方法动机](https://arxiv.org/html/2503.22020v1/x1.png)
*图：CoT-VLA 相比直接动作预测，先生成未来子目标图像作为视觉思维链，再据此产生动作。*

![CoT-VLA 模型结构](https://arxiv.org/html/2503.22020v1/x2.png)
*图：CoT-VLA 统一处理图像、语言、视觉思维和动作 token。*

![CoT-VLA 混合注意力](https://arxiv.org/html/2503.22020v1/x3.png)
*图：图像/文本生成使用因果注意力，动作 token 间使用全注意力以预测协调的动作 chunk。*

##### 算法伪代码

```python
# CoT-VLA test-time closed-loop control
def cot_vla_control_loop(env, instruction, model, visual_tokenizer):
    obs = env.get_observation()
    while not env.done():
        obs_tokens = visual_tokenizer.encode(obs.image)
        text_tokens = tokenize(instruction)

        # Visual Chain-of-Thought: 生成未来子目标图像 token
        subgoal_tokens = model.generate_visual_tokens(
            context=[obs_tokens, text_tokens],
            attention="causal"
        )

        # Action prediction: 基于当前观测、指令和子目标图像预测动作块
        action_tokens = model.predict_action_chunk(
            context=[obs_tokens, text_tokens, subgoal_tokens],
            chunk_size=10,
            attention_for_actions="full"
        )
        actions = dequantize(action_tokens, bins=256)

        for action in actions:
            obs = env.step(action)
            if env.done():
                break
```

##### 动机与背景

Vision-Language-Action 模型将图像观测和语言指令映射为机器人动作，但多数方法更像反射式策略：看到当前画面后直接预测动作。这对短程拾取可行，对长时操作、需要绕开障碍、先移动到子目标再执行的任务则缺少显式规划。

CoT-VLA 的关键假设是：机器人任务的中间推理更适合用视觉状态表示，而不是自然语言句子。未来子目标图像能直接编码物体位置、机械臂姿态、目标区域和空间关系，比“向左移动一点再靠近杯子”这类文本更精确。

##### 视觉思维链与训练目标

给定当前观测 \(o_t\) 和语言指令 \(l\)，模型先生成未来视觉 token \(\hat{s}_{t+k}\)，再预测动作序列 \(a_{t:t+C-1}\)。视觉生成损失为：

$$
\mathcal{L}_{\text{visual}}=-\sum_i \log p_{\theta}(v_i \mid v_{<i}, o_t, l)
$$

动作损失为离散动作 token 的交叉熵：

$$
\mathcal{L}_{\text{action}}=-\sum_j \log p_{\theta}(a_j \mid o_t, l, \hat{s}_{t+k})
$$

总目标将二者相加：

$$
\mathcal{L}=\mathcal{L}_{\text{visual}}+\mathcal{L}_{\text{action}}
$$

> 💡 关键：视觉损失让模型学习“任务接下来应该长什么样”，动作损失让这个想象状态真正服务于控制。

##### 动作 token 与混合注意力

每个动作是 7 维，包括末端执行器位姿和夹爪控制。论文将每个动作维度按训练数据分位范围离散到 256 个 bin，并复用文本 tokenizer 中较少使用的 token 作为动作 token。一次预测 \(C=10\) 个动作，共 \(10\times7\) 个动作 token。

动作 chunk 内部需要相互一致，例如第 1 步和第 10 步不能指向冲突目标。因此 CoT-VLA 对动作 token 使用全注意力，让所有动作维度和时间步彼此可见；而图像和文本 token 仍保持因果注意力，保证视觉思维链可以自回归生成。

##### 训练/适配流程

预训练阶段使用 Open X-Embodiment 的机器人演示，以及 EPIC-KITCHENS、Something-Something V2 等无动作视频，让模型学习未来视觉预测。无动作视频不能提供机器人控制标签，但可以训练“观察当前状态并想象未来变化”的能力。

适配阶段在目标机器人数据上微调，优化视觉和动作联合目标。论文在 LIBERO 仿真、Bridge-V2 真实机器人和 Franka tabletop 三类设置上评估，展示视觉思维链对仿真与真实操作任务都有帮助。

##### 与传统 VLA 的区别

OpenVLA 等模型主要直接预测动作，CoT-VLA 在动作前加入未来图像作为显式中间变量；SUSIE 等两阶段方法也会生成目标图像，但 CoT-VLA 把视觉生成和动作预测统一在一个自回归模型中训练。相比文本 CoT，视觉 CoT 更贴近机器人操作中的空间状态和时间变化。

#### 🧪 练习题

```yaml
question: "CoT-VLA 中视觉思维链的核心作用是什么？"
options:
  - "把机器人动作翻译成自然语言解释"
  - "在动作预测前生成未来子目标图像，作为空间规划和动作决策的中间状态"
  - "用扩散模型生成训练数据标签"
  - "删除语言指令，只依赖当前图像"
answer: 1
explain: "CoT-VLA 先预测未来视觉状态，再基于当前观测、指令和子目标图像生成动作 chunk，使 VLA 获得显式时间规划能力。"
```
