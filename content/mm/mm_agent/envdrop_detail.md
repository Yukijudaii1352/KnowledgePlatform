### EnvDrop
```yaml
id: envdrop
name: EnvDrop
full_name: 环境丢弃 (Environmental Dropout)
year: '2019'
org: UNC Chapel Hill
paper_url: https://arxiv.org/abs/1904.04195
category: vln
parent: speaker_follower
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
