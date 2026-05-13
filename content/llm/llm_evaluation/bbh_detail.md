### Challenging BIG-Bench Tasks and Whether Chain-of-Thought Can Solve Them

```yaml
标题: "Challenging BIG-Bench Tasks and Whether Chain-of-Thought Can Solve Them"
作者: Mirac Suzgun, Nathan Scales, Nathanael Schärli, Sebastian Gehrmann, Yi Tay, Hyung Won Chung, Aakanksha Chowdhery, Quoc V. Le, Ed H. Chi, Denny Zhou, Jason Wei
机构: Stanford University, Google Research
发表: arXiv 2210.09261, 2022
论文链接: https://arxiv.org/abs/2210.09261
代码链接: https://github.com/suzgunmirac/BIG-Bench-Hard
关键词: [BIG-Bench Hard, Chain-of-Thought, 涌现能力, 语言模型评估, 推理]
```

---

## 📝 一句话总结

本文从BIG-Bench的204个任务中筛选出23个语言模型尚未超越人类的困难任务（BBH），并证明Chain-of-Thought（CoT）提示能使最强模型在其中17/23个任务上超越人类平均水平，同时揭示了CoT作为涌现能力需要足够大的模型规模才能生效。

---

## 🎯 核心要点

- **BBH基准构建**：从BIG-Bench的204个任务出发，经过清洗保留78个可自动评估任务，再筛选出36个所有语言模型均未超越人类平均水平的任务，最终去除13个所有模型接近随机的极难任务，得到23个"有挑战但非不可能"的BBH任务（共6,511个评估样本）。
- **CoT的巨大提升**：CoT提示为三个模型家族（PaLM、InstructGPT、Codex）带来平均10-17个百分点的提升；最强的Codex（code-davinci-002）从answer-only的56.6%跃升至CoT的73.9%，在17/23个任务上超越人类平均评分。
- **涌现能力与规模门槛**：CoT提示在小模型上效果为负或为零，只有在足够大的模型上才能产生正向增益——这是一种"涌现提示策略"，与模型规模存在质变关系（如Multi-Step Arithmetic、Tracking Shuffled Objects从随机水平跃升至远超随机）。
- **任务类型差异**：算法/推理类任务（11个）从CoT中获益最大（Codex提升28.5%），Codex在代码训练加持下表现最优；NLU类任务（12个）提升相对温和（7.1%），PaLM和InstructGPT在语义理解任务上更有优势。
- **CoT的局限**：Causal Judgement、Ruin Names、Snarks三个任务在所有模型上CoT反而降低性能——这些任务依赖世界知识、幽默感知或讽刺检测，CoT无法弥补知识缺口。

---

## 🔬 深入细节

### 关键图表

**图1：BBH筛选流程**

```
BIG-Bench (204 tasks)
    │
    ├─ 清洗: 去除非自动评估/格式问题 → 78 tasks
    │
    ├─ 筛选: 所有LM未超人类平均 → 36 tasks
    │
    └─ 去除极难: 去除所有模型≈随机的13个 → 23 BBH tasks (6,511 samples)
```

**表2：BBH总体结果（核心数据）**

| 模型 | Answer-Only | CoT | 超越人类任务数 |
|------|------------|-----|--------------|
| PaLM 540B | 52.3% | 65.2% (+12.9) | 10/23 |
| InstructGPT (text-davinci-002) | 51.8% | 68.4% (+16.6) | 15/23 |
| Codex (code-davinci-002) | 56.6% | 73.9% (+16.7) | 17/23 |
| 人类平均 | — | 67.7% | 23/23 |
| 人类最佳 | — | 94.4% | 23/23 |
| BIG-Bench最优先前结果 | 50.9% | — | 0/23 |

**图4/5：CoT的涌现特性（伪代码描述）**

```
# BBH评估流程伪代码
def evaluate_bbh(model, tasks, use_cot=False):
    """
    对BBH的23个任务进行few-shot评估
    - 每个任务使用3个few-shot exemplar
    - CoT模式下每个exemplar附带手写推理链
    - 使用greedy decoding (temperature=0)
    - 通过"the answer is"关键词提取答案
    - 使用Exact Match计算准确率
    """
    results = {}
    for task in tasks:  # 23 BBH tasks
        prompt = build_prompt(
            task_description=task.instruction,
            exemplars=task.few_shot_examples,  # 3 examples
            answer_options=task.options,        # 提供选项空间
            cot=use_cot                        # 是否添加推理链
        )
        for sample in task.test_set:
            input_prompt = prompt + format_question(sample)
            if use_cot:
                input_prompt += "Let's think step by step.\n"
            output = model.generate(input_prompt, temperature=0)
            pred = extract_answer(output, keyword="the answer is")
            results[task].append(pred == sample.gold_label)
    return {t: accuracy(r) for t, r in results.items()}
```

### 三段式深入解读

**第一段：方法论——从204到23的精心筛选**

