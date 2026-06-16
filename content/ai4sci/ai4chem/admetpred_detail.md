### ADMETPred

```yaml
id: admetpred
name: ADMETPred
full_name: 高通量ADMET预测平台 (ADMETPred)
year: '2026.03'
org: 中国科学院
paper_url: https://link.springer.com/article/10.1007/s11427-025-3166-8
category: property
parent: attentivefp
motivation: 集成多模型与可解释子结构识别
```

#### 📝 一句话总结

ADMETPred 提出了一个面向早期药物发现的高通量 ADMET 预测平台，把 LightGBM、XGBoost、Random Forest 与 GAT 组成多模型池，并用注意力驱动的子结构高亮把“预测结果”连接到“结构优化线索”。

#### 🎯 核心要点

- **189 个预测模型覆盖 27 个 ADMET 终点**：基于 120,616 个严格整理的小分子数据，覆盖吸收、分布、代谢、排泄与毒性相关任务
- **四类模型协同**：树模型负责处理 RDKit 描述符、指纹和表格化特征，GAT 直接在分子图上学习原子和键的局部拓扑贡献
- **高通量平台化流程**：支持批量 SMILES 输入、并行推理、端点选择、算法选择和结果表格输出，降低大规模虚拟筛选中的 ADMET 评估成本
- **注意力解释模块**：利用 GAT 的原子邻域注意力权重定位与预测端点强相关的子结构，为毒性规避或 ADME 性质优化提供可视化线索
- **补充材料报告 PCA 消融**：不使用 PCA 的模型平均表现优于 PCA 降维版本，分类任务 AUC 从 0.694 提升到 0.728，回归任务 \(R^2\) 从 0.440 提升到 0.566
- **应用案例面向真实决策**：论文摘要报告了上市后药物安全监测、天然产物毒性筛选和先导化合物临床前安全评估案例，并与实验或临床证据保持一致

#### 🔬 深入细节

##### 来源与图示

