### Longformer

```yaml
id: longformer
name: Longformer
full_name: 长文档Transformer (Longformer)
year: 2020
org: Allen AI
paper_url: https://arxiv.org/abs/2004.05150
category: sparsity_deploy
parent: —
motivation: 局部窗口+全局注意力实现线性复杂度
```

#### 📝 一句话总结

Longformer 将标准 Transformer 的全连接自注意力替换为滑动窗口局部注意力、可选空洞窗口和任务驱动全局注意力的组合，使 BERT/RoBERTa 类模型能以近似线性复杂度处理数千 token 的长文档。

#### 🎯 核心要点

- 使用 sliding window attention，每个 token 只关注固定窗口内邻居，把注意力复杂度从 \(O(n^2)\) 降到 \(O(nw)\)
- 支持 dilated sliding window，通过空洞间隔扩大感受野，不显著增加每层连接数
- 引入 task motivated global attention，使 `[CLS]`、问题 token 等少量关键 token 与全序列双向交互
- 局部注意力和全局注意力使用两套线性投影 \(Q_s,K_s,V_s\) 与 \(Q_g,K_g,V_g\)，提升不同注意力类型的建模灵活性
- 注意力模式可作为标准 self-attention 的 drop-in replacement，用 RoBERTa checkpoint 继续 MLM 预训练
- 提供 loop、chunk、自定义 CUDA/TVM kernel 等实现路径，在长序列下显存随长度近似线性增长
- 论文同时提出 Longformer-Encoder-Decoder (LED)，用于 arXiv summarization 等长文档生成任务

#### 🔬 深入细节

![Longformer 全局加滑动窗口注意力](https://ar5iv.labs.arxiv.org/html/2004.05150/assets/x5.png)
*图：来自论文 Figure 2(d) 的 global + sliding window attention。少量全局 token 连接整段序列，其余 token 主要保留局部窗口连接。*

```python
# Longformer 单层注意力模式伪代码
def longformer_attention(tokens, window, global_indices):
    outputs = []
    for i, token in enumerate(tokens):
        attend = set(range(max(0, i - window // 2),
                           min(len(tokens), i + window // 2 + 1)))

        # 全局 token 读取全序列；普通 token 也读取所有全局 token
        if i in global_indices:
            attend = set(range(len(tokens)))
            q, k, v = project_global_query(token), project_global_keys(tokens), project_global_values(tokens)
        else:
            attend.update(global_indices)
            q, k, v = project_local_query(token), project_mixed_keys(tokens, attend), project_mixed_values(tokens, attend)

        outputs.append(scaled_dot_product_attention(q, k[attend], v[attend]))
    return outputs
```

标准 Transformer 的自注意力会计算完整的 \(QK^\top\) 矩阵：

$$
\mathrm{Attention}(Q,K,V)=\mathrm{softmax}\left(\frac{QK^\top}{\sqrt{d_k}}\right)V
$$

当序列长度为 \(n\) 时，矩阵大小为 \(n\times n\)，时间和显存复杂度都是 \(O(n^2)\)。这正是 BERT/RoBERTa 常见 512 token 限制背后的核心瓶颈。Longformer 的基本判断是：长文档中绝大多数局部语义依赖可以通过邻近窗口捕获，而少数任务关键位置需要全局视野；没有必要让每个 token 都直接连接所有 token。

滑动窗口注意力把第 \(i\) 个 token 的可见集合定义为：

$$
\mathcal{A}_{\mathrm{local}}(i)=\{j:\ |i-j|\le w/2\}
$$

固定窗口大小 \(w\) 后，每个 token 只和 \(w\) 个左右邻居交互，总连接数变为 \(O(nw)\)。在 \(w\) 不随 \(n\) 增长时，这就是线性扩展。多层堆叠会扩大有效感受野：若每层窗口近似为 \(w\)，堆叠 \(\ell\) 层后，顶层表示可整合约 \(\ell\times w\) 范围内的信息。这一点类似 CNN 的局部卷积堆叠，只是每个窗口内部仍然通过注意力动态加权。

Dilated sliding window 用空洞间隔 \(d\) 进一步扩大感受野：

$$
\mathcal{A}_{\mathrm{dilated}}(i)=\{i+k\cdot d:\ k\in[-w/2,w/2]\}
$$

这样每个 token 仍然只看 \(w\) 个位置，但覆盖跨度变为约 \(d\cdot w\)。论文在字符级语言建模中让低层更多关注无空洞的局部上下文，高层使用部分带 dilation 的 head 捕获远距离关系。这种层级配置避免低层过早稀释局部语法信号，同时让高层拥有长程建模能力。

全局注意力是 Longformer 用于下游任务的关键补丁。对于分类，`[CLS]` 需要聚合整篇文档；对于问答，question tokens 需要和文档 token 直接比较。Longformer 因此为少量预选 token 设置 symmetric global attention：全局 token attends to all tokens，所有普通 token 也 attends to global tokens。若全局 token 数为 \(g\)，总复杂度可写作：

$$
O(nw+ng+g n)
$$

当 \(g\ll n\) 且由任务固定时，复杂度仍近似 \(O(n)\)。注意这里的全局 token 不是恢复 full attention，而是提供低成本的信息汇聚和广播通道。论文还为局部与全局注意力使用不同投影：\(Q_s,K_s,V_s\) 计算 sliding attention，\(Q_g,K_g,V_g\) 计算 global attention，并用局部投影初始化全局投影，使模型可在继续预训练时稳定迁移。

> 💡 关键：Longformer 的稀疏化不是随机丢边，而是把“局部上下文建模”和“任务级全局汇聚”拆成两种明确角色。

训练流程上，Longformer 先从 RoBERTa checkpoint 出发，把 self-attention 替换为长序列稀疏注意力，再继续进行 MLM 预训练，最大输入扩展到 4096 token。对于 character-level LM，论文采用分阶段训练：从较短序列和较小窗口开始，逐阶段加倍序列长度和窗口大小，并降低学习率。这能先学稳局部上下文，再逐步让模型利用更长范围。实现上，Longformer-loop 易理解但慢，Longformer-chunk 适合无 dilation 的预训练/微调，自定义 CUDA kernel 支持更完整的 dilated pattern。

与传统截断或 chunking 方法相比，Longformer 的优势是单次前向能保留完整文档上下文，避免跨 chunk 信息丢失和额外聚合模型。与后来的 BigBird 相比，Longformer 更偏工程和任务归纳偏置：它没有依靠随机边提供理论连通性证明，而是用清晰的 local + global 结构服务长文档分类、问答、共指和摘要。

#### 🧪 练习题

```yaml
question: "Longformer 为什么需要在滑动窗口之外加入 global attention？"
options:
  - "因为分类或问答等任务需要少量关键 token 直接聚合或访问全序列信息"
  - "因为滑动窗口会删除所有位置信息"
  - "因为 global attention 能把模型参数量降为零"
  - "因为所有 token 都必须恢复完整二次复杂度注意力"
answer: 0
explain: "纯局部窗口的信息传播依赖层数；global token 作为任务驱动的信息枢纽，让 `[CLS]` 或问题 token 直接连接整段文档，同时保持整体近似线性复杂度。"
```
