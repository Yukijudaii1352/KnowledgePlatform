### PIE-NeRF — 物理集成弹性动力学NeRF (Physics-Integrated Elastodynamics NeRF)

```yaml
id: pie_nerf
name: PIE-NeRF
full_name: 物理集成弹性动力学NeRF (Physics-Integrated Elastodynamics NeRF)
year: '2024'
org: PKU
paper_url: https://github.com/FYTalon/pienerf
category: diff_sim
parent: pac_nerf
motivation: 隐式NeRF无网格离散化形变模拟
```

#### 📝 一句话总结

PIE-NeRF 用自适应采样、Q-GMLS 无网格降阶弹性动力学和二次 warping，把静态 NeRF 变成可交互、可指定材料参数的物理形变对象，解决了隐式 NeRF 依赖网格/笼形变且难以实时模拟弹性动力学的问题。

#### 🎯 核心要点

- **NeRF 上的无网格弹性仿真**：不需要 tetrahedral mesh、显式表面网格或 voxel simulation grid，而是从 NeRF 密度场采样点云代理
- **密度梯度驱动采样**：augmented Poisson disk sampling 根据 NeRF 密度梯度在边界和薄结构处放置更多粒子
- **Voronoi + Q-GMLS 降阶**：把采样粒子分组为少量 Q-GMLS kernels，用二次位移场表达大形变和弯曲/扭转
- **Integrator points 能量积分**：不对所有采样粒子做完整积分，而用 IPs 近似动能、势能和超弹性材料能量
- **隐式时间积分与 Newton 求解**：从 Lagrangian 方程组装非线性弹性动力学系统，支持外力、位置约束和交互操控
- **二次反向 warping 渲染**：对变形后射线采样点求近似 rest-pose 坐标，再查询原始 NGP-NeRF 的密度和颜色
- **交互式速度**：几十到上百个 Q-GMLS kernels 通常足以驱动复杂 NeRF 场景，适合实时拖拽植物、椅子、船等对象

#### 🔬 深入细节

##### 核心架构示意

