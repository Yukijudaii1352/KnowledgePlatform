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

Weights & Biases 提供云端协作式实验追踪与模型开发平台，通过统一记录 metrics、configs、artifacts、tables 和 reports，提升团队对训练过程、结果和模型资产的可观测性。

#### 🎯 核心要点

- Run 记录训练配置、指标曲线、日志、环境、代码版本和系统资源
- Artifacts 对数据集、模型和中间产物做版本化，并记录 lineage
- Sweeps 提供分布式超参搜索调度，Reports 支持团队复盘和共享结果
- Tables/Media 支持样本级预测、图像、音频、文本等多模态可视化分析
- 与 PyTorch、TensorFlow、Keras、Hugging Face 等训练栈低侵入集成

#### 🔬 深入细节

> 图示说明：官方产品页核心界面是实验 dashboard：训练脚本通过 SDK 上报 run 数据，云端按 project 汇总曲线、表格、artifacts 和 reports，供团队协作分析。

```python
# W&B 实验追踪伪代码
import wandb
run = wandb.init(project='llm-pretrain', config={'lr': 3e-4, 'bs': 128})
for step, batch in enumerate(loader):
    loss, acc = train_step(batch)
    wandb.log({'loss': loss, 'acc': acc, 'lr': scheduler.lr}, step=step)

artifact = wandb.Artifact('model', type='checkpoint')
artifact.add_file('ckpt.pt')
run.log_artifact(artifact)
run.finish()
```

ML 团队的实验数量增长很快，仅靠终端日志和本地 TensorBoard 难以比较跨机器、跨成员、跨分支的结果。W&B 的核心价值是把训练过程变成团队共享的结构化记录。

Run 是最小追踪单位，包含 config、metrics、summary、stdout、代码状态和系统监控。用户可以按 tag、group、job type 组织运行，用 dashboard 比较曲线和超参数影响。

Artifacts 将模型、数据和评估文件版本化，并记录哪个 run 产生、哪个 run 消费，从而形成 lineage。这弥补了纯指标追踪无法回答“这个模型来自哪版数据”的问题。

与 DVC 相比，W&B 更偏在线协作和可视化；与 Optuna 相比，它不一定负责采样搜索策略，但 Sweeps 可以提供基础 HPO 调度。三者常在实际项目中互补。

> 💡 关键：这类 ML 平台论文的贡献通常不在单个数学公式，而在把计算、状态、通信、调度和故障边界重新组织成可扩展的系统抽象。

#### 🧪 练习题

```yaml
question: "W&B Artifacts 主要解决什么问题？"
options:
  - "对数据集、模型和产物进行版本化并记录 lineage"
  - "替代 GPU 驱动"
  - "自动写论文"
  - "压缩 Python 代码"
answer: 0
explain: "Artifacts 将 run 产生和消费的文件资产纳入可追踪版本链。"
```
