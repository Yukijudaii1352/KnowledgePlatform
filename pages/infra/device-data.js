/**
 * device-data.js — 由 pipeline/build.py 于 2026-05-26 14:20:23 自动生成。
 * 源文件：content/infra/device.md
 * ⚠️  请勿手动修改；如需更新，修改源文档后重新编译。
 */
window.PAGE_CONFIG = {
  "meta": {
    "domain": "infra",
    "topic_id": "device",
    "topic_name": "AI硬件",
    "page_title": "AI硬件技术演进图谱",
    "page_subtitle": "2026-05-26 版",
    "page_desc": "梳理从通用GPU到专用AI加速器（TPU/NPU）及存算一体、光计算等前沿硬件的发展历程。",
    "page_icon": "⚙️",
    "hero_pills": [
      "🏷️ AI Accelerators · GPU/NPU/TPU · Architecture"
    ],
    "count_pill": "{count} 个算法",
    "image_base": "../../content/infra/device/assets/",
    "overview_from_doc": true,
    "latest_overview_from_doc": true
  },
  "overview": [
    {
      "title": "待补充：阶段性领域总结",
      "body_html": "<p>请补充一篇纵观一段时间以来的总结性文档，建议使用 <code>!INCLUDE_RAW path/to/article.md</code> 引入人工筛选后的 Markdown。</p>"
    }
  ],
  "latest_overview": [
    {
      "title": "待补充：最近一个月最新动向",
      "body_html": "<p>请补充最近一个月该领域最新动向的综述文档，建议使用 <code>!INCLUDE_RAW path/to/article.md</code> 引入人工筛选后的 Markdown。</p>"
    }
  ],
  "graph": {
    "nodes": [
      {
        "id": "cuda",
        "x": 200,
        "y": 80,
        "category": "gpu_architecture"
      },
      {
        "id": "volta_tensor_core",
        "x": 450,
        "y": 80,
        "category": "gpu_architecture"
      },
      {
        "id": "ampere_sparse",
        "x": 600,
        "y": 80,
        "category": "gpu_architecture"
      },
      {
        "id": "hopper_fp8",
        "x": 700,
        "y": 80,
        "category": "gpu_architecture"
      },
      {
        "id": "blackwell_fp4",
        "x": 850,
        "y": 80,
        "category": "gpu_architecture"
      },
      {
        "id": "rubin_gpu",
        "x": 950,
        "y": 80,
        "category": "gpu_architecture"
      },
      {
        "id": "amd_mi400",
        "x": 950,
        "y": 120,
        "category": "gpu_architecture"
      },
      {
        "id": "tpu_v1",
        "x": 450,
        "y": 180,
        "category": "tpu"
      },
      {
        "id": "tpu_v2v3",
        "x": 600,
        "y": 180,
        "category": "tpu"
      },
      {
        "id": "tpu_v4",
        "x": 750,
        "y": 180,
        "category": "tpu"
      },
      {
        "id": "tpu_v7",
        "x": 950,
        "y": 180,
        "category": "tpu"
      },
      {
        "id": "diannao",
        "x": 300,
        "y": 280,
        "category": "npu_asic"
      },
      {
        "id": "dadiannao",
        "x": 300,
        "y": 320,
        "category": "npu_asic"
      },
      {
        "id": "cambricon_isa",
        "x": 380,
        "y": 280,
        "category": "npu_asic"
      },
      {
        "id": "ascend_davinci",
        "x": 650,
        "y": 280,
        "category": "npu_asic"
      },
      {
        "id": "habana_gaudi",
        "x": 600,
        "y": 280,
        "category": "npu_asic"
      },
      {
        "id": "cerebras_wse",
        "x": 800,
        "y": 380,
        "category": "emerging_chips"
      },
      {
        "id": "graphcore_ipu",
        "x": 530,
        "y": 380,
        "category": "emerging_chips"
      },
      {
        "id": "groq_tsp",
        "x": 600,
        "y": 380,
        "category": "emerging_chips"
      },
      {
        "id": "sambanova_rdu",
        "x": 700,
        "y": 380,
        "category": "emerging_chips"
      },
      {
        "id": "prime",
        "x": 380,
        "y": 480,
        "category": "pim_cim"
      },
      {
        "id": "isaac",
        "x": 380,
        "y": 520,
        "category": "pim_cim"
      },
      {
        "id": "rram_cim_survey",
        "x": 650,
        "y": 480,
        "category": "pim_cim"
      },
      {
        "id": "intel_18a_cim",
        "x": 950,
        "y": 480,
        "category": "pim_cim"
      },
      {
        "id": "reram_mlc_cim",
        "x": 950,
        "y": 520,
        "category": "pim_cim"
      },
      {
        "id": "mpu_pim",
        "x": 950,
        "y": 560,
        "category": "pim_cim"
      },
      {
        "id": "systolic_array",
        "x": 100,
        "y": 580,
        "category": "dataflow"
      },
      {
        "id": "eyeriss",
        "x": 380,
        "y": 580,
        "category": "dataflow"
      },
      {
        "id": "eyeriss_v2",
        "x": 530,
        "y": 580,
        "category": "dataflow"
      },
      {
        "id": "sze_dnn_survey",
        "x": 450,
        "y": 580,
        "category": "dataflow"
      },
      {
        "id": "nvlink",
        "x": 380,
        "y": 680,
        "category": "interconnect"
      },
      {
        "id": "cxl",
        "x": 800,
        "y": 680,
        "category": "interconnect"
      },
      {
        "id": "tvm",
        "x": 480,
        "y": 760,
        "category": "hw_sw_codesign"
      },
      {
        "id": "mlir",
        "x": 650,
        "y": 760,
        "category": "hw_sw_codesign"
      },
      {
        "id": "mnasnet",
        "x": 530,
        "y": 760,
        "category": "hw_sw_codesign"
      },
      {
        "id": "hw_nas_bench",
        "x": 650,
        "y": 800,
        "category": "hw_sw_codesign"
      },
      {
        "id": "fuseflow",
        "x": 950,
        "y": 760,
        "category": "hw_sw_codesign"
      },
      {
        "id": "tisa",
        "x": 950,
        "y": 800,
        "category": "hw_sw_codesign"
      },
      {
        "id": "fpga_cnn_survey",
        "x": 450,
        "y": 850,
        "category": "fpga"
      },
      {
        "id": "fpga_svd",
        "x": 380,
        "y": 850,
        "category": "fpga"
      },
      {
        "id": "deep_compression",
        "x": 320,
        "y": 940,
        "category": "efficiency"
      },
      {
        "id": "eie",
        "x": 380,
        "y": 940,
        "category": "efficiency"
      },
      {
        "id": "bnn",
        "x": 380,
        "y": 980,
        "category": "efficiency"
      },
      {
        "id": "ampere_24_sparsity",
        "x": 600,
        "y": 940,
        "category": "efficiency"
      },
      {
        "id": "sageattention3",
        "x": 950,
        "y": 940,
        "category": "efficiency"
      },
      {
        "id": "atropos",
        "x": 950,
        "y": 980,
        "category": "efficiency"
      },
      {
        "id": "fp4_training",
        "x": 950,
        "y": 1020,
        "category": "efficiency"
      },
      {
        "id": "nanophotonic_nn",
        "x": 950,
        "y": 1040,
        "category": "photonic"
      },
      {
        "id": "astra_photonic",
        "x": 950,
        "y": 1080,
        "category": "photonic"
      },
      {
        "id": "lightmatter_passage",
        "x": 950,
        "y": 1120,
        "category": "photonic"
      },
      {
        "id": "rebellions_chiplet",
        "x": 950,
        "y": 1130,
        "category": "chiplet"
      },
      {
        "id": "flare_chiplet",
        "x": 950,
        "y": 1170,
        "category": "chiplet"
      },
      {
        "id": "deepstack_3d",
        "x": 950,
        "y": 1210,
        "category": "chiplet"
      },
      {
        "id": "moentwine",
        "x": 950,
        "y": 1220,
        "category": "llm_inference"
      },
      {
        "id": "diamond_moe",
        "x": 950,
        "y": 1260,
        "category": "llm_inference"
      },
      {
        "id": "bitdecoding",
        "x": 950,
        "y": 1300,
        "category": "llm_inference"
      },
      {
        "id": "nvidia_ising",
        "x": 950,
        "y": 1310,
        "category": "quantum_hybrid"
      }
    ],
    "edges": [
      {
        "from": "cuda",
        "to": "volta_tensor_core",
        "label": "张量核心引入"
      },
      {
        "from": "volta_tensor_core",
        "to": "ampere_sparse",
        "label": "结构化稀疏"
      },
      {
        "from": "ampere_sparse",
        "to": "hopper_fp8",
        "label": "FP8精度适配"
      },
      {
        "from": "hopper_fp8",
        "to": "blackwell_fp4",
        "label": "FP4万亿参数"
      },
      {
        "from": "systolic_array",
        "to": "tpu_v1",
        "label": "商用脉动阵列"
      },
      {
        "from": "systolic_array",
        "to": "eyeriss",
        "label": "RS数据流"
      },
      {
        "from": "tpu_v1",
        "to": "tpu_v2v3",
        "label": "训练架构升级"
      },
      {
        "from": "tpu_v2v3",
        "to": "tpu_v4",
        "label": "光互联扩展"
      },
      {
        "from": "eyeriss",
        "to": "eyeriss_v2",
        "label": "灵活互联"
      },
      {
        "from": "diannao",
        "to": "dadiannao",
        "label": "多核扩展"
      },
      {
        "from": "dadiannao",
        "to": "cambricon_isa",
        "label": "指令集标准化"
      },
      {
        "from": "prime",
        "to": "isaac",
        "label": "流水线架构"
      },
      {
        "from": "isaac",
        "to": "rram_cim_survey",
        "label": "技术综述"
      },
      {
        "from": "deep_compression",
        "to": "eie",
        "label": "压缩专用硬件"
      },
      {
        "from": "tvm",
        "to": "mlir",
        "label": "多层级IR统一"
      },
      {
        "from": "mnasnet",
        "to": "hw_nas_bench",
        "label": "标准化基准"
      },
      {
        "from": "ampere_sparse",
        "to": "ampere_24_sparsity",
        "label": "硬件稀疏原生"
      },
      {
        "from": "blackwell_fp4",
        "to": "rubin_gpu",
        "label": "NVFP4演进"
      },
      {
        "from": "tpu_v4",
        "to": "tpu_v7",
        "label": "双芯粒扩展"
      },
      {
        "from": "rram_cim_survey",
        "to": "intel_18a_cim",
        "label": "数字CIM工业化"
      },
      {
        "from": "rram_cim_survey",
        "to": "reram_mlc_cim",
        "label": "MLC多级存算"
      },
      {
        "from": "isaac",
        "to": "mpu_pim",
        "label": "通用PIM接口"
      },
      {
        "from": "cerebras_wse",
        "to": "moentwine",
        "label": "晶圆级MoE"
      },
      {
        "from": "ampere_24_sparsity",
        "to": "atropos",
        "label": "稀疏处理器"
      },
      {
        "from": "bnn",
        "to": "fp4_training",
        "label": "极低精度训练"
      },
      {
        "from": "tvm",
        "to": "fuseflow",
        "label": "稀疏融合编译"
      },
      {
        "from": "hopper_fp8",
        "to": "sageattention3",
        "label": "FP4注意力"
      },
      {
        "from": "rubin_gpu",
        "to": "nvidia_ising",
        "label": "量子混合加速"
      },
      {
        "from": "intel_18a_cim",
        "to": "flare_chiplet",
        "label": "CIM芯粒融合"
      },
      {
        "from": "rebellions_chiplet",
        "to": "flare_chiplet",
        "label": "异构芯粒"
      },
      {
        "from": "flare_chiplet",
        "to": "deepstack_3d",
        "label": "3D堆叠扩展"
      },
      {
        "from": "moentwine",
        "to": "diamond_moe",
        "label": "边缘MoE下沉"
      },
      {
        "from": "fp4_training",
        "to": "sageattention3",
        "label": "FP4生态互补"
      },
      {
        "from": "lightmatter_passage",
        "to": "tpu_v7",
        "label": "光互连赋能"
      }
    ],
    "milestones": [
      "systolic_array",
      "tpu_v1",
      "volta_tensor_core"
    ]
  },
  "algos": [
    {
      "id": "cuda",
      "num": 1,
      "name": "CUDA",
      "fullName": "统一计算设备架构 (Compute Unified Device Architecture)",
      "year": "2008",
      "org": "NVIDIA",
      "parent": "—",
      "paperUrl": "—",
      "projectUrl": "",
      "category": "gpu_architecture",
      "motivation": "将GPU转变为通用并行计算平台",
      "summary": "CUDA 的核心目标是：将GPU转变为通用并行计算平台。",
      "keyPoints": [
        "核心动机：将GPU转变为通用并行计算平台",
        "代表机构：NVIDIA"
      ],
      "detail": "<p>将GPU转变为通用并行计算平台</p>"
    },
    {
      "id": "volta_tensor_core",
      "num": 2,
      "name": "Volta Tensor Core",
      "fullName": "Volta张量核心架构 (Volta Tensor Core Architecture)",
      "year": "2017",
      "org": "NVIDIA",
      "parent": "cuda",
      "paperUrl": "https://arxiv.org/abs/1803.04432",
      "projectUrl": "",
      "category": "gpu_architecture",
      "motivation": "引入Tensor Core实现硬件级矩阵运算",
      "summary": "Volta Tensor Core 的核心目标是：引入Tensor Core实现硬件级矩阵运算。",
      "keyPoints": [
        "核心动机：引入Tensor Core实现硬件级矩阵运算",
        "演化来源：继承或改进自 cuda",
        "代表机构：NVIDIA"
      ],
      "detail": "<p>引入Tensor Core实现硬件级矩阵运算</p>"
    },
    {
      "id": "ampere_sparse",
      "num": 3,
      "name": "Ampere 2:4 Sparsity",
      "fullName": "安培结构化稀疏架构 (Ampere Structured Sparsity)",
      "year": "2020",
      "org": "NVIDIA",
      "parent": "volta_tensor_core",
      "paperUrl": "https://www.nvidia.com/content/dam/en-zz/Solutions/Data-Center/nvidia-ampere-architecture-whitepaper.pdf",
      "projectUrl": "",
      "category": "gpu_architecture",
      "motivation": "硬件级2:4结构化稀疏与TF32格式",
      "summary": "Ampere 2:4 Sparsity 的核心目标是：硬件级2:4结构化稀疏与TF32格式。",
      "keyPoints": [
        "核心动机：硬件级2:4结构化稀疏与TF32格式",
        "演化来源：继承或改进自 volta_tensor_core",
        "代表机构：NVIDIA"
      ],
      "detail": "<p>硬件级2:4结构化稀疏与TF32格式</p>"
    },
    {
      "id": "hopper_fp8",
      "num": 4,
      "name": "Hopper FP8",
      "fullName": "Hopper FP8变换引擎 (Hopper Transformer Engine)",
      "year": "2022",
      "org": "NVIDIA",
      "parent": "ampere_sparse",
      "paperUrl": "https://www.nvidia.com/en-us/data-center/hopper-architecture/",
      "projectUrl": "",
      "category": "gpu_architecture",
      "motivation": "Transformer Engine支持FP8动态精度",
      "summary": "Hopper FP8 的核心目标是：Transformer Engine支持FP8动态精度。",
      "keyPoints": [
        "核心动机：Transformer Engine支持FP8动态精度",
        "演化来源：继承或改进自 ampere_sparse",
        "代表机构：NVIDIA"
      ],
      "detail": "<p>Transformer Engine支持FP8动态精度</p>"
    },
    {
      "id": "blackwell_fp4",
      "num": 5,
      "name": "Blackwell FP4",
      "fullName": "Blackwell FP4架构 (Blackwell FP4 Architecture)",
      "year": "2025",
      "org": "NVIDIA",
      "parent": "hopper_fp8",
      "paperUrl": "https://arxiv.org/abs/2507.10789",
      "projectUrl": "",
      "category": "gpu_architecture",
      "motivation": "FP4精度与专用解压引擎优化万亿参数模型",
      "summary": "Blackwell FP4 的核心目标是：FP4精度与专用解压引擎优化万亿参数模型。",
      "keyPoints": [
        "核心动机：FP4精度与专用解压引擎优化万亿参数模型",
        "演化来源：继承或改进自 hopper_fp8",
        "代表机构：NVIDIA"
      ],
      "detail": "<p>FP4精度与专用解压引擎优化万亿参数模型</p>"
    },
    {
      "id": "rubin_gpu",
      "num": 6,
      "name": "Rubin GPU",
      "fullName": "NVIDIA Rubin GPU架构 (NVIDIA Rubin GPU Architecture)",
      "year": "2026",
      "org": "NVIDIA",
      "parent": "blackwell_fp4",
      "paperUrl": "https://www.nvidia.com/en-us/about-nvidia/press-releases/2026/nvidia-vera-rubin-platform-agentic-ai/",
      "projectUrl": "",
      "category": "gpu_architecture",
      "motivation": "NVFP4精度50PFLOPS与HBM4推理能效跃升",
      "summary": "NVIDIA Rubin 是继 Blackwell 之后的下一代 GPU 架构，首次搭载 **HBM4** 显存（单 GPU 最高 288 GB、带宽约 8 TB/s）、**NVLink 6**（单 GPU 双向 3.6 TB/s）和增强的 **NVFP4 Tensor Core**（单 GPU FP4 推理算力达约 50 PFLOPS），配合全新 ARM 架构 **Vera CPU** 组成 Vera Rubin 超级芯片平台，面向万亿参数 Agentic AI 与推理能效的代际跃升。",
      "keyPoints": [
        "<strong>HBM4 首发</strong>：Rubin 是业界首款采用 HBM4 的 GPU，单 GPU 配备最高 12 颗 HBM4 堆叠（12-hi），容量达 288 GB，带宽约 8 TB/s，相比 Blackwell 的 HBM3e（192 GB / 8 TB/s）在容量上提升 50%，并引入更宽的 2048-bit 接口",
        "<strong>NVFP4 Tensor Core 增强</strong>：在 Blackwell 引入 FP4 的基础上，Rubin 进一步优化 FP4 数据通路与累加精度，单 GPU FP4 推理算力达约 50 PFLOPS，较 Blackwell B200 的 ~20 PFLOPS FP4 提升约 2.5×",
        "<strong>NVLink 6 互连</strong>：第六代 NVLink，单 GPU 双向带宽 3.6 TB/s（Blackwell NVLink 5 为 1.8 TB/s，提升 2×），支持 72-GPU NVLink 域通过 NVLink Switch 实现全互连",
        "<strong>Vera CPU</strong>：全新 ARM Neoverse V3 架构 CPU（取代 Grace），88 核心，DDR5/LPDDR5X 支持，与 Rubin GPU 通过 NVLink-C2C 芯片间互连组成 Vera Rubin Superchip",
        "<strong>Rubin Ultra</strong>：更高端变体，预计采用双 Rubin GPU die 封装，HBM4 容量翻倍至约 576 GB，面向最大规模训练集群",
        "<strong>DGX Rubin 系统</strong>：单节点 72 颗 Rubin GPU，NVLink 6 全互连，总 FP4 推理算力超 3.6 EFLOPS，总 GPU 显存超 20 TB",
        "<strong>制程与封装</strong>：采用 TSMC 3nm（N3）或更先进制程，CoWoS-L 先进封装技术，die 面积预计超过 800 mm²",
        "<strong>软件生态延续</strong>：完全兼容 CUDA、cuDNN、TensorRT、Triton 推理服务器等现有 NVIDIA 软件栈，支持 NIM 微服务与 Nemo 框架"
      ],
      "detail": "<h5>Vera Rubin 平台架构总览</h5>\n<p>Vera Rubin 平台延续了 NVIDIA \"CPU+GPU Superchip\" 的设计哲学（始于 Grace Hopper），但在每个关键子系统上都实现了代际升级：</p>\n<pre><code>┌─────────────────────────────────────────────────────────┐\n│                   Vera Rubin Superchip                   │\n│                                                         │\n│  ┌──────────────┐   NVLink-C2C    ┌──────────────────┐  │\n│  │   Vera CPU   │◄──────────────►│    Rubin GPU     │  │\n│  │  88× ARM V3  │   900 GB/s     │                  │  │\n│  │  DDR5/LPDDR5X│               │  NVFP4 ~50 PFLOPS│  │\n│  └──────────────┘               │  FP8  ~25 PFLOPS │  │\n│                                  │  FP16 ~12.5 PFLOPS│ │\n│                                  │                  │  │\n│                                  │  ┌──────────────┐│  │\n│                                  │  │  HBM4 288 GB ││  │\n│                                  │  │  ~8 TB/s     ││  │\n│                                  │  └──────────────┘│  │\n│                                  │                  │  │\n│                                  │  NVLink 6       │  │\n│                                  │  3.6 TB/s bidi  │  │\n│                                  └──────────────────┘  │\n│                                                         │\n│  ┌──────────────┐               ┌──────────────────┐  │\n│  │  CX9 SuperNIC│               │ NVLink Switch    │  │\n│  │  800G InfiniBand             │ 72-GPU domain    │  │\n│  └──────────────┘               └──────────────────┘  │\n└─────────────────────────────────────────────────────────┘\n</code></pre>\n<h5>动机与背景</h5>\n<p>随着大语言模型（LLM）规模突破万亿参数、Agentic AI 系统需要实时推理与多轮交互，AI 基础设施面临三大核心挑战：</p>\n<ol>\n<li><strong>显存容量瓶颈</strong>：万亿参数模型（如 GPT-4 级别）即使在 FP4 精度下仍需 ~500 GB 显存，单 GPU 192 GB（Blackwell）不足以容纳完整模型，需要跨 GPU 切分带来通信开销</li>\n<li><strong>推理吞吐需求</strong>：Agentic AI 场景下，单次用户请求可能触发数十次模型调用（工具调用、推理链、验证），要求单 GPU 推理吞吐提升数倍</li>\n<li><strong>互连带宽墙</strong>：模型并行（Tensor Parallel、Expert Parallel）的效率直接受限于 GPU 间互连带宽，NVLink 5 的 1.8 TB/s 在 72-GPU 规模下已成为瓶颈</li>\n</ol>\n<div class=\"key-point\">💡 <strong>关键洞察</strong>：Rubin 的核心设计目标不是单纯提升峰值算力，而是通过 HBM4 容量/带宽、NVLink 6 互连带宽、NVFP4 精度的<strong>三重协同提升</strong>，实现推理场景下的系统级能效跃升——让更大的模型以更低的精度、更少的通信开销运行在更少的 GPU 上。</div>\n<h5>HBM4 显存子系统</h5>\n<p>Rubin 是首款采用 HBM4 标准的 GPU，相比 Blackwell 使用的 HBM3e 有以下关键升级：</p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>参数</th>\n<th>Blackwell B200 (HBM3e)</th>\n<th>Rubin R100 (HBM4)</th>\n<th>提升</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>单堆叠容量</td>\n<td>16 GB (8-hi)</td>\n<td>24 GB (12-hi)</td>\n<td>1.5×</td>\n</tr>\n<tr>\n<td>堆叠数量</td>\n<td>8</td>\n<td>12</td>\n<td>1.5×</td>\n</tr>\n<tr>\n<td>单 GPU 总容量</td>\n<td>192 GB</td>\n<td>288 GB</td>\n<td>1.5×</td>\n</tr>\n<tr>\n<td>接口宽度</td>\n<td>1024-bit/stack</td>\n<td>2048-bit/stack</td>\n<td>2×</td>\n</tr>\n<tr>\n<td>单 GPU 带宽</td>\n<td>~8 TB/s</td>\n<td>~8 TB/s</td>\n<td>~1×</td>\n</tr>\n<tr>\n<td>能效 (pJ/bit)</td>\n<td>~3.9</td>\n<td>~2.5 (预估)</td>\n<td>~1.6×</td>\n</tr>\n</tbody>\n</table></div>\n<p>HBM4 的核心创新在于将逻辑层（Logic Die）从 DRAM 厂商转移到 GPU 厂商定制设计，NVIDIA 可以在逻辑层集成定制的内存控制器、ECC 引擎和预取逻辑，实现更紧密的 GPU-HBM 协同优化。2048-bit 宽接口在保持类似带宽的同时降低了信号速率，从而显著改善能效。</p>\n<h5>NVFP4 Tensor Core 深入</h5>\n<p>NVFP4（4-bit 浮点）格式在 Blackwell 架构中首次引入，Rubin 在此基础上进行了以下增强：</p>\n<p><strong>FP4 数据格式</strong>（E2M1 / E3M0 混合）：</p>\n<pre><code>FP4 E2M1 格式 (主要用于权重):\n┌───┬───┬───┬───┐\n│ S │ E₁│ E₀│ M₀│   S=符号位, E=指数(2bit), M=尾数(1bit)\n└───┴───┴───┴───┘\n可表示: ±{0, 0.5, 1, 1.5, 2, 3, 4, 6}  (含subnormal)\n\nFP4 E3M0 格式 (备选):\n┌───┬───┬───┬───┐\n│ S │ E₂│ E₁│ E₀│   S=符号位, E=指数(3bit), M=无尾数\n└───┴───┴───┴───┘\n可表示: ±{0, 0.015625, ..., 64, 128}  (更大动态范围)\n</code></pre>\n<p><strong>Rubin FP4 Tensor Core 增强</strong>：\n- <strong>累加精度提升</strong>：FP4×FP4 乘法结果在 Tensor Core 内部以 FP32 累加（Blackwell 为 FP16 累加后转 FP32），减少累加误差\n- <strong>Per-block Scaling</strong>：支持更细粒度的 per-128-element 缩放因子（Blackwell 为 per-block），提高量化精度\n- <strong>Tensor Core 数量</strong>：每 SM 的 Tensor Core 数量预计从 Blackwell 的 4 个增至 6 个\n- <strong>SM 数量</strong>：Rubin 预计包含 192+ SM（Blackwell B200 为 160 SM）</p>\n<pre><code class=\"language-python\"># NVFP4 推理计算示意伪代码\n# Rubin Tensor Core FP4 矩阵乘法\n\ndef rubin_fp4_matmul(A_fp4, B_fp4, scale_A, scale_B, block_size=128):\n    &quot;&quot;&quot;\n    A_fp4: 激活值 [M, K], 4-bit 量化, per-block 缩放\n    B_fp4: 权重 [K, N], 4-bit 量化, per-block 缩放\n    scale_A: [M, K//block_size], FP8 缩放因子\n    scale_B: [K//block_size, N], FP8 缩放因子\n    &quot;&quot;&quot;\n    # 在 Tensor Core 内部执行\n    C_fp32 = zeros([M, N], dtype=fp32)  # FP32 累加器\n\n    for k_block in range(K // block_size):\n        k_start = k_block * block_size\n        k_end = k_start + block_size\n\n        # 取出当前 block 的 FP4 数据\n        A_block = A_fp4[:, k_start:k_end]  # [M, 128] in FP4\n        B_block = B_fp4[k_start:k_end, :]  # [128, N] in FP4\n\n        # Tensor Core: FP4 × FP4 → FP32 累加\n        # 硬件内部: 反量化 → FP8 乘法 → FP32 累加\n        partial = tensor_core_fp4_mma(A_block, B_block)  # [M, N] in FP32\n\n        # 应用 per-block 缩放因子\n        scale = outer_product(scale_A[:, k_block], scale_B[k_block, :])\n        C_fp32 += partial * scale\n\n    return C_fp32  # 输出 FP32 或按需转换为 FP8/FP16\n</code></pre>\n<h5>NVLink 6 互连架构</h5>\n<p>NVLink 6 是 Rubin 平台的关键互连技术，实现了带宽的代际跃升：</p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>特性</th>\n<th>NVLink 5 (Blackwell)</th>\n<th>NVLink 6 (Rubin)</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>单链路带宽</td>\n<td>100 GB/s</td>\n<td>200 GB/s</td>\n</tr>\n<tr>\n<td>每 GPU 链路数</td>\n<td>18</td>\n<td>18</td>\n</tr>\n<tr>\n<td>每 GPU 总带宽</td>\n<td>1.8 TB/s bidi</td>\n<td>3.6 TB/s bidi</td>\n</tr>\n<tr>\n<td>NVLink Switch 代</td>\n<td>4th gen</td>\n<td>5th gen</td>\n</tr>\n<tr>\n<td>最大 NVLink 域</td>\n<td>72 GPU</td>\n<td>72 GPU</td>\n</tr>\n<tr>\n<td>信号速率</td>\n<td>112 Gbps/lane (PAM4)</td>\n<td>224 Gbps/lane (PAM4)</td>\n</tr>\n<tr>\n<td>协议特性</td>\n<td>SHARP v3 in-network reduction</td>\n<td>SHARP v4 + 硬件 MoE 路由</td>\n</tr>\n</tbody>\n</table></div>\n<p>NVLink 6 的 3.6 TB/s 双向带宽意味着在 72-GPU NVLink 域内执行 Tensor Parallel 时，All-Reduce 延迟可降低约 2×，直接提升 MoE（Mixture of Experts）模型的 Expert Parallel 效率。新增的<strong>硬件 MoE 路由</strong>功能允许 NVLink Switch 在网络层面直接执行 token-to-expert 的路由与 All-to-All 通信，减少 GPU 端的调度开销。</p>\n<h5>Vera CPU 架构</h5>\n<p>Vera 是 NVIDIA 继 Grace 之后的第二代自研 ARM 服务器 CPU：</p>\n<ul>\n<li><strong>核心架构</strong>：88 个 ARM Neoverse V3 核心（Grace 为 72 个 Neoverse V2）</li>\n<li><strong>内存</strong>：支持 DDR5-6400 和 LPDDR5X，最大容量 512 GB</li>\n<li><strong>NVLink-C2C</strong>：与 Rubin GPU 之间 900 GB/s 一致性互连（Grace Hopper 为 900 GB/s，保持一致）</li>\n<li><strong>PCIe</strong>：PCIe Gen6 x16 通道</li>\n<li><strong>定位</strong>：作为 Rubin GPU 的 host CPU，负责数据预处理、调度、网络协议栈等任务</li>\n</ul>\n<h5>DGX Rubin 系统规格</h5>\n<p>DGX Rubin 是基于 Vera Rubin 平台的旗舰 AI 系统：</p>\n<pre><code>DGX Rubin 系统架构:\n┌─────────────────────────────────────────────┐\n│              DGX Rubin Node                 │\n│                                             │\n│  72× Rubin GPU (NVLink 6 全互连)            │\n│  ├─ 总 FP4 算力: ~3.6 EFLOPS              │\n│  ├─ 总 HBM4 容量: ~20.7 TB                │\n│  └─ GPU 间带宽: 3.6 TB/s per GPU          │\n│                                             │\n│  36× Vera CPU (每 CPU 配 2 GPU)            │\n│  ├─ 总 CPU 核心: 3,168                     │\n│  └─ 总系统内存: ~18 TB DDR5               │\n│                                             │\n│  网络:                                      │\n│  ├─ CX9 SuperNIC: 800G InfiniBand/GPU     │\n│  └─ NVLink Switch: 5th gen, 72-GPU domain │\n│                                             │\n│  功耗: ~120 kW (预估)                      │\n└─────────────────────────────────────────────┘\n</code></pre>\n<h5>架构代际演进对比</h5>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>特性</th>\n<th>Hopper H100 (2022)</th>\n<th>Blackwell B200 (2024)</th>\n<th>Rubin R100 (2026)</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>制程</td>\n<td>TSMC 4N</td>\n<td>TSMC 4NP (双 die)</td>\n<td>TSMC 3N</td>\n</tr>\n<tr>\n<td>Tensor Core 精度</td>\n<td>FP8</td>\n<td>FP4 / FP8</td>\n<td>FP4 增强 / FP8</td>\n</tr>\n<tr>\n<td>FP4 算力</td>\n<td>—</td>\n<td>~20 PFLOPS</td>\n<td>~50 PFLOPS</td>\n</tr>\n<tr>\n<td>FP8 算力</td>\n<td>3.96 PFLOPS</td>\n<td>~10 PFLOPS</td>\n<td>~25 PFLOPS</td>\n</tr>\n<tr>\n<td>FP16 算力</td>\n<td>1.98 PFLOPS</td>\n<td>~5 PFLOPS</td>\n<td>~12.5 PFLOPS</td>\n</tr>\n<tr>\n<td>显存类型</td>\n<td>HBM3</td>\n<td>HBM3e</td>\n<td>HBM4</td>\n</tr>\n<tr>\n<td>显存容量</td>\n<td>80 GB</td>\n<td>192 GB</td>\n<td>288 GB</td>\n</tr>\n<tr>\n<td>显存带宽</td>\n<td>3.35 TB/s</td>\n<td>~8 TB/s</td>\n<td>~8 TB/s</td>\n</tr>\n<tr>\n<td>NVLink 代</td>\n<td>NVLink 4</td>\n<td>NVLink 5</td>\n<td>NVLink 6</td>\n</tr>\n<tr>\n<td>NVLink 带宽/GPU</td>\n<td>900 GB/s</td>\n<td>1.8 TB/s</td>\n<td>3.6 TB/s</td>\n</tr>\n<tr>\n<td>配套 CPU</td>\n<td>— (外部 x86)</td>\n<td>Grace (ARM V2)</td>\n<td>Vera (ARM V3)</td>\n</tr>\n<tr>\n<td>最大 NVLink 域</td>\n<td>8 GPU</td>\n<td>72 GPU</td>\n<td>72 GPU</td>\n</tr>\n<tr>\n<td>TDP (预估)</td>\n<td>700W</td>\n<td>1000W</td>\n<td>1200W+</td>\n</tr>\n</tbody>\n</table></div>\n<h5>对推理工作负载的影响</h5>\n<p>Rubin 架构的设计重心明显向<strong>推理能效</strong>倾斜，体现在以下几个方面：</p>\n<ol>\n<li><strong>FP4 算力密度</strong>：50 PFLOPS FP4 意味着对于一个 405B 参数的 Llama 级模型（FP4 权重约 200 GB），单 GPU 即可容纳完整模型并以极高吞吐执行推理，无需 Tensor Parallel 切分</li>\n<li><strong>HBM4 容量红利</strong>：288 GB 容量使得 MoE 模型（如 Mixtral 8×22B 的 FP4 版本约 88 GB）可以在单 GPU 上加载全部 Expert，消除 Expert Parallel 通信开销</li>\n<li><strong>Batch 推理效率</strong>：更大的 HBM 容量允许更大的 KV Cache，支持更长上下文（128K+ tokens）和更大批次的并发推理</li>\n<li><strong>NVLink 6 对 MoE 的加速</strong>：对于需要跨 GPU 的超大 MoE 模型，NVLink 6 的硬件 MoE 路由可将 All-to-All 通信延迟降低 50%+</li>\n</ol>\n<div class=\"key-point\">💡 <strong>关键洞察</strong>：Rubin 的\"50 PFLOPS FP4\"并非简单的算力数字堆叠——它与 288 GB HBM4 容量形成了<strong>算力-容量平衡点</strong>的代际跃迁：在 FP4 精度下，单 GPU 既有足够容量装下 500B+ 参数模型，又有足够算力以毫秒级延迟完成单次前向推理。这是 Agentic AI（需要快速多轮推理）的硬件基础。</div>\n<h5>与竞品的对比</h5>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>特性</th>\n<th>NVIDIA Rubin R100</th>\n<th>AMD MI400 (预期)</th>\n<th>Intel Falcon Shores</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>显存</td>\n<td>HBM4 288 GB</td>\n<td>HBM3e 256 GB</td>\n<td>HBM3e 128 GB</td>\n</tr>\n<tr>\n<td>互连</td>\n<td>NVLink 6 3.6 TB/s</td>\n<td>Infinity Fabric 4</td>\n<td>Xe Link</td>\n</tr>\n<tr>\n<td>FP4 支持</td>\n<td>原生 NVFP4</td>\n<td>MXFP4 (OCP)</td>\n<td>MXFP4 (OCP)</td>\n</tr>\n<tr>\n<td>软件生态</td>\n<td>CUDA/TensorRT</td>\n<td>ROCm/PyTorch</td>\n<td>oneAPI/OpenVINO</td>\n</tr>\n<tr>\n<td>系统规模</td>\n<td>72-GPU NVLink 域</td>\n<td>8-GPU IF 域</td>\n<td>TBD</td>\n</tr>\n</tbody>\n</table></div>\n<p>NVIDIA 在 NVLink 互连规模（72 GPU 全互连 vs 竞品 8 GPU）和软件生态成熟度上保持显著优势，这是 Rubin 平台在大规模训练和推理部署中的核心壁垒。</p>",
      "quiz": {
        "q": "NVIDIA Rubin GPU 相比 Blackwell 的核心显存升级是什么？",
        "options": [
          "从 HBM2e 升级到 HBM3，带宽提升 2×",
          "从 HBM3e 升级到 HBM4，单 GPU 容量从 192 GB 提升至 288 GB",
          "从 GDDR6X 升级到 HBM3e，首次引入高带宽显存",
          "从 HBM3 升级到 HBM3e，能效提升但容量不变"
        ],
        "answer": 1,
        "explain": "Rubin 是业界首款采用 HBM4 的 GPU，相比 Blackwell 的 HBM3e（192 GB），HBM4 将单 GPU 容量提升至 288 GB（12 颗 12-hi 堆叠），并引入 2048-bit 宽接口以改善能效。这一容量跃升使得单 GPU 可容纳 500B+ 参数的 FP4 模型。"
      }
    },
    {
      "id": "amd_mi400",
      "num": 7,
      "name": "AMD MI400",
      "fullName": "AMD Instinct MI400加速器 (AMD Instinct MI400 Accelerator)",
      "year": "2026",
      "org": "AMD",
      "parent": "—",
      "paperUrl": "https://www.tomshardware.com/pc-components/gpus/amd-data-center-roadmap-2026-2027-mi400-mi500-zen-6-zen-7",
      "projectUrl": "",
      "category": "gpu_architecture",
      "motivation": "CDNA5架构2nm工艺432GB HBM4",
      "summary": "AMD MI400 的核心目标是：CDNA5架构2nm工艺432GB HBM4。",
      "keyPoints": [
        "核心动机：CDNA5架构2nm工艺432GB HBM4",
        "代表机构：AMD"
      ],
      "detail": "<p>CDNA5架构2nm工艺432GB HBM4</p>"
    },
    {
      "id": "tpu_v1",
      "num": 8,
      "name": "TPU v1",
      "fullName": "张量处理单元v1 (Tensor Processing Unit v1)",
      "year": "2017",
      "org": "Google",
      "parent": "—",
      "paperUrl": "https://arxiv.org/abs/1704.04760",
      "projectUrl": "",
      "category": "tpu",
      "motivation": "8位整数脉动阵列实现推理能效比提升15-30倍",
      "summary": "TPU v1 的核心目标是：8位整数脉动阵列实现推理能效比提升15-30倍。",
      "keyPoints": [
        "核心动机：8位整数脉动阵列实现推理能效比提升15-30倍",
        "代表机构：Google"
      ],
      "detail": "<p>8位整数脉动阵列实现推理能效比提升15-30倍</p>"
    },
    {
      "id": "tpu_v2v3",
      "num": 9,
      "name": "TPU v2/v3",
      "fullName": "张量处理单元v2/v3训练版 (TPU v2/v3 for Training)",
      "year": "2020",
      "org": "Google",
      "parent": "tpu_v1",
      "paperUrl": "https://dl.acm.org/doi/10.1145/3360307",
      "projectUrl": "",
      "category": "tpu",
      "motivation": "引入bfloat16格式支持大规模集群训练",
      "summary": "Google 设计了 TPU v2/v3 训练芯片与 Pod 级超级计算机系统——每颗芯片包含 2 个 TensorCore（各含 128×128 bfloat16 脉动阵列 MXU），通过高带宽 ICI 2D 环面互连组成最大 1024 芯片的 Pod（TPU v3 Pod 峰值 >100 PFLOPS），在 ResNet-50、Transformer 等主流训练任务上相比同期 NVIDIA V100 GPU 集群实现 **1.2×–1.9× 性能/瓦特优势**，验证了领域专用架构（DSA）在大规模 DNN 训练中的可行性与优越性。",
      "keyPoints": [
        "<strong>领域专用架构（DSA）理念</strong>：放弃通用处理器的复杂分支预测、乱序执行等机制，将晶体管预算集中在矩阵乘法单元（MXU）上，以 128×128 脉动阵列实现极高的算力密度",
        "<strong>bfloat16 数值格式</strong>：保留 FP32 的 8 位指数（动态范围不变），截断尾数至 7 位，在几乎不影响训练收敛性的前提下将算力翻倍、内存减半",
        "<strong>TensorCore 架构</strong>：每颗 TPU 芯片包含 2 个 TensorCore，每个 TensorCore 含 128×128 MXU（bf16 乘 + fp32 累加）、向量处理单元（VPU）、标量单元和转置/置换单元",
        "<strong>TPU v2</strong>：45 TFLOPS（bf16），16 GB HBM，600 GB/s 内存带宽；<strong>TPU v3</strong>：123 TFLOPS（bf16），32 GB HBM，900 GB/s 内存带宽，液冷散热",
        "<strong>2D 环面互连（ICI）</strong>：芯片间通过 Inter-Core Interconnect 组成 2D 环面拓扑，支持高效的 AllReduce 等集合通信；TPU v2 Pod 256 芯片（11.5 PFLOPS），TPU v3 Pod 1024 芯片（&gt;100 PFLOPS）",
        "<strong>XLA 编译器</strong>：将 TensorFlow 计算图编译为 TPU 指令，自动进行算子融合、内存布局优化和通信调度",
        "<strong>数据并行 + 模型并行</strong>：支持灵活的并行策略，通过 ICI 2D 环面实现高效的梯度同步和激活值通信",
        "<strong>性能对比</strong>：在 6 个代表性 DNN 训练任务上，TPU v3 Pod（1024 芯片）相比等规模 V100 GPU 集群，性能/瓦特优势约 1.2×–1.9×"
      ],
      "detail": "<h5>核心架构图</h5>\n<p><img alt=\"TPU v2/v3 芯片架构\" src=\"../assets/tpu_v2v3_chip_arch.png\" />\n<em>图 1：TPU v2/v3 芯片架构。每颗芯片包含 2 个 TensorCore，各自拥有独立的 128×128 MXU、向量单元、标量单元和 HBM 存储。芯片间通过 ICI（Inter-Core Interconnect）互连。</em></p>\n<p><img alt=\"TPU v2/v3 2D 环面互连拓扑\" src=\"../assets/tpu_v2v3_2d_torus.png\" />\n<em>图 2：TPU Pod 的 2D 环面互连拓扑示意（4×4 简化示例）。实际 TPU v2 Pod 为 16×16=256 芯片，TPU v3 Pod 为 32×32=1024 芯片。每条 ICI 链路提供高带宽、低延迟的芯片间通信。</em></p>\n<p><img alt=\"bfloat16 数值格式对比\" src=\"../assets/tpu_v2v3_bfloat16.png\" />\n<em>图 3：FP32、FP16 与 BF16（Brain Floating Point）的位宽对比。BF16 保留 FP32 的 8 位指数（相同动态范围），仅截断尾数至 7 位，是 TPU 训练的核心数值格式。</em></p>\n<h5>算法伪代码</h5>\n<pre><code class=\"language-python\"># TPU v2/v3 上的分布式 DNN 训练伪代码（数据并行 + AllReduce）\n\n# ========== 系统初始化 ==========\nnum_chips = 1024                    # TPU v3 Pod\ncores_per_chip = 2                  # 每芯片 2 个 TensorCore\ntotal_cores = num_chips * cores_per_chip  # 2048 个 TensorCore\n\n# XLA 编译器将 TensorFlow 计算图编译为 TPU 指令\ncompiled_program = xla_compile(\n    tf_graph,\n    target='tpu_v3',\n    optimizations=['op_fusion', 'layout_assignment', 'memory_planning']\n)\n\n# ========== 数据并行训练主循环 ==========\n# 每个 TensorCore 持有完整模型副本，处理不同数据分片\nfor epoch in range(num_epochs):\n    for global_batch in dataset:\n        # 将全局 batch 分片到所有 core\n        local_batch = global_batch[core_id::total_cores]  # 每 core 一个 micro-batch\n\n        # ---- 前向传播（在单个 TensorCore 上） ----\n        for layer in model.layers:\n            if layer.type == 'matmul' or layer.type == 'conv':\n                # MXU 执行：bf16 输入 × bf16 权重 → fp32 累加\n                # 128×128 脉动阵列，每周期输出 128×128 个 fp32 部分和\n                activations = mxu_matmul_bf16(input_bf16, weight_bf16)  # fp32 output\n                activations = cast_to_bf16(activations)  # 截断回 bf16 存储\n            elif layer.type in ['relu', 'layernorm', 'softmax']:\n                # VPU（向量处理单元）执行非线性/归一化操作\n                activations = vpu_elementwise(activations, op=layer.type)\n\n        loss = compute_loss(activations, labels)\n\n        # ---- 反向传播 ----\n        gradients = backprop(loss, model)  # 同样利用 MXU 做梯度矩阵乘\n\n        # ---- AllReduce 梯度同步（通过 ICI 2D 环面） ----\n        # 2D 环面上的高效 AllReduce：先沿行 reduce-scatter，再沿列 all-gather\n        # ICI 带宽：TPU v3 每链路约 656 Gbps\n        synced_gradients = ici_allreduce_2d_torus(gradients)\n\n        # ---- 权重更新 ----\n        # fp32 master weights 用于精确更新\n        for param, grad in zip(model.parameters(), synced_gradients):\n            param_fp32 -= learning_rate * grad  # fp32 精度更新\n            param_bf16 = cast_to_bf16(param_fp32)  # 前向/反向用 bf16 副本\n\n# ========== MXU 脉动阵列核心操作 ==========\ndef mxu_matmul_bf16(A_bf16, B_bf16):\n    &quot;&quot;&quot;\n    128×128 脉动阵列矩阵乘法\n    - 输入：A[M,K] 和 B[K,N]，均为 bf16\n    - 输出：C[M,N]，fp32\n    - 分块：将大矩阵切分为 128×128 的 tile\n    &quot;&quot;&quot;\n    C_fp32 = zeros(M, N)\n    for m_tile in range(0, M, 128):\n        for n_tile in range(0, N, 128):\n            for k_tile in range(0, K, 128):\n                # 每个 128×128 tile 送入脉动阵列\n                # 数据从左侧和顶部流入，结果在阵列内部累加\n                # 每周期：128×128 = 16384 次 bf16 乘加操作\n                C_fp32[m_tile:m_tile+128, n_tile:n_tile+128] += \\\n                    systolic_128x128(\n                        A_bf16[m_tile:m_tile+128, k_tile:k_tile+128],\n                        B_bf16[k_tile:k_tile+128, n_tile:n_tile+128]\n                    )\n    return C_fp32\n</code></pre>\n<h5>动机与背景</h5>\n<p>2017 年 Google 发布了 TPU v1（推理专用），在数据中心推理任务上展现了领域专用架构（DSA）相比通用 CPU/GPU 的巨大优势。然而 <strong>DNN 训练</strong>比推理面临更大的挑战：</p>\n<ol>\n<li><strong>算力需求呈指数增长</strong>：2012–2018 年间，顶级 AI 模型的训练算力需求每 3.4 个月翻一倍（OpenAI 统计），远超摩尔定律速度。单芯片算力增长无法满足需求，必须构建<strong>超级计算机级别</strong>的训练系统。</li>\n<li><strong>训练需要反向传播</strong>：推理只需前向计算，训练还需反向传播梯度和权重更新，对内存容量和带宽的需求约为推理的 3 倍。</li>\n<li><strong>数值精度要求</strong>：推理可用 INT8 甚至更低精度，训练则需要足够的动态范围以保证梯度不溢出/下溢。</li>\n<li><strong>分布式通信</strong>：大规模训练需要高效的芯片间通信（梯度同步），传统以太网/InfiniBand 的延迟和带宽成为瓶颈。</li>\n</ol>\n<div class=\"key-point\">💡 <strong>核心洞察</strong>：DNN 训练的计算本质是大量矩阵乘法（占 &gt;90% 计算量），且对尾数精度的容忍度远高于科学计算。这使得<strong>用 bfloat16 脉动阵列替代通用 FP64/FP32 计算单元</strong>成为可能，在不影响训练收敛的前提下获得数量级的算力密度和能效提升。</div>\n<h5>bfloat16 数值格式</h5>\n<p>bfloat16（Brain Floating Point 16）是 Google 为 TPU 训练设计的 16 位浮点格式：</p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>格式</th>\n<th>总位宽</th>\n<th>符号位</th>\n<th>指数位</th>\n<th>尾数位</th>\n<th>动态范围</th>\n<th>精度</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>FP32</td>\n<td>32</td>\n<td>1</td>\n<td>8</td>\n<td>23</td>\n<td>±3.4×10³⁸</td>\n<td>~7 位十进制</td>\n</tr>\n<tr>\n<td>FP16</td>\n<td>16</td>\n<td>1</td>\n<td>5</td>\n<td>10</td>\n<td>±6.5×10⁴</td>\n<td>~3 位十进制</td>\n</tr>\n<tr>\n<td><strong>BF16</strong></td>\n<td><strong>16</strong></td>\n<td><strong>1</strong></td>\n<td><strong>8</strong></td>\n<td><strong>7</strong></td>\n<td><strong>±3.4×10³⁸</strong></td>\n<td><strong>~2 位十进制</strong></td>\n</tr>\n</tbody>\n</table></div>\n<p>BF16 的关键设计选择：\n- <strong>保留 FP32 的 8 位指数</strong>：动态范围与 FP32 完全相同，避免了 FP16 训练中常见的梯度溢出/下溢问题（FP16 的 5 位指数仅覆盖 ±6.5×10⁴）\n- <strong>截断尾数至 7 位</strong>：精度损失对 DNN 训练影响极小，因为随机梯度本身就有噪声\n- <strong>FP32 到 BF16 的转换极其简单</strong>：只需截断低 16 位尾数（或加舍入），无需重新编码</p>\n<div class=\"warn-box\">⚠️ <strong>关键设计决策</strong>：TPU 的 MXU 使用 <strong>bf16 输入乘法 + fp32 累加</strong>。即两个 bf16 操作数相乘后，结果在 fp32 精度下累加到输出矩阵中。这确保了矩阵乘法的中间结果不会丢失精度，同时输入/权重的存储和带宽需求减半。</div>\n<h5>TensorCore 微架构</h5>\n<p>每颗 TPU v2/v3 芯片包含 <strong>2 个 TensorCore</strong>，每个 TensorCore 是一个完整的计算核心：</p>\n<p><strong>矩阵乘法单元（MXU）</strong>：\n- 128×128 二维脉动阵列（systolic array）\n- 每周期执行 128×128 = 16,384 次乘加操作\n- bf16 输入乘法，fp32 累加\n- TPU v2 MXU 时钟频率约 700 MHz → 每 MXU 约 22.5 TFLOPS\n- TPU v3 MXU 时钟频率约 940 MHz → 每 MXU 约 30.8 TFLOPS（加上其他优化达 ~61.5 TFLOPS/core）</p>\n<p><strong>脉动阵列工作原理</strong>：数据从阵列的左侧（激活值）和顶部（权重）流入，每个处理单元（PE）执行一次乘加操作后将数据传递给相邻 PE。整个阵列形成一个流水线，一旦填满后每周期输出一行结果。相比 GPU 的 SIMT 架构，脉动阵列的优势在于：\n- <strong>极高的数据复用率</strong>：每个权重被 128 个激活值复用，每个激活值被 128 个权重复用\n- <strong>极低的控制开销</strong>：无需复杂的指令调度，数据流由物理布线决定\n- <strong>高能效</strong>：大部分能量用于计算而非数据搬运</p>\n<p><strong>向量处理单元（VPU）</strong>：\n- 执行逐元素操作：激活函数（ReLU、GELU）、归一化（BatchNorm、LayerNorm）、Softmax、池化等\n- 支持 bf16 和 fp32 运算\n- 带宽与 MXU 输出匹配，确保流水线不被阻塞</p>\n<p><strong>标量单元</strong>：处理控制流、地址计算等标量操作</p>\n<p><strong>转置/置换单元</strong>：支持矩阵转置和数据重排，用于反向传播中的梯度计算（需要权重矩阵的转置）</p>\n<h5>芯片级规格对比</h5>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>指标</th>\n<th>TPU v2</th>\n<th>TPU v3</th>\n<th>NVIDIA V100</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>峰值算力（bf16/fp16）</td>\n<td>45 TFLOPS</td>\n<td>123 TFLOPS</td>\n<td>125 TFLOPS (fp16 Tensor Core)</td>\n</tr>\n<tr>\n<td>峰值算力（fp32）</td>\n<td>22.5 TFLOPS</td>\n<td>61.5 TFLOPS</td>\n<td>15.7 TFLOPS</td>\n</tr>\n<tr>\n<td>HBM 容量</td>\n<td>16 GB</td>\n<td>32 GB</td>\n<td>32 GB (V100-32GB)</td>\n</tr>\n<tr>\n<td>HBM 带宽</td>\n<td>600 GB/s</td>\n<td>900 GB/s</td>\n<td>900 GB/s</td>\n</tr>\n<tr>\n<td>TDP</td>\n<td>~280 W</td>\n<td>~450 W（液冷）</td>\n<td>300 W</td>\n</tr>\n<tr>\n<td>制程</td>\n<td>16nm</td>\n<td>16nm</td>\n<td>12nm</td>\n</tr>\n<tr>\n<td>芯片面积</td>\n<td>~625 mm²</td>\n<td>~648 mm²</td>\n<td>815 mm²</td>\n</tr>\n<tr>\n<td>互连</td>\n<td>ICI (专用)</td>\n<td>ICI (专用)</td>\n<td>NVLink 2.0</td>\n</tr>\n</tbody>\n</table></div>\n<div class=\"key-point\">💡 <strong>关键对比</strong>：虽然 TPU v3 和 V100 的峰值 fp16/bf16 算力相近（~123–125 TFLOPS），但 TPU 的优势在于：(1) ICI 互连在 Pod 规模下的通信效率远高于 InfiniBand；(2) 脉动阵列的实际利用率（通常 &gt;40%）高于 GPU Tensor Core（通常 30%–40%）；(3) XLA 编译器的全图优化减少了内存搬运开销。</div>\n<h5>Pod 级超级计算机系统</h5>\n<p>TPU v2/v3 的核心创新不仅在芯片层面，更在于<strong>将数百到上千颗芯片组成一台超级计算机</strong>：</p>\n<p><strong>2D 环面互连（ICI - Inter-Core Interconnect）</strong>：\n- 每颗 TPU 芯片有 4 个 ICI 端口（上下左右），直接连接到相邻芯片\n- 无需外部交换机——芯片间直接互连，延迟极低（~数百纳秒）\n- TPU v2 Pod：16×16 = 256 芯片，ICI 每链路约 496 Gbps\n- TPU v3 Pod：32×32 = 1024 芯片，ICI 每链路约 656 Gbps\n- 环面拓扑的边缘芯片通过 wrap-around 链路连接到对侧，确保任意两芯片间的最大跳数为 N/2</p>\n<p><strong>Pod 级性能</strong>：</p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>系统</th>\n<th>芯片数</th>\n<th>峰值算力</th>\n<th>总 HBM</th>\n<th>总 HBM 带宽</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>TPU v2 Pod</td>\n<td>256</td>\n<td>11.5 PFLOPS</td>\n<td>4 TB</td>\n<td>153.6 TB/s</td>\n</tr>\n<tr>\n<td>TPU v3 Pod</td>\n<td>1024</td>\n<td>126 PFLOPS</td>\n<td>32 TB</td>\n<td>921.6 TB/s</td>\n</tr>\n</tbody>\n</table></div>\n<p><strong>AllReduce 在 2D 环面上的实现</strong>：\n- 利用环面拓扑的对称性，将 AllReduce 分解为两个维度上的独立操作\n- 沿行方向执行 Reduce-Scatter，沿列方向执行 All-Gather（或反过来）\n- 通信量为 $2 \\cdot \\frac{N-1}{N} \\cdot D$（$N$ 为芯片数，$D$ 为数据量），与最优理论值匹配\n- 由于 ICI 是专用硬件互连（非通用网络），AllReduce 的延迟和带宽远优于基于 InfiniBand 的 GPU 集群</p>\n<h5>软件栈：XLA 编译器</h5>\n<p>XLA（Accelerated Linear Algebra）是 TPU 的核心编译器，负责将 TensorFlow/JAX 计算图编译为 TPU 机器指令：</p>\n<ol>\n<li><strong>算子融合（Op Fusion）</strong>：将多个连续的逐元素操作融合为一个内核，减少 HBM 读写次数。例如 <code>MatMul → BiasAdd → ReLU</code> 融合为单个操作</li>\n<li><strong>内存布局优化（Layout Assignment）</strong>：自动选择最优的数据布局（如 NHWC vs NCHW），使 MXU 的 128×128 tile 对齐</li>\n<li><strong>通信调度</strong>：自动插入 ICI 通信操作，将计算与通信重叠（overlap）</li>\n<li><strong>内存规划</strong>：在有限的 HBM 容量内优化张量的生命周期和复用</li>\n</ol>\n<h5>训练性能评估</h5>\n<p>论文在 6 个代表性 DNN 训练任务上进行了详细评估：</p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>模型</th>\n<th>任务</th>\n<th>TPU v3 Pod (1024 chips)</th>\n<th>等规模 GPU 集群</th>\n<th>TPU 优势</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>ResNet-50</td>\n<td>ImageNet 分类</td>\n<td>~2 min/epoch</td>\n<td>~3 min/epoch</td>\n<td>1.5×</td>\n</tr>\n<tr>\n<td>Transformer (大)</td>\n<td>WMT 翻译</td>\n<td>显著优势</td>\n<td>—</td>\n<td>~1.3×</td>\n</tr>\n<tr>\n<td>SSD</td>\n<td>目标检测</td>\n<td>—</td>\n<td>—</td>\n<td>~1.2×</td>\n</tr>\n<tr>\n<td>Mask R-CNN</td>\n<td>实例分割</td>\n<td>—</td>\n<td>—</td>\n<td>~1.4×</td>\n</tr>\n<tr>\n<td>GNMT</td>\n<td>机器翻译</td>\n<td>—</td>\n<td>—</td>\n<td>~1.3×</td>\n</tr>\n<tr>\n<td>AmoebaNet</td>\n<td>NAS</td>\n<td>—</td>\n<td>—</td>\n<td>~1.9×</td>\n</tr>\n</tbody>\n</table></div>\n<p><strong>关键发现</strong>：\n- <strong>矩阵乘法密集型模型受益最大</strong>：如 AmoebaNet（大量卷积）和 Transformer（大量注意力矩阵乘），TPU 的 MXU 利用率高\n- <strong>通信密集型模型优势更明显</strong>：ICI 2D 环面的通信效率远高于 InfiniBand，在需要频繁 AllReduce 的大规模数据并行中优势显著\n- <strong>小 batch size 模型优势较小</strong>：当 batch size 不足以填满 MXU 的 128×128 tile 时，利用率下降</p>\n<h5>散热与能效</h5>\n<p>TPU v3 的一个重要工程创新是<strong>液冷散热</strong>：\n- TPU v2 使用传统风冷，TDP 约 280W\n- TPU v3 由于算力提升至 123 TFLOPS，TDP 达 ~450W，超出风冷能力\n- 采用直接液冷（direct liquid cooling），冷却液直接流过芯片散热器\n- 液冷使得数据中心的散热效率提升约 30%，PUE（Power Usage Effectiveness）更低</p>\n<h5>与传统方法的对比</h5>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>维度</th>\n<th>TPU v2/v3</th>\n<th>NVIDIA V100 + InfiniBand</th>\n<th>传统 CPU 集群</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>计算单元</td>\n<td>128×128 脉动阵列 (MXU)</td>\n<td>Tensor Core (4×4×4)</td>\n<td>AVX-512 SIMD</td>\n</tr>\n<tr>\n<td>数值格式</td>\n<td>bf16 乘 + fp32 累加</td>\n<td>fp16 乘 + fp32 累加</td>\n<td>fp32/fp64</td>\n</tr>\n<tr>\n<td>芯片间互连</td>\n<td>ICI 2D 环面（专用）</td>\n<td>NVLink + InfiniBand</td>\n<td>以太网/InfiniBand</td>\n</tr>\n<tr>\n<td>编程模型</td>\n<td>XLA (图编译)</td>\n<td>CUDA + NCCL</td>\n<td>MPI + OpenMP</td>\n</tr>\n<tr>\n<td>扩展方式</td>\n<td>Pod（紧耦合）</td>\n<td>集群（松耦合）</td>\n<td>集群</td>\n</tr>\n<tr>\n<td>能效 (TFLOPS/W)</td>\n<td>~0.27 (v3)</td>\n<td>~0.21 (V100)</td>\n<td>~0.01</td>\n</tr>\n<tr>\n<td>最大系统规模</td>\n<td>1024 芯片/Pod</td>\n<td>数千 GPU（需交换机）</td>\n<td>数万节点</td>\n</tr>\n</tbody>\n</table></div>\n<p>TPU 的核心架构优势在于<strong>端到端的领域专用设计</strong>：从数值格式（bf16）、计算单元（脉动阵列）、互连拓扑（2D 环面）到编译器（XLA），每一层都针对 DNN 训练进行了深度优化，而非在通用硬件上叠加加速器。</p>",
      "quiz": {
        "q": "TPU v2/v3 使用的 bfloat16 (bf16) 数值格式与 IEEE FP16 相比，最关键的设计差异是什么？",
        "options": [
          "bf16 的总位宽为 8 位，比 FP16 的 16 位更短",
          "bf16 保留了 FP32 的 8 位指数（相同动态范围），而 FP16 仅有 5 位指数",
          "bf16 使用定点表示而非浮点表示",
          "bf16 的尾数位数比 FP16 更多，精度更高"
        ],
        "answer": 1,
        "explain": "bfloat16 保留了 FP32 的 8 位指数位（动态范围 ±3.4×10³⁸），仅将尾数从 23 位截断至 7 位；而 IEEE FP16 使用 5 位指数（动态范围仅 ±6.5×10⁴）和 10 位尾数。bf16 的设计优先保证动态范围，避免训练中常见的梯度溢出/下溢问题，这是其最关键的设计差异。"
      }
    },
    {
      "id": "tpu_v4",
      "num": 10,
      "name": "TPU v4",
      "fullName": "张量处理单元v4光互联版 (TPU v4 with Optical Interconnect)",
      "year": "2023",
      "org": "Google",
      "parent": "tpu_v2v3",
      "paperUrl": "https://arxiv.org/abs/2304.01433",
      "projectUrl": "",
      "category": "tpu",
      "motivation": "光路交换机实现3D Torus拓扑动态重构",
      "summary": "TPU v4 的核心目标是：光路交换机实现3D Torus拓扑动态重构。",
      "keyPoints": [
        "核心动机：光路交换机实现3D Torus拓扑动态重构",
        "演化来源：继承或改进自 tpu_v2v3",
        "代表机构：Google"
      ],
      "detail": "<p>光路交换机实现3D Torus拓扑动态重构</p>"
    },
    {
      "id": "tpu_v7",
      "num": 11,
      "name": "TPU v7 Ironwood",
      "fullName": "张量处理单元v7铁杉版 (TPU v7 Ironwood)",
      "year": "2026",
      "org": "Google",
      "parent": "tpu_v4",
      "paperUrl": "https://cloud.google.com/tpu/docs/release-notes",
      "projectUrl": "",
      "category": "tpu",
      "motivation": "3nm双芯粒架构42.5 Exaflops集群算力",
      "summary": "TPU v7 Ironwood 的核心目标是：3nm双芯粒架构42.5 Exaflops集群算力。",
      "keyPoints": [
        "核心动机：3nm双芯粒架构42.5 Exaflops集群算力",
        "演化来源：继承或改进自 tpu_v4",
        "代表机构：Google"
      ],
      "detail": "<p>3nm双芯粒架构42.5 Exaflops集群算力</p>"
    },
    {
      "id": "diannao",
      "num": 12,
      "name": "DianNao",
      "fullName": "电脑深度学习加速器 (DianNao Accelerator)",
      "year": "2014",
      "org": "ICT-CAS/Inria",
      "parent": "—",
      "paperUrl": "—",
      "projectUrl": "",
      "category": "npu_asic",
      "motivation": "首个DL专用加速器解决片上访存瓶颈",
      "summary": "DianNao 的核心目标是：首个DL专用加速器解决片上访存瓶颈。",
      "keyPoints": [
        "核心动机：首个DL专用加速器解决片上访存瓶颈",
        "代表机构：ICT-CAS/Inria"
      ],
      "detail": "<p>首个DL专用加速器解决片上访存瓶颈</p>"
    },
    {
      "id": "dadiannao",
      "num": 13,
      "name": "DaDianNao",
      "fullName": "大电脑多核架构 (DaDianNao Multi-chip Architecture)",
      "year": "2014",
      "org": "ICT-CAS/Inria",
      "parent": "diannao",
      "paperUrl": "—",
      "projectUrl": "",
      "category": "npu_asic",
      "motivation": "eDRAM片上存储消除外部DRAM访问压力",
      "summary": "DaDianNao 的核心目标是：eDRAM片上存储消除外部DRAM访问压力。",
      "keyPoints": [
        "核心动机：eDRAM片上存储消除外部DRAM访问压力",
        "演化来源：继承或改进自 diannao",
        "代表机构：ICT-CAS/Inria"
      ],
      "detail": "<p>eDRAM片上存储消除外部DRAM访问压力</p>"
    },
    {
      "id": "cambricon_isa",
      "num": 14,
      "name": "Cambricon ISA",
      "fullName": "寒武纪神经网络指令集 (Cambricon Instruction Set Architecture)",
      "year": "2016",
      "org": "ICT-CAS",
      "parent": "dadiannao",
      "paperUrl": "https://dl.acm.org/doi/abs/10.1145/3007787.3001179",
      "projectUrl": "",
      "category": "npu_asic",
      "motivation": "首个神经网络指令集架构标准化AI芯片编程",
      "summary": "Cambricon ISA 的核心目标是：首个神经网络指令集架构标准化AI芯片编程。",
      "keyPoints": [
        "核心动机：首个神经网络指令集架构标准化AI芯片编程",
        "演化来源：继承或改进自 dadiannao",
        "代表机构：ICT-CAS"
      ],
      "detail": "<p>首个神经网络指令集架构标准化AI芯片编程</p>"
    },
    {
      "id": "ascend_davinci",
      "num": 15,
      "name": "Ascend Da Vinci",
      "fullName": "昇腾达芬奇架构 (Ascend Da Vinci Architecture)",
      "year": "2021",
      "org": "Huawei",
      "parent": "—",
      "paperUrl": "—",
      "projectUrl": "",
      "category": "npu_asic",
      "motivation": "3D Cube计算单元实现端云统一架构覆盖",
      "summary": "Ascend Da Vinci 的核心目标是：3D Cube计算单元实现端云统一架构覆盖。",
      "keyPoints": [
        "核心动机：3D Cube计算单元实现端云统一架构覆盖",
        "代表机构：Huawei"
      ],
      "detail": "<p>3D Cube计算单元实现端云统一架构覆盖</p>"
    },
    {
      "id": "habana_gaudi",
      "num": 16,
      "name": "Habana Gaudi",
      "fullName": "Habana高迪处理器 (Habana Gaudi Processor)",
      "year": "2020",
      "org": "Intel/Habana",
      "parent": "—",
      "paperUrl": "https://ieeexplore.ieee.org/abstract/document/9018203/",
      "projectUrl": "",
      "category": "npu_asic",
      "motivation": "集成10×100GbE以太网支持RDMA横向扩展",
      "summary": "Habana Gaudi 是一款面向深度学习训练的异构加速处理器，其核心创新在于**片上集成 10 个 100GbE RoCE v2 RDMA 端口**（总带宽 2 Tb/s 双向），配合异构计算架构（1 个 MME 矩阵引擎 + 8 个可编程 TPC 张量核心），在无需外部 InfiniBand 交换机的前提下实现高效的多卡/多节点横向扩展训练。",
      "keyPoints": [
        "<strong>异构双引擎架构</strong>：1 个 MME（Matrix Multiplication Engine，脉动阵列）负责 GEMM 运算 + 8 个 TPC（Tensor Processing Core，VLIW SIMD）负责非矩阵张量运算，两类引擎可完全并行",
        "<strong>片上集成以太网</strong>：10×100GbE RoCE v2 端口直接集成在芯片上，提供 2 Tb/s 双向 RDMA 带宽，是区别于 NVIDIA GPU 的核心差异化设计",
        "<strong>HLS-1 系统拓扑</strong>：8 张 Gaudi 卡通过 100GbE 全互联（7 端口卡间 + 3 端口跨服务器），无需外部交换机即可构建训练集群",
        "<strong>TPC 可编程性</strong>：TPC 采用 2048-bit SIMD 向量引擎，支持 TPC-C 编程语言自定义算子内核，覆盖 FP32/BF16/FP16/INT8/INT16/INT32 多种数据类型",
        "<strong>大容量片上存储</strong>：32 GB HBM2 显存（1 TB/s 带宽）+ 24 MB 共享 SRAM，SRAM 作为 MME 与 TPC 之间的高速数据交换缓冲",
        "<strong>SynapseAI 软件栈</strong>：包含图编译器（Graph Compiler）、TPC 编译器、运行时系统，原生支持 PyTorch 和 TensorFlow 框架",
        "<strong>TSMC 7nm 工艺</strong>：采用台积电 7nm FinFET 制程，在功耗和面积效率上具有竞争力"
      ],
      "detail": "<h5>1. 设计动机与背景</h5>\n<p>深度学习训练工作负载对计算和通信能力提出了双重挑战。在计算层面，训练过程中的前向传播和反向传播包含大量矩阵乘法（GEMM）运算，同时也包含激活函数、归一化（Normalization）、损失计算等非矩阵运算。在通信层面，分布式训练（如数据并行）需要在多个加速器之间高频执行 AllReduce 等集合通信操作，梯度同步的带宽和延迟直接影响训练的扩展效率。</p>\n<p>传统方案（如 NVIDIA GPU + InfiniBand）中，计算芯片与网络接口是分离的：GPU 通过 PCIe 连接到主机，再由主机上的 InfiniBand HCA（Host Channel Adapter）或 NVLink/NVSwitch 完成卡间通信。这种架构存在以下问题：</p>\n<ol>\n<li><strong>外部交换机成本高昂</strong>：InfiniBand 交换机价格昂贵，且随着集群规模增长，交换机层级和成本呈超线性增长</li>\n<li><strong>PCIe 瓶颈</strong>：GPU 到网络接口之间需要经过 PCIe 总线，增加了通信延迟</li>\n<li><strong>灵活性受限</strong>：InfiniBand 拓扑相对固定，难以灵活适配不同规模的训练集群</li>\n</ol>\n<p>Habana Labs（2019 年被 Intel 收购）提出了一种根本性的架构创新：<strong>将高速以太网 RDMA 接口直接集成到加速器芯片上</strong>。这一设计使得：\n- 加速器之间可以通过标准以太网直连，无需昂贵的专用交换机\n- 数据从计算引擎到网络端口的路径极短，减少通信延迟\n- 以太网生态成熟、成本低廉，有利于大规模部署</p>\n<p><img alt=\"Gaudi 芯片架构框图\" src=\"assets/gaudi_chip_arch.png\" />\n<em>图 1：Habana Gaudi 芯片架构框图。芯片包含 1 个 MME 矩阵引擎、8 个 TPC 张量处理核心、24 MB 共享 SRAM、32 GB HBM2 以及 10 个 100GbE RoCE v2 网络端口。</em></p>\n<h5>2. 芯片架构详解</h5>\n<p>Gaudi 采用 TSMC 7nm FinFET 工艺制造，芯片内部采用<strong>异构计算架构</strong>，将深度学习训练中的不同运算类型映射到专用的硬件引擎上。</p>\n<h6>2.1 MME（Matrix Multiplication Engine）</h6>\n<p>MME 是 Gaudi 的矩阵运算核心，采用<strong>脉动阵列（Systolic Array）</strong>架构，专门优化大规模矩阵乘法运算。在深度学习训练中，卷积层（通过 im2col 转换为 GEMM）、全连接层、注意力机制中的 <span class=\"kb-math kb-math-inline\">QK^T</span> 和 <span class=\"kb-math kb-math-inline\">AV</span> 运算等均由 MME 处理。</p>\n<p>MME 的关键设计特点包括：</p>\n<ul>\n<li><strong>高吞吐量脉动阵列</strong>：数据在阵列中以流水线方式传播，每个时钟周期完成大量乘累加（MAC）运算</li>\n<li><strong>混合精度支持</strong>：原生支持 BF16（Brain Floating Point 16）和 FP32 运算，BF16 模式下吞吐量翻倍</li>\n<li><strong>自动分块（Tiling）</strong>：MME 编译器自动将大矩阵分解为适合硬件阵列尺寸的小块，最大化硬件利用率</li>\n</ul>\n<div class=\"key-point\">💡 <strong>关键设计理念</strong>：MME 是一个\"固定功能\"引擎——它只做矩阵乘法，但做得极其高效。所有非 GEMM 运算（如激活函数、BatchNorm、损失计算）则交给 TPC 处理。这种分工使得两类引擎可以<strong>流水线并行</strong>执行，MME 计算下一层的矩阵乘法时，TPC 同时处理当前层的后处理运算。</div>\n<h6>2.2 TPC（Tensor Processing Core）</h6>\n<p>TPC 是 Gaudi 架构中最具创新性的组件之一。每颗 Gaudi 芯片包含 <strong>8 个 TPC</strong>，每个 TPC 是一个完全可编程的 VLIW（Very Long Instruction Word）处理器，配备宽向量 SIMD 执行单元。</p>\n<p><img alt=\"TPC 内部架构\" src=\"assets/tpc_architecture.png\" />\n<em>图 2：TPC 内部架构。每个 TPC 包含 VLIW 指令发射单元、2048-bit 向量处理单元（VPU）、标量处理单元（SPU）、本地存储和张量寻址单元。</em></p>\n<p>TPC 的核心规格：</p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>特性</th>\n<th>规格</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>指令架构</td>\n<td>VLIW（4 槽位：LOAD / STORE / VPU / SPU）</td>\n</tr>\n<tr>\n<td>向量宽度</td>\n<td>2048-bit SIMD</td>\n</tr>\n<tr>\n<td>FP32 吞吐</td>\n<td>64 ops/cycle（每 TPC）</td>\n</tr>\n<tr>\n<td>BF16 吞吐</td>\n<td>128 ops/cycle（每 TPC）</td>\n</tr>\n<tr>\n<td>INT8 吞吐</td>\n<td>256 ops/cycle（每 TPC）</td>\n</tr>\n<tr>\n<td>支持数据类型</td>\n<td>FP32, BF16, FP16, INT8, INT16, INT32</td>\n</tr>\n<tr>\n<td>编程模型</td>\n<td>TPC-C（类 C 语言）</td>\n</tr>\n</tbody>\n</table></div>\n<p>TPC 的 <strong>VLIW 4 槽位设计</strong>允许在单个时钟周期内同时发射：\n- 一条 <strong>LOAD</strong> 指令（从 SRAM/HBM 加载数据到本地寄存器）\n- 一条 <strong>STORE</strong> 指令（将结果写回 SRAM/HBM）\n- 一条 <strong>VPU</strong> 指令（2048-bit 向量运算）\n- 一条 <strong>SPU</strong> 指令（标量运算，用于控制流和地址计算）</p>\n<p>这种设计使得 TPC 能够在执行向量计算的同时进行数据搬运，有效隐藏内存访问延迟。</p>\n<p><strong>TPC-C 可编程性</strong>是 Gaudi 相对于竞品的重要差异化特性。开发者可以使用类 C 语言（TPC-C）编写自定义算子内核，编译为 TPC 指令集架构（ISA）后在硬件上执行。这意味着：</p>\n<ul>\n<li>新的激活函数、归一化方法等可以快速实现，无需等待硬件更新</li>\n<li>研究人员可以实验自定义运算，不受固定硬件功能的限制</li>\n<li>软件栈可以持续优化，通过更新 TPC 内核提升已部署硬件的性能</li>\n</ul>\n<pre><code class=\"language-c\">// TPC-C 自定义算子示例：GELU 激活函数\nvoid main(tensor input, tensor output) {\n    int5 index = get_index_space_offset();\n    int5 end = get_index_space_size() + index;\n\n    // 2048-bit SIMD 向量化处理\n    float64 x = v_f32_ld_tnsr(index, input);\n\n    // GELU(x) = 0.5 * x * (1 + tanh(sqrt(2/π) * (x + 0.044715 * x³)))\n    float64 x3 = x * x * x;\n    float64 inner = 0.7978845608f * (x + 0.044715f * x3);\n    float64 result = 0.5f * x * (1.0f + v_f32_tanh(inner));\n\n    v_f32_st_tnsr(index, output, result);\n}\n</code></pre>\n<div class=\"warn-box\">⚠️ <strong>注意</strong>：上述代码为简化示意。实际 TPC-C 编程需要处理张量维度映射、内存对齐、流水线调度等细节，Habana 提供了完整的 TPC SDK 和编程指南。</div>\n<h6>2.3 存储层次</h6>\n<p>Gaudi 的存储层次设计体现了对深度学习训练数据流的深入理解：</p>\n<div class=\"kb-math kb-math-display\">\\text{存储层次}: \\underbrace{\\text{TPC Local Regs}}_{\\text{最快}} \\rightarrow \\underbrace{\\text{Shared SRAM (24 MB)}}_{\\text{片上}} \\rightarrow \\underbrace{\\text{HBM2 (32 GB)}}_{\\text{片外}}</div>\n<ul>\n<li>\n<p><strong>共享 SRAM（24 MB）</strong>：这是 Gaudi 架构的关键设计。24 MB 的片上 SRAM 被 MME 和所有 8 个 TPC 共享，作为高速数据交换缓冲区。MME 将矩阵乘法的中间结果写入 SRAM，TPC 从 SRAM 读取数据执行后处理（如 BatchNorm、ReLU），然后将结果写回 SRAM 供 MME 读取进行下一层计算。这种设计避免了中间结果频繁读写 HBM 的带宽浪费。</p>\n</li>\n<li>\n<p><strong>HBM2（32 GB，1 TB/s）</strong>：用于存储模型权重、激活值、梯度等大容量数据。1 TB/s 的带宽确保了大批量训练时的数据供给能力。</p>\n</li>\n</ul>\n<div class=\"key-point\">💡 <strong>关键洞察</strong>：24 MB SRAM 的设计哲学是\"让数据尽可能留在片上\"。在典型的 ResNet-50 训练中，单层的中间激活值通常在几 MB 量级，可以完全放入 SRAM。这使得 MME→SRAM→TPC→SRAM→MME 的流水线几乎不需要访问 HBM，极大提升了能效比。</div>\n<h5>3. 片上集成网络：核心创新</h5>\n<p>Gaudi 最具颠覆性的设计是<strong>将 10 个 100GbE RoCE v2（RDMA over Converged Ethernet v2）端口直接集成在芯片上</strong>。这是 Gaudi 区别于所有竞品（包括 NVIDIA GPU、Google TPU）的核心差异化特性。</p>\n<h6>3.1 为什么选择以太网而非 InfiniBand？</h6>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>维度</th>\n<th>InfiniBand</th>\n<th>以太网（RoCE v2）</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>生态成熟度</td>\n<td>专用 HPC 生态</td>\n<td>全球最广泛的网络生态</td>\n</tr>\n<tr>\n<td>交换机成本</td>\n<td>极高（专用 ASIC）</td>\n<td>相对低廉（商用交换机）</td>\n</tr>\n<tr>\n<td>运维复杂度</td>\n<td>需要专业 IB 运维团队</td>\n<td>数据中心运维团队可复用</td>\n</tr>\n<tr>\n<td>带宽</td>\n<td>HDR 200 Gb/s</td>\n<td>100 GbE × 10 = 1 Tb/s</td>\n</tr>\n<tr>\n<td>RDMA 支持</td>\n<td>原生 RDMA</td>\n<td>RoCE v2（基于 UDP/IP）</td>\n</tr>\n<tr>\n<td>可扩展性</td>\n<td>需要专用交换机层级</td>\n<td>可利用现有以太网基础设施</td>\n</tr>\n</tbody>\n</table></div>\n<p>Habana 选择以太网的核心逻辑是：<strong>以太网的总体拥有成本（TCO）远低于 InfiniBand</strong>，尤其在大规模集群部署场景下。虽然单端口带宽不如 InfiniBand HDR（200 Gb/s），但 Gaudi 通过集成 10 个端口实现了 <strong>1 Tb/s 单向 / 2 Tb/s 双向</strong>的总带宽，在聚合带宽上具有竞争力。</p>\n<h6>3.2 片上集成的技术优势</h6>\n<p>将网络接口集成在加速器芯片上（而非作为外部 NIC）带来了多重优势：</p>\n<ol>\n<li>\n<p><strong>零拷贝 RDMA</strong>：计算引擎的输出可以直接通过片上网络端口发送到远端加速器，无需经过 PCIe 总线和主机内存，实现真正的零拷贝数据传输</p>\n</li>\n<li>\n<p><strong>极低延迟</strong>：数据从 HBM/SRAM 到网络端口的路径完全在芯片内部，延迟仅为纳秒级，远低于通过 PCIe 到外部 NIC 的微秒级延迟</p>\n</li>\n<li>\n<p><strong>计算-通信重叠</strong>：由于网络端口与计算引擎共享同一芯片，DMA 引擎可以在计算进行的同时异步发送/接收梯度数据，实现高效的计算-通信重叠（overlap）</p>\n</li>\n<li>\n<p><strong>简化系统设计</strong>：无需外部 NIC、无需额外的 PCIe 通道分配，系统板卡设计更简洁</p>\n</li>\n</ol>\n<h6>3.3 HLS-1 系统拓扑</h6>\n<p>Habana 设计了 HLS-1（Habana Labs Server 1）作为 Gaudi 的标准服务器配置，包含 <strong>8 张 Gaudi 加速卡</strong>。</p>\n<p><img alt=\"HLS-1 系统拓扑\" src=\"assets/hls1_topology.png\" />\n<em>图 3：HLS-1 系统拓扑。8 张 Gaudi 卡通过 100GbE 全互联，每卡使用 7 个端口进行卡间通信，剩余 3 个端口用于跨服务器扩展。</em></p>\n<p>每张 Gaudi 卡的 10 个 100GbE 端口分配如下：</p>\n<div class=\"kb-math kb-math-display\">\\underbrace{7 \\text{ ports}}_{\\text{intra-server (全互联)}} + \\underbrace{3 \\text{ ports}}_{\\text{inter-server (跨服务器)}} = 10 \\text{ ports total}</div>\n<ul>\n<li>\n<p><strong>7 个端口用于服务器内全互联</strong>：8 张卡之间形成全连接（full-mesh）拓扑，任意两张卡之间有直连的 100GbE 链路。AllReduce 操作可以在不经过任何交换机的情况下完成，延迟极低。</p>\n</li>\n<li>\n<p><strong>3 个端口用于跨服务器扩展</strong>：每张卡有 3 个端口连接到 ToR（Top-of-Rack）以太网交换机，用于多服务器之间的通信。这 3 个端口提供 300 Gb/s 的跨服务器带宽。</p>\n</li>\n</ul>\n<p>这种拓扑设计的优势在于：\n- 服务器内 AllReduce 完全无交换机，延迟最低\n- 跨服务器通信利用标准以太网交换机，成本可控\n- 8 卡全互联拓扑天然适合 Ring-AllReduce 和 Recursive Halving-Doubling 等集合通信算法</p>\n<h5>4. SynapseAI 软件栈</h5>\n<p>硬件创新需要配套的软件栈才能发挥效能。Habana 开发了 <strong>SynapseAI</strong> 作为 Gaudi 的完整软件栈。</p>\n<p><img alt=\"SynapseAI 软件栈\" src=\"assets/software_stack.png\" />\n<em>图 4：SynapseAI 软件栈层次结构。从上到下依次为框架层、图编译器、MME/TPC 编译器、硬件抽象层和硬件层。</em></p>\n<p>SynapseAI 的核心组件包括：</p>\n<ol>\n<li>\n<p><strong>Graph Compiler（图编译器）</strong>：接收来自 PyTorch 或 TensorFlow 的计算图，执行图级优化（算子融合、内存规划、调度优化），然后将运算分配给 MME 或 TPC</p>\n</li>\n<li>\n<p><strong>MME Compiler</strong>：将 GEMM 运算编译为 MME 指令，自动完成矩阵分块（tiling）、数据布局转换等优化</p>\n</li>\n<li>\n<p><strong>TPC Compiler</strong>：将 TPC-C 内核编译为 TPC ISA 指令，执行向量化、循环展开、寄存器分配等优化</p>\n</li>\n<li>\n<p><strong>Runtime</strong>：管理设备内存、DMA 传输、多流（stream）调度、集合通信等运行时功能</p>\n</li>\n<li>\n<p><strong>框架集成</strong>：通过 Habana PyTorch Bridge 和 TensorFlow Integration 提供对主流框架的透明支持，用户代码只需少量修改即可在 Gaudi 上运行</p>\n</li>\n</ol>\n<pre><code class=\"language-python\"># PyTorch on Gaudi 示例代码\nimport torch\nimport habana_frameworks.torch.core as htcore\n\n# 将模型和数据移动到 Gaudi 设备\ndevice = torch.device(&quot;hpu&quot;)  # Habana Processing Unit\nmodel = model.to(device)\noptimizer = torch.optim.SGD(model.parameters(), lr=0.01)\n\nfor data, target in train_loader:\n    data, target = data.to(device), target.to(device)\n    output = model(data)\n    loss = criterion(output, target)\n    loss.backward()\n    optimizer.step()\n    htcore.mark_step()  # Gaudi 特有：触发图编译和执行\n</code></pre>\n<div class=\"key-point\">💡 <strong>关键</strong>：<code>htcore.mark_step()</code> 是 Gaudi 编程模型的核心概念。Gaudi 采用<strong>延迟执行（lazy execution）</strong>模式——PyTorch 操作被记录为计算图，直到 <code>mark_step()</code> 被调用时才触发图编译和硬件执行。这使得图编译器有机会看到完整的计算图并执行全局优化。</div>\n<h5>5. 对比分析与个人评价</h5>\n<h6>5.1 与 NVIDIA A100 的对比</h6>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>维度</th>\n<th>Habana Gaudi</th>\n<th>NVIDIA A100</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>制程</td>\n<td>TSMC 7nm</td>\n<td>TSMC 7nm</td>\n</tr>\n<tr>\n<td>计算架构</td>\n<td>MME + 8×TPC（异构）</td>\n<td>108 SM（同构 CUDA 核心 + Tensor Core）</td>\n</tr>\n<tr>\n<td>显存</td>\n<td>32 GB HBM2, 1 TB/s</td>\n<td>40/80 GB HBM2e, 1.6/2.0 TB/s</td>\n</tr>\n<tr>\n<td>片上 SRAM</td>\n<td>24 MB 共享</td>\n<td>40 MB L2 Cache</td>\n</tr>\n<tr>\n<td>卡间互联</td>\n<td>10×100GbE RoCE v2（片上）</td>\n<td>NVLink 3.0（600 GB/s）</td>\n</tr>\n<tr>\n<td>跨节点互联</td>\n<td>100GbE（片上集成）</td>\n<td>InfiniBand HDR（外部 NIC）</td>\n</tr>\n<tr>\n<td>编程模型</td>\n<td>SynapseAI + TPC-C</td>\n<td>CUDA + cuDNN</td>\n</tr>\n<tr>\n<td>生态成熟度</td>\n<td>新兴生态</td>\n<td>极度成熟</td>\n</tr>\n</tbody>\n</table></div>\n<p><strong>个人分析</strong>：</p>\n<p>Gaudi 的<strong>片上集成网络</strong>是一个极具前瞻性的设计决策。在大模型训练时代，通信带宽已经成为与计算能力同等重要的瓶颈。NVIDIA 通过 NVLink/NVSwitch 解决了服务器内的互联问题，但跨节点仍依赖外部 InfiniBand 网络。Gaudi 将网络接口内化为芯片的一部分，从架构层面消除了\"计算芯片\"和\"网络芯片\"之间的边界，这一思路在后续的 Gaudi2 和 Gaudi3 中得到了延续和强化。</p>\n<p>然而，Gaudi 的<strong>软件生态</strong>是其最大的短板。CUDA 经过 15 年以上的积累，拥有海量的优化库、开发工具和社区支持。SynapseAI 虽然功能完整，但在算子覆盖率、调试工具成熟度、第三方库支持等方面仍有差距。这也是为什么尽管 Gaudi 在性价比上具有优势，但市场份额仍然有限的主要原因。</p>\n<h6>5.2 与 Google TPU v3 的对比</h6>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>维度</th>\n<th>Habana Gaudi</th>\n<th>Google TPU v3</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>计算核心</td>\n<td>MME + TPC（可编程）</td>\n<td>MXU（脉动阵列，固定功能）</td>\n</tr>\n<tr>\n<td>可编程性</td>\n<td>TPC-C 自定义算子</td>\n<td>XLA 编译器优化（用户不可编程硬件）</td>\n</tr>\n<tr>\n<td>互联</td>\n<td>以太网（开放标准）</td>\n<td>ICI（专用互联，仅限 Google Cloud）</td>\n</tr>\n<tr>\n<td>可用性</td>\n<td>可购买硬件</td>\n<td>仅 Google Cloud 租用</td>\n</tr>\n<tr>\n<td>存储</td>\n<td>32 GB HBM2</td>\n<td>32 GB HBM</td>\n</tr>\n</tbody>\n</table></div>\n<p><strong>个人分析</strong>：</p>\n<p>Gaudi 与 TPU 在架构哲学上有相似之处——都采用了脉动阵列作为矩阵运算核心。但两者在<strong>可编程性</strong>和<strong>开放性</strong>上存在根本差异。TPU 的 MXU 是纯固定功能单元，所有优化依赖 XLA 编译器；而 Gaudi 的 TPC 提供了硬件级的可编程性，允许开发者直接编写自定义算子。这种设计在面对快速演进的深度学习算法时更具灵活性——例如，当新的激活函数（如 SwiGLU）或归一化方法（如 RMSNorm）出现时，TPC 可以快速实现而无需等待硬件迭代。</p>\n<p>在互联方面，TPU 使用 Google 专有的 ICI（Inter-Chip Interconnect）构建 Pod 级别的超大规模互联网络（TPU v3 Pod 包含 1024 个 TPU 核心），但这一能力仅限于 Google Cloud 内部。Gaudi 选择开放的以太网标准，虽然单跳带宽不如 ICI，但<strong>任何数据中心都可以部署</strong>，不受云厂商锁定。</p>\n<h6>5.3 架构创新的深远影响</h6>\n<p>Gaudi 的片上集成网络设计对行业产生了深远影响：</p>\n<ol>\n<li>\n<p><strong>验证了以太网训练的可行性</strong>：在 Gaudi 之前，业界普遍认为 InfiniBand 是大规模训练的唯一选择。Gaudi 证明了基于 RoCE v2 的以太网方案在性能上可以满足训练需求，推动了更多厂商探索以太网训练方案。</p>\n</li>\n<li>\n<p><strong>推动了\"计算-网络融合\"趋势</strong>：Gaudi 的设计理念——将网络接口作为计算芯片的一等公民——影响了后续芯片设计。NVIDIA 在 Grace Hopper 超级芯片中也开始将 NVLink 和网络功能更紧密地集成。</p>\n</li>\n<li>\n<p><strong>降低了 AI 基础设施门槛</strong>：以太网方案的 TCO 优势使得更多组织能够构建自己的训练集群，不再被 InfiniBand 的高成本所限制。</p>\n</li>\n</ol>\n<p>总体而言，Habana Gaudi 是一款<strong>设计理念领先于时代</strong>的处理器。其片上集成网络的创新在 2020 年发布时显得激进，但随着大模型训练对通信带宽需求的爆发式增长，这一设计的前瞻性已经得到充分验证。Gaudi 的主要挑战在于软件生态的追赶——这不是一个技术问题，而是一个时间和投入的问题。</p>",
      "quiz": {
        "q": "Habana Gaudi 芯片上集成了多少个 100GbE RoCE v2 网络端口？在 HLS-1 系统（8卡配置）中，这些端口如何分配？",
        "options": [
          "8 个端口：4 个卡间 + 4 个跨服务器",
          "10 个端口：7 个卡间全互联 + 3 个跨服务器扩展",
          "12 个端口：8 个卡间 + 4 个跨服务器",
          "10 个端口：5 个卡间 + 5 个跨服务器"
        ],
        "answer": 1,
        "explain": "Gaudi 集成 10 个 100GbE 端口，在 HLS-1 的 8 卡配置中，7 个端口用于服务器内 8 卡全互联（full-mesh），3 个端口用于跨服务器扩展通信。"
      }
    },
    {
      "id": "cerebras_wse",
      "num": 17,
      "name": "Cerebras WSE",
      "fullName": "Cerebras晶圆级引擎 (Cerebras Wafer-Scale Engine)",
      "year": "2024",
      "org": "Cerebras",
      "parent": "—",
      "paperUrl": "—",
      "projectUrl": "",
      "category": "emerging_chips",
      "motivation": "整片晶圆单颗芯片85万核消除芯片间通信",
      "summary": "Cerebras WSE 的核心目标是：整片晶圆单颗芯片85万核消除芯片间通信。",
      "keyPoints": [
        "核心动机：整片晶圆单颗芯片85万核消除芯片间通信",
        "代表机构：Cerebras"
      ],
      "detail": "<p>整片晶圆单颗芯片85万核消除芯片间通信</p>"
    },
    {
      "id": "graphcore_ipu",
      "num": 18,
      "name": "Graphcore IPU",
      "fullName": "Graphcore智能处理单元 (Graphcore Intelligence Processing Unit)",
      "year": "2019",
      "org": "Graphcore",
      "parent": "—",
      "paperUrl": "—",
      "projectUrl": "",
      "category": "emerging_chips",
      "motivation": "MIMD架构片上300MB SRAM适合稀疏图计算",
      "summary": "Graphcore IPU 的核心目标是：MIMD架构片上300MB SRAM适合稀疏图计算。",
      "keyPoints": [
        "核心动机：MIMD架构片上300MB SRAM适合稀疏图计算",
        "代表机构：Graphcore"
      ],
      "detail": "<p>MIMD架构片上300MB SRAM适合稀疏图计算</p>"
    },
    {
      "id": "groq_tsp",
      "num": 19,
      "name": "Groq TSP",
      "fullName": "Groq张量流处理器 (Groq Tensor Streaming Processor)",
      "year": "2020",
      "org": "Groq",
      "parent": "—",
      "paperUrl": "https://ieeexplore.ieee.org/abstract/document/9138986/",
      "projectUrl": "",
      "category": "emerging_chips",
      "motivation": "确定性调度取消缓存实现极低延迟推理",
      "summary": "Groq TSP 的核心目标是：确定性调度取消缓存实现极低延迟推理。",
      "keyPoints": [
        "核心动机：确定性调度取消缓存实现极低延迟推理",
        "代表机构：Groq"
      ],
      "detail": "<p>确定性调度取消缓存实现极低延迟推理</p>"
    },
    {
      "id": "sambanova_rdu",
      "num": 20,
      "name": "SambaNova RDU",
      "fullName": "SambaNova可重构数据流单元 (SambaNova Reconfigurable Dataflow Unit)",
      "year": "2022",
      "org": "SambaNova",
      "parent": "—",
      "paperUrl": "—",
      "projectUrl": "",
      "category": "emerging_chips",
      "motivation": "三级存储架构应对万亿参数模型存储墙",
      "summary": "SambaNova RDU 的核心目标是：三级存储架构应对万亿参数模型存储墙。",
      "keyPoints": [
        "核心动机：三级存储架构应对万亿参数模型存储墙",
        "代表机构：SambaNova"
      ],
      "detail": "<p>三级存储架构应对万亿参数模型存储墙</p>"
    },
    {
      "id": "prime",
      "num": 21,
      "name": "PRIME",
      "fullName": "ReRAM存内计算架构 (Processing-in-ReRAM Architecture)",
      "year": "2016",
      "org": "UCSB",
      "parent": "—",
      "paperUrl": "https://dl.acm.org/doi/abs/10.1145/3007787.3001140",
      "projectUrl": "",
      "category": "pim_cim",
      "motivation": "ReRAM交叉阵列实现模拟矩阵乘法",
      "summary": "PRIME 的核心目标是：ReRAM交叉阵列实现模拟矩阵乘法。",
      "keyPoints": [
        "核心动机：ReRAM交叉阵列实现模拟矩阵乘法",
        "代表机构：UCSB"
      ],
      "detail": "<p>ReRAM交叉阵列实现模拟矩阵乘法</p>"
    },
    {
      "id": "isaac",
      "num": 22,
      "name": "ISAAC",
      "fullName": "原位模拟计算加速器 (In-Situ Analog Arithmetic in Crossbars)",
      "year": "2016",
      "org": "Utah/HP Labs",
      "parent": "prime",
      "paperUrl": "https://dl.acm.org/doi/abs/10.1145/3007787.3001139",
      "projectUrl": "",
      "category": "pim_cim",
      "motivation": "完整流水线架构平衡模拟计算与数字控制",
      "summary": "ISAAC 的核心目标是：完整流水线架构平衡模拟计算与数字控制。",
      "keyPoints": [
        "核心动机：完整流水线架构平衡模拟计算与数字控制",
        "演化来源：继承或改进自 prime",
        "代表机构：Utah/HP Labs"
      ],
      "detail": "<p>完整流水线架构平衡模拟计算与数字控制</p>"
    },
    {
      "id": "rram_cim_survey",
      "num": 23,
      "name": "RRAM-CIM Survey",
      "fullName": "RRAM存算一体综述 (RRAM-based CIM Survey)",
      "year": "2021",
      "org": "ASU",
      "parent": "isaac",
      "paperUrl": "—",
      "projectUrl": "",
      "category": "pim_cim",
      "motivation": "系统综述从器件到架构的CIM技术演进",
      "summary": "RRAM-CIM Survey 的核心目标是：系统综述从器件到架构的CIM技术演进。",
      "keyPoints": [
        "核心动机：系统综述从器件到架构的CIM技术演进",
        "演化来源：继承或改进自 isaac",
        "代表机构：ASU"
      ],
      "detail": "<p>系统综述从器件到架构的CIM技术演进</p>"
    },
    {
      "id": "intel_18a_cim",
      "num": 24,
      "name": "Intel 18A CIM",
      "fullName": "Intel 18A数字存内计算加速器 (Intel 18A Digital CIM Accelerator)",
      "year": "2026",
      "org": "Intel",
      "parent": "rram_cim_survey",
      "paperUrl": "https://ieeexplore.ieee.org/abstract/document/11409207/",
      "projectUrl": "",
      "category": "pim_cim",
      "motivation": "18A工艺147TOPS/W数字CIM加速器",
      "summary": "Intel 18A CIM 的核心目标是：18A工艺147TOPS/W数字CIM加速器。",
      "keyPoints": [
        "核心动机：18A工艺147TOPS/W数字CIM加速器",
        "演化来源：继承或改进自 rram_cim_survey",
        "代表机构：Intel"
      ],
      "detail": "<p>18A工艺147TOPS/W数字CIM加速器</p>"
    },
    {
      "id": "reram_mlc_cim",
      "num": 25,
      "name": "ReRAM MLC CIM",
      "fullName": "多级ReRAM存内计算宏 (MLC ReRAM Compute-in-Memory Macro)",
      "year": "2026",
      "org": "ISSCC",
      "parent": "rram_cim_survey",
      "paperUrl": "https://ieeexplore.ieee.org/abstract/document/11409297/",
      "projectUrl": "",
      "category": "pim_cim",
      "motivation": "MLC ReRAM CIM支持多架构推理",
      "summary": "ReRAM MLC CIM 的核心目标是：MLC ReRAM CIM支持多架构推理。",
      "keyPoints": [
        "核心动机：MLC ReRAM CIM支持多架构推理",
        "演化来源：继承或改进自 rram_cim_survey",
        "代表机构：ISSCC"
      ],
      "detail": "<p>MLC ReRAM CIM支持多架构推理</p>"
    },
    {
      "id": "mpu_pim",
      "num": 26,
      "name": "MPU",
      "fullName": "存内处理通用接口 (Memory Processing Unit)",
      "year": "2026",
      "org": "HPCA",
      "parent": "isaac",
      "paperUrl": "https://ieeexplore.ieee.org/abstract/document/11408599/",
      "projectUrl": "",
      "category": "pim_cim",
      "motivation": "通用PIM接口实现端到端存内执行",
      "summary": "MPU 的核心目标是：通用PIM接口实现端到端存内执行。",
      "keyPoints": [
        "核心动机：通用PIM接口实现端到端存内执行",
        "演化来源：继承或改进自 isaac",
        "代表机构：HPCA"
      ],
      "detail": "<p>通用PIM接口实现端到端存内执行</p>"
    },
    {
      "id": "systolic_array",
      "num": 27,
      "name": "Systolic Array",
      "fullName": "脉动阵列 (Systolic Array)",
      "year": "1982",
      "org": "CMU",
      "parent": "—",
      "paperUrl": "https://www.eecs.harvard.edu/~htk/publication/1982-kung-why-systolic-architecture.pdf",
      "projectUrl": "",
      "category": "dataflow",
      "motivation": "数据在处理单元间脉动流转解决I/O瓶颈",
      "summary": "Systolic Array 的核心目标是：数据在处理单元间脉动流转解决I/O瓶颈。",
      "keyPoints": [
        "核心动机：数据在处理单元间脉动流转解决I/O瓶颈",
        "代表机构：CMU"
      ],
      "detail": "<p>数据在处理单元间脉动流转解决I/O瓶颈</p>"
    },
    {
      "id": "eyeriss",
      "num": 28,
      "name": "Eyeriss",
      "fullName": "Eyeriss能效加速器 (Eyeriss Energy-Efficient Accelerator)",
      "year": "2016",
      "org": "MIT",
      "parent": "systolic_array",
      "paperUrl": "https://ieeexplore.ieee.org/abstract/document/7738524/",
      "projectUrl": "",
      "category": "dataflow",
      "motivation": "Row-Stationary数据流最大化局部数据复用",
      "summary": "Eyeriss 的核心目标是：Row-Stationary数据流最大化局部数据复用。",
      "keyPoints": [
        "核心动机：Row-Stationary数据流最大化局部数据复用",
        "演化来源：继承或改进自 systolic_array",
        "代表机构：MIT"
      ],
      "detail": "<p>Row-Stationary数据流最大化局部数据复用</p>"
    },
    {
      "id": "eyeriss_v2",
      "num": 29,
      "name": "Eyeriss v2",
      "fullName": "Eyeriss v2灵活互联架构 (Eyeriss v2 Flexible Architecture)",
      "year": "2019",
      "org": "MIT",
      "parent": "eyeriss",
      "paperUrl": "—",
      "projectUrl": "",
      "category": "dataflow",
      "motivation": "层级化网格互联支持更广泛的网络拓扑",
      "summary": "Eyeriss v2 的核心目标是：层级化网格互联支持更广泛的网络拓扑。",
      "keyPoints": [
        "核心动机：层级化网格互联支持更广泛的网络拓扑",
        "演化来源：继承或改进自 eyeriss",
        "代表机构：MIT"
      ],
      "detail": "<p>层级化网格互联支持更广泛的网络拓扑</p>"
    },
    {
      "id": "sze_dnn_survey",
      "num": 30,
      "name": "DNN硬件综述",
      "fullName": "深度学习硬件加速综述 (Efficient Processing of DNNs Survey)",
      "year": "2017",
      "org": "MIT",
      "parent": "eyeriss",
      "paperUrl": "—",
      "projectUrl": "",
      "category": "dataflow",
      "motivation": "定义数据流分类学权威综述DNN硬件加速",
      "summary": "DNN硬件综述 的核心目标是：定义数据流分类学权威综述DNN硬件加速。",
      "keyPoints": [
        "核心动机：定义数据流分类学权威综述DNN硬件加速",
        "演化来源：继承或改进自 eyeriss",
        "代表机构：MIT"
      ],
      "detail": "<p>定义数据流分类学权威综述DNN硬件加速</p>"
    },
    {
      "id": "nvlink",
      "num": 31,
      "name": "NVLink/NVSwitch",
      "fullName": "NVLink高速互联 (NVLink/NVSwitch Interconnect)",
      "year": "2016",
      "org": "NVIDIA",
      "parent": "—",
      "paperUrl": "—",
      "projectUrl": "",
      "category": "interconnect",
      "motivation": "私有高速协议支持数千GPU统一寻址",
      "summary": "NVLink/NVSwitch 的核心目标是：私有高速协议支持数千GPU统一寻址。",
      "keyPoints": [
        "核心动机：私有高速协议支持数千GPU统一寻址",
        "代表机构：NVIDIA"
      ],
      "detail": "<p>私有高速协议支持数千GPU统一寻址</p>"
    },
    {
      "id": "cxl",
      "num": 32,
      "name": "CXL",
      "fullName": "计算快速链接 (Compute Express Link)",
      "year": "2024",
      "org": "CXL Consortium",
      "parent": "—",
      "paperUrl": "https://dl.acm.org/doi/abs/10.1145/3669900",
      "projectUrl": "",
      "category": "interconnect",
      "motivation": "基于PCIe 5.0的缓存一致性开放互联标准",
      "summary": "CXL 的核心目标是：基于PCIe 5.0的缓存一致性开放互联标准。",
      "keyPoints": [
        "核心动机：基于PCIe 5.0的缓存一致性开放互联标准",
        "代表机构：CXL Consortium"
      ],
      "detail": "<p>基于PCIe 5.0的缓存一致性开放互联标准</p>"
    },
    {
      "id": "tvm",
      "num": 33,
      "name": "TVM",
      "fullName": "张量虚拟机 (Tensor Virtual Machine)",
      "year": "2018",
      "org": "UW/AWS",
      "parent": "—",
      "paperUrl": "https://www.usenix.org/conference/osdi18/presentation/chen",
      "projectUrl": "",
      "category": "hw_sw_codesign",
      "motivation": "自动调优编译器高效部署模型到多种硬件",
      "summary": "TVM 的核心目标是：自动调优编译器高效部署模型到多种硬件。",
      "keyPoints": [
        "核心动机：自动调优编译器高效部署模型到多种硬件",
        "代表机构：UW/AWS"
      ],
      "detail": "<p>自动调优编译器高效部署模型到多种硬件</p>"
    },
    {
      "id": "mlir",
      "num": 34,
      "name": "MLIR",
      "fullName": "多层级中间表示 (Multi-Level Intermediate Representation)",
      "year": "2021",
      "org": "Google",
      "parent": "tvm",
      "paperUrl": "—",
      "projectUrl": "",
      "category": "hw_sw_codesign",
      "motivation": "统一多层级IR框架成为现代AI编译器基础",
      "summary": "MLIR 的核心目标是：统一多层级IR框架成为现代AI编译器基础。",
      "keyPoints": [
        "核心动机：统一多层级IR框架成为现代AI编译器基础",
        "演化来源：继承或改进自 tvm",
        "代表机构：Google"
      ],
      "detail": "<p>统一多层级IR框架成为现代AI编译器基础</p>"
    },
    {
      "id": "mnasnet",
      "num": 35,
      "name": "MnasNet",
      "fullName": "移动端硬件感知NAS (Mobile Neural Architecture Search)",
      "year": "2019",
      "org": "Google",
      "parent": "—",
      "paperUrl": "http://openaccess.thecvf.com/content_CVPR_2019/html/Tan_MnasNet_Platform-Aware_Neural_Architecture_Search_for_Mobile_CVPR_2019_paper.html",
      "projectUrl": "",
      "category": "hw_sw_codesign",
      "motivation": "将硬件延迟纳入NAS搜索目标",
      "summary": "MnasNet 的核心目标是：将硬件延迟纳入NAS搜索目标。",
      "keyPoints": [
        "核心动机：将硬件延迟纳入NAS搜索目标",
        "代表机构：Google"
      ],
      "detail": "<p>将硬件延迟纳入NAS搜索目标</p>"
    },
    {
      "id": "hw_nas_bench",
      "num": 36,
      "name": "HW-NAS-Bench",
      "fullName": "硬件感知NAS基准 (Hardware-Aware NAS Benchmark)",
      "year": "2021",
      "org": "—",
      "parent": "mnasnet",
      "paperUrl": "—",
      "projectUrl": "",
      "category": "hw_sw_codesign",
      "motivation": "首个硬件感知NAS基准推动标准化评测",
      "summary": "HW-NAS-Bench 的核心目标是：首个硬件感知NAS基准推动标准化评测。",
      "keyPoints": [
        "核心动机：首个硬件感知NAS基准推动标准化评测",
        "演化来源：继承或改进自 mnasnet",
        "代表机构：—"
      ],
      "detail": "<p>首个硬件感知NAS基准推动标准化评测</p>"
    },
    {
      "id": "fuseflow",
      "num": 37,
      "name": "FuseFlow",
      "fullName": "融合中心稀疏编译框架 (FuseFlow Fusion-Centric Compilation)",
      "year": "2026",
      "org": "Stanford/SambaNova",
      "parent": "tvm",
      "paperUrl": "https://asplos-conference.org/asplos2026/program/",
      "projectUrl": "",
      "category": "hw_sw_codesign",
      "motivation": "以融合为中心的稀疏深度学习编译框架",
      "summary": "FuseFlow 的核心目标是：以融合为中心的稀疏深度学习编译框架。",
      "keyPoints": [
        "核心动机：以融合为中心的稀疏深度学习编译框架",
        "演化来源：继承或改进自 tvm",
        "代表机构：Stanford/SambaNova"
      ],
      "detail": "<p>以融合为中心的稀疏深度学习编译框架</p>"
    },
    {
      "id": "tisa",
      "num": 38,
      "name": "TISA",
      "fullName": "三合一动态调度架构 (TISA Tri-in-One Dynamic Scheduling)",
      "year": "2026",
      "org": "ISCA",
      "parent": "—",
      "paperUrl": "https://www.eeworld.com.cn/mp/yixingzhineng/a114343.jspx",
      "projectUrl": "",
      "category": "hw_sw_codesign",
      "motivation": "硬件调度器实时优化算力三合一动态分配",
      "summary": "TISA 的核心目标是：硬件调度器实时优化算力三合一动态分配。",
      "keyPoints": [
        "核心动机：硬件调度器实时优化算力三合一动态分配",
        "代表机构：ISCA"
      ],
      "detail": "<p>硬件调度器实时优化算力三合一动态分配</p>"
    },
    {
      "id": "fpga_cnn_survey",
      "num": 39,
      "name": "FPGA-CNN综述",
      "fullName": "FPGA加速CNN综述 (FPGA-based CNN Acceleration Survey)",
      "year": "2017",
      "org": "NUDT",
      "parent": "—",
      "paperUrl": "—",
      "projectUrl": "",
      "category": "fpga",
      "motivation": "系统总结FPGA在CNN加速中的关键优化技术",
      "summary": "FPGA-CNN综述 的核心目标是：系统总结FPGA在CNN加速中的关键优化技术。",
      "keyPoints": [
        "核心动机：系统总结FPGA在CNN加速中的关键优化技术",
        "代表机构：NUDT"
      ],
      "detail": "<p>系统总结FPGA在CNN加速中的关键优化技术</p>"
    },
    {
      "id": "fpga_svd",
      "num": 40,
      "name": "SVD-FPGA",
      "fullName": "SVD压缩FPGA加速 (SVD-based FPGA Acceleration)",
      "year": "2016",
      "org": "Tsinghua",
      "parent": "—",
      "paperUrl": "—",
      "projectUrl": "",
      "category": "fpga",
      "motivation": "基于SVD压缩的FPGA定制化量化推理",
      "summary": "SVD-FPGA 的核心目标是：基于SVD压缩的FPGA定制化量化推理。",
      "keyPoints": [
        "核心动机：基于SVD压缩的FPGA定制化量化推理",
        "代表机构：Tsinghua"
      ],
      "detail": "<p>基于SVD压缩的FPGA定制化量化推理</p>"
    },
    {
      "id": "deep_compression",
      "num": 41,
      "name": "Deep Compression",
      "fullName": "深度压缩 (Deep Compression)",
      "year": "2015",
      "org": "Stanford",
      "parent": "—",
      "paperUrl": "https://arxiv.org/abs/1510.00149",
      "projectUrl": "",
      "category": "efficiency",
      "motivation": "剪枝量化Huffman编码实现模型50倍压缩",
      "summary": "Deep Compression 提出了一个三阶段压缩流水线——**剪枝、训练式量化与 Huffman 编码**——将深度神经网络存储需求压缩 35×–49×（如 AlexNet 从 240 MB 压至 6.9 MB），且不损失精度，使模型可完全放入片上 SRAM 而无需访问高能耗的 DRAM。",
      "keyPoints": [
        "<strong>三阶段压缩流水线</strong>：Pruning → Trained Quantization → Huffman Coding，三者正交互不干扰，可叠加获得极高压缩率",
        "<strong>网络剪枝</strong>：移除权重绝对值低于阈值的连接，AlexNet 参数量减少 9×，VGG-16 减少 13×；使用 CSR/CSC 稀疏格式存储，索引差分编码（conv 层 8 bit，fc 层 5 bit）",
        "<strong>训练式量化与权重共享</strong>：对每层权重做 k-means 聚类，同簇连接共享一个质心权重；CONV 层 256 簇（8 bit 索引），FC 层 32 簇（5 bit 索引）；训练时按簇聚合梯度更新质心",
        "<strong>质心初始化策略</strong>：比较了 Forgy（随机）、密度优先、线性三种初始化，线性初始化效果最优，因其对大权重覆盖更均匀",
        "<strong>Huffman 编码</strong>：利用量化权重和稀疏索引的非均匀分布，进一步节省 20%–30% 存储",
        "<strong>压缩效果</strong>：AlexNet 35×（240 MB → 6.9 MB），VGG-16 49×（552 MB → 11.3 MB），均无精度损失",
        "<strong>硬件友好</strong>：压缩后模型可放入片上 SRAM，避免 DRAM 访问；在 CPU/GPU/移动 GPU 上获得 3×–4× 加速和 3×–7× 能效提升"
      ],
      "detail": "<h5>核心框架图</h5>\n<p><img alt=\"Deep Compression 三阶段压缩流水线\" src=\"https://ar5iv.labs.arxiv.org/html/1510.00149/assets/x1.png\" />\n<em>图 1：Deep Compression 的三阶段压缩流水线：剪枝将连接数减少 10×，量化进一步压缩至 27×–31×，Huffman 编码最终达到 35×–49×。压缩率已包含稀疏表示的元数据开销。</em></p>\n<p><img alt=\"权重共享与质心微调示意\" src=\"https://ar5iv.labs.arxiv.org/html/1510.00149/assets/x3.png\" />\n<em>图 3：权重共享示意（上）与质心微调过程（下）。同色权重共享同一质心值，反向传播时按簇聚合梯度更新质心。</em></p>\n<h5>算法伪代码</h5>\n<pre><code class=\"language-python\"># Deep Compression 三阶段压缩流水线伪代码\n\n# ========== 阶段 1：剪枝 ==========\nmodel = train_network(data)                    # 正常训练至收敛\nfor layer in model.layers:\n    threshold = compute_threshold(layer.weights)  # 基于权重分布确定阈值\n    mask = abs(layer.weights) &gt; threshold          # 保留大权重\n    layer.weights *= mask                          # 置零小权重\nmodel = retrain_network(model, data, masks)    # 仅更新保留的连接\n# 用 CSR/CSC 格式存储稀疏权重，索引用差分编码\n\n# ========== 阶段 2：训练式量化 ==========\nfor layer in model.layers:\n    k = 256 if layer.is_conv else 32           # CONV 8-bit, FC 5-bit\n    centroids, indices = kmeans(layer.weights[mask], k)  # k-means 聚类\n    layer.codebook = centroids                 # 存储码本\n    layer.indices = indices                    # 存储索引\n# 微调：按簇聚合梯度更新质心\nfor epoch in range(finetune_epochs):\n    for batch in data:\n        grads = compute_gradients(model, batch)\n        for layer in model.layers:\n            for c_k in range(len(layer.codebook)):\n                # 聚合属于第 k 簇的所有梯度\n                grad_sum = sum(grads[i,j] for i,j if indices[i,j] == c_k)\n                layer.codebook[c_k] -= lr * grad_sum\n\n# ========== 阶段 3：Huffman 编码（离线，无需训练） ==========\nfor layer in model.layers:\n    layer.encoded_weights = huffman_encode(layer.codebook)\n    layer.encoded_indices = huffman_encode(layer.indices)\n</code></pre>\n<h5>动机与背景</h5>\n<p>深度神经网络虽然在计算机视觉等任务上取得了最先进的性能，但其巨大的参数量（AlexNet 约 240 MB，VGG-16 约 552 MB）严重阻碍了在移动端和嵌入式设备上的部署。核心瓶颈有两个：</p>\n<ol>\n<li><strong>存储限制</strong>：移动应用商店对包体大小敏感（如 iOS App Store 限制 100 MB 以上需 Wi-Fi 下载），数百 MB 的模型无法直接嵌入 App。</li>\n<li><strong>能耗瓶颈</strong>：在 45nm CMOS 工艺下，一次 32-bit DRAM 访问消耗 640 pJ，是 32-bit SRAM 访问（5 pJ）的 128 倍，是一次浮点加法（0.9 pJ）的 700 倍。大模型无法放入片上 SRAM，必须频繁访问 DRAM，导致能耗远超移动设备的功率预算。</li>\n</ol>\n<div class=\"key-point\">💡 <strong>关键洞察</strong>：如果能将模型压缩到足够小（几 MB），就可以完全放入片上 SRAM 缓存，从根本上消除 DRAM 访问的能耗瓶颈。</div>\n<h5>阶段 1：网络剪枝</h5>\n<p>剪枝的核心思想是<strong>移除冗余连接</strong>，只保留对网络输出贡献最大的权重。具体流程：</p>\n<ol>\n<li>正常训练网络至收敛</li>\n<li>将权重绝对值低于阈值的连接移除（置零）</li>\n<li>对剩余稀疏网络重新训练（retrain），微调保留连接的权重</li>\n</ol>\n<p>剪枝后，AlexNet 的连接数减少 9×，VGG-16 减少 13×。</p>\n<p><strong>稀疏存储格式</strong>：剪枝后的稀疏权重矩阵使用 CSR（Compressed Sparse Row）或 CSC（Compressed Sparse Column）格式存储，需要 <span class=\"kb-math kb-math-inline\">2a + n + 1</span> 个数（<span class=\"kb-math kb-math-inline\">a</span> 为非零元素数，<span class=\"kb-math kb-math-inline\">n</span> 为行/列数）。为进一步压缩索引，采用<strong>相对索引</strong>（存储索引差值而非绝对位置），conv 层用 8 bit、fc 层用 5 bit 编码。当差值超出编码范围时，插入填充零（filler zero）来处理溢出。</p>\n<p><img alt=\"稀疏索引的相对编码与填充零\" src=\"https://ar5iv.labs.arxiv.org/html/1510.00149/assets/x2.png\" />\n<em>图 2：用相对索引表示矩阵稀疏性，当索引差超出范围时填充零防止溢出。</em></p>\n<h5>阶段 2：训练式量化与权重共享</h5>\n<p>量化阶段的目标是<strong>减少表示每个权重所需的比特数</strong>。核心方法是让多个连接共享同一权重值：</p>\n<ol>\n<li><strong>k-means 聚类</strong>：对每层已剪枝的权重做一维 k-means 聚类，将 <span class=\"kb-math kb-math-inline\">n</span> 个原始权重 <span class=\"kb-math kb-math-inline\">W = \\{w_1, w_2, \\ldots, w_n\\}</span> 划分为 <span class=\"kb-math kb-math-inline\">k</span> 个簇 <span class=\"kb-math kb-math-inline\">C = \\{c_1, c_2, \\ldots, c_k\\}</span>，最小化簇内平方和：</li>\n</ol>\n<div class=\"kb-math kb-math-display\">\\underset{C}{\\arg\\min} \\sum_{i=1}^{k} \\sum_{w \\in c_i} |w - c_i|^2</div>\n<ol>\n<li><strong>存储方式</strong>：每个连接只需存储一个 <span class=\"kb-math kb-math-inline\">\\log_2(k)</span> bit 的索引指向码本中的共享权重。压缩率公式为：</li>\n</ol>\n<div class=\"kb-math kb-math-display\">r = \\frac{n \\cdot b}{n \\cdot \\log_2(k) + k \\cdot b}</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">n</span> 为连接数，<span class=\"kb-math kb-math-inline\">b</span> 为原始比特数（32），<span class=\"kb-math kb-math-inline\">k</span> 为簇数。</p>\n<ol>\n<li><strong>质心微调</strong>：聚类后，通过反向传播微调质心。每个质心的梯度是所有属于该簇的权重梯度之和：</li>\n</ol>\n<div class=\"kb-math kb-math-display\">\\frac{\\partial \\mathcal{L}}{\\partial C_k} = \\sum_{i,j} \\frac{\\partial \\mathcal{L}}{\\partial W_{ij}} \\cdot \\mathbb{1}(I_{ij} = k)</div>\n<div class=\"warn-box\">⚠️ <strong>注意</strong>：权重共享不跨层进行——每层独立聚类，拥有自己的码本。</div>\n<p><strong>质心初始化的影响</strong>：</p>\n<p><img alt=\"质心初始化方法对比\" src=\"https://ar5iv.labs.arxiv.org/html/1510.00149/assets/x4.png\" />\n<em>图 4：三种质心初始化方法对比（左）及权重分布与码本微调前后的变化（右）。</em></p>\n<ul>\n<li><strong>Forgy（随机）初始化</strong>：从数据中随机选取 k 个观测值作为初始质心，倾向于集中在双峰分布的峰值附近</li>\n<li><strong>密度优先初始化</strong>：在权重 CDF 的 y 轴上等距采样，质心在峰值处更密集</li>\n<li><strong>线性初始化</strong>：在权重的 <span class=\"kb-math kb-math-inline\">[\\min, \\max]</span> 之间等距分布质心，对分布不敏感</li>\n</ul>\n<div class=\"key-point\">💡 <strong>关键发现</strong>：线性初始化效果最优。原因是大权重虽然数量少但对网络输出影响大，Forgy 和密度优先方法在大权重区域分配的质心过少，导致表示精度不足。</div>\n<p>实验中，CONV 层使用 8 bit（256 个共享权重），FC 层使用 5 bit（32 个共享权重），在不损失精度的前提下实现了高效量化。</p>\n<h5>阶段 3：Huffman 编码</h5>\n<p><img alt=\"量化权重和稀疏索引的分布\" src=\"https://ar5iv.labs.arxiv.org/html/1510.00149/assets/x6.png\" />\n<em>图 5：量化权重（左）和稀疏索引（右）的分布均呈现明显偏斜，适合 Huffman 编码。</em></p>\n<p>Huffman 编码是一种最优前缀码，用变长编码表示源符号——出现频率越高的符号用越短的编码。由于量化后的权重集中在双峰附近、稀疏索引差值集中在小值区域，分布高度非均匀，Huffman 编码可在量化基础上进一步节省 <strong>20%–30%</strong> 的存储。</p>\n<p>Huffman 编码是纯离线操作，不需要额外训练，在剪枝和量化微调全部完成后执行。</p>\n<h5>与传统方法的对比</h5>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>方法</th>\n<th>核心思路</th>\n<th>AlexNet 压缩率</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>原始网络</td>\n<td>—</td>\n<td>1×</td>\n</tr>\n<tr>\n<td>HashedNets (Chen et al., 2015)</td>\n<td>哈希函数预定义权重共享</td>\n<td>—</td>\n</tr>\n<tr>\n<td>仅剪枝 (Han et al., 2015)</td>\n<td>移除小权重连接</td>\n<td>9×</td>\n</tr>\n<tr>\n<td>仅量化</td>\n<td>k-means 权重共享</td>\n<td>~8×</td>\n</tr>\n<tr>\n<td><strong>Deep Compression</strong></td>\n<td><strong>剪枝 + 量化 + Huffman</strong></td>\n<td><strong>35×</strong></td>\n</tr>\n</tbody>\n</table></div>\n<p>Deep Compression 的核心优势在于三种技术<strong>正交互补</strong>：剪枝减少连接数量，量化减少每个连接的比特数，Huffman 编码利用统计冗余进一步压缩。论文实验证明，剪枝不仅不会损害量化效果，反而因为去除了接近零的权重，使得剩余权重的分布更有利于聚类。</p>\n<h5>压缩效果总结</h5>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>网络</th>\n<th>原始大小</th>\n<th>压缩后大小</th>\n<th>压缩率</th>\n<th>精度变化</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>LeNet-300-100</td>\n<td>1070 KB</td>\n<td>27 KB</td>\n<td><strong>40×</strong></td>\n<td>Top-1: 1.64% → 1.58%（提升）</td>\n</tr>\n<tr>\n<td>LeNet-5</td>\n<td>1720 KB</td>\n<td>44 KB</td>\n<td><strong>39×</strong></td>\n<td>Top-1: 0.80% → 0.74%（提升）</td>\n</tr>\n<tr>\n<td>AlexNet</td>\n<td>240 MB</td>\n<td>6.9 MB</td>\n<td><strong>35×</strong></td>\n<td>Top-1/5: 42.78%/19.73% → 42.78%/19.70%</td>\n</tr>\n<tr>\n<td>VGG-16</td>\n<td>552 MB</td>\n<td>11.3 MB</td>\n<td><strong>49×</strong></td>\n<td>Top-1/5: 31.50%/11.32% → 31.17%/10.91%（提升）</td>\n</tr>\n</tbody>\n</table></div>\n<p>在硬件层面，压缩后的网络在 CPU 上获得 3× 加速，在 GPU 上获得 3.5× 加速，在移动 GPU 上获得 4× 加速；能效方面，CPU 上提升 7×，GPU 上提升 3.3×。</p>",
      "quiz": {
        "q": "Deep Compression 中，训练式量化阶段使用什么方法实现权重共享？",
        "options": [
          "对权重矩阵做 SVD 低秩分解",
          "使用哈希函数将权重映射到固定桶",
          "对每层权重做 k-means 聚类，同簇连接共享质心值",
          "将所有权重统一截断到最近的 2 的幂次"
        ],
        "answer": 2,
        "explain": "Deep Compression 对每层已剪枝的权重进行 k-means 聚类，同一簇内的所有连接共享该簇的质心作为权重值，存储时只需保存索引和码本，从而大幅减少比特数。"
      }
    },
    {
      "id": "eie",
      "num": 42,
      "name": "EIE",
      "fullName": "高效推理引擎 (Efficient Inference Engine)",
      "year": "2016",
      "org": "Stanford",
      "parent": "deep_compression",
      "paperUrl": "—",
      "projectUrl": "",
      "category": "efficiency",
      "motivation": "首个针对压缩稀疏模型的专用硬件加速器",
      "summary": "EIE 的核心目标是：首个针对压缩稀疏模型的专用硬件加速器。",
      "keyPoints": [
        "核心动机：首个针对压缩稀疏模型的专用硬件加速器",
        "演化来源：继承或改进自 deep_compression",
        "代表机构：Stanford"
      ],
      "detail": "<p>首个针对压缩稀疏模型的专用硬件加速器</p>"
    },
    {
      "id": "bnn",
      "num": 43,
      "name": "BNN",
      "fullName": "二值神经网络 (Binarized Neural Networks)",
      "year": "2016",
      "org": "MILA",
      "parent": "—",
      "paperUrl": "—",
      "projectUrl": "",
      "category": "efficiency",
      "motivation": "权重和激活限制为1位极大简化硬件乘法器",
      "summary": "BNN 的核心目标是：权重和激活限制为1位极大简化硬件乘法器。",
      "keyPoints": [
        "核心动机：权重和激活限制为1位极大简化硬件乘法器",
        "代表机构：MILA"
      ],
      "detail": "<p>权重和激活限制为1位极大简化硬件乘法器</p>"
    },
    {
      "id": "ampere_24_sparsity",
      "num": 44,
      "name": "Ampere 2:4 Sparsity HW",
      "fullName": "安培2:4稀疏硬件 (Ampere 2:4 Structured Sparsity)",
      "year": "2020",
      "org": "NVIDIA",
      "parent": "ampere_sparse",
      "paperUrl": "https://www.nvidia.com/content/dam/en-zz/Solutions/Data-Center/nvidia-ampere-architecture-whitepaper.pdf",
      "projectUrl": "",
      "category": "efficiency",
      "motivation": "Ampere架构原生2:4结构化稀疏硬件支持",
      "summary": "Ampere 2:4 Sparsity HW 的核心目标是：Ampere架构原生2:4结构化稀疏硬件支持。",
      "keyPoints": [
        "核心动机：Ampere架构原生2:4结构化稀疏硬件支持",
        "演化来源：继承或改进自 ampere_sparse",
        "代表机构：NVIDIA"
      ],
      "detail": "<p>Ampere架构原生2:4结构化稀疏硬件支持</p>"
    },
    {
      "id": "sageattention3",
      "num": 45,
      "name": "SageAttention3",
      "fullName": "微缩放FP4注意力机制 (SageAttention3 Microscaling FP4 Attention)",
      "year": "2026",
      "org": "NeurIPS",
      "parent": "—",
      "paperUrl": "https://proceedings.neurips.cc/paper_files/paper/2025/hash/4db397e0f760cc573c681e81a01a3dba-Abstract-Conference.html",
      "projectUrl": "",
      "category": "efficiency",
      "motivation": "微缩放FP4注意力机制大幅提升推理能效",
      "summary": "SageAttention3 的核心目标是：微缩放FP4注意力机制大幅提升推理能效。",
      "keyPoints": [
        "核心动机：微缩放FP4注意力机制大幅提升推理能效",
        "代表机构：NeurIPS"
      ],
      "detail": "<p>微缩放FP4注意力机制大幅提升推理能效</p>"
    },
    {
      "id": "atropos",
      "num": 46,
      "name": "Atropos",
      "fullName": "稀疏Transformer处理器 (Atropos Sparse Transformer Processor)",
      "year": "2026",
      "org": "IEEE",
      "parent": "ampere_24_sparsity",
      "paperUrl": "https://ieeexplore.ieee.org/abstract/document/11435429/",
      "projectUrl": "",
      "category": "efficiency",
      "motivation": "12nm稀疏处理器达18.1TFLOPs/W能效比",
      "summary": "Atropos 是一颗 12 nm FinFET Transformer 推理加速器，首次将**熵信号**同时用于三项优化——提前退出（Early Exit）、FP4/FP8 混合精度切换和逐句电压-频率缩放（DVFS），在 BERT/ALBERT 推理中实现 18.1 TFLOPs/W 峰值能效和 65 mJ/句的能耗，较传统 12 层全推理节省 7.14× 能量。",
      "keyPoints": [
        "<strong>芯片规格</strong>：12 nm FinFET，面积 4.60 mm²，集成于 64 mm² SoC（含 Ariane RISC-V CPU + 32×32 Systolic Array）",
        "<strong>三合一熵控制</strong>：第一层 Transformer 输出的熵值同时驱动 (1) 提前退出层预测、(2) FP4/FP8 精度选择、(3) 供电电压与时钟频率缩放",
        "<strong>提前退出</strong>：基于熵阈值 <span class=\"kb-math kb-math-inline\">E_T</span> 预测退出层，SST-2 任务平均仅需 3.9 层（vs 12 层），延迟降低 6.13×",
        "<strong>混合精度 MAC</strong>：FP8 (E4M3) 与 FP4 (E3M0) 双数据通路，FP4 向量宽度 32（FP8 为 16），配合 per-vector INT6 指数偏置，FP4 精度损失仅 1.2%（91.0% vs 92.2% baseline）",
        "<strong>细粒度 DVFS</strong>：16 组 V/F 对（0.62–1.0 V，77–717 MHz），通过 cell-based PMOS header + 无反馈 LDO + DCO 实现，切换粒度为单句",
        "<strong>能效</strong>：FP4 峰值 18.1 TFLOPs/W，FP8 峰值 8.24 TFLOPs/W；2 秒 QoS 目标下 65 mJ/句",
        "<strong>加速比</strong>：相比同 SoC 上的 Ariane CPU 加速 64.1×，相比 Systolic Array 加速 2.12×",
        "<strong>模型</strong>：ALBERT（BERT-base 参数共享变体），SST-2/MNLI/QQP 三个 NLP 任务验证"
      ],
      "detail": "<h5>系统架构总览</h5>\n<p><img alt=\"Atropos 系统架构图\" src=\"../assets/atropos_p3_img0.png\" />\n<em>图：Atropos 系统级架构。核心包括混合精度 MAC 单元、SFU（特殊功能单元，含 32 KB 辅助缓冲）、熵计算引擎、cell-based PMOS power header + 无反馈 LDO + DCO 构成的本地电源域。</em></p>\n<p>Atropos 的设计核心是将<strong>语义复杂度</strong>（以熵量化）映射为硬件控制信号。整个推理流程如下：</p>\n<ol>\n<li><strong>第一层推理</strong>：以最高频率（717 MHz）执行第一个 Transformer 层，获得分类 logits</li>\n<li><strong>熵计算</strong>：SFU 中的向量化熵引擎计算 softmax 输出的自熵 <span class=\"kb-math kb-math-inline\">H(z^{(\\ell)})</span></li>\n<li><strong>三路决策</strong>：</li>\n<li>若 <span class=\"kb-math kb-math-inline\">H &lt; E_T</span>，直接退出（句子已\"确定\"）</li>\n<li>否则，查 LUT 预测退出层 <span class=\"kb-math kb-math-inline\">L</span>，计算目标频率 <span class=\"kb-math kb-math-inline\">f&#x27; = N / (T - T_{\\text{curr}})</span>，查 DVFS LUT 获得最优电压 <span class=\"kb-math kb-math-inline\">V&#x27;_{DD}</span></li>\n<li>同时根据熵值决定后续层使用 FP4 还是 FP8 精度</li>\n<li><strong>降频推理</strong>：以降低后的 V/F 完成第 2 到第 <span class=\"kb-math kb-math-inline\">L</span> 层推理</li>\n</ol>\n<h5>熵引导的提前退出算法</h5>\n<p>传统提前退出（Algorithm 1）在每层都计算熵并判断是否退出，但这导致延迟不可预测。Atropos 的改进（Algorithm 2）在<strong>仅第一层</strong>就预测退出层，从而可以提前规划频率：</p>\n<pre><code class=\"language-python\"># Algorithm 2: Atropos Early Exit Inference\nfor sentence_i in sentences:\n    # Phase 1: 全速执行第一层\n    z_1 = transformer_layer_1(sentence_i)\n    H = entropy(z_1)\n\n    if H &lt; E_T:\n        exit()  # 第一层就够了\n\n    # Phase 2: 预测退出层，规划频率\n    L = LUT_EE(H, E_T)           # 查表：熵 → 预测退出层\n    f_prime = N / (T - T_curr)    # 剩余周期数 / 剩余时间\n    V_DD = LUT_DVFS(f_prime)      # 查表：频率 → 最优电压\n\n    # Phase 3: 降频执行剩余层\n    for layer in range(2, L+1):\n        z_l = transformer_layer(sentence_i)\n        if entropy(z_l) &lt; E_T:\n            exit()  # 提前退出仍然可能\n</code></pre>\n<div class=\"key-point\">💡 <strong>关键设计思想</strong>：第一层的熵与最终退出层之间存在强相关性（论文通过线性层/LUT 建模）。利用这一点，Atropos 将\"何时退出\"的不确定性转化为\"以什么速度跑完\"的确定性调度，从而给出<strong>统一的延迟保证</strong>（如 2 秒 QoS 目标）。</div>\n<h5>混合精度 FP4/FP8 MAC 数据通路</h5>\n<p><img alt=\"混合精度 MAC 与熵计算硬件\" src=\"../assets/atropos_p5_img0.png\" />\n<em>图：(上) FP4/FP8 混合精度 MAC 单元结构，展示 per-vector 指数偏置机制；(下) 熵计算引擎的向量化实现。</em></p>\n<p>MAC 单元支持两种模式：</p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>特性</th>\n<th>FP8 (E4M3)</th>\n<th>FP4 (E3M0)</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>向量宽度</td>\n<td>16</td>\n<td>32</td>\n</tr>\n<tr>\n<td>是否有尾数乘法器</td>\n<td>有</td>\n<td>无（仅指数加法）</td>\n</tr>\n<tr>\n<td>吞吐量</td>\n<td>1×</td>\n<td>2×</td>\n</tr>\n<tr>\n<td>峰值能效</td>\n<td>8.24 TFLOPs/W</td>\n<td>18.1 TFLOPs/W</td>\n</tr>\n</tbody>\n</table></div>\n<p>FP4 格式编码为：</p>\n<div class=\"kb-math kb-math-display\">(-1)^{\\text{sign}} \\times 2^{\\text{exponent} + \\text{expbias} / \\gamma}</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">\\gamma</span> 控制数值间距。关键创新在于 <strong>per-vector 指数偏置</strong>（而非 per-tensor）：每个向量附带一个 INT6 指数偏置值，存储在 PE 内部寄存器中。这将 FP4 per-tensor 量化的 SST-2 精度从 69.0% 提升至 88.3%（per-vector），结合熵引导的混合精度切换最终达到 91.0%（仅比 baseline 92.2% 低 1.2%）。</p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>量化策略</th>\n<th>SST-2 准确率</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>Baseline (FP32)</td>\n<td>92.2%</td>\n</tr>\n<tr>\n<td>FP8 per-tensor expbias</td>\n<td>92.1%</td>\n</tr>\n<tr>\n<td>FP4 per-tensor expbias</td>\n<td>69.0%</td>\n</tr>\n<tr>\n<td>FP4 per-vector expbias</td>\n<td>88.3%</td>\n</tr>\n<tr>\n<td>熵引导混合精度（本工作）</td>\n<td>91.0%</td>\n</tr>\n</tbody>\n</table></div>\n<div class=\"warn-box\">⚠️ <strong>注意</strong>：FP4 (E3M0) 没有尾数位，仅靠 3 位指数 + 1 位符号表示数值。如果没有 per-vector expbias 补偿动态范围，精度会灾难性下降（69%）。per-vector 粒度的偏置是使 FP4 可用的关键。</div>\n<h5>熵计算的硬件实现</h5>\n<p><img alt=\"熵计算硬件框图\" src=\"../assets/atropos_p5_img1.png\" />\n<em>图：熵函数硬件实现。输出同时驱动 V/F 缩放、混合精度选择和提前退出信号。</em></p>\n<p>熵计算通过 3 步向量化流水线实现（Algorithm 3）：</p>\n<pre><code class=\"language-python\"># Algorithm 3: Vectorized Softmax &amp; Entropy Calculation\n# Input: early exit vector z_l[0..k-1], vector width n\n\n# Step 1: 找最大值（数值稳定性）\nmax_k = -inf\nfor i in range(ceil(k/n)):\n    v = LOAD(z_l[n*i : n*i+n-1])\n    max_k = max(max_k, MAX(v))\n\n# Step 2: 计算指数和与加权指数和\nsum_exp = 0\nx_sum_exp = 0\nfor i in range(ceil(k/n)):\n    v = LOAD(z_l[n*i : n*i+n-1])\n    sum_exp  += SUM(exp(v - max_k))\n    x_sum_exp += SUM(v * exp(v - max_k))\n\n# Step 3: 计算熵\nH = ln(sum_exp) - max_k - x_sum_exp / sum_exp\n</code></pre>\n<div class=\"key-point\">💡 <strong>数值稳定性技巧</strong>：通过减去最大值 <span class=\"kb-math kb-math-inline\">\\text{max}_k</span> 避免指数运算溢出。<code>exp()</code> 和 <code>ln()</code> 均使用<strong>分段线性近似</strong>（bit-accurate piecewise linear）实现，兼顾精度与面积效率。</div>\n<h5>细粒度电压-频率缩放</h5>\n<p><img alt=\"LDO 电流响应与 V/F 相关性\" src=\"../assets/atropos_p6_img0.png\" />\n<em>图：(左) 后硅实测 LDO 电流响应轨迹，展示熵控制的 VFS 切换过程；(右) 每句熵值与对应 V/F 缩放的相关性。</em></p>\n<p>电源管理子系统的独特设计：</p>\n<ul>\n<li><strong>Cell-based PMOS power headers</strong>：而非传统的片外稳压器，使用标准单元库中的 PMOS 管作为电源开关</li>\n<li><strong>无反馈 LDO（Free-running LDO）</strong>：省去传统 LDO 的反馈环路，通过 16 个预表征的电阻值（存储在 SFU 的 32 KB LUT 中）直接设置输出电压</li>\n<li><strong>DCO（数字控制振荡器）</strong>：由 LDO 输出供电，电压降低时频率自然降低，实现 V/F 的自然耦合</li>\n<li><strong>16 组 V/F 对</strong>：覆盖 0.62–1.0 V 和 77–717 MHz 范围</li>\n</ul>\n<p>这种设计的优势是<strong>切换速度快</strong>（无需等待反馈环路稳定）且<strong>完全自包含</strong>（不依赖主时钟域），使得逐句级别的 DVFS 成为可能。</p>\n<h5>测量结果与对比</h5>\n<p><img alt=\"芯片测量结果\" src=\"../assets/atropos_p8_img0.png\" />\n<em>图：(a) 芯片显微照片与面积分布；(b) Shmoo 图展示功能正确的 V/F 工作范围；(c) 各处理阶段运行时间对比；(d) CPU vs 加速器运行时间对比。</em></p>\n<p><strong>关键测量数据</strong>：</p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>指标</th>\n<th>数值</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>工艺</td>\n<td>12 nm FinFET</td>\n</tr>\n<tr>\n<td>面积</td>\n<td>4.60 mm²（SoC 总 64 mm²）</td>\n</tr>\n<tr>\n<td>电压范围</td>\n<td>0.62 – 1.0 V</td>\n</tr>\n<tr>\n<td>频率范围</td>\n<td>77 – 717 MHz</td>\n</tr>\n<tr>\n<td>功耗（FP4）</td>\n<td>9 – 111 mW</td>\n</tr>\n<tr>\n<td>功耗（FP8）</td>\n<td>10 – 122 mW</td>\n</tr>\n<tr>\n<td>峰值吞吐（FP4）</td>\n<td>0.734 TOPS</td>\n</tr>\n<tr>\n<td>峰值吞吐（FP8）</td>\n<td>0.367 TOPS</td>\n</tr>\n<tr>\n<td>峰值能效（FP4）</td>\n<td>18.1 TFLOPs/W</td>\n</tr>\n<tr>\n<td>峰值能效（FP8）</td>\n<td>8.24 TFLOPs/W</td>\n</tr>\n<tr>\n<td>SRAM</td>\n<td>647 KB</td>\n</tr>\n<tr>\n<td>每句能耗</td>\n<td>65 mJ（2s QoS 目标）</td>\n</tr>\n<tr>\n<td>平均退出层（SST-2）</td>\n<td>3.9 / 12 层</td>\n</tr>\n<tr>\n<td>SST-2 准确率</td>\n<td>91.0%（vs 92.2% baseline）</td>\n</tr>\n</tbody>\n</table></div>\n<p><strong>与先前工作对比</strong>（Table 3）：</p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>工作</th>\n<th>工艺</th>\n<th>面积</th>\n<th>数据类型</th>\n<th>峰值能效</th>\n<th>逐句自适应</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>JSSC'22</td>\n<td>16 nm</td>\n<td>8.84 mm²</td>\n<td>FP8/Posit8</td>\n<td>7.8 TOPS/W</td>\n<td>✗</td>\n</tr>\n<tr>\n<td>VLSI'22</td>\n<td>5 nm</td>\n<td>0.153 mm²</td>\n<td>INT4</td>\n<td>95.6 TOPS/W</td>\n<td>✗</td>\n</tr>\n<tr>\n<td>ISSCC'22</td>\n<td>28 nm</td>\n<td>6.82 mm²</td>\n<td>INT8</td>\n<td>4.25 TOPS/W</td>\n<td>✗</td>\n</tr>\n<tr>\n<td>VLSI'24</td>\n<td>22 nm</td>\n<td>6.4 mm²</td>\n<td>INT12</td>\n<td>20.58 TOPS/W</td>\n<td>✗</td>\n</tr>\n<tr>\n<td>JSSC'25</td>\n<td>40 nm</td>\n<td>65.6 mm²</td>\n<td>BF16</td>\n<td>0.50 TOPS/W</td>\n<td>✗</td>\n</tr>\n<tr>\n<td><strong>Atropos</strong></td>\n<td><strong>12 nm</strong></td>\n<td><strong>4.60 mm²</strong></td>\n<td><strong>FP4/FP8</strong></td>\n<td><strong>18.1 TOPS/W</strong></td>\n<td><strong>✓ (EE+MP+VFS)</strong></td>\n</tr>\n</tbody>\n</table></div>\n<div class=\"key-point\">💡 <strong>独特优势</strong>：Atropos 是唯一支持<strong>逐句自适应优化</strong>（Sentence-Level Adaptive Optimization）的设计。虽然 VLSI'22 在 5 nm 工艺下以 INT4 达到了更高的绝对能效（95.6 TOPS/W），但其不具备根据输入复杂度动态调整计算量和功耗的能力。Atropos 的核心贡献不在于绝对峰值数字，而在于<strong>将算法级自适应（early exit + mixed precision）与电路级自适应（DVFS）统一到一个熵信号下</strong>的系统级协同设计方法学。</div>\n<h5>与传统方法的区别</h5>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>维度</th>\n<th>传统 Transformer 加速器</th>\n<th>Atropos</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>推理层数</td>\n<td>固定（12 层）</td>\n<td>自适应（平均 3.9 层）</td>\n</tr>\n<tr>\n<td>数据精度</td>\n<td>固定（FP8 或 INT8）</td>\n<td>熵引导动态切换 FP4/FP8</td>\n</tr>\n<tr>\n<td>电压/频率</td>\n<td>固定或粗粒度调节</td>\n<td>逐句 16 级 DVFS</td>\n</tr>\n<tr>\n<td>延迟保证</td>\n<td>最坏情况设计</td>\n<td>QoS 目标驱动（如 2 秒）</td>\n</tr>\n<tr>\n<td>控制信号</td>\n<td>无统一信号</td>\n<td>单一熵信号驱动三项优化</td>\n</tr>\n</tbody>\n</table></div>",
      "quiz": {
        "q": "Atropos 为什么选择在第一层 Transformer 输出上计算熵，而不是在每一层都计算？",
        "options": [
          "第一层的熵计算精度最高",
          "为了在推理早期就预测退出层并规划降频策略，从而提供统一的延迟保证",
          "后续层没有分类输出，无法计算熵",
          "为了减少熵计算硬件的面积开销"
        ],
        "answer": 1,
        "explain": "Atropos 的核心设计目标是提供统一的延迟保证（如 2 秒 QoS）。通过在第一层就预测退出层，可以计算剩余所需周期数并降低频率，将不确定的提前退出转化为确定的调度计划。虽然减少面积也是好处，但这不是主要动机。"
      }
    },
    {
      "id": "fp4_training",
      "num": 47,
      "name": "FP4 Training",
      "fullName": "FP4全量化训练 (FP4 Fully Quantized LLM Training)",
      "year": "2026",
      "org": "NeurIPS",
      "parent": "bnn",
      "paperUrl": "https://proceedings.neurips.cc/paper_files/paper/2025/hash/8340b085045cf13f1f0b6c2c4cc0a89c-Abstract-Conference.html",
      "projectUrl": "",
      "category": "efficiency",
      "motivation": "首次实现FP4精度全量化LLM训练",
      "summary": "本文首次实现了 FP4 精度下的 **全量化** LLM 从头训练（权重、激活、梯度全部量化为 4-bit 浮点），通过提出 **NVFP4 数据格式**、**Split Rounding 策略** 和 **QAF 收尾微调**，在 Llama2-7B / 1T tokens 规模上达到与 BF16 基线持平的性能，预估可比 BF16 训练加速约 85%。",
      "keyPoints": [
        "<strong>首次全量化 FP4 训练</strong>：同时将权重 <span class=\"kb-math kb-math-inline\">W</span>、激活 <span class=\"kb-math kb-math-inline\">a</span>、梯度 <span class=\"kb-math kb-math-inline\">\\delta</span> 量化为 FP4，覆盖训练中全部三个 GEMM（Forward / Backward / Update）",
        "<strong>NVFP4 格式优于 MXFP4</strong>：采用 E2M1 数据 + E4M3 缩放因子 + block_size=16，相比 MXFP4（E8M0 缩放 + block_size=32）在训练 loss 上显著更优",
        "<strong>Split Rounding 策略</strong>：前向传播使用 Round-to-Nearest (RtN)，反向传播和参数更新使用 Stochastic Rounding (SR)，针对不同 GEMM 的 6 个量化位置分别选择最优舍入方式",
        "<strong>理论分析</strong>：证明当梯度标准差降至 <span class=\"kb-math kb-math-inline\">\\sqrt{3} \\cdot \\sigma_q</span> 以下时 FP4 训练失效，为 QAF 切换时机提供理论依据",
        "<strong>QAF 收尾微调</strong>：训练末期切换为前向 FP4 + 反向 BF16，仅需 4% 额外 tokens（40B/1T）即可完全闭合与 BF16 的精度差距",
        "<strong>大规模验证</strong>：Llama2-7B 在 256 块 Gaudi2 HPU 上训练 1T tokens（约 30 天），零样本评估平均准确率 45.75 vs BF16 的 45.63"
      ],
      "detail": "<h5>核心框架示意</h5>\n<p>论文的核心思路可概括为下图所示的三阶段流程：</p>\n<pre><code>┌─────────────────────────────────────────────────────────────────┐\n│                    FP4 全量化训练框架                              │\n├─────────────────────────────────────────────────────────────────┤\n│                                                                 │\n│  ┌──────────────┐   ┌──────────────┐   ┌──────────────────┐    │\n│  │  Forward GEMM │   │ Backward GEMM│   │   Update GEMM    │    │\n│  │  Q(W)·Q(a)   │   │ Q(Wᵀ)·Q(δ)  │   │   Q(δ)·Q(aᵀ)    │    │\n│  │              │   │              │   │                  │    │\n│  │ W: RtN (FP4) │   │ W: RtN (FP4) │   │ δ: SR  (FP4)     │    │\n│  │ a: RtN (FP4) │   │ δ: SR  (FP4) │   │ a: SR  (FP4)     │    │\n│  └──────┬───────┘   └──────┬───────┘   └────────┬─────────┘    │\n│         │                  │                     │              │\n│         ▼                  ▼                     ▼              │\n│    输出激活 a          梯度 δ 传播           权重更新 ΔW          │\n│   (BF16 存储)        (BF16 存储)          (BF16 主权重)         │\n│                                                                 │\n├─────────────────────────────────────────────────────────────────┤\n│  训练末期 QAF：Forward 保持 FP4，Backward/Update 切回 BF16       │\n│  仅需 ~4% 额外 tokens 即可闭合与 BF16 的精度差距                  │\n└─────────────────────────────────────────────────────────────────┘\n</code></pre>\n<p><em>图：FP4 全量化训练的三个 GEMM 及其量化策略。每个 GEMM 的两个输入矩阵分别采用不同的舍入方式（Split Rounding）。</em></p>\n<h5>算法伪代码</h5>\n<pre><code class=\"language-python\"># FP4 全量化 LLM 训练 (Split Rounding + QAF)\n# ============================================\n\ndef quantize_fp4(x, block_size=16, rounding='rtn'):\n    &quot;&quot;&quot;将 BF16 张量量化为 NVFP4 格式 (E2M1 data + E4M3 scale)&quot;&quot;&quot;\n    # 按 block_size 分组，每组计算 E4M3 缩放因子\n    blocks = x.reshape(-1, block_size)\n    scales = blocks.abs().max(dim=-1).values  # E4M3 格式存储\n    normalized = blocks / scales.unsqueeze(-1)\n    if rounding == 'rtn':\n        quantized = round_to_nearest(normalized, fp4_grid)  # 确定性舍入\n    elif rounding == 'sr':\n        quantized = stochastic_round(normalized, fp4_grid)   # 随机舍入\n    return quantized, scales\n\ndef fp4_train_step(model, x, y, optimizer, phase='fp4'):\n    # ========== Forward GEMM: Q_rtn(W) · Q_rtn(a) ==========\n    for layer in model.layers:\n        W_q = quantize_fp4(layer.weight, rounding='rtn')   # 权重: RtN\n        a_q = quantize_fp4(layer.input,  rounding='rtn')   # 激活: RtN\n        layer.output = gemm_fp4(W_q, a_q)  # FP4×FP4 → BF16 累加\n\n    loss = cross_entropy(model.output, y)\n\n    if phase == 'fp4':  # 全 FP4 阶段\n        # ========== Backward GEMM: Q_rtn(Wᵀ) · Q_sr(δ) ==========\n        for layer in reversed(model.layers):\n            W_q = quantize_fp4(layer.weight.T, rounding='rtn')  # 权重: RtN\n            d_q = quantize_fp4(layer.grad_out,  rounding='sr')  # 梯度: SR\n            layer.grad_in = gemm_fp4(W_q, d_q)\n\n        # ========== Update GEMM: Q_sr(δ) · Q_sr(aᵀ) ==========\n        for layer in model.layers:\n            d_q = quantize_fp4(layer.grad_out,   rounding='sr')  # 梯度: SR\n            a_q = quantize_fp4(layer.input.T,    rounding='sr')  # 激活: SR\n            grad_W = gemm_fp4(d_q, a_q)\n            optimizer.step(layer.weight, grad_W)  # BF16 主权重更新\n\n    elif phase == 'qaf':  # QAF 收尾阶段\n        # Backward 和 Update 使用 BF16 精度\n        loss.backward()  # 标准 BF16 反向传播\n        optimizer.step()\n\n# 主训练循环\ntotal_tokens = 1_000_000_000_000  # 1T tokens\nqaf_tokens   =    40_000_000_000  # 40B tokens (4%)\n\nfor step, (x, y) in enumerate(dataloader):\n    tokens_seen = step * batch_size * seq_len\n    if tokens_seen &lt; total_tokens - qaf_tokens:\n        fp4_train_step(model, x, y, optimizer, phase='fp4')\n    else:\n        fp4_train_step(model, x, y, optimizer, phase='qaf')\n</code></pre>\n<h5>方法详解</h5>\n<p><strong>1. 动机与背景：为什么要 FP4 训练？</strong></p>\n<p>当前 LLM 训练的主流精度路径为 BF16 → FP8，但 FP4（4-bit 浮点）训练此前被认为不可行，因为 4-bit 仅能表示 16 个离散值（含符号），量化噪声极大。然而，FP4 GEMM 的理论吞吐量是 FP8 的 2 倍、BF16 的 4 倍，若能实现 FP4 训练将带来巨大的效率提升。</p>\n<p>此前的工作要么仅量化权重和激活（不量化梯度），要么仅量化梯度（不量化权重和激活），从未实现过三者同时 FP4 量化的<strong>全量化训练</strong>。本文首次攻克了这一挑战。</p>\n<p><strong>2. NVFP4 vs MXFP4：数据格式的选择</strong></p>\n<p>FP4 有两种主流格式：</p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>特性</th>\n<th>NVFP4</th>\n<th>MXFP4</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>数据位宽</td>\n<td>E2M1 (4-bit)</td>\n<td>E2M1 (4-bit)</td>\n</tr>\n<tr>\n<td>缩放因子格式</td>\n<td><strong>E4M3</strong> (8-bit FP)</td>\n<td>E8M0 (8-bit, 纯指数)</td>\n</tr>\n<tr>\n<td>Block 大小</td>\n<td><strong>16</strong></td>\n<td>32</td>\n</tr>\n<tr>\n<td>缩放因子精度</td>\n<td>高（有尾数位）</td>\n<td>低（无尾数位，仅2的幂）</td>\n</tr>\n</tbody>\n</table></div>\n<div class=\"key-point\">💡 <strong>关键洞察</strong>：NVFP4 的优势来自两方面——(1) E4M3 缩放因子比 E8M0 精度更高（有 3 位尾数），能更精确地表示每个 block 的动态范围；(2) block_size=16 比 32 更细粒度，减少了组内异常值对量化精度的影响。实验表明 NVFP4 在训练 loss 上比 MXFP4 低约 0.05（350M 模型，15B tokens）。</div>\n<p><strong>3. Split Rounding：不同位置用不同舍入</strong></p>\n<p>这是本文最核心的技术贡献。训练中的三个 GEMM 共涉及 6 个量化位置（每个 GEMM 的两个输入矩阵）。作者发现：</p>\n<ul>\n<li><strong>前向传播</strong>中的权重和激活应使用 <strong>RtN</strong>（Round-to-Nearest），因为 RtN 的均方误差比 SR 更小（SR 引入的方差会在前向传播中累积）</li>\n<li><strong>反向传播</strong>中的梯度和<strong>参数更新</strong>中的梯度/激活应使用 <strong>SR</strong>（Stochastic Rounding），因为 SR 是无偏的（<span class=\"kb-math kb-math-inline\">\\mathbb{E}[Q_{SR}(x)] = x</span>），能保证梯度期望正确</li>\n</ul>\n<div class=\"warn-box\">⚠️ <strong>为什么不能全用 RtN？</strong> RtN 是有偏的——当真实值恰好落在两个量化点中间时，RtN 总是偏向同一方向。对于前向传播这不是大问题（推理也用 RtN），但对于梯度更新，这种偏差会导致优化收敛到错误的点。Appendix B.2 证明了 RtN 梯度会产生残差损失 <span class=\"kb-math kb-math-inline\">L_\\infty = \\mu_\\varepsilon^2 / (2\\lambda)</span>，永远无法收敛到最优解。</p>\n<p>⚠️ <strong>为什么不能全用 SR？</strong> SR 虽然无偏，但方差更大。在前向传播中，SR 的额外方差会使输出噪声增大，反而降低训练质量。实验（Figure 7）证实：对前向传播中的权重和激活使用 RtN 比 SR 的 loss 更低。</div>\n<p>Split Rounding 的完整策略总结：</p>\n<div class=\"kb-math kb-math-display\">\\begin{aligned}\n\\text{Forward:} \\quad &amp; Q_{\\text{RtN}}(W) \\cdot Q_{\\text{RtN}}(a) \\\\\n\\text{Backward:} \\quad &amp; Q_{\\text{RtN}}(W^\\top) \\cdot Q_{\\text{SR}}(\\delta) \\\\\n\\text{Update:} \\quad &amp; Q_{\\text{SR}}(\\delta) \\cdot Q_{\\text{SR}}(a^\\top)\n\\end{aligned}</div>\n<p><strong>4. 理论分析：FP4 训练何时失效？</strong></p>\n<p>作者通过量化 SGD 的收敛性分析，推导出 FP4 训练的<strong>临界噪声阈值</strong>。核心推导如下：</p>\n<p>使用二阶 Taylor 展开，量化梯度更新的期望损失变化为：</p>\n<div class=\"kb-math kb-math-display\">\\mathbb{E}[L(\\theta_{t+1}) - L(\\theta_t)] \\approx \\underbrace{-\\eta\\|\\nabla L\\|_2^2 + \\frac{1}{2}\\eta^2 \\nabla L^\\top H \\nabla L}_{\\text{有用下降分量}} + \\underbrace{\\frac{1}{2}\\eta^2 \\sigma_q^2 \\text{tr}(H)}_{\\text{量化噪声效应}}</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">\\sigma_q^2</span> 是量化噪声方差，<span class=\"kb-math kb-math-inline\">H</span> 是 Hessian 矩阵。对最优步长 <span class=\"kb-math kb-math-inline\">\\eta^*</span> 求解后，找到损失对噪声最敏感的临界点：</p>\n<div class=\"kb-math kb-math-display\">\\sigma_{\\text{critical}} = \\frac{\\|\\nabla L(\\theta_t)\\|_2}{\\sqrt{3d}}</div>\n<div class=\"key-point\">💡 <strong>直觉解释</strong>：当每个参数维度的平均梯度幅度降到量化噪声标准差的 <span class=\"kb-math kb-math-inline\">\\sqrt{3}</span> 倍以下时，量化噪声开始主导梯度信号，FP4 训练失去有效性。这为 QAF 切换时机提供了理论指导——当观察到 loss 曲线开始偏离 BF16 基线时，说明梯度已接近临界阈值。</div>\n<p><strong>5. QAF（Quantization-Aware Finetuning）收尾策略</strong></p>\n<p>训练末期（学习率衰减阶段），梯度幅度减小，FP4 量化噪声的相对影响增大，导致 FP4 训练的 loss 曲线与 BF16 基线出现 gap。QAF 的解决方案：</p>\n<ul>\n<li><strong>前向传播</strong>：保持 FP4 量化（维持量化感知）</li>\n<li><strong>反向传播 + 参数更新</strong>：切回 BF16 精度（消除梯度量化噪声）</li>\n<li><strong>学习率</strong>：使用 FP4 训练结束时的最后学习率作为 QAF 的峰值学习率</li>\n</ul>\n<p>QAF 所需的额外 tokens 比例随总训练量增加而降低：</p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>总训练量</th>\n<th>QAF 长度</th>\n<th>比例</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>200B</td>\n<td>20B</td>\n<td>10%</td>\n</tr>\n<tr>\n<td>500B</td>\n<td>28B</td>\n<td>5.6%</td>\n</tr>\n<tr>\n<td>1T</td>\n<td>40B</td>\n<td><strong>4%</strong></td>\n</tr>\n</tbody>\n</table></div>\n<p><strong>6. 实验规模与结果</strong></p>\n<p>最大规模实验：<strong>Llama2-7B</strong>，1T tokens，256 块 Gaudi2 HPU，训练约 30 天。</p>\n<p>零样本评估结果（QAF 后）：</p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>基准</th>\n<th>BF16</th>\n<th>FP4+QAF</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>ARC-e</td>\n<td>54.0</td>\n<td>54.6</td>\n</tr>\n<tr>\n<td>ARC-c</td>\n<td>27.6</td>\n<td>28.2</td>\n</tr>\n<tr>\n<td>HellaSwag</td>\n<td>52.2</td>\n<td>52.2</td>\n</tr>\n<tr>\n<td>PIQA</td>\n<td>72.4</td>\n<td>72.0</td>\n</tr>\n<tr>\n<td>WinoGrande</td>\n<td>58.6</td>\n<td>58.2</td>\n</tr>\n<tr>\n<td><strong>平均</strong></td>\n<td><strong>45.63</strong></td>\n<td><strong>45.75</strong></td>\n</tr>\n</tbody>\n</table></div>\n<div class=\"key-point\">💡 <strong>关键结论</strong>：FP4 全量化训练 + QAF 收尾后的模型性能与 BF16 基线完全持平（甚至略优），证明了 FP4 训练的可行性。</div>\n<p><strong>7. 与前作的对比</strong></p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>方法</th>\n<th>权重量化</th>\n<th>激活量化</th>\n<th>梯度量化</th>\n<th>全量化</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>[21] Quantized LLM Training</td>\n<td>✅ FP4</td>\n<td>✅ FP4</td>\n<td>❌</td>\n<td>❌</td>\n</tr>\n<tr>\n<td>[19] 4-bit Gradient</td>\n<td>❌</td>\n<td>❌</td>\n<td>✅ FP4</td>\n<td>❌</td>\n</tr>\n<tr>\n<td><strong>本文</strong></td>\n<td><strong>✅ FP4</strong></td>\n<td><strong>✅ FP4</strong></td>\n<td><strong>✅ FP4</strong></td>\n<td><strong>✅</strong></td>\n</tr>\n</tbody>\n</table></div>\n<p>本文是首个将三者统一到 FP4 精度的工作，使得训练中的<strong>所有 GEMM 运算</strong>都可以在 FP4 精度下执行。</p>\n<p><strong>8. 性能预估</strong></p>\n<p>由于 Gaudi2 HPU 不原生支持 FP4 运算（实验为模拟），作者基于 GEMM 吞吐量理论分析给出预估：</p>\n<ul>\n<li>相比 FP8 训练：<strong>加速 35-40%</strong></li>\n<li>相比 BF16 训练：<strong>加速约 85%</strong></li>\n<li>内存节省：FP4 权重/激活存储减半，梯度通信量减半</li>\n</ul>",
      "quiz": {
        "q": "在 FP4 全量化训练的 Split Rounding 策略中，前向传播的权重和激活使用 RtN 而非 SR 的主要原因是什么？",
        "options": [
          "RtN 计算速度比 SR 更快，可以加速前向传播",
          "RtN 的均方误差更小，减少前向传播中的累积噪声",
          "SR 在前向传播中会导致梯度消失问题",
          "RtN 可以保证前向传播结果的无偏性"
        ],
        "answer": 1,
        "explain": "RtN 虽然是有偏估计，但其均方误差（MSE）比 SR 更小。在前向传播中，量化噪声的方差会逐层累积，因此选择 MSE 更小的 RtN 可以减少输出噪声，提升训练质量。SR 的无偏性优势主要体现在梯度更新中。"
      }
    },
    {
      "id": "nanophotonic_nn",
      "num": 48,
      "name": "Nanophotonic NN",
      "fullName": "逆向设计纳米光子神经网络 (Inverse-Designed Nanophotonic Neural Network)",
      "year": "2026",
      "org": "Nature Comms",
      "parent": "—",
      "paperUrl": "https://www.nature.com/articles/s41467-026-68648-1",
      "projectUrl": "",
      "category": "photonic",
      "motivation": "逆向设计实现超紧凑片上光学计算",
      "summary": "Nanophotonic NN 的核心目标是：逆向设计实现超紧凑片上光学计算。",
      "keyPoints": [
        "核心动机：逆向设计实现超紧凑片上光学计算",
        "代表机构：Nature Comms"
      ],
      "detail": "<p>逆向设计实现超紧凑片上光学计算</p>"
    },
    {
      "id": "astra_photonic",
      "num": 49,
      "name": "ASTRA",
      "fullName": "硅光子随机Transformer加速器 (ASTRA Silicon Photonic Transformer Accelerator)",
      "year": "2026",
      "org": "ACM TECS",
      "parent": "—",
      "paperUrl": "https://dl.acm.org/doi/abs/10.1145/3769092",
      "projectUrl": "",
      "category": "photonic",
      "motivation": "硅光子随机计算降低注意力机制功耗",
      "summary": "ASTRA 的核心目标是：硅光子随机计算降低注意力机制功耗。",
      "keyPoints": [
        "核心动机：硅光子随机计算降低注意力机制功耗",
        "代表机构：ACM TECS"
      ],
      "detail": "<p>硅光子随机计算降低注意力机制功耗</p>"
    },
    {
      "id": "lightmatter_passage",
      "num": 50,
      "name": "Lightmatter Passage",
      "fullName": "Lightmatter 3D光子互连 (Lightmatter Passage 3D Photonic Interconnect)",
      "year": "2026",
      "org": "Lightmatter",
      "parent": "—",
      "paperUrl": "https://lightmatter.co/blog/isscc-2026-scaling-ai-with-light/",
      "projectUrl": "",
      "category": "photonic",
      "motivation": "3D光子互连链路功耗从30W降至9W",
      "summary": "Lightmatter Passage 的核心目标是：3D光子互连链路功耗从30W降至9W。",
      "keyPoints": [
        "核心动机：3D光子互连链路功耗从30W降至9W",
        "代表机构：Lightmatter"
      ],
      "detail": "<p>3D光子互连链路功耗从30W降至9W</p>"
    },
    {
      "id": "rebellions_chiplet",
      "num": 51,
      "name": "Rebellions Quad-Chiplet",
      "fullName": "Rebellions四芯粒AI SoC (Rebellions Quad-Chiplet AI SoC)",
      "year": "2026",
      "org": "Rebellions",
      "parent": "—",
      "paperUrl": "https://isscc.org/2026-highlights/",
      "projectUrl": "",
      "category": "chiplet",
      "motivation": "四芯粒4nm NPU与HBM3E UCIe互连",
      "summary": "Rebellions Quad-Chiplet 的核心目标是：四芯粒4nm NPU与HBM3E UCIe互连。",
      "keyPoints": [
        "核心动机：四芯粒4nm NPU与HBM3E UCIe互连",
        "代表机构：Rebellions"
      ],
      "detail": "<p>四芯粒4nm NPU与HBM3E UCIe互连</p>"
    },
    {
      "id": "flare_chiplet",
      "num": 52,
      "name": "FLARE",
      "fullName": "细粒度CIM异构多芯粒加速器 (FLARE Multi-Chiplet LLM Accelerator)",
      "year": "2026",
      "org": "IEEE JETCAS",
      "parent": "—",
      "paperUrl": "https://ieeexplore.ieee.org/abstract/document/11456071/",
      "projectUrl": "",
      "category": "chiplet",
      "motivation": "细粒度CIM异构多芯粒LLM加速器",
      "summary": "FLARE 的核心目标是：细粒度CIM异构多芯粒LLM加速器。",
      "keyPoints": [
        "核心动机：细粒度CIM异构多芯粒LLM加速器",
        "代表机构：IEEE JETCAS"
      ],
      "detail": "<p>细粒度CIM异构多芯粒LLM加速器</p>"
    },
    {
      "id": "deepstack_3d",
      "num": 53,
      "name": "DeepStack",
      "fullName": "分布式3D堆叠AI加速器 (DeepStack Distributed 3D-Stacked Accelerator)",
      "year": "2026",
      "org": "arXiv",
      "parent": "—",
      "paperUrl": "https://arxiv.org/abs/2604.04750",
      "projectUrl": "",
      "category": "chiplet",
      "motivation": "分布式3D堆叠架构优化LLM推理效率",
      "summary": "DeepStack 提出了面向 3D 堆叠 DRAM 加速器的端到端性能建模与设计空间探索（DSE）框架，通过事务感知的 3D DRAM 带宽建模、层次化片上网络（NoC）仿真、完整并行策略搜索（TP/EP/SP/CP/DP/PP）以及热-功耗协同约束，在 \\(\\sim 2.5 \\times 10^{14}\\) 的设计空间中高效搜索最优硬件-软件配置，相比基线实现最高 9.5× 的吞吐提升。",
      "keyPoints": [
        "<strong>五层层次化硬件建模</strong>：PE → Cluster（3D DRAM 堆叠）→ Die（L1 NoC）→ Chip（L2 UCIe）→ System（L3 Ethernet），覆盖从计算单元到多芯片集群的完整架构",
        "<strong>事务感知 3D DRAM 带宽模型</strong>：捕获四个关键效应——(i) 事务大小依赖带宽、(ii) Little's Law 缓冲约束、(iii) bank 并行度受限、(iv) bank 冲突，精确建模有效带宽与理论带宽的差距",
        "<strong>双阶段网络建模</strong>：Stage 1 构建逻辑流量矩阵（与拓扑无关），Stage 2 映射到物理拓扑并执行路由仿真，比 NS-3 快 <span class=\"kb-math kb-math-inline\">10^5</span>× 且误差仅 2.12%",
        "<strong>完整并行策略搜索</strong>：支持 TP × EP × SP × CP × DP × PP = N 的全维度搜索，允许不同模块（Attention/MoE/MLP）采用独立并行策略",
        "<strong>Tile 级 Compute-Communication Overlap</strong>：将算子拆分为 tile 粒度的流水线，通过 prologue-steady-epilogue 三阶段模型精确估计端到端延迟",
        "<strong>热-功耗协同约束</strong>：集成 1D 稳态热模型，将 DRAM 层数、功率密度与温度约束（85°C）纳入 DSE 循环",
        "<strong>多阶段剪枝 DSE</strong>：通过并行策略可行性检查、内存占用过滤、层次化 NoC 搜索等策略，将 <span class=\"kb-math kb-math-inline\">\\sim 2.5 \\times 10^{14}</span> 的搜索空间压缩至 512 核 CPU 上约 2 天可完成",
        "<strong>关键设计洞察</strong>：batch size 比 prefill/decode 区分更能决定最优架构；DRAM 堆叠层数存在倒 U 型曲线（&gt;9 层有效带宽反而下降）；不完整的并行策略搜索会永久扭曲架构设计"
      ],
      "detail": "<h5>框架总览</h5>\n<p><img alt=\"DeepStack 框架总览\" src=\"https://ar5iv.labs.arxiv.org/html/2604.04750/assets/x1.png\" />\n<em>图：DeepStack 框架总览。左侧为五层层次化硬件模型（PE→Cluster→Die→Chip→System），中间为系统级分布式推理建模（并行策略搜索 + 网络仿真 + overlap 建模），右侧为 DSE 引擎输出 Pareto 最优设计。</em></p>\n<p>DeepStack 的核心架构分为三个紧密耦合的子系统：</p>\n<ol>\n<li><strong>芯片级 3D DRAM 性能建模</strong>：在单个 Cluster（compute die + 3D DRAM 层）粒度上，精确建模计算吞吐、DRAM 有效带宽、面积分配和热约束。</li>\n<li><strong>系统级分布式推理建模</strong>：将多个 Cluster 组织为 Die → Chip → System 的层次化互连，建模完整的 LLM 推理流水线，包括并行策略、集合通信和 compute-comm overlap。</li>\n<li><strong>DSE 引擎</strong>：在硬件配置（SM 数量、DRAM 层数、NoC 拓扑/带宽）× 软件配置（并行策略）的联合空间中搜索 Pareto 最优解。</li>\n</ol>\n<h5>3D DRAM 有效带宽建模</h5>\n<p>这是 DeepStack 最核心的技术贡献之一。传统建模工具假设 DRAM 带宽为常数，但 3D 堆叠 DRAM 的有效带宽受多个因素制约：</p>\n<pre><code class=\"language-python\"># DeepStack 3D DRAM 有效带宽计算伪代码\ndef compute_effective_bandwidth(config, workload):\n    # Step 1: 事务大小依赖带宽\n    # 小事务无法填满 burst length，带宽利用率下降\n    txn_size = workload.transaction_size\n    burst_len = config.dram.burst_length\n    bw_txn = config.dram.peak_bw * min(txn_size / burst_len, 1.0)\n\n    # Step 2: Little's Law 缓冲约束\n    # 有效带宽 ≤ buffer_entries × txn_size / latency\n    # 需要足够的 outstanding requests 才能饱和带宽\n    max_outstanding = config.l1_buffer_entries\n    dram_latency = config.dram.access_latency  # ~ns级\n    bw_littles = max_outstanding * txn_size / dram_latency\n\n    # Step 3: Bank 并行度受限\n    # 有效带宽 ≤ num_banks × bank_bandwidth\n    bw_bank = config.dram.num_banks * config.dram.per_bank_bw\n\n    # Step 4: Bank 冲突建模\n    # 随机访问模式下，N个请求命中B个bank的冲突概率\n    N_req = max_outstanding\n    B_banks = config.dram.num_banks\n    # 期望独立bank数 = B * (1 - (1-1/B)^N)\n    effective_banks = B_banks * (1 - (1 - 1/B_banks)**N_req)\n    bw_conflict = effective_banks * config.dram.per_bank_bw\n\n    # 最终有效带宽 = 四个约束的最小值\n    effective_bw = min(bw_txn, bw_littles, bw_bank, bw_conflict)\n    return effective_bw\n</code></pre>\n<div class=\"key-point\">💡 <strong>关键洞察</strong>：理论带宽随 DRAM 层数线性增长，但有效带宽在约 9 层后出现倒 U 型下降。这是因为 Little's Law 约束了 outstanding requests 数量——当 DRAM 层数增加时，理论带宽增大，但 L1 缓冲区深度有限，无法产生足够的并发请求来饱和更高的带宽。</div>\n<p>四个约束的数学表达：</p>\n<div class=\"kb-math kb-math-display\">BW_{\\text{eff}} = \\min\\left( BW_{\\text{txn}}, \\; \\frac{N_{\\text{buf}} \\cdot S_{\\text{txn}}}{t_{\\text{lat}}}, \\; N_{\\text{banks}} \\cdot BW_{\\text{bank}}, \\; \\mathbb{E}[B_{\\text{active}}] \\cdot BW_{\\text{bank}} \\right)</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">\\mathbb{E}[B_{\\text{active}}] = B \\cdot \\left(1 - \\left(1 - \\frac{1}{B}\\right)^N\\right)</span> 是 <span class=\"kb-math kb-math-inline\">N</span> 个请求在 <span class=\"kb-math kb-math-inline\">B</span> 个 bank 上的期望活跃 bank 数。</p>\n<h5>双阶段网络建模</h5>\n<p><img alt=\"网络建模双阶段\" src=\"https://ar5iv.labs.arxiv.org/html/2604.04750/assets/x3.png\" />\n<em>图：双阶段网络建模。Stage 1 从并行策略推导逻辑流量矩阵，Stage 2 将流量映射到物理拓扑执行路由仿真。</em></p>\n<p><strong>Stage 1: 逻辑流量矩阵构建</strong></p>\n<p>给定并行策略（如 TP=4, EP=8），DeepStack 自动推导每个集合通信操作（AllReduce、AllGather、All-to-All 等）的流量矩阵 <span class=\"kb-math kb-math-inline\">T \\in \\mathbb{R}^{N \\times N}</span>，其中 <span class=\"kb-math kb-math-inline\">T_{ij}</span> 表示节点 <span class=\"kb-math kb-math-inline\">i</span> 到节点 <span class=\"kb-math kb-math-inline\">j</span> 的数据传输量。</p>\n<p>关键创新在于<strong>并行策略到通信模式的自动映射</strong>：\n- <strong>TP (Tensor Parallelism)</strong>：在 Attention/MLP 层产生 AllReduce\n- <strong>EP (Expert Parallelism)</strong>：在 MoE 层产生 All-to-All\n- <strong>SP (Sequence Parallelism)</strong>：在 LayerNorm/Dropout 处产生 AllGather + ReduceScatter\n- <strong>CP (Context Parallelism)</strong>：长序列分片产生 P2P 通信\n- <strong>PP (Pipeline Parallelism)</strong>：跨 stage 的 P2P 传输 + pipeline bubble</p>\n<p>DeepStack 允许不同模块采用独立并行策略（如 Attention 用 TP，MoE 用 EP），并自动插入必要的重分布集合通信。</p>\n<p><strong>Stage 2: 物理拓扑映射与路由</strong></p>\n<pre><code class=\"language-python\"># Stage 2 网络仿真伪代码\ndef simulate_network(traffic_matrix, topology, routing_algo):\n    &quot;&quot;&quot;\n    将逻辑流量矩阵映射到物理拓扑，计算通信延迟\n    支持三层层次化拓扑: L1(Cluster内) / L2(Die内) / L3(Chip间)\n    &quot;&quot;&quot;\n    total_latency = 0\n    for src, dst, data_size in traffic_matrix.entries():\n        # 确定通信路径（跨越哪些层次）\n        path = routing_algo.find_path(src, dst, topology)\n\n        # 计算每一跳的延迟\n        hop_latency = sum(hop.latency for hop in path.hops)\n\n        # 计算传输延迟（考虑链路带宽和拥塞）\n        transfer_time = data_size / path.bottleneck_bandwidth\n\n        # 支持 ring / tree / direct 等集合通信算法\n        total_latency = max(total_latency, hop_latency + transfer_time)\n\n    return total_latency\n</code></pre>\n<p>该方法相比 NS-3 的离散事件仿真实现了 <span class=\"kb-math kb-math-inline\">\\sim 10^5 \\times</span> 加速（0.1s vs 3h），同时保持 2.12%（Switch）和 1.62%（Torus）的加权误差。</p>\n<h5>Tile 级 Compute-Communication Overlap</h5>\n<p>DeepStack 将每个算子（如 GEMM）拆分为多个 tile，实现计算与通信的流水线重叠：</p>\n<div class=\"kb-math kb-math-display\">T_{\\text{e2e}} = T_{\\text{prologue}} + (K-2) \\cdot \\max(T_{\\text{comp}}^{\\text{tile}}, T_{\\text{comm}}^{\\text{tile}}) + T_{\\text{epilogue}}</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">K</span> 是 tile 数量，prologue 是第一个 tile 的通信时间（尚无计算可重叠），epilogue 是最后一个 tile 的计算时间（尚无通信可重叠），中间的 steady state 阶段取计算和通信的最大值。</p>\n<div class=\"warn-box\">⚠️ <strong>注意</strong>：overlap 的有效性取决于 tile 粒度的选择。tile 太大则流水线级数太少，overlap 不充分；tile 太小则启动开销占比增大。DeepStack 在 DSE 中搜索最优 tile 大小。</div>\n<h5>完整并行策略搜索</h5>\n<p>DeepStack 支持的并行策略空间为：</p>\n<div class=\"kb-math kb-math-display\">\\text{TP} \\times \\text{EP} \\times \\text{SP} \\times \\text{CP} \\times \\text{DP} \\times \\text{PP} = N</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">N</span> 为总设备数。关键设计决策包括：</p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>并行维度</th>\n<th>通信模式</th>\n<th>适用场景</th>\n<th>通信量</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>TP</td>\n<td>AllReduce</td>\n<td>小 batch，低延迟需求</td>\n<td><span class=\"kb-math kb-math-inline\">O(2 \\cdot \\frac{p-1}{p} \\cdot M)</span></td>\n</tr>\n<tr>\n<td>EP</td>\n<td>All-to-All</td>\n<td>MoE 模型，大 batch</td>\n<td><span class=\"kb-math kb-math-inline\">O(2 \\cdot \\frac{p-1}{p} \\cdot \\text{tokens} \\cdot d)</span></td>\n</tr>\n<tr>\n<td>SP</td>\n<td>AllGather + ReduceScatter</td>\n<td>长序列</td>\n<td><span class=\"kb-math kb-math-inline\">O(\\frac{p-1}{p} \\cdot M)</span></td>\n</tr>\n<tr>\n<td>CP</td>\n<td>P2P Ring</td>\n<td>超长上下文</td>\n<td><span class=\"kb-math kb-math-inline\">O(\\text{seq\\_len} \\cdot d / p)</span></td>\n</tr>\n<tr>\n<td>PP</td>\n<td>P2P + Bubble</td>\n<td>大模型分层</td>\n<td><span class=\"kb-math kb-math-inline\">O(\\text{hidden} \\cdot \\text{micro\\_bs})</span></td>\n</tr>\n<tr>\n<td>DP</td>\n<td>AllReduce (gradients)</td>\n<td>大 batch</td>\n<td><span class=\"kb-math kb-math-inline\">O(2 \\cdot \\frac{p-1}{p} \\cdot |\\theta|)</span></td>\n</tr>\n</tbody>\n</table></div>\n<div class=\"key-point\">💡 <strong>关键发现</strong>：最优并行策略随 batch size 剧烈变化。小 batch 时 TP 主导（隐藏延迟），大 batch 时 PP 和 EP 更优（摊薄 bubble 和通信开销）。对于 MoE 模型，EP 在大 batch 下贡献最大增益（DeepSeek-V3 上 5.03× 提升）。</div>\n<h5>DSE 多阶段剪枝策略</h5>\n<pre><code class=\"language-python\"># DeepStack DSE 多阶段剪枝伪代码\ndef design_space_exploration(models, area_budget, thermal_limit):\n    &quot;&quot;&quot;\n    搜索空间 ~2.5×10^14，通过四阶段剪枝降至可行规模\n    &quot;&quot;&quot;\n    candidates = generate_all_configs()  # 硬件 × 并行策略\n\n    # Stage 1: 并行策略可行性 (剪枝 ~80%)\n    # 例: TP=1, DP=1 在给定batch下不可行\n    candidates = [c for c in candidates if is_parallel_feasible(c)]\n\n    # Stage 2: 内存占用检查 (剪枝 ~50%)\n    # 权重 + KV cache + 峰值激活 ≤ DRAM容量 × 0.9\n    candidates = [c for c in candidates \n                  if memory_footprint(c) &lt;= c.dram_capacity * 0.9]\n\n    # Stage 3: 层次化 NoC 搜索\n    # 先搜基础架构+堆叠配置，取 top 5%\n    top_arch = sorted(candidates, key=evaluate)[:len(candidates)*0.05]\n    # 再搜 NoC 延迟，取 top 5%\n    top_noc = sorted(top_arch, key=evaluate_noc)[:len(top_arch)*0.05]\n    # 最后逐层带宽微调\n    final = fine_tune_bandwidth(top_noc)\n\n    # Stage 4: 热约束过滤\n    final = [c for c in final if thermal_check(c) &lt;= thermal_limit]\n\n    return pareto_frontier(final)\n</code></pre>\n<h5>实验验证与关键结果</h5>\n<p><strong>建模精度</strong>：\n- 对比 Cadence Palladium 周期精确仿真：误差 &lt; 5%\n- 对比 8×H100 Triton-Distributed 内核：平均误差 3.97%（AllGather GEMM）\n- 对比 8×B200 vLLM 端到端推理：MAPE 12.18%\n- 对比 ASTRA-sim NS-3 后端：误差 2.12%（Switch）/ 1.62%（Torus），速度提升 <span class=\"kb-math kb-math-inline\">10^5</span>×</p>\n<p><strong>性能提升（消融实验，DeepSeek-V3 decode）</strong>：</p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>步骤</th>\n<th>技术</th>\n<th>STPS (BS=4)</th>\n<th>STPS (BS=1024)</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>1</td>\n<td>基线 (ASTRA-sim: DP/TP/PP)</td>\n<td>177.1</td>\n<td>5,729</td>\n</tr>\n<tr>\n<td>2</td>\n<td>+ 完整并行策略 (EP/SP/CP)</td>\n<td>256.4 (+45%)</td>\n<td>21,252 (+271%)</td>\n</tr>\n<tr>\n<td>3</td>\n<td>+ 模块级灵活并行</td>\n<td>256.4 (—)</td>\n<td>24,488 (+15%)</td>\n</tr>\n<tr>\n<td>4</td>\n<td>+ 芯片架构搜索</td>\n<td>314.2 (+23%)</td>\n<td>31,350 (+28%)</td>\n</tr>\n<tr>\n<td>5</td>\n<td>+ Compute-Comm Overlap</td>\n<td>340.5 (+8%)</td>\n<td>38,061 (+21%)</td>\n</tr>\n<tr>\n<td>6</td>\n<td>+ DRAM 层数 DSE</td>\n<td>493.3 (+45%)</td>\n<td>51,095 (+34%)</td>\n</tr>\n<tr>\n<td>7</td>\n<td>+ NoC DSE</td>\n<td>494.1 (+0.2%)</td>\n<td>54,280 (+6.2%)</td>\n</tr>\n<tr>\n<td>—</td>\n<td><strong>总加速比</strong></td>\n<td><strong>2.8×</strong></td>\n<td><strong>9.5×</strong></td>\n</tr>\n</tbody>\n</table></div>\n<h5>核心设计洞察</h5>\n<p><img alt=\"DRAM层数与有效带宽的倒U型关系\" src=\"https://ar5iv.labs.arxiv.org/html/2604.04750/assets/x5.png\" />\n<em>图：随 DRAM 堆叠层数增加，理论带宽线性增长，但有效带宽在约 9 层后下降（倒 U 型曲线），原因是 Little's Law 缓冲约束。</em></p>\n<p><strong>洞察 1：Batch size 比 prefill/decode 更能决定最优架构</strong></p>\n<p>传统 PD 解耦（prefill-decode disaggregation）将推理分为两个阶段分别优化。DeepStack 的 DSE 揭示了更本质的划分：\n- <strong>大 batch prefill</strong>：浅堆叠（2 层），最大化计算面积\n- <strong>小 batch prefill + 大 batch decode</strong>：中等堆叠（6-7 层），平衡计算与带宽\n- <strong>小 batch decode</strong>：深堆叠（~9 层），最大化带宽</p>\n<p>这意味着<strong>batch-size-aware 硬件解耦</strong>可能比 PD 解耦更有效。</p>\n<p><strong>洞察 2：不完整的并行策略搜索会永久扭曲硬件设计</strong></p>\n<p>消融实验表明，移除 EP 维度不仅降低吞吐，还导致 DSE 收敛到完全不同的芯片设计：\n- 有 EP：ep=32, tp=4, 7 层堆叠, 6 个 SM\n- 无 EP：tp=16, pp=8, 8 层堆叠, 5 个 SM（触及功耗墙）</p>\n<div class=\"warn-box\">⚠️ <strong>警告</strong>：这种硅片级的设计偏差无法通过后期软件调优弥补，强调了在流片前进行完整硬件-软件协同搜索的必要性。</div>\n<p><strong>洞察 3：能效最优与吞吐最优需要根本不同的架构</strong></p>\n<p>吞吐最优设计最大化连接层数以饱和带宽，而能效最优设计倾向于更多堆叠但更少连接（空闲）层，通过更大的片上缓冲和改进的数据复用来补偿带宽损失，功率密度降低 10-48%，tokens/J 提升 3-24%。</p>",
      "quiz": {
        "q": "DeepStack 发现 3D 堆叠 DRAM 的有效带宽在超过约 9 层后反而下降，主要原因是什么？",
        "options": [
          "DRAM 层数增加导致热阻过高，必须降频运行",
          "TSV 数量有限，物理连接带宽无法线性扩展",
          "Little's Law 约束下，有限的缓冲区深度无法产生足够的并发请求来饱和更高的理论带宽",
          "bank 冲突概率随层数增加而急剧上升"
        ],
        "answer": 2,
        "explain": "根据 Little's Law，有效带宽 ≤ buffer_entries × txn_size / latency。当 DRAM 层数增加使理论带宽超过此上限时，L1 缓冲区深度成为瓶颈，无法维持足够的 outstanding requests 来饱和带宽，导致有效带宽出现倒 U 型下降。"
      }
    },
    {
      "id": "moentwine",
      "num": 54,
      "name": "MoEntwine",
      "fullName": "晶圆级MoE专家并行推理 (MoEntwine Wafer-Scale Expert Parallel Inference)",
      "year": "2026",
      "org": "HPCA",
      "parent": "cerebras_wse",
      "paperUrl": "https://ieeexplore.ieee.org/abstract/document/11408594/",
      "projectUrl": "",
      "category": "llm_inference",
      "motivation": "释放晶圆级芯片超大规模MoE并行推理潜力",
      "summary": "MoEntwine 提出 **Entwined Ring Mapping (ER-Mapping)** 与 **Non-Invasive Balancer (NI-Balancer)** 两项协同技术，通过将 TP 组交错编织为紧凑的 Full Token Domain 消除 mesh 网络中心拥塞，并利用通信阶段的冷链路实现零开销专家迁移，在晶圆级计算机上相比 NVL72 实现平均 39% 的 MoE 推理性能提升。",
      "keyPoints": [
        "<strong>目标平台</strong>：Wafer-Scale Computer (WSC)，单片晶圆集成数百 die，die 间通过 2D mesh 拓扑直连，带宽远超传统 GPU 集群但受限于多跳路由",
        "<strong>核心问题一 — 通信拥塞</strong>：MoE Expert Parallelism 的 all-to-all 通信在 mesh 中心产生严重拥塞，传统 TP 组角落映射导致 Full Token Domain (FTD) 面积大且相互交叉",
        "<strong>核心问题二 — 专家迁移开销</strong>：WSC 无片上磁盘，动态负载均衡必须通过 mesh 网络迁移专家权重，侵入式迁移中断推理流水线",
        "<strong>ER-Mapping</strong>：将 TP 组交错编织为相邻排列，使 FTD 从 3×3 缩小为 2×2 且互不交叉，all-to-all 通信距离降低 &gt;50%；代价是 all-reduce 变为 2-hop entwined ring（延迟 ×2 但绝对值小）",
        "<strong>Hierarchical ER-Mapping (HER-Mapping)</strong>：多晶圆场景下将 all-reduce 拆分为 reduce-scatter + all-gather 两阶段，消除跨晶圆多跳开销",
        "<strong>NI-Balancer</strong>：利用 all-reduce 阶段 FTD 内链路空闲（冷链路）执行 Local Migration，all-to-all 阶段 FTD 间链路空闲执行 Global Migration，通过 CUDA stream 流水线化实现零开销",
        "<strong>拓扑感知贪心算法</strong>：基于历史负载预测，选择最热设备的最热门专家，复制到拓扑距离最近的冷设备 shadow slot",
        "<strong>评估</strong>：基于 ASTRA-sim 2.0 模拟 B200 等效 WSC die，在 DeepSeek-V3/V2、Qwen3、DBRX、Mixtral 上验证，ER-Mapping 最高降低 62% 通信延迟，NI-Balancer 降低 54% 计算延迟，整体比 NVL72 提升 39%"
      ],
      "detail": "<p><img alt=\"MoEntwine 系统总览：WSC 架构与 MoE 推理挑战\" src=\"../assets/moentwine_fig1_wsc_overview.png\" />\n<em>图 1：晶圆级计算机架构总览。单片晶圆集成数百个 die，die 间通过 2D mesh 拓扑直连，带宽远超传统 NVLink 集群，但多跳路由在中心区域产生严重拥塞。</em></p>\n<p><strong>动机与背景：WSC 上 MoE 推理的两大瓶颈。</strong> Mixture-of-Experts (MoE) 模型通过稀疏激活实现参数规模的高效扩展，Expert Parallelism (EP) 将不同专家分布在多个设备上，推理时需要 all-to-all 通信将 token 路由到对应专家设备。在传统 GPU 集群（如 DGX B200）中，节点内设备通过 NVSwitch 全连接，all-to-all 为单跳通信。然而在 WSC 的 2D mesh 拓扑中，远距离设备间的通信必须经过多个中间节点，导致中心链路成为瓶颈。论文通过理论分析证明：当 TP 组按传统方式映射到网格角落时，每个 Full Token Domain（FTD，即持有一个 TP 组全部 token 的最小设备集合）面积为 3×3，且不同 FTD 在中心区域严重交叉，all-to-all 流量在中心链路叠加产生 <span class=\"kb-math kb-math-inline\">O(n)</span> 级拥塞。同时，WSC 没有片上磁盘存储，动态负载均衡所需的专家迁移只能通过已经拥塞的 mesh 网络完成，传统侵入式迁移（暂停推理→迁移→恢复）每次中断相当于 2 个推理迭代的开销。</p>\n<p><img alt=\"FTD 概念与拥塞分析\" src=\"../assets/moentwine_fig6_ftd_concept.png\" />\n<em>图 6：Full Token Domain (FTD) 概念。左：传统角落映射下 FTD 为 3×3 区域且相互交叉；右：ER-Mapping 下 FTD 缩小为 2×2 且互不交叉。</em></p>\n<p><strong>核心机制一：Entwined Ring Mapping (ER-Mapping)。</strong> ER-Mapping 的核心洞察是：all-to-all 通信的瓶颈源于 FTD 过大和交叉，而 all-reduce 的延迟天然较低（数据量小）。因此可以牺牲少量 all-reduce 性能来大幅优化 all-to-all。具体做法是将属于不同 TP 组的设备交错编织排列，使得每个 FTD 仅占 2×2 的紧凑区域且互不重叠。在 Attention 层，ER-Mapping 保留 all-gather 操作使每个设备持有完整 KV cache，这样后续 all-to-all 的源和目的都在同一个 2×2 FTD 内，通信距离从多跳降为 1-2 跳。代价是 all-reduce 不再能在连续设备上执行经典 ring，而是形成\"entwined ring\"——环上相邻节点在物理拓扑上间隔 2 跳，all-reduce 延迟约为原来的 2 倍。但由于 all-reduce 数据量（hidden_size 级别）远小于 all-to-all 数据量（token_count × hidden_size 级别），这一权衡在绝大多数配置下都是有利的。</p>\n<p><img alt=\"ER-Mapping 设计\" src=\"../assets/moentwine_fig7_er_mapping.png\" />\n<em>图 7：ER-Mapping 将 TP 组交错编织，形成紧凑的 2×2 FTD。右侧展示了 all-to-all 通信路径的显著缩短。</em></p>\n<p><img alt=\"Entwined Ring All-Reduce\" src=\"../assets/moentwine_fig8_entwined_ring.png\" />\n<em>图 8：Entwined Ring 上的 all-reduce 操作。环上相邻逻辑节点在物理 mesh 上间隔 2 跳，延迟约为传统 ring 的 2 倍，但绝对值仍远小于 all-to-all。</em></p>\n<p>对于多晶圆系统，论文进一步提出 <strong>Hierarchical ER-Mapping (HER-Mapping)</strong>：将 all-reduce 拆分为晶圆内 reduce-scatter 和跨晶圆 all-gather 两个阶段。reduce-scatter 在本地 entwined ring 上执行，all-gather 通过晶圆间高速互连完成，避免了跨晶圆多跳 ring 的长延迟。HER-Mapping 在所有并行配置下都能稳定带来性能提升，最高达 62%。</p>\n<div class=\"key-point\">💡 <strong>关键洞察</strong>：ER-Mapping 的本质是用 all-reduce 的\"富余带宽\"换取 all-to-all 的\"拓扑距离\"——在 MoE 推理中 all-to-all 数据量通常是 all-reduce 的 <span class=\"kb-math kb-math-inline\">K</span>（激活专家数）倍，因此即使 all-reduce 延迟翻倍，总通信时间仍大幅下降。</div>\n<p><strong>核心机制二：Non-Invasive Balancer (NI-Balancer)。</strong> MoE 推理中 gating 函数的动态路由导致专家负载不均衡，最热设备负载可达平均值的 2 倍。传统方法通过复制热门专家到空闲设备来均衡负载，但迁移专家权重（数百 MB）需要占用网络带宽并中断推理流水线。NI-Balancer 的核心洞察是 <strong>冷热链路的时间互补性</strong>：</p>\n<ul>\n<li><strong>All-Reduce 阶段</strong>：FTD 内部链路繁忙，但 FTD 之间的链路空闲 → 利用空闲链路执行 <strong>Global Migration</strong>（跨 FTD 的专家复制）</li>\n<li><strong>All-to-All 阶段</strong>：FTD 之间链路繁忙，但 FTD 内部链路空闲 → 利用空闲链路执行 <strong>Local Migration</strong>（FTD 内的专家复制）</li>\n</ul>\n<p><img alt=\"NI-Balancer 流水线\" src=\"../assets/moentwine_fig11_ni_balancer.png\" />\n<em>图 11：NI-Balancer 利用通信阶段的冷链路执行专家迁移，通过 CUDA stream 流水线化实现零开销。Compute、Communication、Migration 三个 stream 并行执行。</em></p>\n<p>迁移操作通过独立的 CUDA stream 与计算/通信并行执行，完全不阻塞推理流水线。论文还利用了专家负载的 <strong>时间局部性</strong>——在固定场景下负载比例在 warm-up 后趋于稳定，混合场景下也呈现缓慢变化的趋势——通过历史窗口预测未来负载，仅在累积不均衡超过阈值 <span class=\"kb-math kb-math-inline\">\\alpha</span> 时触发迁移，避免频繁无效操作。</p>\n<pre><code class=\"language-python\"># NI-Balancer 拓扑感知贪心算法（简化伪代码）\ndef topology_aware_balance(devices, load_history, mesh_topology):\n    predicted_load = predict_from_history(load_history)  # 时间局部性预测\n\n    while max(predicted_load) / avg(predicted_load) &gt; 1 + alpha:\n        # 找到最热设备上最热门的专家\n        hot_device = argmax(predicted_load)\n        hot_expert = most_popular_expert(hot_device)\n\n        # 在拓扑距离最近的冷设备上找到空闲 shadow slot\n        cold_devices = sorted_by_topology_distance(\n            [d for d in devices if has_shadow_slot(d)], \n            center=hot_device\n        )\n        target = cold_devices[0]\n\n        # 调度迁移（在下一个冷链路窗口执行）\n        if same_ftd(hot_device, target):\n            schedule_local_migration(hot_expert, target)   # A2A阶段执行\n        else:\n            schedule_global_migration(hot_expert, target)  # AR阶段执行\n\n        # 更新预测负载\n        predicted_load[hot_device] -= expert_load(hot_expert) * redistribution_ratio\n        predicted_load[target] += expert_load(hot_expert) * redistribution_ratio\n</code></pre>\n<p><strong>实验验证与消融分析。</strong> 论文基于 ASTRA-sim 2.0 构建了精确的 WSC 模拟器，每个 die 等效于 NVIDIA B200 GPU（2250 TFLOPS BF16、180GB HBM、8TB/s 带宽），die 间互连带宽 900GB/s。在 DeepSeek-V3（671B, 256 experts）、DeepSeek-V2（236B）、Qwen3（235B）、DBRX（132B）、Mixtral-8x22B（141B）五个主流 MoE 模型上进行了全面评估。</p>\n<p><img alt=\"ER-Mapping 通信性能\" src=\"../assets/moentwine_fig13_er_results.png\" />\n<em>图 13：ER-Mapping 在不同模型、规模、并行度下的通信延迟对比。WSC 相比 DGX 平均降低 56% 通信延迟，ER-Mapping 进一步带来最高 35% 的额外提升。</em></p>\n<p>ER-Mapping 的通信优化效果随激活专家数增加而增强（all-to-all 占比更高），在 DeepSeek-V3（激活 8/256 experts）上效果最为显著。对于仅激活 2 个专家的 Mixtral，all-to-all 占比较小，ER-Mapping 的增益有限。HER-Mapping 在多晶圆场景下表现稳定，所有配置均有提升，最高达 62%。</p>\n<p><img alt=\"运行时负载轨迹\" src=\"../assets/moentwine_fig15_runtime_trace.png\" />\n<em>图 15：运行时专家负载轨迹。无均衡时最大负载偏离均值 2×；贪心均衡频繁中断推理；拓扑感知均衡减少中断；非侵入式均衡完全消除中断。</em></p>\n<p>NI-Balancer 的消融实验显示：无负载均衡时最大设备负载偏离均值 2 倍；基线贪心均衡（EPLB）平均每 10 次迭代中断一次，每次中断等效 2 次迭代开销；在混合场景的 Decode-only 模式下，侵入式迁移开销高达 45%。NI-Balancer 完全消除迁移开销，MoE 计算延迟降低最高 54%，all-to-all 通信延迟降低 23%。</p>\n<p><img alt=\"端到端消融\" src=\"../assets/moentwine_fig17_ablation.png\" />\n<em>图 17：端到端消融分析。以 NVL72 为基线，逐步叠加 ER-Mapping → HER-Mapping → 负载均衡 → 拓扑感知 → 非侵入式，最终 WSC 相比 NVL72 实现平均 39% 的每设备 MoE 性能提升。</em></p>\n<p>端到端消融以 NVIDIA NVL72（72 设备全连接超级节点）为基线，WSC 使用 4 块 8×8 晶圆（256 设备）。NVL72 的 EP=72 导致每设备多专家、内存访问主导执行时间，负载均衡增益仅 26%。WSC 的 EP=256 实现单专家每设备，但原始 mesh 拓扑下 all-to-all 延迟远超计算时间。ER-Mapping 降低 30% all-to-all 延迟，HER-Mapping 将降幅扩大到 71%，消除通信瓶颈。叠加 NI-Balancer 后计算和通信分别再降 49% 和 20%，最终 WSC 相比 NVL72 实现平均 <strong>39%</strong> 的每设备 MoE 推理性能提升。</p>\n<div class=\"warn-box\">⚠️ <strong>注意</strong>：ER-Mapping 的收益依赖于 all-to-all/all-reduce 的数据量比值。对于激活专家数极少（如 Mixtral 的 2/8）的模型，all-to-all 占比小，ER-Mapping 的权衡可能不利。论文建议此类模型考虑 ESP（Expert Sharding Parallelism）替代方案。</div>",
      "quiz": {
        "q": "MoEntwine 的 ER-Mapping 将 TP 组交错编织排列的核心收益是什么？",
        "options": [
          "降低 all-reduce 通信延迟",
          "将 Full Token Domain (FTD) 从 3×3 缩小为 2×2 且互不交叉，大幅减少 all-to-all 通信距离",
          "增加每个设备上的专家数量以提高计算利用率",
          "消除 MoE gating 函数带来的负载不均衡"
        ],
        "answer": 1,
        "explain": "ER-Mapping 通过交错编织 TP 组使 FTD 紧凑化（2×2）且互不重叠，all-to-all 通信被限制在小范围内，距离从多跳降为 1-2 跳。代价是 all-reduce 延迟约翻倍，但由于 all-reduce 数据量远小于 all-to-all，总通信时间仍大幅下降。"
      }
    },
    {
      "id": "diamond_moe",
      "num": 55,
      "name": "DIAMoND",
      "fullName": "异构存内MoE推理架构 (DIAMoND Heterogeneous In-Memory MoE)",
      "year": "2026",
      "org": "ISCA",
      "parent": "—",
      "paperUrl": "https://mengli.me/news/2026-03-31-isca2026/",
      "projectUrl": "",
      "category": "llm_inference",
      "motivation": "异构NAND/DRAM实现边缘侧存内MoE推理",
      "summary": "DIAMoND 的核心目标是：异构NAND/DRAM实现边缘侧存内MoE推理。",
      "keyPoints": [
        "核心动机：异构NAND/DRAM实现边缘侧存内MoE推理",
        "代表机构：ISCA"
      ],
      "detail": "<p>异构NAND/DRAM实现边缘侧存内MoE推理</p>"
    },
    {
      "id": "bitdecoding",
      "num": 56,
      "name": "BitDecoding",
      "fullName": "低比特KV Cache解码 (BitDecoding Low-Bit KV Cache Decoding)",
      "year": "2026",
      "org": "HPCA",
      "parent": "—",
      "paperUrl": "https://hpca-conf.org/2026/program/",
      "projectUrl": "",
      "category": "llm_inference",
      "motivation": "低比特KV Cache量化释放Tensor Core算力",
      "summary": "BitDecoding 的核心目标是：低比特KV Cache量化释放Tensor Core算力。",
      "keyPoints": [
        "核心动机：低比特KV Cache量化释放Tensor Core算力",
        "代表机构：HPCA"
      ],
      "detail": "<p>低比特KV Cache量化释放Tensor Core算力</p>"
    },
    {
      "id": "nvidia_ising",
      "num": 57,
      "name": "NVIDIA Ising",
      "fullName": "NVIDIA Ising量子AI模型 (NVIDIA Ising Quantum AI Model)",
      "year": "2026",
      "org": "NVIDIA",
      "parent": "—",
      "paperUrl": "https://nvidianews.nvidia.com/news/nvidia-ising-open-source-quantum-ai-models",
      "projectUrl": "",
      "category": "quantum_hybrid",
      "motivation": "AI优化量子纠错实现微秒级混合控制",
      "summary": "NVIDIA Ising 提出了面向量子计算的 AI 模型族与训练框架，包含基于 MoE VLM 的量子校准模型（Ising Calibration 1）和基于 3D CNN 的表面码预解码器（Ising Decoder SurfaceCode 1），分别在量子处理器校准和量子纠错解码两大关键任务上超越现有最优方案，结合 NVQLink GPU-QPU 耦合架构实现微秒级实时混合量子-经典控制。",
      "keyPoints": [
        "<strong>模型族三大组件</strong>：Ising Calibration 1（校准 VLM）、Ising Decoder SurfaceCode 1 Fast（快速解码器）、Ising Decoder SurfaceCode 1 Accurate（精确解码器），覆盖量子计算从校准到纠错的全流程",
        "<strong>校准模型</strong>：基于 Qwen3.5-35B-A3B 的 MoE VLM（~35B 总参数，~3B 活跃/token，256 专家取 8），在 QCalEval 基准上零样本平均分 74.7，超越 Gemini 3.1 Pro（+3.27%）、Claude Opus 4.6（+9.68%）、GPT 5.4（+14.5%）",
        "<strong>QCalEval 基准</strong>：首个量子校准图理解 VLM 基准，243 样本 × 87 场景类型 × 22 实验族，覆盖超导量子比特与中性原子，6 类问题",
        "<strong>3D CNN 预解码器架构</strong>：轻量级 3D 卷积网络处理时空综合征体积，Fast 版（912K 参数，R=9）实现 2.5× 快于 PyMatching 且精度提升 1.1×；Accurate 版（1.79M 参数，R=13）实现 2.3× 快且精度提升 1.5×",
        "<strong>训练框架</strong>：利用 cuQuantum cuStabilizer 高效生成 SI1000 去极化噪声训练数据，结合 PyTorch 训练，支持量化部署",
        "<strong>NVQLink 集成</strong>：通过 GH200 Grace Hopper + ConnectX-7 RDMA/RoCE 实现 GPU-QPU 耦合，平均延迟 3.84μs（&lt;4μs），支持 CUDA-Q QEC 实时解码",
        "<strong>Quantinuum Helios 实证</strong>：Bring 码 qLDPC 编码（30 物理比特编码 8 逻辑比特），BP+OSD 解码器中位延迟 67μs，错误率改善 5.4×"
      ],
      "detail": "<h5>系统架构总览</h5>\n<p>NVIDIA Ising 是一个完整的 AI-for-Quantum 技术栈，解决量子计算走向容错的两大核心挑战：<strong>量子处理器校准</strong>（QPU Bring-up）和<strong>量子纠错解码</strong>（QEC Decoding）。</p>\n<pre><code>┌─────────────────────────────────────────────────────────────┐\n│                    NVIDIA Ising 技术栈                        │\n├─────────────────────┬───────────────────────────────────────┤\n│   Ising Calibration │          Ising Decoding               │\n│                     │                                       │\n│  ┌───────────────┐  │  ┌─────────────┐  ┌───────────────┐  │\n│  │ Calibration 1 │  │  │ Decoder     │  │ Decoder       │  │\n│  │ (MoE VLM)     │  │  │ Fast 912K   │  │ Accurate 1.8M │  │\n│  │ Qwen3.5-35B   │  │  │ 4-layer CNN │  │ 6-layer CNN   │  │\n│  │ -A3B base     │  │  │ R=9         │  │ R=13          │  │\n│  └───────┬───────┘  │  └──────┬──────┘  └───────┬───────┘  │\n│          │          │         │                  │          │\n│  ┌───────▼───────┐  │  ┌──────▼──────────────────▼──────┐  │\n│  │ Agentic       │  │  │ cuQuantum cuStabilizer         │  │\n│  │ Workflow      │  │  │ + PyTorch Training Framework    │  │\n│  │ (QPU Bring-up)│  │  │ (SI1000 Noise Model)           │  │\n│  └───────────────┘  │  └───────────────┬────────────────┘  │\n├─────────────────────┴─────────────────┬─┘                   │\n│                                       │                     │\n│  ┌────────────────────────────────────▼──────────────────┐  │\n│  │          CUDA-Q QEC Runtime + NVQLink                 │  │\n│  │   GH200 Grace Hopper ←─ RDMA/RoCE (&lt;4μs) ─→ QPU     │  │\n│  │              ConnectX-7 SmartNIC                       │  │\n│  └───────────────────────────────────────────────────────┘  │\n└─────────────────────────────────────────────────────────────┘\n</code></pre>\n<h5>1. Ising Calibration 1：量子校准视觉语言模型</h5>\n<p><strong>动机与背景</strong>：量子处理器校准依赖于解读实验数据图（校准图），这是量子硬件 bring-up 和重调校的核心环节。传统方法依赖人类专家逐图判读，效率低下且难以规模化。通用 VLM（如 GPT、Gemini、Claude）虽然具备图像理解能力，但在量子校准这一专业领域表现不佳。</p>\n<p><strong>模型架构</strong>：</p>\n<ul>\n<li><strong>基座模型</strong>：Qwen3.5-35B-A3B（Mixture-of-Experts）</li>\n<li><strong>参数规模</strong>：~35B 总参数，~3B 活跃参数/token</li>\n<li><strong>专家配置</strong>：256 个专家，每 token 激活 8 个</li>\n<li><strong>架构类型</strong>：集成视觉编码器 + MoE 语言模型的自回归文本生成</li>\n</ul>\n<p><strong>训练方法论</strong>：</p>\n<p>采用两阶段监督微调（SFT）策略：</p>\n<pre><code class=\"language-python\"># Ising Calibration 1 训练流程伪代码\n# Phase 1: ICL-formatted SFT (In-Context Learning 格式)\nphase1_data = load_icl_formatted_entries(n=23800)  # 23.8K ICL格式样本\nmodel = load_pretrained(&quot;Qwen3.5-35B-A3B&quot;)\n\nfor epoch in range(num_epochs_phase1):\n    for batch in phase1_data:\n        # 每个样本包含: 示例校准图+问答对 → 目标校准图+问题\n        images, context_qa, target_question = batch\n        loss = model.forward(images, context_qa, target_question)\n        optimizer.step(loss)\n\n# Phase 2: Zero-shot-formatted SFT (零样本格式)\nphase2_data = load_zeroshot_formatted_entries()\nfor epoch in range(num_epochs_phase2):\n    for batch in phase2_data:\n        # 直接: 校准图 + 问题 → 答案\n        image, question, answer = batch\n        loss = model.forward(image, question, answer)\n        optimizer.step(loss)\n</code></pre>\n<div class=\"key-point\">💡 <strong>关键发现</strong>：零样本格式和 ICL 格式的微调分别提升不同能力——没有单一训练配方能同时改善所有任务，尤其是开放式分析任务。</div>\n<p><strong>QCalEval 基准详情</strong>：</p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>问题类型</th>\n<th>Ising Calibration 1</th>\n<th>Qwen3.5-35B 基座</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>Q1 技术描述</td>\n<td><strong>87.8</strong></td>\n<td>86.8</td>\n</tr>\n<tr>\n<td>Q2 实验结论</td>\n<td><strong>67.1</strong></td>\n<td>39.9</td>\n</tr>\n<tr>\n<td>Q3 实验意义</td>\n<td><strong>64.7</strong></td>\n<td>45.7</td>\n</tr>\n<tr>\n<td>Q4 拟合质量评估</td>\n<td><strong>90.5</strong></td>\n<td>52.7</td>\n</tr>\n<tr>\n<td>Q5 参数提取</td>\n<td><strong>62.5</strong></td>\n<td>57.8</td>\n</tr>\n<tr>\n<td>Q6 实验成功判定</td>\n<td><strong>75.3</strong></td>\n<td>50.6</td>\n</tr>\n<tr>\n<td><strong>总体平均</strong></td>\n<td><strong>74.7</strong></td>\n<td>55.5</td>\n</tr>\n</tbody>\n</table></div>\n<div class=\"warn-box\">⚠️ <strong>注意</strong>：评分由 GPT-5.4 和 Gemini-3.1-Pro 双评委平均得出。基准覆盖超导量子比特和中性原子两大主流量子硬件平台。</div>\n<p><strong>Agentic 工作流</strong>：Ising Calibration 1 可部署为量子校准 Agent，自动化 QPU bring-up 流程——输入实验工作流描述，Agent 调用 VLM 评估实验结果图，自主决策下一步校准操作。</p>\n<h5>2. Ising Decoder SurfaceCode 1：3D CNN 预解码器</h5>\n<p><strong>动机与背景</strong>：量子纠错（QEC）解码器需要同时满足三个约束：(1) 低延迟（微秒级），(2) 低逻辑错误率（LER），(3) 跨空间和时间可扩展以支持格手术（lattice surgery）操作。传统解码器如 PyMatching（基于最小权重完美匹配 MWPM）在精度和延迟之间存在权衡。此前没有机器学习预解码器能同时在这三个维度上取得突破。</p>\n<p><strong>3D CNN 架构</strong>：</p>\n<p>核心创新是将量子纠错综合征（syndrome）建模为 <strong>三维时空体积</strong>，使用 3D 卷积网络直接处理：</p>\n<pre><code>输入张量: (B, 4, T, D, D)\n  B = batch size\n  4 = 通道数 (综合征类型)\n  T = 时间步 (QEC 轮次)\n  D = 码距 (空间维度)\n\n┌─────────────────────────────────────────────────────────┐\n│              3D CNN Pre-Decoder Architecture              │\n│                                                          │\n│  Input (B,4,T,D,D)                                       │\n│      │                                                   │\n│      ▼                                                   │\n│  ┌──────────────────┐                                    │\n│  │ Conv3D(4→128)    │  kernel=3×3×3, same-padding        │\n│  │ + GELU + Dropout │                                    │\n│  └────────┬─────────┘                                    │\n│           │                                              │\n│  ┌────────▼─────────┐                                    │\n│  │ Conv3D(128→128)  │  × (L-2) layers                   │\n│  │ + GELU + Dropout │  Fast: L=4, Accurate: L=6         │\n│  └────────┬─────────┘                                    │\n│           │                                              │\n│  ┌────────▼─────────┐                                    │\n│  │ Conv3D(128→4)    │  最终层，无 Dropout                 │\n│  └────────┬─────────┘                                    │\n│           │                                              │\n│  Output (B,4,T,D,D) → 局部修正预测                        │\n└─────────────────────────────────────────────────────────┘\n</code></pre>\n<p><strong>感受野公式</strong>：</p>\n<div class=\"kb-math kb-math-display\">R = 1 + \\sum_{i=1}^{L} (k_i - 1)</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">L</span> 为层数，<span class=\"kb-math kb-math-inline\">k_i</span> 为第 <span class=\"kb-math kb-math-inline\">i</span> 层卷积核大小。对于 kernel=3 的情况：\n- Fast（4 层）：<span class=\"kb-math kb-math-inline\">R = 1 + 4 \\times 2 = 9</span>\n- Accurate（6 层）：<span class=\"kb-math kb-math-inline\">R = 1 + 6 \\times 2 = 13</span></p>\n<div class=\"key-point\">💡 <strong>设计直觉</strong>：same-padding 保证空间和时间维度在所有层中保持不变，使得预解码器可以为每个综合征位置输出局部修正，然后传递给下游标准解码器（如 PyMatching）进行最终解码。这种 <strong>预解码器 + 标准解码器</strong> 的级联设计既利用了 CNN 的速度优势，又保留了 MWPM 的理论保证。</div>\n<p><strong>模型对比</strong>：</p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>配置</th>\n<th>层数</th>\n<th>通道宽度</th>\n<th>参数量</th>\n<th>感受野</th>\n<th>延迟提升</th>\n<th>精度提升</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>Fast</td>\n<td>4</td>\n<td>4→128→128→128→4</td>\n<td>~912K</td>\n<td>R=9</td>\n<td><strong>2.5×</strong> vs PyMatching</td>\n<td><strong>1.1×</strong></td>\n</tr>\n<tr>\n<td>Accurate</td>\n<td>6</td>\n<td>4→128(×5)→4</td>\n<td>~1.79M</td>\n<td>R=13</td>\n<td><strong>2.3×</strong> vs PyMatching</td>\n<td><strong>1.5×</strong></td>\n</tr>\n</tbody>\n</table></div>\n<p><em>基准条件：d=13（码距），p=0.003（物理错误率），SI1000 去极化噪声模型</em></p>\n<p><strong>训练流程</strong>：</p>\n<pre><code class=\"language-python\"># Ising Decoder 训练框架伪代码\nimport cuquantum  # cuQuantum cuStabilizer 用于高效综合征采样\nimport torch\n\n# Step 1: 使用 cuStabilizer 生成训练数据\nnoise_model = SI1000_Depolarizing(distance=13, p_phys=0.003)\nsyndromes, corrections = cuquantum.custabilizer.sample(\n    noise_model, \n    num_samples=1_000_000,  # 大规模采样\n    num_rounds=13           # 时间步 = 码距\n)\n# syndromes shape: (N, 4, T, D, D)\n# corrections shape: (N, 4, T, D, D) — 局部 Pauli 修正标签\n\n# Step 2: PyTorch 训练\nmodel = IsingSurfaceCodeCNN(\n    in_channels=4, hidden=128, \n    num_layers=4,  # Fast 版\n    kernel_size=3, activation='gelu'\n)\n\nfor epoch in range(num_epochs):\n    for batch_syn, batch_corr in dataloader:\n        pred = model(batch_syn)  # (B, 4, T, D, D)\n        loss = F.binary_cross_entropy_with_logits(pred, batch_corr)\n        optimizer.zero_grad()\n        loss.backward()\n        optimizer.step()\n\n# Step 3: 量化 &amp; 部署\nquantized_model = quantize_fp16(model)\ndeploy_to_cuda_q_qec(quantized_model)  # 集成 CUDA-Q QEC 实时推理\n</code></pre>\n<div class=\"warn-box\">⚠️ <strong>关键</strong>：cuQuantum cuStabilizer 是训练数据生成的核心加速器——它利用 GPU 并行化稳定子模拟，使得百万级综合征样本的生成从小时级降至分钟级，这是大规模训练 QEC 解码器的前提条件。</div>\n<h5>3. NVQLink：GPU-QPU 微秒级耦合架构</h5>\n<p>实时 QEC 解码要求端到端延迟在量子比特退相干时间内完成。NVQLink 架构实现了 GPU 与 QPU 之间的超低延迟通信：</p>\n<pre><code>┌──────────────┐    RDMA/RoCE     ┌──────────────┐\n│   GH200      │◄────────────────►│    QPU       │\n│ Grace Hopper │    &lt;4μs 平均     │ (量子处理器)  │\n│              │    3.84μs 实测   │              │\n│ ┌──────────┐ │                  │ ┌──────────┐ │\n│ │GPU: H200 │ │                  │ │ 量子比特  │ │\n│ │(解码推理) │ │                  │ │ + 控制    │ │\n│ └──────────┘ │                  │ │ 电子学    │ │\n│ ┌──────────┐ │                  │ └──────────┘ │\n│ │ConnectX-7│ │                  │              │\n│ │SmartNIC  │ │                  │              │\n│ └──────────┘ │                  │              │\n└──────────────┘                  └──────────────┘\n</code></pre>\n<p><strong>Quantinuum Helios 实证</strong>：\n- <strong>编码方案</strong>：Bring 码 qLDPC（量子低密度奇偶校验码），30 物理量子比特编码 8 逻辑量子比特\n- <strong>解码器</strong>：BP+OSD（Belief Propagation + Ordered Statistics Decoding）\n- <strong>解码延迟</strong>：中位 67μs\n- <strong>错误率改善</strong>：5.4× 优于无纠错基线\n- <strong>意义</strong>：首次在真实量子硬件上演示 GPU 加速的实时 QEC 解码闭环</p>\n<h5>4. 与传统方法的对比</h5>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>维度</th>\n<th>传统方法</th>\n<th>NVIDIA Ising</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td><strong>校准</strong></td>\n<td>人工判读校准图 + 规则脚本</td>\n<td>VLM Agent 自动化判读与决策</td>\n</tr>\n<tr>\n<td><strong>解码精度</strong></td>\n<td>PyMatching (MWPM) 作为金标准</td>\n<td>3D CNN 预解码器 + PyMatching 级联，LER 降低 1.1-1.5×</td>\n</tr>\n<tr>\n<td><strong>解码延迟</strong></td>\n<td>PyMatching 基线</td>\n<td>2.3-2.5× 加速</td>\n</tr>\n<tr>\n<td><strong>可扩展性</strong></td>\n<td>解码器需针对每种码手工设计</td>\n<td>训练框架支持自定义噪声模型，一键训练</td>\n</tr>\n<tr>\n<td><strong>GPU-QPU 通信</strong></td>\n<td>传统 PCIe/网络，ms 级</td>\n<td>NVQLink RDMA，&lt;4μs</td>\n</tr>\n</tbody>\n</table></div>\n<div class=\"key-point\">💡 <strong>核心创新</strong>：Ising 的关键突破不在于单一模型的性能，而在于构建了 <strong>从数据生成（cuStabilizer）→ 模型训练（PyTorch）→ 实时部署（CUDA-Q QEC）→ 硬件集成（NVQLink）</strong> 的完整技术栈，使量子计算研究者无需机器学习专业知识即可利用 AI 加速量子纠错。</div>",
      "quiz": {
        "q": "NVIDIA Ising Decoder SurfaceCode 1 的 3D CNN 预解码器为什么采用 same-padding 设计？",
        "options": [
          "为了减少模型参数量，降低计算开销",
          "为了保持时空维度不变，使每个综合征位置都能输出局部修正，与下游标准解码器级联",
          "为了增大感受野，捕获更远距离的量子比特关联",
          "为了兼容不同码距的表面码，实现零样本泛化"
        ],
        "answer": 1,
        "explain": "same-padding 保证输入输出的空间和时间维度一致，使预解码器能为每个综合征位置生成局部 Pauli 修正预测，这些修正随后传递给 PyMatching 等标准解码器进行最终解码，实现精度和速度的双重提升。"
      }
    }
  ],
  "categories": {
    "gpu_architecture": {
      "label": "GPU架构演进",
      "color": "#4285F4"
    },
    "tpu": {
      "label": "Google TPU系列",
      "color": "#34A853"
    },
    "npu_asic": {
      "label": "NPU与专用AI芯片",
      "color": "#EA4335"
    },
    "emerging_chips": {
      "label": "新兴AI芯片架构",
      "color": "#FF6D01"
    },
    "pim_cim": {
      "label": "存算一体",
      "color": "#AB47BC"
    },
    "dataflow": {
      "label": "数据流与脉动阵列",
      "color": "#00ACC1"
    },
    "interconnect": {
      "label": "互联技术",
      "color": "#78909C"
    },
    "hw_sw_codesign": {
      "label": "硬件-软件协同",
      "color": "#FFB300"
    },
    "fpga": {
      "label": "FPGA加速器",
      "color": "#8D6E63"
    },
    "efficiency": {
      "label": "能效优化",
      "color": "#66BB6A"
    },
    "photonic": {
      "label": "光计算",
      "color": "#E91E63"
    },
    "chiplet": {
      "label": "Chiplet与封装",
      "color": "#795548"
    },
    "llm_inference": {
      "label": "大模型推理硬件",
      "color": "#F44336"
    },
    "quantum_hybrid": {
      "label": "量子-经典混合",
      "color": "#9C27B0"
    }
  },
  "projectUrls": {}
};
