### GCG

```yaml
id: gcg
name: GCG
full_name: 贪心坐标梯度攻击 (Greedy Coordinate Gradient)
year: 2023
org: CMU
arxiv: "2307.15043"
paper_url: "https://arxiv.org/abs/2307.15043"
category: jailbreak
parent: —
motivation: 通过基于梯度的离散优化自动生成通用对抗后缀，突破对齐 LLM 的安全防护
```

#### 📝 一句话总结

GCG 提出了一种基于梯度的离散 token 搜索方法（贪心坐标梯度），通过优化对抗后缀使对齐 LLM 以肯定性开头（如 "Sure, here is"）回复有害指令，并证明该后缀可跨 prompt、跨模型迁移，成功攻击 GPT-4、Claude、PaLM-2 等闭源模型。

#### 🎯 核心要点

- **攻击目标**：最大化模型生成肯定性回复前缀（"Sure, here is [harmful content]"）的概率，将对抗攻击转化为目标序列的负对数似然最小化问题
- **GCG 优化器（Algorithm 1）**：基于 token embedding 梯度选取 top-k 候选替换，对所有位置同时搜索，每步采样 B 个单 token 替换候选并选择 loss 最低者——相比 AutoPrompt 的逐位置搜索效率大幅提升
- **通用攻击（Algorithm 2）**：将损失函数扩展为多 prompt 多模型的聚合梯度，渐进式增加优化目标数量，生成单一后缀即可攻击多种有害行为
- **迁移攻击**：在开源模型（Vicuna、Guanaco）上优化的后缀可直接迁移攻击 GPT-3.5（86.6%）、GPT-4（46.9%）、Claude-1（47.9%）、PaLM-2（66.0%）
- **AdvBench 基准**：构建包含 500 条有害行为和 500 条有害字符串的评估数据集
- **关键发现**：对齐训练（RLHF/Constitutional AI）并不能提供对抗鲁棒性，安全对齐与对抗鲁棒性之间存在根本差距

#### 🔬 深入细节

