### REINVENT 4 — 面向药物分子设计的强化学习生成框架

```yaml
id: reinvent4
name: REINVENT 4
full_name: 强化学习分子设计 (REINVENT 4)
year: '2024'
org: AstraZeneca
paper_url: https://link.springer.com/article/10.1186/s13321-024-00812-5
category: generation
parent: jt_vae
motivation: 集成Transformer和课程学习的多目标优化
```

#### 📝 一句话总结

REINVENT 4 将 SMILES 序列生成器、迁移学习、强化学习和课程式 staged learning 统一到一个开源分子设计框架中，用固定 prior 约束的增强似然目标把多目标评分函数转化为可训练的分子生成策略。

#### 🎯 核心要点

- **统一生成框架**：在同一套命令行与配置系统中支持 sampling、scoring、transfer learning 和 staged learning
- **多类序列生成器**：覆盖 Reinvent de novo 生成、LibInvent scaffold/R-group 装饰、LinkInvent linker 设计与 scaffold hopping、Mol2Mol Transformer 分子优化
- **自回归 SMILES agent**：无条件模型学习 \(P(T)\)，条件模型学习 \(P(T\mid S)\)，用 teacher forcing 最小化 token 级 NLL
- **DAP 强化学习目标**：用 \(\log P_{\text{aug}}(T)=\log P_{\text{prior}}(T)+\sigma S(T)\) 把评分函数并入似然，训练 agent 靠近增强似然
- **固定 prior 正则化**：prior 不参与 RL 更新，只作为化学合理性锚点，限制 agent 偏离药物样分布
- **课程学习/staged learning**：把多个 RL stage 串联起来，逐步引入更严格或更昂贵的评分项，例如先过滤不良化学结构再启用 docking
- **可扩展 scoring subsystem**：支持 RDKit 理化性质、QED、SA score、DockStream docking、QSAR/Qptuna、ChemProp、ROCS、REST/external process 等组件
- **多目标聚合与变换**：各 endpoint 分数可先映射到 \([0,1]\)，再按权重做算术均值或几何均值聚合为标量 reward
- **多样性与经验回放**：scaffold bucket diversity filter 抑制重复骨架，inception memory 把高分历史分子加入 loss 加速学习

#### 🔬 深入细节

##### 框架图与可访问来源

