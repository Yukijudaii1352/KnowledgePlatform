---
domain: cv
topic_id: image_classification
topic_name: 图像分类
page_icon: 🖼️
page_title: 图像分类算法演进
page_subtitle: '{build_date} 版'
page_desc: 从AlexNet开启的深度学习时代，经历ResNet残差革命、ViT注意力范式，到ConvNeXt现代CNN复兴与2026年高效状态空间模型的融合探索
hero_pills:
- CNN深化 · 注意力机制 · Transformer革命
- 架构融合 · 高效推理 · 多模态感知
count_pill: '{count} 个算法'
categories:
  cnn_classic:
    label: CNN经典时代
    color: '#3B82F6'
  attention_cnn:
    label: 注意力增强CNN
    color: '#8B5CF6'
  vit_era:
    label: Vision Transformer
    color: '#EC4899'
  modern_efficient:
    label: 现代高效架构
    color: '#10B981'
---

## 领域综述

### 待补充：阶段性领域总结
请补充一篇纵观一段时间以来的总结性文档，建议使用 `!INCLUDE_RAW path/to/article.md` 引入人工筛选后的 Markdown。

## 最新进展综述

### 待补充：最近一个月最新动向
请补充最近一个月该领域最新动向的综述文档，建议使用 `!INCLUDE_RAW path/to/article.md` 引入人工筛选后的 Markdown。

## 算法演化关系

```yaml
nodes:
- id: alexnet
  x: 100
  y: 100
  category: cnn_classic
- id: vggnet
  x: 200
  y: 100
  category: cnn_classic
- id: googlenet
  x: 200
  y: 50
  category: cnn_classic
- id: resnet
  x: 300
  y: 100
  category: cnn_classic
- id: densenet
  x: 400
  y: 120
  category: cnn_classic
- id: senet
  x: 450
  y: 150
  category: attention_cnn
- id: efficientnet
  x: 550
  y: 150
  category: attention_cnn
- id: vit
  x: 650
  y: 50
  category: vit_era
- id: deit
  x: 700
  y: 30
  category: vit_era
- id: swin_transformer
  x: 750
  y: 70
  category: vit_era
- id: convnext
  x: 800
  y: 120
  category: modern_efficient
- id: convnext_v2
  x: 850
  y: 120
  category: modern_efficient
- id: mambavision
  x: 900
  y: 60
  category: modern_efficient
- id: jumbo_token
  x: 920
  y: 40
  category: modern_efficient
- id: raptor
  x: 940
  y: 30
  category: modern_efficient
- id: vmamba
  x: 960
  y: 50
  category: modern_efficient
- id: focalnet
  x: 950
  y: 80
  category: modern_efficient
edges:
- from: alexnet
  to: vggnet
  label: 小核深层
- from: alexnet
  to: googlenet
  label: 多尺度并行
- from: vggnet
  to: resnet
  label: 残差连接
- from: resnet
  to: densenet
  label: 密集连接
- from: resnet
  to: senet
  label: 通道注意力
- from: senet
  to: efficientnet
  label: 复合缩放
- from: vit
  to: deit
  label: 知识蒸馏
- from: vit
  to: swin_transformer
  label: 窗口机制
- from: resnet
  to: convnext
  label: 现代化改造
- from: convnext
  to: convnext_v2
  label: 自监督融合
- from: swin_transformer
  to: mambavision
  label: SSM融合
- from: vit
  to: jumbo_token
  label: 巨型Token
- from: vit
  to: raptor
  label: 块递归
- from: swin_transformer
  to: vmamba
  label: 选择性扫描
- from: swin_transformer
  to: focalnet
  label: 焦点调制
milestones:
- alexnet
- resnet
- vit
```

## 核心算法

### AlexNet

```yaml
id: alexnet
num: 1
name: AlexNet
full_name: 深度卷积神经网络 (Deep Convolutional Neural Network)
year: '2012.12'
org: 多伦多大学
parent: —
paper_url: https://proceedings.neurips.cc/paper/2012/file/c399862d3b9d6b76c8436e924a68c45b-Paper.pdf
project_url: ''
category: cnn_classic
motivation: 首次应用ReLU、Dropout和GPU加速
```

#### 📝 一句话总结
AlexNet首次将深度卷积神经网络应用于大规模图像分类任务，通过ReLU激活函数、Dropout正则化、数据增强和双GPU并行训练，在ILSVRC-2012上以top-5 error 15.3%大幅超越传统方法（第二名26.2%），开启了深度学习在计算机视觉领域的统治时代。

#### 🎯 核心要点
- **ReLU激活函数**：用非饱和激活函数 \(f(x) = \max(0, x)\) 替代tanh/sigmoid，训练速度提升约6倍，解决深层网络梯度消失问题
- **双GPU并行架构**：将网络分布在两块GTX 580 GPU上，每块GPU负责一半的feature maps，仅在特定层进行跨GPU通信，实现大模型高效训练
- **局部响应归一化(LRN)**：对相邻feature map通道进行归一化，模拟生物神经元的侧抑制效应，top-1/top-5 error分别降低1.4%/1.2%
- **重叠池化(Overlapping Pooling)**：使用stride=2、size=3的池化窗口（stride < size），相比非重叠池化(stride=size=2)降低top-1/top-5 error 0.4%/0.3%
- **Dropout正则化**：在全连接层以0.5概率随机置零神经元输出，有效减少过拟合，代价是收敛时间约增加一倍
- **数据增强**：包括随机裁剪(256→224)与水平翻转、PCA颜色扰动，大幅减少过拟合
- **网络规模**：5层卷积 + 3层全连接，约6000万参数、65万神经元，在120万训练图像上训练

