### Pangu-Weather

```yaml
id: panguweather
name: Pangu-Weather
full_name: 盘古气象 (Pangu-Weather)
year: '2023'
org: Huawei Cloud
paper_url: https://www.nature.com/articles/s41586-023-06185-3
category: materials_weather
parent: —
motivation: 3D Transformer首超传统数值预报精度
```

#### 📝 一句话总结

Pangu-Weather 提出了面向全球中期天气预报的 3D Earth-Specific Transformer，把高空多气压层和地表变量统一为三维气象体，并用分层时间聚合减少自回归误差累积，解决了早期 AI 天气模型速度快但精度难以超过传统 NWP 的问题。

#### 🎯 核心要点

- **三维气象建模**：将 13 个气压层上的 5 个高空变量与 4 个地表变量组织为 \(1{,}440 \times 721 \times 69\) 的全球状态，而不是把每个气压层当作独立二维图像
- **3DEST 架构**：基于 Swin Transformer 的 encoder-decoder，使用 3D window attention、shifted window、patch embedding 和 patch recovery 处理经纬度与垂直层级
- **Earth-specific positional bias**：用依赖气压层和纬度绝对位置的可学习偏置替代普通相对位置偏置，编码地球曲率、纬向差异和气象变量的绝对地理依赖
- **四个 lead-time 专用模型**：分别训练 1 h、3 h、6 h、24 h 预测模型，每个模型约 64M 参数，合计约 256M 参数
- **分层时间聚合**：推理时用贪心策略优先调用最大可用步长模型，例如 7 天预报可由 7 次 24 h 模型完成，而不是大量 1 h 迭代
- **ERA5 高分辨率训练**：使用 1979-2017 年 ERA5 小时级再分析数据，空间分辨率为 \(0.25^\circ \times 0.25^\circ\)
- **变量加权 MAE 训练**：对不同变量单独归一化，并用变量权重平衡 Z、Q、T、U、V、MSLP、U10、V10、T2M 等字段的损失贡献
- **与 ECMWF IFS 对比**：在论文设定的 reanalysis 初始化下，多数确定性预报指标优于 operational IFS，并且推理速度快四个数量级以上

#### 🔬 深入细节

##### 架构总览

