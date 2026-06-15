### Visual CoT — 视觉思维链数据集 (Visual Chain-of-Thought Dataset)

```yaml
id: visual_cot
name: Visual CoT
full_name: "视觉思维链数据集 (Visual Chain-of-Thought Dataset)"
year: "2024"
org: "NTU"
paper_url: "https://proceedings.neurips.cc/paper_files/paper/2024/hash/0ff38d72a2e0aa6dbe42de83a17b2223-Abstract-Datasets_and_Benchmarks_Track.html"
category: mm_cot
parent: "mm_cot"
motivation: "首个综合视觉CoT数据集，定义标注规范"
```

#### 📝 一句话总结

Visual CoT 提出大规模视觉思维链数据集和 VisCoT 基线，让 MLLM 先定位回答问题所需的关键图像区域，再裁剪放大局部信息生成答案，解决固定低分辨率视觉 token 容易丢失小目标、文字和细粒度证据的问题。

#### 🎯 核心要点

- 构建 438k 个带关键区域 bounding box 的视觉 CoT 问答样本，其中约 98k 样本包含详细推理步骤
- 覆盖 Text/Doc、Chart、General VQA、Relation Reasoning、Fine-Grained Understanding 五类视觉推理场景
- 数据标注以“问题-答案-关键区域框”为核心，部分样本加入自然语言逐步推理，形成可监督的视觉聚焦过程
- 提出 VisCoT 多轮处理流程：全图编码 → 预测关键区域框 → Visual Sampler 裁剪局部 → 全局和局部 token 联合回答
- Visual Sampler 以 bbox 中心为基准裁剪正方形区域，并保证最小裁剪范围以适配 CLIP 视觉编码器
- 引入 Visual CoT benchmark，专门评估模型在需要定位局部证据时的视觉推理能力

#### 🔬 深入细节

##### 核心示意图

![Visual CoT 数据集示例](https://arxiv.org/html/2403.16999v2/x1.png)
*图：Visual CoT 覆盖图表、文档/文字、通用 VQA、细粒度识别和关系推理，每个样本标出回答所需的关键区域。*

![VisCoT 推理框架](https://arxiv.org/html/2403.16999v2/x3.png)
*图：VisCoT 先用全图视觉 token 预测关键区域，再对局部区域重新编码，最后联合全局与局部证据回答。*

##### 算法伪代码

```python
# VisCoT 两阶段视觉思维链推理
def viscot_inference(image, question, mlm, vision_encoder, projector):
    global_feat = projector(vision_encoder(image))

    # 第一轮：让模型输出最有助于回答问题的关键区域
    bbox_prompt = question + " Please provide the bounding box coordinate of the region that can help you answer the question better."
    bbox = mlm.generate_bbox(global_feat, bbox_prompt)  # [x1, y1, x2, y2]

    # Visual Sampler：根据 bbox 裁剪并放大局部区域
    crop = visual_sampler(image, bbox, input_resolution=vision_encoder.resolution)
    local_feat = projector(vision_encoder(crop))

    # 第二轮：全局 + 局部视觉 token 一起进入 MLLM
    answer = mlm.generate_answer([global_feat, local_feat], question)
    return answer, bbox
```

##### 动机与背景

传统 MLLM 通常把整张图像缩放到固定分辨率，再送入 CLIP 或类似视觉编码器。这个流程对全局语义足够，但对收据里的小字、图表中的局部数字、鸟类细粒度纹理或空间关系中的小目标很脆弱：关键信息在缩放后可能只占少数 patch，模型只能从低分辨率全图中猜测答案。

Visual CoT 的核心判断是：复杂视觉问答不只需要语言 CoT，还需要“视觉注意路径”的监督。数据集中每个样本不仅有答案，还标注了能够支撑答案的关键 bbox；这使模型可以学习“回答前应该看哪里”，从而把不可解释的全图一次性回答拆成可检查的定位和回答两步。

##### Visual Sampler 与局部重编码

给定模型预测的边界框 \([x_1,y_1,x_2,y_2]\)，Visual Sampler 先计算中心点和半宽半高：

$$
c_x=\frac{x_1+x_2}{2}, \quad c_y=\frac{y_1+y_2}{2}
$$

$$
w_h=\frac{x_2-x_1}{2}, \quad h_h=\frac{y_2-y_1}{2}
$$

为了适配正方形视觉编码器输入，它取 \(\max(w_h,h_h,r/2)\) 作为裁剪半边长，其中 \(r\) 是视觉编码器输入分辨率。这样既避免 bbox 过窄导致上下文不足，也避免随意放大一个极小区域造成模糊。

> 💡 关键：Visual CoT 不是额外接一个检测器，而是让 MLLM 自己生成 bbox；检测/OCR 模型主要用于构建监督数据，推理时核心流程仍是 MLLM + 视觉编码器。

##### 训练与推理流程

训练时，VisCoT 基线沿用 LLaVA-1.5 式结构：第一阶段冻结视觉编码器和 LLM，只训练图文投影；第二阶段对指令数据和 Visual CoT 数据进行微调。对带 CoT 标注的数据，模型学习先输出关键区域坐标，再基于局部裁剪生成答案；对没有 CoT 标注的数据，模型仍可直接执行普通 VQA。

推理时用户可以选择是否启用视觉 CoT。启用时，模型在答案前先生成关键区域 bbox，系统用 bbox 裁剪原图并重新编码，再把 \(H_0\)（全图特征）与 \(H_1\)（局部特征）拼接给 LLM：

$$
\text{answer}=f_{\theta}([H_0;H_1], q)
$$

这与简单提高全图分辨率不同。提高分辨率会让 token 数按面积增长，而 Visual CoT 只增加一个局部视角，因此更像“主动变焦”：先用低成本全局理解定位，再把计算集中到最有信息量的位置。

##### 与传统 CoT 的区别

文本 CoT 主要把推理路径写成自然语言，但如果模型一开始没有看清视觉证据，语言推理会放大幻觉。Visual CoT 把中间步骤改为可验证的视觉区域框，使推理链直接锚定图像证据。相比 VisProg/ViperGPT 这类外部工具调用方法，VisCoT 更偏数据监督和端到端 MLLM 能力注入，不要求 LLM 生成可执行程序。

#### 🧪 练习题

```yaml
question: "Visual CoT 中先预测 bbox 再裁剪局部区域的主要目的是什么？"
options:
  - "减少语言模型参数量"
  - "让模型聚焦回答所需的小区域或细节证据，而不是只依赖低分辨率全图"
  - "把所有视觉任务统一转换为图像分类"
  - "用随机裁剪增加数据增强强度"
answer: 1
explain: "Visual CoT 的关键是先定位支持答案的视觉证据，再重新编码局部区域，从而缓解小目标、文字和细粒度区域在全图缩放中丢失的问题。"
```
