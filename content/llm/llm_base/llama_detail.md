### LLaMA: Open and Efficient Foundation Language Models

#### 📝 一句话总结
LLaMA 提出了一系列 7B-65B 参数的高效基础语言模型，**仅使用公开可获取的数据集**训练 1-1.4T tokens，证明了在给定推理预算下，较小模型配合更多数据可超越大得多的模型，其中 LLaMA-13B 在多数 benchmark 上超越 GPT-3(175B)，LLaMA-65B 与 Chinchilla-70B 和 PaLM-540B 竞争。

#### 🎯 核心要点
- 提出 4 种规模模型：LLaMA-7B、13B、33B、65B，全部基于 Transformer 架构
- 仅使用公开数据集训练（CommonCrawl、C4、GitHub、Wikipedia、Books、ArXiv、StackExchange），总计 1.4T tokens
- 采用 Pre-normalization + RMSNorm、SwiGLU 激活函数、RoPE 旋转位置编码等架构改进
- LLaMA-13B 在 8 个常识推理 benchmark 上全面超越 GPT-3(175B)
- 使用高效实现：xformers 因果多头注意力、手动反向传播、模型/序列并行、激活与梯度通信重叠
- 遵循 Chinchilla 缩放定律：在给定计算预算下，较小模型 + 更多数据优于大模型 + 较少数据
- 全模型开源给研究社区（需申请）

#### 🔬 深入细节

##### 1. 模型架构

