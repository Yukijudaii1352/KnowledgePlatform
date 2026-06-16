### HELM：整体语言模型评测 (Holistic Evaluation of Language Models)

```yaml
id: helm
name: HELM
full_name: 整体语言模型评测 (Holistic Evaluation of Language Models)
year: "2022"
org: Stanford University
paper_url: https://arxiv.org/abs/2211.09110
category: general
parent: —
motivation: 多维度评测含准确率公平性毒性等
```

#### 📝 一句话总结

HELM 提出了“场景、适配、模型、指标”四层统一评测框架，解决了语言模型只在零散任务和单一准确率上比较导致透明度不足的问题。它把准确率、校准、鲁棒性、公平性、偏见、毒性和效率放进同一套密集评测矩阵，系统暴露模型能力与风险之间的 trade-off。

#### 🎯 核心要点

- 将语言模型评测空间拆成 scenario、adaptation、model、metric 四个维度，强调标准化输入、解码和聚合流程。
- Scenario 由 task、domain、language 组成，domain 进一步考虑文本是什么、谁产生或涉及、何时产生。
- 核心评测覆盖 16 个 core scenarios，并尽可能在每个 scenario 上计算 7 类指标。
- 7 类核心指标包括 accuracy、calibration、robustness、fairness、bias、toxicity、efficiency。
- 额外包含 7 组 targeted evaluations，覆盖语言、知识、推理、版权/记忆、社会偏见、毒性等更细风险面。
- 论文评测 30 个公开、受限访问和闭源语言模型，总计 42 个 scenarios，其中 21 个此前并非常见主流评测项。
- 适配方式以 prompting 为中心，固定 in-context 示例选择并多次运行，以减少 prompt 随机性造成的不公平比较。
- HELM 发布原始 prompts、completions 和模块化工具链，使评测结果可审计、可复现、可持续扩展。

#### 🔬 深入细节

