### CogAgent
```yaml
id: cogagent
name: CogAgent
full_name: 认知智能体 (CogAgent)
year: '2024'
org: Tsinghua
paper_url: https://arxiv.org/abs/2312.08914
category: gui
parent: appagent
motivation: 高分辨率视觉编码器直接理解屏幕布局
```

#### 📝 一句话总结
CogAgent 在 CogVLM 基础上加入低分辨率全局分支和 1120×1120 高分辨率 cross-attention 分支，解决通用 VLM 看不清 GUI 小字、密集图标和细粒度控件的问题，使模型能仅凭截图完成读屏、定位和动作生成。

#### 🎯 核心要点
- **双分辨率 GUI VLM**：低分辨率 CogVLM 分支保留整体语义，高分辨率分支补充 GUI 文本和小控件细节。
- **高分辨率 cross-module**：高分辨率 token 不直接进入大语言解码器自注意力，而是在每层以较小 hidden size 做 cross-attention。
- **计算成本可控**：将高分辨率视觉序列作为 key/value 补充，避免直接把 6400 个 patch 拼进主序列导致二次方开销。
- **GUI 专用预训练**：围绕 OCR、visual grounding、网页截图-DOM 对构造数据，强化读字、定位和界面结构理解。
- **端到端截图操作**：在 Mind2Web、AITW 等 GUI 导航任务中，只用截图输入即可超过依赖 HTML 文本的 LLM 方法。

#### 🔬 深入细节

##### 框架总览

![CogAgent 高分辨率 cross-module 架构](https://ar5iv.labs.arxiv.org/html/2312.08914/assets/x1.png)
*图：CogAgent 使用原 CogVLM 低分辨率分支处理全局语义，同时用高分辨率视觉编码器通过 cross-attention 向每层解码器补充细粒度 GUI 信息。*

##### 算法流程

```python
# CogAgent 高分辨率 GUI 理解流程
def cogagent_infer(screenshot, prompt):
    image_low = resize(screenshot, (224, 224))
    image_high = resize(screenshot, (1120, 1120))

    low_tokens = cogvlm_visual_encoder(image_low)      # 全局布局和语义
    high_tokens = high_res_visual_encoder(image_high)  # 小字、图标、控件边界
    hidden = concat(low_tokens, text_embed(prompt))

    for layer in vlm_decoder_layers:
        hidden = layer.self_attention_with_visual_expert(hidden)
        hidden = hidden + layer.cross_attention(query=hidden, key=high_tokens, value=high_tokens)
        hidden = layer.ffn(hidden)

    return autoregressive_decode(hidden)  # 回答、grounding 坐标、下一步动作等
```

CogAgent 的出发点是 GUI 图像与自然图像很不一样。自然图像问答常用 224 或 448 分辨率还能抓住主体物体，但 GUI 任务的关键证据往往是按钮上的几个字、搜索框占位符、菜单项、状态栏图标和表格单元格。截图被压缩后，这些元素会先于布局语义丢失，因此单纯把通用 VLM 迁移到 GUI agent 会出现“看得到页面，却读不清可操作目标”的问题。

直接提高输入分辨率并不划算。若把 1120×1120 图像按 14×14 patch 切分，会得到 \(L_{I_{\mathrm{hi}}}=6400\) 个视觉 token；把它们拼入语言解码器后，自注意力复杂度近似为
$$
T_{\mathrm{direct}}=O\left((L_{I_{\mathrm{hi}}}+L_T)^2H_{\mathrm{dec}}d_{\mathrm{dec}}\right).
$$
这会让大解码器在大量视觉 patch 上做二次方计算，而 GUI 所需的高分辨率信息主要是文本和边界细节，并不一定需要与所有 token 做同等规模的深层自注意力。

CogAgent 因此采用“低分辨率主干 + 高分辨率补充分支”。低分辨率图像通过原 CogVLM 的 EVA2-CLIP-E 和 MLP adapter 进入视觉语言解码器，维持原模型的全局理解能力；高分辨率图像通过更小的 EVA2-CLIP-L 编码器生成细粒度 token。第 \(i\) 层先执行主干自注意力，再把当前 hidden state 作为 query 去 attend 高分辨率特征：
$$
X'_i=\mathrm{MSA}(\mathrm{LN}(X_i))+X_i,
$$
$$
X_{i+1}=\mathrm{MCA}(\mathrm{LN}(X'_i),X_{\mathrm{hi}})+X'_i.
$$
这里 \(\mathrm{MCA}\) 的 hidden size 可以显著小于主解码器 hidden size，使高分辨率分支更像一个逐层可查询的细节记忆，而不是把全部高分辨率 patch 变成昂贵的主序列。

这种结构的改进复杂度可写成
$$
T_{\mathrm{cross}}=O\left((L_{I_{\mathrm{lo}}}+L_T)L_{I_{\mathrm{hi}}}H_{\mathrm{cross}}d_{\mathrm{cross}}+(L_{I_{\mathrm{lo}}}+L_T)^2H_{\mathrm{dec}}d_{\mathrm{dec}}\right).
$$
在论文实现中 \(L_{I_{\mathrm{lo}}}=256\)、\(L_{I_{\mathrm{hi}}}=6400\)。主干仍只处理短的低分辨率视觉序列和文本序列，高分辨率信息通过线性于 \(L_{I_{\mathrm{hi}}}\) 的 cross-attention 注入，从而在读清小字和控制算力之间取得折中。

训练数据也围绕 GUI agent 的能力缺口设计。文本识别数据让模型识别不同字体、字号、方向和背景下的文字；visual grounding 数据让模型把文本描述与图像区域对齐；网页 GUI 数据则从 Common Crawl 渲染网页截图，并结合 DOM 可见元素和渲染框构造界面理解样本。预训练后再用人工收集 GUI 截图、Mind2Web、AITW 和通用 VQA 数据做多任务对齐，使模型既能回答界面问题，也能输出元素位置或下一步动作。

与 AppAgent 的差异在于，AppAgent 主要依赖 Android XML 元素编号和探索文档来降低动作选择难度，而 CogAgent 把瓶颈放在模型自己的视觉读屏能力上。它不要求页面提供可靠 DOM/XML，也不需要先枚举候选元素；只要截图里能看清目标，模型就有机会直接生成定位或动作。这为后续 SeeClick、UGround、Aguvis 等纯视觉 GUI agent 提供了基础路线。

> 💡 关键：CogAgent 不是简单“把图片放大”，而是把高分辨率信息从主解码器自注意力中拆出来，作为每层可查询的细粒度视觉证据。

#### 🧪 练习题
```yaml
question: "CogAgent 为什么采用高分辨率 cross-module，而不是把 1120×1120 的所有 patch 直接拼入语言模型输入？"
options:
  - "因为 GUI 中不需要全局布局信息"
  - "因为直接拼入会让大解码器自注意力成本随视觉 token 数二次方增长"
  - "因为 cross-module 可以完全替代低分辨率视觉编码器"
  - "因为模型只需要输出分类标签，不需要生成文本"
answer: 1
explain: "高分辨率截图会产生大量 patch。CogAgent 让这些 patch 作为 cross-attention 的 key/value 补充细节，避免主解码器在长视觉序列上承担二次方自注意力开销。"
```
