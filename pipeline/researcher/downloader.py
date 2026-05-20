"""
下载器：将排序后的博客完整保存到本地
- 原始 HTML
- 正文 Markdown（trafilatura 优先，readability 降级）
- 图片打包到本地目录
- metadata.json 记录标题/作者/来源/评分
"""
from __future__ import annotations

import hashlib
import json
import os
import re
import time
import traceback
from typing import Any, Dict, List, Optional, Tuple
from urllib.parse import urljoin, urlparse

import trafilatura
from bs4 import BeautifulSoup
from markdownify import markdownify as md_convert
from readability import Document as ReadabilityDoc

from http_utils import HttpClient


# ============ 知乎 API 下载支持 ============

def _load_zhihu_cookies() -> dict:
    """加载知乎 cookies，优先 zhihu-cli，其次项目内 cookies.json。"""
    import os
    import json as _json

    # 1) zhihu-cli 的标准位置
    zhihu_cli_cookie_path = os.path.expanduser("~/.zhihu-cli/cookies.json")
    if os.path.exists(zhihu_cli_cookie_path):
        try:
            data = _json.load(open(zhihu_cli_cookie_path, "r", encoding="utf-8"))
            cookies = data.get("cookies", {})
            if isinstance(cookies, dict) and cookies:
                return cookies
        except Exception:
            pass

    # 2) 兼容当前项目 researcher/cookies.json 结构：{"zhihu.com": {...}}
    candidates = [
        os.path.join(os.getcwd(), "cookies.json"),
        os.path.join(os.path.dirname(__file__), "cookies.json"),
    ]
    for cookie_path in candidates:
        if not os.path.exists(cookie_path):
            continue
        try:
            data = _json.load(open(cookie_path, "r", encoding="utf-8"))
            if isinstance(data, dict):
                # 兼容直接是 cookie map 的情况
                if "z_c0" in data:
                    return data
                zhihu_cookie = data.get("zhihu.com")
                if isinstance(zhihu_cookie, dict) and zhihu_cookie:
                    return zhihu_cookie
        except Exception:
            continue

    return {}


def _zhihu_api_headers() -> dict:
    """构建知乎 API 请求所需的浏览器指纹 headers"""
    CHROME_VERSION = "145"
    return {
        "User-Agent": (
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) "
            "AppleWebKit/537.36 (KHTML, like Gecko) "
            f"Chrome/{CHROME_VERSION}.0.0.0 Safari/537.36"
        ),
        "Accept": "application/json, text/plain, */*",
        "Accept-Language": "zh-CN,zh;q=0.9,en;q=0.8",
        "Referer": "https://www.zhihu.com/",
        "sec-ch-ua": (
            f'"Not:A-Brand";v="99", '
            f'"Google Chrome";v="{CHROME_VERSION}", '
            f'"Chromium";v="{CHROME_VERSION}"'
        ),
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": '"Windows"',
    }


def _zhihu_api_get(
    api_url: str,
    headers: Dict[str, str],
    cookies: Dict[str, str],
    params: Optional[Dict[str, Any]] = None,
    retries: int = 3,
    timeout: Tuple[int, int] = (10, 30),
):
    """对知乎 API 做有限重试，降低偶发读超时导致的整篇下载失败。"""
    import requests as _requests

    last_error = None
    for attempt in range(1, retries + 1):
        try:
            resp = _requests.get(
                api_url,
                headers=headers,
                cookies=cookies,
                params=params,
                timeout=timeout,
            )
            if resp.status_code in (429, 500, 502, 503, 504) and attempt < retries:
                time.sleep(min(1.5 * attempt, 4.0))
                continue
            return resp
        except _requests.exceptions.Timeout as e:
            last_error = e
            if attempt < retries:
                print(f"   [zhihu-api-download] timeout，第 {attempt}/{retries} 次重试...")
                time.sleep(min(1.5 * attempt, 4.0))
                continue
            raise
        except _requests.exceptions.RequestException as e:
            last_error = e
            if attempt < retries:
                print(f"   [zhihu-api-download] request error，第 {attempt}/{retries} 次重试: {e}")
                time.sleep(min(1.5 * attempt, 4.0))
                continue
            raise
    if last_error:
        raise last_error
    return None


