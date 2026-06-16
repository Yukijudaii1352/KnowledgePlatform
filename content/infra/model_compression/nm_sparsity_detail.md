### N:M Sparsity

```yaml
id: nm_sparsity
name: N:M Sparsity
full_name: N:M细粒度稀疏 (N:M Sparsity)
year: 2021
org: NVIDIA
paper_url: https://arxiv.org/abs/2102.04010
category: sparsity_deploy
parent: —
motivation: 硬件原生2:4稀疏兼顾精度与加速
```

#### 📝 一句话总结

N:M Sparsity 将每 \(M\) 个连续权重约束为最多 \(N\) 个非零值，并用 SR-STE 从头训练这种细粒度结构稀疏网络，解决了非结构化稀疏难以硬件加速、粗粒度结构稀疏精度损失大的矛盾。典型的 NVIDIA Ampere 2:4 形式让稀疏模式可以被 Sparse Tensor Core 直接利用，把规则稀疏转化为真实矩阵乘吞吐收益。

#### 🎯 核心要点

- 定义 N:M 细粒度结构稀疏：每个连续 \(M\) 权重组中最多 \(N\) 个非零，兼具局部规则性和细粒度表达能力
- 典型 2:4 模式适配 NVIDIA Ampere Sparse Tensor Core，权重矩阵压缩为非零值加少量索引元数据
- 使用在线幅值投影 \(S(W,N,M)\)，前向时在每组内保留幅值最大的 \(N\) 个权重并生成稀疏子网络
- 从头训练稀疏网络，避免 ASP 类“两阶段稠密训练 + 剪枝 + 重训”的额外训练成本
- 用 STE 近似不可导 top-k/mask 操作，但指出 vanilla STE 会造成稀疏拓扑频繁震荡
- 提出 Sparse-Refined Straight-Through Estimator (SR-STE)，只对被剪权重加入稀疏修正项，稳定 mask
- 定义 Sparse Architecture Divergence (SAD) 度量二值稀疏 mask 在训练过程中的拓扑变化
- 在 ImageNet、检测、分割、光流、机器翻译等任务上验证 N:M + SR-STE 的通用性

#### 🔬 深入细节

