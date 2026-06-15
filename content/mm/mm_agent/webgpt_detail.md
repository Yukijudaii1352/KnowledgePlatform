### WebGPT

```yaml
id: webgpt
name: WebGPT
full_name: "网页GPT (WebGPT)"
year: "2021"
org: "OpenAI"
paper_url: "https://openai.com/index/webgpt/"
category: "web"
parent: "—"
motivation: "RLHF训练模型使用搜索引擎降低幻觉"
```

#### 📝 一句话总结

WebGPT 将 GPT-3 放入可搜索、可引用的文本浏览器中，用人类演示和偏好反馈训练长答案问答模型，解决语言模型闭门生成时事实依据不足和幻觉难以评估的问题。它的核心不是简单检索，而是让模型像人类一样搜索、阅读、摘取引用并基于证据写答案。

#### 🎯 核心要点

- **文本浏览器环境**：模型通过 Search、Click、Find、Quote、Scroll、Back、End 等命令与搜索引擎和网页交互
- **引用约束答案生成**：模型必须在浏览过程中收集网页引用，最终答案附带 references，方便标注者检查事实准确性
- **人类演示数据**：标注者在同一浏览环境中回答 ELI5 长问答，形成行为克隆训练轨迹
- **偏好比较数据**：标注者比较两个带引用答案的整体质量，训练 reward model 预测人类偏好
- **训练组合**：使用行为克隆、奖励模型、RLHF/PPO、基于奖励模型的 rejection sampling；最佳模型主要来自行为克隆 + rejection sampling
- **评测结果**：最佳模型相对人类示范答案 56% 被偏好，相对 ELI5 最高票答案 69% 被偏好，并在 TruthfulQA 上提升真实回答比例

#### 🔬 深入细节

##### 框架总览

![WebGPT 浏览器演示界面](https://ar5iv.labs.arxiv.org/html/2112.09332/assets/images/demo_website.png)
*图：WebGPT 的人类演示界面。模型端看到的是同一浏览状态的文本化表示，并通过受限命令执行搜索、跳转、滚动和引用摘取。*

##### 算法流程

```python
# WebGPT 推理流程
def answer_with_browser(question):
    browser.reset(question)
    quotes = []

    for step in range(max_browse_steps):
        state_text = browser.render_text_state(
            question=question,
            current_page=True,
            cursor_position=True,
            past_actions=True,
            collected_quotes=quotes,
        )
        command = policy.generate(state_text)

        if command.startswith("Search"):
            browser.search(command.query)
        elif command.startswith("Clicked"):
            browser.click(command.link_id)
        elif command.startswith("Find in page"):
            browser.find(command.text)
        elif command.startswith("Quote"):
            quotes.append(browser.add_quote(command.text))
        elif command.startswith("Scrolled"):
            browser.scroll(command.direction, command.amount)
        elif command == "Back":
            browser.back()
        elif command == "End: Answer":
            break

    return policy.generate_answer(question, quotes)

# 偏好奖励模型 + rejection sampling
for question in eval_questions:
    candidates = [answer_with_browser(question) for _ in range(N)]
    best = max(candidates, key=lambda y: reward_model(question, y))
    return best
```

##### 方法细节

**1. 动机与背景**

传统开放域问答通常把检索器和生成器拆成两个系统：检索器找文档，生成器综合答案。WebGPT 选择另一条路线：直接训练一个语言模型使用现成搜索引擎，在交互过程中决定搜索词、点开哪些页面、在页面内查找什么、摘取哪些引用。这样做的好处是把“检索”和“综合”放进同一决策轨迹里，模型可以根据当前证据动态调整下一步搜索。

更重要的是，答案必须附带引用。没有引用时，标注者很难判断长答案中的细节是否正确；有引用后，比较两个答案时可以同时看事实依据、结构和有用性。这就是 WebGPT 降低幻觉的核心机制。

**2. 文本浏览环境**

模型并不直接操作完整浏览器 DOM，而是看到一个文本化状态：问题、当前页面标题、可见文本片段、链接编号、滚动位置、已执行动作、已收集引用等。模型输出必须是命令表中的合法动作；非法动作会被忽略但消耗步数。

动作空间包括搜索、点击链接、页内查找、引用当前页面文本、上下滚动、回退，以及结束浏览并进入回答阶段。这个设计把网页使用转化为序列决策问题：

$$
\tau=(o_1,a_1,o_2,a_2,\ldots,o_T,a_T)
$$

其中 \(o_t\) 是文本浏览状态，\(a_t\) 是受限命令。行为克隆阶段最大化人类演示轨迹的似然：

$$
\mathcal{L}_{BC}=-\sum_t \log \pi_\theta(a_t^\* \mid o_{\le t}, a_{<t})
$$

**3. 人类反馈：从比较到奖励模型**

WebGPT 收集两类人类数据：第一类是完整浏览演示，用于教模型如何搜索和引用；第二类是答案偏好比较，用于训练奖励模型。给定同一问题的两个答案 \(y_a,y_b\)，奖励模型用 Bradley-Terry 形式预测偏好概率：

$$
P(y_a \succ y_b)=\sigma(r_\phi(x,y_a)-r_\phi(x,y_b))
$$

对应损失为：

$$
\mathcal{L}_{RM}=-\log P(y_{chosen}\succ y_{rejected})
$$

训练好奖励模型后，有两种优化方式：一是用 PPO 直接优化策略，使答案获得更高奖励；二是 rejection sampling，在推理时采样多个候选答案，再选奖励模型分数最高的一个。论文中最佳结果来自行为克隆模型加 rejection sampling，这说明在可承受多次采样时，筛选比在线强化学习更稳定。

**4. 为什么引用机制有效**

引用不是装饰，而是训练和评估接口。模型在浏览时主动摘取证据，最终答案只能围绕这些证据组织；标注者比较答案时也能快速核查关键事实。这样，人类反馈不再只基于“读起来像不像”，而是更接近事实一致性评估。

但引用并不自动保证真实：模型仍可能选择低质量网页、误读证据或在引用之外添加推断。因此 WebGPT 的贡献是显著降低事实核查成本，而不是彻底解决真实性。

**5. 与后续 Web Agent 的关系**

WebGPT 主要解决长答案问答，动作集中在搜索、阅读和引用；Mind2Web 和 WebArena 则把网页交互扩展到点击表单、选择元素、跨页面执行任务。可以把 WebGPT 看作 Web Agent 的早期形态：它证明了 LLM 可以通过受限浏览动作与互联网交互，也证明了人类偏好反馈可以优化“带工具的语言模型”。

> 💡 关键：WebGPT 的 RLHF 不只是让答案更讨喜，而是把“搜索过程、引用证据、最终回答”统一放进可监督的交互轨迹里。

#### 🧪 练习题

```yaml
question: "WebGPT 要求模型在浏览过程中收集引用的主要目的是什么？"
options:
  - "减少模型输入长度"
  - "让标注者更容易评估答案事实准确性"
  - "替代搜索引擎排序算法"
  - "让 PPO 更新不需要奖励模型"
answer: 1
explain: "引用把答案中的事实主张连接到网页证据，使人类比较和事实核查更可靠，也间接约束模型少做无依据生成。"
```
