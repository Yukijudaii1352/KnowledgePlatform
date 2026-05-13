### DrugCLIP: Contrastive Protein-Molecule Representation Learning for Virtual Screening

```yaml
paper_id: "2310.06367"
title: "DrugCLIP: Contrastive Protein-Molecule Representation Learning for Virtual Screening"
authors: "Bowen Gao, Bo Qiang, Haichuan Tan, Yinjun Jia, Minsi Ren, Minsi Lu, Jingjing Liu, Wei-Ying Ma, Yanyan Lan"
year: 2023
venue: "NeurIPS 2023"
tldr: "将虚拟筛选重新定义为蛋白质-分子的稠密检索问题，借鉴CLIP对比学习框架，通过双塔3D编码器学习蛋白质口袋与分子的联合表示，实现零样本超快速大规模虚拟筛选"
tags: ["virtual_screening", "contrastive_learning", "drug_discovery", "protein-ligand_interaction", "representation_learning"]
```

---

## 📝 一句话总结

DrugCLIP 借鉴 CLIP 的对比学习范式，用双塔 3D Transformer 分别编码蛋白质口袋和分子，通过预计算分子嵌入向量实现十亿级化合物库的超快速虚拟筛选，零样本即超越传统对接方法和监督学习基线。

---

## 🎯 核心要点

- **范式转换**：首次将大规模虚拟筛选建模为**稠密检索问题**（类似 CLIP 的图文匹配），而非传统的对接打分或回归预测，从根本上解决了效率瓶颈——分子嵌入可离线预计算，在线筛选仅需高速点积运算
- **双塔 3D 编码器**：蛋白质口袋和分子各用独立的 UniMol 3D Transformer 编码，通过 SE(3)-不变的原子对距离表示捕获 3D 结构信息，[CLS] token 输出全局表示用于对比学习
- **HomoAug 数据增强**：利用 AlphaFold 蛋白质结构数据库中的同源蛋白替换原始口袋，生成生物学上合理的增强训练对，解决蛋白质-配体对数据稀缺问题
- **训练-测试一致性**：用 RDKit 生成的噪声分子构象替代精确结合态构象进行训练，理论证明双塔架构对坐标噪声具有鲁棒性（Proposition 1），弥合训练时 holo 结构与测试时 apo 结构的差距
- **卓越性能**：在 DUD-E 零样本设置下 EF@0.5% 达 38.07（Glide-SP 仅 19.39），在更具挑战性的 LIT-PCBA 上 BEDROC 和 EF 均为最优；筛选 60 亿分子仅需约 30 小时

---

## 🔬 深入细节

### 整体架构示意图

