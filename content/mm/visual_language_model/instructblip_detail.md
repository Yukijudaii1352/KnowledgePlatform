### InstructBLIP — 指令感知 Q-Former 驱动的通用视觉语言指令微调

```yaml
id: instructblip
name: InstructBLIP
year: '2023'
category: connector
institution: Salesforce
paper: NeurIPS 2023
motivation: 指令感知视觉特征提取
parent: blip2
description: 将文本指令输入Q-Former，引导查询关注与任务相关的视觉区域，在26个数据集上达到SOTA。
topic_id: visual_language_model
yaml_path: /mnt/dhwfile/raise/user/wanghaoyu/KnowledgePipeline/content/mm/visual_language_model.yaml
output_path: /mnt/dhwfile/raise/user/wanghaoyu/KnowledgePipeline/content/mm/visual_language_model/instructblip_detail.md
```

#### 📝 一句话总结

InstructBLIP 在 BLIP-2 的冻结视觉编码器、Q-Former、冻结 LLM 框架上引入“指令感知视觉特征提取”，让 Q-Former 同时读取图像和任务指令，从而为不同任务抽取不同的视觉证据并提升未见数据集与未见任务的零样本泛化。

#### 🎯 核心要点

- **指令输入 Q-Former**：文本指令不仅给 LLM，也输入 Q-Former，与 learnable query 通过 self-attention 交互，引导 query 抽取任务相关视觉特征。
- **继承 BLIP-2 模块化设计**：初始化自预训练 BLIP-2，冻结图像编码器和 LLM，视觉语言指令微调阶段主要更新 Q-Former。
- **26 个公开数据集统一为指令格式**：覆盖 11 类任务，划分 13 个 held-in 数据集用于训练和 13 个 held-out 数据集用于零样本评估。
- **任务级泛化评估更严格**：完全 hold out 视觉推理、视频问答、视觉对话、图像分类等任务类别，测试模型是否学会按自然语言指令迁移。
- **数据均衡采样**：按数据集大小平方根采样并手工微调部分权重，缓解多数据集混训中小数据集过拟合、大数据集欠训练的问题。
- **多种 LLM 适配**：基于同一 ViT-g/14 视觉编码器，评估 FlanT5-XL/XXL、Vicuna-7B/13B 等冻结 LLM，验证方法不是绑定单一语言模型。

#### 🔬 深入细节

##### 架构总览

