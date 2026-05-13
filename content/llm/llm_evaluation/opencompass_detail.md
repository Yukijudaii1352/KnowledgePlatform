### OpenCompass — 开源大模型通用评测平台 (OpenCompass: A Universal Evaluation Platform for Foundation Models)

```yaml
id: opencompass
name: OpenCompass
full_name: "开源大模型通用评测平台 (OpenCompass: A Universal Evaluation Platform for Foundation Models)"
year: "2023"
org: 上海人工智能实验室
paper_url: "https://github.com/open-compass/opencompass"
category: general
parent: helm
motivation: "集成百余数据集的开源自动化评测"
```

#### 📝 一句话总结

OpenCompass 是上海人工智能实验室推出的一站式大模型评测平台，集成 70+ 数据集（约 40 万道题目）与 20+ 模型后端，通过模块化配置、分布式推理和多范式评测（zero-shot / few-shot / CoT / PPL / 生成式），为大语言模型提供公平、开放、可复现的全面能力评估。

#### 🎯 核心要点

- **一站式评测工作流**：Configure → Inference → Evaluation → Visualization 四阶段流水线，一行命令即可完成全流程评测
- **大规模数据集覆盖**：内置 70+ 基准数据集（MMLU、GSM8K、HumanEval、C-Eval、CMMLU、BBH、AGIEval 等），涵盖语言、推理、知识、代码、数学五大能力维度
- **多模型后端支持**：统一接口兼容 HuggingFace 本地模型、LMDeploy / vLLM 加速推理后端以及 OpenAI / Claude / Gemini 等商业 API
- **双评测范式**：PPL（困惑度判别式评测）与 Gen（生成式评测），并支持 LLM-as-Judge（CascadeEvaluator / GenericLLMEvaluator）
- **高效分布式调度**：自动任务拆分与并行推理，支持多 GPU 数据并行（`--max-num-worker`）与模型并行（`--hf-num-gpus`），亿级参数模型数小时内完成全量评测
- **OpenCompass 2.0 三件套**：CompassKit（评测工具集）、CompassHub（基准浏览器）、CompassRank（公开排行榜）
- **特色基准与工具**：NeedleBench（长上下文大海捞针）、RULER（长上下文多维度）、SuperGPQA（知识能力）、MATHVerifyEvaluator（数学推理验证）、XFinder（答案抽取后处理）

#### 🔬 深入细节

##### 平台总体架构