![DrugCLIP Training Pipeline](https://arxiv.org/html/2310.06367v1/x1.png)

*图1：DrugCLIP 训练流程。分子构象由 RDKit 化学模拟生成，口袋数据通过 HomoAug 增强。每个训练迭代中，采样的 3D 分子和 3D 口袋表示通过对比目标进行学习。*

![HomoAug Pipeline](https://arxiv.org/html/2310.06367v1/x2.png)

*图2：HomoAug 数据增强流程。从 PDBBind 中的口袋蛋白出发，在 AlphaFold DB 中搜索同源蛋白，经 TM-align 结构对齐和相似度过滤后，将同源蛋白与原始配体组合为增强的口袋-配体对。*

### 核心算法伪代码

```
# ============ DrugCLIP 训练伪代码 ============

# 输入: 蛋白质口袋-分子配对数据集 D = {(pocket_k, mol_k)}
# 编码器: g_phi (口袋编码器), f_theta (分子编码器), 均为 UniMol 3D Transformer
# 温度参数: tau

for each mini-batch {(pocket_k, mol_k)}_{k=1}^{N} from D:
    
    # === 数据增强 ===
    # 1. HomoAug: 随机替换部分口袋为同源蛋白口袋
    for each pocket_k:
        if random() < p_aug and has_homolog(pocket_k):
            pocket_k = sample_homologous_pocket(pocket_k)  # 从AlphaFold DB采样
    
    # 2. RDKit构象: 用RDKit生成分子3D构象（非结合态）
    for each mol_k:
        mol_k.coords = rdkit_conformation(mol_k)  # 替代精确结合态坐标
    
    # === 编码 ===
    # 3D Transformer with SE(3)-invariant pair representation
    # 输入: 原子坐标 c + 原子类型 h, 添加[CLS]在质心
    p_emb = [g_phi(pocket_k) for k in 1..N]   # (N, d) 口袋嵌入
    m_emb = [f_theta(mol_k) for k in 1..N]     # (N, d) 分子嵌入
    
    # === 对比学习损失 ===
    # 计算 N×N 相似度矩阵
    S[i,j] = dot(p_emb[i], m_emb[j])  # 或 cosine similarity
    
    # Pocket-to-Mol loss: 每个口袋找到其正确分子
    L_p = -1/N * sum_k log( exp(S[k,k]/tau) / sum_i exp(S[k,i]/tau) )
    
    # Mol-to-Pocket loss: 每个分子找到其正确口袋
    L_m = -1/N * sum_k log( exp(S[k,k]/tau) / sum_i exp(S[i,k]/tau) )
    
    # 总损失
    L = 0.5 * (L_p + L_m)
    
    # 反向传播更新 g_phi, f_theta
    backward(L)

# ============ 推理（虚拟筛选）============
# 离线阶段: 预计算所有候选分子嵌入并缓存
mol_db = {f_theta(mol_i) for mol_i in candidate_library}  # 可达数十亿

# 在线阶段: 给定查询口袋，快速检索
query_emb = g_phi(query_pocket)
scores = [dot(query_emb, m) for m in mol_db]  # 仅需点积运算
top_k_molecules = argsort(scores, descending=True)[:k]
```

### 方法解读

#### 1. 从对接到检索：虚拟筛选的范式革新

传统虚拟筛选方法面临两大根本性挑战：**效率**和**泛化性**。分子对接方法（如 Glide、AutoDock Vina）需要对每个蛋白质-分子对进行迭代采样和打分，计算复杂度随候选分子数线性增长——筛选百万级化合物库需要数天，面对 Enamine REAL（60 亿分子）等超大库更是不可行。监督学习方法（如 OnionNet、DeepDTA）虽然加速了打分过程，但仍需对每对蛋白质-分子执行神经网络前向传播，且严重依赖标注数据，泛化到未见蛋白质时性能急剧下降。

DrugCLIP 的核心洞察是：**虚拟筛选本质上是一个检索问题**——给定一个蛋白质口袋作为"查询"，从化合物库中检索最可能结合的分子。这与 CLIP 将图文匹配建模为跨模态检索完全类比。采用双塔架构后，分子嵌入可以**一次计算、永久缓存**，在线筛选时仅需计算口袋嵌入与所有缓存向量的点积，复杂度从 O(N·T_forward) 降至 O(N·d)，其中 d 是嵌入维度（远小于神经网络前向传播时间）。实验表明，对 60 亿分子的 Enamine 库，DrugCLIP 仅需约 30 小时完成筛选，而传统方法需要数年。

#### 2. 3D 结构感知的对比学习框架

DrugCLIP 的编码器基于 UniMol 的 3D Transformer 架构，其核心创新在于**SE(3)-不变的原子对表示**。给定原子坐标 $c$ 和原子类型 $h$，编码器首先计算所有原子对的欧氏距离，通过高斯核将距离映射为初始偏置 $q_{ij}^0$。在每一层 Transformer 中，注意力计算不仅依赖标准的 Query-Key 点积，还叠加了这个距离偏置项：

$$\text{Attention}(Q_i^l, K_j^l, V_j^l) = \text{softmax}\left(\frac{Q_i^l (K_j^l)^T}{\sqrt{d}} + q_{ij}^l\right) V_j^l$$

其中偏置项 $q_{ij}^l$ 在层间递归更新：$q_{ij}^{l+1} = q_{ij}^l + \frac{Q_i^l (K_j^l)^T}{\sqrt{d}}$。这种设计使模型能够同时捕获原子的化学性质（通过 token 嵌入）和空间几何关系（通过距离偏置），且由于距离是 SE(3)-不变量，整个表示对旋转和平移具有天然不变性。每个输入序列添加一个位于所有原子质心的 [CLS] token，其最终隐藏状态作为整个口袋/分子的全局表示。

对比学习采用 CLIP 风格的双向 InfoNCE 损失：Pocket-to-Mol 损失确保每个口袋能从批内所有分子中识别出其真正的配体，Mol-to-Pocket 损失则确保每个分子能识别其靶标口袋。批内负样本构建基于一个合理的统计假设：已知结合对中的蛋白质与其他分子大概率不结合（真实阳性比例远低于 0.1%）。

#### 3. HomoAug 与训练-测试一致性：生物学驱动的工程创新

DrugCLIP 的两大训练技巧体现了对生物学领域知识的深刻理解：

**HomoAug（同源蛋白增强）**：直接对蛋白质结构添加随机噪声会破坏其化学合理性，因此作者提出利用**同源蛋白**进行数据增强。具体流程为：(1) 对 PDBBind 中的每个口袋蛋白，在 AlphaFold 蛋白质结构数据库中搜索序列同源蛋白；(2) 使用 TM-align 进行结构对齐，过滤全局和局部相似度不达标的候选；(3) 将通过过滤的同源蛋白口袋与原始配体配对，生成新的训练样本。这种增强在生物学上是合理的——同源蛋白的结合口袋通常保守，能结合相似的配体。消融实验显示 HomoAug 将 DUD-E 上的 BEDROC 从 45.81% 提升至 50.52%。

**RDKit 构象与鲁棒性**：训练数据中的分子坐标来自结合态（holo）晶体结构，但实际筛选时分子处于自由态（apo），存在构象差异。DrugCLIP 用 RDKit 生成的随机构象替代精确结合态坐标作为训练输入。论文通过 Proposition 1 理论证明：双塔架构的打分函数 $s(\tilde{x}^m, x^p) = g_\phi(x^p)^T \cdot f_\theta(\tilde{x}^m)$ 在坐标扰动 $\delta \to 0$ 时误差趋于零，而单塔监督方法的打分函数 $k_\gamma(h^p, h^m, c^p, \tilde{c}^m)$ 由于直接依赖蛋白质-分子间的相对距离，即使微小扰动也会产生非零误差。这一理论保证使 DrugCLIP 天然适配真实筛选场景。

#### 4. 实验验证与实际影响

DrugCLIP 在两个主流基准上进行了全面评估。在 **DUD-E**（102 个蛋白质，22,886 个活性分子）零样本设置下，DrugCLIP 的 EF@0.5% 达到 38.07，是商业对接软件 Glide-SP（19.39）的近 2 倍，BEDROC 达 50.52%（Glide-SP 为 40.70%）。在更具挑战性的 **LIT-PCBA** 基准上（使用 PubChem 生物测定数据构建，更接近真实筛选场景），DrugCLIP 的 BEDROC（6.23%）和 EF@1%（5.51）均超越所有基线，包括需要标注数据微调的 Gnina 和 BigBind。

消融实验进一步验证了各组件的贡献：将对比学习替换为回归目标（DrugBA）导致性能大幅下降（DUD-E BEDROC 从 50.52% 降至 11.16%），甚至不如传统对接方法，证明对比学习范式本身是成功的关键。人工评估中，药物设计专家在 5 个靶标中的 4 个上更倾向于选择 DrugCLIP 推荐的分子而非 Glide 的结果，展示了该方法的实际应用潜力。

---

## 🧪 练习题

**Q1（概念理解）**：DrugCLIP 为什么采用双塔架构而非单塔架构？请从效率和鲁棒性两个角度分析。

<details><summary>参考答案</summary>

**效率角度**：双塔架构允许蛋白质和分子独立编码，分子嵌入可以离线预计算并缓存。在线筛选时只需计算查询口袋的嵌入，然后与所有缓存的分子嵌入做点积，复杂度为 O(N·d)。而单塔架构需要将每个蛋白质-分子对拼接后送入网络，每次查询都需要 N 次完整前向传播，复杂度为 O(N·T_forward)。

**鲁棒性角度**：论文 Proposition 1 证明，双塔架构的打分函数 s(x̃ᵐ, xᵖ) = gϕ(xᵖ)ᵀ·fθ(x̃ᵐ) 中，蛋白质和分子的编码是独立的，分子坐标的微小扰动 δ 只影响分子侧的编码，当 δ→0 时误差趋于零。而单塔架构的打分函数直接依赖蛋白质-分子间的相对距离，坐标扰动会改变所有跨模态的距离特征，即使 δ→0 误差也不为零。这使双塔架构天然适配训练（holo 结构）与测试（apo 结构）之间的构象差异。

</details>

**Q2（方法设计）**：为什么 DrugCLIP 不直接对蛋白质口袋添加高斯噪声进行数据增强，而要设计 HomoAug？

<details><summary>参考答案</summary>

蛋白质口袋的 3D 结构具有严格的物理化学约束——原子间的键长、键角、二面角以及非共价相互作用都必须满足特定范围。直接添加随机噪声会破坏这些约束，产生化学上不合理甚至物理上不可能的结构，导致模型学到错误的结构-功能映射。

HomoAug 利用了进化生物学的核心原理：同源蛋白（序列相似的蛋白质）通常具有保守的结构和功能，特别是结合口袋区域。因此，用 AlphaFold 预测的同源蛋白口袋替换原始口袋，既引入了结构多样性（不同的骨架构象、侧链取向），又保证了生物学合理性（口袋仍然能结合相似的配体）。这种"生物学感知"的增强策略比盲目添加噪声更有效，消融实验也证实了这一点（BEDROC 从 45.81% 提升至 50.52%）。

</details>

**Q3（批判性思考）**：DrugCLIP 使用批内负样本（in-batch negatives）进行对比学习，这种策略可能存在什么问题？在什么情况下会失效？

<details><summary>参考答案</summary>

批内负样本策略假设"如果蛋白质 A 与分子 X 结合，那么蛋白质 A 与批内其他分子 Y 大概率不结合"。这一假设在大多数情况下成立（真实阳性比例 <0.1%），但存在以下风险：

1. **假阴性问题**：同一批次中可能存在多个能与同一蛋白质结合的分子（特别是当训练数据中包含同一靶标的多个配体时），这些本应是正样本的对被错误地当作负样本，会产生梯度冲突，降低学习效率。

2. **同源蛋白干扰**：如果批内包含结构相似的蛋白质口袋（如同一蛋白家族的不同成员），它们可能结合相似的分子，导致大量假阴性。HomoAug 增强后这个问题可能更严重。

3. **批大小依赖**：对比学习的效果高度依赖批大小——批越大，负样本越多样，表示质量越好。但 3D 结构编码的显存开销大，限制了批大小的上限。

可能的改进方向包括：使用硬负样本挖掘、维护负样本队列（如 MoCo）、或引入已知的阴性结合数据作为显式负样本。

</details>