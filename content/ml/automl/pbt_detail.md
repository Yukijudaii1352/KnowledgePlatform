### PBT — 种群训练 (Population Based Training)

```yaml
id: pbt
name: PBT
full_name: "种群训练 (Population Based Training of Neural Networks)"
year: "2017"
org: "DeepMind"
paper_url: "https://arxiv.org/abs/1711.09846"
category: "automl"
parent: "—"
motivation: "训练中动态在线进化超参，将并行搜索与序列优化统一为异步种群进化框架"
```

#### 📝 一句话总结

PBT 提出了一种将**种群进化**与**梯度优化**相结合的在线超参数调优框架：在并行训练的种群中，表现差的成员复制（exploit）优秀成员的权重，并扰动（explore）其超参数继续训练，从而在**单次训练过程中**自动发现超参数的动态调度策略，无需额外计算开销。

#### 🎯 核心要点

- **种群并行训练**：N 个模型（worker）异步并行训练，共享全局性能信息，无需集中式同步
- **Exploit 机制**：表现差的 worker 复制表现好的 worker 的权重和超参数（截断选择 / T-test 选择）
- **Explore 机制**：复制后对超参数进行随机扰动（×1.2 或 ×0.8）或从先验分布重采样
- **在线超参调度发现**：自动发现学习率衰减等非平凡的超参数 schedule，而非仅找到固定最优值
- **热启动 + 无额外开销**：利用训练中间状态（warm-start），总计算量与普通并行搜索相同
- **广泛适用性**：在深度 RL（DM Lab / Atari / StarCraft II）、机器翻译（Transformer）、GAN 训练五大领域均取得显著提升

#### 🔬 深入细节

##### 核心框架图

