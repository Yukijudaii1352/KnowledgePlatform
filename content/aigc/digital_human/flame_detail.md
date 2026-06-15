### FLAME — 可表达头颈姿态的统计 3D 面部模型

```yaml
id: flame
name: FLAME
full_name: "面部参数化模型 (Faces Learned with Articulated Model)"
year: "2017"
org: "MPI-IS"
paper_url: "https://arxiv.org/abs/1606.05535"
category: "expression"
parent: "—"
motivation: "统计学3D面部颈部联合参数化"
```

#### 📝 一句话总结

FLAME 提出把身份形状、表情 blendshape、下颌/颈部/眼球关节姿态和线性蒙皮统一到一个低维可微 3D 头部模型中，解决传统 3DMM 对头颈姿态和大表情建模不足的问题。

#### 🎯 核心要点

- **统计头部模型**：从 3D/4D 扫描中学习身份形状空间和表情空间
- **关节式建模**：显式包含颈部、下颌、眼球等 articulations，而不是只拟合静态面部网格
- **线性 blend skinning**：沿用 SMPL 风格的 pose-dependent deformation 与 LBS，使模型可动画化
- **低维参数接口**：通常由形状参数 \(\beta\)、表情参数 \(\psi\)、姿态参数 \(\theta\) 控制，便于优化和学习
- **可微拟合基础件**：后续 DECA、SMPL-X、talking head、avatar reconstruction 等大量方法以 FLAME 作为脸部先验
- **资料限制**：manifest 中 arXiv 链接可访问，但 FLAME 的正式资料主要来自 MPI 官方页面和论文 PDF/项目资源

#### 🔬 深入细节

##### 核心示意图

![FLAME 模型示意图](https://ar5iv.labs.arxiv.org/html/1606.05535/assets/x1.png)
*图：FLAME 的形状、表情和姿态参数共同驱动头部网格，输出带颈部与下颌运动的可动画化人脸。*

##### 核心流程伪代码

```python
# FLAME 前向模型简化
def flame_forward(beta, psi, theta):
    # beta: identity shape, psi: expression, theta: neck/jaw/eye pose
    T = template_vertices
    T = T + shape_basis @ beta
    T = T + expression_basis @ psi
    T = T + pose_corrective_blendshapes(theta)

    joints = regress_joints(T)
    vertices = linear_blend_skinning(
        vertices=T,
        joints=joints,
        rotations=axis_angle_to_rotmat(theta),
        skinning_weights=W,
    )
    landmarks = barycentric_landmark_interpolation(vertices)
    return vertices, landmarks
```

##### 方法解读

传统 3DMM 常把脸看成一个静态线性空间：

$$
S=\bar{S}+B_{\text{shape}}\beta+B_{\text{exp}}\psi
$$

这种表示易于拟合，但对大幅张嘴、转头、抬头、低头等带关节运动的变化不够自然。FLAME 的核心是把面部统计模型和 articulated body model 思路合并：先用身份和表情 blendshape 得到模板形变，再用姿态相关修正与线性蒙皮产生最终网格。

更完整的形式可以写成：

$$
M(\beta,\psi,\theta)=W(T_P(\beta,\psi,\theta), J(\beta), \theta, \mathcal{W})
$$

其中 \(T_P\) 是加入身份、表情和 pose-corrective blendshape 后的模板，\(J(\beta)\) 是由形状回归出的关节位置，\(\mathcal{W}\) 是蒙皮权重，\(W\) 是 LBS。这个结构让下颌张开不再只是局部嘴部顶点线性形变，而是受 jaw joint 旋转控制，因而更适合说话、咀嚼和夸张表情。

FLAME 的另一个重要选择是把颈部纳入模型。对数字人来说，脸部表情和头部姿态不是分离的：说话时下颌、脖子和头部会共同运动。加入 neck pose 可以让模型在拟合视频或动捕时避免把头部转动错误吸收到表情系数里，减少身份形变和表情形变的混淆。

训练上，FLAME 依赖大规模 3D head scans 和 4D expression sequences。身份空间从中性扫描学习，表情空间从动态表情序列学习，姿态相关形变则补偿骨骼旋转带来的非刚性变化。最终模型的参数低维、可微、可渲染，因此非常适合作为 inverse rendering、单图 3D face reconstruction、talking head motion transfer 的优化变量。

和更早的 Basel Face Model 相比，FLAME 的关键优势不是纹理统计，而是“可动画化”：它把可控关节、表情空间和头颈一致性放进同一个函数。后续 DECA 在 FLAME 上增加细节位移，SMPL-X 把 FLAME 融入全身模型，NPHM/GPHM 等新模型也常以 FLAME 作为对照基线或初始化先验。

> 💡 关键：FLAME 是很多数字人方法的“几何参数接口”，它牺牲了毛发、牙齿、细纹等高频外观，换来稳定、低维、可优化的头脸控制空间。

#### 🧪 练习题

```yaml
question: "FLAME 相比传统线性 3DMM 的核心改进是什么？"
options:
  - "只使用 2D landmark，不需要 3D 扫描"
  - "引入颈部、下颌等关节姿态和线性蒙皮，使人脸模型可动画化"
  - "完全用 NeRF 替代网格"
  - "只建模头发和衣服"
answer: 1
explain: "FLAME 不只是线性形状/表情 PCA，还显式建模 neck、jaw、eyes 等姿态，并用 LBS 生成最终网格，因此能更自然地表示说话和头颈运动。"
```
