### FLARE

```yaml
id: flare_chiplet
name: FLARE
full_name: 细粒度CIM异构多芯粒加速器 (FLARE Multi-Chiplet LLM Accelerator)
year: '2026'
org: IEEE JETCAS
paper_url: https://ieeexplore.ieee.org/abstract/document/11456071/
category: chiplet
parent: —
motivation: 细粒度CIM异构多芯粒LLM加速器
```

#### 📝 一句话总结

FLARE 提出面向大语言模型的细粒度 in-memory computing 异构多芯粒加速器和硬件/软件协同栈，把 LLM 分区、core 级映射、chiplet 级协调和硬件配置搜索联合起来，缓解传统 H100 类 GPU 在低能效数据搬运和跨芯粒通信上的瓶颈。

#### 🎯 核心要点

- 目标工作负载是 multi-billion-parameter LLM，在推理中同时受低延迟通信、权重/激活数据搬运和能效约束
- 架构方向是 heterogeneous in-memory computing multi-chiplet accelerator，将计算靠近存储，降低冯诺依曼式权重搬运
- 软件栈包含 LLM partitioning、workload mapping 和 hardware configuration identification 三类定制算法
- 方法采用 bottom-up 视角，从 CIM core 级执行开始建模，再上升到 chiplet 级协调，而不是先假设固定 chiplet 拓扑
- 细粒度映射把 layer、micro-batch、算子类型和 core/chiplet 资源拆开处理，可表达更灵活的数据流和并行策略
- 论文通过 cycle-accurate evaluation 报告最高 4× token throughput 和 30× energy efficiency，相比对象是同类 workload 上的 H100 GPU
- 论文图和 PDF 在公开网页中不可直接访问；本文的示意图使用公开 PIM chiplet 架构图作为背景，并明确不是 FLARE 原图

#### 🔬 深入细节

##### 核心示意图

