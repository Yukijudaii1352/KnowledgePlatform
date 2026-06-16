### LLEMA: LLM引导材料演化 (LLM-guided Evolution for Materials)

```yaml
id: llema
name: LLEMA
full_name: "LLM引导材料演化 (LLM-guided Evolution for Materials)"
year: "2026"
org: 多机构
paper_url: "https://arxiv.org/abs/2603.05123"
category: foundation_model
parent: matllmsearch
motivation: LLM引导演化多目标发现
```

#### 📝 一句话总结

LLEMA 将 LLM 候选生成、化学规则、代理物性预测、多目标评分和成功/失败记忆池组成闭环，解决材料发现中多目标约束、合成可行性和 LLM 易记忆已知数据库候选的问题。

#### 🎯 核心要点

- **来源纠错**：任务给定的 `paper_url` arXiv:2603.05123 实际是超导 DFT 论文，不是 LLEMA；LLEMA 实际论文为 OpenReview ICLR 2026 与 arXiv:2510.22503
- **Agentic 进化框架**：LLM 在每轮根据任务、约束、化学规则和历史示例生成候选材料，并输出结构化 JSON/CIF
- **化学信息进化规则**：引入同族元素替换、化学计量保持、氧化态一致性、晶体结构操作等规则，约束 LLM 的突变/交叉方向
- **层级 oracle**：先查 Materials Project 等数据库；若候选超出数据库覆盖，再调用 CGCNN、ALIGNN 等 surrogate models 预测物性
- **多目标评分**：用归一化 reward \(\Phi_i\) 衡量每个属性约束的满足程度，并加权得到综合分数
- **成功/失败双记忆池**：把满足硬约束的候选放入 \(\mathbb{M}^+\)，违反约束的候选放入 \(\mathbb{M}^-\)，下一轮同时提供正例和反例
- **多岛演化**：5 个独立 island 通过 Boltzmann sampling 选择，降低早熟收敛和数据库记忆，提升多样性
- **评测覆盖广**：14 个真实材料发现任务，跨电子、能源、涂层、光学和航天应用，显式要求多属性权衡与热力学稳定性

#### 🔬 深入细节

##### 框架示意图

