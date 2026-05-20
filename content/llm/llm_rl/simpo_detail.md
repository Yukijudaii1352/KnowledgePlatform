### SimPO（Simple Preference Optimization）

#### 📝 一句话总结

SimPO 提出了一种简单高效的直接偏好优化方法——使用长度归一化的平均对数概率作为隐式奖励，并引入目标奖励间隔（target reward margin）替代参考模型，在消除长度偏见的同时显著降低了计算开销，在 AlpacaEval 2 和 Arena-Hard 上全面超越 DPO。

#### 🎯 核心要点

- **长度归一化奖励**：使用平均对数概率 \(\frac{1}{|y|}\log\pi_\theta(y|x)\) 作为隐式奖励，直接嵌入长度归一化，消除 DPO 中因 sum-of-tokens 导致的生成长度偏好
- **目标奖励间隔（Target Reward Margin）**：引入超参数 \(\gamma\)，强制 winner 和 loser 之间的奖励差距至少为 \(\gamma\)，有效提升奖励准确率
- **无参考模型设计**：完全移除 DPO 中的参考模型 \(\pi_{\text{ref}}\)，减少约 20% 训练时间和 10% GPU 内存占用
- **训练-推理一致性**：训练时的奖励形式与推理时的解码目标（平均对数似然）完全对齐，消除了 DPO 中奖励与生成指标之间的不匹配问题
- **四组实验配置覆盖 SOTA**：Llama3-Base/Instruct 和 Mistral-Base/Instruct 四个 setting 下全面验证，AlpacaEval 2 上取得最高 61.9% LC win rate（Llama3-Instruct）
- **超参数鲁棒性**：\(\beta\) 在 2.0-2.5 之间、\(\gamma\) 在 0.5-1.5 之间可稳定获得优良性能

#### 🔬 深入细节

##### 1. 核心框架图

