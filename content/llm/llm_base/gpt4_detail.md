### GPT-4：可预测扩展的多模态前沿模型
```yaml
id: gpt4
name: GPT-4
full_name: GPT-4 技术报告 (GPT-4 Technical Report)
year: "2023.03"
org: OpenAI
paper_url: https://arxiv.org/abs/2303.08774
category: autoregressive
parent: gpt3
motivation: 可预测扩展到多模态前沿
```

#### 📝 一句话总结
GPT-4 技术报告提出并评估了一个可接收图像和文本输入、输出文本的大规模多模态 Transformer，并把“可预测扩展”和 RLHF 后训练作为训练前沿模型时降低失控风险和提升对齐质量的核心方法。

#### 🎯 核心要点
- GPT-4 是 Transformer-style 模型，预训练目标是文档中的 next-token prediction，可接收 image/text 输入并生成 text 输出。
- 报告明确不披露模型大小、硬件、训练 compute、数据构造和具体架构细节，原因是竞争和安全影响。
- 预训练后使用 RLHF 进行行为微调，提升事实性、遵循用户意图和期望行为。
- 可预测扩展是核心工程方法：用小于 GPT-4 约 1,000x 到 10,000x compute 的模型拟合 scaling law，预测最终 loss 和 HumanEval 能力。
- Loss prediction 使用带 irreducible loss 的幂律形式 \(L(C)=aC^b+c\)，并在训练早期、不使用中途结果的情况下预测 GPT-4 最终 loss。
- 能力评估覆盖专业考试、MMLU、多语言 MMLU、HumanEval 等；例如模拟律师考试成绩位于考生前 10% 左右。
- 安全流程包括 50+ 领域专家红队测试、额外安全 RLHF prompts、以及 rule-based reward models (RBRMs) 作为模型辅助安全奖励信号。
- 报告同时强调 GPT-4 仍有幻觉、有限上下文窗口、不会从经验中持续学习等限制。

