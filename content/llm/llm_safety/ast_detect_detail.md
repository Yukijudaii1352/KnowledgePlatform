### AST-Detect: 用确定性语法树分析检测代码幻觉

```yaml
id: ast_detect
name: AST-Detect
full_name: 语法树检测 (AST-based Hallucination Detection)
year: '2026.03'
org: WWW
paper_url: https://arxiv.org/abs/2403.06448
category: hallucination
parent: —
motivation: 语法树确定性代码验证
```

#### 📝 一句话总结

AST-Detect 将 LLM 生成代码解析成抽象语法树，并对照由库 introspection 构建的知识库检查 API、参数、导入和标识符，从而无需执行代码也能发现并修复一类代码幻觉。

#### 🎯 核心要点

- **目标错误**：关注知识冲突型代码幻觉，例如不存在的函数、错误参数、缺失导入和上下文标识符不一致。
- **检测基础**：使用 AST 保留代码结构，避免只靠字符串匹配导致的误判。
- **知识库**：通过 Python 库 introspection 获取真实函数、类、签名和参数信息。
- **确定性优势**：不需要再次调用 LLM，也不执行不可信代码，结果可解释、速度快。
- **局限**：更适合 API 与结构类错误；对语义算法错误、性能问题和运行时环境依赖覆盖有限。

#### 🔬 深入细节

![AST-Detect 框架图](https://arxiv.org/html/2601.19106v1/x1.png)

图源：`Detecting and Correcting Hallucinations in LLM-Generated Code via Deterministic AST Analysis` 公开论文页面。manifest 中 `paper_url` 保持输入元信息。

```text
Algorithm: AST-based code hallucination detection
Input:
  generated Python code c
  library knowledge base KB from introspection
Output:
  diagnostics and corrected code c'

1. Parse c into AST T.
2. Traverse T to collect:
     imports and aliases,
     defined variables and functions,
     call sites,
     attribute accesses,
     keyword arguments.
3. For each call node:
     resolve module or object from imports and aliases.
     check whether function or method exists in KB.
     check whether keyword arguments match the true signature.
4. For identifiers:
     check whether each name is defined, imported, or built-in.
5. Emit deterministic diagnostics with AST node locations.
6. Apply local fixes when unambiguous:
     add missing import, correct API name, remove invalid keyword.
7. Re-parse c' and rerun checks.
```

AST-Detect 的关键是把代码幻觉看作可静态验证的结构冲突。LLM 生成的代码常常语法正确，却引用了不存在的 API 或参数。这类错误不一定需要运行程序才能发现，只要知道目标库真实暴露了哪些符号、签名和参数，就能在 AST 层定位。

相较字符串匹配，AST 提供了作用域和语法角色。比如同样的 token 可能是变量名、函数名、属性名或字符串内容；AST 能区分这些位置，降低误报。它还可以处理别名导入，例如 `import pandas as pd` 后把 `pd.DataFrame(...)` 解析回 pandas 的真实 API。

知识库由库 introspection 动态生成，避免手写规则快速过期。对 Python 生态而言，可以读取模块成员、函数签名、类方法和默认参数，再把它们组织成可查询表。检测时只需解析代码和查表，因此速度远低于执行测试或调用大模型复审。

修复阶段采取保守策略。若错误有单一明确修复，例如缺失标准导入或参数名拼写近似，可以自动改写 AST；若存在多个可能意图，则应报告诊断而不是猜测。这个设计保持了高 precision，也符合生产环境对代码自动修改的审慎要求。

#### 🧪 练习题

1. 为什么 AST 分析比正则表达式更适合检测代码 API 幻觉？
2. 由 introspection 生成的 KB 会在哪些情况下失效？
3. AST-Detect 为什么不应自动修复所有检测到的问题？
