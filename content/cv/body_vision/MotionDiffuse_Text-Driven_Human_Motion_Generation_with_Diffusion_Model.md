# MotionDiffuse: Text-Driven Human Motion Generation with Diffusion Model

## 基本信息

- **标题**: MotionDiffuse: Text-Driven Human Motion Generation with Diffusion Model
- **作者**: Mingyuan Zhang, Zhongang Cai, Liang Pan, Fangzhou Hong, Xinying Guo, Lei Yang, Ziwei Liu
- **机构**: S-Lab, Nanyang Technological University; SenseTime Research
- **发表**: arXiv 2022 (2208.15001)
- **链接**: https://arxiv.org/abs/2208.15001

## 一句话总结

首个将扩散模型(DDPM)应用于文本驱动人体动作生成的框架，通过Cross-Modality Linear Transformer实现高质量、多样化的动作合成，并支持身体部位级细粒度控制和时变文本提示的任意长度动作生成。

## 关键词

`扩散模型` `文本驱动动作生成` `人体动作合成` `Transformer` `细粒度控制` `DDPM` `噪声插值`

## 研究背景与动机

文本驱动的人体动作生成旨在根据自然语言描述生成对应的3D人体动作序列。现有方法主要基于VAE、GAN或自回归模型，存在以下问题：

1. **确定性映射**：VAE/GAN方法倾向于学习文本到动作的确定性映射，导致生成多样性不足
2. **模式坍塌**：GAN训练不稳定，容易产生模式坍塌
3. **累积误差**：自回归方法存在误差累积问题，难以捕获全局关系
4. **控制粒度粗**：现有方法缺乏对身体各部位的独立精细控制能力

扩散模型(Diffusion Models)在图像生成领域已展现出卓越的生成质量和多样性，但尚未被应用于文本驱动的动作生成任务。MotionDiffuse首次将DDPM引入该领域，利用扩散模型天然的概率建模能力解决上述问题。

## 方法

### 整体框架

MotionDiffuse基于DDPM(Denoising Diffusion Probabilistic Model)框架，将动作生成建模为从高斯噪声逐步去噪恢复动作序列的过程。

**前向扩散过程**：逐步向动作序列添加高斯噪声：

$$q(\mathbf{x}_t | \mathbf{x}_{t-1}) = \mathcal{N}(\mathbf{x}_t; \sqrt{1-\beta_t}\mathbf{x}_{t-1}, \beta_t\mathbf{I})$$

**逆向去噪过程**：通过学习的去噪网络从噪声中恢复动作：

$$p_\theta(\mathbf{x}_{t-1}|\mathbf{x}_t) = \mathcal{N}(\mathbf{x}_{t-1}; \mu_\theta(\mathbf{x}_t, t, \text{text}), \sigma_t^2\mathbf{I})$$

训练目标为预测噪声项：

$$\mathcal{L} = \mathbb{E}_{t,\mathbf{x}_0,\epsilon}\left[\|\epsilon - \epsilon_\theta(\mathbf{x}_t, t, \text{text})\|^2\right]$$

### Cross-Modality Linear Transformer

由于动作序列长度可变，传统UNet架构不适用。MotionDiffuse提出Cross-Modality Linear Transformer作为去噪网络：

1. **文本编码器**：使用预训练CLIP模型编码文本描述，提取语义特征
2. **运动解码器**：基于线性注意力(Linear Attention)的Transformer解码器
   - 线性注意力将标准注意力的O(n²)复杂度降为O(n)，适合处理长序列
   - 通过交叉注意力机制融合文本条件信息
   - 时间步t通过embedding注入网络

线性注意力公式：将softmax(QK^T)V替换为φ(Q)·(φ(K)^T·V)，其中φ为核函数映射。

### 细粒度控制

**身体部位独立控制(Body Part-independent Controlling)**：

利用DDPM在显式空间（而非潜空间）生成动作的特性，提出"噪声插值"(Noise Interpolation)方法：

- 对n个文本描述{text_i}分别对应不同身体部位{s_i}
- 分别估计各部位的噪声项：$\epsilon_i^{\text{part}} = \epsilon_\theta(\mathbf{x}_t, t, \text{text}_i)$
- 通过掩码M_i组合各部位噪声：$\epsilon^{\text{part}} = \sum_{i=1}^{m} \epsilon_i^{\text{part}} \cdot M_i$
- 加入修正项保证部位间协调性

**时变文本提示(Time-varied Text Prompts)**：

支持在不同时间段使用不同文本描述，实现任意长度的连续动作生成。先独立生成各段动作，再通过混合修正保证过渡自然。

## 实验设置与结果

### 数据集

- **HumanML3D**：大规模文本-动作配对数据集
- **KIT-ML**：文本-动作配对数据集
- **HumanAct12**：动作类别条件数据集
- **UESTC**：动作类别条件数据集

### 评估指标

- **R Precision (Top-1/2/3)**：文本-动作匹配精度
- **FID**：生成动作与真实动作分布的距离
- **MultiModal Distance**：多模态距离
- **Diversity**：生成多样性
- **MultiModality**：多模态性

### 主要结果

**文本驱动动作生成**：
- 在HumanML3D和KIT-ML上全面超越所有基线方法(Language2Pose, Text2Gesture, T2M等)
- R Precision接近真实动作水平，表明生成质量极高
- FID显著优于现有方法

**动作类别条件生成**：
- 在HumanAct12和UESTC数据集上同样达到SOTA
- 直接应用文本驱动框架即可处理动作类别条件任务

### 消融实验

- **CLIP初始化**：去除预训练CLIP后性能严重下降，证明预训练语言模型的必要性
- **线性注意力**：与CLIP配合时显著提升性能；无CLIP时反而限制性能（全局关系在语义信息不足时可能产生误导）
- **架构规模**：512维潜空间维度显著优于256维；层数增加在高维度时效果有限

## 主要贡献

1. **首创性**：首个将扩散模型应用于文本驱动人体动作生成的工作，开辟了新的研究方向
2. **架构创新**：提出Cross-Modality Linear Transformer，用线性注意力替代UNet处理变长动作序列，兼顾效率与效果
3. **细粒度控制**：提出噪声插值方法实现身体部位级独立控制，支持时变文本提示生成任意长度动作
4. **全面SOTA**：在文本驱动(HumanML3D, KIT-ML)和动作条件(HumanAct12, UESTC)两类任务上均大幅超越现有方法

## 不足与展望

1. **推理速度慢**：扩散模型需要大量去噪步骤，难以实现实时动作生成。未来可探索DDIM、知识蒸馏等加速方法
2. **动作表示单一**：当前框架仅接受单一形式的动作表示，无法同时适配所有数据集。需要更通用的表示方案
3. **训练数据依赖**：对于训练分布外的组合动作（如"跑步同时挥手"）仍有挑战
4. **缺乏物理约束**：生成的动作可能存在物理不合理性（如穿透、浮空等）

## 相关工作

- **人体动作生成**：Action2Motion (Guo et al., 2020), ACTOR (Petrovich et al., 2021) - 基于VAE的动作条件生成
- **文本驱动动作生成**：Language2Pose (Ahuja & Morency, 2019), Text2Gesture (Bhattacharya et al., 2021), T2M (Guo et al., 2022) - 基于VAE/自回归的文本条件方法
- **扩散模型**：DDPM (Ho et al., 2020), Classifier-free Guidance (Ho & Salimans, 2022) - 扩散模型基础
- **后续工作**：MDM (Tevet et al., 2022), MLD (Chen et al., 2023) - 受MotionDiffuse启发的扩散动作生成方法