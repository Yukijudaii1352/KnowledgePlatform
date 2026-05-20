"""home_builder.py — 刷新根目录 index.html 上的构建日期、统计数字和领域卡片。"""

from __future__ import annotations

import html
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


def _count_total_topics() -> int:
    """首页知识专题数 = DOMAIN_CATALOG 中配置的全部二级标签数。"""
    return sum(len(catalog.get("topics", [])) for catalog in DOMAIN_CATALOG.values())


def _render_home_domain_cards() -> str:
    """根据 DOMAIN_CATALOG + 已编译专题实时生成首页领域卡片。"""
    cards: list[str] = []

    for idx, (domain_id, meta) in enumerate(DOMAIN_MAP.items(), start=1):
        catalog = DOMAIN_CATALOG.get(domain_id, {})
        topics = catalog.get("topics", [])
        live_map = _scan_live_topics(domain_id)

        active_names = {
            topic["name"]
            for topic in topics
            if _resolve_live_topic(topic, live_map)
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
        '    <h2 class="section-title">🗂️ 知识领域</h2>\n'
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
    stat_domains = len(DOMAIN_MAP)
    stat_total   = _count_total_topics()

    html = apply_placeholder(html, "BUILD_DATE",        build_date)
    html = apply_placeholder(html, "STAT_TOPICS_LIVE",  str(stat_live))
    html = apply_placeholder(html, "STAT_DOMAINS",      str(stat_domains))
    html = apply_placeholder(html, "STAT_TOPICS_TOTAL", str(stat_total))
    html = _refresh_domains_section(html)

    INDEX_HTML.write_text(html, encoding="utf-8")
    ok(f"刷新首页 index.html · 更新日期={build_date} · "
       f"已上线={stat_live} · 核心领域={stat_domains} · 知识专题={stat_total}")
