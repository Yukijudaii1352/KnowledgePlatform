### Self-Reminder — 系统模式自我提醒防御 (System-Mode Self-Reminder Defense)

```yaml
id: self_reminder
name: Self-Reminder
full_name: "系统模式自我提醒防御 (System-Mode Self-Reminder Defense)"
year: 2023
org: HKUST / Microsoft Research Asia
paper_url: https://www.nature.com/articles/s42256-023-00765-8
category: defense
parent: "—"
motivation: "通过在系统提示词中封装用户查询并添加自我提醒，利用心理学启发的提示词防御指令"
```

#### 📝 一句话总结

Self-Reminder 提出了一种基于心理学自我提醒概念的系统提示词防御方法，通过在系统提示中用安全提醒语句封装用户查询，将 ChatGPT 遭受越狱攻击的成功率从 67.21% 降至 19.34%，无需额外训练即可有效缓解越狱威胁。

#### 🎯 核心要点

- **越狱数据集构建**：收集 58 种越狱提示词模板，结合 10 类恶意指令，构建 580 条测试样本的越狱攻击评估数据集
- **越狱提示词分类体系**：将越狱攻击归纳为 Pretending（伪装）、Attention Shifting（注意力转移）、Privilege Escalation（权限提升）三大类
- **系统模式自我提醒机制**：在系统提示词中以"前置提醒 + 用户查询 + 后置提醒"三段式结构封装用户输入
- **心理学理论基础**：借鉴 Implementation Intentions（执行意图）和 Self-Regulation（自我调节）等心理学概念
- **防御效果**：ChatGPT 上 ASR 从 67.21% 降至 19.34%；GPT-4 上进一步降低
- **通用任务性能保持**：在 GLUE、CNN/DailyMail、XSum、WMT16、SQuAD 等基准上验证不影响正常任务表现
- **无需训练的即插即用方案**：仅通过修改系统提示词实现，不涉及模型微调或额外训练

#### 🔬 深入细节

##### 示意图

