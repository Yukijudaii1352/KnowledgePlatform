#!/usr/bin/env python3
from __future__ import annotations

import argparse
import re
from pathlib import Path
from typing import Any

import yaml

ROOT = Path(__file__).resolve().parents[2]
DEFAULT_MODEL = "gpt-5.4"

SYSTEM_PROMPT = """你是一个严谨的 AI 知识图谱研究员。

你的任务是围绕一个二级专题，产出“知识文档中间 YAML”，用于后续：
1. 论文精读 agent 批量精读每个算法；
2. 装配脚本生成最终知识文档；
3. 编译器生成网页。

请只返回合法 JSON，不要 Markdown，不要解释。

输出要求：
- 顶层字段必须包含：
  domain, topic_id, topic_name, page_icon, page_title, page_subtitle, page_desc, hero_pills, count_pill, categories, algorithms, graph
- categories:
  可为数组，每项包含 key, label, color
- algorithms:
  按时间从早到晚排序
  每项字段至少包含：
  id, name, full_name, year, org, paper_url, category, parent, motivation
- graph:
  包含 nodes, edges, milestones
  nodes[].id 必须和 algorithms[].id 严格闭合
  edges[].from/to 也必须闭合

内容原则：
- 只保留该专题最核心、最有代表性的算法/模型/方法
- year 必须写成可字符串排序的格式，例如 2017 / 2024.05 / 2026.03
- paper_url 优先给论文主页或 arXiv 链接
- parent 表示直接演化来源；没有前身时写 "—"
- motivation 用一句中文概括为什么它重要
- page_desc / topic_name / 类别标签使用中文
- hero_pills 为字符串数组
- count_pill 固定写 "{count} 个算法"

请尽量给出结构清晰的演化分支，让 graph 能直接用于页面图谱。
"""


def strip_code_fence(text: str) -> str:
    text = text.strip()
    m = re.search(r"```(?:json)?\s*(.*?)\s*```", text, re.DOTALL)
    return m.group(1).strip() if m else text


def load_text_file(path: str) -> str:
    p = Path(path).resolve()
    return p.read_text(encoding="utf-8")


def normalize_categories(raw: Any) -> list[dict[str, str]]:
    if isinstance(raw, dict):
        out = []
        for key, value in raw.items():
            value = value if isinstance(value, dict) else {}
            out.append(
                {
                    "key": str(key),
                    "label": str(value.get("label") or value.get("name") or key),
                    "color": str(value.get("color") or "#888888"),
                }
            )
        return out

    out = []
    if isinstance(raw, list):
        for item in raw:
            if not isinstance(item, dict):
                continue
            key = item.get("key") or item.get("id") or item.get("name")
            if not key:
                continue
            out.append(
                {
                    "key": str(key),
                    "label": str(item.get("label") or item.get("name") or key),
                    "color": str(item.get("color") or "#888888"),
                }
            )
    return out


def normalize_output(data: dict[str, Any], args: argparse.Namespace) -> dict[str, Any]:
    if not isinstance(data, dict):
        raise ValueError("模型返回不是 JSON object")

    domain = args.domain or data.get("domain")
    topic_id = args.topic_id or data.get("topic_id")
    topic_name = args.topic_name or data.get("topic_name")
    page_title = args.page_title or data.get("page_title") or topic_name
    page_desc = args.page_desc or data.get("page_desc") or ""

    algorithms = data.get("algorithms")
    if not isinstance(algorithms, list) or not algorithms:
        raise ValueError("algorithms 为空或格式非法")

    categories = normalize_categories(data.get("categories"))
    if not categories:
        raise ValueError("categories 为空或格式非法")

    category_keys = {item["key"] for item in categories}
    normalized_algorithms = []
    for item in algorithms:
        if not isinstance(item, dict):
            continue
        algo = {
            "id": str(item.get("id") or ""),
            "name": str(item.get("name") or item.get("full_name") or ""),
            "full_name": str(item.get("full_name") or item.get("name") or ""),
            "year": str(item.get("year") or ""),
            "org": str(item.get("org") or ""),
            "paper_url": str(item.get("paper_url") or ""),
            "category": str(item.get("category") or ""),
            "parent": str(item.get("parent") or "—"),
            "motivation": str(item.get("motivation") or ""),
        }
        if not all([algo["id"], algo["name"], algo["full_name"], algo["year"], algo["category"]]):
            raise ValueError(f"算法字段缺失: {algo}")
        if algo["category"] not in category_keys:
            raise ValueError(f"算法 {algo['id']} 的 category={algo['category']} 不在 categories 中")
        normalized_algorithms.append(algo)

    graph = data.get("graph") if isinstance(data.get("graph"), dict) else {}
    nodes = graph.get("nodes") if isinstance(graph.get("nodes"), list) else []
    edges = graph.get("edges") if isinstance(graph.get("edges"), list) else []
    milestones = graph.get("milestones") if isinstance(graph.get("milestones"), list) else []

    algo_ids = {item["id"] for item in normalized_algorithms}
    if nodes:
        node_ids = {str(item.get("id")) for item in nodes if isinstance(item, dict) and item.get("id")}
        missing = sorted(algo_ids - node_ids)
        if missing:
            raise ValueError(f"graph.nodes 缺少算法节点: {missing}")
    for edge in edges:
        if not isinstance(edge, dict):
            raise ValueError(f"非法 edge: {edge}")
        if str(edge.get("from")) not in algo_ids or str(edge.get("to")) not in algo_ids:
            raise ValueError(f"edge 引用了不存在的算法: {edge}")

    return {
        "domain": domain,
        "topic_id": topic_id,
        "topic_name": topic_name,
        "page_icon": args.page_icon or data.get("page_icon") or "📘",
        "page_title": page_title,
        "page_subtitle": args.page_subtitle or data.get("page_subtitle") or "{build_date} 版",
        "page_desc": page_desc,
        "hero_pills": args.hero_pill or data.get("hero_pills") or [],
        "count_pill": "{count} 个算法",
        "categories": categories,
        "algorithms": normalized_algorithms,
        "graph": {
            "nodes": nodes,
            "edges": edges,
            "milestones": milestones,
        },
    }


