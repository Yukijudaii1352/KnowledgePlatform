### WebArena: 真实网页环境 (WebArena)

```yaml
id: webarena
name: WebArena
full_name: 真实网页环境 (WebArena)
year: '2023.07'
org: CMU
paper_url: https://arxiv.org/abs/2307.13854
category: environment
parent: —
motivation: 把网页任务做成可复现实验环境
```

#### 📝 一句话总结
WebArena 提出了一个**独立的、可自托管的真实 Web 交互环境**和对应的基准测试，通过集成 4 类功能性网站（电商、CMS、社交论坛、地图），使自主 Agent 能够在复杂、长程、动态的真实 Web 任务中进行端到端评估，揭示了当前最强 LLM 代理（GPT-4 + CoT）端到端成功率仅 14.41%，远低于人类 78.24% 的巨大差距。

#### 🎯 核心要点
- **自包含可复现环境**：完全自托管的 Web 环境，包含 4 类真实网站（购物、CMS/Reddit、GitLab、地图），每个网站包含完整用户数据和功能逻辑，可完全本地部署。
- **三类观察空间**：URL、当前页面 HTML（包括文本和图片）、以及 **Accessibility Tree**（含元素 ID，供 Agent 精准定位交互元素）。
- **统一 Action Space**：click、type、hover、press（按键组合）、new_tab、tab_focus、tab_close、goto_page、go_back、go_forward、scroll、stop 共 10+ 种复合操作。
- **812 个任务**：覆盖 3 类任务 — **信息查找 (Information-Seeking)**、**站点导航 (Site Navigation)**、**内容与配置 (Content & Configuration)**；另有 **Unachievable 任务** 检验模型识别任务不可达的能力。
- **3 种评估方式**：exact_match、must_include、fuzzy_match；按任务类型细分解耦评估。
- **Agent 设计**：基于 GPT-4、GPT-3.5、PaLM-2 等 LLM，采用 Chain-of-Thought (CoT) + UA Hint (告知模型可执行 stop) 的 Prompting 策略，通过 Accessibility Tree ID 定位元素。
- **实验揭示核心问题**：GPT-4 最佳成功率 14.41%（w/o UA Hint），54.9% 可行任务被误判为不可完成（Early Stopping）；同一模板内的任务变体成功率一致性极差（仅 4/61 模板达到 100% 模板成功率）。
- **对比 Human**：人类 78.24% 成功率，50% 失败源于意图误解（如提供距离而非时间）、答案不完整、执行不完整。

#### 🔬 深入细节
##### 1. 核心框架图（Figure 1）

