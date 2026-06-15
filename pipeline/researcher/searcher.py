"""
搜索器（极简版 —— 仅知乎专栏文章）

优化需求：
  1. 只要知乎专栏文章（zhuanlan.zhihu.com/p/{id}）
  2. 排除知乎问答帖 (/question/, /answer/) 以及想法/视频/专栏外内容
  3. 不再做 query 扩展，直接用用户输入的原始 topic 去 /api/v4/search_v3?vertical=article

每个结果统一为：
  {
    "title": str,
    "url": str,          # 规范化后的 https://zhuanlan.zhihu.com/p/{id}
    "snippet": str,
    "source": "zhihu-api",
    "platform": "zhihu",
    "rank": int,         # 该 query 内的命中排序（1 最高）
    "meta": {
        "article_id": str,
        "voteup_count": int,   # 点赞数
        "comment_count": int,  # 评论数
        "zfav_count": int,     # 收藏数
        "created_time": int,   # Unix 秒（若搜索结果带）
        "updated_time": int,
        "author": str,
        "content_type": "article",
    },
    "queries": [query, ...],
  }
"""
from __future__ import annotations

import re
import time as _time_mod
from typing import Any, Dict, List, Optional
from urllib.parse import urlparse

import requests

from http_utils import HttpClient


ZHIHU_API_V4 = "https://www.zhihu.com/api/v4"
CHROME_VERSION = "145"


def _time_strftime_year(ts: int) -> str:
    return _time_mod.strftime("%Y", _time_mod.localtime(int(ts)))


def _time_strftime_date(ts: int) -> str:
    return _time_mod.strftime("%Y-%m-%d", _time_mod.localtime(int(ts)))


def _date_filter_label(since_ts: int = 0, since_year: int = 0) -> str:
    if since_ts > 0:
        return _time_strftime_date(since_ts)
    if since_year > 0:
        return f"{since_year}-01-01"
    return "不限"


