### 3N-MCTS — 三网络蒙特卡洛树搜索

```yaml
id: 3n_mcts
name: 3N-MCTS
full_name: 三网络蒙特卡洛树搜索 (3N-MCTS)
year: '2018'
org: University of Münster
paper_url: https://www.nature.com/articles/nature25978
category: retrosynthesis
parent: —
motivation: 结合MCTS与三神经网络，解决组合爆炸问题
```

#### 📝 一句话总结

3N-MCTS 将逆合成规划形式化为单智能体树搜索问题，用扩展策略网络、in-scope 过滤网络和 rollout 策略网络共同引导 Monte Carlo Tree Search，在巨大的反应规则空间中快速找到可购买砌块。它把符号反应规则的可执行性与神经网络的模式识别能力结合起来，显著缓解了传统启发式搜索的组合爆炸。

#### 🎯 核心要点

- 逆合成状态 \(s\) 定义为一组待合成分子；动作 \(a\) 是对其中一个分子应用一条逆反应 transformation rule
- 从 Reaxys 的 1,240 万单步反应自动抽取规则：rollout 规则约 17,134 条，expansion 规则约 301,671 条
- 三个神经网络协同：扩展策略网络负责提出 top transformations；in-scope 网络判断候选反应是否化学可行；rollout 策略网络用于模拟到终局
- MCTS 四阶段：selection 选择最紧急节点，expansion 展开候选前体，rollout 模拟是否能到达砌块，update 回传路线价值
- 树策略把累计价值 \(Q\)、访问次数 \(N\) 和扩展策略先验 \(P\) 结合，优先探索高概率且访问不足的路线
- 构建块集合包含商业可得分子和历史常见反应物；状态中所有分子都属于构建块时视为 solved
- 时间切分评估：训练只用 2015 年前反应，测试用 2014 年后首次报道目标，减少信息泄漏
- Nature 论文报告该方法相对传统启发式 BFS 解决更多目标且速度约快 30 倍，化学家盲测中难以区分文献路线和算法路线

#### 🔬 深入细节

