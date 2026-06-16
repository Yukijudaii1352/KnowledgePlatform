### JBF：越狱铸造厂 (Jailbreak Foundry)

```yaml
id: jbf
name: JBF
full_name: 越狱铸造厂 (Jailbreak Foundry)
year: "2026.03"
org: arXiv
paper_url: https://arxiv.org/abs/2603.05001
category: jailbreak
parent: jbfuzz
motivation: 论文自动转化攻击模块
```

#### 📝 一句话总结

JBF 提出 Jailbreak Foundry，把“读论文、实现越狱攻击、校验复现 fidelity、统一评测”做成一条多智能体流水线，解决新越狱论文很难及时、可比、可复现地进入安全基准的问题。它的核心不是发明某一个攻击提示词，而是把论文自动转化为符合统一契约的可运行攻击模块，再用固定数据集、受害模型、judge 和 ASR 指标进行横向比较。

> ⚠️ 资料校准：任务元信息中的 `paper_url` 指向 `arXiv:2603.05001`，该编号实际对应非 JBF 论文；以下精读基于可检索到的同名 JBF 论文 `https://arxiv.org/abs/2602.24009` 及其官方仓库图示，YAML 元信息按任务输入保持不改。

#### 🎯 核心要点

- 三组件架构：`JBF-LIB` 提供统一攻击契约和运行时工具，`JBF-FORGE` 负责论文到模块的多智能体生成，`JBF-EVAL` 负责标准化评测。
- 多智能体 paper-to-module 流程：Planner 从论文抽取算法、控制流、提示模板和参数，Coder 按契约实现模块，Auditor 做逐行 fidelity 与 contract 检查。
- 统一模块契约 `C`：把不同论文中的攻击逻辑约束为可注册、可配置、可批量运行的模块，减少每篇论文重复写评测脚手架。
- 有界审计循环：实现不满足计划或契约时进入 revision，达到审计上限或通过检查后才进入 matched-setting 复现评测。
- fidelity 指标：用 `ASR_gen - ASR_paper` 衡量复现攻击成功率与原论文报告值的偏差，并在偏差低于阈值时触发增强 refinement。
- 统一评测设置：JBF-EVAL 固定数据集加载、victim model 协议、decoding/attempt 记录、judge 和 ASR 汇总，输出可比较表格和 heatmap。
- 实验规模：论文复现 30 个越狱攻击，其中 22 个有官方实现、8 个仅从论文文本实现，并在标准化 AdvBench/JailbreakBench 设定上评估。
- 工程收益：报告平均 ASR 偏差约 `+0.26` 个百分点，攻击专属代码显著减少，共享基础设施复用比例达到约 `82.5%`。

#### 🔬 深入细节

