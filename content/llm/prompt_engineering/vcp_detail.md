### VCP：视觉条件提示 (Visual Conditional Prompts)
```yaml
id: vcp
name: VCP
full_name: 视觉条件提示 (Visual Conditional Prompts)
year: '2026.04'
org: Expert Systems
paper_url: https://www.sciencedirect.com/science/article/pii/S0957417426009905
category: frontier_2026
parent: promptmix
motivation: 视觉引导条件提示实现图文深度对齐
```

#### 📝 一句话总结
VCP 通过视觉特征生成实例相关的条件提示，并与语义条件提示和上下文提示融合，使视觉语言模型在未见类别上获得更细粒度的图文对齐。

#### 🎯 核心要点
- 公开 arXiv 版本对应 MuGCP：多模态互指导条件提示学习
- 使用多模态大模型生成 Semantic Conditional Prompts，补充类别语义
- Attention Mutual-Guidance 模块从视觉特征中生成 Visual Conditional Prompts
- Multi-Prompt Fusion 同时融合语义提示、视觉提示和可学习上下文提示
- 文本增强与一致性损失提升未见类别和跨域泛化
- 重点解决固定 prompt 无法适配每张图像实例的问题

#### 🔬 深入细节
![MuGCP / VCP 框架图](https://arxiv.org/html/2507.08410v1/extracted/6614324/OverView5.png)
*图源：arXiv HTML framework figure，展示 SCP、VCP、AMG 与 MPF 的整体流程。*

```python
# VCP / MuGCP 条件提示学习伪代码
def vcp_forward(image, class_names, clip_model, mllm, amg, mpf):
    visual_tokens = clip_model.encode_image_tokens(image)
    semantic_prompts = mllm.generate_semantic_conditional_prompts(class_names)

    visual_prompts = amg(
        visual_tokens=visual_tokens,
        semantic_prompts=semantic_prompts,
    )
    fused_prompts = mpf.combine(
        context_prompts=learnable_context_tokens(),
        semantic_prompts=semantic_prompts,
        visual_prompts=visual_prompts,
    )

    image_feature = clip_model.encode_image(image, prompts=visual_prompts)
    text_features = clip_model.encode_text(class_names, prompts=fused_prompts)
    logits = similarity(image_feature, text_features)
    return logits
```

传统 prompt learning 常用一组全局可学习上下文 token，同一类别或同一任务共享同一 prompt。这种方式对训练类有效，但对未见类别和分布偏移不够灵活。VCP 的核心是让 prompt 条件化于当前图像实例：不同图像可以触发不同视觉提示，从而捕捉姿态、局部区域、背景和细粒度属性差异。

SCP 和 VCP 分别提供两种条件信息。SCP 来自多模态大模型或语言知识，强调类别语义、属性和常识；VCP 来自视觉编码器内部特征，强调当前图像中实际出现的视觉证据。二者互补：语义提示告诉模型应该看什么，视觉提示告诉模型这张图像实际支持什么。

AMG 模块负责互指导。它不是单向地把文本加到图像或把图像加到文本，而是在跨层、跨模态特征之间建立注意力交互，使语义提示和视觉提示共同调整。这样可以减少文本描述与图像区域错配的问题。

MPF 将可学习上下文提示、语义条件提示和视觉条件提示融合后送入 CLIP 类编码器。训练中再配合文本增强和一致性损失，约束不同增强视角下预测稳定。相比 PromptMix 偏重语义属性混合，VCP 更强调实例级视觉条件化，因此对细粒度分类和跨域泛化更有意义。

#### 🧪 练习题
```yaml
question: "VCP 相比固定上下文 prompt 的核心优势是什么？"
options:
  - "可以根据当前图像实例生成视觉条件提示"
  - "完全不需要图像编码器"
  - "只依赖类别名称，不使用视觉特征"
  - "把所有类别合并成一个标签"
answer: 0
explain: "VCP 利用图像特征产生实例相关提示，使图文对齐能随输入图像动态变化。"
```
