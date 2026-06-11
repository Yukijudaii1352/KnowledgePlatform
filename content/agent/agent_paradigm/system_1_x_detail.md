### System-1.x: 快慢混合规划器 (System-1.x)

```yaml
id: system_1_x
name: System-1.x
full_name: 快慢混合规划器 (System-1.x)
year: '2024.07'
org: UNC Chapel Hill
paper_url: https://arxiv.org/abs/2407.14414
category: search
parent: rap
motivation: 在直出规划与显式搜索间自适应切换
```

#### 📝 一句话总结
System-1.x 提出了一个可控的混合 LLM 规划框架，通过 hybridization factor \(x\) 在快速直觉的 System-1 规划器与缓慢搜索的 System-2 规划器之间进行插值，仅需搜索轨迹作为微调监督，在迷宫导航和积木世界等经典规划任务上实现了优于纯 LLM 规划器和符号 A* 算法的性能。

#### 🎯 核心要点
- 提出**三级组件架构**：Controller（分解子目标并分配规划器）、System-1 Planner（直接生成动作序列）和 System-2 Planner（先搜索再生成计划），三者均在同一个基础 LLM 上微调。
- 引入**混合因子 \(x \in [0,1]\)**，控制搜索在总规划中的比例：\(x=0\) 时等价于纯 System-1，\(x=1\) 时等价于纯 System-2。
- Controller 利用难度函数 \(h(s_0, s_g)\) 对子目标排序，将**简单子目标**分配给 System-1，**困难子目标**分配给 System-2，实现混合规划。
- 仅需**搜索轨迹**（search traces）作为监督信号，无需额外的标注或奖励模型。
- 在 **Maze Navigation 和 Blocksworld** 两个经典规划任务上评估，给定相同的探索预算，System-1.x 的规划准确率显著优于纯 System-1、纯 System-2 以及符号 A* 规划器。
- 展示**可控性**（调节 \(x\) 可改变搜索量—性能权衡）、**灵活性**（支持神经-符号混合变体，如 System-1 为神经、System-2 为符号 A*）以及**泛化性**（对 BFS、DFS、A* 等不同搜索算法的训练数据均鲁棒）。

