### pFed1BS: 基于单比特随机草图的个性化联邦学习

```yaml
id: pfed1bs
tags: [federated_learning, personalization, communication_efficiency, one_bit_compression, random_sketching]
authors: [Jiacheng Cheng, Xu Zhang, Guanghui Qiu, Yifang Zhang, Yinchuan Li, Kaiyuan Feng]
year: 2025
venue: arXiv preprint
url: https://arxiv.org/abs/2511.13144
```

## 📝 一句话总结

pFed1BS通过双向单比特随机草图压缩实现极致通信效率的个性化联邦学习，客户端上传sign(Φw_k)，服务器广播全局共识sign向量v，并引入基于符号的正则化器引导局部模型与全局共识对齐。

## 🎯 核心要点

| 维度 | 内容 |
|------|------|
| 问题 | 联邦学习中同时面临双向通信开销过大和客户端数据异构两大挑战，现有方法无法同时解决 |
| 方案 | 提出bilevel优化框架：客户端最小化含sign正则化器的个性化目标，服务器通过加权多数投票聚合单比特草图 |
| 关键创新 | (1) 首次将个性化学习与双向1-bit通信联合建模为优化问题；(2) 基于sign的正则化器实现全局-局部对齐；(3) FHT将投影复杂度从O(mn)降至O(n log n) |
| 效果 | 在MNIST/FMNIST/CIFAR-10/CIFAR-100/SVHN上，以极低通信代价（m-bit双向）匹配或超越SOTA单比特FL算法，且额外提供个性化能力 |
| 局限 | 收敛到全局势函数的稳定邻域而非精确最优；压缩维度m的选择需权衡精度与通信量 |

## 🔬 深入细节

### 框架概览

