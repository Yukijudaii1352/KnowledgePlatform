### PaLM-E

```yaml
id: palm_e
name: PaLM-E
full_name: "具身多模态语言模型 (PaLM-E)"
year: "2023"
org: "Google"
paper_url: "https://arxiv.org/abs/2303.03378"
category: "embodied"
parent: "rt1"
motivation: "562B参数将传感器数据注入LLM嵌入"
```

#### 📝 一句话总结

PaLM-E 将图像、状态估计、3D 表征等连续传感器输入编码成与词向量同维度的 token，插入 PaLM 的语言 token 序列中，解决 LLM 缺少真实世界 grounding、难以直接服务机器人规划的问题。它展示了一个模型同时做具身推理、视觉问答、图像描述和语言任务的可能性。

#### 🎯 核心要点

- **多模态句子 (multimodal sentence)**：把文本 token 与图像、状态、神经 3D 表征等连续观察 token 交错输入同一个 decoder-only LLM
- **传感器嵌入注入 LLM 空间**：连续观察经输入编码器映射到 PaLM 词嵌入维度，随后由自注意力统一处理
- **文本形式输出决策**：模型输出答案、计划或高层子目标文本，再由低层策略/规划器执行
- **多任务联合训练**：混合机器人规划、embodied VQA、captioning、通用视觉语言和语言任务，实现跨域正迁移
- **超大规模模型**：PaLM-E-562B 结合 540B PaLM 与 22B ViT，是具身多模态模型规模化的重要案例
- **减少灾难性遗忘**：模型越大，在多模态训练后保留原有语言能力越好

#### 🔬 深入细节

##### 框架总览

![PaLM-E 多模态句子框架](https://ar5iv.labs.arxiv.org/html/2303.03378/assets/x2.png)
*图：PaLM-E 将图像、状态和文本共同组织成多模态句子，输入预训练 LLM，并生成文本答案或机器人可执行的高层决策。*

##### 算法流程

```python
# PaLM-E 前向与机器人规划循环
def palm_e_generate(task_text, observations, history):
    tokens = []
    tokens += text_tokenize(task_text)

    for obs in observations:
        # 图像、状态、3D 表征等连续输入被编码为 LLM embedding 空间中的 token
        obs_tokens = sensor_encoder(obs)
        tokens += obs_tokens

    tokens += text_tokenize(history)
    return decoder_only_llm.generate(tokens)

def embodied_control_loop(goal):
    history = ""
    while True:
        image = robot.camera()
        subgoal_text = palm_e_generate(goal, [image], history)

        if subgoal_text == "terminate":
            break

        # PaLM-E 生成高层语言决策，底层策略执行连续控制
        low_level_policy.execute(subgoal_text, duration_seconds=4)
        history += summarize(subgoal_text)
```

##### 方法细节

**1. 动机与背景**

LLM 拥有语言知识和推理能力，但原生输入是离散文本。机器人任务需要把“桌上红色方块在左边”这种感知状态与语言目标绑定起来，还要在环境变化后重新规划。传统做法常把 LLM 当高层 planner，再接外部感知模块和 affordance 模型；PaLM-E 则尝试让 LLM 自身直接接收传感器 embedding，从模型内部完成语言与感知的对齐。

**2. 多模态句子**

PaLM-E 的关键接口是多模态句子。普通 decoder-only LLM 处理文本序列：

$$
p(w_{1:L})=\prod_{l=1}^{L}p(w_l \mid w_{<l})
$$

PaLM-E 将连续观察 \(o\) 经编码器 \(g_\psi\) 变成若干 embedding token，并与文本 embedding \(E(w)\) 拼接：

$$
z = [E(w_1),\ldots,g_\psi(o_1),\ldots,E(w_L)]
$$

随后仍使用自回归语言建模目标生成文本：

$$
p_\theta(y \mid z)=\prod_t p_\theta(y_t \mid y_{<t}, z)
$$

因此，图像或状态不是作为外部检索结果附加，而是像“词”一样进入 Transformer 的注意力计算。

**3. 输出为什么仍是文本**

PaLM-E 不直接输出低层机器人关节动作，而是输出文本形式的答案、计划或子目标。例如在移动操作任务中，它根据当前图像和长程目标输出下一步语言指令，低层策略再以较高频率执行。这样做的好处是复用 LLM 的语言接口和世界知识，也便于与不同机器人 embodiment 连接。

这与 RT-1 的直接动作策略不同：RT-1 是图像+语言到动作 token；PaLM-E 是图像/状态+语言到文本决策。前者更像低层控制策略，后者更像具身多模态推理器。

**4. 联合训练与正迁移**

PaLM-E 在多个机器人环境和视觉语言任务上联合训练，包括 TAMP、Language-Table、移动操作、VQA 和 captioning。论文观察到跨域 transfer：视觉语言数据能帮助具身规划，机器人数据也没有完全破坏通用视觉语言能力。尤其在少量机器人数据场景中，预训练和混合训练提供了明显收益。

模型还引入了 OSRT 等神经场景表示作为输入编码方式，用于将 3D 场景结构压缩为可被 LLM 消化的 token。这说明 PaLM-E 的框架不仅限于 2D 图像，也可以接收更结构化的连续感知表示。

**5. 模型规模与遗忘**

PaLM-E-562B 是论文中最重要的规模化结果。小模型在多模态/具身训练后更容易损失原有语言能力；大模型则保留得更好。论文报告最大模型在 OK-VQA 等视觉问答任务上也具备强性能，并展示多图推理、OCR-free 数学和零样本多模态 CoT 等能力。

> 💡 关键：PaLM-E 的核心创新不是“给机器人接一个 LLM”，而是把连续传感器输入变成 LLM token，使感知和语言推理发生在同一个自注意力空间中。

#### 🧪 练习题

```yaml
question: "PaLM-E 的 multimodal sentence 指的是什么？"
options:
  - "把多个自然语言句子拼成一个长 prompt"
  - "把图像、状态等连续观察编码成 token，并与文本 token 交错输入 LLM"
  - "把机器人动作离散成 256 个文本 token"
  - "只用图像 caption 替代所有传感器输入"
answer: 1
explain: "PaLM-E 将连续传感器模态映射到语言模型 embedding 空间，与文本 token 一起被 decoder-only LLM 处理。"
```
