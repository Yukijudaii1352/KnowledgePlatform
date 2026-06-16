### Eyeriss

```yaml
id: eyeriss
name: Eyeriss
full_name: Eyeriss能效加速器 (Eyeriss Energy-Efficient Accelerator)
year: '2016'
org: MIT
paper_url: https://ieeexplore.ieee.org/abstract/document/7738524/
category: dataflow
parent: systolic_array
motivation: Row-Stationary数据流最大化局部数据复用
```

#### 📝 一句话总结

Eyeriss 提出了 Row-Stationary, RS 数据流和对应空间架构，把卷积拆成行级原语并在 PE 本地、PE 间和 global buffer 中同时复用 filter、ifmap 与 psum，解决 CNN 加速器中数据移动能耗远高于 MAC 计算的问题。它证明了能效优化应围绕完整存储层级和数据流映射，而不只是堆叠更多乘加单元。

#### 🎯 核心要点

- MIT Eyeriss 项目包含 ISSCC 2016 芯片论文、ISCA 2016 Row-Stationary 数据流论文和后续 JSSC 扩展论文
- 采用 168 个 PE 的 12×14 空间阵列、108 KB global buffer、16-bit 定点 datapath 和四级数据层级：DRAM、GLB、inter-PE、PE scratchpad
- Row-Stationary 数据流把高维卷积拆成 1D convolution primitives，每个 PE 保持一行 filter、一行 ifmap 和一行 psum 的局部复用
- PE set 内横向复用 filter row、对角复用 ifmap row、纵向累加 psum row，同时优化三类数据移动
- 映射参数随 CNN layer shape 变化，通过 strip mining、PE set segmentation 和 processing pass scheduling 适配 AlexNet 等不同层
- NoC 支持 multicast 和 point-to-point single-cycle delivery，分别服务 filter、ifmap、psum 的不同交付模式
- Run-Length Compression 和 PE data gating 利用 CNN 中零值激活，降低 DRAM 带宽和无效 MAC 切换功耗
- 官方项目页报告 Eyeriss 在 AlexNet 卷积层上达到 35 fps、278 mW，ISCA 论文报告 RS 在 AlexNet 卷积层比既有数据流能效高 1.4× 到 2.5×

#### 🔬 深入细节

##### 核心示意图

