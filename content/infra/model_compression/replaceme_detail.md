### ReplaceMe

```yaml
id: replaceme
name: ReplaceMe
full_name: 深度剪枝替换 (ReplaceMe)
year: 2026
org: NeurIPS
paper_url: https://proceedings.neurips.cc/paper_files/paper/2025/hash/1c10d0c087c14689628124bbc8fa69f6-Abstract-Conference.html
category: pruning
parent: movement_pruning
motivation: 深度剪枝与Transformer块线性化
```

#### 📝 一句话总结

ReplaceMe 提出训练自由的深度剪枝方法，用一个由校准数据估计的线性变换替换连续 Transformer blocks，解决了直接删除层会造成隐藏状态接口不匹配、而恢复微调成本又很高的问题。

#### 🎯 核心要点

- 针对 depth pruning，删除连续 Transformer blocks 而不是单个权重或通道
- 用小规模校准集估计线性变换 \(T\)，近似被剪块序列对隐藏状态的作用
- 将 \(T\) 融合进保留块的 MLP down projection，不增加额外推理参数
- 支持 L2/cosine 距离等目标，并可加入 L1/L2 正则增强泛化
- 可扩展到多个不重叠 block 组，每组估计独立线性变换
- 在低到中等剪枝率下无需 healing training 即保持较高 benchmark 性能

#### 🔬 深入细节

![ReplaceMe 深度剪枝示意图](https://arxiv.org/html/2505.02819v1/x1.png)
*图：ReplaceMe 绕过一段连续 Transformer blocks，并插入估计出的线性变换来对齐后续 block 期望的输入空间。*

```python
# ReplaceMe 训练自由深度剪枝伪代码
for candidate_span in contiguous_block_spans(model):
    H_before, H_after = collect_hidden_states(model, calibration_data, candidate_span)
    score[candidate_span] = distance(H_before, H_after)

span = choose_low_impact_span(score, target_depth_reduction)
M_i, Y_i, L_after = collect_mlp_and_residual_states(model, calibration_data, span)
T = solve_or_optimize_linear_transform(M_i, L_after - Y_i,
                                       objective="cosine_or_l2",
                                       regularization="l1_l2")
fuse_T_into_previous_mlp_down_projection(model, span.start, T)
remove_blocks(model, span.middle_blocks)
```

普通深度剪枝直接跳过若干 Transformer blocks，计算量减少明显，但隐藏状态会进入后续层不熟悉的分布区域。ReplaceMe 的核心假设是：一段连续 blocks 的整体作用，在低压缩率下可以由一个线性映射近似，尤其可以把第 \(i\) 个 block 的 MLP 输出映射到第 \(i+n+1\) 个 block 期望的输入空间。

论文把 Transformer block 拆成 attention 残差、MLP 输出和最终残差。若 \(M_i\) 是第 \(i\) 个 block 的 MLP 输出，\(Y_i\) 是 attention 后残差，\(L_{i+n}\) 是保留后续层所需的目标隐藏状态，则可估计：

$$
T^\*=\arg\min_T h(M_iT+Y_i, L_{i+n})
$$

为降低内存，论文还使用等价近似形式：

$$
T^\*=\arg\min_T \cos(M_iT, L_{i+n}-Y_i)
$$

其中 \(h\) 可取 L2 或 cosine 距离。L2 目标在部分设定下可给出闭式解，cosine 目标则通常用 Adam 等优化器求解。这个过程只需要校准数据前向统计，不需要更新原模型权重。

> 💡 关键：ReplaceMe 不是“删层后额外挂一个新层”，而是把估计出的线性变换融合进前一个 MLP 的 down projection，因此推理图中不会多出新的模块。

正则化用于防止线性变换在校准集上过拟合。L1 可鼓励稀疏变换，L2 可限制权重过大；论文观察到正则可能改善准确率 benchmark，但也可能牺牲困惑度，因此需要按部署目标选择。

与 Movement Pruning 这类微调中剪权重的方法相比，ReplaceMe 不依赖任务训练过程，适合已经训练好的 LLM 快速 depth compression。与普通 layer dropping 相比，它用线性接口补偿被删 blocks 的分布变换，因此在不做 healing 的情况下更稳。

#### 🧪 练习题

```yaml
question: "ReplaceMe 为什么能在删除连续 Transformer blocks 后不增加额外推理参数？"
options:
  - "它把所有被删 blocks 替换成稀疏注意力"
  - "它将估计出的线性变换融合进前序 MLP 的 down projection"
  - "它只删除 embedding 层"
  - "它要求重新预训练整个模型"
answer: 1
explain: "线性变换和已有 MLP 投影是连续线性算子，可代数合并为一个权重矩阵，因此模型结构只体现为 blocks 被删除。"
```
