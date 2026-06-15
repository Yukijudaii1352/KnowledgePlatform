### ToxiGAN: Toxic Data Augmentation via LLM-Guided Directional Adversarial Generation

```yaml
id: toxigan
name: ToxiGAN
full_name: 毒性数据增强GAN (Toxic Data Augmentation GAN)
year: '2026'
org: EACL
paper_url: https://aclanthology.org/2026.findings-acl.1/
category: content_safety
parent: toxigen
motivation: LLM引导毒性数据增强
```

#### 📝 一句话总结

ToxiGAN 提出一种 LLM-guided 的类别感知毒性文本增强框架，用 LLM 生成的中性样本作为 semantic ballast，并通过两步交替方向训练同时控制毒性语义和域内真实性。

#### 🎯 核心要点

- 架构包含 \(K\) 个 toxic generators、一个 LLM neutral text provider 和一个 multi-head discriminator
- LLM 不直接生成毒性文本，而是生成流畅中性样本作为 semantic ballast，降低安全风险
- 动态筛选 neutral pool，按 discriminator 的 neutral confidence 保留高质量中性锚点
- Two-Step Alternating Directional Learning：奇数步远离中性语义，偶数步靠近真实毒性分布
- Discriminator 输出 \(K+2\) 类：各毒性类、fake 类和 LLM-neutral 类
- 在 WZ、DC、HX、OR 四个 hate speech benchmark 上提升 Macro-F1 和 Hate-F1
- 消融表明去掉 semantic ballast 会退化到 SentiGAN，去掉 toxicity step 会削弱 Hate-F1

#### 🔬 深入细节

##### 示意图/图源

![ToxiGAN 总体框架](https://arxiv.org/html/2601.03121v1/x1.png)
*图：ToxiGAN 包含多个类别条件 toxic generators、一个 LLM neutral text provider 和一个 multi-class discriminator。*

![ToxiGAN 两步方向学习](https://arxiv.org/html/2601.03121v1/x2.png)
*图：生成器在 embedding space 中交替朝“远离中性语义”和“靠近真实毒性分布”两个方向更新。*

##### 算法/流程伪代码

```python
# Training of ToxiGAN
def train_toxigan(real_data, llm, K, epochs):
    generators = [LSTMGenerator(class_id=i) for i in range(K)]
    discriminator = MultiHeadDiscriminator(num_heads=K + 2)

    # LLM 只生成中性样本，作为 semantic ballast
    neutral_pool = llm.generate_neutral_examples(seed_real_neutral(real_data))
    ballast = refine_neutral_pool(neutral_pool, discriminator, top_r=0.5)

    # MLE pretraining
    for i in range(K):
        generators[i].pretrain_mle(real_data.toxic_class(i))
    discriminator.pretrain(real_data, generated_samples(generators), ballast)

    for t in range(epochs):
        ballast = refine_neutral_pool(neutral_pool, discriminator)

        for i, G_i in enumerate(generators):
            samples = G_i.sample()
            if t % 2 == 1:
                # Toxicity step: move away from neutral anchors
                loss_g = max_cosine_similarity(emb(samples), emb(ballast))
            else:
                # Authenticity step: make discriminator view samples as real class i
                loss_g = mean(1 - discriminator.class_prob(samples, i))
            G_i.update(loss_g)

        # Discriminator sees real toxic, generated toxic, and LLM-neutral texts
        loss_d = discriminator_loss(real_data, generated_samples(generators), ballast)
        discriminator.update(loss_d)

    return generators, discriminator
```

##### 方法解读

ToxiGAN 处理的是毒性分类中的数据稀缺和类别偏斜问题。直接让现代 LLM 生成有害文本往往被安全对齐机制拦截，或生成过于中性、礼貌、稀释的样本；传统 GAN 又容易 mode collapse 或 semantic drift。ToxiGAN 的折中方案是让 LLM 只承担安全的中性样本生成角色，用这些中性文本作为语义锚点，毒性样本由封闭训练环境中的 GAN 生成。

问题形式化为：给定 \(\mathcal{D}_{real}=\{(x_i,y_i)\}\)，其中 \(y_i\in\{\text{neutral},\text{toxic}_1,\ldots,\text{toxic}_K\}\)，训练生成器 \(G\) 产生既符合目标 toxic class、又具备域内真实性的样本。整体架构中每个 toxic class 有一个生成器分支，discriminator 则同时判断样本属于哪个毒性类、是否 fake，以及是否 LLM-neutral。

Semantic ballast 是最关键的设计。ToxiGAN 从真实中性数据构造候选池 \(\mathcal{X}_{neutral}\)，用 LLM 生成更流畅的中性 exemplars，再用 discriminator 的 neutral head 打分：

$$
s(x)=D_0(x)
$$

每轮保留 top-\(r\%\) 的候选，逐步形成固定大小的 \(\mathcal{B}_{neutral}^{(t)}\)。这批中性锚点既帮助 discriminator 学清楚“中性边界”，也为 generator 提供“应该远离什么”的语义参照。

两步交替方向学习避免了把毒性和真实性硬塞进一个固定加权目标。奇数步执行 toxicity step，最小化生成样本与中性锚点的最大 cosine similarity：

$$
\mathcal{L}_{G_i}^{(t)}=\mathbb{E}\left[\max_{x\in\mathcal{B}_{neutral}}\cos(\Phi(G_i(z)),\Phi(x))\right],\quad t\bmod 2=1
$$

偶数步执行 authenticity step，让生成样本更像真实的第 \(i\) 类毒性文本：

$$
\mathcal{L}_{G_i}^{(t)}=\mathbb{E}[1-D_i(G_i(z))],\quad t\bmod 2=0
$$

如果把两者写成固定 \(\lambda\) 的 joint objective，训练早期和后期两个 loss 的尺度、梯度方差可能不匹配，导致生成器要么过度追求毒性而失真，要么过度靠近中性而失去类别信号。交替优化让“远离中性”和“保持真实”分开施压，减少目标冲突。

实验上，ToxiGAN 在 WZ、DC、HX、OR 四个数据集上对 BERT/RoBERTa 分类器均带来平均 Macro-F1 与 Hate-F1 提升；RoBERTa 平均 Macro-F1 从无增强的 55.2 提升到 57.3，Hate-F1 从 46.4 提升到 48.4。附录还显示，在 ModernBERT 和 DeBERTa-v3 上也有约 1.2-1.6 Macro-F1 的额外收益，说明它不是只补弱分类器。

#### 🧪 练习题

```yaml
question: "ToxiGAN 中 LLM-generated neutral texts 的主要作用是什么？"
options:
  - "直接生成毒性攻击文本"
  - "作为 semantic ballast，为生成器和判别器提供中性语义锚点"
  - "替代所有人工标签"
  - "把多分类任务变成回归任务"
answer: 1
explain: "ToxiGAN 避免让 LLM 直接生成毒性内容，而是用 LLM 生成流畅中性文本，作为远离中性语义和训练 discriminator 的锚点。"
```
