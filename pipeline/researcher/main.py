"""
知乎专栏文章搜集 pipeline 主入口（优化版）

用法：
  python3 main.py "LLM 强化学习"
  python3 main.py "LLM 强化学习" --top 10 --per-source 40 --cookies cookies.json
  python3 main.py "LLM 强化学习" --no-llm-judge --no-images

流程（相比旧版大幅简化）：
  1. 不做 query 扩展，直接使用用户原始主题
  2. 仅调用知乎 V4 搜索 API（vertical=article），只保留 zhuanlan 专栏文章
  3. 启发式打分（互动数据主导） + LLM Judge（relevance/timeliness/coverage 三维度）
  4. 下载 Top-N 的正文 Markdown + 图片 + metadata.json
  5. 生成 report.md / report.json 汇总
"""
from __future__ import annotations

import argparse
import json
import os
import sys
import time
from typing import Any, Dict, List

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

from http_utils import HttpClient
from searcher import multi_source_search
from ranker import final_rank
from downloader import download_many


def build_output_dir(topic: str, base: str = "./output") -> str:
    ts = time.strftime("%Y%m%d_%H%M%S")
    from downloader import _safe_slug
    slug = _safe_slug(topic, 30)
    out = os.path.join(base, f"{slug}_{ts}")
    os.makedirs(out, exist_ok=True)
    return out


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


def run_pipeline(args: argparse.Namespace) -> int:
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


def build_parser() -> argparse.ArgumentParser:
    p = argparse.ArgumentParser(
        description="知乎专栏文章搜集 pipeline（搜索 + 排序 + 下载）",
        formatter_class=argparse.ArgumentDefaultsHelpFormatter,
    )
    p.add_argument("topic", help="研究主题关键词，例如 'LLM 强化学习'")
    p.add_argument("--top", type=int, default=10, help="最终下载的文章条数")
    p.add_argument("--per-source", type=int, default=40, help="每条 query 在知乎 API 最多拉取多少条")
    p.add_argument("--heuristic-top", type=int, default=30, help="启发式筛选后进入 LLM 精排的候选数")
    p.add_argument(
        "--since-year",
        type=int,
        default=2025,
        help="只保留发表年份 >= 该值的文章（0 表示不过滤）。默认 2025，更激进可填 2026。"
             "注意：知乎搜索 API 服务端不支持时间过滤，这里是客户端过滤。"
             "过滤越严格，底层会自动多翻页来补充候选。",
    )
    p.add_argument(
        "--keep-unknown-date",
        action="store_true",
        help="保留 created_time 缺失的文章（默认丢弃，因为无法评估时效性）",
    )
    p.add_argument("--queries", default="", help="手动指定 query，用 | 分隔（默认就用 topic 本身，不再做扩展）")
    p.add_argument("--no-llm-judge", action="store_true", help="跳过 LLM 三维精排，仅用启发式分")
    p.add_argument("--no-images", action="store_true", help="不下载文章内图片")
    p.add_argument("--max-images", type=int, default=40, help="单篇文章最多下载图片数")
    p.add_argument(
        "--cookies",
        default=os.path.join(os.path.dirname(os.path.abspath(__file__)), "cookies.json"),
        help="cookies.json 路径（必须包含 zhihu.com 下的 z_c0 / _xsrf / d_c0）",
    )
    p.add_argument("--http-timeout", type=int, default=15, help="HTTP 超时(秒)")
    p.add_argument("--polite-sleep", type=float, default=1.0, help="下载之间的间隔(秒)")
    p.add_argument("--llm-model", default="gpt-5.4", help="LLM Judge 使用的模型名")
    p.add_argument("--out-base", default="./output", help="输出根目录")
    p.add_argument("-o", "--output", default="", help="指定输出目录（默认按时间戳自动生成）")
    return p


if __name__ == "__main__":
    parser = build_parser()
    args = parser.parse_args()
    sys.exit(run_pipeline(args))
