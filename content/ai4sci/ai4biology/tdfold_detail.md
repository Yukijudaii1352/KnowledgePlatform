### TDFold — 二维几何模板扩散的单序列蛋白质结构预测

```yaml
id: tdfold
name: TDFold
full_name: TDFold (TDFold)
year: '2026.01'
org: Wang et al.
paper_url: https://www.nature.com/articles/s42256-026-00001-x
category: protein_structure
parent: —
motivation: 二维几何模板扩散加速单序列预测
```

#### 📝 一句话总结

TDFold 提出用视觉扩散模型生成蛋白质残基对二维几何模板，再由序列-几何协同学习模块恢复三维结构，解决单序列预测中缺少 MSA/同源模板导致的几何约束不足问题。

#### 🎯 核心要点

- **两阶段结构预测**：先用 2D geometric template diffusion 生成残基对距离与取向矩阵，再用 SCL 模块融合序列、二维几何和原子特征预测三维结构
- **视觉扩散迁移到蛋白几何**：以 Stable Diffusion 风格的 text encoder + UNet 为骨干，用 LoRA 将序列提示映射到蛋白的二维几何图像空间
- **四类残基对几何模板**：生成 \(d_{C_\beta}\)、\(\omega\)、\(\theta\)、\(\phi\) 等距离/取向矩阵，作为近似三维折叠的全局约束
- **SCL 协同学习模块**：由 residue-level Transformer/CNN/graph Transformer、atom-level GNN、residue-atom fusion 和 SE(3)-EGNN 坐标头组成
- **低资源单序列场景**：目标是减少对 MSA 和同源模板搜索的依赖，在 Orphan、Orphan25、CASP14/15/16 等同源信息不足数据集上提升预测效率
- **轻量参数规模**：补充材料报告 TDFold 约 8M 可训练参数，显著小于 AlphaFold2、AlphaFold3、RoseTTAFold 和 ESMFold
- **来源校正**：任务给定 Nature URL 编号不可访问；可访问正式论文为 `https://www.nature.com/articles/s42256-026-01210-2`，题名和元信息与 TDFold 一致

#### 🔬 深入细节

##### 模型架构总览

