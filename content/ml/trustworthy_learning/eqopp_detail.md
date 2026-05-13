---
id: eqopp
name: EqOpp
full_name: "机会均等 (Equality of Opportunity in Supervised Learning)"
year: 2016
org: Google
paper_url: "https://proceedings.neurips.cc/paper/2016/hash/9d2682367c3935defcb1f9e247a97c0d-Abstract.html"
arxiv_url: "https://arxiv.org/abs/1610.02413"
category: foundation
parent: "—"
motivation: "提出 Equalized Odds 和 Equal Opportunity 公平性准则，通过后处理方法将任意预测器转化为满足公平约束的预测器"
---

# Equality of Opportunity in Supervised Learning

> **一句话总结**: 本文提出了监督学习中两个基于条件独立性的公平性定义——Equalized Odds（预测 $\hat{Y}$ 在给定真实标签 $Y$ 后与保护属性 $A$ 条件独立）和 Equal Opportunity（仅要求 $Y=1$ 时的真正例率跨组相等），并给出了通过线性规划后处理将任意预测器转化为满足公平约束的最优预测器的高效算法。

## 1. 研究动机与背景

### 1.1 问题定义

在监督学习中，我们基于特征 $X$ 预测目标 $Y \in \{0, 1\}$，同时存在保护属性 $A \in \{0, 1\}$（如种族、性别）。核心问题是：**如何定义并实现"非歧视"的预测器 $\hat{Y}$？**

### 1.2 已有方法的不足

| 方法 | 定义 | 缺陷 |
|------|------|------|
| **Fairness through Unawareness** | 预测器不使用保护属性 $A$ | 由于冗余编码（redundant encoding），其他特征可间接编码 $A$，无法保证公平 |
| **Demographic Parity** | $\Pr\{\hat{Y}=1 \mid A=0\} = \Pr\{\hat{Y}=1 \mid A=1\}$ | (1) 允许对不同组的合格/不合格者做不同处理；(2) 当 $Y$ 与 $A$ 相关时，不允许完美预测器 $\hat{Y}=Y$，严重损害效用 |

### 1.3 本文贡献

1. 提出 **Equalized Odds** 和 **Equal Opportunity** 两个公平性定义
2. 证明最优公平预测器可从贝叶斯最优回归器导出
3. 给出高效的**后处理线性规划算法**，从任意预测器导出公平预测器
4. 提供**几何解释**：通过 ROC 曲线凸包的交集求解
5. 在 FICO 信用评分数据上验证方法的实用性

## 2. 方法详解

### 2.1 核心定义

**Definition 2.1 (Equalized Odds)**:  
预测器 $\hat{Y}$ 满足关于保护属性 $A$ 的 Equalized Odds，当且仅当：

$$\hat{Y} \perp A \mid Y$$

即对所有 $y \in \{0, 1\}$ 和 $a \in \{0, 1\}$：
$$\Pr\{\hat{Y}=1 \mid A=a, Y=y\} = \Pr\{\hat{Y}=1 \mid Y=y\}$$

等价地，要求**真正例率（TPR）和假正例率（FPR）跨保护组相等**。

**Definition 2.2 (Equal Opportunity)**:  
预测器 $\hat{Y}$ 满足关于保护属性 $A$ 的 Equal Opportunity，当且仅当：

$$\Pr\{\hat{Y}=1 \mid A=0, Y=1\} = \Pr\{\hat{Y}=1 \mid A=1, Y=1\}$$

即仅要求**真正例率（TPR）跨组相等**，是 Equalized Odds 的松弛版本。

### 2.2 与其他公平性概念的关系

- **完美预测器** $\hat{Y} = Y$ 总是满足 Equalized Odds（因为 $Y \perp A \mid Y$ 恒成立）
- Equalized Odds **蕴含** Equal Opportunity，但反之不然
- 与 Demographic Parity 不同，本文定义**鼓励更准确的预测**——预测越准，满足公平约束越容易

### 2.3 后处理算法：从二值预测器导出

给定任意（可能不公平的）预测器 $\hat{Y}$，目标是构造新预测器 $\tilde{Y}$ 满足公平约束且最小化损失。

