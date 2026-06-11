### Inner Monologue: 内心独白 (Inner Monologue)

```yaml
id: inner_monologue
name: Inner Monologue
full_name: 内心独白 (Inner Monologue)
year: '2022.07'
org: Google
paper_url: https://arxiv.org/abs/2207.05608
category: foundation
parent: zero_shot_planner
motivation: 把环境反馈写回语言规划回路
```

#### 📝 一句话总结
Inner Monologue 提出将环境反馈（成功检测、场景描述、人机对话）以自然语言形式注入大语言模型的规划闭环，使得 LLM 能在具身机器人任务中根据实时反馈进行重规划和纠正，大幅提升了长程操作与导航任务中对抗干扰的鲁棒性。

#### 🎯 核心要点
- 首次系统地将三种环境反馈——**成功检测（Success Detection）**、**被动场景描述（Passive Scene Description）**、**主动场景描述（Active Scene Description）**——统一以自然语言注入 LLM 规划回路，构成「内心独白」闭环
- 提出**高层次指令→LLM 分解为可执行步骤序列**的架构，LLM 输出结构化文本（如 `put the blue block on the yellow bowl`），由低层控制策略执行
- 在三个不同具身场景验证：**模拟桌面重排**（Ravens）、**真实桌面重排**、**真实厨房移动操作**，分别使用 InstructGPT、Code as Policies 等方法
- 通过对抗扰动实验（人为移动物体、任务中途换指令）证明闭环反馈能实现**零样本重规划**，比开环方法提升 20%–50% 的指令完成率
- 探索了 emergent capabilities：LLM 可根据场景描述主动调整策略（如识别物体缺失并报告用户）、在部分可观测环境中持续查询环境状态

#### 🔬 深入细节
##### 核心框架：LLM + 环境反馈闭合回路

Inner Monologue 的核心思想受 Vygotsky 心理学中「内心独白」启发——人在执行复杂任务时通过自我对话来监控和调整行为。作者将其映射到机器人规划中：**LLM 规划器在每一步不仅接收任务指令和当前状态，还会接收由环境返回的自然语言反馈，从而形成「规划→执行→反馈→重规划」的闭环。**

