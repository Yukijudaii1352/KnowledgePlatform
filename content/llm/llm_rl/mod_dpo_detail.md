### MoD-DPO · 模态解耦直接偏好优化

```yaml
id: mod_dpo
name: MoD-DPO
full_name: 模态解耦直接偏好优化 (Modality-Decoupled Direct Preference Optimization)
year: "2026.03"
org: University of Southern California
paper_url: https://arxiv.org/abs/2603.03192
category: frontier_2026
parent: dpo
motivation: 模态解耦抑制跨模态幻觉
```

#### 📝 一句话总结
MoD-DPO 面向 omni LLM 的跨模态幻觉问题，在标准 DPO 上加入“无关模态保持不变、相关模态必须敏感、文本先验必须受罚”三类约束，使模型更依赖真正相关的音频和视觉证据而不是语言捷径。

#### 🎯 核心要点
- 面向音频-视频-文本统一模型的跨模态幻觉问题，重点缓解伪相关和语言先验主导带来的错误回答
- 在 DPO 的偏好损失之外引入两类 KL 正则：无关模态扰动下的输出不变性，以及相关模态扰动下的输出敏感性
- 新增 Language-Prior Debiasing (LPD) 惩罚，压低只看文本输入时容易产生幻觉的响应
- 对 MoD-DPO 目标给出闭式最优策略推导，而不是仅靠经验式加权损失
- 构造了自动化偏好数据生成流程，最终得到超过 18.1k 条偏好样本，覆盖约 10.8k 个视频
- 主要在 Qwen2.5-Omni 和 MiniCPM-O 2.6 上验证，在 AVHBench、CMM 等跨模态幻觉基准上稳定优于 DPO 与 OmniDPO

#### 🔬 深入细节

##### 1. 核心框架图

