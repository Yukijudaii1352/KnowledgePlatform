### Carbon Tracker

```yaml
id: carbon_tracker
name: Carbon Tracker
full_name: "全球碳追踪模型 (Global Carbon Tracker)"
year: "2026"
org: "Shanghai Institute"
paper_url: "https://www.chinadaily.com.cn/a/202604/09/WS6614996ca31082fc043c106b.html"
category: "climate_ai"
parent: "neuralgcm"
motivation: "320亿参数智能体实时碳汇核算"
```

#### 📝 一句话总结

Global Carbon Tracker 是上海研究院提出的 320 亿参数气候智能体模型，基于 NeuralGCM 的物理-AI 混合架构，将全球碳循环动力学（陆地碳汇、海洋碳汇、人为排放）统一建模为多智能体交互系统，首次实现全球碳通量的实时（逐小时）高分辨率核算，在碳汇估算精度上较传统反演方法（如 CarbonTracker-CT、CAMS）提升 40% 以上。

#### 🎯 核心要点

- **超大规模碳循环智能体**：320 亿参数的多智能体架构，将陆地生态系统、海洋、大气、人为排放分别建模为交互智能体（Agent），通过消息传递实现碳通量耦合
- **物理-AI 混合内核**：继承 NeuralGCM 的可微分大气动力学核心（differentiable GCM），在物理守恒框架内嵌入神经网络参数化，确保碳质量守恒
- **实时碳汇核算**：突破传统碳反演方法的周/月级时间分辨率限制，实现逐小时全球碳通量估算，空间分辨率达 0.25°×0.25°
- **多源观测融合**：融合卫星遥感（OCO-2/3、GOSAT）、地面通量塔（FLUXNET）、海洋浮标（Argo）、大气 CO₂ 浓度站点等多模态观测数据
- **自回归长期预测**：支持从小时级到年际尺度的碳通量自回归预测，为碳中和路径规划提供决策支持
- **碳汇归因分析**：通过注意力归因机制，可解释地定量分析各碳汇/碳源的贡献因子（温度、降水、土地利用变化、海表温度等）
- **训练数据**：基于 1979-2025 年全球再分析数据（ERA5）+ 碳通量观测数据（Global Carbon Project）联合训练
- **性能基准**：在全球净生态系统交换量（NEE）估算上，RMSE 较 CarbonTracker-CT2022 降低 42%，较 CAMS 反演降低 35%

#### 🔬 深入细节

##### 模型架构总览

![Carbon Tracker 架构示意图](assets/carbon_tracker_architecture.png)
*图：Global Carbon Tracker 多智能体架构示意。四类碳循环智能体（陆地、海洋、大气传输、人为排放）各自维护内部状态，通过碳通量消息传递进行耦合。底层为 NeuralGCM 物理-AI 混合动力学核心，顶层为多源观测数据同化模块。*

##### 算法伪代码

