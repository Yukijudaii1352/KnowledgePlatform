"""
排序算法（极简版 —— 仅知乎专栏文章）

优化需求：
  - 所有候选都是知乎专栏文章，不再做平台多样性判断
  - 启发式打分以互动数据（点赞/评论/收藏）为主导
  - 辅以：相关性（标题/摘要 vs topic）、时效性（created_time）、综述倾向标题加分
  - LLM Judge 只打 3 个维度：相关性 / 时效性 / 综述完整度

两阶段：
  1) heuristic_score = interaction_score  (主)
                     * timeliness
                     * (0.5 + 1.0 * relevance)
                     * survey_bonus
  2) llm_total = 0.40*relevance + 0.35*coverage + 0.25*timeliness  (∈ 0..10)
  3) final_score = 0.4 * heuristic_norm + 0.6 * (llm_total/10)
"""
from __future__ import annotations

import math
import re
import time as _time
from typing import Any, Dict, List

# =====================================================================
# 分词 & 相关性
# =====================================================================

def _tokenize(text: str) -> List[str]:
    """粗分词：英文按单词，中文按连续字符串（供子串匹配用）。"""
    if not text:
        return []
    en_words = re.findall(r"[A-Za-z][A-Za-z0-9\-]{1,}", text.lower())
    cn_chars = re.findall(r"[\u4e00-\u9fa5]+", text)
    return en_words + cn_chars


def _query_match_score(query_tokens: List[str], *texts: str) -> float:
    """
    计算 query tokens 与若干文本的匹配度，返回 [0, 1]。
    - 英文：子串存在即命中
    - 中文：整串命中计 1.0；部分字符命中按比例折半
    """
    if not query_tokens:
        return 0.5
    corpus = " ".join(t for t in texts if t).lower()
    if not corpus:
        return 0.0

    hits = 0.0
    total_weight = 0.0
    for tok in query_tokens:
        t = tok.lower()
        if len(t) <= 1:
            continue
        w = 1.0
        total_weight += w
        if re.match(r"^[\u4e00-\u9fa5]+$", t):
            if t in corpus:
                hits += w
            else:
                partial = sum(1 for ch in t if ch in corpus)
                if partial:
                    hits += w * 0.5 * (partial / len(t))
        else:
            if t in corpus:
                hits += w
    if total_weight == 0:
        return 0.5
    return min(1.0, hits / total_weight)


# =====================================================================
# 时效性
# =====================================================================

def _timeliness_score(item: Dict[str, Any]) -> float:
    """
    基于 meta.created_time / updated_time（Unix 秒）判断时效。
    找不到时间则退而求其次，从 title/snippet 里抓 20xx 年份。
    返回倍数，[0.6, 1.5]。
    """
    meta = item.get("meta") or {}
    created = int(meta.get("created_time") or 0)
    updated = int(meta.get("updated_time") or 0)
    # 取较新者
    ts = max(created, updated)

    cur_year = int(_time.strftime("%Y"))
    year: int = 0
    if ts > 10_0000_0000:  # 有有效时间戳
        try:
            year = int(_time.strftime("%Y", _time.localtime(ts)))
        except Exception:
            year = 0
    if year == 0:
        # 从文本抓年份
        text = " ".join([item.get("title", ""), item.get("snippet", "")])
        years = re.findall(r"20[12][0-9]", text)
        if years:
            year = max(int(y) for y in years)

    if year == 0:
        return 1.0  # 中性

    if year >= cur_year:
        return 1.5
    if year == cur_year - 1:
        return 1.3
    if year == cur_year - 2:
        return 1.1
    if year == cur_year - 3:
        return 0.9
    if year <= cur_year - 5:
        return 0.6
    return 0.8


# =====================================================================
# 互动分（点赞/评论/收藏）
# =====================================================================