#### 🔬 深入细节
![GPT-4 可预测扩展损失图](https://ar5iv.labs.arxiv.org/html/2303.08774/assets/x1.png)
*图：用较小模型拟合幂律曲线预测 GPT-4 在内部代码数据集上的最终 loss；绿色点为 GPT-4，虚线为基于小模型的预测。*

```python
# GPT-4 技术报告披露的高层训练与预测流程（细节被报告有意省略）
small_runs = []
for compute in compute_grid(max_compute="GPT-4 / 1000 to GPT-4 / 10000"):
    m = train_transformer_next_token(compute=compute, data="public + licensed + third-party")
    loss = evaluate(m, dataset="internal codebase not in training set")
    humaneval = evaluate_pass_rate(m, dataset="HumanEval subset")
    small_runs.append((compute, loss, humaneval))

loss_law = fit_power_law(small_runs, form="L(C)=a*C**b+c")
humaneval_law = fit_capability_law(small_runs)
register_predictions(loss_law, humaneval_law)

gpt4 = train_full_scale_multimodal_transformer()
gpt4 = post_train_with_sft_rlhf_and_safety_rewards(gpt4)
```

GPT-4 技术报告的一个特殊点是“方法细节主动留白”：论文只说明 GPT-4 是预训练 next-token Transformer，并使用公开数据、授权数据和第三方数据；但不披露参数量、层数、训练 compute、数据清洗配方或具体多模态接口。这里的算法精读要把重点放在报告公开强调的机制：如何让一个超大训练任务在完成前就具有可预测性，以及如何通过后训练和安全奖励塑造模型行为。

预训练目标仍可抽象为条件语言建模。若输入上下文 \(x_{<t}\) 可以包含文本 token，也可以包含由视觉编码链路转成的上下文表示，则 next-token loss 为：

$$
\mathcal{L}_{\text{NTP}}(\theta)=-\sum_{t}\log p_\theta(x_t\mid x_{<t})
$$

这类目标本身不是 GPT-4 的新贡献；报告更强调大规模训练系统必须“按尺度可预测”。原因很直接：GPT-4 级别的训练无法像小模型一样反复调参重训，一旦学习率、数据配比、并行系统或数值稳定性出问题，代价极高。因此 OpenAI 先训练一系列小 compute 模型，使用相同方法论测量 loss，再拟合带不可约误差项的 scaling law：

$$
L(C)=aC^b+c
$$

其中 \(C\) 是训练 compute，\(c\) 表示再增加 compute 也难以消除的 irreducible loss。报告称该预测在 GPT-4 训练开始后不久、且不使用中途训练结果的情况下完成；这使团队能在完整训练结束前估计最终模型是否处在预期轨道上。

能力预测部分比 loss 更难，因为 benchmark 分数通常噪声大且非单调。报告选择 HumanEval 的子集来观察代码合成能力，并用 mean log pass rate 建模。对于某个问题集合 \(P\)，论文给出的近似关系是：

$$
-\mathbb{E}_{P}[\log(\operatorname{pass\_rate}(C))]=\alpha C^{-k}
$$

其中 \(\alpha,k>0\)。直觉是：随着 compute 增大，模型解决问题的失败概率以幂律下降；但因为极低 pass rate 难以估计，论文只在每个小模型都有机会解出的题目集合上拟合。这种方法不能保证所有能力都可预测，报告也指出 inverse scaling 类任务可能在某些尺度上反常，但它为训练前沿模型提供了一套比“训练完再看”更可控的监控框架。

后训练阶段使用 RLHF 来把预训练模型转成更符合用户意图的助手。报告没有给出完整 RLHF 损失，但流程可理解为：先通过人类偏好或标注得到奖励信号，再优化策略模型，使回答在有用性、事实性和期望行为上更接近标注标准。抽象写法是：

$$
\max_{\pi_\theta}\;\mathbb{E}_{x\sim\mathcal{D},\,y\sim\pi_\theta(\cdot\mid x)}[R_{\text{human}}(x,y)]
$$

实际系统还需要 KL 约束、拒答策略、偏好数据混合等工程细节；报告只强调 RLHF 后 factuality 和 adherence to desired behavior 得到改善。

GPT-4 的安全方法加入了 model-assisted safety pipeline。除了常规 RLHF，OpenAI 收集额外安全相关 prompts，并使用 RBRMs：一组 zero-shot GPT-4 classifiers。RBRM 的输入包括 prompt、policy model 的输出、以及人工书写的 rubric；输出是对回答类型的分类，例如“理想拒答”“不理想拒答”“包含不允许内容”“安全非拒答”。在安全 RLHF 中，可以把 RBRM 分类结果转成附加奖励：

$$
R(x,y)=R_{\text{preference}}(x,y)+\lambda R_{\text{RBRM}}(x,y;\text{rubric})
$$

上式是对报告机制的抽象表达，不代表论文披露了完整实现。它的直觉是把“什么时候该拒答、什么时候不该过度拒答”写成可执行的评分规则，减少 reward model 标注说明不充分带来的脆弱行为。

与 GPT-3 相比，GPT-4 的论文贡献并不在公开一个可复现架构，而在说明前沿模型训练的两个系统性原则：第一，用小模型外推约束大模型训练风险；第二，用人类反馈、专家红队和模型辅助规则奖励做部署前行为塑形。这也解释了为什么 GPT-4 技术报告更像“训练与安全系统报告”，而不是传统架构论文。

#### 🧪 练习题
```yaml
question: "GPT-4 技术报告中，predictable scaling 的主要作用是什么？"
options:
  - "公开 GPT-4 的完整参数量和层数"
  - "在大训练完成前，用小规模训练结果预测最终 loss 和部分能力"
  - "用检索增强替代 Transformer 预训练"
  - "让模型在推理时自动更新参数"
answer: 1
explain: "报告核心强调通过较小 compute 模型拟合幂律关系，提前预测 GPT-4 的最终 loss 与 HumanEval 子集能力，而不是披露完整架构。"
```
