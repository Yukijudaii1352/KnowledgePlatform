### i-vector: 身份向量 (i-vector)

```yaml
id: i_vector
name: i-vector
full_name: 身份向量 (i-vector)
year: '2011'
org: 蒙特利尔大学
paper_url: https://ieeexplore.ieee.org/document/5545402
category: speaker
parent: —
motivation: 全变分空间因子分析
topic_id: mm_sound
yaml_path: /mnt/dhwfile/raise/user/wanghaoyu/KnowledgePipeline/content/mm/mm_sound.yaml
output_path: /mnt/dhwfile/raise/user/wanghaoyu/KnowledgePipeline/content/mm/mm_sound/i_vector_detail.md
quality_reasons:
  - thin_deep_detail
```

#### 📝 一句话总结

i-vector 提出了用一个低维全变分空间同时吸收说话人和信道变化的方法，把变长语音的 GMM 统计量压缩成固定长度身份向量，再交给 LDA/WCCN/PLDA 等后端去补偿信道并完成说话人验证。

#### 🎯 核心要点

- 全变分建模：用单一矩阵 \(T\) 替代 JFA 中显式拆分的说话人子空间和信道子空间。
- 固定长度表示：每段语音由 Baum-Welch 零阶/一阶统计量估计出一个低维 \(w\)，即 i-vector。
- 核心生成式公式：\(M(u)=m+T w(u)\)，其中 \(m\) 是 UBM 均值超向量，\(T\) 是全变分矩阵，\(w\sim\mathcal{N}(0,I)\)。
- 离线训练流程：训练 UBM-GMM，累积每段语音的充分统计量，用 EM 估计 \(T\)，再训练 LDA/WCCN/PLDA 后端。
- 在线验证流程：注册语音和测试语音分别提取 i-vector，做长度归一化和会话补偿，用余弦或 PLDA 评分。
- 关键转变：前端不再强行判断哪些维度是说话人、哪些维度是信道，而是把可变因素统一编码，把判别与补偿留给后端。
- 历史影响：i-vector 成为深度说话人嵌入之前的主流框架，也为后来的 d-vector、x-vector 建立了“语音段级嵌入”的范式。

#### 🔬 深入细节