```python
# Global Carbon Tracker 前向推理伪代码
class CarbonTrackerAgent:
    def __init__(self, num_params=32e9):
        # 四类碳循环子智能体
        self.land_agent = LandBiosphereAgent(params=8e9)      # 陆地生态系统
        self.ocean_agent = OceanCarbonAgent(params=6e9)        # 海洋碳循环
        self.atmos_agent = AtmosphericTransportAgent(params=12e9)  # 大气传输 (NeuralGCM核心)
        self.anthro_agent = AnthropogenicAgent(params=2e9)     # 人为排放
        # 观测同化模块
        self.assimilator = MultiSourceAssimilator(params=4e9)

    def forward(self, state_t, observations, dt=1h):
        """
        state_t: 全球碳循环状态 [B, C_state, Lat, Lon]
            包含: 大气CO2浓度、土壤碳储量、海洋DIC、植被GPP等
        observations: 多源观测数据字典
            {satellite_xco2, flux_tower, argo_ocean, ground_co2, ...}
        dt: 时间步长 (默认1小时)
        """
        # Step 1: 各智能体独立估算碳通量
        F_land = self.land_agent(state_t, observations)
        #   F_land: 净生态系统交换量 NEE [B, Lat, Lon]
        #   = GPP(总初级生产力) - R_eco(生态系统呼吸)

        F_ocean = self.ocean_agent(state_t, observations)
        #   F_ocean: 海-气CO2通量 [B, Lat, Lon]
        #   基于海表pCO2差驱动的气体交换

        F_anthro = self.anthro_agent(state_t, observations)
        #   F_anthro: 人为排放通量 [B, Lat, Lon]
        #   化石燃料 + 土地利用变化

        # Step 2: 碳通量汇总 → 大气CO2源汇项
        F_total = F_land + F_ocean + F_anthro  # 总碳通量

        # Step 3: 大气传输智能体 (NeuralGCM核心)
        # 基于物理-AI混合GCM进行CO2大气传输模拟
        state_t1 = self.atmos_agent.step(
            state_t,
            carbon_flux=F_total,
            dt=dt
        )
        # 内部执行:
        #   1. 可微分动力学核心: 求解大气运动方程 (风场驱动CO2传输)
        #   2. 神经网络参数化: 次网格过程 (对流、边界层混合、湍流扩散)
        #   3. 碳质量守恒约束: ∫(dCO2/dt)dV = ∫F_total·dA

        # Step 4: 多源观测同化 (变分-神经网络混合)
        state_t1_analyzed = self.assimilator(
            background=state_t1,           # 模型预报场 (背景场)
            obs=observations,              # 多源观测
            B=self.get_error_covariance()  # 学习的背景误差协方差
        )
        # 类似4D-Var同化，但用神经网络学习观测算子H和误差协方差B

        # Step 5: 碳质量守恒校验
        mass_residual = global_carbon_mass(state_t1_analyzed) - \
                       global_carbon_mass(state_t) - \
                       global_integral(F_total * dt)
        assert abs(mass_residual) < epsilon  # 物理硬约束

        return state_t1_analyzed, {
            'F_land': F_land,
            'F_ocean': F_ocean,
            'F_anthro': F_anthro,
            'F_total': F_total
        }
```

##### 动机与背景

全球碳循环是地球系统科学的核心问题，也是应对气候变化的关键。准确量化全球碳通量——即碳在大气、陆地生态系统、海洋之间的交换速率——对于评估碳中和进展、制定减排政策至关重要。

**传统碳追踪方法的局限性：**

现有的全球碳通量反演系统主要基于大气反演（atmospheric inversion）方法：

| 系统 | 机构 | 方法 | 时间分辨率 | 空间分辨率 | 局限 |
|------|------|------|-----------|-----------|------|
| CarbonTracker (CT) | NOAA | 集合卡尔曼滤波 + TM5传输模型 | 周 | 1°×1° | 依赖先验通量、分辨率低 |
| CAMS | ECMWF | 4D-Var + LMDz传输模型 | 日 | ~1.9°×3.75° | 计算成本极高、参数化粗糙 |
| MIROC4-ACTM | JAMSTEC | 贝叶斯反演 | 月 | ~2.8° | 时间分辨率不足 |
| OCO-2 MIP | NASA/JPL | 多模型集合 | 月 | 区域级 | 卫星覆盖不均匀 |

这些方法的共同瓶颈在于：
1. **时间分辨率不足**：通常为周-月级，无法捕捉碳通量的日变化和极端事件响应
2. **空间分辨率粗糙**：1°-3° 分辨率难以分辨城市-郊区、森林-农田等精细碳汇差异
3. **计算成本高**：4D-Var 等变分方法需要反复运行传输模型的伴随（adjoint），耗时数天
4. **物理参数化简化**：次网格过程（对流、湍流混合）依赖经验参数化方案，引入系统性偏差

**NeuralGCM 的启示：**

2024 年 Google Research 提出的 NeuralGCM 证明了物理-AI 混合方法在大气建模中的巨大潜力。NeuralGCM 将可微分的大气动力学核心（求解原始方程组）与神经网络参数化（替代传统的次网格物理方案）结合，在天气预报和气候模拟中同时超越了纯物理模型和纯 AI 模型。

Global Carbon Tracker 继承并扩展了 NeuralGCM 的核心思想：**将碳循环的关键物理过程（光合作用、呼吸、海-气交换、大气传输）嵌入可微分框架，同时用神经网络学习难以显式建模的复杂过程**。更进一步，它引入了多智能体架构来处理碳循环中多个子系统的异质性和耦合关系。

##### 核心机制：多智能体碳循环建模

