### Linear Layouts：F2域线性映射张量布局编译

```yaml
id: linear_layouts
name: Linear Layouts
full_name: "F2域线性映射张量布局编译 (Linear Layouts)"
year: "2026"
org: NVIDIA
paper_url: https://arxiv.org/abs/2505.23819
category: tensor_ir
parent: triton
motivation: F2域线性映射建模布局，自动推导布局转换消除组合爆炸
```

#### 📝 一句话总结

Linear Layouts 将 Triton GPU 后端中的 tensor layout 统一表示为 \(\mathbb{F}_2\) 上的线性映射，用矩阵组合、求逆和子空间分析自动处理 layout 定义、传播、转换、swizzle 和硬件指令 lowering，解决传统逐布局手写转换导致的组合爆炸和布局 bug。

#### 🎯 核心要点

- **布局即线性映射**：把 register/thread/warp 或 memory offset 的二进制位映射到逻辑 tensor 坐标位，所有运算在 \(\mathbb{F}_2\) 上完成
- **统一覆盖 Triton 布局族**：Blocked、MMA、MMA input、Sliced、Unswizzled、Swizzled memory layout 都可表达为 linear layout
- **组合式布局构造**：用 composition、product、left division、right inverse 等矩阵运算替代手写 layout 接口
- **通用 layout propagation**：在 Triton GPU backend 中把 layout 作为一等对象，forward/backward 传播并插入或消除 layout conversion
- **自动硬件 lowering**：通过 \(A^{-1}\circ B\)、left division 和子空间分析自动选择 vectorized load/store、ldmatrix/stmatrix、warp shuffle、swizzle 等路径
- **最优 swizzling**：构造共享内存布局以最大化读写向量化并最小化 bank conflict
- **效果**：论文报告修复多类 Triton legacy layout 问题，在微基准上最高 14.20x，在 265 个真实 benchmark case 上最高 1.40x、平均 1.07x

#### 🔬 深入细节

