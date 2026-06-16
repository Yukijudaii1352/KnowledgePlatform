### Parameter Server

```yaml
id: ps
name: Parameter Server
full_name: 参数服务器 (Parameter Server)
year: '2014'
org: CMU/Baidu
paper_url: https://proceedings.neurips.cc/paper/2014/hash/d5cfead94f5350c12c322b5b664544c1-Abstract.html
category: training_platform
parent: —
motivation: 提出异步分布式参数更新框架，奠定分布式ML基础
```

#### 📝 一句话总结

Parameter Server 把全局模型参数抽象成分片的分布式 key-value 向量/矩阵，并让 worker 通过异步 `push`/`pull` 交换局部梯度，解决超大规模稀疏机器学习中参数太大、网络太贵、同步太慢的问题。论文进一步用可配置一致性和通信过滤器，把系统吞吐与优化收敛之间的折中显式暴露给算法设计者。

#### 🎯 核心要点

- 共享参数表示为有序 `(key, value)` 对，可被视为稀疏向量或矩阵，并按 key range 分片到多个 server
- worker 只保存训练数据分片和当前 mini-batch 需要的 working set，通过 range `pull` 获取参数、通过 `push` 上传梯度或统计量
- task dependency graph 支持 sequential、eventual、bounded delay 等一致性模型，允许用最大延迟 \(\tau\) 控制 stale update
- user-defined filters 在通信前过滤或压缩数据，包括 significantly modified、random skip、KKT、key caching 和 compression
- Delayed Block Proximal Gradient Method 按参数块异步更新非凸非光滑目标，并给出有界延迟下的收敛条件
- 论文在 \(636\text{TB}\) 点击预估数据、\(170\) billion 样本、\(65\) billion 特征和 \(1000\) 台机器上展示稀疏 LR 的可扩展性

#### 🔬 深入细节

