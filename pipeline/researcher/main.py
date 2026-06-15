"""
知乎专栏综述选择 pipeline。

默认模式面向 KnowledgePipeline 的页面装配需求：给定一个 topic，选择并
下载两篇知乎专栏文章：

1. 领域综述：阶段性的领域总结，重视体系化、全面性、专业性和可读性。
2. 最新进展综述：最近一段时间的新动向总结，重视时效性和趋势覆盖。

旧版 Top-N 榜单模式仍保留为隐藏兼容选项。
"""
from __future__ import annotations

import argparse
import calendar
import json
import os
import re
import sys
import time
from datetime import datetime
from pathlib import Path
from typing import Any, Dict, List

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

from http_utils import HttpClient
from searcher import multi_source_search
from ranker import final_rank
from survey_selector import (
    ROLE_LATEST,
    ROLE_OVERVIEW,
    build_role_queries,
    select_dual_surveys,
    write_selection_report,
)


def build_output_dir(topic: str, base: str = "./output") -> str:
    ts = time.strftime("%Y%m%d_%H%M%S")

    def _safe_slug(text: str, max_len: int = 60) -> str:
        import re
        text = (text or "").strip()
        text = re.sub(r"[\s/\\:*?\"<>|#]+", "_", text)
        text = re.sub(r"_+", "_", text).strip("_.")
        return (text[:max_len] if text else "untitled")

    slug = _safe_slug(topic, 30)
    out = os.path.join(base, f"{slug}_{ts}")
    os.makedirs(out, exist_ok=True)
    return out


def _months_ago_ts(months: int) -> int:
    months = max(0, int(months or 0))
    now = datetime.now()
    year = now.year
    month = now.month - months
    while month <= 0:
        month += 12
        year -= 1
    day = min(now.day, calendar.monthrange(year, month)[1])
    return int(datetime(year, month, day).timestamp())


def _date_label(ts: int = 0, year: int = 0) -> str:
    if ts:
        return time.strftime("%Y-%m-%d", time.localtime(ts))
    if year:
        return f"{year}-01-01"
    return "不限"


def _norm_match_text(text: str) -> str:
    return re.sub(r"[^0-9a-zA-Z\u4e00-\u9fff]+", "", (text or "").lower())


def _match_tokens(text: str) -> list[str]:
    en = re.findall(r"[a-zA-Z][a-zA-Z0-9_+-]{1,}", text or "")
    cn = re.findall(r"[\u4e00-\u9fff]{2,}", text or "")
    return [x.lower() for x in en + cn]


def _content_root() -> Path:
    repo_root = Path(__file__).resolve().parents[2]
    return repo_root / "content"


def _read_text_prefix(path: Path, limit: int = 12000) -> str:
    try:
        text = path.read_text(encoding="utf-8", errors="ignore")
    except Exception:
        return ""
    return text[:limit]


def _candidate_context_pages(content_root: Path) -> list[Path]:
    if not content_root.exists():
        return []
    pages: list[Path] = []
    for path in list(content_root.rglob("*.md")) + list(content_root.rglob("*.yaml")) + list(content_root.rglob("*.yml")):
        name = path.name.lower()
        if name in {"document_spec.md", "paper_spec.md"}:
            continue
        if path.stem.endswith("_detail"):
            continue
        try:
            rel_parts = path.relative_to(content_root).parts
        except Exception:
            continue
        if len(rel_parts) > 3:
            continue
        pages.append(path)
    suffix_rank = {".md": 0, ".yaml": 1, ".yml": 1}
    pages.sort(key=lambda p: (str(p.with_suffix("")), suffix_rank.get(p.suffix.lower(), 9)))
    deduped: list[Path] = []
    seen_base: set[Path] = set()
    for path in pages:
        base = path.with_suffix("")
        if base in seen_base:
            continue
        seen_base.add(base)
        deduped.append(path)
    return deduped


