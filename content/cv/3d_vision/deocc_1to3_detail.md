### Deocc-1-to-3

```yaml
id: deocc_1to3
name: Deocc-1-to-3
full_name: 单图3D去遮挡 (Deocc-1-to-3)
year: '2026'
org: AAAI
paper_url: https://ojs.aaai.org/index.php/AAAI/article/view/37820
category: reconstruction
parent: neus
motivation: 自监督多视角扩散模型11秒完成遮挡图像3D重建
```

#### 📝 一句话总结

DeOcc-1-to-3 提出一个单张遮挡图像到多视角去遮挡图像的自监督扩散框架，直接生成六个结构一致的新视角，再接入 InstantMesh 等 3D 重建模块完成遮挡物体的完整 3D 重建。

#### 🎯 核心要点

- **遮挡感知多视角生成**：输入单张 partially occluded image，输出六张去遮挡且结构一致的新视角图像
- **基于 Zero123++**：不修改原始多视角扩散模型架构，通过 full fine-tuning 学会补全与新视角合成
- **自监督训练数据**：从 Pix2Gestalt 的完整/遮挡图像对构造训练样本，无需人工 3D 标注
- **伪多视角监督**：对完整图像用冻结多视角生成模型产生六视角 pseudo ground truth，用遮挡图像作为学生输入
- **统一去遮挡与视角合成**：避免先 2D inpainting 再 3D reconstruction 的误差累积
- **下游兼容**：生成的六视角结果可直接输入 InstantMesh 等 mesh-based reconstruction pipeline
- **Occ-LVIS benchmark**：提出遮挡感知重建基准，覆盖不同遮挡程度、类别和 mask 模式

#### 🔬 深入细节

##### 核心示意图

![DeOcc-1-to-3 框架](https://arxiv.org/html/2506.21544v1/x2.png)
*图：DeOcc-1-to-3 论文 Figure 2。顶部构造遮挡图像与完整图像的伪多视角监督，中间全量微调多视角扩散模型，底部把预测六视角图像送入 3D reconstruction module。*

##### 算法伪代码

```python
# DeOcc-1-to-3 自监督训练与推理伪代码
def build_training_pair(full_image, occlusion_mask, frozen_mv_model):
    occluded = apply_occlusion(full_image, occlusion_mask)
    pseudo_views = frozen_mv_model.generate_six_views(full_image)
    return occluded, pseudo_views


def train_deocc(student_mv_model, pix2gestalt_pairs):
    for full_image, mask in pix2gestalt_pairs:
        I_occ, target_views = build_training_pair(
            full_image, mask, frozen_mv_model=teacher_zero123pp
        )
        noisy_latent, noise, t = diffusion_forward(target_views)
        pred_noise = student_mv_model(noisy_latent, t, condition=I_occ)
        loss = ((noise - pred_noise) ** 2).mean()
        update(student_mv_model, loss)


def reconstruct_from_occluded_image(model, I_occ):
    six_views = model.generate_six_views(I_occ)
    mesh = InstantMesh(six_views)
    return mesh
```

##### 动机与背景

单图 3D 重建已经受益于 Zero-1-to-3、Zero123++、MVDream、InstantMesh 等多视角生成与快速重建模型。这些模型通常假设输入物体可见完整；现实图像里物体常被其他物体、边界、手部或环境遮挡。一旦输入缺失局部结构，普通多视角扩散模型会把遮挡物当成目标的一部分，或在不同视角中对不可见区域产生互相矛盾的幻觉，最终导致 mesh 破碎、背面错误或法向异常。

一个自然方案是先做 2D amodal inpainting，再做多视角生成。但 DeOcc-1-to-3 指出这个两阶段方案存在结构性问题：2D 修补不保证 3D 多视角一致，生成模型不知道哪些区域是高不确定性的补全部分，两个阶段无法联合优化，错误会向 3D 重建传播。

##### 自监督训练构造

DeOcc-1-to-3 用自监督方式构造训练目标。设完整图像为 \(I_{\text{full}}\)，随机遮挡后得到 \(I_{\text{occ}}\)。冻结的多视角教师模型 \(G\) 对完整图像生成六视角伪监督：

$$
\langle I_{\text{occ}}, G(I_{\text{full}})\rangle
$$

学生模型输入 \(I_{\text{occ}}\)，目标是预测与 \(G(I_{\text{full}})\) 一致的六视角结果。这样模型学到的不是“补一张图”，而是在遮挡输入条件下恢复一组结构一致的 3D-aware views。

##### 扩散模型目标

论文基于 Zero123++ 的六视角 tiled output，使用标准 denoising objective。给定输入图像 \(I_{\text{input}}\)、噪声 latent \(x_t\)、噪声 \(\epsilon\) 和时间步 \(t\)，训练损失为：

$$
\mathcal{L}_{\text{denoise}}=
\mathbb{E}_{x_0,\epsilon,t}
\left[
\|\epsilon-\epsilon_\theta(x_t,t\mid I_{\text{input}})\|^2
\right]
$$

在 DeOcc-1-to-3 中，\(I_{\text{input}}\) 是遮挡图像，\(x_0\) 对应完整图像经教师模型生成的六视角拼图。由于不改架构，模型能力主要来自 fine-tuning 数据分布：它学会把遮挡区域解释为缺失结构，并在六个预定义相机位姿上生成一致补全。

##### 3D 重建集成

推理时，模型从单张遮挡图像直接输出六张 novel views，视角配置继承 Zero123++ 的固定六视角设计，例如两个 elevation 组合与六个 azimuth 方向。随后这些图像被送入 InstantMesh 等重建器，恢复 mesh 和法向。这个过程把难点从“直接从遮挡图回归 3D”转化为“先生成一致多视角去遮挡观测，再用成熟多视角重建模块恢复 3D”。

用户元信息提到 11 秒完成遮挡图像 3D 重建，可理解为模型设计面向快速推理：生成固定数量视角，避免 SDS 式逐场景长时间优化。实际速度取决于 GPU、扩散采样步数和下游重建器配置。

##### Occ-LVIS 基准

论文还提出 Occ-LVIS benchmark，用于衡量遮挡场景下的重建质量。它覆盖不同遮挡比例、物体类别和 mask 形态，使方法不只在干净单物体输入上比较，而是面向真实遮挡分布评估。指标可包括新视角图像质量、3D 几何距离、法向一致性或下游 mesh 完整度。

> 💡 关键：DeOcc-1-to-3 的核心是把 2D amodal completion 和 multi-view generation 合并成一个扩散任务，让模型在生成时同时考虑“补全什么”和“从其他视角看是否一致”。

#### 🧪 练习题

```yaml
question: "DeOcc-1-to-3 为什么不采用“先 2D inpainting，再 3D 重建”的两阶段方案？"
options:
  - "因为 2D inpainting 无法输出 RGB 图像"
  - "因为两阶段方案缺乏多视角一致性，补全误差会传递到视角生成和 3D 重建"
  - "因为扩散模型不能处理遮挡图像"
  - "因为 InstantMesh 只能接收单张图像"
answer: 1
explain: "DeOcc-1-to-3 将去遮挡和多视角生成联合微调，目标是一次输出结构一致的六视角结果，避免 2D 补全与 3D 推理脱节。"
```
