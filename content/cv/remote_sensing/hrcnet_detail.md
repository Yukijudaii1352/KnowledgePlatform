### HRCNet — 高分辨率上下文提取网络

```yaml
id: hrcnet
name: HRCNet
full_name: "高分辨率上下文提取网络 (High-Resolution Context Extraction Network)"
year: 2021
org: "北京科技大学 (USTB)"
paper_url: "https://www.mdpi.com/2072-4292/13/1/71"
category: "remote_sensing"
parent: "HRNet"
motivation: "在HRNet基础上引入轻量双注意力、特征增强金字塔和边界感知模块，结合多层级损失函数，解决遥感图像语义分割中空间信息丢失、全局上下文缺失和边界模糊三大问题"
```

#### 📝 一句话总结

HRCNet 在 HRNet 高分辨率并行分支骨干上，设计了轻量双注意力（LDA）模块获取全局上下文、特征增强特征金字塔（FEFP）融合多尺度信息、边界感知（BA）模块改善边界质量，并提出像素级+区域级+图像级的多层级损失函数联合监督，在 ISPRS Potsdam 和 Vaihingen 数据集上分别达到 92.0% 和 92.3% 的总体精度。

#### 🎯 核心要点

- **骨干网络**：采用 HRNet 并行多分支架构保持高分辨率空间信息，并通过减少每阶段残差单元数量实现轻量化（Light HRNet）
- **轻量双注意力（LDA）模块**：由轻量空间注意力（LSA，基于 GCNet 简化非局部操作）和轻量通道注意力（LCA，基于 SE 模块）组成，以极低计算开销获取全局上下文
- **特征增强特征金字塔（FEFP）**：融合 FPN 的自顶向下结构、DenseNet 的密集连接和 ASPP 的空洞卷积，充分利用四分支多尺度语义信息
- **边界感知（BA）模块**：融合 Stem 高分辨率结构特征与第一分支高分辨率语义特征，生成二值边界预测，配合 3 像素半径圆盘腐蚀的边界标签
- **多层级损失函数**：\(L_{all} = \lambda_1 L_{ce} + \lambda_2 L_{ba} + \lambda_3 L_{se}\)（\(\lambda_1=1.0, \lambda_2=0.9, \lambda_3=0.2\)），分别监督像素级分类、区域级边界和图像级类别存在性
- **评估基准**：ISPRS 2D Semantic Labeling 的 Potsdam（RGB, 5cm GSD）和 Vaihingen（IRRG, 9cm GSD）数据集，6 类语义分割
- **性能表现**：Potsdam OA 92.0%、Vaihingen OA 92.3%，超越 DeepLab_v3、DANet、PSPNet 等方法，且 GFLOPS 和参数量更低

#### 🔬 深入细节