![OpenCompass 总体架构图](https://github.com/open-compass/opencompass/assets/22607038/f45fe125-4aed-4f8c-8fe8-df4efb41a8ea)
*图：OpenCompass 平台总体架构——涵盖模型层、能力维度层、数据集层与工具层*

OpenCompass 的设计目标是为大语言模型（LLM）提供**公平、开放、可复现**的评测基础设施。与传统的单一基准测试不同，OpenCompass 将评测抽象为一个完整的工程流水线，从配置定义、推理执行、结果评判到可视化报告，全部在统一框架内完成。

> 💡 **关键设计理念**：OpenCompass 不区分开源模型与 API 模型——两者使用完全相同的评测流程和配置接口，甚至可以在同一次实验中混合评测。

##### 四阶段评测工作流

![OpenCompass 工作流](https://github.com/open-compass/opencompass/assets/22607038/d063cae0-3297-4fd2-921a-366e0a24890b)
*图：OpenCompass 评测工作流——Configure → Inference → Evaluation → Visualization*

```python
# OpenCompass 评测流程伪代码
def opencompass_pipeline(config):
    # 阶段 1: Configure — 解析配置，确定模型与数据集
    models = load_models(config.models)        # 支持 HF / API / LMDeploy / vLLM
    datasets = load_datasets(config.datasets)  # 70+ 预定义数据集配置
    
    # 阶段 2: Inference — 分布式并行推理
    tasks = partition_tasks(models, datasets)   # 自动任务拆分
    for task in parallel_execute(tasks):        # 多 GPU / 多节点并行
        if task.eval_type == 'ppl':
            # 判别式评测：计算各选项的困惑度，选最低者
            outputs = model.get_ppl(task.prompts, task.options)
        elif task.eval_type == 'gen':
            # 生成式评测：模型自由生成回答
            outputs = model.generate(task.prompts, max_tokens=task.max_out_len)
        save_predictions(task, outputs)
    
    # 阶段 3: Evaluation — 答案评判
    for task in all_tasks:
        if task.judge_type == 'rule':
            # 规则匹配：精确匹配 / 正则提取 / XFinder 后处理
            scores = rule_based_evaluate(task.predictions, task.references)
        elif task.judge_type == 'llm_judge':
            # LLM-as-Judge：CascadeEvaluator 级联评判
            scores = llm_judge_evaluate(task.predictions, task.references)
        elif task.judge_type == 'math_verify':
            # 数学验证：MATHVerifyEvaluator 符号化验证
            scores = math_verify(task.predictions, task.references)
        record_scores(task, scores)
    
    # 阶段 4: Visualization — 结果汇总与展示
    summary_table = aggregate_scores(all_tasks)
    export_csv(summary_table)
    export_to_lark(summary_table)  # 可选：飞书实时报告
    return summary_table
```

**阶段详解：**

**1. Configure（配置阶段）**

OpenCompass 采用基于 Python 的配置系统（继承自 MMEngine），支持配置继承与组合。用户可以通过两种方式定义实验：

- **命令行模式**：直接指定模型和数据集名称，适合快速评测
  ```bash
  opencompass --models hf_internlm2_5_1_8b_chat --datasets demo_gsm8k_chat_gen
  ```
- **配置文件模式**：编写 Python 配置文件，支持复杂的多模型、多数据集组合评测
  ```python
  from mmengine.config import read_base
  with read_base():
      from .datasets.siqa.siqa_gen import siqa_datasets
      from .models.opt.hf_opt_125m import opt125m
  datasets = [*siqa_datasets]
  models = [opt125m]
  ```

> ⚠️ **注意**：v0.4.0 版本后，所有配置文件（datasets / models / summarizers）已整合进 `opencompass` 包内部，用户需更新配置引用路径。

**2. Inference（推理阶段）**

推理阶段是计算密集型的核心环节。OpenCompass 提供以下关键能力：

- **多后端切换**：通过 `-a` 参数一键切换推理后端（HuggingFace → LMDeploy → vLLM），无需修改配置
- **自动任务拆分**：将 \(M\) 个模型 × \(D\) 个数据集的评测矩阵拆分为独立任务，支持并行调度
- **数据并行**：`--max-num-worker N` 在 N 张 GPU 上并行处理同一模型的不同数据分片
- **模型并行**：`--hf-num-gpus K` 指定单模型所需最少 GPU 数（用于大参数模型的张量并行）

$$
\text{总任务数} = |\mathcal{M}| \times |\mathcal{D}| \times \lceil \frac{|d_i|}{\text{batch\_size}} \rceil
$$

其中 \(\mathcal{M}\) 为模型集合，\(\mathcal{D}\) 为数据集集合，\(|d_i|\) 为第 \(i\) 个数据集的样本数。

**3. Evaluation（评判阶段）**

OpenCompass 支持三类评判机制：

| 评判方式 | 适用场景 | 代表工具 |
|---------|---------|---------|
| 规则匹配 | 客观题（选择题、填空题） | 精确匹配、正则提取、XFinder |
| LLM-as-Judge | 主观题（开放生成、翻译质量） | GenericLLMEvaluator、CascadeEvaluator |
| 符号化验证 | 数学推理题 | MATHVerifyEvaluator |

**CascadeEvaluator** 是 2025 年新增的级联评判机制，允许多个评判器按序工作——例如先用规则匹配快速筛选，对规则无法判定的样本再调用 LLM 评判，兼顾效率与准确性。

**4. Visualization（可视化阶段）**

评测完成后自动生成汇总表格，输出 CSV / TXT 格式。支持飞书（Lark）实时推送，方便团队协作监控。

##### 五大能力维度与数据集体系

OpenCompass 将 LLM 能力划分为**五大维度**，每个维度下包含多个标准基准：

| 能力维度 | 代表数据集 | 评测方式 |
|---------|-----------|---------|
| **语言理解** | MMLU、C-Eval、CMMLU、WinoGrad、SIQA | PPL / Gen |
| **知识问答** | TriviaQA、NaturalQuestions、SuperGPQA | Gen |
| **推理能力** | GSM8K、MATH、BBH、MuSR、AGIEval | Gen + MATHVerify |
| **代码能力** | HumanEval、MBPP、SciCode | 执行验证 |
| **长上下文** | NeedleBench、RULER、BABILong | Gen（长序列） |

> 💡 **数据集配置命名规则**：`_ppl` 后缀表示困惑度判别式评测（适合 base 模型），`_gen` 后缀表示生成式评测（适合 base 和 chat 模型），`_llm_judge_gen` 表示使用 LLM 评判的生成式评测。

##### OpenCompass 2.0 生态体系

![OpenCompass 2.0 架构](https://github.com/tonysy/opencompass/assets/7881589/90dbe1c0-c323-470a-991e-2b37ab5350b2)
*图：OpenCompass 2.0 三大组件——CompassKit、CompassHub、CompassRank*

OpenCompass 2.0 将平台从单一评测工具升级为完整生态：

- **CompassKit**：评测工具集，包含针对 LLM 和多模态大模型（VLM）的全套评测能力，支持自定义评测器扩展
- **CompassHub**：基准浏览器（[hub.opencompass.org.cn](https://hub.opencompass.org.cn)），提供数据集检索、筛选和提交功能，研究者可以将自己的基准贡献到社区
- **CompassRank**：公开排行榜（[rank.opencompass.org.cn](https://rank.opencompass.org.cn)），同时纳入开源基准和私有基准的评测结果，提供行业级模型能力对比

##### 与 HELM 等评测框架的对比

OpenCompass 的设计受到 Stanford HELM 的启发（其 `parent` 为 HELM），但在以下方面做出了显著改进：

| 特性 | HELM | OpenCompass |
|-----|------|-------------|
| 模型支持 | 主要通过 API 调用 | HuggingFace 本地 + API + 加速后端 |
| 数据集规模 | 42 个核心场景 | 70+ 数据集，约 40 万题 |
| 中文评测 | 有限 | 深度支持（C-Eval、CMMLU、GAOKAO 等） |
| 推理加速 | 无 | LMDeploy / vLLM 一键切换 |
| 分布式调度 | 有限 | 自动任务拆分 + 多 GPU 并行 |
| 评判方式 | 规则为主 | 规则 + LLM-as-Judge + 数学验证 |
| 社区生态 | 排行榜 | Kit + Hub + Rank 三件套 |
| 开源协议 | MIT | Apache 2.0 |

> 💡 **关键优势**：OpenCompass 被 Meta AI 官方推荐用于 Llama 系列模型的验证评测（见 [Meta Llama Get Started](https://ai.meta.com/llama/get-started/#validation)），体现了其在国际社区中的认可度。

##### 模块化扩展机制

OpenCompass 的模块化设计使得扩展非常便捷：

- **新增模型**：只需实现 `BaseModel` 接口或直接使用 `HuggingFaceBaseModel` 包装器，通过配置文件注册即可
- **新增数据集**：编写数据集配置（指定加载方式、prompt 模板、评测指标），放入 `configs/datasets/` 目录
- **新增评测器**：继承 `BaseEvaluator` 实现自定义评判逻辑，可通过 CascadeEvaluator 与其他评测器组合
- **新增后端**：支持自定义推理后端集成，已内置 HuggingFace、LMDeploy、vLLM 三大后端

```python
# 模型配置示例：注册一个 HuggingFace 模型
from opencompass.models import HuggingFaceBaseModel

models = [
    dict(
        type=HuggingFaceBaseModel,
        path='internlm/internlm2_5-1_8b-chat',  # HuggingFace 模型路径
        abbr='internlm2_5-1_8b-chat',            # 模型简称
        max_out_len=1024,                         # 最大生成长度
        batch_size=32,                            # 批大小
        run_cfg=dict(num_gpus=1),                 # 所需 GPU 数
    )
]
```

#### 🧪 练习题

```yaml
question: "OpenCompass 中，数据集配置文件后缀 `_ppl` 和 `_gen` 分别代表什么评测方式？"
options:
  - "`_ppl` 表示生成式评测，`_gen` 表示困惑度评测"
  - "`_ppl` 表示困惑度判别式评测，`_gen` 表示生成式评测"
  - "`_ppl` 表示预训练评测，`_gen` 表示通用评测"
  - "`_ppl` 和 `_gen` 仅是版本号区分，评测方式相同"
answer: 1
explain: "在 OpenCompass 中，`_ppl` 后缀表示基于困惑度（perplexity）的判别式评测，适合 base 模型；`_gen` 后缀表示生成式评测，模型自由生成回答后与标准答案比对，适合 base 和 chat 模型。"
```