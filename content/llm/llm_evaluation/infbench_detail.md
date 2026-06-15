### ∞Bench：超过 100K Token 的长上下文评测基准

```yaml
id: infbench
name: ∞Bench
full_name: 无限长上下文基准 (Infinity Benchmark)
year: '2024'
org: Tsinghua University
paper_url: https://arxiv.org/abs/2402.13718
category: frontier_2026
parent: —
motivation: 10万+token超长文本信息检索
```

#### 📝 一句话总结

∞Bench 提出了首个平均长度超过 100K token 的多领域双语长上下文基准，用真实任务和合成任务系统检验 LLM 是否能在 100K+ 上下文中检索、聚合、跟踪状态和顺序计算。

#### 🎯 核心要点

- 数据平均长度约 200K token，显著长于 LongBench、L-Eval 等约 10K 量级长上下文基准
- 包含 12 个任务、3946 个样例，覆盖检索、代码、数学、小说、对话 5 个领域
- 同时包含英文和中文任务，真实任务来自小说、剧本、PyPI 代码仓库，合成任务可扩展到更长上下文
- 小说任务使用关键实体替换构造 fake novels，降低模型依赖预训练记忆的可能性
- 合成任务对应 4 类能力：定位与检索、高分辨率信息识别、状态保持、顺序处理
- Code.Debug 将 64K-256K token 的代码仓库拼接成单文件，并人为插入明显 bug，要求模型在候选函数中定位错误
- 主实验评测 GPT-4、Claude 2、Kimi-Chat、YaRN-Mistral 等 100K+ 长上下文模型
- 关键发现包括长度增加导致性能下降、100K+ 场景下没有稳定的 lost-in-the-middle 规律、Context Recalling 可显著提升 Code.Debug

#### 🔬 深入细节

![∞Bench 数据长度与任务分布](https://raw.githubusercontent.com/OpenBMB/InfiniteBench/main/figs/data_pie.png)
*图：∞Bench 官方仓库中的任务分布图。扇区角度表示样例数量，半径以对数尺度表示输入和输出长度。*

![∞Bench 模型性能雷达图](https://raw.githubusercontent.com/OpenBMB/InfiniteBench/main/figs/radar_res.png)
*图：GPT-4、Claude 2、Kimi-Chat、YaRN-Mistral 等模型在各任务上的性能雷达图。检索任务明显更容易，代码、数学和深度小说理解更困难。*

```python
# ∞Bench 构建与评测流程伪代码
def build_infbench():
    tasks = []

    tasks += make_retrieval_tasks(
        passkey_locations=59,
        examples_per_location=10,
        variants=["passkey", "number", "kv"],
    )
    tasks += make_code_run(depth_range=range(2, 11), ops=["+", "-"])
    tasks += make_math_tasks(types=["find_extreme_or_median", "long_arithmetic"])

    novels = replace_key_entities(load_long_novels())
    tasks += annotate_novel_tasks(novels, formats=["summary", "qa", "mc"])
    tasks += mask_speakers(load_long_scripts())
    tasks += inject_bugs(load_pypi_repos(min_tokens=64_000, max_tokens=256_000))

    return tasks


def evaluate_model(model, sample):
    prompt = render_prompt(sample.context, sample.question, sample.options)

    if sample.task == "Code.Debug" and sample.use_context_recalling:
        prompt += "\nLocate the candidate functions, repeat their content, then inspect them."

    prediction = model.generate(prompt)
    return score(prediction, sample.answer, metric=sample.metric)
```

∞Bench 的核心动机是把“模型声称支持 128K/200K 上下文”和“模型真的能有效利用 128K/200K 上下文”区分开。许多长上下文扩展方法主要解决输入长度能否放进去的问题，但已有公开基准多停留在 10K token 左右，无法暴露 100K+ 场景中的注意力衰减、状态遗忘和跨远距离信息聚合失败。

任务设计分成真实上下文和合成上下文两条线。真实上下文用于模拟实际应用：小说 QA/摘要/多选要求模型读完整本书，剧本任务要求识别被 mask 的说话者，Code.Debug 要在长代码仓库中定位一个被插入的明显错误。小说类任务会替换主角名、地点名等关键实体，使模型不能简单依赖训练记忆回答。

合成任务则用于控制变量并拆解能力。Retrieve.PassKey 测试在噪声长文本中找 5 位 key；Retrieve.Number 把答案扩展到含重复数字的 10 位序列，考察局部信息分辨率；Retrieve.KV 要在大量相似键值对中找对应 value；Code.Run 要沿多层函数调用跟踪加减法状态；Math.Find 要在长数组中找最大、最小或中位数；Math.Calc 要逐步处理超长加减表达式。

评测指标随任务而变：检索、代码调试、代码运行、数学和多选多用 accuracy；英文/中文 QA 使用 F1 或 ROUGE F1；摘要用 ROUGE-LSum。论文还讨论了输入截断：部分模型遇到长度限制时需要从中间截断并保留首尾，这会影响某些位置相关任务，因此最终分析不仅看总分，也看长度、答案位置和提示策略。

实验结论很直接：GPT-4 平均分最高，但也远未解决全部任务；YaRN-Mistral 在多个复杂任务上接近随机；所有模型在 Math.Calc 上几乎失败。长度消融显示，即便模型能接受很长输入，实际性能也会随长度增加而下降。lost-in-the-middle 在 100K+ 场景下并不稳定，不同模型和任务有不同位置偏好。

Context Recalling 是论文中最有启发的提示发现。对 Code.Debug，如果只要求 GPT-4 step-by-step，准确率约 15.74%；如果显式要求它先定位候选函数、复述相关代码，再进行检查，准确率升至 39.59%。直觉上，这相当于让模型把远距离上下文中的关键片段“搬运”到生成近端，再基于更短的近期上下文推理。

> 💡 关键：∞Bench 不是单纯的大海捞针检索基准。它刻意加入聚合、过滤、状态跟踪和顺序处理任务，用来发现模型在超长上下文上的真实有效利用能力。

#### 🧪 练习题

```yaml
question: "∞Bench 中 Context Recalling 提示为什么能提升 Code.Debug 表现？"
options:
  - "它减少了输入上下文长度"
  - "它让模型先复述相关代码，把远距离关键信息带到生成近端再推理"
  - "它调用了外部代码检索器"
  - "它对模型进行了额外微调"
answer: 1
explain: "Context Recalling 不改变模型参数，而是通过提示要求模型先定位并复述候选函数内容，再检查错误。这样能降低远距离信息利用难度。"
```
