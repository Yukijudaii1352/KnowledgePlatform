### matminer — 材料数据挖掘工具 (Materials Data Miner)

```yaml
id: matminer
name: matminer
full_name: "材料数据挖掘工具 (Materials Data Miner)"
year: "2018"
org: LBNL
paper_url: "https://doi.org/10.1016/j.commatsci.2018.05.018"
category: property_prediction
parent: —
motivation: "70+特征提取器的标准工具"
```

#### 📝 一句话总结

matminer 不是一个单一预测模型，而是把材料数据库检索、材料对象特征化、pandas/scikit-learn 机器学习和可视化串成统一接口的材料信息学工具箱，解决了材料数据源、描述符实现和数据科学工具之间长期割裂的问题。

#### 🎯 核心要点

- **三段式材料 ML 管线**：data retrieval → feature extraction → visualization / machine learning，所有中间结果以 pandas DataFrame 组织
- **统一数据检索接口**：论文版本支持 Citrination、Materials Project、MDF、MPDS 和 MongoDB，并把不同 API/schema 输出标准化为表格
- **标准 Featurizer 抽象**：每个 featurizer 实现 `featurize`、`feature_labels`、`citations`、`implementors`，并可批量作用于 DataFrame
- **材料专用描述符库**：覆盖 composition、structure、site、band structure、density of states 等输入类型；论文 v0.3.2 有 47 个 featurizers，官方文档后续版本列出 70+ featurizers
- **scikit-learn 兼容**：featurizers 继承类似 sklearn transformer 的接口，可与 `Pipeline`、预处理器、模型选择工具组合
- **pymatgen 集成**：直接复用 `Composition`、`Structure`、空间群、局域环境等材料对象和算法，避免重新实现基础材料解析
- **内置数据集**：提供一行加载的材料数据集，便于复现实验、快速 benchmark 和教学示例
- **可解释与可追溯**：`citations()` 机制把每个特征生成方法关联到原始论文，避免描述符来源不明

#### 🔬 深入细节

