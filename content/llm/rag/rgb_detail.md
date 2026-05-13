### RGB — Retrieval-Augmented Generation Benchmark

```yaml
id: rgb
name: RGB
full_name: "Retrieval-Augmented Generation Benchmark"
year: 2023
org: "CAS (中国科学院)"
paper_url: "https://arxiv.org/abs/2309.01431"
category: benchmark
parent: "—"
motivation: "评估LLM在RAG场景下的噪声鲁棒性与拒绝回答无解问题能力"
```

#### 📝 一句话总结

RGB 提出了一个检索增强生成基准，从噪声鲁棒性、负面拒绝、信息整合和反事实鲁棒性四个维度系统评估 LLM 利用外部检索文档的能力，揭示了当前 LLM 在 RAG 场景下的关键不足。

#### 🎯 核心要点

- 定义 RAG 的 4 项核心能力：噪声鲁棒性（Noise Robustness）、负面拒绝（Negative Rejection）、信息整合（Information Integration）、反事实鲁棒性（Counterfactual Robustness）
- 基于最新新闻文章构建 QA 实例，减少 LLM 内部知识带来的评估偏差
- 使用搜索引擎（Google API）+ 稠密检索模型获取真实外部文档，模拟真实 RAG 场景
- 共 600 个基础问题 + 200 个信息整合问题 + 200 个反事实鲁棒性问题，中英文各半
- 评估 6 个主流 LLM：ChatGPT、ChatGLM-6B、ChatGLM2-6B、Vicuna-7B、Qwen-7B-Chat、BELLE-7B-2M
- 4 种评估指标：准确率（Accuracy）、拒绝率（Rejection Rate）、错误检测率（Error Detection Rate）、错误纠正率（Error Correction Rate）
- 关键发现：噪声比例超过 80% 时准确率显著下降；负面拒绝率最高仅 45%；信息整合无噪声时准确率最高仅 67%；LLM 极易被反事实文档误导

#### 🔬 深入细节

