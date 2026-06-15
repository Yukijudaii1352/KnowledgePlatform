### ConvONet

```yaml
id: convonet
name: ConvONet
full_name: 卷积占用网络 (ConvONet)
year: '2020'
org: MPI
paper_url: https://arxiv.org/abs/2003.04618
category: reconstruction
parent: occupancy_net
motivation: 卷积编码器提升局部特征表达能力
```

#### 📝 一句话总结

ConvONet 将 Occupancy Networks 的全局 latent code 替换为卷积特征场，在查询点处插值局部 2D/3D 特征并预测占用概率，使连续隐式重建能保留局部细节并扩展到大规模室内场景。

#### 🎯 核心要点

- **卷积隐式表示**：用 CNN/PointNet 编码输入点云或体素，生成规则 2D plane 或 3D grid 特征
- **局部特征查询**：对任意 3D 查询点 \(\mathbf{p}\)，在特征平面/体素网格上双线性或三线性插值得到 \(\psi(\mathbf{p},\mathbf{x})\)
- **占用解码器**：MLP/ResNet decoder 接收查询点坐标和局部特征，输出 \(f_\theta(\mathbf{p},\psi)\in[0,1]\)
- **三平面表示**：用 \(xy\)、\(xz\)、\(yz\) 三个 canonical planes 平衡内存和表达力
- **体素网格表示**：在小物体上可用 3D grid 捕获更完整的空间局部性
- **可扩展场景重建**：通过 fully convolutional/sliding-window 思想处理 Matterport3D、ScanNet 等大场景
- **继承 ONet 优点**：仍通过连续占用函数和 MISE/Marching Cubes 提取任意分辨率表面

#### 🔬 深入细节

##### 核心示意图

![ConvONet 局部特征表示](https://ar5iv.labs.arxiv.org/html/2003.04618/assets/x2.png)
*图：ConvONet 相比原始 Occupancy Network 的关键变化：不再只用一个全局形状 latent，而是在 3D 位置处查询卷积特征，使隐式函数同时依赖输入观测和局部空间位置。*

##### 算法伪代码

```python
# ConvONet 训练和网格提取伪代码
def train_convonet(observation, query_points, occupancies):
    # observation 可以是点云、低分辨率体素或局部场景块
    feature_maps = convolutional_encoder(observation)

    predictions = []
    for p in query_points:
        local_feats = []
        for grid_or_plane in feature_maps:
            local_feats.append(interpolate(grid_or_plane, project(p)))
        psi = concatenate(local_feats)
        predictions.append(occupancy_decoder(p, psi))

    loss = binary_cross_entropy(predictions, occupancies)
    update_network(loss)


def reconstruct(feature_maps, resolution):
    def occ_fn(p):
        psi = interpolate_multiscale_features(feature_maps, p)
        return occupancy_decoder(p, psi)

    active_grid = MISE(occ_fn, initial_resolution=32, target_resolution=resolution)
    mesh = marching_cubes(active_grid, threshold=0.5)
    return mesh
```

##### 动机与背景

Occupancy Networks 用一个条件编码 \(c(\mathbf{x})\) 表示整个输入，再让 decoder 判断任意点 \(\mathbf{p}\) 是否被占用。这种连续隐式表示突破了体素分辨率限制，但全局 latent 容易成为瓶颈：局部几何细节、重复结构和大场景中的空间平移关系都被压缩到一个向量里，decoder 难以知道“这个查询点附近具体观测到了什么”。

ConvONet 的核心思想是把隐式函数从

$$
f_\theta(\mathbf{p}, c)
$$

改为

$$
f_\theta(\mathbf{p}, \psi(\mathbf{p}, \mathbf{x}))
$$

其中 \(\psi(\mathbf{p},\mathbf{x})\) 是在查询点附近提取的卷积特征。这样，占用预测不再只由全局形状向量决定，而是由局部观测和坐标共同决定。

##### 特征场设计

论文系统比较了多种特征场。2D plane 表示把 3D 点投影到 canonical plane，例如 \(xy\)、\(xz\)、\(yz\)，并在对应特征图上双线性插值。三平面组合常写作：

$$
\psi(\mathbf{p},\mathbf{x})=
\psi_{xy}(p_x,p_y)\oplus
\psi_{xz}(p_x,p_z)\oplus
\psi_{yz}(p_y,p_z)
$$

3D grid 表示则在体素特征网格上三线性插值：

$$
\psi(\mathbf{p},\mathbf{x})=\text{trilinear}(\mathbf{F},\mathbf{p})
$$

三平面更省内存，适合大场景；3D grid 的空间表达更直接，适合对象级重建或较小场景。二者都引入了卷积网络的平移等变归纳偏置，使模型能把局部几何模式复用到不同空间位置。

##### 占用解码与训练目标

给定查询点 \(\mathbf{p}\) 和局部特征 \(\psi\)，decoder 输出占用概率：

$$
o = f_\theta(\mathbf{p}, \psi) \in [0,1]
$$

训练时在空间中采样点并使用二元交叉熵：

$$
\mathcal{L}=-\sum_i
\left[
o_i^*\log f_\theta(\mathbf{p}_i,\psi_i)
(1-o_i^*)\log(1-f_\theta(\mathbf{p}_i,\psi_i))
\right]
$$

由于 \(f_\theta\) 是连续函数，推理时可在任意分辨率上查询，占用等值面通过 MISE 加速采样，再用 Marching Cubes 提取网格。

##### 与 Occupancy Networks 的区别

原始 ONet 的强项是连续拓扑自由表示，但它缺少局部结构归纳偏置；ConvONet 则把 CNN 的局部性、平移等变和层级特征注入隐式表示。对局部细节丰富的椅子、桌子、室内墙面和多房间结构，ConvONet 能保持更锋利的边界和更完整的结构。

在大场景上，ConvONet 可以按空间块或 fully convolutional 方式编码输入点云，让同一个 decoder 在不同区域共享参数。这是它能从单物体扩展到 Matterport3D/ScanNet 室内场景的关键。

> 💡 关键：ConvONet 的本质是“局部条件化的隐式函数”。连续隐式函数负责任意分辨率表面，卷积特征场负责把观测中的局部几何证据送到正确的查询位置。

#### 🧪 练习题

```yaml
question: "ConvONet 相比原始 Occupancy Networks 的关键改进是什么？"
options:
  - "只使用更深的全连接 MLP"
  - "在查询点处插值卷积特征，使占用预测依赖局部观测而非单一全局 latent"
  - "取消连续隐式函数，改用固定分辨率体素输出"
  - "只重建二维图像轮廓"
answer: 1
explain: "ConvONet 保留连续占用函数，但把条件信息组织为空间特征场，在每个查询点提取局部特征，因此细节和大场景扩展性更好。"
```
