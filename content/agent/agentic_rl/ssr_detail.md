### SSR: 自博弈软件工程强化学习 (Self-play SWE-RL)

```yaml
id: ssr
name: SSR
full_name: 自博弈软件工程强化学习 (Self-play SWE-RL)
year: '2025.12'
org: Meta FAIR
paper_url: https://arxiv.org/abs/2512.18552
category: self_improve
parent: sage
motivation: 用自博弈缺陷注入驱动软件代理进化
```

#### 📝 一句话总结
SSR 提出了一种自博弈强化学习框架，通过让 LLM 自动向代码仓库注入真实缺陷、再训练 SWE-agent 修复这些缺陷，形成"漏洞生成-修复验证"的闭环自我进化，无需人工标注即可大幅提升代码修复能力。

#### 🎯 核心要点
- 自博弈（Self-play）双角色框架：Defect Generator 生成缺陷，Solver Agent 尝试修复
- 自动化缺陷注入流程：基于真实 GitHub issue 描述，让 LLM 向仓库代码中注入可被验证的 bug
- 强化学习训练 Solver：将代码修复建模为多步决策过程，利用修复是否通过测试作为奖励信号
- 课程学习机制：Generator 根据 Solver 当前能力动态调整缺陷难度，实现渐进式能力提升
- 完全自动化：无需人工编写 bug 或标注修复轨迹，闭环自我进化
- 在 SWE-bench 等多个真实软件工程基准上取得显著提升

