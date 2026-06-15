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
CogAgent 在 CogVLM 上加入高分辨率视觉分支和跨注意力模块，使 VLM 能直接读懂 1120×1120 屏幕中的小字、图标和布局，并以截图为主完成 GUI 观察、定位和动作生成。

#### 🎯 核心要点
- **问题定位**：通用 VLM 的 224/448 低分辨率输入难以识别 GUI 中的小字号文本、密集图标和细粒度控件。
- **双分辨率架构**：低分辨率分支保留 CogVLM 的全局语义理解，高分辨率分支用较小视觉编码器处理 1120×1120 图像。
- **高分辨率 cross-module**：不把 6400 个高分辨率 patch 直接送进大语言解码器自注意力，而是在每层用较小 hidden size 做 cross-attention 作为补充。
- **GUI 专用预训练**：训练数据覆盖文本识别、视觉 grounding、网页 DOM/截图配对，尤其构建 Common Crawl Screenshot 数据来学习 GUI 元素。
- **与 AppAgent 的区别**：AppAgent 依赖 XML 元素编号和探索文档；CogAgent 更偏向用 VLM 本身直接理解屏幕并生成动作/坐标相关响应。

#### 🔬 深入细节
论文：*CogAgent: A Visual Language Model for GUI Agents*。核心图 Figure 2 展示了低分辨率 CogVLM 分支与高分辨率 cross-module 的组合架构，公开图源：https://ar5iv.labs.arxiv.org/html/2312.08914/assets/x1.png

CogAgent 以 CogVLM-17B 为基础，完整模型约 18B 参数。原始 CogVLM 使用 EVA2-CLIP-E 编码低分辨率图像，并通过 MLP adapter 把视觉特征映射到语言解码器空间。这个结构适合自然图像问答，但 GUI 场景中很多关键元素只有几十像素，例如搜索框内文字、状态栏图标、网页按钮标签；直接缩到 224×224 后信息消失。

最直接的高分辨率方案是把 1120×1120 图像切成 patch 后全部送入解码器，但 patch size 为 14 时会产生 \(L_{I_{\mathrm{hi}}}=6400\) 个视觉 token，解码器自注意力成本随序列长度平方增长：
\[
T_{\mathrm{original}}
=O((L_{I_{\mathrm{hi}}}+L_T)^2H_{\mathrm{dec}}d_{\mathrm{dec}}).
\]
CogAgent 的高分辨率 cross-module 避开了这个成本：低分辨率 token 仍参与主解码器自注意力，高分辨率 token 只作为每层 cross-attention 的 key/value 补充。

具体地，输入图像同时 resize 到 224×224 和 1120×1120。低分辨率特征 \(X_{\mathrm{lo}}\) 进入原 CogVLM，提供全局布局和物体语义；高分辨率特征 \(X_{\mathrm{hi}}\) 由较小 EVA2-CLIP-L 视觉编码器产生。第 \(i\) 层解码器先做主干 self-attention：
\[
X'_i=\mathrm{MSA}(\mathrm{LN}(X_{\mathrm{in}_i}))+X_{\mathrm{in}_i},
\]
再用 \(X_{\mathrm{hi}}\) 做 cross-attention：
\[
X_{\mathrm{out}_i}=\mathrm{MCA}(\mathrm{LN}(X'_i),X_{\mathrm{hi}})+X'_i.
\]
由于 cross-attention 的 hidden size 可设小，复杂度变为
\[
T_{\mathrm{improved}}
=O((L_{I_{\mathrm{lo}}}+L_T)L_{I_{\mathrm{hi}}}H_{\mathrm{cross}}d_{\mathrm{cross}}
+(L_{I_{\mathrm{lo}}}+L_T)^2H_{\mathrm{dec}}d_{\mathrm{dec}}),
\]
在实现中 \(L_{I_{\mathrm{lo}}}=256\)、\(L_{I_{\mathrm{hi}}}=6400\)，比直接高分辨率自注意力更可控。

训练数据按 GUI 所需能力组织。文本识别部分包括合成文档/自然图 OCR/学术文档；视觉 grounding 部分使用带实体框的图文数据，框坐标规范化到固定区间；GUI imagery 部分构建 CCS400K，从 Common Crawl 抽取网页、用 Playwright 截图并记录可见 DOM 元素和渲染框，形成大量 GUI referring expression generation/comprehension 样本。预训练先冻结大部分旧参数训练新高分辨率模块，再解冻视觉专家继续训练；之后用人工收集 GUI 截图、Mind2Web、AITW 和通用 VQA 数据做多任务对齐。

```text
Algorithm: CogAgent high-resolution GUI understanding
Input: screenshot I, user/task prompt q
1. Resize I to low resolution and high resolution.
2. Encode low-resolution image with the original CogVLM visual encoder.
3. Encode high-resolution image with the small high-res visual encoder.
4. Feed low-res visual tokens and text tokens into the VLM decoder.
5. At every decoder layer, cross-attend decoder hidden states to high-res tokens.
6. Autoregressively generate answer, element grounding, plan, or action text.
7. Fine-tune on GUI action datasets so outputs follow agent action formats.
```

CogAgent 的关键贡献是把 GUI agent 的瓶颈从“如何解析结构树”转向“VLM 是否能以足够分辨率看清屏幕”。它仍然可能在坐标精度、多步执行和可验证闭环上受限，但高分辨率视觉编码器让模型能够直接处理 HTML 不可得、OCR 不完整、canvas/iframe 等结构化文本难以覆盖的界面。

#### 🧪 练习题
1. 为什么 CogAgent 不直接把 1120×1120 的所有 patch 拼到语言模型输入中？
2. 高分辨率分支主要补足 GUI 的哪些信息？低分辨率分支还保留什么价值？
