### Tell2Adapt: 基于文本提示的统一无源域适应医学图像分割框架

```yaml
title: "Tell2Adapt: A Unified Framework for Source-Free Domain Adaptation in Medical Image Segmentation via Text-Prompted VFM Guidance"
authors: [Wenxuan Wang, Fenghe Tang, Haonan Peng, Yuming Jiang, S. Kevin Zhou]
venue: arXiv preprint
year: 2026
arxiv_id: "2603.05012"
tags: [SFUDA, domain_adaptation, medical_image_segmentation, VFM, knowledge_distillation, LLM]
read_date: 2025-01-20
difficulty: 4
relevance: 5
```

## 📝 一句话总结

Tell2Adapt通过LLM标准化文本提示驱动视觉基础模型(BiomedParse)生成高质量伪标签，再经知识蒸馏和Beta分布视觉合理性验证，实现了跨10个域适应方向的统一无源域适应医学图像分割，性能接近全监督上界。

## 🎯 核心要点

- **问题定义**: 现有SFUDA方法仅适用于低域差/特定目标场景，缺乏能统一处理多目标、多模态、大域差的通用框架
- **核心创新**: 用文本提示(而非空间提示)驱动VFM，彻底打破"源模型预测不准→空间提示噪声→VFM伪标签错误"的误差传播链
- **三大模块**: CAPR(LLM标准化提示) → VFM知识蒸馏(BiomedParse→nnUNet) → VPR(Beta分布去噪)
- **关键结果**: MR→CT腹部分割mDICE 88.2%，接近全监督88.4%；模型从371.8M参数/26.1GB压缩至31.1M参数/4.8GB
- **统一性**: 单一方法覆盖10个适应方向(CT↔MR, MRI多序列, US↔MR, 内窥镜跨数据集)、22个解剖目标

## 🔬 深入细节

### 整体架构

```
┌─────────────────────────────────────────────────────────────────┐
│                    Tell2Adapt Pipeline                           │
│                                                                 │
│  用户文本提示 ──→ [CAPR/LLM] ──→ 标准化提示                      │
│       "segment liver"        "[Liver] in [Abdomen] [CT]"        │
│                                      │                          │
│                                      ▼                          │
│  目标域图像 ──→ [BiomedParse VFM] ──→ 伪标签 ŷ_t               │
│       x_t              (文本+图像编码→掩码解码)                   │
│                                      │                          │
│                                      ▼                          │
│  HE(x_t) + ŷ_t ──→ [nnUNet学生模型训练] ──→ 初始预测            │
│                      (Dice + CE Loss)           │                │
│                                                 ▼               │
│                                    [VPR Beta分布验证]            │
│                                         │                       │
│                                         ▼                       │
│                                    最终精炼预测                   │
└─────────────────────────────────────────────────────────────────┘
```

### 模块1: CAPR (Context-Aware Prompts Regularization)

**动机**: 用户输入的文本提示千差万别（拼写错误、缩写、缺少上下文），直接输入VFM会导致分割失败。

**方法**: 利用LLM (Qwen3-VL-8B-Instruct) 进行两步处理：
1. **全局上下文推断**: 分析所有输入提示，识别共享的成像模态和解剖区域
2. **逐条标准化**: 纠正拼写、消歧义、补充上下文，统一为规范格式

**规范格式**: `[Target] in [Anatomical Site] [Modality]`

```
示例转换:
  输入: "LV", "MYO", "LA"  (心脏超声场景)
  输出: "Left Ventricle in Cardiac Ultrasound"
        "Myocardium in Cardiac Ultrasound"  
        "Left Atrium in Cardiac Ultrasound"
```

### 模块2: VFM-Guided Knowledge Distillation

**伪标签生成**:
$$\hat{y}_t = \text{MaskDecoder}(\text{TextEnc}(p_{canonical}), \text{ImgEnc}(x_t))$$

**直方图均衡化预处理** (缓解低级域偏移):
$$\mathcal{D}_T^{adapt} = \{(\text{HE}(x_j^t), \hat{y}_j^t)\}_{j=1}^{N_t}$$

**训练损失**:
$$\mathcal{L} = \mathcal{L}_{Dice} + \mathcal{L}_{CE}$$

**模型压缩效果**:
| 指标 | BiomedParse (教师) | nnUNet (学生) |
|------|-------------------|--------------|
| 参数量 | 371.8M | 31.1M (↓12×) |
| 峰值显存 | 26.1 GB | 4.8 GB (↓5.4×) |

