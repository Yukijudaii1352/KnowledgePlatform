### Agent Q: 自主代理推理与学习 (Agent Q)

```yaml
id: agent_q
name: Agent Q
full_name: 自主代理推理与学习 (Agent Q)
year: '2024.08'
org: Stanford/MultiOn
paper_url: https://arxiv.org/abs/2408.07199
category: online_rl
parent: agile
motivation: 结合搜索自评和偏好学习提效
```

#### 📝 一句话总结
Agent Q提出结合蒙特卡洛树搜索（MCTS）与AI自我批判进行步骤级探索引导，并通过节点级别Direct Preference Optimization（DPO）将搜索经验蒸馏回基础策略，在WebShop和真实OpenTable网站预订任务上分别实现50.5%和95.4%的成功率，远超基座模型和人类平均水平。

#### 🎯 核心要点
- **MCTS搜索引导探索**：在每一步从LLM采样K个候选动作构建搜索树，使用UCB1公式平衡探索与利用，解决Agent在网页任务中贪心搜索、不翻页等探索不足问题
- **AI自我批判（Process Supervision）**：同一基础模型作为零样本评判器对候选动作排序，提供步骤级过程监督信号，无需外部奖励模型
- **节点级DPO训练**：利用MCTS收集的Q值和AI反馈评分构造步骤级偏好对（preference pairs），使用DPO目标函数在步骤级别优化策略，支持同时利用成功和失败轨迹
- **迭代自我改进**：训练后的策略作为下一轮MCTS的参考策略，形成闭环迭代（Algorithm 1）
- **从模拟到真实网站迁移**：在WebShop验证方法后成功迁移到OpenTable真实生产环境，平均步数从6.8步增至13.9步
- **关键结果**：WebShop从28.6%→50.5%（+76.57%）；OpenTable从18.6%→81.7%（+340%），推理时加MCTS搜索达95.4%，超过GPT-4o的62.6%

#### 🔬 深入细节
##### 1. 核心框架示意图

