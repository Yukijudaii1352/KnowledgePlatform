#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""build.py — Knowledge Platform 编译入口。

使用方式
========

1. 全量构建（默认模式）
   扫描 content/ 下所有带合法 front-matter 的 markdown 源文档，
   逐一编译为二级页，然后刷新一级领域目录页和首页：

       python3 pipeline/build.py
       python3 pipeline/build.py --copy-images
       python3 pipeline/build.py --include-examples

2. 增量更新（指定单篇文档）
   编译给定源文档，再同步刷新一级目录页和首页：

       python3 pipeline/build.py path/to/doc.md
       python3 pipeline/build.py path/to/doc.md --copy-images

3. 只刷新聚合页（不编译 markdown）
   当只改了 DOMAIN_CATALOG 或首页静态 HTML 时：

       python3 pipeline/build.py --only-index

实现拆分
========

    pipeline/
      build.py                    # CLI 入口（本文件）
      builders/
        common.py                 # 常量、领域数据、日志、占位符
        topic_builder.py          # 二级页（markdown → html/data.js/logic.js）
        domain_builder.py         # 一级目录页（pages/<domain>/index.html）
        home_builder.py           # 首页 index.html 刷新
"""

from __future__ import annotations

import argparse
import re
import sys
from pathlib import Path

# 确保可以从 pipeline/ 作为包根直接导入
sys.path.insert(0, str(Path(__file__).resolve().parent.parent))

from pipeline.builders.common import (
    CONTENT_DIRS,
    EXAMPLE_CONTENT_DIRS,
    DOMAIN_MAP,
    ROOT,
    err,
    info,
    is_domain_enabled,
    is_publish_enabled,
    ok,
    warn,
)
from pipeline.builders.domain_builder import render_domain_indexes
from pipeline.builders.home_builder import render_index
from pipeline.builders.topic_builder import compile_doc, peek_front_matter


# ============ 源文档发现 ============

DATA_JS_SOURCE_RE = re.compile(r"源文件：([^\n]+)")

def discover_sources(include_examples: bool = False) -> list[Path]:
    """扫描源文档目录下所有含合法 front-matter(domain+topic_id) 的 .md 文件。"""
    found: list[Path] = []
    seen: set[Path] = set()
    scan_dirs = list(CONTENT_DIRS)
    if include_examples:
        scan_dirs.extend(EXAMPLE_CONTENT_DIRS)

    for base in scan_dirs:
        if not base.is_dir():
            continue
        for md in base.rglob("*.md"):
            # 统一解析为绝对路径，避免重复
            resolved = md.resolve()
            if resolved in seen:
                continue
            seen.add(resolved)

            fm = peek_front_matter(md)
            if not fm:
                continue
            if "domain" not in fm or "topic_id" not in fm:
                continue
            if fm["domain"] not in DOMAIN_MAP:
                warn(f"跳过 {md.relative_to(ROOT)}：domain={fm['domain']} 不在白名单")
                continue
            if not is_domain_enabled(fm["domain"]):
                continue
            if not is_publish_enabled(fm.get("publish", True)):
                continue
            found.append(md)
    # 固定顺序，便于可复现的输出
    found.sort()
    return found


def _output_targets_for_data_js(data_js: Path) -> tuple[Path, Path, Path]:
    topic_id = data_js.name[: -len("-data.js")]
    html_file = data_js.with_name(f"{topic_id}.html")
    logic_file = data_js.with_name(f"{topic_id}-logic.js")
    return html_file, data_js, logic_file


def prune_hidden_outputs(prune_examples: bool):
    """清理示例产物与已标记为 publish=false 的历史页面产物。"""
    removed = 0
    for data_js in (ROOT / "pages").glob("*/*-data.js"):
        try:
            text = data_js.read_text(encoding="utf-8")
        except OSError:
            continue
        m = DATA_JS_SOURCE_RE.search(text)
        if not m:
            continue
        source_rel = m.group(1).strip()
        source_path = (ROOT / source_rel).resolve()
        should_prune = False

        if source_rel.startswith("pipeline/examples/"):
            should_prune = prune_examples
        else:
            fm = peek_front_matter(source_path) if source_path.is_file() else None
            if (
                not fm
                or not is_domain_enabled(str(fm.get("domain", "")).strip())
                or not is_publish_enabled(fm.get("publish", True))
            ):
                should_prune = True

        if not should_prune:
            continue

        for target in _output_targets_for_data_js(data_js):
            if target.exists():
                target.unlink()
                removed += 1

    if removed:
        info(f"已清理 {removed} 个隐藏/示例产物文件")


def prune_disabled_domain_outputs():
    """清理已禁用领域的目录页与残留产物。"""
    removed = 0
    for domain_id, meta in DOMAIN_MAP.items():
        if is_domain_enabled(domain_id):
            continue
        domain_dir = ROOT / meta["dir"]
        if not domain_dir.is_dir():
            continue
        for target in domain_dir.iterdir():
            if target.is_file():
                target.unlink()
                removed += 1
    if removed:
        info(f"已清理 {removed} 个禁用领域产物文件")


# ============ 编译模式 ============

def build_all(copy_images: bool, dry_run: bool, include_examples: bool):
    """模式 A：扫描并编译所有可用源文档。"""
    sources = discover_sources(include_examples=include_examples)
    if not sources:
        scan_scope = "content/ 与 pipeline/examples/" if include_examples else "content/"
        warn(f"未在 {scan_scope} 下发现任何带 front-matter 的源文档")
    else:
        info(f"发现 {len(sources)} 篇可编译源文档")
        for src in sources:
            try:
                rel = src.relative_to(ROOT)
            except ValueError:
                rel = src
            info(f"编译：{rel}")
            compile_doc(src, copy_images=copy_images, dry_run=dry_run)

    if dry_run:
        return

    prune_hidden_outputs(prune_examples=not include_examples)
    prune_disabled_domain_outputs()

    render_index()
    render_domain_indexes()
    ok("全量编译完成 ✅")


def build_one(src_path: str, copy_images: bool, dry_run: bool):
    """模式 B：只编译一篇指定文档。"""
    src = Path(src_path).resolve()
    if not src.is_file():
        err(f"找不到源文件：{src}")
    fm = peek_front_matter(src)
    if fm and not is_publish_enabled(fm.get("publish", True)):
        warn(f"跳过 {src}：该文档已标记 publish=false")
        if dry_run:
            return
        prune_hidden_outputs(prune_examples=True)
        prune_disabled_domain_outputs()
        render_index()
        render_domain_indexes()
        ok("已同步清理隐藏专题产物 ✅")
        return
    if fm and not is_domain_enabled(str(fm.get("domain", "")).strip()):
        warn(f"跳过 {src}：domain={fm.get('domain')} 当前已禁用发布")
        if dry_run:
            return
        prune_hidden_outputs(prune_examples=True)
        prune_disabled_domain_outputs()
        render_index()
        render_domain_indexes()
        ok("已同步清理禁用领域产物 ✅")
        return
    compile_doc(src, copy_images=copy_images, dry_run=dry_run)

    if dry_run:
        return

    prune_disabled_domain_outputs()
    render_index()
    render_domain_indexes()
    ok("增量更新完成 ✅")


def build_only_index():
    """模式 C：只刷新首页与一级目录页，不编译 markdown。"""
    prune_disabled_domain_outputs()
    render_index()
    render_domain_indexes()


# ============ CLI ============

def main():
    p = argparse.ArgumentParser(
        description="Knowledge Platform page compiler",
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog=(
            "示例：\n"
            "  python3 pipeline/build.py                     # 全量编译 content/ 下所有文档 + 刷新聚合页\n"
            "  python3 pipeline/build.py --include-examples  # 全量编译 content/ + pipeline/examples/\n"
            "  python3 pipeline/build.py path/to/doc.md      # 只更新该文档 + 刷新聚合页\n"
            "  python3 pipeline/build.py --only-index        # 只刷新聚合页（首页+一级目录页）\n"
        ),
    )
    p.add_argument("source", nargs="?",
                   help="源 markdown 路径；省略则进入全量编译模式")
    p.add_argument("--copy-images", action="store_true",
                   help="把 <src>/images/ 同步拷到 assets/images/<topic>/")
    p.add_argument("--dry-run", action="store_true",
                   help="只做解析与校验，不落盘")
    p.add_argument("--only-index", action="store_true",
                   help="只刷新聚合页（首页 + 一级目录页）")
    p.add_argument("--include-examples", action="store_true",
                   help="全量编译时额外包含 pipeline/examples/ 下的示例文档")
    args = p.parse_args()

    if args.only_index:
        build_only_index()
        return

    if args.source:
        build_one(args.source, copy_images=args.copy_images, dry_run=args.dry_run)
    else:
        build_all(
            copy_images=args.copy_images,
            dry_run=args.dry_run,
            include_examples=args.include_examples,
        )


if __name__ == "__main__":
    main()
