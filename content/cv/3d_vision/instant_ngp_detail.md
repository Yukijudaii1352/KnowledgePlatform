### Instant-NGP

```yaml
id: instant_ngp
name: Instant-NGP
full_name: 即时神经图形基元 (Instant-NGP)
year: '2022'
org: NVIDIA
paper_url: https://arxiv.org/abs/2201.05989
category: nerf
parent: nerf
motivation: 多分辨率哈希编码将训练时间从数天缩短至数秒
```

#### 📝 一句话总结

Instant-NGP 提出多分辨率哈希编码，用可训练哈希表特征替代传统 Fourier 位置编码，并结合小型全融合 CUDA MLP 与 occupancy grid 跳空采样，将 NeRF 等神经图形基元的训练从小时/天级压缩到秒级。

#### 🎯 核心要点

- 多分辨率哈希编码：在 \(L\) 个空间分辨率上查询可训练特征表，拼接后送入小 MLP
- 哈希表压缩存储：每层最多保存 \(T\) 个特征向量，利用哈希碰撞换取固定显存上限
- 线性插值保持连续性：对输入坐标周围体素顶点的哈希特征做多线性插值
- 碰撞由优化自动消解：不同空间点共享哈希槽时，重要区域会通过梯度主导该槽的特征
- 全融合 MLP：使用 tiny-cuda-nn 风格的 fully-fused CUDA kernel，降低内存访问和 kernel launch 开销
- occupancy grid 加速 NeRF：维护多尺度占用网格，跳过空空间和已不透明区域后的无效采样
- 通用神经图形基元：同一编码用于 gigapixel image、SDF、Neural Radiance Caching 和 NeRF

#### 🔬 深入细节

![Instant-NGP 多分辨率哈希编码](https://docs.nerf.studio/_images/hash_figure.png)
*图：多分辨率哈希编码流程。对输入坐标在多个分辨率网格中定位顶点，哈希查表、插值、拼接，再送入小 MLP 预测密度与颜色。*

```python
# Instant-NGP hash encoding 伪代码
def hash_encode(x, levels, table_size, feature_dim):
    encoded = []
    for l in range(levels):
        N_l = resolution_at_level(l)
        x_l = x * N_l
        corners = voxel_corners(floor(x_l))
        weights = x_l - floor(x_l)

        feats = []
        for corner in corners:
            idx = spatial_hash(corner) % table_size
            feats.append(theta[l][idx])  # trainable F-dim vector

        encoded.append(multilinear_interpolate(feats, weights))
    return concat(encoded)

def nerf_query(x, direction):
    y = concat(hash_encode(x, L, T, F), sh_encode(direction))
    sigma, rgb = tiny_fused_mlp(y)
    return sigma, rgb

def train_step(rays):
    # occupancy grid 跳过空空间
    samples = ray_march_with_occupancy_grid(rays)
    colors = volume_render([nerf_query(x, d) for x, d in samples])
    loss = mse(colors, target_pixels)
    loss.backward()  # 梯度回传到 MLP 和哈希表特征
```

**动机与背景**

原始 NeRF 的瓶颈有两个：一是 Fourier 位置编码后需要较大的 MLP 才能表示高频细节，二是每条射线会在大量空空间里采样并多次调用网络。Instant-NGP 的思路是把“记忆场景细节”的负担从 MLP 转移到可训练空间数据结构中，让 MLP 变小、查询变快、训练更并行。

多分辨率哈希编码把输入坐标 \(x\) 映射到多个网格层级。第 \(l\) 层分辨率通常按指数增长：

$$
N_l=\left\lfloor N_{\min}\,b^l\right\rfloor,\qquad
b=\exp\left(\frac{\log N_{\max}-\log N_{\min}}{L-1}\right)
$$

低分辨率层学习大尺度结构，高分辨率层学习细节。与 dense grid 不同，每层只分配固定大小的哈希表，因此内存是 \(O(LTF)\)，不会随最高分辨率三次方爆炸。

**哈希函数与碰撞**

论文使用空间哈希：

$$
h(\mathbf{x})=\left(\bigoplus_{i=1}^{d}x_i\pi_i\right)\bmod T
$$

其中 \(\oplus\) 是按位 XOR，\(\pi_i\) 是不同的大素数。一个体素顶点的整数坐标被映射到哈希表索引，再查出可训练特征向量。由于 \(T\) 有限，碰撞不可避免；Instant-NGP 不显式解决碰撞，而是让优化过程自动分配容量。多分辨率结构也会缓解碰撞：同一对点即使在某一层冲突，在其他层通常不会完全冲突。

> 💡 关键：哈希编码的表达力主要来自“可训练特征表 + 多分辨率插值”，小 MLP 更像局部特征解码器，而不是独自承担整场景记忆。

**NeRF 中的渲染加速**

在 NeRF 任务中，Instant-NGP 还维护 occupancy grid。训练过程中根据当前密度估计更新占用状态，ray marching 时跳过空体素；当射线累积不透明度已经足够高时，也可以停止后续采样。这直接减少 MLP 查询次数。哈希编码降低单次查询成本，occupancy grid 降低查询数量，两者相乘形成数量级加速。

**训练/推理流程**

每个采样点先被 hash encoding 编码为空间特征；观察方向通常用球谐编码；二者拼接后输入小型 MLP 输出 \(\sigma\) 和 RGB。体渲染仍使用 NeRF 的 alpha compositing：

$$
C(r)=\sum_i T_i(1-\exp(-\sigma_i\Delta_i))c_i
$$

训练目标仍是渲染颜色和真实像素之间的 MSE。也就是说，Instant-NGP 没有改变 NeRF 的成像模型，而是彻底优化了场景参数化和 GPU 执行路径。

**与 NeRF/Plenoxels 的区别**

NeRF 是纯隐式 MLP，紧凑但慢；Plenoxels 是显式稀疏体素，快但更依赖网格容量；Instant-NGP 位于二者之间。它用哈希网格显式存储可训练特征，用小 MLP 解码连续函数，因此兼顾高频表示能力、固定内存和快速优化。

#### 🧪 练习题

```yaml
question: "Instant-NGP 的多分辨率哈希编码为什么能显著减少训练时间？"
options:
  - "它删除了体渲染公式"
  - "它用可训练哈希特征表承担大部分空间记忆，使 MLP 更小且查询更快"
  - "它要求所有场景必须是单色"
  - "它只在 CPU 上执行插值"
answer: 1
explain: "哈希表特征提供高容量空间编码，小 MLP 只需解码特征；再结合 occupancy grid 和 CUDA 融合实现，训练和渲染都大幅加速。"
```
