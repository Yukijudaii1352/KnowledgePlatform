### VGGNet

```yaml
id: vggnet
name: VGGNet
full_name: "Very Deep Convolutional Networks for Large-Scale Image Recognition"
year: 2014.09
org: Oxford
paper_url: "https://arxiv.org/abs/1409.1556"
category: cnn_classic
parent: alexnet
motivation: "系统性地证明通过堆叠3×3小卷积核持续增加网络深度（11→19层）可以显著提升图像识别性能"
```

#### 📝 一句话总结

VGGNet通过将卷积核统一为3×3并将网络深度增加到16-19层，在保持架构简洁的同时达到了ILSVRC-2014分类任务第二名（top-5 error 6.8%），证明了深度是提升CNN性能的关键因素。

#### 🎯 核心要点

- **统一3×3卷积核**：用2-3个3×3卷积替代5×5/7×7，获得相同感受野但参数更少（$27C^2$ vs $49C^2$，减少45%）且引入更多ReLU非线性
- **深度提升性能**：从11层(A)到19层(E)，top-5 error从10.4%降至8.0%（单尺度），验证了"更深更好"
- **多尺度训练/测试**：训练时scale jittering $S \in [256, 512]$，测试时多尺度dense evaluation + multi-crop融合，最终单模型7.0% top-5 error
- **简洁统一的架构设计**：所有配置遵循相同模板（3×3 conv + maxpool + FC），仅通过增加层数扩展，成为后续研究的backbone标准
- **预训练初始化策略**：先训练浅层网络A，再用其权重初始化深层网络，解决深层网络训练不稳定问题

#### 🔬 深入细节

