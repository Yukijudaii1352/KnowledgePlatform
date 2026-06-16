### PROBE：过程化基准 (PROcess-Based BEnchmark)

```yaml
id: probe
name: PROBE
full_name: 过程化基准 (PROcess-Based BEnchmark)
year: "2026.01"
org: EACL
paper_url: https://openreview.net/forum?id=GleVekx5ut
category: hallucination
parent: selfcheckgpt
motivation: 过程化分解幻觉检测步骤
```

#### 📝 一句话总结

PROBE 提出把幻觉检测从一次性“LLM-as-a-judge”二分类改造成 claim decomposition、evidence finding、evidence evaluation、hallucination localization 四步过程化评测，解决传统基准只能判断最终答案对错、却无法诊断模型在哪一步失败的问题。它还构造了跨 summarization、QA、style transfer 的大规模 claim-evidence 数据集，用步骤级监督暴露 evidence finding 是当前模型的主要瓶颈。

> ⚠️ 资料校准：任务元信息中的 OpenReview id `GleVekx5ut` 未返回该论文；以下精读基于当前可检索同名论文 `https://openreview.net/forum?id=CUQZyxrWfp` 及其 PDF `https://openreview.net/pdf/122b431c56291ca47500709c9dbae81f5dd77597.pdf`，YAML 元信息按任务输入保持不改。

#### 🎯 核心要点

- 四步幻觉检测流程：claim decomposition、evidence finding、evidence evaluation、hallucination localization。
- 数据覆盖三类 RAG/grounded generation 任务：summarization、question answering、style transfer。
- 数据源来自 Clean Wikipedia：每类任务采样 1,000 篇文章，共 3,000 个源文档。
- 每类任务包含 hallucination-free baseline 与三种复杂度的合成幻觉样本，总规模为 12,000 generated responses。
- claim 是最小可独立验证语义单元，PROBE 包含约 118k claim 级标注，并记录 claim 到 source evidence 的对应关系。
- 幻觉注入按复杂度分层：Complexity 1 注入一个事实幻觉，Complexity 2 注入两个，Complexity 3 注入三个且可能诱导后续真实推理依赖错误前提。
- claim-evidence 标注采用多模型流程：Llama-3.1-70B 分解 claim，多个 frontier LLM 检索 evidence，再用 3/4 共识判定 evidence 是否支持 claim。
- 评测指标从最终答案提升到步骤级：evidence finding 用 Partial/Complete Match，localization 用 claim/character-level precision、recall、F1。
- 关键实验发现：claim decomposition 较容易，evidence finding 和 evidence evaluation 才是瓶颈；过程化方法的召回显著高于直接提示。
- 训练信号：用 PROBE 的 claim-evidence 数据全参数微调 Llama-3.1-8B 后，evidence finding 与 evidence evaluation 均明显改善。

#### 🔬 深入细节

