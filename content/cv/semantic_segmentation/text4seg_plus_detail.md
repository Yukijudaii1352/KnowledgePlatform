### Text4Seg++ — 文本分割++ (Text4seg++)

```yaml
id: text4seg_plus
name: Text4seg++
full_name: "文本分割++ (Text4seg++)"
year: 2026
org: 多机构
paper_url: "https://ieeexplore.ieee.org/document/11479916"
category: frontier
parent: segformer
motivation: "生成式语言建模图像分割"
```

#### 📝 一句话总结

Text4Seg 提出了 **text-as-mask** 范式，将图像分割重新定义为文本生成问题：用 \(16 \times 16\) 的语义描述符（Semantic Descriptors）将分割掩码编码为纯文本序列，并通过行级游程编码（R-RLE）压缩 74% 的 token 长度、提速 3 倍，使任意多模态大语言模型（MLLM）无需任何架构修改即可执行分割任务，在 refCOCO 系列等基准上达到 SOTA。

#### 🎯 核心要点

- **text-as-mask 范式**：将分割掩码表示为纯文本语义描述符序列，完全复用 MLLM 的 next-token prediction 能力
- **语义描述符（Semantic Descriptors）**：将图像划分为 \(16 \times 16 = 256\) 个 patch，每个 patch 映射到对应的语义标签文本（如 "sky"、"brown dog"）
- **行级游程编码（R-RLE）**：在每行内对相邻重复标签做 Run-Length Encoding，行间用 `\n` 分隔，token 长度从 583 降至 154（压缩 74%），推理速度提升 3 倍，且无性能损失
- **零架构修改**：通过 LoRA 微调即可将分割能力注入 LLaVA-1.5、Qwen-VL、DeepseekVL、InternVL2 等多种 MLLM
- **可选 SAM 精炼器**：推理时可用 SAM 将粗糙的 \(16 \times 16\) 掩码上采样为像素级精细掩码，cIoU 从 73.5 提升至 79.3
- **多任务验证**：在 Referring Expression Segmentation（refCOCO/+/g）、Generalized RES（gRefCOCO）、语义分割、开放词汇分割等任务上均取得 SOTA 或有竞争力的结果
- **训练数据构建**：利用现有分割数据集的 \(\langle\text{image, mask}\rangle\) 对，将 mask 下采样到 \(16 \times 16\) 后替换索引为文本标签，嵌入 query-response 模板进行 SFT

#### 🔬 深入细节

##### 核心框架图

