### LSD-SLAM — 大规模直接法单目SLAM (Large-Scale Direct Monocular SLAM)

```yaml
id: lsd-slam
name: LSD-SLAM
full_name: "大规模直接法单目SLAM (Large-Scale Direct Monocular SLAM)"
year: "2014"
org: "TUM"
paper_url: "https://vision.in.tum.de/research/vslam/lsdslam"
category: "slam"
parent: "—"
motivation: "半稠密直接法视觉SLAM"
```

#### 📝 一句话总结

LSD-SLAM 提出了一个完全直接法的单目 SLAM 系统，用图像灰度直接配准、半稠密逆深度滤波和 Sim(3) 关键帧位姿图，解决了单目系统在大尺度场景中既要实时建图又要校正尺度漂移的问题。

#### 🎯 核心要点

- **直接法跟踪**：不提取 ORB/SIFT 等关键点，直接最小化高梯度像素的光度误差来估计相机位姿
- **半稠密地图**：仅在有足够图像梯度的信息区域估计逆深度与方差，兼顾稠密几何表达和实时性
- **概率深度滤波**：通过多帧小基线 stereo 搜索不断更新每个像素的逆深度均值与不确定性
- **关键帧地图**：每个关键帧保存图像、半稠密逆深度图和深度方差，形成可复用的局部参考
- **Sim(3) 约束**：关键帧之间直接估计包含尺度的相似变换，使单目尺度漂移可以被显式检测和校正
- **位姿图优化**：将相邻关键帧与回环候选之间的 Sim(3) 约束放入图优化，得到全局一致的大尺度地图
- **CPU 实时性**：以半稠密区域和直接光度残差替代全像素稠密建模，可在普通 CPU 上实时运行

#### 🔬 深入细节

