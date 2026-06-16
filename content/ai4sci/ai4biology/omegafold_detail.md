### OmegaFold — 无需 MSA 的单序列蛋白质结构预测

```yaml
id: omegafold
name: OmegaFold
full_name: OmegaFold (OmegaFold)
year: '2022.07'
org: HeliXon
paper_url: https://www.biorxiv.org/content/10.1101/2022.07.21.500999v1
category: protein_structure
parent: —
motivation: 无需MSA的单序列快速预测
```

#### 📝 一句话总结

OmegaFold 提出了一条完全不依赖 MSA 和模板的蛋白质结构预测路线：先用蛋白质语言模型 OmegaPLM 从单条氨基酸序列中提取残基与残基对表征，再用几何感知的 GeoFormer 和结构模块直接生成三维原子坐标，解决了 orphan protein、快速进化抗体等同源序列稀缺场景下传统 MSA 方法受限的问题。

#### 🎯 核心要点

- **单序列输入**：输入只有 primary sequence，不执行 MSA 搜索和模板搜索，推理延迟主要由 GPU 前向传播决定
- **OmegaPLM 预训练表征**：用 masked protein language modeling 学到残基级表示，并从多层注意力中构造残基对表示
- **GeoFormer 主干**：50 个几何感知 Transformer block 同时更新 node representation 和 edge/pair representation，逐步消除残基对几何不一致
- **几何注意力机制**：在 edge representation 上执行 geometric attention，使 \(i,j,k\) 三元残基之间的距离/方向约束相互协调
- **结构模块**：采用 AlphaFold2 风格的结构生成模块，配置中结构模块包含 8 个循环/层级，用 residue 与 pair 表征预测 backbone 与 side-chain 原子坐标
- **置信度头**：输出 per-residue pLDDT，并把整体 confidence 写入 PDB 的 B-factor 字段；多 cycle 推理时可选择最高 confidence 结构
- **速度优势**：官方图示给出的 CAMEO 例子中，约 250/500/1000 残基蛋白推理时间约为 7.6/25.9/128.0 秒，显著省去 AlphaFold2 的 MSA 搜索成本
- **适用边界**：在同源序列丰富的常规蛋白上通常难以系统性超过完整 MSA 版 AlphaFold2，但在无同源、弱同源和快速进化蛋白上补齐了 MSA 方法的空白

#### 🔬 深入细节

##### 架构图与来源说明