![VGGNet Architecture](https://production-media.paperswithcode.com/methods/vgg_7mT4DML.png)

**算法伪代码：VGG-16 (Configuration D) 前向传播**

```
Input: RGB image 224×224×3 (mean subtracted)

# Block 1: 2×conv3-64 + maxpool
x = Conv3×3(3→64) → ReLU → Conv3×3(64→64) → ReLU → MaxPool2×2

# Block 2: 2×conv3-128 + maxpool  
x = Conv3×3(64→128) → ReLU → Conv3×3(128→128) → ReLU → MaxPool2×2

# Block 3: 3×conv3-256 + maxpool
x = Conv3×3(128→256) → ReLU → Conv3×3(256→256) → ReLU → Conv3×3(256→256) → ReLU → MaxPool2×2

# Block 4: 3×conv3-512 + maxpool
x = Conv3×3(256→512) → ReLU → Conv3×3(512→512) → ReLU → Conv3×3(512→512) → ReLU → MaxPool2×2

# Block 5: 3×conv3-512 + maxpool
x = Conv3×3(512→512) → ReLU → Conv3×3(512→512) → ReLU → Conv3×3(512→512) → ReLU → MaxPool2×2

# Classifier
x = FC(7×7×512→4096) → ReLU → Dropout(0.5)
x = FC(4096→4096) → ReLU → Dropout(0.5)
x = FC(4096→1000) → Softmax

Output: 1000-class probability
```

**核心设计原理**

1. **3×3卷积核的等效感受野**

   两层3×3卷积的有效感受野等于一层5×5，三层3×3等于一层7×7：

$$RF = (k-1) \times L + 1 = (3-1) \times 3 + 1 = 7$$

   其中 $k=3$ 为卷积核大小，$L$ 为层数。参数量对比：

$$\text{三层3×3}: 3 \times (3^2 C^2) = 27C^2$$
$$\text{一层7×7}: 7^2 C^2 = 49C^2$$

   减少约 $\frac{49-27}{49} \approx 45\%$ 参数，同时引入3个ReLU非线性变换增强表达能力。

2. **网络配置对比**

| 配置 | 层数 | 参数量 | Top-5 Error (S=[256;512]) |
|------|------|--------|--------------------------|
| A    | 11   | 133M   | 10.4% (S=256)            |
| B    | 13   | 133M   | 9.9% (S=256)             |
| C    | 16   | 134M   | 8.8%                     |
| D (VGG-16) | 16 | 138M | **8.1%**                |
| E (VGG-19) | 19 | 144M | **8.0%**                |

3. **训练策略**

- **优化器**：SGD + Momentum 0.9，batch size 256，L2 weight decay $5 \times 10^{-4}$
- **学习率**：初始 $10^{-2}$，验证精度停滞时除以10，共衰减3次，总训练370K iterations（74 epochs）
- **Dropout**：0.5，应用于前两个FC层
- **权重初始化**：随机 $\mathcal{N}(0, 10^{-2})$，偏置初始化为0；深层网络用浅层网络A的权重预初始化
- **数据增强**：随机裁剪224×224、水平翻转、RGB颜色偏移

4. **多尺度策略**

- **训练尺度**：固定 $S=256$ 或 $S=384$，或随机 $S \in [256, 512]$（scale jittering）
- **测试尺度**：固定S时 $Q=\{S-32, S, S+32\}$；jittering时 $Q=\{256, 384, 512\}$
- **Dense evaluation**：FC层转为卷积层（$7\times7$, $1\times1$, $1\times1$），对整图应用后空间平均池化
- **Multi-crop**：150 crops（5×5网格 × 2翻转 × 3尺度）

5. **最终结果（ILSVRC-2014）**

| 方法 | Top-5 Test Error |
|------|-----------------|
| VGG 单模型 (E, dense+multi-crop) | 7.0% |
| VGG 7模型集成 (竞赛提交) | 7.3% |
| VGG 2模型集成 (D+E, 赛后) | **6.8%** |
| GoogLeNet 集成 (冠军) | 6.7% |
| GoogLeNet 单模型 | 7.9% |

#### 🧪 练习题

```yaml
- question: "VGGNet中三层3×3卷积相比一层7×7卷积的优势是什么？"
  options:
    - "感受野更大"
    - "参数更多，表达能力更强"
    - "参数减少约45%，同时引入更多非线性变换"
    - "计算速度更快但精度更低"
  answer: 2
  explain: "三层3×3卷积与一层7×7卷积具有相同的7×7感受野，但参数量从49C²减少到27C²（约减少45%），同时引入了3个ReLU非线性激活，增强了网络的判别能力。"

- question: "VGGNet训练中使用的学习率调度策略是什么？"
  options:
    - "Cosine annealing从0.1到0"
    - "初始0.01，验证精度停滞时除以10，共衰减3次"
    - "固定学习率0.001训练全程"
    - "Warmup 5个epoch后线性衰减"
  answer: 1
  explain: "VGGNet使用初始学习率10⁻²，当验证集精度不再提升时将学习率除以10，总共衰减3次，训练74个epoch（370K iterations）后停止。"

- question: "VGGNet的dense evaluation是如何实现的？"
  options:
    - "将图像裁剪为多个224×224的patch分别预测"
    - "将FC层转换为卷积层，对任意尺寸整图前向传播后空间平均池化"
    - "使用全局平均池化替代FC层"
    - "将图像resize到固定尺寸后直接预测"
  answer: 1
  explain: "Dense evaluation将三个FC层分别转换为7×7、1×1、1×1卷积层，使网络成为全卷积网络，可以接受任意尺寸输入。输出的类别得分图通过空间平均池化得到最终预测，避免了多次裁剪的重复计算。"

- question: "在VGGNet的实验中，配置D（VGG-16）相比配置C的优势说明了什么？"
  options:
    - "更多参数总是更好"
    - "1×1卷积比3×3卷积更有效"
    - "捕获空间上下文的3×3卷积比仅增加非线性的1×1卷积更重要"
    - "16层比13层的网络总是更好"
  answer: 2
  explain: "配置C和D都是16层，但C用1×1卷积替代了D中部分3×3卷积。D优于C说明：虽然1×1卷积增加了非线性（C优于B），但使用具有非平凡感受野的3×3卷积捕获空间上下文更为重要。"
```