BBH的核心贡献不仅在于实验结果，更在于其系统化的基准构建方法论。作者从BIG-Bench的204个任务出发，首先进行数据清洗（去除无法自动评估、格式不一致、缺少人类基线的任务），保留78个"干净"任务。然后以"所有语言模型是否超越人类平均水平"为标准筛选出36个困难任务。最后，作者做了一个关键的设计决策：去除13个所有模型表现接近随机的"过难"任务（如Swahili翻译、IPA音标转写等），因为这些任务可能反映的是训练数据覆盖不足而非推理能力缺陷。最终的23个BBH任务代表了一个"甜蜜区间"——足够困难以区分模型能力，但又不至于完全不可解。这种筛选策略确保了BBH作为评估基准的区分度和信息量。

**第二段：核心发现——CoT与规模的交互效应**

论文最深刻的发现在于CoT提示与模型规模之间的非线性交互。在小模型（如text-ada-001、PaLM-8B）上，CoT提示反而降低性能——模型无法生成有意义的推理链，反而被迫输出的冗余文本干扰了最终答案。随着模型规模增大，CoT的增益从负变正，并在最大模型上达到峰值。这一现象在三个任务上尤为显著：Multi-Step Arithmetic（Codex从1.2%→47.6%）、Tracking Shuffled Objects（24.1%→84.5%）、Navigate（50.4%→96.4%）。这些任务在answer-only模式下呈现"平坦缩放曲线"（性能不随规模增长），但CoT解锁了涌现式的性能跃升。这表明CoT本身就是一种涌现能力——它不是简单地"帮助"模型，而是在足够大的模型中激活了一种全新的问题解决模式（将复杂问题分解为可管理的子步骤）。

**第三段：局限性与启示——知识vs推理的边界**

论文诚实地揭示了CoT的局限性。在Causal Judgement（因果判断）、Ruin Names（名称恶搞）和Snarks（讽刺检测）三个任务上，CoT在所有模型家族中均降低性能。这三个任务的共同特征是依赖隐性世界知识而非显式推理：因果判断需要理解社会常识中的因果假设，名称恶搞需要理解英语文化中的幽默感知，讽刺检测需要捕捉语境中的反讽意图。CoT擅长的是将显式推理步骤外化，但无法弥补模型缺乏的隐性知识。此外，作者也坦诚指出人类基线的局限性——BIG-Bench的人类评估历时近一年，期间任务格式多次变更，评估者可使用互联网资源，因此"超越人类平均"不应等同于"真正的语言理解"。这一谨慎态度为后续研究设定了重要的解读框架。值得注意的是，即使最强的Codex+CoT（73.9%）仍落后人类最佳表现（94.4%）超过20个百分点，说明BBH在2022年后仍有相当的评估价值。

---

## 🧪 练习题

**Q1**（理解题）：BBH从BIG-Bench的204个任务中最终筛选出23个任务，请描述筛选的三个主要步骤及每步的筛选标准。

<details><summary>参考答案</summary>

三个筛选步骤：
1. **数据清洗**（204→78）：去除无法自动评估的任务（如开放式生成）、格式不一致的任务、缺少人类基线评分的任务，保留78个可以用精确匹配自动评估的"干净"任务。
2. **困难度筛选**（78→36）：选择所有已评估语言模型（包括PaLM 540B等最大模型）均未超越人类平均评分水平的任务，得到36个困难任务。
3. **去除极端任务**（36→23）：去除13个所有模型表现接近随机水平的任务（这些任务可能反映训练数据覆盖不足而非推理能力缺陷），保留23个"有挑战但非不可能"的任务。

</details>

**Q2**（分析题）：为什么CoT提示在Causal Judgement和Snarks任务上反而降低了模型性能？这揭示了CoT方法的什么本质局限？

<details><summary>参考答案</summary>

CoT在这两个任务上降低性能的原因：
- **Causal Judgement**依赖对社会常识中因果假设的隐性理解，而非可分解的显式推理步骤。CoT迫使模型生成推理链，但模型缺乏必要的因果常识知识，生成的推理链反而引入了错误的推理路径。
- **Snarks（讽刺检测）**需要理解语境中的反讽意图和文化背景知识。讽刺的识别往往依赖直觉性的语用理解，而非逐步推理。

这揭示了CoT的本质局限：**CoT擅长将显式的多步推理过程外化和分解，但无法弥补模型缺乏的隐性世界知识和语用理解能力**。当任务的核心难点在于"知道什么"而非"如何推理"时，CoT不仅无益反而有害。

</details>

**Q3**（应用题）：假设你要在一个新的LLM上评估BBH，该模型参数量为10B。根据论文的发现，你预期CoT提示会带来什么效果？你会如何设计评估策略？

<details><summary>参考答案</summary>

根据论文发现，10B参数的模型处于CoT效果的"过渡区"：
- **预期效果**：CoT可能在大多数BBH任务上带来零或负增益。论文显示PaLM-8B上CoT为负增益，PaLM-62B上开始转正。10B模型可能在少数简单任务上获得微弱正增益，但整体效果不佳。
- **评估策略建议**：
  1. 同时运行answer-only和CoT两种模式，对比每个任务的表现差异。
  2. 重点关注CoT是否在算法类任务上开始出现正增益（这类任务对CoT最敏感）。
  3. 对于NLU类任务，优先使用answer-only结果作为模型能力的代表。
  4. 将结果与论文中PaLM-8B和PaLM-62B的数据进行插值对比，判断该模型的CoT涌现程度。
  5. 考虑使用更强的提示策略（如self-consistency、least-to-most prompting）来弥补模型规模不足。

</details>