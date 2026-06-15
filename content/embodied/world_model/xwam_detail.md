### X-WAM — 统一4D世界动作建模 (Unified 4D World Action Modeling)

```yaml
id: xwam
name: X-WAM
full_name: "统一4D世界动作建模 (Unified 4D World Action Modeling)"
year: "2026.04"
org: "Stanford/NVIDIA"
paper_url: "https://arxiv.org/abs/2604.26694v2"
category: "embodied"
parent: "worldreel"
motivation: "统一4D合成与动作执行异步噪声采样"
```

#### 📝 一句话总结

X-WAM 提出统一 4D World Action Model，把多视角 RGB-D 未来生成、3D 重建和机器人动作解码放进同一个视频扩散框架，并用轻量深度分支和异步噪声采样解决“视频要慢慢去噪、动作要实时输出”的冲突。

#### 🎯 核心要点

- 从预训练视频扩散模型出发，联合预测未来多视角 RGB-D 视频、机器人状态和动作。
- 通过复制 DiT 最后若干层构造 dedicated depth branch，避免把深度拼成额外 token 导致注意力成本翻倍，也避免通道拼接破坏视频先验。
- 提出 Asynchronous Noise Sampling (ANS)：推理时少步快速解码动作，后续继续用完整步数生成高保真视频。
- 训练时不独立采样视频/动作噪声，而是按与异步推理一致的 joint timestep distribution 采样，减少 train-test mismatch。
- 统一状态/动作接口支持单臂和双臂机器人：状态是末端位姿+夹爪，动作是相对末端运动+夹爪变化。
- 在约 1,492,026 episodes、5,873.9 小时机器人数据上预训练，并在 RoboCasa、RoboTwin 2.0、真实双臂耳机打包任务中验证。
- RoboCasa 平均成功率 79.2%，RoboTwin 2.0 Clean/Randomized 为 89.8%/90.7%，同时获得更好的 RGB、深度和点云重建指标。

#### 🔬 深入细节

![X-WAM 总览图](https://arxiv.org/html/2604.26694v2/x1.png)
*图：X-WAM 同时面向策略执行、视频生成和 4D 几何重建，并用 ANS 平衡动作时延与视频质量。*

```python
# X-WAM 单步去噪与 ANS 推理伪代码
def denoise_xwam(video_latent, state_noisy, action_noisy, t_video, t_action, cond):
    tokens = encode_rgb_state_action(video_latent, state_noisy, action_noisy, cond)
    tokens = add_view_embeddings(tokens)
    shared = dit_shared_trunk(tokens)

    main = shared
    depth = shared
    for block_main, block_depth in interleaved_tail_blocks:
        depth = block_depth(depth, cross_attend_to=main)
        main = block_main(main)

    rgb_velocity, state_velocity, action_velocity = regress_main(main)
    inverse_depth = regress_depth(depth)
    return rgb_velocity, state_velocity, action_velocity, inverse_depth

def asynchronous_inference(cond, video_steps=Nv, action_steps=Na):
    video, state, action = init_noise()
    for i in range(Nv):
        if i < Na:
            # joint denoising: action becomes usable after only Na steps
            v_pred, s_pred, a_pred, depth = denoise_xwam(video, state, action, t_v[i], t_a[i], cond)
            state, action = action_scheduler.step(s_pred, a_pred)
        else:
            # video-only continuation conditioned on already decoded action
            v_pred, _, _, depth = denoise_xwam(video, state, action, t_v[i], t_a=0, cond=cond)
        video = video_scheduler.step(v_pred)
    return action, video, depth
```

X-WAM 面对的核心矛盾来自统一世界模型本身。视频生成需要较多扩散步数才能得到清晰、多视角一致的未来；低维动作却必须尽快输出，否则机器人闭环控制时延过大。若把视频和动作完全同步去噪，动作会被视频拖慢；若完全分离训练，推理时“动作已经干净而视频仍很 noisy”的状态又没有在训练中见过。

第一项设计是轻量 4D 空间适配。常见做法是把 RGB 和 depth 都作为 token 输入，但 token 数翻倍会带来二次注意力开销；把 depth 拼到通道维则改变预训练视频模型的输入分布。X-WAM 保持主视频 DiT 基本不变，只复制最后若干 block 作为深度分支：

$$
h = \mathrm{DiT}_{\text{trunk}}(x_t, s_t, a_t, c),
\qquad
(\hat v_x,\hat v_s,\hat v_a)=\mathrm{Head}_{\text{main}}(h),
\qquad
\hat d=\mathrm{Head}_{\text{depth}}(\mathrm{DiT}_{\text{depth}}(h)).
$$

这样主分支继续利用视频先验，深度分支从共享 latent 中抽取 3D 结构。论文结果显示，显式深度监督不仅改善点云重建，也提升策略成功率，说明空间感知对动作解码本身有帮助。

第二项设计是 ANS。设视频 timestep 为 \(\tau_v\)，动作 timestep 为 \(\tau_a\)。推理中前 \(N_a\) 步同时去噪视频和动作，得到可执行动作后，后 \(N_v-N_a\) 步继续优化视频：

$$
\tau_a =
\begin{cases}
\mathrm{schedule}_a(i), & i < N_a, \\
0, & i \ge N_a .
\end{cases}
$$

训练时，ANS 从 \((\tau_v,\tau_a)\) 的联合分布中采样，使模型经常看到“视频仍 noisy、动作已接近 clean”的状态。这个细节很重要：如果训练时视频和动作噪声独立随机，模型并不会适配推理时的异步轨迹，动作质量和视频质量都会受损。

X-WAM 的数据工程也服务于统一建模。论文把单臂/双臂机器人统一到末端执行器接口：状态为 16 维绝对向量 \((position_3 + quaternion_4 + gripper_1)\times2\)，动作为 14 维相对向量 \((position_3 + axisangle_3 + gripper_1)\times2\)。单臂数据只监督左臂维度，使大规模异构机器人数据能进入同一个模型。

与 UWM、Motus、Cosmos Policy 等 2D world-action 模型相比，X-WAM 的区别在于它把“未来世界长什么样”“未来 3D 空间结构是什么”“机器人下一步怎么动”绑定在同一扩散轨迹中。它不是在视频模型后面接一个动作头，也不是视频生成后再用 Depth Anything 做后处理，而是在训练目标中同时优化 RGB、depth、point cloud consistency 和动作成功率。

#### 🧪 练习题

```yaml
question: "X-WAM 的 Asynchronous Noise Sampling 主要解决什么问题？"
options:
  - "让视频和动作永远使用完全相同的去噪步数"
  - "在动作少步实时解码和视频多步高质量生成之间对齐训练与推理分布"
  - "把深度图从训练数据中全部删除"
  - "用规则控制器替代扩散动作模型"
answer: 1
explain: "ANS 推理时先快速解码动作，再继续生成视频；训练时从匹配该异步流程的联合噪声分布采样，避免 train-test mismatch。"
```
