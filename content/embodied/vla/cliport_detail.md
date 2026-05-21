### CLIPort

```yaml
id: cliport
name: CLIPort
full_name: 视觉语言操作路径 (CLIPort)
year: '2022'
org: University of Washington / Google Research
paper_url: https://arxiv.org/abs/2109.12098
category: spatial_3d
parent: —
motivation: 融合CLIP语义与Transporter几何精度
```

#### 📝 一句话总结
CLIPort 提出了一种把 CLIP 语义理解和 Transporter Network 像素级几何定位拼接起来的双流操作框架，在语言条件化桌面抓放任务上同时拿到了开放词汇泛化和高精度空间操作能力。

#### 🎯 核心要点
- 提出 **What + Where** 双流架构：语义流负责“抓什么”，空间流负责“去哪里抓/放”
- 语义流复用冻结的 **CLIP ResNet-50** 视觉编码器和 CLIP 文本编码器，保留开放词汇语义能力
- 空间流使用从零训练的 **RGB-D ResNet-FPN**，保留像素级几何细节
- 通过 **lateral connections** 在多尺度上融合两路特征，兼顾语义与空间精度
- 延续 **Transporter** 的 pick-and-place 分解：先预测抓取像素，再通过互相关搜索放置位置与旋转
- 在 Ravens 仿真和真实 UR5e 平台上展示出很强的样本效率，多任务模型还能超过部分单任务专家

#### 🔬 深入细节
##### 核心架构图

