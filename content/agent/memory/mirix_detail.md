### MIRIX: 多智能体记忆系统 (MIRIX)

```yaml
id: mirix
name: MIRIX
full_name: 多智能体记忆系统 (MIRIX)
year: '2025.07'
org: MIRIX AI
paper_url: https://arxiv.org/abs/2507.07957
category: multimodal
parent: memoryos
motivation: 六类记忆协同支撑真实多模态回忆
```

#### 📝 一句话总结
MIRIX提出了一种由六种结构化记忆组件和八智能体协同框架构成的模块化多智能体记忆系统，通过"主动检索"和层级化记忆路由实现了面向LLM Agent的长程、多模态、个性化记忆能力，在ScreenshotVQA和LOCOMO基准上均显著超越现有方法。

#### 🎯 核心要点
1. **六种记忆组件协同**：将记忆划分为Core Memory（核心记忆）、Episodic Memory（情景记忆）、Semantic Memory（语义记忆）、Procedural Memory（程序性记忆）、Resource Memory（资源记忆）和Knowledge Vault（知识保险库），每种记忆具有独立的字段结构和功能定位。

2. **多智能体架构**：由一个Meta Memory Manager负责任务路由，六个Memory Managers分别管理各自的记忆组件，外加一个Chat Agent处理用户交互，共八个智能体协同工作。

3. **Active Retrieval（主动检索）机制**：Chat Agent在回答前先生成当前"话题"（topic），再基于话题从各记忆组件中检索相关内容并注入系统提示，无需用户显式触发记忆搜索。

4. **多检索策略**：支持embedding_match、bm25_match和string_match等多种检索函数，Agent可根据上下文自主选择最合适的检索方式。

5. **ScreenshotVQA基准上的惊艳表现**：相比RAG基线（SigLIP）准确率提升35%，存储需求降低99.9%；相比长上下文基线（Gemini）准确率提升410%，存储降低93.3%。

6. **LOCOMO基准上的SOTA**：整体准确率达85.38%，超越最强基线Zep 6个百分点以上，在Multi-Hop问题上优势尤其显著（超基线24+点）。

