### Null-text Inversion

```yaml
id: null-text-inversion
name: Null-text Inversion
full_name: "Null-text Inversion for Editing Real Images using Guided Diffusion Models"
year: "2022"
org: Google Research
paper_url: "https://arxiv.org/abs/2211.09794"
category: text_edit
parent: prompt-to-prompt
motivation: "用null-text优化实现精确重建编辑"
```

#### 📝 一句话总结

Null-text Inversion 提出通过优化 classifier-free guidance 中的无条件文本嵌入（null-text embedding）来实现真实图像在扩散模型潜空间中的精确反演，从而在不微调模型的前提下，结合 Prompt-to-Prompt 等编辑技术实现高保真的文本引导图像编辑。

#### 🎯 核心要点

- **Pivotal Inversion（枢轴反演）**：先用 DDIM 反演（guidance scale \(w=1\)）计算一条近似噪声轨迹 \(\{z_t^*\}\)，作为后续优化的初始"枢轴"
- **Null-text Optimization（空文本优化）**：在每个去噪时间步 \(t\) 独立优化无条件嵌入 \(\varnothing_t\)，使 classifier-free guidance 下的重建结果精确匹配 DDIM 反演的中间状态
- **无需模型微调**：仅优化 null-text embedding（约 \(50 \times 768\) 维参数），不修改 UNet 权重，保留模型原有编辑能力
- **与 Prompt-to-Prompt 无缝结合**：反演完成后，通过修改目标 prompt 并操控交叉注意力图即可实现即时编辑
- **兼容其他编辑方法**：实验证明该反演方法也可显著提升 SDEdit 的编辑保真度
- **高效推理**：单张 A100 GPU 约 1 分钟完成反演（约 500 次迭代，\(N=10\) 每步）

#### 🔬 深入细节

##### 问题背景与动机

文本引导扩散模型（如 Stable Diffusion）在图像生成方面取得了巨大成功，但将其应用于**真实图像编辑**面临一个核心矛盾：**重建精度与编辑能力的冲突**。