![PBT 框架示意图](https://ar5iv.labs.arxiv.org/html/1711.09846v1/assets/x1.png)
*图：PBT 与传统方法对比。左：序列优化（逐个尝试超参）；中：并行搜索（同时训练多组固定超参）；右：PBT（并行训练 + 在线进化超参，种群成员之间可交换信息）。*

##### 算法伪代码

```python
# Algorithm 1: Population Based Training (PBT)
def PBT_Train(population P):
    # P 中每个成员 = (θ, h, p, t)
    #   θ: 模型权重, h: 超参数, p: 当前性能, t: 训练步数
    
    for (θ, h, p, t) in P:  # 异步并行
        while not end_of_training:
            θ ← step(θ | h)          # 用超参 h 做一步梯度更新
            p ← eval(θ)              # 评估当前模型性能
            
            if ready(p, t, P):        # 是否达到 exploit/explore 条件
                h', θ' ← exploit(h, θ, p, P)  # 利用种群找更好解
                if θ != θ':           # 如果发生了替换
                    h, θ ← explore(h', θ', P)  # 扰动超参数
                    p ← eval(θ)       # 重新评估
            
            update P with (θ, h, p, t+1)
    
    return θ with highest p in P
```

##### 方法细节

**动机与背景**

神经网络训练高度依赖超参数（学习率、正则化强度、损失权重等）的选择。传统方法面临两难困境：

- **序列优化**（如手动调参、贝叶斯优化）：每次完整训练后才能评估一组超参数，计算代价极高
- **并行搜索**（如随机搜索、网格搜索）：同时训练多组固定超参数，但各 worker 之间完全独立，无法利用训练中间信息

更关键的是，最优超参数往往**随训练阶段变化**（例如学习率需要先大后小），但传统方法通常假设超参数固定或预定义简单 schedule，无法自适应发现最优调度策略。

> 💡 **关键洞察**：PBT 的核心思想是——既然我们已经在并行训练多个模型，为什么不让它们在训练过程中互相"学习"？表现好的模型可以将自己的经验（权重 + 超参数）传递给表现差的模型，后者在此基础上继续探索。

**核心机制详解**

PBT 将每个训练过程视为种群中的一个成员，每个成员包含四元组 \((θ, h, p, t)\)：模型权重、超参数、当前性能评分、训练步数。整个框架围绕四个核心操作展开：

**1. Step — 梯度更新**

每个 worker 独立执行标准的梯度下降步骤：

$$\theta \leftarrow \mathtt{step}(\theta \mid h)$$

其中 \(h\) 包含学习率、entropy cost、辅助损失权重等超参数。多步 step 链式组合形成完整的优化过程：

$$\theta^{*} = \mathtt{step}(\mathtt{step}(\ldots\mathtt{step}(\theta \mid h_1)\ldots \mid h_{T-1}) \mid h_T)$$

**2. Eval — 性能评估**

定期评估当前模型性能 \(p \leftarrow \mathtt{eval}(\theta)\)。评估函数不需要可微，也不需要与训练损失函数相同（但应相关）。例如在 RL 中使用最近 10 个 episode 的平均回报，在机器翻译中使用 BLEU 分数。

**3. Exploit — 利用种群信息**

当一个 worker 被判定为"ready"（例如已训练足够步数）时，触发 exploit 操作。论文提出两种策略：

- **截断选择（Truncation Selection）**：将种群按性能排序，底部 20% 的 worker 从顶部 20% 中随机选一个，复制其权重和超参数
- **T-test 选择**：随机采样另一个 worker，用 Welch's t-test 比较两者最近的性能，若对方显著更优则复制

> ⚠️ **注意**：exploit 不仅复制超参数，还复制模型权重 \(\theta\)。这是 PBT 区别于纯超参数搜索的关键——它实现了**模型选择**（model selection）与**超参数优化**的统一。

**4. Explore — 探索新超参数**

exploit 之后立即执行 explore，在复制得到的超参数基础上产生变异：

- **扰动（Perturb）**：每个超参数独立地乘以 1.2 或 0.8（随机选择）
- **重采样（Resample）**：以一定概率从原始先验分布中重新采样

这种设计使得种群能够持续探索超参数空间，避免所有 worker 收敛到同一组超参数。

**与传统方法的关键区别**

| 特性 | 序列优化 | 并行搜索 | PBT |
|------|---------|---------|-----|
| 计算效率 | 低（串行） | 中（并行但独立） | 高（并行 + 信息共享） |
| 超参数 schedule | 需预定义 | 固定 | **自动发现** |
| 热启动 | 无 | 无 | **有**（exploit 复制权重） |
| 同步要求 | — | 无 | **无**（完全异步） |
| 模型选择 | 训练后 | 训练后 | **训练中在线进行** |

**实验验证**

PBT 在五大领域均超越了使用相同计算资源的随机搜索基线：

- **DM Lab**（UNREAL, 40 workers）：人类归一化性能从 93% 提升至 **106%**
- **Atari**（Feudal Networks, 80 workers）：在 Amidar、Gravitar 等游戏上显著提升
- **StarCraft II**（A3C, 30 workers）：6 个小游戏关卡上全面提升
- **机器翻译**（Transformer, 32 workers）：WMT 2014 En-De 任务 BLEU 分数提升
- **GAN 训练**（45 workers）：Inception Score 提升，训练更稳定

消融实验的关键发现：
1. **种群规模**：≥20 即可获得稳定提升，更大种群收益递减
2. **Exploit + Explore 缺一不可**：仅复制权重或仅调超参数效果均不如两者结合
3. **动态 schedule > 固定最优超参**：用 PBT 最终发现的超参数从头训练，效果不如 PBT 的在线自适应调度，证明了**超参数 schedule 的价值**

#### 🧪 练习题

```yaml
question: "PBT 中 exploit 操作的核心作用是什么？"
options:
  - "对当前模型的超参数进行随机扰动以增加多样性"
  - "将表现差的 worker 的权重和超参数替换为表现好的 worker 的"
  - "在所有 worker 之间同步梯度以加速收敛"
  - "使用贝叶斯优化选择下一组要尝试的超参数"
answer: 1
explain: "exploit 的作用是让表现差的 worker 复制表现好的 worker 的权重和超参数，实现种群内的模型选择。随机扰动是 explore 的功能，PBT 不需要同步也不使用贝叶斯优化。"
```