#### 🔬 深入细节
![SSR 自博弈框架示意图](https://arxiv.org/html/2512.18552v3/x1.png)
*图：SSR 的双角色自博弈训练框架 — 左半部分为缺陷生成器(Generator)，右半部分为求解器(Solver)，二者通过"缺陷注入-修复验证"闭环交替进化*

##### 1. 动机与背景

传统 SWE-agent（如 SWE-agent、Devin 等）面临的核心瓶颈是**高质量训练数据匮乏**。人工构造代码修复轨迹成本极高（需要资深工程师花费数小时标注一次完整的 bug 修复过程），导致训练数据规模始终受限。

与此同时，现有的代码修复训练数据多为静态数据集（如 PR 历史、GitHub Issues），模型难以获得**与真实开发场景一致的多样性和难度梯度**。SSR 的核心洞察在于：如果能让模型自己生成可控难度的代码缺陷，再用另一个（或同一个）模型去修复，就能形成一个不需要外部标注的自监督训练循环——这就是**自博弈 (Self-play)** 在软件工程中的自然延伸。

> 💡 关键：SSR 将 AlphaGo Zero 式的自我对弈思想迁移到代码领域，把"下棋"变成了"造 bug 与修 bug"的博弈。

##### 2. 核心机制：双角色自博弈

SSR 框架包含两个核心角色：

**角色 A — Defect Generator（缺陷生成器）**  
给定一个真实代码仓库和一个自然语言描述（如 GitHub issue），Generator 的目标是在仓库中注入一个**可被测试用例捕获、但需要非平凡推理才能修复**的缺陷。具体来说：
- 输入：仓库代码 + issue 描述（如"实现用户登录超时处理"）
- 输出：一个 diff patch，其中包含精心构造的 bug（如错误的边界条件、缺失的异常处理、逻辑反转等）
- 约束：注入的缺陷必须可被仓库现有的（或自动生成的）测试用例检测到，确保 Solver 有可验证的修复目标

**角色 B — Solver Agent（求解器）**  
Solver 接收被注入缺陷后的代码仓库，通过多步交互（读取文件、搜索代码、编辑、运行测试）尝试定位并修复缺陷：
- 动作空间：文件浏览、代码搜索、行级编辑、测试执行
- 奖励信号：修复后测试通过率的变化 — 通过的测试越多，奖励越高
- 策略优化：使用 PPO 类强化学习算法，最大化累计奖励

##### 3. 训练流程伪代码

```python
# SSR 自博弈训练主循环
for iteration in range(N_iterations):
    # 阶段 1：缺陷生成
    repos = sample_code_repos(D_repo)          # 采样真实仓库
    issues = get_issues(repos)                  # 获取对应 issue 描述
    for repo, issue in zip(repos, issues):
        bug_patch = Generator.generate(repo, issue)    # LLM 注入缺陷
        buggy_repo = apply_patch(repo, bug_patch)      # 生成有缺陷仓库
        D_buggy.append((buggy_repo, issue, bug_patch))

    # 阶段 2：求解器训练
    for buggy_repo, issue, bug_patch in D_buggy:
        # 多步决策过程
        state = initialize(buggy_repo, issue)
        for step in range(max_steps):
            action = Solver.policy(state)        # 模型选择操作
            next_state, reward, done = env.step(action)  # 执行并获取反馈
            trajectory_buffer.add(state, action, reward)
            if done: break
        # PPO 更新
        Solver.update(trajectory_buffer)

    # 阶段 3：课程调整
    Generator.update_difficulty(Solver.win_rate)  # 根据 Solver 能力调整难度
```

##### 4. 缺陷难度控制与课程学习

这是 SSR 区别于简单数据增强的关键设计。Generator 不只是随机生成 bug，而是受**难度校准**约束：

- **难度度量**：定义 \( d = 1 - p_{\text{solve}} \)，即 Solver 的修复成功率越低，缺陷越难
- **课程调度**：Generator 维持一个难度分布 \( \mathcal{D}(d) \)，初始偏简单（高修复率），随着训练推进逐步向高难度偏移
- **对抗平衡**：当 Solver 变得太强（修复率 > 阈值 \( \theta_h \)），Generator 被鼓励生成更隐蔽的缺陷（如跨文件的语义 bug、需要理解业务逻辑的深层错误）；当 Solver 太弱（修复率 < \( \theta_l \)），则降低缺陷复杂度

> ⚠️ 注意：这与标准的 GAN 训练不同——SSR 中的 Generator 和 Solver 不是直接对抗的，而是通过**难度调度机制**间接协调，避免了模式坍塌和不稳定训练。

##### 5. 与传统方法的对比

| 维度 | 传统 SWE-agent 训练 | SSR |
|------|---------------------|-----|
| 数据来源 | 人工标注 / PR 历史 | Generator 自动生成 |
| 难度控制 | 固定、不可控 | 动态课程学习 |
| 可扩展性 | 线性增长于标注投入 | 自博弈自动扩展 |
| 多样性 | 受限于历史数据 | Generator 可创造新缺陷模式 |
| 训练信号 | 稀疏（仅最终结果） | 测试驱动的密集奖励 |

##### 6. 关键公式

**Solver 的强化学习目标**：
$$
\mathcal{L}_{\text{RL}} = \mathbb{E}_{(s,a) \sim \pi_\theta} \left[ \min\left( r_t(\theta) \hat{A}_t,\ \text{clip}(r_t(\theta), 1-\epsilon, 1+\epsilon) \hat{A}_t \right) \right]
$$

其中 \( r_t(\theta) = \frac{\pi_\theta(a_t|s_t)}{\pi_{\theta_{\text{old}}}(a_t|s_t)} \) 为新旧策略的概率比，\(\hat{A}_t\) 为基于测试结果的广义优势估计（GAE），裁剪参数 \(\epsilon\) 防止策略更新过激。

**Generator 的难度校准损失**：
$$
\mathcal{L}_{\text{gen}} = -\mathbb{E}_{x \sim \mathcal{D}_{\text{repo}}} \left[ \mathbb{1}[p_{\text{solve}} < \theta_h] \cdot \log P_{\text{gen}}(\text{hard\_bug} | x) + \mathbb{1}[p_{\text{solve}} > \theta_l] \cdot \log P_{\text{gen}}(\text{easy\_bug} | x) \right]
$$

直观理解：当 Solver 成功率低于高阈值时，Generator 偏向生成简单 bug（easy\_bug）；当 Solver 太强时，偏向生成困难 bug（hard\_bug），从而实现动态平衡。

> 💡 关键洞察：SSR 的自博弈本质上创造了一个**无限的数据飞轮**——Solver 越强，Generator 被逼生成更难的缺陷；更难的缺陷反过来又训练出更强的 Solver。这个过程完全自动化，不依赖任何外部标注。

#### 🧪 练习题
```yaml
question: "SSR 框架中，Generator（缺陷生成器）的难度校准机制的主要目的是什么？"
options:
  - "让 Generator 和 Solver 直接对抗，形成 GAN 式的博弈训练"
  - "根据 Solver 当前修复能力动态调整生成缺陷的难度，避免过易或过难导致训练停滞"
  - "确保 Generator 生成的每个缺陷都能被测试用例100%捕获"
  - "让 Generator 学习模仿人类程序员常犯的错误模式"
answer: 1
explain: "难度校准机制根据 Solver 的修复成功率动态调整缺陷复杂度——Solver 太强则生成更难缺陷，太弱则降低难度，维持训练始终处于'最近发展区'，避免两极化导致的训练停滞或无效。"
```
