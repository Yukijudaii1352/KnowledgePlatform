### SFed-LoRA
```yaml
id: sfed_lora
name: SFed-LoRA
full_name: 联邦学习低秩适配 (SFed-LoRA)
year: '2026.03'
org: HKU
paper_url: https://arxiv.org/abs/2603.08058
category: frontier
parent: lora
motivation: 缩放因子缓解联邦学习秩不匹配
```

#### 📝 一句话总结
SFed-LoRA 针对联邦 LoRA 中客户端聚合会改变低秩更新方差、导致高 rank 梯度塌缩的问题，推导出 \(\gamma_z=\alpha\sqrt{N/r}\) 缩放因子来同时补偿客户端数 \(N\) 和 rank \(r\) 的影响。

#### 🎯 核心要点
- 基于 FedSA-LoRA 的 split aggregation：客户端上传并聚合 \(A\)，本地保留 \(B\)，降低聚合 \(BA\) 时的代数不一致。
- 指出标准 LoRA \(\gamma=\alpha/r\) 在高 rank 下会过度缩小更新，rsLoRA \(\alpha/\sqrt r\) 又忽略了联邦聚合中的客户端数。
- 推导 federated-stabilized adapter 条件，要求 forward/backward 的矩统计在 \(N,r\) 变化下保持稳定。
- 提出联邦最优缩放 \(\gamma_z=\alpha\sqrt{N/r}\)，补偿聚合平均导致的方差变化。
- 不改变模型结构和推理延迟，只改变本地 LoRA 计算中的缩放因子。

#### 🔬 深入细节
![SFed-LoRA 框架图](https://arxiv.org/html/2603.08058/figure/sfedlora-mainfig.jpg)
*图源：arXiv HTML Figure 1。客户端只上传 \(A\)，本地保留 \(B\)，并在本地计算中使用 \(\gamma_z=\alpha\sqrt{N/r}\)。*

```python
# SFed-LoRA 联邦训练伪代码
server_A = init_global_A()
for client i in clients:
    A_i = server_A.copy()
    B_i = init_or_keep_local_B(i)

for round in range(R):
    uploaded_A = []
    for client i in sample_clients(N):
        A_i = server_A.copy()
        gamma_z = alpha * sqrt(N / rank)
        for local_step in range(E):
            h = W0 @ x + gamma_z * B_i @ A_i @ x
            loss = task_loss(h, y)
            update(A_i, B_i, loss)
        uploaded_A.append(A_i)

    server_A = average(uploaded_A)
    broadcast(server_A)
    # B_i 不上传，继续作为客户端私有适配矩阵
```

LoRA 的基础前向为：

$$
h=W_0x+\gamma BAx
$$

标准 LoRA 取 \(\gamma=\alpha/r\)，rsLoRA 在单机场景中改为 \(\gamma_r=\alpha/\sqrt r\)。SFed-LoRA 指出，联邦学习不是单机训练的简单复制：服务器会对多个客户端的低秩参数做平均，聚合会引入随客户端数 \(N\) 缩放的统计方差变化，因此只考虑 rank 的缩放仍然不够。

FedSA-LoRA 先解决“聚合什么”的问题。因为一般情况下：

$$
\frac{1}{N}\sum_i B_iA_i \neq
\left(\frac{1}{N}\sum_iB_i\right)
\left(\frac{1}{N}\sum_iA_i\right)
$$

如果同时平均 \(A\) 和 \(B\)，再相乘得到的全局增量并不等于客户端增量平均。FedSA-LoRA 因此只聚合 \(A\)，让 \(B_i\) 留在客户端本地，既减少部分隐私/个性化信息上传，也避免矩阵乘积平均的代数误差。SFed-LoRA 在这个框架上进一步修正缩放因子。

论文定义 \((N,r)\)-federated-stabilized adapter：当输入和反向梯度的矩统计在客户端数和 rank 维度上都是 \(\Theta_N(1),\Theta_r(1)\) 时，适配器输出和反传梯度也应保持同阶。通过渐近分析得到：

$$
\gamma_z=\alpha\sqrt{\frac{N}{r}}
$$

其中 \(N\) 补偿服务器平均多个客户端 \(A_i\) 后的方差收缩，\(r\) 维持高 rank 低秩通道的稳定尺度。

这解释了为什么高 rank 在联邦 LoRA 中可能“不升反降”。理论上更高 rank 提供更大表达能力，但若缩放因子过小，梯度范数会塌缩，新增通道学不到有效更新；若忽略客户端数，聚合后的信号也可能偏弱。SFed-LoRA 让 rank 增大时仍能保持合理梯度，同时随参与客户端数自动放大聚合后的适配信号。

> 💡 关键：SFed-LoRA 的改动很小，但目标很具体：不是新 adapter 架构，而是让联邦聚合后的 LoRA 更新在 rank 和客户端数变化下保持方差稳定。

#### 🧪 练习题
```yaml
question: "SFed-LoRA 的缩放因子为什么包含客户端数 N？"
options:
  - "因为客户端数决定 tokenizer 大小"
  - "因为联邦聚合会改变适配矩阵的方差，N 需要被纳入稳定性补偿"
  - "因为 N 等于 LoRA rank"
  - "因为服务器必须训练 N 个基座模型"
answer: 1
explain: "客户端参数平均会带来随 N 变化的统计尺度，SFed-LoRA 用 alpha*sqrt(N/r) 同时补偿客户端聚合和 rank 扩展。"
```