def _zhihu_headers(xsrf: str = "") -> Dict[str, str]:
    h = {
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
    if xsrf:
        h["x-xsrftoken"] = xsrf
    return h


# 平台识别（保留最小集合给其他模块复用）
def detect_platform(url: str) -> str:
    host = (urlparse(url).hostname or "").lower()
    if "zhihu.com" in host:
        return "zhihu"
    return host or "unknown"


def _is_zhuanlan_article_url(url: str) -> bool:
    """只认 zhuanlan.zhihu.com/p/{digits} 这种专栏文章 URL。"""
    if not url:
        return False
    try:
        u = urlparse(url)
    except Exception:
        return False
    host = (u.hostname or "").lower()
    path = u.path or ""
    if host != "zhuanlan.zhihu.com":
        return False
    return bool(re.match(r"^/p/\d+/?$", path))


def _normalize_article_url(article_id: str) -> str:
    return f"https://zhuanlan.zhihu.com/p/{article_id}"


def _strip_tags(text: str) -> str:
    if not text:
        return ""
    # 去标签
    t = re.sub(r"<[^>]+>", "", text)
    # 常见 HTML 实体反转义
    import html as _html
    try:
        t = _html.unescape(t)
    except Exception:
        pass
    return t


def search_zhihu_articles_only(
    cli: HttpClient,
    query: str,
    max_results: int = 40,
    since_year: int = 0,
    since_ts: int = 0,
    drop_unknown_date: bool = True,
) -> List[Dict[str, Any]]:
    """
    调用知乎 V4 搜索接口，指定 vertical=article 仅检索专栏文章。
    对结果做严格过滤：
      - 只保留 obj.type == 'article' 的条目
      - URL 必须形如 zhuanlan.zhihu.com/p/{id}
      - 丢弃想法（pin_general/zvideo/answer/question 等其他类型）
      - 若 since_ts>0，则只保留 max(created_time, updated_time) >= since_ts 的条目
      - 否则若 since_year>0，则只保留 created_time 年份 >= since_year 的条目
      - drop_unknown_date=True 时，没有可用时间戳的条目会被丢弃

    注意：知乎 search_v3 服务端不支持时间过滤参数（time_interval/sort 实测全部被忽略），
    因此这里完全采用**客户端过滤**。为保证过滤后仍有足够候选，内部会自动多翻页，
    最多翻 max_scan_pages 页（每页 20 条原始结果）。

    需要 cookies.json 里带有效的 z_c0 / _xsrf / d_c0。
    """
    results: List[Dict[str, Any]] = []

    zhihu_cookies = cli._apply_cookies("https://www.zhihu.com/")
    if not zhihu_cookies or "z_c0" not in zhihu_cookies:
        print("   [zhihu-api] 无知乎登录态（缺 z_c0），无法搜索。")
        return []

    headers = _zhihu_headers(zhihu_cookies.get("_xsrf", ""))

    seen_ids: set = set()
    offset = 0
    page_limit = 20
    # 时间过滤开启后，原始返回里大多数会被丢，所以允许翻更多页
    has_date_filter = since_ts > 0 or since_year > 0
    max_scan_pages = 20 if has_date_filter else 8
    pages_scanned = 0
    filtered_by_date = 0

    while len(results) < max_results and pages_scanned < max_scan_pages:
        params = {
            "gk_version": "gz-gaokao",
            "t": "general",
            "q": query,
            "correction": 1,
            "offset": offset,
            "limit": page_limit,
            "filter_fields": "",
            "lc_idx": 0,
            "show_all_topics": 0,
            "search_source": "Normal",
            "vertical": "article",   # 关键：只要专栏文章
        }
        try:
            resp = requests.get(
                f"{ZHIHU_API_V4}/search_v3",
                params=params,
                headers=headers,
                cookies=zhihu_cookies,
                timeout=15,
            )
        except Exception as e:
            print(f"   [zhihu-api] 请求失败: {e}")
            break

        if resp.status_code in (401, 403):
            print(f"   [zhihu-api] 认证失败 (status={resp.status_code})，cookie 可能已过期。")
            break
        if resp.status_code != 200:
            print(f"   [zhihu-api] status={resp.status_code}")
            break

        try:
            data = resp.json()
        except Exception:
            print(f"   [zhihu-api] 返回非 JSON，停止。")
            break

        items = data.get("data") or []
        pages_scanned += 1
        if not items:
            break

        added_in_page = 0
        for item in items:
            obj = item.get("object") or {}

            # —— 严格过滤：只要专栏文章 ——
            obj_type = obj.get("type") or ""
            if obj_type != "article":
                continue

            article_id = str(obj.get("id") or "")
            if not article_id or article_id in seen_ids:
                continue

            # URL 归一化到 zhuanlan 形式
            url = _normalize_article_url(article_id)
            if not _is_zhuanlan_article_url(url):
                continue

            title = _strip_tags(obj.get("title") or "")
            snippet = _strip_tags(obj.get("excerpt") or "")[:300]
            if not title:
                continue

            voteup = int(obj.get("voteup_count") or 0)
            comment = int(obj.get("comment_count") or 0)
            zfav = int(obj.get("zfav_count") or 0)
            created = int(obj.get("created") or obj.get("created_time") or 0)
            updated = int(obj.get("updated") or obj.get("updated_time") or 0)

            # —— 时间过滤（客户端） ——
            if has_date_filter:
                filter_ts = max(created, updated) if since_ts > 0 else created
                if filter_ts <= 0:
                    if drop_unknown_date:
                        filtered_by_date += 1
                        seen_ids.add(article_id)
                        continue
                elif since_ts > 0:
                    if filter_ts < since_ts:
                        filtered_by_date += 1
                        seen_ids.add(article_id)
                        continue
                else:
                    try:
                        year = int(_time_strftime_year(filter_ts))
                    except Exception:
                        year = 0
                    if year < since_year:
                        filtered_by_date += 1
                        seen_ids.add(article_id)
                        continue

            author = ""
            author_obj = obj.get("author") or {}
            if isinstance(author_obj, dict):
                author = author_obj.get("name", "") or ""

            seen_ids.add(article_id)
            results.append({
                "title": title,
                "url": url,
                "snippet": snippet,
                "source": "zhihu-api",
                "platform": "zhihu",
                "rank": len(results) + 1,
                "meta": {
                    "article_id": article_id,
                    "voteup_count": voteup,
                    "comment_count": comment,
                    "zfav_count": zfav,
                    "created_time": created,
                    "updated_time": updated,
                    "author": author,
                    "content_type": "article",
                },
            })
            added_in_page += 1
            if len(results) >= max_results:
                break

        # 翻页
        paging = data.get("paging") or {}
        if paging.get("is_end") is True:
            break
        offset += page_limit

    if has_date_filter:
        print(
            f"   [zhihu-api] 获取到 {len(results)} 条知乎专栏文章"
            f"（since>={_date_filter_label(since_ts, since_year)}；"
            f"时间过滤丢弃 {filtered_by_date} 条，翻了 {pages_scanned} 页）"
        )
    else:
        print(f"   [zhihu-api] 获取到 {len(results)} 条知乎专栏文章（翻了 {pages_scanned} 页）")
    return results


def multi_source_search(
    cli: HttpClient,
    queries: List[str],
    per_source: int = 40,
    since_year: int = 0,
    since_ts: int = 0,
    drop_unknown_date: bool = True,
    **_ignored,
) -> List[Dict[str, Any]]:
    """
    聚合（极简版）：仅调用知乎专栏文章搜索，多 query 结果按 url 去重、合并 `queries` 列表。
    since_ts>0 时按具体日期过滤；否则 since_year>0 时按年份过滤（均为客户端过滤）。
    兼容旧调用签名，额外的 kwargs 会被忽略。
    """
    all_items: Dict[str, Dict[str, Any]] = {}

    for q in queries:
        print(f"  [搜索] query = {q!r}  since={_date_filter_label(since_ts, since_year)}")
        try:
            items = search_zhihu_articles_only(
                cli, q,
                max_results=per_source,
                since_year=since_year,
                since_ts=since_ts,
                drop_unknown_date=drop_unknown_date,
            )
        except Exception as e:
            print(f"   [zhihu-api] 失败: {e}")
            items = []

        for it in items:
            key = it["url"].split("#")[0].rstrip("/")
            if key not in all_items:
                it["queries"] = [q]
                all_items[key] = it
            else:
                # 同一文章多 query 命中：累计 query、保留互动数最高的 snippet（更长者）
                all_items[key].setdefault("queries", []).append(q)
                if len(it.get("snippet", "")) > len(all_items[key].get("snippet", "")):
                    all_items[key]["snippet"] = it["snippet"]

        cli.sleep_polite(0.4, 0.4)

    return list(all_items.values())


if __name__ == "__main__":
    cli = HttpClient(cookies_path="./cookies.json")
    items = multi_source_search(cli, ["LLM 强化学习"], per_source=20)
    print(f"total: {len(items)}")
    for it in items[:10]:
        m = it["meta"]
        print(
            f" [{m['voteup_count']:>5} 赞 / {m['comment_count']:>3} 评 / {m['zfav_count']:>4} 藏] "
            f"{it['title'][:50]}  -> {it['url']}"
        )
