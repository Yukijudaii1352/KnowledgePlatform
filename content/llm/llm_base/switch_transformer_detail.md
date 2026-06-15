### Switch Transformer: 面向万亿参数模型的简单高效稀疏性

#### 📝 一句话总结
Switch Transformer通过将标准Transformer的FFN层替换为基于Top-1路由的稀疏专家混合（MoE）模块，在相同计算资源下实现高达7倍的预训练加速，成功将语言模型规模扩展至万亿参数，同时保持简洁性和训练稳定性。

#### 🎯 核心要点
1. **简化稀疏路由**：采用Switch Routing（k=1，即每个token仅路由给一个专家），取代传统Top-k路由，消除了复杂的k-way散度和reduce操作，大幅降低计算开销。
2. **可微分负载均衡**：引入辅助损失（load balancing loss）鼓励token在专家间均匀分配，并结合容量因子（capacity factor）机制控制每个专家的最大处理token数，避免显存溢出与token丢弃。
3. **训练稳定性技巧**：提出selective precision（在MoE路由器部分使用float32，其余bfloat16）实现高精度与高速度兼得；专家参数从dense模型权重初始化，加速收敛并降低方差。
4. **高效扩展性**：在固定计算量（FLOPs）下，增加专家数量持续提升预训练质量；以步数和时间为基准的扩展实验均证实Switch Transformer优于同计算量下的稠密模型。
5. **下游迁移与压缩**：稀疏预训练模型可直接fine-tune用于下游任务（SuperGLUE等），且可通过蒸馏将99%的参数量压缩至小型稠密模型，仍保留30%的稀疏模型质量增益。
6. **多语言与万亿参数**：在101种语言上mSwitch-Base全面超越mT5-Base；成功预训练万亿参数Switch-XXL模型，在C4语料库上实现4倍加速于T5-XXL。

#### 🔬 深入细节

**1. 问题背景与动机**
- 传统稠密Transformer（如T5）的算力需求随模型规模平方增长（$O(L^2)$），难以向万亿参数扩展。
- 稀疏MoE（Mixture-of-Experts）通过将FFN层拆分为多个独立的“专家”子网络，每个token仅激活部分专家，将计算量从平方降为线性或亚线性，但现有实现（如GShard）仍存在路由复杂、负载不均、训练不稳定等挑战。

**2. Switch Transformer架构**
- **基础结构**：在标准Transformer的Block中，每隔一个FFN层替换为MoE层（通常每隔1层替换），其余层保持不变（包括自注意力层和非MoE的FFN）。
- **Switch Routing**：
  - 每个token通过Router网络（一个小型全连接层）计算出与各专家匹配的分数 $s_i$，取最大分数的专家 $p = \operatorname{argmax}(s_i)$，将token仅发送给专家 $p$。
  - 对比Top-k（k≥2），Switch Routing无需额外的散度和归约，实现更简单，且同等计算量下可容纳更多专家或更大模型维度。
- **容量因子（Capacity Factor, CF）**：
  - 每个专家的容量 $C = \text{CF} \times \frac{\text{tokens_per_batch}}{\text{num_experts}}$，CF>1.0时为溢出token分配额外空间，CF<1.0时强制丢弃超出容量token。
  - 实验表明CF=1.0~1.25即可平衡效率与质量，丢弃率<1%。
- **负载均衡损失**：
  - 辅助损失 $\mathcal{L}_{\text{aux}} = \alpha \cdot N \cdot \sum_{i=1}^N f_i \cdot P_i$，其中 $f_i$ 是分配给专家 $i$ 的token比例，$P_i$ 是Router分配给专家 $i$ 的平均概率。
  - 该损失鼓励均匀分配，与主任务损失联合优化，$\alpha$ 为平衡系数（通常 $10^{-2}$ 量级）。

**3. 训练稳定性技术**
- **Selective Precision**：标准bfloat16训练MOE时易发散，Switch Transformer在Router计算和Expert内部部分操作使用float32，其余低精度，达到bfloat16的速度（仅慢约10%~20%）与float32的稳定性。
- **专家初始化**：新增加的MoE层专家权重从已训练的dense FFN权重初始化，所有专家共享相同初始值，再在训练中分化。实验表明该方法能大幅降低早期训练方差并加速收敛。
- **专家丢弃（Expert Dropout）**：在训练初期以一定概率随机丢弃某些专家输出，作为一种正则化手段，提升模型鲁棒性并轻微提升下游性能。

**4. 实验与扩展性**
- **步数基准扩展**：固定训练步数（如100k步），增加专家数（2→256个），Switch-Base模型在C4困惑度持续下降，显示出超线性的扩展收益（更低的perplexity和更高的速度）。
- **时间基准扩展**：固定实际训练时间（TPU 4x4拓扑），Switch Transformer相比T5-Large达到约7倍加速；在16-expert配置下，以相同训练时长获得显著更低的perplexity。
- **与稠密模型对比**：给定相同FLOPs预算，Switch模型预训练质量优于稠密模型；即使用更大规模的稠密模型对比，Switch仍具优势，证明稀疏性的效率增益。
- **下游任务Fine-tuning**：Switch-Base在SuperGLUE上取得81.3分，相比T5-Base（74.6）有显著提升，且仅需更少量训练步数即达峰值。
- **蒸馏**：将7.4B参数的Switch-Base（已fine-tune）蒸馏至223M的T5-Base，模型尺寸缩减99%，但仍保留30%的质量增益（SuperGLUE从74.6提升至76.6），验证稀疏知识可被高效压缩至小模型。
- **多语言**：在mC4（101种语言）上，mSwitch-Base相比mT5-Base，所有语言负对数困惑度（NLL）均显著提升，尤其低资源语言改善明显。
- **万亿参数**：Switch-XXL（64专家，~1.6T参数）在C4上训练，达到T5-XXL（11B参数）的同等质量时，所需计算步数减少4倍；且通过优化模型并行与数据并行策略，成功在TPU v3 Pod上实现高效训练。

**5. 设计决策消融**
- **容量因子影响**：CF=1.0时约2% token被丢弃，CF=1.25降至<0.1%，且质量损失极小；CF<1.0导致质量明显下降，因此推荐CF≥1.0。
- **路由频率**：每隔1层使用MoE（every other layer）性能最佳；每层都使用MoE会导致显存和计算开销过大。
- **专家数**：增加专家数并保持每步激活的专家总数不变（通过Top-1实现），持续提升质量，说明稀疏性本身带来容量增益。

**6. 实现与代码**
- 官方提供JAX和Tensorflow两种实现，代码开源（https://github.com/google-research/t5x）。
- 模型并行与数据并行结合：专家按维度分区，结合mesh-tensorflow实现高效分布式训练。

**7. 总结与影响**
Switch Transformer以极简的Top-1路由设计，成功克服MoE长期以来的工程实现与训练稳定性难题，将稀疏模型的效率优势转化为实际预训练加速和规模扩展，为后续GLaM、PaLM等大型MoE模型奠定基础。其核心贡献在于证明：**简单的稀疏路由+精心设计的负载均衡和训练技巧即可将Transformer推向万亿参数，且保持高可用性**。