def _context_page_summary(path: Path, content_root: Path, idx: int) -> str:
    rel = path.relative_to(content_root).as_posix()
    text = _read_text_prefix(path, 5000)
    fields: list[str] = []
    for key in ("domain", "topic_id", "topic_name", "page_title", "page_desc"):
        m = re.search(rf"^\s*{re.escape(key)}\s*:\s*[\"']?(.+?)[\"']?\s*$", text, flags=re.M)
        if m:
            fields.append(f"{key}={m.group(1).strip()[:120]}")
    headings = re.findall(r"^(#{1,3}\s+.+)$", text, flags=re.M)
    if headings:
        fields.append("headings=" + " / ".join(h.strip("# ").strip() for h in headings[:6])[:240])
    if not fields:
        compact = re.sub(r"\s+", " ", text).strip()
        if compact:
            fields.append("preview=" + compact[:260])
    return f"[{idx}] {rel} :: {' | '.join(fields)[:700]}"


_CONTEXT_SELECT_SYSTEM = """你是 KnowledgePipeline 的页面上下文选择器。

任务：根据研究主题，从给定 content 目录索引中选择 1-3 个最相关的页面文件，供后续综述文章精排参考。

选择标准：
- 优先选与主题所属领域、topic_id、topic_name、page_title、page_desc 最匹配的页面。
- 如果同一页面有 md/yaml 两种形式，优先选择 md。
- 不要选择 detail 子页面，除非没有主页面可用。
- 如果没有明显相关页面，返回空数组。

必须只输出合法 JSON 对象，不要 markdown。格式：
{"selected_ids":[0,1],"reason":"一句话说明"}"""


def choose_page_context_paths_with_llm(
    topic: str,
    *,
    content_root: Path,
    model: str,
    max_files: int = 3,
) -> list[Path]:
    pages = _candidate_context_pages(content_root)
    if not pages:
        return []
    entries = [_context_page_summary(path, content_root, idx) for idx, path in enumerate(pages)]
    prompt = (
        f"研究主题：{topic}\n"
        f"最多选择 {max_files} 个页面文件。\n\n"
        "content 目录索引：\n" + "\n".join(entries)
    )
    try:
        from llm_client import chat_json
        resp = chat_json(
            [
                {"role": "system", "content": _CONTEXT_SELECT_SYSTEM},
                {"role": "user", "content": prompt},
            ],
            model=model,
            retries=1,
        )
    except Exception as exc:
        print(f"[WARN] LLM 页面上下文选择失败：{exc}")
        return []
    if not isinstance(resp, dict):
        return []
    selected = resp.get("selected_ids") or []
    out: list[Path] = []
    for value in selected:
        try:
            idx = int(value)
        except Exception:
            continue
        if 0 <= idx < len(pages) and pages[idx] not in out:
            out.append(pages[idx].resolve())
        if len(out) >= max_files:
            break
    reason = str(resp.get("reason") or "").strip()
    if out:
        shown = ", ".join(p.relative_to(content_root).as_posix() for p in out)
        print(f"  [页面上下文] LLM 选择：{shown}" + (f"；{reason}" if reason else ""))
    return out


