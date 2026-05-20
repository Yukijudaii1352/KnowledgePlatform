```yaml
id: pi0_7
name: π0.7
full_name: 物理智能零点七 (π0.7)
year: "2026.04"
org: Physical Intelligence
paper_url: https://www.pi.website/blog/pi0-7-a-steerable-model-with-emergent-capabilities
category: diffusion_flow
parent: pi0
motivation: 组合泛化支持跨多种机器人本体
```

### π0.7：物理智能零点七

#### 📝 一句话总结

π0.7 是 Physical Intelligence 推出的可操控通用视觉-语言-动作（VLA）模型，通过多模态提示（语言指令、元数据、控制模态、视觉子目标）训练，首次展示了机器人基础模型的**涌现组合泛化**能力——无需微调即可将已学技能重组用于新任务、新物体和新机器人本体，且开箱性能匹敌此前需 RL 微调的专家模型。

#### 🎯 核心要点

- 单一统一模型：π0.7 是一个通用 VLA 模型，能操控多种不同类型的机器人执行广泛任务，无需针对具体任务/本体进行微调
- 可操控（Steerable）架构：训练时注入多样化多模态提示——语言指令（what to do）、元数据/策略元数据（how to do: 质量、速度）、控制模态切换、视觉子目标图像
- 涌现组合泛化（Compositional Generalization）：首次展现机器人基础模型像 LLM 一样重组已学技能解决全新任务（如操作未见过的厨房电器、折叠衣物在新机器人本体上）
- 语言指导（Language Coaching）：可通过逐步口头指令"教"机器人新任务，并将指导经验蒸馏为高层策略实现完全自主执行
- Recap 蒸馏：将 RL（Recap 算法）训练中产生的自主数据蒸馏到 π0.7 模型中，单模型在折叠衣物、制作浓缩咖啡、折叠纸箱等任务上达到或超越 RL 专家策略的性能和吞吐量
- 跨本体迁移（Cross-Embodiment Transfer）：从固定双臂数据采集机器人到 UR5e 双臂系统的折叠衣物零样本迁移，成功率匹配经验丰富的人类遥操作员的零样本表现
- 广泛数据混合：融合多种机器人数据、人类演示数据和自主策略 rollout 数据，通过策略元数据标签（如质量/速度级别）实现有效的数据混合利用

#### 🔬 深入细节

##### 核心架构与推理流程

