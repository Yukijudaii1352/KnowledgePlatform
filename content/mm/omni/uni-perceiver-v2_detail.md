### 通用感知器第二代 (Uni-Perceiver v2)

```yaml
id: uni-perceiver-v2
name: Uni-Perceiver v2
full_name: "通用感知器第二代 (Uni-Perceiver v2)"
year: '2023'
org: 商汤/清华
paper_url: https://openaccess.thecvf.com/content/CVPR2023/html/Li_Uni-Perceiver_v2_A_Generalist_Model_for_Large-Scale_Vision_and_Vision-Language_CVPR_2023_paper.html
category: unified_seq2seq
parent: ofa
motivation: 通用视觉-语言统一建模
topic_id: omni
yaml_path: /mnt/dhwfile/raise/user/wanghaoyu/KnowledgePipeline/content/mm/omni.yaml
output_path: /mnt/dhwfile/raise/user/wanghaoyu/KnowledgePipeline/content/mm/omni/uni-perceiver-v2_detail.md
```

#### 📝 一句话总结

Uni-Perceiver v2 提出用“通用区域提议 + 共享任务解码器”统一建模大规模视觉与视觉-语言任务，解决早期通用模型难以覆盖检测、分割、检索等核心任务且性能弱的问题。

#### 🎯 核心要点

- 将图像编码为全局表示与区域提议表示的拼接，区域提议同时包含语义、边框和掩码信息
- 使用预训练 RoBERTa BASE 编码文本，使用 ResNet/Swin + MaskDINO 风格区域提议网络编码图像
- 用共享的 modality-agnostic Transformer decoder 处理不同任务，避免任务特定 decoder 和任务特定微调
- 将分类、检测、实例分割、图文检索、图像描述、语言建模等任务统一为最大似然估计
- 定位任务直接复用区域提议的 box/mask 作为空间输出，非定位任务使用统一 decoder 后的跨模态匹配或生成结果
- 在 unified decoder 的 FFN 中采用 attribute-level Conditional MoE 缓解多任务干扰
- 提出非混合采样策略与 MT-AdamW，通过任务梯度归一化和采样比例补偿稳定多任务训练
- 训练数据覆盖 ImageNet-1k、COCO、BookCorpus/Wikipedia、SBU、Visual Genome、COCO Caption、CC3M、CC12M、YFCC 等公开数据

#### 🔬 深入细节

##### 框架总览

