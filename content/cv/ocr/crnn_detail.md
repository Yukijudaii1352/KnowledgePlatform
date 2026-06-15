### CRNN: 卷积循环神经网络 (Convolutional Recurrent Neural Network)

```yaml
id: crnn
name: CRNN
full_name: "卷积循环神经网络 (Convolutional Recurrent Neural Network)"
year: "2015"
org: Huazhong University of Science and Technology
paper_url: https://arxiv.org/abs/1507.05717
category: recognition
parent: "—"
motivation: CNN+RNN+CTC开创序列识别
```

#### 📝 一句话总结

CRNN 将 CNN 特征提取、双向 RNN 序列建模和 CTC 无对齐转录合成一个端到端可训练框架，解决了图像文本识别中字符级对齐标注昂贵、文本长度可变的问题。它成为后续场景文字识别模型最基础的 CNN+序列解码范式。

#### 🎯 核心要点

- 三段式结构：卷积层提取视觉特征，循环层建模水平方向序列上下文，转录层用 CTC 输出可变长文本
- 将 CNN 最后一层特征图按列切成序列，每一列对应原图中的一个感受野
- 使用双向 LSTM 同时利用左右上下文，提升相邻字符形态相似时的判别能力
- CTC 引入 blank 类并对所有合法对齐路径求和，不需要字符级切分标注
- 支持 lexicon-free 和 lexicon-based 两种转录；带词典时可用 CTC 条件概率选择最可能单词
- 同一框架可迁移到场景文字、印刷文字、乐谱等图像序列识别任务

#### 🔬 深入细节

##### 核心架构图

![CRNN 网络架构](https://ar5iv.labs.arxiv.org/html/1507.05717/assets/x1.png)
*图：CRNN 由卷积层、循环层和转录层组成。卷积特征图按宽度方向展开为序列，RNN 输出每个时间步的字符分布，CTC 将分布折叠为最终字符串。*

![CRNN 感受野到序列映射](https://ar5iv.labs.arxiv.org/html/1507.05717/assets/x2.png)
*图：特征序列中的每个向量对应输入图像上的一个局部感受野，文本识别由二维图像问题转化为一维序列标注问题。*

##### 算法伪代码

```python
# CRNN 训练与推理核心逻辑
def train_step(image, word_label):
    feature_map = cnn(image)              # shape: C x H' x W'
    sequence = collapse_height(feature_map)  # W' 个时间步，每步一个 C 维向量
    logits = bidirectional_lstm(sequence)
    log_probs = log_softmax(linear(logits))
    loss = ctc_loss(log_probs, word_label)   # 无需字符级对齐
    return loss

def recognize(image, lexicon=None):
    log_probs = model(image)
    if lexicon is None:
        return ctc_best_path_decode(log_probs)
    return max(lexicon, key=lambda word: ctc_sequence_probability(log_probs, word))
```

##### 方法详解

**1. 动机与背景**

传统 OCR 往往依赖字符切分、手工特征和逐字符分类。自然场景文字存在透视、模糊、字体变化和字符间距不稳定，显式字符切分很容易失败。另一方面，直接把整词作为分类类别又会受词表规模限制，无法处理开放词表。

CRNN 的切入点是把文字图像当作序列识别问题：图像宽度方向天然对应文本读取顺序，模型只需学习从图像列序列到字符序列的映射。这样既保留 CNN 的视觉表征能力，又利用 RNN 建模上下文，还通过 CTC 规避字符级对齐。

**2. 从特征图到序列**

输入图像先经过 CNN，得到特征图 \(F \in \mathbb{R}^{C \times H' \times W'}\)。由于文本图像通常被归一化到固定高度，CRNN 将每个宽度位置的整列特征作为一个时间步：

$$
\mathbf{x}_t = F[:, :, t], \quad t=1,\ldots,W'
$$

每个 \(\mathbf{x}_t\) 对应输入图像中的一个局部感受野。这个转换保留了从左到右的读取顺序，使 RNN 可以像处理语音或手写轨迹一样处理文本图像。

**3. 双向 LSTM 序列建模**

单个字符的视觉外观可能不足以判别，例如 “l”“I”“1” 或相邻字符粘连。双向 LSTM 在每个时间步同时汇聚左侧和右侧上下文：

$$
\mathbf{h}_t = [\overrightarrow{\mathbf{h}}_t; \overleftarrow{\mathbf{h}}_t]
$$

随后线性层和 softmax 输出每个时间步属于字符集或 blank 的概率分布。RNN 的作用不是简单分类单列，而是让每个预测都看到较长范围的上下文。

**4. CTC 转录层**

CTC 定义折叠函数 \(\mathcal{B}\)：先合并连续重复字符，再删除 blank。例如路径 `--s-tt-aa-r--` 会被折叠为 `star`。给定 RNN 输出 \(y\)，标签序列 \(l\) 的概率是所有可折叠到 \(l\) 的路径概率之和：

$$
p(l|y) = \sum_{\pi:\mathcal{B}(\pi)=l} \prod_{t=1}^{T} y^t_{\pi_t}
$$

训练目标是最小化负对数似然：

$$
\mathcal{L} = -\sum_i \log p(l_i|y_i)
$$

> 💡 关键：CTC 不要求知道每个字符对应图像中的哪一列，只要求整词标注，因此大幅降低了序列识别训练数据的标注成本。

**5. 推理与词典约束**

无词典模式下，CRNN 通常使用 best path decoding：每个时间步取最大概率字符，然后执行 CTC 折叠。带词典模式下，可以对候选词计算 \(p(l|y)\)，选取概率最高者。论文还讨论了用 BK-tree 等数据结构加速大词典搜索。

**6. 与后续方法的关系**

CRNN 的贡献不在于复杂网络，而在于给文字识别建立了稳定的端到端范式。后续 Attention OCR、ASTER、MASTER、PARSeq 等方法大多仍沿用“视觉特征序列 + 序列解码”的思想，只是把 RNN/CTC 替换为注意力解码器或 Transformer。

#### 🧪 练习题

```yaml
question: "CRNN 中 CTC 层的核心作用是什么？"
options:
  - "将输入图像裁剪成单字符小图"
  - "在不知道字符级位置对齐的情况下，对所有合法路径求和并训练整词序列"
  - "把整词映射到固定类别，实现闭集分类"
  - "替代 CNN 提取局部视觉特征"
answer: 1
explain: "CTC 通过 blank 和折叠函数定义序列概率，使模型只需整词标签即可端到端训练，不需要字符切分或逐字符对齐。"
```
