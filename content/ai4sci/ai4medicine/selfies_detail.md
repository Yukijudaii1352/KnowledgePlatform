### SELFIES — 自引用嵌入式字符串 (SELFIES)

```yaml
id: selfies
name: SELFIES
full_name: 自引用嵌入式字符串 (SELFIES)
year: '2020'
org: University of Toronto
paper_url: https://iopscience.iop.org/article/10.1088/2632-2153/aba947
category: generation
parent: chemical_vae
motivation: 100%有效的分子字符串表示法
```

#### 📝 一句话总结

SELFIES 提出了一种基于形式文法的分子字符串表示方法，通过自引用嵌入式推导规则从根本上保证**任意字符串都对应有效分子**，彻底解决了 SMILES 在生成式模型中大量产生无效分子的问题。

#### 🎯 核心要点

- **100% 鲁棒性**：任意 SELFIES 字符串（包括完全随机字符串）都对应一个化学上有效的分子图
- **双向完备性**：每个分子都可以用 SELFIES 表示，每个 SELFIES 都对应一个有效分子
- **形式文法推导规则**：通过推导状态 \(\mathbf{X}_n\)（\(n=0,1,...,4\)）追踪剩余价键数，自动约束后续原子的键合方式
- **局部信息编码**：分支长度（Branch）和环大小（Ring）以数字形式紧跟标识符之后，消除了 SMILES 中括号配对和环编号的非局部依赖
- **模型无关性**：可直接替换 SMILES 作为任意机器学习模型（VAE、GAN 等）的输入/输出，无需修改模型架构
- **VAE 实验**：在 QM9 数据集上，SELFIES 使 VAE 潜在空间 100% 有效，编码的多样分子数量比 SMILES 多两个数量级
- **GAN 实验**：SELFIES 训练的 GAN 生成 78.9% 多样有效分子，SMILES 仅 18.55%

#### 🔬 深入细节

##### 核心示意图

