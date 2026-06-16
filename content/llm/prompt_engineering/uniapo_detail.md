### UniAPO：统一多模态提示优化 (UniAPO)
```yaml
id: uniapo
name: UniAPO
full_name: 统一多模态提示优化 (UniAPO)
year: '2026.02'
org: AAAI
paper_url: https://ojs.aaai.org/index.php/AAAI/article/view/40151
category: frontier_2026
parent: opro
motivation: 首个多模态自动提示优化方法
```

#### 📝 一句话总结
UniAPO 提出首个统一的多模态自动提示优化框架，用 EM 式 E/M 两步解耦反馈建模与 prompt 精炼，并通过短长期记忆缓解视觉 token 膨胀和过程级监督不足。

#### 🎯 核心要点
- 将自动提示优化从文本扩展到文本、图像、视频统一场景，目标是在同一框架下优化 MLLM 的任务 prompt。
- 使用多角色冻结 MLLM 系统：任务模型 \(L_T\)、反馈模型 \(L_F\)、prompt 优化模型 \(L_P\) 和演化模型 \(L_E\)。
- 采用 EM-inspired 优化：E-step 生成并更新反馈记忆，M-step 利用反馈和 prompt 记忆生成新 prompt。
- Feedback Memory \(M_F^t\) 保存历史反馈，解决多模态错误样本太长、无法全部塞入上下文的问题。
- Prompt Memory \(M_P^t\) 保存历史 prompt 及验证分数，提供过程级监督，避免只依赖当前错误反馈造成不稳定更新。
- E-step 结合当前错误集的短期反馈、从历史中检索的长期反馈、演化融合和过滤机制，获得有效反馈 \(F_{t+1}\)。
- M-step 结合当前反馈生成短期 prompt，再用 top-k 历史高分 prompt 作为长期过程指导，通过演化融合和 beam search 延长优化视野。
- 在文本分类/生成、图像分类、视频分类和视频关键词抽取上评测，UniAPO 在 GPT-4o 与 QwenVL2.5-72B 设置下均相对 Vanilla、CoT、EvoPrompt、ERM 等基线取得稳定提升。