![HELM 语言模型接口图](https://ar5iv.labs.arxiv.org/html/2211.09110/assets/figures/language_model_helm.png)
*图：论文用“helm”双关说明语言模型是可被提示词操控的接口，评测必须关注模型在实际交互中的行为。*

HELM 的出发点是：大语言模型正在成为许多语言技术的基础，但社区对模型能力、局限和风险的认识高度碎片化。过去一个模型可能只在少数任务上报告准确率，另一个模型报告的是完全不同的数据集、提示格式和指标，结果导致“谁更好”这个问题没有共同参照。HELM 的核心贡献不是新模型，而是一套评测操作系统：先定义要测什么场景，再定义如何把原始模型适配到该场景，然后统一调用模型，最后用多指标评价同一批输出。

![HELM 评测组件流程](https://ar5iv.labs.arxiv.org/html/2211.09110/assets/x4.png)
*图：HELM 将评测实例组织为 scenario，经由 adaptation 转成模型调用，再计算 metric。图中示例是 IMDb 场景、GPT-3 davinci 模型和 robustness 指标。*

```python
# HELM 评测主循环伪代码
for scenario in selected_scenarios:
    instances = load_instances(scenario)
    adapter = build_adapter(scenario.prompt_format, scenario.decoding_params)

    for model in model_registry:
        predictions = []
        for run in range(num_runs):
            fixed_icl = sample_fixed_in_context_examples(scenario, seed=run)
            for x in instances:
                prompt = adapter.format(x, fixed_icl)
                y = model.generate(prompt, adapter.decoding_params)
                predictions.append((x, y, model.metadata, run))

        for metric in metrics_applicable_to(scenario):
            score = metric.compute(predictions)
            record(model=model, scenario=scenario, metric=metric, score=score)
```

形式化地看，HELM 想构造一个稠密结果张量：

$$
R[m,s,k] = \operatorname{Metric}_k\left(\operatorname{LM}_m(\operatorname{Adapt}_s(X_s))\right)
$$

其中 \(m\) 是模型，\(s\) 是场景，\(k\) 是指标，\(X_s\) 是该场景的数据实例。传统 benchmark 往往只观察 \(R[m,s,\text{accuracy}]\) 的少数切片；HELM 则要求在资源允许时尽可能填满 \(s\times k\) 的矩阵，这就是 holistic 的含义。论文报告的一个关键背景是：HELM 之前，模型平均只在核心 HELM 场景的 17.9% 上被评测；HELM 将这些模型放入统一条件后，核心场景覆盖率提升到 96.0%。

Scenario 选择是 HELM 方法论的第一层。论文将场景拆成 task、domain、language：task 表示用户希望系统做什么，例如问答、信息检索、摘要、情感分析、毒性检测；domain 表示文本类型、来源人群和时间条件；language 表示语言或语言变体。选择原则不是盲目堆数据集，而是覆盖度、最小性和用户可见性三者平衡。这样做的好处是可以明确指出缺口，例如某些英语方言、低资源语言或高风险领域没有被充分覆盖，而不是让 benchmark 的边界隐形存在。

Adaptation 是第二层，也是 HELM 与许多旧评测的差异点。HELM 把语言模型看作黑盒接口，不假设模型内部结构，也不要求能微调所有模型，因此默认通过 prompting 适配任务。对多选题、摘要或问答任务，系统需要指定 instructions、input prefix、output prefix、in-context 示例数、temperature、max tokens、stop sequences 等细节。论文强调固定 in-context 示例，而不是为每个测试样本随机换示例，因为固定示例更接近真实部署，也更利于不同模型公平比较。

Metric 是 HELM 最核心的风险视角。Accuracy 只是其中一类，并且在不同任务中可以对应 exact match、F1、MRR、NDCG、ROUGE 等。Calibration 衡量模型置信度是否可信，常用 expected calibration error：

$$
\mathrm{ECE}=\sum_{b=1}^{B}\frac{|B_b|}{n}\left|\operatorname{acc}(B_b)-\operatorname{conf}(B_b)\right|
$$

其中 \(B_b\) 是按模型置信度分桶的样本集合。若模型对一批预测平均给出 0.7 置信度，理想情况下其中约 70% 应该正确；否则系统在高风险场景中很难知道何时让人类接管。

鲁棒性和公平性主要通过扰动来测。给定输入 \(x\) 及其语义保持扰动集合 \(\mathcal{P}(x)\)，可以用最坏情况性能表达鲁棒性：

$$
\mathrm{Robustness}(x)=\min_{\tilde{x}\in\mathcal{P}(x)}\operatorname{score}(f(\tilde{x}), y)
$$

公平性则考察替换性别、人名、群体属性等 subject properties 后，模型输出是否出现不应有的变化。Bias 和 toxicity 更偏生成行为风险：bias 关注生成内容中的人口统计代表性和刻板联想，toxicity 关注输出是否被毒性分类器判定为有害。Efficiency 则把推理运行时间、输入输出长度等因素纳入比较，避免只看效果而忽视部署成本。

> 💡 关键：HELM 不主张把多个指标压成一个总分。它的目标是让模型画像变成多维坐标，使准确率提升是否伴随公平性、毒性、效率等代价能够被看见。

与传统 leaderboard 相比，HELM 的优势是可审计和可扩展。它保留原始 prompts 与 completions，使研究者能回看某个分数背后的具体模型行为；它把 scenario、adapter、metric 做成模块化组件，使新模型或新场景可以接入同一流程；它还将未覆盖的场景和指标显式列出，避免把现有评测误认为完整世界。对于 LLM 时代的评测，HELM 的方法论意义大于某个具体排名，因为模型、API 和任务都在变化，稳定可复现的评测协议本身才是长期资产。

#### 🧪 练习题

```yaml
question: "HELM 为什么强调多指标评测而不是只报告平均准确率？"
options:
  - "因为准确率无法在任何 NLP 任务中计算"
  - "因为不同模型可能在校准、鲁棒性、公平性、毒性和效率上呈现不同 trade-off"
  - "因为 HELM 只评测小模型，不适合准确率指标"
  - "因为 prompt formatting 与模型输出无关"
answer: 1
explain: "HELM 的核心是暴露模型能力和风险的多维画像，准确率高并不自动意味着校准好、公平、低毒性或高效率。"
```
