### SMPL — 多人线性模型 (Skinned Multi-Person Linear Model)

```yaml
id: smpl
name: SMPL
full_name: 多人线性模型 (Skinned Multi-Person Linear Model)
year: '2015'
org: MPI
paper_url: https://dl.acm.org/doi/abs/10.1145/3596711.3596800
category: mesh
parent: —
motivation: 基于顶点的线性模型解耦形状与姿态参数
```

#### 📝 一句话总结

SMPL 提出一个可微、可动画、与图形学 skinning 管线兼容的人体参数化网格模型，用低维形状参数 \(\beta\) 和姿态参数 \(\theta\) 生成固定拓扑的人体 mesh。它把身份形状、姿态相关形变、关节位置回归和线性/双四元数蒙皮统一到一个基于顶点的线性框架中，成为后续人体网格恢复方法的事实基础模型。

#### 🎯 核心要点

- 固定拓扑人体 mesh：SMPL 使用约 6890 个顶点的模板网格，输出完整人体表面而不是稀疏骨架
- 解耦形状与姿态：\(\beta\) 控制体型主成分，\(\theta\) 控制关节旋转
- 形状 blend shapes：用 PCA 学到的线性形状基表示不同身高、胖瘦和身体比例
- 姿态 blend shapes：把姿态相关非刚性形变写成关节旋转矩阵元素的线性函数
- 形状相关关节回归：关节位置 \(J(\beta)\) 随体型变化，而不是固定骨架长度
- 标准蒙皮兼容：最终通过 Linear Blend Skinning 或 Dual Quaternion Skinning 生成 posed mesh，可导出到常见动画/渲染管线
- 数据驱动训练：从多姿态扫描和 CAESAR 体型扫描中学习模板、blend weights、关节回归器和 corrective shapes
- 后续影响：SMPLify、HMR、SPIN、VIBE、GraphCMR 等都把 SMPL 作为显式人体先验或监督空间

#### 🔬 深入细节

##### 模型视觉参考

