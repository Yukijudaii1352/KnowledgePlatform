### AlignTree：对齐树（AlignTree: Efficient Defense Against LLM Jailbreak Attacks）

```yaml
id: aligntree
name: AlignTree
full_name: 对齐树 (AlignTree: Efficient Defense)
year: "2026.01"
org: AAAI
paper_url: https://doi.org/10.1609/aaai.v40i44.41074
category: jailbreak
parent: llama_guard3
motivation: 随机森林实时激活拦截
```

#### 📝 一句话总结

AlignTree 提出一种轻量级激活监控防御：把 LLM 隐状态中的线性拒绝方向与非线性 SVM 有害性信号拼接后交给随机森林分类器，在不引入额外 guard LLM 或多次推理的情况下实时拦截越狱输入。

#### 🎯 核心要点

- 属于 in-process defense：直接利用基础模型内部 activation/hidden state，不依赖 Llama Guard 类外部模型、LLM-as-a-judge 或额外提示轮次。
- 两类核心特征：最终 token 各层 hidden state 在单一 refusal direction 上的投影，以及多个 RBF-SVM 在不同层/位置上的有害概率。
- Refusal direction 通过 harmful/harmless 训练集的 difference-in-means 候选向量得到，再在验证集上选择影响拒绝行为最强的单一方向 \(r^*\)。
- 非线性信号来自第一批 token 和最后若干 token 的多层隐藏状态；每个位置-层组合训练一个 RBF-SVM，再筛选表现最好的 SVM 并用 Platt scaling 校准成概率。
- 最终分类器是浅层 Random Forest，输入为 refusal activation 与 SVM 概率拼接向量，输出 prompt harmfulness confidence。
- 阈值 \(\tau\) 通过强调 precision 的 \(F_\beta\) 分数选择，论文设置 \(\beta=0.2\)，以减少对良性请求的过拒绝。
- 训练/评估覆盖 Qwen2.5、Llama-3、Gemma-3 多个规模，安全数据包括 AdvBench、HarmBench、MaliciousInstruct、PAIR、AutoDAN 等，良性数据包括 ALPACA、XSTest、PIQA、ARC、OpenBookQA、SIQA 等。

#### 🔬 深入细节

