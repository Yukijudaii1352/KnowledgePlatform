# 领域算法调研与演化关系构建

**角色**：Deep Research Agent  
**目标**：根据给定的三级信息，自主检索并筛选关键算法，补全所有页面元数据，输出结构化的演化关系图谱 YAML。

---

## 一、输入（用户提供）

| 字段 | 说明 | 示例 |
|------|------|------|
| `domain` | 一级领域 id | `llm` |
| `topic_id` | 二级标签 id | `rlvr` |
| `topic_name` | 二级标签显示名称 | `强化学习 (RLVR)` |
| `search_scope` | 领域描述与边界 | `大语言模型后训练阶段的强化学习算法` |

---

## 二、输出：`{topic_id}.yaml`

该文件必须严格遵循以下结构，包含所有未来渲染所需的 Front-Matter 及图谱数据。

```yaml
# ==================== 页面元信息（用户提供） ====================
domain: llm
topic_id: rlvr
topic_name: 强化学习 (RLVR)
# --- 下面全部自行设计 ---
page_icon: "🎯"
page_title: "大模型 RL 算法总结"
page_subtitle: "{build_date} 版"          # 固定使用 {build_date} 占位符
page_desc: "回顾 PPO、DPO、GRPO… 的发展历程，系统梳理大语言模型强化学习从经典到前沿的技术演化。"
hero_pills:
  - "🏷️ RLVR · RLHF · Policy Optimization"
count_pill: "{count} 个算法"              # 固定写法，{count} 会被替换

# ==================== 分类体系（自行设计） ====================
categories:
  foundation:  { label: "奠基算法", color: "#22a06b" }
  core:        { label: "核心改进", color: "#5b63d3" }
  specialized: { label: "特化优化", color: "#e8820c" }

# ==================== 算法元信息（每一项对应一个核心算法） ====================
algorithms:
  - id: ppo
    name: PPO
    full_name: "近端策略优化 (Proximal Policy Optimization)"
    year: "2017"
    org: OpenAI
    paper_url: "https://arxiv.org/abs/1707.06347"
    category: foundation
    parent: "—"                             # 无前身则填 "—"
    motivation: "用裁剪目标函数约束策略更新幅度，RLHF奠基算法"

  - id: dpo
    name: DPO
    full_name: "直接偏好优化 (Direct Preference Optimization)"
    year: "2023"
    org: Stanford
    paper_url: "https://arxiv.org/abs/2305.18290"
    category: core
    parent: "ppo"
    motivation: "无需训练奖励模型，直接通过偏好对优化策略"

# ==================== 图谱定义 ====================
graph:
  nodes:
    - { id: ppo,    x: 100, y: 80,  category: foundation }
    - { id: dpo,    x: 300, y: 80,  category: core }
    - { id: grpo,   x: 500, y: 80,  category: core }
    # ... 每个算法对应一个节点，id 必须与上面 algorithms 中的 id 一致
  edges:
    - { from: ppo,  to: dpo,    label: "简化流程" }
    - { from: ppo,  to: grpo,   label: "移除Value Model" }
    # ... 有向边，from/to 必须来自上述算法 id
  milestones: [ppo, grpo]  # 可选，2~3 个锚点
```

---

## 三、Agent 执行步骤

### 1. 生成页面元信息
基于 `topic_name` 和 `search_scope`，补全下列字段：

- **`page_icon`**：选择一个相关且简洁的 emoji（如 🎯 ⚙️ 🤖 🧪）。
- **`page_title`**：建议格式 `{topic_name} 算法总结` 或 `{主题} 技术演进`，中文为主。
- **`page_subtitle`**：一律写为 `"{build_date} 版"`，不要手动填数字。
- **`page_desc`**：概括该技术线的发展脉络与核心问题。
- **`hero_pills`**：1~2 个标签串，用 `·` 串联领域关键词，如 `"🏷️ RLHF · Alignment"`。
- **`count_pill`**：永远写 `"{count} 个算法"`，不要手动填数字。

### 2. 文献检索与筛选
- 检索策略：
  - 先找高被引综述或奠基论文。
  - 沿引用链扩展：向前追溯（奠基工作）、向后追踪（后续改进）。
  - 关注顶会/顶刊（NeurIPS, ICML, ICLR, ACL, EMNLP 等）和重要机构的技术报告（OpenAI、Google、DeepSeek、Qwen、Kimi、MiniMax等）。
- 记录每篇候选论文的：标题、、发表时间、机构、论文链接。

### 3. 构建分类体系
- 将所有算法按**技术范式**或**发展阶段**分组，例如：
  - `foundation`：开创性工作
  - `core`：引发广泛跟随的核心改进
  - `specialized`：针对特定问题的优化
  - xx技术路线
- 为每一类指定一个视觉颜色（hex）。颜色彼此应有辨识度，避免与其它领域默认色冲突。
- 每条算法分配一个 `category`。

### 4. 填写算法元信息
对于每一个入选算法，按以下约定填写：

| 字段         | 要求                                                         |
| ------------ | ------------------------------------------------------------ |
| `id`         | 小写英文简写，全文档唯一（如 `ppo`, `grpo`, `dpo`）          |
| `name`       | 算法常用简称（如 `PPO`）                                     |
| `full_name`  | 中文全称（若原文无中文名可直译，格式 `中文名 (English Name)`） |
| `year`       | 统一为 `YYYY` 或 `YYYY.MM`，确保字符串排序就是时间顺序       |
| `org`        | 第一单位或核心贡献机构                                       |
| `paper_url`  | 优先 arXiv 稳定链接                                          |
| `category`   | 必须是上面 categories 定义过的 key                           |
| `parent`     | 若该算法是某个前身工作的直接改进，填前身 `id`，否则填 `"—"`。**禁止留空** |
| `motivation` | **一句话**（不超过 30 字），直指该方法要解决的核心痛点或作出的标志性创新。避免笼统的“提升了性能”。 |

### 5. 构建演化关系
- 根据论文之间的 **直接关系** 建立有向边：
  - A 方法被 B 方法明确宣称改进/替代。
  - B 的理论基础或对比基线主要依赖 A。
- 每条边的 `label` 简短概括改进动机，≤8 个字，如“移除 Value Model”。
- 若难以确定方向性，可以暂时不连边，但确保核心演进路线清晰。
- 指定  `milestones`（通常是奠基或范式级算法），它们在图谱中将被高亮放大。

### 6. 图谱节点布局
- 使用虚拟像素坐标，遵循：
  - x 轴大致从左到右按**时间递进**（老算法 x 小，新算法 x 大）。
  - y 轴按**技术路线或类别**分层，同一类算法尽量在同一水平带。
- 只需接近实际比例即可，编译时会缩放。

### 7. 输出前自检
- [ ] `page_icon`、`page_title`、`page_desc`、`hero_pills` 均已自主生成，且风格一致。
- [ ] `categories` 定义的所有 key 都至少被一个算法使用，且所有算法的 `category` 都在该集合内。
- [ ] `algorithms` 与 `graph.nodes` 的 `id` 严格一一对应，无遗漏、无多余。
- [ ] `edges` 中的 `from` 和 `to` 均存在于 `algorithms`。
- [ ] 所有 `year` 格式统一，且可以字符串排序。
- [ ] 所有 `paper_url` 是有效的链接。
