### CoW — 轮上 CLIP 的语言驱动零样本目标导航 (CLIP on Wheels)

```yaml
id: "cow"
name: "CoW"
full_name: "轮上CLIP (CLIP on Wheels)"
year: "2023"
org: "U.Washington"
paper_url: "http://openaccess.thecvf.com/content/CVPR2023/html/Gadre_CoWs_on_Pasture_Baselines_and_Benchmarks_for_Language-Driven_Zero-Shot_Object_CVPR_2023_paper.html"
category: "object_navigation"
parent: "poni"
motivation: "CLIP零样本开放词汇导航"
```

#### 📝 一句话总结

CoW 把开放词汇视觉模型接到移动机器人探索与建图栈上，提出 language-driven zero-shot object navigation 的一组强基线和 Pasture benchmark，用于评估机器人能否无导航训练地寻找自然语言描述的目标。

#### 🎯 核心要点

- **L-ZSON 任务定义**：目标不再只是固定类别标签，而是可包含属性、空间关系和罕见物体的自然语言描述。
- **CoW 基线框架**：探索策略负责获得多视角观测，开放词汇定位器判断目标是否在视野中，深度地图把目标置信度回投到可导航地图。
- **多种定位器比较**：评估 CLIP 全图/patch/gradient relevance、MDETR segmentation、OWL-ViT detection 等开放词汇目标定位方式。
- **探索策略解耦**：既测试不需训练的 frontier-based exploration，也测试 CLIP backbone + GRU 的学习式探索。
- **Pasture benchmark**：覆盖 uncommon objects、appearance descriptions、spatial descriptions、distractors、hidden objects 等更接近真实人类查询的场景。
- **关键结论**：简单 CoW 无需目标域导航训练，在部分设定中接近或超过需要大量训练的 ZSON 方法，但对复杂语言关系利用仍有限。

#### 🔬 深入细节

##### 框架图

![CoW 框架图](https://ar5iv.labs.arxiv.org/html/2203.10421/assets/x2.png)
*图：CLIP on Wheels 概览。机器人一边探索，一边用开放词汇定位器判断语言目标是否在当前观测中；置信区域被回投到 top-down map 后作为导航目标。*

##### 算法伪代码

```python
# CoW: language-driven zero-shot object navigation
topdown_map = OccupancyMap(resolution=0.125)
target_score_map = zeros_like(topdown_map)

while not timeout:
    rgb, depth, pose = observe()
    topdown_map.integrate_depth(depth, pose)

    # 开放词汇定位：CLIP / MDETR / OWL-ViT 等都可替换
    relevance = object_localizer(rgb, text_goal)
    mask = threshold(relevance)
    points_3d = back_project(mask, depth, pose)
    target_score_map.update_with_max(points_3d, relevance)

    if max(target_score_map) > confidence_threshold:
        goal = argmax(target_score_map)
    else:
        goal = exploration_policy.select_frontier(topdown_map)

    path = shortest_path(topdown_map, goal)
    action = local_controller(path)
    execute(action)

    if close_to_projected_target(goal) and target_visible(rgb, text_goal):
        execute("stop")
        break
```

##### 方法拆解

CoW 的出发点是现实机器人用户不会只说“chair”或“plant”，而会说“brown mug on the table”“toy airplane”“plant near the dresser”。传统 ObjectNav 与多数 ZSON 设置把目标限制成固定类别，导致方法可以依赖训练集中见过的类嵌入或环境分布。CoW 将问题推进到 L-ZSON：目标由自由文本描述给出，机器人在测试时不应接受目标域导航训练。

系统结构刻意简单：移动端只需要 RGB-D、位姿近似和一个可替换的开放词汇目标定位器。每一步，深度图被投影到地面平面形成占据地图；语言定位器在图像上输出目标相关区域；相关区域再借助深度回投到地图坐标，形成 target score map。若目标置信度足够高，机器人规划到最高分位置；否则继续执行探索策略。

开放词汇定位是 CoW 的核心变量。CLIP 可以用“图像 patch 与文本嵌入相似度”给出局部相关性，也可以用 referring expression 模板让文本描述图像区域，例如“目标在图像左上角”。ViT 解释方法可用梯度 relevance 产生更像热力图的目标区域，MDETR 与 OWL-ViT 则直接提供文本条件检测或分割。统一到导航栈后，这些方法都变成二维 relevance mask：

$$s_i=\cos\left(f_{\text{vision}}(r_i), f_{\text{text}}(q)\right)$$

其中 \(r_i\) 是图像区域或 patch，\(q\) 是语言目标。得分超过阈值的区域被认为可能包含目标，再通过深度回投进入地图。

CoW 的探索模块也保持可替换。Frontier-based exploration 完全不需要训练，只朝已知 free space 与未知区域的边界移动；学习式探索用冻结 CLIP backbone、GRU 和 actor-critic 训练，尝试获得更好的视角覆盖。论文的重要发现是：在零样本设定下，强开放词汇定位器加简单探索已经很有竞争力，说明目标导航系统的瓶颈不总是端到端策略学习。

Pasture benchmark 是论文的另一项贡献。它不是只测常见类别，而是加入罕见物体、带颜色/材质/大小属性的物体、带空间关系描述的目标、视觉 distractor 和隐藏目标。结果显示 CoW 对罕见物体和简单属性有一定能力，但对语言中的空间关系与隐藏关系利用不足，因为 CLIP 风格的相似度并不等价于可组合的关系推理。

> ⚠️ 注意：CoW 是一组基线与评测协议，不是单个固定网络。它的价值在于把开放词汇感知、探索策略和地图回投接口标准化，从而暴露“视觉语言定位能否真正驱动导航”的问题。

#### 🧪 练习题

```yaml
question: "CoW 中开放词汇定位器输出的图像相关性为什么需要回投到 top-down map？"
options:
  - "为了把语言描述翻译成固定类别编号"
  - "为了把当前视角下的目标证据转成可规划的空间目标位置"
  - "为了训练 CLIP 的图像编码器"
  - "为了避免使用深度传感器"
answer: 1
explain: "图像 relevance 只说明目标在当前画面哪里，机器人还需要地图坐标才能规划移动。CoW 用深度和位姿将高相关区域回投到 top-down map。"
```
