### NeuroStrike：神经元级攻击 (Neuron-Level Attacks)
```yaml
id: neurostrike
name: NeuroStrike
full_name: 神经元级攻击 (NeuroStrike: Neuron-Level Attacks)
year: "2026.02"
org: NDSS
paper_url: https://www.ndss-symposium.org/ndss-paper/neurostrike-neuron-level-attacks-on-aligned-llms/
category: jailbreak
parent: gcg
motivation: 剪枝安全神经元绕过对齐
```

#### 📝 一句话总结
NeuroStrike 提出一种神经元级安全评估框架，认为对齐后的拒答行为会集中依赖稀疏“安全神经元”，并通过识别、剪枝或规避这些神经元来测试模型安全边界。它解决了传统 jailbreak 依赖试错 prompt、跨模型迁移弱、缺少内部机制解释的问题。

#### 🎯 核心要点
- 提出“安全神经元”假设：安全对齐会在 MLP gate/up-projection 等子层形成稀疏、专门化、可迁移的激活签名。
- 白盒场景中，使用良性与恶意输入的 feedforward activation 训练线性探针，定位最能区分安全触发的神经元。
- 使用 logistic regression 权重的 z-score 选取离群神经元，默认阈值 \(z_i>3\)，以保持选择集合稀疏。
- 推理时将安全神经元激活置零或剪枝，测试模型是否仍能执行拒答与安全约束。
- 黑盒场景中，提出 LLM profiling attack：在开源 surrogate 上训练 prompt generator，使其既提高 jailbreak 成功率又降低安全神经元激活。
- 使用 GRPO 优化生成器奖励，组合输出层面的 jailbreak reward 与 neuron-level stealth reward。
- 实验覆盖 20+ open-weight LLM、fine-tuned/distilled 模型、multimodal LLM，以及 Gemini 等黑盒目标。
- 论文报告少量目标层神经元移除即可显著提高 ASR，同时显示安全神经元在同一模型族中具有较强迁移性。

