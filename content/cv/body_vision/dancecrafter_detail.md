### DanceCrafter

```yaml
id: dancecrafter
name: DanceCrafter
full_name: "DanceCrafter: 基于编舞语法的细粒度文本驱动可控舞蹈生成"
year: "2025"
org: "Tencent / 中央民族大学 / 北京舞蹈学院"
paper_url: "https://arxiv.org/abs/2604.18648"
category: "text-to-motion"
parent: "t2mgpt"
motivation: "提出编舞语法(Choreographic Syntax)理论框架与DanceFlow数据集，结合连续流形运动表示和DiT生成模型，实现细粒度文本控制的舞蹈动作与视频生成"
```

#### 📝 一句话总结

DanceCrafter 提出了一套完整的编舞语法（Choreographic Syntax）理论框架，将舞蹈动作从 Body、Space、Orientation、Effort 四个维度进行结构化文本描述，并构建了目前最细粒度的文本-舞蹈数据集 DanceFlow（41小时、6.34M词），配合基于连续流形表示的 DiT + Flow Matching 生成模型，在 HumanML3D 和 AIST++ 上取得了 SOTA 的文本驱动舞蹈生成效果，并可级联视频生成模型输出逼真舞蹈视频。

#### 🎯 核心要点

- **编舞语法理论框架（Choreographic Syntax）**：从舞蹈学理论出发，定义 Body（身体部位动作）、Space（空间路径与层级）、Orientation（朝向与方位，使用钟面系统）、Effort（力效与动态质感）四个正交维度，实现对舞蹈动作的结构化、标准化文本描述
- **DanceFlow 数据集**：41小时、20K 段落、6.34M 词（平均每段 248 词 vs 此前 SOTA 仅 48 词），来源包括 36h 视频重建 + 5h 专业动捕，由 Gemini-3-pro-preview 按编舞语法标注并经统计质量控制
- **Momentum Human Rig（MHR）运动表示**：204 维解耦参数（68 身份 + 136 姿态），经 6D 连续旋转 + sin/cos 编码映射到 260 维连续流形表示，配合混合归一化策略（旋转维度保持流形结构，平移维度标准归一化）
- **DiT + Flow Matching 生成骨干**：12 层 Transformer（hidden 1024），RoPE + QK-Norm 稳定时序注意力，UMT5-XXL 冻结文本编码器，AdaLN-Zero 条件调制，CFG 引导
- **Anatomy-aware Loss**：按身体部位（躯干、四肢、手部）分解速度场监督，配合 \(x_0\) 重建损失、速度/加速度正则化
- **级联视频生成**：生成的 MHR 骨骼序列 + 参考图像输入 Wan-Animate，产出逼真舞蹈视频
- **SOTA 结果**：HumanML3D FID 0.868（最优）、AIST++ FID_k 0.273 / FID_g 0.150（均最优）

#### 🔬 深入细节

