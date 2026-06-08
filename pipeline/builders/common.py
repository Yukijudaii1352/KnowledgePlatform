"""common.py — 被其他 builder 共用的常量、日志、占位符与领域目录数据。"""

from __future__ import annotations

import re
import sys
from pathlib import Path


# ============ 路径常量 ============

ROOT = Path(__file__).resolve().parents[2]
PIPELINE_DIR = ROOT / "pipeline"
TEMPLATE_HTML = PIPELINE_DIR / "templates" / "page-template.html"
TEMPLATE_LOGIC = PIPELINE_DIR / "templates" / "page-logic.js"

# 首页与二级页扫描目录
INDEX_HTML = ROOT / "index.html"
PAGES_DIR = ROOT / "pages"

# 可编译源文档扫描目录（递归）
CONTENT_DIRS = [
    ROOT / "content",
]

# 示例文档目录：默认不参与站点全量编译，只在显式指定或 --include-examples 时参与
EXAMPLE_CONTENT_DIRS = [
    PIPELINE_DIR / "examples",
]


# ============ 领域白名单 ============
# 一级领域（与首页 index.html 中 domain-card 一一对应）

DOMAIN_MAP = {
    "llm":        {"name": "大语言模型 (LLM)", "dir": "pages/llm"},
    "cv":         {"name": "计算机视觉",      "dir": "pages/cv"},
    "agent":      {"name": "Agent",          "dir": "pages/agent"},
    "multimodal": {"name": "多模态",          "dir": "pages/multimodal"},
    "embodied":   {"name": "具身智能",        "dir": "pages/embodied"},
    "aigc":       {"name": "AIGC",           "dir": "pages/aigc"},
    "infra":      {"name": "AI Infra",       "dir": "pages/infra"},
    "ml":         {"name": "机器学习",        "dir": "pages/ml"},
    "ai4sci":     {"name": "AI4SCI",         "dir": "pages/ai4sci"},
}


# ============ 一级领域目录页的二级标签配置 ============
# 字段：name(显示名)、desc(简介)。已上线信息由 topic-data.js 自动注入，
# 这里 *不再* 硬编码 page/meta 字段。

