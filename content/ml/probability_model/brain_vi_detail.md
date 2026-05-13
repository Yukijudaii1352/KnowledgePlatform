### Brain-like Variational Inference (iP-VAE)

```yaml
id: brain_vi
name: iP-VAE
full_name: "类脑变分推断 (Brain-like Variational Inference)"
year: "2024"
org: UC Berkeley
paper_url: "https://arxiv.org/abs/2410.19315"
category: foundation
parent: VAE
motivation: "从变分自由能最小化出发，通过自然梯度+在线+迭代三条处方推导出类脑神经动力学，统一稀疏编码与VAE"
```

#### 📝 一句话总结

iP-VAE 通过对变分自由能施加自然梯度下降、在线更新和迭代精炼三条约束（FOND框架），从第一性原理推导出膜电位动力学方程，其中自然涌现前馈驱动、循环解释消除和除法归一化等经典神经回路计算，在重建-稀疏性权衡上优于摊销VAE且参数量减少25倍。

#### 🎯 核心要点

- FOND框架将变分推断设计空间分为"灵活选择"（分布族、参数化）和"固定处方"（自然梯度、在线、迭代），后者唯一确定推断动力学
- 选择Poisson后验/先验 + 高斯似然 + 线性解码器，Fisher预条件化使指数因子精确对消，得到线性膜电位动力学
- 核心方程 \(\dot{u} \propto \Phi^T x - \Phi^T\Phi z - \beta(u - u_0)\)：三项分别为前馈驱动、循环抑制、稳态泄漏
- 在线设置下KL泄漏项消失（单步更新极限），循环权重矩阵 \(W = \Phi^T\Phi\) 自然产生除法归一化
- 脉冲 \(z \sim \text{Pois}(e^u)\) 为整数值，神经元通过离散脉冲而非连续膜电位通信，比标准预测编码更符合生物学
- iP-VAE学习V1-like Gabor滤波器，达到最优重建-稀疏性Pareto前沿（R²=0.83, 77%零值）
- 统一预测编码（PC）、稀疏编码（LCA）、摊销VAE为同一框架下的不同实例化

#### 🔬 深入细节

