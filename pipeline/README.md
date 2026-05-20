# Knowledge Platform · 页面生成 Pipeline

一个把 **一篇结构化 Markdown 知识文档** 稳定编译为 **一个完整的二级标签前端页面** 的流水线。

另外，仓库现在也包含一条更完整的**内容生产链路**：

1. 人工筛选综述文章并下载为 markdown
2. `deep_research.py` 生成专题级中间 YAML（算法列表 / 类别 / 图谱 / 页面元信息）
3. `content/run.sh` 批量驱动论文精读 agent，产出 `*_detail.md`
4. `assemble.py` 把综述 + 中间 YAML + detail markdown 装配成最终知识文档

## 设计哲学

> **Agent 只生产"数据"，不生产"代码"。**
>
> 文档是唯一信息源（Single Source of Truth），页面模板与渲染逻辑固化在平台侧。

## 架构总览

```
                        ┌────────────────────────────────┐
 写作者 / Agent  ──►    │  pipeline/examples/xxx.md      │  （规范见 DOCUMENT_SPEC.md）
                        │  一篇结构化 Markdown 文档       │
                        └───────────────┬────────────────┘
                                        │  python3 pipeline/build.py xxx.md
                                        ▼
                        ┌────────────────────────────────┐
                        │  pipeline/build.py             │
                        │  - YAML front-matter 校验       │
                        │  - 4 大板块切分 / 解析          │
                        │  - 交叉引用闭合校验              │
                        │  - 渲染占位符 + 生成 data.js    │
                        └───────────────┬────────────────┘
                                        ▼
┌──────────────────────────────────────────────────────────────┐
│  pages/{domain}/{topic_id}.html      ← 模板 (占位符已注入)   │
│  pages/{domain}/{topic_id}-data.js   ← 编译产物 (PAGE_CONFIG) │
│  pages/{domain}/{topic_id}-logic.js  ← 通用渲染 (模板复制)    │
└──────────────────────────────────────────────────────────────┘
                                        ▼
                              浏览器加载 → 稳定统一的页面
```

## 目录结构

```
KnowledgePlatform/
├─ index.html                     # 首页（一级领域入口）
├─ assets/
│  └─ css/
│     ├─ common.css               # 全局基础样式
│     └─ page.css                 # 二级标签页通用样式 (新)
├─ pipeline/                      # 页面生成 pipeline (新)
│  ├─ build.py                    # 编译器 CLI
│  ├─ DOCUMENT_SPEC.md            # ⭐ 文档写作规范（Agent 的唯一提示词来源）
│  ├─ templates/
│  │  ├─ page-template.html       # 通用 HTML 模板（有占位符）
│  │  └─ page-logic.js            # 通用渲染逻辑
│  └─ examples/
│     └─ rl_demo.md               # 最小示例文档（用作写作样板）
├─ content/                       # 源文档归档区
└─ pages/                         # 编译产物（按一级领域分目录）
   ├─ llm/
   ├─ embodied/
   └─ ...
```

## 快速上手

### 1. 安装依赖（一次性）

```bash
pip install pyyaml markdown
```

### 2. 按规范写文档

参考 [`pipeline/DOCUMENT_SPEC.md`](./DOCUMENT_SPEC.md)，或拷贝 [`pipeline/examples/rl_demo.md`](./examples/rl_demo.md) 改写。

> Agent 的工作就是按照 DOCUMENT_SPEC.md 产出这样一份 `.md` 文档，**不用再生成 HTML / JS**。

### 3. 编译

```bash
python3 pipeline/build.py pipeline/examples/rl_demo.md
```

输出：
```
[OK] pages/llm/rl_demo.html
[OK] pages/llm/rl_demo-data.js
[OK] pages/llm/rl_demo-logic.js
🎉 编译完成，访问：pages/llm/rl_demo.html
```

### 4. 本地预览

```bash
python3 -m http.server 8765
# 浏览器打开 http://127.0.0.1:8765/pages/llm/rl_demo.html
```

## 常用命令

```bash
# 干跑（只做校验，不落盘，用于 CI）
python3 pipeline/build.py path/to/doc.md --dry-run

# 同时拷贝本地图片到 assets/
python3 pipeline/build.py path/to/doc.md --copy-images

# 全量编译时额外带上 pipeline/examples/ 下的示例文档
python3 pipeline/build.py --include-examples
```

## 内容生产链路

### 1. 手工下载综述文章

