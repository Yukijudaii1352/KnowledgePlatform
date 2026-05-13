"""
LLM 客户端：基于 cal_vlm.py 的薄封装
- chat(): 常规文本对话
- chat_json(): 强制解析为 JSON（带重试 & 容错）
"""
import json
import re
import time
from typing import Any, Dict, List, Optional

from cal_vlm import venusvl_inf

DEFAULT_MODEL = "gpt-5.4"


def chat(
    messages: List[Dict[str, str]],
    model: str = DEFAULT_MODEL,
    images: Optional[List[str]] = None,
    retries: int = 3,
    retry_sleep: float = 2.0,
) -> str:
    """
    调用大模型。出错自动重试。
    """
    last_err = None
    for i in range(retries):
        try:
            return venusvl_inf(model, None, images or [], messages)
        except Exception as e:
            last_err = e
            time.sleep(retry_sleep * (i + 1))
    raise RuntimeError(f"LLM 调用失败（已重试 {retries} 次）: {last_err}")


def _extract_json(text: str) -> Any:
    """
    从模型响应中提取 JSON。兼容 ```json ``` 代码块 / 直接 JSON / 中间包含文本。
    """
    if text is None:
        raise ValueError("empty response")
    # 1) 代码块
    m = re.search(r"```(?:json)?\s*(\{.*?\}|\[.*?\])\s*```", text, re.DOTALL)
    if m:
        return json.loads(m.group(1))
    # 2) 直接尝试整体解析
    try:
        return json.loads(text)
    except Exception:
        pass
    # 3) 匹配最外层 { ... } 或 [ ... ]
    for pattern in (r"(\{.*\})", r"(\[.*\])"):
        m = re.search(pattern, text, re.DOTALL)
        if m:
            try:
                return json.loads(m.group(1))
            except Exception:
                continue
    raise ValueError(f"无法从模型输出解析 JSON: {text[:200]!r}")


def chat_json(
    messages: List[Dict[str, str]],
    model: str = DEFAULT_MODEL,
    retries: int = 3,
) -> Any:
    """
    调用大模型并要求返回 JSON。
    """
    last_err = None
    for i in range(retries):
        try:
            resp = chat(messages, model=model, retries=1)
            return _extract_json(resp)
        except Exception as e:
            last_err = e
            # 尝试追加一条"只返回 JSON"的系统提示，加强约束
            if i == 0 and messages and messages[0].get("role") != "system":
                messages = [{"role": "system", "content": "你必须仅输出合法的 JSON，不要输出任何解释、Markdown、代码块标记。"}] + messages
            time.sleep(1.5 * (i + 1))
    raise RuntimeError(f"LLM JSON 调用失败: {last_err}")


if __name__ == "__main__":
    r = chat_json([
        {"role": "user",
         "content": "返回一个 JSON 对象，key=status，value=ok"}
    ])
    print(r)
