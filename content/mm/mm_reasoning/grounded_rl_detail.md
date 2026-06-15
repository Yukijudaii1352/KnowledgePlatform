### Grounded-RL - 接地强化学习 (Grounded Reinforcement Learning)

```yaml
id: grounded_rl
name: Grounded-RL
full_name: "接地强化学习 (Grounded Reinforcement Learning)"
year: "2026"
org: "CMU"
paper_url: "https://proceedings.neurips.cc/paper_files/paper/2025/hash/ddbd83ac1ad27304a72b873124c2dac2-Abstract-Conference.html"
category: "frontier_2026"
parent: "reason_rft"
motivation: "推理步骤锚定视觉证据，减少幻觉"
```

#### 📝 一句话总结

Grounded-RL 提出 ViGoRL，用强化学习训练视觉语言模型在每一步推理中显式输出图像坐标，把自然语言思考锚定到可检查的视觉证据。它用 MCTS 生成带回溯和区域探索的冷启动轨迹，再用 GRPO 优化最终任务奖励，从而缓解普通 CoT/RL 只追求答案正确却不真正看图的问题。

#### 🎯 核心要点

- **显式接地推理轨迹**：将每个推理节点表示为 \(\langle s_t,(x_t,y_t)\rangle\)，其中 \(s_t\) 是文本思考，\((x_t,y_t)\) 是对应视觉证据位置
- **两阶段训练流程**：先用教师模型和 MCTS 生成接地推理树并做 SFT 冷启动，再用 GRPO 对接地格式和任务正确性进行强化学习
- **MCTS 冷启动数据**：用 Qwen2.5-VL-72B 作为教师扩展搜索树，从 1,500 个 prompts 生成约 30K 条高质量接地推理轨迹
- **复合奖励设计**：总奖励由格式奖励 \(r_{\text{fmt}}\) 和任务奖励 \(r_{\text{task}}\) 加权组成，坐标引用必须合法才给格式分
- **多轮视觉反馈**：模型可通过 `<tool_call>` 请求以预测坐标为中心的高分辨率 crop，再基于 `<observation>` 继续推理
- **跨任务评估**：覆盖 SAT-2、BLINK、RoboSpatial、V*Bench、ScreenSpot、VisualWebArena 等空间推理、视觉搜索和网页 grounding 任务

#### 🔬 深入细节

##### 核心框架

