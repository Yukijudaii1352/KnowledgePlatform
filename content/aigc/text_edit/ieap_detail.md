### 编辑即程序 (IEAP)

```yaml
id: ieap
name: IEAP
full_name: "编辑即程序 (Image Editing As Programs)"
year: 2025
org: NUS
paper_url: https://arxiv.org/abs/2506.04158
category: instruction_edit
parent: icedit
motivation: "编辑即程序处理结构不一致"
```

#### 📝 一句话总结

IEAP 提出将复杂图像编辑指令通过 VLM 的 Chain-of-Thought 推理分解为五种原子操作（定位、修复、编辑、合成、全局变换）的可执行程序，由神经程序解释器顺序执行，解决了 DiT 架构在结构不一致编辑（如添加/删除/移动/缩放等需要布局修改的操作）上的性能瓶颈。

#### 🎯 核心要点

- **关键洞察**：DiT 架构在结构一致编辑（属性/风格修改）上表现良好，但在结构不一致编辑（需要空间布局修改的操作如 add/remove/move/resize）上性能显著下降
- **程序化分解框架**：利用 VLM 的 CoT 推理将自由文本编辑指令解析为五种原子操作的有序序列，由神经程序解释器顺序执行
- **五种原子操作**：RoI 定位（LLM + SAM 分割）、RoI 修复（提示条件填充）、RoI 编辑（属性修改）、RoI 合成（环形掩码边界融合）、全局变换（风格/色调）
- **四个专用 LoRA 模型**：基于 FLUX.1-dev 的 Inpaint / Edit / Composite / Global 四个 LoRA rank-128 微调模型，各自专注一类原子操作
- **训练配置**：Prodigy 优化器，50K 迭代，单张 H100 GPU，数据来自 AnyEdit 数据集 + CelebHQ-FM（表情编辑）
- **SOTA 性能**：MagicBrush 上 CLIPim 0.922、DINO 0.870；AnyEdit 上 GPT-4o 评分 4.41，全面超越 InstructPix2Pix、MagicBrush、UltraEdit、ICEdit 等方法
- **复杂指令能力**：在多步骤复杂编辑任务上可与 SeedEdit、Gemini、GPT-4o 等商业模型竞争甚至超越

#### 🔬 深入细节

##### 动机：结构一致 vs. 结构不一致编辑的性能鸿沟

