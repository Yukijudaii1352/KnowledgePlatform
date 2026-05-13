### AutoFeat

```yaml
id: autofeat
name: AutoFeat
full_name: "自动特征工程与选择 (Automatic Feature Engineering and Selection)"
year: 2019
org: "TU Berlin / BASF"
paper_url: "https://arxiv.org/abs/1901.07329"
category: automl
parent: "—"
motivation: "通过非线性特征变换组合+L1正则化筛选，自动构建可解释的线性回归模型"
```

#### 📝 一句话总结

AutoFeat 提出了一种自动特征工程框架，通过对原始特征进行多步非线性变换生成大规模候选特征池，再利用多轮 L1 正则化（Lasso）结合噪声过滤、分块与子采样策略高效筛选少量有意义特征，最终构建性能媲美非线性模型但保持可解释性的线性回归模型。

#### 🎯 核心要点

- 两阶段流水线：特征工程（Feature Engineering）→ 特征选择（Feature Selection）
- 特征工程：对原始特征迭代应用非线性变换（exp, log, sqrt, \(x^2\), \(x^3\), 1/x, |x|）及算术组合（+, -, ×, /），指数级扩展特征空间
- 特征选择核心：多步 L1 正则化，通过添加噪声特征作为基线过滤无关特征
- 分块策略（Chunking）：将大规模特征池拆分为多个子集分别进行 Lasso 回归，解决 \(p \gg n\) 问题
- 子采样策略（Subsampling）：对数据点进行多次随机子采样，仅保留在多数子样本中被选中的特征
- 物理单位感知：利用 SymPy 符号计算追踪特征的物理量纲，仅组合量纲兼容的特征
- 最终模型为标准线性回归，系数可直接解释各特征对目标的贡献
- 提供 Python 库 `autofeat`，API 兼容 scikit-learn

#### 🔬 深入细节

