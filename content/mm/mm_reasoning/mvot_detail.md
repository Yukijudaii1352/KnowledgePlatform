### MVoT — 多模态可视化思维 (Multimodal Visualization-of-Thought)

```yaml
id: mvot
name: MVoT
full_name: "多模态可视化思维 (Multimodal Visualization-of-Thought)"
year: "2025.01"
org: "PKU"
paper_url: "https://arxiv.org/abs/2501.07542"
category: frontier_2026
parent: "visual_cot"
motivation: "生成图像想象推理过程，空间推理优势"
```

#### 📝 一句话总结

MVoT 提出让多模态模型在空间推理过程中交错生成文字思考和图像化中间状态，并用 token discrepancy loss 提升视觉思维图的质量，解决纯文本 CoT 在复杂空间变化中容易坐标描述错误、难以保持视觉状态的问题。

#### 🎯 核心要点

- 将 CoT 扩展为 Multimodal Visualization-of-Thought：每一步既有 verbal thought，也有 visual thought
- 使用能生成交错文本和图像的自回归 MLLM，让模型边推理边“画出”中间状态
- 采用 Anole-7B/Chameleon 式统一离散 token 架构，文本 token 和图像 token 串接进同一个 causal Transformer
- 引入 token discrepancy loss，在视觉 embedding 空间惩罚偏离 ground-truth image token 的预测，改善生成图像一致性
- 在 Maze、MiniBehavior、FrozenLake 三类动态空间推理任务上构造交错文本-图像训练数据
- 与 Direct、纯文本 CoT、普通 interleaved training 对比，强调 MVoT 在更复杂空间环境下的鲁棒性

#### 🔬 深入细节

##### 核心示意图

![MVoT 推理范式](https://arxiv.org/html/2501.07542v1/x1.png)
*图：MVoT 在推理轨迹中交错生成文字步骤和可视化图像状态，让后续推理条件化于此前的视觉思维。*

![Token discrepancy loss](https://arxiv.org/html/2501.07542v1/x3.png)
*图：MVoT 在自回归 MLLM 训练中加入 token discrepancy loss，缓解文本 tokenizer 与图像 tokenizer 表征差异带来的视觉生成质量问题。*

##### 算法伪代码

```python
# MVoT autoregressive reasoning
def mvot_reason(input_image, question, model):
    context = [encode_image(input_image), encode_text(question)]
    thoughts = []

    while not should_answer(context):
        verbal = model.generate_text(context, tag="verbal_thought")
        context.append(encode_text(verbal))

        visual_tokens = model.generate_image_tokens(context, tag="visual_thought")
        visual = decode_image(visual_tokens)
        context.append(visual_tokens)

        thoughts.append((verbal, visual))

    answer = model.generate_text(context, tag="final_answer")
    return answer, thoughts

def mvot_training_loss(logits, labels, visual_token_positions, codebook):
    ce = cross_entropy(logits, labels)
    discrepancy = token_discrepancy_loss(
        logits[visual_token_positions],
        labels[visual_token_positions],
        codebook
    )
    return ce + discrepancy
```

##### 动机与背景

纯文本 CoT 对数学和语言推理很有效，但空间任务经常需要维护动态视觉状态：人在迷宫中走到哪里、物体是否被拿起、FrozenLake 的洞和目标位置如何变化。把这些状态全部翻译成坐标文本既冗长又脆弱，一旦文本描述中某个坐标错了，后续推理会持续偏离。

MVoT 的核心观点是：人类不只用语言思考，也会在脑中形成图像。对于空间推理，模型如果能生成中间图像状态，就可以把“当前我认为世界是什么样”显式保留下来，并让后续步骤直接基于这个视觉状态继续推理。

##### 交错多模态推理形式

给定输入 \(X\)，普通 CoT 生成文本中间步骤：

$$
z_i \sim p_{\theta}(z_i \mid X, z_{<i})
$$

MVoT 为每个文本步骤增加图像可视化 \(v_i\)，后续步骤同时依赖文本和视觉历史：

$$
(z_i, v_i) \sim p_{\theta}(z_i, v_i \mid X, z_{<i}, v_{<i})
$$

最终答案基于完整的交错轨迹：

$$
a \sim p_{\theta}(a \mid X, z_{1:n}, v_{1:n})
$$

这使模型可以把环境变化画出来，而不是只在文本中描述。

##### 自回归 MLLM 与 token discrepancy loss

MVoT 使用统一 Transformer 处理图像和文本 token。图像 tokenizer 将图像映射为离散 codebook index，文本 tokenizer 生成普通语言 token，二者拼接后由 causal Transformer 预测下一 token。训练时，文本和图像 token 都参与交叉熵损失。

问题在于图像 token 的 codebook 有视觉几何结构，而普通交叉熵只把所有错误 token 同等看待。Token discrepancy loss 进一步在视觉 embedding 空间度量预测分布与真实 token 的距离，使模型更少把概率分配给视觉上差异很大的 token：

$$
\mathcal{L}=\mathcal{L}_{\text{CE}}+\lambda \mathcal{L}_{\text{TD}}
$$

其中 \(\mathcal{L}_{\text{TD}}\) 根据 codebook embedding 间距离加权惩罚视觉 token 预测偏差。直觉上，颜色或位置相近的错误比完全无关的错误更可接受，该损失让模型学习这种视觉相似性。

##### 训练与任务设计

论文构造三类受控动态空间推理任务。Maze 要根据初始迷宫和动作序列预测最终位置；MiniBehavior 扩展到 embodied 场景，需要判断打印机、桌子和 agent 的交互结果；FrozenLake 包含更复杂图案和洞，需要判断动作序列是否安全到达目标。

训练数据被组织成交错文本-图像对：模型先生成一步文字说明，再生成对应环境状态图。实验使用 Anole-7B 作为 backbone，并通过 LoRA 做指令微调。与普通 interleaved training 不同，MVoT 对文字和图像预测都计算损失，而不是只监督文本 token。

> 💡 关键：MVoT 的“图像思维”不是展示给人看的附属解释，而是下一步推理的条件；图像质量越可靠，后续空间推理越稳定。

##### 与 Visual CoT / Image-of-Thought 的区别

Visual CoT 和 Image-of-Thought 主要从输入图像中定位、裁剪或提取视觉证据；MVoT 更进一步，让模型生成新的中间图像状态，表达“经过这一步操作后世界应变成什么样”。因此它特别适合空间状态会随动作更新的任务，而不只是静态图像问答。

#### 🧪 练习题

```yaml
question: "MVoT 中 token discrepancy loss 的主要作用是什么？"
options:
  - "让模型只生成文本，不再生成图像"
  - "在视觉 embedding 空间约束图像 token 预测，提升生成视觉思维的连贯性和保真度"
  - "把所有动作转换为 one-hot 文本标签"
  - "降低输入图像分辨率以节省显存"
answer: 1
explain: "普通交叉熵忽略图像 codebook 的视觉相似性；token discrepancy loss 根据视觉 embedding 距离惩罚偏离真实图像 token 的预测。"
```
