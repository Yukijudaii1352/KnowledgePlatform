### AttriGuard: Causal Attribution Guard for LLM Agents

```yaml
id: attriguard
name: AttriGuard
full_name: 因果归因护栏 (Causal Attribution Guard)
year: '2026.03'
org: arXiv
paper_url: https://arxiv.org/abs/2603.10749
category: content_safety
parent: llama_guard3
motivation: 因果归因防御提示注入
```

#### 📝 一句话总结

AttriGuard 将间接提示注入防御从“识别输入里有什么恶意文本”转为“判断工具调用为什么发生”，通过并行反事实重放和模糊存活测试拦截由不可信观察驱动的工具调用。

#### 🎯 核心要点

- 提出 action-level causal attribution，把每个 tool call 归因到 user intent 或 untrusted observations
- 定义 control effect：不可信观察对某个候选工具调用概率的 log shift
- 定义 control potency：原始观察与控制受限观察下工具调用分布的 KL 差异
- Runtime 防御，不需要训练目标模型，也不依赖白盒 attention/activation
- Teacher-forced shadow replay 固定历史 action，只替换被削弱控制力的 observations
- Hierarchical control attenuation 包含 structural flattening、perspective rewriting、causal scaffolding weakening
- Fuzzy survival criterion 先比函数名，再比 canonicalized arguments，必要时用辅助 LLM judge
- 在 AgentDojo/Agent Security Bench 上报告静态攻击 0% ASR，并保持较小 benign utility 损失

#### 🔬 深入细节

##### 示意图/图源

![AttriGuard pipeline 图源：arXiv PDF 中 Figure 1 展示 injected vs benign observations 下的 original run 与 shadow run](https://arxiv.org/pdf/2603.10749)
*图源：arXiv PDF。源文件中对应 `pdfs/attriguard_pipeline.pdf`，说明左侧 IPI 场景下恶意 call 在 shadow replay 中不存活，右侧 benign 场景下 save-to-pad call 正常存活。*

##### 算法/流程伪代码

```python
# AttriGuard-defended workflow
def run_attriguard(user_task, base_agent, attenuation_level):
    H = History(task=user_task, actions=[], observations=[])
    attenuated_obs_cache = []

    while True:
        response, proposed_calls = base_agent(H)
        if not proposed_calls:
            return response

        # Build control-attenuated shadow context incrementally
        last_obs = H.observations[-1] if H.observations else []
        attenuated_last = hier_attenuate(last_obs, attenuation_level)
        attenuated_obs_cache.append(attenuated_last)
        H_shadow = History(
            task=user_task,
            actions=H.actions,                 # teacher-forced original actions
            observations=attenuated_obs_cache,  # control-attenuated observations
        )

        _, shadow_calls = base_agent(H_shadow)

        for call in proposed_calls:
            if fuzzy_survive(call, shadow_calls, user_task):
                obs = execute(call)
            else:
                obs = reject_as_ipi(call, warning="focus on the user task")
            H.append(call, obs)
```

##### 方法解读

AttriGuard 的核心批评是：多数 IPI 防御把问题当作 input-level semantic discrimination，即判断外部文本是否像注入攻击。但真实 agent 失效发生在 action 层：模型调用了不该调用的工具，或者用敏感参数调用工具。攻击者可以不用“ignore previous instructions”这类模板，而把恶意指令伪装成工作流、政策说明或数据字段，从而绕过模式检测。

论文定义 action-level causal attribution：给定步骤 \(t\) 的上下文 \(H_t=(T_u,A_{1:t-1},O_{1:t-1})\) 和候选工具调用 \(c\)，判断 \(c\) 是 intent-supported 还是 observation-driven。前者由用户任务 \(T_u\) 和历史执行合理支持，后者需要不可信观察流提供额外控制力才会出现。

理想量是 control effect：

$$
\mathrm{CE}_t(c)=\log p_t(c)-\log p_t^{(0)}(c)
$$

其中 \(p_t(c)\) 是原始上下文下工具调用出现概率，\(p_t^{(0)}(c)\) 是控制受限观察上下文下的概率。若衰减外部观察控制力后 \(c\) 消失，说明它很可能由不可信观察驱动。由于黑盒 API 不暴露概率，AttriGuard 用“shadow replay 下是否还会产生等价 call”近似这个对比。

Hierarchical control attenuation 是构造反事实观察的关键。它不是删除所有外部内容，因为 agent 仍需要外部数据中的事实和参数；它削弱更像“控制通道”的表达。Level 1 structural flattening 把 JSON/function-like 结构改写为自然语言描述；Level 2 perspective rewriting 把第二人称指令改成第三人称陈述；Level 3 causal scaffolding weakening 弱化“因为...所以必须...”这类说服性因果脚手架。

Teacher-forced shadow replay 避免 shadow branch 自由运行导致轨迹发散。AttriGuard 在 shadow context 中复用原始 action history，只替换 observation history 为 attenuated view。这样 \(C_t\) 与 \(\widehat{C}_t\) 的差异更可能来自观察控制力变化，而不是 agent 在前几步规划上的自然随机差异。

最后的 FuzzySurvive 解决“完全字符串一致太严格”的问题。先要求 function name 匹配；若参数 canonicalize 后完全一致则通过；若函数名相同但参数略有不同，则让辅助 LLM judge 基于用户任务、proposed call 和 shadow alternatives 判断该调用是否仍与完成用户任务一致。由此， benign 的格式扰动不会被误杀，但目的地、金额、收件人等关键恶意参数变化仍会被拦截。

#### 🧪 练习题

```yaml
question: "AttriGuard 判断某个工具调用可疑的核心信号是什么？"
options:
  - "外部文本是否包含固定 jailbreak 模板"
  - "该工具调用在控制衰减后的 shadow replay 中是否仍然存活"
  - "模型输出是否包含英文"
  - "工具调用参数数量是否超过 3 个"
answer: 1
explain: "AttriGuard 关注 action-level causal attribution：若衰减不可信观察的控制力后调用消失，说明该调用更可能由注入内容驱动，而非用户意图支持。"
```
