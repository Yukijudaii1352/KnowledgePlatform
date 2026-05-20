### RoboFlamingo

```yaml
id: roboflamingo
name: RoboFlamingo
full_name: "RoboFlamingo: Vision-Language Foundation Models for Effective Robot Manipulation"
year: "2023"
org: —
paper_url: https://arxiv.org/abs/2311.01378
category: embodied
parent: Flamingo
motivation: 将大规模视觉-语言预训练模型（VLM）适配到机器人操作任务，通过单视觉-语言模型实现语言指令理解与闭环操作策略
```

#### 📝 一句话总结

RoboFlamingo 提出将预训练的通用视觉-语言模型（OpenFlamingo）适配到机器人操控领域，通过简单的 LSTM 策略头与时序观测编码，使单一 VLM 同时完成语言指令理解和视觉闭环控制，在 CALVIN 基准上取得最佳性能。
