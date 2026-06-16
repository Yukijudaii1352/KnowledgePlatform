### Retrv-R1 — 推理驱动多模态检索 (Retrv-R1)

```yaml
id: retrv_r1
name: Retrv-R1
full_name: 推理驱动多模态检索 (Retrv-R1)
year: '2026'
org: —
paper_url: https://proceedings.neurips.cc/paper_files/paper/2025/hash/fac28e6ecee78ddcaa938d10bc90cf50-Abstract-Conference.html
category: frontier_2026
parent: clip
motivation: 推理链驱动解决语义鸿沟
```

#### 📝 一句话总结

Retrv-R1 提出面向通用多模态检索的 R1-style MLLM 框架，通过候选信息压缩、细节检查和课程式 GRPO 奖励，让模型用显式推理链选择检索结果，同时控制多候选推理的 token 成本。

#### 🎯 核心要点

- 两阶段检索：先用 embedding 模型召回 top-K 候选，再用推理型 MLLM 选择最佳候选
- Information Compression Module：把每个候选压缩成 content token 和 query-aware relationship token
- Details Inspection Mechanism：CoT 中自动触发特殊 token，给困难候选追加未压缩完整特征
- 冷启动激活：用检索定制合成 CoT 数据先做 SFT，避免直接 RL 训练不稳定
- 强化学习增强：使用 GRPO，并引入格式奖励与结果-效率奖励
- 课程式效率约束：训练早期弱化检查次数惩罚，后期逐步提高效率权重

#### 🔬 深入细节

![Retrv-R1 方法总览](https://arxiv.org/html/2510.02745v2/x1.png)
*图：论文 Figure 1。Retrv-R1 包含两阶段检索、ICM 候选压缩、细节检查机制，以及 self-alignment、SFT、RL 三阶段训练。*

```python
# Retrv-R1 推理驱动重排流程
def retrv_r1(query, all_candidates, embedder, reasoning_mllm, K=50):
    # Stage 1: 先做粗召回
    q_vec = embedder(query)
    cand_vecs = [embedder(c) for c in all_candidates]
    shortlist = topk(cosine(q_vec, cand_vecs), K)

    # Stage 2: 压缩候选，给推理 MLLM 留出 CoT 上下文
    compressed = []
    for c in shortlist:
        t_con = ATT1(query=e_con, key=c.tokens, value=c.tokens)
        rel = ATT2(query=c.tokens, key=query.tokens, value=query.tokens)
        t_rel = ATT1(query=e_con, key=rel, value=rel)
        compressed.append((t_con, t_rel, c.full_tokens))

    cot = reasoning_mllm.generate(query, compressed)
    for idx in cot.requested_inspection_indices():
        cot.append_full_tokens(idx, compressed[idx].full_tokens)
        cot = reasoning_mllm.continue_generate(cot)

    return cot.answer_index()
```

Retrv-R1 的问题设定是 universal multimodal retrieval：查询 \(q\) 可以是文本、图像或交错多模态输入，候选集合为 \(\Omega=\{c_n\}_{n=1}^N\)。直接让 MLLM 看所有候选并逐步推理成本过高，所以框架先用 embedding 模型 \(\phi\) 做粗召回，得到 top-K 子集 \(C=\{c_k\}_{k=1}^K\)，再用第二阶段推理模型 \(\theta\) 在候选内输出最终结果：

$$
\hat{c}=\theta(q,C)
$$

论文的关键判断是：把 DeepSeek-R1 式 RL 直接套到检索并不可行。原因有两个：多候选输入叠加 CoT 会迅速吃满上下文和显存；检索数据上直接 GRPO 容易收敛不稳，模型可能生成看似合理但结果错误的推理。因此 Retrv-R1 先做结构压缩和 SFT 激活，再进入 RL。

Information Compression Module 让每个候选只以两个 token 进入 LM。第一个是候选自身内容 token：

$$
t_{\mathrm{con}}^{c_k}
=\operatorname{ATT}_1(Q_{e_{\mathrm{con}}},K_{T_{c_k}},V_{T_{c_k}})
$$

第二个是 query-aware relationship token，先用候选 token attend 到查询 token 得到关系特征 \(R_{q,c_k}\)，再压缩为关系 token：

$$
t_{\mathrm{rel}}^{c_k}
=\operatorname{ATT}_1(Q_{e_{\mathrm{con}}},K_{R_{q,c_k}},V_{R_{q,c_k}}),
\quad
R_{q,c_k}=\operatorname{ATT}_2(Q_{T_{c_k}},K_{T_q},V_{T_q})
$$

这比只压缩候选内容更适合检索，因为判断相关性往往依赖“与查询相比相同在哪里、不同在哪里”。论文用 self-alignment 预训练 ICM：冻结 LM，让压缩 token 触发的内容/关系描述尽量对齐完整 token 触发的描述，从而减少压缩后语义漂移。

细节检查机制负责补回压缩损失。大多数候选用 \((t_{\mathrm{con}},t_{\mathrm{rel}})\) 就够判断，但困难候选可能需要完整 token。Retrv-R1 给词表加入 `<inspection-index-start>` 和 `<inspection-index-end>`；当 CoT 生成这对标记及候选索引 `idx` 时，系统把 \(T_{c_{idx}}\) 追加到上下文，让模型继续细读。这样模型不是无差别展开所有候选，而是在推理过程中按需申请细节。

训练上，Retrv-R1 先合成检索专用 CoT 数据做 SFT，使模型学会“先猜测理想结果、快速排除负例、对困难正例细查、最后输出索引”的格式。随后用 GRPO 做增强：

$$
\mathcal{J}_{\mathrm{GRPO}}(\theta)
=\mathbb{E}\left[
\frac{1}{G}\sum_{i=1}^{G}
\min\left(\rho_i A_i,\operatorname{clip}(\rho_i,1-\epsilon,1+\epsilon)A_i\right)
-\beta D_{\mathrm{KL}}(\pi_\theta\|\pi_{\mathrm{ref}})
\right]
$$

其中 \(\rho_i=\pi_\theta(o_i)/\pi_{\theta_{\mathrm{old}}}(o_i)\) 表示新旧策略概率比，\(A_i\) 由同组 rollout 的奖励标准化得到。奖励分为格式奖励 \(r_f\) 和结果-效率奖励 \(r_r\)。后者把检索正确性和检查次数同时纳入：

$$
r_r=\mathbf{1}(\hat{c}=\hat{c}_{gt})\left(1-\lambda\frac{N_{\mathrm{ins}}}{K}\right)
$$

\(N_{\mathrm{ins}}\) 是 CoT 中触发细节检查的候选数。课程策略令 \(\lambda_i=i/N_{\mathrm{iter}}\)，早期先允许模型多看细节把准确率学起来，后期再逐步惩罚过度检查，最终同时提升效果和效率。

> ⚠️ 注意：Retrv-R1 的“推理”不是把检索问题改写成普通聊天问答，而是围绕候选压缩、按需展开和可验证索引输出设计了专门的模型结构与奖励。

#### 🧪 练习题

```yaml
question: "Retrv-R1 引入 Details Inspection Mechanism 的主要目的是什么？"
options:
  - "让所有候选都以完整 token 输入，从而避免压缩"
  - "让模型在 CoT 中只对困难候选按需请求完整 token，兼顾准确率和效率"
  - "替代第一阶段 embedding 召回"
  - "把检索任务转换为无监督聚类任务"
answer: 1
explain: "ICM 会压缩候选以节省上下文，但困难样本可能需要细节；DIM 允许模型按索引展开少数候选，并由奖励约束过度使用。"
```
