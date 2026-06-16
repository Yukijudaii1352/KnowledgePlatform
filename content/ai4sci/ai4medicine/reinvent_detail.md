### REINVENT — 强化学习分子生成 (REINVENT)

```yaml
id: reinvent
name: REINVENT
full_name: 强化学习分子生成 (REINVENT)
year: '2017'
org: AstraZeneca
paper_url: https://jcheminf.biomedcentral.com/articles/10.1186/s13321-017-0235-x
category: generation
parent: —
motivation: RNN结合强化学习优化分子性质
```

#### 📝 一句话总结

REINVENT 将预训练 SMILES RNN 作为 Prior，再用基于目标打分函数的策略梯度微调 Agent，解决了纯最大似然分子生成无法直接按药物性质优化的问题。它的关键不是单纯奖励高分分子，而是用 Prior likelihood 锚定化学合理性，用 augmented likelihood 将目标性质注入生成分布。

#### 🎯 核心要点

- **Prior-Agent 双网络**：Prior 在 ChEMBL 的 RDKit canonical SMILES 上最大似然预训练，Agent 复制 Prior 参数后通过强化学习微调
- **序列生成建模为 episodic RL**：一个完整 SMILES 从 GO 到 EOS 视为一条 episode，最终分子打分 \(S(A)\) 作为序列级反馈
- **Augmented likelihood 目标**：\(\log P(A)_U = \log P(A)_{Prior} + \sigma S(A)\)，把先验化学分布和用户定义目标函数合成目标策略
- **平方差策略损失**：最小化 Agent likelihood 与 augmented likelihood 的距离，避免普通 REINFORCE 只追逐奖励导致的简单无意义结构
- **连续/负奖励兼容**：打分函数 \(S(A)\in[-1,1]\) 可来自规则、相似度、QSAR/SVM 活性模型等，不限于正样本最大似然微调
- **三个示范任务**：去除硫原子、生成 Celecoxib 类似物、生成预测为 DRD2 活性的分子
- **实验性结论**：Prior 本身生成约 94% 有效 SMILES；DRD2 任务中 Agent 生成样本超过 95% 被模型预测为活性
- **主要局限**：仍依赖 SMILES 语法学习和外部打分函数质量，过强奖励可能牺牲多样性或引入打分模型漏洞

#### 🔬 深入细节

##### 核心示意图