![Parameter Server 多服务器分片示意](https://d2l.ai/_images/ps-multips.svg)
*图：多 Parameter Server 按参数分片提供聚合带宽；来源为 Dive into Deep Learning 的 Parameter Servers 章节，用于补充说明论文中的 worker/server 分片抽象。*

```python
# Delayed Block Proximal Gradient on a Parameter Server
for t in range(1, T + 1):
    block = scheduler.pick_parameter_block()
    scheduler.issue_task(block, dependency=f"all iterations <= {t - tau} done")

    # Worker r: data is local, parameters are remote and sharded.
    for worker in workers.parallel():
        worker.wait_until_finished(before=t - tau)
        keys = active_keys(worker.data, block)
        w_local = ps.pull(keys, filters=["significantly_modified"])
        grad, scale = worker.compute_gradient_and_coordinate_lr(w_local, block)
        ps.push(keys, grad, scale, filters=["KKT", "key_cache", "compress"])

    # Servers aggregate sparse updates and apply the block proximal step.
    for server in parameter_servers.parallel():
        g_t, u_t = server.aggregate(block)
        U = diag(u_t)
        w[block] = generalized_prox(w[block] - gamma_t * inv(U) @ g_t, U, gamma_t)
```

论文的基本优化问题写成

$$
\min_w F(w), \quad F(w)=f(w)+h(w), \quad w\in\mathbb{R}^p
$$

其中 \(f\) 是可微但不一定凸的损失，\(h\) 是可能非光滑、但按 block 可分的正则项。Parameter Server 的系统抽象不是“把 SGD 搬到多台机器上”这么简单，而是承认真实工业数据会同时遇到三个约束：数据可达 TB/PB，参数规模可达 \(10^9\) 到 \(10^{12}\)，而 datacenter 网络带宽远小于内存带宽。把参数放在 server group 中分片保存后，worker 不再复制完整模型，只根据本地样本涉及的 key 拉取 working set，这对广告、文本、推荐这类极稀疏特征尤其关键。

`push`/`pull` 接口的设计重点是“范围化”和“线性代数化”。普通 key-value store 如果逐 key 发送 float，会被 RPC 元数据和网络包开销淹没；论文把连续 key range 当作稀疏向量段传输，server 端直接做梯度求和、近端更新或用户定义函数。对一个 worker \(r\)，标准分布式次梯度循环可抽象为先拉取 \(w_r^{(t)}\)，计算本地梯度 \(g_r^{(t)}\)，再把 \(\sum_r g_r^{(t)}\) 交给 server 聚合更新：

$$
w^{(t+1)} = w^{(t)} - \eta_t\left(\sum_{r=1}^{m} g_r^{(t)} + \partial h(w^{(t)})\right)
$$

一致性是 Parameter Server 最有工程价值的旋钮。Sequential consistency 等价于 BSP，每个任务必须等前一个任务完成，语义最干净但慢 worker 会制造 barrier；eventual consistency 允许任务尽快并发，吞吐高但 stale gradient 可能拖慢收敛；bounded delay 用 \(\tau\) 限制最大落后步数，只有所有 \(t-\tau\) 之前的任务完成后才启动新任务。论文的核心判断是：机器学习优化通常能容忍有限误差，所以系统不必用数据库式强一致牺牲吞吐。

通信过滤器进一步把“哪些值值得同步”交给算法。KKT filter 针对 \(\ell_1\)-regularized logistic regression：若某坐标当前 \(w_k=0\)，且梯度近似满足 \(|\hat g_k|\le \lambda-\delta\)，软阈值近端算子仍会把它压回 0，于是该坐标梯度没有必要传输。Key caching filter 则利用 range 内 key 经常不变这一事实，双方缓存 key 列表后只传 value 和签名；compression filter 再对零值、小整数或低精度 float 做压缩。论文报告这些过滤器叠加后显著降低 server/worker 的网络流量，这也是它能在稀疏 LR 上逼近“通信几乎不是瓶颈”的原因。

Delayed Block Proximal Gradient Method 把上面的系统能力写成一个优化算法：scheduler 每轮选择参数块 \(b_t\)，worker 在有界 stale 模型上计算 block gradient 和坐标级学习率，server 聚合后解广义近端算子

$$
\operatorname{Prox}^{U}_{\gamma}(x)
= \arg\min_y \left\{h(y)+\frac{1}{2\gamma}\|y-x\|^2_U\right\}
$$

并在 block Lipschitz 条件下给出学习率限制

$$
\gamma_t \le \frac{M_t}{L_{\mathrm{var}}+\tau L_{\mathrm{cov}}+\epsilon}
$$

这里 \(\tau\) 越大，stale update 带来的 cross-block 误差越大，因此理论上需要更保守的学习率；但如果 block 划分能让特征相关性较低，\(L_{\mathrm{cov}}\) 会变小，系统就能用更大的并发换取吞吐。

与 MapReduce/Spark 式迭代批处理相比，Parameter Server 的模型状态是在线、可变、可分片的，不需要每一轮重新物化完整模型；与纯 Hogwild 式共享内存异步更新相比，它明确处理跨机器网络、分片、延迟、过滤、容错和弹性扩容。后续 TensorFlow、MXNet、Angel、PS-Lite 以及多种推荐系统训练平台，都继承了“worker 负责数据并行计算、server/kv-store 负责共享参数状态”的基本思路。

> 💡 关键：Parameter Server 的贡献不只是一个通信拓扑，而是把大规模 ML 的优化容忍度转化成系统接口：一致性可放松、通信可过滤、参数可分片、状态可恢复。

#### 🧪 练习题

```yaml
question: "Parameter Server 中 bounded delay 一致性模型的主要作用是什么？"
options:
  - "要求所有 worker 每一步严格同步，完全消除 stale gradient"
  - "允许任务并发执行，但限制参数版本最多落后 τ 步"
  - "把所有参数复制到每个 worker，减少 server 负载"
  - "只对 GPU kernel 做自动融合，不影响分布式语义"
answer: 1
explain: "bounded delay 用 τ 控制 stale update 的最大延迟，在吞吐和收敛稳定性之间折中；τ=0 接近同步，τ=∞ 接近 eventual consistency。"
```
