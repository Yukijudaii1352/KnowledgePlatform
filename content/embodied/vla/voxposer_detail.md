### VoxPoser

```yaml
id: voxposer
name: VoxPoser
full_name: 体素价值图组合器 (VoxPoser)
year: '2023.07'
org: Stanford
paper_url: https://arxiv.org/abs/2307.05973
category: spatial_3d
parent: cliport
motivation: LLM生成3D体素价值图零样本操纵
```

#### 📝 一句话总结
VoxPoser 把开放指令理解转化成在 3D 体素空间里合成价值图的问题，由 LLM 生成代码调用视觉 API 构造可供性图和约束图，再用 MPC 在这些值图上做闭环规划，实现真实机器人零样本操纵。

#### 🎯 核心要点
- 提出 **VoxPoser**：用 3D voxel value map 作为语言、视觉和运动规划之间的统一中间表示
- 感知层使用 **OWL-ViT + SAM + XMem + RGB-D 重建**，得到开放词汇 3D 场景表征
- LLM 不直接输出动作，而是输出操作 API 的代码来合成 **affordance map** 和 **constraint map**
- 最终任务值图由多张局部值图组合而成，供 **MPC / random shooting** 规划器优化
- 通过 **perturbation voxels** 在障碍物边界附近注入惩罚，提升避碰稳定性
- 在真实机器人上展示了未见物体、未见指令和不同场景配置下的零样本泛化

#### 🔬 深入细节
##### 核心方法图

![VoxPoser 方法图](https://voxposer.github.io/media/figures/method.jpg)
*图：VoxPoser 的三阶段流程。先把真实场景重建成 3D 体素网格，再由 LLM 生成程序组合体素值图，最后用 MPC 在值图上搜索末端执行器轨迹。*

##### 核心伪代码

```python
# VoxPoser: language -> code -> voxel value maps -> MPC

scene = build_voxel_scene(rgbd_frames, detector="OWL-ViT", segmenter="SAM")
objects = track_masks(scene, tracker="XMem")

program = llm_generate_code(instruction, api_docs=voxel_api_reference)

affordance_map = zeros(scene.shape)
constraint_map = zeros(scene.shape)
exec(program, {
    "scene": scene,
    "objects": objects,
    "affordance_map": affordance_map,
    "constraint_map": constraint_map,
})

task_map = combine_maps(affordance_map, constraint_map, perturbation_voxels=True)
trajectory = mpc_random_shooting(task_map, horizon=H, replanning_hz=5)
execute_ee_trajectory(trajectory)
```

##### 动机：为什么 LLM 不应该直接输出机器人动作

VoxPoser 面对的是开放世界零样本操纵。用户给出的指令可能是 “put the apple on the plate”, “open the drawer and place the sponge inside”, 也可能是涉及接近、避障、支撑和相对方位的组合命令。LLM 对这些语言关系有很强的先验，但它本身并不适合直接产出连续机械臂轨迹。

论文因此插入了一个非常巧妙的中间层：**3D 体素价值图**。LLM 的任务不再是“给出动作”，而是“写程序描述哪里值得去、哪里必须避开”。这样，语言推理和机器人控制被自然解耦。LLM 负责语义组合和空间关系抽象，传统规划器负责连续轨迹搜索和闭环执行。

这使系统既保留了大模型的开放词汇泛化，又没有把低层控制外包给一个并不擅长动力学约束的语言模型。

##### 核心机制一：affordance map 和 constraint map

VoxPoser 使用一组预定义 API 让 LLM 在 3D 体素网格上“编程”。对某个任务，LLM 生成的代码通常会产出两类图：

- **affordance map**：哪些空间区域值得末端执行器去
- **constraint map**：哪些区域危险、不可达或违反任务约束

最终任务值图可以理解为它们的加权组合：

$$
F_{\text{task}} = w_a F_{\text{affordance}} + w_c F_{\text{constraint}}
$$

比如执行 “从上方抓住杯子” 时，affordance map 会把杯口上方一小片空间设成高值；执行 “不要碰到桌面” 时，constraint map 会对桌面附近体素赋予负值。LLM 的优势在于它能根据语言组合这些规则，而不需要每种指令都单独训练一个策略。

##### 核心机制二：闭环 MPC 在值图上优化轨迹

任务值图一旦构造出来，后续控制就回到了经典规划问题。给定未来 \(H\) 步的末端轨迹 \(\{\mathbf{p}_j^e\}_{j=1}^{H}\)，系统希望最大化轨迹经过高值区域、避开低值区域，可写成：

$$
\max_{\mathbf{p}_1^e,\dots,\mathbf{p}_H^e}
\sum_{j=1}^{H} F_{\text{task}}(\mathbf{p}_j^e)
$$

实现上，论文采用 random shooting MPC：采样多条候选轨迹，计算它们在体素值图上的累积得分，执行当前最优轨迹的首步，然后重新观测并重规划。系统以约 \(5\text{Hz}\) 做闭环更新，因此即便目标物发生轻微移动、遮挡变化或局部识别误差，规划仍能在线纠正。

##### 核心机制三：perturbation voxels 为什么有效

如果只用硬边界约束，MPC 很容易在障碍物边缘“擦边飞行”，导致真实执行时因为噪声而碰撞。VoxPoser 的做法是在约束边界附近额外布置 **perturbation voxels**，等价于人为扩厚危险区域，给规划器一个更平滑也更保守的代价地形。

这看上去是个工程细节，但它直接决定了零样本系统能不能在真机上稳定工作。因为在没有专门为某台机器人学过碰撞恢复策略的前提下，更稳的代价景观往往比更激进的最优路径重要得多。

> 💡 关键：VoxPoser 真正统一的不是控制网络，而是“任务价值表示”。LLM、VLM 和 MPC 都围绕这张值图协作。

##### 结果怎么看：它证明了代码生成和几何规划可以自然结合

VoxPoser 与很多端到端 VLA 的不同点在于，它没有试图把所有能力都压进一个神经网络，而是把语言推理、场景理解和轨迹优化用一个几何中间表示连接起来。对开放世界零样本操作来说，这条路线非常强，因为它允许系统直接继承成熟的视觉工具、成熟的规划器和成熟的语言模型，各自发挥所长。

#### 🧪 练习题

```yaml
question: "VoxPoser 中 LLM 的直接输出为什么不是机器人动作，而是体素图操作程序？"
options:
  - "因为真实机器人不能执行连续控制"
  - "因为程序化生成 3D affordance/constraint maps 更适合把语言关系交给规划器落到几何空间"
  - "因为 LLM 无法处理任何自然语言指令"
  - "因为 MPC 只能接受文本输入"
answer: 1
explain: "VoxPoser 让 LLM 负责语义和空间关系组合，把结果写成体素值图，再由 MPC 处理连续轨迹优化。这比让 LLM 直接输出低层控制更稳，也更容易零样本泛化。"
```
