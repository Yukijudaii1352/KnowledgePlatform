### CausalNav: A Long-term Embodied Navigation System for Autonomous Mobile Robots in Dynamic Outdoor Scenarios

```yaml
标题: "CausalNav: A Long-term Embodied Navigation System for Autonomous Mobile Robots in Dynamic Outdoor Scenarios"
作者: Hongbo Duan, Shangyi Luo, Zhiyuan Deng, Yanbo Chen, Yuanhao Chiang, Yi Liu, Fangming Liu, Xueqian Wang
机构: 清华大学深圳国际研究生院人工智能与机器人中心; 鹏城实验室
发表: IEEE Robotics and Automation Letters (RA-L), 2026
DOI: 10.1109/LRA.2026.3653283
arxiv: "2601.01872"
关键词: [语义场景理解, 自主导航, 场景图, 检索增强生成, 动态环境, 具身智能, LLM]
```

#### 📝 一句话总结

CausalNav 提出首个面向动态户外环境的场景图语义导航框架，通过 LLM 构建多层级 Embodied Graph 并结合 RAG 检索与层次化规划，实现开放词汇、长程、鲁棒的语言引导导航。

#### 🎯 核心要点

1. **Embodied Graph 多层级语义场景图**：融合离线地图粗粒度建筑信息与在线感知细粒度物体实体，构建包含物体节点、自车节点、建筑节点、聚类节点的四层图结构，作为 RAG 可检索知识库。
2. **动态物体时空走廊过滤**：通过 CenterPoint + LIOsegmot 多目标跟踪流水线，将物体轨迹编码为时空走廊（spatial-temporal corridor），超过位移阈值的动态物体从图中移除，有效消除瞬态干扰。
3. **LLM 驱动的层次化语义检索**：基于空间-语义相似度进行层次聚类，利用 LLM 对查询进行逐层评分（公式 9-11），结合空间邻近度与语义相关度的混合得分定位导航目标。
4. **全局-局部层次化规划**：全局路径通过 Dijkstra 或地图 API 生成航点序列；局部路径采用 informed-RRT* + B-spline 平滑 + NMPC-CBF 控制，CBF 约束保证动态障碍物安全。
5. **边缘部署开源 LLM**：实验表明 DeepSeek-R1-Distill-14B 等本地部署的开源模型性能接近 GPT-4o，无需依赖商业 API，适合实际机器人部署。

#### 🔬 深入细节

##### 1. 系统架构总览

