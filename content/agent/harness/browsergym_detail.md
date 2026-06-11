### BrowserGym: 网页智能体训练场生态 (BrowserGym)

```yaml
id: browsergym
name: BrowserGym
full_name: 网页智能体训练场生态 (BrowserGym)
year: '2024.12'
org: ServiceNow
paper_url: https://arxiv.org/abs/2412.05467
category: environment
parent: webarena
motivation: 统一多种网页基准的观测动作接口
```

#### 📝 一句话总结
BrowserGym 提出了统一的 Gymnasium 风格环境与 AgentLab 实验平台，将 MiniWoB++、WebArena、WorkArena 等异构网页基准接入统一的观测-动作接口，使不同 LLM/VLM 驱动的网页智能体能在完全可复现的条件下进行系统化评估与对比。

#### 🎯 核心要点
- 提出双层生态系统：**BrowserGym**（统一环境层）+ **AgentLab**（实验管理层），解耦环境接口与实验编排
- 基于 Gymnasium API 定义统一的观测空间（DOM、AXTree、截图等多模态）与动作空间（click、type、scroll 等基本操作集）
- 原生支持 MiniWoB++、WebArena、WorkArena、WebLINX 四大基准，新基准只需实现一套薄适配层
- AgentLab 提供可复现实验：固定 seed、环境快照、完整配置追踪，支持大规模并行实验
- 内置 LLM/VLM 推理集成（OpenAI、Anthropic、HuggingFace 等），开箱即用的一键实验对比
- 开源生态（Apache 2.0），社区可灵活扩展新 benchmark 和新 agent 策略

#### 🔬 深入细节
##### 核心示意图

