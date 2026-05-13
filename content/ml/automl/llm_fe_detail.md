### LLM-FE

```yaml
id: llm_fe
name: LLM-FE
full_name: 大模型驱动特征工程 (LLM-FE)
year: 2026
org: TMLR
paper_url: https://arxiv.org/abs/2503.14434
category: auto_feature
parent: autofeat
motivation: LLM进化优化器+岛屿模型搜索
```

#### 📝 一句话总结

LLM-FE 将表格数据的特征工程建模为程序搜索问题，利用 LLM 作为进化优化器，结合岛屿模型多种群记忆与数据驱动反馈，迭代生成并优化特征变换程序，在分类和回归任务上全面超越现有自动特征工程方法。

#### 🎯 核心要点

- 将特征工程形式化为双层优化的程序搜索问题：外层搜索最优变换程序 \(T^*\)，内层训练预测模型评估变换质量
- LLM 作为知识引导的进化优化器：利用结构化提示（指令 + 数据集描述 + 评估函数 + 上下文示例）生成特征变换假设
- 多种群记忆（Island Model）：维护 \(m\) 个独立岛屿缓冲区，按 Boltzmann 分布采样父代程序，防止早熟收敛
- 数据驱动评估闭环：生成的特征程序应用于数据集 → 训练模型 → 验证集得分作为反馈信号
- 支持分类与回归任务（CAAFE/FeatLLM 仅支持分类），兼容 XGBoost、MLP、TabPFN 等多种预测模型
- 支持 GPT-3.5-Turbo 和 Llama-3.1-8B 两种 LLM 骨干，均有效提升性能
- 消融实验表明：领域知识 > 进化搜索 > 数据示例（贡献递减）

#### 🔬 深入细节

