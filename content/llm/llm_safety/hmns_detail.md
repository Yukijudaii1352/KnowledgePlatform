### HMNS: 头掩蔽零空间引导的机制级越狱分析

```yaml
id: hmns
name: HMNS
full_name: 头掩蔽零空间引导 (Head-Masked Nullspace Steering)
year: '2026.04'
org: ICLR
paper_url: https://iclr.cc/virtual/2026/papers.html
category: jailbreak
parent: pair
motivation: 掩蔽安全头电路高成功率越狱
```

#### 📝 一句话总结

HMNS 通过定位与拒答行为强相关的注意力头、屏蔽这些头的写入方向，并在其零空间中注入引导向量，展示了对齐行为可能集中在可被机制干预的局部电路中。

#### 🎯 核心要点

- **攻击视角**：HMNS 不是只优化输入文本，而是直接干预模型内部激活，因此属于白盒机制级越狱研究。
- **关键操作**：先用因果消融找出重要安全头，再构造这些头输出子空间的正交补，最后在零空间中注入残差扰动。
- **闭环过程**：每轮生成后重新检查输出是否仍拒答，并按失败情况调整头集合和扰动强度。
- **度量方式**：论文同时关注攻击成功率、查询次数和前向计算开销，强调机制干预不只看最终 ASR。
- **防御启示**：如果拒答电路高度稀疏，部署方应考虑分散式安全表征、激活监控和白盒完整性保护。

#### 🔬 深入细节

![HMNS 方法总览](https://arxiv.org/html/2604.10326v1/2604.10326v1/HMNS_image.jpg)

图源：`Jailbreaking the Matrix: Nullspace Steering for Controlled Model Subversion` 公开论文页面。

```text
Algorithm: Head-Masked Nullspace Steering
Input:
  aligned model M with L layers and H attention heads
  calibration prompts D_safe, D_refusal
  intervention budget K, attempts T
Output:
  controlled generation trace for safety evaluation

1. For each layer l and head h:
     ablate or mask head h on calibration prompts.
     measure output distribution shift, e.g. KL(p_base || p_ablated).
2. Select top-K heads S_l that most affect refusal/default behavior.
3. For each affected layer l:
     build head write matrix M_l = [W^O_{l,h}: h in S_l].
     compute a unit vector u_l in the nullspace of M_l^T.
4. For attempt t = 1..T:
     set alpha_t = lambda * (1 + 0.1 * (t - 1)).
     during generation, add delta_l = alpha_t * RMS(a_l) * u_l.
     decode with fixed sampling policy.
     if the safety evaluator marks the run successful, stop.
5. Record heads, perturbation norms, and generation outcome.
```

HMNS 的核心数学约束是让干预方向落在被屏蔽安全头写入子空间的正交补中。若 `M_l` 表示若干安全头的输出投影矩阵，方法寻找 `u_l` 使 `M_l^T u_l ≈ 0`，再把 `δ_l = α RMS(a_l) u_l` 加到残差流。这样做的直觉是：不直接沿着已经被安全头控制的方向硬推，而是在这些方向“看不见”的空间里改变后续计算。

定位安全头时，论文使用类似因果追踪的思路：比较原模型和消融某个 head 后的输出分布，KL 变化越大，说明该 head 对当前安全行为越关键。与纯梯度后缀攻击不同，这一步依赖模型内部结构，因而攻击能力更强但威胁模型也更苛刻，需要白盒访问权。

闭环部分让 HMNS 不只是一次性向量注入。若某轮仍出现拒答，算法会继续尝试并调节扰动强度，有时还会重估相关电路。这个设计说明机制级安全并非静态开关：同一模型在不同 prompt、不同层、不同采样设置下，拒答电路可能有变化。

从防御角度，HMNS 的价值在于暴露“安全行为局部化”的风险。如果安全对齐主要由少量头或少量方向承担，攻击者一旦获得权重和推理控制，就可能绕开这些局部机制。更稳健的方案应让安全约束分布到更多层、更多头和训练目标中，并对推理时激活篡改做完整性检查。

#### 🧪 练习题

1. 为什么零空间约束能让干预避开被识别出的安全头方向？
2. HMNS 的威胁模型和黑盒 jailbreak prompt 优化有什么根本差异？
3. 如果要防御 HMNS，应优先监控参数完整性还是输入文本？为什么？
