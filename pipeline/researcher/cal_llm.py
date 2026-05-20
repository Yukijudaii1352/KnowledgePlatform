"""OpenAI-compatible LLM/VLM client helpers.

目标：
1. 用统一的 OpenAI 格式 API 替代旧的内部 Venus 调用。
2. 尽量保持与 `cal_vlm.py` 原接口兼容，方便上层模块无感切换。

环境变量：
- `OPENAI_API_KEY` 或 `DEEPSEEK_API_KEY`
- `OPENAI_BASE_URL`（可选，默认 `https://api.deepseek.com`）
- `OPENAI_MODEL`（可选，默认 `deepseek-v4-pro`）
"""

from __future__ import annotations

import base64
import copy
import io
import os
from typing import Any

from PIL import Image

try:
    from openai import OpenAI
except ModuleNotFoundError as exc:  # pragma: no cover - import guard
    raise ModuleNotFoundError(
        "缺少 openai SDK，请先安装：pip install openai"
    ) from exc


DEFAULT_BASE_URL = os.environ.get("OPENAI_BASE_URL", "https://api.deepseek.com")
DEFAULT_MODEL = os.environ.get("OPENAI_MODEL", "deepseek-v4-pro")


def _resolve_api_key() -> str:
    api_key = (
        os.environ.get("OPENAI_API_KEY")
        or os.environ.get("DEEPSEEK_API_KEY")
        or os.environ.get("DEEPSEEK_API_TOKEN")
    )
    if not api_key:
        raise ValueError(
            "未设置 API key。请设置 OPENAI_API_KEY 或 DEEPSEEK_API_KEY 环境变量。"
        )
    return api_key


def create_client(base_url: str | None = None) -> OpenAI:
    return OpenAI(
        api_key=_resolve_api_key(),
        base_url=base_url or DEFAULT_BASE_URL,
    )


def detect_image_mime(data: bytes) -> str | None:
    if data[:3] == b"\xff\xd8\xff":
        return "image/jpeg"
    if data[:8] == b"\x89PNG\r\n\x1a\n":
        return "image/png"
    if data[:6] in (b"GIF87a", b"GIF89a"):
        return "image/gif"
    if data[:4] == b"RIFF" and data[8:12] == b"WEBP":
        return "image/webp"
    return None


def image_to_data_url(file_path: str) -> str:
    allowed = {"image/jpeg", "image/png", "image/gif", "image/webp"}
    with open(file_path, "rb") as f:
        raw = f.read()

    mime_type = detect_image_mime(raw)
    if mime_type in allowed:
        return f"data:{mime_type};base64,{base64.b64encode(raw).decode('utf-8')}"

    with Image.open(io.BytesIO(raw)) as img:
        with io.BytesIO() as buffer:
            img.save(buffer, format="PNG")
            base64_image = base64.b64encode(buffer.getvalue()).decode("utf-8")
    return f"data:image/png;base64,{base64_image}"


def prepare_multimodal_messages(images: list[str], messages: list[dict[str, Any]]) -> list[dict[str, Any]]:
    """把 `<image>` 占位符转换成 OpenAI-compatible 多模态 content parts。"""
    image_urls = [image_to_data_url(path) for path in images]
    placeholder_count = sum(
        msg.get("content", "").count("<image>")
        for msg in messages
        if isinstance(msg.get("content"), str)
    )
    if placeholder_count != len(image_urls):
        raise ValueError(
            f"消息中的 <image> 占位符数量 ({placeholder_count}) 与图片数量 ({len(image_urls)}) 不匹配。"
        )

    image_iter = iter(image_urls)
    converted: list[dict[str, Any]] = []
    for msg in messages:
        content = msg.get("content")
        if not isinstance(content, str) or "<image>" not in content:
            converted.append(copy.deepcopy(msg))
            continue

        parts: list[dict[str, Any]] = []
        chunks = content.split("<image>")
        for idx, text_part in enumerate(chunks):
            if text_part:
                parts.append({"type": "text", "text": text_part})
            if idx < len(chunks) - 1:
                image_url = next(image_iter)
                parts.append({"type": "image_url", "image_url": {"url": image_url}})
        converted.append({"role": msg["role"], "content": parts})
    return converted


def openai_load(model_path: str | None = None, device: str | None = None):
    """保留与旧 VLM 接口相同的 load 形式。"""
    return model_path or DEFAULT_MODEL, None


def openai_inf(
    model: str | None,
    processor: Any,
    images: list[str],
    messages: list[dict[str, Any]],
    *,
    base_url: str | None = None,
) -> str:
    """统一文本/图像推理入口。

    说明：
    - 当 `images` 为空时，走普通 chat.completions。
    - 当 `images` 非空时，按 OpenAI 多模态消息格式组织请求。
    - 具体后端是否接受图像，取决于配置的模型/API；若后端不支持，这里会把服务端错误原样抛出。
    """
    client = create_client(base_url=base_url)
    final_model = model or DEFAULT_MODEL
    final_messages = (
        prepare_multimodal_messages(images, messages) if images else messages
    )

    kwargs: dict[str, Any] = {
        "model": final_model,
        "messages": final_messages,
        "stream": False,
    }

    # 兼容部分推理模型的扩展字段；若后端不接受，则自动回退。
    try:
        response = client.chat.completions.create(
            **kwargs,
            reasoning_effort="high",
            extra_body={"thinking": {"type": "enabled"}},
        )
    except TypeError:
        response = client.chat.completions.create(**kwargs)
    except Exception as exc:
        message = str(exc).lower()
        if "reasoning_effort" in message or "thinking" in message or "extra_body" in message:
            response = client.chat.completions.create(**kwargs)
        else:
            raise

    content = response.choices[0].message.content
    return content or ""


# 与旧 cal_vlm.py 接口兼容
venusvl_load = openai_load
venusvl_inf = openai_inf


if __name__ == "__main__":
    messages = [
        {"role": "system", "content": "You are a helpful assistant"},
        {"role": "user", "content": "Hello"},
    ]
    print(openai_inf(DEFAULT_MODEL, None, [], messages))
