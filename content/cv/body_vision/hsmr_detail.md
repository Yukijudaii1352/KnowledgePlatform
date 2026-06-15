### HSMR

```yaml
id: hsmr
name: HSMR
full_name: 人体骨骼与网格恢复 (Human Skeleton and Mesh Recovery)
year: '2026.03'
org: arXiv
paper_url: https://arxiv.org/abs/2503.07162
category: mesh
parent: vibe
motivation: 集成生物力学骨骼模型杜绝解剖学错误
```

#### 📝 一句话总结

HSMR 提出从单张图像端到端恢复 SKEL 生物力学骨骼和人体网格参数的方法，用真实关节自由度替代 SMPL 的球关节假设，解决传统 HMR 可能产生解剖学不合理旋转的问题。给定 `paper_url` 与公开 HSMR 论文不匹配，本文按官方项目和 arXiv `2503.21751` 的 HSMR 论文精读。

#### 🎯 核心要点

- **SKEL 参数化目标**：恢复带生物力学骨骼的 SKEL 模型，而不是只恢复 SMPL/SMPL-X 表面。
- **单图 Transformer 回归器**：输入单张人体图像，输出 SKEL 姿态 \(q\)、形状 \(\beta\) 和相机 \(\pi\)。
- **SMPL-to-SKEL 伪标签**：在没有图像级 SKEL 真值数据的情况下，把已有 SMPL 伪真值拟合转换为 SKEL 参数。
- **迭代伪标签细化**：训练过程中用当前 HSMR 估计初始化 SKELify，再对 2D 关键点优化，逐步提升伪标签质量。
- **解剖学约束优势**：SKEL 只允许每个关节真实可行的自由度，可显著减少不自然扭转。
- **速度优于优化基线**：相比“先 HMR2.0 再 SKEL fit”的两阶段优化，HSMR 直接回归更快且更稳定。

#### 🔬 深入细节

##### 核心示意图

![HSMR 方法总览](https://arxiv.org/html/2503.21751v1/x1.png)
*图：HSMR 以单张图像为输入，使用 Transformer 回归 SKEL 姿态、形状和相机，并通过 SKELify 生成和迭代细化伪标签。*

##### 算法伪代码

```text
Algorithm: HSMR biomechanical skeleton and mesh recovery
# HSMR 训练流程
def build_initial_skel_labels(dataset_with_smpl):
    labels = []
    for image, smpl_params in dataset_with_smpl:
        smpl_mesh = SMPL(smpl_params)
        q, beta = fit_SKEL_to_SMPL_mesh(smpl_mesh)
        labels.append((image, q, beta))
    return labels

def train_hsmr(images, skel_labels):
    for image, (q_gt, beta_gt) in batch(images, skel_labels):
        q_pred, beta_pred, cam = transformer_regressor(image)
        skel_mesh, skel_joints = SKEL(q_pred, beta_pred)

        loss = pose_loss(q_pred, q_gt) + shape_loss(beta_pred, beta_gt)
        loss += joint_2d_loss(project(skel_joints, cam), keypoints_2d(image))
        loss += joint_3d_or_mesh_loss_if_available(skel_mesh, skel_joints)
        update(loss)

        if refinement_step:
            q_refined, beta_refined = SKELify(
                init=(q_pred, beta_pred),
                keypoints_2d=keypoints_2d(image),
                shape_prior=True,
                pose_limits=True,
            )
            replace_label_if_better(image, q_refined, beta_refined)
```

##### 动机与背景

SMPL 系列模型把人体关节常近似为球关节，每个关节都可在 3 个自由度上旋转。这种表示非常方便神经网络回归和图形学蒙皮，但不完全符合人体解剖结构。比如膝盖和肘部主要是铰链式运动，肩、髋、脊柱也有不同的运动范围。普通 HMR 网络即使 2D/3D 关键点误差不大，也可能生成局部解剖学不可能的旋转。

SKEL 模型把 SMPL 表面和生物力学骨骼模型结合起来，保留 6890 顶点的人体表面，同时用更真实的骨骼自由度驱动姿态。HSMR 的问题是：几乎没有大规模“图像到 SKEL 参数”的训练集。因此论文的主要贡献不只是换一个回归目标，还包括构造伪标签和迭代细化的训练方案。

##### SKEL 表示

HSMR 采用的 SKEL 函数可写为：

$$
\mathcal{S}(q,\beta) \rightarrow (M, S)
$$

其中 \(q \in \mathbb{R}^{46}\) 是 SKEL 姿态参数，\(\beta \in \mathbb{R}^{10}\) 是与 SMPL 兼容的体型参数，\(M \in \mathbb{R}^{3 \times N}\) 是皮肤网格，\(N=6890\)，\(S\) 是骨骼几何。与 SMPL 的关键差异在于，SKEL 不为所有关节分配统一的三自由度球关节，而是按人体结构定义可行自由度和运动范围。

> 💡 关键：HSMR 的准确性目标有两层。第一层是常规 2D/3D 关节和网格误差，第二层是生成的姿态必须符合人体骨骼运动学。

##### 伪标签生成与迭代细化

初始伪标签来自已有 HMR 数据集中的 SMPL 伪真值。论文先把 SMPL 网格作为目标，优化 SKEL 参数使 SKEL 表面尽量贴合该 SMPL 网格：

$$
(q^*,\beta^*)=\arg\min_{q,\beta} E_{\text{mesh}}(\mathcal{S}(q,\beta), M_{smpl}) + E_{\text{prior}}(q,\beta)
$$

直接转换会产生失败样本，因为 SMPL 的不自然旋转不一定能被 SKEL 合理解释。HSMR 因此在训练中反复执行 SKELify：用网络当前预测作为初始化，再优化 2D 关键点重投影、体型先验和姿态约束，得到更可信的 SKEL 标签。

##### 训练目标

网络输出 \((\hat{q},\hat{\beta},\hat{\pi})\)，经过 SKEL 前向得到网格和关节。训练损失可概括为：

$$
\mathcal{L} =
\lambda_q \|\hat{q}-q^*\|
+ \lambda_\beta \|\hat{\beta}-\beta^*\|
+ \lambda_{2d}\|\Pi_{\hat{\pi}}(\hat{J})-J_{2d}\|
+ \lambda_{3d}\|\hat{J}-J_{3d}\|
$$

在只有 2D 标注时，重投影项依然可用；有 3D 标注或伪 3D 标签时，再加入关节或网格监督。由于 SKEL 本身限制了不合理自由度，模型不需要单靠事后惩罚去修正所有解剖错误。

##### 与传统方法的区别

HMR2.0、VIBE 等方法重点在“从图像估计 SMPL 表面和关节”。HSMR 则把“生物力学骨骼是否合理”放进输出空间本身。两阶段方法可以先预测 SMPL 再做 SKEL fitting，但论文报告这种做法慢且容易在转换时退化。HSMR 的端到端回归避免每帧长时间优化，在极端姿态和视角下更能保持骨骼合理性。

#### 🧪 练习题

```yaml
question: "HSMR 采用 SKEL 作为输出模型的主要目的是什么？"
options:
  - "增加网格顶点数量以提升表面分辨率"
  - "用生物力学骨骼自由度减少解剖学不合理姿态"
  - "把单图重建改成多视角重建"
  - "只估计骨架，不再输出人体表面网格"
answer: 1
explain: "SKEL 将人体表面绑定到更真实的骨骼模型上，限制关节自由度，因此能减少 SMPL 式球关节表示带来的不自然扭转。"
```
