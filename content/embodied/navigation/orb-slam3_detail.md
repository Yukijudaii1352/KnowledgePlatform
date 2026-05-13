### ORB-SLAM3

```yaml
id: orb-slam3
name: ORB-SLAM3
full_name: "多地图视觉惯性SLAM (ORB-SLAM3: An Accurate Open-Source Library for Visual, Visual-Inertial and Multi-Map SLAM)"
year: 2021
org: U.Zaragoza
paper_url: "https://doi.org/10.1109/TRO.2021.3075644"
category: slam
parent: lsd-slam
motivation: "多传感器融合统一SLAM框架"
```

#### 📝 一句话总结

ORB-SLAM3 提出了首个支持单目/双目/RGB-D 相机与 IMU 融合的多地图视觉惯性 SLAM 系统，通过基于最大后验（MAP）估计的 IMU 初始化、改进召回率的位置识别算法和 Atlas 多地图架构，在所有传感器配置下实现了当时最高的定位精度与鲁棒性。

#### 🎯 核心要点

- **统一多传感器框架**：支持单目、双目、RGB-D 三种相机类型，以及纯视觉与视觉-惯性两种模式，共 6 种传感器配置
- **抽象相机模型**：将 SLAM 代码与相机模型解耦，支持针孔（pinhole）和鱼眼（fisheye）镜头，可通过提供投影/反投影/雅可比函数扩展新模型
- **基于 MAP 估计的 IMU 初始化**：摒弃传统代数求解方法，在纯视觉 SLAM 基础上通过惯性-only MAP 优化联合估计尺度、重力方向和 IMU 偏置，2 秒内达到 5% 尺度误差，15 秒收敛至 1%
- **改进召回率的位置识别**：将 DBoW2 的"时间一致性→几何一致性"流程改为"几何一致性→局部一致性（3 个共视关键帧验证）"，显著提升召回率
- **Atlas 多地图系统**：维护一组可能不连通的子地图，跟踪丢失时创建新地图，重访时无缝合并，实现增量式多会话 SLAM
- **四类数据关联**：短期（连续帧）、中期（局部共视区域）、长期（回环/重定位）、多地图（跨地图合并）
- **实验精度**：双目-惯性模式在 EuRoC 数据集上平均精度 3.5 cm，在 TUM-VI 数据集上达到 9 mm

#### 🔬 深入细节

