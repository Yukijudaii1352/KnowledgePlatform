### E(3)等变扩散模型 (E(3)-EDM)

```yaml
id: e3_edm
name: E(3)-EDM
full_name: E(3)等变扩散模型 (E(3)-EDM)
year: '2022'
org: University of Amsterdam
paper_url: https://arxiv.org/abs/2203.17003
category: generation
parent: —
motivation: 首个E(3)等变扩散模型
```

#### 📝 一句话总结

E(3)-EDM 提出首个直接在三维原子坐标与原子类型上联合扩散的 E(3) 等变分子生成模型，用等变 EGNN 学习去噪过程，解决了 3D 分子生成中旋转、平移、反射对称性和离散/连续变量联合建模的问题。

#### 🎯 核心要点

- **联合生成 3D 坐标与原子特征**：将分子表示为 \((\mathbf{x}, \mathbf{h})\)，其中 \(\mathbf{x}\) 是原子三维坐标，\(\mathbf{h}\) 包含原子类型、形式电荷等特征
- **E(3) 等变去噪网络**：使用 EGNN 作为噪声预测器，坐标输出随旋转/反射等变，特征输出保持不变
- **零质心坐标子空间**：对坐标减去 center of gravity，使平移不变的概率建模可归一化，并避免采样链整体漂移
- **噪声预测参数化**：训练网络预测扩散噪声 \(\hat{\boldsymbol{\epsilon}}\)，再由 \(\hat{\boldsymbol{\epsilon}}\) 还原 \(\hat{\mathbf{z}}_0\)，优化比直接预测样本更稳定
- **连续与离散特征统一处理**：坐标用高斯扩散，类别特征用 one-hot 连续扰动并在 \(t=0\) 通过积分恢复类别似然
- **可计算 likelihood**：给出兼容坐标子空间、类别特征和电荷特征的变分下界推导
- **分子大小先验**：先从训练集的原子数分布采样 \(n\)，再条件于 \(n\) 生成对应大小的分子
- **实验覆盖 QM9 与 GEOM-Drugs**：在小分子和较大药物样分子上验证稳定性、有效性和训练效率

#### 🔬 深入细节

