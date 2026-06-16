### HMNS：头掩蔽零空间引导 (Head-Masked Nullspace Steering)
```yaml
id: hmns
name: HMNS
full_name: 头掩蔽零空间引导 (Head-Masked Nullspace Steering)
year: "2026.04"
org: ICLR
paper_url: https://iclr.cc/virtual/2026/papers.html
category: jailbreak
parent: pair
motivation: 掩蔽安全头电路高成功率越狱
```

#### 📝 一句话总结
HMNS 提出一种推理时电路级干预方法：先用反事实掩蔽定位最影响模型默认行为的注意力头，再零化这些头的写入路径，并向被静默子空间的正交补注入缩放扰动。它解决了传统 prompt-only jailbreak 依赖启发式改写、查询成本高且缺乏机制解释的问题。

#### 🎯 核心要点
- 三段式机制：causal-head attribution、out-projection masking、nullspace-constrained residual steering。
- 使用 KL 散度比较原始输出分布和单头掩蔽后的输出分布，按全局 top-\(K\) 选择最关键注意力头。
- 通过将选中头在 \(W^O_\ell\) 中对应列块置零，临时压制这些头写入 residual stream 的能力。
- 构造选中头输出投影张成的子空间 \(\mathcal{W}_\ell\)，再用 QR 投影得到正交补方向 \(u_\ell\)。
- 扰动按 residual RMS 缩放：\(\delta_\ell=\alpha\operatorname{RMS}(a_\ell)u_\ell\)，避免注入量与激活尺度失配。
- 整个过程在推理时闭环运行，每次 decode attempt 重新做 attribution，以适应自回归上下文中因果头排序的变化。
- 论文在 AdvBench、HarmBench、JBB-Behaviors、StrongReject 等 jailbreak 基准和强防御设置上比较 ASR、ACQ、IPC、FPS、LPS。
- 消融显示 KL attribution、nullspace injection、RMS scaling、closed-loop re-identification 共同决定效果，随机头或非正交方向都会明显退化。

