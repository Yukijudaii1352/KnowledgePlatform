### NWPU-RESISC45

```yaml
id: nwpu_resisc45
name: NWPU-RESISC45
full_name: NWPU Remote Sensing Image Scene Classification 45 (西北工业大学遥感图像场景分类 45 类数据集)
year: '2017.03'
org: 西北工业大学 (NWPU)
paper_url: https://ieeexplore.ieee.org/abstract/document/7891544/
category: scene_classification
parent: uc_merced
motivation: 现有遥感场景分类数据集类别少、规模小、多样性不足
```

#### 📝 一句话总结

NWPU-RESISC45 提出了一个包含 45 个场景类别、共 31,500 张遥感图像（每类 700 张）的大规模公开基准数据集，空间分辨率覆盖 0.2m 至 30m，涵盖 100 多个国家和地区，并系统评估了 11 种传统方法和 5 种深度学习方法，成为遥感场景分类领域引用最高（3,400+）的标准基准。

#### 🎯 核心要点

- **大规模高多样性数据集**：45 个场景类别、31,500 张图像（每类 700 张），远超此前最大的 UC Merced（21 类 / 2,100 张）和 AID（30 类 / 10,000 张）
- **广泛的空间分辨率覆盖**：从 0.2m（亚米级）到 30m（中分辨率），涵盖不同卫星/航空传感器获取的影像
- **丰富的地理多样性**：图像采集自全球 100 多个国家和地区，包含不同气候、季节、光照条件下的场景
- **高类内多样性与类间相似性**：同一类别内图像在外观、尺度、朝向上差异显著（如不同国家的机场），不同类别间存在视觉混淆（如 dense residential vs commercial area）
- **标准化评估协议**：提供两种训练/测试划分比例（10% 和 20% 用于训练），每种设置重复实验取平均，确保公平对比
- **全面的基准评测**：系统评估了 BoVW、SPM、LLC、VLAD、IFK 等传统方法以及 AlexNet、VGGNet-16、GoogLeNet 等深度学习方法
- **综述性贡献**：论文同时提供了遥感场景分类方法的系统综述，将方法分为手工特征、无监督特征学习和深度学习三大类

#### 🔬 深入细节

##### 数据集概览

NWPU-RESISC45 数据集包含 45 个场景类别，每类 700 张 256×256 像素的 RGB 图像，共 31,500 张。所有图像均从 Google Earth 中裁剪获取，覆盖全球 100 多个国家和地区。

**45 个场景类别完整列表：**

| 编号 | 类别 | 编号 | 类别 | 编号 | 类别 |
|------|------|------|------|------|------|
| 1 | airplane | 16 | golf course | 31 | railway station |
| 2 | airport | 17 | ground track field | 32 | rectangular farmland |
| 3 | baseball diamond | 18 | harbor | 33 | river |
| 4 | basketball court | 19 | industrial area | 34 | roundabout |
| 5 | beach | 20 | intersection | 35 | runway |
| 6 | bridge | 21 | island | 36 | sea ice |
| 7 | chaparral | 22 | lake | 37 | ship |
| 8 | church | 23 | meadow | 38 | snowberg |
| 9 | circular farmland | 24 | medium residential | 39 | sparse residential |
| 10 | cloud | 25 | mobile home park | 40 | stadium |
| 11 | commercial area | 26 | mountain | 41 | storage tank |
| 12 | dense residential | 27 | overpass | 42 | tennis court |
| 13 | desert | 28 | palace | 43 | terrace |
| 14 | forest | 29 | parking lot | 44 | thermal power station |
| 15 | freeway | 30 | railway | 45 | wetland |

##### 与现有数据集的对比

| 数据集 | 年份 | 类别数 | 图像总数 | 每类图像数 | 图像尺寸 | 空间分辨率 |
|--------|------|--------|----------|------------|----------|------------|
| UC Merced | 2010 | 21 | 2,100 | 100 | 256×256 | 0.3m |
| WHU-RS19 | 2012 | 19 | ~1,005 | ~50 | 600×600 | 0.5m |
| RSSCN7 | 2015 | 7 | 2,800 | 400 | 400×400 | — |
| AID | 2017 | 30 | 10,000 | 220–420 | 600×600 | 0.5–8m |
| **NWPU-RESISC45** | **2017** | **45** | **31,500** | **700** | **256×256** | **0.2–30m** |