![RGB 数据构建流程](https://arxiv.org/html/2309.01431v2/x2.png)
*图：RGB 数据构建流程，包括 QA 实例生成、搜索引擎检索和四个测试集的构建过程*

##### 评估流程伪代码

```python
# RGB 评估流程伪代码
def evaluate_rgb(model, testbed, noise_ratio):
    for question, answer, documents in testbed:
        # 1. 根据噪声比例采样文档
        pos_docs = sample_positive(documents)
        neg_docs = sample_negative(documents, ratio=noise_ratio)
        context = pos_docs + neg_docs  # 共 5 篇文档
        
        # 2. 构建 prompt（系统指令 + 文档 + 问题）
        prompt = build_instruction(context, question)
        
        # 3. 模型生成回答
        response = model.generate(prompt)
        
        # 4. 根据测试集类型评估
        if testbed_type == "noise_robustness":
            score = exact_match(response, answer)  # 准确率
        elif testbed_type == "negative_rejection":
            score = check_rejection(response)  # 拒绝率
        elif testbed_type == "information_integration":
            score = exact_match(response, answer)  # 准确率
        elif testbed_type == "counterfactual":
            score = check_error_detection(response)  # 错误检测率
    return aggregate(scores)
```

##### 动机与背景

检索增强生成（RAG）是解决 LLM 幻觉和知识过时问题的关键技术路线——通过检索外部文档为 LLM 提供额外知识，使其生成更准确可靠的回答。然而，现实中的 RAG 面临三大挑战：

1. **检索噪声**：检索器并不完美，返回的文档中包含大量与问题相关但不含答案的噪声文档
2. **生成不可靠**：LLM 的生成行为不可预测，无法保证其会利用文档中的有用信息
3. **虚假信息干扰**：互联网上存在大量错误信息，LLM 容易被误导

在 RGB 之前，缺乏一个系统性的基准来评估 LLM 在这些挑战下的表现。现有的 QA 基准（如 Natural Questions、TriviaQA）主要关注检索器性能，而非 LLM 利用检索文档的能力。RGB 填补了这一空白。

##### 四项核心能力的定义与测试集构建

**噪声鲁棒性（Noise Robustness）**：评估 LLM 在包含噪声文档时能否正确提取答案。测试集通过按不同比例（0%、20%、40%、60%、80%）采样负面文档来控制噪声水平。每个问题提供 5 篇外部文档。

**负面拒绝（Negative Rejection）**：评估当所有提供的文档都不包含答案时，LLM 能否拒绝回答而非编造答案。测试集中所有 5 篇文档均为负面文档（与问题相关但不含答案）。通过指令要求模型在信息不足时输出特定拒绝语句。

**信息整合（Information Integration）**：评估 LLM 能否从多篇文档中整合信息来回答复杂问题。通过扩展或改写基础问题使其答案涉及多个方面，例如将"谁是 2023 年超级碗 MVP？"改写为"谁是 2022 和 2023 年超级碗的 MVP？"，答案分散在不同文档中。

**反事实鲁棒性（Counterfactual Robustness）**：评估 LLM 能否识别外部文档中的事实错误。与前三项不同，此测试集基于 LLM 的内部知识构建——先确认 LLM 已知某知识，再提供包含篡改答案的文档，测试 LLM 是否会被误导。通过指令提醒模型检索信息可能存在风险。

##### 数据构建方法

数据构建分三步：

1. **QA 实例生成**：收集最新新闻文章，使用 ChatGPT 为每篇文章生成事件、问题和答案。使用最新新闻是为了减少 LLM 内部知识带来的评估偏差。生成后人工校验答案并过滤难以通过搜索引擎检索的数据。

2. **搜索引擎检索**：对每个问题使用 Google API 获取 10 个相关网页及摘要片段，同时将网页内容切分为最大 300 token 的文本块，使用稠密检索模型（中文用 m3e-base，英文用 all-mpnet-base-v2）选取 Top-30 匹配文本块。根据是否包含答案将文档分为正面文档和负面文档。

3. **测试集构建**：基于上述语料，按四项能力的需求分别构建测试集，调整噪声比例、文档组成和问题复杂度。

##### 评估指标设计

| 能力 | 指标 | 计算方式 |
|------|------|----------|
| 噪声鲁棒性 | 准确率（Accuracy） | 生成文本是否精确匹配答案 |
| 信息整合 | 准确率（Accuracy） | 生成文本是否精确匹配答案 |
| 负面拒绝 | 拒绝率（Rejection Rate） | 是否输出指定拒绝语句 |
| 反事实鲁棒性 | 错误检测率 + 错误纠正率 | 是否识别错误 + 是否给出正确答案 |

> 💡 关键：由于 LLM 常不严格遵循指令，对于拒绝率和错误检测率，除精确匹配外还使用 ChatGPT 进行辅助评估（Rej\* 和 ED\*），以更全面地捕捉模型的拒绝/检测行为。

##### 核心实验结果与分析

**噪声鲁棒性**：RAG 能有效提升 LLM 回答质量，但噪声比例超过 80% 时准确率显著下降。ChatGPT 从 96.33%（无噪声）降至 76.00%（80% 噪声），ChatGLM2-6B 从 91.33% 降至 57.33%。错误分析揭示三类典型错误：
- **长距离信息**：问题信息与答案信息在文档中距离较远时，LLM 难以正确关联
- **证据不确定性**：互联网上的推测性信息会误导 LLM，即使正确答案存在于文档中
- **概念混淆**：文档中相似但不同的概念（如"汽车收入" vs "总收入"）导致 LLM 混淆

**负面拒绝**：这是 LLM 最薄弱的环节。英文最高拒绝率仅 45%（ChatGPT），中文最高仅 43.33%。精确匹配拒绝率更低（英文最高 31%，中文最高 8.67%），说明 LLM 难以严格遵循指令格式。LLM 极易被相关但无答案的文档误导而生成错误回答。

**信息整合**：即使无噪声，最高准确率仅达 60%（英文，Vicuna）和 67%（中文，Qwen）。加入噪声后性能下降更为显著——噪声比例 0.4 时即出现显著下降，而简单问题在 0.8 时才显著下降。错误分析发现三类特有错误：
- **合并错误**（28%）：将两个子问题的答案合并为一个
- **忽略错误**（28%）：只回答一个子问题而忽略另一个
- **错位错误**（6%）：将一个子问题的文档错误地对应到另一个子问题

**反事实鲁棒性**：LLM 极难识别文档中的事实错误。ChatGPT 在有反事实文档时，中文准确率从 91% 骤降至 17%，英文从 89% 降至 9%。错误检测率极低（精确匹配最高仅 8%），即使 LLM 本身拥有正确知识，也会被检索到的错误文档覆盖。

> ⚠️ 注意：反事实鲁棒性的评估仅限于通过指令提醒模型注意潜在风险的场景。在实际应用中，若无此提醒，LLM 对虚假信息的抵抗力可能更弱。

##### 与已有工作的区别

RGB 与此前的 RAG 评估工作有本质区别：

- **vs. 传统 QA 基准**（Natural Questions、TriviaQA）：传统基准关注检索器性能，RGB 关注 LLM 利用检索文档的能力
- **vs. LLM 通用基准**（MMLU、C-Eval）：通用基准评估 LLM 内部知识，RGB 评估 LLM 处理外部知识的能力
- **vs. 同期 RAG 评估**（RAGAS、ARES）：RGB 更系统地定义了四项独立能力维度，且使用最新新闻减少知识泄露偏差
- **创新点**：首次将 RAG 能力分解为四个可独立评估的维度，并提供了详细的错误分类分析

#### 🧪 练习题

```yaml
question: "在 RGB 基准的负面拒绝测试中，所有提供给 LLM 的文档具有什么特点？"
options:
  - "文档完全与问题无关"
  - "文档与问题相关但不包含答案信息"
  - "文档包含正确答案但被篡改"
  - "文档来自不同语言"
answer: 1
explain: "负面拒绝测试集中所有文档均为负面文档（negative documents），即与问题相关但不包含答案信息，用于评估 LLM 能否在无有用信息时拒绝回答而非编造答案。"
```