#### 🔬 深入细节
![AlexNet Architecture](https://production-media.paperswithcode.com/methods/Screen_Shot_2020-06-22_at_6.35.45_PM.png)
*图：AlexNet网络架构示意图，展示双GPU分割结构。上下两条路径分别对应两块GPU，仅在第3层卷积和全连接层进行跨GPU通信。*

**算法伪代码：AlexNet 前向传播**

```
Input: RGB image 227×227×3 (从256×256随机裁剪224×224，实际实现为227)

# Conv1: 96 kernels of 11×11×3, stride 4
x = Conv(3→96, k=11, s=4) → ReLU → LRN → MaxPool(3×3, s=2)
# Output: 27×27×96 (split: 48 per GPU)

# Conv2: 256 kernels of 5×5×48
x = Conv(96→256, k=5, pad=2) → ReLU → LRN → MaxPool(3×3, s=2)
# Output: 13×13×256 (split: 128 per GPU)

# Conv3: 384 kernels of 3×3×256 (cross-GPU connection)
x = Conv(256→384, k=3, pad=1) → ReLU
# Output: 13×13×384 (split: 192 per GPU)

# Conv4: 384 kernels of 3×3×192
x = Conv(384→384, k=3, pad=1) → ReLU
# Output: 13×13×384 (split: 192 per GPU)

# Conv5: 256 kernels of 3×3×192
x = Conv(384→256, k=3, pad=1) → ReLU → MaxPool(3×3, s=2)
# Output: 6×6×256 (split: 128 per GPU)

# Classifier
x = FC(6×6×256→4096) → ReLU → Dropout(0.5)
x = FC(4096→4096) → ReLU → Dropout(0.5)
x = FC(4096→1000) → Softmax

Output: 1000-class probability
```

**核心设计原理**

1. **ReLU：解决梯度消失的关键**

   传统激活函数如sigmoid \(\sigma(x) = 1/(1+e^{-x})\) 和tanh在输入绝对值较大时梯度趋近于0（饱和区），导致深层网络训练极慢。ReLU定义为：

$$f(x) = \max(0, x)$$

   其梯度在正区间恒为1，不存在饱和问题。论文实验表明，在CIFAR-10上使用ReLU的4层CNN达到25% training error的速度比等效tanh网络快约6倍。

> 💡 关键：ReLU的计算也极其简单（仅需判断正负），相比sigmoid的指数运算大幅降低计算开销。

2. **双GPU并行训练策略**

   2012年单块GPU（GTX 580, 3GB显存）无法容纳完整的AlexNet。作者将96个/256个feature maps分为两组，分别放在两块GPU上。关键设计：
   - 第3层卷积接收两块GPU的全部feature maps（跨GPU通信）
   - 其余卷积层仅在同一GPU内部连接
   - 全连接层接收所有feature maps

   这种"受限连接"设计不仅解决了显存限制，还通过交叉验证发现能降低top-1/top-5 error约1.7%/1.2%（相比每层都跨GPU通信的方案）。

3. **局部响应归一化(Local Response Normalization)**

   受生物视觉系统侧抑制启发，对第 \(i\) 个feature map在位置 \((x,y)\) 的激活值进行归一化：

$$b_{x,y}^{i} = a_{x,y}^{i} / \left( k + \alpha \sum_{j=\max(0,i-n/2)}^{\min(N-1,i+n/2)} (a_{x,y}^{j})^2 \right)^{\beta}$$

   其中 \(k=2, n=5, \alpha=10^{-4}, \beta=0.75\)（通过验证集调优）。LRN在相邻通道间产生竞争，使响应较大的神经元相对更突出。

> ⚠️ 注意：后续研究（如VGGNet）发现LRN对性能提升有限，现代网络已被Batch Normalization完全取代。

4. **重叠池化(Overlapping Pooling)**

   传统池化使用 stride = kernel_size（如2×2池化stride=2），相邻池化窗口无重叠。AlexNet使用：

$$\text{kernel\_size} = 3, \quad \text{stride} = 2$$

   窗口间有1像素重叠，实验表明这能轻微降低过拟合倾向（top-1降0.4%，top-5降0.3%）。

5. **数据增强策略**

   两种互补的数据增强方法：

   **方法一：随机裁剪与翻转**
   - 从256×256图像中随机裁剪224×224 patch及其水平镜像
   - 测试时提取4角+中心共5个patch及其翻转（10个patch），取softmax输出均值
   - 将训练集扩大2048倍

   **方法二：PCA颜色扰动**
   - 对训练集RGB像素值进行PCA
   - 对每张图像加入扰动：\([\mathbf{p}_1, \mathbf{p}_2, \mathbf{p}_3][\alpha_1 \lambda_1, \alpha_2 \lambda_2, \alpha_3 \lambda_3]^T\)
   - 其中 \(\mathbf{p}_i, \lambda_i\) 为RGB协方差矩阵的特征向量和特征值，\(\alpha_i \sim N(0, 0.1)\)
   - 捕捉自然图像的光照变化不变性，降低top-1 error超过1%

6. **Dropout正则化**

   在前两个全连接层（4096维）中，训练时以概率0.5随机将神经元输出置零：

$$h_i = \begin{cases} 0 & \text{with probability } 0.5 \\ 2 \cdot a_i & \text{otherwise} \end{cases}$$

   每次前向传播采样不同的"瘦网络"，等效于训练大量共享参数的子网络的集成。测试时使用全部神经元但权重减半（等效于几何平均）。Dropout使模型不依赖特定神经元的共适应关系，显著减少过拟合。

7. **训练细节**

   - 优化器：SGD，batch size 128，momentum 0.9，weight decay 0.0005
   - 学习率：初始0.01，当验证集error不再下降时手动除以10，共降低3次
   - 权重初始化：均值0、标准差0.01的高斯分布；偏置在Conv2/4/5和全连接层初始化为1（加速ReLU早期学习），其余为0
   - 训练时长：120万图像训练约90个epoch，在两块GTX 580上耗时5-6天

**与传统方法的对比**

| 方法 | Top-5 Error (ILSVRC-2012) | 特点 |
|------|--------------------------|------|
| AlexNet (1 CNN) | 18.2% | 单模型深度CNN |
| AlexNet (5 CNNs) | 16.4% | 5模型集成 |
| AlexNet (7 CNNs)* | 15.3% | 含预训练微调模型 |
| 第二名 (传统方法) | 26.2% | Fisher Vector + 多尺度SIFT |
| 第三名 | 26.6% | 传统特征工程 |

*竞赛提交版本使用了在ImageNet Fall 2011数据集上预训练的两个额外CNN。

> 💡 关键：AlexNet将error rate从26.2%直接降到15.3%（相对提升41.6%），这一跨越性进步彻底改变了计算机视觉的研究范式，从手工特征工程转向端到端深度学习。

#### 🧪 练习题
```yaml
question: "AlexNet中使用ReLU激活函数替代tanh的主要优势是什么？"
options:
  - "ReLU能产生稀疏激活，减少模型参数量"
  - "ReLU在正区间梯度恒为1，避免梯度饱和，大幅加速训练收敛"
  - "ReLU的输出范围有界，有助于数值稳定性"
  - "ReLU能自动实现特征归一化"
answer: 1
explain: "ReLU的核心优势在于非饱和性——正区间梯度恒为1，不像sigmoid/tanh在大输入时梯度趋近于0。论文实验表明ReLU使训练速度提升约6倍。"
```

### VGGNet

```yaml
id: vggnet
num: 2
name: VGGNet
full_name: 视觉几何组网络 (Visual Geometry Group Network)
year: '2014.09'
org: 牛津大学
parent: alexnet
paper_url: https://arxiv.org/abs/1409.1556
project_url: ''
category: cnn_classic
motivation: 证明使用连续3×3小卷积核增加深度可显著提升性能
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

### GoogLeNet

```yaml
id: googlenet
num: 3
name: GoogLeNet
full_name: Inception V1网络 (Inception V1)
year: '2014.09'
org: Google
parent: alexnet
paper_url: https://arxiv.org/abs/1409.4842
project_url: ''
category: cnn_classic
motivation: 引入Inception模块，通过多尺度卷积并行提取特征
```

#### 📝 一句话总结
GoogLeNet 提出了 Inception 模块，通过在同一层内并行执行多尺度卷积（\(1 \times 1\)、\(3 \times 3\)、\(5 \times 5\)）并利用 \(1 \times 1\) 卷积进行通道降维，在仅约 500 万参数的条件下构建了 22 层深度网络，以 6.67% 的 top-5 错误率赢得 ILSVRC 2014 分类冠军，比 AlexNet 参数量减少 12 倍的同时显著提升了精度。

#### 🎯 核心要点
- **Inception 模块**：在同一层内并行执行 \(1 \times 1\)、\(3 \times 3\)、\(5 \times 5\) 卷积和 \(3 \times 3\) 最大池化，拼接多尺度特征
- **\(1 \times 1\) 卷积降维**：在 \(3 \times 3\) 和 \(5 \times 5\) 卷积前插入 \(1 \times 1\) 卷积瓶颈层，将计算量从不可承受降至可控范围
- **22 层深度网络**：包含 9 个 Inception 模块，仅约 500 万参数、15 亿次乘加运算，远少于同期 AlexNet（6000 万参数）
- **辅助分类器**：在网络中间层（inception(4a) 和 inception(4d)）接出两个辅助分类头，训练时以 0.3 权重加入总损失，缓解梯度消失，推理时丢弃
- **全局平均池化替代全连接层**：在最终分类前使用全局平均池化（\(7 \times 7\) → \(1 \times 1\)），大幅减少参数量，借鉴 Network in Network 思想
- **多尺度测试与模型集成**：测试时使用 4 种尺度 × 3 个裁剪区域 × 6 种裁剪方式 × 2（镜像）= 144 crops，7 个模型集成达到 6.67% top-5 错误率
- **ILSVRC 2014 冠军**：分类任务第一名（top-5 error 6.67%），检测任务也获得第一名（mAP 43.9%）
- **设计哲学**：受 Hebbian 原理和多尺度处理启发，在增加网络深度和宽度的同时保持计算预算恒定

#### 🔬 深入细节
##### 模型架构总览

![Inception 模块（朴素版本）](https://ar5iv.labs.arxiv.org/html/1409.4842/assets/x3.png)
*图 (a)：Inception 模块朴素版本——在同一层内并行执行 \(1 \times 1\)、\(3 \times 3\)、\(5 \times 5\) 卷积和 \(3 \times 3\) 最大池化后拼接。*

![Inception 模块（含降维）](https://ar5iv.labs.arxiv.org/html/1409.4842/assets/x4.png)
*图 (b)：实际使用的 Inception 模块——在 \(3 \times 3\) 和 \(5 \times 5\) 卷积前插入 \(1 \times 1\) 瓶颈层降维，池化路径后也加 \(1 \times 1\) 卷积控制通道数。*

![GoogLeNet 完整网络架构](https://ar5iv.labs.arxiv.org/html/1409.4842/assets/x5.png)
*图：GoogLeNet 完整网络架构，包含 9 个 Inception 模块、2 个辅助分类器和全局平均池化分类头。*

GoogLeNet 完整架构由以下部分组成：

| 层类型 | Patch/Stride | 输出尺寸 | 参数量 |
|--------|-------------|----------|--------|
| 卷积 7×7 | 2 / 2 | 112×112×64 | 2.7K |
| 最大池化 3×3 | 2 | 56×56×64 | — |
| 卷积 3×3 | 1 (reduce 64) | 56×56×192 | 112K |
| 最大池化 3×3 | 2 | 28×28×192 | — |
| Inception(3a) | — | 28×28×256 | 159K |
| Inception(3b) | — | 28×28×480 | 380K |
| 最大池化 3×3 | 2 | 14×14×480 | — |
| Inception(4a) | — | 14×14×512 | 364K |
| Inception(4b) | — | 14×14×512 | 437K |
| Inception(4c) | — | 14×14×512 | 463K |
| Inception(4d) | — | 14×14×528 | 580K |
| Inception(4e) | — | 14×14×832 | 840K |
| 最大池化 3×3 | 2 | 7×7×832 | — |
| Inception(5a) | — | 7×7×832 | 1.07M |
| Inception(5b) | — | 7×7×1024 | 1.39M |
| 全局平均池化 7×7 | 1 | 1×1×1024 | — |
| Dropout (40%) | — | 1×1×1024 | — |
| 线性 + Softmax | — | 1×1×1000 | 1M |

> 💡 **关键**：整个网络约 500 万参数，而 AlexNet 约 6000 万参数。参数量减少 12 倍的核心原因是用全局平均池化替代了大型全连接层，以及 \(1 \times 1\) 卷积的降维设计。

##### 算法伪代码

```python
# Inception 模块伪代码
def inception_module(x, ch_1x1, ch_3x3_reduce, ch_3x3, ch_5x5_reduce, ch_5x5, ch_pool):
    """
    x: 输入特征图 (B, C_in, H, W)
    ch_1x1: 1×1 卷积输出通道数
    ch_3x3_reduce: 3×3 卷积前的 1×1 降维通道数
    ch_3x3: 3×3 卷积输出通道数
    ch_5x5_reduce: 5×5 卷积前的 1×1 降维通道数
    ch_5x5: 5×5 卷积输出通道数
    ch_pool: 池化路径后 1×1 卷积输出通道数
    """
    # 分支 1: 1×1 卷积
    branch1 = conv2d(x, 1, ch_1x1) + ReLU

    # 分支 2: 1×1 降维 → 3×3 卷积
    branch2 = conv2d(x, 1, ch_3x3_reduce) + ReLU
    branch2 = conv2d(branch2, 3, ch_3x3, padding=1) + ReLU

    # 分支 3: 1×1 降维 → 5×5 卷积
    branch3 = conv2d(x, 1, ch_5x5_reduce) + ReLU
    branch3 = conv2d(branch3, 5, ch_5x5, padding=2) + ReLU

    # 分支 4: 3×3 最大池化 → 1×1 卷积
    branch4 = max_pool2d(x, 3, stride=1, padding=1)
    branch4 = conv2d(branch4, 1, ch_pool) + ReLU

    # 拼接所有分支
    output = concat([branch1, branch2, branch3, branch4], dim=channel)
    return output  # (B, ch_1x1+ch_3x3+ch_5x5+ch_pool, H, W)


# GoogLeNet 完整前向传播
def googlenet_forward(image):
    # 前端: 常规卷积 + 池化
    x = ReLU(conv2d(image, 7, 64, stride=2, pad=3))     # 112×112×64
    x = max_pool(x, 3, stride=2)                          # 56×56×64
    x = ReLU(conv2d(x, 1, 64))                            # 56×56×64 (1×1 reduce)
    x = ReLU(conv2d(x, 3, 192, pad=1))                    # 56×56×192
    x = max_pool(x, 3, stride=2)                           # 28×28×192

    # Inception 模块堆叠
    x = inception_3a(x)  # 28×28×256
    x = inception_3b(x)  # 28×28×480
    x = max_pool(x, 3, stride=2)  # 14×14×480

    x = inception_4a(x)  # 14×14×512
    aux1 = auxiliary_classifier(x)  # 辅助分类器 1
    x = inception_4b(x)  # 14×14×512
    x = inception_4c(x)  # 14×14×512
    x = inception_4d(x)  # 14×14×528
    aux2 = auxiliary_classifier(x)  # 辅助分类器 2
    x = inception_4e(x)  # 14×14×832
    x = max_pool(x, 3, stride=2)  # 7×7×832

    x = inception_5a(x)  # 7×7×832
    x = inception_5b(x)  # 7×7×1024

    # 分类头
    x = global_avg_pool(x)   # 1×1×1024
    x = dropout(x, 0.4)
    logits = linear(x, 1000)
    return logits, aux1, aux2
```

##### 动机与背景

在 GoogLeNet 提出之前，提升深度神经网络性能的最直接方式是增加网络的**深度**（层数）和**宽度**（每层通道数）。然而，这种暴力扩展面临两个根本性问题：

1. **参数爆炸与过拟合**：更大的网络意味着更多参数，在标注数据有限的情况下极易过拟合。ILSVRC 数据集虽有 120 万训练图像，但对于拥有数千万参数的网络而言仍显不足。
2. **计算资源瓶颈**：均匀增加卷积核数量会导致计算量平方级增长。例如，两个连续卷积层的通道数同时翻倍，计算量将增加 4 倍。

GoogLeNet 的核心思路是：**将密集的全连接结构替换为稀疏的局部连接结构**，同时利用现有硬件对密集矩阵运算的高效支持。这一思想源自 Arora 等人的理论工作——如果数据集的概率分布可以被一个大型稀疏深度网络表示，那么最优网络拓扑可以通过逐层分析上一层激活值的相关统计量来构建。

> 💡 **关键直觉**：在视觉网络中，同一区域的特征可能需要在不同尺度上被捕获——有些特征是局部的（小卷积核），有些是更大范围的（大卷积核）。Inception 模块通过并行多尺度卷积，让网络自动学习在每个位置使用哪种尺度的特征。

##### 核心机制详解

**1. Inception 模块 — 多尺度特征并行提取**

Inception 模块的朴素版本在同一层内并行执行四种操作：

$$
\text{Output} = \text{Concat}\left[\text{Conv}_{1\times1}(x),\ \text{Conv}_{3\times3}(x),\ \text{Conv}_{5\times5}(x),\ \text{MaxPool}_{3\times3}(x)\right]
$$

这种设计的理论依据是：对于图像中的某个局部区域，其最优特征表示可能存在于不同的感受野尺度上。\(1 \times 1\) 卷积捕获点级特征（通道间相关性），\(3 \times 3\) 捕获小范围空间特征，\(5 \times 5\) 捕获更大范围的空间特征，而最大池化则提供了一种非线性的下采样路径。

然而，朴素版本存在严重的**计算瓶颈**：当输入通道数较大时，\(5 \times 5\) 卷积的计算量极其庞大。例如，对于 \(28 \times 28 \times 192\) 的输入，直接使用 32 个 \(5 \times 5\) 卷积核需要约 1.2 亿次乘法运算。

**2. \(1 \times 1\) 卷积降维 — 计算效率的关键**

解决方案是在昂贵的卷积操作前插入 \(1 \times 1\) 卷积作为瓶颈层：

$$
\text{Branch}_{3\times3} = \text{Conv}_{3\times3}\left(\text{ReLU}\left(\text{Conv}_{1\times1}^{\text{reduce}}(x)\right)\right)
$$

$$
\text{Branch}_{5\times5} = \text{Conv}_{5\times5}\left(\text{ReLU}\left(\text{Conv}_{1\times1}^{\text{reduce}}(x)\right)\right)
$$

以 Inception(3a) 为例，输入为 \(28 \times 28 \times 192\)：
- \(5 \times 5\) 分支：先用 16 个 \(1 \times 1\) 卷积将通道从 192 降至 16，再用 32 个 \(5 \times 5\) 卷积。计算量从 1.2 亿降至约 1200 万次乘法，**减少约 10 倍**。
- \(3 \times 3\) 分支：先用 96 个 \(1 \times 1\) 卷积将通道从 192 降至 96，再用 128 个 \(3 \times 3\) 卷积。

> ⚠️ **注意**：\(1 \times 1\) 卷积不仅仅是降维工具，它后面跟随 ReLU 激活函数，因此也引入了额外的非线性变换能力，这一思想直接来源于 Lin 等人的 Network in Network。

**3. 辅助分类器 — 对抗梯度消失**

22 层的深度网络在 2014 年面临严重的梯度消失问题。GoogLeNet 在网络中间位置引入了两个辅助分类器，其结构为：

1. \(5 \times 5\) 平均池化（stride 3）→ \(4 \times 4 \times 512/528\) 特征图
2. \(1 \times 1 \times 128\) 卷积 + ReLU
3. 全连接层（1024 个节点）+ ReLU + Dropout(70%)
4. 全连接层（1000 个节点）+ Softmax

训练时的总损失函数为：

$$
\mathcal{L}_{\text{total}} = \mathcal{L}_{\text{main}} + 0.3 \times \mathcal{L}_{\text{aux1}} + 0.3 \times \mathcal{L}_{\text{aux2}}
$$

辅助分类器的作用是在网络中间层注入额外的梯度信号，帮助浅层参数获得有效的梯度更新。在推理阶段，辅助分类器被完全丢弃。

> 💡 **关键**：后续研究（Inception V3 论文）发现辅助分类器的主要作用更像是**正则化器**而非梯度辅助工具，因为移除辅助分类器对最终精度的影响很小，但它们确实加速了训练初期的收敛。

**4. 全局平均池化 — 参数量的决定性削减**

在 GoogLeNet 之前，AlexNet 和 VGGNet 在最后的卷积层之后使用多个大型全连接层（如 4096-4096-1000），这些全连接层占据了绝大部分参数。GoogLeNet 采用了 Network in Network 提出的全局平均池化策略：

$$
\text{GAP}(x)_c = \frac{1}{H \times W} \sum_{i=1}^{H} \sum_{j=1}^{W} x_{c,i,j}
$$

将 \(7 \times 7 \times 1024\) 的特征图直接压缩为 \(1 \times 1 \times 1024\) 的向量，然后仅通过一个线性层映射到 1000 类。这使得分类头的参数量从数千万降至约 100 万。

##### 训练与推理策略

**训练配置**：
- **优化器**：异步随机梯度下降（Async SGD），动量 0.9
- **学习率**：固定衰减策略，每 8 个 epoch 降低 4%
- **推理模型**：使用 Polyak 平均生成最终推理模型
- **数据增强**：随机裁剪图像面积的 8%~100%，宽高比在 \(3/4\) 到 \(4/3\) 之间随机选择；Andrew Howard 的光度失真；随机插值方法（双线性、面积、最近邻、三次，等概率）

**测试策略**：
- 将图像缩放到 4 种尺度（短边分别为 256、288、320、352）
- 每种尺度取左、中、右（或上、中、下）3 个正方形区域
- 每个区域取 4 角 + 中心共 5 个 \(224 \times 224\) 裁剪 + 1 个缩放裁剪
- 每个裁剪取镜像
- 总计 \(4 \times 3 \times 6 \times 2 = 144\) 个裁剪
- 7 个模型集成，对所有裁剪的 softmax 概率取平均

##### 与传统方法的对比

| 方面 | AlexNet (2012) | VGGNet (2014) | **GoogLeNet (2014)** |
|------|---------------|---------------|---------------------|
| 深度 | 8 层 | 16/19 层 | **22 层** |
| 参数量 | ~60M | ~138M | **~5M** |
| 计算量 | ~0.7B MACs | ~15.5B MACs | **~1.5B MACs** |
| Top-5 错误率 | 16.4% | 7.3% | **6.67%** |
| 核心思想 | ReLU + Dropout + GPU | 小卷积核堆叠 | **多尺度并行 + 降维** |
| 全连接层 | 3 个大型 FC | 3 个大型 FC | **全局平均池化** |

> 💡 **关键**：GoogLeNet 用 AlexNet 1/12 的参数量和 VGGNet 1/10 的计算量，取得了更好的分类精度。这证明了精心设计的网络拓扑比简单增加网络规模更加有效。

##### 实验结果

在 ILSVRC 2014 分类任务中：

| 模型配置 | Top-5 错误率 |
|----------|-------------|
| 单模型，单裁剪 | 10.07% |
| 单模型，多裁剪 | ~9% |
| 7 模型集成，144 裁剪 | **6.67%** |
| 第二名 (VGGNet) | 7.3% |
| 上一年冠军 (Clarifai) | 11.7% |

GoogLeNet 同时在检测任务中以 43.9% mAP 获得第一名，采用了多区域方法与 CNN 分类器的组合，而非传统的 R-CNN 方法。

#### 🧪 练习题
```yaml
question: "GoogLeNet 的 Inception 模块中，在 3×3 和 5×5 卷积前使用 1×1 卷积的主要目的是什么？"
options:
  - "增加网络的非线性表达能力"
  - "减少输入通道数以降低后续卷积的计算量"
  - "实现跨通道的特征融合以替代全连接层"
  - "对输入特征图进行空间下采样"
answer: 1
explain: "1×1 卷积作为瓶颈层，将输入通道数从较大值（如 192）降至较小值（如 16 或 96），使得后续昂贵的 3×3/5×5 卷积的计算量减少约 10 倍。虽然 1×1 卷积也引入了非线性（选项 A），但其在 Inception 模块中的主要设计目的是降维以控制计算成本。"
```

### ResNet

```yaml
id: resnet
num: 4
name: ResNet
full_name: 深度残差网络 (Deep Residual Network)
year: '2015.12'
org: 微软亚洲研究院
parent: vggnet
paper_url: https://arxiv.org/abs/1512.03385
project_url: ''
category: cnn_classic
motivation: 提出残差连接解决深层网络退化问题
```

#### 📝 一句话总结
ResNet 通过引入恒等快捷连接(identity shortcut connection)，让网络学习残差映射 \(\mathcal{F}(\mathbf{x}) = \mathcal{H}(\mathbf{x}) - \mathbf{x}\) 而非直接映射，从根本上解决了深层网络的退化(degradation)问题，使训练152层甚至1000+层网络成为可能，以3.57% top-5错误率赢得ILSVRC 2015冠军。

#### 🎯 核心要点
- 发现并定义**退化问题(Degradation Problem)**：深层plain网络的训练误差反而高于浅层网络，这不是过拟合而是优化困难
- 提出**残差学习框架**：通过shortcut connection让网络学习残差函数 \(\mathcal{F}(\mathbf{x}) + \mathbf{x}\)，极大降低优化难度
- 设计**Bottleneck结构**：1×1-3×3-1×1卷积组合，ResNet-152(11.3B FLOPs)比VGG-16(15.3B FLOPs)更深但计算量更低
- 三种shortcut方案对比：Option A(零填充)、B(投影shortcut用于维度变化)、C(全投影)，证明identity shortcut即可解决退化
- 提供5种深度变体：ResNet-18/34(BasicBlock)、ResNet-50/101/152(Bottleneck)
- ImageNet集成3.57% top-5错误率；单模型ResNet-152达4.49% top-5；COCO检测28%相对提升

#### 🔬 深入细节
##### 核心架构示意图

![ResNet残差学习基本单元](https://ar5iv.labs.arxiv.org/html/1512.03385/assets/x2.png)
*图：残差学习Building Block。输入 x 通过shortcut直接加到输出上，网络只需学习残差 F(x)*

![ResNet网络架构对比](https://ar5iv.labs.arxiv.org/html/1512.03385/assets/x3.png)
*图：VGG-19(左)、34层Plain网络(中)、34层ResNet(右)的架构对比。虚线shortcut表示维度变化处使用投影*

![BasicBlock与Bottleneck对比](https://ar5iv.labs.arxiv.org/html/1512.03385/assets/x5.png)
*图：左为ResNet-34使用的BasicBlock(两层3×3)，右为ResNet-50/101/152使用的Bottleneck(1×1降维→3×3→1×1升维)*

##### 算法伪代码

```python
# ResNet 前向传播核心逻辑

class BasicBlock:
    """ResNet-18/34 使用的基本残差块"""
    def forward(self, x):
        identity = x
        # 主路径: 两层3×3卷积
        out = relu(bn(conv3x3(x)))      # 第一层
        out = bn(conv3x3(out))           # 第二层(激活前)
        # 维度不匹配时使用1×1投影
        if need_downsample:
            identity = bn(conv1x1_stride2(x))
        # 残差连接 + 激活
        out = relu(out + identity)
        return out

class Bottleneck:
    """ResNet-50/101/152 使用的瓶颈残差块"""
    def forward(self, x):
        identity = x
        # 主路径: 1×1降维 → 3×3卷积 → 1×1升维
        out = relu(bn(conv1x1(x)))       # 降维(256→64)
        out = relu(bn(conv3x3(out)))     # 空间卷积
        out = bn(conv1x1(out))           # 升维(64→256)
        # 维度不匹配时使用1×1投影
        if need_downsample:
            identity = bn(conv1x1_stride2(x))
        # 残差连接 + 激活
        out = relu(out + identity)
        return out

class ResNet:
    """整体网络结构"""
    def forward(self, x):
        # Stage 0: 初始卷积
        x = relu(bn(conv7x7_stride2(x)))  # 224→112
        x = maxpool3x3_stride2(x)          # 112→56
        # Stage 1-4: 残差块堆叠
        x = layer1(x)  # 56×56,  64通道(BasicBlock) / 256通道(Bottleneck)
        x = layer2(x)  # 28×28, 128通道 / 512通道
        x = layer3(x)  # 14×14, 256通道 / 1024通道
        x = layer4(x)  #  7×7,  512通道 / 2048通道
        # 分类头
        x = global_avg_pool(x)  # 7×7→1×1
        x = fc_1000(x)
        return softmax(x)
```

##### 动机与背景

深度学习的核心假设是"更深的网络能学到更好的表示"。VGGNet证明了16-19层网络的有效性，但当研究者尝试进一步加深网络时，遇到了一个反直觉的现象：**56层的plain网络在训练集上的误差竟然高于20层网络**。

这不是过拟合（过拟合应该是训练误差低但测试误差高），而是一个纯粹的优化问题。理论上，深层网络至少可以通过让额外层学习恒等映射来达到与浅层网络相同的性能，但实际的SGD优化器无法找到这样的解。

> 💡 关键洞察：退化问题的本质是——对于标准网络，学习恒等映射（什么都不做）反而是困难的，因为非线性层的堆叠天然倾向于将信号变换为非恒等的形式。

##### 核心机制：残差学习

ResNet的核心思想极为简洁：与其让网络直接学习目标映射 \(\mathcal{H}(\mathbf{x})\)，不如让网络学习**残差** \(\mathcal{F}(\mathbf{x}) := \mathcal{H}(\mathbf{x}) - \mathbf{x}\)。

最终输出通过加法重构：

$$\mathbf{y} = \mathcal{F}(\mathbf{x}, \{W_i\}) + \mathbf{x}$$

**为什么这样设计有效？**

1. **优化简化**：如果最优映射接近恒等，网络只需将 \(\mathcal{F}\) 推向零（所有权重趋近零即可），而不需要通过非线性层拟合恒等函数
2. **梯度高速公路**：反向传播时，梯度可以通过shortcut无衰减地直接传回浅层：\(\frac{\partial \mathbf{y}}{\partial \mathbf{x}} = \frac{\partial \mathcal{F}}{\partial \mathbf{x}} + \mathbf{I}\)，恒等项 \(\mathbf{I}\) 保证梯度不会消失
3. **信息保持**：输入信息通过shortcut无损传递，避免在多层变换中丢失

当输入输出维度不匹配时（通道数翻倍、空间尺寸减半），使用线性投影：

$$\mathbf{y} = \mathcal{F}(\mathbf{x}, \{W_i\}) + W_s\mathbf{x}$$

其中 \(W_s\) 为1×1卷积（stride=2实现下采样）。

##### 架构设计细节

**整体设计哲学**（继承自VGGNet）：
- 对于相同输出特征图尺寸的层，使用相同数量的滤波器
- 特征图尺寸减半时，滤波器数量翻倍（保持每层计算复杂度相近）
- 下采样通过stride=2的卷积实现

**各变体配置**：

| 模型 | Block类型 | 各Stage块数 | 参数量 | FLOPs |
|------|-----------|-------------|--------|-------|
| ResNet-18 | BasicBlock | [2, 2, 2, 2] | 11.7M | 1.8B |
| ResNet-34 | BasicBlock | [3, 4, 6, 3] | 21.8M | 3.6B |
| ResNet-50 | Bottleneck | [3, 4, 6, 3] | 25.6M | 3.8B |
| ResNet-101 | Bottleneck | [3, 4, 23, 3] | 44.5M | 7.6B |
| ResNet-152 | Bottleneck | [3, 8, 36, 3] | 60.2M | 11.3B |

> ⚠️ 注意：ResNet-50与ResNet-34的Block数配置相同[3,4,6,3]，但因使用Bottleneck(3层/block)替代BasicBlock(2层/block)，总层数从34增至50。Bottleneck的1×1卷积先将通道降为1/4再升回，使得3×3卷积的计算量大幅减少。

**训练配置**：
- SGD, momentum=0.9, weight decay=0.0001
- Batch size=256, 初始lr=0.1, 误差平台时÷10
- 60×10⁴ 迭代，不使用Dropout
- He初始化，BN在每个conv后、ReLU前
- 数据增强：随机裁剪224×224 + 水平翻转 + PCA颜色增强

##### 与传统方法的区别

| 对比维度 | Plain深层网络 | Highway Networks | ResNet |
|----------|--------------|-----------------|--------|
| 深度扩展 | 退化，无法有效训练 | 门控机制，可训练深层 | identity shortcut，简洁高效 |
| 额外参数 | 无 | 门控参数（参数量翻倍） | 无（identity）或极少（投影） |
| shortcut类型 | 无 | 门控：\(T \cdot H + (1-T) \cdot x\) | 恒等：\(F + x\) |
| 信息流 | 逐层衰减 | 门控调节 | 无损直通 |
| 实际深度 | ≤30层有效 | ~100层 | 152层(ImageNet), 1202层(CIFAR) |

##### 实验验证

**退化问题验证**（ImageNet, 10-crop）：

| 网络 | plain-18 | plain-34 | ResNet-18 | ResNet-34 |
|------|----------|----------|-----------|-----------|
| Top-1 Error | 27.94% | 28.54%↑ | 27.88% | 25.03%↓ |

Plain网络加深后性能下降，ResNet加深后性能显著提升——退化问题被解决。

**深度收益**（单模型，多尺度测试）：

| 模型 | Top-1 Error | Top-5 Error |
|------|-------------|-------------|
| ResNet-34 C | 21.53% | 5.60% |
| ResNet-50 | 20.74% | 5.25% |
| ResNet-101 | 19.87% | 4.60% |
| ResNet-152 | **19.38%** | **4.49%** |

**集成结果**：6模型集成在ImageNet测试集达到**3.57%** top-5错误率，赢得ILSVRC 2015分类冠军。

#### 🧪 练习题
```yaml
question: "ResNet中退化问题(degradation problem)的本质是什么？"
options:
  - "深层网络发生了严重的过拟合"
  - "梯度消失导致深层网络无法收敛"
  - "优化器难以在深层网络中找到不差于浅层网络的解"
  - "深层网络的参数量过大导致内存不足"
answer: 2
explain: "退化问题表现为深层网络的训练误差(非测试误差)高于浅层网络，排除了过拟合；BN已解决梯度消失；本质是SGD优化器在高维损失面中搜索困难，无法找到理论上存在的恒等映射解。"
```

### DenseNet

```yaml
id: densenet
num: 5
name: DenseNet
full_name: 密集连接卷积网络 (Densely Connected Convolutional Network)
year: '2017.07'
org: 康奈尔大学
parent: resnet
paper_url: https://arxiv.org/abs/1608.06993
project_url: ''
category: cnn_classic
motivation: 通过特征拼接实现每层与之前所有层的密集连接
```

#### 📝 一句话总结
DenseNet 提出了密集连接机制，将每一层与所有前序层通过特征拼接（concatenation）直接相连，实现了最大化的特征复用和信息流通，在显著减少参数量的同时超越了 ResNet 等架构的分类性能。

#### 🎯 核心要点
- **密集连接（Dense Connectivity）**：每层接收所有前序层的特征图作为输入，网络中共有 \(L(L+1)/2\) 条连接（L 为层数）
- **增长率（Growth Rate, k）**：每层仅产生 k 个新特征图，k 可以很小（如 12），网络通过累积实现丰富表示
- **特征拼接而非相加**：与 ResNet 的逐元素加法不同，DenseNet 使用 channel 维度的 concatenation 保留所有前序特征
- **Bottleneck 层（DenseNet-B）**：引入 1×1 卷积将输入压缩到 4k 个通道，再接 3×3 卷积输出 k 个通道
- **Transition 层与压缩（DenseNet-C）**：在 Dense Block 之间使用 1×1 卷积 + 2×2 平均池化进行下采样，压缩因子 θ=0.5
- **隐式深度监督**：短连接使损失信号可直接传播到浅层，天然缓解梯度消失
- **参数高效**：DenseNet-BC（L=100, k=12）仅用 0.8M 参数即可匹敌 1001 层 ResNet（10.2M 参数）的性能

#### 🔬 深入细节
##### 核心架构示意图

![DenseNet 5层Dense Block示意图](https://ar5iv.labs.arxiv.org/html/1608.06993/assets/x1.png)
*图1：一个 5 层的 Dense Block（growth rate k=4）。每层以所有前序层的特征图拼接作为输入。*

![DenseNet 整体架构](https://ar5iv.labs.arxiv.org/html/1608.06993/assets/x2.png)
*图2：包含 3 个 Dense Block 的 DenseNet 架构。相邻 Block 之间的 Transition 层负责下采样和通道压缩。*

##### 算法伪代码

```python
# DenseNet Forward Pass (单个 Dense Block)
def dense_block_forward(x0, layers, growth_rate_k):
    """
    x0: 初始输入特征图
    layers: Dense Block 中的层数 L
    """
    features = [x0]
    for l in range(layers):
        # 拼接所有前序层的输出
        input_l = concatenate(features, dim='channel')  # [x0, x1, ..., x_{l-1}]
        # Bottleneck: BN -> ReLU -> 1x1 Conv (输出 4k 通道)
        out = batch_norm(input_l)
        out = relu(out)
        out = conv1x1(out, filters=4 * growth_rate_k)
        # 主卷积: BN -> ReLU -> 3x3 Conv (输出 k 通道)
        out = batch_norm(out)
        out = relu(out)
        out = conv3x3(out, filters=growth_rate_k)
        features.append(out)
    return concatenate(features, dim='channel')

# Transition Layer
def transition_layer(x, compression_theta=0.5):
    m = x.channels
    x = batch_norm(x)
    x = conv1x1(x, filters=int(m * compression_theta))
    x = avg_pool_2x2(x)
    return x
```

##### 动机与背景

随着深度网络层数增加，输入信息和梯度在逐层传播过程中可能逐渐"消失"。ResNet 通过跳跃连接（shortcut）缓解了这一问题，但其采用的**逐元素相加**方式可能阻碍网络中的信息流动——因为恒等映射和非线性变换的输出被混合在一起，后续层无法区分二者。

DenseNet 的核心洞察是：**确保网络中各层之间的最大信息流通**。为此，每一层都直接连接到所有后续层，形成密集连接模式。

##### 核心机制详解

**1. 密集连接公式**

传统前馈网络第 \(l\) 层的输出为：

$$x_l = H_l(x_{l-1})$$

ResNet 引入跳跃连接：

$$x_l = H_l(x_{l-1}) + x_{l-1}$$

DenseNet 将所有前序层的输出拼接后作为输入：

$$x_l = H_l([x_0, x_1, \ldots, x_{l-1}])$$

其中 \([x_0, x_1, \ldots, x_{l-1}]\) 表示第 0 到 \(l-1\) 层输出特征图在 channel 维度的拼接。

> 💡 关键：拼接（concatenation）而非相加（addition）是 DenseNet 的本质区别。拼接保留了每一层的原始特征，使后续层可以选择性地复用任意前序层的信息。

**2. 增长率（Growth Rate）**

每个 \(H_l\) 产生 \(k\) 个特征图，则第 \(l\) 层的输入通道数为：

$$k_0 + k \times (l - 1)$$

其中 \(k_0\) 是初始输入通道数。虽然 DenseNet 层数很深，但 \(k\) 可以很小（如 k=12），因为每层可以访问所有前序特征（"集体知识"），无需在单层中重复学习冗余特征。

> 💡 关键：增长率 k 可理解为每层对网络"全局状态"的新增贡献量。小 k 即可实现高性能，这是 DenseNet 参数高效的根本原因。

**3. Bottleneck 层（DenseNet-B）**

随着层数增加，拼接后的输入通道数线性增长。为控制计算量，在 3×3 卷积前引入 1×1 卷积进行降维：

$$H_l = \text{BN} \to \text{ReLU} \to \text{Conv}(1\times1, 4k) \to \text{BN} \to \text{ReLU} \to \text{Conv}(3\times3, k)$$

1×1 卷积将输入压缩到 4k 个通道，有效减少了 3×3 卷积的计算开销。

**4. Transition 层与压缩（DenseNet-C）**

Dense Block 之间的 Transition 层负责：
- 通过 1×1 卷积进行通道压缩（压缩因子 \(\theta \in (0, 1]\)，论文取 \(\theta = 0.5\)）
- 通过 2×2 平均池化进行空间下采样

当同时使用 Bottleneck 和 Compression 时，称为 **DenseNet-BC**。

**5. 特征复用分析**

论文通过可视化各层对前序层特征的平均绝对权重，验证了密集连接确实实现了特征复用：
- 浅层特征被深层广泛使用（而非仅被相邻层使用）
- Transition 层之后的第一层对前一个 Dense Block 的所有层都有较高权重
- 最终分类层也会利用浅层特征，说明低级特征对最终决策有直接贡献

![特征复用热力图](https://ar5iv.labs.arxiv.org/html/1608.06993/assets/x7.png)
*图5：训练后的 DenseNet 各层卷积权重的平均绝对值热力图，颜色越深表示对该前序层特征的依赖越强。*

##### 训练细节

| 配置项 | CIFAR/SVHN | ImageNet |
|--------|-----------|----------|
| 优化器 | SGD (Nesterov momentum=0.9) | SGD (Nesterov momentum=0.9) |
| Batch size | 64 | 256 |
| 初始学习率 | 0.1 | 0.1 |
| 学习率衰减 | 在 50%、75% epoch 时 ÷10 | 在 epoch 30、60 时 ÷10 |
| 总 epoch | 300 (CIFAR) / 40 (SVHN) | 90 |
| Weight decay | \(10^{-4}\) | \(10^{-4}\) |
| Dropout | 0.2（无数据增强时） | — |

##### ImageNet 架构配置

| 模型 | 层数 | Dense Block 配置 (6,12,24,16) | 参数量 |
|------|------|-------------------------------|--------|
| DenseNet-121 | 121 | 6, 12, 24, 16 | 8.0M |
| DenseNet-169 | 169 | 6, 12, 32, 32 | 14.1M |
| DenseNet-201 | 201 | 6, 12, 48, 32 | 20.0M |
| DenseNet-264 | 264 | 6, 12, 64, 48 | 33.3M |

所有 ImageNet 模型使用 k=32，初始卷积为 7×7 stride 2 + 3×3 max pool。

##### 与 ResNet 的核心区别

| 对比维度 | ResNet | DenseNet |
|----------|--------|----------|
| 连接方式 | 跳跃连接（加法） | 密集连接（拼接） |
| 信息流 | 仅相邻层间 | 任意层到所有后续层 |
| 特征复用 | 隐式（通过恒等映射） | 显式（拼接保留原始特征） |
| 参数效率 | 较低（每层需学习完整表示） | 较高（每层仅贡献 k 个新特征） |
| 梯度传播 | 通过跳跃连接 | 直接到任意浅层 |

##### 实验结果亮点

![参数效率对比](https://ar5iv.labs.arxiv.org/html/1608.06993/assets/x3.png)
*图3：ImageNet 上 DenseNet 与 ResNet 的 top-1 错误率对比（参数量 vs 性能）。DenseNet 在相同参数量下始终优于 ResNet。*

- **CIFAR-10+**：DenseNet-BC (L=190, k=40) 达到 **3.46%** 错误率，显著优于 Wide ResNet 的 4.17%
- **CIFAR-100+**：**17.18%** 错误率，优于 Wide ResNet 的 20.50%
- **ImageNet**：DenseNet-264 达到 top-1 **20.80%** / top-5 **5.29%**（10-crop）
- **参数效率**：DenseNet-BC (L=100, k=12) 仅 0.8M 参数，性能匹敌 10.2M 参数的 1001 层 ResNet

> ⚠️ 注意：DenseNet 的朴素实现存在显存效率问题（中间拼接结果需要额外内存），论文作者后续发布了内存高效实现方案。

#### 🧪 练习题
```yaml
question: "DenseNet 中第 l 层的输入是什么？"
options:
  - "仅第 l-1 层的输出特征图"
  - "第 l-1 层输出与原始输入的逐元素相加"
  - "第 0 到第 l-1 层所有输出特征图在 channel 维度的拼接"
  - "第 0 到第 l-1 层所有输出特征图的逐元素平均"
answer: 2
explain: "DenseNet 的核心设计是将所有前序层的输出在 channel 维度拼接后作为当前层输入，即 x_l = H_l([x_0, x_1, ..., x_{l-1}])，这与 ResNet 的加法跳跃连接有本质区别。"
```

### SENet

```yaml
id: senet
num: 6
name: SENet
full_name: 挤压和激励网络 (Squeeze-and-Excitation Network)
year: '2018.06'
org: Momenta
parent: resnet
paper_url: https://arxiv.org/abs/1709.01507
project_url: ''
category: attention_cnn
motivation: 引入通道注意力机制，显式建模通道间依赖关系
```

#### 📝 一句话总结
SENet 提出了 Squeeze-and-Excitation (SE) 模块，通过全局平均池化压缩空间信息并利用两层全连接网络学习通道注意力权重，以即插即用的方式嵌入任意 CNN 架构中，以不到 10% 的额外参数换取显著的精度提升，获得 ILSVRC 2017 图像分类冠军（top-5 错误率 2.251%）。

#### 🎯 核心要点
- **SE Block 三步操作**：Squeeze（全局平均池化）→ Excitation（FC-ReLU-FC-Sigmoid 瓶颈结构）→ Scale（通道级乘法重标定）
- **即插即用设计**：可无缝嵌入 ResNet、ResNeXt、Inception、VGG、MobileNet 等任意现有架构
- **极低计算开销**：以 ResNet-50 为例，参数仅增加约 10%（25.6M → 28.1M），GFLOPs 几乎不变（3.86 → 3.87）
- **瓶颈降维比 \(r\)**：默认 \(r=16\)，在精度与复杂度之间取得最佳平衡
- **通道注意力机制先驱**：首次系统性地在深度网络中引入轻量级通道注意力，启发了后续 CBAM、ECA-Net 等大量工作
- **ILSVRC 2017 冠军**：集成模型在测试集上达到 2.251% top-5 错误率，较 2016 年冠军相对降低约 25%

#### 🔬 深入细节
##### 核心架构示意图

![SE Block 结构示意图](https://ar5iv.labs.arxiv.org/html/1709.01507v4/assets/x1.png)

*图 1：SE Block 的结构。对卷积变换 \(F_{tr}\) 的输出特征 \(U\) 依次执行 Squeeze、Excitation 和 Scale 操作，实现通道级特征重标定。*

![SE-ResNet 模块示意图](https://ar5iv.labs.arxiv.org/html/1709.01507v4/assets/x3.png)

*图 2：SE Block 嵌入 ResNet 残差模块（左）和 Inception 模块（右）的示意。SE Block 作用于残差分支输出，在与 shortcut 相加之前进行通道重标定。*

##### 算法伪代码

```python
# SE Block 伪代码
import torch
import torch.nn as nn

class SEBlock(nn.Module):
    def __init__(self, channels, reduction=16):
        super().__init__()
        mid = channels // reduction
        self.squeeze = nn.AdaptiveAvgPool2d(1)          # Squeeze: H×W → 1×1
        self.excitation = nn.Sequential(
            nn.Linear(channels, mid, bias=False),        # W1: C → C/r
            nn.ReLU(inplace=True),
            nn.Linear(mid, channels, bias=False),        # W2: C/r → C
            nn.Sigmoid()                                  # 归一化到 [0,1]
        )

    def forward(self, x):
        b, c, _, _ = x.size()
        # Squeeze: 全局平均池化
        z = self.squeeze(x).view(b, c)                   # (B, C)
        # Excitation: 学习通道权重
        s = self.excitation(z).view(b, c, 1, 1)          # (B, C, 1, 1)
        # Scale: 通道级重标定
        return x * s.expand_as(x)                         # (B, C, H, W)
```

##### 动机与背景

卷积神经网络的核心操作——卷积——在每一层中融合空间和通道信息以构建特征表示。大量先前工作（如 Inception 系列、ResNeXt）致力于增强**空间维度**的特征提取能力，但对**通道维度**的建模相对薄弱。传统卷积核对所有通道一视同仁地处理，无法根据输入内容动态调整各通道的重要性。

> 💡 **关键直觉**：不同通道对应不同的特征模式（如边缘、纹理、语义部件），它们的重要性因输入而异。SE Block 让网络学会"看哪些通道更重要"，并据此放大有用通道、抑制无用通道。

##### 核心机制详解

**1. Squeeze：全局信息嵌入**

卷积操作的感受野是局部的，底层特征难以利用全局上下文。Squeeze 操作通过全局平均池化（GAP）将每个通道的空间特征图 \(u_c \in \mathbb{R}^{H \times W}\) 压缩为一个标量，生成通道描述符 \(z \in \mathbb{R}^C\)：

$$z_c = F_{sq}(u_c) = \frac{1}{H \times W} \sum_{i=1}^{H} \sum_{j=1}^{W} u_c(i, j)$$

这一步将全局空间信息编码到通道描述符中，为后续的通道间关系建模提供全局视野。

**2. Excitation：自适应通道权重学习**

为了充分利用 Squeeze 阶段聚合的信息，Excitation 操作需要满足两个条件：（1）能够学习通道间的非线性交互；（2）能够输出非互斥的多通道权重（不同于 one-hot 的 softmax）。因此采用带瓶颈的两层全连接结构：

$$s = F_{ex}(z, W) = \sigma(W_2 \cdot \delta(W_1 \cdot z))$$

其中 \(W_1 \in \mathbb{R}^{\frac{C}{r} \times C}\)、\(W_2 \in \mathbb{R}^{C \times \frac{C}{r}}\)，\(\delta\) 为 ReLU，\(\sigma\) 为 Sigmoid。

> ⚠️ **瓶颈设计的意义**：降维比 \(r\) 控制模型复杂度。先通过 \(W_1\) 将 \(C\) 维降至 \(C/r\) 维（信息压缩），再通过 \(W_2\) 恢复至 \(C\) 维（信息恢复）。这不仅限制了参数量，还起到了正则化作用，有助于泛化。实验表明 \(r=16\) 在精度与效率间取得最佳平衡。

**3. Scale：特征重标定**

最终，将学到的通道权重 \(s_c \in [0, 1]\) 与原始特征图逐通道相乘：

$$\tilde{x}_c = F_{scale}(u_c, s_c) = s_c \cdot u_c$$

这一操作本质上是一种**通道级的注意力机制**——权重接近 1 的通道被保留，接近 0 的通道被抑制。

##### 与现有架构的集成

SE Block 的设计使其可以直接嵌入现有网络的构建模块中：

| 基础架构 | 集成方式 | Top-1 提升 | Top-5 提升 |
|---------|---------|-----------|-----------|
| ResNet-50 | 残差分支后、shortcut 相加前 | 24.56% → 23.29% (↓1.27) | 7.48% → 6.62% (↓0.86) |
| ResNet-101 | 同上 | — | 6.52% → 6.07% (↓0.45) |
| ResNeXt-50 | 同上 | 22.23% → 21.10% (↓1.13) | 5.90% → 5.49% (↓0.41) |
| VGGNet-16 | 每个卷积层后 | — | 8.67% → 7.44% (↓1.23) |
| BN-Inception | Inception 模块后 | — | 7.89% → 7.14% (↓0.75) |

> 💡 **关键发现**：SE Block 在不同深度、不同架构风格的网络上均带来一致的提升，验证了通道注意力机制的通用性。

##### 消融实验关键结论

**Squeeze 算子选择**：全局平均池化（AvgPool）优于最大池化（MaxPool），因为 AvgPool 能更好地编码通道的全局分布信息。

**Excitation 激活函数**：Sigmoid 优于 Tanh 和 ReLU。ReLU 由于将权重截断为非负且可能置零，丢失了通道间的相对关系；Tanh 虽然保留了正负信息但饱和区梯度消失；Sigmoid 输出 \([0,1]\) 的平滑权重最为合适。

**降维比 \(r\) 的影响**：

| \(r\) | Top-1 (%) | Top-5 (%) | 参数量 |
|-------|-----------|-----------|--------|
| 2 | 22.93 | 6.38 | 最多 |
| 4 | 23.01 | 6.48 | — |
| 8 | 23.19 | 6.62 | — |
| **16** | **23.29** | **6.62** | **最佳平衡** |
| 32 | 23.61 | 6.82 | 最少 |

**SE Block 位置**：在残差模块中，SE Block 放在残差分支的卷积之后、与 shortcut 相加之前（SE-PRE）效果最佳。

##### 计算效率分析

SE Block 引入的额外计算量极小：

- **参数增量**：主要来自两个 FC 层，总增量约为 \(\frac{2}{r} \sum_{s=1}^{S} N_s \cdot C_s^2\)，其中 \(S\) 为阶段数，\(N_s\) 为该阶段重复次数，\(C_s\) 为通道数
- **SE-ResNet-50**：参数从 25.56M 增至 28.07M（+10%），GFLOPs 从 3.86 增至 3.87（+0.26%）
- **推理速度**：在 GPU 上 SE-ResNet-50 单张图推理约 209 张/秒 vs ResNet-50 约 234 张/秒，增加约 10% 的推理时间

##### 竞赛成绩与跨任务泛化

- **ILSVRC 2017 分类冠军**：SENet-154 集成模型在测试集上达到 **2.251% top-5 错误率**
- **场景分类**：在 Places-365 数据集上，SE-ResNet-152 的 top-1 错误率从 41.07% 降至 40.37%
- **目标检测**：在 COCO 上使用 Faster R-CNN + SE-ResNet-50 骨干，mAP 从 ResNet-50 基线提升约 1.3%（在 COCO minival 上）
- **CIFAR-10/100**：SE-ResNet-110 在 CIFAR-10 上错误率从 6.37% 降至 5.21%，CIFAR-100 上从 27.45% 降至 24.28%

##### 与传统方法的区别

| 对比维度 | 传统 CNN | SENet |
|---------|---------|-------|
| 通道处理 | 所有通道等权重 | 自适应通道权重 |
| 注意力机制 | 无显式通道注意力 | 显式 Squeeze-Excitation |
| 全局信息利用 | 依赖感受野逐步扩大 | GAP 直接获取全局统计 |
| 架构修改 | 需要重新设计网络 | 即插即用，不改变原有架构 |
| 计算开销 | — | 仅增加 ~10% 参数，GFLOPs 几乎不变 |

#### 🧪 练习题
```yaml
question: "SE Block 中 Excitation 操作使用 Sigmoid 而非 Softmax 作为最终激活函数的主要原因是什么？"
options:
  - "Sigmoid 的计算速度比 Softmax 更快"
  - "Sigmoid 允许多个通道同时具有较高权重，而 Softmax 会强制通道间竞争"
  - "Sigmoid 的梯度比 Softmax 更稳定，不会出现梯度消失"
  - "Softmax 只能用于分类任务的最后一层"
answer: 1
explain: "SE Block 需要输出非互斥的通道权重——多个通道可以同时被增强。Sigmoid 独立地将每个通道映射到 [0,1]，而 Softmax 会使所有通道权重之和为 1，形成互斥竞争，不符合通道重标定的需求。"
```

### EfficientNet

```yaml
id: efficientnet
num: 7
name: EfficientNet
full_name: 高效网络 (Efficient Network)
year: '2019.05'
org: Google
parent: senet
paper_url: https://arxiv.org/abs/1905.11946
project_url: ''
category: attention_cnn
motivation: 提出复合缩放方法，平衡深度、宽度与分辨率
```

#### 📝 一句话总结
EfficientNet 提出了一种**复合缩放方法（Compound Scaling）**，通过同时按固定比例缩放网络深度、宽度和输入分辨率三个维度，结合神经架构搜索（NAS）得到的高效基线网络 EfficientNet-B0，构建了 B0–B7 系列模型，在 ImageNet 上以 8.4 倍更少的参数达到了当时最优的 84.3% top-1 准确率。

#### 🎯 核心要点
- **复合缩放方法**：提出统一缩放深度（\(d\)）、宽度（\(w\)）和分辨率（\(r\)）三个维度，使用用户指定的复合系数 \(\phi\) 控制总计算量
- **缩放公式**：\(d = \alpha^\phi,\ w = \beta^\phi,\ r = \gamma^\phi\)，约束 \(\alpha \cdot \beta^2 \cdot \gamma^2 \approx 2\)，FLOPS 约增长 \(2^\phi\) 倍
- **关键观察**：单一维度缩放存在收益递减（diminishing returns），平衡三个维度的缩放才能获得最佳精度-效率权衡
- **EfficientNet-B0 基线**：通过 NAS 搜索得到（搜索空间同 MnasNet），以 MBConv（移动倒置瓶颈）+ Squeeze-and-Excitation 为核心模块
- **搜索到的最优缩放系数**：\(\alpha=1.2,\ \beta=1.1,\ \gamma=1.15\)
- **ImageNet SOTA**：EfficientNet-B7 达到 84.3% top-1 准确率，仅 66M 参数、37B FLOPS，比 GPipe 小 8.4 倍、快 6.1 倍
- **迁移学习**：在 8 个数据集中的 5 个达到 SOTA，平均参数减少 9.6 倍
- **通用性验证**：复合缩放方法在 MobileNet 和 ResNet 上同样有效，优于单维度缩放

#### 🔬 深入细节
##### 核心示意图

![EfficientNet 复合缩放方法示意图](https://ar5iv.labs.arxiv.org/html/1905.11946/assets/x2.png)
*图：模型缩放方法对比。(a) 基线网络；(b) 仅增加宽度；(c) 仅增加深度；(d) 仅增加分辨率；(e) 本文提出的复合缩放方法，同时平衡三个维度。*

##### EfficientNet-B0 基线架构

```
┌──────────┬───────────────────────┬──────────────┬──────────┬────────┐
│  Stage   │      Operator         │  Resolution  │ Channels │ Layers │
├──────────┼───────────────────────┼──────────────┼──────────┼────────┤
│    1     │ Conv3x3               │  224 × 224   │    32    │   1    │
│    2     │ MBConv1, k3×3         │  112 × 112   │    16    │   1    │
│    3     │ MBConv6, k3×3         │  112 × 112   │    24    │   2    │
│    4     │ MBConv6, k5×5         │   56 × 56    │    40    │   2    │
│    5     │ MBConv6, k3×3         │   28 × 28    │    80    │   3    │
│    6     │ MBConv6, k5×5         │   14 × 14    │   112    │   3    │
│    7     │ MBConv6, k5×5         │   14 × 14    │   192    │   4    │
│    8     │ MBConv6, k3×3         │    7 × 7     │   320    │   1    │
│    9     │ Conv1x1 & Pooling & FC│    7 × 7     │  1280    │   1    │
└──────────┴───────────────────────┴──────────────┴──────────┴────────┘
```
*表：EfficientNet-B0 架构。MBConv\(N\) 表示扩展比为 \(N\) 的移动倒置瓶颈卷积（Mobile Inverted Bottleneck Conv），所有 MBConv 块均包含 Squeeze-and-Excitation 优化。*

##### 复合缩放伪代码

```python
# EfficientNet 复合缩放方法
# Step 1: 在基线模型上搜索最优缩放系数
phi = 1  # 固定 φ=1，假设可用资源翻倍
# 网格搜索 α, β, γ，约束: α · β² · γ² ≈ 2
best_alpha, best_beta, best_gamma = grid_search(
    constraint=lambda a, b, g: a * b**2 * g**2 ≈ 2
)
# 搜索结果: α=1.2, β=1.1, γ=1.15

# Step 2: 固定 α, β, γ，用不同 φ 缩放得到 B1-B7
alpha, beta, gamma = 1.2, 1.1, 1.15
for phi in [1, 2, 3, 3.5, 4, 5, 6.5]:  # B1 到 B7
    depth_coeff  = alpha ** phi   # 深度缩放系数
    width_coeff  = beta  ** phi   # 宽度缩放系数
    resolution   = int(base_resolution * gamma ** phi)  # 输入分辨率
    # FLOPS ≈ base_flops * 2^φ
    model = scale_baseline(EfficientNet_B0, depth_coeff, width_coeff, resolution)
```

##### 动机与背景

卷积神经网络的性能提升传统上依赖于增大模型规模，但如何高效地缩放模型一直缺乏系统性研究。此前的工作通常只关注单一维度的缩放：

- **深度缩放**（如 ResNet-18 → ResNet-200）：增加网络层数，能学习更复杂的特征，但过深的网络面临梯度消失问题，训练困难
- **宽度缩放**（如 WideResNet）：增加每层通道数，能捕获更细粒度的特征，但浅而宽的网络难以学习高层语义特征
- **分辨率缩放**：使用更大的输入图像，能获得更精细的特征模式，但高分辨率带来的精度增益在极高分辨率时迅速递减

> 💡 **关键观察**：论文通过系统实验发现，单独缩放任何一个维度都存在**收益递减**现象——当模型达到一定规模后，继续在单一维度上增加资源带来的精度提升越来越小。更重要的是，**平衡缩放所有三个维度**才能获得最佳的精度-效率权衡。

##### 核心机制：复合缩放方法

论文将模型缩放形式化为一个优化问题。给定基线网络的每一层 \(i\) 的操作 \(\hat{F}_i\)、输入张量维度 \(\langle H_i, W_i, C_i \rangle\)，目标是在给定资源约束下最大化模型精度：

$$\max_{d, w, r} \text{Accuracy}\big(\mathcal{N}(d, w, r)\big)$$

$$\text{s.t.} \quad \mathcal{N}(d, w, r) = \bigodot_{i=1..s} \hat{F}_i^{d \cdot \hat{L}_i}\big(X_{\langle r \cdot \hat{H}_i,\ r \cdot \hat{W}_i,\ w \cdot \hat{C}_i \rangle}\big)$$

$$\text{Memory}(\mathcal{N}) \leq \text{target\_memory}, \quad \text{FLOPS}(\mathcal{N}) \leq \text{target\_flops}$$

其中 \(d, w, r\) 分别是深度、宽度和分辨率的缩放系数。

为了简化搜索空间，论文提出使用**单一复合系数 \(\phi\)** 统一控制三个维度的缩放：

$$d = \alpha^\phi, \quad w = \beta^\phi, \quad r = \gamma^\phi$$

$$\text{s.t.} \quad \alpha \cdot \beta^2 \cdot \gamma^2 \approx 2, \quad \alpha \geq 1, \quad \beta \geq 1, \quad \gamma \geq 1$$

> ⚠️ **约束条件的直觉**：卷积层的 FLOPS 与 \(d\)（深度）成正比，与 \(w^2\)（宽度的平方，因为卷积核输入输出通道都缩放）成正比，与 \(r^2\)（分辨率的平方，因为特征图面积缩放）成正比。因此总 FLOPS 正比于 \(\alpha^\phi \cdot (\beta^\phi)^2 \cdot (\gamma^\phi)^2 = (\alpha \cdot \beta^2 \cdot \gamma^2)^\phi\)。当 \(\alpha \cdot \beta^2 \cdot \gamma^2 = 2\) 时，总 FLOPS 约增长 \(2^\phi\) 倍，使得用户可以通过 \(\phi\) 精确控制计算预算。

##### 两步缩放流程

**Step 1**：固定 \(\phi = 1\)（即资源翻倍），在 EfficientNet-B0 上进行小规模网格搜索，找到最优的 \(\alpha, \beta, \gamma\)。搜索结果为：

$$\alpha = 1.2, \quad \beta = 1.1, \quad \gamma = 1.15$$

验证：\(1.2 \times 1.1^2 \times 1.15^2 = 1.2 \times 1.21 \times 1.3225 \approx 1.92 \approx 2\) ✓

**Step 2**：固定 \(\alpha, \beta, \gamma\) 为常数，通过调整 \(\phi\) 得到不同规模的模型（B1–B7）。这种方法的优势在于只需在小模型上搜索一次，即可应用于所有规模。

##### EfficientNet-B0 的 NAS 搜索

基线网络 EfficientNet-B0 通过神经架构搜索（NAS）获得，搜索空间与 MnasNet 相同，优化目标同时考虑准确率和效率：

$$\text{ACC}(m) \times \left[\frac{\text{FLOPS}(m)}{T}\right]^w$$

其中 \(T = 400M\) FLOPS 为目标计算量，\(w = -0.07\) 为权重因子。搜索得到的 B0 架构以 **MBConv（移动倒置瓶颈卷积）** 为核心构建块，每个 MBConv 块包含：

1. **逐点卷积（1×1）扩展**：将通道数扩展 \(N\) 倍（扩展比）
2. **深度可分离卷积（3×3 或 5×5）**：在扩展后的通道上进行空间卷积
3. **Squeeze-and-Excitation（SE）模块**：通过全局平均池化 → FC → ReLU → FC → Sigmoid 学习通道注意力权重
4. **逐点卷积（1×1）压缩**：将通道数压缩回目标维度
5. **残差连接**：当输入输出维度匹配时添加跳跃连接

##### 训练细节

- **优化器**：RMSProp（decay=0.9, momentum=0.9）
- **激活函数**：SiLU（Swish-1），即 \(x \cdot \sigma(x)\)
- **数据增强**：AutoAugment
- **正则化**：
  - 权重衰减 1e-5
  - Stochastic Depth（存活概率 0.8）
  - Dropout 从 B0 的 0.2 线性增加到 B7 的 0.5
- **学习率**：初始 0.256，每 2.4 个 epoch 衰减 0.97
- **Batch Norm**：momentum=0.99

##### ImageNet 实验结果

| 模型 | Top-1 Acc. | #Params | #FLOPS | 对比 |
|------|-----------|---------|--------|------|
| EfficientNet-B0 | 77.1% | 5.3M | 0.39B | 基线 |
| EfficientNet-B1 | 79.1% | 7.8M | 0.70B | 比 ResNet-152 (77.8%) 更准，参数少 7.6× |
| EfficientNet-B2 | 80.1% | 9.2M | 1.0B | 媲美 Inception-ResNet-v2 (80.1%) |
| EfficientNet-B3 | 81.6% | 12M | 1.8B | 超越 ResNeXt-101 (80.9%)，FLOPS 少 18× |
| EfficientNet-B4 | 82.9% | 19M | 4.2B | 超越 NASNet-A (82.7%)，参数少 4.7× |
| EfficientNet-B5 | 83.6% | 30M | 9.9B | 超越 AmoebaNet-C (83.5%) |
| EfficientNet-B6 | 84.0% | 43M | 19B | — |
| EfficientNet-B7 | **84.3%** | 66M | 37B | 媲美 GPipe (84.3%)，参数少 **8.4×**，快 **6.1×** |

##### 与传统方法的区别

| 对比维度 | 传统缩放方法 | EfficientNet 复合缩放 |
|---------|------------|---------------------|
| 缩放维度 | 通常只缩放单一维度（深度 OR 宽度 OR 分辨率） | 同时平衡缩放三个维度 |
| 缩放策略 | 手动设计，缺乏理论指导 | 基于约束优化，用 \(\phi\) 统一控制 |
| 基线网络 | 手动设计（ResNet、VGG 等） | NAS 自动搜索高效基线 |
| 搜索成本 | 每个规模独立设计 | 只在小模型上搜索一次，复用到所有规模 |
| 效率 | 参数和 FLOPS 增长不可控 | FLOPS 精确按 \(2^\phi\) 增长 |

> 💡 **核心洞察**：更高分辨率的图像需要更深的网络来捕获更大的感受野，也需要更宽的网络来捕获更精细的模式。这三个维度之间存在内在耦合关系，因此必须协调缩放才能获得最优性能。

#### 🧪 练习题
```yaml
question: "EfficientNet 复合缩放公式中约束 α·β²·γ² ≈ 2 的主要目的是什么？"
options:
  - "确保模型参数量恰好翻倍"
  - "使总 FLOPS 随复合系数 φ 按 2^φ 倍增长，便于精确控制计算预算"
  - "保证三个缩放维度的系数之和为常数"
  - "限制搜索空间大小以加速 NAS 搜索过程"
answer: 1
explain: "由于 FLOPS 正比于 d·w²·r² = (α·β²·γ²)^φ，当 α·β²·γ²=2 时，FLOPS 增长为 2^φ，用户可通过 φ 直接控制计算预算的倍数增长。"
```

### ViT

```yaml
id: vit
num: 8
name: ViT
full_name: 视觉Transformer (Vision Transformer)
year: '2020.10'
org: Google
parent: —
paper_url: https://arxiv.org/abs/2010.11929
project_url: ''
category: vit_era
motivation: 将图像切分为Patch，纯Transformer超越CNN
```

#### 📝 一句话总结
ViT 将图像切分为固定大小的 Patch 序列，直接输入标准 Transformer Encoder 进行分类，证明了在大规模数据预训练下，纯 Transformer 架构无需任何卷积即可超越最先进的 CNN 模型，开启了视觉 Transformer 时代。

#### 🎯 核心要点
- **Patch Embedding**：将图像切分为 \(P \times P\) 的固定大小 Patch，展平后通过线性投影映射到 \(D\) 维嵌入空间，将 2D 图像转化为 1D 序列
- **[CLS] Token**：借鉴 BERT，在 Patch 序列前添加一个可学习的分类 Token，其最终输出作为整张图像的表示用于分类
- **可学习 1D 位置编码**：为每个 Patch（含 [CLS]）添加可学习的 1D 位置嵌入，实验表明 2D 位置编码无显著增益
- **标准 Transformer Encoder**：采用 Pre-LN 结构（LayerNorm 在 MSA/MLP 之前），MLP 含两层全连接 + GELU 激活
- **三种模型规模**：ViT-Base（86M）、ViT-Large（307M）、ViT-Huge（632M），配置沿用 BERT 命名
- **大规模预训练 + 微调范式**：在 ImageNet-21k（14M）或 JFT-300M 上预训练，迁移到下游任务微调
- **归纳偏置极少**：相比 CNN 的局部性和平移等变性，ViT 仅在 Patch 切分时引入 2D 结构先验
- **高分辨率微调**：微调时保持 Patch 大小不变、增大序列长度，对预训练位置编码进行 2D 插值
- **核心发现**：大规模训练可以弥补归纳偏置的缺失——数据量足够大时，ViT 超越 CNN；数据量不足时，ViT 不如 CNN

#### 🔬 深入细节
##### 模型架构总览

![ViT 模型架构图](https://ar5iv.labs.arxiv.org/html/2010.11929/assets/x1.png)
*图：ViT 模型总览。将图像切分为固定大小的 Patch，线性嵌入后加上位置编码，送入标准 Transformer Encoder。[CLS] Token 的输出经分类头得到预测结果。*

##### 算法伪代码

```python
# Vision Transformer 前向传播伪代码
def ViT_forward(image, E, E_pos, cls_token, transformer_encoder, mlp_head):
    """
    image: (B, C, H, W)
    E: 线性投影矩阵, shape (P²·C, D)
    E_pos: 位置嵌入, shape (N+1, D)
    cls_token: 可学习分类Token, shape (1, D)
    """
    # Step 1: Patch Embedding
    patches = split_into_patches(image, patch_size=P)   # (B, N, P²·C)
    patch_embeddings = patches @ E                        # (B, N, D)

    # Step 2: 拼接 [CLS] Token
    z_0 = concat([cls_token, patch_embeddings], dim=1)   # (B, N+1, D)

    # Step 3: 加位置编码
    z_0 = z_0 + E_pos                                    # (B, N+1, D)

    # Step 4: Transformer Encoder (L 层)
    for layer in transformer_encoder:
        # Pre-LN + MSA + 残差
        z_prime = MSA(LayerNorm(z)) + z
        # Pre-LN + MLP + 残差
        z = MLP(LayerNorm(z_prime)) + z_prime

    # Step 5: 分类输出
    y = LayerNorm(z[:, 0])      # 取 [CLS] Token 输出
    logits = mlp_head(y)         # 预训练: MLP(hidden+GELU); 微调: Linear
    return logits
```

##### 动机与背景

在 ViT 提出之前，Transformer 已在 NLP 领域取得巨大成功（BERT、GPT 等），但在计算机视觉中，卷积神经网络（CNN）仍占据主导地位。此前将注意力机制引入视觉的工作要么将 self-attention 与 CNN 结合使用，要么用特殊的局部注意力模式替代卷积——这些方法虽然理论上高效，但由于使用了特殊的注意力模式，难以在现代硬件加速器上高效扩展。

ViT 的核心动机非常直接：**能否以最少的修改，将标准 Transformer 直接应用于图像？** 作者发现，只需将图像切分为 Patch 并线性嵌入，就可以将其视为 NLP 中的 Token 序列，直接复用 NLP 中成熟的 Transformer 架构及其高效实现。

##### 核心机制详解

**1. Patch Embedding — 图像序列化**

给定输入图像 \(\mathbf{x} \in \mathbb{R}^{H \times W \times C}\)，ViT 将其重塑为 \(N\) 个展平的 2D Patch：

$$\mathbf{x}_p \in \mathbb{R}^{N \times (P^2 \cdot C)}, \quad N = \frac{HW}{P^2}$$

其中 \(P\) 为 Patch 大小（通常为 16 或 14），\(N\) 为 Patch 数量，即 Transformer 的有效序列长度。例如对于 224×224 的图像、Patch 大小 16×16，序列长度 \(N = 196\)。

每个 Patch 通过可训练的线性投影矩阵 \(\mathbf{E} \in \mathbb{R}^{(P^2 \cdot C) \times D}\) 映射到 \(D\) 维空间。这一操作等价于一个 kernel size = stride = \(P\) 的卷积层，但概念上更简洁——直接将 Patch 视为"视觉词元"。

> 💡 **关键**：Patch 大小决定了序列长度，序列长度与 Patch 大小的平方成反比。更小的 Patch 意味着更长的序列和更高的计算代价，但也能捕获更精细的空间信息。

**2. [CLS] Token 与位置编码**

ViT 在 Patch 嵌入序列前拼接一个可学习的 [CLS] Token \(\mathbf{x}_{\text{class}}\)，并为整个序列（长度 \(N+1\)）添加可学习的 1D 位置嵌入 \(\mathbf{E}_{pos} \in \mathbb{R}^{(N+1) \times D}\)：

$$\mathbf{z}_0 = [\mathbf{x}_{\text{class}};\, \mathbf{x}_p^1\mathbf{E};\, \mathbf{x}_p^2\mathbf{E};\, \cdots;\, \mathbf{x}_p^N\mathbf{E}] + \mathbf{E}_{pos}$$

作者实验发现，1D 可学习位置编码与 2D 位置编码、相对位置编码的性能差异极小（<0.1%），因此选择了最简单的 1D 方案。这说明 Transformer 能够从数据中自动学习到 Patch 之间的空间关系。

**3. Transformer Encoder — Pre-LN 架构**

ViT 采用标准 Transformer Encoder，但使用 **Pre-LN**（LayerNorm 在注意力/MLP 之前）而非原始 Transformer 的 Post-LN，这有助于训练稳定性：

$$\mathbf{z}'_\ell = \text{MSA}(\text{LN}(\mathbf{z}_{\ell-1})) + \mathbf{z}_{\ell-1}, \quad \ell = 1 \ldots L$$

$$\mathbf{z}_\ell = \text{MLP}(\text{LN}(\mathbf{z}'_\ell)) + \mathbf{z}'_\ell, \quad \ell = 1 \ldots L$$

其中 MLP 包含两个全连接层，中间使用 GELU 激活函数，隐藏层维度为 \(4D\)（如 ViT-Base 的 MLP 维度为 3072 = 4×768）。

最终分类输出取 [CLS] Token 经过 LayerNorm 后的表示：

$$\mathbf{y} = \text{LN}(\mathbf{z}_L^0)$$

> ⚠️ **注意**：预训练时分类头为含一个隐藏层的 MLP，微调时替换为单层线性层，并零初始化。

**4. 归纳偏置分析**

这是 ViT 最深刻的洞察之一。CNN 在每一层都内置了三种归纳偏置：**局部性**（卷积核只看局部区域）、**二维邻域结构**（特征图保持空间排列）和**平移等变性**（同一卷积核在所有位置共享）。

而 ViT 中：
- **MSA 层是全局的**：每个 Token 可以关注所有其他 Token，没有局部性约束
- **MLP 层是局部且平移等变的**：独立作用于每个 Token
- **2D 结构仅在两处使用**：(1) 初始 Patch 切分；(2) 微调时位置编码的 2D 插值

这意味着 ViT 必须从数据中学习 CNN 天然具备的空间先验。因此，**在小数据集上 ViT 不如 CNN，但在大数据集上 ViT 的灵活性反而成为优势**。

**5. 高分辨率微调与位置编码插值**

微调时通常使用比预训练更高的分辨率（如预训练 224→微调 384/512）。由于 Patch 大小不变，更高分辨率意味着更多 Patch、更长序列。此时预训练的位置编码维度不匹配，ViT 的解决方案是对预训练位置编码进行 **2D 双线性插值**——先将 1D 位置编码按原始网格排列为 2D，插值到新网格大小，再展平回 1D。

##### 模型变体与训练细节

| 模型 | 层数 | 隐藏维度 D | MLP 维度 | 注意力头数 | 参数量 |
|------|------|-----------|----------|-----------|--------|
| ViT-Base | 12 | 768 | 3072 | 12 | 86M |
| ViT-Large | 24 | 1024 | 4096 | 16 | 307M |
| ViT-Huge | 32 | 1280 | 5120 | 16 | 632M |

命名规则 ViT-X/Y 表示模型规模 X 和 Patch 大小 Y，如 ViT-L/16 表示 Large 模型 + 16×16 Patch。

训练配置：
- **预训练**：Adam 优化器（\(\beta_1=0.9, \beta_2=0.999\)），batch size 4096，权重衰减 0.1，线性学习率 warmup + decay
- **微调**：SGD with momentum，batch size 512，高分辨率输入（ViT-L/16 用 512，ViT-H/14 用 518）

##### 与 CNN 的关键对比

| 维度 | CNN (ResNet/EfficientNet) | ViT |
|------|--------------------------|-----|
| 归纳偏置 | 强（局部性 + 平移等变性） | 弱（仅 Patch 切分引入 2D 先验） |
| 小数据表现 | 更好（归纳偏置起正则化作用） | 较差（需要大量数据学习空间关系） |
| 大数据表现 | 趋于饱和 | 持续提升，超越 CNN |
| 计算效率 | 卷积硬件优化成熟 | 可直接复用 NLP Transformer 高效实现 |
| 扩展性 | 受限于架构设计 | 与 NLP 一致的 scaling law |

在 JFT-300M 预训练后，ViT-H/14 在 ImageNet 上达到 **88.55%** top-1 准确率，超越了当时最强的 BiT（87.54%）和 Noisy Student（88.4%），且预训练计算成本更低。

#### 🧪 练习题
```yaml
question: "ViT 在中等规模数据集（如 ImageNet-1k）上直接训练时表现不如同等规模的 ResNet，主要原因是什么？"
options:
  - "Transformer 的参数量太大，容易过拟合"
  - "ViT 缺少 CNN 固有的局部性和平移等变性等归纳偏置，在数据不足时泛化能力较弱"
  - "ViT 的位置编码无法表达 2D 空间信息"
  - "Patch Embedding 的线性投影损失了太多图像信息"
answer: 1
explain: "ViT 的 self-attention 是全局操作，不具备 CNN 天然的局部性和平移等变性归纳偏置。在数据量不足时，模型需要从头学习这些空间先验，导致泛化能力不如 CNN。但当预训练数据足够大时（如 JFT-300M），这一劣势被消除，ViT 反而因更强的灵活性超越 CNN。"
```

### DeiT

```yaml
id: deit
num: 9
name: DeiT
full_name: 数据高效图像Transformer (Data-efficient Image Transformer)
year: '2020.12'
org: Facebook AI Research
parent: vit
paper_url: https://arxiv.org/abs/2012.12877
project_url: ''
category: vit_era
motivation: 引入蒸馏Token实现数据高效训练
```

#### 📝 一句话总结
DeiT 提出了一套针对 Vision Transformer 的**数据高效训练策略**和基于 **distillation token 的知识蒸馏方法**，仅使用 ImageNet-1k 数据即可训练出超越在 JFT-300M 上预训练的 ViT-B 的模型（85.2% vs 84.15% top-1），证明了大规模外部数据并非训练高性能 ViT 的必要条件。

#### 🎯 核心要点
- **无需外部数据**：仅用 ImageNet-1k（128万张图）在单台 8-GPU 服务器上 53 小时即可训练出有竞争力的 ViT
- **Distillation Token 机制**：在 ViT 的 patch embedding 序列中新增一个可学习的蒸馏 token，与 class token 并行，通过自注意力交互学习教师模型的知识
- **Hard Distillation 优于 Soft Distillation**：硬标签蒸馏（83.0%）显著优于软标签蒸馏（81.8%），且无需调节温度 \(\tau\) 和权重 \(\lambda\) 超参数
- **CNN 教师优于 Transformer 教师**：使用 RegNetY-16GF（CNN，82.9%）作为教师，学生可通过蒸馏继承 CNN 的归纳偏置（局部性、平移等变性）
- **三种模型尺寸**：DeiT-Ti（5M）、DeiT-S（22M）、DeiT-B（86M），覆盖不同计算预算
- **关键训练策略**：AdamW 优化器、RandAugment、Mixup、CutMix、Stochastic Depth、Repeated Augmentation 等缺一不可
- **最佳结果**：DeiT⚗-B↑384 在 1000 epoch 训练下达到 **85.2% top-1**，超越 ViT-B/16@JFT-300M（84.15%）

#### 🔬 深入细节
![DeiT 蒸馏框架示意图](https://ar5iv.labs.arxiv.org/html/2012.12877v2/assets/x2.png)
*图：DeiT 的 distillation token 机制。在标准 ViT 的 class token 旁新增一个 distillation token，分别通过独立的线性分类头输出预测，训练时 class token 对应真实标签损失，distillation token 对应教师模型蒸馏损失。*

```python
# DeiT 蒸馏训练伪代码
import torch
import torch.nn.functional as F

class DeiT(nn.Module):
    def __init__(self, vit_backbone):
        super().__init__()
        self.backbone = vit_backbone          # 标准 ViT (patch embed + transformer blocks)
        self.cls_token = nn.Parameter(...)     # [1, 1, D] class token
        self.dist_token = nn.Parameter(...)    # [1, 1, D] distillation token (新增!)
        self.head = nn.Linear(D, num_classes)       # class head
        self.head_dist = nn.Linear(D, num_classes)  # distillation head (新增!)

    def forward(self, x):
        # x: [B, 3, 224, 224]
        patches = self.backbone.patch_embed(x)       # [B, N, D], N=196 for 16x16 patches
        tokens = torch.cat([self.cls_token, self.dist_token, patches], dim=1)  # [B, N+2, D]
        tokens = self.backbone.transformer(tokens)    # 12层 Transformer Encoder
        cls_out = self.head(tokens[:, 0])             # class token → 分类logits
        dist_out = self.head_dist(tokens[:, 1])       # distillation token → 蒸馏logits
        return cls_out, dist_out

# Hard Distillation 训练循环
teacher = RegNetY_16GF(pretrained=True).eval()  # CNN 教师模型, 82.9% top-1

for images, labels in dataloader:
    cls_logits, dist_logits = student(images)
    with torch.no_grad():
        teacher_labels = teacher(images).argmax(dim=-1)  # 教师硬标签

    # Hard Distillation Loss (Eq. 3)
    loss = 0.5 * F.cross_entropy(cls_logits, labels) \
         + 0.5 * F.cross_entropy(dist_logits, teacher_labels)
    loss.backward()
    optimizer.step()

# 推理时：两个 head 的 softmax 融合
def inference(model, x):
    cls_logits, dist_logits = model(x)
    return (cls_logits.softmax(dim=-1) + dist_logits.softmax(dim=-1)) / 2
```

##### 动机与背景

ViT（Vision Transformer）在 JFT-300M（3 亿张图像）上预训练后展现了卓越的图像分类性能，但在仅使用 ImageNet-1k（128 万张图像）训练时表现不佳——ViT-B/16 仅达到 77.9% top-1，远低于同等规模的 CNN（如 EfficientNet-B7 的 84.3%）。核心问题在于：**Transformer 缺乏 CNN 固有的归纳偏置**（局部连接、平移等变性），因此需要更多数据来学习这些视觉先验。

> 💡 **关键洞察**：与其收集更多数据，不如通过**知识蒸馏**从 CNN 教师中"继承"归纳偏置，同时配合精心设计的训练策略来弥补数据不足。

##### 核心机制 1：Distillation Token

DeiT 的核心创新是在 ViT 架构中引入一个专用的 **distillation token**。标准 ViT 在 patch embedding 序列前拼接一个 class token \([\texttt{CLS}]\)，DeiT 在此基础上再拼接一个 distillation token \([\texttt{DIST}]\)：

$$
\mathbf{z}_0 = [\mathbf{x}_{\text{class}};\, \mathbf{x}_{\text{dist}};\, \mathbf{x}_1^p;\, \mathbf{x}_2^p;\, \cdots;\, \mathbf{x}_N^p] + \mathbf{E}_{\text{pos}}
$$

两个 token 在所有 Transformer 层中通过自注意力与 patch token 交互，但在输出端连接**不同的线性分类头**：
- **Class head**：以真实标签 \(y\) 为监督目标
- **Distillation head**：以教师模型的输出为监督目标

> 💡 **为什么不直接用两个 class token？** 实验表明，两个相同目标的 class token 会在训练中收敛到几乎相同的向量（余弦相似度 0.999），不提供额外信息。而 distillation token 与 class token 学到的表示显著不同（初始层余弦相似度仅 0.06），在最后一层才逐渐趋近（0.93），说明两者提供了**互补的信息**。

##### 核心机制 2：Hard vs Soft Distillation

DeiT 探索了两种蒸馏策略：

**Soft Distillation**（传统 KD）：

$$
\mathcal{L}_{\text{soft}} = (1-\lambda)\,\mathcal{L}_{\text{CE}}(\psi(Z_s),\, y) + \lambda\,\tau^2\,\text{KL}\!\left(\psi\!\left(\frac{Z_s}{\tau}\right),\, \psi\!\left(\frac{Z_t}{\tau}\right)\right)
$$

其中 \(\psi\) 为 softmax，\(Z_s, Z_t\) 分别为学生和教师的 logits，\(\tau=3.0\) 为温度，\(\lambda=0.1\) 为平衡权重。

**Hard Distillation**（DeiT 推荐）：

$$
\mathcal{L}_{\text{hard}} = \frac{1}{2}\,\mathcal{L}_{\text{CE}}(\psi(Z_s),\, y) + \frac{1}{2}\,\mathcal{L}_{\text{CE}}(\psi(Z_s),\, y_t)
$$

其中 \(y_t = \arg\max_c Z_t(c)\) 是教师的硬预测标签。

> ⚠️ **关键发现**：Hard distillation 在 DeiT 上显著优于 soft distillation（83.0% vs 81.8%），这与传统 CNN 蒸馏中 soft distillation 通常更优的结论相反。原因可能是：(1) 硬标签与 label smoothing（\(\varepsilon=0.1\)）结合后已包含足够的软信息；(2) 硬标签无需调节 \(\tau\) 和 \(\lambda\)，更鲁棒。

##### 核心机制 3：CNN 教师传递归纳偏置

DeiT 发现 **CNN 教师优于 Transformer 教师**：

| 教师模型 | 教师 acc. | DeiT-B 学生 | DeiT-B↑384 |
|:---|:---:|:---:|:---:|
| DeiT-B (Transformer) | 81.8% | 81.9% | 83.1% |
| RegNetY-16GF (CNN) | 82.9% | 83.1% | 84.2% |

即使教师准确率接近，CNN 教师也能带来更大的提升。这是因为蒸馏过程中，学生 Transformer 可以**继承 CNN 的归纳偏置**——局部性和平移等变性等视觉先验通过教师的预测隐式传递给学生。实验还发现，distillation token 的输出与 CNN 教师的预测更相关，而 class token 的输出更接近纯标签训练的 Transformer。

##### 训练策略：数据增强与正则化

DeiT 的成功不仅依赖蒸馏，更依赖一套精心调优的训练策略。以下是关键组件的消融实验（DeiT-B, 300 epochs）：

| 配置变化 | 224² top-1 | 384² top-1 |
|:---|:---:|:---:|
| **完整配置（基线）** | **81.8%** | **83.1%** |
| SGD 替代 AdamW | 74.5% | 77.3% |
| 去掉 RandAugment | 79.6% | 80.4% |
| 去掉 Mixup | 78.7% | 79.8% |
| 去掉 CutMix | 80.0% | 80.6% |
| 去掉 Mixup + CutMix | 75.8% | 76.7% |
| 去掉 Stochastic Depth | 不收敛* | — |
| 去掉 Repeated Augmentation | 76.5% | 77.4% |
| 加入 Dropout | 81.3% | 83.1% |

> 💡 **关键训练超参数**：300 epochs，batch size 1024，AdamW（lr=5×10⁻⁴ × batchsize/512），cosine LR decay，weight decay 0.05，warmup 5 epochs，label smoothing ε=0.1，stochastic depth rate 0.1，RandAugment 9/0.5，Mixup α=0.8，CutMix α=1.0，Random Erasing p=0.25。

核心结论：
1. **AdamW 是必须的**——SGD 导致 7.3% 的巨大性能下降
2. **Mixup + CutMix 组合至关重要**——去掉两者导致 6% 下降
3. **Stochastic Depth 不可或缺**——没有它模型无法收敛
4. **Repeated Augmentation 贡献巨大**——去掉导致 5.3% 下降
5. **Dropout 反而有害**——与 Stochastic Depth 存在冲突

##### 模型变体与最终结果

| 模型 | Embedding dim | Heads | Params | ImageNet top-1 |
|:---|:---:|:---:|:---:|:---:|
| DeiT-Ti | 192 | 3 | 5M | 72.2% |
| DeiT-S | 384 | 6 | 22M | 79.8% |
| DeiT-B | 768 | 12 | 86M | 81.8% |
| DeiT⚗-B | 768 | 12 | 86M | 83.4% |
| DeiT⚗-B↑384 | 768 | 12 | 86M | 84.4% |
| DeiT⚗-B↑384 (1000ep) | 768 | 12 | 86M | **85.2%** |
| ViT-B/16@JFT-300M | 768 | 12 | 86M | 84.15% |

DeiT⚗-B↑384 在 1000 epoch 训练下达到 85.2%，**仅用 ImageNet-1k 就超越了在 JFT-300M（3 亿张图像）上预训练的 ViT-B**。同时，DeiT 在下游任务（CIFAR-10/100、Flowers、Cars、iNaturalist 等）上的迁移学习表现也与 CNN 和大数据预训练的 ViT 相当。

#### 🧪 练习题
```yaml
question: "DeiT 中 hard distillation 优于 soft distillation 的关键原因是什么？"
options:
  - "hard distillation 使用了更高的温度参数 τ"
  - "hard distillation 的教师硬标签配合 label smoothing 已包含足够信息，且无需调节 τ 和 λ 超参数"
  - "hard distillation 使用了更强的数据增强策略"
  - "hard distillation 的梯度更新幅度更大，收敛更快"
answer: 1
explain: "Hard distillation 将教师的 argmax 硬标签作为伪标签，配合 label smoothing (ε=0.1) 已隐式包含软信息，同时避免了 soft distillation 中温度 τ 和权重 λ 的超参数敏感性问题，在 DeiT 上达到 83.0% vs 81.8% 的显著优势。"
```

### Swin Transformer

```yaml
id: swin_transformer
num: 10
name: Swin Transformer
full_name: 移动窗口Transformer (Shifted Window Transformer)
year: '2021.03'
org: 微软亚洲研究院
parent: vit
paper_url: https://arxiv.org/abs/2103.14030
project_url: ''
category: vit_era
motivation: 引入移动窗口机制，将计算复杂度降至线性并构建层级特征
```

#### 📝 一句话总结
Swin Transformer 提出了基于**移动窗口（Shifted Window）**的层级式 Vision Transformer 架构，通过在局部窗口内计算自注意力将复杂度从二次降至线性，并借助窗口移位策略实现跨窗口信息交互，使 Transformer 首次作为通用视觉骨干在分类、检测、分割任务上全面超越 CNN。

#### 🎯 核心要点
- **层级式特征金字塔**：通过 Patch Merging 逐阶段下采样（4×→8×→16×→32×），生成多尺度特征图，可直接替代 CNN 骨干接入 FPN/UPerNet 等下游头
- **窗口自注意力（W-MSA）**：将特征图划分为不重叠的 \(M \times M\) 局部窗口，在窗口内计算自注意力，复杂度从 \(O((hw)^2)\) 降至 \(O(M^2 \cdot hw)\)，对输入尺寸线性
- **移动窗口自注意力（SW-MSA）**：相邻 Transformer 块交替使用常规窗口与移位窗口（偏移 \(\lfloor M/2 \rfloor\) 像素），在不增加计算量的前提下建立跨窗口连接
- **循环移位 + 掩码的高效实现**：通过向左上方循环移位将移位后的子窗口拼回等大窗口，配合注意力掩码保证正确性，避免窗口数量增加
- **相对位置偏置（Relative Position Bias）**：在注意力矩阵中加入可学习的相对位置偏置 \(B\)，替代绝对位置编码，效果更优且支持跨分辨率迁移
- **四种模型变体**：Swin-T / S / B / L，分别对标 ResNet-50 / ResNet-101 / ViT-B / 更大模型，覆盖不同计算预算

#### 🔬 深入细节
##### 整体架构

![Swin Transformer 架构总览](https://ar5iv.labs.arxiv.org/html/2103.14030/assets/figs/teaser11.png)
*图 1：(a) Swin Transformer 构建层级特征图，仅在局部窗口内计算自注意力，复杂度对输入尺寸线性；(b) ViT 生成单一低分辨率特征图，全局自注意力导致二次复杂度。*

![Swin Transformer Block 结构](https://ar5iv.labs.arxiv.org/html/2103.14030/assets/x1.png)
*图 2：(a) Swin-T 整体架构；(b) 连续两个 Swin Transformer Block，交替使用 W-MSA 和 SW-MSA。*

Swin Transformer 的整体流程如下：

1. **Patch Splitting + Linear Embedding（Stage 1 入口）**：输入 RGB 图像被切分为 \(4 \times 4\) 的不重叠 patch，每个 patch 展平为 48 维向量，经线性层投影到 \(C\) 维，得到 \(\frac{H}{4} \times \frac{W}{4}\) 个 token。
2. **Swin Transformer Blocks**：在每个 Stage 内，多个 Swin Transformer Block 对 token 序列进行特征变换，token 数量不变。
3. **Patch Merging（Stage 2/3/4 入口）**：将相邻 \(2 \times 2\) 个 token 的特征拼接（4C 维），再经线性层降至 2C 维，实现 2× 空间下采样。
4. 四个 Stage 的输出分辨率分别为 \(\frac{H}{4}, \frac{H}{8}, \frac{H}{16}, \frac{H}{32}\)，与 ResNet 的 C2–C5 特征层完全对齐。

##### 核心机制：窗口自注意力与移动窗口

**动机与背景**：ViT 对所有 token 计算全局自注意力，复杂度为 \(O(n^2)\)，当输入分辨率较高时（如检测任务需要 800×1200），token 数量可达数万，计算代价不可接受。传统 CNN 通过局部卷积核天然具有线性复杂度，但感受野受限。Swin Transformer 的目标是**兼顾局部高效计算与全局信息流通**。

**窗口自注意力（W-MSA）**：将 \(h \times w\) 的 token 网格均匀划分为 \(\frac{h}{M} \times \frac{w}{M}\) 个大小为 \(M \times M\) 的不重叠窗口，自注意力仅在每个窗口内部计算。复杂度对比：

$$\Omega(\text{MSA}) = 4hwC^2 + 2(hw)^2C$$

$$\Omega(\text{W-MSA}) = 4hwC^2 + 2M^2hwC$$

当 \(M\) 固定（默认 \(M=7\)）时，W-MSA 的复杂度对 \(hw\) 为**线性**，而全局 MSA 为**二次**。

> 💡 关键：W-MSA 将全局注意力的 \(O(n^2)\) 瓶颈项 \(2(hw)^2C\) 替换为 \(2M^2 \cdot hwC\)，其中 \(M^2=49\) 是常数，因此整体复杂度变为线性。

**移动窗口自注意力（SW-MSA）**：W-MSA 的窗口之间没有信息交互，限制了建模能力。Swin Transformer 在连续的两个 Block 中交替使用常规窗口和移位窗口：

![移动窗口示意图](https://ar5iv.labs.arxiv.org/html/2103.14030/assets/figs/teaser_v4.png)
*图 3：移动窗口机制——Layer l 使用常规窗口划分，Layer l+1 将窗口偏移 \(\lfloor M/2 \rfloor\) 像素，使得相邻窗口的边界区域在新窗口中相遇，实现跨窗口连接。*

连续两个 Block 的计算公式为：

$$\hat{\mathbf{z}}^l = \text{W-MSA}(\text{LN}(\mathbf{z}^{l-1})) + \mathbf{z}^{l-1}$$

$$\mathbf{z}^l = \text{MLP}(\text{LN}(\hat{\mathbf{z}}^l)) + \hat{\mathbf{z}}^l$$

$$\hat{\mathbf{z}}^{l+1} = \text{SW-MSA}(\text{LN}(\mathbf{z}^l)) + \mathbf{z}^l$$

$$\mathbf{z}^{l+1} = \text{MLP}(\text{LN}(\hat{\mathbf{z}}^{l+1})) + \hat{\mathbf{z}}^{l+1}$$

其中 W-MSA 和 SW-MSA 分别表示常规窗口和移位窗口的多头自注意力。每个 Block 内部结构与标准 Transformer 一致：LayerNorm → (S)W-MSA → 残差 → LayerNorm → MLP（2 层，GELU 激活，扩展率 4×）→ 残差。

##### 高效循环移位实现

![循环移位批量计算](https://ar5iv.labs.arxiv.org/html/2103.14030/assets/x2.png)
*图 4：循环移位的高效批量计算方法——将特征图向左上方循环移位后，移位窗口重新对齐为等大窗口，配合注意力掩码保证不同子窗口之间不交互。*

移位窗口划分会产生更多且大小不一的窗口（从 \(\lceil\frac{h}{M}\rceil \times \lceil\frac{w}{M}\rceil\) 增加到 \((\lceil\frac{h}{M}\rceil+1) \times (\lceil\frac{w}{M}\rceil+1)\)）。朴素的 padding + mask 方案会使窗口数增加 2.25 倍。Swin Transformer 提出**循环移位（Cyclic Shift）**策略：

1. 将特征图向左上方循环移位 \(\lfloor M/2 \rfloor\) 个像素
2. 移位后的特征图仍按常规方式划分为等大窗口
3. 在注意力计算中施加**掩码矩阵**，确保来自不同原始区域的 token 之间不产生注意力
4. 计算完成后将结果反向移位恢复

> ⚠️ 注意：循环移位不改变窗口数量，因此 SW-MSA 与 W-MSA 的计算量完全相同，仅多了移位和掩码操作的极小开销。

##### 相对位置偏置

Swin Transformer 在注意力计算中引入可学习的**相对位置偏置** \(B\)：

$$\text{Attention}(Q, K, V) = \text{SoftMax}\left(\frac{QK^T}{\sqrt{d}} + B\right)V$$

其中 \(Q, K, V \in \mathbb{R}^{M^2 \times d}\)，\(B \in \mathbb{R}^{M^2 \times M^2}\)。由于相对位置沿每个轴的范围为 \([-(M-1), M-1]\)，实际参数化一个较小的偏置矩阵 \(\hat{B} \in \mathbb{R}^{(2M-1) \times (2M-1)}\)，\(B\) 中的值通过索引从 \(\hat{B}\) 中取出。

> 💡 关键：相对位置偏置相比绝对位置编码有两大优势——(1) 更好地编码 token 间的空间关系，实验中带来显著精度提升；(2) 预训练的偏置可通过双三次插值迁移到不同窗口大小，支持灵活的分辨率微调。

##### 与 ViT 的核心区别

| 特性 | ViT | Swin Transformer |
|------|-----|-------------------|
| 特征分辨率 | 单一（16× 下采样） | 多尺度金字塔（4×/8×/16×/32×） |
| 自注意力范围 | 全局（所有 token） | 局部窗口（\(M \times M\)） |
| 计算复杂度 | \(O(n^2)\) 二次 | \(O(n)\) 线性 |
| 位置编码 | 绝对位置编码 | 相对位置偏置 |
| 下游任务适配 | 需额外适配（如 ViTDet） | 天然兼容 FPN/UPerNet 等 |
| 跨窗口信息流 | 天然全局 | 移动窗口机制 |

##### 模型变体与伪代码

```python
# Swin Transformer 前向传播伪代码
def swin_transformer_forward(image):
    # Stage 1: Patch Splitting + Linear Embedding
    x = patch_split(image, patch_size=4)        # [B, H/4*W/4, 48]
    x = linear_embed(x, dim=C)                  # [B, H/4*W/4, C]
    for block in stage1_blocks:                  # {2,2,6,2} blocks per stage
        x = swin_block(x, shift=False)           # W-MSA
        x = swin_block(x, shift=True)            # SW-MSA
    
    # Stage 2/3/4: Patch Merging + Swin Blocks
    for stage in [stage2, stage3, stage4]:
        x = patch_merge(x)                       # 2x downsample, 2C dim
        for block in stage.blocks:
            x = swin_block(x, shift=False)
            x = swin_block(x, shift=True)
    
    return x  # 多尺度特征 {C, 2C, 4C, 8C}

def swin_block(x, shift):
    # 循环移位（仅 SW-MSA）
    if shift:
        x_shifted = cyclic_shift(x, displacement=M//2)
        attn_mask = create_mask()
    else:
        x_shifted = x
        attn_mask = None
    
    # Window Partition → Attention → Window Reverse
    windows = partition_windows(x_shifted, M=7)  # [num_win*B, M*M, C]
    attn_out = window_attention(windows, mask=attn_mask,
                                 rel_pos_bias=B_hat)
    x_out = reverse_windows(attn_out)
    
    if shift:
        x_out = cyclic_shift(x_out, displacement=-M//2)  # 反向移位
    
    return x_out
```

四种模型变体的超参数配置：

| 变体 | 嵌入维度 C | 各 Stage 层数 | 参数量 | FLOPs | 对标模型 |
|------|-----------|--------------|--------|-------|---------|
| Swin-T | 96 | {2, 2, 6, 2} | 29M | 4.5G | ResNet-50 / DeiT-S |
| Swin-S | 96 | {2, 2, 18, 2} | 50M | 8.7G | ResNet-101 |
| Swin-B | 128 | {2, 2, 18, 2} | 88M | 15.4G | ViT-B / DeiT-B |
| Swin-L | 192 | {2, 2, 18, 2} | 197M | 34.5G | — |

所有变体默认窗口大小 \(M=7\)，每头 query 维度 \(d=32\)，MLP 扩展率 \(\alpha=4\)。

#### 🧪 练习题
```yaml
question: "Swin Transformer 中移动窗口（Shifted Window）机制的主要作用是什么？"
options:
  - "减少模型参数量以提升推理速度"
  - "在不增加计算量的前提下建立相邻窗口之间的信息交互"
  - "将自注意力的复杂度从线性降至对数级别"
  - "替代相对位置偏置以编码空间位置信息"
answer: 1
explain: "W-MSA 仅在窗口内部计算注意力，窗口间无信息流通。SW-MSA 通过将窗口偏移 ⌊M/2⌋ 像素，使原本处于不同窗口边界的 token 在新窗口中相遇，从而建立跨窗口连接，且配合循环移位保持窗口数不变，计算量与 W-MSA 相同。"
```

### ConvNeXt

```yaml
id: convnext
num: 11
name: ConvNeXt
full_name: 现代卷积网络 (A ConvNet for the 2020s)
year: '2022.01'
org: Meta AI
parent: resnet
paper_url: https://arxiv.org/abs/2201.03545
project_url: ''
category: modern_efficient
motivation: 借鉴Transformer技巧现代化改造CNN
```

#### 📝 一句话总结
ConvNeXt 通过系统性地将 Vision Transformer 的设计策略（大核深度可分离卷积、倒瓶颈结构、LayerNorm、GELU 等）逐步移植到标准 ResNet 架构中，证明了纯卷积网络在精度和可扩展性上可以与 Swin Transformer 匹敌甚至超越，在 ImageNet 上达到 87.8% top-1 准确率，同时在 COCO 检测和 ADE20K 分割任务上也优于 Swin Transformer。

#### 🎯 核心要点
- **渐进式现代化路线图**：从标准 ResNet-50 出发，经过 7 步改造逐步逼近并超越 Swin-T（76.1% → 82.0%）
- **现代训练策略**：采用 300 epoch、AdamW、Mixup、CutMix、RandAugment、Stochastic Depth、Label Smoothing 等 Transformer 训练技巧，仅此一项即提升 +2.7%
- **宏观设计调整**：阶段计算比从 (3,4,6,3) 改为 (3,3,9,3)；Stem 从 7×7 conv + maxpool 改为 4×4 stride-4 patchify 卷积
- **深度可分离卷积 + 通道扩展**：采用 depthwise conv 分离空间与通道混合，通道数从 64 扩展到 96（对齐 Swin-T）
- **倒瓶颈结构**：MLP 隐藏维度为输入的 4 倍，与 Transformer FFN 设计一致
- **7×7 大核卷积**：将 depthwise conv 上移至 block 开头并增大到 7×7，模拟 Transformer 的大感受野
- **微观设计**：GELU 替换 ReLU、每 block 仅 1 个激活函数和 1 个 LayerNorm、独立下采样层
- **模型家族**：ConvNeXt-T/S/B/L/XL，参数量和 FLOPs 与 Swin 系列对齐
- **ImageNet-22K 预训练 + ImageNet-1K 微调**：ConvNeXt-XL 达到 87.8% top-1

#### 🔬 深入细节
![ConvNeXt 现代化路线图](https://ar5iv.labs.arxiv.org/html/2201.03545/assets/x2.png)
*图：从标准 ResNet 到 ConvNeXt 的渐进式现代化路线图。每一步改造对应的 ImageNet-1K top-1 准确率变化。*

![ConvNeXt Block 设计对比](https://ar5iv.labs.arxiv.org/html/2201.03545/assets/x4.png)
*图：ResNet、Swin Transformer 和 ConvNeXt 的 block 结构对比。ConvNeXt block 用纯卷积模块实现了与 Transformer block 等价的设计模式。*

##### 算法伪代码

```python
# ConvNeXt Block 伪代码
def convnext_block(x):
    residual = x
    # 1. 7×7 Depthwise Conv（大核空间混合，类似 MSA 的局部窗口注意力）
    x = depthwise_conv7x7(x)       # [B, C, H, W] → [B, C, H, W]
    x = layer_norm(x)
    # 2. 1×1 Conv 升维（倒瓶颈，扩展 4 倍，类似 Transformer FFN）
    x = pointwise_conv(x, C * 4)   # [B, C, H, W] → [B, 4C, H, W]
    x = gelu(x)                    # 唯一的激活函数
    # 3. 1×1 Conv 降维
    x = pointwise_conv(x, C)       # [B, 4C, H, W] → [B, C, H, W]
    # 4. Stochastic Depth + 残差连接
    x = stochastic_depth(x) + residual
    return x

# ConvNeXt 整体架构
def convnext(image):
    # Stem: Patchify（4×4 conv, stride 4）
    x = conv2d(image, kernel=4, stride=4, out_ch=C)  # [B,3,224,224] → [B,C,56,56]
    x = layer_norm(x)

    # Stage 1-4，每个 stage 之间有独立下采样层
    for stage_id in [1, 2, 3, 4]:
        if stage_id > 1:
            x = layer_norm(x)
            x = conv2d(x, kernel=2, stride=2, out_ch=C*2)  # 空间减半，通道翻倍
        for _ in range(num_blocks[stage_id]):
            x = convnext_block(x)

    # 分类头
    x = global_avg_pool(x)         # [B, C_last, H, W] → [B, C_last]
    x = layer_norm(x)
    logits = linear(x, num_classes)
    return logits
```

##### 动机与背景

2020 年代初，Vision Transformer (ViT) 及其层级变体 Swin Transformer 在视觉识别领域迅速崛起，在 ImageNet 分类、COCO 检测、ADE20K 分割等任务上全面超越传统 ConvNet。然而，Swin Transformer 的成功在很大程度上**重新引入了卷积网络的归纳偏置**（层级结构、局部窗口），这引发了一个根本性问题：**ConvNet 与 Transformer 之间的性能差距，究竟源于 Transformer 架构本身的优越性，还是仅仅因为 ConvNet 没有采用现代的训练策略和设计选择？**

ConvNeXt 的核心动机就是回答这个问题。作者从标准 ResNet-50 出发，系统性地将 Swin Transformer 的每一个设计决策"翻译"为卷积网络的等价实现，逐步缩小差距，最终证明**纯卷积网络完全可以达到甚至超越 Transformer 的性能**。

##### 核心机制：七步现代化路线图

ConvNeXt 的方法论本身就是其最大创新——不是提出单一新模块，而是通过**受控实验**逐步改造 ResNet，每一步对应一个从 Transformer 借鉴的设计选择：

**第一步：现代训练策略（76.1% → 78.8%，+2.7%）**

传统 ResNet 使用 90 epoch + SGD 训练。作者改用 Transformer 社区的训练配方：

- 训练 300 epoch，AdamW 优化器
- 数据增强：Mixup、CutMix、RandAugment、Random Erasing
- 正则化：Stochastic Depth、Label Smoothing

> 💡 关键：仅改变训练策略（不改架构），ResNet-50 就从 76.1% 提升到 78.8%，说明传统 ConvNet 与 Transformer 的性能差距中有相当一部分来自训练策略而非架构。

**第二步：宏观设计——阶段计算比（78.8% → 79.4%）**

ResNet-50 的四阶段 block 数为 (3, 4, 6, 3)，而 Swin-T 为 (1:1:3:1) 比例。作者将 block 数调整为 **(3, 3, 9, 3)**，将更多计算集中在第三阶段（分辨率 14×14），与 Swin-T 对齐。

**第三步：宏观设计——Patchify Stem（79.4% → 79.5%）**

将 ResNet 的 7×7 conv stride-2 + maxpool 替换为 **4×4 conv stride-4 的非重叠卷积**，与 ViT/Swin 的 patch embedding 等价。这一步性能变化微小，但简化了网络入口。

**第四步：ResNeXt 化——深度可分离卷积（79.5% → 80.5%）**

采用 **depthwise convolution**（分组数 = 通道数），实现空间与通道信息的分离混合，这与 Transformer 中 MSA（空间混合）和 FFN（通道混合）的分离设计理念一致。同时将网络宽度从 64 扩展到 96 以补偿容量。

$$\text{Depthwise Conv: } y_c = \sum_{(i,j) \in \mathcal{N}} w_c^{(i,j)} \cdot x_c^{(i,j)}, \quad \forall c \in \{1,...,C\}$$

每个通道独立进行空间卷积，再通过 \(1 \times 1\) pointwise conv 进行通道间信息交换。

**第五步：倒瓶颈结构（80.5% → 80.6%）**

Transformer FFN 的隐藏维度是输入的 4 倍，形成"窄→宽→窄"的倒瓶颈。作者将 ResNet block 从传统的"宽→窄→宽"瓶颈改为 **倒瓶颈**（expansion ratio = 4），与 MobileNetV2 的设计一致。

> ⚠️ 注意：倒瓶颈在 ResNet-50 级别提升微小（+0.1%），但在 ResNet-200 级别带来显著提升（+0.7%），说明该设计在大模型中更有效。

**第六步：大核卷积（80.6% → 80.6%，但为后续微观设计奠定基础）**

这一步包含两个子操作：

1. **上移 depthwise conv**：将其从 block 中间移到开头（类似 Transformer 中 MSA 在 FFN 之前），使大核卷积作用在低维空间，降低计算量
2. **增大卷积核到 7×7**：实验了 3/5/7/9/11 多种核大小，发现 **7×7 是最佳平衡点**，与 Swin Transformer 的 7×7 窗口大小一致

$$\text{感受野对比: } \underbrace{3 \times 3}_{\text{ResNet}} \ll \underbrace{7 \times 7}_{\text{ConvNeXt/Swin}}$$

**第七步：微观设计（80.6% → 82.0%，+1.4%）**

这是提升最大的一步，包含四个子改动：

| 改动 | 准确率变化 | 说明 |
|------|-----------|------|
| ReLU → GELU | 80.6%（不变） | 更平滑的激活函数，与 BERT/GPT 一致 |
| 减少激活函数数量 | → 81.3%（+0.7%） | 每 block 仅在两个 1×1 conv 之间保留 1 个 GELU |
| 减少归一化层数量 | → 81.4%（+0.1%） | 每 block 仅保留 1 个归一化层 |
| BN → LN | → 81.5%（+0.1%） | LayerNorm 替换 BatchNorm |
| 独立下采样层 | → 82.0%（+0.5%） | 用 2×2 stride-2 conv 替代 stride-2 残差块，阶段间加 LN 稳定训练 |

> 💡 关键：减少激活函数数量（+0.7%）是微观设计中增益最大的单项改动，说明 Transformer 中"稀疏非线性"的设计哲学对 ConvNet 同样有效。

##### 模型家族与扩展性

ConvNeXt 定义了 5 个规模变体，与 Swin Transformer 严格对齐：

| 模型 | 通道数 \(C\) | Block 数 \(B\) | 参数量 | FLOPs |
|------|-------------|---------------|--------|-------|
| ConvNeXt-T | (96, 192, 384, 768) | (3, 3, 9, 3) | 29M | 4.5G |
| ConvNeXt-S | (96, 192, 384, 768) | (3, 3, 27, 3) | 50M | 8.7G |
| ConvNeXt-B | (128, 256, 512, 1024) | (3, 3, 27, 3) | 89M | 15.4G |
| ConvNeXt-L | (192, 384, 768, 1536) | (3, 3, 27, 3) | 198M | 34.4G |
| ConvNeXt-XL | (256, 512, 1024, 2048) | (3, 3, 27, 3) | 350M | 60.9G |

在 ImageNet-22K 预训练 + ImageNet-1K 微调的设置下，ConvNeXt-XL 达到 **87.8% top-1 准确率**，超越 Swin-L（87.3%）。在 COCO 目标检测（Cascade Mask R-CNN 框架）和 ADE20K 语义分割（UperNet 框架）上，ConvNeXt 同样全面超越对应规模的 Swin Transformer。

##### 与传统方法的核心区别

| 维度 | ResNet | Swin Transformer | ConvNeXt |
|------|--------|-------------------|----------|
| 基本算子 | 3×3 标准卷积 | 窗口自注意力 + Shifted Window | 7×7 深度可分离卷积 + 1×1 卷积 |
| 归一化 | BatchNorm | LayerNorm | LayerNorm |
| 激活函数 | 每层 ReLU | 每 block 1 个 GELU | 每 block 1 个 GELU |
| 瓶颈结构 | 标准瓶颈（宽→窄→宽） | FFN 倒瓶颈 | 倒瓶颈（窄→宽→窄） |
| Stem | 7×7 conv + maxpool | 4×4 patch embed | 4×4 patchify conv |
| 下采样 | Stride-2 残差块 | Patch merging | 独立 2×2 stride-2 conv + LN |
| 特殊模块 | 无 | Shifted Window、相对位置偏置 | 无（纯标准卷积） |

ConvNeXt 最重要的贡献不是某个单一的新模块，而是**证明了通过系统性地采用现代设计选择，纯卷积网络完全可以匹敌 Transformer**，且不需要任何专用模块（如 shifted window attention 或相对位置编码），保持了卷积网络的简洁性和硬件友好性。

#### 🧪 练习题
```yaml
question: "在 ConvNeXt 的渐进式现代化过程中，以下哪项微观设计改动带来了最大的单步精度提升？"
options:
  - "将 ReLU 替换为 GELU 激活函数"
  - "将 BatchNorm 替换为 LayerNorm"
  - "减少每个 block 中激活函数的数量（仅保留 1 个 GELU）"
  - "将卷积核从 3×3 增大到 7×7"
answer: 2
explain: "减少激活函数数量（从每层都有 ReLU 到每 block 仅 1 个 GELU）带来了 +0.7% 的提升（80.6% → 81.3%），是微观设计中增益最大的单项改动，体现了 Transformer 中稀疏非线性的设计哲学。"
```

### ConvNeXt V2

```yaml
id: convnext_v2
num: 12
name: ConvNeXt V2
full_name: 现代卷积网络V2 (ConvNeXt V2)
year: '2023.01'
org: Meta AI
parent: convnext
paper_url: https://arxiv.org/abs/2301.00808
project_url: ''
category: modern_efficient
motivation: 引入全卷积掩码自编码器和全局响应归一化
```

#### 📝 一句话总结
ConvNeXt V2 提出了全卷积掩码自编码器（FCMAE）预训练框架和全局响应归一化（GRN）层，通过协同设计解决了卷积网络在掩码图像建模中的特征坍塌问题，首次在从 3.7M 到 650M 参数的广泛模型谱系中验证了掩码预训练对 ConvNet 的有效性，最终以纯卷积架构在 ImageNet 上达到 88.9% 的 SOTA 精度。

#### 🎯 核心要点
- **FCMAE 预训练框架**：基于稀疏卷积的全卷积掩码自编码器，使 ConvNet 能高效进行掩码图像建模预训练
- **GRN（全局响应归一化）层**：通过全局特征聚合、归一化和校准三步操作增强通道间特征竞争，解决自监督预训练中的特征坍塌问题
- **协同设计理念**：FCMAE + GRN 单独使用效果有限，组合使用产生显著协同增益（V2-B: 84.6% vs V1-B supervised: 83.8%）
- **8 种模型尺寸**：Atto(3.7M)、Femto(5.2M)、Pico(9.1M)、Nano(15.6M)、Tiny(28M)、Base(89M)、Large(198M)、Huge(659M)
- **全面的下游任务验证**：ImageNet 分类（88.9%）、COCO 检测/分割（AP^box 55.7）、ADE20K 语义分割（mIoU 57.0）
- **稀疏卷积编码**：使用 MinkowskiEngine 的 submanifold sparse convolution 实现对可见 patch 的高效编码，避免掩码信息泄露

#### 🔬 深入细节
![ConvNeXt V2 模型缩放与性能对比](https://ar5iv.labs.arxiv.org/html/2301.00808/assets/x1.png)
*图1：ConvNeXt V2 + FCMAE 在所有模型尺寸上均超越监督训练基线，展示了强大的模型缩放能力*

![FCMAE 框架示意图](https://ar5iv.labs.arxiv.org/html/2301.00808/assets/figs/convmae_teaser.png)
*图2：FCMAE 预训练框架概览——稀疏卷积编码器处理可见 patch，轻量解码器重建被掩码像素*

![特征激活可视化](https://ar5iv.labs.arxiv.org/html/2301.00808/assets/figs/feat_act_qual.png)
*图3：特征激活对比——无 GRN 时出现严重特征坍塌（多通道激活相同），加入 GRN 后通道间呈现多样化响应*

##### 算法伪代码

```python
# FCMAE 预训练流程
def fcmae_pretrain(image, model, decoder, mask_ratio=0.6):
    # 1. 随机掩码生成 (patch size 32x32)
    mask = random_mask(image, ratio=mask_ratio, patch_size=32)
    
    # 2. 稀疏卷积编码（仅处理可见patch）
    visible_patches = apply_mask(image, mask)  # 转为稀疏张量
    features = sparse_encoder(visible_patches)  # SubmanifoldSparseConv
    
    # 3. 密集化 + 轻量解码器重建
    dense_features = densify(features)  # 稀疏→密集，掩码位置填0
    reconstruction = decoder(dense_features)  # 单ConvNeXt Block
    
    # 4. 仅在掩码区域计算MSE损失
    loss = mse_loss(reconstruction[mask], image[mask])
    return loss

# GRN 层实现
class GRN(nn.Module):
    def __init__(self, dim):
        self.gamma = nn.Parameter(torch.zeros(1, 1, 1, dim))
        self.beta = nn.Parameter(torch.zeros(1, 1, 1, dim))
    
    def forward(self, x):  # x: (B, H, W, C)
        gx = torch.norm(x, p=2, dim=(1, 2), keepdim=True)  # 全局特征聚合 G(X)
        nx = gx / (gx.mean(dim=-1, keepdim=True) + 1e-6)   # 响应归一化 N(·)
        return self.gamma * (x * nx) + self.beta + x         # 校准 + 残差
```

##### 动机与背景

掩码图像建模（Masked Image Modeling, MIM）已在 Vision Transformer 上取得巨大成功（MAE、BEiT、SimMIM），但将其直接应用于卷积网络面临两个核心挑战：

1. **架构不兼容**：Transformer 可通过丢弃掩码 token 实现高效编码，而标准卷积必须处理所有空间位置，无法自然地"跳过"掩码区域。直接将掩码位置填零会导致训练-测试分布不一致，且掩码信息通过卷积核的感受野泄露到可见区域。

2. **特征坍塌**：实验发现，即使解决了架构问题，ConvNeXt 在 FCMAE 预训练后会出现严重的特征坍塌——不同通道的特征激活高度相似，模型学到的表征缺乏多样性，导致微调性能受限。

##### 核心机制一：FCMAE 框架

FCMAE（Fully Convolutional Masked AutoEncoder）的设计要点：

**稀疏卷积编码器**：采用 MinkowskiEngine 中的 submanifold sparse convolution 替代标准卷积。该操作仅在输入非零位置进行卷积计算，输出也仅保留对应位置的值。这确保了：
- 掩码区域不参与计算，避免信息泄露
- 计算量与可见 patch 数量成正比，提升效率
- 编码器保持 ConvNeXt 的完整架构不变

**掩码策略**：使用 \(32 \times 32\) 的 patch 大小和 0.6 的掩码比例。相比 MAE 的 \(16 \times 16\) patch + 0.75 比例，更大的 patch 更适合卷积网络的层级下采样结构（经过 4 倍下采样后仍保持合理的稀疏粒度）。

**轻量解码器**：仅使用单个 ConvNeXt Block 作为解码器，将编码器输出密集化后进行像素重建。损失函数为仅在掩码区域计算的 MSE：

$$\mathcal{L} = \frac{1}{|\mathcal{M}|} \sum_{i \in \mathcal{M}} \| \hat{x}_i - x_i \|^2$$

> 💡 关键：轻量解码器的设计迫使编码器承担更多的语义理解任务，而非将重建能力依赖于解码器。

##### 核心机制二：GRN 层

GRN（Global Response Normalization）层通过三步操作解决特征坍塌：

**Step 1 - 全局特征聚合 \(G(\cdot)\)**：对每个通道在空间维度上计算 L2 范数，获得全局统计量：

$$G(X)_i = \| X_i \|_2 = \sqrt{\sum_{h,w} X_{i,h,w}^2}$$

其中 \(X_i\) 是第 \(i\) 个通道的特征图。

**Step 2 - 响应归一化 \(N(\cdot)\)**：通过除法归一化实现通道间竞争：

$$N(g_i) = \frac{g_i}{\sum_{j=1}^{C} g_j}$$

这使得每个通道的重要性相对于其他通道进行衡量——如果某个通道的全局响应远高于平均水平，其归一化值接近 1；反之接近 0。

**Step 3 - 特征校准与残差**：

$$X_i = \gamma \cdot X_i \cdot N(G(X)_i) + \beta + X_i$$

其中 \(\gamma, \beta\) 为可学习参数，初始化为零。零初始化确保 GRN 在训练初期等价于恒等映射，不破坏预训练模型的初始行为。

> ⚠️ 注意：GRN 与 SE-Net 的通道注意力不同——SE 使用 sigmoid 压缩到 [0,1] 进行"门控"，而 GRN 使用除法归一化实现"竞争"，允许值大于 1，更有效地促进通道多样性。

##### 协同设计的重要性

| 配置 | ImageNet-1K Top-1 |
|------|-------------------|
| ConvNeXt V1 + Supervised | 83.8% |
| ConvNeXt V1 + FCMAE | 83.5% |
| ConvNeXt V2 (w/ GRN) + Supervised | 84.0% |
| **ConvNeXt V2 + FCMAE** | **84.6%** |

单独使用 FCMAE（无 GRN）甚至略低于监督基线；单独使用 GRN（监督训练）仅提升 0.2%。但两者组合后产生 0.8% 的显著提升，验证了"模型架构与学习框架需要协同设计"的核心论点。

##### 模型配置与缩放

ConvNeXt V2 采用 4 阶段层级结构，通道数逐阶段翻倍：

| 模型 | 参数量 | 基础通道 C | Block 分布 (B) | IN-1K Acc |
|------|--------|-----------|----------------|-----------|
| Atto | 3.7M | 40 | (2,2,6,2) | 76.7% |
| Femto | 5.2M | 48 | (2,2,6,2) | 78.5% |
| Pico | 9.1M | 64 | (2,2,6,2) | 80.3% |
| Nano | 15.6M | 80 | (2,2,8,2) | 81.9% |
| Tiny | 28M | 96 | (3,3,9,3) | 83.0% |
| Base | 89M | 128 | (3,3,27,3) | 84.9% |
| Large | 198M | 192 | (3,3,27,3) | 85.8% |
| Huge | 659M | 352 | (3,3,27,3) | 86.3% |

##### 与现有方法的对比

**vs. MAE (ViT)**：在 Base/Large 规模下性能相当（84.9 vs 83.6 / 85.8 vs 85.9），但 ConvNeXt V2-L 仅用 198M 参数即达到 ViT-L (307M) 的水平。在 Huge 规模下略有差距（86.3 vs 86.9），但通过 IN-22K 中间微调可弥补。

**vs. SimMIM (Swin)**：在所有模型尺寸上均超越 Swin + SimMIM（Base: 84.9 vs 84.0, Large: 85.8 vs 85.4, Huge: 86.3 vs 85.7）。

**下游任务迁移**：
- COCO 检测：V2-H AP^box = 55.7（vs Swin V2-H 54.4）
- ADE20K 分割：V2-H mIoU = 55.0（vs Swin V2-H 54.2），加 IN-22K 微调达 57.0

#### 🧪 练习题
```yaml
question: "ConvNeXt V2 中 GRN 层的可学习参数 γ 和 β 初始化为零的主要原因是什么？"
options:
  - "减少模型参数量，加速训练收敛"
  - "确保训练初期 GRN 等价于恒等映射，不破坏网络初始行为"
  - "防止梯度爆炸，稳定反向传播"
  - "使 GRN 层在推理时可以被完全移除"
answer: 1
explain: "γ=0, β=0 时 GRN 输出为 0·X·N(G(X)) + 0 + X = X，即恒等映射。这保证了 GRN 在训练初期不改变网络行为，随训练逐步学习有意义的通道竞争模式。"
```

### MambaVision

```yaml
id: mambavision
num: 13
name: MambaVision
full_name: Mamba视觉模型 (Mamba Vision Model)
year: '2024.07'
org: NVIDIA
parent: swin_transformer
paper_url: https://arxiv.org/abs/2407.08083
project_url: ''
category: modern_efficient
motivation: 混合Mamba与Transformer获得更优精度吞吐比
```

#### 📝 一句话总结
MambaVision 提出了一种混合 Mamba-Transformer 视觉骨干网络，通过重新设计 Mamba 块（去除因果卷积、增加对称分支）并在最终层引入自注意力机制，在 ImageNet-1K 上实现了精度-吞吐量的新 SOTA Pareto 前沿。

#### 🎯 核心要点
- **混合架构设计**：4 阶段层级结构，Stage 1-2 使用 CNN 残差块进行高分辨率快速特征提取，Stage 3-4 使用 MambaVision Mixer + Transformer 块（各占 N/2 层）
- **MambaVision Mixer 创新**：(1) 用普通卷积替换因果卷积消除方向性限制；(2) 增加无 SSM 的对称分支作为 token mixer 补偿序列建模的信息损失；(3) 双分支各投影到 C/2 维度后拼接
- **自注意力补充**：在 Stage 3-4 的后半部分使用标准 self-attention 块恢复全局上下文建模能力
- **SOTA 性能**：MambaVision-B 以 84.2% Top-1 / 3670 img/s 超越 ConvNeXt-B (83.8% / 1485) 和 Swin-B (83.5% / 1245)，吞吐量提升 2-3 倍
- **下游任务验证**：在 COCO 目标检测/实例分割和 ADE20K 语义分割上均超越同等规模的 Swin 和 ConvNeXt 骨干

#### 🔬 深入细节
##### 4.1 示意图

**整体架构：**

![MambaVision Architecture](https://ar5iv.labs.arxiv.org/html/2407.08083/assets/x2.png)

MambaVision 采用 4 阶段层级架构。Stem 由两个 3×3 卷积（stride=2）组成，将输入图像从 $H \times W \times 3$ 转换为 $\frac{H}{4} \times \frac{W}{4} \times C$ 的特征图。各阶段之间通过 3×3 卷积（stride=2）进行下采样。

**MambaVision Mixer 结构：**

![MambaVision Mixer](https://ar5iv.labs.arxiv.org/html/2407.08083/assets/x3.png)

MambaVision Mixer 的核心创新在于双分支设计：一条分支包含 SSM（Selective Scan）进行序列建模，另一条对称分支仅使用卷积+激活进行空间特征混合，两者拼接后通过线性层投影回原始维度。

##### 4.2 伪代码

```python
# MambaVision Mixer - PyTorch-like Pseudocode
class MambaVisionMixer(nn.Module):
    def __init__(self, dim, d_state=16, kernel_size=3):
        super().__init__()
        self.in_proj = nn.Linear(dim, dim)  # project to dim (split into 2 x dim//2)
        # SSM branch (x path)
        self.conv1d_x = nn.Conv1d(dim//2, dim//2, kernel_size, padding='same', groups=dim//2)
        self.x_proj = nn.Linear(dim//2, dt_rank + d_state*2)  # project to dt, B, C
        self.dt_proj = nn.Linear(dt_rank, dim//2)
        # Symmetric branch (z path) - NO SSM
        self.conv1d_z = nn.Conv1d(dim//2, dim//2, kernel_size, padding='same', groups=dim//2)
        # Output projection
        self.out_proj = nn.Linear(dim, dim)
    
    def forward(self, hidden_states):
        # Input projection and split into two branches
        xz = rearrange(self.in_proj(hidden_states), 'b l d -> b d l')
        x, z = xz.chunk(2, dim=1)  # each: [B, C//2, L]
        
        # Branch 1: Conv + SiLU + SSM (Selective Scan)
        x = F.silu(self.conv1d_x(x))         # regular (non-causal) conv
        dt, B, C = self.x_proj(x)            # input-dependent parameters
        x_ssm = selective_scan(x, dt, A, B, C, D)  # SSM forward
        
        # Branch 2: Conv + SiLU only (no SSM)
        z = F.silu(self.conv1d_z(z))          # spatial mixing without SSM
        
        # Concatenate and project
        output = rearrange(torch.cat([x_ssm, z], dim=1), 'b d l -> b l d')
        return self.out_proj(output)
```

**整体 Block 结构：**
```python
# Stage 3-4 Layer: first N/2 layers use MambaVision Mixer, last N/2 use Self-Attention
X_hat = Mixer(LayerNorm(X)) + X       # Token mixing (Mamba or Attention)
X_out = MLP(LayerNorm(X_hat)) + X_hat  # Channel mixing
```

##### 4.3 方法细节

**宏观架构设计哲学。** MambaVision 的核心设计理念是"分而治之"：在高分辨率的早期阶段（Stage 1-2），使用计算高效的 CNN 残差块（3×3 Conv + BatchNorm + GELU）进行快速局部特征提取；在低分辨率的后期阶段（Stage 3-4），使用 MambaVision Mixer 和 Transformer 块进行全局特征建模。这种分层策略避免了在高分辨率特征图上运行复杂的 SSM 或注意力机制，显著提升了推理吞吐量。作者通过系统实验发现，将 Transformer 块放在最终层（而非均匀分布或放在早期层）能最有效地恢复全局上下文建模能力。

**MambaVision Mixer 的关键改进。** 原始 Mamba 块为 NLP 设计，存在两个不适合视觉任务的问题：(1) 因果卷积（causal conv）限制了信息只能单向流动，而视觉特征本质上是二维且无方向性的；(2) SSM 的序列约束可能丢失部分空间信息。MambaVision 通过两个改进解决这些问题：首先，将因果卷积替换为普通卷积（padding='same'），允许双向信息流动；其次，增加一条不含 SSM 的对称分支，仅通过卷积+SiLU 激活进行空间特征混合，补偿 SSM 序列建模可能丢失的内容。消融实验验证了每个改进的贡献：去因果性 +0.4%，加对称分支 +0.4%，使用拼接融合 +1.0%，总计从 80.5% 提升到 82.3%。

**SSM 数学基础与选择性机制。** MambaVision 中的 SSM 分支基于 Mamba 的选择性状态空间模型。连续时间 SSM 定义为 $h'(t) = \mathbf{A}h(t) + \mathbf{B}x(t)$，$y(t) = \mathbf{C}h(t)$，通过零阶保持（ZOH）离散化为 $\bar{\mathbf{A}} = \exp(\Delta \mathbf{A})$，$\bar{\mathbf{B}} = (\Delta \mathbf{A})^{-1}(\exp(\Delta \mathbf{A}) - \mathbf{I}) \cdot \Delta \mathbf{B}$。Mamba 的核心创新是使参数 $B$、$C$、$\Delta$ 依赖于输入（通过线性投影），实现选择性信息过滤。在 MambaVision 中，SSM 仅作用于 C/2 维度的子空间，另一半通过对称分支处理，这既保留了 SSM 的长程建模能力，又通过并行分支增强了局部空间特征的保留。

**训练策略与模型变体。** 所有模型在 ImageNet-1K 上训练 300 epochs，使用余弦衰减学习率调度（含 20 epochs warmup 和 cooldown），LAMB 优化器（比 AdamW 对高学习率更鲁棒），全局 batch size 4096，初始学习率 0.005，权重衰减 0.05，使用 32 张 A100 GPU。模型提供 T/T2/S/B/L/L2 六个变体，参数量从 31.8M 到 241.5M，覆盖从轻量到大规模的不同需求。各变体在 ImageNet-1K 上的表现如下：

| 模型 | Params (M) | FLOPs (G) | Throughput (img/s) | Top-1 (%) |
|------|-----------|-----------|-------------------|-----------|
| MambaVision-T | 31.8 | 4.4 | 6298 | 82.3 |
| MambaVision-T2 | 35.1 | 5.1 | 5990 | 82.7 |
| MambaVision-S | 50.1 | 7.5 | 4700 | 83.3 |
| MambaVision-B | 97.7 | 15.0 | 3670 | 84.2 |
| MambaVision-L | 227.9 | 34.9 | 2190 | 85.0 |
| MambaVision-L2 | 241.5 | 37.5 | 1021 | 85.3 |

**下游任务表现。** 在 MS COCO 上使用 Mask R-CNN，MambaVision-T 达到 box AP 46.4 / mask AP 41.8，超越 ConvNeXt-T 和 Swin-T。使用 Cascade Mask R-CNN，MambaVision-S 达到 48.2 box AP，MambaVision-B 达到 49.1 box AP。在 ADE20K 语义分割（UPerNet）上，MambaVision-T/S/B 分别达到 46.6/48.2/49.1 mIoU，均超越同等规模竞争模型。

##### 4.4 公式

**SSM 连续形式：**

$$h'(t) = \mathbf{A}h(t) + \mathbf{B}x(t), \quad y(t) = \mathbf{C}h(t)$$

**ZOH 离散化：**

$$\bar{\mathbf{A}} = \exp(\Delta \mathbf{A}), \quad \bar{\mathbf{B}} = (\Delta \mathbf{A})^{-1}(\exp(\Delta \mathbf{A}) - \mathbf{I}) \cdot \Delta \mathbf{B}$$

**离散递推：**

$$h_k = \bar{\mathbf{A}} h_{k-1} + \bar{\mathbf{B}} x_k, \quad y_k = \mathbf{C} h_k + \mathbf{D} x_k$$

**MambaVision Mixer 公式：**

$$X_1 = \text{Scan}(\sigma(\text{Conv}(\text{Linear}_{C \to C/2}(X_{in}))))$$

$$X_2 = \sigma(\text{Conv}(\text{Linear}_{C \to C/2}(X_{in})))$$

$$X_{out} = \text{Linear}_{C \to C}(\text{Concat}(X_1, X_2))$$

**Layer 结构：**

$$\hat{X}^n = \text{Mixer}(\text{Norm}(X^{n-1})) + X^{n-1}$$

$$X^n = \text{MLP}(\text{Norm}(\hat{X}^n)) + \hat{X}^n$$

#### 🧪 练习题
```yaml
1. **[概念理解]** MambaVision 为什么要将因果卷积替换为普通卷积？这对视觉任务有什么好处？

2. **[架构设计]** 为什么 MambaVision 选择在 Stage 3-4 的后半部分使用 Self-Attention 而非全部使用 MambaVision Mixer？如果全部使用 Mixer 会有什么问题？

3. **[计算分析]** MambaVision Mixer 将输入分为两个 C/2 维度的分支，相比原始 Mamba 在完整 C 维度上运行 SSM，这种设计如何影响计算量和参数量？

4. **[实验分析]** 从消融实验来看（80.5→80.9→81.3→82.3），哪个改进贡献最大？为什么拼接（concat）比不拼接（w/o concat）效果好这么多？

5. **[对比思考]** MambaVision-B (84.2%, 3670 img/s) vs Swin-B (83.5%, 1245 img/s)：为什么 MambaVision 能同时在精度和速度上超越 Swin？从架构角度分析原因。
```

### Jumbo Token

```yaml
id: jumbo_token
num: 14
name: Jumbo Token
full_name: 巨型Token高效ViT (Jumbo Token for Fast Plain Vision Transformers)
year: '2026.01'
org: Carleton University / UBC / Vector Institute
parent: vit
paper_url: https://arxiv.org/abs/2502.15021
project_url: ''
category: modern_efficient
motivation: 引入巨型Token加速平原ViT，大幅提升吞吐量
```

#### 📝 一句话总结
Jumbo Token 通过给 plain ViT 引入一个更宽的全局 token，并让它拥有独立且跨层共享的 FFN，在几乎不破坏 ViT 接口的前提下显著提升了速度-精度权衡。

#### 🎯 核心要点
- 保持 plain ViT 的 attention-only、non-hierarchical 结构，不引入卷积或层级金字塔。
- 用一个宽度为 patch token \(J\) 倍的 Jumbo token 替代普通 CLS token。
- 自注意力前把 Jumbo token 拆成多个标准宽度 token，注意力后再拼回去。
- 为 Jumbo token 配置独立 FFN，并在所有层之间共享该 FFN 参数以节省内存。
- 在 ImageNet-1K、ImageNet-21K、ADE20K 和 MAE 预训练上都优于 ViT+Registers 基线。

#### 🔬 深入细节
![Jumbo Token 仓库示意图](https://raw.githubusercontent.com/antofuller/jumbo/main/sophia.png)
*图：Jumbo Token 官方仓库配图。该工作关注在不破坏 plain ViT 结构接口的前提下，用更宽的全局 token 提高容量与吞吐表现。*

```python
# Jumbo Token 核心流程
patch_tokens = patch_embed(image)                 # [N, D]
jumbo = jumbo_token.expand(1, J * D)             # [1, J*D]

for layer in layers:
    jumbo_split = jumbo.view(J, D)               # attention 前拆成 J 个标准 token
    tokens = concat([jumbo_split, patch_tokens], dim=0)
    tokens = self_attention(tokens)
    jumbo_split, patch_tokens = tokens[:J], tokens[J:]
    jumbo = jumbo_split.reshape(1, J * D)        # attention 后重新拼接
    jumbo = jumbo + jumbo_ffn_shared(jumbo)      # Jumbo 独立 FFN
    patch_tokens = patch_tokens + patch_ffn(patch_tokens)

logits = classifier(jumbo)
```

Jumbo 的出发点是一个很实用的观察：plain ViT 的主要代价来自所有 patch token 的宽度和数量，但全局分类 token 只占极少一部分计算。如果直接把所有 token 一起加宽，模型会更贵；如果只把全局 token 做宽，则有机会以很低代价提升全局汇聚能力。

论文因此把传统 CLS token 改造成一个更宽的 Jumbo token。设 patch token 宽度为 \(D\)，则 Jumbo token 宽度为 \(J \cdot D\)。为了兼容标准多头注意力，进入注意力层之前先把它拆成 \(J\) 个宽度为 \(D\) 的 token，与 patch token 一起做普通 self-attention；注意力完成后再把这 \(J\) 个 token 按通道维重新拼回一个大 token。这样整个模型仍然保持 plain ViT 的接口和行为习惯。

真正的容量提升来自 Jumbo token 的专属 FFN。普通 patch token 继续走共享的 patch FFN，而 Jumbo token 走一个更宽的独立 FFN。由于这个 FFN 只处理一个 token，计算成本相对很低；论文进一步把它在层间共享，以控制参数量和显存开销。核心思想可以理解为：把额外模型容量集中投入到“全局汇聚通道”，而不是平均分摊给所有 patch。

这种设计为什么有效？作者认为，很多视觉分类任务瓶颈不在局部 patch 表达，而在全局信息如何被高效汇聚到分类头。Jumbo 让模型在几乎不改变基础架构的前提下，拥有一个更强的“全局思考槽位”。因此它尤其适合本来就偏窄、偏快的 plain ViT 变体，在小模型上收益更明显。

#### 🧪 练习题
```yaml
question: "Jumbo Token 为什么能在保持 plain ViT 结构的同时提升效率？"
options:
  - "因为它把所有 patch token 都改成了更宽的 token"
  - "因为它只扩大全局 token 的容量，并在注意力前后做拆分/拼接，额外成本主要集中在单个全局 token 上"
  - "因为它完全移除了 FFN"
  - "因为它把自注意力改成卷积"
answer: 1
explain: "Jumbo 只放大全局 token，而不是所有 patch token；这样既保留了 plain ViT 接口，又把额外容量集中在代价最低的全局路径上。"
```

### Raptor

```yaml
id: raptor
num: 15
name: Raptor
full_name: 块递归视觉Transformer近似 (Recurrent Approximations to Phase-structured TransfORmers)
year: '2026.01'
org: Harvard University / Osnabrück University
parent: vit
paper_url: https://arxiv.org/abs/2512.19941
project_url: ''
category: modern_efficient
motivation: 发现ViT块递归结构，用少量权重共享块逼近深层ViT
```

#### 📝 一句话总结
Raptor 提出训练一个由少量共享块递归展开的 ViT 近似模型，验证了深层 ViT 内部存在显著的块递归结构，并用极少的不同 block 逼近原模型的大部分分类能力。

#### 🎯 核心要点
- 提出 Block-Recurrent Hypothesis，认为训练好的 ViT 深度方向可分成少数重复计算阶段。
- 用表征相似矩阵和 max-cut 方法自动发现 block phase 边界。
- 训练权重共享的 recurrent surrogate，即 Raptor，去重建原始 ViT 的层间表示轨迹。
- 在 DINOv2 上仅用 2 到 3 个递归 block 就恢复了原模型大部分线性探测精度。
- 该工作更偏“机制解释 + 可重构性验证”，而不仅仅是压缩部署。

#### 🔬 深入细节
![Raptor 项目标识](https://raw.githubusercontent.com/KempnerInstitute/raptor/main/assets/raptor_logo.png)
*图：Raptor 官方项目页标识。该工作关注 ViT 深度方向是否存在可重用的递归计算阶段。*

```python
# Raptor 近似训练流程
teacher = pretrained_vit()
phases = discover_phases_via_similarity(teacher)
blocks = [init_from_phase(p) for p in phases[:k]]   # k << L

def raptor_forward(x):
    h = patch_embed(x)
    for t in range(L):
        h = blocks[phase_id(t)](h)                  # 复用少量共享 block
    return h

loss = tf_loss(hidden_pred, hidden_teacher) + ar_loss(unrolled_pred, hidden_teacher)
opt.step()
```

Raptor 的出发点并不是传统意义上的“做一个更快模型”，而是一个更基础的问题：ViT 的很多层是否真的都在做彼此不同的计算？论文通过层间表征相似度矩阵发现，许多训练好的 ViT 在深度方向会出现若干连续 phase，同一 phase 内多层的表征变化模式高度相似。

基于这个观察，作者提出 Block-Recurrent Hypothesis：一个深层 ViT 可以被重写为少量不同 block 反复展开的递归系统。Raptor 就是这种假设的构造性验证。它并不只是模仿最终分类结果，而是尽量重建原 ViT 从浅层到深层的整个隐藏状态轨迹，因此训练目标既包括 teacher forcing 的逐层拟合，也包括真正展开后的自回归式层间重建。

从动力系统视角看，这意味着 ViT 的深度计算并非任意堆叠，而更像若干阶段性更新规则反复作用于表征。论文里最有意思的结论是：在 DINOv2 这类 foundation ViT 上，仅用极少数共享 block，就能恢复绝大部分 ImageNet 线性探测精度，并保持接近的运行成本。这说明很多深层 block 的功能具有高度复用性。

Raptor 的价值主要在两个方向。第一，它为 ViT 压缩、共享参数和递归化设计提供了直接证据；第二，它给解释性研究提供了一个更低复杂度的对象，因为你不必再把每一层都当作独立模块分析，而可以研究少量递归动力学单元如何驱动表征演化。

#### 🧪 练习题
```yaml
question: "Raptor 试图验证的核心假设是什么？"
options:
  - "ViT 的所有层都必须保持完全独立才能工作"
  - "训练好的 ViT 在深度方向可被少量不同 block 递归展开近似"
  - "卷积一定优于 Transformer"
  - "分类性能完全由 patch embedding 决定"
answer: 1
explain: "Raptor 的 Block-Recurrent Hypothesis 认为，深层 ViT 的计算可被压缩成少量可重用 block 反复展开。"
```

### VMamba

```yaml
id: vmamba
num: 16
name: VMamba
full_name: '视觉状态空间模型 (VMamba: Visual State Space Model)'
year: '2024.01'
org: 中国科学院大学 / 华为 / 鹏城实验室
parent: swin_transformer
paper_url: https://arxiv.org/abs/2401.10166
project_url: ''
category: modern_efficient
motivation: 以2D选择性扫描实现线性复杂度全局建模
```

#### 📝 一句话总结
VMamba 把 Mamba 状态空间模型扩展到二维视觉场景，通过 2D Selective Scan 在保持线性复杂度的同时获得全局感受野，成为视觉状态空间模型路线中的代表工作。

#### 🎯 核心要点
- 提出 Visual State-Space (VSS) block，把 Mamba 从 1D 序列推广到 2D 图像。
- 核心模块 SS2D 用四条扫描路径在二维特征图上执行选择性扫描。
- 保持全局感受野和输入缩放效率，对高分辨率输入更友好。
- 采用分层主干结构，可直接迁移到分类、检测和分割任务。
- 在 ImageNet 分类和下游视觉任务上显示出优于多种 CNN/ViT 基线的效率表现。

#### 🔬 深入细节
![VMamba 整体架构图](https://raw.githubusercontent.com/MzeroMiko/VMamba/main/assets/architecture.png)
*图：VMamba 用分层 VSS block 堆叠成视觉主干，并在每个 block 内通过 SS2D 完成二维全局信息聚合。*

```python
# VMamba 的 SS2D 思路
def ss2d(x):
    routes = [
        scan_left_to_right(x),
        scan_right_to_left(x),
        scan_top_to_bottom(x),
        scan_bottom_to_top(x),
    ]
    outputs = [selective_scan(route) for route in routes]
    return merge_routes(outputs)

def vss_block(x):
    x = x + ss2d(layer_norm(x))
    x = x + mlp(layer_norm(x))
    return x
```

视觉版 Mamba 最大的问题，是原始 Mamba 面向一维序列，而图像本质上是二维结构。若简单把图像拉平成一条长序列，再直接用 1D selective scan，空间邻接关系会被严重扭曲。VMamba 的关键贡献，就是用 SS2D 解决这个结构错位问题。

SS2D 的基本思路是从多个方向遍历二维特征图。论文采用四条扫描路线，让状态传播不只依赖单一序列顺序，而是分别从水平和垂直两个维度的正反方向收集上下文。这样每个位置都能通过多路扫描接收到更完整的全局信息。相比自注意力，扫描式计算不需要显式构造 token 两两交互矩阵，因此复杂度更接近线性。

从机制上看，VMamba 保留了 Mamba 的“输入依赖参数”思想，也就是根据当前内容动态控制状态更新与信息选择。它既不是纯卷积，也不是注意力，而是一类具有全局传播能力的状态空间主干。论文特别强调其输入分辨率扩展效率，因为随着图像变大，注意力成本会快速膨胀，而 SS2D 的计算增长更可控。

VMamba 之所以重要，不只是因为它做到了“视觉版 Mamba”，而是因为它提出了一套比较完整的二维状态空间建模范式。后续很多视觉 SSM 工作，包括更强的混合主干和 deformable/state-space 变种，基本都在沿着这条路线继续推进。

#### 🧪 练习题
```yaml
question: "VMamba 中 SS2D 的主要作用是什么？"
options:
  - "把所有 token 送入标准全局自注意力"
  - "通过多方向二维选择性扫描，把一维 Mamba 扩展到图像结构并获取全局上下文"
  - "仅用于做数据增强"
  - "替代分类头输出 logits"
answer: 1
explain: "SS2D 通过在二维特征图上进行多方向扫描，弥补了原始 Mamba 只适用于一维序列的限制。"
```

### FocalNet

```yaml
id: focalnet
num: 17
name: FocalNet
full_name: 焦点调制网络 (Focal Modulation Networks)
year: '2022.03'
org: Microsoft Research
parent: swin_transformer
paper_url: https://arxiv.org/abs/2203.11926
project_url: ''
category: modern_efficient
motivation: 用焦点调制替代自注意力，实现分层上下文聚合
```

#### 📝 一句话总结
FocalNet 用 focal modulation 机制完全替代自注意力，通过分层上下文聚合、门控选择和逐元素调制，实现了既有全局建模能力又更高效的视觉 token 交互。

#### 🎯 核心要点
- 用 focal modulation 而不是 self-attention 建模 token 之间关系。
- 先用多层深度卷积提取从局部到全局的上下文，再由门控动态聚合。
- 将聚合后的上下文作为调制器，对 query token 做逐元素调制。
- 仍然采用分层视觉骨干，便于迁移到分类、检测和分割。
- 在 ImageNet、COCO、ADE20K 上以相似成本超过多种注意力基线。

#### 🔬 深入细节
![FocalNet 模型图](https://raw.githubusercontent.com/microsoft/FocalNet/main/figures/focalnet-model.png)
*图：FocalNet 先用多尺度上下文聚合器收集不同感受野信息，再通过调制器作用到当前 token。*

```python
# Focal modulation 伪代码
def focal_modulation(x):
    q, ctx, gates = linear(x).split([d, d, L + 1], dim=-1)
    contexts = []
    for l in range(L):
        ctx = depthwise_conv(ctx, kernel_size[level_k[l]])
        contexts.append(ctx)
    global_ctx = global_avg_pool(ctx)
    agg = sum(gates[..., l:l+1] * contexts[l] for l in range(L))
    agg = agg + gates[..., -1:] * global_ctx
    modulator = conv1x1(agg)
    return q * modulator
```

FocalNet 关注的核心问题是：视觉 Transformer 的强大建模能力，是否必须依赖成对 token 的自注意力矩阵？论文给出的答案是否定的。它认为 token 交互可以分成两步：先为每个位置收集一个结构化上下文，再让当前位置用这个上下文来调制自身表示，而不必显式计算 query-key 两两匹配。

具体来说，focal modulation 有三个阶段。第一是 hierarchical contextualization：用多层不同感受野的 depthwise convolution，从短程到长程依次构造上下文。第二是 gated aggregation：模型学习一个门控向量，决定当前 token 更该依赖哪一级上下文。第三是 modulation：把聚合后的上下文变成一个调制器，对当前 query 做逐元素缩放或仿射变换。整个过程更像“先看周围环境，再调整自己”，而不是标准自注意力那种成对匹配。

这种设计的直观优势是计算路径更规整、对硬件更友好，而且无需维护显式注意力图。与 Swin 这类局部窗口注意力相比，FocalNet 通过逐层扩大的上下文聚合器自然获得大范围感受野；与 CNN 相比，它又保留了内容自适应的门控调制能力，因此不是简单回到卷积，而是提出一种新的 token mixing 机制。

论文结果表明，FocalNet 在图像分类上能和注意力模型正面竞争，并在检测和分割上继续保持优势。它的重要性在于证明了“替代自注意力”的路线不仅可行，而且可以做到统一、可扩展、跨任务迁移。

#### 🧪 练习题
```yaml
question: "FocalNet 与自注意力最本质的区别是什么？"
options:
  - "它完全不做任何上下文建模"
  - "它不通过 token 两两匹配建图，而是先聚合多尺度上下文，再用调制器作用到当前 token"
  - "它只适用于卷积网络而不适用于视觉主干"
  - "它去掉了所有非线性激活"
answer: 1
explain: "FocalNet 的关键在于上下文聚合 + 调制，而不是标准自注意力中的 query-key 成对交互。"
```
