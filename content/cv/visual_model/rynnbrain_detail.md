### RynnBrain: 开源具身感知基础模型

```yaml
metadata:
  id: rynnbrain
  name: RynnBrain
  full_name: "RynnBrain: An Open-Source Embodied Foundation Model"
  year: 2026.02
  organization: 多机构联合(SenseNova, SenseTime等)
  paper_url: https://arxiv.org/abs/2602.14979
  category: multimodal
  parent: qwen3-vl
  motivation: 构建开源的具身感知基础模型，统一认知、定位与规划能力
```

---

## 📝 一句话总结

RynnBrain基于Qwen3-VL构建decoder-only VLM架构，通过19.89M多维度预训练数据（认知+定位+规划）和GRPO强化学习，实现了开源具身基础模型在感知-定位-规划全链路上的SOTA性能，并衍生出Nav/Plan/VLA/CoP四个后训练变体。

---

## 🎯 核心要点

- **架构选择**: 基于Qwen3-VL的decoder-only VLM，3个规模（2B/8B/30B-A3B MoE），统一图像和视频为帧序列输入
- **统一空间表示**: 所有空间输出（bbox/点/轨迹）统一为离散坐标token `[0, 1000]`，通过next-token prediction训练
- **多维度预训练数据**: 19.89M样本覆盖General MLLM(4.8M)、认知(7.67M)、定位(7.26M)、规划(0.16M)四大类
- **Chain-of-Perception (CoP)**: 创新的视觉推理链，在文本推理中交织空间定位标注 `<object/area> <frame n>: (coords) </object/area>`
- **GRPO强化学习**: 使用规则奖励（Fréchet距离/Chamfer距离/多边形内点率）对30K难度筛选样本进行RL训练
- **4个后训练变体**: RynnBrain-Nav（VLN导航）、RynnBrain-Plan（操作规划）、RynnBrain-VLA（流匹配动作生成）、RynnBrain-CoP（视觉推理链）
- **实验结果**: 2B模型在具身认知/定位任务上超越7-8B竞品（如MiMo-7B、RoboBrain-7B），同时保持通用视觉理解能力

---

## 🔬 深入细节

### 1. 整体架构

```
┌─────────────────────────────────────────────────────────┐
│                    RynnBrain 架构                         │
├─────────────────────────────────────────────────────────┤
│                                                          │
│  输入: 视频帧序列 V = {I_t}_{t=1}^T + 文本指令 Q        │
│                                                          │
│  ┌──────────┐    ┌──────────────┐    ┌───────────────┐  │
│  │ Vision   │───▶│  Projector   │───▶│  LLM Decoder  │  │
│  │ Encoder  │    │  (Linear)    │    │  (Qwen3-VL)   │  │
│  │ (ViT)    │    └──────────────┘    └───────┬───────┘  │
│  └──────────┘                                │          │
│                                              ▼          │
│                              ┌────────────────────────┐  │
│                              │ 统一输出 (next-token)  │  │
│                              │ - 文本回答             │  │
│                              │ - 坐标 [0,1000]       │  │
│                              │ - 帧索引 <frame n>    │  │
│                              └────────────────────────┘  │
│                                                          │
│  空间输出格式:                                           │
│  <object> <frame 3>: (x0,y0),(x1,y1) </object>         │
│  <area> <frame 5>: (x1,y1),(x2,y2),...,(xn,yn) </area> │
└─────────────────────────────────────────────────────────┘
```

**关键设计决策**:
- 所有空间坐标归一化到 `[0, 1000]` 整数范围，作为离散token直接由LLM生成
- 图像视为单帧视频，统一处理流程
- 帧索引通过 `<frame n>` 标记实现时间定位

### 2. 预训练数据管道

