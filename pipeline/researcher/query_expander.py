"""
查询扩展：用 LLM 根据用户给定的研究领域关键词，生成多个高质量搜索 query。

策略（优化版，服务于以下优先级需求）：
  1. 来源权威（优先知乎）：大量 site:zhihu.com 定向查询
  2. 不要论文，只要博客：明确排除论文站点，query 中强调"博客/综述/教程"
  3. 丰富全面，覆盖所有方法：拆分子主题、方法名，扩大方法覆盖
  4. 时效性强：带年份/最新修饰，搜索引擎倾向新结果
  5. 受欢迎：带"高赞/推荐/精华"修饰，引导高质量结果
  6. 由人类撰写：query 中隐式引导优质平台
"""
import time
from typing import List

from llm_client import chat_json

SYSTEM = (
    "你是一个精通 AI / 机器学习 / 大模型领域的资深研究员，熟悉国内外各大技术博客平台。"
    "你的任务是把用户给定的研究领域主题，扩展为 14-18 条高质量的搜索 query，"
    "用于在搜索引擎中召回该领域**最新、最系统、最全面的中文博客综述**。"
    "注意我们要的是**博客/综述/教程/梳理文章**，绝对不要学术论文本身。"
    "优先平台：知乎 > 机器之心 > 博客园/掘金/CSDN > HuggingFace blog。"
    "必须输出合法 JSON，不要任何额外解释。"
)

USER_TMPL = """研究主题: {topic}

生成要求：
1. 共 14-18 条 query，分为以下几类：
   
   **A. 知乎定向搜索（至少 5 条）**：
   - `site:zhihu.com <topic> 综述/梳理/系统介绍`
   - `site:zhihu.com <topic> 各方法对比/最新进展`
   - `site:zhihu.com <子方法名1> 原理 详解`（用具体子方法名替换）
   - `site:zhihu.com <子方法名2> 原理 实现`（另一个子方法名）
   - `site:zhihu.com <topic> 技术路线 全面总结 {cur_year}`
   
   **B. 中文通用搜索（至少 5 条）**：
   - 覆盖不同子方法/子技术的综述博客（每条 query 聚焦不同的子方法名）
   - 带"博客/综述/梳理/教程/全面解读/通俗讲解"修饰
   - 至少 2 条带时效修饰（{cur_year} / {prev_year} / 最新）
   - 至少 1 条带"高赞/推荐/经典"等受欢迎度暗示
   
   **C. 英文博客搜索（2-4 条）**：
   - 带 "blog / tutorial / overview / explained / illustrated" 修饰
   - 面向 HuggingFace blog / Medium / 个人博客
   - 不要定向 arxiv / paperswithcode
   
   **D. 子方法拆分查询（至少 3 条）**：
   - 把研究主题拆分为 3-5 个重要子方法/子技术（例如对于"LLM强化学习"→ PPO/DPO/GRPO/RLHF/RLAIF/KTO 等）
   - 每个子方法生成一条搜索 query，格式如 `<子方法名> 原理 详解 博客`

2. **关键约束**：
   - 总共 ≥ 60% 为中文 query
   - 不同 query 之间必须**覆盖不同的子方法/子角度**，避免雷同
   - 严禁生成 `site:arxiv.org` / `site:paperswithcode.com` / `site:openreview.net` 等定向论文站搜索
   - 严禁只有"paper/论文/arxiv"意图的 query
   - query 不要加引号

输出严格 JSON：
{{"queries": ["...", "...", ...], "sub_methods": ["method1", "method2", ...]}}

其中 `sub_methods` 列出你识别到的该领域 5-8 个重要子方法/子技术名称（中英文均可）。
"""


_PAPER_SITE_BLACKLIST = (
    "site:arxiv.org",
    "site:paperswithcode.com",
    "site:openreview.net",
    "site:aclanthology.org",
    "site:semanticscholar.org",
)


def _filter_bad_queries(qs: List[str]) -> List[str]:
    """过滤掉明显定位到论文平台的 query。"""
    out = []
    for q in qs:
        ql = q.lower()
        if any(bad in ql for bad in _PAPER_SITE_BLACKLIST):
            continue
        # 过滤纯论文意图
        if "arxiv" in ql and "site:" not in ql and "博客" not in ql and "blog" not in ql:
            continue
        out.append(q)
    return out


def expand_queries(topic: str, model: str = "gpt-5.4") -> List[str]:
    cur_year = time.strftime("%Y")
    prev_year = str(int(cur_year) - 1)
    resp = chat_json(
        [
            {"role": "system", "content": SYSTEM},
            {
                "role": "user",
                "content": USER_TMPL.format(
                    topic=topic, cur_year=cur_year, prev_year=prev_year
                ),
            },
        ],
        model=model,
    )
    # 解析返回
    sub_methods = []
    if isinstance(resp, dict):
        qs = resp.get("queries", [])
        sub_methods = resp.get("sub_methods", [])
    elif isinstance(resp, list):
        qs = resp
    else:
        qs = []

    # 清洗 & 去重
    out = []
    seen = set()
    for q in qs:
        if not isinstance(q, str):
            continue
        q = q.strip().strip('"').strip("'")
        if not q or q.lower() in seen:
            continue
        seen.add(q.lower())
        out.append(q)
    # 过滤论文站点定向搜索
    out = _filter_bad_queries(out)

    # 兜底：确保原 topic 在最前
    if topic and topic.lower() not in seen:
        out.insert(0, topic)
        seen.add(topic.lower())

    # 兜底：如果 LLM 没给足够的知乎定向搜索，手动补
    zhihu_count = sum(1 for q in out if "zhihu.com" in q.lower() or "知乎" in q)
    if zhihu_count < 4:
        extras = [
            f"site:zhuanlan.zhihu.com {topic} 综述 梳理",
            f"site:zhuanlan.zhihu.com {topic} 最新方法 对比",
            f"site:zhihu.com {topic} 原理 教程 {cur_year}",
            f"知乎 {topic} 高赞 专栏文章",
        ]
        for eq in extras:
            if eq.lower() not in seen and zhihu_count < 5:
                out.insert(min(2, len(out)), eq)
                seen.add(eq.lower())
                zhihu_count += 1

    # 兜底：确保至少有 zhuanlan 专项搜索
    has_zhuanlan = any("zhuanlan" in q.lower() for q in out)
    if not has_zhuanlan:
        zl_q = f"site:zhuanlan.zhihu.com {topic}"
        if zl_q.lower() not in seen:
            out.insert(0, zl_q)
            seen.add(zl_q.lower())

    # 兜底：时效性
    has_time = any(y in q for q in out for y in (cur_year, prev_year, "最新", "latest", "recent"))
    if not has_time:
        out.append(f"{topic} 最新进展 {cur_year}")

    # 兜底：子方法覆盖（用 sub_methods 生成补充 query）
    if sub_methods:
        for sm in sub_methods[:5]:
            q_sm = f"{sm} 原理 详解 博客 {topic}"
            if q_sm.lower() not in seen:
                out.append(q_sm)
                seen.add(q_sm.lower())

    return out[:18]


if __name__ == "__main__":
    for q in expand_queries("LLM 强化学习"):
        print(" -", q)
