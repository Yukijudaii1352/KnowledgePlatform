"""Select two Zhihu survey articles for a topic.

The researcher pipeline needs two different articles, not a generic top-N list:

1. overview: an evergreen, stage-level field survey.
2. latest: a recent survey of new movement in roughly the last 1-3 months.

This module keeps the search source narrow (Zhihu articles) but separates query
intent and scoring intent. It is intentionally conservative: title/snippet
heuristics produce a shortlist, optional Zhihu API body enrichment improves the
shortlist, and LLM Judge makes the final role-specific call.
"""

from __future__ import annotations

import json
import math
import re
import time
from copy import deepcopy
from datetime import datetime, timezone
from pathlib import Path
from typing import Any, Dict, Iterable, List

from bs4 import BeautifulSoup

ROLE_OVERVIEW = "overview"
ROLE_LATEST = "latest"
ROLE_LABELS = {
    ROLE_OVERVIEW: "领域综述",
    ROLE_LATEST: "最新进展综述",
}


SURVEY_HINT_TERMS = [
    "综述", "梳理", "总结", "盘点", "全景", "图谱", "技术路线", "路线图",
    "发展史", "演进", "survey", "overview", "review", "landscape",
]

LATEST_HINT_TERMS = [
    "最新", "近期", "进展", "前沿", "趋势", "2025", "2026",
    "recent", "latest", "frontier", "trend",
]

LOW_VALUE_TITLE_HINTS = [
    "文章汇总", "资料汇总", "资源汇总", "链接汇总", "高质量文章", "合集", "目录",
]

BAD_LLM_TYPES = [
    "method_deep_dive",
    "single_paper_news",
    "tutorial_code",
    "resource_list",
    "interview_qa",
]

BAD_TOPIC_FOCUS = {"drift", "off_topic", "unrelated"}


def build_topic_aliases(topic: str) -> list[str]:
    """Generate a small set of high-value aliases for Zhihu search."""
    topic = re.sub(r"\s+", " ", topic.strip())
    aliases = [topic]
    compact = topic.replace(" ", "")
    parts = topic.split()

    # If the first segment is a broad domain and the second segment is specific
    # enough, also search the specific topic by itself.
    broad_prefixes = {
        "计算机视觉", "cv", "CV",
        "具身智能", "多模态", "机器学习", "AI4Sci", "AIGC",
    }
    if len(parts) >= 2 and parts[0] in broad_prefixes and len(parts[-1]) >= 5:
        aliases.append(parts[-1])

    # Domain-specific aliases observed to be much better on Zhihu than the
    # literal page title.
    if "视觉基础模型" in compact:
        aliases.extend([
            "视觉基础模型",
            "视觉大模型",
            "计算机视觉大模型",
            "视觉自监督",
            "视觉表征学习",
        ])
    if "视觉语言动作" in compact or "VLA" in topic.upper():
        aliases.extend(["VLA 模型", "视觉语言动作模型", "具身智能 VLA"])
    if "强化学习" in compact and ("LLM" in topic.upper() or "大语言模型" in compact):
        aliases.extend(["LLM RL", "大模型强化学习", "LLM 后训练 强化学习"])

    return _dedupe(aliases)[:6]


def _dedupe(items: Iterable[str]) -> list[str]:
    out: list[str] = []
    seen: set[str] = set()
    for item in items:
        item = re.sub(r"\s+", " ", str(item or "").strip())
        if not item or item.lower() in seen:
            continue
        seen.add(item.lower())
        out.append(item)
    return out


def build_role_queries(topic: str, role: str, current_year: int | None = None) -> list[str]:
    """Build deterministic Zhihu article queries for one selection role."""
    topic = re.sub(r"\s+", " ", topic.strip())
    current_year = current_year or datetime.now().year
    aliases = build_topic_aliases(topic)

    if role == ROLE_OVERVIEW:
        queries = [topic]
        for alias in aliases:
            queries.extend([
                f"{alias} 综述",
                f"{alias} 梳理",
                f"{alias} 总结",
                f"{alias} 技术路线",
            ])
        queries.extend([f"{aliases[0]} 全景", f"{aliases[0]} 原理", f"{aliases[0]} survey"])
        return _dedupe(queries)[:18]
    if role == ROLE_LATEST:
        prev_year = current_year - 1
        queries = []
        for alias in aliases:
            queries.extend([
                f"{alias} 最新进展",
                f"{alias} 近期进展",
                f"{alias} 前沿",
                f"{alias} {current_year}",
            ])
        queries.extend([
            f"{aliases[0]} {prev_year} {current_year}",
            f"{aliases[0]} 最新论文",
            f"{aliases[0]} 论文汇总 {current_year}",
            f"{aliases[0]} 综述 {current_year}",
            f"{aliases[0]} trend",
        ])
        return _dedupe(queries)[:18]
    raise ValueError(f"unknown role: {role}")


