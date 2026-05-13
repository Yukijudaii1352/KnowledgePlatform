from http_utils import HttpClient
from downloader import download_one

item = {
    "title": "知乎专栏_1951985172259004422",
    "url": "https://zhuanlan.zhihu.com/p/1951985172259004422",
    "platform": "zhihu",
    "queries": ["manual"],
    "meta": {
        "author": "",
        "voteup_count": 0,
        "comment_count": 0,
        "zfav_count": 0,
        "created_time": 0,
    },
}

cli = HttpClient(cookies_path="./cookies.json", timeout=15)
result = download_one(
    cli,
    item,
    out_root="./output/manual_downloads",
    download_images=True,
    max_images=40,
)
print(result)