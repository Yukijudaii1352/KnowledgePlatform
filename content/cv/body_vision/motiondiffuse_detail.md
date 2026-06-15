### MotionDiffuse：面向文本驱动动作生成的扩散模型

```yaml
id: motiondiffuse
name: MotionDiffuse
full_name: 运动扩散 (MotionDiffuse)
year: '2022'
org: 商汤科技
paper_url: https://arxiv.org/abs/2208.15001
category: motion
parent: actor
motivation: 首个基于扩散模型的文本驱动动作生成
```

#### 📝 一句话总结
MotionDiffuse 将 DDPM 用于文本到人体动作生成，通过跨模态线性 Transformer 融合文本和带噪动作，在自然语言条件下逐步去噪生成 3D 运动序列。

#### 🎯 核心要点
- **任务定位**：相比 Action2Motion/ACTOR 的动作类别条件，MotionDiffuse 面向自由文本描述，条件更细粒度。
- **扩散建模**：把整段运动视作连续数据，在正向过程中加噪，在反向过程中用文本条件预测去噪方向。
- **跨模态融合**：提出 Cross-Modality Linear Transformer，在动作 token 与文本 token 之间建立条件交互，同时降低长序列注意力成本。
- **可控生成**：支持身体部位级控制、噪声插值和时间变化文本提示，体现扩散模型在编辑与组合上的优势。
- **实验范围**：在 HumanML3D、KIT-ML 等文本-动作数据集上验证文本对齐与运动自然度。
- **主要局限**：早期扩散动作模型采样成本较高，且文本理解仍依赖训练集标注和文本编码器表达能力。

#### 🔬 深入细节
![MotionDiffuse pipeline](https://ar5iv.labs.arxiv.org/html/2208.15001/assets/x2.png)

MotionDiffuse 的基本设定是：输入一句文本 $y$，输出一段 3D 运动 $x_0$。正向扩散把 $x_0$ 加噪为 $x_t$：
$$
q(x_t\mid x_0)=\mathcal{N}\left(\sqrt{\bar{\alpha}_t}x_0,\,(1-\bar{\alpha}_t)I\right)
$$
反向网络接收 $x_t$、扩散步 $t$ 和文本嵌入 $e_y$，学习预测噪声或去噪方向：
$$
\mathcal{L}_{simple}=\mathbb{E}_{x_0,t,\epsilon}\left[\lVert \epsilon-\epsilon_\theta(x_t,t,e_y)\rVert_2^2\right]
$$

文本条件不是简单拼接到全局向量后丢给网络，而是通过跨模态 Transformer 注入到每个动作时间步。动作序列有明显的长程依赖，如果使用标准二次复杂度注意力，长动作会很贵；因此论文采用线性注意力近似，将注意力写成：
$$
\text{Attn}(Q,K,V)=\frac{\phi(Q)(\phi(K)^\top V)}{\phi(Q)(\phi(K)^\top \mathbf{1})}
$$
其中 $\phi(\cdot)$ 是核特征映射。这样可以在文本 token 和动作 token 之间做高效交互。

MotionDiffuse 的一个亮点是利用扩散采样过程做控制。由于每一步都有带噪动作表示，用户可以固定某些身体部位、对不同噪声进行插值，或在不同时间段给出不同文本条件，从而得到部位编辑、动作过渡和语义组合效果。这些能力在 VAE 一次性采样框架中通常需要额外设计。

与 MDM 相比，MotionDiffuse 更早明确聚焦“文本驱动”动作生成，并强调跨模态条件融合；MDM 则更强调统一任务、classifier-free guidance 和直接预测 $x_0$ 带来的几何损失。两者共同推动了 2022 年后文本到动作生成从 VAE/Transformer 迁移到扩散范式。

```text
Algorithm: MotionDiffuse text-to-motion generation
Input: text prompt y, motion length T, diffusion steps K
Training:
  1. Encode text y into token embeddings e_y
  2. Sample clean motion x_0 and diffusion step t
  3. Add noise epsilon to obtain x_t
  4. Fuse x_t, t and e_y with Cross-Modality Linear Transformer
  5. Predict epsilon_hat and minimize ||epsilon - epsilon_hat||^2
Sampling:
  1. Initialize x_K ~ N(0, I)
  2. For k = K down to 1, predict denoising direction conditioned on y
  3. Sample x_{k-1} using the DDPM reverse transition
  4. Optionally impose body-part or time-varying prompt constraints
Output: text-conditioned 3D human motion
```

#### 🧪 小练习
```yaml
exercise:
  question: MotionDiffuse 的跨模态线性 Transformer 解决了文本到动作生成中的哪两个问题？
  hint: 分别从文本-动作对齐和长序列注意力复杂度角度回答。
```