![Pangu-Weather 3DEST 与分层时间聚合](https://media.springernature.com/lw685/springer-static/image/art%3A10.1038%2Fs41586-023-06185-3/MediaObjects/41586_2023_6185_Fig1_HTML.png)
*图：Nature 论文 Fig. 1，展示 3D Earth-Specific Transformer 的 encoder-decoder 结构，以及由 FM1/FM3/FM6/FM24 组成的分层时间聚合推理策略。*

论文正文和图像来源为 Nature 文章 `https://www.nature.com/articles/s41586-023-06185-3`；官方实现与模型信息也发布在 `https://github.com/198808xc/Pangu-Weather`。

##### 核心流程伪代码

```python
# Pangu-Weather 推理流程的高层伪代码
LEAD_MODELS = {
    24: FM24,  # 预测 t + 24 h
     6: FM6,
     3: FM3,
     1: FM1,
}

def pangu_forecast(A_t0, lead_hours):
    # A_t0: 高空变量 + 地表变量构成的全球天气状态
    state = A_t0
    remaining = lead_hours
    trajectory = []

    while remaining > 0:
        step = max(dt for dt in [24, 6, 3, 1] if dt <= remaining)
        state = LEAD_MODELS[step](state)
        trajectory.append((step, state))
        remaining -= step

    return state, trajectory

def train_one_model(dataset, lead_hours, model):
    for A_t in dataset:  # ERA5 hourly reanalysis, 1979-2017
        target = load_state(time=A_t.time + lead_hours)
        pred = model(normalize(A_t))
        loss_upper = weighted_mae(pred.upper_air, target.upper_air)
        loss_surface = weighted_mae(pred.surface, target.surface)
        loss = loss_upper + 0.25 * loss_surface
        loss.backward()
        optimizer.step()
```

##### 动机：为什么二维天气网络不够

全球天气预报的状态不是一张普通图片。高空变量在多个压力层上相互耦合，风场、温度、湿度和位势高度的垂直结构共同决定锋面、气旋和急流的演化；同时，纬度、经度、地形、海陆分布会强烈影响局地气象统计。早期 AI 天气模型常把变量或压力层堆成通道，使用二维卷积、Fourier operator 或二维 Transformer 处理，这会弱化垂直方向的显式建模。

Pangu-Weather 的核心选择是把高空变量组织成三维体。论文中高空输入为 \(13 \times 1440 \times 721 \times 5\)，对应 13 个压力层、经度、纬度和 5 个高空变量；地表输入为 \(1440 \times 721 \times 4\)。经过 patch embedding 后，高空 patch 的大小为 \(2 \times 4 \times 4\)，地表 patch 的大小为 \(4 \times 4\)，二者拼接成 \(8 \times 360 \times 181 \times C\) 的隐表示，其中 \(C=192\)。

> 💡 关键：这里的“3D”不是可视化噱头，而是让注意力窗口直接跨压力层、纬度和经度建模，使网络能学习垂直层间耦合。

##### 3D Earth-Specific Transformer

3DEST 沿用 Swin Transformer 的局部窗口注意力和 shifted window 思路，但窗口在三维体上划分。对一个窗口内 token 表示 \(X\)，标准注意力可写成：

$$
\mathrm{Attn}(Q,K,V)
= \mathrm{Softmax}\left(\frac{QK^\top}{\sqrt{d}} + B_{\mathrm{earth}}\right)V
$$

其中 \(B_{\mathrm{earth}}\) 是 Pangu-Weather 的关键改动。普通 Swin Transformer 的相对位置偏置默认同样的相对位移在任意图像位置含义相同；但地球上不同纬度的经线间距不同，气象变量也有强烈的纬向和垂直分布规律。因此论文让偏置依赖压力层窗口索引和纬度窗口索引，且经度方向共享偏置以保留周期性：

$$
B_{\mathrm{earth}}
= B_{m_{\mathrm{pl}},m_{\mathrm{lat}}}
\left[
h'_1 + h'_2 W_{\mathrm{pl}},
\lambda'_1-\lambda'_2+W_{\mathrm{lon}}-1,
\phi'_1+\phi'_2 W_{\mathrm{lat}}
\right]
$$

这里 \(m_{\mathrm{pl}}\) 和 \(m_{\mathrm{lat}}\) 定位全局压力层/纬度窗口，\((h',\lambda',\phi')\) 是窗口内部坐标。这个偏置不会改变 attention 的计算复杂度，但给模型提供了更贴近地球几何的归纳偏置：同样的局部天气模式在赤道、中纬度和极区不应完全共享位置先验。

##### Encoder-decoder 与变量恢复

模型先把原始物理变量归一化并嵌入为 latent tokens。前 2 个 encoder layer 保持 \(8 \times 360 \times 181 \times C\) 分辨率，后 6 个 encoder layer 通过下采样变为 \(8 \times 180 \times 91 \times 2C\)；decoder 对称恢复分辨率，并使用 encoder 到 decoder 的特征拼接。最后 patch recovery 把隐表示还原为原始高空变量和地表变量。

训练目标使用变量加权 MAE。若 \(v\) 表示变量，\(\hat{A}^{v}_{i,j,t+\Delta t}\) 是预测值，\(A^{v}_{i,j,t+\Delta t}\) 是 ERA5 目标值，可以简化表示为：

$$
\mathcal{L}
=
\sum_{v \in \mathcal{V}_{upper}}
\alpha_v
\left\|
\hat{A}^{v}_{t+\Delta t}-A^{v}_{t+\Delta t}
\right\|_1
+
0.25
\sum_{v \in \mathcal{V}_{surface}}
\alpha_v
\left\|
\hat{A}^{v}_{t+\Delta t}-A^{v}_{t+\Delta t}
\right\|_1
$$

论文为不同变量设置不同权重，例如高空变量 Z、Q、T、U、V 和地表变量 MSLP、U10、V10、T2M 分别加权，以避免某些量纲或方差较大的字段主导优化。评估时则使用天气领域常见的纬度加权 RMSE 和 ACC：

$$
\mathrm{RMSE}(v,t)
=
\sqrt{
\frac{
\sum_i\sum_j L(i)
\left(\hat{A}^{v}_{i,j,t}-A^{v}_{i,j,t}\right)^2
}{
N_{\mathrm{lat}}N_{\mathrm{lon}}
}
}
$$

其中 \(L(i)\) 与纬度 \(\phi_i\) 的 \(\cos \phi_i\) 成正比，用来修正经纬度网格在高纬地区面积变小的问题。

##### 分层时间聚合：减少自回归误差累积

中期预报需要把模型反复滚动到数天之后。若只训练 1 小时模型，7 天预报要迭代 168 次，每一步的小误差都会进入下一步输入。Pangu-Weather 训练 1 h、3 h、6 h、24 h 四个模型，推理时把目标 lead time 分解为尽量少的长步长调用：

$$
\Delta t
=
24 n_{24} + 6 n_6 + 3 n_3 + n_1,
\qquad
n_{24},n_6,n_3,n_1 \in \mathbb{N}
$$

例如 \(168\) 小时预报只需要 \(7\) 次 FM24；\(31\) 小时可以分解为 \(24+6+1\)。这种贪心策略牺牲了一点模型一致性，因为不同 lead-time 模型并非同一个动力系统的精确时间步，但显著减少了迭代次数和误差传播链条。

##### 与传统 NWP 和其他 AI 天气模型的区别

传统 NWP 显式离散大气动力学方程，并用超算推进状态，优势是物理约束强、可解释性高，但计算昂贵且需要大量参数化处理未解析尺度。Pangu-Weather 不求解 PDE，而是从 ERA5 学习状态转移函数：

$$
\hat{\mathbf{A}}_{t+\Delta t}
=
f_{\theta,\Delta t}(\mathbf{A}_t)
$$

这使它在 GPU 上推理极快，适合生成大量情景或作为 NWP 的补充。与 FourCastNet 等二维或频域模型相比，Pangu-Weather 的 3DEST 更强调垂直层间耦合和地球位置先验；与后来的 GraphCast 相比，它仍在经纬度规则网格上使用 Transformer，而不是转到球面多尺度图网格。

论文也明确指出局限：模型主要在 reanalysis 初始化和目标上评估，真实业务预报输入与 ERA5 存在分布差异；降水等变量未纳入主模型；回归式 AI 预报容易平滑极端值；多 lead-time 模型混用可能带来时间不一致。理解这些边界条件很重要，因为 Pangu-Weather 的贡献不是“完全替代物理预报”，而是证明高分辨率数据驱动模型能在中期确定性预报上达到甚至超过强 NWP 基线。

#### 🧪 练习题

```yaml
question: "Pangu-Weather 使用分层时间聚合的主要目的是什么？"
options:
  - "让所有天气变量共享同一个归一化常数"
  - "用更少的自回归调用达到目标预报时长，从而减轻误差累积"
  - "把经纬度网格替换为非结构化三角网格"
  - "强制模型只输出地表变量，不预测高空变量"
answer: 1
explain: "Pangu-Weather 训练 1 h、3 h、6 h、24 h 四类模型，推理时优先使用最大可用步长模型分解目标 lead time，减少滚动次数和误差传递。"
```
