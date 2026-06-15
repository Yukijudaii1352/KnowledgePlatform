### 多模态DPO (MM-DPO)

```yaml
id: mm_dpo
full_name: 多模态DPO (MM-DPO)
year: '2026'
paper_url: https://mm-rlhf.github.io/
motivation: 动态奖励缩放多模态对齐
parent: dpo
category: token_multimodal
```

#### 📝 一句话总结
MM-DPO 在多模态 RLHF 中引入基于 reward margin 的 dynamic reward scaling，用高质量多模态奖励模型为每个样本调节 DPO 更新强度，提升对齐稳定性和数据效率。

#### 🎯 核心要点
- MM-RLHF 项目包含多模态偏好数据、critique-based reward model、MM-DPO 对齐算法和相关 reward/safety benchmarks。
- 奖励模型分两阶段训练：先学习 critique，再学习基于 critique 的评分。
- MM-DPO 使用外部多模态 reward model，而不是依赖 MLLM 自身隐式奖励来调节 \(\beta\)。
- 动态缩放将 \(\beta_i\) 限制在 \([\beta_{\mathrm{ori}},(1+w)\beta_{\mathrm{ori}}]\)，避免异常样本造成过强更新。
- 项目页显示该机制根据 reward margin 调整 update strength，以提升优化稳定性和鲁棒性。

#### 🔬 深入细节
![MM-DPO 动态奖励缩放框架](https://mm-rlhf.github.io/static/images/mm_dpo.png)
*图：MM-DPO 根据奖励模型给出的 pairwise margin 动态调节 DPO 更新强度。*

```python
# MM-DPO 动态 reward scaling 伪代码
for image_or_video, prompt, y_w, y_l in mm_preference_data:
    score_w = mm_reward_model(image_or_video, prompt, y_w)
    score_l = mm_reward_model(image_or_video, prompt, y_l)
    margin = score_w - score_l

    scale = sigmoid(k * margin)
    beta_i = beta_ori * (1 + w * clip(scale, 0, 1))
    beta_i = clip(beta_i, beta_ori, (1 + w) * beta_ori)

    logratio_w = logp(policy, y_w) - logp(reference, y_w)
    logratio_l = logp(policy, y_l) - logp(reference, y_l)
    loss = -logsigmoid(beta_i * (logratio_w - logratio_l))
    update(policy, loss)
```

MM-DPO 的背景是多模态偏好样本质量和难度差异更大：有些样本只需辨认显著物体，有些样本涉及 OCR、视频时序、安全拒答或细粒度视觉事实。固定 \(\beta\) 的 DPO 会对所有样本施加同样强度，容易在噪声或不确定样本上更新过猛。

项目先训练一个多任务 reward model。它不仅输出分数，还学习对模型回答进行 critique，这使 reward signal 更贴近人类多模态评估逻辑。随后 MM-DPO 不依赖 policy 自己的 implicit reward，因为论文指出 MLLM 的隐式奖励在复杂多模态数据中区分度较弱，不能稳定指导样本级 \(\beta\)。

动态缩放机制把 reward margin 转换成实例级 \(\beta_i\)。margin 越清晰，说明 chosen 与 rejected 的质量差越可靠，可以给予更强偏好更新；margin 不清晰时则保持接近原始 \(\beta_{\mathrm{ori}}\)。约束区间 \([\beta_{\mathrm{ori}},(1+w)\beta_{\mathrm{ori}}]\) 防止 outlier margin 把梯度放大到不稳定。

与普通 DPO 相比，MM-DPO 的变化点很小但很关键：loss 仍是 reference-regularized pairwise preference objective，只是把全局温度替换成样本级温度。这样能复用成熟 DPO 训练管线，同时让多模态 reward model 直接调节训练力度。

> 💡 关键：MM-DPO 的“多模态”不只是输入含图像/视频，而是用多模态奖励模型判断每个偏好对的可信 margin，再动态决定 DPO 应该学多猛。

#### 🧪 练习题
```yaml
question: "MM-DPO 为什么使用外部多模态 reward model 来调节 beta？"
options:
  - "因为 MLLM 自身隐式奖励在多模态复杂样本中区分度不足"
  - "因为 DPO 不能处理图像输入"
  - "因为 reward model 用来替代 policy 生成答案"
  - "因为 beta 必须固定为 0"
answer: 0
explain: "论文指出 MLLM 场景中隐式奖励信号不可靠，因此用高质量外部 reward margin 做实例级 beta 缩放。"
```