![Eyeriss 系统架构](https://eyeriss.mit.edu/images/architecture.png)
*图：Eyeriss 官方项目页提供的架构图。图中 108 KB Buffer SRAM、14×12 PE Array、Filter/Image/Psum 数据通路、RLC 压缩解压和 ReLU 构成 Eyeriss 的 CNN 加速系统。*

##### 算法伪代码

```python
# Row-Stationary 数据流对一个卷积层的简化调度
for pass_cfg in optimize_rs_mapping(layer_shape, pe_array, glb, spads):
    # GLB 保存会跨 pass 复用的 ifmap，以及尚未归约完成的 psum。
    glb.prefetch_ifmap_tiles(pass_cfg.ifmap_tiles)
    glb.prefetch_filter_tiles(pass_cfg.filter_tiles)

    for pe_set in map_pe_sets(pass_cfg, pe_array):
        for pe in pe_set.parallel_pes:
            filter_row = pe.filter_spad.load(pe.assigned_filter_row)
            ifmap_row = pe.ifmap_spad.load(pe.assigned_ifmap_row)
            psum_row = pe.psum_spad.read_or_zero(pe.assigned_output_row)

            # 1D convolution primitive: 一行 filter 滑过一行 ifmap。
            for out_x in pe.output_row_range:
                window = ifmap_row[out_x:out_x + layer_shape.S]
                psum_row[out_x] += dot(filter_row, window)

            # PE set 内的 psum 纵向累加，最终结果或中间 psum 写回 GLB。
            send_psum_to_neighbor_or_glb(pe, psum_row)

    if pass_cfg.produces_final_ofmap:
        ofmap = relu(glb.read_completed_psums())
        dram.write(run_length_encode(ofmap))
```

##### 方法机制解读

Eyeriss 的基本判断是：CNN 的主要成本不只是乘加次数，而是数据在 DRAM、global buffer、PE 阵列和本地寄存器之间移动的次数。高维卷积可写成：

$$
O[z][u][x][y] =
\operatorname{ReLU}\left(
B[u] + \sum_{k=0}^{C-1}\sum_{i=0}^{R-1}\sum_{j=0}^{S-1}
I[z][k][Ux+i][Uy+j]W[u][k][i][j]
\right)
$$

其中 \(I\) 是输入 feature map，\(W\) 是 filter，\(O\) 是输出 feature map，\(U\) 是 stride。这个公式里有三种复用：同一个 filter weight 在同一输入平面上滑动时被复用，同一个 ifmap pixel 被多个 filter 和多个窗口复用，同一个输出 psum 需要跨 \(C\times R\times S\) 次 MAC 累加。Weight-Stationary 主要优化 weight 复用，Output-Stationary 主要优化 psum 累加，No-Local-Reuse 依赖更大的 GLB；Eyeriss 的 RS 目标是同时降低三类数据的移动。

RS 的第一步是把二维/高维卷积拆成 1D convolution primitive。每个 primitive 只处理“一行 filter”和“一行 ifmap”，生成“一行 psum”。把一个 primitive 放到一个 PE 中，filter row 和 ifmap row 可以停留在 PE scratchpad 中，通过滑动窗口复用，psum row 也可在本地累加。这个局部驻留就是 row-stationary 名字的来源：驻留的是行级计算上下文，而不是单个权重或单个输出像素。

第二步是把多个 1D primitive 组织成 PE set 来完成 2D convolution。论文中的映射规则是：filter rows 在 PE set 中横向复用，ifmap rows 以对角线方式复用，psums 在垂直方向累加。对于一个 filter 高度为 \(R\)、输出行数为 \(E\) 的层，理想 PE set 尺寸与 \(R\) 和 \(E\) 有关；如果 PE set 比 168 个 PE 更大，就用 strip mining 每次只处理 \(e\le E\) 行输出；如果太宽，则拆成多个 segment 分别映射到 12×14 物理阵列上。

第三步是 processing pass scheduling。一次 pass 会处理若干 channel、filter 和 batch 组合。GLB 不只是中转站，而是用于跨 pass 保存 ifmap 和尚未最终归约的 psum。这样同一个 ifmap tile 可服务多个 filter group，psum 在没有完成所有 channel 累加前也不需要写回 DRAM。映射器选择 pass 参数时要考虑 GLB 容量、每个 PE 的 spad 容量、PE 数量和各层 shape，目标是最小化：

$$
E_{\text{data}}=
\sum_{\ell\in\{\text{DRAM, GLB, NoC, spad}\}}
N_\ell \cdot e_\ell
$$

其中 \(N_\ell\) 是某层级的数据访问次数，\(e_\ell\) 是每次访问能耗。因为 \(e_{\text{DRAM}}\) 远大于片上访问，RS 即使增加一些本地或 inter-PE 通信，只要显著减少 DRAM/GLB 访问，整体能效就会提升。

NoC 是 RS 能落地的关键硬件。Eyeriss 为 filter、ifmap、psum 配置不同数据传递模式，global input network 使用 row/column tag 做 multicast，未匹配的 bus 和 PE 被 gate 掉以省能。psum 还可通过本地网络直接传到垂直邻居，避免回到 GLB 再读出。JSSC 论文特别指出，Eyeriss 的 168 个 PE 有独立本地控制，不要求所有 PE 像经典 systolic array 一样 lock-step；它继承了空间阵列和局部数据流思想，但通过可配置 NoC 和 layer-level 配置适配更多 CNN shape。

Eyeriss 还利用数据统计。ReLU 后的 feature map 包含大量零值，芯片使用 run-length compression 降低 DRAM 传输量；PE 内部使用 zero buffer 记录 ifmap spad 的零位置，如果当前 ifmap 为零，就关闭 filter spad 读取和 MAC datapath 切换。论文报告这种 data gating 相比无 gating 的 PE 设计可节省约 45% PE 功耗。这类优化说明 RS 不是孤立的数据流算法，而是与压缩、NoC、spad 组织和芯片级控制共同工作。

从谱系看，Eyeriss 是脉动阵列思想在 CNN 能效问题上的一次重要分化。经典 systolic array 强调固定节拍和规则传播，Eyeriss 保留了 PE 阵列和局部通信，但把优化目标改为“在四级存储层级中最小化总数据移动能耗”。这也是它对后续 DNN accelerator 的启发：数据流选择、layer mapping 和片上存储分配与 MAC 数量同等重要。

> 💡 关键：Row-Stationary 的创新不是让某一种数据永远停住，而是在 PE 内、PE 间和 GLB 之间同时安排 filter、ifmap、psum 的局部性，使每一层 CNN 都按其 shape 找到能耗较低的数据移动路径。

#### 🧪 练习题

```yaml
question: "Eyeriss 的 Row-Stationary 数据流为什么比只做 Weight-Stationary 或 Output-Stationary 更通用？"
options:
  - "它同时考虑 filter、ifmap 和 psum 的复用与存储层级能耗，并可随 CNN layer shape 重映射"
  - "它完全取消片上 buffer，只依赖外部 DRAM 带宽"
  - "它要求所有 PE 必须严格 lock-step，因此不需要 NoC 配置"
  - "它只优化全连接层，不处理卷积层"
answer: 0
explain: "RS 将卷积拆成行级原语，并用 PE set、processing pass 和 GLB 调度同时优化三类数据移动，所以能适配不同卷积层形状。"
```
