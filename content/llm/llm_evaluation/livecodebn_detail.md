### LiveCodeBench：实时防污染的代码能力评测

```yaml
id: livecodebn
name: LiveCodeBench
full_name: 实时代码基准 (LiveCodeBench)
year: '2024'
org: CMU
paper_url: https://arxiv.org/abs/2403.07974
category: frontier_2026
parent: swe_bench
motivation: 实时抓取竞赛题彻底防污染
```

#### 📝 一句话总结

LiveCodeBench 通过持续收集 LeetCode、AtCoder、CodeForces 的近期竞赛题，并按发布日期切分评测窗口，构建了一个同时防污染、可自动判分、覆盖多种代码能力的 LLM 代码基准。

#### 🎯 核心要点

- 从 LeetCode、AtCoder、CodeForces 周期性竞赛中持续抓取新题，给每道题标注 release date
- 评测时可只选模型训练截止日期之后的题目，避免 HumanEval、MBPP 等静态基准的训练污染风险
- 覆盖 4 个代码场景：code generation、self-repair、code execution、test output prediction
- Code generation 和 self-repair 用隐藏/生成测试检查功能正确性，主指标为 Pass@1
- Code execution 要模型预测给定程序和输入的输出，考察代码理解而不是写代码
- Test output prediction 要模型根据题面和测试输入推断期望输出，评估从自然语言规格生成测试 oracle 的能力
- 数据清洗排除含图片、答案不唯一、无法用输入输出自动判分的问题，并按平台 difficulty 做难度平衡
- 论文显示时间窗口评测能暴露污染迹象，例如部分模型在其发布日期/截止日期后的 LeetCode 题上性能明显下降

#### 🔬 深入细节

![LiveCodeBench 四类代码评测场景](https://livecodebench.github.io/images/LCB_holistic_tasks.png)
*图：LiveCodeBench 官方项目页展示的四类场景。它不只测自然语言到代码生成，还测修复、执行理解和测试输出预测。*

![LiveCodeBench 多场景模型表现](https://livecodebench.github.io/images/tasks_radar.png)
*图：不同模型在四个代码场景上的相对表现会发生变化，说明只看代码生成不足以代表完整代码能力。*

```python
# LiveCodeBench 构建与评测流程伪代码
def curate_livecodebench(start_date, end_date):
    problems = []
    for platform in ["LeetCode", "AtCoder", "CodeForces"]:
        raw = scrape_contest_problems(platform, start_date, end_date)
        for p in raw:
            if has_image(p) or has_multiple_valid_outputs(p):
                continue
            tests = collect_platform_tests(p) or generate_input_tests_with_llm(p)
            problems.append(normalize_problem(p, tests, release_date=p.contest_date))
    return balance_by_difficulty(problems)


def evaluate_livecodebench(model, problems, scenario, model_cutoff):
    fresh = [p for p in problems if p.release_date > model_cutoff]
    correct = 0

    for p in fresh:
        prompt = build_prompt(p, scenario)
        response = model.generate(prompt, temperature=0)

        if scenario in ["code_generation", "self_repair"]:
            correct += run_all_tests(response.program, p.tests)
        elif scenario == "code_execution":
            correct += assert_output_equivalent(response.answer, execute(p.program, p.input))
        elif scenario == "test_output_prediction":
            correct += compare_expected_output(response.answer, p.expected_output)

    return correct / len(fresh)
```

LiveCodeBench 的出发点是两个问题：静态代码基准容易被训练集污染，且 HumanEval/MBPP 主要评估“题面到函数”的单一生成能力。现实中的代码 Agent 不只写新函数，还需要理解已有代码、根据错误反馈修复、推断程序运行结果、根据规格构造或判断测试输出。因此论文把“实时新题”和“多场景代码能力”放在同一个基准里。

数据构建从竞赛平台抓取题面、元数据、发布时间、公开测试、用户解法和可用隐藏/补充测试。清洗阶段会排除含图片的题、输出不唯一的题、需要构造复杂数据结构而无法稳定自动判分的题。对于测试不完整的平台，论文使用 GPT-4-Turbo 辅助生成输入生成器，而不是直接让模型列测试输入，从而让测试更贴合题目约束并降低随意性。

四个场景共享同一批高质量竞赛问题，但构造方式不同。Code generation 给题面让模型写完整解；self-repair 先使用模型生成的错误程序，再把语法错误、运行时错误、wrong answer 或超时反馈放回提示中要求修复；code execution 从人类正确解中筛选可手工检查的程序片段，让模型预测输入输出；test output prediction 给题面和指定输入，要求模型写出期望输出。

防污染机制依赖 release date。每道题都带比赛发布日期，因此对新模型可以只评估其 cutoff date 之后发布的问题，得到更接近未见数据的性能估计。论文称这种“scrolling through time”的切片能观察到明显异常：某些模型在发布日期之前的题上更强，而在之后题上骤降，提示旧题可能已经进入训练或调优数据。

评分上，LiveCodeBench 尽量避免主观 judge。生成和修复场景要求程序通过全部测试；执行与测试输出预测场景则解析模型答案并做等价检查。最终通常报告 Pass@1，即单次采样得到正确答案的比例。这个设计使评测可以持续更新、自动运行，也更容易比较不同模型在同一时间窗口内的真实泛化能力。

与 SWE-bench 相比，LiveCodeBench 的单位是竞赛编程题和派生场景，不是 GitHub issue 级软件维护任务；但二者共同强调可执行验证。LiveCodeBench 更适合衡量算法题、程序理解和测试 oracle 能力，SWE-bench 更适合衡量真实代码库修改与补丁落地能力。

> 💡 关键：LiveCodeBench 的“live”不是简单增加新题，而是把题目发布日期纳入评测协议，使模型截止日期成为公平比较的一部分。

#### 🧪 练习题

```yaml
question: "LiveCodeBench 如何降低代码基准的数据污染风险？"
options:
  - "只使用模型自己生成的题目"
  - "按竞赛题发布日期切分，只评测模型训练截止日期之后发布的问题"
  - "只评测 HumanEval 中最难的题"
  - "用 LLM judge 判断模型是否见过题目"
answer: 1
explain: "LiveCodeBench 给每道竞赛题记录 release date。对某个模型评测时，可以筛选其 cutoff date 之后的新题，从协议上减少训练集已见题目的影响。"
```