![JBF 系统架构图](https://raw.githubusercontent.com/OpenSQZ/Jailbreak-Foundry/main/images/jbf_architecture.jpg)
*图：JBF 官方架构图，展示 JBF-FORGE、JBF-LIB、JBF-EVAL 如何把新越狱论文转化为可运行模块并统一评测。*

JBF 要解决的直接痛点是 jailbreak 研究的“评测漂移”。新攻击出现很快，但 benchmark 往往依赖人工集成：工程师需要读论文、补齐作者没有写清的默认参数、适配自己的评测框架、再验证 ASR 是否接近论文报告。这个过程容易带来三类误差：集成滞后导致基准落后，工程师理解不同导致实现质量方差，评测数据集、解码参数、judge 和打分标准不统一导致不同论文的 ASR 无法直接比较。JBF 因此把“攻击实现”与“评测执行”解耦，用统一契约固定接口，用多 agent 缩短从论文到模块的路径。

JBF-LIB 是整个系统的底座。论文把它抽象为模块契约 \(C\)，包括 base-class interface、I/O schema、typed parameter hooks、注册与 lazy loading、消息格式化、请求响应归一化、缓存、日志、provider-agnostic LLM adapter 等。这个契约的意义是让攻击模块只表达“方法本身”：如何构造候选 prompt、如何迭代查询 victim、如何停止搜索、输出哪些 attempt 记录；而数据集加载、模型调用、judge、成本统计、批量运行和结果聚合都由共享库承担。

JBF-FORGE 是 paper-to-module 的核心。它先把论文 \(p\) 规范化成可读文本 \(x\)，可选检索官方仓库 \(R\)，再由 Planner \(\pi\) 生成结构化规格 \(s_p\)。规格里需要列出攻击算法步骤、prompt/template、参数默认值、控制流、重试逻辑和与契约 \(C\) 的映射。Coder \(\kappa\) 再把 \(s_p\) 编译成模块 \(m_p\)，并暴露 typed parameters。Auditor \(\alpha\) 不只是跑通测试，而是把模块逐行对照规格、契约和参考仓库，返回接受标志 \(a_c\) 与可操作 revision report \(r\)。

```python
# JBF-FORGE：论文到可运行攻击模块的简化伪代码
# 输入：论文 p，统一契约 C，最大审计轮数 T，fidelity 阈值 tau
x = normalize_to_markdown(p)
R = retrieve_official_repo_if_available(p)

spec = Planner(pi).extract_spec(x, contract=C, repo=R)
report = None
module = Coder(kappa).implement(spec, contract=C, repo=R, revision=report)

for t in range(1, T + 1):
    accepted, report = Auditor(alpha).audit(module, spec, contract=C, repo=R)
    if accepted or t == T:
        break
    module = Coder(kappa).patch(spec, contract=C, repo=R, revision=report)

setting = match_paper_config(p)
asr_gen = JBF_EVAL.evaluate(module, setting)
delta = asr_gen - asr_paper

if delta < tau:
    refined_spec = refine_with_failure_analysis(spec, p, module, report, C, R)
    refined_module = Coder(kappa).implement(refined_spec, contract=C, repo=R)
    refined_asr = JBF_EVAL.evaluate(refined_module, setting)
    if refined_asr - asr_paper >= delta:
        module = refined_module
        delta = refined_asr - asr_paper

return module, delta
```

论文中的 fidelity 机制可以写成：

$$
\Delta = ASR_{gen} - ASR_{paper}
$$

其中 \(ASR_{paper}\) 是原论文在匹配设置下报告的攻击成功率，\(ASR_{gen}\) 是 JBF 生成模块在同样设置下的复现结果。若 \(\Delta < \tau\)，系统会进入增强 refinement：分析失败样本、定位规格或实现中可能导致 ASR 偏低的差异，并在同一 matched setting 下重新评测。这个设计比单纯“模块能运行”更强，因为越狱攻击非常依赖模板细节、搜索停止条件、judge rubric 和 victim 配置；任何小偏差都可能让 ASR 明显变化。

> 💡 关键：JBF 的复现目标不是让 ASR 尽量高，而是让生成实现尽量忠实于论文设置。高于原论文很多也可能意味着模块引入了额外策略，因此论文用 matched-setting gap 来约束 fidelity。

JBF-EVAL 负责把通过审计的攻击放进统一 benchmark。它把 dataset、execution、judging 分成稳定接口：dataset loader 提供 AdvBench/JailbreakBench 等样本，runner 从 registry 实例化攻击并记录每次 attempt，judge 把最小响应记录映射成成功/失败标签，最后汇总 ASR、成本、trace、跨攻击/跨模型矩阵和 heatmap。这样同一个攻击模块既可以在原论文配置下做 fidelity 检查，也可以在统一 AdvBench、固定 GPT-4o judge、固定 victim model 列表下做 apples-to-apples 比较。

与传统手工集成相比，JBF 的创新在于把“论文理解”显式变成可审计 artifact。Planner 的规格、Coder 的模块、Auditor 的逐行报告构成可回溯链路；当攻击复现不准时，系统能指出是 prompt 模板、参数默认值、控制流、搜索次数还是评测边界出了问题。论文报告 30 个攻击的平均复现偏差接近 0，同时共享基础设施显著降低攻击专属代码量，说明很多 jailbreak 论文的差异集中在方法逻辑而非评测脚手架。

从安全评测角度看，JBF 更像“活基准生成器”而不是攻击库。它把快速增长的越狱论文转成统一模块，持续加入版本化结果，使研究者可以追踪模型随时间的鲁棒性变化。它也暴露了一个重要方法论：安全 benchmark 的可信度不只来自数据集规模，还来自实现 fidelity、judge 一致性、结果版本化和跨模型可比性。

#### 🧪 练习题

```yaml
question: "JBF-FORGE 中 Auditor 的核心作用是什么？"
options:
  - "自动生成更多恶意查询以提高攻击成功率"
  - "逐行检查生成模块是否忠实于论文规格和统一契约"
  - "替代 JBF-EVAL 直接给出最终排行榜"
  - "把所有攻击统一改写成同一种提示模板"
answer: 1
explain: "Auditor 的目标是降低复现漂移：它对照 spec、contract 和可选官方仓库检查模块，并在发现语义偏差或参数不一致时触发修订。"
```
