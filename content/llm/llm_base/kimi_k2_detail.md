### Kimi K2：开放智能体 MoE 模型 (Kimi K2)

```yaml
id: kimi_k2
name: Kimi K2
full_name: 开放智能体 MoE 模型 (Kimi K2)
year: "2025.07"
org: Moonshot AI
paper_url: https://arxiv.org/abs/2507.20534
category: sparse_moe
parent: deepseek_v3
motivation: MuonClip稳定万亿MoE
```

#### 📝 一句话总结

Kimi K2 提出了 1.04T total、约 32B active 的开放 MoE 智能体模型，并用 MuonClip 解决 Muon 在万亿参数训练中的注意力 logit 爆炸问题。它进一步通过大规模工具使用轨迹合成、可验证奖励与 self-critique rubric reward 的联合 RL，把基础模型能力转化为软件工程、工具调用和多步 agentic 行为。

#### 🎯 核心要点

- Kimi K2 是 1.04T 参数 MoE Transformer，每 token 激活约 32B 参数，采用 DeepSeek-V3 风格的 MLA 注意力
- 架构包含 61 层、384 个总专家、每 token 激活 8 个专家、1 个 shared expert、64 个 attention heads、hidden size 7168
- MuonClip 将 Muon optimizer、weight decay、consistent RMS matching 与 QK-Clip 组合，支撑 15.5T tokens 预训练且无 loss spike
- QK-Clip 监控每个 head 的最大 attention logit，超过阈值 \(\tau\) 时按 head 缩放 query/key projection 权重，而不是直接裁剪 logits
- 稀疏 scaling law 表明在固定 activated parameters 下增加总专家数可以降低训练和验证 loss，因此 K2 采用 sparsity 48
- 预训练数据强调 token utility，通过知识文本 chunk-wise autoregressive rephrasing 与数学学习笔记风格改写提升高质量 token 利用率
- Agentic SFT 数据由 3000+ 真实 MCP 工具、20,000+ 合成工具、自动生成 agents/tasks/rubrics 与轨迹过滤组成
- Post-training 使用 verifiable rewards、self-critique rubric reward、budget control、PTX loss 与统一 Gym-like RL 环境

#### 🔬 深入细节