#### 🔬 深入细节
![NeuroStrike 白盒攻击流程](https://arxiv.org/html/2509.11864v1/x1.png)
*图：NeuroStrike 白盒流程。对良性与恶意输入抽取 MLP 神经元激活，训练分类器定位 safety neurons，再在推理时剪枝这些神经元以评估安全对齐的脆弱性。*

![NeuroStrike 黑盒 profiling 流程](https://arxiv.org/html/2509.11864v1/x2.png)
*图：NeuroStrike 黑盒流程。用同族或相关 open-weight surrogate 学习安全神经元触发模式，并训练生成器产生更不易激活安全神经元的候选提示，再迁移到黑盒模型。*

```python
# NeuroStrike 核心流程（研究评估抽象版，不含具体有害内容）
def identify_safety_neurons(model, benign_prompts, unsafe_prompts, layers, z_threshold=3.0):
    activations = []
    labels = []
    for x in benign_prompts:
        activations.append(extract_mlp_gate_up_activations(model, x, layers))
        labels.append(0)
    for x in unsafe_prompts:
        activations.append(extract_mlp_gate_up_activations(model, x, layers))
        labels.append(1)

    safety_neurons = {}
    for layer in layers:
        X_layer = stack_layer_activations(activations, layer)
        clf = train_logistic_regression(X_layer, labels, epochs=5000, lr=1e-3, weight_decay=1e-3)
        z = (clf.weight - mean(clf.weight)) / std(clf.weight)
        safety_neurons[layer] = {i for i, zi in enumerate(z) if zi > z_threshold}
    return safety_neurons


def white_box_prune_eval(model, safety_neurons, evaluation_prompts):
    with activation_mask(model, safety_neurons, value=0.0):
        return evaluate_refusal_and_task_behavior(model, evaluation_prompts)


def black_box_profile(generator, surrogate, safety_neurons, seed_tasks):
    generator = supervised_finetune(generator, seed_tasks)
    for step in range(num_grpo_steps):
        candidates = generator.sample(seed_tasks)
        rewards = []
        for prompt in candidates:
            output = surrogate.generate(prompt)
            r_jb = judge_policy_violation(output)
            r_neuron = reward_low_safety_neuron_activation(surrogate, prompt, safety_neurons)
            rewards.append(r_jb + lambda_neuron * r_neuron)
        generator = grpo_update(generator, candidates, rewards)
    return select_high_reward_prompts(generator)
```

NeuroStrike 的出发点是把 safety alignment 看作一种可被内部表示触发的二分类边界。对齐训练让模型在遇到不安全请求时产生稳定拒答，这种稳定行为可能依赖某些 MLP 神经元的高激活。论文把这些神经元称为 safety neurons，并强调三种性质：specialized，专门响应安全相关输入；sparse，在目标层中只占很小比例；transferable，在同一模型族的 fine-tuned 或 distilled 变体中仍保留相似作用。

形式化地，若第 \(\ell\) 层的隐表示为 \(h^\ell(x)\in\mathbb{R}^d\)，安全对齐可被看作学习一个区分 benign prompts \(\mathcal{X}_B\) 与 malicious prompts \(\mathcal{X}_M\) 的内部边界。NeuroStrike 不直接在输出文本上搜索，而是收集两类输入在 MLP gate/up-projection 子层上的激活，并训练线性分类器：

$$
P(y=1\mid h^\ell(x))=\sigma(w_\ell^\top h^\ell(x)+b_\ell)
$$

其中 \(y=1\) 表示输入触发安全相关行为。线性模型的好处是可解释且可扩展：权重 \(w_{\ell,i}\) 可以直接对应到第 \(\ell\) 层第 \(i\) 个神经元对安全判别的贡献。

安全神经元选择使用 z-score 离群检测。对某层分类器权重，计算：

$$
z_{\ell,i}=\frac{w_{\ell,i}-\mu_{w_\ell}}{\sigma_{w_\ell}}
$$

当 \(z_{\ell,i}>\tau\) 时，把神经元 \(i\) 标记为 safety neuron；论文默认 \(\tau=3\)。这个设计的直觉是：不需要剪掉大量参数，只选择对“恶意 vs 良性”边界贡献异常大的神经元。论文案例中，Llama-3.2-1B-Instruct 某 up-projection 层只有约 0.35% 神经元被标记为 safety neurons；主实验也强调少量目标层神经元即可显著改变拒答行为。

白盒攻击评估阶段，NeuroStrike 在推理时将这些 safety neurons 的激活置零。若原模型的某层激活为 \(h^\ell\)，剪枝后的激活可以写作：

$$
\tilde{h}^\ell_i=
\begin{cases}
0, & i\in\mathcal{S}_\ell \\
h^\ell_i, & i\notin\mathcal{S}_\ell
\end{cases}
$$

其中 \(\mathcal{S}_\ell\) 是该层识别出的安全神经元集合。这个操作不是普通压缩意义上的模型剪枝，而是一个机制验证：如果只关掉很少的安全神经元就能让模型停止拒答，说明安全行为过度集中在稀疏路径上，存在单点脆弱性。

黑盒场景不能读取目标模型激活，因此 NeuroStrike 借助 transferability。它假设目标黑盒模型 \(f_{\theta_{tgt}}\) 与某个 open-weight surrogate \(f_{\theta_{src}}\) 在安全神经元触发模式上足够相似：

$$
h^{src}_{\mathcal{S}}(x)\approx h^{tgt}_{\mathcal{S}}(x)
$$

于是攻击者可以离线训练一个 prompt generator，让候选 prompt 在 surrogate 上既更可能获得不安全输出，又尽量不激活 surrogate 的 safety neurons。论文称这为 LLM profiling attack，因为大部分搜索和优化发生在 surrogate 上，迁移到黑盒时只提交已筛选候选。

生成器优化使用两阶段流程。第一阶段用监督微调学习已有 jailbreak prompt 模式；第二阶段用 GRPO 强化学习优化组合奖励。抽象奖励可写作：

$$
R(x)=R_{\text{jb}}(x)+\lambda R_{\text{neuron}}(x)
$$

其中 \(R_{\text{jb}}\) 来自输出是否绕过安全拒答的判别器，\(R_{\text{neuron}}\) 奖励低安全神经元激活。直觉是：只优化输出成功率容易学到显眼、易被防御识别的 prompt；加入 neuron reward 后，生成器会偏向那些在内部安全边界附近更“隐身”的候选。

论文实现细节中，安全神经元识别重点抽取 MLP 的 gate 和 up-projection 子层，因为这些子层常承载更高层语义特征，且对输入内容更敏感。每个子层单独训练 logistic regression，使用 binary cross-entropy、SGD、约 5000 epoch、学习率 \(10^{-3}\)、weight decay \(10^{-3}\)。黑盒生成器训练中则使用 SFT 加 GRPO，并用低秩适配技术降低训练成本。

与 GCG、PAIR、TAP 等 prompt 搜索方法相比，NeuroStrike 的关键区别是攻击单位从 token 转为 neuron。Prompt-only 方法通常需要大量在线查询，并且迁移性受模型表面行为影响；NeuroStrike 先识别内部安全电路，再在白盒中直接剪枝或在黑盒中训练规避激活的生成器。因此它既是攻击框架，也是对当前对齐方法的诊断工具：如果 safety neurons 过于稀疏且跨模型保留，那么单纯靠表层拒答模板或 prompt filter 很难提供稳健防线。

> 💡 关键：NeuroStrike 的防御启示是让安全行为不要集中在少量可定位神经元上。更稳健的对齐需要冗余、分布式、可校验的安全表示，并配合运行时完整性检查和异常激活监测。

#### 🧪 练习题
```yaml
question: "NeuroStrike 用 logistic regression 权重的 z-score 选择 safety neurons 的主要目的是什么？"
options:
  - "把所有 MLP 神经元都剪掉以提升速度"
  - "找到对良性/恶意激活边界贡献异常大的稀疏神经元集合"
  - "生成更长的 jailbreak prompt"
  - "替代模型的 tokenizer"
answer: 1
explain: "线性探针权重可对应单个神经元的判别贡献，z-score 离群检测能选出少量高贡献安全神经元。"
```