![E(3)-EDM 总览](https://ar5iv.labs.arxiv.org/html/2203.17003/assets/x1.png)
*图 1：E(3)-EDM 从标准高斯噪声点云逐步去噪为带 3D 坐标和原子类型的分子；旋转输入分子不会改变其 likelihood。*

![E(3)-EDM 扩散与去噪过程](https://ar5iv.labs.arxiv.org/html/2203.17003/assets/x2.png)
*图 2：训练时对真实分子加噪并让网络预测噪声；采样时从噪声开始迭代执行反向去噪。图像来自论文 ar5iv HTML，可访问来源为 `https://ar5iv.labs.arxiv.org/html/2203.17003`。*

```python
# E(3)-EDM 训练与采样伪代码
def train_edm(batch):
    x0, h0 = batch.coords, batch.atom_features
    n = x0.shape[0]

    # 坐标建模在零质心子空间中，特征不做质心约束
    x0 = x0 - x0.mean(axis=0, keepdims=True)
    z0 = concat(x0, h0)

    t = uniform_integer(1, T)
    eps_x = gaussian_noise_like(x0)
    eps_x = eps_x - eps_x.mean(axis=0, keepdims=True)
    eps_h = gaussian_noise_like(h0)
    eps = concat(eps_x, eps_h)

    zt = alpha[t] * z0 + sigma[t] * eps
    eps_hat = egnn_denoiser(zt, t, n)
    eps_hat.coords -= eps_hat.coords.mean(axis=0, keepdims=True)

    loss = mse(eps_hat, eps)
    optimizer.step(loss)


def sample_edm():
    n = sample_num_atoms_prior()
    z = sample_standard_normal(n)
    z.coords -= z.coords.mean(axis=0, keepdims=True)

    for t in reversed(range(1, T + 1)):
        eps_hat = egnn_denoiser(z, t, n)
        z0_hat = (z - sigma[t] * eps_hat) / alpha[t]
        z = sample_reverse_posterior(z, z0_hat, t)
        z.coords -= z.coords.mean(axis=0, keepdims=True)

    x, h = decode_positions_and_atom_types(z)
    return build_molecule(x, h)
```

**动机与背景：为什么 3D 分子生成需要等变扩散？**

分子不是普通向量或图像，而是存在于三维欧氏空间中的原子点云。同一个分子整体平移、旋转，甚至在不考虑手性的任务中反射后，化学意义应保持一致。早期 3D 生成方法常见两类路线：逐原子自回归模型需要人为规定原子顺序，采样慢且容易把局部决策误差累积到后续步骤；等变 normalizing flow 虽然可以保留精确 likelihood，但训练时要积分连续动力学，计算成本较高。E(3)-EDM 的核心选择是把扩散模型与 E(n) 等变 GNN 结合：用固定的前向加噪过程破坏分子结构，再训练等变网络学习反向去噪，从而避免原子顺序假设，并把几何对称性直接写入模型。

**扩散变量：连续坐标和类别特征被拼成同一个去噪对象。**

对每个分子，论文把原子坐标 \(\mathbf{x}\in\mathbb{R}^{n\times 3}\) 与原子特征 \(\mathbf{h}\) 拼接为 \(\mathbf{z}=[\mathbf{x},\mathbf{h}]\)。前向扩散采用 variance-preserving 形式：

$$
q(\mathbf{z}_t\mid \mathbf{z}_0)=\mathcal{N}(\mathbf{z}_t;\alpha_t\mathbf{z}_0,\sigma_t^2\mathbf{I})
$$

其中 \(\alpha_t\) 控制信号保留量，\(\sigma_t\) 控制噪声强度。坐标部分有一个额外约束：\(\sum_i \mathbf{x}_i=0\)。这是因为全空间中的平移不变密度无法归一化；把所有坐标投影到零质心子空间后，模型只需要学习相对几何关系。特征部分不受旋转和平移影响，因此可以直接加标准高斯噪声。对原子类型这类类别变量，模型使用 one-hot 表示并加连续噪声，最后在 \(t=0\) 的 likelihood 项中把连续区间积分回类别概率。

**去噪网络：EGNN 让反向链天然满足 E(3) 等变。**

EDM 使用 EGNN 预测噪声 \(\hat{\boldsymbol{\epsilon}}=\phi_\theta(\mathbf{z}_t,t)\)。典型 EGNN 层先根据节点特征和距离构造消息，再更新特征和坐标：

$$
\mathbf{m}_{ij}=\phi_e\left(\mathbf{h}_i,\mathbf{h}_j,\|\mathbf{x}_i-\mathbf{x}_j\|^2,a_{ij}\right)
$$

$$
\mathbf{x}_i^{\ell+1}=\mathbf{x}_i^\ell+\sum_{j\neq i}\frac{\mathbf{x}_i^\ell-\mathbf{x}_j^\ell}{\|\mathbf{x}_i^\ell-\mathbf{x}_j^\ell\|+1}\phi_x(\mathbf{m}_{ij})
$$

$$
\mathbf{h}_i^{\ell+1}=\phi_h\left(\mathbf{h}_i^\ell,\sum_{j\neq i}\mathbf{m}_{ij}\right)
$$

距离 \(\|\mathbf{x}_i-\mathbf{x}_j\|^2\) 对旋转和平移不变，坐标更新只沿相对向量方向移动，所以输入整体旋转后，输出坐标噪声会随之旋转；原子类型输出则不变。网络输出噪声后，通过

$$
\hat{\mathbf{z}}_0=\frac{\mathbf{z}_t-\sigma_t\hat{\boldsymbol{\epsilon}}_\theta(\mathbf{z}_t,t)}{\alpha_t}
$$

得到对干净分子的估计，再代入高斯后验 \(p_\theta(\mathbf{z}_{t-1}\mid \mathbf{z}_t)\)。训练目标可写成加权噪声回归：

$$
\mathcal{L}_t=w(t)\left\|\boldsymbol{\epsilon}-\hat{\boldsymbol{\epsilon}}_\theta(\mathbf{z}_t,t)\right\|_2^2
$$

论文也讨论了完整变分下界，但实践中采用类似 DDPM 的未加权 MSE 往往产生更好的样本质量。

> 💡 关键：EDM 的“等变性”不是后处理得到的，而是由坐标子空间、各向同性高斯噪声、等变转移分布和 EGNN 噪声预测器共同保证的。

**训练与采样流程：先采样原子数，再在零质心空间中生成点云。**

训练时，模型从真实分子中采样时间步 \(t\)，按噪声日程生成 \(\mathbf{z}_t\)，让 EGNN 预测噪声。采样时，模型先根据训练集统计的分子大小分布采样原子数 \(n\)，再从零质心标准高斯初始化 \(\mathbf{z}_T\)，逐步执行 \(T\rightarrow 0\) 的反向去噪。最后把坐标解码为 3D 构象，把 one-hot/电荷特征解码为离散原子属性，并用化学工具检查稳定性。

**与传统 3D 分子生成方法的区别。**

相比逐原子自回归方法，E(3)-EDM 一次性维护整套分子点云的全局状态，每一步去噪都能看到所有原子之间的相互作用，不需要人为规定生成顺序。相比等变 flow，扩散训练不需要求解连续 ODE，工程上更稳定，扩展到 GEOM-Drugs 这类更大药物样分子也更直接。相比只生成 2D 图的分子模型，EDM 的输出天然包含构象信息，因此更适合后续对接、构象分析和结构条件生成方法作为基础模块。DiffSBDD、TargetDiff 等后续 SBDD 模型本质上都沿用了这个“3D 坐标 + 类型联合扩散 + 等变去噪”的范式，只是把无条件分子生成扩展到了蛋白口袋条件生成。

#### 🧪 练习题

```yaml
question: "E(3)-EDM 为什么要在坐标扩散前减去分子的 center of gravity？"
options:
  - "为了让分子更容易满足 Lipinski 规则"
  - "为了在零质心子空间中定义可归一化的平移不变坐标分布，并避免采样整体漂移"
  - "为了把所有原子类型转换成连续变量"
  - "为了让 EGNN 只能建模相邻化学键而不能建模长程相互作用"
answer: 1
explain: "整体平移不改变分子，因此全空间中的平移不变密度不可归一化。把坐标限制到零质心子空间后，模型学习相对几何关系，反向采样也不会出现整体漂移。"
```
