### IndoorUAV

```yaml
id: indooruav
name: IndoorUAV
full_name: 室内无人机导航 (IndoorUAV)
year: '2026'
org: ETH Zurich
paper_url: https://ojs.aaai.org/index.php/AAAI/article/view/39562
category: frontier_2026
parent: se_vln
motivation: 生成式世界模型支持UAV连续环境导航
```

#### 📝 一句话总结

IndoorUAV 提出首个大规模连续室内 UAV 视觉语言导航基准，并给出 IndoorUAV-Agent，通过长指令分解和 VLA 子策略执行，把室内三维飞行中的高层语言理解与低层四自由度飞行控制连接起来。

#### 🎯 核心要点

- 场景规模：从 Habitat 中整理 1,000+ 多样、结构丰富的 3D 室内场景
- 轨迹采集：模拟真实 UAV 飞行动力学，人工采集 3D 导航轨迹，并用轨迹反转、子轨迹重组扩增数据
- 双子集设计：IndoorUAV-VLN 面向长时程语言导航，IndoorUAV-VLA 面向 1-3 个动作的短时程细粒度控制
- 自动标注：基于关键帧选择、图像 caption 和 LLM prompt 自动生成不同粒度的自然语言指令
- 动作空间：覆盖水平平移、垂直移动和 yaw 旋转等 4-DoF UAV 操作
- IndoorUAV-Agent：用 GPT-4o 将长指令拆成短 VLA-style 子指令，再由基于 π0 的 VLA 模型顺序执行
- 评估重点：同时考察 SR、NDTW、轨迹终点距离与航向角误差，突出室内空中导航的三维空间控制难度

#### 🔬 深入细节

##### 基准示意图

![IndoorUAV 数据集示意](https://arxiv.org/html/2512.19024v1/x1.png)
*图：IndoorUAV-VLN 负责长时程复杂指令和长轨迹，IndoorUAV-VLA 负责由 1-3 个可执行动作组成的短时程精细飞行控制。*

##### 核心算法伪代码

```python
# IndoorUAV 数据构建与 Agent 执行伪代码
def build_indooruav_dataset(habitat_scenes):
    trajectories = []
    for scene in habitat_scenes:
        path = manually_collect_uav_trajectory(scene, dynamics="4DoF")
        trajectories.extend([path, reverse(path), recombine_subpaths(path)])

    vln_pairs = []
    vla_pairs = []
    for traj in trajectories:
        keyframes = select_semantic_keyframes(traj)
        captions = [caption_frame(f) for f in keyframes]
        vln_instruction = llm_generate_long_instruction(captions, traj.actions)
        vln_pairs.append((vln_instruction, traj))

        for subtraj in split_by_keyframes(traj):
            vla_instruction = llm_generate_short_instruction(subtraj)
            vla_pairs.append((vla_instruction, subtraj.actions))
    return vln_pairs, vla_pairs

def indooruav_agent(long_instruction, observations):
    subtasks = gpt4o_decompose(long_instruction)
    for sub_instruction in subtasks:
        action_chunk = pi0_vla_policy(observations.current(), sub_instruction)
        execute_uav_actions(action_chunk)
```

##### 方法解释

传统 VLN 基准大多面向地面机器人，动作空间通常是前进、左转、右转或在离散导航点之间移动；已有 UAV-VLN 又多集中于户外稀疏环境。室内 UAV 导航更难：空间拥挤、障碍密集、走廊狭窄、视角可上下移动，而且需要在连续 3D 空间里同时控制位置和航向。

IndoorUAV 的数据构建从 Habitat 模拟器中筛选 1,000+ 室内场景，按 UAV 飞行动力学采集轨迹。每个状态可表示为：

$$
s_t = (x_t, y_t, z_t, \theta_t)
$$

其中 \((x,y,z)\) 是三维位置，\(\theta\) 是 yaw 角。VLA 模型要预测未来一小段状态或动作：

$$
S_{t+1:t+h+1} = \mathrm{Model}_{VLA}(O_1, O_t, I, s_t)
$$

这比地面 VLN 多了高度维度与旋转对齐问题，因此论文在 VLA 评估中不仅计算 3D 坐标 NDTW，也额外考虑 yaw angle 的对齐。

数据集被拆成两个互补部分。IndoorUAV-VLN 包含 16,000+ 高质量 instruction-trajectory pairs，主要测试长指令理解和长时程导航；IndoorUAV-VLA 包含 34,925 个短轨迹样本，每条指令通常只对应 1-3 个动作，主要测试局部低层飞行控制。

> 💡 关键：IndoorUAV 同时覆盖“听懂长指令并规划路线”和“按短指令精确飞行动作”两个层级，避免只评估语言理解或只评估低层控制。

IndoorUAV-Agent 采用层次化方案：先用 GPT-4o 将长时程指令分解成一组短 VLA-style 指令，再让基于 π0 的 VLA 模型逐段执行。这与直接把长指令喂给低层策略相比更稳定，因为低层模型只需处理短时程目标，例如上升、穿过门口、转向某个方向。

实验显示，当前通用 VLA/VLN 模型在该基准上仍有明显性能缺口。NaVid 等模型可能有较高 OSR 但 SR 很低，说明它们路径局部接近目标却不擅长 Stop；OpenVLA 等离散动作模型也难以直接覆盖室内 UAV 的连续三维控制。

#### 🧪 练习题

```yaml
question: "IndoorUAV 为什么同时设计 IndoorUAV-VLN 和 IndoorUAV-VLA 两个子集？"
options:
  - "分别评估长时程语言导航和短时程细粒度 UAV 动作控制"
  - "一个用于训练文本分类器，一个用于训练图像分类器"
  - "只为了把数据集数量翻倍"
  - "VLN 子集用于室外，VLA 子集用于室内"
answer: 0
explain: "IndoorUAV-VLN 关注复杂长指令和长轨迹，IndoorUAV-VLA 关注 1-3 个动作的局部飞行控制，两者对应 UAV 导航的高层规划和低层执行。"
```
