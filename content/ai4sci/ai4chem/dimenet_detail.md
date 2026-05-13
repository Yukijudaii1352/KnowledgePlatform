### DimeNet: Directional Message Passing for Molecular Graphs

```yaml
metadata:
  paper_id: "2003.03123"
  title: "Directional Message Passing for Molecular Graphs"
  authors: ["Johannes Gasteiger", "Janek Groß", "Stephan Günnemann"]
  venue: "ICLR 2020"
  url: "https://arxiv.org/abs/2003.03123"
  code: "https://github.com/klicperajo/dimenet"
  topic: ["molecular property prediction", "graph neural network", "message passing", "geometric deep learning"]
  motivation: "用方向消息传递引入键角信息，提升GNN对分子3D构象的区分度"
  significance: "首次在分子图消息传递中引入方向信息（键角），提出基于球面Bessel函数的物理启发基表示，在QM9的12个目标中11个达到SOTA"
```

#### 📝 一句话总结

DimeNet 通过在消息传递中引入原子间键角的方向信息，并使用球面 Fourier-Bessel 基函数联合表示距离和角度，使 GNN 首次能够区分仅靠距离无法区分的分子构型，在 QM9 基准上平均误差降低 31%。

#### 🎯 核心要点

- **方向消息传递**：消息定义在原子对（边）上而非节点上，聚合时引入键角 \(\alpha_{(kj,ji)}\)，直接建模力场中的键角弯曲项
- **球面 Fourier-Bessel 2D 基**：从薛定谔方程推导正交基函数，联合表示距离 \(d_{kj}\) 和角度 \(\alpha_{(kj,ji)}\)，提供物理归纳偏置
- **径向 Bessel 基**：仅 16 个基函数（SchNet 用 300 个高斯），参数效率提升 20 倍且性能更优
- **连续可微设计**：Swish 激活 + 包络函数（三重零点截断），支持通过反向传播预测原子力
- **QM9 SOTA**：12 个量子化学目标中 11 个达到最优，平均标准化 MAE 降低 31%
- **MD17 分子动力学**：1000 样本下大幅超越 SchNet，与手工特征的 sGDML 持平
- **消融验证**：去掉角度信息误差 +26%，退化为节点嵌入误差 +68%，Bessel 基替换高斯基误差 -10%

#### 🔬 深入细节

##### 核心架构示意