#### 🔬 深入细节
![HMNS 流程总览](https://arxiv.org/html/2604.10326v1/HMNS_image.jpg)
*图：HMNS 的闭环流程。先定位关键注意力头，再掩蔽其 out-projection 写入路径，计算正交补中的 steering direction，最后把缩放扰动注入 residual stream；若未达到目标行为，则重复 attribution 和干预。*

```python
# HMNS 推理时干预伪代码（安全研究抽象版）
def hmns_decode(model, prompt, K=10, T_loop=10, alpha0=0.25, eps=1e-6, tol=1e-4):
    context = prompt
    baseline_logits = model.forward(context)
    P = softmax(baseline_logits[-1])

    for t in range(T_loop):
        # 1. 反事实单头掩蔽，用 KL 衡量每个头的因果重要性
        importance = []
        for layer, head in all_attention_heads(model):
            with temporarily_zero_out_projection_slice(model, layer, head):
                masked_logits = model.forward(context)
            P_masked = softmax(masked_logits[-1])
            delta = kl_divergence(P, P_masked)
            importance.append((delta, layer, head))

        selected = top_k_global(importance, K)

        # 2. 对每层构造被掩蔽写入子空间，并取正交补方向
        hooks = []
        for layer, heads in group_by_layer(selected):
            M = concat_out_projection_blocks(model.W_O[layer], heads)
            Q, _ = thin_qr(M)
            u = None
            while u is None or max_abs(M.T @ u) >= tol:
                r = normal_vector(dim=model.d_model)
                u = (eye(model.d_model) - Q @ Q.T) @ r
                u = u / (l2_norm(u) + eps)

            hooks.append(mask_heads(layer, heads))
            hooks.append(inject_residual(layer, alpha(t, alpha0) * rms_residual(layer) * u))

        # 3. 带 hook 生成候选输出；失败则重新 attribution
        with apply_hooks(model, hooks):
            candidate = model.generate(context)
        if success_predicate(candidate):
            return candidate

    return best_candidate_seen()
```

HMNS 的动机来自一个观察：decoder-only Transformer 在最终 token 的 next-token prediction 中，往往只有少数注意力头对输出分布有强因果影响。传统 jailbreak 方法主要在输入表面做搜索或改写，既不直接控制模型内部路由，也容易在防御器、拒答模板或 prompt perturbation 下失效。HMNS 则把攻击面移动到推理时内部机制：找到当前 prompt 下最关键的写入路径，把它们临时静默，再从这些路径无法表示的几何方向施加 steering。

第一步是 causal head attribution。设模型原始最终位置 logits 为 \(z\)，输出分布为 \(P=\operatorname{softmax}(z)\)。对第 \(\ell\) 层第 \(h\) 个头，令 \(S_{\ell,h}\) 是只选中该头输出切片的对角选择矩阵，掩蔽后的 out-projection 为：

$$
\widetilde{W}^{O}_{\ell,h}=W^{O}_{\ell}(I-S_{\ell,h})
$$

用这个临时权重跑一次 ablated forward，得到 \(\widetilde{P}^{(\ell,h)}=\operatorname{softmax}(\widetilde{z}^{(\ell,h)})\)。该头的重要性用分布偏移衡量：

$$
\Delta_{\ell,h}=D_{\mathrm{KL}}\left(P\ \|\ \widetilde{P}^{(\ell,h)}\right)
$$

直觉上，如果掩蔽某个头后输出分布变化很大，说明它对模型默认续写行为有高因果贡献。论文使用 global top-\(K\) 而不是每层固定配额，因为关键头可能集中在少数层；强制每层选头会把预算浪费在低影响位置。

第二步是 head masking。注意力头的输出 \(\widehat{h}^{(h)}_{\ell,T}\) 通过 \(W^O_\ell[:,hd_h:(h+1)d_h]\) 写入 residual stream。HMNS 对选中头的列块做动态置零，只在当前 forward pass 生效，不永久修改模型权重。这样做的效果不是删除整个注意力层，而是精准切断被 attribution 选中的写入通道，使这些头无法继续把默认拒答或安全路由信号写回 residual stream。

第三步是 nullspace steering。对某层选中的头集合 \(\mathcal{S}_\ell\)，把它们在 \(W^O_\ell\) 中的列块拼接为：

$$
M_\ell=\left[W^O_\ell[:,hd_h:(h+1)d_h]\right]_{h\in\mathcal{S}_\ell}\in\mathbb{R}^{d\times |\mathcal{S}_\ell|d_h}
$$

\(M_\ell\) 张成的是被静默头原本可写入的子空间 \(\mathcal{W}_\ell\)。HMNS 对 \(M_\ell\) 做 thin QR 分解 \(M_\ell=Q_\ell R_\ell\)，采样随机向量 \(r\sim\mathcal{N}(0,I_d)\)，并投影到正交补：

$$
u_\ell=\frac{(I-Q_\ell Q_\ell^\top)r}{\|(I-Q_\ell Q_\ell^\top)r\|_2+\varepsilon}
$$

如果 \(\|M_\ell^\top u_\ell\|_\infty<\delta\)，就认为该方向近似位于 \(\mathcal{W}_\ell^\perp\)。这一步的核心直觉是：被掩蔽的写入路径无法重构或抵消这个正交方向，因此 steering 不会立即被刚刚静默的头“解释回去”。这也是 HMNS 相比普通 activation steering 更强调几何约束的地方。

实际注入时，论文不是直接加固定范数扰动，而是按 residual 激活的 RMS 缩放：

$$
\delta_\ell=\alpha\cdot\operatorname{RMS}(a_\ell)\cdot u_\ell,
\qquad
\operatorname{RMS}(a_\ell)=\sqrt{\frac{1}{d}\sum_{i=1}^{d}a_{\ell,i}^{2}}
$$

这样可以让扰动强度和当前层激活尺度匹配，减少过强扰动造成的流畅性崩坏，也避免过弱扰动无法改变路由。论文消融中，RMS scaling、post-attention 注入位置、QR 数值稳定性和正交容忍度都会影响 ASR 与延迟。

闭环 re-identification 是 HMNS 的另一个关键点。自回归生成中，随着上下文变化，哪些头最影响输出也会变化；冻结第一轮 top-\(K\) 会降低成功率并增加外部查询。HMNS 因此在每次 decode attempt 中重新计算 \(\Delta_{\ell,h}\)，重新构造 \(M_\ell\) 和 \(u_\ell\)。这使它不是一次性 hook，而是一个 detection-intervention loop：检测当前因果头，干预当前写入子空间，观察输出，再更新下一轮目标。

> ⚠️ 注意：从防御视角看，HMNS 的意义在于暴露“安全行为是否集中在少数可定位电路”这一风险。若模型过度依赖少数注意力头或固定拒答路由，机制级干预就可能绕过表层 prompt 防御。

#### 🧪 练习题
```yaml
question: "HMNS 为什么要把 steering vector 限制在被掩蔽写入子空间的正交补中？"
options:
  - "为了减少模型参数量"
  - "为了让扰动不能被已静默头的写入子空间重构或抵消"
  - "为了把所有注意力头都替换成 MLP"
  - "为了避免计算 KL 散度"
answer: 1
explain: "HMNS 先静默高因果头，再在其写入子空间的正交补注入扰动，使干预方向与被静默路径几何解耦。"
```