![MoD-DPO 核心框架图](https://arxiv.org/html/2603.03192v2/x3.png)

*图：论文 Figure 3。MoD-DPO 以 DPO 为底座，在偏好优化之外额外加入无关模态不变性、相关模态敏感性和语言先验去偏三类约束，直接改变 omni LLM 的模态依赖方式。*

##### 2. 核心训练伪代码

```python
# x_v: 视觉相关问题文本
# a, v: 原始音频/视频
# a_corrupt, v_corrupt: 扰动后的音频/视频
# y_w, y_l: chosen / rejected response

for batch in dataloader:
    logp_w = pi_theta.log_prob(y_w | a, v, x_v)
    logp_l = pi_theta.log_prob(y_l | a, v, x_v)
    logref_w = pi_ref.log_prob(y_w | a, v, x_v)
    logref_l = pi_ref.log_prob(y_l | a, v, x_v)

    # 标准 DPO 偏好项
    dpo_margin = beta * ((logp_w - logref_w) - (logp_l - logref_l))
    loss_dpo = -log_sigmoid(dpo_margin)

    # 无关模态不变性：视觉问题下，扰动音频后输出应尽量不变
    loss_inv = KL(pi_theta(. | a, v, x_v) || pi_theta(. | a_corrupt, v, x_v))

    # 相关模态敏感性：视觉问题下，扰动视频后输出应明显变化
    loss_sens = -KL(pi_theta(. | a, v, x_v) || pi_theta(. | a, v_corrupt, x_v))

    # 语言先验去偏：只给文本时，不应维持同样高的偏好分数
    loss_lpd = reward(pi_theta, text_only_input=x_v)

    loss = loss_dpo + lambda_inv * loss_inv + lambda_sens * loss_sens + lambda_lpd * loss_lpd
    optimizer.step(loss)
```

##### 3. 动机：为什么普通 DPO 不够

MoD-DPO 处理的不是纯文本偏好对齐，而是 **omni LLM 在音频、视频和文本共同输入下的幻觉问题**。论文指出，现有模型即使经过多模态后训练，仍然容易在两类情况下出错：一类是把本来不相关的模态信号当成强证据，例如从视觉画面“脑补”出并不存在的声音；另一类是模型过度依赖语言模板和文本提示，在感知证据很弱时仍然给出看似合理但并不 grounded 的答案。单纯套用 DPO，只能学习“chosen 比 rejected 更好”，却不会显式告诉模型“到底该依赖哪一个模态”。

论文的关键判断是：跨模态幻觉的根因不是简单的偏好建模不足，而是 **模态耦合方式错误**。因此，它把问题重新表述为两个约束目标：
- 对当前问题无关的模态，即使被扰动，输出也应该基本不变；
- 对当前问题真正相关的模态，只要被破坏，输出分布就应该明显变化。

这比普通 DPO 更强，因为它不只要求“选对答案”，而是要求模型形成正确的 **因果依赖结构**。比如当问题问视频里发生了什么时，模型应当主要依赖视觉证据；当视觉被破坏后，输出就应该退化，而不是继续凭音频或语言先验自信作答。

##### 4. 核心目标：在 DPO 上显式加入“模态解耦”

论文从标准 DPO 的 KL 约束最优策略出发，构造了视觉相关 prompt 下的目标。设输入包含音频 \(a\)、视频 \(v\) 和视觉相关文本提示 \(x^v\)，则 MoD-DPO 在 DPO 主目标外新增两项 KL 正则：

$$
\max_{\pi_\theta}
\mathbb{E}_{(a,v,x^v)\sim\mathcal{D},\, y\sim\pi_\theta(\cdot\mid a,v,x^v)}
\left[r(a,v,x^v,y)\right]
- \beta \, \mathbb{D}_{\mathrm{KL}}\!\left(\pi_\theta(\cdot\mid a,v,x^v)\,\|\,\pi_{\mathrm{ref}}(\cdot\mid a,v,x^v)\right)
- \beta_{\mathrm{inv}} \, \mathbb{D}_{\mathrm{KL}}\!\left(\pi_\theta(\cdot\mid a,v,x^v)\,\|\,\pi_\theta(\cdot\mid a',v,x^v)\right)
+ \beta_{\mathrm{sens}} \, \mathbb{D}_{\mathrm{KL}}\!\left(\pi_\theta(\cdot\mid a,v,x^v)\,\|\,\pi_\theta(\cdot\mid a,v',x^v)\right)
$$

其中 \(a'\) 是被扰动的音频，\(v'\) 是被扰动的视频。这个式子非常直观：
- 第二项仍是 DPO 的参考模型约束，防止策略漂移过大；
- 第三项要求在 **无关模态被破坏时输出尽量稳定**，也就是不变性；
- 第四项要求在 **相关模态被破坏时输出必须变化**，也就是敏感性。

对视觉问题来说，音频是“无关模态”、视频是“相关模态”；对于音频问题，论文给出了完全对称的目标，只需要把音频和视频的位置互换即可。这样一来，MoD-DPO 不再只是偏好学习，而是在优化时直接塑造“哪条模态路径该被信任”。

> 💡 关键：普通 DPO 只区分“答案 A 胜过答案 B”，MoD-DPO 进一步区分“这个胜负应当由哪一个模态决定”。这正是它能抑制跨模态幻觉的原因。

##### 5. Language-Prior Debiasing：专门压制文本捷径

论文还指出，多模态模型的语言骨干通常经过大规模文本预训练，因此即使感知输入不足，它也能仅凭语言模式生成“貌似合理”的回答。这会导致一种更隐蔽的失败：模型不是看错了图像或听错了音频，而是 **根本没认真看/听**，直接靠语言先验作答。

为此，MoD-DPO 在偏好优化奖励里又加入了一个 text-only 惩罚项。直觉上，这个项会比较“完整模态输入下的策略”与“只保留文本输入时的策略”，如果模型在 text-only 条件下仍然给出同样高的偏好分数，就说明它过于依赖语言先验，应被惩罚。这个设计和不变性/敏感性正好互补：
- 不变性约束负责“不要误用无关模态”；
- 敏感性约束负责“必须使用相关模态”；
- LPD 负责“不要绕开感知，直接走语言捷径”。

从论文实验结果看，带 LPD 的更强变体在语言主导类任务上提升更明显，这说明跨模态幻觉不只是模态错配问题，也和语言模型本身的先验偏置有关。

> ⚠️ 注意：这里的目标不是让模型“少用文本”，而是防止它在应该依赖感知证据时，仍然把文本模式匹配当作主要依据。

##### 6. 偏好数据如何构造

MoD-DPO 的另一项重要工作是自动生成训练偏好数据，而不是依赖昂贵的人类逐条标注。论文的 Figure 4 给出了一条三阶段流水线：

![MoD-DPO 偏好数据生成流程](https://arxiv.org/html/2603.03192v2/x4.png)

*图：论文 Figure 4。先把音频和视觉信息拆开做 caption/tag，再基于模态相关问题构造 QA，最后用“相关模态信息”生成 chosen，用“无关模态信息”生成 rejected。*

具体来说：
- Stage 1：先把视频拆解为视觉描述和音频描述，获得更干净的单模态语义；
- Stage 2：根据这些模态描述自动生成与音频或视觉相关的问题；
- Stage 3：对每个问题，使用相关模态构造 chosen response，使用无关模态或错误模态构造 rejected response。

这样生成出来的偏好对天然带有“模态监督”属性。普通 DPO 数据只告诉模型哪个答案更好，MoD-DPO 数据则额外告诉模型“为什么这个答案更好，是因为它用了正确模态的信息”。论文最终构造了超过 18.1k 条偏好样本，覆盖约 10.8k 个唯一视频，为后续优化提供了足够多样的幻觉场景。

##### 7. 方法效果与相对位置

论文主要在 Qwen2.5-Omni 和 MiniCPM-O 2.6 两个 omni LLM 上做实验，并在 AVHBench 与 CMM 两类跨模态幻觉基准上与 DPO、OmniDPO 等方法比较。项目页给出的结果显示：
- 在 Qwen2.5-Omni 上，AV Matching 准确率从基线的 54.69 提升到 69.07；
- 在 MiniCPM-O 2.6 上，AV Matching 从 54.26 提升到 60.57；
- 在 CMM 上，Qwen2.5-Omni 的 overall perception accuracy 从 86.4 提升到 88.8，hallucination resistance 从 84.6 提升到 86.2。

这些结果说明，MoD-DPO 并不是简单地“让模型更保守”，而是让模型在真正需要依赖音频/视频证据时更 grounded，因此既减少幻觉，也能提升一般的音视频理解表现。它在 LLM RL 演化链上的意义，是把 DPO 从纯文本偏好优化推进到了 **显式模态归因约束** 的阶段。

#### 🧪 练习题
```yaml
question: "对于视觉相关的问题，MoD-DPO 中“模态解耦”最核心的训练信号是什么？"
options:
  - "要求模型在视频被破坏后依然保持同样输出"
  - "要求模型在音频被破坏后明显改变输出，而在视频被破坏后保持稳定"
  - "要求模型在无关音频被破坏时保持稳定，在相关视频被破坏时显著改变输出"
  - "完全去掉参考模型，只用 chosen / rejected 交叉熵训练"
answer: 2
explain: "视觉问题下，音频通常是无关模态、视频是相关模态；因此 MoD-DPO 同时要求对无关模态扰动保持不变，对相关模态扰动保持敏感。"
```
