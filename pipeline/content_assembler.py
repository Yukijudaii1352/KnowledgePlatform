#!/usr/bin/env python3
from __future__ import annotations

import argparse
import json
import re
from dataclasses import dataclass, field
from pathlib import Path
from typing import Any

try:
    import yaml
except ImportError as exc:  # pragma: no cover - import guard
    raise SystemExit("缺少 PyYAML，请先安装：pip install pyyaml") from exc


ROOT = Path(__file__).resolve().parents[1]
CONTENT_DIR = ROOT / "content"

DOMAIN_MAP = {
    "ml": "ml",
    "cv": "cv",
    "llm": "llm",
    "mm": "multimodal",
    "multimodal": "multimodal",
    "aigc": "aigc",
    "embodied": "embodied",
    "infra": "infra",
    "ai4sci": "ai4sci",
}

SECTION_PATTERNS = {
    "summary": re.compile(r"^####\s+📝\s*一句话总结\s*$", re.MULTILINE),
    "keypoints": re.compile(r"^####\s+🎯\s*核心要点\s*$", re.MULTILINE),
    "detail": re.compile(r"^####\s+🔬\s*深入细节\s*$", re.MULTILINE),
    "quiz": re.compile(r"^####\s+🧪\s*练习题\s*$", re.MULTILINE),
}
HEADING_RE = re.compile(r"^####\s+")
CODE_BLOCK_RE = re.compile(r"```ya?ml\s*\n.*?\n```", re.DOTALL)
FRONT_MATTER_RE = re.compile(r"^---\s*\n(.*?\n)---\s*\n", re.DOTALL)


@dataclass
class AssembleStats:
    yaml_path: str
    output_path: str
    overview_source: str = "placeholder"
    latest_overview_source: str = "placeholder"
    resolved_detail_files: dict[str, str] = field(default_factory=dict)
    missing_detail_ids: list[str] = field(default_factory=list)
    placeholder_detail_ids: list[str] = field(default_factory=list)

    def to_dict(self) -> dict[str, Any]:
        return {
            "yaml_path": self.yaml_path,
            "output_path": self.output_path,
            "overview_source": self.overview_source,
            "latest_overview_source": self.latest_overview_source,
            "resolved_detail_files": self.resolved_detail_files,
            "missing_detail_ids": self.missing_detail_ids,
            "placeholder_detail_ids": self.placeholder_detail_ids,
        }


def safe_relative(path: Path, base: Path = ROOT) -> str:
    try:
        return str(path.resolve().relative_to(base.resolve()))
    except Exception:
        return str(path)


def load_yaml(path: Path) -> dict:
    data = yaml.safe_load(path.read_text(encoding="utf-8"))
    if not isinstance(data, dict):
        raise ValueError(f"{path} 不包含 YAML mapping")
    return data


def dump_yaml_block(data: dict | list) -> str:
    return yaml.safe_dump(
        data,
        allow_unicode=True,
        sort_keys=False,
        width=120,
    ).strip()


def pick_page_meta(data: dict) -> dict:
    if isinstance(data.get("page_meta"), dict):
        return data["page_meta"]
    if isinstance(data.get("page"), dict):
        return data["page"]
    return data


def normalize_domain(raw: str | None, path: Path) -> str:
    if raw:
        value = DOMAIN_MAP.get(str(raw).strip(), str(raw).strip())
        if value in DOMAIN_MAP.values():
            return value
    top = path.relative_to(CONTENT_DIR).parts[0]
    value = DOMAIN_MAP.get(top, top)
    if value not in DOMAIN_MAP.values():
        raise ValueError(f"不支持的 domain: {raw or top}")
    return value


def normalize_hero_pills(raw: Any) -> list[str]:
    if raw is None:
        return []
    if isinstance(raw, list):
        return [str(x).strip() for x in raw if str(x).strip()]
    text = str(raw).strip()
    return [text] if text else []


