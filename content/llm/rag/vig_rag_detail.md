### ViG-RAG：视频图谱检索增强生成

```yaml
id: vig_rag
name: ViG-RAG
full_name: 视频图谱RAG (Video Graph RAG)
year: '2026.02'
org: Seoul National University
paper_url: https://ojs.aaai.org/index.php/AAAI/article/view/30471
category: frontier_2026
parent: graphrag
motivation: 概率时间知识图谱实现视频片段语义时间混合推理
```

#### 📝 一句话总结

ViG-RAG 为长视频构建带时间戳和置信度的概率时间知识图谱（PTKG），再用语义-时间双层检索、GMM 自适应筛选和 VLM 证据融合生成答案，解决长视频 RAG 中片段割裂、时间关系缺失和静态文本匹配不准的问题。

#### 🎯 核心要点

- **实际论文页**：manifest 中 AAAI `30471` 是语音增强学生摘要；ViG-RAG 实际 AAAI 2026 页面为 `https://ojs.aaai.org/index.php/AAAI/article/view/36963`。
- **PTKG 表示**：事实以 \((h,r,t,\tau,p)\) 表示，额外包含时间标记和置信度。
- **多模态内容抽取**：视频切片后抽取 ASR、采样帧和 VLM caption，再由 LLM 抽取实体、关系、时间、置信度。
- **语义-时间双层检索**：Text-F 判断语义相关，Temp-F 判断时间一致和长程依赖。
- **GMM 动态 Top-K**：根据相似度分布自适应区分高置信候选，避免手工阈值。
- **插件式增强**：可作为辅助模块接入 Video-LLaVA、LongVA、Qwen2-VL、LLaVA-Video 等 LVLM。

#### 🔬 深入细节

![ViG-RAG 官方 PDF 图源](https://ojs.aaai.org/index.php/AAAI/article/download/36963/40925)

*图源：AAAI 2026 官方 PDF，Figure 2 展示 ViG-RAG 将视频转成 PTKG，并通过语义-时间检索和 query-aware generation 生成答案。*

```python
def build_ptkg(videos, asr, vlm, llm):
    ptkg = []
    for video in videos:
        for segment in split_video(video, seconds=30):
            transcript = asr(segment.audio)
            frames = sample_frames(segment, k=10)
            caption = vlm.describe(frames, transcript)
            facts = llm.extract_quintuples(caption, transcript)
            # fact = (head, relation, tail, timestamp, plausibility)
            ptkg.extend(facts)
    return merge_cross_video_facts(ptkg)

def vig_rag_query(query, ptkg, visual_index, lvml):
    textual_candidates = retrieve_by_entities_and_anchors(query, ptkg)
    scored = []
    for segment in textual_candidates:
        sem = text_f(segment, query)
        temp = temp_f(segment, query, ptkg)
        scored.append((alpha * sem + (1 - alpha) * temp, segment))

    selected = gmm_select_high_confidence(scored)
    frames = retrieve_visual_frames(query, selected, visual_index)
    return lvml.generate(query, semantic_anchors=selected, frames=frames)
```

ViG-RAG 的核心是把视频片段从孤立 chunk 变成带时间和不确定性的图事实。普通视频 RAG 可能只把 transcript 或 caption 当文本检索，无法表达“某实体在某时间段做了什么，置信度多高”。PTKG 用 \((h,r,t,\tau,p)\) 同时编码关系、时间和 plausibility，更适合视频中事件随时间展开的场景。

索引阶段先把长视频切成固定片段，提取语音转写和视觉描述。LLM 随后从每个片段中抽取实体、关系、时间信息和置信分数，合并成跨视频 PTKG。这个图既是文本检索索引，也是时间推理结构，使模型可以沿实体和时间线找证据，而不是只看静态相似度。

检索阶段包含语义和时间两种过滤。Text-F 判断片段文本是否回答查询；Temp-F 判断片段是否处在正确时间范围、是否与前后事件连贯。两者加权后得到候选分数：

$$
s(S,q)=\alpha\operatorname{TextF}(S,q)+(1-\alpha)\operatorname{TempF}(S,q).
$$

由于不同查询的分数分布不同，固定 top-k 或固定阈值会不稳。ViG-RAG 用 Gaussian Mixture Model 拟合候选相似度分布，自动选择高置信簇；随后再由 VLM/LVLM 整合 semantic anchors、上下文字段和选中视频帧生成答案。

#### 🧪 练习题

```yaml
question: "ViG-RAG 的 PTKG 相比普通知识图谱多编码了哪些关键信息？"
options:
  - "只多编码模型参数量"
  - "时间标记和事实置信度"
  - "只多编码图像分辨率"
  - "只多编码答案长度"
answer: 1
explain: "PTKG 将事实表示为带时间 τ 和 plausibility p 的五元组，支持长视频中的时间推理和不确定性处理。"
```
