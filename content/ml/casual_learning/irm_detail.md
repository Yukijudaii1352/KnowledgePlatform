### 不变风险最小化 (Invariant Risk Minimization, IRM)

```yaml
id: irm
name: IRM
full_name: 不变风险最小化 (Invariant Risk Minimization)
year: 2019
organization: Facebook AI Research (FAIR)
authors: Martin Arjovsky, Léon Bottou, Ishaan Gulrajani, David Lopez-Paz
category: robust_prediction
parent: scm
paper_url: https://arxiv.org/abs/1907.02893
code_url: https://github.com/facebookresearch/InvariantRiskMinimization
motivation: 学习跨环境稳定的不变特征表示，实现分布外泛化
key_idea: 寻找数据表示Φ使得在所有环境上的最优分类器w相同
```

---

## 📝 一句话总结

IRM通过约束学习到的特征表示Φ在**所有训练环境**上共享同一个最优分类器$w$，从而迫使模型只依赖因果不变特征（而非虚假相关），实现分布外泛化。

---

## 🎯 核心要点

1. **问题定义**：传统ERM在多环境数据上会利用虚假相关（如"牛↔草地"），导致分布偏移时性能崩溃；IRM目标是学习跨环境不变的预测器
2. **核心约束**：学习表示$\Phi$使得存在**同一个**分类器$w$在所有环境$e$上都是最优的：$w \in \arg\min_{\bar{w}} R^e(\bar{w} \circ \Phi), \forall e$
3. **实用松弛IRMv1**：将双层优化转化为可微惩罚项——固定$w=1.0$（标量），用梯度范数$\|\nabla_{w|w=1.0} R^e(w \cdot \Phi)\|^2$衡量不变性违反程度
4. **因果理论支撑**：不同环境对应SEM上的不同干预；不变特征恰好是因果特征（Y的因果父节点），因为只有因果机制在干预下保持稳定
5. **实验验证**：在Colored MNIST上，ERM测试准确率仅17.1%（依赖颜色），IRM达到66.9%（学会依赖数字形状）

---

## 🔬 深入细节

### 示意图