def normalize_categories(raw: Any) -> dict[str, dict[str, str]]:
    if isinstance(raw, dict):
        out: dict[str, dict[str, str]] = {}
        for key, value in raw.items():
            value = value if isinstance(value, dict) else {}
            out[str(key)] = {
                "label": str(value.get("label") or value.get("name") or key),
                "color": str(value.get("color") or "#888888"),
            }
        return out

    out: dict[str, dict[str, str]] = {}
    if isinstance(raw, list):
        for item in raw:
            if not isinstance(item, dict):
                continue
            key = item.get("key") or item.get("id") or item.get("name")
            if not key:
                continue
            out[str(key)] = {
                "label": str(item.get("label") or item.get("name") or key),
                "color": str(item.get("color") or "#888888"),
            }
    return out


def normalize_algorithms(raw: Any) -> list[dict]:
    if not isinstance(raw, list):
        return []
    out = []
    for idx, item in enumerate(raw, start=1):
        if not isinstance(item, dict) or "id" not in item:
            continue
        name = str(item.get("name") or item.get("full_name") or item["id"])
        out.append(
            {
                "id": str(item["id"]),
                "num": int(item.get("num") or idx),
                "name": name,
                "full_name": str(item.get("full_name") or item.get("fullName") or name),
                "year": str(item.get("year") or ""),
                "org": str(item.get("org") or item.get("institution") or ""),
                "paper_url": str(item.get("paper_url") or item.get("paper") or ""),
                "project_url": str(item.get("project_url") or item.get("project") or ""),
                "category": str(item.get("category") or ""),
                "parent": str(item.get("parent") or "—"),
                "motivation": str(item.get("motivation") or ""),
                "description": str(item.get("description") or ""),
            }
        )
    return out


def _parse_year_value(year_text: str) -> tuple[int, int]:
    text = str(year_text or "").strip()
    if not text:
        return (9999, 99)
    parts = text.split(".")
    year = int(parts[0]) if parts[0].isdigit() else 9999
    sub = int(parts[1]) if len(parts) > 1 and parts[1].isdigit() else 0
    return (year, sub)


def normalize_graph(raw_graph: Any, algorithms: list[dict], categories: dict[str, dict]) -> dict:
    algo_by_id = {a["id"]: a for a in algorithms}
    category_order = {key: i for i, key in enumerate(categories.keys(), start=1)}
    if not isinstance(raw_graph, dict):
        raw_graph = {}

    nodes = []
    if isinstance(raw_graph.get("nodes"), list):
        for node in raw_graph["nodes"]:
            if not isinstance(node, dict) or "id" not in node:
                continue
            node_id = str(node["id"])
            nodes.append(
                {
                    "id": node_id,
                    "x": node.get("x", 0),
                    "y": node.get("y", 0),
                    "category": str(node.get("category") or algo_by_id.get(node_id, {}).get("category") or ""),
                }
            )

    if not nodes:
        sorted_algos = sorted(algorithms, key=lambda a: (_parse_year_value(a["year"]), a["num"]))
        for idx, algo in enumerate(sorted_algos, start=1):
            cat_idx = category_order.get(algo["category"], 1)
            nodes.append(
                {
                    "id": algo["id"],
                    "x": 80 + idx * 120,
                    "y": 80 + (cat_idx - 1) * 140,
                    "category": algo["category"],
                }
            )

    node_ids = {n["id"] for n in nodes}
    next_x = max([float(n.get("x", 0) or 0) for n in nodes] + [0]) + 140
    for idx, algo in enumerate(algorithms, start=1):
        if algo["id"] in node_ids:
            continue
        nodes.append(
            {
                "id": algo["id"],
                "x": next_x + idx * 120,
                "y": 80 + (category_order.get(algo["category"], 1) - 1) * 140,
                "category": algo["category"],
            }
        )

    edges = []
    if isinstance(raw_graph.get("edges"), list):
        for edge in raw_graph["edges"]:
            if not isinstance(edge, dict) or "from" not in edge or "to" not in edge:
                continue
            edges.append(
                {
                    "from": str(edge["from"]),
                    "to": str(edge["to"]),
                    "label": str(edge.get("label") or ""),
                }
            )
    else:
        for algo in algorithms:
            if algo["parent"] and algo["parent"] != "—":
                edges.append({"from": algo["parent"], "to": algo["id"], "label": "演进"})

    milestones = raw_graph.get("milestones")
    if not isinstance(milestones, list):
        milestones = [algorithms[0]["id"]] if algorithms else []

    return {"nodes": nodes, "edges": edges, "milestones": milestones}


