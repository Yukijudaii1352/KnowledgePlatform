### SayCan: 语言-可供性接地代理 (SayCan)

```yaml
id: saycan
name: SayCan
full_name: 语言-可供性接地代理 (SayCan)
year: '2022.04'
org: Google Robotics
paper_url: https://arxiv.org/abs/2204.01691
category: foundation
parent: —
motivation: 用价值函数约束LLM选可执行技能
```

#### 📝 一句话总结
SayCan 提出将大语言模型（LLM）的语义知识（Say）与预训练技能的可提供性函数（Can）相乘，通过联合概率 \(p(c_{\pi} | i, s, \ell_{\pi}) \propto p(\ell_{\pi} | i) \cdot p(c_{\pi} | s, \ell_{\pi})\) 为机器人提供物理世界接地，使其能够零样本执行长时域、抽象的自然语言指令。

#### 🎯 核心要点
- 提出 SayCan 框架：LLM 提供任务接地（task-grounding），强化学习训练的价值函数提供世界接地（world-grounding），两者联合决定技能选择
- 使用 RL 训练的语言条件价值函数 \(p(c_{\pi} | s, \ell_{\pi})\) 作为可提供性函数，评估技能在当前状态的可行性
- 技能通过 BC-Z（Behavior Cloning from Zero-shot）和 MT-Opt（Multi-Task RL）两种方式训练，其中 MT-Opt 使用稀疏奖励优化
- LLM 以 few-shot prompt 方式工作，通过链式规则将指令分解为技能描述序列
- 在 101 个真实厨房任务上评估，PaLM-SayCan 实现 84% 规划成功率和 74% 执行成功率
- "No VF" 消融实验证明：去除价值函数接地后性能下降近半，验证了物理接地的必要性
- LLM 规模扩展性：模型从 8B→62B→540B 持续提升，且 PaLM 优于 FLAN，首次展示语言模型进步直接转化为机器人性能提升
- 自发涌现 Chain-of-Thought 推理，支持多语言查询和新技能的热插拔式集成

#### 🔬 深入细节
##### 核心框架图