![DimeNet Architecture](https://raw.githubusercontent.com/gasteigerjo/dimenet/master/2dfilter_crop.png)
*图：DimeNet 架构总览——Embedding Block 生成初始消息嵌入，多个 Interaction Block 通过方向消息传递迭代更新，每层输出经 Output Block 汇聚为最终预测。*

```
┌─────────────────────────────────────────────────────────────┐
│                      DimeNet 架构                            │
│                                                              │
│  原子类型 z, 坐标 x                                          │
│    │                                                         │
│    ▼  计算: d_ji → e_RBF ;  d_kj, α_(kj,ji) → a_SBF        │
│  ┌────────────┐                                              │
│  │ Embedding   │ m_ji^(1) = σ([h_j ∥ h_i ∥ e_RBF] W + b)   │
│  └─────┬──────┘                                              │
│        │                                                     │
│        ▼  ×T 层                                              │
│  ┌────────────┐  m_ji^(l+1) = f_update(m_ji^(l),            │
│  │ Interaction │       Σ_{k∈N_j\i} f_int(m_kj, e_RBF, a_SBF))│
│  └─────┬──────┘                                              │
│        │  每层 → Output Block                                │
│        ▼                                                     │
│  ┌────────────┐  t_i^(l) = MLP(Σ_j (e_RBF ⊙ W)·m_ji)      │
│  │  Output     │  t = Σ_i Σ_l t_i^(l)                       │
│  └────────────┘                                              │
└─────────────────────────────────────────────────────────────┘
```

##### 算法伪代码

```python
# DimeNet 前向传播核心逻辑
def DimeNet_forward(atom_types, positions, cutoff=5.0):
    # 1. 构建邻居图 & 计算几何特征
    edges = {(j,i) for all pairs where ||x_j - x_i|| < cutoff}
    d_ji = ||x_j - x_i||                          # 原子间距离
    alpha_kji = angle(x_k, x_j, x_i)              # 三体键角

    # 2. 基函数表示 (Sec.5)
    e_RBF = envelope(d_ji) * sqrt(2/c) * sin(n*π*d_ji/c) / d_ji   # Eq.7, n=1..16
    a_SBF = envelope(d_kj) * j_l(z_ln/c * d_kj) * Y_l^0(alpha)   # Eq.6, 2D基

    # 3. Embedding Block (Eq.9)
    h_i = learnable_embedding[atom_types[i]]       # F维原子嵌入
    m_ji = swish(concat(h_j, h_i, e_RBF) @ W + b) # 初始消息嵌入

    # 4. 累积输出
    t = output_block(m_ji, e_RBF)

    # 5. T个 Interaction Block (Eq.4)
    for l in range(T):
        for each (j, i) in edges:
            # 交互: 利用角度+距离的2D表示
            x_kj = W_bilinear @ a_SBF              # 双线性变换
            inter = sum_k( (m_kj @ W) * x_kj )     # 聚合邻居消息
            # 更新: 残差块
            m_ji = residual(m_ji + inter)
            m_ji = m_ji * (e_RBF @ W_rbf)          # 径向调制
        t += output_block(m_ji, e_RBF)

    return sum_over_atoms(t)                        # 分子级预测
```

##### 动机与背景：为什么距离不够？

传统分子 GNN（如 SchNet、PhysNet）仅使用原子间距离 \(d_{ji} = \|x_j - x_i\|\) 作为几何信息。论文从两个互补视角论证了这一局限性。**物理视角**：经典分子力场包含键伸缩项 \(E_{\text{bond}}(d)\)（仅依赖距离）和键角弯曲项 \(E_{\text{angle}}(\alpha)\)（依赖角度），仅用距离的模型只能建模前者，无法捕获后者。**图论视角**：仅使用距离的 GNN 等价于 1-WL 图同构测试，存在理论上无法区分的分子对——论文给出精妙反例：正六边形与两个等边三角形具有完全相同的距离多重集 \(\{d, d, d, d, d, d, \sqrt{3}d, \sqrt{3}d, \sqrt{3}d, 2d, ...\}\)，但化学性质截然不同。

##### 核心机制：方向消息传递

DimeNet 的关键创新是将消息定义在**原子对**（有向边）\((j, i)\) 上，而非原子（节点）上。更新消息 \(m_{ji}\) 时，聚合所有从邻居 \(k\) 到 \(j\) 的入射消息 \(m_{kj}\)，并利用三体键角 \(\alpha_{(kj,ji)} = \angle x_k x_j x_i\)：

$$m_{ji}^{(l+1)} = f_{\text{update}}\Big(m_{ji}^{(l)},\; \sum_{k \in \mathcal{N}_j \setminus \{i\}} f_{\text{int}}(m_{kj}^{(l)},\; e_{\text{RBF}}^{(ji)},\; a_{\text{SBF}}^{(kj,ji)})\Big)$$

这一设计的三重优势：(1) 消息嵌入自然与方向关联，\(m_{ji}\) 对应从 \(j\) 到 \(i\) 的方向；(2) 键角 \(\alpha_{(kj,ji)}\) 是旋转不变量，保证模型对全局旋转不变；(3) 消息嵌入等价于原子对嵌入，对应更高阶的 WL 测试，理论表达能力更强。

> 💡 **关键直觉**：与等变 CNN 在固定全局方向上应用滤波器不同，DimeNet 在每个邻居的**局部方向**上应用相同的学习滤波器，因此对全局旋转保持等变性，同时保留了邻居间的相对方向信息。

##### 物理启发的基表示：从薛定谔方程到 Fourier-Bessel

这是论文最优雅的部分。作者从量子力学第一性原理出发构建基函数：

1. DFT 计算的目标是电子密度 \(\langle\Psi|\Psi\rangle\)，波函数 \(\Psi\) 满足薛定谔方程
2. 在截断距离 \(c\) 内设 \(V=0\)，外部 \(V=\infty\)，简化为 Helmholtz 方程 \((\nabla^2 + k^2)\Psi = 0\)
3. 极坐标分离变量得到球面 Bessel 函数 \(j_l\) 和球面谐波 \(Y_l^m\) 的乘积

取 \(m=0\) 得到仅依赖 \(d\) 和 \(\alpha\) 的 2D 球面 Fourier-Bessel 基：

$$\tilde{a}_{\text{SBF},ln}(d, \alpha) = \sqrt{\frac{2}{c^3 j_{l+1}^2(z_{ln})}} \; j_l\!\left(\frac{z_{ln}}{c}d\right) Y_l^0(\alpha)$$

径向基取 \(l=m=0\)，利用 \(j_0(x) = \sin(x)/x\)：

$$\tilde{e}_{\text{RBF},n}(d) = \sqrt{\frac{2}{c}} \; \frac{\sin(n\pi d / c)}{d}$$

> ⚠️ **注意**：这些基函数的最高频率被 \(N_{\text{SHB}}\) 和 \(N_{\text{RBF}}\) 自然限制，提供了有效的正则化——仅 16 个径向基函数即可替代 SchNet 的 300 个高斯基函数（参数效率提升 20 倍）。

##### 连续可微性与力预测

DimeNet 需要二阶连续可微以通过反向传播预测原子力（\(\mathbf{F}_i = -\nabla_{x_i} E\)）。三处关键设计：(a) Swish 激活函数 \(\sigma(x) = x \cdot \text{sigmoid}(x)\) 替代 ReLU；(b) 包络函数 \(u(d)\) 在截断距离 \(c\) 处有三重零点，确保基函数及其一、二阶导数在截断处连续归零；(c) 仅使用原子类型和坐标，不依赖辅助数据。这些设计使 DimeNet 既能预测分子性质，又能用于分子动力学模拟，且预测的力天然满足能量守恒。

##### 实验亮点

在 QM9 基准（~130k 分子）上，DimeNet 在 12 个量子化学性质中 11 个达到 SOTA，平均标准化 MAE 比第二名（PhysNet）降低 31%。在 MD17 分子动力学基准（仅 1000 训练样本）上，大幅超越 SchNet 并与手工特征的 sGDML 持平。消融实验清晰量化了各组件贡献：Bessel 基替换高斯基降低 10% 误差；去掉角度信息误差增加 26%；退化为节点嵌入误差增加 68%。学到的 2D 滤波器在苯环特征角度（120°）和 C-C 键距离（1.39Å）处被激活，证实模型确实学会了利用方向信息。

#### 🧪 练习题

```yaml
question: "DimeNet 相比 SchNet 等传统分子 GNN 的核心创新是什么？"
options:
  - "使用 Transformer 注意力机制替代消息传递"
  - "在消息传递中引入原子间键角信息，将消息定义在原子对而非原子上"
  - "使用更大的截断距离以包含更多邻居原子"
  - "引入预训练策略提升小数据集性能"
answer: 1
explain: "DimeNet 的核心创新是方向消息传递——将消息定义在原子对（边）上并在聚合时利用键角 α_(kj,ji)，使模型能区分仅靠距离无法区分的分子构型。"
```