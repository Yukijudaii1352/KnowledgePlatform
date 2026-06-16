### AIFS v2

```yaml
id: aifs_v2
name: AIFS v2
full_name: ECMWF人工智能预报系统v2 (AIFS v2)
year: '2026.05'
org: ECMWF
paper_url: https://www.ecmwf.int/en/about/media-centre/news/2026/significant-update-ecmwfs-key-forecasting-systems-ifs-and-aifs-go-live
category: meteo_ai
parent: gencast
motivation: 首个业务化AI海浪积雪预报系统
```

#### 📝 一句话总结

AIFS v2 是 ECMWF 在 2026-05-12 投入业务运行的第二代 AI 预报系统升级，把确定性 AIFS Single 与概率 AIFS ENS 同步扩展到数据驱动海浪、雪盖和 10 hPa 平流层预报，并通过新训练数据、变量约束和多尺度集合损失提升业务一致性。

#### 🎯 核心要点

- 业务上线时间：AIFS Single v2 与 AIFS ENS v2 均在 2026-05-12 06 UTC run 随 IFS Cycle 50r1 同步实施
- 新业务变量：首次提供 ECMWF operational data-driven wave forecasts，含 11 个海浪变量，并新增 snow cover fraction 预报
- Single v2：架构保持 AIFS Single v1.1 不变，主要升级训练制度，使用 ERA5 1979-2022 预训练与 2018-2024 operational/50r1 esuite analysis 微调
- ENS v2：从 AIFS ENS v1 升级为多尺度 proper-score 训练，加入与 Single 一致的变量 bounding、更多 decoder edges 与新 edge features
- 物理一致性：降水、云量、海浪、雪盖等诊断变量通过 bounding layer 或 fraction bounding 避免负值和内部不一致
- 分辨率与产品：N320 约 31 km，0.25° dissemination，15 天预报，6 小时间隔，每日 00/06/12/18 四次运行
- 10 hPa 平流层扩展：压力层从 13 层增至 14 层，补入 10 hPa，改善 50/100 hPa 技能并让 sudden stratospheric warming 能出现在 AIFS 预报中
- 来源限制：给定 paper_url 是 ECMWF 新闻页而非论文；方法级细节需结合 ECMWF AIFS v2 implementation pages、AIFS Single 1.1.0 GMD 论文、AIFS-CRPS 与 multi-scale loss 预印本解读

#### 🔬 深入细节

##### 来源与图示