DOMAIN_CATALOG = {
    "llm": {
        "icon": "💬",
        "desc": "从预训练到对齐、从推理优化到应用范式，系统化梳理大语言模型的关键技术与最新研究进展。",
        "topics": [
            {"name": "语言基础模型",   "desc": "Transformer 架构、GPT/LLaMA 系列、MoE 等基础模型演进。"},
            {"name": "预训练",         "desc": "Scaling Laws、数据工程、训练稳定性与分布式训练。", "match": "llm_pretraining"},
            {"name": "LLM监督微调",    "desc": "指令微调、参数高效微调（LoRA/QLoRA）与多任务 SFT。", "match": "llm_sft"},
            {"name": "人类偏好对齐",   "desc": "RLHF、DPO、Constitutional AI 等对齐方法的原理与实践。", "match": "llm_rlhf"},
            {"name": "LLM强化学习",    "desc": "从 PPO 到 GRPO、DAPO 等算法，系统总结大模型 RL 训练的演化路径。", "match": "llm_rl"},
            {"name": "提示词工程",     "desc": "Prompt 设计、Chain-of-Thought、自洽性与提示优化。", "match": "prompt_engineering"},
            {"name": "RAG",            "desc": "检索增强生成的架构设计、检索策略与评测方法。", "match": "rag"},
            {"name": "LLM安全",        "desc": "越狱攻防、幻觉控制、价值观对齐与内容安全。", "match": "llm_safety"},
            {"name": "LLM评测",        "desc": "通用能力、专业能力、对齐质量与可信度的评测体系。", "match": "llm_evaluation"},
        ],
    },
    "cv": {
        "icon": "👁️",
        "desc": "从目标检测到图像生成，涵盖 2D/3D 视觉理解、视觉基础模型、视频理解等方向。",
        "topics": [
            {"name": "视觉基础模型",       "desc": "ViT、SAM、DINO 等通用视觉表征学习与基础模型。", "match": "visual_model"},
            {"name": "图像分类",           "desc": "从 AlexNet、ResNet 到 ConvNeXt 的分类范式演进。", "match": "image_classification"},
            {"name": "目标检测",           "desc": "Faster R-CNN、YOLO、DETR 等检测框架与最新进展。", "match": "object_detection"},
            {"name": "OCR",                "desc": "文本检测、识别、版面分析与文档理解。", "match": "ocr"},
            {"name": "语义分割",           "desc": "FCN、U-Net、Mask2Former 等分割模型与全景分割。", "match": "semantic_segmentation"},
            {"name": "3D视觉",             "desc": "NeRF、3D Gaussian Splatting、点云理解与三维重建。", "match": "3d_vision"},
            {"name": "视频视觉",           "desc": "视频理解、动作识别、时序建模与视频基础模型。", "match": "video_vision"},
            {"name": "人体视觉",           "desc": "姿态估计、人体 Mesh 重建、动作生成与人脸分析。", "match": "body_vision"},
            {"name": "医学影像",           "desc": "CT/MRI 分析、病理图像识别、医学分割与诊断辅助。", "match": "medical_vision"},
            {"name": "遥感与卫星视觉",     "desc": "遥感图像理解、地物分类、目标变化检测与地球观测。", "match": "remote_sensing"},
        ],
    },
    "agent": {
        "icon": "🧭",
        "desc": "聚焦 Agent 的范式、记忆、工具使用、多智能体协作、强化学习与评测编排等核心问题。",
        "topics": [
            {"name": "范式",        "desc": "从 ReAct 到规划-执行闭环，梳理 Agent 系统的基本范式。"},
            {"name": "Memory",     "desc": "短期记忆、长期记忆、检索式记忆与状态管理机制。"},
            {"name": "Tool Use",   "desc": "函数调用、API 选择、工具链编排与外部环境交互。"},
            {"name": "Multi-Agent","desc": "多智能体协作、角色分工、通信协议与群体决策。"},
            {"name": "Agentic RL", "desc": "面向 Agent 的强化学习、奖励设计、在线反馈与自我改进。"},
            {"name": "Harness",    "desc": "Agent 的评测 harness、任务环境、基准与自动回归框架。"},
        ],
    },
    "multimodal": {
        "icon": "🔗",
        "desc": "视觉-语言模型、跨模态对齐、多模态推理、视频与音频理解等研究方向。",
        "topics": [
            {"name": "视觉-语言基础模型", "desc": "CLIP、BLIP、LLaVA、Qwen-VL 等 VLM 基础模型。", "match": "visual_language_model"},
            {"name": "多模态检索",        "desc": "跨模态对齐、图文检索、向量数据库与 ANN 检索。", "match": "mm_retrieval"},
            {"name": "多模态推理",        "desc": "图像/视频问答、视觉推理、多模态思维链。", "match": "mm_reasoning"},
            {"name": "视频理解",          "desc": "长视频问答、视频摘要、时序定位与 Video-LLM。", "match": "mm_video"},
            {"name": "音频理解",          "desc": "ASR、说话人识别、音频问答与 Audio-LLM。", "match": "mm_sound"},
            {"name": "Omni模型",          "desc": "统一处理文本/图像/视频/音频的全模态模型。", "match": "omni"},
        ],
    },
    "embodied": {
        "icon": "🤖",
        "desc": "机器人学习、Sim2Real、VLA 模型、导航规划与具身推理。",
        "topics": [
            {"name": "视觉-语言-动作基础模型", "desc": "RT-1/RT-2、OpenVLA、π0 等 VLA 基础模型。", "match": "vla"},
            {"name": "具身感知",               "desc": "机器人场景理解、3D 感知与主动感知。"},
            {"name": "具身强化学习",           "desc": "Sim2Real、离线 RL、技能学习与奖励设计。", "match": "embodied_rl"},
            {"name": "世界模型",               "desc": "物理世界建模、时空预测与基于模型的规划。", "match": "world_model"},
            {"name": "灵巧操作",               "desc": "抓取、装配、柔性物体操控与灵巧手控制。"},
            {"name": "导航与移动智能",         "desc": "视觉导航、SLAM、目标导向与长程任务规划。", "match": "navigation"},
            {"name": "运动控制",               "desc": "四足/人形机器人运动控制与全身控制策略。", "match": "motion_control"},
            {"name": "人机交互",               "desc": "自然语言指令跟随、人机协作与示教学习。"},
            {"name": "仿真",                   "desc": "Isaac Sim、MuJoCo、Genesis 等仿真平台与基准。", "match": "simulation"},
        ],
    },
    "aigc": {
        "icon": "🎨",
        "desc": "AI 生成内容：文本、图像、视频、音频、3D 内容生成。",
        "topics": [
            {"name": "生成基础模型", "desc": "Diffusion、Flow Matching、自回归生成等基础方法。", "match": "aigc_base"},
            {"name": "文生图",       "desc": "Stable Diffusion、SDXL、FLUX 等文生图模型演进。", "match": "text2image"},
            {"name": "图像编辑",     "desc": "局部编辑、风格迁移、可控生成与保真度控制。", "match": "text_edit"},
            {"name": "视频生成",     "desc": "Sora、Kling、可灵等视频生成模型与时序一致性。", "match": "video_generation"},
            {"name": "音频生成",     "desc": "TTS、语音克隆、音效生成与高保真音频合成。", "match": "sound_generation"},
            {"name": "音乐生成",     "desc": "旋律、和声、人声与伴奏的端到端音乐创作。", "match": "music_generation"},
            {"name": "3D内容生成",   "desc": "文生 3D、图生 3D、纹理生成与 3D 资产生产。", "match": "3d_generation"},
            {"name": "数字人",       "desc": "数字形象驱动、口型同步、表情合成与全身动作。", "match": "digital_human"},
        ],
    },
    "infra": {
        "icon": "⚙️",
        "desc": "训练框架、推理引擎、分布式系统、MLOps、模型压缩与部署。",
        "topics": [
            {"name": "AI硬件",       "desc": "GPU、NPU、TPU 等加速器架构与硬件生态。", "match": "device"},
            {"name": "AI编译器",     "desc": "XLA、TVM、Triton、MLIR 等深度学习编译技术。", "match": "compiler"},
            {"name": "AI存储系统",   "desc": "大规模训练数据存储、高速缓存与分布式文件系统。", "match": "storage"},
            {"name": "分布式训练",   "desc": "数据并行、张量并行、流水并行与通信优化。", "match": "distributed_training"},
            {"name": "推理加速",     "desc": "KV Cache、投机解码、vLLM/TensorRT-LLM 等推理引擎。", "match": "infer"},
            {"name": "模型压缩",     "desc": "量化、剪枝、蒸馏与稀疏化部署。", "match": "model_compression"},
            {"name": "机器学习平台", "desc": "训练平台、实验管理、MLOps 与全生命周期治理。", "match": "ml_platform"},
        ],
    },
    "ml": {
        "icon": "🧠",
        "desc": "经典机器学习理论、优化方法、统计学习，以及 AutoML、联邦学习等前沿方向。",
        "topics": [
            {"name": "机器学习范式",           "desc": "监督、无监督、半监督、自监督、强化学习等基本范式与方法论。", "match": "ml_paradigm"},
            {"name": "表示学习",               "desc": "从特征工程到深度表示学习，探讨数据的有效表达方式。", "match": "representation_learning"},
            {"name": "概率模型",               "desc": "贝叶斯网络、隐马尔可夫、变分推断等概率建模方法。", "match": "probability_model"},
            {"name": "优化理论",               "desc": "凸优化、非凸优化、随机梯度方法与收敛性分析。", "match": "optimization"},
            {"name": "核方法",                 "desc": "SVM、核回归等核技巧及其在高维空间的应用。", "match": "kernel_method"},
            {"name": "迁移学习",               "desc": "领域自适应、跨任务迁移与预训练范式。", "match": "transfer_learning"},
            {"name": "元学习",                 "desc": "Learning to learn：少样本学习、模型初始化与快速适应。", "match": "meta_learning"},
            {"name": "AutoML",                 "desc": "自动特征工程、超参搜索、神经网络结构搜索（NAS）。", "match": "automl"},
            {"name": "分布式学习",             "desc": "联邦学习、参数服务器、数据/模型并行与通信优化。", "match": "distributed_learning"},
            {"name": "因果学习与不确定性建模", "desc": "因果推断、反事实学习、不确定性量化与可靠预测。", "match": "casual_learning"},
            {"name": "可信机器学习",           "desc": "鲁棒性、公平性、可解释性与隐私保护。", "match": "trustworthy_learning"},
        ],
    },
    "ai4sci": {
        "icon": "🔬",
        "desc": "AI 驱动的科学研究：药学、生命科学、化学、材料、医学、物理与地球科学。",
        "topics": [
            {"name": "科学基础模型", "desc": "面向科学数据的通用基础模型与跨学科统一架构。", "match": "sci_base"},
            {"name": "科学机器学习", "desc": "PINN、神经算子、可微分仿真与科学计算加速。", "match": "ml4sci"},
            {"name": "药学AI",       "desc": "分子生成、虚拟筛选、ADMET 预测与药物设计。", "match": "ai4medicine"},
            {"name": "生命科学AI",   "desc": "AlphaFold、蛋白质设计、基因组学与单细胞分析。", "match": "ai4biology"},
            {"name": "化学AI",       "desc": "反应预测、逆合成分析、催化剂与化学空间探索。", "match": "ai4chem"},
            {"name": "材料学AI",     "desc": "晶体结构预测、性质预测与新材料发现。", "match": "ai4material"},
            {"name": "医学AI",       "desc": "医学影像、临床决策、疾病预测与智能诊疗。"},
            {"name": "物理AI",       "desc": "偏微分方程求解、流体/固体仿真与理论物理发现。", "match": "ai4physics"},
            {"name": "地球科学AI",   "desc": "气象预报、气候建模、遥感地物分析与灾害预测。", "match": "ai4geology"},
            {"name": "科学数据",     "desc": "科学数据集、基准评测与开放科学生态。"},
        ],
    },
}


