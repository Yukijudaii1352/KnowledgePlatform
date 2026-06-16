### DALI

```yaml
id: dali
name: DALI
full_name: NVIDIA数据加载库 (NVIDIA DALI)
year: '2018'
org: NVIDIA
paper_url: https://developer.nvidia.com/dali
category: cache
parent: —
motivation: GPU预处理,消除CPU瓶颈
```

#### 📝 一句话总结

DALI 提出了一套 GPU 加速的数据加载与预处理流水线，把解码、裁剪、缩放、归一化、随机增强等输入管线操作从深度学习框架的 CPU dataloader 中解耦出来，解决多 GPU 训练中 GPU 等待 CPU 预处理的瓶颈。

#### 🎯 核心要点

- **图式化 Pipeline**：用 `Pipeline` 封装符号化数据处理图，节点由 reader、decoder、random generator、augmentation operator 与输出 `DataNode` 组成
- **CPU/Mixed/GPU 三阶段执行**：`cpu` 负责读取和轻量处理，`mixed` 负责 CPU 输入到 GPU 输出的混合算子（典型是 JPEG 解码），`gpu` 负责 GPU 上的后续增强
- **异步预取队列**：通过 `exec_async`、`exec_pipelined` 与 `prefetch_queue_depth` 提前准备 batch，隐藏预处理延迟
- **批处理与框架适配**：统一以 batch 为调度单位，并提供 PyTorch、TensorFlow、MXNet、PaddlePaddle 等迭代器接口
- **格式和数据源抽象**：支持文件目录、LMDB、RecordIO、TFRecord、WebDataset、ExternalSource 等多种输入形式，降低数据格式与框架绑定
- **可调设备放置**：同一增强图中可显式选择 CPU、Mixed 或 GPU backend，在 GPU 占用、CPU/GPU 比例和吞吐之间做工程权衡

#### 🔬 深入细节

