### Long-VLA

```yaml
id: long_vla
name: Long-VLA
full_name: 长程视觉语言动作 (Long-VLA)
year: '2025.08'
org: Westlake University / Zhejiang University / Xi'an Jiaotong University / UESTC / BUAA
paper_url: https://arxiv.org/abs/2508.19958
category: transformer_policy
parent: openvla
motivation: 相位感知输入掩码解决长程任务
```

#### 📝 一句话总结
Long-VLA 提出了首个专门面向长时程机器人操作的端到端 VLA，通过把每个子任务拆成移动阶段与交互阶段，并在注意力层引入相位感知输入掩码，缓解长链任务中的技能串联失败和视觉关注错位问题。

#### 🎯 核心要点
- 提出 **Long-VLA**：首个明确针对 long-horizon manipulation 设计的端到端 VLA
- 把每个子任务分解为 **Moving Phase** 和 **Interaction Phase**，并在统一模型里联合学习
- 在原始 7 维动作上增加相位标识 \(s_p\)，形成 8 维动作表示
- 提出 **Phase-Aware Masking**：不改输入 token 结构，只在自注意力里按阶段屏蔽不相关视觉 token
- 使用 **Grounding DINO + LoRA + FiLM** 把检测框信息注入静态视角特征，增强目标定位
- 使用 **GPT-2 风格多模态 Transformer + 条件扩散动作解码器** 生成动作
- 训练目标由 **扩散损失** 与 **语言-视觉目标对齐损失** 组成
- 构建 **L-CALVIN** 基准，把 CALVIN 的任务链长度从 5 步扩展到 10 步
- 在 L-CALVIN 上，10 步任务成功率从基线 **0.11** 提升到 **0.20**，在 ABCD->D 设置下从 **0.45** 提升到 **0.56**

#### 🔬 深入细节
##### 核心总览图

