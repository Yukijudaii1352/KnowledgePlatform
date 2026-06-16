### Perplexity Filter：困惑度过滤器
```yaml
id: "ppl_filter"
name: "Perplexity Filter"
full_name: "困惑度过滤器 (Perplexity Filter)"
year: "2023"
org: "Academic"
paper_url: "https://arxiv.org/abs/2308.14132"
category: "jailbreak"
parent: "—"
motivation: "困惑度异常检测过滤"
```

#### 📝 一句话总结
Perplexity Filter 用外部语言模型计算输入 prompt 的困惑度，把机器生成的异常对抗后缀视为分布外文本进行拦截；论文发现单一困惑度阈值误报较高，而将困惑度与 token 长度输入 LightGBM 分类器能显著改善对 GCG 类后缀攻击的检测。

#### 🎯 核心要点
- 论文目标是检测 Zou et al. GCG 风格的 adversarial suffix，而不是直接判断模型输出是否有害。
- 过滤器使用 GPT-2 计算用户 prompt 的 perplexity，假设自然文本在语言模型下更高概率、机器搜索后缀更低概率。
- 朴素阈值规则为 \(\mathrm{PPL}(x)>\tau\) 判定攻击，但多语言、代码、数学符号、短文本等正常输入会造成高困惑度误报。
- 论文加入 token sequence length，与 perplexity 共同作为特征训练 LightGBM，以区分“长而异常的攻击后缀”和“短而罕见的正常文本”。
- 数据包含 1,407 个 GCG 机器生成攻击 prompt、79 个人工 GPT-4 jailbreak prompt，以及多来源普通 prompt。
- 实验显示分类器对机器生成后缀攻击有效，但对人工设计的自然语言 jailbreak 基本失效，说明该防御只覆盖特定威胁模型。
- 最适合部署为输入侧风险信号，与语义安全分类器、输出审查和速率限制结合，而不是单独作为完整安全边界。