![WebArena 环境总览](https://github.com/web-arena-x/webarena/blob/main/resources/webarena_overview.png?raw=true)
*图：WebArena 是一个独立、自托管的环境，创建四个类别的网站（电商购站、CMS/Reddit、GitLab、Map），具有功能性和真实数据，Agent 通过 Browser 与之交互。**注**：因 ar5iv 网络不可达，此处 URL 为官方 GitHub 仓库推测路径，若无法显示请参考论文原文 Figure 1。*

##### 2. Agent 执行流程（伪代码）

```
Algorithm: WebArena Agent Execution Loop

Input: Task intent I, Environment E, Max steps M
Output: Task execution trajectory and final answer

1.  obs = E.reset()         # 获取初始 observation（URL + accessibility tree）
2.  history = []
3.  for step in 1..M:
4.      prompt = BuildPrompt(instruction, I, obs, history, allowed_actions)
5.      response = LLM(prompt)          # CoT: 先文本推理，再输出动作
6.      action = ParseAction(response)
7.      if action == "stop [answer]":
8.          return answer
9.      if action == "stop [N/A]":      # 识别为 Unachievable
10.         return "N/A"
11.     new_obs = E.execute(action)     # 环境执行操作，返回新的 observaton
12.     obs = new_obs
13.     history.append((action, obs))
14. raise MaxStepExceeded
```

##### 3. 深入方法细节

**动机与背景**：  
现有的 Web Agent 基准（如 MiniWoB++、WebShop、Mind2Web）在**功能性**（真实数据交互而非模拟）、**真实性**（模拟日常复杂任务而非简单原子操作）、**环境动态性**（支持交互而非常态网页）三者中存在折中。WebArena 通过完全自托管 4 类功能完备的网站填补了这一空白。

**核心机制**：
1. **自托管环境**：所有网站均基于真实开源项目二次开发（如 GitLab、Magento 电商、Reddit 服务器），具有真实的用户数据、产品数据和内容，Agent 的操作会持久化到数据库中（如下单、发帖、fork 仓库），确保评估的**功能性正确性**。
2. **Observation Space**：提供 URL（页面地址）、HTML page content（文本+图片）、以及 **Accessibility Tree**（包含每个交互元素的唯一 ID、角色、名字等）。Agent 通过 Element ID 精准定位点击或输入目标，避免了视觉定位或 DOM 解析的不稳定性。
3. **Action Space 设计**：覆盖浏览器核心操作 — 导航（go_page/go_back/go_forward）、标签页管理（new_tab/tab_focus/tab_close）、键盘输入（type/press）、鼠标交互（click/hover）、滚动（scroll）、停止（stop）。允许 Agent 在跨页面、跨标签的复杂任务中自由操作。
4. **Benchmark 构造**：从 170 个模板中通过**众包重写**生成 812 个具体任务，确保意图表达的多样性。3 类任务分解了信息检索、站点间导航和内容操作的不同粒度。Unachievable 任务（任务描述中有意混淆条件）检验 Agent 的自知能力。
5. **Agent Prompting**：在 Prompt 中详尽描述浏览器环境、允许操作及其语法，并提供 2 个示例（few-shot）。Chain-of-Thought (CoT) 让模型先文本推理再输出动作；UA Hint 告知模型遇到不可完成任务时可执行 "stop [N/A]"，模仿人类的指导说明。
6. **评估函数**：用 URL 匹配、页面元素匹配、最终状态匹配 3 类函数，根据不同任务需求选择 exact_match / must_include / fuzzy_match，并通过功能程序检查（如：商品是否真的加入了购物车、帖子是否真的发布成功）保证评估的**功能正确性**。

**训练/推理流程**：
- Agent 无训练，所有 LLM 为固定模型（GPT-4、GPT-3.5、text-bison-001）。
- 每条任务执行前重置环境到初始状态，Agent 最多执行 M 步。
- 评估时记录完整动作轨迹，成功或失败后有详细的错误日志分析。

**与传统方法的区别**：
| 基准 | 动态交互 | 真实环境 | 多样人类任务 | 功能正确性评估 |
|------|---------|---------|------------|-------------|
| Mind2Web | ✗ | ✓ | ✓ | ✗ |
| MiniWoB++ | ✓ | ✗ | ✗ | ✓ |
| Webshop | ✓ | ✗ | ✗ | ✓ |
| **WebArena** | **✓** | **✓** | **✓** | **✓** |

WebArena 是首个在四项维度上均满足要求的基准。

**关键发现与错误分析**：
- **Early Stopping**：GPT-4 在含 UA Hint 时，将 54.9% 的可行任务误判为不可行，在移除 UA Hint 后总成功率升至 14.41%（Table 2）。
- **模板内不一致性**：即使任务来自同一模板，Agent 表现极度不稳定。GPT-4 仅 4/61 个模板达到 100% 成功率，GPT-3.5 为 0（Table 3）。
- **人类水平**：人类完成 78.24% 任务；失败 50% 因误解意图或回答不完整，表明任务理解本身具有挑战性。
- **模型对比**：GPT-4 (14.41%) > GPT-3.5 (6.41%) > PaLM-2 (5.05%)。CoT 相比直接预测仅提升 ±2.34%（Table 2）。

#### 📊 关键实验结果
| 模型 | CoT | UA Hint | 全任务 SR | Achievable SR | Unachievable 识别率 |
|------|-----|---------|----------|--------------|-------------------|
| GPT-4 | ✓ | ✗ | **14.41%** | 13.02% | 44.44% |
| GPT-4 | ✓ | ✓ | 11.70% | 8.63% | 77.78% |
| GPT-3.5 | ✓ | ✓ | 8.75% | 6.44% | 58.33% |
| GPT-3.5 | ✗ | ✓ | 6.41% | 4.90% | 38.89% |
| Human | - | ✓ | **78.24%** | 77.30% | 100.00% |

#### 📎 论文信息
- **标题**: WebArena: A Realistic Web Environment for Building Autonomous Agents
- **作者**: Shuyan Zhou, Frank F. Xu, Hao Zhu, Xuhui Zhou, Robert Lo, Abishek Sridhar, Xianyi Cheng, Tianyi Zhang, Jaime Fernández, Yonatan Bisk, Daniel Fried, Graham Neubig
- **arXiv**: https://arxiv.org/abs/2307.13854
- **代码**: https://github.com/web-arena-x/webarena
- **年份**: 2023 (ICLR 2024)

#### 🧪 练习题
```yaml
question: "WebArena 为什么把 Accessibility Tree 连同元素 ID 暴露给 agent，而不是只给纯截图？"
options:
  - "因为 WebArena 不支持真实浏览器交互，只能做文本分类"
  - "因为这样可以把网页任务退化成静态问答，避免多步决策"
  - "因为元素 ID 提供了稳定的交互锚点，减少纯视觉定位或 DOM 解析带来的不稳定性"
  - "因为只有 Accessibility Tree 能用来运行最终评估脚本"
answer: 2
explain: "论文的一个关键设计是让 agent 通过可访问性树中的元素标识去执行 click/type 等动作，这比仅靠截图点坐标更稳定，也比原始 DOM 更直接服务交互。"
```