![Inner Monologue 框架图](https://ar5iv.labs.arxiv.org/html/2207.05608/assets/x1.png)
*图：Inner Monologue 总体框架示意。LLM 规划器接收人类指令和每一步的环境反馈（成功检测、场景描述、人机问答），输出可执行步骤序列给机器人底层控制策略。*

##### 三种反馈源

论文将环境反馈分为三类，三者可单独或组合使用：

**1. 成功检测（Success Detection）**
- 形式：二分类语义信号，判断底层技能 π_k 是否成功执行
- 模拟环境中用 ground-truth 状态自动判断；真实环境中用训练好的成功分类器（基于图像）
- 将结果以自然语言注入：「Skill `pick blue block` succeeded.」或「Skill `place blue block` failed.」

**2. 被动场景描述（Passive Scene Description）**
- 每步自动向 LLM 提供结构化的场景语义信息
- 例如：「The objects currently visible are: red block, blue block, yellow bowl, green bowl.」
- 在桌面重排任务中来自物体识别器；在厨房移动操作中来自 VQA 模型对场景的语义描述

**3. 主动场景描述（Active Scene Description）**
- LLM 规划器可以主动向环境发出自然语言查询
- 由人类或预训练的 VQA 模型回答开放式问题
- 论文中称为「Human feedback」模式——例如 LLM 可以问「Which bowl is the largest?」，人类回答「The yellow bowl.」，LLM 据此调整规划

> 💡 关键：三种反馈本质上是让 LLM 获得一个不断更新的「世界状态描述」，而非仅靠初始指令和自身知识库进行一步式推理。这是从开环规划到闭环控制的关键跃迁。

##### 算法流程（伪代码）

```text
# Inner Monologue 主循环
init_state, instruction, history = get_state(), get_instruction(), []
step = 0

while not task_complete and step < max_steps:
    # 1. 获取环境反馈
    success_fb  = success_detector(current_state)       # "success" / "failure"
    scene_fb    = scene_descriptor(current_state)       # 被动场景描述
    active_query = llm_generate_query(history)          # LLM 可选地主动查询
    active_fb   = human_or_vqa_answer(active_query)     # 主动场景描述

    # 2. 构建 prompt: 指令 + 历史 + 反馈
    prompt = construct_prompt(instruction, history,
                              success_fb, scene_fb, active_fb)

    # 3. LLM 规划: 输出可执行步骤
    llm_output = llm_planner(prompt)   # e.g. "pick red block"

    # 4. 解析并执行
    action = parse_action(llm_output)
    if action == "done": break

    new_state, skill_ok = low_level_policy(action, current_state)

    # 5. 更新历史与状态
    history.append({"out": llm_output, "success": skill_ok})
    current_state = new_state; step += 1
```

*伪代码：Inner Monologue 的规划-执行-反馈闭环。LLM 在每个时间步接收三种自然语言反馈，根据完整历史进行下一步规划。*

##### 核心机制深入

**动机与背景**：传统 LLM 在机器人规划中的用法是「给出指令 → LLM 一次性分解为动作序列 → 机器人执行」。这种方法（如 SayCan、Code as Policies）有两个致命弱点：(1) 对环境状态变化的**零容忍**——执行中若物体被移动、任务目标变化，LLM 完全无法感知；(2) **部分可观测性**无法处理——LLM 无法在任务途中查询当前场景的具体状态。Inner Monologue 的动机正是将控制理论中已充分验证的「闭环反馈」原理引入 LLM 规划，用自然语言作为反馈载体。

**为什么是自然语言反馈？** 论文的关键洞察：LLM 已经在海量文本上预训练，自然语言是其最自然的「感知模态」。与其费力将多模态感知（图像、深度等）向量化后注入 LLM（如 PaLM-E 做法），不如利用已有的视觉识别器、VQA 模型等将感知结果翻译为**自然语言文本**，直接拼接到 prompt 中。这样做有三个优势：(1) 无需重新训练或微调 LLM；(2) 充分利用了 LLM 的常识推理能力；(3) 人机交互对人类也同样可读。

**Prompt 的结构设计**：每个环境中 prompt 包含四个部分：
1. **角色设定**（如「You are a robot that can manipulate objects on a table」）
2. **可用技能列表**（如 `pick(object)`, `place(object, location)`, `done()`）
3. **少样本示例**（1–3 个完整任务轨迹作为 in-context example）
4. **当前环境反馈**（动态变化，每步更新）

**对抗扰动实验**：论文在模拟环境中设计了极具挑战性的场景——(a) 执行中实验者主动移动目标物体位置；(b) 任务中途变更指令（如「把蓝色积木放进蓝色碗」→「把蓝色积木放进黄色碗」）。开环方法毫无反应，而 Inner Monologue 能够根据场景描述检测到物体位置变化或指令变更，自动重规划并完成任务，成功率从约 30% 提升至约 80%。

> ⚠️ 注意：Inner Monologue 的效果高度依赖于各反馈模块（物体识别器、成功检测器）的准确度。论文中指出的主要失败模式包括：(1) 成功检测误判（false positive 引入对抗性部分可观测；false negative 导致不必要重试）；(2) LLM 偶尔「忽略」环境反馈，继续计划使用已不存在的物体；(3) 底层控制策略的能力瓶颈限制了 LLM 的规划范围。

**三个实验场景的差异化实现**：

| 维度 | 模拟桌面 (Ravens) | 真实桌面 | 厨房移动操作 |
|------|------------------|---------|------------|
| LLM 方法 | InstructGPT | Code as Policies | LLM 高层规划 + Affordance 低层 |
| 成功检测 | Ground-truth / CLIP | 人标注 | 视觉分类器 |
| 场景描述 | 物体识别器 | 物体识别器 | VQA 模型 |
| 关键挑战 | 对抗扰动 | Real-world noise | 长程任务 + 部分可观测 |

##### 与传统方法的区别

| 方法 | 反馈形式 | 重规划能力 | 依赖 |
|------|---------|----------|------|
| SayCan | 无环境反馈 | 无 | 固定价值函数 |
| Code as Policies | 无显式反馈 | 有限（代码可含条件） | LLM 代码生成能力 |
| **Inner Monologue** | **自然语言三通道反馈** | **连续重规划** | **多个感知模型 + LLM** |
| PaLM-E | 多模态向量 | 有限 | 多模态大模型训练 |

Inner Monologue 的独特贡献在于：**用已有的单模态能力组件（物体识别、VQA、LLM）通过自然语言接口拼接出多模态闭环能力，无需端到端训练新的多模态模型**。

#### 🧪 练习题
```yaml
question: "Inner Monologue 中三种环境反馈的核心作用是什么？"
options:
  - "提升 LLM 的代码生成质量"
  - "以自然语言将环境状态变化注入 LLM 规划回路，实现闭环重规划"
  - "替代低层控制策略，直接输出机器人关节角度"
  - "减少 LLM 推理时所需的 token 数量"
answer: 1
explain: "成功检测、被动和主动场景描述三种反馈本质都是将环境状态以自然语言输入 LLM，使其能在执行中感知变化并重规划，这是开环→闭环的关键创新。"
```
