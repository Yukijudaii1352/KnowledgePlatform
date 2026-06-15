# 📚 AI Knowledge Hub

<p align="left">
  <img alt="license"  src="https://img.shields.io/badge/license-MIT-blue.svg">
  <img alt="python"   src="https://img.shields.io/badge/python-3.8%2B-3776AB.svg?logo=python&logoColor=white">
  <img alt="build"    src="https://img.shields.io/badge/build-zero--config-brightgreen.svg">
  <img alt="status"   src="https://img.shields.io/badge/status-active-success.svg">
  <a href="https://yukijudaii1352.github.io/KnowledgePlatform/">
    <img alt="demo"   src="https://img.shields.io/badge/live_demo-GitHub_Pages-181717.svg?logo=github">
  </a>
</p>

**🔗 在线预览**：<https://yukijudaii1352.github.io/KnowledgePlatform/>

---

## 🎯 项目目标

**让 AI 从业者在 5 分钟内快速了解一个陌生子领域的整体情况与最新进展。**

AI 的子方向越来越多（LLM / CV / 多模态 / 具身智能 / AIGC / AI Infra / AI4Sci …），从业者往往深耕其中一两个方向，却需要经常"快速建立起对隔壁领域的认知"，比如：

- 这个领域**最核心的几条技术主线**是什么？
- 最近一两年**有哪些关键算法/模型**？它们之间的**演化关系**是怎样的？
- 这些算法各自的**一句话定位、核心要点、适用场景**是什么？

传统博客或论文列表很难回答这三个问题——每篇文章的组织方式都不一样，读者要反复切换语境。本项目的做法是把这件事**标准化、模板化**：

在每个专题页里，读者可以：
- 🗺 通过 **算法演化图谱** 看清主线脉络和父子关系；
- 📅 通过 **时间线** 把握最新进展的时间节奏；
- 🏷 通过 **分类筛选** 聚焦特定子方向；
- 📇 通过 **算法卡片 + 一句话总结** 快速扫读；
- 🔬 感兴趣时再展开**深入细节**和**练习题**。

目标用户是每一位希望"快速跨到邻居领域"的 AI 从业者：学生、算法工程师、架构师、PM。

---

## 📁 项目结构

```
KnowledgePipeline/
├── index.html                    # 🏠 门户首页（8 大领域入口 · 由 pipeline 维护数据占位）
│
├── pipeline/                     # 🔧 编译器与规范（核心）
│   ├── README.md                 #   pipeline 架构说明（开发者视角）
│   ├── DOCUMENT_SPEC.md          #   ⭐ 知识文档写作规范（作者必读）
│   ├── build.py                  #   CLI 编译入口：md → html/data.js/logic.js
│   ├── builders/                 #   各子模块（parser / renderer / domain_builder…）
│   ├── templates/
│   │   ├── page-template.html    #   通用专题页 HTML 模板
│   │   └── page-logic.js         #   通用专题页渲染逻辑
│   ├── examples/
│   │   └── rl_demo.md            #   示例文档（pipeline 的"单元测试"）
│   └── schema/                   #   (预留) JSON schema / 领域枚举
│
├── pages/                        # 📄 编译产物（自动生成，请勿手改）
│   └── <domain>/
│       ├── index.html            #   一级领域目录页（列出该领域的所有二级专题）
│       ├── <topic>.html          #   二级专题页
│       ├── <topic>-data.js       #     ↑ 由 pipeline 生成的数据
│       └── <topic>-logic.js      #     ↑ 由 pipeline 复制的通用渲染逻辑
│
├── assets/                       # 🎨 全平台共享资源（由模板引用）
│   ├── css/
│   │   ├── common.css            #   品牌色、排版、卡片等全站通用样式
│   │   └── page.css              #   专题页专用样式（时间线、图谱、视图切换…）
│   ├── images/                   #   专题内图片（按 topic 归档）
│   └── js/                       #   公共前端依赖
│
├── content/                      # 📚 原始知识文档（作者撰写的源文件）
│   ├── LLM/RL/
│   └── EmbodiedAI/VLA/
│
├── scripts/
│   └── deploy_github_pages.sh    # 🚀 一键推送 + 部署 GitHub Pages
│
├── .nojekyll                     # 告诉 GitHub Pages 跳过 Jekyll
├── .gitignore
└── README.md                     # 当前文件
```

支持的 8 个一级领域（`<domain>` 取值）：

| domain key | 领域 |
|---|---|
| `ml` | 机器学习 |
| `cv` | 计算机视觉 |
| `llm` | 大语言模型 (LLM) |
| `multimodal` | 多模态 |
| `aigc` | AIGC |
| `embodied` | 具身智能 |
| `infra` | AI Infra |
| `ai4sci` | AI4Sci |

---

## 🚀 快速开始

### 执行链（推荐）

