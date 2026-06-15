### TriDF

```yaml
id: tridf
name: TriDF
full_name: "可解释深伪检测 (Interpretable DeepFake Detection)"
year: "2026.06"
org: "CVPR 2026"
paper_url: "https://openaccess.thecvf.com/CVPR2026/TriDF"
category: "face"
parent: "retinaface"
motivation: "提供可解释文本说明的深伪检测框架"
```

#### 📝 一句话总结

TriDF 提出面向可解释 DeepFake 检测的三视角基准，同时评估模型对伪造痕迹的感知、真假检测能力和解释幻觉倾向，暴露 MLLM 检测器“会判断但解释不可靠”的风险。

#### 🎯 核心要点

- **正式资料补足**：用户给定 URL 是 CVF 简写，正式论文可由 CVPR 2026 openaccess 与 arXiv `2512.10652` 检索
- **Tri-Perspective 评估**：Perception、Detection、Hallucination 三个维度联合衡量可解释检测可靠性
- **多模态数据覆盖**：包含图像、视频、音频三类 DeepFake，覆盖 16 种伪造类型和 51 个生成器
- **大规模测试集**：约 76K 测试样本，构造 real-fake pairs 以支持精细对比标注
- **伪造痕迹 taxonomy**：将 artifacts 分为 quality artifacts 与 semantic artifacts，并记录位置/部位信息
- **多题型构造**：使用 TFQ、MCQ、OEQ 分别评估二值感知、多选定位和开放解释
- **幻觉指标**：使用 Cover、CHAIR、Hal、加权 \(F_\beta\) 等指标衡量解释覆盖和伪造证据编造

#### 🔬 深入细节

![TriDF 流水线](https://arxiv.org/html/2512.10652v1/x2.png)
*图：TriDF 先生成/质控/标注 real-fake 数据，再通过多题型输入 MLLM，最终评估感知、检测和幻觉。*

```python
# TriDF benchmark 构建与评测伪代码
for real_sample in public_human_datasets:
    for deepfake_task in manipulation_tasks:
        fake = generate_with_multiple_models(real_sample, deepfake_task)
        if quality_control(fake, real_sample):
            pair = make_real_fake_pair(real_sample, fake)
            artifacts = human_annotate(pair, taxonomy=["quality", "semantic", "location"])
            add_to_tridf(pair, artifacts)

for sample, questions in tridf_eval:
    response = mllm(sample, questions)
    mapped_artifacts = artifact_mapper_llm(response, predefined_taxonomy)
    perception_score = score_tfq_mcq(response, ground_truth)
    detection_acc = score_real_fake_decision(response)
    cover = artifact_cover(mapped_artifacts, ground_truth_artifacts)
    chair = hallucination_rate(mapped_artifacts, ground_truth_artifacts)
```

**动机与背景。** 传统 deepfake detection 数据集多以二分类为核心，只问“真/假”。但现实使用中，检测器需要给出可信理由：是眼部不一致、牙齿纹理异常、唇音不同步，还是背景/人体结构违背常识。MLLM 具备文本解释能力，却可能生成听起来合理但并不存在的伪造证据。TriDF 因此把检测能力拆成三个互相制约的维度。

**三视角定义。** Perception 评估模型是否真的看到了伪造痕迹，例如是否能定位鼻子、牙齿、手部或背景中的 artifact。Detection 评估最终真假判断。Hallucination 评估解释是否编造不存在的 artifact。一个模型可能 detection accuracy 高，但如果解释经常 hallucinate，就不适合高风险取证场景。

**数据生成与 taxonomy。** TriDF 收集公开人类相关数据，使用 GAN、Stable Diffusion、DiT、专有生成模型等构造部分操纵和完全合成样本。部分操纵包括 face swap、属性编辑、lip-sync、reenactment、full-body puppetry、subject-driven editing、voice conversion；完全合成包括 talking head、身份保持图像/视频、human-scene image/video、voice cloning 等。伪造痕迹分为 quality artifacts 和 semantic artifacts：前者如模糊、噪声、闪烁、局部纹理坏点；后者如解剖结构错误、物体完整性问题、不可读文字、语音韵律异常。

**题型设计。** Perception 使用 TFQ/MCQ/Type-A OEQ。TFQ 问某个 artifact 是否存在，MCQ 要从多个候选和 “none of the above” 中选择，OEQ 要求在已知为 fake 的条件下结构化列举痕迹。Detection 使用 Type-B OEQ：模型必须先给出 real/fake 判断，再给出证据列表。Hallucination 则从 Type-A/Type-B 的开放解释中派生，检查模型是否报告了标注中不存在的 artifact。

**指标。** 对 MCQ，正确选择得分、错误选择扣分，避免靠全选套利。开放答案难以直接字符串匹配，论文用稳定外部 LLM 将回答映射到预定义 artifact taxonomy，再计算覆盖率：

$$
\text{Cover}=\frac{|\text{mapped artifacts}\cap \text{GT artifacts}|}{|\text{GT artifacts}|}
$$

幻觉可用 CHAIR 衡量：

$$
\text{CHAIR}=\frac{|\text{mapped artifacts}\setminus \text{GT artifacts}|}{|\text{mapped artifacts}|}
$$

如果模型把 fake 判成 real 或没有按格式回答，论文会施加惩罚，因为这种情况下解释已经无法作为可信取证依据。

**主要发现。** TriDF 的实验显示，强 MLLM 在感知上仍只中等优于随机，开放解释的 Cover 与 CHAIR 往往存在拉扯：解释越多可能覆盖更多真痕迹，也更容易编造不存在的痕迹。结论是可解释 deepfake detection 不能只报告 accuracy，必须同时报告证据感知和幻觉风险。

#### 🧪 练习题

```yaml
question: "TriDF 为什么要把 DeepFake 检测拆成 Perception、Detection 和 Hallucination 三个维度？"
options:
  - "为了只评估音频伪造"
  - "因为真假判断、证据识别和解释可靠性可能不一致，单一 accuracy 无法衡量可信检测"
  - "为了替代所有二分类检测器训练"
  - "因为 MLLM 不能输出文本"
answer: 1
explain: "模型可能判断正确但证据错误或幻觉严重，因此 TriDF 同时检查是否看见真痕迹、是否判对真假以及是否编造理由。"
```