![2:4 structured sparsity pattern and compression](https://developer-blogs.nvidia.com/wp-content/uploads/2023/06/2-4-structured-sparsity-pattern.png)
*图：NVIDIA 官方技术博客中的 2:4 结构化稀疏压缩示意。论文 Figure 1 也展示了同一核心机制：连续权重分组、按组剪枝、压缩为非零值与索引元数据后交给专用稀疏计算单元。*

```python
# N:M sparsity with SR-STE: 从头训练而非先训练稠密模型
for x, y in train_loader:
    sparse_params = {}
    masks = {}

    for name, W in model.named_weights():
        group = W.reshape(-1, M)
        # 每组保留幅值最大的 N 个；其余权重前向中置零
        mask_group = topk_abs_mask(group, k=N)
        masks[name] = mask_group.reshape_as(W)
        sparse_params[name] = W * masks[name]

    logits = model.forward_with(sparse_params, x)
    loss = criterion(logits, y)
    loss.backward()

    for name, W in model.named_weights():
        pruned_mask = 1 - masks[name]
        # vanilla STE: W.grad 直接来自稀疏子网络
        # SR-STE: 对当前被剪权重加入 lambda_W * W，推动它们继续变小
        W.grad = W.grad + lambda_W * pruned_mask * W

    optimizer.step()
    optimizer.zero_grad()
```

论文的核心切入点是“稀疏的表达粒度”和“稀疏的硬件可执行性”之间的折中。非结构化稀疏可以在任意位置置零，因此给优化器留下的自由度最大，但非零索引分布不规则，GPU 上的加载、调度和矩阵乘都很难稳定跳过零值。通道剪枝、块剪枝等粗粒度结构化稀疏更容易映射到硬件，却一次删除整组通道或子结构，常常把可用表达能力一并删掉。N:M 稀疏位于中间：它只要求局部连续 \(M\) 个权重中最多 \(N\) 个非零，约束足够规则，硬件能压缩存储和调度；同时组很小，模型仍可在每个局部组内选择最重要连接。

N:M 投影可写成一个带约束的训练目标：

$$
\min_{S(W,N,M)} \mathcal{L}(W;\mathcal{D})
$$

其中 \(S(W,N,M)\) 表示满足 N:M 约束的稀疏参数。对任意长度为 \(M\) 的连续权重组 \(\mathbf{w}=(w_1,\ldots,w_M)\)，前向投影保留幅值最大的 \(N\) 个元素：

$$
\tilde{w}_i =
\begin{cases}
w_i, & |w_i| \ge \xi_N(\mathbf{w}) \\
0, & |w_i| < \xi_N(\mathbf{w})
\end{cases}
$$

\(\xi_N(\mathbf{w})\) 是组内第 \(N\) 大幅值阈值。2:4 是最常见的硬件形态，可简写为 \(\|\mathbf{w}_{k:k+4}\|_0 \le 2\)。部署时，原始 \(R\times C\) 权重矩阵可以压缩为约一半的非零数据值，以及每组用于标识保留位置的 \(\log_2 M\) 位索引；Sparse Tensor Core 读取这种规则元数据后执行稀疏矩阵乘。

训练难点在于 top-k mask 是离散投影，普通反向传播无法对“谁被保留”直接求导。论文先用 STE 让稀疏子网络的梯度直接回传到稠密影子权重：

$$
W_{t+1} \leftarrow W_t-\gamma_t g(\tilde{W}_t)
$$

问题是 \(\tilde{W}_t=S(W_t,N,M)\) 和 \(W_t\) 不一致：未被保留的权重前向中是 0，反向更新的却是原始稠密变量。这样得到的梯度对被剪权重尤其粗糙，可能把原本应保持为 0 的权重重新推大，下一步 top-k 又换掉一批连接，造成稀疏架构来回震荡。

SR-STE 的修正项正是为了解决这种震荡。令 \(E_t\) 是当前保留权重的二值 mask，\(\bar{E}_t=1-E_t\) 表示当前被剪权重，更新式变为：

$$
W_{t+1}=W_t-\gamma_t\left(g(\tilde{W}_t)+\lambda_W(\bar{E}_t\odot W_t)\right)
$$

当 \(\lambda_W=0\) 时退化为 vanilla STE；当 \(\lambda_W>0\) 时，额外项只作用在被剪权重上，把它们继续向 0 收缩。直觉上，当前被剪掉的连接如果仍被大幅更新，就会在下一次分组 top-k 中重新挤进保留集合；SR-STE 降低这种翻转概率，让 sparse architecture 更稳定。

为了量化这种稳定性，论文定义了 Sparse Architecture Divergence：

$$
\mathrm{SAD}_{i:j}=\|E_j-E_i\|_1
$$

它统计两次迭代之间二值 mask 的连接状态变化数量。SAD 小不等于永远不更新结构，而是说明结构变化更受控；论文实验显示，vanilla STE 的 SAD 更高且精度明显低于稠密模型，而 SR-STE 在合适 \(\lambda_W\) 下能降低 SAD，使稀疏网络精度回到接近稠密网络的水平。

> 💡 关键：N:M 的价值不只是“参数更少”，而是把局部稀疏模式固定到硬件能识别的形状；SR-STE 则让这种形状可以从头训练出来，而不是依赖昂贵的稠密预训练和剪枝重训。

和 ASP 这类两阶段方法相比，论文的训练路径更直接：每个 step 都在前向生成 N:M 子网络，用稀疏子网络计算损失，再用 SR-STE 更新背后的稠密权重。这样省去了“稠密训练收敛后再剪枝再训练”的额外成本，同时保留了部署时所需的 2:4 或其他 N:M 格式。与动态稀疏训练相比，它不需要任意位置 regrow，而是在每个连续组内竞争名额；这使得最终模型天然满足硬件格式，不需要部署前再做复杂转换。

实际应用中，N:M 的约束通常施加在卷积和线性层权重上，第一层、归一化层或少数敏感层可以按任务选择保留稠密。2:4 和 4:8 都是 50% 稀疏，但硬件支持、索引编码和精度表现不同；1:4 或 2:8 更激进，FLOPs 更低但表达损失更大。论文给出的经验是：N:M 比“随意剪掉一半权重”更受限，但比删除整通道温和得多，适合与量化、蒸馏、TensorRT/cuSPARSELt 等部署链路组合。

#### 🧪 练习题

```yaml
question: "SR-STE 相比 vanilla STE 在训练 N:M 稀疏网络时主要解决什么问题？"
options:
  - "用额外项约束当前被剪权重，减少稀疏 mask 的无效震荡"
  - "取消 N:M 分组，让权重可以任意非结构化剪枝"
  - "把所有被剪权重永久冻结，训练中不再更新任何参数"
  - "只在推理阶段压缩权重，不影响训练"
answer: 0
explain: "SR-STE 在 STE 梯度中加入 \\(\\lambda_W(\\bar{E}_t\\odot W_t)\\)，只惩罚当前被剪权重，从而降低 SAD 并稳定稀疏拓扑。"
```
