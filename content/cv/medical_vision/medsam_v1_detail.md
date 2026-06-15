### MedSAM-Video / MedSAM-2: Segment medical images as video via Segment Anything Model 2

```yaml
id: medsam_v1
name: MedSAM-Video
full_name: "MedSAM视频分割版本 (Medical SAM 2: Segment medical images as video via Segment Anything Model 2)"
year: "2024.08"
org: "哈佛/麻省总医院"
paper_url: "https://arxiv.org/abs/2408.00874"
category: "foundation_model"
parent: "medsam"
motivation: "将3D扫描视为视频序列实现体积自动分割"
```

#### 📝 一句话总结

MedSAM-2 将 3D 医学图像和 2D 医学图像流统一建模为“视频”，复用 SAM 2 的视频记忆机制完成跨切片/跨图像分割。它进一步提出 confidence memory bank 和 weighted pick-up，让一次提示能传播到后续切片或相似 2D 图像，解决医学分割中逐切片交互成本高的问题。

#### 🎯 核心要点

- **医学图像即视频**：把 CT/MRI 等 3D 扫描的连续切片视为时序帧，把 2D 图像集合视为可传播的 image flow。
- **基于 SAM 2**：继承 image encoder、prompt encoder、memory encoder、memory attention、mask decoder 的视频分割管线。
- **Confidence Memory Bank**：推理时优先保留高置信预测和用户提示帧，减少错误 mask 进入记忆库带来的漂移。
- **Weighted Pick-up**：根据当前图像与记忆图像的相似度加权读取 memory，而不是对所有 memory 等权融合。
- **One-Prompt Segmentation**：一次 prompt 不只服务一张图，还能迁移到同任务的其他 2D 医学图像。
- **多任务评估**：覆盖白细胞、视杯、视网膜血管、下颌骨、冠状动脉、肾肿瘤、肝肿瘤、腹部器官等 2D/3D 任务。

#### 🔬 深入细节

##### 4.1 核心示意图

![MedSAM-2 框架](https://arxiv.org/html/2408.00874v1/extracted/5769329/medsam2face.png)
*图：MedSAM-2 基于 SAM 2，把 3D 医学图像和 2D 图像流视为视频，通过 confidence memory bank 与 weighted pick-up 做记忆增强分割。*

##### 4.2 算法伪代码

```python
# MedSAM-2 推理伪代码
def medsam2_segment(frames, prompt_frame, prompt):
    memory_bank = []
    outputs = {}

    for t, image in enumerate(frames):
        image_emb = image_encoder(image)

        if t == prompt_frame:
            prompt_emb = prompt_encoder(prompt)
            mask, score, obj_ptr = mask_decoder(image_emb, prompt_emb)
        else:
            picked = weighted_pickup(image_emb, memory_bank)
            conditioned = memory_attention(image_emb, picked)
            mask, score, obj_ptr = mask_decoder(conditioned, prompt_emb=None)

        outputs[t] = mask
        if is_confident(score) and is_diverse(image_emb, memory_bank):
            memory_bank = update_confidence_bank(memory_bank, image_emb, mask, obj_ptr, score)

    return outputs
```

##### 4.3 方法解读

SAM 2 的核心能力是 promptable video object segmentation：用户在某一帧给出点、框或 mask，模型把对象通过 memory attention 传播到后续帧。MedSAM-2 的观察是，3D 医学体数据的相邻切片在解剖结构上连续，和视频帧的时间连续性高度相似。因此，3D 分割可以转化为“给某个切片一个 prompt，然后沿切片轴跟踪同一目标”。

基础数据流包括五步：首先每张切片进入 image encoder 得到 dense embedding；用户提示帧进入 prompt encoder；mask decoder 输出当前帧 mask 和对象指针；memory encoder 把预测 mask 与图像特征写入 memory；后续帧通过 memory attention 读取历史对象信息。其直觉公式可以写成：

$$
\tilde{\mathbf{z}}_t=\text{MemoryAttention}(\mathbf{z}_t,\mathcal{M}_{t-1})
$$

其中 \(\mathbf{z}_t\) 是当前切片特征，\(\mathcal{M}_{t-1}\) 是历史记忆，\(\tilde{\mathbf{z}}_t\) 是融合对象记忆后的特征。mask decoder 在 \(\tilde{\mathbf{z}}_t\) 上预测当前切片掩码。

MedSAM-2 对原始 SAM 2 的重要修改是 memory selection。SAM 2 更偏向按时间顺序维护 memory；医学体数据中，一旦某些切片预测错了，错误 mask 会继续污染后续传播。confidence memory bank 改成优先保留高置信、低噪声、且与已有记忆不重复的样本，降低误差累积。

Weighted pick-up 进一步解决“哪些 memory 对当前切片最有用”的问题。对当前图像 embedding 与 memory embedding 计算相似度，再对 memory value 加权融合：

$$
w_j=\frac{\exp(\text{sim}(\mathbf{z}_t,\mathbf{m}_j))}{\sum_k \exp(\text{sim}(\mathbf{z}_t,\mathbf{m}_k))}
,\qquad
\mathbf{m}^{*}_t=\sum_j w_j\mathbf{m}_j
$$

这个设计使非相邻但外观相似的切片也能被选中，尤其适合病灶形态在若干切片后重新出现、或 2D 图像之间没有严格时间顺序的场景。

> ⚠️ 注意：MedSAM-2 的“一次提示”能力依赖同一器官/病灶在序列或图像集合中的外观一致性。跨模态、极端形变或低对比度边界仍可能需要额外交互提示纠偏。

##### 4.4 与 MedSAM/SAM 的区别

MedSAM 主要是 2D 医学图像交互分割，通常每张图都要 prompt；SAM 2 支持视频，但不是为医学领域设计。MedSAM-2 的变化在于把医学体数据转成视频任务，并让记忆库更适合医学图像：置信优先减少错误传播，相似度加权减少无关帧干扰。相比逐切片运行 2D SAM，这种方式能利用切片间连续性，显著降低 3D 标注和分割交互成本。

#### 🧪 练习题

```yaml
question: "MedSAM-2 为什么要引入 confidence memory bank？"
options:
  - "为了把所有历史切片都永久保存下来"
  - "为了优先保留高置信且多样的记忆，减少错误 mask 传播"
  - "为了替代 image encoder，直接从文本生成 mask"
  - "为了只处理单张 2D 图像，不处理 3D 序列"
answer: 1
explain: "医学切片传播容易累积错误，confidence memory bank 通过置信度和多样性筛选记忆，降低噪声模板对后续切片的影响。"
```
