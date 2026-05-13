### HiFi-Inpaint

```yaml
id: hifi-inpaint
name: HiFi-Inpaint
full_name: "高保真参考图修复 (HiFi-Inpaint: High-Fidelity Reference-Based Inpainting)"
year: "2025"
org: "UCAS / CUHK / ByteDance / ZJU / UT Austin"
paper_url: "https://arxiv.org/abs/2603.02210"
category: "reference-based inpainting"
parent: "FLUX.1-Dev (DiT)"
motivation: "在人物-商品合成场景中，现有修复方法难以保留商品高频细节（纹理、logo、文字），HiFi-Inpaint 通过高频引导、共享增强注意力和细节感知损失实现像素级细节保留修复"
```

#### 📝 一句话总结

HiFi-Inpaint 提出了一种基于高频图引导的参考图修复框架，通过 Shared Enhancement Attention（SEA）捕获精细商品特征、Detail-Aware Loss（DAL）实现高频区域像素级监督，并构建了 HP-Image-40K 数据集，在人物-商品合成任务中显著超越现有方法的细节保真度。

#### 🎯 核心要点

- **HP-Image-40K 数据集**：利用 FLUX.1-Dev 生成 diptych（左商品右人物）图像，经 Sobel 边缘分割 + YOLO/CLIP 语义过滤 + InternVL 文本过滤，构建 40K 高质量人物-商品配对数据
- **高频图引导**：对参考商品图做 DFT 高通滤波提取高频细节图，与原图拼接后通过 Token Merging 送入 DiT，引导模型关注纹理/logo/文字等细节
- **Shared Enhancement Attention (SEA)**：在 DiT 每个 block 中引入可学习权重 \(\alpha_i\)，将参考图注意力特征融合到生成路径，参数共享仅新增一个标量，几乎零额外开销
- **Detail-Aware Loss (DAL)**：对预测图和 GT 分别做高通滤波后在 mask 区域计算 MSE，专门监督高频细节重建质量
- **SOTA 性能**：在 HP-Image-40K 测试集上 CLIP-I 95.0%、DINO 91.9%、SSIM-HF 42.9%，全面超越 AnyDoor、Paint-by-Example、PowerPaint 等方法

#### 🔬 深入细节

##### 框架总览