**1. 陆地生物圈智能体（Land Biosphere Agent）**

陆地碳汇是全球碳循环中最大的不确定性来源。该智能体负责估算净生态系统交换量（NEE）：

$$\text{NEE} = R_{\text{eco}} - \text{GPP}$$

其中 GPP（Gross Primary Production，总初级生产力）为植被光合作用固碳量，$R_{\text{eco}}$（Ecosystem Respiration，生态系统呼吸）为土壤和植被的碳释放。

传统模型（如 CASA、LPJ）使用经验公式估算 GPP 和呼吸：

$$\text{GPP} = \text{PAR} \times \text{fAPAR} \times \varepsilon_{\max} \times f(T) \times f(W)$$

其中 PAR 为光合有效辐射，fAPAR 为植被吸收比例，$\varepsilon_{\max}$ 为最大光能利用率，$f(T)$、$f(W)$ 为温度和水分胁迫函数。

Carbon Tracker 的陆地智能体用 **Transformer 编码器**替代这些经验函数，输入包括：
- 卫星植被指数（NDVI/EVI/SIF 太阳诱导荧光）
- 气象驱动场（温度、降水、辐射、VPD）
- 土壤属性（质地、有机碳含量、水分）
- 土地利用/覆盖类型
- 历史碳通量时间序列

> 💡 **关键创新**：利用太阳诱导叶绿素荧光（SIF）作为 GPP 的直接代理变量。SIF 是植物光合作用的副产物，与 GPP 具有近线性关系，可由 OCO-2/3 和 TROPOMI 卫星直接观测，避免了传统方法中 fAPAR → GPP 转换的多步误差累积。

**2. 海洋碳循环智能体（Ocean Carbon Agent）**

海洋吸收了约 25% 的人为 CO₂ 排放。海-气 CO₂ 通量由以下公式驱动：

$$F_{\text{ocean}} = k_w \cdot s(T) \cdot (\text{pCO}_2^{\text{ocean}} - \text{pCO}_2^{\text{atm}})$$

其中 $k_w$ 为气体传输速率（依赖风速），$s(T)$ 为 CO₂ 溶解度（依赖海表温度），$\Delta\text{pCO}_2$ 为海-气 CO₂ 分压差。

海洋智能体使用 **图神经网络（GNN）** 建模海洋碳循环，将全球海洋离散化为不规则网格节点，每个节点维护状态向量（SST、盐度、DIC、碱度、叶绿素等），通过消息传递模拟洋流驱动的碳输运和生物泵过程。

**3. 大气传输智能体（Atmospheric Transport Agent）**

这是模型的核心组件，直接继承 NeuralGCM 的架构：

- **可微分动力学核心**：在球面谐函数（spherical harmonics）基上求解大气原始方程组（primitive equations），包括连续性方程、动量方程、热力学方程
- **神经网络参数化**：用 MLP 替代传统的对流参数化（如 Zhang-McFarlane 方案）和边界层方案（如 YSU 方案），从数据中学习次网格物理过程
- **CO₂ 示踪传输**：在动力学核心中增加 CO₂ 作为被动示踪物（passive tracer），由风场驱动其全球传输和混合

$$\frac{\partial c}{\partial t} + \mathbf{v} \cdot \nabla c = \nabla \cdot (K \nabla c) + S$$

其中 $c$ 为 CO₂ 浓度，$\mathbf{v}$ 为三维风场，$K$ 为扩散系数（由神经网络参数化），$S$ 为源汇项（来自其他三个智能体）。

**4. 多源观测同化**

模型采用混合数据同化策略，结合变分方法的物理约束和深度学习的非线性映射能力：

$$\mathbf{x}^a = \mathbf{x}^b + \mathbf{K}(\mathbf{y}^o - H(\mathbf{x}^b))$$

其中 $\mathbf{x}^b$ 为背景场（模型预报），$\mathbf{y}^o$ 为观测，$H$ 为观测算子（由神经网络学习），$\mathbf{K}$ 为增益矩阵。

> ⚠️ **碳质量守恒硬约束**：不同于传统软约束（正则化项），Carbon Tracker 通过投影方法（projection method）在每个时间步强制全球碳质量守恒：将同化后的 CO₂ 场投影到满足质量守恒的流形上，确保 $\frac{d}{dt}\int_{\text{globe}} c \, dV = \int_{\text{surface}} F_{\text{total}} \, dA$。

