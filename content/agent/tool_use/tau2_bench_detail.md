### τ²-Bench: 双控对话代理基准 (τ²-Bench)

```yaml
id: tau2_bench
name: τ²-Bench
full_name: 双控对话代理基准 (τ²-Bench)
year: '2025.06'
org: Sierra/Princeton
paper_url: https://arxiv.org/abs/2506.07982
category: evaluation
parent: tau_bench
motivation: 让用户与代理共同操控环境
```

#### 📝 一句话总结
τ²-Bench 把对话 agent 从“只有 agent 能动手”的单控环境推进到“用户和 agent 都能通过工具改变同一世界状态”的双控环境，用 Dec-POMDP 建模、组合式任务生成器和受环境约束的用户模拟器，专门测 agent 的 reasoning 与 user guidance 能力。

#### 🎯 核心要点
- 指出现有 conversational agent benchmark 多是假设只有 agent 操作工具，用户只是被动提供信息
- 提出 Telecom dual-control domain：用户与 agent 都能对共享世界状态执行动作
- 用 Dec-POMDP 建模双控交互，把协调与沟通问题显式化
- 程序化组合任务生成器把 atomic components 组合成可验证任务，控制覆盖度与复杂度
- 用户模拟器与环境状态、可用工具紧耦合，避免传统 user simulator 胡乱“配合”agent
- 评测区分 reasoning error 与 communication/coordination error，而不是只看最终成败
- 实验显示，从 no-user 场景切到 dual-control 后性能明显下降，说明“指导用户做正确动作”是独立难点

#### 🔬 深入细节
![τ²-Bench 双控环境示意图](https://ar5iv.labs.arxiv.org/html/2506.07982/assets/x1.png)
*图：τ²-Bench 把用户与 agent 都放进同一个可操作环境里，评测 agent 不仅要自己决策，还要指导用户采取正确动作。*

```python
# τ²-Bench 的双控交互循环（按论文方法概括）
def dual_control_episode(task, agent, user, env):
    obs_agent, obs_user = env.reset(task)
    while not env.done():
        a_agent = agent.act(obs_agent)
        a_user = user.act(obs_user)
        state = env.step(a_agent, a_user)
        obs_agent, obs_user = state.obs_for_agent, state.obs_for_user
    return evaluate(task, state)
```

τ²-Bench 的关键洞察是：很多真实客服、支持和协同场景里，agent 并不能单方面完成所有操作。用户自己也会修改设备、输入参数、点击按钮、确认步骤，世界状态是“共同操控”的。过去大量 benchmark 仍然采用 single-control 假设，这会系统性高估 agent 的真实能力。

因此论文把问题改写成 dual-control environment，并用 Dec-POMDP 建模。这样 agent 的任务不再只是“自己推理后采取动作”，还包括理解当前共享状态、判断哪些动作该自己做、哪些动作必须指导用户去做。

为了让评测可控，τ²-Bench 还设计了 compositional task generator 与 tightly coupled user simulator。前者保证覆盖度和复杂度可控，后者避免模拟用户无条件帮 agent 补台阶。

所以 τ²-Bench 代表的是评测范式的升级：它把对话 agent 从单方工具使用，推进到“共享环境中的协同控制”。

> 💡 关键：dual-control 的难点不是多一个参与者，而是共享世界状态会让“自己做”和“指导别人做”成为两种不同决策。

> ⚠️ 注意：如果 user simulator 不受环境约束，所谓双控评测会重新退化成单控 benchmark 的伪装版本。

#### 🧪 练习题
```yaml
question: τ²-Bench 相比传统 single-control benchmark 的核心新增难点是什么？
options:
- 要求 agent 在没有任何工具的情况下纯聊天完成任务
- 要求 agent 与用户共同操作共享环境，并正确协调谁该执行哪一步
- 把所有任务都改成图像理解
- 只允许 agent 在最后一轮调用工具
answer: 1
explain: τ²-Bench 的新难点正是 dual-control：agent 不仅要自己操作，还要在共享状态下指导用户操作。
```
