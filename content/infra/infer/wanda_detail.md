### Wanda: 权重与激活剪枝 (Wanda)

```yaml
id: wanda
name: Wanda
full_name: 权重与激活剪枝 (Wanda)
year: '2023'
org: CMU
paper_url: https://arxiv.org/abs/2306.11695
category: quantize
parent: —
motivation: 极简剪枝准则无需二阶信息计算
```

#### 📝 一句话总结

Wanda 提出极简的 LLM 剪枝准则，用权重幅值乘以输入激活范数衡量连接重要性，无需二阶矩阵、重建优化或微调即可获得强 post-training pruning 效果。

#### 🎯 核心要点

- 重要性分数为 \(|W_{ij}|\cdot ||X_j||_2\)
- 只需要少量校准数据统计输入激活范数
- 逐输出通道或逐行选择低分权重剪枝
- 无需 Hessian、梯度或权重更新补偿
- 在非结构化和半结构化稀疏设置下都具有竞争力

#### 🔬 深入细节

![Wanda 核心示意图](https://ar5iv.labs.arxiv.org/html/2306.11695/assets/x1.png)
*图：Wanda 论文中的权重-激活联合重要性剪枝示意。*

```python
# Wanda pruning
for layer in linear_layers:
    X = collect_inputs(layer)
    act_norm = l2_norm(X, dim='tokens')
    score = abs(layer.W) * act_norm[None, :]
    mask = keep_topk_per_row(score, keep_ratio)
    layer.W *= mask
```

##### 动机与背景

SparseGPT/GPTQ 类二阶方法效果好但实现和计算较复杂。是否存在足够简单、无需求逆和补偿的剪枝指标，是 Wanda 的问题出发点。

##### 核心机制

单个权重的重要性不仅取决于权重大小，也取决于对应输入通道在真实数据上是否经常被激活。Wanda 将二者相乘，近似衡量该连接对输出的贡献。

##### 训练/推理流程

用少量校准样本跑前向，记录每个线性层输入通道的 L2 范数；计算所有权重分数；按目标稀疏率在每行或每结构组内剪掉低分项；无需再训练即可部署稀疏权重。

##### 与传统方法的区别

Wanda 比 SparseGPT 简单得多，不做 Hessian 逆和误差补偿；比纯幅值剪枝更懂数据分布，因为加入了激活范数。它牺牲部分理论最优性换取极强可用性。

#### 🧪 练习题

```yaml
question: "Wanda 的剪枝分数由什么组成？"
options:
  - "权重绝对值和输入激活范数"
  - "学习率和 batch size"
  - "网络延迟和端口号"
  - "tokenizer 文件大小"
answer: 0
explain: "Wanda 使用 |W_ij| 乘以对应输入通道激活 L2 范数作为重要性。"
```
