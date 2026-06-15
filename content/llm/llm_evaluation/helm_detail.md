### HELM

```yaml
id: helm
name: HELM
full_name: 整体语言模型评测 (Holistic Evaluation of Language Models)
year: '2022'
org: Stanford University
paper_url: https://arxiv.org/abs/2211.09110
category: general
parent: —
motivation: 多维度评测含准确率公平性毒性等
```

#### 📝 一句话总结

HELM 提出了统一的语言模型整体评测框架，将场景、适配方式、指标和模型访问标准化，解决了以往只看准确率、任务覆盖不均、不同论文评测不可比的问题。

#### 🎯 核心要点

- 以 scenario、adaptation、metric 三层抽象标准化语言模型评测流程
- 覆盖 42 个场景、30 个模型，并重点报告 16 个核心场景上的多维指标
- 指标不只包含准确率，还包括校准、鲁棒性、公平性、社会偏见、毒性和推理效率
- 同一场景下固定 prompt formatting、in-context examples、解码参数和度量方法
- 强调透明性与覆盖性，展示模型在不同能力和风险维度之间没有单调支配关系

#### 🔬 深入细节

![HELM 语言模型整体评测框架](https://ar5iv.labs.arxiv.org/html/2211.09110/assets/figures/language_model_helm.png)
*图源：ar5iv 论文 Figure 1，展示 HELM 对语言模型评测空间的整体组织方式。*

```python
# HELM 标准化评测流水线伪代码
def helm_run(models, scenarios, metrics, adaptation_spec):
    report = {}
    for scenario in scenarios:
        instances = scenario.load_instances()
        for model in models:
            predictions = []
            for instance in instances:
                prompt = adapt_instance(
                    instance,
                    method=adaptation_spec.method,
                    num_train_trials=adaptation_spec.num_train_trials,
                    prompt_format=adaptation_spec.prompt_format,
                )
                output = model.generate(prompt, decoding=adaptation_spec.decoding)
                predictions.append((instance, output))
            report[(model.name, scenario.name)] = {
                metric.name: metric.compute(predictions)
                for metric in metrics.for_scenario(scenario)
            }
    return aggregate_and_publish(report)
```

HELM 的出发点是评测生态本身已经碎片化。不同论文选择不同任务、不同提示、不同样本数和不同指标，使得模型比较常常不可复现。更严重的是，许多排行榜只报告 accuracy，忽略了模型是否校准、是否对扰动鲁棒、是否产生偏见或毒性，以及推理成本是否可接受。

框架的基本抽象是三元组：scenario 定义任务和数据实例，adaptation 定义如何把实例转成模型提示，metric 定义如何从输出得到分数。一次评测可以表示为
$$
\text{Eval}(m,s,a)=\{M_j(f_m(a(x_i)), y_i)\}_{i,j},
$$
其中 \(m\) 是模型，\(s\) 是场景，\(a\) 是适配方法，\(M_j\) 是多个指标。这个抽象把“测什么”“怎么问”“怎么算分”拆开，使评测更可审计。

HELM 的核心价值在多指标而非多任务堆叠。一个模型可能在准确率上领先，却在校准或毒性上表现较差；另一个模型可能更开放、更高效，但在复杂推理上落后。HELM 用矩阵化报告让这些权衡显式化，避免单一总分掩盖部署风险。

与 MMLU、HumanEval 这类单一基准相比，HELM 更像评测基础设施。它把已有任务纳入统一规范，同时要求固定 prompt、采样参数、模型版本和指标实现。因此 HELM 对研究者的意义不只是“多跑一些数据集”，而是提供一套可复用、可扩展、可追踪的评测协议。

#### 🧪 练习题

```yaml
question: "HELM 为什么强调 scenario、adaptation、metric 三层拆分？"
options:
  - "为了把任务数据、提示构造和评分指标标准化，减少不同评测之间的不可比性"
  - "为了只保留准确率一个指标"
  - "为了让每个模型使用不同提示以取得最高分"
  - "为了取消所有人工构造数据集"
answer: 0
explain: "HELM 的核心是标准化评测组件，并在多指标下公开比较模型行为。"
```
