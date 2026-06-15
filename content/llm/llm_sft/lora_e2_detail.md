### LoRA-E2
```yaml
id: lora_e2
name: LoRA-E2
full_name: 高效低秩适配E2 (LoRA-E2)
year: '2026.01'
org: Alibaba
paper_url: https://dl.acm.org/doi/abs/10.1145/3774904.3792500
category: frontier
parent: dora
motivation: 正则化优化稳定训练超越DoRA
```

#### 📝 一句话总结
LoRA-E2 针对标准 LoRA 在大宽度层中特征学习效率低、\(B=0\) 导致 \(A\) 初期更新无效的问题，提出更稳定的 \(A\) 初始化和 Gauss-Seidel 式交替训练，使 LoRA 适配更快、更有效。

#### 🎯 核心要点
- 指出标准 LoRA 的两个训练缺陷：宽度 \(n\) 很大时特征学习低效，以及 \(B\) 置零时 \(A\) 在早期缺少有效更新。
- 将 \(A\) 的高斯初始化方差设为 \(\Theta(n^{-3/4})\)，区别于常规 Kaiming 风格 \(\Theta(n^{-1})\) 初始化。
- 使用 Gauss-Seidel 迭代训练 LoRA 矩阵：先固定 \(A\) 更新 \(B\)，再固定 \(B\) 更新 \(A\)。
- 保持 LoRA 的推理结构不变，仍然是冻结基座权重加低秩增量 \(BA\)。
- 公开实现覆盖 NLU/T5-base/GLUE 与 NLG/LLaMA2-7B/MetaMathQA，报告更快收敛和优于标准 LoRA 的表现。

#### 🔬 深入细节
![LoRA A/B 低秩分支结构](https://dkopi.github.io/vera/diagram.png)
*图源：VeRA 官方项目页中的 LoRA/VeRA 对比图。LoRA-E2 保持标准 LoRA A/B 分支结构，主要改变 A 初始化和 A/B 优化顺序。ACM PDF 需要访问权限，方法信息补充来自 ACM 摘要页、La Trobe 公开研究输出页和官方 GitHub。*

公开论文页面：https://dl.acm.org/doi/10.1145/3774904.3792500  
官方代码页：https://github.com/whu-totemdb/LoRA-E2

```python
# LoRA-E2 训练伪代码
for lora_layer in target_modules:
    # A 使用更大的稳定高斯初始化，B 仍置零以保持初始模型不变
    A.weight ~ Normal(0, std=sqrt(2 / fan_in**0.75))
    B.weight = 0

for batch in data:
    if mode == "LoRA-E2":
        # Step 1: 固定 A，更新 B
        freeze(A); unfreeze(B)
        loss_B = task_loss(model(batch))
        optimizer.step(loss_B)

        # Step 2: 固定 B，更新 A
        unfreeze(A); freeze(B)
        loss_A = task_loss(model(batch))
        optimizer.step(loss_A)
    else:
        # 标准 LoRA 同时更新 A/B
        unfreeze(A, B)
        loss = task_loss(model(batch))
        optimizer.step(loss)
```

标准 LoRA 的前向形式为：

$$
h = W_0x + \frac{\alpha}{r}BAx
$$

其中 \(W_0\) 冻结，\(A\) 通常随机初始化，\(B=0\)。这个设计保证训练开始时 \(\Delta W=BA=0\)，不会破坏预训练模型输出；但副作用是第一步反向传播时，\(A\) 的有效梯度会受到 \(B=0\) 影响，早期主要只有 \(B\) 真正学到东西。LoRA-E2 的出发点就是让 \(A\) 也能更早、更稳定地参与特征学习。

LoRA-E2 第一处改动是初始化尺度。公开摘要给出的形式是让 \(A\) 使用方差 \(\Theta(n^{-3/4})\) 的高斯初始化，其中 \(n\) 是 embedding/层宽度。官方代码中的 `stable_init` 等价地使用 `std = sqrt(2 / fan_in**0.75)`。与 \(\Theta(n^{-1})\) 相比，这在大宽度层中给低秩分支更强但仍受控的初始信号，减少“低秩特征太弱、学习太慢”的问题。

第二处改动是优化方式。Gauss-Seidel 的思想不是同时对 \(A,B\) 做一次联合更新，而是把耦合变量拆成两个子问题：固定 \(A\) 时更新 \(B\)，再固定 \(B\) 时更新 \(A\)。这样 \(A\) 更新时已经有非零的 \(B\) 参与路径，梯度更有效；\(B\) 更新时则利用当前 \(A\) 的投影特征，训练过程更接近坐标交替优化。

与 DoRA 这类改变权重分解方式的方法相比，LoRA-E2 更像是“训练动力学修正”：它保留 LoRA 的部署形态和参数规模，主要调整初始化与更新顺序。实践价值在于无需改推理图，也不需要额外模块；如果已有 LoRA 训练代码，只需替换初始化函数并在 Trainer 中实现 A/B 交替冻结更新。

> ⚠️ 注意：manifest 中的 motivation 提到“正则化优化稳定训练超越DoRA”，但公开摘要和代码最明确支持的核心机制是初始化尺度与 Gauss-Seidel 交替训练；本文据此展开。

#### 🧪 练习题
```yaml
question: "LoRA-E2 为什么要采用 Gauss-Seidel 式交替训练？"
options:
  - "为了在训练时删除 B 矩阵"
  - "为了让固定一个低秩因子时有效更新另一个因子，缓解 A 早期更新无效"
  - "为了把 LoRA 变成全参数微调"
  - "为了增加推理时的额外层"
answer: 1
explain: "标准 LoRA 中 B 初始为零会削弱 A 的早期学习；交替更新先让 B 获得信号，再用非零 B 支持 A 的有效梯度。"
```
