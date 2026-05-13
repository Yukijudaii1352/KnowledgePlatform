### iDT — 改进密集轨迹 (Improved Dense Trajectories)

```yaml
id: idt
name: iDT
full_name: "改进密集轨迹 (Improved Dense Trajectories)"
year: 2013
org: INRIA
paper_url: "https://hal.inria.fr/hal-00803241"
category: traditional_feature
parent: "—"
motivation: "相机运动补偿的手工特征巅峰"
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