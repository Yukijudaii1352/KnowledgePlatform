### UniME-V2：MLLM-as-a-Judge 通用多模态嵌入学习

```yaml
id: unime_v2
name: UniME-V2
full_name: "通用多模态嵌入v2 (UniME-V2)"
year: "2026"
org: "—"
paper_url: "https://ojs.aaai.org/index.php/AAAI/article/view/39284"
category: frontier_2026
parent: imagebind
motivation: MLLM-as-a-Judge自动标注
```

#### 📝 一句话总结

UniME-V2 提出用 MLLM-as-a-Judge 自动给查询-候选对打语义匹配软分，解决传统 in-batch 难负样本挖掘样本多样性不足、误把 false negative 当负样本以及 one-hot 监督过硬的问题。它进一步把嵌入模型与 reranker 组成两阶段检索流程，在 MMEB 和多类图文检索任务上提升通用多模态检索能力。

#### 🎯 核心要点

- **MLLM-as-a-Judge 难负样本挖掘**：先用现成多模态嵌入模型做全局检索，为每个 query 取 top-50 潜在难负样本，再让 MLLM 判断 query-candidate 语义匹配度
- **语义匹配软分数**：根据 MLLM 输出 Yes/No token 的概率生成 \(s_{q,c}\)，同时用于过滤 false negatives、筛选高质量 hard negatives 和构造软标签
- **分布对齐训练 UniME-V2**：把 query 与候选的余弦相似度分布 \(P\) 对齐到 MLLM 语义匹配分布 \(Q\)，缓解传统 one-hot 对比学习只承认一个正样本的刚性约束
- **多模态 MLLM 嵌入抽取**：将 query、正候选和 hard negatives 输入 MLLM，取最后 token 表征并归一化，支持图像、文本以及图文交错样本的统一检索
- **UniME-V2-Reranker**：用挖掘出的 hard negatives 训练 reranker，pairwise 任务判断正/负候选，listwise 任务在候选列表中选出正确位置
- **两阶段推理**：UniME-V2 先用向量相似度召回 top-10，UniME-V2-Reranker 再基于 query 与候选列表做精排
- **训练与评测设置**：使用 MMEB 的 20 个 in-distribution 训练集共 662k 样本，覆盖分类、VQA、检索和 grounding，并在 MMEB 36 个测试集及短/长 caption、组合检索任务上验证

#### 🔬 深入细节

