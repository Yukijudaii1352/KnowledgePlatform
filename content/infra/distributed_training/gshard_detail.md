### GShard

```yaml
id: gshard
name: GShard
full_name: "GShard: Scaling Giant Models with Conditional Computation and Automatic Sharding"
year: 2020
org: Google
paper_url: "https://arxiv.org/abs/2006.16668"
category: distributed_training
parent: "MoE / Sparsely-Gated MoE"
motivation: "通过条件计算（MoE）与轻量级自动分片注解，首次将 Transformer 扩展至 600B 参数，在 2048 TPU v3 上 4 天完成训练"
```

#### 📝 一句话总结

GShard 提出了一套基于 **稀疏门控混合专家（MoE）** 的条件计算方案与 **轻量级 SPMD 自动分片编译器**，仅需在模型代码中添加少量分片注解即可将 Transformer 扩展至 600B 参数，在 2048 块 TPU v3 上以亚线性通信开销完成训练，实现了 100+ 语言多语言翻译的 SOTA 质量。

#### 🎯 核心要点

- **MoE Transformer 架构**：每隔一层将 FFN 替换为 MoE 层（Position-wise），Encoder 和 Decoder 均适用，非 MoE 层参数全设备复制，MoE 层专家参数跨设备分片
- **Top-2 Expert Gating**：每个 token 选择 2 个专家，第一专家确定性派发，第二专家按门控权重概率随机派发（Random Routing），兼顾负载均衡与模型质量
- **Expert Capacity 机制**：设定每个专家的 buffer 上限 \(C = 2N / E\)（capacity factor 可调），溢出 token 通过残差连接直通，防止单专家过载
- **辅助负载均衡损失**：\(l_{aux} = c_e \cdot \sum_{i=1}^{E} f_i \cdot m_i\)，其中 \(f_i\) 为分配到专家 \(i\) 的 token 比例，\(m_i\) 为门控均值，鼓励均匀分配
- **GShard 分片 API**：仅 3 个注解原语 `replicate(tensor)`、`split(tensor, split_dim, num_partitions)`、`shard(tensor, device_assignment)` 即可描述分片策略
- **XLA SPMD Partitioner**：编译器自动从用户注解推断全图分片方案，插入 AllReduce / AllToAll 等集合通信，处理 halo exchange 与 padding，无需手写通信代码
- **规模验证**：600B 参数 MoE Transformer，2048 TPU v3，4 天处理 1T tokens，100 语言→英语翻译，高资源语言 BLEU 提升 13.5+，低资源语言获益于正向迁移

#### 🔬 深入细节

##### 核心架构图