![iP-VAE推断动力学与模型架构](https://arxiv.org/html/2410.19315v2/extracted/19954040/figs/fig1_model_overview.png)

*图：iP-VAE的推断过程。膜电位u通过自然梯度下降在自由能景观中演化，经指数非线性产生发放率r=exp(u)，再Poisson采样得到整数脉冲z。迭代过程中预测误差(x−Φz)驱动u更新直至收敛到吸引子。*

![FOND框架模型统一树](https://arxiv.org/html/2410.19315v2/extracted/19954040/figs/fig2_model_tree.png)

*图：FOND框架下的模型统一树。从自由能最小化出发，通过不同分布选择和推断方式可推导出PC、LCA、标准VAE和iP-VAE等模型。*

```python
# iP-VAE 推断与学习算法伪代码
# ================================================
# 输入: 数据流 {x_t}, 字典 Φ ∈ R^{M×K}, 训练步数 T_train
# 输出: 学习后的字典 Φ, 脉冲表示 z

def ipvae_inference_online(x, Phi, u_prev, T_steps):
    """单帧在线迭代推断 (eq.7)"""
    u = u_prev.clone()  # 上一时刻后验作为当前先验
    drive = Phi.T @ x   # 前馈驱动 (仅计算一次)
    W = Phi.T @ Phi      # 循环权重矩阵

    for t in range(T_steps):
        rate = torch.exp(u)          # 发放率 r = exp(u)
        z = torch.poisson(rate)      # 整数脉冲 z ~ Pois(r)
        u = u + drive - W @ z        # 在线更新 (KL项消失)
        # 等价于: u += Φᵀ(x - Φz)   即预测误差驱动
    return z, u

def ipvae_train(dataloader, Phi, K=512, T_train=16, beta=1.0, lr=1e-3):
    """iP-VAE训练: 通过时间反向传播更新字典"""
    optimizer = Adam([Phi], lr=lr)
    u_running = torch.zeros(K)

    for x_batch in dataloader:
        loss_accum = 0
        u = u_running.clone()
        u0 = u.clone()

        for t in range(T_train):
            rate = torch.exp(u)
            z = poisson_reparameterize(rate)  # 可微Poisson采样
            recon_loss = 0.5 * ((x_batch - Phi @ z) ** 2).sum()
            kl_loss = beta * (rate * (u - u0) - (rate - torch.exp(u0))).sum()
            loss_accum += recon_loss + kl_loss
            with torch.no_grad():
                u = u + Phi.T @ x_batch - Phi.T @ Phi @ z - beta * (u - u0)

        optimizer.zero_grad()
        loss_accum.backward()  # 梯度累积跨T_train步 (类似BPTT)
        optimizer.step()
        u_running = u.detach()

    return Phi
```

**动机与背景：从感知即推断到神经动力学。** 大脑如何从嘈杂的感官输入中推断外部世界的隐含状态？贝叶斯脑假说认为感知就是变分推断——大脑维护一个关于世界的内部模型，并通过最小化变分自由能来更新信念。然而，现有的变分推断实现（如摊销VAE使用前馈编码器一次性输出后验参数）缺乏生物学合理性：真实神经元通过循环连接和迭代动力学逐步精炼表征。本文的核心问题是：能否从变分推断的第一性原理出发，推导出与真实神经回路一致的推断动力学？

**核心机制：FOND框架的三条处方与Fisher对消。** FOND框架的关键创新在于将推断算法的设计分解为两个正交维度。"灵活选择"包括后验/先验分布族（Poisson、Gaussian等）和参数化方式（自然参数、均值参数等），这些决定了模型的表达能力。"固定处方"则包含三条不可违背的约束：(1) **自然梯度**——在Fisher信息度量下进行最速下降，保证参数更新与分布流形的几何结构一致；(2) **在线**——当前后验成为下一时刻先验，捕捉时间连续性；(3) **迭代**——允许多步精炼而非一次性推断。对于iP-VAE，选择Poisson后验 \(q(z|x) = \prod_i \text{Pois}(z_i; e^{u_i})\) 后，自由能梯度为 \(\nabla_u F = e^u \odot [-\Phi^T(x-\Phi z) + \beta(u-u_0)]\)，其中 \(e^u\) 来自链式法则。而Poisson分布在对数速率参数化下的Fisher矩阵恰好是 \(G(u) = \text{diag}(e^u)\)。自然梯度 \(G^{-1}\nabla_u F\) 中两个 \(e^u\) 精确对消，得到线性动力学——这个"Fisher对消"是整个推导最优美的数学结果。

**在线推断与除法归一化的涌现。** 在线设置下（\(u_0 \leftarrow u\)），单步更新极限使KL项 \(\beta(u-u_0) \to 0\) 消失，得到极简更新规则 \(u_{t+1} = u_t + \Phi^T x - \Phi^T\Phi z_t\)。将此从膜电位空间变换到发放率空间 \(r = e^u\)，得到乘性更新：

$$r_{t+1,i} = r_{t,i} \cdot \frac{\exp(\Phi^T x)_i}{\exp(W_{ii} z_{t,i}) \cdot \prod_{j \neq i} \exp(W_{ij} z_{t,j})}$$

分母呈现经典的**除法归一化**（divisive normalization）形式——大脑皮层中最普遍的计算原语。对角项 \(W_{ii} = \|\Phi_{\cdot i}\|^2\) 提供自抑制（防止过度激活），非对角项 \(W_{ij} = \Phi_{\cdot i}^T \Phi_{\cdot j}\) 基于调谐相似性提供侧抑制（重叠感受野的神经元相互竞争）。这种竞争机制同时实现了稀疏化和稳定化，无需额外的正则化设计。

**与传统方法的关键区别。** 与标准预测编码（PC）相比，iP-VAE的循环交互通过离散脉冲z而非连续膜电位u进行，更符合真实神经元的通信方式。与摊销VAE相比，iP-VAE无需训练编码器网络（参数量减少25倍），且通过权重复用（同一字典Φ用于所有迭代步）实现"随机深度"——测试时可运行任意多步以提升精度。与LCA稀疏编码相比，iP-VAE引入了概率采样（脉冲的随机性），使其成为真正的生成模型，可计算似然和进行后验采样。

> 💡 关键：Fisher预条件化不仅是数学技巧，它使得推断动力学从非线性（含\(e^u\)）变为线性，这正是为什么真实神经元的膜电位动力学可以用线性微分方程近似描述的理论基础。

#### 🧪 练习题

```yaml
question: "iP-VAE中自然梯度下降的核心作用是什么？"
options:
  - "加速训练收敛，减少所需迭代步数"
  - "对消Poisson参数化中的指数因子，使膜电位动力学变为线性"
  - "引入除法归一化机制，实现神经元间侧抑制"
  - "消除KL散度项，简化在线更新规则"
answer: 1
explain: "Poisson分布在对数速率参数化下的Fisher矩阵G(u)=diag(exp(u))，与梯度中的exp(u)因子精确对消，将非线性动力学简化为线性膜电位更新方程eq(6)。"
```