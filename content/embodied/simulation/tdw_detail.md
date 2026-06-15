### ThreeDWorld — 三维世界多模态平台 (ThreeDWorld)

```yaml
id: tdw
name: ThreeDWorld
full_name: 三维世界多模态平台 (ThreeDWorld)
year: "2021"
org: MIT-IBM
paper_url: https://arxiv.org/abs/2007.04954
category: interactive
parent: "—"
motivation: 多模态平台，支持视觉与物理音频同步模拟
```

#### 📝 一句话总结
ThreeDWorld 是一个基于 Unity 的多模态交互仿真平台，把高质量视觉渲染、物理、音频、机器人/虚拟体控制和程序化场景生成统一到可脚本化的实验环境中。

#### 🎯 核心要点
- **多模态目标**：TDW 不只追求视觉逼真，还把物理接触声、布料/液体/软体等动态效果纳入仿真。
- **系统结构**：Python Controller 向 Unity Build 发送命令，Build 负责渲染、物理和传感器输出，二者形成外部可控的闭环。
- **资产与场景**：平台提供室内外环境、物体库、程序化摆放和可定制 agent，适合构造受控感知实验。
- **研究用途**：可服务于视觉推理、物理预测、因果交互、多智能体、VR 和机器人学习等任务。

#### 🔬 深入细节

##### 核心示意图
![ThreeDWorld multimodal simulation](https://ar5iv.labs.arxiv.org/html/2007.04954/assets/figure/teaser.png)

*图示概括 TDW 的多模态能力：室内外渲染、机器人交互、多智能体场景、VR、布料物理和碰撞音频。*

##### 算法伪代码
```python
def run_tdw_experiment(controller, scene_spec, agent_policy):
    controller.launch_unity_build()
    controller.send_commands(create_scene(scene_spec))
    controller.send_commands(load_assets(scene_spec.objects))

    while not controller.terminated():
        obs = controller.receive_output_data(
            modalities=["rgb", "depth", "segmentation", "audio", "physics"]
        )
        commands = agent_policy(obs)
        controller.send_commands(commands)

    return controller.collect_logs()
```

##### 背景与动机
许多 embodied AI 仿真器在设计上偏向单一任务：导航基准强调相机和几何，机器人平台强调接触和关节控制，视觉合成平台强调图像质量。TDW 的出发点是把这些需求统一起来，尤其强调人类感知和认知研究常常需要跨模态同步刺激：看到一个物体掉落，同时听到它撞击桌面的声音，并观察其后续物理运动。

平台的核心抽象可以理解为：

$$
o_t = R_{\theta}(s_t), \quad s_{t+1}=P(s_t, a_t)
$$

其中 \(s_t\) 是 Unity 中的世界状态，\(P\) 是物理更新，\(R_{\theta}\) 则根据相机、麦克风和传感器配置输出 RGB、深度、分割、音频或物理元数据。TDW 的价值在于 \(R_{\theta}\) 不是一个单一图像渲染器，而是一组同步传感器。

##### 系统机制
TDW 使用外部 Python Controller 控制 Unity Build。Controller 发送 JSON 风格命令，例如创建场景、加载物体、设置材质、施加力、移动 agent 或调整传感器；Build 执行命令后返回图像、物理状态、音频和对象元数据。这个架构让实验脚本可以像普通 Python 程序一样批量生成数据，同时保留游戏引擎级别的交互能力。

物理层面，TDW 结合刚体物理、布料、软体、液体和碰撞音频。对 embodied AI 来说，这意味着任务不再局限于“识别静态图像中的物体”，而可以研究动作带来的可观察变化。例如同一个杯子被推倒、碰撞、滚动、发声，会在多个模态中留下同步证据。

##### 与机器人仿真的关系
TDW 本身不是专门的机械臂基准，但它提供 agent、场景和物体控制能力，适合研究从感知到交互的中间问题。相比 MuJoCo 风格平台，它的优势在于丰富视觉和音频；相比纯视觉合成数据集，它的优势在于场景可以被动作改变。TDW 因而更像一个实验室级“世界生成器”，用于构造可重复、可干预、可多模态观察的 embodied AI 实验。

如果把一个实验看作命令序列 \(C=\{c_1,\ldots,c_T\}\) 和观测序列 \(O=\{o_1,\ldots,o_T\}\)，TDW 的设计目标就是让研究者能够精确控制 \(C\)，并在每一步获得同步、结构化的 \(O\)。这对分析模型是否真正理解物理因果关系尤其有用。