def topic_focus_guidance(topic: str) -> str:
    return (
        "请先根据研究主题和页面内容参考，归纳这个页面的核心研究对象、核心技术主线、"
        "上位大领域以及相邻但非核心的方向。候选文章只有直接覆盖核心研究对象或核心技术主线时，"
        "才能标记 topic_focus=exact；如果只是相邻方向、能补充页面但不是主线，标记 adjacent；"
        "如果只是命中了上位大领域词，或是同一大领域下的另一个专题综述，标记 drift。"
        "不要因为标题含有“综述/前沿/最新/趋势”或命中了宽泛领域词就提高相关性。"
    )


def _tokenize(text: str) -> list[str]:
    if not text:
        return []
    en = re.findall(r"[a-zA-Z][a-zA-Z0-9_+\-.]{1,}", text.lower())
    cn = re.findall(r"[\u4e00-\u9fff]{2,}", text)
    return en + cn


def _query_match(topic: str, item: dict[str, Any]) -> float:
    toks = _tokenize(topic)
    if not toks:
        return 0.5
    corpus = " ".join([
        item.get("title", ""),
        item.get("snippet", ""),
        " ".join(item.get("queries", []) or []),
    ]).lower()
    score = 0.0
    total = 0.0
    for tok in toks:
        if len(tok) <= 1:
            continue
        total += 1.0
        t = tok.lower()
        if re.match(r"^[\u4e00-\u9fff]+$", t):
            if t in corpus:
                score += 1.0
            else:
                # Chinese topic strings are often longer than title wording.
                hit = sum(1 for ch in t if ch in corpus)
                if hit:
                    score += 0.45 * hit / len(t)
        elif t in corpus:
            score += 1.0
    return min(1.0, score / total) if total else 0.5


def _text_for_item(item: dict[str, Any]) -> str:
    features = item.get("body_features") or {}
    return " ".join([
        str(item.get("title") or ""),
        str(item.get("snippet") or ""),
        " ".join(features.get("headings") or []),
        str(features.get("preview") or ""),
    ]).lower()


def _keyword_count(text: str, keywords: list[str]) -> int:
    lowered = text.lower()
    return sum(1 for kw in keywords if kw.lower() in lowered)


def interaction_counts(item: dict[str, Any]) -> dict[str, int]:
    meta = item.get("meta") or {}
    return {
        "voteup": max(0, int(meta.get("voteup_count") or 0)),
        "comment": max(0, int(meta.get("comment_count") or 0)),
        "fav": max(0, int(meta.get("zfav_count") or 0)),
    }


def interaction_total(item: dict[str, Any]) -> int:
    counts = interaction_counts(item)
    # 评论和收藏比点赞更稀缺，作为筛选信号略加权。
    return counts["voteup"] + counts["comment"] * 3 + counts["fav"] * 2


def prefer_interacted_candidates(
    items: list[dict[str, Any]],
    *,
    min_keep: int,
    min_interaction: int = 1,
) -> list[dict[str, Any]]:
    """Prefer candidates with interaction, but keep fallback for sparse topics."""
    if not items:
        return []
    interacted = [item for item in items if interaction_total(item) >= min_interaction]
    if len(interacted) >= min_keep:
        return interacted
    return items


def _best_timestamp(item: dict[str, Any]) -> int:
    meta = item.get("meta") or {}
    vals = []
    for key in ("updated_time", "created_time"):
        try:
            vals.append(int(meta.get(key) or 0))
        except Exception:
            pass
    return max(vals or [0])


def _date_str(ts: int) -> str:
    if not ts:
        return ""
    try:
        return time.strftime("%Y-%m-%d", time.localtime(ts))
    except Exception:
        return ""