| 类别 | 子任务 | 样本量 |
|------|--------|--------|
| General MLLM | 通用图像/视频理解 | 4.80M |
| 认知-物体理解 | 属性/类别/功能 | 1.10M |
| 认知-空间理解 | 3D空间关系 | 2.50M |
| 认知-计数 | 物体数量估计 | 0.30M |
| 认知-OCR | 场景文字识别 | 1.00M |
| 认知-自我中心任务 | 任务理解 | 2.77M |
| 定位-物体 | bbox定位 | 1.20M |
| 定位-区域 | 点集区域标注 | 3.37M |
| 定位-Affordance | 交互热点 | 1.13M |
| 定位-轨迹 | 2D操作轨迹(≤10点) | 0.56M |
| 定位-抓取姿态 | 4点旋转矩形 | 1.00M |
| 规划-操作 | 多步操作规划 | 0.16M |
| **总计** | | **19.89M** |

### 3. Chain-of-Perception (CoP) 训练流程

```
输入: 自我中心视频 + 复杂空间推理问题

Step 1: GPT生成推理链，标记实体 [white flower-patterned wallpaper]
         ↓
Step 2: 分类器判断实体类型 → "area" 或 "object"
         ↓
Step 3: 人工标注
        - area → 选关键帧 + 标注代表性点集
        - object → 选关键帧 + 标注2D bbox
         ↓
Step 4: 回填到推理文本中:
        "...走向<object> <frame 3>: (234,567),(789,890) </object>旁边的
         <area> <frame 5>: (100,200),(150,250),(120,300) </area>..."
```

**CoP的核心价值**: 将抽象推理锚定到具体视觉证据，减少幻觉，实现可解释的具身推理。

### 4. GRPO强化学习

```python
# 伪代码: GRPO训练流程
def grpo_train(model, dataset, G=5, epochs=10):
    """
    G: 每个query采样的输出组大小
    奖励函数: 规则化(非学习型)
    """
    for epoch in range(epochs):
        for query in dataset:  # 30K难度筛选样本
            # 采样G个输出
            outputs = [model.generate(query) for _ in range(G)]
            
            # 计算任务特定奖励
            rewards = [compute_reward(o, query.gt) for o in outputs]
            
            # 组内归一化优势
            mean_r, std_r = mean(rewards), std(rewards)
            advantages = [(r - mean_r) / (std_r + eps) for r in rewards]
            
            # PPO-clip更新 + KL惩罚(β=0.02)
            update_policy(model, outputs, advantages, clip=[0.2, 0.28])

def compute_reward(output, ground_truth, task_type):
    if task_type == "trajectory":
        # Discrete Fréchet Distance
        return exp(-λ * frechet_distance(output, ground_truth))
    elif task_type == "affordance":
        # Bidirectional Chamfer Distance
        return exp(-λ * chamfer_distance(output, ground_truth))
    elif task_type == "area":
        # 多边形内点比例
        return mean([point_in_polygon(p, ground_truth) for p in output])
```

**训练配置**: lr=2e-6, cosine schedule, 3% warmup, max_seq=16384 tokens, batch=128

### 5. 后训练变体

#### RynnBrain-Nav (视觉语言导航)
- 输入: 全景观察 + 导航指令 + 历史轨迹
- 输出: 下一步动作（选择可导航视点）
- 训练: 在VLN数据上微调，2 FPS采样(最多2048帧)

#### RynnBrain-Plan (操作规划)
- 多轮对话格式，历史作为显式记忆缓冲
- 仅标注最后一帧的grounding（当前决策基于即时观察+累积记忆）
- **极高数据效率**: 仅需数百样本即可获得长时序规划能力

#### RynnBrain-VLA (视觉-语言-动作)
- 基于RynnBrain-2B + Flow Matching框架
- VLM作为单流DiT，输入打包序列(条件+噪声动作)
- 3个线性投影对齐维度（噪声输入/时间步嵌入/动作输出）
- 训练: 6个pick-and-place任务，60K步，lr=2e-5, batch=32

