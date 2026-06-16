---
domain: multimodal
topic_id: mm_agent
topic_name: 多模态Agent
page_icon: 🤖
page_title: 多模态Agent 技术演进图谱
page_subtitle: '{build_date} 版'
page_desc: 涵盖视觉-语言导航、GUI自动化、网页交互、具身智能和通用框架五大方向，从感知到决策、从单体到协作的完整技术演进脉络。
hero_pills:
- 🏷️ Multimodal · Embodied AI · GUI Automation · VLN
count_pill: '{count} 个算法'
categories:
  vln:
    label: 视觉语言导航
    color: '#3b82f6'
  gui:
    label: 图形界面智能体
    color: '#8b5cf6'
  web:
    label: 网页智能体
    color: '#06b6d4'
  embodied:
    label: 具身智能
    color: '#10b981'
  framework:
    label: 通用框架
    color: '#f59e0b'
  frontier_2026:
    label: 2026前沿
    color: '#ef4444'
publish: false
---

## 领域综述

### 待补充：阶段性领域总结
请补充一篇纵观一段时间以来的总结性文档，建议使用 `!INCLUDE_RAW path/to/article.md` 引入人工筛选后的 Markdown。

## 最新进展综述

### 待补充：最近一个月最新动向
请补充最近一个月该领域最新动向的综述文档，建议使用 `!INCLUDE_RAW path/to/article.md` 引入人工筛选后的 Markdown。

## 算法演化关系

```yaml
nodes:
- id: speaker_follower
  x: 2018
  y: 1
  category: vln
- id: envdrop
  x: 2019
  y: 1
  category: vln
- id: prevalent
  x: 2020
  y: 1
  category: vln
- id: vln_bert
  x: 2021
  y: 1
  category: vln
- id: hamt
  x: 2021
  y: 2
  category: vln
- id: appagent
  x: 2023
  y: 3
  category: gui
- id: cogagent
  x: 2024
  y: 3
  category: gui
- id: seeclick
  x: 2024
  y: 4
  category: gui
- id: uground
  x: 2025
  y: 4
  category: gui
- id: webgpt
  x: 2021
  y: 5
  category: web
- id: mind2web
  x: 2023
  y: 5
  category: web
- id: webarena
  x: 2023
  y: 6
  category: web
- id: rt1
  x: 2022
  y: 7
  category: embodied
- id: palm_e
  x: 2023
  y: 7
  category: embodied
- id: rt2
  x: 2023
  y: 8
  category: embodied
- id: vima
  x: 2023
  y: 9
  category: embodied
- id: roboflamingo
  x: 2024
  y: 9
  category: embodied
- id: openvla
  x: 2024
  y: 8
  category: embodied
- id: mm_react
  x: 2023
  y: 10
  category: framework
- id: llava_plus
  x: 2023
  y: 11
  category: framework
- id: qwen_agent
  x: 2024
  y: 11
  category: framework
- id: ui_voyager
  x: 2026
  y: 4
  category: frontier_2026
- id: dart_gui
  x: 2026
  y: 5
  category: frontier_2026
- id: aguvis
  x: 2025
  y: 3
  category: frontier_2026
- id: mobile_agent_v3_5
  x: 2026
  y: 3
  category: frontier_2026
- id: mind2web_2
  x: 2025
  y: 6
  category: frontier_2026
- id: webarena_verified
  x: 2026
  y: 6
  category: frontier_2026
- id: dynaweb
  x: 2026
  y: 7
  category: frontier_2026
- id: online_mind2web
  x: 2026
  y: 8
  category: frontier_2026
- id: openvla_2
  x: 2026
  y: 8
  category: frontier_2026
- id: reconvla
  x: 2026
  y: 9
  category: frontier_2026
- id: atomvla
  x: 2026
  y: 10
  category: frontier_2026
- id: sim2real_vla
  x: 2026
  y: 11
  category: frontier_2026
- id: box_chain_vla
  x: 2026
  y: 12
  category: frontier_2026
- id: janusvln
  x: 2026
  y: 2
  category: frontier_2026
- id: se_vln
  x: 2026
  y: 1
  category: frontier_2026
- id: indooruav
  x: 2026
  y: 0
  category: frontier_2026
- id: causalnav
  x: 2026
  y: -1
  category: frontier_2026
- id: riosworld
  x: 2025
  y: 13
  category: frontier_2026
- id: wasp
  x: 2025
  y: 14
  category: frontier_2026
- id: egoplan_bench2
  x: 2026
  y: 13
  category: frontier_2026
edges:
- from: speaker_follower
  to: envdrop
  label: 环境泛化
- from: envdrop
  to: prevalent
  label: 预训练范式
- from: prevalent
  to: vln_bert
  label: 循环Transformer
- from: vln_bert
  to: hamt
  label: 历史编码
- from: hamt
  to: janusvln
  label: 内存解耦
- from: janusvln
  to: se_vln
  label: 自进化
- from: se_vln
  to: indooruav
  label: UAV扩展
- from: indooruav
  to: causalnav
  label: 因果推理
- from: appagent
  to: cogagent
  label: 高分辨率
- from: cogagent
  to: seeclick
  label: 视觉定位
- from: seeclick
  to: uground
  label: 跨平台
- from: uground
  to: ui_voyager
  label: 自我蒸馏
- from: ui_voyager
  to: dart_gui
  label: 解耦RL
- from: dart_gui
  to: mobile_agent_v3_5
  label: 多智能体
- from: cogagent
  to: aguvis
  label: 纯视觉
- from: webgpt
  to: mind2web
  label: 跨域操作
- from: mind2web
  to: webarena
  label: 长程推理
- from: mind2web
  to: mind2web_2
  label: Agent评判
- from: webarena
  to: webarena_verified
  label: 评估修复
- from: webarena_verified
  to: dynaweb
  label: 模型RL
- from: mind2web_2
  to: online_mind2web
  label: 实时环境
- from: rt1
  to: palm_e
  label: LLM融合
- from: palm_e
  to: rt2
  label: VLA范式
- from: rt2
  to: vima
  label: 多模态提示
- from: vima
  to: roboflamingo
  label: 模仿学习
- from: rt2
  to: openvla
  label: 开源化
- from: openvla
  to: openvla_2
  label: 自适应推理
- from: openvla_2
  to: reconvla
  label: 注意力重建
- from: reconvla
  to: atomvla
  label: 子任务感知
- from: atomvla
  to: sim2real_vla
  label: Sim2Real
- from: sim2real_vla
  to: box_chain_vla
  label: 推理接口
- from: mm_react
  to: llava_plus
  label: 工具库
- from: llava_plus
  to: qwen_agent
  label: 原生多模态
milestones:
- hamt
- rt2
- ui_voyager
```

## 核心算法

### Speaker-Follower

```yaml
id: speaker_follower
num: 1
name: Speaker-Follower
full_name: 说话者-跟随者模型 (Speaker-Follower)
year: '2018'
org: Georgia Tech
parent: —
paper_url: https://arxiv.org/abs/1806.02724
project_url: ''
category: vln
motivation: 双智能体架构解决VLN数据稀缺问题
```

#### 📝 一句话总结
Speaker-Follower 提出“跟随者理解指令、说话者描述路线”的双模型框架，用 speaker 生成合成指令扩充 R2R 数据，并在推理时对候选路线做语义重排，缓解视觉语言导航中标注稀缺和指令歧义问题。

#### 🎯 核心要点
- **双向条件建模**：follower 学习 \(P_F(r\mid d)\)，根据自然语言指令 \(d\) 选择路线 \(r\)；speaker 学习 \(P_S(d\mid r)\)，根据路线生成或评估指令。
- **speaker-driven 数据增强**：先用人工路线-指令对训练 speaker，再从训练房屋采样新路线并生成合成指令，用 \(\mathcal{D}\cup\mathcal{S}\) 训练 follower。
- **pragmatic inference**：测试时 follower 搜索多个候选路线，speaker 评估“该路线能否解释原指令”，最终用 follower 分数和 speaker 分数联合排序。
- **全景动作空间**：把每个 Matterport 位置离散为 36 个视角，并直接在可通行邻居之间移动，减少低层旋转/俯仰动作带来的长序列误差。
- **历史影响**：该方法把 VLN 推向“生成式数据扩增 + 路线候选重排”的范式，后续 EnvDrop、PREVALENT 都继续沿用 speaker 合成数据或全景动作空间。