#### 图1：不同不变性度量的优化景观对比
![不变性度量对比](https://ar5iv.labs.arxiv.org/html/1907.02893/assets/x1.png)

*不同的不变性惩罚（$\mathbb{D}_{\text{dist}}$ vs $\mathbb{D}_{\text{lin}}$）在优化景观上的差异。$\mathbb{D}_{\text{dist}}$是不连续的，而$\mathbb{D}_{\text{lin}}$提供平滑梯度。*

#### 图2：不变线性预测器的解空间
![不变线性预测器](https://ar5iv.labs.arxiv.org/html/1907.02893/assets/x2.png)

*不变线性预测器$v = \Phi^\top w$的解与因果特征方向的交集。*

#### 图3：Colored MNIST实验结果
![Colored MNIST](https://ar5iv.labs.arxiv.org/html/1907.02893/assets/x5.png)

*不同模型在Colored MNIST上学到的$P(y=1|h)$：ERM依赖颜色（虚假特征），IRM依赖数字形状（因果特征）。*

#### 图4：因果与认知视角
![因果认知视角](https://ar5iv.labs.arxiv.org/html/1907.02893/assets/x6.png)

*学习问题的因果与认知视角：从像素到因果/虚假特征的分解。*

---

### 伪代码

```
算法: IRMv1 训练流程
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
输入: 多环境数据 {D^e}_{e∈E_tr}, 正则系数λ, 学习率η
输出: 不变预测器 Φ (整个网络作为表示)

1. 初始化网络参数 Φ (即整个预测模型)
2. 设置 dummy classifier w = 1.0 (标量常数，不参与训练)
3. FOR each training iteration:
4.   total_loss = 0
5.   FOR each environment e ∈ E_tr:
6.     计算环境损失: L_e = (1/n_e) Σ ℓ(w · Φ(x_i), y_i)  # w=1.0
7.     计算梯度惩罚: grad_e = ∇_w L_e |_{w=1.0}
8.     penalty_e = ‖grad_e‖²
9.     total_loss += L_e + λ · penalty_e
10.  END FOR
11.  更新: Φ ← Φ - η · ∇_Φ(total_loss)
12. END FOR
13. RETURN Φ
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
注: λ从小到大退火效果更好(先学有用特征，再施加不变性约束)
```

**PyTorch核心实现片段：**
```python
def irm_penalty(loss, dummy_w):
    """计算IRMv1梯度惩罚"""
    grad = torch.autograd.grad(loss, dummy_w, create_graph=True)[0]
    return grad.pow(2).sum()

# 训练循环
for x_e, y_e in environments:
    dummy_w = torch.tensor(1.0, requires_grad=True)
    logits = dummy_w * model(x_e)  # w=1.0 缩放
    loss_e = F.cross_entropy(logits, y_e)
    penalty_e = irm_penalty(loss_e, dummy_w)
    total_loss += loss_e + lambda_irm * penalty_e
```

---

### 方法详解

#### 1. 问题动机：虚假相关的陷阱

考虑"牛 vs 骆驼"分类任务：
- 训练集中，牛总是出现在**草地**背景，骆驼总是出现在**沙漠**背景
- ERM会学到"草地→牛，沙漠→骆驼"的虚假捷径
- 当测试时出现"沙滩上的牛"，模型就会失败

**核心洞察**：如果我们有来自多个环境的数据（如不同地理位置拍摄的照片），虚假相关在不同环境中会变化，而因果特征（动物形态）保持稳定。

#### 2. IRM原始公式（双层优化）

$$\min_{\Phi: \mathcal{X} \to \mathcal{H}, \; w: \mathcal{H} \to \mathcal{Y}} \sum_{e \in \mathcal{E}_{\text{tr}}} R^e(w \circ \Phi)$$

$$\text{subject to} \quad w \in \arg\min_{\bar{w}: \mathcal{H} \to \mathcal{Y}} R^e(\bar{w} \circ \Phi), \quad \forall e \in \mathcal{E}_{\text{tr}}$$

其中：
- $\Phi: \mathcal{X} \to \mathcal{H}$ 是数据表示（特征提取器）
- $w: \mathcal{H} \to \mathcal{Y}$ 是分类器头
- $R^e(\cdot)$ 是环境$e$上的风险
- 约束要求：**同一个$w$**在所有环境上都是最优的

**直觉**：如果$\Phi$只保留因果特征，那么最优$w$自然在所有环境中相同（因为因果机制$P(Y|X_{\text{causal}})$不随环境变化）。

#### 3. 从IRM到IRMv1的推导

**步骤一：惩罚化松弛**

将硬约束转为惩罚项：

$$\min_{\Phi, w} \sum_{e \in \mathcal{E}_{\text{tr}}} R^e(w \circ \Phi) + \lambda \cdot \mathbb{D}(w, \Phi, e)$$

其中$\mathbb{D}$度量$w$偏离环境$e$上最优分类器的程度。

**步骤二：选择惩罚函数$\mathbb{D}$**

两种选择：
- $\mathbb{D}_{\text{dist}}$：$w$与$w^{e*}$的距离 → 不连续，优化困难
- $\mathbb{D}_{\text{lin}}$（线性最优性条件残差）：

$$\mathbb{D}_{\text{lin}}(w, \Phi, e) = \left\| \Phi \mathbb{E}[X^e {X^e}^\top] \Phi^\top w - \Phi \mathbb{E}[X^e Y^e] \right\|^2$$

→ 平滑可微，但仍需联合优化$(w, \Phi)$

**步骤三：固定$w$消除过参数化**

关键观察：对于任何可逆变换$\Psi$，可以重参数化：
$$w \circ \Phi = \underbrace{(w \circ \Psi^{-1})}_{\tilde{w}} \circ \underbrace{(\Psi \circ \Phi)}_{\tilde{\Phi}}$$

因此可以**固定$w$为任意非零值**（如$w=1.0$标量），将所有表达能力交给$\Phi$。

**步骤四：IRMv1最终形式**

$$\mathcal{L}_{\text{IRMv1}}(\Phi) = \sum_{e \in \mathcal{E}_{\text{tr}}} R^e(\Phi) + \lambda \cdot \left\| \nabla_{w|w=1.0} R^e(w \cdot \Phi) \right\|^2$$

- $\Phi$现在是**整个预测器**（网络从输入到输出）
- $w=1.0$是标量dummy分类器
- 梯度惩罚$\|\nabla_{w|w=1.0} R^e(w \cdot \Phi)\|^2$衡量：在$w=1.0$处，损失对$w$的梯度是否为零
  - 若为零 → $w=1.0$已是最优 → $\Phi$在该环境上满足不变性
  - 若不为零 → 需要调整$w$才能最优 → $\Phi$违反不变性

#### 4. 因果理论基础

**结构方程模型(SEM)**：所有环境共享同一因果图，不同环境对应不同的**干预**（改变某些变量的生成机制）。

$$\mathcal{S}_i: X_i \leftarrow f_i(\text{Pa}(X_i), N_i)$$

**关键定理（非正式）**：在足够多样化的训练环境下，IRM的不变预测器恰好只使用$Y$的因果父节点特征：

$$\text{不变性} + \text{足够多环境} \implies \text{因果预测}$$

形式化（Theorem 9）：在线性设置中，若$Y^e = Z_1^e \cdot \gamma + \epsilon^e$且$X^e = S(Z_1^e, Z_2^e)$（$Z_1$为因果变量，$Z_2$为虚假变量），当训练环境处于"线性一般位置"时，满足IRM约束的表示$\Phi$只提取因果变量$Z_1$。

#### 5. Colored MNIST实验详解

| 算法 | 训练环境准确率 | 测试环境准确率 |
|------|:---:|:---:|
| ERM | 87.4 ± 0.2 | 17.1 ± 0.6 |
| **IRM (IRMv1)** | 70.8 ± 0.9 | **66.9 ± 2.5** |
| 随机猜测 | 50 | 50 |
| 最优不变模型 | 75 | 75 |
| ERM灰度(oracle) | 73.5 ± 0.2 | 73.0 ± 0.4 |

**实验设置**：
- 标签$y$：数字0-4→0，5-9→1（25%噪声翻转）
- 颜色$z$：以概率$p^e$翻转$y$得到（$p^{e_1}=0.2$, $p^{e_2}=0.1$, $p^{\text{test}}=0.9$）
- 训练时颜色与标签强相关（80-90%），测试时反转（仅10%相关）

**结果解读**：
- ERM利用颜色（训练准确率高达87.4%），测试时颜色相关性反转导致仅17.1%
- IRM发现颜色在两个训练环境中相关性不同（不稳定），学会忽略颜色，使用数字形状

---

### 公式总结

| 符号 | 含义 |
|------|------|
| $\Phi$ | 数据表示/特征提取器 |
| $w$ | 分类器头（IRMv1中固定为标量1.0） |
| $R^e$ | 环境$e$上的经验风险 |
| $\mathcal{E}_{\text{tr}}$ | 训练环境集合 |
| $\lambda$ | 不变性惩罚系数 |
| $\nabla_{w\|w=1.0}$ | 在$w=1.0$处对$w$的梯度 |

**核心公式对比：**

| 方法 | 目标函数 |
|------|----------|
| ERM | $\min_\theta \sum_e R^e(\theta)$ |
| IRM (原始) | $\min_{\Phi,w} \sum_e R^e(w \circ \Phi)$ s.t. $w \in \arg\min R^e(\bar{w} \circ \Phi) \;\forall e$ |
| IRMv1 (实用) | $\min_\Phi \sum_e \left[ R^e(\Phi) + \lambda \|\nabla_{w\|w=1.0} R^e(w \cdot \Phi)\|^2 \right]$ |

---

## 🧪 练习题

### 概念理解

1. **为什么ERM在分布偏移下会失败？** 请用"牛/骆驼"例子解释ERM学到的决策规则与因果规则的区别。

2. **IRM约束的直觉是什么？** 为什么"所有环境共享同一最优分类器"能排除虚假特征？

3. **为什么可以固定$w=1.0$？** 解释过参数化论证：对于可逆$\Psi$，$(w, \Phi)$和$(w \circ \Psi^{-1}, \Psi \circ \Phi)$给出相同预测器。

### 公式推导

4. **IRMv1梯度惩罚的含义**：对于MSE损失$R^e(w \cdot \Phi) = \mathbb{E}[(w \cdot \Phi(x) - y)^2]$，手动计算$\nabla_{w|w=1.0} R^e(w \cdot \Phi)$，并解释为什么它为零意味着$\Phi$已经是最优预测器。

5. **环境多样性的必要性**：如果只有一个训练环境，IRM退化为什么？为什么至少需要两个环境？

### 实验分析

6. **Colored MNIST设计**：为什么测试环境的颜色-标签相关性要设为0.9（反转）？如果设为0.5（无相关）会怎样？

7. **λ退火策略**：为什么论文建议先用小λ训练再逐渐增大？如果一开始就用很大的λ会出什么问题？

### 开放思考

8. **IRM的局限性**：在什么情况下IRM可能失败？（提示：考虑环境数量不足、非线性情况、环境标注缺失等）

9. **与Domain Adaptation的区别**：IRM和传统域适应方法（如DANN）都试图学习不变表示，它们的核心区别是什么？

---

## 📚 延伸阅读

- **IRM Games** (Ahuja et al., 2020): 将IRM扩展为博弈论框架
- **REx** (Krueger et al., 2021): 通过风险方差惩罚实现类似目标
- **DRO** (Sagawa et al., 2020): 分布鲁棒优化，最小化最坏组损失
- **WILDS Benchmark** (Koh et al., 2021): 分布偏移的标准评测集