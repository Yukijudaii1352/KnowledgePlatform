### ToolHijacker: Prompt Injection Attack to Tool Selection in LLM Agents

```yaml
id: toolhijacker
name: ToolHijacker
full_name: "工具劫持 (ToolHijacker: Agent Hijacking)"
year: '2026.02'
org: NDSS
paper_url: https://www.ndss-symposium.org/ndss-paper/neurostrike-neuron-level-attacks-on-aligned-llms/
category: content_safety
parent: nemo_guard
motivation: 揭示工具文档劫持攻击
```

#### 📝 一句话总结

ToolHijacker 揭示了 LLM agent 的 retrieval-then-selection 工具选择管线可被恶意工具文档劫持，攻击者只需注入精心优化的 tool description，就能让 agent 在目标任务中优先选择攻击者工具。

#### 🎯 核心要点

- Manifest 中 paper_url 指向 NeuroStrike；ToolHijacker 官方 NDSS 页面为 `https://www.ndss-symposium.org/ndss-paper/prompt-injection-attack-to-tool-selection-in-llm-agents/`
- 攻击目标是工具选择两阶段：retrieval 阶段进入 Top-k，selection 阶段被 LLM 选中
- Threat model 是 no-box：攻击者无法访问目标 retriever、目标 LLM 或真实任务分布
- 构建 shadow task descriptions、shadow retriever、shadow LLM 和 shadow tool library 做替代优化
- 将恶意 tool description 分为 \(R\oplus S\)：\(R\) 优化检索相关性，\(S\) 优化最终选择
- 提供 gradient-free 与 gradient-based 两类优化方法
- 在 MetaTool、ToolBench 等工具库和 GPT-4o、Claude、Llama 等目标模型上报告高 ASR/AHR
- 防御实验显示 prevention/detection 基线均存在缺口，暴露工具文档供应链风险

#### 🔬 深入细节

##### 示意图/图源

![ToolHijacker 工具选择攻击示意图](https://arxiv.org/html/2504.19793v2/x1.png)
*图：正常情况下 agent 检索并选择合法工具；攻击时恶意工具文档同时操纵检索和选择，使 agent 执行攻击者工具。*

##### 算法/流程伪代码

```python
# ToolHijacker gradient-free optimization for malicious selection string S
def optimize_toolhijacker(target_task, attacker_llm, shadow_llm, shadow_retriever):
    Q_shadow = generate_shadow_task_descriptions(target_task)
    D_shadow = build_shadow_tool_library(target_task)

    # R: retrieval-oriented description, semantically close to target tasks
    R = attacker_llm.generate_functionality_summary(Q_shadow)

    # S: selection-oriented injection suffix
    S_candidates = [initial_selection_prompt()]
    feedback = []

    for q in Q_shadow:
        for _ in range(T_iter):
            variants = []
            for S in S_candidates:
                variants += attacker_llm.rewrite_variants(
                    S, query=q, tools=D_shadow, feedback=feedback, n=B
                )

            scores = []
            for S_new in variants:
                malicious_doc = make_tool_doc(name=attacker_tool, description=R + S_new)
                hit_count = 0
                eval_outputs = []
                for q_eval in Q_shadow:
                    topk = shadow_retriever(q_eval, D_shadow + [malicious_doc])
                    selected = shadow_llm.select_tool(q_eval, topk)
                    eval_outputs.append(selected)
                    if regex_match(selected, attacker_tool):
                        hit_count += 1
                scores.append((hit_count, S_new, eval_outputs))

            if max(scores).hit_count == len(Q_shadow):
                return R + max(scores).S_new

            S_candidates = prune_top_width(scores, W)
            feedback = collect_feedback(scores)

    return R + best_seen(S_candidates)
```

##### 方法解读

很多 LLM agent 的工具选择遵循 retrieval-then-selection：先用用户任务描述从工具库检索 Top-\(k\) 文档，再把这些工具文档交给 LLM 选择要调用的工具。ToolHijacker 的核心发现是，工具文档本身是一种可注入的提示面。如果第三方工具市场、插件仓库或企业内部工具库允许攻击者提交工具描述，攻击者就可以让描述既“像目标任务相关工具”，又“诱导 LLM 选自己”。

论文把攻击优化写成：

$$
\max_{d_t}\frac{1}{m'}\sum_{i=1}^{m'}\mathbb{I}\left(E'(q_i',Top\text{-}k'(q_i';D'\cup\{d_t\}))=o_t\right)
$$

其中 \(q_i'\) 是 shadow task description，\(D'\) 是 shadow tool library，\(E'\) 是 shadow LLM，\(d_t\) 是恶意工具文档，\(o_t\) 是选择攻击者工具的输出。这个目标同时覆盖“被检索到”和“被最终选中”两个条件。

为了可优化，ToolHijacker 把 tool description 切成 \(R\oplus S\)。\(R\) 针对 retrieval objective：让恶意文档与目标任务语义相似，稳定进入 Top-\(k\)。Gradient-free 版本让攻击者 LLM 从 shadow task descriptions 中总结通用功能描述；gradient-based 版本则利用 shadow retriever 的 embedding gradient 或 HotFlip 类 token 替换，最大化平均相似度：

$$
\max_R\frac{1}{m'}\sum_{i=1}^{m'}Sim(f'(q_i'),f'(R\oplus S))
$$

\(S\) 针对 selection objective：在候选工具文档都已进入 prompt 后，诱导 LLM 选择恶意工具。Gradient-free 版本使用树状搜索：攻击者 LLM 根据上一轮反馈生成多个 \(S\) 变体，shadow LLM 在所有 shadow tasks 上评估是否选择攻击者工具，保留 hit count 高的节点继续扩展。Gradient-based 版本则把目标写成最大化 shadow LLM 生成恶意工具名 \(d_{t\_name}\) 的概率，并加入一致性与可读性损失。

论文的三个损失项分别是 alignment loss、consistency loss 和 perplexity loss：

$$
\mathcal{L}_{all}(x^{(i)},S)=\mathcal{L}_1(x^{(i)},S)+\alpha\mathcal{L}_2(x^{(i)},S)+\beta\mathcal{L}_3(x^{(i)},S)
$$

\(\mathcal{L}_1\) 提高输出目标工具的概率，\(\mathcal{L}_2\) 强化工具名一致性，\(\mathcal{L}_3\) 控制文本可读性，降低人工或规则审查发现异常的概率。

ToolHijacker 的安全意义在于：agent 不仅会被网页、邮件、文件中的间接提示注入攻击，也会被“工具文档供应链”攻击。即使用户任务是良性的，只要检索阶段把恶意工具文档带入上下文，selection 阶段就可能把工具描述当成高优先级指令。防御因此不能只审核用户 prompt，还要审核工具文档来源、工具描述权限、检索候选集和最终工具调用。

#### 🧪 练习题

```yaml
question: "ToolHijacker 为什么把恶意工具描述拆成 R 和 S 两段？"
options:
  - "R 负责操纵检索相关性，S 负责操纵 LLM 最终选择"
  - "R 只用于加密，S 只用于压缩"
  - "R 是用户 prompt，S 是系统 prompt"
  - "R 用来减少 token 数，S 用来增加模型参数"
answer: 0
explain: "工具选择包含 retrieval 和 selection 两个阶段，R 让恶意工具进入 Top-k，S 在候选工具上下文中诱导 LLM 选择攻击者工具。"
```
