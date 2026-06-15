### T2M-GPT：用离散动作 Token 做文本到运动生成

```yaml
id: t2mgpt
name: T2M-GPT
full_name: 动作GPT (Text-to-Motion GPT)
year: '2023'
org: 腾讯
paper_url: http://openaccess.thecvf.com/content_CVPR_2023/html/Zhang_Generating_Human_Motion_From_Textual_Descriptions_With_Discrete_Representations_CVPR_2023_paper.html
category: motion
parent: mdm
motivation: 结合VQ-VAE与GPT离散化Token自回归生成
```

#### 📝 一句话总结
T2M-GPT 先用 VQ-VAE 把连续人体运动压缩为离散代码序列，再用 GPT 在文本条件下自回归预测动作 token，把文本到动作生成转化为类似语言建模的问题。

#### 🎯 核心要点
- **两阶段框架**：第一阶段训练 Motion VQ-VAE 学习动作离散码本，第二阶段训练文本条件 GPT 预测码本索引。
- **离散表示**：把连续运动压缩成 token 后，生成器只需建模离散序列分布，降低直接回归高维姿态的难度。
- **自回归生成**：GPT 根据文本嵌入和历史动作 token 逐步预测下一个 token，并通过 End token 控制生成长度。
- **码本维护**：使用 EMA 更新和 Code Reset 等策略缓解 VQ-VAE 码本坍缩，让更多 token 参与表达动作片段。
- **与扩散路线的差异**：MDM/MotionDiffuse 通过多步去噪生成连续动作，T2M-GPT 则通过离散 token 序列生成后再解码回连续动作。
- **主要局限**：自回归采样可能积累错误；动作质量上限受 VQ-VAE 重建能力和码本粒度约束。

#### 🔬 深入细节
![T2M-GPT Motion VQ-VAE](https://ar5iv.labs.arxiv.org/html/2301.06052/assets/Figure/VQ.png)
![T2M-GPT transformer](https://ar5iv.labs.arxiv.org/html/2301.06052/assets/Figure/Transformer.png)

T2M-GPT 的第一阶段是 Motion VQ-VAE。编码器把连续动作 $x_{1:T}$ 压缩成潜特征 $z_e$，然后为每个潜特征选择最近的码本向量 $e_k$，得到离散索引序列 $s_{1:N}$。解码器再从这些码本向量重建动作。典型 VQ 目标可写成：
$$
\mathcal{L}_{VQ}=\lVert x-\hat{x}\rVert_1+\lVert \text{sg}[z_e]-e_k\rVert_2^2+\beta\lVert z_e-\text{sg}[e_k]\rVert_2^2
$$
其中 $\text{sg}[\cdot]$ 表示 stop-gradient。

第二阶段是文本条件 GPT。给定文本描述 $y$，模型先得到文本嵌入 $e_y$，再按自回归方式预测动作 token：
$$
p(s_{1:N}\mid y)=\prod_{i=1}^{N}p(s_i\mid s_{<i}, e_y)
$$
采样出的 token 序列通过第一阶段训练好的 VQ-VAE decoder 还原为连续运动。这个设计让文本到动作问题变成“根据文本生成离散动作词表序列”，与语言模型范式高度一致。

为了让 GPT 在推理时更稳定，论文还引入训练策略来缓解 teacher forcing 与自回归采样之间的差异，例如对输入 token 做扰动或使用终止 token 建模长度。与此同时，VQ-VAE 的码本更新需要避免少数 code 被过度使用；如果码本坍缩，GPT 即使预测准确，也只能组合有限的动作片段。

与扩散模型相比，T2M-GPT 的优势是采样过程更直接，不需要几十到上千步去噪；生成结果的动作片段也有较强的离散组合结构。代价是 token 化会带来量化误差，并且自回归模型对早期错误敏感。实际系统中，VQ 码本大小、下采样率、GPT 上下文长度和文本编码器质量共同决定最终动作的自然度与文本一致性。

```text
Algorithm: T2M-GPT training and inference
Stage 1: Train Motion VQ-VAE
  1. Encode motion x[1:T] into latent sequence z_e
  2. Quantize each latent vector to nearest codebook entry e_k
  3. Decode quantized vectors into reconstructed motion x_hat
  4. Optimize reconstruction, codebook and commitment losses
Stage 2: Train text-conditioned GPT
  1. Convert each training motion into discrete token sequence s[1:N]
  2. Encode paired text y
  3. Train GPT to predict s_i from text and previous tokens s_<i
Inference:
  1. Encode text prompt y
  2. Autoregressively sample motion tokens until End token
  3. Decode tokens with VQ-VAE decoder into continuous motion
Output: text-conditioned 3D human motion
```

#### 🧪 小练习
```yaml
exercise:
  question: T2M-GPT 的 VQ-VAE 码本粒度过粗或过细分别会带来什么问题？
  hint: 过粗会影响重建细节，过细会增加 GPT 预测难度并可能导致码本利用不均。
```
