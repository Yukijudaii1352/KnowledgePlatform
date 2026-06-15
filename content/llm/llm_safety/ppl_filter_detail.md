### Perplexity Filter：困惑度过滤器 (Perplexity Filter)
```yaml
id: ppl_filter
name: Perplexity Filter
full_name: 困惑度过滤器 (Perplexity Filter)
year: '2023'
org: Academic
paper_url: https://arxiv.org/abs/2308.14132
category: jailbreak
parent: —
motivation: 困惑度异常检测过滤
```

#### 📝 一句话总结
Perplexity Filter 利用攻击后缀往往语言分布异常这一特征，用困惑度和长度等统计量检测 GCG 类自动越狱提示。

#### 🎯 核心要点
- 基本思想是用外部语言模型估计输入困惑度，异常高的提示更可能包含优化生成的攻击后缀。
- 论文分析了 GCG 生成后缀与普通提示在人类可读性、长度和困惑度上的分布差异。
- 直接阈值过滤简单但有误杀和漏检，论文进一步使用困惑度、长度等特征训练 LightGBM 分类器。
- 该防御对无意义 token 后缀有效，但对 AutoDAN、PAIR、DAN 等自然语言攻击更脆弱。
- 困惑度过滤是低成本输入侧防御，可与 paraphrasing、adversarial training、guardrails 组合使用。

#### 🔬 深入细节
![困惑度与长度分布图源入口](https://www.academia.edu/124790644/Detecting_Language_Model_Attacks_with_Perplexity)
*图源入口：公开页面复现论文 Figure 2，展示普通提示、机器生成攻击提示和人工提示在困惑度与长度空间中的分布。*

```python
# Perplexity Filter 简化伪代码
def perplexity(tokens, lm):
    nll = 0.0
    for i, token in enumerate(tokens):
        nll -= log(lm.prob(token, context=tokens[:i]))
    return exp(nll / len(tokens))

def ppl_filter(prompt):
    tokens = tokenizer(prompt)
    ppl = perplexity(tokens, reference_lm)
    features = {
        "ppl": ppl,
        "length": len(tokens),
        "ppl_per_length": ppl / max(len(tokens), 1),
    }
    risk = classifier.predict_proba(features)
    return "block" if risk > threshold else "allow"
```

困惑度定义为语言模型对序列平均负对数似然的指数形式：
$$
\mathrm{PPL}(x)=\exp\left(-\frac{1}{N}\sum_{i=1}^{N}\log p(x_i \mid x_{<i})\right)
$$
如果一段文本由罕见 token、乱码式后缀或不自然组合构成，参考语言模型会给出较低概率，PPL 就会上升。GCG 的优化目标是让目标模型走向特定输出，而不是让后缀像自然语言，因此正好暴露出这个统计弱点。

最简单的实现是阈值法：超过某个 PPL 就拒绝。问题是正常用户也可能输入代码、外语、专业符号或长串标识符，造成误杀；攻击者也可能把后缀改写得更自然，造成漏检。论文因此把 PPL 和长度一起作为特征，用监督分类器学习更稳健的边界。

从安全架构角度看，Perplexity Filter 是输入预处理层，不依赖目标模型内部权重。它便宜、易部署、能阻断一批明显异常后缀，但不能作为唯一防线。自然语言型攻击的 PPL 可能接近普通文本，此时需要系统提示强化、对话状态跟踪、输出侧检测和策略执行器补足。

与 AutoDAN 的关系尤其直接：AutoDAN 的 motivation 正是生成更自然的越狱提示，使其不再呈现 GCG 后缀那种高困惑度异常。因此 PPL Filter 是 GCG 时代的有效防线，也是促使攻击方法转向语义级搜索的重要背景。

#### 🧪 练习题
```yaml
question: "困惑度过滤器最适合检测哪类越狱输入？"
options:
  - "自然语言角色扮演提示"
  - "完全正常的百科问答"
  - "由优化算法生成的异常 token 后缀"
  - "所有多轮对话"
answer: 2
explain: "GCG 类后缀经常在参考语言模型下呈现高困惑度，而自然语言攻击不一定有这个特征。"
```