![HRCNet 整体架构图](https://pub.mdpi-res.com/remotesensing/remotesensing-13-00071/article_deploy/html/images/remotesensing-13-00071-g003.png)
*图：HRCNet 整体架构，从左到右依次为骨干网络（Light HRNet + LDA）、分割头（FEFP）和多层级损失函数（BAloss + CEloss + SEloss）*

![LDA 模块详细设计](https://pub.mdpi-res.com/remotesensing/remotesensing-13-00071/article_deploy/html/images/remotesensing-13-00071-g005.png)
*图：轻量双注意力（LDA）模块结构，包含 LSA（上）、残差单元（中）和 LCA（下）三条路径*

```python
# HRCNet 核心前向传播伪代码
def forward(self, image):
    # === 骨干网络：Light HRNet + LDA ===
    x = self.stem(image)                    # 2个stride-2的3×3卷积, 分辨率→H/4, 通道→64
    
    # 4个阶段，每阶段包含并行多分支 + LDA模块
    for stage in [stage1, stage2, stage3, stage4]:
        branches = stage.parallel_branches(x)  # 分支通道: C, 2C, 4C, 8C
        for i, branch in enumerate(branches):
            branch = LDA(branch)               # 轻量双注意力
        x = stage.exchange(branches)           # 多分支信息交换
    
    b1, b2, b3, b4 = x  # 四分支输出: H/4, H/8, H/16, H/32
    
    # === 分割头：FEFP 多尺度融合 ===
    fused = FEFP(b1, b2, b3, b4)  # FPN + DenseConnect + ASPP
    seg_pred = conv_1x1(fused)     # 像素级分类预测
    
    # === 边界感知模块 ===
    boundary_pred = BA(stem_feat, b1)  # 融合stem和branch1的高分辨率特征
    
    # === 语义编码模块 ===
    category_pred = SE(fused)  # 图像级类别存在性预测 (N维向量)
    
    # === 多层级损失 ===
    loss = 1.0 * CEloss(seg_pred, gt) \
         + 0.9 * BAloss(boundary_pred, boundary_gt) \
         + 0.2 * SEloss(category_pred, category_gt)
    
    return seg_pred, loss
```

```python
# LDA 模块伪代码
def LDA(X):  # X: [B, C, H, W]
    # --- LSA: 轻量空间注意力 (基于GCNet) ---
    q = softmax(reshape(conv_1x1(X), [B, H*W, 1]))  # 全局注意力权重
    k = reshape(X, [B, C, H*W])                       # 特征重塑
    X1 = matmul(k, q)                                  # [B, C, 1, 1] 全局上下文向量
    X1 = conv_1x1(bn_relu(conv_1x1(X1, C//r)))       # 瓶颈变换 (r=16)
    Y_lsa = X + X1                                     # 残差连接
    
    # --- 残差单元 ---
    Y_res = residual_block(X)
    
    # --- LCA: 轻量通道注意力 (基于SE) ---
    gap = global_avg_pool(Y_res)                        # [B, C, 1, 1]
    w = sigmoid(fc(relu(fc(gap, C//r)), C))            # 通道权重
    Y_lca = Y_res * w                                  # 通道加权
    
    return Y_lsa + Y_lca  # 融合空间注意力和通道注意力
```

**动机与背景：遥感语义分割的三重挑战**

遥感图像语义分割面临三个核心难题：（1）**空间信息丢失**——传统编码器-解码器结构（如 UNet、SegNet）在下采样过程中不可避免地损失空间细节，而遥感图像中建筑物、道路等目标的完整结构对分割至关重要；（2）**全局上下文缺失**——仅依赖局部感受野难以区分外观相似但语义不同的区域（如低矮植被与树木），需要建立像素间的长程依赖关系；（3）**边界模糊**——卫星/航空平台的运动和超远拍摄距离导致目标边界失真，且小目标（如车辆）的边界信息极易被忽略。HRNet 通过并行多分支架构保持了高分辨率空间信息，但未考虑全局上下文和边界优化，HRCNet 正是在此基础上进行的系统性改进。

**核心机制一：轻量双注意力（LDA）——以极低代价获取全局上下文**

LDA 模块的设计基于一个关键观察：传统非局部（Non-Local）注意力为每个像素独立计算全局注意力图，计算复杂度为 \(O(H^2W^2)\)，但 GCNet 研究发现所有像素学到的注意力图几乎相同。因此，LSA 模块仅计算**一个**全局上下文向量 \(X_1 \in \mathbb{R}^{C \times 1 \times 1}\)，将复杂度降至 \(O(HW)\)。具体地，输入 \(X\) 经 1×1 卷积和 softmax 生成全局注意力权重，与重塑后的特征矩阵相乘得到全局表示，再通过瓶颈结构（缩减比 \(r=16\)）+ BN + ReLU 变换后加回原特征：

$$Y_1 = X \oplus F\big(\text{BN\&ReLU}\big(F(\text{reshape}(X) \otimes \text{softmax}(\text{reshape}(F(X))))\big)\big)$$

LCA 模块则采用 SE-Net 风格的通道注意力：全局平均池化 → 两层全连接（瓶颈比 \(r=16\)）→ Sigmoid 门控，对残差单元输出进行通道级加权。LSA 与残差单元并行放置（因为空间注意力适合在高分辨率特征上操作），LCA 串联在残差单元之后（因为通道关系属于高层语义信息）。这种设计经过消融实验验证优于其他排列方式。

**核心机制二：FEFP——多尺度特征的深度融合**

传统 FPN 通过自顶向下路径融合多尺度特征，但其输入来自单一骨干的不同层，语义信息有限。FEFP 做了两项关键改进：（1）直接使用 HRCNet 四个并行分支的输出替代 FPN 的下采样特征，避免了空间信息的二次损失；（2）在 FPN 的逐级融合过程中引入 DenseNet 的密集连接（加强特征间信息交换）和 ASPP 的多尺度空洞卷积（扩大感受野获取多尺度上下文）。这使得 FEFP 能同时利用高分辨率的空间细节和低分辨率的高层语义，尤其对不同尺度目标（大面积建筑 vs 小型车辆）的分割效果显著。

**核心机制三：边界感知（BA）模块与多层级损失**

BA 模块融合两种互补特征：Stem 输出（\(X_1\)，分辨率 H/4，保留丰富的结构/轮廓信息）和第一分支输出（\(X_2\)，同样 H/4 分辨率但经过多阶段特征提取，语义信息更强）。两者融合后进行二值分类（边界 vs 非边界），由 BAloss 监督。边界标签的生成遵循 ISPRS 官方规范：使用 3 像素半径的圆盘对原始标签边界进行腐蚀，将图像分为边界区域和非边界区域。

多层级损失函数的设计哲学是从三个粒度同时优化：CEloss 关注每个像素的分类正确性；BAloss 迫使网络学习清晰的目标边界；SEloss 从图像全局视角预测哪些类别存在，避免出现不存在类别的误分类（对小目标尤其有效，因为 SEloss 对大小目标一视同仁）。三者的权重 \(\lambda_1=1.0, \lambda_2=0.9, \lambda_3=0.2\) 通过实验确定，其中边界损失权重接近主损失，体现了边界优化在遥感分割中的重要性。

**与传统方法的对比优势**

相比 DeepLab_v3（依赖 ASPP 多尺度融合但丢失空间信息）、DANet（全量双注意力计算开销巨大）、UNet（编码器-解码器结构空间信息恢复有限），HRCNet 的优势在于：（1）HRNet 骨干从始至终保持高分辨率特征，无需"先压缩再恢复"；（2）LDA 以 GCNet 简化策略将注意力计算量降低数个数量级；（3）BA 模块显式建模边界，而非依赖隐式学习。在 Potsdam 数据集上，HRCNet_W48 以更低的 GFLOPS（65.3G vs DeepLab_v3 的 175.0G）和参数量（65.8M vs 58.6M 相当）实现了 OA 从 88.97% 到 92.00% 的提升。在 Vaihingen 数据集上，建筑物类别（占比大）和车辆类别（小目标）的 IoU 提升尤为显著，验证了 FEFP 多尺度融合和 BA 边界优化的有效性。

> 💡 **关键洞察**：HRCNet 的核心设计理念是"保持高分辨率 + 轻量注意力 + 显式边界建模"，三者缺一不可。单独使用 HRNet 骨干无法获取全局上下文，单独使用注意力机制会丢失空间信息，而忽略边界则在遥感场景中损失严重。

#### 🧪 练习题

```yaml
question: "HRCNet 中轻量空间注意力（LSA）模块相比标准 Non-Local 注意力的核心简化策略是什么？"
options:
  - "使用深度可分离卷积替代标准卷积降低计算量"
  - "利用所有像素学到的注意力图近似相同这一发现，仅计算一个全局上下文向量"
  - "将注意力计算限制在局部窗口内而非全局范围"
  - "通过随机采样部分像素来近似全局注意力"
answer: 1
explain: "LSA 基于 GCNet 的发现：Non-Local 中每个像素独立计算的全局注意力图几乎相同，因此只需计算一个共享的全局上下文向量（C×1×1），将复杂度从 O(H²W²) 降至 O(HW)。"
```