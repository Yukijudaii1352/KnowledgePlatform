### π0.7：物理智能零点七

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

#### 📝 一句话总结

π0.7 提出一种可操控的通用 VLA 训练方法，用语言、子任务、子目标图像、控制模式和质量/速度/错误等元数据共同构成 prompt，让单一机器人基础模型能从混合质量、多机器人和非机器人数据中学习。它解决了此前 VLA 往往需要任务专门微调、难以组合已学技能完成新任务的问题，展示了零样本跨本体迁移和初步组合泛化。

#### 🎯 核心要点

- 5B 参数级 VLA：由约 4B Gemma3 VLM backbone、MEM 风格视频历史编码器和约 860M flow-matching action expert 组成。
- 核心不是单一新模块，而是 diverse context conditioning：训练时给每段数据附加“做什么”和“怎么做”的多模态上下文。
- Prompt 组成包括 task instruction、subtask instruction、multi-view subgoal images、episode metadata、mistake label 和 control mode。
- Episode metadata 标注执行质量、速度/长度、是否犯错等信息，使模型可以利用低质量演示、失败、自主 rollout 和 RL specialist 经验，而不是被它们平均化拖累。
- 子目标图像由轻量世界模型在测试时生成，帮助策略把抽象语言目标转成近未来视觉状态，尤其利于跨本体和空间布局变化。
- 训练时对 prompt 组件做随机 dropout，让模型能在测试时灵活使用任意子集；有人工口头指导时也能逐步执行新长时任务。
- 实验展示 out-of-the-box dexterity、复杂语言跟随、UR5e 零样本洗衣折叠迁移，以及空气炸锅/烤面包机等未见长时任务的语言 coaching。

#### 🔬 深入细节

