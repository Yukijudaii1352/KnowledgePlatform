#!/usr/bin/env python3
"""Batch-fill missing survey sources for content pages.

Workflow:
1. Discover main topic pages from content/<domain>/<topic>.yaml.
2. Build a search query: "<Chinese domain label> <Chinese topic label>".
3. Skip pages whose overview and latest overview are already non-placeholder.
4. Run researcher/main.py in parallel for pages with missing surveys.
5. Merge selected_sources.yaml into content/<domain>/<topic>.sources.yaml.
6. Assemble changed YAML files and build frontend pages.
"""

from __future__ import annotations

import argparse
import csv
import json
import os
import re
import subprocess
import sys
import time
from concurrent.futures import ThreadPoolExecutor, as_completed
from dataclasses import asdict, dataclass
from pathlib import Path
from typing import Any

import yaml

ROOT = Path(__file__).resolve().parents[2]
sys.path.insert(0, str(ROOT))

from pipeline.builders.common import DOMAIN_CATALOG, DOMAIN_MAP  # noqa: E402


DOMAIN_QUERY_NAMES = {
    "llm": "大语言模型",
    "cv": "计算机视觉",
    "agent": "智能体",
    "multimodal": "多模态",
    "embodied": "具身智能",
    "aigc": "生成式AI",
    "infra": "AI基础设施",
    "ml": "机器学习",
    "ai4sci": "科学智能",
}

PLACEHOLDER_MARKERS = (
    "待补充",
    "请补充一篇",
    "请补充最近",
    "path/to/article.md",
)
INCLUDE_RAW_RE = re.compile(r"^\s*!INCLUDE_RAW\s+(.+?)\s*$", re.M)

ROLE_TO_SOURCE_KEY = {
    "overview": "overview",
    "latest": "latest_overview",
}


@dataclass
class TopicTask:
    domain: str
    domain_name: str
    domain_query_name: str
    topic_id: str
    topic_name: str
    query: str
    yaml_path: str
    md_path: str
    sources_path: str
    overview_present: bool
    latest_present: bool
    missing_roles: list[str]


@dataclass
class RunResult:
    task: TopicTask
    status: str
    out_dir: str = ""
    merged_roles: list[str] | None = None
    returncode: int | None = None
    error: str = ""


def rel(path: Path) -> str:
    try:
        return path.resolve().relative_to(ROOT.resolve()).as_posix()
    except Exception:
        return path.resolve().as_posix()


def safe_slug(text: str, max_len: int = 80) -> str:
    text = re.sub(r"[\s/\\:*?\"<>|#]+", "_", text.strip())
    text = re.sub(r"_+", "_", text).strip("_.")
    return (text[:max_len] or "untitled")


def read_yaml(path: Path) -> dict[str, Any]:
    if not path.is_file():
        return {}
    try:
        data = yaml.safe_load(path.read_text(encoding="utf-8")) or {}
    except Exception:
        return {}
    return data if isinstance(data, dict) else {}


def write_yaml(path: Path, data: dict[str, Any]) -> None:
    path.write_text(
        yaml.safe_dump(data, allow_unicode=True, sort_keys=False),
        encoding="utf-8",
    )


def catalog_topic_name(domain: str, topic_id: str) -> str:
    topics = (DOMAIN_CATALOG.get(domain) or {}).get("topics") or []
    for item in topics:
        if isinstance(item, dict) and item.get("match") == topic_id and item.get("name"):
            return str(item["name"]).strip()
    return ""


def discover_topic_yamls() -> list[Path]:
    content = ROOT / "content"
    out: list[Path] = []
    for path in sorted(content.glob("*/*.yaml")) + sorted(content.glob("*/*.yml")):
        name = path.name
        if name.endswith((".sources.yaml", ".sources.yml", ".survey.yaml", ".survey.yml")):
            continue
        if path.stem.endswith("_detail"):
            continue
        data = read_yaml(path)
        domain = str(data.get("domain") or path.parent.name).strip()
        topic_id = str(data.get("topic_id") or path.stem).strip()
        if domain in DOMAIN_MAP and topic_id:
            out.append(path)
    return out


