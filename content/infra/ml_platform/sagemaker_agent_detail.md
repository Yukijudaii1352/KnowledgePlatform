### SageMaker AI Agent

```yaml
id: sagemaker_agent
name: SageMaker AI Agent
full_name: SageMaker AI Agent
year: '2026'
org: AWS
paper_url: https://aws.amazon.com/sagemaker/
category: experiment_mgmt
parent: wandb
motivation: 智能代理自动完成数据准备到微调策略选择
```

#### 📝 一句话总结

SageMaker AI Agent 把模型定制中的需求澄清、数据转换、微调策略选择、训练、评估和部署封装为 agent-guided workflow，解决企业从自然语言需求到可运行 SageMaker 训练/部署代码之间依赖人工专家编排的问题。

#### 🎯 核心要点

- Agent-guided workflow：用户用自然语言描述场景，Kiro、Claude Code、Cursor 等 coding agent 在 SageMaker AI Skills 指导下生成可编辑 notebook/代码
- 九类模型定制 Skills：覆盖 use case specification、planning、fine-tuning setup、dataset evaluation/transformation、fine-tuning、model evaluation、deployment 等生命周期阶段
- 训练策略推荐：根据任务和数据在 SFT、DPO、RLVR 等定制技术之间选择，并生成 SageMaker AI serverless fine-tuning 作业
- 数据到评估闭环：自动检查数据 schema/格式，转换到目标模型所需格式，并用 LLM-as-a-Judge 或任务指标比较 base model 与 fine-tuned model
- IDE 与协议集成：SageMaker Studio JupyterLab 内置 Kiro，并支持 Agent Communication Protocol 兼容 agent；Skills 也可通过 AWSLabs agent plugin 在本地 IDE/CLI 使用
- AWS API 编排：agent 生成的代码负责调用 SageMaker AI、S3、MLflow Apps、MCP tools、SageMaker endpoint 或 Bedrock Custom Model Import

#### 🔬 深入细节

![SageMaker AI agent-guided model customization](https://d2908q01vomqb2.cloudfront.net/f1f836cb4ea6efb2a0b1b99f41ad8b103eff4b59/2026/05/04/ml-20721.png)
*图：AWS Machine Learning Blog 的 SageMaker AI agent-guided model customization 配图，来源为 AWS 官方 CloudFront 图片。*

```python
# SageMaker AI Agent-guided model customization 伪代码
def customize_model_with_agent(user_prompt, data_uri, target_env):
    context = {
        "request": user_prompt,
        "data": data_uri,
        "deployment_target": target_env,
    }

    plan = skills["planning"].run(context)
    use_case = skills["use_case_specification"].run(context, plan)
    data_report = skills["dataset_evaluation"].run(data_uri, use_case)
    transformed = skills["dataset_transformation"].run(data_uri, data_report)

    train_cfg = skills["fine_tuning_setup"].select(
        use_case=use_case,
        dataset=transformed,
        candidates=["SFT", "DPO", "RLVR"],
    )
    training_job = sagemaker_ai.start_serverless_fine_tuning(train_cfg)

    eval_report = skills["model_evaluation"].compare(
        base_model=train_cfg.base_model,
        tuned_model=training_job.model_artifact,
        metrics=use_case.success_criteria,
    )
    if eval_report.passes_gate:
        return skills["deployment"].deploy(training_job.model_artifact, target_env)
    return {"status": "blocked", "reason": eval_report.failure_summary}
```

SageMaker AI Agent 不是一个单独的训练算法，而是把模型定制流程拆成可被 coding agent 调用的专家技能集合。AWS 官方文档把这些 Skills 定义为面向 IDE 或命令行 coding assistant 的指令/工作流模块，用来编排 use case specification、planning、dataset transformation、customization technique selection、fine-tuning、model evaluation 和 deployment。用户输入的自然语言并不直接变成一个黑盒作业，而是先被 agent 转换为可审阅计划，再生成 notebook 与 SageMaker API 调用代码。

核心机制可以理解为“技能选择 + 可执行代码生成”。给定用户请求 \(x\)、数据摘要 \(d\)、目标约束 \(c\)，agent 需要选择一组技能序列 \(\pi\) 并输出可运行 artifact：

$$
\pi^* = \arg\max_{\pi} \; U(\mathrm{quality}, \mathrm{cost}, \mathrm{latency}, \mathrm{governance} \mid x,d,c)
$$

这个公式不是 AWS 文档中的显式目标函数，而是对 workflow 的机制化抽象：agent 在任务质量、训练成本、上线延迟和治理要求之间做规划。与通用聊天助手不同，SageMaker AI Skills 把 AWS API、数据格式、权限、S3、MLflow Apps、SageMaker endpoint 和 Bedrock 导入路径等领域知识放进 agent 上下文，降低了“回答看似正确但无法运行”的概率。

微调策略选择是最关键的决策点。SFT 适合有高质量示范答案的数据；DPO 适合偏好对比数据；RLVR 则适合答案可以由规则、程序或 verifier 自动给出奖励的任务。agent 的价值在于先检查数据是否支持这些方法，例如是否有 prompt/response、chosen/rejected pair、verifiable reward function 或评估集，再生成相应 serverless training job。对用户来说，差异不是“点一个训练按钮”，而是把数据准备、训练脚本、指标记录和错误处理都写成可复用代码。

训练与评估阶段形成实验管理闭环。AWS 博客示例中，agent 会生成使用 SageMaker AI serverless training job 的 notebook，并把训练/验证指标分发到 SageMaker AI MLflow Apps。评估 Skill 会按 use case 推荐指标，比较 base model 与 fine-tuned model，只有通过阈值或人工审阅条件才进入 deployment Skill。这与 W&B/MLflow 的关系更像互补：W&B/MLflow 侧重记录和可视化，SageMaker AI Agent 侧重生成并执行 AWS 上的工作流，同时把指标和 artifact 接入实验追踪。

部署阶段体现“agent 生成代码而非替用户隐藏代码”的设计。agent 可以根据延迟、扩缩容和集成要求，在 SageMaker AI endpoint 与 Bedrock Custom Model Import 等路径之间选择，并生成 endpoint provisioning、sample inference 和清理资源的代码。由于 notebook 可编辑，团队可以加入自己的 IAM、VPC、模型注册、审批和成本限制，从而把一次性的对话操作固化为组织内可复用流程。

> 💡 关键：SageMaker AI Agent 的贡献在于把模型定制的专家决策转化为可审阅、可执行、可追踪的 AWS 工作流，而不是只提供一个新的 UI 或单点微调 API。

#### 🧪 练习题

```yaml
question: "SageMaker AI Agent-guided workflow 与普通实验追踪工具的主要区别是什么？"
options:
  - "它只记录 loss 曲线，不负责生成训练代码"
  - "它通过 Skills 指导 coding agent 生成并编排数据、训练、评估和部署代码"
  - "它只能运行本地 CPU 训练，不能调用云端服务"
  - "它要求用户手写所有 SageMaker API 调用"
answer: 1
explain: "SageMaker AI Agent 的核心是用领域 Skills 让 coding agent 生成可执行 SageMaker 工作流；实验追踪只是闭环中的一部分。"
```
