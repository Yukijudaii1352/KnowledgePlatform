### Optuna

```yaml
id: optuna
name: Optuna
full_name: "Optuna: 下一代超参数优化框架 (A Next-generation Hyperparameter Optimization Framework)"
year: "2019"
org: "Preferred Networks"
paper_url: "https://arxiv.org/abs/1907.10902"
category: "automl"
parent: "—"
motivation: "提出define-by-run API实现动态搜索空间，结合高效采样与剪枝的轻量级超参数优化框架"
```

#### 📝 一句话总结

Optuna 提出了基于 define-by-run 范式的超参数优化框架，通过动态构建搜索空间、高效采样算法（TPE/CMA-ES）和异步早停剪枝（ASHA），实现了灵活、高效且易于分布式扩展的自动超参数调优。

#### 🎯 核心要点

- **Define-by-run API**：搜索空间在目标函数执行过程中动态定义，支持条件参数和循环结构等复杂搜索空间
- **高效采样算法**：集成 TPE（Tree-structured Parzen Estimator）和 CMA-ES（协方差矩阵自适应进化策略）
- **自动化早停剪枝**：支持 ASHA（Asynchronous Successive Halving Algorithm）和 Median Pruning，实现 trial 级别的提前终止
- **轻量级模块化架构**：基于 Study/Trial/Storage 三层抽象，支持 RDB 后端实现分布式优化
- **即时可视化**：集成 Web Dashboard 实时监控优化进程
- **线性分布式扩展**：多 worker 并行优化性能随节点数线性增长

#### 🔬 深入细节

