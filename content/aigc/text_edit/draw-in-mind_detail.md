### Draw-In-Mind: Designer-Painter 分离范式的图像编辑

```yaml
id: draw-in-mind
name: "Draw-In-Mind"
year: 2025
org: "Tencent"
paper_url: "https://arxiv.org/abs/2509.01986"
category: text_edit
parent: —
motivation: "将图像编辑中的'设计师'（理解与规划）和'画家'（生成执行）角色分离，通过 CoT 想象力数据集和外部 MLLM 指导，实现小模型 SOTA 编辑能力"
```

---

## 📝 一句话总结

Draw-In-Mind 提出 **Designer-Painter 分离范式**：用外部 MLLM 充当"设计师"生成 Chain-of-Thought 编辑规划（全局布局→局部对象→编辑区域→想象结果），再由轻量 4.6B 模型（冻结 Qwen2.5-VL-3B + 可训练 SANA1.5-1.6B）作为"画家"执行生成，配合 **DIM 数据集**（14M 长文本 T2I + 233K CoT 编辑对），以 5 倍更小的参数量超越 Step1X-Edit、UniWorld-V1 等大模型，在 ImgEdit、GEdit-Bench、MagicBrush 上达到 SOTA。

---

## 🎯 核心要点

1. **Designer-Painter 角色分离**：打破传统"全能模型"范式，将编辑任务拆分为理解规划（Designer MLLM）和视觉生成（Painter DiT）两个独立角色，推理时可即插即用不同的外部 Designer（GPT-4o、Qwen、InternVL 等）
2. **DIM-T2I 数据集（14M）**：从真实图像出发，基于 21 个维度（空间关系、计数、属性、动作等）生成平均 146.76 词的超长描述，是现有数据集平均长度的 2 倍以上，为复杂 CoT 编辑奠定文本理解基础
3. **DIM-Edit 数据集（233K）**：对 UltraEdit/ShareGPT-4o-Image/HumanEdit 三个来源数据，用 GPT-4o 生成 4 步 CoT 想象力标注（Global Layout Perception → Local Object Perception → Edit Area Localization → Edited Image Imagination），构建高质量编辑训练对
4. **极简高效架构（4.6B）**：冻结 Qwen2.5-VL-3B 作为文本/视觉编码器 + 2 层 MLP 连接器 + 可训练 SANA1.5-1.6B DiT 生成器，训练参数仅约 1.6B，却在多个基准上超越 20B+ 模型
5. **Self-Play 能力**：内部 Qwen2.5-VL-3B 也可作为 Designer 进行自我推理，无需外部大模型即可达到 SOTA 水平（ImgEdit 3.55 vs 其他方法 < 3.5）

---

## 🔬 深入细节

### 1. 核心动机：为什么要分离 Designer 和 Painter？

