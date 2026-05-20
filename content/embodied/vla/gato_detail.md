# Gato: A Generalist Agent — 论文精读报告

## 概要
- **标题**: A Generalist Agent
- **作者**: Scott Reed, Konrad Zolna, Emilio Parisoto 等 (DeepMind)
- **arXiv ID**: 2205.06175（注意：不是 2205.06250，后者是天文学论文！）
- **年份**: 2022
- **核心思想**: 单个大规模 Transformer 序列模型在多模态、多任务、多具身环境下训练「通才智能体」。同一网络、同一权重可玩 Atari、图像描述、聊天、用真实机械臂搭积木，根据上下文决定输出文本/关节力矩/按钮动作或其他 token。

## 1. 动机与目标
- 受大规模语言建模启发，构建超越纯文本输出的通用智能体。
- 单个序列模型：减少为每个领域手动设计策略模型；增加训练数据的数量和多样性；通过缩放 data/compute/model 持续扩展训练分布。
- 自然语言作为不同具身间的共同基础，解锁组合泛化。
- 当前操作点：1.2B 参数，可实时控制真实机器人。

## 2. 模型设计

### 2.1 Tokenization（数据序列化）
所有数据序列化为平坦 token 序列：
- **文本**: SentencePiece，32k 子词 → [0, 32000)
- **图像**: 16×16 patch（ViT 风格），像素归一化 [-1,1] 除 sqrt(16)=4
- **离散值**（Atari 按钮等）: 扁平整数 → [0, 1024)
- **连续值**（本体感觉、关节力矩）: 扁平化 → μ-law 编码到 [-1,1] → 离散化到 1024 bins → 偏移到 [32000, 33024)
- **序列顺序**: 文本原文序｜图像光栅序｜张量行主序｜嵌套结构 key 字母序｜episode 时间序｜每个时间步: 观察 token + 分隔符 + 动作 token

### 2.2 Embedding 与输出目标
- 参数化嵌入函数 `f(·; θ_e)`，按模态不同：
  - 文本/离散/连续/动作: lookup table + 局部位置编码（per-time-step）
  - 图像 patch: 单个 ResNet block 提取 patch 向量 + 图像内位置编码
- 自回归：每个 token 可作为给定前文的目标
- **仅文本和动作 token 参与损失计算**，图像和非文本观察被 mask 掉

### 2.3 架构
- **网络**: 1.2B 参数 decoder-only Transformer
  - 24 层 | 嵌入 2048 | FF 隐藏层 8196
- **Prompt conditioning**: 训练时 25% 序列前拼接成功示范 episode（半数为末尾目标条件，半数均匀采样）；评估默认使用成功示范

### 2.4 训练
- **损失函数**: 仅对文本和动作 token 计算交叉熵
  - `L(θ,B) = -∑_{b}∑_{l} m(b,l) log p_θ(s^(b)_l | s^(b)_1,...,s^(b)_{l-1})`
  - `m(b,l)=1` 当 token 为 text 或动作，否则 0
- **硬件/时间**: 16×16 TPU v3 | batch 512 | seq len 1024 | 1M steps | ≈4 天
- **数据混合**: 按域均匀采样 + 手动上调大/高质量数据集权重；从 episode 中随机截取 1024 token 子序列

### 2.5 部署
1. Prompt（示范前 1024 token）→ 初始序列
2. 环境观察 → token 化 → 追加
3. Gato 自回归逐 token 采样动作向量（由环境动作规范确定 token 数）
4. 解码动作 → 环境步进 → 新观察 → 重复
5. 上下文窗口 1024 token，始终看到完整历史；**部署时使用 Transformer XL 记忆**

## 3. 数据集
| 类别 | 任务数 | Episodes | 约 Tokens | 采样权重 |
|------|--------|----------|-----------|----------|
| 控制数据合计 | 596 | 63M | 1.5T | 85.3% |
| 视觉/语言合计 | — | — | — | 14.7% |

**控制环境**: DM Lab(254任务/194B)、ALE Atari(51)、BabyAI(46)、Meta-World(45)、Modular RL(38)、DM Control Suite(多种配置)、Procgen(16)、RGB Stacking(仿真+真机) 等
**视觉/语言**: MassiveText、M3W、ALIGN、COCO Captions、Conceptual Captions、VQAv2、OKVQA 等

## 4. 关键创新点
1. **统一 token 序列**: 所有模态和动作统一为 token，单一 Transformer 处理
2. **通才 + 多具身**: 同时具备语言、视觉、控制能力，覆盖 604 任务
3. **Prompt 而非 task ID**: 用成功示范作为 prompt 条件化任务，更灵活
4. **选择性损失**: 仅监督文本和动作 token，简化训练
5. **规模可行性**: 1.2B 参数下实时控制真实机器人，可随硬件提升扩展

## 5. 对 VLA 的启示
- Gato 是 **VLA（Vision-Language-Action）范式的先驱**，将视觉、语言、动作统一于序列模型
- Tokenization 策略（尤其是连续动作的离散化编码）和 prompt conditioning 深刻影响了 RT-1、RT-2、PaLM-E 等后续 VLA 模型
- 证明了大规模多任务训练可实现跨任务泛化，为通用具身智能铺路

## 6. ⚠️ 重要更正
- 网络上流传的 arXiv ID **2205.06250 实际是一篇天文学论文**（"The Gaia-ESO Public Spectroscopic Survey"），并非 Gato！
- **正确 ID: 2205.06175**，标题 "A Generalist Agent"
