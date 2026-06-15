/**
 * llm_rlhf-data.js — 由 pipeline/build.py 于 2026-06-15 09:55:58 自动生成。
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
      "summary": "基于人类反馈的强化学习 (RLHF) 的核心目标是：三阶段流程，PPO+奖励模型对齐。",
      "keyPoints": [
        "核心动机：三阶段流程，PPO+奖励模型对齐"
      ],
      "detail": "<p>三阶段流程，PPO+奖励模型对齐</p>"
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
      "summary": "InstructGPT 的核心目标是：RLHF工业化，指令遵循能力突破。",
      "keyPoints": [
        "核心动机：RLHF工业化，指令遵循能力突破",
        "演化来源：继承或改进自 rlhf"
      ],
      "detail": "<p>RLHF工业化，指令遵循能力突破</p>"
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
      "summary": "宪法AI (Constitutional AI) 的核心目标是：宪法原则驱动的自我修订机制。",
      "keyPoints": [
        "核心动机：宪法原则驱动的自我修订机制",
        "演化来源：继承或改进自 rlhf"
      ],
      "detail": "<p>宪法原则驱动的自我修订机制</p>"
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
      "summary": "基于AI反馈的强化学习 (RLAIF) 的核心目标是：AI反馈替代人工偏好标注。",
      "keyPoints": [
        "核心动机：AI反馈替代人工偏好标注",
        "演化来源：继承或改进自 constitutional_ai"
      ],
      "detail": "<p>AI反馈替代人工偏好标注</p>"
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
      "summary": "直接偏好优化 (DPO) 的核心目标是：去除奖励模型，直接偏好分类优化。",
      "keyPoints": [
        "核心动机：去除奖励模型，直接偏好分类优化",
        "演化来源：继承或改进自 rlhf"
      ],
      "detail": "<p>去除奖励模型，直接偏好分类优化</p>"
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
      "summary": "身份偏好优化 (IPO) 的核心目标是：MSE正则化解决DPO过拟合。",
      "keyPoints": [
        "核心动机：MSE正则化解决DPO过拟合",
        "演化来源：继承或改进自 dpo"
      ],
      "detail": "<p>MSE正则化解决DPO过拟合</p>"
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
      "summary": "Kahneman-Tversky优化 (KTO) 的核心目标是：前景理论，仅需二元好坏反馈。",
      "keyPoints": [
        "核心动机：前景理论，仅需二元好坏反馈",
        "演化来源：继承或改进自 dpo"
      ],
      "detail": "<p>前景理论，仅需二元好坏反馈</p>"
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
      "summary": "比值比偏好优化 (ORPO) 的核心目标是：单阶段对齐，无需参考模型。",
      "keyPoints": [
        "核心动机：单阶段对齐，无需参考模型",
        "演化来源：继承或改进自 dpo"
      ],
      "detail": "<p>单阶段对齐，无需参考模型</p>"
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
      "summary": "简单偏好优化 (SimPO) 的核心目标是：长度归一化奖励，去参考模型。",
      "keyPoints": [
        "核心动机：长度归一化奖励，去参考模型",
        "演化来源：继承或改进自 dpo"
      ],
      "detail": "<p>长度归一化奖励，去参考模型</p>"
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
      "summary": "Token级直接偏好优化 (TDPO) 的核心目标是：Token级前向KL约束保持多样性。",
      "keyPoints": [
        "核心动机：Token级前向KL约束保持多样性",
        "演化来源：继承或改进自 dpo"
      ],
      "detail": "<p>Token级前向KL约束保持多样性</p>"
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
      "summary": "自博弈对抗Critic (SPAC) 的核心目标是：自博弈对抗Critic离线对齐。",
      "keyPoints": [
        "核心动机：自博弈对抗Critic离线对齐",
        "演化来源：继承或改进自 dpo"
      ],
      "detail": "<p>自博弈对抗Critic离线对齐</p>"
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
      "summary": "组相对策略优化 (GRPO) 的核心目标是：组相对评分取代Critic模型。",
      "keyPoints": [
        "核心动机：组相对评分取代Critic模型",
        "演化来源：继承或改进自 rlhf"
      ],
      "detail": "<p>组相对评分取代Critic模型</p>"
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
      "summary": "强化Token优化 (RTO) 的核心目标是：MDP建模提取Token级奖励。",
      "keyPoints": [
        "核心动机：MDP建模提取Token级奖励",
        "演化来源：继承或改进自 tdpo"
      ],
      "detail": "<p>MDP建模提取Token级奖励</p>"
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
      "summary": "选择性偏好优化 (SePO) 的核心目标是：选择性优化关键Token降低成本。",
      "keyPoints": [
        "核心动机：选择性优化关键Token降低成本",
        "演化来源：继承或改进自 tdpo"
      ],
      "detail": "<p>选择性优化关键Token降低成本</p>"
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
      "summary": "LLM医生 (LLMdoctor) 的核心目标是：流引导Token级测试时对齐。",
      "keyPoints": [
        "核心动机：流引导Token级测试时对齐",
        "演化来源：继承或改进自 tdpo"
      ],
      "detail": "<p>流引导Token级测试时对齐</p>"
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
      "summary": "三角色自博弈RL (TriPlay-RL) 的核心目标是：多角色自博弈安全对齐。",
      "keyPoints": [
        "核心动机：多角色自博弈安全对齐",
        "演化来源：继承或改进自 grpo"
      ],
      "detail": "<p>多角色自博弈安全对齐</p>"
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
      "summary": "轻量对齐 (Light Alignment) 的核心目标是：单神经元安全专家自反射。",
      "keyPoints": [
        "核心动机：单神经元安全专家自反射",
        "演化来源：继承或改进自 grpo"
      ],
      "detail": "<p>单神经元安全专家自反射</p>"
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
      "summary": "f散度GRPO (f-GRPO) 的核心目标是：散度泛化的GRPO改进。",
      "keyPoints": [
        "核心动机：散度泛化的GRPO改进",
        "演化来源：继承或改进自 grpo"
      ],
      "detail": "<p>散度泛化的GRPO改进</p>"
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
      "summary": "蜂群数据选择 (BeeS) 的核心目标是：边际最大化数据选择改进DPO。",
      "keyPoints": [
        "核心动机：边际最大化数据选择改进DPO",
        "演化来源：继承或改进自 dpo"
      ],
      "detail": "<p>边际最大化数据选择改进DPO</p>"
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
      "summary": "双向DPO (BiDPO) 的核心目标是：双向Token级VLM偏好优化。",
      "keyPoints": [
        "核心动机：双向Token级VLM偏好优化",
        "演化来源：继承或改进自 tdpo"
      ],
      "detail": "<p>双向Token级VLM偏好优化</p>"
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
      "summary": "Token自适应屏障PO (TAB-PO) 的核心目标是：自适应屏障保护关键Token。",
      "keyPoints": [
        "核心动机：自适应屏障保护关键Token",
        "演化来源：继承或改进自 tdpo"
      ],
      "detail": "<p>自适应屏障保护关键Token</p>"
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
      "summary": "Token级策略优化 (TLPO) 的核心目标是：Token级策略优化缓解语言混淆。",
      "keyPoints": [
        "核心动机：Token级策略优化缓解语言混淆",
        "演化来源：继承或改进自 tdpo"
      ],
      "detail": "<p>Token级策略优化缓解语言混淆</p>"
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
      "summary": "多模态DPO (MM-DPO) 的核心目标是：动态奖励缩放多模态对齐。",
      "keyPoints": [
        "核心动机：动态奖励缩放多模态对齐",
        "演化来源：继承或改进自 dpo"
      ],
      "detail": "<p>动态奖励缩放多模态对齐</p>"
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
      "summary": "乐观Nash策略优化 (ONPO) 的核心目标是：乐观Nash策略在线对齐。",
      "keyPoints": [
        "核心动机：乐观Nash策略在线对齐",
        "演化来源：继承或改进自 dpo"
      ],
      "detail": "<p>乐观Nash策略在线对齐</p>"
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
