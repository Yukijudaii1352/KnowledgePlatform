### VideoRAG：极长视频检索增强生成

```yaml
id: videorag
name: VideoRAG
full_name: 视频检索增强生成 (Video Retrieval-Augmented Generation)
year: '2026.03'
org: Zhejiang University
paper_url: https://arxiv.org/abs/2501.09885
category: frontier_2026
parent: rag
motivation: 极长视频多模态编码器实现小时级上下文检索
```

#### 📝 一句话总结

VideoRAG 把 RAG 扩展到小时级、多视频语料，通过图式文本知识 grounding 和多模态上下文编码双通道索引视频片段，让 LLM 能从极长视频集合中检索视觉、语音和文本证据后生成回答。

#### 🎯 核心要点

- **实际论文页**：manifest 中 `2501.09885` 指向无关超导论文；这里依据 `https://arxiv.org/abs/2502.01549` 的 Extreme Long-Context VideoRAG。
- **双通道架构**：graph-based textual knowledge grounding + multi-modal context encoding。
- **视频切片处理**：把任意长视频切为片段，抽取 ASR 文本、采样帧和 VLM caption。
- **跨视频知识图谱**：用 LLM 从 caption/transcript 中抽取实体和关系，支持多视频知识连接。
- **多模态检索**：同时利用文本语义、图结构和视觉 embedding 找到相关片段。
- **LongerVideos 基准**：包含 160+ 视频、134+ 小时，覆盖课程、纪录片、娱乐内容。

#### 🔬 深入细节

![VideoRAG 框架图](https://ar5iv.labs.arxiv.org/html/2502.01549/assets/x1.png)

*图源：ar5iv 论文图 1，展示 VideoRAG 的视频知识索引、多模态检索和最终生成流程。*

```python
def index_videos(video_list, asr, vlm, text_encoder, multimodal_encoder):
    graph = KnowledgeGraph()
    clip_store = []
    for video in video_list:
        for clip in split_video(video, seconds=30):
            transcript = asr.transcribe(clip.audio)
            frames = sample_frames(clip, k=10)
            caption = vlm.caption(frames, transcript)
            text_chunk = merge(caption, transcript, clip.timestamp)

            entities, relations = llm_extract_graph(text_chunk)
            graph.update(entities, relations, source=clip.id)
            clip_store.append({
                "clip": clip,
                "text_vec": text_encoder(text_chunk),
                "video_vec": multimodal_encoder(frames, transcript),
            })
    return graph, clip_store

def videorag_query(query, graph, clip_store, generator):
    graph_hits = graph.retrieve_related_chunks(query)
    visual_hits = multimodal_search(query, clip_store)
    evidence = rerank_and_merge(graph_hits, visual_hits)
    return generator.answer(query, evidence)
```

VideoRAG 的关键难点是视频不是普通长文档。它同时包含视觉帧、语音、字幕、场景变化和跨片段时间依赖；如果只把视频转写成文本，视觉细节会丢失；如果只把帧塞进长视频模型，小时级视频会遇到上下文和计算瓶颈。因此 VideoRAG 使用双通道索引：文本图谱保留可符号化的知识关系，视觉编码保留难以文本化的场景信息。

索引阶段先把视频切成短片段。每个片段通过 ASR 得到 transcript，通过采样帧和 VLM 得到 caption，再把二者合并为结构化文本。随后 LLM 从文本中抽取实体和关系，增量构建跨视频知识图谱；同时，文本编码器和多模态编码器分别保存文本向量与视觉/音频上下文向量。

检索阶段不只做单一路径相似度搜索。对于查询 \(q\)，VideoRAG 可以在图谱中找到相关实体和关系，也可以在多模态 embedding 空间中匹配视觉片段。最终证据由两路候选合并、重排后提供给生成模型：

$$
\operatorname{Answer}=\operatorname{LLM}\left(q,\ \psi_{\text{text-graph}}(q,G)\cup\psi_{\text{multi-modal}}(q,E_v)\right).
$$

这套设计特别适合跨视频问题，例如“某系列课程里某概念第一次在哪一集解释、后续如何展开”。传统 LVLM 可能只能看固定帧窗口，文本 RAG 又看不到画面；VideoRAG 通过知识图谱连接多个视频片段，再用视觉检索补齐具体画面证据。

#### 🧪 练习题

```yaml
question: "VideoRAG 为什么需要同时使用图式文本 grounding 和多模态编码？"
options:
  - "因为视频信息同时包含可文本化知识关系和难以文本化的视觉细节"
  - "因为图谱会自动压缩所有模型参数"
  - "因为 ASR 可以替代视觉帧"
  - "因为多模态编码只能处理纯文本"
answer: 0
explain: "视频证据跨越语音、画面和时间关系，双通道索引能同时保留结构化语义和视觉细节。"
```
