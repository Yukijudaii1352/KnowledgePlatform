# KnowledgePipeline

> **文档驱动的 AI 知识平台**
>
> 上游输入：一篇结构化的 Markdown 知识文档（遵循 [`pipeline/DOCUMENT_SPEC.md`](pipeline/DOCUMENT_SPEC.md)）
> 下游输出：一个风格统一、可预期的前端二级专题页
>
> 本项目从 `/data/workspace/KnowledgePlatform` 抽取「pipeline 相关」的全部代码与数据而来。原项目保留用于参考对比。

---

## 🌟 和原 KnowledgePlatform 的差异

| 维度 | 原 KnowledgePlatform | 本项目 KnowledgePipeline |
|---|---|---|
| 生成方式 | LLM Agent 基于原始文档一次性捏一个 html | **文档 → 编译器 → 前端**，模板和渲染逻辑固化在平台侧 |
| 稳定性 | 每次生成的页面布局、字段都可能变 | 所有专题页共享同一套模板，视觉与交互可预期 |
| 作者要做的事 | 写报告 + 反复和 Agent 沟通样式 | 只需按 `DOCUMENT_SPEC.md` 写报告 |
| 页面形态 | 老式单页长滚动 | 首屏**视图选择屏**：`领域综述` / `最新进展` 双入口 |
| 算法对比板块 | 有 | 已移除 |
| 底部附录 | 有 | 已移除 |

---

## 📁 目录结构

```
KnowledgePipeline/
├── index.html                     # 门户首页（8 大领域入口）
│
├── pipeline/                      # 🔧 编译器与规范（核心）
│   ├── README.md                  # pipeline 架构说明
│   ├── DOCUMENT_SPEC.md           # 【必读】知识文档写作规范 v2.0
│   ├── build.py                   # 编译器：md → html/data.js/logic.js
│   ├── templates/
│   │   ├── page-template.html     # 通用专题页 HTML 模板
│   │   └── page-logic.js          # 通用专题页渲染逻辑
│   ├── examples/
│   │   └── rl_demo.md             # 示例文档（pipeline 的"单元测试"）
│   └── schema/                    # （预留）JSON schema / 领域枚举
│
├── pages/                         # 📄 编译产物：所有专题页最终落在这里
│   └── llm/
│       ├── index.html             #   一级标签页：大语言模型 (LLM)
│       ├── rl_demo.html           #   二级专题页：强化学习 (RL for LLM)
│       ├── rl_demo-data.js        #     ↑ 由 pipeline 生成的数据
│       └── rl_demo-logic.js       #     ↑ 由 pipeline 复制的通用渲染逻辑
│
├── assets/                        # 🎨 全平台共享资源（由模板引用）
│   ├── css/
│   │   ├── common.css             #   全站通用样式（品牌色、排版、卡片…）
│   │   └── page.css               #   专题页专用样式（时间线、图谱、视图切换…）
│   ├── images/
│   │   └── rl/                    #   强化学习专题引用的图片
│   └── js/
│
└── content/                       # 📚 原始知识文档（作者撰写，pipeline 输入）
    ├── LLM/RL/                    #   原稿示例
    └── EmbodiedAI/VLA/            #   原稿示例
```

---

## 🚀 快速开始

### 1. 预览现有 demo

```bash
# 在项目根目录起一个静态服务
python3 -m http.server 8081
# 然后浏览器打开
#   http://127.0.0.1:8081/index.html
#   首页 → 大语言模型 → 强化学习 (RL for LLM)
```

### 2. 编译一篇新文档

```bash
# 假设你写了一篇 content/LLM/Alignment/my_doc.md（遵循 DOCUMENT_SPEC.md）
python3 pipeline/build.py content/LLM/Alignment/my_doc.md

# 编译成功后产出：
#   pages/llm/<topic_id>.html
#   pages/llm/<topic_id>-data.js
#   pages/llm/<topic_id>-logic.js
# 然后在 pages/llm/index.html 为这个专题加入一个卡片即可（未来会自动化）
```

### 3. 验证 pipeline 本身是否健康

```bash
python3 pipeline/build.py pipeline/examples/rl_demo.md
# 应该无错误地产出 pages/llm/rl_demo.*
```

---

## 📐 作者协议（写文档的人只需要看这个）

一句话概括：**作者不写 HTML/CSS，只按规范写 Markdown**。

请阅读 [`pipeline/DOCUMENT_SPEC.md`](pipeline/DOCUMENT_SPEC.md)，重点：

1. 文档顶部必须有 YAML Front-Matter（`domain`、`topic_id`、`categories` 等）
2. 正文三大板块（缺一不可）：`## 领域综述`、`## 算法演化关系`、`## 核心算法`
3. `## 核心算法` 下每个算法用 `###` 条目，内部用固定的子小节：
   - 开头 YAML（id/name/year/org/parent/paper_url/category/motivation…）
   - `#### 📝 一句话总结`
   - `#### 🎯 核心要点`
   - `#### 🔬 深入细节`（可选）
   - `#### 🧪 练习题`（可选）

编译器会在解析时做强校验：分类枚举、图谱节点交叉引用、必填子小节等，任何不合规都会**直接报错**而不是静默生成出错的页面。

---

## 🛠 技术栈

- **编译端**：Python 3 · PyYAML · markdown（标准库）
- **渲染端**：纯原生 HTML + CSS + JS；数学公式走 KaTeX
- **设计目标**：零 build-step（不依赖 npm / webpack），任何静态文件服务器都能跑

---

## 🗺 后续 Roadmap

- [ ] 自动在 `pages/<domain>/index.html` 中注册新编译出的专题卡片
- [ ] 为每个专题页接入 alphaXiv 风格的**聊天窗口**，让用户可以基于本页内容与 Agent 交互学习
- [ ] `pipeline/schema/` 产出 JSON Schema，配合 VSCode 插件实时校验文档
- [ ] 批处理：一次编译整个 `content/` 目录并生成站点索引
