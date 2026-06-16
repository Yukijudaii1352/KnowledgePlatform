### MOSAIC — 自动实验方案生成平台

```yaml
id: mosaic
name: MOSAIC
full_name: 自动实验方案生成平台 (MOSAIC)
year: '2026.01'
org: Yale / Boehringer Ingelheim
paper_url: https://news.yale.edu/2026/01/19/new-recipes-accelerating-chemistry-discoveries-dash-ai
category: retrosynthesis
parent: aizynthfinder
motivation: 导航百万反应协议，生成可操作实验室规程
```

#### 📝 一句话总结

MOSAIC 提出“多个专门化化学专家”的 LLM 框架，把百万级反应协议划分到 2,498 个 Voronoi 专家域中，再按待预测反应检索 top-k 专家生成试剂、条件和可执行实验步骤，解决单一大模型难以覆盖复杂化学子领域的问题。

#### 🎯 核心要点

- **Multiple Optimized Specialists**：基于 Llama-3.1-8B-Instruct 微调出 2,498 个专门化化学专家，而不是依赖一个通用模型
- **反应空间分区**：使用反应指纹、kernel metric network 和 FAISS/Voronoi 聚类，把反应协议映射到可搜索的专家区域
- **top-k 专家路由**：对新反应计算嵌入，检索最近的专家中心，调用多个专家生成候选实验规程并显示专家距离
- **实验规程输出**：目标不是只给反应是否可行，而是输出反应物、试剂、条件、温度和逐步 procedure
- **置信度/适用域提示**：用待预测反应到专家中心的距离和参考协议相似度提示该建议是否处于专家经验范围内
- **实验验证**：Nature 摘要和 Yale 新闻披露整体实验成功率约 71%，并实现 35 个以上此前未报道化合物
- **开放实现**：官方 GitHub 提供数据处理、Voronoi 域创建、kernel metric network、专家微调和预测工具链

#### 🔬 深入细节

##### 来源与框架图

任务给出的 `paper_url` 是 Yale 新闻；它链接到 Nature 论文 *Collective intelligence for AI-assisted chemical synthesis*（DOI: `10.1038/s41586-026-10131-4`）。Nature 页面目前公开摘要、图题、数据与代码可用性，详细正文需要访问权限；方法级细节主要来自官方开源仓库 `https://github.com/haoteli/MOSAIC`。因此下面的解读以 Nature 摘要、Yale 新闻和官方代码/README 可见流程为依据。

