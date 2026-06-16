### AS-DiffMPM — 高斯增强物理仿真 (Gaussian-Augmented Physics Simulation)

```yaml
id: as_diffmpm
name: AS-DiffMPM
full_name: 高斯增强物理仿真 (Gaussian-Augmented Physics Simulation)
year: '2026'
org: IIT
paper_url: https://proceedings.neurips.cc/paper_files/paper/2025/hash/91ed94fc04f9da4a2e3e5382c56c93aa
category: diff_sim
parent: jax_mpm
motivation: 可微分碰撞处理复杂系统辨识
```

#### 📝 一句话总结

AS-DiffMPM 提出 Any-Shape Differentiable MPM，把 CPIC 风格的粒子级碰撞处理扩展到任意形状刚体碰撞器，并与 2D Gaussian Splatting、DVGO、MDyn-3DGS 等渲染模型连接，使复杂碰撞场景中的物理参数可以从粒子轨迹或多视角视频端到端辨识。

#### 🎯 核心要点

- **任意形状碰撞器**：不再局限于地面平面或简单 SDF 边界，支持 Box、Bunny、Armadillo 等复杂刚体形状
- **Collision Grid**：在与 MPM 欧拉网格同分辨率的碰撞网格上存储 affinity \(A_g\)、距离 \(d_g\)、侧别 tag \(T_g\) 和法向 \(\mathbf{n}_g\)
- **粒子级 CPIC 碰撞**：P2G 只向兼容网格节点传输，G2P 对不兼容节点使用粒子当前速度或投影速度，避免同一网格单元内粒子共享单一碰撞速度
- **Mesh/2DGS 统一接口**：碰撞器被表示为带法向的 primitive，既可以是三角网格面，也可以是 2D Gaussian 的平面圆盘
- **穿透修正**：材料粒子从 Collision Grid 插值得到 \(d_p,T_p,\mathbf{n}_p\)，出现穿透时用 \(\mathbf{f}_p=-k_h d_p\mathbf{n}_p\) 施加 penalty force
- **系统辨识链路**：粒子轨迹监督使用 MSE；视觉监督通过 differentiable rendering 将图像误差反传到渲染 primitive、材料粒子轨迹和物理参数
- **基准设置**：论文在 Newtonian、Non-Newtonian、Granular 三类材料和三种复杂碰撞器上评估参数估计，并比较 RP-DiffMPM、GOP-DiffMPM 等碰撞处理基线

#### 🔬 深入细节

##### 核心架构示意

