### DeepDTA — 深度药物-靶点亲和力预测

```yaml
id: deepdta
name: DeepDTA
full_name: 深度药物-靶点亲和力预测 (DeepDTA)
year: '2018'
org: Sabanci University
paper_url: https://academic.oup.com/bioinformatics/article/34/17/i821/5093245
category: screening
parent: —
motivation: 双分支CNN处理SMILES和蛋白序列
```

#### 📝 一句话总结

DeepDTA 提出用两个并行 1D-CNN 分支分别从药物 SMILES 字符串和蛋白质氨基酸序列中学习表示，再回归连续结合亲和力，解决传统 DTA 方法依赖手工相似度、3D 复合物结构或二分类标签的问题。

#### 🎯 核心要点

- **双分支序列 CNN**：药物用 SMILES 字符序列编码，靶点用蛋白质一级序列编码，两个分支结构对称但滤波器长度可不同
- **无需 3D 结构输入**：不需要蛋白-配体复合物结构、分子对接姿态或手工相似度矩阵，直接从 1D 原始序列学习
- **字符级嵌入**：SMILES 字符来自约 200 万 PubChem SMILES 的 64 类符号，蛋白字符来自约 55 万 UniProt 序列的 25 类氨基酸/符号
- **固定长度处理**：Davis 使用 SMILES 85、蛋白 1200 的最大长度；KIBA 使用 SMILES 100、蛋白 1000，超长截断、短序列补零
- **CNN 配置**：每个分支包含 3 个一维卷积层，滤波器数量为 32、64、96，随后做 max pooling
- **融合回归头**：药物表示与蛋白表示拼接后输入 1024、1024、512 个隐藏单元的全连接网络，最后输出亲和力预测值
- **训练目标**：把 DTA 视为连续值回归问题，用 MSE 损失和 Adam 优化器训练
- **评测基准**：在 Davis kinase 数据集和 KIBA kinase inhibitor 数据集上评估，指标包括 Concordance Index 和 MSE
- **历史意义**：成为后续 WideDTA、GraphDTA、Transformer-DTA 等序列/图融合 DTA 模型的重要基线

#### 🔬 深入细节

