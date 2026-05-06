# 知识文档写作规范（Document Spec v2.0）

> 本规范定义了一个「二级标签页面」（topic page，例如 `LLM / 强化学习`、`具身智能 / VLA`）所对应的**源知识文档**应当以怎样的格式编写，
> 以保证通过 `pipeline/build.py` 稳定地编译为一致风格的前端页面。
>
> 设计哲学：**Agent 只生产"数据"，不生产"代码"**。文档是唯一信息源（Single Source of Truth），模板与渲染逻辑固化在平台侧。

---

## 0. 总览：一篇合格的知识文档 = YAML Front-Matter + 三大板块

```
┌─────────────────────────────────────────────────────┐
│  1. YAML Front-Matter (元信息 / 顶部)                │
│     - 标签体系、标题、图标、关键统计、路线类别定义      │
├─────────────────────────────────────────────────────┤
│  2. ## 领域综述 (必填)                               │
│     - 3~5 段，每段一个 ### 小标题                     │
├─────────────────────────────────────────────────────┤
│  3. ## 算法演化关系 (必填)                           │
│     - YAML 代码块：定义节点坐标 + 继承边              │
├─────────────────────────────────────────────────────┤
│  4. ## 核心算法 (必填，最重要！)                     │
│     - 每个算法一个 ### 条目，用 YAML 元信息 + 结构化  │
│       小节描述（核心要点 / 深入细节 / 练习题）         │
└─────────────────────────────────────────────────────┘
```

编译后的二级标签页面在**首屏**向用户展示两个入口卡片，由用户自行选择进入哪个视图：

```
┌────────────────────────────┐    ┌────────────────────────────┐
│  📌 领域综述                 │    │  🚀 最新进展                 │
│  • 领域综述（板块 2）          │    │  按时间「从新到旧」列出核心算法   │
│  • 算法演化时间线（板块 4→排序） │    │  每个算法支持                  │
│  • 算法演化图谱（板块 3）       │    │   - 核心要点  / 深入细节 切换   │
└────────────────────────────┘    └────────────────────────────┘
```

---

## 1. YAML Front-Matter（文档最顶部）

```yaml
---
# ============ 分类 ============
domain: llm              # 一级标签 id，必须来自固定枚举见 §6
topic_id: rlvr           # 二级标签 id（小写字母数字，将作为 URL：pages/llm/rlvr.html）
topic_name: 强化学习 (RLVR)  # 面包屑 / 卡片上显示的名字

# ============ 页面头 ============
page_icon: "🎯"
page_title: "大模型 RL 算法总结"
page_subtitle: "{build_date} 版"   # 可选；支持 {build_date} 占位符，编译时自动替换为当天日期；留空则默认 "YYYY-MM-DD 版"
page_desc: "回顾 PPO、DPO、GRPO… 的发展历程，系统梳理大模型强化学习从经典到前沿的技术演化。"
hero_pills:                      # 右上 meta 胶囊；支持纯文本
  - "📅 2026 年 3 月"
  - "🏷️ RLVR · RLHF · Policy Optimization"
# 注意：{count} 占位符会被替换为"核心算法"板块的条目数
count_pill: "{count} 个算法"

# ============ 资源路径 ============
image_base: "../../assets/images/rl/大模型 RL 算法总结（2026.03版）  -"
# ↑ detail 里写的 ![](xxx.png) 会被编译为 <img src="{image_base}xxx.png">

# ============ 路线/分类体系 (定义筛选器与图谱着色) ============
# 每个 key 是内部 id；每条记录包含中文名 + 颜色 (hex)
categories:
  foundation:  { label: "奠基算法", color: "#22a06b" }
  core:        { label: "核心改进", color: "#5b63d3" }
  specialized: { label: "特化优化", color: "#e8820c" }
  arch:        { label: "架构专用", color: "#0891b2" }
# categories 顺序 = 筛选 chip 顺序；最多 6 个类别
---
```

**规则**：

- 一级领域 `domain` 必须是 §6 的合法枚举，否则编译失败（防止出现野生分类）。
- `topic_id` 决定输出文件名；同一 `domain` 下必须全局唯一。
- `categories` 至少 1 条，至多 6 条；后面每个算法的 `category` 字段必须是这里定义过的 key。

> **v2.0 变更**：移除 `compare_dimensions` / `compare_table_columns` 字段（算法对比板块已下线）。旧文档保留这两个字段不会报错，但不会被使用。

---

## 2. 领域综述 (板块 2)

```markdown
## 领域综述

### 一、从 RLHF 到 RLVR：大模型强化学习的范式演进
强化学习（RL）在大语言模型（LLM）训练中的应用经历了三个关键阶段。**第一阶段（2017–2022）**……

### 二、后 GRPO 时代的挑战与解决方案
GRPO 虽然简化了 PPO 的流程，但自身也暴露出一系列系统性问题……

- **训练稳定性**：GRPO 存在熵坍塌…
- **优势估计偏差**：Dr.GRPO 发现…

### 三、发展趋势与未来方向
纵观 RLVR 领域的发展脉络……
```

**规则**：

