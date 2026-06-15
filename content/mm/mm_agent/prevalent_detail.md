### PREVALENT
```yaml
id: prevalent
name: PREVALENT
full_name: 预训练视觉语言导航 (PREVALENT)
year: '2020'
org: Microsoft
paper_url: https://arxiv.org/abs/2002.10638
category: vln
parent: envdrop
motivation: 大规模图像-文本-动作预训练范式
```

#### 📝 一句话总结
PREVALENT 把 VLN 引入“大规模图像-文本-动作 triplet 预训练，再迁移到下游导航”的范式，用 masked language modeling 和 action prediction 学到可复用的导航视觉语言表征。

#### 🎯 核心要点
- **从任务训练转向预训练**：不再只在 R2R 上训练一个导航策略，而是先训练通用的 vision-language-action 表征，再 fine-tune 到 R2R、CVDN、HANNA 等任务。
- **数据规模来自 speaker 合成**：原始 R2R 样本远远不够，PREVALENT 使用 speaker 生成大规模 route-instruction 伪数据，形成数百万级单步 triplet。
- **输入单位是单步 triplet**：预训练样本通常由指令、当前全景视觉状态和下一动作组成，强调状态-语言-动作的局部对齐。
- **两个核心目标**：图像辅助的 MLM 让语言 token 依赖视觉上下文恢复；action prediction 让融合表征预测下一步导航动作。
- **局限**：它增强了单步视觉语言对齐，但没有显式建模完整历史，后续 VLN-BERT 和 HAMT 分别从循环状态和全历史 Transformer 方向补足这一点。

#### 🔬 深入细节
论文：*Towards Learning a Generic Agent for Vision-and-Language Navigation via Pre-training*。核心图 Figure 1 展示了用 image-text-action triplets 预训练再迁移到多个 VLN 下游任务的流程，公开图源：https://ar5iv.labs.arxiv.org/html/2002.10638/assets/x1.png

PREVALENT 的出发点是：VLN 数据太少，而通用 V&L BERT 式预训练在很多视觉语言任务中已经证明有效。它把导航轨迹拆成多个时间步样本，每个样本包含自然语言指令 \(\boldsymbol{x}\)、当前全景视觉状态 \(\boldsymbol{s}\) 和专家下一动作 \(\boldsymbol{a}\)。视觉状态由 36 个 view 组成，每个 view 拼接 CNN 图像特征和方向特征，再映射到 Transformer 隐空间。

模型结构采用单模态编码再跨模态融合的 Transformer。文本 token 经过语言 Transformer，视觉 token 经过视觉 Transformer，随后由跨模态 Transformer 对齐语言与全景观察。最终的融合 `[CLS]` 表征用于动作预测，masked token 的输出用于语言恢复。视觉 embedding 中包含 2048 维图像特征和方向 embedding，方向信息对“左转、上楼、朝门走”等导航语言尤为关键。

第一个预训练任务是 image-attended masked language modeling。随机 mask 指令中的词，模型需要结合未 mask 的上下文和当前视觉状态恢复原词：
\[
\mathcal{L}_{\mathrm{MLM}}
=-\mathbb{E}\log p(x_i\mid \boldsymbol{x}_{\backslash i},\boldsymbol{s}).
\]
与普通 BERT 不同，这里恢复词时应当利用视觉证据，例如“walk past the [MASK]”在看到 sofa、table、stairs 时会有不同倾向。

第二个任务是 action prediction。模型从融合后的 `[CLS]` 表征和视觉候选中预测专家动作：
\[
\mathcal{L}_{\mathrm{AP}}
=-\mathbb{E}\log p(\boldsymbol{a}\mid x_{\mathtt{[CLS]}},\boldsymbol{s}),\qquad
\mathcal{L}_{\mathrm{pre}}=\mathcal{L}_{\mathrm{MLM}}+\mathcal{L}_{\mathrm{AP}}.
\]
这个目标把语言理解直接绑到导航决策上，而不是只学图文匹配。论文报告中，原始 R2R 只能形成约十万级样本，speaker 合成数据扩展到数百万级，成为预训练能生效的关键条件。

```text
Algorithm: PREVALENT pre-training and fine-tuning
Input: human VLN data D, speaker-augmented trajectories A
1. Convert trajectories into step-level triplets (instruction x, state s_t, action a_t).
2. Build Transformer inputs from word tokens, 36-view visual tokens, and orientation features.
3. For each batch:
   a. Mask selected instruction tokens.
   b. Encode text and vision with single-modal Transformers.
   c. Fuse modalities with cross-modal Transformer.
   d. Optimize MLM loss and action prediction loss.
4. Initialize downstream VLN model with the pretrained representation.
5. Fine-tune on R2R or transfer to CVDN/HANNA task data.
```

PREVALENT 的价值不只是性能提升，而是改变了 VLN 的研究范式：从“为每个数据集设计一个 policy 网络”变成“预训练一个导航感知的多模态 backbone”。不过它的历史建模仍然弱，因为预训练主要看单步状态；一条长指令走到中段后，模型需要知道已完成哪些子目标。VLN-BERT 因此把 recurrent state 注入 Transformer，HAMT 则进一步显式编码完整历史。

#### 🧪 练习题
1. PREVALENT 的 action prediction 与普通 image-text matching 相比，为什么更适合 VLN？
2. 如果只用原始 R2R 数据而不使用 speaker 合成数据预训练，可能遇到哪些过拟合现象？