![DALI 在训练/推理输入流水线中的位置](https://developer-blogs.nvidia.com/wp-content/uploads/2021/10/RAPIDSData_Pic2-625x278.png)
*图：DALI 将输入数据、解码、GPU 加速增强和框架训练/推理连接起来。来源：NVIDIA Technical Blog, Rapid Data Pre-Processing with NVIDIA DALI*

![DALI CPU/Mixed/GPU 分阶段流水线](https://developer-blogs.nvidia.com/wp-content/uploads/2021/10/GPU-Accelerated_Pic4-625x171.png)
*图：一个典型图像管线中，Loader 在 CPU，Decode 使用 Mixed backend，Resize/Augment 在 GPU。来源：NVIDIA Technical Blog, Figure 3*

```python
# DALI 核心流水线伪代码：读取 -> mixed 解码 -> GPU 增强 -> 框架迭代
from nvidia.dali import fn, pipeline_def
from nvidia.dali.plugin.pytorch import DALIGenericIterator

@pipeline_def(batch_size=256, num_threads=8, device_id=0,
              exec_pipelined=True, exec_async=True,
              prefetch_queue_depth=2)
def imagenet_train_pipeline(data_dir):
    encoded, labels = fn.readers.file(file_root=data_dir,
                                      random_shuffle=True,
                                      name="Reader")
    images = fn.decoders.image_random_crop(encoded, device="mixed")
    images = fn.resize(images, resize_x=256, resize_y=256, device="gpu")
    mirror = fn.random.coin_flip(probability=0.5)
    images = fn.crop_mirror_normalize(
        images,
        crop_h=224,
        crop_w=224,
        mean=[0.485 * 255, 0.456 * 255, 0.406 * 255],
        std=[0.229 * 255, 0.224 * 255, 0.225 * 255],
        mirror=mirror,
        device="gpu",
    )
    return images, labels.gpu()

pipe = imagenet_train_pipeline(data_dir="/imagenet")
pipe.build()
loader = DALIGenericIterator([pipe], ["data", "label"], reader_name="Reader")

for batch in loader:
    x = batch[0]["data"]
    y = batch[0]["label"]
    loss = model_step(x, y)
```

**动机与背景：CPU dataloader 成为 GPU 训练的长尾瓶颈**

传统训练管线通常由框架 dataloader 在 CPU 上完成文件读取、JPEG/PNG 解码、随机裁剪、颜色扰动、resize、layout 转换和归一化，然后再把结果拷贝到 GPU。早期模型的 GPU 计算时间远大于输入预处理时间，这条路径还能被训练计算掩盖；但 Volta/Ampere 之后 Tensor Core 显著提高吞吐，多 GPU 服务器能在很短时间内消耗一个 batch，输入管线反而变成关键路径。DALI 的设计目标不是“缓存某个 batch”，而是把输入处理改成可调度、可并行、可异步预取的执行图，让 GPU 不再等待 CPU 串行增强。

**核心机制：Pipeline 是静态图，运行时按设备阶段调度**

DALI 的中心对象是 `Pipeline`。用户用 Python 定义图，但图在 `build()` 时被构造，后续迭代不再执行 Python 控制流，而是执行已知的 operator graph。每个 operator 根据输入和 `device` 参数被放到 `cpu`、`mixed` 或 `gpu` backend：`cpu` 节点产生 CPU TensorList；`mixed` 节点接收 CPU 输入并产生 GPU 输出，典型是硬件友好的图像解码；`gpu` 节点继续处理 GPU TensorList。这个划分的关键价值是减少不必要的 CPU/GPU 往返，尤其 DALI 不鼓励 GPU 到 CPU 的反向传输，因为那会重新引入同步和 PCIe 开销。

$$
T_{\text{native}} \approx T_{\text{read}} + T_{\text{decode}} + T_{\text{augment}} + T_{\text{H2D}} + T_{\text{train}}
$$

在 DALI 的流水线中，不同 batch 的阶段可以重叠执行，稳定状态下单步时间更接近最慢阶段而不是所有阶段之和：

$$
T_{\text{DALI}} \approx \max(T_{\text{cpu-stage}}, T_{\text{mixed-stage}}, T_{\text{gpu-stage}}, T_{\text{train}})
$$

> 💡 关键：DALI 的“GPU 预处理”不是简单把所有算子搬到 GPU，而是把输入图拆成 CPU/Mixed/GPU 阶段并异步流水化；最优设备放置取决于模型 GPU 占用率、CPU 核数、解码格式和增强复杂度。

**异步预取：把不稳定的预处理时间移出训练关键路径**

训练迭代通常要求每一步拿到一个完整 batch；如果某个 batch 的图像尺寸、压缩率或增强分支导致预处理变慢，GPU 就会空等。DALI 通过预取队列提前计算未来 batch，`prefetch_queue_depth=2` 表示运行时尽量让后续两个 batch 保持 ready 或 in-flight。预取队列可把单个慢 batch 的抖动吸收掉，使框架迭代器看到的是稳定的 `next()` 输出。其直觉可以写成：

$$
Q_{t+1} = \min(Q_{\max}, Q_t + r_{\text{prep}} - r_{\text{train}})
$$

当平均预处理速率 \(r_{\text{prep}}\) 不低于训练消耗速率 \(r_{\text{train}}\)，队列就能维持非空，GPU 利用率由模型计算决定；当 \(r_{\text{prep}}\) 长期落后，队列耗尽，输入管线仍会暴露为瓶颈。DALI 因此也提供性能调优面：增加 `num_threads`、把 decode 改为 `mixed`、把几何/颜色增强放到 GPU、调整 batch size 或队列深度。

**与框架内置 dataloader 的区别**

框架 dataloader 往往以 Python worker、多进程队列和 CPU 库为核心，不同框架对图像/音频格式、随机增强、数据 layout 的实现不完全一致。DALI 把这些操作抽象为独立算子库和执行引擎，同一条 pipeline 可以通过不同插件接入 PyTorch、TensorFlow、MXNet 或 PaddlePaddle。对工程系统而言，这带来两个直接收益：第一，数据预处理逻辑可移植，不随训练框架重写；第二，调度器能看到整条输入图，因而可以做 batch 级内存复用、阶段并行和异步执行，而不是被 Python iterator 的黑盒边界限制。

**缓存视角下的意义：缓存的是预处理能力与就绪 batch，而不是静态样本**

把 DALI 放在 storage/cache 分类下理解，重点是它缓解了“数据已在本地或对象存储中，但 GPU 仍拿不到可训练 tensor”的问题。普通文件缓存只减少读盘或远程读取时间，不能消除解码和增强成本；DALI 的预取队列则缓存已经完成或正在完成的 batch，Mixed/GPU 算子把可复用的硬件解码和增强能力并入输入路径。对于随机增强较重的训练，这比缓存原始 JPEG 更接近训练真正需要的对象：形状、layout、dtype 和归一化都已满足模型输入约束的 tensor batch。

#### 🧪 练习题

```yaml
question: "DALI 中 Mixed backend 的核心作用是什么？"
options:
  - "把 GPU TensorList 强制拷回 CPU，方便 Python 后处理"
  - "接收 CPU 输入并产生 GPU 输出，典型用于图像解码等跨设备阶段"
  - "只负责在多个训练进程之间共享文件系统缓存"
  - "替代深度学习模型的前向传播计算"
answer: 1
explain: "Mixed backend 位于 CPU 读取和 GPU 增强之间，适合 JPEG 解码这类从 CPU encoded bytes 到 GPU decoded tensor 的阶段，避免后续增强再走 CPU 路径。"
```