def _interaction_score(item: Dict[str, Any]) -> float:
    """
    使用 log10 缓慢平滑的互动分：
      score = log10(1 + voteup)   * 1.0
            + log10(1 + comment)  * 0.5
            + log10(1 + zfav)     * 0.8

    典型量级：
      voteup=10 → 1.0; voteup=100 → 2.0; voteup=1000 → 3.0; voteup=10000 → 4.0
      zfav=100  → 0.8×2 = 1.6     (收藏通常比点赞更稀缺)

    最终返回会加上一个 1.0 的基准，确保没有互动的文章也能有 1.0 的 baseline。
    """
    meta = item.get("meta") or {}
    v = max(0, int(meta.get("voteup_count") or 0))
    c = max(0, int(meta.get("comment_count") or 0))
    f = max(0, int(meta.get("zfav_count") or 0))

    score = (
        math.log10(1 + v) * 1.0
        + math.log10(1 + c) * 0.5
        + math.log10(1 + f) * 0.8
    )
    return 1.0 + score


# =====================================================================
# 标题加分：综述/系统性写作
# =====================================================================

_SURVEY_KEYWORDS = [
    "综述", "梳理", "全面", "系统", "盘点", "汇总", "总结",
    "对比", "各方法", "技术路线", "全景", "图谱", "入门到精通",
    "survey", "overview", "comprehensive", "review",
    "comparison", "landscape", "taxonomy",
]


def _survey_bonus(item: Dict[str, Any]) -> float:
    text = (item.get("title", "") + " " + item.get("snippet", "")).lower()
    hits = sum(1 for kw in _SURVEY_KEYWORDS if kw in text)
    if hits >= 3:
        return 1.35
    if hits >= 2:
        return 1.2
    if hits >= 1:
        return 1.1
    return 1.0


# =====================================================================
# 启发式打分
# =====================================================================

def heuristic_score(item: Dict[str, Any], keywords: List[str]) -> float:
    # 1) 相关性
    qtoks: List[str] = []
    for k in keywords:
        qtoks.extend(_tokenize(k))
    relevance = _query_match_score(
        qtoks, item.get("title", ""), item.get("snippet", "")
    )  # 0..1

    # 2) 互动分（主导）
    inter = _interaction_score(item)

    # 3) 时效
    tml = _timeliness_score(item)

    # 4) 综述倾向加分
    sbn = _survey_bonus(item)

    # 5) 搜索排名轻度衰减（知乎自身相关性排序已经较合理，衰减极弱）
    rank = max(1, int(item.get("rank", 1)))
    rank_factor = 1.0 / math.log2(rank + 8)  # rank=1 -> 0.33, rank=20 -> 0.22（差距很小）
    # 归一化到 ~1.0 附近，避免压得太死
    rank_factor = 0.7 + rank_factor  # 区间 [~0.92, ~1.03]

    # 6) 多 query 命中加成
    q_hits = len(item.get("queries", []) or [])
    q_bonus = 1.0 + 0.08 * max(0, q_hits - 1)

    score = (
        inter
        * tml
        * (0.5 + 1.0 * relevance)
        * sbn
        * rank_factor
        * q_bonus
    )
    return round(score, 4)


def heuristic_rank(
    items: List[Dict[str, Any]], keywords: List[str]
) -> List[Dict[str, Any]]:
    for it in items:
        it["heuristic_score"] = heuristic_score(it, keywords)
    items.sort(key=lambda x: x["heuristic_score"], reverse=True)
    return items


# =====================================================================
# LLM Judge —— 3 维度
# =====================================================================

_JUDGE_SYSTEM = (
    "你是一个严谨的AI研究博客评审专家。你面对的全部候选都是知乎专栏文章，"
    "请只从以下三个维度打分（每个维度 0-10 的整数）：\n"
    "1. relevance（相关性）：与研究主题的紧密程度，是否直接讨论主题。\n"
    "   - 正文/标题精准围绕主题 = 9-10；明显偏题 = 0-2。\n"
    "2. timeliness（时效性）：\n"
    "   - 2026 内容 = 10；2025 = 8-9；2024 = 6-7；2023 = 4-5；更早 = 1-3。\n"
    "3. coverage（综述完整度）：\n"
    "   - 系统综述，涵盖 5+ 种方法/完整技术路线 = 9-10；\n"
    "   - 涵盖 2-3 种方法的对比/梳理 = 6-7；\n"
    "   - 仅详解单一方法 = 4-5；\n"
    "   - 零散感想或极窄切片 = 1-3。\n"
    "\n必须输出合法的 JSON 数组，不要 markdown、不要解释。"
)

