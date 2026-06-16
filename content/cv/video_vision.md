---
domain: cv
topic_id: video_vision
topic_name: 视频视觉
page_icon: 🎬
page_title: 视频视觉技术演进
page_subtitle: '{build_date} 版'
page_desc: 从手工特征到深度学习，再到视频基础模型与世界模型的技术演进
hero_pills:
- 视频理解 · 动作识别 · 时序建模 · 视频大模型
count_pill: '{count} 个算法'
categories:
  traditional_feature:
    label: 传统特征方法
    color: '#8B4513'
  cnn_rnn:
    label: CNN/RNN架构
    color: '#2E8B57'
  transformer:
    label: Transformer时序建模
    color: '#4169E1'
  foundation_model:
    label: 视频基础模型
    color: '#9932CC'
---

## 领域综述

!INCLUDE_RAW ../../temp/content_survey_bulk_20260614_174337/researcher_output/cv/video_vision/overview/zhihu__CVPR_2026_视频模型趋势梳理：不止生成下一帧，更要理解下一步__eae08cc3/article.md

## 最新进展综述

!INCLUDE_RAW ../../temp/content_survey_bulk_20260614_174337/researcher_output/cv/video_vision/latest/zhihu__CVPR_2026_多模态视觉智能全景梳理：从感知到推理的范式重写__bc1f7fc3/article.md

## 算法演化关系

```yaml
nodes:
- id: idt
  x: 0
  y: 0
  category: traditional_feature
- id: two_stream
  x: 1
  y: 1
  category: cnn_rnn
- id: c3d
  x: 2
  y: 1
  category: cnn_rnn
- id: lrcn
  x: 2
  y: 1.5
  category: cnn_rnn
- id: tsn
  x: 3
  y: 1
  category: cnn_rnn
- id: i3d
  x: 4
  y: 1
  category: cnn_rnn
- id: non_local
  x: 5
  y: 2
  category: transformer
- id: r2plus1d
  x: 5
  y: 1
  category: cnn_rnn
- id: tsm
  x: 6
  y: 1
  category: cnn_rnn
- id: slowfast
  x: 6
  y: 1.5
  category: cnn_rnn
- id: timesformer
  x: 8
  y: 2
  category: transformer
- id: vivit
  x: 8
  y: 2.5
  category: transformer
- id: clip4clip
  x: 8
  y: 3
  category: foundation_model
- id: video_swin
  x: 9
  y: 2
  category: transformer
- id: videomae
  x: 9
  y: 3
  category: foundation_model
- id: internvideo
  x: 9
  y: 3.5
  category: foundation_model
- id: mamba3
  x: 13
  y: 2
  category: transformer
- id: cosmos
  x: 13
  y: 3
  category: foundation_model
- id: worldreel
  x: 13
  y: 3.5
  category: foundation_model
- id: kangaroo
  x: 13
  y: 4
  category: foundation_model
- id: trajtok
  x: 13
  y: 3.2
  category: foundation_model
edges:
- from: idt
  to: c3d
  label: 深度学习化
- from: two_stream
  to: lrcn
  label: 时序建模
- from: two_stream
  to: tsn
  label: 长视频采样
- from: c3d
  to: i3d
  label: 权重膨胀
- from: c3d
  to: r2plus1d
  label: 卷积分解
- from: tsn
  to: tsm
  label: 时序移位
- from: i3d
  to: non_local
  label: 自注意力
- from: i3d
  to: slowfast
  label: 双速采样
- from: non_local
  to: timesformer
  label: 纯注意力
- from: timesformer
  to: vivit
  label: 时空因子化
- from: vivit
  to: video_swin
  label: 窗口注意力
- from: video_swin
  to: videomae
  label: 自监督
- from: video_swin
  to: mamba3
  label: 线性注意力
- from: videomae
  to: internvideo
  label: 多模态对齐
- from: videomae
  to: trajtok
  label: 轨迹Token
- from: internvideo
  to: cosmos
  label: 世界模型
- from: internvideo
  to: kangaroo
  label: 长上下文
- from: cosmos
  to: worldreel
  label: 4D生成
milestones:
- c3d
- timesformer
- videomae
```

## 核心算法

### iDT

```yaml
id: idt
num: 1
name: iDT
full_name: 改进密集轨迹 (Improved Dense Trajectories)
year: '2013'
org: INRIA
parent: —
paper_url: https://hal.inria.fr/hal-00803241
project_url: ''
category: traditional_feature
motivation: 相机运动补偿的手工特征巅峰
```

#### 📝 一句话总结
iDT 在密集轨迹（Dense Trajectories）框架基础上引入相机运动估计与补偿机制，通过人体检测排除前景干扰后估计全局单应性变换来消除背景光流中的相机运动分量，使得提取的轨迹描述子（尤其是 MBH）更纯粹地反映人体动作，成为深度学习时代之前动作识别领域的性能巅峰方法。

#### 🎯 核心要点
- 相机运动补偿：利用人体检测器排除前景区域，在背景区域匹配 SURF 特征点并估计帧间单应性矩阵，对光流进行 warp 去除相机运动
- 密集轨迹提取：在多尺度密集网格上采样特征点，利用中值滤波光流跟踪，轨迹长度限制为 L=15 帧
- 四种局部描述子：沿轨迹在 \(N_\sigma \times N_\sigma \times N_\tau\) 时空体积内计算 Trajectory Shape、HOG、HOF、MBH
- MBH（运动边界直方图）为最具判别力的单一描述子，计算光流的空间梯度方向直方图
- Fisher Vector 编码：使用 256 个高斯分量的 GMM，对每种描述子独立编码后拼接
- 线性 SVM 分类：对 Fisher Vector 进行 power normalization 和 L2 归一化后用线性 SVM
- 在 Hollywood2（64.3%）、HMDB51（57.2%）、UCF101（85.9%）上达到当时最优

