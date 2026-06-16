### HarmBench：标准化红队测试框架 (HarmBench)

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
HarmBench 提出了一个标准化自动红队评测框架，用统一行为集合、统一生成参数、鲁棒分类器和 held-out test split 解决不同 jailbreak / red teaming 方法不可比较的问题。它还用 R2D2 动态对抗训练展示了如何在同一框架中共同改进攻击评测与模型拒答鲁棒性。

#### 🎯 核心要点
- 构建 510 个 harmful behaviors，并划分为 100 个 validation behaviors 与 410 个 test behaviors
- 行为有两套标签：semantic categories 描述危害主题，functional categories 描述测试形态
- 4 类 functional categories：standard behaviors、copyright behaviors、contextual behaviors、multimodal behaviors
- 7 类 semantic categories：Cybercrime & Unauthorized Intrusion、Chemical & Biological Weapons/Drugs、Copyright Violations、Misinformation & Disinformation、Harassment & Bullying、Illegal Activities、General Harm
- 评测流程标准化为 Generating Test Cases → Generating Completions → Evaluating Completions
- 核心指标是 ASR（Attack Success Rate），用行为条件分类器判断模型输出是否成功触发目标行为
- 非版权行为使用 fine-tuned Llama 2 13B classifier，版权行为使用 hashing-based classifier，避免 LLM judge 被优化或漂移
- 大规模比较 18 种 red teaming methods 与 33 个 target LLMs/defenses，并指出没有单一攻击或防御在所有场景中都稳定有效
- 提出 R2D2（Robust Refusal Dynamic Defense），用 persistent test cases + GCG 更新 + away/toward/SFT 损失做高效对抗训练

#### 🔬 深入细节

![HarmBench Evaluation Pipeline](https://raw.githubusercontent.com/centerforaisafety/HarmBench/main/assets/eval_pipeline-1.png)
*图：HarmBench 官方仓库中的标准评测流程，核心是把行为、攻击方法、目标模型和分类器解耦。*

HarmBench 的出发点是自动红队研究已经出现大量方法，例如基于梯度的 adversarial suffix、LLM optimizer、树搜索式 jailbreak、人工模板等，但论文之间的评测集、生成长度、成功判定器和目标模型都不同。这样会导致一个方法在论文 A 中“成功率很高”，却无法和论文 B 的方法公平比较。HarmBench 将问题形式化为：给定目标行为 \(y\)、red teaming 方法 \(g\) 和目标模型 \(f\)，方法 \(g\) 生成一组 test cases，模型 \(f\) 对这些 test cases 生成 completions，再由分类器 \(c\) 判断 completion 是否体现了行为 \(y\)。

ASR 是 HarmBench 的核心度量。令 \(f_T(x)=x'\) 表示目标模型在固定生成长度 \(T\) 下对 test case \(x\) 的输出，\(c(x',y)\in\{0,1\}\) 表示分类器判断输出是否成功触发行为，则：

$$
\mathrm{ASR}(y,g,f)=\frac{1}{N}\sum_{i=1}^{N} c\left(f_T(x_i), y\right)
$$

论文特别强调 \(T\) 这类评测参数必须标准化，因为生成 token 数会显著改变 substring matching 等旧指标的 ASR。HarmBench 将完成生成、分类器、行为 split 和评测参数固定下来，避免攻击方法直接优化 test classifier 或在 test behaviors 上调参。这个设计比“拿 GPT-4 当裁判”更工程化：HarmBench 提供 validation classifier 给方法开发使用，同时保留不同的 test classifier 作为最终评测，减少过拟合评测器的风险。

```python
# HarmBench 标准评测流程伪代码
for behavior in held_out_behaviors:
    test_cases = red_team_method.generate(behavior)  # 不在 test behaviors 上调参
    completions = []
    for x in test_cases:
        x_prime = target_model.generate(x, decoding="greedy", max_new_tokens=512)
        completions.append(x_prime)

    labels = [classifier.is_success(x_prime, behavior) for x_prime in completions]
    asr[behavior] = sum(labels) / len(labels)

overall_asr = average_over_behaviors(asr)
```