def split_sections(body: str) -> dict[str, str]:
    parts: dict[str, str] = {}
    current_title: str | None = None
    current_buf: list[str] = []
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


def read_existing_section_map(md_path: Path) -> dict[str, str]:
    if not md_path.is_file():
        return {}
    text = md_path.read_text(encoding="utf-8")
    m = FRONT_MATTER_RE.match(text)
    if m:
        text = text[m.end():]
    return split_sections(text)


def looks_like_placeholder(text: str) -> bool:
    normalized = str(text or "").strip()
    if not normalized:
        return True
    markers = [
        "待定。",
        "### 待定",
        "待补充：最近一个月最新动向",
        "请在源知识文档",
    ]
    return any(marker in normalized for marker in markers)


def extract_section_map(text: str) -> dict[str, str]:
    lines = text.splitlines()
    current = None
    buffers: dict[str, list[str]] = {}
    for line in lines:
        matched = None
        for key, pattern in SECTION_PATTERNS.items():
            if pattern.match(line):
                matched = key
                break
        if matched:
            current = matched
            buffers.setdefault(current, [])
            continue
        if current and not HEADING_RE.match(line):
            buffers[current].append(line)
        elif HEADING_RE.match(line):
            current = None
    return {k: "\n".join(v).strip() for k, v in buffers.items() if "\n".join(v).strip()}


def normalize_key(text: str) -> str:
    text = str(text or "").strip().lower()
    text = text.replace("_detail", "")
    text = re.sub(r"[^a-z0-9]+", "", text)
    return text


def build_algo_aliases(algo: dict) -> set[str]:
    aliases = {
        normalize_key(algo.get("id", "")),
        normalize_key(algo.get("name", "")),
        normalize_key(algo.get("full_name", "")),
    }
    if algo.get("id"):
        aliases.add(normalize_key(str(algo["id"]).replace("_", "")))
    return {a for a in aliases if a}


def resolve_detail_path(yaml_path: Path, algo: dict) -> Path | None:
    detail_dir = yaml_path.with_suffix("")
    if not detail_dir.is_dir():
        return None

    exact_candidates = [
        detail_dir / f"{algo['id']}_detail.md",
        detail_dir / f"{algo['id']}.md",
    ]
    for candidate in exact_candidates:
        if candidate.is_file():
            return candidate

    aliases = build_algo_aliases(algo)
    md_files = [p for p in detail_dir.glob("*.md") if p.is_file()]

    exact_alias_matches = []
    for path in md_files:
        stem_alias = normalize_key(path.stem)
        if stem_alias in aliases:
            exact_alias_matches.append(path)

    if len(exact_alias_matches) == 1:
        return exact_alias_matches[0]
    return None


def read_detail_sections(yaml_path: Path, algo: dict) -> tuple[dict[str, str], Path | None]:
    detail_path = resolve_detail_path(yaml_path, algo)
    if not detail_path:
        return {}, None
    text = detail_path.read_text(encoding="utf-8")
    text = CODE_BLOCK_RE.sub("", text, count=1)
    return extract_section_map(text), detail_path


def build_summary(algo: dict, sections: dict[str, str]) -> str:
    if sections.get("summary"):
        return sections["summary"].strip()
    if algo["description"]:
        return algo["description"].strip()
    if algo["motivation"]:
        return f"{algo['name']} 的核心目标是：{algo['motivation']}。"
    return "待补充。"


def build_keypoints(algo: dict, sections: dict[str, str]) -> list[str]:
    if sections.get("keypoints"):
        points = []
        for line in sections["keypoints"].splitlines():
            stripped = line.strip()
            if stripped.startswith("- ") or stripped.startswith("* "):
                points.append(stripped[2:].strip())
        if points:
            return points

    points = []
    if algo["motivation"]:
        points.append(f"核心动机：{algo['motivation']}")
    if algo["parent"] and algo["parent"] != "—":
        points.append(f"演化来源：继承或改进自 {algo['parent']}")
    if algo["org"]:
        points.append(f"代表机构：{algo['org']}")
    if algo["description"]:
        points.append(algo["description"])
    if not points:
        points.append("待补充。")
    return points[:6]


def build_detail(algo: dict, sections: dict[str, str]) -> str:
    if sections.get("detail"):
        return sections["detail"].strip()
    if algo["description"]:
        return algo["description"].strip()
    if algo["motivation"]:
        return f"{algo['motivation']}\n"
    return "待补充。"


