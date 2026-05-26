### UniPixel

```yaml
id: unipixel
name: UniPixel
full_name: "统一像素级推理 (UniPixel)"
year: "2025.09"
org: "多机构"
paper_url: "https://arxiv.org/abs/2509.18094"
category: multimodal
parent: florence2
motivation: "像素推理融合MLLM"
```

#### 📝 一句话总结
UniPixel 通过对象记忆库把视觉指代、像素级分割和问答统一到一个多模态模型里，使模型既能理解“你指的是谁”，又能持续追踪并分割这个对象，从而完成更灵活的像素级推理。

#### 🎯 核心要点
- 统一处理 referring、segmentation 和 PixelQA，不再把“理解提示”和“生成掩码”拆成两个系统。
- 提出 Object Memory Bank，显式存储被引用对象的语义和视觉特征。
- 采用 Prompt Encoder 编码点、框、掩码等视觉提示，并与时间信息联合建模。
- 复用 SAM2.1 风格掩码解码器进行跨帧传播，支持视频级像素推理。
- 设计 `<REF>`、`<SEG>`、`<MEM>` 特殊 token，驱动对象引用、掩码生成和记忆读取。

#### 🔬 深入细节

![UniPixel 架构图](https://arxiv.org/html/2509.18094v4/x3.png)
*图：UniPixel 用对象记忆库把对象引用、掩码生成和后续推理串起来。*

```python
# UniPixel 核心流程
prompt_tokens = prompt_encoder(visual_prompt, time_index=t)
vlm_out = llm(video_tokens, text_query, prompt_tokens)

if "<REF>" in vlm_out:
    obj_state = build_object_state(vlm_out, visual_features)
    memory_bank.store(obj_id, obj_state)

if "<SEG>" in vlm_out:
    masks = sam2_decoder(video_features, memory_bank[obj_id])

if "<MEM>" in vlm_out:
    llm_context = inject(memory_bank[obj_id], llm_context)
```

很多早期多模态模型要么能做 referring，知道“用户在说哪个对象”；要么能做 segmentation，知道“怎么画出掩码”。UniPixel 的目标是把这两种能力真正合并，否则模型在复杂交互场景里只能做其中一半。比如给出一点视觉提示，再问“这个物体后来做了什么”，单纯的分割器或单纯的问答模型都不够。

论文的核心机制是 Object Memory Bank。模型在识别或分割某个对象后，不是把结果立即丢弃，而是以显式 slot 的形式存下来，包括引用 token、分割 token 和 mask-pooled 视觉特征。之后模型如果需要继续追踪、解释或回答与该对象有关的问题，就可以通过 `<MEM>` 读回对应对象的状态。这和普通 attention 的区别在于，它是结构化、持久化、按对象索引的记忆，而不是把所有 token 混在一个上下文窗口里。

Prompt Encoder 也很关键。点、框、区域掩码等视觉提示都会先被编码成统一 token 序列，并与时间位置联合建模，否则在视频里同样的空间坐标可能指向不同帧上的不同对象。论文因此把时间信息也编码进 prompt，使模型学会“第几帧的哪个位置”这一更精确的对象索引方式。

UniPixel 之所以能做 PixelQA，是因为它不把分割结果当最终输出，而把它当成推理中间状态。模型可以先理解提示对象，再生成分割掩码，再基于记忆中的对象特征输出文本答案。这个思路把“像素级 grounding”从工具能力提升成了多模态推理链的一部分，是它相比传统 MLLM 分割器更重要的地方。

#### 🧪 练习题
```yaml
question: "UniPixel 中 Object Memory Bank 的核心价值是什么？"
options:
  - "把所有对象都压缩成一个全局 token"
  - "显式保存被引用对象的状态，使模型能在后续轮次继续分割、追踪和回答相关问题"
  - "替代视频编码器做时序建模"
  - "只用于加速训练收敛"
answer: 1
explain: "Object Memory Bank 让对象信息可以被显式写入、读取和复用，因此模型能围绕同一个对象持续推理，而不是一次性输出后丢失状态。"
```
