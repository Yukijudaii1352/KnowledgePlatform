### T-Foley: 可控波形域扩散Foley

```yaml
id: tfoley
name: T-Foley
full_name: "T-Foley: 可控波形域扩散Foley"
year: 2024
org: 多机构
paper_url: "https://ieeexplore.ieee.org/document/10447380"
category: audio_effect
parent: tango
motivation: "时间事件引导扩散Foley合成"
```

#### 📝 一句话总结

T-Foley 提出了 Block-FiLM 条件化机制，将**时间事件特征（RMS 包络）**作为显式条件注入波形域扩散模型，首次实现了对 Foley 音效合成中声音事件时序的精确控制，同时支持人声模仿作为直觉化输入接口。

#### 🎯 核心要点

- **波形域扩散架构**：基于 DAG（Full-band General Audio Synthesis）的 UNet 结构，含双向 LSTM 瓶颈层，直接在波形域生成高保真音频，无需预训练声码器
- **双重条件化**：声音类别（class embedding）通过标准 FiLM 注入，时间事件特征（RMS 包络）通过 Block-FiLM 注入，前半部分下/上采样块用 FiLM，后半部分用 Block-FiLM
- **Block-FiLM（BFiLM）**：对 TFiLM 的简化——将序列建模层（LSTM）替换为逐块 MLP，利用 UNet 瓶颈处的 LSTM 承担跨块时序建模，参数量减少 ~30%（74M vs 101M），推理速度提升 ~27%
- **RMS 包络作为时间事件特征**：帧级均方根能量（W=512, h=128），相比 onset/offset 更适合无明确起止的声音类别（如雨声、喷嚏）
- **Event-L1 距离**：新提出的客观评估指标，衡量生成音频与目标时间事件特征之间的 L1 距离
- **人声模仿接口**：支持从人声模仿（Vocal Imitation Set / VocalSketch）中提取 RMS 作为条件，实现直觉化控制
- **数据集**：DCASE 2023 Foley Sound Synthesis 任务数据集，7 类声音（DogBark, Footstep, GunShot, Keyboard, MovingMotorVehicle, Rain, Sneeze_Cough），约 5k 样本 / 5.4 小时

#### 🔬 深入细节

##### 任务定义与动机

