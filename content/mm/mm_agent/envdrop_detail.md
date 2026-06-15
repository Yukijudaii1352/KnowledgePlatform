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
EnvDrop 在 Speaker-Follower 的回译增强上加入“按环境语义一致丢弃视觉特征”的扰动，让导航器在训练时反复看到被部分移除的环境线索，从而提升未见房屋泛化。

#### 🎯 核心要点
- **目标问题**：R2R seen/unseen 差距大，单纯在训练环境中回译生成新路线-指令对，仍然不能制造真正的新视觉环境。
- **两阶段训练**：第一阶段用 imitation learning 与 reinforcement learning 混合训练导航器；第二阶段使用 speaker 回译生成新 triplet，并在环境丢弃后的视觉输入上继续训练。
- **环境丢弃不是普通 dropout**：它不是独立随机清零每个激活，而是在同一环境中共享 mask，尽量模拟“某类视觉/语义线索在新环境中不存在”的情况。
- **保留几何方向信息**：EnvDrop 主要扰动图像特征，不破坏 heading/elevation 等方向特征，避免把导航图几何也变成噪声。
- **贡献位置**：它把 VLN 数据增强从“语言和路径组合更多”推进到“视觉环境分布更丰富”，成为 PREVALENT 等预训练方法前的重要泛化增强基线。

#### 🔬 深入细节
论文：*Learning to Navigate Unseen Environments: Back Translation with Environmental Dropout*。核心图 Figure 2 展示了监督/RL 混合训练与使用回译和环境丢弃的半监督阶段，公开图源：https://ar5iv.labs.arxiv.org/html/1904.04195/assets/x2.png

EnvDrop 沿用全景 VLN 设置：每个位置有 36 个离散视角，导航器在可通行候选方向中选择下一步。第一阶段用人工标注路径训练基础 agent。IL 分支沿专家最短路径 teacher forcing，最小化
\[
\mathcal{L}^{\mathrm{IL}}=-\sum_t \log p_t(a_t^\star).
\]
RL 分支使用 A2C 风格采样策略，终点到达目标半径内给正奖励，失败给负奖励，中间步奖励由到目标距离变化塑形。混合目标通常写成
\[
\mathcal{L}^{\mathrm{MIX}}=\mathcal{L}^{\mathrm{RL}}+\lambda_{\mathrm{IL}}\mathcal{L}^{\mathrm{IL}}.
\]

第二阶段引入回译。先训练一个 speaker \(P_{\mathbf{E},\mathbf{R}\rightarrow\mathbf{I}}\)，给定环境 \(\mathbf{E}\) 和路线 \(\mathbf{R}\) 生成指令 \(\mathbf{I}\)。然后在训练环境中采样新路线 \(\mathbf{R}'\)，由 speaker 生成 \(\mathbf{I}'\)，得到伪标注 triplet \((\mathbf{E}',\mathbf{R}',\mathbf{I}')\)。这继承了 Speaker-Follower 的优势，但 EnvDrop 进一步将 \(\mathbf{E}'\) 做成“被扰动的环境”。

环境丢弃的核心是对视觉特征施加环境级 mask：
\[
f'_{t,i}=f_{t,i}\odot \xi^{\mathbf{E}},\qquad
\xi^{\mathbf{E}}_e\sim \frac{1}{1-p}\mathrm{Ber}(1-p).
\]
这里 \(f_{t,i}\) 是某位置第 \(i\) 个 view 的图像特征，\(\xi^{\mathbf{E}}\) 是在同一环境或同一类特征维度上共享的随机 mask。共享 mask 比逐元素 dropout 更重要，因为它维持了空间一致性：如果“椅子相关”的视觉维度被移除，就应当在多个视角中一起变弱，而不是在每张图上独立闪烁。

这种扰动迫使导航器少依赖训练房屋中特定物体或纹理的偶然相关性。例如训练集中“走到沙发旁左转”可能总与某种颜色/布局共现，普通回译会强化这种偏差；EnvDrop 则让 agent 在沙发、墙面、局部纹理等线索被部分移除时仍要根据指令顺序、方位和剩余地标决策。因为方向特征不被破坏，模型仍可学习稳定的几何导航。

```text
Algorithm: EnvDrop training
Input: human data D, train environments E, dropout rate p
1. Train navigator with mixed IL/RL on D.
2. Train speaker on route-instruction pairs.
3. For each sampled route R' in a train environment:
   a. Sample an environment-level visual mask xi^E.
   b. Apply the mask to image features, keep orientation features.
   c. Use speaker to generate instruction I' for route R'.
   d. Add (masked environment E', route R', instruction I') to augmented data.
4. Continue training navigator on human and augmented triplets with IL/RL.
5. Evaluate without dropout in seen and unseen environments.
```

EnvDrop 的实质不是追求更强的噪声正则化，而是把 dropout 的单位从神经元提升到环境语义线索。它对未见环境特别有效，是因为测试时房屋的物体组合、纹理和布局会变化；训练时主动制造这些变化，可以让策略更依赖指令-几何对齐，而不是训练环境的捷径。

#### 🧪 练习题
1. 为什么对方向特征做 dropout 可能伤害导航学习？请和图像语义特征 dropout 对比。
2. 如果把环境 mask 改成每个视角独立采样，模型可能学到什么不合理的鲁棒性？
