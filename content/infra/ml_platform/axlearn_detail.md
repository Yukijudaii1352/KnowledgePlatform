### AXLearn

```yaml
id: axlearn
name: AXLearn
full_name: AXLearn
year: '2026'
org: Apple
paper_url: https://mlsys.org/Conferences/2026/Schedule?type=Poster
category: training_platform
parent: pytorch
motivation: 模块化、硬件无关训练平台
```

#### 📝 一句话总结

AXLearn 提出模块化、硬件无关的大模型训练平台，用严格封装的层级配置、JAX/XLA/GSPMD 编译栈和云无关运行时，解决大模型团队在模型变体、硬件后端和生产训练运维之间反复改代码的问题。

#### 🎯 核心要点

- 以严格封装的 `Module + Config` 体系替代继承式扩展，让 MoE、RoPE、FlashAttention、量化等功能可以作为可组合模块注入
- 提出 LoC-complexity 度量，用“新增功能随模块数增长需要改多少现有代码”衡量训练框架可扩展性
- AXLearn Composer 将 Python 层级配置物化为 JAX 程序，并注入 mesh、sharding、attention kernel、rematerialization 和编译选项
- AXLearn Runtime 负责分布式作业编排、checkpoint、监控、故障恢复、SDC/hang 检测以及多云环境下的弹性运行
- 通过 mesh rules 为 GPU、TPU、AWS Trainium/Trainium2 等不同后端选择不同并行、精度、内存和 kernel 策略
- 支持 AOT 编译分析，在大规模运行前本地检查 OOM、FLOPs、sharding 和编译错误
- 官方论文/项目资料显示 AXLearn 可训练数百亿到数千亿参数模型，并在 TPU/GPU/Trainium 后端保持接近主流训练系统的性能

#### 🔬 深入细节

