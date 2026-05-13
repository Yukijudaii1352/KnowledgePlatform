### FP8 Parameter AllGather — 低精度权重聚合通信优化

```yaml
id: fp8_allgather
name: FP8 Parameter AllGather
full_name: "FP8 Parameter AllGather (NVIDIA TransformerEngine)"
year: "2024"
org: NVIDIA
paper_url: "https://github.com/NVIDIA/TransformerEngine"
category: comm
parent: zero_pp
motivation: "无损FP8缩放配方降低权重聚合带宽"
```

#### 📝 一句话总结

FP8 Parameter AllGather 在 FSDP/ZeRO 的参数聚合阶段，将每个 rank 的参数分片先量化为 FP8（1 字节）再执行 AllGather，通信量减半的同时通过精细的缩放配方（delayed scaling / current scaling）保持训练精度无损，是 NVIDIA TransformerEngine 中面向 Hopper/Blackwell GPU 的关键通信优化。

#### 🎯 核心要点

- **通信带宽减半**：将 AllGather 的数据类型从 BF16/FP16（2 字节）降为 FP8（1 字节），每次前向/反向的参数聚合通信量减少 50%
- **量化-通信-反量化三阶段流水线**：每个 rank 先将本地参数分片量化为 FP8 + per-tensor scale，AllGather 聚合 FP8 数据，最后反量化回高精度用于计算
- **两种缩放配方**：支持 Delayed Scaling（基于历史 amax 窗口预计算 scale）和 Current Scaling（实时扫描当前 tensor 计算 scale），前者延迟低，后者精度高
- **Float8Tensor 数据结构**：封装 `_data`（uint8 存储）、`_scale_inv`（float32 反缩放因子）、`_fp8_dtype`（E4M3/E5M2），实现量化张量的透明操作
- **FSDP/FSDP2 原生集成**：通过 `prepare_te_modules_for_fsdp` 一键启用，hook 替换 AllGather 路径，对用户训练代码零侵入
- **支持 MXFP8 微缩放**：除 per-tensor scaling 外，还支持 Microscaling FP8（per-block scaling），进一步提升量化精度

#### 🔬 深入细节

