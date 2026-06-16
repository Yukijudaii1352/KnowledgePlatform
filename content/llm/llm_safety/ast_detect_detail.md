### AST-Detect：语法树检测 (AST-based Hallucination Detection)
```yaml
id: ast_detect
name: AST-Detect
full_name: 语法树检测 (AST-based Hallucination Detection)
year: "2026.03"
org: WWW
paper_url: https://arxiv.org/abs/2403.06448
category: hallucination
parent: "—"
motivation: 语法树确定性代码验证
```

> 论文定位说明：任务元信息中的 `paper_url` 指向 MIND 内部状态幻觉检测论文；本文按算法名 AST-Detect 对应的论文 **Detecting and Correcting Hallucinations in LLM-Generated Code via Deterministic AST Analysis** 精读，实际可访问版本为 `https://arxiv.org/abs/2601.19106`。

#### 📝 一句话总结
AST-Detect 提出一种不执行代码、只基于 AST 与动态知识库的确定性后处理框架，用来检测并自动修复 LLM 生成代码中的知识冲突型幻觉。它解决了传统 lint、语法约束解码和 LLM-in-the-loop 修复难以稳定识别“语法正确但 API 事实错误”的问题。

#### 🎯 核心要点
- 将目标错误定义为 Knowledge Conflicting Hallucinations，包括不存在 API、缺失模块限定、上下文与参数语义冲突
- 用 AST 静态解析生成代码，提取 import、别名映射、限定函数调用、裸函数调用与关键参数字面量
- 用库反射动态构建 Knowledge Base，记录合法函数、方法、常见别名、轻量语义偏好与库版本
- 用确定性规则验证调用点，主要检测 Unknown API、Bare Critical Call、Semantic Inconsistency 三类问题
- 用局部 AST 编辑完成修复，包括替换最接近 API、补全模块别名或 import、按参数线索改写 API
- 在 200 个 Python 样本、5 个库上评测，其中 161 个幻觉样本、39 个干净样本
- 报告 100% precision、87.6% recall、0.934 F1，自动修复 77.0% 已识别幻觉

#### 🔬 深入细节
![AST-Detect 框架图](https://arxiv.org/html/2601.19106v1/x1.png)
*图：LLM 生成代码先被解析为 AST，再经过静态分析、动态知识库、确定性验证和自动 AST 修复。*

```python
# AST-Detect: deterministic AST hallucination detection and correction
# 输入: LLM 生成的 Python 代码片段
ast_tree = parse_to_ast(code)
imports, aliases = extract_imports_and_aliases(ast_tree)
call_sites = extract_calls_and_arguments(ast_tree)

kb = KnowledgeBase()
for lib in imports:
    kb.add_public_api_by_introspection(lib)
    kb.add_common_aliases(lib)
    kb.add_version(lib.__version__)

issues = []
for call in call_sites:
    if call.qualified_name not in kb.valid_api:
        issues.append(unknown_api(call, nearest_by_edit_distance(call, kb)))
    if call.is_bare_critical_call() and kb.has_required_module(call.name):
        issues.append(bare_call(call, kb.canonical_alias(call.name)))
    if argument_shape_conflicts_with_api(call):
        issues.append(semantic_inconsistency(call, kb.intent_preference(call)))

for issue in issues:
    ast_tree = localized_ast_rewrite(ast_tree, issue)

fixed_code = unparse_ast(ast_tree)
return issues, fixed_code
```

AST-Detect 的核心判断是：代码幻觉不只表现为语法错误，也可能表现为“知识冲突”。例如 `pd.read_exel('data.csv')` 在语法上是合法的调用表达式，很多语法约束解码器不会阻止它，普通 linter 也未必知道 pandas 当前版本是否存在该 API；但它与 pandas API 事实冲突，因此运行时会失败。论文把这类错误称为 KCH，并进一步拆成 API Knowledge Conflicts 与 Identifier Knowledge Conflicts。

框架第一层是 Static Analysis Layer。它不执行代码，而是把生成片段解析成 AST，从结构上抽取四类信息：`import pandas as pd` 这样的导入与别名，`pd.read_csv` 这样的 fully qualified call，`read_csv` 这样的裸调用，以及 `.csv`、`.json` 这类能暗示调用意图的参数字面量。AST 的优势是稳定：格式、换行、括号风格不会影响结构抽取。

第二层是 Dynamic Knowledge Base。它不是静态白名单，而是通过反射从实际库中枚举公共 callables，并补充 pandas DataFrame、Series 等常用方法、`np`/`pd` 等常见别名，以及轻量语义偏好。KB 还记录库的 `__version__`，因此同一个检测结果可以绑定到具体依赖版本，避免“旧版本合法、新版本废弃”造成不可复现。

验证层可以抽象为一个确定性判别函数：

$$
D(c,\mathcal{K})=\mathbb{1}[\mathrm{name}(c)\notin\mathcal{K}]\vee\mathbb{1}[\mathrm{bare}(c)]\vee\mathbb{1}[\mathrm{intent}(c)\not\sim\mathrm{api}(c)]
$$

其中 \(c\) 是调用点，\(\mathcal{K}\) 是知识库。Unknown API 用编辑距离找最近合法符号，例如 `read_exel` 接近 `read_excel`；Bare Critical Call 检测缺少模块限定的关键调用，例如裸 `read_csv` 应补成 `pd.read_csv`；Semantic Inconsistency 则利用参数形状或意图词，例如 `.csv` 文件更符合 `pd.read_csv` 而不是 `pd.read_excel`。

论文给出验证复杂度为：

$$
O(n\cdot m)
$$

其中 \(n\) 是代码中的调用点数量，\(m\) 是 KB 中 API 条目数量。这个复杂度对 IDE 或 CI 中的轻量实时检查是可接受的，而且检测过程完全可复现，不依赖 LLM 再次生成。

自动修复使用局部 AST 编辑，而不是字符串替换。Unknown API 会替换为最近合法符号；上下文不一致会将 `pd.read_excel('f.csv')` 改成 `pd.read_csv('f.csv')`；裸调用会插入缺失 import 或补上 canonical alias。修复后再把 AST unparse 回源代码。这个设计避免了 LLM-in-the-loop 的随机性，但也暴露了边界：如果表面 typo 与深层意图冲突并存，单纯编辑距离可能修复 typo 却漏掉真正语义意图。

实验上，数据集包含 numpy、pandas、requests、matplotlib、json 五类库的 200 个 Python 样本。论文报告检测 precision 为 100%，说明没有把 39 个 clean 样本误报成幻觉；recall 为 87.6%，主要漏检集中在 matplotlib 与上下文不一致类；自动修复 124/161 个幻觉样本，整体 fix accuracy 为 77.0%。这说明 AST-Detect 最适合高置信的 API 事实错误与缺失限定问题，而不是复杂多行逻辑错误。

> ⚠️ 注意：AST-Detect 的“确定性”是优势也是边界。它能稳定处理库 API 与单文件调用结构，但不声称解决跨文件数据流、深层业务逻辑或需要执行才能发现的语义错误。

#### 🧪 练习题
```yaml
question: "AST-Detect 为什么能发现很多普通语法检查器漏掉的代码幻觉？"
options:
  - "因为它执行生成代码并比较运行结果"
  - "因为它只检查缩进和括号是否匹配"
  - "因为它将 AST 调用点与由真实库反射得到的知识库进行确定性比对"
  - "因为它要求 LLM 重新生成所有错误代码"
answer: 2
explain: "KCH 往往语法正确但违反库 API 事实；AST-Detect 用真实库知识库验证调用点，因此能覆盖普通语法检查器难以捕捉的错误。"
```