##### 训练策略

模型训练分为三个阶段：

1. **预训练阶段**：在 ERA5 再分析数据（1979-2020）上预训练大气传输智能体，继承 NeuralGCM 的权重并进行碳传输适配
2. **碳通量监督训练**：使用 FLUXNET 通量塔观测（>200 站点）、SOCAT 海洋 pCO₂ 数据库、Global Carbon Project 年度碳收支作为监督信号，联合训练四个智能体
3. **端到端微调**：以卫星柱浓度 XCO₂（OCO-2/3）为约束，端到端微调整个系统，最小化模拟浓度与观测浓度的差异

损失函数：

$$\mathcal{L} = \underbrace{\mathcal{L}_{\text{XCO}_2}}_{\text{卫星浓度}} + \lambda_1 \underbrace{\mathcal{L}_{\text{NEE}}}_{\text{通量塔}} + \lambda_2 \underbrace{\mathcal{L}_{\text{ocean}}}_{\text{海洋pCO}_2} + \lambda_3 \underbrace{\mathcal{L}_{\text{conserve}}}_{\text{质量守恒}} + \lambda_4 \underbrace{\mathcal{L}_{\text{budget}}}_{\text{全球碳收支}}$$

##### 与现有方法的对比

| 特性 | CarbonTracker-CT | CAMS 反演 | NeuralGCM | **Global Carbon Tracker** |
|------|-----------------|-----------|-----------|--------------------------|
| 方法论 | 集合卡尔曼滤波 | 4D-Var | 物理-AI 混合 GCM | 多智能体 + 物理-AI 混合 |
| 参数量 | N/A (物理模型) | N/A | ~数亿 | **320 亿** |
| 碳循环建模 | 先验通量 + 大气反演 | 先验通量 + 变分同化 | 仅大气动力学 | **全碳循环耦合** |
| 时间分辨率 | 周 | 日 | 小时 (大气) | **小时 (碳通量)** |
| 空间分辨率 | 1°×1° | ~2°×4° | 0.7°-2.8° | **0.25°×0.25°** |
| 实时性 | 延迟数月 | 延迟数周 | 近实时 (大气) | **近实时 (碳通量)** |
| 碳质量守恒 | 近似 | 近似 | 大气守恒 | **全系统硬约束** |
| 可解释性 | 中 | 中 | 中-高 | **高 (注意力归因)** |

##### 碳汇归因分析

Carbon Tracker 的一个重要应用是碳汇归因——定量分析驱动碳通量变化的关键因子。模型通过多头注意力机制的归因分析实现这一功能：

对于某区域某时段的碳通量异常 $\Delta F$，模型可以输出各驱动因子的贡献权重：

$$\Delta F = \sum_i \alpha_i \cdot \Delta x_i + \epsilon$$

其中 $\alpha_i$ 为注意力归因权重，$\Delta x_i$ 为各因子的异常（温度异常、降水异常、辐射异常、土地利用变化等），$\epsilon$ 为残差项。

这种归因能力对于以下应用场景具有重要价值：
- **碳中和监测**：评估各国/地区减排措施的实际效果
- **极端事件影响评估**：量化干旱、火灾、热浪对碳汇的冲击
- **碳汇预测**：预估未来气候情景下碳汇的变化趋势

#### 🧪 练习题

```yaml
question: "Global Carbon Tracker 相比传统碳反演方法（如 NOAA CarbonTracker）的核心架构创新是什么？"
options:
  - "使用更高分辨率的网格和更多观测站点数据"
  - "将碳循环子系统建模为多智能体交互架构，在物理-AI混合框架内实现端到端碳通量估算"
  - "采用更先进的集合卡尔曼滤波算法提升反演精度"
  - "仅使用卫星遥感数据替代地面观测网络"
answer: 1
explain: "Global Carbon Tracker 的核心创新在于将陆地、海洋、大气、人为排放分别建模为交互智能体，基于 NeuralGCM 的物理-AI 混合架构实现全碳循环耦合建模。传统方法将碳通量作为先验输入进行大气反演，而 Carbon Tracker 通过多智能体端到端学习，同时估算各子系统的碳通量并保证全局碳质量守恒。"
```