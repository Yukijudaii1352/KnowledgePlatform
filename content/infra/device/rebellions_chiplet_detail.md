### Rebellions Quad-Chiplet

```yaml
id: rebellions_chiplet
name: Rebellions Quad-Chiplet
full_name: Rebellions四芯粒AI SoC (Rebellions Quad-Chiplet AI SoC)
year: '2026'
org: Rebellions
paper_url: https://isscc.org/2026-highlights/
category: chiplet
parent: —
motivation: 四芯粒4nm NPU与HBM3E UCIe互连
```

#### 📝 一句话总结

Rebellions Quad-Chiplet 把四个 4nm NPU chiplet、四组 HBM3E 和 UCIe-Advanced die-to-die 互连封装成一个近似单芯片的软件视图，解决大模型推理中单裸片面积、HBM 容量和跨芯粒同步难以同时扩展的问题。

#### 🎯 核心要点

- 四个同构 NPU chiplet 组成单个 AI SoC，每个 chiplet 侧接 HBM3E，并通过 UCIe-Advanced 互连扩展成全芯片 mesh
- 官方白皮书规格给出 2,048 TFLOPS FP8、1,024 TFLOPS FP16、144 GB HBM3E、4.8 TB/s HBM 带宽和最高 600 W 功耗
- UCIe-Advanced 链路工作在 16 Gbps，官方资料披露每通道 1 TB/s 双向吞吐和约 11 ns 全路径芯粒间延迟
- On-chip mesh 跨 UCIe 延伸，使 DMA、neural core、shared memory、HBM 和同步单元以 load-store 语义访问本地或远端资源
- 统一混合精度计算核支持 FP8/FP16/FP32 的按操作数配置，减少为不同精度复制算术单元的面积浪费
- 预测式、软件可配置 DMA 为长上下文 decode 的 KV cache 访问提供 QoS、多路径路由和本地/远端 HBM 交织
- 层次化同步管理器用控制虚拟通道和硬件 peer-to-peer 通信协调跨芯粒执行，面向 prefill、decode、稀疏和 MoE 工作负载

#### 🔬 深入细节

##### 核心示意图

