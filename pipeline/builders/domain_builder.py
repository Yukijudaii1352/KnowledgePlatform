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

from .common import DOMAIN_CATALOG, DOMAIN_MAP, PAGES_DIR, ROOT, ok, warn


# ============ 已上线信息扫描 ============

PAGE_CONFIG_RE = re.compile(r"window\.PAGE_CONFIG\s*=\s*(\{.*?\});\s*$", re.DOTALL)


def _load_page_config(data_js: Path) -> dict | None:
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


def _scan_live_topics(domain_id: str) -> dict[str, dict]:
    """扫描 pages/<domain>/ 下所有 <topic_id>-data.js，返回 {topic_id: info}。

    info 字段：
        page        -> "<topic_id>.html"
        subtitle    -> meta.page_subtitle
        algo_count  -> len(algos)
        topic_name  -> meta.topic_name
    """
    meta_info: dict = DOMAIN_MAP.get(domain_id, {})
    domain_dir = ROOT / meta_info.get("dir", f"pages/{domain_id}")
    if not domain_dir.is_dir():
        return {}

    result: dict[str, dict] = {}
    for data_js in domain_dir.glob("*-data.js"):
        cfg = _load_page_config(data_js)
        if not cfg:
            continue
        topic_id = data_js.name[: -len("-data.js")]
        html_file = domain_dir / f"{topic_id}.html"
        if not html_file.is_file():
            continue
        meta = cfg.get("meta", {})
        algos = cfg.get("algos", [])
        result[topic_id] = {
            "page":       f"{topic_id}.html",
            "subtitle":   meta.get("page_subtitle", ""),
            "algo_count": len(algos) if isinstance(algos, list) else 0,
            "topic_name": meta.get("topic_name", topic_id),
        }
    return result


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


DOMAIN_INDEX_TEMPLATE = """<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>{domain_name} · AI Knowledge Hub</title>
<link rel="stylesheet" href="../../assets/css/common.css">
<style>
.topic-card {{ position: relative; transition: all 0.28s ease; }}
.topic-card.ready {{ border-left: 3px solid var(--accent); }}
.topic-card.coming {{ opacity: 0.55; }}
.topic-card.card-clickable:hover {{ transform: translateY(-3px); }}
.topic-name {{ font-size: 1.08rem; font-weight: 700; margin-bottom: 8px; color: var(--text); }}
.topic-desc {{ color: var(--text-secondary); font-size: 0.9rem; line-height: 1.65; }}
.topic-meta {{
  display: flex; gap: 14px; margin-top: 14px;
  font-size: 0.82rem; color: var(--text-dim);
}}
</style>
</head>
<body>

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
    <h1>{icon} {domain_name}</h1>
    <p>{domain_desc}</p>
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

</body>
</html>
"""


def render_domain_indexes():
    """为每个一级领域生成 pages/<domain>/index.html 目录页。"""
    for domain_id, meta in DOMAIN_MAP.items():
        catalog = DOMAIN_CATALOG.get(domain_id)
        if not catalog:
            warn(f"领域 {domain_id} 未配置二级标签，跳过目录页生成")
            continue

        live_map = _scan_live_topics(domain_id)

        out_dir = ROOT / meta["dir"]
        out_dir.mkdir(parents=True, exist_ok=True)
        out_file = out_dir / "index.html"

        cards = []
        live_hit = 0
        for topic in catalog["topics"]:
            match_id = topic.get("match")
            live = live_map.get(match_id) if match_id else None
            if live:
                live_hit += 1
            cards.append("      " + _topic_card_html(topic, live))

        html = DOMAIN_INDEX_TEMPLATE.format(
            domain_name=meta["name"],
            icon=catalog["icon"],
            domain_desc=catalog["desc"],
            cards="\n".join(cards),
        )
        out_file.write_text(html, encoding="utf-8")
        ok(f"刷新领域目录页 {out_file.relative_to(ROOT)} · "
           f"{len(catalog['topics'])} 个专题（{live_hit} 个已上线）")