- 板块标题必须一字不差等于 `## 领域综述`。
- 内部用 `### 一、xxx` 分小节，**建议 3~5 个小节，每节 1~3 段**。
- 支持 Markdown 加粗、列表、行内公式（`\\(...\\)`）、行间公式（`$$...$$`）。
- 编译器会把每个 `###` 小节渲染为「领域综述」视图内的一块 `<section>`。

---

## 3. 算法演化关系 (板块 3)

```markdown
## 算法演化关系

\`\`\`yaml
# 节点坐标用虚拟坐标系（左上角为原点，x 向右 y 向下），编译时自动等比缩放。
# id 必须对应板块 4 中某个算法的 id
nodes:
  - { id: ppo,    x: 150, y: 80,  category: foundation }
  - { id: dpo,    x: 60,  y: 220, category: foundation }
  - { id: grpo,   x: 330, y: 220, category: core }
  - { id: dapo,   x: 160, y: 340, category: core }
  # ...

edges:
  - { from: ppo,  to: dpo,    label: "简化流程" }
  - { from: ppo,  to: grpo,   label: "移除 Value Model" }
  - { from: grpo, to: dapo,   label: "解决不稳定" }
  # ...

# 奠基节点（会被渲染得更大，作为"锚点"，可选）
milestones: [ppo, grpo]
\`\`\`
```

**规则**：

- 该板块只有 **一个 yaml 代码块**，不许再有其他内容。
- `nodes[].id` 必须全部出现在板块 4；否则编译失败并给出"缺失算法"列表。
- 虚拟坐标只需保证布局相对合理，编译器会把它映射到容器真实尺寸。
- `edges[].label` 为边上的标注，简短概括"为什么产生这一次演进"。

---

## 4. 核心算法 (板块 4，最重要)

### 4.1 每个算法一个 `###` 条目

```markdown
## 核心算法

### PPO · 近端策略优化 (Proximal Policy Optimization)

\`\`\`yaml
id: ppo                    # 必填，小写英数，全文档唯一
num: 1                     # 显示序号（建议按时间升序 1,2,3...）
name: PPO
full_name: "近端策略优化 (Proximal Policy Optimization)"
year: "2017"               # 允许 "2017" 或 "2024.02" 或 "2025.03"
                           # ⚠️ 格式必须可按字符串排序后仍呈时间序
org: OpenAI                # 发布机构
parent: "—"                # 继承自哪个算法，无则写 "—"
paper_url: "https://arxiv.org/abs/1707.06347"
project_url: "https://openai.com/index/openai-baselines-ppo/"   # 可选
category: foundation       # 必须是 front-matter 里 categories 的 key
motivation: "用裁剪目标函数约束策略更新幅度，RLHF 奠基算法"    # 显示在「核心要点」顶部的动机条
\`\`\`

#### 📝 一句话总结
PPO 是 RLHF 的代表算法，核心创新是用裁剪目标函数来约束策略更新幅度。

#### 🎯 核心要点
- 涉及 4 个模型：Policy Model、Value Model、Reward Model、Reference Model
- 4 个流程：Reward Modeling → Rollout → Evaluation → Optimization
- 裁剪机制：通过 \(\text{clip}(\text{ratio}, 1-\varepsilon, 1+\varepsilon)\) 限制新旧策略概率比
- KL 散度约束 Reference Model 和 Policy Model 分布差异
- Value Model 用于 GAE 计算优势函数

#### 🔬 深入细节

##### 1. PPO 涉及的 4 个模型
![PPO 4 个模型](PPOALL.png)
- **Reference Model**：参数冻结的 SFT 模型初始化……
- **Reward Model**：评估 policy_model 生成的响应……

##### 2. PPO 目标函数
$$J_{PPO}(\theta) = \mathbb{E}\left[\min\left(\frac{\pi_\theta(a|s)}{\pi_{\theta_{\text{old}}}(a|s)} A,\; \text{clip}(\cdot, 1-\epsilon, 1+\epsilon) A\right)\right]$$

其中 \(\frac{\pi_\theta(a|s)}{\pi_{\theta_{\text{old}}}(a|s)}\) 为重要性采样比率。

#### 🧪 练习题 (可选，省略则此算法无 quiz)
\`\`\`yaml
question: "PPO 中裁剪机制的核心目的是什么？"
options:
  - "加速训练收敛速度"
  - "限制新旧策略的概率比，防止策略更新幅度过大"
  - "减少 GPU 内存占用"
  - "增加探索多样性"
answer: 1                          # 从 0 开始的索引
explain: "裁剪机制的核心目的是限制新旧策略的概率比在 \\([1-\\varepsilon, 1+\\varepsilon]\\) 范围内，保证训练稳定性。"
\`\`\`
```

### 4.2 小节与字段含义速查表

