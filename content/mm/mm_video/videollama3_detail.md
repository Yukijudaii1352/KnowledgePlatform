### VideoLLaMA 3: An Image-Centric Framework for Video Understanding

```yaml
id: videollama3
name: "VideoLLaMA 3"
year: 2025
org: "Alibaba"
arxiv: "2501.13106"
category: video_llm
parent: videollama
motivation: "以图像为中心的视觉编码范式实现高效视频理解"
```

## 📝 一句话总结

VideoLLaMA3 提出以**图像为中心**的视频理解框架，通过**任意分辨率视觉编码（AVT）**和**差分帧剪枝（DiffFP）**两大核心技术，在 SigLIP + Qwen2.5 架构上经四阶段训练，实现了 2B/7B 规模下图像与视频理解的全面 SOTA。

## 🎯 要点

| 维度 | 内容 |
|------|------|
| **核心问题** | 现有视频 LLM 要么牺牲图像能力换取视频性能，要么无法高效处理动态分辨率和长视频 |
| **关键创新** | ① AVT：用 2D-RoPE 替代绝对位置编码实现任意分辨率输入 ② DiffFP：基于帧间像素差异的自适应 token 剪枝 ③ VL3-Syn7M：从 COYO-700M 清洗+重标注的高质量图文数据 ④ 四阶段"以图像为中心"训练范式 |
| **架构** | SigLIP-SO400M（视觉编码器）+ 2层 MLP（投影器）+ DiffFP（视频压缩器）+ Qwen2.5（LLM） |
| **关键结果** | 2B：VideoMME 59.6（+4.0）、MathVista 59.2（+7.9）；7B：VideoMME 66.2（+2.0）、MLVU 73.0（+2.1）|
| **局限性** | 音频模态未集成；极长视频（>3h）仍受 token 上限约束；Charades-STA 仅自身有结果无对比 |

## 🔬 深入分析

### 整体架构

