### GR-1 / GR-2: Fourier 傅里叶人形机器人

```yaml
id: gr1
name: GR-1/GR-2
full_name: 傅里叶人形机器人(GR-1/GR-2)
year: 2024.09
org: Fourier
paper_url: https://www.fftai.com/newsroom-newintech/14
category: transformer_policy
parent: rt_x
motivation: 人形机器人端到端全身控制
```

---

#### 📝 一句话总结

GR-1 / GR-2 是傅里叶智能推出的全尺寸人形机器人平台，基于纯视觉鸟瞰图（BEV）感知与 Transformer 运动策略实现端到端全身运动控制，通过自研 FSA 系列高扭矩密度关节模组（GR-1 峰值 230 N·m，GR-2 峰值 380 N·m）、12-DoF 五指灵巧手以及 NVIDIA Isaac Lab 仿真训练管线，构建了从底层驱动到上层智能的完整技术栈，代表了 2024 年具身智能从“单一任务机器人”向“通用人形操作体”跨越的关键系统工程实践。

#### 🎯 核心要点

- **双代际产品线**：GR-1（2023 发布，44 自由度 / 1.65 m / 55 kg）与 GR-2（2024 年 9 月发布，53 自由度 / 1.75 m / 63 kg）形成高低搭配，GR-2 全面升级。
- **自研关节模组 FSA**：GR-1 搭载 FSA 1.0（峰值扭矩 230 N·m），GR-2 升级为 FSA 2.0（峰值扭矩 380 N·m），采用双编码器全闭环控制，提供高回驱透明度。
- **纯视觉 BEV 感知**：仅依靠机载 RGB 摄像头构建鸟瞰图（Bird's-Eye-View）表征，融合 Occupancy Network（OccNet）进行三维场景理解，不依赖外部激光雷达。
- **Transformer 运动策略**：将视觉 token 与本体感知（关节角、力矩、足底力）融合，经 Transformer 解码器自回归生成全身关节位置/扭矩指令，属于 transformer_policy 体系下与 RT-2 同源的控制范式。
- **灵巧操作手**：GR-2 配备 12 自由度五指灵巧手，集成触觉传感器，支持精细物体抓取与工具使用，使具身智能从移动导航扩展到灵巧操作。
- **Isaac Lab 仿真管线**：基于 NVIDIA Isaac Lab 与 MuJoCo 搭建高保真仿真环境，支持域随机化与并行训练，并通过 sim2real 迁移部署到物理硬件。
- **开放生态**：提供 ROS 2 SDK、数字孪生模型与 API 接口，支持研究者在平台上进行具身智能算法验证。

#### 🔬 深入细节

##### 1. 系统架构：感知–决策–控制的端到端闭环

