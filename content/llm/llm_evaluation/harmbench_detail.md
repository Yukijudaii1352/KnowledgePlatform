### HarmBench

```yaml
id: harmbench
name: HarmBench
full_name: 标准化红队测试框架 (HarmBench)
year: "2024"
org: UC Berkeley
paper_url: https://arxiv.org/abs/2402.04249
category: alignment
parent: felm
motivation: 18种攻击方法标准化自动红队
```

#### 📝 一句话总结

HarmBench 提出标准化自动红队评测框架，用统一 harmful behavior 集、攻击生成、目标模型响应和自动分类器判定流程比较红队方法与模型拒答鲁棒性。

#### 🎯 核心要点

- 统一评估自动红队方法和目标 LLM/防御系统，避免各论文自定义任务导致不可比
- 大规模比较 18 种红队方法与 33 个目标 LLM/防御，提供横向攻击成功率分析
- 评测流水线包括生成测试用例、合并测试用例、生成模型回复、分类器判定有害完成
- 行为集合覆盖多类滥用风险，并考虑文本与多模态模型的不同攻击面
- 提供开源代码、配置和分类器，降低复现实验与新增攻击/防御的成本
- 论文还展示对抗训练可在 HarmBench 上系统提升鲁棒拒答能力

#### 🔬 深入细节

![HarmBench 评测流水线](https://raw.githubusercontent.com/centerforaisafety/HarmBench/main/assets/eval_pipeline-1.png)
*图：HarmBench 官方仓库中的 evaluation pipeline，展示攻击生成、目标响应和自动判定流程。*

```python
# HarmBench 标准化红队评测伪代码
for behavior in harmful_behaviors:
    for attack in red_teaming_methods:
        test_cases = attack.generate_test_cases(behavior)
        merged_cases = deduplicate_and_format(test_cases)

        for target_model in target_models:
            completions = target_model.generate(merged_cases)
            for case, completion in zip(merged_cases, completions):
                harmful = harm_classifier.predict(
                    behavior=behavior,
                    prompt=case.prompt,
                    completion=completion,
                )
                attack_success[attack, target_model] += int(harmful)

asr = attack_success / total_cases
report_matrix(asr, rows=red_teaming_methods, cols=target_models)
```

##### 动机与背景

自动红队研究的问题不是“能不能找到一个越狱样例”，而是不同攻击方法、不同目标模型和不同防御方案能否在同一条件下比较。此前工作常使用不同 harmful prompt、不同人工判定标准和不同目标模型，导致攻击成功率很难横向解释。

HarmBench 把红队评测拆成标准组件：行为集定义要测试的有害能力，攻击方法把行为转成具体输入，目标模型生成回复，分类器判断回复是否真正满足有害行为。统一这些接口后，研究者可以替换其中一个组件而保持其他条件固定。

##### 核心机制

评测矩阵的每个单元格是某个攻击方法对某个目标模型的攻击成功率。成功不是由攻击方法自报，而是由自动分类器根据原始 harmful behavior 和模型输出判定。这样可以避免把“模型没有拒绝”误判为“模型给出了可执行有害内容”。

从指标上看，核心量是：

$$ASR(a, m)=\frac{1}{N}\sum_{i=1}^{N}\mathbb{1}[\text{classifier}(b_i, y_{a,m,i})=\text{harmful}]$$

其中 \(a\) 是攻击方法，\(m\) 是目标模型，\(b_i\) 是有害行为，\(y\) 是目标模型回复。

##### 攻防共演

HarmBench 不只评估攻击，也评估鲁棒拒答。防御模型如果只对某一种越狱模板过拟合，换成另一类攻击后 ASR 仍可能很高；标准化框架可以暴露这种脆弱性。论文中的对抗训练实验展示了如何用框架产出的攻击样本反过来训练更稳健的拒答模型。

##### 与普通安全基准的区别

SafetyBench 等多选题基准测的是安全知识理解：模型是否知道某行为危险或不合规。HarmBench 测的是交互式攻击下的安全行为：面对经过优化的恶意输入，模型是否仍会拒绝并避免输出可操作伤害信息。

> ⚠️ 注意：自动分类器本身也是模型，HarmBench 的结论依赖分类器对“有害完成”的判定质量，因此高风险结论仍应结合人工抽检。

#### 🧪 练习题

```yaml
question: "HarmBench 为什么需要统一的 harmful behavior 和自动判定流程？"
options:
  - "为了让所有攻击方法生成完全相同的字符串"
  - "为了让不同红队方法和目标模型的攻击成功率可以公平比较"
  - "为了取消目标模型回复阶段"
  - "为了只评测模型是否掌握安全定义"
answer: 1
explain: "统一行为集、攻击接口和判定器可以减少实验协议差异，使 ASR 更能反映攻击与防御本身的差别。"
```
