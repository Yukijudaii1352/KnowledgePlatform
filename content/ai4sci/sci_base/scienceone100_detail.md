### ScienceOne 100 — 面向百场景科研工作流的科学基础模型系统

```yaml
id: scienceone100
name: ScienceOne 100
full_name: 科学一号 (ScienceOne 100)
year: '2026'
org: 中国科学院
paper_url: https://dig.watch/resources/scienceone-100
category: unified_foundation
parent: —
motivation: 跨数学物理生物统一模型100+场景
```

#### 📝 一句话总结

ScienceOne 100 提出了以科学基础模型、领域模型和工具智能体共同组成的平台式 AI for Science 系统，解决通用大模型难以直接处理科学多模态数据、长链科研流程和跨学科工具调用的问题。

#### 🎯 核心要点

- **平台而非单模型**：ScienceOne 100 将科学基础模型、学科专用大模型、文献分析、创新评估和工具编排组合成面向完整科研周期的系统
- **异构 MoE 科学基座**：官方页面说明 ScienceOne 采用 heterogeneous mixture-of-experts 架构，面向波形、谱图、场数据等复杂科学模态
- **百场景部署**：DIG Watch 可访问报道指出系统已覆盖 100+ 科研场景，并在 50+ 研究机构中部署
- **三类核心功能**：文献罗盘用于检索、综述和技术路线抽取；创新评估引擎用于发现研究方向；Agent/ToolChain 用于调度科学工具
- **大规模科学知识入口**：S1-Literature 连接约 170M 篇全球科学文献，并支持公式、图表和专业术语解析
- **工具生态**：S1-ToolChain 集成 300+ 科学工具和 30+ 专业模型，覆盖数据处理、模型训练、特征分析和仿真执行
- **多模态科学推理补充**：S1-VL 技术报告给出 ScienceOne 体系下的 Scientific Reasoning 与 Thinking-with-Images，两者支撑高分辨率科学图表、显微图像和地理图像推理
- **来源限制**：输入 `paper_url` 是新闻/资源页；本文结合可访问 DIG Watch 更新页、ScienceOne 官方站、The Innovation Informatics 系统图和 S1-VL arXiv 技术报告进行方法级解读

#### 🔬 深入细节

##### 系统框架与来源说明

