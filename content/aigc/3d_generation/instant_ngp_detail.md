### Instant-NGP（即时神经图形基元, Instant Neural Graphics Primitives）论文精读
```yaml
id: instant_ngp
name: Instant-NGP
full_name: 即时神经图形基元 (Instant Neural Graphics Primitives)
year: 2022
organization: NVIDIA
paper_url: https://arxiv.org/abs/2201.05989
category: representation
parent: nerf
motivation: 哈希编码将训练加速1000倍
```

#### 📝 一句话总结
Instant-NGP 用多分辨率哈希网格把大量空间细节存到可学习特征表中，让小 MLP 只负责轻量解码，从而把 NeRF 类表示的训练和渲染速度提升到交互级。

#### 🎯 核心要点
- **瓶颈转移**：原始 NeRF 把几何和外观都压在大 MLP 里，查询慢；Instant-NGP 把表示容量放到哈希表特征中，MLP 变得很小。
- **多分辨率**：低层网格捕捉粗结构，高层网格捕捉局部细节；不同层特征拼接后输入 tiny MLP。
- **哈希冲突**：细网格坐标远多于表项，冲突不可避免；优化会利用多层上下文和梯度自动解冲突。
- **系统实现**：CUDA hash encoding、fully-fused MLP、occupancy grid 跳空共同构成速度优势。

#### 🔬 深入细节
**核心示意图/框架图**

![Instant-NGP neural graphics primitives comparison](https://ar5iv.labs.arxiv.org/html/2201.05989/assets/Figures/teaser/nerf_00.jpg)

论文的核心模块是 multiresolution hash encoding。给定归一化坐标 $\mathbf{x}$，第 $l$ 层把它缩放到分辨率 $N_l$ 的网格，取周围 $2^d$ 个顶点；每个整数顶点通过哈希函数映射到大小为 $T$ 的特征表，取出特征后做线性/三线性插值。所有层的插值特征拼接成 $\mathrm{enc}(\mathbf{x};\theta)$：

$$
N_l=\left\lfloor N_{\min} b^l \right\rfloor,\quad
\mathbf{y}=\mathrm{MLP}\left([\mathrm{interp}_1(\mathbf{x}),\dots,\mathrm{interp}_L(\mathbf{x})]\right).
$$

哈希表大小 $T$ 控制内存和冲突。粗层通常几乎无冲突，保证全局一致性；细层冲突多但只影响高频细节，且不同空间点在其他层的上下文不同，小 MLP 可以学习把冲突影响分开。

**算法伪代码**

```python
def hash_grid_encode(x):
    features = []
    for level in range(L):
        x_l = x * resolution(level)
        corners, weights = grid_corners_and_weights(x_l)
        f_l = 0
        for corner, w in zip(corners, weights):
            index = spatial_hash(corner) % table_size(level)
            f_l += w * hash_table[level][index]
        features.append(f_l)
    return concat(features)

for rays, rgb_gt in batches:
    z = sample_with_occupancy_grid(rays)
    enc = hash_grid_encode(points(rays, z))
    sigma, color = tiny_mlp(enc, viewdirs=rays.d)
    rgb = volume_render(sigma, color, z)
    update(mse(rgb, rgb_gt))
```

Instant-NGP 的贡献既是表示，也是系统设计。哈希网格提供高容量局部特征，tiny MLP 降低每次查询的计算量；occupancy grid 周期性记录哪些空间块可能非空，渲染时跳过空区域，减少无效采样。三者结合后，速度提升不是来自单一技巧，而是查询次数、每次查询成本和 GPU kernel overhead 同时下降。

与 Plenoxels 等纯显式体素方法相比，Instant-NGP 仍保留了神经解码器，因此能在固定内存下共享统计规律；与原始 NeRF 相比，它更依赖工程优化和 GPU 友好结构。后续大量 3D 生成系统把 hash grid 当成默认 NeRF backbone，正是因为它把“逐场景优化”从小时级推进到分钟甚至秒级。

#### 🧪 练习题
```yaml
questions:
  - type: concept
    prompt: "为什么 Instant-NGP 可以使用很小的 MLP？"
    answer: "多数空间细节已存入多分辨率哈希特征表，MLP 只需把局部特征解码成密度和颜色。"
  - type: tradeoff
    prompt: "哈希表大小 T 变小会带来什么影响？"
    answer: "内存降低但冲突增加，可能损失细节或产生伪影；粗层上下文可缓解但不能完全消除。"
  - type: system
    prompt: "occupancy grid 在 NeRF 渲染中解决什么问题？"
    answer: "跳过明显空的空间区域，减少射线上的无效 MLP 查询。"
```
