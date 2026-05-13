### 温度缩放校准 (On Calibration of Modern Neural Networks)

```yaml
id: temperature_scaling
name: Temperature Scaling
full_name: "温度缩放校准 (On Calibration of Modern Neural Networks)"
year: "2017"
org: "Cornell University"
paper_url: "https://arxiv.org/abs/1706.04599"
category: "calibration"
parent: "—"
motivation: "用单一温度参数 T 对 logits 进行缩放，使神经网络输出的置信度与真实准确率对齐，解决现代深度网络过度自信的校准问题"
```

#### 📝 一句话总结

现代神经网络的预测置信度严重偏高（过度自信），本文提出 **Temperature Scaling**——仅用一个标量温度参数 \(T\) 对 logits 进行缩放后再 softmax，即可在不改变分类准确率的前提下，将模型输出概率校准至与真实正确率一致，是目前最简单有效的后处理校准方法。

#### 🎯 核心要点

- **问题发现**：现代深度网络（ResNet、DenseNet 等）相比早期模型（LeNet 等）校准性能显著退化，预测置信度远高于实际准确率
- **校准度量**：采用 Expected Calibration Error (ECE) 和 reliability diagram 量化评估模型校准程度
- **miscalibration 归因**：模型容量增大（深度/宽度）、Batch Normalization、权重衰减不足是导致过度自信的关键因素；NLL 在训练后期过拟合是直接原因
- **Temperature Scaling 方法**：在已训练模型的 logits 上除以标量 \(T\)，再通过 softmax 得到校准后的概率；\(T\) 在验证集上最小化 NLL 求解
- **关键性质**：Temperature Scaling 不改变 softmax 的 argmax，因此**不影响模型分类准确率**，仅调整置信度分布
- **方法对比**：对比了 Histogram Binning、Isotonic Regression、Bayesian Binning into Quantiles (BBQ)、Platt Scaling、Matrix Scaling、Vector Scaling 等方法，Temperature Scaling 在绝大多数设置下 ECE 最低

#### 🔬 深入细节

##### 示意图