**核心思想**: 对每个保护组 $a$，独立地以一定概率翻转 $\hat{Y}$ 的预测结果。具体地，$\tilde{Y}$ 由 4 个参数决定（每组 2 个）：

$$p_{a,y} = \Pr\{\tilde{Y} \neq \hat{Y} \mid A=a, \hat{Y}=y\}, \quad a \in \{0,1\}, y \in \{0,1\}$$

**Proposition 4.4**: 寻找最优 Equalized Odds 预测器等价于求解以下**线性规划**：

$$\min_{p_{0,0}, p_{0,1}, p_{1,0}, p_{1,1}} \quad \ell(\tilde{Y}, Y)$$

约束条件：
- $\gamma_0(\tilde{Y}) = \gamma_1(\tilde{Y})$（Equalized Odds 约束，其中 $\gamma_a = (\text{FPR}_a, \text{TPR}_a)$）
- $0 \leq p_{a,y} \leq 1$（概率约束）

目标函数和约束均为 4 个参数的线性函数，因此可高效求解。

### 2.4 后处理算法：从连续评分函数导出

当有连续评分 $R \in [0,1]$（如 FICO 分数）时，方法更强大：

1. **计算各组条件 ROC 曲线** $C_a(t) = (\Pr\{R > t \mid A=a, Y=0\}, \Pr\{R > t \mid A=a, Y=1\})$
2. **取各组 ROC 曲线凸包的交集** $\cap_a D_a$，其中 $D_a$ 是 $C_a$ 下方凸包
3. **在交集中选择最优操作点** $\gamma^* = (\gamma_0^*, \gamma_1^*)$，最小化损失

