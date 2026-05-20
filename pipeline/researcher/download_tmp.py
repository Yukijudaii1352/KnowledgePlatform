#!/usr/bin/env python3
from __future__ import annotations

import argparse
from pathlib import Path
import shutil

from http_utils import HttpClient
from downloader import download_one


DEFAULT_COOKIES_PATH = Path(__file__).resolve().with_name("cookies.json")


def build_item(url: str, title: str | None) -> dict:
    article_title = title or url.rstrip("/").split("/")[-1]
    return {
        "title": article_title,
        "url": url,
        "platform": "zhihu" if "zhihu.com" in url else "manual",
        "queries": ["manual"],
        "meta": {
            "author": "",
            "voteup_count": 0,
            "comment_count": 0,
            "zfav_count": 0,
            "created_time": 0,
        },
    }


def main() -> int:
    parser = argparse.ArgumentParser(description="手工指定 URL，下载综述/文章为本地 markdown")
    parser.add_argument("url", help="文章 URL，例如知乎专栏链接")
    parser.add_argument("--title", help="可选，手工指定条目标题")
    parser.add_argument("--output-dir", default="./output/manual_downloads", help="下载输出根目录")
    parser.add_argument("--cookies", default=str(DEFAULT_COOKIES_PATH), help="cookies.json 路径")
    parser.add_argument("--timeout", type=int, default=15, help="HTTP 超时秒数")
    parser.add_argument("--no-images", action="store_true", help="不下载图片")
    parser.add_argument("--max-images", type=int, default=40, help="最多下载图片数量")
    parser.add_argument(
        "--export-markdown-to",
        help="下载完成后，把产出的 article.md 复制到指定路径",
    )
    args = parser.parse_args()

    output_dir = Path(args.output_dir).resolve()
    output_dir.mkdir(parents=True, exist_ok=True)
    cookies_path = Path(args.cookies).expanduser().resolve()

    if "zhihu.com" in args.url and not cookies_path.is_file():
        raise SystemExit(
            "未找到知乎 cookies.json。\n"
            f"当前查找路径: {cookies_path}\n"
            "请先执行:\n"
            "  1. pip install -e pipeline/researcher/zhihu-cli\n"
            "  2. zhihu login --qrcode\n"
            "  3. python pipeline/researcher/sync_zhihu_cookies.py\n"
            "或者手工指定 --cookies /abs/path/to/cookies.json"
        )

    cli = HttpClient(cookies_path=str(cookies_path), timeout=args.timeout)
    result = download_one(
        cli,
        build_item(args.url, args.title),
        out_root=str(output_dir),
        download_images=not args.no_images,
        max_images=args.max_images,
    )

    if args.export_markdown_to:
        if result.get("status") != "ok":
            raise SystemExit(f"下载失败，无法导出 markdown: {result}")
        out_dir = result.get("out_dir")
        if not out_dir:
            raise SystemExit(f"下载结果缺少 out_dir，无法导出 markdown: {result}")
        src_md = Path(out_dir) / "article.md"
        if not src_md.is_file():
            raise SystemExit(f"未找到下载产物 article.md: {src_md}")
        dst_md = Path(args.export_markdown_to).resolve()
        dst_md.parent.mkdir(parents=True, exist_ok=True)
        shutil.copy2(src_md, dst_md)
        result["export_markdown_to"] = str(dst_md)

    print(result)
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
