### DiffEdit：基于扩散模型的语义图像编辑

```yaml
id: diffedit
name: DiffEdit
full_name: "DiffEdit：基于扩散模型的语义图像编辑"
year: "2022"
org: Meta AI
paper_url: "https://arxiv.org/abs/2210.11427"
category: local_editing
parent: blended-diffusion
motivation: "利用文本条件扩散模型自动推断编辑区域掩码，结合 DDIM 编码与掩码引导解码实现语义编辑"
```

#### 📝 一句话总结

DiffEdit 提出了一种无需手动提供掩码的文本引导语义图像编辑方法，通过对比不同文本条件下扩散模型的噪声估计差异自动推断编辑区域，并结合 DDIM 编码与掩码引导解码，在仅修改目标区域的同时保持背景不变。

#### 🎯 核心要点

- **自动掩码生成**：通过对比查询文本与参考文本条件下的噪声估计差异，自动推断需要编辑的图像区域，无需用户手动标注
- **DDIM 编码保真**：使用 DDIM 确定性编码（而非 SDEdit 的随机加噪）将原始图像映射到隐空间，理论上可完美重建原图，最大程度保留非编辑区域信息
- **掩码引导解码**：在 DDIM 解码过程中，每一步将掩码外区域替换为 DDIM 编码的对应时间步隐变量，确保背景像素精确还原
- **编码比率 \(r\) 控制编辑强度**：较大的 \(r\) 允许更强的编辑以匹配查询文本，较小的 \(r\) 则更贴近原图
- **理论优势**：从 ODE 视角证明 DDIM 编码相比 SDEdit 的随机加噪方式，在条件解码后与原图的偏差更小
- **在 ImageNet 上验证**：在 ImageNet 数据集上进行定量评估，使用 FID 和 CLIP 相似度衡量编辑质量

#### 🔬 深入细节