HarmBench 的行为集合是它区别于旧 red teaming benchmark 的关键。standard behaviors 类似既有 harmful instruction 数据集；copyright behaviors 要求检测是否生成受版权保护文本，因此不能只看“是否尝试”，而要用 hashing-based classifier 判断是否实际包含目标文本；contextual behaviors 给出具体上下文，让模型在特定场景中执行不应执行的请求；multimodal behaviors 则包含图片输入，用于评估多模态 LLM 的鲁棒性。functional categories 的价值在于它们测试不同失败模式，而不是只把所有风险混成一个“有害 prompt 列表”。

论文还提出了成功样本判定标准：对非版权行为，completion 只要明显尝试执行目标行为，即使具体内容不完全正确，也可能被算作成功。这是为了把“模型安全机制是否拒绝”与“模型能力是否足够完成任务”拆开。否则一个能力较弱的模型可能因为写不出正确答案而被误判为安全。版权行为则相反，必须严格检测是否输出了受保护文本，因为“受启发但未复现”的内容很难用同一标准判定。

R2D2 是 HarmBench 中用于防御侧的动态对抗训练方法。它不把 red teaming 当成离线数据生成器，而是在训练中维护一池 persistent test cases。每轮从池中采样若干 test cases，用 GCG 在当前模型上继续更新它们，让攻击样本持续贴近当前模型的弱点；然后用模型损失把概率从攻击目标移开，并推向固定拒答文本，同时保留普通 SFT 数据维持可用性。

GCG 攻击目标可写成最小化目标串 \(t_i\) 的负对数似然：

$$
\mathcal{L}_{\mathrm{GCG}} = -\log f_\theta(t_i\mid x_i)
$$

R2D2 对模型使用两个对抗相关损失：

$$
\mathcal{L}_{\mathrm{away}} = -\log\left(1-f_\theta(t_i\mid x_i)\right),\qquad
\mathcal{L}_{\mathrm{toward}} = -\log f_\theta(t_{\mathrm{refusal}}\mid x_i)
$$

总训练目标为：

$$
\mathcal{L}_{\mathrm{total}} = \mathcal{L}_{\mathrm{away}} + \mathcal{L}_{\mathrm{toward}} + \mathcal{L}_{\mathrm{SFT}}
$$

其中 away loss 降低模型继续输出攻击目标串的概率，toward loss 把模型推向安全拒答，SFT loss 则避免模型只学会拒绝而损伤普通对话能力。论文实验中，R2D2 使用 Mistral 7B base、UltraChat SFT 数据、\(N=180\) 个 persistent test cases、每轮 \(m=5\) 个 GCG 更新步、每轮更新 \(n=8\) 个 test cases，并周期性随机重置部分池内样本以提高多样性。

```python
# R2D2 高层伪代码：省略具体攻击字符串，仅描述训练机制
pool = initialize_persistent_test_cases(N=180)
for step in range(M):
    batch_cases = sample(pool, n=8)

    for case in batch_cases:
        case.x = gcg_update(case.x, case.target, model, steps=5)

    loss_away = -log(1 - model.prob(case.target, case.x))
    loss_toward = -log(model.prob(REFUSAL_STRING, case.x))
    loss_sft = supervised_finetuning_loss(model, benign_instruction_batch)

    loss = loss_away + loss_toward + loss_sft
    update_model(model, loss)

    if step % reset_interval == 0:
        randomly_reset_fraction(pool, fraction=0.20)
```

> 💡 关键：HarmBench 的重点不是发明某一种 jailbreak，而是把红队评测变成可复现、可横向比较、难以被评测器投机取巧的标准流程。R2D2 则说明同一标准还能反过来推动防御训练。

#### 🧪 练习题
```yaml
question: "HarmBench 为什么要区分 validation classifier 和 test classifier？"
options:
  - "为了让攻击方法可以直接优化最终测试指标"
  - "为了降低方法对最终测试分类器过拟合或 gaming 的风险"
  - "为了减少 harmful behaviors 的数量"
  - "为了取消人工标注"
answer: 1
explain: "HarmBench 允许开发阶段使用验证分类器，但最终评测使用独立测试分类器，从而降低直接优化评测器导致的虚假高 ASR。"
```
