### Action2Motion：面向动作类别的条件人体运动生成

```yaml
id: action2motion
name: Action2Motion
full_name: 动作类别生成 (Action-Conditioned Motion Generation)
year: '2020'
org: 中科院
paper_url: https://dl.acm.org/doi/abs/10.1145/3394171.3413635
category: motion
parent: motionvae
motivation: 基于动作类别引入Lie代数表示生成3D运动
```

#### 📝 一句话总结
Action2Motion 把动作类别作为条件输入到时序 VAE，并用 Lie 代数表示人体关节旋转，从而生成同一动作类别下长度可控、姿态连续且具有多样性的 3D 人体运动。

#### 🎯 核心要点
- **问题定位**：从“给定动作类别生成一段 3D 运动”切入，目标不是文本语义对齐，而是让同一类别下的采样结果有多样性且保持动作可识别。
- **表示选择**：用 Lie 代数参数化人体运动，将每个关节的刚体变换放在 $SE(3)$ / $\mathfrak{se}(3)$ 框架下，降低直接回归欧拉角或旋转矩阵带来的不连续与约束问题。
- **模型结构**：采用条件时序 VAE，识别网络估计后验 $q_\phi(z \mid x,c)$，先验网络估计 $p_\theta(z \mid c)$，生成器在动作类别、潜变量和时间步条件下输出完整序列。
- **训练目标**：核心是重建损失与 KL 正则，使潜空间既能解释训练运动，也能从类别条件先验中采样新动作。
- **历史价值**：它把早期 Motion VAE 的“连续潜空间”推进到动作类别条件生成，并为 ACTOR 等 Transformer-VAE 方法提供了直接对照基线。
- **主要局限**：条件粒度只有类别标签，语义表达能力弱于后来的文本驱动模型；VAE 也容易在复杂动作上产生均值化、脚滑和细节不足。

#### 🔬 深入细节
![Action2Motion framework](https://ar5iv.labs.arxiv.org/html/2007.15240/assets/x2.png)

Action2Motion 的关键假设是：动作类别 $c$ 决定运动的大体语义，而随机潜变量 $z$ 捕获同一类别下的风格、速度、幅度和个体差异。模型因此不直接学习一个确定性映射 $c \to x_{1:T}$，而是学习条件分布 $p(x_{1:T}\mid c)$，这使它能从同一个 “walk” 或 “jump” 标签采样出多条不同轨迹。

在运动表示上，论文使用 Lie 代数来描述关节运动。对一个刚体变换，可写成 $\xi=[\omega, v]\in\mathfrak{se}(3)$，并通过指数映射得到 $T=\exp(\hat{\xi})\in SE(3)$。这样做的好处是网络输出位于向量空间，训练时更容易做回归；而在前向运动学中又能恢复为合法的旋转/刚体变换。

模型本质上是一个条件变分自编码器。给定训练序列 $x_{1:T}$ 与动作类别 $c$，编码器估计后验：
$$
q_\phi(z\mid x_{1:T}, c)=\mathcal{N}(\mu_\phi(x,c), \sigma_\phi^2(x,c)I)
$$
先验网络估计类别条件先验：
$$
p_\theta(z\mid c)=\mathcal{N}(\mu_\theta(c), \sigma_\theta^2(c)I)
$$
解码器再生成 $\hat{x}_{1:T}=G_\psi(z,c,T)$。训练目标可概括为：
$$
\mathcal{L}=\mathcal{L}_{rec}(x,\hat{x})+\beta D_{KL}\left(q_\phi(z\mid x,c)\,\|\,p_\theta(z\mid c)\right)
$$
其中 $\mathcal{L}_{rec}$ 通常在关节旋转、关节位置或序列特征上计算。

与普通自回归 RNN 不同，Action2Motion 更强调“序列整体的条件潜变量”：$z$ 控制整段动作的全局变化，而每个时间步还会接收时间编码或递归状态来保证时序连续。这种设计让模型在短动作类别数据上比较有效，但当动作语义需要长程组合或语言描述时，类别标签会成为瓶颈。

```text
Algorithm: Action2Motion training and sampling
Input: motion sequence x[1:T], action class c
Training:
  1. Encode x[1:T] and c with recognition network to get mu_q, sigma_q
  2. Sample z = mu_q + sigma_q * epsilon, epsilon ~ N(0, I)
  3. Predict class prior mu_p, sigma_p from c
  4. Decode z, c and temporal states into motion x_hat[1:T]
  5. Minimize reconstruction loss plus KL(q(z|x,c) || p(z|c))
Sampling:
  1. Given action class c, sample z from p(z|c)
  2. Decode z and c for the desired length T
  3. Convert Lie algebra parameters to joint transforms by exponential map
Output: generated 3D human motion
```

#### 🧪 小练习
```yaml
exercise:
  question: 为什么 Action2Motion 要学习类别条件先验 p(z|c)，而不是统一使用标准正态先验 N(0,I)？
  hint: 比较不同动作类别在潜空间中的分布差异，以及采样时类别可控性的来源。
```
