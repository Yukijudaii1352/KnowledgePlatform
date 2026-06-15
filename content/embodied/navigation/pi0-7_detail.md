### π0.7 — π0.7可操控模型 (π0.7 Steerable Model)

```yaml
id: pi0-7
name: π0.7
full_name: "π0.7可操控模型 (π0.7 Steerable Model)"
year: "2026.04"
org: "Physical Intelligence"
paper_url: "https://physicalintelligence.company/blog/pi-0-7"
category: "vla_model"
parent: "pi0"
motivation: "可操控基础模型涌现泛化"
```

#### 📝 一句话总结

π0.7 在 π0 的 VLA-flow 基础上加入可操控上下文、视频历史编码、高层子目标和世界模型生成的目标图像，使机器人基础模型能按策略、约束和中间目标被“引导”而不只是执行一句指令。

#### 🎯 核心要点

- 采用约 5B 规模 VLA：Gemma3/PaliGemma 风格 VLM backbone、视频历史编码器和约 860M action expert。
- 训练时把语言、任务元数据、成功/失败轨迹、控制模式、策略提示和子目标图像作为可组合上下文。
- 使用 prompt component dropout，使模型在缺失部分上下文时仍能推理，并在有更多上下文时可被精细 steer。
- 保留 π0 的连续动作 flow matching 与 action chunk 机制，支持低延迟控制。
- 引入高层 policy/coaching 生成子任务指令，并可用轻量世界模型异步生成 subgoal image。
- 数据覆盖演示、次优自主数据、RL 后训练策略、人类视频和互联网多模态数据，强调从多样行为中学习可控泛化。

#### 🔬 深入细节

![π0.7 架构图](https://arxiv.org/html/2604.15483v1/x1.png)
*图：π0.7 将 VLM、历史记忆、上下文提示、世界模型子目标和 action expert 组合成可操控 VLA。*

```python
# π0.7 可操控推理伪代码
def act_pi07(obs_history, task, metadata=None, strategy=None):
    context = build_prompt(
        language=task,
        metadata=metadata,
        strategy=strategy,
        control_mode=current_control_mode(),
    )
    memory = video_history_encoder(obs_history)

    if needs_decomposition(task):
        subtask = high_level_policy(context, memory)
        context.add(subtask)

    if needs_visual_subgoal(task):
        subgoal_image = world_model_generate_goal(obs_history[-1], context)
        context.add_image(subgoal_image)

    action_chunk = flow_action_expert(
        images=obs_history[-1].images,
        memory=memory,
        prompt=context,
        proprio=obs_history[-1].proprio,
    )
    return action_chunk
```

π0.7 的问题意识是：一个基础机器人模型即使会完成许多任务，也未必容易被用户或上层系统“操控”。例如同样是清理台面，用户可能希望“先处理易碎物”“避免碰到左侧区域”“失败后换一种抓法”。π0.7 因此把条件从单句语言扩展到多种 context component，并把策略风格、任务元信息和子目标图像纳入模型输入。可以把策略写成条件分布：

$$
\pi_\theta(A_t \mid o_{\le t}, q_t, \ell, c_1,\ldots,c_m),
$$

其中 \(c_i\) 可以是 metadata、strategy prompt、control mode、subgoal image 或历史视频记忆。

动作层仍延续 π0 的 flow matching。对未来动作块 \(A\)、噪声 \(\epsilon\) 和时间 \(\tau\)，模型训练速度场：

$$
\mathcal{L}_{\text{FM}} =
\mathbb{E}\left[
\left\|v_\theta(A^\tau,\tau,o_{\le t},q_t,\ell,c)- (A-\epsilon)\right\|_2^2
\right],
\quad
A^\tau=\tau A+(1-\tau)\epsilon.
$$

也就是说，π0.7 的新意不在抛弃连续动作流，而是在条件端让模型知道“应该以什么方式完成任务”。

训练上，prompt component dropout 很关键。若总是在完整上下文下训练，模型会过度依赖某个强提示；若总是只给语言，又学不到可控性。随机丢弃一部分上下文等价于优化多条件边缘分布：

$$
\mathbb{E}_{M\sim p(M)}
\left[\mathcal{L}\big(\theta; \{c_i: M_i=1\}\big)\right],
$$

其中 \(M\) 是上下文掩码。这样模型在部署时可以从纯语言模式平滑升级到带策略、带历史、带目标图像的精细操控模式。

与 π0 相比，π0.7 更像“可编排的机器人基础模型”：高层 policy 可以生成子任务，世界模型可以给出视觉子目标，action expert 再执行连续控制。与传统 hierarchical planner 相比，它没有把每层完全硬编码，而是让上下文条件进入同一个 VLA 分布，因此可在新任务、新场景和新具身上出现组合泛化。

> ⚠️ 注意：用户给出的博客 URL 在当前环境下未稳定打开；本精读依据公开 arXiv 论文内容整理，并保留 YAML 原始 `paper_url`。

#### 🧪 练习题

```yaml
question: "π0.7 相比 π0 的主要新增能力是什么？"
options:
  - "把连续动作改回离散 token 自回归生成"
  - "通过多种上下文、策略提示和子目标图像实现可操控泛化"
  - "取消图像输入，只使用机器人本体状态"
  - "只面向单一机械臂，不再支持跨具身数据"
answer: 1
explain: "π0.7 保留 flow 动作生成，但扩展了条件上下文和高层子目标机制，使同一基础模型可被更细粒度地 steer。"
```
