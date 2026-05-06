"""home_builder.py — 刷新根目录 index.html 上的构建日期和统计数字。"""

from __future__ import annotations

import re
from pathlib import Path

from .common import INDEX_HTML, PAGES_DIR, apply_placeholder, ok, today_str, warn


def _count_live_topics(pages_dir: Path) -> int:
    """统计 pages/<domain>/ 下实际编译出的专题 HTML 数量（不含 index.html）。"""
    if not pages_dir.is_dir():
        return 0
    count = 0
    for domain_dir in pages_dir.iterdir():
        if not domain_dir.is_dir():
            continue
        for f in domain_dir.iterdir():
            if f.is_file() and f.suffix == ".html" and f.name != "index.html":
                count += 1
    return count


def _scope_domains(index_html: str) -> str:
    m = re.search(
        r'<section class="domains-section"[^>]*>(.*?)</section>',
        index_html, flags=re.DOTALL,
    )
    return m.group(1) if m else index_html


def _count_domains(index_html: str) -> int:
    """首页 domain-card 数量 = 一级领域数。"""
    return len(re.findall(r'<div\s+class="domain-card\b', _scope_domains(index_html)))


def _count_total_topics(index_html: str) -> int:
    """首页 .tag 元素总数 = 所有二级标签数。"""
    return len(re.findall(r'<span\s+class="tag[^"]*"[^>]*>', _scope_domains(index_html)))


def render_index():
    """刷新根目录 index.html 中的构建日期与统计数值。"""
    if not INDEX_HTML.is_file():
        warn(f"未找到首页模板：{INDEX_HTML}")
        return

    html = INDEX_HTML.read_text(encoding="utf-8")

    build_date   = today_str()
    stat_live    = _count_live_topics(PAGES_DIR)
    stat_domains = _count_domains(html)
    stat_total   = _count_total_topics(html)

    html = apply_placeholder(html, "BUILD_DATE",        build_date)
    html = apply_placeholder(html, "STAT_TOPICS_LIVE",  str(stat_live))
    html = apply_placeholder(html, "STAT_DOMAINS",      str(stat_domains))
    html = apply_placeholder(html, "STAT_TOPICS_TOTAL", str(stat_total))

    INDEX_HTML.write_text(html, encoding="utf-8")
    ok(f"刷新首页 index.html · 更新日期={build_date} · "
       f"已上线={stat_live} · 核心领域={stat_domains} · 知识专题={stat_total}")
