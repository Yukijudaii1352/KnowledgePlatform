#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""build.py — Knowledge Platform 编译入口。

使用方式
========

1. 全量构建（默认模式）
   扫描 pipeline/examples/ 与 content/ 下所有带合法 front-matter
   的 markdown 源文档，逐一编译为二级页，然后刷新一级领域目录页和首页：

       python3 pipeline/build.py
       python3 pipeline/build.py --copy-images

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
import sys
from pathlib import Path

# 确保可以从 pipeline/ 作为包根直接导入
sys.path.insert(0, str(Path(__file__).resolve().parent.parent))

from pipeline.builders.common import (
    CONTENT_DIRS,
    DOMAIN_MAP,
    ROOT,
    err,
    info,
    ok,
    warn,
)
from pipeline.builders.domain_builder import render_domain_indexes
from pipeline.builders.home_builder import render_index
from pipeline.builders.topic_builder import compile_doc, peek_front_matter


# ============ 源文档发现 ============

def discover_sources() -> list[Path]:
    """扫描 CONTENT_DIRS 下所有含合法 front-matter(domain+topic_id) 的 .md 文件。"""
    found: list[Path] = []
    seen: set[Path] = set()
    for base in CONTENT_DIRS:
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
            found.append(md)
    # 固定顺序，便于可复现的输出
    found.sort()
    return found


# ============ 编译模式 ============

def build_all(copy_images: bool, dry_run: bool):
    """模式 A：扫描并编译所有可用源文档。"""
    sources = discover_sources()
    if not sources:
        warn("未在 pipeline/examples/ 与 content/ 下发现任何带 front-matter 的源文档")
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

    render_index()
    render_domain_indexes()
    ok("全量编译完成 ✅")


def build_one(src_path: str, copy_images: bool, dry_run: bool):
    """模式 B：只编译一篇指定文档。"""
    src = Path(src_path).resolve()
    if not src.is_file():
        err(f"找不到源文件：{src}")
    compile_doc(src, copy_images=copy_images, dry_run=dry_run)

    if dry_run:
        return

    render_index()
    render_domain_indexes()
    ok("增量更新完成 ✅")


def build_only_index():
    """模式 C：只刷新首页与一级目录页，不编译 markdown。"""
    render_index()
    render_domain_indexes()


# ============ CLI ============

def main():
    p = argparse.ArgumentParser(
        description="Knowledge Platform page compiler",
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog=(
            "示例：\n"
            "  python3 pipeline/build.py                     # 全量编译所有文档 + 刷新聚合页\n"
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
    args = p.parse_args()

    if args.only_index:
        build_only_index()
        return

    if args.source:
        build_one(args.source, copy_images=args.copy_images, dry_run=args.dry_run)
    else:
        build_all(copy_images=args.copy_images, dry_run=args.dry_run)


if __name__ == "__main__":
    main()