![AXLearn 系统架构图](https://arxiv.org/html/2507.05411v1/x2.png)
*图：来自 AXLearn 论文 Figure 2，蓝色部分为 AXLearn；用户配置经 Composer 转换为 JAX/XLA 程序，再由 Runtime 在 Kubernetes/云硬件上编排执行。*

![AXLearn invocation context](https://arxiv.org/html/2507.05411v1/extracted/6594419/figures/context.png)
*图：来自 AXLearn 论文的 invocation context 示例，展示模块调用过程中如何集中管理随机数、状态和输出集合，避免子模块私自穿透封装。*

```python
# AXLearn 配置组合、硬件适配与训练执行伪代码
def build_axlearn_job(target_hardware: str):
    cfg = Trainer.default_config()
    cfg.model = DecoderOnlyTransformer.default_config()
    cfg.input = TextInput.default_config()
    cfg.learner = AdamW.default_config()

    # 功能通过 config tree 注入，而不是修改 Transformer/Trainer 的现有接口。
    cfg = replace_submodules(cfg, old=FeedForwardLayer, new=MoELayer.default_config())
    cfg = attach_rope(cfg, target=AttentionLayer, rope=RoPE.default_config())

    # mesh rule 根据硬件后端选择不同的并行、重算、低精度和 kernel。
    if target_hardware == "tpu-v5e":
        cfg = apply_mesh_rule(cfg, fsdp_within_slice=True, dp_across_slices=True)
        cfg = enable_int8_training(cfg)
        cfg = offload_dot_activations_to_host(cfg)
    elif target_hardware == "h100":
        cfg = apply_mesh_rule(cfg, tensor_parallel=8, fsdp_across_nodes=True)
        cfg = enable_fp8_training(cfg, delayed_scaling=True)
        cfg = save_remat_points(cfg, tags=["q", "k", "v", "o"])
    elif target_hardware == "trainium2":
        cfg = select_attention_kernel(cfg, backend="neuron_nki")

    jax_program, xla_options = AXLearnComposer.materialize(cfg)
    AXLearnComposer.aot_check(jax_program, xla_options)
    executable = XLA.compile(jax_program, xla_options)
    AXLearnRuntime.run(executable, checkpoint=True, monitor=True, fault_tolerant=True)
```

AXLearn 的核心问题不是单个 Transformer 算子的速度，而是生产环境中模型工程复杂度会随模型、功能和硬件后端成倍增长。传统继承式系统常把 RoPE、MoE、attention kernel、KV cache 或量化参数沿着多层构造函数向下传递；一旦新增一个功能，父模块、子模块、trainer、loss、checkpoint 逻辑都可能要改。AXLearn 把每个组件视为配置树中的节点：节点只暴露自己的 config、输入输出和状态集合，父节点通过组合选择子节点实现。这样新增 MoE 时可以把 FFN 子树替换成 MoE 子树，而不要求所有 Transformer 变体都新增 MoE 参数。

论文用 LoC-complexity 把这种工程差异形式化。设 \(n\) 为系统中的模块数量，\(k\) 为某类新功能的变体数，若新增功能需要修改每个祖先模块或每种 attention/model 组合，复杂度会近似增长为：

$$
C_{\text{subtyping}}(F) = \Omega(n) \quad \text{or} \quad \Omega(nk)
$$

AXLearn 的目标是把功能封装在独立模块和 config modifier 中，使新增功能对现有模块接口的修改保持常数级：

$$
C_{\text{AXLearn}}(F) = O(1)
$$

这不是简单少写几行配置，而是让“功能扩展”不再污染已有模型的公共 API。论文以 RoPE/MoE 为例说明，AXLearn 可用约 10 行配置在大量实验中启用这些功能；相同功能在扁平 config 或继承式系统中往往需要修改 attention、MLP、model wrapper、loss 或 trainer 的签名。

Composer 是从“模块化配置”到“可高效执行程序”的桥梁。用户仍然写 Python config，但 Composer 会完成更接近编译器的工作：选择 accelerator mesh shape，为参数和激活添加 sharding annotation，按后端挑选 attention kernel，设置 XLA 编译选项，并根据模块树里的 tag 选择 rematerialization 策略。一个 Linear 层可以用类似 `("fsdp", "model")` 的 partition spec 表达“参数同时沿 FSDP 和 tensor parallel 轴切分”；XLA/GSPMD 再把全局程序 lowers 成每个设备的 SPMD 程序。关键是模型定义不需要硬编码“这是 GPU 版”或“这是 TPU 版”。

硬件无关性体现在 mesh rules。TPU v5e 的片内 ICI 和片间 DCN 拓扑适合“片内 FSDP、片间 DP、INT8、host offload”；H100 节点内 NVLink 强，常见选择是 8-way tensor parallel 叠加跨节点 FSDP，并使用 FP8 delayed scaling；Trainium 则可能需要 Neuron/NKI kernel。AXLearn 把这些策略写成 target-dependent config modifiers：同一份模型结构在不同硬件上切换并行轴、保存/重算点、低精度格式和 kernel，不改模型代码。

Runtime 处理的是论文中容易被忽略但生产训练必须面对的部分：分布式作业提交、checkpoint、日志指标、故障恢复、hang recovery、silent data corruption 检测和云厂商差异。训练数百亿到数千亿参数模型时，系统错误不是异常事件，而是常态；因此 AXLearn 把容错和可观测性放进平台层，而不是留给每个实验脚本。AOT 编译也服务于这个目标：先在单机上检查 sharding、OOM 和 FLOPs，再把作业发到大集群，减少昂贵的失败启动。

与 Megatron-LM/DeepSpeed 这类以张量并行或状态分片为核心的系统相比，AXLearn 的贡献更偏“训练平台抽象”。它并不否定 TP/FSDP/remat/FlashAttention，而是把这些策略放进可组合、可测试、可迁移的配置系统中。真正的收益来自长期迭代：当模型、后端和 kernel 不断变化时，研究代码仍能保持局部替换，而不是把每个新功能扩散成一次全仓库接口迁移。

> 💡 关键：AXLearn 把大模型训练系统拆成“可组合模型模块 + 后端感知 Composer + 生产 Runtime”三层，使研究者主要表达模型意图，平台层再根据硬件和规模选择执行策略。

#### 🧪 练习题

```yaml
question: "AXLearn 为什么要提出 LoC-complexity，而不是只统计当前实现的代码行数？"
options:
  - "因为它想衡量新增功能随模块和变体数量扩展时需要修改多少现有接口代码"
  - "因为 JAX 代码无法统计行数"
  - "因为 LoC-complexity 直接等价于训练吞吐"
  - "因为它用于替代 checkpoint 机制"
answer: 0
explain: "LoC-complexity 关注功能扩展时修改面是否随模块数增长；AXLearn 通过严格封装和组合式配置把这种修改面压到常数级。"
```
