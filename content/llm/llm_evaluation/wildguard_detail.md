### WildGuard

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

WildGuard 提出轻量开源的一站式 LLM 安全审核模型，在同一工具中判断用户提示是否有害、模型回复是否有害以及回复是否拒答，并用 WildGuardMix 数据集提升对越狱和拒答行为的识别。

#### 🎯 核心要点

- 同时覆盖三项 moderation 任务：prompt harmfulness、response harmfulness、response refusal
- 构建 WildGuardMix，包含约 92K 标注样本，覆盖直接恶意提示、对抗越狱、拒答和遵从回复
- WildGuardTest 是约 5K 人工标注测试集，覆盖广泛风险场景和多种交互形式
- 风险体系覆盖 13 类安全风险，定位为开放、轻量、可部署的审核器
- 与 Llama-Guard2 等开源审核器比较，在越狱识别和拒答检测上显著提升
- 在 LLM 接口中作为实时过滤器时，论文报告可将越狱成功率从 79.8% 降到 2.4%

#### 🔬 深入细节

![WildGuard 总览图](https://arxiv.org/html/2406.18495/x2.png)
*图：WildGuard 论文 Figure 1，展示一站式安全审核工具的任务覆盖与应用场景。*

```python
# WildGuard 在线审核与评测伪代码
def moderate_turn(prompt, response=None):
    result = wildguard.classify({
        "prompt": prompt,
        "response": response,
    })
    return {
        "prompt_harmful": result.prompt_harmfulness,
        "response_harmful": result.response_harmfulness if response else None,
        "is_refusal": result.response_refusal if response else None,
    }

prompt_check = moderate_turn(user_prompt)
if prompt_check["prompt_harmful"]:
    block_or_safe_redirect(user_prompt)
else:
    raw_response = target_llm.generate(user_prompt)
    response_check = moderate_turn(user_prompt, raw_response)
    if response_check["response_harmful"]:
        replace_with_safe_refusal()
    else:
        return raw_response
```

##### 动机与背景

LLM 安全审核通常被拆成多个工具：一个检查用户输入是否恶意，一个检查模型输出是否有害，另一个统计模型是否过度拒答。实际部署中这些任务相互关联，特别是在越狱场景下，用户提示可能被包装得很隐蔽，模型回复又可能在表面拒答后泄露可操作信息。

WildGuard 的设计目标是把这些判断统一到一个模型中。统一模型能共享风险类别、越狱模式和拒答模式的表示，避免不同审核器之间标准不一致，也方便在接口层实时插入。

##### 核心机制

WildGuardMix 将训练数据组织为多任务分类样本。输入可以只有 prompt，也可以包含 prompt-response 对；输出同时包括提示有害性、回复有害性和拒答标签。这样的多任务学习让模型既能做前置拦截，也能做后置审查。

可以把 WildGuard 视作一个多头分类器：

$$f_\theta(p, r) = (h_p, h_r, z_r)$$

其中 \(h_p\) 表示 prompt harmfulness，\(h_r\) 表示 response harmfulness，\(z_r\) 表示 response refusal。没有回复时只使用 prompt 相关输出。

##### 越狱与拒答检测

WildGuardMix 专门平衡了直接恶意提示与 adversarial jailbreak 提示，也覆盖拒答和遵从回复。这一点很关键：如果训练集只有直白恶意请求，审核器在复杂越狱包装下容易漏检；如果没有拒答标签，就难以区分“安全拒绝”与“没有回答用户正常问题”的过度拒答。

##### 与 SafetyBench/HarmBench 的关系

SafetyBench 更像安全知识考试，HarmBench 是红队评测框架，WildGuard 则是可部署的审核工具。它既可以作为产品中的实时过滤器，也可以作为评测流水线中的自动判定器，但后者仍需要定期人工抽检来校准误判。

> 💡 关键：WildGuard 的“一站式”指同一模型同时处理输入风险、输出风险和拒答率，而不是只做单点关键词过滤。

#### 🧪 练习题

```yaml
question: "WildGuard 同时预测 prompt harmfulness、response harmfulness 和 refusal 的好处是什么？"
options:
  - "可以完全不需要安全数据"
  - "能在同一审核器中支持前置拦截、后置审查和拒答行为分析"
  - "只能用于离线排行榜，不能用于实时接口"
  - "会强制模型拒绝所有用户请求"
answer: 1
explain: "WildGuard 的多任务输出覆盖输入、输出和拒答三个安全维度，适合部署成统一 moderation 层。"
```