#### 🔬 深入细节
![System-1.x 核心对比示意图](https://ar5iv.labs.arxiv.org/html/2407.14414/assets/x1.png)  
*图：System-1 Planner、System-2 Planner 与 System-1.x 混合规划器的对比。System-1 直接生成计划，快速但易出错；System-2 先搜索再输出，准确但缓慢；System-1.x 根据子目标难度在两者间动态切换，兼顾速度与精度。*

##### 动机与背景
传统的 LLM 规划器（如直接生成答案的 System-1）缺乏显式的搜索、回溯和从错误中学习的能力，导致在长序列规划任务上表现不佳，尤其是面对分布外（OOD）问题时。而引入搜索的 System-2 LLM 规划器虽然准确率更高，但会消耗大量 token（搜索所有中间状态），效率低下。System-1.x 旨在将两者结合，让简单子任务用 System-1 快速完成，困难子任务用 System-2 谨慎搜索，从而在准确率和效率之间取得可控的平衡。

##### 核心机制：Controller + 双规划器架构

System-1.x 由三个微调后的 LLM 组件构成：
1. **System-1 Planner**：输入起始状态 \(s_0\) 和目标状态 \(s_g\)，直接生成动作序列 \(\mathcal{P} = (a_1, \dots, a_n)\)，不进行任何中间探索。它探索的状态数仅等于计划长度 \(n\)。
2. **System-2 Planner**：输入 \(s_0, s_g\)，先生成搜索轨迹（包括所有访问过的状态、动作及其有效性），再从中提取最终计划。探索状态数远大于计划长度，但准确率更高。
3. **Controller**：接收用户设定的混合因子 \(x\) 和难度函数 \(h\)，将原始规划问题分解为三个子目标：前段 System-1 子计划、中段 System-2 子计划、后段 System-1 子计划。中段的长度占原计划长度的 \(x\) 倍，且选择使总难度最低的分界点。

训练数据的生成由 Algorithm 1 描述：

```python
# Algorithm 1: Training Data Generation for System-1.x Controller
Input: System-1 data D_Sys1 = {(s0, sg, plan)}, hybridization factor x, hardness h
Output: Controller training data D_c

sorted_data = sort(D_Sys1, key=lambda d: h(d.s0, d.sg))  # 按难度升序
D_c = {}
for i, (s0, sg, plan) in enumerate(sorted_data):
    if i < (1 - x) * N:       # 最简单的 (1-x)% 直接用 System-1
        y = [(s0, sg), "Sys1"]
    else:                     # 剩余 x% 分解为三部分
        j, k = argmin_{u,v} [h(s0, s_u) - h(s_u, s_v) + h(s_v, sg)]
                 s.t. |v - u| = x * len(plan)
        y = [(s0, s_j), "Sys1"] + [(s_j, s_k), "Sys2"] + [(s_k, sg), "Sys1"]
    D_c[(s0, sg)] = y
return D_c

Controller 的训练是一个 sequence-to-sequence 任务：输入起始状态、目标状态和 \(x\)，输出子目标列表及各子目标对应的规划器类型。推理时，Controller 产生子目标序列，分别调用 System-1 或 System-2 生成子计划，最后拼接成完整计划。
```

> 💡 关键：混合因子 \(x\) 直接决定了多少比例的规划使用搜索模式。较大的 \(x\) 意味着更多搜索，更高的准确率，但也带来更高的 token 成本。用户可根据实际需求在速度与精度之间平滑调节。

##### 训练流程
1. 用标准规划数据集训练一个 System-1 Planner（直接生成计划）。
2. 使用符号搜索算法（如 A*、BFS、DFS）为每个规划问题生成搜索轨迹，用这些轨迹训练 System-2 Planner。
3. 基于已训练的 System-1 和 System-2 的行为，按 Algorithm 1 构造 Controller 的训练数据（包含不同 \(x\) 值），微调 Controller。
4. 注意：System-1、System-2 和 Controller 均在同一个基础 LLM（如 LLaMA-3.1-8B-Instruct）上微调，但参数独立存储，推理时按需加载。

##### 与传统方法的区别
- **vs. 纯 System-1**：纯 System-1 不进行搜索，OOD 泛化差；System-1.x 可引入搜索提高鲁棒性。
- **vs. 纯 System-2**：纯 System-2 对所有问题均执行全量搜索，token 消耗巨大；System-1.x 只对困难子目标搜索，节省计算。
- **vs. 符号 A***：符号规划器依赖完美环境模型，无法泛化到非符号环境；System-1.x 的 System-2 是神经网络实现的搜索，可在语言空间中“学习”搜索，同时 System-1.x 还支持神经-符号混合变体，兼具两者优势。
- **vs. 简单集成**：简单地让 LLM 先回答、错误再搜索是硬性分叉，缺乏平滑可控性；System-1.x 通过 \(x\) 因子实现软性混合，并端到端训练 Controller 以优化子目标分解。

##### 实验支撑
在 Maze Navigation 任务上，给定固定的总探索状态数预算（SE budget），System-1.x 在所有预算水平下均超过 System-1、System-2 和符号 A*。尤其在低预算下，System-1.x 的优势更明显，因为它能将有限搜索集中在困难子目标上。在 Blocksworld 任务上，System-1.x 同样取得了最高的计划准确率。进一步分析表明，随着 \(x\) 增加，准确率单调上升、探索状态数单调增多，验证了 \(x\) 的可控性。混合神经 System-1 与符号 A* 作为 System-2 的变体同样有效，证明框架的灵活性。使用不同搜索算法（BFS、DFS、A*）生成的训练数据时，System-1.x 的性能保持稳定，表明对底层搜索算法选择鲁棒。

#### 🧪 练习题
```yaml
question: "在 System-1.x 框架中，混合因子 x 的作用是什么？"
options:
  - "决定 Controller 使用哪个基础 LLM 进行微调"
  - "控制 Controller 分配给 System-2 处理的规划子目标比例"
  - "设置 System-2 搜索时的最大探索步数"
  - "调整 System-1 和 System-2 输出计划时的温度参数"
answer: 1
explain: "混合因子 x 决定总规划中由 System-2（搜索模式）处理的子目标比例，从而控制搜索开销与准确率的权衡。"
```
