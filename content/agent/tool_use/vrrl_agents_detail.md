### EigenData+VR-RL: 自演化数据与可验证奖励后训练 (EigenData + VR-RL)

```yaml
id: vrrl_agents
name: EigenData+VR-RL
full_name: 自演化数据与可验证奖励后训练 (EigenData + VR-RL)
year: '2026.01'
org: Tsinghua/Eigen AI
paper_url: https://arxiv.org/abs/2601.22607
category: learning
parent: toolace
motivation: 自演化数据结合可验证奖励后训练
```

#### 📝 一句话总结
提出 **EigenData**（自演化多智能体数据引擎）与 **Verifiable-Reward RL**（基于可验证奖励的GRPO强化学习）相结合的后训练框架，解决了长程工具使用场景下高质量训练数据匮乏和RL奖励信号不可靠的问题，在多域τ²-bench上使开源模型匹配甚至超越GPT-5/Claude等前沿闭源模型。

#### 🎯 核心要点
- **EigenData 分层数据引擎**：编排层（Orchestration Layer）含 WorkflowPlanner / PromptEngineer / Judge 三个Agent协同；执行层（Execution Layer）含七步流水线：RandomPool → UserIntent → TaskValidation → DialogSynthesis → TrajectoryValidation → Modify → ValidationFunction
- **Per-Instance 可执行验证函数**：每条合成的对话自动生成一个Python验证函数，解析最终状态与ground-truth状态对比，产生二值奖励信号，为RL提供无噪声的outcome reward
- **自演化 Prompt 优化**：每代迭代16次，使用5-20个样本，通过PromptEngineer和Judge自动改进prompt集合的质量和多样性
- **三阶段大规模合成**：多样化初始化 → 试优化（pilot optimization）→ 在线监控生成（online monitoring generation），逐步扩大数据规模和覆盖范围
- **GRPO 轨迹级RL训练**：基于 group-relative advantage 的 token-level clipping loss，配合 Dynamic Filtering 移除全成功/全失败的无信号组
- **User Model 监督微调**：先对开源用户模拟器进行SFT微调确保稳定模拟，避免用户模型错误污染RL奖励信号
- **多域SOTA结果**：Qwen3-235B-A22B RL后 Airline 73.0% / Retail 75.0% / Telecom 98.3%（passˆ1），匹配Gemini 3.0 Pro / Claude Sonnet 4.5
- **Mix Training 泛化**：三域混合训练单模型平均81.3% passˆ1，超越Qwen3-Max-Thinking (80.7%) 和 GPT-5 (80.0%)

#### 🔬 深入细节
##### 1. 框架总览

整体后训练流程分为两大阶段：

**阶段一：EigenData 数据合成。** 一个分层多智能体系统自动生成多轮工具使用对话及配套的per-instance验证函数。编排层的三个Agent分工协作：WorkflowPlanner 根据domain schema设计合成工作流，PromptEngineer 通过自演化迭代优化prompt，Judge 评估数据质量和任务多样性。执行层按照七步流水线将工作流实例化：从随机种子池中抽取用户画像（RandomPool），生成用户意图（UserIntent），验证任务可行性（TaskValidation），合成完整多轮对话（DialogSynthesis），对轨迹进行质量校验（TrajectoryValidation），按需修改或重试（Modify），最终生成可执行的验证函数（ValidationFunction）。关键特性是**每条数据都带有独立的可执行验证函数**，这为后续RL提供了精确的、无歧义的结果奖励信号。

**阶段二：Verifiable-Reward RL 训练。** 先用EigenData合成的大量对话对agent模型做SFT微调，同时对user simulator模型也做SFT微调（确保用户行为可靠）。然后在多轮交互环境中进行GRPO强化学习：agent与微调后的用户模拟器交互，生成的完整轨迹由per-instance验证函数评估产生outcome reward，通过group-relative advantage计算学习信号。