![Null-text Inversion 总览](https://ar5iv.labs.arxiv.org/html/2211.09794/assets/x1.png)
*图 1：Null-text Inversion 方法总览。给定一张真实图像和对应的文本描述，通过 DDIM 反演获取初始噪声轨迹，再优化 null-text embedding 实现精确重建，最后通过修改 prompt 进行编辑。*

具体而言，现代扩散模型广泛使用 **Classifier-Free Guidance (CFG)** 来提升生成质量：

$$\tilde{\epsilon}_\theta(z_t, \mathcal{C}) = w \cdot \epsilon_\theta(z_t, \mathcal{C}) + (1-w) \cdot \epsilon_\theta(z_t, \varnothing)$$

其中 \(w > 1\) 是引导尺度（通常 \(w=7.5\)），\(\mathcal{C}\) 是文本条件嵌入，\(\varnothing\) 是无条件（null-text）嵌入。CFG 使生成结果更贴合文本描述，但也导致了 DDIM 反演的严重失败——因为 DDIM 反演假设 ODE 过程可逆，而 CFG 引入的非线性放大使得正向和反向过程之间产生巨大误差累积。

![DDIM 反演在 CFG 下的失败](https://ar5iv.labs.arxiv.org/html/2211.09794/assets/x3.png)
*图 2：DDIM 反演问题示意。当 guidance scale \(w=1\) 时反演近似可逆，但 \(w=7.5\) 时误差逐步累积，导致重建结果严重偏离原图。*

> 💡 **关键洞察**：问题不在于 DDIM 反演本身，而在于 classifier-free guidance 的非线性放大效应。当 \(w=1\)（无引导）时，DDIM 反演几乎完美；但 \(w=7.5\) 时，每步的微小误差被放大并累积。

##### 方法框架

![方法流程](https://ar5iv.labs.arxiv.org/html/2211.09794/assets/x2.png)
*图 3：Null-text Inversion 方法流程。左侧为 DDIM 反演获取枢轴轨迹，右侧为逐步优化 null-text embedding。*

Null-text Inversion 分为两个阶段：

**阶段一：Pivotal Inversion（枢轴反演）**

使用 \(w=1\) 的 DDIM 反演计算一条近似噪声轨迹：

$$z_{t+1}^* = \sqrt{\frac{\alpha_{t+1}}{\alpha_t}} z_t^* + \left(\sqrt{\frac{1}{\alpha_{t+1}} - 1} - \sqrt{\frac{1}{\alpha_t} - 1}\right) \cdot \epsilon_\theta(z_t^*, \mathcal{C})$$

这条轨迹 \(\{z_T^*, z_{T-1}^*, \ldots, z_0^*\}\) 虽然在 \(w=1\) 下近似可逆，但在 \(w=7.5\) 下无法直接使用。它的价值在于提供了一个**接近真实图像的初始化点**，大幅减少后续优化的搜索空间。

> ⚠️ **为什么不直接优化噪声 \(z_T\)**：直接在高维噪声空间中优化会破坏扩散模型的先验分布，导致编辑能力丧失。Null-text Inversion 的巧妙之处在于，它将优化目标从噪声空间转移到了语义空间（null-text embedding），从而保持了模型的编辑能力。

**阶段二：Null-text Optimization（空文本优化）**

固定枢轴轨迹 \(\{z_t^*\}\) 和噪声起点 \(\bar{z}_T = z_T^*\)，在每个时间步 \(t\) 优化独立的 null-text embedding \(\varnothing_t\)：

$$\min_{\varnothing_t} \left\| z_{t-1}^* - z_{t-1}(\bar{z}_t, \varnothing_t, \mathcal{C}) \right\|_2^2$$

其中 \(z_{t-1}(\bar{z}_t, \varnothing_t, \mathcal{C})\) 表示使用当前 \(\bar{z}_t\)、优化的 \(\varnothing_t\) 和条件嵌入 \(\mathcal{C}\) 执行一步 DDIM 采样（\(w=7.5\)）的结果。优化完成后更新 \(\bar{z}_{t-1} = z_{t-1}(\bar{z}_t, \varnothing_t, \mathcal{C})\)，并用 \(\varnothing_t\) 初始化下一步的 \(\varnothing_{t-1}\)。

##### 算法伪代码

```python
# Null-text Inversion 算法
def null_text_inversion(image, prompt, num_steps=50, num_inner_steps=10):
    # 编码图像
    z0 = vae_encode(image)
    C = text_encode(prompt)
    
    # 阶段一：DDIM 反演 (w=1)
    z_star = [z0]  # z_0^* = z_0
    for t in range(1, num_steps + 1):
        z_star.append(ddim_inversion_step(z_star[-1], t, C, w=1.0))
    
    # 阶段二：Null-text 优化 (w=7.5)
    null_embeddings = {}
    z_bar = z_star[num_steps]  # 从 z_T^* 开始
    null_t = text_encode("")   # 初始化为标准空文本嵌入
    
    for t in range(num_steps, 0, -1):
        null_t = null_t.clone().requires_grad_(True)
        
        for _ in range(num_inner_steps):
            # 用当前 null_t 执行一步 DDIM 采样
            z_pred = ddim_sample_step(z_bar, t, C, null_t, w=7.5)
            # 最小化与枢轴轨迹的距离
            loss = ||z_pred - z_star[t-1]||^2
            loss.backward()
            optimizer.step(null_t)
        
        null_embeddings[t] = null_t.detach()
        z_bar = ddim_sample_step(z_bar, t, C, null_t, w=7.5)
    
    return z_star[num_steps], null_embeddings

# 编辑：修改 prompt，使用优化的 null embeddings 重新采样
def edit(z_T, null_embeddings, source_prompt, target_prompt):
    # 结合 Prompt-to-Prompt 的注意力操控进行编辑
    return prompt_to_prompt_sample(z_T, null_embeddings, 
                                   source_prompt, target_prompt, w=7.5)
```

##### 核心设计解析

**1. 为什么优化 null-text 而非其他参数？**

CFG 公式 \(\tilde{\epsilon} = w \cdot \epsilon_\theta(z_t, \mathcal{C}) + (1-w) \cdot \epsilon_\theta(z_t, \varnothing)\) 中，\(\varnothing\) 是唯一不影响条件生成语义的自由变量。优化 \(\varnothing\) 不会改变模型对文本条件的响应方式，因此编辑时修改 prompt 仍能产生预期的语义变化。相比之下：
- 优化 \(z_T\)：会偏离高斯先验，破坏生成质量
- 微调 UNet 权重：计算昂贵且可能损害编辑能力
- 优化条件嵌入 \(\mathcal{C}\)：会干扰文本语义，影响后续编辑

**2. 逐时间步优化 vs 全局优化**

实验表明，为每个时间步 \(t\) 独立优化 \(\varnothing_t\) 比使用全局共享的 \(\varnothing\) 效果显著更好。这是因为扩散过程中不同时间步的去噪任务差异很大（早期步骤处理全局结构，后期步骤处理细节），单一嵌入无法同时满足所有时间步的精确重建需求。

**3. DDIM 枢轴的关键作用**

与随机初始化相比，DDIM 反演提供的枢轴轨迹使优化起点已经非常接近目标，大幅加速收敛。实验显示，使用 DDIM 枢轴仅需约 250 次迭代（\(\sim 1\) 分钟）即可达到高质量重建，而随机枢轴需要数倍迭代且最终质量更差。

**4. 对输入 caption 的鲁棒性**

一个令人惊讶的发现是：即使使用随机的、与图像不匹配的 caption，null-text 优化仍能收敛到精确重建。这说明优化过程具有很强的鲁棒性。但对于编辑任务，caption 需要包含待编辑的语义元素，以便 Prompt-to-Prompt 能生成有意义的注意力图。

##### 实验验证

在 COCO 验证集的 100 张图像上评估，Null-text Inversion 在约 500 次迭代后达到接近 VQAE 上界的 PSNR。用户研究（50 名参与者，48 张图像）显示，与 Text2LIVE、VQGAN+CLIP、SDEdit 相比，大多数参与者更偏好本方法的编辑结果。

![定性比较](https://ar5iv.labs.arxiv.org/html/2211.09794/assets/x5.png)
*图 4：编辑结果展示。Null-text Inversion + Prompt-to-Prompt 能在保持原图高保真度的同时实现多样化的文本引导编辑。*

与其他方法的关键区别：
- **vs Text2LIVE**：Text2LIVE 擅长局部纹理替换，但难以处理结构性编辑（如将小孩替换为老虎）
- **vs SDEdit**：SDEdit 无法忠实重建原图，导致人物身份漂移
- **vs Imagic**：Imagic 需要微调整个模型，计算成本高且 LPIPS 保真度更差

#### 🧪 练习题

```yaml
question: "Null-text Inversion 选择优化 null-text embedding 而非直接优化初始噪声 z_T 的主要原因是什么？"
options:
  - "优化 null-text embedding 的计算成本更低"
  - "优化 z_T 会偏离高斯先验分布，破坏模型的生成和编辑能力"
  - "null-text embedding 的维度更高，优化空间更大"
  - "DDIM 反演无法提供有效的 z_T 初始化"
answer: 1
explain: "直接优化 z_T 会使其偏离标准高斯分布，导致生成结果落入模型训练分布之外，从而丧失编辑能力。而 null-text embedding 是 CFG 中不影响条件语义的自由变量，优化它既能实现精确重建，又能保持编辑能力。"
```