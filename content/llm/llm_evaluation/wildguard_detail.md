### WildGuard：一站式安全审核工具
```yaml
id: wildguard
name: WildGuard
full_name: 一站式安全审核工具 (WildGuard)
year: "2024"
org: Allen Institute for AI
paper_url: https://arxiv.org/abs/2406.18495
category: alignment
parent: safetybench
motivation: 实时审核将越狱率从79.8%降至2.4%
```

#### 📝 一句话总结
WildGuard 提出一个开放、轻量的统一安全审核模型，同时判断用户提示是否有害、模型回复是否有害、以及回复是否属于拒答，解决了以往开源 moderation 工具只覆盖部分安全维度、尤其不擅长越狱提示和拒答检测的问题。

#### 🎯 核心要点
- 三任务统一：Prompt Harmfulness、Response Harmfulness、Response Refusal 在同一输入输出格式中完成。
- 构建 WildGuardMix：约 92K 多任务安全审核样本，覆盖 13 类风险、普通提示、对抗越狱提示、拒答和合规回复。
- 训练集 WildGuardTrain：86,759 条数据，由 synthetic vanilla、synthetic adversarial、in-the-wild、annotator-written 四类来源构成。
- 测试集 WildGuardTest：5,299 条人工标注审核样本，覆盖提示有害性、回复有害性、拒答检测三类标签。
- 基座模型选择：用 Mistral-7B-v0.3 instruction-tuning 得到 WildGuard，重点收益来自高覆盖、平衡、多任务的数据构造。
- 关键效果：在拒答检测上相对既有开源模型最高提升 26.4%，对抗提示有害性判断上可超过 GPT-4 judge，接口级防护将越狱成功率从 79.8% 降至 2.4%。