![CausalNav Framework](https://ar5iv.labs.arxiv.org/html/2601.01872v1/assets/x2.png)

*图：CausalNav 框架包含三个顺序模块：(1) 开放词汇目标跟踪与自运动估计；(2) 动态物体过滤与 Embodied Graph 构建；(3) 图更新与人类语言导航。*

CausalNav 采用层次化架构，将感知、图构建和规划解耦为三个模块。核心数据结构是 **Embodied Graph** \(\mathcal{G}\)，包含四类节点：

| 节点类型 | 符号 | 内容 | 层级 |
|---------|------|------|------|
| 物体节点 | \(\nu_i^{obj}\) | 描述 \(c_i\)、3D包围盒、世界坐标 | \(L-1\) |
| 自车节点 | \(\nu_i^{l}\) | 位置、速度 | 轨迹层 |
| 建筑节点 | \(\nu_i^{build}\) | 名称、坐标（离线地图） | \(L\) |
| 聚类节点 | \(\nu_i^{cluster}\) | LLM 摘要、质心坐标 | \(L\) |

---

##### 2. 开放词汇目标跟踪与 LiDAR 融合定位

**感知流水线**：YOLO-World（轻量开放词汇检测器）提取 2D 检测框和分割掩码，ByteTrack 进行时序关联：

$$
\mathcal{S}_t = \mathcal{C}(\text{YOLO-World}(I_t)), \quad \mathcal{S}_t = \{S_i = (c_i, \text{2DBBox}_i, \mathcal{B}_i)\}
$$

**LiDAR-Camera 融合定位**：将 LiDAR 点云投影到图像平面，通过分割掩码筛选物体点云，构建最小体积 3D 包围盒：

$$
{}^{c}\mathbf{p}_i = \mathbf{K} \cdot \mathbf{H} \cdot \mathbf{P}_i, \quad {}^{l}\mathcal{P}_{\text{obj}} = \{\mathbf{P}_i \in \mathcal{P}_t \mid {}^{c}\mathbf{p}_i \in \mathcal{B}_i\}
$$

世界坐标系下的物体位姿通过自车位姿变换获得：\({}^{w}\mathbf{T}_{\text{obj}} = {}^{w}\mathbf{T}_{l} \cdot {}^{l}\mathbf{T}_{\text{obj}}\)。

**图增量更新**：新检测物体创建节点，已有物体更新位置：

$$
G \leftarrow \begin{cases} G \cup \{\nu_i^{obj}\}, & \text{if } \nu_i^{obj} \notin G \\ G \setminus \{{}^{old}\nu_i^{obj}\} \cup \{\nu_i^{obj}\}, & \text{if } {}^{old}\nu_i^{obj} \in G \end{cases}
$$

---

##### 3. 动态物体时空走廊过滤

![Spatial-Temporal Corridor](https://ar5iv.labs.arxiv.org/html/2601.01872v1/assets/x3.png)

*图：时空走廊示意——同一车辆在不同时间戳的三个观测轨迹点及其 3D 包围盒。*

传统基于速度的动态物体过滤容易产生误报。CausalNav 将每个物体的历史轨迹编码为**时空走廊**：

$$
\mathcal{T} = \{{}^{w}\mathbf{T}_{\text{obj}}^{i}, \text{3DBBox}_i, t_i\}_{i=1}^{n}
$$

当物体位移超过阈值 \(k\) 步时，其时空走廊被排除，对应动态节点从图中移除：

$$
G \leftarrow G \setminus \{\mathcal{T} \mid \mathcal{T} \in D\}
$$

这种方法对间歇性运动模式（如路口附近的车辆）特别有效。

---

##### 4. 层次化聚类与 RAG 语义检索

**空间-语义相似度聚类**：

$$
\kappa_{ij} = (1-\alpha)\kappa_{ij}^{\text{spatial}} + \alpha \kappa_{ij}^{\text{semantic}}
$$

其中 \(\kappa_{ij}^{\text{spatial}} = \exp(-d_{\text{haversine}}(i,j)/\theta)\) 为空间相似度，\(\kappa_{ij}^{\text{semantic}}\) 为嵌入向量余弦相似度。底层物体节点自底向上聚类形成聚类节点，LLM 为每个聚类生成语义摘要。

**层次化语义检索**：给定查询 \(q\)，在每一层级 \(l\) 通过 LLM 评分选择节点：

$$
\pi(n_l \mid q) = \frac{\exp[\gamma \cdot \text{LLM}(q, C(n_l))]}{\sum_{n' \in \mathcal{L}_l} \exp[\gamma \cdot \text{LLM}(q, C(n'))]}
$$

层次化路径得分：

$$
\Lambda(\zeta) = \prod_{l=1}^{D} [\pi(n_l \mid q) \cdot \phi(n_l, n_{l-1})]
$$

其中 \(\phi(n_l, n_{l-1}) = \mathbf{1}_{\{n_{l-1} \in \text{Children}(n_l)\}}\) 保证父子链接有效。

**混合重排序**：结合空间邻近度与语义得分：

$$
\eta(n) = \beta \kappa^{\text{spatial}}(n, \mathbb{L}) + (1-\beta) \Lambda(\zeta)
$$

消融实验表明最优参数为 \(\alpha = \beta = 0.5\)，\(\gamma = 1.5\)。

---

##### 5. 在线图更新算法

```
Algorithm 1: Online Embodied Graph Updating
──────────────────────────────────────────
Input: 感知回调 C, 动态阈值 k
Initialize: G ← ∅, t ← 0

while 系统运行 do
    t ← t + 1
    S_t ← C(I_t, P_t, IMU)                    // 多模态感知

    for each S_i ∈ S_t do                      // 物体节点更新
        计算 T_obj^w, B_i, 3DBBox_i
        ν_i^obj ← {c_i, 3DBBox_i, p_obj^w}
        if ν_i^obj ∉ G then G ← G ∪ {ν_i^obj}
        else G.update(ν_i^obj)

    for each 动态节点 ν_i^d do                  // 时空走廊过滤
        if ν_i^d.steps ≥ k then G ← G \ {T}

    更新自车节点 ν_i^l 和所有边 E_ν
    R ← HCluster(G)                            // 层次聚类
    for each r ∈ R do
        E_r ← {(ν_i^cluster, ν_i^obj) | ν_i^obj ∈ r}
        G ← G ∪ {ν_i^cluster} ∪ E_r

return G
```

---

##### 6. 层次化规划：全局 + 局部

