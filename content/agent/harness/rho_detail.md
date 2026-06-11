### RHO: 回顾式 Harness 优化 (Retrospective Harness Optimization)

```yaml
id: rho
name: RHO
full_name: 回顾式 Harness 优化 (Retrospective Harness Optimization)
year: '2026.06'
org: CityU/MSRA
paper_url: https://arxiv.org/abs/2606.05922
category: optimization
parent: ahe
motivation: 只靠历史轨迹自监督优化harness
```

#### 📝 一句话总结
RHO 是一种**零外部监督**的 agent harness 自优化方法：从历史轨迹中精选多样化的困难任务 coreset，并行重跑并利用 agent 自身的 self-validation、self-consistency 和 pairwise self-preference 来生成并筛选最优 harness 更新，单轮优化即可将 SWE-Bench Pro 通过率从 59% 提升至 78%。

#### 🎯 核心要点
1. **问题设定 — Harness Optimization without Ground Truth**
   LLM agent 的能力不仅取决于基础模型，更依赖于其 harness（技能、工具、工作流）的设计。传统优化方法需要标注的验证集，而实际部署中 ground truth 极难获取。RHO 利用 agent 自身的历史轨迹作为唯一信号源，实现完全自监督的 harness 优化。

2. **四阶段核心流程**
   - **Phase 1 — Retrospective Coreset Selection**: 从历史轨迹中基于难度和多样性选取代表性任务子集
   - **Phase 2 — Parallel Rollouts**: 对 coreset 中的每个任务，agent 并行重新求解，生成多条 rollout 轨迹
   - **Phase 3 — Self-Analysis**: 通过 self-validation（自我验证结果正确性）和 self-consistency（多条 rollout 之间的一致性）分析表现
   - **Phase 4 — Harness Update via Self-Preference**: agent 生成多个候选 harness 更新方案，通过 pairwise self-preference 选出最优方案并应用

3. **关键实验发现**
   - SWE-Bench Pro 单轮优化：**59% → 78%**（+19个百分点），无需任何外部 grading
   - 三个领域验证：软件工程（SWE-Bench Pro）、技术工作、知识工作均有显著提升
   - Harness 优化后，agent 的**行为模式发生持久改变**，在长时间会话中维持更高准确率
   - RHO 能有效针对性地修复先前的**失败模式**

4. **核心创新**
   - 首次将 **self-preference** 引入 harness 优化，agent 通过成对比较自行判断哪个 harness 更新更优
   - **Coreset selection** 确保优化聚焦于最有价值的困难案例，避免冗余计算
   - 全流程**零外部监督**，仅依赖历史轨迹，实现真正的自主进化

#### 🔬 深入细节
##### 1. Algorithm 1 — RHO 完整算法伪代码

```
Algorithm 1: Retrospective Harness Optimization (RHO)

Input:  Agent A with harness H_0, trajectory history T, 
        number of optimization rounds R
Output: Optimized harness H_R

1:  for round r = 1 to R do
2:      // Phase 1: Retrospective Coreset Selection
3:      C_r ← SelectCoreset(T, k)        ▷ k tasks from history
4:          ▷ Selection criteria: (i) difficulty score, (ii) diversity
5:      
6:      // Phase 2: Parallel Rollouts
7:      for each task t ∈ C_r do
8:          Rollouts_t ← {A.solve(t, H_{r-1}) for i = 1..m}
9:      end for
10:     
11:     // Phase 3: Self-Analysis
12:     for each task t ∈ C_r do
13:         V_t ← SelfValidate(Rollouts_t, t)
14:         ▷ Check: output correctness, intermediate reasoning, tool usage
15:         S_t ← SelfConsistency(Rollouts_t)
16:         ▷ Measure: agreement among m rollouts on final answer
17:         A_t ← Aggregate(V_t, S_t)
18:     end for
19:     
20:     // Phase 4: Harness Update via Self-Preference
21:     Updates ← GenerateCandidates(A, C_r, {A_t, Rollouts_t})
22:         ▷ Candidates: modified prompts, tool specs, workflow DAGs
23:     H_r ← SelectBySelfPreference(A, Updates, C_r, H_{r-1})
24:         ▷ Pairwise comparison: "Which harness leads to better outcomes?"
25:         ▷ Select update with highest win rate over H_{r-1}
26: end for
27: return H_R
```