![DeepDTA 架构图](https://raw.githubusercontent.com/hkmztrk/DeepDTA/master/docs/figures/deepdta.PNG)
*图：DeepDTA 官方代码仓库中的模型图。上分支处理蛋白序列，下分支处理药物 SMILES；两个 CNN 表示拼接后经全连接层输出亲和力。论文正文图见 OUP 页面，若出版社图片受限，可用官方 GitHub 图核对整体结构。*

```python
# DeepDTA 训练流程伪代码
for smiles, protein_seq, y in dataloader:
    # 1. 字符级编码：未知/空白位置补 0，超长截断
    x_d = pad_or_truncate(label_encode_smiles(smiles), max_smi_len)
    x_p = pad_or_truncate(label_encode_protein(protein_seq), max_seq_len)

    # 2. 嵌入成 dense vectors
    e_d = Embedding(num_smiles_tokens=64, dim=128)(x_d)
    e_p = Embedding(num_protein_tokens=25, dim=128)(x_p)

    # 3. 两个 1D-CNN 分支提取局部模式
    h_d = Conv1D(32)(e_d)
    h_d = Conv1D(64)(h_d)
    h_d = Conv1D(96)(h_d)
    z_d = MaxPool1D(h_d)

    h_p = Conv1D(32)(e_p)
    h_p = Conv1D(64)(h_p)
    h_p = Conv1D(96)(h_p)
    z_p = MaxPool1D(h_p)

    # 4. 药物-靶点联合表示与亲和力回归
    z = concat([z_d, z_p])
    z = Dropout(0.1)(ReLU(Dense(1024)(z)))
    z = Dropout(0.1)(ReLU(Dense(1024)(z)))
    z = ReLU(Dense(512)(z))
    y_hat = Dense(1)(z)

    loss = mean((y_hat - y) ** 2)
    Adam(lr=0.001).step(loss)
```

**动机：从“是否相互作用”转向“结合有多强”**

早期 DTI 模型常把药物-靶点关系建成二分类：一对药物和蛋白是否有相互作用。药物发现中的排序与剂量设计更需要连续亲和力，例如 \(K_d\)、\(K_i\)、\(IC_{50}\) 或 KIBA 分数。DeepDTA 明确把任务定义为回归：输入一个药物 \(d\) 和一个靶点 \(t\)，输出 \(\hat{y}=f_\theta(d,t)\)，尽量逼近真实亲和力 \(y\)。

**输入表示：把 SMILES 和蛋白序列都当作可学习的字符序列**

DeepDTA 没有使用 Morgan fingerprint、PubChem similarity、Smith-Waterman similarity 或 3D docking pose，而是先做字符级 label encoding：

$$
x_d = [c_1,c_2,\ldots,c_{L_d}], \quad
x_t = [a_1,a_2,\ldots,a_{L_t}]
$$

其中 \(c_i\) 是 SMILES 字符编号，\(a_i\) 是氨基酸字符编号。随后通过嵌入层映射为 128 维 dense vectors：

$$
E_d \in \mathbb{R}^{L_d \times 128}, \quad
E_t \in \mathbb{R}^{L_t \times 128}
$$

这个设计的直觉是：SMILES 中的局部字符片段可以对应环、支链、原子类型和键模式；蛋白序列中的局部氨基酸片段可以对应 motif 或局部理化环境。CNN 的滑动窗口正好适合捕获这类局部模式。

**双 CNN 分支：局部模式提取与尺度差异**

药物和蛋白虽然都被表示为 1D 序列，但字符表、长度分布和语义完全不同，因此 DeepDTA 分别设置两个 CNN block。每个 block 由三层一维卷积组成，滤波器数从 32 增加到 64、96：

$$
H_d = \mathrm{MaxPool}\left(\mathrm{CNN}_d(E_d)\right), \quad
H_t = \mathrm{MaxPool}\left(\mathrm{CNN}_t(E_t)\right)
$$

论文对滤波器长度做交叉验证：化合物分支候选为 \([4,6,8]\)，蛋白分支候选为 \([4,8,12]\)。这反映了两类序列的局部语义尺度不同：SMILES 短片段往往就能表达化学子结构，而蛋白 motif 通常需要更长窗口。

**融合与回归：先各自抽象，再联合建模**

两个分支的输出被拼接为药物-靶点联合表示：

$$
z_{d,t} = [H_d; H_t]
$$

随后经过三层全连接网络：

$$
\hat{y}_{d,t} = W_o \, \phi_3\left(W_3 \, \phi_2\left(W_2 \, \phi_1(W_1 z_{d,t})\right)\right)
$$

其中前两层隐藏单元数为 1024，第三层为 512，前两层后接 dropout 0.1。训练损失是均方误差：

$$
\mathcal{L}_{\mathrm{MSE}}
= \frac{1}{n}\sum_{i=1}^{n}(\hat{y}_i-y_i)^2
$$

对于 Davis 数据集，论文把 \(K_d\) 从 nM 转为 pKd：

$$
pK_d = -\log_{10}\left(\frac{K_d}{10^9}\right)
$$

例如 \(K_d=10000\) nM 对应 \(pK_d=5\)。这样可以把跨数量级的结合常数压缩到更适合回归的数值范围。

**为什么 CNN 能工作，也为什么它后来被改进**

DeepDTA 的关键贡献不是复杂网络结构，而是证明“只用 SMILES 和蛋白一级序列”也能在 DTA 回归上形成强基线。与 KronRLS、SimBoost 相比，它减少了相似度矩阵和手工网络特征的依赖；与 docking 相比，它不要求蛋白晶体结构。论文报告 combined CNN-CNN 模型在 KIBA 上取得 CI 0.863、MSE 0.194，优于 SimBoost 的 CI 0.836、MSE 0.222；在 Davis 上 MSE 也低于基线。

局限也很清楚：SMILES 是分子图的一种线性化，CNN 不能天然理解同一分子的多种 SMILES 等价表示，也不显式使用键连通图、手性构象和蛋白三维口袋。因此 GraphDTA 后续把药物侧替换为分子图神经网络，DrugCLIP 等方法进一步使用 3D 结构和对比学习。DeepDTA 的价值在于建立了简洁、可复现、端到端的 DTA 表示学习起点。

#### 🧪 练习题

```yaml
question: "DeepDTA 相比使用 PubChem/Smith-Waterman 相似度矩阵的传统 DTA 方法，最核心的变化是什么？"
options:
  - "把连续亲和力回归改成了药物-靶点二分类"
  - "用两个 1D-CNN 分支直接从 SMILES 和蛋白序列学习表示"
  - "必须先通过分子对接得到蛋白-配体复合物结构"
  - "只使用蛋白质序列，不输入药物信息"
answer: 1
explain: "DeepDTA 的核心是端到端学习药物和靶点的 1D 序列表示，并用拼接后的联合表示回归亲和力；它不依赖手工相似度矩阵或 3D 对接姿态。"
```
