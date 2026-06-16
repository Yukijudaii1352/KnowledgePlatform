### Parameter Server (参数服务器)

```yaml
id: parameter_server
name: Parameter Server
full_name: 参数服务器 (Parameter Server)
year: '2014'
org: CMU/Google
paper_url: https://proceedings.neurips.cc/paper_files/paper/2014/hash/935ad074f32d1e8f085a143449894cdc-Abstract.html
category: dp
parent: —
motivation: Server-Worker架构支持异步/同步梯度聚合
```

#### 📝 一句话总结

Parameter Server 将全局模型参数拆成键值分片放在 Server 组上，Worker 只拉取本地数据需要的 working set 并推送梯度，解决大规模数据并行训练中参数同步、异步容忍和网络通信开销过高的问题。

#### 🎯 核心要点

- Server-Worker 架构：Server 保存全局共享参数，Worker 保存数据分片并通过 `push`/`pull` 读写参数。
- 参数按 key range 分片：每个 Server 只维护一部分参数，多个 Server 聚合带宽并避免单点瓶颈。
- 支持同步与异步：通过任务依赖图表达 Sequential、Eventual、Bounded Delay 等一致性模型。
- 支持用户自定义过滤器：Significantly modified、Random skip、KKT、Key caching、Compression 等过滤器减少无效通信。
- Delayed Block Proximal Gradient：只更新参数块，在有界延迟下求解非凸、非光滑复合目标并给出收敛条件。
- 面向稀疏超大规模数据：论文在 636TB 点击数据、170B 样本、65B 特征、1000 台机器上验证通信压缩与等待时间降低。

#### 🔬 深入细节

##### 远程示意图

![多服务器参数服务器架构](https://d2l.ai/_images/ps-multips.svg)
*图：D2L 参数服务器章节提供的多服务器架构图，展示单个 Parameter Server 的带宽瓶颈以及多 Server 按参数分片聚合带宽的方案；该章节明确引用 Li et al. 2014 的参数服务器系统。*

##### 算法伪代码

```python
# Parameter Server 上的一轮同步或有界异步梯度聚合
def worker_loop(worker_id, data_shard, server_group, tau):
    working_keys = infer_working_set(data_shard)
    w_local = server_group.pull(working_keys)

    for t in range(num_steps):
        wait_until_iterations_before(t - tau).finished()

        grad, coord_lr = compute_gradient_and_lr(data_shard, w_local)
        active_grad = kkt_filter(grad, w_local)

        server_group.push(keys=active_grad.keys(), values=(active_grad, coord_lr))
        w_delta = server_group.pull(keys=working_keys, filter="significantly_modified")
        w_local.update(w_delta)

def server_update(block_id, received_messages):
    grad = sum(msg.grad for msg in received_messages)
    coord_lr = aggregate_lr(msg.coord_lr for msg in received_messages)
    U = diag(coord_lr)
    w[block_id] = prox_update(w[block_id], grad, U)
```

##### 机制解读

Parameter Server 的核心抽象是把“分布式训练”改写成键值参数存储上的 `push` 和 `pull`。Worker 不需要知道全局参数如何分片，也不需要和其他 Worker 直接通信；它只负责用自己的数据分片计算梯度，并把梯度发给负责相应 key range 的 Server。Server 端执行可交换的聚合：

$$
\mathbf{g}^{(t)} = \sum_{r=1}^{m} \mathbf{g}_{r}^{(t)}, \qquad
\mathbf{w}^{(t+1)} = \mathbf{w}^{(t)} - \eta \left(\mathbf{g}^{(t)} + \partial h(\mathbf{w}^{(t)})\right)
$$

这里 \(m\) 是 Worker 数量，\(h\) 是正则项。实际系统并不总是全量同步所有参数，因为高维稀疏数据下，单个 Worker 只需要很小一部分 working set。论文报告在 100 个 Worker 时平均 Worker 只需要约 7.8% 的模型参数，Worker 数增加到 10000 时 working set 比例进一步降到 0.15%，这正是 `pull(keys)` 接口比全量广播更省通信的原因。

一致性模型由任务依赖图控制，而不是硬编码在训练循环里。Sequential 等价于 BSP：第 \(t+1\) 个任务必须等待第 \(t\) 个任务完成；Eventual 允许任务尽快执行，但参数可能很旧；Bounded Delay 设置最大陈旧度 \(\tau\)，新任务开始前必须保证 \(t-\tau\) 以前的任务完成：

$$
\text{start}(t) \Rightarrow \forall t' \le t-\tau,\ \text{finished}(t')
$$