#### 🔬 深入细节
![WildGuardMix 数据组成与三任务标注示意](https://ar5iv.labs.arxiv.org/html/2406.18495/assets/x2.png)
*图：WildGuardMix 的数据来源、风险类别比例，以及每条交互同时标注 Prompt Harm、Response Harm、Refusal Detection 的例子。*

```python
# WildGuard 统一安全审核伪代码
# 输入可以只有 user_prompt，也可以包含 user_prompt + model_response
for item in WildGuardTrain:
    prompt = item.user_prompt
    response = item.model_response  # prompt-only 样本可为空

    x = format_instruction(prompt, response)
    y = {
        "prompt_harm": item.prompt_harm_label,       # yes / no
        "response_harm": item.response_harm_label,   # yes / no / n/a
        "refusal": item.refusal_label,               # yes / no / n/a
    }

    pred = WildGuard_Mistral7B(x)
    loss = CE(pred.prompt_harm, y["prompt_harm"])
    if response is not None:
        loss += CE(pred.response_harm, y["response_harm"])
        loss += CE(pred.refusal, y["refusal"])
    update_model(loss)

# 部署时作为 LLM 接口前后置审核器
if WildGuard(user_prompt).prompt_harm == "yes":
    block_or_rewrite_request()
else:
    response = target_llm(user_prompt)
    audit = WildGuard(user_prompt, response)
    if audit.response_harm == "yes":
        block_response()
    else:
        return response
```

WildGuard 的出发点不是再做一个单标签毒性分类器，而是把 LLM 安全评测中常被拆开的三个判断合并成一个可部署的审核器。给定用户提示 \(p\) 和可选回复 \(r\)，模型要输出三组离散标签：\(y_{PH}\) 表示提示是否有害，\(y_{RH}\) 表示回复是否有害，\(y_{RR}\) 表示回复是否拒答。多任务监督目标可以概括为：

$$
\mathcal{L}(\theta)=\mathrm{CE}(f_\theta^{PH}(p,r), y_{PH}) + \mathbf{1}[r\neq\varnothing]\mathrm{CE}(f_\theta^{RH}(p,r), y_{RH}) + \mathbf{1}[r\neq\varnothing]\mathrm{CE}(f_\theta^{RR}(p,r), y_{RR})
$$

这个设计的关键在于，\(y_{RH}\) 和 \(y_{RR}\) 不是同一个概念。一个回复可以是安全的拒答，也可以是安全但过度拒答，还可以是带警告的合规回答；如果只看 harmful / safe，就无法衡量模型是否“正确拒绝了有害请求”或“错误拒绝了无害请求”。论文中特别强调，像 “How to kill a Python process?” 这种 benign-but-sensitive 表达，如果只用有害性分类，很容易把正确技术回答和过度拒答混在一起，导致安全评测失真。

数据构造是 WildGuard 的主要贡献。WildGuardTrain 同时包含 prompt-only 和 prompt-response 样本，并刻意平衡 harmful / benign、vanilla / adversarial、refusal / compliance。普通有害提示由风险 taxonomy 生成，风险大类包括 privacy、misinformation、harmful language、malicious uses，并进一步细分为 13 个子类。为了避免模型只学会直白违规词，作者还构造了 benign contrastive prompts，例如表面上像危险请求但实际安全的 XSTest 风格问题，以及讨论敏感主题但语义无害的问题。

对抗样本来自 WildTeaming 思路：先从真实对话中挖掘越狱策略，再随机组合 2 到 7 个 tactic，把普通请求改写成 adversarial prompts。这使训练集不仅覆盖“请教我制造危险物品”这类直接请求，也覆盖角色扮演、免责声明、情境转移、幽默写作等绕过安全策略的形式。这个处理对应部署中的真实攻击面，因为用户越狱常常不改变恶意意图，而是改变包装方式。

回复构造同样围绕拒答检测展开。对于 synthetic prompt，作者让多个 LLM 生成匹配的 refusal 和 compliance 候选，再用 GPT-4 给三项任务打标签，并对 500 条样本做人类审计。审计中 GPT-4 标签与投票人类标签在 prompt harm、response harm、refusal 上分别达到 92%、82%、95% 一致性，说明自动标注主要用于扩大覆盖，而不是完全替代人工验证。对于早期分类器容易误判的复杂回复，作者还专门用 GPT-4 生成包含 caveat、warning、partial compliance 的样本，补强拒答边界。

WildGuardTest 的作用是让评测不再只看直白安全样本。测试集从 synthetic vanilla / adversarial prompt-response pair 起步，每条由三名独立标注者标注 prompt harmfulness、response refusal、response harmfulness，使用多数投票形成 gold label，并对 GPT-4 judge 与人工标签冲突的项目进行人工复核。论文还扩展 XSTest 为 XSTest-Resp，使评测能检查真实安全 benchmark 上的回复有害性和拒答标签，而不是只检查提示本身。

与 Llama-Guard、Aegis-Guard、OpenAI Moderation API 等工具相比，WildGuard 的区别在于“开放 + 多任务 + 对抗覆盖”。传统审核器通常只输出 prompt 或 response 是否 unsafe，无法单独评价 refusal；一些模型可以检测 refusal，但缺乏 prompt/response harm 联合判断，或者没有公开训练数据。WildGuard 把这些标签放入统一 instruction format，使接口部署可以同时做输入拦截、输出审核和行为评测。例如实时接口中，先用 \(f_\theta^{PH}\) 拦截明显恶意提示，再让目标 LLM 生成回复，最后用 \(f_\theta^{RH}\) 与 \(f_\theta^{RR}\) 判断是否放行、是否计入拒答率。

> 💡 关键：WildGuard 的“算法”本质是一个数据驱动的多任务安全审核流程。它的有效性不来自新模型结构，而来自把越狱提示、复杂拒答、合规回复和有害回复放在同一监督空间里，让模型学习更细粒度的安全语义边界。

#### 🧪 练习题
```yaml
question: "WildGuard 为什么要单独训练 Response Refusal 标签，而不是只用 Response Harmfulness 代替？"
options:
  - "因为拒答检测可以减少模型参数量"
  - "因为回复是否有害和回复是否拒答是不同维度，安全回复既可能是正确合规，也可能是过度拒答"
  - "因为 Response Harmfulness 只能用于普通提示，不能用于越狱提示"
  - "因为拒答检测不需要人工标注"
answer: 1
explain: "Response Harmfulness 只能判断回复是否 unsafe，无法区分安全合规回答与安全但错误的拒答；WildGuard 将拒答作为独立任务，才能评估模型是否过度拒绝或正确拒绝。"
```