![DiffEdit 核心三步流程图](https://ar5iv.labs.arxiv.org/html/2210.11427/assets/x2.png)
*图：DiffEdit 的三个步骤示意。Step 1：自动推断编辑掩码；Step 2：DDIM 编码输入图像；Step 3：掩码引导的条件 DDIM 解码。*

##### 动机与背景

文本引导的图像编辑是一个重要任务：给定一张输入图像和一段描述目标编辑的文本（如将"马"变为"斑马"），模型需要修改图像中的相关区域，同时保持其余部分不变。

已有方法存在两个关键问题：
1. **需要手动掩码**：如 Blended Diffusion 等方法要求用户手动指定编辑区域，限制了自动化程度
2. **背景保真度差**：如 SDEdit 通过向原图添加随机噪声再去噪来实现编辑，但随机噪声会导致非编辑区域也发生不必要的变化

DiffEdit 同时解决了这两个问题：自动推断掩码，并通过 DDIM 编码保证背景精确还原。

##### 核心算法伪代码

```python
# DiffEdit 三步编辑流程
def diffedit(x_0, query_text, ref_text, model, r, n=10):
    """
    x_0: 输入图像
    query_text: 目标编辑文本 (如 "zebra")
    ref_text: 参考文本 (如 "horse") 或空文本
    r: 编码比率，控制编辑强度
    n: 掩码估计的平均次数
    """
    # === Step 1: 自动推断编辑掩码 ===
    diffs = []
    for i in range(n):
        noise = sample_gaussian()
        x_t = add_noise(x_0, noise, strength=0.5)
        # 分别用查询文本和参考文本去噪
        eps_query = model.denoise(x_t, t, cond=query_text)
        eps_ref   = model.denoise(x_t, t, cond=ref_text)
        diffs.append(abs(eps_query - eps_ref))
    
    mask_raw = mean(diffs)           # 空间平均
    mask_raw = rescale_to_01(mask_raw)  # 归一化到 [0,1]
    M = binarize(mask_raw, threshold=0.5)  # 二值化
    
    # === Step 2: DDIM 编码 ===
    x_r = ddim_encode(x_0, ratio=r, cond=None)  # 无条件编码
    
    # === Step 3: 掩码引导的 DDIM 解码 ===
    y_r = x_r
    for t in reversed(range(r)):
        y_t = ddim_step(y_r, t, cond=query_text)  # 条件去噪
        x_t = ddim_encode_at_step(x_0, t)          # 对应时间步的编码隐变量
        y_tilde = M * y_t + (1 - M) * x_t          # 掩码引导融合
        y_r = y_tilde
    
    return y_r  # 编辑后的图像
```

##### Step 1：自动掩码推断机制

> 💡 **核心直觉**：当扩散模型在不同文本条件下去噪同一张带噪图像时，噪声估计的差异恰好反映了文本语义变化所影响的图像区域。

具体而言，给定带噪图像 \(\mathbf{x}_t\)，分别计算查询文本 \(Q\)（如"zebra"）和参考文本 \(R\)（如"horse"）条件下的噪声估计：

$$\Delta = |\epsilon_\theta(\mathbf{x}_t, t, Q) - \epsilon_\theta(\mathbf{x}_t, t, R)|$$

在动物身体区域，两种条件下模型会预测不同的纹理和颜色，因此噪声估计差异大；而在背景区域，两种条件下的预测几乎相同，差异接近零。

为提高稳定性，DiffEdit 采用以下策略：
- 使用 50% 强度的高斯噪声（即 \(t\) 对应中间时间步）
- 移除噪声预测中的极端值
- 对 \(n=10\) 个不同噪声样本的空间差异取平均
- 将结果归一化到 \([0, 1]\) 后以阈值 0.5 二值化

> ⚠️ **注意**：掩码通常会略微超出实际需要编辑的区域，这实际上是有益的——它允许编辑区域与背景之间的平滑过渡。

##### Step 2：DDIM 确定性编码

DiffEdit 使用 DDIM 的确定性编码过程将输入图像 \(\mathbf{x}_0\) 映射到隐空间表示 \(\mathbf{x}_r\)。DDIM 的关键性质是**可逆性**：对 \(\mathbf{x}_r\) 进行无条件 DDIM 解码可以近似恢复原始图像 \(\mathbf{x}_0\)。

DDIM 更新规则为：

$$\mathbf{x}_{t-1} = \sqrt{\alpha_{t-1}} \left( \frac{\mathbf{x}_t - \sqrt{1-\alpha_t}\,\epsilon_\theta(\mathbf{x}_t, t)}{\sqrt{\alpha_t}} \right) + \sqrt{1-\alpha_{t-1}}\,\epsilon_\theta(\mathbf{x}_t, t)$$

其中 \(\alpha_t\) 定义噪声水平，是时间步 \(t\) 的递减函数，\(\alpha_0 = 1\)（无噪声），\(\alpha_T \approx 0\)（近似纯噪声）。

编码过程是上述解码的逆过程，将 \(\mathbf{x}_0\) 映射到 \(\mathbf{x}_r = E_r(\mathbf{x}_0)\)。编码使用**无条件模型**（即不使用任何文本输入）。

> 💡 **关键优势**：与 SDEdit 的随机加噪 \(G_r(\mathbf{x}_0, \epsilon) = \sqrt{\alpha_r}\mathbf{x}_0 + \sqrt{1-\alpha_r}\epsilon\) 不同，DDIM 编码是确定性的，所有原始图像信息都被编码在 \(\mathbf{x}_r\) 中，可通过 DDIM 采样完整访问。

##### Step 3：掩码引导的条件解码

获得隐变量 \(\mathbf{x}_r\) 后，使用查询文本 \(Q\) 条件下的 DDIM 解码生成编辑结果。关键创新在于**掩码引导**：

$$\tilde{\mathbf{y}}_t = M \cdot \mathbf{y}_t + (1 - M) \cdot \mathbf{x}_t$$

其中：
- \(\mathbf{y}_t\) 是条件 DDIM 解码的中间结果（受查询文本引导）
- \(\mathbf{x}_t\) 是 DDIM 编码过程中对应时间步的隐变量（包含原始图像信息）
- \(M\) 是 Step 1 推断的二值掩码

这意味着：
- **掩码内**（\(M=1\)）：使用文本条件解码结果，实现语义编辑
- **掩码外**（\(M=0\)）：使用 DDIM 编码的隐变量，自然映射回原始像素

##### 编码比率 \(r\) 的作用

编码比率 \(r\) 决定了编辑的强度：
- **较大的 \(r\)**：允许更强的编辑，更好地匹配查询文本，但可能偏离原图较多
- **较小的 \(r\)**：编辑较弱，更贴近原图，但可能无法完全实现目标语义变化

##### 与 SDEdit 的理论对比

论文从理论角度证明了 DDIM 编码优于 SDEdit 的随机加噪方式。核心论点是：

对于 DDIM 编码，无条件解码 \(\mathbf{x}_r\) 可以精确恢复 \(\mathbf{x}_0\)。当改用条件解码时，由于条件和无条件噪声估计器 \(\epsilon_\theta\) 和 \(\epsilon_\theta(\cdot, Q)\) 通常产生相似的估计，解码行为也相似，因此编辑后的图像与原图距离较小。

而 SDEdit 的随机加噪引入了额外的随机性，即使无条件解码也无法精确恢复原图，导致编辑后图像与原图的偏差更大。

![DiffEdit 编辑示例](https://ar5iv.labs.arxiv.org/html/2210.11427/assets/x1.png)
*图：DiffEdit 在多种场景下的编辑效果示例，展示了从"马→斑马"、"碗中水果→蔬菜"等多种语义编辑任务。*

#### 🧪 练习题

```yaml
question: "DiffEdit 自动生成编辑掩码的核心原理是什么？"
options:
  - "使用图像分割模型检测目标物体区域"
  - "对比不同文本条件下扩散模型噪声估计的空间差异"
  - "通过 CLIP 模型计算图像与文本的注意力图"
  - "利用边缘检测算法识别物体轮廓"
answer: 1
explain: "DiffEdit 通过对比查询文本和参考文本条件下的噪声估计差异来推断掩码——差异大的区域即为需要编辑的区域，无需额外的分割或检测模型。"
```