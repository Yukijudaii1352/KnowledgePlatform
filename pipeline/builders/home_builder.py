"""home_builder.py — 刷新根目录 index.html 上的构建日期、统计数字和领域卡片。"""

from __future__ import annotations

import html
import re
from pathlib import Path

from .common import DOMAIN_CATALOG, DOMAIN_MAP, INDEX_HTML, PAGES_DIR, apply_placeholder, is_domain_enabled, ok, today_str, warn
from .domain_builder import is_source_public, load_page_config, scan_live_topics, resolve_live_topic


def _is_example_topic_html(html_file: Path) -> bool:
    """判断一个专题 HTML 是否应从首页统计中隐藏。"""
    if html_file.name == "index.html" or html_file.suffix != ".html":
        return False
    data_js = html_file.with_name(f"{html_file.stem}-data.js")
    if not data_js.is_file():
        return False
    return not is_source_public(data_js)


def _count_live_topics(pages_dir: Path) -> int:
    """统计 pages/<domain>/ 下实际编译出的专题 HTML 数量（不含 index.html）。"""
    if not pages_dir.is_dir():
        return 0
    count = 0
    for domain_id, meta in DOMAIN_MAP.items():
        if not is_domain_enabled(domain_id):
            continue
        domain_dir = pages_dir.parent / meta["dir"]
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


def _count_total_topics() -> int:
    """首页知识专题数 = DOMAIN_CATALOG 中配置的全部二级标签数。"""
    return sum(
        len(DOMAIN_CATALOG.get(domain_id, {}).get("topics", []))
        for domain_id in DOMAIN_MAP
        if is_domain_enabled(domain_id)
    )


def _count_collected_papers(pages_dir: Path) -> int:
    """统计所有上架专题下、存在 paperUrl 的论文条目总数（仅口径：非空 paperUrl）。"""
    if not pages_dir.is_dir():
        return 0

    paper_count = 0
    for domain_id, meta in DOMAIN_MAP.items():
        if not is_domain_enabled(domain_id):
            continue

        domain_dir = pages_dir.parent / meta["dir"]
        if not domain_dir.is_dir():
            continue

        for data_js in domain_dir.glob("*-data.js"):
            if not is_source_public(data_js):
                continue
            cfg = load_page_config(data_js)
            if not cfg:
                continue

            algos = cfg.get("algos", [])
            if not isinstance(algos, list):
                continue

            for algo in algos:
                if not isinstance(algo, dict):
                    continue
                if str(algo.get("paperUrl", "")).strip():
                    paper_count += 1

    return paper_count


def _render_home_domain_cards() -> str:
    """根据 DOMAIN_CATALOG + 已编译专题实时生成首页领域卡片。"""
    cards: list[str] = []

    visible_domains = [
        (domain_id, meta)
        for domain_id, meta in DOMAIN_MAP.items()
        if is_domain_enabled(domain_id)
    ]

    for idx, (domain_id, meta) in enumerate(visible_domains, start=1):
        catalog = DOMAIN_CATALOG.get(domain_id, {})
        topics = catalog.get("topics", [])
        live_map = scan_live_topics(domain_id)

        active_names = {
            topic["name"]
            for topic in topics
            if resolve_live_topic(topic, live_map)
        }
        live_count = len(active_names)
        tag_html = "".join(
            f'<span class="tag{" active" if topic["name"] in active_names else ""}">'
            f'{html.escape(topic["name"])}</span>'
            for topic in topics
        )
        count_label = f"{live_count} 个专题已上线" if live_count > 0 else "规划中"

        cards.append(
            f"""
      <div class="domain-card d{idx}" onclick="window.location.href='pages/{domain_id}/index.html'">
        <div class="domain-icon">{catalog.get("icon", "📘")}</div>
        <div class="domain-name">{html.escape(meta["name"])}</div>
        <div class="domain-desc">{html.escape(catalog.get("desc", ""))}</div>
        <div class="domain-tags">{tag_html}</div>
        <div class="domain-count">{count_label}</div>
        <div class="domain-arrow">→</div>
      </div>""".rstrip()
        )

    return "\n\n".join(cards)


def _refresh_domains_section(index_html: str) -> str:
    section_html = (
        '<section class="domains-section" id="domains">\n'
        '  <div class="shell">\n'
        '    <div class="section-heading">\n'
        '      <div>\n'
        '        <span class="section-kicker">DOMAIN MATRIX</span>\n'
        '        <h2 class="section-title">知识领域</h2>\n'
        '        <p class="section-desc">按研究方向组织专题入口，保留已上线与规划中的完整知识结构。</p>\n'
        '      </div>\n'
        '      <a class="hero-btn" href="#top">返回控制台</a>\n'
        '    </div>\n'
        '    <div class="grid-auto">\n\n'
        f'{_render_home_domain_cards()}\n\n'
        '    </div>\n'
        '  </div>\n'
        '</section>'
    )
    pattern = r'<section class="domains-section" id="domains">.*?</section>'
    return re.sub(pattern, section_html, index_html, count=1, flags=re.DOTALL)


def render_index():
    """刷新根目录 index.html 中的构建日期与统计数值。"""
    if not INDEX_HTML.is_file():
        warn(f"未找到首页模板：{INDEX_HTML}")
        return

    html = INDEX_HTML.read_text(encoding="utf-8")

    build_date   = today_str()
    stat_live    = _count_live_topics(PAGES_DIR)
    stat_domains = sum(1 for domain_id in DOMAIN_MAP if is_domain_enabled(domain_id))
    stat_total   = _count_total_topics()
    stat_papers  = _count_collected_papers(PAGES_DIR)

    html = apply_placeholder(html, "BUILD_DATE",        build_date)
    html = apply_placeholder(html, "STAT_TOPICS_LIVE",  str(stat_live))
    html = apply_placeholder(html, "STAT_DOMAINS",      str(stat_domains))
    html = apply_placeholder(html, "STAT_TOPICS_TOTAL", str(stat_total))
    html = apply_placeholder(html, "STAT_PAPER_COUNT", str(stat_papers))
    html = _refresh_domains_section(html)

    INDEX_HTML.write_text(html, encoding="utf-8")
    ok(f"刷新首页 index.html · 更新日期={build_date} · "
       f"已上线={stat_live} · 核心领域={stat_domains} · 知识专题={stat_total} · 已整理论文={stat_papers}")