![AutoFeat 特征工程与选择流程](https://ar5iv.labs.arxiv.org/html/1901.07329v1/assets/autofeat_pipeline.png)
*图：AutoFeat 流水线示意——从原始特征出发，经多步非线性变换生成候选特征池，再通过多轮 L1 选择得到最终特征子集*

```python
# AutoFeat 核心算法伪代码
def autofeat(X, y, transformations, n_steps, n_select):
    """
    X: 原始特征矩阵 (n_samples, n_features)
    y: 目标变量
    transformations: 非线性变换集合 {exp, log, sqrt, ^2, ^3, 1/x, |x|}
    n_steps: 特征工程迭代步数
    n_select: 每步保留的特征数上限
    """
    # === 阶段1: 特征工程 ===
    feature_pool = X.copy()
    for step in range(n_steps):
        new_features = []
        for f in feature_pool.columns:
            for t in transformations:
                new_features.append(t(f))  # 一元变换
        for f1, f2 in combinations(feature_pool.columns, 2):
            for op in ['+', '-', '*', '/']:
                new_features.append(op(f1, f2))  # 二元组合
        feature_pool = concat(feature_pool, new_features)
        # 可选: 每步后进行初步筛选以控制规模
        feature_pool = l1_select(feature_pool, y, n_select)
    
    # === 阶段2: 多步特征选择 ===
    selected = multi_step_l1_selection(feature_pool, y)
    
    # === 最终模型 ===
    model = LinearRegression().fit(X[selected], y)
    return model, selected

def multi_step_l1_selection(features, y):
    """多步L1正则化特征选择"""
    # Step 1: 添加噪声特征作为基线
    noise_features = generate_noise(n=5)
    augmented = concat(features, noise_features)
    
    # Step 2: 分块 + Lasso
    chunks = split_into_chunks(augmented, chunk_size=n_samples//10)
    candidates = []
    for chunk in chunks:
        model = Lasso(alpha=auto).fit(chunk, y)
        # 仅保留系数 > max(噪声特征系数) 的特征
        threshold = max(abs(model.coef_[noise_indices]))
        candidates.extend(chunk.columns[abs(model.coef_) > threshold])
    
    # Step 3: 子采样验证
    final = []
    for subsample in random_subsamples(n_rounds=5):
        model = Lasso().fit(candidates[subsample], y[subsample])
        final.extend(selected_by(model))
    
    # 仅保留在多数子样本中被选中的特征
    return majority_vote(final)
```

##### 动机与背景

传统机器学习流程中，特征工程是最耗时且依赖领域专家经验的环节。虽然深度学习通过端到端表示学习部分解决了这一问题，但在**表格数据**（尤其是样本量有限的科学/工业场景）中，手动特征工程仍然是提升模型性能的关键手段。

现有自动特征工程方法（如 featuretools、tsfresh）主要面向关系型数据或时间序列，对于包含不同物理单位传感器测量值的**异构科学数据集**缺乏针对性支持。此外，生成大量候选特征后如何高效、稳健地筛选出真正有用的特征，避免过拟合，是核心挑战。

> 💡 关键：AutoFeat 的核心洞察是——通过非线性变换将线性模型的表达能力提升到非线性水平，同时保持模型的可解释性优势。

##### 核心机制：特征工程

AutoFeat 的特征工程阶段通过迭代应用预定义的变换算子来扩展特征空间。给定原始特征集 \(\mathbf{X} = \{x_1, x_2, \ldots, x_p\}\)，每一步生成新特征：

**一元变换**（对每个特征独立应用）：

$$\mathcal{T}_{\text{unary}} = \{\exp, \log, \sqrt{\cdot}, (\cdot)^2, (\cdot)^3, 1/(\cdot), |\cdot|\}$$

**二元组合**（对特征对应用算术运算）：

$$\mathcal{T}_{\text{binary}} = \{+, -, \times, /\}$$

经过 \(s\) 步特征工程后，特征数量呈指数增长。例如，\(p\) 个原始特征经 1 步变换可产生约 \(7p + 4\binom{p}{2}\) 个新特征。为控制组合爆炸，AutoFeat 采用以下策略：

1. **物理单位约束**：利用 SymPy 追踪每个特征的量纲，仅对量纲兼容的特征进行加减运算（如不会将"米"与"秒"相加）
2. **每步筛选**：在每步特征工程结束后，先进行一轮 L1 选择，将候选特征数控制在可管理范围内
3. **去重**：通过计算特征间相关性，去除高度冗余的特征

##### 核心机制：多步 L1 特征选择

特征选择面临的核心挑战是：候选特征数 \(p'\) 远大于样本数 \(n\)（通常 \(p' \gg n\)），直接应用 Lasso 会导致不稳定的选择结果。AutoFeat 设计了一套鲁棒的多步选择流程：

**Step 1 — 噪声过滤**：向特征矩阵中添加 \(k\) 个随机噪声特征（从标准正态分布采样），作为"无关特征"的基线。Lasso 回归后，任何系数绝对值不超过噪声特征最大系数的真实特征都被淘汰：

$$|w_j| \leq \max_{i \in \text{noise}} |w_i| \implies \text{移除特征 } j$$

**Step 2 — 分块策略**：将候选特征随机分为多个大小约为 \(n/10\) 的块（chunk），每块独立进行 Lasso 回归。这确保每个子问题中 \(p < n\)，Lasso 可以稳定工作。

**Step 3 — 子采样验证**：对数据点进行多次随机子采样（默认 5 轮，每轮取 2/3 样本），在每个子样本上独立运行 Lasso。仅保留在**大多数子样本**中都被选中的特征，确保选择结果不依赖于特定数据点。

> ⚠️ 注意：Lasso 的正则化参数 \(\alpha\) 通过 LassoLarsCV（基于 LARS 算法的交叉验证）自动确定，无需手动调参。

##### 最终模型与可解释性

经过特征选择后，AutoFeat 使用选中的少量非线性特征训练一个标准**最小二乘线性回归**模型：

$$\hat{y} = w_0 + \sum_{j=1}^{k} w_j \cdot \phi_j(\mathbf{x})$$

其中 \(\phi_j(\mathbf{x})\) 是通过变换生成的特征（如 \(\log(x_1) \cdot x_3^2\)）。由于最终模型是线性的，每个特征的权重 \(w_j\) 直接反映其对预测的贡献大小和方向，保持了完全的可解释性。

##### 与传统方法的对比

| 方法 | 特征工程 | 模型类型 | 可解释性 | 适用场景 |
|------|---------|---------|---------|---------|
| 手动特征工程 + 线性模型 | 人工 | 线性 | ✅ 高 | 需要领域专家 |
| 随机森林/GBDT | 隐式（树分裂） | 非线性 | ❌ 低 | 通用 |
| 深度学习 | 端到端学习 | 非线性 | ❌ 低 | 大数据 |
| **AutoFeat** | **自动** | **线性** | **✅ 高** | **小样本科学数据** |

AutoFeat 的独特优势在于：在获得接近非线性模型性能的同时，保持了线性模型的可解释性和外推能力。实验表明，在 5 个回归基准数据集上，AutoFeat 显著优于普通线性模型（R² 提升 10-50%），并在多数数据集上达到或超过随机森林、SVR 等非线性模型的性能。

#### 🧪 练习题

```yaml
question: "AutoFeat 在特征选择阶段添加噪声特征的主要目的是什么？"
options:
  - "增加训练数据的多样性以防止过拟合"
  - "作为无关特征的基线，过滤掉系数不显著的候选特征"
  - "用于估计 Lasso 正则化参数 α 的最优值"
  - "生成额外的非线性特征以扩展特征空间"
answer: 1
explain: "噪声特征服从随机分布，与目标变量无关。Lasso 回归后，系数绝对值不超过噪声特征最大系数的真实特征被认为不比随机噪声更有信息量，因此被淘汰。"
```