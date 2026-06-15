### 联合嵌入预测架构 (Joint Embedding Predictive Architecture)

```yaml
id: jepa
name: JEPA
full_name: 联合嵌入预测架构 (Joint Embedding Predictive Architecture)
year: "2022.06"
org: Meta AI
paper_url: "https://openreview.net/forum?id=BZ5a_v_S_s"
category: predictive
parent: "—"
motivation: "预测潜在表征而非像素避免建模噪声"
```

#### 📝 一句话总结

JEPA 提出在联合嵌入空间中预测未来或缺失部分的表征，而不是重建像素、声音或 token 细节，从而让世界模型聚焦可预测、语义相关的信息，并为层级规划和自主智能提供非生成式表征学习框架。

#### 🎯 核心要点

- **非生成式预测**：预测 \(y\) 的表征 \(s_y\)，而不是直接生成 \(y\) 本身，避免浪费容量建模不可预测细节
- **双编码器 + predictor**：\(x\)-encoder 产生 \(s_x\)，\(y\)-encoder 产生 \(s_y\)，predictor 从 \(s_x\) 和可选 latent \(z\) 预测 \(\hat{s}_y\)
- **能量式解释**：预测误差 \(D(s_y,\hat{s}_y)\) 可视为兼容性能量，低能量代表 \(x\) 与 \(y\) 可互相解释
- **多模态未来表达**：通过 \(y\)-encoder 的不变性和 predictor latent \(z\) 表达一个 \(x\) 对应多个合理 \(y\)
- **非对比防坍塌**：主张用信息最大化、predictability 和 latent 信息最小化等正则，而非大量负样本
- **层级 JEPA**：低层做短期细节预测，高层做长期抽象预测，为多时间尺度规划提供表征基础

#### 🔬 深入细节

##### 核心示意图

![JEPA 通用架构](https://ar5iv.labs.arxiv.org/html/2404.08471/assets/x2.png)
*图：JEPA 从一个输入的表征预测另一个输入的表征，额外变量提供两者之间的变换、遮挡或时间关系信息。该图来自 V-JEPA 论文中的通用 JEPA 示意。*

> ⚠️ 注意：YAML 中的 OpenReview 链接 `BZ5a_v_S_s` 当前无法直接访问；公开 OpenReview PDF 对应 Yann LeCun 的 2022 年路线论文《A Path Towards Autonomous Machine Intelligence》，本文据该论文和后续 I-JEPA/V-JEPA 公开资料整理。

##### 动机与背景

LeCun 的 JEPA 观点针对两个问题。第一，智能体需要学习世界模型来预测未来、补全缺失信息和规划动作，但真实世界未来通常是多模态的，不适合要求模型生成唯一像素结果。第二，像素级生成模型会花费大量容量预测树叶纹理、阴影、噪声等对行为无关且不可精确预测的细节。

JEPA 的核心想法是：把预测目标从数据空间移到表征空间。给定观测部分 \(x\) 和目标部分 \(y\)，编码器产生：

$$
s_x = E_x(x), \qquad s_y = E_y(y)
$$

predictor 根据 \(s_x\) 和可选 latent \(z\) 预测目标表征：

$$
\hat{s}_y = P(s_x, z)
$$

能量或损失为：

$$
E(x,y,z)=D(s_y,\hat{s}_y)
$$

如果 \(z\) 未知，可通过最小化能量推断：

$$
F(x,y)=\min_z D(E_y(y), P(E_x(x), z))
$$

##### 算法伪代码

```python
# Generic JEPA training sketch
for x, y, transform_info in unlabeled_pairs:
    sx = x_encoder(x)
    with stop_gradient_or_target_update():
        sy = y_encoder(y)

    z = infer_or_sample_latent(transform_info)
    pred = predictor(sx, z)
    pred_loss = distance(pred, sy)

    info_regularizer = maximize_information(sx) + maximize_information(sy)
    latent_regularizer = minimize_information(z)
    optimize(pred_loss + info_regularizer + latent_regularizer)
```

##### 为什么预测表征而不是像素

设 \(x\) 是一段车驶向岔路口的视频，\(y\) 是几秒后的画面。像素级模型必须决定车向左还是向右、树叶如何摆动、路面纹理如何变化；但对规划来说，关键可能只是“车的位置、速度、道路分支、潜在风险”。JEPA 允许 \(E_y\) 把不可预测或无关细节映射掉，使多个像素不同但语义等价的未来共享近似表征。

这与生成式模型的差异很重要。生成式模型必须构造 \(y\) 或像素重建 \(\hat y\)，损失通常迫使它解释所有低层细节；JEPA 只要求 \(\hat{s}_y\) 接近 \(s_y\)，因此更适合学习“对任务和预测有用的抽象”。

> 💡 关键：JEPA 的抽象不是人工规定的，而是由“可预测且信息充足”两个目标共同塑造。

##### 防止表示坍塌

简单的 joint embedding 容易坍塌：两个 encoder 都输出常数，预测误差为零但表征无信息。JEPA 路线论文提出非对比训练原则：

- \(s_x\) 应尽量包含 \(x\) 的信息
- \(s_y\) 应尽量包含 \(y\) 的信息
- \(s_y\) 应容易由 \(s_x\) 预测
- latent \(z\) 的信息容量应受限，避免 predictor 只靠 \(z\) 复制目标

用公式概括，可写成：

$$
\mathcal{L}_{\mathrm{JEPA}}
=
D(s_y, P(s_x,z))
+
\mathcal{R}_{\mathrm{info}}(s_x,s_y)
+
\mathcal{R}_{\mathrm{latent}}(z)
$$

其中 \(\mathcal{R}_{\mathrm{info}}\) 可由 VICReg、Barlow Twins、EMA target encoder、variance/covariance 正则等具体机制实现；\(\mathcal{R}_{\mathrm{latent}}\) 则限制 latent 维度、离散度、稀疏度或噪声。

##### 层级 JEPA 与世界模型

路线论文进一步提出 H-JEPA：低层 JEPA 学习短期、细粒度预测，高层 JEPA 接收低层表征并做长期、抽象预测。这样，系统可以在不同时间尺度上规划：毫秒级动作控制依赖低层细节，分钟级路线或任务规划依赖高层状态。

对具身智能而言，这意味着世界模型不必只有一个统一 latent。它可以形成从局部视觉特征、对象、事件到任务状态的层级表征，并在每层预测未来。I-JEPA 与 V-JEPA 是该思想在图像和视频上的具体实例，后续世界模型研究则进一步探索把这种表征预测用于机器人控制、视频理解和规划。

#### 🧪 练习题

```yaml
question: "JEPA 相比像素重建式世界模型的核心优势是什么？"
options:
  - "它完全不需要编码器"
  - "它在表征空间预测目标，可以忽略不可预测或任务无关的低层细节"
  - "它只能用于有监督分类"
  - "它通过增加负样本数量来生成更清晰图像"
answer: 1
explain: "JEPA 预测的是目标表征而非原始数据，因此模型容量集中在可预测的语义结构上，而不是纹理、噪声等细节。"
```
