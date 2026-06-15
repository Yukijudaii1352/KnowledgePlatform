### MindJourney — 心智旅程 (Test-time Scaling with World Models)

```yaml
id: mindjourney
name: MindJourney
full_name: "心智旅程 (Test-time Scaling with World Models)"
year: "2026.03"
org: "Shanghai Jiao Tong University"
paper_url: "https://proceedings.neurips.cc/paper/2026/mindjourney"
category: "embodied"
parent: "vjepa21"
motivation: "推理阶段利用世界模型增强空间推理"
```

#### 📝 一句话总结

MindJourney 提出测试时世界模型扩展框架，让 VLM 在回答空间推理问题前主动规划相机轨迹、调用可控视频世界模型生成新视角，并基于多视角证据作答，解决单图 VLM 缺乏 3D 内部动态模型的问题。清单中的 NeurIPS 2026 链接疑似占位符；本精读依据可访问论文 arXiv:2507.12508v2 与项目页整理。

#### 🎯 核心要点

- 不微调 VLM，只在测试时把 VLM 与可控视频扩散 world model 组合，实现 plug-and-play 的 spatial reasoning 增强。
- 将空间推理转化为“3D imagination space”中的主动搜索：VLM 选择短相机轨迹，世界模型渲染对应新视角。
- 提出 Spatial Beam Search：用探索分数更新 beam，用有用性分数把关键视角缓存到 evidence buffer。
- 支持不同世界模型，包括 Stable Virtual Camera (SVC) 和作者训练的 Search World Model (SWM)。
- SWM 基于 Wan2.2-TI2V-5B/ReCamMaster 思路，使用 Habitat 合成几何控制数据，并混合 RealEstate-10K、DL3DV-10K 缩小外观域差距。
- 在 SAT 空间推理基准上无需微调带来约 7.7%/8% 平均提升，并能增强 GPT-4o、GPT-4.1、InternVL3、o1 等不同 VLM。

#### 🔬 深入细节

![MindJourney 流程图](https://arxiv.org/html/2507.12508v2/figure/pipeline.png)
*图：MindJourney 让 VLM 在测试时控制世界模型扩展视角，并把有用观测汇总为最终回答证据。*

```python
# MindJourney Spatial Beam Search 伪代码
def mindjourney_answer(image, question, vlm, world_model, actions, depth, beam_width):
    beam = [(empty_trajectory(), image)]
    evidence = []

    for step in range(depth):
        candidates = []
        for traj, obs in beam:
            for action_seq in expand(actions):
                new_traj = traj + action_seq
                frames = world_model.render(image, camera_trajectory=new_traj)
                candidates.append((new_traj, frames))

        # VLM 同时评估：是否值得继续探索、是否值得保存为证据
        scored = vlm.score_candidates(question, candidates)
        beam = topk(scored, key="exploration_score", k=beam_width)
        evidence.extend(topk(scored, key="helpfulness_score", k=K_help))

        if len(beam) == 0:
            break

    return vlm.answer(question, evidence)
```

MindJourney 的出发点是：很多空间题并非语言推理不够，而是单张图像缺少必要视角。例如“从当前位置向右转后能否看到某物”“哪个物体在目标背后”“沿某方向移动后目标相对位置如何变化”，人类会在脑中模拟视角变换，而普通 VLM 只能基于当前 2D 投影猜测。

因此 MindJourney 把测试时计算从“生成更多文字 token”扩展为“生成更多视觉证据”。给定初始图像 \(I_0\)、问题 \(q\)、动作集合 \(\mathcal{A}\) 和世界模型 \(W\)，候选轨迹 \(\tau=(a_1,\dots,a_H)\) 生成新视角：

$$
\hat I_{1:H} = W(I_0, \tau).
$$

VLM 不直接回答，而是先对 \((\tau,\hat I)\) 评分：一个分数衡量是否继续沿该轨迹探索，另一个分数衡量该视角是否应该进入证据缓存。搜索更新可以写成：

$$
B_{t+1}=\mathrm{TopK}_{\text{explore}}\{(\tau,\hat I)\},
\qquad
E \leftarrow E \cup \mathrm{TopK}_{\text{help}}\{(\tau,\hat I)\}.
$$

最后，VLM 接收原问题、轨迹自然语言描述和 evidence buffer 中的多视角图像，输出答案。这个流程让 VLM 的高层语义判断负责“往哪里看”和“哪些视角有用”，而世界模型负责低层几何想象。

SWM 的训练体现了任务约束带来的简化：MindJourney 不需要生成任意动作视频，只需要执行有限的 egocentric primitive actions，如前进、后退、左右转。作者用 Habitat 2.0 合成大量几何精确的室内导航 clips，再混合 RealEstate-10K 和 DL3DV-10K 这类真实多视角视频数据，让模型既学到相机控制，也保留真实外观多样性。

与传统视觉提示或 CoT prompting 相比，MindJourney 的核心区别是它引入了外部可控世界模型作为“可查询环境”。与训练一个新 VLM 相比，它完全发生在测试时，可以叠加到强闭源模型或开源模型上。论文在 SAT-Real 表中报告 GPT-4o 从 60.3 提升到 70.6（搭配 SWM），说明多视角想象对真实图像空间题有直接收益。

局限也很明确：世界模型若生成错误几何或幻觉视角，VLM 可能把错误证据当真；搜索也会增加推理成本。MindJourney 的贡献不是证明世界模型已完美，而是展示一种通用接口：让 VLM 通过动作条件视觉想象扩展测试时计算。

#### 🧪 练习题

```yaml
question: "MindJourney 的 Spatial Beam Search 中 evidence buffer 的作用是什么？"
options:
  - "保存训练梯度，供后续微调 VLM"
  - "缓存被 VLM 判断为有助于回答问题的新视角证据"
  - "记录所有被剪枝的错误答案"
  - "替代世界模型生成相机轨迹"
answer: 1
explain: "搜索过程中 VLM 会给候选新视角打 helpfulness 分数，高分视角进入 evidence buffer，最终回答时作为多视角证据输入。"
```
