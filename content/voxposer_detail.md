### VoxPoser: Composable 3D Value Maps for Robotic Manipulation with Language Models

#### 📝 一句话总结

VoxPoser 利用大语言模型（LLM）的代码编写能力，将自由形式语言指令中的可供性（affordance）和约束（constraint）推断为 3D 价值地图（Value Maps），通过视觉-语言模型（VLM）将其锚定到机器人观测空间，并在模型预测控制框架中零样本合成 6-DoF 末端执行器轨迹，解决了传统机器人操作中依赖预定义运动原语的瓶颈问题。

#### 🎯 核心要点

- **LLM 推断 Affordance 与 Constraint**：利用 LLM 从自然语言指令中推理"在哪里操作"和"避开什么"，无需额外训练
- **代码即策略（Code as Policy）**：LLM 生成 Python 代码调用 VLM API（CLIP、OWL-ViT、SAM 等）和数组操作库（NumPy），实现感知与空间推理的组合
- **3D Voxel Value Maps**：在观测空间构建密集的 3D 体素价值/代价地图，作为运动规划的优化目标函数
- **零样本轨迹合成**：将 value maps 嵌入模型预测控制（MPC）框架，合成鲁棒的闭环 6-DoF 轨迹，无需任务特定数据
- **在线交互学习**：通过少量在线交互高效学习接触丰富场景的动力学模型，进一步提升操作精度
- **大规模实验验证**：在仿真和真实机器人环境中对 130+ 条自由形式指令、80+ 种物体进行零样本评估
- **涌现行为能力**：展现出行为常识推理、细粒度语言纠错、多步骤视觉编程、物体物理属性估计等能力

#### 🔬 深入细节

##### 1. 核心示意图