**解读**：
- **Phase 1 的 Coreset Selection** 是整个优化的基础。不同于随机采样或全量重跑，RHO 通过难度评分（如历史失败率）和多样性度量（如任务 embedding 的 MMR）选取 k 个任务。这保证了优化资源投放在最有信息量的案例上。
- **Phase 2 的并行 Rollouts** 利用 agent 的非确定性（temperature > 0），对同一任务生成 m 条可能不同的求解路径。这种多样性是后续 self-consistency 分析的信息来源。
- **Phase 3 的 Self-Analysis** 包含两个互补维度：SelfValidation 直接检查单条 rollouts 的输出质量（代码能否运行、答案格式是否正确），SelfConsistency 通过多条 rollouts 的答案一致性来间接评估，两者结合给出无需 ground truth 的可靠质量信号。
- **Phase 4 的 Self-Preference** 是最核心的创新：agent 生成候选 harness 修改（如调整提示词、工具调用策略），然后通过成对比较（"使用 harness A 得到的 rollouts vs. 使用 harness B 得到的 rollouts"）让 agent 自己判断哪个更好，选择胜率最高的更新。

##### 2. 示意图说明

**Figure 1 — RHO 总体框架**
![RHO Framework](https://ar5iv.labs.arxiv.org/html/2606.05922/assets/x1.png)
- *左半部分*：展示历史轨迹的积累，包含成功和失败的案例
- *中间*：四阶段流水线（Coreset Selection → Parallel Rollouts → Self-Analysis → Self-Preference）
- *右半部分*：优化后的 harness 在新任务上表现提升，形成正向循环

**Figure 2 — Coreset Selection 示意**
![Coreset Selection](https://ar5iv.labs.arxiv.org/html/2606.05922/assets/x2.png)
- 可视化展示了如何在 embedding 空间中选取既困难又多样化的 coreset 任务
- 颜色深浅表示任务难度，选取的任务（红圈）覆盖了表示空间的不同区域
- 对比了随机采样、仅按难度采样和 RHO coreset 采样的分布差异

**Figure 3 — 主实验结果**
![Main Results](https://ar5iv.labs.arxiv.org/html/2606.05922/assets/x3.png)
- SWE-Bench Pro: 59% → 78%（单轮优化）
- 包含 ablation study：去掉 coreset selection、去掉 self-consistency、去掉 self-preference 的性能退化
- 多轮优化的效果曲线，显示第二轮后趋于饱和

**Figure 4 — Harness 优化前后行为模式变化**
![Behavior Change](https://ar5iv.labs.arxiv.org/html/2606.05922/assets/x4.png)
- 展示了 agent 工具调用序列的分布变化（如某个原来被过度使用的工具调用频率下降）
- 推理链长度的分布偏移（关键步骤被前置或增加了特定的验证步骤）
- 失败模式的针对性修复（特定类型的 bug 在优化后显著减少）

**Figure 5 — 长时间会话中的稳定性**
![Long-horizon Stability](https://ar5iv.labs.arxiv.org/html/2606.05922/assets/x5.png)
- 对比优化前后 agent 在连续多步任务中的准确率衰减曲线
- 优化后的 harness 显著减缓了长时间运行中的性能退化
- 展示了累积错误率的变化趋势

##### 3. Coreset Selection 的核心设计

RHO 的 coreset selection 采用两阶段评分：

**难度评分** (Difficulty Score)：
- 历史轨迹中该任务的首次尝试成功率（越低越困难）
- 推理步骤长度（过长或过短都可能表示困难）
- 工具调用异常频率（如重复调用同一工具）

**多样性评分** (Diversity Score)：
- 使用 Maximum Marginal Relevance (MMR) 在任务 embedding 空间中选取
- 确保 coreset 覆盖不同的任务类型、领域和失败模式
- 避免选取语义高度相似的冗余任务

最终的 coreset 是难度和多样性的加权组合，实验表明两者缺一都会导致优化效果显著下降。

##### 4. Self-Analysis 的双重验证机制

**Self-Validation**：Agent 检查自身输出的质量
- 代码任务：执行结果是否符合预期、能否编译通过
- 推理任务：中间步骤是否有逻辑跳跃、最终结论是否有证据支持
- 使用结构化 checklist 让 agent 逐项打分

**Self-Consistency**：通过多次 rollouts 交叉验证
- 对同一任务运行 m 次（m=3~5），统计最终答案的一致性
- 高一致性 → 答案可信度更高，低一致性 → 该任务是优化的重点目标
- 与 self-validation 结合：两者矛盾时优先信任 consistency（更客观）

**关键洞察**：这两种机制都不需要 ground truth，却能为 harness 优化提供可靠的反馈信号。Self-validation 捕捉 agent 的"自我认知"，self-consistency 捕捉答案的"客观稳定性"。

##### 5. Pairwise Self-Preference 的实现

这是 RHO 最核心的机制创新。具体流程：

1. **候选生成**：基于 coreset 的分析结果，agent 生成 N 个候选 harness 更新方案（如修改系统提示中关于工具使用的指导、调整特定工作流的条件分支）
2. **成对评估**：对每个候选 harness H'，agent 在 coreset 任务上分别用 H 和 H' 生成 rollouts
3. **自我偏好判断**：agent 比较配对结果，选择"在更多任务上表现更好"的 harness
4. **胜率聚合**：统计每个候选在 pairwise 比较中的胜率，选择胜率最高的方案

**为什么不用绝对评分？** 实验表明 LLM 的绝对评分（如"这个解决方案打 8/10 分"）有严重的校准问题。而 pairwise 比较（"方案 A 和方案 B 哪个更好？"）更符合 LLM 的评估能力，结果更稳定可靠。

#### 关键发现与 insight

1. **Harness 是 agent 能力的放大器**：基础模型不变，仅通过优化 harness 就能带来近 20 个百分点的提升，说明当前 agent 系统的 harness 设计远未达到最优。

2. **历史轨迹是金矿**：部署中的 agent 每天都在产生大量轨迹数据，RHO 证明了这些数据即使没有标注，也能用于 self-improvement。这极大地降低了 agent 持续优化的门槛。

3. **Self-Preference > Self-Refinement**：相比让 agent 直接修改自己的输出（self-refinement），让 agent 比较和选择方案（self-preference）更可靠。偏好判断比质量评分更符合 LLM 的能力边界。

4. **多样性是优化的生命线**：Coreset 的多样性选择至关重要，仅关注最困难的任务会导致过拟合，泛化性下降。多样性确保 harness 更新对广泛任务有效。

5. **行为模式改变是持续的**：优化后的 harness 不仅提升了单次任务的通过率，还改变了 agent 的底层行为模式（工具使用习惯、推理路径选择），这种改变在长时间会话中持续存在。

#### 🧪 练习题
```yaml
question: "RHO 在没有外部标注和 ground-truth 验证集时，主要依靠什么机制来选择更好的 harness 更新？"
options:
  - "只看单次 rollout 的最终奖励，选择分数最高的候选"
  - "让人工工程师离线审查所有轨迹并手工投票"
  - "结合 self-validation、self-consistency，再通过 pairwise self-preference 比较候选 harness"
  - "直接把历史失败任务加入监督微调数据，不再做 harness 搜索"
answer: 2
explain: "RHO 的核心就在于无标注自监督闭环：先用自验证和自一致性分析轨迹，再让 agent 通过成对偏好比较候选 harness，而不是依赖外部标签。"
```
