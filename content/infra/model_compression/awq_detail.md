### AWQ

```yaml
id: awq
name: AWQ
full_name: "AWQ: Activation-aware Weight Quantization for On-Device LLM Compression and Acceleration"
year: 2024
org: MIT
paper_url: https://arxiv.org/abs/2306.00978
category: quantization
parent: ptq
motivation: >
  LLM 推理受限于显存和带宽，weight-only 量化是降低部署成本的关键手段。
  现有 PTQ 方法（如 GPTQ）依赖逐层重建/回归，容易过拟合校准集，
  且对指令微调模型和多模态模型泛化性差。AWQ 从"激活感知"出发，
  以极低成本找到最优 per-channel 缩放因子来保护 salient weights，
  无需反向传播即可实现优于 GPTQ 的量化精度，并首次将量化扩展到 VLM。
```

#### 📝 一句话总结

AWQ 通过观察激活分布识别 1% 的关键权重通道，利用 per-channel scaling（而非混合精度）在量化前放大这些通道的有效位宽，仅需网格搜索一个超参 $\alpha$ 即可在 INT3/INT4 下取得优于 GPTQ 的精度，且天然泛化到指令微调模型和视觉语言模型。

#### 🎯 核心要点

- **核心观察**：LLM 权重中存在约 1% 的 salient channels，其重要性由**激活幅度**（而非权重幅度）决定；跳过这 1% 的量化即可大幅恢复精度（OPT-6.7B INT3 PPL 从 43.2 降至 13.0）
- **关键创新**：用 per-channel scaling $\mathbf{s} = \mathbf{s}_X^\alpha$ 在量化前放大 salient channels，等价地缩小量化相对误差，避免了混合精度的硬件不友好问题
- **无需训练**：不依赖反向传播或逐层重建，仅在校准集上测量平均激活幅度 + 网格搜索 $\alpha \in [0,1]$（grid size=20），极度数据高效（16 条序列即可）
- **泛化性强**：不过拟合校准集分布，跨域 PPL 仅增 0.5-0.6（GPTQ 增 2.3-4.9）；首次成功量化 VLM（OpenFlamingo-9B、LLaVA-13B）
- **系统加速**：TinyChat 推理引擎在 INT4 下实现 3.2-3.3× speedup over HF FP16；Llama-2-70B 可部署在单块 Jetson Orin 64GB 上

#### 🔬 深入细节

##### 方法概览