![AlignTree 阈值选择图](https://arxiv.org/html/2511.12217v1/x1.png)
*图：论文用广义 \(F_\beta\) 曲线为具体模型选择阻断阈值。虽然论文没有单独画完整架构图，这张图展示了 AlignTree 从 harmfulness score 到“放行/阻断”决策的关键部署环节。图源：arXiv HTML。*

```python
# AlignTree 训练与推理伪代码
def train_aligntree(llm, harmful_train, harmless_train, validation):
    # 1. 计算每个层/位置的 harmful 与 harmless 均值差，得到候选 refusal directions
    candidates = []
    for layer in llm.layers:
        for pos in selected_token_positions:
            mu_h = mean(hidden(llm, x, layer, pos) for x in harmful_train)
            mu_b = mean(hidden(llm, x, layer, pos) for x in harmless_train)
            candidates.append(mu_h - mu_b)

    r_star = select_direction_by_refusal_effect(candidates, validation)

    # 2. 训练非线性 SVM 探针，捕捉 refusal direction 之外的几何信号
    svms = []
    for layer in llm.layers:
        for pos in first_3_and_last_5_positions:
            svm = train_rbf_svm(hidden_features(layer, pos), labels)
            svms.append(calibrate_with_platt_scaling(svm))
    selected_svms = top_k_by_validation_accuracy(svms)

    # 3. 拼接 refusal projection 与 SVM probability，训练随机森林
    X = [feature_vector(prompt, r_star, selected_svms) for prompt in train_prompts]
    rf = train_random_forest(X, labels, n_estimators=50, max_depth=6)
    tau = choose_threshold_by_f_beta(rf, validation, beta=0.2)
    return r_star, selected_svms, rf, tau


def defend(prompt, llm, r_star, selected_svms, rf, tau):
    features = feature_vector(prompt, r_star, selected_svms)
    harmfulness = rf.predict_proba(features)["harmful"]
    if harmfulness >= tau:
        return refuse_or_block(prompt)
    return llm.generate(prompt)
```

AlignTree 的出发点是推理成本。预处理防御如果调用另一个安全 LLM，会增加部署成本和延迟；后处理防御要等长文本生成完再检查，用户体验更慢；SmoothLLM 一类方法需要对输入做多次扰动并多次推理，成本随采样数增长。AlignTree 选择直接读基础模型自己的隐藏状态，用一个小分类器判断当前输入是否处在“会诱发不安全行为”的内部表示区域，从而避免额外模型和额外生成轮次。

第一类信号是 refusal direction。给定有害训练集 \(D_{\text{harmful}}^{\text{train}}\) 和无害训练集 \(D_{\text{harmless}}^{\text{train}}\)，对 token 位置 \(i\) 与层 \(l\) 的 hidden activation \(x_i^{(l)}(t)\)，论文先计算两类均值：

$$
\mu_i^{(l)}=\frac{1}{|D_{\text{harmful}}^{\text{train}}|}\sum_{t\in D_{\text{harmful}}^{\text{train}}}x_i^{(l)}(t),\quad
v_i^{(l)}=\frac{1}{|D_{\text{harmless}}^{\text{train}}|}\sum_{t\in D_{\text{harmless}}^{\text{train}}}x_i^{(l)}(t)
$$

候选方向是两者差值：

$$
r_i^{(l)}=\mu_i^{(l)}-v_i^{(l)}
$$

这些候选向量不是全部使用，而是在验证集上选择一个单一 \(r^*\)。选择准则继承 refusal-direction 工作的直觉：如果 ablate 该方向能降低拒绝倾向、add 该方向能诱导拒绝行为，同时不破坏一般能力，那么它更像模型内部的“拒绝几何轴”。随后任意 hidden state \(h\) 对该方向的 alignment 被压缩成标量特征：

$$
\text{proj}_{r^*}(h)=\frac{h\cdot r^*}{\|r^*\|}\in\mathbb{R}
$$

第二类信号解决“拒绝行为并非完全线性”的问题。单一方向能解释一部分安全行为，但越狱提示可能沿着更复杂的曲面移动，尤其是经过语义伪装、自动改写或后缀优化后。AlignTree 因此在每层、前 3 个 token 与后 5 个 token 的位置上训练 RBF-kernel SVM。RBF-SVM 能捕捉局部非线性边界；再通过 5-fold out-of-fold 预测和 Platt scaling，把 SVM decision value 映射为可比较的 harmfulness probability。筛选出的 SVM 集合 \(\mathcal{S}\) 形成概率特征：

$$
\text{SVMFeatures}(t)=\left[P_{\text{harmful}}(x_i^{(l)}(t))\right]_{(i,l)\in\mathcal{S}}
$$

最终 AlignTree 把线性与非线性特征拼接：

$$
\text{F}(t)=\left[\text{proj}_{r^*}(x_{-1}^{(l)}(t))\right]_{l=1}^{L}\oplus
\left[P_{\text{harmful}}(x_i^{(l)}(t))\right]_{(i,l)\in\mathcal{S}}
$$

其中 \(x_{-1}^{(l)}(t)\) 表示最后 token 在第 \(l\) 层的激活，\(\oplus\) 是向量拼接。这个特征向量交给浅层随机森林，而不是深网络，原因是部署目标是实时、低成本和可解释的特征组合。随机森林能处理不同尺度的概率/投影信号，也能通过树分裂学习“某些层的 refusal projection 与某些 token 的 SVM 概率同时异常”这类非线性交互。

阈值选择是 AlignTree 控制误拒绝的关键。分类器输出 harmfulness confidence 后，系统用 \(\tau\) 决定放行或阻断；如果 \(\tau\) 太低，良性请求会被过度拒绝；如果太高，有害请求会漏过。论文用广义 \(F_\beta\) 在验证集上选阈值：

$$
F_\beta=(1+\beta^2)\cdot\frac{\text{Precision}\cdot\text{Recall}}{\beta^2\cdot\text{Precision}+\text{Recall}}
$$

论文设置 \(\beta=0.2\)，强调 precision，即更重视被拦截样本确实有害，避免对正常用户造成过多拒绝。这与很多安全过滤器“宁可多拒绝”的取向不同：AlignTree 的目标是可部署，因此同时报告 ASR、良性 refusal rate 与执行时间。

> 💡 关键：AlignTree 不是训练一个新的安全语言模型，而是在已有 LLM 的激活空间上训练小型探针和随机森林。它的优势来自“少一次 LLM 调用”，风险则在于它依赖特定模型的内部表示，迁移到新模型时需要重新抽取方向、训练 SVM 和校准阈值。

#### 🧪 练习题

```yaml
question: "AlignTree 为什么要同时使用 refusal direction 和 RBF-SVM 信号？"
options:
  - "因为随机森林只能接收两类特征，不能接收单类特征"
  - "因为线性拒绝方向捕捉主要安全轴，而 RBF-SVM 补充非线性有害模式"
  - "因为 RBF-SVM 用来生成最终文本回答"
  - "因为 refusal direction 只能用于图像模型，不能用于 LLM"
answer: 1
explain: "论文认为单一线性方向不足以描述全部拒绝几何，因此用多层/多位置 RBF-SVM 概率补充复杂非线性信号，再交给随机森林融合。"
```