![GR-2 全身运动控制示意图](https://www.fftai.com/uploads/upload/images/20240926/453ccb3f784b5a1755ae86869bfb7316.jpg)

*图 1：GR-2 在操作任务中展示全身协调运动能力，视觉模块实时感知环境，Transformer 策略输出全身 53 个关节的目标位置。*

GR 系列的系统架构遵循“感知 → 决策 → 执行”三层闭环，形成了一个完全端到端的控制流水线：

```
┌─────────────────────────────────────────────────────┐
│  感知层 (Perception)                                  │
│  RGB 图像输入 → BEV 特征提取 → OccNet 3D 占用预测      │
│  + 本体感知（关节角 θ, 力矩 τ, 足底力 f）               │
└───────────────────────┬─────────────────────────────┘
                        ▼
┌─────────────────────────────────────────────────────┐
│  决策层 (Decision / Policy)                          │
│  Multi-Modal Transformer Encoder                     │
│  视觉 token + 本体 token → 跨注意力融合                │
│  → Action Decoder 自回归输出 7/53 维目标动作            │
└───────────────────────┬─────────────────────────────┘
                        ▼
┌─────────────────────────────────────────────────────┐
│  执行层 (Actuation)                                  │
│  目标动作 → 关节级 PD/阻抗控制器 → FSA 关节模组          │
│  双编码器反馈 @ 1 kHz 闭环                              │
└─────────────────────────────────────────────────────┘
```

**核心设计思想**：感知与决策共享 Transformer 骨干，避免模块间信息瓶颈；执行层采用全自研关节模组，保证高带宽力控，使得上层策略输出的扭矩指令能够被高保真地执行。

##### 2. 纯视觉 BEV + OccNet 感知管线

GR 系列不使用激光雷达，仅依靠机载 RGB 摄像头。感知管线分为两个阶段：

1. **BEV 特征提取**：多视角图像经共享卷积编码器提取特征，通过“视锥 → 体素”的 Lift-Splat-Shoot（LSS）式投影将 2D 特征提升到 3D BEV 空间。BEV 网格以机器人为中心的俯视图表示周围可通行区域与障碍物分布。
2. **Occupancy Network 3D 场景理解**：在 BEV 特征基础上，轻量级 OccNet 将体素空间离散化为占用概率场 \\(p_{\text{occ}}(x,y,z)=\sigma(f_{\text{MLP}}(\mathbf{h}_{\text{BEV}}(x,y), z))\\)，实现对任意形状障碍物的精确建模。

> 💡 **为什么不使用激光雷达？** BEV + OccNet 的纯视觉方案（1）成本大幅降低，（2）可无缝利用大规模图像预训练模型的知识迁移，（3）视觉特征天然与语言、语义任务兼容，便于扩展到 VLA（Vision-Language-Action）架构。

##### 3. 端到端运动策略：Transformer 驱动的全身控制

运动策略将视觉感知与本体感知融合，输出全身关节指令。其核心为一个多模态 Transformer 模型：

**输入序列构造**：

\\[
X = [\text{VIS}_1, \ldots, \text{VIS}_N, \text{BOD}_1, \ldots, \text{BOD}_M, \text{CMD}]
\\]

- **视觉 token** \\(\text{VIS}_i\\)：BEV 特征图经 Flatten + MLP 投影得到。
- **本体感知 token** \\(\text{BOD}_j\\)：包含关节角 \\(\theta\\)、角速度 \\(\dot{\theta}\\)、力矩 \\(\tau\\)、足底力 \\(F_{\text{foot}}\\) 等，分别投影到统一维度。
- **指令 token** \\(\text{CMD}\\)：来自高层规划的目标速度、朝向或自然语言任务描述（VLA 模式下）。

**Transformer 编解码器**：

```
Input: [VIS_1, ..., VIS_N | BOD_1, ..., BOD_M | CMD]
       │
       ▼
  Multi-Head Self-Attention (所有 token 可见)
       │
       ▼
  Cross-Attention (视觉 token → 本体 token 的条件化)
       │
       ▼
  FFN + LayerNorm × L blocks
       │
       ▼
  Action Head: MLP → [目标关节角 / 力矩]_{1:J}
```

**伪代码：端到端推理循环**

```python
# GR 端到端运动策略推理（简化版）
# 输入: rgb_images (N_views, H, W, 3), proprio (J, 4), cmd (D_cmd)

def gr_policy_forward(rgb_images, proprio, cmd):
    # 1. BEV 感知：多视角 → 鸟瞰图特征
    image_features = CNN_backbone(rgb_images)          # (N, C, h, w)
    bev_tokens = lift_splat_shoot(image_features)      # (H_bev × W_bev, E)

    # 2. 本体感知编码
    proprio_input = concat([joint_pos, joint_vel, torque, foot_force])
    body_tokens = MLP_proprio(proprio_input)           # (J, E)

    # 3. 指令编码
    cmd_token = MLP_cmd(cmd)                           # (1, E)

    # 4. 拼接并送入 Transformer
    x = concat([bev_tokens, body_tokens, cmd_token])  # (T_total, E)
    for block in transformer_blocks:
        x = block.self_attention(x)                   # 所有模态自由交互
        x = block.cross_attention(x)                  # 视觉引导本体
        x = block.ffn(x)

    # 5. 提取本体 token 对应输出，解码为动作
    body_output = x[-J-1:-1]                           # 取最后的 body 部分
    action = action_head(body_output)                  # (J,) → 目标关节角/力矩

    return action

# 闭环执行：策略输出 → 底层阻抗控制器 → FSA 关节模组
def control_loop():
    while True:
        rgb = camera_capture()
        proprio = read_joint_state()
        cmd = high_level_planner()

        target = gr_policy_forward(rgb, proprio, cmd)
        impedance_control(target, Kp=200, Kd=5)       # 1 kHz 内环
        sleep(0.01)
```

> ⚠️ **关键设计选择**：(1) 视觉 token 与本体 token 在 Transformer 内部自由自注意，使模型能自主学习“看到台阶 → 抬高脚踝”之类的跨模态关联，无需手动特征工程；(2) 策略输出作为阻抗控制器的目标位姿而非直接输出扭矩，利用关节级 FSA 控制器的高带宽（1 kHz）补偿 sim2real 的动力学 gap。

##### 4. FSA 关节模组与 12-DoF 灵巧手：硬件–算法协同设计

**FSA 2.0 关节模组**是 GR-2 的核心驱动力单元，决定了力控策略的物理上限：

| 指标 | FSA 1.0 (GR-1) | FSA 2.0 (GR-2) |
|------|----------------|----------------|
| 峰值扭矩 | 230 N·m | 380 N·m |
| 控制方式 | 单编码器半闭环 | 双编码器全闭环 |
| 回驱透明度 | 中等 | 高（适合阻抗/导纳控制） |
| 通信总线 | CAN | EtherCAT（1 kHz 同步） |

**GR-2 灵巧手**（12 个主动自由度，集成触觉传感器）实现了从“足式移动”到“精细操作”的能力跃升：

- **12-DoF 分布**：拇指 3 自由度、食/中/无名/小指各 2 自由度、手掌内收 1 自由度
- **触觉感知**：每指尖集成 MEMS 压力传感器阵列，实时反馈接触力 \\(F_{\text{tactile}} \in \mathbb{R}^{5 \times 3}\\)
- **微型 FSA 驱动**：指尖关节采用微型化 FSA 模组，保持与大型关节一致的控制接口与力控带宽

![GR-2 灵巧手细节](https://www.fftai.com/uploads/upload/images/20240926/c054022c288c4e58de81ff610d6f4c0b.jpg)

*图 2：GR-2 的 12-DoF 五指灵巧手，集成微型 FSA 关节模组与指尖触觉传感器。*

> 💡 **软硬协同设计**：FSA 的高回驱透明度意味着上层策略可以直接输出关节扭矩，利用阻抗控制实现柔顺交互——这对人形机器人在与人或物体接触时的安全性至关重要。Transformer 策略负责“预测该做什么”，FSA 模组负责“高保真地做到”。

##### 5. Isaac Lab 仿真与 Sim2Real 迁移

训练管线基于 **NVIDIA Isaac Lab**（Isaac Sim 的 RL 训练框架）与 **MuJoCo** 物理引擎双轨并行：

- **域随机化**：在仿真中对质量、摩擦系数、关节阻尼、视觉纹理、光照等施加随机扰动，使策略学习鲁棒特征
- **并行训练**：同时运行数千个仿真环境实例，利用 GPU 加速数据采样与策略更新
- **Sim2Real 部署**：训练完成的策略直接部署到物理硬件，无需微调——核心依赖 (1) 域随机化带来的分布偏移鲁棒性，(2) 底层 FSA 阻抗控制器吸收剩余动力学误差

![GR-2 仿真与实物对比](https://www.fftai.com/uploads/upload/images/20240926/19112c6cce070994ee20ee854ffbad1f.jpg)

*图 3：GR-2 在 Isaac Lab 仿真环境中与实物对照，sim2real 迁移实现了视觉运动策略的零样本部署。*

##### 6. 与 RT-2 / Octo 等主流 VLA 路线的关系

GR 系列的控制架构属于 **transformer_policy** 类，与 RT-2、Octo 等共享“多模态输入 → Transformer → 动作输出”的基本骨架。关键差异：

| 维度 | RT-2 / Octo | GR-1 / GR-2 |
|------|------------|-------------|
| 感知模态 | 图像 + 语言 | 图像 + 本体感知 + BEV |
| 策略输出 | 末端执行器位移 / 离散动作 token | 全身 53 个关节位置 / 扭矩 |
| 执行对象 | 桌面级机械臂（通常 ≤ 7 DoF） | 全尺寸人形机器人（44 / 53 DoF） |
| 训练数据 | 大规模开源机器人数据集（OXE） | 自建仿真轨迹 + 遥操作演示 |
| 力控方式 | 通常仅位置控制 | 位置 / 扭矩 / 阻抗三模可选 |

**GR 系列的最大工程突破**在于：将 Transformer 策略从低自由度桌面操作成功扩展到高自由度人形全身控制，并通过自研 FSA 模组与灵巧手将复杂策略“落地”到物理世界。这是具身智能从“实验室演示”迈向“产业级平台”的关键一步。

![GR-1 双足步行](https://www.fftai.com/uploads/upload/images/20240925/95b9a5c173d5dfe3e1bd488cfef79b87.png)

*图 4：GR-1 在室内环境中展示稳定的双足步行能力，纯视觉 BEV 感知支撑其在障碍物间自主导航。*

#### 🧪 练习题

```yaml
question: "GR-2 的端到端运动策略中，视觉 token 与本体感知 token 在 Transformer 内部采用何种交互方式？"
options:
  - "视觉 token 先独立编码，再通过一个固定映射矩阵投影到关节空间"
  - "两类 token 在自注意力层中自由交互，使模型自主学习跨模态关联"
  - "视觉先独立推理出目标轨迹，本体控制器再跟踪该轨迹"
  - "仅使用本体感知 token，视觉仅用于障碍物检测而不参与运动生成"
answer: 1
explain: "GR-2 将所有模态 token 拼接后送入 Transformer 的 self-attention 层，视觉与本体 token 在每一层都能自由交互，从而使策略能够学习例如“看到台阶高度→调整踝关节角度”这样的细粒度跨模态匹配，这是端到端全身控制与分层方法的核心区别。"
```