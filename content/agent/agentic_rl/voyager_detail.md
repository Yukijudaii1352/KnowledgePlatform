### Voyager: 开放式具身终身学习代理 (Voyager)

```yaml
id: voyager
name: Voyager
full_name: 开放式具身终身学习代理 (Voyager)
year: '2023.05'
org: NVIDIA/Caltech
paper_url: https://arxiv.org/abs/2305.16291
category: self_improve
parent: reflexion
motivation: 靠课程与技能库持续自我进化
```

#### 📝 一句话总结
Voyager 是首个基于大语言模型（GPT-4）的具身终身学习代理，通过在 Minecraft 中引入**自动课程、可执行代码技能库、迭代提示机制**三大组件，实现了无需人类干预的持续探索、技能获取与新发现，在物品收集量、科技树解锁速度和地图覆盖范围上全面超越 SOTA。

#### 🎯 核心要点
- 三个核心组件协同：**自动课程**（Automatic Curriculum）提出自适应探索目标，**技能库**（Skill Library）以向量数据库存储和检索可执行代码，**迭代提示机制**（Iterative Prompting Mechanism）通过环境反馈与自我验证逐步改进程序
- 以可执行 JavaScript 代码作为行动空间，而非低层运动指令，天然支持**时序扩展与组合性**（temporally extended & compositional）
- 利用 GPT-4 的黑盒查询实现上下文学习（in-context learning），**无需模型参数访问或梯度微调**
- 技能库通过嵌入向量索引，支持相似场景检索与**技能组合**，缓解灾难性遗忘
- 自我验证模块（Self-Verification）通过检测物品/成就/图标的数量变化来判定任务完成，比单纯反思（Reflexion）更全面
- 在 MineDojo 平台上进行系统评估：获 **3.3×** 独特物品、科技树里程碑解锁快 **15.3×**、行走距离多 **2.3×**，且是唯一解锁钻石级的方案
- 技能库可在新 Minecraft 世界中**零样本迁移**解决新任务，基线方法无法泛化

#### 🔬 深入细节
##### 4.1 核心架构图