NWPU-RESISC45 在类别数（45 vs 30）、图像总数（31,500 vs 10,000）和空间分辨率范围（0.2–30m vs 0.5–8m）三个维度上均显著超越此前最大的 AID 数据集。

##### 动机与背景

**遥感场景分类的重要性与挑战。** 遥感图像场景分类旨在为每张遥感图像赋予一个语义类别标签（如"机场""港口""居民区"等），是遥感图像理解的基础任务，广泛应用于城市规划、环境监测、灾害评估等领域。

然而，该任务面临三大核心挑战：

1. **类内多样性大（High intra-class diversity）**：同一场景类别的图像可能在外观上差异巨大。例如，不同国家的"机场"在布局、规模、周边环境上截然不同；"教堂"在不同文化背景下的建筑风格也完全不同。

2. **类间相似性高（High inter-class similarity）**：不同场景类别之间可能在视觉上高度相似。例如，"密集居民区"与"商业区"在纹理和结构上非常接近；"矩形农田"与"梯田"在某些视角下难以区分。

3. **现有数据集不足**：此前的数据集（如 UC Merced 仅 21 类 2,100 张）规模过小、类别过少、空间分辨率单一，无法充分评估和推动方法进步。

> 💡 关键洞察：遥感场景分类的难度不在于单张图像的识别，而在于同一语义概念在全球不同地理环境下的巨大外观变化。NWPU-RESISC45 通过从 100+ 国家采集数据，首次系统性地引入了这种地理多样性挑战。

##### 核心机制详解

**1. 数据集构建流程**

NWPU-RESISC45 的构建遵循以下原则：

- **图像来源**：所有图像从 Google Earth 中手动裁剪，确保每张图像包含清晰的场景语义
- **类别设计**：45 个类别覆盖自然场景（forest、mountain、desert 等）、农业场景（circular/rectangular farmland、terrace 等）、城市场景（commercial area、residential 等）和特殊场景（thermal power station、storage tank 等）
- **质量控制**：每张图像由多名标注者交叉验证，确保标签准确性
- **多样性保证**：每个类别的 700 张图像来自不同地理位置、不同时间、不同成像条件

**2. 评估协议设计**

论文设计了两种标准评估协议：

- **Setting 1（10% 训练）**：每类随机选取 10%（70 张）作为训练集，90%（630 张）作为测试集
- **Setting 2（20% 训练）**：每类随机选取 20%（140 张）作为训练集，80%（560 张）作为测试集

每种设置独立重复实验多次，报告平均精度和标准差，以消除随机划分带来的波动。

$$\text{OA} = \frac{\text{正确分类的图像数}}{\text{测试集总图像数}} \times 100\%$$

**3. 方法分类体系**

论文将遥感场景分类方法系统地分为三大类：

**(a) 基于手工特征的方法：**
- **颜色直方图（Color Histogram）**：统计图像的颜色分布
- **纹理特征（GIST、LBP）**：捕获图像的全局纹理结构
- **局部特征编码（BoVW、VLAD、IFK）**：提取 SIFT 等局部特征后通过词袋模型、Fisher 向量等方式编码为全局表示

**(b) 基于无监督特征学习的方法：**
- **稀疏编码（Sparse Coding）**：学习过完备字典进行稀疏表示
- **自编码器（Autoencoder）**：通过重建目标学习紧凑特征
- **PCA 白化网络**：利用 PCA 进行无监督特征提取

**(c) 基于深度学习的方法：**
- **从头训练（Training from scratch）**：在目标数据集上直接训练 CNN
- **微调预训练模型（Fine-tuning）**：使用 ImageNet 预训练的 CNN 在遥感数据上微调
- **CNN 作为特征提取器**：使用预训练 CNN 提取特征后接传统分类器（如 SVM）

```python
# 遥感场景分类典型流程伪代码
def scene_classification_pipeline(image, method='deep_learning'):
    if method == 'handcrafted':
        # 手工特征方法
        local_features = extract_SIFT(image)           # 提取局部特征
        global_repr = fisher_vector(local_features,     # Fisher 向量编码
                                     gmm_codebook)
        label = svm_classify(global_repr)               # SVM 分类
        
    elif method == 'deep_learning':
        # 深度学习方法（以 Fine-tuning 为例）
        model = load_pretrained('VGGNet-16', 'ImageNet')
        model.fc_layer = Linear(4096, 45)               # 替换最后一层为 45 类
        model = finetune(model, train_data,              # 在遥感数据上微调
                         lr=0.001, epochs=30)
        label = model.predict(image)
    
    return label
```

