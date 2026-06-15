### DVC

```yaml
id: dvc
name: DVC
full_name: DVC数据版本控制 (DVC)
year: "2020"
org: Iterative.ai
paper_url: https://dvc.org/
category: experiment_mgmt
parent: mlflow
motivation: 将Git版本控制引入数据集与模型文件管理
```

#### 📝 一句话总结

DVC 将 Git 风格版本控制扩展到数据集、模型和流水线产物，通过轻量元文件追踪大文件哈希与远程对象存储，解决 ML 项目中代码、数据和模型版本难以对齐的问题。

#### 🎯 核心要点

- 用 .dvc 文件或 dvc.yaml 记录大文件/目录的 hash、路径和依赖，而非把大文件直接放入 Git
- 远程存储可接 S3、GCS、Azure、SSH、本地 NAS 等对象/文件系统
- pipeline stage 声明 deps、outs、params 和 cmd，支持基于依赖 hash 的增量复现
- `dvc repro` 根据 DAG 判断哪些阶段需要重跑，`dvc metrics/plots` 支持结果比较
- 与 Git 分支/tag 组合，使代码版本和数据/模型版本可共同回溯

#### 🔬 深入细节

![DVC 核心示意图](https://dvc.org/img/flow.gif)
*图：官方动图展示 DVC 工作流：Git 管理代码和元文件，DVC remote 管理大数据/模型对象，两者共同复现实验。*

```python
# DVC 数据与流水线伪代码
$ git add train.py params.yaml
$ dvc add data/raw
$ git add data/raw.dvc .gitignore
$ dvc remote add -d storage s3://bucket/project
$ dvc push

# dvc.yaml stage
stages:
  train:
    cmd: python train.py --config params.yaml
    deps: [train.py, data/raw]
    params: [train.lr, train.epochs]
    outs: [models/model.pkl]
    metrics: [metrics.json]
```

Git 擅长版本化文本代码，但不适合直接存储 GB/TB 级数据集和模型权重。ML 项目如果只提交代码，几周后常常无法知道当时训练使用的是哪版数据、哪些预处理产物和哪个模型文件。

DVC 的基本做法是内容寻址。大文件进入 DVC cache/remote，Git 中只保存包含 hash 的小元文件；切换 Git commit 后，`dvc pull` 可根据元文件取回对应数据版本。

Pipeline 让数据处理和训练步骤形成 DAG。每个 stage 声明依赖和输出，DVC 通过 hash 判断某个输入是否变化，只重跑受影响的下游阶段。

与 MLflow 的 run-centric 追踪不同，DVC 更偏 repository-centric：它把数据、模型和流水线状态绑定到 Git 历史，适合需要严格复现和协作的数据工程流程。

> 💡 关键：这类 ML 平台论文的贡献通常不在单个数学公式，而在把计算、状态、通信、调度和故障边界重新组织成可扩展的系统抽象。

#### 🧪 练习题

```yaml
question: "DVC 为什么不直接把大数据文件提交到 Git？"
options:
  - "Git 不适合管理大二进制对象，DVC 用哈希元文件加远程存储追踪它们"
  - "DVC 只能处理文本文件"
  - "DVC 不支持远程存储"
  - "Git 不能保存代码"
answer: 0
explain: "DVC 让 Git 保存轻量元信息，大文件放在 DVC cache/remote 中。"
```
