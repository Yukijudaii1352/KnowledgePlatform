### Visual Thoughts — 视觉思维统一视角 (Visual Thoughts: Unified Perspective)

```yaml
id: visual_thoughts
name: Visual Thoughts
full_name: "视觉思维统一视角 (Visual Thoughts: Unified Perspective)"
year: "2026"
org: "Tsinghua"
paper_url: "https://proceedings.neurips.cc/paper_files/paper/2025/hash/8a57d66b8e0cc468dbb6574114f60f0c-Abstract-Conference.html"
category: "frontier_2026"
parent: "mvot"
motivation: "统一视觉思维框架，整合多种操作"
```

#### 📝 一句话总结

Visual Thoughts 提出一个统一解释框架：多模态 CoT 的收益并不来自“文本 CoT”或“图像 CoT”的形式本身，而来自推理链中显式承载视觉信息的 visual thoughts；其效果取决于视觉信息表达的清晰度、简洁度和与任务的相关性。

#### 🎯 核心要点

- **统一视角**：将 Textual-MCoT 与 Interleaved-MCoT 统一解释为 visual thoughts 在不同模态中的表达
- **视觉缓存假设**：visual thoughts 像任务相关视觉信息的 cache，避免后续推理反复从原始图像中检索所有细节
- **四类表达形式**：Natural Language、Structured Language、Edited Image、Generative Image
- **有效性验证**：去除 visual thoughts 会显著降低推理性能，甚至可能比只看问题更差
- **场景差异**：图像形式在复杂视觉信息传递上更强，文本形式在简单任务或结构化表达清晰时更高效
- **内部机制分析**：visual thoughts 作为输入图像与深层 transformer reasoning 之间的中介，促进视觉信息向更深层流动

#### 🔬 深入细节

##### 核心示意图

