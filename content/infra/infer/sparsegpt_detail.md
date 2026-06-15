### SparseGPT: 稀疏GPT (SparseGPT)

```yaml
id: sparsegpt
name: SparseGPT
full_name: 稀疏GPT (SparseGPT)
year: '2023'
org: IST Austria
paper_url: https://arxiv.org/abs/2301.00774
category: quantize
parent: gptq
motivation: 一步式无结构剪枝支持千亿参数模型
```

#### 📝 一句话总结

SparseGPT 使用近似二阶信息对大模型逐层一次性剪枝，并同步更新剩余权重补偿输出误差，使千亿参数模型可在无需重训练的情况下实现高稀疏度。

#### 🎯 核心要点

- 面向 post-training pruning，无需梯度训练或微调
- 逐层最小化剪枝前后输出重建误差
- 使用 Hessian 近似指导剪哪些权重以及如何更新剩余权重
- 支持非结构化稀疏和 N:M 半结构化稀疏
- 与量化方法可组合，进一步降低模型存储和计算

#### 🔬 深入细节

![SparseGPT 核心示意图](https://ar5iv.labs.arxiv.org/html/2301.00774/assets/x1.png)
*图：SparseGPT 的逐层剪枝与误差补偿流程。*

```python
# SparseGPT pruning sketch
X = collect_layer_inputs(layer)
H_inv = inverse(X @ X.T + damping * I)
for block in columns(W):
    scores = saliency(W_block, H_inv)
    mask = prune_lowest(scores, sparsity)
    error = W_block * (1 - mask)
    W_block *= mask
    W_remaining -= compensate(error, H_inv)
```

##### 动机与背景

传统剪枝通常需要训练后微调，大模型微调成本高且数据不可得。简单按幅值剪枝在高稀疏度下会破坏层输出。SparseGPT 把剪枝看成逐层重建问题。

##### 核心机制

与 GPTQ 类似，SparseGPT 用校准激活构造二阶近似。每次将部分权重置零后，根据 Hessian 逆更新未剪权重，补偿被剪权重对层输出的影响。剪枝分 block 进行以控制内存。

##### 训练/推理流程

对每层收集输入激活，计算近似 Hessian；按目标稀疏率选择要剪的权重；执行权重更新补偿；进入下一层。全流程只需前向校准，不做反向训练。

##### 与传统方法的区别

GPTQ 是把权重映射到低比特格点，SparseGPT 是把权重变成零；二者都用二阶误差补偿。Wanda 则更简单，不用 Hessian，只用权重幅值和激活范数组合。

#### 🧪 练习题

```yaml
question: "SparseGPT 的主要特点是什么？"
options:
  - "无需重训练的一次性二阶剪枝"
  - "必须从零训练模型"
  - "只压缩 KV cache"
  - "只能用于图像模型"
answer: 0
explain: "SparseGPT 使用校准激活和 Hessian 近似逐层剪枝并补偿剩余权重。"
```