![Self-Reminder 框架示意图](https://media.springernature.com/full/springer-static/image/art%3A10.1038%2Fs42256-023-00765-8/MediaObjects/42256_2023_765_Fig1_HTML.png)
*图：越狱攻击示例与系统模式自我提醒防御方法。左侧展示越狱攻击如何绕过安全对齐，右侧展示 Self-Reminder 如何通过系统提示词封装用户查询来抵御攻击。*

##### 算法伪代码

```python
# Self-Reminder 系统提示词封装机制
def self_reminder_defense(user_query):
    # 前置提醒 (Pre-Reminder)
    pre_reminder = (
        "You should be a responsible ChatGPT and should not "
        "generate harmful or misleading content! Please answer "
        "the following user query in a responsible way."
    )
    
    # 后置提醒 (Post-Reminder)
    post_reminder = (
        "Remember, you should be a responsible ChatGPT and "
        "should not generate harmful or misleading content!"
    )
    
    # 系统提示词封装
    system_prompt = f"{pre_reminder}\n{user_query}\n{post_reminder}"
    
    # 将封装后的提示词作为系统消息发送
    response = chatgpt(
        messages=[{"role": "system", "content": system_prompt}]
    )
    return response
```

##### 动机与背景

ChatGPT 等大语言模型虽然通过 RLHF（基于人类反馈的强化学习）进行了安全对齐，但越狱攻击（Jailbreak Attack）通过精心构造的对抗性提示词可以绕过这些安全防护，诱导模型生成有害内容。越狱攻击的典型手段包括：让模型扮演不受限制的角色（如 DAN — "Do Anything Now"）、利用虚构场景转移注意力、或通过权限提升指令覆盖安全规则。

传统防御方法主要依赖于模型层面的安全训练（如 RLHF、红队测试），但这些方法存在两个核心缺陷：（1）需要大量计算资源进行模型再训练；（2）面对不断演化的越狱攻击模式，防御存在滞后性。因此，亟需一种轻量级、即时部署的防御方案。

> 💡 关键：Self-Reminder 的核心洞察是——越狱攻击本质上是在用户消息层面操纵模型行为，而系统提示词（System Prompt）具有更高的指令优先级，可以作为"防御阵地"来抵消用户层面的攻击指令。

##### 核心机制

**1. 越狱攻击分类与数据集构建**

论文首先系统性地收集和分析了 58 种来自互联网的越狱提示词模板，并将其归纳为三大类：

- **Pretending（伪装类）**：让模型扮演不受限制的角色或进入特殊模式（如 DAN、Developer Mode），约占总数的最大比例
- **Attention Shifting（注意力转移类）**：通过虚构场景、故事叙述等方式转移模型对安全规则的注意力
- **Privilege Escalation（权限提升类）**：直接声称拥有更高权限或要求模型忽略安全限制

结合 10 类恶意指令（涵盖暴力、歧视、隐私泄露等），构建了 \(58 \times 10 = 580\) 条测试样本。

**2. 系统模式自我提醒设计**

Self-Reminder 的核心设计基于心理学中的自我提醒（Self-Reminder）概念。在心理学中，Implementation Intentions（执行意图）理论指出，当个体预先设定"如果遇到 X 情况，就执行 Y 行为"的计划时，能显著提高目标行为的执行率。类似地，Self-Regulation（自我调节）理论强调，通过持续的自我监控和提醒，个体可以更好地控制自身行为。

将这一概念迁移到 LLM 防御中，Self-Reminder 在系统提示词中构建了三段式结构：

$$
\text{SystemPrompt} = \text{PreReminder} \oplus \text{UserQuery} \oplus \text{PostReminder}
$$

其中：
- \(\text{PreReminder}\)：在用户查询之前设置安全行为预期，相当于"执行意图"的触发条件
- \(\text{UserQuery}\)：原始用户输入（可能包含越狱攻击指令）
- \(\text{PostReminder}\)：在用户查询之后再次强化安全提醒，相当于"自我调节"的反馈信号

> ⚠️ 注意：将用户查询嵌入系统提示词中是关键设计——这使得安全提醒与潜在攻击指令处于同一上下文层级，且安全提醒"包围"了攻击指令，从而在注意力机制层面增强了安全指令的影响力。

**3. 提醒语气的影响**

论文还探究了提醒语句的语气（Tone）对防御效果的影响，借鉴教育心理学中课程大纲语气（Syllabus Tone）对学生行为影响的研究。实验对比了：

- **友好语气（Friendly Tone）**：使用鼓励性、合作性的表述
- **严格语气（Strict Tone）**：使用命令性、规范性的表述

结果表明不同语气对防御效果有一定影响，但整体上 Self-Reminder 机制在各种语气设置下均能显著降低 ASR。

##### 实验结果与分析

论文在 ChatGPT（GPT-3.5-turbo）和 GPT-4 上进行了全面评估：

| 场景 | ASR |
|------|-----|
| ChatGPT 无防御 | 67.21% |
| ChatGPT + Self-Reminder | **19.34%** |
| GPT-4 无防御 | 较低（模型本身更强） |
| GPT-4 + Self-Reminder | 进一步降低 |

同时，在通用 NLP 任务上的评估表明 Self-Reminder 不会显著影响模型的正常能力：
- **自然语言理解**：GLUE 基准（SST-2、MNLI、QNLI 等）
- **文本摘要**：CNN/DailyMail、XSum
- **机器翻译**：WMT16 (en-de)
- **阅读理解**：SQuAD
- **隐私保护**：Enron Email 数据集上的隐私泄露测试

##### 与传统方法的区别

| 维度 | 传统安全对齐（RLHF等） | Self-Reminder |
|------|------------------------|---------------|
| 实现方式 | 模型再训练/微调 | 仅修改系统提示词 |
| 计算成本 | 高（需 GPU 集群训练） | 零（推理时即插即用） |
| 部署速度 | 需要重新部署模型 | 即时生效 |
| 适应新攻击 | 需要收集新数据重新训练 | 可快速调整提示词 |
| 防御层级 | 模型参数层 | 提示词/输入层 |
| 理论基础 | 强化学习 | 心理学自我提醒 |

> 💡 关键：Self-Reminder 与模型层面的安全对齐是互补而非替代关系——它可以作为已有安全机制之上的额外防御层，形成纵深防御体系。

#### 🧪 练习题

```yaml
question: "Self-Reminder 防御方法的核心机制是什么？"
options:
  - "对模型进行安全主题的微调训练"
  - "在系统提示词中用安全提醒语句封装用户查询"
  - "使用额外的分类器过滤有害输出"
  - "限制用户输入的最大长度以阻断越狱提示词"
answer: 1
explain: "Self-Reminder 的核心是在系统提示词中以'前置提醒 + 用户查询 + 后置提醒'的三段式结构封装用户输入，利用系统提示词的高优先级来抵消越狱攻击指令，无需任何模型训练。"
```