**全局规划**：
- 若目标可通过历史轨迹到达 → Dijkstra 最短路径
- 否则 → 离线路网或外部地图 API（Google Maps / 高德）生成粗粒度航点序列 \(\mathcal{W} = \{\mathbf{w}_1, \ldots, \mathbf{w}_n\}\)

**局部规划**：
1. **动态障碍物移除**：RH-Map（3D 区域哈希图）实时移除动态物体残影，获得可行域 \(\mathcal{F}\)
2. **路径生成**：informed-RRT* 在 \(\mathcal{F}\) 中生成初始路径，B-spline 平滑
3. **轨迹跟踪**：NMPC-CBF 优化控制：

$$
\min_{\{\mathbf{x}_k, \mathbf{u}_k\}} \sum_{k=0}^{N-1} \left(\|\mathbf{x}_k - \mathbf{x}_g^k\|_Q^2 + \|\mathbf{u}_k\|_R^2\right)
$$

$$
\text{s.t.} \quad \Delta h_{ob}^i(\mathbf{x}_k, \mathbf{u}_k) + \lambda_k h_{ob}^i(\mathbf{x}_k) \geq 0
$$

其中 CBF 约束 \(h_i(\mathbf{x}) = (x - x_i^p)^2 + (y - y_i^p)^2 - d_{\text{safe}}^2\) 保证与动态障碍物的安全距离。

---

##### 7. 实验结果

![Simulation & Embodied Graph](https://ar5iv.labs.arxiv.org/html/2601.01872v1/assets/x4.png)

*图：仿真环境与构建的 Embodied Graph。环境包含粗粒度建筑和细粒度物体（消防栓、邮箱等）。*

**仿真实验**（Gazebo，25 个随机任务 × 10 次试验）：

| 方法 | 小距离 SR/SPL | 大距离 SR/SPL | 碰撞次数(大) |
|------|-------------|-------------|------------|
| ViNT | 84/68.4 | 48/32.2 | 1.6 |
| NoMaD | 82/70.9 | 22/14.6 | 2.3 |
| GNM | 84/72.3 | 0/0 | - |
| CityWalker | 100/82.4 | 80/68.3 | **4.5** |
| **CausalNav** | **100/88.9** | **80/66.0** | **1.2** |

**关键发现**：
- CausalNav 在碰撞次数上显著优于 CityWalker（1.2 vs 4.5），动态避障能力更强
- 拓扑方法（ViNT/NoMaD/GNM）因单向连通性导致长距离任务路径效率极低
- 在线图更新使 SR 从 78% 提升至 90%，SPL 从 54.7% 提升至 80.1%

**LLM 对比**：DeepSeek-R1-Distill-14B（SR=85%）接近 GPT-4o（SR=88%），层次化检索有效缓解幻觉

**运行效率**：105ms/周期（10Hz 实时），仅比 NoMaD 多 11% 开销

![Real-world Experiments](https://ar5iv.labs.arxiv.org/html/2601.01872v1/assets/x7.png)

*图：真实世界不同距离尺度的导航实验。(a) 短程 130m 物体级指令；(b) 长程 512m 建筑级指令。仅 CausalNav 完成 512m 长程任务。*

**真实世界实验**：在校园环境部署（RTX 4070 + RealSense D435i + RSHelios LiDAR + RTK），CausalNav 是唯一能在 500m+ 高动态户外环境中成功完成长程语义导航的方法。

---

##### 8. 参数消融

![Ablation](https://ar5iv.labs.arxiv.org/html/2601.01872v1/assets/x6.png)

*图：关键参数消融。左至右：\(\alpha\)（空间-语义权重）、\(\beta\)（检索-空间权重）、\(\gamma\)（LLM 评分锐度）。准确率和召回率呈钟形分布，在 \(\alpha=\beta=0.5\)、\(\gamma=1.5\) 处达到峰值。*

#### 🧪 练习题

```yaml
question: "CausalNav 使用时空走廊（spatial-temporal corridor）过滤动态物体的核心优势是什么？"
options:
  - "通过速度阈值快速判断物体是否为动态，计算效率最高"
  - "通过多步位移累积判断动态性，对间歇性运动模式（如路口停车）更鲁棒"
  - "直接利用 LLM 语义推理判断物体是否会移动"
  - "仅依赖 LiDAR 点云密度变化检测动态物体"
answer: 1
explain: "时空走廊将物体的历史轨迹编码为多时间戳的位姿-包围盒序列，通过累积位移超过阈值 k 步来判断动态性，避免了单帧速度阈值对临时静止物体（如等红灯车辆）的误判。"
```