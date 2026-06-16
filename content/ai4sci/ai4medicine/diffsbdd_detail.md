### 扩散式结构药物设计 (DiffSBDD)

```yaml
id: diffsbdd
name: DiffSBDD
full_name: 扩散式结构药物设计 (DiffSBDD)
year: '2022'
org: ETH Zurich
paper_url: https://arxiv.org/abs/2210.13695
category: generation
parent: e3_edm
motivation: SE(3)等变扩散支持口袋条件生成
```

#### 📝 一句话总结

DiffSBDD 将 E(3)-EDM 的 3D 等变扩散范式扩展到结构药物设计，把小分子配体生成建模为给定蛋白口袋的 SE(3) 等变条件去噪过程，并进一步用 inpainting 采样把同一个预训练模型用于 scaffold hopping、fragment growing 和性质优化。

#### 🎯 核心要点

- **口袋条件生成**：学习 \(p_\theta(\text{ligand}\mid\text{pocket})\)，在每个反向去噪步骤把固定蛋白口袋原子作为 3D 上下文输入
- **配体坐标与类型联合扩散**：配体原子坐标和原子特征同时加噪、同时去噪，最终生成带结合构象的小分子点云
- **SE(3) 等变 EGNN**：联合处理蛋白与配体节点，配体坐标可更新，蛋白口袋坐标保持固定
- **反射敏感坐标更新**：在 EGNN 坐标更新中加入 cross product 项，避免 O(3) 反射对称性破坏手性相关信息
- **两种条件化路线**：既训练显式 pocket-conditioned DDPM，也训练蛋白-配体联合分布 \(p(\text{pocket},\text{ligand})\) 并通过 inpainting 固定口袋
- **通用 inpainting 采样**：每个去噪步把固定原子替换为其前向加噪版本，可做口袋条件生成、scaffold hopping、scaffold elaboration、fragment growing/merging
- **无需重训的性质优化**：对候选分子做少步 noise/denoise，并结合简单进化搜索优化 QED、SA 或 docking score
- **评估数据集**：使用 CrossDocked 与 Binding MOAD，指标包括 Vina、QED、SA、Lipinski、diversity 和推理时间

#### 🔬 深入细节

