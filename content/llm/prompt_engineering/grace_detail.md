### GRACE：门控精炼压缩 (GRACE)
```yaml
id: grace
name: GRACE
full_name: 门控精炼压缩 (GRACE)
year: '2026.01'
org: NeurIPS
paper_url: https://proceedings.neurips.cc/paper_files/paper/2025/hash/7f9a44cb707ede42a659ad85d940dd55-Abstract-Conference.html
category: frontier_2026
parent: opro
motivation: 门控机制精炼指令压缩冗余信息
```

#### 📝 一句话总结
GRACE 提出 Gated Refinement 与 Adaptive Compression 两个互补机制，通过有控制地丢弃有害或冗余信息，解决自动提示优化中更新不稳定、候选搜索低效和局部最优停滞的问题。

#### 🎯 核心要点
- 面向黑盒 LLM 的自动提示优化，不依赖目标模型梯度或内部状态，只通过训练集、验证集和优化器 LLM 迭代改写自然语言 prompt。
- Feedback Regulation Gate 同时采样成功样本和失败样本，让失败反馈提供改进方向，让成功样本约束更新幅度，避免过度纠偏和语义漂移。
- Update Rejection Gate 在验证集上比较当前 prompt 与候选 prompt，只接受带来验证性能提升的更新，把有害更新直接阻断。
- Adaptive Compression 在连续 \(K\) 次候选被拒后触发，将当前 prompt 中冗长、重复、过度具体的规则压缩成更抽象的任务关键概念。
- 以“信息损失”换取泛化：门控丢弃噪声更新，压缩丢弃局部最优中积累的实例特化细节，形成局部精炼和全局重构的循环。
- 在 11 个任务、3 类领域上评测，覆盖 BBH、医学领域任务和通用 NLP 任务；相对已有自动提示优化方法分别取得 4.7%、4.4%、2.7% 的平均相对提升，并用约 25% 的 prompt 生成预算达到更好结果。

#### 🔬 深入细节
![GRACE 方法框架](https://github.com/Eric8932/GRACE/raw/main/images/method.png)
*图：官方代码仓库中的方法图。左侧是传统扩展与选择范式，右侧是 GRACE 的反馈调节门、更新拒绝门和自适应压缩循环。*

```python
# GRACE 论文 Algorithm 1 的简化伪代码
def grace(P0, D_train, D_val, optimizer_llm, evaluator, T, K):
    P = P0
    best_P = P0
    reject_counter = 0

    for t in range(T):
        # Gated Refinement: 用成功样本调节失败反馈
        successes, failures = partition_by_score(D_train, prompt=P, evaluator=evaluator)
        batch = sample(successes) + sample(failures)
        P_candidate = optimizer_llm.generate(
            current_prompt=P,
            update_batch=batch,
            meta_prompt="fix failures while preserving successful patterns",
        )

        # Update Rejection Gate: 只接受验证集更优的候选
        if score(P_candidate, D_val, evaluator) > score(P, D_val, evaluator):
            P = P_candidate
            reject_counter = 0
        else:
            reject_counter += 1

        # Adaptive Compression: 连续停滞时压缩并抽象 prompt
        if reject_counter == K:
            P = optimizer_llm.generate(
                current_prompt=P,
                meta_prompt="remove redundancy and abstract case-specific rules",
            )
            reject_counter = 0

        if score(P, D_val, evaluator) > score(best_P, D_val, evaluator):
            best_P = P

    return best_P
```

GRACE 继承了 OPRO/APO/PromptAgent 这类“用 LLM 优化 prompt”的黑盒设置：给定初始 prompt \(P_0\)、训练样本、验证样本、目标模型 \(B\) 和优化器模型 \(O\)，目标是在离散自然语言空间中找到让目标任务得分最高的 prompt。论文将目标写成：

$$
P^*=\arg\max_{P\in S} f_B(P,D)
=\arg\max_{P\in S}\sum_{(a_i,q_i)\in D} f(p_B(a_i\mid P,q_i)).
$$

传统反思式 APO 往往只看失败样本，把错误分析当作“文本梯度”。这个信号很强，但也容易偏：如果某一批失败样本包含偶然模式，优化器会把 prompt 改得过于具体，导致原本能做对的样本被破坏。GRACE 的反馈调节门把训练集按当前 prompt 的表现分成成功集 \(S_t\) 与失败集 \(F_t\)，再构造更新批次 \(B_t=S'_t\cup F'_t\)，候选更新为：

$$
P_t^c \sim p_O(P\mid P_t,B_t,m_1).
$$

这里 \(m_1\) 明确要求优化器“修复失败，同时保留成功模式”。这相当于给文本梯度加入一个正则项：失败样本提供方向，成功样本限制步长和语义边界。论文的直觉是，真正有用的更新不应只解释错误，还必须不破坏已经有效的任务理解。

第二道门是更新拒绝门。即使候选 prompt 由平衡样本生成，它仍可能包含冗余、冲突或过度具体的规则。因此 GRACE 不直接采用候选，而是在验证集上做二选一：

$$
P_{t+1}=\arg\max_{P\in\{P_t,P_t^c\}} f_B(P,D_{val}).
$$

如果候选没有提升，更新被拒绝，信息流被阻断。这个设计牺牲了部分探索速度，但显著降低了 prompt 行为突变的风险，也解释了为什么 GRACE 每轮只生成一个候选仍能比大量候选搜索更高效。

自适应压缩处理另一个常见问题：prompt 优化前几轮能快速提升，随后大量规则堆积，新增内容从通用原则变成实例特化补丁，优化进入局部最优。GRACE 在连续 \(K\) 次拒绝后触发压缩：

$$
P_{t+1}\sim p_O(P\mid P_t,m_2),
\quad
\sum_{j=t-K+1}^{t} \mathbf{1}[P_j=P_{j-1}]=K.
$$

\(m_2\) 要求优化器合并或删除重复元素，并把具体条件、记忆化措辞和窄规则抽象为更一般的任务指导。这与信息瓶颈思想一致：保留任务相关信息，压缩无关或有害细节。压缩后的 prompt 不只是变短，而是重置了后续 gated refinement 的起点，使优化可以从另一个更泛化的局部区域继续前进。

> 💡 关键：GRACE 的“loss”不是性能损失，而是主动的信息损失。反馈调节、更新拒绝和压缩都在丢弃信息，但丢弃的是不稳定更新、验证集无效更新和局部最优中积累的冗余细节。

#### 🧪 练习题
```yaml
question: "GRACE 中 Adaptive Compression 主要在什么情况下触发？"
options:
  - "每次候选 prompt 在训练集上得分提升时"
  - "当连续 K 次候选更新被拒绝，说明优化可能停滞时"
  - "当优化器 LLM 的上下文窗口不足以放入训练集时"
  - "当 prompt 长度短于初始 prompt 时"
answer: 1
explain: "GRACE 使用 rejection counter 检测停滞。连续 K 次没有验证集提升时，压缩当前 prompt 以去除冗余和过度具体内容，从而逃离局部最优。"
```
