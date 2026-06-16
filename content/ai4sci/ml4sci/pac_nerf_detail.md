### PAC-NeRF — 物理增强连续NeRF (Physics Augmented Continuum NeRF)

```yaml
id: pac_nerf
name: PAC-NeRF
full_name: 物理增强连续NeRF (Physics Augmented Continuum NeRF)
year: '2023'
org: CMU
paper_url: https://xuan-li.github.io/PAC-NeRF/
category: diff_sim
parent: difftaichi
motivation: 从视频推断流体物理参数
```

#### 📝 一句话总结

PAC-NeRF 将动态 NeRF、MPM 可微分连续介质仿真和多视角视频重建放进同一个优化图，解决了“未知几何 + 未知物理参数”场景下仅凭视频做系统辨识的问题。

#### 🎯 核心要点

- **几何无关系统辨识**：不要求预先给定网格、点云或物体拓扑，而是从多视角 RGB 视频同时恢复初始几何、运动状态和物理参数
- **连续介质约束 NeRF**：让密度场、颜色场随满足连续介质守恒律的速度场演化，避免普通动态 NeRF 学到不守物理的形变
- **Eulerian-Lagrangian 混合表示**：NeRF 密度/颜色保存在 Eulerian voxel grid，物质运动由 Lagrangian particles 通过 MPM 推进
- **P2G/G2P 互转层**：用三线性 shape function 在粒子和网格之间转换辐射场属性，使仿真输出能重新回到 NeRF 渲染空间
- **纯图像损失反传到物理参数**：通过可微渲染 + DiffTaichi MPM，把多帧重建误差反传到粘度、杨氏模量、屈服应力、摩擦角等参数
- **三阶段优化流程**：视频抠图预处理、首帧几何 seeding、冻结几何后用后续帧进行物理参数与初速度优化
- **材料覆盖面广**：论文在弹性体、塑性材料、沙粒、牛顿流体和非牛顿流体上验证，真实多相机视频中也能重建掉落小球

#### 🔬 深入细节

##### 核心架构示意

