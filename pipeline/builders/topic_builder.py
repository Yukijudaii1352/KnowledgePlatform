"""topic_builder.py — 将符合 DOCUMENT_SPEC 的 markdown 文档编译为二级标签页。

输出：
    pages/{domain}/{topic_id}.html
    pages/{domain}/{topic_id}-data.js
    pages/{domain}/{topic_id}-logic.js
并可选地把源文档旁的 images/ 同步到 assets/images/<topic>/。
"""

from __future__ import annotations

import json
import re
import shutil
import sys
import html as html_lib
from pathlib import Path

try:
    import yaml
except ImportError:
    sys.stderr.write("缺少 PyYAML。请先 `pip install pyyaml markdown`\n")
    sys.exit(1)

try:
    import markdown
except ImportError:
    sys.stderr.write("缺少 markdown 库。请先 `pip install markdown`\n")
    sys.exit(1)

from .common import (
    DOMAIN_MAP,
    ROOT,
    TEMPLATE_HTML,
    TEMPLATE_LOGIC,
    err,
    info,
    ok,
    today_str,
    warn,
)


# ============ Front-matter ============

FRONT_MATTER_RE = re.compile(r"^---\s*\n(.*?\n)---\s*\n", re.DOTALL)


def split_front_matter(text: str):
    m = FRONT_MATTER_RE.match(text)
    if not m:
        err("文档顶部未检测到 YAML front-matter（必须以 `---` 开头）")
    fm = yaml.safe_load(m.group(1))
    if not isinstance(fm, dict):
        err("YAML front-matter 不是合法的 dict")
    return fm, text[m.end():]


def peek_front_matter(path: Path):
    """只读 front-matter 不动正文。返回 dict，若失败返回 None（静默）。"""
    try:
        text = path.read_text(encoding="utf-8")
    except OSError:
        return None
    m = FRONT_MATTER_RE.match(text)
    if not m:
        return None
    try:
        fm = yaml.safe_load(m.group(1))
    except yaml.YAMLError:
        return None
    return fm if isinstance(fm, dict) else None


# ============ 板块切分 ============

def split_sections(body: str):
    parts = {}
    current_title, current_buf = None, []
    in_fence = False
    for line in body.splitlines():
        if re.match(r"^```", line):
            in_fence = not in_fence
        m = re.match(r"^##\s+(.+?)\s*$", line)
        if m and not in_fence and not line.startswith("###"):
            if current_title is not None:
                parts[current_title] = "\n".join(current_buf).strip()
            current_title = m.group(1).strip()
            current_buf = []
        else:
            if current_title is not None:
                current_buf.append(line)
    if current_title is not None:
        parts[current_title] = "\n".join(current_buf).strip()
    return parts


# ============ 领域综述 ============

INCLUDE_RAW_RE = re.compile(r"^\s*!INCLUDE_RAW\s+(.+?)\s*$")

OVERVIEW_META_PREFIXES = (
    "- 来源平台:",
    "- 原文链接:",
    "- 作者:",
    "- 发表日期:",
    "- 发布日期:",
)


def _sanitize_overview_metadata(md: str) -> str:
    """清洗抓取综述开头的元信息，只保留平台、链接、作者和日期。"""
    lines = md.splitlines()
    if not lines:
        return md

    sep_idx = None
    for idx, line in enumerate(lines[:40]):
        if line.strip() == "---":
            sep_idx = idx
            break
    if sep_idx is None:
        return md

    header_lines = lines[:sep_idx]
    if not any(line.startswith("- 来源平台:") for line in header_lines):
        return md

    kept_meta = [line for line in header_lines if line.startswith(OVERVIEW_META_PREFIXES)]
    if not kept_meta:
        return md

    title_block: list[str] = []
    for line in header_lines:
        if line.startswith("# "):
            title_block = [line]
            break

    sanitized_lines: list[str] = []
    if title_block:
        sanitized_lines.extend(title_block)
        sanitized_lines.append("")
    sanitized_lines.extend(kept_meta)
    sanitized_lines.extend(["", "---"])

    body_lines = lines[sep_idx + 1:]
    while body_lines and not body_lines[0].strip():
        body_lines = body_lines[1:]
    if body_lines:
        sanitized_lines.extend([""] + body_lines)

    return "\n".join(sanitized_lines)


def _valid_overview_sections(value):
    if not isinstance(value, list):
        return False
    return all(isinstance(item, dict) and isinstance(item.get("body_html"), str) for item in value)