### 模块3: VPR (Visual Plausibility Refinement)

**动机**: 学生模型预测可能包含解剖学上不合理的区域（假阳性、错误识别）。

**核心思想**: 利用VFM的解剖先验知识，对预测区域提取视觉特征并用Beta分布建模，过滤异常区域。

**算法伪代码**:
```python
def VPR(prediction, image, vfm_priors):
    """Visual Plausibility Refinement"""
    # Step 1: 获取初始预测的连通区域
    components = connected_components(prediction)
    
    # Step 2: 对每个连通区域提取4维视觉特征
    for region in components:
        features = extract_features(region, image)
        # features = [avg_probability, R_intensity, G_intensity, B_intensity]
        
        # Step 3: 用VFM先验的Beta分布评估合理性
        for k in range(4):  # 4个特征维度
            alpha_k, beta_k = vfm_priors[target_class][k]
            # Beta分布参数来自VFM在参考数据上的统计
            mu_k = alpha_k / (alpha_k + beta_k)
            sigma_k = sqrt(alpha_k * beta_k / ((alpha_k+beta_k)^2 * (alpha_k+beta_k+1)))
            threshold_k = mu_k - 2 * sigma_k
            
            # Step 4: 低于阈值则判定为假阳性
            if features[k] < threshold_k:
                remove(region)
                break
    
    return refined_prediction
```

**阈值公式**:
$$\tau_k = \mu_k^S - 2\sigma_k^S$$

其中 $\mu_k^S$ 和 $\sigma_k^S$ 分别为第k个特征在Beta分布下的均值和标准差。

### 实验结果

**10个域适应方向的性能** (mDICE %):

| 适应方向 | Baseline | 最佳传统SFUDA | Tell2Adapt | Supervised |
|---------|----------|-------------|-----------|-----------|
| MR→CT (腹部15器官) | 47.4 | 19.9 (SRPL) | **88.2** | 88.4 |
| CT→MR (腹部13器官) | 64.3 | 19.6 (SRPL) | **82.3** | 86.2 |
| T1n→T2w (脑肿瘤) | - | - | 显著提升 | - |
| US→MR (心脏) | - | - | 显著提升 | - |
| Kvasir→CVCDB (息肉) | - | - | 显著提升 | - |

**关键发现**:
- Tell2Adapt在MR→CT上达到88.2% mDICE，与全监督(88.4%)几乎持平
- 传统SFUDA方法在大域差场景下普遍崩溃(mDICE < 20%)
- 基于空间提示的VFM方法(DFG, IPLC, SRPL)因误差传播同样表现不佳
- Tell2Adapt是唯一能在所有10个方向上稳定工作的统一框架

### 设计选择与消融

- **为何选择文本提示而非空间提示**: 空间提示依赖源模型预测质量，在大域差下严重退化；文本提示独立于源模型，天然避免误差传播
- **为何需要CAPR**: 直接使用原始文本提示导致VFM分割质量不稳定，标准化后显著提升
- **为何需要VPR**: 知识蒸馏后仍存在假阳性，Beta分布验证可有效过滤解剖学不合理预测
- **为何选择BiomedParse**: 唯一支持纯文本提示的医学VFM，无需空间先验，适合SFUDA场景

## 🧪 练习题

### 概念理解
1. **为什么基于空间提示的VFM(如MedSAM)不适合SFUDA场景？** 请描述误差传播链。
2. **CAPR模块的规范格式"[Target] in [Anatomical Site] [Modality]"为何有效？** 从VFM文本编码器的角度分析。
3. **VPR为什么选择Beta分布而非高斯分布来建模视觉特征？** 考虑像素强度和概率值的值域特性。

### 深度思考
4. **如果BiomedParse对某个罕见解剖结构的分割能力本身较弱，Tell2Adapt的性能瓶颈在哪里？如何改进？**
5. **Tell2Adapt的知识蒸馏是一次性的(offline)还是迭代的？这种设计选择有什么优缺点？**
6. **设计一个实验来验证：CAPR中LLM的选择(如换成GPT-4)对最终分割性能的影响有多大？**

### 扩展应用
7. **如何将Tell2Adapt的思路扩展到3D医学图像分割？需要解决哪些额外挑战？**
8. **如果目标域只有极少量图像(如5张)，Tell2Adapt的哪个模块最可能失效？如何应对？**