### AlignTree: 用激活特征和随机森林实时拦截越狱行为

```yaml
id: aligntree
name: AlignTree
full_name: '对齐树 (AlignTree: Efficient Defense)'
year: '2026.01'
org: AAAI
paper_url: https://doi.org/10.1609/aaai.v40i44.41074
category: jailbreak
parent: llama_guard3
motivation: 随机森林实时激活拦截
```

#### 📝 一句话总结

AlignTree 在生成过程中读取模型隐藏层激活，把拒答方向投影和非线性 SVM 分数喂给随机森林，从而用低开销方式实时判断模型是否正在偏离安全对齐。

#### 🎯 核心要点

- **检测位置**：不是只看输入或最终文本，而是在模型生成 token 时检查内部 hidden states。
- **特征设计**：结合线性的 refusal direction 投影和非线性的 RBF-SVM 激活分数。
- **分类器**：用随机森林聚合多层、多 token 的安全信号，输出风险置信度。
- **效率优势**：不需要额外调用大型 guard model，也不需要给目标模型追加长安全提示。
- **防御动作**：当风险超过阈值时，可中止生成、转为拒答、触发审计或切换到更保守解码。

#### 🔬 深入细节

![AlignTree 框架图](https://arxiv.org/html/2511.12217v1/x1.png)

图源：AlignTree 公开论文页面；manifest 中 DOI 页面作为条目元信息保留。

```text
Algorithm: AlignTree inference-time defense
Input:
  aligned model M
  training prompts D_safe, D_unsafe
  layers L*, token positions I*
  risk threshold tau
Output:
  generation with online safety intervention

Training:
1. Run M on D_safe and D_unsafe, collect hidden states x_i^(l).
2. Compute a refusal or safety direction r* from class-conditional means.
3. For selected layers and positions:
     compute linear score s_linear = <x_i^(l), r*> / ||r*||.
     train RBF-SVM to capture nonlinear harmful features.
4. Train a Random Forest on concatenated linear and SVM scores.

Inference:
5. During generation, collect current hidden states.
6. Build the same feature vector.
7. risk = RandomForest.predict_proba(features).
8. If risk > tau, interrupt or redirect generation; otherwise continue.
```

AlignTree 的第一类信号来自“拒答方向”。这类方法假设安全拒答和不安全顺从在隐藏空间中存在可分方向，可以用两类样本均值差近似。对某层激活 `x_i^(l)`，投影分数 `s = <x_i^(l), r*> / ||r*||` 表示当前生成状态更接近拒答侧还是顺从侧。

第二类信号由 SVM 捕获。线性方向对简单分界有效，但越狱行为可能表现为非线性组合，例如某些层的特征单独看不异常，组合起来才危险。RBF-SVM 为每层或关键 token 位置提供一个非线性风险分数，补足单一方向投影的表达能力。

最终随机森林把多个浅层信号合成一个稳定判别器。随机森林适合这里的原因是训练快、推理便宜、对特征尺度不太敏感，并能提供特征重要性。相比再部署一个大模型 guard，它的运行成本低得多，适合在每个生成步骤附近做在线判断。

从产品角度，AlignTree 的防御动作可以比“封禁整条请求”更细。系统可以在风险升高时提前终止当前生成，改写为安全拒答，或者将会话转入更严格的 guard pipeline。这种内部激活防御也有局限：它需要白盒访问目标模型，且对模型版本、层结构和微调方式比较敏感。

#### 🧪 练习题

1. 为什么只看最终文本可能晚于 AlignTree 这类激活级检测？
2. 线性 refusal direction 和非线性 SVM 分数分别捕获什么信号？
3. 如果目标模型升级了权重，AlignTree 的分类器需要重新训练吗？为什么？
