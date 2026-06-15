### SE-VLN

```yaml
id: se_vln
name: SE-VLN
full_name: 自进化视觉语言导航 (SE-VLN)
year: '2026'
org: Stanford
paper_url: https://openreview.net/forum?id=SEVLN2026
category: frontier_2026
parent: janusvln
motivation: 分层内存模块实现测试时自我进化
```

#### 📝 一句话总结

SE-VLN 提出一种基于多模态大模型的 training-free 自进化视觉语言导航框架，通过分层记忆、检索增强 CoT 推理和反思模块，把成功与失败轨迹沉淀为可复用经验，使测试阶段的导航能力随经验库增长而提升。

#### 🎯 核心要点

- 三模块框架：Hierarchical Memory、Retrieval-Augmented Thought-Based Reasoning、Reflection
- 短期记忆：verbal topological map 记录已访问节点、视觉观测文本描述、thinking/planning/executing 决策过程
- 长期记忆：experience repository 以向量数据库 Chroma 存储 landmark、scene description、decision process、revised decision
- 经验检索：用 Sentence-BERT 编码当前任务 landmark，从经验库中检索相似经验作为 few-shot prompt
- 多步决策：CoT decider 将每一步拆成 thinking、planning、executing，增强复杂指令下的可解释推理
- 反思自进化：outcome evaluator 用 NE/OSR/SR/SPL 等指标定位失败，experience corrector 修正错误决策并写回经验库
- 实验基准：在 R2R 与 REVERIE 上验证，R2R unseen SR 达 57%，REVERIE unseen SR 达 35.2%

#### 🔬 深入细节

##### 框架示意图

![SE-VLN 工作流](https://arxiv.org/html/2507.13152v1/x1.png)
*图：SE-VLN 由分层记忆、检索增强思维推理和反思模块组成，执行任务后把修正后的经验写回长期经验库。*

##### 核心算法伪代码

```python
# SE-VLN 测试时自进化流程伪代码
experience_db = Chroma()

def run_navigation_task(instruction, simulator):
    landmarks = extract_landmarks(instruction)
    few_shot_exp = retrieve_top_k(experience_db, landmarks, k=2)
    topo_map = VerbalTopologicalMap()
    trajectory = []

    while not simulator.done():
        obs = simulator.observe()
        scene_text = mllm_describe(obs)
        topo_map.update_observation(obs.node_id, scene_text)

        prompt = build_prompt(
            instruction=instruction,
            contextual_memory=topo_map.serialize(),
            few_shot_experience=few_shot_exp,
        )
        decision = cot_decider(prompt)  # thinking -> planning -> executing
        simulator.execute(decision.action)
        topo_map.update_decision(obs.node_id, decision)
        trajectory.append(decision)

    scores = outcome_evaluator(trajectory, simulator.ground_truth)
    revised = experience_corrector(
        scores=scores,
        contextual_memory=topo_map.serialize(),
        trajectory=trajectory,
    )
    experience_db.add(make_experience(landmarks, topo_map, trajectory, revised))
```

##### 方法解释

SE-VLN 关注的是 LLM-powered VLN 的另一个短板：模型虽然有强语言理解能力，但在测试环境中不会真正积累经验。已有方法往往把历史轨迹当作当前任务的静态上下文，任务结束后不会把错误路径、正确纠偏或 landmark 经验转化为可复用知识，因此面对相似路线仍可能重复犯错。

分层记忆模块把记忆拆成短期和长期两层。短期的 verbal topological map 是当前任务内的动态地图：

$$
M_t = \{G_t, D_t, P_t\}
$$

其中 \(G_t\) 是已探索拓扑，\(D_t\) 是各节点的视觉文字描述，\(P_t\) 是每一步 thinking/planning/executing 决策记录。长期的 experience repository 则把任务后反思得到的经验保存为：

$$
e = \langle L, S, A, A' \rangle
$$

其中 \(L\) 是 landmark 特征，\(S\) 是场景描述，\(A\) 是原始决策过程，\(A'\) 是修正后的决策过程。

检索增强推理模块先从指令中抽取 landmark，再用 Sentence-BERT 编码并与经验库条目计算余弦相似度：

$$
\mathrm{sim}(q, e_i) = \frac{q^\top e_i}{\|q\|\|e_i\|}
$$

论文发现 2-shot 相似经验效果最好，5-shot 反而可能降低性能，因为过多经验会占用上下文窗口并引入重复噪声。

> 💡 关键：SE-VLN 的“自进化”不是在线更新模型权重，而是通过任务后反思持续扩充经验库，让后续 prompt 检索到更有用的导航策略。

反思模块由 outcome evaluator 和 experience corrector 组成。Evaluator 基于 Matterport3D 中的真实路径计算 NE、OSR、SR、SPL 等指标，定位路径中第一处不合理决策；Corrector 再调用 MLLM 结合拓扑记忆分析错误原因，生成修正决策并写回经验库。在真实场景中，论文也指出可用人工交互反馈替代模拟器 ground truth。

与 JanusVLN 偏神经记忆不同，SE-VLN 更偏符号化经验记忆：它不缓存视觉 KV，而是把“我在某类 landmark 附近如何选择路径、哪里走错了、应该如何纠正”转成文本经验。优势是 training-free、可解释、易于跨任务复用；局限是依赖 MLLM 反思质量和文本化场景描述的完备性。

#### 🧪 练习题

```yaml
question: "SE-VLN 中 experience corrector 的主要作用是什么？"
options:
  - "把图像压缩为低维视觉 token"
  - "根据任务评估结果和拓扑记忆找出不合理决策，生成修正经验并写回经验库"
  - "替代导航环境执行机器人动作"
  - "随机增加更多历史经验以扩大 prompt"
answer: 1
explain: "Experience corrector 是反思模块的核心，它利用评估指标定位错误并生成 corrected decision process，使经验库能随任务执行持续进化。"
```