def _fetch_zhihu_via_api(url: str) -> Optional[Dict[str, Any]]:
    """
    通过知乎 V4 API 获取知乎回答/文章的正文内容。
    返回 {"title": str, "content_html": str, "author": str, "voteup": int, "created": str} 或 None。
    """
    cookies = _load_zhihu_cookies()
    if not cookies or "z_c0" not in cookies:
        return None

    headers = _zhihu_api_headers()
    xsrf = cookies.get("_xsrf", "")
    if xsrf:
        headers["x-xsrftoken"] = xsrf

    parsed = urlparse(url)
    path = parsed.path

    try:
        # 知乎回答: /question/{qid}/answer/{aid}
        m = re.match(r"/question/(\d+)/answer/(\d+)", path)
        if m:
            answer_id = m.group(2)
            api_url = f"https://www.zhihu.com/api/v4/answers/{answer_id}"
            params = {"include": "content,voteup_count,comment_count,created_time,updated_time,author,question"}
            resp = _zhihu_api_get(api_url, headers=headers, cookies=cookies, params=params)
            if resp.status_code == 200:
                data = resp.json()
                question = data.get("question", {})
                return {
                    "title": question.get("title", "") + " - " + data.get("author", {}).get("name", ""),
                    "content_html": data.get("content", ""),
                    "author": data.get("author", {}).get("name", ""),
                    "voteup": data.get("voteup_count", 0),
                    "created": data.get("created_time", ""),
                    "question_title": question.get("title", ""),
                }
            return None

        # 知乎文章: /p/{article_id}
        m = re.match(r"/p/(\d+)", path)
        if m:
            article_id = m.group(1)
            # 知乎专栏文章的正确 API: zhuanlan.zhihu.com/api/articles/{id}
            api_url = f"https://zhuanlan.zhihu.com/api/articles/{article_id}"
            resp = _zhihu_api_get(api_url, headers=headers, cookies=cookies)
            if resp.status_code == 200:
                data = resp.json()
                return {
                    "title": data.get("title", ""),
                    "content_html": data.get("content", ""),
                    "author": data.get("author", {}).get("name", ""),
                    "voteup": data.get("voteup_count", 0),
                    "created": data.get("created_time", ""),
                }
            return None

        # 知乎问题（获取最高赞回答）: /question/{qid}
        m = re.match(r"/question/(\d+)$", path)
        if m:
            question_id = m.group(1)
            # 先获取问题详情
            api_url = f"https://www.zhihu.com/api/v4/questions/{question_id}"
            resp = _zhihu_api_get(api_url, headers=headers, cookies=cookies)
            q_title = ""
            if resp.status_code == 200:
                q_title = resp.json().get("title", "")

            # 获取最高赞回答
            api_url = f"https://www.zhihu.com/api/v4/questions/{question_id}/answers"
            params = {
                "include": "data[*].content,voteup_count,comment_count,created_time,author",
                "offset": 0,
                "limit": 3,
                "sort_by": "default",
            }
            resp = _zhihu_api_get(api_url, headers=headers, cookies=cookies, params=params)
            if resp.status_code == 200:
                answers = resp.json().get("data", [])
                if answers:
                    # 合并多个高赞回答
                    combined_html = ""
                    for a in answers:
                        author = a.get("author", {}).get("name", "匿名")
                        voteup = a.get("voteup_count", 0)
                        content = a.get("content", "")
                        if content:
                            combined_html += (
                                f'<h2>回答者：{author}（{voteup} 赞）</h2>\n{content}\n<hr/>\n'
                            )
                    return {
                        "title": q_title,
                        "content_html": combined_html,
                        "author": "多位作者",
                        "voteup": answers[0].get("voteup_count", 0) if answers else 0,
                        "created": answers[0].get("created_time", "") if answers else "",
                    }
            return None

    except Exception as e:
        print(f"   [zhihu-api-download] 异常: {e}")
        return None

    return None


def _safe_slug(text: str, max_len: int = 60) -> str:
    text = (text or "").strip()
    text = re.sub(r"[\s/\\:*?\"<>|#]+", "_", text)
    text = re.sub(r"_+", "_", text).strip("_.")
    if len(text) > max_len:
        text = text[:max_len]
    if not text:
        text = "untitled"
    return text


def _url_hash(url: str, n: int = 8) -> str:
    return hashlib.md5(url.encode("utf-8")).hexdigest()[:n]


