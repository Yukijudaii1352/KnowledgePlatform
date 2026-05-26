### X-SAM

```yaml
id: xsam
name: X-SAM
full_name: "任意分割模型 (X-SAM)"
year: "2026.03"
org: "中山大学 / 美团 / 鹏城实验室"
paper_url: "https://ojs.aaai.org/index.php/AAAI/article/view/39822"
category: segmentation
parent: sam2
motivation: "任意分割交互式全实例"
```

#### 📝 一句话总结
X-SAM 把 SAM 从“给定提示做单类分割”扩展为“统一处理任意分割任务”的多模态框架，通过双编码器、统一查询接口和 Mask2Former 风格解码器，把开放词汇、指代、推理、交互和视觉指向分割放进同一个模型里。

#### 🎯 核心要点
- 把多种分割任务统一为文本查询和视觉查询两类输入范式。
- 采用 SigLIP2 提供语义视觉特征，SAM-L 提供细粒度空间分割特征。
- 用 `<SEG>` 令牌触发分割解码，将 LLM 的语义理解直接传给掩码生成器。
- 分割头改成 Mask2Former 风格的多尺度掩码解码器，支持多实例输出。
- 提出 VGD 任务，要求根据视觉提示分割图中所有同类实例，而不是只分一个对象。

#### 🔬 深入细节

![X-SAM 架构图](https://ar5iv.labs.arxiv.org/html/2508.04655v2/assets/figures/fig2_arch.png)
*图：X-SAM 同时接收语义编码器和分割编码器的特征，再由 LLM 生成 `<SEG>` 查询触发统一分割解码。*

```python
# X-SAM 推理伪代码
img_feat = siglip2_encoder(image)
seg_feat = sam_encoder(image)
visual_tokens = concat(project_img(img_feat), project_seg(seg_feat))
prompt_tokens = tokenize(query)                  # 文本查询或 <region> 视觉查询
llm_out = llm(concat(visual_tokens, prompt_tokens))
seg_queries = extract_seg_tokens(llm_out)
masks = mask_decoder(seg_queries, multiscale(seg_feat))
return masks
```

X-SAM 的问题意识来自一个现实割裂：SAM 很强，但它更像一个“交互式掩码工具”；而多模态大模型虽然理解语言和视觉语义，但往往缺乏像素级输出能力。论文想做的是把两者拼起来，而且不是针对某一种任务拼，而是做成一个统一接口。

统一接口的关键是输入格式。对于文本驱动任务，X-SAM 使用 `<p>...</p>` 包裹类别或描述，例如开放词汇和指代表达；对于视觉驱动任务，则使用 `<region>` 占位符，把点、框、涂鸦等提示编码成区域嵌入塞进上下文。LLM 在理解输入后输出 `<SEG>` 特殊令牌，后者被当成条件查询送入分割头。于是“语义理解”和“掩码生成”之间建立了显式桥梁。

结构上，SigLIP2 和 SAM-L 的双编码器设计也很有针对性。SigLIP2 更擅长高层语义对齐，适合理解文本描述和开放词汇概念；SAM-L 更擅长保留细粒度边界和几何结构。X-SAM 不尝试让一个编码器同时兼顾两件事，而是把两路特征投影后联合交给 LLM 和分割头。分割侧再利用像素洗牌构建多尺度特征，以适配 Mask2Former 式解码过程。

训练上，论文采用三阶段流程：先单独把分割器调稳，再做视觉-语言对齐，最后混合多类任务进行端到端微调。这样能避免一开始就把“像素级学习”和“语言对齐”混在一起导致训练不稳定。X-SAM 的意义在于，它把“分割”从单任务工具升级成了可由统一多模态语义接口驱动的通用能力模块。

#### 🧪 练习题
```yaml
question: "X-SAM 中 `<SEG>` 令牌最核心的作用是什么？"
options:
  - "替代图像编码器输出视觉 patch"
  - "作为 LLM 生成的条件查询，把语义理解传给分割解码器"
  - "只用于统计分割类别数量"
  - "充当位置编码"
answer: 1
explain: "X-SAM 让 LLM 输出 `<SEG>` 令牌，再用它作为条件查询触发掩码生成，从而把语言理解和像素分割接起来。"
```
