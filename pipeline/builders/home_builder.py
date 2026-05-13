"""home_builder.py — 刷新根目录 index.html 上的构建日期和统计数字。"""

from __future__ import annotations

import re
from pathlib import Path

from .common import DOMAIN_MAP, INDEX_HTML, PAGES_DIR, apply_placeholder, ok, today_str, warn
from .domain_builder import _resolve_live_topic, _scan_live_topics
from .common import DOMAIN_CATALOG


DATA_JS_SOURCE_RE = re.compile(r"源文件：([^\n]+)")


def _is_example_topic_html(html_file: Path) -> bool:
    """判断一个专题 HTML 是否来自 pipeline/examples/ 示例文档。"""
    if html_file.name == "index.html" or html_file.suffix != ".html":
        return False
    data_js = html_file.with_name(f"{html_file.stem}-data.js")
    if not data_js.is_file():
        return False
    try:
        text = data_js.read_text(encoding="utf-8")
    except OSError:
        return False
    m = DATA_JS_SOURCE_RE.search(text)
    if not m:
        return False
    return m.group(1).strip().startswith("pipeline/examples/")


def _count_live_topics(pages_dir: Path) -> int:
    """统计 pages/<domain>/ 下实际编译出的专题 HTML 数量（不含 index.html）。"""
    if not pages_dir.is_dir():
        return 0
    count = 0
    for domain_dir in pages_dir.iterdir():
        if not domain_dir.is_dir():
            continue
        for f in domain_dir.iterdir():
            if (
                f.is_file()
                and f.suffix == ".html"
                and f.name != "index.html"
                and not _is_example_topic_html(f)
            ):
                count += 1
    return count


def _count_live_topics_by_domain(pages_dir: Path) -> dict[str, int]:
    """统计每个一级领域下实际编译出的专题 HTML 数量（不含 index.html）。"""
    counts = {domain_id: 0 for domain_id in DOMAIN_MAP}
    if not pages_dir.is_dir():
        return counts
    for domain_id, meta in DOMAIN_MAP.items():
        domain_dir = Path(meta["dir"])
        if not domain_dir.is_absolute():
            domain_dir = pages_dir.parent / domain_dir
        if not domain_dir.is_dir():
            continue
        counts[domain_id] = sum(
            1
            for f in domain_dir.iterdir()
            if (
                f.is_file()
                and f.suffix == ".html"
                and f.name != "index.html"
                and not _is_example_topic_html(f)
            )
        )
    return counts


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


def _refresh_domain_card_counts(index_html: str, domain_counts: dict[str, int]) -> str:
    """按真实 pages/<domain> 产物刷新首页各领域卡片的上线状态。"""
    html = index_html
    for domain_id, count in domain_counts.items():
        href = f"pages/{domain_id}/index.html"
        label = f"{count} 个专题已上线" if count > 0 else "规划中"
        pattern = (
            r"(<div class=\"domain-card[^\"]*\" onclick=\"window\.location\.href='"
            + re.escape(href)
            + r"'\">.*?<div class=\"domain-count\">)(.*?)(</div>)"
        )
        html, _ = re.subn(
            pattern,
            lambda m: m.group(1) + label + m.group(3),
            html,
            count=1,
            flags=re.DOTALL,
        )
    return html


def _refresh_domain_card_tags(index_html: str) -> str:
    """按真实 pages/<domain> 产物刷新首页各领域 tag 的 active 状态。"""
    html = index_html
    for domain_id in DOMAIN_MAP:
        href = f"pages/{domain_id}/index.html"
        catalog_topics = DOMAIN_CATALOG.get(domain_id, {}).get("topics", [])
        live_map = _scan_live_topics(domain_id)
        active_names = {
            topic["name"]
            for topic in catalog_topics
            if _resolve_live_topic(topic, live_map)
        }

        card_pattern = (
            r"(<div class=\"domain-card[^\"]*\" onclick=\"window\.location\.href='"
            + re.escape(href)
            + r"'\">.*?<div class=\"domain-tags\">)(.*?)(</div>)"
        )
        m = re.search(card_pattern, html, flags=re.DOTALL)
        if not m:
            continue

        tags_html = m.group(2)
        for topic in catalog_topics:
            name = topic["name"]
            cls = "tag active" if name in active_names else "tag"
            tag_pattern = r'<span class="tag(?: active)?">' + re.escape(name) + r"</span>"
            tags_html = re.sub(
                tag_pattern,
                f'<span class="{cls}">{name}</span>',
                tags_html,
                count=1,
            )

        html = html[:m.start(2)] + tags_html + html[m.end(2):]
    return html


def render_index():
    """刷新根目录 index.html 中的构建日期与统计数值。"""
    if not INDEX_HTML.is_file():
        warn(f"未找到首页模板：{INDEX_HTML}")
        return

    html = INDEX_HTML.read_text(encoding="utf-8")

    build_date   = today_str()
    stat_live    = _count_live_topics(PAGES_DIR)
    domain_live  = _count_live_topics_by_domain(PAGES_DIR)
    stat_domains = _count_domains(html)
    stat_total   = _count_total_topics(html)

    html = apply_placeholder(html, "BUILD_DATE",        build_date)
    html = apply_placeholder(html, "STAT_TOPICS_LIVE",  str(stat_live))
    html = apply_placeholder(html, "STAT_DOMAINS",      str(stat_domains))
    html = apply_placeholder(html, "STAT_TOPICS_TOTAL", str(stat_total))
    html = _refresh_domain_card_counts(html, domain_live)
    html = _refresh_domain_card_tags(html)

    INDEX_HTML.write_text(html, encoding="utf-8")
    ok(f"刷新首页 index.html · 更新日期={build_date} · "
       f"已上线={stat_live} · 核心领域={stat_domains} · 知识专题={stat_total}")
