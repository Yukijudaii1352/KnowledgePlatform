### 具身智能统一评估平台 (Embodied Arena)

```yaml
id: embodied_arena
name: Embodied Arena
full_name: 具身智能统一评估平台 (Embodied Arena)
year: '2026.03'
org: Community
paper_url: https://embodied-arena.com/
category: benchmark
parent: —
motivation: 统一评估平台，覆盖30+模型在22个基准
```

#### 📝 一句话总结
Embodied Arena 提出统一、可演进的具身智能评估平台，把 22 个基准、30+ 模型和 7 类具身能力 taxonomy 对齐，解决跨基准结果不可比、能力定义不清和评测数据难扩展的问题。

#### 🎯 核心要点
- 建立三层能力视角：感知、推理、任务执行，细化为 7 个核心能力和 25 个细粒度能力维度。
- 统一整合 2D/3D Embodied Q&A、Navigation、Task Planning 三类任务，共 22+ 基准和 64K+ 任务实例。
- 支持 30+ 商业/开源/专用具身模型，通过 API、参数部署或自定义接口接入统一评测。
- 设计 benchmark view 与 capability view 两种 leaderboard，使模型可按单基准排名或按能力维度诊断。
- 提出 LLM 驱动的数据生成与演化流程，自动构建室内场景、生成能力定向样本并根据模型短板补充新数据。
- 评测指标覆盖精确匹配、模糊文本指标、LLM 语义评估、导航成功率/SPL、任务规划完成率等不同任务范式。

#### 🔬 深入细节
![Embodied Arena 总览](https://arxiv.org/html/2509.15273v1/x1.png)
*图：Embodied Arena 将多来源模型、多类基准和 LLM 生成数据统一映射到 7 类具身能力与 3 类排行榜。*

> ⚠️ 依据限制：清单中的 `paper_url` 是项目网站而非论文页面。以下内容基于项目官网和公开论文 arXiv:2509.15273，YAML 元信息保持任务清单原样。

```python
# Embodied Arena 统一评测伪代码
taxonomy = load_taxonomy(core_capabilities=7, fine_dimensions=25)
benchmarks = load_benchmarks(domains=["qa", "navigation", "task_planning"])
models = load_models(api_models=True, open_weights=True, custom_adapters=True)

for benchmark in benchmarks:
    adapter = build_io_adapter(benchmark)
    mapped_dims = map_benchmark_dimensions(benchmark, taxonomy)
    for model in models:
        predictions = []
        for sample in benchmark.samples:
            x = adapter.to_unified_input(sample)
            y_hat = model.predict(x)
            predictions.append(adapter.from_model_output(y_hat))
        scores = evaluate(predictions, benchmark.metric)
        update_benchmark_view(model, benchmark, scores)
        update_capability_view(model, mapped_dims, scores)

gaps = analyze_model_failures(leaderboards=True)
new_data = llm_generate_targeted_data(gaps, simulation=True)
benchmarks.extend(filter_high_quality(new_data))
```

Embodied Arena 首先解决“评什么”的问题。论文把具身能力划分为 object perception、spatial perception、temporal perception、embodied knowledge、embodied reasoning、embodied navigation、embodied task planning 七类。前四类是基础感知和知识能力，reasoning 是建立在基础能力之上的高级能力，navigation 与 planning 是任务执行层能力。这样做的价值在于，模型不再只得到一个总分，而能看到是空间定位、可供性预测、时间顺序、任务分解还是导航跟随出了问题。

第二个核心是基准对齐。不同具身基准的数据格式和指标差异很大：OpenEQA、ScanQA、SQA3D 更像问答；MP3D、HM3D、R2R-CE、RxR-CE 是导航；EB-ALFRED、EB-Habitat、ET-Plan-Bench 是任务规划。Embodied Arena 用统一 I/O adapter 包装模型输入输出，再把每个基准原有维度映射到 25 个 taxonomy 维度。单基准能力分数可以写成：

$$
S_m^n = \frac{c_m^n}{k_m^n}\times 100
$$

其中 \(k_m^n\) 是第 \(n\) 个基准第 \(m\) 个能力维度的问题数，\(c_m^n\) 是正确数。跨基准总分再对维度或基准聚合。这个分层聚合避免了“一个 benchmark 偏好一种能力就代表整体具身智能”的问题。

第三个核心是数据演化。传统评测集构建后就静态不变，容易被模型针对性训练或过拟合。Embodied Arena 的自动数据生成模块分两部分：Automated Scenario Generation 负责生成多房间室内场景，包括 floor planning、functional zoning、layout planning；Capability-Oriented Data Generation & Evolution 负责围绕七类能力生成视觉-指令-答案样本。系统还引入难度阶梯，从场景复杂度、语言复杂度、任务复杂度逐步加难。

推理/执行类任务的评测方法不能完全统一成字符串匹配，因此平台采用多种 metric。问答任务可使用 exact matching、CIDEr/BLEU/ROUGE/MRA 或 LLM-based semantic evaluation；导航任务使用 success rate 和 SPL；任务规划使用 task completion success rate。最终 leaderboard 同时提供 benchmark view 和 capability view：前者方便论文引用，后者更适合诊断模型短板。

论文的经验发现也解释了平台价值：大规模通用多模态模型在总分上通常强，但同规模下专用具身模型会在特定能力上超过通用模型；单个基准的排名波动很大，说明孤立 benchmark 容易产生偏见；基础 object/spatial perception 与高级 embodied reasoning 有强相关，基础能力不足会直接限制推理和规划。

> 💡 关键：Embodied Arena 不是新控制器，而是把具身模型评测从“跑一个数据集”升级为“按能力 taxonomy 进行持续、跨基准、可演进的诊断”。

#### 🧪 练习题
```yaml
question: "Embodied Arena 的 capability view 主要解决什么问题？"
options:
  - "只展示模型在单个 benchmark 上的排行榜名次"
  - "把不同基准结果映射到统一能力 taxonomy，诊断模型具体强弱项"
  - "替代所有导航仿真器"
  - "将所有任务统一成一个二分类准确率"
answer: 1
explain: "capability view 聚合到 7 类核心能力和 25 个细粒度维度，比单基准总分更适合分析模型能力短板。"
```
