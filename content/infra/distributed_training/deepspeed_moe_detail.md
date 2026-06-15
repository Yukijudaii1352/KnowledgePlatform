### DeepSpeed-MoE: DeepSpeed MoE系统

```yaml
id: deepspeed_moe
name: DeepSpeed-MoE
full_name: DeepSpeed MoE系统 (DeepSpeed-MoE)
year: '2022'
org: Microsoft
paper_url: https://arxiv.org/abs/2201.05596
category: hybrid
parent: gshard
motivation: PR-MoE金字塔结构+MoE-Offload
```

#### 📝 一句话总结

DeepSpeed-MoE 是面向 MoE 训练和推理的一体化系统，通过 PR-MoE 架构、专家并行、MoE inference 优化和 offload/压缩技术，让稀疏专家模型在训练成本、推理延迟和部署成本上优于质量相当的 dense 模型。

#### 🎯 核心要点

- 将 DeepSpeed 的并行训练能力扩展到 MoE：专家并行与数据/张量/流水线并行组合，用 all-to-all 完成 token dispatch。
- 提出 Pyramid-Residual MoE（PR-MoE），用金字塔式专家配置和 residual dense 路径减少参数量并稳定质量。
- 面向推理提出 MoE-specific 优化：专家切分、分层通信、batch/token 调度和模型压缩。
- 支持 MoE-Offload，把不活跃或低频专家放到 CPU/NVMe 等层级，在显存受限下服务更大 MoE。
- 论文报告 MoE 训练相对质量等价 dense 模型可显著省训练成本，推理相对既有 MoE 系统最高 7.3x 更低延迟/成本。

#### 🔬 深入细节

##### 核心示意图

![DeepSpeed-MoE 系统与模型示意](https://ar5iv.labs.arxiv.org/html/2201.05596/assets/x1.png)
*图：DeepSpeed-MoE 将 MoE 层、专家并行、训练/推理系统优化整合到 DeepSpeed 栈中。*

##### 算法伪代码

```python
# DeepSpeed-MoE layer, simplified
def deepspeed_moe_layer(x, router, local_experts, ep_group):
    score = softmax(router(x), dim=-1)
    experts, gates = top_k(score, k=1 or 2)

    send_buf = pack_tokens_by_expert(x, experts, ep_group)
    expert_inputs = all_to_all(send_buf, group=ep_group)

    expert_outputs = []
    for expert_id, tokens in expert_inputs.items():
        expert_outputs.append(local_experts[expert_id](tokens))

    recv_buf = all_to_all(pack_outputs(expert_outputs), group=ep_group)
    return combine_by_original_token(recv_buf, gates)
```

##### 方法解释

MoE 训练的基本瓶颈是 token dispatch。每个 GPU 只持有一部分专家，router 为 token 选专家后，token 必须通过 all-to-all 发到拥有对应专家的 GPU。DeepSpeed-MoE 将专家并行作为一等并行维度，与数据并行、张量并行、流水线并行组合，使专家数量可以随 GPU 数扩展，而 dense attention/embedding 等部分仍可使用已有 DeepSpeed 3D 并行策略。

PR-MoE 的动机是 MoE 参数虽多，但不是所有层都需要同样多专家。Pyramid 结构让不同深度层使用不同专家规模，Residual 结构保留 dense FFN 路径并叠加稀疏专家输出：

$$
y = \mathrm{DenseFFN}(x) + \sum_{i \in \mathrm{TopK}(x)} g_i E_i(x)
$$

这样可以在保持模型质量的同时减少专家参数和路由不稳定，推理时也能降低需要加载和调度的专家规模。

推理比训练更难，因为在线服务的 batch 可能小、token 分布不稳定，MoE all-to-all 更容易暴露。DeepSpeed-MoE 通过专家切分和分层通信减少单设备热点，用调度把同专家 token 聚合，用压缩和 offload 降低显存压力。MoE-Offload 的直觉是推理时每个 token 只访问少数专家，未访问专家不必常驻 GPU；系统可以按热度和路由预测把专家在 GPU/CPU/NVMe 间迁移。

> 💡 关键：DeepSpeed-MoE 不只是一层 MoE kernel，而是从模型结构、训练并行到推理部署都围绕“稀疏激活但专家巨大”这一特性设计。

##### 与 GShard/Switch 的区别

GShard 和 Switch 更强调模型和路由机制，DeepSpeed-MoE 更强调端到端系统化。它既支持训练时的 expert parallel all-to-all，也关注推理时的专家放置、offload、低延迟调度和模型压缩。因此它把 MoE 从“可训练的大模型结构”推进到“可部署的稀疏大模型系统”。

#### 🧪 练习题

```yaml
question: "DeepSpeed-MoE 中 PR-MoE 的核心目的是什么？"
options:
  - "用金字塔式专家配置和 residual dense 路径降低 MoE 参数/推理成本并保持质量"
  - "让每个 token 必须经过全部专家"
  - "完全取消 all-to-all 通信"
  - "只用于图像分类，不能用于语言模型"
answer: 0
explain: "PR-MoE 通过结构设计减少专家参数和稳定训练/推理，是 DeepSpeed-MoE 的重要模型侧优化。"
```
