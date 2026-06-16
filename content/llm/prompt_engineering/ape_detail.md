### APE：自动提示工程师 (Automatic Prompt Engineer)
```yaml
id: ape
name: APE
full_name: 自动提示工程师 (Automatic Prompt Engineer)
year: '2023'
org: 多伦多大学
paper_url: https://openreview.net/forum?id=92gvk82DE-
category: optimization
parent: —
motivation: 利用LLM自动生成筛选最优指令
```

#### 📝 一句话总结
APE 将自然语言指令视为可搜索的“程序”，让 LLM 根据少量输入输出示例生成候选 prompt，再用目标模型执行结果打分筛选最优指令。

#### 🎯 核心要点
- 将 prompt engineering 形式化为 natural language program synthesis 和黑盒优化问题。
- 使用 LLM 作为 proposal model，根据 demonstrations 生成一批候选 instruction。
- 支持 forward generation、reverse generation 和针对任务的 customized prompt proposal。
- 使用 execution accuracy、目标答案 log probability 或任务指标作为 score function。
- 通过多阶段子集评估和 top-\(k\) 过滤降低候选 prompt 评估成本。
- 可选 iterative Monte Carlo search：保留高分候选，再让 LLM 生成语义相近变体。
- 在 Instruction Induction、BIG-Bench Instruction Induction、Zero-shot CoT 与 TruthfulQA 等设置中验证自动指令搜索的有效性。

#### 🔬 深入细节
![APE 自动提示工程师工作流](https://ar5iv.labs.arxiv.org/html/2211.01910/assets/x1.png)
*图：APE 工作流。LLM 生成候选指令，目标模型执行并打分，保留高分候选，必要时继续重采样相似指令。*

```python
# Automatic Prompt Engineer (APE) 伪代码
def ape(demos, proposer_llm, target_llm, score_fn, rounds=1, keep_ratio=0.2):
    # demos: 少量 (input, output) 示例
    candidates = proposer_llm.sample_instructions(demos)

    for _ in range(rounds):
        scored = []
        for instruction in candidates:
            # 先用小子集快速估计，候选足够好时再扩大评估集
            subset = sample_eval_subset(demos)
            predictions = [
                target_llm.generate(prompt=instruction, input=x)
                for x, y in subset
            ]
            score = score_fn(predictions, [y for x, y in subset])
            scored.append((score, instruction))

        scored.sort(reverse=True)
        survivors = [inst for score, inst in scored[:max(1, int(len(scored) * keep_ratio))]]

        # iterative APE: 围绕高分指令生成语义相近候选；默认可只做一轮
        candidates = survivors + proposer_llm.resample_similar_instructions(survivors)

    return best_by_full_validation(candidates, demos, target_llm, score_fn)
```

APE 的核心抽象是 \(instruction\ as\ program\)：一个 prompt 不只是自然语言提示，而是控制目标模型 \(M\) 执行任务的程序。给定样本 \((x,y)\)，目标是搜索指令 \(i\)，使模型在 \(i+x\) 条件下输出 \(y\) 的期望分数最大：
$$
i^*=\arg\max_i\mathbb{E}_{(x,y)\sim D}\left[s\left(M(i,x),y\right)\right].
$$
由于 \(i\) 是离散自然语言文本，且多数 API 模型无法提供梯度，APE 采用 generate-and-rank 的黑盒优化路线。

候选生成阶段让 LLM 扮演 inference model。forward mode 会把若干输入输出示例放在 prompt 中，让模型补全“这些样例遵循什么指令”；reverse mode 则使用 infilling 模型，把缺失的 instruction 作为空槽反推出来。两者的共同点是利用大模型的归纳能力，把无限大的自然语言搜索空间压缩成一个较小但质量较高的候选池。

评估阶段是 APE 与“只让模型猜一个 prompt”的分界线。论文讨论了两类典型 score：execution accuracy 直接比较预测与目标输出，适合分类、转换、简短问答；log probability 计算目标答案在候选指令下的条件似然，能给低质量候选提供更细粒度信号。对 TruthfulQA 等任务，score 也可以替换为任务自带的自动评估器。

为了控制成本，APE 不要求每个候选都在完整训练集上执行。它先用小子集快速淘汰低分候选，再把更多预算分配给高分候选，最后只对少量候选做完整验证。这一设计很实际：prompt 搜索的主要成本不是生成文本，而是反复调用目标模型执行候选指令。

iterative APE 进一步把搜索做成局部 Monte Carlo 过程：过滤出高分候选后，让 LLM 生成语义相近但措辞不同的变体，再继续评估。论文发现迭代能改善候选池整体质量，但最高分指令往往在初始生成中已经出现，因此默认 APE 可以保持简单的一轮生成加筛选。

与 soft prompt tuning 或 AutoPrompt 相比，APE 不优化连续向量或离散 token 模板，而是直接搜索人类可读的自然语言指令。这让它适合黑盒 LLM、API 模型和需要可解释 prompt 的场景；代价是它容易受验证集覆盖面、候选池多样性和 score function 偏差影响。如果验证集太窄，APE 可能学到只对少数示例有效的“投机式”指令。

#### 🧪 练习题
```yaml
question: "APE 中 score function 的主要作用是什么？"
options:
  - "衡量候选指令在目标模型上的实际任务表现并排序"
  - "直接修改目标模型参数"
  - "替代输入输出示例，生成训练数据标签"
  - "把自然语言 prompt 转换成连续 soft prompt"
answer: 0
explain: "APE 的核心是生成候选后执行并打分，score function 决定哪些指令被保留、重采样或最终选中。"
```
