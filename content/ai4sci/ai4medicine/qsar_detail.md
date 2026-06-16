### QSAR — 定量构效关系

```yaml
id: qsar
name: QSAR
full_name: 定量构效关系 (QSAR)
year: 1960s
org: Hansch
paper_url: https://pubs.acs.org/doi/10.1021/ja01193a005
category: admet
parent: —
motivation: 定量构效关系手工特征建模
```

#### 📝 一句话总结

QSAR 将分子的结构、理化性质和取代基常数编码为可回归的描述符，用统计模型预测生物活性或 ADMET 端点，解决了早期药物优化只能依赖定性 SAR 经验而难以量化外推的问题。

#### 🎯 核心要点

- **核心假设**：结构相近且描述符相近的化合物，在相同实验端点上应具有可统计建模的活性趋势
- **Hansch 分析**：用疏水性 \(\log P\) 或 \(\pi\)、电子效应 \(\sigma\)、位阻参数 \(E_s\) 解释 \(\log(1/C)\) 等活性指标
- **线性自由能关系来源**：继承 Hammett 方程思想，把取代基电子效应从反应速率扩展到生物活性
- **常见模型形式**：多元线性回归是经典 QSAR 的起点，现代 QSAR 可替换为 PLS、Random Forest、SVM、XGBoost、GNN 等
- **描述符工程**：从分子量、LogP、极性表面积、氢键供受体、拓扑指数、指纹 bit 到 3D 场描述符都可作为输入
- **验证比拟合更重要**：必须报告训练/测试划分、交叉验证、外部验证、随机化检验和适用域
- **ADMET 基础方法**：ADMETlab、admetSAR、SwissADME 等平台本质上仍是在更大数据和更强模型上的 QSAR/QSPR/QSTR 系统
- **元信息限制**：任务给定 DOI `10.1021/ja01193a005` 实际对应 Wiener 1947 年拓扑指数论文，不是 Hansch QSAR 论文；Hansch/Fujita QSAR 的代表来源是 Nature 1962 `10.1038/194178b0` 与 JACS 1964 `10.1021/ja01062a035`

#### 🔬 深入细节

##### 论文与图示来源说明

任务给定链接 `https://pubs.acs.org/doi/10.1021/ja01193a005` 指向 Harry Wiener 的 *Structural Determination of Paraffin Boiling Points*，它对后来的拓扑描述符/QSPR 很重要，但不是 Hansch QSAR 的源论文。这里保留 YAML 原样，并以 Hansch、Maloney、Fujita、Muir 1962 年 Nature 论文 `https://www.nature.com/articles/194178b0` 和 Hansch、Fujita 1964 年 JACS 论文 `https://pubs.acs.org/doi/10.1021/ja01062a035` 作为 QSAR 方法来源。原始论文图示不稳定公开，因此下图引用的是 2025 年开放综述中的 QSAR workflow，用于说明现代 QSAR 流程。