def extract_section(text: str, section_name: str) -> str:
    pattern = re.compile(rf"^##\s+{re.escape(section_name)}\s*$", re.M)
    m = pattern.search(text or "")
    if not m:
        return ""
    start = m.end()
    n = re.search(r"^##\s+", text[start:], re.M)
    end = start + n.start() if n else len(text)
    return text[start:end].strip()


def include_raw_exists(raw: str, base: Path) -> bool:
    path = Path(raw.strip())
    if path.is_absolute():
        return path.is_file()
    return (base / path).resolve().is_file()


def source_file_exists(raw: str, yaml_path: Path) -> bool:
    path = Path(raw.strip())
    if path.is_absolute():
        return path.is_file()
    return (ROOT / path).resolve().is_file() or (yaml_path.parent / path).resolve().is_file()


def section_has_real_content(section: str, md_path: Path | None = None) -> bool:
    body = (section or "").strip()
    if not body:
        return False
    compact = re.sub(r"\s+", "", body)
    if any(marker in body for marker in PLACEHOLDER_MARKERS):
        return False
    if "!INCLUDE_RAW" in body:
        if not md_path:
            return False
        include_paths = INCLUDE_RAW_RE.findall(body)
        return bool(include_paths) and all(include_raw_exists(raw, md_path.parent) for raw in include_paths)
    return len(compact) >= 120


def load_sources_config(yaml_path: Path) -> tuple[Path, dict[str, Any]]:
    sources_path = yaml_path.with_name(f"{yaml_path.stem}.sources.yaml")
    candidates = [
        sources_path,
        yaml_path.with_name(f"{yaml_path.stem}.sources.yml"),
        yaml_path.with_name(f"{yaml_path.stem}.survey.yaml"),
        yaml_path.with_name(f"{yaml_path.stem}.survey.yml"),
    ]
    for path in candidates:
        if path.is_file():
            data = read_yaml(path)
            return sources_path, data if isinstance(data, dict) else {}
    return sources_path, {}


def source_entry_present(value: Any, yaml_path: Path) -> bool:
    if not value:
        return False
    if isinstance(value, dict):
        if value.get("include_raw"):
            return source_file_exists(str(value["include_raw"]), yaml_path)
        if value.get("markdown_file"):
            return source_file_exists(str(value["markdown_file"]), yaml_path)
        if value.get("body"):
            return bool(str(value["body"]).strip())
        sections = value.get("sections")
        if isinstance(sections, list):
            return any(source_entry_present(section, yaml_path) for section in sections)
        return False
    if isinstance(value, list):
        return any(source_entry_present(item, yaml_path) for item in value)
    return bool(str(value).strip())


def source_key_present(cfg: dict[str, Any], key: str, yaml_path: Path) -> bool:
    value = cfg.get(key)
    return source_entry_present(value, yaml_path)


def survey_status(yaml_path: Path) -> tuple[Path, bool, bool]:
    md_path = yaml_path.with_suffix(".md")
    _, sources = load_sources_config(yaml_path)
    overview = source_key_present(sources, "overview", yaml_path)
    latest = source_key_present(sources, "latest_overview", yaml_path) or source_key_present(sources, "latest", yaml_path)

    if md_path.is_file():
        text = md_path.read_text(encoding="utf-8", errors="ignore")
        overview = overview or section_has_real_content(extract_section(text, "领域综述"), md_path)
        latest = latest or section_has_real_content(extract_section(text, "最新进展综述"), md_path)
    return md_path, overview, latest


def build_tasks(force: bool = False) -> list[TopicTask]:
    tasks: list[TopicTask] = []
    for yaml_path in discover_topic_yamls():
        data = read_yaml(yaml_path)
        domain = str(data.get("domain") or yaml_path.parent.name).strip()
        topic_id = str(data.get("topic_id") or yaml_path.stem).strip()
        domain_name = str((DOMAIN_MAP.get(domain) or {}).get("name") or domain)
        domain_query_name = DOMAIN_QUERY_NAMES.get(domain, domain_name)
        topic_name = (
            catalog_topic_name(domain, topic_id)
            or str(data.get("topic_name") or data.get("page_title") or topic_id).strip()
        )
        query = f"{domain_query_name} {topic_name}".strip()
        md_path, overview_present, latest_present = survey_status(yaml_path)
        sources_path, _ = load_sources_config(yaml_path)

        missing_roles: list[str] = []
        if force or not overview_present:
            missing_roles.append("overview")
        if force or not latest_present:
            missing_roles.append("latest")

        tasks.append(
            TopicTask(
                domain=domain,
                domain_name=domain_name,
                domain_query_name=domain_query_name,
                topic_id=topic_id,
                topic_name=topic_name,
                query=query,
                yaml_path=rel(yaml_path),
                md_path=rel(md_path),
                sources_path=rel(sources_path),
                overview_present=overview_present,
                latest_present=latest_present,
                missing_roles=missing_roles,
            )
        )
    return tasks


