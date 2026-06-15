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
Speaker-Follower 把视觉语言导航拆成“跟随指令走路”的 follower 和“给路线生成指令”的 speaker，用 speaker 生成合成数据并在推理时重排候选路径，从数据扩增和语义一致性两端缓解 R2R 标注稀缺。

#### 🎯 核心要点
- **双模型互补**：follower 学习 \(P_F(r\mid d)\)，即给定自然语言指令 \(d\) 预测路线 \(r\)；speaker 学习 \(P_S(d\mid r)\)，即给定路线生成/评估指令。
- **数据扩增是核心收益来源**：先在人工路线-指令对上训练 speaker，再从训练环境中采样新路线并生成合成指令，用合成集与人工集联合训练 follower，最后回到人工集微调。
- **推理时做 pragmatic reasoning**：follower 产生候选路线，speaker 评估“这条路线是否能解释原始指令”，最终选择跟随概率和说话者似然都高的路线。
- **全景动作空间降低探索难度**：将 Matterport 360 度视野离散成 36 个 view，并直接在可通行相邻节点间选择动作，减少低层转向动作造成的长序列误差。
- **历史地位**：它把 VLN 从单纯 seq2seq imitation 推向“生成式数据增强 + 候选路径重排序”，后续 EnvDrop、PREVALENT 等方法都沿用了 speaker 增强或全景动作空间。

#### 🔬 深入细节
论文：*Speaker-Follower Models for Vision-and-Language Navigation*。核心图 Figure 2 展示了 speaker 生成合成指令、follower 学习导航、推理时 speaker 重排路线的整体框架，公开图源：https://ar5iv.labs.arxiv.org/html/1806.02724/assets/x2.png

VLN 任务输入是一条自然语言指令 \(d=(w_1,\dots,w_L)\) 和起点视角，输出是在连通图上的动作/位置序列 \(r=(a_1,\dots,a_T)\)。早期 baseline 直接训练 follower 最大化 \(P_F(r\mid d)\)，但 R2R 只有有限人工指令，模型容易记住训练房屋里的语言-视觉共现而不是学到泛化的地标对齐。Speaker-Follower 的关键假设是：路线和指令互为条件分布，既可以用路线解释语言，也可以用语言解释路线。

follower 是带注意力的序列到序列策略网络。每一步从 36 个全景 view 的 CNN 特征和方向特征中聚合视觉上下文，再与指令编码状态交互，输出可达邻居的动作分布。可将候选动作 \(j\) 的打分写成
\[
y_{t,j}=(W_h h_t)^\top W_u u_{t,j},\qquad
p(a_t=j\mid d,r_{<t})=\frac{\exp(y_{t,j})}{\sum_k \exp(y_{t,k})},
\]
其中 \(h_t\) 是 follower 的解码状态，\(u_{t,j}\) 是第 \(j\) 个可达方向的视觉-方向表示。全景动作空间使动作直接对应导航图边，而不是“转左、抬头、前进”这类低层命令。

speaker 是反向模型 \(P_S(d\mid r)\)。它先编码路线中的视觉观测和动作，再用语言解码器生成指令。训练好以后，speaker 有两个用途：一是为训练环境中采样的新路线生成指令，扩展 \(\mathcal{D}\) 到 \(\mathcal{D}\cup\mathcal{S}\)；二是在测试时对 follower 搜索出的候选路线集合 \(\mathcal{C}(d)\) 做语义一致性打分。这个重排目标可写成
\[
\hat r=\arg\max_{r\in\mathcal{C}(d)}
\left[\log P_F(r\mid d)+\lambda \log P_S(d\mid r)\right].
\]
如果一条路线只是局部看起来可走，但 speaker 无法从这条路线复述出原始指令中的地标和顺序，它会在第二项上被惩罚。

工程上，训练流程不是端到端联合优化，而是分阶段的。先用人工数据训练 speaker，随后生成合成路线说明，训练 follower 时先吸收合成数据的规模优势，再在人工标注上微调校准分布；推理时 follower 用 beam/state-factored search 产生候选路线，speaker 只作为重排器使用。这种分解避免了在线生成带来的不稳定，同时把 speaker 的作用限定在数据扩充和判别式语义检查上。

```text
Algorithm: Speaker-Follower training and inference
Input: human pairs D={(route r, instruction d)}, train environments E
1. Train speaker S to maximize log P_S(d | r) on D.
2. Sample additional valid routes r' from environments E.
3. Generate synthetic instructions d' ~ S(r') and form S_aug={(r', d')}.
4. Train follower F on D union S_aug with teacher forcing.
5. Fine-tune F on human data D.
6. At test time, use F to search candidate routes C(d).
7. Return argmax_r in C(d) log P_F(r | d) + lambda log P_S(d | r).
```

该方法的局限也很清楚：speaker 只能在训练房屋中采样路线并生成语言，因此它增加的是路线-语言组合，而不是真正的新环境分布；合成指令还可能携带 speaker 自身偏差。EnvDrop 后续正是沿着这一问题继续推进，通过对环境视觉特征做结构化丢弃来模拟未见环境。

#### 🧪 练习题
1. 如果去掉推理阶段的 speaker 重排，只保留 speaker 数据增强，你预期哪类错误会增加？请结合“路线可行但与指令地标不一致”的情况说明。
2. 为什么全景动作空间会降低 VLN 的学习难度？它同时可能牺牲哪些低层控制能力？
