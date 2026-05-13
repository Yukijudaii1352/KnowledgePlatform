# AI 研究博客搜集 Pipeline

基于用户提供的 AI 研究领域关键词（如 "LLM 强化学习"），自动从多源搜索、排序、下载最全面和专业的博客与文章。

## ✨ 功能

- **多源搜索聚合**：DuckDuckGo(HTML) + Bing(中/英) + arxiv API + HuggingFace Blog + PapersWithCode
- **LLM 查询扩展**：调用高性能大模型把主题扩展成 8-14 条互补 query，覆盖中英文、综述/原理/教程等多种意图
- **两阶段排序**：
  - 启发式打分：`platform_weight × query_match × 1/log(rank)  × query_hits_bonus`
  - LLM Judge 精排：从 *relevance / expertise / coverage / uniqueness* 4 维度打分，融合分 = `0.4×启发式 + 0.6×LLM`
  - 平台多样性约束：防止某单一平台（如 CSDN）淹没结果
- **完整下载**：`trafilatura` 正文提取 → Markdown + 原 HTML + 图片打包 + metadata.json
- **反爬 Fallback**：直连 → `r.jina.ai` 反代兜底；支持 `cookies.json` 解锁受限平台

## 📦 依赖

```bash
pip install requests beautifulsoup4 lxml trafilatura readability-lxml \
            markdownify html2text
```

另需工作区已有的 `cal_vlm.py`（调用 Venus / gpt-5.4 等高性能大模型）。

## 🚀 快速开始

```bash
cd /data/workspace/KnowledgePipeline/pipeline/researcher
python3 main.py "LLM 强化学习"
```

输出结构（`./output/LLM_强化学习_<timestamp>/`）：
```
output/
└── LLM_强化学习_20260506_163000/
    ├── report.md                 # 精选博客榜单 + LLM 点评
    ├── report.json               # 结构化报告
    ├── all_candidates.json       # 所有候选（含未入选的）
    └── blogs/
        ├── huggingface__Illustrating_RLHF__abcd1234/
        │   ├── article.md        # 正文 markdown（图片已替换为本地路径）
        │   ├── raw.html          # 原始 HTML
        │   ├── metadata.json     # 标题/作者/评分/URL...
        │   └── images/
        │       ├── img_000_*.png
        │       └── ...
        └── ...
```

## ⚙️ 常用选项

```bash
# 只要 Top-5
python3 main.py "LLM 强化学习" --top 5

# 扩大召回规模
python3 main.py "LLM 强化学习" --per-source 25 --heuristic-top 60

# 不用 LLM Judge（省 token，仅启发式）
python3 main.py "LLM 强化学习" --no-llm-judge

# 不下载图片（快速）
python3 main.py "LLM 强化学习" --no-images

# 自己指定 queries
python3 main.py "LLM 强化学习" --queries "RLHF survey|DPO vs PPO|huggingface blog rlhf"

# 带 cookies 突破反爬
python3 main.py "LLM 强化学习" --cookies ./cookies.json
```

完整参数见 `python3 main.py -h`。

## 🔐 关于反爬 / 需要用户提供的信息

AnyDev 开发机为无头 Linux，以下站点**需要登录态**才能正常抓取：

| 平台 | 状态 | 解法 |
|------|------|------|
| 知乎 zhihu.com / zhuanlan.zhihu.com | ❌ 直连 403 | 请提供有效的 `z_c0` / `d_c0` cookie（从浏览器 F12 拷贝） |
| Medium medium.com | ⚠️ 首页/搜索 403 | 请提供 `sid` / `uid` cookie |
| OpenAI blog | ⚠️ 403 | Cookie 也难绕过，一般跳过；通过搜索引擎摘要已可覆盖 |

已验证**无需 cookie** 可抓取的主流平台：
- ✅ CSDN、博客园、掘金、简书
- ✅ 机器之心、PaperWeekly、火山/InfoQ 等开发者社区
- ✅ arxiv、HuggingFace、PapersWithCode、GitHub
- ✅ TowardsDataScience、KDnuggets、Sebastian Raschka 博客等

若不提供 cookie，pipeline 依然能运行：
1. 搜索引擎返回的**标题+摘要**仍然会参与排序
2. 知乎被选中后，正文抓取失败会记录 `failed_fetch`，其它条目不受影响
3. 可用 `--no-arxiv` / `--no-hf` / `--no-pwc` 等开关按需启停数据源

### 怎样导出知乎 Cookie？

1. 浏览器访问 zhihu.com 并登录
2. F12 → Application → Cookies → `https://www.zhihu.com`
3. 复制 `z_c0`、`d_c0`、`_xsrf` 三个字段的 Value
4. 将 `cookies.example.json` 重命名为 `cookies.json`，填入对应值

## 🧩 文件清单

| 文件 | 说明 |
|------|------|
| `cal_vlm.py` | （已有）Venus 大模型 API 封装 |
| `llm_client.py` | LLM 薄封装，提供 `chat` / `chat_json` |
| `http_utils.py` | HTTP 会话 / UA 轮换 / Cookie / 反爬 fallback |
| `searcher.py` | 多源搜索聚合器 |
| `query_expander.py` | 用 LLM 扩展 query |
| `ranker.py` | 启发式打分 + LLM Judge 精排 |
| `downloader.py` | 正文 + 图片下载器 |
| `main.py` | CLI 入口，串联整个 pipeline |
| `cookies.example.json` | Cookie 模板 |

## 🧠 排序算法设计

### 设计目标（优先级从高到低）

1. **来源权威**（优先知乎）
2. **不要论文，只要博客**
3. **丰富全面，覆盖所有相关方法**
4. **时效性强**
5. **受欢迎**
6. **由人类而非AI撰写**

### 阶段 1：启发式分

```
heuristic = platform_authority
          × (0.25 + 0.75 × query_match)
          × 1/log2(rank+3)
          × query_hits_bonus
          × timeliness_factor
          × popularity_signal
          × human_written_signal
          × survey_comprehensiveness
          × chinese_bonus
          × empty_penalty
```

平台权重举例（体现知乎优先策略）：
- 知乎=1.8（最高）
- 机器之心=1.45, HuggingFace/Lilian Weng/Karpathy=1.45-1.5
- 博客园/掘金=1.05
- CSDN=0.85（因 AI 生成率高被降权）
- arxiv/paperswithcode=0.1（论文站点硬惩罚）

### 阶段 2：多样性与去重

- 平台配额：知乎 max+3（宽松）、CSDN max-1（收紧）、其他默认
- 标题相似度去重（Jaccard > 0.7 的视为换皮文章）
- 方法覆盖多样性：最终选择时确保不同方法/子技术都有文章覆盖

### 阶段 3：LLM Judge（6 维度评分）

把 Top-K 按 batch 送入大模型，从 6 个维度打分（0-10）：
- `authority`：来源权威性（权重 0.25）
- `relevance`：相关性 + 是否为博客非论文（权重 0.20）
- `coverage`：对主题各子方法的覆盖程度（权重 0.20）
- `timeliness`：时效性（权重 0.15）
- `popularity`：受欢迎/被认可程度（权重 0.10）
- `human_original`：人类原创性（权重 0.10）

### 阶段 4：融合

```
final_score = 0.35 × heuristic_norm + 0.65 × (llm_total / 10)
```

LLM 评分缺失时回退为 `0.75 × heuristic_norm`。

### 阶段 5：方法覆盖选择

最终选择 Top-N 时，如果多篇文章讨论的方法高度重叠，优先保留覆盖新方法的文章。