![SELFIES 与 SMILES 分子表示对比](https://ar5iv.labs.arxiv.org/html/1905.13741/assets/x1.png)
*图 1：以 MDMA 分子为例，对比 SMILES（B）和 SELFIES（C）两种字符串表示方法。SMILES 使用括号表示分支、数字表示环闭合（非局部操作）；SELFIES 将分支长度和环连接距离编码为紧随 Branch/Ring 标识符的数字（局部操作）。*

![SELFIES 推导规则表](https://ar5iv.labs.arxiv.org/html/1905.13741/assets/x2.png)
*图 2：SELFIES 的推导规则表。每个 SELFIES 符号被解释为规则向量（顶部红线），根据当前推导状态 \(\mathbf{X}_n\) 映射到原子或新的推导状态，从而保证化学价键约束。*

##### 算法伪代码

```python
# SELFIES 推导过程伪代码
def decode_selfies(selfies_string):
    """将 SELFIES 字符串推导为分子图"""
    state = X_0          # 初始推导状态
    molecule = ""        # 输出分子 SMILES
    
    for symbol in selfies_string:
        # 查推导规则表：(symbol, state) → (atom/branch/ring, next_state)
        action, next_state = derivation_table[symbol][state]
        
        if action.is_atom():
            molecule += action.atom
            # 状态转移：X_n 中 n 表示下一个原子可用的最大价键数
            state = next_state  # e.g., F → X_1, =C → X_3
            
        elif action.is_branch(N, X_n):
            # 接下来 N 个符号在分支中推导，起始状态为 X_n
            branch = derive_branch(selfies_string, N, X_n)
            molecule += "(" + branch + ")"
            
        elif action.is_ring(N):
            # 当前原子与第 (N+1) 个前驱原子成环
            # 仅在目标原子价键未满时插入
            if target_atom_has_free_valence(N):
                add_ring_bond(molecule, N)
        
        # 若符号在当前状态下无有效操作，则跳过（保证鲁棒性）
    
    return molecule
```

##### 动机与背景：SMILES 的根本缺陷

分子的计算机表示是计算化学和药物设计的基础。自 1988 年 Weininger 发明 SMILES 以来，它一直是分子字符串表示的事实标准。然而，当 SMILES 被用于**生成式模型**（如 VAE、GAN、遗传算法）时，暴露出一个根本性问题：

> ⚠️ 注意：大量生成的 SMILES 字符串不对应有效分子——要么语法无效（如括号不匹配），要么违反化学规则（如原子价键数超限）。

具体而言，SMILES 的无效性来源于两类**非局部依赖**：
1. **括号配对**：分支用 `(` 和 `)` 界定，随机突变可能导致括号不匹配
2. **环编号配对**：环闭合用数字标记（如 `c1ccccc1` 表示苯环），突变可能破坏编号对应关系

以 MDMA 分子为例，对 SMILES 进行单次随机突变后，有效率仅为 **9.9%**；两次突变降至 **3.0%**；三次突变仅 **1.1%**。此前的改进方案（如 DeepSMILES）虽有提升（单次突变 35.1%），但仍远非 100%。

##### 核心机制：形式文法驱动的推导规则

SELFIES 的核心创新是将分子字符串的生成建模为一个**形式文法**（Formal Grammar）的推导过程。其关键设计包括：

**1. 推导状态 \(\mathbf{X}_n\) 追踪价键约束**

推导从初始状态 \(\mathbf{X}_0\) 开始。状态 \(\mathbf{X}_n\) 表示"下一个原子最多可使用 \(n\) 个价键"。每读入一个 SELFIES 符号，根据推导规则表查找当前状态下的映射：

$$
\mathbf{X}_0 \xmapsto{[\text{F}]} \texttt{F}\;\mathbf{X}_1 \xmapsto{[\text{=C}]} \texttt{FC}\;\mathbf{X}_3 \xmapsto{[\text{=C}]} \texttt{FC=C}\;\mathbf{X}_2 \xmapsto{[\text{\#N}]} \texttt{FC=C=N}
$$

例如，`[F]` 在状态 \(\mathbf{X}_0\) 下生成氟原子 F，氟只有 1 个价键，因此下一状态为 \(\mathbf{X}_1\)（剩余 1 个可用键）。`[=C]` 在 \(\mathbf{X}_1\) 下生成碳原子并形成双键，碳有 4 个价键减去双键的 2 个，剩余 2 个给后续，但由于前驱只提供 1 个键，实际根据规则表调整。

> 💡 关键：推导规则表的设计使得**无论输入什么符号序列**，产出的原子序列都自动满足价键约束。如果某个符号在当前状态下"不合法"，规则表会将其映射为一个合法的替代操作。

**2. 局部化的分支与环编码**

- **Branch(N, \(\mathbf{X}_n\))**：`[Branch]` 后紧跟的符号被解释为数字 \(N\)，表示接下来 \(N\) 个符号属于分支内部，分支从状态 \(\mathbf{X}_n\) 开始推导。这完全消除了括号配对问题。
- **Ring(N)**：`[Ring]` 后紧跟的符号被解释为数字 \(N\)，表示当前原子与第 \((N+1)\) 个前驱原子形成环键。仅当目标原子的价键未满时才实际插入环键，否则跳过。

**3. 鲁棒性保证的数学基础**

SELFIES 的 100% 有效性源于以下设计原则：
- 每个符号的解释完全由**当前局部状态**决定，不依赖未来符号
- 推导规则表覆盖了所有可能的 (符号, 状态) 组合，不存在"未定义"情况
- 环闭合采用**条件插入**策略：仅在不违反价键约束时生效

##### 随机突变鲁棒性验证

![随机突变对比实验](https://ar5iv.labs.arxiv.org/html/1905.13741/assets/x3.png)
*图 3：对 MDMA 分子进行 1-3 次随机突变的结果。SMILES 突变后几乎全部无效，而 SELFIES 突变后 100% 产生有效（但不同的）分子。*

##### VAE 潜在空间有效性

![VAE 潜在空间有效性对比](https://ar5iv.labs.arxiv.org/html/1905.13741/assets/x5.png)
*图 5：VAE 潜在空间的有效性分析。上排：通过原点的随机平面上的有效分子比例（红=0%，绿=100%）。SMILES 仅小部分区域有效，SELFIES 整个空间 100% 有效。*

在 QM9 数据集上训练标准 VAE 后，作者分析了潜在空间（241 维）中随机采样点的有效性。使用 SMILES 时，潜在空间中仅有很小比例的点能解码为有效分子；使用 SELFIES 时，**整个潜在空间 100% 有效**。这不仅对分子逆设计至关重要，更使得潜在空间的**可解释性分析**成为可能。

##### 多样性与生成质量

![多样性对比](https://ar5iv.labs.arxiv.org/html/1905.13741/assets/x6.png)
*图 6：VAE 和 GAN 的多样性对比。(A) VAE 潜在空间中 SELFIES 编码的有效多样分子数量比 SMILES 多约 100 倍。(B) GAN 采样 10,000 次，SELFIES 产生 7,889 个不同有效分子，SMILES 最多仅 1,855 个。*

| 指标 | SMILES | SELFIES |
|------|--------|---------|
| 单次突变有效率 | 9.9% | **100%** |
| 双次突变有效率 | 3.0% | **100%** |
| 三次突变有效率 | 1.1% | **100%** |
| VAE 潜在空间有效率 | 小部分 | **100%** |
| VAE 多样分子密度 | 1× | **~100×** |
| GAN 最优多样有效分子 | 1,855 | **7,889** |

##### 与传统方法的对比

| 特性 | SMILES | DeepSMILES | SELFIES |
|------|--------|------------|---------|
| 100% 语法有效 | ❌ | ❌ | ✅ |
| 100% 化学有效 | ❌ | ❌ | ✅ |
| 局部信息编码 | ❌（括号/环号非局部） | 部分改善 | ✅ |
| 模型无关 | ✅ | ✅ | ✅ |
| 可扩展至大分子 | ✅ | ✅ | ✅（扩展规则表） |
| 单次突变有效率 | 9.9% | 35.1% | **100%** |

SELFIES 相比 SMILES 的根本优势在于：它不是在模型层面"修补"无效输出（如后处理过滤或约束解码），而是在**表示层面**从根本上消除了无效分子的可能性。这使得任何生成式模型——无论是 VAE、GAN、强化学习还是遗传算法——都能直接受益，无需针对有效性进行额外适配。

#### 🧪 练习题

```yaml
question: "SELFIES 保证 100% 分子有效性的核心机制是什么？"
options:
  - "使用后处理过滤器移除无效分子"
  - "通过形式文法推导规则和状态追踪，使任意符号序列都映射为合法分子"
  - "限制字符串只能使用预定义的有效分子模板"
  - "训练一个判别器网络来纠正无效输出"
answer: 1
explain: "SELFIES 通过推导状态 X_n 追踪价键约束，并用推导规则表将任意 (符号, 状态) 组合映射为合法操作，从表示层面根本性地保证有效性，而非依赖后处理或模型约束。"
```