![InstructBLIP 指令感知视觉特征提取架构](https://arxiv.org/html/2305.06500v2/x3.png)
*图：InstructBLIP 架构。图像经冻结视觉编码器输出视觉特征；指令 token 与 query 一起输入 Q-Former，Q-Former 输出经投影后作为 soft visual prompt 输入冻结 LLM。*

##### 核心流程伪代码

```python
# InstructBLIP instruction tuning sketch
vision_encoder.freeze()
llm.freeze()
q_former.load_from_blip2()

for image, instruction, answer, dataset_id in mixed_instruction_loader:
    image_feat = vision_encoder(image)

    # Instruction-aware visual feature extraction:
    # query tokens can self-attend with instruction tokens,
    # and query tokens cross-attend to frozen image features.
    q_tokens = learnable_queries(num_queries=32)
    q_out = q_former(
        query_tokens=q_tokens,
        image_features=image_feat,
        text_tokens=tokenize(instruction),
        cross_attention_to_image=True,
    )

    visual_prompt = linear_proj(q_out.query_states)
    llm_input = concat(visual_prompt, tokenize(instruction))
    logits = llm(llm_input, labels=tokenize(answer))
    loss = autoregressive_ce(logits, answer)

    update(q_former, loss)  # image encoder and LLM stay frozen

# Dataset balancing
sampling_prob[dataset_i] = sqrt(num_examples[dataset_i]) / sum_j sqrt(num_examples[dataset_j])
```

##### 方法解读

BLIP-2 的 query 在推理时对同一张图像通常抽取一组相对静态的视觉表示；但视觉语言指令微调的核心难点恰恰是“同图不同问”。同一张街景图，如果指令是“读出招牌文字”，模型需要关注 OCR 区域；如果指令是“判断是否会发生交通危险”，模型需要关注车辆、行人和空间关系。InstructBLIP 的关键改动是把 instruction token 送入 Q-Former，让 query 在抽取图像特征之前就知道当前任务目标。

形式上，令图像编码器输出为 \(V\)，learnable query 为 \(Q\)，指令 token 表示为 \(X\)。BLIP-2 更接近学习 \(Z=f_{\phi}(Q,V)\)，而 InstructBLIP 学习的是：

$$
Z=f_{\phi}(Q, X, V)
$$

其中 \(Q\) 与 \(X\) 通过 Q-Former 的 self-attention 交互，\(Q\) 再通过 cross-attention 读取 \(V\)。这意味着输出视觉 token \(Z\) 不再只是“图片摘要”，而是“针对当前指令筛选后的视觉证据”。随后 \(Z\) 被线性投影成 LLM 的 soft prompt，并与原始文本指令一起输入冻结 LLM 生成答案。

训练目标仍是标准语言建模损失。给定指令 \(x\)、图像 \(I\)、答案序列 \(y\)，模型最大化答案 token 的条件概率：

$$
\mathcal{L}_{\mathrm{IT}}=-\sum_{t=1}^{|y|}\log p_{\theta_{\mathrm{LLM}}}\left(y_t \mid \mathrm{Proj}(f_{\phi}(Q,x,\mathrm{Enc}(I))), x, y_{<t}\right)
$$

在这个损失中，\(\theta_{\mathrm{LLM}}\) 和视觉编码器参数被冻结，主要更新 \(\phi\)。这使 InstructBLIP 的训练成本仍接近 connector tuning，却能让视觉抽取过程对指令敏感。消融结果显示，去掉 instruction-aware visual features 后，ScienceQA、iVQA 等需要空间、常识或时序推理的任务下降更明显，说明指令确实在指导 query 抽取不同证据。

数据构造同样是论文贡献的一半。作者把 26 个公开数据集转换成自然语言指令格式，并为多数任务设计 10 到 15 个 instruction template；对涉及场景文字的数据，额外把 OCR tokens 放入指令中作为辅助信息。训练只用 13 个 held-in 数据集，评估包含 13 个 held-out 数据集，并且把若干任务类别整体排除在训练外。这种设置比普通“同任务不同数据集”的零样本评估更严格，因为模型必须从指令语义中推断任务行为。

多数据集混训容易出现优化不同步：如果均匀按样本采样，大数据集支配训练；如果均匀按数据集采样，小数据集会被反复看到。InstructBLIP 用平方根采样折中：

$$
p_i=\frac{\sqrt{n_i}}{\sum_j \sqrt{n_j}}
$$

其中 \(n_i\) 是第 \(i\) 个数据集的样本数。这个分布压低超大数据集权重、抬高小数据集权重，再通过少量手工调整处理 A-OKVQA、OKVQA 等任务形态差异。它不是架构创新，但对“26 数据集统一训练”这种设置非常关键。

与 LLaVA/MiniGPT-4 这类强调对话数据或单层投影的路线相比，InstructBLIP 更强调可控的视觉特征抽取：LLM 仍然负责语言生成和指令遵循，但 Q-Former 根据指令决定给 LLM 什么视觉 token。这一设计保留 BLIP-2 的参数效率，也解释了它在 caption、VQA、OCR、视频问答、视觉对话等分布差异很大的任务上能稳定提升。

> 💡 关键：InstructBLIP 的指令微调不是只把更多任务文本喂给 LLM，而是把指令前移到视觉抽取阶段，让“看什么”也由指令决定。

#### 🧪 练习题

```yaml
question: "InstructBLIP 中 instruction-aware Q-Former 的主要作用是什么？"
options:
  - "把冻结 LLM 改造成可以端到端更新的多模态 Transformer"
  - "让 query 在抽取视觉特征时读取任务指令，从图像中选择更相关的证据"
  - "用 OCR tokens 完全替代图像特征，降低视觉编码器成本"
  - "把 26 个数据集合并成一个无指令的分类任务"
answer: 1
explain: "InstructBLIP 将指令 token 输入 Q-Former，使 query 与指令交互后再通过交叉注意力读取图像特征；图像编码器和 LLM 仍保持冻结。"
```