![EigenData 架构总览](https://ar5iv.labs.arxiv.org/html/2601.22607/assets/x1.png)
*图：EigenData 分层多智能体数据合成框架与 Verifiable-Reward RL 训练流程总览*

##### 2. EigenData 数据合成详解

**问题动机**：传统工具使用数据依赖人工标注，成本极高且难以规模化。简单的模型生成数据缺乏多样性，且没有客观的验证手段来判断轨迹正确性。EigenData 的核心创新在于**自动化生成可验证的数据**，使得每条样本都自带"标准答案检查器"。

**编排层（Orchestration Layer）** 三个Agent的职责：

1. **WorkflowPlanner**：接收domain的工具schema和任务描述，设计该领域的完整数据生成工作流，包括确定需要多少个不同的prompt集合（如Airline领域生成64个prompt set）、每个集合覆盖的用户场景类型、以及各步骤的具体配置参数。

2. **PromptEngineer**：负责prompt的自演化优化。采用迭代方式：从少量初始prompt开始（5-20个样本），生成一批对话数据，由Judge评估质量后，PromptEngineer分析失败案例并提出改进方向（如增加约束、调整话术、覆盖边缘情况），生成下一代prompt。每代迭代16次，prompt质量和生成的对话质量同步提升。

3. **Judge**：评估合成数据的质量，包括对话是否逻辑一致、工具调用是否正确、验证函数是否精确等。Judge的输出反馈给PromptEngineer形成闭环优化。

**执行层（Execution Layer）** 七步流水线：

| 步骤 | 名称 | 功能 |
|------|------|------|
| 1 | RandomPool | 从预定义的种子池中随机采样用户画像、偏好、约束条件 |
| 2 | UserIntent | 基于用户画像生成具体的任务意图（如"预订从北京到上海的航班"） |
| 3 | TaskValidation | 验证任务的可行性，确保工具schema能支持该任务 |
| 4 | DialogSynthesis | 合成完整的多轮对话，agent逐步调用工具完成任务 |
| 5 | TrajectoryValidation | 校验轨迹的正确性、连贯性和工具调用合理性 |
| 6 | Modify | 对不通过的轨迹进行修改或重新生成 |
| 7 | ValidationFunction | **关键步骤**：自动生成Python验证函数，该函数接收最终状态，与ground-truth比对 |

验证函数的核心作用：

```python
# 生成的验证函数示例（Telecom领域）
def validate(final_state, ground_truth):
    """比较关键实体和操作是否完全匹配"""
    for entity in ground_truth["entities"]:
        if entity not in final_state["entities"]:
            return 0  # 失败
    for action in ground_truth["actions"]:
        if action not in final_state["actions"]:
            return 0
    return 1  # 完全匹配才成功
```

验证函数严格检查关键实体（entities）和行为（actions），只有**完全匹配**才评为成功，产生严格的二值奖励信号。

**三阶段大规模合成策略**：
- **Phase 1 - 多样化初始化**：用RandomPool覆盖广泛的用户画像和任务类型，确保基础多样性
- **Phase 2 - 试优化**：在小规模下运行自演化循环，快速迭代prompt到较优状态
- **Phase 3 - 在线监控生成**：大规模生成的同时进行实时质量监控，过滤低质量数据

**自演化效果验证**：消融实验显示，移除自演化（w/o. Evolution）后Airline domain的passˆ1从56.0%降至44.0%，证明了自演化prompt优化的关键作用。移除验证Agent（w/o. Validation）降至50.0%，减少prompt set数量从64到4降至42.5%，说明数据质量和多样性同等重要。

##### 3. Verifiable-Reward RL 训练方法

**为什么需要RL？** SFT虽然能大幅提升基线性能（Telecom从27.1%→80.7%），但覆盖的分布受限于生成数据的分布。RL通过与环境交互的试错学习，使模型能够泛化到训练数据未覆盖的场景。

**GRPO (Group Relative Policy Optimization) 训练流程**：

1. **Rollout阶段**：从prompt集合中采样batch个任务，每个任务用当前策略生成G条完整交互轨迹（G=8或16）。agent与user simulator交替交互，直至任务完成或达到最大轮次。

2. **奖励计算**：每条轨迹通过其专属验证函数评估，产生二值outcome reward \(r \in \{0, 1\}\)。

3. **优势计算**：对每个任务组内的G条轨迹，计算 group-relative advantage：
   \[
   \hat{A}^{(g)}_t = \frac{r^{(g)} - \text{mean}(\{r^{(1)}, ..., r^{(G)}\})}{\text{std}(\{r^{(1)}, ..., r^{(G)}\})}
   \]
   同一组内所有token position共享相同的优势值。

4. **Clipping Loss**：token-level的裁剪损失函数：
   \[
   \mathcal{L} = -\mathbb{E}_t\left[\min\left(\frac{\pi_\theta}{\pi_{\theta_{\text{old}}}} \hat{A}_t, \ \text{clip}\left(\frac{\pi_\theta}{\pi_{\theta_{\text{old}}}}, 1-\epsilon, 1+\epsilon\right) \hat{A}_t\right)\right]
   \]

5. **Dynamic Filtering**：在计算优势前，检查每个任务组：如果组内所有G条轨迹的奖励完全相同（全0或全1），则该组的优势全为0，不提供学习信号。将此类任务从当前batch中移除，保留有意义的差异化组。

**User Model 微调**：这是论文的重要发现之一。在使用开源模型（如Qwen3-30B-A3B）直接作为用户模拟器时，模型经常无法正确遵循用户指令，错误地使用工具或忽略agent的响应，导致任务失败。由于奖励只看最终结果，agent的正确行为也会因用户错误而被错误惩罚（reward=0）。通过在EigenData合成数据上对user model进行SFT微调，使其能可靠地执行用户角色，从而保证RL训练信号的准确性。

**User Model 消融实验**：使用base user model时，Telecom domain RL训练后性能从85.4%降至75.6%（反而退化）；而使用微调后的user model则提升至95.6%。两者差距达20个百分点，充分说明user model质量对RL训练至关重要。

**RL算法消融**：
- **Batch Size**：总batch size从256增至512带来显著提升（passˆ1: 64%→70.5%，passˆ4: 40%→52%），而相同总batch size下（256），prompt数×轨迹数（8×32 vs 16×16）差异很小（64% vs 66%），说明**总batch size是主导因素**。
- **Dynamic Filtering**：开启后passˆ1从65.0%→70.5%，passˆ4从40.0%→52.0%，移除无信号组显著提升训练效率和最终性能。

##### 4. 训练曲线与混合训练

论文在附录中展示了训练曲线。Separate training（单域训练）和Mix training（三域混合）均稳定收敛。Mix training在Qwen3-235B-A22B-2507上达到81.3%平均passˆ1，超越了Separate training的各域独立最优平均值。更重要的是，**单模型**在三个域上的passˆ4平均达68.5%，超越Qwen3-Max-Thinking (66.8%) 和 GPT-5 (64.0%)，证明混合训练具有正向的跨域泛化能力。

##### 5. 关键设计洞察

> 💡 **核心创新1：可验证奖励的自动化生成。** EigenData不仅生成对话，更关键的是为每条对话生成一个可执行的Python验证函数。这解决了工具使用RL中长期存在的"奖励信号从哪来"的问题——不需要训练reward model，不需要人工标注，只需运行时执行验证函数即可获得精确的二值奖励。

> 💡 **核心创新2：User Model也需微调。** 多轮交互RL训练中，用户模拟器的质量直接影响奖励信号的可靠性。一个"笨"用户会导致正确agent被错误惩罚，造成训练信号腐败。对user model做SFT是确保RL有效的前提。

> ⚠️ **局限与边界**：验证函数要求"完全匹配"才能得奖励，这可能过于严格——部分正确的轨迹也被判失败，损失了细粒度的学习信号。同时，验证函数依赖于结构化状态表示，在开放式、无结构化的任务中难以自动生成精确的验证函数。

#### 🧪 练习题
```yaml
question: "EigenData数据合成流水线中，哪一步负责生成用于RL奖励信号的验证函数？"
options:
  - "DialogSynthesis - 对话合成阶段"
  - "TrajectoryValidation - 轨迹验证阶段"
  - "ValidationFunction - 验证函数生成阶段"
  - "TaskValidation - 任务验证阶段"
answer: 2
explain: "ValidationFunction是执行层七步流水线的最后一步，专门负责为每条合成对话生成可执行的Python验证函数，该函数比较最终状态与ground-truth以产生RL的outcome reward。"
```