def _days_old(item: dict[str, Any], now_ts: int | None = None) -> int | None:
    ts = _best_timestamp(item)
    if not ts:
        return None
    now_ts = now_ts or int(time.time())
    return max(0, int((now_ts - ts) / 86400))


def _recency_multiplier(item: dict[str, Any], role: str) -> float:
    days = _days_old(item)
    if days is None:
        return 0.94 if role == ROLE_LATEST else 1.0

    if role == ROLE_LATEST:
        if days <= 45:
            return 1.45
        if days <= 90:
            return 1.30
        if days <= 120:
            return 1.15
        if days <= 180:
            return 0.92
        if days <= 365:
            return 0.68
        return 0.42

    # Overview should be current, but not necessarily from the last month.
    if days <= 180:
        return 1.12
    if days <= 540:
        return 1.04
    if days <= 900:
        return 0.92
    return 0.78


def _shape_multiplier(item: dict[str, Any], role: str) -> float:
    text = _text_for_item(item)
    title = str(item.get("title") or "").lower()
    survey_hits = _keyword_count(text, SURVEY_HINT_TERMS)
    latest_hits = _keyword_count(text, LATEST_HINT_TERMS)
    low_value_hits = _keyword_count(title, LOW_VALUE_TITLE_HINTS)
    body = item.get("body_features") or {}
    body_chars = int(body.get("text_chars") or 0)
    heading_count = int(body.get("heading_count") or 0)
    ref_count = int(body.get("paper_ref_count") or 0)

    mult = 1.0
    if survey_hits >= 2:
        mult *= 1.14
    elif survey_hits == 1:
        mult *= 1.06

    if body_chars:
        if body_chars >= 12000:
            mult *= 1.12
        elif body_chars >= 6000:
            mult *= 1.06
        elif body_chars < 1800:
            mult *= 0.84
    if heading_count >= 5:
        mult *= 1.06
    if ref_count >= 3:
        mult *= 1.04

    if role == ROLE_LATEST:
        if latest_hits >= 2:
            mult *= 1.12
        elif latest_hits == 1:
            mult *= 1.05
        else:
            mult *= 0.86
    else:
        if survey_hits == 0:
            mult *= 0.92

    # Keep this as a weak fallback only. LLM Judge owns article-type decisions.
    if low_value_hits:
        mult *= 0.78

    return mult


def heuristic_role_score(item: dict[str, Any], topic: str, role: str) -> float:
    relevance = _query_match(topic, item)
    rank = max(1, int(item.get("rank") or 1))
    rank_factor = 0.78 + 1.0 / math.log2(rank + 7)
    query_hits = len(item.get("queries", []) or [])
    query_bonus = 1.0 + 0.05 * max(0, min(query_hits - 1, 6))
    role_query_hits = len((item.get("role_queries") or {}).get(role, []) or [])
    role_query_bonus = 1.0 + 0.08 * max(0, min(role_query_hits - 1, 5))

    score = (
        (0.35 + 1.15 * relevance)
        * rank_factor
        * query_bonus
        * role_query_bonus
        * _recency_multiplier(item, role)
        * _shape_multiplier(item, role)
    )
    return round(score, 4)


def _body_features_from_html(html: str) -> dict[str, Any]:
    soup = BeautifulSoup(html or "", "lxml")
    for tag in soup(["script", "style", "noscript"]):
        tag.decompose()
    headings = [
        h.get_text(" ", strip=True)
        for h in soup.find_all(["h1", "h2", "h3"])
        if h.get_text(" ", strip=True)
    ]
    text = soup.get_text("\n", strip=True)
    text = re.sub(r"\n{3,}", "\n\n", text)
    paper_ref_count = len(re.findall(r"(arxiv|论文|paper|\[[0-9]{1,3}\]|et al\.)", text, flags=re.I))
    return {
        "text_chars": len(text),
        "heading_count": len(headings),
        "headings": headings[:14],
        "paper_ref_count": paper_ref_count,
        "preview": text[:1400],
    }


