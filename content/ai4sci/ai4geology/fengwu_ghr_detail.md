### FengWu-GHR

```yaml
id: fengwu_ghr
name: FengWu-GHR
full_name: 风乌高分辨率 (FengWu-GHR)
year: '2026'
org: Shanghai AI Lab
paper_url: https://arxiv.org/abs/2402.00059
category: meteo_ai
parent: pangu_weather
motivation: 11.25天预报突破10天天花板
```

#### 📝 一句话总结

FengWu-GHR 提出把低分辨率预训练全球天气模型通过 SIME 分解映射、DCTL 局地区域增强和逐步 LoRA 微调迁移到 0.09° 约 9 km 全球高分辨率预报，在保持中期稳定性的同时补足小尺度天气结构。

#### 🎯 核心要点

- 全球 9 km 级分辨率：论文称 FengWu-GHR 是首个运行在 0.09° 经纬网格上的数据驱动全球中期天气预报模型
- 低分辨率到高分辨率迁移：先在 ERA5 1979-2021 的低分辨率长期资料上预训练，再用 2016-2021 高分辨率 operational analysis 做迁移学习
- Meta model：以 2D patch embedding、stacked transformer blocks、deconvolution recovery 为核心，处理 5 个上层变量的 13 个气压层和 4 个地面变量
- SIME：Spatial Identical Mapping Extrapolate 将高分辨率场拆成多个空间位置一致的低分辨率子场，避免直接插值造成 token 代表面积不一致
- DCTL/RES：Decompositional and Combinational Transfer Learning 在 transformer 中插入 Regional Enhanced Simulation 局部注意力模块，学习 patch 内小尺度对流和地形相关结构
- 逐步 LoRA：每个 6 小时 rollout step 使用独立 low-rank adaptation 参数，纠正长时效滚动中的 step-specific bias
- 评估设计：2022 年 operational analysis 和全球站点观测验证，论文报告 FengWu-GHR 在多数变量、多个 lead time 上优于 IFS-HRES 与 Pangu-Weather
- 工程代价：模型参数超过 4B；核心贡献不是简单扩大网络，而是把低分辨率知识以较低增量成本迁移到高分辨率业务分析场

#### 🔬 深入细节

##### 来源与图示