![pFed1BS Framework](https://arxiv.org/html/2511.13144v1/x1.png)

**图1说明**：每轮t中，客户端接收全局1-bit共识向量v^t，执行R步局部SGD（含sign正则化器），然后将模型投影并量化为sign(Φw_k^{t+1})上传；服务器对所有客户端的1-bit向量加权聚合得到新的v^{t+1}广播。

### 核心算法伪代码

```
Algorithm 1: pFed1BS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Input: 总轮数T, 局部步数R, 学习率η, 正则化参数λ,μ
Server初始化: 模型w⁰, 随机种子I(广播给所有客户端), v⁰=0

for t = 0 to T-1 do:
    for k = 1 to K (并行) do:
        z_k^{t+1}, w_k^{t+1} ← ClientUpdate(k, w_k^t, v^t)
    end
    随机采样客户端子集 S^t
    服务器聚合: v^{t+1} = sign(Σ_{k∈S^t} p_k · z_k^{t+1})  // 加权多数投票
end

Function ClientUpdate(k, w_k^t, v^t):
    w_{k,0} = w_k^t
    for r = 0 to R-1 do:
        采样mini-batch B_{k,r}
        计算任务梯度: ∇f̂_k(w_{k,r}; B_{k,r})
        计算正则化梯度: Φᵀ(tanh(γΦw_{k,r}) - v^t)
        更新: w_{k,r+1} ← w_{k,r} - η(∇f̂_k + λ·Φᵀ(tanh(γΦw_{k,r})-v^t) + μ·w_{k,r})
    end
    return sign(Φw_{k,R}), w_{k,R}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

### 方法详解

**1. 优化框架与Sign正则化器**

pFed1BS的核心思想是将个性化联邦学习建模为一个bilevel优化问题。在客户端层面，每个客户端k最小化其个性化目标：

$$F_k(w_k; v) = f_k(w_k) + \lambda \tilde{g}(v, \Phi w_k) + \frac{\mu}{2}\|w_k\|_2^2$$

其中$f_k$为局部经验风险，$\tilde{g}$为sign正则化器，$\mu$项防止模型发散。sign正则化器的原始形式为$g(v, \Phi w_k) = \|[v \odot \Phi w_k]_-\|_1$，即惩罚投影模型sign与全局共识v不一致的维度。由于L1范数不可微，使用$h_\gamma(z) = \frac{1}{\gamma}\sum_i \log(\cosh(\gamma z_i))$进行平滑近似，得到可微的正则化梯度$\nabla\tilde{g} = \Phi^\top(\tanh(\gamma\Phi w_k) - v)$。当$\gamma\to\infty$时，$\tanh(\gamma\Phi w_k) \approx \text{sign}(\Phi w_k)$，梯度有效惩罚局部模型投影符号与全局共识的偏差。

在服务器层面，目标是找到最小化与所有客户端草图加权不一致度的共识向量：$\min_{v\in\{\pm1\}^m} \sum_k p_k g(v, z_k)$。关键结论（Lemma 1）表明该离散优化存在精确闭式解：$v^* = \text{sign}(\sum_k p_k z_k)$，即加权多数投票，这使得服务器聚合既最优又高效。

**2. 通信压缩机制**

pFed1BS实现了真正的双向极致压缩。上行方向：客户端将n维模型$w_k$通过随机投影$\Phi\in\mathbb{R}^{m\times n}$（$m\ll n$）降维后取sign，仅传输m个bit。下行方向：服务器广播m维的$v\in\{\pm1\}^m$，同样仅需m个bit。相比传统FL传输32n bit的全精度模型，pFed1BS的通信量降低了$32n/m$倍（双向）。这是Table 1中唯一同时具备上行维度压缩+1-bit量化、下行维度压缩+1-bit量化、以及个性化能力的方法。

**3. Fast Hadamard Transform加速**

直接使用稠密高斯随机矩阵$\Phi$进行投影需要O(mn)计算和存储，对大模型不可行。pFed1BS采用Subsampled Randomized Hadamard Transform (SRHT)替代：$\Phi w = S'HD\tilde{w}$，其中$D$为随机±1对角矩阵（sign flip），$H$为归一化Walsh-Hadamard矩阵，$S'=\sqrt{n'/m}\cdot S$为随机子采样矩阵。整个过程仅需：(1) 零填充到2的幂次长度；(2) 逐元素随机翻转O(n)；(3) Fast Hadamard Transform O(n log n)；(4) 随机选取m行O(m)。总复杂度O(n log n)，且所有客户端共享同一随机种子I即可复现相同的D和S，无需传输投影矩阵本身。反向传播中的$\Phi^\top$计算同样高效，为上述操作的逆序（填零→逆FHT→逆sign flip→截断）。

**4. 收敛性保证**

论文证明pFed1BS在标准假设（L-Lipschitz梯度、有界方差、有界异构性）下收敛到全局势函数$P = \sum_k p_k F_k(w_k; v)$的稳定邻域。收敛速率为$O(1/\sqrt{TR})$，其中T为通信轮数，R为局部步数。稳定邻域的大小由1-bit量化误差和数据异构性共同决定。

## 🧪 练习题

### 概念理解

1. **为什么sign正则化器使用$\|[v\odot\Phi w_k]_-\|_1$而非直接最小化Hamming距离$\|v - \text{sign}(\Phi w_k)\|_0$？**

<details><summary>答案</summary>
Hamming距离是离散的、不可微的，无法用于梯度优化。而$\|[v\odot\Phi w_k]_-\|_1$通过连续松弛实现了相同的语义：当$v_i$和$(\Phi w_k)_i$符号一致时，乘积为正，$[\cdot]_-=0$无惩罚；符号不一致时乘积为负，产生与偏差幅度成正比的惩罚。进一步通过log-cosh平滑后可直接计算梯度。
</details>

2. **服务器聚合为什么是加权多数投票sign(Σ p_k z_k)而非简单平均？**

<details><summary>答案</summary>
因为服务器目标是在离散域$\{±1\}^m$上最小化加权不一致度$\sum_k p_k g(v, z_k)$。由于$g(v,z_k)$对每个维度独立分解，最优解在每个维度上等价于选择使加权投票最大的符号，即sign(Σ p_k z_{k,i})。这是Lemma 1的精确闭式解，不是启发式设计。
</details>

### 深度思考

3. **如果将压缩维度m设为1，pFed1BS退化为什么？这对理解方法有何启示？**

<details><summary>答案</summary>
当m=1时，每个客户端仅上传1 bit信息（模型在某随机方向上的投影符号），服务器广播1 bit共识。此时sign正则化器仅约束模型在单一随机方向上的符号，信息量极度不足，个性化模型几乎完全由局部数据决定，全局协调能力极弱。这说明m是精度-通信的核心权衡参数：m越大，全局共识越丰富，但通信代价线性增长。
</details>

4. **pFed1BS中客户端保留完整的本地模型w_k而非共享模型参数，这与FedAvg的本质区别是什么？对收敛分析有何影响？**

<details><summary>答案</summary>
FedAvg中所有客户端趋向同一全局模型（通过参数平均），而pFed1BS中每个客户端维护独立的个性化模型，仅通过1-bit共识向量v进行"软约束"对齐。这意味着：(1) 不存在模型平均操作，避免了异构数据下的"客户端漂移"问题；(2) 收敛分析需要定义全局势函数P=Σp_k F_k(w_k;v)而非单一模型的损失，证明的是联合(w_1,...,w_K,v)的稳定性；(3) 1-bit量化引入的信息损失成为收敛邻域的不可消除项。
</details>