![3N-MCTS 搜索与扩展流程](https://ar5iv.labs.arxiv.org/html/1708.04202/assets/x2.png)
*图：3N-MCTS 的四阶段搜索流程和扩展过程。扩展策略网络先给出高概率 transformation，符号规则生成候选前体，再由 in-scope filter 删除不太可能发生的反应。*

##### 算法伪代码

```python
# 3N-MCTS retrosynthesis planning
def plan(target, building_blocks, budget):
    root = State(molecules={target})
    tree = SearchTree(root)

    for _ in range(budget):
        path = []
        s = root

        # 1. Selection: descend by policy-guided UCB
        while tree.is_expanded(s) and not terminal(s, building_blocks):
            a = argmax(
                actions(s),
                key=lambda a: Q[s, a] / max(1, N[s, a])
                              + c * P[s, a] * sqrt(parent_visits(s))
                                / (1 + N[s, a])
            )
            path.append((s, a))
            s = transition(s, a)

        # 2. Expansion: propose top transformations and filter by feasibility
        if not terminal(s, building_blocks):
            candidates = []
            for mol in unsolved_molecules(s, building_blocks):
                top_rules = expansion_policy.top_k(mol, k=50)
                for rule in top_rules:
                    rxn = apply_retro_rule(rule, mol)
                    if in_scope_filter.predict(rxn) > threshold:
                        candidates.append((rule, rxn.precursors))
            tree.add_children(s, candidates)

        # 3. Rollout: simulate with rollout policy until solved or depth limit
        value = rollout_policy_simulation(s, building_blocks, max_depth=25)

        # 4. Update: backpropagate rollout result
        for s_prev, a_prev in path:
            N[s_prev, a_prev] += 1
            Q[s_prev, a_prev] += value

        if tree.has_solved_route():
            return tree.best_solved_route()
    return None
```

##### 关键公式

MCTS 选择阶段使用带策略先验的树策略。每条边 \((s,a)\) 存储动作价值 \(Q(s,a)\)、访问次数 \(N(s,a)\) 和扩展策略网络给出的先验概率 \(P(s,a)\)：

$$
a_t=\underset{a\in\mathcal{A}(s_t)}{\arg\max}
\left(
\frac{Q(s_t,a)}{N(s_t,a)}
+ cP(s_t,a)\frac{\sqrt{N(s_{t-1},a_{t-1})}}{1+N(s_t,a)}
\right)
$$

第一项是 exploitation：已知平均回报高的路线更值得继续；第二项是 exploration：策略网络认为合理但访问次数少的 transformation 会被优先尝试。访问越多，探索奖励越小。

策略网络训练可抽象为对真实 reaction rule 的多分类交叉熵：

$$
\mathcal{L}_{\text{policy}}
=-\sum_{r\in\mathcal{R}} y_r\log p_\theta(r\mid m)
$$

其中 \(m\) 是目标分子指纹，\(r\) 是抽取出的逆反应规则。in-scope filter 是二分类器，用于估计候选反应是否在适用范围内：

$$
\mathcal{L}_{\text{scope}}
= -y\log \hat y -(1-y)\log(1-\hat y)
$$

rollout 得到的成功/失败回报沿路径回传：

$$
N(s,a)\leftarrow N(s,a)+1,\quad
Q(s,a)\leftarrow Q(s,a)+R
$$

其中 \(R\) 可以包含是否到达构建块、路线长度和策略先验置信度等因素。

##### 方法机制解释

逆合成规划天然是树搜索：目标分子位于根节点，每一步把一个分子拆成更简单的前体，直到所有叶子都是可购买或已知可得的构建块。难点是分支因子巨大，论文指出可适用 transformation 的数量可从几十到数万；如果用普通 BFS 或手写启发式函数，搜索会很快被大量化学上不合理的规则淹没。

3N-MCTS 的第一个网络是 expansion policy。它把分子编码为 ECFP 指纹，并预测哪些 transformation rule 最可能用于合成该分子。这样扩展阶段不用枚举 30 万条规则，只保留 top-k 候选，大幅降低分支因子。这个网络学到的是有机化学文献中的“合成直觉”：相似官能团和反应上下文中，哪些断键方式更常见。

第二个网络是 in-scope filter。符号规则只保证子结构匹配，不保证真实反应会发生；同一反应模板可能因为位阻、电子效应或竞争官能团而失效。in-scope filter 对“由规则生成的候选反应”做二分类，过滤掉不太可能在该分子上下文中成立的步骤，相当于给符号规则补上化学适用域判断。

第三个网络是 rollout policy。MCTS 需要估计一个新节点能否在若干步内到达构建块，但完整展开代价太高；rollout policy 用更小、更保守的规则集快速模拟一条路线到终局。rollout 的结果再回传到路径上的 \(Q\) 值，使搜索逐步偏向那些不仅局部合理、而且全局上能完成合成的分支。

与传统启发式 BFS 相比，3N-MCTS 的优势来自“局部先验 + 全局模拟”的结合。只按 policy 贪心选择会错过早期看似不优但后续很短的路线；只做无引导 MCTS 又会浪费大量尝试在不合理反应上。三网络设计分别处理候选生成、化学可行性和终局价值估计，使搜索能在秒级给出完整路线。

> 💡 关键：3N-MCTS 不是让神经网络直接吐出整条路线，而是让神经网络改变树搜索的概率结构；最终路线仍由可执行的符号 transformation 串联而成。

#### 🧪 练习题

```yaml
question: "3N-MCTS 中 in-scope filter 的主要作用是什么？"
options:
  - "把最终路线翻译成自然语言实验步骤"
  - "判断由符号规则生成的候选反应在当前分子上下文中是否可行"
  - "替代 MCTS 的 selection 阶段，直接返回最短路线"
  - "从商业目录中下载新的构建块"
answer: 1
explain: "符号 transformation 只说明子结构可匹配，不能保证反应真实发生；in-scope filter 用二分类方式过滤掉不适用或不合理的候选反应。"
```
