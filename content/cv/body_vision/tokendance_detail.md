### TokenDance

```yaml
id: tokendance
name: TokenDance
full_name: "Token舞蹈 (TokenDance)"
year: "2026.03"
org: "arXiv"
paper_url: "https://arxiv.org/abs/2603.TokenDance"
category: "motion"
parent: "t2mgpt"
motivation: "Token-to-Token双向Mamba架构提升效率"
```

#### 📝 一句话总结

TokenDance 将音乐和舞蹈都离散成 token，并用 Local-Global-Local 的 Bidirectional Mamba token-to-token 生成器把音乐 token 非自回归映射为上下半身舞蹈 token，提升真实音乐上的泛化和推理效率。

#### 🎯 核心要点

- **真实论文补足**：用户给定 URL 是占位符，官方可检索版本为 `https://arxiv.org/abs/2603.27314`
- **双模态 tokenization**：音乐与舞蹈均用 Finite Scalar Quantization 离散化，降低连续回归难度
- **舞蹈分解码本**：SMPL 动作拆成 upper-body 与 lower-body token，增强组合性
- **音乐分解码本**：Librosa 音频特征拆成 semantic 与 acoustic 分量，分别量化
- **Local-Global-Local 生成器**：音乐局部 scanner 编码语义/声学 token，全局 scanner 融合风格与节奏，舞蹈局部 scanner 输出上下半身 token
- **Bidirectional Mamba**：用双向状态空间扫描捕捉长程上下文，支持非自回归高效推理
- **动态-运动学约束**：重建阶段约束位置、速度、加速度和 forward kinematics，减少漂移与抖动

#### 🔬 深入细节

![TokenDance 框架图](https://arxiv.org/html/2603.27314v1/x2.png)
*图：上半部分是音乐/舞蹈双模态 FSQ 离散化，下半部分是 Local-Global-Local BiMamba token-to-token 生成器。*

```python
# TokenDance 两阶段流程伪代码
for music, smpl in dataloader:
    upper, lower = split_body(smpl)
    z_u = dance_encoder_upper(upper)
    z_l = dance_encoder_lower(lower)
    tok_u, tok_l = fsq(z_u), fsq(z_l)
    rec_motion = dance_decoder(tok_u, tok_l)
    loss_dance = recon_loss(rec_motion, smpl)
    loss_dance += velocity_acceleration_fk_loss(rec_motion, smpl)

    sem, acu = split_music_features(librosa_features(music))
    tok_sem = fsq(music_encoder_sem(sem))
    tok_acu = fsq(music_encoder_acu(acu))
    loss_music = recon_loss(music_decoder(tok_sem, tok_acu), music)

for tok_sem, tok_acu, genre in token_loader:
    h_local = music_local_scanners(tok_sem, tok_acu)
    h_global = global_bimamba(h_local, genre)
    pred_upper, pred_lower = dance_local_scanners(h_global)
    optimize(cross_entropy(pred_upper, tok_u) + cross_entropy(pred_lower, tok_l))
```

**动机与背景。** 早期音乐到舞蹈方法常直接从连续音频特征回归连续骨架/SMPL 参数，容易学到保守平均动作，长序列上出现重复和 manifold drift。T2M-GPT 式两阶段方法证明了“先学运动 token，再做序列建模”的有效性，但很多舞蹈方法只把舞蹈离散化，音乐仍作为连续条件输入，导致节拍、风格和乐句结构没有被显式建模。TokenDance 的关键判断是：从编舞角度看，音乐中的舞蹈相关因素是有限、可组合的模式，而不需要完整保留原始音频连续变化。

**Finite Scalar Quantization。** FSQ 不维护传统 VQ-VAE 的可学习 codebook，而是逐通道把连续 latent 约束到有限标量等级并四舍五入。它避免 codebook collapse 和 commitment loss，天然鼓励各通道使用所有离散等级。可以把它理解为“每个 latent 维度都有固定刻度尺”，最终组合成大的离散空间。

**舞蹈 tokenization。** TokenDance 使用 SMPL 根平移和 6D 旋转表示，并将身体拆成上半身和下半身。这样做符合舞蹈中的组合结构：腿部负责步伐、重心和位移，上半身负责手臂、躯干和风格表达。训练解码器时加入动态-运动学约束：

$$
\mathcal{L}_{\text{dyn}}=\|x-\hat{x}\|+\|\dot{x}-\dot{\hat{x}}\|+\|\ddot{x}-\ddot{\hat{x}}\|+\|FK(x)-FK(\hat{x})\|
$$

其中 \(FK(\cdot)\) 把关节旋转转换为三维关节位置。这个损失让 token 不只是重建参数数值，还要重建真实身体运动轨迹。

**音乐 tokenization。** 论文将 Librosa 特征分为语义分量和声学分量，例如 MFCC 被视为较高层的 semantic component，其余节奏/能量相关特征作为 acoustic component。两者使用独立 FSQ，使模型能分别捕捉舞种/风格与节拍/强弱。相比把音乐压到一个 token 空间，这种拆分减少了异质信息互相干扰。

**Local-Global-Local BiMamba。** 第二阶段不是逐 token 自回归生成，而是用双向 Mamba 架构进行 token-to-token 映射。Music Local Scanner 分别扫描 semantic/acoustic token，Global Scanner 融合音乐全局结构和 genre 条件，Dance Local Scanner 再分别预测上下半身 token。Mamba 的选择在于其线性复杂度序列建模能力；双向扫描让模型在训练和离线生成时同时利用前后音乐上下文。

**与 T2M-GPT 的区别。** T2M-GPT 将文本条件映射到运动离散 token，通常自回归生成；TokenDance 面向音乐驱动舞蹈，同时离散化音乐和动作，并用非自回归 BiMamba 预测，重点解决长音乐的效率、风格泛化和重复动作问题。

> ⚠️ 注意：TokenDance 的优势来自“双模态离散化 + 生成器结构”组合；如果只替换成 Mamba 而仍用连续音乐条件，论文消融显示泛化收益会减弱。

#### 🧪 练习题

```yaml
question: "TokenDance 相比只离散化舞蹈 token 的方法，额外离散化音乐的主要收益是什么？"
options:
  - "完全不需要音乐编码器"
  - "把舞蹈相关的风格、节奏和乐句结构变成可组合 token，降低连续条件学习难度"
  - "让 SMPL 模型自动学习人脸表情"
  - "把非自回归生成改成逐帧扩散"
answer: 1
explain: "音乐 tokenization 显式约束条件空间，使模型更容易复用和组合节奏/风格模式，从而提升真实音乐泛化。"
```