![Linear Layouts 论文 Figure 1：两个 warp 上的不同布局](https://arxiv.org/html/2505.23819v5/x1.png)
*图：layout A 把 16x16 tensor 分布到两个 warp、32 个线程和每线程寄存器中，展示物理执行资源到逻辑 tensor 坐标的映射。来源：论文 Figure 1(a)*

```python
# Linear Layouts 的核心操作伪代码
class LinearLayout:
    def __init__(self, matrix, in_labels, out_labels):
        # matrix entries are in F2: add = xor, multiply = and
        self.M = matrix
        self.in_labels = in_labels      # e.g. Reg x Thr x Wrp
        self.out_labels = out_labels    # e.g. tensor dim bits

    def compose(self, other):
        # self ∘ other, over F2
        return LinearLayout(gf2_matmul(self.M, other.M),
                            other.in_labels, self.out_labels)

    def product(self, other):
        # block diagonal direct product of independent layouts
        return LinearLayout(block_diag(self.M, other.M),
                            self.in_labels + other.in_labels,
                            self.out_labels + other.out_labels)

    def right_inverse(self):
        # solve M X = I over F2; used to recover hardware indices
        return LinearLayout(gf2_gaussian_elimination(self.M),
                            self.out_labels, self.in_labels)


def convert_layout(src_A, dst_B):
    # Convert values distributed by layout A into layout B.
    # B is surjective, so choose a sparse right inverse to reduce movement.
    X = dst_B.right_inverse().compose(src_A)
    return lower_exchange_by_register_perm_shuffle_or_shared_memory(X)
```

##### 1. 为什么 GPU layout 适合用 \(\mathbb{F}_2\) 表示

GPU tensor layout 本质上是“逻辑 tensor 元素由哪个 warp、thread、register 或 memory bank 持有”的映射。现代 GPU 的 warp size、tile size、寄存器分组、MMA/WGMMA operand shape 通常都是 2 的幂，因此坐标可以自然拆成二进制位。Linear Layouts 的定义是：

$$
L:U\rightarrow V
$$

其中 \(U,V\) 是带标签的 \(\mathbb{F}_2\) 向量空间。输入空间可以是 \(\mathrm{Reg}\times \mathrm{Thr}\times \mathrm{Wrp}\)，输出空间可以是逻辑 tensor 的 \((i,j)\) 坐标位。矩阵乘法在 \(\mathbb{F}_2\) 上执行，也就是加法为 XOR、乘法为 AND。论文中的 layout A 可以写成矩阵 \(A\)，物理资源位向量 \(v\) 的逻辑位置为：

$$
w=A v,\qquad w_{0:3}=j,\quad w_{4:7}=i
$$

这个表达把原本散落在 Triton 后端中的 layout 规则变成了一个可计算对象。比如 thread、warp 或 register 中的某一位是否影响 tensor 第 \(i\) 维，只需要看矩阵对应列；broadcast 或重复数据则表现为零列或非满射/非单射结构。

##### 2. 组合、product、求逆如何消除手写转换爆炸

传统 Triton legacy layout 需要每个 layout 实现自己的接口，例如 elements per thread、contiguity、indexing、layout-to-layout conversion。若有 \(N\) 种布局，最坏需要 \(O(N^2)\) 个转换路径。Linear Layouts 用少数矩阵运算替代这些 case-by-case 代码。

composition 表示连续布局变换：

$$
L_2\circ L_1:U\rightarrow W,\qquad
M_{L_2\circ L_1}=M_{L_2}M_{L_1}
$$

product 用 block diagonal 矩阵把独立子布局拼成更复杂布局：

$$
M_{L_1\times L_2}=
\begin{bmatrix}
M_{L_1} & 0\\
0 & M_{L_2}
\end{bmatrix}
$$

right inverse 用高斯消元求解 \(MX=I\)，用于从逻辑 tensor 坐标恢复硬件资源索引；left division 则检查一个布局是否能分解出某个硬件指令 tile \(T\)。这些操作让 Blocked、MMA、Sliced、Swizzled 等布局共享同一套数学接口，而不是为每种组合手写 conversion。

##### 3. Triton layout engine：anchor、传播和 rematerialization

集成到 Triton 后，Linear Layouts 先为一些操作分配 anchor layout：global memory load/store 往往偏向 blocked layout，`tt.dot` 这类操作需要 MMA/WGMMA 相关 layout。随后 layout engine 做 forward pass，把 layout 沿 use-chain 传播；遇到多输入冲突时按启发式合并或插入 conversion。再做 backward pass，把 conversion 沿 def-chain 反向 rematerialize；如果链上的操作足够便宜，就重算中间值而不是搬运 layout。

这个机制的关键收益在 shape operations 上。`tt.trans`、`tt.reshape`、`tt.join`、`tt.split`、`tt.expand_dims`、`tt.broadcast` 等操作在合适 layout 下可以是 no-op。论文证明 distributed layout 家族对这些 shape op 前向/后向闭包。legacy Triton 不能表示“转置后的 MMA layout”这类布局，因此常常插入不必要的 shared memory conversion；linear layout 可以直接生成新的矩阵表示，让 layout propagation 穿过 shape op。

##### 4. 从矩阵转换到硬件指令

给定源 distributed layout \(A\) 和目标 layout \(B\)，layout conversion 是：

$$
B^{-1}\circ A
$$

因为 \(B\) 通常是满射而不一定可逆，编译器选择一个 right inverse，并用最小 Hamming weight 的解减少不必要的数据移动。如果变化只在 register 子空间内，lowering 成 register permutation；如果 warp 维度保持 identity，则可用 warp shuffle；如果必须经过 memory，则进一步选择 shared memory load/store、`ldmatrix`、`stmatrix` 等 SIMD primitive。

对于某条 SIMD 指令，论文用 left division 判定能否 lowering：

$$
\text{instruction with tile }T\text{ can lower layout }L
\iff L /_\ell T\text{ exists}
$$

直觉是：如果 layout 矩阵左侧能分解出硬件指令要求的小 tile，那么剩余矩阵描述的就是重复应用该指令覆盖整个 tensor 的方式。这个判定把 “这个 layout pair 是否能用 ldmatrix” 从手写模式匹配变成矩阵可除性检查。

##### 5. 最优 swizzling 和 bank conflict

共享内存 layout 可写成：

$$
M:\mathbb{F}_2^v\times \mathbb{F}_2^b\times \mathbb{F}_2^s\rightarrow \mathbb{F}_2^d
$$

其中 Vec 表示向量化维度，Bank 表示 bank index，Seg 表示 segment index。目标是在最大化 vectorization 的同时，让不同 thread 在同一 transaction 中尽量访问不同 bank。论文用子空间 \(P=\operatorname{span}(M_{\mathrm{Vec}}\cup A_{\mathrm{Bank}})\cup\operatorname{span}(M_{\mathrm{Vec}}\cup B_{\mathrm{Bank}})\) 描述潜在冲突空间，再寻找尽可能大的 segment 子空间 \(H\)，使得：

$$
P\cap \operatorname{span}(H)=\{0\}
$$

如果这个交集非零，就意味着不同线程可能落到同一 bank 的不同 segment，产生 bank conflict。Linear Layouts 自动构造 swizzled memory layout \(M\)，在无法完全避免冲突时也选择冲突最小的补空间。这使得复杂 swizzle 不再是针对某个 MMA layout 的硬编码技巧，而是可由任意 linear layout 推导。

##### 6. 工程效果：robustness 和性能同时提升

论文报告 legacy Triton 中约 12% GitHub issue 与 layout 相关。Linear Layouts 的价值不只在峰值性能，还在“任何可线性表达的 layout 都能走同一套 lowering”。例如 contiguous load/store 不再只靠“最快变化维”启发式，而是求最大 \(u\)，使得 \(L^{-1}_{\mathrm{Reg}}(i)=i\) 对 \(i\le u\) 成立；broadcast 后哪些 thread/warp 持有重复数据，可通过矩阵零列识别；mixed precision matmul 中 MXFP4 scale 的 broadcast 可由 reshape/transpose/broadcast 的 layout propagation 自动解决。

在实验中，Triton-Linear 修复了多种 MMA Input、Sliced<MMA>、Custom layout 的 pass rate 问题，减少 shared memory 指令，并在 gather、layout conversion、MXFP4 matmul 等微基准上显著加速。真实 TritonBench 上的平均收益较小但稳定，这符合它的定位：它不是单个算子的特殊优化，而是让后端 layout 系统从手工枚举变成可组合的线性代数基础设施。

> 💡 关键：Linear Layouts 把“布局是编译器后端里的特殊属性”改成“布局是 \(\mathbb{F}_2\) 上可组合、可求逆、可分析的矩阵”，因此 conversion 和 hardware lowering 可以由通用算法推导。

#### 🧪 练习题

```yaml
question: "Linear Layouts 用 F2 线性映射表示 tensor layout 的核心好处是什么？"
options:
  - "让所有张量都必须按 row-major 存储"
  - "把布局定义、组合、转换和硬件指令 lowering 统一成矩阵运算，避免为每对布局手写转换"
  - "取消 Triton 中的所有 MMA/WGMMA 指令"
  - "只支持没有 swizzle 的共享内存布局"
answer: 1
explain: "布局被表示为 F2 上的矩阵后，composition、right inverse、left division 和子空间分析可以通用处理 layout propagation、conversion、vectorization 与 swizzling。"
```