![ROC曲线几何解释](https://ar5iv.org/html/1610.02413/assets/x1.png)

**实现方式**: 对每个组 $a$，使用**随机化阈值** $T_a$：
- 以概率 $\underline{p}_a$ 使用阈值 $\underline{t}_a$
- 以概率 $\overline{p}_a$ 使用阈值 $\overline{t}_a$

即：若 $R > \overline{t}_a$ 则 $\tilde{Y}=1$；若 $R < \underline{t}_a$ 则 $\tilde{Y}=0$；若 $\underline{t}_a < R < \overline{t}_a$，以概率 $\underline{p}_a$ 设 $\tilde{Y}=1$。

**优化方法**: 对 Equalized Odds，求解：
$$\min_{\forall a: \gamma \in D_a} \gamma_0 \cdot \ell(1,0) + (1-\gamma_1) \cdot \ell(0,1)$$

可通过**三元搜索（ternary search）**高效求解。

### 2.5 算法流程总结

```
输入: 预测器 Ŷ (或评分 R), 保护属性 A, 真实标签 Y, 损失函数 ℓ
输出: 满足公平约束的预测器 Ỹ

1. 估计各组条件统计量:
   - 二值情况: 计算 Pr{Ŷ=ŷ, Y=y | A=a}
   - 连续情况: 估计各组 ROC 曲线 C_a(t)

2. 求解约束优化:
   - 二值情况: 求解 4 变量线性规划
   - 连续情况: 在 ROC 凸包交集中三元搜索

3. 构造公平预测器:
   - 二值情况: 以概率 p_{a,y} 翻转预测
   - 连续情况: 对组 a 使用随机化阈值 T_a
```

## 3. 理论分析

### 3.1 最优性定理 (Theorem 5.3)

**最优 Equalized Odds 预测器可从贝叶斯最优回归器 $R^* = E[Y|X]$ 和保护属性 $A$ 导出。**

这意味着：
- 不需要重新训练模型，只需对最优回归器做后处理
- 最优公平预测器的信息瓶颈仅在 $(R^*, A)$ 中

### 3.2 近最优性定理 (Theorem 5.6)

引入**条件 Kolmogorov 距离**衡量回归器近似质量：

$$d_K(R, R') = \max_{a,y \in \{0,1\}} \sup_{t \in [0,1]} |\Pr\{R > t \mid A=a, Y=y\} - \Pr\{R' > t \mid A=a, Y=y\}|$$

**定理**: 若 $\hat{R}$ 与贝叶斯最优 $R^*$ 的条件 Kolmogorov 距离为 $\epsilon$，则从 $\hat{R}$ 导出的最优公平预测器的损失与全局最优公平预测器的损失之差为 $O(\epsilon)$。

**Lemma 5.5**: 条件 Kolmogorov 距离 $\epsilon$ 意味着 ROC 曲线之间的 $\ell_2$ 距离不超过 $\sqrt{2} \cdot \epsilon$。

### 3.3 关键性质

| 性质 | 说明 |
|------|------|
| 后处理充分性 | 最优公平预测器可通过后处理任意好的回归器获得 |
| 效率 | 线性规划 / 三元搜索，计算复杂度极低 |
| 鲁棒性 | 近似最优的回归器导出近似最优的公平预测器 |
| 激励相容 | 公平约束鼓励为所有组构建好的预测器 |

## 4. 实验与结果

### 4.1 FICO 信用评分案例研究

**数据**: 301,536 个 TransUnion TransRisk 评分（2003年），分数范围 300-850，保护属性为种族（Asian, White, Hispanic, Black）。目标 $Y$：是否在 18-24 个月内违约（任一账户逾期 90 天以上）。

**实验设置**: 信用评分阈值 620 对应 82% 非违约率。贷方的非对称损失：假正例（贷款给违约者）的代价是假反例（拒绝非违约者）的 82/18 倍。

### 4.2 五种策略对比

| 策略 | 描述 | 特点 |
|------|------|------|
| **Max Profit** | 每组选择利润最大化阈值 | 无公平约束，各组阈值不同 |
| **Race Blind** | 所有组使用相同阈值 | 看似公平但违反 EqOdds（黑人非违约者获贷概率远低于白人/亚裔） |
| **Demographic Parity** | 各组获贷比例相同 | 可能给不合格者贷款 |
| **Equal Opportunity** | 各组非违约者获贷率相同 | 仅约束 TPR 相等 |
| **Equalized Odds** | TPR 和 FPR 均跨组相等 | 需要随机化阈值 |

### 4.3 关键发现

1. **Race-blind 并不公平**: 使用统一阈值时，黑人非违约者获得贷款的概率远低于白人或亚裔非违约者，违反 Equal Opportunity
2. **Equal Opportunity 损失小**: 相比无约束最优，Equal Opportunity 约束带来的利润损失很小
3. **Equalized Odds 更严格但仍可行**: 需要随机化但能同时控制 TPR 和 FPR
4. **Demographic Parity 损害效用**: 为满足比例约束可能给高风险者贷款

![FICO实验结果](https://ar5iv.org/html/1610.02413/assets/x5.png)

## 5. 总结与评价

### 5.1 核心贡献

- **概念贡献**: 提出了基于条件独立性的公平性定义，比 Demographic Parity 更合理
- **算法贡献**: 后处理方法简洁高效，适用于任何已有预测器
- **理论贡献**: 证明了后处理的最优性和近最优性

### 5.2 优势

- **模型无关**: 后处理方法不依赖底层模型结构
- **计算高效**: 线性规划或三元搜索
- **理论保证**: 从贝叶斯最优回归器可导出最优公平预测器
- **实用性强**: FICO 案例展示了在真实场景中的可行性

### 5.3 局限性

- **需要保护属性标注**: 后处理和评估都需要知道 $A$
- **随机化**: Equalized Odds 可能需要随机化预测，存在个体公平性争议
- **二值设定**: 原始框架限于二值 $Y$ 和 $A$，多类扩展需额外工作
- **因果性缺失**: 基于统计相关性而非因果关系，可能存在 infra-marginality 问题
- **效用-公平权衡**: 严格的公平约束可能显著降低预测效用

### 5.4 后续影响

本文是算法公平性领域的奠基性工作之一，Equalized Odds 和 Equal Opportunity 已成为最广泛使用的群体公平性度量标准，被后续大量工作引用和扩展（如多类扩展、连续属性、因果公平性等）。

## 6. 关键引用

- Dwork et al. (2012) - "Fairness through awareness": 个体公平性的开创性工作
- Feldman et al. (2015) - Disparate impact 的计算方法
- Zafar et al. (2017) - 训练时公平约束
- Chouldechova (2017) - 证明了多个公平性度量不可同时满足
- Kleinberg et al. (2017) - 校准与公平性的不可能定理