![ADMETPred 平台框架](https://media.springernature.com/lw685/springer-static/image/art%3A10.1007%2Fs11427-025-3166-8/MediaObjects/11427_2025_3166_Fig1_HTML.jpg)
*图：Springer 页面公开的 ADMETPred Figure 1。左侧是 GAT、Random Forest、LightGBM、XGBoost 多模型集成，中间是可解释子结构高亮，右侧是 27 个 ADMET 端点和 189 个预测模型的输出概览。*

> ⚠️ 来源限制：Springer 正文当前只开放摘要、Figure 1、数据可用性和补充材料入口；方法级细节主要来自公开摘要、平台首页和可访问补充材料。补充材料给出了 RF、LightGBM、XGBoost、GAT 的实现说明、GAT 关键公式、PCA 消融表和 RDKit 描述符列表。

##### 算法伪代码

```python
# ADMETPred 的端到端预测流程伪代码
def admetpred(smiles_batch, selected_endpoints, selected_models=None):
    molecules = [standardize_and_validate(s) for s in smiles_batch]

    # 1. 生成两类输入表示
    descriptor_x = rdkit_descriptors_and_fingerprints(molecules)
    graph_x = molecular_graphs(molecules)  # atoms, bonds, atom features, edge features

    results = {}
    explanations = {}
    for endpoint in selected_endpoints:
        model_pool = load_models(endpoint)  # LightGBM, XGBoost, RF, GAT variants
        if selected_models is not None:
            model_pool = filter_models(model_pool, selected_models)

        endpoint_preds = []
        endpoint_scores = []
        for model in model_pool:
            if model.family in {"LightGBM", "XGBoost", "RandomForest"}:
                pred = model.predict(descriptor_x)
            else:  # GAT
                pred, attn = model.predict_with_attention(graph_x)
                explanations[endpoint] = highlight_substructures(molecules, attn)
            endpoint_preds.append(pred)
            endpoint_scores.append(model.validation_score)

        # 2. 可按验证性能选择最优模型，也可保留多模型输出供平台展示
        results[endpoint] = aggregate_or_select(endpoint_preds, endpoint_scores)

    # 3. 批量导出端点矩阵与 GAT 子结构解释
    return format_admet_table(results), explanations
```

##### 为什么需要多模型 ADMET 预测

ADMET 任务很难用单一模型统一解决。不同端点的标签来源、数据规模、类别比例和物理含义差异很大：有些是二分类毒性风险，有些是连续药代动力学指标，有些强依赖局部官能团，有些更依赖全分子疏水性、极性表面积或环系复杂度。单一深度模型容易在小数据端点上过拟合，单一树模型又难以显式建模分子图的局部相互作用。

ADMETPred 的工程选择是把问题拆成“端点级模型池”。对每个端点 \(e\)，平台维护多个候选模型：

$$
\mathcal{M}_e=\{f_{e,1}^{\mathrm{LGBM}}, f_{e,2}^{\mathrm{XGB}}, f_{e,3}^{\mathrm{RF}}, f_{e,4}^{\mathrm{GAT}}, \ldots\}
$$

预测时输入分子 \(x\) 既被转换为描述符向量 \(\phi(x)\)，也被转换为图 \(G=(V,E)\)。树模型读取 \(\phi(x)\)，GAT 读取原子节点和化学键邻接关系。平台可按端点、模型和特征表示组织推理结果，因此适合批量筛选时同时输出多个 ADMET 风险维度。

##### 树模型分支：稳定处理表格化分子特征

补充材料列出的描述符覆盖分子量、LogP、TPSA、氢键供受体、可旋转键、环数、EState/VSA、BCUT2D、MQNs、SMARTS 片段等 RDKit 特征。对于这类高维但样本量有限的 QSAR 表格数据，树模型有三个实际优势：

- Random Forest 通过 bootstrap 和随机特征选择降低方差，适合噪声标签和非线性特征交互
- XGBoost 通过二阶梯度和正则化控制树复杂度，适合需要稳健泛化的端点
- LightGBM 使用直方图分桶和 leaf-wise 生长，适合大规模批量训练与高维稀疏特征

梯度提升树的统一目标可以写成：

$$
\mathcal{L}_{\mathrm{boost}} =
\sum_{i=1}^{n}\ell(y_i,\hat{y}_i)
+\sum_{k=1}^{K}\Omega(f_k)
$$

其中 \(\ell\) 是分类交叉熵或回归误差，\(\Omega(f_k)\) 惩罚树的叶子数和叶子权重，防止模型只记住训练集中的局部化学模式。

##### GAT 分支：从分子图中学习可解释子结构

GAT 将分子看作原子节点图。对原子 \(i\)，模型先计算邻居 \(j\) 对它的注意力权重：

$$
\alpha_{ij} =
\frac{\exp(\mathrm{LeakyReLU}(\mathbf{a}^{\top}[\mathbf{W}\mathbf{h}_i \Vert \mathbf{W}\mathbf{h}_j]))}
{\sum_{k\in\mathcal{N}(i)} \exp(\mathrm{LeakyReLU}(\mathbf{a}^{\top}[\mathbf{W}\mathbf{h}_i \Vert \mathbf{W}\mathbf{h}_k]))}
$$

再按注意力聚合邻域信息：

$$
\mathbf{h}'_i =
\sigma\left(\sum_{j\in\mathcal{N}(i)}\alpha_{ij}\mathbf{W}\mathbf{h}_j\right)
$$

这里的关键不只是预测准确率。因为 \(\alpha_{ij}\) 是归一化后的邻域贡献，平台可以把原子或键级权重映射回二维分子结构图，标出对某个 ADMET 端点最敏感的片段。例如一个预测为高毒性风险的分子，若芳香硝基、亲电受体或特定杂环附近权重较高，药物化学家就能把模型输出转化为候选改造位点。

##### 为什么不只做降维后的通用模型

补充材料的 PCA 消融显示，降维会损失 ADMET 端点所需的细粒度结构信息。平均而言，未降维模型在回归任务上 \(R^2=0.566\)，PCA 版本为 \(0.440\)；分类任务 AUC 为 \(0.728\)，PCA 版本为 \(0.694\)。这说明大量化学描述符中存在端点相关的局部信号，简单压缩到主成分空间会削弱模型识别罕见但重要子结构的能力。

> 💡 关键：ADMETPred 的“集成”不是把所有分子塞进一个黑盒模型，而是把端点、特征表示和算法族解耦；树模型提供稳健的表格特征建模，GAT 提供结构敏感预测和注意力解释。

##### 与传统 ADMET 工具的区别

传统在线 ADMET 工具通常存在三个瓶颈：端点覆盖有限、批量处理吞吐不足、预测结果难以解释。ADMETPred 的论文摘要明确把改进点放在三件事上：多算法协同提升准确率，并行架构提升高通量处理能力，可定制工作流提升端点和模型选择灵活性。其注意力子结构模块尤其重要，因为早期药物发现不是只需要“是否有风险”的标签，还需要知道“该改哪里”。

平台化设计也影响使用方式。研究者可以对一个候选库一次性输出 \(N_{\mathrm{mol}}\times 27\) 的 ADMET 矩阵，再按端点阈值过滤；对少数高价值分子，则进一步查看 GAT 高亮结构，判断风险来自可替换片段还是核心药效团。这样 ADMET 预测从单点打分变成了可嵌入虚拟筛选和 lead optimization 的决策节点。

#### 🧪 练习题

```yaml
question: "ADMETPred 中注意力驱动子结构高亮的主要作用是什么？"
options:
  - "把所有 ADMET 端点合并成一个总分"
  - "根据 GAT 的原子邻域注意力权重，把预测风险映射回可能相关的分子片段"
  - "用 PCA 压缩分子描述符以减少端点数量"
  - "只保留 Random Forest 的预测结果"
answer: 1
explain: "GAT 的注意力权重反映邻域原子对端点预测的相对贡献，映射回分子结构后可作为药物化学结构优化线索。"
```
