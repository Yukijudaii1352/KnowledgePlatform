### HAMT
```yaml
id: hamt
name: HAMT
full_name: 历史感知多模态Transformer (HAMT)
year: '2021'
org: Baidu
paper_url: https://arxiv.org/abs/2110.13309
category: vln
parent: vln_bert
motivation: 全Transformer架构分层编码历史观测
```

#### 📝 一句话总结
HAMT 不再把历史压成一个循环状态，而是用层次化视觉 Transformer 显式编码所有过去全景观测，再与指令和当前观测做跨模态融合来预测下一步动作。

#### 🎯 核心要点
- **核心问题**：VLN-BERT 的 state token 省计算但会压缩历史，长路径、返回路径、对话导航等任务需要更完整的过去观测。
- **层次化历史编码**：先在每个 panorama 内建模 36 个 view 的空间关系，再跨时间步建模 panorama 序列，复杂度从 flatten 的 \(O(t^2K^2)\) 降到 \(O(tK^2+t^2)\)。
- **三路输入融合**：文本、历史、当前观测分别用 unimodal transformer 编码，再通过 cross-modal transformer 融合。
- **代理任务更丰富**：除 MLM/MRM/ITM 外，HAMT 引入单步动作预测/回归 SAP/SAR 和空间关系预测 SPREL，让模型在预训练阶段学习导航决策和空间几何。
- **适合长程导航**：在 R4R、R2R-Back、CVDN 等长轨迹或需要回忆过去的任务上，显式历史比单向递推状态更有优势。

#### 🔬 深入细节
论文：*History Aware Multimodal Transformer for Vision-and-Language Navigation*。核心图 Figure 1 展示了 HAMT 同时编码文本、完整历史和当前观测再预测下一动作的架构，公开图源：https://ar5iv.labs.arxiv.org/html/2110.13309/assets/figures/model_architecture.png

HAMT 将 VLN 写成部分可观测决策问题。给定指令 \(\mathcal{W}\)、历史 \(\mathcal{H}_t=([\mathcal{O}_1;a^h_1],\dots,[\mathcal{O}_{t-1};a^h_{t-1}])\)、当前 panorama \(\mathcal{O}_t\) 和候选动作集合 \(\mathcal{O}^c_t\)，学习策略
\[
\pi(a_t\mid \mathcal{W},\mathcal{H}_t,\mathcal{O}_t,\mathcal{O}^c_t;\Theta).
\]
这里 \(\mathcal{O}_t\) 包含 \(K=36\) 个视角，每个视角由视觉特征和相对角度组成。

文本编码是标准 BERT 风格：word embedding、position embedding 和 type embedding 相加后送入语言 Transformer。当前观测编码把视觉特征、方向角和 token 类型组合起来：
\[
o_i=\mathrm{LN}(W^o_v v^o_i)+\mathrm{LN}(W^o_a E^A_{a^o_i})+E^N_{o_i}+E^T_1,
\]
其中 \(E^N\) 区分可导航、不可导航和 stop token，方向特征 \(E^A\) 常由 \((\sin\theta,\cos\theta,\sin\phi,\cos\phi)\) 表示。

历史编码是 HAMT 的核心。最直接的 flatten 方法会把 \(t\) 个历史 panorama 的 \(tK\) 个 view 全部作为 token，复杂度约 \(O(t^2K^2)\)，长程导航难以承受；只取每步朝向 view 的 temporal-only 方法又会丢掉侧面地标。HAMT 因此先用 ViT 和 panoramic transformer 在单个 panorama 内学习空间关系，池化为一个 panorama 表征，再加上该步动作方向、step embedding 和 type embedding 得到历史 token：
\[
h_i=\mathrm{LN}(W^h_v v^h_i)+\mathrm{LN}(W^h_a E^A_{a^h_i})+E^S_i+E^T_2.
\]
随后跨时间的历史 Transformer 编码 \((h_1,\dots,h_{t-1})\)。这种 factorized 设计的复杂度为 \(O(tK^2+t^2)\)，既保留过去 panorama 内的空间信息，又避免全展开注意力过重。

跨模态阶段把历史和当前观测作为视觉模态，与文本模态进入 dual-stream cross-modal transformer。每层先做 vision-to-text 和 text-to-vision cross-attention，再做各自的 self-attention 和前馈网络。输出包含文本 `[cls]`、历史 `[cls]` 和当前候选 view 表征。默认动作头沿用 SAP：对每个候选 \(o'_i\) 计算与文本 `[cls]` 的匹配并 softmax：
\[
p_t(o'_i)=
\frac{\exp(f_{\mathrm{SAP}}(o'_i\odot x'_{\mathrm{cls}}))}
{\sum_j \exp(f_{\mathrm{SAP}}(o'_j\odot x'_{\mathrm{cls}}))}.
\]

训练分两层。预训练/代理任务阶段先冻结 ImageNet 预训练 ViT，训练其余模块，再解冻 ViT 端到端训练，避免一开始破坏视觉特征。任务包括 MLM、MRM、ITM，以及导航专用的 SAP/SAR 和 SPREL。SAP 的分类损失为
\[
\mathcal{L}_{\mathrm{SAP}}=-\log p_t(o'_\star),
\]
SPREL 则随机取 panorama 中两个 view，预测相对 heading/elevation：
\[
\mathcal{L}_{\mathrm{SPREL}}
=(\hat\theta_{ij}-\theta_{ij})^2+(\hat\phi_{ij}-\phi_{ij})^2.
\]
随后用 RL+IL 微调序列策略，A3C 采样动作，IL 继续约束专家动作。论文中的更新形式把 policy gradient 与专家 log-likelihood 相加，\(\lambda\) 控制 imitation 项权重。

```text
Algorithm: HAMT decision step
Input: instruction W, history panoramas H_t, current panorama O_t
1. Encode W with language Transformer.
2. For each past panorama:
   a. Encode 36 views with ViT and panorama Transformer.
   b. Pool to one panorama token and add action/step/type embeddings.
3. Encode the sequence of history tokens with temporal Transformer.
4. Encode current 36-view observation plus stop token.
5. Fuse text, history, and current observation with cross-modal Transformer.
6. Score each navigable candidate using SAP action head.
7. Select next action, append current observation/action into history.
```

HAMT 的工程成本高于 VLN-BERT，因为它显式保留了更多历史 token；但它把“记忆”从不可解释的单向状态变成可注意的历史序列。在需要回到起点的 R2R-Back 或长指令 R4R 中，这种差异特别明显：模型能重新查看过去看到过的 panorama，而不是依赖一个被连续覆盖的 hidden state。

#### 🧪 练习题
1. HAMT 为什么要先做 panorama 内空间编码，再做时间编码？如果顺序反过来会有什么问题？
2. SPREL 不使用语言标签也能帮助 VLN，原因是什么？