![SayCan 框架示意图](https://saycan-corl.github.io/img/saycan.png)
*图：SayCan 总体框架。LLM（Say）根据指令和历史生成技能描述的条件概率，可提供性函数（Can）评估每个技能在当前环境状态下的可行性，两者相乘得到最终技能排序，选最大值执行。*

> ⚠️ 注意：上述图片链接来自项目官网 say-can.github.io。若无法加载，可访问 [arxiv HTML 版本](https://arxiv.org/html/2204.01691v1) 查看 Figure 1。

##### 算法伪代码

Algorithm 1: SayCan
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Input: 高层指令 i，初始状态 s₀，技能集合 Π 及其语言描述 ℓ_Π
  n = 0, π = ∅
  while ℓ_{π_{n-1}} ≠ "done":
    𝒞 = ∅
    for π ∈ Π 和 ℓ_π ∈ ℓ_Π:
      p_π^LLM = p(ℓ_π | i, ℓ_{π_{n-1}}, ..., ℓ_{π_0})   ▷ LLM 评分
      p_π^affordance = p(c_π | s_n, ℓ_π)                  ▷ 可提供性评分
      𝒞 ← 𝒞 ∪ {(π, p_π^LLM · p_π^affordance)}            ▷ 联合概率
    π_n = argmax_π 𝒞                                       ▷ 选择最优技能
    执行 π_n，观察新状态 s_{n+1}
    n += 1
  return {π₀, π₁, ..., π_{n-1}}                           ▷ 返回技能序列

##### 方法详解

**1. 动机与背景**

传统 LLM 虽能编码丰富的语义知识，但缺乏真实物理世界经验。当被要求完成"我打翻了饮料，能帮我清理吗？"这样的指令时，LLM 可能建议"用吸尘器清理"——这在厨房场景中既不可行（没有吸尘器）也不安全（吸尘器不能吸水）。SayCan 的核心洞见是：用机器人预训练技能的可提供性函数作为"物理过滤器"，约束 LLM 只能选择当前环境下能执行的动作，从而实现接地。

**2. 核心机制：联合概率分解**

SayCan 将技能选择建模为条件概率的乘积：

$$p(c_{\pi} | i, s, \ell_{\pi}) \propto \underbrace{p(\ell_{\pi} | i)}_{\text{Say: LLM任务接地}} \cdot \underbrace{p(c_{\pi} | s, \ell_{\pi})}_{\text{Can: 价值函数世界接地}}$$

- **Say 项** \(p(\ell_{\pi} | i)\)：LLM 根据高层指令 \(i\) 和已执行技能历史，计算每个技能描述 \(\ell_{\pi}\) 的条件概率。实际操作中，通过构造 few-shot prompt 并取 softmax 归一化后的 token 级概率得到。
- **Can 项** \(p(c_{\pi} | s, \ell_{\pi})\)：RL 训练的价值函数预估技能在当前状态 \(s\) 下的成功率。具体地，对技能 \(\pi\) 和语言描述 \(\ell_{\pi}\)，价值函数 \(Q(s, a)\) 通过 Monte-Carlo 回报训练后，经过温度参数 \(\tau\) 的 sigmoid 变换得到：\(p(c_{\pi} | s, \ell_{\pi}) = \sigma(Q(s, a)/\tau)\)。

> 💡 关键：这个分解将"该做什么"（LLM 语义知识）和"能做什么"（机器人能力）解耦，使系统在每一步都同时考虑任务进展和物理可行性。

**3. 技能训练：BC-Z 与 MT-Opt**

论文使用两种方式训练原子技能：

- **BC-Z（Behavior Cloning from Zero-shot）**：在大规模演示数据集上训练条件行为克隆策略。以语言指令为条件，直接预测低维动作（末端位姿、夹爪开合等）。优势是训练稳定，适合有丰富演示数据的技能。
- **MT-Opt（Multi-Task RL）**：在仿真器中使用稀疏奖励进行多任务 RL 训练。通过 hindsight experience replay 和分布式训练，从零开始学习长期行为。MT-Opt 专门用于训练高精度操作技能（如抓取、放置），其 Q 函数直接作为可提供性函数使用。

> 每个技能的语言描述 \(\ell_{\pi}\) 即是训练时使用的自然语言指令，确保 LLM 概率空间与价值函数空间的语义对齐。

**4. 实验设计与关键结果**

在真实厨房场景中评估 101 个任务，划分为 7 个指令家族：

| 指令家族 | 数量 | 描述 | PaLM-SayCan 规划/执行 |
|---------|------|------|---------------------|
| NL Single Primitive | 15 | 单个原语的自然语言指令 | 100% / 100% |
| NL Nouns | 15 | 名词变体测试 | 67% / 47% |
| NL Verbs | 15 | 动词变体测试 | 100% / 93% |
| Structured | 15 | 结构化指令 | 93% / 87% |
| Embodiment | 11 | 体现约束测试 | 64% / 55% |
| Crowd Sourced | 15 | 众包指令 | 87% / 87% |
| Long-Horizon | 15 | 长时域多步任务 | 73% / 47% |

- **消融实验**：去除价值函数（No VF）后性能大幅下降，验证了物理接地的必要性；生成式 LLM 方案（Generative）性能显著低于 SayCan 的判别式评分方案。
- **LLM 规模扩展**：PaLM 540B 的规划成功率 84% vs FLAN 137B 的 70%，首次证明语言模型进步能直接转化为机器人性能提升——"robotics can ride on the coattails of NLP advances"。

**5. 涌现能力**

- **Chain-of-Thought 推理**：对复杂指令（如"带一瓶无水果味的饮料给我"），PaLM-SayCan 自发在技能序列中插入推理步骤（如"我需要一个不含水果的饮料，所以我应该选择可乐"），再转化为技能执行。
- **多语言支持**：用户以西班牙语或法语发出指令，系统同样能正确理解和执行，因为 LLM 的多语言编码能力自然传递到技能选择中。
- **热插拔式技能集成**：添加"拉抽屉"等新技能只需在 prompt 中增加新技能描述和对应的 value function，无需重新训练。

#### 🧪 练习题
```yaml
question: "SayCan框架中，'Can'（可提供性函数）的主要作用是什么？"
options:
  - "生成新的技能描述文本"
  - "评估每个技能在当前物理环境中的可行性，过滤LLM可能产生的不安全或不可行建议"
  - "提高LLM的文本生成速度"
  - "替代人工标注训练数据"
answer: 1
explain: "Can 通过 RL 训练的价值函数计算技能在当前状态下的成功概率，作为物理世界接地信号，过滤掉 LLM 可能建议但机器人无法执行的动作（如没有吸尘器时建议'用吸尘器清理'）。"
```
