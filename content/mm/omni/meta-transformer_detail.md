### 元Transformer (Meta-Transformer)

```yaml
id: meta-transformer
name: Meta-Transformer
full_name: 元Transformer (Meta-Transformer)
year: '2023'
org: 上海AI Lab
paper_url: https://arxiv.org/abs/2307.10802
category: encoder_llm_decoder
parent: imagebind
motivation: 12种模态单一编码器处理
topic_id: omni
yaml_path: /mnt/dhwfile/raise/user/wanghaoyu/KnowledgePipeline/content/mm/omni.yaml
output_path: /mnt/dhwfile/raise/user/wanghaoyu/KnowledgePipeline/content/mm/omni/meta-transformer_detail.md
```

#### 📝 一句话总结

Meta-Transformer 提出“模态专属 tokenizer + 冻结共享 Transformer 编码器 + 任务头”的统一框架，让同一个编码器参数处理 12 种模态，解决多模态系统依赖大量模态专属 backbone 和成对预训练数据的问题。

#### 🎯 核心要点

- 覆盖 12 种模态：自然语言、图像、点云、音频、视频、红外、高光谱、X-Ray、IMU、表格、图、时间序列
- 核心结构包含三部分：data-to-sequence tokenizer、modality-shared encoder、task-specific head
- 不依赖成对多模态数据，每个模态可在自己的任务数据上训练轻量 tokenizer 和任务头
- 将不同原始输入统一变成 \(n\times D\) token 序列，再交给同一个 Transformer 编码器
- 共享编码器采用 ViT/CLIP 风格预训练权重，并在主要设置中冻结以验证跨模态共享参数空间
- tokenization 针对模态定制：文本 WordPiece、图像 patch、点云 FPS/KNN 分组、音频谱图 patch、视频 3D 卷积等
- 下游任务用任务专属 MLP、检测头、分割头或预测头适配，不要求共享输出空间
- 实验覆盖 GLUE、ImageNet、COCO、ADE20K、ModelNet40、Speech Commands、UCF101、Ego4D、PCQM4M-LSC 等

#### 🔬 深入细节

##### 框架总览

