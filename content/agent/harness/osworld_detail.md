### OSWorld: 真实操作系统环境 (OSWorld)

```yaml
id: osworld
name: OSWorld
full_name: 真实操作系统环境 (OSWorld)
year: '2024.04'
org: HKU/CMU
paper_url: https://arxiv.org/abs/2404.07972
category: environment
parent: webarena
motivation: 把浏览器任务扩展到真实操作系统
```

#### 📝 一句话总结
OSWorld 是首个面向多模态智能体的**真实操作系统benchmark**，在 Ubuntu/Windows/macOS 三种OS上提供369个开放任务，通过**执行结果评估**（execution-based eval）暴露了当前最佳模型仅12.24%成功率（人类72.36%）的巨大差距，核心瓶颈在于**GUI视觉grounding**和**操作知识（operational knowledge）**。

#### 🎯 核心要点
1. **首创真实OS交互benchmark**: 突破此前WebArena等受限环境的局限，直接在虚拟机中操作真实Ubuntu、Windows、macOS系统
2. **369个真实任务**: 涵盖办公、图像处理、文件管理、系统配置、编程、网络操作等多样场景
3. **Execution-based评估**: 不再依赖答案匹配，而是在虚拟机快照中执行验证脚本检查任务完成状态（如文件是否存在、窗口是否正确弹出）
4. **惊人的模型-人类差距**: GPT-4V仅12.24% vs 人类72.36%，视觉grounding和operational knowledge是主要瓶颈
5. **跨OS泛化挑战**: 同一任务在不同OS上的差异化UI要求模型具备真正的通用理解能力，而非模板化操作
6. **开源生态**: 提供完整VM镜像、任务定义、评估脚本和基线代码

