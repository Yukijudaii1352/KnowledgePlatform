### NeuroStrike: 面向安全神经元的白盒与迁移攻击研究

```yaml
id: neurostrike
name: NeuroStrike
full_name: '神经元级攻击 (NeuroStrike: Neuron-Level Attacks)'
year: '2026.02'
org: NDSS
paper_url: https://www.ndss-symposium.org/ndss-paper/neurostrike-neuron-level-attacks-on-aligned-llms/
category: jailbreak
parent: gcg
motivation: 剪枝安全神经元绕过对齐
```

#### 📝 一句话总结

NeuroStrike 研究发现安全对齐会形成稀疏的专门神经元，并展示了通过识别、剪枝或迁移利用这些神经元来削弱拒答行为的风险。

#### 🎯 核心要点

- **核心假设**：安全对齐并非均匀分布在所有参数中，而会在部分 MLP 神经元上形成明显安全激活模式。
- **白盒攻击**：比较安全相关样本和普通样本的激活差异，选择高 z-score 神经元，并在推理时屏蔽这些神经元。
- **黑盒扩展**：在开源替代模型上分析安全神经元，再训练或筛选提示生成器，把规律迁移到闭源模型。
- **主要发现**：只改动很小比例神经元即可显著降低拒答能力，同时模型通用能力可能仍保持较高。
- **防御启示**：安全能力应避免过度集中；部署时需要权重完整性、激活异常监控和多样化对齐训练。

#### 🔬 深入细节

![NeuroStrike 框架图](https://arxiv.org/html/2509.11864v1/x1.png)

图源：NeuroStrike 公开论文页面；manifest 中的 NDSS 页面作为正式论文入口。

```text
Algorithm: NeuroStrike-style safety neuron analysis
Input:
  aligned model M
  benign set B, safety-sensitive set S
  neuron score threshold z
Output:
  ranked safety neuron set N_safe and evaluation report

1. Run M on B and S, collecting MLP neuron activations by layer.
2. For each neuron n:
     compute mean activation on S and B.
     compute normalized difference score, e.g. z-score(n).
3. Select N_safe = {n | z-score(n) > z}.
4. White-box evaluation:
     apply an inference-time mask to selected neurons.
     measure refusal rate, harmful compliance rate, and utility.
5. Transfer study:
     compare selected neuron patterns across related models.
     train or evaluate prompt generators against surrogate models.
6. Report attack success and utility degradation under controlled benchmarks.
```

NeuroStrike 的技术重点是把“安全对齐”落到神经元粒度观察。对齐训练会让模型学会在某些输入上拒答、规避或改写回答，这些行为可以在 MLP 激活中留下统计差异。通过比较安全敏感样本和普通样本的激活均值，研究者能够给每个神经元打分，找出对拒答行为贡献突出的候选集合。

白盒版本的攻击在推理阶段屏蔽这些候选神经元，相当于做局部功能剪枝。论文报告这类干预可以只影响很小比例的神经元，却显著改变安全行为，这说明至少在某些模型和训练设置中，安全特征存在可定位的稀疏载体。对防御者而言，这既是可解释性线索，也是完整性风险。

黑盒版本更强调迁移性。攻击者无法直接改闭源模型权重时，可以在开源同族或相近模型上找安全神经元规律，再利用这些规律训练提示生成器或选择攻击策略。它不是证明闭源权重被直接剪枝，而是证明“安全机制的可迁移弱点”可能通过替代模型被利用。

防御上，最直接的结论是不要让安全能力只依赖少数可剪枝单元。可以通过多任务安全训练、跨层正则、随机化冗余安全表征、推理时激活范围检测、模型文件签名和可信执行环境来降低风险。评测也不应只看正常推理，还应包含结构扰动和局部屏蔽压力测试。

#### 🧪 练习题

1. 为什么少量神经元剪枝可能显著影响拒答行为，却不一定马上破坏通用能力？
2. NeuroStrike 的黑盒迁移攻击依赖哪些模型相似性假设？
3. 如何设计训练目标，让安全表征更分散、更难被局部剪枝绕过？