def resolve_page_context_path(topic: str, explicit_path: str = "") -> Path | None:
    if explicit_path:
        path = Path(explicit_path).expanduser()
        if not path.is_absolute():
            path = Path.cwd() / path
        if path.exists() and path.is_file():
            return path.resolve()
        print(f"[WARN] 页面上下文文件不存在：{explicit_path}")
        return None

    content_root = _content_root()
    if not content_root.exists():
        return None

    topic_path = Path(topic)
    if topic_path.exists() and topic_path.is_file():
        return topic_path.resolve()

    topic_norm = _norm_match_text(topic)
    tokens = _match_tokens(topic)
    scored: list[tuple[int, Path]] = []
    for path in list(content_root.rglob("*.md")) + list(content_root.rglob("*.yaml")) + list(content_root.rglob("*.yml")):
        name = path.name.lower()
        if name in {"document_spec.md", "paper_spec.md"} or path.stem.endswith("_detail"):
            continue
        rel_parts = path.relative_to(content_root).parts
        if len(rel_parts) > 3:
            continue

        score = 0
        stem = path.stem.lower()
        path_text = " ".join(path.relative_to(content_root).with_suffix("").parts).lower()
        if stem and stem in topic.lower():
            score += 8
        for tok in tokens:
            if tok == stem or tok in stem or tok in path_text:
                score += 4

        prefix = _read_text_prefix(path, 6000)
        prefix_norm = _norm_match_text(prefix)
        if topic_norm and topic_norm in prefix_norm:
            score += 10
        for tok in tokens:
            if _norm_match_text(tok) in prefix_norm:
                score += 3

        if len(rel_parts) == 2:
            score += 2
        if score >= 8:
            scored.append((score, path))

    if not scored:
        return None
    suffix_rank = {".md": 2, ".yaml": 1, ".yml": 1}
    scored.sort(
        key=lambda x: (
            x[0],
            suffix_rank.get(x[1].suffix.lower(), 0),
            -len(x[1].relative_to(content_root).parts),
        ),
        reverse=True,
    )
    top_score = scored[0][0]
    top_paths = [path for score, path in scored if score == top_score]
    top_bases = {path.with_suffix("") for path in top_paths}
    if len(top_bases) == 1:
        top_paths.sort(key=lambda p: suffix_rank.get(p.suffix.lower(), 0), reverse=True)
        return top_paths[0].resolve()
    if len(scored) >= 2 and scored[0][0] - scored[1][0] < 3:
        return None
    return scored[0][1].resolve()


def load_page_context(path: Path | None, max_chars: int = 7000) -> str:
    if not path:
        return ""
    raw = _read_text_prefix(path, max(20000, max_chars * 3))
    if not raw:
        return ""

    frontmatter = ""
    body = raw
    if raw.startswith("---"):
        end = raw.find("\n---", 3)
        if end > 0:
            frontmatter = raw[:end + 4].strip()
            body = raw[end + 4:].lstrip()

    headings = re.findall(r"^(#{1,4}\s+.+)$", body, flags=re.M)
    outline = "\n".join(headings[:80])
    preview = body[:max_chars]

    chunks = [f"文件：{path}"]
    if frontmatter:
        chunks.append("页面元信息：\n" + frontmatter[:2500])
    if outline:
        chunks.append("页面大纲：\n" + outline[:2500])
    chunks.append("页面正文片段：\n" + preview)
    text = "\n\n".join(chunks)
    return text[:max_chars]