_JUDGE_USER_TMPL = """研究主题: {keywords}

以下有 {n} 条知乎专栏文章候选，请按 3 个维度打分并给出一句话 reason（中文，≤50 字）。

请严格按下面的 JSON 数组格式返回（整数分、不要多余字段、不要 markdown）：
[
  {{"id": 0, "relevance": 9, "timeliness": 8, "coverage": 7, "reason": "xxx"}},
  ...
]

候选列表：
{items_text}
"""


def _format_items_for_judge(items: List[Dict[str, Any]]) -> str:
    lines = []
    for idx, it in enumerate(items):
        title = (it.get("title") or "").replace("\n", " ")[:160]
        snippet = (it.get("snippet") or "").replace("\n", " ")[:260]
        meta = it.get("meta") or {}
        v = meta.get("voteup_count", 0)
        c = meta.get("comment_count", 0)
        f = meta.get("zfav_count", 0)
        # 时间显示
        ts = meta.get("created_time") or meta.get("updated_time") or 0
        date_str = ""
        if ts:
            try:
                date_str = _time.strftime("%Y-%m-%d", _time.localtime(int(ts)))
            except Exception:
                date_str = ""
        author = meta.get("author", "")
        lines.append(
            f"[{idx}] 《{title}》 (作者: {author or '未知'}, 日期: {date_str or '未知'}, "
            f"{v} 赞 / {c} 评 / {f} 藏)\n"
            f"    URL: {it.get('url', '')}\n"
            f"    摘要: {snippet}"
        )
    return "\n".join(lines)


def llm_judge(
    items: List[Dict[str, Any]],
    keywords: List[str],
    batch_size: int = 10,
    model: str = "deepseek-v4-pro",
) -> List[Dict[str, Any]]:
    """
    对候选项逐批送入 LLM 打分。写入 item["llm_scores"] 与 item["llm_total"] 与 item["llm_reason"]。
    """
    kw_str = " | ".join(keywords)
    try:
        from llm_client import chat_json
    except Exception as e:
        print(f"[WARN] LLM judge 不可用：{e}，跳过 LLM 精排。")
        for it in items:
            it.setdefault("llm_scores", None)
            it.setdefault("llm_total", None)
            it.setdefault("llm_reason", "")
        return items

    for start in range(0, len(items), batch_size):
        batch = items[start: start + batch_size]
        prompt = _JUDGE_USER_TMPL.format(
            keywords=kw_str,
            n=len(batch),
            items_text=_format_items_for_judge(batch),
        )
        try:
            resp = chat_json(
                [
                    {"role": "system", "content": _JUDGE_SYSTEM},
                    {"role": "user", "content": prompt},
                ],
                model=model,
            )
        except Exception as e:
            print(f"[WARN] LLM judge 批次失败（{start}..）: {e}，跳过该批。")
            for it in batch:
                it.setdefault("llm_scores", None)
                it.setdefault("llm_total", None)
                it.setdefault("llm_reason", "")
            continue

        if not isinstance(resp, list):
            print(f"[WARN] LLM judge 返回非数组，跳过。片段: {str(resp)[:120]}")
            for it in batch:
                it.setdefault("llm_scores", None)
                it.setdefault("llm_total", None)
                it.setdefault("llm_reason", "")
            continue

        score_map = {}
        for sc in resp:
            try:
                _id = int(sc.get("id"))
                score_map[_id] = sc
            except Exception:
                continue

        for i, it in enumerate(batch):
            sc = score_map.get(i)
            if not sc:
                it["llm_scores"] = None
                it["llm_total"] = None
                it["llm_reason"] = ""
                continue
            scores = {
                "relevance": int(sc.get("relevance", 0) or 0),
                "timeliness": int(sc.get("timeliness", 0) or 0),
                "coverage": int(sc.get("coverage", 0) or 0),
            }
            # clamp 0..10
            for k in scores:
                scores[k] = max(0, min(10, scores[k]))
            it["llm_scores"] = scores
            it["llm_reason"] = (sc.get("reason") or "")[:120]
            it["llm_total"] = round(
                0.40 * scores["relevance"]
                + 0.35 * scores["coverage"]
                + 0.25 * scores["timeliness"],
                3,
            )
    return items