def enrich_items_with_body(items: list[dict[str, Any]], limit: int = 12) -> None:
    """Best-effort in-place enrichment with Zhihu API article body features."""
    if limit <= 0:
        return
    try:
        from downloader import _fetch_zhihu_via_api
    except Exception as exc:
        print(f"[WARN] 正文特征抓取不可用：{exc}")
        return

    done = 0
    for item in items:
        if done >= limit:
            return
        if item.get("body_features") or item.get("platform") != "zhihu":
            continue
        try:
            data = _fetch_zhihu_via_api(item.get("url", ""))
        except Exception:
            data = None
        item["body_enriched"] = bool(data and data.get("content_html"))
        if not data or not data.get("content_html"):
            continue
        done += 1
        if data.get("title"):
            item["title"] = data["title"]
        meta = item.setdefault("meta", {})
        if data.get("author"):
            meta["author"] = data["author"]
        for src_key, dst_key in (
            ("voteup", "voteup_count"),
            ("comment_count", "comment_count"),
            ("zfav_count", "zfav_count"),
            ("created", "created_time"),
            ("updated", "updated_time"),
        ):
            if data.get(src_key) not in (None, ""):
                try:
                    meta[dst_key] = int(data[src_key])
                except Exception:
                    meta[dst_key] = data[src_key]
        item["body_features"] = _body_features_from_html(data.get("content_html") or "")


_JUDGE_SYSTEM = """你是一个严格的中文 AI 研究综述筛选专家。

你需要为 KnowledgePipeline 从知乎专栏候选中选择综述文章。请按给定角色打分，并做文章类型判断。
互动数据只作为可信度参考，不能压过是否综述、是否相关、是否覆盖多个方向。

通用标准：
- 相关性：文章是否直接围绕研究主题，而不是擦边讨论。
- 全面性：是否覆盖多个方法、技术路线、阶段、代表工作，而不是只讲单点。
- 专业性：是否有研究脉络、论文/方法名、机制解释，避免营销号或空泛观点。
- 可读性：是否结构清楚，适合读者快速建立领域认知。
- 时效性：发布时间/更新时间是否匹配该角色。
- 页面契合度：如果提供了页面内容，文章是否契合页面定位、分类体系、已有章节和读者预期，并能补充页面缺口而不是重复局部内容。

角色标准：
- 领域综述：优先阶段性总结、体系化综述、技术路线梳理；不要求最近一个月，但不能明显过时。
- 最新进展综述：优先最近 1-3 个月内的前沿综述、近期论文/方向盘点、最新趋势总结。

文章类型定义：
- field_survey：阶段性领域综述，覆盖多条路线或多个代表工作。
- latest_survey：近期进展综述，覆盖最近一段时间多个方向/论文/方法。
- trend_digest：趋势盘点或论文盘点，可作为最新进展综述候选。
- method_deep_dive：单个模型、单篇论文、单个技术路线的深读。
- single_paper_news：单篇论文/模型发布/新闻稿。
- tutorial_code：代码、源码、部署、实战教程。
- resource_list：目录、合集、资源链接集合。
- interview_qa：面经、问答、碎片化问题集合。
- other：无法归入以上类型。

你必须基于标题、摘要、正文片段、目录和命中查询做整体判断。标题里出现“综述/最新”不代表一定是综述；标题里出现具体模型名也不必然排除，关键看正文是否有跨方法、跨论文、跨阶段的覆盖。
必须严格区分“同属上位大领域”和“直接围绕当前页面主题”。同属大领域但没有覆盖当前主题核心对象/核心技术主线的综述，应降低 relevance/page_fit，并标记 topic_focus=drift。

必须输出合法 JSON 数组，不要 markdown、不要解释。"""

_JUDGE_USER_TMPL = """研究主题：{topic}
候选角色：{role_label}

主题边界说明：
{topic_focus_guidance}

页面内容参考：
{page_context}

请为下面 {n} 条知乎文章候选打分。每项必须包含：
- id: 候选编号
- article_type: field_survey/latest_survey/trend_digest/method_deep_dive/single_paper_news/tutorial_code/resource_list/interview_qa/other 之一
- scope: broad/medium/narrow 之一，表示覆盖范围
- topic_focus: exact/adjacent/drift 之一；exact=直接围绕主题核心对象和技术主线，adjacent=相邻且对页面有补充价值，drift=只命中上位大领域或另一个专题
- relevance: 相关性 0-10
- coverage: 全面性/综述性 0-10
- professionalism: 专业性 0-10
- readability: 可读性 0-10
- timeliness: 对当前角色的时效性 0-10
- page_fit: 与页面内容参考的契合度 0-10；如果未提供页面内容，则按研究主题本身判断
- is_survey: 是否适合作为该角色的综述文章，true/false
- is_single_point: 是否主要是单篇论文、单个模型、单个技巧、源码实战、面经问答等窄主题，true/false
- reason: 中文一句话，≤60字

JSON 格式示例：
[
  {{"id": 0, "article_type": "field_survey", "scope": "broad", "topic_focus": "exact", "relevance": 9, "coverage": 8, "professionalism": 8, "readability": 9, "timeliness": 7, "page_fit": 9, "is_survey": true, "is_single_point": false, "reason": "系统梳理多条路线，适合作为领域综述"}}
]

候选列表：
{items_text}
"""


