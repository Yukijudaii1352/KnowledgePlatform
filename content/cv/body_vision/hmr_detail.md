### HMR — 人体网格恢复 (Human Mesh Recovery)

```yaml
id: hmr
name: HMR
full_name: 人体网格恢复 (Human Mesh Recovery)
year: '2018'
org: UC Berkeley
paper_url: https://arxiv.org/abs/1712.06584
category: mesh
parent: smplify
motivation: 端到端回归参数引入对抗训练解决数据缺失
```

#### 📝 一句话总结

HMR 提出端到端从单张 RGB 图像直接回归 SMPL 姿态、形状和相机参数的框架，用 2D 重投影损失利用 in-the-wild 标注，并用对抗判别器约束输出落在真实人体参数分布上。它把 SMPLify 的慢速优化路线推进到实时前馈 mesh recovery，同时缓解 3D 标注稀缺问题。

#### 🎯 核心要点

- 端到端 Human Mesh Recovery：输入裁剪人体图像，输出 SMPL 参数、弱透视相机和完整 3D mesh
- Iterative Error Feedback：多次迭代更新参数估计，而不是一次性回归全部参数
- 2D reprojection supervision：利用 LSP、MPII、COCO 等仅有 2D 关键点的数据训练
- 对抗人体先验：判别器判断预测的姿态/形状参数是否像真实 MoCap/3D 人体样本
- 可使用或不使用 paired 2D-to-3D 数据：支持半监督/弱监督训练设定
- 不依赖中间 2D 检测器：直接从图像像素预测 3D body 参数
- 实时推理：给定人体框后前馈输出 mesh，明显快于逐图优化的 SMPLify
- 后续影响：成为单图 SMPL 参数回归路线的经典 baseline，并被 SPIN、VIBE 等方法继承

#### 🔬 深入细节

##### 架构总览图

![HMR 架构总览](https://ar5iv.labs.arxiv.org/html/1712.06584/assets/x2.png)
*图：HMR 由图像编码器、迭代 3D 回归器和对抗判别器组成。回归器输出 SMPL 参数和相机，判别器约束姿态/形状分布。*

##### 算法伪代码

```python
# HMR 前向与训练伪代码
def hmr_forward(image):
    feat = image_encoder(image)
    theta = mean_smpl_parameters()  # pose, shape, camera

    for _ in range(num_iterations):
        delta = iterative_regressor(concat(feat, theta))
        theta = theta + delta

    pose, beta, camera = unpack(theta)
    vertices, joints_3d = SMPL(beta, pose)
    joints_2d = project_weak_perspective(joints_3d, camera)
    return pose, beta, camera, vertices, joints_2d

def train_hmr(batch):
    pose, beta, cam, vertices, joints_2d = hmr_forward(batch.image)

    loss = reprojection_loss(joints_2d, batch.joints_2d)
    if batch.has_3d:
        loss += supervised_3d_loss(pose, beta, batch.smpl_or_joints_3d)

    # 生成器希望骗过人体参数判别器
    loss += adversarial_generator_loss(discriminator(pose, beta))
    update_generator(loss)

    # 判别器区分真实 MoCap/SMPL 参数和网络预测参数
    update_discriminator(real_params=batch.real_3d_params,
                         fake_params=(pose.detach(), beta.detach()))
```

##### 动机与背景

SMPLify 能从 2D 关键点拟合出 3D mesh，但每张图都要迭代优化，速度慢且依赖检测点质量。直接训练 CNN 回归 SMPL 参数又面临数据问题：in-the-wild 图像有大量 2D 关键点标注，却缺少成对的 3D pose/shape；有 3D 标注的数据多来自实验室 MoCap，外观和场景分布与真实图像差距大。

HMR 的核心策略是利用两类非配对数据：真实图像提供 2D 关键点监督，MoCap/3D 扫描提供人体参数分布监督。网络只要预测出的 mesh 投影能对齐图像关键点，并且参数看起来像真实人体，就能在缺少 paired 3D 标注时学习。

##### Iterative Error Feedback 回归器

HMR 不让网络一次性预测完整 SMPL 参数，而是从平均人体参数开始，反复预测残差：

$$
\Theta_{t+1}=\Theta_t+\Delta\Theta_t,\quad
\Delta\Theta_t=f_\phi(\mathbf{z},\Theta_t)
$$

其中 \(\mathbf{z}\) 是图像特征，\(\Theta\) 包含姿态、形状和相机。迭代回归有两个好处：第一，网络每次只需学习从当前估计到更好估计的增量；第二，把当前参数作为输入可以形成 feedback，让后续迭代修正前一步的错误。

##### 2D 重投影与弱透视相机

给定 SMPL 输出的 3D 关节 \(X_i\)，HMR 使用弱透视相机投影：

$$
\hat{x}_i = s \Pi(RX_i) + t
$$

训练中最基本的图像监督是：

$$
\mathcal{L}_{2D}=\sum_i v_i\|\hat{x}_i-x_i^{gt}\|_1
$$

其中 \(v_i\) 是关键点可见性或置信度。这个损失允许 HMR 使用大量只有 2D 关键点的真实图像。不过，仅靠 \(\mathcal{L}_{2D}\) 会产生深度和身体形状歧义，因此必须配合人体先验。

##### 对抗人体先验

HMR 的判别器不是判别图像真伪，而是判别人体参数真伪。真实样本来自 MoCap/3D 人体数据库，假样本是网络从图像预测的 \((\theta,\beta)\)。对抗目标可概括为：

$$
\min_G \max_D \mathbb{E}_{\Theta\sim p_{real}}\log D(\Theta)
+\mathbb{E}_{I\sim p_{img}}\log(1-D(G(I)))
$$

判别器迫使生成器输出看起来像真实人体的姿态和体型，弥补 2D 重投影损失的欠约束。论文还采用分解式判别策略，对单个关节旋转、整体姿态和形状分别施加先验，使判别更稳定。

> 💡 关键：HMR 的监督并不要求每张真实图像都有 3D mesh。2D 图像监督负责图像对齐，对抗先验负责人体合理性，两者组合支撑端到端训练。

##### 与 SMPLify 的区别

SMPLify 是 test-time optimization，每张图都求解一个新的优化问题；HMR 是 learnable feed-forward regression，训练后一次前向即可输出 mesh。SMPLify 的几何目标更显式，但速度慢；HMR 速度快、可端到端学习，但早期结果可能不如优化方法贴合图像细节。SPIN 后来正是把两者结合：用 HMR 类网络初始化优化，再用优化结果监督网络。

#### 🧪 练习题

```yaml
question: "HMR 中对抗判别器主要解决什么问题？"
options:
  - "判断输入图像是不是人体图片"
  - "约束预测 SMPL 姿态和形状落在真实人体参数分布上，缓解 2D 重投影的欠约束"
  - "替代 SMPL 模型生成网格"
  - "加速人体检测框生成"
answer: 1
explain: "2D 重投影无法唯一确定合理 3D 人体；判别器利用真实 3D/MoCap 参数分布，为预测 pose 和 shape 提供弱监督先验。"
```