![ScienceOne 100 系统框架](https://data.the-innovation.org/innovation-data/informatics/newcreate/TII-2026-0045-1_online.jpg)
*图：The Innovation Informatics 文章 Figure 1，展示 ScienceOne 100 model system 的平台级框架。原始条目的 DIG Watch 资源页不稳定；可访问来源包括 DIG Watch 更新页 `https://dig.watch/updates/china-ai-driven-scientific-research-platform`、官方站 `https://www.scienceone.cn/index-en.html`、系统图文章 `https://www.the-innovation.org/article/doi/10.59717/j.xinn-inform.2026.100050` 和 S1-VL 技术报告 `https://arxiv.org/abs/2604.21409`。*

ScienceOne 100 的关键不是把一个通用聊天模型改名为科学模型，而是把“科学知识表征、科学数据理解、工具调用、研究流程管理”放进同一个操作系统式平台。官方站将其描述为可理解波形、谱图和场数据的科学基础模型，并强调四类能力：多模态科学数据专业理解、科学文献萃取融合、科学知识表征推理、科学工具编排规划。

可以把 ScienceOne 100 看成三层结构。底层是科学基础模型与异构专家路由，负责把文本、公式、图像、谱图、场数据等输入转成可推理表示；中层是学科和任务专家，例如文献、数字细胞、粒子物理、晶体材料、谱图解读；上层是工作流智能体，用于完成“检索文献 - 形成假设 - 调用工具 - 运行仿真 - 解释结果 - 生成报告”的闭环。

##### 平台执行流程伪代码

```python
# ScienceOne 100 的高层工作流伪代码
def scienceone_research_loop(user_goal, scientific_assets):
    task_graph = planner.decompose(user_goal)
    memory = EvidenceStore()

    for task in task_graph:
        modality = detect_modality(task, scientific_assets)
        expert = router.select_expert(
            task=task,
            modality=modality,
            candidates=["literature", "spectrum", "field", "biology", "simulation", "general_llm"],
        )

        if task.requires_external_tool:
            tool = toolchain.match(task, constraints=task.safety_and_reproducibility)
            result = tool.run(inputs=scientific_assets, params=task.params)
        else:
            result = expert.infer(task, context=memory.retrieve(task))

        checked = verifier.cross_check(result, evidence=memory)
        memory.add(task, checked)

    return report_writer.synthesize(memory, citation_required=True)
```

这个伪代码强调两个机制。第一，路由不是单纯按关键词分发，而是根据任务、数据模态和工具需求选择专家模型或科学工具。第二，科研任务天然是多轮闭环，系统需要把中间证据、工具输出和模型判断写回记忆，再由验证器交叉检查，降低科学场景中的幻觉风险。

##### 异构 MoE：为什么科学平台需要专家路由

通用大模型擅长自然语言，但科学研究中的输入经常是非自然语言对象，例如质谱峰、遥感多光谱图像、电磁场、蛋白质序列、微分方程和仿真日志。ScienceOne 官方站明确提到 heterogeneous mixture-of-experts 架构，其直觉是用一个路由器决定“该交给哪个专家处理”，而不是要求单一模型同时掌握所有科学数据类型。

可以将路由写成：

$$
p(e \mid x, q)=\operatorname{softmax}(W_r \phi(x, q))_e
$$

$$
y=\sum_{e \in \mathcal{E}} p(e \mid x, q)\, f_e(x, q)
$$

其中 \(x\) 是科学数据，\(q\) 是用户任务，\(\phi\) 是任务和模态表征，\(f_e\) 是文献、谱图、场、生命科学、仿真等专家。对于高置信任务可以只激活 Top-\(k\) 专家：

$$
y=\sum_{e \in \operatorname{TopK}(p)} \tilde{p}_e f_e(x,q)
$$

这类设计的收益是参数和工具可以按学科扩展，推理时只调用必要专家，且新学科可以通过新增专家或工具协议接入，而不是重训整个平台。

##### 科学工作流中的工具编排

ScienceOne 与普通科学问答系统的差别在于它强调工具执行。官方站显示 S1-ToolChain 集成 300+ 科学工具和 30+ 专业模型，可用于数据处理、模型训练、特征分析等流程。对科研来说，这一步很关键：很多结论不能仅由语言模型生成，而要由数值求解器、分子模拟器、粒子物理分析程序或材料性质预测模型给出可复现实验结果。

工具选择可以建模为带约束优化：

$$
t^\*=\arg\max_{t \in \mathcal{T}}
\left[
s_{\text{match}}(t,q)
-\lambda_c C(t)
-\lambda_r R(t)
+\lambda_v V(t)
\right]
$$

其中 \(s_{\text{match}}\) 表示工具与任务的语义匹配，\(C(t)\) 是计算成本，\(R(t)\) 是失败或不可复现风险，\(V(t)\) 是输出可验证性。这个目标比“调用第一个看起来相关的工具”更适合科研场景，因为研究者需要稳定、可追溯、可复现的执行链。

##### S1-VL 对 ScienceOne 100 的方法补充

ScienceOne 100 的公开系统报道偏平台层，S1-VL arXiv 报告提供了更具体的模型训练机制。S1-VL 支持两种互补范式：Scientific Reasoning 使用结构化思维链处理多步科学问题；Thinking-with-Images 则允许模型在推理中生成并执行图像处理代码，获得裁剪、缩放、增强和标注后的中间图像，再继续多轮推理。

S1-VL 的四阶段训练可以概括为：

$$
\text{SFT}_{\text{sci}}
\rightarrow
\text{SFT}_{\text{TwI}}
\rightarrow
\text{RL}_{\text{sci}}
\rightarrow
\text{RL}_{\text{TwI}}
$$

对应流程是：先用跨数学、物理、化学、天文、地理、生物的科学多模态数据做监督微调；再用 Thinking-with-Images 数据让模型学会何时进行图像操作；之后通过强化学习优化科学推理；最后进一步优化图像操作的调用时机和质量。

```python
# S1-VL Thinking-with-Images 的简化机制
def think_with_images(question, image):
    visual_context = [image]
    trace = []

    while True:
        action = vlm.next_action(question, visual_context, trace)
        if action.type == "final_answer":
            return action.answer
        if action.type == "image_code":
            # 例如 crop / zoom / contrast enhancement / annotation
            new_image = sandbox.execute(action.python_code, visual_context[-1])
            visual_context.append(new_image)
            trace.append((action.reason, new_image))
        else:
            trace.append(action.reason)
```

这种机制适合科学图表、显微图像和遥感图像，因为关键信息往往只出现在局部区域。传统 VLM 一次性把整张图压成视觉 token，容易丢失局部细节；主动图像操作相当于让模型在推理过程中重新采样信息。

##### 与传统科研 AI 工具的区别

传统工具通常是单点能力：文献检索系统只找论文，仿真平台只运行模型，通用大模型只生成文本，领域模型只处理固定数据类型。ScienceOne 100 的创新在于把这些能力组织成一个可路由、可编排、可验证的平台。它不只是“更懂科学的聊天机器人”，而是把模型和工具放进一个任务图中运行。

> 💡 关键：ScienceOne 100 的“100”应理解为覆盖 100+ 科研场景的平台化目标；方法核心是异构专家路由、科学多模态理解、证据交叉检查和工具链编排，而不是单一架构组件。

#### 🧪 练习题

```yaml
question: "ScienceOne 100 相比普通通用大模型的核心技术差异是什么？"
options:
  - "只扩大参数量并直接生成科研报告"
  - "用异构专家路由和工具编排把科学数据理解、文献分析、仿真执行和结果验证组织成平台化流程"
  - "只依赖人工编写规则库回答科学问题"
  - "完全取消领域模型，仅保留一个统一聊天入口"
answer: 1
explain: "ScienceOne 100 的重点是平台化 AI for Science：根据任务和模态路由到专家模型或科学工具，并通过工作流和证据检查支撑完整科研周期。"
```