![REBEL-Quad 四芯粒 SoC 架构图](https://rebellions.ai/wp-content/uploads/2025/05/REBEL-Q_chiplet.png)
*图：Rebellions 官方 REBEL-Quad 白皮书中的四同构 chiplet 方框图。图中每个 chiplet 包含 neural core、shared memory、task DMA、sync manager、UCIe-A 和 HBM3E 接口；来源：https://rebellions.ai/peta-scale-soc-for-massive-ai-serving-rebel-quad/*

##### 算法伪代码

```python
# REBEL-Quad 推理时的跨芯粒数据调度抽象
def rebel_quad_infer(request_batch, model_shards, quad_chiplet):
    mesh = quad_chiplet.full_chip_mesh_over_ucie()

    for layer in model_shards.layers:
        # Prefill 更偏 compute-bound，decode 更偏 KV-cache bandwidth-bound。
        phase = classify_phase(request_batch)
        plan = compiler_plan(layer, phase, mesh)

        for chiplet in quad_chiplet.chiplets:
            dma_cmds = []
            for tile in plan.tiles_on(chiplet):
                src = choose_hbm(tile, prefer_local=True, allow_remote=True)
                path = mesh.route(src, tile.neural_core, qos=tile.priority)
                dma_cmds.append(make_dma(src, tile.spmem, path))

            chiplet.task_dma.issue(dma_cmds)
            chiplet.neural_cores.run_mixed_precision(
                op=layer.op,
                precision=plan.precision,   # FP8/FP16/FP32 per operand
                tiles=plan.tiles_on(chiplet),
            )

        if plan.has_cross_chiplet_dependency:
            quad_chiplet.sync_manager.barrier_or_p2p(plan.dependency_graph)

    return gather_logits_from_mesh(request_batch)
```

##### 方法机制解读

Rebellions 的设计动机不是简单把四颗小芯片放进同一个封装，而是让推理软件尽量看到一个“单体化”的大 NPU。LLM 推理的 prefill 阶段主要消耗矩阵乘算力，decode 阶段则被 KV cache 和权重读取限制；单裸片继续做大，会同时碰到 reticle 面积、良率、HBM 引脚和供电完整性问题。四芯粒方案把计算与 HBM 容量横向扩展，但如果 die-to-die 链路只像外部网络一样工作，远端 HBM、跨芯粒同步和专家路由会把收益吃掉。因此该 SoC 的关键在于 UCIe-Advanced 与 full-chip mesh 的组合：跨芯粒传输仍被纳入片上数据通路和同步语义，而不是退化成软件显式管理的多卡通信。

![统一混合精度计算核](https://rebellions.ai/wp-content/uploads/2025/08/mixed-precision-arithmetic-core-1024x951.png)
*图：统一 multi-/mixed-precision arithmetic core。官方说明其按操作数配置精度，减少 FP8/FP16/BF16 分离单元带来的面积和调度浪费；来源同上。*

统一混合精度计算核面向的是 LLM 推理中精度需求随算子变化的问题。Transformer 中大部分 GEMM 可使用 FP8/BF16/FP16 获得高吞吐，而归一化、累加、logits 或部分控制计算需要更高精度。如果每种精度都配置独立流水线，面积和寄存器/片上存储端口会被碎片化；如果统一走高精度流水线，decode 的吞吐和能效又会下降。REBEL-Quad 的思路是将乘法、对齐、加法、归一化和 tensor/vector/load-store 管线整合成可配置执行路径。对矩阵乘可以抽象为：

$$
Y = \operatorname{dequant}_{p_o}\left(
\sum_i \operatorname{quant}_{p_a}(X_i)
\operatorname{quant}_{p_w}(W_i)
\right)
$$

其中 \(p_a\)、\(p_w\)、\(p_o\) 可按输入、权重和输出选择不同精度。这样做的直觉是，把“精度选择”变成指令和数据流属性，而不是变成互相竞争的硬件单元，从而让 FP8 prefill 和较高精度的控制/归约共享同一套核心资源。

![Neural core 与 DMA 数据搬运图](https://rebellions.ai/wp-content/uploads/2025/08/neural-cores-and-DMA-engines-1024x468.png)
*图：Full-chip data transfer utilizing neural cores and DMA engines。图中展示 task-level DMA、mesh router、UCIe、HBM3E、shared memory 与 2.7 TB/s 级有效数据通路；来源同上。*

预测式 DMA 是 decode 性能的核心。decode 每生成一个 token 都要读取大量历史 KV cache，批量小、访问长尾明显，单纯提高峰值算力帮助有限。官方资料强调 DMA 可同时访问 local HBM、remote HBM 和 shared memory，并使用多路径路由和 QoS 降低延迟尖峰。一个粗略的 decode 层时延可以写成：

$$
T_{\text{decode}} \approx
\max\left(
\frac{F_{\text{GEMM}}}{P_{\text{NPU}}},
\frac{B_{\text{local HBM}}}{BW_{\text{HBM}}},
\frac{B_{\text{remote}}}{BW_{\text{UCIe}}}
\right) + T_{\text{sync}}
$$

四芯粒架构要赢，必须让第三项和同步项足够小。UCIe-Advanced 的每通道 1 TB/s 双向吞吐和约 11 ns 全路径延迟，就是为了让远端 HBM 和跨芯粒 shared memory 访问不把每 token 的关键路径拉长。多路径 mesh 还可以把带宽压力分散到不同链路，避免某个 HBM 或某条 die-to-die 边成为 decode 热点。

同步机制解决的是“看起来像单芯片”所需的控制面。跨芯粒执行并不只搬数据，还要处理 kernel 依赖、peer-to-peer 通知、MoE expert routing、prefill/decode 并发等细粒度事件。Rebellions 在每个 chiplet 放置 sync manager，并使用专用控制虚拟通道承载同步消息，使数据 DMA 与控制同步不互相阻塞。对四芯粒系统，可把执行图表示为有向无环图 \(G=(V,E)\)，其中节点是 tile/kernel，边是跨 core 或跨 chiplet 依赖。硬件同步的目标是让依赖满足时间：

$$
\forall (u,v)\in E,\quad start(v) \ge finish(u)+latency(u,v)
$$

同时尽量把 \(latency(u,v)\) 隐藏在其他 core 的计算或 DMA 中。和传统多卡推理相比，这种做法减少了 host/runtime 参与的 barrier 与显式通信调度，让编译器和片上控制器直接管理细粒度依赖。

与典型 GPU scale-up 的区别在于，Rebellions 选择了“封装内单 SoC 化”的路径。NVLink/NVSwitch 更像高性能设备间网络，软件仍然把多个 GPU 作为多个加速器管理；REBEL-Quad 则把四个同构 compute chiplet、HBM3E、UCIe 和 mesh 封装成一个面向大模型推理的单节点单元。收益是芯粒复用、良率和 HBM 容量扩展，代价是 die rotation、供电完整性、UCIe PHY、跨芯粒调试和软件栈必须共同设计。官方资料还提到 integrated silicon capacitor 和实时 debug 等可靠性机制，说明 4 TB/s 级封装内互连不只是逻辑架构问题，也强依赖封装、电源和信号完整性。

> 💡 关键：Rebellions Quad-Chiplet 的核心不是“芯粒数量为四”，而是把 UCIe、mesh、DMA、HBM3E、混合精度核心和同步管理放在同一数据流模型下，使 LLM 推理的 compute-bound prefill 与 bandwidth-bound decode 都能跨芯粒扩展。

#### 🧪 练习题

```yaml
question: "Rebellions Quad-Chiplet 为什么需要把 UCIe-Advanced 接入 full-chip mesh，而不是只把四个 NPU 当作普通多卡互连？"
options:
  - "为了让跨芯粒 HBM、DMA、同步和 peer-to-peer 通信尽量保留片上 load-store 语义，降低 LLM 推理的远端访问和控制开销"
  - "为了禁止每个 chiplet 使用本地 HBM3E"
  - "为了把所有 FP8 计算改成 CPU 执行"
  - "为了只提升训练数据加载速度，而不影响推理"
answer: 0
explain: "四芯粒扩展的瓶颈在远端 HBM、跨芯粒依赖和同步开销。UCIe-Advanced 叠加 full-chip mesh 可把这些通信纳入片上数据通路，使封装更接近一个单体 NPU。"
```