![DanceCrafter 整体框架](https://ar5iv.labs.arxiv.org/html/2604.18648v2/extracted/6501825/figures/pipeline.png)
*图：DanceCrafter 整体流水线——从编舞语法标注到 MHR 连续流形表示，经 DiT + Flow Matching 生成运动序列，最终级联 Wan-Animate 输出逼真舞蹈视频*

![编舞语法四维度](https://ar5iv.labs.arxiv.org/html/2604.18648v2/extracted/6501825/figures/syntax.png)
*图：Choreographic Syntax 的四个正交维度——Body（身体）、Space（空间）、Orientation（朝向）、Effort（力效）*

##### 算法伪代码

```python
# DanceCrafter 训练与推理流程

# === 数据预处理 ===
# 1. MHR 参数 θ ∈ R^(T×204) → 连续流形表示
for each frame:
    # 身份参数: 68维 → sin/cos编码 → 136维
    identity = sincos_encode(mhr_identity)  # R^68 → R^136
    # 姿态参数: 136维(轴角) → 6D连续旋转 → 124维
    pose_6d = axis_angle_to_6d(mhr_pose)    # R^136 → R^124
    x = concat(identity, pose_6d)            # R^260

# 2. 混合归一化
x_rot = x_rot / σ_rot_global    # 旋转维度: 除以全局标准差, 保持流形结构
x_trans = (x_trans - μ) / σ     # 平移维度: 标准 z-score 归一化

# === Flow Matching 训练 ===
# 文本编码
c = UMT5_XXL(choreographic_text)  # 冻结权重

for step in range(250_000):
    x_0 ~ p_data                    # 采样真实运动
    x_1 ~ N(0, I)                   # 采样噪声
    t ~ U(0, 1)                     # 采样时间步
    x_t = (1-t) * x_0 + t * x_1    # 线性插值 (optimal transport path)
    
    # DiT 预测速度场
    v_pred = DiT(x_t, t, c)        # 12层Transformer, AdaLN-Zero调制
    v_true = x_1 - x_0             # 真实速度场
    
    # Anatomy-aware Loss
    L_body = λ_body * MSE(v_pred[body_joints], v_true[body_joints])
    L_hand = λ_hand * MSE(v_pred[hand_joints], v_true[hand_joints])
    L_rot  = λ_rot  * MSE(v_pred[rot_dims], v_true[rot_dims])
    L_x0   = λ_x0   * MSE(x0_pred, x_0)       # 重建损失
    L_vel  = λ_v    * velocity_regularization
    L_acc  = λ_a    * acceleration_regularization
    
    loss = L_rot + L_body + L_hand + L_x0 + L_vel + L_acc
    optimizer.step(loss)

# === 推理 ===
x_1 ~ N(0, I)                      # 初始噪声
for i in range(50):                 # 50步 Euler 积分
    t = 1 - i/50
    v = (1+w) * DiT(x_t, t, c) - w * DiT(x_t, t, ∅)  # CFG, w=1.0
    x_t = x_t - v * (1/50)

x_0 = inverse_normalize(x_t)       # 反归一化
mhr_params = continuous_to_mhr(x_0) # 260维 → 204维 MHR
video = WanAnimate(mhr_params, ref_image)  # 级联视频生成
```

##### 动机与背景

现有文本驱动舞蹈生成面临两大核心瓶颈：

1. **文本描述粒度不足**：现有数据集（如 HumanML3D、AIST++）的文本标注极为粗糙，平均仅 48 词/段，只能描述"一个人在跳舞"这种级别的语义，无法精确控制身体各部位的动作细节、空间路径、朝向变化和动态质感。这导致生成模型只能产出泛化的、缺乏编舞表现力的动作。

2. **运动表示的不连续性**：传统方法直接使用 SMPL-X 的轴角或欧拉角参数，这些表示在拓扑上存在不连续性（如 \(2\pi\) 处的跳变），导致生成模型在学习旋转空间时频繁出现抖动、扭曲和结构崩溃。

DanceCrafter 从**舞蹈学理论**和**运动表示几何**两个层面同时解决这些问题。

##### 核心机制一：编舞语法（Choreographic Syntax）

编舞语法是本文最核心的理论创新，它将舞蹈学中的 Laban Movement Analysis（拉班动作分析）等理论体系化为四个正交维度：

- **Body（身体）**：描述哪些身体部位参与动作、关节的屈伸状态、重心转移等。例如："右臂从肩部向前伸展，肘关节微屈，手腕上翻"
- **Space（空间）**：描述动作在三维空间中的路径、层级（高/中/低）、范围（近身/远端）。例如："手臂沿弧形路径从低层级上升至高层级"
- **Orientation（朝向）**：使用**钟面系统**（1-12 点钟方向）描述身体和肢体的朝向。例如："面向 8 点钟方向，目光追随左手"
- **Effort（力效）**：描述动作的动态质感，包括时间（急促/持续）、重量（轻盈/沉重）、空间（直接/间接）、流畅度（自由/受限）四个因子。例如："重心骤然下沉，双膝深蹲"

> 💡 关键：钟面系统（Clock-Face System）是编舞语法中处理朝向的核心工具。它将舞台空间划分为 12 个方位（类似钟表刻度），使得文本描述可以精确指定身体转向角度（如"从 8 点钟旋转至 1 点钟"），这是此前任何舞蹈数据集都不具备的能力。

##### 核心机制二：连续流形运动表示

MHR（Momentum Human Rig）是一种 204 维的解耦人体参数化表示（68 维身份 + 136 维姿态）。直接在这个参数空间上训练生成模型会遇到拓扑不连续问题，因此 DanceCrafter 设计了两步转换：

**第一步：连续化映射**

对于旋转参数（轴角表示），转换为 6D 连续旋转表示（Zhou et al., 2019）：

$$\mathbf{r} \in \mathbb{R}^3 \xrightarrow{\text{axis-angle} \to \text{rotation matrix}} \mathbf{R} \in SO(3) \xrightarrow{\text{取前两列}} \mathbf{r}_{6D} \in \mathbb{R}^6$$

对于身份参数中的角度量，使用 sin/cos 编码：

$$\theta \mapsto (\sin\theta, \cos\theta)$$

最终将 204 维 MHR 映射到 260 维连续流形 \(\mathcal{M} \subset \mathbb{R}^{260}\)。

**第二步：混合归一化**

> ⚠️ 注意：不能对旋转维度使用标准 z-score 归一化（减均值除标准差），因为这会破坏 6D 旋转表示的正交约束，导致反映射时产生无效旋转矩阵。

DanceCrafter 采用**混合归一化策略**：
- 旋转维度：仅除以全局标准差 \(\sigma_{\text{rot}}\)，保持流形几何结构
- 平移维度：标准 z-score 归一化 \(\hat{x} = (x - \mu) / \sigma\)

##### 核心机制三：DiT + Flow Matching 生成

生成模型采用 Flow Matching 框架（Lipman et al., 2023），在连续时间 \(t \in [0,1]\) 上定义从数据分布到噪声分布的最优传输路径：

$$x_t = (1-t) \cdot x_0 + t \cdot x_1, \quad x_0 \sim p_{\text{data}}, \quad x_1 \sim \mathcal{N}(0, I)$$

DiT 骨干网络学习预测速度场 \(v_\theta(x_t, t, c)\)，训练目标为：

$$\mathcal{L}_{\text{FM}} = \mathbb{E}_{t, x_0, x_1} \left[ \| v_\theta(x_t, t, c) - (x_1 - x_0) \|^2 \right]$$

**Anatomy-aware Loss** 将速度场按身体部位分解监督：

$$\mathcal{L}_{\text{total}} = \lambda_{\text{rot}} \mathcal{L}_{\text{rot}} + \lambda_{\text{body}} \mathcal{L}_{\text{body}} + \lambda_{\text{hand}} \mathcal{L}_{\text{hand}} + \lambda_{x_0} \mathcal{L}_{x_0} + \lambda_v \mathcal{L}_v + \lambda_a \mathcal{L}_a$$

其中 \(\mathcal{L}_{x_0}\) 是对去噪后 \(x_0\) 的重建损失，\(\mathcal{L}_v\) 和 \(\mathcal{L}_a\) 分别是速度和加速度正则化项，用于保证生成动作的时间平滑性。损失权重设置为 \(\lambda_{\text{rot}}=1.0, \lambda_{\text{body}}=1.5, \lambda_{\text{hand}}=0.5, \lambda_{x_0}=2.0, \lambda_v=0.5, \lambda_a=1.5\)。

> 💡 关键：手部权重 \(\lambda_{\text{hand}}=0.5\) 低于身体权重 \(\lambda_{\text{body}}=1.5\)，这是因为手部关节自由度高但在整体舞蹈中的视觉权重相对较低，过高的手部损失会导致身体主干动作质量下降。

##### 与传统方法的区别

| 维度 | 传统方法（T2M-GPT / MotionDiffuse 等） | DanceCrafter |
|------|---------------------------------------|-------------|
| 文本粒度 | 粗粒度（~48 词/段），仅描述动作类别 | 细粒度（~248 词/段），精确到关节级别 |
| 运动表示 | 直接使用 SMPL-X 轴角/欧拉角（不连续） | 6D 连续旋转 + 混合归一化（连续流形） |
| 生成框架 | VQ-VAE + GPT 或 DDPM | Flow Matching + DiT（连续时间 ODE） |
| 损失设计 | 全局 MSE | Anatomy-aware 分部位监督 |
| 输出形式 | 仅运动序列 | 运动序列 + 级联逼真视频 |

##### 实验结果

在 HumanML3D 上，DanceCrafter 取得 FID 0.868（此前最优 MoMask 为 0.045 但 MM Dist 较差），MM Dist 4.476，Diversity 2.909（接近 GT 的 2.886）。在 AIST++ 舞蹈专用基准上，FID_k 0.273、FID_g 0.150，均为最优。

消融实验验证了各组件的必要性：
- 去除编舞语法（使用粗粒度文本）：FID 从 0.700 恶化至 2.112
- 去除 MHR（使用 SMPL-X）：FID 恶化至 2.799
- 去除 Effort 维度：FID 恶化至 1.030
- 去除连续流形表示精化：FID 恶化至 1.414，且出现严重抖动和扭曲

#### 🧪 练习题

```yaml
question: "DanceCrafter 对旋转维度采用混合归一化而非标准 z-score 归一化的主要原因是什么？"
options:
  - "标准归一化计算量过大，混合归一化更高效"
  - "标准归一化会破坏 6D 旋转表示的正交约束，导致反映射产生无效旋转矩阵"
  - "混合归一化可以增大旋转维度的梯度，加速收敛"
  - "标准归一化会导致旋转维度和平移维度的数值范围不一致"
answer: 1
explain: "6D 连续旋转表示的两列向量需满足正交约束，标准 z-score 归一化（减均值除标准差）会破坏这种几何结构，使得反映射回旋转矩阵时产生无效结果。因此仅除以全局标准差来保持流形结构。"
```