![FP8 AllGather 流程示意图](https://raw.githubusercontent.com/NVIDIA/TransformerEngine/main/docs/examples/fp8_primer/FP8_primer_fig1.png)
*图：FP8 数据格式——E4M3 用于前向权重/激活，E5M2 用于反向梯度。FP8 AllGather 利用 E4M3 格式在通信阶段压缩参数数据。*

##### 算法伪代码

```python
# FP8 Parameter AllGather 核心流程
# 来源：NVIDIA TransformerEngine distributed.py

def fp8_all_gather(local_shard, quantizer, group):
    """
    将本地参数分片以 FP8 格式进行 AllGather，通信量减半。
    
    Args:
        local_shard: 本地参数分片 (BF16/FP32), shape [shard_size]
        quantizer: FP8 量化器 (delayed/current scaling)
        group: 通信组
    """
    world_size = get_world_size(group)
    
    # ---- 阶段 1: 量化 (本地计算) ----
    # 将高精度参数分片量化为 FP8
    fp8_shard = quantizer.quantize(local_shard)
    # fp8_shard 包含:
    #   ._data: uint8 tensor, shape [shard_size]  (1 byte/element)
    #   ._scale_inv: float32 scalar               (4 bytes total)
    #   ._fp8_dtype: E4M3 or E5M2
    
    # ---- 阶段 2: AllGather FP8 数据 (通信) ----
    # 通信量 = shard_size × 1 byte × world_size (vs 2 bytes for BF16)
    fp8_data_list = all_gather(fp8_shard._data, group)  # uint8 AllGather
    fp8_full_data = torch.cat(fp8_data_list, dim=0)
    
    # 广播 scale (开销可忽略: 仅 4 bytes × world_size)
    scale_inv = fp8_shard._scale_inv  # per-tensor scale, 共享给所有 rank
    
    # ---- 阶段 3: 反量化 (本地计算) ----
    # 将聚合后的 FP8 数据还原为高精度
    full_param = dequantize(fp8_full_data, scale_inv, fp8_dtype)
    # full_param: BF16/FP32, shape [shard_size × world_size]
    
    return full_param


# ---- FSDP 集成入口 ----
def fsdp_forward_with_fp8_allgather(module, input):
    """FSDP forward hook: 替换默认 AllGather 为 FP8 版本"""
    for fsdp_unit in module.fsdp_units:
        # 原始 FSDP: full_param = all_gather(local_shard)        # BF16, 2x 带宽
        # FP8 FSDP:  full_param = fp8_all_gather(local_shard, q)  # FP8, 1x 带宽
        full_param = fp8_all_gather(
            fsdp_unit.local_shard,
            fsdp_unit.fp8_quantizer,
            fsdp_unit.process_group
        )
        fsdp_unit.restore_param_views(full_param)
    return module(input)
```

##### 动机与背景

在大规模分布式训练中，FSDP（Fully Sharded Data Parallel）/ ZeRO-3 将模型参数分片存储在不同 rank 上，每次前向和反向传播前需要通过 **AllGather** 操作收集完整参数。对于一个 \(\Psi\) 参数的模型，在 \(W\) 个 rank 的 FSDP 中：

$$\text{每次 AllGather 通信量} = \Psi \times b \times \frac{W-1}{W}$$

其中 \(b\) 是每个参数的字节数。使用 BF16 时 \(b=2\)，使用 FP8 时 \(b=1\)，**通信量直接减半**。

对于 GPT-175B 模型（\(\Psi \approx 175 \times 10^9\)），单次 AllGather 在 BF16 下需传输约 350 GB 数据，而 FP8 仅需 175 GB。在训练过程中，前向和反向各需一次 AllGather（若启用 reshard_after_forward），因此每个训练步节省的通信量为：

$$\Delta = 2 \times \Psi \times 1 \times \frac{W-1}{W} \approx 2\Psi \text{ bytes (大规模集群)}$$

> 💡 **关键洞察**：AllGather 的通信量与参数量成正比，而 FP8 量化将每个参数从 2 字节压缩到 1 字节。与梯度压缩不同，参数的 AllGather 是**精确重建**（每个 rank 需要完全相同的参数副本），因此量化方案必须保证精度损失可控。

##### 核心机制：FP8 量化与缩放配方

FP8 有两种格式：**E4M3**（4 位指数 + 3 位尾数，动态范围 ±448）和 **E5M2**（5 位指数 + 2 位尾数，动态范围 ±57344）。参数 AllGather 通常使用 **E4M3** 格式，因为权重需要更高的精度而非更大的动态范围。

由于 FP8 的表示范围有限，直接量化会导致溢出或下溢。TransformerEngine 通过 **缩放因子（scale）** 将张量值映射到 FP8 可表示范围：

$$x_{\text{fp8}} = \text{cast\_to\_fp8}\left(\frac{x}{\text{scale\_inv}}\right), \quad \text{scale\_inv} = \frac{\text{amax}(|x|)}{\text{FP8\_MAX}}$$

其中 \(\text{FP8\_MAX}\) 是 FP8 格式的最大可表示值（E4M3 为 448）。

**Delayed Scaling（延迟缩放）**：

```python
class Float8Quantizer:
    """基于历史 amax 窗口的延迟缩放"""
    def __init__(self, scale, amax, fp8_dtype):
        self.scale = scale          # 基于历史 amax 预计算的缩放因子
        self.amax = amax            # amax 历史窗口
        self.fp8_dtype = fp8_dtype  # E4M3 or E5M2
    
    def quantize(self, tensor):
        # 1. 用预计算的 scale 量化（无需扫描当前 tensor）
        fp8_data = cast_to_fp8(tensor * self.scale, self.fp8_dtype)
        # 2. 同时记录当前 tensor 的 amax，用于更新下一步的 scale
        self.amax.copy_(max(abs(tensor.min()), abs(tensor.max())))
        return Float8Tensor(data=fp8_data, scale_inv=1/self.scale)
```

> ⚠️ **注意**：Delayed Scaling 使用**上一步**的 amax 计算 scale，因此存在一步延迟。如果参数分布剧烈变化，可能导致短暂的精度下降。但在实践中，模型权重的分布变化缓慢，延迟缩放几乎无损。

**Current Scaling（当前缩放）**：

```python
class Float8CurrentScalingQuantizer:
    """实时计算 amax 的当前缩放"""
    def quantize(self, tensor):
        # 1. 扫描当前 tensor 计算 amax
        amax = max(abs(tensor.min()), abs(tensor.max()))
        # 2. 可选：跨 rank AllReduce amax 确保一致性
        if self.with_amax_reduction:
            dist.all_reduce(amax, op=ReduceOp.MAX, group=self.group)
        # 3. 计算 scale 并量化
        scale = FP8_MAX / (amax + epsilon)
        fp8_data = cast_to_fp8(tensor * scale, self.fp8_dtype)
        return Float8Tensor(data=fp8_data, scale_inv=1/scale)
```

Current Scaling 精度更高但引入额外的 amax 计算开销。TransformerEngine 默认使用 Delayed Scaling 以获得最佳性能。

##### 通信流程详解

TransformerEngine 的 `_all_gather_fp8` 实现了完整的 FP8 AllGather 流程：

1. **输入检查**：判断输入是否已经是 `Float8Tensor`。如果是，直接提取 FP8 数据；否则先量化
2. **FP8 数据 AllGather**：对 `uint8` 格式的 FP8 数据执行标准 AllGather，通信量为原始的 50%
3. **Scale 广播**：将 per-tensor 的 `scale_inv`（仅 4 字节 float32）广播给所有 rank
4. **构造 Float8Tensor**：将聚合后的 FP8 数据和 scale 封装为 `Float8Tensor` 返回
5. **延迟反量化**：`Float8Tensor` 支持惰性反量化，仅在实际计算需要时才转换回高精度

```
Rank 0: [shard_0 BF16] --quantize--> [shard_0 FP8 + scale_0]
Rank 1: [shard_1 BF16] --quantize--> [shard_1 FP8 + scale_1]
Rank 2: [shard_2 BF16] --quantize--> [shard_2 FP8 + scale_2]
Rank 3: [shard_3 BF16] --quantize--> [shard_3 FP8 + scale_3]
                    |
                    v  AllGather (FP8 uint8, 通信量减半)
                    |
All Ranks: [shard_0|shard_1|shard_2|shard_3 FP8] + shared scale
                    |
                    v  Dequantize (本地计算)
                    |
All Ranks: [full_param BF16] --> 用于前向/反向计算
```

##### 与传统方法的对比

| 特性 | 标准 AllGather (BF16) | FP8 AllGather | 梯度压缩 (如 DGC) |
|------|----------------------|---------------|-------------------|
| 通信数据类型 | BF16 (2B) | FP8 (1B) | 稀疏 FP32 |
| 带宽节省 | 基准 | **50%** | 99%+ (Top-K) |
| 额外计算 | 无 | 量化/反量化 | 稀疏编码/解码 |
| 精度影响 | 无损 | **近乎无损**（缩放配方保证） | 有损（需动量校正） |
| 适用阶段 | 参数聚合 | 参数聚合 | 梯度同步 |
| 硬件要求 | 任意 | Hopper+ (FP8 原生支持) | 任意 |
| 实现复杂度 | 低 | 中（需量化器管理） | 高（需误差反馈） |

> 💡 **关键优势**：FP8 AllGather 的核心价值在于**几乎零精度损失的 50% 带宽节省**。与梯度压缩方法不同，参数量化的误差不会在训练过程中累积——每步都从 master weight（高精度）重新量化，因此不需要误差反馈等补偿机制。

##### FSDP 集成机制

TransformerEngine 提供 `prepare_te_modules_for_fsdp` 函数，自动为所有 TE 模块启用 FP8 AllGather：

```python
# 用户代码（零侵入）
import transformer_engine.pytorch as te

model = build_model()  # 使用 TE 的 Linear/LayerNorm 等模块
te.prepare_te_modules_for_fsdp(model)  # 一行启用 FP8 AllGather

# 之后正常使用 PyTorch FSDP 包装
model = FSDP(model, ...)
```

内部实现通过 `_fsdp_wrap_all_gather` 方法 hook 每个 TE 模块的 AllGather 路径：
- 检测参数是否已标记为 FP8（`primary_weights_in_fp8` 标志）
- 如果是，调用 `_all_gather_fp8` 替代默认的 BF16 AllGather
- 支持 PyTorch FSDP1 和 FSDP2 两种接口

##### MXFP8 微缩放扩展

除了 per-tensor scaling，TransformerEngine 还支持 **MXFP8（Microscaling FP8）**，即 per-block scaling：

$$x_{\text{mxfp8}}[i] = \text{cast\_to\_fp8}\left(\frac{x[i]}{\text{scale}[i // B]}\right)$$

其中 \(B\) 是 block size（通常为 32）。每 32 个元素共享一个 8-bit scale，额外开销仅为 \(\frac{1}{32}\) = 3.125%，但量化精度显著提升。MXFP8 AllGather 通过 `_all_gather_mxfp8` 实现，同时聚合数据和 per-block scales。

#### 🧪 练习题

```yaml
question: "FP8 Parameter AllGather 相比标准 BF16 AllGather，通信量减少了多少？"
options:
  - "减少 75%，因为 FP8 只有 BF16 的四分之一大小"
  - "减少 50%，因为 FP8 每个元素 1 字节而 BF16 每个元素 2 字节"
  - "减少 87.5%，因为 FP8 只有 1 bit 指数"
  - "不确定，取决于模型参数的分布"
answer: 1
explain: "FP8 每个参数占 1 字节，BF16 每个参数占 2 字节，因此 AllGather 的通信量精确减半（50%）。per-tensor scale 的额外通信开销（4 字节/tensor）相对于参数量可忽略不计。"
```