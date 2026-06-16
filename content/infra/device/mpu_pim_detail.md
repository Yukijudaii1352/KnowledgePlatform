### MPU

```yaml
id: mpu_pim
name: MPU
full_name: 存内处理通用接口 (Memory Processing Unit)
year: '2026'
org: HPCA
paper_url: https://ieeexplore.ieee.org/abstract/document/11408599/
category: pim_cim
parent: isaac
motivation: 通用PIM接口实现端到端存内执行
```

#### 📝 一句话总结

MPU 提出了一个面向通用 bitwise PUM 的微架构无关前端，用统一 ISA、ensemble 执行模型和控制路径解决既有存内计算接口难以扩展、难以跨后端复用、且频繁依赖 CPU 处理控制流的问题。它把 PUM 从“只加速少量规则 kernel”推进到可以执行复杂端到端应用的存内处理平台。

#### 🎯 核心要点

- 面向 processing-using-memory, PUM，也就是利用存储单元交互直接执行逻辑运算的存内计算范式
- 三个核心组件：MPU ISA、ensemble execution model、综合 MPU control path
- 抽象出 VRF、RFH 和 ensemble：VRF 对应一个或多个存储阵列，RFH 封装热/互连等硬件约束，ensemble 表达程序员定义的并行任务集合
- 支持 compute ensemble、transfer ensemble 和 inter-MPU message passing，用于计算、片内迁移和多 MPU 协同
- 通过统一译码器把 MPU 指令翻译成 RACER、MIMDRAM、Duality Cache 等不同 PUM 后端的微操作
- 用 mask register、SETMASK/JUMP_COND 和 evaluation fetching infrastructure 支持 per-lane predication、if-else、动态循环和子程序返回
- 引入 RFH-aware 热/功耗感知调度，限制同一 RFH 中并发激活的 VRF 数量，避免存内并行度造成过高功率密度
- 论文报告在 21 个数据密集 kernel 上相对既有 PUM 设计平均提升 1.79× 性能和 3.23× 能效，并显著降低对主机 CPU 的控制依赖

#### 🔬 深入细节

##### 核心示意图