![π0.7 架构总览](https://ar5iv.labs.arxiv.org/html/2604.15483/assets/x1.png)
*图：π0.7 用 VLM backbone、observation memory、action expert、high-level policy 和 world model 组成可操控 VLA 系统。*

元信息中的 `paper_url` 是官方博客的标题式地址；公开页面实际可访问版本为 `https://www.pi.website/blog/pi07`，并链接论文 `π0.7: a Steerable Generalist Robotic Foundation Model with Emergent Capabilities`（arXiv:2604.15483）。论文给出的主张是：机器人 foundation model 的泛化瓶颈不只是数据量，而是异构数据里的“策略意图”没有被充分条件化。若把高质量演示、失败轨迹、不同机器人、不同控制模式、人类视频和互联网多模态数据直接混在一起，模型容易学到平均行为；π0.7 用更详细的 prompt 把这些差异显式告诉模型。

π0.7 的低层 VLA 仍然遵循 flow-based action expert 范式：给定历史观测 \(o_{t-T:t}\)、上下文 \(C_t\)，预测未来动作块 \(a_{t:t+H}\)。可以把训练目标写成：

$$
\max_\theta\ \mathbb{E}_{D}\left[\log \pi_\theta(a_{t:t+H}\mid o_{t-T:t}, C_t)\right]
$$

其中上下文不再只是短语言指令，而是多模态结构：

$$
C_t = (\ell_{\mathrm{task}}, \ell_{\mathrm{subtask}}, g_t, m_{\mathrm{quality}}, m_{\mathrm{speed}}, m_{\mathrm{mistake}}, m_{\mathrm{control}})
$$

\(\ell_{\mathrm{task}}\) 描述总体任务，例如“clean the kitchen”；\(\ell_{\mathrm{subtask}}\) 描述当前阶段，例如“pick up the knife”；\(g_t\) 是多视角子目标图像；metadata 描述该段轨迹执行得快不快、好不好、是否出错以及使用关节控制还是末端控制。这个设计的直觉是：失败轨迹也能教模型“什么情况下会失败”，但前提是模型知道它是失败轨迹，而不是把它当成理想示范。

```python
# π0.7 测试时可操控推理伪代码
def pi07_rollout(observation_history, task_instruction, desired_metadata):
    memory = encode_observation_history(observation_history)
    subtask = high_level_policy(
        observation=observation_history,
        task=task_instruction,
        metadata=desired_metadata,
        previous_subtasks=[]
    )

    while not task_done():
        subgoal_images = world_model(
            current_observation=observation_history,
            subtask_instruction=subtask,
            metadata=desired_metadata
        )

        context = {
            "task": task_instruction,
            "subtask": subtask,
            "subgoal_images": subgoal_images,
            "metadata": desired_metadata,
            "control_mode": choose_control_mode(task_instruction)
        }

        action_chunk = pi07_vla_action_expert(
            observation_memory=memory,
            context=context
        )
        execute_prefix(action_chunk)
        observation_history = update_observations()
        memory = update_memory(memory, observation_history)
        subtask = high_level_policy(observation_history, task_instruction, desired_metadata)
```

![π0.7 prompt 示例](https://ar5iv.labs.arxiv.org/html/2604.15483/assets/x2.png)
*图：同一个模型可以同时接收当前观测、子目标图像、子任务文本和 metadata；折衣任务中使用 subgoal 与质量/速度提示完成跨本体迁移。*

子任务语言解决的是长时任务分解。对“把食物放到桌上”这类任务，单句总体指令不一定告诉机器人下一步该按微波炉按钮、取盘子还是关门。π0.7 在训练中为片段标注中间语义步骤，让模型能被人类实时 coaching，也能由高层策略自动生成下一条 subtask instruction。论文中空气炸锅、倒出空气炸锅、烤贝果等长时任务没有对应机器人训练轨迹，但模型可以在人工逐步口头提示下完成，再把这些语言指导轨迹用于训练高层策略，实现自主执行。

子目标图像解决的是“语言不够具体”。例如“抓住把手”没有说明手腕视角下夹爪应处于何种姿态；世界模型根据当前观测和子任务生成近未来目标图像，把目标状态以视觉方式传给 VLA。这个机制在跨本体时尤其重要：源机器人和 UR5e 的工作空间、惯量和夹爪姿态不同，生成的子目标能给目标机器人一个更贴合自身形态的视觉参照。

metadata 是 π0.7 能利用混合质量数据的关键。论文把 episode speed/length、quality score、mistake label 等作为 prompt token 注入训练；部署时可以要求高质量、较快、无错误的行为。这样，低质量或失败数据不会被简单平均进“理想动作”，而是作为有条件经验存在。官方博客还强调，将 RL specialist/Recap 过程中产生的自主数据加上策略元数据蒸馏进 π0.7 后，单一 generalist 能在洗衣、浓缩咖啡、折箱等任务上接近或超过专门 RL policy 的吞吐和成功率。

与 π0/π0.5 这类主要依赖短任务描述的模型相比，π0.7 的提升来自更丰富的上下文接口。论文明确说它构建在 π0.6 与 MEM 记忆系统之上，并不是把泛化归因于一个孤立的新网络层；真正的设计点是让训练样本携带足够的“意图解释”，使模型能从多机器人、多策略、多质量的数据中抽取可组合技能。

实验层面，π0.7 的亮点包括：无需任务特定后训练即可完成浓缩咖啡、洗衣、扔垃圾袋、折箱、削蔬菜等 dexterous long-horizon 任务；在未见厨房/卧室环境中跟随复杂语言；在没有 UR5e 洗衣折叠数据的情况下，将源双臂平台的折衣技能迁移到 bimanual UR5e，并达到接近专家遥操作员零样本表现的成功率；对新短任务可直接 prompt，对更长的新电器任务可通过语言 coaching 学会。

> ⚠️ 注意：π0.7 展示的是“strong signs of compositional generalization”，不是完全解决机器人组合泛化。论文也指出新任务定义、训练数据泄漏边界和长时自主稳定性仍然是评估难点。

#### 🧪 练习题

```yaml
question: "π0.7 为什么要在 prompt 中加入质量、速度、错误等 episode metadata？"
options:
  - "为了把动作空间从连续值改成纯文本输出"
  - "为了让模型区分不同质量和策略的数据，从而利用失败或低质量数据而不把它们平均成理想行为"
  - "为了删除语言指令，只依赖子目标图像"
  - "为了让每个新任务都必须重新训练一个专用模型"
answer: 1
explain: "metadata 把轨迹的执行方式和质量显式条件化，部署时可要求高质量/无错误策略；否则混合演示、失败和自主 rollout 容易让模型学到平均且次优的动作。"
```