![Voyager 架构总览](https://ar5iv.labs.arxiv.org/html/2305.16291/assets/figures/fig2.png)
*图：Voyager 由三个关键组件组成——自动课程负责提出探索目标，技能库存储和检索可执行代码技能，迭代提示机制通过环境反馈、执行错误与自我验证来持续改进生成的程序。*

##### 4.2 算法核心流程（伪代码）

```python
# Voyager 主循环
skill_library = VectorDB()           # 以嵌入向量索引的技能库
curriculum = AutomaticCurriculum()   # GPT-4 驱动的自动课程

while True:
    task = curriculum.propose_task(agent_state, completed_tasks, failed_tasks)

    for attempt in range(4):         # 每个任务最多4轮迭代
        # 1. 从技能库检索 top-5 相关技能作为上下文
        plan = gpt3.query("suggest solution for task", task, agent_state)
        relevant_skills = skill_library.query(embed(plan + env_feedback), top_k=5)

        # 2. GPT-4 生成可执行代码
        code = gpt4.generate_code(
            task, agent_state, relevant_skills, control_primitives,
            prev_code, env_feedback, execution_errors, critique
        )

        # 3. 在 Minecraft 中执行代码
        env_feedback, exec_errors = minecraft.execute(code)

        # 4. 自我验证：检查物品/成就数量变化
        if self_verify(task, before_state, after_state):
            skill_library.add(embed(task_description), code)  # 技能入库
            break                                              # 任务完成，请求新任务
    else:
        failed_tasks.append(task)   # 4轮未完成则放弃此任务
```

##### 4.3 方法深入解读

**动机与背景：**
传统具身代理方法依赖强化学习或模仿学习在原始动作空间上操作，面临系统探索困难、可解释性差、泛化能力弱三大瓶颈。ReAct、Reflexion、AutoGPT 等 LLM-based 代理虽能利用预训练世界知识，但它们**缺乏跨时间累积、更新和迁移知识的终身学习能力**。Minecraft 作为无预定目标的开放世界，要求代理像人类玩家一样自驱探索、根据环境状态提出合适任务、在反馈中迭代精进技能并将掌握的能力存入记忆——这正是 Voyager 的设计目标。

**核心机制逐部件拆解：**

1. **自动课程（Automatic Curriculum）：**
   GPT-4 根据"尽可能发现多样事物"的终极目标，结合代理当前状态（物品栏、装备、附近方块/实体、生物群系、时间、生命/饥饿值、坐标）、已完成/失败任务历史、以及 GPT-3.5 生成的自我问答上下文，**自下而上**地提出难度递进的探索目标。课程温度设为 0.1 以保证任务多样性，并包含指令约束"下一个任务不应太难，因为我可能还没有必要的资源或学够技能"——这体现了**最近发展区（Zone of Proximal Development）**的设计哲学。

2. **技能库（Skill Library）：**
   每个技能以**可执行的 JavaScript 代码函数**形式存入向量数据库（如 `craftStoneShovel()`、`combatZombieWithSword()`）。索引键为 GPT-3.5 生成的程序描述文本的 `text-embedding-ada-002` 嵌入向量，值为代码本身。代码生成时，GPT-4 被提示"你的函数将被复用来构建更复杂的函数，因此应使其通用且可复用"。查询时，GPT-3.5 首先生成任务解决建议，与环境反馈拼接后嵌入向量进行 top-5 检索。这种**组合性学习**使复杂技能可由简单技能复合而成，能力指数级增长。

3. **迭代提示机制（Iterative Prompting Mechanism）：**
   这是 Voyager 自我改进的关键引擎，融合三类反馈进行代码迭代：
   - **环境反馈**：通过 `bot.chat()` 显示程序执行的中间进展（如"我无法制作铁胸甲，因为还需要 7 个铁锭"），GPT-4 据此调整策略
   - **执行错误**：JavaScript 解释器的报错信息直接反馈给 GPT-4 用于修正语法/语义错误（如"不存在金合欢斧，应制作木斧"）
   - **自我验证**：执行前后对比关键指标（物品数量、成就、GUI 图标）变化，同时让 GPT-4 对失败原因进行批判性反思
   每轮最多迭代 4 次，若陷入僵局则自动请求自动课程分配新任务，**避免无限循环**。

**与传统方法的区别：**
| 维度 | ReAct/Reflexion | AutoGPT | Voyager |
|------|-----------------|---------|---------|
| 知识积累 | 无长期记忆 | 无技能库 | 向量数据库持久化技能 |
| 任务提出 | 人工指定 | 一次性分解子目标 | 自动课程持续生成 |
| 成功判定 | 无验证 | 无验证 | 自我验证（物品/成就变化） |
| 代码改进 | 无迭代 | 无迭代 | 至多4轮环境+错误+验证迭代 |
| 泛化能力 | 无法迁移 | 无法迁移 | 技能库在新世界零样本复用 |

**关键直觉：**
> 💡 **核心洞察**：将技能表示为代码而非自然语言计划，使得技能可被精确执行、可靠验证和组合复用——这正是 Voyager 能指数级增长能力的根本原因。

> ⚠️ **注意**：Voyager 不涉及 3D 视觉感知或端到端传感器运动控制，它通过 Mineflayer 高级 API 操控代理。该方法与 VPT 等梯度方法正交互补——只要底层控制器提供代码 API，即可叠加 Voyager 进行高层规划。

#### 🧪 练习题
```yaml
question: "Voyager 的迭代提示机制中，自我验证模块通过什么来判断任务是否完成？"
options:
  - "仅检查程序是否无语法错误执行完毕"
  - "对比执行前后物品/成就/GUI图标的数量变化，并让GPT-4进行批判性反思"
  - "由外部人工标注任务是否成功"
  - "仅依靠LLM输出的置信度分数"
answer: 1
explain: "Voyager 的自我验证通过检测关键指标的变化并配合 LLM 批判性反思来判定任务完成，比仅检查执行状态或LLM置信度更可靠。论文 Figure 6 展示了具体的验证提示结构。"
```
