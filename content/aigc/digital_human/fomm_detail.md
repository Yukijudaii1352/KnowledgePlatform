### FOMM — 一阶运动模型驱动的单图动画
```yaml
id: "fomm"
name: "FOMM"
full_name: "一阶运动模型 (First Order Motion Model)"
year: "2019"
org: "Snap Inc."
paper_url: "https://arxiv.org/abs/2003.00196"
category: "talking_head"
parent: "monkey_net"
motivation: "一阶泰勒近似运动场实现单图驱动"
```

#### 📝 一句话总结
FOMM 在 Monkey-Net 的无监督关键点框架上加入局部仿射 Jacobian，用一阶泰勒近似构造更精细的稠密运动场，从而实现经典的一张图驱动视频动画。

#### 🎯 核心要点
- **关键改进**：每个关键点不只提供位置，还提供局部 Jacobian，能表达旋转、缩放和剪切等局部一阶运动。
- **运动建模**：为每个关键点构造一个候选变换，再由 dense motion network 预测软掩码混合这些变换。
- **遮挡处理**：输出 occlusion map，告诉生成器哪些源特征可信、哪些区域需要补全。
- **训练方式**：仍然使用同视频帧重建和等变性约束，无需人工关键点。

#### 🔬 深入细节
##### 核心示意图
![FOMM overview](https://ar5iv.labs.arxiv.org/html/2003.00196/assets/x5.png)

##### 方法拆解
FOMM 的核心观察是：只用关键点位移描述运动过于粗糙。真实面部或人体运动在关键点附近不只是平移，还包含局部旋转、缩放和非刚性变形。因此论文把局部运动写成一阶泰勒展开，关键点 \(p_k\) 附近的变换由位置和 Jacobian 共同决定。

对第 \(k\) 个关键点，源到驱动的候选反向变换可写成：

$$
T_{s\leftarrow d,k}(z)=p_{s,k}+J_{s,k}J_{d,k}^{-1}(z-p_{d,k})
$$

其中 \(p_{s,k},p_{d,k}\) 是源帧和驱动帧的关键点位置，\(J_{s,k},J_{d,k}\) 是对应局部仿射矩阵。这个公式让局部区域可以随驱动帧发生旋转和形变，而不只是围绕关键点平移。

Dense motion network 会接收所有候选变换后的源图像/特征，并预测每个像素属于哪个局部运动的软掩码 \(M_k(z)\)。最终稠密运动场是多个候选场的加权和：

$$
\hat{T}_{s\leftarrow d}(z)=\sum_{k=0}^{K}M_k(z)T_{s\leftarrow d,k}(z)
$$

其中 \(k=0\) 常表示背景恒等变换。由于驱动姿态可能暴露源图像中不存在的区域，网络还会预测遮挡图 \(\hat{O}\)，生成器据此决定哪些 warping 特征可用，哪些需要由生成先验补全。

##### 核心流程伪代码
```python
def fomm_forward(source, driving):
    kp_s, jac_s = keypoint_detector(source)
    kp_d, jac_d = keypoint_detector(driving)

    candidate_flows = [identity_flow()]
    for k in range(num_keypoints):
        local_flow = first_order_flow(
            source_point=kp_s[k],
            driving_point=kp_d[k],
            source_jacobian=jac_s[k],
            driving_jacobian=jac_d[k],
        )
        candidate_flows.append(local_flow)

    masks, occlusion = dense_motion_network(source, candidate_flows)
    dense_flow = weighted_sum(masks, candidate_flows)
    return generator(source, dense_flow, occlusion)
```

##### 训练与推理
训练时，FOMM 从同一视频抽取源帧和驱动帧，要求重建驱动帧。关键点检测器、dense motion network 和生成器端到端训练。等变性损失同样重要：随机变换图像后，关键点位置和 Jacobian 应与该变换一致，这会抑制关键点漂移到纹理噪声上。

推理时，源图像只需一张。驱动视频逐帧提供运动，FOMM 通过相对关键点运动把驱动表情、头部姿态或物体姿态迁移到源图像上。它的速度和质量让它成为 talking-head 和 image animation 领域的强基线。

局限是它仍依赖 2D warping。大姿态变化、严重遮挡、侧脸转正、口腔内部和头发等不可见区域需要生成器补全，容易出现模糊或伪影。后续 Head2Head、MegaPortraits、LivePortrait 和扩散式方法大多在高分辨率、3D 表达或时序生成方面继续改进。

#### 🧪 练习题
```yaml
question: "FOMM 相比 Monkey-Net 的关键技术提升是什么？"
options:
  - "完全取消关键点检测器"
  - "把关键点从 2D 坐标扩展为位置加局部 Jacobian 的一阶运动表示"
  - "只使用文本提示生成视频"
  - "用人工标注 landmark 替代自监督训练"
answer: 1
explanation: "FOMM 通过局部 Jacobian 建模关键点附近的一阶仿射运动，从而获得比单纯位移更精细的 dense motion。"
```
