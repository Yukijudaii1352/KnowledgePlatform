### AUDITA: 音频技能审计数据集

```yaml
id: audita
name: AUDITA
full_name: 音频技能审计 (AUDITA)
year: "2026.04"
org: "—"
paper_url: https://arxiv.org/abs/2604.21766
category: frontier_2026
parent: ltu
motivation: 非言语音频QA审计数据集
```

#### 📝 一句话总结

AUDITA 提出了一个由真实世界、人类撰写的音频问答审计基准，用 trivia/pyramidal audio questions、强干扰 MCQ 和 IRT 分析系统暴露当前音频大模型在非言语声学线索、长程时序依赖和实体级知识链接上的能力缺口。

#### 🎯 核心要点

- **9,690 个音频问答样本**：包含 6,460 个核心人类撰写题和 3,230 个外部参考题，覆盖 8,713 个唯一音频片段
- **真实世界音频来源**：Quizmasters、PAVEMENT、Audio-Packets 等公开 trivia/quizbowl 音频材料，避免合成场景和模板化问答
- **六类可解释题目 taxonomy**：Cultural Geography in Sound、Name The Music、Who's Who、Elements of Musical Works、Pop Culture and Media、Environmental and Acoustic Sound Recognition
- **强干扰 MCQ 构造**：每题 1 个正确答案和 3 个经人工验证的 AI 生成干扰项，干扰项按实体类型、年代、性别、风格等属性匹配
- **人类与模型双基线**：人类 free-form 平均 32.13%、MCQ 60.16%，模型平均仅 8.86% 和 15.65%
- **IRT 审计分析**：用 2PL Item Response Theory 同时估计题目难度 \(b\)、区分度 \(a\) 和被试能力 \(\theta\)，定位高难且有诊断价值的音频题

#### 🔬 深入细节