def load_page_contexts(paths: list[Path], max_chars: int = 7000) -> str:
    if not paths:
        return ""
    per_file = max(1200, max_chars // max(1, len(paths)))
    chunks = []
    for path in paths:
        ctx = load_page_context(path, max_chars=per_file)
        if ctx:
            chunks.append(ctx)
    return "\n\n---\n\n".join(chunks)[:max_chars]


def write_report(
    topic: str,
    queries: List[str],
    all_candidates: List[Dict[str, Any]],
    ranked_top: List[Dict[str, Any]],
    download_results: List[Dict[str, Any]],
    out_dir: str,
) -> None:
    # ---- JSON ----
    report_json = {
        "topic": topic,
        "queries": queries,
        "total_candidates": len(all_candidates),
        "selected": len(ranked_top),
        "generated_at": time.strftime("%Y-%m-%d %H:%M:%S"),
        "top_items": [
            {
                "title": it.get("title"),
                "url": it.get("url"),
                "author": (it.get("meta") or {}).get("author", ""),
                "voteup_count": (it.get("meta") or {}).get("voteup_count", 0),
                "comment_count": (it.get("meta") or {}).get("comment_count", 0),
                "zfav_count": (it.get("meta") or {}).get("zfav_count", 0),
                "created_time": (it.get("meta") or {}).get("created_time", 0),
                "heuristic_score": it.get("heuristic_score"),
                "llm_scores": it.get("llm_scores"),
                "llm_total": it.get("llm_total"),
                "final_score": it.get("final_score"),
                "llm_reason": it.get("llm_reason"),
                "download_status": next(
                    (dr["status"] for dr in download_results if dr["url"] == it["url"]),
                    "unknown",
                ),
            }
            for it in ranked_top
        ],
    }
    with open(os.path.join(out_dir, "report.json"), "w", encoding="utf-8") as f:
        json.dump(report_json, f, ensure_ascii=False, indent=2)

    # 保留所有候选（便于复盘）
    with open(os.path.join(out_dir, "all_candidates.json"), "w", encoding="utf-8") as f:
        json.dump(all_candidates, f, ensure_ascii=False, indent=2)

    # ---- Markdown ----
    def _fmt_date(ts: int) -> str:
        if not ts:
            return "-"
        try:
            return time.strftime("%Y-%m-%d", time.localtime(int(ts)))
        except Exception:
            return "-"

    lines = [
        f"# 研究报告：{topic}",
        "",
        f"- 生成时间：{time.strftime('%Y-%m-%d %H:%M:%S')}",
        f"- 候选总数：{len(all_candidates)}",
        f"- 最终下载：{len(ranked_top)}",
        f"- 搜索 query：`{' | '.join(queries)}`",
        "",
        "## 最终精选 Top 榜",
        "",
        "| # | 标题 | 作者 | 日期 | 👍 | 💬 | ⭐ | 综合分 | LLM分 | 启发式分 | 状态 |",
        "|---|------|------|------|----|----|----|--------|-------|----------|------|",
    ]
    for i, it in enumerate(ranked_top, 1):
        dr = next((d for d in download_results if d["url"] == it["url"]), None)
        status = dr["status"] if dr else "-"
        m = it.get("meta") or {}
        title = (it.get("title") or "").replace("|", "｜")[:70]
        lines.append(
            f"| {i} | [{title}]({it.get('url','')}) "
            f"| {m.get('author','-')} "
            f"| {_fmt_date(m.get('created_time', 0))} "
            f"| {m.get('voteup_count', 0)} "
            f"| {m.get('comment_count', 0)} "
            f"| {m.get('zfav_count', 0)} "
            f"| {it.get('final_score', '-')} "
            f"| {it.get('llm_total', '-')} "
            f"| {it.get('heuristic_score', '-')} "
            f"| {status} |"
        )
    lines.append("")
    lines.append("## 每条精选的 LLM 点评")
    lines.append("")
    for i, it in enumerate(ranked_top, 1):
        m = it.get("meta") or {}
        lines.append(f"### {i}. {it.get('title', '')}")
        lines.append(f"- URL：<{it.get('url','')}>")
        lines.append(
            f"- 作者：{m.get('author', '-')}；"
            f"发表：{_fmt_date(m.get('created_time', 0))}；"
            f"更新：{_fmt_date(m.get('updated_time', 0))}"
        )
        lines.append(
            f"- 互动：👍 {m.get('voteup_count', 0)} 赞 / "
            f"💬 {m.get('comment_count', 0)} 评 / "
            f"⭐ {m.get('zfav_count', 0)} 藏"
        )
        if it.get("llm_scores"):
            s = it["llm_scores"]
            lines.append(
                f"- LLM 三维分：relevance={s.get('relevance')}, "
                f"timeliness={s.get('timeliness')}, "
                f"coverage={s.get('coverage')} "
                f"(加权总分 {it.get('llm_total')})"
            )
        if it.get("llm_reason"):
            lines.append(f"- 点评：{it['llm_reason']}")
        dr = next((d for d in download_results if d["url"] == it["url"]), None)
        if dr:
            lines.append(
                f"- 下载：{dr.get('status')}, md 长度={dr.get('md_length','-')}, "
                f"图片数={dr.get('image_count','-')}, 方式={dr.get('fetch_source','-')}"
            )
            if dr.get("out_dir"):
                rel = os.path.relpath(dr["out_dir"], out_dir)
                lines.append(f"- 文件夹：`{rel}`")
        lines.append("")

    with open(os.path.join(out_dir, "report.md"), "w", encoding="utf-8") as f:
        f.write("\n".join(lines))


def _split_queries(text: str) -> List[str]:
    return [q.strip() for q in (text or "").split("|") if q.strip()]


def _merge_role_items(
    all_items: Dict[str, Dict[str, Any]],
    items: List[Dict[str, Any]],
    role: str,
) -> None:
    for it in items:
        key = it["url"].split("#")[0].rstrip("/")
        role_queries = list(it.get("queries", []) or [])
        if key not in all_items:
            it["role_queries"] = {role: role_queries}
            all_items[key] = it
            continue

        dst = all_items[key]
        dst.setdefault("queries", [])
        for q in role_queries:
            if q not in dst["queries"]:
                dst["queries"].append(q)
        dst.setdefault("role_queries", {}).setdefault(role, [])
        for q in role_queries:
            if q not in dst["role_queries"][role]:
                dst["role_queries"][role].append(q)
        if len(it.get("snippet", "")) > len(dst.get("snippet", "")):
            dst["snippet"] = it.get("snippet", "")


def _safe_repo_rel(path: str) -> str:
    from pathlib import Path

    root = Path(__file__).resolve().parents[2]
    p = Path(path)
    if not p.is_absolute():
        p = Path.cwd() / p
    try:
        return str(p.resolve().relative_to(root.resolve())).replace("\\", "/")
    except Exception:
        return str(p.resolve()).replace("\\", "/")


def write_sources_yaml(download_results: Dict[str, Dict[str, Any]], out_dir: str) -> str | None:
    """Write a sidecar YAML snippet usable by content_assembler."""
    import yaml
    from pathlib import Path

    data: Dict[str, Dict[str, str]] = {}
    role_to_key = {
        ROLE_OVERVIEW: "overview",
        ROLE_LATEST: "latest_overview",
    }
    for role, result in download_results.items():
        if not result or result.get("status") != "ok" or not result.get("out_dir"):
            continue
        article_md = Path(result["out_dir"]) / "article.md"
        if not article_md.is_file():
            continue
        data[role_to_key[role]] = {"include_raw": _safe_repo_rel(str(article_md))}
    if not data:
        return None
    out_path = Path(out_dir) / "selected_sources.yaml"
    out_path.write_text(yaml.safe_dump(data, allow_unicode=True, sort_keys=False), encoding="utf-8")
    return str(out_path)


def run_survey_pipeline(args: argparse.Namespace) -> int:
    topic = args.topic
    out_dir = os.path.abspath(args.output or build_output_dir(topic, base=args.out_base))
    os.makedirs(out_dir, exist_ok=True)

    current_year = int(time.strftime("%Y"))
    extra_queries = _split_queries(args.queries)
    overview_queries = _split_queries(args.overview_queries) or build_role_queries(topic, ROLE_OVERVIEW, current_year)
    latest_queries = _split_queries(args.latest_queries) or build_role_queries(topic, ROLE_LATEST, current_year)
    if extra_queries:
        overview_queries = list(dict.fromkeys(overview_queries + extra_queries))
        latest_queries = list(dict.fromkeys(latest_queries + extra_queries))
    queries_by_role = {
        ROLE_OVERVIEW: overview_queries,
        ROLE_LATEST: latest_queries,
    }

    print("=" * 70)
    print(f"[Step 1] 搜索知乎专栏文章  topic={topic!r}  mode=surveys")
    print("=" * 70)
    cli = HttpClient(cookies_path=args.cookies, timeout=args.http_timeout)
    all_items: Dict[str, Dict[str, Any]] = {}

    latest_since_ts = 0
    if not args.latest_since_year and args.latest_months > 0:
        latest_since_ts = _months_ago_ts(args.latest_months)
    role_time_filter = {
        ROLE_OVERVIEW: {"since_year": args.overview_since_year, "since_ts": 0},
        ROLE_LATEST: {"since_year": args.latest_since_year, "since_ts": latest_since_ts},
    }
    for role, queries in queries_by_role.items():
        time_filter = role_time_filter[role]
        since_year = time_filter["since_year"]
        since_ts = time_filter["since_ts"]
        print(f"\n  [角色] {role} queries={len(queries)} since={_date_label(since_ts, since_year)}")
        items = multi_source_search(
            cli,
            queries,
            per_source=args.per_source,
            since_year=since_year,
            since_ts=since_ts,
            drop_unknown_date=not args.keep_unknown_date,
        )
        # Latest search can be too sparse early in a year or for niche topics.
        if role == ROLE_LATEST and len(items) < args.min_latest_candidates and (since_year or since_ts):
            fallback_since_year = 0
            fallback_since_ts = 0
            if since_ts:
                fallback_months = max(args.latest_fallback_months, args.latest_months + 1)
                fallback_since_ts = _months_ago_ts(fallback_months)
            else:
                fallback_since_year = max(0, since_year - 1)
            print(
                f"  [回退] 最新进展候选仅 {len(items)} 条，"
                f"放宽 since={_date_label(fallback_since_ts, fallback_since_year)} 再召回"
            )
            more_items = multi_source_search(
                cli,
                queries,
                per_source=max(10, args.per_source // 2),
                since_year=fallback_since_year,
                since_ts=fallback_since_ts,
                drop_unknown_date=not args.keep_unknown_date,
            )
            by_url = {it["url"].rstrip("/"): it for it in items}
            for it in more_items:
                by_url.setdefault(it["url"].rstrip("/"), it)
            items = list(by_url.values())
        _merge_role_items(all_items, items, role)

    candidates = list(all_items.values())
    print(f"\n  共召回 {len(candidates)} 篇去重后的知乎专栏文章")
    if not candidates:
        print("❌ 没有任何候选结果。请检查 cookies.json 是否有效，或放宽 query / 时间过滤。")
        return 2

    print()
    print("=" * 70)
    print(
        f"[Step 2] 分角色选择  heuristic_top={args.heuristic_top} "
        f"judge_top={args.judge_top} enrich_top={args.enrich_top} use_llm={not args.no_llm_judge}"
    )
    print("=" * 70)
    page_context_paths: list[Path] = []
    if args.page_md:
        path = resolve_page_context_path(topic, args.page_md)
        if path:
            page_context_paths = [path]
    elif not args.no_llm_judge:
        content_root = Path(args.page_context_dir).expanduser() if args.page_context_dir else _content_root()
        if not content_root.is_absolute():
            content_root = Path.cwd() / content_root
        page_context_paths = choose_page_context_paths_with_llm(
            topic,
            content_root=content_root.resolve(),
            model=args.llm_model,
            max_files=args.page_context_files,
        )
        if not page_context_paths:
            fallback = resolve_page_context_path(topic, "")
            if fallback:
                print(f"  [页面上下文] 启发式回退：{fallback}")
                page_context_paths = [fallback]

    page_context = load_page_contexts(page_context_paths, max_chars=args.page_context_chars)
    if page_context:
        print(f"  [页面上下文] 已加载 {len(page_context_paths)} 个文件，共 {len(page_context)} chars")
    selection = select_dual_surveys(
        candidates,
        topic,
        heuristic_top=args.heuristic_top,
        judge_top=args.judge_top,
        enrich_top=args.enrich_top,
        use_llm=not args.no_llm_judge,
        judge_model=args.llm_model,
        page_context=page_context,
    )

    download_results: Dict[str, Dict[str, Any]] = {}
    if not args.no_download:
        from downloader import download_one

        print()
        print("=" * 70)
        print("[Step 3] 下载最终选择")
        print("=" * 70)
        for role in (ROLE_OVERVIEW, ROLE_LATEST):
            item = (selection.get("selected") or {}).get(role)
            if not item:
                continue
            role_dir = os.path.join(out_dir, role)
            print(f"[{role}] 下载 {item.get('title', '')[:70]} ...")
            result = download_one(
                cli,
                item,
                out_root=role_dir,
                download_images=not args.no_images,
                max_images=args.max_images,
            )
            print(
                f"   status={result.get('status')} md_len={result.get('md_length', '-')} "
                f"src={result.get('fetch_source', '-')}"
            )
            download_results[role] = result
            time.sleep(args.polite_sleep)
    else:
        print("\n[Step 3] 跳过下载（--no-download）")

    print()
    print("=" * 70)
    print("[Step 4] 生成选择报告")
    print("=" * 70)
    write_selection_report(
        topic=topic,
        queries_by_role=queries_by_role,
        all_candidates=candidates,
        selection=selection,
        download_results=download_results,
        out_dir=out_dir,
    )
    sources_yaml = write_sources_yaml(download_results, out_dir) if download_results else None
    print(f"  ✅ 报告：{os.path.join(out_dir, 'survey_selection.md')}")
    print(f"  ✅ 数据：{os.path.join(out_dir, 'survey_selection.json')}")
    if sources_yaml:
        print(f"  ✅ sources YAML：{sources_yaml}")
    return 0


def run_top_pipeline(args: argparse.Namespace) -> int:
    topic = args.topic
    out_dir = args.output or build_output_dir(topic, base=args.out_base)
    downloads_dir = os.path.join(out_dir, "blogs")
    os.makedirs(downloads_dir, exist_ok=True)

    # 直接使用原始 topic；如果用户手动用 | 指定多 query，也支持
    if args.queries:
        queries = [q.strip() for q in args.queries.split("|") if q.strip()]
    else:
        queries = [topic]

    print("=" * 70)
    print(
        f"[Step 1] 搜索知乎专栏文章  topic={topic!r}  "
        f"per_source={args.per_source}  since_year={args.since_year or '不限'}"
    )
    print("=" * 70)
    cli = HttpClient(cookies_path=args.cookies, timeout=args.http_timeout)
    candidates = multi_source_search(
        cli, queries,
        per_source=args.per_source,
        since_year=args.since_year,
        drop_unknown_date=not args.keep_unknown_date,
    )
    print(f"  共召回 {len(candidates)} 篇知乎专栏文章（去重后）")

    if not candidates:
        print("❌ 没有任何候选结果。请检查 cookies.json 是否包含有效的 z_c0 / _xsrf / d_c0。")
        return 2

    print()
    print("=" * 70)
    print(
        f"[Step 2] 排序  heuristic_top={args.heuristic_top} "
        f"keep_top={args.top} use_llm={not args.no_llm_judge}"
    )
    print("=" * 70)
    keywords = [topic] + [q for q in queries if q != topic]
    ranked_top = final_rank(
        candidates,
        keywords=keywords,
        keep_top=args.top,
        heuristic_top=args.heuristic_top,
        use_llm=not args.no_llm_judge,
        judge_model=args.llm_model,
    )
    print(f"  最终保留 {len(ranked_top)} 条：")
    for i, it in enumerate(ranked_top, 1):
        m = it.get("meta") or {}
        print(
            f"   {i:2d}. final={it.get('final_score','-')} "
            f"llm={it.get('llm_total','-')} "
            f"heur={it.get('heuristic_score','-')} "
            f"[{m.get('voteup_count', 0)}赞/{m.get('comment_count', 0)}评/{m.get('zfav_count', 0)}藏] "
            f"| {it.get('title','')[:50]}"
        )

    print()
    print("=" * 70)
    print(f"[Step 3] 下载 Top-{len(ranked_top)} 到 {downloads_dir}")
    print("=" * 70)
    from downloader import download_many

    dl_results = download_many(
        cli,
        ranked_top,
        out_root=downloads_dir,
        download_images=not args.no_images,
        max_images=args.max_images,
        polite_sleep=args.polite_sleep,
    )
    ok = sum(1 for r in dl_results if r["status"] == "ok")
    print(f"  完成：{ok}/{len(dl_results)} 条下载成功")

    print()
    print("=" * 70)
    print("[Step 4] 生成报告")
    print("=" * 70)
    write_report(topic, queries, candidates, ranked_top, dl_results, out_dir)
    print(f"  ✅ 报告：{os.path.join(out_dir, 'report.md')}")
    print(f"  ✅ 数据：{os.path.join(out_dir, 'report.json')}")
    print(f"  ✅ 博客：{downloads_dir}")

    return 0


def run_pipeline(args: argparse.Namespace) -> int:
    if args.mode == "top":
        return run_top_pipeline(args)
    return run_survey_pipeline(args)


def build_parser() -> argparse.ArgumentParser:
    p = argparse.ArgumentParser(
        description="为一个 topic 从知乎专栏中选择“领域综述”和“最新进展综述”两篇文章",
        formatter_class=argparse.ArgumentDefaultsHelpFormatter,
    )
    p.add_argument("topic", help="研究主题关键词，例如 'LLM 强化学习'")
    p.add_argument(
        "--mode",
        choices=["surveys", "top"],
        default="surveys",
        help=argparse.SUPPRESS,
    )
    p.add_argument("--per-source", type=int, default=40, help="每条自动 query 最多召回多少篇知乎文章")
    p.add_argument("-o", "--output", default="", help="指定输出目录；默认写入 ./output/<topic>_<timestamp>/")
    p.add_argument("--cookies", default=os.path.join(os.path.dirname(os.path.abspath(__file__)), "cookies.json"),
                   help="知乎 cookies.json 路径")
    p.add_argument("--no-llm-judge", action="store_true", help="不用 LLM 精排，仅使用启发式排序")
    p.add_argument("--no-download", action="store_true", help="只生成选择报告，不下载最终文章")
    p.add_argument("--no-images", action="store_true", help="下载文章时不抓取图片")

    # Hidden compatibility / tuning options. They remain useful for batch
    # experiments but should not be part of the normal author workflow.
    p.add_argument("--top", type=int, default=10, help=argparse.SUPPRESS)
    p.add_argument("--heuristic-top", type=int, default=30, help=argparse.SUPPRESS)
    p.add_argument("--judge-top", type=int, default=20, help=argparse.SUPPRESS)
    p.add_argument("--enrich-top", type=int, default=12, help=argparse.SUPPRESS)
    p.add_argument(
        "--since-year",
        type=int,
        default=2025,
        help=argparse.SUPPRESS,
    )
    p.add_argument(
        "--keep-unknown-date",
        action="store_true",
        help=argparse.SUPPRESS,
    )
    p.add_argument("--queries", default="", help=argparse.SUPPRESS)
    p.add_argument("--overview-queries", default="", help=argparse.SUPPRESS)
    p.add_argument("--latest-queries", default="", help=argparse.SUPPRESS)
    p.add_argument("--overview-since-year", type=int, default=0, help=argparse.SUPPRESS)
    p.add_argument("--latest-since-year", type=int, default=0, help=argparse.SUPPRESS)
    p.add_argument("--latest-months", type=int, default=3, help=argparse.SUPPRESS)
    p.add_argument("--latest-fallback-months", type=int, default=6, help=argparse.SUPPRESS)
    p.add_argument("--page-md", default="", help=argparse.SUPPRESS)
    p.add_argument("--page-context-dir", default="", help=argparse.SUPPRESS)
    p.add_argument("--page-context-files", type=int, default=3, help=argparse.SUPPRESS)
    p.add_argument("--page-context-chars", type=int, default=7000, help=argparse.SUPPRESS)
    p.add_argument("--min-latest-candidates", type=int, default=8, help=argparse.SUPPRESS)
    p.add_argument("--max-images", type=int, default=40, help=argparse.SUPPRESS)
    p.add_argument("--http-timeout", type=int, default=15, help=argparse.SUPPRESS)
    p.add_argument("--polite-sleep", type=float, default=1.0, help=argparse.SUPPRESS)
    p.add_argument("--llm-model", default="deepseek-v4-pro", help=argparse.SUPPRESS)
    p.add_argument("--out-base", default="./output", help=argparse.SUPPRESS)
    return p


if __name__ == "__main__":
    parser = build_parser()
    args = parser.parse_args()
    sys.exit(run_pipeline(args))
