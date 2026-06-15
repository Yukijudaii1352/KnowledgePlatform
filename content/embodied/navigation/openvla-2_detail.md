### OpenVLA-2 — 开源VLA第二代 (Open VLA Second Generation)

```yaml
id: openvla-2
name: OpenVLA-2
full_name: "开源VLA第二代 (Open VLA Second Generation)"
year: "2026"
org: "Stanford"
paper_url: "https://openvla.github.io/v2"
category: "vla_model"
parent: "openvla"
motivation: "200ms实时精确动作推理"
```

#### 📝 一句话总结

OpenVLA-2 条目的公开链接在撰写时未能定位到稳定论文页；本精读按其“第二代 OpenVLA、实时动作推理”的元信息，结合公开 OpenVLA-OFT 资料解读其关键方向：从离散自回归动作转向并行、连续、chunked 的高频控制。

#### 🎯 核心要点

- 依据受限：`https://openvla.github.io/v2` 未找到稳定公开论文内容，因此以下方法细节以 OpenVLA-OFT 公开论文/项目页为主要依据。
- OpenVLA-OFT 提出 optimized fine-tuning recipe，在 OpenVLA 基础上系统比较动作解码、动作表示和训练目标。
- 核心变化包括 parallel decoding、action chunking、continuous action representation 和 L1 regression objective。
- LIBERO 上平均成功率从 OpenVLA 基线的约 76.5% 提升到约 97.1%，动作生成吞吐可提升约 26x。
- 面向 ALOHA 双臂高频控制，OFT+ 使用 FiLM 增强语言条件，并支持 25Hz 控制。
- 与第一代 OpenVLA 相比，重点从“开源 VLA 可用”推进到“低延迟、连续动作、真实机器人高频可部署”。

#### 🔬 深入细节

![OpenVLA-OFT 总览图](https://openvla-oft.github.io/static/images/openvla_oft_figure_1.jpeg)
*图：OpenVLA-OFT 展示了对 OpenVLA 的并行连续动作微调路线，可作为 OpenVLA-2 元信息中实时推理方向的公开依据。*

```python
# OpenVLA-2 / OpenVLA-OFT 风格优化微调伪代码
def train_oft(batch, base_openvla):
    visual_tokens = base_openvla.encode_vision(batch.images)
    text_tokens = tokenize(batch.instruction)
    h = base_openvla.forward_context(text_tokens, visual_tokens)

    # 不再逐 token 自回归输出离散动作，而是并行预测连续动作 chunk
    pred_chunk = parallel_action_head(h, chunk_size=H)
    target_chunk = normalize(batch.action_chunk)
    loss = l1(pred_chunk, target_chunk)
    update(base_openvla, loss)

def act_realtime(obs, instruction):
    h = encode_context_once(obs.images, instruction)
    action_chunk = parallel_action_head(h)
    return denormalize(action_chunk[:control_horizon])
```

第一代 OpenVLA 的成功来自“动作即 token”的统一建模，但这也带来两个工程问题：动作需要逐维自回归解码，且离散 bin 对精细控制有量化损失。OpenVLA-OFT 的结论是，若目标是 200ms 量级的实时精确控制，应该把动作头从语言 token 解码中解耦出来，改为并行预测连续动作块。一个简化目标可写成：

$$
\mathcal{L}_{\text{OFT}} =
\frac{1}{H}\sum_{h=1}^{H}
\left\|\hat{a}_{t+h} - a_{t+h}\right\|_1,
$$

其中 \(H\) 是 action chunk 长度。L1 损失对异常值相对稳健，也避免了离散 token cross-entropy 与连续控制误差之间的不匹配。

parallel decoding 的意义在于延迟。自回归 OpenVLA 需要按动作维度和 token 顺序循环：

$$
p(y_{1:m}\mid o,\ell)=\prod_{i=1}^{m}p(y_i\mid y_{<i},o,\ell),
$$

而连续并行头直接预测 \(\hat{A}_{t:t+H}\)。当 \(H\) 增大时，chunking 不只减少模型调用频率，还让模型利用未来动作的短时相关性，例如双臂同步、抓取前预对齐和放置后的撤离。

如果把该条目理解为 OpenVLA 的“第二代路线”，它与 π0 的差别在于优化重点不同：π0 从一开始就采用 flow matching 动作专家；OpenVLA-OFT 更像在已有 OpenVLA VLM 权重和训练生态上做最小侵入式改造，把动作输出层、微调损失和语言调制方式换成更适合控制的形式。这使它保留 OpenVLA 的开源可微调优势，同时显著改善吞吐和真实机器人部署可行性。

> ⚠️ 注意：本文件保留 YAML 原始 `paper_url`；由于该 URL 未提供可稳定访问的论文内容，方法细节以公开 OpenVLA-OFT 论文和项目页作为可核验依据。

#### 🧪 练习题

```yaml
question: "OpenVLA-OFT 相比原始 OpenVLA 的关键优化是什么？"
options:
  - "继续用离散动作 token，但减少训练数据"
  - "用并行动作头预测连续 action chunk，降低自回归解码延迟"
  - "完全删除视觉编码器，只保留语言模型"
  - "把机器人控制改成只输出 PDDL 计划"
answer: 1
explain: "OFT 的核心是并行、连续、chunked 的动作输出和 L1 微调目标，使 OpenVLA 更适合实时精确控制。"
```
