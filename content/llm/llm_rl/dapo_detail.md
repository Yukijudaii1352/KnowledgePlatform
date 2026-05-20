### DAPO: Decoupled Clip and Dynamic sAmpling Policy Optimization — 精读笔记

```yaml
id: dapo
name: DAPO
full_name: "解耦适配策略优化 (Decoupled Clip and Dynamic sAmpling Policy Optimization)"
year: 2025
org: ByteDance & Tsinghua AIR
paper_url: "https://arxiv.org/abs/2503.14476"
category: online_rl
parent: grpo
motivation: "解耦裁剪缓解熵崩塌，动态采样过滤零梯度样本"
```

![[img_fig1.png]]
*图1: DAPO在AIME 2024上的主要结果（Qwen2.5-32B基座模型，仅用50%训练步数超越DeepSeek-R1-Zero-Qwen-32B的47%达到50%）*

---

#### 📝 一句话总结
DAPO（Decoupled Clip and Dynamic sAmpling Policy Optimization）是字节跳动Seed联合清华AIR提出的大规模LLM强化学习系统，通过**解耦裁剪+动态采样+Token级损失+超长惩罚塑形**四项核心技术，在Qwen-32B基座模型上仅用50%的训练步数即达到AIME 2024上50%的准确率（超越DeepSeek-R1-Zero-Qwen-32B的47%），并完全开源了算法、代码基础设施和数据集。

---

#### 🎯 核心要点
1. **问题背景**：GRPO在长Chain-of-Thought（long-CoT）RL场景下面临三大挑战——熵坍塌（entropy collapse）、零梯度样本浪费计算、超长序列噪声干扰
2. **四项核心技术**：
   - **Clip-Higher**：解耦上下裁剪界，提升探索能力、防止熵坍塌
   - **Dynamic Sampling**：过滤零梯度样本（全正确/全错误组），按缓冲区批次训练
   - **Token-Level Loss**：从样本级平均改为全局Token级平均，防止长序列中gibberish模式不被充分惩罚
   - **Soft Overlong Punishment**：对超长样本实施长度感知的渐进惩罚，替代直接截断+固定惩罚
3. **关键发现**：RL训练中模型会**自发涌现反思与回溯行为**（原本不存在于基座模型中）
4. **开源贡献**：DAPO-Math-17K数据集（17K整数答案数学题）、基于veRL框架的训练代码

---

#### 🔬 深入细节

##### 1. 算法框架：从GRPO到DAPO

DAPO建立在Group Relative Policy Optimization (GRPO) 的基础上。GRPO的目标函数为：

$$\mathcal{J}_{\text{GRPO}}(\theta)=\mathbb{E}_{(q,a)\sim\mathcal{D},\{o_i\}_{i=1}^G\sim\pi_{\theta_{\text{old}}}(\cdot\mid q)}\left[\frac{1}{\sum_{i=1}^G|o_i|}\sum_{i=1}^G\sum_{t=1}^{|o_i|}\min\left(r_{i,t}(\theta)\hat{A}_{i,t},\ \text{clip}\left(r_{i,t}(\theta),1-\varepsilon,1+\varepsilon\right)\hat{A}_{i,t}\right)\right]$$

其中 $$\hat{A}_{i,t}=\frac{r_i-\mu_{\text{group}}}{\sigma_{\text{group}}}$$ 为组内标准化后的优势估计。DAPO在此基础上引入四项关键改进。

##### 2. Decoupled Clipping (解耦裁剪)

传统PPO/GRPO采用对称裁剪界 $$[1-\varepsilon, 1+\varepsilon]$$，DAPO将其解耦为 $$[1-\varepsilon_{\text{low}}, 1+\varepsilon_{\text{high}}]$$，并设置 $$\varepsilon_{\text{high}} > \varepsilon_{\text{low}}$$（具体：$$\varepsilon_{\text{low}}=0.2, \varepsilon_{\text{high}}=0.28$$）。

**核心动机**：在long-CoT RL中，正确样本的概率上升对模型能力增长至关重要。对称裁剪界会**对称地限制概率上升和下降**，当熵坍塌发生时（模型过早收敛），概率上升的限制加剧了探索不足。Clip-Higher通过放大上限、保持下限收紧，使得模型获得奖励时可以大幅提升对应Token的概率，而被惩罚时则限制幅度，从而：

- 提升模型对正向信号的利用效率
- 保持足够的探索空间
- 稳定提升熵值，避免熵坍塌

![[img_fig2.png]]
![[img_fig3.png]]
*图2&3: Clip-Higher策略对熵和概率的影响。注意模型概率提升的同时熵也保持了健康增长。*

**深度解读**：解耦裁剪的思想与信任域优化中的不对称约束有相似之处。在long-CoT场景中，探索性Token的收益需要被更大胆地强化，而错误Token的惩戒则需要谨慎——因为过度的惩戒会迅速压缩探索空间。这一设计哲学可以类比为：**对成功慷慨奖励，对失败温和惩罚**。实验中观察到，若不使用Clip-Higher，熵会持续下降至接近0（熵坍塌），模型陷入几乎确定性生成，丧失探索能力；而加入Clip-Higher后熵维持缓慢上升的健康态势。

