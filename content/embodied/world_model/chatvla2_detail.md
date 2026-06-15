### ChatVLA-2 — 对话视觉语言动作2 (Open-world Reasoning VLA)

```yaml
id: chatvla2
name: ChatVLA-2
full_name: "对话视觉语言动作2 (Open-world Reasoning VLA)"
year: "2026.03"
org: "Fudan University"
paper_url: "https://proceedings.neurips.cc/paper/2026/chatvla2"
category: "embodied"
parent: "vjepa21"
motivation: "保留VLM能力扩展开放世界具身推理"
```

#### 📝 一句话总结

ChatVLA-2 提出带动态 Mixture-of-Experts 和两阶段训练的 VLA，使机器人在微调后仍能保留 VLM 的 OCR、数学和空间推理能力，并把内部推理可靠转化为动作。清单中的 NeurIPS 2026 链接疑似占位符；本精读依据可访问论文 arXiv:2505.21906v2 整理。

#### 🎯 核心要点

- 以 DexVLA/Qwen2-VL 风格架构为基础，视觉观测和语言 token 进入 VLM，输出 reasoning tokens 与 action tokens。
- 使用动态 MoE 解耦多模态理解与机器人控制的冲突参数空间；实践中共 8 个 experts，推理时动态选择 2 个。
- Action tokens 经两层线性层和 LayerNorm 投影后送入预训练 1B ScaleDP action expert。
- 提出 reasoning-following enhancement module：用 reasoning tokens 调制动作专家后半层的 scale/shift，使动作跟随模型内部推理。
- 两阶段训练：Stage 1 混合图文数据和机器人数据保留开放世界推理；Stage 2 冻结 VLM、只训练 action expert，加强推理到动作的连接。
- 图文数据包含 COCO、TextVQA、GQA 及机器人场景图文；机器人数据包含 600 条 math-matching 和 300 条 toy-placement 轨迹。
- 开放世界 math matching 中 ChatVLA-2 达到 43/52 成功，toy placement 中达到 127/156，显著优于 OpenVLA、DexVLA、ChatVLA、π0 等基线。

#### 🔬 深入细节

![ChatVLA-2 模型架构](https://arxiv.org/html/2505.21906v2/x1.png)
*图：ChatVLA-2 在 VLM backbone 中加入动态 MoE，并在动作专家中加入 reasoning-following 增强模块。*

```python
# ChatVLA-2 训练与推理伪代码
def stage1_cotrain(batch):
    image_tokens = vision_encoder(batch.multi_view_images)
    text_tokens = tokenizer(batch.instruction)
    hidden = qwen2_vl_dynamic_moe(image_tokens, text_tokens, top_k_experts=2)
    reasoning_tokens, action_tokens = split_outputs(hidden)
    actions = scaledp_action_expert(project(action_tokens), batch.robot_state)
    loss = vlm_loss(reasoning_tokens, batch.text_targets) + action_loss(actions, batch.actions)
    update(vlm_and_action_expert, loss)

def stage2_reasoning_following(robot_batch):
    freeze(qwen2_vl_dynamic_moe)
    hidden = qwen2_vl_dynamic_moe(robot_batch.images, robot_batch.instruction)
    reasoning_tokens, action_tokens = split_outputs(hidden)
    scale_shift = reasoning_to_modulation(reasoning_tokens)
    actions = scaledp_action_expert(project(action_tokens), modulation=scale_shift)
    loss = action_loss(actions, robot_batch.actions)
    update(action_expert_only, loss)

def infer(obs, instruction):
    reasoning, action_tokens = qwen2_vl_dynamic_moe(obs.images, instruction)
    return scaledp_action_expert(project(action_tokens), reasoning_condition=reasoning)
```

ChatVLA-2 关注的问题不是“VLA 能否学会某个机器人任务”，而是“VLA 微调后是否还记得 VLM 原本会的东西”。普通端到端 VLA 在机器人数据上微调后，往往牺牲 OCR、数学、常识和空间关系能力；但开放世界机器人任务恰恰需要这些能力，例如读白板公式、识别未见过玩具、理解“放到杯子右侧/架子上方”。

动态 MoE 是为了解决参数空间冲突。给定 hidden state \(h\)，router 选择 top-k experts：

$$
y = \sum_{e\in \mathrm{TopK}(G(h))} G_e(h)\,E_e(h).
$$

某些 experts 可专注机器人动作，某些保留多模态理解，还有一些承载空间推理等共享能力。论文特别强调不用 static/shared expert 粗暴改结构，因为 Qwen2-VL 的 LLM 部分本来不是 MoE，过度改动会破坏预训练知识；动态 MoE 尽量保持原架构，同时让输入自适应选择专家。

Reasoning-following enhancement module 解决另一个问题：模型“想对了”不代表“动对了”。ChatVLA-2 不只把语言指令送给动作头，而是把上层 reasoning tokens 投影成调制信号，作用于动作专家后半层：

$$
(\gamma,\beta)=\mathrm{MLP}(r_{\text{reason}}),
\qquad
h'=\gamma\odot h+\beta .
$$

只注入后半层是一个工程取舍：深层更接近语义和动作决策，改变它们对低层控制稳定性的破坏较小。这样模型可以在遇到训练外推理类型时，把 OCR/数学/空间判断显式传递给动作生成。

两阶段训练也服务于“先保留知识，再学会执行”。Stage 1 用 COCO、TextVQA、GQA、机器人场景图文和机器人轨迹混训，让模型同时见到图文问答和动作模仿；论文保持图文数据:机器人数据约 1:3，并用 reasoning phrase 标注机器人数据。Stage 2 冻结 VLM，只训练 action expert，使动作专家学习跟随已经形成的 reasoning，而不继续侵蚀 VLM 知识。

实验设计很直接。Math matching 要机器人读白板手写公式、识别数字卡片并选择答案；toy placement 要机器人识别未见过的物体并执行相对空间放置。开放世界设置中，公式、物体或方向组合不在训练集内。ChatVLA-2 在 math matching 开放世界中 OCR 3.58/4、数学 1.73/2、执行 43/52；toy placement 开放世界中 object recognition 0.94、spatial affordance 0.88、执行 127/156。

与 OpenVLA、DexVLA、π0 等模型相比，ChatVLA-2 的优势不主要来自更强低层控制，而是来自“保留并调用预训练知识”。论文消融显示，去掉动态 MoE 或只用 dense 7B 模型并不能解决开放世界失败；去掉 Stage 2 则会让推理产生但动作不跟随，说明架构和训练流程必须同时存在。

#### 🧪 练习题

```yaml
question: "ChatVLA-2 的第二阶段训练为什么冻结 VLM、只训练 action expert？"
options:
  - "为了删除 VLM 的开放世界知识"
  - "为了让动作专家学习跟随 VLM 产生的推理，同时避免继续破坏预训练能力"
  - "为了把所有机器人动作转换成文本答案"
  - "为了让 MoE router 固定选择同一个专家"
answer: 1
explain: "Stage 2 保持 VLM 推理能力不被机器人数据继续侵蚀，只优化动作专家，使动作更可靠地执行 reasoning tokens 表达的结果。"
```
