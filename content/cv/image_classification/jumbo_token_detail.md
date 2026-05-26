### Jumbo Token

```yaml
id: jumbo_token
name: Jumbo Token
full_name: "巨型Token高效ViT (Jumbo Token for Fast Plain Vision Transformers)"
year: "2026.01"
org: "Carleton University / UBC / Vector Institute"
paper_url: "https://arxiv.org/abs/2502.15021"
category: modern_efficient
parent: vit
motivation: "引入巨型Token加速平原ViT，大幅提升吞吐量"
```

#### 📝 一句话总结
Jumbo Token 通过给 plain ViT 引入一个更宽的全局 token，并让它拥有独立且跨层共享的 FFN，在几乎不破坏 ViT 接口的前提下显著提升了速度-精度权衡。

#### 🎯 核心要点
- 保持 plain ViT 的 attention-only、non-hierarchical 结构，不引入卷积或层级金字塔。
- 用一个宽度为 patch token \(J\) 倍的 Jumbo token 替代普通 CLS token。
- 自注意力前把 Jumbo token 拆成多个标准宽度 token，注意力后再拼回去。
- 为 Jumbo token 配置独立 FFN，并在所有层之间共享该 FFN 参数以节省内存。
- 在 ImageNet-1K、ImageNet-21K、ADE20K 和 MAE 预训练上都优于 ViT+Registers 基线。

#### 🔬 深入细节

![Jumbo Token 仓库示意图](https://raw.githubusercontent.com/antofuller/jumbo/main/sophia.png)
*图：Jumbo Token 官方仓库配图。该工作关注在不破坏 plain ViT 结构接口的前提下，用更宽的全局 token 提高容量与吞吐表现。*

```python
# Jumbo Token 核心流程
patch_tokens = patch_embed(image)                 # [N, D]
jumbo = jumbo_token.expand(1, J * D)             # [1, J*D]

for layer in layers:
    jumbo_split = jumbo.view(J, D)               # attention 前拆成 J 个标准 token
    tokens = concat([jumbo_split, patch_tokens], dim=0)
    tokens = self_attention(tokens)
    jumbo_split, patch_tokens = tokens[:J], tokens[J:]
    jumbo = jumbo_split.reshape(1, J * D)        # attention 后重新拼接
    jumbo = jumbo + jumbo_ffn_shared(jumbo)      # Jumbo 独立 FFN
    patch_tokens = patch_tokens + patch_ffn(patch_tokens)

logits = classifier(jumbo)
```

Jumbo 的出发点是一个很实用的观察：plain ViT 的主要代价来自所有 patch token 的宽度和数量，但全局分类 token 只占极少一部分计算。如果直接把所有 token 一起加宽，模型会更贵；如果只把全局 token 做宽，则有机会以很低代价提升全局汇聚能力。

论文因此把传统 CLS token 改造成一个更宽的 Jumbo token。设 patch token 宽度为 \(D\)，则 Jumbo token 宽度为 \(J \cdot D\)。为了兼容标准多头注意力，进入注意力层之前先把它拆成 \(J\) 个宽度为 \(D\) 的 token，与 patch token 一起做普通 self-attention；注意力完成后再把这 \(J\) 个 token 按通道维重新拼回一个大 token。这样整个模型仍然保持 plain ViT 的接口和行为习惯。

真正的容量提升来自 Jumbo token 的专属 FFN。普通 patch token 继续走共享的 patch FFN，而 Jumbo token 走一个更宽的独立 FFN。由于这个 FFN 只处理一个 token，计算成本相对很低；论文进一步把它在层间共享，以控制参数量和显存开销。核心思想可以理解为：把额外模型容量集中投入到“全局汇聚通道”，而不是平均分摊给所有 patch。

这种设计为什么有效？作者认为，很多视觉分类任务瓶颈不在局部 patch 表达，而在全局信息如何被高效汇聚到分类头。Jumbo 让模型在几乎不改变基础架构的前提下，拥有一个更强的“全局思考槽位”。因此它尤其适合本来就偏窄、偏快的 plain ViT 变体，在小模型上收益更明显。

#### 🧪 练习题
```yaml
question: "Jumbo Token 为什么能在保持 plain ViT 结构的同时提升效率？"
options:
  - "因为它把所有 patch token 都改成了更宽的 token"
  - "因为它只扩大全局 token 的容量，并在注意力前后做拆分/拼接，额外成本主要集中在单个全局 token 上"
  - "因为它完全移除了 FFN"
  - "因为它把自注意力改成卷积"
answer: 1
explain: "Jumbo 只放大全局 token，而不是所有 patch token；这样既保留了 plain ViT 接口，又把额外容量集中在代价最低的全局路径上。"
```
