### LocalRetro — 局部反应中心预测与全局反应性注意力

```yaml
id: localretro
name: LocalRetro
full_name: "局部反应中心预测 (LocalRetro)"
year: '2021'
org: MIT
paper_url: "https://pubs.acs.org/doi/10.1021/jacsau.1c00173"
category: retrosynthesis
parent: 3n_mcts
motivation: "预测局部反应中心简化搜索空间"
```

#### 📝 一句话总结

LocalRetro 把单步逆合成拆成“在每个原子/键上预测局部反应模板”的分类问题，并用全局反应性注意力补充远程取代基效应，从而在保留模板可解释性的同时显著缩小搜索空间。

#### 🎯 核心要点

- **局部反应模板 (local reaction template)**：只描述反应中心附近的 atom edit、bond edit 或二者同时发生的局部变化，而不是把整条反应编码成全局模板
- **原子/键双分类器**：分别预测每个原子可应用的 atom template 和每条键可应用的 bond template
- **MPNN 局部环境编码**：先用 message passing 编码邻域化学环境，再把两端原子表示拼接成键表示
- **GRA 全局反应性注意力**：用 multi-head self-attention 让每个原子/键感知分子内所有其他原子/键，建模非局部电子效应和位点竞争
- **模板应用即生成 reactants**：预测中心和模板后，用 RDKit/RDChiral 风格的模板应用得到前体，按预测分数排序
- **数据规模验证**：论文在 USPTO-50K 和 USPTO-MIT 上评估，报告 USPTO-50K top-1 exact match 53.4%、top-5 round-trip 99.2%
- **来源校正**：任务给出的 DOI `10.1021/jacsau.1c00173` 与 LocalRetro 论文不一致；可访问论文和官方仓库对应 `10.1021/jacsau.1c00246`

#### 🔬 深入细节

