### FrameDiff — SE(3) 框架上的蛋白质骨架扩散模型

```yaml
id: framediff
name: FrameDiff
full_name: "FrameDiff (FrameDiff)"
year: "2023.02"
org: "MIT"
paper_url: "https://arxiv.org/abs/2302.02277"
category: protein_design
parent: "—"
motivation: "SE(3)框架下直接扩散骨架"
```

#### 📝 一句话总结

FrameDiff 提出了一个在 \(SE(3)^N\) 残基刚体框架空间上定义和学习扩散过程的蛋白质骨架生成方法，用原则化的旋转/平移 score matching 解决了蛋白质骨架生成中全局几何等变性、刚体表示和物理局部约束难以统一的问题。

#### 🎯 核心要点

- **残基 frame 表示**：每个残基用 \(T_n=(R_n,X_n)\in SE(3)\) 表示，其中 \(X_n\) 是 \(C_\alpha\) 坐标，\(R_n\) 由 \(N-C_\alpha-C\) 几何通过 Gram-Schmidt 构造
- **SE(3) 不变扩散过程**：在 \(SE(3)^N\) 上分别对旋转执行 \(SO(3)\) Brownian motion、对平移执行居中 Ornstein-Uhlenbeck / Gaussian 扩散，并用投影去除质心漂移
- **FramePred denoiser**：基于 AlphaFold2 Structure Module 的 IPA + Transformer + EdgeUpdate + BackboneUpdate，直接预测去噪后的 frame \(\hat{\mathbf{T}}_0\) 与氧原子所需的 torsion angle \(\hat{\psi}\)
- **条件 score 参数化**：不直接输出 score，而是先预测 \(\hat{\mathbf{T}}_0\)，再用已知扩散核计算 \(\nabla_{\mathbf{T}_t}\log p_{t|0}(\mathbf{T}_t|\hat{\mathbf{T}}_0)\)
- **多目标训练损失**：旋转 DSM + 平移 DSM，并在低噪声阶段加入 backbone 原子 MSE 和局部 2D 原子距离损失，减少链断裂和 steric clash
- **自条件机制**：用模型上一步预测的 \(C_\alpha\) pairwise distance bin 初始化边特征，提升采样稳定性
- **无需预训练结构预测网络**：论文报告可生成最长约 500 aa 的 designable monomer，并能泛化到已知结构之外的骨架

#### 🔬 深入细节

##### 方法示意图

