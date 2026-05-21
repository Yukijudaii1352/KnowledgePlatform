### 盘古具身智能

```yaml
id: pangu_embodied
name: 盘古具身智能
full_name: CloudRobo具身规划模型 (Pangu Robo Embodied Planning Model)
year: '2025.06'
org: Huawei Cloud
paper_url: https://www.huaweicloud.com/intl/zh-cn/news/20250620101057482.html
category: llm_planning
parent: code_as_policies
motivation: 世界模型与规划执行三模型协同，面向跨本体具身任务规划
```

#### 📝 一句话总结
盘古具身智能这一条更准确地说是华为云 **CloudRobo 具身智能平台中的具身规划模型**：它依托盘古多模态/思维能力、盘古世界模型和云边协同基础设施，把环境生成、任务规划、执行验证串成闭环，面向跨机器人本体的长程具身任务规划与部署。

#### 🎯 核心要点
- 这不是公开论文模型，而是 **Huawei Cloud 在 2025 年 6 月发布的 CloudRobo 具身智能平台中的规划子模型**
- 平台官方定义了三类核心模型：**具身多模态生成大模型、具身规划大模型、具身执行大模型**
- 规划模型位于“生成/世界建模”和“执行控制”之间，负责把任务目标转成可验证、可落地的具身行动序列
- 平台提供 **数据合成、数据标注、模型开发、仿真验证、云边协同部署、安全监管** 的端到端能力
- 盘古多模态大模型衍生出的 **盘古世界模型** 负责生成可交互、可漫游的数字物理空间，为具身训练和规划提供环境底座
- 华为云提出 **R2C (Robot to Cloud)** 协议，试图统一不同机器人本体、传感器和接口协议带来的碎片化问题
- 从方法论上看，它更接近 **Code as Policies / 云端规划器** 路线，而不是端到端 VLA 直接吐动作
- 官方公开材料强调的是系统闭环和工程能力，并 **没有公开具体网络结构、损失函数和训练配方**

#### 🔬 深入细节
##### 官方发布总览图