##### 3. Dynamic Sampling (动态采样)

传统GRPO对每个prompt采样G个响应后直接训练。DAPO引入过滤机制：

$$\text{约束条件: } 0 < |\{o_i \mid \text{is\_equivalent}(a, o_i)\}| < G$$

即**排除组内全部正确或全部错误的样本组**——这些组产生零梯度（优势全为零），浪费计算资源。过滤后的有效样本进入动态缓冲区，当缓冲区大小达到N后执行一次训练步骤。

![[img_fig6.png]]
*图6: 动态采样对训练效率的影响——尽管采样实例增多，但收敛所需训练步数反而减少。*

**深度解读**：动态采样本质上是一种**在线课程学习**策略。全正确组意味着模型已掌握该题（无需优化），全错误组意味着模型完全不会（无法区分信号）。通过过滤这两类组，训练数据中的每个batch都包含"有改善空间"的样本——既有正确参考又有错误对比，梯度信号最为丰富。值得注意的是，论文指出由于生成时间的瓶颈主要在于长尾样本（少数超长响应的生成），过滤掉零梯度组并不会显著增加总体训练时间，反而因减少无用训练步数而加速收敛。

##### 4. Token-Level Policy Gradient Loss (Token级策略梯度损失)

原始GRPO采用**样本级平均**再聚合的方式，每个样本权重相等。这导致长响应中的每个Token对总损失的贡献被稀释。DAPO改为**全局Token级平均**：

$$\mathcal{J}_{\text{DAPO}}(\theta)=\mathbb{E}\left[\frac{1}{\sum_{i=1}^G|o_i|}\sum_{i=1}^G\sum_{t=1}^{|o_i|}\min\left(r_{i,t}(\theta)\hat{A}_{i,t},\ \text{clip}\left(r_{i,t}(\theta),1-\varepsilon_{\text{low}},1+\varepsilon_{\text{high}}\right)\hat{A}_{i,t}\right)\right]$$

**关键差异**：归一化因子从隐式的样本数归一化变为显式全局Token归一化 $$\frac{1}{\sum|o_i|}$$。

![[img_fig4a.png]]
![[img_fig4b.png]]
*图4: Token级损失前后的熵(a)和平均响应长度(b)对比。样本级平均导致熵和长度不健康增长。*

**深度解读**：这一修改解决了两个问题。其一，**对高质量长样本**：Token级平均确保其中每个有效推理步骤都获得充分的学习信号，而不是被长度"稀释"；其二，**对低质量长样本**（包含gibberish、重复词等）：Token级平均能有效惩罚这些不良模式——在样本级平均下，即使某个长响应包含大段重复内容，只要结尾"碰巧"正确，其整体损失仍然较低，模型难以学到区分。这一简单的修改对训练稳定性和健康长度增长产生了深远影响。

##### 5. Soft Overlong Punishment (软超长惩罚)

传统方案对超长样本直接截断并赋予固定惩罚（如reward=-1）。DAPO提出渐进惩罚机制：

$$R_{\text{length}}(y)=\begin{cases}0,&|y|\leq L_{\text{max}}-L_{\text{cache}}\\
\frac{(L_{\text{max}}-L_{\text{cache}})-|y|}{L_{\text{cache}}},&L_{\text{max}}-L_{\text{cache}}<|y|\leq L_{\text{max}}\\
-1,&L_{\text{max}}<|y|\end{cases}$$

其中 $$L_{\text{max}}=16384$$ tokens，$$L_{\text{cache}}=4096$$ tokens。在软惩罚区间内，响应越长惩罚越重；超过 $$L_{\text{max}}$$ 后截断并赋-1。

![[img_fig5a.png]]
![[img_fig5b.png]]
*图5: 超长惩罚塑形前后的AIME精度(a)和熵(b)对比。*

**深度解读**：硬截断+固定惩罚的问题在于**信号混淆**——一个推理过程正确但恰好较长的响应与一个充满gibberish的响应可能收到相同的惩罚。这使得模型无法区分"好但长"和"差且长"。软惩罚通过提供连续的长度信号，使模型能够学习到"稍长可以，过长不好"的偏好。此外，配合Overlong Filtering（直接mask截断样本的loss），避免截断处不完整的Token对梯度产生噪声干扰。两者结合大幅提升了训练稳定性。

---

##### 完整算法伪代码（Algorithm 1）

```
Algorithm 1: DAPO - Decoupled Clip and Dynamic sAmpling Policy Optimization

Input: 初始策略 pi_theta, 奖励模型 R, 任务prompts D, 超参数 eps_low, eps_high

1: for step = 1,...,M do
2:   从 D 中采样batch D_b
3:   更新旧策略 pi_theta_old <- pi_theta
4:   对每个 q in D_b，采样 G 个输出 {o_i} ~ pi_theta_old(·|q)
5:   对每个 o_i 计算奖励 {r_i}（规则奖励 + 软超长惩罚 R_length）
6:   过滤掉 is_equivalent 全组相同的结果，加入动态采样缓冲区
7:   if 缓冲区大小 n_b < N: continue
8:   对缓冲区中每个 o_i 的每个token t 计算优势 A_hat_{i,t}
9:   for iteration = 1,...,mu do            # 内层策略更新
10:    通过最大化 DAPO目标函数更新 pi_theta
       (Token级损失 + 解耦裁剪 + 超长过滤Mask)

Output: pi_theta
```

