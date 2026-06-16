### ADMETlab 3.0 — ADMET预测平台3.0

```yaml
id: admetlab
name: ADMETlab 3.0
full_name: ADMET预测平台3.0 (ADMETlab 3.0)
year: '2025'
org: CUHK-Shenzhen
paper_url: https://admetmesh.scbdd.com/
category: admet
parent: qsar
motivation: 集成平台覆盖数十种终点预测
```

#### 📝 一句话总结

ADMETlab 3.0 将多任务 DMPNN、RDKit 2D 描述符、端点规则、API 和不确定性估计整合为在线 ADMET 评估平台，在早期药物发现中一次性预测理化性质、药物化学、ADME、毒性和毒性团规则。

#### 🎯 核心要点

- **覆盖 119 个特征/端点**：包括 21 个理化性质、20 个药物化学属性、34 个 ADME 端点、36 个毒性端点和 8 类 toxicophore rules
- **数据规模升级**：NAR 论文报告整合超过 400,000 条高质量数据记录，是 ADMETlab 2.0 的约 1.5 倍
- **模型核心 DMPNN-Des**：用 Directed Message Passing Neural Network 学习分子图局部信息，并拼接 RDKit 2D 描述符补充全局理化信息
- **多任务预测体系**：部署 77 个预测模型，其中 59 个分类模型、18 个回归模型；另有可直接计算的规则和描述符
- **训练策略**：训练/验证/测试按 8:1:1 划分，使用 Adam 优化、Bayesian optimization 调参，并重复随机划分训练 5 次后选择最佳模型
- **不确定性估计**：回归模型使用 evidential deep learning，分类模型使用 Monte Carlo dropout，并给出高/低置信度判断
- **工程化 API**：提供 Molecule Wash 和离线批量预测接口，可返回 119 项结果、结构 SVG、taskid 和 CSV
- **来源限制**：任务 URL `admetmesh.scbdd.com` 是 ADMETlab 2.0 域名；当前 ADMETlab 3.0 官方入口为 `https://admetlab3.scbdd.com/`，论文为 Nucleic Acids Research 2024 Web Server 文章 `10.1093/nar/gkae236`

#### 🔬 深入细节

##### 论文与图示来源说明

ADMETlab 3.0 的可访问论文是 Fu 等人在 *Nucleic Acids Research* Web Server issue 发表的 *ADMETlab 3.0: an updated comprehensive online ADMET prediction platform enhanced with broader coverage, improved performance, API functionality and decision support*，DOI 为 `https://doi.org/10.1093/nar/gkae236`。任务 YAML 的 `paper_url` 指向 ADMETlab 2.0 域名，且年份写为 2025；这里保留 YAML 原样，方法解读基于 NAR 2024 论文和当前官方站点 `https://admetlab3.scbdd.com/`。

