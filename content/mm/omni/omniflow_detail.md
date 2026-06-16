### 全模态流模型 (OmniFlow)
```yaml
id: omniflow
name: OmniFlow
full_name: 全模态流模型 (OmniFlow)
year: '2025'
org: UCLA
paper_url: https://openaccess.thecvf.com/content/CVPR2025/html/Li_OmniFlow_Any-to-Any_Generation_with_Multi-Modal_Rectified_Flows_CVPR_2025_paper.html
category: diffusion_fusion
parent: codi-2
motivation: 多模态修正流统一生成
topic_id: omni
yaml_path: /mnt/dhwfile/raise/user/wanghaoyu/KnowledgePipeline/content/mm/omni.yaml
output_path: /mnt/dhwfile/raise/user/wanghaoyu/KnowledgePipeline/content/mm/omni/omniflow_detail.md
```

#### 📝 一句话总结
OmniFlow 提出多模态修正流和 Omni-Transformer，把文本、图像、音频放到统一的连续流匹配框架中，解决 CoDi/UniDiffuser 等 any-to-any 系统跨模态交互浅、训练代价高的问题。

#### 🎯 核心要点
- **多模态修正流**：为每个模态分配独立噪声时间 \(t_i\)，用路径 \(\tau(t)=(t_1,\ldots,t_M)\) 表示任意输入到任意输出任务。
- **统一任务编码**：条件模态保持 \(t_i=0\)，待生成模态从 \(t_i=1\) 积分到 \(0\)，缺失模态保持纯噪声。
- **Omni-Transformer**：继承 Stable Diffusion 3 的 MMDiT 思路，为图像、文本、音频设置独立投影/FFN，并通过联合注意力直接交互。
- **多模态 CFG**：用 \(\alpha_{ij}\) 独立控制输入模态 \(j\) 对输出模态 \(i\) 的引导强度。
- **模块化训练**：先复用/训练图文与文音专家模块，再合并微调，避免从零训练全模态生成模型。
- **训练配方探索**：系统比较连续流、离散扩散、时间步分布和 timestep shift，论文报告 RF + logit-normal 采样和 shift=3 在音频/文本任务上表现更稳。
- **实验定位**：在文本到图像、文本到音频、音频/图像到文本等任务上优于先前通用 any-to-any 生成模型，并在部分指标上接近单任务专家模型。