![π0.7 训练与推理流程示意图](https://www.pi.website/_next/image?url=%2Fimages%2Fpi07%2Fsubgoal_1.png&w=3840&q=75)
*图：π0.7 训练时接收语言指令、子目标图像、Episode 元数据（Quality/Speed）；推理时由高层策略生成任务指令 → 子任务指令，世界模型生成子目标图像，VLA 政策执行动作*

π0.7 的架构核心是一种**可操控（Steerable）的 VLA 模型**，其关键创新在于训练时向模型注入的不只是"做什么（what）"，还包括"怎么做（how）"的信息。训练时的多模态提示流包括：

1. **语言指令**：描述任务的自然语言（如 "pick up the oven mitt" → "open the drawer" → "grab the spatula"...），构成任务执行的层次化语义指导
2. **视觉子目标（Subgoal Images）**：世界模型生成的期望未来观察图像，为策略提供视觉锚定的中间目标状态
3. **Episode 元数据（Metadata）**：标量标签（如 Quality 和 Speed 等级），使同一模型可以根据部署需求调整行为风格——高质量模式更稳健，高速度模式更快

推理时的高层流程：

```
高层策略（High-Level Policy）
  ├── 任务指令（TASK INSTRUCTION）
  └── 子任务指令序列（SUBTASK INSTRUCTIONS）
       └── 世界模型（World Model）
            └── 子目标图像（SUBGOAL）+ 期望元数据（Quality/Speed）
                 └── π0.7 VLA Policy → 动作序列
```

```python
# π0.7 推理流程伪代码
def pi07_inference(observation_history, task_instruction, metadata):
    """
    推理时 π0.7 接收多模态提示并自回归生成动作序列
    
    Args:
        observation_history: 历史观测（图像）序列
        task_instruction:  高层/子任务语言指令
        metadata:          dict with "quality" 和 "speed" 键控制行为风格
    """
    # 1. 高层策略将任务分解为子任务语言指令
    subtask_instructions = high_level_policy.generate(task_instruction)
    
    for subtask_text in subtask_instructions:
        # 2. 世界模型根据当前观测+子任务文本生成视觉子目标
        subgoal_image = world_model(
            observation_history,
            subtask_text,
            desired_metadata=metadata
        )
        
        # 3. VLA 策略融合所有模态生成动作
        #    输入: 观测记忆 + 子任务文本 + 子目标图像 + 元数据
        action = pi07_vla_policy(
            obs_memory=observation_history,
            language_prompt=subtask_text,
            visual_subgoal=subgoal_image,
            quality_flag=metadata["quality"],
            speed_flag=metadata["speed"]
        )
        
        # 4. 执行动作并更新观测历史
        observation_history = execute_and_update(action)
```

##### 组合泛化的实现机制

π0.7 的组合泛化能力来源于三个层面的设计：

**① 多样化多模态提示的解耦训练（Disentangled Prompt Training）**

传统 VLA 模型训练时仅使用单一的语言指令或目标图像，π0.7 在训练过程中**同时或交替使用多种提示模态**——语言、元数据、控制模态标志和视觉子目标。这迫使模型学会将技能的不同维度（语义理解、行为质量、执行速度、视觉推理）解耦编码，从而在推理时可以实现自由重组。

例如，训练数据中：
- 样本 A：语言 = "fold the towel"，质量 = high，速度 = low
- 样本 B：语言 = "wipe the counter"，质量 = medium，速度 = high
- 样本 C：仅提供视觉子目标，无语言

通过交错训练，模型学会了"折叠毛巾"的语义技能和"高质量"的执行风格是两个可独立的因子，推理时即可将"折叠衣物"（已学语义）+"高质量"+"UR5e 本体观测"组合。

**② 语言指导（Language Coaching）的动态技能获取**

这是 π0.7 实现新任务泛化的关键管道。对于训练数据中未出现的新任务（如操作空气炸锅），人类通过逐步口头指令引导机器人：

1. **零样本尝试**：给定高层指令 "load a sweet potato into the air fryer"，π0.7 做出合理但不完整的尝试（打开空气炸锅、尝试放入红薯，但未能完成）
2. **逐步语言指导**：人类提供细致步骤指令（"open the air fryer basket" → "place the sweet potato inside" → "close the basket" → "press start"），π0.7 在执行过程中将语言指令与视觉观察和动作进行对齐
3. **高层策略蒸馏**：多次指导后，将成功的语言指令序列用于微调高层策略，使其能自主生成子任务指令序列，实现完全自主执行

这一流程本质上是一种**基于语言的上下文化强化学习**：模型利用预训练的语义理解和物理操控能力，通过语言提示"锚定"新任务的执行轨迹。

**③ Recap RL 经验的数据蒸馏**

π0.7 在训练数据上集成了 Recap 算法产生的自主 rollout 轨迹。Recap 是 RL 微调流程，用于同时优化任务成功率和执行速度。关键发现是：

- 直接将 RL rollout 数据与其他数据源（人类演示、不同机器人数据）混合训练**并不能**带来好的效果
- 解决方案是给每条数据打上策略元数据标签（quality level, speed level），让模型在学习过程中条件化于这些元数据
- 最终单一 π0.7 模型能在折叠衣物、浓缩咖啡制作、折叠纸箱等任务上达到或超越任务专属 RL 专家策略（Recap specialist）的表现

这验证了一个重要假设：**如果给予正确的条件化信号，通用模型可以从多样化质量的数据中有效学习，而不会被低质量数据污染**。

##### 与传统方法的区别

| 维度 | 传统 VLA 模型 | π0.7 |
|------|:------------:|:----:|
| 任务泛化 | 需对每个任务微调（fine-tuning）才能获得好性能 | 开箱即用，多任务直出 |
| 技能重组 | 未见组合泛化能力报道 | 涌现组合泛化，操作新电器、新本体折叠衣物 |
| 行为风格 | 固定策略，无法调节质量/速度 | 通过元数据标签实时调控行为风格 |
| 新技能获取 | 需收集新演示数据 | 语言指导 + 高层策略蒸馏，无新遥操作数据 |
| 数据利用 | 谨慎过滤数据，避免低质量数据拖累 | 策略元数据条件化，可有效利用混合质量数据 |

> 💡 关键洞察：π0.7 的核心贡献不是架构创新，而是**训练策略和数据混合方式的创新**——它证明了正确的多模态条件化可以让 VLA 模型涌现出此前仅在 LLM 中观察到的组合泛化能力。

> ⚠️ 注意：π0.7 的组合泛化仍处于"早期迹象"阶段——在空气炸锅任务的重试后仍需语言指导才能成功。Physical Intelligence 明确将其描述为"first signs of compositional generalization"，而非完全解决。

##### 训练与推理代价

从博客披露的信息推断，π0.7 的训练融合了：
- 多机器人平台（双臂固定式、UR5e 双臂、Franka 等）的操作数据
- 开源 DROID 数据集（Franka 臂）
- 人类遥操作演示数据
- Recap RL 自主 rollout 数据

策略元数据标签（Quality/Speed）使模型可以条件化地利用不同质量水平的数据——低质量数据在低质量标签下仍可提供有价值的探索信息，而不会在高标签条件下误导模型。这是数据高效利用的关键工程设计。

#### 🧪 练习题

```yaml
question: "π0.7 实现组合泛化的关键训练机制是什么？"
options:
  - "使用更大的 Transformer 模型参数量"
  - "通过多模态提示（语言、元数据、子目标图像）解耦技能维度，并在推理时重组"
  - "在测试时用 RL 对每个新任务进行快速微调"
  - "仅使用人类专家演示数据，确保数据质量一致性"
answer: 1
explain: "π0.7 训练时同时/交替接收语言指令、策略元数据（质量/速度）、视觉子目标等多样化提示，促使模型将技能语义与执行风格解耦编码；推理时可通过自由重组这些因子实现对未见任务/本体的泛化。"
```