#### 🔬 深入细节
![iDT 管线示意图](https://lear.inrialpes.fr/people/wang/fig/pipeline.png)
*图：iDT 整体流程。在密集采样点上通过光流跟踪生成轨迹，沿轨迹提取多种描述子，经 Fisher Vector 编码后用线性 SVM 分类。相机运动补偿通过估计全局单应性并 warp 光流实现。*

```python
# iDT 核心流程伪代码
def iDT(video):
    # Step 1: 密集采样特征点（多尺度网格，间隔 W=5 像素）
    points = dense_sample(video[0], step=5, num_scales=8)
    
    # Step 2: 相机运动估计与补偿
    for t in range(1, len(video)):
        # 2a: 人体检测，获取前景 mask
        human_mask = person_detector(video[t])
        # 2b: 在背景区域匹配 SURF 特征点
        matches = match_surf(video[t-1], video[t], exclude=human_mask)
        # 2c: RANSAC 估计单应性矩阵 H
        H = estimate_homography(matches)
        # 2d: 用 H warp 前一帧，计算补偿后光流
        warped = warp_frame(video[t-1], H)
        flow_compensated[t] = optical_flow(warped, video[t])
    
    # Step 3: 中值滤波光流跟踪（L=15 帧）
    trajectories = track_points(points, flow_compensated, max_length=15)
    
    # Step 4: 沿轨迹提取描述子（32x32x15 时空体积，2x2x3 网格）
    for traj in trajectories:
        shape_desc = trajectory_shape(traj)           # 30-d
        hog_desc = compute_HOG(video, traj)           # 96-d
        hof_desc = compute_HOF(flow_compensated, traj) # 108-d
        mbhx_desc = compute_MBH(flow_x, traj)        # 96-d
        mbhy_desc = compute_MBH(flow_y, traj)        # 96-d
    
    # Step 5: Fisher Vector 编码 + 线性 SVM
    fv = fisher_vector_encode(all_descriptors, gmm_256)
    prediction = linear_svm(fv)
    return prediction
```

**动机与背景**

在 iDT 之前，Wang 等人于 2011 年提出了 Dense Trajectories（DT）方法，通过在视频中密集采样点并利用光流进行跟踪，沿轨迹提取局部描述子，在动作识别上取得了优异表现。然而，DT 方法存在一个关键缺陷：

1. **相机运动干扰**：当相机发生平移、旋转或缩放时，光流场中包含大量与人体动作无关的相机运动分量，导致提取的轨迹和描述子被噪声污染。
2. **背景轨迹噪声**：相机运动产生的背景光流会生成大量无意义的背景轨迹，降低描述子的判别力。

iDT 正是为了解决相机运动带来的干扰而提出的改进方案。

**核心机制一：相机运动估计与补偿**

iDT 的核心创新在于估计并去除相机运动。具体步骤如下：

1. **人体检测排除前景**：使用基于 DPM（Deformable Part Model）的人体检测器定位视频中的人体区域。在估计相机运动时排除这些区域，避免人体运动干扰全局运动估计。

2. **SURF 特征点匹配**：在排除人体区域后的背景中提取 SURF 特征点，在相邻帧间进行匹配。

3. **单应性估计**：利用 RANSAC 算法从匹配点对中鲁棒估计帧间单应性矩阵 \(H\)：

$$\mathbf{x}' \sim H \mathbf{x}$$

其中 \(\mathbf{x}\) 和 \(\mathbf{x}'\) 分别是前后帧中的对应点齐次坐标。单应性矩阵 \(H\) 是 3×3 矩阵，可以建模相机的旋转、平移和缩放。

4. **光流补偿**：利用估计的单应性 \(H\) 将前一帧 warp 到当前帧的视角，然后重新计算光流：

$$\mathbf{w}^*(x, y) = \mathbf{w}(x, y) - \mathbf{w}_H(x, y)$$

其中 \(\mathbf{w}\) 是原始光流，\(\mathbf{w}_H\) 是由单应性 \(H\) 引起的运动场，\(\mathbf{w}^*\) 是补偿后的光流，仅包含前景物体的独立运动。

> 💡 关键：选择单应性而非仿射变换的原因是——单应性（8 自由度）能更好地建模真实相机运动（包括透视变换），而仿射变换（6 自由度）在相机旋转较大时误差显著。

**核心机制二：密集轨迹提取**

轨迹提取沿用 DT 的框架：

1. **密集采样**：在 8 个空间尺度上，以 \(W=5\) 像素间隔在网格上采样特征点。为避免无纹理区域的无效跟踪，使用特征值阈值过滤（Shi-Tomasi 角点准则）。

2. **中值滤波跟踪**：对于每个采样点 \(\mathbf{P}_t = (x_t, y_t)\)，利用光流场通过中值滤波进行跟踪：

$$\mathbf{P}_{t+1} = (x_{t+1}, y_{t+1}) = (x_t, y_t) + (\mathcal{M} * \mathbf{w}^*)|_{(\bar{x}_t, \bar{y}_t)}$$

其中 \(\mathcal{M}\) 是 3×3 中值滤波核，\(\mathbf{w}^*\) 是补偿后的光流。中值滤波相比双线性插值更鲁棒。

3. **轨迹长度限制**：最大长度 \(L=15\) 帧。超过此长度的轨迹被截断并重新采样，以避免漂移累积。

**核心机制三：局部描述子**

沿每条轨迹，在 \(N_\sigma \times N_\sigma \times N_\tau = 2 \times 2 \times 3\) 的时空网格中计算描述子：

1. **Trajectory Shape（30-d）**：归一化的位移向量序列 \((\Delta P_t, \ldots, \Delta P_{t+L-1})\)，描述轨迹的形状。

2. **HOG（96-d）**：方向梯度直方图，捕获外观信息。在 \(2 \times 2 \times 3\) 网格的每个 cell 中计算 8-bin 方向直方图。

3. **HOF（108-d）**：光流方向直方图，捕获运动方向。每个 cell 计算 9-bin 直方图（8 个方向 + 1 个幅度小于阈值的 bin）。

4. **MBH（192-d = 96+96）**：运动边界直方图，分别对光流的水平分量 \(u\) 和垂直分量 \(v\) 计算空间梯度，再对梯度方向做直方图：

$$\text{MBH}_x = \text{HOG}(\nabla u), \quad \text{MBH}_y = \text{HOG}(\nabla v)$$

> 💡 关键：MBH 是 iDT 中最强的描述子。其优势在于——对光流取空间梯度天然消除了恒定运动（如相机平移导致的均匀光流），因此即使不做显式相机运动补偿，MBH 也具有一定的鲁棒性。而 iDT 的相机运动补偿进一步提升了 MBH 的判别力。

**核心机制四：Fisher Vector 编码**

将局部描述子编码为固定长度的视频级表示：

1. **PCA 降维**：将每种描述子降至原维度的一半。
2. **GMM 训练**：对每种描述子独立训练 \(K=256\) 个高斯分量的 GMM。
3. **Fisher Vector 计算**：对于一组局部描述子 \(\{x_1, \ldots, x_T\}\)，Fisher Vector 编码一阶和二阶统计量：

$$\mathcal{G}_{\mu_k} = \frac{1}{T\sqrt{\pi_k}} \sum_{t=1}^T \gamma_t(k) \frac{x_t - \mu_k}{\sigma_k}$$

$$\mathcal{G}_{\sigma_k} = \frac{1}{T\sqrt{2\pi_k}} \sum_{t=1}^T \gamma_t(k) \left[\frac{(x_t - \mu_k)^2}{\sigma_k^2} - 1\right]$$

其中 \(\gamma_t(k)\) 是第 \(t\) 个描述子对第 \(k\) 个高斯分量的后验概率。

4. **归一化**：依次进行 power normalization（\(f(x) = \text{sign}(x)|x|^\alpha, \alpha=0.5\)）和 L2 归一化。

5. **多描述子融合**：各描述子的 Fisher Vector 独立计算后拼接，最终维度为 \(2 \times K \times d_i\) 对每种描述子 \(i\)。

**与 Dense Trajectories 的对比**

| 方法 | 相机运动补偿 | HOF mAP (Hollywood2) | MBH mAP (Hollywood2) | 总体 mAP |
|------|-------------|---------------------|----------------------|----------|
| DT | ✗ | 53.2% | 55.1% | 58.2% |
| **iDT** | **✓** | **57.6%** | **60.5%** | **64.3%** |

> ⚠️ 注意：相机运动补偿对 HOF 的提升最为显著（+4.4%），因为 HOF 直接依赖光流方向，受相机运动干扰最大。MBH 由于本身对恒定运动具有鲁棒性，提升相对较小但依然明显（+5.4%）。Trajectory Shape 描述子的提升也很大，因为相机运动会严重扭曲轨迹形状。

**iDT 的历史地位**

iDT 是深度学习方法（如双流网络、C3D）出现之前动作识别领域的统治性方法。即使在深度学习早期（2014-2016），iDT 特征与深度特征的融合仍能带来显著提升，证明了手工特征与学习特征的互补性。直到 TSN、I3D 等方法的出现，iDT 才逐渐被完全取代。

#### 🧪 练习题
```yaml
question: "iDT 中相机运动补偿的关键步骤是什么？"
options:
  - "使用 3D 卷积网络学习相机运动模式"
  - "在排除人体区域后的背景中估计帧间单应性矩阵，warp 光流去除相机运动"
  - "对所有光流向量减去全局均值来消除平移运动"
  - "使用 IMU 传感器数据直接获取相机运动参数"
answer: 1
explain: "iDT 通过人体检测排除前景后，在背景区域匹配 SURF 特征点并用 RANSAC 估计单应性矩阵 H，然后利用 H 对光流进行 warp 补偿，从而去除相机运动分量。"
```

### Two-Stream

```yaml
id: two_stream
num: 2
name: Two-Stream
full_name: 双流卷积网络 (Two-Stream ConvNets)
year: '2014'
org: Oxford
parent: —
paper_url: https://arxiv.org/abs/1406.2199
project_url: ''
category: cnn_rnn
motivation: RGB与光流双流解耦架构
```

#### 📝 一句话总结
Two-Stream ConvNets 提出将视频动作识别解耦为空间流（单帧外观）和时间流（堆叠光流）两条独立 ConvNet，通过晚期融合实现互补，首次证明了深度学习在视频理解中可与手工特征（如 IDT）媲美的性能。

#### 🎯 核心要点
- 双流架构：空间流 ConvNet 处理单帧 RGB 图像捕获外观信息，时间流 ConvNet 处理堆叠密集光流捕获运动信息
- 光流输入设计：提出光流堆叠（optical flow stacking）、轨迹堆叠（trajectory stacking）、双向光流三种输入配置
- 时间流输入：将连续 \(L\) 帧的水平/垂直光流分量堆叠为 \(2L\) 通道张量作为 ConvNet 输入
- 均值光流减除：通过减去位移场均值补偿全局相机运动
- 多任务学习：联合 UCF-101 和 HMDB-51 分类任务训练时间流网络，缓解小数据集过拟合
- 晚期融合策略：对两流 softmax 分数进行平均或 SVM 融合
- 空间流预训练：利用 ImageNet ILSVRC-2012 预训练解决视频数据集规模不足问题
- 网络架构：基于 CNN-M-2048（类似 Zeiler & Fergus 网络），5 层卷积 + 3 层全连接
- 在 UCF-101 达到 88.0%、HMDB-51 达到 59.4% 准确率，与当时最优手工特征方法持平

#### 🔬 深入细节
![Two-Stream Architecture](https://arxiv.org/html/1406.2199v2/extracted/figures/two_stream_arch.png)
*图：Two-Stream ConvNet 架构示意。上方为空间流（输入单帧 RGB），下方为时间流（输入多帧堆叠光流），最终通过晚期融合得到动作分类结果。*

> 💡 **核心思想**：受神经科学中视觉皮层"双通路假说"（腹侧通路负责物体识别，背侧通路负责运动感知）启发，将视频理解分解为外观识别和运动识别两个独立子问题。

```python
# Two-Stream ConvNet 推理伪代码
def two_stream_predict(video):
    # 1. 空间流：随机采样帧 → ImageNet预训练ConvNet
    frames = sample_frames(video, n=25)
    spatial_scores = spatial_convnet(frames)  # 输入: 224x224x3
    
    # 2. 时间流：计算光流 → 堆叠L=10帧 → ConvNet
    for frame_t in frames:
        flow_volume = stack_optical_flow(video, t=frame_t, L=10)
        # flow_volume shape: 224x224x20 (dx,dy × 10帧)
        flow_volume -= flow_volume.mean(axis=(0,1))  # 均值减除
    temporal_scores = temporal_convnet(flow_volume)
    
    # 3. 晚期融合
    # 方式A: 平均融合
    final_score = (spatial_scores + temporal_scores) / 2
    # 方式B: SVM融合 (L2归一化后拼接，训练线性SVM)
    # final_score = svm(l2_norm(spatial_scores), l2_norm(temporal_scores))
    
    return argmax(final_score)
```

##### 动机与背景

2014 年之前，视频动作识别领域主要依赖手工特征方法，如改进密集轨迹（Improved Dense Trajectories, IDT），其通过 HOF、MBH 等手工描述子编码光流信息。虽然 CNN 在图像分类上已取得突破（AlexNet, 2012），但直接将 CNN 应用于视频面临两大挑战：

1. **时序建模困难**：简单堆叠 RGB 帧（如 Karpathy 等人的"slow fusion"）效果远不如手工特征，因为 CNN 难以从原始像素中隐式学习运动模式
2. **训练数据不足**：当时最大的标注视频数据集 UCF-101 仅有 9.5K 训练视频，远不足以从零训练深度网络

Two-Stream ConvNets 的核心洞察是：**将运动信息显式化**——用预计算的密集光流作为时间流的输入，而非让网络自行从原始帧中学习运动。

##### 空间流 ConvNet

空间流接收单帧 RGB 图像（\(224 \times 224 \times 3\)），本质上执行静态图像的动作识别（类似物体/场景识别）。关键设计：

- **ImageNet 预训练**：由于视频数据集过小，空间流使用在 ILSVRC-2012 上预训练的 CNN-M-2048 网络，仅微调最后分类层即可达到 72.8% 准确率（UCF-101）
- 从零训练仅达 52.3%，证明预训练的必要性
- 采用 dropout=0.5 的最后层训练策略

##### 时间流 ConvNet——核心创新

时间流是本文最重要的贡献。它将密集光流显式编码为多通道"图像"输入 ConvNet：

**光流堆叠（Optical Flow Stacking）**：对于时刻 \(\tau\) 的帧，将其前后 \(L\) 帧的光流水平分量 \(d^x_t\) 和垂直分量 \(d^y_t\) 堆叠：

$$I_\tau(u, v, 2k-1) = d^x_{\tau+k}(u, v), \quad I_\tau(u, v, 2k) = d^y_{\tau+k}(u, v)$$

其中 \(k = 0, \ldots, L-1\)，最终输入张量维度为 \(w \times h \times 2L\)。实验中 \(L=10\)，即 20 通道输入。

**轨迹堆叠（Trajectory Stacking）**：沿运动轨迹采样光流，而非固定空间位置：

$$I_\tau(u, v, 2k-1) = d^x_{\tau+k}(p_k), \quad I_\tau(u, v, 2k) = d^y_{\tau+k}(p_k)$$

其中 \(p_k\) 为从 \((u,v)\) 出发沿光流追踪到第 \(k\) 帧的位置。

**双向光流**：使用 \(L/2\) 帧前向光流 + \(L/2\) 帧后向光流，总通道数不变。

> ⚠️ **关键发现**：堆叠多帧光流（\(L=10\)）比单帧光流（\(L=1\)）提升约 7%，证明长程时序信息的重要性。光流堆叠略优于轨迹堆叠，双向光流仅带来微小提升。

**均值光流减除**：从每个位移场中减去其空间均值向量，补偿全局相机运动，类似于图像处理中的零均值化。实验证明这一简单操作可提升约 1% 准确率。

##### 与手工特征的关系

论文深刻揭示了时间流 ConvNet 与传统手工描述子的联系：

- **HOF/MBH 描述子**：基于光流方向直方图，可由第一层卷积（方向敏感滤波器）+ ReLU + 池化实现
- **运动学特征**（散度、旋度、剪切）：基于光流梯度，同样可被卷积层捕获
- **轨迹特征**：沿轨迹堆叠位移向量，对应轨迹堆叠输入方式

第一层学到的 96 个滤波器（\(7 \times 7 \times 20\)）可视化显示：部分滤波器计算光流的空间导数（类似 MBH），部分计算时间导数（捕获运动变化）。

##### 多任务学习

为缓解时间流在小数据集（尤其是 HMDB-51 仅 3.7K 训练视频）上的过拟合，采用多任务学习：

- 在最后全连接层之上添加两个 softmax 分类头（UCF-101 和 HMDB-51）
- 总损失为两个任务损失之和，通过反向传播联合优化
- HMDB-51 上从 46.6% 提升至 55.4%（+8.8%），UCF-101 上从 81.0% 提升至 81.5%

##### 训练与测试细节

| 配置项 | 空间流 | 时间流 |
|--------|--------|--------|
| 输入尺寸 | 224×224×3 | 224×224×20 |
| 预训练 | ImageNet ILSVRC-2012 | 无（从零训练） |
| Dropout | 0.5 | 0.9 |
| 学习率 | 10⁻² → 10⁻³(14K) → stop(20K) | 10⁻² → 10⁻³(50K) → 10⁻⁴(70K) → stop(80K) |
| 数据增强 | 随机裁剪 + 翻转 + RGB抖动 | 随机裁剪 + 翻转 |

- **测试**：均匀采样 25 帧，每帧 10 次裁剪（4角+中心 × 翻转），对所有分数取平均
- **光流计算**：使用 Brox 等人的 GPU 实现（OpenCV），0.06s/帧对，预计算并 JPEG 压缩存储（UCF-101 从 1.5TB 压缩至 27GB）
- **多 GPU 训练**：基于 Caffe，4× NVIDIA Titan，数据并行，3.2× 加速

##### 晚期融合与最终结果

两流融合方式对比（UCF-101 split 1）：

| 融合方式 | 准确率 |
|----------|--------|
| 仅空间流 | 72.8% |
| 仅时间流 | 81.2% |
| 平均融合 | 85.9% |
| SVM 融合 | 87.0% |

> 💡 **互补性**：融合后比单独时间流提升 6%，比空间流提升 14%，证明外观和运动信息高度互补。

**与当时最优方法对比（3-split 平均）**：

| 方法 | UCF-101 | HMDB-51 |
|------|---------|---------|
| IDT [Wang & Schmid, 2013] | 85.9% | 57.2% |
| IDT + 高维编码 | 87.9% | 61.1% |
| Slow Fusion ConvNet [Karpathy, 2014] | 65.4% | - |
| **Two-Stream (SVM 融合)** | **88.0%** | **59.4%** |

Two-Stream ConvNets 首次使深度学习方法在视频动作识别上达到与精心设计的手工特征方法持平的性能，开创了视频理解的双流范式。

#### 🧪 练习题
```yaml
question: "Two-Stream ConvNets 中时间流网络的输入是什么？"
options:
  - "连续多帧 RGB 图像堆叠"
  - "单帧 RGB 图像的梯度图"
  - "连续多帧的密集光流位移场堆叠"
  - "视频帧的频域变换特征"
answer: 2
explain: "时间流的核心创新在于使用预计算的密集光流作为显式运动表示，将连续 L=10 帧的水平和垂直光流分量堆叠为 2L=20 通道的输入张量，而非直接使用原始 RGB 帧。"
```

### C3D

```yaml
id: c3d
num: 3
name: C3D
full_name: 3D卷积网络 (Convolutional 3D Networks)
year: '2015'
org: Facebook
parent: idt
paper_url: https://arxiv.org/abs/1412.0767
project_url: ''
category: cnn_rnn
motivation: 3D卷积端到端时空特征学习
```

#### 📝 一句话总结
C3D 提出使用统一的 \(3 \times 3 \times 3\) 小卷积核构建深度3D卷积网络，在大规模视频数据集 Sports-1M 上预训练后，其中间层特征（fc6）可作为通用的视频时空描述子，在动作识别、场景分类、动作相似度判断等多个视频分析任务上取得优异的迁移性能。

#### 🎯 核心要点
- **统一的3D卷积核尺寸**：系统实验证明 \(3 \times 3 \times 3\) 是3D卷积的最优核尺寸，兼顾时间和空间建模能力
- **C3D网络架构**：8层卷积 + 5层池化 + 2层全连接（4096维），输入为16帧 \(112 \times 112\) 的视频片段
- **大规模预训练**：在 Sports-1M 数据集（110万视频，487类）上进行预训练
- **通用视频特征**：fc6 层的4096维激活值作为通用视频描述子，可直接迁移到多种下游任务
- **高效紧凑表示**：通过 PCA 降至仅10维仍保持52.8%的 UCF101 准确率，证明特征的高度紧凑性
- **多任务验证**：在动作识别（UCF101）、动作相似度（ASLAN）、场景识别（YUPENN/Maryland）、物体识别等任务上均表现优异

#### 🔬 深入细节
![C3D 2D与3D卷积对比](https://ar5iv.labs.arxiv.org/html/1412.0767/assets/x1.png)
*图1：2D卷积 vs 3D卷积。2D卷积仅在空间维度操作，输出为2D特征图；3D卷积同时在时间和空间维度操作，输出保留时间信息的3D特征体。*

![C3D网络架构](https://ar5iv.labs.arxiv.org/html/1412.0767/assets/x2.png)
*图2：C3D 网络架构。包含8个卷积层、5个池化层和2个全连接层，所有3D卷积核均为 3×3×3。*

##### 算法伪代码

```python
# C3D 特征提取流程
def extract_c3d_features(video):
    # 1. 视频预处理：分割为16帧片段，8帧重叠
    clips = split_video(video, clip_length=16, overlap=8)
    
    features = []
    for clip in clips:
        # 2. 输入预处理：resize到 128x171，随机裁剪 112x112
        x = preprocess(clip)  # shape: (3, 16, 112, 112)
        
        # 3. 前向传播通过 C3D 网络
        # Conv1a(64) -> Pool1(1x2x2) 
        # Conv2a(128) -> Pool2(2x2x2)
        # Conv3a(256) -> Conv3b(256) -> Pool3(2x2x2)
        # Conv4a(512) -> Conv4b(512) -> Pool4(2x2x2)
        # Conv5a(512) -> Conv5b(512) -> Pool5(2x2x2)
        # FC6(4096) -> FC7(4096) -> Softmax(487)
        fc6 = forward_to_fc6(x)  # shape: (4096,)
        features.append(fc6)
    
    # 4. 平均池化所有片段特征
    video_descriptor = mean(features)  # (4096,)
    
    # 5. L2 归一化
    video_descriptor = l2_normalize(video_descriptor)
    
    return video_descriptor
```

##### 动机与背景

视频理解的核心挑战在于如何同时建模空间外观和时间运动信息。传统方法依赖手工设计的特征（如 HOG、HOF、MBH），虽然在特定任务上表现良好，但缺乏通用性和可扩展性。2D CNN 在图像领域取得了巨大成功，但直接应用于视频时会丢失时间维度的信息。

早期的3D卷积网络（如 Ji et al. 2010, Karpathy et al. 2014）虽然尝试了时空建模，但存在以下问题：
- 网络较浅，表达能力有限
- 卷积核尺寸选择缺乏系统研究
- 未充分利用大规模数据进行预训练
- 特征迁移能力未被充分验证

C3D 的核心动机是：**构建一个简单而有效的3D卷积网络，使其学到的特征能够像 ImageNet 预训练的2D CNN 特征一样，成为视频分析的通用表示。**

##### 核心机制：3×3×3 卷积核的系统验证

C3D 的第一个关键贡献是通过系统实验确定了最优的3D卷积核时间维度。作者在 UCF101 上对比了不同时间深度的卷积核：

$$L_{cls} = -\sum_{i=1}^{N} y_i \log(\hat{y}_i)$$

实验设置了以下变体进行对比：
- **同质网络**：所有卷积层使用相同的时间核深度 \(d \in \{1, 3, 5, 7\}\)
- **递增网络**：时间核深度从浅层到深层递增（3-3-5-5-7）
- **递减网络**：时间核深度从浅层到深层递减（7-5-5-3-3）

> 💡 关键发现：\(3 \times 3 \times 3\) 核在所有变体中表现最佳。这与2D领域 VGGNet 的发现一致——小卷积核堆叠比大卷积核更有效，因为引入了更多非线性层，同时参数量更少。

##### C3D 网络架构详解

C3D 的最终架构设计如下：

| 层 | 输出尺寸 | 卷积核/池化核 | 通道数 |
|---|---|---|---|
| Input | 3×16×112×112 | — | 3 |
| Conv1a | 64×16×112×112 | 3×3×3 | 64 |
| Pool1 | 64×16×56×56 | 1×2×2 | — |
| Conv2a | 128×16×56×56 | 3×3×3 | 128 |
| Pool2 | 128×8×28×28 | 2×2×2 | — |
| Conv3a | 256×8×28×28 | 3×3×3 | 256 |
| Conv3b | 256×8×28×28 | 3×3×3 | 256 |
| Pool3 | 256×4×14×14 | 2×2×2 | — |
| Conv4a | 512×4×14×14 | 3×3×3 | 512 |
| Conv4b | 512×4×14×14 | 3×3×3 | 512 |
| Pool4 | 512×2×7×7 | 2×2×2 | — |
| Conv5a | 512×2×7×7 | 3×3×3 | 512 |
| Conv5b | 512×2×7×7 | 3×3×3 | 512 |
| Pool5 | 512×1×4×4 | 2×2×2 | — |
| FC6 | 4096 | — | — |
| FC7 | 4096 | — | — |
| Softmax | 487 | — | — |

> ⚠️ 注意：Pool1 的时间维度步长为1（即 \(1 \times 2 \times 2\)），这是为了在早期保留时间信息。从 Pool2 开始使用 \(2 \times 2 \times 2\) 的池化核，逐步降低时空分辨率。

##### 训练策略

C3D 在 Sports-1M 数据集上训练，关键超参数：
- **优化器**：SGD，动量0.9
- **批量大小**：30
- **初始学习率**：0.003，每150K次迭代减半
- **总迭代次数**：1.9M（约13个epoch）
- **数据增强**：随机裁剪 \(16 \times 112 \times 112\)，50%概率水平翻转
- **Dropout**：0.5（应用于FC6和FC7）

##### 特征迁移与应用

C3D 的核心价值在于其学到的特征具有强大的迁移能力。特征提取流程：

1. 将视频分割为16帧的片段，相邻片段有8帧重叠
2. 每个片段通过 C3D 网络前向传播，提取 fc6 层的4096维激活值
3. 对所有片段的特征取平均，得到视频级描述子
4. L2 归一化

在下游任务中，C3D 特征可以直接配合简单的线性 SVM 分类器使用，无需微调网络：

| 任务 | 数据集 | C3D 性能 |
|---|---|---|
| 动作识别 | UCF101 | 82.3%（单网络）/ 90.4%（+iDT） |
| 动作相似度 | ASLAN | 78.3% accuracy |
| 场景识别 | YUPENN | 98.1% |
| 场景识别 | Maryland | 87.7% |

##### 与传统方法的对比

| 特性 | 手工特征(iDT) | 2D CNN | C3D |
|---|---|---|---|
| 时间建模 | 光流+轨迹 | 无/有限 | 3D卷积 |
| 特征维度 | 高维稀疏 | 4096 | 4096 |
| 计算效率 | 慢（光流计算） | 快 | 快（91.5 fps） |
| 通用性 | 仅动作 | 仅外观 | 时空通用 |
| 紧凑性 | 差 | 中等 | 优（10维仍52.8%） |

> 💡 关键优势：C3D 的计算效率极高，在单GPU上可达 313 fps 的特征提取速度（仅卷积部分），完整流程约 91.5 fps，比实时处理快数倍。同时，C3D 特征与 iDT 互补，二者融合可进一步提升性能。

#### 🧪 练习题
```yaml
question: "C3D 网络中 Pool1 层使用 1×2×2 的池化核（时间维度步长为1）的主要原因是什么？"
options:
  - "减少计算量，加速训练过程"
  - "在网络早期保留时间信息，避免过早丢失时序细节"
  - "与2D池化保持兼容，方便迁移学习"
  - "防止梯度消失，提升训练稳定性"
answer: 1
explain: "作者发现在第一层池化时对时间维度进行下采样会导致时间信息过早丢失，因此Pool1仅在空间维度进行2×2下采样，保持16帧的时间分辨率不变。"
```

### LRCN

```yaml
id: lrcn
num: 4
name: LRCN
full_name: 长程循环网络 (Long-term Recurrent ConvNets)
year: '2015'
org: UC Berkeley
parent: two_stream
paper_url: https://arxiv.org/abs/1411.4389
project_url: ''
category: cnn_rnn
motivation: CNN+LSTM端到端时序建模
```

#### 📝 一句话总结
LRCN 提出将深度卷积网络（CNN）与长短期记忆网络（LSTM）端到端结合的通用架构，统一处理视觉序列输入（视频活动识别）和序列输出（图像/视频描述生成）任务，证明了深度时序建模相比单帧静态特征的显著优势。

#### 🎯 核心要点
- **统一架构**：LRCN 是一种同时具备空间深度（CNN）和时间深度（LSTM）的通用模型，可处理序列输入、序列输出或两者兼有的视觉任务
- **端到端训练**：CNN 视觉特征提取器与 LSTM 序列模型联合训练，梯度从 LSTM 反传至 CNN 实现微调
- **三大任务验证**：活动识别（UCF-101）、图像描述生成（COCO 2014）、视频描述生成（YouTube/TACoS）
- **视觉特征逐帧输入**：不同于仅在首帧输入图像特征的方法，LRCN 在每个时间步都输入视觉特征
- **分层（Factored）架构**：多层 LSTM 中将视觉输入传递到各层，增强视觉信息利用
- **RGB + 光流互补融合**：通过加权平均两种输入模态的预测分数提升活动识别性能
- **关键训练技巧**：使用 0.9 的高 dropout 率防止过拟合；fc6 特征优于 fc7

#### 🔬 深入细节
![LRCN 整体架构图](https://ar5iv.labs.arxiv.org/html/1411.4389/assets/x1.png)
*图 1：LRCN 模型总览。视觉输入经 CNN 提取特征后，逐帧送入 LSTM 进行时序建模。该架构可灵活应用于序列输入（活动识别）、序列输出（图像描述）或序列到序列（视频描述）任务。*

![任务特定实例化](https://ar5iv.labs.arxiv.org/html/1411.4389/assets/x3.png)
*图 3：LRCN 在三个任务上的具体实例化方式——活动识别（左）、图像描述（中）、视频描述（右）。*

##### 算法伪代码

```python
# LRCN 端到端训练流程（活动识别）
# 输入：视频片段 V = {f_1, f_2, ..., f_T}，T=16帧
# CNN: CaffeNet (类AlexNet)，提取 fc6 特征 (4096-d)

for clip in training_clips:
    frames = sample_frames(clip, T=16)  # 连续16帧
    
    # CNN 特征提取（权重共享）
    for t in range(T):
        x_t = CNN(frames[t])  # fc6: 4096-d 向量
    
    # LSTM 序列建模
    h_0 = zeros(hidden_size)  # flow: 1024, RGB: 256
    for t in range(T):
        h_t = LSTM(x_t, h_{t-1})
    
    # 分类：对所有时间步预测取平均
    logits = mean([Linear(h_t) for t in range(T)])
    loss = CrossEntropy(logits, label)
    
    # 端到端反向传播（含CNN微调）
    loss.backward()  # 梯度流经 LSTM → CNN
    optimizer.step()  # dropout=0.9
```

```python
# LRCN 图像描述生成
# 输入：单张图像 I，词汇表 vocab
# CNN: VGGNet，提取 fc7 特征

def generate_caption(image):
    v = CNN(image)  # 视觉特征，每步都输入
    
    words = [BOS]  # 起始符
    h = zeros(hidden_size)
    
    for t in range(max_len):
        # 视觉特征 + 词嵌入拼接后输入 LSTM
        input_t = concat(v, embed(words[-1]))
        h = LSTM(input_t, h)
        
        # 预测下一个词
        prob = softmax(Linear(h))
        next_word = sample(prob, temperature=1.5, N=100)
        
        if next_word == EOS:
            break
        words.append(next_word)
    
    return words
```

##### 动机与背景

传统视频理解方法面临两大挑战：（1）手工设计的时序特征（如 iDT）难以端到端优化；（2）早期深度学习方法（如 Karpathy 等人的大规模视频分类）仅在固定时间窗口内进行池化，无法建模长程时序依赖。同时，图像描述生成任务需要模型既理解视觉内容又能生成自然语言序列，传统方法依赖检索或模板填充。

LRCN 的核心动机是：**能否设计一个统一的深度架构，既能从原始像素中学习视觉表示，又能建模任意长度的时序动态？** 答案是将 CNN 的空间特征学习能力与 LSTM 的长程序列建模能力端到端结合。

##### 核心机制

**1. LSTM 序列建模**

LRCN 采用标准 LSTM 单元，其核心计算为：

$$i_t = \sigma(W_{xi}x_t + W_{hi}h_{t-1} + b_i)$$
$$f_t = \sigma(W_{xf}x_t + W_{hf}h_{t-1} + b_f)$$
$$o_t = \sigma(W_{xo}x_t + W_{ho}h_{t-1} + b_o)$$
$$g_t = \tanh(W_{xg}x_t + W_{hg}h_{t-1} + b_g)$$
$$c_t = f_t \odot c_{t-1} + i_t \odot g_t$$
$$h_t = o_t \odot \tanh(c_t)$$

其中 \(i_t, f_t, o_t\) 分别为输入门、遗忘门和输出门，\(c_t\) 为记忆单元状态。遗忘门允许网络选择性地保留或丢弃历史信息，这是建模长程依赖的关键。

> 💡 关键：与普通 RNN 相比，LSTM 通过门控机制解决了梯度消失问题，使得网络能够学习跨越数十帧的时序模式。

**2. CNN 视觉编码器**

视觉特征提取采用预训练的 CaffeNet（类似 AlexNet）或 VGGNet。实验发现 \(fc_6\) 层特征（4096 维）略优于 \(fc_7\)，因为 \(fc_6\) 保留了更多的视觉细节信息。CNN 权重在端到端训练中被微调，使视觉表示适应具体任务。

**3. 分层（Factored）LSTM 架构**

![分层架构变体](https://ar5iv.labs.arxiv.org/html/1411.4389/assets/x4.png)
*图 4：三种 LRCN 图像描述架构变体。左：单层直接输入；中：两层但视觉仅输入第一层；右：分层架构，视觉特征同时输入两层 LSTM。*

在多层 LSTM 中，分层架构将视觉输入不仅传递给第一层，还直接传递给更高层。这使得高层 LSTM 能够直接访问视觉信息，而非仅依赖低层的隐状态表示。实验证明分层架构在图像描述任务上带来了显著提升。

**4. 双流融合策略**

对于活动识别，LRCN 分别训练 RGB 和光流两个网络，推理时通过加权平均融合：

$$P_{final} = \alpha \cdot P_{RGB} + (1-\alpha) \cdot P_{flow}$$

实验中 \(\alpha = 1/3\)（即光流权重 2/3）时效果最佳，因为光流网络（77.28%）显著优于 RGB 网络（68.20%），运动信息对动作识别更为关键。

> ⚠️ 注意：RGB 和光流的互补性体现在不同类别上——"Typing" 等依赖物体外观的动作由 RGB 主导，而 "SoccerJuggling" 等依赖运动模式的动作由光流主导。

##### 训练与推理流程

**活动识别训练：**
- 从视频中随机采样 16 帧连续片段
- 光流使用 Brox 算法计算，以 x/y 方向光流图作为输入
- 光流 LSTM 隐藏层 1024 维，RGB LSTM 隐藏层 256 维
- 所有时间步的预测取平均作为最终分类结果
- 使用 SGD 优化，dropout 率 0.9

**图像描述生成：**
- 训练时以 teacher forcing 方式输入真实词序列
- 推理时采用采样策略：从模型分布中采样 \(N=100\) 个候选句子，温度 \(T=1.5\)，选择对数似然最高的
- Beam search（宽度 3-5）也有效，但采样策略在 CIDEr-D 指标上更优

**视频描述生成：**
- 采用两阶段方法：先用 CNN 提取帧级特征并均值池化为视频级表示
- 再用 LSTM 解码器生成描述（与图像描述共享架构）

##### 与传统方法的对比

| 方面 | 传统方法 | LRCN |
|------|----------|------|
| 时序建模 | 手工特征 + SVM/HMM | LSTM 端到端学习 |
| 视觉特征 | 固定 CNN 特征 | CNN 端到端微调 |
| 长程依赖 | 滑动窗口池化 | LSTM 记忆单元 |
| 任务通用性 | 任务特定设计 | 统一架构适配多任务 |
| 图像描述 | 检索/模板 | 序列生成 |

与 Simonyan & Zisserman 的双流网络相比，LRCN 的核心区别在于用 LSTM 替代了简单的时间池化，能够建模帧间的顺序关系而非仅聚合统计量。在 UCF-101 上，LRCN（82.34%）与双流网络（87.6%）存在差距，主要因为双流网络使用了更深的 VGGNet 和更大的光流堆叠窗口。

与 Karpathy 等人的方法（65.4%）相比，LRCN 的 LSTM 时序建模带来了巨大提升，验证了序列模型对视频理解的重要性。

##### 关键实验结果

- **UCF-101 活动识别**：LRCN-fc6 RGB 68.20%，Flow 77.28%，加权融合 82.34%（超越单帧基线 3.40%）
- **COCO 图像描述**：CIDEr-D 0.934，BLEU-4 0.585，与 Google NIC（0.946）接近
- **生成策略**：采样（N=100, T=1.5）优于贪心搜索和 beam search

#### 🧪 练习题
```yaml
question: "LRCN 中为什么在每个时间步都输入视觉特征，而非仅在第一步输入？"
options:
  - "为了减少 LSTM 的参数量"
  - "因为 LSTM 的遗忘门会逐渐丢失早期输入的视觉信息，持续输入可保持视觉信号强度"
  - "为了使模型能够处理不同分辨率的图像"
  - "因为 CNN 在不同时间步提取的特征完全不同"
answer: 1
explain: "LSTM 的遗忘门机制会随时间衰减早期信息，若仅在首帧输入视觉特征，后续时间步的视觉信号会逐渐减弱。每步都输入视觉特征确保序列模型在生成每个词时都能充分利用图像信息。"
```

### TSN

```yaml
id: tsn
num: 5
name: TSN
full_name: 时序分段网络 (Temporal Segment Networks)
year: '2016'
org: CUHK
parent: two_stream
paper_url: https://arxiv.org/abs/1608.00859
project_url: ''
category: cnn_rnn
motivation: 稀疏采样与段共识机制
```

#### 📝 一句话总结
TSN 提出基于稀疏时序采样与段共识函数的视频级表示学习框架，通过将长视频均匀分段并聚合各段特征，以极低计算开销建模完整视频的时序结构，在动作识别任务上取得了当时最优性能。

#### 🎯 核心要点
- 稀疏时序采样策略：将视频均匀划分为 K 个段，每段随机采样一个片段（snippet），以低成本覆盖整段视频
- 段共识函数（Segment Consensus）：通过聚合函数 \(G\)（均值、最大值、加权平均等）融合各段预测，实现视频级分类
- 多模态输入：支持 RGB、光流（Optical Flow）、RGB 差分（Warped Optical Flow）三种输入模态
- 跨模态预训练（Cross-modality Pre-training）：利用 RGB 模型的 ImageNet 预训练权重初始化光流网络
- 部分批归一化（Partial BN）：冻结除第一层外的所有 BN 层均值/方差，缓解小数据集过拟合
- 数据增强策略：角点裁剪（Corner Cropping）与多尺度裁剪（Multi-scale Cropping）
- 在 UCF101 上达到 94.2%，HMDB51 上达到 69.4% 的识别准确率

#### 🔬 深入细节
![TSN 框架示意图](https://ar5iv.labs.arxiv.org/html/1608.00859/assets/x1.png)
*图：TSN 的整体框架。视频被均匀分为 K 段，每段随机采样一个片段送入共享权重的 ConvNet，最终通过段共识函数聚合得到视频级预测。*

```python
# TSN 核心逻辑伪代码
def TSN(video, K=3, consensus='avg'):
    # Step 1: 将视频均匀分为 K 段
    segments = divide_video(video, K)
    
    # Step 2: 从每段随机采样一个 snippet
    snippets = [random_sample(seg) for seg in segments]
    
    # Step 3: 共享权重的 ConvNet 提取各段特征
    scores = [ConvNet(snippet, W) for snippet in snippets]
    
    # Step 4: 段共识函数聚合
    if consensus == 'avg':
        video_score = mean(scores)
    elif consensus == 'max':
        video_score = max(scores)
    elif consensus == 'weighted':
        video_score = weighted_mean(scores)
    
    # Step 5: Softmax 输出最终预测
    prediction = softmax(video_score)
    return prediction
```

**动机与背景**

在 TSN 之前，双流卷积网络（Two-Stream ConvNets）已经证明了结合 RGB 外观信息和光流运动信息对视频理解的有效性。然而，传统双流方法存在两个关键缺陷：

1. **时序建模不足**：双流网络仅在单帧或短片段（如连续 10 帧光流）上操作，无法捕获长程时序结构。
2. **训练数据有限**：视频数据集（如 UCF101 仅约 9.5K 训练视频）规模远小于图像数据集（ImageNet 120 万张），深度网络容易过拟合。

TSN 正是为了解决这两个问题而提出的。

**核心机制：稀疏采样与段共识**

TSN 的核心思想可以用一个公式概括：

$$\text{TSN}(T_1, T_2, \ldots, T_K) = \mathcal{H}\left(\mathcal{G}\left(\mathcal{F}(T_1; W), \mathcal{F}(T_2; W), \ldots, \mathcal{F}(T_K; W)\right)\right)$$

其中：
- \(T_k\) 是第 \(k\) 段中随机采样的片段
- \(\mathcal{F}(T_k; W)\) 是共享参数 \(W\) 的卷积网络对片段 \(T_k\) 的类别得分输出
- \(\mathcal{G}\) 是段共识函数，聚合所有段的预测
- \(\mathcal{H}\) 是预测函数（如 Softmax）

> 💡 关键：稀疏采样的精妙之处在于——不需要密集处理所有帧，只需从每个时间段中采样一个代表性片段。这使得计算成本与处理单个片段几乎相同（因为段数 K 通常仅为 3），却能覆盖整个视频的时序范围。

**段共识函数的选择**

论文探索了多种聚合函数 \(\mathcal{G}\)：

1. **均值聚合（Average）**：\(\mathcal{G}(F_1, \ldots, F_K) = \frac{1}{K}\sum_{k=1}^K F_k\)
2. **最大值聚合（Max）**：取各段得分的逐类最大值
3. **加权平均**：根据段的重要性分配权重
4. **Top-K 聚合**：取得分最高的 K 个段

实验表明，简单的均值聚合即可取得最优效果，这也体现了方法的简洁优雅。

**训练与优化**

基于段共识函数，TSN 的损失函数为标准交叉熵：

$$L(y, \mathcal{G}) = -\sum_{i=1}^C y_i \left( g_i - \log \sum_{j=1}^C \exp(g_j) \right)$$

其中 \(C\) 为类别数，\(g_i\) 为共识函数输出的第 \(i\) 类得分。梯度通过共识函数反传到各段的 ConvNet：

$$\frac{\partial L}{\partial W} = \frac{\partial L}{\partial \mathcal{G}} \sum_{k=1}^K \frac{\partial \mathcal{G}}{\partial \mathcal{F}(T_k)} \frac{\partial \mathcal{F}(T_k)}{\partial W}$$

**Good Practices：解决过拟合**

TSN 提出了一系列训练技巧来应对视频数据集规模小的问题：

1. **跨模态预训练**：光流输入为单通道（或双通道 x/y），无法直接使用 ImageNet 预训练的 RGB 模型。TSN 提出将 RGB 模型第一层卷积核沿通道维度取平均，再复制到光流通道数，从而实现跨模态权重迁移。

2. **部分批归一化（Partial BN）**：微调时冻结除第一个 BN 层外的所有 BN 层统计量。第一层保留更新是因为输入分布（光流 vs ImageNet 图像）差异较大，需要适配。

3. **数据增强**：
   - 角点裁剪：仅从图像的四角和中心裁剪，避免过度关注中心区域
   - 多尺度裁剪：在 {256, 224, 192, 168} 多个尺度上裁剪，增加尺度多样性

**测试时融合策略**

推理时，TSN 对每个视频均匀采样 25 帧，每帧进行 10 次裁剪（4 角 + 1 中心 × 2 翻转），最终对所有采样帧的预测取平均作为视频级预测。多模态融合采用加权平均：RGB : Flow : Warped Flow = 1 : 1.5 : 1.5。

**与传统方法的对比**

| 方法 | 时序建模范围 | 计算开销 | UCF101 |
|------|-------------|---------|--------|
| Two-Stream | 单帧/10帧 | 低 | 88.0% |
| C3D | 16帧 | 高 | 85.2% |
| LRCN | 全视频(RNN) | 高 | 82.9% |
| **TSN** | **全视频(稀疏)** | **低** | **94.2%** |

> ⚠️ 注意：TSN 的核心优势在于以极低的额外计算成本（仅 K=3 个片段）实现了全视频时序建模，避免了 RNN/3D 卷积等方法的高计算代价。

#### 🧪 练习题
```yaml
question: "TSN 中段共识函数（Segment Consensus）的主要作用是什么？"
options:
  - "对视频帧进行时序卷积以提取运动特征"
  - "聚合各时间段的片段级预测，生成视频级表示"
  - "计算相邻帧之间的光流场"
  - "对不同模态的特征进行通道拼接"
answer: 1
explain: "段共识函数 G 将 K 个时间段各自的 ConvNet 输出聚合为统一的视频级预测，是 TSN 实现长程时序建模的核心机制。"
```

### I3D

```yaml
id: i3d
num: 6
name: I3D
full_name: 膨胀3D网络 (Inflated 3D ConvNet)
year: '2017'
org: DeepMind
parent: c3d
paper_url: https://arxiv.org/abs/1705.07750
project_url: ''
category: cnn_rnn
motivation: 2D权重膨胀至3D+Kinetics预训练
```

#### 📝 一句话总结
I3D 提出将成熟的 2D 图像分类网络（Inception-V1）的卷积核和池化核沿时间维度膨胀为 3D，通过 "boring-video fixed point" 策略继承 ImageNet 预训练权重，并结合大规模 Kinetics 数据集预训练，在 UCF-101 和 HMDB-51 上取得了当时最优的动作识别性能。

#### 🎯 核心要点
- **膨胀策略（Inflation）**：将 2D 卷积核 \(N \times N\) 扩展为 3D 卷积核 \(N \times N \times N\)，使网络能够学习时空特征
- **Boring-Video Fixed Point 初始化**：将 2D 预训练权重沿时间维度重复 N 次后除以 N，保证对静态视频的输出与原 2D 网络一致
- **时间感受野节奏控制（Receptive Field Pacing）**：前两个 max-pooling 不做时间池化（\(1 \times 3 \times 3\)），后续使用对称核，平衡时空感受野增长
- **双流架构（Two-Stream I3D）**：RGB 流 + 光流流分别训练，预测时取平均，互补外观和运动信息
- **Kinetics 数据集**：400 类人体动作，约 240k 训练视频，为视频理解提供类似 ImageNet 的大规模预训练基础
- **迁移学习验证**：Kinetics 预训练后在 UCF-101 达 98.0%、HMDB-51 达 80.9%，大幅超越此前方法

#### 🔬 深入细节
##### 核心架构图

![I3D 架构对比图](https://ar5iv.labs.arxiv.org/html/1705.07750/assets/figs/architecture-finalversion.png)
*图：论文中对比的五种视频架构。从左到右：(a) 2D ConvNet + LSTM，(b) 3D ConvNet (C3D)，(c) Two-Stream 2D ConvNet，(d) 3D-Fused Two-Stream，(e) Two-Stream I3D（本文提出）。K 为总帧数，N 为单次输入帧数。*

![Inflated Inception-V1 网络结构](https://ar5iv.labs.arxiv.org/html/1705.07750/assets/figs/inflated_net.png)
*图：Inflated Inception-V1 的整体网络结构（左）及其 Inception 子模块细节（右）。所有 2D 卷积和池化操作均被膨胀为对应的 3D 版本。*

##### 算法伪代码

```python
# I3D 膨胀与初始化伪代码
def inflate_conv2d_to_3d(conv2d_weight, temporal_kernel_size=N):
    """
    将 2D 卷积权重 [C_out, C_in, H, W] 膨胀为 3D [C_out, C_in, T, H, W]
    使用 boring-video fixed point 策略
    """
    # 沿时间维度重复 N 次
    weight_3d = conv2d_weight.unsqueeze(2).repeat(1, 1, N, 1, 1)
    # 除以 N 保证对静态输入的响应不变
    weight_3d = weight_3d / N
    return weight_3d

# Two-Stream I3D 推理
def two_stream_i3d_predict(video_frames, optical_flow):
    rgb_logits = i3d_rgb(video_frames)        # [B, 400]
    flow_logits = i3d_flow(optical_flow)      # [B, 400]
    final_prediction = (rgb_logits + flow_logits) / 2
    return final_prediction
```

##### 动机与背景

视频动作识别的核心挑战在于如何有效建模时空信息。在 I3D 之前，主流方法包括：

1. **2D ConvNet + 时序聚合**（如 LSTM、时间池化）：丢失了底层的时间结构信息
2. **C3D（3D ConvNet）**：使用 3D 卷积直接建模时空，但由于参数量大，只能在较小数据集上从头训练，且无法利用 ImageNet 预训练
3. **Two-Stream 方法**：分别处理 RGB 和光流，但仍使用 2D 卷积，无法在卷积层内捕获时间模式

> 💡 关键：I3D 的核心洞察是——既然 2D 网络在 ImageNet 上已经学到了强大的空间特征，为什么不直接将这些特征"膨胀"到时间维度，让网络在保留空间表征能力的同时获得时间建模能力？

##### 核心机制：膨胀（Inflation）

**2D → 3D 膨胀**：对于一个预训练的 2D 卷积核 \(W \in \mathbb{R}^{C_{out} \times C_{in} \times d \times d}\)，膨胀为 3D 核：

$$W_{3D} = \frac{1}{t} \cdot \text{repeat}(W, t) \in \mathbb{R}^{C_{out} \times C_{in} \times t \times d \times d}$$

其中 \(t\) 为时间维度的核大小。除以 \(t\) 的原因是保证 **boring-video fixed point** 性质：当输入为静态视频（每帧相同）时，3D 网络对每帧的输出与原始 2D 网络完全一致。

**数学证明**：设输入为静态视频 \(x_1 = x_2 = \cdots = x_t = x\)，则 3D 卷积在时间维度的求和为：

$$\sum_{i=1}^{t} \frac{W}{t} * x = W * x$$

这恰好等于原始 2D 卷积的输出，因此膨胀后的网络可以无损地继承 2D 预训练权重作为起点。

##### 时间感受野节奏控制

并非所有层都使用对称的 3D 核。作者发现：

- **前两个 max-pooling 层**：使用 \(1 \times 3 \times 3\) 核（不做时间池化），避免过早压缩时间信息
- **后续池化层**：使用 \(2 \times 3 \times 3\) 核，逐步增大时间感受野
- **所有卷积层**：使用 \(3 \times 3 \times 3\) 或 \(1 \times 1 \times 1\) 核

> ⚠️ 注意：这种非对称设计是关键的工程决策。如果在早期就做时间池化，会导致时间分辨率过快下降，丢失细粒度的运动信息。

##### 训练流程

1. **ImageNet 预训练**：使用 Inception-V1 在 ImageNet 上训练 2D 模型
2. **膨胀初始化**：将所有 2D 权重按 boring-video fixed point 策略膨胀为 3D
3. **Kinetics 预训练**：在 Kinetics-400 上端到端训练 I3D，输入为 64 帧 RGB（或光流），分辨率 224×224
4. **下游微调**：在目标数据集（UCF-101/HMDB-51）上微调，替换最后的分类层

训练细节：
- 输入：64 帧 @ 25fps（约 2.56 秒时间跨度）
- 优化器：SGD + momentum 0.9
- 数据增强：随机裁剪 224×224、随机左右翻转
- 测试时：对整个视频均匀采样多个 clip，取平均预测

##### 与传统方法的对比

| 方法 | 时间建模 | 预训练利用 | UCF-101 | HMDB-51 |
|------|---------|-----------|---------|---------|
| Two-Stream (2014) | 光流 | ImageNet 2D | 88.0% | 59.4% |
| C3D (2015) | 3D 卷积 | Sports-1M | 82.3% | 51.6% |
| TSN (2016) | 段级采样 | ImageNet 2D | 94.2% | 69.4% |
| **I3D (Two-Stream)** | **3D 卷积 + 光流** | **ImageNet → Kinetics** | **98.0%** | **80.9%** |

I3D 的优势在于：
1. **兼得 2D 预训练与 3D 时空建模**：通过膨胀策略，不需要从头训练 3D 网络
2. **大规模视频预训练**：Kinetics 提供了足够的视频数据来微调 3D 参数
3. **端到端时空学习**：不同于后期融合方法，I3D 在每一层都同时处理时空信息

#### 🧪 练习题
```yaml
question: "I3D 中 boring-video fixed point 策略的核心操作是什么？"
options:
  - "将 2D 权重沿通道维度复制并求平均"
  - "将 2D 权重沿时间维度重复 N 次后除以 N"
  - "随机初始化时间维度的卷积核权重"
  - "使用时间维度的均值池化替代卷积"
answer: 1
explain: "Boring-video fixed point 将 2D 卷积核沿时间维度重复 N 次后除以 N，确保对静态视频（每帧相同）的响应与原始 2D 网络一致，从而无损继承预训练权重。"
```

### Non-local

```yaml
id: non_local
num: 7
name: Non-local
full_name: 非局部神经网络 (Non-local Neural Networks)
year: '2018'
org: FAIR
parent: i3d
paper_url: https://arxiv.org/abs/1711.07971
project_url: ''
category: transformer
motivation: 自注意力捕捉长程时空依赖
```

#### 📝 一句话总结
提出了非局部（Non-local）操作作为通用神经网络构建模块，通过计算所有位置间的加权响应直接捕获长程依赖关系，在视频分类、目标检测与分割、姿态估计等任务上均取得显著提升。

#### 🎯 核心要点
- 提出通用的非局部操作公式：\(y_i = \frac{1}{\mathcal{C}(x)} \sum_{\forall j} f(x_i, x_j) \cdot g(x_j)\)，一次操作即可聚合全局信息
- 4 种成对函数实例化：Gaussian、Embedded Gaussian（等价于 self-attention）、Dot-product、Concatenation，实验证明效果相近
- 设计可即插即用的 Non-local Block：包含残差连接 \(z_i = W_z y_i + x_i\)，可嵌入任意已有架构的任意位置
- 效率优化：通道瓶颈（bottleneck）减半通道数 + 子采样（subsampling）将计算量降至约 1/4
- 视频分类 Kinetics：NL I3D ResNet-101 达到 77.7% top-1（128帧），超越当时所有 RGB 方法
- 视频分类 Charades：NL I3D 达到 39.5% mAP，超越 2017 竞赛冠军
- 静态图像 COCO：仅加 1 个 NL block，目标检测 AP 提升 ~1 点，关键点检测 AP 提升 1.4 点
- 证明非局部建模与 3D 卷积互补：NL + I3D 优于单独使用任一方法

#### 🔬 深入细节
![Non-local Block 结构示意图](https://ar5iv.labs.arxiv.org/html/1711.07971/assets/x2.png)
*图：Non-local Block 的计算图。输入 x 经过 θ、φ、g 三个变换后计算成对关系，输出经 W_z 投影后与输入残差相加。*

```python
# Non-local Block 伪代码 (Embedded Gaussian 版本)
def non_local_block(x):
    """
    x: 输入特征 [B, C, T, H, W] (视频) 或 [B, C, H, W] (图像)
    """
    batch, C, *spatial = x.shape
    
    # 1x1x1 卷积降维 (bottleneck, C -> C//2)
    theta = W_theta(x)  # [B, C//2, T*H*W]  query
    phi = W_phi(x)      # [B, C//2, T*H*W]  key
    g = W_g(x)          # [B, C//2, T*H*W]  value
    
    # 可选: 对 phi 和 g 进行子采样 (max pooling) 减少计算
    phi = max_pool(phi)  # [B, C//2, T*H*W / 4]
    g = max_pool(g)      # [B, C//2, T*H*W / 4]
    
    # 计算成对关系矩阵 (Embedded Gaussian)
    attn = softmax(theta^T @ phi)  # [B, T*H*W, T*H*W/4]
    
    # 加权聚合
    y = attn @ g^T  # [B, T*H*W, C//2]
    
    # 1x1x1 卷积恢复维度 + 残差连接
    y = W_z(y)  # [B, C, T, H, W], W_z 的 BN 初始化为 0
    return y + x  # 残差连接，初始时 block 为恒等映射
```

##### 动机与背景

传统深度网络依赖卷积和循环操作逐层堆叠来扩大感受野，存在以下根本局限：

1. **局部性**：卷积核仅覆盖局部邻域（如 3×3 或 3×3×3），捕获远程依赖需要堆叠大量层，信号在多层传播中逐渐衰减
2. **序列瓶颈**：RNN/LSTM 按时间步顺序处理，难以直接建模相距较远的帧间关系，且梯度传播路径长
3. **计算效率**：大卷积核（如全局卷积）虽然理论上可覆盖全局，但参数量和计算量不可接受

受经典计算机视觉中非局部均值（Non-local Means）去噪算法的启发，作者提出将"非局部操作"引入深度网络——让每个位置直接与所有其他位置交互，一步到位地捕获全局依赖。

##### 核心机制：非局部操作

**通用公式定义**：

$$y_i = \frac{1}{\mathcal{C}(x)} \sum_{\forall j} f(x_i, x_j) \cdot g(x_j)$$

其中：
- \(i\) 是输出位置（时空中的某一点），\(j\) 枚举所有可能位置
- \(f(x_i, x_j)\) 是成对函数，计算位置 \(i\) 和 \(j\) 之间的关系/相似度
- \(g(x_j) = W_g x_j\) 是对位置 \(j\) 特征的线性变换
- \(\mathcal{C}(x)\) 是归一化因子

> 💡 关键直觉：非局部操作本质上是一种"软注意力"——对所有位置的特征做加权平均，权重由位置间的相似度决定。这使得网络可以在单层内直接"看到"并利用远处的信息。

**四种成对函数 \(f\) 的实例化**：

| 变体 | 公式 | 归一化 \(\mathcal{C}(x)\) | 特点 |
|------|------|--------------------------|------|
| Gaussian | \(f = e^{x_i^T x_j}\) | \(\sum_j f(x_i, x_j)\) | 原始空间计算相似度 |
| Embedded Gaussian | \(f = e^{\theta(x_i)^T \phi(x_j)}\) | \(\sum_j f(x_i, x_j)\) | **等价于 self-attention** |
| Dot-product | \(f = \theta(x_i)^T \phi(x_j)\) | \(N\)（位置总数） | 无 softmax，更简洁 |
| Concatenation | \(f = \text{ReLU}(w_f^T [\theta(x_i), \phi(x_j)])\) | \(N\) | 非对称关系建模 |

其中 \(\theta(x_i) = W_\theta x_i\)，\(\phi(x_j) = W_\phi x_j\) 为嵌入变换。

> ⚠️ 重要发现：实验表明四种变体效果相近（Kinetics 上差异 < 0.5%），说明**非局部行为本身**（而非特定的注意力归一化方式）才是性能提升的关键。

##### Non-local Block 的工程设计

为了将非局部操作无缝嵌入现有网络，作者设计了 Non-local Block：

$$z_i = W_z y_i + x_i$$

关键设计选择：

1. **残差连接**：输出 = 非局部响应 + 原始输入。\(W_z\) 的 BatchNorm 层初始化为零，使得初始时整个 block 等价于恒等映射，不破坏预训练权重
2. **瓶颈结构**：\(W_\theta, W_\phi, W_g\) 将通道数从 \(C\) 降至 \(C/2\)，\(W_z\) 再恢复为 \(C\)，计算量减半
3. **子采样技巧**：对 \(\phi\) 和 \(g\) 的空间维度做 max pooling（步长为2），将注意力矩阵大小缩减为 1/4，不影响性能

##### 时空域中的非局部操作

在视频理解中，非局部操作可以在不同维度上应用：
- **时空联合**（spacetime）：\(j\) 遍历所有帧的所有空间位置 → 效果最优
- **仅空间**（space-only）：\(j\) 仅遍历当前帧内的空间位置
- **仅时间**（time-only）：\(j\) 仅遍历同一空间位置在不同帧的特征

实验证明时空联合版本最优（73.8% vs 72.9%/73.1%），因为它能同时捕获空间中的物体关系和时间中的运动模式。

##### 与 Self-Attention 的关系

作者明确指出 Embedded Gaussian 版本的非局部操作**数学上等价于 Transformer 中的 self-attention**：

$$y = \text{softmax}(x^T W_\theta^T W_\phi x) \cdot g(x)$$

但本文的贡献在于：
1. 将 self-attention 从 NLP 序列推广到**时空视觉特征**
2. 证明 softmax 归一化并非必要（dot-product 版本同样有效）
3. 提出了实用的 block 设计使其可嵌入任意 CNN 架构

##### 实验结果

**Kinetics 视频分类**：

| 模型 | Backbone | 帧数 | Top-1 (%) |
|------|----------|------|-----------|
| C2D baseline | R-50 | 32 | 71.8 |
| NL C2D (5 blocks) | R-50 | 32 | 73.8 |
| NL C2D (5 blocks) | R-101 | 32 | 75.1 |
| I3D | R-50 | 32 | 73.3 |
| NL I3D (5 blocks) | R-50 | 32 | 74.9 |
| NL I3D (5 blocks) | R-101 | 128 | **77.7** |

**COCO 目标检测/分割**（Mask R-CNN + 1 NL block）：

| Backbone | AP^box (baseline → +NL) | AP^mask (baseline → +NL) |
|----------|------------------------|--------------------------|
| R-50 | 38.0 → 39.0 (+1.0) | 34.6 → 35.5 (+0.9) |
| R-101 | 39.5 → 40.8 (+1.3) | 36.0 → 37.1 (+1.1) |
| X-152 | 44.1 → 45.0 (+0.9) | 39.7 → 40.3 (+0.6) |

**COCO 关键点检测**：R-101 baseline 65.1 AP → +4 NL in head + 1 NL in backbone = 66.5 AP (+1.4)

> 💡 关键洞察：即使在极深的 X-152 上，1 个 NL block 仍能带来提升，说明**非局部依赖未被现有模型充分捕获**，无论深度/容量如何增加。

#### 🧪 练习题
```yaml
question: "Non-local Neural Networks 中，Embedded Gaussian 版本的非局部操作与以下哪个机制数学上等价？"
options:
  - "LSTM 中的门控机制"
  - "Transformer 中的 self-attention"
  - "ResNet 中的跳跃连接"
  - "GAN 中的判别器"
answer: 1
explain: "Embedded Gaussian 使用 softmax(θ(x_i)^T φ(x_j)) 作为权重对 g(x_j) 加权求和，这与 Transformer self-attention 的 Query-Key-Value 机制在数学形式上完全一致。"
```

### R(2+1)D

```yaml
id: r2plus1d
num: 8
name: R(2+1)D
full_name: 分解3D卷积 (Factorized 3D Convolutions)
year: '2018'
org: Facebook
parent: c3d
paper_url: https://arxiv.org/abs/1711.11248
project_url: ''
category: cnn_rnn
motivation: 将3D卷积分解为2D空间+1D时间
```

#### 📝 一句话总结
R(2+1)D 将 3D 卷积核分解为 2D 空间卷积和 1D 时间卷积的级联，在保持参数量不变的前提下，通过增加非线性变换的数量和简化优化过程，显著提升了视频动作识别的性能。

#### 🎯 核心要点
- 系统性对比了 5 种时空卷积架构：R2D、MCx、rMCx、R3D、R(2+1)D
- 核心创新：将 \(t \times d \times d\) 的 3D 卷积分解为 \(1 \times d \times d\) 的 2D 空间卷积 + \(t \times 1 \times 1\) 的 1D 时间卷积
- 中间子空间维度 \(M_i\) 的计算公式保证分解后参数量与原始 3D 卷积一致
- 双重优势：(1) 非线性数量翻倍（每次分解之间插入 ReLU）；(2) 优化更容易（训练损失更低）
- 基于 ResNet-18/34 架构，在 clip 级别和 video 级别均达到 SOTA
- 在 Kinetics、Sports-1M、UCF101、HMDB51 四个基准上验证有效性
- 仅用 RGB 输入（无光流）即可达到甚至超过双流方法的性能

#### 🔬 深入细节
##### 示意图

![R(2+1)D 时空卷积分解示意图](https://ar5iv.labs.arxiv.org/html/1711.11248v3/assets/x1.png)
*图：(a) 全 3D 卷积 vs (b) (2+1)D 分解卷积。3D 卷积核 \(t \times d \times d\) 被分解为空间 2D 卷积 \(1 \times d \times d\) 和时间 1D 卷积 \(t \times 1 \times 1\)，中间通过 ReLU 非线性连接。*

##### 算法伪代码

```python
# R(2+1)D 分解卷积块伪代码
def r2plus1d_block(x, N_in, N_out, t=3, d=3):
    """
    x: 输入特征 [B, N_in, T, H, W]
    N_in: 输入通道数
    N_out: 输出通道数
    t: 时间卷积核大小
    d: 空间卷积核大小
    """
    # 计算中间子空间维度 M_i，保证总参数量 ≈ 原始 3D 卷积
    M_i = int(t * d * d * N_in * N_out / (d * d * N_in + t * N_out))
    
    # 第一步：2D 空间卷积 (1 × d × d)
    z = Conv3D(x, kernel=(1, d, d), in_ch=N_in, out_ch=M_i)
    z = BatchNorm(z)
    z = ReLU(z)  # 额外的非线性！
    
    # 第二步：1D 时间卷积 (t × 1 × 1)
    y = Conv3D(z, kernel=(t, 1, 1), in_ch=M_i, out_ch=N_out)
    y = BatchNorm(y)
    y = ReLU(y)
    
    return y
```

##### 动机与背景

视频理解的核心挑战在于如何有效建模时空信息。早期方法如 C3D 和 I3D 直接使用 3D 卷积处理视频，但 3D 卷积存在两个关键问题：

1. **参数量大、优化困难**：3D 卷积核的参数空间比 2D 卷积大一个数量级，导致训练过程中更容易陷入局部最优。
2. **时空耦合**：3D 卷积同时学习空间和时间特征，但空间外观和时间运动本质上是两种不同性质的信息，强制耦合可能限制模型的表达能力。

在此之前，已有一些工作尝试分解时空建模（如 P3D、S3D），但缺乏系统性的对比研究。本文的核心贡献在于：**系统性地比较了多种时空卷积设计方案，并证明 (2+1)D 分解是最优选择。**

##### 核心机制：(2+1)D 分解

**五种架构对比**

论文系统研究了以下五种基于 ResNet 的时空卷积架构：

| 架构 | 描述 |
|------|------|
| **R2D** | 仅使用 2D 卷积，将视频帧拼接为多通道输入 |
| **MCx** | 前 x 层使用 3D 卷积（底层），其余使用 2D 卷积（高层） |
| **rMCx** | 前 x 层使用 2D 卷积（底层），其余使用 3D 卷积（高层） |
| **R3D** | 全部使用 3D 卷积 |
| **R(2+1)D** | 全部使用 (2+1)D 分解卷积 |

> 💡 **关键发现**：MC 和 rMC 实验表明，3D 卷积放在高层（rMCx）比放在底层（MCx）效果更好，说明时间建模在高层语义空间中更有效。但 R(2+1)D 在所有层都使用分解卷积，效果最优。

**中间维度 \(M_i\) 的设计**

将 \(N_{i-1}\) 个输入通道的 \(t \times d \times d\) 3D 卷积分解为两步时，引入中间子空间维度 \(M_i\)：

$$M_i = \left\lfloor \frac{t d^2 N_{i-1} N_i}{d^2 N_{i-1} + t N_i} \right\rfloor$$

这个公式的推导逻辑是：

- 原始 3D 卷积的参数量为 \(t \times d^2 \times N_{i-1} \times N_i\)
- 分解后：2D 空间卷积参数量 \(d^2 \times N_{i-1} \times M_i\) + 1D 时间卷积参数量 \(t \times M_i \times N_i\)
- 令两者相等：\(d^2 N_{i-1} M_i + t M_i N_i = t d^2 N_{i-1} N_i\)
- 解出 \(M_i\)

> ⚠️ 注意：\(M_i\) 的设计确保了 R(2+1)D 与 R3D 具有**完全相同的参数量**，因此性能提升完全来自架构设计而非参数增加。

**为什么 (2+1)D 分解更优？**

论文给出了两个核心原因：

**1. 非线性数量翻倍**

在每个残差块中，原始 3D 卷积后只有一个 ReLU 非线性。而 (2+1)D 分解在 2D 空间卷积和 1D 时间卷积之间额外插入了一个 ReLU，使得非线性变换的数量翻倍。更多的非线性意味着模型可以表示更复杂的函数空间。

**2. 优化更容易**

论文通过实验发现，R(2+1)D 在训练集上的损失比 R3D 更低（图 3），这表明分解后的优化景观（optimization landscape）更加平滑。直觉上，将复杂的 3D 时空滤波器分解为两个更简单的操作，降低了学习难度。

##### 训练与推理流程

**训练设置**：
- 输入：从视频中采样 L 帧（L=8 或 32），空间裁剪为 \(112 \times 112\)
- 数据增强：随机裁剪、水平翻转
- 优化器：SGD，初始学习率 0.01，在验证损失饱和时降低 10 倍
- 预训练：先在 Sports-1M 上预训练，再在 Kinetics 上微调

**推理方式**：
- **Clip 级别**：对单个 clip 进行中心裁剪预测
- **Video 级别**：从视频中均匀采样 10 个 clip，取预测平均值

**关键实验结果**：

| 方法 | Clip@1 (Kinetics) | Video@1 (Kinetics) | UCF101 | HMDB51 |
|------|-------------------|---------------------|--------|--------|
| R3D-34 | 63.0% | — | — | — |
| R(2+1)D-34 | **65.6%** | **74.3%** | **96.8%** | **74.5%** |
| I3D (RGB) | — | 71.1% | 95.6% | 74.8% |
| I3D (RGB+Flow) | — | 74.2% | 98.0% | 80.7% |

> 💡 **关键**：R(2+1)D 仅使用 RGB 输入，在 Kinetics 上的 video 级别准确率（74.3%）就超过了使用 RGB+光流双流的 I3D（74.2%），证明了分解卷积的强大建模能力。

##### 与传统方法的区别

| 对比维度 | C3D / I3D (R3D) | R(2+1)D |
|----------|-----------------|---------|
| 卷积类型 | 完整 3D 卷积 | 2D 空间 + 1D 时间分解 |
| 非线性数量 | 每个卷积后 1 个 ReLU | 每个分解块中 2 个 ReLU |
| 参数量 | 基准 | 与 R3D 相同 |
| 优化难度 | 较高（训练损失较高） | 较低（训练损失更低） |
| 时空建模 | 耦合学习 | 解耦学习，先空间后时间 |
| 预训练利用 | 需要 inflate 2D 权重 | 2D 部分可直接加载 ImageNet 权重 |

与 P3D、S3D 等同期工作相比，R(2+1)D 的独特之处在于：(1) 提供了系统性的架构对比实验；(2) 通过 \(M_i\) 公式严格控制参数量一致；(3) 从理论（非线性增加）和实验（优化景观更平滑）两个角度解释了分解的优势。

#### 🧪 练习题
```yaml
question: "R(2+1)D 相比 R3D 性能更优的核心原因是什么？"
options:
  - "R(2+1)D 使用了更多的参数"
  - "R(2+1)D 引入了注意力机制"
  - "分解增加了非线性数量并使优化更容易"
  - "R(2+1)D 使用了光流作为额外输入"
answer: 2
explain: "R(2+1)D 与 R3D 参数量相同，其优势来自两方面：(1) 2D 和 1D 卷积之间额外插入 ReLU 使非线性翻倍；(2) 将复杂的 3D 滤波器分解为两个简单操作使优化景观更平滑。"
```

### TSM

```yaml
id: tsm
num: 9
name: TSM
full_name: 时序移位模块 (Temporal Shift Module)
year: '2019'
org: MIT
parent: tsn
paper_url: https://arxiv.org/abs/1811.08383
project_url: ''
category: cnn_rnn
motivation: 零计算代价的通道时序移位
```

#### 📝 一句话总结
TSM 提出了一种零额外计算量、零额外参数的**时序移位模块**，通过沿时间维度移动部分通道的特征图来实现帧间信息交换，使 2D CNN 获得与 3D CNN 相当的时序建模能力，同时保持 2D CNN 的推理效率。

#### 🎯 核心要点
- **核心操作**：将特征图中 1/4 的通道沿时间维度分别前移和后移一帧（各 1/8），实现相邻帧间信息融合
- **零计算代价**：移位操作仅涉及数据搬运，不引入任何乘加运算和额外参数
- **部分移位策略 (Partial Shift)**：仅移位少量通道（1/4），将数据搬运开销控制在 3% 以内，避免全通道移位带来的 ~14% 延迟增加
- **残差移位策略 (Residual Shift)**：将 TSM 插入残差分支内部而非外部，通过恒等映射保留当前帧的完整空间信息，避免空间建模能力退化
- **双向 TSM (Bi-directional)**：离线场景下同时融合过去帧和未来帧，适用于高吞吐离线视频识别
- **单向 TSM (Uni-directional)**：在线场景下仅从过去帧向当前帧移位，支持实时低延迟在线视频识别
- **多层级时序融合**：TSM 可插入每个残差块，实现从低层到高层的全层级时序建模
- **发表时在 Something-Something 排行榜排名第一**；在 Jetson Nano 和 Galaxy Note8 上分别实现 13ms 和 35ms 的在线识别延迟

#### 🔬 深入细节
##### 核心示意图

![TSM 时序移位示意图](https://ar5iv.labs.arxiv.org/html/1811.08383/assets/x1.png)
*图 1：TSM 的核心操作示意。(a) 原始张量无移位；(b) 离线双向移位——同时向前和向后移动部分通道；(c) 在线单向移位——仅将过去帧的特征移入当前帧。*

![部分移位开销与残差移位性能对比](https://ar5iv.labs.arxiv.org/html/1811.08383/assets/x2.png)
*图 2：(a) 不同移位比例下的延迟开销——部分移位（1/8）可将开销控制在 3%；(b) 残差移位在所有比例下均优于原地移位，1/4 比例达到最优。*

![原地 TSM 与残差 TSM 对比](https://ar5iv.labs.arxiv.org/html/1811.08383/assets/x3.png)
*图 3：(a) 原地 TSM 在卷积层之前移位，会丢失当前帧信息；(b) 残差 TSM 在残差分支内部移位，通过 shortcut 保留完整的当前帧特征。*

##### 算法伪代码

```python
# TSM 核心操作伪代码
# 输入: x — 形状为 (N*T, C, H, W) 的特征张量
# fold: 移位通道比例，默认 1/8（前移 1/8 + 后移 1/8 = 总共 1/4）

def temporal_shift(x, T, fold_div=8):
    N_T, C, H, W = x.shape
    x = x.view(N_T // T, T, C, H, W)  # (N, T, C, H, W)
    fold = C // fold_div  # 每个方向移位的通道数

    out = x.clone()
    # 前移: 将 t+1 帧的前 fold 个通道移到 t 帧
    out[:, :-1, :fold, :, :] = x[:, 1:, :fold, :, :]
    # 后移: 将 t-1 帧的第 fold~2*fold 个通道移到 t 帧
    out[:, 1:, fold:2*fold, :, :] = x[:, :-1, fold:2*fold, :, :]
    # 剩余 C - 2*fold 个通道保持不变

    return out.view(N_T, C, H, W)

# 残差 TSM 的插入方式（在 ResNet 残差块中）:
# class ResBlock(nn.Module):
#     def forward(self, x):
#         identity = x
#         x = temporal_shift(x, T)  # 在残差分支内部移位
#         x = self.conv1(x)
#         x = self.conv2(x)
#         return x + identity  # identity 保留完整当前帧信息
```

##### 动机与背景

视频理解的核心挑战在于**时序建模**——例如区分"打开盒子"和"关闭盒子"需要理解帧的时间顺序。传统方法面临效率与性能的两难：

- **2D CNN（如 TSN）**：对每帧独立处理后平均融合，计算高效但完全忽略时序关系
- **3D CNN（如 I3D、C3D）**：联合学习时空特征，性能好但计算量巨大（通常是 2D 的 3~5 倍），难以部署到边缘设备
- **混合方法（如 ECO、R(2+1)D）**：部分层使用 3D 卷积，牺牲了低层或高层的时序建模

TSM 的核心洞察是：**卷积操作可以分解为"移位"和"乘加累积"两步**。如果在时间维度上执行移位，再将乘加累积折叠到后续的 2D 卷积中，就能以零额外计算实现时序建模。

##### 核心机制详解

**1. 移位即时序卷积**

考虑一维卷积 \(Y_i = w_1 X_{i-1} + w_2 X_i + w_3 X_{i+1}\)，它可以分解为：

- **移位步骤**：生成三个移位版本 \(X^{-1}_i = X_{i-1}\)，\(X^{0}_i = X_i\)，\(X^{+1}_i = X_{i+1}\)
- **乘加步骤**：\(Y = w_1 X^{-1} + w_2 X^{0} + w_3 X^{+1}\)

TSM 的关键在于：**移位步骤在时间维度上完成（零计算），乘加步骤被后续的 2D 空间卷积自然吸收**。这等价于在时间维度上执行了卷积核大小为 3 的时序卷积，但不需要任何额外的参数或计算。

**2. 朴素移位的两大问题**

直接将所有通道进行时序移位会导致：

- **效率问题**：全通道移位的数据搬运开销在 CPU 上高达 13.7%，GPU 上 12.4%，对于 5D 视频张量（\(N \times C \times T \times H \times W\)）尤为严重
- **精度问题**：被移位的通道丢失了当前帧的信息，严重损害 2D 骨干网络的空间建模能力，导致准确率下降 2.6%

**3. 部分移位 (Partial Shift)**

TSM 仅移位 **1/4 的通道**（1/8 前移 + 1/8 后移），其余 3/4 通道保持不变。实验表明：

$$\text{延迟开销} = \begin{cases} \sim 3\% & \text{移位 1/8 通道} \\ \sim 6\% & \text{移位 1/4 通道} \\ \sim 14\% & \text{移位全部通道} \end{cases}$$

1/4 的移位比例在时序建模能力和数据搬运开销之间取得最佳平衡。

**4. 残差移位 (Residual Shift)**

将 TSM 插入残差块的**内部分支**而非外部：

$$\mathbf{y} = \mathcal{F}(\text{TSM}(\mathbf{x})) + \mathbf{x}$$

其中 \(\mathcal{F}\) 是残差分支中的卷积操作，\(\mathbf{x}\) 是输入。由于恒等映射 \(\mathbf{x}\) 保留了当前帧的完整信息，即使移位了部分通道，空间特征学习能力也不会退化。实验证明，残差移位在所有移位比例下均优于原地移位（in-place shift）。

> 💡 **关键**：残差移位是 TSM 成功的核心设计——它让时序融合"免费搭车"于残差学习框架，既不破坏空间特征，又实现了多层级时序建模。

**5. 离线双向 TSM**

在离线视频识别中，TSM 采用双向移位：

- 从视频中均匀采样 \(T\) 帧（通常 8 或 16 帧）
- 在每个残差块中，1/8 通道从未来帧移入、1/8 通道从过去帧移入
- 所有帧堆叠为 batch 维度，共享同一个 2D CNN 骨干（如 ResNet-50）
- 最终对所有帧的 logits 取平均得到预测

这与 TSN 的流程完全一致，唯一区别是在每个残差块中插入了 TSM，因此参数量和计算量与 2D 基线完全相同。

**6. 在线单向 TSM**

在线场景中不能访问未来帧，TSM 改为单向移位：

- 每帧到达时，缓存当前帧 1/8 通道的特征图
- 下一帧处理时，用缓存的旧特征替换对应通道（7/8 当前 + 1/8 缓存）
- 仅需 **0.9MB** 内存缓存（ResNet-50），实现逐帧实时预测

> ⚠️ **注意**：在线 TSM 的延迟几乎等于单帧 2D CNN 推理延迟，而非多帧累积，这是相比 ECO 等方法的关键优势。

##### 与传统方法的对比

| 方法 | 时序建模 | 额外计算 | 额外参数 | 部署友好 |
|------|---------|---------|---------|---------|
| TSN (2D CNN) | ❌ 无 | 0 | 0 | ✅ |
| I3D (3D CNN) | ✅ 强 | ~3-5× | ~1.5× | ❌ |
| R(2+1)D (分解 3D) | ✅ 中 | ~1.5× | ~1.2× | ⚠️ |
| ECO (混合) | ⚠️ 部分层 | ~1.5× | ~1.2× | ⚠️ |
| **TSM (本文)** | **✅ 全层级** | **0** | **0** | **✅** |

TSM 的核心优势在于：它在**不增加任何计算和参数**的前提下，通过纯数据搬运操作实现了与 3D CNN 可比的时序建模能力，且完全兼容现有 2D CNN 骨干和预训练权重。

#### 🧪 练习题
```yaml
question: "TSM 将移位模块插入残差分支内部（而非外部）的主要目的是什么？"
options:
  - "减少模型的总参数量"
  - "通过恒等映射保留当前帧的完整空间信息，避免空间建模能力退化"
  - "加速移位操作的数据搬运效率"
  - "使模型能够访问更多相邻帧的信息"
answer: 1
explain: "残差移位通过 shortcut 连接保留了当前帧的完整特征，即使部分通道被移位到相邻帧，空间信息也不会丢失，从而避免了原地移位导致的精度下降。"
```

### SlowFast

```yaml
id: slowfast
num: 10
name: SlowFast
full_name: 双速网络 (SlowFast Networks)
year: '2019'
org: FAIR
parent: i3d
paper_url: https://arxiv.org/abs/1812.03982
project_url: ''
category: cnn_rnn
motivation: 双速采样捕捉外观与运动
```

#### 📝 一句话总结
SlowFast 提出了一种双路径视频识别网络，其中 Slow 路径以低帧率捕捉空间语义信息，Fast 路径以高帧率（\(\alpha\) 倍）但极轻量（\(\beta\) 倍通道）的方式捕捉细粒度时序运动信息，两条路径通过横向连接融合，在无需光流或 ImageNet 预训练的情况下取得了视频识别的全面 SOTA。

#### 🎯 核心要点
- **双路径架构**：Slow pathway（低帧率、高通道容量）捕捉空间语义，Fast pathway（高帧率、低通道容量）捕捉时序运动
- **关键超参数**：速度比 \(\alpha = 8\)（Fast 帧率是 Slow 的 8 倍），通道比 \(\beta = 1/8\)（Fast 通道数仅为 Slow 的 1/8）
- **计算高效**：Fast pathway 仅占总计算量约 20%，整体网络高效
- **横向连接（Lateral Connections）**：Fast→Slow 的单向信息融合，支持 Time-to-Channel、Time-strided Sampling、Time-strided Convolution 三种实现
- **无需光流输入**：直接从 RGB 帧学习运动表征，端到端训练
- **无需 ImageNet 预训练**：从头训练（train from scratch）即可超越所有依赖预训练的方法
- **生物学启发**：类比视网膜神经节细胞中 P-cells（~80%，低时频高空间分辨率）和 M-cells（~15-20%，高时频低空间分辨率）的功能分工
- **全面 SOTA**：Kinetics-400（79.8% top-1）、Kinetics-600（81.8% top-1）、Charades（42.5% mAP）、AVA（28.3% mAP）

#### 🔬 深入细节
##### 架构总览

![SlowFast 网络架构示意图](https://ar5iv.labs.arxiv.org/html/1812.03982/assets/x1.png)
*图：SlowFast 网络架构。上方为 Slow pathway（低帧率，高通道），下方为 Fast pathway（高帧率，轻量通道），通过横向连接（Lateral Connections）在每个阶段进行信息融合。*

##### 算法伪代码

```python
# SlowFast Networks 前向传播伪代码
def slowfast_forward(video_clip, tau=16, alpha=8):
    """
    video_clip: 原始视频片段，共 T_total 帧
    tau: Slow pathway 采样步长
    alpha: Fast/Slow 帧率比
    """
    # 1. 帧采样
    slow_frames = sample_every(video_clip, stride=tau)        # T 帧 (e.g., 4)
    fast_frames = sample_every(video_clip, stride=tau//alpha)  # αT 帧 (e.g., 32)
    
    # 2. 双路径独立处理 + 横向连接融合
    for stage in [res2, res3, res4, res5]:
        slow_feat = slow_pathway[stage](slow_feat)    # 通道: C
        fast_feat = fast_pathway[stage](fast_feat)     # 通道: βC (β=1/8)
        
        # 横向连接: Fast → Slow (单向)
        lateral_feat = lateral_connection(fast_feat)   # 变换时间维度匹配
        slow_feat = concat(slow_feat, lateral_feat)    # 沿通道维度拼接
    
    # 3. 全局池化 + 分类
    slow_out = global_avg_pool(slow_feat)  
    fast_out = global_avg_pool(fast_feat)
    logits = fc(concat(slow_out, fast_out))
    return logits
```

##### 动机与背景

视频理解的核心挑战在于同时建模**空间语义**（场景中有什么物体、人物）和**时序运动**（动作如何随时间变化）。传统方法主要有两条技术路线：

1. **双流网络（Two-Stream）**：分别处理 RGB 帧（空间流）和光流（时间流），但光流计算代价极高且需要预计算存储
2. **3D 卷积网络（C3D/I3D）**：将 2D 卷积扩展为 3D 以同时建模时空，但对所有通道使用相同的时间分辨率，无法区分空间语义和运动信息的不同需求

> 💡 **关键洞察**：识别视觉内容的"类别"（如识别一个人在做什么动作的类型）变化相对缓慢，不需要高帧率；而捕捉运动的"细节"（如手的快速移动方向）需要高时间分辨率。这两类信息的计算需求天然不对称。

这一洞察与灵长类视觉系统的生物学发现高度吻合：视网膜中约 80% 的神经节细胞为 **P-cells**（Parvocellular），对空间细节和颜色敏感但时间响应慢；约 15-20% 为 **M-cells**（Magnocellular），时间分辨率高但对空间细节和颜色不敏感。SlowFast 网络正是对这种生物学分工的计算建模。

##### 核心机制详解

**1. Slow Pathway — 空间语义建模**

Slow pathway 以较大的时间步长 \(\tau\)（默认 16）对视频进行稀疏采样，输入 \(T\) 帧（通常 \(T = 4\) 或 \(T = 8\)）。它使用完整的通道容量来建模丰富的空间语义信息：

$$T_{slow} = T, \quad \text{采样步长} = \tau$$

Slow pathway 可以是任何时空卷积网络（如 ResNet-50/101 的 3D 变体）。在默认配置中，Slow pathway 仅在较深的阶段（res\(_4\) 和 res\(_5\)）使用时间卷积（temporal kernel size = 3），浅层不做时间建模，这与其"关注空间语义"的设计目标一致。

**2. Fast Pathway — 时序运动建模**

Fast pathway 以 \(\alpha\) 倍更高的帧率采样，输入 \(\alpha T\) 帧（默认 \(\alpha = 8\)，即 32 帧），但通道数仅为 Slow 的 \(\beta\) 倍（默认 \(\beta = 1/8\)）：

$$T_{fast} = \alpha T, \quad \text{采样步长} = \tau / \alpha$$

$$C_{fast} = \beta \cdot C_{slow}$$

> ⚠️ **关键设计**：Fast pathway 的计算量约为 \(\beta^2 \times \alpha \approx (1/8)^2 \times 8 \approx 12.5\%\) 的 Slow pathway 计算量。这意味着增加 Fast pathway 仅带来约 20% 的额外计算开销，但显著提升了运动建模能力。

Fast pathway 的另一关键特征是**全程无时间下采样**（no temporal downsampling via pooling）。在所有阶段中，时间维度保持不变（或仅通过 stride=1 的时间卷积），确保细粒度的时间信息不被丢失。同时，Fast pathway 在每个残差块中都使用时间卷积（temporal kernel size = 3），充分利用高时间分辨率。

**3. 横向连接（Lateral Connections）— 信息融合**

两条路径通过横向连接在每个阶段进行融合，方向为 **Fast → Slow**（单向）。由于两条路径的时间维度不同（\(\alpha T\) vs \(T\)），需要进行时间维度变换。论文探索了三种方式：

| 方式 | 操作 | 输出通道数 |
|------|------|-----------|
| Time-to-Channel | 将 \(\alpha T\) 帧 reshape 为 \(T\) 帧，通道扩展 \(\alpha\) 倍 | \(\alpha \beta C\) |
| Time-strided Sampling | 每隔 \(\alpha\) 帧采样一帧 | \(\beta C\) |
| Time-strided Convolution | 使用 5×1² 卷积，时间 stride=\(\alpha\) | \(2\beta C\) |

融合方式为在通道维度上拼接（concatenation）到 Slow pathway 的特征上。实验表明 **Time-strided Convolution** 效果最佳（75.6% vs 75.3%/74.9%）。

**4. 网络实例化**

![SlowFast 网络实例化架构表](https://ar5iv.labs.arxiv.org/html/1812.03982/assets/x2.png)
*图：SlowFast 网络的具体实例化架构（基于 ResNet-50），展示了 Slow 和 Fast 两条路径在每个阶段的具体配置。*

基于 ResNet-50 的 SlowFast 网络具体配置：

| 阶段 | Slow pathway | Fast pathway |
|------|-------------|-------------|
| 输入 | \(T \times 224^2\)，\(T=4\) 或 8 | \(\alpha T \times 224^2\)，32 或 64 帧 |
| conv\(_1\) | 1×7² stride 1,1,2 | 5×7² stride 1,1,2 |
| res\(_2\) | 1×1,1×3,1×1 ×3 | 3×1,1×3,3×1 ×3 |
| res\(_3\) | 1×1,1×3,1×1 ×4 | 3×1,1×3,3×1 ×4 |
| res\(_4\) | 3×1,1×3,3×1 ×6 | 3×1,1×3,3×1 ×6 |
| res\(_5\) | 3×1,1×3,3×1 ×3 | 3×1,1×3,3×1 ×3 |
| 通道数 | 64→2048 | 8→256 |

> 💡 **注意**：Slow pathway 在 res\(_2\)、res\(_3\) 使用时间 kernel=1（无时间卷积），仅在 res\(_4\)、res\(_5\) 使用时间 kernel=3；而 Fast pathway 在所有阶段都使用时间 kernel=3，体现了其专注于时间建模的设计。

##### 训练与推理

**训练细节**：
- 从随机初始化训练（不使用 ImageNet 预训练），使用同步 SGD，128 GPU
- 使用半周期余弦学习率调度，基础学习率 0.1（线性缩放）
- 输入：随机裁剪 224×224，随机水平翻转
- Batch Normalization 使用 synchronized BN

**推理策略**：
- 时间维度：均匀采样 10 个 clip
- 空间维度：3 个 crop（左、中、右）
- 最终预测为 30 个 view 的 softmax 平均

##### 与传统方法的对比

| 特性 | 双流网络 | I3D/C3D | SlowFast |
|------|---------|---------|----------|
| 运动输入 | 光流（需预计算） | RGB（隐式） | RGB（显式双路径） |
| 时间分辨率 | 固定 | 固定 | 自适应（双帧率） |
| 计算分配 | 两流等量 | 统一 | 不对称（Slow重+Fast轻） |
| 预训练依赖 | ImageNet | ImageNet | 无需 |
| K400 top-1 | ~73% | ~75% | **79.8%** |

SlowFast 的核心优势在于：(1) 通过不对称的通道分配实现了高效的计算利用；(2) 无需光流即可显式建模运动；(3) 端到端可训练，无需分阶段预训练。

##### 实验亮点

![SlowFast 在 AVA 数据集上的检测结果](https://ar5iv.labs.arxiv.org/html/1812.03982/assets/x3.png)
*图：SlowFast 在 AVA 动作检测数据集上的可视化结果，展示了对多人多动作场景的精确检测能力。*

- **Kinetics-400**：SlowFast R101+NL 达到 **79.8% top-1**，比此前最佳（无预训练）高出 **+5.9%**
- **Kinetics-600**：**81.8% top-1**
- **Charades**：**42.5% mAP**（+12.6% 绝对提升）
- **AVA v2.1**：**28.3% mAP**（+4.7% 绝对提升）
- 消融实验验证了 \(\alpha=8, \beta=1/8\) 为最优配置，Fast pathway 不使用时间下采样至关重要

#### 🧪 练习题
```yaml
question: "SlowFast 网络中 Fast pathway 的设计核心是什么？"
options:
  - "使用更大的空间分辨率输入以捕捉细节"
  - "使用更高帧率但更少通道数，专注于时序运动建模"
  - "使用光流作为输入来显式编码运动信息"
  - "使用更深的网络层数来提升特征表达能力"
answer: 1
explain: "Fast pathway 的核心设计是以 α 倍更高的帧率采样（α=8），但仅使用 β 倍的通道数（β=1/8），从而以极低的计算开销（~20%）专注于捕捉细粒度的时序运动信息。"
```

### TimeSformer

```yaml
id: timesformer
num: 11
name: TimeSformer
full_name: 时空Transformer (TimeSformer)
year: '2021'
org: Facebook
parent: non_local
paper_url: https://arxiv.org/abs/2102.05095
project_url: ''
category: transformer
motivation: 分层时空自注意力机制
```

#### 📝 一句话总结
TimeSformer 将 ViT 扩展到视频理解，系统比较多种时空注意力分解方式，并证明先时间后空间的 Divided Space-Time Attention 能以较低计算量实现强视频时序建模。

#### 🎯 核心要点
- 纯 Transformer 视频模型：不使用 3D 卷积，直接对视频 patch token 建模
- 五种注意力方案：Space-only、Joint Space-Time、Divided、Sparse Local-Global、Axial
- Divided Space-Time 最优：先同一空间位置跨帧注意力，再同一帧内空间注意力
- 降低复杂度：将全局时空注意力的 \(O((NF)^2)\) 分解为 \(O(NF^2 + FN^2)\)
- 支持长视频：相比 3D CNN 更容易处理更多帧和长程依赖
- 依赖图像预训练：通常从 ImageNet 预训练 ViT 初始化，再迁移到视频任务

#### 🔬 深入细节
![TimeSformer 时空注意力方案](https://ar5iv.labs.arxiv.org/html/2102.05095/assets/x1.png)
*图：TimeSformer 比较的五类时空注意力，其中 Divided Space-Time 在效率和精度上表现最好。*

##### 1. 动机与背景

在 TimeSformer 之前，视频理解主流是 3D CNN 或 2D CNN + temporal module。卷积有强局部归纳偏置，但长程关系需要堆叠很多层才能覆盖；当视频帧数增加时，3D 卷积的计算和训练成本也迅速上升。

ViT 已经证明图像可以被表示为 patch token 序列并交给 Transformer 处理。TimeSformer 的关键问题是：视频有时间和空间两个维度，如果直接把所有帧的所有 patch 拼成一个长序列做全局 attention，计算和显存会过高；如果只做空间 attention，又会丢失时序信息。

##### 2. 输入表示

给定 \(F\) 帧视频，每帧大小为 \(H \times W\)，用 patch size \(P\) 划分后每帧有 \(N=HW/P^2\) 个 patch。每个 patch 经线性投影得到 token，并加入时空位置编码：

$$
z^{(0)}_{p,t} = E x_{p,t} + e^{pos}_{p,t}
$$

模型还加入分类 token。经过多层 Transformer block 后，分类 token 用于动作分类。这个表示与 ViT 非常接近，差异在于 token 多了时间索引 \(t\)。

##### 3. Divided Space-Time Attention

TimeSformer 的核心 block 将注意力拆成两步。第一步是时间注意力：对每个空间位置 \(p\)，只在不同帧的同一位置之间交互：

$$
a^{time}_{p,t} = \sum_{t'=1}^{F}
\text{Softmax}\left(\frac{q_{p,t}k_{p,t'}^\top}{\sqrt{d}}\right)v_{p,t'}
$$

第二步是空间注意力：对每一帧 \(t\)，在该帧所有空间 patch 之间交互：

$$
a^{space}_{p,t} = \sum_{p'=1}^{N}
\text{Softmax}\left(\frac{q_{p,t}k_{p',t}^\top}{\sqrt{d}}\right)v_{p',t}
$$

```python
# TimeSformer Divided Space-Time Attention 伪代码
def timesformer_block(x):
    # x: [B, F, N, D]
    for p in range(N):
        x[:, :, p] = x[:, :, p] + temporal_attention(norm(x[:, :, p]))

    for t in range(F):
        x[:, t, :] = x[:, t, :] + spatial_attention(norm(x[:, t, :]))

    x = x + mlp(norm(x))
    return x
```

这种分解让每个 token 不必一次性关注 \(NF\) 个 token，而是先关注 \(F\) 个时间邻居，再关注 \(N\) 个空间邻居。它保留了跨帧建模和帧内空间理解，同时避免全局 joint attention 的二次爆炸。

##### 4. 为什么先时间后空间有效

视频动作往往表现为同一局部区域随时间变化，例如手的位置、物体移动、姿态变化。先做时间注意力，相当于为每个空间位置提取运动线索；随后空间注意力再把这些局部时序线索组合成整帧语义。

TimeSformer 还显示，数据集对时间建模的需求不同：Kinetics 中很多类别可由场景和对象识别完成，Space-only 已有不错结果；Something-Something V2 更依赖动作方向和物体交互，Divided 注意力的优势更明显。

##### 5. 与传统方法的区别

与 3D CNN 相比，TimeSformer 没有固定卷积核大小限制，每层 attention 可以建立更长距离依赖；与全局时空 Transformer 相比，它通过结构化分解降低计算；与后续 Video Swin 相比，它仍偏全局空间注意力，而 Video Swin 引入局部窗口和层级结构进一步提升效率。

> 💡 关键：TimeSformer 的贡献不只是“把 ViT 用到视频”，而是系统证明时空注意力的分解方式决定了视频 Transformer 的可训练性和效率。

#### 🧪 练习题
```yaml
question: "TimeSformer 中 Divided Space-Time Attention 的核心设计是什么？"
options:
  - "只做空间注意力，完全忽略时间维度"
  - "先在同一空间位置跨帧做时间注意力，再在同一帧内做空间注意力"
  - "把视频先压缩成单张图片再分类"
  - "用 NMS 删除重复视频片段"
answer: 1
explain: "Divided 方案把时空注意力拆成时间和空间两步，在保留时序建模的同时降低全局 joint attention 的计算量。"
```

### ViViT

```yaml
id: vivit
num: 12
name: ViViT
full_name: 视频视觉Transformer (Video Vision Transformer)
year: '2021'
org: Google
parent: timesformer
paper_url: https://arxiv.org/abs/2103.15691
project_url: ''
category: transformer
motivation: 多种时空因子化方案
```

#### 📝 一句话总结
ViViT 提出了四种基于纯 Transformer 的视频分类模型变体，通过不同粒度的时空注意力因子化策略，在大幅降低计算复杂度的同时实现了五个主流视频基准上的 SOTA 性能。

#### 🎯 核心要点
- 提出 4 种时空注意力模型变体：联合时空注意力(Model 1)、因子化编码器(Model 2)、因子化自注意力(Model 3)、因子化点积注意力(Model 4)
- 两种视频 token 化方法：均匀帧采样(Uniform frame sampling) 和 管状嵌入(Tubelet embedding, 3D卷积)
- 管状嵌入的"中心帧初始化"策略优于传统的滤波器膨胀(filter inflation)方法
- 从预训练 ViT 有效初始化视频模型：位置嵌入时间维重复 + 管状嵌入中心帧初始化
- 针对小数据集的正则化策略组合：随机深度 + RandAugment + 标签平滑 + Mixup（+5.3% on Epic Kitchens）
- 在 Kinetics 400/600、Epic Kitchens 100、Something-Something v2、Moments in Time 五个基准上达到 SOTA

#### 🔬 深入细节
![ViViT 模型架构总览](https://ar5iv.labs.arxiv.org/html/2103.15691v1/assets/x1.png)
*图：ViViT 的四种模型变体示意图。从左到右分别为：联合时空注意力、因子化编码器、因子化自注意力、因子化点积注意力。*

```python
# ViViT 因子化编码器 (Model 2) 伪代码
def vivit_factorised_encoder(video, spatial_transformer, temporal_transformer):
    # Step 1: Tokenization - 提取 tubelet embeddings
    # video: [B, T, H, W, C] -> tubelets via 3D conv
    tokens = tubelet_embedding(video)  # [B, n_t, n_h*n_w, d]
    
    # Step 2: 空间编码器 - 独立处理每帧的空间token
    spatial_outputs = []
    for t in range(n_t):
        frame_tokens = tokens[:, t]  # [B, n_h*n_w, d]
        frame_tokens = prepend_cls(frame_tokens)
        encoded = spatial_transformer(frame_tokens)  # L_s layers
        spatial_outputs.append(encoded[:, 0])  # CLS token as frame repr
    
    # Step 3: 时间编码器 - 聚合帧级表示
    temporal_tokens = stack(spatial_outputs)  # [B, n_t, d]
    temporal_tokens = prepend_cls(temporal_tokens)
    output = temporal_transformer(temporal_tokens)  # L_t layers
    
    # Step 4: 分类
    return classify(output[:, 0])  # final CLS token
```

**动机与背景**

视频理解长期依赖 3D 卷积网络（如 I3D、SlowFast），但卷积的感受野有限且随深度线性增长，难以高效建模长程时空依赖。Vision Transformer (ViT) 在图像分类上展现了纯注意力架构的潜力，但直接将 ViT 扩展到视频面临严峻的计算挑战：对于 \(n_t\) 帧、每帧 \(n_h \times n_w\) 个 patch 的视频，联合注意力的复杂度为 \(O((n_t \cdot n_h \cdot n_w)^2)\)，这在实际视频长度下是不可接受的。

**核心机制：四种时空因子化策略**

**Model 1 — 联合时空注意力（Spatio-temporal attention）**

最直接的方案：将视频所有时空 token 拼接后送入标准 Transformer 编码器。每个 token 可以关注所有其他时空位置，建模能力最强但计算量最大：

$$\mathbf{y} = \text{MSA}(\text{LN}(\mathbf{z})) + \mathbf{z}, \quad \text{复杂度} = O((n_t \cdot n_h \cdot n_w)^2)$$

**Model 2 — 因子化编码器（Factorised encoder）**

将编码过程分为两个串联阶段：首先用空间 Transformer 独立编码每帧的空间 token，提取帧级 CLS 表示；然后用时间 Transformer 聚合所有帧的表示进行时序建模。

$$\mathbf{h}_s^i = \text{SpatialTransformer}(\mathbf{z}^i), \quad i = 1, \ldots, n_t$$
$$\mathbf{y} = \text{TemporalTransformer}([\mathbf{h}_s^1, \ldots, \mathbf{h}_s^{n_t}])$$

> 💡 关键：Model 2 将复杂度从 \(O((n_t \cdot n_s)^2)\) 降至 \(O(n_t \cdot n_s^2 + n_t^2)\)，其中 \(n_s = n_h \cdot n_w\)。实验显示仅需 \(L_t = 4\) 层时间 Transformer 即可达到饱和性能，推理速度比 Model 1 快 3.4 倍。

**Model 3 — 因子化自注意力（Factorised self-attention）**

在同一个 Transformer 编码器的每一层内，将多头自注意力分为两步：先计算空间注意力（同一时间步内的 token 互相关注），再计算时间注意力（同一空间位置跨时间步互相关注）：

$$\mathbf{a}_s = \text{MSA}_{\text{spatial}}(\text{LN}(\mathbf{z})), \quad \mathbf{y} = \text{MSA}_{\text{temporal}}(\text{LN}(\mathbf{a}_s))$$

**Model 4 — 因子化点积注意力（Factorised dot-product attention）**

最细粒度的因子化：在注意力头级别操作。将每层的注意力头分为两组，一半计算空间注意力，另一半计算时间注意力，最后拼接输出：

$$\text{Attention}_{\text{spatial}}(\mathbf{Q}_s, \mathbf{K}_s, \mathbf{V}_s), \quad \text{Attention}_{\text{temporal}}(\mathbf{Q}_t, \mathbf{K}_t, \mathbf{V}_t)$$
$$\mathbf{y} = \text{Concat}(\text{head}_s^1, \ldots, \text{head}_s^{N_h/2}, \text{head}_t^1, \ldots, \text{head}_t^{N_h/2}) \mathbf{W}_O$$

**Tokenization 与初始化**

两种 token 化方法：
1. **均匀帧采样**：从视频中均匀采样 \(n_t\) 帧，每帧独立用 2D 卷积（ViT 的 patch embedding）提取 token
2. **管状嵌入（Tubelet embedding）**：用 3D 卷积核 \(\mathbb{R}^{t \times h \times w}\) 直接从视频体中提取时空 token，可在 tokenization 阶段即融合时间信息

从 ViT 预训练权重初始化 3D 管状嵌入的三种策略：
- **滤波器膨胀**：将 2D 卷积核沿时间维复制并除以 \(t\)（77.6%）
- **中心帧初始化**：仅在中心时间位置放置 2D 权重，其余置零（**79.2%，最优**）
- **随机初始化**：仅随机初始化 3D 卷积（73.2%，最差）

> ⚠️ 注意：中心帧初始化优于滤波器膨胀 1.6%，这是因为它在训练初期保持了与 ViT 完全一致的行为（仅看中心帧），然后逐步学习时间信息。

**效率与精度权衡**

| 模型 | K400 Top-1 | FLOPs (×10⁹) | 参数量 (M) | 推理时间 (ms) |
|------|-----------|--------------|-----------|--------------|
| Model 1: 联合时空 | 80.0 | 455.2 | 88.9 | 58.9 |
| Model 2: 因子化编码器 | 78.8 | 284.4 | 115.1 | 17.4 |
| Model 3: 因子化自注意力 | 77.4 | 372.3 | 117.3 | 31.7 |
| Model 4: 因子化点积 | 76.3 | 277.1 | 88.9 | 22.9 |

Model 2 在精度仅损失 1.2% 的情况下，推理速度提升 3.4 倍，是最佳的精度-效率折中方案。

**SOTA 结果**

使用 ViViT-H/14x2 (JFT 预训练) 配合 Factorised Encoder，在 Kinetics 400 达到 **84.9%** Top-1，Kinetics 600 达到 **85.8%** Top-1，大幅超越此前基于 3D CNN 的方法（SlowFast: 79.8%）和同期 TimeSformer（82.2%）。

**与传统方法的区别**

与 3D CNN（I3D、SlowFast）相比：ViViT 通过全局自注意力在每一层即可建模任意距离的时空依赖，无需堆叠多层来扩大感受野。与同期 TimeSformer 相比：ViViT 提出了更多样化的因子化方案（尤其是 Model 2 的双编码器设计），并通过系统的正则化策略在小数据集上取得更好效果（SSv2 上超出 TimeSformer 2.9%）。

#### 🧪 练习题
```yaml
question: "ViViT 的因子化编码器(Model 2)相比联合时空注意力(Model 1)的主要优势是什么？"
options:
  - "精度更高，因为分开建模空间和时间更有效"
  - "推理速度提升约3.4倍，精度仅损失约1.2%"
  - "参数量更少，因此更容易训练"
  - "不需要预训练模型即可达到SOTA"
answer: 1
explain: "Model 2 将时空注意力分解为串联的空间编码器和时间编码器，复杂度从 O((n_t·n_s)²) 降至 O(n_t·n_s² + n_t²)，推理时间从58.9ms降至17.4ms（快3.4倍），而K400精度仅从80.0%降至78.8%。"
```

### CLIP4Clip

```yaml
id: clip4clip
num: 13
name: CLIP4Clip
full_name: CLIP视频检索 (CLIP for Video Retrieval)
year: '2021'
org: Alibaba
parent: —
paper_url: https://arxiv.org/abs/2104.08860
project_url: ''
category: foundation_model
motivation: CLIP迁移至视频文本检索
```

#### 📝 一句话总结
CLIP4Clip将图像-文本预训练模型CLIP迁移到视频-文本检索任务，通过三种时序建模策略（均值池化/序列编码/跨模态交互）进行端到端微调，在五个基准数据集上取得SOTA性能。

---

#### 🎯 核心要点
- 核心动机：CLIP迁移至视频文本检索
- 代表机构：Alibaba

#### 🔬 深入细节
##### 1. 整体架构

```
┌─────────────────────────────────────────────────────────┐
│                    CLIP4Clip Framework                    │
├─────────────────────────────────────────────────────────┤
│                                                          │
│  Video: v_i ──→ [Frame Sampling] ──→ {f_1,...,f_N}      │
│                        │                                 │
│                        ▼                                 │
│              ┌──────────────────┐                        │
│              │  Video Encoder   │ (CLIP ViT-B/32)        │
│              │  2D/3D Linear +  │                        │
│              │  Transformer×12  │                        │
│              └────────┬─────────┘                        │
│                       │                                  │
│                       ▼                                  │
│              Z_i = {z_1,...,z_N}  (frame embeddings)     │
│                       │                                  │
│                       ▼                                  │
│         ┌─────────────────────────────┐                  │
│         │   Similarity Calculator     │                  │
│         │  ┌─────┐ ┌─────┐ ┌─────┐   │                  │
│         │  │meanP│ │ seq │ │tight│   │                  │
│         │  └─────┘ └─────┘ └─────┘   │                  │
│         └─────────────┬───────────────┘                  │
│                       │                                  │
│  Text: t_j ──→ ┌─────────────────┐                      │
│                │  Text Encoder   │ (CLIP Text Transf.)   │
│                │  Transformer×12 │                       │
│                └────────┬────────┘                       │
│                         │                                │
│                         ▼                                │
│                    w_j (text embedding)                   │
│                         │                                │
│                         ▼                                │
│                   s(v_i, t_j) → Similarity Score         │
└─────────────────────────────────────────────────────────┘
```

##### 2. 视频编码器

视频编码器复用CLIP的ViT-B/32图像编码器，核心修改在于patch embedding层：

- **2D Linear（默认）**：直接对每帧独立做2D patch embedding（32×32 patch → 768维），与原始CLIP一致
- **3D Linear**：将patch embedding扩展为3D卷积（时间维度kernel=3, stride=1, padding=1），捕获相邻帧的时序信息

3D Linear初始化策略（来自ViViT）：
$$E_{3D} = [0, E_{2D}, 0]$$
即将CLIP预训练的2D权重放在中心帧位置，两侧补零。

##### 3. 三种相似度计算器

**核心设计哲学**：由于CLIP已在大规模数据上预训练，新引入的参数越多，越难训练且可能破坏预训练表示。

**(a) Parameter-free Type（均值池化）**

$$\hat{z}_i = \text{mean-pooling}(z_1_i, z_2_i, \ldots, z_N_i)$$

$$s(v_i, t_j) = \frac{w_j^\top \hat{z}_i}{\|w_j\| \|\hat{z}_i\|}$$

- 无新参数，直接在CLIP的多模态嵌入空间中计算余弦相似度
- 假设：CLIP已将帧和文本映射到同一空间，简单平均即可表示视频

**(b) Sequential Type（序列编码）**

$$\tilde{Z}_i = \text{LSTM}(Z_i) \quad \text{或} \quad \tilde{Z}_i = \text{Transformer-Enc}(Z_i + P)$$

$$\hat{z}_i = \text{mean-pooling}(\tilde{Z}_i)$$

$$s(v_i, t_j) = \frac{w_j^\top \hat{z}_i}{\|w_j\| \|\hat{z}_i\|}$$

- 引入少量新参数建模帧间时序关系
- Transformer初始化：复用CLIP图像编码器对应层的权重
- 位置编码：重复CLIP文本编码器的位置编码

**(c) Tight Type（跨模态交互）**

$$U_i = [w_j, z_1_i, z_2_i, \ldots, z_N_i]$$

$$\tilde{U}_i = \text{Transformer-Enc}(U_i + P + T)$$

$$s(v_i, t_j) = \text{FC}(\text{ReLU}(\text{FC}(\tilde{U}_i[0,:])))$$

- 引入最多新参数：Transformer + 类型嵌入 + 线性投影
- 类型嵌入T区分文本token和视频帧token（类似BERT的segment embedding）
- 取第一个token（[CLS]对应位置）的输出做相似度预测

##### 4. 训练策略

**损失函数**：对称的对比学习损失（InfoNCE）

对于batch中B对(video, text)：
$$\mathcal{L}_{v2t} = -\frac{1}{B}\sum_{i=1}^{B}\log\frac{\exp(s(v_i,t_i)/\tau)}{\sum_{k=1}^{B}\exp(s(v_i,t_k)/\tau)}$$

$$\mathcal{L}_{t2v} = -\frac{1}{B}\sum_{j=1}^{B}\log\frac{\exp(s(v_j,t_j)/\tau)}{\sum_{k=1}^{B}\exp(s(v_k,t_j)/\tau)}$$

$$\mathcal{L} = \mathcal{L}_{v2t} + \mathcal{L}_{t2v}$$

其中τ为可学习温度参数（初始化自CLIP）。

**后预训练（Post-pretraining）**：在HowTo100M（136M视频-文本对）上继续训练CLIP，弥合图像-文本与视频-文本的域差距。

##### 5. 关键超参数与消融实验发现

```
┌────────────────────┬────────────────────────────────────┐
│ 超参数              │ 设置                                │
├────────────────────┼────────────────────────────────────┤
│ 预训练模型          │ CLIP ViT-B/32                      │
│ 学习率(编码器)      │ 1e-7                               │
│ 学习率(新模块)      │ 1e-4                               │
│ 优化器              │ Adam + Cosine Schedule             │
│ Batch Size         │ 128                                │
│ 帧数               │ 12                                 │
│ 文本长度            │ 32 tokens                          │
│ 训练轮数            │ 5 epochs                           │
│ Seq/Tight层数      │ 4层 Transformer                    │
│ LSTM层数            │ 1层                                │
│ 冻结策略            │ 冻结前6层                           │
│ 硬件               │ 4× NVIDIA V100 32GB                │
└────────────────────┴────────────────────────────────────┘
```

**关键发现**：
1. **学习率极其敏感**：1e-7最优，偏大（>1e-6）会严重损害性能
2. **冻结底层有效**：冻结前6层效果最好，全部微调反而下降
3. **帧数影响**：12帧通常最优，更多帧在短视频数据集上收益递减
4. **Batch Size**：越大越好（对比学习特性），128为实际最优
5. **Tight type在长视频上失效**：ActivityNet/DiDeMo上远差于meanP/seq

##### 6. 主要实验结果

| 数据集 | 方法 | R@1 | R@5 | R@10 | MdR |
|--------|------|-----|-----|------|-----|
| MSR-VTT (9K) | seqTransf | **44.5** | 71.4 | 81.6 | 2 |
| MSR-VTT (7K) | meanP | **42.1** | 71.9 | 81.4 | 2 |
| MSVD | meanP | **46.2** | 76.1 | 84.6 | 2 |
| LSMDC | seqTransf | **22.6** | 41.0 | 49.1 | 11 |
| ActivityNet | meanP/seqTransf | **40.5** | 72.4 | 98.1/98.2 | 2 |
| DiDeMo | meanP | **43.4** | 70.2 | 80.6 | 2 |

对比此前SOTA提升：MSR-VTT 9K上R@1从38.9(MDMMT)→44.5(+14.4%)

##### 7. 伪代码

```python
# CLIP4Clip Forward Pass (simplified)
def clip4clip_forward(video_frames, text, sim_type='meanP'):
    # 1. Encode video frames independently
    frame_features = []
    for frame in video_frames:  # N frames
        patch_embed = linear_projection(frame)  # 2D or 3D
        z = clip_visual_transformer(patch_embed)  # [CLS] token
        frame_features.append(z)
    Z = stack(frame_features)  # (N, d)
    
    # 2. Encode text
    w = clip_text_transformer(text)  # (d,)
    
    # 3. Similarity calculation
    if sim_type == 'meanP':
        z_hat = mean(Z, dim=0)  # (d,)
        sim = cosine_similarity(w, z_hat)
    elif sim_type == 'seqTransf':
        Z_tilde = temporal_transformer(Z + pos_embed)  # (N, d)
        z_hat = mean(Z_tilde, dim=0)  # (d,)
        sim = cosine_similarity(w, z_hat)
    elif sim_type == 'tightTransf':
        U = concat([w.unsqueeze(0), Z], dim=0)  # (N+1, d)
        U_tilde = cross_transformer(U + pos_embed + type_embed)
        sim = fc2(relu(fc1(U_tilde[0])))  # scalar
    
    return sim

# Training: symmetric contrastive loss
def clip4clip_loss(videos, texts, temperature):
    sims = compute_similarity_matrix(videos, texts)  # (B, B)
    loss_v2t = cross_entropy(sims / temperature, labels=arange(B))
    loss_t2v = cross_entropy(sims.T / temperature, labels=arange(B))
    return (loss_v2t + loss_t2v) / 2
```

---

#### 🧪 练习题
```yaml
**基础题：**
1. CLIP4Clip中parameter-free type相似度计算器的核心操作是什么？为什么这种简单方法也能取得好效果？
2. 解释为什么CLIP4Clip需要使用极小的学习率（1e-7）来微调编码器？

**进阶题：**
3. 对比三种相似度计算器，分析tight type在长视频数据集（ActivityNet/DiDeMo）上效果远差于meanP的原因。
4. 如果要将CLIP4Clip扩展到视频问答（VideoQA）任务，你会选择哪种相似度计算器？需要做哪些架构修改？

**开放题：**
5. CLIP4Clip证明了"简单迁移+端到端微调"的有效性。讨论这种范式相比"设计复杂的视频专用预训练"（如VideoBERT、ActBERT）的优劣势，以及在什么条件下后者可能更优。
```

### Video Swin

```yaml
id: video_swin
num: 14
name: Video Swin
full_name: 视频Swin Transformer (Video Swin Transformer)
year: '2022'
org: MSRA
parent: vivit
paper_url: https://arxiv.org/abs/2106.13230
project_url: ''
category: transformer
motivation: 3D偏移窗口注意力
```

#### 📝 一句话总结
Video Swin Transformer 将 Swin 的层级窗口注意力扩展到视频，用 3D window / shifted window 在局部时空块内高效建模，并通过跨窗口移位逐层扩大感受野。

#### 🎯 核心要点
- 3D Window MSA：在 \(P \times M \times M\) 时空窗口内计算注意力，复杂度近似线性于 token 数
- 3D Shifted Window：相邻层窗口沿时间、高度、宽度移位，建立跨窗口信息流
- 层级结构：继承 Swin 的 patch merging，逐 stage 降低空间分辨率并增加通道
- 3D 相对位置偏置：把 2D Swin 的相对位置偏置扩展到时间维度
- 复用图像预训练：可从 ImageNet 预训练 Swin 初始化，降低视频训练成本
- 多任务适用：在动作分类、时序相关数据集和视频检测/分割下作为通用 backbone

#### 🔬 深入细节
![Video Swin 总体结构](https://ar5iv.labs.arxiv.org/html/2106.13230/assets/x1.png)
*图：Video Swin 使用 3D patch partition、四阶段层级 backbone 和交替窗口注意力。*

##### 1. 动机与背景

TimeSformer、ViViT 等早期视频 Transformer 证明了 attention 适合视频，但全局或分解 attention 在高分辨率、多帧输入下仍然昂贵。视频还有强局部性：相邻帧、相邻空间区域通常相关，没必要在每一层都让所有 token 全局交互。

Swin Transformer 在图像中用局部窗口注意力和 shifted window 取得了很好的效率-精度平衡。Video Swin 的工作就是把这种归纳偏置扩展到视频：窗口不再是 2D 的 \(M \times M\)，而是 3D 的 \(P \times M \times M\)。

##### 2. 3D 窗口注意力

给定视频 token 特征 \(x \in \mathbb{R}^{T \times H \times W \times C}\)，模型将其划分为多个不重叠 3D 窗口。每个窗口内部执行多头自注意力：

$$
\text{Attention}(Q,K,V)=\text{Softmax}\left(\frac{QK^\top}{\sqrt{d}} + B\right)V
$$

其中 \(B\) 是 3D 相对位置偏置，覆盖时间和空间相对偏移。若窗口大小为 \(P \times M \times M\)，全局 3D attention 的二次项从 \((THW)^2\) 变为每个 token 只与 \(PM^2\) 个局部 token 交互：

$$
\Omega(\text{3D-W-MSA}) = 4THWC^2 + 2PM^2 \cdot THW \cdot C
$$

##### 3. 3D Shifted Window

![3D shifted window 机制](https://ar5iv.labs.arxiv.org/html/2106.13230/assets/figs/3d-shift-window.png)
*图：连续 block 交替使用常规 3D 窗口和移位 3D 窗口，实现跨窗口通信。*

单纯窗口注意力会让不同窗口之间没有直接通信。Video Swin 在相邻 block 中把窗口沿时间、高度、宽度移动 \((P/2, M/2, M/2)\)，使前一层分属不同窗口的 token 在后一层进入同一个窗口。

```python
# Video Swin block 伪代码
def video_swin_stage(tokens):
    for i, block in enumerate(blocks):
        if i % 2 == 0:
            windows = partition_3d(tokens, size=(P, M, M))
            out = window_attention(windows, rel_pos_bias_3d)
            tokens = merge_3d(out)
        else:
            shifted = cyclic_shift(tokens, shift=(P//2, M//2, M//2))
            windows = partition_3d(shifted, size=(P, M, M))
            out = window_attention(windows, rel_pos_bias_3d, attn_mask)
            tokens = reverse_shift(merge_3d(out))
        tokens = tokens + mlp(norm(tokens))
    return tokens
```

循环移位会在边界产生跨越原图边界的窗口片段，因此实现中需要 attention mask，确保不该互相看到的 token 不被错误连接。这与 2D Swin 的高效批处理策略一致。

##### 4. 层级视频 backbone

Video Swin 先用 3D patch partition 把输入划成 tubelet，再经过四个 stage。除最后 stage 外，每个 stage 后通过 patch merging 进行空间下采样，通道数提升。时间维度通常保持较高分辨率，以保留动作信息。

3D 相对位置偏置可由图像 Swin 的 2D 偏置初始化：时间相对位移为 0 的切片复制 2D 偏置，其他时间位置初始化或插值学习。这样模型一开始接近逐帧图像 Swin，再通过视频微调学习时序交互。

##### 5. 与 TimeSformer / ViViT 的区别

TimeSformer 通过分解时间和空间注意力降复杂度，但空间 attention 仍偏全局；ViViT 使用多种时空 factorization，但常需要较高预训练成本。Video Swin 通过局部 3D 窗口把计算限制在相邻时空块内，再靠 shifted window 逐层传播信息，更像一个层级视觉 backbone。

> 💡 关键：Video Swin 的效率来自“局部窗口”，表达力来自“移位窗口 + 层级堆叠”；它不是忽略全局，而是逐层构造更大感受野。

#### 🧪 练习题
```yaml
question: "Video Swin 中 3D Shifted Window 的主要作用是什么？"
options:
  - "在相邻窗口之间建立信息交互，扩大时空感受野"
  - "删除时间维度，只做图像分类"
  - "把所有窗口合并成全局注意力以增加计算量"
  - "替代相对位置偏置"
answer: 0
explain: "常规窗口注意力只在窗口内通信，shifted window 让不同窗口的 token 在下一层进入同一窗口，从而实现跨窗口信息流。"
```

### VideoMAE

```yaml
id: videomae
num: 15
name: VideoMAE
full_name: 视频掩码自编码器 (VideoMAE)
year: '2022'
org: Nanjing University
parent: video_swin
paper_url: https://arxiv.org/abs/2203.12602
project_url: ''
category: foundation_model
motivation: 90%高掩码率自监督预训练
```

#### 📝 一句话总结
VideoMAE 提出了针对视频数据的掩码自编码预训练方法，通过管状掩码（tube masking）策略和极高掩码比率（90-95%）克服视频时间冗余导致的信息泄漏问题，在多个视频理解基准上以极少数据实现了优异性能。

#### 🎯 核心要点
- 提出 Tube Masking 策略：对所有帧施加相同的空间掩码模式，防止时间维度的信息泄漏
- 采用极高掩码比率（90-95%），远超图像 MAE 的 75%，利用视频的时间冗余特性
- 使用 Cube Embedding 将视频 token 化：每个 token 为 \(2 \times 16 \times 16\) 的时空立方体
- 非对称 Encoder-Decoder 架构：Encoder 仅处理可见 token（10%），Decoder 轻量（4层，宽度为 Encoder 一半）
- 骨干网络为 vanilla ViT + Joint Space-Time Attention，无需归纳偏置
- 在像素空间使用 MSE 损失进行重建
- 数据高效：仅用 3.5k 视频（SSv2）即可达到有竞争力的性能
- 主要结果：Kinetics-400 87.4%、Something-Something V2 75.4%、UCF101 91.3%

#### 🔬 深入细节
![VideoMAE 框架总览图](https://ar5iv.labs.arxiv.org/html/2203.12602/assets/x1.png)
*图：VideoMAE 整体框架。视频经 Cube Embedding 后施加 Tube Masking，仅可见 token 送入 Encoder，Decoder 在完整 token 序列上重建被掩码的像素。*

![Masking 策略对比](https://ar5iv.labs.arxiv.org/html/2203.12602/assets/x2.png)
*图：不同掩码策略对比。(a) Frame Random：每帧独立随机掩码；(b) Tube Masking：所有帧共享同一掩码模式，有效防止时间信息泄漏。*

##### 算法伪代码

```python
# VideoMAE 预训练伪代码
def videomae_pretrain(video, mask_ratio=0.9):
    # 1. Cube Embedding: 将视频分割为时空 token
    # video: [T, H, W, 3] → tokens: [T/2 × H/16 × W/16, D]
    tokens = cube_embed(video, patch_size=(2, 16, 16))
    
    # 2. Tube Masking: 生成空间掩码并跨时间复制
    spatial_mask = random_mask(H//16 * W//16, mask_ratio)  # 空间维度
    tube_mask = repeat(spatial_mask, T//2)  # 时间维度复制
    
    # 3. Encoder: 仅处理可见 token (约10%)
    visible_tokens = tokens[~tube_mask]
    visible_tokens += positional_embedding[~tube_mask]
    encoded = encoder(visible_tokens)  # ViT-Base/Large/Huge
    
    # 4. Decoder: 在完整序列上重建
    full_tokens = concat(encoded, mask_tokens)  # 补回 mask token
    full_tokens += positional_embedding
    decoded = decoder(full_tokens)  # 4层, 宽度为encoder一半
    
    # 5. Loss: 仅对被掩码位置计算 MSE
    pred_pixels = linear_proj(decoded[tube_mask])
    target_pixels = original_pixels[tube_mask]
    loss = MSE(pred_pixels, target_pixels)
    return loss
```

##### 动机与背景

视频自监督学习面临的核心挑战是**时间冗余**。与图像不同，视频相邻帧之间存在极高的相似性，这使得简单地将图像 MAE 扩展到视频时，模型可以通过"偷看"相邻帧中对应位置的可见 patch 来轻松完成重建任务，而无需真正学习语义表示。

传统的对比学习方法（如 MoCo、BYOL 的视频扩展）需要大量负样本和精心设计的数据增强，且对小数据集效果有限。VideoMAE 的核心洞察是：**通过设计合适的掩码策略，可以将视频重建变成一个具有挑战性的自监督任务**。

##### 核心机制详解

**1. Cube Embedding（时空立方体嵌入）**

VideoMAE 将输入视频 \(V \in \mathbb{R}^{T \times H \times W \times 3}\) 通过 3D 卷积划分为不重叠的时空立方体 token。每个 token 覆盖 \(2 \times 16 \times 16\) 的时空区域，总共生成 \(\frac{T}{2} \times \frac{H}{16} \times \frac{W}{16}\) 个 token。

时间维度的下采样率为 2（而非 16），这是因为输入视频已经经过了时间采样（stride \(\tau = 4\) 或 2），进一步的时间压缩会丢失运动信息。

**2. Tube Masking（管状掩码）**

> 💡 关键：Tube Masking 是 VideoMAE 最核心的设计创新。

传统的 frame-level random masking 对每帧独立采样掩码位置，导致同一空间位置在不同帧中可能被掩码或可见。由于视频时间连续性，模型可以从相邻帧的可见 patch "复制" 信息来完成重建，使预训练任务过于简单。

Tube Masking 的解决方案极其简洁：**在空间维度生成一次随机掩码 \(M \in \{0,1\}^{\frac{H}{16} \times \frac{W}{16}}\)，然后将其沿时间维度复制到所有帧**。这样，如果某个空间位置被掩码，它在所有帧中都不可见，彻底消除了时间维度的信息泄漏。

$$M_{tube} = \text{repeat}(M_{spatial}, \frac{T}{2})$$

消融实验验证：在 SSv2 数据集上，tube masking（75.4%）显著优于 frame random masking（72.0%），证明了防止时间泄漏的重要性。

**3. 极高掩码比率（90-95%）**

> ⚠️ 注意：视频 MAE 的最优掩码率远高于图像 MAE（75%）。

由于视频的时间冗余，即使使用 tube masking，较低的掩码率（如 75%）仍然使任务过于简单。VideoMAE 发现 **90%** 的掩码率在 Kinetics-400 上最优，**95%** 在 Something-Something V2 上最优。

这带来了显著的计算优势：Encoder 仅需处理 10% 的 token，使得预训练效率极高。对于 ViT-Base 处理 16 帧 224×224 视频，总 token 数为 \(8 \times 14 \times 14 = 1568\)，90% 掩码后 Encoder 仅处理约 157 个 token。

**4. 非对称 Encoder-Decoder 架构**

- **Encoder**：标准 ViT（Base/Large/Huge），使用 Joint Space-Time Attention，仅处理可见 token
- **Decoder**：轻量设计，4 个 Transformer block，嵌入维度为 Encoder 的一半（如 ViT-B Encoder 768 维，Decoder 384 维）

Decoder 接收完整的 token 序列（可见 token 的 Encoder 输出 + 可学习的 mask token），添加位置编码后进行自注意力处理，最终通过线性层投影到像素空间。

**5. 重建目标**

VideoMAE 使用简单的像素级 MSE 损失，仅在被掩码的 token 位置计算：

$$\mathcal{L} = \frac{1}{|\mathcal{M}|} \sum_{i \in \mathcal{M}} \| \hat{x}_i - x_i \|^2$$

其中 \(\mathcal{M}\) 为被掩码 token 的索引集合，\(\hat{x}_i\) 为预测像素，\(x_i\) 为原始像素。

消融实验表明，简单的归一化像素值作为目标即可获得最佳效果，无需使用 tokenizer（如 dVAE）或其他复杂目标。

##### 训练与微调流程

**预训练阶段：**
- 输入：16 帧视频片段，分辨率 224×224
- 时间采样：stride \(\tau = 4\)（K400）或 \(\tau = 2\)（SSv2）
- 训练 800/1600/2400 epochs（数据集越小需要越多 epochs）
- 优化器：AdamW，学习率 1.5e-4，cosine schedule

**微调阶段：**
- 移除 Decoder，仅使用 Encoder
- 在 Encoder 输出的 [CLS] token 或全局平均池化上添加分类头
- 微调所有参数，学习率较低

##### 与传统方法的区别

| 方面 | 对比学习（MoCo/BYOL） | VideoMAE |
|------|----------------------|----------|
| 预训练任务 | 实例判别/不变性学习 | 像素重建 |
| 数据增强依赖 | 高（需精心设计） | 低（仅基本增强） |
| 负样本需求 | 需要大量负样本 | 无需负样本 |
| 小数据集表现 | 较差 | 优异（3.5k视频即有效） |
| 计算效率 | 需要动量编码器 | 90%掩码大幅降低计算量 |
| 时间建模 | 通常较弱 | 通过掩码重建强制学习时间关系 |

与图像 MAE 相比，VideoMAE 的关键创新在于：(1) tube masking 解决时间泄漏；(2) 更高掩码率适应视频冗余；(3) 证明了视频领域 vanilla ViT 无需时间归纳偏置即可通过 MAE 预训练获得强表示。

#### 🧪 练习题
```yaml
question: "VideoMAE 采用 Tube Masking 而非 Frame Random Masking 的主要原因是什么？"
options:
  - "Tube Masking 计算效率更高，减少了掩码生成的开销"
  - "防止模型利用相邻帧中同一空间位置的可见 patch 泄漏信息"
  - "Tube Masking 能生成更多训练样本，增加数据多样性"
  - "Tube Masking 使得 Decoder 结构可以更简单"
answer: 1
explain: "视频相邻帧高度相似，Frame Random Masking 下同一空间位置在不同帧可能可见，模型可直接'复制'而非学习语义。Tube Masking 确保被掩码位置在所有帧中都不可见，迫使模型学习真正的时空表示。"
```

### InternVideo

```yaml
id: internvideo
num: 16
name: InternVideo
full_name: 通用视频模型 (InternVideo)
year: '2022'
org: Shanghai AI Lab
parent: videomae
paper_url: https://arxiv.org/abs/2212.03191
project_url: ''
category: foundation_model
motivation: 多任务统一表征与多模态对齐
```

#### 📝 一句话总结
InternVideo 提出了一种双路径视频基础模型框架，将自监督掩码视频建模（VideoMAE）与多模态视频-语言对比学习通过跨模型注意力（CMA）机制统一融合，在动作识别、视频-语言对齐和开放世界理解等 39 个数据集上取得 SOTA 表现。

#### 🎯 核心要点
- **双路径架构**：掩码视频编码器（VideoMAE ViT-Huge）+ 多模态视频编码器（UniformerV2 + CLIP-ViT-L/14），分别学习时空表征与视频-语言对齐表征
- **跨模型注意力（CMA）**：冻结两个骨干网络，通过可学习的多头交叉注意力模块在两条路径间进行知识迁移与表征对齐
- **Kinetics-710 数据集**：合并 K400/K600/K700 并去重，构建包含 710 个类别、65 万视频的统一动作识别数据集
- **UnlabeledHybrid 数据集**：融合 K710、SSv2、AVA、WebVid2M 和自采集视频共约 1200 万视频片段，用于掩码视频预训练
- **大规模多模态训练**：在 WebVid2M/10M + HowTo100M + LAION-100M 上进行视频-语言联合训练，视频-图像交替迭代
- **tanh 门控机制**：CMA 模块采用 Flamingo 风格的 tanh 门控，确保新增模块初始输出为零，不破坏原始表征
- **39 个数据集 SOTA**：K400 达 91.1%、SSv2 达 77.2%，在视频检索、视频问答等任务上全面领先

#### 🔬 深入细节
![InternVideo 整体框架图](https://ar5iv.labs.arxiv.org/html/2212.03191/assets/x1.png)
*图 1：InternVideo 整体框架。左侧为掩码视频编码器（VideoMAE），右侧为多模态视频编码器（UniformerV2），两者通过跨模型注意力（CMA）进行交互融合。*

![跨模型注意力（CMA）示意图](https://ar5iv.labs.arxiv.org/html/2212.03191/assets/x4.png)
*图 2：Cross-Model Attention 的模型交互机制。冻结双骨干，通过交叉注意力模块实现双向知识迁移。*

##### 动机与背景

视频理解任务种类繁多，包括动作识别、时序定位、视频检索、视频问答等。传统方法通常只关注单一预训练范式：要么使用掩码自编码（如 VideoMAE）学习细粒度的时空表征，要么使用对比学习（如 CLIP）学习语义对齐的多模态表征。然而，这两种范式各有优劣：

- **掩码视频建模**（生成式）：擅长捕捉局部时空细节，在动作识别等细粒度任务上表现优异，但缺乏语言语义对齐能力
- **视频-语言对比学习**（判别式）：擅长语义级别的跨模态对齐，在检索、问答等任务上表现出色，但对细粒度时空建模能力有限

InternVideo 的核心思想是：**将两种互补的预训练范式统一到一个框架中**，通过跨模型注意力机制让两个编码器相互增强，构建一个真正通用的视频基础模型。

##### 掩码视频编码器（Masked Video Encoder）

掩码视频编码器基于 **VideoMAE** 框架，使用 **ViT-Huge**（632M 参数）作为骨干网络。核心训练流程：

1. **预训练数据**：在 UnlabeledHybrid 数据集（~12M 视频片段）上进行自监督预训练
2. **掩码策略**：采用管状掩码（tube masking），掩码比例高达 **90%**，迫使模型学习强大的时空表征
3. **训练配置**：在 64 块 A100 GPU 上训练 **1200 个 epoch**，学习率 \(2.5 \times 10^{-4}\)，余弦退火调度
4. **后续微调**：在 K710 上用 32 块 GPU 微调 40 个 epoch，基础学习率 0.001，层衰减 0.8

掩码视频建模的核心目标函数为像素级重建损失：

$$\mathcal{L}_{\text{MAE}} = \frac{1}{|\mathcal{M}|} \sum_{i \in \mathcal{M}} \| \hat{x}_i - x_i \|^2$$

其中 \(\mathcal{M}\) 是被掩码的 token 集合，\(\hat{x}_i\) 是重建的像素值，\(x_i\) 是原始像素值。

> 💡 **关键**：90% 的超高掩码比例是 VideoMAE 的核心设计——视频帧间存在大量冗余，高掩码比例迫使模型真正理解时空结构而非简单插值。

##### 多模态视频编码器（Multimodal Video Encoder）

多模态路径基于 **UniformerV2** 架构，以 **CLIP-ViT-L/14** 作为视觉骨干：

1. **架构设计**：在 ViT 的最后 4 层插入全局 UniBlock，实现多阶段时空融合。额外参数初始化为使输出与原始 CLIP 模型一致，这对保持零样本性能至关重要
2. **视频字幕模块**：标准 6 层 Transformer 解码器（\(c=768\)），后接两层 MLP
3. **训练数据**：WebVid2M/10M + HowTo100M（视频-文本）+ LAION-100M（图像-文本），视频和图像交替迭代训练
4. **训练配置**：128 块 A100 GPU 训练 2 周，共 400K 步；视频-文本 batch size 14,336，图像-文本 batch size 86,016；学习率 \(8 \times 10^{-5}\)

多模态训练采用标准的对比学习损失：

$$\mathcal{L}_{\text{contrast}} = -\frac{1}{N} \sum_{i=1}^{N} \left[ \log \frac{\exp(\text{sim}(v_i, t_i) / \tau)}{\sum_{j=1}^{N} \exp(\text{sim}(v_i, t_j) / \tau)} \right]$$

其中 \(v_i, t_i\) 分别是视频和文本的嵌入表示，\(\tau\) 是温度参数。

> ⚠️ **注意**：图像-文本数据的引入是关键设计——视频-文本数据集规模远小于 CLIP 的 400M 图像-文本对，因此通过图像-文本联合训练弥补数据不足。

##### 跨模型注意力（Cross-Model Attention, CMA）

CMA 是 InternVideo 的核心创新，用于在两个冻结的骨干网络之间建立知识桥梁：

```python
# CMA 伪代码
# 阶段1: 冻结两个预训练骨干
freeze(masked_video_encoder)
freeze(multimodal_video_encoder)

# 阶段2: 添加可学习的CMA模块
for layer_i in range(num_cma_layers - 1):
    # 多模态编码器的中间token作为K/V
    # 掩码编码器的token作为Q
    K, V = multimodal_encoder.intermediate_tokens[layer_i]
    Q = masked_encoder.tokens[layer_i]
    cma_out = MultiHeadCrossAttention(Q, K, V)
    cma_out = tanh_gate * FFN(cma_out)  # tanh门控，初始为0
    masked_encoder.tokens[layer_i] += cma_out

# 最后一层CMA: 方向反转
K, V = masked_encoder.final_tokens
Q = multimodal_encoder.class_token
cma_out_final = MultiHeadCrossAttention(Q, K, V)
multimodal_encoder.class_token += tanh_gate * FFN(cma_out_final)

# 阶段3: 动态加权融合预测分数
score = w1 * masked_score + w2 * multimodal_score  # w1, w2可学习，初始为0
```

CMA 的设计有以下关键特点：

1. **双向知识迁移**：前 N-1 层 CMA 将多模态知识迁移到掩码编码器（多模态→掩码），最后一层反向迁移掩码编码器的细粒度时空知识到多模态编码器（掩码→多模态）
2. **tanh 门控**：借鉴 Flamingo 的设计，在 MHCA 和 FFN 后添加 tanh 门控层，参数初始化为零，确保训练初期 CMA 输出为零，不破坏预训练表征
3. **动态分数融合**：最终预测通过可学习的线性组合动态融合两个编码器的预测分数，权重初始化为零
4. **训练效率**：仅更新 CMA 模块、分类层和多模态编码器的 query token，大幅减少可训练参数

##### Kinetics-710 数据集

InternVideo 提出了 **Kinetics-710（K710）** 数据集，通过合并 K400、K600、K700 三个 Kinetics 版本并去除重复类别构建：

- K400 有 400 类，K600 有 600 类，K700 有 700 类，三者存在大量类别重叠
- 去重后得到 **710 个唯一类别**，共约 **65 万个训练视频**
- 作为统一的动作识别微调数据集，避免了在不同 Kinetics 版本间重复实验的问题

##### 与传统方法的区别

| 维度 | 传统单路径方法 | InternVideo |
|------|---------------|-------------|
| 预训练范式 | 仅掩码建模 或 仅对比学习 | 双路径融合：掩码 + 对比 |
| 表征能力 | 偏向细粒度 或 偏向语义 | 兼具细粒度时空 + 语义对齐 |
| 模型交互 | 无 | CMA 跨模型注意力双向迁移 |
| 任务覆盖 | 单一类型任务 | 39 个数据集，3 大类任务 |
| 数据规模 | 通常单一数据集 | 12M 视频 + 100M 图文对 |

> 💡 **核心洞察**：InternVideo 的成功表明，生成式（掩码建模）和判别式（对比学习）预训练是互补的——前者提供细粒度的时空理解，后者提供语义级别的跨模态对齐，两者通过 CMA 融合后能显著超越任一单独路径。

#### 🧪 练习题
```yaml
question: "InternVideo 中跨模型注意力（CMA）最后一层的设计与前面层有何不同？"
options:
  - "最后一层使用更大的隐藏维度"
  - "最后一层的 Query 来自多模态编码器的 class token，Key/Value 来自掩码编码器"
  - "最后一层不使用 tanh 门控机制"
  - "最后一层同时融合两个编码器的所有 token"
answer: 1
explain: "前 N-1 层 CMA 以掩码编码器 token 为 Q、多模态编码器 token 为 K/V（多模态→掩码方向），而最后一层反转方向：以多模态编码器的 class token 为 Q、掩码编码器 token 为 K/V，实现掩码→多模态的知识迁移。"
```

### Mamba-3

```yaml
id: mamba3
num: 17
name: Mamba-3
full_name: 状态空间模型3代 (Mamba-3 Architecture)
year: '2026'
org: Princeton
parent: video_swin
paper_url: https://pli.princeton.edu/mamba3
project_url: ''
category: transformer
motivation: 线性注意力解决长视频瓶颈
```

#### 📝 一句话总结
Mamba-3 从推理优先的角度重设计 Mamba 系列状态空间层，用更强的离散化递推、复值状态更新和 MIMO 状态空间模块提升线性序列模型质量，为长文本或长视频 token 序列提供比全局注意力更低的长度扩展成本。

#### 🎯 核心要点
- 推理优先 SSM：目标是在固定状态大小下提高每步更新的表达力和硬件利用率
- Exponential-trapezoidal discretization：用更强离散化形式替代 Mamba-2 过度简化的递推
- Complex-valued SSM：用复值转移增强状态追踪能力，并通过 RoPE 形式高效实现
- MIMO formulation：从 SISO 标量状态更新扩展到多输入多输出，提高性能且尽量不增加 decode latency
- 架构现代化：引入 QK/BC Norm、SwiGLU 交替块、可选 MIMO projection，并移除短 causal conv
- 长序列意义：固定状态使推理内存不随上下文线性增长，适合作为长视频/VLM backbone 或混合层组件

#### 🔬 深入细节
> 注：给定 `paper_url` 是简写入口；本文依据 Princeton PLI 官方博客和可检索论文 `arXiv:2603.15569` 解读。

![Mamba-3 架构对比](https://arxiv.org/html/2603.15569v1/x2.png)
*图：Mamba-3 相比 Mamba-2 增加指数-梯形离散化、数据依赖 RoPE、MIMO projection、QK/BC Norm 和可学习偏置。*

##### 1. 动机与背景

Transformer 的自注意力在长序列上有两个典型成本：prefill 近似二次计算，decode 需要不断读取增长的 KV cache。长视频理解会把帧、patch、轨迹或视觉摘要转成很长 token 序列，因此这类成本会成为瓶颈。

Mamba 系列用状态空间模型把历史压缩到固定大小状态中，推理时每来一个 token 只更新状态，而不是保存所有历史 token。Mamba-2 为了训练效率将状态转移进一步简化，但也让单步推理过于轻量、表达力不足且偏 memory-bound。Mamba-3 的目标是让固定状态“做更多有用计算”。

##### 2. SSM 基础形式

离散状态空间层可写为：

$$
h_t = A_t h_{t-1} + B_t x_t,\quad
y_t = C_t^\top h_t
$$

其中 \(h_t\) 是固定大小状态，\(x_t\) 是当前 token 表示，\(y_t\) 是输出。与 attention 保存所有 \(K,V\) 不同，SSM 只保存 \(h_t\)，因此 decode 内存与序列长度解耦。

##### 3. Mamba-3 的三项方法升级

第一，Mamba-3 使用更具表达力的 exponential-trapezoidal 离散化。直觉上，它不再把连续动态粗糙地简化为过窄的递推形式，而是在数值离散化时保留更多动态结构，使状态更新既稳定又能表达复杂变化。

第二，Mamba-3 引入复值 SSM。复数转移可表示旋转和振荡模式，这对括号、奇偶、状态追踪、周期性事件等序列结构有帮助。实现上，论文用 RoPE 风格把复值旋转融入实值 kernel，避免重写昂贵复数计算。

第三，MIMO 将单输入单输出的独立标量 SSM 扩展到向量输入/输出。相比每个通道独立更新，MIMO 让一组通道共享更丰富的状态交互，提升质量；在 decode 阶段，由于 GPU 仍有空闲算力，增加部分 FLOPs 不一定线性增加墙钟延迟。

##### 4. 前向流程伪代码

```python
# Mamba-3 block 简化伪代码
def mamba3_block(x, state):
    residual = x
    x = rms_norm(x)

    # 生成 SSM 参数与门控分支
    a, b, c, gate = linear_projections(x)
    b, c = bc_norm(b), bc_norm(c)

    # 复值动态可用 RoPE/rotation 参数化
    theta = rope_projection(x)
    a_complex = compose_transition(a, theta)

    # exponential-trapezoidal discretized recurrence
    state = exp_trapezoid_update(state, a_complex, b, x)
    y = readout(state, c)

    # 可选 MIMO projection 增强通道交互
    y = mimo_projection(y)
    y = output_projection(y * silu(gate))
    return residual + y, state
```

在语言或视频模型中，Mamba-3 block 通常与 MLP/SwiGLU block 交替，并可与少量全局 attention 层混合。对于长视频，常见用法不是直接替代视觉 patch tokenizer，而是在已经压缩后的帧级、轨迹级或多模态 token 序列上建模长程依赖。

##### 5. 与 Transformer / Video Swin 的区别

Video Swin 用局部窗口注意力降低视频 token 的局部建模成本，但跨长时间上下文仍需要堆叠或额外机制。Transformer 全局注意力能精确检索历史 token，但上下文越长 KV cache 越大。Mamba-3 则把历史压缩进固定状态，牺牲一部分精确随机访问能力，换取线性长度扩展和低 decode 内存。

因此 Mamba-3 更适合被理解为长序列 backbone 或混合架构组件，而不是一个专门的视频识别算法。若用于长视频语言模型，它解决的主要是“大量视频 token 进入语言模型后的长上下文建模成本”，而不是前端视觉感知本身。

> ⚠️ 注意：Mamba-3 不是线性注意力的简单变体，而是状态空间递推模型；它与 attention 的核心差异在于是否保存所有历史 token。

#### 🧪 练习题
```yaml
question: "Mamba-3 相比 Transformer 在长序列推理中的核心优势是什么？"
options:
  - "保存完整 KV cache 以便精确访问所有历史 token"
  - "使用固定大小状态递推，推理内存不随序列长度按 KV cache 方式增长"
  - "只适用于短图像分类输入"
  - "完全不需要参数训练"
answer: 1
explain: "Mamba-3 属于状态空间模型，历史信息被压缩到固定状态中；这降低了长上下文 decode 时的内存压力。"
```

### Cosmos

```yaml
id: cosmos
num: 18
name: Cosmos
full_name: 世界模型策略 (Cosmos World Model Policy)
year: '2026'
org: NVIDIA
parent: internvideo
paper_url: https://research.nvidia.com/cosmos
project_url: ''
category: foundation_model
motivation: 视频预训练转化机器人策略
```

#### 📝 一句话总结
Cosmos 的核心目标是：视频预训练转化机器人策略。

#### 🎯 核心要点
- 核心动机：视频预训练转化机器人策略
- 演化来源：继承或改进自 internvideo
- 代表机构：NVIDIA

#### 🔬 深入细节
视频预训练转化机器人策略


### WorldReel

```yaml
id: worldreel
num: 19
name: WorldReel
full_name: 4D世界视频 (WorldReel 4D Generation)
year: '2026'
org: CVPR
parent: cosmos
paper_url: https://cvpr2026.thecvf.com
project_url: ''
category: foundation_model
motivation: 几何一致4D视频生成
```

#### 📝 一句话总结
WorldReel 提出了一种前馈式统一 4D 视频生成框架，在潜空间中将深度和光流与 RGB 联合编码（Geo-Motion Augmented Latent），并通过时序 DPT 解码器同时预测点云、相机轨迹、场景流和动态掩码，配合两阶段联合训练策略，在保持视觉质量的同时显著提升了动态场景的几何一致性和运动连贯性。

#### 🎯 核心要点
- **统一 4D 表示**：单次前向推理同时输出 RGB 视频、逐像素点云 \(P_i\)、相机内外参 \(C_i\)、3D 场景流 \(F_i^{3d}\) 和动态前景掩码 \(M_i\)，所有几何量统一在首帧规范坐标系下
- **Geo-Motion 增强潜空间**：将逐帧深度图和光流通过同一 3D VAE 编码为 geo-motion latent，与 RGB latent 在通道维度拼接后送入 DiT，通过零初始化策略保留预训练权重
- **时序 DPT 多任务解码器**：基于 DPT 架构引入时序 Transformer，从扩散潜空间提取多尺度特征，共享解码器 + 轻量任务头分别预测深度/点云/相机/流/掩码，实现参数高效的几何正则化
- **两阶段训练策略**：第一阶段分别训练 DiT（扩散损失）和 DPT heads（多任务损失）；第二阶段端到端联合训练，加入背景深度一致性正则 \(\mathcal{L}_{\text{reg}}^{\text{depth}}\) 和前景流平滑正则 \(\mathcal{L}_{\text{reg}}^{\text{flow}}\)
- **混合数据策略**：合成数据（PointOdyssey、BEDLAM、Dynamic Replica、Omniworld-Game）提供精确标注 + 真实视频（SpatialVid 筛选的 Panda-70M）通过 GeometryCrafter/ViPE/SEA-RAFT 生成高质量伪标签
- **场景流伪标签生成**：利用光流 + 点云对应关系计算稠密 3D 场景流，结合前景掩码、不确定性和前后向一致性检查过滤噪声
- **基座模型**：CogVideoX-5B-I2V，480×720 分辨率，49 帧，4D 表示在下采样的 13 帧上预测

#### 🔬 深入细节
![WorldReel 框架总览](https://arxiv.org/html/2512.07821v1/x2.png)
*图：WorldReel 整体架构。左侧为 Geo-Motion Augmented DiT，将 RGB 与深度/光流的联合潜空间输入扩散 Transformer；右侧为 Temporal DPT Decoder，从去噪后的潜空间解码出统一的 4D 场景表示（点云、相机、场景流、掩码）。*

```python
# WorldReel 推理伪代码
def worldreel_inference(image, text_prompt):
    # 1. 编码输入图像为 RGB latent
    z_rgb = vae_3d.encode(image)  # 3D VAE (CogVideoX)
    
    # 2. 初始化 geo-motion latent (深度+光流通道)
    z_gm = zeros_like(z_rgb, channels=C_gm)  # 零初始化
    z_input = concat([z_rgb, z_gm], dim=channel)  # 通道拼接
    
    # 3. 扩散去噪过程 (DiT with geo-motion augmented latent)
    for t in reversed(range(T)):
        z_input = dit_denoise_step(z_input, t, text_prompt)
    
    # 4. 分离 RGB 和 geo-motion latent
    z_rgb_clean, z_gm_clean = split(z_input, dim=channel)
    
    # 5. 解码 RGB 视频
    video = vae_3d.decode(z_rgb_clean)  # [49, H, W, 3]
    
    # 6. Temporal DPT 解码 4D 表示 (13 个下采样帧)
    features = temporal_dpt.extract_multiscale(z_gm_clean)
    unified_feat = temporal_dpt.fuse(features)
    
    depth = depth_head(unified_feat)       # [13, H, W, 1]
    pointmap = pointmap_head(unified_feat)  # [13, H, W, 3]
    camera = camera_head(unified_feat)      # [13, 9]
    scene_flow = flow_head(unified_feat)    # [13, H, W, 3]
    dyn_mask = mask_head(unified_feat)      # [13, H, W, 1]
    
    return video, depth, pointmap, camera, scene_flow, dyn_mask
```

##### 动机与背景

现有视频生成模型（如 CogVideoX、Sora 等）虽然能生成视觉逼真的视频，但缺乏对底层 3D 世界状态的显式建模。这导致两个核心问题：

1. **几何不一致**：生成的视频在不同帧之间缺乏一致的 3D 结构，物体形状和场景布局会随时间漂移
2. **运动不连贯**：相机运动和物体运动纠缠在一起，难以生成具有复杂动态的场景

已有的 4D 视频生成方法（如 GeoVideo、4DNeX）尝试引入几何约束，但存在关键缺陷：
- **GeoVideo** 仅建模静态几何（深度 + 相机），忽略了物体运动，导致模型倾向于生成近静态内容以维持几何一致性
- **4DNeX** 虽然输出点云，但其极低的动态度（dynamic degree 仅 0.03）表明模型坍缩为近静态生成
- **DimensionX** 将空间和时间维度分离建模，无法捕捉几何与运动的耦合关系

> 💡 关键洞察：**几何一致性和运动连贯性不应被分开处理**。只有同时显式建模静态结构和动态运动，才能避免"为保持几何一致性而牺牲动态性"的困境。

##### 核心机制一：Geo-Motion 增强潜空间

WorldReel 的第一个核心设计是将几何和运动信息直接注入扩散模型的潜空间。具体做法：

**编码**：对于每帧视频，除了 RGB 图像外，还有对应的深度图 \(D_i\) 和光流 \(F_i^{2d}\)。将深度图复制为 3 通道、光流补零为 3 通道后，使用与 RGB **相同的预训练 3D VAE** 分别编码：

$$\mathbf{z}^{\text{gm}} = \text{VAE}_{\text{enc}}(\text{concat}[D_{\text{rep}}, F^{2d}_{\text{pad}}])$$

**拼接**：将 geo-motion latent 与 RGB latent 在通道维度拼接，形成增强输入：

$$\mathbf{z}_{\text{input}} = [\mathbf{z}^{\text{rgb}}; \mathbf{z}^{\text{gm}}] \in \mathbb{R}^{T' \times H' \times W' \times 2C}$$

**零初始化**：DiT 输入层新增通道的权重初始化为零，确保训练初期模型行为与预训练一致，避免破坏已有的视频生成能力。

> ⚠️ 注意：复用同一 3D VAE 编码几何信息是一个巧妙的设计选择——虽然深度/光流与 RGB 的分布不同，但 3D VAE 的时空压缩能力可以被有效迁移，避免了训练额外编码器的开销。

##### 核心机制二：时序 DPT 多任务解码器

从去噪后的 geo-motion latent 中解码出完整的 4D 表示，WorldReel 设计了一个基于 DPT（Dense Prediction Transformer）的时序解码器：

1. **多尺度特征提取**：从 DiT 的不同层提取多尺度稠密特征
2. **时序 Transformer 融合**：在 DPT 融合骨干中引入时序 Transformer，建模帧间关系
3. **共享解码 + 任务头分离**：所有任务共享同一个 DPT 解码器，仅在最终输出层使用轻量级任务头分别预测：
   - 深度图 \(D_i \in \mathbb{R}^{H \times W}\)
   - 点云 \(P_i \in \mathbb{R}^{H \times W \times 3}\)（首帧规范坐标系）
   - 相机参数 \(C_i \in \mathbb{R}^{9}\)（内参 + 外参，采用 VGGT 参数化）
   - 3D 场景流 \(F_i^{3d} \in \mathbb{R}^{H \times W \times 3}\)
   - 动态掩码 \(M_i \in \mathbb{R}^{H \times W}\)

> 💡 关键：共享解码器不仅节省参数，更重要的是作为**强正则化**，迫使模型学习统一的几何一致表示。各任务之间的高度相关性（深度↔点云↔相机）通过共享特征自然传递。

##### 核心机制三：两阶段联合训练

**第一阶段（分离训练）**：
- DiT 微调 20K 步：标准扩散损失 \(\mathcal{L}_{\text{diff}} = \mathcal{L}_{\text{diff}}^{\text{rgb}} + \mathcal{L}_{\text{diff}}^{\text{gm}}\)
- DPT heads 从头训练 100K 步：以干净的 geo-motion latent 为输入，多任务损失：

$$\mathcal{L}_{\text{dpt}} = \mathcal{L}_{\text{depth}} + \mathcal{L}_{\text{pc}} + \mathcal{L}_{\text{cam}} + \mathcal{L}_{\text{mask}} + \lambda_{\text{flow}} \mathcal{L}_{\text{flow}}$$

其中深度和点云用 masked L1 loss，相机用 Huber loss，掩码用 BCE loss，场景流按前景掩码重加权。

**第二阶段（联合训练 10K 步）**：端到端优化，加入关键正则化项：

- **背景深度一致性**：利用相机变换将深度投影到其他帧，在静态背景区域强制一致：

$$\mathcal{L}_{\text{reg}}^{\text{depth}} = \sum_i \sum_j \left\| \hat{M}_i^{\text{bg}} \odot \left( D_j - \text{Proj}(D_i, T_{i \to j}) \right) \right\|_2$$

- **前景流平滑**：对动态前景区域的场景流施加空间平滑约束：

$$\mathcal{L}_{\text{reg}}^{\text{flow}} = \sum_i \left( \left\| \hat{M}_i^{\text{fg}} \odot \nabla_x F_i^{3d} \right\|_2 + \left\| \hat{M}_i^{\text{fg}} \odot \nabla_y F_i^{3d} \right\|_2 \right)$$

总损失：\(\mathcal{L} = \mathcal{L}_{\text{diff}} + \lambda_{\text{dpt}} \mathcal{L}_{\text{dpt}} + \lambda_{\text{reg}} \mathcal{L}_{\text{reg}}\)，其中 \(\lambda_{\text{dpt}}=0.1\)，\(\lambda_{\text{reg}}=0.5\)。

> 💡 关键设计：正则化项**按动态掩码分区处理**——背景强制多视图一致，前景强制运动平滑。这种解耦策略避免了对动态区域施加过强的几何约束，从而不会抑制复杂运动的生成。

##### 与现有方法的关键区别

| 特性 | CogVideoX | GeoVideo | 4DNeX | **WorldReel** |
|------|-----------|----------|-------|---------------|
| 几何建模 | ❌ | 深度+相机 | 点云 | **深度+点云+相机** |
| 运动建模 | 隐式 | ❌ | ❌ | **场景流+光流+掩码** |
| 动态场景 | ✅ | 偏静态 | 近静态 | **✅ 强动态** |
| 潜空间增强 | ❌ | 深度 | ❌ | **深度+光流** |
| 联合训练 | ❌ | 冻结DPT | ❌ | **端到端+正则化** |

##### 实验关键数据

**视频生成质量**（Table 1，Complex motion split）：

| 方法 | Dynamic Degree ↑ | FVD ↓ | FID ↓ | Subject Consistency ↑ |
|------|:-:|:-:|:-:|:-:|
| CogVideoX-I2V | 0.52 | 824.8 | 52.97 | 0.916 |
| 4DNeX | 0.19 | 632.8 | 49.79 | 0.983 |
| GeoVideo | 0.79 | 409.9 | 49.92 | 0.914 |
| **WorldReel** | **1.00** | **394.2** | **44.95** | **0.927** |

**4D 几何质量**（Table 2）：

| 方法 | Depth log-RMSE ↓ | δ₁.₂₅ ↑ | Camera ATE ↓ | RTE ↓ | RRE ↓ |
|------|:-:|:-:|:-:|:-:|:-:|
| GeoVideo | 0.353 | 63.4 | 0.011 | 0.012 | 0.443 |
| **WorldReel** | **0.287** | **71.1** | **0.005** | **0.007** | **0.317** |

**消融实验**（Table 3）关键发现：
- 移除 geo-motion latent（"w/o g.m."）：Complex motion FVD 从 394.2 恶化至 452.8，证明几何-运动潜空间对复杂动态建模至关重要
- 移除联合训练（"w/o joint"）：深度 log-RMSE 从 0.287 恶化至 0.399，证明端到端联合优化对几何精度的关键作用
- 冻结 DPT（"freeze dpt"）：FVD 略优（382.3 vs 394.2），但几何精度下降，表明 DPT 参与联合训练有助于几何-外观对齐

##### 局限性

- 依赖 4D 监督信号（相机、几何、场景流），当前通过合成数据和伪标签获取，存在域差距
- 有限的时序窗口（49 帧）在拓扑剧变、严重遮挡和快速运动场景下会出现失败
- 伪标签质量受限于标注模型（ViPE、GeometryCrafter 等）的精度上限

#### 🧪 练习题
```yaml
question: "WorldReel 中 Geo-Motion Augmented Latent 的核心设计意图是什么？"
options:
  - "用额外的 VAE 编码深度和光流，增加模型容量"
  - "将几何和运动信息注入扩散潜空间，使 DiT 在去噪过程中感知 3D 结构和动态"
  - "替代 RGB latent 以减少计算量"
  - "仅用于训练阶段的数据增强，推理时不使用"
answer: 1
explain: "Geo-Motion Augmented Latent 将深度和光流编码后与 RGB latent 通道拼接，使扩散 Transformer 在去噪过程中同时处理外观和几何-运动信息，从而将几何一致性的梯度反传到潜空间，实现外观与 3D 结构的联合优化。"
```

### Kangaroo

```yaml
id: kangaroo
num: 20
name: Kangaroo
full_name: 长视频语言模型 (Kangaroo VLM)
year: '2026'
org: IJCV
parent: internvideo
paper_url: https://link.springer.com/kangaroo
project_url: ''
category: foundation_model
motivation: 超长上下文视频语言对齐
```

#### 📝 一句话总结
Kangaroo 通过高质量视频-文本数据策划、时序位置编码、空间-时间 patchify 压缩和渐进式课程训练，构建了支持长上下文视频输入的 8B 级视频语言模型。

#### 🎯 核心要点
- 长视频 VLM 架构：视觉编码器 + spatial-temporal patchify + multimodal projector + LLM
- 时间戳位置编码：用真实浮点时间戳增强帧特征，而不是只用离散帧序号
- 数据策划系统：围绕图像/视频预训练和指令微调构建高质量多模态数据
- 课程训练：从图像对齐、短视频预训练逐步过渡到高分辨率和长视频微调
- 上下文扩展：通过 token 压缩、动态帧采样和序列打包支持更多帧输入
- 长视频基准收益：在 MLVU、LVBench、VideoMME、EgoSchema 等长视频理解任务上强调竞争力

#### 🔬 深入细节
> 注：给定 `paper_url` 是占位式短链；可检索正式版本为 IJCV 2026 DOI `10.1007/s11263-025-02620-2`，预印本为 `arXiv:2408.15542`。

![Kangaroo 架构图](https://arxiv.org/html/2408.15542v1/x2.png)
*图：Kangaroo 由 vision encoder、spatial-temporal patchify、multi-modal projector 和 LLM 组成。*

##### 1. 动机与背景

视频语言模型面临两个互相牵制的问题。第一，长视频需要更多帧才能覆盖关键事件，但帧数增加会让视觉 token 爆炸，迅速耗尽 LLM 上下文。第二，公开视频-文本数据噪声高，字幕常只描述局部片段或缺少细粒度事件，模型很难学到可靠的视频语言对齐。

Kangaroo 的策略是同时处理数据和架构：用数据策划系统提升监督质量，用课程训练逐步扩大分辨率、帧数和上下文长度，并用 patchify 压缩把高分辨率多帧视觉特征变成 LLM 可承受的 token 序列。

##### 2. 模型结构与时间编码

每帧先经过视觉编码器得到 patch 特征 \(Z_f^t\)。Kangaroo 给每帧加入基于真实时间戳 \(t\) 的 temporal position embedding：

$$
\hat{Z}_f^t = Z_f^t + \text{TPE}(t)
$$

其中 \(t\) 是浮点秒级时间，而不是第几帧的整数索引。这样模型能区分均匀采样、稀疏采样和不同视频时长下的同一帧序号。随后 spatial-temporal patchify 对视觉 token 进行压缩，projector 将其映射到 LLM embedding 空间，与文本 token 拼接后送入语言模型。

##### 3. 课程训练流程

![Kangaroo 课程训练](https://arxiv.org/html/2408.15542v1/x5.png)
*图：Kangaroo 通过逐步增加任务难度、分辨率和帧数来训练长视频能力。*

```python
# Kangaroo 课程训练伪代码
stage1_image_pretrain(
    data=image_text_pairs,
    trainable=["projector"],
    frozen=["vision_encoder", "llm"],
)

stage2_video_pretrain(
    data=short_video_text_pairs,
    frames=8,
    resolution=224,
    trainable=["vision_encoder", "projector"],
)

stage3_refine(
    data=curated_high_quality_data,
    frames=16,
    resolution=448,
    trainable=["vision_encoder", "patchify", "projector", "llm"],
)

stage4_instruction_tune(
    data=video_instruction_data,
    frames="up_to_64",
    context="10K",
)

stage5_long_video_tune(
    data=long_video_subset,
    frames="up_to_160",
    context="22K",
)
```

这种安排避免了一开始就把 LLM 暴露在超长、超噪声、多帧高分辨率输入下。先学图文对齐，再学短视频时序，最后扩展到长视频指令任务，训练稳定性更好。

##### 4. 长视频处理机制

Spatial-temporal patchify 是 Kangaroo 控制视觉 token 数的关键。分辨率从 224 到 448 会使每帧 patch 数显著增加，如果直接把所有 token 输入 LLM，长视频不可行。Patchify 模块在空间和时间维度上做结构化压缩，保留关键视觉语义，同时减少 token 数。

动态帧采样负责覆盖不同长度视频：短视频不必采太多冗余帧，长视频则增加采样以覆盖事件跨度。序列打包和注意力 mask 减少 padding 浪费，使不同长度样本可以更高效地训练。

##### 5. 与 InternVideo 等视频基础模型的关系

InternVideo 更偏视频表示/编码预训练，强调视觉 backbone 的通用视频表征；Kangaroo 则聚焦把长视频接入 LLM，解决视觉 token 压缩、长上下文对齐和指令问答。它的关键不只是视觉编码器强，而是数据质量、时间元信息和逐步扩展训练共同支撑长视频语言推理。

> 💡 关键：Kangaroo 的长视频能力主要来自“少丢信息地压缩视觉 token”与“课程式扩大上下文”的配合，而不是简单增加输入帧数。

#### 🧪 练习题
```yaml
question: "Kangaroo 使用真实浮点时间戳做 TPE 的主要意义是什么？"
options:
  - "让模型感知帧的真实时间间隔和采样密度"
  - "替代视觉编码器，使模型不再需要图像特征"
  - "只用于计算视频文件大小"
  - "强制所有视频采样相同帧数"
answer: 0
explain: "真实时间戳能保留视频时长和采样间隔等元信息，比单纯帧序号更适合长视频理解。"
```

### TrajTok

```yaml
id: trajtok
num: 21
name: TrajTok
full_name: 轨迹Token (Learning Trajectory Tokens)
year: '2026'
org: Tsinghua/CAS
parent: videomae
paper_url: https://arxiv.org/abs/2604.trajtok
project_url: ''
category: foundation_model
motivation: 端到端轨迹Token解耦时长
```

#### 📝 一句话总结
TrajTok 提出端到端可训练的视频轨迹 tokenizer，用统一 segmenter 隐式聚合跨时空像素并生成轨迹 token，使视频 token 数更多取决于语义复杂度而不是视频时长。

#### 🎯 核心要点
- 端到端轨迹 tokenizer：与下游视频模型联合训练，不依赖外部分割和跟踪流水线
- Universal segmenter：用 learnable queries 对像素/特征做隐式时空聚类，单次前向产生轨迹 mask
- Trajectory encoder：按轨迹 mask 聚合视觉特征，输出紧凑语义 token
- 可调 token 粒度：每条轨迹可输出不同数量子 token，适配算力预算
- 三种使用方式：TrajViT2 预训练、TrajAdapter 特征探针、TrajVLM 多模态连接器
- 长视频收益：轨迹表示减少冗余 patch token，尤其利于长视频推理和视频语言模型

#### 🔬 深入细节
> 注：给定 `paper_url` 为不可访问占位符；可检索论文为 `arXiv:2602.22779`，CVPR 2026 open access 版本题名为 *TrajTok: Learning Trajectory Tokens Enhances Video Understanding*。

![TrajTok 架构概览](https://arxiv.org/html/2602.22779v3/x2.png)
*图：TrajTok 由 trajectory segmenter 和 trajectory encoder 组成，先产生轨迹 mask，再聚合为轨迹 token。*

##### 1. 动机与背景

VideoMAE、TimeSformer、Video Swin 等方法通常把视频切成固定时空 patch。这样做简单稳定，但 token 数与帧数线性增长；长视频中大量背景、静止区域或重复帧会产生冗余 token，限制模型规模和上下文长度。

轨迹 token 的想法是：视频理解更关心“对象或部件随时间如何变化”，而不是每一帧每个网格都单独成 token。此前 TrajViT 等方法已证明轨迹式 tokenization 可以减少冗余，但依赖 SAM/跟踪器等外部流水线，慢、不可微、也无法根据下游目标调整 token 粒度。

##### 2. Universal Segmenter

TrajTok 的 segmenter 用一组 learnable queries 对视频像素或中间视觉特征做隐式聚类。它不追求像 SAM 那样像素级完美分割，而是追求对下游理解任务有用的语义分组。

可以将 segmenter 看成一个 mask proposal 网络：

$$
M = \text{Segmenter}(X; Q_s), \quad M \in \mathbb{R}^{K \times T \times H \times W}
$$

其中 \(K\) 是轨迹数，\(M_k\) 表示第 \(k\) 条轨迹在各帧上的软 mask。由于整个模块在模型内部，梯度可以从分类、检索或 VLM 目标回传到分组策略，使 tokenization 随任务自适应。

##### 3. Trajectory Encoder

Trajectory encoder 根据 mask 聚合原始视频特征或预训练视觉特征：

$$
u_k = \frac{\sum_{t,h,w} M_{k,t,h,w} \cdot f_{t,h,w}}
{\sum_{t,h,w} M_{k,t,h,w} + \epsilon}
$$

随后通过 perceiver/attention 模块细化轨迹 token。论文还允许每条轨迹展开为 \(n \in \{1,2,4\}\) 个子 token，训练时随机采样粒度，推理时可按算力预算选择。

```python
# TrajTok 前向伪代码
def trajtok(video_or_features):
    feats = patch_encoder(video_or_features)

    # 统一 segmenter 产生 K 条软轨迹
    masks = trajectory_segmenter(feats, learnable_queries)

    # 按轨迹聚合时空特征
    traj_tokens = []
    for k in range(K):
        token = masked_pool(feats, masks[k])
        traj_tokens.append(token)

    # 轨迹 token 细化和可选子 token 展开
    traj_tokens = trajectory_encoder(traj_tokens, masks)
    return traj_tokens
```

##### 4. 三种接入方式

![TrajTok 应用方式](https://arxiv.org/html/2602.22779v3/x4.png)
*图：TrajTok 可用于从头训练视频编码器、适配预训练特征，也可作为 VLM 的视觉连接器。*

TrajViT2 从头训练视频 CLIP 式模型，用 TrajTok 替代固定 patch token，直接学习适合检索和分类的轨迹表示。TrajAdapter 则把 TrajTok 插到冻结视觉 backbone 后面，作为下游分类/检索的轻量探针头。TrajVLM 把轨迹 token 作为 LLaVA 风格 VLM 的视觉输入，让长视频问答不必吞下海量 patch token。

这三种设置说明 TrajTok 不是单一模型，而是一个可插拔 tokenization 模块。它可以处在预训练阶段，也可以处在微调或多模态对齐阶段。

##### 5. 与 VideoMAE/patch token 的区别

VideoMAE 的 mask reconstruction 仍基于规则网格 patch，适合学习局部时空表征；TrajTok 则把 token 单位改成对象/部件轨迹，目标是减少冗余并突出长期语义一致性。前者的 token 数主要由 \(T \times H \times W\) 决定，后者更接近由场景中对象和运动复杂度决定。

> 💡 关键：TrajTok 的“解耦时长”不是说完全不受帧数影响，而是通过轨迹聚合让长视频中重复背景和持续对象不再按每帧网格重复计费。

#### 🧪 练习题
```yaml
question: "TrajTok 相比依赖外部 SAM+Tracker 的轨迹 tokenization 最大优势是什么？"
options:
  - "完全不使用视觉特征"
  - "端到端可训练，token 分组能根据下游任务目标自适应"
  - "把所有帧压缩成一个固定类别标签"
  - "只能用于 GPS 轨迹数据，不能用于视频"
answer: 1
explain: "TrajTok 将 segmenter 和 trajectory encoder 集成进模型内部，梯度可回传到 tokenization 过程，因此比外部不可微流水线更灵活。"
```