![Kimi K2 工具规格、agent 与任务合成流程](https://ar5iv.labs.arxiv.org/html/2507.20534/assets/x10.png)
*图：Kimi K2 论文 Figure 8(a)，展示从真实 MCP tools 与合成 applications 构造 tool repository、agents 与 rubric tasks 的流程。*

![Kimi K2 多智能体工具轨迹生成与过滤流程](https://ar5iv.labs.arxiv.org/html/2507.20534/assets/x11.png)
*图：Kimi K2 论文 Figure 8(b)，展示 user agent、task、rubrics、tool simulator 与 judge agent 如何生成并过滤工具调用轨迹。*

```python
# MuonClip optimizer, simplified from Algorithm 1 in the Kimi K2 paper
def muonclip_step(weights, grads, momentum, tau=100, lr=eta, wd=lamb):
    # 1. Muon optimizer step
    for W in weights:
        G = grads[W]
        M[W] = mu * M[W] + G
        O = newton_schulz(M[W]) * sqrt(max(W.shape)) * 0.2  # match Adam RMS
        W -= lr * (O + wd * W)

    # 2. QK-Clip, using max logits already observed in forward
    for layer in model.attention_layers:
        for h in layer.heads:
            S = layer.max_attention_logit[h]
            if S > tau:
                gamma = tau / S
                layer.W_qc[h] *= sqrt(gamma)
                layer.W_kc[h] *= sqrt(gamma)
                layer.W_qr[h] *= gamma
                # shared rotary key component is left untouched in MLA
```

Kimi K2 的预训练问题不是“如何再堆一个 MoE”，而是如何让 Muon 这种 token-efficient optimizer 在 1T 级 MoE 上稳定工作。论文指出，Muon 在同等模型和计算预算下比 AdamW 更有 token efficiency，但扩展时更容易出现 attention logits 爆炸。logit soft-cap 只是在 softmax 输入处截断，无法阻止 \(QK^\top\) 本身继续增大；QK-Norm 又不适合 MLA，因为 MLA 推理时 key 矩阵并不完全物化。

QK-Clip 的设计是 post-update weight clipping。对第 \(h\) 个 attention head：

$$
\mathbf Q^h=\mathbf X\mathbf W_q^h,\quad
\mathbf K^h=\mathbf X\mathbf W_k^h,\quad
\mathbf V^h=\mathbf X\mathbf W_v^h.
$$

attention 输出是：

$$
\mathbf O^h=\mathrm{softmax}\left(\frac{1}{\sqrt d}\mathbf Q^h\mathbf K^{h\top}\right)\mathbf V^h.
$$

K2 在 forward 中记录每个 head 的最大 logit：

$$
S_{\max}^h=\frac{1}{\sqrt d}\max_{\mathbf X\in B}\max_{i,j}\mathbf Q_i^h\mathbf K_j^{h\top}.
$$

当 \(S_{\max}^h>\tau\) 时，使用

$$
\gamma_h=\min\left(1,\frac{\tau}{S_{\max}^h}\right)
$$

缩放权重。对普通 MHA 可以缩放对应 head 的 \(\mathbf W_q^h\) 和 \(\mathbf W_k^h\)；对 MLA，论文只缩放 unshared head components：\(\mathbf q^C\) 与 \(\mathbf k^C\) 各乘 \(\sqrt{\gamma_h}\)，\(\mathbf q^R\) 乘 \(\gamma_h\)，共享的 \(\mathbf k^R\) 不动，避免一个 head 的 clipping 影响其他 head。

> 💡 关键：QK-Clip 不改变当前 step 的 forward/backward，只用已观测到的 \(S_{\max}^h\) 指导更新后的权重缩放。因此它比直接裁剪 logits 更像“训练动力学护栏”，在 early stage 防止注意力分数失控，训练稳定后自然很少触发。

架构上，Kimi K2 延续 DeepSeek-V3 的 MLA 与 MoE 思路，但把稀疏性继续推高。它有 384 个专家，每 token 激活 8 个专家，sparsity 为 48。论文的 scaling law 实验显示，在固定 activated experts 和 shared expert 的情况下，增加总专家数能降低 validation loss；达到同样 validation loss 1.5 时，sparsity 48 相比 sparsity 8、16、32 分别节省 1.69 倍、1.39 倍、1.15 倍 FLOPs。与此同时，K2 把 attention heads 从 DeepSeek-V3 的 128 减到 64，因为在 128K 等长上下文 agentic 场景下，heads 翻倍会显著增加推理 FLOPs，而验证 loss 只改善约 0.5% 到 1.2%。

数据侧的重点是 token utility。K2 的 15.5T 预训练语料覆盖 Web Text、Code、Mathematics、Knowledge。对知识文本，论文使用风格和视角多样的 prompts 做 rephrasing，并用 chunk-wise autoregressive generation 保留长文档全局一致性；对数学文本，则改写为 learning-note style，并引入跨语言翻译扩充多样性。这个设计不是为了简单重复高质量数据，而是让同一知识以不同表述提供更多有效学习信号，降低多 epoch 重复带来的过拟合风险。

Post-training 是 Kimi K2 与普通 chat model 区分最明显的部分。Agentic 数据合成先构建工具库：一部分来自 GitHub 中 3000+ 真实 MCP 工具，一部分来自层级 domain evolution 生成的 20,000+ 合成工具。然后为采样工具集生成 agent system prompts、任务与 rubrics，再通过 user agent、tool simulator 和 judge agent 生成多轮工具调用轨迹。只有满足 rubric 成功条件的轨迹被保留，因此整个流程相当于大规模 rejection sampling，目标是让模型学会“读工具说明、计划、调用、观察反馈、修正动作”。

RL 阶段把可验证任务和主观偏好任务合到同一个框架。对数学、代码、指令遵循、工具调用等任务，奖励可以来自单元测试、解释器、规则检查或 judge；对创意写作、开放问答等不可直接验证任务，K2 使用 self-critique rubric reward，让 K2 critic 根据 core rubrics、prescriptive rubrics 与人工标注 rubrics 对多个响应做 pairwise ranking。其 RL objective 可概括为：

$$
L_{\mathrm{RL}}(\theta)=\mathbb E_{x\sim\mathcal D}\left[\frac{1}{K}\sum_{i=1}^{K}\left(r(x,y_i)-\bar r(x)-\tau\log\frac{\pi_\theta(y_i|x)}{\pi_{\mathrm{old}}(y_i|x)}\right)^2\right],
$$

其中

$$
\bar r(x)=\frac{1}{K}\sum_{i=1}^{K}r(x,y_i).
$$

奖励中心化项 \(r(x,y_i)-\bar r(x)\) 让同一 prompt 下的候选响应相互比较，KL-like 的 log ratio 正则项约束新旧策略偏移，\(\tau>0\) 控制稳定性。K2 还加入 budget control，超过任务 token budget 的响应会被截断并惩罚，以避免 RL 把所有任务都推向冗长输出；同时通过辅助 PTX loss 混入手选高质量样本，减少 joint RL 对窄任务集合的过拟合和遗忘。

与 DeepSeek-V3 路线相比，Kimi K2 的差异在三处：更高稀疏度的 MoE 设计，更适合 Muon 的 QK-Clip 稳定机制，以及面向 agentic intelligence 的后训练数据与 RL 框架。它不是单纯追求 benchmark 的非交互模型，而是把工具环境、trajectory filtering、verifiable reward 和 self-critique 结合起来，专门强化软件工程、工具调用和多步任务执行。

#### 🧪 练习题

```yaml
question: "Kimi K2 中 QK-Clip 相比直接 logit soft-cap 的关键区别是什么？"
options:
  - "QK-Clip 直接删除超过阈值的 token"
  - "QK-Clip 在权重更新后缩放 query/key projection，约束后续 attention logit 增长"
  - "QK-Clip 只用于推理，不参与训练"
  - "QK-Clip 把 MoE top-8 routing 改成 dense FFN"
answer: 1
explain: "QK-Clip 使用 forward 中观测到的最大 attention logit 来缩放 Q/K 权重，属于训练稳定性的权重护栏，而不是在 softmax 输入处简单截断。"
```
