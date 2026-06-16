### Eyeriss v2

```yaml
id: eyeriss_v2
name: Eyeriss v2
full_name: Eyeriss v2灵活互联架构 (Eyeriss v2 Flexible Architecture)
year: '2019'
org: MIT
paper_url: —
category: dataflow
parent: eyeriss
motivation: 层级化网格互联支持更广泛的网络拓扑
```

#### 📝 一句话总结

Eyeriss v2 提出了层级化网格片上网络 HM-NoC 和压缩域稀疏 PE，解决紧凑 DNN、稀疏 DNN 中层形状变化大、数据复用不稳定、传统固定 NoC 利用率低的问题。它把 Eyeriss 的 row-stationary 思想扩展成可按层配置的通信结构，在 MobileNet 和 sparse MobileNet 这类移动端模型上显著提升吞吐和能效。

#### 🎯 核心要点

- 采用 16 个 PE cluster 与 16 个 GLB cluster，按 8×2 阵列组织；每个 PE cluster 内含 12 个 PE，形成局部 all-to-all、全局 mesh 的两级结构
- 引入 Hierarchical Mesh NoC，为 input activation、weight、partial sum 分别配置独立数据通路
- HM-NoC 支持 high bandwidth、high reuse、grouped multicast、interleaved multicast 等模式，按层的数据复用和带宽需求选择路由
- 稀疏权重和稀疏激活使用 CSC 类压缩格式，尽量在压缩域完成读取、匹配、乘加和部分和更新
- PE 支持 SIMD width 2，一次用同一 activation 更新两个 weight 对应的 partial sum，提升吞吐并减少 activation SPad 读访问
- 编译/映射阶段根据层形状、稀疏分布、片上存储和 NoC 模式决定 tile、cluster 分配与静态路由配置
- 论文还提出 Eyexam 分析方法，用逐步加约束的方式解释模型特征和硬件约束如何限制实际吞吐

#### 🔬 深入细节

##### 核心示意图

