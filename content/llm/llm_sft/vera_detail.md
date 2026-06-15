### VeRA
```yaml
id: vera
name: VeRA
full_name: 向量随机矩阵适配 (VeRA)
year: '2024.05'
org: University of Amsterdam
paper_url: https://arxiv.org/abs/2310.11454
category: peft
parent: lora
motivation: 冻结共享矩阵减少10倍参数量
```

#### 📝 一句话总结
VeRA 提出用全层共享的冻结随机低秩矩阵替代 LoRA 中逐层训练的 \(A,B\) 矩阵，只训练极小的缩放向量 \(b,d\)，解决多任务/多用户 LoRA 适配器存储成本过高的问题。

#### 🎯 核心要点
- 冻结一对随机矩阵 \(A,B\)，并在所有被适配层之间共享，避免为每层保存完整 LoRA 矩阵。
- 每层只训练两个缩放向量 \(b,d\)，等价于学习 \(\Lambda_b B \Lambda_d A\) 的行/列门控。
- 与 LoRA 一样可在部署前把低秩增量合并回原始权重，不引入额外推理延迟。
- 参数量从 LoRA 的 \(2L_{\text{tuned}}d_{\text{model}}r\) 降到 VeRA 的 \(L_{\text{tuned}}(d_{\text{model}}+r)\) 量级。
- 初始化上 \(b\) 置零以保持首个 forward 与基座模型一致，\(d\) 用非零常数，冻结矩阵用 Kaiming/高斯随机初始化。

#### 🔬 深入细节
![VeRA 与 LoRA 结构对比](https://dkopi.github.io/vera/diagram.png)
*图源：VeRA 官方项目页。左侧 LoRA 训练每层低秩矩阵，右侧 VeRA 冻结并共享随机矩阵，只训练缩放向量。*

```python
# VeRA 核心训练伪代码
init shared_A ~ random(shape=(r, in_dim), frozen=True)
init shared_B ~ random(shape=(out_dim, r), frozen=True)

for adapted_layer in transformer_layers:
    b[layer] = zeros(out_dim)      # trainable output scaling
    d[layer] = ones(r)             # trainable rank-channel scaling

for batch in data:
    loss = 0
    for layer in adapted_layers:
        x = layer.input
        delta = diag(b[layer]) @ shared_B @ diag(d[layer]) @ shared_A @ x
        h = W0[layer] @ x + delta
    loss = task_loss(model(batch))
    update_only(b, d)

# 部署时可合并
DeltaW[layer] = diag(b[layer]) @ shared_B @ diag(d[layer]) @ shared_A
W_deploy[layer] = W0[layer] + DeltaW[layer]
```

LoRA 的标准形式是在冻结权重 \(W_0\) 旁边训练两个低秩矩阵：

$$
h = W_0x + \Delta Wx = W_0x + BAx
$$

VeRA 把这个增量重新参数化为：

$$
h = W_0x + \Lambda_b B \Lambda_d A x
$$

其中 \(A,B\) 是冻结随机矩阵，\(\Lambda_b,\Lambda_d\) 由可训练向量 \(b,d\) 组成。直觉上，随机矩阵提供一个固定的低维投影与回投影空间，而 \(d\) 选择哪些 rank 通道被激活，\(b\) 决定输出维度的调节强度；模型不再学习“新的子空间”，而是在一个共享随机子空间里学习每层的缩放组合。

VeRA 的动机来自 LoRA 在大模型个性化场景中的存储压力。单个 LoRA 适配器已经很小，但如果一个 7B/13B 模型要为大量用户、任务或版本保存许多 adapter，逐层 \(A,B\) 矩阵仍会造成显著存储开销。VeRA 让随机矩阵可以由随机种子重建，真正需要保存的是每层的向量 \(b,d\) 和少量元信息，因此尤其适合“一个基座模型 + 很多轻量适配器”的分发场景。

关键设计是“共享但可分层调节”。如果所有层完全共享同一个增量，表达力会太弱；VeRA 通过每层独立的 \(b,d\) 保留层级差异。\(d\) 作用在 rank 维度上，类似选择随机特征通道；\(b\) 作用在输出维度上，类似控制每个输出神经元接收多少低秩更新。这样参数量随层数和 hidden size 线性增长，但不再随 \(d_{\text{model}}r\) 成倍增长。

初始化也服务于稳定性：\(b=0\) 使 \(\Delta W=0\)，训练开始时模型行为完全等同于预训练模型；\(d\) 取非零常数，保证一旦 \(b\) 开始更新，随机低秩通道能够立即参与。论文在 GLUE、E2E、指令微调和视觉分类上展示，VeRA 通常能以 LoRA 少一个数量级左右的可训练参数接近 LoRA 表现。

> 💡 关键：VeRA 不是把 LoRA 的 rank 变小，而是把“可训练矩阵”换成“共享随机矩阵 + 可训练缩放向量”，因此存储优势主要来自跨层共享和矩阵可重生成。

#### 🧪 练习题
```yaml
question: "VeRA 相比 LoRA 最核心的参数节省来自哪里？"
options:
  - "把所有 Transformer 层都解冻后再做剪枝"
  - "冻结并共享随机低秩矩阵，只训练每层缩放向量"
  - "把 LoRA rank 固定为 1"
  - "在推理时删除 attention 层"
answer: 1
explain: "VeRA 的 A/B 矩阵是冻结且跨层共享的，实际需要保存和训练的是每层的 b/d 缩放向量。"
```
