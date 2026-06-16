### MatLLMSearch: 材料LLM搜索 (Materials LLM Search)

```yaml
id: matllmsearch
name: MatLLMSearch
full_name: "材料LLM搜索 (Materials LLM Search)"
year: "2025"
org: 多机构
paper_url: "https://arxiv.org/abs/2502.20933"
category: foundation_model
parent: crystallm
motivation: LLM作为智能提案代理
```

#### 📝 一句话总结

MatLLMSearch 将预训练大语言模型放进进化搜索闭环中，让 LLM 在少量参考晶体的提示下隐式执行交叉、突变和结构改写，解决纯生成模型需要材料数据库微调且难以同时兼顾稳定性、有效性和多目标设计的问题。

#### 🎯 核心要点

- **训练自由的 LLM 结构提案器**：直接调用 Llama 3.1-70B 等预训练 LLM 生成 POSCAR/CIF 晶体结构，不对材料数据库做微调
- **三阶段进化闭环**：Selection 选择高分父代，Reproduction 让 LLM 修改或组合父代结构，Evaluation 用规则、MLIP 和 DFT 逐级验证
- **隐式交叉与突变**：LLM 可同时改变化学组分、晶格参数、原子坐标、元素替换和结构基元，而不是依赖手写晶体遗传算子
- **物理约束评估**：先检查三维周期性、原子间距和电荷平衡，再用 CHGNet/M3GNet 松弛并计算 decomposition energy \(E_d\)
- **选择机制可切换目标**：可按 \(E_d\) 做稳定性优化，也可按体模量、deformation energy 或多目标排序更新父代池
- **结果验证链条**：CHGNet/M3GNet 作为快速代理筛选，最终对 \(E_d < 0.1\) eV/atom 的候选进行 VASP/PBE DFT 验证
- **任务泛化**：同一框架可用于 crystal structure generation、给定化学式的 crystal structure prediction，以及稳定性-力学性质多目标搜索

#### 🔬 深入细节

##### 框架示意图