![REINVENT 4 信息流与生成器总览](https://media.springernature.com/lw685/springer-static/image/art%3A10.1186%2Fs13321-024-00812-5/MediaObjects/13321_2024_812_Fig3_HTML.png)
*图：REINVENT 4 的 run modes、generator model 与 scoring subsystem 信息流。*

![REINVENT 4 prior、TL 与 staged RL 的行为示意](https://media.springernature.com/lw685/springer-static/image/art%3A10.1186%2Fs13321-024-00812-5/MediaObjects/13321_2024_812_Fig1_HTML.png)
*图：prior 学习广泛药物样空间，TL 偏向局部区域，staged/RL 进一步集中到高分区域。*

可访问来源：论文 HTML https://link.springer.com/article/10.1186/s13321-024-00812-5；官方代码 https://github.com/MolecularAI/REINVENT4。论文图像由 Springer Nature 页面公开提供。

##### 算法伪代码

```python
# REINVENT 4 staged learning with DAP loss
def staged_learning(prior, agent, stages, sigma):
    # prior is fixed; agent is trainable
    for stage in stages:
        scoring_profile = stage.scoring_components
        diversity_filter = stage.optional_diversity_filter
        replay_memory = stage.optional_inception_memory

        for epoch in range(stage.max_steps):
            smiles = agent.sample(batch_size=stage.batch_size)
            smiles = rdkit_canonicalize(smiles)

            raw_scores = []
            for smi in smiles:
                if violates_global_filter(smi):
                    raw_scores.append(0.0)
                    continue
                component_scores = [
                    transform(component(smi)) * weight
                    for component, transform, weight in scoring_profile
                ]
                total_score = aggregate(component_scores)  # arithmetic or geometric mean
                total_score = diversity_filter.penalize(smi, total_score)
                raw_scores.append(total_score)

            logp_prior = prior.log_prob(smiles).detach()
            logp_agent = agent.log_prob(smiles)
            logp_aug = logp_prior + sigma * raw_scores
            batch_loss = mean((logp_aug - logp_agent) ** 2)

            memory_loss = 0.0
            if replay_memory is not None:
                top_smiles = replay_memory.sample_high_scoring()
                memory_loss = dap_loss(top_smiles, prior, agent, sigma, scoring_profile)
                replay_memory.update(smiles, raw_scores)

            loss = batch_loss + memory_loss
            agent.optimizer.zero_grad()
            loss.backward()
            agent.optimizer.step()

            write_epoch_csv(smiles, logp_prior, logp_agent, logp_aug, raw_scores)
            if mean(raw_scores) >= stage.target_score:
                save_checkpoint(agent)
                break
```

##### 序列生成器：把分子看成 token 序列

REINVENT 4 的底层对象是 agent，即一个对 SMILES token 序列建模的神经网络。对 de novo 生成器，长度为 \(\ell\) 的 token 序列 \(T=(t_1,\ldots,t_\ell)\) 的概率写作：

$$
P(T)=\prod_{i=1}^{\ell}P(t_i\mid t_{i-1},t_{i-2},\ldots,t_1)
$$

对有条件生成器，例如给定 scaffold、warheads 或输入分子 \(S\) 的 generator，则学习：

$$
P(T\mid S)=\prod_{i=1}^{\ell}P(t_i\mid t_{i-1},t_{i-2},\ldots,t_1,S)
$$

预训练 prior 时使用 teacher forcing，最小化负对数似然：

$$
NLL(T)=-\log P(T)=-\sum_{i=1}^{\ell}\log P(t_i\mid t_{<i})
$$

这一步的作用不是直接优化项目目标，而是让模型掌握 SMILES 语法和训练集中的药物样分布。之后的 TL 和 RL 都是在这个 prior 的基础上偏置生成分布，而不是从随机策略开始搜索庞大的化学空间。

##### DAP 强化学习目标

REINVENT 4 的核心强化学习策略是 DAP（Difference between Augmented and Posterior）。对每个生成分子，scoring subsystem 给出标量分数 \(S(T)\in[0,1]\)。然后定义增强似然：

$$
\log P_{\text{aug}}(T)=\log P_{\text{prior}}(T)+\sigma S(T)
$$

其中 \(\sigma\ge 0\) 控制 reward 对似然的拉动强度。训练 agent 时最小化：

$$
\mathcal{L}(T)=\left(\log P_{\text{aug}}(T)-\log P_{\text{agent}}(T)\right)^2
$$

直觉上，prior 给每个 SMILES 一个“化学合理性基准”，高分分子的目标似然在这个基准上被抬高，agent 因而学会更频繁地采样它们。固定 prior 的设计很关键：如果只有 reward，模型可能快速坍缩到不可合成、重复或语法边缘的分子；如果只做 TL，模型只能贴近给定小数据集。DAP 在二者之间建立了可调的偏置。

> 💡 关键：DAP 并不是让低分分子显式变得“不可能”，而是主要提高高分分子的相对采样概率；因此多样性过滤器、inception memory 和评分函数设计会显著影响探索行为。

##### Staged learning：把多目标优化拆成课程

药物设计评分函数通常既多目标又昂贵，例如需要同时考虑活性预测、QED、毒性、合成可行性、相似性约束和 docking。REINVENT 4 将 curriculum learning 实现为多 stage 的 RL：每个 stage 可以有自己的 scoring profile、终止阈值、步数、diversity filter 和其他参数。

常见策略是先用便宜规则塑形，例如 custom alerts、Lipinski/QED、分子量、SA score；当 agent 已经稳定生成合理分子后，再逐步加入 QSAR、shape similarity 或 docking。这样做的机制优势是：早期 batch 不会被昂贵 scorer 大量浪费在显然无效的分子上，后期又可以把更接近真实项目目标的评价信号注入同一个 DAP 目标。

每个 stage 会写出包含 SMILES、prior NLL、agent NLL、augmented likelihood、total score 和各组件分数的 CSV。stage 达到最大平均分阈值时进入下一阶段；如果达到最大步数仍不达标，通常意味着该 stage 的评分目标或模型能力需要人工检查。

##### Scoring subsystem 与多目标聚合

REINVENT 4 的 scoring subsystem 把不同来源的模型或规则统一成 endpoint 分数。每个 endpoint 通常先经过一个 transformation，把原始数值映射到 \([0,1]\)，例如 docking 能量越低越好、QED 越高越好、分子量落在窗口内最好。之后用权重聚合为总分：

$$
S_{\text{arith}}(T)=\frac{\sum_k w_k s_k(T)}{\sum_k w_k}
$$

或几何均值：

$$
S_{\text{geom}}(T)=\prod_k s_k(T)^{w_k/\sum_j w_j}
$$

几何均值更像“短板约束”：任一关键分数接近 0 时总分会显著下降；算术均值则允许高分组件补偿低分组件。REINVENT 4 还会对 canonical SMILES 做组件级缓存，避免重复计算昂贵评分。

##### 多样性过滤与 Inception

RL 分子生成很容易出现“同一高分骨架反复被采样”的模式。REINVENT 4 的 diversity filter 用 scaffold bucket 记录已出现的 Bemis-Murcko 或拓扑 scaffold；当某个 bucket 满了，后续同 scaffold 分子会被置零分。它还维护全局 canonical SMILES 记忆，重复分子也会被惩罚。

Inception memory 则是反方向的加速机制：把历史最高分分子加入 loss，让每轮更新不仅学习当前 batch，也复习已发现的好分子。这相当于经验回放，能提高样本效率；但如果 memory 太大或采样太多，训练会被少数历史分子主导，降低探索能力。

##### 与早期分子生成方法的区别

| 维度 | JT-VAE / 图生成模型 | 早期 REINVENT | REINVENT 4 |
|------|--------------------|---------------|------------|
| 分子表示 | 子结构树或图 | 主要是 SMILES RNN | SMILES RNN + Transformer 条件生成器 |
| 优化方式 | latent search 或目标函数搜索 | RL / TL 分散实现 | TL、RL、CL、scoring 统一框架 |
| 任务类型 | de novo 或局部优化为主 | de novo、scaffold/linker 等分散代码 | de novo、R-group、linker、scaffold hopping、Mol2Mol |
| 多目标评分 | 需要单独工程实现 | 支持但扩展成本较高 | 插件式 scoring subsystem + TOML/JSON 配置 |
| 项目流程 | 研究原型居多 | 工业实践工具 | 开源参考实现，面向教育、生产和复现 |

#### 🧪 练习题

```yaml
question: "REINVENT 4 中 DAP 损失的主要作用是什么？"
options:
  - "直接最小化分子坐标的扩散去噪误差"
  - "让 agent 的序列似然靠近由 fixed prior 和评分函数共同定义的增强似然"
  - "用图神经网络预测所有化学键类型"
  - "只通过随机筛选保留最高 QED 分子的 SMILES"
answer: 1
explain: "DAP 定义 logP_aug = logP_prior + sigma*S(T)，再最小化 logP_aug 与 logP_agent 的平方差；fixed prior 提供化学合理性约束，评分函数提供项目目标方向。"
```
