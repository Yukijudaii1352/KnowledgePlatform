### RFdiffusion — 基于 RoseTTAFold 去噪扩散的蛋白质结构与功能设计

```yaml
id: rfdiffusion
name: RFdiffusion
full_name: "RFdiffusion (RFdiffusion)"
year: "2023.07"
org: "Baker Lab"
paper_url: "https://www.nature.com/articles/s41586-023-06415-8"
category: protein_design
parent: rosettafold
motivation: "扩散模型生成蛋白质骨架"
```

#### 📝 一句话总结

RFdiffusion 将 RoseTTAFold 从结构预测网络微调为蛋白质 residue frame 的扩散去噪网络，通过从随机噪声逐步生成骨架并支持 motif、靶标、对称性和拓扑条件，解决了传统 hallucination / inpainting 方法多样性不足、约束表达弱和实验成功率低的问题。

#### 🎯 核心要点

- **RoseTTAFold denoiser**：以更新版 RoseTTAFold 为骨干，最小化架构改动后改造成 DDPM 去噪网络
- **残基刚体 frame 扩散**：每个残基由 \(C_\alpha\) 坐标与 \(N-C_\alpha-C\) 刚体方向组成；平移加 3D Gaussian noise，方向使用旋转矩阵流形上的 Brownian motion
- **直接预测 \(\hat{X}_0\)**：每个时间步输入 noisy frames \(X_t\) 和上一步自条件预测 \(\hat{X}_0^{t+1}\)，输出当前干净结构预测 \(\hat{X}_0^t\)
- **MSE 去噪损失替代 FAPE**：训练时最小化未对齐 frame/坐标预测与真实结构之间的 MSE，保留反向扩散中全局坐标系的连续性
- **典型 200 步采样**：从随机 residue frames 出发，每步朝 \(\hat{X}_0^t\) 插值并加入匹配前向过程的噪声，逐渐收缩到设计骨架
- **条件生成能力**：同一框架支持无条件单体、fold/topology conditioning、motif scaffolding、binder design、对称寡聚体、酶活性位点 scaffolding 和对称 motif scaffolding
- **序列设计后处理**：通常用 ProteinMPNN 为 RFdiffusion 生成的 backbone 采样序列，再用 AF2/ESMFold 与实验筛选验证
- **大规模实验验证**：论文报告数百个设计的表达、组装、结合或金属配位实验，包含与设计模型高度一致的 cryo-EM 结构

#### 🔬 深入细节

##### 方法示意图