![LLEMA 框架图](https://arxiv.org/html/2510.22503v2/x1.png)
*图：LLEMA Figure 1。四个组件依次为 Material Candidate Generation、Crystallographic Representation、Physicochemical Property Prediction、Fitness Assessment and Feedback。*

来源说明：任务 YAML 中的 `paper_url` 指向 arXiv:2603.05123，经核验该链接标题为 “First-principles calculation of coherence length and penetration depth ...”，与 LLEMA 无关。本文实际依据 OpenReview ICLR 2026 页面、arXiv:2510.22503 v2、项目页 `https://scientific-discovery.github.io/llema-project/` 和官方 GitHub `scientific-discovery/LLEMA` 撰写。

##### 问题形式化：从单目标到多目标约束

最简单的材料发现可写成：

$$
m^*=\arg\max_{m\in\mathcal{M}} f(m)
$$

其中 \(m\) 是候选材料，\(\mathcal{M}\) 是有效化学空间，\(f\) 是黑箱性质函数。但真实材料任务通常不只优化一个属性，而是要同时满足多个硬约束 \(\mathcal{C}=\{c_1,\dots,c_k\}\)，并在多个目标 \(f_1,\dots,f_n\) 间权衡。每个约束可写为区间、下界或上界：

$$
c_i:f_i(m)\in[l_i,u_i]
\quad\mathrm{or}\quad
c_i:f_i(m)\ge l_i
\quad\mathrm{or}\quad
c_i:f_i(m)\le u_i
$$

一个朴素多目标聚合为：

$$
m^*=\arg\max_{m\in\mathcal{M}}\sum_i w_i f_i(m)
$$

LLEMA 的贡献在于不只定义目标函数，而是让 LLM、规则、oracle 和记忆共同参与搜索，使候选生成本身逐轮向满足约束的区域偏移。

##### Prompt 构成与候选生成

第 \(n\) 轮，LLM \(\pi_\theta\) 从 prompt \(\mathbf{p}_n\) 中采样一批 \(b\) 个候选：

$$
\mathcal{M}^{b}\sim \pi_\theta(\mathbf{p}_n)
$$

prompt 由四部分组成：

- **Task Specification**：自然语言任务，如 wide-bandgap semiconductors，并显式写入 band gap、formation energy、density、bulk/shear modulus 等约束
- **Chemistry-Informed Design Principles**：从第 1 轮之后加入化学进化规则，例如同族替换、化学计量保持、氧化态一致性和结构原型迁移
- **Demonstrations**：从上一轮 population buffer 中抽取成功候选 \(\mathbb{M}^+\) 与失败候选 \(\mathbb{M}^-\)，作为正反例反馈
- **Crystallographic Representation**：要求输出 reduced formula、lattice parameters、atomic species 和 fractional coordinates，最终转成 CIF 供 oracle 评估

官方实现中，候选采样常用 \(b=2\)、温度 \(\tau=0.8\)，并从规则集中随机采样 6 条规则加入提示。相比 MatLLMSearch，LLEMA 更强调多任务约束和记忆式自我改进：LLM 不是只看父代结构，而是同时看任务规格、失败原因和跨岛经验。

##### 代理评估与综合分数

对候选 \(\mathcal{M}_j\)，LLEMA 先生成 CIF，再用层级 oracle 预测物性。若候选可以在 Materials Project 等数据库中精确或相似匹配，则直接读取已有计算/实验属性；否则调用 surrogate models，例如 CGCNN 和 ALIGNN，得到属性向量：

$$
\mathbf{f}(m)=[f_1(m),f_2(m),\dots,f_d(m)]\in\mathbb{R}^{d}
$$

综合分数写为：

$$
S(\mathcal{T},\mathcal{C};\mathcal{M}_j)
=\sum_{i=1}^{k}w_i\cdot
\Phi_i(f_i(\mathcal{M}_j),c_i)
$$

其中 \(w_i\) 是第 \(i\) 个属性的重要性权重，\(\Phi_i\) 是把“是否满足约束、离目标有多远”转成归一化 reward 的函数。满足所有硬约束的候选进入成功池：

$$
\mathbb{M}^{+}=\{m\mid \Phi_i(f_i(m),c_i)\ge 0,\forall i\}
$$

违反任一硬约束的候选进入失败池 \(\mathbb{M}^{-}\)。失败池不是废弃物，而是下一轮提示中的负例：它告诉 LLM 哪些元素组合、晶格配置或属性权衡会失败。

##### 多岛记忆与 Boltzmann 选择

LLEMA 使用 \(m=5\) 个独立 island。每个 island 都维护成功/失败 buffer，独立探索化学空间。每轮先按 island 平均分数选择一个 island：

$$
P_i=\frac{\exp(s_i/\tau_c)}{\sum_j\exp(s_j/\tau_c)}
$$

其中 \(s_i\) 是第 \(i\) 个 island 的平均分数，\(\tau_c\) 是温度。附录实现进一步给出退火形式：

$$
\tau_c=T_0\left(1-\frac{u\bmod M}{M}\right)
$$

其中 \(u\) 是当前 island 的候选数，\(T_0=0.1\)、\(M=10{,}000\)。被选中的 island 内再用 top-\(k\) 从 \(\mathbb{M}^{+}\) 和 \(\mathbb{M}^{-}\) 取示例，构造下一轮 prompt。

> 💡 关键：success memory 推动 exploitation，failure memory 提供反例边界，multi-island sampling 保持 exploration。三者共同降低 LLM 反复生成 Materials Project 已知材料的倾向。

##### 算法伪代码

```python
# LLEMA 核心流程
def llema(task_T, constraints_C, rules_R, predictor_f, llm, N, num_islands=5):
    islands = init_islands(num_islands)  # 每个 island 含 success/error buffers
    candidate_pool = init_candidates_from_materials_project(task_T)
    base_prompt = build_prompt(task_T, constraints_C)

    for n in range(1, N):
        # 1. 选择一个 island，并从成功/失败池取 in-context 示例
        island = boltzmann_select(islands, score="mean_fitness")
        demos_pos = island.success.topk(k=2)
        demos_neg = island.failure.topk(k=2)

        # 2. 注入任务、约束、化学规则和历史反馈
        prompt = compose_prompt(
            base_prompt=base_prompt,
            positive_examples=demos_pos,
            negative_examples=demos_neg,
            evolution_rules=sample(rules_R, k=6),
            output_schema="JSON + CIF"
        )

        # 3. LLM 生成候选晶体
        candidates = llm.generate(prompt, batch_size=2, temperature=0.8)

        for m in candidates:
            cif = parse_or_repair_cif(m)
            if not cif.is_valid():
                island.failure.add(m, reason="invalid CIF")
                continue

            # 4. 层级 oracle：数据库优先，OOD 时用 surrogate
            properties = predictor_f(cif)  # MP API, CGCNN, ALIGNN, etc.
            score = multi_objective_score(properties, constraints_C)

            # 5. 更新成功/失败记忆
            if satisfies_all_hard_constraints(properties, constraints_C):
                island.success.add(cif, properties, score)
                candidate_pool.add(cif)
            else:
                island.failure.add(cif, properties, score)

        update_population(island)

    return merge_success_buffers(islands)
```

##### 与 MatLLMSearch 的关系

MatLLMSearch 已经证明“LLM + 进化选择 + MLIP 评估”可以在不微调的情况下产生稳定晶体。LLEMA 可看作沿着同一路线的多目标、记忆化、规则增强版本。它把“父代结构提示”扩展为“任务约束 + 化学规则 + 成功/失败经验 + surrogate oracle”的 agentic system，并把稳定性从单一筛选指标变成每个真实应用任务都必须满足的硬约束。

与纯生成模型 CDVAE、G-SchNet、DiffCSP、MatterGen 相比，LLEMA 不依赖为每个任务重新训练生成器；与普通 LLM direct prompting 或 LLMatDesign 相比，LLEMA 的优势来自闭环反馈、反例记忆和多岛演化，而不是单步自反思。

##### 评测与限制

论文构建了 14 个应用驱动任务，包括宽带隙半导体、SAW/BAW 声学基底、高 \(k\) 介电体、固态电解质、压电能量采集、透明导体、光伏吸收体、硬涂层、硬/刚性陶瓷、航天结构材料、低密度结构和无毒钙钛矿氧化物等。所有任务都至少包含多个属性约束，并以 \(E_{\mathrm{hull}}<0.1\) eV/atom 作为稳定性判断。

主表显示，LLEMA-GPT 在多个任务上显著优于基线，例如 wide-bandgap semiconductors 的 hit-rate/stability 为 33.62/22.42，SAW/BAW acoustic substrates 为 59.88/10.74，solid-state electrolytes 为 46.17/25.37，hard stiff ceramics 为 30.99/5.73。消融实验显示：只有 memory 的 LLM 容易继续记忆数据库；去掉 surrogate 后 hit-rate 和 stability 下降到接近零；加入 domain-guided evolution 后在 hit-rate、stability 和 memorization rate 之间取得最好平衡。

论文也承认局限：评估主要依赖代理模型和 Materials Project/DFT 数据覆盖，实验合成验证有限，迭代 LLM 查询存在成本。作者用 Quantum ESPRESSO 对 150 个有效候选做补充验证，其中 144 个满足任务约束；在对 surrogate 加高斯噪声后，150 个候选中 141 个仍满足 DFT 约束，说明代理误差不会完全破坏搜索方向，但高保真验证仍是实际部署的必要步骤。

#### 🧪 练习题

```yaml
question: "LLEMA 中成功池和失败池同时进入下一轮 prompt 的主要作用是什么？"
options:
  - "让 LLM 只复制成功材料，避免生成任何新结构"
  - "同时提供高分正例和约束违反反例，帮助 LLM 学到可行区域边界并减少重复记忆"
  - "替代所有 surrogate models，不再需要物性预测"
  - "把多目标问题退化成单目标文本分类任务"
answer: 1
explain: "成功池强化可行设计模式，失败池提供负反馈和约束边界；两者与多岛采样结合，使 LLEMA 能在探索和利用之间取得平衡。"
```
