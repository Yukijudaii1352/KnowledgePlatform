### WebAgent-R1: 端到端多轮网页代理强化学习 (WebAgent-R1)

```yaml
id: webagent_r1
name: WebAgent-R1
full_name: 端到端多轮网页代理强化学习 (WebAgent-R1)
year: '2025.05'
org: Amazon
paper_url: https://arxiv.org/abs/2505.16421
category: online_rl
parent: webrl
motivation: 用纯在线多轮RL直训网页代理
```

#### 📝 一句话总结
WebAgent-R1 提出首个面向 Web Agent 的端到端多轮强化学习框架 M-GRPO（Multi-turn GRPO），结合行为克隆初始化和动态上下文压缩，在 WebArena-Lite 上取得 SOTA，验证了 RL 在真实 Web 交互任务中的有效性。

#### 🎯 核心要点
1. **问题建模**：将 Web 交互建模为 POMDP（部分可观测马尔可夫决策过程），状态为 HTML 页面，动作为结构化函数调用（click、type、scroll 等）
2. **M-GRPO 算法**：将标准 GRPO（Group Relative Policy Optimization）扩展到多轮交互，按 trajectory 分组计算相对优势（group relative advantage），各轮 token 共享同组奖励
3. **动态上下文压缩**：历史交互序列急剧增长导致 KV-cache 爆炸，通过动态去除冗余 HTML（保留结构、裁剪内容）控制上下文窗口
4. **异步轨迹回滚**：并行启动 G 个独立浏览器实例生成多样化轨迹，每个实例维护独立的 cookie/上下文
5. **三阶段训练**：BC 初始化 → RL 探索精炼 → 策略稳定，BC 是 RL 成功的关键前提（不加 BC 直接 RL 甚至性能退化）
6. **Thinking Format 和 Test-time Scaling**：显式思考格式显著提升成功率，且多轮交互次数（而非单轮响应长度）是 test-time scaling 的有效维度