#### 🔬 深入细节
![MIRIX 示意图](https://ar5iv.labs.arxiv.org/html/2507.07957/assets/x1.png)
*图：MIRIX 的核心框架或评测示意。*

##### 1. 六种记忆组件的层级化设计

MIRIX的记忆系统从认知科学中汲取灵感，将长期记忆细化为六种专业化的组件，每种组件内部采用层级化字段结构：

**Core Memory（核心记忆）**：
- 存储高优先级、持久性信息，始终对Agent可见
- 包含`persona`块（编码Agent的身份、语调、行为特征）和`human`块（存储用户姓名、偏好等事实）
- 当记忆大小超过90%容量时触发受控重写，在紧凑性和信息保真之间取得平衡

**Episodic Memory（情景记忆）**：
- 捕获带有时间戳的事件和交互，类似于结构化日志/日历
- 字段包括：`event_type`（user_message/inferred_result/system_notification）、`summary`、`details`、`actor`（user/assistant）、`timestamp`
- 使Agent能进行时间索引和追踪变化，例如识别正在进行的任务或跟进待处理操作

**Semantic Memory（语义记忆）**：
- 维护与特定时间/事件无关的抽象知识和事实
- 字段包括：`name`、`summary`、`details`、`source`（user_provided/Wikipedia/inferred）
- 持久的、可被概念性覆写，支持社交、地理或常识推理
- 可组织为树状层级结构，如"Social Network" → "Favorites" → "Sports/Pets/Music"

**Procedural Memory（程序性记忆）**：
- 存储目标导向的结构化流程，如操作指南、工作流、交互脚本
- 字段包括：`entry_type`（workflow/guide/script）、`description`、`steps`（JSON或结构化列表）
- 支持指令规划、自动化和用户目标的分解

**Resource Memory（资源记忆）**：
- 处理用户当前处理的完整/部分文档、转录或多模态文件
- 字段包括：`title`、`summary`、`resource_type`（doc/markdown/pdf_text/image/voice_transcript）、`content`
- 支持长运行任务的上下文连续性

**Knowledge Vault（知识保险库）**：
- 安全存储凭据、地址、联系方式、API密钥等敏感信息
- 字段包括：`entry_type`（credential/bookmark/contact_info/api_key）、`source`、`sensitivity`（low/medium/high）、`secret_value`
- 高敏感度条目受访问控制保护，排除在常规检索之外

```
          ┌─────────────────────────────────────────────┐
          │         MIRIX 记忆系统（六种记忆组件）         │
          └─────────────────────────────────────────────┘
               │
     ┌─────────┼─────────────┬──────────┬──────────┐
     ▼         ▼             ▼          ▼          ▼
┌─────────┐ ┌─────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐
│  Core   │ │Episodic │ │ Semantic │ │Procedural│ │ Resource │
│ Memory  │ │ Memory  │ │  Memory  │ │  Memory  │ │  Memory  │
├─────────┤ ├─────────┤ ├──────────┤ ├──────────┤ ├──────────┤
│• persona│ │• event  │ │• name    │ │• type    │ │• title   │
│• human  │ │• summary│ │• summary │ │• descrip │ │• summary │
│         │ │• details│ │• details │ │• steps   │ │• type    │
│         │ │• actor  │ │• source  │ │          │ │• content │
│         │ │• time   │ │          │ │          │ │          │
└─────────┘ └─────────┘ └──────────┘ └──────────┘ └──────────┘
                                                  ┌──────────┐
                                                  │Knowledge │
                                                  │  Vault   │
                                                  ├──────────┤
                                                  │• type    │
                                                  │• source  │
                                                  │• sensitiv│
                                                  │• value   │
                                                  └──────────┘
```

##### 2. 多智能体协同工作流

MIRIX的八个智能体分为三个角色层级：

- **Meta Memory Manager**：中央协调者，分析输入内容，决定哪些记忆组件相关，将输入路由到对应的Memory Managers。接收各Manager的更新报告后发送确认信号完成更新流程。
- **Memory Managers（×6）**：各自独立管理一种记忆类型，并行更新各自的记忆，确保同类型内无冗余信息。
- **Chat Agent**：处理与用户的自然语言对话，协调检索和响应生成。

**记忆更新工作流（Memory Update Workflow）**：
当接收到新用户输入时，系统首先自动对记忆库执行搜索，将检索到的信息与用户输入一起传递给Meta Memory Manager。Meta Memory Manager分析内容并确定相关记忆组件，将输入路由到相应的Memory Managers。这些Memory Managers并行更新各自的记忆，完成后向Meta Memory Manager报告，Meta Memory Manager最终发送确认信号。

**对话检索工作流（Conversational Retrieval Workflow）**：
Chat Agent接收到用户查询后，首先在全部六个记忆组件上执行粗略检索（仅返回高层摘要），然后分析查询确定哪些组件需要更精确的搜索并选择合适的检索方法，整合信息后综合出最终响应。若用户查询涉及记忆更新（如提供新事实或纠正），Chat Agent可直接与相应的Memory Managers交互执行精确更新。

```
用户输入
  │
  ▼
┌────────────────┐    搜索记忆库    ┌──────────────────────┐
│                │ ───────────────→ │  全记忆库粗略检索     │
│ Meta Memory    │                  │  (6个组件，仅摘要)    │
│ Manager        │←────────────────┴──────────────────────┘
│                │
│ (分析内容,      │    ┌──────┐ ┌──────┐ ┌──────┐
│  路由决策)      │───→│Episod│ │Semant│ │ ...  │  (至多6个并行)
│                │    │Mgr   │ │Mgr   │ │      │
└────────────────┘    └──┬───┘ └──┬───┘ └──┬───┘
     ▲                   │        │        │
     │   报告+确认       └────────┴────────┘
     └───────────────────────────────────────┘
```

##### 3. Active Retrieval（主动检索）机制

为解决"模型默认使用参数化知识而非记忆"的问题，MIRIX设计了Active Retrieval两阶段流程：

**阶段一：话题生成**
Agent根据输入上下文生成一个`current topic`。例如，对于查询"Who is the CEO of Twitter?"，Agent推断出话题"CEO of Twitter"。

**阶段二：话题驱动检索**
该话题被用于从六个记忆组件中分别检索最相关的前10条记录。检索结果以标签形式注入系统提示：

```
<episodic_memory>...</episodic_memory>
<semantic_memory>...</semantic_memory>
<core_memory>...</core_memory>
```

这种设计使模型既知道记忆内容，也知道信息的内存来源，无需用户显式触发记忆访问。

**支持的检索函数**：
- `embedding_match`：基于向量嵌入的语义检索
- `bm25_match`：基于BM25算法的关键词检索
- `string_match`：精确字符串匹配

Agent可根据上下文自主选择最合适的检索策略，系统也在持续扩展更多专业化的检索方法。

##### 4. 实验：ScreenshotVQA基准

**数据集构造**：
- 收集三位博士生1天至1个月不等的屏幕截图（每秒截图，相似度>0.99时跳过）
- 学生1（重度用户）：5,886张图/1天
- 学生2（中度用户）：18,178张图/20天
- 学生3（轻度用户）：5,349张图/1个多月
- 人工创建问题并经双重检查：学生1有11题，学生2有21题，学生3有55题

**评估**：采用GPT-4.1作为LLM-as-a-Judge，从回答、答案和标准答案三元组判断回答是否正确。

**结果**（详见表1）：

| 方法 | 学生1 | 学生2 | 学生3 | 总体 | 存储 |
|------|-------|-------|-------|------|------|
| Gemini（长上下文） | 0.0000 | 0.0952 | 0.2545 | 0.1166 | 236.70MB |
| SigLIP@50（RAG） | 0.3636 | 0.4138 | 0.5455 | 0.4410 | 15.07GB |
| MIRIX | **0.5455** | **0.5667** | **0.6727** | **0.5950** | **15.89MB** |

关键发现：
- MIRIX相比SigLIP-RAG：准确率提升35%（0.441→0.595），存储降低99.9%（15.07GB→15.89MB）
- MIRIX相比Gemini长上下文：准确率提升410%（0.117→0.595），存储降低93.3%（236.70MB→15.89MB）
- MIRIX不使用原始图像的向量化存储，仅保存提取的结构化信息到sqlite数据库

##### 5. 实验：LOCOMO基准

**实验设置**：
- 使用gpt-4.1-mini作为主干模型（替换基线原用的gpt-4o-mini以确保函数调用能力可比）
- 10段对话，每段约600轮对话、26,000 tokens，约200个问题
- 约束：Chat Agent仅能使用检索到的记忆回答问题，无法访问原始对话记录
- 评估维度：Single-Hop（单跳）、Multi-Hop（多跳）、Open Domain（开放域）、Temporal（时序）

**结果**（详见表2）：

| 方法 | Single-Hop | Multi-Hop | Open Domain | Temporal | Overall |
|------|-----------|-----------|-------------|----------|---------|
| Mem0 (gpt-4o-mini) | 67.13 | 51.15 | 72.93 | 55.51 | 66.88 |
| Zep (gpt-4o-mini) | 74.11 | 66.04 | 67.71 | 79.76 | 75.14 |
| LangMem (gpt-4.1-mini) | 74.47 | 61.06 | 67.71 | 86.92 | 78.05 |
| Zep (gpt-4.1-mini) | 79.43 | 69.16 | 73.96 | 83.33 | 79.09 |
| Mem0 (gpt-4.1-mini) | 62.41 | 57.32 | 44.79 | 66.47 | 62.47 |
| **MIRIX** | **85.11** | **83.70** | **65.62** | **88.39** | **85.38** |
| Full-Context (上界) | 88.53 | 77.70 | 71.88 | 92.70 | 87.52 |

**关键分析**：

- **Overall**：MIRIX 85.38%，超过最强开源基线LangMem 8+点，接近Full-Context上界（87.52%）
- **Multi-Hop**：MIRIX 83.70%，超越所有基线24+点。因为MIRIX在记忆更新时就进行了信息整合（如"Caroline moved from her hometown, Sweden, 4 years ago"），避免查询时需要拼接分散信息
- **Single-Hop**：与Full-Context的微小差距主要源于问题歧义。例如"MIRIX存储了实际发生的事件（'10月19日露营'），而问题期望的是计划日期（'6月'）"
- **Open Domain**：与Full-Context的差距反映了RAG方法的固有限制——缺乏全局理解能力。虽然MIRIX已超越简单RAG，但检索环节仍是瓶颈

##### 6. 工程实践：MIRIX应用

MIRIX提供了一个可安装的跨平台桌面应用（React-Electron + Uvicorn），实现了：

- **屏幕监控**：每1.5秒截图，通过视觉相似度过滤冗余帧，每积累20张独特截图触发记忆更新（约每60秒一次）
- **流式上传**：使用Gemini API的Google Cloud URL机制，在上传时即异步发送，端到端延迟从GPT-4的约50秒降至Gemini的5秒以内
- **记忆可视化**：语义记忆展示为树状结构，程序性记忆展示为列表视图
- **隐私保护**：本地存储，端到端加密

#### 🧪 练习题
```yaml
question: "MIRIX 的 Active Retrieval 与传统 RAG 的关键差别是什么？"
options:
  - "MIRIX 不做检索，只把所有记忆直接注入上下文"
  - "MIRIX 先由 Agent 生成 current topic，再按记忆类型执行定向检索，而不是由外部编排器固定 top-k"
  - "MIRIX 只支持图像记忆，不支持文本记忆"
  - "MIRIX 把所有记忆都压缩成用户画像后统一回答"
answer: 1
explain: "Active Retrieval 先预测当前话题，再在六类记忆组件上做针对性搜索，解决了模型更偏向参数知识而不是主动读记忆的问题。"
```
