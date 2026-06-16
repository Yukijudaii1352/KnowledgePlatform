/**
 * llm_rlhf-data.js — 由 pipeline/build.py 于 2026-06-16 17:00:17 自动生成。
 * 源文件：content/llm/llm_rlhf.md
 * ⚠️  请勿手动修改；如需更新，修改源文档后重新编译。
 */
window.PAGE_CONFIG = {
  "meta": {
    "domain": "llm",
    "topic_id": "llm_rlhf",
    "topic_name": "LLM人类偏好对齐",
    "page_title": "LLM人类偏好对齐技术演进图谱",
    "page_subtitle": "2026-05-12 版",
    "page_desc": "涵盖RLHF、DPO、Constitutional AI等对齐方法的原理与实践，以及2026年最新研究进展",
    "page_icon": "🎯",
    "hero_pills": [],
    "count_pill": "24 个算法",
    "image_base": "../../content/llm/llm_rlhf/assets/",
    "overview_from_doc": true,
    "latest_overview_from_doc": true
  },
  "overview": [
    {
      "title": "",
      "body_html": "<h1>大模型强化学习与偏好对齐算法梳理</h1>\n<ul>\n<li>来源平台: <strong>zhihu</strong>（知乎专栏文章）</li>\n<li>原文链接: <a href=\"https://zhuanlan.zhihu.com/p/2030296408679506978\">https://zhuanlan.zhihu.com/p/2030296408679506978</a></li>\n<li>作者: 李进锋</li>\n</ul>\n<hr />\n<p>大模型强化学习与偏好对齐算法梳理</p>\n<h1>大模型强化学习与偏好对齐算法梳理</h1>\n<p>作者: 李进锋, 赞: 7</p>\n<blockquote>\n<p>偶然翻到了之前学习强化学习算法时写的一些笔记，主要是梳理了大模型对齐领域比较核心的 8 种强化学习与偏好优化算法，按训练范式划分为在线强化学习（4 种）和离线偏好优化（4 种）两大类别。每种算法均从算法细节、核心优势、存在不足三个维度做了一些总结。觉得整理得还行，就决定发出来分享下，如果有错误的地方，也欢迎大家评论区指正。</p>\n</blockquote>\n<hr />\n<h2>一、在线强化学习</h2>\n<p>在线强化学习算法在训练过程中需要实时从当前策略模型中采样数据，并通过奖励模型或环境反馈计算优势函数，进而更新策略。这类方法通常需要维护多个模型（Actor、Critic、Reference、Reward），显存开销大，但性能上限高。</p>\n<h3>1.1 PPO (Proximal Policy Optimization)</h3>\n<h3>算法细节</h3>\n<p>PPO 是目前工业界应用最广泛的在线强化学习算法，由 Schulman 等人于 2017 年提出。其核心目标是<strong>通过裁剪机制约束策略更新幅度，保证训练稳定性</strong>。</p>\n<p><strong>Clip 目标函数</strong>（DAPO 论文 Equation 1）：PPO 通过对重要性采样比率进行裁剪，防止策略在单次更新中偏离旧策略过远。在 LLM 场景下，其目标函数定义为：</p>\n<p><img alt=\"J_{PPO}(\\theta) = \\mathbb{E}_{(q,a)\\sim D, o_{\\leq t}\\sim\\pi_{\\theta_{old}}(\\cdot|q)}\\left[\\min\\left(\\frac{\\pi_\\theta(o_t|q, o_{&lt;t})}{\\pi_{\\theta_{old}}(o_t|q, o_{&lt;t})}\\hat{A}_t, \\text{clip}\\left(\\frac{\\pi_\\theta(o_t|q, o_{&lt;t})}{\\pi_{\\theta_{old}}(o_t|q, o_{&lt;t})}, 1-\\epsilon, 1+\\epsilon\\right)\\hat{A}_t\\right)\\right]\" src=\"https://www.zhihu.com/equation?tex=J_%7BPPO%7D%28%5Ctheta%29+%3D+%5Cmathbb%7BE%7D_%7B%28q%2Ca%29%5Csim+D%2C+o_%7B%5Cleq+t%7D%5Csim%5Cpi_%7B%5Ctheta_%7Bold%7D%7D%28%5Ccdot%7Cq%29%7D%5Cleft%5B%5Cmin%5Cleft%28%5Cfrac%7B%5Cpi_%5Ctheta%28o_t%7Cq%2C+o_%7B%3Ct%7D%29%7D%7B%5Cpi_%7B%5Ctheta_%7Bold%7D%7D%28o_t%7Cq%2C+o_%7B%3Ct%7D%29%7D%5Chat%7BA%7D_t%2C+%5Ctext%7Bclip%7D%5Cleft%28%5Cfrac%7B%5Cpi_%5Ctheta%28o_t%7Cq%2C+o_%7B%3Ct%7D%29%7D%7B%5Cpi_%7B%5Ctheta_%7Bold%7D%7D%28o_t%7Cq%2C+o_%7B%3Ct%7D%29%7D%2C+1-%5Cepsilon%2C+1%2B%5Cepsilon%5Cright%29%5Chat%7BA%7D_t%5Cright%29%5Cright%5D\" /></p>\n<p>其中 <img alt=\"(q, a)\" src=\"https://www.zhihu.com/equation?tex=%28q%2C+a%29\" /> 是问题-答案对（来自数据分布 <img alt=\"D\" src=\"https://www.zhihu.com/equation?tex=D\" />），<img alt=\"o_{\\leq t}\" src=\"https://www.zhihu.com/equation?tex=o_%7B%5Cleq+t%7D\" /> 是从旧策略 <img alt=\"\\pi_{\\theta_{old}}\" src=\"https://www.zhihu.com/equation?tex=%5Cpi_%7B%5Ctheta_%7Bold%7D%7D\" /> 采样的响应前缀，<img alt=\"\\epsilon\" src=\"https://www.zhihu.com/equation?tex=%5Cepsilon\" /> 是裁剪范围（通常设为 0.2），<img alt=\"\\hat{A}_t\" src=\"https://www.zhihu.com/equation?tex=%5Chat%7BA%7D_t\" /> 是优势估计值。</p>\n<p>核心机制：当重要性采样比率 <img alt=\"\\frac{\\pi_\\theta(o_t|q, o_{&lt;t})}{\\pi_{\\theta_{old}}(o_t|q, o_{&lt;t})}\" src=\"https://www.zhihu.com/equation?tex=%5Cfrac%7B%5Cpi_%5Ctheta%28o_t%7Cq%2C+o_%7B%3Ct%7D%29%7D%7B%5Cpi_%7B%5Ctheta_%7Bold%7D%7D%28o_t%7Cq%2C+o_%7B%3Ct%7D%29%7D\" /> 超出 <img alt=\"[1-\\epsilon, 1+\\epsilon]\" src=\"https://www.zhihu.com/equation?tex=%5B1-%5Cepsilon%2C+1%2B%5Cepsilon%5D\" /> 区间时，目标函数被裁剪，阻止梯度更新，从而限制策略变化幅度。这从根本上解决了 TRPO 复杂的 KL 约束优化问题。</p>\n<p><strong>广义优势估计（GAE）</strong>（DAPO 论文 Equation 2-3）：PPO 使用 GAE 来平衡优势估计的偏差与方差：</p>\n<p><img alt=\"\\hat{A}^{GAE(\\gamma,\\lambda)}_t = \\sum_{l=0}^{\\infty} (\\gamma\\lambda)^l \\delta_{t+l}\" src=\"https://www.zhihu.com/equation?tex=%5Chat%7BA%7D%5E%7BGAE%28%5Cgamma%2C%5Clambda%29%7D_t+%3D+%5Csum_%7Bl%3D0%7D%5E%7B%5Cinfty%7D+%28%5Cgamma%5Clambda%29%5El+%5Cdelta_%7Bt%2Bl%7D\" /></p>\n<p>其中 TD 残差定义为：</p>\n<p><img alt=\"\\delta_l = R_l + \\gamma V(s_{l+1}) - V(s_l), \\quad 0 \\leq \\gamma, \\lambda \\leq 1\" src=\"https://www.zhihu.com/equation?tex=%5Cdelta_l+%3D+R_l+%2B+%5Cgamma+V%28s_%7Bl%2B1%7D%29+-+V%28s_l%29%2C+%5Cquad+0+%5Cleq+%5Cgamma%2C+%5Clambda+%5Cleq+1\" /></p>\n<p><img alt=\"\\gamma\" src=\"https://www.zhihu.com/equation?tex=%5Cgamma\" /> 是折扣因子，<img alt=\"\\lambda\" src=\"https://www.zhihu.com/equation?tex=%5Clambda\" /> 是 GAE 参数。当 <img alt=\"\\lambda=0\" src=\"https://www.zhihu.com/equation?tex=%5Clambda%3D0\" /> 时，<img alt=\"\\hat{A}_t = \\delta_t\" src=\"https://www.zhihu.com/equation?tex=%5Chat%7BA%7D_t+%3D+%5Cdelta_t\" />（高偏差低方差）；当 <img alt=\"\\lambda=1\" src=\"https://www.zhihu.com/equation?tex=%5Clambda%3D1\" /> 时，<img alt=\"\\hat{A}_t = \\sum_{l=0}^{\\infty} \\gamma^l \\delta_{t+l}\" src=\"https://www.zhihu.com/equation?tex=%5Chat%7BA%7D_t+%3D+%5Csum_%7Bl%3D0%7D%5E%7B%5Cinfty%7D+%5Cgamma%5El+%5Cdelta_%7Bt%2Bl%7D\" />（低偏差高方差）。通过调节 <img alt=\"\\lambda\" src=\"https://www.zhihu.com/equation?tex=%5Clambda\" />，可以在偏差与方差之间取得最佳平衡。</p>\n<p><strong>Actor-Critic 架构</strong>：PPO 采用 Actor-Critic 框架。Actor（策略网络 <img alt=\"\\pi_\\theta\" src=\"https://www.zhihu.com/equation?tex=%5Cpi_%5Ctheta\" />）负责生成响应并更新策略，Critic（价值网络 <img alt=\"V\" src=\"https://www.zhihu.com/equation?tex=V\" />）负责估计状态价值以计算优势。在 LLM 对齐场景中，通常还需要维护 Reference Model（用于 KL 约束，防止策略偏离 SFT 模型过远）和 Reward Model（用于评估生成质量）。这意味着训练需要同时维护四个模型，显存开销巨大。</p>\n<h3>核心优势</h3>\n<p>PPO 的核心优势在于<strong>理论简洁与工程实践的平衡</strong>。Clip 机制用简单的裁剪操作替代了 TRPO 复杂的 KL 约束优化，只需调整单一超参数 <img alt=\"\\epsilon\" src=\"https://www.zhihu.com/equation?tex=%5Cepsilon\" /> 即可控制策略更新幅度，训练稳定性好。GAE 提供了灵活的偏差-方差平衡工具，适应不同任务需求。PPO 的工程生态成熟，OpenAI、DeepSpeed-Chat、TRL 等框架都提供完整实现，是当前 RLHF 的工业标准。DAPO 论文 Page 2 明确指出：PPO 通过裁剪约束策略更新在旧策略的邻近区域内，稳定训练并提升采样效率。</p>\n<h3>存在不足</h3>\n<p>PPO 的主要不足在于<strong>显存开销大且依赖价值函数</strong>。需要同时维护 Actor、Critic、Reference、Reward 四个模型，显存占用随模型规模线性增长。对于 70B 以上参数的模型，单卡训练几乎不可行。价值函数 <img alt=\"V(s)\" src=\"https://www.zhihu.com/equation?tex=V%28s%29\" /> 的估计质量直接影响优势计算准确性，但训练可靠的价值函数本身就很困难——尤其对于长响应和复杂任务（DAPO 论文 Page 2 明确指出这是核心挑战）。此外，PPO 对超参数敏感（学习率、clip 范围、KL 惩罚系数、GAE 的 <img alt=\"\\lambda\" src=\"https://www.zhihu.com/equation?tex=%5Clambda\" /> 等），不同任务需要大量调参工作。采样效率较低，需要大量在线采样才能收敛，训练成本高昂。</p>\n<hr />\n<h3>1.2 GRPO (Group Relative Policy Optimization)</h3>\n<h3>算法细节</h3>\n<p>GRPO 由 DeepSeek 团队在 DeepSeekMath 论文（arXiv:2402.03300）中提出，其核心创新在于<strong>移除了价值函数，改用组内相对奖励计算优势</strong>。</p>\n<p><strong>组内采样与相对优势</strong>：对于每个问题-答案对 <img alt=\"(q, a)\" src=\"https://www.zhihu.com/equation?tex=%28q%2C+a%29\" />，行为策略 <img alt=\"\\pi_{\\theta_{old}}\" src=\"https://www.zhihu.com/equation?tex=%5Cpi_%7B%5Ctheta_%7Bold%7D%7D\" /> 采样一组 <img alt=\"G\" src=\"https://www.zhihu.com/equation?tex=G\" /> 个响应 <img alt=\"{o_i}_{i=1}^G\" src=\"https://www.zhihu.com/equation?tex=%5C%7Bo_i%5C%7D_%7Bi%3D1%7D%5EG\" />。对每个响应计算奖励 <img alt=\"R_i\" src=\"https://www.zhihu.com/equation?tex=R_i\" />，优势通过组内奖励标准化计算（DAPO 论文 Equation 4）：</p>\n<p><img alt=\"\\hat{A}_{i,t} = \\frac{R_i - \\text{mean}({R_i}_{i=1}^G)}{\\text{std}({R_i}_{i=1}^G)}\" src=\"https://www.zhihu.com/equation?tex=%5Chat%7BA%7D_%7Bi%2Ct%7D+%3D+%5Cfrac%7BR_i+-+%5Ctext%7Bmean%7D%28%5C%7BR_i%5C%7D_%7Bi%3D1%7D%5EG%29%7D%7B%5Ctext%7Bstd%7D%28%5C%7BR_i%5C%7D_%7Bi%3D1%7D%5EG%29%7D\" /></p>\n<p>注意：同一个响应内的所有 token 共享同一个优势值 <img alt=\"\\hat{A}_{i,t}\" src=\"https://www.zhihu.com/equation?tex=%5Chat%7BA%7D_%7Bi%2Ct%7D\" />。</p>\n<p><strong>目标函数</strong>：GRPO 采用 Clip 目标和 KL 惩罚（DAPO 论文 Equation 5）：</p>\n<p><img alt=\"J_{GRPO}(\\theta) = \\mathbb{E}_{(q,a)\\sim D,{o_i}_{i=1}^G\\sim\\pi_{\\theta_{old}}(\\cdot|q)}\\left[\\frac{1}{G}\\sum_{i=1}^G\\frac{1}{|o_i|}\\sum_{t=1}^{|o_i|}\\min(r_{i,t}(\\theta)\\hat{A}_{i,t}, \\text{clip}(r_{i,t}(\\theta), 1-\\epsilon, 1+\\epsilon)\\hat{A}_{i,t}) - \\beta D_{KL}(\\pi_\\theta||\\pi_{ref})\\right]\" src=\"https://www.zhihu.com/equation?tex=J_%7BGRPO%7D%28%5Ctheta%29+%3D+%5Cmathbb%7BE%7D_%7B%28q%2Ca%29%5Csim+D%2C%5C%7Bo_i%5C%7D_%7Bi%3D1%7D%5EG%5Csim%5Cpi_%7B%5Ctheta_%7Bold%7D%7D%28%5Ccdot%7Cq%29%7D%5Cleft%5B%5Cfrac%7B1%7D%7BG%7D%5Csum_%7Bi%3D1%7D%5EG%5Cfrac%7B1%7D%7B%7Co_i%7C%7D%5Csum_%7Bt%3D1%7D%5E%7B%7Co_i%7C%7D%5Cmin%28r_%7Bi%2Ct%7D%28%5Ctheta%29%5Chat%7BA%7D_%7Bi%2Ct%7D%2C+%5Ctext%7Bclip%7D%28r_%7Bi%2Ct%7D%28%5Ctheta%29%2C+1-%5Cepsilon%2C+1%2B%5Cepsilon%29%5Chat%7BA%7D_%7Bi%2Ct%7D%29+-+%5Cbeta+D_%7BKL%7D%28%5Cpi_%5Ctheta%7C%7C%5Cpi_%7Bref%7D%29%5Cright%5D\" /></p>\n<p>其中重要性采样比率（DAPO 论文 Equation 6）：</p>\n<p><img alt=\"r_{i,t}(\\theta) = \\frac{\\pi_\\theta(o_{i,t}|q,o_{i,&lt;t})}{\\pi_{\\theta_{old}}(o_{i,t}|q,o_{i,&lt;t})}\" src=\"https://www.zhihu.com/equation?tex=r_%7Bi%2Ct%7D%28%5Ctheta%29+%3D+%5Cfrac%7B%5Cpi_%5Ctheta%28o_%7Bi%2Ct%7D%7Cq%2Co_%7Bi%2C%3Ct%7D%29%7D%7B%5Cpi_%7B%5Ctheta_%7Bold%7D%7D%28o_%7Bi%2Ct%7D%7Cq%2Co_%7Bi%2C%3Ct%7D%29%7D\" /></p>\n<p><strong>Sample-level 计算</strong>：DAPO 论文明确指出，GRPO 采用 sample-level 目标计算：先在每个序列内对 token 求平均 <img alt=\"\\frac{1}{|o_i|}\\sum_{t=1}^{|o_i|}\" src=\"https://www.zhihu.com/equation?tex=%5Cfrac%7B1%7D%7B%7Co_i%7C%7D%5Csum_%7Bt%3D1%7D%5E%7B%7Co_i%7C%7D\" />，再对样本求平均 <img alt=\"\\frac{1}{G}\\sum_{i=1}^G\" src=\"https://www.zhihu.com/equation?tex=%5Cfrac%7B1%7D%7BG%7D%5Csum_%7Bi%3D1%7D%5EG\" />。这导致每个样本权重相等，长序列中每个 token 的贡献反而更低（DAPO 论文 Section 3.3 专门讨论了这个问题）。</p>\n<h3>核心优势</h3>\n<p>GRPO 的核心优势是<strong>移除了 Critic 网络，降低显存开销</strong>。PPO 需要维护价值函数 <img alt=\"V(s)\" src=\"https://www.zhihu.com/equation?tex=V%28s%29\" />，显存占用大。GRPO 用组内统计量替代价值函数估计优势，无需额外训练 Value Head，显存效率更高。DeepSeekMath 7B 在 MATH benchmark 上达到 51.7%，证明了 GRPO 在数学推理场景的有效性。</p>\n<h3>存在不足</h3>\n<p>GRPO 的主要不足包括：</p>\n<p><strong>熵崩溃风险</strong>：DAPO 论文 Figure 2b 显示，使用 GRPO 训练时策略熵快速下降，采样响应趋于相同，探索能力受限。DAPO 的 Clip-Higher 就是为了解决这个问题。</p>\n<p><strong>Sample-level 损失问题</strong>：长响应中 token 的梯度贡献被稀释，高质量长样本的推理模式得不到充分强化，低质量长样本中的废话、重复得不到有效惩罚（DAPO 论文 Section 3.3）。</p>\n<p><strong>采样开销增加</strong>：每个 prompt 需要采样 <img alt=\"G\" src=\"https://www.zhihu.com/equation?tex=G\" /> 个响应（论文实验用 <img alt=\"G=16\" src=\"https://www.zhihu.com/equation?tex=G%3D16\" />），推理阶段计算成本显著增加。</p>\n<p><strong>极端奖励失效</strong>：当组内所有响应都正确（accuracy = 1）或都错误（accuracy = 0）时，标准化后优势全为零，梯度贡献为零（DAPO 论文 Section 3.2）。</p>\n<hr />\n<h3>1.3 GSPO (Group Sequence Policy Optimization)</h3>\n<h3>算法细节</h3>\n<p>GSPO 由阿里通义团队提出（arXiv:2507.18071），其核心创新在于<strong>将重要性比率从 token-level 改为 sequence-level</strong>，解决了 GRPO 在大模型和长响应训练中的稳定性问题。</p>\n<p><strong>GRPO 的根本问题</strong>（论文 Section 3）：GRPO 在每个 token 位置应用重要性权重 <img alt=\"w_{i,t}(\\theta) = \\frac{\\pi_\\theta(y_{i,t}|x,y_{i,&lt;t})}{\\pi_{\\theta_{old}}(y_{i,t}|x,y_{i,&lt;t})}\" src=\"https://www.zhihu.com/equation?tex=w_%7Bi%2Ct%7D%28%5Ctheta%29+%3D+%5Cfrac%7B%5Cpi_%5Ctheta%28y_%7Bi%2Ct%7D%7Cx%2Cy_%7Bi%2C%3Ct%7D%29%7D%7B%5Cpi_%7B%5Ctheta_%7Bold%7D%7D%28y_%7Bi%2Ct%7D%7Cx%2Cy_%7Bi%2C%3Ct%7D%29%7D\" />。重要性采样原理要求基于多个样本进行分布校正，但单个 token 样本无法满足这一条件。这引入高方差噪声，在长序列中累积，被 clip 机制放大，最终导致模型崩溃——通常是不可逆的。</p>\n<p>核心洞察：优化目标的单位应该与奖励的单位匹配。既然奖励授予整个序列，在 token 级别做 off-policy 校正是有问题的。</p>\n<p><strong>Sequence-level Importance Ratio</strong>：GSPO 定义基于序列似然的重要性比率（论文 Equation 7）：</p>\n<p><img alt=\"s_i(\\theta) = \\left(\\frac{\\pi_\\theta(y_i|x)}{\\pi_{\\theta_{old}}(y_i|x)}\\right)^{\\frac{1}{|y_i|}} = \\exp\\left(\\frac{1}{|y_i|}\\sum_{t=1}^{|y_i|}\\log\\frac{\\pi_\\theta(y_{i,t}|x,y_{i,&lt;t})}{\\pi_{\\theta_{old}}(y_{i,t}|x,y_{i,&lt;t})}\\right)\" src=\"https://www.zhihu.com/equation?tex=s_i%28%5Ctheta%29+%3D+%5Cleft%28%5Cfrac%7B%5Cpi_%5Ctheta%28y_i%7Cx%29%7D%7B%5Cpi_%7B%5Ctheta_%7Bold%7D%7D%28y_i%7Cx%29%7D%5Cright%29%5E%7B%5Cfrac%7B1%7D%7B%7Cy_i%7C%7D%7D+%3D+%5Cexp%5Cleft%28%5Cfrac%7B1%7D%7B%7Cy_i%7C%7D%5Csum_%7Bt%3D1%7D%5E%7B%7Cy_i%7C%7D%5Clog%5Cfrac%7B%5Cpi_%5Ctheta%28y_%7Bi%2Ct%7D%7Cx%2Cy_%7Bi%2C%3Ct%7D%29%7D%7B%5Cpi_%7B%5Ctheta_%7Bold%7D%7D%28y_%7Bi%2Ct%7D%7Cx%2Cy_%7Bi%2C%3Ct%7D%29%7D%5Cright%29\" /></p>\n<p>采用长度归一化 <img alt=\"\\frac{1}{|y_i|}\" src=\"https://www.zhihu.com/equation?tex=%5Cfrac%7B1%7D%7B%7Cy_i%7C%7D\" /> 降低方差，使不同长度响应的 importance ratio 在统一数值范围内。否则少数 token 的似然变化会导致序列级 importance ratio 大幅波动，不同长度响应需要不同的 clip 范围。</p>\n<p><strong>GSPO 目标函数</strong>（论文 Equation 5）：</p>\n<p><img alt=\"J_{GSPO}(\\theta) = \\mathbb{E}_{x\\sim\\mathcal{D},{y_i}_{i=1}^G\\sim\\pi_{\\theta_{old}}(\\cdot|x)}\\left[\\frac{1}{G}\\sum_{i=1}^G\\min(s_i(\\theta)\\hat{A}_i, \\text{clip}(s_i(\\theta), 1-\\epsilon, 1+\\epsilon)\\hat{A}_i)\\right]\" src=\"https://www.zhihu.com/equation?tex=J_%7BGSPO%7D%28%5Ctheta%29+%3D+%5Cmathbb%7BE%7D_%7Bx%5Csim%5Cmathcal%7BD%7D%2C%5C%7By_i%5C%7D_%7Bi%3D1%7D%5EG%5Csim%5Cpi_%7B%5Ctheta_%7Bold%7D%7D%28%5Ccdot%7Cx%29%7D%5Cleft%5B%5Cfrac%7B1%7D%7BG%7D%5Csum_%7Bi%3D1%7D%5EG%5Cmin%28s_i%28%5Ctheta%29%5Chat%7BA%7D_i%2C+%5Ctext%7Bclip%7D%28s_i%28%5Ctheta%29%2C+1-%5Cepsilon%2C+1%2B%5Cepsilon%29%5Chat%7BA%7D_i%29%5Cright%5D\" /></p>\n<p>优势估计与 GRPO 相同（Equation 6）：</p>\n<p><img alt=\"\\hat{A}_i = \\frac{r(x,y_i) - \\text{mean}({r(x,y_i)}_{i=1}^G)}{\\text{std}({r(x,y_i)}_{i=1}^G)}\" src=\"https://www.zhihu.com/equation?tex=%5Chat%7BA%7D_i+%3D+%5Cfrac%7Br%28x%2Cy_i%29+-+%5Ctext%7Bmean%7D%28%5C%7Br%28x%2Cy_i%29%5C%7D_%7Bi%3D1%7D%5EG%29%7D%7B%5Ctext%7Bstd%7D%28%5C%7Br%28x%2Cy_i%29%5C%7D_%7Bi%3D1%7D%5EG%29%7D\" /></p>\n<p><strong>梯度分析的关键差异</strong>（论文 Section 4.2）：比较 GSPO 和 GRPO 的梯度：</p>\n<ul>\n<li><strong>GRPO</strong>：每个 token 按 <img alt=\"w_{i,t}(\\theta)\" src=\"https://www.zhihu.com/equation?tex=w_%7Bi%2Ct%7D%28%5Ctheta%29\" /> 加权梯度。这些不等权重在 ![(0, 1+\\epsilon]](https://www.zhihu.com/equation?tex=%280%2C+1%2B%5Cepsilon%5D)（当 <img alt=\"\\hat{A}_i &gt; 0\" src=\"https://www.zhihu.com/equation?tex=%5Chat%7BA%7D_i+%3E+0\" />）或 ![<a href=\"https://www.zhihu.com/equation?tex=%5B1-%5Cepsilon%2C+%2B%5Cinfty%29\">1-\\epsilon, +\\infty)</a>（当 <img alt=\"\\hat{A}_i &lt; 0\" src=\"https://www.zhihu.com/equation?tex=%5Chat%7BA%7D_i+%3C+0\" />）范围内变化，累积影响不可预测。</li>\n<li><strong>GSPO</strong>：同一响应内的所有 token 使用相同权重 <img alt=\"s_i(\\theta)\" src=\"https://www.zhihu.com/equation?tex=s_i%28%5Ctheta%29\" />，消除 GRPO 的不稳定性因素。</li>\n</ul>\n<p><strong>GSPO-token 变体</strong>（论文 Section 4.3）：用于多轮 RL 等需要 token 级优势调整的场景：</p>\n<p><img alt=\"J_{GSPO-token}(\\theta) = \\mathbb{E}\\left[\\frac{1}{G}\\sum_{i=1}^G\\frac{1}{|y_i|}\\sum_{t=1}^{|y_i|}\\min(s_{i,t}(\\theta)\\hat{A}_{i,t}, \\text{clip}(s_{i,t}(\\theta), 1-\\epsilon, 1+\\epsilon)\\hat{A}_{i,t})\\right]\" src=\"https://www.zhihu.com/equation?tex=J_%7BGSPO-token%7D%28%5Ctheta%29+%3D+%5Cmathbb%7BE%7D%5Cleft%5B%5Cfrac%7B1%7D%7BG%7D%5Csum_%7Bi%3D1%7D%5EG%5Cfrac%7B1%7D%7B%7Cy_i%7C%7D%5Csum_%7Bt%3D1%7D%5E%7B%7Cy_i%7C%7D%5Cmin%28s_%7Bi%2Ct%7D%28%5Ctheta%29%5Chat%7BA%7D_%7Bi%2Ct%7D%2C+%5Ctext%7Bclip%7D%28s_%7Bi%2Ct%7D%28%5Ctheta%29%2C+1-%5Cepsilon%2C+1%2B%5Cepsilon%29%5Chat%7BA%7D_%7Bi%2Ct%7D%29%5Cright%5D\" /></p>\n<p>其中 <img alt=\"s_{i,t}(\\theta) = \\text{sg}[s_i(\\theta)] \\cdot \\frac{\\pi_\\theta(y_{i,t}|x,y_{i,&lt;t})}{\\text{sg}[\\pi_\\theta(y_{i,t}|x,y_{i,&lt;t})]}\" src=\"https://www.zhihu.com/equation?tex=s_%7Bi%2Ct%7D%28%5Ctheta%29+%3D+%5Ctext%7Bsg%7D%5Bs_i%28%5Ctheta%29%5D+%5Ccdot+%5Cfrac%7B%5Cpi_%5Ctheta%28y_%7Bi%2Ct%7D%7Cx%2Cy_%7Bi%2C%3Ct%7D%29%7D%7B%5Ctext%7Bsg%7D%5B%5Cpi_%5Ctheta%28y_%7Bi%2Ct%7D%7Cx%2Cy_%7Bi%2C%3Ct%7D%29%5D%7D\" />，<img alt=\"\\text{sg}[\\cdot]\" src=\"https://www.zhihu.com/equation?tex=%5Ctext%7Bsg%7D%5B%5Ccdot%5D\" /> 表示取数值但阻断梯度（PyTorch 的 detach 操作）。</p>\n<h3>核心优势</h3>\n<p>GSPO 的核心优势是<strong>解决了 GRPO 的稳定性问题，特别适用于大模型和 MoE 模型训练</strong>。论文实证表明，GSPO 在训练稳定性、效率和性能上全面优于 GRPO。关键贡献：GSPO 天然解决了大 MoE 模型 RL 训练的稳定性挑战，无需复杂的稳定化策略，简化了 RL 基础设施。这些优势促成了 Qwen3 模型的性能提升。</p>\n<h3>存在不足</h3>\n<p>GSPO 的主要不足是<strong>sequence-level clipping 范围与传统算法数值量级不同</strong>，需要重新调参。对于需要 token 级细粒度优势的场景（如多轮 RL），需要使用 GSPO-token 变体，增加了实现复杂度。此外，论文主要在数学推理场景验证，开放式生成场景的效果有待进一步验证。</p>\n<hr />\n<h3>1.4 DAPO (Decoupled Clip and Dynamic Sampling Policy Optimization)</h3>\n<h3>算法细节</h3>\n<p>DAPO 是字节跳动与清华大学联合提出的开源 RL 训练系统，其核心创新在于<strong>在 GRPO 基础上进行了四项关键改进</strong>，分别针对熵崩溃、样本效率、长链推理和奖励噪声问题。</p>\n<p><strong>Clip-Higher（非对称 Clip 裁剪）</strong>：DAPO 最重要的创新是将 GRPO 中对称的 Clip 范围 <img alt=\"[1-\\epsilon, 1+\\epsilon]\" src=\"https://www.zhihu.com/equation?tex=%5B1-%5Cepsilon%2C+1%2B%5Cepsilon%5D\" /> 解耦为非对称的上下限 <img alt=\"[1-\\epsilon_{low}, 1+\\epsilon_{high}]\" src=\"https://www.zhihu.com/equation?tex=%5B1-%5Cepsilon_%7Blow%7D%2C+1%2B%5Cepsilon_%7Bhigh%7D%5D\" />。论文设置 <img alt=\"\\epsilon_{low} = 0.2\" src=\"https://www.zhihu.com/equation?tex=%5Cepsilon_%7Blow%7D+%3D+0.2\" />, <img alt=\"\\epsilon_{high} = 0.28\" src=\"https://www.zhihu.com/equation?tex=%5Cepsilon_%7Bhigh%7D+%3D+0.28\" />。其目标函数为：</p>\n<p><img alt=\"J_{DAPO}(\\theta) = \\mathbb{E}_{(q,a)\\sim D,{o_i}_{i=1}^G\\sim\\pi_{\\theta_{old}}}\\left[\\frac{1}{P}\\frac{1}{\\sum_{i=1}^G|o_i|}\\sum_{i=1}^G\\sum_{t=1}^{|o_i|}\\min(r_{i,t}(\\theta)\\hat{A}_{i,t}, \\text{clip}(r_{i,t}(\\theta), 1-\\epsilon_{low}, 1+\\epsilon_{high})\\hat{A}_{i,t})\\right]\" src=\"https://www.zhihu.com/equation?tex=J_%7BDAPO%7D%28%5Ctheta%29+%3D+%5Cmathbb%7BE%7D_%7B%28q%2Ca%29%5Csim+D%2C%5C%7Bo_i%5C%7D_%7Bi%3D1%7D%5EG%5Csim%5Cpi_%7B%5Ctheta_%7Bold%7D%7D%7D%5Cleft%5B%5Cfrac%7B1%7D%7BP%7D%5Cfrac%7B1%7D%7B%5Csum_%7Bi%3D1%7D%5EG%7Co_i%7C%7D%5Csum_%7Bi%3D1%7D%5EG%5Csum_%7Bt%3D1%7D%5E%7B%7Co_i%7C%7D%5Cmin%28r_%7Bi%2Ct%7D%28%5Ctheta%29%5Chat%7BA%7D_%7Bi%2Ct%7D%2C+%5Ctext%7Bclip%7D%28r_%7Bi%2Ct%7D%28%5Ctheta%29%2C+1-%5Cepsilon_%7Blow%7D%2C+1%2B%5Cepsilon_%7Bhigh%7D%29%5Chat%7BA%7D_%7Bi%2Ct%7D%29%5Cright%5D\" /></p>\n<p>其中 <img alt=\"r_{i,t}(\\theta) = \\frac{\\pi_\\theta(o_{i,t}|q,o_{i,&lt;t})}{\\pi_{\\theta_{old}}(o_{i,t}|q,o_{i,&lt;t})}\" src=\"https://www.zhihu.com/equation?tex=r_%7Bi%2Ct%7D%28%5Ctheta%29+%3D+%5Cfrac%7B%5Cpi_%5Ctheta%28o_%7Bi%2Ct%7D%7Cq%2Co_%7Bi%2C%3Ct%7D%29%7D%7B%5Cpi_%7B%5Ctheta_%7Bold%7D%7D%28o_%7Bi%2Ct%7D%7Cq%2Co_%7Bi%2C%3Ct%7D%29%7D\" />，<img alt=\"\\hat{A}_{i,t} = \\frac{R_i - \\text{mean}({R_i}_{i=1}^G)}{\\text{std}({R_i}_{i=1}^G)}\" src=\"https://www.zhihu.com/equation?tex=%5Chat%7BA%7D_%7Bi%2Ct%7D+%3D+%5Cfrac%7BR_i+-+%5Ctext%7Bmean%7D%28%5C%7BR_i%5C%7D_%7Bi%3D1%7D%5EG%29%7D%7B%5Ctext%7Bstd%7D%28%5C%7BR_i%5C%7D_%7Bi%3D1%7D%5EG%29%7D\" />。</p>\n<p>为什么要解耦？论文发现，当 <img alt=\"\\epsilon = 0.2\" src=\"https://www.zhihu.com/equation?tex=%5Cepsilon+%3D+0.2\" /> 时，高概率 token（如 0.9）可以轻松增加到 0.999，但低概率 token（如 0.01）最多只能增加到 0.012。这种不对称限制了探索能力。DAPO 通过提高 <img alt=\"\\epsilon_{high}\" src=\"https://www.zhihu.com/equation?tex=%5Cepsilon_%7Bhigh%7D\" /> 到 0.28，给低概率探索 token 更多上升空间，有效防止熵崩溃。实验表明，平均被裁剪上升的 token 概率都在 0.2 以下，证实了低概率 token 才是受限制的主要对象。</p>\n<p><strong>Dynamic Sampling（动态采样）</strong>：DAPO 发现，当某个 prompt 的所有输出都正确（accuracy = 1）或都错误（accuracy = 0）时，组内优势全为零，梯度贡献为零。随着训练进行，accuracy = 1 的样本比例持续增加，有效 prompt 数量不断减少，导致梯度方差增大。</p>\n<p>DAPO 通过动态采样机制解决：训练前持续采样，过滤掉 accuracy = 0 或 1 的 prompt，只保留有效梯度贡献的样本填充 batch。目标函数约束条件为：</p>\n<p><img alt=\"0 &lt; |{o_i | \\text{is_equivalent}(a, o_i)}| &lt; G\" src=\"https://www.zhihu.com/equation?tex=0+%3C+%7C%5C%7Bo_i+%7C+%5Ctext%7Bis%5C_equivalent%7D%28a%2C+o_i%29%5C%7D%7C+%3C+G\" /></p>\n<p>即组内必须既有正确又有错误的输出，才能进入训练 batch。这确保了每个 batch 的 prompt 数量稳定，梯度信号一致。虽然采样量增加，但收敛更快，总训练时间反而减少。</p>\n<p><strong>Token-level Policy Gradient Loss（Token 级策略梯度损失）</strong>：GRPO 采用 sample-level 损失计算：先在每个样本内对 token 求平均，再对样本求平均。这导致每个样本权重相等，长响应中每个 token 的贡献反而更低。</p>\n<p>问题：高质量长样本中的推理模式得不到充分强化；低质量长样本中的废话、重复等不良模式得不到有效惩罚；熵和响应长度不健康增长。</p>\n<p>DAPO 改为 token-level 损失计算：</p>\n<p><img alt=\"J_{DAPO}(\\theta) = \\mathbb{E}\\left[\\frac{1}{\\sum_{i=1}^G|o_i|}\\sum_{i=1}^G\\sum_{t=1}^{|o_i|}\\min(r_{i,t}(\\theta)\\hat{A}_{i,t}, \\text{clip}(r_{i,t}(\\theta), 1-\\epsilon_{low}, 1+\\epsilon_{high})\\hat{A}_{i,t})\\right]\" src=\"https://www.zhihu.com/equation?tex=J_%7BDAPO%7D%28%5Ctheta%29+%3D+%5Cmathbb%7BE%7D%5Cleft%5B%5Cfrac%7B1%7D%7B%5Csum_%7Bi%3D1%7D%5EG%7Co_i%7C%7D%5Csum_%7Bi%3D1%7D%5EG%5Csum_%7Bt%3D1%7D%5E%7B%7Co_i%7C%7D%5Cmin%28r_%7Bi%2Ct%7D%28%5Ctheta%29%5Chat%7BA%7D_%7Bi%2Ct%7D%2C+%5Ctext%7Bclip%7D%28r_%7Bi%2Ct%7D%28%5Ctheta%29%2C+1-%5Cepsilon_%7Blow%7D%2C+1%2B%5Cepsilon_%7Bhigh%7D%29%5Chat%7BA%7D_%7Bi%2Ct%7D%29%5Cright%5D\" /></p>\n<p>即对所有 token 直接求平均，不再先按样本聚合。这样每个 token 平等贡献梯度，无论它出现在长序列还是短序列中。高质量长样本的推理模式得到充分学习，低质量长模式的废话、重复被有效抑制。</p>\n<p><strong>Overlong Reward Shaping（过长响应奖励塑造）</strong>：RL 训练中通常设置最大生成长度，超长样本被截断。但简单惩罚截断样本会引入噪声——一个推理过程可能本身是正确的，仅仅因为过长就被惩罚，模型会困惑。</p>\n<p>DAPO 首先采用 Overlong Filtering 策略：直接 mask 截断样本的损失，不参与训练。实验表明这显著稳定训练。</p>\n<p>进一步提出 Soft Overlong Punishment（软过长惩罚），使用分段函数：</p>\n<p><img alt=\"R_{length}(y) = \\begin{cases} 0, &amp; |y| \\leq L_{max} - L_{cache} \\ \\frac{(L_{max}-L_{cache})-|y|}{L_{cache}}, &amp; L_{max} - L_{cache} &lt; |y| \\leq L_{max} \\ -1, &amp; L_{max} &lt; |y| \\end{cases}\" src=\"https://www.zhihu.com/equation?tex=R_%7Blength%7D%28y%29+%3D+%5Cbegin%7Bcases%7D+0%2C+%26+%7Cy%7C+%5Cleq+L_%7Bmax%7D+-+L_%7Bcache%7D+%5C%5C+%5Cfrac%7B%28L_%7Bmax%7D-L_%7Bcache%7D%29-%7Cy%7C%7D%7BL_%7Bcache%7D%7D%2C+%26+L_%7Bmax%7D+-+L_%7Bcache%7D+%3C+%7Cy%7C+%5Cleq+L_%7Bmax%7D+%5C%5C+-1%2C+%26+L_%7Bmax%7D+%3C+%7Cy%7C+%5Cend%7Bcases%7D\" /></p>\n<p>论文设置 <img alt=\"L_{max} = 16,384\" src=\"https://www.zhihu.com/equation?tex=L_%7Bmax%7D+%3D+16%2C384\" /> tokens，<img alt=\"L_{cache} = 4,096\" src=\"https://www.zhihu.com/equation?tex=L_%7Bcache%7D+%3D+4%2C096\" /> tokens，最大生成长度 20,480 tokens。</p>\n<p>当响应长度在惩罚区间 <img alt=\"[L_{max}-L_{cache}, L_{max}]\" src=\"https://www.zhihu.com/equation?tex=%5BL_%7Bmax%7D-L_%7Bcache%7D%2C+L_%7Bmax%7D%5D\" /> 内，惩罚从 0 渐进到 -1；超过 <img alt=\"L_{max}\" src=\"https://www.zhihu.com/equation?tex=L_%7Bmax%7D\" /> 直接给 -1。这个惩罚叠加到原始正确性奖励上，引导模型避免过长响应，但不惩罚合理长度内的正确推理。</p>\n<h3>核心优势</h3>\n<p>DAPO 的核心优势是<strong>在有限训练步骤下实现超越 DeepSeek-R1-Zero 的性能</strong>。基于 Qwen2.5-32B 基础模型，DAPO 在 AIME 2024 测试中取得 50 分，仅使用 50% 的训练步骤就超越了 DeepSeek-R1-Zero-Qwen-32B（47 分）。</p>\n<p>论文的渐进消融实验（Table 1）展示了各技术贡献：</p>\n<ul>\n<li>Naive GRPO：30 分</li>\n<li>\n<ul>\n<li>Overlong Filtering：36 分（+6）</li>\n</ul>\n</li>\n<li>\n<ul>\n<li>Clip-Higher：38 分（+2）</li>\n</ul>\n</li>\n<li>\n<ul>\n<li>Soft Overlong Punishment：41 分（+3）</li>\n</ul>\n</li>\n<li>\n<ul>\n<li>Token-level Loss：42 分（+1）</li>\n</ul>\n</li>\n<li>\n<ul>\n<li>Dynamic Sampling（完整 DAPO）：50 分（+8）</li>\n</ul>\n</li>\n</ul>\n<p>Clip-Higher 策略有效防止了熵崩溃，使模型在整个训练过程中保持较高的探索性和生成多样性。动态采样机制贡献最大，显著提高了样本利用率。Token-level 损失虽然性能提升有限（+1 分），但增强了训练稳定性，让响应长度增长更健康。</p>\n<h3>存在不足</h3>\n<p>DAPO 的主要不足是<strong>移除了 KL 散度约束</strong>。论文认为长推理场景下模型分布会显著偏离初始模型，KL 约束不再必要。但这增加了训练不稳定的风险——策略可能偏离过远进入危险区域。</p>\n<p>超参数敏感：<img alt=\"\\epsilon_{low}\" src=\"https://www.zhihu.com/equation?tex=%5Cepsilon_%7Blow%7D\" /> 和 <img alt=\"\\epsilon_{high}\" src=\"https://www.zhihu.com/equation?tex=%5Cepsilon_%7Bhigh%7D\" /> 的最优值（0.2, 0.28）是针对数学推理任务调优的，其他任务可能需要重新调节。动态采样虽然加速收敛，但增加了采样阶段的计算开销。Token-level 损失和过长奖励塑造增加了实现复杂度。</p>\n<p>此外，DAPO 使用 rule-based reward（正确性奖励），避免了 reward hacking 问题，但也限制了应用场景——只能用于有明确正确答案的任务（数学、编程等），无法直接迁移到开放式生成场景。</p>\n<hr />\n<h2>二、离线偏好优化</h2>\n<p>离线偏好优化算法不需要在线采样，也不需要训练 Critic 网络。它们基于静态的偏好数据集，通过构造特定的损失函数直接优化策略模型。这类方法训练稳定、工程复杂度低，但性能上限通常不如在线 RL 方法。</p>\n<h3>2.1 DPO (Direct Preference Optimization)</h3>\n<h3>算法细节</h3>\n<p>DPO 由 Rafailov 等人提出（arXiv:2305.18290），是离线偏好优化领域的开创性工作。核心贡献：绕过显式训练 Reward Model，直接从偏好数据学习策略。</p>\n<p><strong>Bradley-Terry 偏好模型</strong>（论文 Equation 1）：DPO 假设人类偏好服从 Bradley-Terry 模型：</p>\n<p><img alt=\"p(y_w \\succ y_l | x) = \\frac{\\exp(r(x, y_w))}{\\exp(r(x, y_w)) + \\exp(r(x, y_l))} = \\sigma(r(x, y_w) - r(x, y_l))\" src=\"https://www.zhihu.com/equation?tex=p%28y_w+%5Csucc+y_l+%7C+x%29+%3D+%5Cfrac%7B%5Cexp%28r%28x%2C+y_w%29%29%7D%7B%5Cexp%28r%28x%2C+y_w%29%29+%2B+%5Cexp%28r%28x%2C+y_l%29%29%7D+%3D+%5Csigma%28r%28x%2C+y_w%29+-+r%28x%2C+y_l%29%29\" /></p>\n<p>其中 <img alt=\"y_w\" src=\"https://www.zhihu.com/equation?tex=y_w\" /> 是 preferred 输出，<img alt=\"y_l\" src=\"https://www.zhihu.com/equation?tex=y_l\" /> 是 dispreferred 输出，<img alt=\"\\sigma\" src=\"https://www.zhihu.com/equation?tex=%5Csigma\" /> 是 Sigmoid 函数，<img alt=\"r(x, y)\" src=\"https://www.zhihu.com/equation?tex=r%28x%2C+y%29\" /> 是奖励函数。</p>\n<p><strong>奖励函数的闭式表达</strong>（论文 Lemma 1）：RLHF 目标函数（KL 约束下的奖励最大化）的最优策略有闭式解：</p>\n<p><img alt=\"\\pi^*(y|x) = \\frac{1}{Z(x)} \\pi_{ref}(y|x) \\exp\\left(\\frac{1}{\\beta} r(x, y)\\right)\" src=\"https://www.zhihu.com/equation?tex=%5Cpi%5E%2A%28y%7Cx%29+%3D+%5Cfrac%7B1%7D%7BZ%28x%29%7D+%5Cpi_%7Bref%7D%28y%7Cx%29+%5Cexp%5Cleft%28%5Cfrac%7B1%7D%7B%5Cbeta%7D+r%28x%2C+y%29%5Cright%29\" /></p>\n<p>其中 <img alt=\"Z(x) = \\sum_y \\pi_{ref}(y|x) \\exp\\left(\\frac{1}{\\beta} r(x, y)\\right)\" src=\"https://www.zhihu.com/equation?tex=Z%28x%29+%3D+%5Csum_y+%5Cpi_%7Bref%7D%28y%7Cx%29+%5Cexp%5Cleft%28%5Cfrac%7B1%7D%7B%5Cbeta%7D+r%28x%2C+y%29%5Cright%29\" /> 是 partition function。</p>\n<p>由此反推奖励函数：</p>\n<p><img alt=\"r(x, y) = \\beta \\log \\frac{\\pi^*(y|x)}{\\pi_{ref}(y|x)} + \\beta \\log Z(x)\" src=\"https://www.zhihu.com/equation?tex=r%28x%2C+y%29+%3D+%5Cbeta+%5Clog+%5Cfrac%7B%5Cpi%5E%2A%28y%7Cx%29%7D%7B%5Cpi_%7Bref%7D%28y%7Cx%29%7D+%2B+%5Cbeta+%5Clog+Z%28x%29\" /></p>\n<p><strong>DPO 损失函数</strong>（论文 Equation 7）：将奖励函数代入 Bradley-Terry 模型，partition function <img alt=\"Z(x)\" src=\"https://www.zhihu.com/equation?tex=Z%28x%29\" /> 被消掉，得到只依赖策略的损失：</p>\n<p><img alt=\"\\mathcal{L}_{DPO}(\\pi_\\theta; \\pi_{ref}) = -\\mathbb{E}_{(x,y_w,y_l) \\sim \\mathcal{D}}\\left[\\log \\sigma\\left(\\beta \\log \\frac{\\pi_\\theta(y_w|x)}{\\pi_{ref}(y_w|x)} - \\beta \\log \\frac{\\pi_\\theta(y_l|x)}{\\pi_{ref}(y_l|x)}\\right)\\right]\" src=\"https://www.zhihu.com/equation?tex=%5Cmathcal%7BL%7D_%7BDPO%7D%28%5Cpi_%5Ctheta%3B+%5Cpi_%7Bref%7D%29+%3D+-%5Cmathbb%7BE%7D_%7B%28x%2Cy_w%2Cy_l%29+%5Csim+%5Cmathcal%7BD%7D%7D%5Cleft%5B%5Clog+%5Csigma%5Cleft%28%5Cbeta+%5Clog+%5Cfrac%7B%5Cpi_%5Ctheta%28y_w%7Cx%29%7D%7B%5Cpi_%7Bref%7D%28y_w%7Cx%29%7D+-+%5Cbeta+%5Clog+%5Cfrac%7B%5Cpi_%5Ctheta%28y_l%7Cx%29%7D%7B%5Cpi_%7Bref%7D%28y_l%7Cx%29%7D%5Cright%29%5Cright%5D\" /></p>\n<p>这是闭式优化，无需策略梯度的高方差估计。<img alt=\"\\beta\" src=\"https://www.zhihu.com/equation?tex=%5Cbeta\" /> 控制 KL 惩罚强度——<img alt=\"\\beta\" src=\"https://www.zhihu.com/equation?tex=%5Cbeta\" /> 越大，策略偏离 reference model 的幅度越小。</p>\n<p><strong>Reference Model</strong>：通常是 SFT 后的模型。DPO 通过隐式 KL 约束策略不偏离 reference model 太远，保证训练稳定性，防止模型 collapse。</p>\n<h3>核心优势</h3>\n<p>DPO 的核心优势是<strong>极大简化 RLHF 流程</strong>。传统 RLHF 需要先训练 Reward Model，再进行 PPO 训练，流程复杂且不稳定。DPO 将整个流程简化为类似 SFT 的单阶段训练——只需加载两个模型（policy 和 reference），在静态偏好数据上计算损失并更新 policy。</p>\n<p>训练过程极其稳定，几乎不会出现训练崩溃。不需要在线采样，训练成本显著低于 PPO。工程实现简单，开源框架（如 TRL）提供成熟实现。</p>\n<h3>存在不足</h3>\n<p>DPO 的主要不足是<strong>过拟合风险高且性能上限受限于偏好数据覆盖范围</strong>。由于没有显式 Reward Model 进行优势估计，DPO 容易过度拟合偏好数据中的噪声和偏差，导致在未见过的分布上泛化能力下降（论文 Section 4.1 实验验证）。</p>\n<p>对偏好数据质量要求极高：如果 dispreferred 样本不够”差”（与 preferred 样本差异不明显），训练信号会非常弱。无法像 PPO 那样通过在线采样探索新的输出空间——性能上限受限于偏好数据的覆盖范围。</p>\n<p>此外，DPO 在某些任务上可能导致 response length 增加（KTO 论文 Figure 4 对比），模型倾向于生成更长但可能冗余的内容。</p>\n<hr />\n<h3>2.2 KTO (Kahneman-Tversky Optimization)</h3>\n<h3>算法细节</h3>\n<p>KTO 由 Ethayarajh 等人提出（arXiv:2402.01306），理论基础是 Kahneman &amp; Tversky 的前景理论。核心洞察：现有对齐方法（如 DPO、PPO）隐式建模了人类的损失厌恶等偏见，但这些方法的 utility function 与前景理论文献中的仍有差异。KTO 用 Kahneman-Tversky 的 human value function 直接最大化生成物的效用，而非最大化偏好的似然。</p>\n<p><strong>非配对数据支持</strong>：KTO 不需要成对偏好数据 <img alt=\"(y_w, y_l)\" src=\"https://www.zhihu.com/equation?tex=%28y_w%2C+y_l%29\" />，只需要 binary signal——输出是 desirable 还是 undesirable。数据获取门槛大幅降低。</p>\n<p><strong>KTO 损失函数</strong>（论文 Equation 8）：</p>\n<p><img alt=\"L_{KTO}(\\pi_\\theta, \\pi_{ref}) = \\mathbb{E}_{x,y\\sim D}[\\lambda_y - v(x, y)]\" src=\"https://www.zhihu.com/equation?tex=L_%7BKTO%7D%28%5Cpi_%5Ctheta%2C+%5Cpi_%7Bref%7D%29+%3D+%5Cmathbb%7BE%7D_%7Bx%2Cy%5Csim+D%7D%5B%5Clambda_y+-+v%28x%2C+y%29%5D\" /></p>\n<p>其中：</p>\n<ul>\n<li><img alt=\"r_\\theta(x, y) = \\log \\frac{\\pi_\\theta(y|x)}{\\pi_{ref}(y|x)}\" src=\"https://www.zhihu.com/equation?tex=r_%5Ctheta%28x%2C+y%29+%3D+%5Clog+%5Cfrac%7B%5Cpi_%5Ctheta%28y%7Cx%29%7D%7B%5Cpi_%7Bref%7D%28y%7Cx%29%7D\" /> 是隐式奖励（log ratio）</li>\n<li><img alt=\"z_0 = KL(\\pi_\\theta(y'|x) | \\pi_{ref}(y'|x))\" src=\"https://www.zhihu.com/equation?tex=z_0+%3D+KL%28%5Cpi_%5Ctheta%28y%27%7Cx%29+%5C%7C+%5Cpi_%7Bref%7D%28y%27%7Cx%29%29\" /> 是 reference point（KL 散度）</li>\n<li><img alt=\"\\lambda_y\" src=\"https://www.zhihu.com/equation?tex=%5Clambda_y\" /> 表示 <img alt=\"\\lambda_D\" src=\"https://www.zhihu.com/equation?tex=%5Clambda_D\" />（desirable）或 <img alt=\"\\lambda_U\" src=\"https://www.zhihu.com/equation?tex=%5Clambda_U\" />（undesirable）</li>\n</ul>\n<p><strong>Value Function</strong>：用 logistic 函数替代原始 Kahneman-Tversky 的指数形式（避免数值不稳定）：</p>\n<p><img alt=\"v(x, y) = \\begin{cases} \\lambda_D \\sigma(\\beta(r_\\theta(x, y) - z_0)) &amp; \\text{if } y \\sim y_{desirable}|x \\ \\lambda_U \\sigma(\\beta(z_0 - r_\\theta(x, y))) &amp; \\text{if } y \\sim y_{undesirable}|x \\end{cases}\" src=\"https://www.zhihu.com/equation?tex=v%28x%2C+y%29+%3D+%5Cbegin%7Bcases%7D+%5Clambda_D+%5Csigma%28%5Cbeta%28r_%5Ctheta%28x%2C+y%29+-+z_0%29%29+%26+%5Ctext%7Bif+%7D+y+%5Csim+y_%7Bdesirable%7D%7Cx+%5C%5C+%5Clambda_U+%5Csigma%28%5Cbeta%28z_0+-+r_%5Ctheta%28x%2C+y%29%29%29+%26+%5Ctext%7Bif+%7D+y+%5Csim+y_%7Bundesirable%7D%7Cx+%5Cend%7Bcases%7D\" /></p>\n<p><img alt=\"\\sigma\" src=\"https://www.zhihu.com/equation?tex=%5Csigma\" /> 是 Sigmoid 函数。这个 value function 满足前景理论的关键性质：concave in gains（收益边际效用递减），convex in losses（损失边际效用递减），loss aversion（对损失更敏感）。</p>\n<p><strong>Reference Point</strong>：人类判断输出质量相对于所有可能的输出分布，而非相对于单个 dispreferred output（如 DPO）。reference point <img alt=\"z_0\" src=\"https://www.zhihu.com/equation?tex=z_0\" /> 是 policy 和 reference model 之间的 KL 散度。实际训练时用 biased estimate（mismatched pairs 的平均值）以降低计算成本。</p>\n<p><strong>超参数</strong>（论文 Page 6）：</p>\n<ul>\n<li><img alt=\"\\beta \\in [0.01, 1.0]\" src=\"https://www.zhihu.com/equation?tex=%5Cbeta+%5Cin+%5B0.01%2C+1.0%5D\" />：风险厌恶。<img alt=\"\\beta\" src=\"https://www.zhihu.com/equation?tex=%5Cbeta\" /> 越大，value saturation 越快，人类越风险厌恶。SFT 后的大模型用较小 <img alt=\"\\beta\" src=\"https://www.zhihu.com/equation?tex=%5Cbeta\" />（如 0.05-0.10），无 SFT 的小模型用较大 <img alt=\"\\beta\" src=\"https://www.zhihu.com/equation?tex=%5Cbeta\" />（如 0.10-0.50）</li>\n<li><img alt=\"\\lambda_D, \\lambda_U\" src=\"https://www.zhihu.com/equation?tex=%5Clambda_D%2C+%5Clambda_U\" />：损失厌恶。默认设为 1，调整时遵循 <img alt=\"\\frac{\\lambda_D n_D}{\\lambda_U n_U} \\in [1, 1.5]\" src=\"https://www.zhihu.com/equation?tex=%5Cfrac%7B%5Clambda_D+n_D%7D%7B%5Clambda_U+n_U%7D+%5Cin+%5B1%2C+1.5%5D\" />（论文 Equation 9）。例如 desirable:undesirable 比例为 1:10 时，设 <img alt=\"\\lambda_U = 1, \\lambda_D \\in [10, 15]\" src=\"https://www.zhihu.com/equation?tex=%5Clambda_U+%3D+1%2C+%5Clambda_D+%5Cin+%5B10%2C+15%5D\" /></li>\n</ul>\n<h3>核心优势</h3>\n<p>KTO 的核心优势是<strong>数据获取门槛低且在实验中达到或超过 DPO 性能</strong>。论文实验表明（Figure 3），在 1B-30B 模型规模上，KTO 匹配或超越 DPO。Llama-{13B, 30B} 上 KTO alone 甚至超越 SFT+DPO。</p>\n<p>GSM8K 数学推理上，KTO 比 DPO 高 13.5 个百分点（论文 Table 2）。KTO 可以处理极端数据不平衡——丢弃 90% desirable examples 后仍然超越 DPO（论文 Figure 5）。</p>\n<p>理论上，KTO 有更好的 worst-case guarantee 处理偏好不一致（论文 Theorem 4.3）：当存在矛盾偏好时，DPO 可能偏向少数偏好，KTO 会严格选择多数偏好（对于 loss-neutral value function）。</p>\n<h3>存在不足</h3>\n<p>KTO 的主要不足是<strong>理论上存在 underfitting 风险</strong>（论文 Proposition 4.1）：当隐式奖励趋于极端值时，梯度趋于零。这可能让 KTO 避免学习噪声数据，但也可能忽略难学但必要的样本，导致对复杂分布的欠拟合。</p>\n<p>可以通过降低 <img alt=\"\\beta\" src=\"https://www.zhihu.com/equation?tex=%5Cbeta\" /> 和增加训练 epoch 来缓解。论文 Page 10 建议：如果偏好数据噪声少、一致性高，DPO 可能更好；如果噪声多、存在矛盾偏好，KTO 的 worst-case guarantee 更有优势。大多数公开偏好数据集噪声较大，所以 KTO 在实验中表现更好。</p>\n<p>超参数调节：<img alt=\"\\beta\" src=\"https://www.zhihu.com/equation?tex=%5Cbeta\" />、<img alt=\"\\lambda_D, \\lambda_U\" src=\"https://www.zhihu.com/equation?tex=%5Clambda_D%2C+%5Clambda_U\" /> 需要根据任务、模型规模、数据平衡度调节。默认设置不一定最优。</p>\n<hr />\n<h3>2.3 ORPO (Odds Ratio Preference Optimization)</h3>\n<h3>算法细节</h3>\n<p>ORPO 由 Hong 等人提出（arXiv:2403.07691），核心创新是<strong>将 SFT 与偏好优化合二为一，无需 Reference Model</strong>。论文标题明确指出：Monolithic Preference Optimization without Reference Model。</p>\n<p><strong>SFT 的问题</strong>：论文 Section 3 分析，传统 SFT 只用 cross-entropy 损失最大化 chosen responses 的概率，但没有机制惩罚 rejected responses。实验表明（Figure 3），仅用 chosen responses 做 SFT，rejected responses 的 log probability 也同步上升，甚至可能超过 chosen responses。</p>\n<p><strong>Odds 定义</strong>（论文 Equation 3-4）：给定输入序列 <img alt=\"x\" src=\"https://www.zhihu.com/equation?tex=x\" /> 和输出序列 <img alt=\"y\" src=\"https://www.zhihu.com/equation?tex=y\" />（长度 <img alt=\"m\" src=\"https://www.zhihu.com/equation?tex=m\" />），平均 log-likelihood 和 odds 定义为：</p>\n<p><img alt=\"\\log P_\\theta(y|x) = \\frac{1}{m}\\sum_{t=1}^m \\log P_\\theta(y_t|x,y_{&lt;t})\" src=\"https://www.zhihu.com/equation?tex=%5Clog+P_%5Ctheta%28y%7Cx%29+%3D+%5Cfrac%7B1%7D%7Bm%7D%5Csum_%7Bt%3D1%7D%5Em+%5Clog+P_%5Ctheta%28y_t%7Cx%2Cy_%7B%3Ct%7D%29\" /></p>\n<p><img alt=\"odds_\\theta(y|x) = \\frac{P_\\theta(y|x)}{1-P_\\theta(y|x)}\" src=\"https://www.zhihu.com/equation?tex=odds_%5Ctheta%28y%7Cx%29+%3D+%5Cfrac%7BP_%5Ctheta%28y%7Cx%29%7D%7B1-P_%5Ctheta%28y%7Cx%29%7D\" /></p>\n<p>直觉理解：如果 <img alt=\"odds_\\theta(y|x) = k\" src=\"https://www.zhihu.com/equation?tex=odds_%5Ctheta%28y%7Cx%29+%3D+k\" />，意味着模型生成 <img alt=\"y\" src=\"https://www.zhihu.com/equation?tex=y\" /> 的可能性是不生成 <img alt=\"y\" src=\"https://www.zhihu.com/equation?tex=y\" /> 的 <img alt=\"k\" src=\"https://www.zhihu.com/equation?tex=k\" /> 倍。</p>\n<p><strong>Odds Ratio</strong>（论文 Equation 5）：chosen response <img alt=\"y_w\" src=\"https://www.zhihu.com/equation?tex=y_w\" /> 和 rejected response <img alt=\"y_l\" src=\"https://www.zhihu.com/equation?tex=y_l\" /> 的 odds ratio：</p>\n<p><img alt=\"OR_\\theta(y_w, y_l) = \\frac{odds_\\theta(y_w|x)}{odds_\\theta(y_l|x)}\" src=\"https://www.zhihu.com/equation?tex=OR_%5Ctheta%28y_w%2C+y_l%29+%3D+%5Cfrac%7Bodds_%5Ctheta%28y_w%7Cx%29%7D%7Bodds_%5Ctheta%28y_l%7Cx%29%7D\" /></p>\n<p>表示模型生成 chosen response 相对于 rejected response 的可能性倍数。</p>\n<p><strong>ORPO 目标函数</strong>（论文 Equation 6-7）：</p>\n<p><img alt=\"\\mathcal{L}_{ORPO} = \\mathbb{E}_{(x,y_w,y_l)}[\\mathcal{L}_{SFT} + \\lambda \\cdot \\mathcal{L}_{OR}]\" src=\"https://www.zhihu.com/equation?tex=%5Cmathcal%7BL%7D_%7BORPO%7D+%3D+%5Cmathbb%7BE%7D_%7B%28x%2Cy_w%2Cy_l%29%7D%5B%5Cmathcal%7BL%7D_%7BSFT%7D+%2B+%5Clambda+%5Ccdot+%5Cmathcal%7BL%7D_%7BOR%7D%5D\" /></p>\n<p>其中 <img alt=\"\\mathcal{L}_{SFT}\" src=\"https://www.zhihu.com/equation?tex=%5Cmathcal%7BL%7D_%7BSFT%7D\" /> 是标准的 negative log-likelihood 损失，<img alt=\"\\mathcal{L}_{OR}\" src=\"https://www.zhihu.com/equation?tex=%5Cmathcal%7BL%7D_%7BOR%7D\" /> 是 odds ratio loss：</p>\n<p><img alt=\"\\mathcal{L}_{OR} = -\\log\\sigma\\left(\\log\\frac{odds_\\theta(y_w|x)}{odds_\\theta(y_l|x)}\\right)\" src=\"https://www.zhihu.com/equation?tex=%5Cmathcal%7BL%7D_%7BOR%7D+%3D+-%5Clog%5Csigma%5Cleft%28%5Clog%5Cfrac%7Bodds_%5Ctheta%28y_w%7Cx%29%7D%7Bodds_%5Ctheta%28y_l%7Cx%29%7D%5Cright%29\" /></p>\n<p><strong>关键设计</strong>：<img alt=\"\\lambda\" src=\"https://www.zhihu.com/equation?tex=%5Clambda\" /> 不是 SFT 和 OR 的平衡系数，而是 OR 损失的附加权重。SFT 损失主导 domain adaptation，OR 损失提供偏好对齐信号。这与文章之前写的 <img alt=\"\\lambda \\cdot L_{SFT} + (1-\\lambda) \\cdot L_{OR}\" src=\"https://www.zhihu.com/equation?tex=%5Clambda+%5Ccdot+L_%7BSFT%7D+%2B+%281-%5Clambda%29+%5Ccdot+L_%7BOR%7D\" /> 完全不同。</p>\n<p><strong>梯度分析</strong>（论文 Equation 8-10）：<img alt=\"\\mathcal{L}_{OR}\" src=\"https://www.zhihu.com/equation?tex=%5Cmathcal%7BL%7D_%7BOR%7D\" /> 的梯度由两部分组成：</p>\n<ul>\n<li><img alt=\"\\delta(d)\" src=\"https://www.zhihu.com/equation?tex=%5Cdelta%28d%29\" />：penalty term，当 odds ratio 高时趋于 0，加速参数更新当模型更可能生成 rejected response</li>\n<li><img alt=\"h(d)\" src=\"https://www.zhihu.com/equation?tex=h%28d%29\" />：weighted contrast，放大低概率响应的梯度</li>\n</ul>\n<h3>核心优势</h3>\n<p>ORPO 的核心优势是<strong>无需 Reference Model 和 SFT warm-up 阶段</strong>。DPO 需要维护 reference model（额外的显存开销）和先做 SFT warm-up。ORPO 直接在 pre-trained model 上单阶段训练，只需一个模型。</p>\n<p>论文实验（Figure 1, Table 6）：Mistral-ORPO-β (7B) 单 epoch 训练在 UltraFeedback 上达到：</p>\n<ul>\n<li>AlpacaEval2.0：12.20%（超越 Llama-2-Chat 13B 和 Zephyr-β）</li>\n<li>IFEval (instruction-level loose)：66.19%</li>\n<li>MT-Bench：7.32</li>\n</ul>\n<p>相比 DPO，ORPO 避免了两阶段训练的灾难性遗忘问题——DPO 第二阶段的偏好优化可能导致模型遗忘第一阶段 SFT 学到的语言能力。ORPO 通过联合优化，在偏好对齐的同时保持 domain adaptation 能力。</p>\n<h3>存在不足</h3>\n<p>ORPO 的主要不足是<strong>对 pre-trained model 质量有要求</strong>。论文在 OPT 系列模型上实验（125M-1.3B），基础模型的指令遵循能力直接影响最终效果。如果 pre-trained model 本身质量差，ORPO 很难达到理想结果。</p>\n<p>lambda 参数调节：论文实验用 <img alt=\"\\lambda = 0.1\" src=\"https://www.zhihu.com/equation?tex=%5Clambda+%3D+0.1\" />，但不同任务可能需要调整。lambda 过大会损害 SFT 的 domain adaptation 能力，lambda 过小则偏好对齐信号弱。</p>\n<p>此外，论文主要在对话场景验证，其他场景（如代码生成、数学推理）的效果有待进一步验证。</p>\n<hr />\n<h3>2.4 IPO (Identity Preference Optimization)</h3>\n<h3>算法细节</h3>\n<p>IPO 由 Google DeepMind 团队提出（arXiv:2310.12036），理论基础是<strong>统一的偏好学习框架 ΨPO</strong>。核心贡献：揭示 DPO 和 RLHF 依赖 Bradley-Terry 模型假设（用点奖励替代成对偏好），当偏好接近确定性时会导致过拟合。IPO 绕过这个假设。</p>\n<p><strong>ΨPO 框架</strong>（论文 Equation 6）：论文提出一个通用的偏好优化目标：</p>\n<p><img alt=\"\\max_\\pi \\mathbb{E}_{x\\sim\\rho, y\\sim\\pi(\\cdot|x), y'\\sim\\mu(\\cdot|x)}[\\Psi(p^*(y \\succ y'|x))] - \\tau D_{KL}(\\pi || \\pi_{ref})\" src=\"https://www.zhihu.com/equation?tex=%5Cmax_%5Cpi+%5Cmathbb%7BE%7D_%7Bx%5Csim%5Crho%2C+y%5Csim%5Cpi%28%5Ccdot%7Cx%29%2C+y%27%5Csim%5Cmu%28%5Ccdot%7Cx%29%7D%5B%5CPsi%28p%5E%2A%28y+%5Csucc+y%27%7Cx%29%29%5D+-+%5Ctau+D_%7BKL%7D%28%5Cpi+%7C%7C+%5Cpi_%7Bref%7D%29\" /></p>\n<p>其中 <img alt=\"\\Psi: [0,1] \\to \\mathbb{R}\" src=\"https://www.zhihu.com/equation?tex=%5CPsi%3A+%5B0%2C1%5D+%5Cto+%5Cmathbb%7BR%7D\" /> 是非递减函数。选择不同的 <img alt=\"\\Psi\" src=\"https://www.zhihu.com/equation?tex=%5CPsi\" /> 得到不同算法：</p>\n<ul>\n<li><img alt=\"\\Psi(q) = \\log\\frac{q}{1-q}\" src=\"https://www.zhihu.com/equation?tex=%5CPsi%28q%29+%3D+%5Clog%5Cfrac%7Bq%7D%7B1-q%7D\" />（logit）：得到 DPO 和 RLHF</li>\n<li><img alt=\"\\Psi(q) = q\" src=\"https://www.zhihu.com/equation?tex=%5CPsi%28q%29+%3D+q\" />（identity）：得到 IPO</li>\n</ul>\n<p><strong>DPO 的过拟合问题</strong>（论文 Section 4.2）：当偏好接近确定性（<img alt=\"p^*(y \\succ y') \\approx 1\" src=\"https://www.zhihu.com/equation?tex=p%5E%2A%28y+%5Csucc+y%27%29+%5Capprox+1\" />）时，Bradley-Terry 模型要求 <img alt=\"(r(y) - r(y')) \\to +\\infty\" src=\"https://www.zhihu.com/equation?tex=%28r%28y%29+-+r%28y%27%29%29+%5Cto+%2B%5Cinfty\" />。代入最优策略公式：</p>\n<p><img alt=\"\\pi^*(y')/\\pi^*(y) = 0\" src=\"https://www.zhihu.com/equation?tex=%5Cpi%5E%2A%28y%27%29%2F%5Cpi%5E%2A%28y%29+%3D+0\" /></p>\n<p>KL 正则化失效！即使 <img alt=\"\\tau\" src=\"https://www.zhihu.com/equation?tex=%5Ctau\" /> 很大，策略也偏离 reference model。在有限数据场景更严重：即使真实偏好 <img alt=\"p^* = 0.8\" src=\"https://www.zhihu.com/equation?tex=p%5E%2A+%3D+0.8\" />，样本估计可能 <img alt=\"\\hat{p} = 1\" src=\"https://www.zhihu.com/equation?tex=%5Chat%7Bp%7D+%3D+1\" />，导致 dispreferred action 概率被推到 0。</p>\n<p>论文 Figure 1-2 实验验证：DPO 在确定性偏好场景收敛到贪婪策略（<img alt=\"\\pi(y) = 1\" src=\"https://www.zhihu.com/equation?tex=%5Cpi%28y%29+%3D+1\" /> 或 <img alt=\"\\pi(y) = 0\" src=\"https://www.zhihu.com/equation?tex=%5Cpi%28y%29+%3D+0\" />），完全忽略 reference policy 和 KL 正则化。</p>\n<p><strong>IPO 的解决方案</strong>（论文 Section 5）：取 <img alt=\"\\Psi = Identity\" src=\"https://www.zhihu.com/equation?tex=%5CPsi+%3D+Identity\" />，目标变为直接优化 preference probability：</p>\n<p><img alt=\"\\max_\\pi p^*_\\rho(\\pi \\succ \\mu) - \\tau D_{KL}(\\pi || \\pi_{ref})\" src=\"https://www.zhihu.com/equation?tex=%5Cmax_%5Cpi+p%5E%2A_%5Crho%28%5Cpi+%5Csucc+%5Cmu%29+-+%5Ctau+D_%7BKL%7D%28%5Cpi+%7C%7C+%5Cpi_%7Bref%7D%29\" /></p>\n<p>关键是 <img alt=\"\\Psi = Identity\" src=\"https://www.zhihu.com/equation?tex=%5CPsi+%3D+Identity\" /> 是有界的（<img alt=\"[0,1]\" src=\"https://www.zhihu.com/equation?tex=%5B0%2C1%5D\" />），不像 logit 无界。即使偏好确定性，KL 正则化仍然有效。</p>\n<p><strong>IPO 损失函数</strong>（论文 Equation 17）：推导得到简洁的回归损失：</p>\n<p><img alt=\"\\mathcal{L}_{IPO}(\\pi) = \\mathbb{E}_{(yw,yl)\\sim D}\\left[\\left(h_\\pi(yw, yl) - \\frac{1}{2\\tau}\\right)^2\\right]\" src=\"https://www.zhihu.com/equation?tex=%5Cmathcal%7BL%7D_%7BIPO%7D%28%5Cpi%29+%3D+%5Cmathbb%7BE%7D_%7B%28yw%2Cyl%29%5Csim+D%7D%5Cleft%5B%5Cleft%28h_%5Cpi%28yw%2C+yl%29+-+%5Cfrac%7B1%7D%7B2%5Ctau%7D%5Cright%29%5E2%5Cright%5D\" /></p>\n<p>其中：</p>\n<p><img alt=\"h_\\pi(y, y') = \\log\\frac{\\pi(y)\\pi_{ref}(y')}{\\pi(y')\\pi_{ref}(y)} = \\log\\frac{\\pi(y)}{\\pi(y')} - \\log\\frac{\\pi_{ref}(y)}{\\pi_{ref}(y')}\" src=\"https://www.zhihu.com/equation?tex=h_%5Cpi%28y%2C+y%27%29+%3D+%5Clog%5Cfrac%7B%5Cpi%28y%29%5Cpi_%7Bref%7D%28y%27%29%7D%7B%5Cpi%28y%27%29%5Cpi_%7Bref%7D%28y%29%7D+%3D+%5Clog%5Cfrac%7B%5Cpi%28y%29%7D%7B%5Cpi%28y%27%29%7D+-+%5Clog%5Cfrac%7B%5Cpi_%7Bref%7D%28y%29%7D%7B%5Cpi_%7Bref%7D%28y%27%29%7D\" /></p>\n<p>直觉解释：IPO 把 log-likelihood ratio 的差距回归到 <img alt=\"\\frac{1}{2\\tau}\" src=\"https://www.zhihu.com/equation?tex=%5Cfrac%7B1%7D%7B2%5Ctau%7D\" />。<img alt=\"\\tau\" src=\"https://www.zhihu.com/equation?tex=%5Ctau\" /> 越大（正则化越强），差距越小，策略更接近 <img alt=\"\\pi_{ref}\" src=\"https://www.zhihu.com/equation?tex=%5Cpi_%7Bref%7D\" />。不像 DPO 的 sigmoid 损失可能饱和，IPO 的回归损失始终有梯度。</p>\n<p><strong>与 DPO 的本质区别</strong>：DPO 试图让 <img alt=\"h_\\pi(yw, yl) \\to +\\infty\" src=\"https://www.zhihu.com/equation?tex=h_%5Cpi%28yw%2C+yl%29+%5Cto+%2B%5Cinfty\" />（preferred action 无限优于 dispreferred），IPO 只要求 <img alt=\"h_\\pi(yw, yl) = \\frac{1}{2\\tau}\" src=\"https://www.zhihu.com/equation?tex=h_%5Cpi%28yw%2C+yl%29+%3D+%5Cfrac%7B1%7D%7B2%5Ctau%7D\" />（有限差距）。这确保 KL 正则化始终有效。</p>\n<h3>核心优势</h3>\n<p>IPO 的核心优势是<strong>避免 DPO 的过拟合问题，KL 正则化始终有效</strong>。论文 Section 5.3-5.4 实验验证：</p>\n<ul>\n<li>确定性偏好场景：IPO 收敛到接近 <img alt=\"\\pi_{ref}\" src=\"https://www.zhihu.com/equation?tex=%5Cpi_%7Bref%7D\" /> 的策略（由 <img alt=\"\\tau\" src=\"https://www.zhihu.com/equation?tex=%5Ctau\" /> 控制），DPO 收敛到贪婪策略</li>\n<li>未观测 action 场景：IPO 保留未观测 action 的概率（接近 <img alt=\"\\pi_{ref}\" src=\"https://www.zhihu.com/equation?tex=%5Cpi_%7Bref%7D\" />），DPO 把概率推到 0</li>\n</ul>\n<p>理论上，IPO 不依赖 Bradley-Terry 模型假设，直接优化 preference probability。当偏好数据噪声大、存在确定性偏好时，IPO 比 DPO 更稳定。</p>\n<p>损失函数简洁：平方回归，无需 sigmoid，梯度始终存在。实现简单（论文 Algorithm 1）。</p>\n<h3>存在不足</h3>\n<p>IPO 的主要不足是<strong>需要调节 <img alt=\"\\tau\" src=\"https://www.zhihu.com/equation?tex=%5Ctau\" /> 且效果受数据覆盖影响</strong>。论文 Theorem 2 证明最优策略唯一的前提是 <img alt=\"\\text{Supp}(\\mu) = \\text{Supp}(\\pi_{ref})\" src=\"https://www.zhihu.com/equation?tex=%5Ctext%7BSupp%7D%28%5Cmu%29+%3D+%5Ctext%7BSupp%7D%28%5Cpi_%7Bref%7D%29\" />（行为策略和 reference 策略的支持集相同）。如果数据覆盖不全，可能存在多个最优解（附录 A.2）。</p>\n<p><img alt=\"\\tau\" src=\"https://www.zhihu.com/equation?tex=%5Ctau\" /> 的选择：论文实验用 <img alt=\"\\tau = 0.01\" src=\"https://www.zhihu.com/equation?tex=%5Ctau+%3D+0.01\" /> 到 <img alt=\"\\tau = 100\" src=\"https://www.zhihu.com/equation?tex=%5Ctau+%3D+100\" />，效果差异显著。<img alt=\"\\tau\" src=\"https://www.zhihu.com/equation?tex=%5Ctau\" /> 太小接近 DPO 的过拟合，<img alt=\"\\tau\" src=\"https://www.zhihu.com/equation?tex=%5Ctau\" /> 太大策略几乎不动。</p>\n<p>此外，论文主要在简单 bandit 场景验证，大规模 LLM 训练的效果有待进一步验证。论文 Conclusion 明确指出：Future works should scale those experiments to more complex settings such as training language models on human preferences data.</p>\n<hr />\n<h2>三、算法对比总结表</h2>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>算法</th>\n<th>类型</th>\n<th>是否需要 Critic</th>\n<th>数据需求</th>\n<th>核心优势</th>\n<th>主要不足</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>PPO</td>\n<td>Online</td>\n<td>是（需 Value Function）</td>\n<td>在线采样 + Reward Model + Value Function</td>\n<td>Clip 稳定训练，工业标准</td>\n<td>显存开销大，价值函数难训练，超参数敏感</td>\n</tr>\n<tr>\n<td>GRPO</td>\n<td>Online</td>\n<td>否</td>\n<td>在线采样 + 组内相对奖励</td>\n<td>移除 Critic，显存效率高</td>\n<td>熵崩溃，sample-level 损失问题</td>\n</tr>\n<tr>\n<td>GSPO</td>\n<td>Online</td>\n<td>否</td>\n<td>在线采样 + 组内相对奖励（Sequence-level importance ratio）</td>\n<td>解决 GRPO 稳定性问题，稳定 MoE RL</td>\n<td>clip 范围需重新调参，token 级场景需变体</td>\n</tr>\n<tr>\n<td>DAPO</td>\n<td>Online</td>\n<td>否</td>\n<td>在线采样 + Rule-based Reward（动态过滤）</td>\n<td>AIME 50 分，超 R1-Zero</td>\n<td>移除 KL 约束，仅适用有正确答案任务</td>\n</tr>\n<tr>\n<td>DPO</td>\n<td>Offline</td>\n<td>否</td>\n<td>静态偏好对 (y_w, y_l)</td>\n<td>流程简化，单阶段训练，稳定</td>\n<td>过拟合风险，性能上限受限于数据覆盖，response length 增加</td>\n</tr>\n<tr>\n<td>KTO</td>\n<td>Offline</td>\n<td>否</td>\n<td>非配对二元标签（binary signal）</td>\n<td>数据门槛低，实验达/超DPO，处理偏好不一致</td>\n<td>欠拟合风险，超参数敏感</td>\n</tr>\n<tr>\n<td>ORPO</td>\n<td>Offline</td>\n<td>否（无需 Reference Model）</td>\n<td>静态偏好对</td>\n<td>单阶段 SFT+偏好对齐，无 reference model，省显存</td>\n<td>对 pre-trained model 质量有要求，lambda 调参</td>\n</tr>\n<tr>\n<td>IPO</td>\n<td>Offline</td>\n<td>否</td>\n<td>静态偏好对</td>\n<td>ΨPO 框架特例，绕过 BT 假设，避免 DPO 过拟合</td>\n<td>需调 τ，数据覆盖要求高，大规模验证待做</td>\n</tr>\n</tbody>\n</table></div>\n<hr />\n<h2>四、参考资料</h2>\n<p><strong>1. PPO (Proximal Policy Optimization)</strong></p>\n<ul>\n<li>Schulman J, Wolski F, Dhariwal P, et al. <strong>Proximal Policy Optimization Algorithms</strong>. arXiv:1707.06347, 2017.</li>\n<li>论文链接：<a href=\"https://link.zhihu.com/?target=https%3A//arxiv.org/abs/1707.06347\">https://arxiv.org/abs/1707.06347</a></li>\n</ul>\n<p><strong>2. GRPO (Group Relative Policy Optimization)</strong></p>\n<ul>\n<li>Shao Z, Wang P, Zhu Q, et al. <strong>DeepSeekMath: Pushing the Limits of Mathematical Reasoning in Open Language Models</strong>. arXiv:2402.03300, 2024.</li>\n<li>论文链接：<a href=\"https://link.zhihu.com/?target=https%3A//arxiv.org/abs/2402.03300\">https://arxiv.org/abs/2402.03300</a></li>\n</ul>\n<p><strong>3. GSPO (Group Sequence Policy Optimization)</strong></p>\n<ul>\n<li>Qwen Team. <strong>Group Sequence Policy Optimization</strong>. arXiv:2507.18071, 2025.</li>\n<li>论文链接：<a href=\"https://link.zhihu.com/?target=https%3A//arxiv.org/abs/2507.18071\">https://arxiv.org/abs/2507.18071</a></li>\n</ul>\n<p><strong>4. DAPO (Decoupled Clip and Dynamic Sampling Policy Optimization)</strong></p>\n<ul>\n<li>Yu Q, He W, Wang Y, et al. <strong>DAPO: An Open-Source LLM Reinforcement Learning System at Scale</strong>. arXiv:2503.14476, 2025.</li>\n<li>论文链接：<a href=\"https://link.zhihu.com/?target=https%3A//arxiv.org/abs/2503.14476\">https://arxiv.org/abs/2503.14476</a></li>\n</ul>\n<p><strong>5. DPO (Direct Preference Optimization)</strong></p>\n<ul>\n<li>Rafailov R, Sharma A, Mitchell E, et al. <strong>Direct Preference Optimization: Your Language Model is Secretly a Reward Model</strong>. arXiv:2305.18290, 2023.</li>\n<li>论文链接：<a href=\"https://link.zhihu.com/?target=https%3A//arxiv.org/abs/2305.18290\">https://arxiv.org/abs/2305.18290</a></li>\n</ul>\n<p><strong>6. KTO (Kahneman-Tversky Optimization)</strong></p>\n<ul>\n<li>Ethayarajh K, Xu W, Muennighoff N, et al. <strong>KTO: Model Alignment as Prospect Theoretic Optimization</strong>. arXiv:2402.01306, 2024.</li>\n<li>论文链接：<a href=\"https://link.zhihu.com/?target=https%3A//arxiv.org/abs/2402.01306\">https://arxiv.org/abs/2402.01306</a></li>\n</ul>\n<p><strong>7. ORPO (Odds Ratio Preference Optimization)</strong></p>\n<ul>\n<li>Hong J, Lee K, Kim J, et al. <strong>ORPO: Monolithic Preference Optimization without Reference Model</strong>. arXiv:2403.07691, 2024.</li>\n<li>论文链接：<a href=\"https://link.zhihu.com/?target=https%3A//arxiv.org/abs/2403.07691\">https://arxiv.org/abs/2403.07691</a></li>\n</ul>\n<p><strong>8. IPO (Identity Preference Optimization)</strong></p>\n<ul>\n<li>Azar M G, Rowland M, Piot B, et al. <strong>A General Theoretical Paradigm to Understand Learning from Human Preferences</strong>. arXiv:2310.12036, 2023.</li>\n<li>论文链接：<a href=\"https://link.zhihu.com/?target=https%3A//arxiv.org/abs/2310.12036\">https://arxiv.org/abs/2310.12036</a></li>\n<li>注：IPO 是 ΨPO 框架的特例（Ψ = Identity）</li>\n</ul>"
    }
  ],
  "latest_overview": [
    {
      "title": "",
      "body_html": "<h1>为什么大模型对齐正在从“一个奖励分数”，走向“一组可调偏好”？</h1>\n<ul>\n<li>来源平台: <strong>zhihu</strong>（知乎专栏文章）</li>\n<li>原文链接: <a href=\"https://zhuanlan.zhihu.com/p/2042316240245579785\">https://zhuanlan.zhihu.com/p/2042316240245579785</a></li>\n<li>作者: 薛定e的猫</li>\n</ul>\n<hr />\n<p>为什么大模型对齐正在从“一个奖励分数”，走向“一组可调偏好”？</p>\n<h1>为什么大模型对齐正在从“一个奖励分数”，走向“一组可调偏好”？</h1>\n<p>作者: 薛定e的猫, 赞: 4</p>\n<p>如果你做过 RLHF、DPO 或奖励模型，很快会遇到一个尴尬问题：</p>\n<p><strong>一个“好回答”到底是什么意思？</strong></p>\n<p>它要有用，但不能越界；要详细，但不能啰嗦；要诚实，但不能一遇到不确定就拒答；要符合用户风格，但又不能牺牲事实性。传统做法常把这些偏好压成一个标量 reward，但真实产品里，偏好往往不是一个分数，而是一组互相拉扯的目标。</p>\n<p>所以，多目标对齐真正关心的不是“多加几个 reward 再求和”，而是让模型学会表示、控制和调整这些目标之间的权衡。</p>\n<p>我的核心判断是：</p>\n<p><strong>大模型对齐正在从训练一个“平均助手”，转向训练一个能表达偏好空间、可调节、可解释、可迁移的助手。</strong></p>\n<p>这篇笔记整理了 11 个我认为值得关注的开源项目，并按研究路线、适用场景和阅读顺序做了一次筛选。</p>\n<h2>1. 为什么单一 reward 不够</h2>\n<p>传统 RLHF / DPO 常把人类偏好压成一个标量信号：回答更好就是 1，更差就是 0，或者由单个 Reward Model 给出一个总分。这个设定简单有效，但它会掩盖几个关键冲突：</p>\n<ul>\n<li><strong>Helpfulness vs Safety</strong>：更有用的回答可能更容易触碰安全边界；更安全的模型又可能出现过度拒答。</li>\n<li><strong>Honesty vs Fluency</strong>：流畅回答不一定真实；诚实表达不确定性又可能让回答看起来“不够聪明”。</li>\n<li><strong>Conciseness vs Completeness</strong>：短回答适合高频任务，长解释适合学习和调试。</li>\n<li><strong>General preference vs Personal preference</strong>：一个用户喜欢严谨，一个用户喜欢直给；一个企业场景要求保守，另一个场景要求探索。</li>\n</ul>\n<p>如果所有目标都被压成一个总分，模型学到的往往是“平均偏好”。这在开放产品里会带来两个问题：一是不同用户很难被同时满足，二是产品侧很难解释模型到底为什么这么回答。</p>\n<p>多目标对齐的价值就在这里：<strong>它把“好回答”拆成多个维度，让我们可以讨论、度量和控制这些维度之间的取舍</strong>。</p>\n<h2>2. 一张路线图</h2>\n<p>可以把当前开源工作粗略分成五条路线：</p>\n<pre><code>单一 reward\n  |\n  |-- 多目标 DPO / 直接偏好优化：把 DPO 扩展到多个偏好目标\n  |-- Pareto / 模型插值：不找唯一最优点，而是找一组权衡解\n  |-- 奖励条件化 / 推理时控制：让用户偏好在推理阶段可调\n  |-- 多维 Reward Model：让奖励从黑箱总分变成可解释分项\n  |-- 策略无关 / 外部对齐：不改底座模型，用外部修正或解码引导\n</code></pre>\n<p>如果只记一句话：</p>\n<p><strong>多目标对齐不是把多个目标平均掉，而是显式建模偏好之间的冲突和选择。</strong></p>\n<h2>3. 开源项目怎么读</h2>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>你关心的问题</th>\n<th>推荐起点</th>\n<th>为什么先看它</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>DPO 如何扩展到多目标？</td>\n<td>MODPO、CPO</td>\n<td>距离现有 DPO 训练栈最近，工程迁移成本低</td>\n</tr>\n<tr>\n<td>如何获得一组 Pareto 解？</td>\n<td>Rewarded Soups、SIPO</td>\n<td>直观展示“多目标不是简单平均”</td>\n</tr>\n<tr>\n<td>如何做推理时动态控制？</td>\n<td>RiC、DPA、PARM</td>\n<td>更接近可调节助手和产品控制面板</td>\n</tr>\n<tr>\n<td>如何训练多维奖励模型？</td>\n<td>ArmoRM、MORE</td>\n<td>适合做评估、数据筛选和 reward hacking 诊断</td>\n</tr>\n<tr>\n<td>如何降低每个模型单独对齐的成本？</td>\n<td>MetaAligner、PARM</td>\n<td>一个偏外部修正，一个偏解码阶段引导</td>\n</tr>\n<tr>\n<td>如何构造更丰富的偏好数据？</td>\n<td>AMPO、MORE</td>\n<td>一个关注多候选选择，一个关注人类偏好多样性</td>\n</tr>\n</tbody>\n</table></div>\n<p>完整项目索引如下：</p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>项目</th>\n<th>年份 / 会议</th>\n<th>核心关键词</th>\n<th>开源内容</th>\n<th>适合谁</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td><a href=\"[https://arxiv.org/abs/2310.03708](https://link.zhihu.com/?target=https%3A//arxiv.org/abs/2310.03708)\">MODPO: Beyond One-Preference-Fits-All Alignment</a></td>\n<td>ACL Findings 2024</td>\n<td>Multi-Objective DPO, RL-free</td>\n<td><a href=\"[https://github.com/ZHZisZZ/modpo](https://link.zhihu.com/?target=https%3A//github.com/ZHZisZZ/modpo)\">GitHub</a></td>\n<td>想从 DPO 入手多目标对齐</td>\n</tr>\n<tr>\n<td><a href=\"[https://arxiv.org/abs/2306.04488](https://link.zhihu.com/?target=https%3A//arxiv.org/abs/2306.04488)\">Rewarded Soups</a></td>\n<td>NeurIPS 2023</td>\n<td>Pareto, model soup, multi-policy</td>\n<td><a href=\"[https://github.com/alexrame/rewardedsoups](https://link.zhihu.com/?target=https%3A//github.com/alexrame/rewardedsoups)\">GitHub</a></td>\n<td>想建立 Pareto / 模型插值直觉</td>\n</tr>\n<tr>\n<td><a href=\"[https://arxiv.org/abs/2402.10207](https://link.zhihu.com/?target=https%3A//arxiv.org/abs/2402.10207)\">RiC: Rewards-in-Context</a></td>\n<td>ICML 2024</td>\n<td>Reward conditioning, dynamic preference</td>\n<td><a href=\"[https://github.com/YangRui2015/RiC](https://link.zhihu.com/?target=https%3A//github.com/YangRui2015/RiC)\">GitHub</a></td>\n<td>想做 reward-conditioned SFT</td>\n</tr>\n<tr>\n<td><a href=\"[https://arxiv.org/abs/2402.18571](https://link.zhihu.com/?target=https%3A//arxiv.org/abs/2402.18571)\">DPA: Directional Preference Alignment</a></td>\n<td>ACL 2024</td>\n<td>reward vector, direction control</td>\n<td><a href=\"[https://github.com/RLHFlow/Directional-Preference-Alignment](https://link.zhihu.com/?target=https%3A//github.com/RLHFlow/Directional-Preference-Alignment)\">GitHub</a></td>\n<td>想用向量显式控制偏好方向</td>\n</tr>\n<tr>\n<td><a href=\"[https://arxiv.org/abs/2406.12845](https://link.zhihu.com/?target=https%3A//arxiv.org/abs/2406.12845)\">ArmoRM: Interpretable Preferences via Multi-Objective Reward Modeling</a></td>\n<td>EMNLP 2024</td>\n<td>multi-objective RM, MoE, interpretability</td>\n<td><a href=\"[https://github.com/RLHFlow/RLHF-Reward-Modeling](https://link.zhihu.com/?target=https%3A//github.com/RLHFlow/RLHF-Reward-Modeling)\">GitHub</a></td>\n<td>想做多维奖励和可解释评估</td>\n</tr>\n<tr>\n<td><a href=\"[https://arxiv.org/abs/2402.19085](https://link.zhihu.com/?target=https%3A//arxiv.org/abs/2402.19085)\">CPO: Controllable Preference Optimization</a></td>\n<td>EMNLP 2024</td>\n<td>controllable alignment, 3H, CDPO</td>\n<td><a href=\"[https://github.com/OpenBMB/CPO](https://link.zhihu.com/?target=https%3A//github.com/OpenBMB/CPO)\">GitHub</a></td>\n<td>想围绕 helpfulness / honesty / harmlessness 做控制</td>\n</tr>\n<tr>\n<td><a href=\"[https://arxiv.org/abs/2403.17141](https://link.zhihu.com/?target=https%3A//arxiv.org/abs/2403.17141)\">MetaAligner</a></td>\n<td>NeurIPS 2024</td>\n<td>policy-agnostic, unseen objectives</td>\n<td><a href=\"[https://github.com/SteveKGYang/MetaAligner](https://link.zhihu.com/?target=https%3A//github.com/SteveKGYang/MetaAligner)\">GitHub</a></td>\n<td>想研究不改 policy 的外部对齐器</td>\n</tr>\n<tr>\n<td><a href=\"[https://arxiv.org/abs/2312.07401](https://link.zhihu.com/?target=https%3A//arxiv.org/abs/2312.07401)\">MORE: On Diversified Preferences</a></td>\n<td>EMNLP 2024</td>\n<td>diverse preferences, reward calibration</td>\n<td><a href=\"[https://github.com/dunzeng/MORE](https://link.zhihu.com/?target=https%3A//github.com/dunzeng/MORE)\">GitHub</a></td>\n<td>想研究标注者偏好分歧和 RM 校准</td>\n</tr>\n<tr>\n<td><a href=\"[https://arxiv.org/abs/2502.14354](https://link.zhihu.com/?target=https%3A//arxiv.org/abs/2502.14354)\">SIPO: Self-Improvement Towards Pareto Optimality</a></td>\n<td>ACL Findings 2025</td>\n<td>self-improvement, conflict mitigation</td>\n<td><a href=\"[https://github.com/zyttt-coder/SIPO](https://link.zhihu.com/?target=https%3A//github.com/zyttt-coder/SIPO)\">GitHub</a></td>\n<td>想做迭代式数据改进和 Pareto 改善</td>\n</tr>\n<tr>\n<td><a href=\"[https://github.com/Baijiong-Lin/PARM](https://link.zhihu.com/?target=https%3A//github.com/Baijiong-Lin/PARM)\">PARM: Multi-Objective Test-Time Alignment</a></td>\n<td>ICML 2025</td>\n<td>test-time alignment, autoregressive RM</td>\n<td><a href=\"[https://github.com/Baijiong-Lin/PARM](https://link.zhihu.com/?target=https%3A//github.com/Baijiong-Lin/PARM)\">GitHub</a></td>\n<td>想冻结 LLM，只在推理阶段引导生成</td>\n</tr>\n<tr>\n<td><a href=\"[https://arxiv.org/abs/2502.18293](https://link.zhihu.com/?target=https%3A//arxiv.org/abs/2502.18293)\">AMPO: Active Multi-Preference Optimization</a></td>\n<td>ICML 2025</td>\n<td>group preference, active selection</td>\n<td><a href=\"[https://huggingface.co/Multi-preference-Optimization](https://link.zhihu.com/?target=https%3A//huggingface.co/Multi-preference-Optimization)\">Datasets</a></td>\n<td>想研究多候选偏好选择和主动样本选择</td>\n</tr>\n</tbody>\n</table></div>\n<h2>4. 五条路线的重点</h2>\n<h3>4.1 多目标 DPO / 直接偏好优化</h3>\n<p>代表项目：<strong>MODPO、CPO、SIPO、AMPO</strong></p>\n<p>这一路线继承 DPO 的优点：不显式训练 PPO 式 RLHF 策略，也不需要高成本在线采样。不同之处在于，它不再只优化一个偏好标签，而是把偏好拆成多个目标，或者把多个候选回答组织成更丰富的训练信号。</p>\n<p>几个项目的差异可以这样理解：</p>\n<ul>\n<li><strong>MODPO</strong>：把 DPO loss 扩展到多目标 margin，用不同目标权重引导模型在安全性、帮助性、长度惩罚等维度上移动。</li>\n<li><strong>CPO</strong>：把目标偏好分数写进条件，让模型根据指定的 3H 偏好生成回答。</li>\n<li><strong>SIPO</strong>：先得到偏向不同目标的模型，再通过采样、评审、重写、过滤和再对齐，推动结果靠近 Pareto 更优区域。</li>\n<li><strong>AMPO</strong>：关注一组候选回答，不只选 best / worst，而是主动挑选更有信息量的偏好样本。</li>\n</ul>\n<blockquote>\n<p>如果你已经有 DPO 训练经验，优先看 MODPO 和 CPO。它们的抽象最容易迁移到现有训练栈。</p>\n</blockquote>\n<h3>4.2 Pareto 前沿 / 模型插值</h3>\n<p>代表项目：<strong>Rewarded Soups、SIPO</strong></p>\n<p>面对多个相互冲突的目标，不一定要强行找一个全局最优点。更自然的做法是找一条 Pareto front：在不牺牲某个目标的前提下，尽量改善另一个目标。</p>\n<p>Rewarded Soups 的思路很工程友好：先针对不同 reward 各自训练一个模型，再对这些模型权重做线性插值。它的关键经验是：从同一个初始化出发、针对不同奖励微调后的模型，在权重空间里可能存在可用的线性连接。</p>\n<p>这条路线的优点是直观，缺点也明显：如果目标很多，模型数量、插值搜索和评估成本都会迅速扩大。</p>\n<blockquote>\n<p>想理解“为什么多目标对齐不是简单平均 reward”，Rewarded Soups 很适合先读。</p>\n</blockquote>\n<h3>4.3 奖励条件化 / 推理时动态控制</h3>\n<p>代表项目：<strong>RiC、DPA、PARM</strong></p>\n<p>这一路线更接近产品想象：同一个模型最好能在推理阶段根据用户偏好切换行为。</p>\n<ul>\n<li><strong>RiC</strong>：把多个 reward 作为上下文条件，SFT 一个能读懂奖励条件的模型。</li>\n<li><strong>DPA</strong>：把用户偏好表示成 reward space 里的方向向量，例如更 helpful、更少 verbose。</li>\n<li><strong>PARM</strong>：冻结大模型，用 preference-aware autoregressive reward model 在 test-time 引导解码。</li>\n</ul>\n<p>这类方法适合“滑杆式”控制场景：更详细 / 更简洁、更安全 / 更直接、更正式 / 更口语化。</p>\n<blockquote>\n<p>如果你关注可调节 AI 助手，RiC 和 DPA 更容易建立直觉；如果你关注不能微调底座模型的业务场景，再看 PARM。</p>\n</blockquote>\n<h3>4.4 多目标 Reward Model</h3>\n<p>代表项目：<strong>ArmoRM、MORE</strong></p>\n<p>单一 Reward Model 的问题是黑箱且不可解释：它给出一个高分，但不知道高在哪个维度。是安全性高？事实性高？还是只是迎合了长度偏置？</p>\n<p>ArmoRM 的思路是先输出多个可解释维度的奖励，再由 gating network 做上下文相关的聚合。MORE 则关注人类偏好本身存在分歧时，奖励模型如何校准，以及如何用多目标 reward learning 改善表现。</p>\n<p>这条路线的价值不只在训练策略模型，也在评估和数据处理：</p>\n<ul>\n<li>给已有数据做多维打分；</li>\n<li>诊断 reward hacking；</li>\n<li>发现 helpfulness、safety、verbosity 等目标之间的冲突；</li>\n<li>做 reward reranker 或数据筛选器。</li>\n</ul>\n<blockquote>\n<p>如果你要自己做偏好数据集或评估体系，ArmoRM / MORE 的优先级应该很高。</p>\n</blockquote>\n<h3>4.5 策略无关 / 外部对齐</h3>\n<p>代表项目：<strong>MetaAligner、PARM</strong></p>\n<p>很多现实场景里，我们不想、也不能重新训练大模型。比如底座模型是闭源的，或者业务侧已经固定了模型版本。</p>\n<p>MetaAligner 的做法是学习一个外部修正器：给定原模型的弱回答和目标描述，生成更符合目标的强回答。PARM 则把更多工作放在解码阶段，用偏好感知的 autoregressive reward model 引导冻结 LLM。</p>\n<p>这条路线的共同点是降低对 policy 参数的依赖，更适合多模型共存、算力有限或闭源模型场景。</p>\n<blockquote>\n<p>如果你做的是工程系统，而不是单纯训练一个开源模型，MetaAligner / PARM 这类思路值得重点关注。</p>\n</blockquote>\n<h2>5. 重点项目速读</h2>\n<h3>MODPO：多目标版 DPO 的基准入口</h3>\n<ul>\n<li>论文：<a href=\"https://link.zhihu.com/?target=https%3A//arxiv.org/abs/2310.03708\">Beyond One-Preference-Fits-All Alignment: Multi-Objective Direct Preference Optimization</a></li>\n<li>代码：<a href=\"https://link.zhihu.com/?target=https%3A//github.com/ZHZisZZ/modpo\">ZHZisZZ/modpo</a></li>\n<li>关键词：DPO、MORLHF 替代、多目标 margin、安全 vs 帮助性、长度偏置。</li>\n</ul>\n<p>MODPO 的价值在于它把问题讲得很清楚：MORLHF 分别训练多个 reward weight 下的模型，成本和不稳定性都比较高；DPO 本身又是单目标的。MODPO 做的是把多目标权重并入 DPO 风格目标，让模型在不同 preference vector 下形成一组 Pareto 候选。</p>\n<p>如果你想复现实验，可以先看 summarization，因为长度偏置比安全性冲突更容易观察。</p>\n<h3>Rewarded Soups：用模型插值找 Pareto 解</h3>\n<ul>\n<li>论文：<a href=\"https://link.zhihu.com/?target=https%3A//arxiv.org/abs/2306.04488\">Rewarded soups: towards Pareto-optimal alignment by interpolating weights fine-tuned on diverse rewards</a></li>\n<li>代码：<a href=\"https://link.zhihu.com/?target=https%3A//github.com/alexrame/rewardedsoups\">alexrame/rewardedsoups</a></li>\n<li>关键词：model soup、reward interpolation、Pareto-optimal、多策略。</li>\n</ul>\n<p>Rewarded Soups 的直觉很适合入门：先为不同 reward 训练多个模型，再对模型权重插值。它让“多目标权衡”从抽象公式变成了可以观察的模型空间移动。</p>\n<p>这篇不只覆盖文本任务，也涉及图文和控制任务，视野比纯 LLM 对齐更宽。</p>\n<h3>RiC：把 reward 写进上下文</h3>\n<ul>\n<li>论文：<a href=\"https://link.zhihu.com/?target=https%3A//arxiv.org/abs/2402.10207\">Rewards-in-Context: Multi-objective Alignment of Foundation Models with Dynamic Preference Adjustment</a></li>\n<li>代码：<a href=\"https://link.zhihu.com/?target=https%3A//github.com/YangRui2015/RiC\">YangRui2015/RiC</a></li>\n<li>关键词：reward-conditioned SFT、动态偏好、低成本、多任务。</li>\n</ul>\n<p>RiC 的优点是简洁：不走复杂 PPO，而是构造带 reward 条件的数据，让模型学会“看到目标分数后生成对应回答”。仓库中还包含 SFT、MORLHF 和 Rewarded Soups 的对比实现，适合做横向复现。</p>\n<p>如果你想快速做一个“偏好可调”的小实验，RiC 是很好的起点。</p>\n<h3>DPA：用方向向量控制偏好</h3>\n<ul>\n<li>论文：<a href=\"https://link.zhihu.com/?target=https%3A//arxiv.org/abs/2402.18571\">Arithmetic Control of LLMs for Diverse User Preferences: Directional Preference Alignment with Multi-Objective Rewards</a></li>\n<li>代码：<a href=\"https://link.zhihu.com/?target=https%3A//github.com/RLHFlow/Directional-Preference-Alignment\">RLHFlow/Directional-Preference-Alignment</a></li>\n<li>关键词：multi-objective reward model、preference direction、RSF、arithmetic prompting。</li>\n</ul>\n<p>DPA 很适合产品化理解：用户偏好被表示成 reward space 里的单位方向向量。比如 <code>(1, 0)</code> 偏向 helpfulness，<code>(0, 1)</code> 偏向 verbosity，<code>(0.8, -0.6)</code> 则表示更 helpful 但更少 verbose。</p>\n<p>它的启发是：<strong>偏好控制不一定只靠自然语言 prompt 猜测，也可以显式使用数值向量</strong>。</p>\n<h3>ArmoRM：多维、可解释的 Reward Model</h3>\n<ul>\n<li>论文：<a href=\"https://link.zhihu.com/?target=https%3A//arxiv.org/abs/2406.12845\">Interpretable Preferences via Multi-Objective Reward Modeling and Mixture-of-Experts</a></li>\n<li>代码：<a href=\"https://link.zhihu.com/?target=https%3A//github.com/RLHFlow/RLHF-Reward-Modeling\">RLHFlow/RLHF-Reward-Modeling</a></li>\n<li>模型：<a href=\"https://link.zhihu.com/?target=https%3A//huggingface.co/RLHFlow/ArmoRM-Llama3-8B-v0.1\">ArmoRM-Llama3-8B-v0.1</a></li>\n<li>关键词：absolute-rating、多目标 RM、MoE gating、RewardBench。</li>\n</ul>\n<p>ArmoRM 适合放在评估和数据分析环节。实际做项目时，可以先用它给已有数据打分，看看不同目标之间是否存在明显冲突，再决定后续训练策略。</p>\n<h3>CPO：把 3H 偏好显式条件化</h3>\n<ul>\n<li>论文：<a href=\"https://link.zhihu.com/?target=https%3A//arxiv.org/abs/2402.19085\">Controllable Preference Optimization: Toward Controllable Multi-Objective Alignment</a></li>\n<li>代码：<a href=\"https://link.zhihu.com/?target=https%3A//github.com/OpenBMB/CPO\">OpenBMB/CPO</a></li>\n<li>关键词：CPSFT、CDPO、UltraSafety、helpfulness / honesty / harmlessness。</li>\n</ul>\n<p>CPO 的目标是缓解 alignment tax：提升 harmlessness 时，不要无谓牺牲 helpfulness 或 honesty。它围绕 3H 组织数据和实验，和真实助手类应用比较贴近。</p>\n<p>如果你的任务是安全对齐，CPO 很值得放进优先阅读列表。</p>\n<h3>MetaAligner：不改 policy 的多目标对齐</h3>\n<ul>\n<li>论文：<a href=\"https://link.zhihu.com/?target=https%3A//arxiv.org/abs/2403.17141\">MetaAligner: Towards Generalizable Multi-Objective Alignment of Language Models</a></li>\n<li>代码：<a href=\"https://link.zhihu.com/?target=https%3A//github.com/SteveKGYang/MetaAligner\">SteveKGYang/MetaAligner</a></li>\n<li>关键词：policy-agnostic、weak-to-strong correction、unseen objectives。</li>\n</ul>\n<p>MetaAligner 把多目标对齐做成一个外部修正器：给定原模型的弱回答和目标描述，生成更符合目标的强回答。这样可以在多个 policy model 上复用，也降低了每个模型单独对齐的训练成本。</p>\n<p>它适合研究“对齐器”和“底座模型”解耦的方向。</p>\n<h3>MORE：从奖励模型校准看多样化偏好</h3>\n<ul>\n<li>论文：<a href=\"https://link.zhihu.com/?target=https%3A//arxiv.org/abs/2312.07401\">On Diversified Preferences of Large Language Model Alignment</a></li>\n<li>代码：<a href=\"https://link.zhihu.com/?target=https%3A//github.com/dunzeng/MORE\">dunzeng/MORE</a></li>\n<li>关键词：diverse human preferences、reward calibration、ECE、multi-objective reward learning。</li>\n</ul>\n<p>MORE 的关注点不是“如何控制一个偏好向量”，而是“人类偏好本身有分歧时，奖励模型会怎样”。如果你要构建自己的偏好数据集，这篇的价值很高：它提醒我们不要默认所有标注者共享同一个偏好函数。</p>\n<h3>SIPO：自改进走向 Pareto 更优</h3>\n<ul>\n<li>论文：<a href=\"https://link.zhihu.com/?target=https%3A//arxiv.org/abs/2502.14354\">Self-Improvement Towards Pareto Optimality: Mitigating Preference Conflicts in Multi-Objective Alignment</a></li>\n<li>代码：<a href=\"https://link.zhihu.com/?target=https%3A//github.com/zyttt-coder/SIPO\">zyttt-coder/SIPO</a></li>\n<li>关键词：self-improvement、MOD sampling、review-rewrite-filter、conflict mitigation。</li>\n</ul>\n<p>SIPO 面向偏好冲突问题，例如 correctness 和 verbosity。它不是只改 loss，而是把采样、评审、重写、过滤和再训练串成一个自改进流程。</p>\n<p>这篇适合想做“迭代式数据改进”的同学。</p>\n<h3>PARM：推理时对齐，冻结大模型</h3>\n<ul>\n<li>论文：<a href=\"https://link.zhihu.com/?target=https%3A//arxiv.org/abs/2505.06274\">PARM: Multi-Objective Test-Time Alignment via Preference-Aware Autoregressive Reward Model</a></li>\n<li>代码：<a href=\"https://link.zhihu.com/?target=https%3A//github.com/Baijiong-Lin/PARM\">Baijiong-Lin/PARM</a></li>\n<li>关键词：test-time alignment、preference-aware ARM、frozen LLM、weak-to-strong guidance。</li>\n</ul>\n<p>PARM 的问题设定很现实：很多时候我们不想、也不能重新训练大模型。它训练一个 preference-aware autoregressive reward model，在解码阶段引导冻结 LLM 的生成。</p>\n<p>如果算力有限，或业务侧已经固定了底座模型，PARM 这类方法会很有吸引力。</p>\n<h2>6. 我的阶段性判断</h2>\n<p>短期看，<strong>MODPO / CPO / RiC</strong> 更适合工程复现；<strong>ArmoRM / MORE</strong> 更适合做评估和数据分析；<strong>MetaAligner / PARM</strong> 代表了低成本、策略无关或推理时对齐方向。</p>\n<p>长期看，多目标对齐很可能会和这些能力结合：</p>\n<ul>\n<li>个性化助手：不同用户拥有不同偏好配置；</li>\n<li>企业安全策略：不同业务线有不同安全和合规要求；</li>\n<li>模型路由：根据任务目标选择不同模型或不同偏好方向；</li>\n<li>RAG 质量控制：在事实性、完整性、引用质量之间做权衡；</li>\n<li>Agent 系统：在任务完成率、风险、成本和可解释性之间动态取舍。</li>\n</ul>\n<p>我个人更看好 <strong>多维 Reward Model + 推理时控制</strong> 的组合。原因很简单：它既能解释模型为什么这么回答，也更接近真实产品里“可调助手”的形态。</p>\n<p>如果只能押一条路线，你更看好多目标 DPO、推理时对齐，还是多维奖励模型？</p>\n<h2>参考链接</h2>\n<ul>\n<li>MODPO paper: <a href=\"https://link.zhihu.com/?target=https%3A//arxiv.org/abs/2310.03708\">Beyond One-Preference-Fits-All Alignment: Multi-Objective Direct Preference Optimization</a></li>\n<li>MODPO code: <a href=\"https://link.zhihu.com/?target=https%3A//github.com/ZHZisZZ/modpo\">https://github.com/ZHZisZZ/modpo</a></li>\n<li>Rewarded Soups paper: <a href=\"https://link.zhihu.com/?target=https%3A//arxiv.org/abs/2306.04488\">https://arxiv.org/abs/2306.04488</a></li>\n<li>Rewarded Soups code: <a href=\"https://link.zhihu.com/?target=https%3A//github.com/alexrame/rewardedsoups\">https://github.com/alexrame/rewardedsoups</a></li>\n<li>RiC paper: <a href=\"https://link.zhihu.com/?target=https%3A//arxiv.org/abs/2402.10207\">Rewards-in-Context: Multi-objective Alignment of Foundation Models with Dynamic Preference Adjustment</a></li>\n<li>RiC code: <a href=\"https://link.zhihu.com/?target=https%3A//github.com/YangRui2015/RiC\">https://github.com/YangRui2015/RiC</a></li>\n<li>DPA paper: <a href=\"https://link.zhihu.com/?target=https%3A//arxiv.org/abs/2402.18571\">Arithmetic Control of LLMs for Diverse User Preferences: Directional Preference Alignment with Multi-Objective Rewards</a></li>\n<li>DPA code: <a href=\"https://link.zhihu.com/?target=https%3A//github.com/RLHFlow/Directional-Preference-Alignment\">https://github.com/RLHFlow/Directional-Preference-Alignment</a></li>\n<li>ArmoRM paper: <a href=\"https://link.zhihu.com/?target=https%3A//arxiv.org/abs/2406.12845\">https://arxiv.org/abs/2406.12845</a></li>\n<li>RLHFlow Reward Modeling code: <a href=\"https://link.zhihu.com/?target=https%3A//github.com/RLHFlow/RLHF-Reward-Modeling\">https://github.com/RLHFlow/RLHF-Reward-Modeling</a></li>\n<li>ArmoRM model: <a href=\"https://link.zhihu.com/?target=https%3A//huggingface.co/RLHFlow/ArmoRM-Llama3-8B-v0.1\">https://huggingface.co/RLHFlow/ArmoRM-Llama3-8B-v0.1</a></li>\n<li>CPO paper: <a href=\"https://link.zhihu.com/?target=https%3A//arxiv.org/abs/2402.19085\">Controllable Preference Optimization: Toward Controllable Multi-Objective Alignment</a></li>\n<li>CPO code: <a href=\"https://link.zhihu.com/?target=https%3A//github.com/OpenBMB/CPO\">https://github.com/OpenBMB/CPO</a></li>\n<li>MetaAligner paper: <a href=\"https://link.zhihu.com/?target=https%3A//arxiv.org/abs/2403.17141\">MetaAligner: Towards Generalizable Multi-Objective Alignment of Language Models</a></li>\n<li>MetaAligner code: <a href=\"https://link.zhihu.com/?target=https%3A//github.com/SteveKGYang/MetaAligner\">https://github.com/SteveKGYang/MetaAligner</a></li>\n<li>MORE paper: <a href=\"https://link.zhihu.com/?target=https%3A//arxiv.org/abs/2312.07401\">On Diversified Preferences of Large Language Model Alignment</a></li>\n<li>MORE code: <a href=\"https://link.zhihu.com/?target=https%3A//github.com/dunzeng/MORE\">https://github.com/dunzeng/MORE</a></li>\n<li>SIPO paper: <a href=\"https://link.zhihu.com/?target=https%3A//arxiv.org/abs/2502.14354\">https://arxiv.org/abs/2502.14354</a></li>\n<li>SIPO ACL Anthology: <a href=\"https://link.zhihu.com/?target=https%3A//aclanthology.org/2025.findings-acl.574/\">https://aclanthology.org/2025.findings-acl.574/</a></li>\n<li>SIPO code: <a href=\"https://link.zhihu.com/?target=https%3A//github.com/zyttt-coder/SIPO\">https://github.com/zyttt-coder/SIPO</a></li>\n<li>PARM paper: <a href=\"https://link.zhihu.com/?target=https%3A//arxiv.org/abs/2505.06274\">PARM: Multi-Objective Test-Time Alignment via Preference-Aware Autoregressive Reward Model</a></li>\n<li>PARM code: <a href=\"https://link.zhihu.com/?target=https%3A//github.com/Baijiong-Lin/PARM\">https://github.com/Baijiong-Lin/PARM</a></li>\n<li>AMPO paper: <a href=\"https://link.zhihu.com/?target=https%3A//arxiv.org/abs/2502.18293\">AMPO: Active Multi-Preference Optimization for Self-play Preference Selection</a></li>\n<li>AMPO PMLR: <a href=\"https://link.zhihu.com/?target=https%3A//proceedings.mlr.press/v267/gupta25c.html\">AMPO: Active Multi Preference Optimization for Self-play Preference Selection</a></li>\n<li>AMPO datasets: <a href=\"https://link.zhihu.com/?target=https%3A//huggingface.co/Multi-preference-Optimization\">https://huggingface.co/Multi-preference-Optimization</a></li>\n</ul>"
    }
  ],
  "graph": {
    "nodes": [
      {
        "id": "rlhf",
        "x": 2017.0,
        "y": 0,
        "category": "foundational"
      },
      {
        "id": "instructgpt",
        "x": 2022.0,
        "y": 1,
        "category": "rl_based"
      },
      {
        "id": "constitutional_ai",
        "x": 2022.0,
        "y": 1,
        "category": "rl_based"
      },
      {
        "id": "rlaif",
        "x": 2023.0,
        "y": 1,
        "category": "rl_based"
      },
      {
        "id": "dpo",
        "x": 2023.0,
        "y": 2,
        "category": "direct_preference"
      },
      {
        "id": "ipo",
        "x": 2024.0,
        "y": 2,
        "category": "direct_preference"
      },
      {
        "id": "kto",
        "x": 2024.0,
        "y": 2,
        "category": "direct_preference"
      },
      {
        "id": "orpo",
        "x": 2024.0,
        "y": 2,
        "category": "direct_preference"
      },
      {
        "id": "simpo",
        "x": 2024.0,
        "y": 2,
        "category": "direct_preference"
      },
      {
        "id": "tdpo",
        "x": 2024.0,
        "y": 3,
        "category": "token_multimodal"
      },
      {
        "id": "spac",
        "x": 2024.0,
        "y": 2,
        "category": "direct_preference"
      },
      {
        "id": "grpo",
        "x": 2025.0,
        "y": 1,
        "category": "rl_based"
      },
      {
        "id": "rto",
        "x": 2025.0,
        "y": 3,
        "category": "token_multimodal"
      },
      {
        "id": "sepo",
        "x": 2025.0,
        "y": 3,
        "category": "token_multimodal"
      },
      {
        "id": "llmdoctor",
        "x": 2026.08,
        "y": 3,
        "category": "token_multimodal"
      },
      {
        "id": "triplay_rl",
        "x": 2026.08,
        "y": 1,
        "category": "rl_based"
      },
      {
        "id": "light_alignment",
        "x": 2026.17,
        "y": 1,
        "category": "rl_based"
      },
      {
        "id": "f_grpo",
        "x": 2026.17,
        "y": 1,
        "category": "rl_based"
      },
      {
        "id": "bees",
        "x": 2026.17,
        "y": 2,
        "category": "direct_preference"
      },
      {
        "id": "bidpo",
        "x": 2026.17,
        "y": 3,
        "category": "token_multimodal"
      },
      {
        "id": "tab_po",
        "x": 2026.25,
        "y": 3,
        "category": "token_multimodal"
      },
      {
        "id": "tlpo",
        "x": 2026.33,
        "y": 3,
        "category": "token_multimodal"
      },
      {
        "id": "mm_dpo",
        "x": 2026.0,
        "y": 3,
        "category": "token_multimodal"
      },
      {
        "id": "onpo",
        "x": 2026.0,
        "y": 2,
        "category": "direct_preference"
      }
    ],
    "edges": [
      {
        "from": "rlhf",
        "to": "instructgpt",
        "label": "工业化应用"
      },
      {
        "from": "rlhf",
        "to": "constitutional_ai",
        "label": "原则驱动"
      },
      {
        "from": "rlhf",
        "to": "dpo",
        "label": "去除RL"
      },
      {
        "from": "rlhf",
        "to": "grpo",
        "label": "组相对优化"
      },
      {
        "from": "constitutional_ai",
        "to": "rlaif",
        "label": "AI反馈"
      },
      {
        "from": "dpo",
        "to": "ipo",
        "label": "正则化改进"
      },
      {
        "from": "dpo",
        "to": "kto",
        "label": "二元反馈"
      },
      {
        "from": "dpo",
        "to": "orpo",
        "label": "去参考模型"
      },
      {
        "from": "dpo",
        "to": "simpo",
        "label": "长度归一化"
      },
      {
        "from": "dpo",
        "to": "tdpo",
        "label": "Token级扩展"
      },
      {
        "from": "dpo",
        "to": "spac",
        "label": "自博弈对抗"
      },
      {
        "from": "dpo",
        "to": "mm_dpo",
        "label": "多模态扩展"
      },
      {
        "from": "dpo",
        "to": "bees",
        "label": "数据选择"
      },
      {
        "from": "dpo",
        "to": "onpo",
        "label": "在线Nash"
      },
      {
        "from": "grpo",
        "to": "triplay_rl",
        "label": "多角色博弈"
      },
      {
        "from": "grpo",
        "to": "light_alignment",
        "label": "单神经元专家"
      },
      {
        "from": "grpo",
        "to": "f_grpo",
        "label": "散度泛化"
      },
      {
        "from": "tdpo",
        "to": "rto",
        "label": "MDP建模"
      },
      {
        "from": "tdpo",
        "to": "sepo",
        "label": "选择性优化"
      },
      {
        "from": "tdpo",
        "to": "llmdoctor",
        "label": "测试时对齐"
      },
      {
        "from": "tdpo",
        "to": "tlpo",
        "label": "语言混淆"
      },
      {
        "from": "tdpo",
        "to": "tab_po",
        "label": "自适应屏障"
      },
      {
        "from": "tdpo",
        "to": "bidpo",
        "label": "VLM扩展"
      }
    ],
    "milestones": [
      "rlhf",
      "dpo",
      "grpo"
    ]
  },
  "algos": [
    {
      "id": "rlhf",
      "num": 1,
      "name": "基于人类反馈的强化学习 (RLHF)",
      "fullName": "基于人类反馈的强化学习 (RLHF)",
      "year": "2017",
      "org": "",
      "parent": "—",
      "paperUrl": "https://arxiv.org/abs/1706.03741",
      "projectUrl": "",
      "category": "foundational",
      "motivation": "三阶段流程，PPO+奖励模型对齐",
      "summary": "Christiano 等人的《Deep Reinforcement Learning from Human Preferences》提出了“人类偏好比较 → 奖励模型 → 强化学习优化”的 RLHF 基本范式，用少量非专家偏好标注替代手写奖励函数来训练深度 RL agent。",
      "keyPoints": [
        "将目标指定从“环境给出标量 reward”改为“人类比较两个短轨迹片段哪个更好”。",
        "维护两个神经网络：策略 <span class=\"kb-math kb-math-inline\">\\pi</span> 与奖励函数估计 <span class=\"kb-math kb-math-inline\">\\hat r(o,a)</span>，前者优化行为，后者解释人类偏好。",
        "三个异步过程协同运行：策略采样轨迹、系统选择轨迹片段对并请求人类比较、奖励模型用累计比较数据做监督学习。",
        "奖励模型采用 Bradley-Terry/Luce-Shepard 风格的概率模型，用片段内预测奖励和的指数比例预测偏好概率。",
        "奖励模型训练使用交叉熵损失，并支持“偏好片段 1、偏好片段 2、两者相当、无法比较”等反馈形式。",
        "实际实现使用奖励模型 ensemble、bootstrap 采样、验证集正则化、dropout 和 10% 随机响应噪声来提升鲁棒性。",
        "查询选择使用 ensemble disagreement 主动学习，优先询问奖励模型成员分歧大的轨迹片段对。",
        "策略优化阶段把 <span class=\"kb-math kb-math-inline\">\\hat r</span> 当作环境 reward，Atari 使用 A2C，MuJoCo 使用 TRPO；LLM 时代的 InstructGPT 后续把这一环节替换为 PPO。",
        "论文在 Atari 与 MuJoCo 上展示少于 agent 环境交互 1% 的人类反馈即可训练复杂行为，部分新目标约一小时人工反馈即可完成。"
      ],
      "detail": "<p><img alt=\"Deep RL from Human Preferences 方法示意图\" src=\"https://ar5iv.labs.arxiv.org/html/1706.03741/assets/x1.png\" />\n<em>图：论文 Figure 1 的方法示意，reward predictor 从轨迹片段比较中异步学习，agent 则最大化当前预测奖励。</em></p>\n<pre><code class=\"language-python\"># Deep RL from Human Preferences: high-level training loop\ninitialize policy pi\ninitialize reward_model r_hat\ninitialize preference_database D = []\ninitialize trajectory_buffer B = []\n\nwhile training:\n    # Process 1: policy interacts with environment.\n    trajectories = rollout(policy=pi)\n    B.extend(trajectories)\n\n    # Process 2: ask humans to compare selected trajectory segments.\n    candidate_pairs = sample_segment_pairs(B, length=1_to_2_seconds)\n    query_pairs = select_by_ensemble_disagreement(candidate_pairs, r_hat)\n    for sigma_1, sigma_2 in query_pairs:\n        label = human_compare(sigma_1, sigma_2)  # prefer left, prefer right, tie, or skip\n        if label != &quot;incomparable&quot;:\n            D.append((sigma_1, sigma_2, label))\n\n    # Process 3: fit reward predictor to all collected preferences.\n    train_reward_model(r_hat, D, loss=&quot;pairwise_cross_entropy&quot;)\n    normalize_reward(r_hat)\n\n    # Policy optimization uses predicted reward as if it were the environment reward.\n    pi = rl_update(policy=pi, reward=lambda o, a: r_hat(o, a))\n</code></pre>\n<p>这篇论文解决的是奖励函数难以手写的问题，而不是一开始就面向大语言模型。传统深度 RL 假设环境每一步都返回 <span class=\"kb-math kb-math-inline\">r_t</span>，但现实任务常常只有人类能识别好坏，却很难把目标写成可微、可泛化、不可被 exploit 的奖励函数。论文的核心观察是：与其让人类实时给每一步打分，不如让人类比较两个 1 到 2 秒的行为片段；比较任务对非专家更自然，信息量也比单点状态评分更高。</p>\n<p>形式化地，轨迹片段写作 <span class=\"kb-math kb-math-inline\">\\sigma=((o_0,a_0),\\ldots,(o_{k-1},a_{k-1}))</span>。人类给出 <span class=\"kb-math kb-math-inline\">\\sigma^1\\succ\\sigma^2</span> 时，算法并不直接把它变成一个标量 reward，而是训练一个奖励预测器 <span class=\"kb-math kb-math-inline\">\\hat r</span>，让片段累计预测奖励解释偏好概率：</p>\n<div class=\"kb-math kb-math-display\">\\hat P[\\sigma^1 \\succ \\sigma^2] =\n\\frac{\\exp\\left(\\sum_t \\hat r(o_t^1,a_t^1)\\right)}\n{\\exp\\left(\\sum_t \\hat r(o_t^1,a_t^1)\\right)+\\exp\\left(\\sum_t \\hat r(o_t^2,a_t^2)\\right)}.</div>\n<p>这个模型可以理解为偏好学习里的 Bradley-Terry 模型：两个片段的“分数”是预测奖励之和，分数差越大，人类选择高分片段的概率越高。训练损失是对已收集比较数据库 <span class=\"kb-math kb-math-inline\">\\mathcal D</span> 的交叉熵：</p>\n<div class=\"kb-math kb-math-display\">\\mathrm{loss}(\\hat r)= -\\sum_{(\\sigma^1,\\sigma^2,\\mu)\\in\\mathcal D}\n\\mu(1)\\log \\hat P[\\sigma^1\\succ\\sigma^2]\n+\\mu(2)\\log \\hat P[\\sigma^2\\succ\\sigma^1].</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">\\mu</span> 是人类反馈转成的二项分布：若偏好左片段，<span class=\"kb-math kb-math-inline\">\\mu(1)=1</span>；若偏好右片段，<span class=\"kb-math kb-math-inline\">\\mu(2)=1</span>；若认为两者相当，则两边各 0.5；若无法比较则不写入数据库。这样做保留了“平局”这种有用信号，同时避免强迫人类在无意义比较中给出噪声标签。</p>\n<p>实际系统不是简单地训练单个奖励模型。论文使用 reward predictor ensemble，每个成员从偏好数据库 bootstrap 采样训练，并保留约 <span class=\"kb-math kb-math-inline\">1/e</span> 的数据作为验证集来调节正则化强度；部分任务还使用 dropout。它还假设人类有 10% 概率随机作答，因此不会让 softmax 在奖励差极大时过度自信。这些细节很重要，因为奖励模型一旦过拟合，策略优化会主动寻找 <span class=\"kb-math kb-math-inline\">\\hat r</span> 的漏洞，形成 reward hacking。</p>\n<p>查询策略也是算法的重要组成。系统不会随机把所有轨迹片段都交给人类，而是先从 agent 当前生成的轨迹中采样大量候选片段对，再用 ensemble 成员分别预测偏好，优先选择预测方差大的片段对询问人类。这是一种近似主动学习：人类时间被花在奖励模型最不确定、最可能改变决策边界的位置上。论文也承认该启发式并非总是最优，但它体现了 RLHF 的一个核心工程原则：人类反馈是昂贵资源，必须被主动分配。</p>\n<p>策略优化阶段与偏好建模阶段异步进行。agent 使用当前 <span class=\"kb-math kb-math-inline\">\\hat r(o,a)</span> 产生的 reward 继续学习；新行为带来新轨迹；新轨迹产生新比较；新比较更新奖励模型。论文在 Atari 上用 A2C，在 MuJoCo 上用 TRPO，并对 <span class=\"kb-math kb-math-inline\">\\hat r</span> 输出做零均值、固定方差归一化，因为偏好损失只决定 reward 的相对差异，无法确定绝对平移尺度。后续 LLM RLHF 继承了“奖励模型 + RL 优化”骨架，只是把环境交互变成 prompt-response bandit，把策略优化器通常换成 PPO 或 GRPO。</p>\n<div class=\"warn-box\">⚠️ 注意：任务元信息里提到“PPO+奖励模型对齐”，这是 LLM RLHF 里被广泛采用的后续形态；2017 年这篇 foundational paper 本身使用的是 A2C/TRPO，而不是 PPO。</div>",
      "quiz": {
        "q": "在 2017 年 Deep RL from Human Preferences 中，奖励模型如何从人类反馈中学习？",
        "options": [
          "直接把人类选择的片段赋值为 +1，未选择片段赋值为 -1，然后做普通回归",
          "用两个轨迹片段的累计预测奖励构造偏好概率，并对人类比较标签最小化交叉熵",
          "让人类为每个环境 step 打连续分数，再用这些分数训练 Q 函数",
          "只收集专家完整演示轨迹，然后做行为克隆"
        ],
        "answer": 1,
        "explain": "论文使用 Bradley-Terry 风格的 pairwise preference model，片段累计预测奖励决定偏好概率，并用交叉熵拟合人类比较。"
      }
    },
    {
      "id": "instructgpt",
      "num": 2,
      "name": "InstructGPT",
      "fullName": "InstructGPT",
      "year": "2022",
      "org": "",
      "parent": "rlhf",
      "paperUrl": "https://arxiv.org/abs/2203.02155",
      "projectUrl": "",
      "category": "rl_based",
      "motivation": "RLHF工业化，指令遵循能力突破",
      "summary": "InstructGPT 将 RLHF 工业化为“监督微调 SFT → 奖励模型 RM → PPO/PPO-ptx 强化学习”的三阶段流程，使 GPT-3 系列模型在真实 API 指令分布上显著更符合人类偏好、也更会遵循用户意图。",
      "keyPoints": [
        "目标从“预测互联网文本下一个 token”转为“按用户意图有帮助、诚实、无害地完成指令”。",
        "训练数据来自 OpenAI API Playground 提示和 labeler 自写提示，覆盖生成、开放问答、头脑风暴、聊天、改写、摘要、分类等任务。",
        "三阶段训练流程：收集示范并训练 SFT policy，收集多个模型输出的人类排序并训练 RM，用 RM 奖励通过 PPO 优化 SFT policy。",
        "SFT 数据约 13k prompts，RM 数据约 33k prompts，PPO 数据约 31k prompts，人工标注由约 40 名经过筛选和培训的 contractors 完成。",
        "RM 从 SFT 模型去掉 final unembedding layer 后初始化，对 prompt-response 输出标量奖励，用 pairwise ranking loss 学习 labeler 偏好。",
        "为提高标注效率，labeler 对每个 prompt 排序 <span class=\"kb-math kb-math-inline\">K=4</span> 到 <span class=\"kb-math kb-math-inline\">K=9</span> 个候选响应，一次排序产生 <span class=\"kb-math kb-math-inline\">{K\\choose2}</span> 个 pairwise comparisons。",
        "PPO 阶段把单个 prompt-response 视为 bandit episode，用 RM 分数作为终止奖励，并加入相对 SFT policy 的 per-token KL penalty。",
        "PPO-ptx 在 PPO 梯度中混入预训练分布的语言建模梯度，以减少 SQuAD、DROP、HellaSwag、翻译等公开 NLP 任务上的 alignment tax。",
        "论文报告 1.3B InstructGPT 在人工偏好上超过 175B GPT-3，且在 TruthfulQA、幻觉率、毒性控制等维度有改善。",
        "论文明确指出模型对齐的是 labelers 与研究者定义的偏好，并不等同于普遍“人类价值”。"
      ],
      "detail": "<p><img alt=\"InstructGPT 三阶段 RLHF 流程\" src=\"https://ar5iv.labs.arxiv.org/html/2203.02155/assets/x2.png\" />\n<em>图：论文 Figure 2 展示 InstructGPT 的三步方法：SFT、Reward Model training、PPO against reward model。蓝色箭头表示对应数据用于训练哪个模型。</em></p>\n<pre><code class=\"language-python\"># InstructGPT training pipeline\nbase_lm = GPT3_pretrained()\n\n# Step 1: supervised fine-tuning on demonstrations.\nD_sft = collect_labeler_demonstrations(api_prompts, labeler_prompts)\npi_sft = finetune(base_lm, D_sft, objective=&quot;next_token_likelihood&quot;)\n\n# Step 2: reward model from ranked model outputs.\nD_rm = []\nfor x in rm_prompts:\n    candidates = [sample(model, x) for model in policy_pool]  # K responses\n    ranking = labeler_rank(x, candidates)\n    D_rm.append((x, candidates, ranking))\nrm = train_reward_model(pi_sft_without_unembedding, D_rm, loss=&quot;pairwise_logistic&quot;)\nnormalize_reward_bias(rm, demonstrations_mean=0)\n\n# Step 3: PPO / PPO-ptx against the reward model.\npi_rl = copy(pi_sft)\nfor x in ppo_prompts:\n    y = sample(pi_rl, x)\n    terminal_reward = rm(x, y)\n    kl_penalty = beta * (logprob(pi_rl, y, x) - logprob(pi_sft, y, x))\n    ppo_reward = terminal_reward - kl_penalty\n    ppo_update(pi_rl, reward=ppo_reward)\n    if use_ptx:\n        add_pretraining_gradient(pi_rl, coefficient=gamma)\n</code></pre>\n<p>InstructGPT 的问题定义与普通预训练语言模型不同。GPT-3 的预训练目标是最大化互联网文本的似然，但用户真正希望模型“遵循指令、不要胡编、不要输出有害内容”。论文把这种错位称为 misalignment，并将 alignment 操作落到可训练流程上：先让人类写出理想回答，让模型学会指令格式；再让人类比较多个模型回答，让模型学会偏好排序；最后把偏好模型转成 reward，对语言模型做强化学习。</p>\n<p>第一阶段 SFT 是整个流程的稳定起点。labeler 针对真实 API prompt 或自写 prompt 给出期望回答，GPT-3 在这些 demonstration 上做 supervised fine-tuning。SFT 不需要奖励模型，也不涉及探索，主要作用是把 base LM 从“网页续写器”拉到“指令响应器”的分布附近。论文还观察到 SFT validation loss 可能较早过拟合，但继续训练仍能提升 RM score 和人工偏好，因此模型选择不只看语言建模损失。</p>\n<p>第二阶段训练 reward model。RM 输入 prompt <span class=\"kb-math kb-math-inline\">x</span> 和 completion <span class=\"kb-math kb-math-inline\">y</span>，输出标量 <span class=\"kb-math kb-math-inline\">r_\\theta(x,y)</span>。标注界面不是只比较两个输出，而是让 labeler 对 <span class=\"kb-math kb-math-inline\">K=4</span> 到 <span class=\"kb-math kb-math-inline\">K=9</span> 个候选响应排序；一个排序可展开为 <span class=\"kb-math kb-math-inline\">{K\\choose2}</span> 个胜负对。为了避免同一 completion 在一个 epoch 内被重复过多次导致过拟合，论文把同一 prompt 的所有 pairwise comparisons 作为一个 batch element 处理。RM 的 pairwise logistic loss 为：</p>\n<div class=\"kb-math kb-math-display\">\\mathrm{loss}(\\theta)=-\\frac{1}{{K\\choose2}}\\mathbb{E}_{(x,y_w,y_l)\\sim D}\\left[\\log\\sigma\\left(r_\\theta(x,y_w)-r_\\theta(x,y_l)\\right)\\right].</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">y_w</span> 是人类更偏好的 completion，<span class=\"kb-math kb-math-inline\">y_l</span> 是较差 completion。这个目标让 reward 差值表示“人类更偏好 <span class=\"kb-math kb-math-inline\">y_w</span> 的 log odds”。由于 pairwise loss 对 reward 整体平移不敏感，论文在进入 RL 前用 bias 归一化，使 labeler demonstrations 的平均 reward 为 0。</p>\n<p>第三阶段是 PPO 强化学习。论文把语言生成建成 bandit environment：环境给出 prompt，policy 生成完整 response，reward model 给出终止标量奖励，episode 结束。为了抑制 reward model over-optimization，训练还在每个 token 上加入相对 SFT policy 的 KL penalty。也就是说，模型不只是最大化 RM 分数，还要付出“偏离原 SFT 行为”的代价；这与后续 RLHF 系统中的 reference model KL 控制一脉相承。</p>\n<p>PPO-ptx 是 InstructGPT 论文非常关键的工程改动。普通 PPO 会让模型更符合 API prompt 上的 labeler 偏好，但可能损害公开 NLP benchmark 上的能力，即 alignment tax。为缓解这一点，论文把 PPO 目标与预训练分布上的语言建模目标相加：</p>\n<div class=\"kb-math kb-math-display\">\\mathrm{objective}(\\phi)=\n\\mathbb{E}_{(x,y)\\sim D_{\\pi^{\\mathrm{RL}}_\\phi}}\\left[\n r_\\theta(x,y)-\\beta\\log\\left(\\frac{\\pi^{\\mathrm{RL}}_\\phi(y|x)}{\\pi^{\\mathrm{SFT}}(y|x)}\\right)\n\\right]\n+\\gamma\\mathbb{E}_{x\\sim D_{\\mathrm{pretrain}}}\\left[\\log(\\pi^{\\mathrm{RL}}_\\phi(x))\\right].</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">\\beta</span> 控制 KL 惩罚强度，<span class=\"kb-math kb-math-inline\">\\gamma</span> 控制混入预训练梯度的强度；当 <span class=\"kb-math kb-math-inline\">\\gamma=0</span> 时就是普通 PPO。论文默认所说 InstructGPT 通常指 PPO-ptx 模型，因为它在保持偏好收益的同时减少了部分公开任务退化。</p>\n<p>从结果看，InstructGPT 的重要性不只是“用了 RLHF”，而是证明了 RLHF 可以在真实产品分布上规模化工作。1.3B PPO-ptx 模型在人工偏好中超过 175B GPT-3，说明对齐数据和训练目标的改变可以抵消甚至超过百倍参数规模差异。论文还报告了更好的显式约束遵循、更低闭域幻觉率、TruthfulQA 改善和在 respectful prompt 下毒性降低。不过它也强调局限：模型仍会犯简单错误，训练偏好来自特定 labeler 群体，并且“有帮助、诚实、无害”在冲突场景下如何权衡仍是开放问题。</p>\n<div class=\"key-point\">💡 关键：InstructGPT 的 RLHF 不是单一算法，而是一条数据生产线。SFT 决定初始行为分布，RM 决定优化方向，PPO/PPO-ptx 决定如何在奖励最大化与能力保持之间折中。</div>",
      "quiz": {
        "q": "InstructGPT 中 PPO-ptx 相比普通 PPO 的主要作用是什么？",
        "options": [
          "删除 reward model，直接对 labeler demonstration 做监督学习",
          "在 PPO 目标中混入预训练语言建模梯度，以减少 RLHF 对公开 NLP 能力的退化",
          "把 pairwise ranking loss 改成多分类交叉熵，从而提升 RM 标注效率",
          "取消相对 SFT policy 的 KL penalty，让模型尽可能最大化 RM 分数"
        ],
        "answer": 1,
        "explain": "PPO-ptx 在 PPO/RM 奖励目标之外加入 pretraining distribution 上的 log-likelihood 项，用 gamma 控制强度，以缓解 alignment tax。"
      }
    },
    {
      "id": "constitutional_ai",
      "num": 3,
      "name": "宪法AI (Constitutional AI)",
      "fullName": "宪法AI (Constitutional AI)",
      "year": "2022",
      "org": "",
      "parent": "rlhf",
      "paperUrl": "https://arxiv.org/abs/2212.08073",
      "projectUrl": "",
      "category": "rl_based",
      "motivation": "宪法原则驱动的自我修订机制",
      "summary": "Constitutional AI 提出用一组自然语言“宪法原则”驱动模型自我批评、自我修订和 AI 偏好评估，从而在几乎不使用有害性人工偏好标签的情况下训练更 harmless 且更少逃避的助手。它把 RLHF 中最昂贵、最不透明的有害性人工反馈替换成可审计的原则提示和 RLAIF 偏好模型。",
      "keyPoints": [
        "两阶段训练框架：监督学习阶段执行 critique-revision，自举出 SL-CAI；强化学习阶段用 AI 生成的偏好标签训练 PM，再用 RLAIF 得到 RL-CAI。",
        "核心监督信号从“人工逐条标注有害性偏好”改为“少量人写原则 + 模型按原则自评”，论文实验中用于 harmlessness 的宪法原则约 16 条。",
        "SL 阶段对红队提示先生成有害初答，再按随机抽取的宪法原则生成 critique 和 revision，最终用修订后的回答做监督微调。",
        "RL 阶段把两个候选回答和一条宪法原则组织成多选题，由模型选择更符合原则的回答，形成 AI preference dataset。",
        "Preference Model 同时吸收 human helpfulness labels 和 AI harmlessness labels，既保持有用性，又把有害性判断从人工标签迁移到 AI feedback。",
        "Chain-of-thought 可用于 critique 和偏好判断，使训练信号更可读；论文发现 CoT 能提升模型识别 helpful / honest / harmless 回答的能力。",
        "方法重点不是让模型简单拒答，而是减少 evasiveness：对不当请求仍解释拒绝理由，避免“无害但无用”的 canned refusal。"
      ],
      "detail": "<p><img alt=\"Constitutional AI 两阶段流程\" src=\"https://ar5iv.labs.arxiv.org/html/2212.08073/assets/x1.png\" />\n<em>图：CAI 的 Figure 1。上半部分是监督式自我批评与修订，下半部分是用 AI feedback 训练 preference model 后进行 RLAIF。</em></p>\n<p>CAI 的出发点是 RLHF 在 harmlessness 上的两类瓶颈：第一，人工红队和偏好标注成本高，并且标注者需要长期接触不适内容；第二，传统 HH-RLHF 容易把“拒绝一切敏感请求”当作安全策略，导致模型 harmless 但 evasive。论文的核心改造是把人类监督压缩为一组自然语言原则，也就是 constitution；之后让模型在训练管线中显式引用这些原则完成自我修订和偏好选择。这样监督目标不再隐含在成千上万条偏好标签里，而是变成可以被阅读、讨论和替换的文本规则。</p>\n<p>监督学习阶段可以理解为“把 helpful-only 模型拉到更安全的分布上”。给定红队提示 <span class=\"kb-math kb-math-inline\">x</span>，初始 helpful RLHF 模型先采样回答 <span class=\"kb-math kb-math-inline\">y_0</span>，这个回答可能包含有害内容；随后系统追加一条宪法原则 <span class=\"kb-math kb-math-inline\">c</span> 和 critique request，让同一个模型生成批评 <span class=\"kb-math kb-math-inline\">g</span>，再追加 revision request 生成修订回答 <span class=\"kb-math kb-math-inline\">y_1</span>。论文还允许重复执行多轮修订：<span class=\"kb-math kb-math-inline\">y_0 \\rightarrow y_1 \\rightarrow \\cdots \\rightarrow y_K</span>，每轮随机抽取不同原则，增加覆盖面。最终把 <span class=\"kb-math kb-math-inline\">(x, y_k)</span> 作为监督样本微调预训练模型，得到 SL-CAI。这个阶段的关键作用不是最终对齐，而是降低第二阶段 RL 的探索难度：如果初始策略仍频繁产生明显有害输出，RL 需要大量惩罚信号才能把策略推回安全区域；SL-CAI 先把输出分布变得“可优化”。</p>\n<pre><code class=\"language-python\"># Constitutional AI: supervised critique-revision stage\nfor prompt in red_team_prompts:\n    response = helpful_rlhf_model.sample(prompt, temperature=1.0)\n    revised = response\n    for step in range(num_revision_steps):\n        principle = random.choice(constitution_principles)\n        critique = helpful_rlhf_model.sample(\n            prompt + revised + critique_request(principle)\n        )\n        revised = helpful_rlhf_model.sample(\n            prompt + revised + critique + revision_request(principle)\n        )\n    supervised_dataset.add(prompt, revised)\n\nsl_cai_model = finetune(pretrained_lm, supervised_dataset + helpfulness_samples)\n</code></pre>\n<p>RL 阶段更接近标准 RLHF，但 harmlessness 标签来自 AI。SL-CAI 对同一个红队提示采样两个候选回答 <span class=\"kb-math kb-math-inline\">(y_a, y_b)</span>，系统把提示、两个候选和某条宪法原则组织成多选判断题，让反馈模型回答哪个候选更符合原则。若反馈模型对选项 A/B 的 log-probability 分别为 <span class=\"kb-math kb-math-inline\">\\ell_a, \\ell_b</span>，可以得到软偏好：</p>\n<div class=\"kb-math kb-math-display\">q_a = \\frac{\\exp(\\ell_a)}{\\exp(\\ell_a)+\\exp(\\ell_b)}, \\quad q_b = 1-q_a</div>\n<p>然后训练 preference model <span class=\"kb-math kb-math-inline\">r_\\phi(x,y)</span> 去拟合这些软标签。若 A 是第一个候选，软标签损失可写为：</p>\n<div class=\"kb-math kb-math-display\">\\mathcal{L}_{PM} = -q_a \\log \\sigma(r_\\phi(x,y_a)-r_\\phi(x,y_b)) - q_b \\log \\sigma(r_\\phi(x,y_b)-r_\\phi(x,y_a))</div>\n<p>这里的直觉是：宪法原则本身不直接变成一个可微 reward，而是先被模型解释为 pairwise preference，再被蒸馏到 PM。论文特别强调 PM 是 hybrid 的：helpfulness 仍使用已有人工 helpfulness 偏好，而 harmlessness 使用 AI preference。这样做避免模型只优化安全而牺牲有用性。</p>\n<pre><code class=\"language-python\"># Constitutional AI: RLAIF stage\nfor prompt in harmful_prompts:\n    y_a = sl_cai_model.sample(prompt)\n    y_b = sl_cai_model.sample(prompt)\n    principle = random.choice(constitution_principles)\n\n    # multiple-choice AI feedback, optionally with chain-of-thought\n    logp_a, logp_b = feedback_lm.score_choices(\n        make_constitutional_choice_prompt(prompt, y_a, y_b, principle)\n    )\n    q_a = softmax([logp_a, logp_b])[0]\n    ai_preference_dataset.add(prompt, y_a, y_b, q_a)\n\npm = train_preference_model(ai_harmlessness_labels + human_helpfulness_labels)\nrl_cai_model = reinforce_or_ppo(sl_cai_model, reward_model=pm, kl_reference=sl_cai_model)\n</code></pre>\n<p>最终的 RL 目标可以写成带 KL 约束的奖励最大化：</p>\n<div class=\"kb-math kb-math-display\">\\max_{\\pi_\\theta}\\; \\mathbb{E}_{x, y\\sim\\pi_\\theta}[r_\\phi(x,y)] - \\beta D_{KL}(\\pi_\\theta(\\cdot|x)\\;||\\;\\pi_{SL\\text{-}CAI}(\\cdot|x))</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">\\pi_{SL\\text{-}CAI}</span> 是参考策略，<span class=\"kb-math kb-math-inline\">\\beta</span> 控制策略偏离幅度。KL 项很重要，因为 preference model 只在某些策略生成分布上可靠；如果 RL 过度优化 PM，模型可能学会 PM 偏好的表面模式，例如过度说教、过度安全化或固定模板。论文也讨论了 Goodharting：过训练的 RL-CAI 可能对红队提示过分严厉，甚至在很多回答里插入 boilerplate 式安慰话。因此 CAI 不是“把原则写进 prompt 就完事”，而是把原则、软标签、PM、KL 约束和人工 helpfulness 数据一起组合成可控训练管线。</p>\n<p>与传统 RLHF 相比，CAI 最大的差别不在 RL 算法本身，而在偏好来源和可解释性。RLHF 的 harmlessness 目标主要来自人工比较，成本高且很难从标签集合中看出“模型到底被教成什么样”；CAI 则把目标暴露为文本原则，并让模型在 critique、revision 和 preference labeling 中显式使用这些原则。它并没有完全取消人类监督：原则仍由人写，helpfulness 仍可用人工标签，最终模型也要由人评估；但它显著减少了 harmlessness 标签依赖，并把监督从“海量隐式样本”转成“少量可审计规范 + AI 执行”。</p>\n<p>论文实验中的数据流也体现了这个设计。SL 阶段使用红队提示生成多轮修订样本，同时混入 helpfulness prompts 来维持有用性；RL 阶段对 SL-CAI 生成的候选回答打 AI 偏好标签，并将这些 harmlessness 标签与 human helpfulness labels 混合训练 PM。最终 RL-CAI 在 harmlessness-helpfulness Elo 图上相对标准 HH-RLHF 更少表现出“安全换有用”的折中，尤其 CoT 版本进一步改善了 AI 反馈质量。直觉上，CoT 让反馈模型不只是输出 A/B，而是先显式比较“哪个回答更符合原则”，这使得标签更接近可检查的推理过程。</p>\n<div class=\"key-point\">💡 关键：Constitutional AI 的“宪法”不是硬编码规则，也不是推理时的安全过滤器；它是训练数据生成和偏好标签生成时的监督接口。模型最终学到的是经由 SL 和 RLAIF 蒸馏后的行为分布。</div>",
      "quiz": {
        "q": "Constitutional AI 中 SL 阶段的主要作用是什么？",
        "options": [
          "先用自我批评和修订把模型输出分布拉向更安全区域，降低后续 RL 的探索难度",
          "完全替代 preference model，使 RL 阶段不再需要奖励信号",
          "把宪法原则硬编码进模型解码器，推理时逐条检查",
          "只增加拒答率，从而最大化 harmlessness"
        ],
        "answer": 0,
        "explain": "SL-CAI 通过 critique-revision 生成监督样本，使策略初始分布更少有害且不那么 evasive；RL 阶段仍需要 PM 和奖励优化。"
      }
    },
    {
      "id": "rlaif",
      "num": 4,
      "name": "基于AI反馈的强化学习 (RLAIF)",
      "fullName": "基于AI反馈的强化学习 (RLAIF)",
      "year": "2023",
      "org": "",
      "parent": "constitutional_ai",
      "paperUrl": "https://arxiv.org/abs/2309.00267",
      "projectUrl": "",
      "category": "rl_based",
      "motivation": "AI反馈替代人工偏好标注",
      "summary": "RLAIF 用现成 LLM 生成偏好标签来替代昂贵的人类偏好标注，并在 summarization、helpful dialogue、harmless dialogue 上验证其效果可接近 RLHF。论文还提出 direct-RLAIF，直接在 RL 过程中查询 LLM 作为奖励源，避免单独训练 reward model 及其 stale reward 问题。",
      "keyPoints": [
        "Canonical RLAIF：用 off-the-shelf LLM 给候选回答对打软偏好标签，再训练 reward model，最后用 RL 优化 policy。",
        "标签生成方式：提示 LLM 比较两个候选，抽取生成 “1” 和 “2” 的 log-probabilities，经 softmax 得到偏好分布。",
        "位置偏差修正：同一候选对做两次推理，第二次交换 A/B 顺序，再平均两个方向的偏好分布。",
        "CoT 偏好判断：先让 LLM 生成评价理由，再把理由拼回提示中提取偏好 token 概率，以提升与人类偏好的一致性。",
        "Direct-RLAIF：不训练 RM，而是在 RL 中让 LLM 对单个生成打 1-10 分，按分数 token 概率求期望并归一化为 reward。",
        "实验任务包括 Reddit TL;DR summarization、helpful dialogue generation、harmless dialogue generation，并与 RLHF 和 SFT baseline 对比。",
        "RL 训练使用适配语言模型的 REINFORCE with baseline，policy 和 value model 从 SFT checkpoint 初始化。"
      ],
      "detail": "<p><img alt=\"RLAIF 与 RLHF 对比流程\" src=\"https://arxiv.org/html/2309.00267v3/x3.png\" />\n<em>图：论文 Figure 2。RLAIF 与 RLHF 的训练骨架相同，关键区别是 preference labels 来自 AI labeler 而不是 human annotator。</em></p>\n<p>RLAIF 解决的是 RLHF 的标注扩展性问题。标准 RLHF 需要人类比较候选回答，训练 reward model，再用 RL 优化策略；这在高质量偏好标签昂贵、任务需要大量迭代、或标注内容有心理负担时会成为瓶颈。RLAIF 保留 RLHF 的“偏好建模 + 强化学习”结构，但把偏好标注者换成一个通用 LLM。论文的关键实验问题不是“AI 标签是否理论上可行”，而是直接比较 RLAIF 与 RLHF 在端到端人类评估中的差距：结果显示在 summarization 和 helpful dialogue 中 RLAIF 与 RLHF 对 SFT 的提升非常接近，在 harmless dialogue 中 RLAIF 的 harmless rate 还高于 RLHF。</p>\n<p>偏好标签生成是 RLAIF 的核心。给定上下文 <span class=\"kb-math kb-math-inline\">x</span> 和两个候选回答 <span class=\"kb-math kb-math-inline\">(y_1, y_2)</span>，系统构造一个评价 prompt，包含任务说明、可选 few-shot 示例、待评价样本，以及类似 “Preferred Response=” 的结尾。LLM 不一定要自由生成完整判断；论文选择读取下一个 token 为 “1” 和 “2” 的 log-probability：</p>\n<div class=\"kb-math kb-math-display\">p_{AI}(y_1 \\succ y_2 \\mid x) = \\frac{\\exp(\\ell_1)}{\\exp(\\ell_1)+\\exp(\\ell_2)}, \\quad\np_{AI}(y_2 \\succ y_1 \\mid x) = 1 - p_{AI}(y_1 \\succ y_2 \\mid x)</div>\n<p>这里 <span class=\"kb-math kb-math-inline\">\\ell_1</span> 和 <span class=\"kb-math kb-math-inline\">\\ell_2</span> 是 LLM 对选项 token 的 log-probability。相比硬标签，这种 soft label 保留了不确定性；相比解析自由文本，它实现简单且不容易因为输出格式漂移而失败。</p>\n<pre><code class=\"language-python\"># RLAIF preference labeling with an off-the-shelf LLM\nfor x, y1, y2 in candidate_pairs:\n    prompt = build_preference_prompt(x, y1, y2, ending=&quot;Preferred Response=&quot;)\n    logp_1 = llm.logprob(prompt, next_token=&quot;1&quot;)\n    logp_2 = llm.logprob(prompt, next_token=&quot;2&quot;)\n    pref_forward = softmax([logp_1, logp_2])\n\n    # position debiasing: swap the order and score again\n    prompt_swapped = build_preference_prompt(x, y2, y1, ending=&quot;Preferred Response=&quot;)\n    logp_1s = llm.logprob(prompt_swapped, next_token=&quot;1&quot;)\n    logp_2s = llm.logprob(prompt_swapped, next_token=&quot;2&quot;)\n    pref_swapped = softmax([logp_1s, logp_2s])\n\n    # convert swapped result back to original order and average\n    q_y1 = 0.5 * pref_forward[0] + 0.5 * pref_swapped[1]\n    preference_dataset.add(x, y1, y2, q_y1)\n</code></pre>\n<p>位置偏差是论文特别处理的细节。LLM 评价器可能偏好第一个或第二个展示的候选，而不是完全根据内容判断；这个偏差在较小 labeler 上更明显。RLAIF 的修正方法很直接：每个候选对推理两次，第二次交换候选顺序，然后把第二次结果映射回原始候选顺序再平均。如果原始顺序给出 <span class=\"kb-math kb-math-inline\">q</span>，交换顺序后第二个位置其实对应原来的 <span class=\"kb-math kb-math-inline\">y_1</span>，最终偏好就是 <span class=\"kb-math kb-math-inline\">\\frac{1}{2}(q + q&#x27;_{mapped})</span>。这不是完美去偏，但能显著降低“固定选项位置”导致的系统性错误。</p>\n<p>论文还研究了 CoT 对 AI labeler 的影响。普通偏好提示直接要求输出 1/2；CoT 版本先把结尾替换成要求解释的句子，让 LLM 生成 rationale，然后把原 prompt、rationale 和标准结尾拼接起来，再读取 “1”/“2” 的概率。其直觉是：复杂偏好判断往往需要比较 factuality、coverage、coherence、helpfulness 或 harmlessness；先生成理由能让 LLM 在打分前显式完成评价步骤。论文发现 CoT 通常提升与人类偏好的 alignment，尤其在 summarization 上更稳定。</p>\n<p>Canonical RLAIF 接着把 AI 软偏好蒸馏成 reward model。若 RM 对两个候选输出标量 <span class=\"kb-math kb-math-inline\">r_\\phi(x,y_1), r_\\phi(x,y_2)</span>，先用 softmax 得到 RM 的偏好分布：</p>\n<div class=\"kb-math kb-math-display\">\\hat{p}_\\phi(y_1 \\succ y_2|x)=\\frac{\\exp(r_\\phi(x,y_1))}{\\exp(r_\\phi(x,y_1))+\\exp(r_\\phi(x,y_2))}</div>\n<p>若 AI label 给出软标签 <span class=\"kb-math kb-math-inline\">q=[q_1,q_2]</span>，RM 用 cross-entropy 拟合：</p>\n<div class=\"kb-math kb-math-display\">\\mathcal{L}_{RM}=-q_1\\log \\hat{p}_\\phi(y_1 \\succ y_2|x)-q_2\\log \\hat{p}_\\phi(y_2 \\succ y_1|x)</div>\n<p>这个步骤本质上是 distillation：把大 LLM labeler 的偏好判断压缩到一个可高效查询的 RM 中。随后 RL 阶段与 RLHF 类似，用 RM 对 policy 生成的回答打分，并用带 baseline 的 REINFORCE 更新 policy。</p>\n<pre><code class=\"language-python\"># Canonical RLAIF training\nrm = train_reward_model(preference_dataset, loss=&quot;soft_label_cross_entropy&quot;)\npolicy = initialize_from_sft()\nvalue = initialize_from_sft()\n\nfor batch in prompts:\n    responses = policy.sample(batch)\n    rewards = rm.score(batch, responses)\n    advantages = rewards - value(batch, responses).detach()\n    policy_loss = -mean(advantages * policy.logprob(batch, responses))\n    value_loss = mse(value(batch, responses), rewards)\n    update(policy, value, policy_loss + value_loss)\n</code></pre>\n<p><img alt=\"Direct-RLAIF 流程\" src=\"https://arxiv.org/html/2309.00267v3/x5.png\" />\n<em>图：论文 Figure 4。d-RLAIF 在 RL 过程中直接让 LLM 打分，不再先训练静态 reward model。</em></p>\n<p>Direct-RLAIF 是论文更进一步的简化。Canonical RLAIF 的 RM 在训练前由初始策略样本构造的数据集训练得到；随着 policy 通过 RL 逐步改变，新的生成可能偏离 RM 训练分布，导致 reward staleness。d-RLAIF 直接在 RL loop 中调用 off-the-shelf LLM 给当前生成打分，省掉 AI preference labeling 和 RM training。具体做法是让 LLM 对单个生成在 1 到 10 之间打质量分，读取每个分数 token 的概率并计算期望：</p>\n<div class=\"kb-math kb-math-display\">s(y|x)=\\sum_{i=1}^{10} i\\,P(i|y,x)</div>\n<p>之后把分数归一化到 <span class=\"kb-math kb-math-inline\">[-1,1]</span>，作为 RL reward。它的优点是 reward 总是针对当前 policy 的生成计算，不需要担心 RM 只见过旧策略样本；缺点是每次 RL rollout 都要查询更大的 LLM labeler，计算成本和服务延迟更高。</p>\n<p>RLAIF 与 Constitutional AI 的关系也值得区分。Constitutional AI 首先引入“AI 根据宪法原则提供反馈”的思想，用于 harmlessness；RLAIF vs. RLHF 这篇论文则系统比较 AI feedback 与 human feedback，并把任务扩展到 summarization、helpful dialogue 和 harmless dialogue。它还证明了一个更强的自改进现象：即使 AI labeler 与 policy 同尺寸，甚至在某些设置下是同一个初始 checkpoint，RLAIF 仍能超过 SFT baseline。直觉上，生成回答和评价回答是不同能力切片；同一模型可能无法一次生成最佳回答，但在两个候选之间仍能识别更好的那个。</p>\n<div class=\"warn-box\">⚠️ 注意：RLAIF 不是“完全没有人类价值输入”。Prompt preamble、few-shot exemplars、任务定义、评估标准和最终 human evaluation 仍由人设计；它减少的是大规模逐样本偏好标注，而不是所有人类监督。</div>",
      "quiz": {
        "q": "Direct-RLAIF 相比 canonical RLAIF 主要解决什么问题？",
        "options": [
          "避免 reward model 随 policy 更新而 stale，并省去 RM 训练流程",
          "完全取消强化学习，只做监督微调",
          "把人类偏好标签扩展为多标签分类任务",
          "只通过交换候选顺序来修正位置偏差"
        ],
        "answer": 0,
        "explain": "d-RLAIF 在 RL 过程中直接调用 LLM 打分，因此不需要先训练静态 RM，也减少了策略分布变化导致的 RM 过时问题。"
      }
    },
    {
      "id": "dpo",
      "num": 5,
      "name": "直接偏好优化 (DPO)",
      "fullName": "直接偏好优化 (DPO)",
      "year": "2023",
      "org": "",
      "parent": "rlhf",
      "paperUrl": "https://arxiv.org/abs/2305.18290",
      "projectUrl": "",
      "category": "direct_preference",
      "motivation": "去除奖励模型，直接偏好分类优化",
      "summary": "DPO 将 RLHF 的“训练奖励模型 + 用 RL 优化策略”改写成一个直接作用在偏好样本上的二分类损失，从而不需要显式 reward model、在线采样或 PPO。它利用 KL 约束最优策略与奖励函数之间的闭式关系，让语言模型本身同时扮演 policy 和隐式 reward model。",
      "keyPoints": [
        "核心目标：在给定偏好数据 <span class=\"kb-math kb-math-inline\">(x,y_w,y_l)</span> 时，直接提高 chosen response 相对 rejected response 的 log-probability。",
        "理论起点与 RLHF 相同：最大化 reward，同时用 KL penalty 限制 policy 偏离 reference policy。",
        "关键变换：KL 约束最优解满足 <span class=\"kb-math kb-math-inline\">\\pi_r(y|x) \\propto \\pi_{ref}(y|x)\\exp(r(x,y)/\\beta)</span>，因此 reward 可由 policy/reference 的 log-ratio 表示。",
        "在 Bradley-Terry 偏好模型下，两个回答的 partition function 抵消，得到只依赖 <span class=\"kb-math kb-math-inline\">\\pi_\\theta</span> 和 <span class=\"kb-math kb-math-inline\">\\pi_{ref}</span> 的偏好概率。",
        "DPO 损失是 logistic binary cross-entropy，不需要训练独立 RM，也不需要在微调时从 policy rollout 后再跑 PPO。",
        "<span class=\"kb-math kb-math-inline\">\\beta</span> 控制偏离 reference 的强度：越大越保守，越小越允许 policy 为满足偏好而远离参考模型。",
        "实验覆盖 sentiment control、summarization、single-turn dialogue，论文报告 DPO 与 PPO-based RLHF 相当或更好，同时实现更简单。"
      ],
      "detail": "<p><img alt=\"DPO 避免显式强化学习流程\" src=\"https://arxiv.org/html/2305.18290v3/figures/diagrams/teaser.png\" />\n<em>图：论文 Figure 1。传统 RLHF 先拟合 reward model 再用 RL 优化；DPO 直接把偏好数据转成 policy 的分类损失。</em></p>\n<p>DPO 要解决的是 RLHF 工程复杂度和训练不稳定性。标准 RLHF 通常有三步：先 SFT 得到参考模型，再用偏好数据训练 reward model，最后用 PPO 或类似 RL 算法让 policy 最大化 reward，同时用 KL 约束防止偏离参考模型。这个流程有多个脆弱点：reward model 可能被过优化，PPO 需要在线采样和大量超参调试，语言生成又是离散动作空间，导致端到端训练成本高。DPO 的核心观察是：如果 RLHF 的目标本身包含 KL 约束，那么最优 policy 与 reward 之间存在闭式映射；既然偏好数据只关心 reward 差值，就可以把 reward model 消去，直接优化 policy。</p>\n<p>DPO 沿用 RLHF 的 KL-constrained reward maximization 目标。给定 prompt <span class=\"kb-math kb-math-inline\">x</span>、policy <span class=\"kb-math kb-math-inline\">\\pi_\\theta</span>、reference policy <span class=\"kb-math kb-math-inline\">\\pi_{ref}</span>、奖励 <span class=\"kb-math kb-math-inline\">r(x,y)</span>，传统目标可写为：</p>\n<div class=\"kb-math kb-math-display\">\\max_{\\pi_\\theta}\\; \\mathbb{E}_{x\\sim\\mathcal{D}, y\\sim\\pi_\\theta(y|x)}[r(x,y)] - \\beta D_{KL}(\\pi_\\theta(y|x)\\,||\\,\\pi_{ref}(y|x))</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">\\beta</span> 是 KL 温度。对任意固定 reward，这个目标的最优解为：</p>\n<div class=\"kb-math kb-math-display\">\\pi_r(y|x)=\\frac{1}{Z(x)}\\pi_{ref}(y|x)\\exp\\left(\\frac{1}{\\beta}r(x,y)\\right)</div>\n<p>等价地，reward 可以写成：</p>\n<div class=\"kb-math kb-math-display\">r(x,y)=\\beta\\log\\frac{\\pi_r(y|x)}{\\pi_{ref}(y|x)}+\\beta\\log Z(x)</div>\n<p>这一步是 DPO 的关键。<span class=\"kb-math kb-math-inline\">Z(x)</span> 是对所有可能回答求和的 partition function，直接估计很困难；但偏好模型只使用两个回答的 reward 差，因此同一个 prompt 下的 <span class=\"kb-math kb-math-inline\">\\beta\\log Z(x)</span> 会抵消。</p>\n<pre><code class=\"language-python\"># DPO training loop on static preference pairs\nreference = freeze(sft_model)\npolicy = initialize_from(sft_model)\n\nfor x, y_w, y_l in preference_loader:\n    logp_w = policy.logprob(x, y_w)\n    logp_l = policy.logprob(x, y_l)\n    ref_logp_w = reference.logprob(x, y_w)\n    ref_logp_l = reference.logprob(x, y_l)\n\n    chosen_adv = logp_w - ref_logp_w\n    rejected_adv = logp_l - ref_logp_l\n    logits = beta * (chosen_adv - rejected_adv)\n    loss = -log_sigmoid(logits)\n    update(policy, loss)\n</code></pre>\n<p>在 Bradley-Terry 偏好模型中，人类偏好概率由 reward 差决定：</p>\n<div class=\"kb-math kb-math-display\">p^*(y_w \\succ y_l|x)=\\sigma(r^*(x,y_w)-r^*(x,y_l))</div>\n<p>把上面的 reward-policy 关系代入并消去 <span class=\"kb-math kb-math-inline\">Z(x)</span>，得到 DPO 对偏好样本的概率模型：</p>\n<div class=\"kb-math kb-math-display\">p_\\theta(y_w \\succ y_l|x)=\\sigma\\left(\\beta\\log\\frac{\\pi_\\theta(y_w|x)}{\\pi_{ref}(y_w|x)}-\\beta\\log\\frac{\\pi_\\theta(y_l|x)}{\\pi_{ref}(y_l|x)}\\right)</div>\n<p>于是 DPO 损失就是负对数似然：</p>\n<div class=\"kb-math kb-math-display\">\\mathcal{L}_{DPO}(\\pi_\\theta;\\pi_{ref}) = -\\mathbb{E}_{(x,y_w,y_l)\\sim\\mathcal{D}}\\left[\\log\\sigma\\left(\\beta\\log\\frac{\\pi_\\theta(y_w|x)}{\\pi_{ref}(y_w|x)}-\\beta\\log\\frac{\\pi_\\theta(y_l|x)}{\\pi_{ref}(y_l|x)}\\right)\\right]</div>\n<p>这个式子有两个直觉层次。第一，<span class=\"kb-math kb-math-inline\">\\log \\pi_\\theta(y_w|x)-\\log \\pi_\\theta(y_l|x)</span> 鼓励模型更偏向 chosen 而不是 rejected。第二，减去 reference 的 log-ratio 后，DPO 鼓励的是“相对参考模型更偏好 chosen”，而不是无约束地把 chosen 概率推到极高、把 rejected 概率推到极低。这相当于把 KL 约束内化到了分类 logits 里，避免 naive unlikelihood 那种容易导致语言质量崩坏的目标。</p>\n<p>DPO 与 reward modeling 的关系也很重要。DPO 并不是说 reward 不存在，而是使用了一个隐式 reward：</p>\n<div class=\"kb-math kb-math-display\">r_\\theta(x,y)=\\beta\\log\\frac{\\pi_\\theta(y|x)}{\\pi_{ref}(y|x)} + C(x)</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">C(x)</span> 是任意只依赖 prompt 的常数。Bradley-Terry 只看同一 prompt 下两个回答的 reward 差，所以 <span class=\"kb-math kb-math-inline\">C(x)</span> 不影响偏好概率。这解释了论文副标题 “Your Language Model is Secretly a Reward Model”：当前 policy 相对 reference 增加某个回答概率的幅度，本身就可以被解释为该回答的隐式奖励。</p>\n<p>与 PPO-based RLHF 相比，DPO 的训练数据流更短。PPO 需要先训练 RM，然后循环采样 response、计算 reward、估计 advantage、更新 policy 和 value model，还要调 KL penalty、reward normalization、rollout batch 等参数；DPO 只需要静态偏好数据和 frozen reference model，像普通监督学习一样跑 binary cross-entropy。这降低了实现门槛，也减少了 reward hacking 的一部分来源：没有独立 RM 就没有“policy 钻 RM 漏洞”的同样形式。不过 DPO 仍然可能过拟合偏好数据或学到数据中的偏差，因此 reference model、<span class=\"kb-math kb-math-inline\">\\beta</span>、数据质量和 chosen/rejected 的覆盖范围仍然关键。</p>\n<p>DPO 的 <span class=\"kb-math kb-math-inline\">\\beta</span> 可以理解为“偏好优化力度”。当 <span class=\"kb-math kb-math-inline\">\\beta</span> 较大时，同样的 log-ratio 差异会产生更尖锐的偏好概率，训练会更强烈地区分 chosen/rejected；但从 KL 目标角度看，<span class=\"kb-math kb-math-inline\">\\beta</span> 也对应偏离 reference 的惩罚尺度。实践中它控制了模型在遵循偏好与保持原模型语言分布之间的折中。过小可能让更新太弱，过大可能让模型过度追随偏好对中的局部模式。</p>\n<div class=\"key-point\">💡 关键：DPO 的“直接”不是直接最大化 chosen 的似然，而是直接最大化一个从 RLHF KL 目标推导出的偏好概率；reference log-probability 是防止它退化成普通偏好分类的重要项。</div>",
      "quiz": {
        "q": "DPO 为什么可以不训练显式 reward model？",
        "options": [
          "因为 KL 约束 RLHF 目标给出了 reward 与最优 policy 的闭式关系，偏好差值中 partition function 会抵消",
          "因为 DPO 假设所有 chosen responses 都来自同一个人工专家",
          "因为 DPO 只做 SFT，不使用 rejected responses",
          "因为 Bradley-Terry 模型不需要任何奖励概念"
        ],
        "answer": 0,
        "explain": "DPO 将 reward 写成 policy/reference log-ratio；在同一 prompt 的两个回答比较中 Z(x) 抵消，因此可直接用 policy 参数化偏好概率。"
      }
    },
    {
      "id": "ipo",
      "num": 6,
      "name": "身份偏好优化 (IPO)",
      "fullName": "身份偏好优化 (IPO)",
      "year": "2024",
      "org": "",
      "parent": "dpo",
      "paperUrl": "https://arxiv.org/abs/2310.12036",
      "projectUrl": "",
      "category": "direct_preference",
      "motivation": "MSE正则化解决DPO过拟合",
      "summary": "IPO 将偏好学习从 DPO 的 logistic 分类目标改写为带固定目标间隔的均方误差回归，解决了 DPO 在确定性或近确定性偏好样本上让 KL 正则失效、过度远离参考模型的问题。",
      "keyPoints": [
        "提出统一的 <span class=\"kb-math kb-math-inline\">\\Psi</span>-Preference Optimisation（<span class=\"kb-math kb-math-inline\">\\Psi</span>PO）框架，把 RLHF、DPO 与 IPO 都表示为“偏好函数收益 + KL 正则”的离线策略优化问题。",
        "指出 DPO 对应 <span class=\"kb-math kb-math-inline\">\\Psi(q)=\\log(q/(1-q))</span>，当经验偏好 <span class=\"kb-math kb-math-inline\">q</span> 接近 0 或 1 时目标无界，容易忽略 KL 正则并过拟合偏好数据。",
        "IPO 选择恒等映射 <span class=\"kb-math kb-math-inline\">\\Psi(q)=q</span>，直接优化总偏好概率 <span class=\"kb-math kb-math-inline\">p^*_\\rho(\\pi \\succ \\mu)</span>，保持偏好收益有界。",
        "核心损失是 MSE：把新旧策略的 winner/loser 对数似然比差回归到 <span class=\"kb-math kb-math-inline\">\\frac{1}{2\\tau}</span>，而不是像 DPO 那样持续放大偏好 margin。",
        "训练不需要显式奖励模型，也不需要 PPO 采样；只需要偏好三元组 <span class=\"kb-math kb-math-inline\">(x,y_w,y_l)</span> 和冻结参考策略 <span class=\"kb-math kb-math-inline\">\\pi_\\text{ref}</span>。",
        "理论上给出 root-finding 形式和唯一最优性证明，说明 IPO 的经验损失仍会把解拉向带 KL 约束的最优策略。"
      ],
      "detail": "<p><img alt=\"IPO 与 DPO 在确定性偏好下的行为对比\" src=\"https://ar5iv.labs.arxiv.org/html/2310.12036/assets/x1.png\" />\n<em>图：论文中的确定性偏好实验。DPO 在偏好样本完全偏向某个动作时倾向于收敛到贪心策略；IPO 会随 <span class=\"kb-math kb-math-inline\">\\tau</span> 保留对参考策略的正则约束。</em></p>\n<p>IPO 的出发点不是“再设计一个 DPO 变体”，而是先把偏好优化抽象成一个统一目标。给定行为策略 <span class=\"kb-math kb-math-inline\">\\mu</span>、参考策略 <span class=\"kb-math kb-math-inline\">\\pi_\\text{ref}</span>、真实 pairwise preference <span class=\"kb-math kb-math-inline\">p^*(y \\succ y&#x27;|x)</span>，论文定义：</p>\n<div class=\"kb-math kb-math-display\">\\max_\\pi\\;\\mathbb{E}_{x\\sim\\rho,\\,y\\sim\\pi(\\cdot|x),\\,y&#x27;\\sim\\mu(\\cdot|x)}\n\\left[\\Psi\\left(p^*(y \\succ y&#x27;|x)\\right)\\right]\n-\\tau D_\\text{KL}(\\pi\\|\\pi_\\text{ref}).</div>\n<p>当 <span class=\"kb-math kb-math-inline\">\\Psi(q)=\\log\\frac{q}{1-q}</span> 且 Bradley-Terry 假设成立时，这个目标与 RLHF/DPO 的最优策略一致。问题在于 <span class=\"kb-math kb-math-inline\">\\log\\frac{q}{1-q}</span> 是无界函数：如果经验数据里某个 winner 总是胜过 loser，<span class=\"kb-math kb-math-inline\">\\hat q=1</span>，那么 logit 偏好趋向无穷大，任何有限的 KL 系数 <span class=\"kb-math kb-math-inline\">\\tau</span> 都难以阻止策略把 loser 概率压到 0。这解释了论文所谓的 DPO overfitting：DPO 不是没有正则项，而是偏好项在确定性样本上会变得过强。</p>\n<p>IPO 的关键替换是设 <span class=\"kb-math kb-math-inline\">\\Psi(q)=q</span>，也就是直接优化“一个策略输出相对行为策略输出被偏好的概率”：</p>\n<div class=\"kb-math kb-math-display\">\\max_\\pi\\;p^*_\\rho(\\pi \\succ \\mu)-\\tau D_\\text{KL}(\\pi\\|\\pi_\\text{ref}).</div>\n<p>由于偏好概率天然落在 <span class=\"kb-math kb-math-inline\">[0,1]</span>，偏好收益不会像 logit preference 那样爆炸。论文进一步把这个目标推导成 root-finding 问题。定义</p>\n<div class=\"kb-math kb-math-display\">h_\\pi(y,y&#x27;,x)=\\log\\frac{\\pi(y|x)\\pi_\\text{ref}(y&#x27;|x)}{\\pi(y&#x27;|x)\\pi_\\text{ref}(y|x)},</div>\n<p>它度量的是“当前策略相对参考策略，把 <span class=\"kb-math kb-math-inline\">y</span> 放到 <span class=\"kb-math kb-math-inline\">y&#x27;</span> 前面的 log-ratio 变化”。若最优策略为 <span class=\"kb-math kb-math-inline\">\\pi^*</span>，则该 log-ratio 应等于偏好收益差除以正则强度。IPO 用平方误差去拟合这个条件。</p>\n<p>论文先给出 population loss：</p>\n<div class=\"kb-math kb-math-display\">L(\\pi)=\\mathbb{E}_{y,y&#x27;\\sim\\mu}\\left[\\left(h_\\pi(y,y&#x27;)-\n\\frac{p^*(y\\succ\\mu)-p^*(y&#x27;\\succ\\mu)}{\\tau}\\right)^2\\right].</div>\n<p>实际训练时我们拿到的是偏好样本 <span class=\"kb-math kb-math-inline\">(x,y_w,y_l)</span>，而不是完整的 <span class=\"kb-math kb-math-inline\">p^*</span>。利用 <span class=\"kb-math kb-math-inline\">(y_w,y_l,I=1)</span> 与反向样本 <span class=\"kb-math kb-math-inline\">(y_l,y_w,I=0)</span> 的对称性，论文把经验损失化简为：</p>\n<div class=\"kb-math kb-math-display\">\\mathcal{L}_\\text{IPO}\n=\\mathbb{E}_{(x,y_w,y_l)\\sim\\mathcal{D}}\n\\left[\\left(h_\\pi(y_w,y_l,x)-\\frac{\\tau^{-1}}{2}\\right)^2\\right].</div>\n<p>这条公式体现了 IPO 与 DPO 的本质差异。DPO 的 <span class=\"kb-math kb-math-inline\">-\\log\\sigma(\\cdot)</span> 会在 winner margin 不够大时继续推动 margin 增大；IPO 则只要求 margin 接近固定目标 <span class=\"kb-math kb-math-inline\">\\frac{1}{2\\tau}</span>。当 margin 已经足够时，继续增大反而会产生 MSE 惩罚，因此 IPO 自带“不要离参考模型太远”的机制。</p>\n<pre><code class=\"language-python\"># IPO sampled loss, simplified from Algorithm 1 in the paper\nfor batch in preference_loader:\n    x, y_w, y_l = batch.prompt, batch.chosen, batch.rejected\n\n    # sequence log-probabilities under trainable policy\n    logp_w = policy.logprob(x, y_w)\n    logp_l = policy.logprob(x, y_l)\n\n    # frozen reference model log-probabilities\n    with no_grad():\n        ref_logp_w = ref_policy.logprob(x, y_w)\n        ref_logp_l = ref_policy.logprob(x, y_l)\n\n    h = (logp_w - logp_l) - (ref_logp_w - ref_logp_l)\n    target_margin = 1.0 / (2.0 * tau)\n    loss = mean((h - target_margin) ** 2)\n\n    loss.backward()\n    optimizer.step()\n</code></pre>\n<p>从训练流程看，IPO 与 DPO 一样可以直接作用在离线偏好数据上：先用 SFT 或其他方式得到 <span class=\"kb-math kb-math-inline\">\\pi_\\text{ref}</span>，冻结它；然后对当前策略 <span class=\"kb-math kb-math-inline\">\\pi_\\theta</span> 计算 winner 和 loser 的序列级 log probability；最后最小化上面的平方误差。它不需要奖励模型，也不需要像 PPO 那样从当前策略 rollout 新样本，因此工程复杂度接近 DPO。</p>\n<div class=\"key-point\">💡 关键：IPO 的“正则化”不只是外部 KL 项，而是被折进了目标 margin 本身。<span class=\"kb-math kb-math-inline\">\\tau</span> 越大，<span class=\"kb-math kb-math-inline\">\\frac{1}{2\\tau}</span> 越小，策略相对参考模型的 winner/loser log-ratio 变化就越受限制。</div>\n<p>这也解释了论文中 deterministic preference 的实验现象。如果数据只告诉模型“<span class=\"kb-math kb-math-inline\">y_a</span> 总是优于 <span class=\"kb-math kb-math-inline\">y_b</span>”，DPO 会不断强化 <span class=\"kb-math kb-math-inline\">y_a</span> 相对 <span class=\"kb-math kb-math-inline\">y_b</span> 的概率比；IPO 则只把该比值推到与 <span class=\"kb-math kb-math-inline\">\\tau</span> 匹配的有限间隔。对于 LLM 对齐，这一点很重要，因为偏好数据常常是稀疏的、单次标注的、带采样偏差的；把一次胜负当成无限强的偏好证据，会使模型牺牲多样性和参考模型中已有的语言能力。</p>\n<p>与传统 RLHF 相比，IPO 避免了 reward model 的外推问题：不需要先拟合 <span class=\"kb-math kb-math-inline\">r(x,y)</span>，再假设该奖励能泛化到当前策略新采样的分布。与 DPO 相比，IPO 保留了“直接从偏好更新策略”的便利，但用有界 identity preference 和 MSE margin 避免了 DPO 的无界 logit 偏好。代价是 IPO 的目标更像“回归到一个固定偏好间隔”，当任务确实需要非常强的偏好压制时，<span class=\"kb-math kb-math-inline\">\\tau</span> 的选择会直接决定对齐强度。</p>",
      "quiz": {
        "q": "IPO 为什么能缓解 DPO 在确定性偏好样本上的过拟合？",
        "options": [
          "它用 PPO rollout 生成更多负样本",
          "它把 winner/loser 的相对 log-ratio 回归到有限目标，而不是无限放大偏好 margin",
          "它删除了参考模型，避免 KL 计算误差",
          "它只训练 reward model，不直接更新策略"
        ],
        "answer": 1,
        "explain": "IPO 的 sampled loss 是 MSE，目标间隔为 1/(2τ)。当 margin 超过目标时继续增大会被惩罚，因此不会像 DPO 的 logit preference 那样在 q=1 时趋向无界。"
      }
    },
    {
      "id": "kto",
      "num": 7,
      "name": "Kahneman-Tversky优化 (KTO)",
      "fullName": "Kahneman-Tversky优化 (KTO)",
      "year": "2024",
      "org": "",
      "parent": "dpo",
      "paperUrl": "https://arxiv.org/abs/2402.01306",
      "projectUrl": "",
      "category": "direct_preference",
      "motivation": "前景理论，仅需二元好坏反馈",
      "summary": "KTO 把 LLM 对齐目标解释为前景理论下的人类效用最大化，用“好/坏”二元反馈替代成对偏好数据，在不构造 preference pair 的情况下达到接近或超过 DPO 的对齐效果。",
      "keyPoints": [
        "提出 Human-Aware Losses（HALOs）视角，说明 DPO、PPO-Clip 等有效对齐损失隐式包含类似人类决策的参考点、收益递减和损失敏感性。",
        "KTO 不最大化 preference likelihood，而是直接最大化单个生成样本的 Kahneman-Tversky 式主观效用。",
        "训练数据只需要 <span class=\"kb-math kb-math-inline\">(x,y,\\text{desirable/undesirable})</span> 标签，不要求同一个 prompt 下的 winner/loser 成对比较。",
        "使用隐式奖励 <span class=\"kb-math kb-math-inline\">r_\\theta(x,y)=\\log\\frac{\\pi_\\theta(y|x)}{\\pi_\\text{ref}(y|x)}</span>，并以 KL 参考点 <span class=\"kb-math kb-math-inline\">z_0</span> 判断该输出是相对收益还是相对损失。",
        "对 desirable 与 undesirable 样本分别设置 <span class=\"kb-math kb-math-inline\">\\lambda_D,\\lambda_U</span>，可处理正负反馈比例严重不均衡的数据。",
        "实践中对 <span class=\"kb-math kb-math-inline\">z_0</span> 停止梯度，并用 batch 内错配输出估计 KL 参考点，以提高训练稳定性。"
      ],
      "detail": "<p><img alt=\"KTO 只需要二元好坏反馈\" src=\"https://ar5iv.labs.arxiv.org/html/2402.01306/assets/figures/teaser.png\" />\n<em>图：传统 RLHF/DPO 依赖成对偏好；KTO 只需要判断单个输出对输入是否 desirable，因此能利用更便宜、更丰富的二元反馈。</em></p>\n<p>KTO 的核心问题是：LLM 对齐是否一定需要 <span class=\"kb-math kb-math-inline\">(y_w,y_l)</span> 这种 pairwise preference？论文认为不一定。DPO 的成功并不只来自 pair 数据本身，还来自损失函数带有合适的 inductive bias。作者把这类损失称为 HALO：它们不是简单地最大化 token likelihood，而是围绕“相对某个参考点的收益/损失”塑造效用，这与 Kahneman 和 Tversky 的前景理论相似。</p>\n<p>前景理论中的 value function 通常写作：</p>\n<div class=\"kb-math kb-math-display\">v(z;\\lambda,\\alpha,z_0)=\n\\begin{cases}\n(z-z_0)^\\alpha, &amp; z\\ge z_0 \\\\\n-\\lambda(z_0-z)^\\alpha, &amp; z&lt;z_0\n\\end{cases}</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">z_0</span> 是参考点，<span class=\"kb-math kb-math-inline\">\\alpha</span> 控制曲率，<span class=\"kb-math kb-math-inline\">\\lambda</span> 控制损失厌恶。KTO 将这个思想迁移到 LLM：输出 <span class=\"kb-math kb-math-inline\">y</span> 的“收益”不是金钱，而是当前模型相对参考模型对该输出增加了多少 log probability。也就是隐式奖励：</p>\n<div class=\"kb-math kb-math-display\">r_\\theta(x,y)=\\log\\frac{\\pi_\\theta(y|x)}{\\pi_\\text{ref}(y|x)}.</div>\n<p>为了避免原始幂函数数值不稳定，KTO 用 sigmoid 作为效用函数的平滑替代，并引入 <span class=\"kb-math kb-math-inline\">\\beta</span> 控制饱和速度。默认损失为：</p>\n<div class=\"kb-math kb-math-display\">L_\\text{KTO}(\\pi_\\theta,\\pi_\\text{ref})=\n\\mathbb{E}_{x,y\\sim D}\\left[\\lambda_y-v(x,y)\\right],</div>\n<p>其中</p>\n<div class=\"kb-math kb-math-display\">\\begin{aligned}\nr_\\theta(x,y)&amp;=\\log\\frac{\\pi_\\theta(y|x)}{\\pi_\\text{ref}(y|x)},\\\\\nz_0&amp;=D_\\text{KL}(\\pi_\\theta(\\cdot|x)\\|\\pi_\\text{ref}(\\cdot|x)),\\\\\nv(x,y)&amp;=\n\\begin{cases}\n\\lambda_D\\sigma\\left(\\beta(r_\\theta(x,y)-z_0)\\right), &amp; y\\sim y_\\text{desirable}|x,\\\\\n\\lambda_U\\sigma\\left(\\beta(z_0-r_\\theta(x,y))\\right), &amp; y\\sim y_\\text{undesirable}|x.\n\\end{cases}\n\\end{aligned}</div>\n<p>这组公式的直觉很直接：如果一个输出被标记为 desirable，模型应该提高它相对参考模型的隐式奖励，并且这个提升要超过参考点 <span class=\"kb-math kb-math-inline\">z_0</span>；如果输出是 undesirable，模型应该让它的隐式奖励低于参考点。<span class=\"kb-math kb-math-inline\">z_0</span> 的作用类似“人类最近看过的平均质量基准”：不是所有概率提升都值得奖励，只有超过基准的提升才是收益。</p>\n<pre><code class=\"language-python\"># KTO training loop, simplified from the paper's implementation notes\nfor batch in binary_feedback_loader:\n    x, y, label = batch.prompt, batch.output, batch.is_desirable\n\n    logp = policy.logprob(x, y)\n    with no_grad():\n        ref_logp = ref_policy.logprob(x, y)\n\n    reward = logp - ref_logp\n\n    # Biased but stable KL/reference-point estimate using mismatched outputs.\n    y_shift = shift_outputs_within_microbatch(y)\n    kl_hat = mean(policy.logprob(x, y_shift) - ref_policy.logprob(x, y_shift))\n    z0 = stop_gradient(max(0.0, kl_hat))\n\n    value_good = lambda_D * sigmoid(beta * (reward - z0))\n    value_bad = lambda_U * sigmoid(beta * (z0 - reward))\n\n    loss = where(label == &quot;desirable&quot;,\n                 lambda_D - value_good,\n                 lambda_U - value_bad)\n    loss = mean(loss)\n\n    loss.backward()\n    optimizer.step()\n</code></pre>\n<p>KTO 的训练流程与 DPO 最大的不同是数据组织。DPO 必须看到同一个 prompt 下的 <span class=\"kb-math kb-math-inline\">y_w</span> 和 <span class=\"kb-math kb-math-inline\">y_l</span>，因为它优化的是二者的相对偏好概率；KTO 只需要知道一个输出是好还是坏。因此，一份偏好数据可以拆成两条 KTO 样本，真实生产系统中的 thumbs-up/thumbs-down、审核通过/拒绝、用户采纳/丢弃等二元信号也可以直接使用。</p>\n<div class=\"key-point\">💡 关键：KTO 并不是把 binary label 当作 +1/-1 reward 直接做分类，而是把 label 放进“相对参考点的效用函数”里。KL 参考点让模型不能用整体抬高所有输出概率的方式投机，必须学到哪些模式真正对应 desirable。</div>\n<p>论文还强调 <span class=\"kb-math kb-math-inline\">\\lambda_D</span> 与 <span class=\"kb-math kb-math-inline\">\\lambda_U</span> 的工程价值。如果正样本远少于负样本，可以提高 desirable 一侧的权重，或者反过来降低 undesirable 一侧的权重，使两类反馈在期望梯度上保持平衡。这就是 KTO 能处理极端数据不均衡的原因之一：它不要求每个好样本都有一个对应坏样本，只要求整体上用权重校准正负反馈的贡献。</p>\n<p>与 IPO/DPO 相比，KTO 的参考模型仍然存在，但它服务于隐式奖励和 KL 参考点，而不是 pairwise log-ratio。与 RLHF 相比，KTO 不训练单独的 reward model，也不需要在线 rollout；与 DPO 相比，KTO 放弃 Bradley-Terry preference likelihood，改为优化人类效用形状。这样做的代价是需要选择 <span class=\"kb-math kb-math-inline\">\\beta,\\lambda_D,\\lambda_U</span> 以及 KL 估计方式；但收益是可以使用更便宜、更自然的二元反馈，并能在论文实验中匹配或超过 DPO。</p>",
      "quiz": {
        "q": "KTO 相比 DPO 对数据格式的主要放宽是什么？",
        "options": [
          "KTO 不需要任何参考模型",
          "KTO 只需要单个输出的 desirable/undesirable 标签，不要求成对偏好",
          "KTO 只使用无监督预训练语料",
          "KTO 必须使用人工打分的连续 reward"
        ],
        "answer": 1,
        "explain": "KTO 的损失作用在 (x, y, binary label) 上，通过前景理论式效用区分好坏输出；DPO 则需要 (x, y_w, y_l) 成对偏好。"
      }
    },
    {
      "id": "orpo",
      "num": 8,
      "name": "比值比偏好优化 (ORPO)",
      "fullName": "比值比偏好优化 (ORPO)",
      "year": "2024",
      "org": "",
      "parent": "dpo",
      "paperUrl": "https://arxiv.org/abs/2403.07691",
      "projectUrl": "",
      "category": "direct_preference",
      "motivation": "单阶段对齐，无需参考模型",
      "summary": "ORPO 将 SFT 的负对数似然损失与 odds ratio 偏好惩罚合并到一个单阶段目标中，在不使用冻结参考模型和额外 DPO/RLHF 阶段的情况下同时完成指令适配与偏好对齐。",
      "keyPoints": [
        "提出 reference-free、monolithic 的偏好优化流程：一个训练阶段内同时做 SFT 和偏好对齐。",
        "观察到普通 SFT 只提升 chosen response 的概率并不够，rejected response 的概率也可能随领域适配一起升高。",
        "使用 odds <span class=\"kb-math kb-math-inline\">P/(1-P)</span> 而非单纯概率比来衡量 chosen 相对 rejected 的可生成性优势。",
        "总损失为 <span class=\"kb-math kb-math-inline\">\\mathcal{L}_\\text{SFT}+\\lambda\\mathcal{L}_\\text{OR}</span>，其中 <span class=\"kb-math kb-math-inline\">\\mathcal{L}_\\text{OR}</span> 用 log-sigmoid 最大化 chosen/rejected odds ratio。",
        "不需要 DPO 中的 <span class=\"kb-math kb-math-inline\">\\pi_\\text{ref}</span>，因此训练时少一个冻结模型，也减少每个 batch 的 forward 计算和显存占用。",
        "在 HH-RLHF、Binarized UltraFeedback、AlpacaEval、MT-Bench 等实验中验证了 125M 到 7B 规模模型上的有效性。"
      ],
      "detail": "<p><img alt=\"ORPO 与 RLHF/DPO/SFT 流程对比\" src=\"https://ar5iv.labs.arxiv.org/html/2403.07691/assets/x2.png\" />\n<em>图：ORPO 将偏好惩罚直接附加到 SFT 目标中，不再需要先 SFT 再执行 DPO/RLHF，也不需要保留单独的参考模型。</em></p>\n<p>ORPO 的动机来自一个很实际的现象：SFT 在 chosen responses 上训练时，会把模型推向目标对话/指令域，但这种领域适配也可能提升 rejected responses 的概率。也就是说，模型学会了“像这个数据集一样说话”，却未必学会了“避开坏回答风格”。传统 DPO 通常在 SFT 后再做一轮偏好优化，并依赖冻结的 SFT 模型作为参考；ORPO 试图把这两步合并。</p>\n<p>首先定义序列级平均 log-likelihood：</p>\n<div class=\"kb-math kb-math-display\">\\log P_\\theta(y|x)=\\frac{1}{m}\\sum_{t=1}^{m}\\log P_\\theta(y_t|x,y_{&lt;t}).</div>\n<p>ORPO 不直接比较 <span class=\"kb-math kb-math-inline\">P_\\theta(y_w|x)</span> 和 <span class=\"kb-math kb-math-inline\">P_\\theta(y_l|x)</span>，而是比较 odds：</p>\n<div class=\"kb-math kb-math-display\">\\mathbf{odds}_\\theta(y|x)=\\frac{P_\\theta(y|x)}{1-P_\\theta(y|x)}.</div>\n<p>chosen over rejected 的 odds ratio 为：</p>\n<div class=\"kb-math kb-math-display\">\\mathbf{OR}_\\theta(y_w,y_l)=\n\\frac{\\mathbf{odds}_\\theta(y_w|x)}{\\mathbf{odds}_\\theta(y_l|x)}.</div>\n<p>ORPO 的总目标由两部分组成：</p>\n<div class=\"kb-math kb-math-display\">\\mathcal{L}_\\text{ORPO}=\\mathbb{E}_{(x,y_w,y_l)}\n\\left[\\mathcal{L}_\\text{SFT}+\\lambda\\mathcal{L}_\\text{OR}\\right],</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">\\mathcal{L}_\\text{SFT}</span> 是对 chosen response 的常规 causal LM NLL，<span class=\"kb-math kb-math-inline\">\\mathcal{L}_\\text{OR}</span> 是偏好项：</p>\n<div class=\"kb-math kb-math-display\">\\mathcal{L}_\\text{OR}=-\\log\\sigma\\left(\n\\log\\frac{\\mathbf{odds}_\\theta(y_w|x)}{\\mathbf{odds}_\\theta(y_l|x)}\n\\right).</div>\n<p>这个形式可以理解为：如果 chosen 的 odds 已经明显大于 rejected，log-sigmoid 损失接近 0；如果 rejected 的 odds 不低，损失会变大，迫使模型降低 rejected 或提高 chosen。与 DPO 的最大区别是公式里没有 <span class=\"kb-math kb-math-inline\">\\pi_\\text{ref}</span>。ORPO 不需要衡量“当前策略相对参考策略变化多少”，而是在当前模型自身的 SFT 过程中直接塑造 chosen/rejected 的 odds 对比。</p>\n<pre><code class=\"language-python\"># ORPO single-stage objective\nfor batch in preference_loader:\n    x, y_w, y_l = batch.prompt, batch.chosen, batch.rejected\n\n    logp_w = model.avg_logprob(x, y_w)\n    logp_l = model.avg_logprob(x, y_l)\n\n    p_w = exp(logp_w)\n    p_l = exp(logp_l)\n    odds_w = p_w / (1.0 - p_w + eps)\n    odds_l = p_l / (1.0 - p_l + eps)\n\n    sft_loss = -mean(logp_w)\n    odds_ratio_logit = log(odds_w + eps) - log(odds_l + eps)\n    or_loss = -mean(logsigmoid(odds_ratio_logit))\n\n    loss = sft_loss + lambda_or * or_loss\n    loss.backward()\n    optimizer.step()\n</code></pre>\n<p>论文还通过梯度解释 odds ratio 为什么适合放进 SFT。偏好项的梯度可写为两个因子的乘积：</p>\n<div class=\"kb-math kb-math-display\">\\nabla_\\theta\\mathcal{L}_\\text{OR}=\\delta(d)\\cdot h(d),</div>\n<p>其中</p>\n<div class=\"kb-math kb-math-display\">\\delta(d)=\\left[1+\\frac{\\mathbf{odds}_\\theta(y_w|x)}{\\mathbf{odds}_\\theta(y_l|x)}\\right]^{-1},</div>\n<div class=\"kb-math kb-math-display\">h(d)=\\frac{\\nabla_\\theta\\log P_\\theta(y_w|x)}{1-P_\\theta(y_w|x)}-\n\\frac{\\nabla_\\theta\\log P_\\theta(y_l|x)}{1-P_\\theta(y_l|x)}.</div>\n<p>当 chosen odds 已经高于 rejected odds 时，<span class=\"kb-math kb-math-inline\">\\delta(d)</span> 变小，偏好项自动减弱；当模型仍然更容易生成 rejected response 时，<span class=\"kb-math kb-math-inline\">\\delta(d)</span> 较大，更新会更强。<span class=\"kb-math kb-math-inline\">h(d)</span> 则把 chosen 和 rejected 的梯度做对比，分母 <span class=\"kb-math kb-math-inline\">1-P</span> 会在相应概率较高时改变梯度尺度，使模型在适配 chosen 风格的同时抑制 rejected 风格。</p>\n<div class=\"key-point\">💡 关键：ORPO 不是“只在 SFT 上加一个负样本交叉熵”。它用 odds ratio 建模 chosen 与 rejected 的相对可生成性，因此偏好信号始终是成对、动态的，而不是预先定义一个固定的禁用 token 集合。</div>\n<p>为什么不用简单 probability ratio？论文认为，在 SFT 与偏好对齐合并时，模型还处于领域适配阶段，过强地压低 rejected 可能导致退化。odds ratio 对 <span class=\"kb-math kb-math-inline\">P</span> 接近 0 或 1 的区域更敏感，配合 log-sigmoid 后能提供更合适的区分尺度：既让 chosen 相对 rejected 获得优势，又避免像单独的概率比目标那样需要通过过度压制 rejected 来制造 margin。</p>\n<p>从系统角度看，ORPO 的优势很直接。DPO 通常需要当前模型和参考模型都对 <span class=\"kb-math kb-math-inline\">y_w,y_l</span> 做 forward；RLHF 还要奖励模型与 PPO rollout。ORPO 只有一个正在训练的模型，对 chosen/rejected 各算一次 likelihood 即可。论文因此称其为 monolithic preference optimization：同一个目标同时承担领域适配、偏好区分和拒绝风格惩罚。</p>\n<p>ORPO 的局限也来自这个设计。由于没有参考模型，<span class=\"kb-math kb-math-inline\">\\lambda</span> 控制的偏好项强度非常关键：太小会退化成普通 SFT，太大则可能牺牲语言建模和多样性。它适合已有明确 chosen/rejected pair 的训练集，并且特别适合希望降低显存、减少训练阶段、快速做指令模型对齐的场景。</p>",
      "quiz": {
        "q": "ORPO 相比 DPO 的核心工程简化是什么？",
        "options": [
          "ORPO 删除了 chosen response，只训练 rejected response",
          "ORPO 不需要冻结参考模型，而是在 SFT 损失中直接加入 odds ratio 偏好项",
          "ORPO 必须先训练 reward model，再做 PPO",
          "ORPO 只适用于无标签预训练数据"
        ],
        "answer": 1,
        "explain": "ORPO 的目标是 L_SFT + λL_OR，偏好项只依赖当前模型对 chosen/rejected 的 odds ratio，不需要 DPO 中的参考模型。"
      }
    },
    {
      "id": "simpo",
      "num": 9,
      "name": "简单偏好优化 (SimPO)",
      "fullName": "简单偏好优化 (SimPO)",
      "year": "2024",
      "org": "",
      "parent": "dpo",
      "paperUrl": "https://arxiv.org/abs/2405.14734",
      "projectUrl": "",
      "category": "direct_preference",
      "motivation": "长度归一化奖励，去参考模型",
      "summary": "SimPO 提出一种无需参考模型的直接偏好优化方法，用序列平均 log probability 作为隐式奖励，并在 Bradley-Terry 目标中加入目标奖励间隔，解决 DPO 奖励与生成时似然指标不一致、训练成本较高的问题。",
      "keyPoints": [
        "参考模型移除：训练目标只依赖当前策略模型 <code>πθ</code>，不再需要同时加载 <code>πref</code>。",
        "长度归一化奖励：用 response token 的平均 log probability 作为隐式奖励，缓解长回答天然累积更大 log probability 差异的问题。",
        "目标奖励间隔：在偏好概率中加入 margin <code>γ</code>，要求 winning response 比 losing response 至少高出固定间隔。",
        "与生成目标对齐：训练时优化的平均 token log likelihood 更接近推理时 greedy、beam search 或采样近似追求的生成准则。",
        "经验基准覆盖 AlpacaEval 2、MT-Bench、Arena-Hard，并在 Mistral、Llama 3、Gemma 2 等 base 与 instruct 设置上比较 DPO、IPO、KTO、ORPO 等方法。"
      ],
      "detail": "<p><img alt=\"SimPO 与 DPO 奖励形式对比\" src=\"https://arxiv.org/html/2405.14734v3/x1.png\" />\n<em>图：论文 Figure 1 展示 SimPO 与 DPO 的核心差异在奖励形式：DPO 使用相对参考模型的 log-ratio，SimPO 直接使用当前策略的长度归一化平均 log probability，并展示其在 AlpacaEval 2 与 Arena-Hard 上相对 DPO 的优势。</em></p>\n<pre><code class=\"language-python\"># SimPO 核心训练逻辑，省略 tokenizer/padding/optimizer 细节\nfor batch in preference_loader:\n    x, y_w, y_l = batch.prompt, batch.chosen, batch.rejected\n\n    # 只前向当前策略模型，不再前向 reference model\n    logp_w_tokens = policy.log_probs(x, y_w)      # shape: [B, len_w]\n    logp_l_tokens = policy.log_probs(x, y_l)      # shape: [B, len_l]\n\n    # 长度归一化隐式奖励：平均 token log probability\n    reward_w = beta * logp_w_tokens.sum(dim=-1) / len(y_w)\n    reward_l = beta * logp_l_tokens.sum(dim=-1) / len(y_l)\n\n    # Bradley-Terry 偏好目标 + 目标奖励间隔 gamma\n    logits = reward_w - reward_l - gamma\n    loss = -log_sigmoid(logits).mean()\n\n    loss.backward()\n    optimizer.step()\n    optimizer.zero_grad()\n</code></pre>\n<p>DPO 的出发点是把 RLHF 中“先学 reward model，再做 KL 正则化 RL”的流程改写成一个直接分类式目标。它的隐式奖励通常写作：</p>\n<div class=\"kb-math kb-math-display\">r_{\\mathrm{DPO}}(x,y)=\\beta\\log\\frac{\\pi_\\theta(y\\mid x)}{\\pi_{\\mathrm{ref}}(y\\mid x)}+\\beta\\log Z(x)</div>\n<p>其中 <code>πref</code> 通常是 SFT 模型。这个形式的好处是稳定，但 SimPO 论文指出它有两个直接代价：训练时必须加载参考模型，显存和计算几乎增加一份；更重要的是，DPO 奖励衡量的是“相对参考模型提高了多少”，而推理时模型实际用来生成的是当前策略自己的 token likelihood。也就是说，DPO 可能把某个回答判为高奖励，只是因为它比参考模型更偏向该回答，并不代表当前模型在生成时真的更倾向产生它。</p>\n<p>SimPO 的核心改动是把隐式奖励改成当前策略的平均 log probability：</p>\n<div class=\"kb-math kb-math-display\">r_{\\mathrm{SimPO}}(x,y)=\\frac{\\beta}{|y|}\\sum_{t=1}^{|y|}\\log \\pi_\\theta(y_t\\mid x,y_{&lt;t})</div>\n<p>这里的 <code>|y|</code> 是 response token 数。这个长度归一化不是装饰项，而是 SimPO 与普通序列 log probability 的关键区别：如果直接用整段 log probability，长回答会因为累加更多负 log probability 而被系统性压低；如果完全不考虑长度，又容易鼓励模型通过变长输出钻评测指标空子。平均 log probability 更接近解码时按 token 做局部选择的机制，因此论文称它更 aligned with generation likelihood。</p>\n<p>在偏好学习层面，SimPO 仍然保留 Bradley-Terry 形式，但加入目标奖励间隔 <code>γ</code>：</p>\n<div class=\"kb-math kb-math-display\">\\mathcal{L}_{\\mathrm{SimPO}}=-\\mathbb{E}_{(x,y_w,y_l)\\sim\\mathcal{D}}\n\\left[\\log\\sigma\\left(\n\\frac{\\beta}{|y_w|}\\log\\pi_\\theta(y_w\\mid x)\n-\\frac{\\beta}{|y_l|}\\log\\pi_\\theta(y_l\\mid x)\n-\\gamma\n\\right)\\right]</div>\n<p>直觉上，普通 BT 目标只要求 <code>y_w</code> 的奖励大于 <code>y_l</code>；加入 <code>γ</code> 后，模型必须把 winning response 推到“明显更好”的区域，才会得到低损失。这相当于把偏好对从二分类边界附近推开，减少模型只学到微弱排序差异的情况。<code>β</code> 控制 log probability 差异的尺度，<code>γ</code> 控制 winning 与 losing 的最小分离度，两者共同决定训练信号强弱。</p>\n<p>SimPO 与 ORPO、IPO、KTO 等参考模型较弱或无参考模型方法的区别在于，它不是额外设计一个 odds ratio 或替代偏好统计量，而是直接把“模型生成时自己最大化什么”拿来作为奖励。这样实现上非常轻量：一次 policy forward 就能得到 chosen/rejected 的 token log probability；没有 reference forward，也没有 reward model rollout。论文在 v3 中还讨论了必要时加入 SFT regularization 来防止灾难性遗忘，但主算法本身不依赖 KL reference 约束。</p>\n<div class=\"key-point\">💡 关键：SimPO 的“简单”不是少写一个模型而已，而是把奖励定义从“相对参考模型的偏离”换成“当前模型对答案本身的平均生成倾向”。这个改动同时影响优化目标、显存成本、长度偏置和训练-推理一致性。</div>",
      "quiz": {
        "q": "SimPO 相比 DPO 最核心的奖励设计变化是什么？",
        "options": [
          "把奖励模型替换为更大的奖励模型",
          "用当前策略的长度归一化平均 log probability 作为隐式奖励",
          "把 Bradley-Terry 目标替换为交叉熵监督微调",
          "只优化 winning response，完全忽略 rejected response"
        ],
        "answer": 1,
        "explain": "SimPO 的核心是 reference-free reward：用当前策略对整段回答的平均 token log probability 表示奖励，并通过 margin 拉开 chosen 与 rejected。"
      }
    },
    {
      "id": "tdpo",
      "num": 10,
      "name": "Token级直接偏好优化 (TDPO)",
      "fullName": "Token级直接偏好优化 (TDPO)",
      "year": "2024",
      "org": "",
      "parent": "dpo",
      "paperUrl": "https://proceedings.mlr.press/v235/zeng24b.html",
      "projectUrl": "",
      "category": "token_multimodal",
      "motivation": "Token级前向KL约束保持多样性",
      "summary": "TDPO 将 DPO 的整段回答级偏好优化改写为 token 级序列决策问题，在每个生成状态上引入 forward KL 约束，从而更细粒度地平衡偏好对齐与生成多样性。",
      "keyPoints": [
        "Token 级建模：把 response 生成视为自回归 MDP，每个 prefix state 下选择下一个 token action。",
        "Sequential KL 诊断：论文观察到 DPO 对 preferred 与 dispreferred responses 的 KL 增长不均衡，尤其 dispreferred 子集 KL 漂移更快。",
        "Forward KL 约束：在 token 分布层面约束 <code>D_KL(πref || πθ)</code>，缓解 reverse KL 的 mode-seeking 与多样性下降。",
        "Bradley-Terry token 化：通过 advantage/regret 形式把句级 BT 偏好概率连接到 token 级奖励差。",
        "两个实用版本：<code>TDPO_1</code> 直接加入 token-level KL 差异项，<code>TDPO_2</code> 用系数 <code>α</code> 与 stop-gradient 改善梯度稳定性。",
        "实验覆盖 IMDb 控制情感生成、Anthropic-HH 单轮对话、MT-Bench，并与 DPO、PPO-style RLHF 等基线比较。"
      ],
      "detail": "<div class=\"warn-box\">⚠️ 元信息说明：任务 JSON 中的 <code>paper_url</code> 指向 PMLR <code>zeng24b</code>，该页实际是 tnGPS；TDPO 的官方 PMLR 条目为 <code>https://proceedings.mlr.press/v235/zeng24c.html</code>，arXiv 版本为 <code>https://arxiv.org/abs/2404.11999</code>。以下精读按 TDPO 官方论文正文整理，同时保留上方 YAML 与任务元信息一致。</div>\n<p><img alt=\"TDPO 损失函数对比\" src=\"https://arxiv.org/html/2404.11999v2/x4.png\" />\n<em>图：论文 Figure 2 对比 DPO、TDPO_1 与 TDPO_2 的损失结构。TDPO 在 DPO 的 log-ratio 偏好项之外，加入 preferred/dispreferred response 的 token 级 sequential KL 差异控制项。</em></p>\n<pre><code class=\"language-python\"># TDPO 训练伪代码，概括论文 Algorithm 1 与 Appendix B 实现\nfor batch in preference_loader:\n    x, y_w, y_l = batch.prompt, batch.chosen, batch.rejected\n\n    # policy 与 reference 都在 token 级输出词表分布\n    pi_logits_w, pi_logits_l = policy(x, y_w), policy(x, y_l)\n    ref_logits_w, ref_logits_l = reference(x, y_w), reference(x, y_l)\n\n    # token log-ratio reward: log πθ(token|prefix) - log πref(token|prefix)\n    delta_w = gather_logp(pi_logits_w, y_w) - gather_logp(ref_logits_w, y_w)\n    delta_l = gather_logp(pi_logits_l, y_l) - gather_logp(ref_logits_l, y_l)\n\n    # sequential forward KL: sum_t KL(πref(.|s_t) || πθ(.|s_t))\n    seqkl_w = forward_kl(ref_logits_w, pi_logits_w).sum(dim=-1)\n    seqkl_l = forward_kl(ref_logits_l, pi_logits_l).sum(dim=-1)\n\n    if method == &quot;TDPO_1&quot;:\n        value = delta_w.sum(dim=-1) - delta_l.sum(dim=-1) - (seqkl_l - seqkl_w)\n    else:  # TDPO_2\n        value = delta_w.sum(dim=-1) - delta_l.sum(dim=-1) - alpha * (seqkl_l - stop_grad(seqkl_w))\n\n    loss = -log_sigmoid(beta * value).mean()\n    optimizer.step(loss)\n</code></pre>\n<p>DPO 把一个完整回答 <code>y</code> 当作 bandit arm，对偏好对 <code>(x, y_w, y_l)</code> 直接比较整段 log probability ratio。TDPO 的问题意识是：LLM 并不是一次性吐出整段回答，而是在状态 <code>s_t=(x,y_{&lt;t})</code> 下逐 token 采样。因此，只在 response 级别控制 KL 会掩盖 token 轨迹中的漂移。论文 Figure 1 先做了一个诊断：DPO 训练过程中 preferred 与 dispreferred response 的 sequential KL 增长不同步，dispreferred 子集往往偏离 reference 更快，这意味着 DPO 虽然在总体偏好上变好，却可能以牺牲局部 token 分布稳定性和多样性为代价。</p>\n<p>TDPO 先定义 token 级 log-ratio 奖励：</p>\n<div class=\"kb-math kb-math-display\">\\delta_t(y)=\\log \\pi_\\theta(y_t\\mid x,y_{&lt;t})-\\log \\pi_{\\mathrm{ref}}(y_t\\mid x,y_{&lt;t})</div>\n<p>这仍然继承了 DPO 的“当前策略相对参考策略”思想，但粒度从整段回答拆到每个 token。然后定义 sequential forward KL：</p>\n<div class=\"kb-math kb-math-display\">\\mathrm{SeqKL}(y)=\\sum_{t=1}^{|y|}D_{\\mathrm{KL}}\\left(\\pi_{\\mathrm{ref}}(\\cdot\\mid x,y_{&lt;t})\\,\\Vert\\,\\pi_\\theta(\\cdot\\mid x,y_{&lt;t})\\right)</div>\n<p>forward KL 的方向很关键。DPO/RLHF 中常见的 reverse KL 更偏 mode-seeking，容易让模型集中到少数高奖励模式；forward KL 更强调覆盖 reference 分布中有概率的 token，因此对保持语言多样性更友好。TDPO 并不是简单把 KL 加到整段 loss，而是比较 preferred 与 dispreferred 两条轨迹上的 KL 差异，让优化知道哪条轨迹偏离得更多。</p>\n<p><code>TDPO_1</code> 可以写成如下形式：</p>\n<div class=\"kb-math kb-math-display\">\\mathcal{L}_{\\mathrm{TDPO_1}}=-\\mathbb{E}\\left[\\log\\sigma\\left(\\beta\\left(\n\\sum_t\\delta_t(y_w)-\\sum_t\\delta_t(y_l)-\\left(\\mathrm{SeqKL}(y_l)-\\mathrm{SeqKL}(y_w)\\right)\n\\right)\\right)\\right]</div>\n<p>这个式子比 DPO 多了 <code>SeqKL(y_l)-SeqKL(y_w)</code>。如果 rejected response 的 KL 漂移过大，损失会惩罚这种“通过把坏回答推得很远来获得偏好差”的行为；如果 chosen response 需要适度偏离 reference 才能更好，则该项不会一刀切地禁止偏离。换句话说，TDPO 追求的不是让所有 token 都贴近 reference，而是让偏好改进与 KL 使用效率匹配。</p>\n<p><code>TDPO_2</code> 进一步引入系数 <code>α</code> 和 stop-gradient：</p>\n<div class=\"kb-math kb-math-display\">\\mathcal{L}_{\\mathrm{TDPO_2}}=-\\mathbb{E}\\left[\\log\\sigma\\left(\\beta\\left(\n\\sum_t\\delta_t(y_w)-\\sum_t\\delta_t(y_l)-\\alpha\\left(\\mathrm{SeqKL}(y_l)-\\mathrm{sg}(\\mathrm{SeqKL}(y_w))\\right)\n\\right)\\right)\\right]</div>\n<p>这里 <code>sg</code> 表示 stop-gradient。直觉上，preferred response 的 KL 项可以作为比较基准，但不让其梯度直接牵引模型；训练主要通过 rejected response 的 KL 约束来抑制不必要漂移。<code>α</code> 则提供一个连续旋钮：较大时更保守、更多样，较小时更接近 DPO 的偏好拉开方式。论文实验表明 TDPO 能在 reward/KL frontier 上取得比 DPO 更好的折中。</p>\n<div class=\"key-point\">💡 关键：TDPO 的创新不只是“按 token 求和”，而是把偏好优化中的奖励差、BT 概率和 KL 正则都放回自回归 token 轨迹里，让模型知道每个 prefix state 下的分布偏移是否值得。</div>",
      "quiz": {
        "q": "TDPO 为什么要引入 token 级 forward KL？",
        "options": [
          "为了完全移除 reference model",
          "为了只训练回答的最后一个 token",
          "为了在每个生成前缀上约束策略偏移，改善偏好对齐与多样性的折中",
          "为了把偏好数据改成多标签分类数据"
        ],
        "answer": 2,
        "explain": "TDPO 认为整段级 KL 难以控制自回归生成轨迹中的局部漂移，因此用 token 级 forward KL 约束每个 prefix 下的分布变化。"
      }
    },
    {
      "id": "spac",
      "num": 11,
      "name": "自博弈对抗Critic (SPAC)",
      "fullName": "自博弈对抗Critic (SPAC)",
      "year": "2024",
      "org": "",
      "parent": "dpo",
      "paperUrl": "https://arxiv.org/abs/2406.04274",
      "projectUrl": "",
      "category": "direct_preference",
      "motivation": "自博弈对抗Critic离线对齐",
      "summary": "SPAC 将离线偏好优化表述为 learner policy 与 adversarial critic 的 Stackelberg 自博弈，用 on-average pessimism 在离线数据覆盖不足时抑制过乐观更新，同时通过 DPO 式变量替换得到可扩展的单时间尺度 LLM 对齐算法。",
      "keyPoints": [
        "面向离线偏好数据：不依赖在线人工反馈或在线 reward rollout，目标是在固定 preference dataset 上对齐语言模型。",
        "Stackelberg 博弈视角：policy 是 leader，critic 是 follower；policy 试图提升悲观奖励，critic 负责维持对当前 policy 的悲观评估。",
        "On-average pessimism：不估计每个 <code>(x,y)</code> 的点态 reward lower bound，而是约束当前 policy 分布下的期望奖励下界。",
        "单策略 concentrability 保证：理论上在比全覆盖更弱的数据覆盖假设下收敛到近优策略。",
        "DPO 式变量替换：把显式 reward/critic 改写为 policy log density ratio，使算法能接到现有 DPO/SPIN/RLHF 代码栈。",
        "单时间尺度 self-play：每轮用当前 policy 生成响应，再用离线偏好数据和自生成样本的 critic 项更新下一轮 policy。"
      ],
      "detail": "<p><img alt=\"SPAC 自博弈流程示意\" src=\"https://quickchart.io/graphviz?format=svg&amp;graph=digraph%20G%20%7Brankdir%3DLR%3Bnode%5Bshape%3Dbox%2Cstyle%3D%22rounded%2Cfilled%22%2Cfillcolor%3D%22%23EEF6FF%22%5D%3BData%5Blabel%3D%22Offline%20preference%20data%5Cn(x%2C%20y%2B%2C%20y-)%22%5D%3BPolicy%5Blabel%3D%22Current%20policy%20pi_t%22%5D%3BGen%5Blabel%3D%22Self-play%20responses%5Cny%27%20~%20pi_t(.%7Cx)%22%5D%3BCritic%5Blabel%3D%22Adversarial%20critic%5Cnon-average%20pessimism%22%5D%3BUpdate%5Blabel%3D%22DPO-style%20policy%20update%5Cnpreference%20loss%20%2B%20critic%20penalty%22%5D%3BNext%5Blabel%3D%22Next%20policy%20pi_%7Bt%2B1%7D%22%5D%3BData-%3EUpdate%3BPolicy-%3EGen%3BGen-%3ECritic%3BCritic-%3EUpdate%3BUpdate-%3ENext%3BNext-%3EPolicy%3B%7D\" />\n<em>图：原论文没有提供模型框架 Figure；上图根据论文 Algorithm 2 与 Section 3 的 Stackelberg self-play 描述远程渲染，展示离线偏好数据、自生成响应、对抗 critic 与 DPO 式 policy update 的关系。</em></p>\n<pre><code class=\"language-python\"># SPAC practical self-play loop，概括论文 Algorithm 2\npi_t = initial_sft_policy\nfor t in range(T):\n    # 1. self-play: 当前策略在 prompt 上生成候选响应\n    generated = []\n    for x in prompts_from_preference_data:\n        y_prime = sample(pi_t, x)\n        generated.append((x, y_prime))\n\n    # 2. 用 DPO 式 log density ratio 表示隐式 critic / reward\n    #    preference_loss 来自离线 (x, y+, y-)；critic_penalty 来自 y' ~ pi_t\n    for batch in training_batches:\n        pref = -log_sigmoid(beta * (log_ratio(pi, batch.y_plus) - log_ratio(pi, batch.y_minus)))\n        pessimism = mean(log(pi(y_prime|x)) - log(pi_t(y_prime|x)) for x, y_prime in generated)\n        loss = pref + lambda_ * pessimism\n        optimizer.step(loss)\n\n    pi_t = updated_policy(pi)\nreturn average_or_last_policy(pi_t)\n</code></pre>\n<p>SPAC 处理的问题比普通 DPO 更偏理论：离线偏好数据的覆盖通常很稀疏，模型没有机会在线探索并修正错误估计。经典离线 RL 告诉我们，如果算法对未覆盖区域过于乐观，就会把 policy 推向数据中没有可靠证据支持的行为。DPO、IPO、KTO 等直接偏好优化方法在实践中有效，但它们通常不保证在稀疏覆盖下收敛到最优策略；另一方面，已有带严格保证的偏好优化算法又往往要构造复杂置信集，不适合 7B 级 LLM 训练。</p>\n<p>SPAC 的核心思想是把离线 preference optimization 写成一个 Stackelberg game。leader 是 learner policy，它希望在 critic 给出的奖励估计下变好；follower 是 adversarial critic，它并不是帮 policy 找最高分解释，而是维护一个对当前 policy 足够悲观的 reward estimate。论文强调这种悲观性是 on-average 的：不要求对每个样本点都给出 lower bound，而是要求在当前 learner policy 诱导的分布上，期望奖励不要被高估。这样比点态悲观更容易优化，也更适合神经网络函数逼近。</p>\n<p>抽象地看，SPAC 的 policy update 可理解为：</p>\n<div class=\"kb-math kb-math-display\">\\pi_{t+1}\\approx\\arg\\min_{\\pi}\\;\\mathcal{L}_{\\mathrm{pref}}(\\pi;\\mathcal{D})\n+\\lambda\\,\\widehat{\\mathbb{E}}_{x\\sim\\mathcal{D},\\;y&#x27;\\sim\\pi_t(\\cdot\\mid x)}\n\\left[\\log\\frac{\\pi(y&#x27;\\mid x)}{\\pi_t(y&#x27;\\mid x)}\\right]</div>\n<p>第一项是离线偏好对上的 DPO-like ranking loss，推动 <code>y+</code> 相对 <code>y-</code> 的 log density ratio 变大。第二项来自 adversarial critic：如果新策略 <code>π</code> 试图显著增加当前策略自生成回答 <code>y'</code> 的概率，就会付出惩罚；只有当偏好数据给出足够证据时，这种移动才值得。这个项的直觉类似离线 RL 中的 pessimism：不要因为函数逼近器的外推误差，就在数据支撑不足的区域自信地提高概率。</p>\n<p>理论版 SPAC-T 先显式维护 reward/critic 函数类，并用 mirror descent 更新 policy：</p>\n<div class=\"kb-math kb-math-display\">\\pi_{t+1}(y\\mid x)\\propto \\pi_t(y\\mid x)\\exp(\\eta f_t(x,y))</div>\n<p>其中 <code>f_t</code> 是当前轮由偏好数据和悲观正则共同确定的 critic。实践版 SPAC 则借鉴 DPO 的变量替换，把 reward 写成 policy log-ratio，从而不需要单独训练一个 reward model 或显式 critic network。这一步很重要：它把原本双层、双时间尺度的 actor-critic 结构压成一个可在现有 DPO 代码上实现的单时间尺度目标。</p>\n<p>论文的 Algorithm 2 每轮用 <code>π_t</code> 对 prompt 生成一个 response <code>y_j'</code>，然后在更新 <code>π_{t+1}</code> 时使用 <code>log(π(y_j'|x_j)/π_t(y_j'|x_j))</code> 形式的 critic penalty。作者还说明实践中可以把 chosen 与 rejected responses 都用于估计这个 log density ratio，并用 log-sigmoid 平滑来避免理论上很大的 <code>λ=Θ(C√n)</code> 带来数值不稳定。理论结论给出在 single-policy concentrability 下的近优收敛，忽略常数与对数项后 suboptimality 以如下速率下降：</p>\n<div class=\"kb-math kb-math-display\">\\widetilde{O}\\left(\\sqrt{\\frac{1}{n}}+\\sqrt{\\frac{1}{T}}\\right)</div>\n<p>其中 <code>n</code> 是离线数据规模，<code>T</code> 是 self-play 迭代轮数。这个结果说明 SPAC 的贡献不是单纯提出一个新的 DPO loss，而是在“可扩展实现”和“离线 RL 式可证明悲观性”之间建立连接。</p>\n<div class=\"key-point\">💡 关键：SPAC 把直接偏好优化重新解释为离线 RL 的悲观自博弈。policy 不是盲目最大化偏好分类边界，而是在 adversarial critic 约束下，只对离线数据足够支持的方向增加概率。</div>",
      "quiz": {
        "q": "SPAC 中 adversarial critic 的主要作用是什么？",
        "options": [
          "替代 tokenizer 以减少序列长度",
          "在离线数据覆盖不足时提供 on-average pessimism，抑制过乐观 policy 更新",
          "把所有 rejected responses 从训练集中删除",
          "让模型只模仿 reference policy，不学习偏好差异"
        ],
        "answer": 1,
        "explain": "SPAC 的 critic 作为 Stackelberg game 的 follower，维护当前 policy 分布下的悲观奖励估计，使离线偏好优化不轻易外推到缺乏数据支撑的区域。"
      }
    },
    {
      "id": "grpo",
      "num": 12,
      "name": "组相对策略优化 (GRPO)",
      "fullName": "组相对策略优化 (GRPO)",
      "year": "2025",
      "org": "",
      "parent": "rlhf",
      "paperUrl": "https://arxiv.org/abs/2501.12948",
      "projectUrl": "",
      "category": "rl_based",
      "motivation": "组相对评分取代Critic模型",
      "summary": "GRPO 用同一问题下多条候选回答的组内相对奖励来估计优势函数，解决 PPO 在大语言模型 RL 训练中必须额外训练同规模 Critic/Value Model 的高成本问题。它保留 PPO 的裁剪式稳定更新，同时把 baseline 从学习到的价值函数改为组内 reward 归一化，是 DeepSeek-R1/R1-Zero 进行大规模可验证奖励强化学习的核心优化器。",
      "keyPoints": [
        "无 Critic 设计：不再训练与策略模型同规模的 Value Model，而用同一 prompt 的多条采样回答构成 group baseline。",
        "组相对优势估计：对每个问题采样 <span class=\"kb-math kb-math-inline\">G</span> 个输出，用 <span class=\"kb-math kb-math-inline\">(r_i-\\mathrm{mean}(\\mathbf r))/\\mathrm{std}(\\mathbf r)</span> 作为该输出所有 token 的优势信号。",
        "PPO 裁剪目标保留：仍使用新旧策略概率比和 <span class=\"kb-math kb-math-inline\">\\operatorname{clip}(\\cdot,1-\\epsilon,1+\\epsilon)</span> 抑制单步策略漂移。",
        "KL 正则独立进入目标函数：不把 KL 惩罚混入 reward，而是在优化目标中直接约束 <span class=\"kb-math kb-math-inline\">\\pi_\\theta</span> 与 reference policy 的距离。",
        "适配可验证奖励 RL：DeepSeek-R1-Zero 使用规则型 accuracy reward 与 format reward，避免训练神经奖励模型带来的 reward hacking 和额外资源开销。",
        "支持 outcome/process 两类监督：结果监督把归一化组奖励赋给整段输出，过程监督可在推理步骤级别分配奖励并回传到相关 token。"
      ],
      "detail": "<p><img alt=\"PPO 与 GRPO 对比示意图\" src=\"https://arxiv.org/html/2402.03300v3/x2.png\" />\n<em>图：DeepSeekMath Figure 4 展示 PPO 与 GRPO 的关键差别：PPO 依赖 Value Model 估计 baseline，GRPO 改用同一问题多条回答的组内分数估计 baseline，从而省去 Critic。DeepSeek-R1 论文沿用该 GRPO 框架进行大规模推理 RL。</em></p>\n<p>GRPO 的直接动机来自 LLM 场景下 PPO 的资源瓶颈。传统 PPO 是 actor-critic 算法，除了策略模型 <span class=\"kb-math kb-math-inline\">\\pi_\\theta</span>，还需要训练价值函数 <span class=\"kb-math kb-math-inline\">V_\\psi</span> 估计每个 token 位置的未来回报；当策略模型已经是数十亿到数千亿参数时，一个同规模 Critic 会显著增加显存、通信和优化成本。更麻烦的是，RLHF/推理 RL 中 reward 往往只在回答末尾出现，例如最终答案是否正确、格式是否满足 <code>&lt;think&gt;</code>/<code>&lt;answer&gt;</code>，这使得 token 级 value fitting 既稀疏又噪声较大。GRPO 的核心判断是：对于同一个问题，多条候选回答之间天然具有可比较性，因此可以用组内平均分作为 baseline，而不是额外学习一个价值网络。</p>\n<p>其目标函数继承 PPO 的 clipped surrogate。对于问题 <span class=\"kb-math kb-math-inline\">q</span>，先从旧策略 <span class=\"kb-math kb-math-inline\">\\pi_{\\theta_{old}}</span> 采样 <span class=\"kb-math kb-math-inline\">G</span> 条输出 <span class=\"kb-math kb-math-inline\">\\{o_1,\\ldots,o_G\\}</span>，对每条输出逐 token 优化：</p>\n<div class=\"kb-math kb-math-display\">\\begin{aligned}\n\\mathcal J_{GRPO}(\\theta)\n= \\mathbb E\\Bigg[\\frac{1}{G}\\sum_{i=1}^{G}\\frac{1}{|o_i|}\\sum_{t=1}^{|o_i|}\n\\Bigg( &amp;\\min\\Big[\\rho_{i,t}(\\theta)\\hat A_{i,t},\n\\operatorname{clip}(\\rho_{i,t}(\\theta),1-\\epsilon,1+\\epsilon)\\hat A_{i,t}\\Big] \\\\\n&amp;-\\beta D_{KL}(\\pi_\\theta\\|\\pi_{ref})\\Bigg)\\Bigg],\n\\end{aligned}</div>\n<p>其中</p>\n<div class=\"kb-math kb-math-display\">\\rho_{i,t}(\\theta)=\\frac{\\pi_\\theta(o_{i,t}\\mid q,o_{i,&lt;t})}{\\pi_{\\theta_{old}}(o_{i,t}\\mid q,o_{i,&lt;t})}.</div>\n<p>优势函数不再来自 GAE + Value Model，而是来自组内 reward 标准化。若 <span class=\"kb-math kb-math-inline\">\\mathbf r=\\{r_1,\\ldots,r_G\\}</span>，结果监督版本令同一输出中所有 token 共享同一个优势：</p>\n<div class=\"kb-math kb-math-display\">\\hat A_{i,t}=\\widetilde r_i=\\frac{r_i-\\operatorname{mean}(\\mathbf r)}{\\operatorname{std}(\\mathbf r)}.</div>\n<p>这个式子体现了“组相对”的含义：绝对 reward 高不一定重要，重要的是该回答是否优于同一 prompt 下的其他回答。若某个样本得分高于组均值，所有生成它的 token 都被强化；低于组均值则被抑制。标准差归一化还能缓解不同 prompt reward 尺度不一致的问题，使数学题、代码题、格式题等不同任务的 reward 更容易混合训练。</p>\n<p>KL 项的处理也是 GRPO 与早期 RLHF PPO 的差别之一。标准 PPO 常把 KL 惩罚作为每 token reward 的一部分，例如 <span class=\"kb-math kb-math-inline\">r_t=r_\\varphi-\\beta\\log(\\pi_\\theta/\\pi_{ref})</span>，这会把 reward shaping、优势估计和正则项耦合在一起。GRPO 论文把 KL 直接放进目标函数，并用正值估计器近似：</p>\n<div class=\"kb-math kb-math-display\">D_{KL}(\\pi_\\theta\\|\\pi_{ref}) \\approx\n\\frac{\\pi_{ref}(o_{i,t}\\mid q,o_{i,&lt;t})}{\\pi_\\theta(o_{i,t}\\mid q,o_{i,&lt;t})}\n-\\log\\frac{\\pi_{ref}(o_{i,t}\\mid q,o_{i,&lt;t})}{\\pi_\\theta(o_{i,t}\\mid q,o_{i,&lt;t})}-1.</div>\n<p>这样做的直觉是把“该回答相对组内其他回答是否更好”和“新策略是否偏离参考模型过远”分开处理。前者决定学习方向，后者限制分布漂移，避免模型为了拿到规则奖励而走向不可读、语言混杂或 reward hacking 的区域。</p>\n<pre><code class=\"language-python\"># GRPO 核心训练伪代码\nfor iteration in range(num_iterations):\n    old_policy = policy.snapshot()\n    for prompts in dataloader:\n        groups = []\n        for q in prompts:\n            outputs = old_policy.sample(q, n=G)       # 同一问题采样 G 个回答\n            rewards = reward_fn(q, outputs)           # accuracy reward / format reward / reward model\n            advantages = (rewards - rewards.mean()) / (rewards.std() + 1e-8)\n            groups.append((q, outputs, advantages))\n\n        for _ in range(grpo_epochs):\n            loss = 0\n            for q, outputs, advantages in groups:\n                for i, output in enumerate(outputs):\n                    for t, token in enumerate(output):\n                        ratio = policy.prob(token, q, output[:t]) / old_policy.prob(token, q, output[:t])\n                        clipped = clip(ratio, 1 - eps, 1 + eps)\n                        surrogate = min(ratio * advantages[i], clipped * advantages[i])\n                        kl = kl_estimator(policy, ref_policy, token, q, output[:t])\n                        loss += -(surrogate - beta * kl)\n            optimizer.step(loss)\n</code></pre>\n<p>在 DeepSeek-R1-Zero 中，GRPO 和规则奖励结合得很紧密。accuracy reward 根据数学答案、代码测试等可验证信号给分，format reward 要求模型把推理过程和答案分别放在指定标签中。论文明确避免使用 outcome/process 神经奖励模型，因为大规模 RL 中神经 RM 容易被策略利用并产生 reward hacking，同时还要反复重训。GRPO 正好适合这种设置：每个 prompt 采多条候选，规则奖励快速打分，组内归一化后即可更新策略。</p>\n<p>与 PPO 相比，GRPO 的牺牲是 baseline 从“跨状态泛化的价值函数”变成了“当前 prompt 的采样统计量”。这会带来组大小 <span class=\"kb-math kb-math-inline\">G</span>、采样多样性和 reward 方差之间的权衡：<span class=\"kb-math kb-math-inline\">G</span> 太小，组均值/方差估计不稳定；<span class=\"kb-math kb-math-inline\">G</span> 太大，rollout 成本上升。但在 LLM 推理任务中，同一问题多采样本来就是常见做法，而且省掉 Critic 后总体工程复杂度显著下降，因此 GRPO 在 reasoning RL 中比标准 PPO 更容易扩展。</p>\n<div class=\"key-point\">💡 关键：GRPO 并不是简单“去掉 Value Model”。它用同 prompt 多响应比较把偏好数据和可验证奖励的相对性质转化为 advantage，从而保留 PPO 稳定更新的同时，大幅降低 RLHF/RLVR 的训练资源。</div>",
      "quiz": {
        "q": "GRPO 为什么可以不训练 PPO 中常见的 Critic/Value Model？",
        "options": [
          "因为 GRPO 完全不需要优势函数",
          "因为 GRPO 用同一 prompt 下多条回答的组内奖励均值和标准差估计优势",
          "因为 GRPO 只做监督学习，不进行策略梯度更新",
          "因为 GRPO 把 KL 正则全部删除了"
        ],
        "answer": 1,
        "explain": "GRPO 仍然需要优势函数和策略梯度，但优势由组内相对 reward 计算，不再依赖额外训练的价值网络。"
      }
    },
    {
      "id": "rto",
      "num": 13,
      "name": "强化Token优化 (RTO)",
      "fullName": "强化Token优化 (RTO)",
      "year": "2025",
      "org": "",
      "parent": "tdpo",
      "paperUrl": "https://arxiv.org/abs/2505.11058",
      "projectUrl": "",
      "category": "token_multimodal",
      "motivation": "MDP建模提取Token级奖励",
      "summary": "RTO 把 RLHF 从“整句只有一个最终奖励”的 bandit 问题改写成 token-level MDP，并用 DPO 模型与参考模型的逐 token 概率比提取密集奖励，再交给 PPO 优化。它解决了标准 PPO 只能依赖稀疏句级奖励、样本效率低且开源复现效果弱的问题，把 DPO 的离线偏好建模和 PPO 的在线策略改进连接起来。",
      "keyPoints": [
        "MDP 建模：状态 <span class=\"kb-math kb-math-inline\">s_h</span> 是 prompt 加已生成前缀，动作 <span class=\"kb-math kb-math-inline\">a_h</span> 是下一个 token，轨迹奖励按 token 累积。",
        "两阶段框架：先从偏好数据学习 token-wise reward，再用 PPO 等 RL 算法最大化该密集奖励。",
        "DPO 提取隐式 token 奖励：用 <span class=\"kb-math kb-math-inline\">\\beta\\log(\\pi_{dpo}(a_h|s_h)/\\pi_{ref}(a_h|s_h))</span> 表示 token 对偏好的贡献。",
        "与传统 PPO 区分：PPO 主要优化句级 reward model 的末端分数，RTO 把 DPO 产生的 token 信号作为 reward shaping 注入每一步。",
        "理论目标：在 MDP 设定下证明 token-wise 框架相对 sentence-wise bandit 有更好的可识别性和样本效率，并给出近最优策略学习保证。",
        "实验设定：基于 UltraFeedback 偏好数据，Llama-3-8B/SFT 初始化，在 AlpacaEval 2 与 Arena-Hard 上优于 PPO、DPO、R-DPO、SimPO、TDPO 等基线。"
      ],
      "detail": "<p><img alt=\"RTO 流程图\" src=\"https://arxiv.org/html/2404.18922v4/x1.png\" />\n<em>图：RTO Figure 1。传统 RLHF 在 bandit 框架下用 PPO 优化句级奖励；RTO 在 MDP 框架下先用 DPO 导出 token-level reward，再用 PPO 强化这些逐 token 信号。</em></p>\n<p>RTO 的出发点是指出经典 RLHF 的建模粒度过粗。若把一次回答 <span class=\"kb-math kb-math-inline\">y</span> 看成一个 action，整个问题就是 contextual bandit：策略一次性输出完整句子，reward model 只给终端分数。这种建模忽略了自回归解码的序列结构，也无法回答“是哪几个 token 让回答变好或变坏”。对于长回答，尤其是对话、推理和代码场景，句级 reward 会让 credit assignment 变得困难，PPO 需要从稀疏、延迟、高方差的反馈中学习。</p>\n<p>RTO 改用 token-level MDP：状态 <span class=\"kb-math kb-math-inline\">s_h=(x,y_{&lt;h})</span> 表示 prompt 和当前已生成前缀，动作 <span class=\"kb-math kb-math-inline\">a_h=y_h</span> 表示下一个 token，转移函数只是把 token 追加到上下文。偏好概率可写为两条轨迹累计奖励的 Bradley-Terry 比较：</p>\n<div class=\"kb-math kb-math-display\">\\mathbb P(\\tau^1\\succ\\tau^2)=\\sigma\\left(\\sum_{h=1}^{H}r(s_h^1,a_h^1)-\\sum_{h=1}^{H}r(s_h^2,a_h^2)\\right).</div>\n<p>这个形式把“人更喜欢哪条回答”拆成了每个 token 的局部贡献之和。RTO 的关键洞察是：DPO 虽然从响应级偏好推导出来，但其最优策略与参考策略的 log-ratio 本身可以解释为隐式 reward。对于某个 token，DPO 模型给出的密集奖励为：</p>\n<div class=\"kb-math kb-math-display\">r_{DPO}(s_h,a_h)=\\beta_1\\log\\frac{\\pi_{dpo}(a_h\\mid s_h)}{\\pi_{ref}(a_h\\mid s_h)}.</div>\n<p>沿轨迹求和后得到</p>\n<div class=\"kb-math kb-math-display\">\\sum_{h=1}^{H}r_{DPO}(s_h,a_h)\n=\\beta_1\\log\\frac{\\pi_{dpo}(y\\mid x)}{\\pi_{ref}(y\\mid x)}.</div>\n<p>直觉上，如果 DPO 模型相比参考模型更愿意生成某个 token，那么该 token 更可能与偏好方向一致；如果 DPO 明显压低其概率，则该 token 可能是负贡献。这样，DPO 从“直接偏好优化算法”变成了“token reward estimator”。RTO 再把这些密集奖励接入 PPO，使策略能够在生成过程中逐步收到反馈，而不是等到回答结束才得到一个总分。</p>\n<pre><code class=\"language-python\"># RTO Practical Version 的简化伪代码\n# 输入：离线偏好数据 D、参考模型 pi_ref、DPO 算法、PPO trainer\npi_dpo = train_dpo(pi_ref, D)          # 用偏好对训练 DPO oracle\npolicy = pi_ref.copy()                 # PPO/RL 阶段的初始策略\n\nfor step in range(T):\n    prompts = sample_prompts(D)\n    rollouts = []\n    for x in prompts:\n        y = policy.generate(x)\n        token_rewards = []\n        for h, token in enumerate(y):\n            state = (x, y[:h])\n            dpo_reward = beta1 * log(pi_dpo.prob(token, state) / pi_ref.prob(token, state))\n            kl_penalty = -beta2 * log(policy.prob(token, state) / pi_ref.prob(token, state))\n            token_rewards.append(dpo_reward + kl_penalty)\n        token_rewards[-1] += sentence_reward_model(x, y)  # 实践中可叠加句级 r_MLE\n        rollouts.append((x, y, token_rewards))\n\n    policy = ppo_update(policy, rollouts)                 # 用密集 token reward 更新策略\n</code></pre>\n<p>RTO 与“先 DPO 再 PPO”的简单串联不同。简单串联只是把 DPO 模型当成 PPO 的初始化点；RTO 是把 DPO 模型固定为 reward provider，让它在每个 token 位置给出 log-ratio 奖励。论文的实用版本还叠加一个句级 reward <span class=\"kb-math kb-math-inline\">r_{MLE}(x,y)</span>，用于保留传统 reward model 对整体质量的判断；DPO reward 的作用更像 reward shaping：它改变奖励在 token 维度上的分布，让 PPO 的 advantage 更容易定位到具体片段。论文的消融结论也强调，RTO 的收益主要来自这种 shaping，而不是简单用 DPO 隐式奖励替代句级 reward。</p>\n<p>把 DPO 和 PPO放在一起看，RTO 的优势更清楚。DPO 是离线直接优化，它稳定、省资源，但更新受限于已有偏好对，不会在线探索策略生成的新分布；PPO 可以在线采样和改进策略，但如果 reward 只有句级终端分数，训练信号稀疏且实现敏感。RTO 用 DPO 学到的偏好方向构造 dense reward，再用 PPO 做在线策略改进，相当于让 DPO 提供局部地图，让 PPO 负责沿着这张地图继续搜索。</p>\n<p>理论部分服务于同一个主张：LLM 解码天然是序列决策，不应被压缩为单步 bandit。MDP 视角可以区分不同前缀下同一 token 的贡献，也可以把偏好比较转化为轨迹累计 reward 的比较。只要 token reward 学得足够好，PPO/策略优化就不必从纯终端分数中反推所有 token 的责任，样本效率自然更好。实践结果与这个判断一致：论文在 AlpacaEval 2 和 Arena-Hard 上报告 RTO 相比 PPO 有明显提升，尤其体现了密集 token reward 对开放式对话生成的优化价值。</p>\n<div class=\"warn-box\">⚠️ 注意：RTO 不是把每个 token 都人工标注奖励，而是用 DPO 模型和参考模型的概率比自动估计 reward。它的质量取决于偏好数据、DPO 训练质量以及参考模型是否合适。</div>",
      "quiz": {
        "q": "RTO 中 DPO 模型的核心作用是什么？",
        "options": [
          "替代语言模型的 tokenizer",
          "作为逐 token 隐式奖励估计器，为 PPO 提供密集 reward shaping",
          "只负责在推理时重排序最终答案",
          "删除 PPO 中的 KL 约束"
        ],
        "answer": 1,
        "explain": "RTO 使用 DPO 模型相对参考模型的 token log-ratio 构造奖励，再用 PPO 对这些 token-level signals 进行策略优化。"
      }
    },
    {
      "id": "sepo",
      "num": 14,
      "name": "选择性偏好优化 (SePO)",
      "fullName": "选择性偏好优化 (SePO)",
      "year": "2025",
      "org": "",
      "parent": "tdpo",
      "paperUrl": "https://aclanthology.org/2025.emnlp-main.359/",
      "projectUrl": "",
      "category": "token_multimodal",
      "motivation": "选择性优化关键Token降低成本",
      "summary": "SePO 提出用 DPO 训练出的 oracle model 估计 token-level reward，只选择 chosen 回答中高贡献 token 和 rejected 回答中低贡献 token 来做偏好优化。它解决了 token-level alignment 全量优化噪声大、关键 token 选择昂贵的问题，用少量关键 token 保持甚至提升对齐效果。",
      "keyPoints": [
        "DPO 作为 token reward estimator：通过 oracle model 与 reference model 的 log-ratio 估计每个 token 的偏好贡献。",
        "三阶段流程：训练 ref-oracle 模型对、对目标偏好数据打分并选择 key tokens、用 reference-free contrastive objective 训练目标 policy。",
        "选择性监督：chosen response 选择 reward 最高的 top-<span class=\"kb-math kb-math-inline\">k_w</span> token，rejected response 选择 reward 最低的 top-<span class=\"kb-math kb-math-inline\">k_l</span> token。",
        "低成本适配：oracle model 可用较小模型和中等规模数据训练，选择出的 token 子集可被多个更强 policy model 复用。",
        "目标函数去 reference model 化：最终 policy 训练只对 selected tokens 的归一化 log-likelihood 做对比，不再在目标函数中显式调用 reference model。",
        "实验结论：在 AlpacaEval 2、Arena-Hard、MT-Bench 等评测中，SePO 用约 30% key tokens 超过多种全量 token/response-level 偏好优化基线，并支持 weak-to-strong generalization。"
      ],
      "detail": "<p><img alt=\"SePO 三阶段流程图\" src=\"https://arxiv.org/html/2408.13518v2/x1.png\" />\n<em>图：SePO Figure 2。流程包括：用 ref-oracle pair 参数化 token-level reward、在目标偏好数据中选择关键 token、只用 selected tokens 训练 policy model。ACL 正式版与 arXiv HTML 为同一论文内容。</em></p>\n<p>SePO 的问题意识非常具体：现有 token-level preference optimization 往往默认“所有 token 都值得优化”，但语言生成中的偏好贡献高度不均匀。一个 chosen response 中真正决定质量的可能是少数关键事实、推理步骤或格式 token；一个 rejected response 中真正该压低概率的也往往是少数错误、幻觉或不合规片段。全量 token 优化会把大量中性 token 也纳入梯度，既增加训练成本，也可能引入噪声和长度偏置。SePO 因此把核心任务改成：如何在只有 response-level preference 标注的情况下，便宜地找出 token-level key supervision。</p>\n<p>论文首先把 LLM 解码形式化为 token-level MDP：状态 <span class=\"kb-math kb-math-inline\">s_t</span> 是 prompt 与当前前缀，动作 <span class=\"kb-math kb-math-inline\">a_t</span> 是下一个 token，轨迹 reward 可分解为 token reward 的和：</p>\n<div class=\"kb-math kb-math-display\">r(q,\\tau)=\\sum_{t=1}^{T}\\hat r(s_t,a_t).</div>\n<p>在这个假设下，DPO 训练得到的 oracle policy 与 reference policy 的概率比可作为 token reward 的估计：</p>\n<div class=\"kb-math kb-math-display\">\\hat r(s_t,a_t)\\propto \\log\\frac{\\pi^*(a_t\\mid s_t)}{\\pi_{ref}(a_t\\mid s_t)}.</div>\n<p>SePO 的 oracle modeling 就是把这个结论落地。先用偏好数据训练 reference model <span class=\"kb-math kb-math-inline\">\\pi_{ref}</span> 和 oracle model <span class=\"kb-math kb-math-inline\">\\pi_{ora}</span>：reference 通常通过 SFT 得到，oracle 在 reference 基础上通过 DPO 学习偏好方向。随后，对任意目标样本 <span class=\"kb-math kb-math-inline\">(q,y)</span>，每个 token 的分数是：</p>\n<div class=\"kb-math kb-math-display\">s(y_i)=\\log\\frac{\\pi_{ora}(y_i\\mid q,y_{&lt;i})}{\\pi_{ref}(y_i\\mid q,y_{&lt;i})}.</div>\n<p>如果 <span class=\"kb-math kb-math-inline\">s(y_i)</span> 高，说明 oracle 相比 reference 更倾向生成该 token，它在 chosen response 中通常是正向贡献；如果 <span class=\"kb-math kb-math-inline\">s(y_i)</span> 低，说明 oracle 压低该 token，它在 rejected response 中通常是负向贡献。于是 SePO 对 chosen 选最高 <span class=\"kb-math kb-math-inline\">k_w\\%</span>，对 rejected 选最低 <span class=\"kb-math kb-math-inline\">k_l\\%</span>：</p>\n<div class=\"kb-math kb-math-display\">\\mathbb I_k^w(y_i)=\n\\begin{cases}\n1,&amp; s(y_i)\\text{ ranks in highest }k\\%\\text{ in }y\\\\\n0,&amp; \\text{otherwise}\n\\end{cases}</div>\n<p>rejected 的 <span class=\"kb-math kb-math-inline\">\\mathbb I_k^l</span> 则把条件改成 lowest <span class=\"kb-math kb-math-inline\">k\\%</span>。这一步是 SePO 降本的关键，因为之后训练 policy 时只需要对这些 selected tokens 求梯度。论文中常用的设定是选择约 30% key tokens；这比全量 token 少很多，但仍覆盖了偏好差异最集中的片段。</p>\n<pre><code class=\"language-python\"># SePO 核心流程伪代码\n# D_oracle: 用于训练 oracle 的偏好数据；D_target: 目标 policy 的偏好数据\npi_ref = train_sft(chosen_responses(D_oracle))\npi_ora = train_dpo(pi_ref, D_oracle)\n\nselected_dataset = []\nfor q, y_w, y_l in D_target:\n    scores_w = [log(pi_ora.prob(tok, q, y_w[:i]) / pi_ref.prob(tok, q, y_w[:i]))\n                for i, tok in enumerate(y_w)]\n    scores_l = [log(pi_ora.prob(tok, q, y_l[:i]) / pi_ref.prob(tok, q, y_l[:i]))\n                for i, tok in enumerate(y_l)]\n\n    I_w = top_k_mask(scores_w, ratio=k_w, largest=True)      # chosen: 最高 reward token\n    I_l = top_k_mask(scores_l, ratio=k_l, largest=False)     # rejected: 最低 reward token\n    selected_dataset.append((q, y_w, y_l, I_w, I_l))\n\nfor batch in selected_dataset:\n    u_w = selected_logprob(policy, q, y_w, I_w, gamma)\n    u_l = selected_logprob(policy, q, y_l, I_l, gamma)\n    loss = -log_sigmoid(u_w - u_l - margin_lambda)\n    optimizer.step(loss)\n</code></pre>\n<p>最终的 SePO 目标函数是一个只作用于 selected tokens 的对比式偏好目标：</p>\n<div class=\"kb-math kb-math-display\">\\mathcal L_{SePO}\n=-\\mathbb E_{(q,y_w,y_l)\\sim\\mathcal D}\\log\\sigma\\left(\n\\hat u(q,y_w,\\mathbb I^w_{k_w})-\n\\hat u(q,y_l,\\mathbb I^l_{k_l})-\\lambda\n\\right),</div>\n<p>其中</p>\n<div class=\"kb-math kb-math-display\">\\hat u(q,y,\\mathbb I_k)=\n\\frac{\\gamma}{|y|\\cdot k\\%}\\sum_{i=1}^{|y|}\\mathbb I_k(y_i)\n\\log\\pi_\\theta(y_i\\mid q,y_{&lt;i}).</div>\n<p>这个设计有两个细节值得注意。第一，<span class=\"kb-math kb-math-inline\">\\hat u</span> 对选择比例和长度做归一化，避免“选更多 token”或“生成更长回答”天然获得更大 log-likelihood 总量。第二，目标函数形式接近 SimPO/contrastive preference optimization，但它的对比单元不是整句平均 log-prob，而是 oracle 挑出来的关键 token 子集，因此梯度更集中。</p>\n<p>SePO 与 RTO/TDPO 的关系也很清楚。RTO 把 DPO log-ratio 作为 dense reward，再用 PPO 在线优化；TDPO 更直接地把偏好优化拆到 token 级。SePO 则进一步问：既然 token reward 有强弱之分，为什么还要优化所有 token？它用 oracle model 做一次离线 token selection，之后可以复用这个选择结果训练不同大小的 policy model。论文的 weak-to-strong 实验说明，小 oracle 选出的 key tokens 可以监督更强的 policy；这使 SePO 不只是一个训练目标，也是一种把弱监督信号提纯后迁移给强模型的数据处理框架。</p>\n<div class=\"key-point\">💡 关键：SePO 的“选择性”不是随机裁剪训练 token，而是基于 DPO 隐式 reward 的有方向选择：强化 chosen 中最能解释偏好的 token，压低 rejected 中最能解释失败的 token。</div>",
      "quiz": {
        "q": "SePO 选择 rejected response 中 key tokens 的原则是什么？",
        "options": [
          "选择 oracle-reference log-ratio 最高的 token",
          "随机选择固定比例 token",
          "选择 oracle-reference log-ratio 最低的 token",
          "只选择回答末尾的 EOS token"
        ],
        "answer": 2,
        "explain": "SePO 认为 rejected 中 reward 最低的 token 最可能导致偏好失败，因此选择这些 token 来抑制目标 policy 的生成概率。"
      }
    },
    {
      "id": "llmdoctor",
      "num": 15,
      "name": "LLM医生 (LLMdoctor)",
      "fullName": "LLM医生 (LLMdoctor)",
      "year": "2026.01",
      "org": "",
      "parent": "tdpo",
      "paperUrl": "https://arxiv.org/abs/2601.10416",
      "projectUrl": "",
      "category": "token_multimodal",
      "motivation": "流引导Token级测试时对齐",
      "summary": "LLMdoctor 提出了一个 patient-doctor 式测试时对齐框架：先从冻结大模型自身的正负行为变体中抽取 token 级偏好奖励，再用 token-level flow-guided preference optimization (TFPO) 训练小型 doctor 模型，在推理时逐 token 引导大模型生成。它主要解决传统轨迹级奖励信号粗糙、采样开销大、以及小奖励模型容易把大模型能力上限“拉低”的问题。",
      "keyPoints": [
        "三阶段框架：Token-Level Reward Acquisition → TFPO-Based Fine-Grained Preference Tuning → Online Alignment。",
        "Patient-doctor 结构：大规模 patient LLM 保持冻结，小规模 doctor 模型学习 token 级偏好流，并在推理时提供奖励引导。",
        "Token 级奖励来自同一个 patient 模型的 positive face 与 negative face 行为变体，而不是额外训练轨迹级 reward model。",
        "用正负行为变体的 log-likelihood gap 衡量 token 的判别性，并用 sparsity threshold 只保留真正影响偏好的 token。",
        "TFPO 把偏好监督从完整 response 扩展到所有 subtrajectory，通过 Subtrajectory Balance 约束学习流一致性。",
        "推理时用几何混合分布把 base distribution 与 doctor reward distribution 结合，可通过 <span class=\"kb-math kb-math-inline\">\\alpha</span>、<span class=\"kb-math kb-math-inline\">\\beta</span> 调整流畅性和偏好强度。",
        "支持多维偏好控制：多个 doctor 或多个 reward head 的权重 <span class=\"kb-math kb-math-inline\">\\beta_i</span> 可以在测试时动态调整，无需重训 patient。"
      ],
      "detail": "<p><img alt=\"LLMdoctor 整体框架\" src=\"https://ar5iv.labs.arxiv.org/html/2601.10416/assets/x2.png\" />\n<em>图：LLMdoctor 的整体框架。大模型作为 patient 提供行为差异与最终生成能力，小模型作为 doctor 学习 token 级流引导信号并在测试时介入解码。</em></p>\n<p>LLMdoctor 的出发点是：很多测试时对齐方法虽然避免了重新微调大模型，但仍依赖轨迹级 reward。轨迹级 reward 只能告诉模型“整段回答好/不好”，无法说明哪些 token 真正贡献了 helpfulness、harmlessness 或礼貌性。论文指出，这会造成 reward-budget distortion：为了让偏好回答总分更高，模型可能把奖励机械地摊到大量中性词上，例如连接词或常见功能词，从而稀释真正关键 token 的信号。LLMdoctor 反过来让冻结的大模型自己暴露判别性：同一模型通过 prompt conditioning 形成 positive face 与 negative face，然后比较二者对每个 token 的条件概率。</p>\n<p>Token 级奖励获取过程可以写成三步。给定偏好数据 <span class=\"kb-math kb-math-inline\">\\mathcal{D}=\\{(x^{(i)}, y_+^{(i)}, y_-^{(i)})\\}_{i=1}^N</span>，对 response 中每个 token <span class=\"kb-math kb-math-inline\">y_t</span>，分别计算正向行为变体和负向行为变体的 log-probability：</p>\n<div class=\"kb-math kb-math-display\">\\ell_t^{\\text{pos}}=\\log \\pi^{\\text{pos}}(y_t\\mid x,y_{&lt;t}),\\quad\n\\ell_t^{\\text{neg}}=\\log \\pi^{\\text{neg}}(y_t\\mid x,y_{&lt;t}).</div>\n<p>两者绝对差 <span class=\"kb-math kb-math-inline\">\\Delta_t=|\\ell_t^{\\text{pos}}-\\ell_t^{\\text{neg}}|</span> 表示该 token 对“好行为/坏行为”区分的贡献。之后做长度归一化和平滑：</p>\n<div class=\"kb-math kb-math-display\">\\widehat{\\Delta}_t = \\frac{\\Delta_t}{\\operatorname{mean}_j(\\Delta_j)+\\varepsilon},\\quad\nS_t=\\tanh\\left(\\frac{\\widehat{\\Delta}_t}{\\tau}\\right).</div>\n<p>最终 token reward 结合人类偏好标签的方向：</p>\n<div class=\"kb-math kb-math-display\">r_t = \\operatorname{sign}(y)\\cdot S_t\\cdot \\mathbf{1}[S_t&gt;\\theta].</div>\n<p>这里 <span class=\"kb-math kb-math-inline\">\\operatorname{sign}(y)=+1</span> 对应 preferred response，<span class=\"kb-math kb-math-inline\">-1</span> 对应 rejected response；<span class=\"kb-math kb-math-inline\">\\theta</span> 是稀疏阈值。直觉上，LLMdoctor 并不要求每个 token 都背负奖励，而是只给能显著区分正负行为模式的 token 分配非零信号。论文的附录还从信息论角度解释了该指标：log-likelihood gap 与两个行为策略之间 KL divergence 的 token 级贡献相关，因此高 gap token 往往是最能区分 desired/undesired behavior 的位置。</p>\n<p>有了 token reward 之后，doctor 模型不是简单做 token 分类，而是用 TFPO 学习“前缀流”。设前缀状态 <span class=\"kb-math kb-math-inline\">s_t=(y_1,\\dots,y_t)</span>，doctor 的策略为 <span class=\"kb-math kb-math-inline\">\\hat{\\pi}_\\theta(y_{t+1}\\mid s_t)</span>，并带一个 value head <span class=\"kb-math kb-math-inline\">V_\\phi(s_t)</span>。论文把状态流定义为：</p>\n<div class=\"kb-math kb-math-display\">F(s_t)=Q(s_t)\\cdot V_\\phi(s_t),</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">Q(s_t)</span> 是由前缀内 token reward 聚合得到的正权重。TFPO 借鉴 GFlowNet 的 Subtrajectory Balance：对任意子轨迹 <span class=\"kb-math kb-math-inline\">s_m\\to s_n</span>，前向生成概率应与流比值匹配。在采用均匀 backward policy 后，约束为：</p>\n<div class=\"kb-math kb-math-display\">Q(s_m)V_\\phi(s_m)\\prod_{k=m}^{n-1}\\hat{\\pi}_\\theta(y_{k+1}\\mid s_k)=Q(s_n)V_\\phi(s_n).</div>\n<p>取对数后得到可训练的 SubTB loss：</p>\n<div class=\"kb-math kb-math-display\">\\mathcal{L}_{\\text{SubTB}}\n=\\sum_{\\tau\\in\\mathcal{D}_{pref}}\\sum_{0\\le m&lt;n\\le L_\\tau}\n\\left(\n\\log\\frac{Q(s_n)V_\\phi(s_n)}{Q(s_m)V_\\phi(s_m)}\n-\\sum_{k=m}^{n-1}\\log\\hat{\\pi}_\\theta(y_{k+1}\\mid s_k)\n\\right)^2.</div>\n<p>该目标的关键不是只最大化最高奖励路径，而是让采样分布与 reward-proportional distribution 对齐。论文用 GFlowNet 的性质说明：当 SubTB loss 为 0 时，<span class=\"kb-math kb-math-inline\">\\pi_\\theta(\\tau)\\propto R(\\tau)</span>，因此多个高质量轨迹都能保留概率质量，这比标准 RL 的 mode-seeking 目标更不容易牺牲多样性。</p>\n<p>TFPO 还加入 value discrimination loss。若在同一前缀下 token <span class=\"kb-math kb-math-inline\">y_w</span> 比 <span class=\"kb-math kb-math-inline\">y_l</span> 更偏好，value head 需要拉开 margin：</p>\n<div class=\"kb-math kb-math-display\">\\mathcal{L}_{\\text{value}}(V_\\phi)=\\max\\left(0,\\gamma-(V_\\phi(s_t,y_w)-V_\\phi(s_t,y_l))\\right).</div>\n<p>整体训练目标为：</p>\n<div class=\"kb-math kb-math-display\">\\mathcal{L}_{\\text{TFPO}}=\\mathcal{L}_{\\text{SubTB}}(\\hat{\\pi}_\\theta,V_\\phi)+\\lambda\\mathcal{L}_{\\text{value}}(V_\\phi).</div>\n<p>这使 doctor 不只是判断“当前 token 好不好”，还学习一个具有前瞻性的 token continuation flow：某个 token 的价值取决于它通向哪些后续子轨迹，而不是只看局部概率。</p>\n<p>推理阶段，patient 仍是主生成模型，doctor 只作为 flow-guided reward model 输出每个候选 next token 的 preference log-probability。解码分布采用几何混合：</p>\n<div class=\"kb-math kb-math-display\">\\pi_{\\text{decode}}(y_{t+1}\\mid s_t)\\propto\n[\\pi_{\\text{base}}(y_{t+1}\\mid s_t)]^{\\alpha}\n[\\pi_r(y_{t+1}\\mid s_t)]^{\\beta}.</div>\n<p><span class=\"kb-math kb-math-inline\">\\alpha</span> 控制保留 patient 原始语言能力的程度，<span class=\"kb-math kb-math-inline\">\\beta</span> 控制 doctor 的偏好引导强度。相比“生成多条完整回答再打分”的轨迹级方法，这里每步只需 patient 与 doctor 各一次前向即可获得候选 token 分布，因此更适合测试时对齐。多维偏好时，解码可扩展为 <span class=\"kb-math kb-math-inline\">\\prod_i[\\pi_r^{(i)}]^{\\beta_i}</span>，从而在不重训大模型的情况下临时调节 helpfulness、harmlessness 等目标。</p>\n<pre><code class=\"language-python\"># LLMdoctor / TFPO 简化伪代码\n# 输入：preference dataset D={(x, y_plus, y_minus)}, frozen patient pi_sft, small doctor pi_theta\n\n# 1. Token-level reward acquisition\nfor x, y_plus, y_minus in D:\n    for y, label in [(y_plus, +1), (y_minus, -1)]:\n        for t, token in enumerate(y):\n            l_pos = logprob(pi_sft.with_prompt(&quot;positive face&quot;), token, x, y[:t])\n            l_neg = logprob(pi_sft.with_prompt(&quot;negative face&quot;), token, x, y[:t])\n            delta[t] = abs(l_pos - l_neg)\n        S = tanh((delta / (mean(delta) + eps)) / tau)\n        r = label * S * (S &gt; theta)\n        store_token_rewards(x, y, r)\n\n# 2. Train doctor with token-level flow-guided preference optimization\nfor batch in reward_annotated_sequences:\n    for trajectory in batch:\n        compute_prefix_scores_Q_from_token_rewards(trajectory)\n        for every subtrajectory s_m -&gt; s_n:\n            flow_ratio = log(Q[s_n] * V_phi[s_n] / (Q[s_m] * V_phi[s_m]))\n            policy_logprob = sum(log pi_theta(y[k+1] | s_k) for k in range(m, n))\n            L_subtb += (flow_ratio - policy_logprob) ** 2\n        L_value += margin_ranking_loss(V_phi, preferred_tokens, rejected_tokens)\n    update(theta, phi, L_subtb + lambda_ * L_value)\n\n# 3. Online alignment\nfor decoding_step in generation:\n    p_base = patient.next_token_distribution(prefix)\n    p_reward = doctor.next_token_distribution(prefix)\n    p_decode = normalize((p_base ** alpha) * (p_reward ** beta))\n    token = sample_or_argmax(p_decode)\n</code></pre>\n<div class=\"key-point\">💡 关键：LLMdoctor 的“医生”不是替换大模型，而是学习一种 token 级偏好流，在每一步给 patient 的 next-token distribution 加偏好方向；大模型知识和语言能力仍主要来自 patient。</div>",
      "quiz": {
        "q": "LLMdoctor 为什么要用 positive face 与 negative face 的 log-likelihood gap 来构造 token 级奖励？",
        "options": [
          "为了让 doctor 模型复制 patient 的完整输出分布",
          "为了识别真正区分好坏行为的 token，避免把轨迹级奖励平均摊到中性 token 上",
          "为了减少 vocabulary size，使推理时只保留高频词",
          "为了用 beam search 替代采样，提高解码速度"
        ],
        "answer": 1,
        "explain": "log-likelihood gap 衡量同一 patient 在正负行为模式下对 token 的判别差异；再加稀疏阈值后，只强化真正影响偏好的 token。"
      }
    },
    {
      "id": "triplay_rl",
      "num": 16,
      "name": "三角色自博弈RL (TriPlay-RL)",
      "fullName": "三角色自博弈RL (TriPlay-RL)",
      "year": "2026.01",
      "org": "",
      "parent": "grpo",
      "paperUrl": "https://arxiv.org/abs/2601.18292",
      "projectUrl": "",
      "category": "rl_based",
      "motivation": "多角色自博弈安全对齐",
      "summary": "TriPlay-RL 提出了由攻击者、守卫者和评估器组成的三角色闭环强化学习框架，通过交替更新 \\(M_{\\mathrm{Red}}\\)、\\(M_{\\mathrm{Blue}}\\)、\\(M_{\\mathrm{Eval}}\\) 实现低人工标注成本的安全自博弈对齐。它解决了传统红队/防御训练角色孤立、攻击模式坍缩、评估标准静态且易被 reward hacking 的问题。",
      "keyPoints": [
        "三角色闭环：<span class=\"kb-math kb-math-inline\">M_{\\mathrm{Red}}</span> 生成 adversarial prompts，<span class=\"kb-math kb-math-inline\">M_{\\mathrm{Blue}}</span> 生成安全响应，<span class=\"kb-math kb-math-inline\">M_{\\mathrm{Eval}}</span> 对响应做细粒度评估。",
        "三阶段交替更新：<span class=\"kb-math kb-math-inline\">P_{\\mathrm{Red}}\\rightarrow P_{\\mathrm{Blue}}\\rightarrow P_{\\mathrm{Eval}}</span>，每个阶段只更新一个角色，其余角色作为环境或监督来源。",
        "每个角色训练都采用 GRPO-based RLVR，使奖励可验证并避免强依赖人工偏好标注。",
        "红队奖励由语义保持奖励、攻击成功奖励、多模型泛化攻击奖励和多样性惩罚组成。",
        "蓝队采用三档响应评价：negative、rejective、positive，鼓励安全且有帮助的回答，而不是简单拒绝。",
        "评估器通过多专家多数投票构造三分类数据，区分 unsafe response、simple refusal 和 useful guidance。",
        "论文报告红队 adversarial effectiveness 提升约 20%-50%，蓝队 safety performance 提升约 10%-30%，同时保持 general reasoning capability。"
      ],
      "detail": "<p><img alt=\"TriPlay-RL 三角色闭环\" src=\"https://ar5iv.labs.arxiv.org/html/2601.18292/assets/x1.png\" />\n<em>图：TriPlay-RL 的攻击者、守卫者、评估器闭环。红队产生攻击提示，蓝队响应，评估器给出奖励，三者交替进化。</em></p>\n<p>TriPlay-RL 的核心判断是：LLM 安全对齐不应只优化一个静态防御模型。现实中的攻击者会随着防御变化而调整策略，防御模型也需要从最新攻击中学习，而评估器如果固定不变，又会变成可被利用的 reward loophole。因此论文把安全训练拆成三个互相施压的角色：红队 <span class=\"kb-math kb-math-inline\">M_{\\mathrm{Red}}</span> 负责把基础有害请求包装成更难防的 adversarial prompt；蓝队 <span class=\"kb-math kb-math-inline\">M_{\\mathrm{Blue}}</span> 必须在这些攻击下给出安全、拒绝或建设性指导；评估器 <span class=\"kb-math kb-math-inline\">M_{\\mathrm{Eval}}</span> 则不断学习更细粒度地区分 unsafe、simple refusal 与 safe-helpful response。</p>\n<p>训练不是同时更新三个模型，而是交替阶段式更新：<span class=\"kb-math kb-math-inline\">P_{\\mathrm{Red}}</span>、<span class=\"kb-math kb-math-inline\">P_{\\mathrm{Blue}}</span>、<span class=\"kb-math kb-math-inline\">P_{\\mathrm{Eval}}</span>。在 <span class=\"kb-math kb-math-inline\">P_{\\mathrm{Red}}</span> 中，蓝队和评估器提供攻击反馈，红队通过 GRPO/RLVR 变强；在 <span class=\"kb-math kb-math-inline\">P_{\\mathrm{Blue}}</span> 中，红队固定为最近一轮攻击分布，蓝队学习防御；在 <span class=\"kb-math kb-math-inline\">P_{\\mathrm{Eval}}</span> 中，用红蓝对抗过程中产生的 <span class=\"kb-math kb-math-inline\">\\langle prompt,response\\rangle</span> 数据和多专家投票标签更新评估器。这种闭环的价值在于避免“离线安全集过拟合”：训练数据、攻击强度、评价边界都随迭代变化。</p>\n<p>红队奖励函数设计得相对细。首先是 semantic reward，确保包装后的 adversarial prompt 仍保留原始请求的核心语义和攻击目标，避免红队为了得分生成偏题文本。其次是 diversity penalty，针对已成功攻击池 ASP 中的历史 prompts，分别用 Self-BLEU 和 embedding cosine similarity 惩罚重复模式：</p>\n<div class=\"kb-math kb-math-display\">B_{\\text{selfBLEU}}(x)=-\\sum_{n=1}^{K}\\operatorname{SelfBLEU}_{\\mathcal{X}}(x,n),</div>\n<div class=\"kb-math kb-math-display\">B_{\\text{Cos}}(x)=-\\sum_{x&#x27;\\in\\mathcal{X}}\\frac{\\phi(x)\\cdot\\phi(x&#x27;)}{\\|\\phi(x)\\|^2\\|\\phi(x&#x27;)\\|^2}.</div>\n<p>论文再用非线性函数 <span class=\"kb-math kb-math-inline\">y(x)=e^{kx}-1</span> 放大高相似度惩罚，并组合为：</p>\n<div class=\"kb-math kb-math-display\">P_{\\text{div}}=w_{\\text{B}}y(B_{\\text{selfBLEU}}(x))+w_{\\text{C}}y(B_{\\text{Cos}}(x)).</div>\n<p>这相当于给红队加一个“不要只会同一种 jailbreak 模板”的约束。实验附录给出的典型参数是 <span class=\"kb-math kb-math-inline\">w_B=2</span>、<span class=\"kb-math kb-math-inline\">w_C=4</span>，n-gram 取 3、4、5。</p>\n<p>为了让红队攻击具有跨模型泛化性，TriPlay-RL 不只攻击当前蓝队，还把 Llama、ChatGLM 等其他防御模型纳入奖励。红队总奖励写成：</p>\n<div class=\"kb-math kb-math-display\">R_{\\text{total}}=\n\\sum_{i=1}^{n}w_i\\left[\\sum_{r\\in\\{0,1,2\\}}R_r\\cdot\\mathbf{1}_{[r]}\\right]\n+R_{\\text{sem}}-P_{\\text{div}}.</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">i</span> 遍历不同 defense model，<span class=\"kb-math kb-math-inline\">w_i</span> 是模型权重，<span class=\"kb-math kb-math-inline\">r</span> 表示攻击结果类型。论文附录中 <span class=\"kb-math kb-math-inline\">M_{blue}</span> 权重为 0.6，Meta-Llama-3.1-8B-Instruct 和 GLM-4.6 各 0.2。这种多目标奖励避免红队只钻单个防御模型漏洞。</p>\n<p>蓝队不是被训练成“看到风险就拒绝”的保守模型。论文采用三档评价标准：</p>\n<div class=\"kb-math kb-math-display\">s=\\begin{cases}\nnegative &amp; \\text{if } r \\text{ contains safety risks},\\\\\nrejective &amp; \\text{if } r \\text{ is simple refusal},\\\\\npositive &amp; \\text{if } r \\text{ is safe and helpful}.\n\\end{cases}</div>\n<p>对应 reward 为：</p>\n<div class=\"kb-math kb-math-display\">\\operatorname{Reward}_i=\\begin{cases}\n-1 &amp; \\text{if } s_i=negative,\\\\\n0 &amp; \\text{if } s_i=rejective,\\\\\n1 &amp; \\text{if } s_i=positive.\n\\end{cases}</div>\n<p>这个设计很重要：简单拒绝只有 0 分，安全且有用才是正分。因此 <span class=\"kb-math kb-math-inline\">M_{\\mathrm{Blue}}</span> 被鼓励在安全边界内提供 constructive guidance，而不是为了安全牺牲所有 utility。它直接对应论文的目标：提升安全能力同时尽量保持通用推理能力。</p>\n<p>评估器 <span class=\"kb-math kb-math-inline\">M_{\\mathrm{Eval}}</span> 是闭环稳定性的关键。若 evaluator 太弱，红队和蓝队都会学会利用其偏差；若 evaluator 只做二分类，蓝队可能退化成全拒绝。因此论文将评估器训练成三分类器，并使用多专家多数投票构造标签。安全专家先判断 safe/unsafe，utility experts 再把安全响应细分成 rejective 或 positive，最终得到 <span class=\"kb-math kb-math-inline\">\\langle prompt,response,C\\rangle</span>，其中 <span class=\"kb-math kb-math-inline\">C\\in\\{negative,rejective,positive\\}</span>。这让 evaluator 的奖励信号与蓝队目标一致，也缓解单一 LLM judge 被 reward hacking 的问题。</p>\n<pre><code class=\"language-python\"># TriPlay-RL 简化伪代码\n# 三个模型：M_red attacker, M_blue defender, M_eval evaluator\n# 每轮依次执行 P_red, P_blue, P_eval；每个阶段使用 GRPO/RLVR 更新当前角色\n\nfor iteration in range(num_iterations):\n    # P_red: train attacker with fixed defender/evaluator\n    for harmful_seed in seed_prompts:\n        adv_prompt = M_red.wrap(harmful_seed)\n        responses = [defense_model(adv_prompt) for defense_model in [M_blue, llama_target, glm_target]]\n        eval_scores = [M_eval(adv_prompt, resp) for resp in responses]\n        R_sem = semantic_judge(harmful_seed, adv_prompt)\n        P_div = diversity_penalty(adv_prompt, attack_success_pool)\n        R_red = weighted_attack_reward(eval_scores) + R_sem - P_div\n        update_with_grpo(M_red, adv_prompt, R_red)\n        store_prompt_response_pairs(adv_prompt, responses)\n\n    # P_blue: train defender against newest red distribution\n    for adv_prompt in sample_from_latest(M_red):\n        response = M_blue(adv_prompt)\n        label = M_eval.classify(adv_prompt, response)  # negative / rejective / positive\n        R_blue = {-1: &quot;negative&quot;, 0: &quot;rejective&quot;, 1: &quot;positive&quot;}[label]\n        update_with_grpo(M_blue, response, R_blue)\n\n    # P_eval: refresh evaluator with multi-expert majority labels\n    labeled_data = majority_vote_experts(collected_prompt_response_pairs)\n    supervised_or_rl_update(M_eval, labeled_data)\n</code></pre>\n<div class=\"key-point\">💡 关键：TriPlay-RL 的“自博弈”不是二人零和游戏，而是三角色共同进化。红队提升攻击覆盖度，蓝队学习更稳健的安全有用响应，评估器随数据刷新评价标准，三者形成持续压力。</div>",
      "quiz": {
        "q": "TriPlay-RL 为什么要把蓝队响应分成 negative、rejective、positive 三档，而不是只判断 safe/unsafe？",
        "options": [
          "为了让红队生成更短的攻击提示",
          "为了奖励安全且有帮助的回答，避免蓝队退化成简单拒绝模型",
          "为了减少评估器训练数据量",
          "为了让 GRPO 不再需要 KL 正则"
        ],
        "answer": 1,
        "explain": "simple refusal 只得到 0 分，safe and helpful 才得到正分，因此蓝队被推动在安全边界内保持实用性。"
      }
    },
    {
      "id": "light_alignment",
      "num": 17,
      "name": "轻量对齐 (Light Alignment)",
      "fullName": "轻量对齐 (Light Alignment)",
      "year": "2026.02",
      "org": "",
      "parent": "grpo",
      "paperUrl": "https://arxiv.org/abs/2602.02027",
      "projectUrl": "",
      "category": "rl_based",
      "motivation": "单神经元安全专家自反射",
      "summary": "Light Alignment 提出了 Neuron-Guided Safe Decoding (NGSD)：只训练同模型家族中最小规模的安全专家，并用单个神经元式门控在解码时按风险选择性触发安全 logit 修正。它解决了传统安全后训练成本高、推理时统一干预易损害 utility、以及轻量方法跨模型泛化差的问题。",
      "keyPoints": [
        "方法名为 NGSD：Neuron-Guided Safe Decoding，是一种 decoding-time safety alignment 方法。",
        "只训练小规模 safety expert，并迁移到同 tokenizer、同模型家族的更大 base model。",
        "Prompt-level self-reflection 在生成前对输入进行四维风险评分：severity、actionability、evasion、targeting。",
        "风险分数决定固定安全强度 <span class=\"kb-math kb-math-inline\">\\alpha</span>：高风险 <span class=\"kb-math kb-math-inline\">r&gt;5</span> 取 0.9，低风险 <span class=\"kb-math kb-math-inline\">r\\le 5</span> 取 0.1。",
        "解码中计算 base model 与 expert model 的 next-token distribution 差异 <span class=\"kb-math kb-math-inline\">I_t=\\frac12\\|p_b-p_e\\|_1</span>，作为即时风险信号。",
        "单神经元门控累计历史风险：<span class=\"kb-math kb-math-inline\">v\\leftarrow(1-1/\\tau)v+I_t</span>，超过阈值才触发 SafeDecoding-style 修正。",
        "触发时只在候选集合 <span class=\"kb-math kb-math-inline\">C=\\operatorname{TopK}(p_b)\\cup\\operatorname{TopK}(p_e)</span> 上执行 <span class=\"kb-math kb-math-inline\">\\tilde{p}=p_b+\\alpha(p_e-p_b)</span>，未触发时完全按 base model 解码。"
      ],
      "detail": "<p><img alt=\"NGSD 管线图\" src=\"https://ar5iv.labs.arxiv.org/html/2602.02027/assets/x1.png\" />\n<em>图：Neuron-Guided Safe Decoding 的整体流程。先做 prompt-level self-reflection 决定安全强度，再在解码过程中用单神经元门控选择性调用 safety expert。</em></p>\n<p>Light Alignment/NGSD 的基本立场是：安全对齐不一定要把大模型参数重新训练一遍，也不应在每个 token 上无差别地施加强安全约束。传统 post-training 方法如 RLHF/DPO 成本高且与目标模型绑定；一些 decoding-time 方法虽然不改参数，但常常需要模型专属 safety vector、复杂搜索或持续 logit 干预，容易造成 over-refusal 或 utility degradation。NGSD 将问题拆成两层：输入层面先判断“这次请求整体危险吗”，token 层面再判断“当前生成位置是否真的需要专家介入”。</p>\n<p>第一层是 prompt-level self-reflection。模型在生成前只执行一次风险评估，输出四个 0-10 分的维度：severity <span class=\"kb-math kb-math-inline\">S</span>、actionability <span class=\"kb-math kb-math-inline\">A</span>、evasion <span class=\"kb-math kb-math-inline\">E</span>、targeting <span class=\"kb-math kb-math-inline\">T</span>。论文强调这些维度不是为某类攻击硬编码，而是试图捕捉跨攻击类型的风险属性。聚合方式是先对 <span class=\"kb-math kb-math-inline\">P=\\{A,E,T\\}</span> 降序排序，取最大两个 <span class=\"kb-math kb-math-inline\">P_1,P_2</span>，再计算：</p>\n<div class=\"kb-math kb-math-display\">r=\\max\\left(S,\\frac12S+\\frac12\\cdot\\frac{P_1+P_2}{2}\\right),\\quad r\\in[0,10].</div>\n<p>这里 severity 被赋予主导地位，因为高危主题即使没有强 actionability，也不应被低估；而 actionability、evasion、targeting 只取 top-2，是为了减少噪声维度对最终风险的干扰。之后 NGSD 将 <span class=\"kb-math kb-math-inline\">\\alpha</span> 固定为：高风险 <span class=\"kb-math kb-math-inline\">r&gt;5</span> 时 <span class=\"kb-math kb-math-inline\">\\alpha=0.9</span>，低风险 <span class=\"kb-math kb-math-inline\">r\\le5</span> 时 <span class=\"kb-math kb-math-inline\">\\alpha=0.1</span>。与 SSD 这类周期性调整 <span class=\"kb-math kb-math-inline\">\\alpha</span> 的方法相比，这样的 prompt-level 决策推理开销更低，也减少了超参数动态震荡。</p>\n<p>第二层是 neuron-guided decoding。NGSD 在解码时同时计算 base model <span class=\"kb-math kb-math-inline\">M_b</span> 与 safety expert <span class=\"kb-math kb-math-inline\">M_e</span> 的 next-token distribution：</p>\n<div class=\"kb-math kb-math-display\">p_b=\\operatorname{softmax}(M_b(x,y_{&lt;t})),\\quad\np_e=\\operatorname{softmax}(M_e(x,y_{&lt;t})).</div>\n<p>两者差异用 <span class=\"kb-math kb-math-inline\">\\ell_1</span> 距离的一半表示：</p>\n<div class=\"kb-math kb-math-display\">I_t=\\frac12\\|p_b-p_e\\|_1.</div>\n<p>直觉上，如果 safety expert 与 base model 对下一 token 分布非常一致，说明当前位置没有明显安全分歧；如果差异很大，则可能表示 base model 正朝专家认为不安全的区域移动。NGSD 不直接用 <span class=\"kb-math kb-math-inline\">I_t</span> 的瞬时值触发干预，而是将其输入一个单神经元式时间门控：</p>\n<div class=\"kb-math kb-math-display\">v_t=\\left(1-\\frac1\\tau\\right)v_{t-1}+I_t,</div>\n<p>当 <span class=\"kb-math kb-math-inline\">v_t\\ge v_{th}</span> 时发放 spike，触发安全修正并把膜电位重置；否则继续使用 base model 解码。这个设计能过滤单步噪声，又能对连续风险积累快速响应。</p>\n<p>触发门控后，NGSD 不在全词表上粗暴替换分布，而是构造候选集合：</p>\n<div class=\"kb-math kb-math-display\">C=\\operatorname{TopK}(p_b)\\cup\\operatorname{TopK}(p_e).</div>\n<p>然后执行 SafeDecoding-style 修正：</p>\n<div class=\"kb-math kb-math-display\">\\tilde{p}(y)=p_b(y)+\\alpha(p_e(y)-p_b(y)),\\quad y\\in C.</div>\n<p>当 <span class=\"kb-math kb-math-inline\">\\alpha</span> 较大时，分布更靠近 safety expert；当 <span class=\"kb-math kb-math-inline\">\\alpha</span> 较小时，base model 的原始能力占主导。未触发神经元门控时，NGSD 直接按 <span class=\"kb-math kb-math-inline\">p_b</span> 选择 token，不让专家影响正常生成。这就是论文所谓“balancing intrinsic model capabilities with external guidance”：模型自己的安全意识和语言能力不是被外部专家全程覆盖，而是在高风险 prompt、高风险 token 位置才被加强。</p>\n<p>NGSD 的 safety expert 也体现“轻量对齐”。它选择同模型家族中最小规模模型做安全增强训练，原因是 tokenizer 和输出空间兼容，专家分布可以与更大模型的 next-token distribution 对齐。这样，部署大模型时不需要给每个 scale 单独做完整安全后训练，只需让小专家在解码时提供方向。论文实验覆盖 GCG、PAIR、AutoDAN、prefilling attack 等攻击，并报告 NGSD 在安全性、utility、false refusal 和效率上取得更好的折中；方法还包含一个工程性的 early stopping 模块，用于缓解强 logit 干预下可能出现的重复拒绝文本。</p>\n<pre><code class=\"language-python\"># NGSD / Light Alignment 简化伪代码\n# 输入：prompt x, base model M_b, lightweight expert M_e, max length M\n\n# 1. Prompt-level self-reflection\nS, A, E, T = risk_reflection(x)  # severity/actionability/evasion/targeting, each in [0, 10]\nP1, P2 = top2([A, E, T])\nr = max(S, 0.5 * S + 0.5 * ((P1 + P2) / 2))\nr = clip(r, 0, 10)\nalpha = 0.9 if r &gt; 5 else 0.1\n\n# 2. Neuron-guided decoding\nv = v_reset\ny = []\nfor t in range(M):\n    p_b = softmax(M_b(x, y))\n    p_e = softmax(M_e(x, y))\n    I_t = 0.5 * l1_norm(p_b - p_e)\n    v = (1 - 1 / tau) * v + I_t\n\n    if v &gt;= v_threshold:\n        C = topk_tokens(p_b) | topk_tokens(p_e)\n        p_tilde = p_b + alpha * (p_e - p_b)\n        token = argmax_over(p_tilde, C)\n        v = v_reset\n    else:\n        token = argmax(p_b)\n\n    y.append(token)\n    if token == EOS:\n        break\nreturn y\n</code></pre>\n<div class=\"warn-box\">⚠️ 注意：NGSD 的关键不是“安全专家越强越好、介入越多越好”，而是只在 prompt 风险和 token 分布分歧共同指向风险时介入；这正是它降低 over-refusal、保留 utility 的主要机制。</div>",
      "quiz": {
        "q": "",
        "options": [],
        "answer": 0,
        "explain": ""
      }
    },
    {
      "id": "f_grpo",
      "num": 18,
      "name": "f散度GRPO (f-GRPO)",
      "fullName": "f散度GRPO (f-GRPO)",
      "year": "2026.02",
      "org": "",
      "parent": "grpo",
      "paperUrl": "https://arxiv.org/abs/2602.05946",
      "projectUrl": "",
      "category": "rl_based",
      "motivation": "散度泛化的GRPO改进",
      "summary": "f-GRPO 将 GRPO 的“组内相对优势更新”重新解释为奖励诱导的 aligned / unaligned 分布之间的 \\(f\\)-divergence 估计，从而把偏好对齐里的散度优化推广到只有标量奖励的 RLVR 场景。论文同时提出 f-HAL，把 on-policy 的 f-GRPO 与 off-policy 偏好监督相插值，用于在奖励模型不可靠时缓解 reward hacking。",
      "keyPoints": [
        "将 preference alignment 中“chosen vs. rejected 分布的散度估计”推广到 RLVR 中“高于组均值奖励 vs. 低于组均值奖励”的分布估计。",
        "每个 prompt 采样一组响应，用标准化 advantage 将响应分成 reward-aligned 与 reward-unaligned 两侧。",
        "用截断 importance weighting 与 softmax reward weighting 估计 <span class=\"kb-math kb-math-inline\">D_r^+</span> 和 <span class=\"kb-math kb-math-inline\">D_r^-</span> 相对于旧策略采样分布的密度比。",
        "用 <span class=\"kb-math kb-math-inline\">f</span>-divergence 的变分表示构造统一损失，可实例化为 Hellinger、JS、KL、Pearson、Reverse KL、Total Variation 等不同版本。",
        "f-GRPO 的核心差异不是简单替换 GRPO 的 advantage，而是把更新目标改成“分离奖励好样本和坏样本”的散度估计。",
        "f-HAL 通过 <span class=\"kb-math kb-math-inline\">\\lambda\\mathcal{L}_{\\mathrm{FDO}}+(1-\\lambda)\\mathcal{L}_{f\\text{-}\\mathrm{GRPO}}</span> 融合偏好数据和 on-policy reward feedback。",
        "理论结果给出 divergence estimation、alignment consistency 与期望奖励提升；与 GRPO 相比，canonical link 下的 f-GRPO 对低于均值的响应压制更强。"
      ],
      "detail": "<p><img alt=\"f-GRPO divergence estimation framework\" src=\"https://arxiv.org/html/2602.05946v3/nips_figs_tabs/figs/f-grpo_HQ.png\" />\n<em>图：论文 Figure 1，将 RLVR、Preference Alignment 和 Hybrid Alignment 统一为 aligned / unaligned 分布之间的散度估计。</em></p>\n<pre><code class=\"language-python\"># f-GRPO / f-HAL 的核心训练逻辑，按论文 Algorithm 1 简化整理\nfor step in training_steps:\n    prompts = sample_prompts(batch_size=B)\n    old_policy = copy(policy)\n    on_policy_grad = 0\n\n    for x in prompts:\n        ys = [old_policy.generate(x) for _ in range(G)]\n        rewards = [reward_fn(x, y) for y in ys]\n        adv = normalize(rewards)  # (r_i - mean(r)) / std(r)\n\n        # above-average -&gt; reward-aligned; below-average -&gt; reward-unaligned\n        w_pos = truncated_softmax_importance(rewards, adv &gt; 0, old_policy)\n        w_neg = truncated_softmax_importance([-r for r in rewards], adv &lt; 0, old_policy)\n\n        for y_i, a_i, wp_i, wn_i in zip(ys, adv, w_pos, w_neg):\n            r_theta = beta * logprob_ratio(policy, ref_policy, x, y_i)\n            if a_i &gt; 0:\n                psi = -wp_i * link_g(r_theta)\n            else:\n                psi =  wn_i * convex_conjugate_f_star(link_g(r_theta))\n            on_policy_grad += a_i * grad(psi)\n\n    off_policy_grad = fdo_gradient(preference_batch) if use_preference_data else 0\n    grad_total = (1 - lambda_) * on_policy_grad + lambda_ * off_policy_grad\n    policy.update(grad_total)\n</code></pre>\n<p>传统 GRPO 的出发点是：对同一个 prompt 采样 <span class=\"kb-math kb-math-inline\">G</span> 个候选回答，计算组内标准化优势 <span class=\"kb-math kb-math-inline\">A_i</span>，再提高正优势回答的概率、降低负优势回答的概率。它的隐含奖励可写为\n<div class=\"kb-math kb-math-display\">r_\\theta(x,y)=\\beta\\log\\frac{\\pi_\\theta(y\\mid x)}{\\pi_{\\mathrm{ref}}(y\\mid x)},</div>\n组内优势常写成\n<div class=\"kb-math kb-math-display\">A_i=\\frac{r(x,y_i)-\\frac{1}{G}\\sum_{j=1}^{G}r(x,y_j)}{\\mathrm{std}(\\{r(x,y_j)\\}_{j=1}^{G})+\\epsilon}.</div>\nGRPO 直接把 <span class=\"kb-math kb-math-inline\">A_i</span> 当作策略梯度权重，因此它更像“按奖励相对大小做局部 reweighting”。f-GRPO 的关键改动是：不只问某个样本 advantage 有多大，而是先用 advantage 的符号定义两个分布，<span class=\"kb-math kb-math-inline\">D_r^+</span> 表示高于均值的 reward-aligned 响应，<span class=\"kb-math kb-math-inline\">D_r^-</span> 表示低于均值的 reward-unaligned 响应，然后优化二者的 <span class=\"kb-math kb-math-inline\">f</span>-divergence。</p>\n<p>由于 RLVR 没有偏好数据里直接给出的 chosen / rejected 样本，论文用旧策略 <span class=\"kb-math kb-math-inline\">\\pi_{\\theta_{\\mathrm{old}}}</span> 采样到的一组响应来做 importance sampling。直观上，正侧权重要偏向高奖励样本，负侧权重要偏向低奖励样本，同时还要校正这些样本来自旧策略而不是目标 aligned / unaligned 分布。可简化写成\n<div class=\"kb-math kb-math-display\">\\hat w_i^+\\propto \\mathbf{1}\\{A_i&gt;0\\}\\frac{\\operatorname{softmax}(r_1,\\ldots,r_G)_i}{\\pi_{\\theta_{\\mathrm{old}}}(y_i\\mid x)},\\quad\n\\hat w_i^-\\propto \\mathbf{1}\\{A_i&lt;0\\}\\frac{\\operatorname{softmax}(-r_1,\\ldots,-r_G)_i}{\\pi_{\\theta_{\\mathrm{old}}}(y_i\\mid x)}.</div>\n这里的 indicator 是“截断”的来源：正侧只从 above-average 样本估计，负侧只从 below-average 样本估计。这样做避免了把奖励中性的样本强行解释为偏好信号，也使更新更聚焦于区分好坏行为的样本。</p>\n<p>有了 <span class=\"kb-math kb-math-inline\">\\hat w_i^+</span> 与 <span class=\"kb-math kb-math-inline\">\\hat w_i^-</span>，f-GRPO 把 preference alignment 中的 FDO 目标搬到 on-policy RL 中。对任意凸函数 <span class=\"kb-math kb-math-inline\">f</span>、共轭函数 <span class=\"kb-math kb-math-inline\">f^*</span> 和单调 link function <span class=\"kb-math kb-math-inline\">g</span>，局部项可写成\n<div class=\"kb-math kb-math-display\">\\psi_{f,g}(r_\\theta,A_i)=\n\\begin{cases}\n-\\hat w_i^+\\,g(r_\\theta(x,y_i)), &amp; A_i&gt;0,\\\\\n\\hat w_i^-\\,f^*(g(r_\\theta(x,y_i))), &amp; A_i&lt;0.\n\\end{cases}</div>\n训练时再用 advantage 的幅度调节梯度尺度，得到与标准 on-policy RL 相近的优化动态。不同 <span class=\"kb-math kb-math-inline\">f</span> 选择对应不同的“分离形状”：例如 KL 更强调覆盖 aligned 分布，Reverse KL 更强调模式选择，Total Variation 更像最大化可分性边界。论文的价值在于给出一套统一 recipe，而不是只提出一个固定损失。</p>\n<p>f-HAL 则面向奖励模型不完美的安全对齐场景。纯 on-policy RL 使用 learned reward model 时容易 reward hacking：模型找到奖励模型漏洞，却偏离真实人类偏好。f-HAL 将 off-policy preference supervision 当作锚点：\n<div class=\"kb-math kb-math-display\">\\mathcal{L}_{f\\text{-}\\mathrm{HAL}}(\\theta)=\\lambda\\mathcal{L}_{\\mathrm{FDO}}(\\theta)+(1-\\lambda)\\mathcal{L}_{f\\text{-}\\mathrm{GRPO}}(\\theta).</div>\n当 <span class=\"kb-math kb-math-inline\">\\lambda=0</span> 时退化为 f-GRPO，当 <span class=\"kb-math kb-math-inline\">\\lambda=1</span> 时退化为 FDO；中间值同时利用 reward feedback 的探索能力和偏好数据的稳定约束。论文将其解释为 aligned mixture 与 unaligned mixture 之间的散度估计，因此 hybrid 不是简单加 loss，而是在分布层面混合两类对齐信号。</p>\n<p>与 GRPO 的差别可以用固定点直觉理解。未裁剪 GRPO 会按照标准化奖励对参考策略做指数 reweighting，因此低于均值的响应通常仍保留非零概率；f-GRPO 在 canonical link 条件下更接近“把质量集中到 above-average 响应集合”，对 below-average 响应的压制更尖锐。这个差别解释了论文在数学推理 RLVR 上看到的收益：模型不只是平滑地偏向高分样本，而是更明确地最大化 reward-aligned 与 reward-unaligned 行为之间的分离。</p>\n<div class=\"key-point\">💡 关键：f-GRPO 的“f”不是装饰性超参数，而是决定 aligned / unaligned 两侧如何被拉开；f-HAL 的“hybrid”也不是普通多任务训练，而是把偏好分布与奖励诱导分布混合后再做散度估计。</div>",
      "quiz": {
        "q": "f-GRPO 相比标准 GRPO 的核心变化是什么？",
        "options": [
          "把所有奖励都替换为人工偏好标签",
          "把组内优势更新解释并改造为 reward-aligned 与 reward-unaligned 分布之间的 f-divergence 估计",
          "只增加 KL 惩罚系数以防止策略偏离参考模型",
          "去掉 on-policy 采样，完全依赖离线数据训练"
        ],
        "answer": 1,
        "explain": "f-GRPO 仍使用 on-policy 组采样，但用奖励诱导两侧分布并通过 f-divergence 变分目标优化二者分离；这比 GRPO 的简单 advantage reweighting 更结构化。"
      }
    },
    {
      "id": "bees",
      "num": 19,
      "name": "蜂群数据选择 (BeeS)",
      "fullName": "蜂群数据选择 (BeeS)",
      "year": "2026.02",
      "org": "",
      "parent": "dpo",
      "paperUrl": "https://arxiv.org/abs/2502.06648",
      "projectUrl": "",
      "category": "direct_preference",
      "motivation": "边际最大化数据选择改进DPO",
      "summary": "BeeS 提出用“边际最大化 + 多源贝叶斯聚合”来筛选 DPO 偏好数据，解决噪声偏好样本导致的参数收缩和训练低效问题。它不是修改 DPO 损失本身，而是在训练前挑出外部奖励边际与隐式 DPO 边际都足够可信的高价值偏好对。",
      "keyPoints": [
        "从理论上分析偏好标签噪声会造成 parameter shrinkage，使学到的奖励方向或策略更新向零收缩。",
        "提出 margin-maximization principle：大边际偏好对更不容易被噪声翻转，也更能抵消噪声带来的收缩。",
        "同时使用 external reward margin 与 implicit DPO reward margin，避免单一奖励模型在 OOD 偏好上误判。",
        "用小模型在少量 seed data 上预先 DPO，低成本获得 in-distribution implicit reward signal。",
        "将不同来源、不同尺度的 margin 投影到统一概率空间，再用 Bayes aggregation 得到偏好方向正确的联合置信度。",
        "一次性 DPO 时选择最高聚合概率样本；迭代 DPO 时每轮生成候选后复用 BeeS 三步流程过滤在线数据。",
        "实验覆盖 TL;DR、Anthropic HH、UltraFeedback、Llama-UltraFeedback、Mistral-UltraFeedback，并显示少量 BeeS 子集可超过全量 DPO。"
      ],
      "detail": "<p><img alt=\"BeeS workflow\" src=\"https://arxiv.org/html/2502.14560v4/x1.png\" />\n<em>图：论文 Figure 1，BeeS 工作流：先做小规模 in-distribution pre-DPO，再计算多源 margin，最后通过贝叶斯聚合选择训练样本。</em></p>\n<pre><code class=\"language-python\"># BeeS: Bayesian Aggregation for Preference data Selection\n# 输入：偏好数据 D={(x, y_w, y_l)}、外部奖励模型 r_ex、参考模型 pi_ref、小策略模型 pi_small\nseed = random_sample(D, n_seed)\npi_theta = dpo_train(pi_small, seed)  # Step 1: in-distribution pre-DPO\n\nscores = []\nfor x, y_w, y_l in D:\n    # Step 2: 多源 margin 计算\n    m_ex = r_ex(x, y_w) - r_ex(x, y_l)\n    r_im_w = logprob(pi_theta, y_w, x) - logprob(pi_ref, y_w, x)\n    r_im_l = logprob(pi_theta, y_l, x) - logprob(pi_ref, y_l, x)\n    m_im = r_im_w - r_im_l\n\n    # Step 3: 将 margin 投影为单源偏好概率，并做 Bayes aggregation\n    p_ex = (clip(m_ex, L_ex, U_ex) - L_ex) / (U_ex - L_ex)\n    p_im = (clip(m_im, L_im, U_im) - L_im) / (U_im - L_im)\n    p_joint = (p_ex * p_im) / (p_ex * p_im + (1 - p_ex) * (1 - p_im))\n    scores.append((p_joint, x, y_w, y_l))\n\nD_train = top_k(scores, ratio=selection_ratio, key=&quot;p_joint&quot;)\npolicy = dpo_train(target_policy, D_train)\n</code></pre>\n<p>DPO 的标准目标把偏好对 <span class=\"kb-math kb-math-inline\">(x,y_w,y_l)</span> 转成一个二分类式的 log-ratio 训练问题：\n<div class=\"kb-math kb-math-display\">\\mathcal{L}_{\\mathrm{DPO}}(\\theta)=-\\mathbb{E}\\left[\\log\\sigma\\left(\\beta\\left(\\log\\frac{\\pi_\\theta(y_w\\mid x)}{\\pi_{\\mathrm{ref}}(y_w\\mid x)}-\\log\\frac{\\pi_\\theta(y_l\\mid x)}{\\pi_{\\mathrm{ref}}(y_l\\mid x)}\\right)\\right)\\right].</div>\n这个公式隐含了一个假设：<span class=\"kb-math kb-math-inline\">y_w</span> 的确比 <span class=\"kb-math kb-math-inline\">y_l</span> 更符合偏好。BeeS 关注的问题是，如果偏好标签由人类、LLM judge 或 reward model 产生，其中可能混入外生噪声 <span class=\"kb-math kb-math-inline\">\\zeta</span>，那么训练会不断收到互相冲突的梯度。论文用线性奖励模型 <span class=\"kb-math kb-math-inline\">r(x,y)=\\langle\\phi(x,y),\\omega^*\\rangle</span> 做分析，指出噪声会抵消真实 margin，使最优 <span class=\"kb-math kb-math-inline\">\\omega</span> 向原点收缩，即学到的偏好方向变弱。</p>\n<p>为了抵消这种 shrinkage，BeeS 选择大边际样本。直觉是：如果 <span class=\"kb-math kb-math-inline\">r(x,y_w)-r(x,y_l)</span> 很大，噪声必须非常强才会翻转偏好；如果 margin 接近零，则 chosen / rejected 可能只是偶然排序，DPO 会浪费梯度甚至学到错误方向。论文把这一点称作 parameter inflation：选择大 margin 样本会让模型更确信当前偏好方向，从而给出更明确的参数更新。但单一 margin 来源并不可靠，尤其外部 reward model 在新分布上可能 OOD，因此 BeeS 不只看一个奖励模型。</p>\n<p>BeeS 的两个核心 margin 是 external margin 与 implicit margin：\n<div class=\"kb-math kb-math-display\">m_{\\mathrm{ex}}=r_{\\mathrm{ex}}(x,y_w)-r_{\\mathrm{ex}}(x,y_l),</div>\n<div class=\"kb-math kb-math-display\">m_{\\mathrm{im}}=\\log\\frac{\\pi_\\theta(y_w\\mid x)}{\\pi_{\\mathrm{ref}}(y_w\\mid x)}-\\log\\frac{\\pi_\\theta(y_l\\mid x)}{\\pi_{\\mathrm{ref}}(y_l\\mid x)}.</div>\nexternal margin 来自独立奖励模型，能提供外部偏好判断；implicit margin 来自经过少量 DPO 后的小模型，能反映当前数据分布内的偏好结构。论文观察到不同外部/隐式 margin 之间相关性弱，而不同规模模型算出的 implicit margin 相关性较强，因此用小模型预训练估算 implicit margin 是成本可控的。</p>\n<p>多源聚合是 BeeS 的“Bee”所在。每个 margin <span class=\"kb-math kb-math-inline\">m^i</span> 先通过 clipping 映射成偏好方向正确的单源概率：\n<div class=\"kb-math kb-math-display\">p_i=\\mathbb{P}(y_w&gt;y_l\\mid m^i)=\\frac{\\mathrm{clip}(m^i,L,U)-L}{U-L}.</div>\n在条件独立近似下，多个来源的联合偏好概率为\n<div class=\"kb-math kb-math-display\">\\mathbb{P}(y_w&gt;y_l\\mid m^1,\\ldots,m^K)=\\frac{\\prod_{i=1}^{K}p_i}{\\prod_{i=1}^{K}p_i+\\prod_{i=1}^{K}(1-p_i)}.</div>\n这个公式体现了一个严格策略：只要某个来源给出低置信度，联合概率就会明显下降。因此 BeeS 会优先保留“多个评估视角都认为 chosen 明显优于 rejected”的偏好对，而不是只相信一个高分 reward model。</p>\n<p>训练流程上，BeeS 与 DPO 是解耦的。它先在全量偏好数据上打分和排序，然后把 top subset 送给普通 DPO；因此它能直接叠加到现有 DPO、iterative DPO 或其他偏好优化管线中。论文实验显示，在 TL;DR、HH、UltraFeedback 等任务上，随机选少量数据不稳定，单独按 external margin 或 implicit margin 选也可能在某些数据集上失败；BeeS 的聚合概率更稳健，经常用 2% 到 10% 的数据达到甚至超过全量 DPO。这个结论的含义不是“数据越少越好”，而是偏好数据中存在大量低 margin 或冲突样本，直接全量训练会把这些噪声也放大。</p>\n<div class=\"warn-box\">⚠️ 注意：BeeS 不会修复错误的 DPO 目标，也不生成新偏好；它只负责在训练前提高偏好对的信噪比。如果所有 margin 来源都同向偏差，贝叶斯聚合仍可能筛出系统性错误样本。</div>",
      "quiz": {
        "q": "BeeS 为什么要同时聚合 external margin 和 implicit DPO margin？",
        "options": [
          "为了让 DPO 训练完全不需要参考模型",
          "因为单一奖励来源可能 OOD 或噪声较大，多源一致的大边际样本更可能是真正高质量偏好对",
          "为了把 pairwise preference 任务改成多分类任务",
          "因为 external margin 只用于推理阶段，不能参与训练前筛选"
        ],
        "answer": 1,
        "explain": "BeeS 的核心是用多源 margin 估计偏好方向的联合置信度；任一来源低置信会降低聚合概率，从而过滤掉噪声或分布外样本。"
      }
    },
    {
      "id": "bidpo",
      "num": 20,
      "name": "双向DPO (BiDPO)",
      "fullName": "双向DPO (BiDPO)",
      "year": "2026.02",
      "org": "",
      "parent": "tdpo",
      "paperUrl": "https://arxiv.org/abs/2602.10234",
      "projectUrl": "",
      "category": "token_multimodal",
      "motivation": "双向Token级VLM偏好优化",
      "summary": "BiDPO 针对 VLM 依赖语言先验、忽视细粒度视觉证据的问题，构造语义受控的最小对比图像对，并用正反两个方向的偏好优化和 token-level grounding 让模型同时识别正确与错误的图文-答案配对。它把 DPO 从“整句级偏好”推进到“视觉细节驱动的双向、token 级偏好监督”，用于降低多模态幻觉。",
      "keyPoints": [
        "面向 vision-language models 的 hallucination 问题，尤其是模型凭语言先验回答而不看关键视觉细节。",
        "自动识别问题中的 semantic focus，例如对象、属性、数量、空间关系或局部视觉线索。",
        "基于 semantic focus 对图像做 targeted visual modification，构造最小但有判别力的 contrastive image pairs。",
        "使用 CLIP-based similarity filtering 保证修改前后语义整体一致、局部变化可控，形成 BiDPO-data-12k 数据集。",
        "双向偏好优化同时训练 forward direction 与 reverse direction，使模型学习“正确图像-答案配对优于错配”以及“反向错配也应被拒绝”。",
        "引入 explicit token-level supervision 与 regularization，让答案中的关键 token 对齐到相应视觉证据。",
        "在 AMBER、MMHalBench、ObjectHalBench 等幻觉基准上评估，并报告 7B 规模模型在 MMHalBench 上 hallucination rate 从 57.0% 降到 31.2%。"
      ],
      "detail": "<p><img alt=\"BiDPO framework reconstruction\" src=\"https://mermaid.ink/img/Zmxvd2NoYXJ0IExSCiAgUVtRdWVzdGlvbl0gLS0-IFNbU2VtYW50aWMgZm9jdXMgZXh0cmFjdG9yXQogIElbT3JpZ2luYWwgaW1hZ2VdIC0tPiBFW1RhcmdldGVkIHZpc3VhbCBlZGl0XQogIFMgLS0-IEUKICBFIC0tPiBQW01pbmltYWwgY29udHJhc3RpdmUgaW1hZ2UgcGFpcl0KICBQIC0tPiBDW0NMSVAgc2ltaWxhcml0eSBmaWx0ZXJdCiAgQyAtLT4gRFtCaURQTy1kYXRhLTEya10KICBEIC0tPiBGW0ZvcndhcmQgcHJlZmVyZW5jZTogY29ycmVjdCBwYWlyID4gbWlzbWF0Y2hlZCBwYWlyXQogIEQgLS0-IFJbUmV2ZXJzZSBwcmVmZXJlbmNlOiBlZGl0ZWQtY29ycmVjdCBwYWlyID4gb3JpZ2luYWwtbWlzbWF0Y2ggcGFpcl0KICBGIC0tPiBMW0JpZGlyZWN0aW9uYWwgRFBPIGxvc3NdCiAgUiAtLT4gTAogIEwgLS0-IFRbVG9rZW4tbGV2ZWwgZ3JvdW5kaW5nIHJlZ3VsYXJpemVyXQogIFQgLS0-IE1bVkxNIHdpdGggbG93ZXIgaGFsbHVjaW5hdGlvbl0K\" />\n<em>图：根据 BiDPO 公开摘要、DOI 元数据与可检索方法描述复现的流程示意。TechRxiv PDF 对命令行访问返回 Cloudflare challenge，任务给定 arXiv 链接又对应无关论文，因此此处不用错误论文图。</em></p>\n<pre><code class=\"language-python\"># BiDPO 的核心流程，按公开论文摘要与方法描述简化整理\nfor sample in vqa_corpus:\n    image, question, answer = sample.image, sample.question, sample.answer\n\n    # 1. 找到问题真正依赖的视觉语义焦点\n    focus = semantic_focus_extractor(question, answer)\n\n    # 2. 生成最小视觉改动：只改变 focus 相关区域，保持其他语义稳定\n    edited_image = targeted_visual_edit(image, focus)\n\n    # 3. CLIP 过滤：整体仍相似，但局部语义差异足以影响答案\n    if not clip_similarity_in_range(image, edited_image):\n        continue\n\n    # 4. 构造正反方向偏好对\n    forward_pair = ((image, question, answer), (edited_image, question, answer))\n    reverse_answer = answer_for_edited_image(question, edited_image)\n    reverse_pair = ((edited_image, question, reverse_answer), (image, question, reverse_answer))\n\n    # 5. 训练时同时优化双向 DPO 与 token-level grounding regularizer\n    loss_f = dpo_loss(policy, reference, forward_pair)\n    loss_r = dpo_loss(policy, reference, reverse_pair)\n    loss_tok = token_grounding_loss(policy, image, question, answer, focus)\n    loss = loss_f + loss_r + alpha * loss_tok\n    policy.update(loss)\n</code></pre>\n<p>VLM 幻觉的根源之一是“答案 token 可以被语言先验解释，却没有被图像证据约束”。例如问题问图中物体颜色、数量或空间关系时，模型可能根据训练语料中的常见搭配回答，而不是检查局部视觉区域。普通 DPO 只告诉模型某个回答整体更好，不能保证模型关注了导致偏好差异的视觉 token。BiDPO 的动机是把偏好对构造成视觉最小对比：图像大部分保持一致，只修改问题所依赖的关键语义，从而让偏好信号集中到“看没看对视觉证据”上。</p>\n<p>数据构造首先需要 semantic focus extraction。给定问题 <span class=\"kb-math kb-math-inline\">q</span> 和原始图像 <span class=\"kb-math kb-math-inline\">I</span>，算法识别答案依赖的局部概念 <span class=\"kb-math kb-math-inline\">s</span>，例如“红色杯子”的颜色、“三只狗”的数量、“左边的人”的空间位置。然后生成编辑图像 <span class=\"kb-math kb-math-inline\">\\tilde I</span>，只对 <span class=\"kb-math kb-math-inline\">s</span> 做 targeted modification。CLIP similarity filtering 的作用是排除两类坏样本：一种是修改太小，模型不需要视觉辨别也能给同一答案；另一种是修改太大，整张图语义变了，偏好差异不再能归因到 semantic focus。</p>\n<p>在优化目标上，BiDPO 可以看作多模态 DPO 的双向扩展。设 <span class=\"kb-math kb-math-inline\">(I,q,a^+)</span> 是正确图像-问题-答案组合，<span class=\"kb-math kb-math-inline\">(\\tilde I,q,a^-)</span> 是由于视觉局部被改动而不再匹配的组合，单向 DPO 项可简化写成\n<div class=\"kb-math kb-math-display\">\\mathcal{L}_{\\mathrm{DPO}}^{\\rightarrow}=-\\log\\sigma\\left(\\beta\\left[\\log\\frac{\\pi_\\theta(a^+\\mid I,q)}{\\pi_{\\mathrm{ref}}(a^+\\mid I,q)}-\\log\\frac{\\pi_\\theta(a^-\\mid \\tilde I,q)}{\\pi_{\\mathrm{ref}}(a^-\\mid \\tilde I,q)}\\right]\\right).</div>\n但只做 forward direction 仍可能让模型学到“原图答案比编辑图答案好”的浅层规律。BiDPO 额外加入 reverse direction：对编辑图像的正确答案 <span class=\"kb-math kb-math-inline\">\\tilde a^+</span>，要求 <span class=\"kb-math kb-math-inline\">(\\tilde I,q,\\tilde a^+)</span> 优于 <span class=\"kb-math kb-math-inline\">(I,q,\\tilde a^+)</span>。整体目标可写成\n<div class=\"kb-math kb-math-display\">\\mathcal{L}_{\\mathrm{BiDPO}}=\\mathcal{L}_{\\mathrm{DPO}}^{\\rightarrow}+\\mathcal{L}_{\\mathrm{DPO}}^{\\leftarrow}+\\alpha\\mathcal{L}_{\\mathrm{token}}+\\gamma\\mathcal{R}_{\\mathrm{reg}}.</div>\n其中 <span class=\"kb-math kb-math-inline\">\\mathcal{L}_{\\mathrm{token}}</span> 表示 token-level supervision，<span class=\"kb-math kb-math-inline\">\\mathcal{R}_{\\mathrm{reg}}</span> 表示防止偏好优化过度破坏原模型能力的正则项。</p>\n<p>Token-level supervision 是 BiDPO 区别于普通图文偏好优化的关键。整句级 DPO 只对完整答案打分，而 token-level 约束会关注答案中与视觉焦点直接相关的 token，例如颜色词、数量词、实体名或空间介词。可把它理解为对每个关键 token <span class=\"kb-math kb-math-inline\">t</span> 加一个 grounding mask <span class=\"kb-math kb-math-inline\">m_t</span>：\n<div class=\"kb-math kb-math-display\">\\mathcal{L}_{\\mathrm{token}}=\\sum_{t=1}^{T}m_t\\,\\mathrm{CE}(z_t,\\hat z_t)+\\eta\\,\\mathrm{KL}(A_t\\Vert M_s),</div>\n其中 <span class=\"kb-math kb-math-inline\">A_t</span> 是模型在生成 token <span class=\"kb-math kb-math-inline\">t</span> 时的视觉注意或对齐分布，<span class=\"kb-math kb-math-inline\">M_s</span> 是 semantic focus 对应的视觉证据区域。这个公式是机制化写法：核心含义是，关键答案 token 不只要生成对，还要从对应图像区域获得支持。</p>\n<p>双向优化带来的直接收益是降低“单向捷径”。如果只训练 <span class=\"kb-math kb-math-inline\">(I,a)</span> 优于 <span class=\"kb-math kb-math-inline\">(\\tilde I,a)</span>，模型可能记住原图分布或问题模板；加入反向后，同一个 semantic focus 的两种状态都会被当作正例和负例出现，模型必须根据图像状态切换答案。换言之，BiDPO 把“不要幻觉”变成一个可判别任务：当局部视觉证据变化时，答案 token 必须随之变化；当局部证据没变化时，答案不应被无关背景扰动影响。</p>\n<p>从与 TDPO / token-level DPO 的关系看，BiDPO 继承了“偏好信号不应只落在序列末端”的思想，但把 token 级别监督绑定到视觉证据。对 VLM 来说，偏好优化的失败常不是语言流畅性问题，而是视觉 grounding 问题；因此 BiDPO 的贡献在于同时控制数据构造、偏好方向和 token grounding。实验中使用 AMBER、MMHalBench、ObjectHalBench 等幻觉评测，公开摘要报告 MMHalBench hallucination rate 在 7B 模型上从 57.0% 降至 31.2%，说明这种最小视觉对比数据能显著提高模型对细粒度视觉线索的敏感度。</p>\n<div class=\"key-point\">💡 关键：BiDPO 的“Bi”不是简单把 loss 乘二，而是让同一语义焦点的两个视觉状态互为正负样本；模型只有真正读取视觉证据，才能同时满足 forward 与 reverse preference。</div>",
      "quiz": {
        "q": "BiDPO 中双向偏好优化的主要目的是什么？",
        "options": [
          "让模型在训练时同时使用两个不同的语言分词器",
          "让正确与错误的图像-答案配对在正反两个视觉状态下都被区分，减少依赖语言先验的幻觉",
          "用 CLIP 完全替代 VLM 的视觉编码器",
          "只提高答案长度，不改变视觉 grounding"
        ],
        "answer": 1,
        "explain": "BiDPO 构造最小对比图像对，并在 forward 与 reverse 两个方向上训练偏好差异；这样模型必须根据局部视觉证据改变答案。"
      }
    },
    {
      "id": "tab_po",
      "num": 21,
      "name": "Token自适应屏障PO (TAB-PO)",
      "fullName": "Token自适应屏障PO (TAB-PO)",
      "year": "2026.03",
      "org": "",
      "parent": "tdpo",
      "paperUrl": "https://arxiv.org/abs/2603.00025",
      "projectUrl": "",
      "category": "token_multimodal",
      "motivation": "自适应屏障保护关键Token",
      "summary": "TAB-PO 提出面向结构化生成的 Token-Adaptive Barrier Preference Optimization，用混淆感知 hard negative 和置信度门控的 token 级屏障保护低置信关键 token，解决 DPO 在低编辑距离 JSON/本体输出中梯度稀释与正确 token 被侵蚀的问题。",
      "keyPoints": [
        "面向本体驱动结构化预测，输出通常是 schema-valid JSON，正确性由少量语义标签、证据 span、关系链接或共指 token 决定。",
        "构造 confusion-aware preference pairs：利用专家歧义模式和 SFT 验证集错误混淆表，合成最小扰动且 schema-valid 的 rejected 输出。",
        "识别 DPO 在低编辑距离偏好对中的两个失配：梯度被 JSON scaffolding 稀释，以及偏好 margin 增大但正确稀有 token 概率下降。",
        "在 DPO 风格 reference-adjusted preference loss 上加入 confidence-gated token barrier，只对当前策略低置信的 preferred token 施加 SFT 锚定。",
        "实验聚焦 PV-Miner 和 SciERC，报告 semantic label、textual grounding、relation、coreference 等结构化指标，TAB-PO 在关键结构维度上显著优于 SFT、序列级 DPO 和 token 级 DPO 变体。"
      ],
      "detail": "<p><img alt=\"TAB-PO 结构化预测流程\" src=\"https://arxiv.org/html/2603.00025v2/x1.png\" />\n<em>图：TAB-PO pipeline。模型先通过 prompt engineering 与 SFT 学会合法结构化输出，再用 confusion-aware hard negatives 与 token-level barrier 修正残余本体错误。</em></p>\n<p>TAB-PO 的出发点不是普通开放式回答偏好，而是本体约束的结构化预测。例如信息抽取任务会要求模型输出固定字段、层级标签、证据片段和关系链接。preferred 与 rejected completion 往往共享绝大多数 JSON 括号、字段名、逗号和模板 token，只在少数 schema-defining token 上不同。标准 DPO 看到的是整段 completion 的相对 likelihood，因此会把更新信号分摊到大量无关 serialization token 上，这就是论文称为 gradient dilution 的现象。更棘手的是，DPO 只要求 preferred 相对 rejected 的整体 margin 变大，某些罕见但正确的 preferred 标签 token 仍可能因为优化耦合而概率下降，这就是 preferred-token erosion。</p>\n<p>TAB-PO 先处理数据构造问题。给定输入 <span class=\"kb-math kb-math-inline\">x</span> 和 gold structured output <span class=\"kb-math kb-math-inline\">Y^+</span>，它不会随机采样一个语法错误的负例，而是从 SFT 模型在验证集上的混淆模式和专家定义的歧义模式出发，构造低分离度 hard negative <span class=\"kb-math kb-math-inline\">Y^-</span>。扰动类型包括替换语义标签、替换或缩短 grounding span、删除应有记录、插入多余但 schema-valid 的记录、修改 relation/coreference link 等。这样 rejected 输出仍然可解析、符合 ontology，但在一个关键结构决策上错误，优化信号就会集中到真实易错边界。</p>\n<p>核心 preference 部分仍保留 DPO 的 reference-adjusted margin。设序列化 completion 为 <span class=\"kb-math kb-math-inline\">Y_s</span>，token 序列为 <span class=\"kb-math kb-math-inline\">u=(u_1,\\ldots,u_T)</span>，当前策略 log-likelihood 写作：</p>\n<div class=\"kb-math kb-math-display\">\\mu_\\theta(Y_s\\mid x)=\\sum_{t=1}^{T}\\log p_\\theta(u_t\\mid x,u_{&lt;t})</div>\n<p>以 SFT 模型作为固定 reference，preferred 与 rejected 的参考校正优势为：</p>\n<div class=\"kb-math kb-math-display\">\\Delta_\\theta=\n\\big[\\mu_\\theta(Y_s^+\\mid x)-\\mu_{\\mathrm{SFT}}(Y_s^+\\mid x)\\big]\n-\n\\big[\\mu_\\theta(Y_s^-\\mid x)-\\mu_{\\mathrm{SFT}}(Y_s^-\\mid x)\\big]</div>\n<p>对应偏好损失为 <span class=\"kb-math kb-math-inline\">\\mathcal{L}_{\\mathrm{pref}}(\\theta)=-\\log\\sigma(\\beta\\Delta_\\theta)</span>。这一步鼓励策略相对 SFT reference 更偏好正确结构，但单独使用仍可能出现 token erosion，因此 TAB-PO 在 preferred completion 上额外加入置信度门控屏障。</p>\n<p>屏障项只在当前策略对 preferred token 低置信时激活。对 preferred token <span class=\"kb-math kb-math-inline\">u_t^+</span>，定义门控：</p>\n<div class=\"kb-math kb-math-display\">g_t^\\theta(x,u^+)=\\mathbf{1}\\{p_\\theta(u_t^+\\mid x,u_{&lt;t}^+)&lt;\\tau\\}</div>\n<p>preferred-token 的 supervised 锚定损失为 <span class=\"kb-math kb-math-inline\">\\ell_t^+(\\theta)=-\\log p_\\theta(u_t^+\\mid x,u_{&lt;t}^+)</span>，于是 barrier regularizer 为：</p>\n<div class=\"kb-math kb-math-display\">\\mathcal{L}_{\\mathrm{barrier}}(\\theta)=\n\\mathbb{E}_{\\mathcal{D}_{\\mathrm{pref}}}\n\\left[\n\\frac{\\sum_{t=1}^{T^+} g_t^\\theta(x,u^+)\\ell_t^+(\\theta)}\n{\\max(1,\\sum_{t=1}^{T^+}g_t^\\theta(x,u^+))}\n\\right]</div>\n<p>最终目标是：</p>\n<div class=\"kb-math kb-math-display\">\\mathcal{L}_{\\mathrm{TAB\\text{-}PO}}(\\theta)=\n\\mathcal{L}_{\\mathrm{pref}}(\\theta)+\\lambda\\mathcal{L}_{\\mathrm{barrier}}(\\theta)</div>\n<p>这个设计的关键直觉是：confident token 继续由 preference loss 推动区分 preferred/rejected；低置信 preferred token 则被 SFT likelihood 拉回安全区间，避免正确但罕见的本体标签被牺牲。由于门控在每个 forward pass 内作为固定 mask 处理，梯度只通过 <span class=\"kb-math kb-math-inline\">\\ell_t^+</span> 回传，屏障行为像一个局部修复项，而不是把整个 completion 重新做 SFT。</p>\n<pre><code class=\"language-python\"># TAB-PO 简化伪代码\nsft_model = freeze(theta_sft)\npolicy = init_from(theta_sft)\nconfusions = build_confusion_table(sft_validation_errors, expert_ambiguities)\n\nfor x, gold_struct in gold_records:\n    y_pos = serialize(gold_struct)\n    y_neg = make_schema_valid_negative(gold_struct, confusions)\n    add_preference_pair(x, y_pos, y_neg)\n\nfor batch in preference_pairs:\n    mu_pos = logprob(policy, batch.y_pos, batch.x)\n    mu_neg = logprob(policy, batch.y_neg, batch.x)\n    ref_pos = logprob(sft_model, batch.y_pos, batch.x)\n    ref_neg = logprob(sft_model, batch.y_neg, batch.x)\n\n    delta = (mu_pos - ref_pos) - (mu_neg - ref_neg)\n    loss_pref = -logsigmoid(beta * delta)\n\n    probs = token_probs(policy, batch.y_pos, batch.x)\n    gate = (probs &lt; tau).detach()\n    token_nll = -log_token_probs(policy, batch.y_pos, batch.x)\n    loss_barrier = (gate * token_nll).sum() / max(1, gate.sum())\n\n    loss = loss_pref + lambda_barrier * loss_barrier\n    update(policy, loss)\n</code></pre>\n<div class=\"key-point\">💡 关键：TAB-PO 的“token 自适应”不等于给所有 token 加权，而是只在 preferred token 低于置信阈值时启动屏障；这使它能保护语义标签、span、关系边等少数关键 token，同时不把 JSON 模板 token 当作同等重要的学习对象。</div>\n<p>与 TDPO 等 token-level preference 方法相比，TAB-PO 的特殊性在于任务假设更强：输出是 ontology-constrained structured object，负例可以通过真实混淆表和专家规则构造，并且 preferred/rejected 的差异极小。TDPO 更关注 token 级 KL 分解和一般对齐稳定性，TI-DPO 等方法从模型归因推断 token 重要性；TAB-PO 则直接利用结构化任务中已知的 gold record、schema、relation rule 和错误混淆，显式把 preference signal 对准结构正确性的决策 token。</p>\n<p>从训练流程看，TAB-PO 是 post-SFT 阶段，不需要在线 rollout、reward model 或 verifier。先用 prompt engineering 和 SFT 获得 schema-valid 输出能力，再从 SFT 的 residual errors 中生成 preference triples，最后用 <span class=\"kb-math kb-math-inline\">\\mathcal{L}_{\\mathrm{pref}}</span> 拉开正确/错误结构的相对 margin，用 <span class=\"kb-math kb-math-inline\">\\mathcal{L}_{\\mathrm{barrier}}</span> 防止低置信正确 token 被 DPO 更新冲掉。论文的诊断分析显示，TAB-PO 的 barrier activation 更集中在 critical schema tokens，gradient mass 也更偏向 semantic labels、grounded spans、relation labels 和 linking decisions，而不是 JSON scaffolding。</p>",
      "quiz": {
        "q": "TAB-PO 中 confidence-gated token barrier 的主要作用是什么？",
        "options": [
          "对所有 JSON token 施加相同的 SFT 损失，使输出格式更稳定",
          "只在 preferred token 低置信时施加监督锚定，防止关键正确 token 概率被 DPO 侵蚀",
          "用 reward model 给每个偏好样本动态调整 beta",
          "通过采样多个 rollout 估计 group-relative advantage"
        ],
        "answer": 1,
        "explain": "TAB-PO 的屏障项由 token 概率阈值触发，目标是保护低置信的 preferred schema token，同时保留 DPO 的 preferred-over-rejected margin 学习。"
      }
    },
    {
      "id": "tlpo",
      "num": 22,
      "name": "Token级策略优化 (TLPO)",
      "fullName": "Token级策略优化 (TLPO)",
      "year": "2026.04",
      "org": "",
      "parent": "tdpo",
      "paperUrl": "https://arxiv.org/abs/2604.26553",
      "projectUrl": "",
      "category": "token_multimodal",
      "motivation": "Token级策略优化缓解语言混淆",
      "summary": "TLPO 提出在语言混淆发生位置进行 token 级探索与 PPO 式策略更新，只惩罚会诱发错误语言的候选 token，从而缓解多语言 LLM 的 language confusion，同时尽量保留通用任务能力。",
      "keyPoints": [
        "目标问题是 multilingual LLM 在目标语言提示下混入非目标语言 token，即 language confusion。",
        "相比 SFT、DPO、ORPO、GRPO 等序列级方法，TLPO 只在错误位置更新策略，避免把整段正确上下文一起压低。",
        "三步流程：检测 confusion point <span class=\"kb-math kb-math-inline\">c</span>，从 <span class=\"kb-math kb-math-inline\">\\pi_\\theta(\\cdot\\mid x,y_{&lt;c})</span> 选 Top-N 候选 token，基于短 lookahead 判断候选 token 是否诱发语言混淆并给 reward。",
        "使用 probability-ranked exploration，而不是随机采样候选 token；advantage 同时考虑候选 token 原始概率和 centered reward。",
        "优化目标借鉴 PPO：候选 token 概率比裁剪、reference KL 正则、token-level advantage 共同约束局部策略更新。",
        "实验覆盖 Llama、Qwen、Ministral、Gemma 等多语言模型和中/阿/韩/日等目标语言，评价 Response Pass Rate、Word Pass Rate 与下游任务 accuracy 的权衡。"
      ],
      "detail": "<p><img alt=\"TLPO confusion point 检测\" src=\"https://arxiv.org/html/2604.26553v1/x3.png\" />\n<img alt=\"TLPO 候选 token 探索\" src=\"https://arxiv.org/html/2604.26553v1/x4.png\" />\n<img alt=\"TLPO advantage 计算\" src=\"https://arxiv.org/html/2604.26553v1/x5.png\" />\n<em>图：TLPO Figure 2 的三个阶段，依次是检测混淆点、在该位置取候选 token、为候选 token 计算 reward 和 advantage。</em></p>\n<p>TLPO 处理的是一个非常局部但常见的多语言对齐问题：模型整体知道如何回答问题，却在某个位置突然生成英语、乌克兰语或其他非目标语言 token。序列级 SFT 或 DPO 会把整段回答当作一个样本优化，虽然能提高语言一致性，但也容易牺牲原有知识和推理能力。TLPO 的基本判断是：如果错误只由少数 token 触发，那么优化也应该只发生在这些 token 的决策边界，而不是惩罚完整 response。</p>\n<p>方法首先让当前策略 <span class=\"kb-math kb-math-inline\">\\pi_\\theta</span> 对 prompt <span class=\"kb-math kb-math-inline\">x</span> 生成 response <span class=\"kb-math kb-math-inline\">y</span>，再检测第一个或关键的 confusion point <span class=\"kb-math kb-math-inline\">c</span>。在这个位置之前的上下文 <span class=\"kb-math kb-math-inline\">(x,y_{&lt;c})</span> 被视为有效上下文，TLPO 不改写它；只在该上下文条件下查看 next-token 分布，并选择概率排名最高的 <span class=\"kb-math kb-math-inline\">N</span> 个候选 token：<span class=\"kb-math kb-math-inline\">\\mathcal{T}=\\{t_i\\}_{i=1}^{N}</span>。这种 probability-ranked exploration 避免了大词表随机采样的低效，也使训练集中在模型本来就可能输出的 token 上。</p>\n<p>每个候选 token 的 reward <span class=\"kb-math kb-math-inline\">R(t_i)</span> 来自短 lookahead。因为某些文字在 tokenizer 中可能由多个 token 组成，单看当前 token 未必能判断是否产生语言混淆，所以 TLPO 从 <span class=\"kb-math kb-math-inline\">t_i</span> 开始继续自回归生成很短的 <span class=\"kb-math kb-math-inline\">k</span> 个 token，论文实践中设 <span class=\"kb-math kb-math-inline\">k=3</span>，再 detokenize 检查该片段是否包含非目标语言。不会诱发混淆的 token 获得正向 reward，会诱发混淆的 token 获得负向 reward。这样，reward 是 token-conditioned 的局部信号，而不是整段 response 的粗粒度评分。</p>\n<p>TLPO 先给出 token-level expected reward 目标：</p>\n<div class=\"kb-math kb-math-display\">J_{\\mathrm{TLPO}}(\\theta)=\n\\mathbb{E}_{x\\sim D, y\\sim\\pi_\\theta(\\cdot\\mid x)}\n\\left[\\frac{1}{N}\\sum_{t_i\\in\\mathcal{T}}R(t_i)\\right]</div>\n<p>实际优化时改写为 PPO 式 clipped objective。设候选 token 由旧策略 <span class=\"kb-math kb-math-inline\">\\pi_{\\theta_{old}}</span> 选出，概率比为\n<span class=\"kb-math kb-math-inline\">r_i(\\theta)=\\frac{\\pi_\\theta(t_i\\mid x,y_{&lt;c})}{\\pi_{\\theta_{old}}(t_i\\mid x,y_{&lt;c})}</span>，则：</p>\n<div class=\"kb-math kb-math-display\">J_{\\mathrm{TLPO}}(\\theta)=\n\\mathbb{E}\\left[\n\\frac{1}{N}\\sum_{t_i\\in\\mathcal{T}}\n\\left(\n\\min\\left(r_i(\\theta)A_i,\\operatorname{clip}(r_i(\\theta),1-\\epsilon,1+\\epsilon)A_i\\right)\n-\\beta D_{\\mathrm{KL}}(\\pi_\\theta\\Vert\\pi_{\\theta_{ref}})\n\\right)\n\\right]</div>\n<p>advantage 不是简单的 <span class=\"kb-math kb-math-inline\">R(t_i)-\\bar{R}</span>，而是乘上旧策略下的候选 token 概率：</p>\n<div class=\"kb-math kb-math-display\">A_i=\\frac{1}{Z}\\pi_{\\theta_{old}}(t_i\\mid x,y_{&lt;c})\\big(R(t_i)-\\mu\\big)</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">\\mu</span> 是候选集合内的 probability-weighted average reward，<span class=\"kb-math kb-math-inline\">Z</span> 用于归一化，使所有候选 token 的 advantage 绝对值和保持稳定。这个设计有一个重要直觉：TLPO 想压低错误语言 token，但不希望把原模型已经学到的合理 token 排序彻底打乱。因此，高概率且有害的 token 会受到更强负 advantage；高概率且有效的 token 会被保留或增强；低概率 token 即便 reward 极端，也不会主导更新。</p>\n<pre><code class=\"language-python\"># TLPO Algorithm 1 的简化伪代码\npolicy = init_from(reference_policy)\n\nfor step in range(M):\n    batch = sample_prompts(D)\n    local_training_items = []\n\n    for x in batch:\n        y = sample(policy, x)\n        c = detect_confusion_point(y, target_language=x.target_language)\n        if c is None:\n            continue\n\n        prefix = y[:c]\n        T = top_n_tokens(policy.next_token_dist(x, prefix), N)\n        rewards = []\n        for t in T:\n            lookahead = rollout(policy, x, prefix + [t], k=3)\n            rewards.append(language_reward(t, lookahead, target_language=x.target_language))\n        local_training_items.append((x, prefix, T, rewards))\n\n    old_policy = freeze_copy(policy)\n    for _ in range(p):\n        objective = compute_tlpo_objective(policy, old_policy, reference_policy, local_training_items)\n        policy.gradient_ascent(objective, lr=alpha)\n</code></pre>\n<div class=\"warn-box\">⚠️ 注意：TLPO 的“token 级”不是把完整序列 loss 拆到每个 token，而是只对检测到的 confusion point 生成候选 token 集合，并只对这个局部决策点计算 reward、advantage 与 PPO 裁剪更新。</div>\n<p>与 DPO/ORPO 的区别在于 credit assignment。DPO 需要 chosen/rejected 序列对，优化的是整段回答的相对 likelihood；如果回答只有一个 token 混入错误语言，DPO 仍会影响整段序列概率，可能压低大量本来正确的上下文 token。TLPO 则把问题转化为“在 <span class=\"kb-math kb-math-inline\">c</span> 位置选哪个 token”，通过候选 token reward 直接惩罚错误语言候选，保留周围上下文的生成能力。这也是论文强调它能在提高 Response Pass Rate 的同时减少 accuracy drop 的原因。</p>\n<p>KL 项的作用是防止局部更新过度偏离初始 policy。论文采用与 GRPO 类似的无偏 KL 估计形式，对候选 token 位置计算 <span class=\"kb-math kb-math-inline\">D_{\\mathrm{KL}}(\\pi_\\theta\\Vert\\pi_{\\theta_{ref}})</span>，使策略既能压低混淆 token，又不会为了语言一致性把 next-token 分布推到不自然的形状。PPO 的 clip 机制则进一步限制单次更新幅度，避免某些负 reward token 被一次性打到过低概率而影响流畅性。</p>\n<p>实验上，TLPO 的主指标不是单一 accuracy，而是语言一致性与能力保留的 Pareto 权衡。论文报告 Response Pass Rate 和 Word Pass Rate 来衡量回答是否保持目标语言，同时用 MIF、MMMLU、GPQA、ARC-C、BBH、MATH、GSM8K 等任务检查通用能力。在 English 作为 neutral category 的设定下，TLPO 在平均 RPR/WPR 上超过基线和 DPO/ORPO，同时平均 accuracy 接近原始模型；在更严格的 English 也算 confusion 的设定下，TLPO 仍取得最高平均 RPR，说明局部 token 更新比序列级强约束更稳。</p>",
      "quiz": {
        "q": "TLPO 为什么要使用短 lookahead 来评估候选 token 的 reward？",
        "options": [
          "因为 PPO 只能处理固定长度为 3 的 rollout",
          "因为一个可读字符或语言片段可能由多个 tokenizer token 构成，单个 token 不足以判断语言混淆",
          "因为 lookahead 可以替代 reference KL 项",
          "因为 TLPO 需要生成完整回答后才能计算序列级 DPO loss"
        ],
        "answer": 1,
        "explain": "论文用短 lookahead 解码候选 token 后续片段，再判断是否出现非目标语言，从而得到局部 token reward。"
      }
    },
    {
      "id": "mm_dpo",
      "num": 23,
      "name": "多模态DPO (MM-DPO)",
      "fullName": "多模态DPO (MM-DPO)",
      "year": "2026",
      "org": "",
      "parent": "dpo",
      "paperUrl": "https://mm-rlhf.github.io/",
      "projectUrl": "",
      "category": "token_multimodal",
      "motivation": "动态奖励缩放多模态对齐",
      "summary": "MM-DPO 将高质量多模态 reward model 的 reward margin 注入 DPO，把每个偏好对的更新强度动态缩放，从而让清晰、高置信的人类偏好样本对 MLLM 对齐产生更大影响，并降低低置信或噪声 pair 的训练干扰。",
      "keyPoints": [
        "MM-DPO 是 MM-RLHF 项目中的多模态对齐算法，建立在 120K 级人工标注多模态偏好比较数据和 critique-based reward model 之上。",
        "相比传统 DPO 对所有 preference pairs 使用固定 <span class=\"kb-math kb-math-inline\">\\beta</span>，MM-DPO 根据 reward margin <span class=\"kb-math kb-math-inline\">\\delta=r(y_w)-r(y_l)</span> 动态调整更新强度。",
        "对同一 query 的多个 ranked responses，MM-DPO 不只训练 hardest pair，而是枚举所有 rank 不同的有效比较对，保留更完整的排序信息。",
        "Dynamic Reward Scaling 使用有界函数把 reward margin 映射到 <span class=\"kb-math kb-math-inline\">[\\beta_{ori},(1+w)\\beta_{ori}]</span>，避免高 margin 样本造成过激更新。",
        "训练依赖 MM-RLHF-Reward-7B 提供可靠 reward signal；论文指出公开模型在该数据上的打分质量不足，直接用弱 reward 会影响动态缩放稳定性。",
        "实验覆盖 10 个评估维度和 27 个 benchmark，项目页还提供 MM-RLHF-RewardBench 与 MM-RLHF-SafeBench 来评估 reward model 和安全对齐。"
      ],
      "detail": "<p><img alt=\"MM-DPO 动态奖励缩放框架\" src=\"https://mm-rlhf.github.io/static/images/mm_dpo.png\" />\n<em>图：MM-DPO framework。Reward model 对 preferred/rejected response 打分，reward margin 控制 DPO 中的动态缩放项，使高置信 pair 获得更大更新强度。</em></p>\n<p>MM-DPO 的背景是多模态 LLM 对齐数据与 reward signal 的质量差异很大。同一个图像或视频 query 往往有多个模型回答，人工标注会给出排序、打分和原因。如果只取最难的 pair，很多有用的 ranking 信息会被丢弃；如果像传统 DPO 一样把所有 pair 等权处理，rank 差距很小、reward margin 很低的样本会和 rank 差距很大的高置信样本产生同样更新强度，训练效率和鲁棒性都会受影响。</p>\n<p>MM-RLHF 项目先构造了大规模多模态偏好数据：从千万级多模态 instruction 来源中聚类、去重、采样，再用 GPT-4o、Qwen2-VL-72B 等强模型生成候选回答，最后由人工进行分数、排序和文本解释标注。为了让 reward signal 更可解释，论文训练了 critique-based reward model：模型先生成对回答的 critique，再基于 critique 给分。这一点很重要，因为 MM-DPO 的动态缩放直接依赖 reward margin；如果 reward model 自身排序不可靠，动态 <span class=\"kb-math kb-math-inline\">\\beta</span> 会放大错误信号。</p>\n<p>传统 DPO 的 pairwise loss 可以写作：</p>\n<div class=\"kb-math kb-math-display\">\\ell_{\\mathrm{DPO}}(\\theta)=\n-\\log\\sigma\\left(\n\\beta\\left[\n\\log\\frac{\\pi_\\theta(y_w\\mid x)}{\\pi_{ref}(y_w\\mid x)}\n-\n\\log\\frac{\\pi_\\theta(y_l\\mid x)}{\\pi_{ref}(y_l\\mid x)}\n\\right]\n\\right)</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">y_w</span> 是 preferred response，<span class=\"kb-math kb-math-inline\">y_l</span> 是 rejected response，<span class=\"kb-math kb-math-inline\">\\beta</span> 控制偏好 margin 的更新强度。传统 DPO 使用全局固定 <span class=\"kb-math kb-math-inline\">\\beta</span>，默认所有 pair 的偏好确定性相同。MM-DPO 将 reward model 分数引入这个位置，先计算：</p>\n<div class=\"kb-math kb-math-display\">\\delta=r(y_w)-r(y_l)</div>\n<p>再用有界动态缩放函数：</p>\n<div class=\"kb-math kb-math-display\">\\beta(\\delta)=\\beta_{ori}\\left(1+w(1-e^{-k\\delta})\\right)</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">k</span> 控制 reward margin 到 scaling factor 的敏感度，<span class=\"kb-math kb-math-inline\">w</span> 控制动态修正强度。由于 <span class=\"kb-math kb-math-inline\">1-e^{-k\\delta}\\in[0,1]</span>，<span class=\"kb-math kb-math-inline\">\\beta(\\delta)</span> 被限制在 <span class=\"kb-math kb-math-inline\">[\\beta_{ori},(1+w)\\beta_{ori}]</span>。直觉上，<span class=\"kb-math kb-math-inline\">\\delta</span> 越大，reward model 越确信 <span class=\"kb-math kb-math-inline\">y_w</span> 明显优于 <span class=\"kb-math kb-math-inline\">y_l</span>，DPO 更新就应该更强；<span class=\"kb-math kb-math-inline\">\\delta</span> 很小时，pair 可能只是细微差异或存在标注/模型不确定性，更新强度就接近默认值。</p>\n<pre><code class=\"language-python\"># MM-DPO 动态奖励缩放伪代码\npolicy = init_from(sft_model)\nreference = freeze_copy(sft_model)\nreward_model = load_mm_rlhf_reward_7b()\n\nfor batch in mm_rlhf_queries:\n    pairs = []\n    for x, ranked_responses in batch:\n        for y_w, y_l in all_pairs_with_different_rank(ranked_responses):\n            score_w = reward_model.score(x, y_w)\n            score_l = reward_model.score(x, y_l)\n            delta = score_w - score_l\n            beta_delta = beta_ori * (1 + w * (1 - exp(-k * delta)))\n            beta_delta = clip(beta_delta, beta_ori, (1 + w) * beta_ori)\n            pairs.append((x, y_w, y_l, beta_delta))\n\n    loss = 0\n    for x, y_w, y_l, beta_delta in pairs:\n        margin = logprob(policy, y_w, x) - logprob(reference, y_w, x)\n        margin -= logprob(policy, y_l, x) - logprob(reference, y_l, x)\n        loss += -logsigmoid(beta_delta * margin)\n\n    loss += lambda_sft * supervised_loss(policy, batch)\n    update(policy, loss)\n</code></pre>\n<div class=\"key-point\">💡 关键：MM-DPO 不是替换 DPO 的 pairwise logistic 形式，而是替换固定 <span class=\"kb-math kb-math-inline\">\\beta</span> 的假设。它把“这个偏好对有多可信、多值得学习”编码进 <span class=\"kb-math kb-math-inline\">\\beta(\\delta)</span>，让 reward margin 成为样本级训练强度。</div>\n<p>与普通文本 DPO 相比，多模态场景的难点在于 response 质量维度更多，包括视觉感知、OCR、图表理解、视频理解、事实性、帮助性和安全性等。一个 response 可能在文本流畅性上很好，却在图像证据上犯错；另一个 response 可能短但更忠实。MM-RLHF 的 critique-based reward model 试图把这些细粒度评价转化为可用于训练的标量分数，并通过解释提升 reward 的可学习性。MM-DPO 则把这些分数差用于调节优化强度，而不是简单丢给 DPO 等权训练。</p>\n<p>枚举所有有效比较对是 MM-DPO 的另一个关键点。假设一个 query 有四个回答，人工排序为 <span class=\"kb-math kb-math-inline\">1&gt;2&gt;3&gt;4</span>，传统做法可能只选 <span class=\"kb-math kb-math-inline\">(1,4)</span> 或若干 hardest pairs。MM-DPO 会把所有 rank 不同的组合都作为偏好 pair，这能让模型学习更完整的排序结构。不过，这也会引入大量小 margin pair，例如 <span class=\"kb-math kb-math-inline\">(2,3)</span> 或 <span class=\"kb-math kb-math-inline\">(3,4)</span>。动态奖励缩放正是为了解决这个副作用：大 margin pair 强更新，小 margin pair 弱更新，所有 pair 都能参与训练但不会等权噪声化。</p>\n<p>论文附录还说明了实现稳定性：MM-DPO 训练中加入 SFT loss 作为常见稳定项，通过网格搜索选择 SFT loss 权重和学习率；视觉编码器保持冻结以稳定且高效训练；初始 <span class=\"kb-math kb-math-inline\">\\beta_{ori}</span> 设置为较小默认值 0.1，因为训练中会动态调整。超参数 <span class=\"kb-math kb-math-inline\">k</span> 和 <span class=\"kb-math kb-math-inline\">w</span> 分别控制 reward margin 映射速度和动态修正幅度，默认 <span class=\"kb-math kb-math-inline\">w=0.5,k=0.5</span> 表现较好。这样做的目标是避免 outlier reward margin 导致 <span class=\"kb-math kb-math-inline\">\\beta</span> 过大，从而维持训练稳定。</p>\n<p>从结果解释看，MM-DPO 的贡献不只是“多模态版 DPO”。如果只把 MM-RLHF 数据配合传统 DPO 使用，模型已经能获得一定提升；如果再用隐式 reward 或不可靠动态策略，提升可能不稳定。MM-DPO 的有效性来自三者组合：高质量人工偏好数据提供比较对，critique-based reward model 提供可信 margin，bounded dynamic scaling 把 margin 转换成稳定的样本级学习率。项目页展示了对 conversation、hallucination、general、chart、OCR、math、multi-image、video、real-world 和 safety 等维度的广泛提升，并强调安全相关 unsafe behavior 明显下降。</p>",
      "quiz": {
        "q": "MM-DPO 中 Dynamic Reward Scaling 的核心目的是什么？",
        "options": [
          "根据 reward margin 调整每个偏好对的 DPO 更新强度，让高置信 pair 影响更大",
          "用 reward model 直接替代语言模型生成最终答案",
          "只保留 hardest pair，删除所有低 margin pair",
          "把视觉编码器也纳入强化学习在线 rollout"
        ],
        "answer": 0,
        "explain": "MM-DPO 先用 reward model 计算 preferred 与 rejected 的分数差，再把该 margin 映射成有界的动态 beta，用于调节 DPO loss。"
      }
    },
    {
      "id": "onpo",
      "num": 24,
      "name": "乐观Nash策略优化 (ONPO)",
      "fullName": "乐观Nash策略优化 (ONPO)",
      "year": "2026",
      "org": "",
      "parent": "dpo",
      "paperUrl": "https://proceedings.neurips.cc/paper_files/paper/2025/hash/eab6ea376caf12d786adbb0a090fb842-Abstract-Conference.html",
      "projectUrl": "",
      "category": "direct_preference",
      "motivation": "乐观Nash策略在线对齐",
      "summary": "ONPO 将 LLM 偏好对齐从 Bradley-Terry 标量奖励建模改写为一般偏好下的双人零和博弈，并用乐观在线镜像下降在自博弈中近似 Nash policy。它解决了传统奖励模型难以表达非传递/群体异质偏好的问题，同时把平均策略 duality gap 从常规自博弈 O(T^{-1/2}) 改进到 O(T^{-1})。",
      "keyPoints": [
        "放弃 BT 模型假设，不再要求存在全局标量奖励函数 <span class=\"kb-math kb-math-inline\">R^*(x,y)</span>，而是直接使用二元偏好 oracle <span class=\"kb-math kb-math-inline\">P(y_1 \\succ y_2\\mid x)</span>",
        "将偏好对齐定义为双人零和博弈：一个策略生成响应，另一个策略作为对手响应，收益是前者相对后者的期望胜率",
        "Nash policy 的目标是对任意对手至少不输，即在对称博弈中达到约 50% 的均衡胜率",
        "使用 duality gap 衡量策略距离 Nash 均衡的程度，而不是只看单个 reward model 分数",
        "在普通在线镜像下降基础上加入 optimistic predictor <span class=\"kb-math kb-math-inline\">m_t=r_{t-1}</span>，通过两步更新显式利用自博弈相邻轮次变化较小的结构",
        "理论上证明平均策略的 duality gap 达到 <span class=\"kb-math kb-math-inline\">O(T^{-1})</span>，优于普通 OMD/INPO 类方法的 <span class=\"kb-math kb-math-inline\">O(T^{-1/2})</span>",
        "实现上不需要显式估计整条策略分布上的 <span class=\"kb-math kb-math-inline\">r_t(y)=P(y\\succ\\pi_t)</span>，而是把在线采样响应对转成偏好数据集并最小化平方型直接偏好损失",
        "实验主要在 AlpacaEval 2.0、Arena-Hard、MT-Bench 及通用能力基准上比较在线 DPO、SPPO、INPO 等方法"
      ],
      "detail": "<p><img alt=\"ONPO 论文 Figure 1：学习率敏感性实验（NeurIPS 官方 PDF 原文）\" src=\"https://proceedings.neurips.cc/paper_files/paper/2025/file/eab6ea376caf12d786adbb0a090fb842-Paper-Conference.pdf\" />\n<em>图：ONPO 论文没有给出单独的架构总览图；官方 PDF 中的 Figure 1 展示学习率 <span class=\"kb-math kb-math-inline\">\\eta</span> 变化下 ONPO 在 Arena-Hard 与 AlpacaEval 2.0 上的稳健性。方法流程可概括为“当前策略采样响应对 → 偏好 oracle 比较 → 更新辅助策略 <span class=\"kb-math kb-math-inline\">\\pi&#x27;_t</span> → 乐观更新主策略 <span class=\"kb-math kb-math-inline\">\\pi_t</span>”。</em></p>\n<pre><code class=\"language-python\"># ONPO 高层伪代码：用乐观 OMD 做在线 Nash 偏好对齐\ninitialize pi_prime = pi_sft          # auxiliary policy pi'_1\ninitialize pi = pi_sft                # policy pi_1\n\nfor t in range(1, T):\n    # 1. 从当前策略采样成对回答，而不是训练单独 reward model\n    pairs = sample_response_pairs(policy=pi, prompts=batch_prompts)\n\n    # 2. 偏好 oracle / preference model 只返回二元偏好，形成 (winner, loser)\n    D_t = []\n    for y1, y2 in pairs:\n        yw, yl = preference_oracle.compare(y1, y2)\n        D_t.append((yw, yl))\n\n    # 3. 先用本轮真实偏好更新 auxiliary policy pi'_{t+1}\n    pi_prime_next = argmin_policy(\n        mean((g_t(policy, yw, yl, anchor=pi_prime) - eta / 2) ** 2 for yw, yl in D_t)\n    )\n\n    # 4. 再用 pi'_{t+1} 作为近端锚点更新主策略 pi_{t+1}\n    pi_next = argmin_policy(\n        mean((g_next(policy, yw, yl, anchor=pi_prime_next) - eta / 2) ** 2 for yw, yl in D_t)\n    )\n\n    pi_prime, pi = pi_prime_next, pi_next\n\nreturn pi  # 论文实现输出最后一轮策略 pi_T\n</code></pre>\n<p>ONPO 的出发点是：人类偏好未必能被一个标量奖励函数完整表示。BT 模型默认某个响应 <span class=\"kb-math kb-math-inline\">y</span> 有潜在奖励 <span class=\"kb-math kb-math-inline\">R^*(x,y)</span>，两两偏好由奖励差决定；这会隐含偏好传递性。但真实偏好可能存在循环，例如群体 A 偏好简洁、群体 B 偏好详细、群体 C 偏好安全保守，聚合后未必存在一个单调排序。ONPO 因此直接定义一般偏好 oracle：</p>\n<div class=\"kb-math kb-math-display\">z \\sim \\mathrm{Ber}\\left(P(y_1 \\succ y_2\\mid x)\\right),</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">z=1</span> 表示 <span class=\"kb-math kb-math-inline\">y_1</span> 优于 <span class=\"kb-math kb-math-inline\">y_2</span>。这一步把偏好学习从“给每个回答打分”改成“比较两个策略产出的回答”，为 Nash 学习提供了博弈视角。</p>\n<p>在博弈形式中，两个策略 <span class=\"kb-math kb-math-inline\">\\pi_1,\\pi_2</span> 分别从同一个 prompt <span class=\"kb-math kb-math-inline\">x</span> 下采样回答，第一方收益定义为期望胜率：</p>\n<div class=\"kb-math kb-math-display\">J(\\pi_1,\\pi_2)=\\mathbb{E}_{x\\sim d,\\,y_1\\sim\\pi_1(\\cdot\\mid x),\\,y_2\\sim\\pi_2(\\cdot\\mid x)}\\left[P(y_1\\succ y_2\\mid x)\\right].</div>\n<p>由于这是对称零和式比较，Nash policy <span class=\"kb-math kb-math-inline\">\\pi^*</span> 的直觉是“任何其他策略都不能稳定击败它”。论文用 duality gap 度量近似程度：</p>\n<div class=\"kb-math kb-math-display\">\\mathrm{DualGap}(\\pi)=\\max_{\\pi_1}J(\\pi_1,\\pi)-\\min_{\\pi_2}J(\\pi,\\pi_2).</div>\n<p>当 duality gap 为 0 时，策略达到 Nash 均衡；当它小于 <span class=\"kb-math kb-math-inline\">\\epsilon</span> 时，可以称为 <span class=\"kb-math kb-math-inline\">\\epsilon</span>-approximate Nash policy。</p>\n<p>普通自博弈 OMD 的更新是让下一轮策略在“赢过当前策略”的收益和 KL 近端稳定性之间折中：</p>\n<div class=\"kb-math kb-math-display\">\\pi_{t+1}=\\arg\\max_\\pi \\langle \\pi,r_t\\rangle-\\frac{1}{\\eta}\\mathrm{KL}(\\pi\\Vert\\pi_t),</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">r_t(y)=\\mathbb{E}_{y&#x27;\\sim\\pi_t}[P(y\\succ y&#x27;)]</span>。ONPO 的关键变化是把 optimistic OMD 引入这个自博弈过程：</p>\n<div class=\"kb-math kb-math-display\">\\pi_t=\\arg\\max_\\pi \\langle \\pi,m_t\\rangle-\\frac{1}{\\eta}\\mathrm{KL}(\\pi\\Vert\\pi&#x27;_t),</div>\n<div class=\"kb-math kb-math-display\">\\pi&#x27;_{t+1}=\\arg\\max_\\pi \\langle \\pi,r_t\\rangle-\\frac{1}{\\eta}\\mathrm{KL}(\\pi\\Vert\\pi&#x27;_t).</div>\n<p>这里 <span class=\"kb-math kb-math-inline\">m_t</span> 是对本轮收益的预测。论文利用相邻策略变化小这一事实，直接取 <span class=\"kb-math kb-math-inline\">m_t=r_{t-1}</span>。直觉上，普通 OMD 是“看到本轮反馈后再走一步”，而乐观 OMD 是“先按上一轮反馈预测走一步，再用真实反馈校正辅助点”。在自博弈中，收益变化项 <span class=\"kb-math kb-math-inline\">\\lVert r_t-r_{t-1}\\rVert_\\infty^2</span> 会被策略稳定项抵消，因此得到更快的 <span class=\"kb-math kb-math-inline\">O(T^{-1})</span> duality-gap 界。</p>\n<p>工程实现的难点是 <span class=\"kb-math kb-math-inline\">r_t(y)=P(y\\succ\\pi_t)</span> 需要对整条策略分布求期望，直接估计昂贵。ONPO 通过闭式解的 log-ratio 条件把它改写成偏好对上的监督损失。令</p>\n<div class=\"kb-math kb-math-display\">g_t(\\pi,y,y&#x27;)=\\log\\frac{\\pi(y)}{\\pi(y&#x27;)}-\\log\\frac{\\pi&#x27;_t(y)}{\\pi&#x27;_t(y&#x27;)},</div>\n<p>则可在采样得到的 winner/loser 数据 <span class=\"kb-math kb-math-inline\">(y_w,y_l)\\sim D_t</span> 上优化：</p>\n<div class=\"kb-math kb-math-display\">\\mathcal{L}_t(\\pi)=\\mathbb{E}_{(y_w,y_l)\\sim D_t}\\left[\\left(g_t(\\pi,y_w,y_l)-\\frac{\\eta}{2}\\right)^2\\right].</div>\n<p>这使 ONPO 与 DPO 类方法一样可以用常规语言模型 log-prob 训练，但数据是在线自博弈产生的，优化目标又来自 Nash/optimistic OMD。它和 DPO 的根本区别是：DPO 仍围绕固定偏好数据和隐式 BT reward 推导；ONPO 直接追求一般偏好博弈的均衡策略，尤其适合偏好非传递、偏好多群体混合或奖励模型排序不稳定的场景。</p>\n<div class=\"key-point\">💡 关键：ONPO 的“乐观”不是更大的步长，而是把上一轮自博弈收益当作本轮预测器，使策略更新能利用博弈序列的平滑性；KL 项仍然用于近端稳定，但不再把目标函数本身改成 KL-regularized game。</div>",
      "quiz": {
        "q": "ONPO 相比普通自博弈 OMD 的核心改进是什么？",
        "options": [
          "把二元偏好重新拟合成单个 Bradley-Terry 奖励模型",
          "用上一轮收益作为 optimistic predictor，并采用两步镜像下降更新",
          "只在离线偏好数据上训练，不再进行在线采样",
          "删除所有 KL 近端项以扩大策略更新幅度"
        ],
        "answer": 1,
        "explain": "ONPO 的关键是 optimistic OMD：先用预测收益更新主策略，再用真实收益更新辅助策略，从而在自博弈中获得更快的 duality-gap 收敛。"
      }
    }
  ],
  "categories": {
    "foundational": {
      "label": "奠基算法",
      "color": "#3b82f6"
    },
    "rl_based": {
      "label": "基于RL的对齐",
      "color": "#10b981"
    },
    "direct_preference": {
      "label": "直接偏好优化",
      "color": "#8b5cf6"
    },
    "token_multimodal": {
      "label": "Token级与多模态",
      "color": "#f59e0b"
    }
  },
  "projectUrls": {}
};