def build_prompt(args: argparse.Namespace) -> str:
    context_blocks = []
    for path in args.context_file or []:
        context_blocks.append(f"### Context File: {path}\n{load_text_file(path)}")
    if args.notes:
        context_blocks.append(f"### Extra Notes\n{args.notes}")

    context_text = "\n\n".join(context_blocks) if context_blocks else "无额外上下文。"
    return f"""请为以下专题生成知识文档中间 YAML 对应的 JSON 结构。

专题信息：
- domain: {args.domain}
- topic_id: {args.topic_id}
- topic_name: {args.topic_name}
- page_title: {args.page_title or args.topic_name}
- page_desc: {args.page_desc or ""}

附加上下文：
{context_text}

请输出 JSON 对象，后续会被写成 YAML 文件。
"""


def main() -> int:
    parser = argparse.ArgumentParser(description="调用研究模型生成 topic 中间 YAML")
    parser.add_argument("--domain", required=True, help="一级领域，如 llm/cv/aigc")
    parser.add_argument("--topic-id", required=True, help="二级专题 id")
    parser.add_argument("--topic-name", required=True, help="二级专题中文名")
    parser.add_argument("--page-title", help="页面主标题")
    parser.add_argument("--page-desc", help="页面描述")
    parser.add_argument("--page-icon", help="页面图标")
    parser.add_argument("--page-subtitle", help="页面副标题")
    parser.add_argument("--hero-pill", action="append", help="可重复指定 hero pill")
    parser.add_argument("--context-file", action="append", help="补充给模型的上下文文件，可重复指定")
    parser.add_argument("--notes", help="额外说明")
    parser.add_argument("--model", default=DEFAULT_MODEL, help="调用的研究模型")
    parser.add_argument("--output", required=True, help="输出 YAML 路径")
    parser.add_argument("--dry-run", action="store_true", help="只打印 prompt，不调用模型")
    args = parser.parse_args()

    output_path = Path(args.output).resolve()
    prompt = build_prompt(args)
    if args.dry_run:
        print(prompt)
        return 0

    try:
        from llm_client import chat_json
    except ModuleNotFoundError as exc:
        missing = getattr(exc, "name", "unknown")
        raise SystemExit(
            f"无法加载研究模型客户端，缺少依赖: {missing}。"
            "请先确认当前环境已安装外部 API SDK，并能正常导入 pipeline/researcher/llm_client.py。"
        ) from exc

    result = chat_json(
        [
            {"role": "system", "content": SYSTEM_PROMPT},
            {"role": "user", "content": prompt},
        ],
        model=args.model,
    )
    normalized = normalize_output(result, args)
    normalized["hero_pills"] = (
        normalized["hero_pills"]
        if isinstance(normalized["hero_pills"], list)
        else [str(normalized["hero_pills"]).strip()]
    )

    output_path.parent.mkdir(parents=True, exist_ok=True)
    output_path.write_text(
        yaml.safe_dump(normalized, allow_unicode=True, sort_keys=False, width=120),
        encoding="utf-8",
    )
    print(f"[OK] {output_path}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