```bash
pip install -e pipeline/researcher/zhihu-cli
zhihu login --qrcode
zhihu status
python3 pipeline/researcher/sync_zhihu_cookies.py

python3 pipeline/researcher/download_tmp.py "https://zhuanlan.zhihu.com/p/xxxxxxxx" \
  --output-dir pipeline/researcher/output/manual_downloads
```

下载结果中会包含 `article.md / raw.html / metadata.json`。

说明：

- `zhihu login --qrcode` 会将二维码保存到 `~/.zhihu-cli/login_qrcode.png`
- 登录成功后，`zhihu-cli` 会将 Cookie 保存到 `~/.zhihu-cli/cookies.json`
- `sync_zhihu_cookies.py` 会把 Cookie 同步到 `pipeline/researcher/cookies.json`
- 如果不想扫码，也可以用 `zhihu login --cookie "z_c0=...; _xsrf=...; d_c0=..."` 手动导入

### 2. 生成专题中间 YAML

```bash
cd pipeline/researcher
python3 deep_research.py \
  --domain llm \
  --topic-id llm_rl \
  --topic-name "LLM强化学习" \
  --page-title "LLM强化学习算法演进" \
  --output ../../content/llm/llm_rl.yaml \
  --dry-run
```

去掉 `--dry-run` 后会调用外部研究模型 API，输出兼容现有 `content/<domain>/<topic>.yaml` 的中间文件。

### 3. 批量生成算法精读 markdown

```bash
# 默认把外部 GenericAgent 接到项目内 tools/GenericAgent
bash scripts/setup_generic_agent.sh

# 如需指定其他位置：
# bash scripts/setup_generic_agent.sh --source /abs/path/to/GenericAgent

bash content/run.sh /abs/path/to/content/llm/llm_rl.yaml
```

它会读取 YAML 中的 `algorithms` 列表，并在 `content/llm/llm_rl/` 下生成或更新每个算法对应的 `*_detail.md`。

`content/run.sh` 会按以下顺序查找 GenericAgent：

1. `GENERIC_AGENT_ROOT`
2. `tools/GenericAgent`
3. `/mnt/petrelfs/wanghaoyu2/GenericAgent`

### 4. 装配最终知识文档

```bash
# 单专题装配
python3 pipeline/assemble.py content/llm/llm_rl.yaml

# 全量装配
python3 pipeline/assemble.py

# 只检查，不落盘
python3 pipeline/assemble.py content/llm/llm_rl.yaml --dry-run --report-json temp/report.json
```

装配器会：

- 读取 `topic.yaml`
- 读取同名目录下的 `*_detail.md`
- 优先复用现有 `topic.md` 中的 `## 领域综述` 和 `## 最新进展综述`
- 若存在 `topic.sources.yaml` / `topic.survey.yaml`，则优先按该配置注入人工综述
- 若缺少综述或 detail，则保留占位模板并在报告里标出缺口

综述 sidecar 配置示例：

```yaml
overview:
  include_raw: pipeline/researcher/output/RL_survey_old/xxx/article.md

latest_overview:
  include_raw: pipeline/researcher/output/RL_survey_new/yyy/article.md
```

## 常见错误

| 错误信息                                                                   | 原因                                                          |
|----------------------------------------------------------------------------|---------------------------------------------------------------|
| `文档顶部未检测到 YAML front-matter`                                        | 文档缺少 `---` front-matter 块                                |
| `domain=xxx 不在白名单`                                                     | front-matter.domain 必须来自 8 个一级领域枚举之一              |
| `缺少 ## 领域综述 板块`                                                     | 3 个一级 `##` 板块（领域综述/算法演化关系/核心算法）必须都存在 |
| `图谱节点在 ## 核心算法 中找不到对应算法：[xxx]`                             | 图谱里写了一个 node，但 `## 核心算法` 下没对应 `id` 的 `###`   |
| `算法 xxx 缺少 `#### 📝 一句话总结``                                         | 某算法子小节不齐全，查阅 DOCUMENT_SPEC §4                     |
| `算法 xxx 的 category=xxx 不在 front-matter.categories 中`                   | category 字段必须是 `categories` 里声明过的 key               |

## Roadmap

- [x] Phase 1：markdown → data.js 自动编译
- [x] Phase 1：可视化交互（时间线 / 图谱 / 筛选 / 对比 / Quiz）
- [ ] Phase 2：每页嵌入知识库 Chat Agent（基于 data.js 的问答）
- [ ] Phase 3：自动从规范文档生成 sitemap 和首页专题卡片数量
- [ ] Phase 3：CI 集成（PR 里修改文档 → 自动跑 `build.py --dry-run` 做校验）