![SMPL 官方视频缩略图](https://img.youtube.com/vi/kuBlUyHeV5U/0.jpg)
*图：SMPL 官方展示视频缩略图。原论文 PDF 中的模型图展示了从模板、形状 blend shape、姿态 blend shape 到蒙皮后网格的生成过程；官方页面和 PDF 可见于 https://smpl.is.tue.mpg.de/ 与 https://files.is.tue.mpg.de/black/papers/SMPL2015.pdf。*

##### 算法伪代码

```python
# SMPL 前向生成伪代码
def smpl_forward(beta, theta, model):
    # model: template, shape_dirs, pose_dirs, joint_regressor, skinning_weights
    T_bar = model.template_vertices          # [N, 3]
    S = model.shape_blend_shapes             # [num_beta, N, 3]
    P = model.pose_blend_shapes              # [(K-1)*9, N, 3]

    # 1. 身份形状：不同体型的静态形变
    B_shape = sum(beta[i] * S[i] for i in range(num_beta))

    # 2. 姿态形状：由关节旋转偏离 rest pose 产生的 corrective blend shape
    pose_feature = rotation_matrices(theta[1:]) - identity_rotations()
    B_pose = linear_combination(pose_feature.flatten(), P)

    # 3. rest-pose shaped template
    T_pose = T_bar + B_shape + B_pose

    # 4. 关节位置随体型变化
    J = model.joint_regressor @ (T_bar + B_shape)

    # 5. 标准蒙皮生成 posed mesh
    vertices = linear_blend_skinning(T_pose, J, theta, model.skinning_weights)
    return vertices, J
```

##### 动机与背景

在 SMPL 之前，人体模型大致分成两类：图形学中广泛使用的骨骼蒙皮模型，以及计算机视觉/图形学研究中更精细但复杂的统计形变模型。前者容易部署到游戏引擎和动画软件，但关节处常出现 “taffy” 或 “bowtie” 等不真实变形；后者能拟合真实扫描，但通常不兼容标准渲染管线，计算和工程成本也更高。

SMPL 的目标是把两边结合起来：保留标准 skinning 的简单性和可部署性，同时从真实扫描数据中学习体型和姿态造成的非刚性表面形变。它不是把人体看作若干刚性骨骼，也不是完全自由的隐式表面，而是一个固定拓扑、低维参数、可导的三角网格模型。

##### 核心公式

SMPL 的 shaped/posed 模板可以写成：

$$
T_P(\beta,\theta)=\bar{T}+B_S(\beta)+B_P(\theta)
$$

其中 \(\bar{T}\) 是平均模板，\(B_S\) 是身份形状形变，\(B_P\) 是姿态相关形变。形状项是线性的：

$$
B_S(\beta)=\sum_{n=1}^{|\beta|}\beta_n S_n
$$

姿态项同样是线性的，但输入不是轴角本身，而是每个关节相对 rest pose 的旋转矩阵元素：

$$
B_P(\theta)=\sum_n (R_n(\theta)-R_n(\theta^*))P_n
$$

这个设计很关键：旋转矩阵元素有界，且能直接描述关节旋转造成的局部形变；把 corrective blend shape 写成旋转矩阵元素的线性函数，使模型既可学习又易于动画系统实现。

最终网格由蒙皮函数输出：

$$
M(\beta,\theta)=W(T_P(\beta,\theta),J(\beta),\theta,\mathcal{W})
$$

其中 \(J(\beta)\) 是从形状后模板回归出的关节位置，\(\mathcal{W}\) 是 blend weights。由于关节随体型变化，胖瘦、高矮不同的人不会共享同一套不合理骨架。

##### 训练流程

SMPL 的参数包括平均模板、形状基、姿态基、关节回归器和蒙皮权重。论文使用两类注册到同一拓扑的 3D 扫描数据：多姿态数据用于学习姿态相关变形和蒙皮权重，多体型数据用于学习身份形状空间。优化目标本质上是最小化模型输出网格与注册扫描之间的逐顶点误差：

$$
\mathcal{L}_{vertex}=\sum_i\|M_i(\beta,\theta)-V_i^{scan}\|_2^2
$$

训练完成后，SMPL 可以用几十维参数表达一个完整人体：常见设置中 \(\theta\) 包含 24 个关节的旋转，\(\beta\) 常取前 10 个形状主成分。这个低维、可微、可渲染的表示让后续视觉模型可以把“预测人体”转化为“预测 SMPL 参数”。

##### 为什么 SMPL 成为基础设施

SMPL 的强点不只是形状真实，而是接口稳定。给定 \((\beta,\theta)\)，它确定性输出 mesh、关节位置和可投影到图像的 3D 结构；给定 2D/3D 观测，也可以通过优化反推参数。这使它同时适合优化方法、神经网络监督、可 differentiable rendering、动作生成和 avatar 驱动。

> 💡 关键：SMPL 把人体先验压缩为一个可微函数 \(M(\beta,\theta)\)。后续方法的差别往往在于如何从图像、视频或关键点估计 \(\beta,\theta\)，而不是重新定义人体表面本身。

##### 与 SCAPE/传统蒙皮的区别

SCAPE 等模型使用更复杂的三角形形变表示，表面拟合能力强但不易接入标准图形管线。传统 LBS/DQBS 兼容性好，但缺少数据驱动的 pose corrective。SMPL 的折中是：仍用标准蒙皮完成姿态变换，但在蒙皮前加入 learned blend shapes 修正体型和姿态形变，因此既能在动画工具中运行，又能表达真实人体扫描中的非刚性变化。

#### 🧪 练习题

```yaml
question: "SMPL 中姿态相关 blend shape 的关键设计是什么？"
options:
  - "直接把图像像素映射为三角面片"
  - "把关节旋转矩阵相对 rest pose 的元素作为线性输入，预测姿态造成的表面校正"
  - "只使用固定骨架长度，不考虑体型变化"
  - "用文本描述控制人体网格"
answer: 1
explain: "SMPL 将 pose corrective 写成旋转矩阵元素的线性函数，既能学习关节处非刚性形变，又保持与标准蒙皮和图形管线兼容。"
```
