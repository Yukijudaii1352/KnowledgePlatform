### UI-Voyager

```yaml
id: ui_voyager
name: UI-Voyager
full_name: "UI航行者 (UI-Voyager)"
year: "2026"
org: "Tencent"
paper_url: "https://arxiv.org/abs/2603.24533"
category: "frontier_2026"
parent: "uground"
motivation: "群体相对自我蒸馏实现步级监督学习"
```

#### 📝 一句话总结

UI-Voyager 提出了一种两阶段自进化移动 GUI Agent 训练框架，用 RFT 自动筛选成功轨迹，用 GRSD 从成功/失败轨迹的分叉点构造步级监督，解决长程 GUI 任务中失败轨迹难利用和稀疏奖励信用分配困难的问题。其 4B 模型在 AndroidWorld 上达到 81.0% Pass@1。

#### 🎯 核心要点

- 面向 AndroidWorld 移动 GUI 自动化，覆盖 116 个真实 App 任务
- 第一阶段 Rejection Fine-Tuning：模型自主 rollout，多次采样后由规则 verifier 过滤成功轨迹做 SFT
- 第二阶段 Group Relative Self-Distillation：对同任务的一组成功/失败轨迹做相对比较
- 使用 SSIM 等相似度匹配跨轨迹相同屏幕状态，定位 fork point
- 从成功轨迹提取正确动作、思维过程和工具调用过程，纠正失败轨迹中的关键错误步
- 将稀疏轨迹级成功/失败信号转化为密集步级监督，缓解长程任务 credit assignment
- 相比直接从 Qwen3-VL-4B-Instruct 做 PPO/GRPO，RFT + GRSD 更高效、更稳定

#### 🔬 深入细节

##### 框架总览

![UI-Voyager 训练管线](https://arxiv.org/html/2603.24533v1/x2.png)
*图：UI-Voyager 的两阶段训练管线。RFT 自动收集成功轨迹，GRSD 在成功与失败轨迹之间检测 fork point 并构造自纠错样本。*

##### 算法流程

```python
# UI-Voyager RFT + GRSD 伪代码
policy = qwen3_vl_4b_instruct

# Stage 1: Rejection Fine-Tuning
for round_id in range(num_rft_rounds):
    accepted = []
    for task in androidworld_tasks:
        trajectories = rollout(policy, task, k=num_samples)
        for tau in trajectories:
            if rule_based_verifier(task, tau) == "success":
                accepted.append(tau)
    policy = supervised_finetune(policy, accepted)

# Stage 2: Group Relative Self-Distillation
for task in androidworld_tasks:
    group = rollout(policy, task, k=group_size)
    success_trajs = [tau for tau in group if tau.success]
    failed_trajs = [tau for tau in group if not tau.success]

    corrective_samples = []
    for tau_minus in failed_trajs:
        for tau_plus in success_trajs:
            fork = find_fork_point(tau_plus, tau_minus, sim="SSIM")
            if fork is not None:
                sample = build_step_supervision(
                    observation=tau_minus.obs[fork.failed_step],
                    teacher_thought=tau_plus.thought[fork.success_step],
                    teacher_action=tau_plus.action[fork.success_step],
                )
                corrective_samples.append(sample)

    policy = mixed_sft(policy, accepted + corrective_samples)
```

##### 方法细节

UI-Voyager 的核心问题是 GUI 任务的奖励极度稀疏。一个 AndroidWorld 任务可能需要十几步点击、输入、滑动和导航，最终成功才有正反馈。如果整条轨迹失败，传统 RL 很难判断到底是哪一步出了错；直接丢弃失败轨迹又浪费了大量交互数据，因为失败轨迹前半段往往包含正确操作。

第一阶段 RFT 解决冷启动问题。模型从 Qwen3-VL-4B-Instruct 出发，在真实任务环境中对每个任务采样多条轨迹，规则 verifier 只保留成功轨迹，再用这些成功轨迹做监督微调。重复多轮后，数据分布和模型能力共同进化：模型越强，采到的成功轨迹越多；成功数据越多，下一轮模型越强。

RFT 的限制是它只学习成功轨迹，仍然没有解释失败轨迹的错误点。GRSD 的关键 insight 是：同一个任务的多条 rollout 往往会走到相同屏幕状态，但下一步动作不同。若一条成功、一条失败，那么它们在相同状态后的分歧就是高价值监督信号。论文称这些共享状态上的分歧为 fork point。

fork point 检测可抽象为：

$$
\text{SAME}(o_i^+, o_j^-)=\mathbb{1}[\text{Sim}(o_i^+,o_j^-)>\tau]
$$

$$
\text{Fork}(i,j)=\text{SAME}(o_i^+,o_j^-)\land a_i^+ \neq a_j^-
$$

其中 \(o_i^+\) 来自成功轨迹，\(o_j^-\) 来自失败轨迹。UI-Voyager 使用 SSIM 做视觉状态匹配，找到两个轨迹“看见同一屏幕但做了不同决定”的位置，再把成功轨迹在该步的思考、动作和工具调用过程抽出来，作为失败轨迹该状态下的 teacher signal。

这样一来，原本只有终局成败的轨迹级信号被转化为步级纠错数据：

$$
\mathcal{D}_{corr}=\{(o_j^-, q, \text{thought}_i^+, a_i^+)\}
$$

训练时把成功轨迹样本与自纠错样本混合做 SFT。相比 PPO/GRPO 这类标准 RL 方法，GRSD 不需要从稀疏奖励中估计每一步优势，而是直接利用“同状态成功动作 vs 失败动作”的相对关系，给模型更清晰的监督。

论文在 AndroidWorld 上报告 4B 模型达到 81.0% Pass@1，超过多个更大模型和报告的人类水平。消融显示，RFT 可显著提升初始能力，而 GRSD 进一步把 RFT 模型从约 73.2% 提升到 81.0%，标准 PPO/GRPO 则进展更慢并在较低水平附近平台化。

> 💡 关键：GRSD 的价值不是简单“从成功样本学习”，而是把失败样本中可定位的关键错误步骤改造成高质量监督样本。

#### 🧪 练习题

```yaml
question: "UI-Voyager 中 GRSD 的核心作用是什么？"
options:
  - "把所有失败轨迹直接删除，只保留成功轨迹"
  - "通过成功/失败轨迹的相同屏幕状态找到分叉点，并用成功动作纠正失败轨迹的关键错误步"
  - "将 AndroidWorld 任务改写为纯文本问答"
  - "用更大的模型替换所有训练算法"
answer: 1
explain: "GRSD 通过跨轨迹状态匹配找到 fork point，把稀疏轨迹奖励转化为密集步级监督，从而更有效地学习失败经验。"
```
