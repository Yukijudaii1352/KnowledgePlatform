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

DVC 将 Git 的版本历史扩展到大规模数据集、模型权重和流水线产物：Git 只保存轻量元数据，DVC 用内容哈希、缓存和 remote 存储管理真实文件，从而让代码、数据、参数和模型可以一起回溯与复现。

#### 🎯 核心要点

- `.dvc` 文件与 `dvc.lock` 保存数据/模型对象的哈希、路径、大小和依赖关系，Git 负责版本化这些小文件
- DVC cache 以内容寻址方式保存大文件，避免同一内容在不同实验版本中重复存储
- Remote storage 支持 S3、GCS、Azure Blob、SSH/SFTP、HDFS、本地目录等后端，用 `dvc push/pull` 同步真实数据
- `dvc.yaml` 将数据处理、训练、评估声明为 stage，`deps`、`params`、`outs` 构成可复现 DAG
- `dvc repro` 通过比较依赖哈希和参数值，只重跑受影响的 stage 及其下游节点
- 与 Git branch/tag 组合后，一个 commit 同时锁定代码版本、数据版本、模型版本和流水线状态

#### 🔬 深入细节

![DVC Git、CI/CD 与远程存储工作流](https://storage.ghost.io/c/5f/2f/5f2f4d20-2abf-4534-8d40-7aa233aedd43/content/images/2026/03/dvc02.png)
*图：DevOpsCube DVC 教程中的工作流图；它展示 GitHub/CI/CD 读取仓库元文件后执行 `dvc pull` 获取 S3 数据、处理后再 `dvc push` 上传版本化数据。DVC 官方文档同样强调 Git 保存 `.dvc`/`dvc.yaml`/`dvc.lock`，remote storage 保存真实数据与模型对象。*

```bash
# DVC 数据版本控制与流水线复现伪代码
git init
dvc init

# 1. 追踪大数据，但只把指针文件提交给 Git
dvc add data/raw
git add data/raw.dvc data/.gitignore
git commit -m "track raw data with DVC"

# 2. 配置并上传真实对象
dvc remote add -d storage s3://ml-bucket/project-cache
dvc push
git push

# 3. 声明可复现训练流水线
cat > dvc.yaml <<'YAML'
stages:
  featurize:
    cmd: python src/featurize.py --in data/raw --out data/features
    deps:
      - src/featurize.py
      - data/raw
    outs:
      - data/features
  train:
    cmd: python src/train.py --features data/features --params params.yaml
    deps:
      - src/train.py
      - data/features
    params:
      - train.lr
      - train.epochs
    outs:
      - models/model.pkl
    metrics:
      - metrics.json
YAML

dvc repro     # 只重跑 hash 或 params 变化影响到的 stage
dvc metrics diff
```

DVC 的核心问题来自 Git 与机器学习产物之间的尺度错配。Git 很适合文本代码和小配置文件，却不适合频繁提交 GB/TB 级数据、特征表、checkpoint 或模型包。只保存代码又会丢失关键上下文：同一个 `train.py` 在不同数据快照和不同 `params.yaml` 下会得到完全不同的模型。DVC 的做法是把“可版本化的引用”放进 Git，把“昂贵的大对象”放进 DVC cache/remote，从而避免 Git 仓库膨胀，同时保留版本历史。

内容寻址是 DVC 数据层的关键机制。对一个文件或目录，DVC 计算内容哈希并把对象放到 cache 中，元文件只记录对象 ID 与工作区路径。可以把它抽象为：

$$
oid = H(\mathrm{bytes}(path)), \qquad metadata = \{path, oid, size, nfiles\}
$$

当用户切换 Git commit 后，`.dvc` 文件或 `dvc.lock` 中的 `oid` 也随之改变；`dvc checkout` 根据当前 Git 版本里的元数据，把 cache 中对应内容链接或复制回 workspace；如果本地 cache 没有，`dvc pull` 会先从 remote 下载。这样，Git commit 不直接包含大文件，却能精确指向某一版大文件。

Pipeline 层把 DVC 从“数据指针工具”提升为“可复现实验构建系统”。`dvc.yaml` 中每个 stage 都是一个节点，`deps` 和 `outs` 形成有向无环图。DVC 不依赖文件时间戳，而是比较依赖内容和参数记录；一个 stage 是否需要重跑，可简化为：

$$
dirty(s) =
\exists d \in deps(s): H(d) \ne lock_s(d)
\;\lor\;
\exists p \in params(s): value(p) \ne lock_s(p)
\;\lor\;
missing(outs(s))
$$

如果 `dirty(featurize)=true`，那么使用 `data/features` 的 `train` 也会被标记为下游受影响节点；如果只改了 `train.lr`，上游特征工程不会重跑。相比 `make` 这类通用构建工具，DVC 的差异在于它内建大文件 hash、参数粒度依赖、metrics/plots 对比和 remote cache 同步，直接服务于 ML 工作流。

Remote storage 承担团队协作和 CI/CD 的数据面。一个开发者执行 `dvc push` 后，真实数据对象进入 S3/GCS/SSH 等后端；另一个开发者或训练节点先 `git clone` 获取代码与元文件，再 `dvc pull` 拉取匹配当前 commit 的数据。此时 `git checkout experiment-a && dvc checkout` 与 `git checkout experiment-b && dvc checkout` 会得到不同的数据/模型工作区，但仓库路径可以保持稳定，例如始终是 `data/raw` 和 `models/model.pkl`。

与 MLflow 的 run 记录相比，DVC 更偏 repository-centric：它将实验可复现性绑定到 Git 历史，而不是只在外部服务中保存一次 run 的日志。与 W&B Artifacts 相比，DVC 更强调本地优先、命令行和 GitOps 工作流；与对象存储裸用相比，DVC 增加了哈希校验、去重、依赖图和版本指针。实际工程中经常把 DVC 用作数据/模型版本基座，再用 MLflow 或 W&B 做指标看板和团队报告。

> 💡 关键：DVC 不试图替代 Git，而是把 Git commit 变成“代码 + 数据指针 + 流水线锁文件”的统一索引，真实大对象由 DVC cache 和 remote 存储承载。

#### 🧪 练习题

```yaml
question: "DVC 为什么通常只把 `.dvc`、`dvc.yaml` 和 `dvc.lock` 提交到 Git，而不把大数据文件直接提交到 Git？"
options:
  - "这些元文件记录大对象哈希和依赖，真实数据放在 DVC cache/remote 中，能避免 Git 仓库膨胀并保持可复现"
  - "DVC 不能处理二进制文件"
  - "Git 不能管理任何文本文件"
  - "DVC 只用于可视化实验曲线，不负责数据版本"
answer: 0
explain: "DVC 让 Git 管理轻量指针和锁文件，大文件由内容寻址 cache 与 remote 存储管理，因此既节省仓库空间，又能通过哈希恢复精确版本。"
```
