"""domain_builder.py — 为每个一级领域生成 pages/<domain>/index.html 目录页。

已上线卡片信息（📄 N 个算法示例 / 🕐 xxx 版）通过扫描同目录下
<topic_id>-data.js 中的 `window.PAGE_CONFIG` 自动提取，**不手工维护**。
DOMAIN_CATALOG 里每个 topic 的可选 `match` 字段（= topic_id）用来
指定该二级标签对应的 data.js 源。
"""

from __future__ import annotations

import json
import re
from pathlib import Path

from .common import DOMAIN_CATALOG, DOMAIN_MAP, ROOT, is_domain_enabled, is_publish_enabled, ok, warn
from .topic_builder import peek_front_matter


# ============ 已上线信息扫描 ============

PAGE_CONFIG_RE = re.compile(r"window\.PAGE_CONFIG\s*=\s*(\{.*?\});\s*$", re.DOTALL)
DATA_JS_SOURCE_RE = re.compile(r"源文件：([^\n]+)")


def normalize_topic_key(text: str) -> str:
    """归一化专题名，便于 catalog 与已上线页面做宽松匹配。"""
    s = str(text or "").strip().lower()
    s = s.replace("（", "(").replace("）", ")")
    s = re.sub(r"\bai\b", "", s)
    s = s.replace("llm", "").replace("vlm", "").replace("vla", "")
    s = re.sub(r"[\s\-_()/·,.]+", "", s)
    return s


def load_page_config(data_js: Path) -> dict | None:
    """从 <topic_id>-data.js 中把 JSON 还原出来。"""
    try:
        text = data_js.read_text(encoding="utf-8")
    except OSError:
        return None
    m = PAGE_CONFIG_RE.search(text)
    if not m:
        return None
    try:
        return json.loads(m.group(1))
    except json.JSONDecodeError:
        return None


def read_data_js_source(data_js: Path) -> str:
    """读取 data.js 注释头中的源文件路径。"""
    try:
        text = data_js.read_text(encoding="utf-8")
    except OSError:
        return ""
    m = DATA_JS_SOURCE_RE.search(text)
    if not m:
        return ""
    return m.group(1).strip()


def is_source_public(data_js: Path) -> bool:
    source_path = read_data_js_source(data_js)
    if not source_path or source_path.startswith("pipeline/examples/"):
        return False
    src = (ROOT / source_path).resolve()
    if not src.is_file():
        return False
    fm = peek_front_matter(src)
    return (
        bool(fm)
        and is_domain_enabled(str(fm.get("domain", "")).strip())
        and is_publish_enabled(fm.get("publish", True))
    )


def scan_live_topics(domain_id: str) -> dict[str, dict]:
    """扫描 pages/<domain>/ 下所有 <topic_id>-data.js，返回 {topic_id: info}。

    info 字段：
        page        -> "<topic_id>.html"
        subtitle    -> meta.page_subtitle
        algo_count  -> len(algos)
        topic_name  -> meta.topic_name
        page_desc   -> meta.page_desc
    """
    meta_info: dict = DOMAIN_MAP.get(domain_id, {})
    domain_dir = ROOT / meta_info.get("dir", f"pages/{domain_id}")
    if not domain_dir.is_dir():
        return {}

    result: dict[str, dict] = {}
    for data_js in domain_dir.glob("*-data.js"):
        if not is_source_public(data_js):
            continue
        cfg = load_page_config(data_js)
        if not cfg:
            continue
        topic_id = data_js.name[: -len("-data.js")]
        html_file = domain_dir / f"{topic_id}.html"
        if not html_file.is_file():
            continue
        meta = cfg.get("meta", {})
        algos = cfg.get("algos", [])
        result[topic_id] = {
            "topic_id":    topic_id,
            "page":       f"{topic_id}.html",
            "subtitle":   meta.get("page_subtitle", ""),
            "algo_count": len(algos) if isinstance(algos, list) else 0,
            "topic_name": meta.get("topic_name", topic_id),
            "page_desc":  meta.get("page_desc", ""),
        }
    return result


def resolve_live_topic(topic: dict, live_map: dict[str, dict]) -> dict | None:
    """优先使用手工 match，其次按专题名自动匹配。"""
    match_id = topic.get("match")
    if match_id:
        live = live_map.get(match_id)
        if live:
            return live

    topic_name = topic.get("name", "")
    target = normalize_topic_key(topic_name)
    if target:
        exact = [
            live for live in live_map.values()
            if normalize_topic_key(live.get("topic_name", "")) == target
        ]
        if len(exact) == 1:
            return exact[0]

        fuzzy = [
            live for live in live_map.values()
            if target in normalize_topic_key(live.get("topic_name", ""))
            or normalize_topic_key(live.get("topic_name", "")) in target
        ]
        if len(fuzzy) == 1:
            return fuzzy[0]
    return None


# 为兼容旧导入提供的别名（避免其他模块临时引用私有名）
_scan_live_topics = scan_live_topics
_resolve_live_topic = resolve_live_topic
_source_is_public = is_source_public


# ============ 卡片渲染 ============

