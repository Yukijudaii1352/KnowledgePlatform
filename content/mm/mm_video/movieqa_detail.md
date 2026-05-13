### MovieQA: Understanding Stories in Movies through Question-Answering

```yaml
id: movieqa
name: MovieQA
full_name: "MovieQA: Understanding Stories in Movies through Question-Answering"
year: "2016"
org: "Toronto"
paper_url: "https://arxiv.org/abs/1512.02902"
category: "classic"
parent: "—"
motivation: "首个电影故事理解数据集"
```

#### 📝 一句话总结

MovieQA 提出了首个大规模电影故事理解问答数据集，包含 14,944 道关于 408 部电影的多选题，支持五种信息源（剧情概要、字幕、剧本、DVS、视频片段），并设计了从简单余弦检索到卷积神经网络和记忆网络的多级基线方法，揭示了视频故事理解的巨大挑战（最佳模型 56.7% vs 人类 83.4%）。

#### 🎯 核心要点

- **大规模多源数据集**：14,944 个 QA 对覆盖 408 部电影，每题 5 个选项，支持 5 种信息源（plot synopses、subtitles、scripts、DVS、video clips）
- **视频问答子集**：140 部电影提供时间戳对齐的视频片段（6,462 个 QA），是首个电影级视频 QA 基准
- **偏差分析基线（Hasty Student）**：验证答案长度、答案间相似度、问答相似度等偏差均接近随机（20-28%），证明数据集质量
- **滑动窗口检索方法（Searching Student）**：基于余弦相似度的滑窗匹配，TF-IDF 在 plot 上达 47.6%
- **卷积神经相似度模型（SSCB）**：将问题-故事和答案-故事相似度向量组合为张量，用 CNN 学习评分函数，融合特征后达 56.7%
- **改进的端到端记忆网络（MemN2N）**：引入自然语言答案嵌入层和固定 Word2Vec + 线性投影，解决大词汇量过拟合问题，在 scripts 上达 42.3%
- **文本表示**：对比 TF-IDF、Word2Vec、SkipThought 三种句子表示，TF-IDF 在词匹配任务最优，Word2Vec 在语义泛化上有优势
- **视频 QA 极具挑战**：纯视频 QA 准确率仅 ~23%，接近随机，表明视频故事理解远未解决

#### 🔬 深入细节