![REINVENT Agent 训练流程](https://media.springernature.com/lw685/springer-static/image/art%3A10.1186%2Fs13321-017-0235-x/MediaObjects/13321_2017_235_Fig4_HTML.gif)
*图：REINVENT 的 Prior-Agent 流程。Prior 从 ChEMBL 学到 SMILES 语法和药物样分布；Agent 从 Prior 初始化，采样 SMILES 后由 scoring function 打分，并用 augmented likelihood 更新生成策略。来源为 Journal of Cheminformatics 原文 Figure 4。*

##### 算法伪代码

```python
# REINVENT 强化学习分子生成伪代码
prior = train_rnn_by_mle(chembl_smiles)   # 3-layer GRU/LSTM style RNN, 学习 SMILES 分布
agent = copy(prior)                       # Agent 初始策略等于 Prior

for step in range(num_rl_steps):
    smiles_batch, logp_agent = agent.sample(batch_size=128, return_logp=True)

    scores = []
    logp_prior = []
    for smiles in smiles_batch:
        mol = rdkit_parse(smiles)
        score = scoring_function(mol) if mol is not None else invalid_score
        scores.append(score)              # S(A) in [-1, 1]
        logp_prior.append(prior.log_likelihood(smiles))

    # 目标 likelihood：Prior 负责保持化学合理性，score 负责推动目标性质
    augmented = logp_prior + sigma * scores

    # Agent 学习接近 augmented likelihood
    loss = mean((augmented - logp_agent) ** 2)
    agent.optimizer.zero_grad()
    loss.backward()
    clip_gradients(agent, min_value=-3, max_value=3)
    agent.optimizer.step()

return agent
```

##### 动机与背景

REINVENT 之前的神经分子生成常见做法是：先训练 RNN 生成类似训练集的 SMILES，再用最大似然在某个小规模活性集合上微调。这个流程能模仿已知化学空间，但对药物发现来说仍有两个硬伤：第一，目标性质通常由连续打分函数给出，例如相似度、活性预测概率、合成可及性或多目标组合，不一定有成批的正样本；第二，直接追逐奖励的 RL 容易学到“投机”字符串，例如很短、简单、但在奖励函数下得分高的分子，导致模型遗忘 Prior 学到的化学语法和药物样分布。

REINVENT 的设计把分子生成写成一个部分可观测的序列决策问题。状态是当前 RNN hidden state 和已生成前缀，动作是下一个 SMILES token，episode 在 EOS 结束。由于分子性质只有完整 SMILES 解析后才有意义，奖励不逐 token 给出，而是在序列级别计算。这样做允许任何可调用的外部函数成为 \(S(A)\)，例如“是否含硫”“与 Celecoxib 的 Tanimoto 相似度”“DRD2 SVM 活性概率”。

##### Prior、Agent 与 augmented likelihood

Prior 是普通语言模型式的 SMILES RNN。给定 token 序列 \(A=(a_1,\dots,a_T)\)，它定义序列概率：

$$
P(A)=\prod_{t=1}^{T}\pi(a_t\mid s_t)
$$

预训练目标是最大化训练 SMILES 的下一 token likelihood，等价于最小化负对数似然：

$$
J(\Theta)=-\sum_{t=1}^{T}\log P(x^t\mid x^{t-1},\ldots,x^1)
$$

Agent 与 Prior 架构相同，并从 Prior 参数初始化。强化学习阶段的核心公式是 augmented likelihood：

$$
\log P(A)_U = \log P(A)_{Prior} + \sigma S(A)
$$

其中 \(S(A)\in[-1,1]\) 是用户定义的分子打分，\(\sigma\) 控制目标性质相对于 Prior 的强度。如果某个分子打分高，它的目标 log-likelihood 会被抬高；如果打分低，目标 log-likelihood 会被压低。Prior 项则像一个化学语言约束，防止 Agent 远离 ChEMBL 风格的合理分子。

Agent 最大化的 return 被定义为 Agent likelihood 与 augmented likelihood 的一致性：

$$
G(A)=-\left[\log P(A)_U-\log P(A)_A\right]^2
$$

因此优化时最小化：

$$
J(\Theta)=\left[\log P(A)_U-\log P(A)_A\right]^2
$$

> 💡 关键：REINVENT 不是把 \(S(A)\) 直接当作 REINFORCE 奖励，而是构造一个“期望的序列概率”。这使高分分子更可能出现，同时仍保留 Prior 对 SMILES 语法、分子尺寸和常见化学结构的约束。

##### 训练和推理流程

训练时，每一轮由当前 Agent on-policy 采样一批 SMILES。每条序列都会被 Agent 计算 \(\log P(A)_A\)，也会被冻结的 Prior 计算 \(\log P(A)_{Prior}\)。随后 RDKit 或外部预测器解析分子并给出 \(S(A)\)。这三项合成损失后反向传播，只更新 Agent，不更新 Prior 和 scoring function。

推理时不再需要梯度，只需用训练后的 Agent 自回归采样。由于 Agent 的策略已经偏向 augmented likelihood，高分目标会在采样分布中富集。例如在相似度任务中，scoring function 可以写成：

$$
S(A)=-1+2\cdot\frac{\min(J_{i,j}, k)}{k}
$$

这里 \(J_{i,j}\) 是生成分子与查询分子的指纹 Jaccard/Tanimoto 相似度，\(k\) 是饱和阈值。超过阈值后不再额外奖励，避免模型只复制查询分子。

在 DRD2 示例中，作者从 ExCAPE-DB 构建活性/非活性数据，用 ECFP6 指纹和高斯核 SVM 训练活性分类器，再把分类器预测转成 Agent 的目标打分。这个设置展示了 REINVENT 的通用性：只要目标函数能对完整分子返回标量分数，就可以接入同一训练循环。

##### 与传统微调和普通 RL 的区别

最大似然微调需要一个“期望生成”的样本集合，目标是提高这些样本的 likelihood；REINVENT 不需要先有目标分子集合，只需要 scoring function。普通 REINFORCE 直接最大化 \(S(A)\)，容易把概率质量集中到极少数奖励漏洞上；REINVENT 的 Prior 项持续惩罚那些在化学训练分布下极不可能的序列。与基于规则的 de novo 设计相比，它不需要人工枚举反应或片段替换规则，而是从 SMILES 分布中学习可生成空间，再用 RL 改变采样偏好。

##### 局限性与后续影响

REINVENT 的有效性强依赖三个因素：SMILES RNN 是否学到足够好的化学语言模型、scoring function 是否真实反映药物设计目标、\(\sigma\) 是否平衡探索和约束。若 \(\sigma\) 太小，Agent 变化有限；若太大，模型会牺牲多样性并过拟合打分器。尽管如此，Prior + Agent + scoring function 的接口非常实用，后来许多分子生成系统沿用了这种“预训练生成模型 + 目标驱动微调”的范式。

#### 🧪 练习题

```yaml
question: "REINVENT 中 augmented likelihood 的主要作用是什么？"
options:
  - "把 SMILES 转换成分子图，避免所有语法错误"
  - "用 Prior likelihood 锚定化学合理性，同时用打分函数提高目标分子的生成概率"
  - "用判别器区分真实分子和生成分子"
  - "直接最大化分子量，使生成分子更复杂"
answer: 1
explain: "Augmented likelihood 等于 Prior log-likelihood 加上 sigma 倍目标分数，既保留预训练分布，又把策略推向高分分子。"
```
