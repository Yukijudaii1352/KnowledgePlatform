### Lookahead Decoding: 展望解码 (Lookahead Decoding)

```yaml
id: lookahead
name: Lookahead Decoding
full_name: 展望解码 (Lookahead Decoding)
year: '2024'
org: Stanford
paper_url: https://arxiv.org/abs/2402.02057
category: spec_decode
parent: —
motivation: 基于Jacobi迭代的并行解码无需微调
```

#### 📝 一句话总结

Lookahead Decoding 将自回归生成视为可并行 Jacobi 迭代，在无需 draft model 和微调的情况下同时生成 n-gram 候选并验证，从而减少串行解码步数。

#### 🎯 核心要点

- 无需额外草稿模型，也不修改目标模型参数
- 用 Jacobi-style 并行迭代预测多个未来位置
- 维护 lookahead branch 和 verification branch
- 通过 n-gram matching/verification 接受可验证候选
- 特别适合贪心或确定性解码场景的工程加速

#### 🔬 深入细节

![Lookahead Decoding 核心示意图](https://ar5iv.labs.arxiv.org/html/2402.02057/assets/x1.png)
*图：Lookahead Decoding 的并行生成与验证窗口示意。*

```python
while not finished:
    # lookahead branch: parallel propose future tokens
    guesses = jacobi_parallel_update(prefix, window_size, ngram_size)
    ngrams = collect_candidate_ngrams(guesses)

    # verification branch: target model verifies candidates
    accepted = verify_longest_ngram(prefix, ngrams, target_model)
    if accepted:
        prefix.extend(accepted)
    else:
        prefix.append(target_model.greedy_next(prefix))
```

##### 动机与背景

投机解码通常需要草稿模型或额外 heads。许多部署场景无法训练或维护这些组件，但仍希望利用 GPU 对多个位置并行计算的能力。Lookahead 从迭代求解角度重写解码过程。

##### 核心机制

Jacobi 迭代允许在当前近似序列上并行更新多个未来位置。Lookahead 分支持续产生候选 n-gram；验证分支用目标模型检查这些 n-gram 是否与标准解码一致。一旦匹配，就一次提交多个 token。

##### 训练/推理流程

算法维护一个二维窗口：行表示并行 lookahead 步，列表示不同位置。每轮从窗口中提取可能 n-gram，目标模型对候选进行验证；成功则前缀前进多个 token，失败则退回常规一步。

##### 与传统方法的区别

与 classic speculative decoding 相比，Lookahead 没有独立 draft model，部署简单；但它主要服务确定性/贪心一致性验证，采样分布处理不像拒绝采样式投机解码那样通用。

#### 🧪 练习题

```yaml
question: "Lookahead Decoding 的主要部署优势是什么？"
options:
  - "无需额外 draft model 或微调"
  - "必须使用两个大模型"
  - "只能处理图像"
  - "删除 KV cache"
answer: 0
explain: "它从目标模型自身的并行 Jacobi 迭代构造候选，不依赖独立草稿模型。"
```
