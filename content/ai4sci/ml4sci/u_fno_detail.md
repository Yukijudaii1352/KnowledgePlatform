### U-FNO — U型傅里叶神经算子 (U-shaped FNO)

```yaml
id: u_fno
name: U-FNO
full_name: U型傅里叶神经算子 (U-shaped FNO)
year: '2022'
org: Stanford
paper_url: https://doi.org/10.1016/j.advwatres.2022.104185
category: operators
parent: fno
motivation: 结合U-Net多尺度结构
```

#### 📝 一句话总结

U-FNO 在 FNO 的傅里叶层中并联一个小型 U-Net 局部卷积分支，弥补截断傅里叶模态对高频尖锐前沿的表达不足，在 CO2-水多相流代理模拟中同时提升精度、数据效率和前沿预测能力。

#### 🎯 核心要点

- **来源说明**：任务中的 DOI 尾号 `104185` 与公开记录不一致；CaltechAUTHORS、arXiv 与作者 GitHub 均对应论文 `U-FNO--An enhanced Fourier neural operator-based deep-learning model for multiphase flow`，Advances in Water Resources 163:104180，arXiv `2109.03697`
- **U-Fourier 层**：在原 Fourier layer 的 \(\mathcal{K}v + Wv\) 之外加入 \(\mathcal{U}v\)，其中 \(\mathcal{U}\) 是两步 U-Net CNN 操作
- **全局 + 局部互补**：FFT 分支负责全局长程依赖和网格级算子学习，U-Net 分支负责局部高频、尖锐 plume front 和井附近压力梯度
- **三阶段架构**：输入 \(a(x)\) 经 fully connected lifting \(P\)，再经过若干 Fourier layers 和 U-Fourier layers，最后由 projection \(Q\) 输出 \(z(x)\)
- **任务场景明确**：面向 2D 径向 CO2 地质封存，输入包括渗透率、孔隙度、射孔、注入量、压力、温度、不可动水饱和度、毛管压力参数和时空网格
- **输出形式**：直接预测 30 年注入过程中的 24 个时间快照，输出 3D 体数据 \(96 \times 200 \times 24\) 的气相饱和度 \(SG\) 和压力增量 \(dP\)
- **损失函数增强**：使用相对 \(L_p\) 损失，同时惩罚输出本身和径向一阶导数 \(\mathrm{d}y/\mathrm{d}r\)，并用 active cell mask 处理不同储层厚度
- **数据效率**：论文报告 U-FNO 达到与 CNN 相当精度时，气相饱和度任务最多少用约 3.4 倍训练数据，压力任务少用约 2.4 倍训练数据
- **前沿预测优势**：相对 CNN，气相 plume front 误差约从 9.2% 降到 3.4%，压力 front 误差约从 21.2% 降到 12.0%

#### 🔬 深入细节

##### 核心架构示意

