### AgentBench：八类交互环境中的 LLM Agent 综合评测

```yaml
id: agentbench
name: AgentBench
full_name: 智能体基准 (AgentBench)
year: 2024
org: 清华大学
paper_url: https://proceedings.iclr.cc/paper_files/paper/2024/hash/e9df36b21ff4ee211a8b71ee8b7e9f57-Abstract-Conference.html
category: benchmark
parent: api_bank_bench
motivation: 涵盖8个交互环境的综合评测
```

#### 📝 一句话总结

AgentBench 用操作系统、数据库、知识图谱、网页、购物、游戏和家居等八类交互环境，系统衡量 LLM 作为 Agent 的规划、行动和反馈利用能力。

#### 🎯 核心要点

- **核心问题**：只在静态问答上评估 LLM，无法说明模型能否在环境中连续行动并修正错误。
- **环境覆盖**：包括 OS、DB、KG、数字卡牌游戏、侧向思维谜题、家居任务、网页购物和网页浏览。
- **交互协议**：模型在每一轮观察环境状态，输出动作，环境返回新观察和奖励或成功信号。
- **评测价值**：可比较不同模型的 Agent 能力，而不是单纯语言生成能力。
- **局限性**：环境仍是离散和受控的，真实世界网页、机器人和企业系统会更复杂。

#### 🔬 深入细节

![AgentBench environments](https://ar5iv.labs.arxiv.org/html/2308.03688/assets/x2.png)

*图源：ar5iv 论文图 2，展示 AgentBench 用八类环境系统评估 LLM-as-Agent。*

```python
def agentbench(model, task_suite):
    results = []
    for env_name, tasks in task_suite.items():
        for task in tasks:
            env = make_environment(env_name, task)
            obs = env.reset()
            trajectory = []
            for step in range(env.max_steps):
                action = model.act(format_observation(obs), trajectory)
                obs, reward, done, info = env.step(parse_action(action))
                trajectory.append((obs, action, reward))
                if done:
                    break
            results.append(score_task(env_name, task, trajectory, info))
    return aggregate(results)
```

**方法动机**：AgentBench 把 LLM 从静态预测器放进交互式马尔可夫过程。模型不再只优化 $P(y \mid x)$，而是在状态 $s_t$ 下产生动作 $a_t$，目标是最大化累计成功信号 $\sum_t r_t$；这更接近 Agent 的定义。

**八类环境**：OS 测试命令行操作，DB 测试 SQL 查询与数据库理解，KG 测试知识图谱推理，DCG 测试游戏决策，LTP 测试侧向思维，HH 使用家居任务，WS 测试购物流程，WB 测试网页浏览。不同环境暴露不同能力短板：格式约束、长期规划、工具熟悉度、探索和错误恢复。

**统一协议**：AgentBench 通过任务服务器和客户端封装环境交互，让模型以文本形式接收 observation 并输出 action。统一协议降低了跨环境评测成本，也让同一模型可以在多个环境中横向比较。

**结果解读**：AgentBench 的分数不只反映模型知识量，还反映模型能否遵守动作格式、利用反馈、避免无效循环和在有限步数内完成目标。因此它推动了从“问答模型评测”到“行动模型评测”的转向。

#### 🧪 练习题

```yaml
question: AgentBench 相比传统静态 QA 基准的主要区别是什么？
options:
  - A. 模型需要在环境中多轮观察、行动并接受反馈
  - B. 只比较困惑度
  - C. 只测试翻译质量
  - D. 只评估图像分类
answer: A
explain: AgentBench 的核心是交互式环境评测，模型必须通过连续动作完成任务。
```