![校准对比：LeNet vs ResNet](https://ar5iv.labs.arxiv.org/html/1706.04599/assets/x1.png)
*图 1：5 层 LeNet（左）与 110 层 ResNet（右）在 CIFAR-100 上的置信度直方图（上）和可靠性图（下）。LeNet 的置信度分布较均匀且接近对角线（校准良好），而 ResNet 的置信度集中在高置信区间且严重偏离对角线（过度自信）。*

![Miscalibration 影响因素](https://ar5iv.labs.arxiv.org/html/1706.04599/assets/x3.png)
*图 2：网络深度（最左）、宽度（中左）、Batch Normalization（中右）、权重衰减（最右）对 ECE 和测试误差的影响。增加深度/宽度、使用 BN 均降低测试误差但恶化校准；权重衰减不足同样导致 ECE 升高。*

![校准前后对比](https://ar5iv.labs.arxiv.org/html/1706.04599/assets/x5.png)
*图 4：CIFAR-100 上校准前（最左）与各方法校准后的可靠性图。Temperature Scaling（最右）将预测概率拉回对角线，ECE 从 14.80% 降至 1.60%。*

##### 算法伪代码

```python
# Temperature Scaling 校准流程
# 输入：已训练模型 f(x)，验证集 D_val = {(x_i, y_i)}

# Step 1: 提取 logits
logits = [f(x_i) for x_i in D_val]  # z_i ∈ R^K

# Step 2: 在验证集上优化温度参数 T
T = nn.Parameter(torch.ones(1) * 1.5)  # 初始化 T > 0
optimizer = optim.LBFGS([T], lr=0.01)

for _ in range(max_iter):
    def closure():
        scaled_logits = logits / T          # 温度缩放
        loss = cross_entropy(scaled_logits, labels)  # NLL 损失
        loss.backward()
        return loss
    optimizer.step(closure)

# Step 3: 推理时使用校准后的概率
def calibrated_predict(x):
    z = f(x)                    # 原始 logits
    q = softmax(z / T)          # 校准后概率
    confidence = max(q)         # 校准后置信度
    prediction = argmax(q)      # 预测类别（与 argmax(z) 相同）
    return prediction, confidence
```

##### 方法细节

**动机与背景：为什么需要校准？**

在安全关键应用（自动驾驶、医疗诊断）中，模型不仅需要给出正确预测，还需要对预测的不确定性给出可靠估计。理想情况下，当模型声称"90% 的置信度"时，其预测应确实有 90% 的概率是正确的。这一性质称为**完美校准（perfect calibration）**，形式化定义为：

$$\mathbb{P}(\hat{Y} = Y \mid \hat{p} = p) = p, \quad \forall p \in [0, 1]$$

其中 \(\hat{p}\) 是模型输出的置信度（softmax 最大值），\(\hat{Y}\) 是预测类别。然而，作者发现现代深度网络严重违反这一性质——它们系统性地**过度自信**：即使预测错误，输出的置信度仍然很高。

> 💡 关键：早期的浅层网络（如 LeNet）校准性能反而较好，miscalibration 是随着网络变深变大而出现的"现代病"。

**Miscalibration 的根源分析**

论文通过控制变量实验揭示了四个关键因素：

1. **模型容量（深度与宽度）**：增加网络层数或每层通道数可以降低分类错误率，但 ECE 同步恶化。更大的模型有更强的拟合能力，容易在训练集上将 NLL 压到极低，导致输出概率趋向 0/1 极端值。

2. **Batch Normalization**：BN 显著提升准确率，但也加剧了过度自信。这可能与 BN 改变了损失曲面的几何结构有关，使优化更容易到达 NLL 极低的区域。

3. **权重衰减（Weight Decay）**：减小权重衰减系数会降低测试误差，但大幅恶化校准。正则化不足使模型更容易过拟合训练集的 NLL。

4. **NLL 过拟合**：这是最直接的原因。作者观察到，在训练后期测试误差已经收敛，但测试 NLL 持续上升（过拟合），这意味着模型在提升准确率的同时，输出概率的质量在下降。

> ⚠️ 注意：NLL 过拟合不等于分类过拟合。模型的测试准确率可能仍在改善，但概率估计的质量已经恶化——这是一种"隐性过拟合"。

**校准度量：Expected Calibration Error (ECE)**

由于完美校准的定义涉及连续概率值，实际中通过分箱近似来计算。将预测样本按置信度分入 \(M\) 个等宽区间 \(B_1, \ldots, B_M\)，ECE 定义为：

$$\text{ECE} = \sum_{m=1}^{M} \frac{|B_m|}{n} \left| \text{acc}(B_m) - \text{conf}(B_m) \right|$$

其中 \(\text{acc}(B_m)\) 是第 \(m\) 个 bin 中样本的实际准确率，\(\text{conf}(B_m)\) 是该 bin 中样本的平均置信度。ECE 越低，校准越好。对应的可视化工具是 **reliability diagram**：横轴为置信度区间，纵轴为实际准确率，完美校准对应对角线。

**Temperature Scaling 的核心机制**

Temperature Scaling 是 Platt Scaling 的极简特例。对于 \(K\) 分类问题，给定模型输出的 logit 向量 \(\mathbf{z}_i \in \mathbb{R}^K\)，校准后的置信度为：

$$\hat{q}_i = \max_k \, \sigma_{\text{SM}}\left(\frac{\mathbf{z}_i}{T}\right)_k$$

其中 \(\sigma_{\text{SM}}\) 是 softmax 函数，\(T > 0\) 是温度参数。\(T\) 通过在验证集上最小化负对数似然（NLL）求解：

$$T^* = \arg\min_T \, -\sum_{i=1}^{n} \log \sigma_{\text{SM}}\left(\frac{\mathbf{z}_i}{T}\right)_{y_i}$$

这是一个关于单一标量 \(T\) 的凸优化问题，可以用 LBFGS 等方法高效求解。

> 💡 关键：当 \(T > 1\) 时，softmax 输出被"软化"（概率分布更均匀，置信度降低）；当 \(T < 1\) 时，分布被"锐化"（置信度升高）。由于现代网络普遍过度自信，最优 \(T\) 通常大于 1。

**为什么 Temperature Scaling 不改变准确率？**

因为对所有 logit 除以同一个正数 \(T\) 不改变它们的大小排序：

$$\arg\max_k \, \sigma_{\text{SM}}\left(\frac{\mathbf{z}_i}{T}\right)_k = \arg\max_k \, z_{i,k}$$

这意味着模型的 top-1 预测类别完全不变，Temperature Scaling 只是重新分配了各类别的概率值，使其更好地反映真实的不确定性。

**与其他校准方法的对比**

论文系统对比了以下方法：

| 方法 | 类型 | 参数量 | 是否改变准确率 |
|------|------|--------|----------------|
| Histogram Binning | 非参数 | \(M\) 个 bin 边界 | 是 |
| Isotonic Regression | 非参数 | 单调映射 | 是 |
| BBQ | 非参数 | 贝叶斯 bin 组合 | 是 |
| Platt Scaling | 参数化 | \(2K\) (Matrix) / \(2K\) (Vector) | 可能 |
| **Temperature Scaling** | **参数化** | **1** | **否** |

Platt Scaling 的一般形式为 \(\hat{q}_i = \sigma_{\text{SM}}(\mathbf{W}\mathbf{z}_i + \mathbf{b})\)，其中 Matrix Scaling 使 \(\mathbf{W}\) 为对角矩阵（\(K\) 个参数），Vector Scaling 使 \(\mathbf{W} = \text{diag}(\mathbf{w})\)（\(K\) 个参数加偏置）。Temperature Scaling 是其最简形式：\(\mathbf{W} = \frac{1}{T}\mathbf{I}\)，\(\mathbf{b} = \mathbf{0}\)，仅 1 个参数。

实验表明，在 CIFAR-10/100、ImageNet、SVHN 以及 Birds、Cars 等细粒度数据集上，Temperature Scaling 的 ECE 始终最低或接近最低，且由于参数极少，几乎不存在过拟合验证集的风险。

#### 🧪 练习题

```yaml
question: "Temperature Scaling 为什么不会改变模型的分类准确率？"
options:
  - "因为温度参数 T 总是等于 1"
  - "因为它只调整 softmax 之前的 bias 项"
  - "因为对所有 logits 除以同一正数 T 不改变 argmax 的结果"
  - "因为它在训练阶段就已经融入了模型参数"
answer: 2
explain: "Temperature Scaling 对 logit 向量的每个分量除以相同的正数 T，这是一个保序变换，不改变各分量的大小排序，因此 softmax 的 argmax（即预测类别）保持不变。"
```