#### 🔬 深入细节
![OmniFlow 架构示意图](https://arxiv.org/html/2412.01169v1/x3.png)
*图：OmniFlow 将图像、文本、音频编码到潜变量空间，用多流 Omni-Transformer 预测各模态速度场。*

```python
# OmniFlow 多模态修正流训练/推理伪代码
def train_step(batch, model):
    clean = encode_modalities(batch)          # image/text/audio -> latent x_i^0
    path = sample_task_path(batch.task)       # e.g. text+audio -> image
    s = uniform(0.0, 1.0)
    loss = 0.0

    noisy_inputs = {}
    targets = {}
    for modality, x0 in clean.items():
        eps = normal_like(x0)
        t_i = path(modality, s)
        x_t = (1 - t_i) * x0 + t_i * eps
        noisy_inputs[modality] = x_t
        targets[modality] = x0 - eps          # rectified-flow velocity

    v_pred = model(noisy_inputs, times=path.times(s))
    for modality in batch.observed_modalities:
        loss += mse(v_pred[modality], targets[modality])
    loss.backward()

def sample(condition_modalities, output_modalities, model, steps):
    state = init_with_conditions_and_noise(condition_modalities, output_modalities)
    for k in range(steps):
        times = task_path_at_step(k)
        v = multimodal_cfg(model, state, times)
        for m in output_modalities:
            state[m] = ode_update(state[m], v[m], times[m])
    return decode_modalities(state, output_modalities)
```

OmniFlow 的关键动机来自两个矛盾：一方面，图像扩散/流模型、音频扩散模型已经很强；另一方面，把多个单任务模型简单串起来会让跨模态信息只能通过 caption 或 embedding 平均传递。论文特别指出，CoDi 在音频+文本到图像任务中把音频 embedding 和文本 embedding 加权平均，这种表示会把不同条件压到同一个向量里，无法保证两个输入都被忠实保留。OmniFlow 改为学习联合分布，让图像、文本、音频 token/latent 在每一层注意力里互相可见。

多模态修正流把单模态 RF 的线性插值推广到每个模态：

$$
x_i^{t_i}=(1-t_i)x_i^0+t_i x_i^1,\qquad x_i^1\sim\mathcal{N}(0,I)
$$

目标速度为：

$$
u_i=x_i^0-x_i^1,\qquad
\mathcal{L}_{\mathrm{MRF}}=
\mathbb{E}_{x^0,x^1,t}\sum_{i\in\mathcal{O}}
\left\|v_{\theta,i}(x_1^{t_1},\ldots,x_M^{t_M},t_1,\ldots,t_M)-u_i\right\|_2^2
$$

其中 \(\mathcal{O}\) 是当前样本里参与训练的模态集合。与普通扩散只处理一个时间 \(t\) 不同，OmniFlow 使用多维时间向量。若任务是文本+音频到图像，文本和音频作为条件保持干净，图像从噪声走向数据：

$$
\tau_{T+A\rightarrow I}(s)=
(t_I,t_T,t_A)=(1-s,0,0),\quad s:0\rightarrow1
$$

这让“理解任务”和“生成任务”在同一数学对象下表达：条件模态不是外部 prompt，而是联合状态向量里 \(t=0\) 的坐标；待生成模态不是单独解码器，而是同一个向量场中的某些坐标。

架构上，Omni-Transformer 继承 MMDiT 的“模态独立投影 + 联合注意力”。每个模态有自己的 QKV、输出投影和 FFN，以适配图像 latent patch、文本 latent、音频 latent 的不同统计分布；跨模态交换只发生在 attention 矩阵里：

$$
Q=[Q_I;Q_T;Q_A],\quad K=[K_I;K_T;K_A],\quad V=[V_I;V_T;V_A]
$$

$$
\mathrm{Attn}_i=\mathrm{softmax}\left(\frac{Q_iK^\top}{\sqrt{d}}\right)V
$$

这种设计的工程价值很直接：独立流可以用 SD3 的图文权重初始化，也可以单独训练文本到音频模块，然后把模块合并后做多任务微调。相比从零训练一个统一全模态模型，它更适合在已有高质量专家模型上扩展能力。

多模态 CFG 进一步解决“多个条件谁更重要”的问题。对输出模态 \(i\)，论文把输入模态 \(j\) 的边际影响写成：

$$
\delta_{ij}=v_{\theta,i}(x_i^{t_i},x_j^0)-v_{\theta,i}(x_i^{t_i})
$$

并用可调系数组合：

$$
\hat{v}_{\theta,i}
=v_{\theta,i}(x_1^{t_1},\ldots,x_M^{t_M})
+\sum_{j\ne i}(\alpha_{ij}-1)\delta_{ij}
$$

当只有一个条件模态时，这会退化为标准 classifier-free guidance；当有图像和音频同时作为条件时，用户可以增大 \(\alpha_{\mathrm{text,image}}\) 让输出文本更贴近视觉内容，或增大 \(\alpha_{\mathrm{text,audio}}\) 让文本更贴近音频事件。

推理时，路径 \(\tau\) 决定哪些坐标积分。给定条件模态直接编码为 \(x_i^0\)，待生成模态初始化为高斯噪声，模型在每一步预测速度场并沿 ODE 更新。与“LLM 先生成文本，再调用扩散模型”的工具链相比，OmniFlow 的生成状态一直是联合的，因此可以支持文本到图像+音频、音频到图像、音频+图像到文本等组合，并让输出模态之间共享同一去噪轨迹。

> 💡 关键：OmniFlow 的统一性不是把所有模态离散化到一个词表，而是在连续潜空间里为每个模态保留独立坐标，再用同一个多模态向量场学习它们的联合动力学。

#### 🧪 练习题
```yaml
question: "OmniFlow 用路径 τ(t) 表示 any-to-any 任务时，条件模态和待生成模态通常分别处于什么状态？"
options:
  - "条件模态保持 t=0 的干净状态，待生成模态从 t=1 的噪声积分到 t=0"
  - "条件模态和待生成模态都始终保持 t=1"
  - "条件模态必须先转写成文本，待生成模态再由单独扩散模型生成"
  - "所有模态共享同一个标量时间，不能区分输入和输出"
answer: 0
explain: "多模态修正流用每个模态自己的时间坐标表达任务；条件保持干净，输出从噪声去噪到数据。"
```