更新一篇专题的完整闭环如下（任选其一）：

```text
1) 直接写专题文档（含 front-matter + 三段式章节）
   content/<domain>/<topic_id>.md
   -> python3 pipeline/build.py content/<domain>/<topic_id>.md
   -> 输出 pages/<domain>/<topic_id>.html/.js/.css 对应资源
   -> 首页与领域目录页自动刷新

2) 通过内容生产链（适合从综述+论文自动化生成）
   download_tmp.py -> deep_research.py -> content/run.sh -> assemble.py
   -> pipeline/build.py
   -> pages/<domain>/<topic_id>.html/.js/.logic 与目录页刷新
```

### Quick Start（更新文章）

```bash
# 1) 环境
pip install pyyaml markdown

# 2) 写文档
cp pipeline/examples/rl_demo.md content/llm/my_topic.md
# 编辑 content/llm/my_topic.md，按 DOCUMENT_SPEC 补齐三段和 YAML

# 3) 校验与编译（推荐先 dry-run）
python3 pipeline/build.py content/llm/my_topic.md --dry-run
python3 pipeline/build.py content/llm/my_topic.md

# 4) 本地预览
python3 -m http.server 8081
# 访问 http://127.0.0.1:8081/pages/llm/my_topic.html

# 5) 运行与发布前的完整回归
python3 pipeline/build.py --include-examples --dry-run
```

### 内容生产链 Quick Start（自动化）

```bash
# 先配置 GenericAgent（首次执行）
bash scripts/setup_generic_agent.sh --source /path/to/GenericAgent

# 生成 detail（默认优先读取 tools/GenericAgent）
bash content/run.sh content/llm/llm_rl.yaml

# 装配专题源文档并编译为页面
python3 pipeline/assemble.py content/llm/llm_rl.yaml
python3 pipeline/build.py content/llm/llm_rl.md
```

如果你只需要浏览现有页面，可以直接启动静态服务：

```bash
python3 -m http.server 8081
# 访问 http://127.0.0.1:8081/index.html
```

---

## 🛠 编译器能力速查

### `build.py` 三种工作模式

| 模式 | 命令 | 做了什么 |
|---|---|---|
| **全量编译** | `python3 pipeline/build.py` | 扫描 `content/` 下所有带 front-matter 的 .md → 逐一编译 → 刷新聚合页 |
| **增量编译** | `python3 pipeline/build.py path/to.md` | 只编译指定文档 → 刷新聚合页 |
| **仅刷新聚合页** | `python3 pipeline/build.py --only-index` | 不编译任何 md，只重新生成首页 + 领域目录页 |

### 额外 flag

| flag | 作用 |
|---|---|
| `--copy-images` | 把源文档同级 `images/` 目录拷到 `assets/images/<topic_id>/` |
| `--dry-run` | 只解析校验，不写入任何文件（适合 CI） |
| `--include-examples` | 全量编译时额外包含 `pipeline/examples/` 下的示例文档 |

更多细节详见 [`pipeline/README.md`](pipeline/README.md) 和 [`pipeline/DOCUMENT_SPEC.md`](pipeline/DOCUMENT_SPEC.md)。

---

## 📐 文档规范要点（TL;DR）

完整规范在 [`pipeline/DOCUMENT_SPEC.md`](pipeline/DOCUMENT_SPEC.md)，这里给一个脑图：

```
一篇合规的知识文档
│
├─ YAML Front-Matter  （文档顶部，--- 之间）
│   ├─ domain          ← 8 个一级领域枚举之一
│   ├─ topic_id        ← 英文短名，决定输出文件名
│   ├─ topic_name      ← 页面显示名
│   ├─ page_subtitle   ← 副标题（如版本号/日期）
│   └─ categories      ← dict：算法分类 key → 显示名
│
├─ ## 领域综述           ← 必需
├─ ## 算法演化关系        ← 必需（描述节点 & 父子关系）
└─ ## 核心算法           ← 必需
    ├─ ### AlgoOne      ← 每个算法一个三级标题
    │   ├─ YAML 子块    （id/name/year/org/parent/paper_url/category/motivation…）
    │   ├─ #### 📝 一句话总结   ← 必需
    │   ├─ #### 🎯 核心要点     ← 必需
    │   ├─ #### 🔬 深入细节     ← 可选
    │   └─ #### 🧪 练习题       ← 可选
    └─ ### AlgoTwo ...
```

核心约束：**所有交叉引用会在编译期强校验**——演化图谱中的每个节点必须在 `## 核心算法` 下有对应条目；每个算法的 `category` 必须是 front-matter 里 `categories` 的 key。

---

## 📄 License

[MIT](LICENSE)

---

<p align="center">
  <sub>Made with ❤️ for the AI community · 让知识沉淀得更结构化一点</sub>
</p>
