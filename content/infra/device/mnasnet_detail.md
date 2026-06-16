### MnasNet

```yaml
id: mnasnet
name: MnasNet
full_name: 移动端硬件感知NAS (Mobile Neural Architecture Search)
year: '2019'
org: Google
paper_url: http://openaccess.thecvf.com/content_CVPR_2019/html/Tan_MnasNet_Platform-Aware_Neural_Architecture_Search_for_Mobile_CVPR_2019_paper.html
category: hw_sw_codesign
parent: —
motivation: 将硬件延迟纳入NAS搜索目标
```

#### 📝 一句话总结

MnasNet 提出了面向移动端 CNN 的平台感知 NAS，把真实手机推理延迟直接放入搜索奖励，解决用 FLOPs 代理延迟容易选出硬件不友好结构的问题。它同时设计了 factorized hierarchical search space，让不同分辨率和通道阶段可以搜索不同层结构，在有限搜索成本下获得更好的精度-延迟 Pareto 前沿。

#### 🎯 核心要点

- 使用多目标奖励同时优化验证精度与目标移动平台延迟，而不是只优化精度或 FLOPs
- 通过在 Pixel 1 手机大核上实际执行候选模型来测量 batch size 1 推理延迟
- 采用 RNN controller 采样架构 token，训练候选模型、测量延迟后用 PPO 更新 controller
- 提出 factorized hierarchical search space：按分辨率和通道数划分 block，每个 block 单独搜索层结构和重复次数
- 搜索选项包括卷积类型、3x3/5x5 kernel、SE ratio、skip op、输出通道倍率和每个 block 的层数
- 相比单一 cell 反复堆叠的 NASNet 类方法，允许不同网络阶段有不同操作，提升层级多样性和硬件效率
- ImageNet 上 MnasNet-A1 达到 75.2% top-1、78ms Pixel 延迟，并迁移到 COCO SSDLite 检测任务

#### 🔬 深入细节

##### 核心示意图