![GCG 攻击总览](https://arxiv.org/html/2307.15043v2/x1.png)
*图 1：GCG 攻击示意。在用户有害指令后拼接一段对抗后缀（adversarial suffix），使对齐 LLM 绕过安全防护生成有害内容。该后缀可迁移至 ChatGPT、Claude、Bard 等闭源模型。*

##### 问题形式化

给定一个有害用户指令 \(x_{1:n}\)，攻击者的目标是找到一段对抗后缀 \(p_{1:l}\)，使模型在输入 \(x_{1:n} \| p_{1:l}\) 后以特定的肯定性目标序列 \(x^*_{n+1:n+H}\)（如 "Sure, here is a tutorial for making a bomb"）开头回复。优化目标为最小化目标序列的负对数似然：

$$\mathcal{L}(p_{1:l}) = -\log p(x^*_{n+1:n+H} \mid x_{1:n} \| p_{1:l})$$

> 💡 **关键洞察**：作者发现，只要模型以肯定性前缀开头回复（而非拒绝），后续生成几乎必然会产生有害内容。这一观察将复杂的"让模型说有害内容"问题简化为"让模型说 Sure"的可优化目标。

##### GCG 搜索算法（Algorithm 1）

```python
# GCG: Greedy Coordinate Gradient 核心伪代码
def gcg_attack(prompt, suffix, target, model, T=500, k=256, B=512):
    """
    prompt: 有害指令 x_{1:n}
    suffix: 对抗后缀 p_{1:l}（随机初始化）
    target: 肯定性目标 "Sure, here is..."
    """
    for t in range(T):
        # Step 1: 计算每个后缀位置的 token 梯度
        # 对 one-hot token embedding 求梯度，选 top-k 最有希望的替换
        for i in range(len(suffix)):
            gradients = compute_gradient(loss, e_{p_i})  # 对第 i 个 token 的 embedding 求梯度
            X_i = top_k(-gradients, k)  # 梯度负方向 = loss 下降最快的 token

        # Step 2: 采样 B 个候选替换
        candidates = []
        for b in range(B):
            p_tilde = copy(suffix)
            i = random_position()              # 随机选一个位置
            p_tilde[i] = random_choice(X_i)    # 从该位置的 top-k 中随机选一个 token
            candidates.append(p_tilde)

        # Step 3: 评估所有候选，选最优
        losses = [compute_loss(prompt, c, target, model) for c in candidates]
        suffix = candidates[argmin(losses)]

    return suffix
```

> ⚠️ **与 AutoPrompt 的关键区别**：AutoPrompt 每步只搜索一个固定位置的替换；GCG 每步对**所有位置**同时计算梯度并采样候选，虽然每次仍只替换一个 token，但搜索空间覆盖更广，实验表明这一改动带来了巨大的性能提升。

##### 通用攻击优化（Algorithm 2）

单 prompt 攻击虽然有效，但每条有害指令都需要独立优化。Algorithm 2 将目标扩展为多 prompt 多模型的联合优化：

$$p^* = \arg\min_{p_{1:l}} \sum_{j=1}^{m} \mathcal{L}_j(x^{(j)}_{1:n} \| p_{1:l})$$

其中 \(\mathcal{L}_j\) 是第 \(j\) 个 prompt-模型对的损失。关键设计包括：

1. **梯度聚合**：对所有 prompt 和模型的梯度求和，选取聚合 top-k 候选：
   $$\mathcal{X}_i = \text{Top-}k\left(-\sum_{1 \leq j \leq m_c} \nabla_{e_{p_i}} \mathcal{L}_j\right)$$

2. **渐进式扩展**：不一次优化所有 prompt，而是从 \(m_c=1\) 开始，当当前 prompt 集合全部攻击成功后才增加 \(m_c\)，逐步扩展优化目标数量。这避免了一开始目标过多导致优化困难。

3. **多模型联合**：损失函数可同时包含多个模型（如 Vicuna-7B 和 Vicuna-13B），使优化出的后缀具有跨模型迁移能力。

##### 迁移攻击机制

![迁移攻击成功率](https://arxiv.org/html/2307.15043v2/x3.png)
*图 3：GCG 对抗后缀在不同 LLM 上的迁移攻击成功率（ASR）。在 Vicuna/Guanaco 上优化的后缀可迁移至架构、词表、参数量和训练方法完全不同的模型。*

迁移攻击的核心发现：

- **开源→闭源迁移**：在 Vicuna-7B/13B + Guanaco-7B/13B 上联合优化的后缀，可直接拼接到发送给 GPT-3.5/GPT-4/Claude 的 prompt 中
- **集成策略（Ensemble）**：生成多个对抗后缀，只要其中任一成功即算攻击成功，可将 GPT-3.5 的 ASR 从 47.4% 提升至 86.6%
- **跨架构有效**：即使目标模型的词表、架构（decoder-only vs encoder-decoder）、参数量完全不同，对抗后缀仍然有效

##### 实验结果

![优化器性能对比](https://arxiv.org/html/2307.15043v2/x2.png)
*图 2：不同优化器在 Vicuna-7B 上诱导有害字符串的性能对比。GCG 在 loss 和 ASR 上均大幅领先。*

**单模型攻击（Table 1）**：

| 方法 | 有害字符串 ASR (Vicuna) | 有害字符串 ASR (LLaMA-2) | 有害行为 ASR (Vicuna) | 通用攻击测试 ASR (Vicuna) |
|------|----------------------|------------------------|---------------------|------------------------|
| PEZ | 2% | 1% | 22% | 3% |
| GBDA | 1% | 0% | 36% | 5% |
| AutoPrompt | 24% | 3% | 57% | 36% |
| **GCG** | **88%** | **55%** | **57%** | **84%** |

**迁移攻击（Table 2）**：

| 方法 | GPT-3.5 | GPT-4 | Claude-1 | Claude-2 | PaLM-2 |
|------|---------|-------|----------|----------|--------|
| 仅有害行为 | 1.8% | 8.0% | 0.0% | 0.0% | 0.0% |
| + "Sure, here's" | 5.7% | 13.1% | 0.0% | 0.0% | 0.0% |
| + GCG (Vicuna) | 34.3% | 34.5% | 2.6% | 0.0% | 31.7% |
| + GCG (Vicuna & Guanaco) | 47.4% | 29.1% | 37.6% | 1.8% | 36.1% |
| + GCG Ensemble | **86.6%** | **46.9%** | **47.9%** | 2.1% | **66.0%** |

> 💡 **核心启示**：Claude-2 对迁移攻击表现出最强的鲁棒性（ASR 仅 2.1%），可能与其 Constitutional AI 训练方法有关。但这并不意味着 Claude-2 不可攻击——作者指出这可能只是当前攻击方法的局限，而非根本性的安全保障。

##### 与传统方法的对比

| 维度 | 传统 Jailbreak（手工） | AutoPrompt | GCG |
|------|----------------------|------------|-----|
| 构造方式 | 人工设计 prompt 模板 | 梯度引导逐位置搜索 | 梯度引导全位置同时搜索 |
| 自动化程度 | 低（需人类创意） | 高 | 高 |
| 通用性 | 模板固定，易被防御 | 单 prompt 优化 | 多 prompt 多模型通用 |
| 迁移性 | 依赖模板通用性 | 弱 | 强（开源→闭源） |
| 搜索效率 | N/A | 每步搜索 1 个位置 | 每步搜索所有位置 |

GCG 的核心创新在于将对抗攻击从"人工试错"推进到"自动化优化"，并首次证明了对齐 LLM 存在系统性的对抗脆弱性。这一发现对 AI 安全领域具有深远影响：它表明当前的安全对齐方法（RLHF、Constitutional AI 等）虽然能有效防御自然语言攻击，但无法抵御经过优化的对抗性输入。

#### 🧪 练习题

```yaml
question: "GCG 相比 AutoPrompt 的核心改进是什么？"
options:
  - "使用了更大的语言模型作为攻击目标"
  - "每步对所有后缀位置同时计算梯度并采样候选替换，而非逐位置搜索"
  - "引入了强化学习来优化对抗后缀"
  - "使用连续向量空间优化代替离散 token 搜索"
answer: 1
explain: "GCG 的关键改进在于每步对所有位置同时计算 top-k 候选，然后随机选择位置和 token 进行替换，相比 AutoPrompt 每步只搜索一个固定位置，搜索空间覆盖更广，攻击成功率大幅提升。"
```