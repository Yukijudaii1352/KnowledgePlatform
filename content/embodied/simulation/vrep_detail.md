### CoppeliaSim

```yaml
id: vrep
name: "CoppeliaSim"
full_name: "CoppeliaSim仿真平台 (CoppeliaSim)"
year: "2013"
org: "Coppelia"
paper_url: "https://www.coppeliarobotics.com/"
category: "foundation"
parent: "—"
motivation: "分布式控制架构，支持多种物理引擎集成"
```

#### 📝 一句话总结

CoppeliaSim/V-REP 提出了以场景对象、嵌入式脚本、插件和远程 API 组合的通用机器人仿真框架，用分布式控制架构解决复杂机器人系统难以在单一控制循环中建模、调试和复用的问题。

#### 🎯 核心要点

- **分布式控制模型**：每个模型、对象或子系统可拥有自己的 child script、插件或远程控制进程，支持异步协同
- **多物理引擎后端**：支持将动力学求解交给不同物理引擎，便于在速度、稳定性和接触效果之间取舍
- **场景对象层级**：把机器人、传感器、碰撞体、路径、脚本和 UI 统一组织在可编辑场景树中
- **多接口集成**：内置 Lua 脚本、C/C++ 插件、remote API、ROS/ROS2 接口，适合教学、原型和机器人学习
- **模型部署便利性**：论文强调减少仿真模型部署复杂度，让用户能直接加载机器人模型并组合控制策略
- **依据限制**：清单中的 `paper_url` 是项目主页而非论文页，本文依据官方主页与 2013 IROS 论文 “V-REP: A Versatile and Scalable Robot Simulation Framework” 解读

#### 🔬 深入细节

![CoppeliaSim 官方框架示意](https://www.coppeliarobotics.com/assets/img/illustrations/hero.svg)
*图：CoppeliaSim 官方主页的仿真平台示意。论文原图多在 PDF 中，未提供稳定图片直链；这里用官方公开图表示其“场景 + 机器人 + 外部控制程序”式工作流。*

```python
# CoppeliaSim/V-REP 分布式控制伪代码
scene = load_scene("factory_or_home.ttt")
physics_backend = choose_engine(["Bullet", "ODE", "Vortex", "Newton"])

while simulation_running:
    for script in scene.child_scripts:
        script.sysCall_actuation()          # 每个对象/模型可有局部控制逻辑

    for plugin in loaded_plugins:
        plugin.handle_callbacks(scene)

    remote_commands = remote_api.poll()     # Python/C++/ROS 外部控制器
    apply_commands(scene, remote_commands)

    physics_backend.step(scene.dynamic_objects, dt)
    update_sensors(scene.vision_sensors, scene.proximity_sensors)

    for script in scene.child_scripts:
        script.sysCall_sensing()

    remote_api.publish(scene.state, sensor_packets)
```

**动机与背景：复杂机器人系统不是单控制器问题**

许多机器人仿真平台把控制逻辑集中在一个主程序里，这对简单移动机器人足够，但对含机械臂、移动底盘、传感器阵列、输送线、多个协作机器人和外部算法的系统就会变得笨重。V-REP 的论文动机是提供一个“通用、可扩展、可移植”的框架，让不同控制技术可以直接嵌入同一场景：有些逻辑写在模型内部脚本里，有些由插件处理，有些通过网络 API 从外部程序控制。

**核心机制：场景树与脚本生命周期**

CoppeliaSim 的场景树类似机器人系统的运行时对象图。每个 object 不只是几何体，也可以携带传感器、碰撞属性、动力学属性和脚本。脚本按仿真生命周期被调用，例如初始化、actuation、sensing 和清理阶段。这个设计让一个夹爪模型可以自带闭合控制逻辑，一个移动底盘可以自带里程计发布逻辑，一个外部强化学习程序只负责更高层动作。

可以把一次仿真步抽象为：

$$
x_{t+1} = F_{\text{engine}}\left(x_t,\; u_t^{\text{script}},\; u_t^{\text{plugin}},\; u_t^{\text{remote}}\right)
$$

其中 \(x_t\) 是场景状态，控制输入来自嵌入脚本、插件和远程 API。CoppeliaSim 的关键不是指定唯一的 \(F\)，而是允许用户在不同物理引擎和不同控制来源之间组合。

**训练/推理流程：机器人学习中的典型用法**

在机器人学习中，研究者通常把场景建成 `.ttt` 或模型文件，启动 CoppeliaSim 后由 Python 远程 API 或 PyRep 连接仿真。RL loop 在外部执行：读取相机、深度、关节状态和物体位姿，输出夹爪、机械臂或移动底盘动作；CoppeliaSim 则负责碰撞、传感器渲染和动力学推进。与 Gazebo/ROS 更偏机器人中间件集成不同，CoppeliaSim 的优势在于 GUI 场景编辑、脚本化模型封装和多控制入口。

**与传统仿真框架的区别**

CoppeliaSim/V-REP 的创新点在于“分布式控制架构”。在传统仿真器中，模型多半是被动资产，控制器在外部统一调用；在 V-REP 中，模型可以携带自己的脚本和行为，仿真世界更像由多个可编程实体构成的系统。这样做的代价是调试时需要理解不同脚本和插件的调用顺序，但收益是模型复用和系统集成更自然。

> 💡 关键：CoppeliaSim 的价值不只在物理引擎，而在把场景编辑、脚本生命周期、多后端动力学和远程控制接口组织成一个可组合的机器人实验平台。

#### 🧪 练习题

```yaml
question: "CoppeliaSim/V-REP 论文中最有辨识度的系统设计是什么？"
options:
  - "只允许所有机器人共用一个集中式控制脚本"
  - "通过 child script、插件和远程 API 形成分布式控制架构"
  - "完全不支持物理引擎"
  - "只能运行二维导航场景"
answer: 1
explain: "V-REP 的核心是将控制逻辑分散到对象脚本、插件和外部 API 中，从而支持复杂机器人系统的组合与复用。"
```