def _format_items_for_judge(items: list[dict[str, Any]]) -> str:
    lines = []
    for idx, item in enumerate(items):
        meta = item.get("meta") or {}
        ts = _best_timestamp(item)
        body = item.get("body_features") or {}
        headings = " / ".join(body.get("headings") or [])[:420]
        preview = str(body.get("preview") or item.get("snippet") or "").replace("\n", " ")[:900]
        queries = " | ".join(item.get("queries", []) or [])[:220]
        lines.append(
            f"[{idx}] 《{item.get('title', '')}》\n"
            f"    URL: {item.get('url', '')}\n"
            f"    作者: {meta.get('author') or '未知'}；日期: {_date_str(ts) or '未知'}；"
            f"互动: {meta.get('voteup_count', 0)}赞/{meta.get('comment_count', 0)}评/{meta.get('zfav_count', 0)}藏\n"
            f"    命中查询: {queries or '无'}\n"
            f"    正文规模: {body.get('text_chars', '未知')} 字；标题数: {body.get('heading_count', '未知')}；论文线索: {body.get('paper_ref_count', '未知')}\n"
            f"    目录标题: {headings or '未知'}\n"
            f"    摘要/正文片段: {preview}"
        )
    return "\n".join(lines)


def _as_bool(value: Any) -> bool:
    if isinstance(value, bool):
        return value
    return str(value).strip().lower() in {"1", "true", "yes", "y", "是"}


def _clamp_score(value: Any) -> int:
    try:
        return max(0, min(10, int(round(float(value)))))
    except Exception:
        return 0


def _norm_label(value: Any) -> str:
    return str(value or "").strip().lower()


def _llm_total(scores: dict[str, Any], role: str) -> float:
    rel = _clamp_score(scores.get("relevance"))
    cov = _clamp_score(scores.get("coverage"))
    pro = _clamp_score(scores.get("professionalism"))
    rea = _clamp_score(scores.get("readability"))
    tim = _clamp_score(scores.get("timeliness"))
    fit = _clamp_score(scores.get("page_fit"))
    if fit <= 0:
        fit = rel
    article_type = _norm_label(scores.get("article_type"))
    scope = _norm_label(scores.get("scope"))
    focus = _norm_label(scores.get("topic_focus")) or "exact"
    if role == ROLE_LATEST:
        total = 0.20 * rel + 0.24 * cov + 0.13 * pro + 0.08 * rea + 0.22 * tim + 0.13 * fit
        if _as_bool(scores.get("is_single_point")):
            total -= 1.45
        if not _as_bool(scores.get("is_survey")):
            total -= 1.05
        if article_type in {"latest_survey", "trend_digest"}:
            total += 0.35
    else:
        total = 0.22 * rel + 0.30 * cov + 0.16 * pro + 0.10 * rea + 0.08 * tim + 0.14 * fit
        if _as_bool(scores.get("is_single_point")):
            total -= 1.75
        if not _as_bool(scores.get("is_survey")):
            total -= 1.30
        if article_type == "field_survey":
            total += 0.30
    if article_type in BAD_LLM_TYPES:
        total -= 1.80
    if focus in BAD_TOPIC_FOCUS:
        total -= 3.00
    elif focus == "adjacent":
        total -= 0.75
    elif focus == "exact":
        total += 0.25
    if scope == "narrow":
        total -= 1.10
    elif scope == "broad":
        total += 0.20
    return round(max(0.0, min(10.0, total)), 3)