![Text4Seg 整体框架](https://ar5iv.labs.arxiv.org/html/2410.09855/assets/x3.png)
*图：语义描述符的构建过程与两种压缩策略（Full-length → I-RLE → R-RLE）的对比示意。图像被划分为 \(16 \times 16\) 的 patch 网格，每个 patch 用语义标签替代，再通过 R-RLE 进行行级压缩。*

![Text4Seg 与 MLLM 集成](https://ar5iv.labs.arxiv.org/html/2410.09855/assets/x5.png)
*图：Text4Seg 无缝集成到现有 MLLM 架构中。输入为图像 + 文本指令，输出为纯文本格式的语义描述符，可直接由 MLLM 的文本解码器生成。*

##### 算法伪代码

```python
# Text4Seg: 语义描述符构建 + R-RLE 编码 + 推理流程

# === 阶段 1: 训练数据构建 ===
def build_semantic_descriptors(image, mask, label_map):
    """将 <image, mask> 对转换为语义描述符文本"""
    # Step 1: 将 mask 下采样到 16×16
    mask_16x16 = resize(mask, (16, 16), mode='nearest')  # [16, 16]
    
    # Step 2: 将每个 patch 的类别索引替换为文本标签
    descriptors = []
    for row in range(16):
        row_labels = []
        for col in range(16):
            class_id = mask_16x16[row, col]
            row_labels.append(label_map[class_id])  # e.g., "sky", "sand"
        descriptors.append(row_labels)
    
    # Step 3: 应用 R-RLE 压缩（行级游程编码）
    compressed = apply_r_rle(descriptors)
    return compressed

def apply_r_rle(descriptors):
    """Row-wise Run-Length Encoding"""
    rows = []
    for row_labels in descriptors:
        encoded = []
        i = 0
        while i < len(row_labels):
            label = row_labels[i]
            count = 1
            while i + count < len(row_labels) and row_labels[i + count] == label:
                count += 1
            if count > 1:
                encoded.append(f"{label}*{count}")  # e.g., "sky*5"
            else:
                encoded.append(label)
            i += count
        rows.append(" | ".join(encoded))
    return " \\n ".join(rows)  # 行间用 \n 分隔

# === 阶段 2: 训练（LoRA SFT）===
# Query:  <IMAGE> Can you segment the {text_labels} in the image?
# Response: The result is: \n <seg> {semantic_descriptors} </seg>.
# 使用 MLLM 原始自回归损失 L_txt 训练，LoRA rank=64

# === 阶段 3: 推理 ===
def inference(image, query, mllm, sam_refiner=None):
    # Step 1: MLLM 生成语义描述符文本
    text_output = mllm.generate(image, query)
    
    # Step 2: 解码 R-RLE → 16×16 粗糙掩码
    coarse_mask = decode_r_rle(text_output)  # [16, 16]
    
    # Step 3: (可选) SAM 精炼为像素级掩码
    if sam_refiner:
        fine_mask = sam_refiner(image, prompt=coarse_mask)
        return fine_mask
    else:
        return resize(coarse_mask, image.shape[:2])
```

##### 方法深入解析

**1. 动机与背景：为什么需要 text-as-mask？**

现有将分割能力引入 MLLM 的方法主要有两条路线，但都存在明显缺陷：

- **embedding-as-mask**（如 LISA）：在 LLM 输出中插入特殊 `<seg>` token，将其隐藏向量送入额外的 SAM 解码器生成掩码。问题在于需要额外的分割解码器和对应的损失函数，增加了架构复杂度，限制了模型的可扩展性。
- **坐标序列方法**（如 VisionLLM）：用多边形顶点坐标序列表示分割结果。但多边形坐标难以精确描述复杂形状，且在语义分割等密集预测任务上表现不佳。

Text4Seg 的核心洞察是：**既然 MLLM 本质上是文本生成器，那么最自然的方式就是让分割结果本身成为文本**。这就是 text-as-mask 范式的由来——将分割掩码编码为一段可由 LLM 直接生成的文本序列。

> 💡 **关键洞察**：ViT 已经证明图像可以用 \(16 \times 16\) 的 patch token 表示。Text4Seg 进一步将每个 patch token 替换为人类可读的语义标签文本，使得分割掩码成为 LLM 的"母语"。

**2. 语义描述符的设计**

语义描述符的构建过程如下：

1. 将输入图像划分为 \(16 \times 16 = 256\) 个 patch（与 ViT 的 patch 划分一致）
2. 对每个 patch，根据其对应区域的 ground truth 掩码确定语义标签
3. 将 256 个标签按光栅扫描顺序排列为一维序列

每个描述符可以是：
- **简单标签**：如 "sky"、"sand"（语义分割）
- **短语**：如 "brown dog"、"black dog"（实例区分）
- **复杂描述**：如 "a dog in the left"（推理分割）

这种设计的优势在于：
- 完全符合 MLLM 的 next-token prediction 训练范式
- 不需要任何架构修改（无额外解码器、无新 token embedding）
- 语义标签本身携带丰富的语义信息，有助于 LLM 理解

**3. R-RLE 压缩：平衡效率与空间信息**

全长 256 个语义描述符在 refCOCO 数据集上平均产生 583 个 token，单次推理需约 19 秒（V100 GPU）。为解决这一效率瓶颈，论文探索了两种游程编码策略：

**Image-wise RLE (I-RLE)**：对整个 256 长度序列直接做 RLE。虽然压缩率高，但会破坏二维空间结构信息，导致显著的性能下降（refCOCO cIoU 从 74.2 降至 70.4）。

**Row-wise RLE (R-RLE)**：在每行 16 个 patch 内独立做 RLE，行间用 `\n` 分隔符保持二维结构。这一设计的关键在于：

$$\text{R-RLE}(\mathbf{M}) = \text{RLE}(\text{row}_1) \; \backslash n \; \text{RLE}(\text{row}_2) \; \backslash n \; \cdots \; \backslash n \; \text{RLE}(\text{row}_{16})$$

其中每行的 RLE 将连续相同标签合并为 `label*count` 格式。

> ⚠️ **关键对比**：I-RLE 将 2D 掩码压缩为 1D 序列时丢失了行边界信息，而 R-RLE 通过 `\n` 分隔符显式保留了行结构，使 LLM 能够"感知"空间布局。实验证明 R-RLE 在压缩 74% token 的同时完全不损失性能。

**4. 训练与推理流程**

**训练**：采用 LoRA（rank=64）对 MLLM 进行监督微调（SFT），使用标准自回归语言建模损失：

$$\mathcal{L}_{txt} = -\sum_{t=1}^{T} \log P_\theta(y_t \mid y_{<t}, \mathbf{x}_{img}, \mathbf{x}_{query})$$

其中 \(y_t\) 是语义描述符序列中的第 \(t\) 个 token，\(\mathbf{x}_{img}\) 和 \(\mathbf{x}_{query}\) 分别是图像和文本查询。

与 LISA 等方法不同，Text4Seg **不需要**先在大规模混合数据集上做 Continued Pre-Training（CPT），而是直接在下游任务数据上 SFT，大幅简化了训练流程。

**推理**：MLLM 生成语义描述符文本 → 解码 R-RLE 得到 \(16 \times 16\) 粗糙掩码 → （可选）SAM 精炼为像素级掩码。SAM 精炼器以粗糙掩码作为 prompt，几乎不增加推理时间（从 5.34s 到 5.92s），但 cIoU 从 73.5 提升至 79.3。

**5. 与现有方法的对比**

| 特性 | LISA (embedding-as-mask) | VisionLLM (坐标序列) | **Text4Seg (text-as-mask)** |
|------|-------------------------|---------------------|---------------------------|
| 额外解码器 | 需要 SAM 解码器 | 不需要 | **不需要** |
| 架构修改 | 需要 | 需要 | **不需要** |
| 输出格式 | 隐藏向量 → 掩码 | 多边形坐标 | **纯文本** |
| 密集分割 | ✓ | ✗（坐标不适合） | **✓** |
| MLLM 通用性 | 仅 LLaVA | 有限 | **LLaVA/Qwen-VL/DeepseekVL/InternVL2** |
| 训练方式 | CPT + SFT | CPT + SFT | **仅 SFT** |

**6. 关键实验结果**

- **Referring Expression Segmentation**（refCOCO/+/g）：Text4Seg 基于 InternVL2-8B 达到 75.4 avg cIoU，基于 LLaVA-1.5-13B 达到 76.2 avg cIoU，均超越 Groundhog（74.2）和 GSVA（71.4）
- **Generalized RES**（gRefCOCO）：Text4Seg 基于 InternVL2-8B 达到 71.1 avg，显著超越 LISA（62.9）和 GSVA（65.6）
- **消融实验**：
  - 分辨率：\(16^2\) + SAM 已达最优，\(32^2\) 无 SAM 时 cIoU 为 71.4（vs \(16^2\) 的 67.5）
  - R-RLE vs I-RLE：R-RLE 保持 74.2 cIoU，I-RLE 降至 70.4（refCOCO）
  - SAM 变体：ViT-L 与 ViT-H 性能接近（79.1 vs 79.3），但更快

#### 🧪 练习题

```yaml
question: "Text4Seg 中 R-RLE 相比 I-RLE 的核心优势是什么？"
options:
  - "R-RLE 的压缩率更高，能将 token 数量减少 90% 以上"
  - "R-RLE 通过行分隔符保留了二维空间结构信息，避免了性能下降"
  - "R-RLE 使用了更复杂的熵编码算法，信息损失更小"
  - "R-RLE 不需要特殊分隔符，直接兼容所有 LLM 的 tokenizer"
answer: 1
explain: "I-RLE 对整个序列做游程编码会破坏行边界的空间信息，导致 cIoU 下降约 4 个点。R-RLE 在每行内独立编码并用 \\n 分隔行，显式保留了二维结构，在压缩 74% token 的同时完全不损失分割性能。"
```