![ADMETlab 3.0 DMPNN-Des 与端点概览](https://oup.silverchair-cdn.com/oup/backfile/Content_public/Journal/nar/52/W1/10.1093_nar_gkae236/1/m_gkae236fig1.jpeg?Expires=2147483647&Key-Pair-Id=APKAIE5G5CRDK6RD3PGA&Signature=TpWHLdA4mbBuC8d6eJI025c2UxdKuo7bdSWrLuKS20BXCVPPcDu1Hqc01cplV7tTMtkweUnxmH7Q8UU8tBlOy4rxsI1VClkUBeOMs8aY15NbU5hkplsiuvC72kh1GQB9-FA5JlNbCFy974gLWKI0Qvy~ObP~tX3Qf7P2-ZCHTlZT-ubIb1s3RBw7lvpV0UE~480QDgkT38EsZuT0iiVXFT5n0u0JmrSj7U4rKDG54eoe9sNe3w9vekJRVspe1w4-MoWk1nlpnG98coZt0caxA3pmciFSXYaPnUFtOV71gCOJFdcn3teyAjdnMj77wiDgFXqsGSac1WhDKgbujnF1cw__)
*图：ADMETlab 3.0 的 DMPNN-Des 框架和 ADMET profile 覆盖范围。输入分子被转成分子图和分子描述符，DMPNN readout 与 RDKit 2D descriptors 拼接后进入多任务前馈网络。*

##### 算法伪代码

```python
# ADMETlab 3.0 / DMPNN-Des 简化训练与预测流程
for smiles, endpoint_labels in admet_dataset:
    # 1. 分子清洗和标准化
    mol = molecule_wash(
        smiles,
        neutralize_salts=True,
        remove_counterions=True,
        canonicalize_smiles=True,
        normalize_tautomer_and_charge=True,
    )

    # 2. 双表示：分子图 + RDKit 2D 描述符
    graph = mol_to_directed_bond_graph(mol)
    desc = rdkit_2d_descriptors(mol)

    # 3. DMPNN bond-centered message passing
    bond_states = init_bond_features(graph)
    for step in range(T):
        bond_states = directed_message_passing(graph, bond_states)
    graph_readout = aggregate_bond_states_to_molecule(bond_states)

    # 4. DMPNN-Des 融合与多任务预测
    embedding = concat(graph_readout, desc)
    predictions = feed_forward_heads(embedding)  # classification + regression endpoints

    # 5. 多任务损失，缺失标签用 mask 跳过
    loss = 0
    for task in endpoints:
        if endpoint_labels[task] is not None:
            if task.is_classification:
                loss += bce(predictions[task], endpoint_labels[task])
            else:
                loss += mse(predictions[task], endpoint_labels[task])
    optimize(loss)

# API 预测时返回 endpoint value、规则命中、经验判定和 uncertainty/confidence
```

##### 为什么 ADMET 平台仍然是 QSAR 的延伸

ADMETlab 3.0 的目标不是模拟完整人体药代动力学，而是用已知实验数据学习“结构到性质”的映射。这与 QSAR 的基本形式一致：

$$
\hat{y}_k = f_k(\mathrm{molecule})
$$

其中 \(k\) 表示某个端点，例如 Caco-2 permeability、BBB penetration、CYP inhibition、hERG blocker、AMES mutagenicity 或 hepatotoxicity。区别在于，经典 QSAR 常用少量手工描述符和线性回归，ADMETlab 3.0 用大规模端点库、多任务 DMPNN 和规则引擎，把许多 ADMET/QSPR/QSTR 模型封装成一个服务。

##### DMPNN-Des：局部键消息传递加全局描述符

DMPNN 的特点是沿有向键而非原子做消息传递。对有向键 \(u\to v\)，初始化隐藏状态可写为：

$$
h_{uv}^{(0)} = \tau(W_i [x_u, e_{uv}])
$$

第 \(t\) 轮更新时，消息来自进入 \(u\) 的其他键，通常排除反向边 \(v\to u\)，以减少短环中的信息回流：

$$
m_{uv}^{(t+1)}
= \sum_{w\in\mathcal{N}(u)\setminus\{v\}}
h_{wu}^{(t)}
$$

$$
h_{uv}^{(t+1)}
= \tau\left(h_{uv}^{(0)} + W_m m_{uv}^{(t+1)}\right)
$$

最终把 bond states 聚合为分子级 readout：

$$
z_{\mathrm{graph}} = \operatorname{Readout}(\{h_{uv}^{(T)}\})
$$

ADMETlab 3.0 进一步拼接 RDKit 2D descriptors：

$$
z = [z_{\mathrm{graph}}; d_{\mathrm{RDKit}}]
$$

这就是 DMPNN-Des。直觉上，DMPNN 擅长学习局部化学环境和键连接模式，RDKit 描述符则直接提供分子量、拓扑、形状、氢键、极性等全局特征。两者互补，能在很多 ADMET 端点上比单独 DMPNN 或 ADMETlab 2.0 的 MGA 模型更稳。

##### 多任务学习和缺失标签

ADMET 数据天然稀疏：一个分子可能有 hERG 数据，但没有 CYP2D6 抑制数据；另一个分子可能有水溶性数据，但没有肝毒性数据。多任务训练通常用 mask 只对存在标签的端点计算损失：

$$
\mathcal{L}
= \sum_{k=1}^{K} m_k
\left(
\lambda_k^{\mathrm{cls}}\operatorname{BCE}(y_k,\hat{p}_k)
+ \lambda_k^{\mathrm{reg}}\operatorname{MSE}(y_k,\hat{y}_k)
\right)
$$

其中 \(m_k=1\) 表示第 \(k\) 个端点有标签，否则跳过。多任务共享主干的好处是不同 ADMET 端点之间存在结构信息迁移，例如疏水性、极性和芳香性同时影响吸收、分布和毒性。

##### 数据收集与端点覆盖

NAR 论文说明 ADMETlab 3.0 从 ChEMBL、PubChem、OCHEM 和文献中重新收集整理数据，经过去除有机金属、混合物、盐和 counterion，统一为 canonical SMILES。最终用于建模的数据超过 400,000 条，覆盖 77 个 ADMET 相关预测端点。

平台层面报告 119 个特征/端点：21 个理化性质、20 个药物化学属性、34 个 ADME 端点、36 个毒性端点和 8 类 toxicophore rules。它不是每一项都由神经网络预测，其中一部分是 RDKit/Scopy 可直接计算的规则或描述符；真正训练部署的预测模型为 77 个。

##### 训练、调参与评估

每个端点按 8:1:1 划分训练、验证和测试集。训练使用 Adam，超参数通过 Bayesian optimization 搜索。为降低随机划分噪声，每个训练过程重复 5 次，选择表现最好的模型进入在线平台。回归任务报告：

$$
R^2,\quad \mathrm{RMSE}=\sqrt{\frac{1}{N}\sum_i(y_i-\hat{y}_i)^2},\quad
\mathrm{MAE}=\frac{1}{N}\sum_i |y_i-\hat{y}_i|
$$

分类任务报告：

$$
\mathrm{AUC},\quad \mathrm{ACC},\quad \mathrm{MCC}
$$

其中 Matthews correlation coefficient 更适合类别不平衡的毒性/安全性端点：

$$
\mathrm{MCC}
= \frac{TP\cdot TN-FP\cdot FN}
{\sqrt{(TP+FP)(TP+FN)(TN+FP)(TN+FN)}}
$$

论文比较 DMPNN-Des、DMPNN 和 ADMETlab 2.0 的 MGA。总体上，DMPNN/DMPNN-Des 在多数分类和回归端点上超过 MGA；DMPNN-Des 通常略优于纯 DMPNN，但会带来轻微计算开销。

##### 不确定性估计：给预测加上置信度

ADMETlab 3.0 的重要新增功能是不确定性。回归端点使用 evidential deep learning，模型不只输出 \(\hat{y}\)，还输出控制预测分布的参数，用于分解 epistemic uncertainty 和 aleatoric uncertainty。简化地说：

$$
p(y\mid x) = \int p(y\mid \mu,\sigma^2)\,p(\mu,\sigma^2\mid x)\,d\mu d\sigma^2
$$

epistemic uncertainty 反映模型因为训练数据不足而不确定，aleatoric uncertainty 反映端点实验噪声或内在随机性。分类端点使用 Monte Carlo dropout，多次开启 dropout 前向传播得到概率分布：

$$
\hat{p}=\frac{1}{S}\sum_{s=1}^{S}p_s,\qquad
u=\operatorname{Var}(\{p_s\}_{s=1}^{S})
$$

如果不确定性超过基于 Youden index 设定的阈值，API 会把预测标为低置信度。这个机制对虚拟筛选很实用：用户不仅看到“可能有毒/无毒”，还看到模型是否在该化学空间内有把握。

##### API 与工程实现

ADMETlab 3.0 用 Django 构建网站，API 由 Django Ninja 实现，并加入缓存以提高重复查询效率。API 的两个核心功能是 Molecule Wash 和 Off-website Batch Prediction。前者做标准化、片段处理、离子/同位素/立体化学处理，后者支持批量返回 119 项 ADMET 相关结果。

对药物发现流程而言，API 比网页表单更关键：它允许研究者把 ADMET 预测接入生成模型、虚拟筛选、主动学习或 retrosynthesis pipeline。论文表 1 报告 ADMETlab 3.0 在 1000 个分子上的计算时间约 87 秒，明显快于 SwissADME、FAF-Drugs4、pkCSM、vNN-ADMET 等网页工具，同时比 ADMETlab 2.0 只慢很少，考虑到端点数增加，这是工程上可接受的折中。

##### 局限性

ADMETlab 3.0 的输出仍是数据驱动 QSAR 预测。对于训练集中稀缺的新型骨架、反应性分子、金属配合物、强构象依赖端点或复杂体内药代过程，模型可能给出低置信度或错误预测。它适合早期筛选和候选排序，不应替代体外实验、体内 PK/毒理实验和机制验证。

#### 🧪 练习题

```yaml
question: "ADMETlab 3.0 中 DMPNN-Des 相比单独 DMPNN 的主要设计意图是什么？"
options:
  - "只使用文本序列，不再需要分子图"
  - "把 DMPNN 学到的局部分子图表示与 RDKit 2D 全局描述符拼接，提高端点预测稳健性"
  - "把所有 ADMET 端点都改为无监督聚类"
  - "完全取消训练数据，只依赖手写规则"
answer: 1
explain: "DMPNN 捕捉局部键和原子环境，RDKit 2D 描述符补充分子大小、拓扑、极性等全局信息，两者互补形成 DMPNN-Des。"
```
