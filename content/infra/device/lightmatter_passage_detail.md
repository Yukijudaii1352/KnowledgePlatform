### Lightmatter Passage: 3D 光子互连平台

```yaml
id: lightmatter_passage
name: Lightmatter Passage
full_name: Lightmatter 3D光子互连 (Lightmatter Passage 3D Photonic Interconnect)
year: '2026'
org: Lightmatter
paper_url: https://lightmatter.co/blog/isscc-2026-scaling-ai-with-light/
category: photonic
parent: —
motivation: 3D光子互连链路功耗从30W降至9W
```

#### 📝 一句话总结

Lightmatter Passage 提出以 3D 光子 interposer / co-packaged optics 打破芯片边缘 I/O “shoreline” 限制，把电-光接口从封装边缘扩展到芯片面积维度，解决大规模 AI 训练中 scale-up 互连带宽密度、能耗和可扩展性瓶颈。官方资料显示，Passage M1000 参考平台提供 114 Tbps 聚合双向带宽，L200/L200X 面向 32/64 Tbps 光 I/O，L20 面向 12.8 Tbps 近封装/板上光互连。

#### 🎯 核心要点

- 核心架构是 Edgeless I/O：不再只沿芯片边缘布置 I/O，而是在 3D 集成中把电-光接口扩展到 die 面积
- M-series 是 3D photonic interposer，把 XPU / switch die complex 叠放在主动光子中介层之上
- Passage M1000 EVK 是 4000 mm² 级参考平台，官方标称 114 Tbps 聚合双向带宽、256 optical fibers、1.5 kW+ power delivery 与内置 solid-state optical circuit switching
- L-series 覆盖 near-package optics、on-board optics 和 co-packaged optics；L200/L200X 提供 32/64 Tbps optical I/O
- L200 采用 3D chip-on-wafer（CoW）集成，官方规格包括 PAM4（56G/112G）、<5 pJ/bit optical efficiency、detachable fiber、10 m 到 2 km direct-drive reach
- L20 是 BiDi near-packaged/on-board optical module，官方规格为 6.4 Tbps each direction、212.5 Gbps PAM4、32 data fibers、5 pJ/bit
- Passage 平台层面支持 56-448 Gbps per lane、1-16+ wavelengths、bidirectional fiber 与 built-in optical circuit switching
- Lightmatter 2026 官方博客称 M-series 可达到约 1 Tbps/mm² areal I/O density，M1000 参考平台在含激光功率下达到 2.3 pJ/bit
- Guide 外部激光源与 Passage 配套，在 16-wavelength DWDM grid 上提供 51.2 Tbps I/O，并强调波长稳定和自修复能力

#### 🔬 深入细节

##### 核心示意图