def load_existing_page_config(domain: str, topic_id: str) -> dict:
    domain_meta = DOMAIN_MAP.get(domain) or {}
    data_path = ROOT / str(domain_meta.get("dir", "")) / f"{topic_id}-data.js"
    if not data_path.is_file():
        return {}
    try:
        text = data_path.read_text(encoding="utf-8")
        match = re.search(r"window\.PAGE_CONFIG\s*=\s*(\{.*\})\s*;\s*$", text, re.S)
        if not match:
            return {}
        data = json.loads(match.group(1))
        return data if isinstance(data, dict) else {}
    except Exception as exc:
        warn(f"[{data_path}] 读取历史编译产物失败，无法作为 INCLUDE_RAW 兜底：{exc}")
        return {}


def missing_raw_section(section_name: str, include_path: Path):
    return [{
        "title": f"{section_name}原文暂不可用",
        "body_html": md_to_html(
            f"编译时未找到引用的原文文件：`{include_path}`。\n\n"
            "请恢复该文件，或重新运行 researcher 更新对应的 `*.sources.yaml`。"
        ),
    }]


def parse_overview(
    md_body: str,
    section_name: str = "领域综述",
    src: Path | None = None,
    fallback_sections=None,
):
    if not md_body.strip():
        err(f"`## {section_name}` 板块为空")
    include_match = INCLUDE_RAW_RE.match(md_body.strip())
    if include_match:
        include_path = Path(include_match.group(1).strip())
        if not include_path.is_absolute():
            base = src.parent if src else ROOT
            include_path = (base / include_path).resolve()
        if not include_path.is_file():
            if _valid_overview_sections(fallback_sections):
                warn(f"`## {section_name}` 引用的原文文件不存在：{include_path}；复用已有编译产物")
                return fallback_sections
            warn(f"`## {section_name}` 引用的原文文件不存在：{include_path}；使用缺失提示占位")
            return missing_raw_section(section_name, include_path)
        raw_md = include_path.read_text(encoding="utf-8")
        return [{"title": "", "body_html": md_to_html(_sanitize_overview_metadata(raw_md))}]
    md_body = _sanitize_overview_metadata(md_body)
    out = []
    current_title, current_buf = None, []
    in_fence = False
    for line in md_body.splitlines():
        if re.match(r"^```", line):
            in_fence = not in_fence
        m = re.match(r"^###\s+(.+?)\s*$", line)
        if m and not in_fence:
            if current_title is not None:
                out.append({"title": current_title,
                            "body_html": md_to_html("\n".join(current_buf))})
            current_title = m.group(1).strip()
            current_buf = []
        else:
            if current_title is not None:
                current_buf.append(line)
    if current_title is not None:
        out.append({"title": current_title,
                    "body_html": md_to_html("\n".join(current_buf))})
    if not out:
        # 允许直接粘贴整篇原文 markdown，而不强制拆成 `###` 小节。
        return [{"title": "", "body_html": md_to_html(md_body)}]
    return out


def default_overview_section(title: str = "待定", body: str = "待定。"):
    return [{"title": title, "body_html": md_to_html(body)}]


def default_latest_overview_section():
    return [{
        "title": "待补充：最近一个月最新动向",
        "body_html": md_to_html(
            "请在源知识文档的 `## 最新进展综述` 板块中补充最近一个月内该领域的最新动向、代表性工作与趋势判断。"
        ),
    }]


# ============ 演化关系 ============

YAML_CODE_RE = re.compile(r"```ya?ml\s*\n(.*?)\n```", re.DOTALL)


def extract_first_yaml_block(body: str, section_name: str):
    m = YAML_CODE_RE.search(body)
    if not m:
        err(f"`{section_name}` 板块缺少 yaml 代码块")
    try:
        return yaml.safe_load(m.group(1))
    except yaml.YAMLError as e:
        err(f"`{section_name}` 中 yaml 解析失败：{e}")


def parse_graph(md_body: str):
    data = extract_first_yaml_block(md_body, "## 算法演化关系")
    nodes = data.get("nodes", [])
    edges = data.get("edges", [])
    milestones = data.get("milestones", [])
    if not nodes:
        err("算法演化关系缺少 nodes")
    return {"nodes": nodes, "edges": edges, "milestones": milestones}


# ============ 核心算法 ============

