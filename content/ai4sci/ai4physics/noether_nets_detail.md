### Noether Networks: 诺特网络 (Noether Networks)

```yaml
id: noether_nets
name: Noether Networks
full_name: 诺特网络 (Noether Networks)
year: '2021'
org: MIT
paper_url: https://proceedings.neurips.cc/paper/2021/hash/8e296a067a37563370ded05f5a3bf83e-Abstract.html
category: physics_constrained
parent: —
motivation: 基于诺特定理自动发现守恒量
```

#### 📝 一句话总结
Noether Networks 将“寻找可用归纳偏置”转化为“元学习一个在预测时被强制保持的守恒量”，用可学习的守恒损失在每个输入序列上临时调整预测器。它解决了连续对称性难以直接发现、而守恒量可从真实轨迹中观测并用于改进长时序预测的问题。

#### 🎯 核心要点
- 核心对象：基础序列预测器 \(f_\theta\) 负责 rollout，可学习嵌入 \(g_\phi\) 输出候选守恒量或守恒特征。
- Noether loss：约束预测序列中的 \(g_\phi(\tilde{x}_t)\) 与初始状态或相邻时间步的 \(g_\phi\) 保持一致。
- Prediction-time tailoring：先用 \(f_\theta\) 生成临时预测 \(\tilde{x}_{1:T}\)，再用守恒损失对 \(\theta\) 做内循环更新，最后用更新后的 \(\theta(x_0;\phi)\) 重新预测。
- 元学习目标：外循环通过监督任务损失优化 \(\phi\) 和 \(\theta\)，使“守恒损失造成的内循环更新”真正降低预测误差。
- 反平凡化思路：不是寻找任意低方差守恒量，而是寻找用于内循环后能改善任务 loss 的 useful conserved quantities。
- 理论直觉：若守恒约束把输出限制在 \(g_\phi\) 的低维 preimage 上，泛化界中的有效维度可从原始维度 \(d\) 降到 preimage 维度 \(m\)。
- 科学数据实验：用带物理量纲检查的 DSL 搜索公式，能恢复理想弹簧、理想摆以及有耗散真实摆的近似能量守恒形式。
- 原始视频实验：用 CNN 参数化 \(g_\phi\)，在 Physics 101 斜坡视频和受控摆视频中从像素学习有助于长时预测的守恒嵌入。

#### 🔬 深入细节
来源说明：NeurIPS 页面给出正式论文入口，论文公开版本与 TeX 源可从 arXiv `https://arxiv.org/abs/2112.03321` 获取；项目页为 `https://dylandoblar.github.io/noether-networks/`，代码仓库为 `https://github.com/dylandoblar/noether-networks`。下图来自 ar5iv 对论文 Figure 1 的公开 HTML 渲染。