---

##### 6. 训练细节与实验结果

| 配置项 | 值 |
|--------|-----|
| 基座模型 | Qwen2.5-32B（预训练模型，无SFT） |
| 优化器 | AdamW, lr=1e-6（常数，20步线性warmup） |
| 每prompt采样数 G | 16 |
| Prompt batch size | 512 |
| Mini-batch size | 512（每rollout步16次梯度更新） |
| 最大生成长度 | 20,480 tokens（L_max=16384 + L_cache=4096） |
| eps_low, eps_high | 0.2, 0.28 |
| 训练框架 | veRL |
| 数据集 | DAPO-Math-17K（17K整数答案数学题） |

**消融实验结果（AIME 2024 avg@32）**：

| 方案 | AIME24 准确率 |
|------|:---:|
| DeepSeek-R1-Zero-Qwen-32B | 47% |
| Naive GRPO | 30% |
| + Overlong Filtering | 36% (+6) |
| + Clip-Higher | 38% (+2) |
| + Soft Overlong Punishment | 41% (+3) |
| + Token-level Loss | 42% (+1) |
| + Dynamic Sampling (**完整DAPO**) | **50%** (+8) |

**深度解读**：消融实验揭示了各技术的贡献模式。Overlong Filtering贡献最大(+6%)，说明截断噪声是影响训练稳定性的首要因素。Dynamic Sampling虽然精度提升最显著(+8%)，但这是叠加了所有前序技术后的增量——它更多是"效率催化"角色，使其他技术的效果更充分发挥。Token-level Loss单独提升最小(+1%)，但论文强调其核心价值在于**稳定训练**和**健康长度控制**，而非直接精度增益。这种"隐性贡献"在复杂RL系统中十分常见。

##### 7. RL训练中推理能力的自发涌现

![[img_fig7a.png]]
![[img_fig7b.png]]
![[img_fig7c.png]]
![[img_fig7d.png]]
*图7: 训练动态监控指标——响应长度(a)、奖励分数(b)、生成熵(c)、平均概率(d)*

论文中最具启发性的观察是**反思与回溯行为的自发涌现**（Table 2）：
- 训练初期模型几乎不表现出检查或反思前序推理步骤的行为
- 随着RL训练推进，模型开始出现"However, wait a moment, let's rethink..."等明显的反思模式
- 这表明RL不仅能强化已有行为，**还能催生出基座模型中不存在的新推理模式**

**深度解读**：这一发现对理解RL在LLM推理能力形成中的角色至关重要。与传统观点（RL只是"挑选"已有能力）不同，DAPO的实验表明RL在long-CoT场景中扮演的是**能力孵化器**角色——通过奖励信号引导模型在广阔的生成空间中探索，逐步发现并强化有效的推理策略。反思行为的涌现尤其值得注意：它不是在SFT中通过模仿人类反思数据学到的，而是模型在RL过程中"自主发现"的元认知策略。这暗示着scaling RL可能带来比scaling SFT更本质的能力突破。

---

##### 8. 训练动态监控

论文强调long-CoT RL是一项复杂的系统工程，四项关键指标需持续监控：

1. **响应长度**（图7a）：通常随训练上升，但会出现平台期甚至下降，需配合验证精度判断是否恶化
2. **训练奖励**（图7b）：稳定上升，但与验证精度相关性弱——暗示训练集过拟合风险
3. **生成熵**（图7c）：需保持在合理区间（过低→探索不足，过高→gibberish/repetition）。Clip-Higher后熵呈缓慢上升趋势，有利于性能提升
4. **生成概率均值**（图7d）：与熵形成互补信号

---

#### 🧪 练习题

1. **解耦裁剪分析**：为什么在long-CoT RL中需要对上下裁剪界采用不对称设置（eps_high > eps_low）？如果反过来设置（eps_low > eps_high）会有什么后果？试着从概率比r_{i,t}(theta)的动态范围角度分析。

2. **动态采样的梯度特性**：证明在GRPO的组内优势归一化下，若组内所有响应的奖励相同（全正确或全错误），所有Token的优势A_hat_{i,t}均为零，进而梯度为零。思考这种零梯度过滤是否可能排除有价值的"确定性信号"？

3. **Token级损失的数学推导**：从原始的GRPO样本级平均损失出发，推导Token级平均损失的梯度表达式，分析长序列中每个Token对参数更新的贡献比例变化。

4. **软惩罚设计实验**：假设你要验证Soft Overlong Punishment中缓存区间长度L_cache的影响，设计一组对比实验（包括L_cache=0, 2048, 4096, 8192）并预测各设置下的训练表现差异及原因。

---

*论文: Yu et al., "DAPO: An Open-Source LLM Reinforcement Learning System at Scale", arXiv:2503.14476, 2025.*