![OmegaFold 官方架构示意图](https://raw.githubusercontent.com/HeliXonProtein/OmegaFold/main/figure.png)
*图：OmegaFold 官方仓库中的方法概览。上方展示 single sequence → OmegaPLM → GeoFormer → Structure Module → predicted structure 的主流程；下方展示 OmegaPLM 注意力、GeoFormer 几何平滑、CAMEO/CASP 案例和运行时间对比。*

来源说明：任务给出的 bioRxiv 论文链接在当前环境会触发 JavaScript/cookie 校验，因此正文细节主要交叉参考论文 DOI 摘要、官方 GitHub 仓库源码与官方架构图。官方源码的 `config.py` 显示 OmegaPLM hidden/node 维度为 1280、GeoFormer 为 50 个 block、结构模块配置为 8 个 cycle；`confidence.py` 显示置信度头按 pLDDT 方式计算 per-residue confidence。

##### 推理伪代码

```python
# OmegaFold 推理流程伪代码
def omegafold_predict(sequence, num_recycles=4, choose_by_confidence=True):
    """
    sequence: 单条氨基酸序列，不需要 MSA 或模板
    num_recycles: 外层循环/回收次数，官方命令行中可通过 --num_cycle 调整
    """
    # 1. OmegaPLM 从序列得到 residue 表征和 pair/edge 表征
    plm_node, plm_edge_layers = OmegaPLM(sequence)
    node = linear_node(norm(plm_node))              # [L, C_node]
    edge = linear_edge(norm(plm_edge_layers))       # [L, L, C_edge]
    edge = edge + residue_pair_embedding(sequence)  # 加入氨基酸类型与相对位置特征

    prev_node = zeros_like(node)
    prev_edge = zeros_like(edge)
    prev_coords = zeros([len(sequence), 14, 3])
    best = None

    for recycle in range(num_recycles):
        # 2. 回收上一轮的结构和 pair 表征
        node_in, edge_in = recycle_embedder(
            prev_node=prev_node,
            prev_edge=prev_edge,
            prev_coords=prev_coords,
            node=node,
            edge=edge,
        )

        # 3. GeoFormer: 50 个 block 同步更新 residue 与 pair 表征
        node_geo, edge_geo, struct_node = GeoFormer50(node_in, edge_in)

        # 4. 结构模块: AF2 风格 IPA/刚体更新，输出原子坐标
        coords, struct_state = StructureModule8(struct_node, edge_geo)

        # 5. pLDDT 置信度头
        per_res_conf = ConfidenceHead(struct_state)
        overall_conf = aggregate_lddt(per_res_conf, coords)

        if (best is None) or (choose_by_confidence and overall_conf > best.conf):
            best = Prediction(coords=coords, plddt=per_res_conf, conf=overall_conf)

        prev_node, prev_edge, prev_coords = node_geo, edge_geo, coords

    return best
```

##### 动机：为什么要摆脱 MSA

AlphaFold2、RoseTTAFold 等方法的关键输入是 MSA：通过同源序列中的协同突变信号推断哪些残基在三维空间中接触。这个设计在同源家族丰富时极强，但存在两个工程与生物学问题。第一，MSA 搜索要访问庞大序列数据库，批量预测时 CPU/I/O 成本很高；第二，orphan protein、噬菌体/宏基因组蛋白、快速进化抗体和短序列常常没有足够同源序列，协同进化信号本身就不可用或噪声很大。

OmegaFold 的假设更接近 Anfinsen dogma：多数蛋白的折叠信息最终由单条氨基酸序列决定，MSA 是有用的统计捷径，但不应是唯一途径。于是它把“进化信息”从在线 MSA 搜索转移到离线语言模型预训练中：OmegaPLM 在海量蛋白序列上学习氨基酸上下文依赖，推理时只需一次序列前向传播。

##### OmegaPLM：从序列产生 node 与 edge

给定序列 \(s=(s_1,\ldots,s_L)\)，OmegaPLM 输出残基表示 \(H\in\mathbb{R}^{L\times d}\) 和由注意力/层间交互汇聚得到的 pair 表示 \(E\in\mathbb{R}^{L\times L\times d_e}\)：

$$
H, E = \Omega\mathrm{PLM}(s)
$$

随后用线性层把 PLM 空间投影到结构预测主干使用的维度：

$$
h_i^{(0)} = W_h\,\mathrm{Norm}(H_i), \qquad
z_{ij}^{(0)} = W_z\,\mathrm{Norm}(E_{ij}) + \phi(s_i, s_j, i-j)
$$

其中 \(h_i\) 是第 \(i\) 个残基的 node representation，\(z_{ij}\) 是残基对 \(i,j\) 的 edge representation，\(\phi\) 表示氨基酸类型、相对位置等输入嵌入。

> 💡 关键：OmegaFold 不是“没有进化信息”，而是把进化/结构统计压缩进 PLM 参数中。推理时不再显式构建 MSA，但模型仍然利用预训练阶段从序列数据库学到的氨基酸共现规律。

##### GeoFormer：用几何一致性修正 pair representation

GeoFormer 是 OmegaFold 区别于“直接把 PLM embedding 接结构头”的核心。每个 GeoFormer block 对 node 和 edge 做四类更新：

1. **edge-biased residue attention**：残基 \(i\) 关注残基 \(j\) 时，把 \(z_{ij}\) 投影成 attention bias；
2. **column attention**：沿序列/伪 MSA 维度更新 residue 表示；
3. **outer product mean**：用更新后的 \(h_i,h_j\) 生成 pair 更新；
4. **geometric attention**：用三元关系 \(i\rightarrow k\rightarrow j\) 平滑 pair 表示，让边之间满足更一致的几何约束。

一个简化的 block 可以写成：

$$
h_i^{\ell+1}
= h_i^\ell
+ \mathrm{Attn}\left(h_i^\ell,\{h_j^\ell\}_{j=1}^L,\; b_{ij}=W_b z_{ij}^\ell\right)
+ \mathrm{Transition}(h_i^\ell)
$$

$$
z_{ij}^{\ell+1}
= z_{ij}^{\ell}
+ \mathrm{OPM}(h_i^{\ell+1},h_j^{\ell+1})
+ \mathrm{GeomAttn}\left(z_{ij}^{\ell}, \{z_{ik}^{\ell}, z_{kj}^{\ell}\}_{k=1}^L\right)
+ \mathrm{Transition}(z_{ij}^{\ell})
$$

直觉上，单个 pair \(z_{ij}\) 预测“残基 \(i\) 和 \(j\) 应该接近”还不够，因为蛋白结构要满足全局几何一致性：如果 \(i\) 接近 \(j\)，\(j\) 接近 \(k\)，那么 \(i,k\) 的关系不能任意变化。GeoFormer 用多层几何注意力持续修正这类不一致。

##### 结构模块与置信度

GeoFormer 输出的 final node 和 pair representation 会送入 AlphaFold2 风格结构模块。结构模块不再只预测 Cα 距离图，而是维护每个残基的局部刚体框架、通过 invariant point attention 更新残基状态，并最终生成最多 14 个原子位置：

$$
X = \mathrm{StructureModule}(h^{\mathrm{geo}}, z^{\mathrm{geo}})
$$

训练目标可理解为 AlphaFold2 系结构预测目标的单序列版本，核心包括坐标误差、距离分布和置信度监督：

$$
\mathcal{L}
= \lambda_{\mathrm{FAPE}}\mathcal{L}_{\mathrm{FAPE}}
+ \lambda_{\mathrm{dist}}\mathcal{L}_{\mathrm{distogram}}
+ \lambda_{\mathrm{conf}}\mathcal{L}_{\mathrm{pLDDT}}
+ \lambda_{\mathrm{torsion}}\mathcal{L}_{\mathrm{torsion}}
$$

其中 FAPE（frame-aligned point error）在局部残基框架中比较预测原子和真实原子，避免全局旋转/平移影响；distogram 约束 pair representation 具有明确的残基距离含义；pLDDT head 学习预测每个残基的局部可靠性。

##### 与 AlphaFold2/RoseTTAFold 的区别

| 维度 | AlphaFold2 / RoseTTAFold | OmegaFold |
|------|---------------------------|-----------|
| 主要输入 | MSA、模板、序列 | 单条序列 |
| 主要信息来源 | 在线同源搜索与协同进化 | 离线 PLM 预训练 + 单序列上下文 |
| 主干结构 | Evoformer / 三轨网络 | OmegaPLM + GeoFormer |
| 推理瓶颈 | MSA 搜索、模板搜索、模型前向 | 模型前向与长序列显存 |
| 低同源蛋白 | 容易因 MSA 浅而退化 | 设计目标就是无 MSA 场景 |
| 高同源常规蛋白 | 通常最强 | 可接近但不稳定超过完整 MSA 方法 |

OmegaFold 的实用价值不只是“更快”，而是把结构预测变成了一个更易批量化的单模型推理任务。对于需要对大量突变体、宏基因组序列或抗体候选做快速初筛的场景，省去 MSA 搜索可以显著降低系统复杂度；随后仍可用 AlphaFold2/AlphaFold3 等更重模型对少量候选做复核。

#### 🧪 练习题

```yaml
question: "OmegaFold 中 GeoFormer 的核心作用是什么？"
options:
  - "在线搜索同源序列并构建 MSA"
  - "把 PLM 产生的残基和残基对表征迭代修正为几何一致的结构表征"
  - "用物理力场对最终 PDB 做能量最小化"
  - "只预测二级结构而不生成三维坐标"
answer: 1
explain: "OmegaFold 的输入不包含 MSA。GeoFormer 接收 OmegaPLM 的 node/pair 表征，通过 edge-biased attention、outer product 和 geometric attention 反复更新几何关系，再交给结构模块生成三维坐标。"
```