def write_manifest(run_dir: Path, tasks: list[TopicTask]) -> None:
    run_dir.mkdir(parents=True, exist_ok=True)
    rows = [asdict(task) for task in tasks]
    (run_dir / "content_survey_tags.json").write_text(
        json.dumps(rows, ensure_ascii=False, indent=2),
        encoding="utf-8",
    )
    with (run_dir / "content_survey_tags.csv").open("w", encoding="utf-8", newline="") as f:
        fieldnames = list(rows[0].keys()) if rows else []
        writer = csv.DictWriter(f, fieldnames=fieldnames)
        writer.writeheader()
        writer.writerows(rows)

    lines = [
        "# Content Survey Tags",
        "",
        "| 一级ID | 一级显示名 | 一级检索名 | 二级ID | 二级中文名 | 检索词 | 状态 |",
        "|---|---|---|---|---|---|---|",
    ]
    for task in tasks:
        if task.missing_roles:
            status = "缺 " + ",".join(task.missing_roles)
        else:
            status = "已有综述，跳过"
        lines.append(
            f"| {task.domain} | {task.domain_name} | {task.domain_query_name} | {task.topic_id} | "
            f"{task.topic_name} | `{task.query}` | {status} |"
        )
    (run_dir / "content_survey_tags.md").write_text("\n".join(lines) + "\n", encoding="utf-8")


def merge_selected_sources(task: TopicTask, selected_sources: Path, force: bool) -> list[str]:
    selected = read_yaml(selected_sources)
    if not selected:
        return []
    sources_path = ROOT / task.sources_path
    current = read_yaml(sources_path)
    merged: list[str] = []
    for role in task.missing_roles:
        key = ROLE_TO_SOURCE_KEY[role]
        if key not in selected:
            continue
        if not force and source_key_present(current, key, ROOT / task.yaml_path):
            continue
        current[key] = selected[key]
        merged.append(key)
    if merged:
        sources_path.parent.mkdir(parents=True, exist_ok=True)
        write_yaml(sources_path, current)
    return merged


def run_one(task: TopicTask, args: argparse.Namespace, run_dir: Path) -> RunResult:
    if not task.missing_roles and not args.force:
        return RunResult(task=task, status="skipped_existing", merged_roles=[])

    out_dir = run_dir / "researcher_output" / task.domain / task.topic_id
    cmd = [
        sys.executable,
        "pipeline/researcher/main.py",
        task.query,
        "-o",
        str(out_dir),
        "--page-md",
        task.md_path,
        "--per-source",
        str(args.per_source),
        "--judge-top",
        str(args.judge_top),
        "--heuristic-top",
        str(args.heuristic_top),
        "--enrich-top",
        str(args.enrich_top),
    ]
    if args.no_images:
        cmd.append("--no-images")
    if args.no_llm_judge:
        cmd.append("--no-llm-judge")

    env = os.environ.copy()
    env["PYTHONUNBUFFERED"] = "1"
    proc = subprocess.run(
        cmd,
        cwd=ROOT,
        env=env,
        text=True,
        stdout=subprocess.PIPE,
        stderr=subprocess.STDOUT,
    )
    log_path = out_dir / "bulk_run.log"
    log_path.parent.mkdir(parents=True, exist_ok=True)
    log_path.write_text(proc.stdout or "", encoding="utf-8")
    if proc.returncode != 0:
        return RunResult(
            task=task,
            status="failed",
            out_dir=rel(out_dir),
            returncode=proc.returncode,
            error=f"researcher failed, see {rel(log_path)}",
        )

    selected_sources = out_dir / "selected_sources.yaml"
    merged = merge_selected_sources(task, selected_sources, args.force)
    status = "merged" if merged else "no_selected_sources"
    return RunResult(
        task=task,
        status=status,
        out_dir=rel(out_dir),
        merged_roles=merged,
        returncode=proc.returncode,
    )