![RFdiffusion 方法总览](https://media.springernature.com/full/springer-static/image/art%3A10.1038%2Fs41586-023-06415-8/MediaObjects/41586_2023_6415_Fig1_HTML.png)
*图：Nature 论文 Figure 1。左侧对比普通扩散、RoseTTAFold 和 RFdiffusion 的单步去噪；右侧展示无条件、对称、binder、motif 和 symmetric motif 等条件生成任务。来源：Nature / Springer Figure 1 公开图片直链。*

##### 算法伪代码

```python
# RFdiffusion 推理伪代码
def rfdiffusion_sample(condition=None, T=200, noise_scale=1.0):
    """
    condition: 可为空，也可包含 motif residues、target protein、symmetry group、
               secondary structure / block adjacency 等条件
    T: 论文中常用约 200 个反向扩散步
    """
    # 1. 初始化随机 residue frames；条件片段按任务固定或部分加噪
    X_t = initialize_random_frames(condition)
    X0_self = None

    for t in range(T, 0, -1):
        # 2. RoseTTAFold denoiser：输入当前 noisy frames、条件、上一步预测
        X0_hat = RF_denoiser(
            noisy_frames=X_t,
            timestep=t,
            condition=condition,
            template_self_condition=X0_self,
        )

        # 3. 根据扩散日程，从 X_t 向 X0_hat 做 noisy interpolation
        X_prev = interpolate_towards_prediction(
            X_t=X_t,
            X0_hat=X0_hat,
            timestep=t,
            noise_scale=noise_scale,
        )

        # 4. 自条件：下一步把当前预测作为 template 输入
        X0_self = X0_hat
        X_t = enforce_condition_if_needed(X_prev, condition)

    # 5. 生成序列并筛选
    backbone = X_t
    sequences = ProteinMPNN.sample(backbone, num_sequences=8)
    return filter_with_structure_prediction(backbone, sequences)
```

##### 动机与背景

在 RFdiffusion 之前，蛋白质深度设计主要有两类路径：一类是 hallucination，通过优化序列让结构预测网络“相信”它会折叠成某种结构；另一类是 RFjoint Inpainting，在给定 motif 或部分骨架的情况下补全其余结构。它们都能解决部分问题，但通常需要较强约束、人工调参，且对同一设计任务生成的多样性有限。

RFdiffusion 的核心判断是：RoseTTAFold 已经在结构预测中学习到了大量蛋白质几何先验，包括 residue frame 表示、旋转等变处理、残基级/残基对级/三维坐标级条件输入能力。与其从零训练一个蛋白质扩散网络，不如把 RF 微调成 DDPM 的 denoiser，让它学习“从被噪声破坏的 protein frames 恢复干净结构”。

##### noising / denoising 机制

RFdiffusion 使用 RF 的 residue frame 表示。简化地说，第 \(n\) 个残基的状态是：

$$
X_n=(x_n,R_n),\qquad x_n\in\mathbb{R}^3,\ R_n\in SO(3)
$$

其中 \(x_n\) 是 \(C_\alpha\) 坐标，\(R_n\) 编码 \(N-C_\alpha-C\) 刚体方向。训练样本来自 PDB：坐标分量用 3D Gaussian noise 扰动，方向分量用旋转矩阵流形上的 Brownian motion 扰动。可把前向过程直观写成：

$$
q(X_t|X_0)=q(x_t|x_0)\,q(R_t|R_0)
$$

其中 \(q(x_t|x_0)\) 是欧氏空间中的高斯扩散核，\(q(R_t|R_0)\) 是 \(SO(3)\) 上的旋转扩散核。反向时，模型不是预测噪声 \(\epsilon\)，而是在每个时间步预测干净结构：

$$
\hat{X}_0^t=f_\theta(X_t,t,\hat{X}_0^{t+1},c)
$$

这里 \(c\) 表示条件信息，例如固定 motif、靶标表面 hotspot、对称群或 fold sketch。下一步输入 \(X_{t-1}\) 由 \(X_t\) 朝 \(\hat{X}_0^t\) 的 noisy interpolation 得到：

$$
X_{t-1}\approx \mathrm{Interp}(X_t,\hat{X}_0^t,t)+\sigma_t z
$$

这个“朝预测干净结构走一步，再补上合适噪声”的过程使反向轨迹在统计上匹配前向 noising 轨迹。

##### 训练目标：为什么用 MSE 而不是 FAPE

RoseTTAFold 原本的结构预测训练常用 FAPE（frame aligned point error），它对全局参考系不敏感，非常适合“给定序列预测结构”。但扩散采样需要在 \(t=T\rightarrow 0\) 的多步轨迹中保持全局坐标系连续：如果每一步预测都可任意全局对齐，下一步的 noisy interpolation 就失去明确方向。

RFdiffusion 因此使用未对齐的 MSE 去噪目标。简化表示为：

$$
\mathcal{L}_{\mathrm{denoise}}
=
\frac{1}{N}\sum_{n=1}^{N}
\left\|
\hat{X}_{0,n}^{t}-X_{0,n}
\right\|_2^2
$$

实际实现中会对 residue frame / backbone 坐标预测求平均。关键不是 MSE 本身多复杂，而是“不做全局对齐”：模型必须学习在同一坐标系中把 \(X_t\) 推回 \(X_0\)，这让连续去噪轨迹有稳定的方向感。

> 💡 **关键直觉**：结构预测只需要“形状对”；扩散生成还需要“每一步往哪里走”。未对齐 MSE 把全局坐标系也纳入学习信号，避免反向过程在不同对齐方式之间跳动。

##### 自条件与条件控制

RFdiffusion 在每个时间步把上一时间步的 \(\hat{X}_0^{t+1}\) 作为 template 输入，这就是 self-conditioning。早期噪声很大时，\(\hat{X}_0\) 并不像蛋白质；随着迭代推进，预测结构逐渐变得 protein-like，自条件提供了一个连续演化的结构记忆。

条件控制则来自 RF 架构本身的多通道输入能力：

- **motif scaffolding**：固定功能 motif 的坐标和身份，对其余 residues 扩散生成
- **binder design**：输入 target protein 和 interface hotspot，生成能贴合目标表面的新 binder
- **symmetric oligomer**：对初始噪声和模型输出施加对称操作，利用近似等变性生成 C/D/T 等对称组装体
- **fold conditioning**：输入 secondary structure 与 block adjacency，控制粗粒度拓扑
- **active-site scaffolding**：对很小的催化/配位 motif 使用专项微调模型，避免生成时 motif 漂移

这种机制类似图像扩散中的 prompt：条件不需要完整指定结构，只要能约束一部分几何或功能目标，反向扩散就会在蛋白质先验下补全其余部分。

##### 设计流程与验证

RFdiffusion 通常只生成 backbone。得到 backbone 后，论文实践中多用 ProteinMPNN 采样约 8 条序列，再用 AF2/ESMFold 评估序列是否会折叠回设计骨架，最后选择少量候选进入表达、组装、结合或结构解析实验。这个 pipeline 的优势是职责清晰：RFdiffusion 负责高质量几何先验和条件生成，ProteinMPNN 负责快速 inverse folding，结构预测和实验负责筛选。

论文结果显示，RFdiffusion 在无条件单体生成中能产生 300-600 aa 的新颖骨架；在 25 个 motif scaffolding benchmark 中解决 23 个，超过 hallucination 和 RFjoint inpainting；在 binder design 中通过 target + hotspot 条件生成多个靶标的结合蛋白，其中 HA binder 的 cryo-EM 结构与设计模型高度一致；在对称寡聚体和金属配位设计中也能把几何约束转化为可表达、可组装的蛋白。

##### 与传统方法的关键区别

传统 Rosetta / hallucination 工作流常把设计问题拆成“选择 scaffold、优化序列、反复过滤”，搜索空间强依赖人工经验。RFjoint Inpainting 虽能补全 motif 周围结构，但它更接近一次性条件补全，随机性和生成多样性有限。RFdiffusion 则把设计变成从噪声到结构的条件概率采样：

$$
p_\theta(X_0|c)
=
\int p(X_T)\prod_{t=1}^{T}p_\theta(X_{t-1}|X_t,c)\,dX_{1:T}
$$

这带来两个实际收益：第一，同一条件可以采样多个不同解，覆盖更广结构空间；第二，条件可以很弱，例如只给 target hotspot 或小 motif，模型会在扩散先验下生成完整、设计性更好的 backbone。

#### 🧪 练习题

```yaml
question: "RFdiffusion 为什么在去噪训练中使用未对齐的 MSE，而不是 RoseTTAFold 结构预测常用的 FAPE？"
options:
  - "因为 MSE 可以完全跳过旋转方向建模"
  - "因为扩散反向轨迹需要保持全局坐标系连续，未对齐 MSE 会惩罚坐标系漂移"
  - "因为 FAPE 只能用于氨基酸序列生成"
  - "因为 MSE 不需要任何真实结构监督"
answer: 1
explain: "FAPE 对全局参考系不敏感，适合结构预测；扩散采样需要每一步在同一坐标系中从 X_t 走向 X_0，因此 RFdiffusion 用未对齐 MSE 保持轨迹连续。"
```
