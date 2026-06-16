### ToxiGen: ToxiGen数据集 (ToxiGen Dataset)

```yaml
id: toxigen
name: ToxiGen
full_name: ToxiGen数据集 (ToxiGen Dataset)
year: "2022"
org: Microsoft
paper_url: https://aclanthology.org/2022.acl-long.234/
category: content_safety
parent: —
motivation: 隐性毒性检测数据集
```

#### 📝 一句话总结

ToxiGen 提出了一个用大语言模型生成的隐性毒性检测数据集，并用 ALICE 这种 classifier-in-the-loop 解码机制主动制造能迷惑现有毒性分类器的样本，解决传统毒性数据集依赖显式脏词、群体提及偏置和难以覆盖隐性仇恨的问题。

#### 🎯 核心要点

- 构建 274,186 条机器生成语句，覆盖 13 个少数/边缘化身份群体，并在 toxic 与 benign 两类之间保持接近平衡。
- 强调隐性毒性，论文统计 98.2% 的 ToxiGen 样本不含显式 profanity、slur 或 swearword。
- 使用 demonstration-based prompting，让 GPT-3 根据每个群体、每种标签的示例集合生成同类但不同的新语句。
- 提出 ALICE（Adversarial Language Imitation with Constrained Exemplars），在 beam search 中把语言模型概率和毒性分类器概率联合成解码分数。
- 通过两类对抗设置产生难例：毒性提示下最大化 benign 分类概率形成 false negative，良性提示下最大化 toxic 分类概率形成 false positive。
- ALICE 实验中使用 GPT-3 作为生成器、HateBERT OffensEval 作为分类器，设置 \(\lambda_L=\lambda_C=0.5\)、beam size 10、最大 30 token、temperature 0.9。
- 人工验证集 ToxiGen-HumanVal 使用 792 条样本，每条由 3 名标注者评估，用于确认机器生成文本的人类相似度、目标群体控制和毒性标签可靠性。
- 下游实验显示，用 ToxiGen 微调毒性分类器能提升其在 ImplicitHateCorpus、SocialBiasFrames、DynaHate 等人写隐性毒性数据上的表现。

#### 🔬 深入细节

