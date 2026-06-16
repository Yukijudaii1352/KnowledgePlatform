### NeuralGCM

```yaml
id: neuralgcm
name: NeuralGCM
full_name: 神经全球环流模型 (Neural General Circulation Model)
year: '2024'
org: Google Research
paper_url: https://www.nature.com/articles/s41586-024-07744-y
category: climate_ai
parent: climax
motivation: 物理-AI混合全微分大气模型
```

#### 📝 一句话总结

NeuralGCM 提出了可端到端训练的物理-AI 混合全球环流模型，把可微分大气动力学核心与神经网络物理参数化结合起来，在天气预报、集合预报和多年气候模拟之间建立了同一套可微分建模框架。

#### 🎯 核心要点

- **混合 GCM 架构**：保留传统 GCM 的可解释动力学核心，用神经网络学习云、辐射、降水、湍流等未解析物理过程的 tendencies
- **全可微分在线训练**：将动力学核心、learned physics、ODE 时间积分和 decoder 串成可反传计算图，在多步 rollout 后直接对 ERA5 轨迹误差优化
- **sigma 坐标模型状态**：将 pressure-level ERA5 输入编码成 sigma-coordinate 模型状态 \(x_t\)，积分后再解码回 pressure-level 预测变量
- **IMEX ODE 时间积分**：动力学 tendencies 与物理 tendencies 共同进入隐式-显式 ODE solver，使模型按 GCM 方式连续推进
- **确定性与随机版本并行**：确定性模型优化多项谱空间损失；随机 NeuralGCM 注入相关高斯噪声，并用 CRPS 训练集合分布
- **rollout curriculum**：训练时逐步把 rollout 长度从 6 小时增加到 5 天，避免早期模型在长积分中不稳定
- **天气与气候统一评估**：覆盖 1-10 天确定性预报、1-15 天集合预报、2 年季节循环模拟和 40 年 AMIP-like 气候模拟
- **公开实现路径**：Nature 正文提供开放图文，代码分为 Dinosaur 动力学核心与 NeuralGCM 模型仓库

#### 🔬 深入细节

##### 图示与来源