ALGO_SECTION_TITLES = {
    "summary":   r"^####\s+📝\s*一句话总结\s*$",
    "keypoints": r"^####\s+🎯\s*核心要点\s*$",
    "detail":    r"^####\s+🔬\s*深入细节\s*$",
    "quiz":      r"^####\s+🧪\s*练习题\s*$",
}


def _normalize_quiz_answer(value) -> int:
    if isinstance(value, int):
        return value
    s = str(value).strip()
    if len(s) == 1 and s.upper() in "ABCD":
        return ord(s.upper()) - ord("A")
    try:
        return int(s)
    except (TypeError, ValueError):
        return 0


def parse_algorithms(md_body: str, image_base: str, categories_keys):
    algo_chunks = []
    current_header, buf = None, []
    in_fence = False
    for line in md_body.splitlines():
        if re.match(r"^```", line):
            in_fence = not in_fence
        m = re.match(r"^###\s+(.+?)\s*$", line)
        if m and not in_fence:
            if current_header is not None:
                algo_chunks.append((current_header, "\n".join(buf)))
            current_header = m.group(1).strip()
            buf = []
        else:
            if current_header is not None:
                buf.append(line)
    if current_header is not None:
        algo_chunks.append((current_header, "\n".join(buf)))

    if not algo_chunks:
        err("`## 核心算法` 下没有任何 `### 算法` 条目")

    return [parse_single_algo(h, c, image_base, categories_keys)
            for h, c in algo_chunks]


def parse_single_algo(header: str, body: str, image_base: str, categories_keys):
    meta = extract_first_yaml_block(body, f"### {header}")
    body_after = YAML_CODE_RE.sub("", body, count=1)

    subs = {}
    current_key, current_buf = None, []

    def flush():
        nonlocal current_key, current_buf
        if current_key is not None:
            subs[current_key] = "\n".join(current_buf).strip()
        current_key, current_buf = None, []

    for line in body_after.splitlines():
        matched_key = None
        for k, pat in ALGO_SECTION_TITLES.items():
            if re.match(pat, line):
                matched_key = k
                break
        if matched_key:
            flush()
            current_key = matched_key
            current_buf = []
        else:
            if current_key is not None:
                current_buf.append(line)
    flush()

    for r in ("id", "num", "name", "year", "org"):
        if r not in meta:
            err(f"算法 `{header}` 缺少必填字段 {r}")

    algo = {
        "id":         str(meta["id"]),
        "num":        int(meta["num"]),
        "name":       meta["name"],
        "fullName":   meta.get("full_name", ""),
        "year":       str(meta.get("year", "")),
        "org":        meta.get("org", ""),
        "parent":     meta.get("parent", "—"),
        "paperUrl":   meta.get("paper_url", ""),
        "projectUrl": meta.get("project_url", ""),
        "category":   meta.get("category", ""),
        "motivation": meta.get("motivation", ""),
    }
    if algo["category"] and categories_keys and algo["category"] not in categories_keys:
        err(f"算法 {algo['id']} 的 category={algo['category']} 不在 front-matter.categories 中")

    if "summary" not in subs:
        err(f"算法 {algo['id']} 缺少 `#### 📝 一句话总结`")
    algo["summary"] = subs["summary"].strip()

    if "keypoints" not in subs:
        err(f"算法 {algo['id']} 缺少 `#### 🎯 核心要点`")
    kp_lines = [md_inline_to_html(l.strip()[2:].strip()) for l in subs["keypoints"].splitlines()
                if l.strip().startswith("- ") or l.strip().startswith("* ")]
    algo["keyPoints"] = kp_lines

    if "detail" in subs:
        algo["detail"] = md_to_html(subs["detail"], image_base=image_base)

    if "quiz" in subs:
        q_yaml_match = YAML_CODE_RE.search(subs["quiz"])
        if q_yaml_match:
            try:
                q = yaml.safe_load(q_yaml_match.group(1)) or {}
            except yaml.YAMLError:
                q = {}
            if isinstance(q, list):
                q = q[0] if q and isinstance(q[0], dict) else {}
            if not isinstance(q, dict):
                q = {}
            algo["quiz"] = {
                "q":       q.get("question", ""),
                "options": q.get("options", []),
                "answer":  _normalize_quiz_answer(q.get("answer", 0)),
                "explain": q.get("explain", ""),
            }

    return algo


# ============ Markdown → HTML ============

