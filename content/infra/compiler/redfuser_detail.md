### RedFuser：级联归约算子自动融合框架

```yaml
id: redfuser
name: RedFuser
full_name: "级联归约算子自动融合框架 (RedFuser)"
year: "2026"
org: Alibaba Cloud
paper_url: https://arxiv.org/abs/2603.10026
category: tensor_ir
parent: tvm
motivation: 增量计算突破缓存限制，自动融合级联归约算子
```

#### 📝 一句话总结

RedFuser 把 attention、MoE routing、FP8 per-token quantization + GEMM 等模式统一建模为级联归约，通过自动判定归约函数可分解性、生成融合/增量表达式并降到 TileLang GPU kernel，解决传统编译器难以自动融合多级依赖归约的问题。

#### 🎯 核心要点

- **级联归约抽象**：将多个有数据依赖的 reduction 表示为 chain of reduction trees，刻画每个归约对前序归约结果的依赖
- **融合可行条件**：要求 \(F_i(X[l],D_i)\) 可分解为 \(G_i(X[l]) \otimes_i H_i(D_i)\)，并满足单调代数结构和 distributivity
- **ACRF 自动融合算法**：用固定点分析检查函数是否可分解，并自动实例化 fused expression 与 incremental expression
- **增量计算形式**：把完整缓存前一级输出改为 streaming update，使片上存储从 \(O(L_{k-1})\) 降到 \(O(1)\)
- **两类 GPU 策略**：Single-Segment 在单 CTA 内流式完成长序列归约，Multi-Segment 用多个 CTA 并行处理并合并 partial results
- **TVM/TileLang 集成**：从 PyTorch/Relax/TIR 识别级联归约子图，tensorization 到 TileOp，再由 TileLang 做线程映射、pipeline、MMA/WGMMA/TMA 等硬件优化
- **覆盖场景**：论文展示 MHA/MLA、MoE routing、FP8 Quant+GEMM，以及 variance、moment of inertia 等非 ML 级联归约

#### 🔬 深入细节