![MovieQA 数据集概览](https://ar5iv.labs.arxiv.org/html/1512.02902/assets/x1.png)
*图：MovieQA 数据集示例——一个电影场景对应的问题、5 个候选答案以及多种信息源（plot、subtitle、script、DVS、video）*

![SSCB 神经相似度架构](https://ar5iv.labs.arxiv.org/html/1512.02902/assets/x5.png)
*图：Searching Student with Convolutional Brain (SSCB) 的神经网络架构，输入为 n×5×2 的相似度张量，经 1×1 卷积和最大池化后输出 5 类 softmax 预测*

```python
# MovieQA 问答评分框架伪代码
# 通用评分函数: f(S, q, a_j) → 第j个答案的得分
# 预测: answer = argmax_j f(S, q, a_j)

# === 方法1: Searching Student (余弦滑窗) ===
def searching_student(story_sentences, question, answers, window_H):
    """滑动窗口 + 余弦相似度"""
    for j, a_j in enumerate(answers):
        best_score = -inf
        for l in range(len(story_sentences) - window_H):
            window = story_sentences[l : l + window_H]
            score = sum(cosine(s_k, question) + cosine(s_k, a_j) for s_k in window)
            best_score = max(best_score, score)
        scores[j] = best_score
    return argmax(scores)

# === 方法2: SSCB (卷积神经相似度) ===
def sscb(story_sentences, question, answers):
    """CNN 学习相似度评分函数"""
    # 计算 g_I(S, q): n维向量, 每个元素是 cosine(s_k, q)
    g_q = [cosine(s_k, question) for s_k in story_sentences]  # shape: (n,)
    # 计算 g_I(S, a_j): 对每个答案, shape: (n, 5)
    g_a = [[cosine(s_k, a_j) for s_k in story_sentences] for a_j in answers]
    # 堆叠为张量: (n, 5, 2)
    tensor = stack([replicate(g_q, 5), g_a], dim=-1)
    # CNN: 1x1 conv (h=10) → MaxPool(3) → 1x1 conv → MeanPool + MaxPool → softmax
    return cnn(tensor)  # shape: (5,)

# === 方法3: 改进 MemN2N ===
def memn2n(story_sentences, question, answers):
    """端到端记忆网络 + 自然语言答案"""
    Z = word2vec_embedding  # 固定预训练嵌入
    T = learnable_projection  # d2 × d1 线性投影
    u = T @ Z @ mean_pool(question)           # 问题编码
    m_l = [T @ Z @ mean_pool(s) for s in story_sentences]  # 故事记忆
    c_l = m_l  # 共享嵌入时 c = m
    g_j = [T @ Z @ mean_pool(a) for a in answers]  # 答案编码
    # 注意力机制
    p = softmax([dot(u, m) for m in m_l])     # 故事句子权重
    o = sum(p_l * c_l for p_l, c_l in zip(p, c_l))  # 加权故事表示
    # 预测
    return softmax([(o + u).T @ g for g in g_j])
```

**动机与背景**

在 MovieQA 之前，视觉问答（VQA）主要关注单张图片的简单事实性问题，而文本 QA 数据集（如 bAbI、MCTest）规模有限且缺乏多模态支持。电影作为一种复杂的叙事媒介，要求理解长时间跨度的因果关系、角色动机和情节发展。MovieQA 的核心动机是构建一个能同时评估文本和视频故事理解能力的大规模基准，弥合视觉感知与语言推理之间的鸿沟。

**数据集构建流程**

数据集的构建分为三个阶段：(1) **QA 生成**：标注者阅读电影的 plot synopsis 后编写问题和正确答案，要求问题涉及"what/who/why/how"等多种类型；(2) **干扰项生成**：另一组标注者为每个问题编写 4 个错误但合理的候选答案，要求与正确答案长度和风格相似以避免偏差；(3) **视频对齐**：对于有视频的电影，标注者将每个 QA 与电影中的具体时间段（视频片段）对齐。最终数据集按电影划分为 train/val/test（约 10:2:3 比例），确保同一电影的所有 QA 在同一划分中。

**核心方法解析**

论文提出了三层递进的方法体系。**第一层（Hasty Student）** 完全不看故事，仅利用答案本身的统计偏差（长度、相互相似度）或问答对的表面匹配来猜测答案，结果均接近随机水平（20-28%），验证了数据集设计的有效性。人类在不看故事时也仅达 27.6%。

**第二层（Searching Student）** 引入故事信息，核心思想是在故事中搜索与问题和答案最相关的片段。具体地，对于故事中的每个长度为 \(H\) 的滑动窗口，计算窗口内句子与问题及答案的余弦相似度之和：

$$f(S, q, a_j) = \max_l \sum_{k=l}^{l+H} \left[ g_{ss}(s_k, q) + g_{ss}(s_k, a_j) \right]$$

其中 \(g_{ss}(s, q) = x(s)^T x(q)\) 是归一化句子表示的点积。这一方法在 plot 上使用 TF-IDF 特征可达 47.6%。

**SSCB** 进一步将上述相似度向量化并输入 CNN 学习更复杂的评分函数。将 \(g_I(S, q)\)（n 维向量）和 \([g_I(S, a_j)]_{j=1}^5\)（n×5 矩阵）堆叠为 n×5×2 张量，经两层 1×1 卷积（h=10 个滤波器）、核大小为 3 的最大池化、以及均值+最大池化聚合后，通过 softmax 输出 5 类预测。融合 TF-IDF、Word2Vec、SkipThought 三种特征后，SSCB 在 plot 上达到 **56.7%** 的最佳准确率。

**第三层（改进 MemN2N）** 对原始端到端记忆网络做了两项关键修改：(1) 添加答案嵌入层 \(F\)，将预测从词汇表选择改为自然语言答案排序：\(a = \text{softmax}((o + u)^T g)\)；(2) 用固定的 Word2Vec 嵌入 \(Z\) 替换可学习的词嵌入，仅学习一个共享线性投影 \(T \in \mathbb{R}^{d_2 \times d_1}\)，将参数量从数百万降至数万。这使得 MemN2N 在长文本源（scripts: 42.3%, DVS: 33.0%）上表现优于 SSCB，因为注意力机制能有效筛选数千句故事中的关键信息。

> 💡 **关键发现**：文本 QA 中 plot 表现最好（因 QA 基于 plot 生成），但 MemN2N 在 scripts 上超越其他文本源，说明复杂的三方评分函数（故事-问题-答案）对长文本至关重要。视频 QA 准确率仅 ~23%（接近随机的 20%），即使融合字幕也仅达 38%，远低于人类的 83.4%，表明视频故事理解是一个极具挑战的开放问题。

> ⚠️ **注意**：所有报告结果均在 val 集上，test 集通过在线评估服务器提交。数据集的 QA 基于 plot synopses 生成，因此 plot 源天然具有优势，其他源（subtitles、scripts、DVS、video）的表现更能反映真实的故事理解能力。

#### 🧪 练习题

```yaml
question: "MovieQA 对原始 MemN2N 的关键改进是什么？"
options:
  - "增加了更多的记忆层（memory hops）以提升推理深度"
  - "用固定 Word2Vec 嵌入替换可学习词嵌入，并添加自然语言答案嵌入层"
  - "引入视觉特征作为额外的记忆输入"
  - "使用 Transformer 注意力机制替换原始的点积注意力"
answer: 1
explain: "原始 MemN2N 的词汇表选择式回答不适用于自然语言多选题，且可学习嵌入在大词汇量下严重过拟合。MovieQA 通过固定 Word2Vec + 共享线性投影解决过拟合，并添加答案嵌入层 F 实现自然语言答案排序。"
```