![PROBE 过程化幻觉检测流程图](https://quickchart.io/graphviz?format=svg&graph=digraph%20G%20%7B%0A%20%20graph%20%5Brankdir%3DLR%2C%20bgcolor%3D%22white%22%5D%3B%0A%20%20node%20%5Bshape%3Dbox%2C%20style%3D%22rounded%2Cfilled%22%2C%20fillcolor%3D%22%23eef6ff%22%2C%20color%3D%22%232f5f8f%22%2C%20fontname%3D%22Helvetica%22%5D%3B%0A%20%20edge%20%5Bcolor%3D%22%232f5f8f%22%5D%3B%0A%20%20output%20%5Blabel%3D%22Model%20output%0Along-form%20text%22%5D%3B%0A%20%20claims%20%5Blabel%3D%22Step%201%0AClaim%20decomposition%22%5D%3B%0A%20%20evidence%20%5Blabel%3D%22Step%202%0AEvidence%20finding%22%5D%3B%0A%20%20evaluate%20%5Blabel%3D%22Step%203%0AEvidence%20evaluation%22%5D%3B%0A%20%20locate%20%5Blabel%3D%22Step%204%0AHallucination%20localization%22%5D%3B%0A%20%20wiki%20%5Blabel%3D%22Clean%20Wikipedia%0A3%2C000%20articles%22%2C%20fillcolor%3D%22%23fff4df%22%5D%3B%0A%20%20base%20%5Blabel%3D%22Base%20content%0Ageneration%22%2C%20fillcolor%3D%22%23fff4df%22%5D%3B%0A%20%20poison%20%5Blabel%3D%22Hallucination%20insertion%0Acomplexity%201%2F2%2F3%22%2C%20fillcolor%3D%22%23ffe8e3%22%5D%3B%0A%20%20pairs%20%5Blabel%3D%22Claim-evidence%0Apair%20generation%22%2C%20fillcolor%3D%22%23f0f7e8%22%5D%3B%0A%20%20wiki%20-%3E%20base%20-%3E%20poison%20-%3E%20pairs%20-%3E%20claims%3B%0A%20%20output%20-%3E%20claims%20-%3E%20evidence%20-%3E%20evaluate%20-%3E%20locate%3B%0A%7D)
*图：根据论文 Figure 1 与 Figure 2 重绘的 PROBE 流程。原始图见 OpenReview PDF 第 1-3 页：`https://openreview.net/pdf/122b431c56291ca47500709c9dbae81f5dd77597.pdf`。*

PROBE 的动机来自一个具体缺陷：现有幻觉检测经常把模型输出交给另一个 LLM，让它一次性判断“是否包含幻觉”。这种 outcome-based evaluation 对短答案还勉强可用，但对长文本会丢失诊断粒度。一个模型可能能分解 claim，却找不到证据；也可能找到证据，却误判证据是否支持 claim；还可能知道有问题，却不能定位是哪一句或哪个 claim。PROBE 将幻觉检测拆成四个可测能力，使失败原因可以被定位，而不是只得到一个最终二分类。

论文聚焦 groundedness 场景：模型需要基于给定 source 或 retrieved passage 完成摘要、问答、风格迁移。如果输出中的某个陈述缺少 source 支持，则被视为 unfaithful hallucination。这个定义与纯开放世界事实性不同，因为判断标准不是“世界上是否真实”，而是“是否被给定材料支持”。因此 PROBE 的数据构造必须同时保存 source document、模型生成文本、claim、evidence span 与 hallucinated label。

数据生成有三阶段。第一阶段是 base content generation：从 Clean Wikipedia 采样 3,000 篇文章，每个任务 1,000 篇；摘要任务生成简明摘要，QA 任务先生成可由 2-4 个事实回答的问题再回答，style transfer 任务把文章改写成 blog post、lecture notes、FAQ 或 textbook 风格。第二阶段是 hallucination insertion：向文本注入语义连贯但 source 中无法检索支持的事实片段，并分成 1/2/3 个幻觉的复杂度等级。第三阶段是 claim-evidence pair generation：把生成文本拆成 atomic claims，并为 faithful claims 找 source evidence。

```python
# PROBE 数据构造与评测的简化伪代码
for task in ["summarization", "question_answering", "style_transfer"]:
    docs = sample_clean_wikipedia(n=1000, task=task)
    for doc in docs:
        base_output = generate_grounded_output(doc, task)
        add_sample(output=base_output, label="faithful")

        for complexity in [1, 2, 3]:
            poisoned = inject_plausible_hallucinations(
                base_output,
                unsupported_fact_count=complexity,
                preserve_fluency=True,
            )
            claims = decompose_into_atomic_claims(poisoned)
            for claim in claims:
                candidate_evidence = union([
                    model.retrieve_evidence(claim, doc)
                    for model in [llama70b, gpt4o_mini, mixtral_8x22b, claude_sonnet]
                ])
                votes = [model.supports(claim, e) for model in voters for e in candidate_evidence]
                verified = accept_if_consensus(votes, threshold=0.75)
                claim.label = "truth" if verified else "hallucinated"
            add_sample(output=poisoned, claims=claims)

# 评测时强制模型走四步，而不是直接输出最终 judge
claims = detector.decompose(output)
evidence = detector.find_evidence(claims, source)
support = detector.evaluate_evidence(claims, evidence)
hallucinated_claims = localize_unsupported_claims(claims, support)
```

PROBE 的 claim 定义是“可独立验证的最小信息单元”。论文使用 Llama-3.1-70B 进行 claim decomposition；对于由合成幻觉片段产生的 claim，因为 source 中不存在支持证据，可直接标为 hallucinated；对于 baseline 或非注入部分 claim，则调用四个模型检索 Wikipedia source 中的候选证据。Evidence evaluation 阶段让同样的多个模型独立判断候选证据是否支持 claim，至少 3/4 模型同意才接受该 evidence。这个 0.75 共识阈值降低了单一 judge 偶然误判带来的标注噪声。

PROBE 的检测目标可以抽象为从输出 \(y\) 中得到 claim 集合 \(C(y)=\{c_i\}\)，再为每个 claim 找到 evidence 集合 \(E_i\)，最后估计支持函数 \(s(c_i,E_i)\in\{0,1\}\)。当 \(s=0\) 时，该 claim 被定位为幻觉。对于最终 localization，论文采用细粒度匹配而非整段二分类：

$$
Precision = \frac{|P \cap G|}{|P|},\quad
Recall = \frac{|P \cap G|}{|G|},\quad
F1 = \frac{2\cdot Precision\cdot Recall}{Precision+Recall}
$$

其中 \(P\) 是模型预测的幻觉 claim/span，\(G\) 是标注幻觉 claim/span。Evidence finding 还单独报告 Partial Match 与 Complete Match：Partial 只要求至少找回一个正确支持证据，Complete 要求找全该 claim 的所有必要证据。论文结果显示，模型 Partial 往往在约 80% 附近，但 Complete 尤其在 QA 上明显更低，说明模型常能找到“一个相关段落”，却不能穷尽支持复杂 claim 所需的全部证据。

> 💡 关键：PROBE 将“是否会检测幻觉”拆成“是否会拆 claim、是否会找证据、是否会判断证据、是否会定位错误”。这种拆分让 benchmark 可以指导模型改进，而不只是排名。

实验部分最重要的发现是：claim decomposition 对 frontier LLM 来说相对容易，召回通常很高；真正限制幻觉检测的是 evidence finding 和 evidence evaluation。直接 prompting 的 hallucination recall 在长文本上很低，而过程化评测通常能把召回提高到 80% 以上。这个现象符合直觉：长文本中幻觉常常只占局部，要求模型一次性判断整段文本容易忽略小错误；若先把文本拆成 claim，再逐个找证据，局部错误更容易暴露。

论文还验证了 PROBE 作为训练数据的价值。作者用 Llama-3.1-8B 做全参数微调，学习率 \(2\times 10^{-5}\)，Adam 参数 \(\beta_1=0.9,\beta_2=0.999\)，cosine scheduler，2% warm-up，并在 8 张 A100 80GB 上用 FSDP 训练。微调模型在 evidence finding 和 evidence evaluation 上超过多个未微调 frontier baseline，说明过程级标注不只是评测资产，也能作为专门幻觉检测器的监督信号。

与 SelfCheckGPT 一类自一致性检测相比，PROBE 的差异在于它不把“不确定性”或“多次采样一致性”当作最终证据，而是要求 claim 绑定 source evidence。与 FactScore 类 atomic fact 评测相比，PROBE 更强调检测过程本身的可诊断性：FactScore 关心最终有多少事实被支持，PROBE 还会告诉你是 claim 提取、证据检索还是证据判定导致错误。因此它更适合训练和评测 agentic fact-checking pipeline。

#### 🧪 练习题

```yaml
question: "PROBE 为什么要把幻觉检测拆成四个步骤？"
options:
  - "为了减少数据集规模，降低标注成本"
  - "为了把最终对错转化为可诊断的步骤级能力评测"
  - "为了避免使用任何外部证据，只依赖模型自信度"
  - "为了只评测摘要任务，不再评测 QA 和风格迁移"
answer: 1
explain: "PROBE 的核心贡献是过程化评测：claim 分解、证据查找、证据判断和幻觉定位分别暴露不同失败模式，比一次性 judge 更可诊断。"
```