![MatLLMSearch 进化搜索流程](https://raw.githubusercontent.com/JingruG/MatLLMSearch/main/assets/pipeline.png)
*图：MatLLMSearch 官方仓库中的 pipeline 图。流程从已知稳定结构初始化父代池，经 LLM 生成子代、规则/MLIP 评估、目标排序选择，迭代推动晶体结构族群进化。*

来源说明：主要来源为 arXiv:2502.20933 v2、官方 GitHub README 与 arXiv TeX 源文件；官方仓库提供了可访问的 pipeline 图片。论文还在 OpenReview/TMLR 页面出现过，但方法细节以 arXiv v2 为准。

##### 任务建模与总体流程

论文把晶体结构生成写成学习或搜索一个晶体分布：

$$
p(c,l,s)
$$

其中 \(c \in \mathbb{R}^{N \times K}\) 表示 \(N\) 个原子在 \(K\) 种元素上的组成矩阵，\(l \in \mathbb{R}^{6}\) 表示晶格常数和角度，\(s \in \mathbb{R}^{N \times 3}\) 表示周期单胞内的原子坐标。MatLLMSearch 的关键不是重新训练一个显式分布模型，而是把 LLM 当成可查询的 proposal policy，通过进化选择把输出分布逐步推向稳定区域。

初始化时，从已知稳定结构数据库 \(\mathcal{D}\) 中采样 \(K \times P\) 个结构，组成父代池 \(\mathcal{P}_0\)。论文实验中常用 \(K=100\)、父代数 \(P=2\)、每轮子代数 \(C=5\)、迭代轮数 \(N=10\)，并用 POSCAR 格式和 12 位小数描述结构。每组父代被放进提示词，要求 LLM “modify or combine the base materials”，从而在自然语言和结构文本层面执行隐式交叉/突变。

##### 算法伪代码

```python
# MatLLMSearch 核心流程
def matllmsearch(database_D, objective, K=100, P=2, C=5, N=10):
    # 1. 初始化：采样已知稳定结构作为父代
    parent_pool = sample_stable_structures(database_D, K * P)
    optional_extra_pool = retrieve_extra_pool(database_D, objective)
    all_children = []

    for i in range(N):
        children = []
        for group in split(parent_pool, group_size=P):
            prompt = build_prompt(
                parents=group,
                objective=objective,
                format="POSCAR or CIF",
                instruction="modify or combine base materials"
            )
            # 2. Reproduction：LLM 生成新候选
            children.extend(llm_generate(prompt, num_candidates=C, temperature=0.95))

        # 3. Evaluation：先做规则过滤，再做 MLIP 松弛和性质预测
        scored = []
        for structure in children:
            if not valid_periodic_structure(structure):
                continue
            if not valid_interatomic_distances(structure, ratio_range=(0.6, 1.3)):
                continue
            if not charge_balanced(structure):
                continue

            relaxed = chgnet_relax(structure)
            E_d = distance_to_mp_convex_hull(relaxed)
            properties = predict_properties(relaxed, objective)
            scored.append((structure, E_d, properties))

        all_children.extend(scored)

        # 4. Selection：从父代、子代和可选参考池中选择下一轮父代
        candidates = parent_pool + scored + optional_extra_pool
        parent_pool = select_top_k(candidates, objective=objective, k=K * P)

    # 5. Final verification：对代理模型判断为亚稳的候选做 DFT
    metastable = [s for s in all_children if s.E_d < 0.1]  # eV/atom
    return dft_verify(metastable)
```

##### 为什么 LLM 能做晶体“交叉/突变”

传统晶体遗传算法的交叉和突变通常是显式算子：交换原子片段、扰动坐标、改变晶格、替换元素等。这些算子可控，但很容易局限于局部几何操作，且需要研究者为不同材料体系手动设计规则。MatLLMSearch 的假设是：预训练 LLM 已从通用科学文本和结构化文本中学到一部分晶体化学先验，能够在 POSCAR/CIF 这种文本表示中识别“相近元素”“合理化学计量”“晶格与坐标的格式约束”等模式。

因此，Reproduction 阶段并不告诉 LLM 执行某个固定突变算子，而是把父代结构、优化目标和输出格式一起放进提示词。LLM 生成的子代可能来自元素替换、晶格缩放、坐标重排、结构基元组合，甚至是新的但与父代功能相关的结构。进化选择随后负责纠偏：物理无效结构被过滤，能量和目标性质更好的结构进入下一代。

##### 评估函数与稳定性计算

MatLLMSearch 的评估分两层。第一层是低成本规则验证：

- 三维周期性和 POSCAR/CIF 格式是否可解析
- 任意原子间距离是否落在经验合理范围，例如 \(0.6\) 到 \(1.3\) 倍原子半径和
- 化学式是否满足电荷平衡或基本价态约束

第二层是代理模型和相图评估。给定 CHGNet 松弛后的结构，论文用 Materials Project 相图计算 decomposition energy：

$$
E_d(m)=E_\text{form}(m)-E_\text{hull}(\mathrm{composition}(m))
$$

当 \(E_d < 0.1\) eV/atom 时，结构通常被视为亚稳候选；更严格的稳定性验证使用 DFT 松弛和静态计算确认是否落到凸包上或接近凸包。最终 DFT 设置采用 VASP 6、GGA-PBE、PAW、520 eV 截断能、每倒易原子 1000 的 \(k\)-点密度，并用 \(10^{-6}\) eV 电子收敛和 0.02 eV/Å 离子力阈值。

##### Selection 如何把 LLM 输出变成搜索

如果只让 LLM 一次性生成晶体，输出质量容易被提示词偶然性主导。MatLLMSearch 的核心增益来自选择压力。第 \(i\) 轮后，下一代父代池从三类候选中产生：

$$
\mathcal{P}_{i+1}
= \operatorname{TopK}_{\mathrm{objective}}
\left(\mathcal{P}_{i} \cup \mathcal{C}_{i} \cup \mathcal{R}\right)
$$

其中 \(\mathcal{P}_i\) 是当前父代，\(\mathcal{C}_i\) 是 LLM 子代，\(\mathcal{R}\) 是可选额外参考池。对于稳定性任务，排序目标主要是最小化 \(E_d\)；对于多目标设计，可以交替优化稳定性和体模量，或使用加权/字典序策略。

> 💡 关键：LLM 负责提出“可能合理”的离散结构跳跃，CHGNet/M3GNet 和相图负责给出连续、物理可解释的选择信号。两者结合后，系统不需要反向传播更新 LLM，也能把候选分布逐轮推向更稳定区域。

##### 与 CrystaLLM / CrystalTextLLM 等方法的区别

CrystaLLM 或 CrystalTextLLM 的基本路线是把 CIF/POSCAR 当作语言序列，通过材料结构数据库训练或微调自回归模型。优势是结构文本建模直接，缺点是训练成本高、任务迁移需要重新调优，而且单次采样没有强反馈。MatLLMSearch 反过来使用通用预训练 LLM 的现成能力，把训练成本转移到推理时搜索和快速物性评估上。

论文报告的关键结果包括：在晶体结构生成任务中，MatLLMSearch 使用 Llama 3.1-70B 时取得约 76.8% 的 CHGNet 亚稳率和 31.7% 的 DFT 验证稳定率，显著高于 CrystalTextLLM-70B 的对应结果。去除 \(f\)-electron 元素作为父代捷径后，CHGNet 亚稳率仍约 78.4%，并提高了非 \(f\)-electron 稳定结构比例，说明框架并非只在强相关元素上“钻空子”。

#### 🧪 练习题

```yaml
question: "MatLLMSearch 相比直接让 LLM 一次性生成晶体结构，最关键的机制改进是什么？"
options:
  - "用更大的 LLM 替代所有物理评估模型"
  - "把 LLM 放入进化闭环，用规则、MLIP 和相图评分选择下一代父代"
  - "只允许 LLM 改变元素组成，不允许改变晶格和坐标"
  - "通过微调让 LLM 记住 Materials Project 的全部 CIF 文件"
answer: 1
explain: "MatLLMSearch 的核心是 LLM 负责提出候选，物理评估和选择机制负责保留高质量结构并构造下一轮提示，从而形成搜索闭环，而不是单次无反馈生成。"
```