MD_EXTS = ["fenced_code", "tables", "attr_list", "def_list"]
INLINE_MATH_RE = re.compile(r"\\\((.+?)\\\)", re.DOTALL)
BRACKET_MATH_RE = re.compile(r"\\\[(.+?)\\\]", re.DOTALL)
BLOCK_MATH_RE = re.compile(r"\$\$(.+?)\$\$", re.DOTALL)
INLINE_DOLLAR_MATH_RE = re.compile(r"\$\$([^\n]+?)\$\$")


def _normalize_inline_dollar_math(md: str) -> str:
    """把段内 `$$...$$` 归一化为 `\\(...\\)`，避免被 KaTeX 当成块公式独占一行。"""
    lines = md.splitlines()
    out: list[str] = []
    in_fence = False

    for line in lines:
        if line.strip().startswith("```"):
            in_fence = not in_fence
            out.append(line)
            continue

        if in_fence or line.count("$$") < 2:
            out.append(line)
            continue

        def _replace_inline(match: re.Match[str]) -> str:
            before = line[:match.start()].strip()
            after = line[match.end():].strip()
            # 整行只有一个 `$$...$$` 时保留为块公式；其余情况视为段内数学。
            if not before and not after and line.strip() == match.group(0).strip():
                return match.group(0)
            body = match.group(1).strip()
            return rf"\({body}\)"

        out.append(INLINE_DOLLAR_MATH_RE.sub(_replace_inline, line))

    return "\n".join(out)


def _protect_math_spans(md: str):
    """在 markdown 解析前先保护数学公式，避免 `_` 被当成强调语法。"""
    stash: dict[str, dict[str, object]] = {}
    counter = 0

    def _repl_factory(display: bool):
        def _repl(m):
            nonlocal counter
            token = f"@@MATH_{counter}@@"
            counter += 1
            stash[token] = {
                "display": display,
                "body": m.group(1).strip(),
            }
            return token
        return _repl

    protected = md
    protected = BLOCK_MATH_RE.sub(_repl_factory(True), protected)
    protected = BRACKET_MATH_RE.sub(_repl_factory(True), protected)
    protected = INLINE_MATH_RE.sub(_repl_factory(False), protected)
    return protected, stash


def _restore_math_spans(html: str, stash: dict[str, dict[str, object]]) -> str:
    for token, payload in stash.items():
        expr = html_lib.escape(str(payload.get("body", "")))
        if payload.get("display"):
            rendered = f'<div class="kb-math kb-math-display">{expr}</div>'
        else:
            rendered = f'<span class="kb-math kb-math-inline">{expr}</span>'
        html = html.replace(token, rendered)
    html = re.sub(
        r"<p>\s*(<div class=\"kb-math kb-math-display\">.*?</div>)\s*</p>",
        r"\1",
        html,
        flags=re.DOTALL,
    )
    return html


def md_inline_to_html(md: str) -> str:
    """把单行 markdown 转成适合嵌入列表项的 HTML。"""
    md = _normalize_inline_dollar_math(md)
    protected_md, math_stash = _protect_math_spans(md)
    html = markdown.markdown(protected_md, extensions=MD_EXTS).strip()
    html = _restore_math_spans(html, math_stash)
    if html.startswith("<p>") and html.endswith("</p>"):
        html = html[3:-4]
    return html


TABLE_SEP_RE = re.compile(r"^\s*\|?(?:\s*:?-{3,}:?\s*\|)+\s*:?-{3,}:?\s*\|?\s*$")


def _looks_like_table_row(line: str) -> bool:
    s = line.strip()
    return bool(s) and "|" in s and not s.startswith("```")


def _normalize_pipe_tables(md: str) -> str:
    """给 markdown pipe table 前后补空行，提升 python-markdown 的识别稳定性。"""
    lines = md.splitlines()
    out: list[str] = []
    i = 0
    in_fence = False
    while i < len(lines):
        line = lines[i]
        if line.strip().startswith("```"):
            in_fence = not in_fence
            out.append(line)
            i += 1
            continue

        if (
            not in_fence
            and i + 1 < len(lines)
            and _looks_like_table_row(line)
            and TABLE_SEP_RE.match(lines[i + 1] or "")
        ):
            if out and out[-1].strip():
                out.append("")
            while i < len(lines) and _looks_like_table_row(lines[i]):
                out.append(lines[i])
                i += 1
            if i < len(lines) and lines[i].strip():
                out.append("")
            continue

        out.append(line)
        i += 1
    return "\n".join(out)