![T-Foley 任务示意图](https://ar5iv.labs.arxiv.org/html/2401.09294/assets/task.png)
*图 1：时间事件引导的 Foley 音效合成任务。给定声音类别和时间事件条件（如 RMS 包络），生成时序对齐的 Foley 音效。*

Foley 音效是影视后期制作中由拟音师手工创建的、与画面同步的声音效果。传统 Foley 合成方法主要关注**声音类别**条件（生成"什么声音"），但忽略了**时间维度**的控制（"何时发声"以及"声音的时间包络如何"）。

现有方法的局限：
- **文本引导方法**（如 AudioLDM、DiffSound）：文本描述难以精确表达时间信息
- **视频引导方法**（如 SpecVQGAN、FoleyGAN）：依赖视频输入，且时间对齐效果有限
- **无条件/类别条件方法**（如 DAG、CRASH）：无法控制声音事件的时序

T-Foley 的核心思路：**将时间事件特征（temporal event feature）作为独立的显式条件**，与声音类别共同引导波形扩散过程。

##### 模型架构

![T-Foley 模型架构](https://ar5iv.labs.arxiv.org/html/2401.09294/assets/model_arch.png)
*图 2：(a) T-Foley 整体架构。UNet 的前半部分下/上采样块使用 FiLM 注入类别+扩散时间步条件，后半部分使用 Block-FiLM 注入时间事件条件。(b) Block-FiLM 的工作原理。*

T-Foley 的架构基于 DAG 模型的 UNet 设计：

1. **编码器（下采样路径）**：将含噪波形 \(\mathbf{x}\) 逐层下采样为潜在向量
2. **瓶颈层**：双向 LSTM，维护样本内的音色一致性，同时承担跨时间块的序列建模
3. **解码器（上采样路径）**：通过线性投影调整尺寸后逐层上采样，输出噪声预测 \(\hat{\epsilon}\)

**条件注入策略**：UNet 的每个下/上采样块分为两部分：
- **前半部分**：使用标准 **FiLM** 注入扩散时间步 \(\sigma\) 和声音类别 \(\mathbf{c}\)
- **后半部分**：使用 **Block-FiLM** 注入时间事件特征 \(T\)（RMS 包络）

##### 时间事件特征：RMS 包络

时间事件特征采用帧级 RMS（Root Mean Square）能量：

$$E_i(x) = \sqrt{\frac{1}{W} \sum_{t=ih}^{ih+W} x^2(t)}$$

其中 \(x(t)\) 为音频波形，\(W=512\) 为窗口大小，\(h=128\) 为跳步大小。

> 💡 **为什么选择 RMS 而非 onset/offset？** 论文实验发现 RMS 和 power（RMS 的平方）效果相当，但 onset/offset 对某些声音类别（如雨声、喷嚏）不适用——这些声音没有明确的起止点，但有随时间变化的强度包络。RMS 能统一表征所有类型声音的时间模式。

##### Block-FiLM 核心机制

Block-FiLM 是论文的核心技术创新，它是对 TFiLM（Temporal FiLM）的高效简化。

**标准 FiLM** 对整个特征图施加全局仿射变换：

$$\text{FiLM}(\mathbf{x}, \mathbf{y}, \gamma, \beta) = \gamma \odot \mathbf{x} + \beta$$

其中 \(\gamma, \beta = \text{MLP}(\mathbf{y})\)，\(\gamma, \beta \in \mathbb{R}^{C_{out}}\) 是**通道级**参数，不区分时间维度。

**TFiLM** 将特征图沿时间轴分为 \(N\) 个块，每个块有独立的仿射参数：

$$\text{TFiLM}(\mathbf{x}, \mathbf{y}) = \text{Concat}\left[\gamma_i \cdot \mathbf{1}_d^T \odot X_{b_i} + \beta_i \cdot \mathbf{1}_d^T\right]_{i=1}^{N}$$

其中 \((\gamma_i, \beta_i) = \text{LSTM}(Y_{b_i}^{\text{pool}})\)，使用 LSTM 建模块间时序依赖。

**Block-FiLM** 的关键简化——**用 MLP 替换 LSTM**：

$$(\gamma_i, \beta_i) = \text{MLP}(Y_{b_i}^{\text{pool}})$$

```python
# Block-FiLM 伪代码
def block_film(x, y_temporal, N_blocks):
    """
    x: 待调制特征 [C_out, L_out]
    y_temporal: 时间事件特征(RMS) [C_in, L_in]  
    N_blocks: 块数量
    """
    # 将时间事件特征分为 N 个块并池化
    y_blocks = split_and_pool(y_temporal, N_blocks)  # [N, C_in]
    
    # 将待调制特征分为 N 个块
    x_blocks = split(x, N_blocks)  # [N, C_out, d]  d = L_out / N
    
    output = []
    for i in range(N_blocks):
        # 每个块独立计算仿射参数（无跨块序列建模）
        gamma_i, beta_i = MLP(y_blocks[i])  # 各 [C_out]
        
        # 块级仿射变换
        x_mod = gamma_i[:, None] * x_blocks[i] + beta_i[:, None]
        output.append(x_mod)
    
    return concat(output, dim=-1)  # [C_out, L_out]
```

> 💡 **为什么 Block-FiLM 能省去 LSTM？** 论文的关键洞察是：RMS 包络中嵌入的时间事件具有**弱依赖性**——例如 t=1.3s 处的枪声事件不影响 t=3s 处的另一个事件。因此块间的序列建模并非必要。而 UNet 瓶颈处已有的双向 LSTM 足以在全局层面处理跨块的时序一致性。这种"分工"设计使 Block-FiLM 以更少参数（74M vs TFiLM 的 101M）和更快推理（9.5s vs 13s）取得更好性能。

##### 块数量的权衡

![块数量权衡](https://ar5iv.labs.arxiv.org/html/2401.09294/assets/block_tradeoff.png)
*图 3：不同块数量 N 在性能（E-L1、FAD-P）和效率（推理时间）之间的权衡。*

块数量 \(N\) 控制时间条件的分辨率：
- **更多块**（如 N=245）→ 更精细的时间控制，E-L1 更低，但推理更慢
- **更少块**（如 N=7）→ 更平滑的条件，效率更高，但时间精度下降
- 论文选择 **N=49** 作为精度与效率的最佳平衡点

##### 训练与推理

**训练配置**：
- 方差保持（VP）余弦调度的连续时间 L2 噪声预测损失
- Classifier-free guidance：训练时以 \(p=0.1\) 随机丢弃条件
- 500 epoch 训练
- 数据：22,050 Hz 单声道，4 秒时长

**推理**：采用 DDPM 风格的 SDE 离散化 + classifier-free guidance

##### 实验结果

| 模型 | 参数量 | 推理时间 | E-L1↓ | FAD-P↓ | FAD-V↓ | IS↑ |
|------|--------|---------|-------|--------|--------|-----|
| Real data | - | - | 0.0 | 22.81 | 4.06 | 2.18 |
| DAG (无时间条件) | 87M | 12s | 0.2212 | 53.94 | 36.10 | 1.46 |
| T-Foley (FiLM) | 83M | 6.3s | 0.0772 | 54.59 | 36.06 | 1.94 |
| T-Foley (TFiLM) | 101M | 13s | 0.0469 | 49.44 | 36.10 | 1.74 |
| **T-Foley (BFiLM)** | **74M** | **9.5s** | **0.0367** | **41.59** | **36.09** | 1.79 |

> ⚠️ **注意**：FiLM 的 IS 值较高可能是因为生成了多样但低质量的音频（与真实数据分布偏离较大），而非真正的质量优势。

主观评估（MOS，23 名参与者）：

| 模型 | 类别保真度↑ | 时间保真度↑ | 音频质量↑ |
|------|-----------|-----------|---------|
| FiLM | 3.85±0.12 | 4.11±0.10 | 3.28±0.11 |
| TFiLM | 4.02±0.11 | 4.00±0.13 | 3.75±0.11 |
| **BFiLM** | **4.22±0.11** | **4.41±0.09** | **4.06±0.10** |

BFiLM 在所有三个主观指标上均显著优于 FiLM 和 TFiLM。

##### 人声模仿控制

![生成样本示例](https://ar5iv.labs.arxiv.org/html/2401.09294/assets/event-guided_samples.png)
*图 4：第一行为用于提取目标事件特征的控制声音，后续行为不同类别的生成结果。生成音频的 RMS 包络与控制信号高度对齐。*

T-Foley 支持从**人声模仿**中提取 RMS 包络作为条件输入。用户只需用嘴模仿目标声音的节奏和强度模式，模型即可生成对应类别的、时序对齐的 Foley 音效。这为影视后期制作提供了极为直觉化的交互方式。

##### 与传统方法的核心区别

| 维度 | 传统方法 | T-Foley |
|------|---------|---------|
| 时间控制 | 无显式时间条件 | RMS 包络作为显式时间事件条件 |
| 条件化方式 | 全局 FiLM | 双重条件：FiLM（类别）+ Block-FiLM（时间） |
| 生成域 | 多为频谱域+声码器 | 直接波形域生成 |
| 交互方式 | 文本/视频 | 支持人声模仿的直觉化输入 |
| 评估指标 | FAD/IS | 新增 Event-L1 衡量时间保真度 |

#### 🧪 练习题

```yaml
question: "T-Foley 中 Block-FiLM 相比 TFiLM 的核心简化是什么？"
options:
  - "将块级仿射变换替换为全局仿射变换"
  - "用 MLP 替换 LSTM 进行块级参数生成，依赖瓶颈层 LSTM 处理跨块时序"
  - "减少块的数量以降低计算复杂度"
  - "将 RMS 特征替换为 onset/offset 特征以简化输入"
answer: 1
explain: "Block-FiLM 的核心简化是将 TFiLM 中用于块间序列建模的 LSTM 替换为独立的 MLP，因为时间事件间具有弱依赖性，而 UNet 瓶颈处已有的双向 LSTM 足以处理全局时序一致性。"
```