import base64
import io
import json
from PIL import Image
import copy
from venus_api_base.http_client import HttpClient
from venus_api_base.config import Config

secret_id = "Qhifd2MxQkHexF9mxqM4Ff7Z"
secret_key = "e7NhtpbfwyFakS90iTYRoEER"


def detect_image_mime(data: bytes) -> str:
    """通过文件魔数检测图片的真实 MIME 类型。"""
    if data[:3] == b'\xff\xd8\xff':
        return 'image/jpeg'
    elif data[:8] == b'\x89PNG\r\n\x1a\n':
        return 'image/png'
    elif data[:6] in (b'GIF87a', b'GIF89a'):
        return 'image/gif'
    elif data[:4] == b'RIFF' and data[8:12] == b'WEBP':
        return 'image/webp'
    else:
        return None


def image_to_data_url(file_path):
    allowed_mime_types = {'image/jpeg', 'image/png', 'image/gif', 'image/webp'}
    with open(file_path, "rb") as image_file:
        raw = image_file.read()

    # 优先通过魔数检测真实格式，避免扩展名与实际格式不符导致 API 报错
    mime_type = detect_image_mime(raw)

    if mime_type in allowed_mime_types:
        base64_image = base64.b64encode(raw).decode("utf-8")
        return f"data:{mime_type};base64,{base64_image}"
    else:
        # 无法识别的格式，用 PIL 转换为 PNG
        with Image.open(io.BytesIO(raw)) as img:
            output_format = 'PNG'
            output_mime = 'image/png'
            with io.BytesIO() as buffer:
                img.save(buffer, format=output_format)
                base64_image = base64.b64encode(buffer.getvalue()).decode("utf-8")
            return f"data:{output_mime};base64,{base64_image}"

def prepare_venus_messages(images,messages):
    """
    将包含<image>占位符的文本消息转换为Qwen-VL的输入格式。

    Args:
        messages (list): 原始消息列表，格式如：
                         [{"role": "user", "content": "这是图片1:<image>..."}]
        images (list): 包含所有图片绝对路径的列表。

    Returns:
        list: 转换后符合Qwen-VL格式的消息列表。
    
    Raises:
        ValueError: 如果<image>占位符的数量与提供的图片路径数量不匹配。
    """
    images = [image_to_data_url(image) for image in images]
    # 统计所有消息中 <image> 占位符的总数
    placeholder_count = sum(msg.get("content", "").count("<image>") for msg in messages if isinstance(msg.get("content"), str))
    
    if placeholder_count != len(images):
        raise ValueError(
            f"错误：消息中的 '<image>' 占位符数量 ({placeholder_count}) "
            f"与提供的图片数量 ({len(images)}) 不匹配。"
        )

    # 使用迭代器来按顺序获取图片路径
    image_iter = iter(images)
    
    # 创建一个新的列表来存储转换后的消息，避免直接修改原始输入
    new_conversation = []

    for msg in messages:
        # 如果消息内容不是字符串，或者不包含<image>，则直接添加
        if not isinstance(msg.get("content"), str) or "<image>" not in msg["content"]:
            new_conversation.append(copy.deepcopy(msg))
            continue

        # 分割包含<image>的内容
        content_str = msg["content"]
        parts = content_str.split("<image>")
        
        new_content = []
        for i, text_part in enumerate(parts):
            # 添加文本部分（如果非空）
            if text_part:
                new_content.append({"type": "text", "text": text_part})
            
            # 在文本部分之间添加图片（除了最后一个文本部分之后）
            if i < len(parts) - 1:
                try:
                    image_url = next(image_iter)
                    new_content.append({"type": "image_url", "image_url": {"url": image_url}})
                except StopIteration:
                    # 这个错误理论上不会发生，因为我们已经在开头检查了数量
                    raise ValueError("内部错误：图片迭代器提前耗尽。")

        # 用新生成的内容列表替换旧的内容
        new_msg = {
            "role": msg["role"],
            "content": new_content
        }
        new_conversation.append(new_msg)
        
    return new_conversation


def venusvl_load(model_path, device):
    return model_path, None


def venusvl_inf(
    model,
    processor,
    images,
    messages,
):
    messages = prepare_venus_messages(images,messages)

    domain = "http://v2.open.venus.oa.com"

    header = {
        "Content-Type": "application/json",
    }
    client = HttpClient(
        secret_id=secret_id, secret_key=secret_key, config=Config(read_timeout=500)
    )

    body = {"appGroupId": 3808, "model": model, "messages": messages,}
    ret = client.post(f"{domain}/chat/single", header=header, body=json.dumps(body))
    if ret["code"] != 0:
        raise ValueError(f"Venus API 失败1: {ret['message']} {ret['traceId']}")
    elif ret["data"]["status"] != 2:
        raise ValueError(f"Venus API 失败2: {ret['traceId']} {ret['data']['response']}")
    else:
        return ret["data"]["response"]


if __name__ == "__main__":
    message = [
        {
            "role": "system",
            "content": '说中文',
        },
        {
            "role": "user",
            "content": '这是什么',
        },
    ]
    images=["/group/40048/zcharowang/Data/Raw/data_v1/ads/B_f9058e684ddc05001441152197871986460X60/image_000.jpg","/group/40048/zcharowang/Data/Raw/data_v1/ads/B_f9058e684ddc05001441152197871986460X60/image_001.jpg"]

    print(venusvl_inf("gpt-5.4", None, images,message))