![DiffSBDD 口袋条件生成流程](https://ar5iv.labs.arxiv.org/html/2210.13695/assets/x1.png)
*图 1：DiffSBDD 在蛋白口袋条件下对配体原子坐标和特征执行前向扩散与反向去噪；蛋白作为固定 3D 上下文，配体从高斯噪声生成。*

![DiffSBDD inpainting 替换采样](https://ar5iv.labs.arxiv.org/html/2210.13695/assets/x2.png)
*图 2：inpainting 采样在每个反向步骤把固定部分替换为对应时间步的前向加噪版本，从而保证最终样本保留指定片段或口袋。图像来自论文 ar5iv HTML，可访问来源为 `https://ar5iv.labs.arxiv.org/html/2210.13695`。*

```python
# DiffSBDD 条件训练与 inpainting 采样伪代码
def train_conditional_diffsbdd(ligand, pocket):
    x_lig, h_lig = ligand.coords, ligand.atom_features
    x_poc, h_poc = pocket.coords, pocket.atom_or_residue_features

    system_com = center_of_mass(concat(x_lig, x_poc))
    x_lig, x_poc = x_lig - system_com, x_poc - system_com

    t = uniform_integer(1, T)
    eps_x, eps_h = sample_ligand_noise(x_lig, h_lig)
    zt_lig = alpha[t] * concat(x_lig, h_lig) + sigma[t] * concat(eps_x, eps_h)

    # pocket 节点参与消息传递，但坐标不更新
    eps_hat = se3_egnn_noise_predictor(
        ligand_noisy=zt_lig,
        pocket_fixed=(x_poc, h_poc),
        t=t,
        freeze_pocket_coords=True,
    )
    loss = mse(eps_hat, concat(eps_x, eps_h))
    optimizer.step(loss)


def inpaint_sample(fixed_atoms, mask_generate):
    z = sample_standard_normal_like(full_system_template)
    for t in reversed(range(1, T + 1)):
        z_generated = reverse_denoise_step(z, t)

        # 对固定原子从真实结构执行同一时间步的前向加噪
        z_fixed_t = forward_noise(fixed_atoms, t - 1)
        z_fixed_t = align_center_of_mass(z_fixed_t, z_generated, mask=~mask_generate)

        # 替换固定部分，生成部分保留模型预测
        z = where(mask_generate, z_generated, z_fixed_t)

        # 可选：在同一 t 附近来回重采样，让边界更一致
        z = resample_back_and_forth(z, t)
    return decode_ligand(z)
```

**动机与背景：从无条件 3D 分子生成到蛋白口袋条件生成。**

E(3)-EDM 证明了扩散模型可以直接生成 3D 分子，但药物设计真正关心的是“给定靶点口袋，生成能放进并结合该口袋的小分子”。DiffSBDD 把这个任务定义为 3D 条件生成：输入蛋白结合口袋的原子或残基表示，输出配体的原子类型、三维坐标和结合构象。相比早期 voxel VAE，点云模型不需要把空间离散成体素，也避免了体素分辨率和计算量之间的矛盾；相比逐原子自回归 SBDD，扩散模型每一步都对完整配体点云去噪，能利用全局几何上下文，不依赖人为原子顺序。

**条件扩散机制：口袋固定，配体去噪。**

DiffSBDD 的条件模型把配体节点 \(\mathbf{z}^{L}=[\mathbf{x}^{L},\mathbf{h}^{L}]\) 作为扩散变量，把蛋白口袋 \(\mathbf{z}^{P}=[\mathbf{x}^{P},\mathbf{h}^{P}]\) 作为固定上下文。前向过程只对配体加噪：

$$
q(\mathbf{z}^{L}_t\mid \mathbf{z}^{L}_0)=\mathcal{N}(\mathbf{z}^{L}_t;\alpha_t\mathbf{z}^{L}_0,\sigma_t^2\mathbf{I})
$$

反向过程由条件 EGNN 参数化：

$$
p_\theta(\mathbf{z}^{L}_{t-1}\mid \mathbf{z}^{L}_t,\mathbf{z}^{P})
=\mathcal{N}\left(\mathbf{z}^{L}_{t-1};\boldsymbol{\mu}_\theta(\mathbf{z}^{L}_t,\mathbf{z}^{P},t),\tilde{\sigma}_t^2\mathbf{I}\right)
$$

网络预测噪声 \(\hat{\boldsymbol{\epsilon}}_\theta(\mathbf{z}^{L}_t,\mathbf{z}^{P},t)\)，再还原 \(\hat{\mathbf{z}}^{L}_0\)。蛋白和配体节点共同进入消息传递，因此配体原子能看到口袋几何、元素类型和残基信息；但蛋白节点坐标不更新，避免模型在去噪过程中“移动靶点”。

**SE(3) 等变与手性：为什么不能简单保持反射等变。**

普通 EGNN 往往对 O(3) 等变，即旋转、平移和反射都一致。但药物分子和蛋白结构存在手性，镜像结构可能具有完全不同的生物活性。DiffSBDD 因此把目标设为 SE(3) 等变，只要求对旋转和平移一致，不强制对反射一致。论文在坐标更新中加入基于 cross product 的项：

$$
\Delta \mathbf{x}_i
=\sum_j(\mathbf{x}_i-\mathbf{x}_j)\phi_x(\mathbf{m}_{ij})
+\sum_{j,k} \left((\mathbf{x}_i-\mathbf{x}_j)\times(\mathbf{x}_i-\mathbf{x}_k)\right)\phi_\chi(\mathbf{m}_{ij},\mathbf{m}_{ik})
$$

cross product 在反射下会变号，因此能让模型区分互为镜像的局部几何。另一方面，平移仍通过 zero-CoM 处理：在 likelihood 和 denoising 前把系统质心移到零附近，反向采样时也防止整体漂移。

> 💡 关键：DiffSBDD 的口袋条件不是一个全局向量标签，而是完整 3D 几何上下文；蛋白-配体、配体-配体、蛋白-蛋白消息共同决定每一步去噪方向。

**联合分布与 inpainting：把条件化放进采样算法。**

除了显式条件模型，DiffSBDD 还训练蛋白-配体联合分布 \(p_\theta(\mathbf{z}^{P},\mathbf{z}^{L})\)。推理时，如果想固定口袋或固定某个配体片段，就不需要重新训练模型，而是在每个反向步骤做替换：

$$
\mathbf{z}_{t-1}
=\mathbf{m}\odot \mathbf{z}^{\text{gen}}_{t-1}
+(1-\mathbf{m})\odot \tilde{\mathbf{z}}^{\text{fixed}}_{t-1}
$$

其中 \(\mathbf{m}\) 是生成区域 mask，\(\tilde{\mathbf{z}}^{\text{fixed}}_{t-1}\sim q(\mathbf{z}_{t-1}\mid\mathbf{z}^{\text{fixed}}_0)\) 是固定部分在该时间步的前向加噪样本。因为 \(t\rightarrow0\) 时噪声方差趋近于零，最终样本会精确保留固定原子。这个设计让同一模型可以完成多种药物化学任务：保留核心药效团并换 scaffold、在已有 fragment 上外延、把两个 fragment 连接起来，或固定蛋白口袋生成新配体。

**性质优化：把扩散链当作局部化学空间扰动器。**

DiffSBDD 不直接在训练目标中优化 QED、SA 或 Vina，而是利用扩散模型的局部重构能力做后验探索。给定一个候选分子，先只加少量噪声到中间时间步 \(t'\)，再从 \(t'\) 去噪回 \(0\)，得到与原分子形状和口袋互补性相近的新候选。结合简单进化算法，就可以反复选择更高 QED、更好 SA 或更低 docking score 的样本。这个过程的优点是无需为每个性质重新构造数据集或训练专门模型；缺点是性质提升依赖采样策略和外部评价函数，而不是由模型 likelihood 直接保证。

**与前代 SBDD 方法的区别。**

3D-SBDD、Pocket2Mol、GraphBP 等方法大多逐原子放置新节点，前几步上下文很少，后续误差容易累积，且训练时看到的是真实前缀、采样时看到的是自生成前缀。DiffSBDD 用非自回归去噪链缓解这种训练-采样错配，每个步骤都在完整点云上调整所有待生成原子。与 TargetDiff 相比，DiffSBDD 的一个显著特色是强调“一个预训练扩散模型 + 采样时约束”的灵活性，尤其是 inpainting 和 noise/denoise 优化，使其不只用于 de novo ligand generation，也能覆盖实际药物发现中常见的局部改造任务。

#### 🧪 练习题

```yaml
question: "DiffSBDD 的 inpainting 采样为什么能保留指定 scaffold 或蛋白口袋？"
options:
  - "因为训练时为每一种 scaffold 单独训练了一个条件模型"
  - "因为每个反向去噪步骤都会把固定区域替换为该区域的前向加噪版本，且最终噪声趋近于零"
  - "因为模型只生成 SMILES，不生成三维坐标"
  - "因为 docking score 被直接写入训练损失"
answer: 1
explain: "inpainting 使用 mask 区分固定区域和生成区域。固定区域在每个时间步由真实结构前向加噪得到并替换回采样链，因此到 t=0 时会恢复为未扰动的指定结构。"
```
