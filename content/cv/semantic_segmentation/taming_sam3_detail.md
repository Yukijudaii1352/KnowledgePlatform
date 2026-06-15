### Taming SAM3

```yaml
id: taming_sam3
name: Taming SAM3
full_name: "驯服SAM3 (Taming SAM3)"
year: "2026"
org: "多机构"
paper_url: "https://arxiv.org/abs/2602.06333"
category: "frontier"
parent: "sam"
motivation: "概念库增强开放词汇分割"
```

#### 📝 一句话总结

Taming SAM3 提出 ConceptBank，一个无参数校准框架，用目标域原型、代表性支持样本和候选概念融合修正 SAM3 的提示语义，使开放词汇分割在自然场景与遥感分布漂移下更稳健。

#### 🎯 核心要点

- 核心问题：SAM3 的 promptable concept segmentation 在目标域会遭遇 data drift 与 concept drift。
- ConceptBank：为每个类别构建一个校准后的概念嵌入，推理时替代静态类名 prompt。
- Prototype Anchoring：从目标域少量支持样本中估计类别视觉原型。
- Representative Mining：挑选与原型最一致的支持样本，减少异常样本和噪声标注影响。
- Candidate Concept Fusion：生成候选概念描述，用支持集上的分割 Dice 评分，再加权融合文本嵌入。
- 参数效率：不更新 SAM3 权重，不引入可训练模块，只校准 prompt/概念锚点。
- 实验覆盖自然场景和遥感 OVS 基准；论文报告在 LoveDA、Potsdam、Vaihingen、iSAID 等遥感数据上显著提升 SAM3。

#### 🔬 深入细节

![ConceptBank 方法图](https://arxiv.org/html/2602.06333v1/x2.png)
*图：ConceptBank 使用目标域统计构建概念库，在不改动 SAM3 参数的情况下校准开放词汇分割提示。*

##### 算法伪代码

```python
def build_concept_bank(sam3, support_set, class_names, llm, top_k=8, top_j=4, tau=0.07):
    bank = {}
    for cls in class_names:
        # Stage I: 目标域视觉原型
        crops = mask_pool_crops(support_set, cls)
        feats = [normalize(sam3.image_encoder(crop)) for crop in crops]
        prototype = normalize(mean(feats))

        # Stage II: 代表性支持集
        ranked = sort_by_cosine(feats, prototype)
        reps = take_top_k(ranked, top_k)

        # Stage III: 候选概念评分与融合
        prompts = llm_generate_candidate_descriptions(cls)
        scores, embeds = [], []
        for prompt in prompts:
            emb = sam3.text_encoder(prompt)
            dice = evaluate_prompt_dice(sam3, reps, emb)
            scores.append(dice)
            embeds.append(normalize(emb))

        best = top_j_indices(scores, top_j)
        weights = softmax([scores[i] / tau for i in best])
        bank[cls] = sum(w * embeds[i] for w, i in zip(weights, best))
    return bank

def conceptbank_infer(sam3, image, bank):
    return sam3.segment_with_concept_embeddings(image, bank.values())
```

##### 方法解读

SAM3 把分割推进到 concept prompt：给一个文本概念或图像范例，模型输出匹配实例的 mask。但开放词汇分割的标签不是天然稳定的。不同数据集对同一词有不同标注范围；遥感图像还存在俯视视角、尺度、纹理和成像条件差异，导致通用 prompt 与目标域视觉证据错位。

论文把问题拆成两类漂移。Data drift 指视觉分布从 SAM3 预训练/源域转向目标域，例如遥感建筑、水体、道路与自然图像差异巨大。Concept drift 指类别词本身的含义变化，例如 “field”“building”“road” 在不同数据集中的标注粒度和边界规范不同。

ConceptBank 不微调 SAM3，而是校准概念嵌入。Stage I 对每个类别从支持集 mask 区域抽取视觉特征并平均，得到目标域原型：

$$
\mu_c=\operatorname{Norm}\left(\frac{1}{|S_c|}\sum_{(x,y)\in S_c}\phi_I(\operatorname{maskcrop}(x,y,c))\right)
$$

Stage II 用余弦相似度选择代表性支持样本：

$$
R_c=\operatorname{TopK}_{(x,y)\in S_c}\cos(\phi_I(x_c),\mu_c)
$$

这样可以减少罕见视角、遮挡、错标和背景污染对后续 prompt 评分的影响。

Stage III 的关键是不用静态文本相似度评分候选 prompt，而是在代表性支持集上实际跑 SAM3 分割，用 Dice 衡量候选概念是否“能切对”：

$$
s_{c,m}=\frac{1}{|R_c|}\sum_{(x,y)\in R_c}\operatorname{Dice}(f_\Phi(x,\phi_T(t_{c,m})),y_c)
$$

得分最高的若干候选再经温度 softmax 融合为最终概念嵌入：

$$
e_c^*=\sum_{m\in J_c}\frac{\exp(s_{c,m}/\tau)}{\sum_{j\in J_c}\exp(s_{c,j}/\tau)}\operatorname{Norm}(\phi_T(t_{c,m}))
$$

推理时概念库 \(B=\{e_c^*\}\) 直接作为 SAM3 的概念锚点，文本编码器可以不再参与每次推理。与微调相比，这种方式计算轻、风险低，也更适合标签很少但类别定义明确的目标域。

> 💡 关键：ConceptBank 校准的是“类别该怎么说、怎么对齐”，不是 SAM3 的视觉分割能力本身。

#### 🧪 练习题

```yaml
question: "ConceptBank 为什么用支持集 Dice 而不是只用文本余弦相似度给候选概念打分？"
options:
  - "Dice 直接衡量候选 prompt 在目标域上的实际分割效果"
  - "文本余弦相似度不能计算"
  - "Dice 可以替代 SAM3 的图像编码器"
  - "这样可以完全不需要支持样本"
answer: 0
explain: "候选概念是否有效取决于它能否驱动 SAM3 切出正确 mask，支持集 Dice 比嵌入相似度更接近最终任务指标。"
```