def build_quiz(sections: dict[str, str]) -> str | None:
    quiz = sections.get("quiz")
    if not quiz:
        return None
    if "```yaml" in quiz or "```yml" in quiz:
        return quiz.strip()
    return f"```yaml\n{quiz.strip()}\n```"


def detect_image_base(yaml_path: Path) -> str | None:
    asset_dir = (yaml_path.with_suffix("") / "assets").resolve()
    if asset_dir.is_dir():
        rel = safe_relative(asset_dir).replace("\\", "/")
        return f"../../{rel}/"
    return None


def load_sources_config(yaml_path: Path) -> dict[str, Any]:
    candidates = [
        yaml_path.with_name(f"{yaml_path.stem}.sources.yaml"),
        yaml_path.with_name(f"{yaml_path.stem}.sources.yml"),
        yaml_path.with_name(f"{yaml_path.stem}.survey.yaml"),
        yaml_path.with_name(f"{yaml_path.stem}.survey.yml"),
    ]
    for path in candidates:
        if path.is_file():
            data = load_yaml(path)
            return data if isinstance(data, dict) else {}
    return {}


def discover_default_survey_sources(yaml_path: Path) -> dict[str, Any]:
    """按约定命名自动发现两段综述文档。

    约定位置：
      content/{domain}/{topic}.yaml
      content/{domain}/{topic}_domain_survey.md
      content/{domain}/{topic}_new_survey.md
    """
    topic_id = yaml_path.stem
    candidates = {
        "overview": [
            yaml_path.with_name(f"{topic_id}_domain_survey.md"),
            CONTENT_DIR / f"{topic_id}_domain_survey.md",
        ],
        "latest_overview": [
            yaml_path.with_name(f"{topic_id}_new_survey.md"),
            CONTENT_DIR / f"{topic_id}_new_survey.md",
        ],
    }

    resolved: dict[str, Any] = {}
    for key, paths in candidates.items():
        for path in paths:
            if path.is_file():
                resolved[key] = {"include_raw": safe_relative(path).replace("\\", "/")}
                break
    return resolved


def render_source_entry(entry: Any, output_md: Path) -> str:
    if entry is None:
        return ""
    if isinstance(entry, str):
        path = Path(entry)
        if path.exists():
            rel = safe_relative(path).replace("\\", "/") if path.is_absolute() else path.as_posix()
            return f"!INCLUDE_RAW {rel}"
        return str(entry).strip()
    if isinstance(entry, list):
        blocks = [render_source_entry(item, output_md) for item in entry]
        return "\n\n".join(block for block in blocks if block.strip())
    if not isinstance(entry, dict):
        return str(entry).strip()

    if entry.get("include_raw"):
        raw_path = Path(str(entry["include_raw"]))
        if not raw_path.is_absolute():
            raw_path = (ROOT / raw_path).resolve()
        rel = safe_relative(raw_path).replace("\\", "/")
        return f"!INCLUDE_RAW {rel}"

    if entry.get("markdown_file"):
        raw_path = Path(str(entry["markdown_file"]))
        if not raw_path.is_absolute():
            raw_path = (ROOT / raw_path).resolve()
        rel = safe_relative(raw_path).replace("\\", "/")
        return f"!INCLUDE_RAW {rel}"

    if entry.get("body"):
        title = str(entry.get("title") or "").strip()
        body = str(entry["body"]).strip()
        return f"### {title}\n{body}" if title else body

    if isinstance(entry.get("sections"), list):
        parts = []
        for sec in entry["sections"]:
            if not isinstance(sec, dict):
                continue
            title = str(sec.get("title") or "").strip()
            body = ""
            if sec.get("include_raw"):
                raw_path = Path(str(sec["include_raw"]))
                if not raw_path.is_absolute():
                    raw_path = (ROOT / raw_path).resolve()
                rel = safe_relative(raw_path).replace("\\", "/")
                body = f"!INCLUDE_RAW {rel}"
            elif sec.get("body"):
                body = str(sec["body"]).strip()
            if title:
                parts.append(f"### {title}\n{body}".strip())
            elif body:
                parts.append(body)
        return "\n\n".join(parts)

    return ""