![PAC-NeRF 混合 Eulerian-Lagrangian 框架](https://ar5iv.labs.arxiv.org/html/2303.05512/assets/x1.png)
*图：PAC-NeRF 的 Figure 1。左侧从首帧 voxel NeRF 初始化，经过 G2P 得到 Lagrangian particles；MPM 根据物理参数推进粒子，再 P2G 回到 Eulerian radiance grid，用多视角渲染损失反向优化参数。来源为 ar5iv 对 arXiv:2303.05512 的 HTML 渲染图。*

##### 算法伪代码

```python
# PAC-NeRF 几何无关系统辨识伪代码
def pac_nerf_identification(multiview_video, cameras, theta_phys):
    masks = video_matting(multiview_video)

    # 1) 首帧几何 seeding：训练静态 voxel NeRF
    radiance_grid = initialize_voxel_nerf()
    for step in geometry_steps:
        rgb0 = render_voxel_nerf(radiance_grid, cameras, frame=0)
        loss_geo = photometric_loss(rgb0, multiview_video[0], masks[0])
        loss_geo += lambda_surf * surface_regularizer(radiance_grid.density)
        update(radiance_grid, loss_geo)

    # 2) 从 Eulerian 网格绑定到 Lagrangian 粒子
    particles = sample_particles_in_voxels(radiance_grid, particles_per_voxel=8)
    particles.features = G2P(radiance_grid.features, particles.x)

    # 3) 用可微 MPM 推进并从图像误差优化物理参数
    theta_vel = estimate_initial_velocity(particles, first_2_or_3_frames)
    for step in system_id_steps:
        sim_particles = particles
        total_loss = 0.0
        for t in range(1, T):
            sim_particles = differentiable_mpm_step(sim_particles, theta_phys, theta_vel)
            grid_t = P2G(sim_particles.features, sim_particles.x)
            pred_images = volume_render(grid_t, cameras)
            total_loss += photometric_loss(pred_images, multiview_video[t], masks[t])
        update([theta_phys, theta_vel], total_loss)

    return radiance_grid, theta_phys
```

##### 方法机制与关键公式

PAC-NeRF 的出发点是：传统从视频估计物理参数的方法通常假设物体几何已知，或者需要先重建成可仿真的网格；普通动态 NeRF 则可以拟合外观运动，但它的形变场不一定满足质量、动量和接触约束。PAC-NeRF 把两者合并：用 NeRF 处理视觉几何与渲染，用 MPM 处理连续介质动力学，再让图像误差穿过整个管线。

体渲染部分仍然使用 NeRF 的沿光线积分。对相机光线 \(r(s)=o+s d\)，像素颜色可写成：

$$
\hat{C}(r,t)=\int_{s_n}^{s_f} T(s,t)\,\sigma(r(s),t)\,c(r(s),d,t)\,ds,
\qquad
T(s,t)=\exp\left(-\int_{s_n}^{s}\sigma(r(u),t)\,du\right).
$$

多视角视频监督直接落在图像空间：

$$
\mathcal{L}_{\text{rgb}}=
\sum_{t=1}^{T}\sum_{v=1}^{V}\sum_{r\in\mathcal{R}_{v,t}}
\left\|\hat{C}_{v,t}(r;\theta,\phi)-C_{v,t}(r)\right\|_2^2,
$$

其中 \(\theta\) 表示辐射场参数，\(\phi\) 表示材料参数、初速度或接触相关参数。关键点是 \(\hat{C}\) 不是由任意时间 MLP 直接生成，而是由 MPM 推进后的物质状态重新映射到 Eulerian grid 后渲染。

物理约束来自连续介质守恒律。任意随物质运动的场 \(q(x,t)\) 需要满足材料导数关系：

$$
\frac{Dq}{Dt}=\frac{\partial q}{\partial t}+v\cdot\nabla q,
$$

速度场 \(v\) 又由动量守恒控制：

$$
\rho\frac{Dv}{Dt}=\nabla\cdot\sigma+\rho g.
$$

论文用可微 Material Point Method 解这个动力学系统。粒子适合承载质量、速度、材料形变和颜色/密度特征；网格适合求解力、碰撞和渲染重采样。因此 PAC-NeRF 使用 P2G/G2P 作为连接层。对粒子 \(p\) 和网格节点 \(i\)，三线性权重 \(w_{ip}=N_i(x_p)\) 给出：

$$
q_i=\frac{\sum_p w_{ip} m_p q_p}{\sum_p w_{ip}m_p},
\qquad
q_p=\sum_i w_{ip}q_i.
$$

这组互转有两个作用：第一，首帧 voxel NeRF 的密度/颜色能绑定到粒子上，形成随物质运动的 Lagrangian radiance field；第二，仿真后的粒子能投回 voxel grid，继续执行高效体渲染和碰撞处理。

##### 训练流程与设计取舍

实际优化被拆成三阶段。第一步先用视频 matting 去掉静态背景，只渲染前景物体，减少无关像素对梯度的干扰。第二步只用首帧训练静态 voxel NeRF，并加入 surface regularizer 让密度边界更紧致；这一阶段的目标是获得足够稳定的初始几何。第三步冻结初始辐射场，用前 2-3 帧估计初速度，然后把后续帧图像误差反传到物理参数。

这种两段式设计不是端到端美学上的妥协，而是为了可观测性和数值稳定性：如果几何、初速度和材料参数同时自由变化，优化器很容易用错误几何解释运动；先锁定首帧几何后，后续帧误差主要由动力学参数承担。代价是几何 seeding 的质量会影响系统辨识，后续工作也针对这一点提出过 Lagrangian particle optimization。

与 D-NeRF 一类方法相比，PAC-NeRF 不学习任意时间变形场，而是学习一个可被 MPM 推进的初始物质状态；与“NeRF + 已知网格仿真”相比，它不要求 watertight mesh 或 tetrahedral mesh。核心收益是物体拓扑和几何可以很复杂，但输出轨迹仍然被连续介质方程限制。

> 💡 关键：PAC-NeRF 的“物理增强”不只是给 NeRF 加一个正则项，而是把 NeRF 状态变成 MPM 粒子携带的物质属性，渲染误差必须穿过粒子-网格仿真链路才能更新参数。

#### 🧪 练习题

```yaml
question: "PAC-NeRF 为什么要在 Eulerian voxel grid 和 Lagrangian particles 之间来回转换？"
options:
  - "因为渲染和碰撞/网格计算更适合 Eulerian 表示，而物质输运和 MPM 动力学更适合 Lagrangian 粒子表示"
  - "因为 NeRF 只能在粒子坐标中执行体渲染，不能在规则网格上采样"
  - "因为 P2G/G2P 会自动消除所有图像噪声，所以不需要多视角损失"
  - "因为 MPM 不支持材料参数优化，只能优化颜色特征"
answer: 0
explain: "PAC-NeRF 用粒子承载随物质运动的状态，用网格执行渲染、碰撞和力更新；P2G/G2P 让图像损失可以穿过可微 MPM 反传到物理参数。"
```
