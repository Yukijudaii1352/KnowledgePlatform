### RynnBrain

```yaml
id: rynnbrain
name: RynnBrain
full_name: "开源具身基础模型 (RynnBrain)"
year: "2026.02"
org: "多机构"
paper_url: "https://arxiv.org/abs/2602.14979"
category: multimodal
parent: dinov2
motivation: "开源具身感知基础模型"
```

#### 📝 一句话总结
RynnBrain 试图把具身认知、空间定位和任务规划统一进一个开源视觉语言基础模型里，通过统一坐标 token 表示、大规模具身数据预训练和规则奖励强化学习，形成面向 embodied 场景的通用感知与规划底座。

#### 🎯 核心要点
- 基于 decoder-only VLM，把图像和视频统一成帧序列输入。
- 将 bbox、点、区域和轨迹都量化为离散坐标 token，由模型自回归生成。
- 预训练数据同时覆盖通用视觉理解、空间定位、affordance 和操作规划。
- 提出 Chain-of-Perception，把推理链中的实体显式锚定到帧和空间位置。
- 使用 GRPO 和规则奖励优化轨迹、区域和空间决策质量。

#### 🔬 深入细节

![RynnBrain 任务与模型示意图](https://arxiv.org/html/2602.14979v1/x1.png)
*图：RynnBrain 试图把感知、定位、规划和动作相关输出统一到一个视觉语言建模框架里。*

```python
# RynnBrain 统一输出形式
video_tokens = vision_encoder(frames)
hidden = llm(video_tokens, instruction)

# 统一离散坐标输出
response = """
<object> <frame 3>: (214, 420), (650, 882) </object>
<area> <frame 4>: (120,210), (180,240), (175,330) </area>
"""
```

RynnBrain 的设计目标很明确：如果一个模型要在具身场景里真正可用，它不能只会看图说话，还得同时具备“找到物体在哪里”“判断什么位置可操作”“规划接下来怎么做”这些能力。论文因此没有把 embodied tasks 当成若干互相独立的小 benchmark，而是尝试构建一个共享的表示与输出接口。

最关键的统一机制是离散坐标 token。传统做法往往会给 grounding、affordance、轨迹预测分别设计不同的回归头，而 RynnBrain 直接把空间坐标量化到统一整数区间，让 VLM 用 next-token prediction 方式生成。这么做的好处是接口统一、训练目标一致，也更方便和文本推理链结合；代价则是坐标精度受量化粒度限制，但在大多数 embodied 场景中这个代价是可接受的。

论文的另一个亮点是 Chain-of-Perception。普通 CoT 只在文本空间里展开推理，而 CoP 会把“这个花纹墙纸”“那个抓手”“该走向哪里”等中间实体显式落到具体帧和坐标上，例如 `<object> <frame 3>: ... </object>`。这样模型的推理不再只是语言上的自洽，而是被视觉证据绑定，能明显减少具身场景中的空间幻觉。

在优化层面，RynnBrain 使用 GRPO 这类组相对强化学习，并配合规则奖励而非学习型奖励模型，例如轨迹用 Fréchet distance、区域用 Chamfer distance、多边形区域用点内率评估。这类奖励设计的好处是目标直接、可验证，也更符合具身任务中“输出几何结构是否正确”的评价方式。整体上，这篇工作代表的是“把 embodied 能力看成基础模型原生能力”的路线，而不仅仅是后接一个导航或操作头。

#### 🧪 练习题
```yaml
question: "RynnBrain 采用离散坐标 token 统一空间输出，最直接的工程收益是什么？"
options:
  - "完全消除空间误差"
  - "让定位、区域和轨迹等任务都能复用同一种自回归生成接口，而不必为每个任务单独设计回归头"
  - "让模型不再需要视觉编码器"
  - "把视频输入长度压缩到常数"
answer: 1
explain: "RynnBrain 的核心做法是把不同空间输出统一成 token 序列，这样可以直接复用 VLM 的生成范式，而不是为每类空间任务分别造头。"
```