![MnasNet 平台感知搜索流程](https://ar5iv.labs.arxiv.org/html/1807.11626/assets/x1.png)
*图：MnasNet 论文 Figure 1 的 ar5iv 公开镜像，展示 RNN controller、候选模型训练、手机延迟测量和奖励更新构成的闭环。*

##### 算法伪代码

```python
# MnasNet: latency-aware mobile NAS
controller = RNNController(search_space=factorized_blocks)

for step in range(max_search_steps):
    batch = []
    for _ in range(num_architectures):
        arch_tokens = controller.sample_tokens()
        model = build_mobile_cnn(arch_tokens)

        acc = train_proxy_and_eval(model, dataset="ImageNet", epochs=5)
        lat = measure_latency_on_pixel(model, batch_size=1, core="big_cpu")
        reward = acc * (lat / target_latency) ** weight(lat, target_latency)
        batch.append((arch_tokens, reward))

    controller.update_with_ppo(batch)

pareto_models = select_top_models(controller.history, metric=("accuracy", "latency"))
full_train(pareto_models, dataset="ImageNet")
transfer_to_ssdlite(pareto_models, dataset="COCO")
```

##### 方法机制解读

MnasNet 的核心判断是：移动端部署瓶颈不能只用 FLOPs 描述。两个模型即使乘加数相近，也可能因为 depthwise conv、branch、memory layout、kernel implementation 和运行时调度差异，在手机 CPU 上出现明显不同的延迟。论文因此把架构搜索目标从单纯最大化 \(ACC(m)\) 改成在目标设备上直接测得 \(LAT(m)\) 后做多目标优化。硬约束形式可以写成：

$$
\max_m ACC(m) \quad \text{s.t.}\quad LAT(m) \le T
$$

但硬约束只能得到一个区域内的高精度模型，不方便一次搜索得到多个 Pareto 解。MnasNet 使用加权乘积奖励：

$$
R(m)=ACC(m)\left(\frac{LAT(m)}{T}\right)^w,\quad
w=\begin{cases}
\alpha, & LAT(m)\le T \\
\beta, & LAT(m)>T
\end{cases}
$$

其中 \(T\) 是目标延迟。若取 \(\alpha=0,\beta=-1\)，延迟低于目标时奖励近似只看精度，超过目标后被强烈惩罚；若取 \(\alpha=\beta=-0.07\)，延迟作为软约束平滑影响奖励，controller 会探索更宽的延迟范围，从一次搜索中产出 A1/A2/A3 这类不同精度-延迟折中模型。

搜索空间是另一个关键贡献。早期 NAS 常搜索一个 cell，然后把同一个 cell 在整网中重复堆叠；这降低搜索难度，却忽略了移动 CNN 中不同阶段的硬件代价差异。MnasNet 先把网络分成若干 block，每个 block 处理相近的输入分辨率和通道规模，再在 block 内搜索单层结构与重复次数。典型候选包括 regular conv、depthwise conv、MobileNetV2 inverted bottleneck、3x3/5x5 kernel、是否使用 SE、skip op、通道倍率和层数偏移。

这个 factorization 保留了层级多样性，同时把搜索空间控制在可训练范围。若每个 block 的子空间大小为 \(S\)，block 数为 \(B\)，每个 block 平均重复 \(N\) 层，则分层搜索约为：

$$
|\mathcal{A}_{factorized}|=S^B,\quad
|\mathcal{A}_{per-layer}|=S^{B\cdot N}
$$

论文给出的典型配置 \(S=432,B=5,N=3\) 时，分层空间约 \(10^{13}\)，而逐层独立搜索会膨胀到约 \(10^{39}\)。这解释了为什么它能让不同 stage 使用 3x3/5x5、不同 expansion ratio 和不同重复次数，却仍可用 RL controller 搜索。

训练流程上，controller 只需输出 token 序列即可描述一个候选网络；候选网络先在 ImageNet 上短训得到 proxy accuracy，再在 Pixel 手机上实际计时，最终用奖励 \(R(m)\) 做 PPO 更新。MnasNet 没有把延迟预测模型作为核心假设，而是把真实测量放进 loop，因此搜索出来的结构更贴近目标硬件和 runtime。代价是搜索成本高：论文直接在 ImageNet 上搜索，每次架构短训并测量，约采样 8K 个模型，再只把少数高分模型完整训练和迁移。

与 MobileNetV2 这类人工设计模型相比，MnasNet 的优势不只是“更宽或更深”，而是能在早期高分辨率层倾向选择更省延迟的结构，在后期低分辨率层保留更强表达能力；与 NASNet 类 cell-based NAS 相比，它把移动端真实延迟和每阶段结构差异都纳入搜索。最终 A1 在 78ms Pixel 延迟下达到 75.2% top-1，说明硬件感知目标和搜索空间设计必须同时成立：只加延迟奖励会牺牲精度，只换搜索空间又可能选出不适合设备的模型。

> 💡 关键：MnasNet 是“算法-硬件-运行时”共同闭环的 NAS。它优化的不是抽象计算量，而是在指定移动平台上能真实跑得快且准确的 CNN。

#### 🧪 练习题

```yaml
question: "MnasNet 为什么要直接测量手机端推理延迟，而不是只用 FLOPs 作为搜索目标？"
options:
  - "因为 FLOPs 无法反映移动硬件、算子实现和访存带来的真实延迟差异"
  - "因为 FLOPs 只能用于循环神经网络，不能用于卷积网络"
  - "因为真实延迟测量可以完全避免训练候选模型"
  - "因为 PPO 只能优化以毫秒为单位的目标"
answer: 0
explain: "MnasNet 的动机是 FLOPs 与真实移动端延迟相关性不足；直接在 Pixel 手机上测量延迟能让搜索奖励贴近部署表现。"
```