def llm_accepts_item(item: dict[str, Any], role: str) -> bool:
    scores = item.get("role_scores", {}).get(role, {}).get("llm_scores")
    if not scores:
        return True
    relevance = int(scores.get("relevance") or 0)
    coverage = int(scores.get("coverage") or 0)
    timeliness = int(scores.get("timeliness") or 0)
    page_fit = int(scores.get("page_fit") or 0)
    is_survey = bool(scores.get("is_survey"))
    is_single = bool(scores.get("is_single_point"))
    article_type = _norm_label(scores.get("article_type"))
    scope = _norm_label(scores.get("scope"))
    focus = _norm_label(scores.get("topic_focus")) or "exact"
    context_used = bool(item.get("role_scores", {}).get(role, {}).get("page_context_used"))
    if article_type in BAD_LLM_TYPES or scope == "narrow":
        return False
    if focus in BAD_TOPIC_FOCUS:
        return False
    if focus == "adjacent" and (relevance < 8 or page_fit < 7):
        return False
    if context_used and page_fit < 5:
        return False
    if role == ROLE_OVERVIEW:
        return (
            is_survey
            and not is_single
            and article_type in {"field_survey", "latest_survey", "trend_digest", "other"}
            and relevance >= 6
            and coverage >= 6
            and (focus == "exact" or page_fit >= 8)
        )
    return (
        is_survey
        and not is_single
        and article_type in {"latest_survey", "trend_digest", "field_survey", "other"}
        and relevance >= 6
        and coverage >= 5
        and timeliness >= 5
        and (focus == "exact" or page_fit >= 8)
    )


def fallback_reject_reason(item: dict[str, Any], role: str) -> str | None:
    title = str(item.get("title") or "").lower()
    if _keyword_count(title, LOW_VALUE_TITLE_HINTS):
        return "目录/合集/资源汇总，不适合作为页面综述"
    return None


def accepts_item(item: dict[str, Any], role: str) -> bool:
    score = item.setdefault("role_scores", {}).setdefault(role, {})
    if score.get("llm_scores"):
        score.pop("fallback_reject_reason", None)
        return llm_accepts_item(item, role)
    reason = fallback_reject_reason(item, role)
    if reason:
        score["fallback_reject_reason"] = reason
        return False
    score.pop("fallback_reject_reason", None)
    return True


