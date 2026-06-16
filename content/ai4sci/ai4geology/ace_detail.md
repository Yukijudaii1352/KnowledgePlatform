### ACE

```yaml
id: ace
name: ACE
full_name: AI气候模拟器 (AI2 Climate Emulator)
year: '2026'
org: Allen Institute for AI
paper_url: https://www.nature.com/articles/s43247-026-01234-5
category: climate_ai
parent: neuralgcm
motivation: 每日运行1500年气候模拟100倍加速
```

#### 📝 一句话总结

ACE 将全球大气模式改写为可长期自回归积分的 Spherical Fourier Neural Operator 气候模拟器，用外部强迫、预报变量/诊断变量拆分和物理守恒校正解决 AI 天气模型难以稳定运行到年代际尺度的问题。

#### 🎯 核心要点

- **气候而非短期天气目标**：ACE/ACE2 学习 6 小时大气状态转移，但评估重点是 10-100 年 rollout 的气候均值、趋势、ENSO 响应和物理预算
- **SFNO 球面神经算子骨架**：在 1° Gaussian grid 上用球谐变换做全局混合，适配地球球面几何而不是普通平面卷积
- **三类变量接口**：prognostic variables 同时作为输入和输出，forcing variables 只作为输入，diagnostic variables 只作为输出
- **ACE2 规模升级**：ACE2 约 450M 参数、8 个垂直层、6 小时步长，比原始 ACE 的 200M 参数版本更适合历史强迫和年代际变化
- **外部强迫显式输入**：海表温度、海冰、太阳入射、地形、陆海掩膜和 CO2 等强迫变量控制未来气候条件
- **硬物理约束**：通过模型内 corrector 精确守恒全球干空气质量和大气水分，并保证水汽、降水和辐射通量非负
- **两步自回归训练**：损失覆盖两个连续 6 小时 forward step，减少单步训练和长期 rollout 之间的分布偏移
- **气候技能选 checkpoint**：不是只按短期 MSE 选模型，而用多年 rollout 的时间均值 RMSE 选择长期气候偏差更小的 checkpoint
- **高吞吐模拟**：ACE2 可稳定推进任意多 6 小时步，论文报告约 1500 simulated years/day；同分辨率下相对 SHiELD 约 100 倍更快、约 700 倍更省能

#### 🔬 深入细节

##### 图示与可访问来源

