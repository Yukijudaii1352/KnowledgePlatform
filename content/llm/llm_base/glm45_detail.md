### GLM-4.5：面向 Agent、推理与编码的 ARC MoE 基础模型

```yaml
id: glm45
name: GLM-4.5
full_name: ARC 基础模型 (GLM-4.5)
year: '2025.08'
org: Zhipu AI / Tsinghua
paper_url: https://arxiv.org/abs/2508.06471
category: sparse_moe
parent: deepseek_v3
motivation: 面向智能体推理编码
```

#### 📝 一句话总结

GLM-4.5 提出了一个 355B 总参数、32B 激活参数的开源 MoE 模型，通过“更深而非更宽”的架构、多阶段 23T token 预训练，以及专家模型迭代式后训练，统一强化 Agent、Reasoning、Coding 三类 ARC 能力。它同时支持 thinking 与 direct response 两种模式，用较少参数在 TAU-Bench、AIME 24、SWE-bench Verified 等任务上取得强竞争力。

#### 🎯 核心要点

- **ARC 目标定义**：把 Agentic、Reasoning、Coding 作为同一基础模型必须同时覆盖的三类能力，而不是分别训练专用模型。
- **355B/32B MoE 架构**：GLM-4.5 使用 355B 总参数、32B 激活参数；GLM-4.5-Air 使用 106B 总参数、12B 激活参数。
- **更深的 MoE 取舍**：相对 DeepSeek-V3/Kimi K2 减少 hidden dimension 与 routed experts 数量，增加层数，论文认为更深模型更利于推理。
- **MoE 路由与注意力稳定性**：使用 loss-free balance routing、sigmoid gates、GQA、partial RoPE、96 attention heads、QK-Norm，并加入 MoE MTP layer 支持 speculative decoding。
- **23T tokens 多阶段训练**：预训练从 4K context 起步，中训扩展到 32K/128K，并加入 repo-level code、合成推理数据和长上下文/agent 轨迹。
- **专家模型迭代后训练**：Stage 1 分别训练 Reasoning、Agent、General chat 专家；Stage 2 用 self-distillation 融合成单一 hybrid reasoning generalist。
- **Reasoning RL 配方**：基于无 KL 项的 GRPO，使用两阶段难度课程、直接 64K 输出长度 RL、动态采样温度、code RL token-weighted mean loss。
- **Agentic RL 配方**：用 web-search 与 SWE/coding sandbox 的可验证结果做 outcome supervision，并加入 tool/action format penalty、迭代自蒸馏和 interaction-turn scaling。
- **Slime RL 基础设施**：支持 colocated synchronous 与 disaggregated asynchronous 两种模式，使用 Megatron 训练、SGLang/Router rollout、Data Buffer 与 FP8 rollout 加速。

#### 🔬 深入细节