![ViGoRL 方法总览](https://arxiv.org/html/2505.23678v3/Figures/Figure2_V3.jpg)
*图：ViGoRL 先用 MCTS 生成接地图像区域的推理树，线性化为 SFT 冷启动轨迹，再用 GRPO 按最终奖励强化接地推理行为。*

##### 动机与背景

传统多模态 CoT 让模型输出较长的文字推理，但这些推理步骤往往只停留在“图中有某物”“左边那个区域”等模糊引用上。论文观察到，普通 VLM 在复杂视觉推理中常把图像当作静态上下文，而不是在每一步主动定位、检查、回看具体区域；标准 RL 只奖励最终答案时，还可能放大这种捷径，因为模型可以靠语言模式或数据偏置拿到奖励。

Grounded-RL 的核心判断是：视觉推理和数学/代码推理不同，模型不仅要会“想”，还要知道每个想法来自图像中的哪里。因此 ViGoRL 把推理链从纯文本序列改写为带坐标的轨迹：

$$
\tau = [n_1,\ldots,n_T,a], \quad n_t=\langle s_t,(x_t,y_t)\rangle
$$

对应的策略分解为：

$$
\pi_\theta(\tau \mid I,q)=
\left(\prod_{t=1}^{T}\pi_\theta(n_t \mid I,q,n_{<t})\right)
\pi_\theta(a \mid I,q,n_{\le T})
$$

这里的关键不是让模型多输出一个坐标字段，而是把坐标变成策略的一部分。模型必须为每个推理步骤选择一个可定位的视觉证据点，后续训练才能奖励“有效地看图”和“正确地回答”。

##### MCTS 生成接地冷启动轨迹

ViGoRL 不直接从空白模型开始 RL，因为预训练 VLM 的初始采样分布很少包含充分的区域探索、视觉验证和回溯。论文用 MCTS 构造冷启动数据，每个搜索节点就是一个接地推理步骤 \(\langle s_t,(x_t,y_t)\rangle\)：

```python
# ViGoRL MCTS 冷启动伪代码
def build_grounded_traces(image, question, teacher, judge):
    tree = init_root(image, question)
    for _ in range(num_search_iters):
        node = select_by_ucb(tree)                       # 选择高价值且未充分探索的路径
        child = teacher.sample_grounded_step(node)       # 生成 thought + coordinate，或候选答案
        reward = rollout_until_answer(child, teacher, judge)
        backpropagate(child, reward)                     # 将终局正确性回传到路径

    paths = extract_successful_and_corrected_paths(tree)
    return linearize(paths)                              # direct chains + corrected chains
```

MCTS 的价值在于它天然支持分支探索和回溯：如果某个区域或思路导致错误，搜索树可以转向其他区域，并把“等一下，这里不对”的纠正链也保留下来。线性化后有两类 SFT 样本：直接走向正确答案的 direct chains，以及先失败再回溯修正的 corrected chains。这比普通 teacher distillation 更像人类视觉检索过程。

##### GRPO 强化接地格式与答案正确性

SFT 得到的 \(\pi_{\theta_0}\) 只是模仿 MCTS 轨迹，面对新问题不一定最优。ViGoRL 接着用 GRPO 优化长轨迹奖励。对同一输入 \(x\) 采样 \(G\) 条轨迹 \(\{\tau^{(i)}\}_{i=1}^{G}\)，每条轨迹有标量奖励 \(r^{(i)}=R(\tau^{(i)})\)，组内优势为：

$$
\hat{A}^{(i)} = r^{(i)} - \bar{R}, \quad
\bar{R}=\frac{1}{G}\sum_i r^{(i)}
$$

GRPO 的裁剪目标可写为：

$$
\mathcal{L}_{\text{GRPO}}(\theta)=
-\frac{1}{G}\sum_{i=1}^{G}\frac{1}{|\tau^{(i)}|}
\sum_t
\min\left[
\rho_t^{(i)}\hat{A}^{(i)},
\text{clip}(\rho_t^{(i)},1-\epsilon,1+\epsilon)\hat{A}^{(i)}
\right]
\beta D_{\text{KL}}(\pi_\theta\|\pi_{\text{ref}})
$$

其中 \(\rho_t^{(i)}=\frac{\pi_\theta(\tau_t^{(i)}\mid \tau_{<t}^{(i)},x)}{\pi_{\text{old}}(\tau_t^{(i)}\mid \tau_{<t}^{(i)},x)}\)。总奖励为：

$$
R(\tau)=\lambda_{\text{fmt}}r_{\text{fmt}}+\lambda_{\text{task}}r_{\text{task}}
$$

\(r_{\text{fmt}}\) 检查 `<think>`、`<answer>` 和坐标格式是否有效，且只有所有坐标引用合法时才给格式奖励；\(r_{\text{task}}\) 随任务定义，例如 SAT-2 用答案是否匹配，网页 grounding 用预测坐标是否落在标注框内，网页动作预测则拆成 action type 和 argument 两部分。

> 💡 关键：Grounded-RL 不直接奖励“写得像推理”，而是奖励带合法视觉锚点的推理轨迹和最终任务成功。这样可以抑制没有视觉证据支撑的语言化幻觉。

##### 多轮 RL：把坐标变成可交互视觉反馈

单轮接地仍有一个限制：模型虽然输出了坐标，但视觉编码器看到的还是同一张全局缩放图，小文字、按钮、局部边界可能已经被压缩掉。ViGoRL 因此引入多轮设置：模型预测坐标后，可以调用 crop 工具获得局部高分辨率观察。

```python
# ViGoRL 多轮推理伪代码
def vigorl_multiturn(model, image, question, max_turns=5):
    context = [image, question]
    for _ in range(max_turns):
        output = model.generate(context)
        if has_answer(output):
            return extract_answer(output)

        coord = extract_coordinate_from_tool_call(output)
        crop = crop_around(image, coord)                 # 环境返回局部高分辨率图
        context += [output, f"<observation>{crop}</observation>"]

    context += ["<think>Please provide your response now</think>"]
    return extract_answer(model.generate(context))
```

多轮训练把单轮 MCTS 轨迹改写成 dialog：每轮先输出 `<think>`，再输出 `<tool_call>{"name":"crop","arguments":{"coordinate": ...}}</tool_call>` 或 `<answer>`；环境返回 `<observation>` 后继续。RL 时 observation token 被 mask，不作为策略梯度的目标，因为它们来自环境而不是模型策略。

多轮格式奖励还加入了严格 tag 自动机和坐标多样性奖励：如果模型重复同一坐标、不调用工具或破坏对话结构，格式分会下降；若多次选择足够不同的区域，则可获得小额 bonus。这鼓励模型把推理预算花在真正的视觉探索上，而不是一轮结束或反复看同一点。

##### 与普通 CoT/RL 的区别

| 方法 | 推理中间态 | 奖励重点 | 主要风险 |
|---|---|---|---|
| 普通 CoT | 纯文本 thought | 最终答案或格式 | 文本解释看似合理但未真正引用图像 |
| Vanilla GRPO | 纯文本或弱格式输出 | 任务正确性 | RL 放大捷径，可能更少进行视觉验证 |
| Grounded-RL / ViGoRL | thought + coordinate + 可选 crop | 合法接地、任务正确、区域探索 | 需要构造接地冷启动和工具式多轮环境 |

#### 🧪 练习题

```yaml
question: "Grounded-RL 为什么要先用 MCTS 生成接地冷启动轨迹，再进行 GRPO？"
options:
  - "因为 MCTS 可以替代视觉编码器，直接输出最终答案"
  - "因为预训练 VLM 很少自然产生区域探索和回溯行为，冷启动能把接地推理分布先引入策略"
  - "因为 GRPO 只能优化树结构数据，不能优化线性文本"
  - "因为坐标奖励不需要最终答案正确性"
answer: 1
explain: "论文发现普通 VLM 和 vanilla RL 容易产生不接地图像的语言捷径。MCTS 用教师模型搜索 thought+coordinate 路径，并保留探索、验证、回溯轨迹，使后续 GRPO 有更好的初始策略。"
```