def _guess_title_from_html(html: str) -> str:
    try:
        soup = BeautifulSoup(html, "lxml")
        if soup.title and soup.title.string:
            return soup.title.string.strip()
        h1 = soup.find("h1")
        if h1:
            return h1.get_text(" ", strip=True)
    except Exception:
        pass
    return ""


def extract_main_content(
    html: str, url: str
) -> Tuple[Optional[str], str, Optional[str]]:
    """
    返回 (title, markdown, cleaned_html)
    markdown 为正文 markdown；cleaned_html 为可选的正文 HTML（用于图片链接抽取）
    """
    # 1) trafilatura
    try:
        extracted = trafilatura.extract(
            html,
            url=url,
            output_format="markdown",
            include_images=True,
            include_links=True,
            include_formatting=True,
            favor_recall=True,
        )
        if extracted and len(extracted) > 200:
            title = _guess_title_from_html(html)
            return title, extracted, None
    except Exception:
        pass

    # 2) readability-lxml + markdownify
    try:
        doc = ReadabilityDoc(html)
        title = doc.short_title()
        content_html = doc.summary(html_partial=True)
        if content_html and len(content_html) > 200:
            md = md_convert(content_html, heading_style="ATX", bullets="-")
            return title, md, content_html
    except Exception:
        pass

    # 3) 兜底：BS4 body 文本
    try:
        soup = BeautifulSoup(html, "lxml")
        for tag in soup(["script", "style", "nav", "footer", "header", "aside", "noscript"]):
            tag.decompose()
        body = soup.body or soup
        text = body.get_text("\n", strip=True)
        title = _guess_title_from_html(html)
        return title, text, None
    except Exception:
        return None, "", None


def _collect_image_urls(md_text: str, cleaned_html: Optional[str], base_url: str) -> List[str]:
    urls = set()
    for m in re.finditer(r"!\[[^\]]*\]\(([^)\s]+)", md_text or ""):
        u = m.group(1)
        if u.startswith("//"):
            u = "https:" + u
        elif u.startswith("/"):
            u = urljoin(base_url, u)
        elif not u.startswith("http"):
            u = urljoin(base_url, u)
        urls.add(u)
    if cleaned_html:
        try:
            soup = BeautifulSoup(cleaned_html, "lxml")
            for img in soup.find_all("img"):
                src = img.get("src") or img.get("data-src") or img.get("data-original") or ""
                if not src:
                    continue
                if src.startswith("//"):
                    src = "https:" + src
                elif src.startswith("/"):
                    src = urljoin(base_url, src)
                elif not src.startswith("http"):
                    src = urljoin(base_url, src)
                urls.add(src)
        except Exception:
            pass
    # 过滤 data URI
    urls = {u for u in urls if u and u.startswith(("http://", "https://"))}
    return list(urls)


def _download_images(
    cli: HttpClient,
    image_urls: List[str],
    img_dir: str,
    max_images: int = 40,
) -> Dict[str, str]:
    """返回 url -> 本地相对路径的映射"""
    os.makedirs(img_dir, exist_ok=True)
    mapping: Dict[str, str] = {}
    for i, url in enumerate(image_urls[:max_images]):
        try:
            r = cli.get(url, timeout=15)
            if r.status_code != 200 or len(r.content) < 300:
                continue
            # 判断扩展名
            ctype = (r.headers.get("Content-Type") or "").lower()
            ext = ".jpg"
            if "png" in ctype:
                ext = ".png"
            elif "gif" in ctype:
                ext = ".gif"
            elif "webp" in ctype:
                ext = ".webp"
            elif "svg" in ctype:
                ext = ".svg"
            elif "jpeg" in ctype or "jpg" in ctype:
                ext = ".jpg"
            else:
                # 从 URL 推断
                path = urlparse(url).path
                m = re.search(r"(\.(?:jpe?g|png|gif|webp|svg|bmp))(?:$|\?)", path, re.I)
                if m:
                    ext = m.group(1).lower()
            fname = f"img_{i:03d}_{_url_hash(url)}{ext}"
            fpath = os.path.join(img_dir, fname)
            with open(fpath, "wb") as f:
                f.write(r.content)
            mapping[url] = f"images/{fname}"
        except Exception:
            continue
    return mapping


