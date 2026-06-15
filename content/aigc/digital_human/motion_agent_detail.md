### Motion-Agent
```yaml
id: motion_agent
name: Motion-Agent
full_name: "对话式运动生成框架 (Conversational Framework for Motion)"
year: "2025"
org: "ICLR 2025"
paper_url: "https://arxiv.org/abs/2405.01234"
category: body_motion
parent: motiongpt3
motivation: "LLM规划扩散执行对话生成"
```

#### 📝 一句话总结
Motion-Agent 提出用 LLM 做多轮规划、用 MotionLLM 做运动-语言执行器的对话式运动生成框架，使用户能通过自然语言逐步生成、编辑和理解复杂人体动作。

#### 🎯 核心要点
- 对话式 agent：将多轮用户意图解析为动作生成、编辑、连接、理解等子任务，而不是一次性 text-to-motion。
- MotionLLM 执行器：把 motion token 与 text token 放入统一词表，通过轻量 adapter 微调开源 LLM 完成 motion-language 映射。
- Motion tokenization：使用 VQ/RVQ tokenizer-detokenizer 将连续 motion 转成 LLM 可处理的离散 token，再解码回 3D motion。
- 参数高效训练：只训练 LLM 约 1-3% 参数的 adapter，保留预训练语言模型的泛化能力。
- 资料限制：manifest 中 `2405.01234` 与该题名不匹配；本文使用 ICLR 2025 项目页 `https://knoxzhao.github.io/Motion-Agent` 和公开 arXiv `https://arxiv.org/abs/2405.17013`。

#### 🔬 深入细节
##### 核心示意图/框架图
![Motion-Agent overview](https://knoxzhao.github.io/Motion-Agent/images/model.png)
*图：Motion-Agent 框架。上层 LLM 负责多轮对话规划，MotionLLM 负责把文本与 motion token 互相转换并输出可渲染动作。*

##### 核心流程伪代码
```python
# Motion-Agent conversational generation
memory = []
motion_state = None

while user_message := receive():
    plan = gpt4_or_planner.generate_plan(user_message, memory, motion_state)
    for step in plan:
        if step.type == "generate":
            motion_tokens = motion_llm.generate_tokens(step.text_prompt)
            motion_state = motion_detokenizer.decode(motion_tokens)
        elif step.type == "edit":
            edit_prompt = build_edit_prompt(motion_state, step.instruction)
            motion_tokens = motion_llm.generate_tokens(edit_prompt)
            motion_state = motion_detokenizer.decode(motion_tokens)
        elif step.type == "caption":
            caption = motion_llm.caption(motion_tokenizer.encode(motion_state))
            memory.append(caption)
        elif step.type == "transition":
            motion_state = blend_or_regenerate_transition(motion_state, step.target)
    memory.append((user_message, plan, motion_state))
```

##### 方法解读
普通 text-to-motion 模型通常是一次输入一句话，输出一段 motion。Motion-Agent 关注的是交互式创作：用户可能先说“让人向前走”，再说“中间加一个转身”，再要求“把结尾改成挥手”。这类任务需要记住上下文、拆分意图并调用运动模型多次执行，因此论文把系统分成 agent planner 和 MotionLLM 执行器。

MotionLLM 的底层机制是 motion tokenization。给定连续运动序列 \(m^{1:T}\)，tokenizer 将其映射为离散 token：
$$
q = \operatorname{Quantize}(\mathcal{E}(m^{1:T})),\qquad \hat{m}^{1:T}=\mathcal{D}(q).
$$
这些 motion token 被加入 LLM 词表，文本和运动都变成 token-in/token-out 问题。生成任务是从文本 token 自回归地产生 motion token；captioning 则反过来从 motion token 生成自然语言描述。

参数高效 adapter 是 MotionLLM 能作为 agent 工具的关键。论文报告只需微调少量 adapter 参数即可达到与从头训练的 transformer 或 diffusion 基线相近的结果。这样做的好处是保留 LLM 的语言理解和指令泛化能力，坏处是运动质量受 tokenizer 上限影响，复杂交互和多人动作仍可能漂移。

Motion-Agent 在此基础上接入 GPT-4 等强规划器，不额外训练也能完成复杂多轮任务。规划器负责把“先跳一下再转身并自然衔接”拆成子 prompt、过渡和编辑操作；MotionLLM 负责执行每个子动作。与 MotionGPT3 相比，Motion-Agent 更像系统框架：它不只讨论模型结构，还强调对话记忆、任务分解和多步调用。

> 💡 关键：Motion-Agent 的“agent”能力来自上层语言规划与下层 motion-language 模型的组合；MotionLLM 是执行器，不等同于完整的对话系统。

#### 🧪 练习题
```yaml
question: "Motion-Agent 为什么需要把连续 motion 转成离散 token？"
options:
  - "为了让运动可以作为 LLM 的输入/输出词元进行自回归建模"
  - "为了去掉所有动作的时间顺序"
  - "为了让模型只能做图像生成"
  - "为了避免使用任何解码器"
answer: 0
explain: "MotionLLM 继承 LLM 的 token-in/token-out 范式，因此需要 motion tokenizer/detokenizer 在连续动作和离散词元之间转换。"
```