![FrameDiff 方法总览](https://ar5iv.labs.arxiv.org/html/2302.02277/assets/figures/framediff_overview.png)
*图：FrameDiff 论文 Figure 1。左侧展示如何用 residue frame 参数化 \(N-C_\alpha-C\) 主链原子，右侧展示从随机 frame 开始执行反向 \(SE(3)\) 扩散并最终预测 \(\psi\) 角来放置氧原子。来源：ar5iv 对 arXiv:2302.02277 的公开 HTML 渲染。*

##### 算法伪代码

```python
# FrameDiff 采样伪代码：在 SE(3)^N 上反向扩散
def sample_framediff(theta, N, T_final=1.0, num_steps=200, zeta=1.0, eps=1e-3):
    gamma = (T_final - eps) / num_steps

    # 1. 从参考分布初始化 N 个残基 frame：旋转接近均匀，平移为居中 Gaussian
    T_t = sample_reference_frames(N)  # [(R_n, X_n)]_{n=1}^N, center_of_mass(X)=0

    for t in reversed_time_grid(T_final, eps, gamma):
        # 2. FramePred 预测干净骨架 frame 与氧原子 torsion angle
        T0_hat, psi_hat = FramePred(T_t, t, theta)

        # 3. 用已知 SE(3) 扩散核把 x0 预测转换为 conditional score
        s_rot, s_trans = conditional_score(T_t, T0_hat, t)

        for n in range(N):
            # 平移切空间步：OU drift + score drift + 可降噪采样噪声
            z_x = normal(0, I3)
            w_x = project_centered(gamma * (0.5 * X_t[n] + s_trans[n])
                                   + zeta * sqrt(gamma) * z_x)

            # 旋转切空间步：SO(3) tangent Gaussian + 指数映射
            z_r = tangent_normal_at(R_t[n])
            w_r = gamma * s_rot[n] + zeta * sqrt(gamma) * z_r

            T_t[n] = exp_map_SE3(T_t[n], rotation_step=w_r, translation_step=w_x)

    return FramePred(T_t, eps, theta)  # final frames + psi angles
```

##### 动机与背景

蛋白质骨架由局部刚性几何和全局三维构象共同决定。只在 \(C_\alpha\) 坐标上加高斯噪声会丢失 \(N-C_\alpha-C\) 的方向信息；直接在全原子坐标上扩散又容易违反键长、键角和旋转等变性。FrameDiff 的核心选择是把每个残基视为一个 orientation-preserving rigid transformation，即 \(SE(3)\) 上的 frame：平移给出 \(C_\alpha\) 位置，旋转给出主链局部坐标系。

这种表示把蛋白质主链生成变成 \(SE(3)^N\) 上的生成问题。难点在于：\(SO(3)\) 是紧 Lie 群，布朗运动有自然的热核；\(\mathbb{R}^3\) 平移空间没有有限的平移不变概率测度。因此论文把平移扩散限制在质心为 0 的子空间中，用投影 \(P\) 去除整体平移自由度，使前向和反向过程保持全局 \(SE(3)\) 等变/不变性质。

##### frame 参数化与扩散核

对第 \(n\) 个残基，FrameDiff 使用：

$$
T_n=(R_n,X_n)\in SE(3),\qquad X_n=(C_\alpha)_n
$$

其中 \(R_n\) 由 \(N-C_\alpha-C\) 三个原子确定。预测完整 backbone 时，\(N,C_\alpha,C\) 可由 frame 直接放置，氧原子 \(O\) 还需要额外 torsion angle \(\psi_n\)。因此 denoiser 输出：

$$
(\hat{\mathbf{T}}_0,\hat{\boldsymbol{\psi}})
=\mathrm{FramePred}(\mathbf{T}_t,t;\theta)
$$

前向扩散在旋转和平移上可分解：

$$
\nabla_{\mathbf{T}_t}\log p_{t|0}(\mathbf{T}_t|\mathbf{T}_0)
=
\left[
\nabla_{\mathbf{R}_t}\log p_{t|0}(\mathbf{R}_t|\mathbf{R}_0),
\nabla_{\mathbf{X}_t}\log p_{t|0}(\mathbf{X}_t|\mathbf{X}_0)
\right]
$$

旋转部分使用 \(SO(3)\) Brownian motion 的转移核，平移部分使用居中 Gaussian/OU 型扩散。模型训练时并不要求网络手写输出复杂的 Lie 群 score，而是让网络预测 \(\hat{\mathbf{T}}_0\)，再通过条件扩散核计算：

$$
s_\theta(t,\mathbf{T}_t)
=
\nabla_{\mathbf{T}_t}\log p_{t|0}(\mathbf{T}_t|\hat{\mathbf{T}}_0)
$$

> 💡 **关键直觉**：预测 \(\hat{\mathbf{T}}_0\) 比直接预测 tangent score 更贴近蛋白质结构任务；score 则由几何正确的扩散核“翻译”出来，从而保留 \(SE(3)\) 上的数学结构。

##### 网络结构

FramePred 继承 AlphaFold2 Structure Module 的核心几何归纳偏置，但用于生成而不是结构预测。每层维护残基节点嵌入 \(\mathbf{h}_\ell\)、残基对边嵌入 \(\mathbf{z}_\ell\) 和当前 frame \(\mathbf{T}_\ell\)。Invariant Point Attention 捕获三维空间邻近关系，Transformer 捕获序列方向上的长程相互作用，EdgeUpdate 更新 pair 表征，BackboneUpdate 预测每个 residue frame 的旋转和平移增量。

与 AlphaFold2 不同，FrameDiff 不在旋转更新之间使用 stop-gradient；边特征还会注入自条件信息，即上一次 \(\hat{C}_\alpha\) 预测的 pairwise distance bins。这样模型在反向扩散早期可以处理高度噪声化的 frame，在后期又能稳定地恢复局部主链几何。

##### 训练损失

FrameDiff 的基础目标是 denoising score matching：

$$
\mathcal{L}_{\mathrm{dsm}}
=
\mathcal{L}_{\mathrm{dsm}}^{r}
+
\mathcal{L}_{\mathrm{dsm}}^{x}
$$

对平移分量，论文选择权重后可化简为对干净 \(C_\alpha\) 位置的 MSE：

$$
\mathcal{L}_{\mathrm{dsm}}^{x}
=
\frac{1}{N}\sum_{n=1}^{N}\lVert X_n^{(0)}-\hat{X}_n^{(0)}\rVert_2^2
$$

仅靠 DSM 会生成粗略拓扑合理但细节不稳定的骨架，因此 FrameDiff 在低噪声阶段加入两个辅助项。第一个直接约束四类 backbone 原子 \(\Omega=\{N,C_\alpha,C,O\}\)：

$$
\mathcal{L}_{\mathrm{bb}}
=
\frac{1}{4N}\sum_{n=1}^{N}\sum_{a\in\Omega}
\lVert a_n^{(0)}-\hat{a}_n^{(0)}\rVert_2^2
$$

第二个约束局部邻域内的原子间距离，类似 AlphaFold distogram 的局部几何版本：

$$
\mathcal{L}_{2D}
=
\frac{1}{Z}
\sum_{n,m=1}^{N}\sum_{a,b\in\Omega}
\mathbf{1}\{d_{ab}^{nm}<0.6\}
\lVert d_{ab}^{nm}-\hat{d}_{ab}^{nm}\rVert_2^2
$$

完整损失为：

$$
\mathcal{L}
=
\mathcal{L}_{\mathrm{dsm}}
+
w\cdot\mathbf{1}\{t<T_F/4\}
(\mathcal{L}_{\mathrm{bb}}+\mathcal{L}_{2D})
$$

其中辅助损失只在低噪声阶段启用，因为链断裂、碰撞和精细键几何主要在采样末端显现。

##### 与 RFdiffusion 等方法的区别

RFdiffusion 的强项是把 RoseTTAFold 结构预测网络微调成强 denoiser；FrameDiff 的目标更偏“原则化的几何扩散”：它明确构造 \(SE(3)^N\) 上的前向/反向扩散、\(SO(3)\) score、居中平移过程和 \(SE(3)\) 不变性。论文重点说明，即使不依赖预训练结构预测权重，FrameDiff 也能在 monomer backbone generation 上生成可由 ProteinMPNN/ESMFold 自一致验证的设计。

这使 FrameDiff 的意义不只是一个蛋白质生成器，也是一套可复用的 \(SE(3)\) 扩散建模模板：当对象天然由多个刚体 frame 构成时，可以把“生成坐标”改写为“生成 Lie 群上的刚体变换”，从而把旋转、平移、等变性和物理局部几何放进同一个概率模型。

#### 🧪 练习题

```yaml
question: "FrameDiff 为什么要把蛋白质骨架表示为 SE(3)^N 上的 residue frames？"
options:
  - "为了只生成氨基酸序列而不生成三维结构"
  - "为了同时保留 Cα 位置和 N-Cα-C 局部方向，并在生成过程中保持全局 SE(3) 几何结构"
  - "为了把所有旋转都替换成普通欧氏高斯噪声"
  - "为了避免预测氧原子的 torsion angle"
answer: 1
explain: "每个 residue frame 同时编码 Cα 平移和主链局部朝向，使扩散过程能在 SE(3)^N 上处理旋转/平移 score；氧原子仍需额外预测 ψ 角。"
```