![MOSAIC 图形摘要](https://raw.githubusercontent.com/haoteli/MOSAIC/main/Graphical_Abstract_v2.png)
*图：MOSAIC 官方仓库的图形摘要。系统先把反应知识划分为许多专家域，再根据新反应的嵌入位置选择相邻专家生成实验方案。*

##### 反应表示与专家路由

MOSAIC 的第一步是把待处理反应 \(r\) 编成固定维度向量。官方预测代码中使用 RDKit 生成混合反应指纹，并将反应物、差分和产物信息拼接：

$$
x_r = [\text{FP}_{reactant},\ \text{FP}_{diff},\ \text{FP}_{product}]
$$

其中 \(\text{FP}_{diff}\) 表示从反应物到产物的结构变化。随后 kernel metric network 将高维指纹映射到更适合检索的嵌入空间：

$$
h_r = f_\phi(x_r)
$$

官方 `Transformation_Model.py` 中的网络是两层 MLP：`input -> 256 -> 128 -> classes`，中间包含 ReLU、BatchNorm 和 Dropout；`get_embeddings()` 返回 128 维左右的中间表示用于专家检索。Voronoi 专家域由中心 \(\{c_j\}_{j=1}^{2498}\) 定义：

$$
e^\*(r)=\arg\min_j \|h_r-c_j\|_2
$$

推理时不只取一个专家，而是通过 FAISS 检索 top-\(k\) 最近专家：

$$
\mathcal{E}_k(r)=\operatorname{TopK}_{j}\left(-\|h_r-c_j\|_2\right)
$$

这些距离就是 MOSAIC 的适用域信号：距离越小，说明待预测反应越接近该专家见过的协议分布。代码会打印 `Expert Centroid Distances`，并可展示该专家域中反应类别和试剂统计。

```python
# MOSAIC 推理伪代码
def mosaic_predict(reaction_smiles, n_expert=3):
    rxn_fp = make_mixed_reaction_fingerprint(reaction_smiles)
    x = concat([rxn_fp.reactant, rxn_fp.diff, rxn_fp.product])

    # kernel metric network: reaction fingerprint -> searchable embedding
    h = metric_network.get_embeddings(x)

    # FAISS/Voronoi 路由：选择最接近的专家域
    distances, expert_ids = faiss_index.quantizer.search(h, k=n_expert)

    all_candidates = []
    for expert_id, distance in zip(expert_ids, distances):
        expert_model = load_lora_or_adapter("Expert_" + str(expert_id))
        prompt = build_protocol_prompt(reaction_smiles)
        sequences = expert_model.generate(
            prompt,
            beam_size=20,
            beam_group=2,
            diversity_penalty=0.1,
        )
        for seq in sequences:
            protocol = parse_reagents_conditions_procedure(seq)
            references = retrieve_nearest_reference_protocols(protocol, expert_id)
            all_candidates.append((distance, expert_id, protocol, references))

    return rank_by_domain_distance_and_protocol_quality(all_candidates)
```

##### 训练机制

MOSAIC 的训练分为三层。第一层是数据处理：从 Pistachio 或自定义数据库中抽取反应协议，生成反应指纹，并为每条记录保留 reaction SMILES、自然语言 procedure、试剂和条件等字段。第二层是 metric learning/分类式路由：训练 kernel metric network，让相似反应在嵌入空间中相邻，再用 FAISS 生成 Voronoi 专家索引。第三层是语言模型训练：先对 Llama-3.1-8B-Instruct 做通用化学暴露式微调，再按专家域继续训练每个 specialist。

专家 \(e\) 的语言建模目标可以写成标准监督微调损失：

$$
\mathcal{L}_e(\theta_e)
=-\sum_{(x,y)\in D_e}\sum_{t=1}^{|y|}
\log p_{\theta_e}(y_t\mid y_{<t},\text{Prompt}(x))
$$

其中 \(D_e\) 是 Voronoi 域 \(e\) 内的反应协议集合，\(x\) 是反应描述，\(y\) 是规程文本。这个目标让每个专家只在局部反应空间中学习“怎么写可执行 procedure”，减少通用模型在冷门反应上的平均化和幻觉。

##### 置信度与参考协议

MOSAIC 的 uncertainty 不是简单的 softmax 分类置信度。官方代码中更直接暴露两类证据：一是待预测反应到专家中心的距离 \(d_j=\|h_r-c_j\|_2\)，二是生成 procedure 与专家域内参考协议的编辑距离。可以把 top-k 距离归一化为一个可读权重：

$$
w_j=\frac{\exp(-d_j/\tau)}{\sum_{\ell\in\mathcal{E}_k(r)}\exp(-d_\ell/\tau)}
$$

但需要注意：这是对代码中距离信号的解释性归一化，不等同于论文宣称的严格校准概率。实际使用时，更重要的是查看专家域反应分布、最近参考协议和生成步骤是否化学上可执行。

##### 与传统逆合成规划的区别

传统 retrosynthesis 系统主要回答“从哪些前体能到达目标分子”，输出的是路线或反应模板序列。MOSAIC 更靠近实验执行层：给定某个反应或合成目标后，它尝试生成可操作协议，包括试剂、溶剂、温度、时间、加料顺序和后处理。Yale 新闻将其比作“化学 recipe book”，这个比喻准确反映了任务边界：它不是只做路径搜索，而是把数据库中分散的实验文本压缩成可检索、可组合、可生成的 protocol knowledge。

这种设计也解释了为什么它采用多专家而非单模型。化学反应空间高度非均匀：光反应、过渡金属催化、天然产物后期官能团化、材料单体合成等子领域的实验语言和失败模式都不同。用 Voronoi 域分片后，专家模型可以在更窄的局部分布上学习具体做法，推理阶段再通过 top-k 专家形成“集体智能”。

> ⚠️ 注意：MOSAIC 生成的是实验建议，不是免验证的实验指令。实际执行仍需要化学家审阅安全性、可购买性、放大风险、保护基兼容性和机构 SOP。

#### 🧪 练习题

```yaml
question: "MOSAIC 中 Voronoi/FAISS 专家路由的主要作用是什么？"
options:
  - "把每个反应都随机分配给一个 LLM，以增加输出多样性"
  - "根据反应指纹嵌入检索最接近的化学专家域，用局部专家生成实验规程"
  - "用固定规则删除所有低产率反应，避免模型生成 procedure"
  - "把自然语言 procedure 转换为 SMILES，不参与模型选择"
answer: 1
explain: "MOSAIC 先用反应指纹和 kernel metric network 得到嵌入，再用 FAISS/Voronoi 检索最近的专家模型；专家距离同时提供适用域和不确定性线索。"
```