![AIFS 编码器、处理器与解码器结构](https://arxiv.org/html/2406.01465v1/x3.png)
*图：AIFS 的 GNN encoder/decoder 与 transformer processor block 示意。AIFS Single v2 implementation page 明确说明 Single v2 不改变 v1.1 架构，因此该图仍可作为 Single v2 主体结构参考。来源：AIFS arXiv 论文 Figure 3。*

主要来源包括 ECMWF 新闻 `https://www.ecmwf.int/en/about/media-centre/news/2026/ifs-cycle-50r1-aifsv2-live`、AIFS Single v2 实施页 `https://confluence.ecmwf.int/display/FCST/Implementation%2Bof%2BAIFS%2BSingle%2Bv2`、AIFS ENS v2 实施页 `https://confluence.ecmwf.int/display/FCST/Implementation%2Bof%2BAIFS%2BENS%2Bv2`、AIFS 架构论文 `https://arxiv.org/html/2406.01465v1`、AIFS Single 1.1.0 GMD 论文 `https://gmd.copernicus.org/articles/19/4703/2026/` 与多尺度损失预印本 `https://arxiv.org/html/2506.10868v1`。

##### 系统定位：不是单篇论文，而是业务系统升级

AIFS v2 的目标不是提出一个全新 backbone，而是把 ECMWF 已经业务化的 AI 预报系统推进到更完整的地球系统变量集合。2026-05-12 的升级同时包含 IFS Cycle 50r1 和 AIFS v2：IFS 提供新的物理模式、耦合同化和初始场；AIFS v2 必须同步 fine-tune 到 50r1 的 analysis/esuite 数据，否则从新 IFS 初值启动会出现性能退化。

因此，AIFS v2 可以理解为三层升级：

1. **AIFS Single v2**：确定性中期预报，仍是 graph encoder/decoder + sliding-window transformer processor，重点更新训练数据和变量表。
2. **AIFS ENS v2**：集合预报，面向概率技能，使用 proper-score 训练，并把 v1 的 afCRPS 换成多尺度 loss。
3. **业务产品层**：新增 wave stream、snow cover fraction、10 hPa pressure level，并统一文件流、优先级和 dissemination 规则。

##### AIFS Single v2 的训练与推理流程

Single v2 与 AIFS 论文中的基本形式一致：输入两个相邻大气状态和静态/天文 forcing，输出 6 小时后的状态；15 天预报通过自回归 rollout 得到。

```python
# AIFS Single v2 确定性业务预报伪代码
def aifs_single_v2_forecast(ifs_control_analysis, forcings, lead_hours=360):
    # IFS control initial condition 被 regrid 到 N320，大约 0.25° / 31 km
    x_tm6, x_t = make_two_state_initial_window(ifs_control_analysis)
    outputs = []

    for lead in range(6, lead_hours + 1, 6):
        inputs = {
            "previous_state": x_tm6,
            "current_state": x_t,
            "forcings": forcings.at(lead),
        }
        raw = aifs_graph_transformer(inputs)

        # v2 变量表包含 atmospheric/land/wave prognostic variables
        # 以及 TP/CP/FSCOV/SSRD/cloud 等 diagnostic outputs
        y = apply_variable_bounds_and_fraction_constraints(raw)
        outputs.append(y)

        x_tm6, x_t = x_t, y

    return outputs
```

AIFS 主干使用 GNN encoder/decoder 处理原始格点与内部处理网格之间的信息映射，processor 使用 transformer block。GNN 的优势是能处理 ECMWF 的 reduced Gaussian grid 和不同输出网格；processor 则负责在 latent mesh 上传播天气系统。训练阶段先在 ERA5 上学习泛化动力，再用 operational analysis 和 50r1 esuite analysis 做 rollout fine-tuning，以贴近业务初值分布。

Single v2 implementation page 给出的关键训练参数是：ERA5 1979-2022 预训练 260,000 steps；2018-2024 operational analysis 与 IFS 50r1 esuite analysis 微调 7,900 steps；batch size 16；cosine learning rate schedule。它还说明架构不变，这意味着 v2 的收益主要来自数据分布更新、变量扩展、10 hPa 平流层和业务初值匹配，而不是重新设计网络。

##### AIFS ENS v2：从 afCRPS 到多尺度 proper score

AIFS ENS 的训练目标是让集合成员形成一个校准的预测分布。基础 CRPS 可以写成：

$$
\operatorname{CRPS}(F, y)
= \mathbb{E}_{X \sim F}|X-y|
- \frac{1}{2}\mathbb{E}_{X,X' \sim F}|X-X'|
$$

有限 \(M\) 个集合成员 \(\{x_m\}_{m=1}^{M}\) 时，经验形式是：

$$
\widehat{\operatorname{CRPS}}
= \frac{1}{M}\sum_{m=1}^{M}|x_m-y|
- \frac{1}{2M^2}\sum_{m=1}^{M}\sum_{n=1}^{M}|x_m-x_n|
$$

ENS v1 使用 afCRPS 来减少有限集合偏差；ENS v2 的 implementation page 明确写出把 afCRPS loss 替换为 multi-scale loss。多尺度思想是先用平滑算子 \(S_k\) 把场分解成大尺度与小尺度分量，再在各尺度上计算 proper score：

$$
\mathcal{L}_{multi}
= \sum_{k=1}^{K}\alpha_k\,
\operatorname{afCRPS}\left(S_k(\{x_m\}_{m=1}^{M}),\, S_k(y)\right)
$$

其中 \(S_1\) 可以是强平滑后的 synoptic-scale 场，\(S_2\) 是剩余的小尺度结构。这样训练不会只优化点位 CRPS，还能约束谱空间和空间尺度上的方差分布。ECMWF 的 multi-scale loss 论文把平滑算子实现为稀疏矩阵乘法，使用 Gaussian kernel，标准差为 8 倍网格距。

```python
# AIFS ENS v2 多尺度集合训练伪代码
def train_aifs_ens_v2(batch):
    members = []
    for seed in ensemble_seeds:
        member = rollout_shared_weights(
            initial_state=batch.initial_state,
            perturbation=sample_member_perturbation(seed),
            steps=12,  # rollout fine-tuning 到 72h
        )
        members.append(apply_variable_bounds(member))

    loss = 0.0
    for smoother, alpha in [(identity, 0.5), (gaussian_smooth_8dx, 0.5)]:
        pred_scale = [smoother(m) for m in members]
        target_scale = smoother(batch.analysis_target)
        loss += alpha * almost_fair_crps(pred_scale, target_scale)

    loss.backward()
    optimizer.step()
```

##### 变量 bounding：把物理约束放进模型输出层

AIFS Single 1.1.0 GMD 论文解释了 bounding layer 的动机：MSE 训练的神经网络会输出负降水、云量比例越界、convective precipitation 大于 total precipitation 等物理不可能情况。一个简单但有效的约束是：

$$
\hat{p} = \operatorname{ReLU}(\eta) = \max(0, \eta)
$$

对比例变量可用上下界映射：

$$
\hat{f} = \min(1, \max(0, \eta))
$$

对满足“部分不得超过总体”的变量，可用 fraction bounding：

$$
\widehat{cp} = \widehat{tp}\cdot \sigma(\eta_{cp})
$$

这样保证 \(\widehat{cp}\in[0,\widehat{tp}]\)。ENS v2 implementation page 说明它引入与 Single 一致的 variable bounds，因此集合成员不仅要概率校准，还要逐成员满足基本物理范围。

##### 海浪与雪盖：为什么是业务意义上的关键升级

新闻页和实施页都强调 v2 首次提供数据驱动 wave forecasts。Single v2 和 ENS v2 都新增 wave stream：Single 使用 `stream=wave`，ENS 使用 `stream=waef`。变量包含 significant wave height、mean wave period、mean wave direction、wave drag coefficient，以及多个周期段的 significant wave height。ECMWF 指出 Single v2 的 significant wave height 中期技能相较当前 operational IFS wave forecasts 和 IFS Cycle 50r1 wave model 约提升 10%，但南极夏季海冰边缘存在负偏差和 smoothing 问题。

雪盖方面，AIFS v2 新增 fraction of snow cover（FSCOV）作为诊断输出，ECMWF 新闻称其比 IFS Cycle 50r1 更接近观测。这里的算法意义在于：雪盖不是纯大气变量，它受地表温度、降水相态、土壤/地表状态和历史积雪共同影响。AIFS v2 把它纳入同一个自回归状态空间，使 land-atmosphere memory 能被网络利用。

##### 与 GenCast 的关系

元信息里把 AIFS v2 的 parent 指向 GenCast，更准确地说，AIFS ENS v2 与 GenCast 都属于“用生成/概率训练替代确定性均值”的路线，但实现不同。GenCast 每个 12 小时步长需要多次扩散去噪；AIFS ENS/CRPS 路线通过 proper score 直接训练随机集合成员，一步推理只需一次模型调用。AIFS v2 的多尺度 loss 进一步借鉴扩散模型的尺度控制直觉：不是靠噪声 schedule 显式分层，而是在 loss 中显式要求不同空间尺度都合理。

> 💡 关键：AIFS v2 的贡献主要在 operationalization。它把 AI 预报从“上层大气和常规地面变量的实验图”扩展到海况、雪盖、平流层和集合产品，并接入 ECMWF 的四次日常业务生产链。

#### 🧪 练习题

```yaml
- question: "AIFS ENS v2 相比 AIFS ENS v1 的关键训练变化是什么？"
  options:
    - "完全改用扩散采样，每步需要几十次去噪"
    - "把 afCRPS 替换为多尺度 proper-score loss，并加入变量 bounding"
    - "取消自回归 rollout，只预测 6 小时"
    - "只训练海浪变量，不再训练大气变量"
  answer: 1
  explain: "ECMWF implementation page 明确列出 ENS v2 的架构/训练变化：multi-scale loss、与 Single 一致的 variable bounding、修订图特征和更多 decoder edges。"
```