![U-FNO 模型架构图](https://ar5iv.labs.arxiv.org/html/2109.03697/assets/model.jpg)
*图：论文 Figure 2。A 展示 U-FNO 总体流程；B 是原 Fourier layer；C 是 U-Fourier layer，在傅里叶积分核和线性项之外加入 U-Net 分支。作者 GitHub 也提供同一架构图：`https://user-images.githubusercontent.com/34537648/160530063-255b53c6-f4db-4ceb-82ba-d6f7c2297ef3.jpg`。*

![U-FNO 输入输出样例](https://ar5iv.labs.arxiv.org/html/2109.03697/assets/figure1.jpg)
*图：论文 Figure 1。左侧是场变量和标量变量输入，右侧分别是气相饱和度与压力增量随时间演化的输出。*

##### 算法伪代码

```python
# U-FNO 前向传播伪代码
def u_fno_forward(a):
    # a: field/scalar/grid/time channels, shape roughly [B, H, R, T, C_in]
    v = P(a)  # lifting 到更高通道维度

    # 前半段：普通 Fourier layers
    for _ in range(num_fourier_layers):
        kv = fourier_kernel(v)          # IFFT(R * FFT(v))
        wv = pointwise_linear(v)
        v = activation(kv + wv)

    # 后半段：U-Fourier layers
    for _ in range(num_u_fourier_layers):
        kv = fourier_kernel(v)          # 全局频谱分支
        uv = mini_unet(v)               # 局部多尺度 CNN 分支
        wv = pointwise_linear(v)        # 逐点线性项
        v = activation(kv + uv + wv)

    z_hat = Q(v)  # projection 回气相饱和度或压力增量
    return z_hat

# 训练损失
for a, y, active_mask in dataloader:
    pred = u_fno_forward(a)
    dy_dr = radial_derivative(y)
    dpred_dr = radial_derivative(pred)
    loss = relative_lp(pred, y, mask=active_mask)
    loss += beta * relative_lp(dpred_dr, dy_dr, mask=active_mask)
    loss.backward()
    optimizer.step()
```

##### 动机与背景

多相流数值模拟需要同时处理非线性相渗、毛管压力、重力、溶解和强非均质地质属性。传统 ECLIPSE 这类全物理模拟器精度高，但做不确定性量化、反演或工程优化时需要大量前向模拟，成本很高。CNN 代理模型可以加速，但通常绑定固定网格，容易过拟合，并且需要大量模拟数据。

FNO 的优势是直接学习函数到函数的算子映射，并在傅里叶空间用 FFT 近似全局积分核，因此对单相流等任务有较好泛化。但 U-FNO 论文指出，在 CO2-水多相流中，原 FNO 的有限截断傅里叶基有强正则化效果：测试泛化很好，但训练误差可能偏高，尤其难以还原气相饱和度 plume 前沿和井附近压力尖峰这类高频局部结构。

##### Fourier layer 的基础计算

U-FNO 继承 FNO 的积分核思想。给定中间函数 \(v_l\)，核积分算子为：

$$\left(\mathcal{K}(v_l)\right)(x)
= \int_D \kappa(x,y)v_l(y)\,\mathrm{d}y$$

若令 \(\kappa(x,y)=\kappa(x-y)\)，由卷积定理可得：

$$\left(\mathcal{K}(v_l)\right)(x)
= \mathcal{F}^{-1}\left(\mathcal{F}(\kappa)\cdot \mathcal{F}(v_l)\right)(x)$$

FNO 将 \(\mathcal{F}(\kappa)\) 直接参数化为截断后的复值权重张量 \(R\)：

$$\left(\mathcal{K}(v_l)\right)(x)
= \mathcal{F}^{-1}\left(R\cdot \mathcal{F}(v_l)\right)(x)$$

其中只保留前 \(k_{\max}\) 个 Fourier modes。对第 \(k\) 个模态和输出通道 \(i\)，频谱乘法为：

$$\left(R\cdot \mathcal{F}(v_l)\right)_{k,i}
= \sum_{j=1}^{c} R_{k,i,j}\left(\mathcal{F}(v_l)\right)_{k,j}$$

##### U-Fourier layer 的机制

原 Fourier layer 大致是：

$$v_{l+1}(x)=\sigma\left((\mathcal{K}v_l)(x)+W(v_l(x))\right)$$

U-FNO 的核心改动是在后半段层里加入 U-Net 分支：

$$v_{m_{k+1}}(x):=
\sigma\left(
(\mathcal{K}v_{m_k})(x)
+(\mathcal{U}v_{m_k})(x)
+W(v_{m_k}(x))
\right)$$

这里 \(\mathcal{U}\) 是一个小型 U-Net CNN operator。它通过下采样/上采样路径聚合局部多尺度卷积特征，增强高频和边缘结构表达。傅里叶分支擅长捕获全局流动耦合和长距离压力传播；U-Net 分支擅长恢复 plume front、薄层异质性和井附近陡峭梯度。两者在同一层相加后再过非线性，形成全局谱算子与局部卷积归纳偏置的混合层。

> ⚠️ 注意：加入 U-Net 分支会削弱原 FNO 天然的分辨率无关性，因为卷积分支与具体网格更绑定。论文在该任务中接受这个取舍，是因为 CO2-水多相流对数值弥散和数值扩散非常敏感，而这些误差本身就与固定网格分辨率相关。

##### 数据流与输入输出配置

论文的数据由 ECLIPSE e300 生成，模拟 30 年超临界 CO2 注入。每个样本包含场变量和标量变量。场变量包括水平/垂向渗透率 \(k_x,k_y\)、孔隙度 \(\phi\)、射孔图 \(perf\)；标量包括注入率 \(Q\)、初始压力 \(P_{\text{init}}\)、温度 \(T\)、不可动水饱和度 \(S_{wi}\)、van Genuchten 参数 \(\lambda\)。这些标量会 broadcast 成与场变量相同大小的通道。

由于原始径向网格逐渐变粗，训练时先对径向做 logarithm conversion，使场变量可表示为 \(96 \times 200\) 矩阵；不同储层厚度用 zero padding 和 active cell mask 处理。时间信息作为额外维度输入，模型直接输出 24 个时间快照构成的空间-时间体。

##### 损失函数设计

U-FNO 使用相对 \(L_p\) 损失，并额外约束径向导数：

$$L(y,\hat{y}) =
\frac{\|y-\hat{y}\|_p}{\|y\|_p}
+\beta
\frac{
\left\|\frac{\mathrm{d}y}{\mathrm{d}r}
- \frac{\mathrm{d}\hat{y}}{\mathrm{d}r}\right\|_p
}{
\left\|\frac{\mathrm{d}y}{\mathrm{d}r}\right\|_p
}$$

第一项要求整体场准确，第二项直接惩罚前沿和梯度形状。对于气相饱和度，导数项能改善 plume leading edge；对于压力增量，导数项能改善井附近尖锐压力变化。训练时只在 active cells 内计算 loss，避免 padding 区域产生无意义梯度。

##### 与 FNO 和 CNN 的区别

| 方面 | CNN surrogate | FNO | U-FNO |
|------|---------------|-----|-------|
| 核心归纳偏置 | 局部卷积 | 全局傅里叶积分核 | 傅里叶全局 + U-Net 局部多尺度 |
| 泛化 | 易过拟合，需大量数据 | 泛化强但高频表达受截断模态限制 | 保留 FNO 泛化，同时提升训练精度和前沿还原 |
| 网格依赖 | 强 | 弱，较分辨率无关 | 介于两者之间，U-Net 分支引入网格依赖 |
| 适合结构 | 局部纹理和边缘 | 长程相互作用、平滑场 | 多相流 plume front 与压力传播并存 |
| 训练目标 | 常规 MSE/relative loss | relative loss | relative loss + 径向导数 loss + active mask |

> 💡 关键：U-FNO 不是简单把 U-Net 接在 FNO 后面，而是在 Fourier layer 内部并联 U-Net 路径，使每一层都同时做全局谱混合和局部多尺度修正。

#### 🧪 练习题

```yaml
question: "U-FNO 在 U-Fourier layer 中加入 U-Net 分支的主要目的是什么？"
options:
  - "完全替代傅里叶变换，避免使用 FFT"
  - "增强局部高频结构表达，改善 plume front 和压力尖峰预测"
  - "让模型只能在无监督物理损失下训练"
  - "把所有标量输入压缩成一个常数"
answer: 1
explain: "FNO 的截断傅里叶模态擅长全局耦合但可能平滑高频前沿；U-Net 分支提供局部多尺度卷积特征，因此能改善气相饱和度前沿和井附近压力梯度。"
```
