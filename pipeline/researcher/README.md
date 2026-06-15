# 知乎综述选择 Pipeline

给定一个 topic，从知乎专栏文章中选择两篇可用于知识页面的综述：

- **领域综述**：阶段性的领域总结，重视体系化、全面性、专业性和可读性。
- **最新进展综述**：最近一段时间的新动向总结，重视时效性和趋势覆盖。

旧版 Top-N 榜单模式仍保留为隐藏兼容能力，但默认流程已经切到“双综述选择”。

## 快速使用

```bash
cd /mnt/petrelfs/wanghaoyu2/KnowledgePipeline
conda activate whaoyu_codex

python3 pipeline/researcher/main.py "LLM 强化学习"
```

常用参数：

```bash
# 只生成选择报告，不下载最终文章
python3 pipeline/researcher/main.py "LLM 强化学习" --no-download

# 不调用 LLM Judge，只用启发式排序
python3 pipeline/researcher/main.py "LLM 强化学习" --no-llm-judge

# 指定输出目录
python3 pipeline/researcher/main.py "VLA 基础模型" -o temp/vla_survey

# 指定知乎 cookie
python3 pipeline/researcher/main.py "LLM 强化学习" --cookies pipeline/researcher/cookies.json
```

## 输出

默认输出到 `./output/<topic>_<timestamp>/`，核心文件：

```text
survey_selection.md       # 人类可读的选择报告
survey_selection.json     # 结构化选择报告
selected_sources.yaml     # 可直接迁移到 content/<domain>/<topic>.sources.yaml
overview/.../article.md   # 领域综述下载结果
latest/.../article.md     # 最新进展综述下载结果
```

`selected_sources.yaml` 形如：

```yaml
overview:
  include_raw: pipeline/researcher/output/.../overview/.../article.md
latest_overview:
  include_raw: pipeline/researcher/output/.../latest/.../article.md
```

把它复制或合并到 `content/<domain>/<topic>.sources.yaml` 后，执行：

```bash
python3 pipeline/assemble.py content/<domain>/<topic>.yaml
python3 pipeline/build.py content/<domain>/<topic>.md
```

## 选择逻辑

流程分四步：

1. **分角色构造 query**：领域综述使用“综述 / 梳理 / 总结 / 技术路线 / 全景 / 原理”等 query；最新进展使用“最新进展 / 近期进展 / 前沿 / 当年年份 / 最新论文”等 query。
2. **知乎专栏召回**：只保留 `zhuanlan.zhihu.com/p/<id>` 文章，过滤问答、想法、视频等内容。
3. **启发式初筛**：只做粗筛，综合 topic 相关性、搜索命中、少量综述/最新提示词、正文结构、时效性；latest 默认按最近 3 个月过滤，候选不足时放宽到 6 个月。互动数据只作为候选池筛选条件，不参与候选之间的排序打分。
4. **LLM Judge 精排**：按角色分别评估相关性、全面性、专业性、可读性、时效性，并输出 `article_type`、`scope`、`topic_focus`、`page_fit`。其中 `topic_focus=drift` 会被拒绝，避免“同属大领域但不围绕当前页面主题”的综述混入。默认会先把 `content/` 主页面目录索引交给 LLM，让它选择 1-3 个相关页面，再把这些页面的压缩内容提供给精排 Judge，优先选择更契合页面定位和结构缺口的综述。

## Cookie

知乎搜索和下载需要登录态。推荐：

```bash
pip install -e pipeline/researcher/zhihu-cli
zhihu login --qrcode
python3 pipeline/researcher/sync_zhihu_cookies.py
```

然后运行主流程即可。手动下载单篇文章仍可使用：

```bash
python3 pipeline/researcher/download_tmp.py "https://zhuanlan.zhihu.com/p/xxxx"
```