#### 🔬 深入细节
![Perplexity 与序列长度联合分布](https://ar5iv.labs.arxiv.org/html/2308.14132/assets/media/pp-len_all_prompts.png)
*图：论文 Figure 2，横轴为 log-PPL，纵轴为 log-length；红色攻击样本和绿色正常样本在二维空间中比单独 PPL 更容易分离。*

困惑度过滤器的出发点是：GCG 等自动后缀攻击通常会产生人类看来不自然的 token 序列，例如罕见符号、大小写混杂、奇怪标点和语法断裂。虽然这些 token 对目标模型可能降低“肯定式回答”的损失，但在一个普通语言模型看来，它们不像自然网页文本或正常问句。因此可以用一个独立 LM，例如 GPT-2，估计 prompt 的平均负对数似然，并把异常高的输入标记为可疑。

给定 token 序列 \(x=(x_1,\dots,x_T)\)，语言模型给出条件概率 \(p_\phi(x_t\mid x_{<t})\)。论文使用的核心统计量是 perplexity：

$$
\mathrm{PPL}(x)=\exp\left(-\frac{1}{T}\sum_{t=1}^{T}\log p_\phi(x_t\mid x_{<t})\right)
$$

\(\mathrm{PPL}\) 越高，表示平均每个 token 越出乎语言模型意料。对抗后缀攻击的典型特征是把一段正常请求和一段机器搜索出的异常后缀拼接起来，因此整体 PPL 往往上升。论文报告，机器生成 adversarial suffix 中大量样本 PPL 极高，接近 90% 的样本超过 1000，而相关样本整体在 200 以上。

```python
# Perplexity Filter 推理伪代码
# 输入侧检测，不执行用户请求，不依赖目标闭源模型内部权重

def score_prompt(prompt):
    ids = gpt2_tokenize(prompt)
    nll = 0.0
    for t in range(1, len(ids)):
        prob = gpt2_prob(ids[t], context=ids[:t])
        nll += -log(prob)
    ppl = exp(nll / max(1, len(ids) - 1))
    length = len(ids)
    return ppl, length

def classify_prompt(prompt, threshold):
    ppl, length = score_prompt(prompt)
    risk = lightgbm.predict_proba([[ppl, length]])[0, 1]
    if risk >= threshold:
        return "block_or_review"
    return "allow_to_next_safety_layer"
```

朴素版本只需要一条规则：\(\mathrm{PPL}(x)>\tau\) 即拦截。但论文强调，这个一维阈值在真实流量中很脆弱。普通用户可能输入代码片段、数学表达式、非英语文本、拼写错误、单词列表或短命令，这些内容对 GPT-2 也可能呈现很高 PPL。相反，人工撰写的 jailbreak 往往仍是自然语言角色扮演，PPL 可能接近正常 prompt。于是单一阈值会同时带来 false positive 和 false negative。

长度特征解决的是一个很具体的混淆：自动 adversarial suffix 通常是“完整请求 + 长后缀”，因此 token 长度不会太短；很多正常高 PPL 样本虽然异常，但可能只是短代码、短公式或孤立符号。二维特征 \((\mathrm{PPL}, T)\) 让模型学习到“长且困惑度高”的区域更可疑，而“短且困惑度高”的区域需要更谨慎。论文使用 LightGBM 而不是手写复杂规则，是因为树模型能自然学习非线性边界，例如在不同长度区间使用不同 PPL 分割。

训练数据设计也体现了威胁模型边界。攻击侧包括 1,407 个由 Vicuna-7B-1.5 上运行 GCG individual 方法生成的机器后缀 prompt，以及 79 个人工 GPT-4 jailbreak prompt；正常侧混合了人类 GPT-4 prompts、DocRED、SuperGLUE BoolQ、SQuAD-v2、Platypus、Tapir 和 instructional code-search prompts 等。这样的组合故意把“正常但形态复杂”的输入加入负类，用来检验过滤器是否只是把所有奇怪文本都拒掉。

![LightGBM 测试集混淆矩阵](https://ar5iv.labs.arxiv.org/html/2308.14132/assets/media/GBM_confusioin_matrix.png)
*图：论文 Figure 3(a)，二维特征分类器在测试集上能识别多数机器生成攻击，但仍保留人工 jailbreak 漏检风险。*

实验结论需要谨慎解读。论文中的 GBM 分类器在测试集 \(F_\beta\) 得分约 94.2%，若排除人工 jailbreak 样本则达到约 99.1%；对机器生成攻击有较高召回，但 23 个人工 jailbreak 测试样本全部成为 false negative。这个结果说明 Perplexity Filter 是“检测机器优化后缀”的强特征，而不是“理解恶意意图”的语义安全模型。若攻击者把目标改成生成低 PPL、流畅自然的 jailbreak，或者在优化目标中显式惩罚高 PPL，单纯困惑度防御就会退化。

> ⚠️ 注意：Perplexity Filter 的优势是便宜、模型无关、可解释；弱点是覆盖面窄，不能把它当作完整的 jailbreak 防线。

实际部署时更合理的做法是把 PPL 作为输入风控管线的一项分数。高风险输入可以进入人工审核、更强安全分类器、隔离沙箱或更严格输出审查；中低风险输入继续由系统消息、工具权限控制和输出侧 policy model 处理。对于多语言或代码助手，还应使用与业务域匹配的语言模型计算 PPL，否则正常专业输入会被误伤。

#### 🧪 练习题
```yaml
question: "为什么论文认为只用单一 perplexity 阈值不是理想的 jailbreak 过滤器？"
options:
  - "因为 perplexity 无法由语言模型计算"
  - "因为正常的代码、数学、非英语或短文本也可能有高 perplexity，导致误报"
  - "因为 GCG 后缀一定拥有最低 perplexity"
  - "因为 token 长度与攻击检测完全无关"
answer: 1
explain: "单一 PPL 阈值不能区分异常但正常的输入和机器生成攻击后缀；论文用 PPL 加 token 长度训练 LightGBM 来降低这种混淆。"
```
