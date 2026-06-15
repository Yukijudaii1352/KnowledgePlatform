### 4D-LRM：面向任意视角与任意时间的时空重建模型
```yaml
id: 4d_lrm
name: 4D-LRM
full_name: 4D大规模重建 (4D-LRM)
year: "2025.12"
org: arXiv
paper_url: https://arxiv.org/abs/2512.04000
category: feed_forward
parent: lrm
motivation: 首个大规模4D动态重建模型
```

#### 📝 一句话总结
4D-LRM 将 LRM 的前馈重建扩展到空间-时间联合建模，直接从带位姿和时间戳的稀疏图像预测 4D Gaussian，解决动态物体难以在任意视角与任意时间一致重建的问题。manifest 中链接在本次检索中不可用；以下基于公开论文 “4D-LRM: Large Space-Time Reconstruction Model From and To Any View at Any Time” 与 manifest 信息整理。

#### 🎯 核心要点
- 4D 表示：用各向异性 4D Gaussian 同时建模三维空间和连续时间。
- 任意 view-time 输入：输入可以来自不同相机视角和不同时间戳。
- Transformer 解码：把 RGB、Plucker ray、timestamp 拼接为 token，回归 4DGS 参数。
- 连续时间渲染：在目标时间条件化 4D Gaussian，得到对应 3D Gaussian 后 splatting。
- 数据驱动训练：面向动态对象数据训练，学习运动、形变和多视角补全先验。

#### 🔬 深入细节
![4D-LRM 概览图](https://arxiv.org/html/2506.18890v1/x1.png)
*图：公开 arXiv HTML 中的 4D-LRM 概览，展示从稀疏 view-time 输入到任意 view-time 渲染的目标。*

```python
# 4D-LRM 核心流程伪代码
inputs = []
for image, camera, time in observed_frames:
    ray = plucker_rays(camera)
    time_map = full_like(image[..., :1], time)
    tokens = patchify(concat(image, ray, time_map))
    inputs.append(tokens)

tokens = concat_in_temporal_order(inputs)
tokens = transformer(tokens)
gaussians_4d = gaussian_head(tokens)  # mean/covariance/color/opacity in space-time

def render_at(camera_target, time_target):
    gaussians_3d = condition_4d_gaussians(gaussians_4d, time_target)
    return gaussian_splatting(gaussians_3d, camera_target)
```

静态 LRM 只需要回答“一个物体在三维空间中是什么样”，而 4D-LRM 还要回答“这个物体在任意时间是什么样”。传统动态重建常对每个序列逐实例优化，或者假设单目视频和有限相机轨迹；4D-LRM 的目标是训练一个通用前馈模型，从稀疏 view-time 观测中直接预测时空表示。

4D Gaussian 可以看作在 \((x,y,z,t)\) 中定义的高斯 primitive。给定目标时间 \(t\)，模型对 4D 高斯做条件化，得到该时刻的 3D 均值和协方差。例如直觉上可写为：

$$
\mu_{xyz|t} =
\mu_{1:3} + \Sigma_{1:3,4}\Sigma_{4,4}^{-1}(t-\mu_4)
$$

这表示高斯中心会随时间连续变化，因此模型能插值未观测帧，而不是只能记住离散帧。

输入编码也必须包含几何和时间。每张图像除了 RGB，还拼接相机 ray 表示和时间戳 map：

$$
\widetilde{I}_j = \text{Concat}(I_j, P_j, T_j)
$$

其中 \(P_j\) 是每个像素的 Plucker ray 或等价位姿编码，\(T_j\) 是时间编码。这样 Transformer 在 token 层同时知道“这个像素来自哪个空间射线”和“它属于哪个时间”。

> 💡 关键：4D-LRM 的创新是把动态重建统一成“从 view-time token 回归 4DGS”，而不是先逐帧重建 3D 再做时间配准。

与静态 LRM 相比，4D-LRM 多了时间连续性和运动建模；与基于扩散的 4D 生成相比，它更强调忠实重建输入观测。局限在于需要可靠位姿和高质量动态数据，快速非线性运动、自遮挡和复杂拓扑变化仍可能产生 temporal ghosting。

#### 🧪 练习题
```yaml
question: "4D-LRM 中 4D Gaussian 的主要作用是什么？"
options:
  - "只保存每帧的 2D RGB 图片"
  - "在统一时空表示中建模空间位置和连续时间变化"
  - "完全替代相机位姿输入"
  - "只用于文本提示词编码"
answer: 1
explain: "4D Gaussian 在 xyz+t 空间中表示动态 primitive，目标时间条件化后可得到该时刻的 3D Gaussian 用于渲染。"
```