![Agent Q总览：MCTS引导轨迹收集并迭代改进模型](https://ar5iv.org/html/2408.07199/assets/images/AgentTree2.png)
*图1：Agent Q使用MCTS引导轨迹收集并迭代改进模型性能*

![过程监督：策略提议K个动作，Critic排序后指导节点选择](https://ar5iv.org/html/2408.07199/assets/images/process_supervision.png)
*图4：策略在每步推理时提议K个候选动作，同一个LLM作为评判器对动作排序，排序结果用于指导MCTS节点选择和构造DPO偏好对*

![OpenTable结果监督：GPT-4-V评估Agent轨迹](https://ar5iv.org/html/2408.07199/assets/images/outocme_supervision.png)
*图5：轨迹结束时GPT-4-V被调用对Agent表现进行反馈评分*

##### 2. 核心算法伪代码

Algorithm 1: MCTS Guided Direct Preference Optimization

Input: π_{θ_0}: 初始LLM策略, D_T: 任务数据集, N: 迭代轮数,
       B: 每轮采样数, T: MCTS树深度, B: replay buffer,
       θ_threshold: 偏好对阈值, K: MCTS候选动作数
Output: π_{θ_N}: 训练后的LLM策略

for i = 1 to N do
    π_ref ← π_{θ_i}, π_{θ_i} ← π_{θ_{i-1}}
    从 D_T 采样 B 个任务
    for each task in batch do
        初始化根节点 h_0
        for t = 1 to T do
            Selection: 使用UCB1从根遍历至叶节点
            Trajectory Rollout: 从选定节点用π_{θ_i} rollout至终止
            Backpropagation: 自底向上回传更新Q值和N值
        end for
        收集rollout轨迹存入replay buffer B
    end for
    构造偏好对 D_P = {(h_t, a_t^w, a_t^l)}：节点级对比，
        当 |Q̃(h_t, a^w) - Q̃(h_t, a^l)| > θ_threshold 时构成偏好对
    使用DPO目标函数以 D_P 和 π_ref 优化 π_{θ_i}
end for

##### 3. 方法动机与背景

传统LLM Agent在交互式网页环境中面临两大挑战：(1) **复合误差**：监督微调的行为克隆会因分布偏移而累积错误；(2) **探索不足**：模型在搜索结果中贪心地只检查第一页，从不翻页（在WebShop实验中表现为核心失败模式）。强化学习虽能利用失败轨迹，但标准在线RL在真实交互环境中成本过高且不可扩展。

Agent Q的设计哲学：**用搜索补偿策略的短视（推理时），用DPO将搜索经验压缩回策略（训练时）**，形成自我改进闭环。

##### 4. 核心机制详解

**（a）MCTS搜索形式化**

将网页Agent流程建模为树搜索。状态表示为历史摘要+当前页面DOM树。在每个状态节点，从策略模型采样K个候选动作。与棋类等固定动作空间不同，网页Agent的动作空间是开放式文本生成，因此用LLM作为"动作提议分布"（action-proposal distribution）。

MCTS四阶段：
- **Selection**：使用UCB1公式选择最有潜力的节点
- **Expansion/Simulation**：执行动作进入新页面，用当前策略rollout至终止
- **Backpropagation**：环境返回二元奖励R∈{0,1}，自底向上更新每个状态-动作对的Q值和访问计数

$$
Q(\mathbf{h}_t, \mathbf{a}_t^i) \leftarrow \frac{Q(\mathbf{h}_t, \mathbf{a}_t^i) N(\mathbf{h}_t, \mathbf{a}_t^i) + R}{N(\mathbf{h}_t, \mathbf{a}_t^i) + 1}
$$

**（b）AI自我批判的过程监督**

> 💡 关键创新：网页环境无中间奖励。Agent Q使用**同一LLM**对候选动作进行零样本排序，作为过程监督信号。

具体做法：将K个候选动作输入LLM，要求其按"对完成用户任务帮助最大"的标准排序。通过多轮查询（每轮移除已选最佳动作）得到完整排序。该排序有两个用途：(1) 在MCTS选子节点时与UCB1配合使用；(2) 在构造DPO偏好对时作为Q值的补充。

**（c）节点级DPO训练**

> ⚠️ 与轨迹级DPO的关键区别：在步骤级别构造偏好对，而非完整轨迹级别。这允许更细粒度的信用分配，利用MCTS的分支结构自然产生正负对比。

**定理1**：若偏好按 $p(\mathbf{a}_t^w \succ \mathbf{a}_t^l | \mathbf{h}_t) \propto \sigma(Q(\mathbf{h}_t, \mathbf{a}_t^w) - Q(\mathbf{h}_t, \mathbf{a}_t^l))$ 生成，则DPO优化后的策略等价于最优RL策略：

$$
\pi^*(\mathbf{a}|\mathbf{h}_t) \propto \pi_{\text{ref}}(\mathbf{a}|\mathbf{h}_t) \exp(Q(\mathbf{h}_t, \mathbf{a})/\beta)
$$

实际操作中，Q值采用加权混合：$\tilde{Q} = (1-\lambda) \cdot Q_{\text{MCTS}} + \lambda \cdot \text{AI\_Score}$。当两个候选动作的$\tilde{Q}$差超过阈值$\theta_{\text{threshold}}$时，构造偏好对$(h_t, a^w, a^l)$，使用标准DPO损失优化策略。

**（d）与基线方法的区别**

| 方法 | 监督信号 | 是否用失败轨迹 | 步骤级优化 |
|------|---------|-------------|-----------|
| RFT (STaR) | 结果监督 | 否（仅成功轨迹） | 否 |
| DPO (轨迹级) | 结果监督 | 是 | 否 |
| **Agent Q** | 结果+过程监督 | 是 | **是（节点级）** |

##### 5. 实验结果

**WebShop环境（图3）**：
![WebShop成功率和DPO+MCTS对比](https://ar5iv.org/html/2408.07199/assets/images/WebShopPreliminaryResultsPassFinalBold.png)

**OpenTable真实网站（图6）**：
![OpenTable各方法成功率对比](https://ar5iv.org/html/2408.07199/assets/images/open_table_sr_final_bold.png)

核心发现：DPO（结果监督）已优于RFT，但加入MCTS搜索后（Agent Q）进一步提升16-77%。在OpenTable上Agent Q（81.7%）远超GPT-4o零样本（62.6%），推理时再叠加MCTS在线搜索达95.4%。

##### 6. 输入格式

Agent的输入格式为：系统提示 + 执行历史 + 当前页面DOM树 + 用户任务，如：

![Agent输入格式示意](https://ar5iv.org/html/2408.07199/assets/images/AgentFormat.png)
*图2：Agent输入由系统提示、历史、当前页面和用户任务组成*

#### 🧪 练习题
```yaml
question: "Agent Q中节点级DPO与轨迹级DPO的核心区别是什么？"
options:
  - "节点级DPO使用更大的batch size"
  - "节点级DPO在每一步构造偏好对而非完整轨迹级别，利用MCTS分支结构提供细粒度信用分配"
  - "节点级DPO不需要参考策略π_ref"
  - "节点级DPO使用在线RL代替离线优化"
answer: 1
explain: "节点级DPO在MCTS搜索树的每个步骤级别构造(a^w, a^l)偏好对，利用树的分支结构自然产生正负对比，实现比轨迹级DPO更细粒度的信用分配。"
```