![HiFi-Inpaint 框架总览](https://ar5iv.labs.arxiv.org/html/2603.02210/assets/x2.png)
*图：HiFi-Inpaint 整体架构。左侧为高频图提取与 Token Merging，中间为基于 FLUX.1-Dev DiT 的生成主干（含 SEA 模块），右侧为 Detail-Aware Loss 的高频监督。*

HiFi-Inpaint 构建在 FLUX.1-Dev（一种 DiT 架构的文生图模型）之上。整体流程为：

1. **输入构造**：将参考商品图 \(I_{ref}\)、其高频图 \(H(I_{ref})\)、带 mask 的人物图 \(I_{masked}\) 分别编码为 token 序列，通过 Token Merging 拼接为统一输入
2. **DiT 生成**：在每个 DiT block 中，SEA 机制将参考图的注意力特征以可学习权重注入生成路径
3. **损失计算**：标准 MSE 重建损失 + DAL 高频细节损失联合优化

##### HP-Image-40K 数据集构建

![数据集统计](https://ar5iv.labs.arxiv.org/html/2603.02210/assets/x7.png)
*图：HP-Image-40K 的 mask 面积比分布直方图，覆盖从小面积到大面积的多样化场景。*

现有数据集（如 VITON-HD、DeepFashion）仅覆盖服装试穿场景，缺乏通用商品类别。HiFi-Inpaint 提出了一套自动化数据构建流水线：

1. **Diptych 生成**：使用 FLUX.1-Dev 生成"左侧商品 + 右侧人物持有/佩戴该商品"的双联图，确保左右两侧为同一商品的不同视角
2. **Sobel 边缘分割**：对 diptych 中线位置做 Sobel 边缘检测，自动定位分割线并裁切为独立的商品图和人物图。论文特别指出 Sobel 比 Canny 更适合此任务——Canny 检测所有边缘导致大量噪声，而 Sobel 仅响应强梯度方向，能精准定位中线

![Sobel vs Canny](https://ar5iv.labs.arxiv.org/html/2603.02210/assets/x3.png)
*图：Sobel 与 Canny 的对比。Canny 检测所有边缘导致噪声，Sobel 精准定位中线分割。*

3. **语义过滤**：YOLO 检测人物区域 + CLIP 计算商品-人物语义一致性，过滤不匹配的样本
4. **文本过滤**：InternVL 多模态模型判断商品图中是否包含文字/logo 等高频细节，优先保留含丰富细节的样本

最终数据集包含约 40K 对高质量 (商品图, 人物图, mask) 三元组，涵盖手表、包、鞋、手机等多种商品类别。

##### 高频图引导机制

传统参考图修复方法直接将参考图编码后送入生成模型，但 DiT 的自注意力机制倾向于捕获全局语义而忽略局部高频细节。HiFi-Inpaint 的核心洞察是：**显式提取高频信息作为额外条件，迫使模型关注纹理级细节**。

具体做法：对参考商品图 \(I_{ref}\) 做离散傅里叶变换（DFT），在频域中用高通滤波器滤除低频分量，再做逆 DFT 得到高频图 \(H(I_{ref})\)。高频图仅保留边缘、纹理、logo 等细节信息，去除了颜色和形状等低频语义。

Token Merging 将三路输入拼接：

$$\mathbf{z} = \text{Concat}[\text{Enc}(I_{masked}),\; \text{Enc}(I_{ref} \oplus H(I_{ref})),\; \text{Enc}(z_t)]$$

其中 \(I_{ref} \oplus H(I_{ref})\) 表示参考图与其高频图的通道拼接，\(z_t\) 为加噪的 GT latent。

##### Shared Enhancement Attention (SEA)

> 💡 **关键洞察**：参考图和生成图共享同一个 DiT backbone 的参数，但需要一种机制让参考图的注意力特征"增强"生成路径，而不引入大量新参数。

SEA 的设计极为精巧。在 DiT 的第 \(i\) 个 block 中：

1. 参考图 token 和生成图 token 共同经过同一个 block \(B_i\)，得到各自的输出
2. 对参考图的输出，用 mask \(M_{ds}\)（下采样到 latent 分辨率）提取 mask 区域的特征
3. 用一个**可学习标量** \(\alpha_i\) 加权后叠加到生成图的对应位置

公式表达：

$$z_i = B_i(z_{i-1}) + \alpha_i \cdot \text{Mask}(B_i(z'_{i-1}),\; M_{ds})$$

其中 \(z_{i-1}\) 是生成路径的第 \(i-1\) 层输出，\(z'_{i-1}\) 是参考路径的第 \(i-1\) 层输出，\(B_i\) 是共享的第 \(i\) 个 DiT block。

![SEA 可学习权重 vs 固定权重](https://ar5iv.labs.arxiv.org/html/2603.02210/assets/x4.png)
*图：可学习 \(\alpha_i\) vs 固定权重的对比。可学习权重让不同层自适应调节参考信息的注入强度，生成更自然的结果。*

> ⚠️ **注意**：SEA 的参数开销极低——整个模型仅新增 N 个标量参数（N 为 DiT block 数），所有注意力权重完全共享。这使得 HiFi-Inpaint 在 FLUX.1-Dev 基础上几乎不增加模型大小。

##### Detail-Aware Loss (DAL)

标准的 MSE 损失对所有像素一视同仁，但高频细节（logo 文字、纹理图案）仅占图像的少量像素，容易被低频区域的梯度淹没。DAL 专门针对这一问题：

$$\mathcal{L}_{DA} = \| H(\hat{I}_{gt}) \odot M - H(I_{gt}) \odot M \|_2^2$$

其中 \(H(\cdot)\) 是高通滤波操作，\(M\) 是 mask，\(\hat{I}_{gt}\) 是模型预测的去噪结果，\(I_{gt}\) 是 GT。

总损失为：

$$\mathcal{L} = \mathcal{L}_{MSE} + \mathcal{L}_{DA}$$

> 💡 **直觉理解**：DAL 相当于在频域空间中对 mask 区域做了一次"高频放大镜"——只关注预测图和 GT 在高频分量上的差异，迫使模型精确重建纹理和边缘。

##### 伪代码

```python
# HiFi-Inpaint 训练伪代码
for batch in dataloader:
    I_ref, I_gt, M = batch  # 参考商品图, GT人物图, mask
    
    # 1. 高频图提取
    H_ref = high_pass_filter(DFT(I_ref))  # 参考图高频
    
    # 2. 输入构造
    I_masked = I_gt * (1 - M)  # masked 人物图
    z_t = add_noise(VAE_encode(I_gt), t)  # 加噪 GT latent
    
    # 3. Token Merging
    tokens = concat(encode(I_masked), encode(I_ref, H_ref), encode(z_t))
    
    # 4. DiT Forward with SEA
    z_gen = z_t
    z_ref = encode(I_ref, H_ref)
    for i, block in enumerate(dit_blocks):
        z_gen = block(z_gen) + alpha[i] * mask_select(block(z_ref), M_ds)
    
    # 5. 损失计算
    I_pred = VAE_decode(z_gen)
    L_mse = MSE(I_pred * M, I_gt * M)
    L_da = MSE(high_pass(I_pred) * M, high_pass(I_gt) * M)
    loss = L_mse + L_da
    loss.backward()
```

##### 实验结果

![定性对比](https://ar5iv.labs.arxiv.org/html/2603.02210/assets/x5.png)
*图：与 AnyDoor、Paint-by-Example、PowerPaint、FLUX-Fill 的定性对比。HiFi-Inpaint 在 logo、文字、纹理等高频细节上保真度显著更高。*

**定量结果**（HP-Image-40K 测试集）：

| 方法 | CLIP-I ↑ | DINO ↑ | SSIM ↑ | SSIM-HF ↑ |
|------|----------|--------|--------|------------|
| AnyDoor | 89.3% | 72.1% | 53.1% | 28.3% |
| Paint-by-Example | 87.3% | 68.3% | 49.5% | 25.5% |
| PowerPaint | 91.1% | 79.1% | 56.2% | 33.3% |
| FLUX-Fill | 93.5% | 88.5% | 60.3% | 39.3% |
| **HiFi-Inpaint** | **95.0%** | **91.9%** | **63.4%** | **42.9%** |

其中 SSIM-HF 是论文提出的高频 SSIM 指标，专门衡量高频细节的重建质量。HiFi-Inpaint 在所有指标上均取得 SOTA。

**消融实验**（5 组配置 A→E）：
- 合成数据 vs 真实数据：合成数据训练效果更优（DINO +3.1%）
- DAL 贡献：加入 DAL 后 SSIM-HF 从 40.1% 提升到 41.7%
- SEA 贡献：加入 SEA 后 SSIM-HF 从 41.7% 进一步提升到 42.9%，DINO 从 90.0% 到 91.9%

**用户研究**：在 4 种方法的对比中，HiFi-Inpaint 获得 36-41% 的用户偏好率（4 选 1 中最高）。

![消融定性分析](https://ar5iv.labs.arxiv.org/html/2603.02210/assets/x6.png)
*图：消融实验定性结果。SEA 和 DAL 各自对细节保真度有明显贡献。*

##### 与现有方法的关键区别

| 维度 | 传统方法 (AnyDoor/PbE) | HiFi-Inpaint |
|------|----------------------|--------------|
| 参考图编码 | CLIP/DINOv2 语义编码，丢失高频 | 原图 + 高频图双路编码，保留纹理 |
| 注意力机制 | 独立编码器，参数不共享 | SEA 参数共享 + 可学习权重注入 |
| 损失函数 | 标准 MSE/感知损失 | MSE + DAL 高频专项监督 |
| 数据集 | 真实数据（类别受限） | 合成 diptych 数据（类别丰富） |
| 额外参数 | 通常需要独立适配器 | 仅 N 个标量 \(\alpha_i\) |

#### 🧪 练习题

```yaml
question: "HiFi-Inpaint 中 Shared Enhancement Attention (SEA) 的核心设计是什么？"
options:
  - "为参考图和生成图分别训练独立的注意力模块"
  - "在每个 DiT block 中用可学习标量权重将参考图注意力特征注入生成路径，参数完全共享"
  - "使用交叉注意力机制将参考图特征与文本 prompt 融合"
  - "在 VAE 解码器中加入参考图的跳跃连接"
answer: 1
explain: "SEA 的核心是参数共享——参考图和生成图经过同一个 DiT block，仅通过一个可学习标量 α_i 控制参考特征的注入强度，几乎零额外参数开销。"
```