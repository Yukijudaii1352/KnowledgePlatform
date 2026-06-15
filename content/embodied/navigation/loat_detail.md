### LOAT — LLM 增强的物体亲和力迁移 (LLM-enhanced Object Affinities Transfer)

```yaml
id: "loat"
name: "LOAT"
full_name: "LLM开放词汇目标导航 (LLM Open-vocabulary Object Navigation)"
year: "2025"
org: "arXiv"
paper_url: "https://arxiv.org/abs/2501.loat"
category: "object_navigation"
parent: "cow"
motivation: "LLM常识推理目标搜索先验"
```

#### 📝 一句话总结

LOAT 将 LLM 提供的通用物体常识与训练环境中学到的经验性物体亲和力动态融合，用亲和力权重激活语义地图或拓扑图，从而提升 ObjectNav 在新环境和未见目标上的搜索效率。

#### 🎯 核心要点

- **双亲和力来源**：Generalized Affinities Module 使用 LLM 判断目标与场景物体的语义相关性，Experiential Affinities Module 从训练经验中学习对象关系。
- **动态融合模块**：根据时间上下文、RNN 隐状态或历史轨迹调整两类亲和力的权重，而不是固定相信 LLM 或训练经验。
- **文本嵌入解耦目标表示**：用预训练文本嵌入表示目标与场景类别，避免只依赖固定 one-hot 类别节点。
- **语义地图激活**：在 metric map 中按语义通道加权，在 topological graph 中按节点内物体亲和力加权。
- **低查询成本**：LLM 常识可以在 episode 开始或离线预存，不需要每个导航步都调用大模型。
- **跨策略集成**：论文将 LOAT 接入 Habitat ObjectNav、ALFRED/FILM/Prompter 与 AI2-THOR 图导航策略，显示一致增益。

#### 🔬 深入细节

##### 框架图

![LOAT 详细框架图](https://arxiv.org/html/2403.09971v2/x2.png)
*图：LOAT 由经验亲和力、LLM 通用亲和力与动态融合模块组成，输出的 affinity score 用于激活下游语义地图或图节点。清单中的 `paper_url` 为占位符，实际公开论文为 arXiv:2403.09971。*

##### 算法伪代码

```python
# LOAT: object affinities transfer for ObjectNav
object_names = semantic_map.visible_or_known_categories()
target = goal_category

# 1. 经验亲和力：从训练经验学习 query-key attention
target_emb = text_encoder(target)
obj_embs = [text_encoder(o) for o in object_names]
q = W_q @ target_emb
keys = [W_k @ e for e in obj_embs]
exp_aff = softmax([dot(q, k) / sqrt(d) for k in keys])

# 2. 通用亲和力：LLM 离线/episode 初始判断哪些对象与目标相关
binary_rel = [LLM_related(target, o) for o in object_names]
gen_aff = normalize(binary_rel)

# 3. 动态融合：根据当前上下文调节两种来源
alpha = fusion_net(history_state, explored_map, optional_env_context)
aff = alpha * gen_aff + (1 - alpha) * exp_aff

# 4. 接入下游策略
if policy_uses_metric_map:
    activated_map = semantic_map * channel_weights(aff)
    action = metric_policy(activated_map, target_emb)
else:
    graph = activate_nodes(scene_graph, aff)
    action = graph_policy(graph)
execute(action)
```

##### 方法拆解

ObjectNav 中“杯子可能在桌上或橱柜里”“毛巾可能在浴室架子上”这类对象关系非常关键。早期语义图或关系网络能从训练环境里学到这些亲和力，但会受数据分布约束：如果训练集中垃圾桶经常靠近布料，模型就可能在新房间找 cloth 时错误关注 garbage can。直接让 LLM 每一步规划又成本高，且 LLM 对具体房屋布局没有训练经验。LOAT 的设计目标就是把两者结合：训练经验提供场景特定偏好，LLM 提供更泛化的常识约束。

Experiential Affinities Module 把目标类别作为 query，把地图中的对象类别作为 key，用缩放点积注意力建模训练经验中的对象关系：

$$a_i^{E}=\operatorname{softmax}_i\left(\frac{(W_q e_t)^\top(W_k e_i)}{\sqrt{d}}\right)$$

其中 \(e_t\) 是目标文本嵌入，\(e_i\) 是第 \(i\) 个场景对象文本嵌入。这个模块可学习，能捕获训练集中的常见同现、邻近和导航可达性模式。

Generalized Affinities Module 则不要求 LLM 输出精确数值分数，而是让 LLM 给出二值相关判断，再归一化成注意力权重：

$$a_i^{G}=\frac{\mathbb{1}[\text{LLM says } o_i \text{ is related to } t]}{\sum_j \mathbb{1}[\text{related}(o_j,t)]}$$

二值化的好处是稳定。论文指出 LLM 对“给每个物体打 0-10 分”这类提示可能受措辞影响较大，但判断哪些对象语义相关相对可靠。

Dynamic Fusion Module 负责在 \(a^E\) 与 \(a^G\) 之间调权：

$$a_i = \alpha_t a_i^G + (1-\alpha_t)a_i^E$$

\(\alpha_t\) 由当前时间上下文、RNN hidden state、历史轨迹、探索区域等信息决定。直觉上，环境越陌生、目标越少见、训练经验越不可靠，就应提高 LLM 常识权重；在熟悉分布中，经验亲和力可以提供更细粒度的导航偏好。

融合后的亲和力不直接输出动作，而是作为下游策略的输入增强。在 metric semantic map 中，LOAT 对每个语义通道做 channel-wise activation；在 topological graph 中，则对节点内对象的亲和力求平均后激活节点表示。这样 LOAT 可以接入已有 map-based 或 graph-based 导航策略，而不是重写整个导航系统。

与 CoW 相比，LOAT 更强调“在哪里更可能找到目标”的常识先验，而不只是“当前图像里是否看见目标”。与 SayCan/LLM-Planner 相比，它不让 LLM 逐步生成动作计划，而是把 LLM 压缩成可缓存的对象关系权重，因此更适合高频闭环导航。

> 💡 关键：LOAT 的本质是语义注意力迁移层。它把 LLM 常识与训练经验变成 map/graph 上的可微或可插拔权重，使原有 ObjectNav 策略更关注与目标相关的场景证据。

#### 🧪 练习题

```yaml
question: "LOAT 为什么不直接让 LLM 每一步输出导航动作？"
options:
  - "因为 LLM 无法处理任何自然语言目标"
  - "因为逐步调用成本高且缺少场景经验，LOAT 更适合把 LLM 常识缓存成对象亲和力"
  - "因为 ObjectNav 不需要语义推理"
  - "因为下游策略不能读取语义地图"
answer: 1
explain: "LOAT 的目标是低成本增强已有导航策略。它将 LLM 常识转为对象亲和力，并与经验亲和力融合，而不是在每个控制步调用 LLM。"
```