def md_to_html(md: str, image_base: str = "") -> str:
    md = _normalize_pipe_tables(md)
    md = _normalize_inline_dollar_math(md)
    protected_md, math_stash = _protect_math_spans(md)
    html = markdown.markdown(protected_md, extensions=MD_EXTS)
    html = _restore_math_spans(html, math_stash)
    html = re.sub(r"<blockquote>\s*<p>💡\s*(.*?)</p>\s*</blockquote>",
                  r'<div class="key-point">💡 \1</div>', html, flags=re.DOTALL)
    html = re.sub(r"<blockquote>\s*<p>⚠️\s*(.*?)</p>\s*</blockquote>",
                  r'<div class="warn-box">⚠️ \1</div>', html, flags=re.DOTALL)
    html = re.sub(
        r"(<table>.*?</table>)",
        r'<div class="table-wrap">\1</div>',
        html,
        flags=re.DOTALL,
    )
    if image_base:
        def _img_sub(m):
            alt, src = m.group(1), m.group(2)
            full = src if src.startswith(("http://", "https://", "/")) else image_base + src
            cap = f'<p class="img-caption">▲ {alt}</p>' if alt else ""
            return f'<div class="img-wrap"><img src="{full}" alt="{alt}" loading="lazy">{cap}</div>'
        html = re.sub(r'<p><img\s+alt="([^"]*)"\s+src="([^"]+)"[^>]*/?></p>', _img_sub, html)
    return html


# ============ data.js 生成 ============

DATA_JS_HEADER = """/**
 * {topic_id}-data.js — 由 pipeline/build.py 于 {ts} 自动生成。
 * 源文件：{src}
 * ⚠️  请勿手动修改；如需更新，修改源文档后重新编译。
 */
"""


def generate_data_js(topic_id: str, src_path: str, cfg: dict) -> str:
    import datetime
    ts = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    body = json.dumps(cfg, ensure_ascii=False, indent=2)
    return (DATA_JS_HEADER.format(topic_id=topic_id, ts=ts, src=src_path)
            + "window.PAGE_CONFIG = " + body + ";\n")


# ============ page_subtitle 解析 ============
# 约定：
#   1. 若 front-matter 中未提供 page_subtitle，默认使用 "{build_date} 版"。
#   2. 若提供，支持 {build_date} 占位符，编译时自动替换为 YYYY-MM-DD。

def resolve_page_subtitle(raw: str | None) -> str:
    build_date = today_str()
    if raw is None or str(raw).strip() == "":
        return f"{build_date} 版"
    return str(raw).replace("{build_date}", build_date)


def choose_display_topic_name(topic_id: str, topic_name: str, page_title: str) -> str:
    candidate = str(topic_name or "").strip()
    topic_id = str(topic_id or "").strip()
    page_title = str(page_title or "").strip()
    if not candidate:
        return page_title or topic_id
    if candidate == topic_id and page_title:
        return page_title
    return candidate


# ============ 主流程 ============