##### 主要实验结果

**传统方法基准（Overall Accuracy %）：**

| 方法 | 特征 | 编码方式 | 10% 训练 | 20% 训练 |
|------|------|----------|----------|----------|
| BoVW | SIFT | 词袋 | 41.72 ± 0.21 | 44.97 ± 0.28 |
| BoVW + SPM | SIFT | 空间金字塔 | 27.83 ± 0.61 | 32.96 ± 0.47 |
| LLC | SIFT | 局部约束线性编码 | 38.81 ± 0.23 | 40.03 ± 0.34 |
| VLAD | SIFT | 残差聚合 | 43.96 ± 0.30 | 47.47 ± 0.28 |
| IFK | SIFT | Fisher 核 | 46.67 ± 0.18 | 51.78 ± 0.21 |

**深度学习方法基准（Overall Accuracy %）：**

| 方法 | 策略 | 10% 训练 | 20% 训练 |
|------|------|----------|----------|
| AlexNet | Fine-tuning | 76.69 ± 0.21 | 79.85 ± 0.13 |
| VGGNet-16 | Fine-tuning | 76.47 ± 0.18 | 79.79 ± 0.15 |
| GoogLeNet | Fine-tuning | **78.48 ± 0.26** | **82.57 ± 0.12** |
| AlexNet | 特征提取 + SVM | 64.02 ± 0.22 | 67.41 ± 0.27 |
| VGGNet-16 | 特征提取 + SVM | 72.07 ± 0.14 | 76.56 ± 0.18 |

**关键发现：**

1. **深度学习显著优于传统方法**：最优深度学习方法（GoogLeNet Fine-tuning，82.57%）比最优传统方法（IFK，51.78%）高出 30 个百分点以上
2. **Fine-tuning 优于特征提取**：同一网络，Fine-tuning 策略比作为固定特征提取器高 3–10 个百分点
3. **数据集仍具挑战性**：即使最优方法也仅达 82.57%（20% 训练），远未饱和，说明数据集的难度足以推动未来研究
4. **混淆类别分析**：palace vs church、dense residential vs commercial area、medium residential vs sparse residential 等类别对之间存在显著混淆

> ⚠️ 注意：论文发表时（2017 年）的最优精度仅为 82.57%。此后随着 ResNet、DenseNet、EfficientNet、Vision Transformer 等新架构的出现，该数据集上的精度已提升至 95% 以上，但 NWPU-RESISC45 仍是遥感场景分类的标准评测基准。

##### 数据集的持续影响

NWPU-RESISC45 自发布以来已被引用 3,400+ 次，成为遥感场景分类领域最广泛使用的基准数据集。其成功的关键因素包括：

1. **规模适中**：31,500 张图像既足够大以训练深度模型，又不至于过大导致实验成本过高
2. **类别全面**：45 个类别覆盖了遥感场景分类的主要应用场景
3. **评估协议标准化**：固定的训练/测试划分比例使不同方法的对比公平可靠
4. **持续的挑战性**：高类内多样性和类间相似性使得该数据集至今仍具有研究价值

#### 🧪 练习题

```yaml
question: "NWPU-RESISC45 数据集相比此前的 UC Merced 数据集，在哪个维度上的提升最为显著？"
options:
  - "图像分辨率从 128×128 提升到 256×256"
  - "类别数从 21 增加到 45，图像总数从 2,100 增加到 31,500（15 倍）"
  - "标注方式从弱监督改为全监督"
  - "从单一光谱扩展到多光谱影像"
answer: 1
explain: "UC Merced 包含 21 个类别共 2,100 张图像，而 NWPU-RESISC45 包含 45 个类别共 31,500 张图像，类别数增加了 1 倍以上，图像总数增加了 15 倍。两个数据集都是 256×256 像素的 RGB 图像，都采用场景级标注，因此最显著的提升在于规模和类别覆盖。"
```