这个设计把“系统吞吐”和“算法收敛”之间的取舍显式暴露出来。同步模型等待最慢 Worker，网络抖动和负载不均会形成 straggler；有界异步允许快 Worker 继续推进，只要延迟不超过 \(\tau\)，算法仍能用适当学习率保持收敛。

论文进一步提出 Delayed Block Proximal Gradient，把目标写成非凸、非光滑复合优化：

$$
\min_{\mathbf{w}} F(\mathbf{w}) = f(\mathbf{w}) + h(\mathbf{w})
$$

Server 对某个参数块执行广义近端更新：

$$
\operatorname{Prox}_{\gamma}^{U}(x)=
\arg\min_y h(y)+\frac{1}{2\gamma}\|x-y\|_{U}^{2},
\qquad
\mathbf{w}^{(t+1)}=
\operatorname{Prox}_{\gamma_t}^{U}\left(\mathbf{w}^{(t)}-\gamma_t\nabla f(\tilde{\mathbf{w}}^{(t)})\right)
$$

其中 \(\tilde{\mathbf{w}}^{(t)}\) 是有界陈旧的参数视图，\(U=\operatorname{diag}(\mathbf{u}^{(t)})\) 表示坐标级学习率。论文给出的收敛条件体现了延迟代价：若最小坐标学习率为 \(M_t\)，学习率满足

$$
\gamma_t \le \frac{M_t}{L_{\mathrm{var}}+\tau L_{\mathrm{cov}}+\epsilon}
$$

则在有界延迟和过滤误差逐步减小的条件下，算法期望收敛到 stationary point。直觉是：\(\tau\) 越大，陈旧梯度越不可靠，因此需要更保守的 \(\gamma_t\)；但系统层面节省的等待时间通常可以覆盖这部分算法代价。

用户自定义过滤器是 Parameter Server 相比朴素 Server-Worker 聚合的关键增强。以 \(\ell_1\) 正则逻辑回归为例，KKT filter 利用 soft-shrinkage 的最优性条件：若某坐标当前为零且梯度不足以越过正则阈值，则该坐标更新后仍为零，可以跳过通信：

$$
w_k=0 \land |\hat{g}_k| \le \lambda-\delta
\Rightarrow \text{skip coordinate } k
$$

这不是随机压缩，而是利用稀疏正则的活跃集结构；再叠加 key caching 和数值压缩后，论文在 636TB 点击数据实验中报告 Server 侧和 Worker 侧分别获得约 40x 和 12x 的通信压缩。相比 AllReduce 每步同步完整梯度，Parameter Server 更适合超高维稀疏模型，因为它把通信粒度从“整个张量”降到“会影响目标函数的 key-value 子集”。

#### 🧪 练习题

```yaml
question: "Parameter Server 的 Bounded Delay 一致性模型主要解决什么问题？"
options:
  - "让所有 Worker 永远使用完全相同的最新参数"
  - "限制参数陈旧度，在减少同步等待的同时保持可分析的收敛条件"
  - "把模型权重切分到多个 GPU 的 tensor 维度"
  - "只保留梯度绝对值最大的 Top-K 坐标"
answer: 1
explain: "Bounded Delay 允许 Worker 使用最多落后 tau 轮的参数，减少 straggler 等待；收敛条件中的学习率会随 tau 增大而更保守。"
```
