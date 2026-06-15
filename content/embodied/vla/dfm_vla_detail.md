### DFM-VLA：离散流匹配 VLA

```yaml
id: dfm_vla
name: DFM-VLA
full_name: 离散流匹配VLA (DFM-VLA)
year: "2026.03"
org: arXiv
paper_url: https://arxiv.org/abs/2603.26320
category: diffusion_flow
parent: pi0
motivation: 迭代细化动作Token解决轨迹不稳定
```

#### 📝 一句话总结

DFM-VLA 将离散流匹配引入 VLA 动作 token 生成，用 token 级概率速度场反复修正整段动作序列，解决自回归和离散扩散 VLA 中早期错误 token 难以回退的问题。它在统一离散视觉-语言-动作表示上结合 embedding-guided velocity、velocity head 与两阶段解码，在 CALVIN、LIBERO 和真实双臂任务上提升动作稳定性。

#### 🎯 核心要点

- 提出 irreversible commitment 问题：自回归 VLA 逐 token 固化，离散扩散 VLA 往往只更新 mask/低置信位置，早期错误会传播到整段动作。
- 统一离散 token 化：文本使用 Emu3 tokenizer，第三视角和腕部图像用 VQ tokenizer，每张图像压缩为 \(25 \times 25\) tokens，动作使用 FAST 加 BPE，动作词表大小为 1024。
- 只对动作模态加噪和预测：语言、图像和 proprioception 作为上下文，noised action tokens \(x_t\) 作为待精炼状态。
- token 级概率速度场：把动作生成建模为连续时间马尔可夫链（CTMC）上的离散状态迁移，而非一次性输出最终动作。
- 两种速度场构造：auxiliary velocity head 直接预测 replacement rates；action-embedding-guided formulation 用动作 token embedding 距离定义概率路径和 kinetic-optimal velocities。
- 两阶段解码：先用 CTMC Euler 步做 stochastic iterative refinement，再用 deterministic validation/argmax 稳定收敛。
- 实验结果：DFM-VLA+Embed 在 CALVIN 上达到 4.44 average success length，在 LIBERO 上达到 95.7% 平均成功率，真实 AgileX 双臂任务平均 70.8%。

#### 🔬 深入细节