![Optuna 架构示意图](https://ar5iv.labs.arxiv.org/html/1907.10902v2/assets/x4.png)
*图：Optuna 软件架构——Study 管理优化会话，Trial 封装单次评估，Storage 提供持久化与分布式支持*

##### 算法伪代码

```python
# Optuna Define-by-run 超参数优化核心流程
def objective(trial):
    # 动态定义搜索空间（define-by-run）
    n_layers = trial.suggest_int("n_layers", 1, 4)
    layers = []
    for i in range(n_layers):
        # 条件搜索空间：层数决定每层单元数
        n_units = trial.suggest_int(f"n_units_l{i}", 16, 256, log=True)
        layers.append(n_units)
    
    lr = trial.suggest_float("lr", 1e-5, 1e-1, log=True)
    optimizer_name = trial.suggest_categorical("optimizer", ["Adam", "SGD"])
    
    # 训练模型并支持中间报告（用于剪枝）
    for epoch in range(100):
        train_loss = train_one_epoch(layers, lr, optimizer_name)
        val_acc = evaluate()
        trial.report(val_acc, epoch)  # 报告中间值
        if trial.should_prune():      # 剪枝判断
            raise optuna.TrialPruned()
    
    return val_acc

# 创建 Study 并优化
study = optuna.create_study(
    direction="maximize",
    sampler=optuna.samplers.TPESampler(),
    pruner=optuna.pruners.SuccessiveHalvingPruner()
)
study.optimize(objective, n_trials=100)
```

##### 动机与背景

传统超参数优化框架（如 Hyperopt、SMAC、Vizier）采用 **define-and-run** 范式：用户必须在优化开始前静态定义完整的搜索空间。这种方式存在根本性限制：

1. **无法表达条件依赖**：例如神经网络层数决定了每层超参数的数量，静态定义难以自然表达
2. **代码侵入性强**：需要将搜索空间与目标函数分离，增加工程复杂度
3. **不支持动态结构**：循环、分支等程序控制流无法直接用于搜索空间定义

Optuna 借鉴了深度学习框架从 define-and-run（TensorFlow 1.x）向 define-by-run（PyTorch/Chainer）演进的思路，将相同理念引入超参数优化领域。

##### 核心机制：Define-by-run 搜索空间

Define-by-run 的核心思想是：**搜索空间不是预先声明的静态对象，而是在目标函数执行过程中通过 `trial.suggest_*()` 调用动态构建的**。

每次调用 `trial.suggest_int()`、`trial.suggest_float()` 或 `trial.suggest_categorical()` 时，框架会：
1. 检查该参数名是否已在当前 trial 中被采样
2. 若未采样，则根据采样算法（TPE/CMA-ES/随机）生成一个值
3. 记录该参数的名称、类型、范围和采样值

这意味着搜索空间的**拓扑结构本身可以是超参数的函数**。例如：

$$\text{SearchSpace}(\theta) = \{\theta_i \mid i \in \text{ActiveParams}(\theta_{\text{structure}})\}$$

其中 \(\theta_{\text{structure}}\) 决定了哪些参数 \(\theta_i\) 会被激活。

> 💡 关键：Define-by-run 使得搜索空间可以包含 Python 的任意控制流（if/for/while），极大提升了表达能力。

##### 采样算法

**TPE (Tree-structured Parzen Estimator)**：

TPE 将超参数的条件概率建模为两个密度函数：

$$p(x|y) = \begin{cases} l(x) & \text{if } y < y^* \\ g(x) & \text{if } y \geq y^* \end{cases}$$

其中 \(y^*\) 是目标值的分位数阈值，\(l(x)\) 建模"好"的超参数分布，\(g(x)\) 建模"差"的超参数分布。优化目标等价于最大化 \(l(x)/g(x)\)。

Optuna 对 TPE 的改进：
- 独立采样（Independent TPE）：对每个超参数独立建模，天然适配动态搜索空间
- 支持对数尺度和离散参数的核密度估计

**CMA-ES (协方差矩阵自适应进化策略)**：

CMA-ES 维护一个多元高斯分布 \(\mathcal{N}(m, \sigma^2 C)\)，通过进化策略迭代更新均值 \(m\)、步长 \(\sigma\) 和协方差矩阵 \(C\)。适用于连续参数空间的局部优化。

##### 剪枝策略

Optuna 的剪枝机制允许在 trial 执行过程中提前终止表现不佳的配置：

**ASHA (Asynchronous Successive Halving)**：

ASHA 基于 Successive Halving 算法的异步版本。给定资源预算（如 epoch 数），在每个 rung（检查点）处：

$$\text{Promote}(t) = \begin{cases} \text{True} & \text{if } f(t) \leq \text{Percentile}_{1/\eta}(\{f(t')\}) \\ \text{False} & \text{otherwise} \end{cases}$$

其中 \(\eta\) 是缩减因子（默认为 3-4），只有表现在前 \(1/\eta\) 的 trial 才能继续获得更多资源。

> ⚠️ 注意：ASHA 的异步特性使其天然适合分布式环境——新 worker 无需等待其他 trial 完成即可开始新的评估。

实验表明，ASHA 剪枝相比无剪枝可实现约 **35 倍**的加速（在相同时间内探索更多有效配置）。

##### 分布式架构

Optuna 的分布式优化基于共享存储（Shared Storage）模式：

```
Worker 1 ──┐
Worker 2 ──┼──→ RDB Storage (MySQL/PostgreSQL) ←──→ Study
Worker 3 ──┘
```

- 每个 worker 独立运行目标函数
- 通过 Storage 层读取历史 trial 结果、写入新结果
- 采样算法基于所有已完成 trial 的信息进行决策
- 无需中心调度器，worker 可动态加入/退出

实验验证：在 1-8 个 worker 的配置下，优化效率随 worker 数量**线性扩展**，且 worker 数量不影响每个 trial 的质量。

##### 与传统方法的区别

| 特性 | Hyperopt | SMAC | Google Vizier | **Optuna** |
|------|----------|------|---------------|------------|
| 搜索空间定义 | Define-and-run | Define-and-run | Define-and-run | **Define-by-run** |
| 条件参数 | 需特殊语法 | 需配置文件 | 有限支持 | **原生 Python** |
| 剪枝 | ❌ | ❌ | ✅ | **✅ (ASHA/Median)** |
| 分布式 | MongoDB | SMAC3 | 内置 | **RDB 后端** |
| 可视化 | 有限 | 有限 | Web UI | **Web Dashboard** |
| 轻量级 | ✅ | ❌ | ❌(需服务) | **✅** |

#### 🧪 练习题

```yaml
question: "Optuna 的 define-by-run API 相比传统 define-and-run 方式的核心优势是什么？"
options:
  - "训练速度更快，因为搜索空间更小"
  - "搜索空间可以在目标函数执行过程中动态构建，支持条件参数和程序控制流"
  - "不需要指定超参数的取值范围"
  - "自动选择最优的采样算法"
answer: 1
explain: "Define-by-run 允许在目标函数中通过 trial.suggest_*() 动态定义搜索空间，使得搜索空间的结构本身可以依赖于其他超参数的值，天然支持条件参数、循环等复杂结构。"
```