### TrajCast — 无力分子动力学

```yaml
id: trajcast
name: TrajCast
full_name: 无力分子动力学 (TrajCast)
year: '2026.03'
org: University of Cambridge
paper_url: https://www.nature.com/articles/s42256-026-00000-0
category: generation
parent: edm
motivation: 等变MPNN自回归预测，无需计算原子力
```

#### 📝 一句话总结

TrajCast 提出一种 force-free 分子动力学生成框架，用自回归等变 MPNN 直接从当前原子位置和速度预测下一时刻位置与速度，绕过传统 MD 中“预测力再用小步长积分”的瓶颈。它在小分子、晶体和液态水等体系上用 10× 到 30× 更大的预测间隔生成轨迹，并保持结构、动力学和能量统计的一致性。

#### 🎯 核心要点

- 状态定义为 \(\mathbf{x}(t)=\{Z_i,\mathbf{r}_i(t),\mathbf{v}_i(t)\}_{i=1}^N\)，模型直接输出 \(\Delta\mathbf{r}_i\) 与 \(\mathbf{v}_i'\)
- 不预测势能或原子力，也不依赖 Velocity-Verlet 等小步长数值积分；预测间隔 \(\Delta t\) 可远大于传统 MD 步长 \(\delta t\)
- 主干为 e3nn 风格等变 MPNN，使用标量、向量和高阶张量特征，包含 4 个 message passing 层
- 节点/边嵌入包括化学元素、相对位置、速度方向、速度大小的 Gaussian basis，以及径向基和球谐展开
- 输出后施加约束修正，保持总线性动量和总角动量；NVT 推理中接入类似 CSVR 的速度重标定 thermostat
- 自回归 rollout 将上一预测状态作为下一输入，保留轨迹的 Markov 结构，可计算时间相关性质
- 参考数据来自 LAMMPS 经典 MD，覆盖 paracetamol、quartz、liquid water，并测试大体系迁移和低温玻璃化等分布外场景
- Nature Machine Intelligence 版本报道 TrajCast 可使用 10× 到 30× 更大时间步，在 4,000+ 原子石英体系上每天生成超过 15 ns 轨迹
- worker 给出的 Nature URL 含占位符；可访问正式论文 URL 为 https://www.nature.com/articles/s42256-026-01227-7，预印本为 arXiv:2503.23794

#### 🔬 深入细节

![TrajCast 架构示意图](https://arxiv.org/html/2503.23794v1/extracted/6321508/figures/fig1.png)
*图：TrajCast 的自回归工作流、节点/边嵌入、消息构造、更新模块和动量约束。模型直接预测下一时刻的位移与速度，并把输出继续滚动成完整轨迹。*

##### 算法伪代码

```python
# TrajCast: force-free autoregressive molecular dynamics
def train_trajcast(reference_trajectories, horizon):
    for traj in reference_trajectories:
        for state_t, state_next in pairs_with_gap(traj, horizon):
            Z, r_t, v_t = state_t.Z, state_t.positions, state_t.velocities
            target_dr = state_next.positions - r_t
            target_v = state_next.velocities

            h = embed_nodes_and_edges(Z, r_t, v_t)
            h = equivariant_message_passing(h, r_t, v_t, layers=4)
            pred_dr, pred_v = readout_displacement_velocity(h)
            pred_dr, pred_v = conserve_linear_angular_momentum(
                pred_dr, pred_v, masses=state_t.masses
            )

            loss = mae(pred_dr, target_dr) + mae(pred_v, target_v)
            update(loss)

def rollout_trajcast(initial_state, n_steps, thermostat=None):
    state = initial_state
    trajectory = [state]
    for _ in range(n_steps):
        dr, v_next = trajcast_model(state)
        r_next = state.positions + dr
        if thermostat is not None:
            v_next = thermostat.rescale(v_next, target_temperature=thermostat.T)
        state = State(state.Z, r_next, v_next)
        trajectory.append(state)
    return trajectory
```

##### 关键公式

传统 MD 通常先由势能 \(U(\mathbf{r})\) 计算力，再用小步长积分：

$$
\mathbf{F}_i(t)=-\nabla_{\mathbf{r}_i}U(\mathbf{r}(t)),\quad
(\mathbf{r}_{t+\delta t},\mathbf{v}_{t+\delta t})
=\mathrm{Integrator}(\mathbf{r}_t,\mathbf{v}_t,\mathbf{F}_t,\delta t)
$$

TrajCast 直接学习大步长状态转移：

$$
(\Delta\hat{\mathbf{r}}_i,\hat{\mathbf{v}}_i')
=f_\theta\left(\{Z_j,\mathbf{r}_j(t),\mathbf{v}_j(t)\}_{j=1}^N\right),\quad
\hat{\mathbf{r}}_i(t+\Delta t)=\mathbf{r}_i(t)+\Delta\hat{\mathbf{r}}_i
$$

其中 \(\Delta t\gg\delta t\)，论文实验中可达到传统 MD 时间步的 \(10\times\) 到 \(30\times\)。训练目标可写成位移与速度误差：

$$
\mathcal{L}(\theta)=
\frac{1}{N}\sum_i
\left(
\left\|\Delta\hat{\mathbf{r}}_i-\Delta\mathbf{r}_i^\star\right\|_1
+\beta\left\|\hat{\mathbf{v}}_i'-\mathbf{v}_i^\star\right\|_1
\right)
$$

为了避免 rollout 中整体漂移，输出会被投影/修正到守恒约束附近：

$$
\sum_i m_i\hat{\mathbf{v}}_i'=\mathbf{P}_0,\quad
\sum_i m_i\hat{\mathbf{r}}_i'\times \hat{\mathbf{v}}_i'=\mathbf{L}_0
$$

在 NVT 采样中，速度可按 thermostat 缩放以匹配目标温度：

$$
K=\frac{1}{2}\sum_i m_i\|\mathbf{v}_i\|^2,\quad
T_{\mathrm{inst}}=\frac{2K}{k_B N_{\mathrm{dof}}}
$$

##### 方法机制解释

机器学习势函数 MLIP 的常见路线是学习 \(U_\theta(\mathbf{r})\) 或 \(\mathbf{F}_\theta(\mathbf{r})\)，然后仍然用传统积分器推进轨迹。这样能降低单步力计算成本，但时间步长仍受数值稳定性和高频振动限制，尤其含氢体系常需要 0.5 到 1 fs 级别步长。TrajCast 的关键变化是学习“状态到状态”的转移核，而不是学习力场。

输入速度是 TrajCast 与很多结构生成模型的关键差异。只看位置时，系统可能处在同一构型但沿不同方向运动；加入 \(\mathbf{v}(t)\) 后，模型能区分即将靠近、远离或振动反相的局部环境。论文的消息更新中还把聚合消息与速度方向的球谐嵌入做张量积，使速度不仅作为标量附加信息，而是以等变向量形式参与状态更新。

输出相对位移而非绝对坐标，使模型对模拟盒整体平移更稳健；输出速度则保留动力学信息，使 rollout 轨迹可以继续计算扩散系数、径向分布函数、振动态密度等时间相关或统计性质。与一次性生成多个构象不同，TrajCast 生成的是连续轨迹，因此误差累积和物理守恒是核心风险。

为控制误差累积，TrajCast 在读出后加入线性动量和角动量约束修正；在需要 NVT ensemble 时，还用类似 CSVR thermostat 的速度重标定维持目标温度。这些模块不等同于重新引入力计算，而是在模型预测的状态转移上做物理一致性投影和采样控制。

论文用 paracetamol、quartz 和 liquid water 展示从孤立小分子到凝聚相体系的泛化，并报告用少于 1 ns、实际为数百 ps 级轨迹即可训练出有效模型。正式 Nature Machine Intelligence 版本还展示零样本访问训练数据之外的相空间区域，例如低温水的非平衡/亚稳态行为。当前限制也很明确：由于不计算力，压力等依赖力的性质不能直接得到，NpT ensemble 还需要额外机制或与力场耦合。

> ⚠️ 来源限制：任务中的 Nature 链接 `s42256-026-00000-0` 是占位式 URL，无法作为正式论文页使用；本文依据可访问的 arXiv HTML 和 Nature Machine Intelligence 正式页 `s42256-026-01227-7` 撰写。YAML 元信息按任务要求保留不改。

#### 🧪 练习题

```yaml
question: "TrajCast 与典型机器学习势函数 MD 的主要区别是什么？"
options:
  - "TrajCast 仍先预测原子力，再用更小的积分步长推进"
  - "TrajCast 直接预测下一状态的位置增量和速度，不显式计算力"
  - "TrajCast 只生成静态分子构象，不生成时间轨迹"
  - "TrajCast 完全不使用速度信息"
answer: 1
explain: "TrajCast 学习从当前位置、速度和原子类型到下一状态的自回归映射，绕过力计算和小步长数值积分，因此可以使用更大的预测间隔生成轨迹。"
```
