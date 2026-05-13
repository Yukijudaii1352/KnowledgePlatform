---
id: silencer
name: "Silencer"
year: 2026
org: NeurIPS
category: fairness
parent: arl
arxiv: "2505.20738"
---

# Silencer: Mitigating Self-Bias in LLM Benchmarking

## 1. 问题背景与动机 (Problem & Motivation)

### 1.1 解决什么问题
当LLM被用作基准测试生成器（LLM-as-Benchmark-Generator）时，生成的基准会系统性地高估生成者自身的能力，即"自偏见"（Self-Bias）。这导致模型评估结果不可靠，阻碍了自动化基准生成方法的可信应用。

### 1.2 为什么重要
- 传统人工标注基准面临数据污染、高成本、更新慢等问题，LLM自动生成基准是趋势
- 自偏见使得生成的基准无法公平评估不同模型，破坏评估的客观性
- 论文首次系统量化了自偏见现象：在数学推理任务中自偏见高达0.1032（相对性能膨胀），语言理解任务中为0.0575

### 1.3 现有方法的不足
- 简单多模型集成：每个样本仍携带生成者的全部三种子偏见，且均匀权重次优
- 现有LLM-as-Benchmark-Generator方法（如BenchMaker、AttrPrompt）未考虑自偏见问题
- 缺乏对自偏见的形式化定义和系统性解决框架

## 2. 核心方法 (Method)

### 2.1 关键思路
将自偏见分解为三个可独立处理的子偏见，分别在样本级逐一消除，再在基准级通过加权集成进一步抑制残余偏见。

### 2.2 形式化定义

**自偏见定义**：
$$\mathcal{B}(\mathcal{M}) = R(\mathcal{M}|\mathcal{M}^{\text{human}}, \mathcal{M}, \mathcal{M}^{\text{ref}}_{1:K}) - R(\mathcal{M}|\mathcal{M}^{\text{human}}, \mathcal{M}^{\text{human}}, \mathcal{M}^{\text{ref}}_{1:K})$$

其中 $R(\mathcal{M}|Q,L,\mathcal{M}^{\text{ref}})$ 表示模型 $\mathcal{M}$ 在由 $Q$ 生成问题、$L$ 生成标签的基准上相对于参考模型集的相对性能。

**三种子偏见分解**：
- **语言风格偏见 $\mathcal{B}^s$**：模型偏好自身语言风格的问题表述
- **问题域偏见 $\mathcal{B}^q$**：模型倾向生成自身擅长领域的问题
- **错误标签偏见 $\mathcal{B}^l$**：模型标注错误与自身预测错误高度一致，导致虚假高分

实验验证贡献比：$\mathcal{B}^l(67\%-80\%) > \mathcal{B}^q(12\%-18\%) > \mathcal{B}^s(9\%-15\%)$

### 2.3 技术方案

#### 样本级子偏见消除（§4.2）

**1. Attribute Integration（消除 $\mathcal{B}^q$）**：
$$\bar{A}_t = \text{AttributeIntegration}_{\mathcal{M}_t}(A_{1:T}, \mathrm{TD})$$
让每个生成器综合所有生成器产生的属性集，选取与任务定义对齐的高质量属性，避免单一模型的领域偏好。

**2. Cross Paraphrase（消除 $\mathcal{B}^s$）**：
$$\bar{q}_t = \text{QuestionParaphrase}_{\mathcal{M}_r}(q_t), \quad r \in \{1,...,T\} \text{ uniformly random}$$
让其他生成器在不改变语义的前提下改写问题，打破单一语言风格。

**3. Label Calibration（消除 $\mathcal{B}^l$）**：
$$\bar{l}_t = \text{LabelCalibration}_{\mathcal{M}_t}(\bar{q}_t, l_t, p_t^{1:T})$$
收集所有生成器的预测及推理过程，辅助原生成器校准标签，减少系统性标注错误。

#### 基准级偏见中和集成（§4.3）