![DFM-VLA 总体架构](https://chris1220313648.github.io/DFM-VLA/assets/figure/model.png)
*图：DFM-VLA 在语言、图像和 noised action tokens 条件下预测 clean action tokens，并通过交叉熵或 velocity head 学习速度场。*

离散 VLA 的吸引力在于它能把机器人动作接入大语言/视觉语言模型的 token 训练范式，但解码方式会带来新的控制风险。自回归模型按左到右生成动作 token，前面的错 token 一旦输出，后续 token 只能在错误上下文上继续生成；离散扩散模型虽然并行，但很多实现依赖 mask 或置信度释放，已经确定的位置也很难被重新审视。机器人控制要求整段动作轨迹协调一致，所以这种 irreversible commitment 会表现为轨迹抖动、长时任务失败和低数据场景下的错误放大。

DFM-VLA 的核心改写是：动作序列不是一步从噪声变成答案，而是沿着离散概率路径逐步流向真实动作分布。对离散变量 \(x=(x^1,\dots,x^D)\)，DFM 定义从源分布到目标数据分布的时间路径 \(p_t(x)\)。一个常见混合路径可以写成：

$$
p_t(x^i \mid x_1^i)
= (1-\kappa_t)\,p(x^i) + \kappa_t\,\delta_{x_1^i}(x^i),
\quad \kappa_0=0,\ \kappa_1=1
$$

这里 \(x_1\) 是 clean action token sequence，\(x_t\) 是中间噪声状态。模型要学习的不是单个 next token，而是从 \(x_t\) 到 \(x_1\) 的迁移方向。CTMC 视角下，每个 token 的下一状态由速度场 \(u_t\) 决定：

$$
x_{t+h}^i \sim \delta_{x_t^i}(\cdot) + h\,u_t^i(\cdot \mid x_t^i, x_1^i)
$$

```python
# DFM-VLA 两阶段推理伪代码
def dfm_vla_decode(context, steps_fine=14, steps_val=2):
    x_t = sample_uniform_action_tokens()
    total = steps_fine + steps_val

    for k in range(total):
        t = k / total
        logits = transformer(context, noised_action_tokens=x_t)
        x1_pred = sample_or_argmax_clean_actions(logits)

        if k < steps_fine:
            velocity = build_velocity_field(x_t, x1_pred, mode="embedding_guided")
            x_t = ctmc_euler_update(x_t, velocity, step_size=1 / total)
        else:
            x_t = argmax_clean_actions(logits)

    return decode_fast_bpe_actions(x_t)
```

第一种速度场构造是 velocity head。backbone 先从上下文和 noised action tokens 产生隐藏状态，再由额外 head 输出 replacement velocity：

$$
h_t=f_\theta(x_t,l),\quad
u_t^\theta(\cdot \mid x_t)=u^{\mathrm{head}}_t(h_t)
$$

它的优点是显式预测跳转速率，和 EditFlow 中的编辑操作思想接近；DFM-VLA 因为动作块长度固定，只保留 replacement，而不需要 insertion/deletion。损失只在当前 token 与目标 token 不一致的位置施加更新压力，直觉上就是“哪里还没变对，就在那里学习往哪里跳”。

第二种是论文主推的 action-embedding-guided velocity。它不让一个额外 head 从零学所有速率，而是利用动作 token embedding 空间的距离 \(d(\cdot,\cdot)\) 定义概率路径：

$$
p_t(x^i \mid x_1^i)
= \mathrm{softmax}\left(-\beta_t d(x^i,x_1^i)\right),
\quad
\beta_t = c\left(\frac{t}{1-t}\right)^\alpha
$$

当 \(t\) 接近 0 时，分布较平；当 \(t\) 接近 1 时，概率质量集中到目标 token 附近。论文进一步用 kinetic-optimal velocity 让概率质量只朝更接近目标 token 的方向流动，因此它比单纯类别交叉熵更强调动作 token 的几何邻近关系。训练时模型预测 clean action tokens，并最小化：

$$
\mathcal{L}_{\mathrm{ce}}
= \mathbb{E}_{t,x_1,x_t}\left[-\log p^\theta_{1\mid t}(x_1 \mid x_t,l)\right]
$$

![DFM-VLA 单步精炼过程](https://chris1220313648.github.io/DFM-VLA/assets/figure/inference_one_step.png)
*图：单个去噪步中，模型先预测最终动作，再由速度场决定哪些 token 跳转到下一状态。*

两阶段解码解决的是“探索与锁定”的平衡。若全程随机 CTMC refine，最后可能仍有局部波动；若过早 argmax，又会回到不可逆承诺。论文在固定 16 个总步数下发现 \(T_{\mathrm{fine}}=14, T_{\mathrm{val}}=2\) 最优：大部分预算用于反复修正全序列，最后少量步数把高置信动作确定下来。

DFM-VLA 的效率也来自离散统一表示。视觉、语言、proprioception 和动作 token 同处一个双向 Transformer，上下文 token 在去噪迭代中基本不变，因此可以缓存其 KV；动作 token 的缓存按变化程度自适应更新。论文报告 adaptive KV caching 将 DFM 推理速度从约 60.2 提升到 121.0，同时 CALVIN 平均长度基本保持（4.42 到 4.40），说明迭代 refine 并不必然意味着高延迟。

> 💡 关键：DFM-VLA 不是把连续扩散头外挂到 VLM 上，而是在离散 action token 空间里学习“怎样把整段动作一起修正”的速度场；这使它能保留 token 化 VLA 的统一建模优势，同时缓解早期错误不可回退的问题。

#### 🧪 练习题

```yaml
question: "DFM-VLA 两阶段解码中，为什么需要在 iterative refinement 后加入 deterministic validation？"
options:
  - "为了让视觉 token 重新经过 tokenizer"
  - "为了在充分修正后用确定性更新稳定最终动作，避免末端随机波动"
  - "为了把离散动作重新训练成连续扩散动作"
  - "为了删除语言指令，只保留机器人 proprioception"
answer: 1
explain: "前一阶段用 CTMC Euler 步反复修正整段动作，后一阶段用 argmax/确定性验证锁定高置信 token；过早确定会降低修正能力，但完全随机 refine 也会影响收敛稳定性。"
```
