#!/usr/bin/env python3
"""
将 zhihu-cli 的登录 Cookie 同步到 researcher 的 cookies.json 中。

用法：
  1. 先用 zhihu-cli 登录：
     zhihu login --qrcode   (扫码)
     或 zhihu login --cookie "z_c0=xxx; _xsrf=yyy; d_c0=zzz"

  2. 运行本脚本同步 cookie：
     python3 sync_zhihu_cookies.py

  3. 验证状态：
     zhihu status
"""

import json
import os
import sys


def sync():
    # zhihu-cli 的 cookie 存储路径
    zhihu_cli_path = os.path.expanduser("~/.zhihu-cli/cookies.json")
    # researcher 的 cookies.json 路径
    researcher_cookies_path = os.path.join(os.path.dirname(os.path.abspath(__file__)), "cookies.json")

    if not os.path.exists(zhihu_cli_path):
        print("❌ 未找到 zhihu-cli 的 cookie 文件")
        print(f"   期望路径: {zhihu_cli_path}")
        print("   请先运行: zhihu login --qrcode")
        return 1

    # 加载 zhihu-cli cookies
    with open(zhihu_cli_path, "r", encoding="utf-8") as f:
        data = json.load(f)

    zhihu_cookies = data.get("cookies", {})
    if not zhihu_cookies or "z_c0" not in zhihu_cookies:
        print("❌ zhihu-cli cookie 无效（缺少 z_c0）")
        print("   请重新登录: zhihu login --qrcode")
        return 1

    # 加载或创建 researcher cookies.json
    existing = {}
    if os.path.exists(researcher_cookies_path):
        try:
            with open(researcher_cookies_path, "r", encoding="utf-8") as f:
                existing = json.load(f)
        except Exception:
            existing = {}

    # 注入知乎 cookies
    existing["zhihu.com"] = zhihu_cookies

    # 保存
    with open(researcher_cookies_path, "w", encoding="utf-8") as f:
        json.dump(existing, f, ensure_ascii=False, indent=2)

    print("✅ 知乎 Cookie 同步成功！")
    print(f"   来源: {zhihu_cli_path}")
    print(f"   目标: {researcher_cookies_path}")
    print(f"   Cookie 字段: {list(zhihu_cookies.keys())}")
    print()
    print("   现在可以运行:")
    print("   python3 main.py \"LLM 强化学习\" --top 5")
    return 0


if __name__ == "__main__":
    sys.exit(sync())