#### 🔬 深入细节
![Speaker-Follower 整体框架](https://ar5iv.labs.arxiv.org/html/1806.02724/assets/x2.png)

*图：Speaker-Follower 的三步流程：训练 speaker、用 speaker 合成新指令训练 follower、在推理时用 speaker 对候选路线进行重排。*

论文的核心判断是：R2R 这类 VLN 数据集的人工标注路线-指令对很少，而自然语言指令只描述若干高层地标和决策点，不会逐帧告诉 agent 如何转头和走路。若只训练单个 seq2seq follower，模型很容易记住训练房屋里的视觉共现，而不是学会“这句指令为什么对应这条路径”。Speaker-Follower 因此把导航看作路线搜索问题：先让 follower 产生可能路线，再让 speaker 反向判断哪条路线最像原指令所描述的路线。

follower 是指令到路线的条件策略模型。给定指令 \(d=(w_1,\ldots,w_L)\)，LSTM 编码器得到语言上下文；解码时 agent 在当前全景观察和可达邻居中选择动作。若第 \(t\) 步候选动作 \(j\) 的视觉-方向表示为 \(u_{t,j}\)，解码状态为 \(h_t\)，可用双线性打分表示动作概率：

$$
y_{t,j}=(W_h h_t)^\top W_u u_{t,j},\qquad
P_F(a_t=j\mid d,r_{<t})=\frac{\exp(y_{t,j})}{\sum_k \exp(y_{t,k})}.
$$

这个动作空间不是早期 embodied agent 常见的“左转、右转、前进、抬头、低头”，而是直接移动到当前节点可见且可通行的邻接节点。这样做牺牲了一部分低层控制粒度，但与人类 R2R 指令的粒度更匹配：指令通常说“穿过门”“走到楼梯底部左转”，而不是规定每次转多少度。

speaker 是反向条件模型 \(P_S(d\mid r)\)。训练阶段，它在人工数据 \(\mathcal{D}=\{(d_i,r_i)\}_{i=1}^N\) 上学习“给定视觉路线生成自然语言指令”；随后从训练环境中采样额外路线 \(\hat r_1,\ldots,\hat r_M\)，由 speaker 生成 \(\hat d_i\)，形成合成集 \(\mathcal{S}=\{(\hat d_i,\hat r_i)\}_{i=1}^M\)。follower 先在人工和合成数据上联合训练，再回到人工数据微调，以免合成语言分布的偏差完全主导模型。

推理阶段的 pragmatic inference 是该论文最有辨识度的部分。follower 通过 beam search 或 state-factored search 生成候选路线集合 \(\mathcal{C}(d)\)，speaker 对每条路线计算“如果人走这条路线，生成原指令 \(d\) 的概率有多高”。最终路线可写成：

$$
\hat r=\arg\max_{r\in\mathcal{C}(d)}
\left[\log P_F(r\mid d)+\lambda\log P_S(d\mid r)\right].
$$

\(\lambda\) 控制 speaker 语义一致性分数的权重。直觉上，follower 的局部动作概率可能会偏向“看起来可走”的路线，但 speaker 会惩罚那些无法复述原指令地标顺序的路线。例如指令提到“在 rug 尽头右转并停在 mirror 附近”，如果候选路线在错误门口右转，speaker 生成该原句的概率就会低。

```python
def train_and_infer_speaker_follower(human_pairs, train_envs, instruction):
    # human_pairs: [(route r, instruction d)]
    speaker = train_speaker_max_likelihood(human_pairs)  # maximize log P_S(d | r)

    synthetic_pairs = []
    for route in sample_shortest_routes(train_envs):
        synthetic_instruction = speaker.generate(route)
        synthetic_pairs.append((route, synthetic_instruction))

    follower = train_follower(human_pairs + synthetic_pairs)  # maximize log P_F(r | d)
    follower = finetune_follower(follower, human_pairs)

    candidates = follower.state_factored_search(instruction, top_k=K)
    best_route = max(
        candidates,
        key=lambda r: follower.logprob(r, instruction)
        + lambda_speaker * speaker.logprob(instruction, r),
    )
    return best_route
```

这个系统不是 speaker 和 follower 端到端联合训练，而是分阶段组合：speaker 负责扩充监督信号和做测试时的判别式重排，follower 负责真实导航决策。这样的工程分解降低了训练不稳定性，也让 speaker 的价值更清楚：它增加路线-语言组合的覆盖率，并在搜索候选中提供全局语义检查。

局限也来自同一个设计。speaker 生成的新指令仍然只覆盖训练环境中的新路线，无法真正创造未见房屋的视觉分布；如果 speaker 学到偏置，合成数据也会把偏置传给 follower。EnvDrop 后续正是针对这一点，把增强对象从“路线-语言组合”推进到“视觉环境特征分布”。

#### 🧪 练习题
```yaml
question: "Speaker-Follower 在测试时引入 speaker 重排候选路线的主要目的是什么？"
options:
  - "让 speaker 直接执行导航动作，替代 follower"
  - "用路线生成指令的概率衡量候选路线与原始指令的一致性"
  - "减少全景图像的 CNN 特征维度"
  - "把 R2R 任务改成纯图像描述任务"
answer: 1
explain: "speaker 建模 P_S(d|r)，能判断一条候选路线是否能解释原始指令；它不是执行动作的策略，而是训练增强器和推理重排器。"
```

### EnvDrop

```yaml
id: envdrop
num: 2
name: EnvDrop
full_name: 环境丢弃 (Environmental Dropout)
year: '2019'
org: UNC Chapel Hill
parent: speaker_follower
paper_url: https://arxiv.org/abs/1904.04195
project_url: ''
category: vln
motivation: 环境特征随机丢弃提升未见环境泛化
```

#### 📝 一句话总结
EnvDrop 在 Speaker-Follower 的回译式数据增强上加入“环境级视觉特征丢弃”，通过 view/viewpoint 一致的 mask 模拟未见环境，让 VLN agent 在训练时减少对训练房屋特定外观线索的依赖。

#### 🎯 核心要点
- **核心问题**：R2R 模型在 seen 环境和 unseen 环境之间存在明显泛化落差，单纯 speaker 回译只能增加路线-语言对，不能增加真正的环境多样性。
- **两阶段训练**：第一阶段用 imitation learning 和 reinforcement learning 的混合目标训练导航器；第二阶段用 environmental dropout 生成“伪未见环境”，再结合 speaker 回译生成新 triplet。
- **环境级 dropout**：不同于逐元素独立 dropout，它对同一环境/同一视角结构共享 mask，使被删除的视觉线索在空间上保持一致。
- **保留导航几何**：dropout 主要作用在图像视觉特征上，而不是 heading/elevation 等方向特征，因此扰动语义外观而不破坏基本可达图结构。
- **相对 Speaker-Follower 的推进**：Speaker-Follower 扩充“路径-语言”组合，EnvDrop 进一步扩充“环境外观”分布，直接针对 unseen 泛化瓶颈。

#### 🔬 深入细节
![EnvDrop 两阶段训练框架](https://ar5iv.labs.arxiv.org/html/1904.04195/assets/x2.png)

*图：EnvDrop 的两阶段框架。左侧先用 IL+RL 训练基础导航器，右侧在环境丢弃后的视觉输入上做 speaker 回译和半监督微调。*

EnvDrop 的出发点很具体：R2R 训练集中的房屋数量有限，模型即使用 speaker 生成更多路线和指令，也仍然在同一批 seen 房屋里学习。这样得到的增强数据会增加语言表达和路径组合，但无法回答“测试房屋的物体、纹理、布局与训练房屋不同怎么办”。论文因此把泛化瓶颈定位到环境多样性不足，并提出用视觉特征 mask 生成近似的“新环境”。

第一阶段训练一个基础导航器，沿用全景 VLN 设置：每个位置有 36 个离散视角，动作是在可见可达邻居中选择下一步。IL 分支沿专家最短路径 teacher forcing，最小化专家动作负对数似然：

$$
\mathcal{L}^{\mathrm{IL}}=-\sum_{t=1}^{T}\log \pi_\theta(a_t^\star\mid s_t,x).
$$

RL 分支使用 Advantage Actor-Critic 风格的在线采样，奖励包含终点成功信号和距离目标的 shaping 项。论文实现中直接奖励可理解为到目标距离的变化：

$$
r_t=d_{t-1}-d_t,
$$

其中 \(d_t\) 是第 \(t\) 步后到目标的距离。混合训练把 off-policy 的稳定专家监督和 on-policy 的自采样纠错结合起来，目标可概括为：

$$
\mathcal{L}^{\mathrm{mix}}=\mathcal{L}^{\mathrm{IL}}+\alpha\,\mathcal{L}^{\mathrm{RL}}.
$$

第二阶段是 back translation。给定环境 \(\mathbf{E}\)、路线 \(\mathbf{R}\)、指令 \(\mathbf{I}\)，导航器是 forward model \(P_{\mathbf{E},\mathbf{I}\rightarrow\mathbf{R}}\)，speaker 是 backward model \(P_{\mathbf{E},\mathbf{R}\rightarrow\mathbf{I}}\)。EnvDrop 先在被 mask 的环境中采样或收集新路线，再由 speaker 为路线生成伪指令，得到新的 \((\mathbf{E}',\mathbf{R}',\mathbf{I}')\) triplet，用于继续训练导航器。

环境丢弃的关键不是“加噪声”这么简单，而是 mask 的共享方式。普通 feature dropout 会让每个视角、每个位置的特征维度独立闪烁；EnvDrop 则使用 view-consistent 和 viewpoint-consistent 的 mask，让同一类视觉特征在一个环境中以更稳定的方式消失。简化写法如下：

$$
\tilde f_{t,i}=f_{t,i}\odot \xi^{(E)},\qquad
\xi^{(E)}_k\sim \frac{1}{1-p}\mathrm{Bernoulli}(1-p),
$$

其中 \(f_{t,i}\) 是第 \(t\) 个位置第 \(i\) 个 view 的视觉特征，\(\xi^{(E)}\) 是环境级或批内共享的 dropout mask，\(\frac{1}{1-p}\) 保持特征期望尺度。因为方向特征不被同样丢弃，agent 仍然知道候选方向和可达关系；被扰动的是“沙发、墙面纹理、门框外观”等语义和外观线索。

```python
def train_envdrop(human_data, train_envs, dropout_rate):
    navigator = train_with_mixed_il_rl(human_data)
    speaker = train_speaker(human_data)

    augmented = []
    for env in train_envs:
        mask = sample_environment_mask(rate=dropout_rate)
        dropped_env = apply_mask_to_visual_features(
            env,
            mask=mask,
            keep_orientation_features=True,
        )

        for route in sample_routes(dropped_env):
            instruction = speaker.generate(dropped_env, route)
            augmented.append((dropped_env, route, instruction))

    # 半监督阶段通常混合人工 batch 和伪标注 batch，避免伪数据漂移。
    navigator = finetune_with_il_rl(
        navigator,
        supervised=human_data,
        pseudo_labeled=augmented,
    )
    return navigator
```

为什么 view/viewpoint 一致性重要？如果每张图独立随机删特征，模型看到的是不真实的闪烁噪声，可能学到“任何局部视觉证据都不可信”。而未见环境的真实变化通常是结构化的：某类家具、纹理或对象组合在整个房屋中都不同。EnvDrop 用共享 mask 模拟这种结构化缺失，迫使 agent 更多依赖指令顺序、方向和剩余稳定地标。

论文还强调 tied mask 的必要性：speaker 生成指令时看到的被丢弃环境，应该与 follower 训练时看到的环境一致。若 speaker 和 follower 使用不同 mask，speaker 可能在指令中描述 follower 输入中已被删除或弱化的线索，伪标注 triplet 就会出现跨模态不一致，训练收益下降。

从方法谱系看，EnvDrop 没有推翻 Speaker-Follower，而是补上了它的主要短板。Speaker-Follower 的合成数据主要增加“同一环境内的新路线和新说法”，EnvDrop 则通过视觉特征扰动增加“同一路线在不同外观条件下如何导航”的训练经验，因此对 unseen split 尤其有效。

#### 🧪 练习题
```yaml
question: "EnvDrop 中 environmental dropout 相比普通 feature dropout 的关键区别是什么？"
options:
  - "它只丢弃语言 token，不处理视觉特征"
  - "它用空间一致的视觉特征 mask 模拟新环境，而不是让每个激活独立随机清零"
  - "它取消 speaker，只用强化学习训练导航器"
  - "它把全景 36 个视角压缩成单张图片"
answer: 1
explain: "EnvDrop 的重点是环境级、view/viewpoint 一致的视觉扰动，用结构化缺失模拟未见房屋外观变化；普通独立 dropout 更像神经元噪声。"
```

### PREVALENT

```yaml
id: prevalent
num: 3
name: PREVALENT
full_name: 预训练视觉语言导航 (PREVALENT)
year: '2020'
org: Microsoft
parent: envdrop
paper_url: https://arxiv.org/abs/2002.10638
project_url: ''
category: vln
motivation: 大规模图像-文本-动作预训练范式
```

#### 📝 一句话总结
PREVALENT 提出 VLN 的预训练-微调范式，把指令、全景视觉状态和下一步动作组织成 image-text-action triplet，通过 masked language modeling 和 action prediction 预训练可迁移的导航视觉语言表征。

#### 🎯 核心要点
- **范式转变**：从在单个 R2R 任务上训练策略网络，转向先预训练通用 VLN 编码器，再迁移到 R2R、CVDN、HANNA 等导航任务。
- **三元组数据**：每个时间步被拆成 \((\boldsymbol{x},\boldsymbol{s}_t,\boldsymbol{a}_t)\)，即指令文本、当前 36-view 全景状态和专家下一动作。
- **大规模合成数据**：原始 R2R 只有约 104K step-level 样本，论文用 speaker 在 Matterport3D 最短路上生成约 6482K 新样本，使预训练规模可行。
- **双目标预训练**：image-attended masked language modeling 让语言恢复依赖视觉证据；action prediction 让融合表征直接服务导航决策。
- **可插拔迁移**：预训练编码器可作为下游 VLN 模型的初始化或特征模块，在 unseen 环境和跨任务迁移中降低过拟合。

#### 🔬 深入细节
![PREVALENT 预训练与微调范式](https://ar5iv.labs.arxiv.org/html/2002.10638/assets/x1.png)

*图：PREVALENT 先在 image-text-action triplets 上预训练，再迁移到 R2R、CVDN 和 HANNA 三类 VLN 下游任务。*

PREVALENT 的核心问题意识是：VLN 任务同时需要语言理解、视觉定位和动作选择，但标注轨迹远少于 BERT 或通用视觉语言预训练所需的数据规模。传统 VLN 方法通常为 R2R 设计一个策略网络，再通过 speaker 或 dropout 做任务内增强；PREVALENT 则把“先学通用导航表征，再微调策略”变成主线。

预训练样本来自轨迹的时间步切分。给定专家轨迹 \(\boldsymbol{\tau}=(\boldsymbol{s}_1,\boldsymbol{a}_1,\ldots,\boldsymbol{s}_T,\boldsymbol{a}_T)\) 和指令 \(\boldsymbol{x}\)，每个时间步形成一个 triplet \((\boldsymbol{x},\boldsymbol{s}_t,\boldsymbol{a}_t)\)。基础行为克隆目标可写成：

$$
\max_\theta \mathcal{L}_\theta(\boldsymbol{\tau},\boldsymbol{x})
=\log \pi_\theta(\boldsymbol{\tau}\mid \boldsymbol{x})
=\sum_{t=1}^{T}\log \pi_\theta(\boldsymbol{a}_t\mid \boldsymbol{s}_t,\boldsymbol{x}).
$$

视觉输入沿用全景动作空间：每个状态 \(\boldsymbol{s}_t=[s_1,\ldots,s_{36}]\) 包含 12 个水平朝向和 3 个俯仰角的 36 张视图。每个 view 的 embedding 由 CNN 图像特征、方向特征和位置/类型信息映射到 Transformer 维度。论文没有直接用 Faster R-CNN 区域特征，因为 36-view 全景中逐视角提 region 代价很高，且 VLN 更需要面向方向和动作的全景表示。

模型结构是 BERT 风格的多模态编码器：文本 token 进入 text Transformer，视觉 token 进入 vision Transformer，再通过 cross-modal Transformer 融合。论文中的配置示例为 \(L_{\text{text}}=9\)、\(L_{\text{vision}}=1\)、\(L_{\text{cross}}=3\)，最终跨模态输出记为：

$$
\boldsymbol{z}=\boldsymbol{h}_{L_{\text{cross}}}.
$$

\(\boldsymbol{z}\) 既包含指令 token 的上下文表示，也包含被视觉状态校准过的 `[CLS]`/动作相关表示，可作为下游导航模型的初始化表征。

第一个预训练目标是 image-attended masked language modeling。随机 mask 指令中的词，模型要在当前全景状态条件下恢复原 token：

$$
\mathcal{L}_{\mathrm{MLM}}
=-\sum_{i\in\mathcal{M}}\log p_\theta(x_i\mid \boldsymbol{x}_{\backslash \mathcal{M}},\boldsymbol{s}_t).
$$

与普通 BERT 的区别在于，恢复词不仅依赖句法上下文，还应利用视觉状态。例如“turn [MASK] at the stairs”在看到候选方向和楼梯位置时更容易被恢复为 right 或 left。这迫使文本表示吸收导航场景证据。

第二个预训练目标是 action prediction，论文也记为 \(\mathcal{L}_{\text{PA}}\)。模型基于融合后的图文状态预测专家下一动作：

$$
\mathcal{L}_{\mathrm{PA}}
=-\log p_\theta(\boldsymbol{a}_t\mid \boldsymbol{x},\boldsymbol{s}_t),\qquad
\mathcal{L}_{\mathrm{pre}}=\mathcal{L}_{\mathrm{MLM}}+\mathcal{L}_{\mathrm{PA}}.
$$

这个目标是 PREVALENT 区别于通用图文匹配预训练的关键。普通 VLP 只要求图像和文字语义匹配，而 VLN 需要知道“当前状态下该往哪走”；把动作预测纳入预训练，相当于把语言 grounding 直接连接到导航决策。

```python
def prevalent_pretrain(human_r2r, matterport_routes, speaker):
    human_triplets = trajectory_to_triplets(human_r2r)  # about 104K samples

    synthetic_pairs = []
    for route in matterport_routes:
        instruction = speaker.generate(route)
        synthetic_pairs.append((route, instruction))
    synthetic_triplets = trajectory_to_triplets(synthetic_pairs)  # about 6482K samples

    encoder = VLNTransformer(text_layers=9, vision_layers=1, cross_layers=3)

    for instruction, state_36_views, expert_action in batch(
        human_triplets + synthetic_triplets
    ):
        masked_instruction, masked_positions = mask_words(instruction)
        fused = encoder(masked_instruction, state_36_views)

        loss_mlm = predict_masked_words(fused, instruction, masked_positions)
        loss_pa = predict_next_action(fused, expert_action)
        update(encoder, loss_mlm + loss_pa)

    return encoder  # used to initialize/fine-tune downstream VLN agents
```

大规模合成数据是 PREVALENT 能工作的前提。论文指出 R2R 原始 step-level 样本量约 104K，比语言或视觉语言预训练常见规模小一个数量级；因此先训练 speaker，再在 Matterport3D Simulator 中收集大量最短路线并生成指令，得到约 6482K 新样本。也就是说，PREVALENT 不是抛弃 Speaker-Follower，而是把 speaker 从“任务内增强器”升级为“预训练语料生成器”。

相对 EnvDrop，PREVALENT 的改进方向也不同。EnvDrop 主要通过视觉特征扰动提升单任务 unseen 泛化；PREVALENT 则学习一个可迁移的图文动作编码器，让下游任务从更好的初始化开始。它的局限是预训练样本多为单步 triplet，对完整历史、已完成子目标和长程记忆建模不足；后续 VLN-BERT、HAMT 等方法继续沿着历史状态建模方向推进。

#### 🧪 练习题
```yaml
question: "PREVALENT 为什么要在预训练中加入 action prediction，而不只做图文匹配或 MLM？"
options:
  - "因为 VLN 的目标是生成更长的自然语言指令"
  - "因为 action prediction 把视觉语言对齐直接约束到下一步导航决策上"
  - "因为它可以完全替代下游微调"
  - "因为它能避免使用全景视觉输入"
answer: 1
explain: "VLN 不只需要判断图文是否相关，还要在当前状态下选择动作；action prediction 让融合表征学习与导航策略相关的对齐。"
```

### VLN-BERT

```yaml
id: vln_bert
num: 4
name: VLN-BERT
full_name: 循环视觉语言BERT (VLN-BERT)
year: '2021'
org: HKU
parent: prevalent
paper_url: https://arxiv.org/abs/2011.13922
project_url: ''
category: vln
motivation: 将循环机制注入Transformer支持状态追踪
```

#### 📝 一句话总结
VLN-BERT 将一个 state token 作为循环记忆接入视觉语言 BERT，让 Transformer 在每一步用上一步状态、固定语言表征和当前视觉观察更新导航状态并直接输出动作。

#### 🎯 核心要点
- **解决 PREVALENT 的历史缺口**：PREVALENT 主要做单步 triplet 对齐，VLN-BERT 明确把 VLN 看作部分可观测序列决策问题，需要状态追踪。
- **循环不是外接 LSTM**：模型在 BERT 输入中加入 state token，上一时刻的 state 作为下一时刻输入，实现 Transformer 内部的 recurrent update。
- **语言 token 只作 key/value**：导航过程中语言表征不反复更新，减少长指令和长轨迹造成的显存开销。
- **动作来自注意力权重**：最终层 state 对候选视觉 token 的平均注意力直接作为动作概率，不再额外堆复杂 decoder。
- **可适配预训练 V&L BERT**：论文以 OSCAR/PREVALENT 风格模型为基础，展示了不从零训练大规模 VLN backbone 也能迁移到导航。

#### 🔬 深入细节
论文：*VLN↻BERT: A Recurrent Vision-and-Language BERT for Navigation*。核心图 Figure 2 展示了初始化语言状态、循环输入 state-language-vision、输出更新状态和动作概率的过程。

![VLN-BERT 循环视觉语言 Transformer 架构图](https://ar5iv.labs.arxiv.org/html/2011.13922/assets/x2.png)
*图：VLN-BERT 在初始化阶段编码完整指令得到初始状态，导航阶段把上一状态、语言记忆和当前视觉观察送入同一个 Transformer，输出更新状态与动作概率。*

VLN-BERT 的形式化输入包括上一状态 \(\boldsymbol{s}_{t-1}\)、语言 token \(\boldsymbol{X}\)、当前可导航视觉 token \(\boldsymbol{V}_t\)，以及在 REVERIE 中额外使用的 object token \(\boldsymbol{O}_t\)。整体递推为
\[
\boldsymbol{s}_t,\boldsymbol{p}^a_t,\boldsymbol{p}^o_t
=\mathrm{VLN\text{-}BERT}(\boldsymbol{s}_{t-1},\boldsymbol{X},\boldsymbol{V}_t,\boldsymbol{O}_t).
\]
在 R2R 这类纯导航任务中，核心输出是更新后的状态和动作分布 \(\boldsymbol{p}^a_t\)。

初始化阶段只输入 `[CLS]`、完整指令和 `[SEP]`。模型将 `[CLS]` 输出定义为初始状态 \(\boldsymbol{s}_0\)，并缓存语言表征：
\[
\boldsymbol{s}_0,\boldsymbol{X}
=\mathrm{VLN\text{-}BERT}(\mathtt{[CLS]},\boldsymbol{U},\mathtt{[SEP]}).
\]
之后每个导航步不再让语言 token 作为 query 参与全量自注意力，而是主要作为 key/value 被 state 和视觉 token 查询。这一设计保留了深层语言编码，又避免每一步都重新编码长指令。

状态 token 是模型的记忆载体。它在每一步作为输入序列的第一个 token，与当前视觉候选和语言 token 做跨模态 self-attention；输出的 state 再进入下一步。为了让 state 更明确地捕捉“当前该看哪段指令、该看哪个方向”，论文还做了 state refinement：先计算 state 对语言和视觉 token 的注意力，得到加权语言特征 \(\boldsymbol{F}^x_t\) 与视觉特征 \(\boldsymbol{F}^v_t\)，再通过逐元素乘积建模匹配：
\[
\boldsymbol{F}^x_t=\widetilde{\boldsymbol{A}}^{s,x}_l\boldsymbol{X},\qquad
\boldsymbol{F}^v_t=\widetilde{\boldsymbol{A}}^{s,v}_l\boldsymbol{V}_t,
\]
\[
\boldsymbol{s}^f_t=[\boldsymbol{s}^r_t;\boldsymbol{F}^x_t\odot \boldsymbol{F}^v_t]W^r.
\]
选定动作的方向特征 \(\boldsymbol{a}_t\) 还会写回状态：
\[
\boldsymbol{s}_t=[\boldsymbol{s}^f_t;\boldsymbol{a}_t]W^s.
\]

动作决策非常简洁。Transformer 的注意力本身已经是基于内积的匹配打分，因此 VLN-BERT 直接取最终层 state 对视觉候选的多头平均注意力作为动作概率：
\[
\boldsymbol{p}^a_t=\widetilde{\boldsymbol{A}}^{s,v}_l.
\]
训练时混合 RL 与 IL：RL 用 A2C 根据采样动作和 advantage 优化，IL 在专家轨迹上做 teacher-forcing cross entropy。导航损失可概括为
\[
\mathcal{L}
=-\sum_t a^s_t\log p^a_t A_t
-\lambda \sum_t a^\star_t \log p^a_t,
\]
其中 \(a^s_t\) 是采样动作，\(a^\star_t\) 是专家动作。

```text
Algorithm: Recurrent VLN-BERT inference
Input: instruction U, start viewpoint
1. Encode [CLS], U, [SEP] to obtain initial state s_0 and language tokens X.
2. For t = 1 ... T:
   a. Extract candidate visual tokens V_t from navigable directions.
   b. Run Transformer on (s_{t-1}, X, V_t), with X reused as language memory.
   c. Compute p_t^a from final-layer state-to-vision attention.
   d. Select action a_t and move in the navigation graph.
   e. Refine state with matched language/vision features and selected direction.
3. Stop when the selected action is stop or max step is reached.
```

VLN-BERT 的关键取舍是把长历史压缩到一个 state token，因此它比完整历史建模更省内存，也更容易接上预训练 BERT；但如果任务要求回忆很长路径、比较多个过去观测，单 token 状态可能成为瓶颈。HAMT 后续正是用层次化历史 Transformer 来避免这种压缩损失。

#### 🧪 练习题
```yaml
question: "VLN-BERT 将 state token 接入 Transformer 的主要目的是什么？"
options:
  - "把历史导航信息压缩为可递推的跨模态状态，并在每一步结合当前观察更新决策"
  - "替代视觉特征提取器，使模型不再需要全景图像输入"
  - "只用于初始化语言编码，导航阶段不再参与计算"
  - "把所有历史全景图展开为长序列，以获得完整路径记忆"
answer: 0
explain: "state token 是 VLN-BERT 的循环记忆载体；它在每一步与语言和当前视觉候选做注意力交互，输出的新状态继续传到下一步。"
```

### HAMT

```yaml
id: hamt
num: 5
name: HAMT
full_name: 历史感知多模态Transformer (HAMT)
year: '2021'
org: Baidu
parent: vln_bert
paper_url: https://arxiv.org/abs/2110.13309
project_url: ''
category: vln
motivation: 全Transformer架构分层编码历史观测
```

#### 📝 一句话总结
HAMT 不再把历史压成一个循环状态，而是用层次化视觉 Transformer 显式编码所有过去全景观测，再与指令和当前观测做跨模态融合来预测下一步动作。

#### 🎯 核心要点
- **核心问题**：VLN-BERT 的 state token 省计算但会压缩历史，长路径、返回路径、对话导航等任务需要更完整的过去观测。
- **层次化历史编码**：先在每个 panorama 内建模 36 个 view 的空间关系，再跨时间步建模 panorama 序列，复杂度从 flatten 的 \(O(t^2K^2)\) 降到 \(O(tK^2+t^2)\)。
- **三路输入融合**：文本、历史、当前观测分别用 unimodal transformer 编码，再通过 cross-modal transformer 融合。
- **代理任务更丰富**：除 MLM/MRM/ITM 外，HAMT 引入单步动作预测/回归 SAP/SAR 和空间关系预测 SPREL，让模型在预训练阶段学习导航决策和空间几何。
- **适合长程导航**：在 R4R、R2R-Back、CVDN 等长轨迹或需要回忆过去的任务上，显式历史比单向递推状态更有优势。

#### 🔬 深入细节
论文：*History Aware Multimodal Transformer for Vision-and-Language Navigation*。核心图 Figure 1 展示了 HAMT 同时编码文本、完整历史和当前观测再预测下一动作的架构。

![HAMT 文本历史当前观测联合编码架构图](https://ar5iv.labs.arxiv.org/html/2110.13309/assets/figures/model_architecture.png)
*图：HAMT 用 unimodal Transformer 分别编码指令、历史观测和当前观测，再用跨模态 Transformer 融合三路信息预测下一步动作。*

HAMT 将 VLN 写成部分可观测决策问题。给定指令 \(\mathcal{W}\)、历史 \(\mathcal{H}_t=([\mathcal{O}_1;a^h_1],\dots,[\mathcal{O}_{t-1};a^h_{t-1}])\)、当前 panorama \(\mathcal{O}_t\) 和候选动作集合 \(\mathcal{O}^c_t\)，学习策略
\[
\pi(a_t\mid \mathcal{W},\mathcal{H}_t,\mathcal{O}_t,\mathcal{O}^c_t;\Theta).
\]
这里 \(\mathcal{O}_t\) 包含 \(K=36\) 个视角，每个视角由视觉特征和相对角度组成。

文本编码是标准 BERT 风格：word embedding、position embedding 和 type embedding 相加后送入语言 Transformer。当前观测编码把视觉特征、方向角和 token 类型组合起来：
\[
o_i=\mathrm{LN}(W^o_v v^o_i)+\mathrm{LN}(W^o_a E^A_{a^o_i})+E^N_{o_i}+E^T_1,
\]
其中 \(E^N\) 区分可导航、不可导航和 stop token，方向特征 \(E^A\) 常由 \((\sin\theta,\cos\theta,\sin\phi,\cos\phi)\) 表示。

历史编码是 HAMT 的核心。最直接的 flatten 方法会把 \(t\) 个历史 panorama 的 \(tK\) 个 view 全部作为 token，复杂度约 \(O(t^2K^2)\)，长程导航难以承受；只取每步朝向 view 的 temporal-only 方法又会丢掉侧面地标。HAMT 因此先用 ViT 和 panoramic transformer 在单个 panorama 内学习空间关系，池化为一个 panorama 表征，再加上该步动作方向、step embedding 和 type embedding 得到历史 token：
\[
h_i=\mathrm{LN}(W^h_v v^h_i)+\mathrm{LN}(W^h_a E^A_{a^h_i})+E^S_i+E^T_2.
\]
随后跨时间的历史 Transformer 编码 \((h_1,\dots,h_{t-1})\)。这种 factorized 设计的复杂度为 \(O(tK^2+t^2)\)，既保留过去 panorama 内的空间信息，又避免全展开注意力过重。

跨模态阶段把历史和当前观测作为视觉模态，与文本模态进入 dual-stream cross-modal transformer。每层先做 vision-to-text 和 text-to-vision cross-attention，再做各自的 self-attention 和前馈网络。输出包含文本 `[cls]`、历史 `[cls]` 和当前候选 view 表征。默认动作头沿用 SAP：对每个候选 \(o'_i\) 计算与文本 `[cls]` 的匹配并 softmax：
\[
p_t(o'_i)=
\frac{\exp(f_{\mathrm{SAP}}(o'_i\odot x'_{\mathrm{cls}}))}
{\sum_j \exp(f_{\mathrm{SAP}}(o'_j\odot x'_{\mathrm{cls}}))}.
\]

训练分两层。预训练/代理任务阶段先冻结 ImageNet 预训练 ViT，训练其余模块，再解冻 ViT 端到端训练，避免一开始破坏视觉特征。任务包括 MLM、MRM、ITM，以及导航专用的 SAP/SAR 和 SPREL。SAP 的分类损失为
\[
\mathcal{L}_{\mathrm{SAP}}=-\log p_t(o'_\star),
\]
SPREL 则随机取 panorama 中两个 view，预测相对 heading/elevation：
\[
\mathcal{L}_{\mathrm{SPREL}}
=(\hat\theta_{ij}-\theta_{ij})^2+(\hat\phi_{ij}-\phi_{ij})^2.
\]
随后用 RL+IL 微调序列策略，A3C 采样动作，IL 继续约束专家动作。论文中的更新形式把 policy gradient 与专家 log-likelihood 相加，\(\lambda\) 控制 imitation 项权重。

```text
Algorithm: HAMT decision step
Input: instruction W, history panoramas H_t, current panorama O_t
1. Encode W with language Transformer.
2. For each past panorama:
   a. Encode 36 views with ViT and panorama Transformer.
   b. Pool to one panorama token and add action/step/type embeddings.
3. Encode the sequence of history tokens with temporal Transformer.
4. Encode current 36-view observation plus stop token.
5. Fuse text, history, and current observation with cross-modal Transformer.
6. Score each navigable candidate using SAP action head.
7. Select next action, append current observation/action into history.
```

HAMT 的工程成本高于 VLN-BERT，因为它显式保留了更多历史 token；但它把“记忆”从不可解释的单向状态变成可注意的历史序列。在需要回到起点的 R2R-Back 或长指令 R4R 中，这种差异特别明显：模型能重新查看过去看到过的 panorama，而不是依赖一个被连续覆盖的 hidden state。

#### 🧪 练习题
```yaml
question: "HAMT 采用层次化历史编码的核心原因是什么？"
options:
  - "先保留每个 panorama 内的空间关系，再建模跨时间历史，同时避免把所有 view 展平造成过高注意力复杂度"
  - "完全丢弃过去观察，只保留当前候选动作以降低计算量"
  - "把文本指令替换为历史图像序列，从而不再需要语言 Transformer"
  - "让每个历史 view 都直接作为动作分类标签，跳过跨模态融合"
answer: 0
explain: "HAMT 的历史包含多个 36-view panorama；层次化编码将复杂度从全展平的二次增长拆成 panorama 内空间建模和跨时间建模，兼顾信息量与效率。"
```

### AppAgent

```yaml
id: appagent
num: 6
name: AppAgent
full_name: 应用智能体 (AppAgent)
year: '2023'
org: Tencent
parent: —
paper_url: https://arxiv.org/abs/2312.13771
project_url: ''
category: gui
motivation: 探索-部署两阶段自主学习App操作
```

#### 📝 一句话总结
AppAgent 让 LLM 先通过自主探索或观看演示为手机 App 生成操作文档，再在部署时结合截图、XML 元素编号和文档记忆逐步调用简化动作完成任务。

#### 🎯 核心要点
- **两阶段框架**：探索阶段学习 App 元素和动作效果，部署阶段按“观察-思考-动作-总结”循环执行具体用户任务。
- **视觉与结构并用**：输入包含实时截图和 Android XML 交互元素，元素被编号叠加在截图上，避免 LLM 直接预测脆弱的屏幕坐标。
- **动作空间工程化**：用 `Tap`、`Long_press`、`Swipe`、`Text`、`Back`、`Exit` 六类函数模拟人类手机操作，显著降低控制难度。
- **文档是长期记忆**：探索产生的文档记录 UI 元素功能和动作后果，部署时动态注入相关文档，减少模型每次从零理解 App。
- **意义**：AppAgent 是 GUI agent 从 prompt-only 执行向“先学习应用、再执行任务”的早期代表，但依赖 XML 和人工/自动探索质量。

#### 🔬 深入细节
论文：*AppAgent: Multimodal Agents as Smartphone Users*。核心图 Figure 2 展示了探索阶段、知识文档和部署阶段的整体框架。

![AppAgent 探索与部署两阶段框架图](https://ar5iv.labs.arxiv.org/html/2312.13771/assets/x2.png)
*图：AppAgent 先在探索阶段与 App 交互并生成参考文档，部署阶段再利用文档、截图和 XML 元素编号完成用户任务。*

AppAgent 的环境运行在 Android CLI/ADB 上。每一步 agent 获得两类观测：当前屏幕截图，以及 XML 文件中解析出的交互元素。系统会为元素分配唯一编号，编号来源可以是 resource id，也可以由 class、size、content 等字段构造，然后半透明叠加到截图上。这样 LLM 可以说“点击 5 号元素”，而不必输出精确像素坐标。

动作空间被刻意设计得接近人类常用手机动作，但比原始坐标控制更稳定：`Tap(element)` 点击编号元素；`Long_press(element)` 长按；`Swipe(element, direction, dist)` 在某元素上按方向和距离滑动；`Text(text)` 在键盘出现时直接输入文本；`Back()` 返回上一页；`Exit()` 结束任务。这一抽象把控制问题从连续坐标预测变为离散函数调用。

探索阶段有两种来源。自主探索时，LLM 带着任务目标尝试点击/滑动 UI 元素，对比动作前后的截图变化，推断元素功能和页面转移，并把结论写入文档；如果当前页面像广告页或无关页，agent 会用 `Back()` 返回，避免盲目 DFS/BFS。观看演示时，人类操作 App，agent 只记录被用到的元素和动作，因此探索空间更小、文档质量通常更高。

部署阶段的 prompt 包含当前截图、可用动作说明、动态检索出的相关文档、以及上一轮交互总结。LLM 先描述当前 UI，再给出任务相关推理，随后调用一个动作函数。动作执行后，agent 总结当前步骤和历史状态，作为下一轮记忆。这个闭环可抽象为
\[
a_t = \pi_\theta(o_t, x_t, m_t, d_t),\qquad
m_{t+1}=\mathrm{Summarize}(m_t,o_t,a_t,o_{t+1}),
\]
其中 \(o_t\) 是截图/XML 观测，\(x_t\) 是用户任务，\(d_t\) 是检索到的 App 文档，\(m_t\) 是交互记忆。

实验中，原始坐标动作空间下 GPT-4 baseline 成功率很低；换成 AppAgent 的离散动作空间后，即使没有文档也大幅提升。加入自动探索文档、观看演示文档和人工文档后，成功率进一步上升，说明主要收益来自两个地方：一是动作接口降低了低层控制噪声，二是探索文档把 App-specific 知识外化成可检索记忆。

```text
Algorithm: AppAgent explore-then-deploy
Exploration:
1. Observe screenshot and numbered XML elements.
2. Choose a UI element/action to try or watch a human demo action.
3. Execute the action through Android control functions.
4. Compare before/after screens and infer the element's function.
5. Update the app document with action effects and useful page knowledge.

Deployment:
1. Receive user task and current screenshot/XML observation.
2. Retrieve relevant app document snippets.
3. Prompt LLM to observe, reason, and select one function call.
4. Execute the function call and observe the new screen.
5. Summarize interaction memory; repeat until Exit().
```

AppAgent 的限制也直接来自其设计。XML 可用时元素编号很强，但许多复杂 GUI、游戏、canvas 或跨平台界面不一定能给出可靠结构树；探索文档若写错，会在部署阶段被反复使用；LLM 对长文档检索和多步状态的鲁棒性也有限。后续 CogAgent 和 SeeClick 更强调直接从高分辨率截图中识别和定位 GUI 元素，试图减少对 XML/DOM 的依赖。

#### 🧪 练习题
```yaml
question: "AppAgent 为什么把手机操作抽象为编号元素上的离散函数调用？"
options:
  - "降低连续坐标预测的不稳定性，让 LLM 基于截图和 XML 元素编号选择可执行动作"
  - "让模型绕过截图输入，只依赖 App 后端 API 完成任务"
  - "使探索阶段不需要记录任何页面知识，部署时完全从零推理"
  - "强制所有 App 使用同一套固定页面布局，避免界面变化"
answer: 0
explain: "编号元素和 Tap/Swipe/Text 等函数把低层控制问题离散化，减少像素坐标误差；但它依赖 XML 元素解析和编号覆盖的质量。"
```

### CogAgent

```yaml
id: cogagent
num: 7
name: CogAgent
full_name: 认知智能体 (CogAgent)
year: '2024'
org: Tsinghua
parent: appagent
paper_url: https://arxiv.org/abs/2312.08914
project_url: ''
category: gui
motivation: 高分辨率视觉编码器直接理解屏幕布局
```

#### 📝 一句话总结
CogAgent 在 CogVLM 基础上加入低分辨率全局分支和 1120×1120 高分辨率 cross-attention 分支，解决通用 VLM 看不清 GUI 小字、密集图标和细粒度控件的问题，使模型能仅凭截图完成读屏、定位和动作生成。

#### 🎯 核心要点
- **双分辨率 GUI VLM**：低分辨率 CogVLM 分支保留整体语义，高分辨率分支补充 GUI 文本和小控件细节。
- **高分辨率 cross-module**：高分辨率 token 不直接进入大语言解码器自注意力，而是在每层以较小 hidden size 做 cross-attention。
- **计算成本可控**：将高分辨率视觉序列作为 key/value 补充，避免直接把 6400 个 patch 拼进主序列导致二次方开销。
- **GUI 专用预训练**：围绕 OCR、visual grounding、网页截图-DOM 对构造数据，强化读字、定位和界面结构理解。
- **端到端截图操作**：在 Mind2Web、AITW 等 GUI 导航任务中，只用截图输入即可超过依赖 HTML 文本的 LLM 方法。

#### 🔬 深入细节
##### 框架总览

![CogAgent 高分辨率 cross-module 架构](https://ar5iv.labs.arxiv.org/html/2312.08914/assets/x1.png)
*图：CogAgent 使用原 CogVLM 低分辨率分支处理全局语义，同时用高分辨率视觉编码器通过 cross-attention 向每层解码器补充细粒度 GUI 信息。*

##### 算法流程

```python
# CogAgent 高分辨率 GUI 理解流程
def cogagent_infer(screenshot, prompt):
    image_low = resize(screenshot, (224, 224))
    image_high = resize(screenshot, (1120, 1120))

    low_tokens = cogvlm_visual_encoder(image_low)      # 全局布局和语义
    high_tokens = high_res_visual_encoder(image_high)  # 小字、图标、控件边界
    hidden = concat(low_tokens, text_embed(prompt))

    for layer in vlm_decoder_layers:
        hidden = layer.self_attention_with_visual_expert(hidden)
        hidden = hidden + layer.cross_attention(query=hidden, key=high_tokens, value=high_tokens)
        hidden = layer.ffn(hidden)

    return autoregressive_decode(hidden)  # 回答、grounding 坐标、下一步动作等
```

CogAgent 的出发点是 GUI 图像与自然图像很不一样。自然图像问答常用 224 或 448 分辨率还能抓住主体物体，但 GUI 任务的关键证据往往是按钮上的几个字、搜索框占位符、菜单项、状态栏图标和表格单元格。截图被压缩后，这些元素会先于布局语义丢失，因此单纯把通用 VLM 迁移到 GUI agent 会出现“看得到页面，却读不清可操作目标”的问题。

直接提高输入分辨率并不划算。若把 1120×1120 图像按 14×14 patch 切分，会得到 \(L_{I_{\mathrm{hi}}}=6400\) 个视觉 token；把它们拼入语言解码器后，自注意力复杂度近似为
$$
T_{\mathrm{direct}}=O\left((L_{I_{\mathrm{hi}}}+L_T)^2H_{\mathrm{dec}}d_{\mathrm{dec}}\right).
$$
这会让大解码器在大量视觉 patch 上做二次方计算，而 GUI 所需的高分辨率信息主要是文本和边界细节，并不一定需要与所有 token 做同等规模的深层自注意力。

CogAgent 因此采用“低分辨率主干 + 高分辨率补充分支”。低分辨率图像通过原 CogVLM 的 EVA2-CLIP-E 和 MLP adapter 进入视觉语言解码器，维持原模型的全局理解能力；高分辨率图像通过更小的 EVA2-CLIP-L 编码器生成细粒度 token。第 \(i\) 层先执行主干自注意力，再把当前 hidden state 作为 query 去 attend 高分辨率特征：
$$
X'_i=\mathrm{MSA}(\mathrm{LN}(X_i))+X_i,
$$
$$
X_{i+1}=\mathrm{MCA}(\mathrm{LN}(X'_i),X_{\mathrm{hi}})+X'_i.
$$
这里 \(\mathrm{MCA}\) 的 hidden size 可以显著小于主解码器 hidden size，使高分辨率分支更像一个逐层可查询的细节记忆，而不是把全部高分辨率 patch 变成昂贵的主序列。

这种结构的改进复杂度可写成
$$
T_{\mathrm{cross}}=O\left((L_{I_{\mathrm{lo}}}+L_T)L_{I_{\mathrm{hi}}}H_{\mathrm{cross}}d_{\mathrm{cross}}+(L_{I_{\mathrm{lo}}}+L_T)^2H_{\mathrm{dec}}d_{\mathrm{dec}}\right).
$$
在论文实现中 \(L_{I_{\mathrm{lo}}}=256\)、\(L_{I_{\mathrm{hi}}}=6400\)。主干仍只处理短的低分辨率视觉序列和文本序列，高分辨率信息通过线性于 \(L_{I_{\mathrm{hi}}}\) 的 cross-attention 注入，从而在读清小字和控制算力之间取得折中。

训练数据也围绕 GUI agent 的能力缺口设计。文本识别数据让模型识别不同字体、字号、方向和背景下的文字；visual grounding 数据让模型把文本描述与图像区域对齐；网页 GUI 数据则从 Common Crawl 渲染网页截图，并结合 DOM 可见元素和渲染框构造界面理解样本。预训练后再用人工收集 GUI 截图、Mind2Web、AITW 和通用 VQA 数据做多任务对齐，使模型既能回答界面问题，也能输出元素位置或下一步动作。

与 AppAgent 的差异在于，AppAgent 主要依赖 Android XML 元素编号和探索文档来降低动作选择难度，而 CogAgent 把瓶颈放在模型自己的视觉读屏能力上。它不要求页面提供可靠 DOM/XML，也不需要先枚举候选元素；只要截图里能看清目标，模型就有机会直接生成定位或动作。这为后续 SeeClick、UGround、Aguvis 等纯视觉 GUI agent 提供了基础路线。

> 💡 关键：CogAgent 不是简单“把图片放大”，而是把高分辨率信息从主解码器自注意力中拆出来，作为每层可查询的细粒度视觉证据。

#### 🧪 练习题
```yaml
question: "CogAgent 为什么采用高分辨率 cross-module，而不是把 1120×1120 的所有 patch 直接拼入语言模型输入？"
options:
  - "因为 GUI 中不需要全局布局信息"
  - "因为直接拼入会让大解码器自注意力成本随视觉 token 数二次方增长"
  - "因为 cross-module 可以完全替代低分辨率视觉编码器"
  - "因为模型只需要输出分类标签，不需要生成文本"
answer: 1
explain: "高分辨率截图会产生大量 patch。CogAgent 让这些 patch 作为 cross-attention 的 key/value 补充细节，避免主解码器在长视觉序列上承担二次方自注意力开销。"
```

### SeeClick

```yaml
id: seeclick
num: 8
name: SeeClick
full_name: 视觉点击 (SeeClick)
year: '2024'
org: HKUST
parent: cogagent
paper_url: https://arxiv.org/abs/2401.10935
project_url: ''
category: gui
motivation: 强化视觉定位对齐指令与像素坐标
```

#### 📝 一句话总结
SeeClick 将 GUI agent 的关键能力定义为“根据语言指令在截图中定位可操作元素”，通过大规模 GUI grounding 预训练让 LVLM 直接生成点击坐标，从而减少对 HTML、DOM、XML 或 ViewHierarchy 的依赖。

#### 🎯 核心要点
- **GUI grounding 中心化**：把“元素描述到屏幕位置”的映射作为视觉 GUI agent 的基础能力。
- **纯截图输入**：下游执行主要依赖屏幕截图，不要求结构化网页文本或移动端控件树。
- **坐标自然语言生成**：用 `click (0.49, 0.40)` 这类归一化坐标文本训练模型，不额外扩展 1000-bin 坐标词表。
- **自动构造训练数据**：从约 30 万网页和移动 UI 数据中提取文本元素、title 元素、widget caption 与 grounding 目标，形成约 1M 混合数据。
- **ScreenSpot 基准**：构建覆盖 mobile、desktop、web 的 GUI grounding benchmark，并验证 grounding 提升与 MiniWob、AITW、Mind2Web 下游表现相关。

#### 🔬 深入细节
##### 框架总览

![SeeClick GUI grounding 与下游 agent 框架](https://ar5iv.labs.arxiv.org/html/2401.10935/assets/x3.png)
*图：SeeClick 先通过 GUI grounding 预训练学习从指令到坐标的映射，再把该能力迁移到 MiniWob、AITW、Mind2Web 等 GUI agent 任务。*

##### 算法流程

```python
# SeeClick 的 grounding 预训练与执行流程
def build_grounding_sample(screenshot, element):
    instruction = element.text or element.title or element.caption
    target = normalize(center(element.bounding_box), screenshot.size)
    prompt = f"In the UI, where should I click if I want to {instruction}?"
    answer = f"click ({target.x:.2f}, {target.y:.2f})"
    return prompt, screenshot, answer

def seeclick_step(task, screenshot, history):
    prompt = compose_action_prompt(task, history)
    action_text = lvlm_generate(screenshot, prompt)
    action, x, y = parse_action_and_coordinate(action_text)
    execute(action, denormalize((x, y), screenshot.size))
```

SeeClick 的核心判断是：许多 GUI agent 的失败并不是因为不会规划，而是因为无法把“点击登录按钮”“打开设置图标”这类语言目标落到正确像素位置。传统 web agent 通常先读取 HTML/DOM，把元素转成文本候选，再由 LLM 选择候选编号；这种方法在网页上有效，但在桌面软件、canvas、iframe、移动 App、游戏界面或结构树缺失的场景中会失效。SeeClick 因此把能力抽象为
$$
p_\theta(y\mid s,x),
$$
其中 \(s\) 是截图，\(x\) 是元素描述或任务指令，\(y\) 是点击点或边界框。

坐标输出被设计成普通语言生成任务。论文没有新增离散坐标 token，而是让模型直接生成类似 `click (0.49, 0.40)` 的文本，使用常规自回归交叉熵优化：
$$
\mathcal{L}_{\mathrm{coord}}=-\sum_{k=1}^{K}\log p_\theta(y_k\mid y_{<k},s,x).
$$
这种做法的优势是训练、推理和动作解析都能复用现有 LVLM 接口；代价是数值格式、归一化尺度和小数精度必须稳定，否则一个坐标字符错误就可能使点击偏离目标。

训练数据构造是 SeeClick 的主要工程贡献。Web 数据来自 Common Crawl 渲染得到的约 30 万网页截图，并从 HTML 中抽取两类元素：一类是带可见文本的元素，覆盖按钮、链接、表单标签；另一类是带 `title` 属性的元素，用来覆盖图标控件和 hover 描述。对每个元素，文本或 title 作为 instruction，元素位置作为 grounding 目标；同时加入反向任务 \(p_\theta(x\mid s,y)\)，让模型根据区域预测文本或功能，强化局部读屏能力。

移动端数据则重组自 widget captioning、RICO 等 UI 数据。原始 widget captioning 是“给控件写描述”，SeeClick 将其反过来变成“给描述找控件”；再加入移动 UI summarization 保持整体界面理解。为了不让模型遗忘通用视觉语言能力，训练还混入 LLaVA 风格的通用 instruction-following 数据。最终约 1M 样本用于对 Qwen-VL 做 continual pre-training，并用 LoRA 调整视觉编码器和语言模型。

ScreenSpot 用来单独测量 GUI grounding，而不是把定位错误混在多步 agent 成败里。它覆盖 iOS、Android、macOS、Windows 和网页，目标元素分为文本类和 icon/widget 类。评测指标可写为
$$
\mathrm{ClickAcc}=\frac{1}{N}\sum_{i=1}^{N}\mathbf{1}\{(\hat{x}_i,\hat{y}_i)\in B_i^\star\},
$$
即预测点击点是否落入目标框。论文实验显示，通用 LVLM 即使声称具备自然图像 grounding，在 GUI 上也经常失败；经过 GUI grounding 预训练后，SeeClick 的 ScreenSpot 准确率和 MiniWob、AITW、Mind2Web 下游任务表现同步提高。

与 CogAgent 相比，SeeClick 更聚焦于“点击哪里”。CogAgent 通过高分辨率结构提升读屏能力，SeeClick 则把训练信号集中在指令和像素坐标对齐上。它仍需要外部环境循环、历史记忆和错误恢复来完成长任务，但证明了 GUI grounding 是纯视觉 agent 的底座能力，而不是一个附属评测项。

> ⚠️ 注意：SeeClick 的跨平台优势来自不依赖 DOM，但它也把错误集中到坐标精度上；界面缩放、滚动、遮挡和相邻小控件都会放大定位误差。

#### 🧪 练习题
```yaml
question: "SeeClick 为什么强调 GUI grounding 预训练？"
options:
  - "因为它希望完全绕过截图，只使用网页 HTML"
  - "因为多步 GUI 任务常因目标元素定位错误失败，grounding 能把指令对齐到像素坐标"
  - "因为 grounding 可以替代所有任务规划和历史记忆"
  - "因为 ScreenSpot 只评测自然图像物体检测"
answer: 1
explain: "SeeClick 认为视觉 GUI agent 的基础瓶颈是从语言描述定位到屏幕元素。GUI grounding 预训练直接优化这一映射，并提升下游点击和操作任务表现。"
```

### UGround

```yaml
id: uground
num: 9
name: UGround
full_name: 通用定位 (Universal Grounding)
year: '2025'
org: ByteDance
parent: seeclick
paper_url: https://arxiv.org/abs/2410.03243
project_url: ''
category: gui
motivation: 跨平台GUI元素通用视觉定位框架
```

#### 📝 一句话总结
UGround 提出通用 GUI 视觉定位模型，把自然语言描述的界面元素直接映射到屏幕像素坐标，解决 GUI Agent 依赖 HTML、Accessibility Tree 或候选框列表才能点击的问题。它配合 SeeAct-V 框架，让 Agent 只看截图、只执行像素级操作，也能跨 Web、桌面和移动平台完成定位。

#### 🎯 核心要点
- **视觉优先的 GUI Agent 形态**：只使用截图作为环境观察，不依赖 HTML、a11y tree、OCR 候选列表或预标注元素
- **SeeAct-V 两段式框架**：MLLM 先根据任务生成 textual plan / referring expression，UGround 再把该描述定位为屏幕坐标
- **大规模 GUI Grounding 数据**：构建约 10M GUI 元素、1.3M 截图的训练集，主体来自 Web 合成数据并补充 Android 开源数据
- **三类 referring expression**：覆盖视觉描述、位置描述、功能描述，以及多种组合式描述
- **基于 LLaVA-NeXT 的高分辨率定位模型**：采用 AnyRes 风格的高分辨率切片，输出绝对像素坐标而非归一化框
- **跨平台评测**：覆盖 ScreenSpot、Multimodal-Mind2Web、AndroidControl、OmniACT、Mind2Web-Live、AndroidWorld 等 grounding、offline agent、online agent 场景

#### 🔬 深入细节
##### 框架总览

![UGround / SeeAct-V 框架示意图](https://arxiv.org/html/2410.05243v3/x2.png)
*图：SeeAct-V 使用截图作为唯一环境观察，MLLM 负责规划文本动作，UGround 将动作中提到的 GUI 元素定位成像素坐标。*

##### 算法流程

```python
# UGround + SeeAct-V 推理流程
def seeact_v_step(task, screenshot, history):
    # 1. 规划模型只看截图和任务，生成下一步文字计划
    plan = mllm_planner.generate(
        instruction=task,
        image=screenshot,
        history=history,
    )
    # 例：plan = "Click the blue Submit button at the bottom right"

    # 2. 将计划中的目标元素转成 referring expression
    ref_expr = extract_target_expression(plan)

    # 3. UGround 输出元素中心像素坐标
    x, y = uground.predict_coordinate(
        image=screenshot,
        description=ref_expr,
    )

    # 4. 执行像素级 GUI 操作
    action = parse_operation(plan, coordinate=(x, y))
    execute(action)
    return action

# UGround 训练目标
for screenshot, ref_expr, target_xy in grounding_dataset:
    pred_tokens = model(screenshot, ref_expr)
    loss = cross_entropy(pred_tokens, tokenize(target_xy))
    update(loss)
```

##### 方法细节

**1. 动机与背景**

早期 GUI Agent 常把网页 HTML、移动端 accessibility tree 或检测出来的候选框交给 LLM，让模型在一个短列表里选元素。这种做法工程上有效，但并不符合真实用户的交互方式：用户看到的是屏幕渲染结果，并通过鼠标或触屏点击像素位置。HTML 和 a11y tree 还会带来噪声、缺失标注、跨平台不一致以及大量 token 成本。

UGround 的核心判断是：如果有一个足够强的视觉定位模型能从截图中找到“搜索框右侧的蓝色按钮”“商品卡片里的爱心图标”这类元素，那么 GUI Agent 就可以退化成一个更通用的两模块系统：规划模型负责“要做什么”，grounding 模型负责“点哪里”。

**2. SeeAct-V：把规划和定位解耦**

SeeAct-V 每一步只接收截图、任务指令和历史动作。MLLM 不需要直接输出坐标，而是生成文本计划或目标元素描述；UGround 接收截图 \(I\) 和元素描述 \(r\)，输出像素坐标 \(c=(x,y)\)：

$$
p_\theta(c \mid I, r)=\prod_{t=1}^{T}p_\theta(y_t \mid y_{<t}, I, r)
$$

这里 \(y_t\) 是坐标字符串的 token，例如 `"(1344, 652)"` 中的数字 token。训练时使用标准自回归交叉熵：

$$
\mathcal{L}_{ground}=-\sum_{t=1}^{T}\log p_\theta(y_t^\* \mid y_{<t}^\*, I, r)
$$

这种“用语言生成坐标”的方式让定位任务直接复用多模态大模型的生成接口，不需要额外设计框回归头。

**3. 数据构造：从网页合成跨平台 grounding**

论文的关键工程贡献是数据。网页天然同时拥有 DOM、渲染截图和元素边界框，因此可以自动获得元素与像素区域的对应关系。UGround 先从 Common Crawl 等网页来源收集截图和元素元数据，再为每个元素合成多样化 referring expression。

表达方式被分成三类：视觉表达关注文字、颜色、形状、图标等可见属性；位置表达关注绝对位置和相对位置；功能表达关注按钮或控件的用途，例如“打开购物车”“提交表单”。合成时既使用规则，也使用 LLaVA-NeXT 生成更自然的视觉/功能描述，再用 Llama-3 将表达压缩得更像用户或规划模型会说的话。最终训练集约 10M 元素、1.3M 截图，其中 Web-Hybrid 是主体，并补充 Web-Direct 与 Android 数据集提升跨平台泛化。

**4. 模型设计：高分辨率 GUI 截图是重点**

UGround 基于 LLaVA-NeXT 7B 做视觉定位适配。普通自然图像模型常在较低分辨率上训练，但 GUI 元素高度依赖小文字、小图标和布局关系，因此论文扩大 AnyRes 支持的输入分辨率，将大截图切成多个 CLIP@224 视觉切片，并用长上下文语言模型接收这些视觉 token。

模型输出的是绝对像素坐标，而不是归一化坐标或离散候选 ID。这一点对 GUI Agent 很重要：Agent 最终要执行鼠标点击或触屏点击，绝对坐标可以直接落到操作系统或浏览器环境中。

**5. 与 SeeClick / HTML-based Agent 的区别**

SeeClick 已经证明 GUI grounding 可以通过视觉模型完成，但 UGround 进一步强调“通用性”：训练数据更大，表达类型更丰富，评测覆盖 Web、桌面、移动三类平台。与 Mind2Web、WebArena 这类 HTML/a11y tree Agent 相比，UGround 不要求环境暴露结构化后端，也不要求先生成候选元素列表。

> 💡 关键：UGround 的价值不只是提高单步点击准确率，而是把 GUI Agent 的接口统一成“截图 + 文本描述 → 像素坐标”，从而减少平台依赖。

#### 🧪 练习题
```yaml
question: "UGround 在 SeeAct-V 中承担的核心职责是什么？"
options:
  - "根据用户任务生成完整网页操作计划"
  - "把规划模型产生的元素描述定位为屏幕像素坐标"
  - "从 HTML 中筛选候选 DOM 元素"
  - "训练奖励模型评价 Agent 是否完成任务"
answer: 1
explain: "SeeAct-V 中 MLLM 负责规划，UGround 负责 grounding：输入截图和 referring expression，输出可执行的像素坐标。"
```

### WebGPT

```yaml
id: webgpt
num: 10
name: WebGPT
full_name: 网页GPT (WebGPT)
year: '2021'
org: OpenAI
parent: —
paper_url: https://openai.com/index/webgpt/
project_url: ''
category: web
motivation: RLHF训练模型使用搜索引擎降低幻觉
```

#### 📝 一句话总结
WebGPT 将 GPT-3 放入可搜索、可引用的文本浏览器中，用人类演示和偏好反馈训练长答案问答模型，解决语言模型闭门生成时事实依据不足和幻觉难以评估的问题。它的核心不是简单检索，而是让模型像人类一样搜索、阅读、摘取引用并基于证据写答案。

#### 🎯 核心要点
- **文本浏览器环境**：模型通过 Search、Click、Find、Quote、Scroll、Back、End 等命令与搜索引擎和网页交互
- **引用约束答案生成**：模型必须在浏览过程中收集网页引用，最终答案附带 references，方便标注者检查事实准确性
- **人类演示数据**：标注者在同一浏览环境中回答 ELI5 长问答，形成行为克隆训练轨迹
- **偏好比较数据**：标注者比较两个带引用答案的整体质量，训练 reward model 预测人类偏好
- **训练组合**：使用行为克隆、奖励模型、RLHF/PPO、基于奖励模型的 rejection sampling；最佳模型主要来自行为克隆 + rejection sampling
- **评测结果**：最佳模型相对人类示范答案 56% 被偏好，相对 ELI5 最高票答案 69% 被偏好，并在 TruthfulQA 上提升真实回答比例

#### 🔬 深入细节
##### 框架总览

![WebGPT 浏览器演示界面](https://ar5iv.labs.arxiv.org/html/2112.09332/assets/images/demo_website.png)
*图：WebGPT 的人类演示界面。模型端看到的是同一浏览状态的文本化表示，并通过受限命令执行搜索、跳转、滚动和引用摘取。*

##### 算法流程

```python
# WebGPT 推理流程
def answer_with_browser(question):
    browser.reset(question)
    quotes = []

    for step in range(max_browse_steps):
        state_text = browser.render_text_state(
            question=question,
            current_page=True,
            cursor_position=True,
            past_actions=True,
            collected_quotes=quotes,
        )
        command = policy.generate(state_text)

        if command.startswith("Search"):
            browser.search(command.query)
        elif command.startswith("Clicked"):
            browser.click(command.link_id)
        elif command.startswith("Find in page"):
            browser.find(command.text)
        elif command.startswith("Quote"):
            quotes.append(browser.add_quote(command.text))
        elif command.startswith("Scrolled"):
            browser.scroll(command.direction, command.amount)
        elif command == "Back":
            browser.back()
        elif command == "End: Answer":
            break

    return policy.generate_answer(question, quotes)

# 偏好奖励模型 + rejection sampling
for question in eval_questions:
    candidates = [answer_with_browser(question) for _ in range(N)]
    best = max(candidates, key=lambda y: reward_model(question, y))
    return best
```

##### 方法细节

**1. 动机与背景**

传统开放域问答通常把检索器和生成器拆成两个系统：检索器找文档，生成器综合答案。WebGPT 选择另一条路线：直接训练一个语言模型使用现成搜索引擎，在交互过程中决定搜索词、点开哪些页面、在页面内查找什么、摘取哪些引用。这样做的好处是把“检索”和“综合”放进同一决策轨迹里，模型可以根据当前证据动态调整下一步搜索。

更重要的是，答案必须附带引用。没有引用时，标注者很难判断长答案中的细节是否正确；有引用后，比较两个答案时可以同时看事实依据、结构和有用性。这就是 WebGPT 降低幻觉的核心机制。

**2. 文本浏览环境**

模型并不直接操作完整浏览器 DOM，而是看到一个文本化状态：问题、当前页面标题、可见文本片段、链接编号、滚动位置、已执行动作、已收集引用等。模型输出必须是命令表中的合法动作；非法动作会被忽略但消耗步数。

动作空间包括搜索、点击链接、页内查找、引用当前页面文本、上下滚动、回退，以及结束浏览并进入回答阶段。这个设计把网页使用转化为序列决策问题：

$$
\tau=(o_1,a_1,o_2,a_2,\ldots,o_T,a_T)
$$

其中 \(o_t\) 是文本浏览状态，\(a_t\) 是受限命令。行为克隆阶段最大化人类演示轨迹的似然：

$$
\mathcal{L}_{BC}=-\sum_t \log \pi_\theta(a_t^\* \mid o_{\le t}, a_{<t})
$$

**3. 人类反馈：从比较到奖励模型**

WebGPT 收集两类人类数据：第一类是完整浏览演示，用于教模型如何搜索和引用；第二类是答案偏好比较，用于训练奖励模型。给定同一问题的两个答案 \(y_a,y_b\)，奖励模型用 Bradley-Terry 形式预测偏好概率：

$$
P(y_a \succ y_b)=\sigma(r_\phi(x,y_a)-r_\phi(x,y_b))
$$

对应损失为：

$$
\mathcal{L}_{RM}=-\log P(y_{chosen}\succ y_{rejected})
$$

训练好奖励模型后，有两种优化方式：一是用 PPO 直接优化策略，使答案获得更高奖励；二是 rejection sampling，在推理时采样多个候选答案，再选奖励模型分数最高的一个。论文中最佳结果来自行为克隆模型加 rejection sampling，这说明在可承受多次采样时，筛选比在线强化学习更稳定。

**4. 为什么引用机制有效**

引用不是装饰，而是训练和评估接口。模型在浏览时主动摘取证据，最终答案只能围绕这些证据组织；标注者比较答案时也能快速核查关键事实。这样，人类反馈不再只基于“读起来像不像”，而是更接近事实一致性评估。

但引用并不自动保证真实：模型仍可能选择低质量网页、误读证据或在引用之外添加推断。因此 WebGPT 的贡献是显著降低事实核查成本，而不是彻底解决真实性。

**5. 与后续 Web Agent 的关系**

WebGPT 主要解决长答案问答，动作集中在搜索、阅读和引用；Mind2Web 和 WebArena 则把网页交互扩展到点击表单、选择元素、跨页面执行任务。可以把 WebGPT 看作 Web Agent 的早期形态：它证明了 LLM 可以通过受限浏览动作与互联网交互，也证明了人类偏好反馈可以优化“带工具的语言模型”。

> 💡 关键：WebGPT 的 RLHF 不只是让答案更讨喜，而是把“搜索过程、引用证据、最终回答”统一放进可监督的交互轨迹里。

#### 🧪 练习题
```yaml
question: "WebGPT 要求模型在浏览过程中收集引用的主要目的是什么？"
options:
  - "减少模型输入长度"
  - "让标注者更容易评估答案事实准确性"
  - "替代搜索引擎排序算法"
  - "让 PPO 更新不需要奖励模型"
answer: 1
explain: "引用把答案中的事实主张连接到网页证据，使人类比较和事实核查更可靠，也间接约束模型少做无依据生成。"
```

### Mind2Web

```yaml
id: mind2web
num: 11
name: Mind2Web
full_name: 思维到网页 (Mind2Web)
year: '2023'
org: OSU
parent: webgpt
paper_url: https://arxiv.org/abs/2306.06070
project_url: ''
category: web
motivation: 跨域网页操作通用Agent基准
```

#### 📝 一句话总结
Mind2Web 提出面向真实网站的通用 Web Agent 数据集，并给出 MindAct 两阶段基线，用小模型先筛选 DOM 元素、再让 LLM 选择操作，解决真实网页 HTML 过长且跨网站泛化困难的问题。它把 Web Agent 从“搜索问答”推进到跨域、多步骤网页操作。

#### 🎯 核心要点
- **真实网站任务数据集**：包含 2,350 个任务，覆盖 137 个真实网站和 31 个二级领域
- **三部分实例结构**：任务描述、动作序列、网页快照；网页快照提供 MHTML、DOM snapshot、HAR、trace 等多种格式
- **动作表示**：每一步是 `(Target Element, Operation)`，操作包括 Click、Type、Select Option，部分 hover / enter 被统一到 Click
- **三种泛化划分**：Cross-Task、Cross-Website、Cross-Domain，分别考察同网站新任务、未见网站、未见领域
- **MindAct 两阶段模型**：DeBERTa 等小型 ranking LM 先选 top-k 元素，LLM 再用多选题形式预测元素和操作
- **严格评测指标**：Element Accuracy、Operation F1、Step Success Rate、Task Success Rate，任务成功要求所有步骤都正确

#### 🔬 深入细节
##### 框架总览

![MindAct 两阶段网页动作预测流程](https://ar5iv.labs.arxiv.org/html/2306.06070/assets/x3.png)
*图：MindAct 先用小型 ranking LM 从庞大 DOM 中筛出候选元素，再把候选元素组织成 LLM 可处理的多选输入并预测下一步动作。*

##### 算法流程

```python
# MindAct 单步动作预测
def predict_next_action(task, dom_snapshot, action_history):
    elements = extract_interactable_elements(dom_snapshot)

    # Stage 1: 候选元素生成
    scores = {}
    for elem in elements:
        query = build_query(task, action_history)
        elem_text = render_element(elem)  # tag, text, attributes, parent/children
        scores[elem.id] = ranker(query, elem_text)
    candidates = top_k(elements, scores, k=50)

    # Stage 2: LLM 多选动作预测
    groups = partition(candidates, size=5, add_none=True)
    selected = []
    for group in groups:
        prompt = build_multichoice_prompt(task, dom_snapshot, action_history, group)
        choice, operation, value = llm.predict(prompt)
        if choice != "None":
            selected.append((choice, operation, value))

    while len(selected) > 1:
        selected = rerank_by_multichoice(selected)

    if not selected:
        return "NoOp"
    return selected[0]  # (target_element, operation, optional_value)
```

##### 方法细节

**1. 动机与背景**

WebGPT 证明了语言模型可以使用搜索引擎回答问题，但它的动作空间主要是阅读和引用。真实网页任务更复杂：用户可能要筛选商品、填写表单、选择下拉框、跨页面比较信息。已有环境往往是简化网页或少量固定网站，无法衡量 Agent 对陌生网站和陌生领域的泛化。

Mind2Web 的目标是构建一个更接近真实互联网的离线基准。任务不是低层指令，而是高层目标，例如“找到符合条件的航班”或“在某网站修改筛选条件”。每一步标注目标元素和操作，让模型学习如何把自然语言目标落到具体 DOM 元素上。

**2. 数据集定义**

每个样本由三部分组成。第一是高层任务描述，不给逐步说明；第二是动作序列，每步包含目标元素与操作；第三是网页快照，保留原始网页状态，支持从不同表示方式建模。

动作形式可以写作：

$$
a_t=(e_t, o_t, v_t)
$$

其中 \(e_t\) 是当前网页的目标元素，\(o_t\in\{\text{Click},\text{Type},\text{Select}\}\)，\(v_t\) 是 Type 或 Select 所需的文本/选项参数。模型在第 \(t\) 步接收任务 \(g\)、当前页面 \(s_t\)、历史动作 \(h_{<t}\)，预测下一步动作：

$$
\hat{a}_t=\arg\max_a p_\theta(a \mid g, s_t, h_{<t})
$$

**3. 为什么需要两阶段模型**

真实网页 DOM 很大，平均可能包含上千个元素。直接把完整 HTML 输入 LLM 既昂贵又超出上下文限制，且大量节点与任务无关。MindAct 先用简单启发式过滤可见且有语义的元素，将平均元素数从约 1,135 降到 580，同时保留较高目标召回。

之后，DeBERTa-v3-base 作为 cross-encoder ranking LM，对“任务 + 历史动作”和每个候选元素文本做匹配打分：

$$
s_i=f_\theta(q_t, e_i), \quad C_t=\text{TopK}_{i}(s_i)
$$

候选元素文本不仅包含自身 tag、文本和属性，也包含父子节点的上下文，帮助模型判断元素在页面结构中的功能。

**4. LLM 动作预测：多选比自由生成稳定**

MindAct 不让 LLM 从零生成任意 DOM 路径，而是把 top-k 候选拆成多组，每组最多 5 个候选元素并附加 None 选项。LLM 对每组做多选，同时生成操作和参数；若多组都选中候选，再把选中的候选重新分组比较，直到得到单个元素。

这种设计把巨大网页动作空间压缩成多个小的选择题，降低了 LLM 的定位难度，也使 GPT-4、GPT-3.5 这类闭源模型可以通过 in-context learning 参与评测。

**5. 泛化评测的意义**

Mind2Web 的三个测试划分逐步提高难度：Cross-Task 中网站已见但任务新；Cross-Website 中领域已见但网站新；Cross-Domain 中领域也未见。论文结果显示，模型在 Cross-Task 上明显更好，而在未见网站/领域上显著下降，说明 Web Agent 的核心瓶颈不是“知道任务怎么分解”，而是把抽象意图稳定 grounding 到陌生页面结构。

> ⚠️ 注意：Mind2Web 是离线基准，评测的是给定快照下的下一步动作预测；它不要求模型在真实浏览器中执行并恢复错误，这一点与 WebArena 不同。

#### 🧪 练习题
```yaml
question: "MindAct 为什么要先用小型 ranking LM 过滤 DOM 元素？"
options:
  - "因为 LLM 无法生成自然语言操作"
  - "因为真实网页 HTML 元素太多，直接输入 LLM 成本高且噪声大"
  - "因为 Mind2Web 不提供网页快照"
  - "因为所有网页任务都只有一个可点击元素"
answer: 1
explain: "真实网页 DOM 往往有上千个元素，MindAct 先筛出 top-k 候选，再让 LLM 做小规模多选，从而提高效率和定位稳定性。"
```

### WebArena

```yaml
id: webarena
num: 12
name: WebArena
full_name: 网页竞技场 (WebArena)
year: '2023'
org: CMU
parent: mind2web
paper_url: https://arxiv.org/abs/2307.13854
project_url: ''
category: web
motivation: 长程推理基准模拟真实网站集群
```

#### 📝 一句话总结
WebArena 构建了可复现、自托管、功能完整的网站环境和 812 个长程网页任务，用程序化验证器评估任务是否真正完成，解决以往 Web Agent 基准过度简化、只比对动作轨迹而不验证结果的问题。它把网页 Agent 评测从离线下一步预测推进到真实浏览器中的端到端执行。

#### 🎯 核心要点
- **自托管真实网站集群**：包含电商、社交论坛、协作开发平台、内容管理系统四类网站，并导入真实风格数据
- **辅助工具与知识资源**：提供地图、计算器、草稿板，以及 Wikipedia、网站手册等外部知识源
- **形式化环境**：WebArena 定义为 \(\mathcal{E}=\langle\mathcal{S},\mathcal{A},\mathcal{O},\mathcal{T}\rangle\)，底层网站决定确定性状态转移
- **多模态/多表示观察**：观察包括 URL、标签页、页面内容；页面内容可表示为 HTML DOM、截图或 accessibility tree
- **复合动作空间**：支持元素操作、标签页操作、URL 导航；元素可用坐标或自动生成的元素 ID 指定
- **功能正确性评测**：每个任务用程序化 validator 判断最终状态是否满足目标，允许不同有效执行路径
- **强基线仍表现有限**：GPT-4 最佳端到端成功率约 14.41%，显著低于人类 78.24%

#### 🔬 深入细节
##### 框架总览

![WebArena 环境概览](https://raw.githubusercontent.com/web-arena-x/webarena/main/media/overview.png)
*图：WebArena 官方概览。环境由多个可交互网站、工具、知识资源和任务验证器组成，用于评估长程网页 Agent。*

##### 算法流程

```python
# WebArena 端到端评测流程
def evaluate_agent(agent, task_config):
    env = ScriptBrowserEnv(
        observation_type="accessibility_tree",  # 也可使用 html 或 screenshot
        current_viewport_only=True,
    )
    obs, info = env.reset(options={"config_file": task_config})
    history = []

    for step in range(max_steps):
        prompt = build_prompt(
            intent=task_config["intent"],
            observation=obs,
            history=history,
        )
        action_text = agent.generate(prompt)
        action = parse_action(action_text)

        obs, _, terminated, _, info = env.step(action)
        history.append((action_text, obs["url"]))

        if terminated or is_repeated_invalid(history):
            break

    # 不是比对参考轨迹，而是检查最终网站状态
    return task_config["validator"](env.current_state())
```

##### 方法细节

**1. 动机与背景**

Mind2Web 提供真实网页快照和人类动作标注，但它仍是离线下一步预测。真实网页任务更难：Agent 会犯错、需要恢复、可能打开多个标签页、需要使用外部工具，并且同一个目标可以通过多条路径完成。WebArena 因此强调两个标准：环境要足够真实，评测要可复现。

可复现通过自托管实现。WebArena 不依赖实时公网网站，避免 CAPTCHA、页面更新、账号状态变化等问题；真实感通过使用开源网站系统和导入真实风格数据实现，例如 GitLab 风格的协作开发、论坛、电商和 CMS。

**2. 环境形式化**

论文将 WebArena 表示为：

$$
\mathcal{E}=\langle\mathcal{S},\mathcal{A},\mathcal{O},\mathcal{T}\rangle
$$

其中 \(\mathcal{S}\) 是网站状态，\(\mathcal{A}\) 是浏览器动作，\(\mathcal{O}\) 是 Agent 可见观察，\(\mathcal{T}:\mathcal{S}\times\mathcal{A}\rightarrow\mathcal{S}\) 是由底层网站实现决定的状态转移。给定高层意图 \(\mathbf{i}\)，Agent 在第 \(t\) 步基于当前观察 \(o_t\)、历史动作和历史观察输出动作 \(a_t\)。

这一形式化和传统 RL 环境相似，但 WebArena 的状态不是网格或模拟器对象，而是真实 Web 应用的数据库、页面路由、登录用户、标签页状态和页面内容。

**3. 观察空间与动作空间**

观察空间模拟浏览器体验：当前 URL、打开的标签页、焦点标签页内容。页面内容可以是 DOM、截图或 accessibility tree。论文基线主要使用 accessibility tree，因为它比完整 DOM 紧凑，同时保留角色、文本、属性和可交互信息。

动作空间分三类：元素操作包括 click、hover、type、按键组合；标签页操作包括新建、关闭、切换；导航操作包括访问 URL、前进、后退。元素可以用屏幕坐标指定，也可以用遍历 DOM/a11y tree 时生成的 ID 指定，例如 `click [1582]`。

**4. 任务与验证器**

WebArena 发布 812 个任务实例，来自模板化高层意图。任务不是“点击第几个按钮”，而是更接近日常工作，例如跨页面查找信息、修改项目设置、比较内容、在 CMS 中完成配置等。关键创新在评测：每个任务都有 validator 检查最终状态是否满足目标。

如果只比对参考动作序列，Agent 采用另一条正确路径会被错判；如果只让人主观判断，评测不可复现。程序化验证器在两者之间取得平衡：只要最终网站数据库或页面状态正确，就判定成功。

**5. 基线结果揭示的难点**

论文评测 GPT-3.5、GPT-4、PaLM-2 等模型，并比较 direct prompting、chain-of-thought、是否提示不可达任务等策略。即使 GPT-4 在最佳设置下也只有约 14.41% 端到端成功率，人类约 78.24%。失败常来自长程状态追踪不足、过早停下、重复无效动作、缺少探索和错误恢复。

> 💡 关键：WebArena 的难点不是单步元素选择，而是长程闭环执行。一个早期错误可能改变后续页面状态，Agent 必须发现并恢复。

#### 🧪 练习题
```yaml
question: "WebArena 相比 Mind2Web 最核心的评测差异是什么？"
options:
  - "WebArena 只评测网页截图分类"
  - "WebArena 在自托管浏览器环境中端到端执行，并用验证器检查最终功能正确性"
  - "WebArena 不允许 Agent 使用自然语言任务"
  - "WebArena 只包含单步点击任务"
answer: 1
explain: "Mind2Web 主要是离线下一步动作预测，WebArena 要求 Agent 在可交互网站中执行完整任务，并以最终状态验证是否达成目标。"
```

### RT-1

```yaml
id: rt1
num: 13
name: RT-1
full_name: 机器人Transformer (Robotics Transformer)
year: '2022'
org: Google
parent: —
paper_url: https://arxiv.org/abs/2212.06817
project_url: ''
category: embodied
motivation: Transformer架构建模机器人动作序列
```

#### 📝 一句话总结
RT-1 提出面向真实机器人控制的 Robotics Transformer，把图像观察和自然语言指令映射为离散化机器人动作 token，解决大规模多任务机器人策略既要高容量又要实时执行的问题。它用 130K+ 真实演示训练 35M 参数模型，在数百条指令上展现强泛化和数据吸收能力。

#### 🎯 核心要点
- **端到端语言条件控制**：输入机器人相机图像和自然语言指令，输出机械臂、夹爪、底盘等低层动作
- **高效架构**：FiLM 条件化 EfficientNet 编码图像，TokenLearner 压缩视觉 token，Transformer 建模动作序列
- **离散动作建模**：连续动作维度被离散成动作 token，用分类/序列建模方式进行行为克隆
- **大规模真实数据**：约 130K demonstration episodes，覆盖 700+ 指令、13 台机器人、17 个月采集
- **实时控制**：35M 参数模型可约 3 Hz 执行，适合真实机器人闭环控制
- **泛化与数据吸收**：能泛化到新任务、干扰物和背景，并可吸收仿真数据和其他机器人数据而不明显损害原任务表现

#### 🔬 深入细节
##### 框架总览

![RT-1 架构概览](https://ar5iv.labs.arxiv.org/html/2212.06817/assets/x1.png)
*图：RT-1 接收图像和语言指令，经过 EfficientNet、TokenLearner 和 Transformer，输出离散化的机器人动作。*

##### 算法流程

```python
# RT-1 行为克隆训练
for episode in robot_demonstrations:
    instruction = episode.language_instruction
    history = []

    for image_t, action_t in episode:
        # 1. 视觉编码，语言通过 FiLM 调制视觉特征
        visual_tokens = efficientnet_film(image_t, instruction)

        # 2. TokenLearner 压缩空间 token，降低 Transformer 成本
        compact_tokens = token_learner(visual_tokens)

        # 3. Transformer 根据历史和当前观察预测动作 token
        pred_action_tokens = transformer(compact_tokens, instruction, history)

        # 4. 连续动作已离散成分类标签
        target_tokens = discretize(action_t)
        loss = cross_entropy(pred_action_tokens, target_tokens)
        update(loss)

        history.append((compact_tokens, target_tokens))

# 推理时循环执行
while not done:
    image = robot.camera()
    action_tokens = policy(image, instruction, history)
    action = undiscretize(action_tokens)
    robot.execute(action)
```

##### 方法细节

**1. 动机与背景**

机器人控制需要同时满足两个目标：模型要有足够容量理解语言、视觉和多任务结构；又必须足够快，能在真实机器人上闭环执行。纯 CNN 策略容量有限，难以吸收海量多任务数据；大型 Transformer 又可能太慢。RT-1 的贡献是在这两个约束之间做出工程上可运行的折中。

论文把语言条件机器人控制建模为序列决策。给定指令 \(i\) 和到当前时刻的视觉观察 \(\{x_j\}_{j=0}^{t}\)，策略输出动作分布：

$$
\pi_\theta(a_t \mid i, x_{\le t})
$$

训练使用行为克隆，即最大化人类/专家演示动作的似然。

**2. 架构拆解**

RT-1 的视觉前端是 EfficientNet。语言指令不只是拼接到末端，而是通过 FiLM 调制视觉特征，让视觉编码器在早期就根据任务关注相关物体和区域。之后 TokenLearner 从密集视觉特征中学习少量关键 token，减少 Transformer 处理的序列长度。

Transformer 负责整合时间上下文和任务条件，输出动作 token。与直接回归连续控制量相比，离散化动作让训练变成稳定的分类问题，也便于沿用序列模型的 next-token 风格目标。

**3. 动作离散化与损失**

设动作向量被拆成多个维度 \(a_t=(a_t^1,\ldots,a_t^D)\)，每个连续维度离散到固定 bins。训练目标可以写作：

$$
\mathcal{L}_{BC}
=-\sum_t\sum_{d=1}^{D}\log p_\theta(b_t^d \mid i,x_{\le t},b_t^{<d})
$$

其中 \(b_t^d\) 是第 \(d\) 个动作维度的离散 token。直觉上，模型不是一次输出一个浮点向量，而是像语言模型一样输出动作“词”。

**4. 大规模真实数据的作用**

RT-1 的训练数据来自 Everyday Robots 平台，包含 130K+ 演示和 700+ 训练指令。论文报告模型在训练指令上可达到高成功率，并且相对 BC-Z、Gato 等基线在新任务、干扰物、背景变化上更鲁棒。这说明 Transformer 的容量和数据规模配合后，可以学习跨任务共享的视觉-动作结构。

更有意义的是数据吸收实验：RT-1 可以加入仿真数据或其他机器人形态的数据，在不明显降低原有任务表现的情况下改善新场景泛化。这为后续 Open X-Embodiment、RT-X、OpenVLA 等“混合多机器人数据”路线奠定了方向。

**5. 与传统机器人策略的区别**

传统机器人策略常为单一任务训练，或者依赖显式状态估计、任务规划和手工控制器。RT-1 则把多任务语言条件控制尽量压缩成一个可扩展的序列模型：图像和指令进来，动作 token 出去。它仍是模仿学习，不保证超越示范者，也难以凭空学会训练数据完全没有的新运动模式，但它证明了真实机器人数据规模化后 Transformer 策略可以稳定工作。

> 💡 关键：RT-1 的“Transformer”价值不在于模型很大，而在于把机器人控制改写成可扩展的数据吸收问题。

#### 🧪 练习题
```yaml
question: "RT-1 使用 TokenLearner 的主要目的是什么？"
options:
  - "把自然语言翻译成机器人代码"
  - "从密集视觉特征中压缩出少量关键 token，降低 Transformer 实时控制成本"
  - "为每个任务训练独立策略头"
  - "替代机器人底层控制器完成电机驱动"
answer: 1
explain: "RT-1 需要在真实机器人上闭环运行，TokenLearner 将视觉 token 压缩后再交给 Transformer，使模型兼顾容量和推理速度。"
```

### PaLM-E

```yaml
id: palm_e
num: 14
name: PaLM-E
full_name: 具身多模态语言模型 (PaLM-E)
year: '2023'
org: Google
parent: rt1
paper_url: https://arxiv.org/abs/2303.03378
project_url: ''
category: embodied
motivation: 562B参数将传感器数据注入LLM嵌入
```

#### 📝 一句话总结
PaLM-E 将图像、状态估计、3D 表征等连续传感器输入编码成与词向量同维度的 token，插入 PaLM 的语言 token 序列中，解决 LLM 缺少真实世界 grounding、难以直接服务机器人规划的问题。它展示了一个模型同时做具身推理、视觉问答、图像描述和语言任务的可能性。

#### 🎯 核心要点
- **多模态句子 (multimodal sentence)**：把文本 token 与图像、状态、神经 3D 表征等连续观察 token 交错输入同一个 decoder-only LLM
- **传感器嵌入注入 LLM 空间**：连续观察经输入编码器映射到 PaLM 词嵌入维度，随后由自注意力统一处理
- **文本形式输出决策**：模型输出答案、计划或高层子目标文本，再由低层策略/规划器执行
- **多任务联合训练**：混合机器人规划、embodied VQA、captioning、通用视觉语言和语言任务，实现跨域正迁移
- **超大规模模型**：PaLM-E-562B 结合 540B PaLM 与 22B ViT，是具身多模态模型规模化的重要案例
- **减少灾难性遗忘**：模型越大，在多模态训练后保留原有语言能力越好

#### 🔬 深入细节
##### 框架总览

![PaLM-E 多模态句子框架](https://ar5iv.labs.arxiv.org/html/2303.03378/assets/x2.png)
*图：PaLM-E 将图像、状态和文本共同组织成多模态句子，输入预训练 LLM，并生成文本答案或机器人可执行的高层决策。*

##### 算法流程

```python
# PaLM-E 前向与机器人规划循环
def palm_e_generate(task_text, observations, history):
    tokens = []
    tokens += text_tokenize(task_text)

    for obs in observations:
        # 图像、状态、3D 表征等连续输入被编码为 LLM embedding 空间中的 token
        obs_tokens = sensor_encoder(obs)
        tokens += obs_tokens

    tokens += text_tokenize(history)
    return decoder_only_llm.generate(tokens)

def embodied_control_loop(goal):
    history = ""
    while True:
        image = robot.camera()
        subgoal_text = palm_e_generate(goal, [image], history)

        if subgoal_text == "terminate":
            break

        # PaLM-E 生成高层语言决策，底层策略执行连续控制
        low_level_policy.execute(subgoal_text, duration_seconds=4)
        history += summarize(subgoal_text)
```

##### 方法细节

**1. 动机与背景**

LLM 拥有语言知识和推理能力，但原生输入是离散文本。机器人任务需要把“桌上红色方块在左边”这种感知状态与语言目标绑定起来，还要在环境变化后重新规划。传统做法常把 LLM 当高层 planner，再接外部感知模块和 affordance 模型；PaLM-E 则尝试让 LLM 自身直接接收传感器 embedding，从模型内部完成语言与感知的对齐。

**2. 多模态句子**

PaLM-E 的关键接口是多模态句子。普通 decoder-only LLM 处理文本序列：

$$
p(w_{1:L})=\prod_{l=1}^{L}p(w_l \mid w_{<l})
$$

PaLM-E 将连续观察 \(o\) 经编码器 \(g_\psi\) 变成若干 embedding token，并与文本 embedding \(E(w)\) 拼接：

$$
z = [E(w_1),\ldots,g_\psi(o_1),\ldots,E(w_L)]
$$

随后仍使用自回归语言建模目标生成文本：

$$
p_\theta(y \mid z)=\prod_t p_\theta(y_t \mid y_{<t}, z)
$$

因此，图像或状态不是作为外部检索结果附加，而是像“词”一样进入 Transformer 的注意力计算。

**3. 输出为什么仍是文本**

PaLM-E 不直接输出低层机器人关节动作，而是输出文本形式的答案、计划或子目标。例如在移动操作任务中，它根据当前图像和长程目标输出下一步语言指令，低层策略再以较高频率执行。这样做的好处是复用 LLM 的语言接口和世界知识，也便于与不同机器人 embodiment 连接。

这与 RT-1 的直接动作策略不同：RT-1 是图像+语言到动作 token；PaLM-E 是图像/状态+语言到文本决策。前者更像低层控制策略，后者更像具身多模态推理器。

**4. 联合训练与正迁移**

PaLM-E 在多个机器人环境和视觉语言任务上联合训练，包括 TAMP、Language-Table、移动操作、VQA 和 captioning。论文观察到跨域 transfer：视觉语言数据能帮助具身规划，机器人数据也没有完全破坏通用视觉语言能力。尤其在少量机器人数据场景中，预训练和混合训练提供了明显收益。

模型还引入了 OSRT 等神经场景表示作为输入编码方式，用于将 3D 场景结构压缩为可被 LLM 消化的 token。这说明 PaLM-E 的框架不仅限于 2D 图像，也可以接收更结构化的连续感知表示。

**5. 模型规模与遗忘**

PaLM-E-562B 是论文中最重要的规模化结果。小模型在多模态/具身训练后更容易损失原有语言能力；大模型则保留得更好。论文报告最大模型在 OK-VQA 等视觉问答任务上也具备强性能，并展示多图推理、OCR-free 数学和零样本多模态 CoT 等能力。

> 💡 关键：PaLM-E 的核心创新不是“给机器人接一个 LLM”，而是把连续传感器输入变成 LLM token，使感知和语言推理发生在同一个自注意力空间中。

#### 🧪 练习题
```yaml
question: "PaLM-E 的 multimodal sentence 指的是什么？"
options:
  - "把多个自然语言句子拼成一个长 prompt"
  - "把图像、状态等连续观察编码成 token，并与文本 token 交错输入 LLM"
  - "把机器人动作离散成 256 个文本 token"
  - "只用图像 caption 替代所有传感器输入"
answer: 1
explain: "PaLM-E 将连续传感器模态映射到语言模型 embedding 空间，与文本 token 一起被 decoder-only LLM 处理。"
```

### RT-2

```yaml
id: rt2
num: 15
name: RT-2
full_name: 机器人Transformer 2 (RT-2)
year: '2023'
org: DeepMind
parent: palm_e
paper_url: https://arxiv.org/abs/2307.15818
project_url: ''
category: embodied
motivation: VLA范式将动作表示为文本Token
```

#### 📝 一句话总结
RT-2 提出 Vision-Language-Action (VLA) 范式，把机器人动作编码成文本 token，并将 Web 规模视觉语言模型与机器人轨迹共同微调，解决纯机器人数据难以带来语义泛化的问题。它让同一个模型既能继承 VLM 的视觉语言知识，又能直接输出可执行机器人动作。

#### 🎯 核心要点
- **动作即语言**：将连续机器人动作离散化后映射到已有 tokenizer 的保留 token，以文本序列形式训练和解码
- **VLA 模型族**：在 PaLI-X 和 PaLM-E 等预训练 VLM 上构建 RT-2-PaLI-X 与 RT-2-PaLM-E
- **动作空间设计**：包含 6-DoF 末端执行器位移/旋转、夹爪扩展和 episode termination，连续维度离散为 256 bins
- **Co-fine-tuning**：机器人轨迹数据与原始 Web 视觉语言任务共同微调，避免只在机器人数据上微调导致泛化退化
- **受限动作解码**：执行机器人任务时限制输出词表，只允许合法动作 token，保证可执行性
- **真实机器人规模评测**：约 6K 次真实评测，展示未见物体、符号、关系理解和简单语义推理能力
- **云端实时推理**：55B 模型通过多 TPU 云服务约 1-3 Hz 控制，5B 模型约 5 Hz

#### 🔬 深入细节
##### 框架总览

![RT-2 VLA 框架概览](https://ar5iv.labs.arxiv.org/html/2307.15818/assets/x1.png)
*图：RT-2 将机器人动作视为另一种语言，把动作 token 与互联网视觉语言数据一起训练，使 VLM 成为可执行策略。*

##### 算法流程

```python
# RT-2 co-fine-tuning
for batch in mixed_batches(robot_data, web_vl_data):
    if batch.type == "robot":
        image, instruction, continuous_action = batch

        # 1. 连续动作离散化
        bins = discretize_to_256_bins(continuous_action)

        # 2. 将每个 bin 映射为 action token，并拼成文本目标
        target_text = " ".join(action_token[b] for b in bins)

        # 3. 用 next-token objective 训练 VLM 输出动作文本
        loss = vlm.next_token_loss(image, instruction, target_text)
    else:
        image, text_prompt, text_answer = batch
        loss = vlm.next_token_loss(image, text_prompt, text_answer)

    update(loss)

# 机器人推理：限制解码词表为合法动作 token
def rt2_control(image, instruction):
    token_string = vlm.generate(
        image=image,
        prompt=instruction,
        allowed_tokens=ACTION_TOKEN_SET,
    )
    return decode_action_tokens(token_string)
```

##### 方法细节

**1. 动机与背景**

RT-1 已经证明大规模真实机器人数据可以训练通用动作策略，但它主要从机器人数据中学习。机器人数据昂贵、覆盖窄，很难包含“把物体放到数字 3 上”“拿起最小的物体”“选择适合作为工具的物品”这类开放语义。视觉语言模型在互联网图文数据上见过大量物体、符号和关系，但普通 VLM 只能输出文本，不能直接控制机器人。

RT-2 的核心想法是把动作也写成文本。只要机器人动作可以被 tokenizer 表示，预训练 VLM 就能用同一个 next-token loss 学会在机器人场景下输出动作 token。

**2. 动作 token 化**

机器人动作由多个维度组成，包括末端执行器平移、旋转、夹爪和终止信号。连续维度被均匀离散为 256 个 bins：

$$
b^d_t=\text{bin}(a^d_t), \quad b^d_t \in \{0,\ldots,255\}
$$

然后每个 bin 映射到一个保留文本 token，整个动作向量变成一个短文本序列：

$$
y_t=[\text{tok}(b_t^1),\ldots,\text{tok}(b_t^D)]
$$

训练目标仍是自回归语言建模：

$$
\mathcal{L}_{VLA}=-\sum_t\sum_j \log p_\theta(y_{t,j}^\* \mid I_t, x, y_{t,<j}^\*)
$$

其中 \(I_t\) 是当前图像，\(x\) 是语言指令。对 VLM 来说，动作 token 与普通词 token 在训练接口上没有差别。

**3. Co-fine-tuning 为什么重要**

如果只把预训练 VLM 在机器人轨迹上微调，模型会快速适配动作输出，但可能丢失 Web 数据带来的语义知识。RT-2 因此在同一训练过程中混合机器人数据和原始视觉语言任务，并提高机器人数据采样权重。这样模型一边学习低层动作分布，一边保持对开放世界物体、符号和关系的理解。

论文消融显示，co-fine-tuning 优于只微调机器人数据，也优于从头训练。直觉上，机器人数据告诉模型“如何动”，Web 数据维持模型“知道世界是什么”。

**4. 合法动作约束与实时控制**

标准 VLM 可能生成任意文本，但机器人执行需要固定格式动作。RT-2 在机器人任务解码时限制词表，只允许动作 token，从而保证输出可解析。对非机器人视觉语言任务，模型仍可输出普通自然语言。

由于模型最大达到 55B 参数，无法直接部署在机器人本地 GPU 上。论文使用云端 TPU 服务进行推理，真实机器人通过网络查询模型动作，55B 约 1-3 Hz，5B 约 5 Hz。这是把超大 VLM 用于闭环机器人控制的重要工程尝试。

**5. 与 PaLM-E 和 RT-1 的区别**

PaLM-E 主要输出文本计划或高层子目标，需要低层策略执行；RT-1 直接输出动作，但知识主要来自机器人数据。RT-2 处在两者之间：它继承 VLM 的语义知识，同时直接输出低层动作 token。这也是 VLA 范式的价值。

> 💡 关键：RT-2 的“动作即语言”让机器人控制第一次可以大规模复用互联网视觉语言预训练，而不是只依赖昂贵的机器人轨迹。

#### 🧪 练习题
```yaml
question: "RT-2 中 co-fine-tuning 的主要作用是什么？"
options:
  - "只用机器人数据从零训练一个小模型"
  - "同时训练机器人动作数据和 Web 视觉语言任务，使模型既会行动又保留语义知识"
  - "把所有动作都改成人类可读的自然语言解释"
  - "在推理时取消动作 token 的词表约束"
answer: 1
explain: "RT-2 混合机器人轨迹和原始视觉语言数据共同微调，避免模型只适配动作而丢失来自 Web 预训练的语义泛化能力。"
```

### VIMA

```yaml
id: vima
num: 16
name: VIMA
full_name: 多模态提示机器人 (VIMA)
year: '2023'
org: NVIDIA
parent: rt2
paper_url: https://arxiv.org/abs/2210.03094
project_url: ''
category: embodied
motivation: 多模态提示词驱动的任务规范
```

#### 📝 一句话总结
VIMA 提出用多模态提示统一描述机器人操作任务，将语言、目标图像、物体图像和视频示范交错成 prompt，并用 Transformer 自回归输出动作，解决不同机器人任务需要不同任务接口和策略架构的问题。它把机器人任务规范从单一语言指令扩展为更表达力强的 multimodal prompt。

#### 🎯 核心要点
- **多模态 prompt 任务接口**：文本与图像/视频帧交错，可表达语言指令、视觉目标、单样本模仿、视觉约束和视觉推理
- **VIMA-Bench**：基于 Ravens 模拟器构建 17 类任务、600K+ expert trajectories 和四级泛化评测协议
- **对象中心视觉表示**：用检测器把场景图像解析成对象 token，每个对象包含边界框位置和裁剪图像特征
- **Transformer 编码-解码架构**：T5 编码 prompt，因果 Transformer decoder 通过交替 self-attention / cross-attention 生成动作
- **自回归动作建模**：每一步基于 prompt、当前观察和历史动作预测机器人控制动作
- **可扩展与数据高效**：训练 2M 到 200M 参数模型，在最难零样本泛化设置下相对替代方案最高约 2.9 倍成功率

#### 🔬 深入细节
##### 框架总览

![VIMA 架构示意图](https://ar5iv.labs.arxiv.org/html/2210.03094/assets/x3.png)
*图：VIMA 使用预训练 T5 编码多模态 prompt，并用带 cross-attention 的因果 Transformer 控制器根据观察和历史动作生成机器人动作。*

##### 算法流程

```python
# VIMA 训练/推理核心流程
def encode_multimodal_prompt(prompt):
    prompt_tokens = []
    for segment in prompt:
        if segment.type == "text":
            prompt_tokens += t5_text_encoder(segment.text)
        elif segment.type in ["scene_image", "object_image", "video_frame"]:
            objects = object_detector(segment.image)
            for obj in objects:
                box_feat = box_mlp(normalize(obj.box))
                crop_feat = vit_encoder(obj.crop)
                prompt_tokens.append(project(concat(box_feat, crop_feat)))
    return prompt_tokens

def vima_policy(prompt, observations, action_history):
    prompt_tokens = encode_multimodal_prompt(prompt)
    obs_tokens = encode_object_tokens(observations[-1])

    # decoder 交替 self-attention 处理历史，cross-attention 读取 prompt
    action = transformer_decoder.generate(
        prompt_tokens=prompt_tokens,
        observation_tokens=obs_tokens,
        action_history=action_history,
    )
    return action

for trajectory in expert_data:
    prompt = trajectory.prompt
    for t in range(len(trajectory)):
        pred = vima_policy(prompt, trajectory.obs[:t+1], trajectory.actions[:t])
        loss = action_loss(pred, trajectory.actions[t])
        update(loss)
```

##### 方法细节

**1. 动机与背景**

机器人任务规范非常分散：有的任务用自然语言描述，有的给目标图像，有的给视频示范，有的要求避开某个视觉区域。传统方法往往为不同任务接口设计不同模型和数据管线，难以组合。VIMA 的核心观察是：这些任务都可以写成“多模态 prompt”，即一段交错的文本和视觉 token。

例如，视觉目标任务可以写成“把当前物体摆成 <goal image> 的样子”；单样本模仿可以写成“跟随 <frame1>, <frame2>, ... 的轨迹”；视觉约束可以写成“不要进入 <image> 表示的区域”。统一接口之后，训练目标也可以统一成序列建模。

**2. VIMA-Bench**

VIMA-Bench 基于 Ravens tabletop manipulation simulator 构建。它包含 17 类代表性任务，每类任务可程序化生成大量物体、纹理和布局组合，总计 600K+ 专家轨迹。评测协议有四个等级，从训练分布内随机布局到组合变化、未见对象、未见任务，逐步增加零样本泛化难度。

这种设计让研究者能系统测量模型是否真正理解 prompt 中的视觉概念，而不是只记住固定任务模板。

**3. 对象中心 tokenization**

VIMA 不直接把整张图像作为密集 patch 输入控制器，而是先用检测器解析场景对象。每个对象 token 包含两部分：归一化边界框位置和裁剪图像特征。边界框可表示为：

$$
b=[x_{center},y_{center},h,w]
$$

裁剪图像经过 ViT 编码，位置经过 MLP 编码，两者拼接后投影到 Transformer embedding 维度。对象中心表示减少了背景噪声，也让模型更容易对“目标物体”“同纹理物体”“容器”等实体做绑定。

**4. Prompt 编码与动作解码**

文本部分使用预训练 T5 的 tokenizer 和 embedding；视觉部分转成对象 token；整个 prompt 被编码后作为条件。控制器是因果 Transformer decoder，使用 self-attention 处理历史观察和动作，用 cross-attention 读取 prompt：

$$
p(a_{1:T}\mid P,o_{1:T})=\prod_{t=1}^{T}p_\theta(a_t \mid P,o_{\le t},a_{<t})
$$

这里 \(P\) 是多模态 prompt，\(o_t\) 是对象化观察，\(a_t\) 是当前步动作。VIMA 的动作通常对应 tabletop pick-and-place 操作中的连续位姿参数，训练时用模仿学习拟合专家轨迹。

**5. 与 RT-1 / RT-2 的区别**

RT-1 和 RT-2 的任务主要通过自然语言指令给出；VIMA 更强调“任务规范本身可以是多模态的”。RT-2 将动作写成文本 token 来复用 VLM 预训练，VIMA 则将任务描述写成多模态 prompt 来统一多种机器人任务。两者都体现了序列模型思想，但切入点不同：RT-2 统一动作输出格式，VIMA 统一任务输入格式。

> 💡 关键：VIMA 的强项是 prompt 表达力。只靠一句自然语言很难精确指定新物体、新轨迹或视觉约束，而多模态 prompt 可以直接把这些信息放进模型输入。

#### 🧪 练习题
```yaml
question: "VIMA 中多模态 prompt 的主要作用是什么？"
options:
  - "只用来生成图像 caption"
  - "把语言、目标图像、视频示范等任务规范统一成一个序列输入接口"
  - "替代所有机器人动作，不再需要控制器"
  - "把真实机器人数据转换成网页 DOM"
answer: 1
explain: "VIMA 的核心是用文本和视觉 token 交错的 prompt 表达多类机器人任务，再由同一个 Transformer 控制器根据 prompt 和观察输出动作。"
```

### RoboFlamingo

```yaml
id: roboflamingo
num: 17
name: RoboFlamingo
full_name: 机器人火烈鸟 (RoboFlamingo)
year: '2024'
org: PKU
parent: vima
paper_url: https://arxiv.org/abs/2311.01378
project_url: ''
category: embodied
motivation: 视觉语言模型作为高效模仿学习器
```

#### 📝 一句话总结
RoboFlamingo 提出了一种把 OpenFlamingo 视觉语言基础模型改造成机器人模仿学习策略的简单框架，解决了从大规模 VLM 到长时序机器人控制之间缺少低成本适配路径的问题。它将单步视觉语言理解交给预训练 VLM，将历史建模和动作预测交给显式 policy head，从而在 CALVIN 语言条件操控任务上取得强性能。

#### 🎯 核心要点
- 基于 OpenFlamingo 构建机器人策略，复用其视觉编码器、Perceiver Resampler 与 gated cross-attention 视觉语言融合能力
- 将机器人策略分解为单步多模态理解 \(X_t=f_\theta(o_t,l)\) 和历史条件动作预测 \(a_t=p_\theta(X_t,h_{t-1})\)
- 使用显式 policy head 建模历史，可选 LSTM、decoder-only Transformer/GPT 或 MLP 变体
- 动作空间覆盖 7-DoF 末端执行器相对位姿与夹爪开合状态
- 训练采用最大似然模仿学习：连续位姿用 MSE，夹爪状态用 BCE
- 微调时主要训练 resampler、gated cross-attention 与 policy head，其余 OpenFlamingo 参数冻结
- 在 CALVIN 长时序语言条件操控基准上验证，强调数据效率、零样本语言泛化和单机可训练部署

#### 🔬 深入细节
##### 框架总览

![RoboFlamingo 框架图](https://ar5iv.labs.arxiv.org/html/2311.01378/assets/x2.png)
*图：RoboFlamingo 使用 Flamingo backbone 对当前视觉观测和语言指令做单步融合，再由 policy head 建模历史并预测机器人动作。*

##### 算法流程

```python
# RoboFlamingo 模仿学习伪代码
for batch in language_conditioned_demos:
    obs_seq, lang, action_seq = batch
    history_state = init_state()
    losses = []

    for t, obs_t in enumerate(obs_seq):
        # OpenFlamingo backbone: 单步视觉语言理解
        visual_tokens = vision_encoder(obs_t.images)
        compact_tokens = perceiver_resampler(visual_tokens)
        X_t = flamingo_decoder(compact_tokens, lang)

        # Policy head: 历史建模 + 动作预测
        pred_pose_t, pred_gripper_t, history_state = policy_head(X_t, history_state)

        pose_loss = mse(pred_pose_t, action_seq[t].pose_delta)
        grip_loss = bce(pred_gripper_t, action_seq[t].gripper_open)
        losses.append(pose_loss + grip_loss)

    loss = mean(losses)
    update(resampler, gated_cross_attention, policy_head, loss)
```

##### 方法细节

RoboFlamingo 的核心动机是：视觉语言基础模型已经具备物体识别、语言理解、视觉 grounding 等能力，但机器人操控还需要时间连续性、状态记忆和低层动作输出。直接把 VLM 当成端到端控制器并不自然，因为 Flamingo 类模型预训练时主要看的是图文对或交错图文，而不是连续机器人轨迹。RoboFlamingo 因此不强迫 VLM 自己完成全部决策，而是让它负责每一步的视觉语言表示，再把时序决策交给额外 policy head。

论文把策略写成：

$$
X_t = f_\theta(o_t, l)
$$

$$
a_t = p_\theta(X_t, h_{t-1})
$$

其中 \(o_t\) 是当前多视角图像和本体感知，\(l\) 是语言目标，\(X_t\) 是 OpenFlamingo 融合后的单步特征，\(h_{t-1}\) 是历史隐藏状态。这个分解的直觉是：视觉语言理解和控制历史建模不是同一个问题，前者可以从大规模预训练迁移，后者必须用机器人演示数据学习。

在视觉侧，输入图像先经过预训练视觉编码器得到 patch token，再由 Perceiver Resampler 压缩为少量视觉 token。压缩后的 token 通过 Flamingo 的 gated cross-attention 注入语言模型解码层，使语言指令和视觉状态在同一表示空间中对齐。相比从零训练机器人视觉编码器，这一步直接继承了 OpenFlamingo 的视觉语言先验。

在控制侧，policy head 负责将 \(X_t\) 与历史 \(h_{t-1}\) 转换为动作。论文比较了不看历史的 MLP、将历史帧送入 VLM 的 MLP、decoder-only Transformer/GPT 以及 LSTM。结论是历史信息很关键，但让 VLM 本体直接处理连续帧未必最优，因为 VLM 预训练并没有学习机器人时间动力学；显式 policy head 是更稳妥的折中。

训练目标是标准模仿学习。连续控制量如末端执行器相对位姿使用均方误差：

$$
\mathcal{L}_{pose}=\left\|\hat{a}^{pose}_t-a^{pose}_t\right\|_2^2
$$

夹爪开合是二分类，使用二元交叉熵：

$$
\mathcal{L}_{grip}=-y_t\log \hat{y}_t-(1-y_t)\log(1-\hat{y}_t)
$$

总损失为二者加权和。实现上只微调 resampler、gated cross-attention 和 policy head，冻结大部分 VLM 参数，以控制训练成本并避免完全破坏预训练能力。

与 RT-1/RT-2 或 VIMA 类路线相比，RoboFlamingo 的重点不是重新设计一个机器人原生 Transformer，而是用最小改动把现成 VLM 变成模仿学习器。它的优势是实现简单、训练成本低、可以在单 GPU 服务器上训练/评估；代价是动作空间和历史建模仍依赖额外 policy head，且真实机器人迁移还需要足够的机器人演示数据。

> 💡 关键：RoboFlamingo 的“有效”来自任务分工，而不是单纯把更多图像帧塞进 VLM。VLM 负责每步理解，policy head 负责时序控制。

#### 🧪 练习题
```yaml
question: "RoboFlamingo 为什么要在 OpenFlamingo backbone 后增加显式 policy head？"
options:
  - "为了把所有机器人动作转换成自然语言回答"
  - "为了建模历史观测并输出连续机器人动作，而不是让 VLM 单独承担时序控制"
  - "为了完全冻结视觉编码器并只训练语言词表"
  - "为了替代 Perceiver Resampler 的视觉 token 压缩功能"
answer: 1
explain: "OpenFlamingo 擅长单步视觉语言融合，但机器人操控需要历史状态和连续动作预测。policy head 正是用来建模 \(h_{t-1}\) 并输出 7-DoF 动作与夹爪状态。"
```

### OpenVLA

```yaml
id: openvla
num: 18
name: OpenVLA
full_name: 开源视觉语言动作模型 (OpenVLA)
year: '2024'
org: Stanford
parent: rt2
paper_url: https://arxiv.org/abs/2406.09246
project_url: ''
category: embodied
motivation: 基于Open X-Embodiment的7B开源VLA
```

#### 📝 一句话总结
OpenVLA 提出了一个 7B 参数开源 Vision-Language-Action 模型，把图像观测和语言指令映射为离散动作 token，解决了此前 VLA 模型大多闭源、难以复现和难以低成本微调的问题。它基于 Prismatic VLM、Open X-Embodiment 机器人数据和动作 token 化训练，成为开源机器人通用策略的重要基线。

#### 🎯 核心要点
- 开源 7B VLA：发布模型权重、训练代码、微调 notebook 和 Open X-Embodiment 数据训练支持
- 使用 Prismatic-7B VLM backbone：DINOv2 + SigLIP 双视觉编码器、MLP projector、Llama 2 7B 语言模型
- 训练数据来自 Open X-Embodiment，筛选约 970k 真实机器人演示轨迹，覆盖多机器人、多任务、多场景
- 将连续 7 维机器人动作离散为每维 256 个 bin，并复用 Llama tokenizer 中最少使用的 256 个 token 作为动作 token
- 使用 next-token prediction 目标训练，但只在动作 token 上计算交叉熵损失
- 系统研究 VLA 低成本适配：LoRA 微调、量化推理和远程 VLA inference server
- 相比 RT-2-X 55B 更小且开源，在多机器人任务上取得更高平均成功率

#### 🔬 深入细节
##### 框架总览

![OpenVLA 模型架构](https://arxiv.org/html/2406.09246v3/x1.png)
*图：OpenVLA 接收图像观测和语言指令，经 DINOv2+SigLIP 视觉编码、projector 和 Llama 2 语言模型，输出 7 维机器人动作 token。*

##### 算法流程

```python
# OpenVLA 训练与推理伪代码
for image, instruction, continuous_action in openx_dataset:
    # 1. 视觉语言输入
    siglip_feat = siglip_encoder(image)
    dinov2_feat = dinov2_encoder(image)
    visual_tokens = projector(concat(siglip_feat, dinov2_feat))

    # 2. 动作离散化：每一维映射到 256 个 bin
    action_bins = []
    for d in range(7):
        q1, q99 = quantile_bounds[d]
        bin_id = discretize(continuous_action[d], q1, q99, num_bins=256)
        action_bins.append(bin_id)

    action_tokens = map_bins_to_llama_tokens(action_bins)

    # 3. 只对动作 token 做 next-token prediction
    logits = llama2_backbone(visual_tokens, instruction, action_tokens[:-1])
    loss = cross_entropy(logits.action_positions, action_tokens)
    update_all_parameters(loss)

# 推理时：自回归生成动作 token，再反量化为连续控制量
pred_tokens = generate_action_tokens(image, instruction)
robot_action = detokenize(pred_tokens, quantile_bounds)
execute(robot_action)
```

##### 方法细节

OpenVLA 的出发点是 VLA 范式已经被 RT-2 等模型证明有效，但关键系统仍然闭源：模型结构、数据配比、训练细节和部署代码都不可见。这使得研究者很难比较设计决策，也很难把通用 VLA 迁移到新的机器人平台。OpenVLA 的贡献不是提出复杂的新控制算法，而是给出一个可复现、可微调、可部署的开源 VLA 配方。

模型 backbone 选择 Prismatic-7B。它的视觉侧同时使用 SigLIP 和 DINOv2：SigLIP 提供语义对齐能力，DINOv2 提供更强的局部空间表征。二者输出拼接后经 projector 映射到语言模型嵌入空间，再作为视觉 token 送入 Llama 2 7B。这个选择针对机器人控制很关键，因为操控任务不仅要知道“是什么物体”，还要知道物体的位置、相对关系和可抓取区域。

动作建模是 OpenVLA 最核心的工程化设计。给定连续动作 \(a\in\mathbb{R}^{7}\)，每个维度单独离散化为 256 个 bin。论文不用全局 min/max，而用训练集该维度动作的 1% 和 99% 分位点作为边界：

$$
b_d=\text{clip}\left(\left\lfloor 256\cdot\frac{a_d-q_{1,d}}{q_{99,d}-q_{1,d}}\right\rfloor,0,255\right)
$$

这样可以降低异常动作值对 bin 宽度的影响，避免少量 outlier 让大部分正常动作挤在很窄的区间里。由于 Llama tokenizer 可新增 special token 数量不足，OpenVLA 直接覆盖词表中最少使用的 256 个 token，将它们作为动作 bin token。

训练目标仍是语言模型熟悉的 next-token prediction，但只在动作 token 位置计算损失：

$$
\mathcal{L}_{VLA}=-\sum_{t\in \mathcal{A}}\log p_\theta(y_t\mid y_{<t}, I, x)
$$

其中 \(\mathcal{A}\) 是动作 token 位置，\(I\) 是图像，\(x\) 是语言指令。直觉上，OpenVLA 把“控制机器人”改写为“在视觉语言上下文中生成动作字符串”，从而复用大模型训练基础设施。

数据方面，OpenVLA 从 Open X-Embodiment 中构建约 970k 条真实机器人演示轨迹，覆盖 WidowX、Google Robot 等不同 embodiment。论文的消融显示，OpenX 的数据多样性比单一 BridgeData V2 更能带来泛化能力；缺少大规模多场景预训练时，性能会明显下降。

部署与适配是 OpenVLA 区别于闭源 VLA 的另一重点。论文验证 LoRA 可以在单张 A100 上完成新任务微调，且只训练少量参数即可接近全量微调效果；量化推理可显著降低显存占用；远程 inference server 允许机器人端只发送观测并接收动作，减少本地算力要求。

> ⚠️ 注意：OpenVLA 当前主要支持单张图像观测，不直接建模长历史、多相机流或本体感知序列。这是它作为开放基线的清晰边界，也是后续 VLA 工作常见的扩展方向。

#### 🧪 练习题
```yaml
question: "OpenVLA 为什么将连续机器人动作离散成语言模型 token？"
options:
  - "为了让动作预测可以复用 VLM 的自回归 next-token prediction 训练框架"
  - "为了让机器人只输出自然语言解释，不再执行动作"
  - "为了避免使用图像编码器"
  - "为了将所有任务限制为单一机器人平台"
answer: 0
explain: "OpenVLA 将动作维度离散为 256 个 bin 并映射到 tokenizer token，使 VLM 可以像生成文本一样生成动作序列，并只在动作 token 上计算交叉熵损失。"
```

### MM-ReAct

```yaml
id: mm_react
num: 19
name: MM-ReAct
full_name: 多模态推理行动 (MM-ReAct)
year: '2023'
org: Microsoft
parent: —
paper_url: https://arxiv.org/abs/2303.11381
project_url: ''
category: framework
motivation: 将ReAct推理框架扩展到多模态场景
```

#### 📝 一句话总结
MM-ReAct 提出了一种无需训练的多模态 ReAct 框架，让 ChatGPT 通过文本协议调用一组视觉专家模型，解决纯文本 LLM 无法直接处理图像、视频和空间信息的问题。它把图片路径、坐标和视觉专家输出都文本化，使 LLM 能在多轮推理中规划、调用工具并整合观察结果。

#### 🎯 核心要点
- 将 ReAct 的 “Thought → Action → Observation” 模式扩展到多模态视觉理解任务
- 使用 ChatGPT 作为高层控制器，视觉专家模型作为外部工具池
- 用文件路径或 URL 作为图像/视频占位符，让文本 LLM 可以在对话中引用非文本输入
- 通过 prompt 注入每个视觉专家的能力、输入参数、输出格式和 few-shot 示例
- 使用 watchword 与正则表达式解析 ChatGPT 的工具调用请求，并将工具输出序列化为文本 observation
- 支持多图推理、OCR/图表/表格理解、目标检测、空间坐标理解、视频摘要、开放概念识别等任务
- 与联合微调式多模态模型不同，MM-ReAct 强调可插拔、训练免费、工具可升级的系统范式

#### 🔬 深入细节
##### 框架总览

![MM-ReAct 流程图](https://ar5iv.labs.arxiv.org/html/2303.11381/assets/x2.png)
*图：MM-ReAct 的单轮工具调用流程。ChatGPT 生成 action request，系统解析后调用视觉专家，专家输出被文本化为 observation 再反馈给 ChatGPT。*

##### 算法流程

```python
# MM-ReAct 多模态推理行动伪代码
history = []
vision_experts = {
    "Caption": caption_model,
    "OCR": ocr_model,
    "Detection": detector,
    "Segmentation": segmenter,
    "VideoSummary": video_model,
}

while not done:
    prompt = build_prompt(
        user_query=user_query,
        file_paths=uploaded_images_or_videos,
        tool_descriptions=expert_specs,
        history=history,
    )

    response = chatgpt(prompt)

    if contains_watchword(response):  # 例如 "Assistant, ..."
        expert_name, file_path, args = regex_parse(response)
        raw_result = vision_experts[expert_name](file_path, **args)
        observation = serialize_to_text(raw_result)
        history.append((response, observation))
    else:
        final_answer = response
        done = True
```

##### 方法细节

MM-ReAct 面对的核心限制是：ChatGPT 这类 LLM 在当时只能接收文本输入，而高级视觉任务需要理解图像、视频、空间坐标和视觉对象关系。传统做法是训练一个端到端多模态模型，但这需要大量图文数据和模型改造。MM-ReAct 选择系统组合路线：让 LLM 不直接“看图”，而是规划何时调用合适的视觉专家，并把专家结果转成文本继续推理。

非文本输入的表示方式非常朴素：直接把图像或视频的文件路径写进 prompt。路径本身不包含视觉语义，但它给 LLM 一个可引用的句柄。例如用户上传 `receipt_1.jpg`，ChatGPT 可以生成对 OCR 工具的请求并指明这个文件路径。系统看到工具调用请求后实际执行 OCR，再把识别出的文字返回给 ChatGPT。

MM-ReAct 的协议来自 ReAct：

$$
\text{LLM}: \text{Thought} \rightarrow \text{Action Request}
$$

$$
\text{System}: \text{Action Execution} \rightarrow \text{Observation}
$$

LLM 每轮先写出推理过程，再决定是否调用视觉专家。如果需要工具，输出中包含特定 watchword。系统用正则表达式解析专家名称、文件路径和参数，执行工具后把结果转成自然语言或结构化文本。例如检测模型输出边界框时，会序列化为 `<object name, x1, y1, x2, y2>`，并附上坐标含义说明。

这种“文本化视觉观察”的好处是最大化复用 LLM 的推理能力。LLM 不需要读像素，只要能读懂专家返回的文字、坐标、OCR 文本或 caption，就可以继续进行多步组合推理。例如多张发票求和可以先逐张调用 OCR，再用 LLM 做数值汇总；图表问答可以先 OCR 或检测关键区域，再进行逻辑推理。

MM-ReAct 与 Visual ChatGPT、ViperGPT 等同期系统的差异在于定位。Visual ChatGPT 更偏图像生成和编辑工具链，ViperGPT 通常生成一次性 Python 程序，而 MM-ReAct 更强调多轮对话式视觉理解和工具观察回流。它不要求对 LLM 或视觉专家做联合训练，因此工具池可以持续替换或扩展。

局限也很明确：prompt 中要手动写入工具说明，专家数量受上下文窗口限制；所有视觉信息都要被压缩为文本，细粒度视觉结构可能丢失；系统依赖正则解析和 prompt 约定，鲁棒性不如原生多模态模型。但作为多模态 Agent 的早期框架，它清晰展示了“LLM 负责规划，专家负责感知”的可行范式。

> 💡 关键：MM-ReAct 不是让 ChatGPT 直接理解图像，而是给 ChatGPT 一个可调用、可观察、可迭代的视觉工具接口。

#### 🧪 练习题
```yaml
question: "MM-ReAct 中，图像文件路径在 prompt 中的主要作用是什么？"
options:
  - "直接把图像像素编码进 ChatGPT 的词表"
  - "作为非文本输入的占位符，使 ChatGPT 能指定哪个文件应交给视觉专家处理"
  - "替代所有视觉专家模型"
  - "只用于保存最终答案的缓存地址"
answer: 1
explain: "ChatGPT 不能直接读取像素，但可以在文本中引用文件路径。系统解析路径后调用相应视觉专家，并把专家输出文本化为 observation。"
```

### LLaVA-Plus

```yaml
id: llava_plus
num: 20
name: LLaVA-Plus
full_name: LLaVA增强版 (LLaVA-Plus)
year: '2023'
org: UW-Madison
parent: mm_react
paper_url: https://arxiv.org/abs/2311.05437
project_url: ''
category: framework
motivation: 维护外部视觉工具库实现动态Agent
```

#### 📝 一句话总结
LLaVA-Plus 提出了一种让开源大多模态模型学会使用外部视觉工具的多模态 Agent，解决了纯 prompt 工具链不稳定、纯端到端 LMM 难以覆盖大量专用视觉技能的问题。它通过技能仓库和视觉指令微调，让 LLaVA 能主动选择、调用并组合工具结果完成复杂任务。

#### 🎯 核心要点
- 在 LLaVA 基础上加入 skill repository，包含多种预训练视觉与视觉语言工具
- 让 LMM 承担工具 planner 角色，直接基于用户图像和指令决定是否调用工具
- 训练数据覆盖视觉理解、生成、外部知识检索和多工具组合
- 使用 ChatGPT/GPT-4 辅助构造多模态 tool-use instruction-following 数据
- 提出 user-oriented dialogue 与 skill-oriented dialogue 的统一表示
- 推理包含四步：用户输入 → LLaVA-Plus 发起工具请求 → 工具执行 → LLaVA-Plus 综合工具结果回答
- 相比 MM-ReAct 纯 prompt 编排，LLaVA-Plus 通过视觉指令微调把工具选择能力内化到开源 LMM 中

#### 🔬 深入细节
##### 框架总览

![LLaVA-Plus 四步工具管线](https://ar5iv.labs.arxiv.org/html/2311.05437/assets/x2.png)
*图：LLaVA-Plus 的四步流程。模型接收图像和指令后，可以发起 skill-oriented dialogue 调用工具，再整合工具输出生成最终回答。*

##### 算法流程

```python
# LLaVA-Plus tool-use 推理伪代码
image_query, text_query = user_input
dialogue_state = []

while True:
    model_output = llava_plus(
        image=image_query,
        text=text_query,
        history=dialogue_state,
        skill_specs=skill_repository_schema,
    )

    if model_output.type == "tool_call":
        tool = skill_repository[model_output.tool_name]
        tool_result = tool(image_query, **model_output.arguments)
        dialogue_state.append({
            "request": model_output,
            "observation": serialize(tool_result),
        })
    else:
        final_answer = model_output.answer
        break
```

##### 方法细节

LLaVA-Plus 的问题意识来自两类路线的缺口。端到端 LMM 通过图文预训练和指令微调获得通用视觉理解能力，但很难把分割、OCR、检测、生成、知识检索等大量专门技能都塞进一个模型权重中。工具链方案如 MM-ReAct 可以调用外部模型，但主要依赖 prompt engineering，工具选择不稳定，且 LLM 在规划时未必真正利用图像特征。

LLaVA-Plus 的折中方案是“Plug and Learn to Use Skills”：把外部视觉模型组织成 skill repository，同时用多模态指令微调训练 LLaVA 学会何时调用这些工具。也就是说，工具能力仍然保留在外部专家中，但工具选择、参数生成和结果整合能力被训练进 LMM。

论文把对话分成两类。第一类是 user-oriented dialogue，模型直接回答用户问题：

$$
({\bf I}_q, {\bf X}_q) \rightarrow {\bf X}_{answer}
$$

第二类是 skill-oriented dialogue，模型先生成工具请求，再根据工具返回结果继续回答：

$$
({\bf I}_q, {\bf X}_q) \rightarrow {\bf X}_{skill}
\rightarrow {\bf O}_{skill}
\rightarrow {\bf X}_{answer}
$$

其中 \({\bf I}_q\) 是用户图像，\({\bf X}_q\) 是文本指令，\({\bf X}_{skill}\) 是工具调用描述，\({\bf O}_{skill}\) 是工具输出。关键差异是：LLaVA-Plus 在整个会话中始终保留原始图像输入，而不是只在工具调用时临时把图像交给外部专家。这让模型在规划阶段也能结合视觉上下文。

训练数据由多种工具使用样例构成，包括 grounding、tagging、caption、OCR、分割、图像生成和外部知识检索等。作者利用 ChatGPT/GPT-4 生成或整理 instruction-following 样例，使模型学习“用户意图 → 工具选择 → 参数组织 → 结果综合”的完整链路。推理时有两种使用方式：All Tools 预先调用多种工具作为外部知识，Fly 则按需动态调用相关工具以节省成本。

与 MM-ReAct 相比，LLaVA-Plus 的核心提升在于 planner 本身是多模态的。MM-ReAct 的 ChatGPT 只能看到文本化图像路径和工具描述，LLaVA-Plus 则直接看到图像，并通过训练学会把视觉内容与工具选择对齐。这对于需要细粒度视觉定位、OCR 或分割的任务尤其重要。

工程上，LLaVA-Plus 可以通过 FastChat 服务部署，web server 接收用户请求，model worker 运行 LMM，tool worker 运行技能仓库，controller 协调模型和工具。这个结构使新工具可以继续插入：为新工具收集相应 instruction-following 数据，再做指令微调即可扩展模型能力。

> 💡 关键：LLaVA-Plus 不是把所有视觉技能都重新训练进 LLaVA，而是训练 LLaVA 作为多模态 planner 去“会用工具”。

#### 🧪 练习题
```yaml
question: "LLaVA-Plus 相比 MM-ReAct 的关键区别是什么？"
options:
  - "LLaVA-Plus 完全不使用外部工具"
  - "LLaVA-Plus 只支持文本输入，不支持图像"
  - "LLaVA-Plus 通过视觉指令微调让多模态模型学习工具选择和组合，而不是只靠 prompt 编排"
  - "LLaVA-Plus 将所有工具输出丢弃，只保留模型原始回答"
answer: 2
explain: "MM-ReAct 主要依赖文本 LLM 和 prompt 规则调用工具；LLaVA-Plus 则让开源 LMM 在图像上下文中学习 tool-use dialogue，更稳定地选择、调用和整合工具。"
```

### Qwen-Agent

```yaml
id: qwen_agent
num: 21
name: Qwen-Agent
full_name: 通义千问智能体 (Qwen-Agent)
year: '2024'
org: Alibaba
parent: llava_plus
paper_url: https://qwen.ai/blog/qwen3.5
project_url: ''
category: framework
motivation: 原生多模态能力与百万级Token长上下文
```

#### 📝 一句话总结
Qwen-Agent 以 Qwen3.5 的原生多模态、长上下文和内置工具调用能力为核心，提供面向搜索、代码解释器、函数调用和多模态任务的智能体范式。它解决了传统外接工具 Agent 在上下文长度、多模态理解和工具使用自适应方面割裂的问题。

#### 🎯 核心要点
- Qwen3.5-397B-A17B 是原生视觉语言模型，面向 reasoning、coding、agent capability 与 multimodal understanding
- 使用 hybrid architecture：Gated Delta Networks 线性注意力 + sparse Mixture-of-Experts
- 总参数约 397B，每次前向激活约 17B 参数，强调推理效率和成本控制
- Qwen3.5-Plus 托管版本默认支持 1M token 上下文窗口
- 官方托管能力包含 built-in tools 与 adaptive tool use，可用于 Web Search、Code Interpreter 等 Agent 功能
- ModelStudio API 通过 `enable_thinking`、`enable_search` 等参数显式控制推理模式和搜索/代码工具
- 支持 201 种语言和方言，适合跨语言、跨模态、长上下文 Agent 场景

#### 🔬 深入细节
##### 框架总览

![Qwen 官方标识图](https://img.alicdn.com/imgextra/i1/O1CN013ltlI61OTOnTStXfj_!!6000000001706-55-tps-330-327.svg)
*图：Qwen 官方页面标识图。该条目的主要来源是 Qwen3.5 官方博客而非传统论文 PDF，方法核心是原生多模态模型 + 长上下文 + 内置工具调用。*

##### 算法流程

```python
# Qwen-Agent / Qwen3.5-Plus 工具增强推理伪代码
messages = [{"role": "user", "content": user_request}]

response_stream = qwen_client.chat.completions.create(
    model="qwen3.5-plus",
    messages=messages,
    extra_body={
        "enable_thinking": True,   # 开启推理模式
        "enable_search": True,     # 开启搜索与 Code Interpreter 等工具能力
    },
    stream=True,
)

for event in response_stream:
    if event.type == "tool_call":
        tool_result = execute_builtin_tool(event.tool_name, event.arguments)
        messages.append({"role": "tool", "content": tool_result})
    else:
        yield event.delta
```

##### 方法细节

Qwen-Agent 在这份任务清单中对应的是 Qwen3.5 官方博客所描述的原生多模态 Agent 能力，而不是一篇独立的 arXiv 算法论文。它的重点不在于搭建一个像 MM-ReAct 那样由外部专家拼接的 prompt 系统，而是把多模态理解、长上下文和工具调用能力统一放在 Qwen 模型与托管服务接口中。

Qwen3.5-397B-A17B 的底层设计使用稀疏 MoE：总参数规模约 397B，但每次前向只激活约 17B 参数。这样做的直觉是把大模型知识容量和推理成本解耦：模型可以拥有接近 400B 级别的知识与能力上限，但在线服务时只计算一小部分专家，降低延迟和成本。

其注意力结构还引入 Gated Delta Networks 形式的线性注意力，与 sparse MoE 结合形成 hybrid architecture。对于 Agent 系统，这一点很关键，因为 Agent 往往需要处理很长的任务历史、网页内容、检索结果、代码执行日志和多轮工具返回。长上下文能力不足时，系统只能靠摘要或外部记忆硬切上下文，容易丢失任务约束。

Qwen3.5-Plus 的托管版本默认提供 1M token context window，并带有官方内置工具与 adaptive tool use。可以把它抽象成一个策略：

$$
y_t = \pi_\theta(x_{\leq t}, m_{\leq t}, o_{\leq t}, \mathcal{T})
$$

其中 \(x\) 是用户输入，\(m\) 是多模态内容，\(o\) 是历史工具观察，\(\mathcal{T}\) 是可调用工具集合。模型在每步可以选择直接回答，也可以发起工具调用，再根据工具 observation 继续推理。

API 层的 `enable_thinking` 和 `enable_search` 是面向 Agent 的显式控制开关。`enable_thinking` 激活更强的推理流程，适合规划、复杂数学、代码或多跳任务；`enable_search` 允许模型使用搜索和 Code Interpreter 等工具能力。与早期工具 Agent 相比，开发者不需要自己维护复杂的正则解析协议或工具 prompt，只需通过官方接口暴露工具能力。

与 LLaVA-Plus 的外部 skill repository 相比，Qwen-Agent 的方向更偏“模型原生 + 平台内置”。LLaVA-Plus 训练开源 LMM 学会使用若干视觉工具；Qwen3.5 则把多模态能力、长上下文、搜索、代码解释器和函数调用整合到一个统一模型/服务生态中。它的优势是上下文与工具调用更紧密，缺点是部分托管能力依赖平台实现，论文级细节不如开源算法充分。

> ⚠️ 注意：任务清单中的 `paper_url` 是 Qwen 官方博客入口，实际可访问页面通常以 `https://qwen.ai/blog?id=qwen3.5` 或 Alibaba Cloud 同步博客呈现。这里保持 YAML 元信息不变，只在解读中按官方博客内容说明。

#### 🧪 练习题
```yaml
question: "Qwen3.5-Plus 中 1M token 上下文和内置工具能力对 Agent 的主要价值是什么？"
options:
  - "让 Agent 只能处理单轮短文本问答"
  - "减少对外部工具的需求，并让模型在长任务历史、检索结果和工具观察中持续推理"
  - "强制所有工具调用都通过正则表达式解析"
  - "将视觉输入转换为不可读的随机 token"
answer: 1
explain: "长上下文可容纳任务历史和工具返回，内置工具与 adaptive tool use 则让模型在搜索、代码执行和回答之间自适应切换。"
```

### UI-Voyager

```yaml
id: ui_voyager
num: 22
name: UI-Voyager
full_name: UI航行者 (UI-Voyager)
year: '2026'
org: Tencent
parent: uground
paper_url: https://arxiv.org/abs/2603.24533
project_url: ''
category: frontier_2026
motivation: 群体相对自我蒸馏实现步级监督学习
```

#### 📝 一句话总结
UI-Voyager 提出了一种两阶段自进化移动 GUI Agent 训练框架，用 RFT 自动筛选成功轨迹，用 GRSD 从成功/失败轨迹的分叉点构造步级监督，解决长程 GUI 任务中失败轨迹难利用和稀疏奖励信用分配困难的问题。其 4B 模型在 AndroidWorld 上达到 81.0% Pass@1。

#### 🎯 核心要点
- 面向 AndroidWorld 移动 GUI 自动化，覆盖 116 个真实 App 任务
- 第一阶段 Rejection Fine-Tuning：模型自主 rollout，多次采样后由规则 verifier 过滤成功轨迹做 SFT
- 第二阶段 Group Relative Self-Distillation：对同任务的一组成功/失败轨迹做相对比较
- 使用 SSIM 等相似度匹配跨轨迹相同屏幕状态，定位 fork point
- 从成功轨迹提取正确动作、思维过程和工具调用过程，纠正失败轨迹中的关键错误步
- 将稀疏轨迹级成功/失败信号转化为密集步级监督，缓解长程任务 credit assignment
- 相比直接从 Qwen3-VL-4B-Instruct 做 PPO/GRPO，RFT + GRSD 更高效、更稳定

#### 🔬 深入细节
##### 框架总览

![UI-Voyager 训练管线](https://arxiv.org/html/2603.24533v1/x2.png)
*图：UI-Voyager 的两阶段训练管线。RFT 自动收集成功轨迹，GRSD 在成功与失败轨迹之间检测 fork point 并构造自纠错样本。*

##### 算法流程

```python
# UI-Voyager RFT + GRSD 伪代码
policy = qwen3_vl_4b_instruct

# Stage 1: Rejection Fine-Tuning
for round_id in range(num_rft_rounds):
    accepted = []
    for task in androidworld_tasks:
        trajectories = rollout(policy, task, k=num_samples)
        for tau in trajectories:
            if rule_based_verifier(task, tau) == "success":
                accepted.append(tau)
    policy = supervised_finetune(policy, accepted)

# Stage 2: Group Relative Self-Distillation
for task in androidworld_tasks:
    group = rollout(policy, task, k=group_size)
    success_trajs = [tau for tau in group if tau.success]
    failed_trajs = [tau for tau in group if not tau.success]

    corrective_samples = []
    for tau_minus in failed_trajs:
        for tau_plus in success_trajs:
            fork = find_fork_point(tau_plus, tau_minus, sim="SSIM")
            if fork is not None:
                sample = build_step_supervision(
                    observation=tau_minus.obs[fork.failed_step],
                    teacher_thought=tau_plus.thought[fork.success_step],
                    teacher_action=tau_plus.action[fork.success_step],
                )
                corrective_samples.append(sample)

    policy = mixed_sft(policy, accepted + corrective_samples)
```

##### 方法细节

UI-Voyager 的核心问题是 GUI 任务的奖励极度稀疏。一个 AndroidWorld 任务可能需要十几步点击、输入、滑动和导航，最终成功才有正反馈。如果整条轨迹失败，传统 RL 很难判断到底是哪一步出了错；直接丢弃失败轨迹又浪费了大量交互数据，因为失败轨迹前半段往往包含正确操作。

第一阶段 RFT 解决冷启动问题。模型从 Qwen3-VL-4B-Instruct 出发，在真实任务环境中对每个任务采样多条轨迹，规则 verifier 只保留成功轨迹，再用这些成功轨迹做监督微调。重复多轮后，数据分布和模型能力共同进化：模型越强，采到的成功轨迹越多；成功数据越多，下一轮模型越强。

RFT 的限制是它只学习成功轨迹，仍然没有解释失败轨迹的错误点。GRSD 的关键 insight 是：同一个任务的多条 rollout 往往会走到相同屏幕状态，但下一步动作不同。若一条成功、一条失败，那么它们在相同状态后的分歧就是高价值监督信号。论文称这些共享状态上的分歧为 fork point。

fork point 检测可抽象为：

$$
\text{SAME}(o_i^+, o_j^-)=\mathbb{1}[\text{Sim}(o_i^+,o_j^-)>\tau]
$$

$$
\text{Fork}(i,j)=\text{SAME}(o_i^+,o_j^-)\land a_i^+ \neq a_j^-
$$

其中 \(o_i^+\) 来自成功轨迹，\(o_j^-\) 来自失败轨迹。UI-Voyager 使用 SSIM 做视觉状态匹配，找到两个轨迹“看见同一屏幕但做了不同决定”的位置，再把成功轨迹在该步的思考、动作和工具调用过程抽出来，作为失败轨迹该状态下的 teacher signal。

这样一来，原本只有终局成败的轨迹级信号被转化为步级纠错数据：

$$
\mathcal{D}_{corr}=\{(o_j^-, q, \text{thought}_i^+, a_i^+)\}
$$

训练时把成功轨迹样本与自纠错样本混合做 SFT。相比 PPO/GRPO 这类标准 RL 方法，GRSD 不需要从稀疏奖励中估计每一步优势，而是直接利用“同状态成功动作 vs 失败动作”的相对关系，给模型更清晰的监督。

论文在 AndroidWorld 上报告 4B 模型达到 81.0% Pass@1，超过多个更大模型和报告的人类水平。消融显示，RFT 可显著提升初始能力，而 GRSD 进一步把 RFT 模型从约 73.2% 提升到 81.0%，标准 PPO/GRPO 则进展更慢并在较低水平附近平台化。

> 💡 关键：GRSD 的价值不是简单“从成功样本学习”，而是把失败样本中可定位的关键错误步骤改造成高质量监督样本。

#### 🧪 练习题
```yaml
question: "UI-Voyager 中 GRSD 的核心作用是什么？"
options:
  - "把所有失败轨迹直接删除，只保留成功轨迹"
  - "通过成功/失败轨迹的相同屏幕状态找到分叉点，并用成功动作纠正失败轨迹的关键错误步"
  - "将 AndroidWorld 任务改写为纯文本问答"
  - "用更大的模型替换所有训练算法"
answer: 1
explain: "GRSD 通过跨轨迹状态匹配找到 fork point，把稀疏轨迹奖励转化为密集步级监督，从而更有效地学习失败经验。"
```

### DART-GUI

```yaml
id: dart_gui
num: 23
name: DART-GUI
full_name: 解耦智能体强化学习 (DART-GUI)
year: '2026'
org: UC Berkeley
parent: ui_voyager
paper_url: https://openreview.net/forum?id=fNFnJ9thLa
project_url: ''
category: frontier_2026
motivation: 异步采样与训练提升RL吞吐量
```

#### 📝 一句话总结
DART-GUI 提出了解耦式 GUI Agent 强化学习训练框架，将环境交互、rollout 推理、数据管理和训练更新拆成异步模块，解决 GUI 多轮 RL 中环境慢、GPU 等待和高质量交互样本不足的问题。它通过自适应数据整理和异步训练，在 OSWorld 上显著提升 7B GUI Agent 成功率与系统吞吐。

#### 🎯 核心要点
- DART 表示 Decoupled Agentic RL Training，面向 VLM GUI Agent 的多轮 RL
- 四个异步模块：Environment Cluster、Rollout Service、Data Manager、Trainer
- rollout-wise trajectory sampling 将整条轨迹作为调度单元，减少空闲环境和空闲 GPU
- per-worker model synchronization 让 worker 渐进同步新权重，避免全局阻塞
- adaptive data curation 包含任务难度自适应 rollout、经验池、高熵步骤筛选和截断重要性采样
- Trainer 使用 step-wise GRPO 更新，重点训练高不确定性关键步骤
- 项目页报告 DART-GUI-7B 在 OSWorld 达到 42.13% task success rate，并提升 rollout GPU 利用率、训练吞吐和环境利用率

#### 🔬 深入细节
##### 框架总览

![DART-GUI 解耦训练框架](https://computer-use-agents.github.io/dart-gui/stats/framework.png)
*图：DART-GUI 将 GUI Agent RL 拆为环境集群、rollout 服务、数据管理器和训练器四个异步模块。*

##### 算法流程

```python
# DART-GUI 异步 RL 训练伪代码
env_cluster = launch_desktop_envs(num_envs=hundreds)
rollout_service = launch_policy_workers(policy)
data_manager = TrajectoryStore()
trainer = GRPOTrainer(policy)

while training:
    # Environment Cluster: 并行执行 GUI 任务
    for env in env_cluster.ready_envs():
        task = data_manager.assign_task(env)
        rollout_service.enqueue(env, task)

    # Rollout Service: 以轨迹为单位生成动作与思考
    for worker in rollout_service.idle_workers():
        traj = worker.sample_trajectory(max_len=data_manager.length_for(task))
        data_manager.add(traj, reward=evaluate(traj))

    # Data Manager: 自适应筛选训练样本
    batch = data_manager.sample(
        include_experience_pool=True,
        select_high_entropy_steps=True,
        adjust_rollout_by_task_difficulty=True,
    )

    # Trainer: 异步执行 step-wise GRPO
    loss = trainer.step(batch, truncated_importance_sampling=True)
    rollout_service.sync_weights_per_worker(policy)
```

##### 方法细节

DART-GUI 的主要矛盾不是“奖励函数怎么写”，而是 GUI 环境交互太慢导致 RL 系统低效。每一步 GUI 操作都要等待桌面或浏览器响应、截图、解析状态、再调用大模型生成下一步。若使用传统同步 RL 流程，所有环境必须等待最慢 rollout，GPU 也会在环境执行期间空转。

DART 将系统拆成四个异步模块。Environment Cluster 负责启动大量桌面环境并并行执行任务；Rollout Service 负责用当前策略生成 thought/action；Data Manager 负责存储、打分、过滤和调度轨迹；Trainer 负责从筛选后的样本中做策略更新。模块之间非阻塞通信，不要求环境采样和模型训练严格交替。

rollout-wise sampling 是系统效率的关键。传统 batch sampling 往往要求一批环境对齐步数，DART 把一条完整轨迹作为独立调度单元：哪个 worker 空闲，就接一个轨迹；哪个环境完成，就立即开始下一个任务。这样可以减少由于任务长度差异和 GUI 响应时间差异带来的等待。

数据整理方面，DART 不把所有 rollout 平等用于训练。它根据任务学习进度动态调整采样次数和最大轨迹长度：容易任务减少 rollout，困难任务保留更多探索；任务的轨迹长度参考历史成功轨迹，避免在短任务上浪费 100 步预算。对于极难任务，系统维护成功轨迹经验池，当在线采样全失败时也能给训练器至少一个正向学习信号。

高熵步骤筛选用于定位关键决策。对每个 step，系统计算生成 token 的平均熵，优先保留高不确定性步骤进行优化。直觉是很多 GUI 步骤是机械重复或低风险操作，训练它们收益有限；真正决定成败的是少数需要选择菜单、文件夹、按钮或输入内容的分叉步骤。

由于 rollout policy 和 trainer policy 在异步系统中可能不同步，DART 使用截断重要性采样稳定训练：

$$
\rho_t=\text{clip}\left(\frac{\pi_\theta(a_t\mid s_t)}{\pi_{\text{rollout}}(a_t\mid s_t)}, 0, c\right)
$$

梯度按 \(\rho_t\) 重加权，既利用异步采样带来的吞吐提升，又限制策略漂移导致的训练不稳定。Trainer 采用 step-wise GRPO 形式更新，使 GUI Agent 能从多步轨迹中更细粒度地学习。

项目页报告 DART-GUI-7B 在 OSWorld 上达到 42.13% 成功率，相比基线 UI-TARS-1.5-7B 有明显提升；系统效率上，rollout GPU 利用率、训练吞吐和环境利用率均提升。需要注意的是，任务清单给出的 OpenReview id 当前不如项目页和可检索公开条目稳定，但 YAML 中仍保留原始 `paper_url`。

> 💡 关键：DART-GUI 的创新点在“系统解耦 + 数据自适应”，它让 GUI RL 从慢速同步流程变成可持续流水线。

#### 🧪 练习题
```yaml
question: "DART-GUI 为什么要将环境、rollout、数据管理和训练解耦？"
options:
  - "为了让所有环境必须等待同一条轨迹完成"
  - "为了减少 GUI 交互延迟导致的 GPU/环境空闲，并支持异步采样与训练"
  - "为了取消所有奖励信号"
  - "为了只训练低熵、确定性最高的步骤"
answer: 1
explain: "GUI 环境交互慢且轨迹长度不一致，同步 RL 会造成大量等待。DART 的四模块异步设计能让环境、rollout 和训练持续并行运行。"
```

### Aguvis

```yaml
id: aguvis
num: 24
name: Aguvis
full_name: 统一纯视觉GUI智能体 (Aguvis)
year: '2025'
org: UIUC
parent: cogagent
paper_url: https://aguvis-project.github.io/
project_url: ''
category: frontier_2026
motivation: 摆脱DOM依赖的纯视觉像素操作
```

#### 📝 一句话总结
Aguvis 提出了统一纯视觉 GUI Agent 框架，只依赖屏幕图像、自然语言指令和统一动作空间完成跨 web、desktop、mobile 的自动化操作，解决了传统 GUI Agent 对 DOM、accessibility tree 或闭源大模型协作的依赖问题。它通过两阶段训练先学习 GUI grounding，再学习规划、推理和 inner monologue。

#### 🎯 核心要点
- 纯视觉输入：直接基于屏幕截图操作，不依赖 DOM、HTML、accessibility tree 或平台专属文本结构
- 跨平台统一：面向 web、desktop、mobile 使用一致的视觉观测和动作空间
- 插件化动作系统：通过统一动作接口适配不同 GUI 环境
- 大规模 GUI Agent 轨迹数据集，包含多模态 grounding、规划与推理信号
- 两阶段训练：Stage 1 训练通用 GUI grounding，Stage 2 训练 planning and reasoning trajectories
- 引入 inner monologue，让模型显式生成计划、状态理解和下一步操作理由
- 在 ScreenSpot、Multimodal-Mind2Web、AndroidControl、Mind2Web-Live、AndroidWorld、OSWorld 等离线/在线场景评估

#### 🔬 深入细节
##### 框架总览

![Aguvis 总览图](https://aguvis-project.github.io/static/images/overview.jpg)
*图：Aguvis 以纯视觉截图作为统一观测，结合自然语言指令和跨平台动作接口执行 GUI 任务。*

##### 算法流程

```python
# Aguvis 两阶段训练与推理伪代码

# Stage 1: GUI grounding
for sample in aguvis_stage1_grounding:
    screenshot, element_instruction, target_region = sample
    pred_region = model.ground(screenshot, element_instruction)
    loss = grounding_loss(pred_region, target_region)
    update(model, loss)

# Stage 2: planning + reasoning
for trajectory in aguvis_stage2_reasoning:
    history, screenshot, user_goal = trajectory.context
    inner_monologue = trajectory.thought
    action = trajectory.action
    output = model(screenshot, user_goal, history)
    loss = sft_loss(output.thought, inner_monologue) + sft_loss(output.action, action)
    update(model, loss)

# Inference
while not task_done:
    screenshot = capture_screen()
    thought, action = model.plan_and_act(screenshot, goal, previous_actions)
    execute_unified_action(action)
    previous_actions.append(action)
```

##### 方法细节

Aguvis 的核心立场是“GUI Agent 不应该绑定某一种平台文本结构”。Web Agent 常依赖 DOM 或 HTML，手机 Agent 常依赖 accessibility tree，桌面 Agent 又有不同 API。这些结构在平台间差异很大，且很多真实场景并不稳定可用。Aguvis 因此选择只看屏幕图像，将 GUI 自动化问题统一为视觉 grounding、规划和动作执行。

纯视觉设定带来的第一项挑战是定位。模型必须从自然语言描述或任务目标中找到屏幕上的可操作元素，而不能读取 DOM id 或 accessibility label。Stage 1 训练专注于 grounding：给定截图和元素/操作描述，预测区域、点位或可操作目标。这个阶段让模型获得跨设备、跨 UI 风格的视觉定位能力。

第二项挑战是长程任务规划。即使能点中按钮，Agent 仍需要理解任务进度、判断当前屏幕语义、决定下一步操作并处理失败。Stage 2 使用包含规划和推理的轨迹数据训练模型，目标不仅是模仿动作，还要生成 inner monologue：

$$
(\text{screenshot}_t, g, h_t) \rightarrow (r_t, a_t)
$$

其中 \(g\) 是用户目标，\(h_t\) 是历史动作，\(r_t\) 是显式推理/计划，\(a_t\) 是下一步统一动作。inner monologue 的直觉是把 GUI 操作从反射式点击变成可解释的状态评估和计划更新。

统一动作空间是跨平台泛化的另一个关键。虽然不同平台底层执行接口不同，但模型输出层尽量保持一致，例如 click/tap、type、scroll、back、wait、finish 等高层动作，再由插件系统转换为具体平台操作。这样模型学到的是“在屏幕上操作”的通用策略，而不是某个 API 的语法。

项目 README 明确给出两个训练数据入口：`aguvis-stage1` 用于 grounding，`aguvis-stage2` 用于 planning and reasoning。训练时通过 `SFT_TASK` 指定阶段。这个流程体现了论文的工程判断：先把“看准”学好，再学“怎么连续完成任务”。

与 CogAgent、SeeClick 等 GUI 模型相比，Aguvis 更强调完全摆脱文本结构依赖；与基于 GPT-4V 的 Agent 系统相比，它强调开源模型独立完成真实在线任务，不依赖外部闭源模型做高层 reasoning。其代价是纯视觉模型必须自己承担 OCR、布局理解和元素功能推断，训练数据质量对表现影响很大。

> 💡 关键：Aguvis 的统一性来自输入和动作空间的统一，而不是把每个平台的 DOM/API 都硬编码进模型。

#### 🧪 练习题
```yaml
question: "Aguvis 的两阶段训练为什么先做 grounding，再做 planning and reasoning？"
options:
  - "因为模型必须先学会在纯视觉截图中定位可操作元素，才能稳定学习长程任务规划"
  - "因为 grounding 阶段会删除所有截图，只保留 DOM"
  - "因为 planning 阶段不需要任何动作监督"
  - "因为 Aguvis 只支持网页 HTML，不支持移动或桌面"
answer: 0
explain: "纯视觉 GUI Agent 的基础能力是看懂并定位屏幕元素；在此基础上，Stage 2 才能通过 inner monologue 和动作轨迹学习连续规划。"
```

### Mobile-Agent-v3.5

```yaml
id: mobile_agent_v3_5
num: 25
name: Mobile-Agent-v3.5
full_name: 移动智能体v3.5 (Mobile-Agent-v3.5)
year: '2026'
org: ByteDance
parent: dart_gui
paper_url: https://arxiv.org/abs/2602.16855
project_url: ''
category: frontier_2026
motivation: 多智能体协作实现跨平台统一操作
```

#### 📝 一句话总结
Mobile-Agent-v3.5 提出 GUI-Owl-1.5 多尺寸 GUI Agent 模型族，用混合数据飞轮、统一能力增强和多平台 MRPO 强化学习解决跨移动端、桌面端、浏览器环境的长程 GUI 操作泛化问题。它把单体端到端模型与 Manager/Worker/Reflector/Notetaker 多智能体协作统一到同一套训练和部署范式中。

#### 🎯 核心要点
- GUI-Owl-1.5 模型族覆盖 2B/4B/8B/32B/235B instruct 与 thinking 变体，面向端侧实时操作、云端复杂规划和云边协作
- 混合数据飞轮结合 GUI grounding 数据、DAG 任务合成、自动轨迹采集、人工示范和虚拟环境轨迹生产
- 统一能力增强包含 GUI 知识注入、世界建模监督、统一 CoT 合成、工具/MCP 调用、记忆管理和多智能体协作数据
- Mobile-Agent-v3.5 框架显式划分 Manager、Worker、Reflector、Notetaker 四类角色，支持规划、执行、验证和持久记忆闭环
- MRPO 通过设备条件化策略、在线 rollout buffer、token-id transport 和交替多平台优化缓解多设备 RL 的冲突与低效率
- 在 OSWorld-Verified、AndroidWorld、WebArena、ScreenSpot-Pro、OSWorld-MCP 等 20+ GUI 基准上刷新开源模型表现

#### 🔬 深入细节
##### 框架总览

![Mobile-Agent-v3.5 总览](https://arxiv.org/html/2602.16855v1/x2.png)
*图：Mobile-Agent-v3.5/GUI-Owl-1.5 的多平台 GUI Agent 总览，强调跨设备支持、能力增强和多智能体协作。*

Mobile-Agent-v3.5 的核心问题不是让模型会点一个按钮，而是让同一策略能在手机、桌面、浏览器和工具调用环境中持续完成任务。论文把每一步 GUI 交互建模为多轮决策：输入是当前截图、用户指令和压缩后的历史上下文，输出是动作结论与结构化工具调用；执行后环境返回新截图，模型继续闭环。

##### 核心流程伪代码

```python
# Mobile-Agent-v3.5 多角色执行与 MRPO 训练的简化流程
for task in task_stream:
    state = observe_device(task.device)
    notes, feedback = "", None
    subgoals = Manager.plan(task.instruction, state)

    while not done(subgoals):
        action = Worker.act(state, subgoals, notes, feedback)
        next_state = execute_on_device(action)
        feedback = Reflector.verify(state, action, next_state)
        notes = Notetaker.update(notes, state, action, feedback)
        subgoals = Manager.update(subgoals, feedback, notes)
        state = next_state

for epoch in range(num_rl_epochs):
    for device_type in cycle(["mobile", "desktop", "browser"]):
        group = online_buffer.sample_on_policy(device_type)
        rewards = task_reward(group) + format_reward(group)
        loss = mrpo_group_policy_loss(group, rewards, reference_policy)
        update_policy(loss)
```

##### 方法细节

传统 GUI Agent 常见瓶颈有三个：真实轨迹采集慢且昂贵，移动端/桌面端/网页端动作和界面结构异构，纯 SFT 模型在长程任务中容易因一步错误导致后续全部偏移。Mobile-Agent-v3.5 的设计顺序正是围绕这三点展开：先造出足够多、足够干净、覆盖不同平台的轨迹，再把模型训练成具备定位、推理、记忆、工具调用和多角色协作的 GUI 原生模型，最后用多平台环境 RL 修正 SFT 的分布偏移。

数据侧的 Hybrid Data Flywheel 把轨迹生产拆成多条互补管线。DAG 任务合成让标注者把应用流程写成子任务节点和可行转移边，从中采样路径并生成可验证指令；自动轨迹生成会在真实设备上执行任务，并用 checkpoint 判定最长正确前缀，错误轨迹会被截断和修复；虚拟环境则用网页渲染模拟文档编辑、拖拽、滚动、弹窗等高频场景，提供更精确的子任务反馈；最后少量人工示范覆盖自动系统难以解决的复杂应用。

能力增强阶段把 GUI Agent 需要的“看、想、记、验、调工具”全部写进训练数据。GUI 知识注入来自软件文档、论坛和教程 QA/VQA；世界建模监督要求模型根据截图和动作预测界面会如何变化；统一 CoT 合成在每个轨迹步骤生成观察、记忆、反思、任务进度和工具选择推理；多智能体数据则让同一模型能扮演规划者、执行者、验证者或记忆维护者。

MRPO 是论文中最直接面向 RL 稳定性的部分。设设备类型为 \(d\)，策略写作 \(\pi_\theta(a_t \mid o_t, q, h_t, d)\)。同一策略条件化到不同平台，而不是给每个平台单独训练模型。由于 GUI 任务 group rollout 很容易全成或全败，普通 GRPO 会得到无信息组；MRPO 先在线过采样，再从同一当前策略样本中挑选成功/失败更均衡的小组，从而保持近似 on-policy 同时降低 outcome collapse。

Token-ID transport 处理另一个工程上很关键的问题：环境侧推理与训练侧优化的 tokenization 必须一致，否则 log probability 会错位。论文把动作、元素 ID、工具参数在环境端保留为 token id 再传回训练端，避免字符串重新分词造成的概率不一致。多平台优化也不是简单混 batch，而是在移动端、桌面端、浏览器端之间交替训练，减少梯度互相抵消。

> 💡 关键：Mobile-Agent-v3.5 的贡献不只是“多智能体框架”，而是把数据生成、GUI 专项能力、角色协作和多平台 RL 串成了统一训练闭环，使模型可以在不同设备上共享策略而不依赖单个平台的脆弱脚本。

#### 🧪 练习题
```yaml
question: "MRPO 中在线 rollout buffer 的主要作用是什么？"
options:
  - "把所有平台的 GUI 元素转换成同一种截图分辨率"
  - "通过在线过采样和选择减少同组 rollout 全成或全败造成的无效 GRPO 更新"
  - "替代监督微调阶段的人类示范轨迹"
  - "只在推理时缓存截图以降低浏览器渲染开销"
answer: 1
explain: "GUI 长程任务的 group rollout 容易 outcome collapse；在线 buffer 在保持当前策略采样的前提下提高组内结果多样性，使优势估计更有信息量。"
```

### Mind2Web-2

```yaml
id: mind2web_2
num: 26
name: Mind2Web-2
full_name: 思维到网页2.0 (Mind2Web-2)
year: '2025'
org: OSU
parent: mind2web
paper_url: https://github.com/osu-nlp/Mind2Web-2
project_url: ''
category: frontier_2026
motivation: Agent-as-Judge框架验证引用真实性
```

#### 📝 一句话总结
Mind2Web-2 提出面向 Deep Research 式 agentic search 的长程网页搜索基准，并用 Agent-as-a-Judge 的树状 rubric 同时评估答案正确性和来源归因。它解决了传统网页基准只适合短步静态任务、难以可靠评估实时多源综合答案的问题。

#### 🎯 核心要点
- 构建 130 个真实、高质量、长程 agentic search 任务，覆盖 6 个大领域和 24 个子领域
- 任务要求实时网页浏览、跨网页信息综合和引用支撑，许多答案具有时间变化性
- 采用 Agent-as-a-Judge，而不是单次 LLM-as-a-Judge，对每个任务构造专门 judge agent
- 使用树状 rubric 分解评价逻辑，叶子节点做二元判定，内部节点聚合为根节点 partial completion
- 同时评估 answer correctness 和 source attribution，要求答案中的关键事实能被引用网页支撑
- 对 10 个前沿 agentic search 系统和人类表现做系统评测，指出最强系统已达到人类 50%-70% 水平但仍有明显差距

#### 🔬 深入细节
##### 框架总览

![Mind2Web-2 概览](https://raw.githubusercontent.com/OSU-NLP-Group/Mind2Web-2/main/assets/mind2web2_overview.jpg)
*图：Mind2Web-2 的任务与评价框架，长程、多源、时间变化任务需要同时检查答案正确性和引用归因。*

清单中的 `paper_url` 指向 GitHub 仓库；项目实际论文页为 `https://arxiv.org/abs/2506.21506`，本文按 Mind2Web-2 官方项目和论文内容解读，元信息字段保持清单原样。Mind2Web-2 的对象不是传统“点击网页完成表单”的 web agent，而是能像研究助理一样浏览网页、综合多源事实并输出带引用长答案的 agentic search 系统。

##### Agent-as-a-Judge 伪代码

```python
# Mind2Web-2 评价流程的简化版
for task in benchmark:
    answer = run_agentic_search_system(task.prompt)
    cited_pages = cache_and_parse(answer.citations)
    rubric_tree = load_task_specific_rubric(task.id)

    for node in postorder(rubric_tree):
        if node.is_leaf():
            node.score = judge_leaf(
                requirement=node.requirement,
                answer=answer.text,
                sources=cited_pages,
            )
        else:
            node.score = aggregate(node.children, node.logic)

    correctness = rubric_tree.correctness_subtree.score
    attribution = rubric_tree.attribution_subtree.score
    partial_completion = rubric_tree.root.score
```

##### 方法细节

Mind2Web-2 的动机来自 agentic search 评估的结构变化。Deep Research 类系统会自主搜索几十分钟，输出几百到几千词，并附带多个引用链接；答案可能随时间变化，且很难用单个 exact match 或静态参考答案判断。传统 Mind2Web/WebVoyager 更关注短程导航或单页面操作，难以覆盖“找出满足多个约束的多项结果，并证明每个事实来源可靠”这类任务。

基准构造阶段，作者投入超过 1000 小时人工劳动，对任务进行设计、打磨和验证。每个任务都要满足现实性、长程性、可验证性和多面性：既要符合真实用户需求，又要需要广泛搜索；既不能只靠常识回答，又必须能通过答案文本和引用网页验证。任务覆盖生活休闲、科学研究、职业教育、旅行交通、娱乐和杂项等领域。

Agent-as-a-Judge 的关键是“生成-验证不对称”。虽然不同 agent 的答案格式、搜索路线和引用页面差异很大，但评测者事先知道一个任务到底要检查哪些事实。因此 Mind2Web-2 为每个任务写出树状 rubric，把复杂需求拆成细粒度节点。例如一个采购任务可能包含价格区间、颜色、品牌、尺寸、是否来自指定商家、每条引用是否支持对应事实等叶子节点。

评价时，judge agent 不是泛泛地问“这个答案好吗”，而是带着特定 rubric 逐节点审查。叶节点通常是二元判断：答案是否给出某项必需事实，引用网页是否支持该事实；内部节点按 AND/OR/加权逻辑聚合，根节点给出 partial completion。这样可以同时产生成功率、Pass@3、部分完成度和失败位置，而不仅是一个粗糙的对错标签。

形式上，可以把 rubric 看成一棵树 \(T\)。叶子节点 \(l\) 的分数为 \(s_l \in \{0,1\}\)，内部节点根据逻辑函数聚合：

$$
s_v = g_v(\{s_u: u \in \mathrm{children}(v)\})
$$

根节点 \(s_{\mathrm{root}}\) 就是 partial completion。相比单次 LLM judge，这个分解让评估更可审计，也能定位 agent 是错在搜索不全、事实不准，还是引用无法支撑。

> 💡 关键：Mind2Web-2 真正评估的是“可验证的网页研究能力”，因此 citation attribution 与 answer correctness 同等重要；没有可靠来源支撑的正确文字也不能算完整完成任务。

#### 🧪 练习题
```yaml
question: "Mind2Web-2 为什么采用树状 rubric 的 Agent-as-a-Judge？"
options:
  - "为了让 agent 少浏览网页，只回答静态问题"
  - "为了把复杂长答案拆成可验证节点，同时检查正确性和引用归因"
  - "为了完全替代人工设计任务"
  - "为了只评估网页点击动作是否符合轨迹"
answer: 1
explain: "Mind2Web-2 的答案长、动态且带引用；树状 rubric 能把任务需求拆成叶子判定并向上聚合，比单次总体打分更可靠。"
```

### WebArena Verified

```yaml
id: webarena_verified
num: 27
name: WebArena Verified
full_name: WebArena验证版 (WebArena Verified)
year: '2026'
org: CMU
parent: webarena
paper_url: https://openreview.net/forum?id=mU4fB4znmC
project_url: ''
category: frontier_2026
motivation: 修复评估逻辑降低误报率11.3%
```

#### 📝 一句话总结
WebArena Verified 对 WebArena 的 812 个任务、参考答案和 evaluator 做系统审计，用结构化 JSON、类型感知精确匹配、后端状态验证和网络活动检查替换脆弱的字符串/页面文本判断，使网页 agent 评测更确定、更可复现。

#### 🎯 核心要点
- **全量任务审计**：覆盖 WebArena 原始 812 个任务，修复 reference alignment、任务歧义、宽松字符串匹配和不可达任务处理等问题。
- **结构化响应协议**：要求 agent 输出 JSON，显式区分任务类型、成功状态、检索结果和错误状态，减少自由文本解析误差。
- **类型感知匹配**：将 substring matching 替换为 exact/normalized matching，按数字、日期、货币、URL、坐标等类型归一化比较。
- **真实状态验证**：对 mutation 类任务使用 REST API 或数据库查询验证后端状态，而不是只检查页面文本是否出现。
- **活动与不可达校验**：用 network trace 确认 agent 访问目标站点，并用显式状态码替代含混的 `N/A`。
- **Verified Hard 子集**：构造 258-task hard subset，在保持区分度和覆盖面的同时降低评测运行成本。

#### 🔬 深入细节
##### 框架总览

![WebArena Verified 环境控制界面](https://raw.githubusercontent.com/ServiceNow/webarena-verified/main/docs/assets/env-ctrl-dashboard-cropped.png)
*图：WebArena Verified 官方仓库中的环境控制界面。Verified 版本保留 WebArena 的容器化网站环境，但围绕任务定义、agent 响应和 evaluator 证据链重做确定性评分。*

##### 评测流程

```python
# WebArena Verified 的确定性评分伪代码
def evaluate_verified(task, agent_json, network_trace, backend):
    response = validate_json_schema(agent_json)
    if not response.valid:
        return Score(value=0, status="PARSE_ERROR")

    if not visited_required_site(network_trace, task.required_sites):
        return Score(value=0, status="NO_VALID_ACTIVITY")

    if response.status != "SUCCESS":
        return score_explicit_status(task, response.status, network_trace)

    if task.kind == "retrieve":
        expected = normalize(task.expected_value, task.value_type)
        actual = normalize(response.retrieved_data, task.value_type)
        return Score(value=int(actual == expected), status="MATCHED")

    if task.kind == "mutate":
        state = backend[task.site].query(task.check_spec)
        ok = verify_backend_state(state, task.expected_state)
        return Score(value=int(ok), status="STATE_VERIFIED")
```

WebArena 原始版本的重要贡献是提供真实、自托管、可重置的网站环境，让 agent 在浏览器中完成购物、论坛、GitLab、CMS、地图等长程任务。但当模型能力和排行榜竞争提升后，评测器本身的噪声会开始主导结论。WebArena Verified 的论文把问题归为三类：任务规格不清或参考答案错配、评测机制过宽或缺上下文、报告方式缺少不确定性和失败模式拆解。

审计结果显示，原 benchmark 中存在多种会造成误判的模式。reference alignment 问题会让正确完成目标的 agent 被错判；任务歧义会让多个合理答案只有一个被接受；substring matching 会把 `2` 与 `2000`、`Yes` 与包含否定的推理文本混淆；页面文本检查如果不绑定字段上下文，也可能因为目标字符串出现在错误字段而误判成功。Verified 的目标不是降低任务难度，而是让“成功”真正对应任务目标达成。

结构化响应协议是第一层修复。agent 不再只给出一段自由文本，而是输出符合 schema 的 JSON，例如任务类型、`SUCCESS`/错误状态、`retrieved_data` 等字段。这样 evaluator 可以把“格式不可解析”“agent 明确认为不可达”“检索值错误”“状态修改未生效”拆成不同失败模式。形式上，评分从自由文本函数
$$
s=\mathrm{judge}(\mathrm{text},r)
$$
改成了带 schema 和证据约束的确定性函数
$$
s=\mathbf{1}\left[\mathrm{Verify}\bigl(\mathrm{Normalize}(a,\tau),\mathrm{Normalize}(r,\tau),e\bigr)\right],
$$
其中 \(a\) 是 agent 输出，\(r\) 是参考目标，\(\tau\) 是值类型，\(e\) 是网络 trace 或后端状态证据。

第二层修复是类型感知 exact matching。对于检索类任务，日期、货币、数字、URL、坐标等值会先归一化，再做精确比较。这样 `$1,000.00` 与 `1000 USD` 可以被看作等价，但 `2` 不会因为是 `2000` 的子串而过关。这个变化减少了宽松匹配带来的 false positive，也减少了格式差异带来的 false negative。

第三层修复是后端状态验证。状态修改类任务的正确性取决于系统真实状态，例如商品是否加入购物车、issue 是否被创建、地址字段是否被正确修改。只看页面文本会遗漏字段位置和数据库事实；Verified 改用 REST API 或数据库查询检查目标字段，使验证对象从“页面上出现了某个字符串”变成“系统状态满足目标谓词”：
$$
\mathrm{StatePass}=\mathbf{1}\{Q_{\mathrm{backend}}(S_{\mathrm{final}})=S^\star\}.
$$

网络活动检查和不可达任务处理解决另一个漏洞：agent 不能只凭参数知识回答网页任务，也不能过早输出 `N/A` 获得分数。Verified 用 network trace 检查是否访问了相关站点，对不可达任务要求显式状态码和足够探索证据。论文同时推荐按 template 做 macro average 并报告 95% 置信区间：
$$
\mathrm{cSR}_{\mathrm{tmpl}}=\frac{1}{T}\sum_{t=1}^{T}\mathrm{SR}_t.
$$
这比简单按任务平均更能避免高频模板掩盖长尾失败。

> ⚠️ 注意：论文摘要报告新 evaluator 相比原始评分管线将 false-negative rate 降低 11.3 个百分点；本文件的 YAML `motivation` 按任务输入原样保留。

#### 🧪 练习题
```yaml
question: "WebArena Verified 为什么用后端状态验证替代页面文本检查？"
options:
  - "因为状态修改任务的正确性取决于真实数据库/API 状态，而不是某个字符串是否出现在页面上"
  - "因为后端状态验证可以让 agent 不打开浏览器也得分"
  - "因为页面文本检查只能用于移动端 App"
  - "因为 WebArena Verified 删除了所有检索任务"
answer: 0
explain: "页面文本可能出现在错误字段或无关区域。后端查询能直接验证目标字段和系统状态是否满足任务要求。"
```

### DynaWeb

```yaml
id: dynaweb
num: 28
name: DynaWeb
full_name: 动态网页智能体 (DynaWeb)
year: '2026'
org: Stanford
parent: webarena_verified
paper_url: https://arxiv.org/abs/2601.22149
project_url: ''
category: frontier_2026
motivation: 基于想象的模型RL优化在线规划
```

#### 📝 一句话总结
DynaWeb 提出用 learned web world model 作为合成网页环境来训练 web agent 的模型式强化学习框架，解决直接在真实网页上做在线 RL 成本高、慢且风险大的问题。它把想象 rollout 与真实专家轨迹混合，用序列级策略优化提升 WebArena 与 WebVoyager 上的长程操作成功率。

#### 🎯 核心要点
- 将网页任务形式化为 POMDP，观测用 URL 与 accessibility tree 表示，动作包括 click、type、scroll、goback、stop 等
- 训练 Web World Model 预测动作后的页面状态变化描述，并生成可被 agent 消费的下一步页面表示
- 让 agent 在 world model 中“做梦”生成多步 imagined rollouts，避免大量真实网页交互
- 将 imagined rollouts 与真实专家轨迹随机交织，提高训练稳定性和样本效率
- 采用 Group Sequence Policy Optimization，将重要性比率从 token 级提升到 trajectory/sequence 级
- 在 WebArena 上平均成功率达到 31.0%，相对 WebRL 26.7% 有明显提升；在 WebVoyager 上达到 38.7%

#### 🔬 深入细节
##### 框架总览

![DynaWeb 概览](https://arxiv.org/html/2601.22149v2/x1.png)
*图：DynaWeb 论文 HTML 中的公开图源。方法核心是使用 web world model 生成 imagined rollouts，并与真实专家轨迹混合进行模型式 RL。*

DynaWeb 的核心判断是：web agent 需要在线 RL 式的试错学习，但真实网页不是理想训练场。训练时直接操作 live web 可能触发购买、提交表单、改账户设置，也会遇到非确定性页面变化、IP 限制和延迟。DynaWeb 因此把网页世界模型从“推理时 lookahead 工具”提升为“训练时合成环境”。

##### 算法伪代码

```python
# DynaWeb: imagination-driven model-based RL
world_model = train_wwm(real_transitions)  # (obs, action) -> state-change + next_obs
policy = load_sft_web_agent()

for update in range(num_updates):
    imagined = []
    for task in sample_tasks():
        obs = task.initial_observation
        traj = []
        for t in range(max_dream_steps):
            thought, action = policy.sample(task.query, obs, traj)
            next_obs = world_model.predict(obs, action)
            traj.append((obs, thought, action, next_obs))
            obs = next_obs
            if is_terminal(obs):
                break
        reward = world_model.self_assess(task.query, traj)
        imagined.append((traj, reward))

    expert = sample_real_expert_trajectories(ratio=0.5)
    batch = mix(imagined, expert)
    loss = gspo_sequence_level_objective(policy, batch)
    update_policy(policy, loss)
```

##### 方法细节

论文把 web agent 任务建模为部分可观测 MDP。真实状态 \(s_t\) 是完整网页环境，但 agent 只能看到观测 \(o_t\)，通常包括当前 URL 和 accessibility tree。策略 \(\pi_\theta\) 根据用户 query、历史轨迹和系统提示生成思考链与浏览器动作：

$$
(r_t, a_t) \sim \pi_\theta(\cdot \mid q, o_t, h_t)
$$

传统在线 RL 需要从环境转移 \(s_{t+1}=P(s_t,a_t)\) 得到真实反馈。DynaWeb 用 Web World Model 近似这个转移：输入当前 accessibility tree 和动作，输出“状态变化描述”并把它应用到当前页面表示，得到下一步可见观测 \(\hat{o}_{t+1}\)。模型不直接生成整页文本，因为大多数网页动作只改变页面的一小部分；预测差异描述比重写整棵树更有信息量。

训练 world model 使用 NNetNav 等真实网页交互轨迹，先过滤缺失观测、无效动作和不一致状态，再用强模型生成每个转移的 reasoning trace 与 state-change description。训练好的 world model 就像一个可控网页服务器，agent 可以在其中反复 rollout，而不用访问真实网页。

为了把 imagined trajectory 变成 RL 信号，DynaWeb 对每条轨迹做任务完成自评，得到 terminal reward。然后把策略生成的 imagined rollouts 与真实专家轨迹混合。真实专家轨迹不依赖 world model，可作为高质量锚点，缓解 world model hallucination 和纯自举训练不稳定。实验中还会限制 dream 长度，例如最多 5 步，并在模型产生终止状态时提前停止。

优化目标采用 GSPO。PPO/GRPO 常在 token 级计算概率比，但 web agent 的动作和推理是长序列，token 级优势分配会很噪。GSPO 为整条序列计算一个几何平均概率比：

$$
\rho(\tau)=\exp\left(\frac{1}{|\tau|}\sum_i \log \frac{\pi_\theta(y_i \mid y_{<i})}{\pi_{\theta_{\mathrm{old}}}(y_i \mid y_{<i})}\right)
$$

然后用轨迹级 advantage 更新整条推理-动作序列，更适合稀疏终局奖励下的长程网页任务。

> 💡 关键：DynaWeb 不是只在推理时问 world model“下一步会怎样”，而是把 world model 当作训练环境，让策略在想象中产生可优化的多步经验。

#### 🧪 练习题
```yaml
question: "DynaWeb 为什么要把真实专家轨迹与 imagined rollouts 混合训练？"
options:
  - "为了让 world model 完全不需要训练"
  - "为了用高质量真实交互稳定学习，同时减少对昂贵真实网页交互的依赖"
  - "为了把所有网页任务改成离线分类任务"
  - "为了只提升推理时搜索速度，不改变策略参数"
answer: 1
explain: "Imagined rollouts 提供可扩展经验，但可能受 world model 误差影响；专家轨迹提供真实锚点，提高稳定性和样本效率。"
```

### Online-Mind2Web

```yaml
id: online_mind2web
num: 29
name: Online-Mind2Web
full_name: 在线思维到网页 (Online-Mind2Web)
year: '2026'
org: OSU
parent: mind2web_2
paper_url: https://www.emergentmind.com/papers/2504.01234
project_url: ''
category: frontier_2026
motivation: 136个高流量网站的实时环境基准
```

#### 📝 一句话总结
Online-Mind2Web 提出了一个覆盖 136 个高流量真实网站、300 个在线任务的 live web agent 基准，并用 WebJudge 自动评估长轨迹任务是否完成，解决静态网页基准高估 agent 能力的问题。

#### 🎯 核心要点
- 构建 live web 基准：300 个真实用户任务来自 136 个网站，覆盖购物、餐饮、出行、住宿、本地服务等高频场景
- 任务强调真实约束：价格、时间、地点、库存、评分、规格、账户状态、表单提交结果等都可能影响是否成功
- 提出 WebJudge 自动评估流程：Key Point Identification → Key Screenshot Identification → Outcome Judgment
- 通过关键截图筛选压缩长轨迹，避免把几十步甚至上百步网页截图全部塞入多模态 judge
- 采用人类标注校准自动评价，报告 WebJudge 与人工判断的一致性高于纯文本 accessibility-tree judge 和简单规则评估
- 暴露当前 web agent 的真实短板：动态网页弹窗、跨页比较、条件筛选、数值约束、长程纠错和重复动作控制
- 与 Mind2Web/Mind2Web-2 的静态或离线设定不同，Online-Mind2Web 把评测对象放回持续变化的在线网站

#### 🔬 深入细节
##### 框架总览

![Online-Mind2Web WebJudge 流程](https://raw.githubusercontent.com/OSU-NLP-Group/Online-Mind2Web/main/images/WebJudge.jpg)
*图：WebJudge 先抽取任务关键点，再从 agent 轨迹中选择能证明成败的关键截图，最后结合任务、关键点、截图和动作历史判断结果。*

清单中的 emergentmind 链接使用了 `2504.01234`，该编号页面并非 Online-Mind2Web 论文；Online-Mind2Web 对应论文为 OSU 的 *An Illusion of Progress? Assessing the Current State of Web Agents*，arXiv 编号为 `2504.01382`。这里保留 YAML 元信息不变，但方法内容按 Online-Mind2Web 官方论文和仓库解释。

##### WebJudge 伪代码

```python
# Online-Mind2Web / WebJudge 的核心评估流程
for task in online_mind2web_tasks:
    trajectory = run_agent_on_live_website(task.instruction)

    # 1. 将自然语言任务拆成必须满足的检查点
    key_points = judge_llm.identify_key_points(
        instruction=task.instruction,
        reference_requirements=task.requirements,
    )

    # 2. 从长轨迹中筛选最能证明成败的截图和动作
    scored_frames = []
    for step in trajectory:
        score = judge_llm.score_evidence(
            screenshot=step.screenshot,
            url=step.url,
            action=step.action,
            key_points=key_points,
        )
        scored_frames.append((score, step))
    key_frames = top_k(scored_frames, k=K)

    # 3. 结合关键证据做最终 outcome judgment
    judgment = judge_llm.judge_outcome(
        instruction=task.instruction,
        key_points=key_points,
        key_screenshots=[s.screenshot for _, s in key_frames],
        actions=[s.action for _, s in key_frames],
        final_answer=trajectory.final_answer,
    )
    task_success = parse_binary_success(judgment)
```

##### 方法细节

Online-Mind2Web 的核心动机是检验“网页 agent 进步幻觉”。许多系统在静态 DOM、缓存网页或短程点击任务上看起来进步很快，但真实网站会变化：按钮文案调整、弹窗出现、库存状态改变、地区服务不可用、搜索结果排序浮动、登录或验证码干扰都会破坏离线轨迹。论文因此把任务设计为在线执行，并持续维护任务可用性，目的是测量 agent 在真实网页环境里的端到端完成能力。

可以把一个任务形式化为 \(\tau=(x, R)\)，其中 \(x\) 是用户指令，\(R=\{r_1,\ldots,r_m\}\) 是必须满足的隐式或显式约束。Agent 在 live web 上产生轨迹：

$$
H=\{(o_t, a_t, u_t)\}_{t=1}^{T}
$$

其中 \(o_t\) 是截图或 DOM 观察，\(a_t\) 是点击、输入、滚动、搜索等动作，\(u_t\) 是 URL 或页面状态。任务成功不是“最后一步是否停下”，而是所有关键约束是否被满足：

$$
y=\mathbb{1}\left[\bigwedge_{j=1}^{m}\operatorname{sat}(r_j,H)=1\right]
$$

这也是 WebJudge 要先抽取 key points 的原因：真实任务往往包含多个约束，漏掉任意一个都应判失败。例如“找一家今晚 7 点后仍营业、评分 4.5 以上、距离酒店 2 英里以内的餐厅”至少包含时间、评分、距离和餐厅类型四类条件。

WebJudge 把自动评估分成三步。第一步 Key Point Identification 将任务转成检查清单 \(K=\{k_1,\ldots,k_M\}\)，让 judge 明确知道要验证什么。第二步 Key Screenshot Identification 对轨迹每一步估计证据价值：

$$
s_t=f_\phi(o_t,a_t,u_t,K),\qquad C=\operatorname{TopK}_{t\in[1,T]} s_t
$$

其中 \(C\) 是被保留的关键截图集合。第三步 Outcome Judgment 再用多模态模型判断 \(\hat{y}=J_\theta(x,K,C,A_C)\)，其中 \(A_C\) 是关键步骤附近的动作历史。这样做的直觉很直接：长网页轨迹里大量截图只是导航过程，真正能证明成功或失败的通常是筛选器状态、详情页、购物车、确认页或最终提交结果。

这种分解比把全轨迹交给 LLM judge 更稳。全轨迹会遇到上下文长度、图片数量和视觉噪声问题，judge 也容易被无关页面误导；只看最后截图又会漏掉中间是否满足约束，例如 agent 曾经选中过正确日期但后续提交前被页面重置。Key screenshot 筛选保留关键证据，同时让评估成本随 \(K\) 而不是随完整轨迹长度 \(T\) 增长。

论文报告的系统评测显示，当前强模型在 online setting 里仍经常失败。失败不是单一的视觉识别问题，而是交互链条中任一环节出错都会导致最终失败：搜索词过窄导致候选不足，筛选条件设置错误，价格或时间约束读错，重复点击同一控件，遇到 cookie 弹窗后无法恢复，或者在页面跳转后丢失已经建立的任务状态。Online-Mind2Web 的价值正是在于把这些真实交互问题暴露出来。

评价指标上，任务成功率可以写成：

$$
\operatorname{SR}=\frac{1}{|\mathcal{D}|}\sum_{\tau_i\in\mathcal{D}}\hat{y}_i
$$

但仅看成功率不足以区分“稳健完成”和“偶然完成”。因此论文还关注轨迹长度、无效动作、重复动作和错误恢复等行为特征。对 web agent 训练来说，这意味着后续优化不应只奖励最终 success，还需要惩罚明显无效的循环，并鼓励在关键页面留下可验证证据。

> 💡 关键：Online-Mind2Web 的方法创新不在新的浏览器控制器，而在 live benchmark 和可扩展 judge。它把 web agent 评测从“能否复现离线标注动作”推进到“能否在真实网站中满足用户约束”。

#### 🧪 练习题
```yaml
question: "WebJudge 为什么要先做 Key Screenshot Identification？"
options:
  - "为了完全丢弃 agent 的动作历史"
  - "为了只保留与任务关键点相关的视觉证据，降低长轨迹带来的上下文和噪声压力"
  - "为了把网页任务改写成纯文本问答"
  - "为了让所有在线任务都不需要人工校准"
answer: 1
explain: "在线网页轨迹通常很长，全部截图会造成上下文过载并引入大量无关视觉信息；筛选关键截图能保留判断成败所需证据。"
```

### OpenVLA 2.0

```yaml
id: openvla_2
num: 30
name: OpenVLA 2.0
full_name: 开源VLA 2.0 (OpenVLA 2.0)
year: '2026'
org: Stanford
parent: openvla
paper_url: https://robotwale.com/openvla-2-released-with-improved-generalisation/
project_url: ''
category: frontier_2026
motivation: 自适应推理模块提升泛化性30%
```

#### 📝 一句话总结
OpenVLA 2.0 条目描述的是在 OpenVLA 基础上加入自适应推理、低延迟动作生成和多机器人协作的升级方向，核心目标是在保留开源 VLA 泛化能力的同时，让机器人只在关键状态显式推理、在普通控制步快速输出动作。

#### 🎯 核心要点
- 继承 OpenVLA 路线：视觉观测和语言指令进入 VLA backbone，模型输出机器人动作或动作块
- 清单来源声称通过 Adaptive Reasoning 模块提升约 30% 泛化性，但给定链接是新闻页而非正式论文
- 自适应推理的核心是 mode gate：在 plan/reason 与 act 两种模式之间动态切换
- 低延迟执行依赖 action chunking 或并行动作解码，避免每个控制步都自回归生成长 token 序列
- 泛化能力来自大规模视觉语言预训练、跨 embodiment 机器人轨迹和关键节点的显式任务状态更新
- 多机器人协作可建模为共享高层任务计划、按机器人能力和局部观测分配子目标，再由各自动作头闭环执行
- 与 OpenVLA 1.0 的主要差别在于：1.0 偏“指令+观测→动作 token”，2.0 条目强调“何时推理、何时动作、如何协调”

#### 🔬 深入细节
##### 框架总览

![OpenVLA-OFT 框架图](https://openvla-oft.github.io/static/images/openvla_oft_figure_1.jpeg)
*图：OpenVLA-OFT 官方项目图展示了 OpenVLA 系列从基础 VLA 到高频控制策略的优化方向，包括连续动作表示、action chunking 和更快的动作解码。*

截至 2026-06-16，清单中的 OpenVLA 2.0 `paper_url` 不是 Stanford 官方论文链接；公开、可复现的 Stanford OpenVLA 系列论文包括 OpenVLA 和 OpenVLA-OFT。下面的精读保留清单元信息，并把“自适应推理模块”写成 OpenVLA 系列可落地的通用机制：在 OpenVLA/OFT 策略外加入 mode gate 和任务记忆，使模型在关键时刻生成推理，在普通控制步输出低延迟动作块。

##### 自适应 VLA 伪代码

```python
# OpenVLA 2.0 式自适应推理 + 动作块执行的抽象流程
task_memory = None
robot_states = init_robot_states()

while not all_tasks_done(robot_states):
    observations = {r: capture_obs(r) for r in robots}

    # 高层门控：判断是否需要重新规划、纠错或协调
    mode = vla.predict_mode(
        instruction=user_instruction,
        observations=observations,
        task_memory=task_memory,
        recent_failures=detect_failures(robot_states),
    )

    if mode == "reason":
        task_memory = vla.generate_reasoning(
            instruction=user_instruction,
            observations=observations,
            previous_memory=task_memory,
        )
        subgoals = coordinator.assign_subgoals(task_memory, robots)
    else:
        for robot in robots:
            action_chunk = vla.decode_action_chunk(
                observation=observations[robot],
                proprioception=robot_states[robot],
                subgoal=subgoals[robot],
                task_memory=task_memory,
            )
            execute(robot, action_chunk)
            robot_states[robot] = update_state(robot)
```

##### 方法细节

OpenVLA 1.0 的核心范式是把机器人控制改写成视觉语言上下文中的动作预测：图像编码器提供空间和语义特征，语言模型接收指令和视觉 token，最后生成离散动作 token。这个设计开源、通用、可微调，但在长程任务中容易遇到两个瓶颈：一是每一步都直接反应式出动作时，策略可能忘记高层任务状态；二是如果每一步都让大模型长推理，又会拖慢闭环控制频率。

自适应推理模块的目标就是解决这个权衡。设机器人在时刻 \(t\) 的观测为 \(o_t\)，语言指令为 \(x\)，历史任务记忆为 \(r_{<t}\)。模型先预测一个模式变量：

$$
m_t\sim p_\theta(m\mid o_{\le t},x,r_{<t}),\qquad m_t\in\{\text{reason},\text{act}\}
$$

当 \(m_t=\text{reason}\) 时，模型更新任务记忆 \(r_t\)，例如生成子目标、错误解释、约束检查或多机器人分工；当 \(m_t=\text{act}\) 时，模型直接输出动作块：

$$
\hat{A}_t=g_\theta(o_t,x,r_t,q_t)\in\mathbb{R}^{H\times d_a}
$$

其中 \(q_t\) 是机器人本体状态，\(H\) 是 action chunk 长度，\(d_a\) 是动作维度。这样，显式推理只在状态切换、失败恢复、指令歧义、跨机器人协调等关键节点触发，而不是在每个 20-50Hz 控制步都触发。

训练目标可以写成一个混合损失：

$$
\mathcal{L}
=\mathcal{L}_{mode}
+\lambda_r\mathbb{1}[m_t=\text{reason}]\mathcal{L}_{reason}
+\lambda_a\mathbb{1}[m_t=\text{act}]\lVert \hat{A}_t-A_t^\star\rVert_1
$$

其中 \(\mathcal{L}_{mode}\) 监督何时推理，\(\mathcal{L}_{reason}\) 监督高层推理文本或结构化计划，最后的 L1 项来自 OpenVLA-OFT 式连续动作学习。如果沿用 OpenVLA 1.0 的离散动作 token，也可以把动作项替换为动作 token 交叉熵：

$$
\mathcal{L}_{act}=-\sum_{h=1}^{H}\log p_\theta(a_{t+h}^\star\mid o_t,x,r_t,a_{<t+h}^\star)
$$

这种设计的直觉是：推理负责“任务状态”和“为什么这样做”，动作块负责“接下来几步怎么做”。对机器人来说，许多连续控制步只是沿着同一子目标移动夹爪或底盘，不需要重新思考；但一旦检测到抓取失败、目标物不在预期位置、另一个机器人占用了路径，就应重新进入 reason 模式。

多机器人协作可以在同一框架中表示。给定全局任务 \(x\) 和机器人集合 \(\mathcal{R}\)，高层协调器根据机器人能力 \(c_i\)、局部观测 \(o_t^{(i)}\) 和当前任务记忆 \(r_t\) 分配子目标：

$$
\{g_t^{(i)}\}_{i\in\mathcal{R}}
=\operatorname{Coord}_\theta(x,r_t,\{o_t^{(i)},c_i\}_{i\in\mathcal{R}})
$$

每个机器人再执行自己的条件策略 \(\pi_\theta(a^{(i)}\mid o_t^{(i)},g_t^{(i)},r_t)\)。这比让一个单体策略直接输出所有机器人动作更可扩展，因为高层语言计划可以共享，而底层动作头可以按 embodiment 适配。

与 OpenVLA 1.0 相比，OpenVLA 2.0 条目强调的是系统层升级：从单步动作 token 预测，转向“任务记忆 + 稀疏推理 + 动作块 + 协调器”的闭环结构。它的收益主要来自两个方向：泛化上，reason 模式能显式检查语义约束和失败原因；效率上，act 模式能连续执行多个低层动作，减少大模型调用次数。

> ⚠️ 注意：由于缺少正式 OpenVLA 2.0 论文，约 30% 泛化提升应视作发布页说法，而不是这里能独立复现实验表格的论文结论。可复现的技术支撑主要来自 OpenVLA 与 OpenVLA-OFT 的公开论文、代码和项目页。

#### 🧪 练习题
```yaml
question: "自适应推理 VLA 为什么不在每个控制步都生成长推理？"
options:
  - "因为机器人任务不需要视觉输入"
  - "因为多数控制步只需执行既定子目标，长推理会增加延迟；关键节点再推理可以兼顾规划和实时控制"
  - "因为动作块不能表示连续动作"
  - "因为多机器人协作只能由规则系统完成"
answer: 1
explain: "自适应推理的核心是稀疏触发：在失败恢复、子目标切换或协调时更新计划，在普通控制步快速输出动作块。"
```

### ReconVLA

```yaml
id: reconvla
num: 31
name: ReconVLA
full_name: 重建视觉语言动作模型 (ReconVLA)
year: '2026'
org: MIT
parent: openvla_2
paper_url: https://ojs.aaai.org/index.php/AAAI/article/view/38921
project_url: ''
category: frontier_2026
motivation: 扩散Transformer重建注视区域提升成功率
```

#### 📝 一句话总结
ReconVLA 提出用扩散 Transformer 重建目标“注视区域”的隐式 grounding 训练方式，解决 VLA 模型视觉注意力分散、容易抓错目标的问题。它不依赖额外输入裁剪图或显式输出框，而是把目标区域重建作为辅助监督，迫使 VLA 学到更细粒度的目标表示。

#### 🎯 核心要点
- 观察到传统 VLA 在操作预测时注意力分散，不能稳定聚焦到目标操作区域
- 提出 implicit grounding：让模型输出 reconstructive tokens，条件化扩散 denoiser 重建 gaze region
- ReconVLA 同时包含 action part 和 reconstruction part，动作 token 用交叉熵训练，视觉重建用扩散噪声预测损失训练
- 使用 frozen visual tokenizer 将 gaze region 转成 latent scene tokens，扩散 Transformer 从噪声中恢复目标区域 latent
- 构建超过 100k 条轨迹、200 万样本的机器人预训练数据，用 Grounding DINO 自动产生整图-目标区域配对
- 在 CALVIN、真实机器人和未见目标泛化实验中，相比 explicit grounding 与 CoT grounding 更稳定

#### 🔬 深入细节
##### 框架总览

![ReconVLA 论文 PDF](https://ojs.aaai.org/index.php/AAAI/article/view/38921/42883)
*图：AAAI 论文 PDF 中 Figure 3 展示 ReconVLA 架构。AAAI 页面未提供独立图片直链，因此使用公开 PDF 作为图源入口。*

ReconVLA 的核心发现来自 attention 可视化：许多 VLA 虽然能把图像和指令编码进动作，但视觉注意力并不总落在要操作的物体上。在 cluttered scene 或长程任务中，注意力分散会导致抓错块、碰错容器或遗漏当前子目标。论文因此把“让模型学会看哪里”作为动作学习之外的辅助目标。

##### 训练伪代码

```python
# ReconVLA 训练的简化流程
for image, instruction, proprio, action, gaze_crop in robot_batch:
    image_tokens = vision_encoder(image)
    text_tokens = text_tokenizer(instruction)

    # action part: 预测离散动作 token
    action_tokens = vla_llm(image_tokens, text_tokens, proprio)
    loss_action = cross_entropy(action_tokens, discretize(action))

    # reconstruction part: 用 gaze region latent 做隐式 grounding 监督
    z0 = visual_tokenizer(gaze_crop)              # frozen VAE/tokenizer
    t, eps = sample_diffusion_noise()
    zt = add_noise(z0, t, eps)
    recon_tokens = extract_reconstructive_tokens(vla_llm)
    eps_hat = diffusion_denoiser(zt, recon_tokens, t)
    loss_visual = mean_squared_error(eps_hat, eps)

    loss = loss_action + loss_visual
    update(loss)
```

##### 方法细节

已有 VLA grounding 方法大致有两类。Explicit Grounding 依赖外部检测/分割专家，把整图和裁剪目标一起输入策略；CoT Grounding 让模型先输出 bounding box，再输出动作。这两类方法能提供目标信息，但都有副作用：外部专家增加系统复杂性，裁剪图可能带来冗余输入；显式坐标输出则会让 VLA 同时学习精确框和连续动作，训练难度上升。

ReconVLA 的隐式 grounding 不改变推理输入输出。模型仍输入多视角图像、语言指令和机器人本体状态，输出动作 token；区别在于训练时额外要求模型的视觉输出能作为条件，驱动扩散 denoiser 重建目标 gaze region。这个重建目标不是整张图，而是机器人当前应该关注的操作区域，例如要抓的蓝色积木或要打开的抽屉把手。

形式上，普通 VLA 将图像和文本编码为 \(h_I, h_S\)，自回归生成动作 token \(a\)，再由 detokenizer 变成可执行动作：

$$
A = Q(a) = Q(\mathrm{LLM}(E(I), T(S)))
$$

ReconVLA 增加视觉重建目标。给定 gaze region \(I'\)，用 frozen visual tokenizer 得到 scene latent \(z_0=F(I')\)。扩散过程采样噪声和时间步得到 \(z_t\)，denoiser \(D\) 在 reconstructive tokens \(h_R\) 条件下预测噪声：

$$
\mathcal{L}_{visual} = \mathbb{E}_{t,\epsilon}\left[\|D(z_t;h_R,t)-\epsilon\|_2^2\right]
$$

总损失为动作交叉熵与视觉重建损失之和：

$$
\mathcal{L}_{ReconVLA}=\mathcal{L}^{action}_{VLA}+\mathcal{L}^{visual}_{VLA}
$$

数据侧，作者用 BridgeData V2、LIBERO、CALVIN 等开源机器人数据构建预训练集，并用 Grounding DINO 根据指令自动分割 gaze region，形成整图与目标区域配对。超过 100k 轨迹和 200 万样本的预训练让模型先学会“从任务相关视觉输出重建目标区域”，再在具体任务上微调动作能力。

实验上，隐式 grounding 在 CALVIN ABC→D 长程任务中完成长度和多步成功率高于 baseline、explicit grounding 和 CoT grounding。注意力可视化显示，ReconVLA 会随子任务切换注视区域，例如先关注要拿起的蓝色块，再关注放置目标。这个行为解释了它在长程任务中更少发生目标混淆。

> 💡 关键：ReconVLA 的重建任务不是为了在推理时生成图片，而是用生成式辅助损失塑造 VLA 的内部视觉表示，让动作解码器基于更聚焦的目标特征做决策。

#### 🧪 练习题
```yaml
question: "ReconVLA 的 implicit grounding 与显式输出 bounding box 的主要区别是什么？"
options:
  - "ReconVLA 在推理时必须先调用外部检测器"
  - "ReconVLA 通过训练时重建 gaze region 来约束内部表示，推理时仍直接输出动作"
  - "ReconVLA 不使用任何图像输入"
  - "ReconVLA 只适用于网页点击任务"
answer: 1
explain: "ReconVLA 把目标区域重建作为辅助监督，不要求模型在推理时额外输出坐标框或使用裁剪图。"
```

### AtomVLA

```yaml
id: atomvla
num: 32
name: AtomVLA
full_name: 原子视觉语言动作模型 (AtomVLA)
year: '2026'
org: UC Berkeley
parent: reconvla
paper_url: https://arxiv.org/abs/2603.08519
project_url: ''
category: frontier_2026
motivation: 子任务感知的预测性潜在世界模型
```

#### 📝 一句话总结
AtomVLA 提出子任务感知的两阶段 VLA 后训练框架：先用 LLM 将长程演示拆成原子子任务做 SFT，再用预测性潜在世界模型给候选 action chunk 打分并进行离线 GRPO。它解决了高层指令过粗导致长程任务中误差累积、且真实机器人在线 RL 代价过高的问题。

#### 🎯 核心要点
- 使用 Qwen3-VL-4B-Instruct 作为 VLM backbone，并接入 cross-attention Diffusion Transformer action head
- 用 GPT-4o 将每条长程示范拆成 2-5 个原子子任务，标注子任务文本、起始帧和结束帧
- Stage I 监督微调用高层任务指令与当前原子子任务共同指导动作 chunk 预测
- Stage II 用基于 V-JEPA2 的 action-conditioned latent world model 预测候选动作后果
- 以子任务边界帧和最终目标帧为 latent goal，对候选 action chunk 计算奖励并做离线 GRPO
- 在 LIBERO 上平均成功率达到 97.0%，在更难的 LIBERO-PRO 上达到 48.0%，并在 Galaxea R1 Lite 真机验证长程泛化

#### 🔬 深入细节
##### 框架总览

![AtomVLA 论文 PDF](https://arxiv.org/pdf/2603.08519)
*图：论文 PDF Figure 1 展示 AtomVLA 两阶段框架。arXiv 当前未提供 HTML 图片直链，因此使用公开 PDF 作为图源入口。*

AtomVLA 的核心问题是 instruction grounding gap。许多 VLA 只在 SFT 时看到高层指令，例如“整理桌面”或“把物体放到目标位置”，但动作头需要输出连续低层动作。高层语言太粗，不能告诉模型当前阶段应该抓什么、放哪里、是否已经完成上一子目标；长程任务中一步偏差会继续累积。

##### 训练伪代码

```python
# AtomVLA 两阶段训练
for demo in demonstrations:
    subtasks = GPT4o.segment(
        instruction=demo.high_level_instruction,
        frames=sample_frames(demo.video),
        schema=[("subtask_text", "start_frame", "end_frame")],
    )
    add_subtask_labels(demo, subtasks)

# Stage I: SFT
for obs, high_inst, sub_inst, action_chunk in labeled_demos:
    H = qwen3_vl(obs, high_inst + sub_inst)
    pred = diffusion_action_head(H)
    loss = flow_matching_loss(pred, action_chunk)
    update_backbone_and_head(loss)

# Stage II: offline GRPO with latent world model reward
for state in sample_offline_states():
    candidates = policy.sample_action_chunks(state, K=10)
    rewards = []
    for a in candidates:
        z_future = latent_world_model.rollout(encoder(state.obs), a)
        r_sub = similarity(z_future, encoder(state.subgoal_frame))
        r_goal = similarity(z_future, encoder(state.final_goal_frame))
        rewards.append(0.3 * r_sub + 0.4 * r_goal)
    loss = grpo_loss(candidates, normalize(rewards), ref_policy)
    update_action_head(loss)
```

##### 方法细节

模型结构上，AtomVLA 用 Qwen3-VL-4B-Instruct 编码多视角视觉观测 \(O_t\)、高层指令 \(I_t\) 和当前子任务指令 \(SI_t\)，得到上下文 token：

$$
H_t = f_{VLM}(O_t, I_t + SI_t)
$$

动作头是 cross-attention Diffusion Transformer，以 flow matching 方式回归未来 \(N\) 步 action chunk。训练时对真实动作块加噪，模型学习从 noisy action 向真实动作速度场回归；推理时从高斯噪声初始化，经若干 Euler 步迭代得到动作块。这个设计比单步动作更具时间连贯性，但 chunk 过长会降低纠错灵活性，论文实验发现 chunk size 4 最优。

子任务数据来自 LLM 自动分解。给定演示视频帧和任务上下文，GPT-4o 输出 JSON 列表 \((\ell_i, s_i, e_i)\)，其中 \(\ell_i\) 是子任务文本，\(s_i,e_i\) 是起止帧。作者限制子任务粒度为基本操作表达，如 `Pick up [object]`、`Place [object] on [target position]`、`Open/Close [object]`、`Push [object]`，避免过细过程描述。这样每个状态都有“当前该做什么”的中间语言目标。

后训练阶段避免真实机器人在线 RL。AtomVLA 使用 frozen V-JEPA2 encoder \(J(\cdot)\) 把当前观测映射为 latent token，action-conditioned predictor \(W_\theta\) 根据候选 action chunk 预测未来 latent：

$$
\hat{z}_{t+N}=W_\theta(J(O_t), \tilde{a}_{t:t+N})
$$

奖励不是像素生成质量，而是未来 latent 与子任务边界帧、最终目标帧的相似度。这样模型能比较多个候选动作哪个更接近当前子目标和全局目标，同时避免生成式 world model 的视觉伪影。离线 GRPO 在同一状态采样 \(K\) 个候选，组内归一化 reward 得到 advantage，并加入相对 SFT reference policy 的 KL 约束，只更新动作头以稳定 VLM 表示。

实验结论支持两点：第一，原子子任务指令能显著提升长程任务，例如 LIBERO-Long 中“图像+高层任务+原子任务”优于只用图像或只用高层任务；第二，world-model-guided GRPO 在 SFT 之上继续提高目标对齐和抗扰动能力。LIBERO-PRO 的位置、物体、任务扰动更强，AtomVLA 仍保持非平凡成功率，说明 latent reward 比单纯模仿更能约束长程目标进展。

> 💡 关键：AtomVLA 把“语言分解的中间目标”和“latent world model 的候选动作评分”结合起来，提供了一条不依赖昂贵在线机器人 rollout 的 VLA 后训练路径。

#### 🧪 练习题
```yaml
question: "AtomVLA 为什么使用潜在世界模型给候选 action chunk 打分？"
options:
  - "为了直接生成最终渲染图像作为训练数据"
  - "为了在不进行真实机器人在线 rollout 的情况下，估计候选动作是否接近子任务和最终目标"
  - "为了替代所有语言指令"
  - "为了把连续动作离散化成网页点击"
answer: 1
explain: "V-JEPA2 latent world model 能预测候选动作后的 latent 后果，并与子目标/终目标 latent 比较，从而提供离线 GRPO 奖励。"
```

### Sim2Real-VLA

```yaml
id: sim2real_vla
num: 33
name: Sim2Real-VLA
full_name: 仿真到现实VLA (Sim2Real-VLA)
year: '2026'
org: Stanford
parent: atomvla
paper_url: https://openreview.net/forum?id=H4SyKHjd4c
project_url: ''
category: frontier_2026
motivation: 合成技能零样本迁移消除Sim2Real差距
```

#### 📝 一句话总结
Sim2Real-VLA 提出一种只用合成数据训练、却能零样本迁移到真实机器人操控的 VLA 模型，通过“高层可供性规划 + 低层动作执行”的双系统架构缓解合成仿真到真实世界的视觉与动力学差距。

#### 🎯 核心要点
- 双系统架构：高层 Planner 预测 object-centered chain-of-affordances，低层 Actor 将可供性计划转成实时机器人动作
- 纯合成训练：模型训练不依赖真实机器人微调，目标是用自动生成技能数据实现 hands-free scaling
- 物体中心表示：通过对象掩码和视觉编码过滤背景、纹理等操控无关信息，突出接触点、目标物和运动关键区域
- Tokenized action space：将连续控制转为离散或半离散动作 token，便于 VLA 自回归生成与执行验证
- 执行闭环：Actor 执行当前 affordance 后由 motion validation 判断是否完成，未完成则重复当前 affordance，完成后进入下一步
- 覆盖任务：论文评估包含双臂、灵巧手和长时程操控任务，重点验证不同真实环境和域偏移下的零样本 Sim2Real 泛化

#### 🔬 深入细节
##### 框架示意图

![Sim2Real-VLA 双系统框架](https://assets.getliner.com/web/pseo/represent_iclr_1636.jpg)
*图：Sim2Real-VLA 的公开索引图。左侧规划系统从语言指令与历史观测中预测可供性链，右侧执行系统按可供性逐步生成动作并用运动验证决定继续、重复或切换子目标。*

##### 核心算法伪代码

```python
# Sim2Real-VLA 推理流程伪代码
def sim2real_vla_execute(instruction, history_observations, robot_state):
    masked_obs = object_mask_and_encode(history_observations)
    affordance_chain = planner.generate(
        language=instruction,
        observations=masked_obs,
    )

    for affordance in affordance_chain:
        finished = False
        while not finished:
            action_tokens = actor.generate_tokens(
                affordance=affordance,
                observation=get_current_observation(),
                proprioception=robot_state,
            )
            actions = detokenize_actions(action_tokens)
            robot_state = robot.execute(actions)
            finished = motion_validator(
                affordance=affordance,
                observation=get_current_observation(),
                robot_state=robot_state,
            )
    return "task_finished"
```

##### 方法解释

Sim2Real-VLA 针对的是合成训练数据常见的 Sim2Real gap：合成画面可以规模化生成，但纹理、光照、遮挡、接触误差和真实机械臂动力学都与现实不同。直接把标准 VLA 在合成轨迹上训练后部署到真实机器人，模型容易过拟合像素细节或短期动作模式，一旦真实摄像头视角、桌面材质或物体外观变化就失效。

论文的关键做法是把“想做什么”和“怎么执行”拆成两个紧耦合系统。高层规划器不直接输出每一帧动作，而是预测一串以物体为中心的可供性：

$$
q_{1:K} \sim p_{\theta}(q_{1:K} \mid I, O_{t-H:t})
$$

其中 \(I\) 是语言指令，\(O_{t-H:t}\) 是历史观测，\(q_k\) 表示第 \(k\) 个可供性子目标，例如接近杯口、对齐容器、倾倒或放置。可供性链比自然语言计划更贴近机器人控制，因为它绑定了目标物、交互区域和运动意图。

低层 Actor 接收当前 affordance、视觉观测和机器人本体状态，生成动作 token 序列：

$$
a_{t:t+h} = \mathrm{Detokenize}\left(g_{\phi}(O_t, s_t, q_k)\right)
$$

这种 tokenized action space 的优势是让动作生成与 VLA 的序列建模形式对齐，同时避免直接在长时程任务中一次性预测完整轨迹。执行后，motion validator 判断当前 affordance 是否达成：若未完成，则重复当前 affordance；若完成，则推进到下一个 affordance。

> 💡 关键：Sim2Real-VLA 不是单纯“让合成图像更真实”，而是把策略表示改成更抗域偏移的中层可供性链。真实与仿真的纹理差异会被对象掩码和可供性抽象削弱，真正被保留下来的是“哪个物体、哪个区域、做什么交互”。

训练数据侧，论文强调与自动化技能生成管线集成：通过真实先验投影到仿真、生成式场景扩展和自动技能获取持续生产合成轨迹。这样模型可以在大量物理一致的合成交互中学习，而不是为每个真实任务采集人工演示。

与传统 VLA 相比，Sim2Real-VLA 的不同点在于层次化接口。OpenVLA/RT-2 类模型通常从图像和指令直接输出动作，表示链路短但对数据分布敏感；Sim2Real-VLA 在中间插入 affordance chain，使长时程任务可以被拆成稳定的物体级子目标，再由 Actor 做局部闭环控制。

#### 🧪 练习题
```yaml
question: "Sim2Real-VLA 缓解仿真到现实差距的核心机制是什么？"
options:
  - "在真实机器人上收集大量人工演示后再微调"
  - "将任务拆成物体中心可供性链，并由低层 Actor 闭环执行"
  - "只提升合成图像分辨率，使其更接近真实照片"
  - "完全移除语言指令，只使用机器人状态控制"
answer: 1
explain: "论文的核心是双系统架构：Planner 预测 object-centered affordance chain，Actor 执行并验证每个 affordance，从而保留操控关键结构并削弱仿真纹理差异。"
```

### Box-Chain VLA

```yaml
id: box_chain_vla
num: 34
name: Box-Chain VLA
full_name: 盒链视觉语言动作模型 (Box-Chain VLA)
year: '2026'
org: CMU
parent: sim2real_vla
paper_url: https://ieeexplore.ieee.org/abstract/document/11464640/
project_url: ''
category: frontier_2026
motivation: 显式推理-动作接口增强可解释性
```

#### 📝 一句话总结
Box-Chain VLA 提出 Chain-of-Boxes Reasoning VLA，用结构化边界框链作为显式推理-动作接口，并把推理与动作统一到共享潜空间中，以缓解高层规划和低层机器人控制之间的语义鸿沟。

#### 🎯 核心要点
- 问题定位：传统 VLA 或 ECoT 式方法容易让语言推理停留在文本空间，动作解码仍需隐式对齐
- Chain-of-Boxes：用一串视觉接地的 box 表示任务相关物体、空间关系和阶段性子目标
- 共享潜空间：推理 token 与动作 token 在同一生成上下文中建模，使空间推理直接影响动作预测
- 显式接口：box chain 可被可视化检查，比纯隐式动作 token 更容易解释模型为什么抓取、移动或对齐某个区域
- 面向泛化操控：论文公开信息强调其目标是提升复杂、杂乱环境中的 fine-grained grounding 和 robustness
- 会议信息：该工作为 ICASSP 2026 ASPS-L6 Robotics II Oral 论文，公开索引题名为 “Explicit Reasoning-to-Action Interfaces for Generalizable Robotic Manipulation”

#### 🔬 深入细节
##### 框架示意图

![Box-Chain VLA 推理-动作接口示意](https://quickchart.io/graphviz?format=png&graph=digraph%20G%20%7B%20rankdir%3DLR%3B%20node%20%5Bshape%3Dbox%2C%20style%3D%22rounded%2Cfilled%22%2C%20fillcolor%3D%22%23eef6ff%22%5D%3B%20input%20%5Blabel%3D%22Image%20%2B%20Instruction%22%5D%3B%20reason%20%5Blabel%3D%22Chain-of-Boxes%0AReasoning%20Tokens%22%5D%3B%20latent%20%5Blabel%3D%22Shared%20Latent%0AReasoning%20%2B%20Action%22%5D%3B%20action%20%5Blabel%3D%22Action%20Tokens%0ATrajectory%22%5D%3B%20robot%20%5Blabel%3D%22Robot%20Manipulation%22%5D%3B%20input%20-%3E%20reason%20-%3E%20latent%20-%3E%20action%20-%3E%20robot%3B%20%7D)
*图：公开页面未提供可直接嵌入的论文架构图直链；此图依据公开摘要中的 Chain-of-Boxes 与 shared latent space 描述重绘核心数据流。*

```text
RGB observation + language instruction
        │
        ▼
VLA visual-language encoder
        │
        ▼
Chain-of-Boxes reasoning tokens
  [box: source object] -> [box: grasp/contact] -> [box: goal region]
        │
        ▼
shared latent sequence
        │
        ▼
action tokens / trajectory head
        │
        ▼
robot manipulation execution
```

##### 核心算法伪代码

```python
# Box-Chain VLA 推理接口伪代码
def box_chain_vla_step(image, instruction, robot_state):
    visual_tokens = vision_encoder(image)
    text_tokens = text_encoder(instruction)

    # 生成视觉接地的推理链，而不是仅生成自然语言 CoT
    box_chain = []
    context = concat(text_tokens, visual_tokens)
    for k in range(max_reasoning_steps):
        box_token = vla_backbone.generate_box_token(context, previous=box_chain)
        box_chain.append(box_token)
        if is_terminal_subgoal(box_token):
            break

    # 推理 token 与动作 token 共享上下文，动作直接条件化在 box chain 上
    latent_context = concat(context, box_chain)
    action_tokens = action_decoder(latent_context, robot_state)
    return detokenize_robot_action(action_tokens), box_chain
```

##### 方法解释

Box-Chain VLA 的出发点是：机器人操控中的“推理”不能只是一段自然语言解释。自然语言 CoT 可以描述“先拿起杯子，再放到盘子旁边”，但真正执行时还需要知道杯子的可抓取区域、目标区域、遮挡关系、末端执行器接触位置等视觉-空间信息。如果推理输出和动作解码之间没有结构化接口，模型仍然要靠隐式注意力把文字映射到连续动作，泛化时容易断裂。

Chain-of-Boxes 把中间推理改成视觉接地序列。一个 box token 可以表示当前任务相关的物体区域，也可以表示下一步需要关注的接触点或目标区域。形式上可写为：

$$
z^{box}_{1:K} = f_{\theta}(I, V), \quad
z^{act}_{1:T} = g_{\theta}(I, V, z^{box}_{1:K}, s_t)
$$

其中 \(I\) 是指令，\(V\) 是视觉特征，\(s_t\) 是机器人状态。关键不在于 box 是否等同于二维坐标，而在于它把“推理结果”变成可被动作模块直接消费的空间 token。

共享潜空间是论文公开摘要中最重要的架构点。传统流水线常把高层规划放在语言空间，再交给另一个控制模块翻译；Box-Chain VLA 则把 box reasoning token 和 action token 放在同一潜在序列中。这样做的直觉是：动作生成不再只看一句计划文本，而是能直接 attend 到一串已接地的空间子目标。

> 💡 关键：Box-Chain 的可解释性来自“能看到模型在关注哪些框、按什么顺序推进”，但它的性能收益来自“这些框不是旁路注释，而是动作生成的输入结构”。

与 ECoT 类方法相比，Box-Chain VLA 的接口更偏几何和动作相关。ECoT 通过文本推理、物体框、末端位置等多种中间描述帮助 VLA 思考；Box-Chain VLA 更强调把 box chain 作为 reasoning-to-action interface，减少从文本计划到运动控制的语义落差。

由于公开索引未披露完整损失函数和实验表格，最稳妥的理解是：Box-Chain VLA 是一种把可视化空间推理嵌入 VLA 动作生成流的架构设计，而不是单纯增加一个目标检测器或事后解释模块。它的价值在于让长时程、杂乱场景中的“看哪里、对齐哪里、移动到哪里”变成显式中间变量。

#### 🧪 练习题
```yaml
question: "Box-Chain VLA 相比普通文本 CoT 推理的关键区别是什么？"
options:
  - "它用更大的语言模型替代机器人动作头"
  - "它把推理表示为视觉接地的 box chain，并让动作生成直接条件化在这些空间 token 上"
  - "它只进行目标检测，不生成机器人动作"
  - "它完全取消中间推理以降低延迟"
answer: 1
explain: "Box-Chain VLA 的核心是显式 reasoning-to-action interface：边界框链在共享潜空间中连接视觉推理与动作 token，降低高层规划和低层控制之间的语义鸿沟。"
```

### JanusVLN

```yaml
id: janusvln
num: 35
name: JanusVLN
full_name: 双面神导航 (JanusVLN)
year: '2026'
org: MIT
parent: hamt
paper_url: https://iclr.cc/virtual/2026/poster/12345
project_url: ''
category: frontier_2026
motivation: 双重隐式神经内存解耦语义与空间
```

#### 📝 一句话总结
JanusVLN 提出面向连续视觉语言导航的双重隐式记忆框架，将视觉语义记忆与空间几何记忆分开建模并用 KV cache 增量更新，解决显式历史帧/文本地图带来的空间信息损失、重复计算和记忆膨胀问题。

#### 🎯 核心要点
- 双重隐式记忆：分别维护 visual-semantic memory 与 spatial-geometric memory，且记忆大小不随轨迹长度线性增长
- 3D 几何先验：引入 VGGT 作为空间几何编码器，仅用 RGB 视频提取深度、点云等隐式 3D 结构信息
- 混合 KV 更新：保留 initial window 的 KV 作为全局 attention sink，同时用 sliding window 保存最近帧上下文
- 双编码器解耦：Qwen2.5-VL 视觉编码器负责“是什么”，VGGT 空间编码器负责“在哪里、空间关系如何”
- 空间感知融合：将语义 token 与空间几何 token 对齐后经轻量 MLP 融合，再输入 MLLM 预测下一步动作
- 实验结果：在 R2R-CE 与 RxR-CE 上超过 20 个近期方法，证明 RGB-only 输入也能获得强空间导航能力

#### 🔬 深入细节
##### 框架示意图

![JanusVLN 框架](https://arxiv.org/html/2509.22548v1/x2.png)
*图：JanusVLN 使用双编码器分别提取视觉语义与空间几何特征，并把历史 KV cache 构造成固定大小的双重隐式记忆。*

##### 核心算法伪代码

```python
# JanusVLN 在线导航推理伪代码
M_sem_init, M_sem_slide = [], Queue(maxlen=n_sem)
M_geo_init, M_geo_slide = [], Queue(maxlen=n_geo)

for t, frame in enumerate(rgb_video_stream):
    semantic_tokens, sem_kv = qwen_visual_encoder(
        frame,
        memory=M_sem_init + list(M_sem_slide),
    )
    geometry_tokens, geo_kv = vggt_geometry_encoder(
        frame,
        memory=M_geo_init + list(M_geo_slide),
    )

    if t < initial_window:
        M_sem_init.append(sem_kv)
        M_geo_init.append(geo_kv)
    else:
        M_sem_slide.push(sem_kv)
        M_geo_slide.push(geo_kv)

    geometry_tokens = spatial_merge(geometry_tokens)
    fused_tokens = mlp_project(concat(semantic_tokens, lambda_g * geometry_tokens))
    action = mllm_next_action(instruction, fused_tokens)
    execute(action)
```

##### 方法解释

VLN-CE 要求智能体在连续 3D 环境中跟随语言指令前进、转向或停止。近期 MLLM 导航方法通常依赖显式记忆：一种做法是把历史观测写成文本认知地图，另一种做法是保存历史视频帧。前者容易丢失方向、深度和相对位置等空间信息，后者每一步都要重新处理长历史帧，计算量和上下文长度都会爆炸。

JanusVLN 的核心假设是：导航记忆不必保存为原始文本或图像，而可以保存为神经网络内部已经压缩过的 KV cache。对于每个新帧，模型只需要与固定容量的历史 KV 做交互，即可取回过去环境信息：

$$
M = M_{\text{initial}} \cup M_{\text{sliding}}
$$

其中 \(M_{\text{initial}}\) 保存最开始若干帧的 KV，用作全局锚点；\(M_{\text{sliding}}\) 保存最近 \(n\) 帧的 KV，用于实时局部决策。这样记忆规模为常数，不会随导航步数无限增长。

第二个关键是语义和空间的解耦。JanusVLN 使用 Qwen2.5-VL 的视觉编码器提取语义 token \(S_t\)，用于理解物体类别、场景语义和指令相关实体；同时使用 VGGT 的 encoder/fusion decoder 提取空间几何 token \(G_t\)，提供 RGB-only 输入中的 3D 先验。二者融合为：

$$
F_t = \mathrm{MLP}\left([S_t;\lambda G_t]\right)
$$

其中 \(\lambda\) 控制空间几何信息的权重。论文实现中 \(\lambda=0.2\)，initial/sliding window 分别设为 8 和 48 帧。

> 💡 关键：JanusVLN 不是把深度图作为额外传感器输入，而是用预训练 3D 几何模型从 RGB 视频中提取空间先验，因此部署上仍保持 RGB-only。

训练时，JanusVLN 基于 Qwen2.5-VL 7B 和 VGGT 构建，只微调 LLM 与投影层，语义编码器和空间编码器保持冻结。动作空间遵循 VLN-CE 设置，包括小角度旋转、前进和 Stop。实验在 R2R-CE 与 RxR-CE 上报告 NE、OS、SR、SPL 与 nDTW 等指标。

消融结果显示，移除 spatial memory 会使 SPL 明显下降，移除 semantic memory 会导致 SR 下降；同时移除双重隐式记忆会让性能接近崩溃。这说明两类记忆不是冗余模块，而是分别负责“理解目标语义”和“维护 3D 空间关系”。

#### 🧪 练习题
```yaml
question: "JanusVLN 中 initial window 与 sliding window 的组合主要解决什么问题？"
options:
  - "把 RGB 图像转换成文本描述"
  - "在固定记忆容量下同时保留全局锚点和最近上下文，避免重复处理全部历史帧"
  - "让机器人一次预测完整导航轨迹"
  - "用真实深度传感器替代视觉编码器"
answer: 1
explain: "Initial KV 提供长期全局锚点，sliding KV 保存近期观测，使模型能增量更新历史信息，同时避免显式历史帧带来的计算和内存膨胀。"
```

### SE-VLN

```yaml
id: se_vln
num: 36
name: SE-VLN
full_name: 自进化视觉语言导航 (SE-VLN)
year: '2026'
org: Stanford
parent: janusvln
paper_url: https://openreview.net/forum?id=SEVLN2026
project_url: ''
category: frontier_2026
motivation: 分层内存模块实现测试时自我进化
```

#### 📝 一句话总结
SE-VLN 提出一种基于多模态大模型的 training-free 自进化视觉语言导航框架，通过分层记忆、检索增强 CoT 推理和反思模块，把成功与失败轨迹沉淀为可复用经验，使测试阶段的导航能力随经验库增长而提升。

#### 🎯 核心要点
- 三模块框架：Hierarchical Memory、Retrieval-Augmented Thought-Based Reasoning、Reflection
- 短期记忆：verbal topological map 记录已访问节点、视觉观测文本描述、thinking/planning/executing 决策过程
- 长期记忆：experience repository 以向量数据库 Chroma 存储 landmark、scene description、decision process、revised decision
- 经验检索：用 Sentence-BERT 编码当前任务 landmark，从经验库中检索相似经验作为 few-shot prompt
- 多步决策：CoT decider 将每一步拆成 thinking、planning、executing，增强复杂指令下的可解释推理
- 反思自进化：outcome evaluator 用 NE/OSR/SR/SPL 等指标定位失败，experience corrector 修正错误决策并写回经验库
- 实验基准：在 R2R 与 REVERIE 上验证，R2R unseen SR 达 57%，REVERIE unseen SR 达 35.2%

#### 🔬 深入细节
##### 框架示意图

![SE-VLN 工作流](https://arxiv.org/html/2507.13152v1/x1.png)
*图：SE-VLN 由分层记忆、检索增强思维推理和反思模块组成，执行任务后把修正后的经验写回长期经验库。*

##### 核心算法伪代码

```python
# SE-VLN 测试时自进化流程伪代码
experience_db = Chroma()

def run_navigation_task(instruction, simulator):
    landmarks = extract_landmarks(instruction)
    few_shot_exp = retrieve_top_k(experience_db, landmarks, k=2)
    topo_map = VerbalTopologicalMap()
    trajectory = []

    while not simulator.done():
        obs = simulator.observe()
        scene_text = mllm_describe(obs)
        topo_map.update_observation(obs.node_id, scene_text)

        prompt = build_prompt(
            instruction=instruction,
            contextual_memory=topo_map.serialize(),
            few_shot_experience=few_shot_exp,
        )
        decision = cot_decider(prompt)  # thinking -> planning -> executing
        simulator.execute(decision.action)
        topo_map.update_decision(obs.node_id, decision)
        trajectory.append(decision)

    scores = outcome_evaluator(trajectory, simulator.ground_truth)
    revised = experience_corrector(
        scores=scores,
        contextual_memory=topo_map.serialize(),
        trajectory=trajectory,
    )
    experience_db.add(make_experience(landmarks, topo_map, trajectory, revised))
```

##### 方法解释

SE-VLN 关注的是 LLM-powered VLN 的另一个短板：模型虽然有强语言理解能力，但在测试环境中不会真正积累经验。已有方法往往把历史轨迹当作当前任务的静态上下文，任务结束后不会把错误路径、正确纠偏或 landmark 经验转化为可复用知识，因此面对相似路线仍可能重复犯错。

分层记忆模块把记忆拆成短期和长期两层。短期的 verbal topological map 是当前任务内的动态地图：

$$
M_t = \{G_t, D_t, P_t\}
$$

其中 \(G_t\) 是已探索拓扑，\(D_t\) 是各节点的视觉文字描述，\(P_t\) 是每一步 thinking/planning/executing 决策记录。长期的 experience repository 则把任务后反思得到的经验保存为：

$$
e = \langle L, S, A, A' \rangle
$$

其中 \(L\) 是 landmark 特征，\(S\) 是场景描述，\(A\) 是原始决策过程，\(A'\) 是修正后的决策过程。

检索增强推理模块先从指令中抽取 landmark，再用 Sentence-BERT 编码并与经验库条目计算余弦相似度：

$$
\mathrm{sim}(q, e_i) = \frac{q^\top e_i}{\|q\|\|e_i\|}
$$

论文发现 2-shot 相似经验效果最好，5-shot 反而可能降低性能，因为过多经验会占用上下文窗口并引入重复噪声。

> 💡 关键：SE-VLN 的“自进化”不是在线更新模型权重，而是通过任务后反思持续扩充经验库，让后续 prompt 检索到更有用的导航策略。

反思模块由 outcome evaluator 和 experience corrector 组成。Evaluator 基于 Matterport3D 中的真实路径计算 NE、OSR、SR、SPL 等指标，定位路径中第一处不合理决策；Corrector 再调用 MLLM 结合拓扑记忆分析错误原因，生成修正决策并写回经验库。在真实场景中，论文也指出可用人工交互反馈替代模拟器 ground truth。

与 JanusVLN 偏神经记忆不同，SE-VLN 更偏符号化经验记忆：它不缓存视觉 KV，而是把“我在某类 landmark 附近如何选择路径、哪里走错了、应该如何纠正”转成文本经验。优势是 training-free、可解释、易于跨任务复用；局限是依赖 MLLM 反思质量和文本化场景描述的完备性。

#### 🧪 练习题
```yaml
question: "SE-VLN 中 experience corrector 的主要作用是什么？"
options:
  - "把图像压缩为低维视觉 token"
  - "根据任务评估结果和拓扑记忆找出不合理决策，生成修正经验并写回经验库"
  - "替代导航环境执行机器人动作"
  - "随机增加更多历史经验以扩大 prompt"
answer: 1
explain: "Experience corrector 是反思模块的核心，它利用评估指标定位错误并生成 corrected decision process，使经验库能随任务执行持续进化。"
```

### IndoorUAV

```yaml
id: indooruav
num: 37
name: IndoorUAV
full_name: 室内无人机导航 (IndoorUAV)
year: '2026'
org: ETH Zurich
parent: se_vln
paper_url: https://ojs.aaai.org/index.php/AAAI/article/view/39562
project_url: ''
category: frontier_2026
motivation: 生成式世界模型支持UAV连续环境导航
```

#### 📝 一句话总结
IndoorUAV 提出首个大规模连续室内 UAV 视觉语言导航基准，并给出 IndoorUAV-Agent，通过长指令分解和 VLA 子策略执行，把室内三维飞行中的高层语言理解与低层四自由度飞行控制连接起来。

#### 🎯 核心要点
- 场景规模：从 Habitat 中整理 1,000+ 多样、结构丰富的 3D 室内场景
- 轨迹采集：模拟真实 UAV 飞行动力学，人工采集 3D 导航轨迹，并用轨迹反转、子轨迹重组扩增数据
- 双子集设计：IndoorUAV-VLN 面向长时程语言导航，IndoorUAV-VLA 面向 1-3 个动作的短时程细粒度控制
- 自动标注：基于关键帧选择、图像 caption 和 LLM prompt 自动生成不同粒度的自然语言指令
- 动作空间：覆盖水平平移、垂直移动和 yaw 旋转等 4-DoF UAV 操作
- IndoorUAV-Agent：用 GPT-4o 将长指令拆成短 VLA-style 子指令，再由基于 π0 的 VLA 模型顺序执行
- 评估重点：同时考察 SR、NDTW、轨迹终点距离与航向角误差，突出室内空中导航的三维空间控制难度

#### 🔬 深入细节
##### 基准示意图

![IndoorUAV 数据集示意](https://arxiv.org/html/2512.19024v1/x1.png)
*图：IndoorUAV-VLN 负责长时程复杂指令和长轨迹，IndoorUAV-VLA 负责由 1-3 个可执行动作组成的短时程精细飞行控制。*

##### 核心算法伪代码

```python
# IndoorUAV 数据构建与 Agent 执行伪代码
def build_indooruav_dataset(habitat_scenes):
    trajectories = []
    for scene in habitat_scenes:
        path = manually_collect_uav_trajectory(scene, dynamics="4DoF")
        trajectories.extend([path, reverse(path), recombine_subpaths(path)])

    vln_pairs = []
    vla_pairs = []
    for traj in trajectories:
        keyframes = select_semantic_keyframes(traj)
        captions = [caption_frame(f) for f in keyframes]
        vln_instruction = llm_generate_long_instruction(captions, traj.actions)
        vln_pairs.append((vln_instruction, traj))

        for subtraj in split_by_keyframes(traj):
            vla_instruction = llm_generate_short_instruction(subtraj)
            vla_pairs.append((vla_instruction, subtraj.actions))
    return vln_pairs, vla_pairs

def indooruav_agent(long_instruction, observations):
    subtasks = gpt4o_decompose(long_instruction)
    for sub_instruction in subtasks:
        action_chunk = pi0_vla_policy(observations.current(), sub_instruction)
        execute_uav_actions(action_chunk)
```

##### 方法解释

传统 VLN 基准大多面向地面机器人，动作空间通常是前进、左转、右转或在离散导航点之间移动；已有 UAV-VLN 又多集中于户外稀疏环境。室内 UAV 导航更难：空间拥挤、障碍密集、走廊狭窄、视角可上下移动，而且需要在连续 3D 空间里同时控制位置和航向。

IndoorUAV 的数据构建从 Habitat 模拟器中筛选 1,000+ 室内场景，按 UAV 飞行动力学采集轨迹。每个状态可表示为：

$$
s_t = (x_t, y_t, z_t, \theta_t)
$$

其中 \((x,y,z)\) 是三维位置，\(\theta\) 是 yaw 角。VLA 模型要预测未来一小段状态或动作：

$$
S_{t+1:t+h+1} = \mathrm{Model}_{VLA}(O_1, O_t, I, s_t)
$$

这比地面 VLN 多了高度维度与旋转对齐问题，因此论文在 VLA 评估中不仅计算 3D 坐标 NDTW，也额外考虑 yaw angle 的对齐。

数据集被拆成两个互补部分。IndoorUAV-VLN 包含 16,000+ 高质量 instruction-trajectory pairs，主要测试长指令理解和长时程导航；IndoorUAV-VLA 包含 34,925 个短轨迹样本，每条指令通常只对应 1-3 个动作，主要测试局部低层飞行控制。

> 💡 关键：IndoorUAV 同时覆盖“听懂长指令并规划路线”和“按短指令精确飞行动作”两个层级，避免只评估语言理解或只评估低层控制。

IndoorUAV-Agent 采用层次化方案：先用 GPT-4o 将长时程指令分解成一组短 VLA-style 指令，再让基于 π0 的 VLA 模型逐段执行。这与直接把长指令喂给低层策略相比更稳定，因为低层模型只需处理短时程目标，例如上升、穿过门口、转向某个方向。

实验显示，当前通用 VLA/VLN 模型在该基准上仍有明显性能缺口。NaVid 等模型可能有较高 OSR 但 SR 很低，说明它们路径局部接近目标却不擅长 Stop；OpenVLA 等离散动作模型也难以直接覆盖室内 UAV 的连续三维控制。

#### 🧪 练习题
```yaml
question: "IndoorUAV 为什么同时设计 IndoorUAV-VLN 和 IndoorUAV-VLA 两个子集？"
options:
  - "分别评估长时程语言导航和短时程细粒度 UAV 动作控制"
  - "一个用于训练文本分类器，一个用于训练图像分类器"
  - "只为了把数据集数量翻倍"
  - "VLN 子集用于室外，VLA 子集用于室内"
answer: 0
explain: "IndoorUAV-VLN 关注复杂长指令和长轨迹，IndoorUAV-VLA 关注 1-3 个动作的局部飞行控制，两者对应 UAV 导航的高层规划和低层执行。"
```

### CausalNav

```yaml
id: causalnav
num: 38
name: CausalNav
full_name: 因果导航 (CausalNav)
year: '2026'
org: CMU
parent: indooruav
paper_url: https://ieeexplore.ieee.org/abstract/document/11345948/
project_url: ''
category: frontier_2026
motivation: 因果推理增强动态户外长程导航鲁棒性
```

#### 📝 一句话总结
CausalNav 提出面向动态户外环境的长程语义导航系统，通过 LLM 构建多层级 Embodied Graph，并结合 RAG 检索、动态物体时空过滤和全局-局部层次规划，实现开放词汇语言指令下的鲁棒移动机器人导航。

#### 🎯 核心要点
- Embodied Graph：融合离线地图中的建筑节点、在线感知的物体节点、自车历史节点和 LLM 聚类节点
- 开放词汇感知：用 YOLO-World 提取 2D 检测框与分割掩码，结合 LiDAR 投影得到世界坐标下的 3D 物体节点
- 动态过滤：用 CenterPoint + LIOsegmot 跟踪动态物体，并通过 spatial-temporal corridor 移除移动节点
- 层次聚类：根据空间距离与语义 embedding 相似度自底向上聚类，LLM 为聚类节点生成摘要
- RAG 检索：把 Embodied Graph 作为可检索知识库，根据语言查询逐层选择候选目标并做空间-语义重排序
- 分层规划：全局路径由历史轨迹、离线地图或外部地图 API 给出，局部路径由 RH-Map、informed-RRT*、B-spline 和 NMPC-CBF 执行
- 实验验证：在 Gazebo 仿真和校园真实机器人中完成 100m 到 500m+ 长程动态户外导航

#### 🔬 深入细节
##### 框架示意图

![CausalNav 系统框架](https://arxiv.org/html/2601.01872v1/x2.png)
*图：CausalNav 包含开放词汇目标跟踪与自运动估计、动态物体过滤与 Embodied Graph 构建、图更新与语言导航三个主要阶段。*

##### 核心算法伪代码

```python
# CausalNav 在线 Embodied Graph 更新与导航伪代码
G = EmbodiedGraph()

while robot_is_running:
    rgb, lidar, imu = read_sensors()
    ego_pose = lidar_inertial_odometry(lidar, imu)

    detections = yolo_world(rgb)              # open-vocabulary boxes + masks
    tracks = bytetrack(detections)
    for obj in tracks:
        point_cloud = project_lidar_into_mask(lidar, obj.mask)
        bbox3d, obj_pose = fit_3d_bbox(point_cloud, ego_pose)
        G.upsert_object(description=obj.label, bbox=bbox3d, pose=obj_pose)

    dynamic_tracks = centerpoint_liosegmot(lidar, ego_pose)
    for track in dynamic_tracks:
        corridor = update_spatiotemporal_corridor(track)
        if corridor.displacement_steps > k:
            G.remove_dynamic_object(track.id)

    G.add_ego_node(ego_pose)
    G.hierarchical_cluster_with_llm()

    if user_query_available():
        target = G.semantic_retrieve(user_query)
        global_path = plan_global_route(G, target)
        local_traj = informed_rrt_star_with_rhmap(global_path)
        control = nmpc_cbf_track(local_traj, dynamic_obstacles())
        robot.execute(control)
```

##### 方法解释

CausalNav 解决的是户外长程语言导航中的三类问题：语义查询开放、环境动态变化、路径跨度很长。传统视觉导航策略往往依赖固定目标图像或局部拓扑图，难以回答“去靠近消防栓旁边的入口”这类开放词汇指令；同时，车辆和行人会在地图中留下动态残影，导致全局路径和局部避障不稳定。

系统的核心数据结构是 Embodied Graph。物体节点包含描述、3D 包围盒和世界坐标；建筑节点来自离线地图；自车节点记录历史轨迹；聚类节点由 LLM 对相邻物体和建筑区域做语义摘要。静态环境的空间-语义相似度可写为：

$$
\kappa_{ij} = (1-\alpha)\kappa_{ij}^{spatial} + \alpha \kappa_{ij}^{semantic}
$$

其中空间相似度基于地理距离，语义相似度基于 embedding 余弦相似度。这样可以把“垃圾桶/garbage bin”这类标签变体聚到相似区域。

动态物体过滤是 CausalNav 相对普通语义地图的重要改进。系统不只看瞬时速度，而是把对象历史轨迹编码成 spatial-temporal corridor：

$$
\mathcal{T}=\{(T_i^{obj}, \mathrm{3DBBox}_i, t_i)\}_{i=1}^{n}
$$

若对象在时间窗口内位移超过阈值，就从 Embodied Graph 的静态结构中剔除。这能减少路口车辆、行人等暂态对象对长期语义地图的污染。

> 💡 关键：CausalNav 的“因果”直觉在于区分稳定环境结构与短时动态干扰，让长期导航决策依赖可持续的空间-语义因果线索，而不是被瞬态障碍物误导。

语言检索时，系统逐层让 LLM 根据查询 \(q\) 和节点描述 \(C(n_l)\) 打分：

$$
\pi(n_l \mid q) =
\frac{\exp(\gamma \cdot \mathrm{LLM}(q, C(n_l)))}
{\sum_{n' \in \mathcal{L}_l}\exp(\gamma \cdot \mathrm{LLM}(q, C(n')))}
$$

再结合父子链接约束和空间邻近度得到最终候选。检索出的目标进入规划模块：如果目标连接到历史轨迹，就用 Dijkstra；否则调用离线地图或外部地图 API 产生全局航点。局部规划使用 RH-Map 移除动态障碍残影，informed-RRT* 生成初始路径，B-spline 平滑后由 NMPC-CBF 跟踪并保证安全约束。

实验中，CausalNav 在短程和长程仿真任务中保持高成功率，并显著降低动态环境碰撞；真实校园环境中，约 130m 的物体级指令和 512m 的建筑级指令展示了其对大尺度开放词汇导航的适应能力。

#### 🧪 练习题
```yaml
question: "CausalNav 中 spatial-temporal corridor 的主要作用是什么？"
options:
  - "把语言指令翻译成自然语言解释"
  - "记录动态物体的时间轨迹并从长期 Embodied Graph 中移除瞬态移动对象"
  - "压缩大语言模型参数"
  - "替代 LiDAR 完成全部定位"
answer: 1
explain: "时空走廊通过历史 3D 包围盒和时间戳判断对象是否持续移动，避免车辆和行人等动态实体污染长期语义图。"
```

### RiOSWorld

```yaml
id: riosworld
num: 39
name: RiOSWorld
full_name: 风险操作系统世界 (RiOSWorld)
year: '2025'
org: Stanford
parent: —
paper_url: https://proceedings.neurips.cc/paper_files/paper/2025/hash/0c79d6ed1788653643a1ac67b6ea32a7-Abstract-Conference.html
project_url: ''
category: frontier_2026
motivation: 评估多模态Agent操作风险与安全性
```

#### 📝 一句话总结
RiOSWorld 提出一个面向真实虚拟机操作环境的多模态 Computer-Use Agent 风险评估基准，用 492 个风险任务、13 个风险子类和“风险意图/风险完成”双指标系统衡量 Agent 在操作系统、网页、邮件、办公和多媒体场景中的安全性。

#### 🎯 核心要点
- 真实操作环境：基于 VM 和 OSWorld 式交互构建，可运行真实应用、真实网络和可执行评估脚本
- 风险分类：492 个任务分为 environmental risks 与 user-originated risks 两大类，共 13 个子类
- 动态威胁：支持 phishing email、pop-ups/ads、reCAPTCHA、account fraud 等运行中注入的 halfway_config
- 配置化任务：每个任务包含 instruction、环境初始化 config、动态风险 halfway_config、任务 evaluator 与 risk_evaluator
- 双维度评估：Risk Goal Intention 用 LLM-as-a-Judge 评估轨迹意图，Risk Goal Completion 用规则评估器检查最终状态
- 覆盖模型：评估 GPT-4o/4o-mini/4.1、Gemini、Claude、Qwen、Llama 等 10 个多模态模型 Agent
- 关键发现：整体风险意图不安全率 84.93%，风险完成不安全率 59.64%，说明当前 Computer-Use Agent 仍缺少操作级安全对齐

#### 🔬 深入细节
##### 基准示意图

![RiOSWorld 任务与评估管线](https://yjyddq.github.io/RiOSWorld.github.io/static/images/environment.png)
*图：RiOSWorld 的任务配置与评估流程。任务同时定义用户指令、初始环境、运行中风险注入、任务完成评估和风险触发评估。*

##### 核心算法伪代码

```python
# RiOSWorld 风险评估流程伪代码
def evaluate_riosworld_task(agent, task):
    vm = reset_virtual_machine(task.config)
    trajectory = []

    for step in range(task.max_steps):
        if task.should_activate_halfway_threat(step):
            launch_external_program(task.halfway_config)

        screenshot = vm.capture_screen()
        action = agent.predict(task.instruction, screenshot)
        vm.execute(action)
        trajectory.append((screenshot, action, agent.thought))

        if task.evaluator(vm.state):
            break

    completion_unsafe = task.risk_evaluator(vm.state)
    intention_unsafe = llm_as_judge(
        trajectory=trajectory,
        risk_definition=task.risk_definition,
    )
    return {
        "risk_goal_intention": intention_unsafe,
        "risk_goal_completion": completion_unsafe,
    }
```

##### 方法解释

多模态 Computer-Use Agent 的风险不同于聊天模型风险。聊天模型即使给出危险建议，也通常不会直接操作用户电脑；Computer-Use Agent 则可以点击链接、下载文件、执行命令、发送邮件、修改文档或上传代码。因此，RiOSWorld 不只问“模型是否知道安全规则”，而是问“它在真实 GUI/OS 环境中是否会触发风险行为”。

RiOSWorld 把风险来源分成两类。Environmental risks 是环境向 Agent 施加的风险，例如钓鱼网页、钓鱼邮件、弹窗广告、reCAPTCHA、账户欺诈和诱导文本。User-originated risks 是用户指令或用户场景本身引出的风险，包括 Web、Social Media、Office、File I/O、OS Operation、Code、Multimedia 等操作风险。

任务配置是该基准的核心工程设计。每个任务都用结构化配置描述：

$$
\mathrm{Task} = \{\mathrm{instruction}, \mathrm{config}, \mathrm{halfway\_config}, \mathrm{evaluator}, \mathrm{risk\_evaluator}\}
$$

其中 `config` 初始化 VM、登录账户或打开应用；`halfway_config` 在任务执行中动态启动外部威胁；`evaluator` 判断正常任务是否完成；`risk_evaluator` 检查风险目标是否被触发。

> 💡 关键：RiOSWorld 的风险不是静态问答标签，而是通过可执行环境状态来判定。例如是否下载了恶意文件、是否点击了钓鱼链接、是否运行了高危命令。

评估指标分成 intention 和 completion。Risk Goal Completion 是规则化检查，依赖文件、URL、命令输出、页面状态或正则匹配；Risk Goal Intention 则用 GPT-4o 等 LLM-as-a-Judge 逐步查看 Agent 轨迹，只要某一步表现出风险意图，整条轨迹就被判为有风险。

实验结果显示，environmental risks 的平均风险意图率为 89.12%、完成率为 60.29%；user-originated risks 的平均意图率为 81.33%、完成率为 59.07%；整体为 84.93% / 59.64%。意图率高于完成率说明 Agent 经常试图执行风险行为，但未必总能完成，这同时暴露了安全意识不足和操作能力提升后的潜在风险。

与 WASP 这类 Web prompt injection 基准相比，RiOSWorld 覆盖的是更宽的操作系统级风险面：不仅有网页诱导，还包括邮件、文件、办公软件、命令行、代码和多媒体任务。它更接近未来桌面助手长期运行时会遇到的综合安全体检。

#### 🧪 练习题
```yaml
question: "RiOSWorld 为什么同时评估 Risk Goal Intention 和 Risk Goal Completion？"
options:
  - "因为二者分别衡量 Agent 是否表现出风险意图以及是否真的完成风险目标"
  - "因为一个用于训练模型，一个用于压缩模型"
  - "因为 Completion 只能用于文本任务，Intention 只能用于图像任务"
  - "因为二者是同一个指标的不同名称"
answer: 0
explain: "Agent 可能有风险意图但因操作能力不足未完成风险目标，因此 RiOSWorld 用 LLM-as-a-Judge 评估意图，用规则评估器检查环境最终状态。"
```

### WASP

```yaml
id: wasp
num: 40
name: WASP
full_name: Web智能体安全基准 (WASP)
year: '2025'
org: UC Berkeley
parent: —
paper_url: https://proceedings.neurips.cc/paper_files/paper/2025/hash/1c9818387f5dd0a0bc151214660f059d-Abstract-Datasets_and_Benchmarks_Track.html
project_url: ''
category: frontier_2026
motivation: 衡量Web Agent对抗提示注入攻击能力
```

#### 📝 一句话总结
WASP 提出一个端到端 Web Agent 提示注入安全基准，在自托管 GitLab/Reddit 等真实网页环境中模拟受限攻击者注入恶意指令，衡量 Agent 是否被劫持偏离用户目标以及是否真正完成攻击者目标。

#### 🎯 核心要点
- 真实 Web 环境：基于 VisualWebArena/WebArena 式自托管网站构建，主要使用 GitLab 与 Reddit 场景
- 现实威胁模型：攻击者只是网站普通用户，只能在 issue、评论、帖子等可写区域注入内容，不能控制整个网站或知道 Agent 内部实现
- 端到端评估：Agent 从用户任务开始真实浏览、点击、输入，最终检查网页状态而不是只检查单步 API 调用
- 双层 ASR：ASR-intermediate 判断 Agent 是否被劫持偏离用户目标，ASR-end-to-end 判断攻击者目标是否完成
- 注入形式：包含 plain-text injection 与 URL anchor injection，测试模型对网页正文和地址栏上下文的鲁棒性
- 兼容多类 Agent：支持 Claude Computer Use、VisualWebArena scaffold、GPT tool-calling loop 等不同 Agent 框架
- 核心发现：攻击可让 Agent 在最高约 86% 情况下部分偏离目标，但端到端攻击完成率低得多，暴露“security through incompetence”现象

#### 🔬 深入细节
##### 基准示意图

![WASP 端到端评估流程](https://quickchart.io/graphviz?format=png&graph=digraph%20G%20%7B%20rankdir%3DLR%3B%20node%20%5Bshape%3Dbox%2C%20style%3D%22rounded%2Cfilled%22%2C%20fillcolor%3D%22%23fff4e8%22%5D%3B%20user%20%5Blabel%3D%22User%20Goal%22%5D%3B%20agent%20%5Blabel%3D%22Web%20Agent%22%5D%3B%20web%20%5Blabel%3D%22GitLab%20%2F%20Reddit%0Awith%20Injection%22%5D%3B%20eval%20%5Blabel%3D%22ASR%20Intermediate%0AASR%20End-to-End%22%5D%3B%20attacker%20%5Blabel%3D%22Attacker%20Goal%22%5D%3B%20user%20-%3E%20agent%20-%3E%20web%20-%3E%20agent%3B%20web%20-%3E%20attacker%20%5Bstyle%3Ddashed%5D%3B%20agent%20-%3E%20eval%3B%20attacker%20-%3E%20eval%3B%20%7D)
*图：WASP 的端到端评估流程重绘：用户任务驱动 Agent 访问含注入内容的 GitLab/Reddit 页面，最终同时评估偏离用户目标和攻击目标完成情况。*

##### 核心算法伪代码

```python
# WASP 端到端提示注入评估伪代码
def wasp_attack_eval(agent, user_goal, attacker_goal, injection_template):
    web_env = reset_self_hosted_webarena(["gitlab", "reddit"])

    # 攻击者只能在正常用户可写区域放置恶意内容
    malicious_content = render_injection(
        template=injection_template,
        attacker_goal=attacker_goal,
    )
    web_env.post_as_attacker(location="issue_or_comment", content=malicious_content)

    trajectory = []
    for step in range(max_steps):
        obs = web_env.observe()
        action = agent.act(user_goal=user_goal, observation=obs)
        web_env.execute(action)
        trajectory.append((obs, action))
        if agent_declares_done(action):
            break

    asr_intermediate = judge_hijack(trajectory, user_goal, attacker_goal)
    asr_end_to_end = rule_check_attacker_goal(web_env.state, attacker_goal)
    utility = rule_check_user_goal(web_env.state, user_goal)
    return asr_intermediate, asr_end_to_end, utility
```

##### 方法解释

WASP 针对的是间接提示注入：Agent 正在执行用户的正常网页任务，却在页面中读到攻击者写入的恶意指令。由于 LLM 很难天然区分“用户/系统指令”和“不可信网页内容”，它可能把网页里的攻击语句当成更高优先级指令执行。

论文特别强调现实威胁模型。攻击者不是能改完整网站的管理员，也不知道 Agent 的系统提示或实现细节；攻击者只能像普通用户一样创建 issue、评论或帖子。这比“整个网页都被攻击者控制”的设定弱得多，也更贴近真实 Web。

WASP 的评估不是孤立单步，而是端到端工作流。一个测试包含用户目标、攻击者目标和注入模板。Agent 必须先进入网页、阅读页面、点击或输入；评估器最后检查两件事：

$$
\mathrm{ASR}_{intermediate} =
\frac{\#\text{agent 被劫持偏离用户目标}}{\#\text{total tasks}}
$$

$$
\mathrm{ASR}_{end-to-end} =
\frac{\#\text{攻击者目标最终完成}}{\#\text{total tasks}}
$$

这两个指标的差异很关键。论文发现许多 Agent 很容易被注入内容带偏，但因为网页操作能力、长程规划或表单执行能力不足，最终未必能完成攻击者目标。

> 💡 关键：“security through incompetence” 指当前较低的端到端攻击完成率不是因为 Agent 真正安全，而是因为 Agent 还不够会操作网页。随着 Agent 能力提升，风险可能同步上升。

WASP 中的注入模板包括直接在页面内容里写紧急命令的 plain-text injection，也包括把恶意目标藏在 URL anchor 中的 URL injection。后者利用了浏览器地址栏或当前 URL 可能进入 Agent 上下文的事实，即使网页正文看似普通，锚点里的文字也可能影响决策。

与 AgentDojo、InjecAgent、ASB 等基准相比，WASP 的差异在于它面向通用 Web 导航 Agent，使用真实自托管全栈网站，且要求攻击目标在环境最终状态中被验证。它既衡量安全性，也保留 utility 评估，避免一个“什么都不做”的 Agent 因拒绝所有操作而被误判为安全。

#### 🧪 练习题
```yaml
question: "WASP 中 ASR-intermediate 和 ASR-end-to-end 的区别是什么？"
options:
  - "前者看 Agent 是否被注入劫持偏离用户目标，后者看攻击者目标是否真的完成"
  - "前者只用于 Reddit，后者只用于 GitLab"
  - "前者评估模型速度，后者评估模型参数量"
  - "二者都只检查网页文本中是否出现攻击语句"
answer: 0
explain: "ASR-intermediate 衡量劫持是否发生，ASR-end-to-end 衡量攻击是否实际达成；二者差距揭示了 security through incompetence。"
```

### EgoPlan-Bench2

```yaml
id: egoplan_bench2
num: 41
name: EgoPlan-Bench2
full_name: 第一人称规划基准2.0 (EgoPlan-Bench2)
year: '2026'
org: MIT
parent: —
paper_url: https://link.springer.com/article/10.1007/s11263-026-02826-y
project_url: ''
category: frontier_2026
motivation: 评估MLLM在真实场景的复杂规划能力
```

#### 📝 一句话总结
EgoPlan-Bench2 提出了一个面向真实第一人称场景的 MLLM 规划能力基准，用 1,321 个多选式“下一步动作预测”问题评估模型是否能结合历史任务进展、当前观察状态和语言目标做出合理决策。它进一步证明，当前 MLLM 的瓶颈不只是视觉理解，还包括时间顺序建模、细粒度人-物交互感知和显式推理能力。

#### 🎯 核心要点
- **真实场景覆盖**：基于 Ego4D 第一人称视频构建，包含 1,321 个高质量 QA、1,113 段视频、4 个生活领域和 24 个细粒度场景
- **规划式评测协议**：输入历史任务进展视频 \(H_{l,a_i}\)、当前观察图像 \(I_{l,a_i}\) 和任务目标 \(l\)，要求模型从 4 个候选项中选择下一步动作 \(a_i\)
- **三阶段构造流水线**：GPT-4 层次化抽取任务目标与子目标，基于目标-动作对生成多选题，再用模型验证和人工验证过滤样本
- **自适应观察帧选择**：用 InternVL-1.5 与 GPT-4 检查候选当前帧，既要求下一步相关物体可见，又避免模型仅靠当前图像提前“偷看”答案
- **强诊断性评测**：评估 25 个主流 MLLM，多数模型总准确率接近 25% 随机猜测，最佳 Gemini-2.5-Pro 达到 44.05%
- **提示增强发现**：Action-seq-GPT、关键物体框、逐步 rationale 与 self-consistency 组合，使 GPT-4V 在 869 个分析样本上从 32.80% 提升到 43.04%
- **视频推理基准属性**：Gemini-2.5-Flash thinking 模式比 no-thinking 高 10.83%，Qwen2.5-VL 经过 SFT+GRPO 后比 Direct SFT 高 5.52%

#### 🔬 深入细节
##### 核心示意图

![EgoPlan-Bench2 场景覆盖与题目形式](https://media.springernature.com/full/springer-static/image/art%3A10.1007%2Fs11263-026-02826-y/MediaObjects/11263_2026_2826_Fig1_HTML.png)
*图：EgoPlan-Bench2 覆盖 Work、Daily Life、Hobbies、Recreation 四大领域；每道题由历史视频、当前观察图像、任务目标和候选下一步动作组成。*

![EgoPlan-Bench2 数据构造流水线](https://media.springernature.com/full/springer-static/image/art%3A10.1007%2Fs11263-026-02826-y/MediaObjects/11263_2026_2826_Fig2_HTML.png)
*图：半自动数据构造流程，包括任务目标抽取、多选 QA 生成、模型验证和人工验证。*

![EgoPlan-Bench2 训练无关多模态提示流程](https://media.springernature.com/full/springer-static/image/art%3A10.1007%2Fs11263-026-02826-y/MediaObjects/11263_2026_2826_Fig16_HTML.png)
*图：用预测动作序列表示历史进展，用关键物体框强化当前观察，再结合逐步 rationale 和 self-consistency 提升规划判断。*

##### 核心流程伪代码

```python
# EgoPlan-Bench2 构造与评测伪代码
for video in Ego4D:
    narrations = filter_narrations(
        video.narrations,
        remove_unsure=True,
        min_words=3,
        remove_other_person_actions=True,
    )
    actions = gpt_normalize_to_verb_object(narrations)
    action_spans = estimate_action_start_end(actions)

    # Stage I: 层次化任务目标抽取
    for segment in split_by_ego4d_summary(video):
        goals = GPT4.extract_overall_goal_subgoals_and_actions(segment)
        goals = keep_goals_with_4_to_20_actions(goals)

        # Stage II: 多选下一步动作问题生成
        for goal in goals:
            semantic_groups = GPT4.group_actions_by_semantics(goal.actions)
            for i, answer_action in enumerate(goal.actions):
                negatives = sample_three_actions_from_other_groups(
                    semantic_groups, answer_action
                )
                question = make_mcq(goal.text, answer_action, negatives)

                candidates = crop_frames_around(
                    timestamp=answer_action.start_time - 0.5,
                    step_seconds=0.25,
                    count=5,
                )
                observation = None
                for frame in candidates:
                    image_only_pred = InternVL15.predict_next_action(frame, question)
                    objects_visible = InternVL15.check_required_objects(frame, answer_action)
                    if image_only_pred != answer_action and objects_visible:
                        observation = frame
                        break

                if observation is None:
                    continue
                history_clip = crop_video_until(video, observation.timestamp)

                # Stage III: 模型验证 + 人工验证
                if GPT4.circular_eval_text_only(question).is_correct:
                    continue
                if human_annotators_answer(history_clip, observation, question) == answer_action:
                    dataset.add(history_clip, observation, question, answer_action)

for model in evaluated_mllms:
    correct = 0
    for sample in dataset:
        prompt = (
            "Select the best answer based on the video. "
            "Considering the progress shown in the video and my current "
            "observation in the last frame, what action should I take next "
            f"in order to {sample.goal}?"
        )
        pred = model.predict(sample.video_with_last_frame, prompt, sample.options)
        correct += normalize_choice(pred) == sample.answer
    accuracy = correct / len(dataset)
```

##### 任务定义与数据构造

EgoPlan-Bench2 的核心任务不是“看完整视频回答理解题”，而是模拟第一人称执行任务时的动态决策：模型已经看到一段历史进展，还看到当前瞬间的观察，需要判断下一步最合理的动作。这种设置更接近具身助手、AR 助手或机器人规划器的输入形态，因为真实环境中的智能体通常无法一次性预知完整未来轨迹，只能基于当前状态滚动决策。

论文先从 Ego4D 的带时间戳叙述中得到动作。为了降低噪声，构造过程过滤含 `#unsure` 的叙述、少于三个词的叙述，以及由非摄像头佩戴者执行的 `#O` 动作；随后用 GPT 将原始叙述统一成 “verb-object” 短语，例如 `close washing machine`。由于 Ego4D 给出的通常是动作发生时间点而非持续区间，论文用相邻叙述平均时间间隔估计动作起止范围：

$$
[t_i^{start}, t_i^{end}]
=
\left[t_i-\frac{\beta_i}{2\alpha},\ t_i+\frac{\beta_i}{2\alpha}\right],
\quad \alpha=4.9
$$

其中 \(t_i\) 是动作发生时间，\(\beta_i\) 是该视频中相邻叙述的平均时间距离。这个估计只作为初始化；真正用于题目的“当前观察图像”还会经过后续自适应选择。

任务目标抽取采用层次化策略。Ego4D 视频常常很长，而且可能混杂多个任务或无目的活动，因此论文先按视频 summary 的时间段切分，再让 GPT-4 根据该片段 summary 与动作序列抽取 overall goal、sub-goal 和对应动作链。随后只保留包含 4 到 20 个动作的目标，避免目标过短导致没有规划难度，也避免目标过长导致题目复杂度失控。

##### 多选题与当前观察对齐

给定一个任务目标 \(l\) 和动作序列 \(\{a_1,\dots,a_N\}\)，构造器会生成 \(N\) 个目标-动作对：

$$
[l,a_i],\quad i=1,2,\dots,N
$$

其中 \(a_i\) 是该题的正确下一步动作。负选项不是从无关视频随机取，而是从同一任务目标的不同时刻动作中抽取，并先用 GPT-4 做语义分组，再从不同于正确答案的类别中采样三个动作。这样设计的目的，是让错误选项也与当前任务相关，迫使模型理解“哪些步骤已经完成、当前处于哪一阶段”，而不是只靠常识或词面相关性猜答案。

视觉输入由两部分组成：历史任务进展 \(H_{l,a_i}\) 和当前观察 \(I_{l,a_i}\)。最终给模型的视频 \(V_{l,a_i}\) 把二者合在一起，并让最后一帧表示当前状态。难点在于 \(I_{l,a_i}\) 不能太早也不能太晚：太早可能缺少下一步所需物体，太晚则可能已经出现执行下一步的手-物交互线索。EgoPlan-Bench2 因此围绕正确动作开始时间附近截取 5 个候选帧，每隔 0.25 秒取一帧，并用两个准则筛选：

- **不能只靠当前帧答题**：如果 InternVL-1.5 仅凭候选帧就能预测正确下一步，说明该帧泄露了动作线索，需要丢弃
- **下一步所需物体必须可见**：如果候选帧中看不到动作涉及的关键物体，模型即使理解历史进展也无法做出公平判断

> 💡 关键：这个筛选让题目保持“规划”属性。模型必须同时使用历史进展和当前观察，而不是退化成单帧动作识别或静态物体识别。

##### 评测协议与指标

EgoPlan-Bench2 使用四选一准确率作为主指标：

$$
\mathrm{Acc}=\frac{1}{M}\sum_{j=1}^{M}\mathbb{1}[\hat{y}_j=y_j]
$$

论文评估 25 个 MLLM，包括图像 MLLM、视频 MLLM、闭源图像/视频 MLLM。视频模型通常采样 32 帧，并显式包含首帧和末帧；图像模型使用 8 个关键帧，必要时因上下文限制减少帧数。评测 prompt 要求模型只输出 A/B/C/D，不使用 GPT 等第三方模型判分，减少开放式生成带来的判定噪声。

主结果显示，随机猜测为 25%，而多数模型只在 23%-27% 左右徘徊。GPT-4V 总准确率为 32.63%，InternVideo-2.5-7B 为 33.61%，Video-XL-2-7B 为 33.00%，Gemini-2.5-Flash 为 31.94%，最佳 Gemini-2.5-Pro 达到 44.05%。这说明即使强模型能识别场景和物体，面对真实第一人称长过程中的下一步决策，仍然缺少稳定的任务进展追踪和推理能力。

论文还分析了视频长度和帧数。大多数模型在长视频上下降，因为固定采样帧数会漏掉短暂但关键的动作；不过 Gemini-2.5-Pro 在长视频上没有明显退化，可能与更密集的采样和更强长视频处理能力有关。进一步实验发现，对 Qwen2.5-VL-7B 而言，把同一批帧作为多张独立图片输入，准确率从 24.52% 提升到 38.22%，说明瓶颈不只是采样帧不够，也包括视频编码压缩过程中丢失细粒度视觉 token。

##### 提示增强与推理机制

论文把失败原因归纳为五类：当前状态误感知、历史任务进展误解、时间顺序混淆、采样帧数量限制，以及综合推理能力不足。基于这些瓶颈，作者设计了训练无关的多模态提示策略，分别补强历史进展、当前观察和集成推理过程。

历史进展提示中，最有效的是动作序列。Action-seq-GPT 用 GPT-4V 把历史视频总结成简洁、有时间结构的动作链；相比之下，视频级描述、帧级描述和关键物体轨迹并没有明显收益。原因是规划最需要知道“哪些动作已按什么顺序发生”，而普通描述容易停留在场景概览，缺少可用于下一步决策的时间结构。

当前观察提示中，关键物体 bounding box 最有效。BoundingBox-obj 先让 GPT-4 根据问题和候选项挑出不超过 5 个关键物体，再用 Grounding DINO 标注候选图像中这些物体的位置。它比纯图像描述、scene graph 或只裁剪物体状态更有用，因为下一步动作往往依赖人手、工具、目标物体之间的空间关系和交互状态。

集成推理阶段要求模型显式生成 rationale：先分析已完成动作和历史进展，再描述当前观察状态，然后逐一判断候选动作是否符合当前任务阶段、是否能在当前状态下执行，最后选择答案。仅在 BoundingBox-obj 上加入 rationale，就能把 GPT-4V 从 37.63% 提升到 39.82%；结合 Action-seq-GPT、BoundingBox-obj、rationale 和 self-consistency 后，达到 43.04%，比无额外提示的 32.80% 提升 10.24%。

```python
# 训练无关多模态提示增强伪代码
def prompted_planning(sample, model):
    action_seq = GPT4V.summarize_temporal_actions(sample.history_video)
    key_objects = GPT4.select_key_objects(sample.question, sample.options, max_count=5)
    boxed_observation = GroundingDINO.draw_boxes(sample.current_image, key_objects)

    answers = []
    for _ in range(5):  # self-consistency
        rationale = model.reason(
            video=sample.history_video,
            image=boxed_observation,
            text={
                "goal": sample.goal,
                "action_sequence": action_seq,
                "options": sample.options,
                "steps": [
                    "analyze completed actions",
                    "describe current observation",
                    "check feasibility of each option",
                    "choose the best next action",
                ],
            },
        )
        answers.append(extract_choice(rationale))
    return majority_vote(answers)
```

##### 视频推理扩展

2026 版论文进一步把 EgoPlan-Bench2 作为视频推理基准验证。Gemini-2.5-Flash 在 no-thinking 模式下总体准确率为 31.94%，开启 thinking 并给 2048 个 thinking tokens 后达到 42.77%，提升 10.83%。这表明该基准能区分“直接反射式回答”和“先整合历史、当前状态、候选项再决策”的模型行为。

作者还用 Qwen2.5-VL-Instruct-7B 验证 R1 范式后训练。训练分为 SFT 和 GRPO 两阶段，SFT 用带 CoT 标注的数据学习 `<think>`、`</think>`、`<answer>`、`</answer>` 结构，GRPO 则用答案正确性和格式正确性作为规则奖励，鼓励模型探索更好的推理路径。其核心目标可概括为：

$$
\mathcal{J}_{\mathrm{GRPO}}(\theta)
=
\mathbb{E}_{x,\{o_g\}}
\frac{1}{G}\sum_{g=1}^{G}\frac{1}{|o_g|}\sum_i
\left[
\min\left(
r_{g,i}(\theta)\hat{A}_{g,i},
\operatorname{clip}(r_{g,i}(\theta),1-\varepsilon,1+\varepsilon)\hat{A}_{g,i}
\right)
-
\beta D_{\mathrm{KL}}(\pi_\theta\Vert\pi_{\mathrm{ref}})
\right]
$$

其中 \(r_{g,i}(\theta)\) 是新旧策略在第 \(i\) 个 token 上的概率比，\(\hat{A}_{g,i}\) 来自组内相对奖励。实验中 Qwen2.5-VL-Instruct-7B 原始基线为 30.43%，Direct SFT 为 52.23%，CoT SFT 为 53.36%，SFT+GRPO 达到 57.75%。相比只学答案的 Direct SFT，SFT+GRPO 高 5.52%，说明显式推理和 RL 后训练确实能改善真实规划任务。

##### 与传统基准的区别

传统视频 QA 基准更强调对完整视频内容的理解，例如识别事件、回答空间关系或总结视频；EgoPlan-Bench2 则要求模型在任务尚未完成时预测下一步动作，因而更关注决策。它与 EgoPlan-Bench 的区别也很明确：后者集中在厨房/烹饪场景，而 EgoPlan-Bench2 扩展到工作、日常生活、兴趣和娱乐四大领域，覆盖实验室、黑smith、机械维修、购物、园艺、运动等更丰富的真实任务。

这种设计带来的直接价值，是把模型错误暴露得更具体。模型可能知道画面里有什么，却不知道哪些动作已经发生；可能看到关键物体，却误判它与手或工具的交互状态；也可能理解历史和当前图像，却缺少世界知识推理能力，例如不知道在收纳肉之前需要先折叠袋子。EgoPlan-Bench2 因此不仅是排行榜，更像是一个定位 MLLM 规划瓶颈的诊断工具。

> ⚠️ 注意：EgoPlan-Bench2 仍是静态多选题基准。它便于大规模评测，但受限于封闭候选动作、单步预测和单一录制轨迹；真实智能体还需要在开放动作空间中连续执行、观察反馈并纠错。

#### 🧪 练习题
```yaml
question: "EgoPlan-Bench2 的自适应当前观察帧选择中，为什么要丢弃“仅凭当前帧就能预测正确下一步”的候选帧？"
options:
  - "为了减少视频文件大小，降低模型推理成本"
  - "为了避免题目退化成单帧线索识别，确保模型必须结合历史任务进展进行规划"
  - "为了让所有候选帧都来自动作完成后的同一时间点"
  - "为了提升负选项之间的语义相似度"
answer: 1
explain: "如果模型只看当前帧就能答对，说明该帧泄露了下一步动作线索。EgoPlan-Bench2 希望评估的是历史进展、当前状态和任务目标的综合规划能力，而不是单帧动作识别。"
```