| 小节（必须用这个标题）     | 含义                   | 可省略 | 编译去向                                   |
|---------------------------|------------------------|--------|--------------------------------------------|
| 开头 yaml 代码块            | 算法元信息              | 否     | 顶部徽章 / 时间线卡片                        |
| `#### 📝 一句话总结`         | 长不超过 2 句         | 否     | 时间线卡片摘要、核心要点首段                 |
| `#### 🎯 核心要点`           | 3–6 条无序列表         | 否     | 「核心要点」模式下的 bullet 列表            |
| `#### 🔬 深入细节`           | 任意 Markdown          | 可     | 「深入细节」模式下的完整内容；**支持 `##### 小标题`**  |
| `#### 🧪 练习题` yaml 块     | 一道四选一             | 可     | 「深入细节」模式底部 Quiz                    |

> **v2.0 变更**：移除 `#### ⚖️ 对比维度` 小节（算法对比板块已下线）。旧文档保留该小节不会报错，但不会被使用。

### 4.3 深入细节的写作约定

- **图片**：`![caption](xxx.png)` 会被编译为带说明的 `<img>`；路径相对 `image_base`。
- **公式**：KaTeX 语法，`$$...$$` 为行间，`\(...\)` 为行内；**反斜杠在 YAML 中请写 `\\(`**。
- **表格**：标准 Markdown 表格即可。
- **高亮块**：用 `> ⚠️ 注意：xxx` 会编译为黄色告警；`> 💡 关键：xxx` 会编译为蓝色 key-point。

### 4.4 时间线排序约定

- 领域综述视图中的**时间线**按 `year` **升序**（从早到晚）；
- 最新进展视图中的**算法列表**按 `year` **降序**（从新到旧）；
- 因此 `year` 字段必须保证"字符串排序"=="时间排序"，推荐统一写成 `"YYYY"` 或 `"YYYY.MM"`。

---

## 5. 一级领域枚举 (domain 字段必须来自以下之一)

| id            | 名称            | 输出目录              |
|---------------|-----------------|-----------------------|
| `ml`          | 机器学习        | `pages/ml/`           |
| `cv`          | 计算机视觉      | `pages/cv/`           |
| `llm`         | 大语言模型 (LLM)| `pages/llm/`          |
| `multimodal`  | 多模态          | `pages/multimodal/`   |
| `aigc`        | AIGC            | `pages/aigc/`         |
| `embodied`    | 具身智能        | `pages/embodied/`     |
| `infra`       | AI Infra        | `pages/infra/`        |
| `ai4sci`      | AI4SCI          | `pages/ai4sci/`       |

新增一级领域 = 修改 `pipeline/schema/domains.yml` + 首页 `index.html` 入口，不在此文档职责范围。

---

## 6. 命令行编译流程

```bash
# 1. 把文档放到约定位置
cp my_rl_report.md content/LLM/RL/

# 2. 编译（生成 data.js + copy 模板 html + logic.js）
python3 pipeline/build.py content/LLM/RL/my_rl_report.md

# 可选：把某些本地图片一并拷贝到 assets/images/<topic_id>/
python3 pipeline/build.py content/LLM/RL/my_rl_report.md --copy-images

# 编译完成后将输出
#   pages/llm/rlvr.html              ← 页面入口（视图选择屏）
#   pages/llm/rlvr-data.js           ← 编译产物（数据）
#   pages/llm/rlvr-logic.js          ← 从模板拷贝（通用渲染逻辑）
```

编译器会做严格校验，常见错误会以红色提示中断：
- `domain` 不在枚举内
- 图谱中的 id 没有对应算法 → 报错并列出缺失 id
- 算法的 `category` 不是 `categories` 声明过的 key
- 某个算法缺少 `#### 📝 一句话总结` 或 `#### 🎯 核心要点`

---

## 7. 最小 checklist（给 Agent 的硬性要求）

✅ 文档顶部有且只有一个 YAML Front-Matter，字段齐全且类型正确
✅ `## 领域综述` 标题一字不差，下属 `###` 小节至少 3 个
✅ `## 算法演化关系` 下有且仅有一个 yaml 代码块，nodes/edges 覆盖所有算法
✅ `## 核心算法` 每个算法严格包含："开头 yaml + 📝 一句话总结 + 🎯 核心要点"（🔬 深入细节 / 🧪 练习题 可选）
✅ 每个算法的 `year` 字段格式统一，保证字符串排序即为时间排序
✅ 所有引用的本地图片都存在（编译器会校验）
✅ 所有交叉引用 id（parent / edges / nodes / category）都能闭合

---

## 8. v2.0 迁移说明（相对 v1.0）

| 变更 | 说明 |
|---|---|
| ❌ 移除「算法对比」板块 | 页面不再有 `⚖️ 算法对比` tab / 表格 / 两两对比 |
| ❌ 移除 `compare_dimensions` | front-matter 中的这个字段将被忽略 |
| ❌ 移除 `compare_table_columns` | front-matter 中的这个字段将被忽略 |
| ❌ 移除 `#### ⚖️ 对比维度` | 每个算法下的这个子小节不再必填，存在也会被忽略 |
| ❌ 移除 `## 附录` | 整个板块已下线，不再渲染；文档中可删除该板块 |
| ✨ 新增 首屏视图选择 | 进入二级页面后先展示两个入口卡片：领域综述 / 最新进展 |
| ✨ 新增 最新进展视图 | 算法按 `year` **降序** 展示（从新到旧） |