![Eyeriss v2 HM-NoC 模式](https://ar5iv.labs.arxiv.org/html/1807.07928/assets/x13.png)
*图 1：Eyeriss v2 论文 Figure 8 的 ar5iv 公开镜像。图中展示 HM-NoC 的两级结构，以及高带宽、高复用、分组多播、交错多播等路由模式。*

![Eyeriss v2 CSC 压缩格式](https://ar5iv.labs.arxiv.org/html/1807.07928/assets/x24.png)
*图 2：Eyeriss v2 论文 Figure 16 的 ar5iv 公开镜像。图中展示权重矩阵如何转成 data vector、count vector 和 address vector。*

##### 算法伪代码

```python
# Eyeriss v2 的按层映射与压缩域执行伪代码
def compile_layer_for_eyeriss_v2(layer, hw):
    reuse = analyze_reuse(layer)          # iact / weight / psum 的复用机会
    bandwidth = estimate_bandwidth(layer) # 每类数据每周期需要多少供给

    noc_mode = {}
    for dtype in ["iact", "weight", "psum"]:
        if bandwidth[dtype] > reuse[dtype]:
            noc_mode[dtype] = "high_bandwidth"
        elif reuse[dtype] == "global":
            noc_mode[dtype] = "high_reuse"
        elif reuse[dtype] == "cluster_group":
            noc_mode[dtype] = "grouped_multicast"
        else:
            noc_mode[dtype] = "interleaved_multicast"

    tiles = tile_convolution(layer, pe_clusters=hw.pe_clusters, glb=hw.glb)
    weight_csc = compress_weights_by_column(layer.weights)
    return StaticSchedule(tiles=tiles, weights=weight_csc, noc_mode=noc_mode)


def run_tile(schedule, activation_stream):
    for tile in schedule.tiles:
        configure_hm_noc(schedule.noc_mode)
        iact_csc = compress_activations(activation_stream[tile.input_window])

        # PE 直接消费非零 weight / activation pair，避免先展开成稠密张量。
        for cluster in tile.assigned_clusters:
            for pe in cluster.pes:
                w_col = schedule.weights.column(pe.weight_column)
                for w0, w1 in pairwise_nonzero_weights(w_col):  # SIMD width 2
                    a = iact_csc.lookup(w0.input_coordinate)
                    if a != 0:
                        pe.psum[w0.output_coordinate] += a * w0.value
                        pe.psum[w1.output_coordinate] += a * w1.value
        write_back_partial_sums(tile)
```

##### 方法机制解读

Eyeriss v2 的直接背景是模型从 AlexNet/VGG 这类大卷积网络转向 MobileNet、SqueezeNet、稀疏剪枝网络。传统 CNN 加速器通常假设卷积层有较大的通道数、滤波器数和空间尺寸，因此 weight、input activation、partial sum 都有稳定复用；但 depthwise convolution、pointwise convolution、小 batch 推理和稀疏权重会打破这些假设。若 NoC 只能高效支持某一种广播或多播模式，PE 很容易因为某类数据送不到、送太慢或复用不足而空转。

HM-NoC 的设计把“灵活性”集中在片上通信而不是每个 PE 的复杂控制中。局部 cluster 内只连接 12 个 PE，可以承受 all-to-all 的多路选择成本；cluster 之间用 mesh 扩展到 8×2，全局成本随 cluster 数近似线性增长。直觉上，如果直接对全部 \(P\) 个 PE 做全互联，连接和选择成本接近：

$$
C_{\text{flat}}\propto P^2
$$

而两级结构把成本拆成每个 cluster 内的 \(k^2\) 与 cluster 间 mesh 路由：

$$
C_{\text{hier}}\propto N_{\text{cluster}}\cdot k^2 + C_{\text{mesh}}
$$

其中 \(P=N_{\text{cluster}}\cdot k\)。这使 Eyeriss v2 能保留局部任意分发能力，又避免全局 all-to-all 在面积、线长、功耗上的快速膨胀。

不同层会触发不同的 HM-NoC 模式。普通 CONV 同时有 weight reuse 与 activation reuse，可以让一类数据 grouped multicast，另一类数据 interleaved multicast，使所有 PE 都收到足够数据；depthwise CONV 的每个 filter 只作用于一个输入通道，跨 channel 复用少，更需要 high bandwidth 或更细粒度 multicast；FC 或 1×1 CONV 则更接近矩阵乘，数据分布可以按输出通道和输入通道 tile。Eyeriss v2 的关键不是某个固定 dataflow，而是让静态 mapper 为每层选择“哪类数据 stationary、哪类数据 multicast、哪类数据 unicast”。

卷积本身仍可写为：

$$
O[m,e,f]=\sum_{c,r,s}W[m,c,r,s]\cdot I[c,e+r,f+s]
$$

稀疏网络中，大量 \(W\) 或 \(I\) 为 0。如果先解压成稠密矩阵再乘加，硬件仍会为零值搬运和调度付出代价。Eyeriss v2 使用 CSC 类格式，把非零值、前导零计数和列起点地址分开保存；执行时 PE 根据 count/address 恢复非零元素位置，只对可能贡献输出的 pair 做 MAC。有效乘加量可以近似理解为：

$$
N_{\text{MAC}}^{\text{eff}}=\sum_{(m,c,r,s):W\ne0}\mathbf{1}\left[I[c,e+r,f+s]\ne0\right]
$$

这同时减少计算开关活动和片上/片外数据移动。

稀疏处理还带来负载均衡问题：如果按稠密坐标平均分给 PE，有些 PE 对应的 tile 非零多，有些几乎全零，整体吞吐会被最慢 PE 决定。Eyeriss v2 因此在映射权重到 PE 时考虑非零数量，并让每个 PE 的 SPad 存放压缩后的非零权重而不是固定稠密窗口。SIMD width 2 进一步利用同一个 activation 同时更新两个 weight 对应的 partial sum；若遇到填充的全零 pair，硬件可 gating 第二条 MAC datapath 和 SPad 端口，降低无效翻转。

与原始 Eyeriss 相比，Eyeriss v2 的改进重点从“找到一个总能耗很低的 row-stationary dataflow”转向“在紧凑/稀疏模型上仍维持 PE 利用率”。论文报告 sparse MobileNet 在 65nm 实现、batch size 1 下达到 1470.6 inferences/s 和 2560.3 inferences/J，相比原始 Eyeriss 运行 MobileNet 有 12.6× 吞吐提升和 2.5× 能效提升。这个结果说明移动端加速器的瓶颈不只是 MAC 数，而是 layer shape、NoC 模式、稀疏编码和 mapper 共同决定的数据供应效率。

> 💡 关键：Eyeriss v2 把“数据流”从固定映射扩展为可配置通信问题；HM-NoC 负责适配复用模式，压缩域 PE 负责让稀疏性真正减少搬运和乘加。

#### 🧪 练习题

```yaml
question: "Eyeriss v2 引入 HM-NoC 的核心目的是什么？"
options:
  - "在不同层的数据复用和带宽需求变化时，为 iact、weight、psum 选择合适的广播、多播或单播路径"
  - "把所有 PE 做成完全独立的 CPU 核，运行通用操作系统线程"
  - "只优化 DRAM 容量，而不改变片上通信方式"
  - "强制所有卷积层都使用同一个固定 row-stationary 映射"
answer: 0
explain: "紧凑和稀疏 DNN 的层形状差异很大，固定 NoC 容易造成 PE 空转；HM-NoC 用两级结构和多种路由模式适配每层的数据流。"
```