![ORB-SLAM3 系统架构图](https://ar5iv.labs.arxiv.org/html/2007.11898v2/assets/x1.png)
*图：ORB-SLAM3 系统总览。系统由 Atlas 数据结构和三个并行线程（Tracking、Local Mapping、Loop & Map Merging）组成，支持纯视觉和视觉-惯性两种模式。*

```python
# ORB-SLAM3 核心流程伪代码
def orb_slam3_pipeline(sensor_stream, imu_stream=None):
    atlas = Atlas()                          # 多地图管理器
    active_map = atlas.create_new_map()      # 初始化活跃地图

    for frame in sensor_stream:
        # ===== Tracking Thread =====
        # 1. ORB 特征提取 + 短期数据关联
        features = extract_orb(frame)
        pose = track_local_map(features, active_map)

        if tracking_lost:
            if imu_available and short_term_lost:
                # IMU 预测位姿，投影地图点搜索匹配
                pose = imu_predict_and_recover(imu_stream, active_map)
            else:
                # 长期丢失：创建新地图
                active_map = atlas.create_new_map()
                if imu_available:
                    initialize_visual_inertial(active_map)
                continue

        if is_keyframe(frame):
            KF = create_keyframe(frame, pose)
            # ===== Local Mapping Thread =====
            local_bundle_adjustment(KF, active_map)  # 局部 BA
            if imu_available and not map_mature:
                imu_initialization_refinement(active_map)  # 尺度/重力优化

            # ===== Loop & Map Merging Thread =====
            Km = place_recognition(KF, atlas)  # DBoW2 + 几何验证
            if Km is not None:
                if Km.map == active_map:
                    loop_closing(KF, Km, active_map)      # 回环校正
                else:
                    map_merging(KF, Km, atlas)             # 多地图合并
```

**动机与背景：从视觉里程计到完整 SLAM**

传统视觉里程计（VO）系统仅利用最近几秒的观测进行位姿估计，一旦离开已观测区域便会产生不可逆的累积漂移。即使引入回环检测的 VO 系统，也仅通过位姿图优化进行粗粒度校正，无法充分利用中期数据关联（即对已建图但暂时离开视野的区域的重观测）。ORB-SLAM3 的核心动机是构建一个能够在算法所有阶段（跟踪、建图、回环、重定位）充分利用所有历史信息的完整 SLAM 系统。与前代 ORB-SLAM2 相比，ORB-SLAM3 新增了视觉-惯性紧耦合、多地图管理和改进的位置识别三大能力，使其能够在复杂真实环境中实现厘米级甚至毫米级定位精度。

**核心机制一：基于 MAP 估计的视觉-惯性 SLAM**

ORB-SLAM3 的视觉-惯性模块采用 IMU 预积分理论将高频 IMU 测量压缩为关键帧间的相对运动约束。给定关键帧 \(i\) 和 \(j\) 之间的 IMU 测量序列，预积分量定义为：

$$\Delta \mathbf{R}_{ij} = \prod_{k=i}^{j-1} \text{Exp}\big((\boldsymbol{\omega}_k - \mathbf{b}^g_i)\Delta t\big)$$

$$\Delta \mathbf{v}_{ij} = \sum_{k=i}^{j-1} \Delta \mathbf{R}_{ik} \cdot (\mathbf{a}_k - \mathbf{b}^a_i)\Delta t$$

$$\Delta \mathbf{p}_{ij} = \sum_{k=i}^{j-1} \left[\Delta \mathbf{v}_{ik}\Delta t + \frac{1}{2}\Delta \mathbf{R}_{ik}(\mathbf{a}_k - \mathbf{b}^a_i)\Delta t^2\right]$$

其中 \(\boldsymbol{\omega}_k\) 和 \(\mathbf{a}_k\) 分别为陀螺仪和加速度计测量值，\(\mathbf{b}^g\) 和 \(\mathbf{b}^a\) 为对应偏置。视觉-惯性 BA 的目标函数联合优化关键帧位姿、速度、IMU 偏置和地图点位置：

$$\min_{\mathcal{X}} \sum_{(i,j)\in\mathcal{K}} \|\mathbf{e}^{\text{IMU}}_{ij}\|^2_{\boldsymbol{\Sigma}^{\text{IMU}}_{ij}} + \sum_{(i,l)\in\mathcal{C}} \rho_H\left(\|\mathbf{e}^{\text{proj}}_{il}\|^2_{\boldsymbol{\Sigma}^{\text{proj}}_{il}}\right) + \|\mathbf{e}^{\text{prior}}\|^2_{\boldsymbol{\Sigma}^{\text{prior}}}$$

其中 \(\mathbf{e}^{\text{IMU}}_{ij}\) 为 IMU 预积分残差，\(\mathbf{e}^{\text{proj}}_{il}\) 为视觉重投影误差，\(\rho_H\) 为 Huber 鲁棒核函数，先验项编码被边缘化关键帧的信息。

> 💡 **关键**：与之前 ORB-SLAM-VI 需要 15 秒才能获得首次尺度估计不同，ORB-SLAM3 的 IMU 初始化完全基于 MAP 估计——先用纯视觉 SLAM 构建初始地图，然后通过惯性-only 优化联合求解尺度因子 \(s\)、重力方向 \(\mathbf{R}_{wg}\)、速度和偏置，仅需 2 秒即可达到 5% 尺度误差。之后在第 5 秒和第 15 秒分别执行视觉-惯性 BA 进一步精化，收敛至 1% 误差后地图标记为"成熟"（mature）。

**核心机制二：改进召回率的位置识别**

传统 DBoW2 位置识别要求候选关键帧在**连续 3 帧**中都被检测到（时间一致性），然后才进行几何验证。这种策略虽然保证了高精确率，但严重牺牲了召回率（仅 30-40%），导致回环检测延迟甚至遗漏。ORB-SLAM3 提出了一种新的验证流程：

1. **DBoW2 查询**：对每个新关键帧 \(K_a\)，查询 Atlas 数据库返回最相似的 3 个候选 \(K_m\)（排除共视关键帧）
2. **局部窗口构建**：以 \(K_m\) 及其共视关键帧和对应地图点构成局部窗口
3. **3D 对齐变换**：使用 RANSAC + Horn 算法从 3D-3D 匹配中计算对齐变换 \(\mathbf{T}_{am}\)（纯单目为 \(\text{Sim}(3)\)，其余为 \(\text{SE}(3)\)）
4. **引导匹配精化**：利用 \(\mathbf{T}_{am}\) 双向投影搜索更多匹配，非线性优化精化变换
5. **共视关键帧验证**：在活跃地图中搜索与 \(K_a\) 共视的 2 个关键帧，验证它们与局部窗口的匹配数是否超过阈值——**无需等待后续帧**，因为验证所需信息通常已在地图中
6. **重力方向验证**（视觉-惯性模式）：检查 pitch 和 roll 角是否在阈值内

> ⚠️ **注意**：关键创新在于将"时间一致性"替换为"局部一致性"——利用已有地图中的共视关键帧进行验证，而非等待未来帧。这使得位置识别可以在单帧触发后立即完成验证，显著提升了召回率和响应速度。

**核心机制三：Atlas 多地图系统与无缝地图合并**

Atlas 是 ORB-SLAM3 的核心数据结构，维护一组可能不连通的子地图。系统始终有一个"活跃地图"用于实时跟踪和建图。当跟踪丢失且短期 IMU 恢复失败时，系统创建新的活跃地图而非停止运行。当位置识别检测到当前关键帧与另一子地图中的关键帧匹配时，触发地图合并：

1. **焊接窗口（Welding Window）组装**：以匹配关键帧对 \((K_a, K_m)\) 的共视关键帧和地图点构成焊接窗口，将 \(M_a\) 中的元素通过 \(\mathbf{T}_{ma}\) 变换对齐到 \(M_m\) 坐标系
2. **地图融合**：在焊接窗口内搜索重复地图点并合并（保留 \(M_m\) 中的点，累积 \(M_a\) 点的所有观测），更新共视图和本质图
3. **焊接窗口 BA**：对焊接窗口内的关键帧和地图点执行局部 BA（视觉-惯性模式下包含 IMU 约束）
4. **位姿图优化传播**：通过本质图（Essential Graph）将校正传播到焊接窗口外的所有关键帧
5. **全局 BA**（可选）：在后台线程执行全局 Bundle Adjustment 进一步精化整个合并后的地图

这种设计使得 ORB-SLAM3 能够在长时间运行中自然处理跟踪丢失、场景切换和重访等情况，实现真正的增量式多会话 SLAM。

**与前代系统的关键区别**

相比 ORB-SLAM2，ORB-SLAM3 的主要改进包括：（1）新增视觉-惯性紧耦合模式，通过 MAP 估计实现快速准确的 IMU 初始化；（2）Atlas 多地图架构替代单一地图，消除了跟踪丢失导致系统失败的问题；（3）改进的位置识别算法将召回率从 30-40% 大幅提升；（4）抽象相机接口支持鱼眼等非针孔模型。实验表明，在 EuRoC 数据集上，ORB-SLAM3 双目-惯性模式平均 ATE 为 3.5 cm，在 TUM-VI 数据集的手持快速运动场景下达到 9 mm，比同期最优系统精确 2-10 倍。

#### 🧪 练习题

```yaml
question: "ORB-SLAM3 的位置识别相比传统 DBoW2 方法，最关键的改进是什么？"
options:
  - "使用了更大的视觉词汇表来提升匹配精度"
  - "将时间一致性验证替换为基于共视关键帧的局部一致性验证，提升召回率"
  - "引入深度学习特征替代 ORB 描述子进行图像检索"
  - "要求连续 5 帧而非 3 帧的时间一致性以提升精确率"
answer: 1
explain: "ORB-SLAM3 的关键创新在于用局部一致性（利用地图中已有的共视关键帧验证）替代时间一致性（等待连续 3 帧触发），从而在保持 100% 精确率的同时显著提升召回率，加速回环检测和地图合并。"
```