![BrowserGym 生态系统总览](https://ar5iv.labs.arxiv.org/html/2412.05467/assets/x1.png)

*图：BrowserGym 生态系统总览，包括 AgentLab、BrowserGym 以及所支持的网页智能体基准的关系。*

##### 动机与背景

传统网页智能体研究面临两大瓶颈：一是不同基准（MiniWoB++、WebArena 等）各自定义观测格式与动作接口，智能体无法直接跨基准迁移；二是实验可复现性差——缺乏标准化的环境管理、配置追踪和结果汇报机制。BrowserGym 的目标是用一套统一的 API 封装所有网页交互基准，并提供 AgentLab 作为实验编排层，使得研究者只需关注智能体的高层决策策略。

##### 核心机制：双层架构

###### BrowserGym — 统一环境层

BrowserGym 基于 Gymnasium 接口，将网页交互抽象为标准的 RL 环境。其核心设计在于定义了一套**通用的观测空间**和**动作空间**：

- **观测空间（Observation Space）**：每个 step 返回一个 dict，包含：
  - `DOM`：当前页面的 DOM 树或简化 HTML
  - `AXTree`：无障碍树（accessibility tree），适合视觉信息受限的场景
  - `Screenshot`：页面截图（numpy array），供 VLM 使用
  - `Goal`：当前任务的文本描述
  - `ChatMessages`：多轮对话历史

- **动作空间（Action Space）**：统一的高层动作集，包括：
  - `click(element_id)` — 点击指定元素
  - `type(text, element_id)` — 在指定输入框内键入文本
  - `scroll(x, y)` / `go_back()` / `go_forward()` — 页面导航
  - `send_msg(text)` — 向用户发送消息（信息型任务）
  - `report_result(status)` — 任务完成时报告成功或失败

> 💡 关键：所有基准共享相同的动作空间定义，但各基准内部的元素定位方式不同（如 MiniWoB++ 用数字 ID，WorkArena 用语义 bid），BrowserGym 在各适配层内部完成翻译，对外暴露统一接口。

BrowserGym 的核心环境循环：

```
observation = env.reset(seed)
for step in range(max_steps):
    action = agent.predict(observation)
    next_observation, reward, terminated, truncated, info = env.step(action)
```

每个 benchmark 只需继承 `browsergym.core.env.BrowserEnv` 基类，实现 `_get_goal()` 和 `_get_task_metadata()` 等方法，即可接入生态系统。

###### AgentLab — 实验管理层

AgentLab 负责大规模实验的编排：

- **Agent 配置**：通过 YAML 文件声明式定义 agent 所用的 LLM 后端、prompt 模板、策略参数等
- **Experiment Runner**：支持并行启动多个环境实例，自动管理不同 seed 下的实验分配
- **结果追踪**：每个实验自动记录完整的配置快照、每一步的轨迹（observation-action 对）、最终得分
- **Leaderboard**：内置排行榜模块，可在不同 benchmark 上系统性对比不同 agent 的表现

> 💡 关键：AgentLab 通过将所有配置参数（LLM 温度、prompt、随机 seed）纳入版本管理，实现了端到端的实验可复现。即使环境本身具有随机性，同一 seed 下的两次运行会产生完全一致的轨迹。

##### 支持的基准

| 基准 | 任务数量 | 特点 |
|------|---------|------|
| MiniWoB++ | 125+ | 合成微任务，测试原子级 web 操作能力 |
| WebArena | 812 | 四个真实 web app 模拟，综合导航与表单 |
| WorkArena | 33 | ServiceNow 企业工作流，表单密集型 |
| WebLINX | 2337 | 真实网站上的对话式演示转向任务 |

每个基准在接入 BrowserGym 时，需要提供：
1. **任务集定义**：包含任务 ID、类型（信息检索/表单操作等）、难度标签
2. **观测适配器**：将该基准的页面表示转换为统一的 obs dict
3. **动作适配器**：将统一动作映射为该基准的底层操作
4. **评估逻辑**：判断任务是否成功完成的规则

##### 与传统方法的区别

此前，研究者在不同基准上评估智能体时，需要处理完全不同的环境代码库和接口规范。例如，WebArena 提供自己的 task runner 和 evaluation script，MiniWoB++ 有自己的交互协议。这意味着：
- 同一智能体需要针对每个基准编写不同的交互代码
- 实验配置分散，难以整齐对比
- 缺乏统一的 metrics 和 reporting 格式

BrowserGym 通过抽象出**基准无关**的环境接口，将上述差异完全隐藏在适配层内部。AgentLab 进一步标准化了实验管理，使得"在不同基准上跑同一个 agent"与"在同一基准上跑不同 agent"都变成简单的配置切换。

##### 训练/推理流程

1. **环境初始化**：选择 benchmark、指定 seed，BrowserGym 启动对应的浏览器实例并加载目标任务
2. **观测获取**：环境返回当前的 DOM/AXTree/screenshot 等多模态观测
3. **Agent 推理**：Agent 将观测和 goal 打包为 LLM/VLM prompt，调用后端模型获取动作指令
4. **动作执行**：BrowserGym 将统一的动作（如 `click(42)`）翻译为基准特定的浏览器操作
5. **状态更新与评估**：环境返回新观测和奖励信号；AgentLab 记录该步轨迹
6. **循环至终止**：任务完成（主动 report_result）或达到 max_steps 上限

AgentLab 在实验结束后自动汇总所有任务的成功率（success rate）、平均步数等指标，并生成可对比的报告。

#### 🧪 练习题
```yaml
question: "BrowserGym 生态系统中，AgentLab 主要负责什么？"
options:
  - "定义统一的浏览器观测与动作空间"
  - "实验编排与管理，包括配置追踪、大规模并行运行和结果对比"
  - "将 MiniWoB++ 的 DOM 树转换为无障碍树"
  - "在浏览器端执行 click、type 等原子操作"
answer: 1
explain: "AgentLab 是 BrowserGym 生态的实验管理层，负责 agent 配置管理、并行实验调度、轨迹记录与结果对比；环境接口的观测/动作定义由 BrowserGym 核心层完成。"
```