def default_overview_body() -> str:
    return "### 待补充：阶段性领域总结\n请补充一篇纵观一段时间以来的总结性文档，建议使用 `!INCLUDE_RAW path/to/article.md` 引入人工筛选后的 Markdown。"


def default_latest_overview_body() -> str:
    return "### 待补充：最近一个月最新动向\n请补充最近一个月该领域最新动向的综述文档，建议使用 `!INCLUDE_RAW path/to/article.md` 引入人工筛选后的 Markdown。"


def choose_overview_body(
    section_key: str,
    *,
    output_md: Path,
    sources_cfg: dict[str, Any],
    existing_sections: dict[str, str],
    prefer_existing: bool,
) -> tuple[str, str]:
    source_aliases = {
        "领域综述": ["overview", "领域综述"],
        "最新进展综述": ["latest_overview", "最新进展综述", "latest"],
    }
    default_body = default_overview_body if section_key == "领域综述" else default_latest_overview_body

    for alias in source_aliases[section_key]:
        if alias in sources_cfg:
            rendered = render_source_entry(sources_cfg.get(alias), output_md).strip()
            if rendered:
                return rendered, "sources"

    if prefer_existing:
        existing = existing_sections.get(section_key, "").strip()
        if existing and not looks_like_placeholder(existing):
            return existing, "existing_md"

    return default_body(), "placeholder"


def render_document(
    yaml_path: Path,
    *,
    output_path: Path | None = None,
    prefer_existing_overviews: bool = True,
) -> tuple[str, AssembleStats]:
    source = load_yaml(yaml_path)
    meta = pick_page_meta(source)
    output_md = output_path or yaml_path.with_suffix(".md")

    domain = normalize_domain(meta.get("domain") or source.get("domain"), yaml_path)
    topic_id = str(meta.get("topic_id") or source.get("topic_id") or yaml_path.stem)
    topic_name = str(meta.get("topic_name") or source.get("topic_name") or topic_id)
    page_title = str(meta.get("page_title") or source.get("page_title") or topic_name)
    page_subtitle = str(meta.get("page_subtitle") or source.get("page_subtitle") or "{build_date} 版")
    page_desc = str(
        meta.get("page_desc")
        or meta.get("page_description")
        or meta.get("description")
        or source.get("page_desc")
        or source.get("page_description")
        or ""
    )
    page_icon = str(meta.get("page_icon") or meta.get("icon") or source.get("page_icon") or "📘")
    count_pill = str(meta.get("count_pill") or source.get("count_pill") or "{count} 个算法")
    hero_pills = normalize_hero_pills(meta.get("hero_pills") or source.get("hero_pills"))
    categories = normalize_categories(source.get("categories"))
    algorithms = normalize_algorithms(source.get("algorithms"))
    graph = normalize_graph(source.get("graph"), algorithms, categories)

    fm = {
        "domain": domain,
        "topic_id": topic_id,
        "topic_name": topic_name,
        "page_icon": page_icon,
        "page_title": page_title,
        "page_subtitle": page_subtitle,
        "page_desc": page_desc,
        "hero_pills": hero_pills,
        "count_pill": count_pill,
        "categories": categories,
    }
    image_base = detect_image_base(yaml_path)
    if image_base:
        fm["image_base"] = image_base

    sources_cfg = load_sources_config(yaml_path)
    default_sources = discover_default_survey_sources(yaml_path)
    existing_sections = read_existing_section_map(output_md)
    overview_body, overview_src = choose_overview_body(
        "领域综述",
        output_md=output_md,
        sources_cfg={**default_sources, **sources_cfg},
        existing_sections=existing_sections,
        prefer_existing=prefer_existing_overviews,
    )
    latest_body, latest_src = choose_overview_body(
        "最新进展综述",
        output_md=output_md,
        sources_cfg={**default_sources, **sources_cfg},
        existing_sections=existing_sections,
        prefer_existing=prefer_existing_overviews,
    )

    stats = AssembleStats(
        yaml_path=safe_relative(yaml_path),
        output_path=safe_relative(output_md),
        overview_source=overview_src,
        latest_overview_source=latest_src,
    )

    parts = [
        "---",
        dump_yaml_block(fm),
        "---",
        "",
        "## 领域综述",
        "",
        overview_body,
        "",
        "## 最新进展综述",
        "",
        latest_body,
        "",
        "## 算法演化关系",
        "",
        "```yaml",
        dump_yaml_block(graph),
        "```",
        "",
        "## 核心算法",
        "",
    ]

    for algo in algorithms:
        sections, detail_path = read_detail_sections(yaml_path, algo)
        if detail_path:
            stats.resolved_detail_files[algo["id"]] = safe_relative(detail_path)
        else:
            stats.missing_detail_ids.append(algo["id"])

        summary = build_summary(algo, sections)
        keypoints = build_keypoints(algo, sections)
        detail = build_detail(algo, sections)
        if not sections:
            stats.placeholder_detail_ids.append(algo["id"])

        algo_meta = {
            "id": algo["id"],
            "num": algo["num"],
            "name": algo["name"],
            "full_name": algo["full_name"],
            "year": algo["year"],
            "org": algo["org"],
            "parent": algo["parent"],
            "paper_url": algo["paper_url"],
            "project_url": algo["project_url"],
            "category": algo["category"],
            "motivation": algo["motivation"],
        }

        parts.extend(
            [
                f"### {algo['name']}",
                "",
                "```yaml",
                dump_yaml_block(algo_meta),
                "```",
                "",
                "#### 📝 一句话总结",
                summary,
                "",
                "#### 🎯 核心要点",
            ]
        )
        for point in keypoints:
            parts.append(f"- {point}")
        parts.extend(["", "#### 🔬 深入细节", detail, ""])
        quiz = build_quiz(sections)
        if quiz:
            parts.extend(["#### 🧪 练习题", quiz, ""])

    return "\n".join(parts).strip() + "\n", stats