![GLM-4.5 预训练与中训流程](https://ar5iv.labs.arxiv.org/html/2508.06471/assets/x3.png)
*图：论文 Figure 3 展示 GLM-4.5 的预训练与中训阶段，最大序列长度从 4K 扩展到 32K，再扩展到 128K，并引入代码、推理和 agent 数据。*

```python
# GLM-4.5 ARC 后训练的核心流程，按论文整理
base = pretrain_moe(tokens="23T", context=[4096, 32768, 131072])

experts = {}
for domain in ["reasoning", "agent", "general"]:
    model = cold_start_sft(base, domain_data[domain])
    if domain == "reasoning":
        model = grpo_rl(
            model,
            curriculum=["moderate", "very_hard_verified"],
            max_output_len=64000,
            dynamic_temperature=True,
        )
    elif domain == "agent":
        traces = rollout_in_web_and_swe_envs(model)
        reward = outcome_reward(traces) - action_format_penalty(traces)
        model = groupwise_policy_optimization(model, traces, reward)
        model = iterative_self_distill(model, successful_traces=traces)
    else:
        model = general_rl(model, feedback=["rules", "human_rm", "critique_model"])
    experts[domain] = model

glm45 = unified_sft_distill(
    base,
    teachers=experts,
    mix_thinking_and_direct_response=True,
    max_context=128000,
)
```

GLM-4.5 的架构创新来自两个方向：MoE 宽深取舍和注意力配置。它没有简单沿 DeepSeek-V3/Kimi K2 的宽模型路线继续扩专家数，而是把 hidden dimension 设为 5120、routed experts 设为 160、MoE layers 增至 89，并保持 8 个专家激活。论文明确说，相比 DeepSeek-V3 和 Kimi K2，它减少宽度、增加高度，因为实验中更深模型显示出更强 reasoning capacity。这个设计让 GLM-4.5 的总参数只有 355B，但激活参数仍保持 32B 级别，目标是在 ARC 任务中用较少总参数获得接近前沿模型的能力。

注意力层也体现了“评测能力不完全等价于训练 loss”的经验。GLM-4.5 使用 GQA 与 partial RoPE，并在 5120 hidden dimension 下设置 96 个 attention heads，约为常规配置的 2.5 倍。论文指出，增加 head 数并不改善训练 loss，却能在 MMLU、BBH 等 reasoning benchmark 上稳定提升；同时用 QK-Norm 稳定 attention logits。与 Kimi K2 减少头数以控制长上下文推理 FLOPs 的取舍不同，GLM-4.5 更强调通过更多 head 提升推理模式的多样性。

训练数据和阶段安排服务于 ARC 目标。预训练语料覆盖网页、社媒、书籍、论文、代码、多语言、数学与科学文档，总规模 23T tokens；中训阶段引入三类专项数据：repo-level code 用同一仓库内拼接文件、issue、PR、commit diff 学跨文件依赖；synthetic reasoning data 用推理模型生成数学、科学、竞赛代码的推理过程；long-context & agent training 把 context 从 32K 推到 128K，并加入大规模合成 agent trajectories。这里的中训不是普通继续预训练，而是把软件工程、长上下文和工具交互提前注入 base model。

后训练采用“先分化专家，再融合”的两阶段策略。Stage 1 中，Reasoning、Agent 和 General chat 各自从 cold-start SFT 开始，再做针对性 RL；Stage 2 则用 self-distillation 把多个专家能力蒸馏回一个统一模型。为了让最终模型能同时处理复杂推理和即时聊天，整体 SFT 数据混合了带长 CoT 的样本和不显式展示思考过程的样本，因此 GLM-4.5 支持 thinking mode 与 non-thinking/direct response mode。这种设计的关键收益是减少单一 RL 流程里的目标冲突：专家阶段先把每类能力推高，统一阶段再处理能力融合。

Reasoning RL 基于 GRPO，但去掉 KL loss。论文强调 reward variance：太简单的题全是 1、太难的题全是 0，都会没有有效梯度，所以它使用两阶段 difficulty-based curriculum，第一阶段中等难度，第二阶段切换到 pass@8=0 但 pass@512>0 的极难且可验证问题。输出长度方面，论文发现直接用 64K 最大输出长度做 single-stage RL 优于逐步增加长度的 multi-stage RL，因为 SFT 已经让模型适应 64K，较短 RL 阶段会让模型“忘掉”长输出能力。动态温度则在 reward 稳定后提高探索，并用 held-out 验证控制性能下降不超过约 1%。

Agentic RL 把 web search 与 SWE/coding agent 视为可验证环境。对 web search，用最终答案正确性作为整条轨迹 reward；对 coding/SWE，用可执行测试和 sandbox 结果判断任务完成。论文特别加入 process action format penalty：如果工具调用格式错误，轨迹会被中止并给零奖励，保证模型学到的不是“答对即可”，而是“用可解析、可执行的动作答对”。此外，agent RL 通过迭代自蒸馏减少昂贵 RL 的成本：先对 cold-start 模型做 RL，停滞后用 RL 模型生成更好的 SFT 数据，再继续 RL 并逐步提高难度。

Slime 是 GLM-4.5 后训练能规模化的工程基础。对数学/代码等较规则 RL，它支持 training/inference colocated 的同步模式以减少 GPU 空闲；对 SWE 等 agent 任务，它采用 disaggregated asynchronous 模式，让 rollout engine 持续与环境交互，training engine 独立消费 Data Buffer 并同步参数。因为 agent rollout 可能耗时很长、长度差异很大，同步等待最慢轨迹会严重浪费 GPU；异步解耦则把“慢环境交互”和“密集参数更新”分开，使多任务 agent RL 可持续吞吐。

#### 🧪 练习题

```yaml
question: "GLM-4.5 后训练为什么采用 Expert Training 再 Unified Training？"
options:
  - "为了把所有专家永久保留为独立模型，避免单模型推理"
  - "先分别强化推理、Agent、通用对话，再通过蒸馏融合为支持 thinking/direct response 的单一模型"
  - "为了替代 MoE router，让每个任务固定走一个专家"
  - "为了只训练 GLM-4.5-Air，再蒸馏出 GLM-4.5"
answer: 1
explain: "论文的 Stage 1 按 Reasoning、Agent、General chat 分别训练专家，Stage 2 用 self-distillation 统一到一个 hybrid reasoning generalist。"
```