![GShard MoE Transformer 架构](https://ar5iv.labs.arxiv.org/html/2006.16668/assets/transformer_encoder_moe_extension.png)
*图：MoE 层替换标准 Transformer 中每隔一层的 FFN，每个 MoE 层包含 E 个专家（独立的 FFN），由 Gating 网络决定 token 路由。非 MoE 层在所有设备上复制，MoE 专家跨设备均匀分片。*

![SPMD 分区方式](https://ar5iv.labs.arxiv.org/html/2006.16668/assets/x2.png)
*图：SPMD 分区——所有设备运行同一程序，通过数据分片实现并行，相比 MPMD（每个设备运行不同子图）具有更好的可扩展性。*

##### 算法伪代码

```python
# Algorithm 1: Top-2 Gating with Expert Capacity (简化版)
# 输入: token representations X ∈ R^(N×M), N=tokens, M=model_dim
# 参数: gate weights W_g ∈ R^(M×E), E=num_experts

def top2_gating(X, W_g, E, capacity_factor=2.0):
    N = X.shape[0]
    C = int(capacity_factor * N / E)  # Expert Capacity

    # Step 1: 计算门控分数
    gates = softmax(X @ W_g, dim=-1)  # (N, E)

    # Step 2: 选择 Top-1 专家
    expert1 = argmax(gates, dim=-1)       # (N,)
    gate1   = gates[range(N), expert1]    # (N,)
    mask1   = one_hot(expert1, E)         # (N, E)

    # Step 3: 选择 Top-2 专家 (排除 Top-1)
    gates_masked = gates * (1 - mask1)
    expert2 = argmax(gates_masked, dim=-1)
    gate2   = gates[range(N), expert2]

    # Step 4: Random Routing — 第2专家按概率派发
    mask2 = one_hot(expert2, E) * (random() < gate2).unsqueeze(-1)

    # Step 5: Capacity 约束 — 每个专家最多接收 C 个 token
    # 通过 cumsum 计算每个专家已接收的 token 数，超过 C 的丢弃
    position1 = cumsum(mask1, dim=0) * mask1  # 每个token在专家buffer中的位置
    mask1 = mask1 * (position1 <= C)
    position2 = cumsum(mask2, dim=0) * mask2
    mask2 = mask2 * (position2 <= C)

    # Step 6: Combine — 加权合并两个专家的输出
    # combine_weights = gate1 * mask1_dispatch + gate2 * mask2_dispatch

    # Auxiliary loss: 鼓励负载均衡
    f = mask1.mean(dim=0)  # 每个专家被选中的 token 比例
    m = gates.mean(dim=0)  # 每个专家的平均门控值
    l_aux = E * (f * m).sum()

    return mask1, mask2, gate1, gate2, position1, position2, l_aux
```

##### 动机与背景

**问题**：大规模多语言翻译面临"容量瓶颈"——当模型需要同时处理 100+ 语言对时，高资源语言因模型容量不足而质量下降，而简单增大 Dense 模型参数量会导致计算成本与设备数量线性增长。

**传统方法的缺陷**：
1. **Dense Scaling**：将 Transformer 从 1B 扩展到 100B，每个 token 的计算量同比增长，训练成本不可承受
2. **MPMD 并行**（如 Mesh-TensorFlow）：不同设备运行不同子程序，需要为每种模型结构手写分区逻辑，编程复杂度高且难以扩展到数千设备
3. **早期 MoE**（Shazeer et al., 2017）：虽然实现了条件计算，但缺乏高效的分布式实现框架，负载不均衡问题严重

> 💡 **核心洞察**：通过条件计算（Conditional Computation），模型参数量可以在**不增加每个 token 计算量**的前提下大幅扩展——每个 token 只激活 2 个专家（而非全部 E 个），实现了"参数量 ×E 但 FLOPs 仅 ×2"的亚线性扩展。

##### 核心机制详解

**1. MoE 层设计**

GShard 将标准 Transformer 中**每隔一层**的 FFN 替换为 MoE 层。每个 MoE 层包含 \(E\) 个专家，每个专家是一个独立的 FFN（结构与原始 FFN 相同）。对于输入 token \(x_s\)，MoE 层的输出为：

$$y_s = \sum_{i=0}^{E-1} G_i(x_s) \cdot \text{FFN}_i(x_s)$$

其中 \(G_i(x_s)\) 是门控函数对专家 \(i\) 的权重。由于采用 Top-2 gating，\(G_i\) 对于绝大多数专家为 0，只有被选中的 2 个专家有非零权重。

> ⚠️ **注意**：只有 MoE 层的专家参数跨设备分片（每个设备持有 \(E/D\) 个专家），非 MoE 层（Attention、LayerNorm 等）的参数在所有设备上**完全复制**。这意味着模型的"稠密部分"提供跨语言的共享表示，而 MoE 专家提供语言/任务特定的容量。

**2. Top-2 Gating 与 Random Routing**

门控网络是一个简单的线性层 + Softmax：

$$g(x_s) = \text{Softmax}(x_s \cdot W_g)$$

选择 Top-2 专家后，**第一专家确定性派发**，**第二专家按概率 \(g_2(x_s)\) 随机派发**。这一设计的直觉是：

- 第一专家捕获 token 的主要特征（高置信度路由）
- 第二专家提供补充信息，但并非每个 token 都需要，概率派发减少了专家过载风险
- 随机性还起到正则化作用，类似 Dropout

**3. Expert Capacity 与溢出处理**

为保证负载均衡和内存可控，每个专家设定容量上限：

$$C = \text{capacity\_factor} \times \frac{N}{E}$$

其中 \(N\) 是当前 group 的 token 数，\(E\) 是专家数。默认 capacity_factor = 2.0（因为 Top-2 意味着平均每个专家接收 \(2N/E\) 个 token）。超过容量的 token 通过**残差连接**直接传递到下一层，不经过任何专家处理。

> 💡 **关键设计**：Local Group Dispatching——将一个 batch 中的 token 按位置分成若干 group，每个 group 内独立执行 gating 和 capacity 约束。这确保了 group 级别的负载均衡，同时使得 dispatch/combine 操作可以高效地用 Einsum 实现。

**4. 辅助负载均衡损失**

为避免门控网络将所有 token 路由到少数"热门"专家，引入辅助损失：

$$l_{aux} = c_e \cdot E \cdot \sum_{i=1}^{E} f_i \cdot m_i$$

其中：
- \(f_i = \frac{1}{N}\sum_{s=1}^{N} \mathbf{1}[\text{token } s \text{ dispatched to expert } i]\)：专家 \(i\) 被选中的 token 比例
- \(m_i = \frac{1}{N}\sum_{s=1}^{N} g_i(x_s)\)：专家 \(i\) 的平均门控值
- \(c_e\)：超参数，控制辅助损失的权重

该损失的最小值在所有 \(f_i = m_i = 1/E\)（完全均匀分配）时取得。使用 \(f_i \cdot m_i\) 的乘积形式而非直接约束 \(f_i\) 的方差，是因为 \(f_i\) 涉及 argmax 不可微，而 \(m_i\) 可微，乘积形式允许梯度通过 \(m_i\) 流回门控网络。

##### GShard 自动分片系统

**5. 分片注解 API**

GShard 的核心编程创新是将分布式并行的复杂性封装为 3 个简单注解：

| API | 语义 | 示例 |
|-----|------|------|
| `replicate(tensor)` | 张量在所有设备上完整复制 | Attention 权重 |
| `split(tensor, dim, D)` | 沿 `dim` 维度均匀切分到 `D` 个设备 | MoE 专家权重沿 expert 维度切分 |
| `shard(tensor, assignment)` | 按自定义映射分配到设备 | 特殊布局需求 |

用户只需在 MoE 层的关键张量上添加注解（约 10 行代码），编译器自动推断整个计算图的分片方案。

**6. XLA SPMD Partitioner**

编译器工作流程：
1. **注解传播**：从用户标注的张量出发，沿计算图正向/反向传播分片信息
2. **通信插入**：当操作的输入分片方式与所需不匹配时，自动插入 `AllToAll`（重分布）、`AllReduce`（聚合）等集合通信
3. **Halo Exchange**：对于卷积等需要邻居数据的操作，自动生成 halo 交换逻辑
4. **Padding 处理**：当张量维度不能被设备数整除时，自动添加 padding

> 💡 **关键优势**：SPMD 模式下所有设备运行**同一编译后程序**，仅数据不同。相比 MPMD（每个设备编译不同子图），SPMD 的编译时间与设备数无关，且内存占用更可预测。

##### 训练流程与性能

**数据流**：
1. 输入 batch 的 token 经 Embedding 后进入 Encoder/Decoder
2. 在 MoE 层，token 经 Gating 网络计算路由，通过 `AllToAll` 发送到目标专家所在设备
3. 各设备上的专家独立处理接收到的 token
4. 处理完成后再通过 `AllToAll` 将结果发回原设备
5. 非 MoE 层正常执行（数据并行 + 参数复制）

**性能数据**：
- 600B MoE Transformer（2048 experts, 36 layers）在 2048 TPU v3 上训练
- 处理速度：1T tokens / 250k steps / 4 天
- 高资源语言（100 对）平均 ΔBLEU 提升 **13.5+**（相比双语基线）
- 相比 Dense T(96L) 模型（约 2.3B 参数），MoE 模型在高资源语言上大幅领先，在低资源语言上通过正向迁移同样获益
- 通信开销：AllToAll 通信量随专家数增加而增长，但整体训练吞吐仍保持近线性扩展

**Scaling 规律**：
- 增加专家数主要提升高资源语言质量（缓解容量瓶颈），对低资源语言存在边际递减
- 增加模型深度对低资源语言更有利（增强正向迁移），因为深层模型的共享参数比例更高
- 最优配置需要在专家数（容量）和深度（迁移）之间取得平衡

##### 与传统方法的区别

| 维度 | Dense Scaling | Mesh-TensorFlow (MPMD) | **GShard (SPMD + MoE)** |
|------|--------------|----------------------|------------------------|
| 参数扩展 | 线性增加 FLOPs | 线性增加 FLOPs | 亚线性（仅激活 Top-2 专家） |
| 编程模型 | 手动模型并行 | 手动分区 + 设备映射 | **3 个注解 + 编译器自动推断** |
| 编译扩展性 | — | 编译时间 ∝ 设备数 | **编译时间与设备数无关** |
| 负载均衡 | 不适用 | 不适用 | Expert Capacity + Aux Loss |
| 通信模式 | AllReduce | 手动管理 | **编译器自动插入 AllToAll/AllReduce** |
| 验证规模 | ~10B | ~10B | **600B（2048 TPU v3）** |

#### 🧪 练习题

```yaml
question: "GShard 中 MoE 层的 Expert Capacity 机制的主要目的是什么？"
options:
  - "增加每个专家能处理的 token 数量以提升模型质量"
  - "限制每个专家接收的 token 数上限，防止负载不均和内存溢出"
  - "确保每个 token 恰好被两个专家处理"
  - "减少 AllToAll 通信中传输的数据量"
answer: 1
explain: "Expert Capacity 设定每个专家的 buffer 上限为 C=2N/E，超出容量的 token 通过残差连接直通。这防止了热门专家过载导致的内存溢出和计算不均衡问题。"
```