### Mamba-3 — 状态空间模型3代

```yaml
id: mamba3
name: Mamba-3
full_name: "状态空间模型3代 (Mamba-3 Architecture)"
year: 2026
org: "Princeton"
paper_url: "https://pli.princeton.edu/mamba3"
category: "transformer"
parent: "video_swin"
motivation: "线性注意力解决长视频瓶颈"
```

#### 📝 一句话总结

Mamba-3 从推理优先的角度重设计 Mamba 系列状态空间层，用更强的离散化递推、复值状态更新和 MIMO 状态空间模块提升线性序列模型质量，为长文本或长视频 token 序列提供比全局注意力更低的长度扩展成本。

#### 🎯 核心要点

- 推理优先 SSM：目标是在固定状态大小下提高每步更新的表达力和硬件利用率
- Exponential-trapezoidal discretization：用更强离散化形式替代 Mamba-2 过度简化的递推
- Complex-valued SSM：用复值转移增强状态追踪能力，并通过 RoPE 形式高效实现
- MIMO formulation：从 SISO 标量状态更新扩展到多输入多输出，提高性能且尽量不增加 decode latency
- 架构现代化：引入 QK/BC Norm、SwiGLU 交替块、可选 MIMO projection，并移除短 causal conv
- 长序列意义：固定状态使推理内存不随上下文线性增长，适合作为长视频/VLM backbone 或混合层组件

#### 🔬 深入细节

> 注：给定 `paper_url` 是简写入口；本文依据 Princeton PLI 官方博客和可检索论文 `arXiv:2603.15569` 解读。

![Mamba-3 架构对比](https://arxiv.org/html/2603.15569v1/x2.png)
*图：Mamba-3 相比 Mamba-2 增加指数-梯形离散化、数据依赖 RoPE、MIMO projection、QK/BC Norm 和可学习偏置。*

##### 1. 动机与背景

Transformer 的自注意力在长序列上有两个典型成本：prefill 近似二次计算，decode 需要不断读取增长的 KV cache。长视频理解会把帧、patch、轨迹或视觉摘要转成很长 token 序列，因此这类成本会成为瓶颈。

Mamba 系列用状态空间模型把历史压缩到固定大小状态中，推理时每来一个 token 只更新状态，而不是保存所有历史 token。Mamba-2 为了训练效率将状态转移进一步简化，但也让单步推理过于轻量、表达力不足且偏 memory-bound。Mamba-3 的目标是让固定状态“做更多有用计算”。

##### 2. SSM 基础形式

离散状态空间层可写为：

$$
h_t = A_t h_{t-1} + B_t x_t,\quad
y_t = C_t^\top h_t
$$

其中 \(h_t\) 是固定大小状态，\(x_t\) 是当前 token 表示，\(y_t\) 是输出。与 attention 保存所有 \(K,V\) 不同，SSM 只保存 \(h_t\)，因此 decode 内存与序列长度解耦。

##### 3. Mamba-3 的三项方法升级

第一，Mamba-3 使用更具表达力的 exponential-trapezoidal 离散化。直觉上，它不再把连续动态粗糙地简化为过窄的递推形式，而是在数值离散化时保留更多动态结构，使状态更新既稳定又能表达复杂变化。

第二，Mamba-3 引入复值 SSM。复数转移可表示旋转和振荡模式，这对括号、奇偶、状态追踪、周期性事件等序列结构有帮助。实现上，论文用 RoPE 风格把复值旋转融入实值 kernel，避免重写昂贵复数计算。

第三，MIMO 将单输入单输出的独立标量 SSM 扩展到向量输入/输出。相比每个通道独立更新，MIMO 让一组通道共享更丰富的状态交互，提升质量；在 decode 阶段，由于 GPU 仍有空闲算力，增加部分 FLOPs 不一定线性增加墙钟延迟。

##### 4. 前向流程伪代码

```python
# Mamba-3 block 简化伪代码
def mamba3_block(x, state):
    residual = x
    x = rms_norm(x)

    # 生成 SSM 参数与门控分支
    a, b, c, gate = linear_projections(x)
    b, c = bc_norm(b), bc_norm(c)

    # 复值动态可用 RoPE/rotation 参数化
    theta = rope_projection(x)
    a_complex = compose_transition(a, theta)

    # exponential-trapezoidal discretized recurrence
    state = exp_trapezoid_update(state, a_complex, b, x)
    y = readout(state, c)

    # 可选 MIMO projection 增强通道交互
    y = mimo_projection(y)
    y = output_projection(y * silu(gate))
    return residual + y, state
```

在语言或视频模型中，Mamba-3 block 通常与 MLP/SwiGLU block 交替，并可与少量全局 attention 层混合。对于长视频，常见用法不是直接替代视觉 patch tokenizer，而是在已经压缩后的帧级、轨迹级或多模态 token 序列上建模长程依赖。

##### 5. 与 Transformer / Video Swin 的区别

Video Swin 用局部窗口注意力降低视频 token 的局部建模成本，但跨长时间上下文仍需要堆叠或额外机制。Transformer 全局注意力能精确检索历史 token，但上下文越长 KV cache 越大。Mamba-3 则把历史压缩进固定状态，牺牲一部分精确随机访问能力，换取线性长度扩展和低 decode 内存。

因此 Mamba-3 更适合被理解为长序列 backbone 或混合架构组件，而不是一个专门的视频识别算法。若用于长视频语言模型，它解决的主要是“大量视频 token 进入语言模型后的长上下文建模成本”，而不是前端视觉感知本身。

> ⚠️ 注意：Mamba-3 不是线性注意力的简单变体，而是状态空间递推模型；它与 attention 的核心差异在于是否保存所有历史 token。

#### 🧪 练习题

```yaml
question: "Mamba-3 相比 Transformer 在长序列推理中的核心优势是什么？"
options:
  - "保存完整 KV cache 以便精确访问所有历史 token"
  - "使用固定大小状态递推，推理内存不随序列长度按 KV cache 方式增长"
  - "只适用于短图像分类输入"
  - "完全不需要参数训练"
answer: 1
explain: "Mamba-3 属于状态空间模型，历史信息被压缩到固定状态中；这降低了长上下文 decode 时的内存压力。"
```