![ACE 变量接口示意图](https://ar5iv.labs.arxiv.org/html/2310.02074/assets/x1.png)
*图：ACE 把当前预报变量 \(P_t\) 与外部强迫 \(F_t\) 输入神经算子，输出下一步预报变量 \(P_{t+1}\) 和诊断变量 \(D_{t+1}\)。原始 ACE 技术报告见 https://arxiv.org/abs/2310.02074；ACE2 开放论文见 https://www.nature.com/articles/s41612-025-01090-0；代码见 https://github.com/ai2cm/ace。输入 YAML 中的 Nature URL 未能解析到 ACE 论文页，因此这里按可访问的 ACE/ACE2 论文和 Ai2 官方资料解读。*

##### 方法背景：为什么天气模型不能直接当气候模型

GraphCast、Pangu-Weather、FourCastNet 这类 AI 天气模型通常追求 1-15 天的预报精度。气候模拟的要求不同：模型必须在成千上万次自回归更新后仍保持合理大气状态，不能出现表面气压漂移、水汽凭空产生、全球能量和水分预算崩坏，也要能响应海表温度、海冰和 CO2 等外部强迫的长期变化。

ACE 的核心选择是“模拟一个参考大气模式”，而不是直接从少量观测中外推未来气候。原始 ACE 用 FV3GFS 约 100 km 分辨率大气模式输出训练；ACE2 进一步使用 ERA5 reanalysis 和 AMIP-style SHiELD 历史模拟，覆盖 1940-2020/2022 附近的历史强迫。这样做的代价是会继承参考数据偏差，但收益是能得到大量物理一致的训练轨迹，并能用标准气候诊断验证多年统计。

##### 变量拆分：让神经网络像大气模式一样运行

ACE 的一步状态转移可以写成：

$$
(\hat{P}_{t+\Delta t}, \hat{D}_{t+\Delta t})
= f_{\theta}(P_t, F_t),
\qquad \Delta t = 6\text{h}
$$

其中 \(P_t\) 是预报变量，例如温度、风、总水含量、表面气压和近地面变量；\(F_t\) 是外部强迫，例如海表温度、海冰、太阳入射、地形、陆海掩膜和 CO2；\(D_{t+\Delta t}\) 是诊断变量，例如降水、辐射通量、潜热/感热通量、500 hPa 位势高度等。

这种拆分很关键。诊断变量不进入下一步初始化，类似物理大气模式中“由当前大气状态诊断出降水和通量”；预报变量才构成下一步状态。因此 ACE 不需要用真实降水初始化气候模拟，但仍能把降水、蒸发和辐射通量纳入同一个网络输出，从而检查水分和能量预算。

##### SFNO：在球面上做全局算子学习

普通 CNN 在经纬度网格上会面对两个问题：一是天气和气候场具有全球长程相互作用，局部卷积需要堆很多层才能感知远距离遥相关；二是经纬度网格在高纬区域几何畸变明显，平面卷积隐含的平移对称性并不完全适用于球面。

ACE 使用 Spherical Fourier Neural Operator（SFNO）。直觉上，它把球面场变换到球谐频域，在频域做可学习的全局混合，再变回空间网格。可以简化表示为：

$$
h = \mathcal{S}(x)
$$

$$
\tilde{h}_{\ell m} = W_{\ell m} h_{\ell m}
$$

$$
y = \mathcal{S}^{-1}(\tilde{h}) + \operatorname{MLP}(x)
$$

这里 \(\mathcal{S}\) 表示 spherical harmonic transform，\((\ell,m)\) 是球谐模态。低阶模态捕捉行星尺度环流，高阶模态承载锋面、风暴和水汽细节；SFNO 用频域混合替代大规模注意力，适合 1° 全球网格上的长期积分。

##### ACE2 的硬物理约束

ACE2 相比原始 ACE 的关键升级是把物理预算 corrector 放进模型架构，并在计算损失前应用校正。首先要求全球干空气质量守恒：

$$
\left\langle p_s^{dry}(t+\Delta t)\right\rangle
=
\left\langle p_s^{dry}(t)\right\rangle
$$

其中

$$
p_s^{dry}(t)=p_s(t)-g\,TWP(t),
\qquad
TWP(t)=\frac{1}{g}\int_0^{p_s}q(t,p)\,dp
$$

\(TWP\) 是总水路径，\(q\) 是比湿或总水含量，\(\langle\cdot\rangle\) 表示面积加权全球平均。水分预算写成：

$$
\frac{TWP(t+\Delta t)-TWP(t)}{\Delta t}
= E(t)-P(t)+
\left.\frac{\partial TWP}{\partial t}\right|_{adv}(t)
$$

这里 \(E\) 是蒸发，\(P\) 是降水，最后一项是水平/垂直输送造成的大气柱水分变化。ACE2 corrector 做四类操作：裁掉水汽、降水和辐射通量的负值；对表面气压施加全球常数偏移以守恒干空气质量；按全球常数缩放降水以闭合全球水分预算；最后把水汽输送项作为残差重新计算，从而精确满足柱水分守恒。

> 💡 关键：ACE2 的守恒不是训练后额外检查，而是模型输出的一部分。网络先给出原始预测，physical corrector 再把预测投影到满足干空气和水分预算的可行集合中，随后才计算损失。

##### 损失函数与 checkpoint 选择

ACE2 的训练损失是归一化后的多变量 MSE，并覆盖两个连续自回归步：

$$
\hat{Y}_{t+1}=f_{\theta}(Y_t,F_t),
\qquad
\hat{Y}_{t+2}=f_{\theta}(\hat{Y}_{t+1},F_{t+1})
$$

$$
\mathcal{L}(\theta)=
\sum_{k=1}^{2}
\sum_{c=1}^{C}
\omega_c
\left\|
\operatorname{norm}_c(\hat{Y}_{t+k,c})-
\operatorname{norm}_c(Y_{t+k,c})
\right\|_2^2
$$

预报变量使用 residual scaling，即按 \(Y_{t+\Delta t}-Y_t\) 的标准差归一化，使表面气压等变化幅度小但气候重要的变量不会被大幅值变量淹没；诊断变量使用 full-field scaling。部分变量有自定义权重，避免诊断通量在 50 多个输出通道中贡献过小。

但气候模型不能只看 6 小时或 12 小时误差。ACE2 还用多年 rollout 的时间均值误差选 checkpoint：

$$
\alpha=
\frac{1}{C}\sum_{c=1}^{C}
\sqrt{
\sum_{\phi,\lambda}
w_{\phi,\lambda}
\left(
\overline{y_c(t,\phi,\lambda)-\hat{y}_c(t,\phi,\lambda)}
\right)^2
}
$$

\(\overline{\cdot}\) 是时间和 ensemble 平均。这个指标直接惩罚长期气候偏差，因此更符合气候模拟目标：一个短期 MSE 略低但 10 年平均降水偏移很大的模型，不应被选为最终气候 emulator。

##### 伪代码：ACE2 训练与长期模拟

```python
# ACE/ACE2 核心逻辑：6小时步长的球面神经算子气候模拟器
def ace_step(state, forcing):
    # state: prognostic variables P_t
    # forcing: SST, sea ice, CO2, insolation, topography, masks
    raw_next_state, raw_diagnostics = SFNO(concat(state, forcing))

    corrected_state, corrected_diagnostics = physical_corrector(
        raw_next_state,
        raw_diagnostics,
        previous_state=state,
    )
    return corrected_state, corrected_diagnostics


def train_step(batch):
    state_t, forcing_t, target_t1, forcing_t1, target_t2 = batch

    pred_t1, diag_t1 = ace_step(state_t, forcing_t)
    pred_t2, diag_t2 = ace_step(pred_t1, forcing_t1)

    loss = weighted_mse(normalize(pred_t1, diag_t1), normalize(target_t1))
    loss += weighted_mse(normalize(pred_t2, diag_t2), normalize(target_t2))
    return loss


def climate_rollout(initial_state, forcing_series, years):
    state = initial_state
    outputs = []
    for step in range(years * 365 * 4):  # 4个6小时步/天
        state, diagnostics = ace_step(state, forcing_series[step])
        outputs.append((state, diagnostics))
    return outputs
```

##### 与 NeuralGCM 和传统 GCM 的差异

传统 GCM 显式离散大气动力学方程，并用物理参数化处理云、辐射、边界层和微物理过程。它的优势是可解释和外推边界清楚，缺点是计算昂贵，做大 ensemble、长时段敏感性实验和 rare event 搜索成本高。ACE 不是求解原始方程，而是直接学习参考模式的 6 小时状态转移，因此能在 GPU 上快速运行多年。

与 NeuralGCM 的混合物理-AI路线相比，ACE 更像“参考模式蒸馏器”：它把已有大气模式或再分析数据压缩成快速 neural emulator。ACE2 的优势在于吞吐量、硬预算校正和历史强迫下的多年稳定；限制也很明确，模型响应仍受训练分布约束，论文指出分别改变 SST 与 CO2 时的敏感性还不完全真实，并且完整气候系统还需要耦合海洋、海冰和陆面模块。

> ⚠️ 注意：ACE/ACE2 的“快”不等于已经完整替代 CMIP 级地球系统模型。它更适合快速生成大 ensemble、筛查气候统计和测试强迫响应；真正用于未来气候外推时，仍需要覆盖更广泛强迫组合的训练数据和独立评估。

#### 🧪 练习题

```yaml
question: "ACE2 为什么把 physical corrector 放进模型架构，而不是只在评估时报告守恒误差？"
options:
  - "为了减少网络参数量"
  - "为了让输出在训练损失计算前就满足干空气质量和水分预算，降低长期 rollout 漂移"
  - "为了把 6 小时步长改成 1 小时步长"
  - "为了完全避免使用外部强迫变量"
answer: 1
explain: "ACE2 的 corrector 在损失前修正表面气压、降水和水汽输送等量，使模型学习到的可行输出满足硬物理预算；这比事后检查更能控制长期气候漂移。"
```