![FengWu-GHR 方法结构](https://ar5iv.labs.arxiv.org/html/2402.00059v1/assets/x1.png)
*图：FengWu-GHR 的四段流程：低分辨率预训练、SIME 高分辨率外推、DCTL 区域增强迁移学习、逐步 LoRA 长时效修正。来源：arXiv HTML 版论文 Figure 1。*

主要来源是 arXiv 论文 `https://arxiv.org/html/2402.00059v1` 与 Shanghai AI Lab PDF 镜像 `https://img.shlab.org.cn/pjlab/files/2024/03/638451437340550000.pdf`。给定 YAML 的 `year: '2026'` 与 arXiv 提交时间 2024-01-28 不完全一致；本文按任务元信息保留年份，同时方法内容基于可访问论文正文。

##### 为什么高分辨率 AI 天气预报困难

Pangu-Weather、GraphCast、FengWu 等模型证明了 0.25° 级别 AI 预报的能力，但 9 km 全球预报有两个更硬的问题。第一，训练数据少：ERA5 提供长期再分析，但 9 km operational analysis 在 ECMWF 体系里主要从 2016 年以后可用，时间跨度远短于 40 年级别的 ERA5。第二，计算成本陡增：经纬分辨率从 0.25° 提高到 0.09°，格点数约增加 7-8 倍，注意力或图传播的显存与计算都会迅速膨胀。

直接训练一个 9 km 全球 transformer 既缺数据也缺算力；把低分辨率预报再插值到高分辨率又无法恢复小尺度天气过程。FengWu-GHR 的路线是“继承低分辨率动力学 + 小成本补学习高分辨率残差”：先学多年低分辨率大尺度演化，再让高分辨率输入以低分辨率模型熟悉的空间语义进入网络，最后用局部模块和 LoRA 修正高分辨率细节与长时效偏差。

##### Meta model：可迁移的基础预报器

论文的 meta model 接收一个堆叠天气状态 \(X_t\)，输出 6 小时后的状态 \(\hat{X}_{t+1}\)。变量集合包括：

- 上层变量：geopotential \(z\)、specific humidity \(q\)、zonal wind \(u\)、meridional wind \(v\)、air temperature \(t\)，每个变量 13 个 pressure levels
- 地面变量：2 m temperature、10 m u/v wind、mean sea level pressure

基础结构是 ViT 风格：

$$
Z_0 = \operatorname{PatchEmbed}(X_t),\quad
Z_{\ell+1} = \operatorname{TransformerBlock}_{\ell}(Z_\ell),\quad
\hat{X}_{t+1} = \operatorname{DeconvRecover}(Z_L)
$$

为了控制高分辨率成本，论文没有使用全局密集注意力，而是交替使用 local-window 与 global-window interaction，并把窗口形状逐步设为 square、zonal rectangle、meridional rectangle，以注入天气带状环流和经纬方向差异的先验。

##### SIME：把高分辨率场拆成低分辨率语义一致的子场

低分辨率 patch embedding 的卷积核学到的是“一个 token 代表多大地理面积”。如果把 0.09° 输入直接送入低分辨率预训练模型，同样大小的卷积核只覆盖更小真实面积，token 语义会错位。SIME 的做法是将高分辨率场 \(X^{HR}\) 分解为 \(r^2\) 个低分辨率子场，每个子场抽取同一相对位置的格点：

$$
X^{LR}_{a,b}[i,j] = X^{HR}[ri+a, rj+b],\quad a,b \in \{0,\ldots,r-1\}
$$

这样 \(X^{LR}_{a,b}\) 的相邻 token 间距恢复为低分辨率模型训练时熟悉的空间尺度。模型分别预测每个子场，再按原始相对位置组合回高分辨率输出：

$$
\hat{X}^{HR}[ri+a, rj+b] =
f_{\theta}(X^{LR}_{a,b})[i,j]
$$

SIME 的收益是把一次超大高分辨率推理转成一批低分辨率语义一致的推理，论文称计算复杂度可降低到直接处理高分辨率序列的约九分之一。但 SIME 本身仍会忽略同一高分辨率 patch 内相邻格点之间的小尺度相互作用，因此还需要 DCTL。

##### DCTL 与 RES：补回小尺度天气过程

Decompositional and Combinational Transfer Learning 的核心是：先用 SIME 分解，让基础模型能运行；在若干 transformer block 后插入 Regional Enhanced Simulation 模块，让分解后的 token 暂时回到原始高分辨率空间布局，在局部窗口内做 attention，再变回分解序列继续前向。

```python
# FengWu-GHR 前向传播伪代码
def fengwu_ghr_forward(x_hr, step_id):
    # 1. SIME: 高分辨率场按相对格点位置拆成多个低分辨率子场
    subfields = spatial_identical_mapping_decompose(x_hr, ratio=3)
    tokens = patch_embed(subfields)

    # 2. 低分辨率预训练 transformer 主干
    for block_id, block in enumerate(meta_transformer_blocks):
        tokens = block(tokens)

        # 3. DCTL/RES: 在少数层恢复局部高分辨率布局，学习 patch 内小尺度关系
        if block_id in res_insert_layers:
            grid = rearrange_tokens_to_hr_layout(tokens)
            grid = regional_enhanced_attention(grid, window_size=(w_lat, w_lon))
            tokens = rearrange_hr_layout_to_tokens(grid)

    # 4. Step-specific LoRA: 对每个 rollout 步使用独立低秩修正
    tokens = apply_lora_for_step(tokens, step_id)
    pred_subfields = deconv_recover(tokens)

    # 5. 组合回 0.09° 高分辨率全球场
    return spatial_identical_mapping_combine(pred_subfields)
```

RES 模块的意义在于让同一个高分辨率 patch 内的格点重新交互。没有 RES 时，SIME 把 patch 内不同相对位置拆到不同 batch 元素中，模型只能分别处理它们，容易丢失对流单体、地形降水、锋面细节等局地结构。RES 用少量局部注意力模块弥补这一点，避免完全训练一个昂贵的高分辨率全局 transformer。

##### 逐步 LoRA：为长时效滚动分配不同偏差修正

FengWu-GHR 的基础步长是 6 小时。10 天预报需要 40 次自回归调用，11.25 天则需要 45 次。不同 lead time 的误差形态并不相同：前几步主要受初值与高频调整影响，中后期会出现系统性 bias drift 和振幅衰减。用同一套微调参数修正所有 step 会产生冲突。

论文为每个 step \(s\) 引入独立 LoRA：

$$
W_s = W_0 + \alpha B_s A_s,\quad
B_s \in \mathbb{R}^{d \times r},\quad
A_s \in \mathbb{R}^{r \times k},\quad r \ll \min(d,k)
$$

其中 \(W_0\) 是冻结的预训练权重，只有 \(A_s,B_s\) 可训练。前向传播变为：

$$
h' = W_0 h + \alpha B_s A_s h
$$

这给每个 lead step 一个低成本、互不冲突的修正空间。相比全量微调，它避免破坏低分辨率预训练动力学；相比共享微调，它允许第 5 天和第 10 天使用不同偏差修正。

##### 损失与评估指标

训练目标可写成面积加权误差。对变量 \(v\)、格点 \(i,j\)、纬度权重 \(a_i \propto \cos(\phi_i)\)：

$$
\mathcal{L}_{forecast}
= \sum_{v}\lambda_v
\frac{\sum_{i,j} a_i
\left(\hat{X}_{v,i,j}-X_{v,i,j}\right)^2}
{\sum_{i,j} a_i}
$$

评估中常用纬度加权 RMSE：

$$
\operatorname{RMSE}_{v}(\tau)
= \sqrt{
\frac{1}{T}
\sum_t
\frac{\sum_{i,j} a_i
\left(\hat{X}_{t+\tau,v,i,j}-X_{t+\tau,v,i,j}\right)^2}
{\sum_{i,j} a_i}}
}
$$