![SimPO 与 DPO 对比图](https://ar5iv.labs.arxiv.org/html/2405.14734/assets/x1.png)
*图：SimPO 和 DPO 的核心差异——阴影框标注了二者在奖励公式上的区别。DPO 使用参考模型 \(\pi_{\text{ref}}\) 的对数比作为奖励，而 SimPO 直接使用长度归一化的策略对数概率 \(\frac{\beta}{|y|}\log\pi_\theta(y|x)\) 并以目标间隔 \(\gamma\) 作为margin。*

##### 2. 算法伪代码

```python
# SimPO 训练框架伪代码
for batch in preference_data:
    # batch: (x, y_w, y_l) — 输入、偏好赢家、偏好输家
    
    # 1. 前向传播，计算对数概率
    log_pi_w = model.forward(x, y_w)  # log π_θ(y_w|x)，形状 (B,)
    log_pi_l = model.forward(x, y_l)  # log π_θ(y_l|x)，形状 (B,)
    
    # 2. 长度归一化：除以各自的token数
    len_w = count_tokens(y_w)  # |y_w|
    len_l = count_tokens(y_l)  # |y_l|
    avg_log_p_w = log_pi_w / len_w  # (1/|y_w|)·log π_θ(y_w|x)
    avg_log_p_l = log_pi_l / len_l  # (1/|y_l|)·log π_θ(y_l|x)
    
    # 3. 计算长度归一化的奖励（乘以缩放因子β）
    r_w = beta * avg_log_p_w  # β/|y_w|·log π_θ(y_w|x)
    r_l = beta * avg_log_p_l  # β/|y_l|·log π_θ(y_l|x)
    
    # 4. SimPO 损失函数（logistic loss with margin）
    diff = r_w - r_l - gamma  # 奖励差减去目标间隔
    loss = -log_sigmoid(diff).mean()  # ℒ_SimPO = -log σ(r_w - r_l - γ)
    
    # 5. 反向传播更新参数（无需参考模型前向）
    optimizer.zero_grad()
    loss.backward()
    optimizer.step()
```

##### 3. 方法深入解析

**动机与背景**

DPO（Direct Preference Optimization）虽然简化了 RLHF 流程，但存在三个核心缺陷：

1. **长度偏见（Length Bias）**：DPO 的隐式奖励 \(r_\theta(x,y) = \beta\log\frac{\pi_\theta(y|x)}{\pi_{\text{ref}}(y|x)}\) 本质上是 sum-of-tokens 的对数概率——长响应天然倾向于获得更高的累积对数概率，导致模型偏好生成冗长的输出
2. **训练-推理不匹配**：训练时优化的是与参考模型的比例，而推理时使用平均对数似然 \(\frac{1}{|y|}\log\pi_\theta(y|x)\) 作为解码指标——二者不一致会导致训练阶段学到的「好/坏响应」排序与推理时的实际偏好指标冲突
3. **额外计算开销**：DPO 需要同时维护策略模型和参考模型两份参数，训练时需对同一个 batch 执行两次前向传播，增加了约 50% 的计算量

**核心机制**

SimPO 的奖励设计直接对齐推理时的解码目标：

$$r_{\text{SimPO}}(x,y) = \frac{\beta}{|y|}\log\pi_\theta(y|x)$$

这一公式的本质是**将长度归一化内嵌到奖励函数中**——用平均对数概率（而非累积对数概率）作为衡量标准。其关键洞察在于：

- **为什么不用参考模型？**：DPO 引入参考模型是为了防止策略偏离 SFT 分布过远，但 SimPO 发现，通过**目标奖励间隔 \(\gamma\)** 可以起到类似的约束效果——\(\gamma\) 鼓励模型学习到「winner 的奖励显著高于 loser」的表示，而不是单纯放大二者的差值
- **为什么长度归一化更优？**：直接用 \(\log\pi_\theta(y|x)\)（sum-of-tokens）会导致模型在训练中发展出对长响应的系统性偏好（Spearman 相关系数可达 0.82），而 \(\frac{1}{|y|}\log\pi_\theta(y|x)\) 的相关系数仅为 0.34

**最终损失函数**

SimPO 的损失函数结合了 logistic loss 和目标奖励间隔：

$$\mathcal{L}_{\text{SimPO}} = -\log\sigma\left(\frac{\beta}{|y_w|}\log\pi_\theta(y_w|x) - \frac{\beta}{|y_l|}\log\pi_\theta(y_l|x) - \gamma\right)$$

其中 \(\sigma(\cdot)\) 是 sigmoid 函数，\(\gamma\) 是目标奖励间隔。当 \(\gamma=0\) 时，退化为不带 margin 的 logistic loss；当 \(\gamma > 0\) 时，要求 winner 的奖励不仅高于 loser，还要高出至少 \(\gamma\)。

**与 DPO 及其他方法的对比**

| 方法 | 奖励形式 | 是否需要参考模型 | 长度归一化 |
|------|----------|:---:|:---:|
| DPO | \(\beta\log\frac{\pi_\theta}{\pi_{\text{ref}}}\) | ✅ | ❌ |
| R-DPO | DPO 奖励 + 长度惩罚因子 | ✅ | ❌(软约束) |
| ORPO | 平均对数概率 + odds ratio penalty | ❌ | ✅ |
| **SimPO** | **\(\frac{\beta}{|y|}\log\pi_\theta\)** | **❌** | **✅(硬嵌入)** |

SimPO 是唯一同时实现「无参考模型」和「显式长度归一化」的方法。ORPO 虽也使用了平均对数概率，但其损失函数结构截然不同（SFT loss + odds ratio loss），本质上是两阶段方案；而 SimPO 用单一、紧凑的 logistic loss 完成端到端优化。

**关键消融实验发现**

1. **长度归一化的必要性**（Section 4.2）：移除 LN 后，当 winner 比 loser 短时模型学到**负的奖励差**（即偏好短响应被错误惩罚），同时平均对数似然与长度的 Spearman 相关系数从 0.34 飙升到 0.82
2. **\(\gamma\) 的作用**（Section 4.3）：增大 \(\gamma\) 会持续提升奖励准确率（reward accuracy），但下游生成质量呈 ∩ 形曲线——\(\gamma\) 过大会「压平」奖励分布并压低 winner 的绝对对数似然，最终导致模型退化
3. **DPO vs SimPO 的奖励匹配度**（Section 4.4）：用 DPO 奖励判断为正确的样本中，有近一半在平均对数似然指标上实际是**相反的**（\(p_\theta(y_w) < p_\theta(y_l)\)），而 SimPO 通过奖励与推理指标的直接对齐完全消除了这一矛盾

**效率优势**

在 8×H100 GPU 的 Llama3-Base 训练配置下，SimPO 相比 DPO 节省约 20% 的 wall-clock 时间和约 10% 的 GPU 峰值内存，原因仅在于省去了参考模型的一次完整前向传播。

#### 📚 练习题

1. **【选择题】** SimPO 的奖励公式 \(r_{\text{SimPO}}(x,y) = \frac{\beta}{|y|}\log\pi_\theta(y|x)\) 中，除以 \(|y|\) 的作用是什么？

   A. 增加长响应的奖励优势  
   B. 将 sum-of-tokens 的对数概率转换为平均对数概率，消除长度偏见  
   C. 让奖励与 KL 散度保持一致的尺度  
   D. 消除大 batch 训练时的奖励方差

   <details><summary>答案</summary>**B**。除以 |y| 将累积对数概率转换为平均每 token 的对数概率，使得长短响应在奖励空间中获得公平比较。</details>

2. **【思考题】** SimPO 消融实验显示，移除目标奖励间隔 \(\gamma\)（即设 \(\gamma=0\)）会使模型性能下降；但 \(\gamma\) 过大同样有害。请推测：\(\gamma\) 在这两种极端情况下分别导致了什么问题？

   <details><summary>参考答案</summary>\(\gamma=0\) 时，模型只需让 winner 奖励略高于 loser 即可降低损失，缺乏驱动学习强偏好的动力，奖励准确率不足。\(\gamma\) 过大时，模型被迫将 winner 的绝对对数似然压得很低（以创造足够大的差值），导致生成质量退化——过度追求「拉开差距」反而损害了实际文本生成能力。</details>

3. **【思考题】** SimPO 声称「训练时使用的奖励形式与推理时解码目标完全一致」。请具体说明：DPO 在这两个阶段的奖励/目标分别是什么？这种不一致如何导致了图 4(b) 中的问题？

   <details><summary>参考答案</summary>DPO 训练时优化的是 \(r_\theta = \beta\log(\pi_\theta/\pi_{\text{ref}})\)，而推理时（如 beam search）实际使用的是 \(\frac{1}{|y|}\log\pi_\theta\) 或类似指标。这种不一致意味着训练阶段学到的「好/坏响应」排序（基于含 \(\pi_{\text{ref}}\) 的比率）与实际生成时的偏好指标（纯平均对数似然）可能是冲突的——图 4(b) 的 contingency table 中，接近一半的 DPO 训练集样本出现 \(r_\theta(y_w) > r_\theta(y_l)\) 但 \(p_\theta(y_w) < p_\theta(y_l)\) 的矛盾，正是这种不匹配的直接体现。SimPO 通过训练时即使用 \(\frac{1}{|y|}\log\pi_\theta\) 消除了这一鸿沟。</details>