### DM Control

```yaml
id: dm_control
name: "DM Control"
full_name: "DeepMind控制套件 (DeepMind Control Suite)"
year: "2018"
org: "DeepMind"
paper_url: "https://arxiv.org/abs/1801.00690"
category: "foundation"
parent: "mujoco"
motivation: "标准化连续控制基准，统一奖励结构"
```

#### 📝 一句话总结

DM Control 提出了基于 MuJoCo 的标准化连续控制任务套件，用统一 API、任务结构和奖励约定解决连续控制论文之间环境不一致、奖励不可比和复现实验成本高的问题。

#### 🎯 核心要点

- **标准化任务集合**：覆盖 acrobot、ball-in-cup、cart-pole、cheetah、finger、fish、hopper、humanoid、manipulator、pendulum、point-mass、reacher、swimmer、walker 等领域
- **统一 MDP 接口**：每个环境提供 `action_spec()`、`observation_spec()`、`reset()`、`step()` 和 `TimeStep`
- **奖励范围统一**：除 LQR 外，任务奖励通常规范化到 \([0,1]\)，便于跨任务比较学习曲线
- **Physics/Task/Environment 分层**：MuJoCo 负责底层物理，Task 负责初始状态、观测和奖励，Environment 负责交互协议
- **像素与状态观测兼容**：既可使用低维状态特征，也可通过 wrapper 使用像素观测
- **基准验证流程**：论文用多种 RL agent 检查任务可解性和物理稳定性，并区分 benchmarking 与 extra 任务

#### 🔬 深入细节

![DM Control 任务示例](https://ar5iv.labs.arxiv.org/html/1801.00690/assets/figures/humanoid.png)
*图：DeepMind Control Suite 论文 Figure 1 的 Humanoid 任务面板。ar5iv 将 Figure 1 多个任务域拆成独立图片资源，整张图展示了套件中的连续控制基准集合。*

```python
# DM Control 标准环境循环伪代码
from dm_control import suite

env = suite.load(domain_name="cartpole", task_name="swingup")
action_spec = env.action_spec()
time_step = env.reset()

while not time_step.last():
    obs = time_step.observation
    action = policy(obs, action_spec)
    time_step = env.step(action)

    reward = time_step.reward          # 通常在 [0, 1]
    discount = time_step.discount      # 区分有限终止与截断
```

**动机与背景：连续控制需要可复现实验协议**

DM Control 论文指出，连续控制研究长期依赖 MuJoCo，但不同论文往往使用不同模型文件、奖励 shaping、episode 截断方式和观测定义，导致“同名任务”并不完全可比。DM Control 的目标不是发明一个新的物理引擎，而是在 MuJoCo 之上提供可复现的任务定义和软件接口，让算法比较从“环境实现差异”回到“算法差异”。

**核心机制：MDP 抽象与分层实现**

论文把连续控制任务写成 MDP：

$$
\mathcal{M} = (\mathcal{S}, \mathcal{A}, f, o, r)
$$

其中 \(\mathcal{S}\) 是连续状态空间，\(\mathcal{A}\) 是连续动作空间，\(f(s,a)\) 由 MuJoCo 动力学给出，\(o(s,a)\) 是观测函数，\(r(s,a)\) 是标量奖励。DM Control 的 `Physics` 类包装 MuJoCo 模型和状态查询，`Task` 类定义 episode 初始化、观测和奖励，`Environment` 则统一 `reset/step` 协议。这样的分层让同一个物理模型可以派生多个任务，例如 cartpole 可以有 balance、swingup 等不同目标。

**奖励设计：统一范围与可解释 shaping**

DM Control 的奖励通常由若干个 tolerance 项组合而成，每个项返回 \([0,1]\) 内的达成度。例如“站立”可以奖励 torso 高度，“前进”可以奖励速度，“控制成本”可以惩罚过大动作。可抽象为：

$$
r(s,a) = \prod_i \mathrm{tolerance}_i(g_i(s,a);\; \text{bounds}_i,\; \text{margin}_i)
$$

这种设计的直觉是：奖励不只是稀疏成功标志，而是连续地告诉 agent 哪些物理目标已经接近满足；同时把总奖励限制在统一范围，避免某个任务仅因奖励尺度大而显得学习更快。

**训练/推理流程：TimeStep 约定**

`reset()` 和 `step()` 都返回 `TimeStep`，字段包括 `step_type`、`reward`、`discount` 和 `observation`。`discount` 不只是强化学习公式里的 \(\gamma\)，也用来表达任务终止语义：\(\gamma=0\) 表示真正 terminal，\(\gamma=1\) 可以表示无限时域任务被时间上限截断。这个细节让算法能区分“失败终止”和“评估窗口结束”。

**与传统 MuJoCo Gym 任务的区别**

MuJoCo 是引擎，DM Control 是任务套件和 API 规范。它把模型、奖励、观测、episode 语义和像素 wrapper 统一起来，使不同算法在同一基准上训练和评估。相比直接复制某个 Gym 环境，DM Control 更强调任务定义的透明性和组合性，也因此成为后续世界模型、像素控制和连续控制算法的常用基准。

> 💡 关键：DM Control 的创新在“标准化控制实验”而不在“新动力学求解器”。它把 MuJoCo 的物理能力包装成可复现、可扩展、可比较的连续控制基准。

#### 🧪 练习题

```yaml
question: "DM Control 相比直接使用 MuJoCo 引擎的主要贡献是什么？"
options:
  - "替代 MuJoCo 的底层动力学求解器"
  - "提供统一任务、奖励、观测和 TimeStep API，使连续控制实验可复现可比较"
  - "只支持离散动作 Atari 游戏"
  - "取消物理仿真，只保留监督学习数据集"
answer: 1
explain: "DM Control 构建在 MuJoCo 之上，核心贡献是标准化任务套件和交互协议，而不是新的物理引擎。"
```