![AUDITA 人类-模型准确率差距](https://quickchart.io/chart?width=760&height=380&c=%7Btype%3A%27bar%27%2Cdata%3A%7Blabels%3A%5B%27Free-form%20QA%27%2C%27Multiple-choice%20QA%27%5D%2Cdatasets%3A%5B%7Blabel%3A%27Humans%27%2Cdata%3A%5B32.13%2C60.16%5D%2CbackgroundColor%3A%27rgb%2854%2C162%2C235%29%27%7D%2C%7Blabel%3A%27Models%20avg%27%2Cdata%3A%5B8.86%2C15.65%5D%2CbackgroundColor%3A%27rgb%28255%2C99%2C132%29%27%7D%5D%7D%2Coptions%3A%7Bplugins%3A%7Btitle%3A%7Bdisplay%3Atrue%2Ctext%3A%27AUDITA%20human-model%20accuracy%20gap%20%28%25%29%27%7D%2Clegend%3A%7Bposition%3A%27bottom%27%7D%7D%2Cscales%3A%7By%3A%7BbeginAtZero%3Atrue%2Cmax%3A70%2Ctitle%3A%7Bdisplay%3Atrue%2Ctext%3A%27Accuracy%20%28%25%29%27%7D%7D%7D%7D%7D)
*图：依据论文 human/model aggregate performance 表重绘的 AUDITA 审计结果。人类在 free-form 与 MCQ 两种设置下都显著领先模型，说明该基准主要暴露音频理解缺口而不是文本先验。*

##### 数据集构建与审计伪代码

```python
# AUDITA 构建与评测流程
def build_audita(raw_audio_question_sources, external_aqa_sets):
    # 1. 抽取和对齐真实世界音频 trivia 题
    triples = []
    for source in raw_audio_question_sources:
        clips, questions, answers = scrape_source(source)
        aligned = align_audio_question_answer(clips, questions, answers)
        triples.extend(aligned)

    # 2. 规范化与分类
    triples = normalize_formatting_and_answers(triples)
    triples = assign_taxonomy_with_gpt4o_mini(triples, num_categories=6, num_subcategories=26)

    # 3. 生成强干扰多选项
    for item in triples:
        entity_type = infer_answer_type(item.answer)
        distractors = generate_plausible_distractors(item.answer, entity_type)
        item.options = human_validate([item.answer] + distractors)

    # 4. 加入外部参考集并进行人类/模型评测
    benchmark = triples + filter_external_sets(external_aqa_sets)
    human_matrix = collect_human_answers(benchmark, no_transcript=True, no_web=True)
    model_matrix = evaluate_audio_language_models(benchmark, no_finetune=True)

    # 5. 用 IRT 拟合能力、难度和区分度
    irt = fit_2pl_irt(binary_correctness=[human_matrix, model_matrix])
    return benchmark, irt
```

##### 为什么 AUDITA 要用 trivia 音频题

许多早期 AQA 数据集把问题建立在音频 caption、事件标签或合成场景上，模型可能通过题面模板、caption 语言先验或短促显著声学线索取得高分，而不一定真正理解音频。AUDITA 反其道而行之：核心题来自人类原本用于 quiz/trivia 的真实音频材料，问题往往要求从旋律、音色、角色声音、影视主题、环境声或逐步揭示的 pyramidal clues 中识别实体或答案。

这类题的难点在于答案空间大、线索分散且经常跨越非言语声学和世界知识。例如“这段主题曲来自哪部电影”不能靠转录文本完成；“听出作曲家/演奏者/角色”需要把 timbre、melody、orchestration、voice identity 与文化知识对齐。论文因此把 AUDITA 定位为 audit benchmark：不是追求让模型拿高分，而是像听力审计一样揭示模型到底缺少哪类音频能力。

##### 数据组织：核心人类题 + 外部参考题

AUDITA 共 9,690 个 QA，其中 6,460 个是核心 human-authored sources，3,230 个来自 OpenAQA 与 ClothoAQA 等外部参考集。核心部分进一步包括 4,138 个 Quizmasters trivia-style 问题，以及 2,322 个 pyramidal-style 问题（PAVEMENT 673、Audio-Packets 1,649）。论文保留外部数据不是为了稀释主任务，而是作为参照：外部数据往往更短、更偏 caption 或感知标签，能帮助说明 AUDITA 的人类-模型差距来自更强的推理和音频 grounding 要求。

数据准备分三步：alignment 确保音频、问题、答案正确配对；normalization 清理编码、格式和答案别名；categorization 用 GPT-4o-mini 分到 6 个高层类别和 26 个子类。这个分类不仅便于统计，也服务于人类评测：参与者可以选择自己较熟悉的类别，避免把“完全不懂某领域 trivia”误判为音频不可解。

##### 强干扰 MCQ：为什么模型会低于随机

AUDITA 同时提供 free-form 和 multiple-choice 两种评测。MCQ 并不是简单随机塞三个错误答案，而是先识别正确答案的语义类型，再生成属性匹配的干扰项。例如正确答案是音乐人时，干扰项要匹配性别、年代、流派并且是真实艺人；正确答案是演员时，干扰项要匹配年代、职业、性别、口音等。第二作者还会独立检查实体有效性、互异性和不可被轻易排除。

因此 MCQ 的 25% 随机基线并不代表任务简单。论文报告模型平均 MCQ 只有 15.65%，低于四选一随机，并解释这不是选项位置坍缩，而是模型在强相似干扰项中系统性偏向“看起来合理但声学证据不支持”的答案。人类 MCQ 达到 60.16%，top 20% 人类参与者接近满分，说明低模型分主要来自音频 grounding 和实体链接失败。

##### IRT：把准确率拆成能力、难度和区分度

AUDITA 的核心分析工具是二参数逻辑 IRT。每个人类群体或模型被视为 respondent，能力为 \(\theta_j\)；每道题有难度 \(b_i\) 和区分度 \(a_i\)。答对概率为：

$$
P(y_{ij}=1\mid \theta_j,a_i,b_i)=\sigma(a_i(\theta_j-b_i))
$$

其中 \(\sigma(\cdot)\) 是 logistic 函数。\(b_i\) 越大，题目越难；\(a_i\) 越大，题目越能区分强弱系统；\(\theta_j\) 越高，被试越能答对高难题。论文用 respondent × item 的二值正确矩阵最大似然估计这些参数，并在同一潜在尺度上比较人类与模型。报告中人类 free-form 平均 \(\theta\) 约为 0.05，而模型平均约为 -2.91；MCQ 中人类约 0.08，模型约 -2.45。

这个分析比单纯准确率更有用：如果一道题所有人和模型都错，它可能只是过难；如果一道题弱模型也能靠文本猜对，它的区分度低；高区分度题才真正适合作为审计样本。AUDITA 还利用 IRT 暴露已有 AQA 数据集的常见问题，例如问题歧义、答案 underspecified、metadata/caption 泄漏、可不听音频直接回答等。

##### 模型失败模式：不是只缺知识，而是声学和知识无法联合

论文把错误分为 knowledge-based、perceptual 和 audio-cue reasoning 三类。知识型错误占 78.23%，但这并不意味着音频无关：很多问题需要先从声音中定位实体线索，再调用世界知识完成答案。比如作曲家识别既需要听出旋律/配器，也需要把线索连到 Carl Orff 等实体；角色声音题既需要 voice identity，也需要角色知识。

一个关键对照是 transcript-only 与 raw-audio 设置。模型用 raw audio + question 的准确率是 8.86%，而 transcript-only 只有 4.26%，text-only 几乎为 0。若任务主要靠文本或事实记忆，转录文本应该不低于原始音频；实际相反，说明非言语声学线索在许多题里不可替代。AUDITA 因而指出，下一代音频大模型不仅要更强 ASR，还要能把 timbre、rhythm、melody、background texture 和实体级知识共同建模。

> ⚠️ 注意：AUDITA 中人类 free-form 平均 32.13% 并不代表数据不可答，而是开放式音频 trivia 的答案空间极大且评分严格；MCQ 与 top human 结果表明这些题对熟练听者是可解的。

#### 🧪 练习题

```yaml
question: "AUDITA 为什么使用 IRT 而不只报告平均准确率？"
options:
  - "因为 IRT 可以把所有音频转成文本"
  - "因为 IRT 能同时估计被试能力、题目难度和题目区分度，发现哪些题真正有诊断价值"
  - "因为 IRT 会自动生成更多训练数据"
  - "因为 IRT 可以避免人工评测"
answer: 1
explain: "准确率默认每道题等权且同样有信息量；IRT 通过 \\(\\theta\\)、\\(b\\)、\\(a\\) 分离能力、难度和区分度，更适合审计模型在高难音频题上的真实缺口。"
```
