### UniVid：统一视频模型

```yaml
id: univid
name: UniVid
full_name: "统一视频模型 (Unified Video Model)"
year: "2026"
org: "Multiple Institutions"
paper_url: "https://arxiv.org/abs/2511.12345"
category: unified
parent: unitok
motivation: "预训练视频生成模型统一视觉任务"
```

> 资料限制：manifest 中的 `paper_url` 指向的 arXiv 条目不是 UniVid。下文依据与 motivation 最匹配的公开论文 `UniVid: Unifying Vision Tasks with Pre-trained Video Generation Models`（`https://arxiv.org/abs/2509.21760`）整理，YAML 仍保持 manifest 元信息不变。

#### 📝 一句话总结

UniVid 提出把预训练视频生成 DiT 作为统一视觉任务骨干，通过“视觉句子”把示例输入、示例输出、查询输入和目标输出串成时间序列，并用轻量 SFT/LoRA 让同一个视频生成模型在不改架构的情况下执行生成与像素级理解任务。

#### 🎯 核心要点

- 统一范式：将图像、视频、标注图等视觉对象组织为视觉句子 \(A\rightarrow A'\rightarrow B\rightarrow B'\)
- 任务由上下文定义：\((A,A',B)\) 是 visual prompt，模型需要生成符合同一变换关系的 \(B'\)
- 使用预训练视频 DiT：以只在自然视频上预训练的 Wan 类视频生成模型为 backbone，不为每个任务重新设计结构
- 轻量 SFT：在 Cross-Attention 与 Self-Attention 中插入 LoRA 模块，用少量成对样本适配多种任务
- 目标片段加噪：训练时保持上下文 \((A,A',B)\) 干净，只对目标 \(B'\) 对应 latent 加噪并学习去噪/流预测
- 跨模态与跨源泛化：支持图像/视频混合上下文，以及从自然视觉到深度、分割、显著目标等标注域的任务
- 生成与理解切换：任务类型主要由视觉句子顺序决定，例如把标注预测反向组织即可变成条件生成任务

#### 🔬 深入细节

##### 1. 核心示意图

![UniVid 框架图](https://arxiv.org/html/2509.21760v1/x2.png)
*图：UniVid 将任务样例与查询组织为视觉句子；训练时上下文保持干净，只对目标片段加噪，预训练视频 DiT 在 3D full attention 中学习跨片段关系。*

##### 2. 问题背景与动机

统一视觉模型希望像语言模型处理文本任务一样，用一个模型处理多种视觉任务。已有 Large Vision Model 类方法会把不同任务组织为序列，但往往需要针对图像、视频、标注等来源进行大规模任务特定预训练，数据成本和扩展成本很高。

UniVid 的出发点是：视频生成模型本来就在学习时间序列上的视觉变化。一个强视频 DiT 已经掌握了“给定前后上下文，生成后续视觉片段”的能力；如果把各种视觉任务都重写成时间轴上的上下文-目标关系，就可以复用视频生成预训练，而不是为每种视觉任务重新构建预训练语料。

这也是它和统一 token 化路线的互补点。UniTok 类方法更关注统一视觉 token 表示，UniVid 则把统一性放在任务格式和视频生成 backbone 上：只要任务可以表示为视觉片段之间的映射，就能通过同一个视频生成模型完成。

##### 3. 视觉句子表示

UniVid 的核心数据结构是视觉句子：

$$
V=[A, A', B, B']
$$

其中 \(A\rightarrow A'\) 是一个示例任务变换，\(B\) 是查询输入，\(B'\) 是期望输出。上下文为：

$$
C=(A,A',B)
$$

模型的目标是在给定 \(C\) 的条件下生成 \(B'\)。例如，若 \(A\) 是一段原视频、\(A'\) 是对应深度图视频、\(B\) 是新的原视频，则 \(B'\) 应该是 \(B\) 的深度图；若 \(A'\) 是 Van Gogh 风格视频，则 \(B'\) 应该是 \(B\) 的风格化结果。

这个设计把任务说明从文本 prompt 转移到视觉上下文本身。模型不需要显式读取“请做深度估计”这样的任务名，而是从 \(A\rightarrow A'\) 的示例关系中推断对 \(B\) 应该执行的变换。

##### 4. 训练与推理流程

训练时，完整视觉句子会先经过 VAE/视频编码器转成 latent token。上下文 \((A,A',B)\) 对应的 token 保持干净，只有目标 \(B'\) 的 token 被加噪为 \(z_t\)。随后把干净上下文 token 与目标 noisy token 拼接送入预训练视频 DiT。

如果用扩散/流匹配形式表示，模型学习一个时间相关预测器：

$$
\hat{v}_\theta = f_\theta(z_t, t, C)
$$

对应损失可写为：

$$
\mathcal{L}
= \mathbb{E}_{t,V}\left[
\left\| f_\theta(z_t,t,C)-v^\star_t \right\|_2^2
\right]
$$

其中 \(v^\star_t\) 表示由底层扩散或 flow-matching 训练目标定义的目标速度/噪声/残差。论文实现上重点在于不改变视频 DiT 主干，而是在注意力层插入 LoRA，使小样本 SFT 可以改变跨片段关系建模方式。

推理时输入只有 \((A,A',B)\)。模型从随机噪声初始化 \(B'\) 的 latent，在上下文 token 条件下逐步去噪或积分，最后由解码器还原为图像、视频或标注图。由于输入和输出都被表示在同一时间序列中，图像任务、视频任务、生成任务、理解任务都共享同一条生成流程。

##### 5. 核心流程伪代码

```python
# UniVid visual-sentence SFT and inference
def train_univid(video_dit, dataset):
    attach_lora(video_dit, modules=["cross_attention", "self_attention"])
    for A, A_prime, B, B_prime in dataset:
        context_latents = encode_visual_sequence([A, A_prime, B])
        target_latent = encode_visual_sequence([B_prime])

        t = sample_timestep()
        noise = randn_like(target_latent)
        z_t, target_velocity = diffuse_or_flow_corrupt(target_latent, noise, t)

        tokens = concat(context_latents, z_t)
        pred_velocity = video_dit(tokens, timestep=t)
        loss = mse(pred_velocity.target_part, target_velocity)
        update_lora_parameters(loss)

def infer_univid(video_dit, A, A_prime, B):
    context_latents = encode_visual_sequence([A, A_prime, B])
    z = randn_target_latent()
    for t in sampling_schedule():
        tokens = concat(context_latents, z)
        pred = video_dit(tokens, timestep=t)
        z = denoise_or_integrate(z, pred.target_part, t)
    return decode_visual_sequence(z)
```

##### 6. 任务覆盖与泛化

论文用六类代表性任务评估这种范式，包括 scribble map transfer、Van Gogh style transfer、camera movement transfer、depth map prediction、semantic segmentation prediction、salient object tracking。每类任务只使用少量训练样本，重点不是靠海量标注刷单任务指标，而是验证预训练视频生成模型能否通过视觉句子快速适配。

跨模态泛化指上下文中可以混合图像与视频，例如示例是图像级变换，查询是视频片段，模型仍应推断输出模态。跨源泛化指模型能从自然视觉域转向标注域，例如深度图、语义分割图、显著目标轨迹等，即使底层视频 DiT 预训练时主要见到的是自然视频。

生成和理解之间的边界也被弱化。传统理解任务如深度估计，在 UniVid 中就是“生成深度图目标片段”；反过来，把深度图到自然图像的关系放进视觉句子，又可以变成条件生成任务。统一性来自序列格式，而不是给每个任务新增一个 decoder head。

##### 7. 与传统方案的区别

传统多任务视觉系统常为不同任务配置不同 head、loss 和数据管线；统一多模态大模型则常依赖文本化接口或离散 token 接口。UniVid 选择了更贴近视频生成模型预训练分布的路线：所有任务都表现为时间轴上的视觉片段补全。

这一路线的优势是部署和扩展简单。新增任务时，只需准备少量 \(A\rightarrow A'\) 与 \(B\rightarrow B'\) 成对样例并做 SFT，而不是重新设计架构。劣势也很明确：任务必须能被视觉上下文清晰表达；如果需要复杂符号推理、长文本约束或非视觉输出，仅靠视觉句子可能不够。

> 💡 关键：UniVid 的“统一”不是把所有任务转成同一个标签空间，而是把任务本身转成同一种条件生成问题：根据视觉示例关系和查询输入，生成目标视觉片段。

#### 🧪 练习题

```yaml
question: "UniVid 中视觉句子 [A, A', B, B'] 的核心作用是什么？"
options:
  - "把所有视觉任务都转换为固定类别分类问题"
  - "用 A 到 A' 的示例关系定义任务，并让模型对 B 生成对应输出 B'"
  - "只用于增加视频帧数，与任务定义无关"
  - "替代 VAE，使模型不再需要 latent 表示"
answer: 1
explain: "视觉句子把任务示例和查询放在同一时间序列中，(A,A',B) 构成上下文，B' 是模型需要生成的目标。"
```
