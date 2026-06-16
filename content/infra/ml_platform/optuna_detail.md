### Optuna

```yaml
id: optuna
name: Optuna
full_name: Optuna
year: "2019"
org: Preferred Networks
paper_url: https://arxiv.org/abs/1907.10902
category: experiment_mgmt
parent: mlflow
motivation: Define-by-run接口，支持高效剪枝与超参搜索
```

#### 📝 一句话总结

Optuna 提出了面向超参数优化的 define-by-run 框架，让搜索空间在 Python 训练代码执行时动态生成，并用可插拔 sampler、pruner 与共享 storage 把单机调参扩展到异步分布式搜索。

#### 🎯 核心要点

- define-by-run API：在 `objective(trial)` 的控制流中调用 `suggest_*`，自然表达条件搜索空间
- Study/Trial 抽象：Study 管理优化方向和历史，Trial 记录参数、中间指标、最终值和状态
- 可插拔 sampler：支持 TPE、随机、CMA-ES 等策略，并允许用户定制采样逻辑
- 可插拔 pruner：通过 `report()` 与 `should_prune()` 利用学习曲线中间值提前终止低潜力 trial
- 共享 storage 架构：内存、SQLite、RDB 等后端让多个 worker 以异步方式协同优化同一个 study
- 与训练框架解耦：Optuna 不接管模型训练，只要求 objective 返回可最小化或最大化的目标值

#### 🔬 深入细节

![Optuna 系统设计图](https://ar5iv.labs.arxiv.org/html/1907.10902/assets/fig/system_return.png)
*图：Optuna 论文 Figure 4 的系统设计图；来源为 arXiv HTML 版本。每个 worker 独立执行 objective function，`suggest()`、`report()`、`should_prune()` 和最终 `return()` 都通过共享 storage 读写 study 历史。*

```python
# Optuna define-by-run 与剪枝流程伪代码
import optuna

def objective(trial):
    model_type = trial.suggest_categorical("model", ["mlp", "cnn"])
    lr = trial.suggest_float("lr", 1e-5, 1e-1, log=True)

    if model_type == "mlp":
        n_layers = trial.suggest_int("n_layers", 1, 4)
        hidden = [trial.suggest_int(f"hidden_{i}", 32, 512) for i in range(n_layers)]
        model = build_mlp(hidden, lr)
    else:
        channels = trial.suggest_int("channels", 16, 128)
        kernel = trial.suggest_int("kernel", 3, 7)
        model = build_cnn(channels, kernel, lr)

    for epoch in range(max_epochs):
        train_one_epoch(model)
        valid_loss = evaluate(model)
        trial.report(valid_loss, step=epoch)
        if trial.should_prune():
            raise optuna.TrialPruned()

    return evaluate(model)

study = optuna.create_study(
    direction="minimize",
    sampler=optuna.samplers.TPESampler(),
    pruner=optuna.pruners.SuccessiveHalvingPruner(),
    storage="sqlite:///study.db",
)
study.optimize(objective, n_trials=200, n_jobs=8)
```

Optuna 要解决的第一类问题是静态搜索空间难以表达真实模型配置。以多层 MLP 为例，层数本身是一个超参数，只有确定了 `n_layers` 后，才知道需要采样多少个 `hidden_i`；如果改成 CNN，又会出现 kernel、channels 等完全不同的分支。传统 define-and-run HPO 工具通常要求用户先写出完整的树状空间，复杂模型会变成嵌套很深的配置对象。Optuna 把搜索空间绑定到 `objective(trial)` 的运行过程：执行到哪个分支，就注册和采样哪个超参数，因此搜索空间是由普通 Python 控制流“运行出来”的。

Sampler 的职责是根据历史 trial 选择下一组参数，而不是简单枚举。以 TPE 为例，Optuna 会把历史观测按目标值分成好样本集合与坏样本集合，分别估计条件密度 \(l(x)=p(x \mid y < y^*)\) 和 \(g(x)=p(x \mid y \ge y^*)\)，然后倾向选择使下式更大的候选：

$$
x^* = \arg\max_x \frac{l(x)}{g(x)}
$$

直觉上，\(l(x)\) 高说明这个参数区域常出现在好 trial 中，\(g(x)\) 低说明它不常出现在差 trial 中；二者比值高，就代表候选参数更可能带来改进。Optuna 的贡献不是发明 TPE 本身，而是把 TPE、随机采样、CMA-ES 等策略放进统一 sampler 接口，使用户能在相同 Trial API 下替换优化算法。

Pruner 解决的是资源浪费问题。很多训练任务在早期 epoch 就能看出趋势，如果某个 trial 的验证损失在相同 step 上明显落后，就不必训练到完整预算。Optuna 的 `trial.report(value, step)` 把学习曲线中间值写入 storage，`trial.should_prune()` 再由 pruner 读取同一 study 的历史中间值做决策。Successive Halving/ASHA 类机制可以理解为按资源 \(r, \eta r, \eta^2 r, ...\) 设置多个 rung：trial 只有在当前 rung 的表现排在前 \(1/\eta\) 左右时才晋级到下一档资源。

分布式架构的关键是把 trial 状态外置到 storage，而不是让某个中心进程长期持有所有状态。多个 worker 只要连接到同一个 storage URL，就能异步领取 trial、查询历史、写入中间值和提交结果。由于剪枝和采样都通过 storage 获得可见的 study 历史，worker 之间不需要同步 barrier；慢 trial 不会阻塞快 trial，这也是论文强调异步剪枝适合分布式环境的原因。

与 MLflow/W&B 这类 run-centric 追踪系统相比，Optuna 更主动：它不仅记录“发生了什么”，还决定“下一次该尝试什么”。在真实平台中常见的组合是 Optuna 负责 HPO 决策，训练脚本把 Optuna trial id、参数、指标和模型产物同步写入 MLflow 或 W&B，从而同时获得自动搜索和团队级实验审计。

> 💡 关键：Optuna 的核心抽象是把超参数优化压缩成 `objective(trial) -> value`，再把搜索空间构造、采样、剪枝和分布式状态管理都挂在 Trial/Study 这两个对象上。

#### 🧪 练习题

```yaml
question: "Optuna 的 define-by-run API 相比静态搜索空间声明，最核心的优势是什么？"
options:
  - "搜索空间可以随 objective 的 Python 控制流动态生成，适合条件超参数"
  - "不需要验证集即可优化模型"
  - "所有 trial 都会使用完全相同的参数"
  - "只能在单进程内执行，避免数据库开销"
answer: 0
explain: "define-by-run 让参数声明发生在 objective 执行期间，因此模型分支、层数变化等条件结构能直接用 Python 表达。"
```