![Chiplet-based PIM architecture background](https://mdpi-res.com/micromachines/micromachines-13-01790/article_deploy/html/images/micromachines-13-01790-g003-550.jpg)
*图：公开综述论文《Using Chiplet Encapsulation Technology to Achieve Processing-in-Memory Functions》中的 chiplet-based PIM 架构图，展示 interposer、NoP、memory/compute chiplet 与 Simba-style chiplet。FLARE 的 IEEE 论文图没有公开可直达 URL，因此这里用可信公开图片说明 FLARE 所属的 PIM chiplet 架构背景；来源：https://www.mdpi.com/2072-666X/13/10/1790*

##### 算法伪代码

```python
# FLARE 风格的细粒度 LLM-to-CIM-chiplet 映射搜索抽象
def flare_mapping_search(llm_graph, hardware_space, workload_profile):
    best = None

    for hw in enumerate_hardware_configs(hardware_space):
        # bottom-up: 先评估 core/CIM array 能执行哪些 tile，再组合到 chiplet。
        core_cost = {}
        for op in llm_graph.ops:
            for tile in partition_op_to_tiles(op):
                for core in hw.cim_cores + hw.digital_cores:
                    core_cost[(tile, core)] = estimate_core_latency_energy(tile, core)

        candidates = initialize_mappings(llm_graph, hw, core_cost)
        for mapping in improve_with_search(candidates):
            schedule = build_chiplet_schedule(mapping, hw.network_on_package)
            latency = simulate_cycle_accurate(schedule, workload_profile)
            energy = estimate_energy(schedule, hw)
            score = objective(latency, energy, constraints=hw.area_power_limits)

            if best is None or score < best.score:
                best = Result(hw=hw, mapping=mapping, schedule=schedule,
                              latency=latency, energy=energy, score=score)

    return best
```

##### 方法机制解读

FLARE 关注的是 LLM 在多芯粒 CIM 系统上“能算”和“算得满”之间的差距。CIM 的优势是把矩阵乘所需的权重留在存储阵列附近，通过阵列内或近阵列计算降低权重搬运能耗。对一层线性变换：

$$
Y = XW
$$

传统 GPU 每次执行都要把 \(W\) 从 HBM 经过缓存层级搬到计算单元附近；CIM 则希望把 \(W\) 常驻在计算存储阵列中，只移动输入激活 \(X\) 和输出 \(Y\)。能耗可粗略写成：

$$
E_{\text{total}} =
E_{\text{compute}} +
N_X e_X +
N_Y e_Y +
N_W e_W
$$

FLARE 这类架构的目标是显著降低权重搬运项 \(N_W e_W\)，尤其是 FFN/MLP 和投影矩阵在 decode 阶段被反复读取时的能耗。

![2.5D HBM/logic PIM packaging background](https://mdpi-res.com/micromachines/micromachines-13-01790/article_deploy/html/images/micromachines-13-01790-g004-550.jpg)
*图：同一公开综述中的 2.5D CoWoS/HBM/logic chiplet 背景图。用于说明 CIM chiplet 与高带宽封装互连的关系，不是 FLARE 原论文图。*

难点在于 LLM 并不是单一的大矩阵乘。Attention 包含 Q/K/V 投影、softmax、KV cache 读写、输出投影；FFN 包含 up/gate/down projection 和非线性；不同阶段还存在 prefill 的大 batch GEMM 与 decode 的小 batch GEMV 差异。如果只把所有线性层粗粒度切到若干 chiplet，CIM core 可能因 tile 太小、跨芯粒 all-to-all 太多或阵列容量不匹配而空转。FLARE 摘要强调 fine-grained hardware-software stack，说明它把分区粒度下沉到 core 级执行，把“某层放在哪个 chiplet”进一步细化为“哪个 tile、哪个 micro-batch、哪个算子片段由哪类核心执行”。

这种 bottom-up 方法可以用一个映射目标函数概括：

$$
\min_{m \in \mathcal{M}}
\left[
\max_{c \in C}
\left(
\frac{\operatorname{ops}_c(m)}{\operatorname{throughput}_c}
+
\frac{\operatorname{bytes}_c(m)}{\operatorname{bw}_c}
\right)
+
\sum_{(u,v)\in E_m}
\frac{\operatorname{traffic}_{u,v}}{\operatorname{bw}_{u,v}}
\right]
$$

其中 \(m\) 是候选映射，\(c\) 是 core/chiplet，\(E_m\) 是映射诱导出的跨 core 或跨 chiplet 通信。第一项捕捉每个资源上的计算和本地存储瓶颈，第二项捕捉 NoP/inter-chiplet 传输。FLARE 与只做 layer-level placement 的方法不同，关键在于 \(\mathcal{M}\) 允许更细的 tile、数据流和硬件配置组合，因此可以在 CIM 阵列利用率与通信开销之间寻找更优折中。

硬件异构性是 FLARE 的另一层重点。CIM core 适合权重驻留、矩阵/向量乘和高复用线性层；数字 core 或外围逻辑更适合 softmax、归一化、采样、控制流以及需要高精度累加的部分。异构多芯粒系统还会有不同容量、带宽、互连半径和功耗约束。FLARE 的 hardware configuration identification 就是从这些选择中找出适合特定 LLM 类别的组合，而不是假定单一固定 accelerator。对小模型或低 batch decode，片上容量和启动延迟更关键；对大模型或高并发 prefill，NoP 带宽和跨芯粒并行度更关键。

从推理流程看，FLARE 的编译/运行时可分为三步。第一步，解析 Transformer 计算图和 workload profile，得到层形状、序列长度、batch、prefill/decode 比例和 KV cache 压力。第二步，把权重矩阵切成 CIM array 可容纳的 tile，并决定哪些激活在 chiplet 内复用、哪些需要跨 chiplet 广播或规约。第三步，生成 core 级 schedule，并用 cycle-accurate 模型评估延迟、能耗和硬件利用率。论文摘要中报告最高 4× token throughput 与 30× energy efficiency，直觉上来自两类叠加收益：权重移动减少带来的能耗下降，以及细粒度映射减少资源空转带来的吞吐提升。

与 H100 类 GPU 的根本区别在内存层级角色。GPU 依赖 HBM 提供通用高带宽，计算核心高度可编程，适合广泛算子；CIM chiplet 把部分权重存储本身变成计算资源，牺牲一定通用性来降低数据搬运。FLARE 的价值不只是提出一种 CIM 宏，而是把多芯粒封装、核心级映射、LLM 分区和硬件配置搜索放到同一个设计循环中。这样才能避免单个 CIM core 很高效、系统级却被跨芯粒通信或负载不均衡抵消的常见问题。

> ⚠️ 注意：IEEE Xplore 页面、Crossref 元数据和 ResearchGate 摘要可验证 FLARE 的标题、作者、期刊、页码、核心贡献与 4×/30× 结果；本文未能取得公开可直达的 FLARE 原论文图片，因此涉及具体宏电路细节时仅解释公开摘要支持的系统机制，不臆造未公开图表。

#### 🧪 练习题

```yaml
question: "FLARE 为什么强调从 core 级到 chiplet 级的 bottom-up 细粒度映射，而不是只做 layer 级分配？"
options:
  - "因为 LLM 算子形态、CIM 阵列容量、NoP 通信和异构核心能力都可能在更细粒度上决定利用率"
  - "因为 CIM 系统不需要考虑任何通信开销"
  - "因为所有 Transformer 层都必须完整放在同一个 core 中"
  - "因为 H100 GPU 没有 HBM"
answer: 0
explain: "FLARE 的核心问题是多芯粒 CIM 系统中的分区和映射。细粒度建模可以同时约束 core 利用率、阵列容量和跨芯粒通信，避免粗粒度 layer placement 导致系统级瓶颈。"
```