def llm_judge_role(
    items: list[dict[str, Any]],
    topic: str,
    role: str,
    model: str = "deepseek-v4-pro",
    batch_size: int = 8,
    page_context: str = "",
) -> None:
    try:
        from llm_client import chat_json
    except Exception as exc:
        print(f"[WARN] {ROLE_LABELS[role]} LLM Judge 不可用：{exc}")
        return

    role_label = ROLE_LABELS[role]
    for start in range(0, len(items), batch_size):
        batch = items[start:start + batch_size]
        prompt = _JUDGE_USER_TMPL.format(
            topic=topic,
            role_label=role_label,
            topic_focus_guidance=topic_focus_guidance(topic),
            page_context=page_context or "未提供页面内容。请仅根据研究主题判断。",
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
        except Exception as exc:
            print(f"[WARN] {role_label} LLM Judge 失败（batch {start}）：{exc}")
            continue
        if not isinstance(resp, list):
            print(f"[WARN] {role_label} LLM Judge 返回非数组，跳过该批")
            continue
        score_map = {}
        for obj in resp:
            if not isinstance(obj, dict):
                continue
            try:
                score_map[int(obj.get("id"))] = obj
            except Exception:
                continue
        for idx, item in enumerate(batch):
            obj = score_map.get(idx)
            if not obj:
                continue
            role_scores = item.setdefault("role_scores", {}).setdefault(role, {})
            role_scores["llm_scores"] = {
                "article_type": _norm_label(obj.get("article_type")) or "other",
                "scope": _norm_label(obj.get("scope")) or "medium",
                "topic_focus": _norm_label(obj.get("topic_focus")) or "exact",
                "relevance": _clamp_score(obj.get("relevance")),
                "coverage": _clamp_score(obj.get("coverage")),
                "professionalism": _clamp_score(obj.get("professionalism")),
                "readability": _clamp_score(obj.get("readability")),
                "timeliness": _clamp_score(obj.get("timeliness")),
                "page_fit": _clamp_score(obj.get("page_fit")),
                "is_survey": _as_bool(obj.get("is_survey")),
                "is_single_point": _as_bool(obj.get("is_single_point")),
            }
            role_scores["llm_total"] = _llm_total(obj, role)
            role_scores["page_context_used"] = bool(page_context)
            role_scores["llm_reason"] = str(obj.get("reason") or "")[:160]


def rank_for_role(
    items: list[dict[str, Any]],
    topic: str,
    role: str,
    *,
    heuristic_top: int = 36,
    judge_top: int = 20,
    enrich_top: int = 12,
    use_llm: bool = True,
    judge_model: str = "deepseek-v4-pro",
    page_context: str = "",
) -> list[dict[str, Any]]:
    """Return role-ranked items. Mutates item role_scores in place."""
    if not items:
        return []
    for item in items:
        item.setdefault("role_scores", {}).setdefault(role, {})["heuristic_score"] = heuristic_role_score(item, topic, role)

    candidate_pool = prefer_interacted_candidates(
        items,
        min_keep=max(heuristic_top, judge_top, 1),
    )
    shortlist = sorted(
        candidate_pool,
        key=lambda it: it.get("role_scores", {}).get(role, {}).get("heuristic_score", 0.0),
        reverse=True,
    )[:max(heuristic_top, judge_top, 1)]

    enrich_items_with_body(shortlist, limit=enrich_top)

    # Body features can change the heuristic score.
    for item in shortlist:
        item["role_scores"][role]["heuristic_score"] = heuristic_role_score(item, topic, role)
    shortlist.sort(key=lambda it: it["role_scores"][role]["heuristic_score"], reverse=True)
    judged = shortlist[:max(judge_top, 1)]

    if use_llm:
        print(f"  [LLM 精排] {ROLE_LABELS[role]} Top-{len(judged)} ...")
        llm_judge_role(judged, topic, role, model=judge_model, page_context=page_context)

    h_max = max((it["role_scores"][role].get("heuristic_score", 0.0) for it in judged), default=1.0) or 1.0
    for item in judged:
        score = item["role_scores"][role]
        h_norm = score.get("heuristic_score", 0.0) / h_max
        llm_total = score.get("llm_total")
        if llm_total is None:
            score["final_score"] = round(h_norm, 4)
        else:
            score["final_score"] = round(0.10 * h_norm + 0.90 * (llm_total / 10.0), 4)

    judged.sort(key=lambda it: it["role_scores"][role].get("final_score", 0.0), reverse=True)
    return judged


def select_dual_surveys(
    items: list[dict[str, Any]],
    topic: str,
    *,
    heuristic_top: int = 36,
    judge_top: int = 20,
    enrich_top: int = 12,
    use_llm: bool = True,
    judge_model: str = "deepseek-v4-pro",
    page_context: str = "",
) -> dict[str, Any]:
    overview_ranked = rank_for_role(
        items, topic, ROLE_OVERVIEW,
        heuristic_top=heuristic_top,
        judge_top=judge_top,
        enrich_top=enrich_top,
        use_llm=use_llm,
        judge_model=judge_model,
        page_context=page_context,
    )
    latest_ranked = rank_for_role(
        items, topic, ROLE_LATEST,
        heuristic_top=heuristic_top,
        judge_top=judge_top,
        enrich_top=enrich_top,
        use_llm=use_llm,
        judge_model=judge_model,
        page_context=page_context,
    )

    overview = next((item for item in overview_ranked if accepts_item(item, ROLE_OVERVIEW)), None)
    if overview is None and overview_ranked:
        overview = overview_ranked[0]
    latest = None
    overview_url = (overview or {}).get("url")
    for item in latest_ranked:
        if item.get("url") != overview_url and accepts_item(item, ROLE_LATEST):
            latest = item
            break
    if latest is None and latest_ranked:
        latest = next((item for item in latest_ranked if item.get("url") != overview_url), latest_ranked[0])

    return {
        "selected": {
            ROLE_OVERVIEW: deepcopy(overview) if overview else None,
            ROLE_LATEST: deepcopy(latest) if latest else None,
        },
        "ranked": {
            ROLE_OVERVIEW: [deepcopy(x) for x in overview_ranked],
            ROLE_LATEST: [deepcopy(x) for x in latest_ranked],
        },
    }


def _compact_item(item: dict[str, Any] | None, role: str | None = None) -> dict[str, Any] | None:
    if not item:
        return None
    meta = item.get("meta") or {}
    out = {
        "title": item.get("title"),
        "url": item.get("url"),
        "author": meta.get("author", ""),
        "date": _date_str(_best_timestamp(item)),
        "voteup_count": meta.get("voteup_count", 0),
        "comment_count": meta.get("comment_count", 0),
        "zfav_count": meta.get("zfav_count", 0),
        "queries": item.get("queries", []),
    }
    if role:
        out["role_scores"] = item.get("role_scores", {}).get(role, {})
    return out


def write_selection_report(
    *,
    topic: str,
    queries_by_role: dict[str, list[str]],
    all_candidates: list[dict[str, Any]],
    selection: dict[str, Any],
    download_results: dict[str, dict[str, Any]] | None,
    out_dir: str | Path,
) -> None:
    out_path = Path(out_dir)
    out_path.mkdir(parents=True, exist_ok=True)
    download_results = download_results or {}

    report = {
        "topic": topic,
        "generated_at": time.strftime("%Y-%m-%d %H:%M:%S"),
        "queries_by_role": queries_by_role,
        "total_candidates": len(all_candidates),
        "selected": {
            role: _compact_item(item, role)
            for role, item in (selection.get("selected") or {}).items()
        },
        "download_results": download_results,
        "ranked": {
            role: [_compact_item(item, role) for item in ranked[:20]]
            for role, ranked in (selection.get("ranked") or {}).items()
        },
    }
    (out_path / "survey_selection.json").write_text(
        json.dumps(report, ensure_ascii=False, indent=2),
        encoding="utf-8",
    )

    lines = [
        f"# 综述选择报告：{topic}",
        "",
        f"- 生成时间：{report['generated_at']}",
        f"- 候选总数：{len(all_candidates)}",
        "",
        "## 查询",
        "",
    ]
    for role, queries in queries_by_role.items():
        lines.append(f"- **{ROLE_LABELS.get(role, role)}**：`{' | '.join(queries)}`")
    lines.extend(["", "## 最终选择", ""])

    for role in (ROLE_OVERVIEW, ROLE_LATEST):
        item = (selection.get("selected") or {}).get(role)
        lines.append(f"### {ROLE_LABELS[role]}")
        if not item:
            lines.extend(["未选出候选。", ""])
            continue
        meta = item.get("meta") or {}
        score = item.get("role_scores", {}).get(role, {})
        llm_scores = score.get("llm_scores") or {}
        dl = download_results.get(role) or {}
        lines.extend([
            f"- 标题：[{item.get('title', '')}]({item.get('url', '')})",
            f"- 作者/日期：{meta.get('author') or '-'} / {_date_str(_best_timestamp(item)) or '-'}",
            f"- 互动：👍 {meta.get('voteup_count', 0)} / 💬 {meta.get('comment_count', 0)} / ⭐ {meta.get('zfav_count', 0)}",
            f"- 分数：final={score.get('final_score')} heuristic={score.get('heuristic_score')} llm={score.get('llm_total')}",
            f"- LLM 判断：type={llm_scores.get('article_type', '-')} scope={llm_scores.get('scope', '-')} focus={llm_scores.get('topic_focus', '-')} page_fit={llm_scores.get('page_fit', '-')}",
            f"- 点评：{score.get('llm_reason', '')}",
        ])
        if dl:
            lines.append(f"- 下载：{dl.get('status')} · {dl.get('out_dir', '')}")
        lines.append("")

    for role in (ROLE_OVERVIEW, ROLE_LATEST):
        lines.extend([f"## {ROLE_LABELS[role]} 候选 Top", ""])
        ranked = (selection.get("ranked") or {}).get(role, [])[:12]
        lines.append("| # | 标题 | 日期 | 👍 | ⭐ | final | LLM | reason |")
        lines.append("|---|------|------|----|----|-------|-----|--------|")
        for idx, item in enumerate(ranked, 1):
            meta = item.get("meta") or {}
            score = item.get("role_scores", {}).get(role, {})
            title = str(item.get("title") or "").replace("|", "｜")[:80]
            lines.append(
                f"| {idx} | [{title}]({item.get('url', '')}) "
                f"| {_date_str(_best_timestamp(item)) or '-'} "
                f"| {meta.get('voteup_count', 0)} "
                f"| {meta.get('zfav_count', 0)} "
                f"| {score.get('final_score', '-')} "
                f"| {score.get('llm_total', '-')} "
                f"| {str(score.get('llm_reason', '')).replace('|', '｜')[:80]} |"
            )
        lines.append("")

    (out_path / "survey_selection.md").write_text("\n".join(lines), encoding="utf-8")