**Bias-Neutralizing Ensemble Algorithm**：
- 迭代优化各生成器基准的集成权重 $\alpha_{1:T}$
- 以集成基准作为人工基准的代理，计算各子基准与集成基准的评估一致性
- 采用 Evaluation Consistency 策略：
$$\alpha_i^{\text{new}} \propto \text{ReLU}(\text{PearsonCorrelation}(x^i_{1:T}, \bar{x}_{1:T})) + \epsilon$$
- 迭代至收敛，偏见小的基准获得更大权重

### 2.4 与现有方法的关系
- 可作为插件应用于任何LLM-as-Benchmark-Generator方法（如BenchMaker、AttrPrompt）
- 三种UpdateAlpha策略对比：Consistency(0.861) > Self-Bias(0.530) > Accuracy(0.343)（与真实偏见的相关性）

## 3. 实验验证 (Experiments)

### 3.1 实验设置
- **任务**：数学推理(MATH)、语言理解(MMLU-Pro)、常识推理(HellaSwag)
- **生成器**：7个代表性LLM（GPT-4o mini, Qwen-Plus, Claude 3.5 Haiku, DeepSeek-Distill-Qwen-32B, GPT-4o, QwQ-32B, Gemini 2.0 Flash）
- **参考模型**：16个模型的参考集
- **评估指标**：自偏见 $\mathcal{B}$（越低越好）、Pearson相关 $r_p$（与人工基准排名一致性，越高越好）
- **统计**：1000个随机种子取平均

### 3.2 主要结果
- **消融实验**：Label Calibration贡献最大（与$\mathcal{B}^l$占比67%-80%一致），三组件联合效果最优
- **整体效果**：Silencer显著降低自偏见并提升评估有效性$r_p$
- **跨方法泛化**：在BenchMaker和AttrPrompt上均有效
- **跨任务泛化**：在数学推理、语言理解、常识推理三个任务上一致有效

### 3.3 关键发现
- 自偏见在所有测试的LLM中普遍存在且显著
- 错误标签偏见是最主要来源（贡献67%-80%）
- Evaluation Consistency策略在权重分配上与真实偏见相关性达0.861，远优于其他策略
- 框架具有良好的收敛性（附录提供理论证明）

## 4. 方法评价 (Assessment)

### 4.1 优势
- **首次形式化**：系统定义并量化了LLM基准生成中的自偏见问题
- **分解思路精巧**：将复杂问题分解为三个可独立处理的子偏见
- **即插即用**：作为通用框架可应用于任何现有基准生成方法
- **理论支撑**：提供了偏见存在性的理论证明和算法收敛性证明
- **实验充分**：跨任务、跨方法、跨模型的全面验证

### 4.2 局限性
- 需要多个生成器协作（T>2），增加计算成本
- Label Calibration需要所有生成器对所有问题进行预测，API调用量大
- 迭代集成算法以集成基准代理人工基准，当所有生成器偏见方向一致时可能失效
- 子基准大小默认50，对于需要大规模基准的场景可能不足
- 依赖生成器之间的多样性，若生成器同质化则效果受限

### 4.3 潜在改进方向
- 探索更高效的标签校准方法（如少数模型投票而非全部预测）
- 研究生成器选择策略，最大化多样性
- 将框架扩展到多模态基准生成场景
- 结合主动学习思想，自适应选择需要校准的样本

## 5. 核心概念关联 (Key Connections)

- **与LLM-as-Judge的关系**：自偏见问题在LLM-as-Judge中也存在（模型偏好自己的输出），本文聚焦于基准生成端
- **与数据污染的关系**：自偏见可视为一种"隐式污染"——模型在自己生成的测试上天然占优
- **与集成学习的关系**：Bias-Neutralizing Ensemble借鉴了加权集成思想，但权重由偏见程度决定而非性能
- **与公平性的关系**：自偏见导致评估不公平，本质是评估系统对特定模型的系统性偏袒