![Uni-Perceiver v2 通用任务建模对比](https://ar5iv.labs.arxiv.org/html/2211.09808/assets/x1.png)
*图：传统 foundation model 需要按任务接入不同 decoder，而 Uni-Perceiver v2 用共享的通用 decoder 覆盖主要视觉与视觉-语言任务。*

![Uni-Perceiver v2 架构概览](https://ar5iv.labs.arxiv.org/html/2211.09808/assets/x3.png)
*图：Uni-Perceiver v2 由图像编码器、文本编码器和统一 decoder 三部分构成，图像分支显式产生通用区域提议。*

Uni-Perceiver v2 的关键判断是：如果仍把图像切成固定 patch，再让 seq2seq 模型“猜”空间结构，那么检测和实例分割这类定位任务会非常吃力。它改用区域提议作为图像 token，每个区域 token 不只是语义向量，还绑定了边框和掩码线索，因此同一套表示既能支持分类/检索/描述，也能自然落到检测/分割输出。

图像编码器先从 backbone 得到多尺度特征，再用 Transformer-based region proposal network 生成候选区域。图像最终表示是全局 token 与区域 token 的拼接：

$$
f_{\text{image}}(x)=\operatorname{Concat}\left(\{q_i^{\text{global}}\}_{i=1}^{M},\{q_j^{\text{proposal}}\}_{j=1}^{N}\right)
$$

其中区域 token 由三类信息相加得到：

$$
q_j^{\text{proposal}}=q_j^{\text{sem}}+\mathcal{B}(q_j^{\text{box}})+\mathcal{M}(q_j^{\text{mask}})
$$

\(q_j^{\text{sem}}\) 表示区域语义，\(\mathcal{B}(\cdot)\) 把 box 坐标编码到同一隐空间，\(\mathcal{M}(\cdot)\) 将 mask 自适应池化到固定大小后线性投影。论文实现中会按 objectness 选 top proposal，默认进入统一 decoder 的区域数为 \(O=200\)。

文本分支相对直接：BPE tokenizer 后接预训练 RoBERTa BASE，得到 \(f_{\text{text}}(x)\)。无论输入是图像、文本还是图文拼接，都会加上 `<SPE>` token 后送入共享 Transformer decoder \(g(\cdot)\)。任务的候选目标也以同样方式编码，模型通过输入和目标的 decoder 表示相似度估计似然：

$$
P(x,y)\propto \exp\left(\frac{\cos(g\circ f(x),g\circ f(y))}{\tau}\right)
$$

统一任务目标写成：

$$
\hat{y}=\arg\max_{y\in\mathcal{Y}}P(x,y)
$$

多任务训练损失为：

$$
L=\sum_{k=1}^{K}s_k\,\mathbb{E}_{(x,y)\in(\mathcal{X}_k,\mathcal{Y}_k)}
\left[-w_k\log\frac{P(x,y)}{\sum_{z\in\mathcal{Y}_k}P(x,z)}\right]
$$

这套公式的直觉是把所有任务都变成“在候选集合中挑出最匹配目标”。分类时目标是类别文本，图文检索时目标是图像或文本候选，检测/分割时则对每个区域提议用 decoder 输出与类别 embedding 做匹配，并直接复用对应 \(q_j^{\text{box}}\)、\(q_j^{\text{mask}}\) 作为定位预测。

```python
# Uni-Perceiver v2 训练流程伪代码
for step in range(num_steps):
    task_k = sample_one_task(sampling_ratio=s)  # unmixed sampling
    batch = load_batch(task_k)

    if batch.has_image:
        multi_scale = image_backbone(batch.image)
        proposals = region_proposal_net(multi_scale)
        image_tokens = concat(global_tokens(multi_scale), topk(proposals, k=200))
    else:
        image_tokens = None

    if batch.has_text:
        text_tokens = roberta_encoder(bpe(batch.text))
    else:
        text_tokens = None

    x_tokens = add_spe(concat_available(image_tokens, text_tokens))
    y_tokens = encode_candidates(batch.targets)

    x_repr = unified_decoder(x_tokens, conditional_moe=True)
    y_repr = unified_decoder(y_tokens, conditional_moe=True)
    logits = cosine(x_repr, y_repr) / temperature
    loss = task_weight[task_k] * cross_entropy(logits, batch.correct_target)

    grad = normalize(gradient(loss)) * omega[task_k]
    mt_adamw_update(grad, sampling_compensation=1 / s[task_k])
```

多任务训练的另一个问题是 batch 结构。混合采样会在同一个 iteration 中塞入多个任务，导致每个任务实际 batch 变小；这对图文检索这种依赖大量负样本的任务很不利。Uni-Perceiver v2 改成 unmixed sampling：一个 iteration 只采一个任务，所有 GPU 都服务于该任务，并可同步 gather retrieval 特征来放大负样本池。

但 unmixed sampling 会让相邻 iteration 的梯度分布剧烈变化，所以论文把 AdamW 改成 MT-AdamW。若第 \(t\) 步采到任务 \(k\)，先将该任务梯度归一化，再乘以任务权重 \(\omega_k\)，并用 \(1/s_k\) 修正一阶和二阶动量估计：

$$
g_t\leftarrow \omega_k\frac{\nabla L_{t,k}(\theta_{t-1})}{\|\nabla L_{t,k}(\theta_{t-1})\|}
$$

$$
m_t=(1-\beta_1)m_{t-1}+\frac{\beta_1}{s_k}g_t,\quad
n_t=(1-\beta_2)n_{t-1}+\frac{\beta_2}{s_k}g_t^2
$$

这个设计把“任务被采到的频率”和“任务应贡献的梯度强度”解耦：小采样率任务不会因为出现少而被 Adam 动量低估，大梯度任务也不会因为尺度过大破坏共享 decoder 的训练稳定性。

与 OFA/Unified-IO 这类更偏生成式 seq2seq 的方法相比，Uni-Perceiver v2 的优势在于显式保留定位结构。它不是把所有空间输出都强行离散成文本 token，而是在通用区域提议中保留 box/mask，再用统一似然框架做类别和目标选择。因此它能在没有任务特定适配的情况下同时覆盖 ImageNet 分类、COCO 检测与分割、COCO/Flickr 图文检索、COCO caption 等“支柱任务”。

#### 🧪 练习题

```yaml
question: "Uni-Perceiver v2 为什么要把图像编码为通用区域提议，而不是只使用固定 patch token？"
options:
  - "为了完全取消图像 backbone，减少所有视觉计算"
  - "为了把语义、边框和掩码线索绑定到区域 token，使检测/分割等定位任务能被统一 decoder 处理"
  - "为了只支持图像分类，避免处理图文任务"
  - "为了把文本 token 转换成图像 token"
answer: 1
explain: "通用区域提议提供显式空间线索，区域 token 同时包含 semantic、box 和 mask 表示，因此定位任务可直接复用这些输出，非定位任务也能获得更细粒度的区域信息。"
```
