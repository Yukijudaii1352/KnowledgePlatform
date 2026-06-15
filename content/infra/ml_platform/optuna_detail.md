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

Optuna 提出 define-by-run 的超参数优化框架，让搜索空间由普通 Python 控制流动态构造，并结合 pruning 和 sampler 高效探索复杂机器学习实验配置。

#### 🎯 核心要点

- define-by-run API 允许在 objective 执行过程中按条件创建超参数搜索空间
- Study/Trial 抽象记录每次实验参数、指标、中间值和状态
- Sampler 支持 TPE、随机、CMA-ES 等策略，Pruner 可提前停止表现差的 trial
- 支持关系型存储后端与分布式 worker 并行执行
- 与任意训练框架解耦，只要求 objective 返回目标指标

#### 🔬 深入细节

![Optuna 核心示意图](https://optuna.org/assets/img/optuna-logo.png)
*图：官方图标代表 Optuna 框架；方法核心是 study 调度 trial，trial 在 objective 中动态 suggest 参数并上报中间结果。*

```python
# Optuna define-by-run 伪代码
import optuna

def objective(trial):
    lr = trial.suggest_float('lr', 1e-5, 1e-1, log=True)
    depth = trial.suggest_int('depth', 2, 12)
    if trial.suggest_categorical('model', ['mlp', 'cnn']) == 'cnn':
        kernel = trial.suggest_int('kernel', 3, 7)
    score = train_and_validate(lr=lr, depth=depth)
    trial.report(score, step=epoch)
    if trial.should_prune(): raise optuna.TrialPruned()
    return score

study = optuna.create_study(direction='maximize')
study.optimize(objective, n_trials=100)
```

传统超参搜索工具常要求用户预先声明静态搜索空间，但现代模型配置经常有条件结构：选择模型 A 才需要参数 x，选择优化器 B 才需要参数 y。Optuna 的 define-by-run 直接用 Python 表达这种动态性。

Trial 是一次实验运行，`suggest_*` 调用既采样参数也把搜索空间记录下来。Sampler 根据历史 trial 选择下一组参数；TPE 等贝叶斯方法会建模好/坏 trial 的参数分布，从而更集中地探索有希望区域。

Pruner 使用中间指标提前停止明显较差的实验。例如训练到第 5 个 epoch 的验证损失已经远差于历史同阶段结果，就可以释放资源给新 trial。

与 MLflow/W&B 的实验追踪不同，Optuna 的核心是“主动选择下一次实验”。它可以与追踪系统组合：Optuna 决定参数，MLflow/W&B 记录完整产物。

> 💡 关键：这类 ML 平台论文的贡献通常不在单个数学公式，而在把计算、状态、通信、调度和故障边界重新组织成可扩展的系统抽象。

#### 🧪 练习题

```yaml
question: "Optuna define-by-run 的含义是什么？"
options:
  - "搜索空间在 objective 运行时由 Python 控制流动态定义"
  - "只能读取静态 JSON 搜索空间"
  - "每个 trial 必须人工启动"
  - "只能优化一个整数参数"
answer: 0
explain: "define-by-run 让条件搜索空间自然嵌入普通 Python 训练代码。"
```