![VideoLLaMA3 整体架构](https://ar5iv.labs.arxiv.org/html/2501.13106v4/assets/x3.png)

VideoLLaMA3 的整体架构由四个核心模块组成：**视觉编码器**（SigLIP-SO400M-patch14-384）、**MLP 投影器**（2层线性层 + GELU 激活）、**视频压缩器**（DiffFP）和**大语言模型**（Qwen2.5-1.5B/7B）。图像输入经 AVT 动态分割为多个 tile 后由 SigLIP 编码，视频输入额外经过 DiffFP 进行时间冗余压缩，最终所有视觉 token 与文本 token 拼接送入 LLM 进行自回归生成。

### 核心方法一：任意分辨率视觉编码（AVT）

传统 ViT 使用固定分辨率的绝对位置编码（APE），限制了输入图像的尺寸灵活性。AVT 的核心改进是将 SigLIP 中的 APE **替换为 2D 旋转位置编码（2D-RoPE）**，使编码器能够处理任意分辨率的输入。具体流程为：(1) 将输入图像按照预定义的 tile 配置（如 384×384 的整数倍）进行动态分割；(2) 每个 tile 独立通过 SigLIP 编码为 patch token 序列；(3) 2D-RoPE 根据每个 patch 在原图中的实际二维坐标注入位置信息，而非依赖固定的序列索引。这种设计使得模型既能处理低分辨率缩略图，也能处理高分辨率文档图像，同时保持位置编码的连续性和泛化能力。

### 核心方法二：差分帧剪枝（DiffFP）

![DiffFP 工作流程](https://ar5iv.labs.arxiv.org/html/2501.13106v4/assets/x4.png)

视频中相邻帧存在大量时间冗余，DiffFP 通过两步策略高效压缩视频 token：

**第一步：时间冗余剪枝。** 计算相邻帧在像素空间中对应 patch 区域的 L1 距离（1-norm），当距离低于阈值 τ=0.1 时，认为该 patch 在时间上无变化，直接剪除。第一帧的所有 patch 保留作为参考帧。

**第二步：空间下采样。** 对保留的 patch token 进行 2×2 的空间分组，通过双线性插值将每组 4 个 token 合并为 1 个，实现 4 倍空间压缩。

```
算法: DiffFP 差分帧剪枝
输入: 视频帧序列 frames[0..T-1], 每帧 patch 数 N, 阈值 τ=0.1
输出: 压缩后的视觉 token 序列

1. 对 frames[0] 的所有 N 个 patch token 全部保留
2. FOR t = 1 TO T-1:
3.     FOR 每个 patch 位置 i = 1 TO N:
4.         diff_i = L1_norm(pixel_patch(frames[t], i) - pixel_patch(frames[t-1], i))
5.         IF diff_i >= τ:
6.             保留 frames[t] 的第 i 个 patch token
7.         ELSE:
8.             剪除该 token（标记为冗余）
9. 对所有保留的 token 进行 2×2 空间分组 + 双线性插值下采样
10. RETURN 压缩后的 token 序列
```

DiffFP 的设计哲学是"**在像素空间做决策，在特征空间做压缩**"——帧差计算在原始像素上进行（计算成本极低），而实际剪枝作用于编码后的视觉 token。这避免了需要额外可学习模块来判断冗余的开销，同时保证了对静态背景的高效压缩。

### 核心方法三：四阶段训练范式

![四阶段训练流程](https://ar5iv.labs.arxiv.org/html/2501.13106v4/assets/x2.png)

VideoLLaMA3 采用"**以图像为中心**"的四阶段渐进式训练策略，核心理念是：**先在大规模高质量图像数据上建立强大的视觉理解能力，再迁移到视频领域**。

| 阶段 | 名称 | 可训练模块 | 数据规模 | 核心目标 |
|------|------|-----------|---------|---------|
| Stage 1 | 视觉编码器适配 | 编码器 + 投影器 | ~26M 图文对 | 将 APE 替换为 2D-RoPE，适配动态分辨率 |
| Stage 2 | 视觉-语言对齐 | 全部模块 | ~26M 图文对 | 深度对齐视觉与语言表示空间 |
| Stage 3 | 多任务微调 | 全部模块 | ~5M 指令数据 | 引入 DiffFP，同时训练图像+视频任务 |
| Stage 4 | 视频专项微调 | 全部模块 | ~1.3M 视频数据 | 强化视频时序理解与长视频能力 |

Stage 1-2 使用的数据包括自建的 VL3-Syn7M（从 COYO-700M 经 5 步清洗：宽高比过滤 → 美学评分 → CLIP 相似度 → KNN 去重 → InternVL2 重标注）以及公开数据集。Stage 3 引入视频数据和 DiffFP 模块，Stage 4 专注于视频能力的进一步提升。

### 数据工程：VL3-Syn7M

VL3-Syn7M 的构建体现了"数据质量 > 数据数量"的理念。从 COYO-700M 的 7 亿图文对出发，经过五步严格清洗：
1. **宽高比过滤**：去除极端比例图像
2. **美学评分**：使用美学评估模型过滤低质量图像
3. **CLIP 相似度**：去除图文不匹配的样本
4. **KNN 聚类去重**：消除近重复样本
5. **InternVL2 重标注**：用强 MLLM 重新生成高质量描述

最终从 7 亿样本中筛选出 700 万高质量图文对，数据量压缩 100 倍但质量显著提升。

### 消融实验

**视觉编码器选择：** 在 GQA、AI2D、ChartQA、DocVQA、MME 五个基准上对比 CLIP-ViT-L-336、DFN-5B-ViT-H-378 和 SigLIP-SO400M-384 三个编码器。SigLIP 在细粒度文本理解任务（ChartQA 22.44 vs 18.32/16.40，DocVQA 31.32 vs 24.86/23.09）上显著优于其他两者，因此被选为最终编码器。

### 关键实验结果

**图像理解（7B）：** ChartQA 86.3、DocVQA 94.9、InfoVQA 78.9、MathVista 67.1、MathVision 26.2、RealWorldQA 72.7、BLINK 56.7，在多数基准上超越 Qwen2-VL-7B 和 InternVL2.5-8B。

**视频理解（7B）：** VideoMME（w/o sub）66.2、VideoMME（w/ sub）70.3、PerceptionTest 72.8、MLVU 73.0、MMVU 44.1，在通用视频理解和长视频理解上全面领先。特别是 MLVU 73.0 比第二名高 2.1 个点，体现了 DiffFP 在长视频场景下的优势。

**视频理解（2B）：** 在所有长视频基准（MLVU 65.4、LongVideoBench 57.1、LVBench 41.6）和时序推理基准（TempCompass 63.4、NextQA 81.1）上均取得最佳成绩，证明了该框架在小模型上的有效性。

## 🧪 练习题

1. **概念理解**：AVT 中使用 2D-RoPE 替代绝对位置编码的核心优势是什么？为什么这对处理不同分辨率的图像至关重要？

2. **方法分析**：DiffFP 的阈值 τ=0.1 是在什么空间计算的？如果将阈值设为 0（不剪枝）或设为 1（几乎全部剪除），分别会对模型性能产生什么影响？

3. **训练策略**：为什么 VideoLLaMA3 选择在 Stage 3 才引入 DiffFP 视频压缩器，而不是从 Stage 1 就开始训练？这种"以图像为中心"的训练策略相比直接在视频数据上训练有什么优势？

4. **对比思考**：与 Qwen2-VL 的 naive dynamic resolution（直接调整输入分辨率）相比，VideoLLaMA3 的 AVT + tile 分割方案在计算效率和位置编码泛化性上有何异同？

5. **工程实践**：VL3-Syn7M 从 7 亿样本中筛选出 700 万，压缩比达 100:1。如果你要为一个新领域（如医学影像）构建类似的高质量数据集，你会如何调整这五步清洗流程？