### STAR-1: 用 1K 高质量样本对齐推理型大模型

```yaml
id: star_1
name: STAR-1
full_name: 推理模型安全对齐 (Safer Alignment of Reasoning LLMs)
year: '2026.01'
org: AAAI
paper_url: https://arxiv.org/abs/2502.11111
category: alignment
parent: safe_rlhf
motivation: 推理模型安全对齐数据集
```

#### 📝 一句话总结

STAR-1 证明推理型大模型的安全对齐不一定依赖海量数据，而可以通过精筛 1K 条带有安全思考轨迹的高质量样本，在尽量保留推理能力的同时显著提升安全性。

#### 🎯 核心要点

- **目标模型**：面向 DeepSeek-R1 蒸馏类 reasoning LLM，以及带有显式思考轨迹的模型。
- **数据策略**：从大规模安全样本池中去重、分类、生成 deliberative reasoning，再经严格评分筛出 1K 高质量样本。
- **训练形式**：用监督微调学习“先安全推理、再给出合规回答”的行为模式。
- **核心发现**：数据质量和推理轨迹比数量更关键；删除思考标签会明显削弱推理模型安全收益。
- **权衡目标**：提升越狱拒绝能力和真实场景安全性，同时尽量不牺牲数学、代码和通用推理 benchmark。

#### 🔬 深入细节

![STAR-1 teaser](https://raw.githubusercontent.com/UCSC-VLAA/STAR-1/main/assets/SART1_teaser_final.jpg)

图源：STAR-1 官方 GitHub 仓库。manifest 中 arXiv URL 保持输入元信息；公开仓库和论文页面用于补足方法细节。

```text
Algorithm: STAR-1 data construction and alignment
Input:
  raw safety dataset D_raw
  safety policy P
  reasoning teacher T
  quality scorer Q
  reasoning model M
Output:
  safer reasoning model M'

1. Decontaminate and deduplicate D_raw.
2. Classify samples into safety categories for diversity control.
3. For each candidate prompt:
     use T to generate policy-grounded deliberative reasoning
     and a final safe response.
4. Score each sample with Q on:
     policy correctness, reasoning quality, answer helpfulness,
     refusal appropriateness, and formatting.
5. Select a diverse high-quality subset D_star of about 1K samples.
6. Supervised fine-tune M on D_star with thought and answer format.
7. Evaluate M' on safety benchmarks and reasoning benchmarks.
8. Optionally mix benign data to reduce over-refusal.
```

STAR-1 针对的是 reasoning LLM 的特殊安全问题。推理模型会显式展开思考过程，安全策略不仅要体现在最终答案中，也要体现在中间推理里。若思考过程已经朝危险方向展开，最后一句拒答并不一定足够；因此数据需要教会模型如何在推理阶段识别风险、引用政策边界并转向安全帮助。

论文的“1K 数据”并不是随机小数据，而是经过强过滤的高密度数据。流程先从更大的安全样本池中去重和分类，保证风险类别多样；再用强模型生成带有 deliberative reasoning 的候选回答；最后用评分器筛掉政策错误、推理薄弱、过度拒绝或格式不合格样本。这体现的是质量优先的数据工程路线。

训练目标是监督微调，而不是复杂的在线 RL。对推理模型来说，SFT 高质量轨迹可以直接改变回答风格：模型学会先判断请求意图和安全边界，再提供拒答、替代安全信息或正常帮助。公开结果显示，在多个安全 benchmark 上提升明显，而推理能力下降较小，说明安全轨迹和通用推理并不必然冲突。

STAR-1 也提醒我们，非推理 LLM 和 reasoning LLM 的最佳安全数据格式可能不同。带 `<think>` 风格的推理轨迹对 reasoning model 很重要，但对普通 instruction model 可能造成格式和行为错配。实际落地应按模型家族分别评估是否保留思考轨迹、是否只训练最终答案，以及是否混入 benign helpfulness 数据降低过拒。

#### 🧪 练习题

1. 为什么 reasoning LLM 的安全对齐需要关注中间推理而不只是最终答案？
2. STAR-1 的 1K 样本为什么能优于更大的低质量安全数据集？
3. 如何评估安全提升是否以过度拒绝或推理能力下降为代价？