![LocalRetro 模型架构](https://cdn.ncbi.nlm.nih.gov/pmc/blobs/7c32/8549044/7ce463dc4376/au1c00246_0002.jpg)
*图：LocalRetro 论文 Figure 2。模型先初始化分子图、原子特征和键特征，再经过 MPNN、bond feature encoding、GRA，最后分别对原子模板和键模板打分。*

##### 算法伪代码

```python
# LocalRetro 训练与推理伪代码
def train_localretro(reactions):
    atom_templates, bond_templates = extract_local_templates(reactions)

    for product, true_center, true_template in reactions:
        G = molecular_graph(product)
        v, e = initialize_atom_bond_features(G)

        # 1. 局部环境编码
        v_prime = mpnn_atom_update(G, v, e)
        e_prime = bond_encoder(v_prime, G.edges)

        # 2. 全局反应性注意力
        x_atom = gra_update_atoms(v_prime, e_prime)
        x_bond = gra_update_bonds(v_prime, e_prime)

        # 3. 原子/键模板分类
        atom_logits = atom_template_classifier(x_atom)
        bond_logits = bond_template_classifier(x_bond)

        loss = cross_entropy(atom_logits, true_atom_template_labels)
        loss += cross_entropy(bond_logits, true_bond_template_labels)
        optimizer.step(loss)


def predict_localretro(product, reaction_class=None, top_k=50):
    G = molecular_graph(product)
    x_atom, x_bond = encode_with_mpnn_and_gra(G)
    candidates = []

    for atom in G.atoms:
        for template, score in top_templates(atom_classifier(x_atom[atom])):
            if allowed(template, reaction_class):
                candidates.append(apply_template(product, atom, template, score))

    for bond in G.bonds:
        for template, score in top_templates(bond_classifier(x_bond[bond])):
            if allowed(template, reaction_class):
                candidates.append(apply_template(product, bond, template, score))

    return rank_by_score_and_validity(candidates)[:top_k]
```

##### 局部模板的建模动机

传统 template-based retrosynthesis 往往把整条反应抽象成一个全局模板。问题是模板库长尾严重：同一种反应中心在不同取代基背景下会变成许多稀疏模板，模型需要在数千到数万模板里做全局分类。LocalRetro 的化学假设更局部：大多数结构变化只发生在少数原子和键附近，因此可以先枚举所有可能的局部中心，再判断哪个局部模板适合该中心。

论文把局部模板分为三类：只发生原子属性变化时派生 atom reaction template；发生键断裂、键级变化时派生 bond reaction template；原子和键都变化时同时记为两类模板。这样，模型输出天然带有“反应发生在哪里”和“发生了什么局部变化”的解释。

##### MPNN 与键表示

给定分子图 \(G=(V,E)\)，原子特征 \(v_a\)、邻居原子特征集合 \(\{v_b\}\)、连接键特征集合 \(\{e_{ab}\}\)，论文用 MPNN 更新原子表示：

$$v'_a = \text{MPNN}(v_a, \{v_b\}, \{e_{ab}\})$$

更新后的键表示由两端原子表示拼接后经全连接层得到：

$$e'_{ab} = w(v'_a \Vert v'_b) + c$$

这里 \(\Vert\) 表示向量拼接。这个阶段捕获的是局部邻域环境，例如反应中心附近的杂原子、芳香性、键型、价态和氢数等。

##### GRA：全局反应性注意力

局部环境不足以解释所有位点选择。例如同一个分子里可能存在多个看似相似的卤素或羰基，远程供电子/吸电子基团会改变哪个中心更容易反应。LocalRetro 因此加入 global reactivity attention (GRA)，让每个原子和键都能与分子内所有原子/键交互：

$$x_a = \text{GRA}(v'_a, \{v'_a\}_{a\in V}, \{e'_{ab}\}_{ab\in E})$$

$$x_{ab} = \text{GRA}(e'_{ab}, \{v'_a\}_{a\in V}, \{e'_{ab}\}_{ab\in E})$$

直观上，GRA 类似 Transformer 的 multi-head self-attention，但注意对象不只是序列 token，而是原子和键的化学表征。若用标准注意力形式表示某个中心 \(i\) 对全局中心 \(j\) 的依赖，可写作：

$$\alpha_{ij}^{(h)}=\text{softmax}_j\left(\frac{(W_Q^{(h)}x_i)^\top(W_K^{(h)}x_j)}{\sqrt{d_h}}\right)$$

$$\tilde{x}_i^{(h)}=\sum_j \alpha_{ij}^{(h)} W_V^{(h)}x_j$$

多头结果拼接后得到更新表示。GRA 的目的不是替代局部模板，而是在模板分类前加入非局部反应性上下文。

##### 原子模板与键模板分类器

GRA 后的原子表示 \(x_a\) 和键表示 \(x_{ab}\) 分别进入两套分类器：

$$o_a = u_A^\top \sigma(w_A x_a + c_A)$$

$$o_{ab} = u_B^\top \sigma(w_B x_{ab} + c_B)$$

其中 \(\sigma\) 是 ReLU。随后对候选局部模板集合做 softmax：

$$s(T \mid a)=\text{Softmax}(o_a), \quad T \in \{T_{\text{atom}}\}$$

$$s(T \mid ab)=\text{Softmax}(o_{ab}), \quad T \in \{T_{\text{bond}}\}$$

训练目标可以概括为原子模板和键模板的交叉熵之和：

$$\mathcal{L}=
-\sum_{a\in V}\log s(T_a^\* \mid a)
-\sum_{ab\in E}\log s(T_{ab}^\* \mid ab)$$

其中 \(T_a^\*\) 与 \(T_{ab}^\*\) 是从 atom-mapped 训练反应中提取的监督标签。若反应类别已知，推理时只在该类别对应的模板池中选择模板。

##### 为什么能简化搜索空间

LocalRetro 不直接输出 reactant SMILES，也不对整库全局模板做一次性分类。它把候选空间拆成：

$$\text{candidate} = (\text{center}, \text{local template})$$

中心只来自已有原子和键，数量约为 \(O(|V|+|E|)\)。局部模板只覆盖反应中心附近变化，复用率更高。论文报告 USPTO-50K 训练集抽取出 731 个 local reaction templates，覆盖测试集中 98.1% 的反应；USPTO-MIT 抽取出 21,081 个模板，覆盖 97.0%。

> 💡 关键：LocalRetro 的“模板”不是放弃规则，而是把规则局部化。局部规则保留化学可解释性，同时比全局模板更容易跨取代基背景复用。

##### 结果与局限

在 USPTO-50K 上，LocalRetro 论文报告 top-1 exact match 为 53.4%，top-3/5/10 分别为 77.5%、85.9%、92.4%；round-trip top-1/3/5 为 89.5%、97.9%、99.2%。在 USPTO-MIT 大规模数据上，top-1 exact match 为 54.1%，top-5 round-trip 为 97.4%。GRA 带来的增益在多产物或存在远程位点竞争的反应中更明显，论文中给出可视化示例说明 GRA 能让模型关注远程取代基环境。

局限也很清楚：LocalRetro 仍依赖 atom mapping 来派生模板；若正确反应需要训练集中没有覆盖的局部模板，模型无法生成对应路线。由于它本质上是模板应用模型，泛化能力介于全局模板模型和完全 template-free 生成模型之间。

##### 可访问来源说明

任务文件中的 `paper_url` 指向的 DOI 与 LocalRetro 论文不匹配。本文依据 PubMed Central 可访问全文、ACS 论文 DOI `10.1021/jacsau.1c00246`、以及官方 GitHub `kaist-amsg/LocalRetro` 整理方法细节；YAML 块仍按任务元信息保留。

#### 🧪 练习题

```yaml
question: "LocalRetro 中 GRA 的主要作用是什么？"
options:
  - "把反应中心扩展为所有原子对，从而穷举断键"
  - "让原子和键表示感知分子内非局部反应性依赖，帮助区分相似局部中心"
  - "替代局部反应模板，直接生成完整 reactant SMILES"
  - "判断候选前体是否在商业 stock 中可购买"
answer: 1
explain: "MPNN 主要编码局部邻域，GRA 通过全局注意力补充远程取代基和位点竞争信息，再用于原子/键模板分类。"
```
