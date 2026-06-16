### Weights & Biases

```yaml
id: wandb
name: "W&B"
full_name: Weights & Biases
year: "2020"
org: W&B Inc.
paper_url: https://wandb.ai/
category: experiment_mgmt
parent: mlflow
motivation: 云端协作式实验看板，强化团队开发效率
```

#### 📝 一句话总结

Weights & Biases 将训练脚本中的配置、指标、媒体、系统资源和模型/数据产物统一记录为云端可协作的 run 与 artifact 图谱，解决团队难以比较实验、复现模型来源和共享分析结论的问题。

#### 🎯 核心要点

- Run 是最小实验单元，记录 config、metric history、summary、stdout、代码状态、系统资源和产物引用
- Dashboard/Workspace 支持跨 run 对比曲线、筛选超参数、分组实验和协作查看训练状态
- Artifacts 对数据集、模型、评估结果等文件资产做版本化，并通过 `use_artifact()`/`log_artifact()` 建立 lineage DAG
- Tables/Media 支持图像、音频、文本、分割 mask、预测样本等多模态结果的样本级分析
- Sweeps 通过 agent 调度随机、网格或贝叶斯超参搜索，并把每次试验自动记录为普通 run
- Reports/Registry/Automations 将实验看板扩展为团队复盘、模型发布和下游流程触发机制

#### 🔬 深入细节

![W&B 实验 dashboard](https://mintcdn.com/wb-21fd5541/88iR80mZ8tuFCZUU/images/experiments/experiments_landing_page.png?fit=max&auto=format&n=88iR80mZ8tuFCZUU&q=85&s=3250a01d7dd14400455474aee6818e30)
*图：W&B 官方 Experiments 文档中的 dashboard 示例。训练代码通过 SDK 上报 run 数据，云端 workspace 将多个 run 的指标、配置和产物集中展示，供团队比较与协作分析。*

```python
# W&B 实验追踪、artifact lineage 与 sweep agent 的核心伪代码
import wandb

def train():
    with wandb.init(project="vision-models", job_type="train") as run:
        cfg = run.config
        dataset = run.use_artifact("tiles-dataset:latest")
        data_dir = dataset.download()

        model = build_model(lr=cfg.lr, depth=cfg.depth)
        for step, batch in enumerate(loader(data_dir)):
            loss, acc, samples = train_step(model, batch)
            run.log({
                "loss": loss,
                "accuracy": acc,
                "examples": wandb.Table(data=samples, columns=["image", "pred", "label"]),
            }, step=step)

        model_artifact = wandb.Artifact("classifier", type="model")
        model_artifact.add_file("checkpoints/best.pt")
        run.log_artifact(model_artifact, aliases=["latest", f"acc-{acc:.3f}"])

sweep_config = {
    "method": "bayes",
    "metric": {"name": "accuracy", "goal": "maximize"},
    "parameters": {
        "lr": {"min": 1e-5, "max": 1e-2},
        "depth": {"values": [18, 34, 50]},
    },
}
sweep_id = wandb.sweep(sweep_config, project="vision-models")
wandb.agent(sweep_id, function=train, count=50)
```

W&B 的设计动机是把实验从本地日志文件提升为团队共享的结构化数据库。一次 run 可以抽象为：

$$
R = (config, history, summary, files, artifacts, media, system, code)
$$

其中 `history` 是按 step 追加的指标序列，`summary` 是最终或聚合后的关键值，`config` 保存超参数和运行配置，`system` 记录 GPU/CPU/内存等资源曲线。Dashboard 的曲线对比、平行坐标图和筛选器，本质上都是在这些结构化字段上做查询和聚合，而不是事后解析散落在机器上的日志文本。

Artifact 机制补上了“指标好看但模型从哪来”的缺口。一个训练 run 可以声明自己使用了 `dataset:v3`，并输出 `classifier:v7`；评估 run 再使用 `classifier:v7` 和 `test-set:v2` 生成 `eval-report:v1`。W&B 将这些关系表示为有向无环图：

$$
G = (V_{run} \cup V_{artifact}, E_{use} \cup E_{log})
$$

边 \(E_{use}\) 表示 run 消费某个 artifact，边 \(E_{log}\) 表示 run 产出某个 artifact。这个图让团队能够沿 lineage 反查模型的训练数据、代码运行、评估文件和下游消费者；alias 如 `latest`、`best` 则提供人类可读的版本入口，但底层版本仍是不可混淆的 artifact revision。

Tables/Media 让实验追踪不止停留在标量曲线。对于计算机视觉，用户可以把输入图像、预测 mask、置信度、真实标签放在同一行；对于 NLP，可以记录 prompt、completion、评分和错误类别。这样，团队不仅能看到 `accuracy` 从 0.82 到 0.86，还能查询“哪些类别仍被误判”“某次模型是否在低光照样本上退化”。这类样本级分析是纯 TensorBoard 曲线或 CSV 指标很难覆盖的。

Sweeps 把超参搜索调度和实验追踪合在一起。用户声明搜索空间、优化指标和方法后，agent 从 W&B 后端领取下一组参数并启动普通训练函数；每一次候选配置仍然是完整 run，所以 dashboard、artifacts、tables 和 reports 都能复用。若使用贝叶斯搜索，系统会根据已完成 run 的目标指标更新候选分布；若使用 grid/random，则重点是并行调度与结果聚合。

与 MLflow 相比，W&B 更偏在线协作和交互式可视化，尤其强化 workspace、reports、tables 和 artifact lineage；与 DVC 相比，W&B 的 artifact 更贴近云端 run 图谱，而不是 Git commit 驱动的本地版本控制；与 Optuna 相比，W&B Sweeps 可以做 HPO，但它的核心价值仍是把大量训练运行组织成可查询、可讨论、可复用的团队知识库。

> 💡 关键：W&B 的工程贡献在于把训练过程标准化为 run 事件流，并把文件资产标准化为 artifact DAG；这两个结构让实验比较、模型溯源和团队协作可以发生在同一个系统里。

#### 🧪 练习题

```yaml
question: "W&B Artifacts 的 lineage 图主要回答哪类问题？"
options:
  - "某个模型版本由哪些数据、代码运行和上游产物生成，又被哪些下游 run 使用"
  - "如何替代 GPU 驱动并提升显存容量"
  - "如何把所有训练脚本自动改写成 C++"
  - "如何让每个 run 使用完全相同的随机种子"
answer: 0
explain: "Artifacts 通过 use/log 关系把 run 与数据、模型、评估文件连接成 DAG，便于复现、审计和团队协作。"
```