![TDFold 架构与二维几何模板扩散流程](https://media.springernature.com/full/springer-static/image/art%3A10.1038%2Fs42256-026-01210-2/MediaObjects/42256_2026_1210_Fig2_HTML.png)
*图：TDFold 的两阶段流程。序列首先驱动二维几何模板扩散模块生成残基对几何图，再由序列-几何协同学习模块预测蛋白三维结构。*

正式论文页面显示 TDFold 发表在 Nature Machine Intelligence，2026 年 4 月 1 日在线，DOI 为 `10.1038/s42256-026-01210-2`。Nature 预览页可访问 Abstract、图 1-5、数据/代码可用性说明；完整方法细节可通过同页补充材料和 bioRxiv 预印本交叉确认。

##### 算法伪代码

```python
# TDFold 单序列结构预测伪代码
def tdfold_predict(sequence):
    # 1. 将氨基酸序列作为条件提示，送入扩散模块的 text encoder
    seq_tokens = tokenize_amino_acids(sequence)
    cond = text_encoder_with_lora(seq_tokens)

    # 2. 在二维几何图像空间中反向扩散
    x_t = gaussian_noise(shape=(4, L, L))  # dCb, omega, theta, phi
    for t in diffusion_schedule(reverse=True):
        eps_hat = unet_with_lora(x_t, t, cond)
        x_t = ode_or_ddim_step(x_t, eps_hat, t)
    geometry_2d = decode_geometry(x_t)

    # 3. 序列-几何协同学习
    residue_feat = residue_branch(sequence, geometry_2d)  # Transformer + CNN + graph Transformer
    atom_feat = atom_branch(sequence, geometry_2d)         # atom-level GNN
    fused = residue_atom_fusion(residue_feat, atom_feat)

    # 4. SE(3)-等变图网络输出三维坐标，并做全原子精修
    coords = se3_egnn_coordinate_head(fused)
    coords = langevin_refinement(coords, sequence)
    return coords
```

##### 动机与背景

单序列蛋白结构预测的困难在于：输入只有一条氨基酸序列，缺少 AlphaFold2/RoseTTAFold 依赖的 MSA 共进化信号，也缺少可直接借用的同源模板。ESMFold、OmegaFold 等蛋白语言模型能够绕开 MSA，但语言模型嵌入并不显式提供完整残基对几何约束，尤其在 orphan proteins 或低同源目标上容易缺少全局折叠线索。

TDFold 的关键判断是：蛋白折叠可以先转化成“生成一组二维几何图”的问题。距离矩阵和取向矩阵与图像一样是规则二维张量，视觉扩散模型擅长从噪声中生成具备全局一致性的二维模式，因此可以把 Stable Diffusion 风格的先验迁移到残基对几何生成。与直接预测坐标相比，先生成 \(L \times L\) 几何模板能把长程相互作用显式暴露给后续结构模块。

##### 二维几何模板扩散

扩散模块生成的目标可写为：

$$
G = \{D_{C_\beta}, \Omega, \Theta, \Phi\} \in \mathbb{R}^{4 \times L \times L}
$$

其中 \(D_{C_\beta}\) 表示残基间距离，\(\Omega\)、\(\Theta\)、\(\Phi\) 表示主链相关的二面角/取向信息。训练时对真实几何图加噪：

$$
q(x_t \mid x_0)=\mathcal{N}(\sqrt{\bar{\alpha}_t}x_0,\,(1-\bar{\alpha}_t)I)
$$

UNet 学习在序列条件 \(c\) 下预测噪声：

$$
\mathcal{L}_{\text{diff}}=\mathbb{E}_{x_0,t,\epsilon}\left[\left\|\epsilon-\epsilon_\theta(x_t,t,c)\right\|_2^2\right]
$$

TDFold 没有从头训练大规模图像扩散模型，而是在 text encoder 和 UNet attention 层中引入 LoRA 适配器。补充材料说明 text encoder 有 12 个 Transformer blocks，UNet 采用 4 个 downsampling blocks、1 个 bottleneck 和 4 个 upsampling blocks；LoRA rank 为 8，并用四个 UNet LoRA adapter 分别处理 \(d_{C_\beta}\)、\(\omega\)、\(\theta\)、\(\phi\)。

> 💡 关键：这里的“模板”不是传统意义上的同源结构模板，而是扩散模型生成的二维几何先验。它把单序列输入转换为可供结构网络消费的全局残基对约束。

##### 序列-几何协同学习

第二阶段 SCL 模块把生成的几何图与序列共同编码。补充材料把 SCL 拆成四部分：

- residue-level learning：6 层 Transformer、3 个 CNN blocks 和 3 层 graph Transformer，捕获序列上下文与残基图关系
- atom-level learning：3 层 GNN，建模细粒度原子相互作用
- residue-atom fusion：关系矩阵计算、Bernoulli mask 与 2 层 MLP 融合残基/原子特征
- coordinate prediction：2 层 SE(3)-EGNN 输出骨架坐标，再用 Langevin dynamics 做全原子结构精修

可以把最终坐标头理解为在几何模板引导下求解三维嵌入：

$$
\hat{X}=\arg\min_X \sum_{i,j}\rho\left(\lVert X_i-X_j\rVert_2-\hat{D}_{ij}\right)+\lambda\,\mathcal{L}_{\text{local}}(X, S)
$$

这里 \(\hat{D}_{ij}\) 来自扩散生成的残基对距离，\(\mathcal{L}_{\text{local}}\) 约束局部键长、角度和原子级一致性。真实实现不是显式能量最小化，而是用图网络隐式学习这个映射。

##### 推理效率与传统方法区别

TDFold 与 AlphaFold2/3 的核心区别是输入信号来源。AlphaFold 系列通过 MSA、模板和大规模 pair representation 从数据中抽取共进化关系；TDFold 则把序列作为条件，直接生成残基对几何模板，从而减少外部检索成本。补充材料中 TDFold 无 MSA 推理在多个基准上约 10-12 秒，而带 MSA 约 101-336 秒，说明主要加速来自绕开昂贵的序列检索。

与 ESMFold/OmegaFold 相比，TDFold 不只依赖蛋白语言模型隐表示，而是显式生成距离与取向矩阵。论文报告在 Orphan、Orphan25、CASP14/15/16 等数据集上相对 ESMFold/OmegaFold 有提升，但 CASP14 中 OmegaFold 与 TDFold 的差距并不稳定；因此更准确的解读是：TDFold 的优势主要集中在同源信息不足且需要快速预测的单序列场景，而不是全面替代所有 MSA 或大模型方法。

#### 🧪 练习题

```yaml
question: "TDFold 中二维几何模板扩散模块的主要作用是什么？"
options:
  - "直接从序列输出最终全原子坐标，跳过三维结构网络"
  - "从噪声中生成残基对距离和取向矩阵，为后续结构预测提供全局几何约束"
  - "搜索 PDB 中最相似的同源模板并复制其坐标"
  - "用 MSA 计算共进化矩阵并替换蛋白语言模型"
answer: 1
explain: "TDFold 的扩散模块生成 \(d_{Cβ}, \\omega, \\theta, \\phi\) 等二维残基对几何模板；最终三维坐标由后续 SCL 与 SE(3)-EGNN 模块预测。"
```
