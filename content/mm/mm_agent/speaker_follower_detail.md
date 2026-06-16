### Speaker-Follower
```yaml
id: speaker_follower
name: Speaker-Follower
full_name: 说话者-跟随者模型 (Speaker-Follower)
year: '2018'
org: Georgia Tech
paper_url: https://arxiv.org/abs/1806.02724
category: vln
parent: —
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