![Lightmatter Passage M1000](https://lightmatter.co/wp-content/uploads/2025/03/M1000_Module_2_000-1159x1400.webp)
*图：Lightmatter 官方 M1000 产品图。M1000 是 Passage M-series 3D Photonic Superchip 参考平台，用主动光子 interposer 承载大 die complex 的高密度光 I/O。*

##### 互连调度伪代码

```python
# Passage: 在大规模 XPU 域中为 collective traffic 分配光互连资源的抽象流程
def passage_scaleup_collective(xpu_mesh, collective, passage_fabric):
    traffic = build_collective_traffic_matrix(xpu_mesh, collective)

    # 1) 根据通信距离和带宽需求选择 L-series 或 M-series 路径
    for flow in traffic.flows:
        if flow.inside_large_die_complex:
            flow.path = passage_fabric.m_series_interposer.route(flow.src, flow.dst)
        elif flow.near_package_or_board:
            flow.path = passage_fabric.l_series_module.route(flow.src, flow.dst)
        else:
            flow.path = passage_fabric.fiber_link.route(flow.src, flow.dst)

    # 2) DWDM/BiDi 资源分配：同一 fiber 上复用多个 wavelength，并利用双向链路提升 radix
    for path in passage_fabric.paths:
        demands = traffic.demands_on(path)
        wavelengths = allocate_wavelengths(demands, grid=passage_fabric.dwdm_grid)
        configure_bidirectional_links(path, wavelengths)

    # 3) 若 fabric 支持 optical circuit switching，对大流/同步热点建立光路
    for hotspot in detect_synchronization_hotspots(traffic):
        passage_fabric.optical_circuit_switch.connect(hotspot.sources, hotspot.sinks)

    # 4) 执行 all-reduce / all-gather / all-to-all 等 scale-up collective
    latency = simulate_or_measure_collective(traffic, passage_fabric)
    return latency
```

##### Shoreline 瓶颈与 Edgeless I/O

传统电互连和常规光 I/O 都受芯片边缘长度限制：计算 die 的面积随 \(r^2\) 增长，但可放 I/O bump、SerDes、光引擎或连接器的周长只随 \(r\) 增长。带宽需求来自整个芯片面积，I/O 供给却被挤在边缘，这就是 Lightmatter 文档反复强调的 shoreline bottleneck。

可以把传统边缘 I/O 的可扩展性写成：

$$
B_{\text{edge}} \propto \rho_{\text{edge}} \cdot 2\pi r
$$

而 3D photonic interposer 或 area-array I/O 的目标是让带宽随面积扩展：

$$
B_{\text{area}} \propto \rho_{\text{area}} \cdot \pi r^2
$$

Passage 的工程含义是把电-光接口垂直集成到封装内部：M-series 把 photonic interposer 放在 die complex 下方，在整个表面提供 I/O；L-series 则把相同思想落到 near-package、on-board、co-packaged optics 形态。这样，scale-up fabric 不再被封装边缘可逃逸信号数量卡死。

##### M1000：主动光子 interposer

M1000 是 Passage 最典型的“3D 光子互连”形态。官方产品页称其为 4000 mm² photonic interposer，可服务大规模 die complex，具备 256 根 optical fibers、1.5 kW+ power delivery 和内置 solid-state optical circuit switching。Lightmatter 2026 博客进一步说明，M-series 将 I/O 布置在完整 die area 上，达到约 1 Tbps/mm² 的面积 I/O 密度；M1000 参考平台已展示 114 Tbps 聚合双向带宽，并在包含激光功率时达到 2.3 pJ/bit。

M1000 的关键不只是“把光纤插得更多”。它把光子 waveguide、调制/探测、电源/热路径和芯片间路由共同纳入 interposer。对于 all-reduce、all-gather、all-to-all 等同步通信，最慢链路会决定 step time；把光路带到 package 内部，可以缩短高损耗电路径，减少 retimer/DSP 依赖，并让高带宽 fiber 直接服务 XPU 域内的 collective traffic。

##### L200/L20：从 CPO 到 near-package/on-board

![Lightmatter Passage L200](https://lightmatter.co/wp-content/uploads/2026/03/l200-hero.webp)
*图：Lightmatter 官方 L200 产品图。L200/L200X 是 Passage L-series 3D co-packaged optics 产品，面向下一代 XPU 和 switch 的 32/64 Tbps optical I/O。*

L200 是 L-series 中更靠近 co-packaged optics 的形态。官方页面写明，L200/L200X 分别提供 32/64 Tbps optical I/O，total I/O 超过 200 Tbps/chip，采用 3D chip-on-wafer 集成，支持 PAM4（56G/112G）、detachable fiber、<5 pJ/bit optical efficiency，以及 10 m 到 2 km direct-drive reach。它面向 frontier-scale training，目标是在 XPU 或 switch 周边提供远高于传统 pluggable 的带宽密度。

L20 则是更易部署的 near-package / on-board optics 方案。官方规格为 6.4 Tbps each direction，总计 12.8 Tbps aggregate bandwidth，采用 212.5 Gbps PAM4、32 data fibers、37.5 mm × 26.4 mm BGA 封装，能效 5 pJ/bit，并强调相对 OSFP 体积小 88%。它的定位不是替代 M1000，而是让没有能力立即改 package 的系统也能缩短 PCB 电路径，把高速光互连靠近 ASIC。

##### DWDM、BiDi 与外部激光

Passage 平台宣称支持 56-448 Gbps per lane、1-16+ wavelengths、bidirectional architecture 和 built-in optical circuit switching。多波长 DWDM 让单根 fiber 承载多个颜色通道，BiDi 让同一物理 fiber 同时支持两个方向的通信，提高有效 radix。对大规模 AI 集群而言，这直接影响 collective 通信的可用带宽和拓扑灵活性。

Guide 是配套外部激光源。Lightmatter 2026 博客称单个 Guide 1 模块可在 1310 nm 附近的 16-wavelength DWDM grid 上提供 51.2 Tbps I/O，替代多个传统 ELSFP laser modules，并强调波长稳定、自修复和与 OCI MSA 的对齐。把激光源外置的好处是热管理和可维护性更好，光引擎侧只需要接收稳定的多波长光源。

##### 30W 到 9W 的动机与 Passage 的定位

prompt 中的 motivation 写到“链路功耗从 30W 降至 9W”。公开资料中，30W/port 到 9W/port 常作为 CPO 相对传统 pluggable optics 的行业级对比，用于说明去掉长电链路、retimer/DSP 和前面板 pluggable 约束后的功耗收益。对 Passage 来说，更直接的官方量化指标是 L20 的 5 pJ/bit、L200 的 <5 pJ/bit optical、M1000 的 2.3 pJ/bit（含激光）以及 M1000 的 114 Tbps 聚合带宽。

因此，Passage 的技术贡献应理解为封装级光互连体系，而不是单个光模块指标。它把光 I/O 从“交换机前面板模块”前移到 near-package、co-packaged 或 interposer 位置，在物理上减少高速电信号走线距离，在架构上扩大 scale-up domain，在系统上为数千 XPU 的同步通信提供更低能耗的带宽来源。

> 💡 关键：Passage 的价值不只是每 bit 更省电，而是把 I/O scaling law 从“沿边缘增长”改成“随面积增长”，这对 AI scale-up fabric 比单条链路速率更重要。

#### 🧪 练习题

```yaml
question: "Lightmatter Passage 的 Edgeless I/O 主要解决什么问题？"
options:
  - "传统芯片 I/O 受 die 边缘长度限制，而 3D 光子集成可让带宽密度随面积扩展"
  - "把所有 GPU 计算替换为纯光学矩阵乘法"
  - "取消外部激光源，使每个光链路完全无功耗"
  - "只提升单个 CPU 核心的整数 ALU 吞吐"
answer: 0
explain: "Passage 的核心是把电-光接口从封装边缘移向 3D interposer 或近封装区域，使 I/O 不再只受 shoreline 周长限制。"
```
