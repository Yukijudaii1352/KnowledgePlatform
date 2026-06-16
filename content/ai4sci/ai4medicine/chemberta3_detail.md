### ChemBERTa-3 — 化学BERT第三代 (ChemBERTa-3)

```yaml
id: chemberta3
name: ChemBERTa-3
full_name: 化学BERT第三代 (ChemBERTa-3)
year: '2026'
org: Open Source
paper_url: https://github.com/seyonechithrananda/bert-loves-chemistry
category: foundation
parent: chemberta
motivation: 开源大规模化学基础模型框架
```

#### 📝 一句话总结

ChemBERTa-3 不是单一模型结构，而是一个集成 DeepChem、Ray、Hugging Face 和 MoleculeNet 的开源训练/微调/评测框架，解决化学基础模型难以复现、难以公平 benchmark、难以扩展到大规模预训练的问题。它用统一流水线训练并发布 c3-MoLFormer、ChemBERTa 等模型，强调开放权重、配置、数据拆分和部署流程。

#### 🎯 核心要点

- **框架贡献为主**：提供可复现的预训练、微调和 MoleculeNet benchmark 基础设施，而非只报告一个新网络
- **DeepChem 集成**：新增 ModularTorchModel，用模块化方式组合 tokenizer/featurizer、encoder、pretraining head 和 finetuning head
- **分布式训练**：用 Ray Dataset 与 Ray Train/Distributed Data Parallel 支持多 GPU、多节点数据并行训练
- **模型覆盖面广**：统一评测 RF、GCN、D-MPNN、InfoGraph、InfoMax3D、GROVER、ChemBERTa、MoLFormer 等架构
- **预训练数据**：框架围绕 ZINC20、PubChem 等大规模 SMILES 数据构建预训练集，微调使用 MoleculeNet 任务
- **开放模型**：官方仓库展示释放 c3-MoLFormer-1.1B、c3-MoLFormer-550M、c3-MoLFormer-100M 和 ChemBERTa-100M 等检查点
- **标准化 scaffold split**：指出 MoLFormer 既有论文的 scaffold split 与 DeepChem/MoleculeNet 实现不完全等价，导致历史横向比较存在偏差
- **可迁移部署**：论文在 AWS Ray 部署和本地 HPC 集群上测试训练，验证同一框架可跨云端和超算环境复现
- **工程经验沉淀**：讨论训练不稳定、超参搜索、数据加载、spot instance checkpoint 等实际构建化学基础模型时的关键细节

#### 🔬 深入细节

##### 核心示意图

