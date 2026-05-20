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

### 0️⃣ 环境要求

- Python 3.8+
- 依赖：`PyYAML`、`markdown`（都是轻量包）
- 任意静态文件服务器即可预览（`python3 -m http.server` 够用）

```bash
pip install pyyaml markdown
```

### 1️⃣ 我只想预览（读者 / 访客）

```bash
# 在仓库根目录启动静态服务
python3 -m http.server 8081

# 浏览器访问
#   http://127.0.0.1:8081/index.html
#   → 从首页进入 8 个领域 → 点击已上线专题
```

或者直接访问在线 Demo：<https://yukijudaii1352.github.io/KnowledgePlatform/>

### 2️⃣ 我想写一篇新专题（作者）

**第 1 步**：阅读 [`pipeline/DOCUMENT_SPEC.md`](pipeline/DOCUMENT_SPEC.md)，或直接拷贝示例改写：

```bash
cp pipeline/examples/rl_demo.md content/LLM/Alignment/my_topic.md
```

**第 2 步**：按规范写文档。核心骨架如下：

```markdown
---
domain: llm                       # 8 个领域枚举之一
topic_id: my_topic                # 将用作输出文件名
topic_name: 我的新专题
page_subtitle: 2026-05 版
categories:
  cat_a: 分类A显示名
  cat_b: 分类B显示名
---

## 领域综述
（一段领域背景介绍）

## 算法演化关系
（描述节点、父子关系的 YAML 或列表）

## 核心算法
### AlgoOne
（算法 front-matter + 📝一句话总结 / 🎯核心要点 / 🔬深入细节 / 🧪练习题）

### AlgoTwo
...
```

**第 3 步**：编译。

```bash
# 编译单篇
python3 pipeline/build.py content/LLM/Alignment/my_topic.md

# 把 md 旁边 images/ 里的图片一并同步到 assets/images/<topic_id>/
python3 pipeline/build.py content/LLM/Alignment/my_topic.md --copy-images

# 只做校验，不落盘（适合 CI / pre-commit）
python3 pipeline/build.py content/LLM/Alignment/my_topic.md --dry-run
```

编译成功后自动产出：
```
pages/llm/my_topic.html
pages/llm/my_topic-data.js
pages/llm/my_topic-logic.js
```
同时刷新 `pages/llm/index.html` 和 `index.html`，自动把新专题标记为"✦ 已上线"。

**第 4 步**：本地预览 → 提交 PR。

### 2.5️⃣ 我想走“内容生产 pipeline”

当前仓库的内容生成已经拆成 4 段，中间产物都落在仓库里：

1. 人工挑选综述文章，并用 `pipeline/researcher/download_tmp.py` 下载为 `article.md`
2. 用 `pipeline/researcher/deep_research.py` 生成专题级中间 YAML：
   包含页面元信息、分类体系、算法列表、时间线/图谱元数据
3. 用 `content/run.sh <topic.yaml>` 批量驱动论文精读 agent，生成每个算法的 `*_detail.md`
4. 用 `pipeline/assemble.py` 把综述 + topic YAML + detail markdown 装配成最终知识文档，再交给 `pipeline/build.py` 编译成网页

#### 2.5.1 获取知乎 Cookie

`download_tmp.py` 下载知乎文章时需要登录 Cookie。当前项目推荐直接复用仓库内置的 [`pipeline/researcher/zhihu-cli`](pipeline/researcher/zhihu-cli) 登录态，而不是手工从浏览器里抄整段 Cookie。

步骤如下：

```bash
# 1) 安装 zhihu-cli
pip install -e pipeline/researcher/zhihu-cli

# 2) 登录知乎（推荐二维码）
zhihu login --qrcode

# 3) 确认登录状态
zhihu status

# 4) 把 ~/.zhihu-cli/cookies.json 同步到本项目
python3 pipeline/researcher/sync_zhihu_cookies.py
```

说明：

- `zhihu login --qrcode` 会把二维码图片保存到 `~/.zhihu-cli/login_qrcode.png`
- 登录成功后，Cookie 会保存在 `~/.zhihu-cli/cookies.json`
- `sync_zhihu_cookies.py` 会把它转换到项目使用的 `pipeline/researcher/cookies.json`
- 如果不方便扫码，也可以执行 `zhihu login --cookie "z_c0=...; _xsrf=...; d_c0=..."` 手动导入

完成后即可正常执行：

```bash
python3 pipeline/researcher/download_tmp.py "https://zhuanlan.zhihu.com/p/xxxxxxxx" \
  --output-dir pipeline/researcher/output/manual_downloads
```

#### 2.5.2 接入论文精读 Agent

论文精读阶段默认调用 `GenericAgent/chat_single_round.py`。为了避免每个用户都去改绝对路径，仓库现在提供了一个项目内安装脚本：

```bash
# 默认把 /mnt/petrelfs/wanghaoyu2/GenericAgent 挂到 tools/GenericAgent
bash scripts/setup_generic_agent.sh

# 如果你的 GenericAgent 在别的地方
bash scripts/setup_generic_agent.sh --source /abs/path/to/GenericAgent
```

安装完成后，`content/run.sh` 会按下面顺序自动查找 agent：

1. 环境变量 `GENERIC_AGENT_ROOT`
2. 项目内 `tools/GenericAgent`
3. 兼容旧路径 `/mnt/petrelfs/wanghaoyu2/GenericAgent`

因此新用户通常不需要再改脚本路径，直接运行：

```bash
bash content/run.sh content/llm/llm_rl.yaml
```

常用命令：

```bash
# 手工下载一篇综述
python3 pipeline/researcher/download_tmp.py "https://zhuanlan.zhihu.com/p/xxxxxxxx" \
  --output-dir pipeline/researcher/output/manual_downloads

# 生成 topic YAML（先 dry-run 看 prompt）
python3 pipeline/researcher/deep_research.py \
  --domain llm \
  --topic-id llm_rl \
  --topic-name "LLM强化学习" \
  --output content/llm/llm_rl.yaml \
  --dry-run

# 装配最终知识文档
python3 pipeline/assemble.py content/llm/llm_rl.yaml
```

如果希望把两篇人工综述稳定绑定到某个专题，建议在 `content/<domain>/<topic>.sources.yaml` 中写：

```yaml
overview:
  include_raw: pipeline/researcher/output/RL_survey_old/xxx/article.md

latest_overview:
  include_raw: pipeline/researcher/output/RL_survey_new/yyy/article.md
```

这样重新装配时，不会把人工挑选的综述冲掉。

### 3️⃣ 我是平台维护者（编译器开发）

```bash
# 全量编译：默认扫描 content/ 下所有合规 .md
python3 pipeline/build.py

# 若希望把 pipeline/examples/ 下的示例文档也一并编译
python3 pipeline/build.py --include-examples

# 只刷新聚合页（首页 + 所有 pages/<domain>/index.html）
# 适用场景：只改了 DOMAIN_CATALOG 或首页静态 HTML
python3 pipeline/build.py --only-index

# 完整回归：编译示例 + 干跑校验
python3 pipeline/build.py pipeline/examples/rl_demo.md --dry-run
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