![盘古大模型5.5与CloudRobo发布图](https://res-static.hc-cdn.cn/cloudbu-site/china/zh-cn/unclassification/20256/panggu5.5%E5%8F%91%E5%B8%8320250620.jpg)
*图：华为云在 HDC 2025 发布盘古大模型 5.5 与 CloudRobo 具身智能平台。盘古具身智能在官方语境里并不是单篇论文方法，而是围绕具身生成、规划、执行构建的平台化能力。*

##### 世界模型环境底座图

![盘古世界模型官方示意图](https://res-static.hc-cdn.cn/cloudbu-site/china/zh-cn/MLLM/02.png)
*图：盘古世界模型官方页面示意。公开资料把世界模型定位为“动态生成可交互、可漫游的数字空间”，它是规划模型能够在云端完成验证与迭代的重要前提。*

##### 核心伪代码

```python
# CloudRobo-style embodied planning loop
# This pseudocode is a system-level abstraction from Huawei's official release.

goal = parse_instruction(user_task)
obs = collect_robot_observation(cameras, proprioception, logs)

# 1) Use the world model / multimodal generation model to build a digital scene
world = pangu_world_model(obs, scene_priors, robot_profile)

# 2) Planning model produces a long-horizon action plan in the cloud
plan = embodied_planner(
    goal=goal,
    world=world,
    robot_capability=robot_profile,
    safety_rules=safety_constraints,
)

# 3) Validate in simulation before real deployment
verified_plan = simulate_and_revise(plan, world)

# 4) Execution model grounds subgoals into robot-specific controls
for subgoal in verified_plan:
    action = embodied_executor(subgoal, obs)
    send_via_r2c(action)
    obs = collect_robot_observation(cameras, proprioception, logs)
```

##### 动机与背景

这一条当前页面里原先最大的问题，不是“缺一篇精读”，而是它被误写成了一篇像学术论文那样的算法节点。根据华为云 2025 年 6 月 20 日的官方发布，**盘古具身智能**更准确的落点是：华为云基于盘古大模型发布了 **CloudRobo 具身智能平台**，其中包含“具身多模态生成大模型、具身规划大模型、具身执行大模型”三类核心模型。也就是说，这里真正对应 VLA 图谱中 `llm_planning` 这条分支的，不是一个独立论文式算法，而是平台中的 **具身规划模型**。

官方材料反复强调具身智能的现实困难并不只是“模型还不够强”，而是工程碎片化极重：机器人品类多、传感器类型多、接口协议多，导致模型能力很难从云端稳定迁移到不同本体。因此它采取的是明显的平台路线，而不是单点模型路线。盘古世界模型负责构造数字物理空间，规划模型在这个空间里承担任务拆解与路线选择，执行模型再把子目标落到具体机器人控制上，最后用仿真和云边协同把闭环跑起来。

这和很多论文式 VLA 很不一样。学术工作通常集中在一个明确的网络结构、损失函数或训练策略上，例如 action token 化、flow matching、diffusion policy 或统一多模态自回归。而 CloudRobo 的公开描述更偏系统工程：先把数据合成、仿真验证、模型开发和部署链路打通，再在其中安放规划模型。因此理解它时，不能把它当作一个“单模型论文”，更适合把它看成 **云端具身规划栈** 的一个中枢组件。

> 💡 关键：这条的核心创新不是公开了某个新 Transformer 结构，而是把“世界建模 - 长程规划 - 执行控制 - 云边部署”整成一个平台闭环。

##### 核心机制一：规划模型在三模型闭环中的位置

从官方定义看，CloudRobo 至少包含三层能力：生成、规划、执行。生成模型负责场景/世界表征，执行模型负责把目标变成机器人动作，而规划模型则承担中间那层最关键的“从任务到步骤”的变换。它面对的不再是单个时刻动作回归，而是跨多个子目标、多个约束条件的长程任务分解问题。

如果用一个抽象形式来写，规划模型要解决的其实是：

$$
\pi_{\text{plan}}^\* = \arg\max_{\tau} \; p(\tau \mid g, o_{1:t}, \hat{W}, c)
$$

其中 \(g\) 是任务目标，\(o_{1:t}\) 是观测历史，\(\hat{W}\) 是由世界模型构造或更新的数字环境，\(c\) 是机器人能力、工具和安全约束，\(\tau\) 是长程子任务序列。这个式子不是华为公开论文里的原始公式，而是对其系统角色的准确抽象。它说明规划模型关注的是“选什么子目标序列”，而不是直接回归最终电机命令。

这也是为什么把它放在 `code_as_policies` 之后是合理的。两者都属于“高层语言/程序/计划驱动”的路线，而不是端到端动作生成路线。差异在于，CloudRobo 的规划器不是在孤立文本环境里工作，而是建立在世界模型和云边执行闭环之上。

##### 核心机制二：盘古世界模型为规划提供可验证环境

官方资料明确把 **盘古世界模型** 描述为“动态生成可交互、可漫游的数字空间，构建智能驾驶和具身智能机器人训练所需环境”。这句话对理解规划模型很关键。没有世界模型，规划器更像纯文本 agent，只能基于描述推理；有了世界模型，规划器才有机会在接近真实物理约束的数字空间里做候选方案验证、失败回放和环境重建。

从系统流程看，可以把它理解成先由世界模型生成或补全环境，再由规划模型在环境里生成可执行方案：

$$
\hat{W} = G_{\text{world}}(o_{1:t}, m), \qquad
\tau = \pi_{\text{plan}}(g, \hat{W}, c)
$$

这里 \(G_{\text{world}}\) 表示世界模型，\(m\) 表示外部场景先验或数字地图。直觉上，这一步把“靠语言猜环境”变成了“先显式构图，再规划”。在长程具身任务里，这一点尤其重要，因为很多失败并不是来自目标理解错误，而是来自空间约束、遮挡关系、可达性和多步骤依赖没有被提前模拟出来。

官方材料没有公开 planner 如何调用世界模型，也没有公开是否做树搜索、MPC、行为克隆还是大模型 CoT 规划。但从公开的三模型切分和仿真验证流程看，**世界模型 + 规划模型** 的耦合关系就是这条路线最重要的方法学信息。

> ⚠️ 注意：公开资料没有披露具体训练细节，所以这里能严谨确认的是系统分工，而不是底层神经网络实现。

##### 核心机制三：R2C 与云边协同让规划跨本体落地

华为云在官方发布里专门提出了 **R2C（Robot to Cloud）协议**。这表明它把问题看得很工程化：具身规划不是只要模型会“想”就够了，更大的难点在于不同机器人本体的传感器、接口和执行控制差异太大。规划模型如果只在单一机器人上工作，它的价值就很有限；只有通过统一的云到机器人连接协议，规划器才能成为跨本体复用的中枢。

因此，盘古具身智能这一条的真正含义不是“某个学术模型把 benchmark 做高了多少”，而是：华为云试图把上层具身规划能力固定在云端，用统一协议和云边协同把它下发给不同执行本体。可以把执行过程抽象为：

$$
u_t = \pi_{\text{exec}}(s_t, \tau_k), \qquad
\tau_{k+1} = \text{replan}(o_{1:t+1}, \hat{W}_{t+1})
$$

其中执行模型根据当前状态 \(s_t\) 和当前子目标 \(\tau_k\) 产生控制命令 \(u_t\)，而规划模型在接收到新观测后又可以继续重规划。这种“规划在云、执行在边、状态持续回传”的结构，比单次离线计划更适合真实机器人场景。

所以，如果把它放回 Embodied/VLA 页面中，它最恰当的位置不是一个纯学术 VLA，而是 **平台化云端规划器**。它代表的是具身智能从单模型研究，向数据、仿真、规划、执行、部署一体化系统演进的方向。

#### 🧪 练习题

```yaml
question: "根据华为云公开资料，盘古具身智能这一条在 CloudRobo 中最准确对应什么角色？"
options:
  - "一个端到端直接输出关节力矩的执行策略网络"
  - "平台中的具身规划模型，位于世界建模与执行控制之间"
  - "只做图像理解的视觉编码器"
  - "与机器人无关的通用客服问答模型"
answer: 1
explain: "官方发布明确提到 CloudRobo 提供生成、规划、执行三类核心模型。当前图谱中的盘古具身智能更准确对应其中的具身规划模型，而不是独立论文式的端到端控制器。"
```