以及 ACC：

$$
\operatorname{ACC}_{v}(\tau)
=
\frac{\sum_{i,j}a_i(\hat{X}_{v,i,j}-C_{v,i,j})(X_{v,i,j}-C_{v,i,j})}
{\sqrt{\sum_{i,j}a_i(\hat{X}_{v,i,j}-C_{v,i,j})^2}
\sqrt{\sum_{i,j}a_i(X_{v,i,j}-C_{v,i,j})^2}}
$$

论文在 2022 年 operational analysis 上与 IFS-HRES 对比，并在 NCEI 全球站点数据上验证 2 m temperature 和 surface wind。结果部分报告 10 天 T850 RMSE 从 IFS-HRES 的 3.76 降至 FengWu-GHR 的 2.86，并强调在站点温度预报、热浪和冬季风暴案例中高分辨率带来更细粒度的空间结构。

##### 与 Pangu-Weather 的区别

Pangu-Weather 的核心是 3D Earth-Specific Transformer 和多时效层次聚合，主要解决三维大气表示与迭代误差问题；FengWu-GHR 的核心是跨分辨率迁移。它不只是把 0.25° 预报插值到 0.09°，而是在高分辨率 operational analysis 上学习 patch 内局地关系，并用逐步 LoRA 稳定长时效滚动。

> 💡 关键：FengWu-GHR 的方法论可以概括为“低分辨率学大尺度物理，高分辨率学局地残差，LoRA 学 lead-time 偏差”。这正是高分辨率 AI 预报在数据不足与算力受限下的折中。

#### 🧪 练习题

```yaml
- question: "FengWu-GHR 中 SIME 的主要作用是什么？"
  options:
    - "把高分辨率场直接插值成低分辨率输出，减少产品文件大小"
    - "把高分辨率输入拆成空间语义一致的低分辨率子场，使低分辨率预训练模型可以合理外推到 0.09°"
    - "用随机噪声生成多个集合成员"
    - "替代所有 transformer block，改用纯卷积网络"
  answer: 1
  explain: "SIME 解决高分辨率输入下 patch token 代表面积与预训练阶段不一致的问题；它把 HR 场按相对位置拆成 LR 子场，再组合回 HR 输出。"
```