def _rewrite_md_images(md_text: str, mapping: Dict[str, str], base_url: str) -> str:
    """把 markdown 中的远程图片 URL 替换为本地路径。"""
    if not md_text:
        return md_text

    def _norm(u: str) -> str:
        if u.startswith("//"):
            return "https:" + u
        if u.startswith("/"):
            return urljoin(base_url, u)
        if not u.startswith("http"):
            return urljoin(base_url, u)
        return u

    def repl(m: re.Match) -> str:
        alt = m.group(1)
        url = m.group(2)
        rest = m.group(3) or ""
        n = _norm(url)
        if n in mapping:
            return f"![{alt}]({mapping[n]}{rest})"
        return m.group(0)

    return re.sub(r"!\[([^\]]*)\]\(([^)\s]+)(\s+[^)]*)?\)", repl, md_text)


def download_one(
    cli: HttpClient,
    item: Dict[str, Any],
    out_root: str,
    download_images: bool = True,
    max_images: int = 40,
) -> Dict[str, Any]:
    """
    下载单条条目。返回下载结果 dict。
    """
    url = item["url"]
    platform = item.get("platform", "unknown")
    raw_title = item.get("title") or ""
    slug = _safe_slug(raw_title or url, max_len=50)
    hid = _url_hash(url, 8)
    folder_name = f"{_safe_slug(platform, 20)}__{slug}__{hid}"
    out_dir = os.path.join(out_root, folder_name)
    os.makedirs(out_dir, exist_ok=True)

    result = {
        "url": url,
        "title": raw_title,
        "platform": platform,
        "out_dir": out_dir,
        "status": "pending",
        "error": "",
    }

    try:
        # 知乎直连常被 403，r.jina.ai 又容易慢失败；优先尽快切到 API 降级。
        if platform == "zhihu":
            fetched = cli.fetch_text(url, allow_jina_fallback=False)
        else:
            fetched = cli.fetch_text(url)
        source = fetched["source"]
        html = fetched["html"]

        # 知乎 API 降级：如果直连和 jina 都失败，对知乎 URL 尝试 API 获取
        if (source == "fail" or (source == "direct" and len(html) < 800)) and platform == "zhihu":
            print(f"   知乎直连受限，尝试 API 方式...")
            zhihu_data = _fetch_zhihu_via_api(url)
            if zhihu_data and zhihu_data.get("content_html"):
                content_html = zhihu_data["content_html"]
                zhihu_title = zhihu_data.get("title", raw_title)
                # 构造完整 HTML 以便后续正文提取
                html = (
                    f"<html><head><title>{zhihu_title}</title></head>"
                    f"<body><h1>{zhihu_title}</h1>"
                    f"<p>作者: {zhihu_data.get('author','')}, 赞: {zhihu_data.get('voteup',0)}</p>"
                    f"<div class='content'>{content_html}</div></body></html>"
                )
                source = "zhihu-api"
                if zhihu_title:
                    result["title"] = zhihu_title

        if source == "fail" or not html:
            result["status"] = "failed_fetch"
            result["error"] = f"直连&反代均失败（status={fetched.get('status')}）"
            # 仍然写 metadata.json
            with open(os.path.join(out_dir, "metadata.json"), "w", encoding="utf-8") as f:
                json.dump({**item, **result}, f, ensure_ascii=False, indent=2)
            return result

        # 原始 HTML（或 jina 返回的 md 文本）
        raw_ext = ".html" if source in ("direct", "zhihu-api") else ".md"
        with open(os.path.join(out_dir, f"raw{raw_ext}"), "w", encoding="utf-8") as f:
            f.write(html)

        # 正文提取
        if source == "zhihu-api":
            # zhihu-api 模式：HTML 已经是结构化的正文，直接转 markdown
            title_x = result.get("title") or raw_title
            md_text = md_convert(html, heading_style="ATX", bullets="-")
            cleaned_html = html
        elif source == "direct":
            title_x, md_text, cleaned_html = extract_main_content(html, url)
        else:
            # jina 返回的就是 markdown
            title_x = raw_title
            md_text = html
            cleaned_html = None

        if title_x and (not raw_title or len(raw_title) < 5):
            result["title"] = title_x

        # 图片
        img_mapping: Dict[str, str] = {}
        if download_images and md_text and source == "direct":
            img_urls = _collect_image_urls(md_text, cleaned_html, url)
            if img_urls:
                img_dir = os.path.join(out_dir, "images")
                img_mapping = _download_images(cli, img_urls, img_dir, max_images=max_images)
                md_text = _rewrite_md_images(md_text, img_mapping, url)

        # 写 markdown
        md_path = os.path.join(out_dir, "article.md")
        _meta = item.get("meta") or {}
        _author = _meta.get("author", "") or "-"
        _voteup = _meta.get("voteup_count", 0)
        _comment = _meta.get("comment_count", 0)
        _zfav = _meta.get("zfav_count", 0)
        _ct = _meta.get("created_time", 0) or 0
        _created_str = (
            time.strftime("%Y-%m-%d", time.localtime(int(_ct))) if _ct else "-"
        )
        header = (
            f"# {result['title'] or raw_title}\n\n"
            f"- 来源平台: **{platform}**（知乎专栏文章）\n"
            f"- 原文链接: <{url}>\n"
            f"- 作者: {_author}\n"
            f"- 发表日期: {_created_str}\n"
            f"- 互动数据: 👍 {_voteup} 赞 / 💬 {_comment} 评 / ⭐ {_zfav} 藏\n"
            f"- 搜索命中查询: {', '.join(item.get('queries', []))}\n"
            f"- 启发式分: {item.get('heuristic_score')}\n"
            f"- LLM 三维分: {item.get('llm_scores')} (加权总分 {item.get('llm_total')})\n"
            f"- 综合分: {item.get('final_score')}\n"
            f"- LLM 点评: {item.get('llm_reason', '')}\n"
            f"- 抓取方式: {source}\n"
            f"- 抓取时间: {time.strftime('%Y-%m-%d %H:%M:%S')}\n\n"
            "---\n\n"
        )
        with open(md_path, "w", encoding="utf-8") as f:
            f.write(header + (md_text or ""))

        # metadata
        meta = dict(item)
        meta.update({
            "out_dir": out_dir,
            "md_file": "article.md",
            "raw_file": f"raw{raw_ext}",
            "image_count": len(img_mapping),
            "fetch_source": source,
            "fetched_at": time.strftime("%Y-%m-%d %H:%M:%S"),
            "md_length": len(md_text or ""),
        })
        with open(os.path.join(out_dir, "metadata.json"), "w", encoding="utf-8") as f:
            json.dump(meta, f, ensure_ascii=False, indent=2)

        result["status"] = "ok"
        result["md_length"] = len(md_text or "")
        result["image_count"] = len(img_mapping)
        result["fetch_source"] = source
        return result

    except Exception as e:
        result["status"] = "error"
        result["error"] = f"{e}\n{traceback.format_exc()[:500]}"
        try:
            with open(os.path.join(out_dir, "error.log"), "w", encoding="utf-8") as f:
                f.write(result["error"])
        except Exception:
            pass
        return result