![MPU 控制路径和后端抽象](https://image.thum.io/get/width/1200/noanimate/https://susansun1999.github.io/images/hardware.pdf)
*图：MPU 作者 Yiqiu Sun 个人项目页公开的 MPU hardware 图，经远程图片服务渲染为 PNG；原始官方图源为 https://susansun1999.github.io/images/hardware.pdf。图中可以看到 front end、template filler、decoder、compute controller、data transfer controller、VRF/RFH 后端抽象和 inter-MPU controller。*

##### 算法伪代码

```python
# MPU 的 ensemble 执行与 RFH-aware 调度简化逻辑
for block in ezpim_program:
    if block.kind == "compute_ensemble":
        ensemble = []
        for rfh_id, vrf_id in block.header.COMPUTE:
            ensemble.append((rfh_id, vrf_id))

        while has_waiting_vrfs(ensemble):
            # 每个 RFH 的可激活 VRF 数量由热/功耗约束给出
            active = scheduler.pick_under_rfh_limits(
                ensemble,
                limit=lambda rfh: rfh.max_active_vrfs,
            )

            for inst in block.body:
                if inst.op in {"CMPEQ", "CMPGT", "CMPLT"}:
                    conditional_register = execute_compare(active, inst)
                elif inst.op == "SETMASK":
                    mask_register = read_mask_source(inst, conditional_register)
                elif inst.op == "JUMP_COND":
                    if any_lane_enabled(mask_register):
                        program_counter = inst.target
                else:
                    micro_ops = decoder.lower_to_datapath_micro_ops(inst, active)
                    issue_to_selected_vrfs(active, micro_ops, mask_register)

            scheduler.retire(active)

    elif block.kind == "transfer_ensemble":
        acquire_single_transfer_slot()  # 保证顺序一致性
        routes = setup_move_pairs(block.header.MOVE)
        for memcpy in block.body.MEMCPY:
            move_vector_register(routes, memcpy.src, memcpy.dst)
        release_transfer_slot()

    elif block.kind == "send_block":
        order_by_mpu_id_to_avoid_deadlock(block.destination)
        inter_mpu_controller.send(block.destination, block.payload)
```

##### 方法机制解读

MPU 的出发点是：PUM 后端本来可以在存储阵列内部以极高并行度执行位操作，但现实程序不是只有规则向量 kernel。图算法、数据库、基因组、边缘分析等数据密集应用通常穿插标量计算、条件分支、动态循环、数组间数据迁移和跨任务同步。既有 PUM 设计往往把这些“间隙代码”交给主机 CPU，导致每次控制转移都要跨芯片往返。论文的简单模型显示，即便每 80 条指令才需要一次 CPU 辅助，也会造成约 10.1× 的循环执行时间膨胀；普通程序的损失可到 30-40× 量级。因此 MPU 不是再提出一个新的 PUM 阵列，而是给不同 PUM 阵列补上可编程前端和控制路径。

核心抽象有三层。VRF, vector register file，是程序可见的向量寄存器文件，设计者把它映射到一个或多个物理 memory arrays；RFH, RF holder，把共享物理限制的一组 VRF 归在一起，例如热激活上限、局部互连、pipeline/core 边界；ensemble 是程序员定义的一组 VRF，这些 VRF 执行同一段 kernel。用集合表示，一个 ensemble 可以写作：

$$
\mathcal{E}=\{(h,v)\mid h\in RFH,\ v\in VRF(h)\}
$$

但实际同周期可激活集合还必须满足每个 RFH 的硬件约束：

$$
\forall h,\quad \sum_{v\in Active(h)} 1 \le L_h
$$

其中 \(L_h\) 是该 RFH 在当前指令类型和功耗条件下允许的最大并发 VRF 数。这个拆分很重要：程序可以按任务自然组织 ensemble，而不需要硬编码物理相邻性或热限制；MPU runtime 和 scheduler 再把 ensemble 分批投放到可安全执行的 VRF 上。

MPU ISA 把 PUM 程序拆成 compute ensemble 和 transfer ensemble。compute ensemble 由 `COMPUTE` header、算术/逻辑 body、`COMPUTE_DONE` footer 组成，适合 `ADD`、`MUL`、`MAC`、`AND`、`NOR`、`POPC` 等向量计算。transfer ensemble 由 `MOVE`、`MEMCPY`、`MOVE_DONE` 表达 VRF 间拷贝，论文要求同一 MPU 一次只执行一个 transfer ensemble，以保证顺序一致性。跨 MPU 则使用 `SEND`、`RECV`、`SEND_DONE` 做显式 message passing，并用 MPU ID 顺序打破环形等待，避免 transfer 通信死锁。

统一 ISA 的价值在于把“软件二进制”和“存储技术微操作”解耦。不同 PUM 后端的基本逻辑可能来自 DRAM triple-row activation、ReRAM NOR/IMPLY、SRAM bitline compute 或其他机制，延迟、阵列大小和可并行激活范围都不同。MPU control path 中的 decoder 和 recipe table 负责把一条通用 `ADD` 或 `CMPGT` 展开成具体后端的微操作序列。这样软件栈可以面向 MPU ISA、VRF/RFH 和 ensemble 编程，而不是为 RACER、MIMDRAM、Duality Cache 分别维护不可移植的汇编。

控制流支持是 MPU 与早期 PUM 接口的关键差异。MPU 使用 mask register 实现按 lane predication：比较指令把结果写入 conditional register，`SETMASK` 把条件转换成 lane mask，后续指令只在启用 lane 上生效。一个简化表达是：

$$
y_\ell' = m_\ell \cdot f(x_\ell) + (1-m_\ell)\cdot y_\ell
$$

其中 \(m_\ell\in\{0,1\}\) 决定第 \(\ell\) 个 lane 是否执行当前操作。`JUMP_COND` 再通过 evaluation fetching infrastructure 把 mask 状态取回控制器，如果仍有 lane 需要继续迭代，就更新 PC 跳回循环体。这样 while-loop、if-else 和数据相关退出条件可以在 PUM 内部完成，不必每轮都回到 CPU 判断。

热/功耗调度解决的是 PUM 的另一个现实问题：内存密度高，若无约束地同时激活大量阵列，功率密度可能超过安全散热范围。MPU scheduler 对每个 RFH 维护 active queue 和 waiting queue，先激活不超过上限的 VRF；当当前批次完成时，再从 waiting queue 中取下一批继续执行。这个机制牺牲部分瞬时并行度，但换来正确、可部署、对程序员透明的执行模型。

与 CPU/GPU 相比，MPU 的目标不是替代通用计算，而是在数据已经位于存储阵列中时消除反复搬运和主机控制往返。与 ISAAC 一类神经网络 CIM/PIM 加速器相比，MPU 关注的是通用 bitwise PUM 的编程接口和系统能力：动态控制流、任务协调、数据迁移、跨后端可移植性。可以把它理解为 PUM 生态中的“前端 ISA 与 runtime 层”，为未来编译器、OpenMP/MapReduce 风格编程和端到端应用部署提供共同目标。

> 💡 关键：MPU 的核心贡献不是把某个矩阵乘做得更快，而是把 PUM 从后端微架构论文中的专用 kernel 加速器，抽象成有 ISA、任务模型、调度器和控制流能力的可编程存内执行平台。

#### 🧪 练习题

```yaml
question: "MPU 引入 RFH 的主要目的是什么？"
options:
  - "封装一组 VRF 共享的热、互连或激活约束，让运行时安全调度并隐藏物理细节"
  - "强制所有 VRF 必须在同一周期同时执行，模拟 GPU warp"
  - "把所有存内计算统一转换成主机 CPU 标量指令"
  - "只用于保存神经网络权重，与通用 PUM 控制无关"
answer: 0
explain: "RFH 把具有共同物理限制的 VRF 分组，MPU scheduler 根据 RFH 上限分批激活 VRF，使程序不必暴露后端位置和功耗约束。"
```