![UniME-V2 与传统方法对比](https://garygutc.github.io/UniME-v2/static/image_uniMEv2/introduction.png)
*图：传统方法主要在 batch 内找难负样本，并用 one-hot 目标训练；UniME-V2 改为全局检索候选、用 MLLM-as-a-Judge 给软语义分数，再把嵌入相似度分布对齐到语义分布。*

![MLLM-as-a-Judge 难负样本挖掘流程](https://garygutc.github.io/UniME-v2/static/image_uniMEv2/method1.png)
*图：UniME-V2 先通过现成嵌入模型召回潜在难负样本，再用 MLLM 判断 query-candidate 是否语义匹配，从而过滤 false negatives 并保留更有训练价值的 hard negatives。*

![UniME-V2 训练框架与 Reranker](https://garygutc.github.io/UniME-v2/static/image_uniMEv2/method2.png)
*图：UniME-V2 使用 MLLM 语义分数作为软监督训练嵌入模型；UniME-V2-Reranker 通过 pairwise 和 listwise 目标学习候选重排序。*

```python
# UniME-V2 核心流程伪代码（简化版）

for query, positive, candidate_pool in training_data:
    # 1. 全局检索构造潜在难负样本，而不是只依赖当前 batch
    sim_scores = vlm2vec.cosine_search(query, candidate_pool)
    top50 = rank_top_k([c for c in candidate_pool if sim_scores[c] < delta], k=50)

    # 2. MLLM-as-a-Judge 生成 query-candidate 语义匹配软分
    judge_scores = {}
    for cand in top50:
        yes_logit, no_logit = judge_mllm.score_yes_no(query, cand)
        judge_scores[cand] = softmax([no_logit, yes_logit])[1]

    # 3. 过滤 false negatives，并用循环采样保持 hard negative 多样性
    pos_score = judge_mllm.score_yes_probability(query, positive)
    false_negative_threshold = pos_score - beta
    refined = [c for c in top50 if judge_scores[c] <= false_negative_threshold]
    hard_negatives = cyclic_sample(refined, stride=5, k=8)

    # 4. 训练 UniME-V2：相似度分布 P 对齐 MLLM 软标签分布 Q
    candidates = [positive] + hard_negatives
    eq, ec = unime_v2.last_token_embeddings(query, candidates)
    P = softmax(cosine(eq, ec) / tau)
    semantic_scores = [pos_score] + [judge_scores[c] for c in hard_negatives]
    Q = softmax(as_tensor(semantic_scores) / tau)
    loss_embed = 0.5 * (kl_div(P, Q) + kl_div(Q, P))

    # 5. 训练 reranker：pairwise 判断 + listwise 选位置
    hardest_negative = hard_negatives[0]
    loss_pair = ce(reranker(query, positive), "YES") + ce(reranker(query, hardest_negative), "NO")
    shuffled_list, positive_index = insert_positive_randomly(hard_negatives, positive)
    loss_list = ce(reranker(query, shuffled_list), positive_index)
    loss = loss_embed + loss_pair + loss_list
    loss.backward()
```

**动机与背景：为什么要让 MLLM 当 judge？**

CLIP、ImageBind 和 VLM2Vec 这类嵌入模型的共同目标，是把不同模态样本映射到同一向量空间，用向量相似度完成检索。但当训练依赖 batch 内负样本时，模型只能在一个小范围里找“看起来相近”的候选，难负样本的覆盖面有限；更麻烦的是，向量相似度本身不一定能分清 false negative 和真正 hard negative。比如一个 query 要找“相似的日常图像”，多个候选都可能语义相关，如果只按 one-hot 目标把其中一个视作正样本，其余全压成负样本，会把语义上合理的候选错误惩罚掉。

UniME-V2 的核心变化是：不用当前嵌入模型的相似度直接决定监督信号，而是先把候选扩大到全局检索空间，再调用理解能力更强的 MLLM 对每个 query-candidate 对做语义判断。对每个 query \(q\) 和候选池 \(\Omega_c=\{c_1,c_2,\dots,c_n\}\)，嵌入模型先召回候选，再由 reranker 精排：

$$
\Omega_k = \Phi_{\mathrm{emb}}(q, \Omega_c), \qquad
\hat{\Omega}_k = \Phi_{\mathrm{rank}}(q, \Omega_k)
$$

这里 \(\Phi_{\mathrm{emb}}\) 是 UniME-V2 嵌入模型，\(\Phi_{\mathrm{rank}}\) 是 UniME-V2-Reranker。这样的两阶段结构保留了向量检索的效率，也允许在较小候选集上使用更强但更贵的 MLLM 精细判断。

**第一步：全局检索构造潜在 hard negatives**

论文先用 VLM2Vec 为 query 和候选生成嵌入，在全局候选池中取 top-50 作为潜在 hard negative 集合。为了降低 false negative 的干扰，还会基于相似度阈值 \(\delta\) 过滤过于相似的候选：

$$
\Omega_p = \operatorname{Rank}_{50}(\{x_1,\dots,x_n\}), \quad x_i < \delta
$$

其中 \(x_i\) 表示 query 与第 \(i\) 个候选的相似度。这个步骤解决的是“batch 约束”：传统 in-batch mining 只能在一个 mini-batch 内找负样本，而 UniME-V2 从全局池检索，负样本更多样，也更容易找到真正有区分价值的样本。

**第二步：用 MLLM-as-a-Judge 生成语义匹配软分**

对潜在 hard negative 集合 \(\Omega_p\)，UniME-V2 用 MLLM 接收 prompt：“给定 query 和 candidate，判断 candidate 是否满足 query；满足输出 Yes，否则输出 No”。然后根据 Yes/No 两个 token 的概率得到语义匹配分：

$$
s_{q,c_i} =
\frac{\exp(\ell_{\mathrm{Yes}}^{i})}
{\exp(\ell_{\mathrm{Yes}}^{i}) + \exp(\ell_{\mathrm{No}}^{i})}
$$

其中 \(\ell_{\mathrm{Yes}}^{i}\) 与 \(\ell_{\mathrm{No}}^{i}\) 是 MLLM 对第 \(i\) 个候选输出 Yes/No 的 logits。分数越高，说明 MLLM 认为候选越可能满足 query。随后，论文使用正样本分数与 margin \(\beta\) 构造阈值：

$$
\alpha = s_{q,c_t} - \beta
$$

若某个负候选的语义匹配分超过该阈值，它很可能是 false negative，会被排除；剩下的候选再用五步间隔的循环采样保留多样性。如果过滤后不足 10 个候选，则重复采样补齐；极少数无候选可用的情况，则从初始 top-50 中随机取 10 个并给默认分数。

> 💡 关键：UniME-V2 的 judge 分数不是只做数据清洗，而是同时进入训练目标。它既决定哪些样本该作为 hard negatives，也告诉模型这些 negatives 之间“有多负”。

**第三步：用软分布监督嵌入模型**

传统对比学习通常把正样本设为 1，其余候选设为 0。但在多模态检索中，候选之间常有语义层级：一个候选可能完全匹配，另一个候选部分匹配，还有一个候选完全无关。UniME-V2 把这种层级显式建模为软分布。

对于 query \(q\)、正候选 \(c_t\) 和 \(k\) 个 hard negatives \(\{c_1,\dots,c_k\}\)，模型取 MLLM 最后 token 的 query 表征 \(e_q\) 和候选表征 \(E_c=\{e_{c_t}^{+}, e_{c_1}^{-}, \dots, e_{c_k}^{-}\}\)，再计算相似度分布：

$$
P_j =
\frac{\exp(\cos(e_q, e_{c_j})/\tau)}
{\sum_{u \in \{c_t,c_1,\dots,c_k\}}\exp(\cos(e_q, e_u)/\tau)}
$$

同时，把 MLLM judge 的语义分数转成目标分布：

$$
Q_j =
\frac{\exp(s_{q,c_j}/\tau)}
{\sum_{u \in \{c_t,c_1,\dots,c_k\}}\exp(s_{q,u}/\tau)}
$$

训练目标是让模型自己的相似度分布 \(P\) 靠近 judge 分布 \(Q\)。论文使用对称的分布对齐损失，写成双向 KL 形式：

$$
\mathcal{L}_{\mathrm{emb}} =
\frac{1}{2N}\sum_{i=1}^{N}
\left[
\mathrm{KL}(P_i \parallel Q_i) +
\mathrm{KL}(Q_i \parallel P_i)
\right]
$$

直觉上，模型不再被要求“只把唯一正样本拉近，其他全部推远”，而是学习一个更细的排序结构：最匹配的候选应最高，部分相关候选可以保留中等分数，明显无关候选才被压低。这正是 MLLM-as-a-Judge 给表示学习带来的信息增量。

**第四步：训练 UniME-V2-Reranker 做精排**

向量召回高效，但最终 top-k 里仍可能存在非常细粒度的语义差异。为此，论文额外训练 UniME-V2-Reranker，并同时使用 pairwise 与 listwise 两种目标。

Pairwise 训练把 query 与正候选 \(c_t\)、最难负候选 \(c_h\) 分别组成样本，要求模型对正候选输出 YES，对负候选输出 NO：

$$
\mathcal{L}_{\mathrm{pair}} =
\mathcal{L}_{\mathrm{ce}}(\mathrm{YES}, \eta(q,c_t)) +
\mathcal{L}_{\mathrm{ce}}(\mathrm{NO}, \eta(q,c_h))
$$

Listwise 训练则从 hard negatives 中按语义分数选 top-\(x\) 候选，把正候选随机插入列表并要求 reranker 输出其位置 \(I_{c_t}\)：

$$
\mathcal{L}_{\mathrm{list}} =
\mathcal{L}_{\mathrm{ce}}(I_{c_t}, \eta(q,c_t,\{c_1,\dots,c_x\}))
$$

Reranker 的最终损失为：

$$
\mathcal{L}_{\mathrm{rank}} =
\mathcal{L}_{\mathrm{pair}} + \mathcal{L}_{\mathrm{list}}
$$

这两个目标互补：pairwise 强化“这个候选是否满足 query”的二分类能力，listwise 训练模型在候选列表里做相对排序，更贴近真实检索精排场景。

**与传统方法的区别**

与 CLIP 式对比学习相比，UniME-V2 不把 batch 内其他样本全部当作等价负样本，而是引入 MLLM 语义判断，显式区分 false negative、hard negative 和 easy negative。与 ImageBind 这类统一嵌入方法相比，UniME-V2 的重点不是新增模态桥接，而是让 MLLM 的理解能力反过来监督嵌入空间，使统一表示更能分辨细粒度语义差异。与 UniME/VLM2Vec 等 MLLM 嵌入模型相比，UniME-V2 的关键增量在于全局 hard negative mining、软语义分布对齐，以及一个利用同一批高质量 negatives 训练出来的 reranker。

实验实现上，论文使用 VLM2Vec(Qwen2-VL-7B) 构造潜在 hard negative 集合，用 Qwen2.5-VL-7B 生成语义匹配分数；UniME-V2 分别基于 Qwen2-VL 和 LLaVA-OneVision 训练，并用 LoRA 与 DeepSpeed ZeRO stage-2 降低显存压力。在 MMEB 上，UniME-V2 相比对应 UniME 基线整体提升，并且 reranker 在只使用约 0.6M 数据时仍能超过使用更多数据的 LamRA 精排结果，说明高质量 hard negatives 与 listwise 训练对最终排序很关键。

#### 🧪 练习题

```yaml
question: "UniME-V2 使用 MLLM-as-a-Judge 生成语义匹配分数的核心目的是什么？"
options:
  - "把所有候选都转换成自然语言描述，从而完全避免训练嵌入模型"
  - "替代向量检索，在全量候选池上直接用 MLLM 做最终排序"
  - "区分 false negatives 与真正 hard negatives，并把候选间语义差异作为软标签监督嵌入模型"
  - "减少 MLLM 参数量，使其可以在移动端完成多模态检索"
answer: 2
explain: "UniME-V2 的 judge 分数一方面用于过滤 false negatives 和采样高质量 hard negatives，另一方面被转成软语义分布，与模型相似度分布对齐，从而学习候选之间的细粒度差异。"
```
