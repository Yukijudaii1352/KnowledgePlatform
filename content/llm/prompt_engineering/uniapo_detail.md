### UniAPO：统一多模态提示优化 (UniAPO)
```yaml
id: uniapo
name: UniAPO
full_name: 统一多模态提示优化 (UniAPO)
year: '2026.02'
org: AAAI
paper_url: https://ojs.aaai.org/index.php/AAAI/article/view/40151
category: frontier_2026
parent: opro
motivation: 首个多模态自动提示优化方法
```

#### 📝 一句话总结
UniAPO 将视觉语言模型的提示优化放到连续视觉提示空间中搜索，再用视觉提示语言模型把连续特征解码为离散文本 prompt，实现统一的多模态自动提示优化。

#### 🎯 核心要点
- 面向 CLIP 类视觉语言模型的自动 prompt 优化
- 用黑盒优化器在连续 latent prompt 空间中搜索
- 训练轻量 VPLM 将视觉 prompt 特征映射到可读文本 token
- 三阶段对齐：视觉语言对齐、文本 token 分布对齐、latent 空间对齐
- 可将 Square Attack、SimBA 等黑盒优化方法用于 prompt 搜索
- 兼顾连续优化效率和离散 prompt 的可解释性

#### 🔬 深入细节
[AAAI 论文公开页](https://ojs.aaai.org/index.php/AAAI/article/view/40151)；[AAAI PDF 图源](https://ojs.aaai.org/index.php/AAAI/article/view/40151/44112)。

```python
# UniAPO 多模态自动提示优化伪代码
def uniapo_optimize(vlm, vplm, train_images, labels, black_box_optimizer, steps=200):
    z = initialize_visual_prompt_latent()
    best_prompt, best_score = None, -float("inf")

    for _ in range(steps):
        z_candidate = black_box_optimizer.propose(z)
        text_prompt = vplm.decode(z_candidate)       # continuous feature -> discrete tokens
        score = evaluate_vlm(vlm, train_images, labels, text_prompt)

        black_box_optimizer.update(z_candidate, score)
        if score > best_score:
            best_score, best_prompt = score, text_prompt
            z = z_candidate

    return best_prompt
```

UniAPO 的难点在于多模态 prompt 既要可优化，又要可解释。纯离散文本搜索空间巨大，黑盒优化效率低；纯连续 prompt tuning 虽然可优化，但得到的是不可读 embedding。UniAPO 通过 VPLM 在两者之间建立桥梁：优化器在连续空间移动，最终由解码器输出文本 token。

VPLM 的训练分三步。第一步做监督式视觉语言对齐，使视觉 prompt 特征能落到 CLIP 文本嵌入附近。第二步对齐文本 token 分布，使解码结果更像自然语言 prompt，而不是任意向量。第三步做 latent-space alignment，让连续搜索过程中的特征仍能被稳定映射回有效文本。

搜索阶段把目标 VLM 当作黑盒。优化器提出新的 latent prompt，VPLM 将其解码成文本，VLM 在少量训练样本或验证样本上打分，再把分数反馈给优化器。这与 OPRO 的“历史分数驱动新候选”思想相通，但搜索变量从纯文本扩展到了多模态连续特征。

UniAPO 的价值在于统一性：它不需要为每个视觉任务手写 prompt，也不要求访问 VLM 内部梯度。它适合 API 场景和封闭模型，但也受到黑盒优化查询成本限制；如果验证集很小，搜索出的文本 prompt 仍可能过拟合少量类别或图像风格。

#### 🧪 练习题
```yaml
question: "UniAPO 中 VPLM 的核心作用是什么？"
options:
  - "把连续视觉 prompt 特征解码为离散文本 token"
  - "替代视觉语言模型完成分类"
  - "删除所有文本提示"
  - "只负责图像增强"
answer: 0
explain: "VPLM 连接连续优化空间和可读离散 prompt，使黑盒优化结果能转化为文本提示。"
```