![ChemBERTa-3 框架图](https://github.com/deepforestsci/chemberta3/raw/main/results/images/Overview_chemberta3.png)
*图：ChemBERTa-3 官方仓库中的框架总览。上方是预训练与微调数据，中间是 DeepChem 扩展和 Ray 分布式训练，右侧是 benchmark 统计发现与开放模型发布。*

##### 算法伪代码

```python
# ChemBERTa-3 训练与评测流水线伪代码
def chemberta3_pipeline(config):
    # 1. 构建预训练数据
    smiles = load_smiles_sources(["ZINC20", "PubChem"])
    ray_dataset = RayDeepChemDataset(smiles)
    tokens_or_graphs = ray_dataset.map_batches(config.featurizer_or_tokenizer)

    # 2. 选择模型与预训练目标
    model = ModularTorchModel(
        encoder=config.encoder,              # ChemBERTa / MoLFormer / GROVER / InfoGraph ...
        pretraining_head=config.pretrain_head,
        finetuning_head=None,
    )

    # 3. Ray + DDP 预训练
    for batch in distributed_iterbatches(tokens_or_graphs):
        outputs = model(batch)
        loss = pretraining_loss(outputs, batch, objective=config.objective)
        loss.backward()
        ddp_allreduce_gradients(model)
        optimizer.step()
        checkpoint_if_needed(model)

    # 4. 标准化 MoleculeNet 微调
    results = {}
    for task in moleculenet_tasks:
        train, valid, test = deepchem_scaffold_split(task)
        best = grid_search_finetune(
            pretrained_model=model,
            train=train,
            valid=valid,
            lr=[1e-4, 3e-5, 1e-6],
            batch_size=[16, 32, 64, 128],
            epochs=[50, 100, 150, 200, 500],
        )
        results[task.name] = evaluate(best, test, metric=task.metric)

    return results
```

##### 从 ChemBERTa 到 ChemBERTa-3：任务从“训练一个模型”变成“复现整个生态”

ChemBERTa 和 ChemBERTa-2 的核心问题是：能否把 SMILES 当作化学语言，用 RoBERTa/BERT 风格的编码器通过 MLM 或 MTR 预训练，再迁移到 MoleculeNet 性质预测。ChemBERTa-3 的问题更工程化：当领域进入大模型阶段，单篇论文给出一个分数已经不够，社区需要可复现的数据处理、预训练脚本、微调拆分、超参搜索、分布式部署和可下载权重。

因此 ChemBERTa-3 的主要贡献是框架化。论文正式发表在 RSC Digital Discovery；任务 YAML 中的 `paper_url` 指向早期 ChemBERTa 原始仓库，本文实际追溯使用了 ChemBERTa-3 官方仓库、RSC 论文页和 ChemRxiv 论文全文。这个来源差异很重要，因为 ChemBERTa-3 的方法重点已从“BERT loves chemistry”扩展为“开源化学基础模型训练基建”。

##### ModularTorchModel：把预训练和微调拆成可组合模块

传统 DeepChem `TorchModel` 更适合端到端监督任务，loss 通常从最终输出计算。ChemBERTa-3 引入 `ModularTorchModel`，允许从模型中间值计算 loss，因此同一个 encoder 可以挂不同的预训练头和微调头。例如 ChemBERTa/MoLFormer 使用 SMILES tokenizer 和 MLM head；InfoGraph 用图级与子结构表示的互信息目标；InfoMax3D 需要 2D 图和 3D 构象之间的互信息目标；GROVER 则使用图 transformer 的自监督消息传递任务。

对于 MLM，给定 SMILES token 序列 \(\mathbf{x}\) 和 mask 集合 \(\mathcal{M}\)，预训练目标是：

$$
\mathcal{L}_{\mathrm{MLM}}
=-\sum_{t\in\mathcal{M}}\log p_\theta(x_t\mid \mathbf{x}_{\setminus\mathcal{M}})
$$

对于多任务回归类化学描述符目标，可以写成：

$$
\mathcal{L}_{\mathrm{MTR}}
=\frac{1}{K}\sum_{k=1}^{K}(\hat y_k-y_k)^2
$$

对于二分类或多标签 MoleculeNet 下游任务，微调 head 常用 BCE；对于回归任务使用 MSE/RMSE 选择模型：

$$
\mathcal{L}_{\mathrm{BCE}}
=-\frac{1}{K}\sum_{k=1}^{K}
\left[y_k\log \hat y_k+(1-y_k)\log(1-\hat y_k)\right]
$$

> 💡 关键：ChemBERTa-3 的“算法”更像一套标准化训练协议。它让不同模型在同一数据拆分、同一 DeepChem API 和同一微调流程中比较，从而减少论文间 benchmark 不一致导致的假优势。

##### Ray + DeepChem：面向十亿级分子数据的训练流

ChemBERTa-3 把 Ray Dataset 包装成 DeepChem Dataset 的子类，使大规模 SMILES 数据可以继续使用 DeepChem 的 featurizer、`iterbatches()` 和模型 API。数据可以被分块 featurize 并保存为 NPZ，再由 Ray workers 并行读取。训练时，每个 DDP 进程持有一份模型副本，独立前向和反向传播；反向传播触发梯度同步后，各副本执行一致的参数更新：

$$
\nabla_\theta
=\frac{1}{W}\sum_{w=1}^{W}\nabla_\theta^{(w)}
$$

其中 \(W\) 是 worker 数。这个设计的直接收益是：同一份训练脚本能在 AWS spot instances 上运行，也能在本地 HPC 集群运行。论文报告本地 HPC 使用多节点多 GPU 环境做了重复训练，用于评估训练方差；AWS 侧则强调频繁 checkpoint 以对冲 spot instance 被回收的风险。

##### Benchmark：公平拆分比模型名字更重要

ChemBERTa-3 反复强调 scaffold split。分子性质预测中，随机拆分会让训练集和测试集共享相似骨架，容易高估泛化；scaffold split 按 Bemis-Murcko 骨架拆分，更接近药物发现中“新骨架外推”的难度。论文指出，既有 MoLFormer 结果与 ChemBERTa/ChemBERTa-2 的比较中，scaffold split 实现并不完全一致，因此历史分数不能直接横向相减。

框架的微调流程使用 MoleculeNet 任务，常见分类任务包括 BACE、BBBP、Tox21、HIV、SIDER、ClinTox，回归任务包括 ESOL、FreeSolv、Lipo 等。论文附录列出超参搜索空间，例如学习率、batch size 和 epoch 数，并用验证集选择最优模型。对 c3-MoLFormer，论文表格报告了 BBBP 约 0.900 ROC-AUC、Tox21 约 0.830 ROC-AUC、ESOL 约 0.651 RMSE、Lipo 约 0.556 RMSE 等代表性结果；这些结果的意义在于展示框架可训练和可复现，而不是宣称所有任务都绝对压倒图模型。

##### 与传统化学模型开发方式的区别

传统分子机器学习项目常把数据准备、模型定义、训练脚本、评测脚本和拆分逻辑写成项目私有代码，导致论文复现者很难判断性能差异来自模型、数据清洗、拆分还是调参。ChemBERTa-3 把这些易错环节显式纳入框架，并发布权重、配置和部署工作流，使研究者可以替换其中一个模块，例如换 tokenizer、换 encoder 或换预训练目标，而其他部分保持不变。

这种设计也给出了一个实际判断：小规模时，图模型和 Transformer 都能达到有竞争力的分数；但当数据和训练规模扩大，SMILES Transformer 在工程上更容易扩展。论文没有否认图模型的化学归纳偏置，而是指出图预训练若要追上大规模语言模型式训练，也需要同等成熟的分布式和 benchmark 基础设施。

#### 🧪 练习题

```yaml
question: "ChemBERTa-3 最核心的贡献是什么？"
options:
  - "提出一种新的化学键类型编码，替代所有图神经网络"
  - "提供统一开源的化学基础模型预训练、微调、分布式训练和标准化 benchmark 框架"
  - "证明随机拆分一定比 scaffold split 更适合药物发现"
  - "只发布一个闭源的 MoLFormer 权重"
answer: 1
explain: "ChemBERTa-3 的重点是可复现基础设施：DeepChem 模块化模型、Ray 分布式训练、MoleculeNet 标准化评测和开放模型/配置，而不是单个新网络结构。"
```