![预实验结果](https://ar5iv.labs.arxiv.org/html/2506.04158/assets/x2.png)
*图：预实验结果。(a) 三类编辑在不同指令遵循模型上的 GPT-4o 评分；(b) 局部语义编辑的典型失败案例*

论文首先对指令驱动的图像编辑进行了系统性分类，将其分为三大类：

1. **局部语义编辑**（结构不一致）：修改物体的身份、位置或大小，如添加、删除、替换、动作变化、移动、缩放
2. **局部属性编辑**（结构一致）：调整物体的属性，如颜色、纹理、外观、表情、背景变化
3. **全局内容编辑**（结构一致）：改变整体图像，如色调迁移、风格变化

通过在 AnyEdit 数据集上使用 OminiControl 训练并用 GPT-4o 评分，实验揭示了一个关键发现：**局部属性编辑和全局内容编辑都能获得较高的 GPT-4o 评分，但局部语义编辑（需要空间布局修改的操作）性能显著下降**。例如 "add" 和 "action change" 会破坏不相关区域（如背景），而 "move" 和 "resize" 则完全失败。

> 💡 **关键洞察**：空间布局修改仍然是扩散模型编辑的核心挑战。尽管 DiT 架构使用了强大的全注意力机制来捕获长距离依赖，但在需要非平凡场景重构的编辑操作上仍然力不从心。原因在于布局修改的组合复杂度使得有限训练数据难以覆盖所有模式。

##### 核心方法：程序化分解框架

![IEAP 流水线总览](https://ar5iv.labs.arxiv.org/html/2506.04158/assets/x3.png)
*图：IEAP 流水线。原始编辑指令首先由 VLM 解析为原子操作序列，然后由神经程序解释器顺序执行*

IEAP 的核心思想是：**与其让单一模型端到端地处理复杂编辑，不如将其分解为简单的、模型擅长的原子操作序列**。整体流程可形式化为：

$$T \equiv \bigoplus_{k=1}^{K} \mathcal{A}_k, \quad \mathcal{A}_k \in \{\mathcal{A}_{\text{loc}}, \mathcal{A}_{\text{inp}}, \mathcal{A}_{\text{edit}}, \mathcal{A}_{\text{comp}}, \mathcal{A}_{\text{global}}\}$$

其中 \(T\) 为自由文本编辑指令，\(\bigoplus\) 表示顺序程序组合，\(K\) 为原子操作数量。

##### 五种原子操作详解

**1. RoI 定位 (\(\mathcal{A}_{\text{loc}}\))**

所有需要布局修改的编辑都从定位感兴趣区域（RoI）开始。给定图像 \(I\) 和编辑指令 \(T\)：

$$\rho = M_{\text{LLM}}(T)$$

$$m = M_{\text{SAM}}(I, \rho)$$

其中 \(\rho\) 是 LLM 提取的文本 RoI 描述，\(M_{\text{SAM}}\) 是 SAM 分割模型生成的二值掩码 \(m\)。这一步将自然语言中的空间指代转化为精确的像素级区域。

**2. RoI 修复 (\(\mathcal{A}_{\text{inp}}\))**

在定位区域内引入新内容或移除现有元素，实现语义级的添加、替换或删除：

$$I_{\text{inp}} = M_{\text{inp}}(I, m, p_{\text{inp}})$$

其中 \(M_{\text{inp}}\) 是修复模型，\(p_{\text{inp}}\) 是由 VLM 生成的修复提示词。该模型基于 FLUX.1-dev + LoRA 微调，以掩码区域和文本提示为条件生成新内容。

**3. RoI 编辑 (\(\mathcal{A}_{\text{edit}}\))**

修改区域内的视觉属性（如颜色、纹理、外观），反映指令指定的细粒度属性变化：

$$I_{\text{edit}} = M_{\text{edit}}(I, m, p_{\text{edit}})$$

与修复不同，编辑操作保持物体的结构和身份不变，仅修改指定属性。

**4. RoI 合成 (\(\mathcal{A}_{\text{comp}}\))**

将编辑后的区域重新融合到完整图像中，保持空间连贯性和视觉连续性。这是 IEAP 的关键创新之一——使用**环形掩码**进行边界融合：

$$m_{\text{annular}} = \text{Dilate}(m, d) - m$$

$$I_{\text{comp}} = M_{\text{comp}}(I_{\text{edit}}, m_{\text{annular}}, p_{\text{comp}})$$

其中 \(d\) 为膨胀半径，环形掩码 \(m_{\text{annular}}\) 仅覆盖编辑区域的边界环带。这样合成模型只需要处理边界过渡区域，而非整个编辑区域，有效避免了拼接伪影。

> 💡 **环形掩码的直觉**：想象将一张编辑过的贴纸贴到原图上，边缘处会有明显的接缝。环形掩码让模型只关注这个"接缝"区域，进行自然的边界融合，而不会影响已编辑的核心区域或未编辑的背景。

**5. 全局变换 (\(\mathcal{A}_{\text{global}}\))**

对整体图像进行一致性修改，如改变光照、天气或风格：

$$I_{\text{global}} = M_{\text{global}}(I, p_{\text{global}})$$

##### 伪代码：IEAP 编辑流程

```python
# IEAP 编辑流程伪代码
def ieap_edit(image, instruction):
    # Step 1: VLM CoT 推理，将指令分解为原子操作序列
    operations = VLM_CoT_Parse(instruction)  
    # e.g., [("loc", "cat"), ("inp", "remove cat"), ("comp", "blend boundary")]
    
    current_image = image
    current_mask = None
    
    for op_type, op_prompt in operations:
        if op_type == "loc":
            # RoI 定位：LLM 提取文本描述 → SAM 生成掩码
            text_roi = LLM_extract(op_prompt)
            current_mask = SAM_segment(current_image, text_roi)
            
        elif op_type == "inp":
            # RoI 修复：在掩码区域内生成/移除内容
            current_image = InpaintModel(current_image, current_mask, op_prompt)
            
        elif op_type == "edit":
            # RoI 编辑：修改掩码区域内的属性
            current_image = EditModel(current_image, current_mask, op_prompt)
            
        elif op_type == "comp":
            # RoI 合成：环形掩码边界融合
            annular_mask = dilate(current_mask, d=20) - current_mask
            current_image = CompositeModel(current_image, annular_mask, op_prompt)
            
        elif op_type == "global":
            # 全局变换：整体风格/色调调整
            current_image = GlobalModel(current_image, op_prompt)
    
    return current_image
```

##### 编辑类型到原子操作的映射

不同类型的编辑指令被分解为不同的原子操作序列：

| 编辑类型 | 原子操作序列 |
|---------|------------|
| 添加 (Add) | Loc → Inp → Comp |
| 删除 (Remove) | Loc → Inp → Comp |
| 替换 (Replace) | Loc → Inp → Comp |
| 移动 (Move) | Loc → Inp(源) → Inp(目标) → Comp |
| 缩放 (Resize) | Loc → Inp → Comp |
| 动作变化 (Action Change) | Loc → Inp → Comp |
| 属性编辑 (Color/Texture/Appearance) | Loc → Edit |
| 表情变化 (Expression) | Loc → Edit |
| 背景变化 (Background) | Loc → Inp → Comp |
| 风格/色调变化 (Style/Tone) | Global |

> ⚠️ **注意**：对于复杂的多步骤指令（如"将猫移到桌子上并把它变成橙色"），VLM 会将其分解为多个子任务，每个子任务再映射为对应的原子操作序列，整体顺序执行。

##### 示例流程

![示例流程](https://ar5iv.labs.arxiv.org/html/2506.04158/assets/x4.png)
*图：示例流程。(a) 动作变化的执行过程；(b) 移动操作的执行过程*

以"移动"操作为例，其完整执行流程为：
1. **Loc**：定位目标物体，生成分割掩码
2. **Inp（源区域）**：在原位置用背景修复填充，"擦除"物体
3. **Inp（目标区域）**：在新位置用物体描述生成内容
4. **Comp**：使用环形掩码融合新旧区域的边界

##### 训练细节

- **基础模型**：FLUX.1-dev（DiT 架构）
- **微调方式**：LoRA rank 128，分别训练 4 个专用模型（Inpaint / Edit / Composite / Global）
- **优化器**：Prodigy（自适应学习率优化器）
- **训练数据**：AnyEdit 数据集 + CelebHQ-FM（表情编辑），经 GPT-4o 质量过滤
- **训练规模**：50K 迭代，单张 H100 GPU
- **VLM 推理**：使用 GPT-4o 进行 CoT 指令分解

##### 与传统方法的核心区别

| 维度 | 传统端到端方法 | IEAP |
|-----|-------------|------|
| 编辑范式 | 单一模型处理所有编辑类型 | 分解为原子操作，专用模型各司其职 |
| 布局修改 | 直接学习复杂的空间变换 | 通过修复+合成的组合间接实现 |
| 复杂指令 | 难以处理多步骤指令 | CoT 推理自然支持多步分解 |
| 边界处理 | 常出现拼接伪影 | 环形掩码专门处理边界融合 |
| 可解释性 | 黑盒端到端 | 每步操作可视化、可调试 |

##### 实验结果

在 MagicBrush 基准上，IEAP 取得了全面领先的结果：

| 方法 | L1↓ | L2↓ | CLIPim↑ | DINO↑ | CLIPout↑ |
|-----|-----|-----|---------|-------|----------|
| InstructPix2Pix | 0.114 | 0.263 | 0.855 | 0.742 | 0.217 |
| MagicBrush | 0.072 | 0.168 | 0.901 | 0.836 | 0.263 |
| UltraEdit | 0.089 | 0.197 | 0.882 | 0.805 | 0.260 |
| ICEdit | 0.068 | 0.159 | 0.910 | 0.850 | 0.264 |
| **IEAP** | **0.056** | **0.133** | **0.922** | **0.870** | **0.273** |

在 AnyEdit 综合评测上，IEAP 的 GPT-4o 评分达到 4.41（满分 5），显著超越所有基线方法。

##### 消融实验

消融实验验证了各组件的贡献：
- **CoT + 程序化分解**：最关键组件，移除后性能大幅下降，证明了"编辑即程序"范式的核心价值
- **环形掩码合成**：移除后边界区域出现明显伪影
- **各专用模型**：每个原子操作模型都对最终性能有正向贡献

##### 局限性

- **阴影不一致**：移动/添加物体后，阴影方向和强度可能与场景光照不匹配
- **多轮迭代质量衰减**：多次顺序编辑后，图像质量会逐步下降（误差累积）
- **依赖 VLM 推理质量**：指令分解的准确性取决于 VLM（GPT-4o）的推理能力

#### 🧪 练习题

```yaml
question: "IEAP 框架中，RoI 合成（Compositing）操作使用环形掩码（Annular Mask）的主要目的是什么？"
options:
  - "扩大编辑区域以覆盖更多背景内容"
  - "仅对编辑区域的边界环带进行融合，避免拼接伪影同时保护核心编辑内容"
  - "减少合成模型的计算量以加速推理"
  - "为后续的全局变换操作提供区域标记"
answer: 1
explain: "环形掩码通过膨胀原始掩码再减去原始掩码得到，仅覆盖编辑区域的边界环带。这样合成模型只需处理边界过渡区域，既能消除拼接伪影实现自然融合，又不会影响已编辑的核心区域内容。"
```