![i-vector 提取流程](https://speechprocessingbook.aalto.fi/_images/165126497.png)
*图：i-vector 提取器用 UBM 后验计算 Baum-Welch 统计量，再结合全变分矩阵把高维统计量投影为低维 i-vector。*

```python
# i-vector 训练、提取与验证流程

# ---------- 离线训练 ----------
features = extract_mfcc(all_training_audio)
ubm = train_gmm_ubm(features, num_components=C)

# 每条训练语音都先被当作一个独立 session，用 UBM 统计其分量占有率和中心化一阶统计量
stats = []
for utterance in training_utterances:
    gamma = ubm.posterior(utterance.frames)
    N = sum_t(gamma[t, c] for c in range(C))
    F = sum_t(gamma[t, c] * utterance.frames[t] for c in range(C))
    F_centered = F - N * ubm.means
    stats.append((N, F_centered))

# EM 估计全变分矩阵 T
T = random_matrix(C * feature_dim, ivector_dim)
for iteration in range(num_em_iters):
    posteriors = []
    for N, F_centered in stats:
        precision = I + T.T @ Sigma_inv @ N @ T
        cov_w = inverse(precision)
        mean_w = cov_w @ T.T @ Sigma_inv @ F_centered
        posteriors.append((mean_w, cov_w + outer(mean_w, mean_w)))

    for component in range(C):
        A_c = sum(N_u[component] * Eww_u for (N_u, _), (_, Eww_u) in zip(stats, posteriors))
        B_c = sum(F_u[component] @ Ew_u.T for (_, F_u), (Ew_u, _) in zip(stats, posteriors))
        T[component] = B_c @ inverse(A_c)

# 训练后端：LDA/WCCN/PLDA 或余弦评分参数
train_ivectors = [extract_ivector(u, ubm, T) for u in labeled_training_utterances]
backend = train_backend(train_ivectors, speaker_labels)

# ---------- 在线验证 ----------
enroll_w = backend.transform(extract_ivector(enroll_audio, ubm, T))
test_w = backend.transform(extract_ivector(test_audio, ubm, T))
score = plda_or_cosine(enroll_w, test_w)
accept = score > threshold
```

##### 1. 从 JFA 到全变分空间

JFA 的基本想法是把 GMM 超向量拆成说话人项、信道项和残差项，例如：

$$
M(u)=m+V y(s)+U x(u)+D z(s)
$$

这里 \(V\) 试图只表示说话人变化，\(U\) 试图只表示信道或会话变化。i-vector 论文的关键观察是：这种前端拆分并不干净，JFA 的信道因子里也能保留明显的说话人信息。如果一个“信道子空间”本身已经可用于说话人判别，那么先验地把变化拆成两块反而可能损失信息。

i-vector 因此把模型简化成：

$$
M(u)=m+T w(u),\qquad w(u)\sim\mathcal{N}(0,I)
$$

这个 \(T\) 被称为 total variability matrix，因为它同时覆盖说话人差异、录音通道、语音内容、噪声条件等所有能让语音段偏离 UBM 均值超向量的主要方向。前端只负责生成一个信息尽量完整的低维向量 \(w\)，后端再根据说话人标签学习哪些方向应该保留、哪些方向应该抑制。

##### 2. Baum-Welch 统计量如何变成 i-vector

给定 UBM 的第 \(c\) 个高斯分量，语音 \(u\) 的零阶统计量 \(N_c(u)\) 表示该语音有多少帧“软分配”给该分量，一阶统计量 \(F_c(u)\) 是这些帧的加权特征和。中心化一阶统计量写作：

$$
\tilde{F}_c(u)=F_c(u)-N_c(u)m_c
$$

把所有分量拼接后，i-vector 的后验协方差和后验均值为：

$$
C_u=\left(I+T^\top \Sigma^{-1}N(u)T\right)^{-1}
$$

$$
\hat{w}(u)=C_uT^\top\Sigma^{-1}\tilde{F}(u)
$$

直觉上，\(\tilde{F}(u)\) 是这段语音相对 UBM 的“偏移证据”，\(T^\top\Sigma^{-1}\) 把高维偏移投影回低维全变分空间，\(I+T^\top\Sigma^{-1}N(u)T\) 则扮演后验精度矩阵。语音越长，\(N(u)\) 越大，观测证据越强，后验方差越小；短语音证据不足时，标准正态先验会把 \(w\) 拉回原点，避免过度相信噪声统计量。

##### 3. 为什么 \(T\) 可以用 EM 训练

训练 \(T\) 时，\(w(u)\) 是隐变量，观测到的是 UBM 下的充分统计量。E-step 用当前 \(T\) 计算每段语音的 \(\mathbb{E}[w]\) 和 \(\mathbb{E}[ww^\top]\)；M-step 在固定这些后验矩的情况下最大化期望似然。由于 UBM 协方差通常近似为块对角或对角形式，更新 \(T\) 可以按高斯分量分块求解：

$$
A_c=\sum_u N_c(u)\mathbb{E}[w(u)w(u)^\top],\qquad
B_c=\sum_u \tilde{F}_c(u)\mathbb{E}[w(u)]^\top
$$

$$
T_c=B_cA_c^{-1}
$$

这使得原本 \(CF\times R\) 的大矩阵估计变成 \(C\) 个相对可控的线性问题。这里 \(C\) 是 UBM 高斯数，\(F\) 是声学特征维度，\(R\) 是 i-vector 维度；典型情况下 \(CF\) 可达数万，而 \(R\) 常取几百，因此低秩结构是可训练和可部署的关键。

##### 4. 后端补偿是 i-vector 系统的另一半

原始 i-vector 并不是纯说话人向量，它仍混有通道、语音内容和噪声信息。论文路线的重点是“前端保留，后端消除”：LDA 最大化说话人间散度并压缩说话人内散度，WCCN 对说话人内协方差大的方向做白化或抑制，长度归一化让向量分布更接近 PLDA 的高斯假设。

余弦评分的形式很直接：

$$
\operatorname{score}(w_1,w_2)=\frac{w_1^\top w_2}{\|w_1\|\|w_2\|}
$$

PLDA 则进一步假设补偿后的 i-vector 可分解为说话人隐变量和残差噪声，用同说话人与异说话人的似然比作为验证分数。这个后端设计解释了为什么 i-vector 能比 JFA 更灵活：JFA 在前端决定分解方式，i-vector 则让监督后端根据验证目标重新组织空间。

##### 5. 方法边界与后续影响

i-vector 的优势在于稳定、数据需求相对可控、后端理论成熟，尤其适合传统电话信道和 NIST SRE 风格评测。但它的前端仍是无监督最大似然训练，\(T\) 的目标不是直接区分说话人；短语音条件下 Baum-Welch 统计量不稳定，向量会更受先验和噪声影响。x-vector 后来用监督分类训练的 TDNN 直接学习说话人判别嵌入，本质上就是把 i-vector 中“固定长度语音段表示”的思想换成了神经网络提取器。

> 💡 关键：i-vector 的创新不只是一个公式，而是把说话人验证系统拆成“通用前端表示 + 判别式/概率式后端”的工程范式。

#### 🧪 练习题

```yaml
question: "i-vector 相比 JFA 的核心建模变化是什么？"
options:
  - "把所有语音帧直接输入 softmax 分类器"
  - "用一个全变分空间统一建模说话人和信道变化，再由后端补偿"
  - "只保留信道子空间并丢弃说话人子空间"
  - "用动态时间规整替代 GMM-UBM"
answer: 1
explain: "i-vector 不再在前端显式拆分说话人和信道子空间，而是用 T 矩阵提取统一低维表示，并在后端通过 LDA/WCCN/PLDA 等方法处理会话变化。"
```