![AS-DiffMPM 仿真-渲染系统辨识流程](https://as-diffmpm.github.io/assets/figures/method_overview.png)
*图：多视角图像分别重建连续体对象和刚体碰撞器，AS-DiffMPM 推进粒子轨迹，再把更新后粒子位置映射回渲染 primitive。来源为 AS-DiffMPM 官方项目页。论文 arXiv HTML 也提供 Figure 2：`https://arxiv.org/html/2511.06846v1/x2.png`。*

##### 算法伪代码

```python
# AS-DiffMPM collision-aware differentiable rollout
def build_collision_grid(collider_primitives):
    for primitive xi in collider_primitives:          # mesh face or 2D Gaussian disk
        for x_rp in sample_rigid_particles(xi):
            for g in neighbor_grid_nodes(x_rp, size=3):
                x_proj = project_to_primitive_plane(x_g[g], xi)
                if projection_inside_primitive(x_proj, xi):
                    A_g[g] = 1
                    candidates[g].append((xi, point_plane_distance(x_g[g], xi)))

    for g in grid_nodes:
        xi_star = argmin_abs_distance(candidates[g])
        d_g[g] = abs(distance(x_g[g], xi_star))
        T_g[g] = sign(distance(x_g[g], xi_star))
        n_g[g] = normal(xi_star)
    return A_g, d_g, T_g, n_g

def transfer_collision_to_particles(particles, collision_grid):
    for p in particles:
        nbrs = neighbor_grid_nodes(x_p[p], size=3)
        A_p[p] = any(A_g[g] == 1 for g in nbrs)
        if A_p[p]:
            d_p[p] = sum(w(g, p) * A_g[g] * T_g[g] * d_g[g] for g in nbrs)
            n_p[p] = sum(w(g, p) * A_g[g] * n_g[g] for g in nbrs)
            T_p[p] = persistent_side_tag(p, sign(d_p[p]))
            if penetration_detected(d_p[p], T_p[p]):
                f_p[p] += -k_h * d_p[p] * n_p[p]

def as_diffmpm_step(particles, collider):
    collision_grid = build_collision_grid(collider)
    transfer_collision_to_particles(particles, collision_grid)

    # P2G: incompatible particle-node pairs do not receive particle velocity
    for p in particles:
        for g in neighbor_grid_nodes(x_p[p]):
            if compatible(T_p[p], T_g[g]):
                grid[g].mass += m_p[p] * w(g, p)
                grid[g].momentum += m_p[p] * v_p[p] * w(g, p)

    grid_operations_without_global_sticky_sdf()

    # G2P: incompatible nodes trigger particle-wise projected velocity
    for p in particles:
        v_new = 0
        for g in neighbor_grid_nodes(x_p[p]):
            if compatible(T_p[p], T_g[g]):
                v_new += w(g, p) * v_g[g]
            else:
                v_new += w(g, p) * project_to_surface(v_p[p], n_p[p])
        x_p[p], v_p[p] = advect(x_p[p], v_new)
```

##### 方法机制

标准可微 MPM 的三步是 P2G、Grid Operations、G2P。基础质量和速度传输可写为：

$$
m_g=\sum_p m_p w_g(\mathbf{x}_g-\mathbf{x}_p),\qquad
\mathbf{v}_g=\frac{1}{m_g}\sum_p m_p\mathbf{v}_p w_g(\mathbf{x}_g-\mathbf{x}_p).
$$

以往系统辨识工作通常在 G-OP 阶段处理简单边界：例如用平面或 SDF 判断网格节点是否在碰撞器内，然后把 sticky surface 内的节点速度置零。这种方法对平面地面有效，但复杂几何会出现两个问题：一是尖角、开曲面和薄结构很难通过单一网格节点速度精确表达；二是同一网格单元内的不同材料粒子可能在刚体两侧，却被迫共享同一个碰撞响应。

AS-DiffMPM 的核心是把刚体先投影到 Collision Grid，再把碰撞信息插值给材料粒子。每个网格节点存：

$$
(A_g,d_g,T_g,\mathbf{n}_g),
$$

其中 \(A_g\) 表示是否靠近碰撞边界，\(d_g\) 是到 primitive 的无符号距离，\(T_g\) 表示边界哪一侧，\(\mathbf{n}_g\) 是对应法向。对一个材料粒子 \(p\)，若其 \(3\times3\times3\) 邻域内存在 affinity 节点，就插值得到：

$$
d_p=\sum_{g\in\mathcal{N}(\mathbf{x}_p)}
w_g(\mathbf{x}_g-\mathbf{x}_p)A_gT_gd_g,
\qquad
\mathbf{n}_p=\sum_{g\in\mathcal{N}(\mathbf{x}_p)}
w_g(\mathbf{x}_g-\mathbf{x}_p)A_g\mathbf{n}_g.
$$

粒子的 tag \(T_p=\mathrm{sign}(d_p)\) 会在靠近边界期间保持首次获得的侧别。这个细节很关键：如果数值误差导致粒子穿透边界，单纯从当前插值距离重新取符号可能会把穿透后的错误侧别当成真实状态；保留 tag 可以识别并修正穿透。

碰撞修正用 penalty force：

$$
\mathbf{f}_p=-k_h d_p\mathbf{n}_p.
$$

在 CPIC 风格的 P2G/G2P 里，粒子与网格节点是否兼容由 \(T_p\) 和 \(T_g\) 决定。若二者位于边界两侧，则认为不兼容。P2G 阶段只向兼容节点传输质量和动量；G2P 阶段遇到不兼容节点时，AS-DiffMPM 不读取该节点的全局速度，而是把粒子速度投影到碰撞表面。例如 slippery surface 下：

$$
\mathbf{v}_p^{proj}=\mathbf{v}_p-(\mathbf{v}_p\cdot\mathbf{n}_p)\mathbf{n}_p.
$$

> 💡 关键：GOP-DiffMPM 是“网格节点级”碰撞，AS-DiffMPM 是“粒子-节点兼容性级”碰撞；后者能区分同一网格单元内不同粒子相对复杂边界的几何关系。

系统辨识分两种监督。若有真实粒子轨迹，训练损失就是模拟轨迹与参考轨迹之间的 particle-wise MSE：

$$
\mathcal{L}_{traj}(\theta)=
\frac{1}{TP}\sum_{t=1}^{T}\sum_{p=1}^{P}
\left\|\mathbf{x}_{p,t}^{sim}(\theta)-\mathbf{x}_{p,t}^{ref}\right\|_2^2.
$$

若只有多视角视频，渲染模型负责把粒子或 Gaussian primitive 渲染成图像，图像损失反传到物理参数。论文给出的 point-based 梯度链可以写成：

$$
\frac{\partial \mathcal{L}}{\partial\theta}
=
\sum_r\sum_p
\underbrace{\left(\frac{\partial\mathcal{L}}{\partial I}
\frac{\partial I}{\partial\mathbf{x}_r}\right)}_{\text{Rendering}}
\underbrace{\frac{\partial\mathbf{x}_r}{\partial\mathbf{x}_p^r}}_{\text{Mapping}}
\underbrace{\frac{\partial\mathbf{x}_p^r}{\partial\theta}}_{\text{MPM}}.
$$

当每个粒子直接绑定一个 point primitive 时，可简化为：

$$
\frac{\partial \mathcal{L}}{\partial\theta}
=
\sum_p
\left(\frac{\partial\mathcal{L}}{\partial I}
\frac{\partial I}{\partial\mathbf{x}_p}\right)
\frac{\partial\mathbf{x}_p}{\partial\theta}.
$$

这条链路让 AS-DiffMPM 可以和 DVGO、2DGS、MDyn-3DGS 等不同表示组合：渲染侧负责把视觉误差转成几何/粒子梯度，MPM 侧负责把粒子轨迹梯度转成粘度、体积模量、屈服应力、塑性粘度或摩擦角等物理参数梯度。

#### 🧪 练习题

```yaml
question: "AS-DiffMPM 相比 GOP-DiffMPM 处理复杂碰撞器的关键改进是什么？"
options:
  - "在 P2G/G2P 中按粒子-网格节点兼容性进行碰撞处理，而不是只在 G-OP 阶段统一修改网格速度"
  - "完全删除 MPM 的 P2G 阶段，只用神经渲染预测粒子运动"
  - "把所有碰撞器都近似为无限平面，降低系统辨识难度"
  - "只优化初始速度，不反传物理参数"
answer: 0
explain: "AS-DiffMPM 借鉴 CPIC，利用 Collision Grid 的 tag 和法向区分粒子与邻近节点是否跨越边界，从而在复杂几何处实现粒子级碰撞响应。"
```