def download_many(
    cli: HttpClient,
    items: List[Dict[str, Any]],
    out_root: str,
    download_images: bool = True,
    max_images: int = 40,
    polite_sleep: float = 1.0,
) -> List[Dict[str, Any]]:
    os.makedirs(out_root, exist_ok=True)
    results: List[Dict[str, Any]] = []
    for i, it in enumerate(items):
        print(f"[{i+1}/{len(items)}] 下载 ({it.get('platform')}) {it.get('title','')[:50]} ...")
        r = download_one(cli, it, out_root, download_images=download_images, max_images=max_images)
        status_icon = "✅" if r["status"] == "ok" else "⚠️" if r["status"].startswith("failed") else "❌"
        print(f"   {status_icon} {r['status']}  md_len={r.get('md_length', '-')}  imgs={r.get('image_count','-')}  src={r.get('fetch_source','-')}")
        results.append(r)
        time.sleep(polite_sleep)
    return results


if __name__ == "__main__":
    cli = HttpClient()
    item = {
        "title": "Illustrating Reinforcement Learning from Human Feedback (RLHF)",
        "url": "https://huggingface.co/blog/rlhf",
        "platform": "huggingface",
        "queries": ["RLHF"],
    }
    r = download_one(cli, item, "/tmp/researcher_test", download_images=True, max_images=5)
    print(r)