![NeuralGCM 模型结构](https://media.springernature.com/lw685/springer-static/image/art%3A10.1038%2Fs41586-024-07744-y/MediaObjects/41586_2024_7744_Fig1_HTML.png)
*图：NeuralGCM 论文 Figure 1。模型把 ERA5 输入、外部 forcing 和随机噪声编码为模型状态，动力学核心与 learned physics 产生 tendencies，经 ODE solver 推进，再由 decoder 输出预测。图片来自 Nature 开放文章页面。*

##### 问题背景与动机

Pangu-Weather、GraphCast 等纯机器学习模型证明了神经网络可以在 1-10 天确定性天气预报上达到很强 skill，但它们通常直接学习 \(x_t\rightarrow x_{t+\Delta t}\) 的数据映射，缺少显式动力学核心。这样做有三个常见问题：多日 MSE 训练容易产生平滑预报；集合不确定性难以校准；长时间积分时可能出现气候漂移或物理诊断量不一致。

传统 GCM 则相反：它们显式求解大尺度大气动力学方程，并用参数化方案表示云、辐射、降水、边界层等次网格过程。优势是物理一致、可解释、适合长期积分；劣势是计算昂贵、参数化手工调优且系统偏差长期存在。

NeuralGCM 的核心判断是：大尺度流体运动应继续由物理动力学核心负责，神经网络更适合学习难以手写的未解析物理过程。与过去“离线训练神经参数化后插入 GCM”的混合模型不同，NeuralGCM 通过可微分动力学核心做在线训练，让 neural physics 在真实多步积分闭环中被优化。

##### 模型机制

NeuralGCM 的一次 forecast 可以抽象为：

$$
\frac{d x}{dt}
=
\mathcal{D}(x, F_t)
+
\mathcal{P}_\theta(x, F_t, z_t)
$$

其中 \(x\) 是模型内部大气状态，\(\mathcal{D}\) 是可微分 dynamical core 计算的大尺度动力学 tendencies，\(F_t\) 是外部 forcing，\(\mathcal{P}_\theta\) 是神经网络 learned physics 产生的物理 tendencies，\(z_t\) 是随机模型中的噪声输入。

实际流程分为五步：

1. **Encoder**：把 ERA5 pressure-level 输入 \(y_t\) 编码到 sigma-coordinate 模型状态 \(x_t\)
2. **Dynamical core**：模拟重力、科氏力和大尺度流体/热力学过程，产生 resolved dynamic tendencies
3. **Learned physics**：对每个大气柱输入局地垂直剖面和 forcing，用神经网络输出未解析物理过程 tendencies
4. **ODE solver**：用隐式-显式时间积分器推进状态 \(x_t\rightarrow x_{t+1}\)
5. **Decoder**：把内部状态解码回 pressure-level 变量，与 ERA5 或业务分析场比较

> 💡 关键：learned physics 不是单步后处理器，而是每个时间步都与动力学核心耦合。训练梯度会穿过数百个模拟步，迫使神经参数化学习“放进 GCM 后仍稳定”的修正。

##### 算法伪代码

```python
# NeuralGCM 多步在线训练伪代码
def neuralgcm_rollout(y0, forcings, noise_stream, num_steps):
    """
    y0: ERA5 pressure-level 初始场
    forcings: SST、海冰、太阳辐射等外部 forcing 序列
    noise_stream: 随机模型的相关高斯噪声；确定性模型可设为 None
    """
    # Step 1: pressure levels -> sigma-coordinate model state
    x = learned_encoder(y0, forcings[0], noise_stream[0])
    predictions = []

    for n in range(num_steps):
        F_n = forcings[n]
        z_n = None if noise_stream is None else noise_stream[n]

        # Step 2: resolved dynamics from differentiable GCM core
        dyn_tendency = dynamical_core.tendency(x, F_n)

        # Step 3: unresolved physics from neural parameterization
        # learned_physics works column-by-column on local vertical profiles
        phys_tendency = learned_physics(x, F_n, z_n)

        # Step 4: IMEX ODE integration
        x = imex_ode_solver.step(
            state=x,
            dynamic_tendency=dyn_tendency,
            physics_tendency=phys_tendency,
            dt=solver_dt,
        )

        # Step 5: decode model state for supervised losses
        y_hat = learned_decoder(x)
        predictions.append(y_hat)

    return predictions


def train_step(batch, rollout_hours):
    y0, targets, forcings = batch
    steps = hours_to_solver_steps(rollout_hours)
    preds = neuralgcm_rollout(y0, forcings, sample_noise(), steps)

    if deterministic:
        loss = spectral_filtered_mse(preds, targets)
        loss += lambda_spectrum * spectrum_matching_loss(preds, targets)
        loss += lambda_bias * batch_mean_bias_loss(preds, targets)
    else:
        # two ensemble members are enough for an unbiased CRPS estimate in training
        ens_preds = [neuralgcm_rollout(y0, forcings, sample_noise(), steps)
                     for _ in range(2)]
        loss = crps_loss(ens_preds, targets)

    loss.backward()  # gradients pass through solver, dynamics, physics and decoder
    optimizer.step()
```

##### 确定性训练损失

NeuralGCM 的确定性模型不是只使用普通 MSE。论文组合了三类损失，使短期天气精度、谱结构和长期偏差同时受约束。

第一项是随 lead time 做高波数过滤的 MSE。设 \(a_{\ell m}(\hat{y})\) 和 \(a_{\ell m}(y)\) 是球谐空间中的系数，\(M_\tau(\ell)\) 是随预报时效 \(\tau\) 变化的谱过滤器，则：

$$
\mathcal{L}_{\text{mse}}(\tau)=
\sum_{\ell,m}
M_\tau(\ell)
\left|
a_{\ell m}(\hat{y}_\tau)-a_{\ell m}(y_\tau)
\right|^2
$$

高波数过滤用于缓解 double penalty：在较长 lead time，锋面或涡旋位置稍错会在高分辨率 MSE 中被惩罚两次，一次是“真位置没预测到”，一次是“错位置预测了”。逐步过滤高波数让模型不被迫输出过度平滑的平均场。

第二项约束总波数谱，使预测的能量分布接近训练数据：

$$
\mathcal{L}_{\text{spectrum}}=
\sum_\ell
\left(
S_\ell(\hat{y})-S_\ell(y)
\right)^2
$$

第三项惩罚 batch-averaged 球谐系数的系统偏差：

$$
\mathcal{L}_{\text{bias}}=
\sum_{\ell,m}
\left|
\mathbb{E}_{b}[a_{\ell m}(\hat{y}^{(b)})]
-
\mathbb{E}_{b}[a_{\ell m}(y^{(b)})]
\right|^2
$$

组合形式为：

$$
\mathcal{L}_{\text{det}}=
\mathcal{L}_{\text{mse}}
\lambda_s\mathcal{L}_{\text{spectrum}}
\lambda_b\mathcal{L}_{\text{bias}}
$$

这些损失在 sigma levels 和 pressure levels 上评估，并配合从 6 小时到 5 天的 rollout curriculum。论文指出，这种组合有助于让 3 天 rollout 训练出的模型在多年到数十年气候模拟中保持稳定。

##### 随机集合模型与 CRPS

天气预报需要不确定性。NeuralGCM 的随机版本在 learned encoder 和 learned physics 中注入具有学习到的空间、时间相关结构的高斯随机场。训练目标使用 CRPS：

$$
\text{CRPS}(F, y)=
\mathbb{E}_{X\sim F}|X-y|
-
\frac{1}{2}\mathbb{E}_{X,X'\sim F}|X-X'|
$$

第一项鼓励 ensemble 成员靠近真值，第二项鼓励 ensemble 具有适当 spread，避免所有成员塌缩到同一个平均预测。论文在训练时为每个 forecast 生成两个 ensemble member 来估计 CRPS，并同时在 grid space 与低于截断波数的球谐空间计算。

##### 与纯 AI 天气模型的差异

纯 AI 模型通常直接预测目标变量，因此很难拆分“水平输送导致的变化”和“局地物理源汇导致的变化”。NeuralGCM 中，平流和大尺度动力学由 dynamical core 负责，learned physics 负责局地柱物理 tendencies，因此水收支、地转平衡等诊断更可解释。

这也是 NeuralGCM 能做长期气候模拟的原因之一。模型不是每 6 小时直接生成一个全新气象图像，而是在受物理核心约束的状态空间中连续积分。论文报告了 2.8°、1.4°、0.7° 等分辨率模型，并在天气评估中与 ECMWF-HRES、ECMWF-ENS、GraphCast、Pangu 等比较；在气候评估中与 X-SHiELD、CMIP6 AMIP runs 等比较。

##### 实验现象与限制

在天气预报中，NeuralGCM-0.7° 与 GraphCast 等纯 AI 模型在 1-10 天确定性 RMSE 上具有竞争力；随机 NeuralGCM-ENS 在 1-15 天集合预报中与 ECMWF-ENS 对比，关注 RMSE、RMSB、CRPS 和 spread-skill ratio 等概率预报指标。

在气候模拟中，NeuralGCM 使用 prescribed sea surface temperature 和 sea-ice concentration 做长期积分。论文报告 NeuralGCM-1.4° 的 2 年模拟能捕捉季节循环，2020 年全球平均温度 ensemble mean RMSE 约 0.16 K，优于 climatology 的 0.45 K；1.4° 年积分中热带气旋数量与 ERA5 接近（83 vs 86），而 regridded X-SHiELD 明显偏少。40 年 AMIP-like 模拟中，NeuralGCM-2.8° 的稳定 runs 能跟踪历史温度趋势，并在 1981-2014 年平均空间偏差上优于 CMIP6 AMIP 对比组。

限制同样重要。Nature 摘要明确指出，当前 NeuralGCM 不能外推到显著不同的未来气候；也就是说，它展示了“可微分混合 GCM + 在线训练”的可行性，但还不是完整 Earth system model。它主要处理大气，并依赖 prescribed SST/海冰做气候实验，海洋、陆面、化学、生物地球化学耦合仍需扩展。

#### 🧪 练习题

```yaml
- question: "NeuralGCM 相比把神经网络离线训练后插入传统 GCM 的关键改进是什么？"
  options:
    - "完全移除动力学方程，只保留图像到图像预测"
    - "通过可微分动力学核心进行多步在线训练，让 learned physics 在闭环积分中被优化"
    - "只训练 1 小时预报，避免任何长时间 rollout"
    - "只使用 climatology，不依赖 ERA5 轨迹"
  answer: 1
  explain: "NeuralGCM 的动力学核心、神经物理参数化和 ODE solver 都在反传图中，多步 rollout 后的误差会直接优化 learned physics 与动力学交互后的行为。"
```
