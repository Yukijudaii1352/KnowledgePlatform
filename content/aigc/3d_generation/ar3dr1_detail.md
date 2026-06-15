### AR3DR1 - 强化学习3D生成 (AR3DR1)

```yaml
id: ar3dr1
name: AR3DR1
full_name: 强化学习3D生成 (AR3DR1)
year: "2026.03"
org: CVPR
paper_url: https://arxiv.org/abs/2603.15000
category: native_3d
parent: luciddreamer
motivation: high-GRPO分层RL优化生成
```

#### 📝 一句话总结

AR3DR1 将 GRPO 类强化学习引入自回归文本到 3D 生成，并用 Hi-GRPO 把粗几何规划和局部纹理细化拆成分层优化步骤，解决 3D 资产在全局结构、部件一致性和纹理偏好之间难以同时对齐的问题。

#### 🎯 核心要点

- 以自回归 3D token 生成器为策略模型，先生成语义/视觉推理 token，再生成可解码为 3D mesh 的离散 latent token
- 采用 group-relative reward，不训练 value model，而是在同一 prompt 的多候选 3D 输出内归一化优势
- Hi-GRPO 分成 Step 1 粗形状生成和 Step 2 纹理/局部细节细化，并为两个阶段配置不同 reward ensemble
- 奖励包含人类偏好、文本-3D 对齐、多视角一致性、部件完整性等维度，使用 6 视角渲染评估 3D 输出
- 提出 MME-3DR 作为复杂 3D 推理基准，覆盖机械结构、非刚体、稀有概念和风格化物体等难例
- 资料限制：manifest 给出的 `paper_url` 当前不是 AR3D-R1 对应论文；以下基于公开 AR3D-R1/3DGen-R1 项目资料和 manifest 元信息整理

#### 🔬 深入细节

##### 核心示意图

![AR3D-R1 结果与强化学习总览](https://raw.githubusercontent.com/Ivan-Tang-3D/3DGen-R1/main/figures/teaser.png)
*图：公开项目页中的 AR3D-R1 结果与 RL 增强文本到 3D 生成概览。manifest 中的链接不可直接作为该论文依据，因此这里使用项目公开图补足核心示意。*

##### 核心流程伪代码

```python
# Hi-GRPO for autoregressive text-to-3D generation
for prompt in training_prompts:
    candidates = []
    for i in range(group_size):  # e.g. G = 8
        semantic_cot = policy.sample_text_reasoning(prompt, level="global")
        coarse_tokens = policy.sample_3d_tokens(prompt, semantic_cot)
        coarse_mesh = vqvae.decode(coarse_tokens)

        visual_cot = policy.sample_text_reasoning(
            prompt, semantic_cot, level="local_texture"
        )
        refined_tokens = policy.sample_3d_tokens(prompt, semantic_cot, visual_cot)
        refined_mesh = vqvae.decode(refined_tokens)
        candidates.append((semantic_cot, coarse_tokens, visual_cot, refined_tokens,
                           coarse_mesh, refined_mesh))

    r1 = reward_step1([c.coarse_mesh for c in candidates], prompt)
    r2 = reward_step2([c.refined_mesh for c in candidates], prompt)
    a1 = normalize_within_group(r1)
    a2 = normalize_within_group(r2)

    loss = clipped_grpo_loss(policy, ref_policy, candidates, a1, step=1)
    loss += clipped_grpo_loss(policy, ref_policy, candidates, a2, step=2)
    update(policy, loss)
```

##### 方法解读

AR3DR1 的问题设定不是用 SDS 优化单个 NeRF/3DGS，而是把文本到 3D 看成自回归序列生成：模型先产生推理文本，再生成 3D token，最后由 3D VQ-VAE 或类似解码器转成网格。这个范式的难点在于，3D 输出的好坏不是单一标量能稳定描述的。一个结果可能文本语义对了但部件比例错了，也可能轮廓合理但多视角纹理不连续，因此直接套用 2D 图像偏好奖励容易把模型推向局部捷径。

GRPO 的优势是避免 value model，直接在同一个 prompt 的候选组内比较奖励。对第 \(k\) 个阶段，候选 \(i\) 的优势可写成：

$$A_i^{(k)} = \frac{R_i^{(k)} - \mu_{\mathcal{G}}^{(k)}}{\sigma_{\mathcal{G}}^{(k)} + \epsilon}$$

其中 \(\mathcal{G}\) 是同一 prompt 下采样出的候选组。这样做能减少不同 prompt 难度差异造成的奖励尺度问题：简单物体和复杂机械结构不会直接用原始分数互相比较，而是在各自候选组内判断哪一个更好。

Hi-GRPO 的关键改动是把一次 3D 生成拆成两个可奖励的阶段。Step 1 关注全局几何，包括类别、主要部件、比例、空间布局和粗 mesh 可解码性；Step 2 在 Step 1 的语义规划基础上生成视觉推理和细化 3D token，关注材质、颜色、纹理、局部细节和跨视角外观一致性。对应的目标可概括为：

$$\mathcal{L}_{\text{Hi-GRPO}} =
\mathcal{L}_{\text{GRPO}}^{(1)}(A^{(1)}, y^{(1)}) +
\mathcal{L}_{\text{GRPO}}^{(2)}(A^{(2)}, y^{(2)})$$

其中 \(y^{(1)}\) 包含语义推理和粗 3D token，\(y^{(2)}\) 包含视觉推理和细化 3D token。每个阶段仍使用 PPO 风格的概率比裁剪与参考策略 KL 约束，防止模型为了追逐奖励而破坏原始生成分布。

奖励设计是这篇工作的核心工程点。Step 1 更依赖几何和语义对齐奖励，例如多视角渲染后由 VLM 判断物体类别、部件数量和空间关系；Step 2 更强调人类偏好、纹理合理性、材质一致性和多视角一致性。直觉上，粗阶段先把“物体是什么、有哪些部件、整体比例如何”定住，细阶段再处理“表面是什么材质、颜色如何连续、局部细节是否符合 prompt”。

与传统 text-to-3D pipeline 相比，AR3DR1 的不同点在于优化对象是生成模型本身，而不是单个场景的参数。DreamFusion 类方法每个 prompt 都要重新优化 3D 表示；AR3DR1 通过 RL 更新自回归策略，使模型在后续 prompt 上直接产生更符合偏好的 3D token。它的代价是 reward 工程更重，并且需要防止奖励模型偏差被策略放大。

#### 🧪 练习题

```yaml
question: "Hi-GRPO 为什么要把文本到 3D 生成拆成粗几何和细纹理两个强化学习阶段？"
options:
  - "因为 3D VQ-VAE 只能一次解码一半 token"
  - "因为全局结构和局部纹理适合由不同奖励重点约束，分阶段能降低单一奖励的冲突"
  - "因为 GRPO 必须训练两个 value model 才能稳定"
  - "因为多视角渲染只能评估纹理，不能评估几何"
answer: 1
explain: "3D 生成同时要求结构正确和外观精细，单一奖励容易互相拉扯；Hi-GRPO 用阶段化 reward ensemble 分别优化全局几何和局部细节。"
```
