### VGG-T³：用测试时训练线性化 VGGT 的大规模重建
```yaml
id: vgg_t3
name: VGG-T³
full_name: 测试时训练重建 (VGG-T³)
year: "2026.02"
org: arXiv
paper_url: https://arxiv.org/abs/2602.23361
category: feed_forward
parent: ilrm
motivation: TTT线性扩展58秒千图重建
```

#### 📝 一句话总结
VGG-T³ 将 VGGT 中随图像数二次增长的全局 softmax attention 替换为基于测试时训练的线性模块，解决离线前馈 3D 重建难以扩展到上千张图的问题。它把可变长度 KV 场景记忆压缩到固定规模 MLP 中，使计算随输入视图数近似线性增长。

#### 🎯 核心要点
- 基座模型：继承 VGGT 的多视图视觉几何 Transformer 结构。
- 瓶颈定位：全局 attention 的 KV 空间随图像数量增长，计算近似 \(O(n^2)\)。
- TTT 线性化：在测试时优化小型 MLP，使其学习 key 到 value 的映射。
- 固定场景状态：用 MLP 参数作为场景记忆，替代显式保存全部 KV token。
- 大规模输入：支持上千张图片的离线重建，并保持较高点图、深度和相机估计质量。

#### 🔬 深入细节
![VGG-T3 测试时训练模块](https://arxiv.org/html/2602.23361v1/figures/method/ttt_optim.png)
*图：VGG-T³ 用测试时训练的 MLP 压缩 VGGT 全局 attention 的 KV 空间。*

```python
# VGG-T3 核心流程伪代码
tokens = encode_images_with_vggt(images)
theta = initialize_ttt_mlp()  # 固定规模 fast weights

for global_layer in vggt_layers:
    keys, values, queries = project_qkv(tokens)

    # 测试时训练：让 MLP 学会从 key 预测 value
    for _ in range(ttt_steps):
        pred_values = mlp(theta, keys)
        ttt_loss = mse(pred_values, values)
        theta = optimizer_step(theta, ttt_loss)

    # 用压缩后的 MLP 近似全局 attention 的信息读取
    retrieved = mlp(theta, queries)
    tokens = update_tokens(tokens, retrieved)

geometry = prediction_heads(tokens)  # pointmap / depth / camera 等
```

VGGT 这类多视图模型的优势是可以把一组图像作为整体推理相机、深度和点图，但全局 attention 需要所有图像 token 之间互相通信。当输入从几十张扩展到几百、上千张时，token 数 \(n\) 增大后，softmax attention 的成本：

$$
\text{Attention}(Q,K,V)=\text{softmax}\left(\frac{QK^\top}{\sqrt{d}}\right)V
$$

会出现 \(QK^\top\) 的二次复杂度，显存也随 KV 缓存膨胀。

VGG-T³ 的核心观察是：全局 attention 中的 \(K,V\) 本质上是场景几何记忆。与其把所有 key-value token 显式保存并查询，不如在测试时训练一个固定规模 MLP \(f_\theta\)，让它学习：

$$
f_\theta(k_i) \approx v_i
$$

这样 \(f_\theta\) 的参数就成为压缩场景表示。对新 query \(q\)，模型通过 \(f_\theta(q)\) 读取场景信息，而不再对所有 key 做 softmax 匹配。

训练与推理有两层优化：外层是模型参数的常规训练，学习如何把 VGGT 线性化；内层是在每个测试场景上对 fast weights \(\theta\) 做少量自监督更新。这个内层优化不需要外部标签，因为 key-value 配对来自模型当前层本身。

> 💡 关键：VGG-T³ 不是简单换成线性 attention，而是把“场景记忆”解释为一个测试时可优化的函数。

相对在线方法，VGG-T³ 仍是离线全局重建：它可以同时利用整组图像的信息，不依赖固定输入顺序；相对原始 VGGT，它牺牲一部分精确 softmax 匹配能力，换取上千张图像可扩展的时间和显存曲线。

#### 🧪 练习题
```yaml
question: "VGG-T³ 中测试时训练的 MLP 主要压缩了什么？"
options:
  - "输入图像的 JPEG 文件大小"
  - "VGGT 全局 attention 中可变长度的 key-value 场景记忆"
  - "输出点图的像素分辨率"
  - "相机内参矩阵的维度"
answer: 1
explain: "VGG-T³ 让 MLP 在测试时学习 key 到 value 的映射，用固定规模参数替代随图像数量增长的 KV token。"
```
