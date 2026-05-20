"""兼容层：保留旧 cal_vlm.py 的导入路径，实际转发到 cal_llm.py。"""

from __future__ import annotations

from cal_llm import image_to_data_url, openai_inf, openai_load, prepare_multimodal_messages


def venusvl_load(model_path, device):
    return openai_load(model_path, device)


def venusvl_inf(model, processor, images, messages):
    return openai_inf(model, processor, images, messages)


__all__ = [
    "image_to_data_url",
    "prepare_multimodal_messages",
    "venusvl_load",
    "venusvl_inf",
]
