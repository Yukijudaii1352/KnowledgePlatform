### BLIP — 自举语言图像预训练 (BLIP)

```yaml
id: blip
name: BLIP
full_name: 自举语言图像预训练 (BLIP)
year: '2022'
org: Salesforce
paper_url: https://proceedings.mlr.press/v162/li22n.html
category: fusion_model
parent: clip
motivation: CapFilt机制提升数据质量
```

#### 📝 一句话总结

BLIP 提出统一理解与生成的视觉语言预训练框架，并用 CapFilt 让 captioner 生成更干净的合成描述、filter 移除噪声图文对，解决网页图文数据质量低和模型只擅长理解或生成单一任务的问题。它把数据自举与多目标预训练结合起来。

#### 🎯 核心要点

- 提出 Multimodal Mixture of Encoder-Decoder (MED)，同一套参数支持图文理解和文本生成
- 三种功能模式：unimodal encoder、image-grounded text encoder、image-grounded text decoder
- 预训练目标包括 Image-Text Contrastive、Image-Text Matching、Language Modeling
- CapFilt 包含 Captioner 与 Filter：前者为网页图像生成合成 caption，后者剔除原始和合成文本中的噪声
- Captioner 与 Filter 从同一个预训练 MED 初始化，再在小规模人工标注数据上分别微调
- 可扩展到 129M 图像级别数据，在图文检索、图像描述、VQA 及零样本视频语言任务上表现强

#### 🔬 深入细节

![BLIP 学习框架](https://ar5iv.labs.arxiv.org/html/2201.12086/assets/x3.png)
*图：论文 Figure 3。BLIP 用 Captioner 生成合成 caption，用 Filter 去除噪声 image-text pairs，再将过滤后的数据与人工标注数据合并继续预训练。*

![BLIP MED 架构与目标](https://ar5iv.labs.arxiv.org/html/2201.12086/assets/x2.png)
*图：论文 Figure 2。MED 通过共享模块实现图文对比、图文匹配和条件语言建模三类目标。*

```python
# BLIP / CapFilt 训练伪代码
med = pretrain_MED(clean_pairs, losses=["ITC", "ITM", "LM"])

captioner = finetune_as_decoder(med, human_annotated_pairs)
filter_model = finetune_as_matching_model(med, human_annotated_pairs)

bootstrapped_pairs = []
for image, web_text in noisy_web_pairs:
    synthetic_text = captioner.generate(image)
    for text in [web_text, synthetic_text]:
        if filter_model.is_matched(image, text):
            bootstrapped_pairs.append((image, text))

med = pretrain_MED(clean_pairs + bootstrapped_pairs, losses=["ITC", "ITM", "LM"])
```

BLIP 面对两个问题。第一，很多 VLP 模型偏理解任务，例如检索、VQA、NLVR2；另一些模型偏生成任务，例如 image captioning，很难用同一架构自然覆盖两类任务。第二，网页图文对规模大但噪声重，简单扩大数据不一定提供高质量监督。

MED 是 BLIP 的模型答案。它由视觉 Transformer、文本 Transformer 和跨注意力模块组成，通过不同 attention mask 与模块激活方式实现三种模式：unimodal encoder 用于 ITC，对齐图像和文本全局向量；image-grounded text encoder 用于 ITM，判断图文是否匹配；image-grounded text decoder 用于 LM，根据图像生成文本。

三个预训练目标分别服务不同能力。ITC 学全局对齐：

$$
\mathcal{L}_{ITC}=\operatorname{CE}(s(I,T), y)
$$

ITM 在融合表示上做二分类，细查候选图文对是否匹配；LM 则最大化条件文本生成概率：

$$
\mathcal{L}_{LM}=-\sum_t \log p(w_t\mid w_{<t}, I)
$$

CapFilt 是 BLIP 的数据答案。Captioner 是 image-grounded text decoder，给网页图像生成一条新的 synthetic caption；Filter 是 image-grounded text encoder，用 ITC/ITM 判断原始网页文本 \(T_w\) 和合成文本 \(T_s\) 是否与图像匹配。不匹配的文本被丢弃，剩余样本与人工标注数据合并，形成更干净的自举训练集。

> 💡 关键：BLIP 不是只“清洗数据”，而是用当前视觉语言模型主动重写和筛选监督信号。Captioner 提供更语义化的描述，Filter 提供匹配判别，两者互补。

与 CLIP/ALIGN 的纯双塔不同，BLIP 同时保留全局对比学习和深度图文融合，因此既能做高效检索候选召回，也能通过 ITM 重排或通过 decoder 生成 caption。与 OSCAR 相比，它不依赖对象标签作为唯一锚点，而是通过生成式自举提升网页图文数据质量。

#### 🧪 练习题

```yaml
question: "BLIP 的 CapFilt 机制为什么能提升网页图文预训练质量？"
options:
  - "它只保留网页原始 alt-text，不生成新文本"
  - "Captioner 生成合成 caption，Filter 移除与图像不匹配的原始或合成文本"
  - "它用目标检测标签替代所有 caption"
  - "它取消了图文匹配损失，只训练语言模型"
answer: 1
explain: "CapFilt 用生成模型补充更干净的描述，再用匹配模型筛除噪声文本，使大规模网页数据的监督信号更可靠。"
```