![Textual-MCoT 与 Interleaved-MCoT 对比](https://ar5iv.labs.arxiv.org/html/2505.15510/assets/x1.png)
*图：Visual Thoughts 将纯文本 rationale 和图文交错 rationale 都视为 visual thoughts 的不同表达。*

##### 动机与背景

多模态 CoT 领域长期存在一个争论：复杂视觉推理到底应该用文本中间步骤，还是应该生成/编辑中间图像？Textual-MCoT 使用图像描述、场景图或自然语言 rationale；Interleaved-MCoT 则在推理链中插入生成图、编辑图或工具处理图。两者在不同任务上各有优势，但缺少统一解释。

Visual Thoughts 的观点是：形式不是根因，真正起作用的是推理链中是否创建了任务相关的视觉中间表示。这个表示可以是文本，也可以是图像；它的作用是把原图中与问题相关的内容抽取出来，让后续 reasoning 不必每一步都重新访问完整原图。

论文把原始图像类比为外部存储，把 visual thoughts 类比为 cache。外部存储信息完整但访问成本高，cache 信息更少但与当前任务高度相关，能支撑更深、更快的推理。

![Visual Thoughts 缓存机制](https://ar5iv.labs.arxiv.org/html/2505.15510/assets/x2.png)
*图：没有 visual thoughts 时，模型需要反复从原图提取信息；有 visual thoughts 时，推理步骤可直接读取任务相关视觉缓存。*

##### 形式化定义

给定输入图像 \(I\)、问题 \(q\)、已有推理步骤 \(s_{<t}\)，visual thought \(v_t\) 是一个显式传递视觉信息的中间步骤：

$$v_t \sim p_\theta(v_t \mid I, q, s_{<t}, e)$$

其中 \(e\) 表示要求采用的表达形式，例如自然语言描述、结构化场景图、图像编辑结果或生成图。随后模型基于 visual thought 生成派生推理步骤：

$$s_t \sim p_\theta(s_t \mid q, s_{<t}, v_{\le t})$$

这一定义把“描述图片”“生成辅助图”“标注区域”“绘制几何图”都纳入同一个框架：它们都是把原始视觉输入转化为更适合当前推理的中间表达。

##### 四类 Visual Thought

![四类 Visual Thoughts](https://ar5iv.labs.arxiv.org/html/2505.15510/assets/x3.png)
*图：Visual Thoughts 分为文本表达的 N-LANG/S-LANG 和视觉表达的 E-IMG/G-IMG。*

**1. Natural Language (N-LANG)**  
模型先生成与问题相关的自然语言图像描述，再进行推理。例如先描述“左侧有两个苹果，右侧有三个苹果”，再计算总数。优点是实现简单、兼容所有 LVLM；缺点是可能漏掉细粒度视觉细节。

**2. Structured Language (S-LANG)**  
模型输出场景图、JSON、表格或结构化属性列表，再用结构化信息推理。它比自然语言更清晰，适合几何、图表、实体关系等需要约束表达的任务。

**3. Edited Image (E-IMG)**  
通过检测、分割、深度估计、标注、裁剪等工具处理原图，把任务相关区域显式呈现给模型。例如在图上标出目标物体或几何辅助线。它保留图像模态优势，但需要额外工具。

**4. Generative Image (G-IMG)**  
模型调用图像生成器绘制辅助图，例如根据函数表达式生成曲线图，或把文字题转换为几何示意图。它适合原图缺失或需要构造新视觉状态的任务，但成本更高且生成错误会传播。

##### 核心流程伪代码

```python
# Visual Thoughts 统一推理伪代码
def visual_thought_reason(vlm, image, question, mode):
    thoughts = []

    if mode == "N-LANG":
        thoughts.append(vlm.caption(image, question))
    elif mode == "S-LANG":
        thoughts.append(vlm.scene_graph(image, question))
    elif mode == "E-IMG":
        thoughts.append(run_visual_tool(image, question))  # segmentation / grounding / depth
    elif mode == "G-IMG":
        thoughts.append(generate_auxiliary_image(question))

    rationale = vlm.reason(
        image=image,
        question=question,
        visual_thoughts=thoughts,
    )
    return vlm.answer(rationale)
```

##### 为什么 Visual Thoughts 有效

论文的实验设计包括“保留 visual thoughts”“清空 visual thoughts”“用文字替换图像形式 visual thoughts”等对照。结果显示，清空 visual thought cache 后性能下降明显，说明模型并非只靠原图和最终问题就能完成多步推理；visual thoughts 在推理链中确实承载了可复用的视觉信息。

更重要的是，visual thoughts 的表达质量影响效果。清晰、简洁、与问题相关的表达最有效；冗长或含糊的描述会增加噪声；图像形式表达在复杂视觉关系上更强，但如果需要调用外部工具或生成模型，错误也会随链路传播。

论文还用 attention 与信息流分析解释内部机制：visual thoughts 让与任务相关的视觉信息更容易进入深层 transformer block，并成为后续 reasoning token 的主要条件之一。这比“每一步都重新看整张图”更接近显式工作记忆。

> 💡 关键：Visual Thoughts 不是一种单独算法，而是解释和设计多模态 CoT 的方法论；它告诉我们应该优化“视觉信息如何进入推理链”，而不是只争论文本链或图像链。

##### 与传统方法的区别

| 范式 | 中间步骤 | 典型问题 | Visual Thoughts 的解释 |
|---|---|---|---|
| Vanilla VLM | 直接回答 | 缺少显式视觉工作记忆 | 没有 visual thought cache |
| Textual-MCoT | 文本描述/场景图 | 细节可能被语言压缩 | 文本形态的 visual thoughts |
| Interleaved-MCoT | 图像编辑/生成 | 成本高、依赖工具 | 图像形态的 visual thoughts |
| Visual Thoughts | 任意清晰视觉中间表达 | 需要选择合适表达 | 按任务匹配 cache 形式 |

#### 🧪 练习题

```yaml
question: "Visual Thoughts 论文认为多模态 CoT 提升性能的核心原因是什么？"
options:
  - "模型输出越长，准确率一定越高"
  - "推理链中存在能承载任务相关视觉信息的中间表达，作为后续推理的缓存"
  - "所有任务都必须生成中间图像，文本 CoT 没有作用"
  - "只要调用外部视觉工具，就能避免所有幻觉"
answer: 1
explain: "论文把 visual thoughts 视为任务相关视觉信息的 cache；它可以是文本也可以是图像，关键在于清晰、简洁地把视觉信息传给后续推理。"
```