![AWQ 方法示意图](https://arxiv.org/html/2306.00978v2/x1.png)

**Figure 1**：左图为直接 RTN 量化（PPL=43.2），中图为保留 1% salient weights 为 FP16（PPL=13.0，但硬件不友好），右图为 AWQ per-channel scaling 方案（PPL 接近混合精度，且硬件友好）。

##### 算法伪代码

```
Algorithm: AWQ — Activation-aware Weight Quantization
Input: 预训练权重 W ∈ R^{c_o × c_i}, 校准集激活 X ∈ R^{c_i × T}
Output: 量化后权重 Q(W')

1. 计算每通道激活均值: s_X(j) = mean(|X[j,:]|)   // j = 1..c_i
2. 网格搜索最优 α:
   for α in linspace(0, 1, 20):
       s = s_X^α                          // per-channel scaling factor
       W' = W · diag(s)                    // 放大 salient channels
       X' = diag(s⁻¹) · X                 // 等价缩小输入（数学恒等）
       loss(α) = ||Q(W') · X' - W · X||   // 量化误差（MSE）
3. α* = argmin loss(α)
4. s* = s_X^{α*}
5. 返回 Q(W · diag(s*))，推理时输入乘 diag(s*⁻¹) 或融合到前层
```

##### 数学推导

**量化误差分析**：对权重组 $\mathbf{w}$，量化函数为：

$$Q(\mathbf{w}) = \Delta \cdot \text{Round}\!\left(\frac{\mathbf{w}}{\Delta}\right), \quad \Delta = \frac{\max(|\mathbf{w}|)}{2^{N-1}}$$

输出误差为 $\text{Err}(Q(\mathbf{w})) = \Delta \cdot \text{RoundErr}\!\left(\frac{\mathbf{w}}{\Delta}\right) \cdot \mathbf{x}$。

**Scaling 的作用**：对第 $j$ 个输入通道乘以缩放因子 $s_j > 1$，权重变为 $w_j \cdot s_j$，输入变为 $x_j / s_j$（数学恒等变换）。量化误差变为：

$$\text{Err}(w_j \cdot s_j) \cdot \frac{x_j}{s_j} \approx \frac{\Delta}{s_j} \cdot \text{RoundErr} \cdot x_j$$

即 salient channel 的量化误差被缩小了 $s_j$ 倍。但 $s_j$ 过大会增大 $\Delta$（因为 $\max(|\mathbf{w}|)$ 变大），损害非 salient channels。因此需要搜索最优 $\alpha$：

$$\alpha^* = \arg\min_{\alpha \in [0,1]} \; \mathcal{L}(\alpha) = \left\| Q\!\left(\mathbf{W} \cdot \text{diag}(\mathbf{s}_X^\alpha)\right) \left(\text{diag}(\mathbf{s}_X^{-\alpha}) \cdot \mathbf{X}\right) - \mathbf{W}\mathbf{X} \right\|$$

**Weight Clipping**：在 scaling 基础上，进一步对权重做 clipping 以缩小 $\Delta$：

$$\Delta' = \frac{\text{clip}(\max(|\mathbf{w}|), \; \beta)}{2^{N-1}}, \quad \beta < \max(|\mathbf{w}|)$$

Clipping 牺牲离群值精度换取整体更小的量化步长。

##### 与 GPTQ 的对比

| 维度 | AWQ | GPTQ |
|------|-----|------|
| **核心思路** | 激活感知 per-channel scaling | 基于 Hessian 的逐列权重重建 |
| **是否需要反向传播** | ❌ 不需要 | ❌ 不需要（但需要逐层矩阵分解） |
| **校准数据量** | 极少（16 条序列即可） | 较多（128-192 条序列） |
| **过拟合风险** | 低（仅测量激活均值） | 高（重建过拟合校准集分布） |
| **跨域泛化** | PPL 仅增 0.5-0.6 | PPL 增 2.3-4.9 |
| **VLM/指令微调支持** | ✅ 首次成功 | ⚠️ 泛化性差 |
| **INT3 LLaMA-7B PPL** | 6.35 | 8.81（需 reorder 降至 6.53） |
| **INT4 LLaMA-65B PPL** | 3.62 | 3.66 |
| **推理加速** | 3.2-3.3× (TinyChat) | 需额外 kernel 支持 |

##### 关键实验结果

**语言模型量化**（WikiText-2 PPL↓）：
- INT4-g128 LLaMA-65B：AWQ **3.62** vs GPTQ 3.66 vs RTN 3.67（FP16=3.53）
- INT3-g128 Llama-2-70B：AWQ **3.74** vs GPTQ 3.88 vs RTN 3.98（FP16=3.32）
- AWQ 在所有模型规模（7B-70B）和所有位宽（INT3/INT4）上一致优于 GPTQ

**视觉语言模型**（OpenFlamingo-9B COCO CIDEr↑）：
- INT4-g128 32-shot：AWQ **80.53** vs RTN 77.13 vs GPTQ 74.98（FP16=81.70）
- AWQ 将量化退化从 -4.57 降至 **-1.17**，实现 4× 压缩近乎无损

**系统效率**：
- TinyChat INT4 推理：3.2-3.3× speedup over HF FP16
- Llama-2-13B 在笔记本 RTX 4070 (8GB) 上达到 30 tokens/s
- Llama-2-70B 可部署在 NVIDIA Jetson Orin (64GB)

![AWQ 校准效率与泛化性](https://arxiv.org/html/2306.00978v2/x6.png)

**Figure 6**：左图显示 AWQ 仅需 16 条序列即可达到 GPTQ 192 条序列的精度；右图显示 AWQ 跨域校准仅增 0.5-0.6 PPL，而 GPTQ 增 2.3-4.9。

#### 🧪 练习题

```yaml
question: "AWQ 确定 salient weights 的依据是什么？"
options:
  A: "权重的 L2 范数大小"
  B: "对应输入激活通道的平均幅度"
  C: "权重梯度的大小"
  D: "Hessian 矩阵的对角元素"
answer: B
explanation: >
  AWQ 的核心发现是：权重的重要性应由其对应的输入激活幅度决定，
  而非权重自身的大小。实验表明基于权重 L2 范数选择的 FP16 通道
  几乎无法改善量化精度（与随机选择相当），而基于激活幅度选择的
  0.1%-1% 通道即可显著恢复性能。
```