![Long-VLA 总览图](https://long-vla.github.io/long-vla/teaser_01.png)
*图：Long-VLA 项目页总览图。左侧对比了统一短程 VLA、两阶段模型和带输入自适应的长程模型；右侧给出了 Long-VLA 在长链任务上的总体收益。*

##### 真实世界平台

![Long-VLA 真实世界设置](https://long-vla.github.io/long-vla/real_setup.png)
*图：真实机器人实验平台。论文用排序与清洁两类多步任务验证 Long-VLA 在未见光照和视觉干扰下的鲁棒性。*

##### 核心伪代码

```python
# Long-VLA: decomposition + phase-aware masking + diffusion policy

for trajectory in dataset:
    segments = decompose_into_moving_and_interaction(trajectory)

    for step in segments:
        if step.phase == "moving":
            sp = -1
            mask = keep(static_camera_tokens) & drop(gripper_camera_tokens)
        else:
            sp = 1
            mask = keep(gripper_camera_tokens) & sparsify(static_camera_tokens)

        action = concat(step.ee_pose, step.gripper_state, sp)
        obs_feat = resnet18_static(step.static_image)
        grip_feat = resnet18_gripper(step.gripper_image)
        goal_feat = clip_goal_encoder(step.goal)
        det_feat = film(grounding_dino(step.language_query), obs_feat)

        fused = transformer([obs_feat, grip_feat, goal_feat, det_feat], attn_mask=mask)
        loss_diff = diffusion_loss(fused, action)
        loss_goal = info_nce(goal_feat, fused)
        update(loss_diff + 0.1 * loss_goal)
```

##### 动机：为什么短程 VLA 到了长链任务会明显掉点

Long-VLA 的切入点很直接。现有 VLA 在单步或短序列操作上已经有效，但一旦任务从“抓一次、放一次”变成连续多步技能链，策略误差会沿时间累积，而且每个子任务之间还有明显的依赖关系。论文把这种问题概括为 **skill chaining**：前一阶段稍微偏一点，后续阶段就会建立在错误状态上继续执行，最终导致整条任务链崩掉。

作者先做了一个很关键的预实验。他们把 CALVIN 子任务显式拆成单独的移动策略和交互策略后，5 步任务完成率从 MDT 的 `51.1%` 提升到 `54.2%`，而 2 步、3 步任务的提升更明显，分别从 `82.4%` 到 `91.7%`、从 `71.9%` 到 `87.5%`。这说明问题并不只是“模型容量不够”，而是长链任务内部本来就存在两类视觉和控制模式，硬塞进统一无差别表征会让模型学得很别扭。

> 💡 关键：Long-VLA 的核心判断不是“长任务需要更大模型”，而是“长任务里不同阶段依赖不同视觉线索，需要显式引导模型把注意力放到对的地方”。

##### 核心机制一：阶段分解 + 相位动作标识

Long-VLA 先把每个子任务切成两个阶段。**Moving Phase** 负责把机械臂移动到目标附近，主要依赖静态第三人称相机；**Interaction Phase** 负责按按钮、抓取、放置等精细交互，更依赖末端执行器视角。作者把切分点放在物体状态发生变化前的 `10` 到 `15` 帧，使视觉和动作边界尽量和真实操作过程对齐。

为了让统一模型知道当前处于哪种阶段，论文把原本 7 维动作扩展为 8 维：

$$
a_t = [x, y, z, eu_x, eu_y, eu_z, s_g, s_p]
$$

其中 \((x, y, z)\) 是末端执行器平移，\((eu_x, eu_y, eu_z)\) 是欧拉角姿态，\(s_g\) 是夹爪状态，新增的 \(s_p\) 是相位标识。在移动阶段 \(s_p=-1\)，在交互阶段 \(s_p=1\)，推理开始时默认初始化为 \(-1\)。这个改动看起来很小，但它把“阶段信息”直接并入动作空间，使扩散解码器在预测动作时同时预测“我现在应该以哪种模式控制”。

##### 核心机制二：Phase-Aware Masking

Long-VLA 最有辨识度的创新是相位感知输入掩码。它没有像部分分层方法那样切成两个完全独立的策略，也没有粗暴删除某一类视觉输入，而是在 self-attention 里构造二值掩码向量 \(m\)，再得到注意力掩码矩阵：

$$
M_{ij} = m_i m_j
$$

如果当前在移动阶段，就把末端相机 token 设为无效，让模型主要依赖静态视角做导航；如果已经进入交互阶段，就保留末端相机 token，同时对静态相机中的冗余 token 做选择性屏蔽，把更多注意力让给近景精细观测。对缩放点积注意力 \(P = QK^\top / \sqrt{C}\)，论文采用掩码后的归一化形式：

$$
A_{ij} = \frac{\exp(P_{ij}) M_{ij}}{\sum_k \exp(P_{ik}) M_{ik}}
$$

这里最关键的点是：**输入结构没变，变的是信息流**。也就是说 Long-VLA 保留了统一模型的可扩展性，但又用很轻量的方式把不同阶段的视觉关注模式硬性编码进注意力计算。相比完全分成两个网络，这种做法更容易保持数据效率和参数共享。

##### 核心机制三：检测增强、多模态融合与扩散动作解码

Long-VLA 的整体骨架建立在 MDT 风格 VLA 上。观察编码器对静态视角 \(s_b^t\) 和夹爪视角 \(s_g^t\) 分别使用可训练的 **ResNet-18** 得到特征 \(e_b\) 和 \(e_g\)。目标编码器沿用冻结 **CLIP**，既能接语言目标，也能接未来观测图像。为了让模型在移动阶段更可靠地找到目标物体，作者还在 CALVIN 子集上用 **LoRA** 微调了 **Grounding DINO**，把检测框经位置编码后通过 **FiLM** 注入静态相机特征，形成检测增强表示 \(\hat e_b\)。

融合阶段使用 **GPT-2 风格 Transformer**，把多模态表示拼成

$$
e_{\text{pre}} = [\hat e_b; e_g; e_{\text{goal}}; e_d]
$$

再输出后续动作解码所需的上下文表示 \(e_{\text{post}}\)。动作头不是离散 token，而是条件扩散模型。训练时对噪声动作做去噪回归，核心损失写成：

$$
\mathcal{L}_{\text{Diff}} =
\mathbb{E}_{a \sim p_{\text{data}}}
\mathbb{E}_{n \sim \mathcal{N}(0, \sigma^2 I)}
\left\|
D_\theta(\tilde a_t, e_{\text{post}}, \sigma_t) - a_t
\right\|_2^2
$$

此外，论文还加入语言目标和视觉目标之间的对比对齐损失 \(\mathcal{L}_{\text{Goal}}\)，最终总损失为：

$$
\mathcal{L} = \mathcal{L}_{\text{Diff}} + \alpha \mathcal{L}_{\text{Goal}}, \quad \alpha = 0.1
$$

直觉上，这个额外项是为了防止模型只学会“生成看起来平滑的动作”，却忽略语言目标和视觉目标是否真的语义一致。

##### 结果怎么看：它到底解决了什么

论文最重要的实验资产不是某个单独的成功率，而是 **L-CALVIN**。作者把 CALVIN 原本最长 5 步的长链评测扩到 10 步，使 skill chaining 失败在 benchmark 上能被更清楚地放大。在最难的 D->D 设置中，基线 MDT 在 10 步任务上的成功率只有 `0.11`，Long-VLA 提升到 `0.20`，相对提升约 `81%`；在 ABCD->D 泛化设置里，10 步任务从 `0.45` 提升到 `0.56`，相对提升约 `25%`。

这类增益说明 Long-VLA 不是简单把短期精度做高，而是真正在更长时间尺度上减缓了误差积累。真实机器人实验也支持这个结论。论文设计了 **Sorting** 和 **Cleaning** 两个多步任务，并报告在未见光照和视觉干扰条件下仍能保持更稳的表现。对这篇工作最准确的理解是：它没有重新发明一种完全不同的 VLA 架构，而是在现有 VLA 主干上加入阶段感知机制，把“长程任务中的注意力错位”变成一个可以显式建模和优化的问题。

#### 🧪 练习题

```yaml
question: "Long-VLA 中 phase-aware masking 的主要作用是什么？"
options:
  - "在不同阶段只改变注意力可见的视觉 token，使模型把关注点切换到更相关的相机视角"
  - "把所有视觉 token 压缩成更短序列，以彻底消除注意力的二次复杂度"
  - "用两个独立策略网络分别预测移动动作和交互动作，避免共享参数"
  - "把连续动作离散成 token，统一为语言模型式自回归生成"
answer: 0
explain: "Long-VLA 的关键不是拆成两个独立网络，而是在统一模型里通过掩码改变注意力流向。移动阶段偏向静态相机，交互阶段偏向末端相机，从而缓解长程任务中的视觉关注错位。"
```