#### 🔬 深入细节
![UniAPO 动机与 EM 式优化框架](https://www.catalyzex.com/_next/image?q=75&url=https%3A%2F%2Ffigures.semanticscholar.org%2F13c6c22e41bf029ecd5e3a4d9f2ac27afe1c0392%2F2-Figure1-1.png&w=640)
*图：UniAPO 论文 Figure 1 的公开图像版本。左侧显示朴素多模态 APO 的视觉 token 膨胀和监督不清，右侧展示 E-step/M-step、反馈记忆与 prompt 记忆的闭环。*

```python
# UniAPO 的 EM-inspired 多模态 prompt 优化伪代码
def uniapo(simple_prompt, D_train, D_dev, LT, LF, LP, LE, T, beam_size, top_k):
    P0 = LP.refine_initial_prompt(simple_prompt)
    feedback_memory = []
    prompt_memory = [(P0, evaluate(LT, P0, D_dev))]
    beams = [P0]

    for t in range(T):
        new_prompts = []
        for P_t in beams:
            # E-step: 反馈建模，缓解视觉 token 膨胀
            errors = collect_errors(LT, P_t, D_train)
            clusters = dbscan_cluster(errors, encoder="BGE-m3")
            F_short = LF.generate_feedback(P_t, clusters)
            F_long = retrieve_relevant_feedback(F_short, feedback_memory)
            F_candidate = LE.merge_feedback(F_short, F_long)
            F_t1 = filter_feedback(F_candidate, errors, P_t, LT)
            feedback_memory.append(F_t1)

            # M-step: prompt 精炼，引入 outcome-level 与 process-level 双监督
            positives = sample_successes(D_train, errors)
            P_short = LP.optimize_prompt(P_t, F_t1, positives)
            P_long = top_k_prompts(prompt_memory, k=top_k)
            P_next = LE.evolve_prompt(P_short, P_long)
            score = evaluate(LT, P_next, D_dev)
            prompt_memory.append((P_next, score))
            new_prompts.append((P_next, score))

        beams = [p for p, _ in top_b(prompt_memory, b=beam_size)]

    return best_prompt(prompt_memory)
```

UniAPO 的出发点是：文本 APO 的“错误样本 -> 反馈 -> 改写 prompt”闭环，直接搬到多模态任务会同时遇到两个问题。第一是视觉 token 膨胀，一张高分辨率图像或一段短视频就可能消耗大量上下文，导致反馈模型无法同时读取足够多的当前错误和历史错误。第二是过程级监督不足，传统 APO 主要用当前输出对错作为 outcome-level 信号，很少利用“哪些历史 prompt 曾经有效、优化路径为何有效”这类过程信息。

论文把这两个纠缠的问题拆成 EM-inspired 的两步。E-step 负责在当前 prompt 下估计更可靠的反馈变量，M-step 负责在反馈和历史 prompt 指导下更新 prompt。整体写作：

$$
(F_{t+1},M_F^{t+1})
=\mathrm{E\mbox{-}Step}(D_{error}^t,M_F^t;L_F,L_E),
$$

$$
(P_{t+1},M_P^{t+1})
=\mathrm{M\mbox{-}Step}(F_{t+1},M_P^t,P_t;L_P,L_E).
$$

这里的 EM 不是严格概率模型求解，而是一个工程化分解：先让反馈变得更充分、更干净，再让 prompt 更新受到当前反馈和历史成功轨迹的双重约束。

E-step 的关键是短长期反馈记忆。短期反馈来自当前错误集 \(D_{error}^t\)，但当前错误本身也可能太长，所以 UniAPO 先用 BGE-m3 表征和 DBSCAN 聚类，把相似失败归为簇，再分块生成聚类级反馈：

$$
F_{short}^{t+1}=L_F(P_t,\mathrm{Clustering}(D_{error}^t)).
$$

长期反馈不直接把整个 \(M_F^t\) 全塞进上下文，而是用 \(F_{short}^{t+1}\) 作为查询，从反馈记忆中检索语义相关的历史记录：

$$
F_{long}^{t+1}=\mathrm{Retrieval}(F_{short}^{t+1},M_F^t).
$$

随后演化模型 \(L_E\) 融合短期和长期反馈，过滤器只保留确实能修复当前错误的建议，得到最终 \(F_{t+1}\)。这种设计把“长历史”压缩成与当前失败相关的可操作反馈，避免多模态上下文被原始图像/视频错误样本淹没。

M-step 则把监督信号分成 outcome-level 和 process-level。outcome-level 来自刚生成的 \(F_{t+1}\)，由 \(L_P\) 改写当前 prompt，生成短期候选：

$$
P_{short}^{t+1}=L_P(P_t,F_{t+1},\mathrm{Sample}(D_{train}-D_{error}^t)).
$$

这里加入成功样本是为了防止只围绕当前失败过拟合。process-level 来自 prompt memory：UniAPO 选取历史上在开发集表现最好的 top-k prompt，形成长期提示指导 \(P_{long}^{t+1}=\mathrm{TopK}(M_P^t,k)\)。最后 \(L_E\) 像演化交叉一样融合短期候选与长期优秀策略，得到 \(P_{t+1}\)，并把它连同开发集分数加入 \(M_P\)。

与 OPRO/APO 这类文本优化器相比，UniAPO 的主要增量在于“记忆不是简单历史拼接”。反馈记忆解决的是多模态 token 过长导致的反馈不足，prompt 记忆解决的是只看当前结果导致的过程监督缺失。二者配合后，系统既能对最近错误快速响应，又能被历史高质量 prompt 拉回稳定方向，适合视频关键词抽取、图像分类、文本生成等异构任务。

> 💡 关键：UniAPO 的统一性来自角色和流程统一，而不是把所有模态压成相同输入。不同模态仍由 MLLM 处理，优化层只维护反馈、prompt、验证分数和检索/演化机制。

#### 🧪 练习题
```yaml
question: "UniAPO 中 Prompt Memory 的主要作用是什么？"
options:
  - "缓存所有原始图片和视频 token，避免重新编码"
  - "保存历史高分 prompt，为 M-step 提供过程级监督和长期优化方向"
  - "替代任务模型 LT 直接输出最终答案"
  - "把多模态输入转换成纯文本数据集"
answer: 1
explain: "Prompt Memory 记录历史 prompt 及其开发集分数，M-step 通过 Top-K 选出高质量历史 prompt，作为过程级监督来稳定和引导当前 prompt 更新。"
```
