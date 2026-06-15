### UniDrive-WM：统一驾驶世界模型 (Unified Driving World Model)

```yaml
id: unidrive_wm
name: UniDrive-WM
full_name: "统一驾驶世界模型 (Unified Driving World Model)"
year: "2026.01"
org: UC Berkeley
paper_url: "https://arxiv.org/abs/2601.04453"
category: embodied
parent: gaia3
motivation: "统一理解规划生成支持多摄像头一致性"
```

#### 📝 一句话总结

UniDrive-WM 提出一个统一 VLM 驾驶世界模型，在同一架构中联合完成多视角场景理解、轨迹规划和轨迹条件未来图像生成，解决自动驾驶中感知、预测、规划和生成模块割裂导致的信息瓶颈与误差累积问题。

#### 🎯 核心要点

- **统一 VLM 框架**：将 scene understanding、trajectory planning、future image generation 集成到同一多模态模型
- **QT-Former 编码器**：融合多摄像头视觉输入、历史记忆、感知查询和场景查询
- **连续轨迹规划头**：输出未来 ego trajectory，将语言/视觉推理空间连接到动作空间
- **轨迹条件未来图像生成**：用预测轨迹作为条件生成未来前视图像，形成可视化世界模型
- **两种生成路径**：比较离散 AR visual token 生成和连续 AR+diffusion/flow-matching 生成
- **联合训练流程**：先联合规划与图像生成，再加入 VQA/场景理解任务
- **Bench2Drive 评估**：在规划 L2 error、collision rate 和生成质量上优于此前方法

#### 🔬 深入细节

##### Pipeline 图

![UniDrive-WM pipeline](https://unidrive-wm.github.io/UniDrive-WM/static/png/pipeline2.png)
*图：UniDrive-WM 将多视角图像、历史和查询输入 QT-Former，再送入 LLM/LoRA，统一输出轨迹规划、未来图像生成和 VQA/场景理解结果。*

##### 算法伪代码

```python
# UniDrive-WM training and inference pipeline
def unidrive_forward(multiview_images, history, instruction):
    # 1. 多视角视觉与历史编码
    image_features = vision_encoder(multiview_images)
    query_features = QTFormer(
        image_features,
        perception_queries=True,
        scene_queries=True,
        history_queries=history
    )

    # 2. VLM reasoning space
    text_tokens = text_tokenizer(instruction)
    vlm_tokens = fuse_text_vision(text_tokens, query_features)
    hidden = LLM_with_LoRA(vlm_tokens)

    # 3. 多任务输出
    trajectory = trajectory_head(hidden)             # future ego waypoints
    future_image = image_generator(hidden, trajectory)
    vqa_answer = language_head(hidden)
    return trajectory, future_image, vqa_answer

# training objective
loss = planning_loss(trajectory, gt_waypoints)
loss += future_image_loss(future_image, gt_future_frame)
loss += vqa_loss(vqa_answer, gt_text_answer)
```

##### 动机与背景

自动驾驶世界模型通常要同时回答三个问题：当前场景是什么、未来会怎样、车辆应该怎么走。现有系统常把它们拆成独立模块：感知网络检测物体，规划器预测轨迹，生成模型渲染未来帧，VLM 再做文本推理。这种流水线会产生信息瓶颈。例如，丰富的几何和运动线索被压缩成文本描述后再用于规划，会丢失细节；生成模型可以合成逼真画面，却未必与规划轨迹一致。

UniDrive-WM 的动机是把理解、规划和生成统一在一个 VLM-centric world model 中，使动作空间、视觉未来和语言推理空间互相约束。论文在 arXiv 上已有 v3 更新；清单中的通用 abs 链接保持有效，正文按当前可访问版本总结。

##### 统一任务形式

论文把驾驶世界建模写成联合预测：

$$p_\theta(s_{t+1}, \tau_{t:t+H} \mid s_{\le t}, I)$$

其中 \(s_{\le t}\) 包含多视角图像、历史上下文和感知特征，\(I\) 是语言/高层指令，\(\tau\) 是未来 ego trajectory，\(s_{t+1}\) 的一部分由未来图像表示。更具体地：

$$\hat{\tau}, \hat{x}_{t+1}, \hat{y}_{\text{VQA}}
= f_\theta(\text{multi-view images}, \text{history}, \text{instruction})$$

这种联合输出让规划不再只是数值轨迹，未来图像也不再只是无条件生成，而是轨迹条件的可视化预测。

##### QT-Former：多视角和历史融合

UniDrive-WM 建立在 Orion 风格的 VLM 驾驶规划模型上，使用 QT-Former 处理视觉特征。多摄像头图像先经 vision encoder 得到 image features，再通过 learnable queries 与图像特征做 cross-attention。查询分成几类：perception queries 用于对象、车道、交通状态等感知辅助头；scene queries 用于场景语义；history queries 通过 memory bank 保留历史帧信息。

这种结构的价值在于把多视角几何、时间历史和场景语义压成可送入 LLM 的 vision embeddings。LLM 不直接处理原始多摄像头像素，而是在查询抽取后的紧凑表示上进行推理和输出。

##### 轨迹规划与未来图像生成的耦合

UniDrive-WM 的 trajectory planner 输出连续未来 waypoint。这个轨迹不仅是最终规划结果，还作为 future image generation 的条件。生成分两条路线：

- **离散 AR 路线**：把未来图像离散为 visual tokens，让 LLM/AR decoder 预测 token，再用 MoVQGAN 等 detokenizer 还原图像
- **AR+Diffusion 路线**：先自回归预测连续 latent，再用 diffusion/flow-matching 风格 decoder 生成更高保真图像

两者体现了世界模型中的经典权衡：离散 AR 更统一、更像语言建模；连续扩散路径生成质量更强，但系统复杂度和计算成本更高。

##### 联合损失与训练流程

训练目标可以概括为：

$$\mathcal{L}
= \lambda_{\text{plan}}\mathcal{L}_{\text{traj}}(\hat{\tau},\tau)
+ \lambda_{\text{img}}\mathcal{L}_{\text{img}}(\hat{x}_{t+1},x_{t+1})
+ \lambda_{\text{vqa}}\mathcal{L}_{\text{text}}(\hat{y},y)$$

规划损失约束未来 waypoint，图像损失约束轨迹条件未来帧，VQA/文本损失增强场景理解和动作推理。论文训练流程先联合规划与图像生成，使模型学会把动作和视觉未来对齐；随后加入 VQA 等理解任务，提高 VLM 对驾驶场景的语义解释能力。

##### 与传统自动驾驶世界模型的区别

GAIA、DriveDreamer 等驾驶世界模型侧重视觉未来生成；VLM planning 方法侧重语言/视觉推理到轨迹；UniDrive-WM 的重点是统一三者。未来图像为规划提供额外监督，规划轨迹为图像生成提供可控条件，VQA 任务又迫使共享表示保留语义和因果信息。

> 💡 关键：UniDrive-WM 的世界模型不是单纯“生成未来街景”，而是把未来街景生成变成轨迹规划的可视化一致性约束。

#### 🧪 练习题

```yaml
question: "UniDrive-WM 中未来图像生成为什么要以规划轨迹为条件？"
options:
  - "为了让生成的未来场景与 ego 车辆计划动作保持一致"
  - "为了取消多视角视觉编码器"
  - "为了只输出文本，不再输出轨迹"
  - "为了避免训练时使用任何真实未来帧"
answer: 0
explain: "轨迹条件生成把动作空间和视觉未来连接起来，使模型预测的未来画面能反映计划中的车辆运动。"
```