![Meta-Transformer 框架图](https://ar5iv.labs.arxiv.org/html/2307.10802/assets/x28.png)
*图：Meta-Transformer 将不同模态先转成序列 token，再由同一个冻结 Transformer 编码器抽取特征，最后接任务专属 head。*

![Meta-Transformer 数据到序列 tokenization](https://ar5iv.labs.arxiv.org/html/2307.10802/assets/x29.png)
*图：论文提出的 meta-tokenization 思路，用 grouping、convolution、transformation 把文本、图像、点云、音频等输入映射到共享 token 空间。*

Meta-Transformer 的核心判断是：Transformer 编码器本质上处理的是 token 序列，而不是天然绑定某一种输入格式。不同模态之间最大的差异不一定在编码器主体，而在“如何把原始数据变成合适的 token”。因此论文把统一性放在 backbone 参数上，把模态差异压到 tokenizer 和任务头里。

论文形式化地把多模态统一目标写成寻找一个共享有效参数 \(\theta^*\)，它位于多个模态可用参数空间的交集中：

$$
\theta^* \in \Theta_1\cap\Theta_2\cap\cdots\cap\Theta_n,\quad
\Theta_1\cap\Theta_2\cap\cdots\cap\Theta_n\neq\varnothing
$$

多模态预测则可抽象为：

$$
\hat{y}=\mathcal{F}(\boldsymbol{x};\theta^*),\quad
\theta^*=\arg\min_{\theta}\mathcal{L}(\hat{y},y)
$$

这里的 \(\boldsymbol{x}\) 可以来自任何模态。和 ImageBind 的“共享嵌入空间”不同，Meta-Transformer 更强调“共享编码器参数”：不同模态不一定要输出可直接互检索的向量，而是要证明同一个 Transformer backbone 能作为通用感知器。

```python
# Meta-Transformer 训练/适配流程伪代码
for task in multimodal_tasks:
    tokenizer = tokenizer_by_modality[task.modality]
    head = task_specific_head[task.name]

    for batch in task_loader(task):
        raw_x, y = batch
        tokens = tokenizer(raw_x)                  # raw data -> n x D sequence
        tokens = add_cls_and_position(tokens)

        with freeze(shared_transformer_encoder):
            z = shared_transformer_encoder(tokens)

        summary = layer_norm(z.cls_token)
        y_hat = head(summary)
        loss = task_loss(task, y_hat, y)

        update(tokenizer, head, loss)              # frozen setting

# 可选：在高性能设置中继续 fine-tune encoder
```

tokenizer 是 Meta-Transformer 的主要工程载体。图像输入 \(\boldsymbol{x}_I\in\mathbb{R}^{C\times H\times W}\) 会被切成 patch，并投影到 \(D\) 维 token：

$$
\boldsymbol{x}_I \rightarrow
\boldsymbol{x}_I'\in\mathbb{R}^{N_s\times(S^2C)}
\rightarrow
\boldsymbol{x}_I''\in\mathbb{R}^{N_s\times D}
$$

点云则先用 FPS 采样骨架点，再用 KNN 聚合局部几何结构，形成更短的结构 token 序列：

$$
\boldsymbol{x}_P\in\mathbb{R}^{P\times(3+c)}
\rightarrow
\boldsymbol{x}_P'\in\mathbb{R}^{\frac{P}{4}\times\frac{D}{2}}
\rightarrow
\boldsymbol{x}_P''\in\mathbb{R}^{\frac{P}{16}\times D}
$$

音频先变成 log Mel filterbank，再在时间和频率维度切重叠 patch：

$$
\boldsymbol{x}_A\in\mathbb{R}^{T\times F}
\rightarrow
\boldsymbol{x}_A'\in\mathbb{R}^{N_s\times S\times S}
\rightarrow
\boldsymbol{x}_A''\in\mathbb{R}^{(N_sD/S^2)\times D}
$$

共享编码器部分基本沿用标准 ViT。加入 CLS token 和 1D 位置嵌入后，序列经过 \(L\) 层 MSA 与 MLP：

$$
\boldsymbol{z}_0=[\boldsymbol{x}_{CLS};\boldsymbol{E}_{x_1};\cdots;\boldsymbol{E}_{x_n}]+\boldsymbol{E}_{pos}
$$

$$
\boldsymbol{z}'_\ell=\operatorname{MSA}(\operatorname{LN}(\boldsymbol{z}_{\ell-1}))+\boldsymbol{z}_{\ell-1},\quad
\boldsymbol{z}_\ell=\operatorname{MLP}(\operatorname{LN}(\boldsymbol{z}'_\ell))+\boldsymbol{z}'_\ell
$$

最终用 \(\operatorname{LN}(\boldsymbol{z}_L^0)\) 作为样本级表示，再交给任务头。任务头 \(h(\cdot)\) 可以是分类 MLP，也可以接入检测、分割、预测等任务结构：

$$
\hat{\boldsymbol{y}}=\mathcal{F}(\boldsymbol{x};\theta^*)=h\circ g\circ f(\boldsymbol{x})
$$

其中 \(f\) 是 tokenizer，\(g\) 是共享 Transformer 编码器，\(h\) 是任务头。这个拆分的好处是把“模态格式适配”和“任务输出适配”从共享 backbone 中剥离出来，避免为每个模态复制一套主干网络。

与 ImageBind 相比，Meta-Transformer 不以跨模态检索为主要目标，也不要求把文本、音频、图像全部拉到一个对比学习空间。它更像一个统一感知框架：只要能把输入变成 token 序列，同一个冻结编码器就可以抽取可迁移特征。代价是模态间语义对齐不如 ImageBind/LanguageBind 那样天然适合零样本跨模态匹配，但它更直接地回答了“单一编码器能否处理许多模态”这个架构问题。

#### 🧪 练习题

```yaml
question: "Meta-Transformer 实现 12 种模态单一编码器处理的关键是什么？"
options:
  - "把所有模态都转写成自然语言文本"
  - "为每个模态训练完全独立的 Transformer backbone"
  - "先用模态专属 tokenizer 映射到共享 token 序列，再使用同一个 Transformer 编码器"
  - "只训练图像和文本两个模态，其他模态在推理时忽略"
answer: 2
explain: "Meta-Transformer 的统一性来自 data-to-sequence tokenization 与冻结共享编码器；模态差异主要由 tokenizer 和任务头吸收。"
```
