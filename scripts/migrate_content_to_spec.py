#!/usr/bin/env python3
from __future__ import annotations

import re
import json
import subprocess
from pathlib import Path


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


def load_yaml(path: Path) -> dict:
    proc = subprocess.run(
        [
            "ruby",
            "-E",
            "UTF-8:UTF-8",
            "-r",
            "yaml",
            "-r",
            "json",
            "-e",
            "puts JSON.generate(YAML.load_file(ARGV[0]))",
            str(path),
        ],
        check=True,
        capture_output=True,
        text=True,
    )
    data = json.loads(proc.stdout or "{}")
    if not isinstance(data, dict):
        raise ValueError(f"{path} does not contain a YAML mapping")
    return data


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
        raise ValueError(f"Unsupported domain for {path}: {raw or top}")
    return value


def normalize_hero_pills(raw) -> list[str]:
    if raw is None:
        return []
    if isinstance(raw, list):
        return [str(x).strip() for x in raw if str(x).strip()]
    text = str(raw).strip()
    return [text] if text else []


def normalize_categories(raw) -> dict[str, dict[str, str]]:
    if isinstance(raw, dict):
        out = {}
        for key, value in raw.items():
            if not isinstance(value, dict):
                value = {}
            out[str(key)] = {
                "label": str(value.get("label") or value.get("name") or key),
                "color": str(value.get("color") or "#888888"),
            }
        return out

    out = {}
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


def normalize_algorithms(raw) -> list[dict]:
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
                "num": idx,
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


def normalize_graph(raw_graph, algorithms: list[dict], categories: dict[str, dict]) -> dict:
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


def read_detail_sections(yaml_path: Path, algo_id: str) -> dict[str, str]:
    detail_dir = yaml_path.with_suffix("")
    detail_path = detail_dir / f"{algo_id}_detail.md"
    if not detail_path.is_file():
        return {}
    text = detail_path.read_text(encoding="utf-8")
    text = CODE_BLOCK_RE.sub("", text, count=1)
    return extract_section_map(text)


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
    if "```yaml" in quiz:
        return quiz.strip()
    return f"```yaml\n{quiz.strip()}\n```"


def serialize_yaml_block(data: dict) -> str:
    proc = subprocess.run(
        [
            "ruby",
            "-E",
            "UTF-8:UTF-8",
            "-r",
            "yaml",
            "-r",
            "json",
            "-e",
            "obj = JSON.parse(STDIN.read); puts YAML.dump(obj)",
        ],
        input=json.dumps(data, ensure_ascii=False),
        capture_output=True,
        text=True,
    )
    if proc.returncode != 0:
        raise RuntimeError(proc.stderr.strip() or "ruby YAML dump failed")
    return re.sub(r"\A---\s*\n?", "", proc.stdout).strip()


def detect_image_base(yaml_path: Path) -> str | None:
    asset_dir = (yaml_path.with_suffix("") / "assets").resolve()
    if asset_dir.is_dir():
        rel = asset_dir.relative_to(ROOT).as_posix()
        return f"../../{rel}/"
    return None


def render_document(yaml_path: Path, source: dict) -> str:
    meta = pick_page_meta(source)
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

    parts = ["---", serialize_yaml_block(fm), "---", "", "## 领域综述", "", "### 待定", "待定。", ""]
    parts.extend(["## 算法演化关系", "", "```yaml", serialize_yaml_block(graph), "```", "", "## 核心算法", ""])

    for algo in algorithms:
        sections = read_detail_sections(yaml_path, algo["id"])
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
                serialize_yaml_block(algo_meta),
                "```",
                "",
                "#### 📝 一句话总结",
                build_summary(algo, sections),
                "",
                "#### 🎯 核心要点",
            ]
        )
        for point in build_keypoints(algo, sections):
            parts.append(f"- {point}")
        parts.extend(["", "#### 🔬 深入细节", build_detail(algo, sections), ""])
        quiz = build_quiz(sections)
        if quiz:
            parts.extend(["#### 🧪 练习题", quiz, ""])

    return "\n".join(parts).strip() + "\n"


def main() -> int:
    generated = 0
    for yaml_path in sorted(CONTENT_DIR.rglob("*.yaml")):
        source = load_yaml(yaml_path)
        out_path = yaml_path.with_suffix(".md")
        out_path.write_text(render_document(yaml_path, source), encoding="utf-8")
        print(f"[OK] {out_path.relative_to(ROOT)}")
        generated += 1
    print(f"\nGenerated {generated} spec documents.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
