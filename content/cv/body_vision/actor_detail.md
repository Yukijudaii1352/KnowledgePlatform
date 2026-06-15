### ACTOR：用 Transformer-VAE 生成变长动作序列

```yaml
id: actor
name: ACTOR
full_name: 动作Transformer (Action-Conditioned Transformer)
year: '2021'
org: INRIA
paper_url: https://openaccess.thecvf.com/content/ICCV2021/html/Petrovich_Action-Conditioned_3D_Human_Motion_Synthesis_With_Transformer_VAE_ICCV_2021_paper.html
category: motion
parent: action2motion
motivation: Transformer与VAE结合处理变长序列生成
```

#### 📝 一句话总结
ACTOR 将动作类别条件 VAE 从循环网络升级为 Transformer 架构，用一个序列级潜变量控制整段运动，并通过非自回归解码自然支持可变长度 3D 动作生成。

#### 🎯 核心要点
- **架构升级**：用 Transformer encoder / decoder 替代 RNN，减少长序列递归生成中的误差累积。
- **序列级潜变量**：整段动作共享一个 $z$，使生成结果在全局动作风格、速度和幅度上更一致。
- **变长处理**：解码器以时间位置编码作为查询，给定目标长度即可一次性生成 $T$ 帧，不需要逐帧自回归。
- **条件方式**：动作类别作为条件 token 或嵌入进入 Transformer，使不同类别的潜空间与解码轨迹分离。
- **相对 Action2Motion 的进步**：更强的长程建模能力和并行解码能力，使 HumanAct12、UESTC 等类别动作数据上的质量与多样性更好。
- **主要局限**：仍然依赖离散动作类别，无法表达自然语言细粒度约束；VAE 框架也可能牺牲高频姿态细节。

#### 🔬 深入细节
![ACTOR pipeline](https://ar5iv.labs.arxiv.org/html/2104.05670/assets/fig/pipeline.png)

ACTOR 的核心思想是把“动作序列”当作 Transformer 可以整体编码和整体解码的对象，而不是让 RNN 从第一帧递归到最后一帧。编码端接收姿态序列、动作类别和用于估计分布的特殊 token，输出潜变量分布参数 $\mu,\sigma$；训练时通过重参数化采样 $z$，推理时从标准正态或类别条件空间采样。

解码端的设计是 ACTOR 区别于自回归模型的重点。它不输入前一帧姿态，而是输入一组时间查询 token，查询中包含帧位置编码和动作类别信息；Transformer decoder 将这些查询与潜变量表示交互后，一次性输出 $T$ 帧姿态。因此，生成长度不是由循环展开次数被动决定，而是由输入的时间查询数量主动控制。

从概率建模角度看，ACTOR 仍然是条件 VAE：
$$
q_\phi(z\mid x_{1:T},c)=\mathcal{N}(\mu_\phi,\sigma_\phi^2 I),\quad
p(z)=\mathcal{N}(0,I)
$$
$$
\hat{x}_{1:T}=D_\theta(z,c,T),\quad
\mathcal{L}=\lVert x_{1:T}-\hat{x}_{1:T}\rVert+\beta D_{KL}(q_\phi(z\mid x,c)\|p(z))
$$
其中 $D_\theta$ 是 Transformer 解码器。若把第 $t$ 帧查询写成 $r_t=\text{PE}(t)+e_c$，则可抽象为：
$$
h_t=\text{TransformerDecoder}(r_t, z),\quad \hat{x}_t=W h_t
$$

这种非自回归生成带来两个好处：一是训练和推理可以并行处理所有帧；二是模型看到整段时间位置后，能更好地保持全局节奏。但它也意味着局部动力学不是通过“上一帧约束下一帧”显式保证的，脚接触、速度连续等物理细节仍需数据分布和损失间接约束，后来的 MDM 才进一步把几何损失和扩散采样引入这个问题。

```text
Algorithm: ACTOR motion generation
Input: action class c, target length T
Training:
  1. Embed each pose frame and add positional encoding
  2. Feed motion tokens, class token and distribution tokens to Transformer encoder
  3. Read mu and sigma, then sample z with reparameterization
  4. Build T temporal query tokens conditioned on class c
  5. Decode all T frames in parallel using Transformer decoder and latent z
  6. Optimize reconstruction loss plus KL regularization
Inference:
  1. Sample z ~ N(0, I)
  2. Choose class c and length T
  3. Decode temporal queries into a complete motion sequence
Output: action-conditioned 3D motion
```

#### 🧪 小练习
```yaml
exercise:
  question: ACTOR 为什么可以生成可变长度动作，而传统固定长度 VAE 往往不方便做到这一点？
  hint: 关注 Transformer decoder 的时间查询 token 数量与输出帧数之间的关系。
```