![RedFuser 级联归约融合前后对比](https://arxiv.org/html/2603.10026v1/figs/fuse.png)
*图：RedFuser 将相邻 reduction tree 在同一层融合，输入只加载一次，并减少对前序归约结果的重复内存访问。来源：论文 Figure 3(b)*

```python
# RedFuser Automatic Cascaded Reductions Fusion (ACRF) 简化伪代码
def acrf(F_i, reduce_op):
    # 1. 根据归约算子选择兼容的乘法型操作 otimes_i
    # max/min/topk -> +, sum/gemm/inner_product -> *, prod 可转到 log-sum
    otimes = lookup_compatible_operator(reduce_op)

    # 2. 固定点分析：选择常量输入，使 F_i(x0, d0) 在 otimes 下可逆
    x0, d0 = choose_fixed_point(F_i, otimes)
    if not is_invertible(F_i(x0, d0), otimes):
        return "NotFusable"

    # 3. 检查可分解恒等式
    # F(x,d) otimes F(x0,d0) == F(x,d0) otimes F(x0,d)
    if not symbolic_equal(
        otimes(F_i("x", "d"), F_i(x0, d0)),
        otimes(F_i("x", d0), F_i(x0, "d")),
    ):
        return "NotFusable"

    # 4. 自动构造 G 和 H，并实例化融合/增量表达式
    G = lambda x: F_i(x, d0)
    H = lambda d: otimes(F_i(x0, d), inverse(F_i(x0, d0), otimes))

    fused = instantiate_fused_reduction(G, H, reduce_op, otimes)
    incremental = instantiate_incremental_reduction(G, H, reduce_op, otimes)
    return fused, incremental
```

##### 1. 级联归约为什么难以自动融合

普通 elementwise fusion 的依赖是逐元素的，producer 和 consumer 通常可以按相同索引合并。级联归约不同：第 \(i\) 个归约需要等待前 \(i-1\) 个归约的根节点结果 \(D_i=\{d_1,\dots,d_{i-1}\}\)。例如 safe softmax 先做 max reduction 得到 \(m\)，再用 \(m\) 做 exp-sum reduction 得到 \(t\)，最后用 \(m,t\) 归一化并乘 \(V\)。传统并行归约会把每个 reduction 拆成多级树，每级产生 partial results，多个 reduction tree 被串成链后，后一个 tree 往往要重新读输入和前序根节点结果。

RedFuser 的形式化定义是：

$$
d_i = \underset{l=1}{\overset{L_0}{R_i}} F_i(X[l],D_i)
$$

其中 \(R_i\) 是第 \(i\) 个归约，底层结合算子是 \(\oplus_i\)。如果只按这个定义执行，\(d_i\) 的计算必须等待 \(D_i\) 的最终根节点，无法把不同 reduction 的同层 partial results 放在一起处理。这正是 FlashAttention 手写 online softmax 能快、通用编译器却难以自动复现的原因。

##### 2. 融合的代数条件和固定点分析

RedFuser 的核心是把 \(F_i\) 拆成输入相关部分和依赖结果相关部分：

$$
F_i(X[l],D_i)=G_i(X[l])\otimes_i H_i(D_i)
$$

同时要求 \((S,\otimes_i)\) 是交换幺半群，并且归约算子 \(\oplus_i\) 对 \(\otimes_i\) 满足分配律：

$$
(s_1\oplus_i s_2)\otimes_i s_3
=
(s_1\otimes_i s_3)\oplus_i(s_2\otimes_i s_3)
$$

在一般函数空间里自动找 \(G_i,H_i\) 很难。论文利用 ML workload 的归约类型有限这一事实，把 max/topk/min/sum/gemm/prod 映射到少数兼容 \(\otimes_i\)，再用固定点分析验证可分解性。若存在固定点 \((x_0,d_0)\)，并且：

$$
F_i(x,d)\otimes_i F_i(x_0,d_0)
=
F_i(x,d_0)\otimes_i F_i(x_0,d)
$$

则可取：

$$
G_i(x)=F_i(x,d_0),\qquad
H_i(d)=F_i(x_0,d)\otimes_i F_i(x_0,d_0)^{-1}
$$

这个判定可以用 SymPy 这类符号计算实现。它把“能不能融合”从人工规则变成了可检查的代数恒等式。

##### 3. 从链式 reduction tree 到同层融合

在归约树第 \(k\) 层，RedFuser 不再让第 \(i\) 个 reduction 等前序 reduction 的最终根节点，而是让它依赖前序 reduction 在同一层、同一 segment 的 partial results。论文推导出的第 \(k>1\) 层融合形式可概括为：

$$
\hat d_i^k =
\underset{j_{k-1}=l^k_{\mathrm{1st}}}{\overset{l^k_{\mathrm{last}}}{R_i}}
\left(
\hat d_i^{k-1}
\otimes_i H_i(\hat D^{k-1})^{-1}
\otimes_i H_i(\hat D^k)
\right)
$$

直觉是：先把上一层 partial result 中“旧依赖上下文”的影响除掉，再乘上“当前层依赖上下文”的影响。这样，同一层上的多个 reduction tree 可以合并成一个更大的 tree，输入 \(X\) 和同层依赖 \(\hat D^k\) 可以留在寄存器或 shared memory，而不是每个 reduction 都重新从全局内存读。

如果 \(H_i(\cdot)\) 在 \(\otimes_i\) 下不可逆，RedFuser 在附录中给出 reversibility repair：不可逆时把 \(H_i\) 修正为幺元 \(e\)，保证表达式可计算，并在可逆区域保持与原式一致。这是让自动融合能覆盖工程边界情况的关键。

##### 4. 增量计算突破片上缓存限制

融合表达式减少了重复内存访问，但非增量版本仍可能要缓存完整的上一层 outputs，片上空间随 \(L_{k-1}\) 增长。RedFuser 的 incremental form 把当前层输出写成 streaming state update。对第 \(k>1\) 层，处理第 \(L\) 个输入后：

$$
\hat d^k[L]
=
\hat d^k[L-1]\otimes_i H_i(\hat D^k[L-1])^{-1}\otimes_i H_i(\hat D^k[L])
\oplus_i
\hat d^{k-1}\otimes_i H_i(\hat D^{k-1})^{-1}\otimes_i H_i(\hat D^k[L])
$$

这说明状态只依赖前一时刻的 \(\hat d^k[L-1]\)、当前输入 \(\hat d^{k-1}\) 或 \(X[L]\)，以及当前依赖上下文。片上存储复杂度从 \(O(L_{k-1})\) 降为 \(O(1)\)。Attention 的特例就是 online softmax：维护 running max \(m\)、归一化分母 \(t\) 和输出累加 \(O\)，每读一个 key/value tile 就重新缩放旧状态并合入新 tile。

##### 5. 编译器流水线和 GPU codegen

RedFuser 建在 TVM 上。前端把 PyTorch 等模型降到 Relax graph，识别 cascaded reduction 子图后降到 TIR；预处理包括 function inlining 和 loop reordering；再通过 AST visitor 抽取数学表达式，交给 ACRF。成功融合后，RedFuser 同时生成 Single-Segment 和 Multi-Segment 两类 TIR：前者用增量计算在单 CTA 内处理长序列，避免 inter-block 同步；后者把输入分成多个 segment 由多个 CTA 并行处理，再用融合公式合并 partial results。

之后是 tensorization。RedFuser 把 scalar loop nest blockize 成 tile，显式插入 global I/O 的 load/store，推断 register/shared memory scope，并压缩 buffer footprint；随后把 tile 映射成 TileOp，例如 `copy`、`gemm`、`reduce`、`parallel`、`fill`。TileLang 再负责线程级 mapping、software pipeline、warp 间任务划分和硬件路径选择：Ampere 上用 `cp.async`/MMA，Hopper 上用 TMA/WGMMA，并做 vectorization 和 bank conflict avoidance。最终 auto-tuning 搜索 block tile size、threads per block、pipeline depth、segment 数等参数。

> 💡 关键：RedFuser 不是为 FlashAttention 写死一条规则，而是把“online softmax 类技巧”抽象成可分解级联归约的通用代数转换，再用 TVM/TileLang 落到 GPU kernel。

#### 🧪 练习题

```yaml
question: "RedFuser 的增量计算形式主要解决什么问题？"
options:
  - "把所有归约都改成 elementwise 运算"
  - "避免缓存完整前一级归约输出，使片上存储从 O(L) 降到 O(1)"
  - "删除归约算子的结合律要求"
  - "强制所有 kernel 只使用一个 warp"
answer: 1
explain: "增量形式用上一状态和当前输入流式更新当前层 partial result，不需要把上一层全部结果保存在片上缓存中。"
```