def run_command(cmd: list[str], *, label: str) -> None:
    print(f"[{label}] {' '.join(cmd)}", flush=True)
    subprocess.run(cmd, cwd=ROOT, check=True)


def assemble_and_build(results: list[RunResult], no_build: bool) -> None:
    changed_yamls = sorted({
        result.task.yaml_path
        for result in results
        if result.status == "merged" and result.merged_roles
    })
    if not changed_yamls:
        print("[INFO] 没有新的 sources 合并，跳过 assemble/build。")
        return

    run_command([sys.executable, "pipeline/assemble.py", *changed_yamls], label="assemble")
    if no_build:
        return
    # A single full build is simpler and keeps domain/home indexes consistent.
    run_command([sys.executable, "pipeline/build.py"], label="build")


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description="并行补齐 content 页面缺失的知乎综述并编译前端")
    parser.add_argument("--jobs", type=int, default=2, help="并行 researcher 任务数")
    parser.add_argument("--dry-run", action="store_true", help="只生成标签/任务清单，不检索")
    parser.add_argument("--force", action="store_true", help="即使已有综述也重新检索并覆盖 sources")
    parser.add_argument("--no-build", action="store_true", help="只检索并合并 sources，不 assemble/build")
    parser.add_argument("--limit", type=int, default=0, help="仅处理前 N 个缺失任务，用于调试")
    parser.add_argument("--out-dir", default="", help="运行产物目录，默认 temp/content_survey_bulk_<timestamp>")
    parser.add_argument("--per-source", type=int, default=24, help="每条 query 最多召回数")
    parser.add_argument("--heuristic-top", type=int, default=24, help=argparse.SUPPRESS)
    parser.add_argument("--judge-top", type=int, default=16, help=argparse.SUPPRESS)
    parser.add_argument("--enrich-top", type=int, default=10, help=argparse.SUPPRESS)
    parser.add_argument("--no-images", action="store_true", help="下载文章时不抓取图片")
    parser.add_argument("--no-llm-judge", action="store_true", help=argparse.SUPPRESS)
    return parser.parse_args()


def main() -> int:
    args = parse_args()
    timestamp = time.strftime("%Y%m%d_%H%M%S")
    run_dir = Path(args.out_dir).resolve() if args.out_dir else ROOT / "temp" / f"content_survey_bulk_{timestamp}"
    tasks = build_tasks(force=args.force)
    write_manifest(run_dir, tasks)

    pending = [task for task in tasks if task.missing_roles or args.force]
    if args.limit > 0:
        pending = pending[:args.limit]

    print(f"[INFO] 标签清单：{rel(run_dir / 'content_survey_tags.md')}")
    print(f"[INFO] 总页面 {len(tasks)}，待检索 {len(pending)}，jobs={args.jobs}")

    if args.dry_run:
        print("[DRY-RUN] 不执行检索。")
        return 0

    results: list[RunResult] = []
    with ThreadPoolExecutor(max_workers=max(1, args.jobs)) as pool:
        future_map = {pool.submit(run_one, task, args, run_dir): task for task in pending}
        for future in as_completed(future_map):
            result = future.result()
            results.append(result)
            merged = ",".join(result.merged_roles or [])
            print(
                f"[{result.status}] {result.task.domain}/{result.task.topic_id} "
                f"query={result.task.query!r} merged={merged or '-'}",
                flush=True,
            )

    skipped = [RunResult(task=task, status="skipped_existing", merged_roles=[]) for task in tasks if not task.missing_roles and not args.force]
    all_results = skipped + results
    (run_dir / "run_results.json").write_text(
        json.dumps([asdict(result) for result in all_results], ensure_ascii=False, indent=2),
        encoding="utf-8",
    )
    assemble_and_build(all_results, no_build=args.no_build)
    print(f"[OK] 批处理完成：{rel(run_dir)}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