![matminer 工作流总览](https://hackingmaterials.lbl.gov/matminer/_images/Flowchart.png)
*图：matminer 官方文档中的工作流图，与论文 Figure 1 的核心内容一致：从材料数据库取数，经特征提取变成材料-特征-性质表，再交给 scikit-learn/Keras 等工具建模，并配合可视化分析。*

##### 算法伪代码

```python
# matminer 典型材料性质预测流程伪代码
from matminer.datasets import load_dataset
from matminer.featurizers.composition import ElementProperty
from matminer.featurizers.conversions import StrToComposition
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import StandardScaler
from sklearn.ensemble import RandomForestRegressor
from sklearn.model_selection import cross_val_score

# 1. 数据检索或加载：统一为 pandas DataFrame
df = load_dataset("elastic_tensor_2015")

# 2. 数据转换：把 formula 字符串转成 pymatgen Composition
df = StrToComposition(target_col_id="composition").featurize_dataframe(df, "formula")

# 3. 特征化：把材料对象映射成数值描述符列
featurizer = ElementProperty.from_preset("magpie")
df = featurizer.featurize_dataframe(df, col_id="composition")
feature_cols = featurizer.feature_labels()

# 4. 交给通用机器学习工具
X = df[feature_cols]
y = df["K_VRH"]  # e.g. bulk modulus target
model = Pipeline([
    ("scale", StandardScaler()),
    ("regressor", RandomForestRegressor())
])
score = cross_val_score(model, X, y, scoring="neg_mean_absolute_error")
```

##### 来源说明

matminer 的 2018 论文是工具箱论文，不像 CGCNN/CHGNet 那样有单个神经网络架构或唯一损失函数。因此这里的方法级解读基于两个可访问来源：论文 PDF 对 v0.3.2 架构、47 个 featurizers、DataFrame/sklearn/pymatgen 集成的描述，以及官方文档对当前 40+ datasets、70+ featurizers 和模块化接口的说明。图示采用官方文档公开图片。

##### 核心抽象：材料对象到特征矩阵

matminer 的核心计算可以抽象成一个特征映射：

$$
\boldsymbol{\phi}(m)=
\left[f_1(m), f_2(m), \ldots, f_d(m)\right]\in\mathbb{R}^d
$$

其中 \(m\) 可以是 composition、crystal structure、site、band structure 或 DOS。给定材料-性质数据集 \(\{(m_i,y_i)\}_{i=1}^{N}\)，matminer 负责生成矩阵：

$$
X =
\begin{bmatrix}
\boldsymbol{\phi}(m_1)^\top \\
\boldsymbol{\phi}(m_2)^\top \\
\cdots \\
\boldsymbol{\phi}(m_N)^\top
\end{bmatrix},
\qquad
\mathbf{y}=[y_1,\ldots,y_N]^\top
$$

下游模型由 scikit-learn、Keras 或其他库完成：

$$
\theta^\* =
\arg\min_{\theta}
\sum_{i=1}^{N}
\ell\left(g_{\theta}(\boldsymbol{\phi}(m_i)), y_i\right)
+ \Omega(\theta)
$$

这也是 matminer 与端到端 GNN 的本质区别：它不直接学习 \(\boldsymbol{\phi}\)，而是把大量文献中的材料描述符实现为可复用、可组合、可审计的函数。

##### Composition featurizer 的直觉

以 composition featurizer 为例，一个化学式可写成元素分数 \(x_e\) 的集合。若元素属性表给出每个元素的电负性、原子半径、熔点、Mendeleev number 等属性 \(p_e\)，常见描述符包括加权平均、范围和方差：

$$
\bar{p}=\sum_{e\in\mathcal{E}}x_e p_e
$$

$$
\mathrm{range}(p)=\max_{e\in\mathcal{E}}p_e-\min_{e\in\mathcal{E}}p_e
$$

$$
\mathrm{var}(p)=\sum_{e\in\mathcal{E}}x_e(p_e-\bar{p})^2
$$

这些数值把“Fe\(_2\)O\(_3\)”这样的符号对象变成机器学习可处理的向量，同时保留可解释的化学含义。结构和 site featurizers 则进一步利用 pymatgen 的晶体结构对象，计算配位数、局域环境、径向分布、Voronoi 邻域、结构有序度等与几何有关的量。

##### BaseFeaturizer 设计

论文强调所有 featurizers 都继承统一的 `BaseFeaturizer` 模式，至少包含四个方法：

- `featurize(x)`：把一个材料对象转成一个特征向量
- `feature_labels()`：返回每个输出维度的列名，便于 DataFrame 追踪
- `citations()`：返回对应方法的 BibTeX 引用，保证描述符来源可追溯
- `implementors()`：记录实现与维护者

批量计算时，`featurize_dataframe(df, col_id)` 会把某一列材料对象展开成多列数值特征，并可对大量行并行处理。这个接口选择很务实：研究者可以在同一张 DataFrame 上做清洗、特征化、缺失值处理、训练/测试划分、模型拟合和误差分析，而不需要在自定义材料对象、JSON、CSV 和 numpy 数组之间反复手工转换。

##### 数据检索与标准化

材料数据源的麻烦在于每个数据库都有不同 API、认证方式和 schema。matminer 的 data retrieval 层把查询封装成 `get_dataframe`，输出统一的 pandas 表。论文版本列出 Citrination、Materials Project、MDF、MPDS 和 MongoDB：例如 Materials Project 检索会通过 pymatgen 的 `MPRester` 获取晶体结构、带结构、声子、压电、介电、弹性等属性，再转成 DataFrame；Citrination 的 PIF 层级记录也会被展平成表格。

这种标准化使跨数据库对比变简单。例如可以从 Citrination 取实验带隙，从 Materials Project 或 OQMD 取计算带隙，然后按化学式或结构键合并，直接比较实验-计算偏差。matminer 本身还提供内置数据集，减少教程、benchmark 和复现实验对外部 API key 的依赖。

##### 与 scikit-learn 的关系

matminer 明确不重复实现常规机器学习算法。它的边界是“把材料科学对象变成通用数据科学栈可用的数据”。因此它与 scikit-learn 的连接有两层：

第一，所有数据都用 pandas DataFrame 表示，天然能与 sklearn 的 `train_test_split`、`Pipeline`、`GridSearchCV` 等工具交互。第二，featurizer 的设计接近 sklearn transformer，可以与标准化、特征选择、回归器或分类器组合成端到端管线。

> 💡 关键：matminer 的价值不是某个最高精度模型，而是把材料领域知识编码为稳定接口，让研究者能快速比较不同描述符和下游模型。

##### 与端到端材料 GNN 的区别

CGCNN、MEGNet、CHGNet 等 GNN 从结构图中自动学习表示，优势是减少手工特征工程；matminer 的优势则是可解释、轻量、可复现，并能在小数据集上充分利用成熟的物理/化学描述符。很多实际项目会先用 matminer 建立随机森林、梯度提升树或线性模型基线，再决定是否需要更重的深度图模型。

它的局限也来自同一处：手工描述符的表达力受设计者限制，复杂长程相互作用、电子结构细节和动力学势能面并不会自动从数据中涌现。matminer 更适合材料性质表格预测、快速筛选、特征重要性分析和基准构建，而不是替代 MLIP 做原子级 MD。

#### 🧪 练习题

```yaml
question: "matminer 中 BaseFeaturizer 统一接口的主要目的是什么？"
options:
  - "直接替代所有 scikit-learn 模型"
  - "把不同材料对象的特征生成方法标准化，使其能批量加入 DataFrame 并进入 ML 管线"
  - "只用于下载 Materials Project 数据"
  - "让每个特征必须由神经网络自动学习"
answer: 1
explain: "BaseFeaturizer 规定 featurize、feature_labels、citations 等方法，使不同描述符可以用同一方式批量生成、命名、引用并与 pandas/scikit-learn 集成。"
```