![QSAR 建模流程](https://mdpi-res.com/applsci/applsci-15-01206/article_deploy/html/images/applsci-15-01206-g001-550.jpg)
*图：QSAR 从化合物库和生物活性测定出发，计算化学描述符，再用化学计量学/统计模型建立活性预测方程并验证。来源：Applied Sciences 2025 开放综述。*

##### 算法伪代码

```python
# 经典 QSAR / Hansch analysis 简化流程
def build_qsar_model(molecules, activity_values):
    # activity 通常转为 pIC50、pKi 或 log(1/C)，方向越大表示越强
    y = transform_activity(activity_values)

    # 1. 数据清洗：同一端点、同一单位、同一实验机制
    mols = standardize_structures(molecules)
    y = remove_inconsistent_measurements(y)

    # 2. 描述符计算：Hansch 时代是 pi/sigma/Es，现代可扩展为指纹和 2D/3D 描述符
    X = []
    for mol in mols:
        descriptors = {
            "logP": calc_logp(mol),
            "sigma": hammett_sigma(mol.substituent),
            "Es": steric_constant(mol.substituent),
            "tpsa": calc_tpsa(mol),
            "fingerprint": ecfp_bits(mol),
        }
        X.append(vectorize(descriptors))

    # 3. 划分、特征选择和回归
    X_train, X_test, y_train, y_test = scaffold_or_random_split(X, y)
    selected = select_features(X_train, y_train)
    model = fit_regularized_linear_regression(X_train[:, selected], y_train)

    # 4. 验证和适用域
    report_cv_q2(model, X_train[:, selected], y_train)
    report_external_metrics(model, X_test[:, selected], y_test)
    define_applicability_domain(X_train[:, selected])
    return model
```

##### 从 SAR 到 QSAR：把“取代基有利/不利”变成方程

传统 SAR 更像化学家的经验表：某个取代基提高活性，另一个取代基降低活性。它能指导局部优化，但难以回答“提高多少”“是否可以外推到新取代基”“疏水性和电子效应哪个更重要”。QSAR 的核心贡献是把结构变化转成数值变量，把活性转成可回归目标。

Hansch 的经典设定通常使用：

$$
y = \log\frac{1}{C}
$$

其中 \(C\) 是产生指定生物效应所需的浓度，例如 \(IC_{50}\)、\(ED_{50}\) 或类似端点。取倒数再取对数后，活性越强，\(y\) 越大；这让模型更接近线性自由能关系，也减少不同数量级浓度带来的尺度问题。

##### Hansch 方程的关键变量

早期 Hansch 分析把取代基效应拆成三类：

$$
\log\frac{1}{C}
= a(\log P)^2 + b\log P + \rho\sigma + \delta E_s + c
$$

或用取代基疏水常数 \(\pi_X\)：

$$
\pi_X = \log P_X - \log P_H
$$

其中 \(\log P\) 或 \(\pi\) 描述疏水性，\(\sigma\) 是 Hammett 取代基电子常数，\(E_s\) 表示位阻效应，\(a,b,\rho,\delta,c\) 是回归系数。二次项 \(a(\log P)^2\) 很重要：很多生物活性随疏水性先升后降，因为化合物既要进入疏水环境，也不能因过度疏水而溶解性差、扩散差或非特异结合强。

> 💡 关键：Hansch 方程不是简单说“越疏水越好”，而是允许存在最佳疏水性窗口。

##### 最小二乘拟合与解释

给定描述符矩阵 \(X\in\mathbb{R}^{n\times p}\) 和活性向量 \(y\)，经典 QSAR 用普通最小二乘或带正则项的回归：

$$
\hat{\beta}
= \arg\min_{\beta}
\|y-X\beta\|_2^2
$$

若存在共线性或特征数接近样本数，常加入 Ridge/Lasso：

$$
\hat{\beta}_{\mathrm{ridge}}
= \arg\min_{\beta}
\left(
\|y-X\beta\|_2^2+\lambda\|\beta\|_2^2
\right)
$$

在 Hansch 分析中，系数本身可解释。例如 \(\rho>0\) 表示吸电子取代基可能提高活性，\(\delta<0\) 可能表示位阻增大不利于结合或转运。现代非线性 QSAR 的预测力往往更强，但可解释性通常不如这种显式方程。

##### 数据前提：同一端点、同一机制、同一化学空间

QSAR 最容易失败的地方不是模型，而是数据。合理的 QSAR 数据集应该尽量满足：化合物属于相近化学系列或至少覆盖明确的化学空间；活性来自同一实验体系和同一单位；活性范围足够宽；端点机制一致。如果把不同 assay、不同物种、不同读数混在一起，模型可能只学到实验批次差异。

因此建模前通常要做结构标准化、盐/溶剂去除、重复测量合并、单位统一和异常值检查。现代 ADMET QSAR 还会对 SMILES 做 canonicalization，并标记离子态、互变异构体和手性。

##### 验证、随机化检验和适用域

一个高 \(R^2\) 只能说明训练集拟合好，不代表能预测新分子。常见验证指标包括：

$$
R^2 = 1-\frac{\sum_i(y_i-\hat{y}_i)^2}{\sum_i(y_i-\bar{y})^2}
$$

$$
Q^2_{\mathrm{CV}}
= 1-\frac{\sum_i(y_i-\hat{y}_{i,\mathrm{CV}})^2}{\sum_i(y_i-\bar{y})^2}
$$

外部测试集上的 RMSE/MAE/\(R^2\) 才更接近真实泛化。还需要做 Y-scrambling：随机打乱 \(y\) 后重新训练，如果模型仍能给出很高分数，说明原模型可能是偶然相关。

适用域用于判断新分子是否落在训练化学空间内。线性 QSAR 常用 leverage：

$$
h_i = x_i^\top (X^\top X)^{-1}x_i
$$

若新分子 \(h_i\) 很高，表示它在描述符空间中远离训练样本，即使模型给出数值预测，也应降低置信度。

##### 与现代机器学习 QSAR 的关系

现代 QSAR 不再局限于 Hansch 方程。ECFP、MACCS、分子图、3D 构象描述符可以替代 \(\pi,\sigma,E_s\)，模型也可以从 MLR 换成 Random Forest、SVM、XGBoost、深度神经网络或 GNN。但它们仍遵循同一个范式：

$$
\mathrm{Activity\ or\ ADMET}
= f(\mathrm{molecular\ representation})
$$

区别在于，经典 QSAR 强调少量可解释描述符和小样本线性关系；现代 QSAR 更强调大规模数据、非线性模型和自动特征学习。ADMET 预测尤其适合 QSAR，因为许多端点很难通过结构生物学直接计算，只能从已有实验数据中学习结构到性质的统计映射。

##### 局限性

QSAR 的预测边界由训练数据决定。模型可能无法处理新骨架、新机制、不同实验条件或强构象效应；描述符也可能遗漏蛋白环境、代谢路径和反应性中间体。QSAR 最适合用于早期筛选、优先级排序和提出结构优化方向，而不是单独作为候选药物安全性或有效性的最终证据。

#### 🧪 练习题

```yaml
question: "经典 Hansch QSAR 方程中加入 logP 的二次项，主要是为了表达什么现象？"
options:
  - "活性一定随分子量线性增大"
  - "疏水性通常存在最佳窗口，过低或过高都可能降低活性"
  - "所有电子效应都可以忽略"
  - "模型不需要外部验证"
answer: 1
explain: "二次项允许活性-疏水性关系呈抛物线，反映化合物既需要足够疏水以穿膜或结合，也不能过度疏水导致溶解性和选择性问题。"
```