![Figure 1: 三种图像编辑范式对比](https://arxiv.org/html/2509.01986v4/2509.01986v4/x1.png)

> 💡 **关键洞察**：现有方法要么让生成模型同时承担理解和生成（All-in-One），要么用 MLLM 做简单的 prompt 改写（MLLM-Assisted），都没有充分发挥 MLLM 的深度理解能力。DIM 的核心思想是：**让 MLLM 像设计师一样深度思考编辑方案，让 DiT 像画家一样专注执行**。

论文将现有图像编辑方法分为三类范式：

| 范式 | 代表方法 | 理解能力 | 生成能力 | 问题 |
|------|---------|---------|---------|------|
| **All-in-One** | InstructPix2Pix, UltraEdit | 内置于生成模型 | ✅ | 理解能力受限于生成模型 |
| **MLLM-Assisted** | Step1X-Edit, LLMCOT-Edit | MLLM 做 prompt 改写 | ✅ | MLLM 仅做浅层辅助 |
| **Designer-Painter (DIM)** | 本文 | MLLM 深度 CoT 规划 | ✅ | 充分发挥两者优势 |

### 2. DIM 数据集构建

#### 2.1 DIM-T2I：14M 长上下文图文对

DIM-T2I 的核心目标是训练模型理解超长、超详细的文本描述，为后续 CoT 编辑打基础。

**21 维度标注体系**（覆盖理解数据集和基准中最常见的人-物交互维度）：

| 维度类别 | 具体维度 |
|---------|---------|
| 空间与计数 | 空间关系、对象计数、相对大小 |
| 属性 | 颜色、材质、形状、纹理 |
| 动作与交互 | 人体动作、物体交互、面部表情 |
| 场景 | 场景类型、天气、光照、时间 |
| 文本与符号 | OCR 文本、标志、品牌 |
| 高级语义 | 情感氛围、风格、文化元素 |
| 其他 | 深度关系、遮挡关系、透视 |

数据来源为真实图像（非 AI 生成），使用内部模型生成长描述，平均 prompt 长度 **146.76 词**，远超现有数据集：

| 数据集 | 规模 | 来源 | 平均词数 |
|--------|------|------|---------|
| MidJourney-V6 | 1.2M | AI Gen. | 9.59 |
| JourneyDB | 4.2M | AI Gen. | 29.27 |
| Dimba | 0.3M | Real | 78.29 |
| **DIM-T2I** | **14M** | **Real** | **146.76** |

#### 2.2 DIM-Edit：233K CoT 编辑对

![Figure 3: DIM-Edit 数据集构建流程](https://arxiv.org/html/2509.01986v4/2509.01986v4/x3.png)

DIM-Edit 从三个来源构建：
- **UltraEdit**（160K 对）：AI 生成的编辑对，覆盖面广
- **ShareGPT-4o-Image**（46K 对）：GPT-4o 生成的高质量图像对
- **HumanEdit**（27K 对）：人工标注的真实编辑对

**4 步 CoT 想象力标注**（由 GPT-4o 生成）：

```
输入: 原始图像 + 编辑指令 + 编辑后图像
↓
Step 1: Global Layout Perception (全局布局感知)
  "图像展示了一个现代厨房，中央有一个大理石台面岛台，
   左侧是不锈钢冰箱，右侧是窗户..."
↓
Step 2: Local Object Perception (局部对象感知)  
  "岛台上有一个蓝色陶瓷花瓶(高约30cm)，旁边是一组
   三个玻璃调味罐，花瓶中有白色百合花..."
↓
Step 3: Edit Area Localization (编辑区域定位)
  "编辑区域集中在岛台中央偏左的位置，大约占图像宽度
   的20%和高度的35%，即花瓶所在区域..."
↓
Step 4: Edited Image Imagination (编辑结果想象)
  "花瓶的颜色从蓝色变为红色，保持相同的陶瓷质感和形状，
   花瓶中的百合花不受影响，周围的调味罐和台面保持不变，
   光照和阴影相应调整以匹配红色花瓶的反射特性..."
```

> 💡 **为什么需要 4 步 CoT？** 消融实验表明，去掉 CoT 数据后 ImgEdit 分数从 3.67 降至 3.43（-0.24），说明 CoT 想象力标注显著提升了模型对编辑意图的理解和执行精度。

### 3. 模型架构

![Figure 2: DIM 框架整体架构](https://arxiv.org/html/2509.01986v4/2509.01986v4/x2.png)

DIM-4.6B 由三个组件构成：

```
┌─────────────────────────────────────────────────┐
│                DIM-4.6B 架构                      │
│                                                   │
│  ┌──────────────┐    ┌─────────┐    ┌───────────┐ │
│  │ Qwen2.5-VL-3B│───→│ 2-Layer │───→│SANA1.5    │ │
│  │  (Frozen)    │    │  MLP    │    │  1.6B     │ │
│  │  MLLM        │    │Connector│    │  (DiT)    │ │
│  │              │    │         │    │(Trainable)│ │
│  └──────┬───────┘    └─────────┘    └─────┬─────┘ │
│         │                                  │       │
│   文本+视觉编码              Flow Matching 生成    │
│   (理解 CoT 指令)            (执行图像生成/编辑)   │
└─────────────────────────────────────────────────┘
```

**各组件详解：**

| 组件 | 参数量 | 是否训练 | 功能 |
|------|--------|---------|------|
| Qwen2.5-VL-3B | ~3B | ❄️ 冻结 | 编码文本指令和输入图像，提取语义特征 |
| 2-Layer MLP | ~0.02B | ✅ 训练 | 将 MLLM 特征空间映射到 DiT 条件空间 |
| SANA1.5-1.6B | ~1.6B | ✅ 训练 | 基于 Flow Matching 的 DiT 生成器 |

**生成过程的数学表述：**

SANA1.5 使用 Flow Matching 目标训练。给定噪声样本 $z_t = (1-t) \cdot z_0 + t \cdot \epsilon$，模型学习预测速度场：

$$\mathcal{L}_{FM} = \mathbb{E}_{t, z_0, \epsilon} \left[ \| v_\theta(z_t, t, c) - (\epsilon - z_0) \|^2 \right]$$

其中 $c$ 是来自 Qwen2.5-VL-3B 经 MLP 映射后的条件特征，包含文本指令和（编辑时的）输入图像信息。

**推理时的 Designer-Painter 流程：**

```python
# 伪代码: DIM 推理流程
def dim_inference(source_image, edit_instruction, designer_model, painter_model):
    """
    Designer-Painter 分离推理
    """
    # === Phase 1: Designer (外部 MLLM) 生成 CoT 编辑规划 ===
    cot_prompt = f"""Given the source image and edit instruction: "{edit_instruction}"
    Please provide:
    1. Global Layout Perception: Describe the overall scene layout
    2. Local Object Perception: Detail the objects in the edit region  
    3. Edit Area Localization: Specify where the edit should occur
    4. Edited Image Imagination: Describe the expected result in detail"""
    
    cot_plan = designer_model.generate(
        image=source_image, 
        prompt=cot_prompt
    )  # e.g., GPT-4o, Qwen2.5-VL-72B, InternVL2.5-78B
    
    # === Phase 2: Painter (DIM-4.6B) 执行编辑 ===
    # 构建完整输入: 原图 + 编辑指令 + CoT 规划
    full_prompt = f"{edit_instruction}\n{cot_plan}"
    
    # Qwen2.5-VL-3B 编码 (frozen)
    text_features = qwen_encoder.encode_text(full_prompt)
    image_features = qwen_encoder.encode_image(source_image)
    combined_features = concat(text_features, image_features)
    
    # MLP 映射到 DiT 条件空间
    dit_condition = mlp_connector(combined_features)
    
    # SANA1.5-1.6B Flow Matching 生成
    edited_image = sana_dit.generate(
        condition=dit_condition,
        num_steps=20,  # flow matching steps
    )
    
    return edited_image
```

> 💡 **Self-Play 模式**：推理时也可以不使用外部 Designer，而是让内部的 Qwen2.5-VL-3B 自己生成 CoT 规划（Self-Play），此时无需额外 API 调用，ImgEdit 分数仍达 3.55，超越大多数竞争方法。

### 4. 训练流程

训练分为两个阶段：

#### Stage 1: T2I 预训练（DIM-4.6B-T2I）

| 参数 | 值 |
|------|-----|
| 数据 | DIM-T2I (14M) + 额外 6.9M 数据 |
| 训练组件 | MLP Connector + SANA1.5-1.6B |
| 学习率 | $2 \times 10^{-5}$ |
| Batch Size | 256 |
| Epochs | 8 |
| MLLM | Qwen2.5-VL-3B (冻结) |

#### Stage 2: Edit 微调（DIM-4.6B-Edit）

| 参数 | 值 |
|------|-----|
| **Step 2a**: UltraEdit 预热 | |
| 数据 | UltraEdit |
| 学习率 | $1 \times 10^{-4}$ |
| Batch Size | 32 |
| Epochs | 10 |
| **Step 2b**: DIM-Edit 精调 | |
| 数据 | DIM-Edit (233K) |
| 学习率 | $1 \times 10^{-5}$ |
| Batch Size | 32 |
| Epochs | 50 |

> 💡 **两步编辑训练的设计逻辑**：先在大规模 UltraEdit 上学习基础编辑能力（高学习率快速收敛），再在高质量 DIM-Edit 上精调 CoT 理解能力（低学习率精细优化），避免小数据集过拟合。

### 5. 实验结果

#### 5.1 Text-to-Image 生成（验证 DIM-T2I 数据质量）

| 模型 | 参数量 | GenEval ↑ | MJHQ-30K FID ↓ |
|------|--------|-----------|-----------------|
| DALL·E 3 | — | 0.67 | — |
| SD3-Medium | 2B | 0.74 | — |
| FLUX.1-dev | 12B | 0.82 | — |
| Janus-Pro | 7B | 0.80 | — |
| MetaQuery | 8B | 0.82 | 5.97 |
| **DIM-4.6B-T2I** | **4.6B** | **0.82** | **5.68** |

#### 5.2 图像编辑（核心评测）

**ImgEdit Benchmark**（GPT-4.1 评估，1-5 分）：

| 模型 | 参数量 | Overall ↑ | Perception | Reasoning | Multi-Turn |
|------|--------|-----------|------------|-----------|------------|
| InstructPix2Pix | 1.5B | 2.45 | — | — | — |
| UltraEdit | 1.5B | 2.72 | — | — | — |
| Step1X-Edit | 20B+ | 3.42 | 3.59 | 3.39 | 2.95 |
| UniWorld-V1 | 20B+ | 3.50 | 3.67 | 3.44 | 3.12 |
| **DIM-4.6B-Edit** | **4.6B** | **3.67** | **3.76** | **3.68** | **3.36** |

**MagicBrush**（自动指标）：

| 模型 | L1 ↓ | L2 ↓ | CLIP-I ↑ | DINO ↑ | CLIP-T ↑ |
|------|------|------|----------|--------|----------|
| InstructPix2Pix | 0.114 | 0.037 | 0.834 | 0.737 | 0.298 |
| Step1X-Edit | 0.068 | 0.019 | 0.912 | 0.855 | 0.310 |
| **DIM-4.6B-Edit** | **0.043** | **0.010** | **0.938** | **0.907** | **0.313** |

![Figure 4: 定性对比结果](https://arxiv.org/html/2509.01986v4/2509.01986v4/x4.png)

#### 5.3 关键消融实验

**不同外部 Designer 的影响**（ImgEdit Overall）：

| Designer | 参数量 | ImgEdit ↑ |
|----------|--------|-----------|
| 无 CoT（仅指令） | — | 3.43 |
| Qwen2.5-VL-3B (Self-Play) | 3B | 3.55 |
| Qwen2.5-VL-7B | 7B | 3.58 |
| InternVL2.5-78B | 78B | 3.62 |
| GLM-4V-Plus | — | 3.63 |
| Qwen2.5-VL-72B | 72B | 3.64 |
| **GPT-4o** | **—** | **3.67** |

> 💡 **重要发现**：(1) 任何 CoT Designer 都显著优于无 CoT（+0.12~+0.24）；(2) Designer 越强，编辑效果越好，但边际收益递减；(3) 3B 的 Self-Play 已经超越大多数 20B+ 全能模型。

**DIM-Edit 数据组成消融**：

| 配置 | ImgEdit ↑ |
|------|-----------|
| 仅 UltraEdit (无 CoT) | 3.43 |
| + DIM-Edit (UltraEdit 部分) | 3.56 |
| + DIM-Edit (ShareGPT-4o 部分) | 3.62 |
| + DIM-Edit (HumanEdit 部分) | **3.67** |

### 6. 方法局限性

论文指出的主要限制：
1. **依赖外部 Designer 质量**：CoT 规划的质量直接影响编辑结果，弱 Designer 会导致性能下降
2. **推理成本增加**：需要额外调用 MLLM 生成 CoT（但 Self-Play 模式可缓解）
3. **编辑类型覆盖**：DIM-Edit 主要覆盖常见编辑类型，对极端或罕见编辑场景可能泛化不足

---

## 🧪 练习题

1. **概念理解**：Designer-Painter 分离范式与传统 MLLM-Assisted 方法（如 Step1X-Edit 使用 MLLM 改写 prompt）的本质区别是什么？为什么 4 步 CoT 想象力比简单的 prompt 改写更有效？

2. **架构设计**：DIM 选择冻结 Qwen2.5-VL-3B 而非联合微调的原因是什么？如果解冻 MLLM 进行端到端训练，可能会带来哪些好处和风险？

3. **数据工程**：DIM-T2I 的 21 维度标注体系是如何确定的？如果你要为视频编辑任务设计类似的多维度标注体系，会增加哪些维度？

4. **实验分析**：从消融实验中可以看到，Self-Play（3B Designer）与 GPT-4o Designer 的差距仅为 0.12 分。请分析这个差距主要来自 CoT 的哪些方面（布局理解？对象识别？区域定位？结果想象？），并设计实验验证你的假设。

5. **扩展思考**：DIM 的 Designer-Painter 分离思想能否推广到其他生成任务（如视频生成、3D 生成、音乐生成）？请选择一个任务，设计 Designer 应该输出的 CoT 结构。