#### 🔬 深入细节
![WebAgent-R1 示意图](https://ar5iv.labs.arxiv.org/html/2505.16421/assets/x1.png)
*图：WebAgent-R1 的核心框架或评测示意。*

##### 1. 问题形式化：Web Agent 的 POMDP 建模

Web Agent 在每个时间步 t 接收环境的 HTML 观察 `o_t`，基于历史 `(o_1, a_1, ..., o_t)` 输出结构化动作 `a_t`。动作空间是预定义的函数调用集：
- `click(element_id)` — 点击指定元素
- `type(element_id, text)` — 在输入框填入文本
- `scroll(direction)` — 页面滚动
- `goto(url)` — 页面跳转
- `stop(answer)` — 任务完成并返回答案

任务被建模为有限视界 POMDP：`(S, A, O, T, Ω, R, γ, H)`，其中状态 s ∈ S 包含页面 DOM 和会话 cookie，转移函数 T 是确定性的（浏览器执行动作后返回新页面），观测函数 Ω 给出渲染后的 HTML。由于 cookie 携带部分不可观测的服务器端状态，问题本质上是部分可观测的。

关键设计：当前观测 `o_t` 是一个完整的 HTML 文档，可能包含数万 tokens。原始 HTML 直接拼接进 prompt 导致上下文爆炸，这是后续动态压缩要解决的核心痛点。

##### 2. M-GRPO：多轮 Group Relative Policy Optimization

M-GRPO 是 WebAgent-R1 的核心算法贡献，将 DeepSeek-R1 提出的单轮 GRPO 推广到多轮 Web 交互。

**标准 GRPO 回顾**：对于单轮生成任务，从旧策略采样 G 个响应 `{y_1, ..., y_G}`，对每个响应内的 token 使用 clipped importance sampling 优化：
```
A_i = (r_i - mean(r)) / std(r)   # group-relative advantage
L = -E[min(r_{i,t}(θ)·A_i, clip(r_{i,t}(θ), 1-ε, 1+ε)·A_i)] - β·D_KL
```

**M-GRPO 关键改造**：
- 每个 trajectory `τ_i = (a_{i,1}, a_{i,2}, ..., a_{i,|τ_i|})` 包含多轮动作
- 组内所有 trajectory 共享同一初始任务，并行生成
- **组内共享奖励**：trajectory τ_i 的最终二元奖励 r_i（成功=1，失败=0）分配给该 trajectory 内所有 token
- 每个动作内的 **token 级 PPO clip** 沿用 GRPO 形式，importance ratio `r_{i,j,t}(θ) = π_θ(a_{i,j,t}|q, a_{i,j,<t}) / π_old(...)`
- 组相对优势 `A_{i,j} = (r_i - mean(r)) / std(r)` **对整个 action 内的所有 token 共享**

伪代码：
```
for each training step:
    1. 采样 G 个任务，每个任务启动 G 个并行浏览器
    2. 每个浏览器独立与环境交互，生成 trajectory τ_i
    3. 计算每个 τ_i 的二元奖励 r_i
    4. 计算组内标准化优势 A_i = normalize({r_1,...,r_G})
    5. 对每个 τ_i 的每个 action 的每个 token，计算 PPO loss
    6. 加上 KL 惩罚项 -β·D_KL(π_θ || π_ref)
    7. 梯度下降更新策略
```

**与 WebRL/DigiRL 等 prior work 的关键区别**：
- WebRL (Qi et al., 2025) 采用离线 RL + 课程学习 + 奖励模型，需要训练一个 outcome reward model
- WebAgent-R1 使用规则化二元奖励（环境自带），无需奖励模型，简化训练流程
- 端到端优化整个多轮交互链，而非仅优化单步决策

##### 3. 动态上下文压缩（Dynamic Context Compression）

这是工程上最关键的设计。在 multi-turn Web 交互中，每轮 agent 看到的 prompt 包含：
```
[System Prompt] + [Task Instruction] + [Observation_1] + [Action_1] + [Observation_2] + [Action_2] + ...
```

假设单页 HTML 平均 5K tokens，10 轮交互后上下文膨胀至 50K+ tokens。在 RL 训练中，需要为 G 个 trajectory 的每个 token 存储 KV-cache，显存压力巨大。

**压缩策略**：
- 保留 HTML 的 **DOM 结构树**（tag hierarchy），删除样式属性、脚本、注释等冗余内容
- 对长文本内容（如 <p>、<span> 内部）进行截断，保留前 N 个字符 + 省略标记
- 对重复出现的导航栏、页脚等静态内容，在第二次出现时用 `<nav>...</nav>` 省略标记替代
- 关键操作目标（如按钮文字、链接文本）始终保留完整

这样将单页 HTML 从 5K-10K tokens 压缩至 1K-2K tokens，在保持语义信息的前提下大幅降低计算开销。压缩是可配置的（支持关闭以保留完整信息），论文报告在 RL 训练中启用压缩对性能影响轻微。

##### 4. 训练动态三阶段分析（Figure 3）

论文通过监控奖励、轨迹长度和交互轮次三个指标，揭示了 RL 训练的三个阶段：

**Phase 1 — 初始技能获取**：
- 奖励快速增长，模型迅速学会基础操作（如正确调用 click/type 函数、识别基本 HTML 元素）
- 轨迹长度（生成的 token 总数）急剧增加，说明从 BC 阶段的简短输出过渡到更详细的推理
- 交互轮次增加，agent 变得"更主动"
- 这一阶段最显著的特征是 **快速获得正向奖励**，从几乎随机行为快速收敛到能完成简单任务

**Phase 2 — 探索与策略精炼**：
- 奖励趋于平稳并有波动（而非持续单调增长），说明 agent 在尝试不同于 BC 数据的 novel strategies
- 轨迹长度稳定，交互轮次开始下降，agent 学会更高效地完成任务
- 这一阶段的奖励波动是 **健康的探索信号**，表明模型在跳出 BC 的行为分布，尝试 RL 特有的优化路径

**Phase 3 — 策略稳定**：
- 奖励再次缓慢上升，轨迹长度略有增长（可能是更精细的推理），交互轮次稳定
- 策略趋于收敛，exploration 减少，exploitation 增强合成高奖励策略

影响：Qwen2.5-3B 和 Llama3.1-8B 经历了相似的三阶段规律，表明 M-GRPO 的训练动态具有模型尺度的通用性。

##### 5. 消融研究：BC 是 RL 成功的必要条件

**WebAgent-R1-Zero**（跳过 BC 直接 RL）：
- 初始 SR = 6.1%（接近随机），RL 后甚至退化
- 原因：模型缺少对 Web 任务的基本理解，生成的动作不完整（缺少必需参数、元素 ID 不匹配），几乎得不到正向奖励 → 无法有效探索 → RL 退化
- 结论：**BC 提供的最小能力"基石"是 RL 有效探索的前提**

**WebAgent-R1-CoT**（BC 阶段加入长思维链数据）：
- 在 BC 阶段使用强推理模型生成 long-CoT 轨迹作为 SFT 数据
- BC-CoT 初始 SR = 24.5%（vs 普通 BC 的 20%），验证了思维链对 Web Agent 的增益
- 但 RL 增益较小：24.5% → 30.3%（+5.8%），vs WebAgent-R1 的 20% → 33.9%（+13.9%）
- 原因：long-CoT BC 中的确定性推理模式可能限制了 RL 的探索空间

##### 6. Thinking Format 与 Test-time Scaling（Table 3, Figure 5）

**Thinking Format**：在 prompt 中加入 `` 显式思考块，引导模型在动作选择前进行分析。

效果：
- o4-mini: 15.9% → 36.9%（+21%），提升最显著
- Qwen2.5-3B: 3.2% → 6.1%
- Llama3.1-8B: 4.8% → 8.5%
- 更强模型受益更多：思维格式释放了基础模型已有的推理能力

**关键发现 — 多轮交互作为 Test-time Scaling**：
- 单轮响应长度在 thinking format 下几乎不变（Qwen: 139→142 tokens）
- 但 **交互轮次大幅增加**（Qwen: 6→17 轮）
- 这表明 Web Agent 的 test-time scaling 不是"写更长的回答"，而是"与页面进行更多回合的观察-行动循环"
- Figure 5 进一步验证：增加最大交互轮次限制，prompting/SFT/RL 所有方法的成功率持续提升

##### 7. 主实验结果解读（Table 2）

| 方法 | Reddit | GitLab | CMS | Map | Shopping | 平均 SR |
|------|--------|--------|-----|-----|----------|---------|
| GPT-4o (prompt) | 10.5 | 10.0 | 20.0 | 20.0 | 11.1 | 13.9 |
| OpenAI-o3 (prompt) | 36.8 | 46.7 | 45.7 | 38.5 | 33.3 | 39.4 |
| BC (Qwen2.5-3B) | 42.1 | 16.7 | 22.9 | 26.9 | 11.1 | 20.0 |
| WebRL (Llama3.1-8B) | 63.2 | 46.7 | 54.3 | 36.7 | 31.1 | 42.4 |
| **WebAgent-R1 (Llama3.1-8B)** | 47.4 | 56.7 | 57.1 | 23.1 | **44.4** | **44.8** |

亮点：
- WebAgent-R1（8B）超越所有 prior work，包括 WebRL（42.4%）和 OpenAI-o3（39.4%）
- 在 Shopping 任务上 44.4% 对比 WebRL 的 31.1%，提升 13.3 个百分点
- 3B 模型（33.9%）超越 GPT-4o（13.9%）和 Qwen2.5-32B（16.9%），小模型+RL 胜过 32B 裸模型

#### 示意图
```
WebAgent-R1 训练流程:
┌──────────┐     ┌──────────────────┐     ┌─────────────────────┐
│  BC 阶段  │ ──> │  M-GRPO RL 阶段   │ ──> │  最终 WebAgent-R1    │
│(9,460条) │     │(647条训练任务)    │     │  (WebArena-Lite SOTA)│
└──────────┘     └──────────────────┘     └─────────────────────┘
                       │
            ┌──────────┼──────────┐
            ▼          ▼          ▼
      异步回滚    动态压缩   Group Advantage
      (G个浏览器) (HTML裁剪)  (组内标准化)
```

#### 🧪 练习题
```yaml
question: "WebAgent-R1 中 M-GRPO 采用 trajectory 组内相对优势，而不是对所有 rollout 全局归一化，最直接的原因是什么？"
options:
  - "为了让不同任务共享完全相同的奖励尺度，方便离线蒸馏"
  - "为了在同一任务的并行轨迹之间做相对比较，把最终成败稳定传播到整条多轮交互链"
  - "为了避免使用 KL 正则，因为全局归一化会与 KL 冲突"
  - "为了让每个 token 都拥有独立环境奖励，不再依赖最终结果"
answer: 1
explain: "M-GRPO 的关键是把同一任务下并行生成的多条 trajectory 放在一组内比较，再把组相对优势共享给该轨迹中的各轮 token，以适应多轮稀疏奖励场景。"
```