def compile_doc(src: Path, copy_images: bool = False, dry_run: bool = False):
    """编译一篇源文档为二级页。"""
    text = src.read_text(encoding="utf-8")
    fm, body = split_front_matter(text)

    for required in ("domain", "topic_id", "topic_name", "page_title", "categories"):
        if required not in fm:
            err(f"[{src}] front-matter 缺少字段 `{required}`")
    domain = fm["domain"]
    if domain not in DOMAIN_MAP:
        err(f"[{src}] domain={domain} 不在白名单 {list(DOMAIN_MAP.keys())}")
    topic_id = fm["topic_id"]
    if not re.match(r"^[a-z0-9_-]+$", topic_id):
        err(f"[{src}] topic_id={topic_id} 只允许小写字母/数字/下划线/连字符")

    categories = fm["categories"]
    if not isinstance(categories, dict):
        err("front-matter.categories 必须是 mapping")
    categories_keys = list(categories.keys())

    secs = split_sections(body)
    for must in ("领域综述", "算法演化关系", "核心算法"):
        if must not in secs:
            err(f"[{src}] 缺少 `## {must}` 板块")
    previous_config = load_existing_page_config(domain, topic_id)
    overview = parse_overview(
        secs["领域综述"],
        "领域综述",
        src,
        fallback_sections=previous_config.get("overview"),
    )
    has_latest_overview_doc = "最新进展综述" in secs
    if has_latest_overview_doc:
        latest_overview = parse_overview(
            secs["最新进展综述"],
            "最新进展综述",
            src,
            fallback_sections=previous_config.get("latest_overview"),
        )
    else:
        warn(f"[{src}] 缺少 `## 最新进展综述`，将注入占位模板")
        latest_overview = default_latest_overview_section()
    graph = parse_graph(secs["算法演化关系"])

    image_base = fm.get("image_base", "")
    algos = parse_algorithms(secs["核心算法"], image_base, categories_keys)

    algo_ids = {a["id"] for a in algos}
    missing_nodes = [n["id"] for n in graph["nodes"] if n["id"] not in algo_ids]
    if missing_nodes:
        err(f"[{src}] 图谱节点在 `## 核心算法` 中找不到对应算法：{missing_nodes}")
    for e in graph["edges"]:
        if e["from"] not in algo_ids:
            warn(f"edge.from={e['from']} 不在算法列表中")
        if e["to"] not in algo_ids:
            warn(f"edge.to={e['to']} 不在算法列表中")

    # 组装 PAGE_CONFIG（page_subtitle 会被替换为日期驱动的版本）
    page_subtitle = resolve_page_subtitle(fm.get("page_subtitle"))
    display_topic_name = choose_display_topic_name(topic_id, fm["topic_name"], fm["page_title"])

    cfg = {
        "meta": {
            "domain": domain,
            "topic_id": topic_id,
            "topic_name": display_topic_name,
            "page_title": fm["page_title"],
            "page_subtitle": page_subtitle,
            "page_desc": fm.get("page_desc", ""),
            "page_icon": fm.get("page_icon", "📘"),
            "hero_pills": fm.get("hero_pills", []),
            "count_pill": fm.get("count_pill", "{count} 个算法"),
            "image_base": image_base,
            "overview_from_doc": True,
            "latest_overview_from_doc": has_latest_overview_doc,
        },
        "overview": overview,
        "latest_overview": latest_overview,
        "graph":    graph,
        "algos":    algos,
        "categories": categories,
        "projectUrls": {},
    }

    out_dir = ROOT / DOMAIN_MAP[domain]["dir"]
    out_dir.mkdir(parents=True, exist_ok=True)
    out_html = out_dir / f"{topic_id}.html"
    out_data = out_dir / f"{topic_id}-data.js"
    out_logic = out_dir / f"{topic_id}-logic.js"

    template_html = TEMPLATE_HTML.read_text(encoding="utf-8")
    replacements = {
        "{{PAGE_TITLE}}":    fm["page_title"],
        "{{PAGE_SUBTITLE}}": page_subtitle,
        "{{PAGE_DESC}}":     fm.get("page_desc", ""),
        "{{PAGE_ICON}}":     fm.get("page_icon", "📘"),
        "{{DOMAIN_NAME}}":   DOMAIN_MAP[domain]["name"],
        "{{TOPIC_NAME}}":    display_topic_name,
        "{{TOPIC_ID}}":      topic_id,
    }
    for k, v in replacements.items():
        template_html = template_html.replace(k, v)

    if dry_run:
        info("── DRY RUN ──")
        info(f"would write: {out_html}")
        info(f"would write: {out_data}")
        info(f"would write: {out_logic}")
        info(f"algos: {[a['id'] for a in algos]}")
        return

    out_html.write_text(template_html, encoding="utf-8")
    try:
        rel = str(src.relative_to(ROOT))
    except ValueError:
        rel = str(src)
    out_data.write_text(generate_data_js(topic_id, rel, cfg), encoding="utf-8")
    shutil.copy2(TEMPLATE_LOGIC, out_logic)

    ok(f"编译二级页 {out_html.relative_to(ROOT)} · {len(algos)} 个算法 · 副标题={page_subtitle}")

    if copy_images and image_base:
        m = re.search(r"assets/images/([^/]+)/", image_base)
        if m:
            img_subdir = m.group(1)
            target_dir = ROOT / "assets" / "images" / img_subdir
            target_dir.mkdir(parents=True, exist_ok=True)
            src_img_dir = src.parent / "images"
            if src_img_dir.is_dir():
                copied = 0
                for f in src_img_dir.iterdir():
                    if f.is_file():
                        shutil.copy2(f, target_dir / f.name)
                        copied += 1
                ok(f"拷贝 {copied} 张图片到 {target_dir}")