![LLaMA 训练损失曲线](https://ar5iv.labs.arxiv.org/html/2302.13971/assets/x1.png)
*图 1: LLaMA-7B/13B/33B/65B 在 1-1.4T tokens 上的训练损失曲线，batch size 统一为 4M tokens。*

LLaMA 基于标准 Transformer 架构（Vaswani et al., 2017），吸收了后续多项改进：

| 改进 | 来源 | 说明 |
|------|------|------|
| **Pre-normalization** | GPT-3 | 在每个 Transformer 子层**输入**前归一化，而非输出后，提升训练稳定性 |
| **RMSNorm** | Zhang & Sennrich (2019) | 使用 RMSNorm 而非 LayerNorm 作为归一化函数 |
| **SwiGLU 激活** | PaLM (Shazeer, 2020) | 将 ReLU 替换为 SwiGLU，使用 $\\frac{2}{3}4d$ 维度（PaLM 为 $4d$） |
| **RoPE 位置编码** | GPTNeo (Su et al., 2021) | 移除绝对位置编码，每层加入 Rotary Positional Embeddings |

##### 2. 模型超参数

| 参数 | 7B | 13B | 33B | 65B |
|------|-----|-----|------|------|
| 层数 | 32 | 40 | 60 | 80 |
| 头数 | 32 | 40 | 52 | 64 |
| 嵌入维度 | 4096 | 5120 | 6656 | 8192 |
| 学习率 | 3.0e-4 | 3.0e-4 | 1.5e-4 | 1.5e-4 |
| Batch size | 4M tokens | 4M tokens | 4M tokens | 4M tokens |

##### 3. 训练数据配比

| 数据子集 | 采样比例 | 轮数 (1.4T) | 磁盘大小 |
|----------|----------|-------------|----------|
| CommonCrawl | 67.0% | 1.10 | ~3.3TB |
| C4 | 15.0% | 1.06 | ~750GB |
| GitHub | 4.5% | 0.64 | ~100GB |
| Wikipedia | 4.5% | 2.45 | ~20GB |
| Books | 4.5% | 2.23 | ~80GB |
| ArXiv | 2.5% | 1.06 | ~92GB |
| StackExchange | 2.0% | 1.03 | ~78GB |

##### 4. 优化器与训练细节

优化器配置：
- **AdamW**: $\\beta_1=0.9, \\beta_2=0.95$
- **Cosine 学习率调度**: 最终 LR = 10% 最大 LR，2,000 步 warmup
- **Weight decay**: 0.1，Gradient clipping: 1.0

高效训练实现：
1. **因果多头注意力优化**：使用 xformers 库，不存储注意力权重，不计算被 mask 的 key/query scores（参考 Rabe & Staats, 2021; Dao et al., 2022）
2. **减少激活重计算**：手动实现 Transformer 层反向传播，仅保存在反向传播中计算昂贵的激活（如 linear 层输出），而非依赖 PyTorch autograd
3. **模型与序列并行**：减少总体内存使用（Korthikanti et al., 2022）
4. **计算与通信重叠**：尽可能重叠激活计算与 GPU 间 all_reduce 通信

训练硬件：所有模型在 **A100-80GB GPU** 上训练，LLaMA-65B 使用 2,048 块 GPU 处理 1.4T tokens 耗时约 21 天。

##### 5. 核心实验结果

**常识推理 (Table 3) - 零样本性能：**

| 模型 | BoolQ | PIQA | SIQA | HellaSwag | WinoGrande | ARC-e | ARC-c | OBQA |
|------|-------|------|------|-----------|------------|-------|-------|------|
| GPT-3 175B | 60.5 | 81.0 | — | 78.9 | 70.2 | 68.8 | 51.4 | 57.6 |
| Chinchilla 70B | 83.7 | 81.8 | 51.3 | 80.8 | 74.9 | — | — | — |
| PaLM 540B | 88.0 | 82.3 | — | 83.4 | 81.1 | 76.6 | 53.0 | 53.4 |
| LLaMA 7B | 76.5 | 79.8 | 48.9 | 76.1 | 70.1 | 72.8 | 47.6 | 57.2 |
| LLaMA 13B | 78.1 | 80.1 | 50.4 | 79.2 | 73.0 | 74.8 | 52.7 | 56.4 |
| LLaMA 33B | 83.1 | 82.3 | 50.4 | 82.8 | 76.0 | 80.0 | 57.8 | 58.6 |
| **LLaMA 65B** | **85.3** | **82.8** | **52.3** | **84.2** | **77.0** | **78.9** | **56.0** | **60.2** |

> LLaMA-65B 在所有 benchmark 上超过 Chinchilla-70B（除 BoolQ），LLaMA-13B 全面超越 GPT-3(175B)。

**其他 benchmark 亮点：**
- **NaturalQuestions** (Table 4)：LLaMA-65B 零样本 26.4%、5-shot 35.1%，与 PaLM-540B 持平
- **TriviaQA** (Table 5)：LLaMA-65B 零样本 68.2%（高于 GPT-3 的 64.3%），5-shot 达 71.6%
- **RACE-middle** (Table 6)：LLaMA-65B 67.9% vs PaLM-540B 68.1%
- **MMLU** (Table 7)：LLaMA-65B 5-shot 63.4%，接近 PaLM-540B 的 69.3%
- **MATH/GSM8k** (Table 8)：数学推理能力随模型规模稳定增长

##### 6. 偏置与毒性评估

- **CrowS-Pairs (Table 12)**：LLaMA-65B 在 9 类偏置上的整体分数为 66.4（vs OPT-175B 67.2）
- **WinoGender (Table 13)**：LLaMA 模型在 "their/them/someone" 代词上的共指消解准确率优于 "her/her/she" 和 "his/him/he"，表明存在性别偏置
- **TruthfulQA (Table 14)**：LLaMA-65B 在 truthful 和 truthful*informative 指标与 GPT-3 相当，但仍存在幻觉问题

##### 7. 碳足迹 (Table 15)

| 模型 | GPU 小时 | 总功耗 | 碳排放 (tCO₂eq) |
|------|----------|--------|-----------------|
| OPT-175B | 809,472 | 356 MWh | 137 |
| BLOOM-175B | 1,082,880 | 475 MWh | 183 |
| LLaMA-7B | 82,432 | 36 MWh | 14 |
| LLaMA-13B | 135,168 | 59 MWh | 23 |
| LLaMA-33B | 530,432 | 233 MWh | 90 |
| LLaMA-65B | 1,022,362 | 449 MWh | 173 |

#### 📚 练习题

1. **架构分析**：LLaMA 使用了 Pre-normalization 而非 Post-normalization（原始 Transformer）。阐述这种设计对训练稳定性的影响机制，并说明为什么在大规模模型中 Pre-norm 更受青睐。

2. **缩放定律验证**：LLaMA 遵循 Chinchilla 缩放定律（在固定计算预算下，较小模型+更多数据优于大模型+较少数据）。若你有 1e24 FLOPs 预算，根据 Hoffmann et al.（2022），计算"最优"模型参数量和训练 token 数，并与 LLaMA-65B（1.4T tokens）比较。

3. **SwiGLU 激活函数**：推导 SwiGLU 的前向传播公式：$SwiGLU(x) = Swish(xW) \\otimes (xV)$，其中 $Swish(x) = x \\cdot \\sigma(x)$。解释为何 LLaMA 使用 $\\frac{2}{3}4d$ 维度而非 PaLM 的 $4d$（提示：考虑参数量中性）。

4. **RoPE 位置编码**：设计一个小实验，用 numpy 实现 RoPE 编码（维度 64，序列长度 128），可视化位置 0 与位置 k 的旋转角差异，验证其相对位置建模能力。

5. **偏置评估**：论文发现 LLaMA 在 WinoGender 上呈现性别偏置。设计一个评估方案，用现有中文数据集（如 CLUE/WSC）测试类似偏置，并讨论如何在预训练阶段缓解该问题。
