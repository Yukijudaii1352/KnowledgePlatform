### ProcTHOR — ProcTHOR程序化场景生成 (ProcTHOR)

```yaml
id: procthor
name: ProcTHOR
full_name: ProcTHOR程序化场景生成 (ProcTHOR)
year: "2022"
org: Allen AI
paper_url: https://arxiv.org/abs/2206.06994
category: interactive
parent: ai2thor
motivation: 实现一万个室内房屋场景的程序化自动生成
```

#### 📝 一句话总结
ProcTHOR 在 AI2-THOR 之上用程序化规则自动生成大规模、可交互、可定制的室内房屋，使 embodied agent 能在上万套多样化家庭环境中训练并提升零样本泛化。

#### 🎯 核心要点
- **核心问题**：人工制作交互式室内场景成本高，场景数量不足会导致 agent 对少量房屋过拟合。
- **生成流程**：先采样房屋结构和房间布局，再根据语义类别、空间约束和物理可行性放置资产。
- **规模优势**：论文发布 ProcTHOR-10K，可在普通工作站上快速生成大量可交互房屋。
- **实证结论**：用程序化房屋训练的简单视觉导航 agent，在多个 embodied AI benchmark 上表现出更好的零样本迁移。

#### 🔬 深入细节

##### 核心示意图
![ProcTHOR procedurally generated houses](https://ar5iv.labs.arxiv.org/html/2206.06994/assets/figures/procthor-cover.jpg)

*图示展示 ProcTHOR 从程序规则生成多样、可交互、可定制室内房屋的整体目标。*

##### 算法伪代码
```python
def generate_procthor_house(seed):
    rng = Random(seed)
    room_spec = sample_room_spec(rng)
    floorplan = sample_floorplan(room_spec, rng)
    doors = connect_rooms_with_doors(floorplan, rng)

    house = create_empty_house(floorplan, doors)
    for room in house.rooms:
        asset_groups = sample_semantic_asset_groups(room.type, rng)
        for group in asset_groups:
            placement = sample_valid_placement(group, room, house)
            if satisfies_geometry_and_physics(placement):
                house.add(group.instantiate(placement))

    randomize_materials_lighting_and_small_objects(house, rng)
    return export_to_ai2thor(house)
```

##### 背景与动机
Embodied AI 的泛化瓶颈很大程度来自场景规模。真实机器人数据昂贵，手工 3D 场景也昂贵；如果训练只覆盖几十个环境，模型很容易记住纹理、房型和物体共现模式。ProcTHOR 的核心思想是把“制作房屋”转化为程序采样问题，用可控规则生成数量巨大但仍然符合家庭常识的交互场景。

这个过程可抽象为房屋分布建模：

$$
p(H)=p(L)\,p(R\mid L)\,p(A\mid R,L)\,p(M\mid A)
$$

其中 \(L\) 是整体布局，\(R\) 是房间类型和连接关系，\(A\) 是物体/家具资产，\(M\) 是材质、颜色和局部随机化。ProcTHOR 的贡献不在于学习这个分布，而在于把人工知识、资产库和几何约束编码为可扩展的采样器。

##### 生成机制
ProcTHOR 先采样房屋规格和房间平面图，再生成门、墙和房间连接。随后系统按房间类型放置语义资产组，例如卧室中的床和床头柜、厨房中的橱柜和电器、客厅中的沙发和桌子。每个资产组都要满足几何约束，避免穿墙、重叠或不可达等问题。

论文的一个重要细节是“资产组”而不是孤立物体。真实家庭中的物体往往成组出现，单独随机撒物体会造成不自然场景。ProcTHOR 用语义组合保留常识结构，再通过材质、位置和实例替换制造多样性。这使生成结果既可变，又不像完全随机布局那样不可用。

##### 训练与泛化
ProcTHOR-10K 的实验重点是零样本迁移：在程序生成房屋中训练，然后到 AI2-THOR、RoboTHOR、Habitat 等不同环境评估。论文显示，即便使用相对简单的 RGB-only CNN+RNN agent，大规模多样化训练场景也能显著提升泛化。

从算法角度看，ProcTHOR 改变的是数据分布而不是策略结构。若 agent 优化目标为：

$$
\max_{\pi}\ \mathbb{E}_{H\sim p_{\text{ProcTHOR}}}\left[\sum_{t=0}^{T}\gamma^t r_t\right]
$$

那么关键在于 \(p_{\text{ProcTHOR}}\) 覆盖足够多的房型、物体组合和视觉变化，使学到的策略更接近环境不变的导航与交互技能，而不是记忆训练房屋。