def _topic_card_html(topic: dict, live: dict | None) -> str:
    """渲染单个二级专题卡片。live 为对应已上线信息（无则渲染"即将上线"）。"""
    if live:
        meta_items = [f"📄 {live['algo_count']} 个算法示例"]
        if live.get("subtitle"):
            meta_items.append(f"🕐 {live['subtitle']}")
        meta_html = "".join(f"<span>{m}</span>" for m in meta_items)
        return (
            f'<div class="card card-clickable topic-card ready" '
            f'onclick="window.location.href=\'{live["page"]}\'">'
            f'<span class="badge badge-live">✦ 已上线</span>'
            f'<div class="topic-name" style="margin-top:10px">{topic["name"]}</div>'
            f'<div class="topic-desc">{topic["desc"]}</div>'
            f'<div class="topic-meta">{meta_html}</div>'
            f'</div>'
        )
    return (
        f'<div class="card topic-card coming">'
        f'<span class="badge badge-soon">即将上线</span>'
        f'<div class="topic-name" style="margin-top:10px">{topic["name"]}</div>'
        f'<div class="topic-desc">{topic["desc"]}</div>'
        f'<div class="topic-meta"><span>建设中</span></div>'
        f'</div>'
    )


def _extra_live_topic_card_html(live: dict) -> str:
    """渲染已编译但尚未进入 DOMAIN_CATALOG 的专题卡片。"""
    topic = {
        "name": live.get("topic_name") or live.get("topic_id", ""),
        "desc": live.get("page_desc") or "已编译专题，等待补充到领域目录配置。",
    }
    return _topic_card_html(topic, live)


DOMAIN_INDEX_TEMPLATE = """<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>{domain_name} · AI Knowledge Hub</title>
<script>
(function(){{try{{var theme=localStorage.getItem('kp_theme_v1')||'dark';document.documentElement.dataset.theme=theme==='light'?'light':'dark';document.documentElement.style.colorScheme=document.documentElement.dataset.theme;}}catch(e){{document.documentElement.dataset.theme='dark';}}}})();
</script>
<link rel="stylesheet" href="../../assets/css/common.css">
</head>
<body class="tech-page domain-index-page">
<canvas class="tech-dotfield" aria-hidden="true"></canvas>

<header class="topbar">
  <div class="shell">
    <div class="topbar-inner">
      <a class="brand" href="../../index.html">
        <div class="brand-icon">AI</div>
        <div>
          <div class="brand-text">AI Knowledge Hub</div>
          <div class="brand-sub">AI知识学习平台</div>
        </div>
      </a>
    </div>
  </div>
</header>

<div class="shell-narrow">
  <div class="breadcrumb">
    <a href="../../index.html">首页</a> <span class="sep">/</span> <span class="current">{domain_name}</span>
  </div>
</div>

<div class="shell-narrow">
  <div class="page-header">
    <span class="domain-kicker">DOMAIN NODE</span>
    <h1>{icon} {domain_name}</h1>
    <p>{domain_desc}</p>
    <div class="domain-readout">
      <div class="domain-readout-item">
        <span class="domain-readout-num">{live_hit}</span>
        <span class="domain-readout-label">已上线专题</span>
      </div>
      <div class="domain-readout-item">
        <span class="domain-readout-num">{topic_total}</span>
        <span class="domain-readout-label">目录专题</span>
      </div>
      <div class="domain-readout-item">
        <span class="domain-readout-num">LIVE</span>
        <span class="domain-readout-label">自动扫描</span>
      </div>
    </div>
  </div>
</div>

<section class="section">
  <div class="shell-narrow">
    <div class="grid-auto">

{cards}

    </div>
  </div>
</section>

<footer>
  <div class="shell">
    <p>AI Knowledge Hub  © 2026 · AI知识学习平台</p>
  </div>
</footer>

<script src="../../assets/js/tech-effects.js" defer></script>
</body>
</html>
"""


def render_domain_indexes():
    """为每个一级领域生成 pages/<domain>/index.html 目录页。"""
    for domain_id, meta in DOMAIN_MAP.items():
        if not is_domain_enabled(domain_id):
            continue
        catalog = DOMAIN_CATALOG.get(domain_id)
        if not catalog:
            warn(f"领域 {domain_id} 未配置二级标签，跳过目录页生成")
            continue

        live_map = scan_live_topics(domain_id)

        out_dir = ROOT / meta["dir"]
        out_dir.mkdir(parents=True, exist_ok=True)
        out_file = out_dir / "index.html"

        cards = []
        live_hit = 0
        matched_topic_ids: set[str] = set()
        for topic in catalog["topics"]:
            live = resolve_live_topic(topic, live_map)
            if live:
                live_hit += 1
                matched_topic_ids.add(live["topic_id"])
            cards.append("      " + _topic_card_html(topic, live))

        extra_live_topics = [
            live_map[topic_id]
            for topic_id in sorted(live_map.keys())
            if topic_id not in matched_topic_ids
        ]
        for live in extra_live_topics:
            live_hit += 1
            cards.append("      " + _extra_live_topic_card_html(live))

        html = DOMAIN_INDEX_TEMPLATE.format(
            domain_name=meta["name"],
            icon=catalog["icon"],
            domain_desc=catalog["desc"],
            live_hit=live_hit,
            topic_total=len(catalog["topics"]) + len(extra_live_topics),
            cards="\n".join(cards),
        )
        out_file.write_text(html, encoding="utf-8")
        ok(f"刷新领域目录页 {out_file.relative_to(ROOT)} · "
           f"{len(catalog['topics']) + len(extra_live_topics)} 个专题（{live_hit} 个已上线）")