![VoxPoser 框架总览](https://ar5iv.org/html/2307.05973/assets/x1.png)
*图 1：VoxPoser 从 LLM 提取语言条件的可供性和约束，通过代码接口使用 VLM 将其锚定到感知空间，组成 3D 价值地图，实现零样本轨迹合成。*

![VoxPoser 方法概览](https://ar5iv.org/html/2307.05973/assets/x2.png)
*图 2：VoxPoser 整体方法流程：给定语言指令和 RGB-D 观测，LLM 生成代码调用 VLM 构建 3D 价值地图，进而通过 MPC 合成机器人轨迹。*

![3D 价值地图可视化](https://ar5iv.org/html/2307.05973/assets/x3.png)
*图 3：组合 3D 价值地图及在真实环境中的 rollout 可视化。红色区域代表高价值（affordance），蓝色区域代表约束/避碰区域。*

##### 2. 算法伪代码

```python
# VoxPoser 核心流程
def voxposer_solve(instruction, rgbd_obs):
    # Step 1: LLM 推理 affordance & constraint，生成 Python 代码
    code = LLM.generate_code(instruction, scene_description)
    
    # Step 2: 执行代码，调用 VLM 获取空间信息
    # LLM 生成的代码示例：
    #   handle_mask = owl_vit.detect("drawer handle")
    #   vase_mask = owl_vit.detect("vase")
    #   affordance_map = np.where(handle_mask, 1.0, 0.0)
    #   constraint_map = np.where(vase_mask, -1.0, 0.0)
    exec(code)  # -> affordance_map, constraint_map (3D voxel arrays)
    
    # Step 3: 组合为统一的价值地图
    value_map = affordance_map + constraint_map  # HxWxD 体素网格
    
    # Step 4: MPC 轨迹优化
    trajectory = []
    for t in range(T):
        # 从 value_map 中采样子目标
        subgoal = sample_from_value_map(value_map)
        # 使用规划器（如 MPPI）生成动作序列到达子目标
        actions = planner.plan(current_state, subgoal, dynamics_model)
        # 执行第一个动作
        next_state = env.step(actions[0])
        trajectory.append(actions[0])
        # 重规划
        current_state = next_state
    
    return trajectory
```

> 💡 **关键**：LLM 不直接输出机器人动作，而是生成 Python 代码来操纵 3D 体素地图。这种方式天然实现了语言知识到物理空间的锚定（grounding），避免了在文本空间直接输出高维控制信号的困难。

##### 3. 方法详解

**动机与背景**

传统机器人操作存在一个根本瓶颈：虽然 LLM 可以将高层语言指令分解为步骤序列，但将这些步骤转化为物理交互时，依然依赖预定义的运动原语（如"抓取"、"推动"等）。获取这些原语需要大量机器人数据采集或手工设计，难以扩展到开放集指令和开放集物体。VoxPoser 的核心洞察是：**LLM 虽然无法直接输出高维控制信号，但极其擅长推断场景中的可供性（affordance）和约束（constraint），并且可以通过编写代码来组合感知调用和数组操作**。

**核心机制：三步构建从语言到轨迹的桥梁**

1. **LLM 生成代码（Code Generation）**：给定自由形式语言指令（如"打开顶层抽屉，注意避开花瓶"），LLM 被提示推断：(i) 目标物体/部位在哪里（如抽屉把手），(ii) 应施加何种运动方向（如向外拉），(iii) 需要避开哪些区域（如花瓶周围）。然后 LLM 将这些推断转化为可执行的 Python 代码，代码中调用 VLM API（如 OWL-ViT 进行开放词汇检测、SAM 进行分割、CLIP 进行语义匹配）获取对象的空间几何掩码，并使用 NumPy 在 3D 体素网格上进行数组操作。

2. **组合 3D 价值地图（Composing 3D Value Maps）**：LLM 生成的代码执行后将产生多个 3D 体素地图——包括 affordance map（高价值区域，如把手附近 + 向外延伸的方向）和 constraint map（低价值/惩罚区域，如花瓶周围的高代价区）。这些地图被组合为统一的 3D 价值函数 V(x, y, z)，编码了"在哪里操作"和"如何操作"的密集空间先验。体素分辨率为 0.005m^3，场景范围约为 1m x 1m x 1m。

3. **模型预测控制（MPC）轨迹合成**：将组合后的 value map 作为优化目标，使用模型预测控制（具体采用 MPPI — Model Predictive Path Integral）在每一步：(i) 从 value map 的高价值区域采样子目标（subgoal），(ii) 使用零阶优化（zero-order optimization）在动力学模型上滚动采样动作序列，(iii) 以到达子目标且累积 value 最大化为准则选择最优动作。这个过程以约 5-10 Hz 的频率闭环运行，天然具有对动态扰动的鲁棒性。

> ⚠️ **注意**：value maps 表达了丰富的空间信息——不仅是"目标位置"，还包括运动方向（如向外拉抽屉的"向外"方向通过在目标位置外侧分配递增高价值来实现）、姿态约束（如保持杯子直立）、以及避障区域。这种密集的代价/奖励表示比离散的 skill 原语具有更强的泛化能力。

**训练/推理流程**

VoxPoser 本身不需要训练**任何**神经网络组件——LLM 和 VLM 都是冻结的预训练模型。整个流程是：
- **离线阶段**：无需任何准备。
- **在线推理**：（1）获取 RGB-D 观测 → （2）LLM 生成代码（单次调用，约 3-10 秒）→ （3）执行代码构建 value maps（调用 VLM，约 2-5 秒）→ （4）MPC 合成并执行轨迹（实时闭环，5-10 Hz）。
- **可选在线学习**：对于接触丰富的任务（如开弹簧门），VoxPoser 在执行过程中收集交互数据，在线微调一个轻量级动力学模型（4 层 MLP），以更好地预测接触力下的状态变化。

**与传统方法的区别**

| 维度 | 传统方法 | VoxPoser |
|------|---------|----------|
| 动作表示 | 预定义 motion primitives | 密集 6-DoF 轨迹（waypoints） |
| 知识来源 | 机器人数据/手工设计 | LLM 内化的世界知识 |
| 感知锚定 | 固定物体类别/位姿估计 | 开放词汇 VLM + 3D 体素操作 |
| 泛化能力 | 受限于训练数据 | 零样本泛化到新指令/新物体 |
| 闭环鲁棒性 | 依赖专门重规划模块 | MPC 框架天然支持 |

##### 4. 关键实验结果

![误差分析](https://ar5iv.org/html/2307.05973/assets/x4.png)
*图 4：各组件误差分解，LLM 推理错误是主要瓶颈。*

- **零样本性能**：在 130 条指令 × 80+ 物体的真实机器人评估中，VoxPoser 达到 **72%** 的整体成功率（Table 1），显著优于依赖预定义 skill 的基线方法。
- **仿真大规模评估**：在 RLBench 和 BEHAVIOR 基准上扩展测试，覆盖 50+ 任务（Table 2 & 3），验证了方法的可扩展性。
- **在线学习增益**：在接触丰富任务中，通过 10-20 次在线交互学习动力学模型，成功率从零样本的 ~40% 提升至 ~85%。
- **涌现能力**：LLM 赋予 VoxPoser 行为常识推理（如"轻轻放置易碎物品"）、细粒度纠错（如"再往左一点"）、多步骤视觉推理和物理属性估计等能力（Figure 5）。

![涌现行为](https://ar5iv.org/html/2307.05973/assets/x5.png)
*图 5：VoxPoser 的涌现行为能力示例，包括常识推理、视觉编程和多步骤规划。*

#### 🧪 练习题

```yaml
question: "VoxPoser 中 LLM 的核心作用是什么？"
options:
  - "直接输出机器人的关节角度控制命令"
  - "生成 Python 代码，调用 VLM 和数组操作来构建 3D 价值地图"
  - "替换视觉-语言模型进行物体检测"
  - "作为强化学习的奖励函数近似器"
answer: 1
explain: "LLM 不直接输出控制信号，而是利用其代码编写能力生成 Python 代码，通过调用 VLM API（如 OWL-ViT、SAM）获取空间信息，并用 NumPy 操作 3D 体素数组来构建价值地图，从而将语言知识锚定到物理空间。"
```