```
VLA输入格式:
<|im_start|>user
INSTRUCTION: <start_frame>
Pick the <affordance> (x,y) </affordance> of the 
<object> (x0,y0),(x1,y1) </object>
OBSERVATION: <camera_1><camera_2><camera_3>
STATE: <state>
What action should the robot take?<|im_end|>
<|im_start|>assistant
<action>  ← Flow Matching生成的连续动作chunk
```

### 6. 关键实验结果

**具身认知基准 (RynnBrain-2B vs 7-8B竞品)**:

| 基准 | RynnBrain-2B | RynnBrain-8B | MiMo-7B | RoboBrain-7B | Qwen3-VL-8B |
|------|:---:|:---:|:---:|:---:|:---:|
| VSI-Bench | **70.5** | **71.0** | 48.5 | 52.8 | 60.3 |
| RoboSpatial | **65.7** | **73.1** | 61.8 | 57.5 | 58.2 |
| EgoTaskQA | **73.9** | 72.5 | 58.7 | 50.0 | 57.8 |
| Open-X VQA | **71.0** | **74.0** | 41.5 | 44.1 | 59.8 |
| RynnBrain-Object | **70.7** | **71.2** | 39.0 | 30.8 | 41.8 |
| RynnBrain-Spatial | **57.2** | **59.9** | 28.3 | 20.5 | 35.0 |

**具身定位基准**:

| 基准 | RynnBrain-2B | RynnBrain-8B | MiMo-7B | Qwen3-VL-8B |
|------|:---:|:---:|:---:|:---:|
| RefSpatial-Bench | 52.7 | **59.2** | 48.0 | 53.4 |
| RynnBrain-Grounding | **79.1** | **81.6** | 49.8 | 62.8 |
| RynnBrain-Area | **54.6** | **56.2** | 49.4 | 30.0 |
| Cornell-Grasp | 20.9 | **26.6** | 0.2 | 21.2 |

**通用视觉理解（保持竞争力）**:

| 基准 | RynnBrain-8B | Qwen3-VL-8B |
|------|:---:|:---:|
| AI2D | 86.3 | 85.7 |
| DocVQA | 96.2 | 96.4 |
| MVBench | 69.5 | 68.7 |
| VideoMME | 70.7 | 71.4 |

**核心发现**: RynnBrain-2B在具身任务上已超越大多数7-8B模型，同时8B版本在通用视觉理解上与Qwen3-VL-8B基线持平，证明具身能力的获取不以牺牲通用能力为代价。

### 7. 设计洞察

1. **离散坐标 vs 连续回归**: 将坐标量化为[0,1000]的离散token，利用LLM的next-token prediction能力，避免了额外的回归头设计
2. **统一帧序列**: 图像=单帧视频，消除了图像/视频的架构差异
3. **CoP的可解释性**: 推理过程中每个实体引用都锚定到具体帧和坐标，使模型推理可验证
4. **数据效率的规划**: 多轮对话格式+历史记忆，仅数百样本即可泛化到长时序任务
5. **VLA的轻量化**: 复用VLM作为DiT backbone，仅需3个线性投影即可适配Flow Matching

---

## 🧪 练习题

### 基础理解
1. RynnBrain为什么选择将空间坐标量化为[0,1000]的离散token而非使用连续回归头？这种设计的优缺点是什么？
2. Chain-of-Perception (CoP) 与标准Chain-of-Thought (CoT) 的本质区别是什么？CoP如何减少具身推理中的幻觉？

### 进阶分析
3. GRPO中使用规则奖励（Fréchet距离/Chamfer距离）而非学习型奖励模型的设计考量是什么？这对训练稳定性有何影响？
4. RynnBrain-VLA将VLM作为单流DiT使用，这与π₀等方法中的双流设计有何异同？为什么选择将动作放在序列末尾？

### 开放思考
5. RynnBrain-Plan仅需数百样本即可获得长时序规划能力，这种数据效率来源于什么？预训练阶段的哪些数据类别对此贡献最大？