![ToxiGen ALICE 对抗解码示意图](https://ar5iv.labs.arxiv.org/html/2203.09509/assets/x2.png)
*图：ALICE 在 constrained beam search 中把 GPT-3 生成候选 token 的语言模型分数与外部毒性分类器分数相结合，从而生成对现有检测器更难的隐性毒性样本。*

```python
# ToxiGen / ALICE 核心流程伪代码
identity_groups = ["Black", "Asian", "Native American", "Latino", "Jewish", "Muslim",
                   "Chinese", "Mexican", "Middle Eastern", "LGBTQ+", "Women",
                   "Mental Disability", "Physical Disability"]

for group in identity_groups:
    benign_demos = curate_examples(group, label="benign", n=20_to_50)
    toxic_demos = curate_examples(group, label="toxic", n=20_to_50)

    # 普通 ToxiGen 生成：用示例提示 GPT-3，再用 top-k decoding 采样
    for label, demos in [("benign", benign_demos), ("toxic", toxic_demos)]:
        prompt = build_demonstration_prompt(group, demos)
        samples = gpt3_top_k_decode(prompt, max_len=30, temperature=0.9)
        save(samples, group=group, label=label, source="top-k")

    # ALICE 对抗生成：把分类器放入 beam search 的打分环节
    for setup in ["false_negative", "false_positive"]:
        prompt, target_clf_class = choose_prompt_and_target_class(setup, group)
        beams = [empty_sequence()]
        for t in range(max_len):
            candidates = []
            for seq in beams:
                for token in top_100_lm_tokens(gpt3, prompt + seq):
                    new_seq = seq + token
                    lm_score = log_p_lm(token, prompt + seq)
                    clf_score = log_p_classifier(target_clf_class, prompt + new_seq)
                    score = 0.5 * lm_score + 0.5 * clf_score
                    candidates.append((score, new_seq))
            beams = select_top_beams(candidates, beam_size=10)
        save(beams, group=group, source="ALICE", adversarial_setup=setup)
```

ToxiGen 的出发点不是再爬一批网络辱骂文本，而是修正毒性检测中两个更隐蔽的问题。第一，很多既有数据集把少数群体关键词与 toxic 标签强绑定，模型容易学到“提到某群体就是有害”的捷径，造成对良性身份讨论的误杀。第二，真正难检测的隐性毒性通常没有显式脏词，可能以刻板印象、暗示性贬低、伪事实断言或貌似正面的偏见表达出现，靠关键词抓取很难规模化获得。ToxiGen 因此把目标改成“可控生成”：指定群体、指定 toxic/benign 标签、尽量避免显式攻击词。

普通生成阶段采用 demonstration-based prompting。对每个群体，作者先收集少量高质量示例，再让 GPT-3 模仿这些示例生成更多同分布语句。关键设计是把身份群体和标签拆开控制：每个目标群体都有 benign 与 toxic 两组 prompt，总计 26 组 prompt。这样得到的数据不是由网络平台自然分布决定，而是由实验者主动控制，使每个群体都有足量良性与有害样本，从源头降低“群体提及 = 毒性”的伪相关。

ALICE 是论文中最重要的算法机制。它把生成器 \(\mathrm{PLM}\) 和毒性分类器 \(\mathrm{CLF}\) 放进同一个解码循环：生成器保证语言流畅性，分类器提供软约束，beam search 每一步选择既像自然语言、又朝目标分类器标签移动的 token。论文的核心打分可写成：

$$
\log p(w_{i+1}\mid w_{0:i}) \propto
\lambda_L \log p_{\mathrm{LM}}(w_{i+1}\mid w_{0:i}) +
\lambda_C \log p_{\mathrm{CLF}}(y^\star\mid w_{0:i+1})
$$

其中 \(w_{0:i}\) 是当前部分序列，\(w_{i+1}\) 是候选下一个 token，\(y^\star\) 是希望分类器输出的目标类别，\(\lambda_L\) 与 \(\lambda_C\) 控制语言自然度和对抗目标之间的权衡。如果 \(\lambda_C\) 太高，生成文本可能变得不自然；如果 \(\lambda_L\) 太高，样本又可能只是普通 GPT-3 输出，不能有效攻击分类器。论文默认二者相等，本质上是在“可读性”和“分类器误判性”之间做折中。

ALICE 的两个对抗方向对应内容安全系统最常见的两类失败。false negative 方向从 toxic prompt 出发，却在 beam search 中最大化分类器的 benign 概率，从而生成“人看有害、模型看安全”的隐性毒性。false positive 方向从 benign prompt 出发，却最大化 toxic 概率，从而生成“人看良性、模型看有害”的身份提及文本。前者暴露漏检，后者暴露误杀；二者合在一起使 ToxiGen 不只是一个训练集，也是一套压力测试工具。

从训练分类器的角度看，ToxiGen 的价值在于它把困难样本分成可解释来源。top-k 生成样本提供规模和群体均衡；ALICE 样本提供模型特定的边界攻击；人工验证集则提供可信评估锚点。论文没有假设机器生成文本天然可靠，而是用人工标注检查“是否像人写的”“是否伤害目标群体”“是否包含直接或间接群体指涉”等维度。这样得到的数据能同时用于微调、鲁棒性评估和偏差诊断。

与传统毒性数据集相比，ToxiGen 的方法论差异非常明显。传统采集路径依赖平台语料、关键词、用户举报或人工红队，容易继承平台偏差和显式语言偏差；ToxiGen 则把 LLM 的潜在偏见能力反过来用于生成训练信号。它不是声称 GPT-3 生成的有害内容是现实世界分布的无偏样本，而是用“可控、平衡、隐性、对抗”的合成数据填补真实数据难以覆盖的区域。对内容安全系统而言，这种合成难例数据尤其适合补强边界行为，而不是替代真实线上分布。

> 💡 关键：ToxiGen 的核心不是“用 GPT-3 造毒性文本”这么简单，而是把数据生成过程变成一个可控的安全评测器，让生成器、分类器、目标群体和毒性标签都成为显式变量。

#### 🧪 练习题

```yaml
question: "ALICE 在 ToxiGen 中把毒性分类器放入 beam search 的主要目的是什么？"
options:
  - "让生成器完全避开少数群体相关词语"
  - "用分类器分数作为软约束，生成能暴露误杀或漏检的隐性毒性难例"
  - "把所有生成样本都转换为显式辱骂文本"
  - "用人工标注器替代语言模型的 token 选择"
answer: 1
explain: "ALICE 将语言模型概率与分类器目标类别概率加权合成解码分数，使生成文本既自然又能挑战已有毒性分类器。"
```