# ============ 日志 ============

def err(msg: str):
    sys.stderr.write(f"\033[31m[ERROR]\033[0m {msg}\n")
    sys.exit(1)


def warn(msg: str):
    sys.stderr.write(f"\033[33m[WARN]\033[0m {msg}\n")


def ok(msg: str):
    print(f"\033[32m[OK]\033[0m {msg}")


def info(msg: str):
    print(f"\033[36m[INFO]\033[0m {msg}")


# ============ 占位符工具（可重复编译） ============

def apply_placeholder(html: str, key: str, value: str) -> str:
    """同时支持首次替换 {{KEY}} 与二次替换 <span data-ph="KEY">…</span>。"""
    span_pat = r'(<span\s+data-ph="' + re.escape(key) + r'"\s*>)(.*?)(</span>)'
    html, _ = re.subn(
        span_pat,
        lambda m: m.group(1) + value + m.group(3),
        html,
        flags=re.DOTALL,
    )
    curly_pat = r"\{\{" + re.escape(key) + r"\}\}"
    html = re.sub(curly_pat, value, html)
    return html


def today_str() -> str:
    """编译日期（YYYY-MM-DD）。集中在一处便于后续替换时间源。"""
    import datetime
    return datetime.date.today().strftime("%Y-%m-%d")


def is_publish_enabled(value) -> bool:
    """front-matter 中 publish=false 视为不发布；其余值默认发布。"""
    if isinstance(value, str):
        return value.strip().lower() not in {"0", "false", "no", "off"}
    return value is not False
