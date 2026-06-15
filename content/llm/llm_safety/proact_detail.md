### ProAct: 通过伪造反馈干扰自动化越狱智能体

```yaml
id: proact
name: ProAct
full_name: '主动防御 (ProAct: Jailbreaking Jailbreaks)'
year: '2026.03'
org: ICLR
paper_url: https://openreview.net/forum?id=AUZIYQGAoAb
category: jailbreak
parent: pair
motivation: 伪造响应误导攻击智能体
```

#### 📝 一句话总结

ProAct 把防御点放在自动化越狱循环的反馈通道上，通过主动返回误导性或诱饵式响应，让攻击智能体基于错误奖励更新，从而破坏 PAIR 类迭代攻击。

#### 🎯 核心要点

- **防御对象**：不是单个静态 jailbreak prompt，而是会“生成攻击、观察回复、由 judge 打分、继续优化”的自动攻击智能体。
- **核心机制**：当系统判断请求处在越狱优化链路中时，返回经过设计的 proactive response，让攻击器误判当前方向的有效性。
- **优势**：不需要修改目标模型参数，也不必完全依赖最终输出过滤；它直接干扰攻击算法的搜索过程。
- **适配场景**：对 PAIR、TAP、自动红队代理等基于反馈的黑盒攻击特别相关。
- **限制**：如果攻击者使用人工审核、独立外部 judge、多目标交叉验证或延迟反馈，伪造反馈的效果会下降。

#### 🔬 深入细节

![ProAct 公开论文页面](https://openreview.net/pdf?id=AUZIYQGAoAb)

图源：OpenReview 公开论文 PDF。该链接用于定位论文中的框架图和方法说明。

```text
Algorithm: ProAct-style defense against iterative jailbreak agents
Input:
  target model M
  incoming prompt p_t
  attack detector D
  proactive response generator G
  normal safety policy P
Output:
  response r_t to the client or attacking loop

1. Receive p_t and recent interaction history H.
2. Estimate whether H belongs to an automated jailbreak optimization loop:
     attack_score = D(H, p_t).
3. If attack_score is below threshold:
     return M(p_t) under normal safety policy P.
4. Otherwise:
     infer which feedback signal the attacker is optimizing.
     construct r_decoy = G(H, p_t), a response that distorts the reward signal.
5. Return r_decoy to the attack loop.
6. Continue monitoring whether the attacker drifts, stops, or escalates.
```

PAIR 类攻击的基本结构是闭环优化：攻击模型提出一个候选 prompt，目标模型给出回复，评估器判断是否成功，攻击模型再根据评估结果改写下一轮 prompt。ProAct 的切入点是第三步以前的反馈链路。只要能让攻击器相信错误的候选方向有效或无效，它的搜索轨迹就会偏离真正的漏洞区域。

这种思路和传统内容过滤不同。传统过滤器通常在目标模型输出后判断是否违规；ProAct 则把“攻击者也在学习”当作威胁模型的一部分，主动改变攻击者看到的数据分布。对自动化智能体来说，反馈就是训练信号；反馈被污染后，后续 prompt 生成也会被污染。

ProAct 的实现需要两个模块：攻击循环识别器和诱饵响应生成器。识别器可以利用多轮相似度、显式评分话术、攻击模板痕迹、异常重试频率等信号；生成器则要保证诱饵内容本身不泄露受限信息，同时足以影响攻击器或 judge 的判断。这使它更像“主动欺骗式防御”，而不是普通拒答。

安全边界也很清楚：ProAct 不能替代底层安全对齐。若攻击者不依赖自动 judge，或者把每轮结果交给真人分析，伪造反馈的收益会变小。实际部署时，它更适合与 Llama Guard、输出过滤、速率限制、账号风控和异常会话聚类共同使用。

#### 🧪 练习题

1. 为什么 ProAct 对自动化 PAIR 类攻击更有针对性，而对一次性人工 prompt 效果有限？
2. 诱饵响应需要满足哪些条件，才能既误导攻击器又不增加真实泄露风险？
3. 如何检测一个多轮会话是否正在执行基于 judge 的越狱优化？