![PIE-NeRF pipeline](https://fytalon.github.io/pienerf/static/image/pipeline.png)
*图：PIE-NeRF 官方项目页 pipeline。输入多视角图像训练 NGP-NeRF，随后进行 Poisson disk sampling、Q-GMLS kernels 与 integrator points 离散化、时间积分、二次 warping，并渲染物理一致的新姿态。来源为 https://fytalon.github.io/pienerf/。*

##### 算法伪代码

```python
# PIE-NeRF 交互式弹性动力学伪代码
def build_pie_nerf(images, cameras):
    nerf = train_instant_ngp(images, cameras)

    # 1) 用密度与密度梯度自适应采样隐式几何
    particles = augmented_poisson_disk_sampling(
        density=lambda x: nerf.sigma(x),
        grad_density=lambda x: autodiff_grad_sigma(nerf, x),
        reject_if_sigma_below=tau,
    )

    # 2) 降阶离散化：Voronoi kernels + integrator points
    kernels = voronoi_partition(particles)
    ips = select_integrator_points(particles, kernels)
    precompute_q_gmls_shape_functions(kernels, ips)

    return nerf, kernels, ips

def simulate_and_render(nerf, kernels, ips, user_forces):
    q, qdot = initialize_generalized_coordinates(kernels)
    for frame in interactive_session:
        f_ext = project_external_forces(user_forces[frame], kernels)

        # 隐式 Euler：Newton 求解广义坐标 q_{n+1}
        for newton_iter in range(max_iter):
            T, U = integrate_energy_with_ips(q, qdot, ips)
            residual = mass_matrix(q) @ acceleration(q) + grad(U, q) - f_ext
            tangent = hessian(U, q) + inertia_term
            q += solve_linear_system(tangent, -residual)

        # 对每个变形后射线采样点，用二次 warping 回 rest pose 查询 NeRF
        image = volume_render_with_quadratic_warping(nerf, q, ips)
        display(image)
```

##### 方法机制与关键公式

PIE-NeRF 关注的问题不同于 PAC-NeRF 的系统辨识：它假设已经有一个静态 NeRF，希望用户能像抓取真实弹性体一样施加力、拖拽、压缩并得到物理可信的新姿态。难点是 NeRF 是隐式辐射场，没有天然的网格单元、顶点连接和有限元自由度；如果先转成 mesh，再做 FEM，会增加网格生成、薄结构处理和重拓扑成本。

论文从 NeRF 密度场 \(\sigma(x)\) 中构造无网格代理。自适应 Poisson disk sampling 的直觉是：几何边界和薄结构附近 \(\|\nabla\sigma(x)\|\) 大，采样半径应变小，以便放置更多粒子。可概括为：

$$
r(x)=\frac{r_0}{1+\alpha\|\nabla\sigma(x)\|+\epsilon},
$$

并丢弃 \(\sigma(x)<\tau\) 的低密度点。这样得到的 particles 只作为几何与积分代理，不要求形成三角网格或四面体网格。

为了交互速度，PIE-NeRF 不把每个采样粒子都作为动力学自由度，而是用 Voronoi partition 形成 \(n\) 个 Q-GMLS kernels。第 \(i\) 个 kernel 的广义坐标包括中心位移、局部仿射项和二次项；对 rest-pose 位置 \(X\)，位移可写成二次近似：

$$
u(X)\approx
\sum_{i=1}^{n} w_i(X)
\left[
u_i + A_i(X-X_i) + (X-X_i)^\top B_i (X-X_i)
\right],
$$

其中 \(w_i(X)\) 是 GMLS 权重，\(u_i,A_i,B_i\) 构成 reduced generalized coordinates。相较 affine MLS，二次项能更好表达弯曲、扭转和大形变，尤其对树叶、薄片、船帆等 codimensional 结构更不容易产生 locking artifacts。

动力学来自 Lagrangian mechanics。用广义坐标 \(q\) 表示 kernel 自由度，系统满足：

$$
\frac{d}{dt}\frac{\partial \mathcal{L}}{\partial \dot{q}}
-\frac{\partial \mathcal{L}}{\partial q}=Q_{\text{ext}},
\qquad
\mathcal{L}(q,\dot{q})=T(q,\dot{q})-U(q).
$$

实际计算中，动能和势能不在所有 PDS 粒子上积分，而在一组 integrator points 上近似：

$$
T \approx \sum_{a\in \mathcal{I}}\frac{1}{2}\rho V_a
\left\|\dot{u}(X_a)\right\|^2,
\qquad
U \approx \sum_{a\in \mathcal{I}} V_a\,\Psi(F_a),
$$

其中 \(\Psi(F)\) 可选 ARAP、Neo-Hookean 等超弹性材料能量，\(F_a=I+\nabla u(X_a)\) 是 IP 处的形变梯度。Neo-Hookean 形式可概括为：

$$
\Psi(F)=\frac{\mu}{2}\left(\mathrm{tr}(F^\top F)-3\right)
-\mu\log J+\frac{\lambda}{2}(\log J)^2,\qquad J=\det F.
$$

这个公式里的 \(\lambda,\mu\) 对应材料 Lamé 参数，可由杨氏模量 \(E\) 和泊松比 \(\nu\) 转换而来，因此用户可以指定不同软硬程度和体积保持性。

##### 渲染与传统方法差异

仿真求得的是变形后的空间位置，但 NGP-NeRF 是在 rest pose 上训练的。PIE-NeRF 采用 inverse warping：对变形后光线上的查询点 \(x'\)，估计其 rest-pose 坐标 \(X\)，再查询 \(\sigma(X)\) 与颜色 \(c(X,d)\)。若只用一阶 Taylor 展开，在大形变下颜色和纹理会滑动；PIE-NeRF 利用 Q-GMLS 的二次位移先验，在附近 IP 上做二次 warping：

$$
x' \approx X + u(X),\qquad
u(X)\approx u(X_a)+J_a(X-X_a)+\frac{1}{2}(X-X_a)^\top H_a(X-X_a).
$$

对 \(X\) 的求解可用 Newton 迭代，每次只需解小规模 \(3\times3\) 系统。若查询点离单个 IP 不够近，则用多个近邻 IP 的反解按距离加权平均。这样渲染仍然利用原始高质量 NeRF，但姿态由物理仿真决定。

与 cage-based 或编辑式 NeRF 形变相比，PIE-NeRF 的变形不是纯几何启发式能量，而是来自可指定材料模型的动力学系统；与 FEM 相比，它避免了 tetrahedralization，并且 reduced Q-GMLS kernels 远少于 FEM 顶点/单元数量。限制也很明确：它的目标是静态 NeRF 的交互式弹性运动合成，不是从视频反推未知材料参数；材料参数通常由用户设定或调节。

> 💡 关键：PIE-NeRF 的核心不是“把 NeRF 转 mesh 再仿真”，而是用 NeRF 密度场直接生成无网格代理，并用 Q-GMLS 在少量广义坐标中求解弹性动力学。

#### 🧪 练习题

```yaml
question: "PIE-NeRF 使用 Q-GMLS 而不是普通 affine MLS 的主要原因是什么？"
options:
  - "二次位移场能更好表达大形变、弯曲和薄结构运动，并改进变形后 NeRF 的反向 warping"
  - "Q-GMLS 可以完全跳过时间积分，因此不需要求解动力学方程"
  - "Q-GMLS 只用于压缩图片纹理，与弹性仿真无关"
  - "Q-GMLS 的目的只是把 NeRF 转换成四面体网格"
answer: 0
explain: "PIE-NeRF 用 Q-GMLS 在无网格粒子上构造降阶二次位移场，既减少自由度，又避免 affine 近似在薄结构和大形变下的 locking 与渲染 warping 误差。"
```
