"""
HTTP 工具：统一的 Session、Cookie 管理、反爬 fallback
- 支持加载 cookies.json（为受限站点解锁）
- 支持 r.jina.ai 作为 403/反爬 fallback（仅作为退路）
"""
import json
import os
import random
import time
from typing import Dict, Optional
from urllib.parse import urlparse

import requests

UA_LIST = [
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36",
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:121.0) Gecko/20100101 Firefox/121.0",
]

DEFAULT_HEADERS = {
    "User-Agent": UA_LIST[0],
    "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8",
    "Accept-Language": "zh-CN,zh;q=0.9,en;q=0.8",
    "Accept-Encoding": "gzip, deflate",
    "Cache-Control": "no-cache",
    "Upgrade-Insecure-Requests": "1",
}


def load_cookies(cookies_path: str) -> Dict[str, Dict[str, str]]:
    """
    加载 cookies.json。格式：
    {
      "zhihu.com": {"z_c0": "xxx", "d_c0": "xxx", ...},
      "medium.com": {...}
    }
    """
    if not cookies_path or not os.path.exists(cookies_path):
        return {}
    try:
        with open(cookies_path, "r", encoding="utf-8") as f:
            return json.load(f)
    except Exception as e:
        print(f"[WARN] 加载 cookies 失败: {e}")
        return {}


def _match_cookie_domain(url: str, cookie_map: Dict[str, Dict[str, str]]) -> Optional[Dict[str, str]]:
    host = urlparse(url).hostname or ""
    # 精确匹配优先，否则用后缀匹配
    if host in cookie_map:
        return cookie_map[host]
    for dom, ck in cookie_map.items():
        if host.endswith(dom):
            return ck
    return None


class HttpClient:
    """
    线程安全的 HTTP 客户端：统一 session、UA 轮换、自动 cookie、反爬 fallback。
    """

    def __init__(
        self,
        cookies_path: Optional[str] = None,
        timeout: int = 15,
        enable_jina_fallback: bool = True,
    ):
        self.timeout = timeout
        self.enable_jina_fallback = enable_jina_fallback
        self.session = requests.Session()
        self.session.headers.update(DEFAULT_HEADERS)
        self.cookie_map = load_cookies(cookies_path) if cookies_path else {}

    def _headers(self, extra: Optional[Dict[str, str]] = None) -> Dict[str, str]:
        h = dict(DEFAULT_HEADERS)
        h["User-Agent"] = random.choice(UA_LIST)
        if extra:
            h.update(extra)
        return h

    def _apply_cookies(self, url: str) -> Dict[str, str]:
        ck = _match_cookie_domain(url, self.cookie_map) or {}
        return ck

    def get(
        self,
        url: str,
        params: Optional[Dict] = None,
        headers: Optional[Dict[str, str]] = None,
        timeout: Optional[int] = None,
        allow_redirects: bool = True,
    ) -> requests.Response:
        cookies = self._apply_cookies(url)
        return self.session.get(
            url,
            params=params,
            headers=self._headers(headers),
            cookies=cookies,
            timeout=timeout or self.timeout,
            allow_redirects=allow_redirects,
        )

    def post(
        self,
        url: str,
        data=None,
        json_body=None,
        headers: Optional[Dict[str, str]] = None,
        timeout: Optional[int] = None,
    ) -> requests.Response:
        cookies = self._apply_cookies(url)
        return self.session.post(
            url,
            data=data,
            json=json_body,
            headers=self._headers(headers),
            cookies=cookies,
            timeout=timeout or self.timeout,
        )

    # --- 反爬 fallback：优先直连，失败再 r.jina.ai ---
    def fetch_text(
        self,
        url: str,
        prefer_raw: bool = True,
        allow_jina_fallback: Optional[bool] = None,
    ) -> Dict[str, str]:
        """
        返回 {"html": ..., "source": "direct|jina|fail", "status": int}
        """
        # allow_jina_fallback 用于按站点关闭慢且无效的 fallback。
        # 1) 直连
        try:
            r = self.get(url, timeout=self.timeout)
            if r.status_code == 200 and len(r.text) > 800:
                return {"html": r.text, "source": "direct", "status": 200, "final_url": r.url}
            status = r.status_code
        except Exception as e:
            status = -1

        # 2) r.jina.ai fallback（免 key 的阅读代理，返回 markdown 文本）
        if allow_jina_fallback is None:
            allow_jina_fallback = self.enable_jina_fallback
        if allow_jina_fallback:
            try:
                jina_url = "https://r.jina.ai/" + url
                r2 = requests.get(
                    jina_url,
                    headers={"User-Agent": UA_LIST[0], "Accept": "text/plain"},
                    timeout=max(30, self.timeout),
                )
                if r2.status_code == 200 and "Warning: Target URL returned error" not in r2.text[:500]:
                    return {
                        "html": r2.text,  # 这里返回的是 markdown 文本
                        "source": "jina",
                        "status": 200,
                        "final_url": url,
                    }
            except Exception:
                pass

        return {"html": "", "source": "fail", "status": status, "final_url": url}

    def sleep_polite(self, base: float = 0.8, jitter: float = 1.2):
        time.sleep(base + random.random() * jitter)


if __name__ == "__main__":
    cli = HttpClient()
    r = cli.fetch_text("https://arxiv.org/abs/2203.02155")
    print("source:", r["source"], "len:", len(r["html"]))