![LLM-FE 框架总览](https://ar5iv.labs.arxiv.org/html/2503.14434v3/assets/x1.png)
*图：LLM-FE 框架总览。(a) LLM 生成特征变换假设程序；(b) 程序应用于数据集产生增强特征；(c) 预测模型在增强数据上训练并在验证集评估；(d) 多种群记忆维护高分程序作为进化搜索的上下文样本。*

```python
# Algorithm 1: LLM-FE 进化特征搜索（简化伪代码）
def llm_fe(dataset, llm, m=3, b=3, T=20, k=3):
    """
    dataset: 表格数据集 (X_train, y_train, X_val, y_val)
    llm: 大语言模型骨干
    m: 岛屿数量
    b: 每次生成的程序数
    T: 总迭代次数
    k: 上下文示例数
    """
    # 初始化 m 个岛屿缓冲区
    islands = [Buffer() for _ in range(m)]
    best_program, best_score = None, -inf
    
    for t in range(T):
        # 按 Boltzmann 分布选择岛屿
        # P_i = exp(s_i / τ_c) / Σ_j exp(s_j / τ_c)
        island = boltzmann_sample(islands, tau_c)
        
        # 从选中岛屿采样 top-k 程序作为上下文示例
        context_programs = island.sample_top_k(k)
        
        # 构建结构化提示: 指令 + 数据集描述 + 评估函数 + 上下文示例
        prompt = build_prompt(dataset, context_programs)
        
        # LLM 生成 b 个新的特征变换程序
        new_programs = llm.generate(prompt, n=b, temperature=0.8)
        
        for program in new_programs:
            # 数据驱动评估
            X_aug = program.transform(dataset.X)
            model = train_model(X_aug, dataset.y_train)
            score = evaluate(model, X_aug_val, dataset.y_val)
            
            # 更新岛屿缓冲区（按得分签名聚类分配）
            assign_to_island(program, score, islands)
            
            if score > best_score:
                best_program, best_score = program, score
    
    # 集成 top-m 程序的预测结果
    return ensemble_top_m(islands)
```

**动机与背景**

传统自动特征工程方法（如 AutoFeat、OpenFE）依赖预定义的变换操作集合（如 log、sqrt、乘法等），在固定的手工设计搜索空间中进行组合搜索。这类方法存在两个根本局限：(1) 搜索空间受限于人工预设的算子，无法发现更复杂的领域特定变换；(2) 完全忽略领域知识，无法利用特征语义信息指导搜索。近期的 LLM 方法（CAAFE、FeatLLM）虽然引入了领域知识，但仅使用直接提示或简单的验证分数筛选，未能建立特征生成与数据驱动性能之间的有效反馈循环，也无法从历史实验中学习。LLM-FE 的核心洞察是：将 LLM 视为一个具有丰富领域先验的进化优化器，通过迭代的"生成-评估-反馈"循环，在开放的程序空间中搜索最优特征变换。

**核心机制：双层优化与进化搜索**

LLM-FE 将特征工程形式化为双层优化问题。外层目标是找到最优变换程序 \(T^*\)：

$$T^* = \arg\max_{T \in \mathcal{T}} \; \mathcal{V}(f^*_T, \mathcal{D}_{val})$$

其中内层优化训练预测模型：

$$f^*_T = \arg\min_{f \in \mathcal{F}} \; \mathcal{L}(f, T(\mathcal{D}_{train}))$$

搜索空间 \(\mathcal{T}\) 是所有可能的 Python 特征变换程序的集合——这是一个无限的、开放的搜索空间，远超传统方法的固定算子组合。LLM 通过结构化提示生成候选程序，提示包含四个关键组件：(1) **指令**：定义任务目标和输出格式；(2) **数据集规格**：包含任务描述、特征名称与含义、数据样本；(3) **评估函数**：明确评价指标和模型类型；(4) **上下文示例**：来自多种群记忆的高分历史程序及其得分。

**多种群记忆与 Boltzmann 采样**

为防止进化搜索陷入局部最优，LLM-FE 采用岛屿模型（Island Model）维护 \(m\) 个独立的程序缓冲区。每个岛屿存储一组高分程序，新生成的程序根据其在不同数据集分片上的得分签名（score signature）被分配到最相似的岛屿。选择哪个岛屿作为当前迭代的上下文来源时，采用 Boltzmann 采样策略：

$$P_i = \frac{\exp(s_i / \tau_c)}{\sum_{j=1}^{m} \exp(s_j / \tau_c)}$$

其中 \(s_i\) 是岛屿 \(i\) 中最优程序的得分，\(\tau_c\) 是温度参数。这种机制在利用（exploitation，倾向高分岛屿）和探索（exploration，给低分岛屿机会）之间取得平衡。多种群设计确保了搜索的多样性——不同岛屿可能发现数据的不同方面的有效特征，最终通过集成 top-\(m\) 个程序的预测结果获得鲁棒的最终输出。

**实验结果与消融分析**

在 11 个分类数据集上，LLM-FE 以 Mean Rank 1.54 显著优于 AutoFeat (3.18)、OpenFE (3.09)、CAAFE (3.00) 和 FeatLLM (3.82)。在 10 个回归数据集上，LLM-FE 以 Mean Rank 1.00 达到全面最优（对比 OpenFE 2.00、AutoFeat 3.00）。值得注意的是，CAAFE 和 FeatLLM 的假设空间仅支持分类任务，而 LLM-FE 天然支持回归。泛化性实验表明，无论使用 GPT-3.5-Turbo 还是 Llama-3.1-8B 作为骨干，搭配 XGBoost、MLP 或 TabPFN 作为预测模型，LLM-FE 均能稳定提升基线性能。

消融实验揭示了各组件的贡献：(1) 移除领域知识（匿名化特征名）导致性能显著下降至 0.838，说明 LLM 的语义理解是生成有意义特征的关键；(2) 移除进化搜索（不使用历史程序作为上下文）也导致明显退化，模型容易停滞在局部最优；(3) 移除数据示例仅造成轻微下降，表明 LLM 难以从少量数据样本中直接捕获模式，但领域知识和迭代反馈才是核心驱动力。

> 💡 关键洞察：LLM-FE 的成功在于将 LLM 的角色从"一次性特征生成器"提升为"知识引导的进化优化器"——LLM 不仅提供领域先验，还通过历史成功案例的上下文学习不断改进搜索方向。

#### 🧪 练习题

```yaml
question: "LLM-FE 中多种群记忆（Island Model）使用 Boltzmann 采样选择岛屿的主要目的是什么？"
options:
  - "加速 LLM 的推理速度，减少生成延迟"
  - "在利用高分岛屿和探索低分岛屿之间取得平衡，防止早熟收敛"
  - "减少 LLM 的 token 消耗，降低 API 调用成本"
  - "确保每个岛屿被均匀访问，保证公平性"
answer: 1
explain: "Boltzmann 采样通过温度参数 τ_c 控制选择概率分布的锐度，高分岛屿被选中概率更大（exploitation），但低分岛屿仍有机会被选中（exploration），从而避免搜索过早收敛到单一方向。"
```