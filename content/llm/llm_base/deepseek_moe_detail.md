### DeepSeekMoE: 细粒度专家分割 MoE (DeepSeekMoE)

```yaml
id: deepseek_moe
name: DeepSeekMoE
full_name: 细粒度专家分割 MoE (DeepSeekMoE)
year: "2024.01"
org: DeepSeek-AI
paper_url: https://arxiv.org/abs/2401.06066
category: sparse_moe
parent: switch_transformer
motivation: 细粒度专家提升专业化
```

#### 📝 一句话总结

DeepSeekMoE 面向 MoE 的“专家专业化不足”问题，提出细粒度专家分割与共享专家隔离：前者把专家拆小并激活更多组合，后者固定共享专家承载通用知识，从而减少路由专家的知识混杂与冗余。论文在 2B、16B 和 145B 规模上验证了该结构相对 GShard 式 MoE 的参数/计算效率优势。

#### 🎯 核心要点

- **问题定位**：传统 Top-\(K\) MoE 容易出现知识混杂和知识冗余，专家无法获得足够非重叠、聚焦的知识
- **细粒度专家分割**：把 \(N\) 个标准专家拆为 \(mN\) 个小专家，每个小专家 FFN 中间维度缩小为原来的 \(1/m\)
- **激活更多专家组合**：为保持计算量不变，每个 token 从激活 \(K\) 个标准专家改为激活 \(mK\) 个细粒度专家，组合空间大幅增加
- **共享专家隔离**：隔离 \(K_s\) 个专家作为共享专家，对所有 token 无条件激活，用于捕获语法、常识等通用知识
- **路由专家更专门化**：共享专家吸收公共模式后，剩余 routed experts 更倾向学习差异化知识，缓解多专家重复学习同一通用知识
- **两级负载均衡**：Expert-Level Balance Loss 防止路由坍缩，Device-Level Balance Loss 保证跨设备计算更均衡
- **规模验证**：DeepSeekMoE 2B 接近同总参数 dense 上界，16B 以约 40% 计算量达到 LLaMA2 7B 相当水平，145B 以约 28.5% 计算量接近 DeepSeek 67B

#### 🔬 深入细节

![DeepSeekMoE 架构示意](https://ar5iv.labs.arxiv.org/html/2401.06066/assets/x1.png)
*图：DeepSeekMoE 论文 Figure 1。左为传统 Top-2 MoE，中间为细粒度专家分割，右为加入共享专家隔离后的完整 DeepSeekMoE。*

```python
# DeepSeekMoE 层伪代码：细粒度专家分割 + 共享专家隔离
def deepseek_moe_layer(u_t, shared_experts, routed_experts, router, m, K, K_s):
    # u_t: 某层 attention 后的单 token hidden state
    # shared_experts: K_s 个固定激活专家
    # routed_experts: mN - K_s 个可路由细粒度专家

    shared_out = 0
    for expert in shared_experts:
        shared_out += expert(u_t)             # 无条件参与，捕获公共知识

    logits = router(u_t, routed_experts)      # token-to-expert affinity
    routed_k = m * K - K_s                    # 保持激活计算量近似不变
    top_logits, top_idx = topk(logits, routed_k)
    gates = softmax(top_logits)

    routed_out = 0
    for weight, idx in zip(gates, top_idx):
        routed_out += weight * routed_experts[idx](u_t)

    return u_t + shared_out + routed_out
```

DeepSeekMoE 从 MoE 的结构性缺陷入手，而不是只调整路由损失。传统 GShard/Switch 类 MoE 把 Transformer 的 FFN 替换为 \(N\) 个专家，并让每个 token 选择 \(K\) 个专家。若专家数较少，每个专家会被迫吸收很多异质 token 的知识，形成“知识混杂”；同时，不同 token 又共享大量基础语言规律，多个专家会重复学习这些通用知识，形成“知识冗余”。这两者都会降低稀疏参数的有效利用率。

细粒度专家分割的做法是在总专家参数和激活计算量基本不变的前提下，提高组合灵活性。假设原本有 \(N\) 个标准 FFN 专家、每次激活 \(K\) 个，DeepSeekMoE 将每个专家切成 \(m\) 个小专家，即总数变为 \(mN\)，每个小专家中间维度降为原来的 \(1/m\)，并把激活数提高到 \(mK\)。对应公式为：

$$
h_t^l=\sum_{i=1}^{mN} g_{i,t}\operatorname{FFN}_i(u_t^l)+u_t^l,
$$

$$
g_{i,t}=
\begin{cases}
s_{i,t}, & s_{i,t}\in \operatorname{Topk}(\{s_{j,t}\mid 1\le j\le mN\},mK) \\
0, & \text{otherwise}
\end{cases},
\quad
s_{i,t}=\operatorname{Softmax}_i((u_t^l)^T e_i^l).
$$

组合数的变化解释了为什么“拆小”有效。传统 \(N=16,K=2\) 只有 \(\binom{16}{2}=120\) 种激活组合；若 \(m=4\)，则变成从 64 个小专家中选 8 个，组合数达到 \(\binom{64}{8}=4,426,165,368\)。单个小专家更窄，容易学得更聚焦；多个小专家的组合又能覆盖复杂输入所需的多种知识片段。

共享专家隔离进一步处理通用知识冗余。DeepSeekMoE 设 \(K_s\) 个 shared experts，它们不参与 TopK 竞争，而是对所有 token 固定激活；为了保持计算量，routed experts 的激活数从 \(mK\) 降为 \(mK-K_s\)。完整层输出为：

$$
h_t^l=\sum_{i=1}^{K_s}\operatorname{FFN}_i(u_t^l)
+\sum_{i=K_s+1}^{mN}g_{i,t}\operatorname{FFN}_i(u_t^l)
+u_t^l.
$$

这不是简单增加一个 dense FFN，而是把“所有 token 都需要的公共知识”显式隔离出来。共享专家越稳定地承载语法、常见模式和基础语言能力，路由专家就越少需要重复学习这些模式，从而把容量用于更差异化的知识。论文的表述是从算法角度解释 shared experts，而不是只把它当作工程负载优化。

负载均衡仍然是 MoE 必须处理的问题。DeepSeekMoE 使用 expert-level balance loss 防止路由器总把 token 分给少数专家：

$$
\mathcal{L}_{\mathrm{ExpBal}}=\alpha_1\sum_{i=1}^{N'} f_iP_i,
\quad
f_i=\frac{N'}{K'T}\sum_{t=1}^{T}\mathbb{1}(\text{Token }t\text{ selects Expert }i),
\quad
P_i=\frac{1}{T}\sum_{t=1}^{T}s_{i,t}.
$$

当专家跨设备部署时，论文还引入 device-level balance loss，把专家按设备聚合后约束设备间负载，而不是强迫每个专家完全均匀。这一点很实用：过强的专家级均衡会损伤专业化，但设备级均衡能直接缓解训练/推理瓶颈。整体上，DeepSeekMoE 的核心思想是“先用结构提升专家可分工性，再用轻量均衡防止训练崩塌”。

#### 🧪 练习题

```yaml
question: "DeepSeekMoE 中共享专家隔离的主要作用是什么？"
options:
  - "让所有专家都参与每个 token 的计算，退化为稠密模型"
  - "固定一部分专家捕获通用知识，从而减少路由专家之间的知识冗余"
  - "取消 TopK 路由，完全依赖哈希分配 token"
  - "只用于把专家平均放到不同 GPU 上，与模型质量无关"
answer: 1
explain: "共享专家对所有 token 无条件激活，承担公共语言模式；这样 routed experts 更容易学习差异化知识，提升专家专业化。"
```