![CLIPort 双流架构图](https://cliport.github.io/media/images/two_stream_architecture.png)
*图：CLIPort 的双流结构。上路的语义流回答“what”，下路的空间流回答“where”，最后通过多尺度 lateral fusion 输出像素级 pick/place 热力图。*

##### 核心伪代码

```python
# CLIPort: CLIP semantic stream + spatial stream + Transporter action head

def cliport_step(rgbd, instruction):
    text_feat = clip_text_encoder(instruction)

    # semantic stream
    sem_feat = frozen_clip_visual(rgbd[:, :, :3])
    sem_feat = semantic_decoder(sem_feat)
    sem_feat = sem_feat * tile(text_feat, sem_feat.shape[:2])

    # spatial stream
    spa_feat = spatial_decoder(spatial_encoder(rgbd))

    fused = lateral_fuse(spa_feat, sem_feat)

    q_pick = pick_head(fused)
    pick_uv = argmax2d(q_pick)

    query = crop_query(fused, center=pick_uv)
    q_place = []
    for theta in discrete_rotations(36):
        q_place.append(cross_correlate(rotate(query, theta), place_key(fused)))

    place_uv, place_theta = argmax_pose(stack(q_place))
    return pick_uv, place_uv, place_theta
```

##### 动机：为什么 CLIP 和 Transporter 必须组合

CLIPort 面对的核心矛盾是：纯视觉语言模型知道“红色积木”“绿色碗”是什么意思，但很难在机器人控制所需的像素精度上输出可执行位姿；纯操作网络又能在桌面上高精度抓放，却不擅长理解开放词汇指令。论文的解法不是让一个网络同时把两件事都做极致，而是显式拆成两条通路。

语义流直接继承 CLIP 的预训练表示。CLIP 在互联网图文对上已经学会了丰富的对象类别、颜色和关系概念，所以只要给出自然语言指令，它就能快速把注意力拉到“要操作的东西”上。问题在于 CLIP 的空间精度并不够高，尤其是在需要像素级抓放点时会变得模糊。

空间流因此被单独设计成一个 RGB-D encoder-decoder，专门保留深度几何、边缘和精确位置。CLIPort 的关键不是简单特征拼接，而是把语义和几何分别做强，再在解码阶段多尺度融合。这种架构与人类视觉皮层中的 ventral “what” 和 dorsal “where” 通路形成了直接类比。

##### 核心机制一：语言条件化语义流

CLIP 文本编码器先把语言指令 \(l\) 编成向量 \(e_l\)。视觉编码器提取图像语义特征 \(f_{\text{vis}}\) 后，模型把 \(e_l\) 平铺到空间维度，并与视觉特征逐元素相乘：

$$
f_{\text{sem}} = f_{\text{vis}} \odot \mathrm{tile}(e_l)
$$

这个操作的直觉很直接：不是让网络重新“学会语言”，而是直接用 CLIP 的文本向量去调制图像通道响应。于是，当指令从 “put the red block in the green bowl” 换成 “pack the yellow ring into the brown box” 时，语义流能以极低样本复杂度重定位目标对象。

> 💡 关键：CLIPort 不是把 CLIP 当分类器用，而是把它当作一个已经学好开放词汇语义的像素特征生成器来用。

##### 核心机制二：Transporter 式 pick-place 分解

CLIPort 沿用了 Transporter Networks 的动作表示，把操作拆成抓取和放置两步。给定正交投影的观测 \(\gamma_t\)，抓取头输出每个像素的价值图：

$$
Q_{\text{pick}}(\gamma_t) = f_{\text{pick}}(\gamma_t), \qquad
a_{\text{pick}} = \arg\max_{(u,v)} Q_{\text{pick}}(u,v)
$$

放置头则围绕抓取点裁出一个局部 query patch，并与全图 key feature 做互相关，在离散旋转集合 \(\Delta \tau\) 上搜索：

$$
Q_{\text{place}}(\gamma_t \mid a_{\text{pick}})
= \left[\Phi_q(\gamma_t[T_{\text{pick}}]) * \Phi_k(\gamma_t)\right]_{\Delta \tau}
$$

$$
a_{\text{place}} = \arg\max_{(u,v,\theta)} Q_{\text{place}}(u,v,\theta)
$$

这里的优势在于，模型完全不需要直接回归 6-DoF 姿态，而是把大部分几何问题变成了卷积和旋转搜索。对桌面 pick-and-place 这类任务来说，这种表示比直接回归更稳定，也更容易从少量演示中学出来。

##### 核心机制三：为什么冻结 CLIP 反而更好

论文一个很重要的实验结论是：小数据机器人任务里，**冻结 CLIP 编码器** 往往比端到端微调更稳。原因并不神秘。机器人演示量和互联网图文数据量差了几个数量级，如果在几十到几百条演示上解冻 CLIP，很容易把原本学到的开放词汇语义毁掉。CLIPort 只训练语义流的解码器、空间流和动作头，从而既保留了语义先验，又避免了小样本过拟合。

这也解释了它的样本效率来源。论文在 1 到 100 条演示区间内看到，CLIPort 相比不带 CLIP 的 Transporter 基线明显更快进入高成功率区域。这不是因为机器人控制更简单了，而是因为“认物体”的那部分能力已经由 CLIP 预先学好。

##### 结果怎么看：它是早期 VLA 里非常干净的一条路线

CLIPort 并不是通用大模型路线，而是一条非常工程化、非常有效的语言条件化操控路线。它在 10 个 Ravens 仿真任务和 9 个真实机器人任务上都展示出稳定收益，多任务模型在超过一半任务上还超过了单任务专家。它的启发主要有两点：第一，开放词汇语义和高精度操控确实可以解耦；第二，机器人策略预训练不一定非得走超大端到端模型，合理组合现成基础模型和操作网络也能带来很强的泛化。

#### 🧪 练习题

```yaml
question: "CLIPort 中语义流和空间流分工的核心目的是什么？"
options:
  - "让同一个 CLIP 编码器同时负责语言理解和深度重建"
  - "用语义流负责开放词汇对象理解，用空间流负责像素级几何定位"
  - "把抓取和放置分别交给两个完全独立的数据集训练"
  - "将动作空间从连续控制改写成纯文本生成任务"
answer: 1
explain: "CLIPort 的核心就是显式拆开 what 和 where。CLIP 语义流负责理解指令中的目标对象，RGB-D 空间流负责精确抓放位置，两者融合后输出动作热力图。"
```