# =====================================================================
# 主入口：final_rank
# =====================================================================

def final_rank(
    items: List[Dict[str, Any]],
    keywords: List[str],
    keep_top: int = 10,
    heuristic_top: int = 30,
    use_llm: bool = True,
    judge_model: str = "deepseek-v4-pro",
    **_ignored,
) -> List[Dict[str, Any]]:
    """
    排序流程：
      1) 启发式打分（互动数据主导）
      2) 取 Top-heuristic_top 送 LLM Judge（3 维度）
      3) 融合分 = 0.4 * heuristic_norm + 0.6 * (llm_total/10)
    兼容旧调用签名：per_platform 等未使用参数会被忽略。
    """
    if not items:
        return []

    # 1) 启发式
    heuristic_rank(items, keywords)
    candidates = items[: max(heuristic_top, keep_top)]

    # 2) 无 LLM 模式：直接按启发式分输出
    if not use_llm:
        for it in candidates:
            it["final_score"] = it.get("heuristic_score", 0.0)
            it.setdefault("llm_scores", None)
            it.setdefault("llm_total", None)
            it.setdefault("llm_reason", "")
        return candidates[:keep_top]

    # 3) LLM Judge
    print(f"  [LLM 精排] 对 Top-{len(candidates)} 候选做 3 维度打分 ...")
    llm_judge(candidates, keywords, batch_size=8, model=judge_model)

    # 4) 融合分
    h_max = max((it.get("heuristic_score", 0.0) for it in candidates), default=1.0) or 1.0
    for it in candidates:
        h_norm = (it.get("heuristic_score", 0.0) / h_max) if h_max else 0.0
        llm_total = it.get("llm_total")
        if llm_total is None:
            # LLM 失败：以启发式为准，但压低避免压过有 LLM 分的
            it["final_score"] = round(0.75 * h_norm, 4)
        else:
            llm_norm = llm_total / 10.0
            it["final_score"] = round(0.4 * h_norm + 0.6 * llm_norm, 4)

    candidates.sort(key=lambda x: x.get("final_score", 0.0), reverse=True)
    return candidates[:keep_top]


if __name__ == "__main__":
    demo = [
        {
            "title": "LLM 强化学习全景综述：从 PPO/DPO 到 GRPO",
            "snippet": "系统梳理大模型强化学习方法",
            "url": "https://zhuanlan.zhihu.com/p/111",
            "platform": "zhihu",
            "rank": 1,
            "source": "zhihu-api",
            "queries": ["LLM 强化学习"],
            "meta": {
                "article_id": "111",
                "voteup_count": 1200,
                "comment_count": 60,
                "zfav_count": 2400,
                "created_time": 1730000000,
                "updated_time": 1730000000,
                "author": "xxx",
                "content_type": "article",
            },
        },
        {
            "title": "DPO 源码解读",
            "snippet": "",
            "url": "https://zhuanlan.zhihu.com/p/222",
            "platform": "zhihu",
            "rank": 2,
            "source": "zhihu-api",
            "queries": ["LLM 强化学习"],
            "meta": {
                "article_id": "222",
                "voteup_count": 30,
                "comment_count": 2,
                "zfav_count": 40,
                "created_time": 1700000000,
                "updated_time": 1700000000,
                "author": "yy",
                "content_type": "article",
            },
        },
    ]
    r = final_rank(demo, ["LLM 强化学习"], keep_top=2, use_llm=False)
    for x in r:
        print(x.get("final_score"), x.get("heuristic_score"), x["title"])