#### 🔬 深入细节
![OSWorld 示意图](https://ar5iv.labs.arxiv.org/html/2404.07972/assets/x1.png)
*图：OSWorld 的核心框架或评测示意。*

##### 1. Benchmark 设计空间

OSWorld 将真实OS操作建模为**开放式的多模态交互任务**：

| 维度 | 设计选择 | 意义 |
|------|----------|------|
| **环境** | Ubuntu 22.04, Windows 11, macOS 14 虚拟机 | 首次覆盖三大主流OS，逼真度远超网页/模拟器 |
| **交互方式** | 截图+鼠标键盘动作，支持坐标点击、拖拽、文本输入、快捷键、滚动等 | 模拟真实用户操作，考验agent的视觉理解和动作规划 |
| **任务来源** | 从用户手册、在线教程、日常办公场景中挖掘 | 保证生态效度 |
| **评估方式** | VM快照+确定性验证脚本（bash/powershell/python） | 客观、可复现、无需人工评判 |
| **初始化** | 每个任务从已知的VM快照启动，保证公平比较 | 消除初始状态差异 |

##### 2. 任务分布

```
369 tasks 分类：
├── OS基础操作（文件管理/系统设置/终端）    ~30%
├── 办公软件（LibreOffice/Word/Excel/PPT）  ~25%
├── 图像/视频处理（GIMP/画图/剪辑）         ~15%
├── Web浏览器（Chrome/Firefox/Safari）      ~15%
├── 编程/IDE（VSCode/Xcode/终端）           ~10%
└── 其他（邮件/日历/系统工具）              ~5%
```

##### 3. 评估协议详解

OSWorld 的 execution-based 评估流程：

```
Start → 加载任务 → 读取task_config（指令+初始VM快照+评估脚本路径）
  → Agent迭代循环（max 15 steps per task）：
      1. 获取当前截图
      2. 产生动作（点击坐标/输入文本/快捷键/函数调用）
      3. 在VM中执行动作，等待UI更新
      4. 返回新截图
  → 15步后终止（或agent主动结束）
  → 回滚VM到快照 → 执行评估脚本 → 输出0/1
```

**动作空间**:
```python
# OSWorld 支持的动作类型
Action = Union[
    ClickAction(x=int, y=int, button="left"|"right"|"middle"),
    TypeAction(text=str),                    # 键盘输入
    KeyPressAction(keys=List[str]),           # 组合键如["ctrl","c"]
    ScrollAction(dx=int, dy=int),            # 滚轮
    DragAction(start_x, start_y, end_x, end_y),
    WaitAction(seconds=float),               # 等待UI更新
    FunctionCallAction(name, args),          # 调用预定义工具函数
    TerminateAction()                        # 主动结束任务
]
```

##### 4. 核心实验结果

| Agent | 总成功率 | Ubuntu | Windows | macOS |
|-------|---------|--------|---------|-------|
| **Random** | ~0% | - | - | - |
| **GPT-4V (zero-shot)** | 12.24% | 15.1% | 9.8% | 11.7% |
| **Gemini-Pro-Vision** | 8.67% | - | - | - |
| **Claude-3-Opus** | 11.11% | - | - | - |
| **GPT-4V + RCI (self-refine)** | 13.82% | - | - | - |
| **GPT-4V + GT grounding** | 34.15% | - | - | - |
| **Human (crowdworkers)** | **72.36%** | 81.0% | 67.3% | 67.9% |

**关键发现**:
- **视觉grounding是最大瓶颈**: 如果给模型ground-truth坐标（GT grounding），性能提升2.8倍(12.24%→34.15%)
- **操作知识同样致命**: 即使知道点哪里，模型仍因缺乏领域操作知识（如GIMP具体工具用法、系统设置嵌套路径）而频繁失败
- **跨OS差距显著**: Ubuntu任务成功率高于Windows/macOS，可能与训练数据分布和Ubuntu UI更规则有关

##### 5. 主要失败模式分析

```
失败分布（基于GPT-4V 200+ case分析）：
├── 视觉grounding错误              ~38%
│   ├── 未能找到目标UI元素
│   ├── 坐标偏移（点击到相邻元素）
│   └── 对UI状态误判（如认为按钮可点击）
├── 操作知识缺失                  ~32%
│   ├── 不知道特定软件的操作流程
│   ├── 错误的功能调用
│   └── 缺乏跨步骤的依赖推理
├── 规划/推理失败                  ~18%
│   ├── 子目标分解错误
│   └── 遗漏关键步骤
├── 动作格式/语法错误              ~8%
└── 其他（超时/意外弹窗等）         ~4%
```

##### 6. Agent 架构范式对比

OSWorld 测试了三种范式：

| 范式 | 代表方法 | 做法 | 效果 |
|------|----------|------|------|
| **Direct prompting** | GPT-4V vanilla | 截图+任务描述→直接输出动作 | 基线12.24% |
| **Self-refine** | RCI (Retry-Critique-Improve) | agent失败后自我审视并修正 | +1.6%（有限改进） |
| **Grounded prompting** | Set-of-Marks (SoM) + 标注截图 | 预标注UI元素ID，agent引用ID | +12%（需grounding模型） |

##### 7. 与相邻Benchmark的关系

```
WebArena (2023) ──→ OSWorld (2024)
  Web环境             真实OS环境
  HTML DOM访问         纯视觉（截图）
  812 tasks            369 tasks
  答案匹配评估          执行结果评估
  4类网站              Ubuntu/Windows/macOS

VisualWebArena ─―→ OSWorld-Web子集 (Chrome/Firefox任务)
  Web视觉agent          OS内嵌浏览器agent
  仅网页                OS原生浏览器

WindowsAgentArena ─→ OSWorld-Windows子集
  仅Windows            Windows+Ubuntu+macOS
  特定UWP应用           更广泛的桌面应用
```

**核心差异**: OSWorld 是第一个在**真实VM环境**中进行**execution-based评估**的**多OS** benchmark，填补了从简化模拟器到真实OS的鸿沟。

##### 8. 实践建议（给agent开发者）

1. **视觉grounding先行**: 在接入OSWorld前，确保agent在ScreenSpot/GUI grounding子任务上有足够能力
2. **操作知识注入**: 为特定软件（GIMP/LibreOffice/系统设置）提供检索增强的文档知识库至关重要
3. **错误恢复机制**: 15步限制下，agent需要能在第3-5步发现错误时回退和重规划
4. **多OS适配**: 必须建立OS-aware的prompt策略，如Windows的任务栏在底部、macOS的菜单栏在顶部
5. **评估脚本即spec**: tasks/<id>/evaluate.py 本身就是最佳的任务理解素材

##### 9. 技术栈与可复现性

- **VM管理**: QEMU/KVM (Ubuntu), VMware/Parallels (Windows/macOS)
- **Agent-VM通信**: 自定义gRPC服务，截图通过VNC/Spice获取
- **动作注入**: 对于Ubuntu用xdotool/evemu, Windows用WinAppDriver, macOS用CGEvents/AppKit
- **完整开源**: GitHub仓库包含所有VM镜像下载、任务JSON、评估脚本、基线agent代码

> **📖 一句话推荐**: 如果你只做GUI agent，读这篇就够了——它用369个真实任务和execution-based eval告诉你：视觉grounding和操作知识是AGI在桌面任务上的最后两道墙。

> **🔗 资源链接**: [Paper](https://arxiv.org/abs/2404.07972) | [Code](https://github.com/xlang-ai/OSWorld) | [Leaderboard](https://os-world.github.io)

#### 🧪 练习题
```yaml
question: "OSWorld 论文中，给模型提供 ground-truth 坐标后成功率大幅提升，最直接说明了什么？"
options:
  - "主要瓶颈在评估脚本错误，而不是 agent 本身"
  - "主要瓶颈之一是 GUI 视觉 grounding，而不是纯粹的高层任务理解"
  - "说明 execution-based evaluation 低估了真实能力"
  - "说明多操作系统环境并不会增加任务难度"
answer: 1
explain: "论文报告 GT grounding 会把成功率从约 12% 提升到约 34%，这直接表明大量失败来自看不准、点不准界面元素，而不是只是不知道目标是什么。"
```