![LSD-SLAM 直接法与关键点法对比](https://cvg.cit.tum.de/_media/research/lsdslam/directvskp.png?w=1000&tok=38dc9d)
*图：TUM 项目页给出的直接法与关键点法对比。LSD-SLAM 利用边缘等高梯度像素，而不是只依赖角点附近的小块特征。*

```python
# LSD-SLAM 核心流程伪代码
def lsd_slam(monocular_video):
    keyframes = []
    pose_graph = Sim3PoseGraph()

    for frame in monocular_video:
        ref = select_current_keyframe(keyframes)

        # 1. 直接法跟踪：只在半稠密像素上最小化光度误差
        T_cr = direct_image_alignment(
            image_ref=ref.image,
            inv_depth=ref.inv_depth,
            inv_depth_var=ref.inv_depth_var,
            image_cur=frame.image,
        )

        # 2. 深度滤波：用小基线 stereo 更新参考关键帧的逆深度分布
        update_inverse_depth_filter(ref, frame.image, T_cr)

        # 3. 关键帧创建：视角变化或重叠下降时冻结当前深度图
        if should_create_keyframe(frame, ref, T_cr):
            new_kf = make_keyframe(frame)
            initialize_depth_from_reference(new_kf, ref, T_cr)
            keyframes.append(new_kf)

            # 4. 对相邻/回环关键帧估计 Sim(3) 约束
            for old_kf in find_candidates(new_kf, keyframes):
                S = direct_sim3_alignment(new_kf, old_kf)
                if is_consistent(S):
                    pose_graph.add_edge(new_kf, old_kf, S)

            # 5. 位姿图优化校正尺度漂移
            pose_graph.optimize()

    return pose_graph, keyframes
```

##### 动机与背景

在 LSD-SLAM 之前，单目 SLAM 主流路线多依赖特征点匹配，例如 PTAM 或 ORB 系列方法。这类方法在纹理丰富、角点明显的场景中很强，但会丢掉大量边缘和弱角点区域的信息；同时单目系统没有绝对尺度，长距离运行时会逐渐产生尺度漂移。另一方面，DTAM 这类直接稠密方法能利用更多像素，但计算量高，不适合大规模实时场景。

LSD-SLAM 的关键取舍是“半稠密”：只在图像梯度足够大的像素上做直接跟踪和深度估计。这些像素提供稳定的光度约束，又远少于全图像素，因此可以在 CPU 上实时运行。系统不需要把每个像素都重建出来，而是把有几何信息的边缘、轮廓和纹理结构重建成半稠密点云。

##### 直接法跟踪

给定参考关键帧 \(K\) 中一个半稠密像素 \(p\)、其逆深度 \(d_p\) 和当前帧位姿 \(T\)，系统先把该像素反投影到 3D，再投影到当前图像，直接比较灰度：

$$
E(T)=\sum_{p\in\Omega_D}\rho\left(
\frac{\left(I_t(\pi(T\cdot \pi^{-1}(p,d_p)))-I_K(p)\right)^2}{\sigma_p^2}
\right)
$$

其中 \(\Omega_D\) 是半稠密像素集合，\(\sigma_p^2\) 来自深度和图像噪声传播，\(\rho\) 是鲁棒核。直觉上，特征法先把图像压缩成离散描述子再匹配；LSD-SLAM 则把“当前帧应该长得像参考关键帧的重投影”作为优化目标，直接在像素强度上求位姿。

##### 半稠密逆深度滤波

每个关键帧维护两张图：逆深度均值 \(\mu_{\rho}\) 和逆深度方差 \(\sigma_{\rho}^2\)。当新帧到来时，系统沿极线搜索匹配像素，得到一个新的逆深度观测，然后用类似贝叶斯滤波的方式更新分布。方差小的像素代表几何已经稳定，方差大的像素继续等待更多视角；如果一个观测与现有分布严重冲突，则会被鲁棒地降权。

使用逆深度而不是深度本身，是因为单目小基线 stereo 对远处点的深度不确定性非常大，而逆深度在远处更加数值稳定。半稠密策略还会做边缘保持的空间正则化，让同一表面附近的逆深度估计更平滑，但避免跨过强边缘把不同物体混在一起。

##### Sim(3) 位姿图与尺度漂移校正

单目 SLAM 的特殊问题是尺度不可观。局部跟踪可以估计相对运动，但地图尺度会随时间漂移。LSD-SLAM 因此不只估计 SE(3) 刚体变换，还在关键帧之间估计 Sim(3)：

$$
S =
\begin{bmatrix}
sR & t \\
0 & 1
\end{bmatrix},
\quad s>0
$$

这里 \(s\) 是关键帧间的尺度因子。每当系统创建新关键帧，就把它与相邻关键帧、候选回环关键帧做直接 Sim(3) 对齐，生成图约束。图优化会在全局传播这些约束，使回环处发现的尺度误差反馈到整条轨迹。

> 💡 关键：LSD-SLAM 的“large-scale”并不是来自更稠密的地图，而是来自 Sim(3) 关键帧图。半稠密直接跟踪负责局部精度，Sim(3) 图优化负责长程一致性。

##### 与传统特征 SLAM 的区别

LSD-SLAM 不依赖可重复检测的角点，因此在只有边缘、纹理连续但角点较少的场景中能利用更多图像信息。代价是它对光照一致性、曝光变化和运动模糊更敏感，因为核心残差直接来自像素强度。与后来的 ORB-SLAM3 相比，LSD-SLAM 的地图表达更密、可视化更直观，但缺少成熟的多传感器融合、Atlas 多地图管理和特征级重定位机制。

#### 🧪 练习题

```yaml
question: "LSD-SLAM 为什么在关键帧图中使用 Sim(3) 约束而不只使用 SE(3) 约束？"
options:
  - "为了把相机内参也一起优化"
  - "为了显式估计并校正单目 SLAM 中累积的尺度漂移"
  - "为了减少每个关键帧保存的半稠密深度点数量"
  - "为了让系统可以直接处理 LiDAR 点云"
answer: 1
explain: "单目 SLAM 没有绝对尺度，长时间运行会出现尺度漂移。Sim(3) 在旋转和平移之外包含尺度因子，适合把回环检测到的尺度误差放入位姿图优化。"
```