def discover_yaml_sources(targets: list[str] | None = None) -> list[Path]:
    if targets:
        result = []
        for item in targets:
            path = Path(item).resolve()
            if path.is_file() and path.suffix in {".yaml", ".yml"}:
                result.append(path)
            elif path.is_dir():
                result.extend(sorted(path.rglob("*.yaml")))
                result.extend(sorted(path.rglob("*.yml")))
        return sorted(dict.fromkeys(result))
    return sorted(CONTENT_DIR.rglob("*.yaml"))


def main(argv: list[str] | None = None) -> int:
    parser = argparse.ArgumentParser(description="将 topic YAML + detail markdown 装配为最终知识文档")
    parser.add_argument("sources", nargs="*", help="topic yaml 文件或目录；省略则扫描 content/")
    parser.add_argument("--output", help="单文件模式下指定输出 markdown 路径")
    parser.add_argument("--dry-run", action="store_true", help="只生成与检查，不落盘")
    parser.add_argument("--report-json", help="输出装配报告 JSON")
    parser.add_argument(
        "--no-prefer-existing-overviews",
        action="store_true",
        help="不复用现有 .md 中的两段综述，只看 .sources.yaml 或占位模板",
    )
    args = parser.parse_args(argv)

    yaml_sources = discover_yaml_sources(args.sources)
    if not yaml_sources:
        raise SystemExit("未找到任何 YAML 源文件")

    if args.output and len(yaml_sources) != 1:
        raise SystemExit("--output 只能在单文件模式下使用")

    report = []
    for yaml_path in yaml_sources:
        out_path = Path(args.output).resolve() if args.output else yaml_path.with_suffix(".md")
        doc, stats = render_document(
            yaml_path,
            output_path=out_path,
            prefer_existing_overviews=not args.no_prefer_existing_overviews,
        )
        report.append(stats.to_dict())
        if not args.dry_run:
            out_path.write_text(doc, encoding="utf-8")
        missing = f" missing_detail={len(stats.missing_detail_ids)}" if stats.missing_detail_ids else ""
        mode = "DRY-RUN" if args.dry_run else "OK"
        print(
            f"[{mode}] {safe_relative(yaml_path)} -> {safe_relative(out_path)}"
            f" overview={stats.overview_source} latest={stats.latest_overview_source}{missing}"
        )

    if args.report_json:
        Path(args.report_json).write_text(
            json.dumps(report, ensure_ascii=False, indent=2),
            encoding="utf-8",
        )
        print(f"[OK] report -> {Path(args.report_json)}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
