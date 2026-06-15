### LASA: Language-Agnostic Semantic Alignment

```yaml
id: lasa
name: LASA
full_name: 语言无关对齐 (Language-Agnostic Alignment)
year: '2026.03'
org: ACL
paper_url: https://aclanthology.org/2026.findings-acl.1/
category: alignment
parent: cai
motivation: 中间层锚定低资源语言对齐
```

#### 📝 一句话总结

LASA 提出在 LLM 的中间“语义瓶颈层”做安全对齐，通过 Safety Semantic Interpreter 抽取语言无关的安全语义信号，使高资源语言学到的安全行为迁移到 Swahili、Bengali、Thai 等低资源语言。

#### 🎯 核心要点

- 发现 Semantic Bottleneck：中间层表征主要按语义聚类，而不是按语言身份聚类
- 用层级 silhouette score 选择 \(S_l^{Sem}-S_l^{Lang}\) 最大的瓶颈层 \(L^s\)
- 训练轻量 Safety Semantic Interpreter，参数量小于基座模型的 0.2%
- SSI 将瓶颈层 hidden state 映射为 benign/malicious 安全语义信号
- 在后训练阶段把 SSI 输出 \(z_i\) 作为条件信号，驱动模型学习跨语言拒答/合规模式
- 在 LLaMA-3.1-8B-Instruct 上平均 ASR 从 24.7% 降至 2.8%
- 在 Qwen2.5/Qwen3 多个 7B-32B 模型上，多语种 ASR 保持约 3-4%

#### 🔬 深入细节

##### 示意图/图源

![LASA 方法框架图](https://arxiv.org/html/2604.12710v2/figures/method.png)
*图：LASA 从 Semantic Bottleneck 层抽取 hidden states，经 Safety Semantic Interpreter 得到安全语义信号，再条件化后续生成。*

##### 算法/流程伪代码

```python
# Language-Agnostic Semantic Alignment (LASA)
def train_lasa(model, train_data):
    # Stage 1: locate semantic bottleneck
    scores = []
    for layer in range(model.num_layers):
        h = collect_hidden_states(model, train_data.parallel_prompts, layer)
        s_sem = silhouette_by_semantic_label(h)
        s_lang = silhouette_by_language_label(h)
        scores.append(s_sem - s_lang)
    Ls = argmax(scores)

    # Stage 2: train Safety Semantic Interpreter
    freeze(model)
    ssi = MLP(input_dim=model.hidden_size, output_dim=1)
    for x, safety_label in train_data.safety_pairs:
        h = model.hidden_state(x, layer=Ls)
        z = ssi(h)
        loss = binary_cross_entropy(sigmoid(z), safety_label)
        ssi.update(loss)

    # Stage 3: semantic-conditioned alignment
    unfreeze(model)
    for x, y, preference_label in train_data.alignment_pairs:
        h = model.hidden_state(x, layer=Ls)
        z = ssi(h).detach()
        loss = kto_style_loss(model, x, y, condition=z, label=preference_label)
        model.update(loss)

    return model, ssi
```

##### 方法解读

LASA 的核心观察是：多语种 LLM 已经具备一定语言无关语义理解，但安全对齐往往仍停留在高资源语言的文本空间。例如英文、中文、韩文安全训练可以让这些语言上的 ASR 接近 0，却可能让 Swahili 等低资源语言仍保持很高攻击成功率。这不是模型完全“不懂”低资源语言，而是安全边界没有锚定到共享语义空间。

论文用两类聚类指标定位语义瓶颈层：\(S_l^{Sem}\) 衡量同义不同语言 prompt 是否聚在一起，\(S_l^{Lang}\) 衡量表征是否仍按语言身份分离。LASA 选择：

$$
L^s=\arg\max_l\left(S_l^{Sem}-S_l^{Lang}\right)
$$

作为 Semantic Bottleneck。直觉上，这一层“最像语义空间”：同一个有害意图的英文、中文、Swahili 表达会更接近，而不是被表层语言差异拉开。

Safety Semantic Interpreter 是一个轻量 MLP，输入瓶颈层 hidden state \(h\)，输出安全语义 logit \(z=f_\phi(h)\)。训练目标是二分类 BCE：

$$
\mathcal{L}_{SSI}(\phi)=\mathbb{E}_{(h,s)\sim\mathcal{D}}\left[\mathrm{BCE}(\sigma(z),s)\right]
$$

这里的 \(s\) 是 benign/malicious 标签。由于 SSI 只读中间语义层，它学到的是“这个请求的语义是否危险”，而不是“这句话属于哪种语言或哪种表面模板”。

第三阶段将 SSI 的安全语义信号并入后训练。论文采用 KTO-style 目标，把 \(z_i\) 作为条件信号放入生成概率：

$$
\mathcal{L}(\Theta)=\mathbb{E}\left[\omega(w_i)\cdot\sigma\left(\lambda\left(\log\frac{P_\Theta(y_i\mid x_i,z_i)}{P_{ref}(y_i\mid x_i,z_i)}-z_{KL}\right)\right)\right]
$$

这一步的意义是把“中间层检测到的危险语义”绑定到后续语言生成行为：模型不只是知道某个 Swahili prompt 和英文有害 prompt 同义，还要把这种语义信号转化为对应语言里的拒答或安全替代响应。

与翻译式防御不同，LASA 不依赖把低资源语言翻成英文再审核；与逐语言安全微调不同，它也不要求为每种语言收集大量安全数据。它的限制也很清楚：如果某种表达需要多步推理才能还原有害语义，例如低相似度 emoji 表达，单层语义瓶颈可能无法稳定捕获完整意图。

#### 🧪 练习题

```yaml
question: "LASA 为什么要在 Semantic Bottleneck 层进行安全对齐？"
options:
  - "该层参数最少，训练速度最快"
  - "该层表征更按共享语义组织，较少受语言身份支配"
  - "该层只能处理英文 prompt"
  - "该层可以替代 tokenizer"
answer: 1
explain: "LASA 选择语义聚类强、语言聚类弱的中间层，使高资源语言中的安全语义能迁移到低资源语言，而不是绑定在表层文本分布上。"
```