![Noether Networks 预测时守恒约束流程](https://ar5iv.labs.arxiv.org/html/2112.03321/assets/x1.png)
*图：Noether Networks 用 \(g_\phi\) 元学习守恒损失，并在 \(f_\theta\) 生成最终预测前用该损失进行 prediction-time tailoring。*

```python
# Noether Networks with neural conservation loss 伪代码
initialize base predictor f_theta
initialize conserved embedding g_phi

def noether_loss(x0, pred_seq):
    # 论文中使用两种形式：相对初始状态，或相邻时间步
    return sum(norm(g_phi(x0) - g_phi(x_t))**2 for x_t in pred_seq)

def predict_sequence(x0, theta, phi):
    x_tilde = [x0]
    for t in range(1, T + 1):
        x_tilde.append(f_theta(x_tilde[-1], theta))

    inner_loss = noether_loss(x0, x_tilde[1:])
    theta_adapted = theta - lambda_inner * grad(inner_loss, theta)

    x_hat = [x0]
    for t in range(1, T + 1):
        x_hat.append(f_theta(x_hat[-1], theta_adapted))
    return x_hat[1:]

for batch in train_loader:
    task_loss = 0.0
    for x0, target_seq in batch:
        pred_seq = predict_sequence(x0, theta, phi)
        task_loss += supervised_loss(pred_seq, target_seq)

    # 外循环：反传穿过内循环更新，学习 theta 和守恒嵌入 phi
    theta -= lambda_outer * grad(task_loss, theta)
    phi -= lambda_embed * grad(task_loss, phi)
```

Noether Networks 的动机来自诺特定理：连续对称性对应守恒量。直接学习“系统对哪些连续变换保持不变”很难，因为对称性涉及未观测的反事实扰动；而守恒量可以沿真实轨迹直接检查，例如能量、动量或某些从像素中抽取的近似不变量。论文利用这一点，把归纳偏置写成一个守恒损失，而不是手工指定等变架构。

给定初始状态 \(x_0\)，基础模型先生成一段临时预测：

$$
\tilde{x}_t=f_\theta(\tilde{x}_{t-1}),\qquad t=1,\ldots,T.
$$

可学习嵌入 \(g_\phi\) 把状态映射到守恒特征空间。论文给出的主要守恒损失为：

$$
\mathcal{L}_{\rm Noether}(x_0,\tilde{x}_{1:T};g_\phi)
=\sum_{t=1}^{T}\left\|g_\phi(x_0)-g_\phi(\tilde{x}_t)\right\|_2^2.
$$

另一种近似形式是相邻时间步守恒：

$$
\sum_{t=1}^{T}\left\|g_\phi(\tilde{x}_{t-1})-g_\phi(\tilde{x}_t)\right\|_2^2.
$$

前者能把初始真实信息更直接地传给所有预测步，后者更适合“近似守恒但会缓慢漂移”的现实系统。两者都不是普通训练阶段的辅助损失，而是在预测函数内部执行的 tailoring loss：模型先按当前 \(\theta\) 预测，再用该序列上的守恒损失做内循环更新：

$$
\theta(x_0;\phi)=
\theta-\lambda_{\rm in}\nabla_\theta
\mathcal{L}_{\rm Noether}(x_0,\tilde{x}_{1:T}(\theta);g_\phi).
$$

最终输出由更新后的参数产生：

$$
\hat{x}_t=f_{\theta(x_0;\phi)}(\hat{x}_{t-1}).
$$

外循环再通过真实任务损失学习 \(\phi\) 与 \(\theta\)：

$$
\min_{\theta,\phi}\ \mathcal{L}_{\rm task}(x_{1:T},\hat{x}_{1:T}).
$$

> 💡 关键：\(g_\phi\) 的目标不是成为一个“看起来守恒”的描述符，而是成为一个“被预测时优化后能降低任务误差”的守恒损失。平凡常数 \(g_\phi(x)=C\) 即使完全守恒，也无法提供有用梯度，因而不会在外循环中带来预测收益。

论文还给出一个理论直觉：若 \(g_\phi\) 的 preimage 是低维流形或仿射子空间，约束 \(g_\phi(f_\theta(x))=g_\phi(x)\) 等价于把输出限制在该低维集合内。设原始输出维度为 \(d\)，preimage 维度为 \(m\)，则泛化界中的有效维度项可从 \(d\) 替换为 \(m\)。直观上，守恒量越有信息，满足守恒的候选输出空间越小，模型越不容易在训练外漂移。

在可解释物理实验中，Noether Networks 使用带量纲检查的 DSL 搜索公式。DSL 包括输入变量、\(+,-,\cdot,/,\sin,\cos,x^2\) 和带单位的可训练标量。候选公式先在真实轨迹上筛出近似低方差项，再作为 meta-tailoring loss 评估其预测收益。论文报告其在理想摆中发现 \(p^2-2.99\cos(q)\)，接近真实 Hamiltonian 的等价形式；在理想弹簧中发现 \(q^2+1.002p^2\)；在真实有耗散摆中发现近似 \(p^2-2.39\cos(q)\)，说明方法不要求守恒量严格精确，只要其软约束有助于预测即可。

在像素视频中，\(g_\phi\) 不再是显式公式，而是两层 CNN 加投影层输出 64 维嵌入。Noether loss 在原始视频帧或相邻帧上施加，使预测时的内循环更新保留与物体、运动和场景几何相关的长期信息。Grad-CAM 分析显示嵌入会关注滑动物体、目标物体、斜坡边缘等区域，这支持了“守恒量可以从原始观测中以神经特征形式出现”的假设。

#### 🧪 练习题
```yaml
question: "Noether Networks 中 prediction-time tailoring 的核心作用是什么？"
options:
  - "在训练前把所有视频帧转换成哈密顿量标签"
  - "用元学习的守恒损失在每个输入序列上临时更新预测器参数，再生成最终预测"
  - "强制所有系统都严格满足能量守恒"
  - "只在训练集上加入一个普通辅助分类损失"
answer: 1
explain: "Noether loss 被放在预测函数内部优化，使模型在测试样本上也能按学习到的守恒偏置自适应；外循环则学习这个守恒损失是否真的改善任务预测。"
```
