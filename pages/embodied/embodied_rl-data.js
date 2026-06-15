/**
 * embodied_rl-data.js — 由 pipeline/build.py 于 2026-06-15 18:08:23 自动生成。
 * 源文件：content/embodied/embodied_rl.md
 * ⚠️  请勿手动修改；如需更新，修改源文档后重新编译。
 */
window.PAGE_CONFIG = {
  "meta": {
    "domain": "embodied",
    "topic_id": "embodied_rl",
    "topic_name": "具身强化学习",
    "page_title": "具身强化学习算法总结",
    "page_subtitle": "2026-06-15 版",
    "page_desc": "系统梳理具身智能中强化学习的发展历程，涵盖从基础控制策略到Sim2Real迁移、离线RL预训练及复杂技能层次化学习的技术演进。",
    "page_icon": "🤖",
    "hero_pills": [
      "🏷️ Sim2Real · 离线RL · 技能学习 · 奖励设计"
    ],
    "count_pill": "{count} 个算法",
    "image_base": "../../content/embodied/embodied_rl/assets/",
    "overview_from_doc": true,
    "latest_overview_from_doc": true
  },
  "overview": [
    {
      "title": "",
      "body_html": "<h1>2026年RL（强化学习）在Robotics（具身智能）中的新范式分析</h1>\n<ul>\n<li>来源平台: <strong>zhihu</strong>（知乎专栏文章）</li>\n<li>原文链接: <a href=\"https://zhuanlan.zhihu.com/p/2002328291592401820\">https://zhuanlan.zhihu.com/p/2002328291592401820</a></li>\n<li>作者: gurubar</li>\n</ul>\n<hr />\n<p>2026年RL（强化学习）在Robotics（具身智能）中的新范式分析</p>\n<h1>2026年RL（强化学习）在Robotics（具身智能）中的新范式分析</h1>\n<p>作者: gurubar, 赞: 146</p>\n<h2><strong>前言</strong></h2>\n<p>2026年的具身智能 RL 正在从“单点算法突破”转向“可扩展、可验证、可对齐”的系统范式：云端世界模型、生成式策略后训练、真实机器人三段式闭环、以及 GPU 物理仿真规模化共同构成新主线。<strong>总体趋势是：RL 从“从零学控制”逐步变成“面向大策略/大模型的后训练（post-training）与稳健性/对齐工具”，并与世界模型、扩散策略、真实机器人数据闭环、安全约束</strong>强耦合。下面结合相关趋势，简要分析其中相关议题，便于忙碌的“您”整体了解，限于篇幅无法详细展开(具体细节请参考相应议题的论文)。</p>\n<h2>世界模型（World Model）里做 RL：把“交互成本”搬到云端</h2>\n<p>机器人强化学习（RL）受制于高昂且不可逆的物理交互成本，而传统物理仿真虽可扩展，却长期受 sim2real gap 限制。随着从真实视频-动作数据学习到的动作条件<strong>生成式世界模型</strong>兴起，机器人策略优化的“环境载体”正在从 physics simulator 扩展为 learned video simulator。这一趋势抽象为一种后训练范式：<strong>用世界模型生成可采样的 imagined rollout，用 VLM/奖励模型提供可学习的奖励与终止判定，在云端执行 RL 微调，再将策略迁移回真机验证与迭代</strong>。</p>\n<h3>World-Model RL Post-Training（统一抽象）</h3>\n<p>考虑一个视觉-语言-动作策略<strong>（VLA policy）</strong>： 观测 <img alt=\"o_t​\" src=\"https://www.zhihu.com/equation?tex=o_t%E2%80%8B\" /> （图像/视频帧 + 机器人状态），语言指令 x； 动作 <img alt=\"a_t \\in \\mathcal{A}\" src=\"https://www.zhihu.com/equation?tex=a_t+%5Cin+%5Cmathcal%7BA%7D\" /> ，策略 <img alt=\"\\pi_\\theta(a_t \\mid o_t, x)\" src=\"https://www.zhihu.com/equation?tex=%5Cpi_%5Ctheta%28a_t+%5Cmid+o_t%2C+x%29\" /> ；学习到的<strong>动作条件视频世界模型（video world model）</strong>：</p>\n<p><img alt=\"\\hat{o}_{t+1} \\sim p_\\phi(\\cdot \\mid \\hat{o}_t, a_t, x)\" src=\"https://www.zhihu.com/equation?tex=%5Chat%7Bo%7D_%7Bt%2B1%7D+%5Csim+p_%5Cphi%28%5Ccdot+%5Cmid+%5Chat%7Bo%7D_t%2C+a_t%2C+x%29\" /></p>\n<p>它把真实环境转写为一个可采样的“虚拟转移函数”，可在云端生成 imagined trajectories。<strong>奖励与终止（通常来自 VLM / reward model）</strong>：</p>\n<p><img alt=\"r_t = R_\\psi(\\hat{o}_{0:t}, a_{0:t}, x), \\quad d_t = D_\\psi(\\hat{o}_{0:t}, x)\" src=\"https://www.zhihu.com/equation?tex=r_t+%3D+R_%5Cpsi%28%5Chat%7Bo%7D_%7B0%3At%7D%2C+a_%7B0%3At%7D%2C+x%29%2C+%5Cquad+d_t+%3D+D_%5Cpsi%28%5Chat%7Bo%7D_%7B0%3At%7D%2C+x%29\" /></p>\n<p>其中 <img alt=\"d_t \" src=\"https://www.zhihu.com/equation?tex=d_t+\" /> 表示任务完成/终止，用于解决“完成后仍冗余动作”的执行低效问题（<a href=\"https://link.zhihu.com/?target=https%3A//arxiv.org/pdf/2509.24948\">World-Env</a> 明确把 reward + termination 做成 VLM 引导模块）。</p>\n<h3><strong>两阶段：先学环境、再在环境里做 RL</strong></h3>\n<p><strong>阶段 A（环境学习）</strong>：从数据集 ![\\mathcal{D}={(o_t,a_t,o_{t+1},x)](https://www.zhihu.com/equation?tex=%5Cmathcal%7BD%7D%3D%5C%7B%28o_t%2Ca_t%2Co_%7Bt%2B1%7D%2Cx%29%5C) 训练 <img alt=\"p_\\phi\" src=\"https://www.zhihu.com/equation?tex=p_%5Cphi\" /> ​。大规模真实数据例如 <a href=\"https://link.zhihu.com/?target=https%3A//arxiv.org/pdf/2308.12952\">BridgeData V2</a>报告约 6 万条轨迹、跨 24 个环境的多样性，用于支撑泛化学习。</p>\n<p><img alt=\"\" src=\"https://pic4.zhimg.com/v2-f6f67705c2cc34187087ee00a9ba837b_1440w.jpg\" /></p>\n<p>BridgeData V2</p>\n<p><strong>阶段 B（策略后训练）</strong>：固定或缓慢更新 <img alt=\"p_\\phi\" src=\"https://www.zhihu.com/equation?tex=p_%5Cphi\" /> ，在 imagined env 内进行 RL 更新 <img alt=\"\\pi_\\theta\" src=\"https://www.zhihu.com/equation?tex=%5Cpi_%5Ctheta\" /> ​：</p>\n<p><img alt=\"\\max_\\theta \\ \\mathbb{E}_{\\tau \\sim (p_\\phi,\\pi_\\theta)}\\Big[\\sum_{t=0}^{T-1}\\gamma^t r_t\\Big]\" src=\"https://www.zhihu.com/equation?tex=%5Cmax_%5Ctheta+%5C+%5Cmathbb%7BE%7D_%7B%5Ctau+%5Csim+%28p_%5Cphi%2C%5Cpi_%5Ctheta%29%7D%5CBig%5B%5Csum_%7Bt%3D0%7D%5E%7BT-1%7D%5Cgamma%5Et+r_t%5CBig%5D\" /></p>\n<p>其中 rollout 完全在云端完成，奖励由 <img alt=\"R_\\psi \" src=\"https://www.zhihu.com/equation?tex=R_%5Cpsi+\" /> 给出。</p>\n<h3><strong>三种“落地实现”分支</strong></h3>\n<ul>\n<li><strong>VLM 直接打分做奖励（</strong><a href=\"https://link.zhihu.com/?target=https%3A//arxiv.org/pdf/2602.02454\">World-Gymnast</a> <strong>/</strong> <a href=\"https://link.zhihu.com/?target=https%3A//arxiv.org/pdf/2509.24948\">World-Env</a><strong>）</strong>：rollout 在视频世界模型里，VLM 作为 reward/reflector；World-Gymnast 报告在 Bridge setup 上相对 SFT 最高 18×，并展示 test-time training 与在线迭代世界模型+策略共进化。</li>\n</ul>\n<p><img alt=\"\" src=\"https://pica.zhimg.com/v2-2457e1524f5660d1fce8dec0dc5bd68e_1440w.jpg\" /></p>\n<p>Overview of World-Gymnast</p>\n<p><img alt=\"\" src=\"https://pic4.zhimg.com/v2-e39ece14e9ec1a42f8f7bb34ab607f4d_1440w.jpg\" /></p>\n<p>Overview of World-Env</p>\n<ul>\n<li><strong>“Verified reward / reference-based”奖励（</strong><a href=\"https://link.zhihu.com/?target=https%3A//arxiv.org/pdf/2510.00406\">VLA-RFT</a><strong>）</strong>：强调用<strong>可验证的轨迹级奖励构造</strong>（<em>把策略输出的 action chunk 丢进 </em><em>world model</em><em> 做 rollout 得到预测帧 ，再把这些预测帧与离线数据里的对应真值帧 （或“真值动作”在同一 world model 里生成的对照轨迹）做相似度比较，从而得到奖励</em>）更对齐的学习信号，声称少于 400 次 fine-tuning steps 即可超过强监督基线并提升扰动鲁棒性。</li>\n</ul>\n<p><img alt=\"\" src=\"https://pica.zhimg.com/v2-d60cb06a210adc2f2ef97ccc22f27cf4_1440w.jpg\" /></p>\n<p>The Framework of VLA-RFT</p>\n<ul>\n<li><strong>on-policy 优化 + 像素级世界模型对齐（</strong><a href=\"https://link.zhihu.com/?target=https%3A//arxiv.org/pdf/2511.09515\">WMPO</a><strong>）</strong>：强调像素预测与 VLA 表征对齐，并在 imagined env 内采用 on-policy 的 GRPO 等优化以获得更稳定/更强的提升。</li>\n</ul>\n<p><img alt=\"\" src=\"https://pic1.zhimg.com/v2-2c3ddd4fac7206b4078d7b29301bd198_1440w.jpg\" /></p>\n<p>WMPO</p>\n<h3><strong>演变图</strong></h3>\n<pre><code>时间/范式演进  (physics sim) ---------------------&gt; (learned video world = cloud env)\n\n[旧范式A]  真机RL: 真实交互贵/危险/non-resettable\n[旧范式B]  物理仿真RL: rollout便宜 但 sim2real gap 大(接触/视觉/长尾)\n\n                       数据与表征底座(真机轨迹规模化)\n        BridgeData V2(CoRL'23) ----&gt; Open X-Embodiment(ICRA'24)\n                          |                 |\n                          v                 v\n                学到“动作条件视频世界模型 / 机器人想象”\n                   RoboDreamer(ICML'24) / RoboGen(ICML'24)\n                          |\n          (关键断层) video模型懂动态 但不懂怎么“可执行控制”\n                          |\n          Grounding Video→Action(ICLR'25)  (把视频子目标落到动作)\n\n========================== 新主线：World Model 里做 RL ==========================\n        world model rollout (cloud)  +  VLM reward/termination  +  RL update\n      World-Env(arXiv'25) / VLA-RFT(arXiv'25) / WMPO(arXiv'25) ---&gt; World-Gymnast(arXiv'26)\n                                                        |\n                                                        v\n                                           真机效果：&gt;SFT (Bridge setup 18x)\n\n[Gap/风险]  长时一致性&amp;接触物理 | VLM reward可信度 | 模型漏洞被RL利用 | 分布覆盖不足\n[趋势/路径]  cloud rollout做主训练 + 少量真机校准/补数据 + world model &amp; policy 在线共进化\n</code></pre>\n<h2>扩散/生成式策略 + RL：从“模仿学得像”走向“RL 学得稳、强、可控”</h2>\n<p>机器人强化学习（尤其 manipulation）里，一个显著变化是：<strong>policy 的“表达能力”越来越由生成式模型（扩散策略）提供，而“任务对齐/鲁棒/可控”越来越由 RL 的优化目标来完成</strong>。扩散策略作为“动作先验（action prior）”在模仿学习中证明了强表达性与多模态覆盖能力（例如 Diffusion Policy 在多任务 manipulation 上表现突出）。但仅靠模仿学习往往难以应对：<strong>长时序误差累积、分布外扰动、偏好/约束对齐、真实控制闭环的稳定性</strong>——这些更符合 RL/PG 的问题结构。</p>\n<h3>关键技术矛盾（为什么“扩散 + PG/PPO”不是直接套就行）</h3>\n<p>扩散策略接入 RL 的难点，本质在于：<strong>RL 需要“可控的策略更新信号”，而扩散生成过程带来“不可得/昂贵/高方差”的优化接口</strong>，典型体现在两点( 从输入到更新):</p>\n<p><img alt=\"s \\xrightarrow[\\epsilon_{1:K}]{\\text{diffusion sampler }g_\\theta}\\ a=x_0 \\xrightarrow{\\text{env}}\\ r,\\hat A \\xrightarrow{\\text{RL objective (e.g., PPO)}}\\ \\theta \\leftarrow \\theta+\\eta\\,\\nabla_\\theta J\" src=\"https://www.zhihu.com/equation?tex=s+%5Cxrightarrow%5B%5Cepsilon_%7B1%3AK%7D%5D%7B%5Ctext%7Bdiffusion+sampler+%7Dg_%5Ctheta%7D%5C+a%3Dx_0+%5Cxrightarrow%7B%5Ctext%7Benv%7D%7D%5C+r%2C%5Chat+A+%5Cxrightarrow%7B%5Ctext%7BRL+objective+%28e.g.%2C+PPO%29%7D%7D%5C+%5Ctheta+%5Cleftarrow+%5Ctheta%2B%5Ceta%5C%2C%5Cnabla_%5Ctheta+J\" /></p>\n<p>其中卡点被两句公式钉死：</p>\n<p><img alt=\"\\textbf{(i)}\\ \\ \\log\\pi_\\theta(a\\mid s)=\\log\\int p_\\theta(x_{0:K}\\mid s)\\,dx_{1:K}\\ \\ \\text{(难得)}\" src=\"https://www.zhihu.com/equation?tex=%5Ctextbf%7B%28i%29%7D%5C+%5C+%5Clog%5Cpi_%5Ctheta%28a%5Cmid+s%29%3D%5Clog%5Cint+p_%5Ctheta%28x_%7B0%3AK%7D%5Cmid+s%29%5C%2Cdx_%7B1%3AK%7D%5C+%5C+%5Ctext%7B%28%E9%9A%BE%E5%BE%97%29%7D\" /></p>\n<p><img alt=\"\\textbf{(ii)}{}\\ \\ \\frac{\\partial a}{\\partial\\theta}=\\frac{\\partial x_0}{\\partial\\theta}\\ \\text{需链式穿过 }K\\text{ 步}\\ \\Rightarrow\\ O(K)\\ \\text{且高方差}\" src=\"https://www.zhihu.com/equation?tex=%5Ctextbf%7B%28ii%29%7D%7B%7D%5C+%5C+%5Cfrac%7B%5Cpartial+a%7D%7B%5Cpartial%5Ctheta%7D%3D%5Cfrac%7B%5Cpartial+x_0%7D%7B%5Cpartial%5Ctheta%7D%5C+%5Ctext%7B%E9%9C%80%E9%93%BE%E5%BC%8F%E7%A9%BF%E8%BF%87+%7DK%5Ctext%7B+%E6%AD%A5%7D%5C+%5CRightarrow%5C+O%28K%29%5C+%5Ctext%7B%E4%B8%94%E9%AB%98%E6%96%B9%E5%B7%AE%7D\" /></p>\n<p><strong>具体地， log π(a|s) 难得</strong>：PPO/PG 的核心比值与 KL/entropy 依赖显式似然，而扩散的前向-反向过程与离散化会让精确 log-likelihood 变得棘手甚至不可用。 <strong>把 policy gradient 反传穿过多步去噪很贵且不稳</strong>：直接“穿过 diffusion steps”做 PG，常遇到算力与稳定性瓶颈（<strong>计算/显存成本</strong>∼O(K)（前向+反向都要过 K 步））。</p>\n<p>这就解释了为什么近两年工作出现了<strong>多条方法谱系</strong>：不是都走“直接 PPO”，而是在“可优化接口”上做了不同的系统化修复：</p>\n<h3>“绕开显式 logπ”：用 Q/能量/重加权目标做在线 RL（更易跑、更稳定）</h3>\n<p><strong>扩散负责“生成多样动作候选”，Q/value 负责“给候选加权/塑形”</strong>，尽量避免对 logπ 与长链路反传的依赖（如下信息流）：</p>\n<p><img alt=\"s \\ \\xrightarrow{\\text{(1) 采样/收集 }a}\\ (s,a) \\ \\xrightarrow{\\text{(2) 评估 }Q\\text{/}A}\\ w(s,a) \\ \\xrightarrow{\\text{(3) 前向扩散 }z_t}\\  \\ \\xrightarrow{\\text{(4) 加权去噪回归}}\\ \\theta\\leftarrow\\theta-\\eta\\nabla_\\theta\\mathcal L\" src=\"https://www.zhihu.com/equation?tex=s+%5C+%5Cxrightarrow%7B%5Ctext%7B%281%29+%E9%87%87%E6%A0%B7%2F%E6%94%B6%E9%9B%86+%7Da%7D%5C+%28s%2Ca%29+%5C+%5Cxrightarrow%7B%5Ctext%7B%282%29+%E8%AF%84%E4%BC%B0+%7DQ%5Ctext%7B%2F%7DA%7D%5C+w%28s%2Ca%29+%5C+%5Cxrightarrow%7B%5Ctext%7B%283%29+%E5%89%8D%E5%90%91%E6%89%A9%E6%95%A3+%7Dz_t%7D%5C++%5C+%5Cxrightarrow%7B%5Ctext%7B%284%29+%E5%8A%A0%E6%9D%83%E5%8E%BB%E5%99%AA%E5%9B%9E%E5%BD%92%7D%7D%5C+%5Ctheta%5Cleftarrow%5Ctheta-%5Ceta%5Cnabla_%5Ctheta%5Cmathcal+L\" /></p>\n<p>先用当前/旧策略在状态 s 下生成若干动作 a，用 critic 给每个动作打分得到优势或Q(s,a)，把分数变成权重 w；然后不去计算 log⁡π(a∣s)也不把梯度穿过多步去噪，而是把动作做一次前向加噪得到 <img alt=\"z_t\" src=\"https://www.zhihu.com/equation?tex=z_t\" /> ，训练扩散模型去预测这一步加入的噪声 <img alt=\"\\epsilon\" src=\"https://www.zhihu.com/equation?tex=%5Cepsilon\" /> ，并用 w 加权这个去噪误差，让“高价值动作”对参数更新贡献更大、低价值动作贡献更小。这样就用 <strong>“Q/A控制更新力度的加权去噪回归”</strong>，替代了 PPO 依赖的显式似然比值与昂贵不稳的多步反传。也就是，只是把 <strong>DDPM</strong>（Denoising diffusion probabilistic models） 的训练从“拟合数据”改成“拟合被 Q/A 偏置后的高回报动作分布”：<strong>加权去噪回归</strong>：</p>\n<p><img alt=\"\\boxed{ \\ \\ \\mathcal L(\\theta) =\\mathbb E_{(s,a)\\sim \\mu,\\ t,\\epsilon}\\Big[w(s,a)\\cdot|\\epsilon-\\epsilon_\\theta(z_t,s,t)|^2\\Big] \\ \\ }\" src=\"https://www.zhihu.com/equation?tex=%5Cboxed%7B+%5C+%5C+%5Cmathcal+L%28%5Ctheta%29+%3D%5Cmathbb+E_%7B%28s%2Ca%29%5Csim+%5Cmu%2C%5C+t%2C%5Cepsilon%7D%5CBig%5Bw%28s%2Ca%29%5Ccdot%5C%7C%5Cepsilon-%5Cepsilon_%5Ctheta%28z_t%2Cs%2Ct%29%5C%7C%5E2%5CBig%5D+%5C+%5C+%7D\" /></p>\n<p>这里的 <strong>w(s,a)</strong> 就是“RL 需要的可控更新信号”（advantage / Q / exponentiated Q / softmax Q），它替代了 PPO 里的 <img alt=\"\\nabla_\\theta\\log\\pi(a|s)\" src=\"https://www.zhihu.com/equation?tex=%5Cnabla_%5Ctheta%5Clog%5Cpi%28a%7Cs%29\" /> 与 ratio/KL。具体地，<a href=\"https://link.zhihu.com/?target=https%3A//proceedings.neurips.cc/paper_files/paper/2024/file/6111371a868af8dcfba0f96ad9e25ae3-Paper-Conference.pdf\">QVPO</a>（NeurIPS 2024）： <img alt=\"\\boxed{w(s,a)=Q(s,a)}\" src=\"https://www.zhihu.com/equation?tex=%5Cboxed%7Bw%28s%2Ca%29%3DQ%28s%2Ca%29%7D\" /> —— 直接做 Q-weighted policy improvement（tight lower bound）；<a href=\"https://link.zhihu.com/?target=https%3A//openreview.net/pdf%3Fid%3D6Anv3KB9lz\">RSM/DPMD/SDAC</a>（ICML 2025）： <img alt=\"\\boxed{w(s,a)=\\exp(Q(s,a)/\\lambda)}\" src=\"https://www.zhihu.com/equation?tex=%5Cboxed%7Bw%28s%2Ca%29%3D%5Cexp%28Q%28s%2Ca%29%2F%5Clambda%29%7D\" /> （或 softmax/Q 变体）—— 镜像下降/soft actor-critic 风格的“保守更新旋钮”由 <img alt=\"\\lambda \" src=\"https://www.zhihu.com/equation?tex=%5Clambda+\" /> 控制；<a href=\"https://link.zhihu.com/?target=https%3A//openreview.net/pdf%3Fid%3DCpjKXe9rY7\">MaxEntDP</a>（ICML 2025）： <img alt=\"\\boxed{w_i=\\text{softmax}(Q/\\beta)}\" src=\"https://www.zhihu.com/equation?tex=%5Cboxed%7Bw_i%3D%5Ctext%7Bsoftmax%7D%28Q%2F%5Cbeta%29%7D\" /> （多候选聚合到 <img alt=\"\\epsilon^*\" src=\"https://www.zhihu.com/equation?tex=%5Cepsilon%5E%2A\" /> ）+log⁡π 用数值积分近似补齐（主要在 evaluation）。</p>\n<h3>“正面接入 PPO/PG”：把扩散改造成可做 on-policy 的对象（更标准、更可控）</h3>\n<ul>\n<li><a href=\"https://link.zhihu.com/?target=https%3A//proceedings.iclr.cc/paper_files/paper/2025/file/c0749c39aaff9e9e4c91f7118bf21b1e-Paper-Conference.pdf\">DPPO（ICLR 2025）</a>：明确提出“扩散策略并非不能做 PG”，关键在于把去噪过程组织成可优化结构，并给出 fine-tuning 的 best practices；作者强调其带来更结构化、on-manifold 的探索与更稳健的训练/鲁棒性。</li>\n</ul>\n<p><img alt=\"\" src=\"https://pic2.zhimg.com/v2-730ef629b9b36df448b625dea9350ef3_1440w.jpg\" /></p>\n<p>DPPO, Diffusion Policy Policy Optimization</p>\n<p><strong>DPPO</strong> 的思路是：<strong>别执着于最终动作 a=x0 的边缘密度 π(a∣s)</strong>，而是把扩散的反向去噪链当成一个“内层决策过程”，让“可计算的概率”出现在<strong>每一步去噪转移</strong>上。直接写成最简形式就是：把“动作”提升为整条去噪轨迹 <img alt=\"\\tau_d=(x_T,\\dots,x_0)\" src=\"https://www.zhihu.com/equation?tex=%5Ctau_d%3D%28x_T%2C%5Cdots%2Cx_0%29\" /> ，其密度可分解：</p>\n<p><img alt=\"\\log p_\\theta(\\tau_d|s)=\\log p(x_T)+\\sum_{t=1}^{T}\\log p_\\theta(x_{t-1}\\mid x_t,s)\" src=\"https://www.zhihu.com/equation?tex=%5Clog+p_%5Ctheta%28%5Ctau_d%7Cs%29%3D%5Clog+p%28x_T%29%2B%5Csum_%7Bt%3D1%7D%5E%7BT%7D%5Clog+p_%5Ctheta%28x_%7Bt-1%7D%5Cmid+x_t%2Cs%29\" /></p>\n<p>PPO 用的 log⁡π 就换成这条轨迹的 <img alt=\"\\log p_\\theta(\\tau_d|s)\" src=\"https://www.zhihu.com/equation?tex=%5Clog+p_%5Ctheta%28%5Ctau_d%7Cs%29\" /> （求和可算），从而“正面”拥有 ratio/KL/entropy 这套控制面。DPPO 也明确说它就是“对动作 likelihood 求导并做 PG 更新”。</p>\n<ul>\n<li><a href=\"https://link.zhihu.com/?target=https%3A//openreview.net/pdf%3Fid%3DBmRNz1TpCc\">GenPO（NeurIPS 2025）</a>：聚焦“<strong>on-policy 最大障碍是 log-likelihood</strong>”，通过 <em>exact diffusion inversion</em> 构造可逆映射，使 logπ、entropy、KL 的估计可 tractable，从而把扩散策略更稳定地并入 on-policy RL（PPO 风格）框架。</li>\n</ul>\n<p><img alt=\"\" src=\"https://pic3.zhimg.com/v2-9c6796daa817902ad82b0334f23c6f32_1440w.jpg\" /></p>\n<p>Forward and reverse process of GenPO</p>\n<p>理论上，on-policy 目标需要 state-action density，但 diffusion policy 的 log-likelihood 因 forward/reverse 不可逆与离散化（如 Euler-Maruyama）导致不可直接计算；GenPO 用 exact diffusion inversion 构造可逆流映射来消除这种 mismatch。假设，有一个可逆映射 <img alt=\"a=f_\\theta(u,s)（u\\sim p(u)）\" src=\"https://www.zhihu.com/equation?tex=a%3Df_%5Ctheta%28u%2Cs%29%EF%BC%88u%5Csim+p%28u%29%EF%BC%89\" /> ，就可以像 normalizing flow 一样：</p>\n<p><img alt=\"\\log \\pi_\\theta(a|s)=\\log p(u)-\\log\\left|\\det \\frac{\\partial f_\\theta(u,s)}{\\partial u}\\right|\" src=\"https://www.zhihu.com/equation?tex=%5Clog+%5Cpi_%5Ctheta%28a%7Cs%29%3D%5Clog+p%28u%29-%5Clog%5Cleft%7C%5Cdet+%5Cfrac%7B%5Cpartial+f_%5Ctheta%28u%2Cs%29%7D%7B%5Cpartial+u%7D%5Cright%7C\" /></p>\n<p>这直接把 log⁡π、entropy、KL 变成 tractable 的量。GenPO 明确说它用 change-of-variables 得到给定动作的 exact density，并进一步做无偏 entropy/KL 估计，从而支持 KL-adaptive 学习率与 entropy regularization。</p>\n<h3><strong>演变图</strong></h3>\n<pre><code>(IL) 学得像：生成式动作先验\n  Demos --&gt; [Diffusion Policy | RSS'23] -------------------------------+\n                 |  GAP-1: 只学分布，不保证任务成功/鲁棒/约束对齐        |\n                 |  GAP-2: 扩散的 logπ(a|s) 难得；PG 反传穿过去噪很贵/不稳 |\n                 v                                                     |\n(Online RL) 学得稳：绕开 logπ，用 Q/value 牵引扩散\n        [QVPO | NeurIPS'24] --&gt; [DPMD/SDAC (RSM) | ICML'25] --&gt; [MaxEntDP | ICML'25]\n                 |                         |\n                 |  trend: “Q/energy reweighting” 提供更易跑的在线训练套路 |\n                 v                         v\n(On-policy PG/PPO) 学得强且可控：把扩散做成“可做 PPO 的 policy”\n        [DPPO | ICLR'25] --------- GAP: on-policy 仍卡在 logπ ----------&gt; [GenPO | NeurIPS'25]\n                 |                               (exact inversion / KL / entropy)\n                 v\n            部署：更稳(长时序) + 更强(成功率/回收能力) + 更可控(约束/偏好/实时调参)\n\n总趋势：Diffusion(表达与多模态先验)  +  RL(奖励对齐与鲁棒优化)\n     =&gt; 机器人 manipulation 的“生成式策略后训练（post-training）”主线\n</code></pre>\n<h2>真实机器人 RL 进入“工程化三段式闭环”：IL →（离线RL）→ 在线RL 修边</h2>\n<p>真实机器人强化学习（Real-World RL）是“<strong>可行但昂贵且不稳定</strong>”：在线采样成本高、失败代价高、回滚困难，导致算法创新难以直接转化为可部署系统。近期标志性变化是：出现一类更“工程化”的 <strong>post-training 闭环</strong>，将 RL 从“高风险一次性训练”改造成“可门控、可回归测试、可迭代收敛”的优化器：先用模仿学习（IL）注入强先验，再用离线 RL 做主体提升，最后用少量在线 RL 做失败模式清理与边界修补。</p>\n<h3><strong>三段式闭环：</strong></h3>\n<ul>\n<li><strong>Stage A：IL 注入 Human Prior（“把起点抬高、把方差压低”）：</strong>用 teleop/演示数据训练生成式视觉运动策略（如扩散策略），获得<strong>高覆盖、低方差</strong>的行为先验。扩散策略作为 IL backbone 的价值在于：能表达多模态动作分布、训练稳定、适合高维动作序列控制（例如，<a href=\"https://link.zhihu.com/?target=https%3A//www.roboticsproceedings.org/rss19/p026.pdf\">Diffusion Policy（RSS 2023）</a>奠定“扩散 = 强 IL backbone”的范式（多模态/高维/稳定））。</li>\n</ul>\n<p><img alt=\"\" src=\"https://pic4.zhimg.com/v2-4436d64ac77773a62511e0ddfef3a16d_1440w.jpg\" /></p>\n<p>Diffusion Policy Overview</p>\n<ul>\n<li><strong>Stage B：离线 RL 主体增益（“在安全域内做大步优化”）：</strong>关键是把“主要收益”放到离线阶段：在累积的真实交互 buffer 上做 <strong>PPO-style policy gradient 更新</strong>，但不是无条件更新，而是用 <strong>Offline Policy Evaluation (OPE) 门控</strong>过滤可能导致退化的更新，从而实现更保守、更可靠的改进（例如，<a href=\"https://link.zhihu.com/?target=https%3A//arxiv.org/html/2510.14830v1\">RL-100</a> 直接把 OPE 作为 pipeline 的 gate）。</li>\n</ul>\n<p><img alt=\"\" src=\"https://pic4.zhimg.com/v2-da82b2c0064b0e35d1bd8cccdd6a44ff_1440w.jpg\" /></p>\n<p>Overview of RL-100</p>\n<ul>\n<li><strong>Stage C：在线 RL 修边（“小预算清理长尾失败”）：</strong>在线阶段不追求“从 0 到 1”，而是针对离线阶段仍残留的 failure modes 做最后一公里的 polishing。例如，<a href=\"https://link.zhihu.com/?target=https%3A//www.roboticsproceedings.org/rss21/p019.pdf\">RSS 2025 的 ConRFT</a>：离线阶段用 BC+价值学习稳定抽取策略，在线阶段在安全干预下做强化微调以快速提升真机成功率。</li>\n</ul>\n<p><img alt=\"\" src=\"https://pic4.zhimg.com/v2-8a6a987db87fe45eb752db865a061a49_1440w.jpg\" /></p>\n<p>ConRFT</p>\n<h3><strong>演化图</strong></h3>\n<pre><code>[Old Pain] Real-robot online RL is costly + unstable\n   |  (unsafe exploration, high variance, hard rollback)\n   v\n[Key Shift] RL becomes an &quot;engineering optimizer&quot; via a staged post-training loop\n   |\n   +-------------------- Method Lineage (Generative Policy + RL) --------------------+\n   |                                                                                |\n   |  (IL backbone)                     (PG / online RL for diffusion)              |\n   |  Diffusion Policy (RSS'23) -----&gt;  DPPO (ICLR'25)  -----&gt;  ICML'25 Online DPRL  |\n   |        |                              |                       (e.g., SDAC/DPMD)|\n   |        |                              |                                          \n   |        v                              v\n   |  Strong human prior             How to do stable PG\n   |  (multi-modal actions)          for diffusion policies\n   |                                                                                |\n   +------------------------------+-------------------------------+-----------------+\n                                  |\n                                  v\n                       [RL-100 (preprint'25-10): Engineering 3-stage loop]\n                         Stage A: IL pretrain (human prior)\n                         Stage B: Offline RL  (OPE-gated conservative PPO updates)\n                         Stage C: Online  RL  (small budget; fix residual failures)\n                         + Deploy: Consistency distill (multi-step diffusion -&gt; 1-step)\n                                  |\n                                  +--&gt; [Preference Alignment Plug-in]\n                                       FDPP (ICRA'25): preference labels -&gt; reward model\n                                                     -&gt; RL fine-tune (+KL to retain skill)\n                                  |\n                                  +--&gt; [VLA fine-tuning in practice]\n                                       ConRFT (RSS'25): offline (BC+Q) + online RL\n                                                      (safe intervention; fast real-robot gain)\n\n[Trend] IL gives &quot;capability&quot;; Offline RL gives &quot;bulk improvement&quot;; Online RL gives &quot;last-mile polish&quot;;\n       Distillation makes it deployable; Preference RL makes it aligned/controllable.\n</code></pre>\n<h2>离线/模型式 RL 更“落地”：专门解决长时序分布漂移与误差累积</h2>\n<p>离线 <strong>MBRL （Model-Based Offline Reinforcement Learning）</strong>在机器人上长期痛点是：模型误差 + rollout 分布漂移 → long-horizon 崩。最新趋势是更明确地把 <strong>误差控制、数据复用、保守更新</strong>做成端到端 pipeline。<strong>offline MBRL 的落地，不是“更强的 world model”，而是“更强的误差治理链路”</strong>。</p>\n<p><img alt=\"\" src=\"https://pica.zhimg.com/v2-ef6ed5505b9793209d159289d8f10906_1440w.jpg\" /></p>\n<p>离线 MBRL</p>\n<p><strong>近期工作把这条链路逐渐标准化为三类“可组合部件”：</strong></p>\n<h3><strong>1. 明确的“保守性（pessimism/conservatism）”接口：防止模型被利用</strong></h3>\n<ul>\n<li><a href=\"https://link.zhihu.com/?target=https%3A//arxiv.org/pdf/2005.13239\">MOPO（NeurIPS 2020）</a>：把 offline 的核心难点归因于 learned policy 的分布漂移，并通过“对不确定动力学加惩罚”的 <em>penalized MDP</em> 来最大化真实回报的下界，从机制上抑制 model exploitation。 MOPO用不确定性惩罚构造 penalized MDP：</li>\n</ul>\n<p><img alt=\"\\tilde r(s,a)=\\hat r(s,a)-\\lambda\\,u(s,a)\" src=\"https://www.zhihu.com/equation?tex=%5Ctilde+r%28s%2Ca%29%3D%5Chat+r%28s%2Ca%29-%5Clambda%5C%2Cu%28s%2Ca%29\" /></p>\n<p>其中 u(s,a) 是模型不确定性（例如 ensemble disagreement）。然后在模型上优化 <img alt=\"J_{\\tilde{\\mathcal M}}(\\pi)\" src=\"https://www.zhihu.com/equation?tex=J_%7B%5Ctilde%7B%5Cmathcal+M%7D%7D%28%5Cpi%29\" /> ，等价于“最大 化真实回报的下界倾向”。</p>\n<ul>\n<li><a href=\"https://link.zhihu.com/?target=https%3A//proceedings.neurips.cc/paper_files/paper/2020/file/f7efa4f864ae9b88d43527f4b14f750f-Paper.pdf\">MOReL（NeurIPS 2020）</a>：显式构造“悲观 MDP”，使任意策略在该 surrogate 上的性能近似下界真实环境性能，以此避免模型被策略钻空子。 MOReL 显式构造一个 surrogate MDP，使策略一旦进入模型不可信区域就<strong>直接坠入吸收态</strong>（给大负回报），从机制上避免钻空子：</li>\n</ul>\n<p><img alt=\"\\rho(s,a)=\\mathbf 1{\\mathcal C(s,a)&gt;\\tau} \\quad\\Rightarrow\\quad \\tilde P(\\cdot|s,a)=\\delta_{s_\\bot}\" src=\"https://www.zhihu.com/equation?tex=%5Crho%28s%2Ca%29%3D%5Cmathbf+1%5C%7B%5Cmathcal+C%28s%2Ca%29%3E%5Ctau%5C%7D+%5Cquad%5CRightarrow%5Cquad+%5Ctilde+P%28%5Ccdot%7Cs%2Ca%29%3D%5Cdelta_%7Bs_%5Cbot%7D\" /></p>\n<p>这里 C 常由“(s,a) 是否 out-of-support / 模型是否可信”定义。</p>\n<ul>\n<li><a href=\"https://link.zhihu.com/?target=https%3A//proceedings.neurips.cc/paper_files/paper/2021/file/f29a179746902e331572c483c45e5086-Paper.pdf\">COMBO（NeurIPS 2021）</a>：观察到深网不确定性估计可能不可靠，于是改用“对模型 rollout 产生的 out-of-support 状态-动作做价值正则”的方式实现保守估计，并给出 offline 的 policy improvement guarantee, 可以抽象成如下公式： <img alt=\"\\boxed{ \\min_Q\\  \\underbrace{\\mathbb E_{(s,a,r,s')\\sim \\mathcal D\\cup \\hat{\\mathcal D}}(Q(s,a)-\\mathcal T^\\pi Q(s,a))^2}_{\\text{Bellman / model+data}} \\ +\\  \\alpha\\underbrace{\\Big(\\mathbb E_{(s,a)\\sim \\hat{\\mathcal D}}[Q(s,a)]-\\mathbb E_{(s,a)\\sim \\mathcal D}[Q(s,a)]\\Big)}_{\\text{push down OOD/model pairs}} }\" src=\"https://www.zhihu.com/equation?tex=%5Cboxed%7B+%5Cmin_Q%5C++%5Cunderbrace%7B%5Cmathbb+E_%7B%28s%2Ca%2Cr%2Cs%27%29%5Csim+%5Cmathcal+D%5Ccup+%5Chat%7B%5Cmathcal+D%7D%7D%28Q%28s%2Ca%29-%5Cmathcal+T%5E%5Cpi+Q%28s%2Ca%29%29%5E2%7D_%7B%5Ctext%7BBellman+%2F+model%2Bdata%7D%7D+%5C+%2B%5C++%5Calpha%5Cunderbrace%7B%5CBig%28%5Cmathbb+E_%7B%28s%2Ca%29%5Csim+%5Chat%7B%5Cmathcal+D%7D%7D%5BQ%28s%2Ca%29%5D-%5Cmathbb+E_%7B%28s%2Ca%29%5Csim+%5Cmathcal+D%7D%5BQ%28s%2Ca%29%5D%5CBig%29%7D_%7B%5Ctext%7Bpush+down+OOD%2Fmodel+pairs%7D%7D+%7D\" /></li>\n</ul>\n<p>其中 D^ 来自模型 rollout；第二项就是把“模型产生的 out-of-support 对”当作需要保守的区域（等价于在价值层面注入 C）。</p>\n<h3><strong>2.“何时信任模型”的长时序门控：把误差累积变成可控的 bias–variance trade-off</strong></h3>\n<ul>\n<li><a href=\"https://link.zhihu.com/?target=https%3A//openreview.net/pdf%3Fid%3DdNqxZgyjcYA\">CBOP（ICLR 2023）</a>：把失败归因于 learned model 的估计误差累积，提出用 epistemic uncertainty 在 policy evaluation 时在 model-free 与 model-based value expansion 之间做权衡，并对 posterior value 取下界以实现保守性。 如下图，<strong>CBOP</strong>用“多步 <strong>MVE（Model-based Value Expansion）</strong> target 的概率图模型 + 不确定性加权后验融合 + 后验 LCB”把“误差累积→不确定性权衡→保守下界”这条链路落成了可计算的 policy evaluation 接口（<strong>白话文：</strong><em>同时算很多个“用模型往前想 h 步”的价值估计，h越长越容易因为模型误差累积而不靠谱；于是按每个估计的“不确定性”给它们加权融合（更可信的权重大），最后再在融合结果上再“往下打一点”（取下置信界）当作训练目标，确保价值评估偏保守、不被模型忽悠。</em>）。</li>\n</ul>\n<p><img alt=\"\" src=\"https://pic3.zhimg.com/v2-c83afa5a81f53fd38f6600179cf42f50_1440w.jpg\" /></p>\n<p>CBOP</p>\n<ul>\n<li><a href=\"https://link.zhihu.com/?target=https%3A//openreview.net/pdf%3Fid%3DWXGb9unEHo\">Action Chunks / MAC（ICLR 2026 ）</a>：非常直接地指出 <em>value expansion</em> 的核心 trade-off：rollout 步数 n 越大，bootstrapping 偏差越小，但模型误差累积越严重；它用“预测一段动作序列导致的状态跃迁（action chunk）”来减少误差复利增长，并用 rejection sampling 避免 OOD 动作造成的模型利用（如下图）。</li>\n</ul>\n<p><img alt=\"\" src=\"https://pica.zhimg.com/v2-c6027a73fd368d9c0d42777dc930b410_1440w.jpg\" /></p>\n<p>Two main components of MAC.</p>\n<h3><strong>3. 从“仿真可用”到“真机可用”的端到端 pipeline：把不确定性传播做成一等公民</strong></h3>\n<ul>\n<li><a href=\"https://link.zhihu.com/?target=https%3A//openreview.net/pdf%3Fid%3DrbNOhbdQ0v\">Making Offline MBRL Work on Real Robots（ICLR 2026 投稿【被拒稿！】）</a>：给出一个“面向物理机器人”的 principled pipeline：提出 <strong>RWM-O</strong>（在自回归 world model 上引入 epistemic uncertainty estimation），使 multi-step rollout <strong>时间一致</strong>且能把不确定性 <strong>沿长时序有效传播</strong>；并将其与 <strong>MOPO-PPO</strong> 结合，把 uncertainty-penalized 优化适配到更稳定的 on-policy PPO 框架；实验覆盖仿真与真实四足机器人，且强调融合真实数据训练模型可进一步提升鲁棒性。</li>\n</ul>\n<p><img alt=\"\" src=\"https://pica.zhimg.com/v2-e3063c0bd31f8c22b1061164827a38ee_1440w.jpg\" /></p>\n<p>Overview of RWM-O and MOPO-PPO</p>\n<p>如上图，<strong>WM-O（世界模型）</strong>：用离线数据训练自回归长时序预测，并用 ensemble 给出<strong>epistemic uncertainty</strong>（阴影越深越不可信）。<strong>MOPO-PPO（策略优化）</strong>：在“想象”rollout 里把不确定性当惩罚项写进奖励： <img alt=\"\\tilde r = r - \\lambda u\" src=\"https://www.zhihu.com/equation?tex=%5Ctilde+r+%3D+r+-+%5Clambda+u\" /> ，让策略在优化回报时<strong>自动避开高不确定区域</strong>，防止 model exploitation。 这样就能<strong>不靠仿真器</strong>，直接从离线数据学到可部署的真机策略（policy learned without simulation）。</p>\n<h3><strong>演化图</strong></h3>\n<pre><code>GAP: Offline MBRL on robots fails at long horizon\n     (model error compounds) + (policy leaves data support -&gt; distribution shift)\n     + (real robot data: noisy / biased / partially observed)\n\n      2020-2021: &quot;Pessimism&quot; becomes the core interface (anti-exploitation)\n   Datasets --&gt; [Learn Dynamics] --&gt; [Conservative Objective] --&gt; [Policy/Planning]\n                 |                    |\n                 |                    +-- MOPO (NeurIPS'20): uncertainty-penalized MDP (lower bound)\n                 |                    +-- MOReL (NeurIPS'20): pessimistic MDP surrogate (lower bound)\n                 |                    +-- COMBO (NeurIPS'21): conservative Q via OOD regularization\n\n      2021-2024: &quot;When to trust the model&quot; (control compounding error)\n                 +-- MBOP (ICLR'21): plan with learned model; constraint-friendly\n                 +-- CBOP (ICLR'23): uncertainty-weighted model-based value expansion + Bayesian lower bound\n\n      2025-2026: &quot;Engineering pipeline for long-horizon robustness&quot; (end-to-end, robot-ready)\n                 +-- ICLR'26 (Real Robots): RWM-O = autoregressive WM + epistemic uncertainty propagation\n                                       + MOPO-PPO = uncertainty penalty inside stable PPO-style updates\n                 +-- ICLR'26 (Action Chunks / MAC): chunk dynamics reduces compounding error\n                                       + rejection sampling prevents OOD action exploitation\n\nTREND/PATH:\nOffline data -&gt; World model w/ calibrated uncertainty -&gt; (short/structured rollouts) -&gt; conservative update\n            -&gt; gating/trust-region (lower-bound thinking) -&gt; deployable long-horizon policies on robots\n</code></pre>\n<h2>人形/腿足：GPU 物理仿真规模化让“运动技能库”更快、更大</h2>\n<p>腿足/人形 RL 的瓶颈一直是：接触动力学复杂、失败模式多、sim2real gap 大——<strong>需要海量交互</strong>来覆盖地形/扰动/形态变化。GPU-native physics 的关键贡献是把环境 step 的成本压到足够低，使得可以： <strong>并行到成千上万环境</strong>：把“采样”从稀缺资源变成可批量生产资源。 <strong>把覆盖面做成一等公民</strong>：大量 domain randomization / terrain generator / external pushes / sensor noise / latency 等，才能系统性提升 sim2real。 <strong>把“技能库”当产品线</strong>：从单一 walking 走向“多技能（走/跑/跳/攀/起身/越障）+可组合”，并用数据先验或统一策略实现可扩展。这个过程总共有三次升级：</p>\n<h3>1. 先解决“吞吐”：GPU-native/accelerator physics</h3>\n<p>这一步的意义：<strong>训练从“慢”变“快”</strong>，但还不足以让 sim2real 可靠。<a href=\"https://link.zhihu.com/?target=https%3A//datasets-benchmarks-proceedings.neurips.cc/paper/2021/file/28dd2c7955ce926456240b2ff0100bde-Paper-round2.pdf\">Isaac Gym（NeurIPS 2021 Datasets &amp; Benchmarks）</a>：端到端 GPU（仿真 buffer 直连训练张量），目标是消除 CPU bottleneck。</p>\n<p><img alt=\"\" src=\"https://pica.zhimg.com/v2-237b7769ef02fc47f2fe09e34ad2b966_1440w.jpg\" /></p>\n<p>Isaac Gym pipeline</p>\n<p><a href=\"https://link.zhihu.com/?target=https%3A//datasets-benchmarks-proceedings.neurips.cc/paper/2021/file/d1f491a404d6854880943e5c3cd9ca25-Paper-round1.pdf\">Brax（NeurIPS 2021 Datasets &amp; Benchmarks）</a>：JAX 上的加速器并行仿真与学习同设备编译执行，强调“在单个加速器上跑大量并行仿真，并可扩展到更大规模”。</p>\n<p><img alt=\"\" src=\"https://pic3.zhimg.com/v2-a46ed3d2c72b5fd726bbd6d5f8a0f2d8_1440w.jpg\" /></p>\n<p>Brax demo</p>\n<h3>2.再解决“可迁移”：把覆盖面做大（地形/扰动/形态）</h3>\n<p>这一步的意义：<strong>训练从“快”变“更稳健”</strong>，sim2real 的关键不再是“更大网络”，而是“更系统的随机化与评测网格”。<a href=\"https://link.zhihu.com/?target=https%3A//arxiv.org/pdf/2107.04034\">RMA（RSS 2021）</a>：用仿真训练 + 适应模块实现真机快速适应，明确把“多样地形/扰动覆盖”作为训练核心。</p>\n<p><img alt=\"\" src=\"https://picx.zhimg.com/v2-1a0f55ec0617b0fc4d26a7b60c3fa139_1440w.jpg\" /></p>\n<p>RMA</p>\n<p><a href=\"https://link.zhihu.com/?target=https%3A//proceedings.iclr.cc/paper_files/paper/2024/file/3c6bd2021c10462c5164638d22f3d5d8-Paper-Conference.pdf\">Hybrid Internal Model（ICLR 2024）</a>：强调在复杂地形与扰动下的鲁棒 locomotion（把环境因子与适应机制纳入框架）。</p>\n<p><img alt=\"\" src=\"https://pic2.zhimg.com/v2-9c4393c6583ea3afab5e787a0d628c81_1440w.jpg\" /></p>\n<p>HYBRID INTERNAL MODEL</p>\n<h3>3.解决“技能库扩大”：多技能/全身控制/极端场景</h3>\n<ul>\n<li><a href=\"https://link.zhihu.com/?target=https%3A//arxiv.org/pdf/2210.10044\">Deep Whole-Body Control（CoRL 2022）</a>：统一策略做 locomotion+manipulation 的 whole-body control，代表“从走路到全身协同”的技能库扩展路线。</li>\n</ul>\n<p><img alt=\"\" src=\"https://pic2.zhimg.com/v2-9b912dc5b72e17e6109ded841cd18565_1440w.jpg\" /></p>\n<p>Whole-body control framework</p>\n<ul>\n<li><a href=\"https://link.zhihu.com/?target=https%3A//www.roboticsproceedings.org/rss21/p068.pdf\">BeamDojo（RSS 2025）</a>：面向稀疏落脚点等高风险地形，强调学习效率与真实部署（复杂地形覆盖 + 真实传感）。</li>\n</ul>\n<p><img alt=\"\" src=\"https://picx.zhimg.com/v2-2944db13df7585f7294e9a92fcfc824f_1440w.jpg\" /></p>\n<p>BeamDojo</p>\n<ul>\n<li><a href=\"https://link.zhihu.com/?target=https%3A//openreview.net/pdf%3Fid%3Dfs7ia3FqUM\">Humanoid Parkour Learning（CoRL 2025）</a>：端到端感知-全身控制，在多种 parkour 技能上训练与泛化，体现“技能库”从平地走向“越障/跳跃/跨沟”等组合任务。</li>\n</ul>\n<p><img alt=\"\" src=\"https://pic2.zhimg.com/v2-6d37f6bd1f478edd5a29a82397488753_1440w.jpg\" /></p>\n<p>Humanoid Parkour Learning</p>\n<h3>问题与可能方向：</h3>\n<p><strong>问题</strong></p>\n<p>即使 GPU physics 规模化，腿足/人形仍有三类硬 gap： <strong>接触建模与摩擦长尾</strong>：极端地形/材料（碎石、软地、湿滑、边缘接触）在仿真里仍容易系统性偏差 → 需要更强的参数识别、跨引擎验证、或残差学习。 <strong>覆盖面如何“可证据化”</strong>：大家都做随机化，但缺少统一的 coverage 指标（地形空间、扰动空间、形态空间的“测试网格”与统计保证）。<strong>技能库的组合爆炸</strong>：从单技能到多技能，任务组合与切换会造成训练/验证成本再上升 → 需要更好的层级策略、技能路由、以及“失败模式驱动”的自动课程生成。</p>\n<p><strong>最可能的工程与研究：</strong></p>\n<ul>\n<li><strong>Sim 端</strong>：GPU physics + 程序化地形/扰动生成 → 自动挖掘失败分布（hard-case mining）</li>\n<li><strong>Policy 端</strong>：多技能统一表示（whole-body / skill tokens / 层级路由）→ 更可控的切换与组合</li>\n<li><strong>验证端</strong>：sim-to-sim（多物理引擎交叉验证）+ 小预算真机 A/B → 把 sim2real 从“经验”变成“证据链”</li>\n</ul>\n<h3>演变图</h3>\n<pre><code>PAST (CPU sim bottleneck)\n  CPU physics + GPU policy  --&gt; few envs --&gt; slow iteration --&gt; narrow coverage --&gt; brittle sim2real\n            |\n            v\nSHIFT #1: GPU physics scale (throughput becomes cheap)\n  Isaac Gym (NeurIPS'21) / Brax (NeurIPS'21)\n    -&gt; end-to-end GPU / accelerator-parallel sim+learn\n    -&gt; massive parallel rollouts (k~10k envs) + rapid reward/curriculum iteration\n            |\n            v\nSHIFT #2: Coverage as first-class (sim2real via diversity)\n  domain randomization + terrain generators + pushes/noise/latency\n  -&gt; RMA (RSS'21): sim-trained, fast online adaptation on real terrains\n  -&gt; Hybrid Internal Model (ICLR'24): robust across terrains/disturbances\n            |\n            v\nSHIFT #3: Skill library production (multi-skill / whole-body / extreme terrains)\n  motion priors + multi-task RL + hierarchical/sequence policies\n  -&gt; DeepMimic (SIGGRAPH'18) / AMP (SIGGRAPH'21): natural skill learning via examples/priors\n  -&gt; Deep Whole-Body Control (CoRL'22): unified locomotion+manipulation\n  -&gt; BeamDojo (RSS'25) + Humanoid Parkour (CoRL'25): sparse footholds / parkour skills\n            |\n            v\nGAP (what still breaks)\n  contact &amp; friction long-tail + coverage not measurable + skill-composition explosion\n            |\n            v\nTREND/PATH (next)\n  GPU sim + auto scenario mining\n    + policy skill routing / sequence modeling (e.g., NeurIPS'24 token-style control)\n    + sim-to-sim cross-check + small real A/B\n  =&gt; faster, larger, more reliable humanoid/legged skill libraries\n</code></pre>"
    }
  ],
  "latest_overview": [
    {
      "title": "",
      "body_html": "<h1>World Action Models：具身智能的下一个前沿</h1>\n<ul>\n<li>来源平台: <strong>zhihu</strong>（知乎专栏文章）</li>\n<li>原文链接: <a href=\"https://zhuanlan.zhihu.com/p/2037993877332874775\">https://zhuanlan.zhihu.com/p/2037993877332874775</a></li>\n<li>作者: AI椰青</li>\n</ul>\n<hr />\n<p>World Action Models：具身智能的下一个前沿</p>\n<h1>World Action Models：具身智能的下一个前沿</h1>\n<p>作者: AI椰青, 赞: 16</p>\n<blockquote>\n<p><a href=\"https://link.zhihu.com/?target=https%3A//arxiv.org/abs/2605.12090\">https://arxiv.org/abs/2605.12090</a></p>\n</blockquote>\n<h3><strong>摘要</strong></h3>\n<p>视觉-语言-动作（VLA）模型在具身策略学习中实现了强大的语义泛化能力，然而这类模型仅学习从观测到动作的响应式映射，并未显式建模物理世界在干预下的演化规律。越来越多的研究通过将世界模型（环境动态预测模型）集成到动作生成流程中，来弥补这一局限。我们将这一新兴范式命名为<strong>世界动作模型（WAMs）</strong>：统一预测式状态建模与动作生成的具身基础模型，旨在建模未来状态与动作的联合分布，而非仅建模动作分布。</p>\n<p><img alt=\"\" src=\"https://pic2.zhimg.com/v2-d6c2079763ec584e7c087333dd25b6ff_1440w.jpg\" /></p>\n<p>目前相关研究在架构、学习目标与应用场景上较为零散，缺乏统一的概念框架。本文正式定义了WAM并厘清其与相关概念的边界，追溯催生该范式的VLA与世界模型研究的基础及早期融合工作；将现有方法归纳为级联式与联合式WAM的结构化分类体系，并进一步按生成模态、条件机制与动作解码策略细分；系统分析支撑WAM发展的数据体系，涵盖机器人遥操作、便携式人类演示、仿真数据与互联网规模第一人称视频；梳理围绕视觉保真度、物理常识与动作合理性构建的新兴评估协议。总体而言，本综述首次系统梳理了WAM领域全貌，阐明核心架构范式与权衡关系，指出这一快速发展领域的开放挑战与未来机遇。</p>\n<p>主页 <a href=\"https://link.zhihu.com/?target=https%3A//openmoss.github.io/Awesome-WAM\">https://openmoss.github.io/Awesome-WAM</a></p>\n<p>代码仓库</p>\n<p><a href=\"https://link.zhihu.com/?target=https%3A//github.com/OpenMOSS/Awesome-WAM\">https://github.com/OpenMOSS/Awesome-WAM</a></p>\n<h3><strong>1 引言</strong></h3>\n<p>构建能在非结构化物理环境中感知、推理与执行动作的机器人，一直是具身智能研究的核心目标。近年来，该领域形成了一套强大范式：<strong>视觉-语言-动作（VLA）模型</strong>，将预训练视觉-语言主干网络复用为通用机器人策略。通过在互联网规模视觉与语言表征之上，将动作生成为条件token预测任务，RT-2、OpenVLA、等VLA模型展现出惊人的泛化能力——遵循全新语言指令、操作未见过的物体、在不同机器人形态间迁移且仅需少量微调。这些成果证明，大规模视觉-语言预训练积累的语义理解能力可有效落地到运动行为，相比早期任务专用控制器实现了质的飞跃。后续大量基于该范式的研究，已让VLA模型成为通用具身策略学习的主流方案。</p>\n<p>然而，标准VLA模型<strong>未显式建模世界动态</strong>：它们仅学习观测到动作的直接映射，不预测环境在干预下的变化。这种预测式物理推理能力的缺失，限制了模型泛化性，而预测未来状态对这类任务至关重要。因此，为具身策略模型赋予世界建模能力成为自然发展方向。近期越来越多研究开始将世界模型集成到具身策略流程中，这些方法利用环境动态预测模型，为智能体提供物理预见能力——无论是通过视频预测实现视觉规划、利用隐式动态建模为策略提供条件，还是在统一架构中联合生成状态与动作。这一新兴方向快速发展，形成了多样且不断扩张的方法体系。</p>\n<p>我们将这类方法正式命名为<strong>世界动作模型（WAMs）</strong>：统一环境动态建模（世界建模）与运动控制（动作生成）的具身基础模型，建模目标为未来状态与动作的联合分布 ，而非仅动作分布。现有WAM方法可大致分为两类架构：</p>\n<ol>\n<li><strong>级联式WAM</strong>：显式分解优化目标，形式化为 ，先合成预期未来状态表征，再据此推导动作；</li>\n<li><strong>联合式WAM</strong>：直接建模联合分布 ，状态预测与动作生成在共享表征空间内协同优化。</li>\n</ol>\n<p>世界建模的集成带来了更强的物理理解能力、更优的新环境泛化性，以及利用无动作标注的大规模人类视频数据的能力，大幅拓展了具身策略学习的数据基础。</p>\n<p>本综述首次对世界动作模型（WAM）领域展开系统且批判性的分析，旨在为理解该领域设计空间提供概念框架，为进入这一快速发展领域的研究者提供实践指南。综述结构如下：</p>\n<p><img alt=\"\" src=\"https://pic3.zhimg.com/v2-b881c1c16b4fb5f6564449442a6b45de_1440w.jpg\" /></p>\n<ul>\n<li><strong>定义（第2节）</strong>：正式定义世界动作模型，厘清其与相关概念（视频策略、条件动作世界模型、标准VLA模型）的边界，梳理当前零散文献的术语规范；</li>\n<li><strong>背景（第3节）</strong>：追溯从经典基于模型的强化学习到现代基础模型方法中，世界建模与动作生成的交织发展历程，定位WAM的学术脉络；</li>\n<li><strong>架构（第4节）</strong>：将现有WAM方法分为级联式与联合式范式，进一步按生成模态、条件机制、动作解码策略细分，构建跨方法对比的统一框架；</li>\n<li><strong>训练数据集（第5节）</strong>：分析支撑WAM发展的四大核心数据源——机器人遥操作、便携式人类演示、仿真数据、互联网规模第一人称视频，探讨各数据源特性对模型能力的影响；</li>\n<li><strong>评估（第6节）</strong>：梳理围绕视觉保真度、物理常识、动作合理性构建的新兴评估体系，指出当前协议无法评估WAM核心能力的短板；</li>\n<li><strong>开放挑战（第7节）</strong>：总结该领域核心难题与未来方向，指明迈向更鲁棒、更通用世界动作模型的路径。</li>\n</ul>\n<h3><strong>2 定义与形式化</strong></h3>\n<p>为给世界动作模型（WAMs）建立严谨基础，我们从概率视角定义具身智能任务。考虑一个与环境交互的具身智能体，每个时间步，智能体接收观测 （包含视觉输入、本体感受信号及其他传感模态）、语言指令 ，并生成动作 。用 表示下一时刻的观测。</p>\n<h3><strong>2.1 基础范式</strong></h3>\n<p><strong>视觉-语言-动作（VLA）模型</strong>：将机器人控制建模为多模态序列建模任务的具身基础模型。该范式中，智能体处理当前观测 与语言指令 ，生成动作token序列 。VLA架构通常利用大型语言模型（LLM）或视觉语言模型（VLM）的预训练语义隐空间，将感知输入直接映射到动作空间。形式化定义为，给定多模态上下文，动作的条件概率：</p>\n<p><strong>世界模型（WM）</strong>：内化物理环境因果动态的预测式转移函数，功能是建模世界前向动态，模拟环境在先前状态 与假设干预动作 下的观测状态 演化过程，形式化为：</p>\n<p>该模型作为状态概率传播器，表征环境对特定动作的响应变化。</p>\n<p><strong>世界动作模型（WAMs）</strong>：统一环境动态建模（世界建模）与运动控制（动作生成）的具身基础模型。与仅学习观测到动作直接映射的标准VLA模型不同，WAM预测物理环境的未来演化。形式上，WAM需满足两个核心准则：</p>\n<ol>\n<li><strong>前向预测建模</strong>：模型需通过生成或量化未来状态 表征，预测环境物理演化，可表现为显式视觉预测（如像素级视频帧、稠密光流）或隐式物理表征（如基于物理的隐空间）；</li>\n<li><strong>耦合动作生成</strong>：模型需严格依据预期未来状态 推导运动指令 ，这种耦合可表现为联合概率输出，或级联/统一隐式架构中的策略条件化。</li>\n</ol>\n<p>形式化上，WAM在统一框架中刻画未来状态与动作的联合或条件分布：</p>\n<p>从观测到动作的映射转向<strong>联合状态-动作预测</strong>，WAM借助丰富的时空先验实现更深入的物理理解与更强的零样本泛化能力。</p>\n<h3><strong>2.2 概念厘清：WAM与相关概念</strong></h3>\n<p><img alt=\"\" src=\"https://pic3.zhimg.com/v2-2eed8d97f0527f515c9c155f1ec35c96_1440w.jpg\" /></p>\n<p>为保证概念清晰，我们区分世界动作模型（WAMs）与生成式机器人领域若干相关概念：</p>\n<ol>\n<li><strong>视频动作模型（VAMs）</strong>：通常指集成视频预测与动作生成、将动作与合成视觉未来对齐的模型。我们定义WAM为<strong>模态无关的广义预测智能体超集</strong>，VAM专为动作与视频帧合成对齐优化，而WAM范式认为视频仅是建模世界的一种可行代理。WAM涵盖使用其他预测目标的模型（如单图像状态转移、稠密点云、触觉/力反馈等多传感模态）。“世界”一词强调模型内化底层物理规律与因果动态，而非局限于像素级视频格式。</li>\n<li><strong>视频策略（Video Policies）</strong>：定义源于结构传承——使用生成式视频架构（如扩散Transformer）为主干，提取强时空表征。与WAM的区别源于<strong>结构传承</strong>与<strong>预测承诺</strong>两个维度：其一，与WAM/VAM区分一致，视频策略概念上绑定视频生成主干（如视频扩散Transformer），而WAM与主干架构无关，可通过任意多模态状态合成架构实现；其二，视频策略仅需继承视频模型预训练时空表征，完成观测到动作映射（）即可，而WAM必须具备<strong>主动预测承诺</strong>，将下一状态 合成作为模型推理与输出的显式组件，而非仅作为主干内隐式特征。</li>\n<li><strong>动作世界模型（AWM）</strong>：早期文献中描述集成世界建模与动作生成（）的模型，功能与WAM相近。选用WAM而非AWM，反映具身智能层级的战略转变：“AWM”的核心名词是“世界模型”，将系统定义为增强型模拟器；“世界动作模型”将系统重新定位为<strong>智能体主体类别</strong>，“世界”（预测物理）与“动作”（运动控制）为平等核心组件。这一命名确立WAM为VLA范式的直接概念继承者，强调其作为机器人完整基础模型的定位。</li>\n</ol>\n<h3><strong>3 VLA模型与世界模型：基础与早期融合</strong></h3>\n<h3><strong>3.1 视觉-语言-动作（VLA）模型</strong></h3>\n<p>传统模仿学习常受限于窄域任务专用设计，模型仅针对孤立技能训练，严重限制开放环境泛化性。为解决这一问题，领域转向<strong>语言条件策略</strong>，解析多模态任务描述并计算控制动作。早期VLA架构主要探索三种视觉-语言输入融合范式：</p>\n<ol>\n<li><strong>特征调制</strong>：基于FiLM层，用语言嵌入调节视觉特征；</li>\n<li><strong>交叉注意力机制</strong>：实现任务提示与视觉token的动态交互；</li>\n<li><strong>简单拼接</strong>：将多模态token展平为统一序列联合处理。</li>\n</ol>\n<p>这些工作验证了开放词汇操作的可行性，提出<strong>Action Chunking</strong>与<strong>时间集成</strong>等关键技术，提升运动平滑度与时间一致性。</p>\n<p>LLM的成功推动第二轮VLA研究，强调<strong>知识先验</strong>与<strong>大规模缩放</strong>。通过继承预训练大型视觉语言模型（LVLM）权重，智能体借助互联网数据实现复杂推理与语义理解。方法上，这一阶段呈现两条并行动作生成路径：</p>\n<ul>\n<li><strong>自回归token化</strong>：将动作视为离散语言token，序列生成；</li>\n<li><strong>基于扩散的合成</strong>：在VLM主干上附加生成式<strong>Action Expert</strong>，生成连续多模态动作分布。</li>\n</ul>\n<p>这种双重设计让模型平衡高层逻辑规划与低层物理精度，从单臂任务扩展到复杂双手操作。</p>\n<p>超越传统图像到动作流程，VLA定义近期拓展为融合更丰富的具身观测。为增强模型在物理世界的感知与交互能力，研究者开始整合多源信息，包括3D几何信息、深度感知、力/触觉反馈，推动VLA模型从简单“视觉-语言”驱动系统，演进为全面“多模态物理交互”基础模型。但这些模型仍基于响应式映射，未捕捉底层世界动态，在操作泛化任务中仍面临挑战。</p>\n<h3><strong>3.2 世界模型</strong></h3>\n<p>世界模型的定义长期存在争议，不同研究采用不同定义，共识为：<strong>世界模型是建模环境动态与动作效果的内部表征</strong>，基于该表征可预测动作后果，实现仿真、决策与规划。按条件模式不同，世界模型分为<strong>条件动作世界模型</strong>与<strong>条件语言世界模型</strong>，同时也包含专为具身环境设计的世界模型。</p>\n<h3><strong>3.2.1 条件动作世界模型</strong></h3>\n<p>条件动作世界模型描述环境对智能体动作的响应演化，动作指智能体发出的可执行控制信号，直接干预环境并驱动状态随时间转移。给定当前状态与动作，模型预测后续未来状态或观测，捕捉动作对环境动态的因果影响，形式化为：</p>\n<p>按环境动态建模与预测的空间，分为<strong>显式世界模型</strong>（直接预测像素/视频帧等未来观测）与<strong>隐式世界模型</strong>（在隐式表征空间建模环境动态）。</p>\n<p><strong>显式像素级预测</strong>早期像素级预测模型直接在像素空间操作，预测未来帧。ACVP设计编码-转换-解码网络架构，是首批基于条件动作做像素级视频长时预测并评估的工作；CDNA提出条件动作视频预测模型，通过显式建模像素运动，从先前帧移动像素合成未来帧；深度视觉预见学习条件动作视频预测模型，通过隐式随机像素流表征视觉动态；SV2P将随机变分隐变量引入视频预测，通过采样隐变量生成多个合理未来帧序列，应对真实世界与条件动作场景下的模糊交互。</p>\n<p>随着生成式建模发展，强大的预训练视频生成模型不断涌现，近期大量工作基于这些模型，直接在像素空间预测未来视觉观测，构建基于视频的世界模型，分为<strong>自回归视频世界模型</strong>与<strong>基于扩散的视频世界模型</strong>两类：</p>\n<ul>\n<li><strong>自回归视频世界模型</strong>：将视频帧token化为离散视觉token，训练动态模型，基于过往观测自回归预测未来token。iVideoGPT基于VideoGPT构建可扩展自回归Transformer框架，集成视觉观测、动作、奖励为token序列，通过下一token预测实现智能体-环境交互；Genie进一步研发交互式世界模型，引入隐式动作模型，从无标注视频片段推理动作变量，训练动态模型预测未来视觉token，可从无动作标注的互联网视频训练，大幅提升世界模型训练可扩展性。自回归范式可生成任意长度帧序列，适合交互式世界建模，但存在严重误差累积问题，难以建模高度多模态分布。</li>\n<li><strong>基于扩散的视频世界模型</strong>：显式建模未来观测的可能分布，通过迭代去噪，将噪声时空信号生成为连贯的条件数据序列，学习条件分布而非单一确定性未来，捕捉多模态环境动态。扩散世界模型将世界建模建模为未来视频帧的条件扩散，通过迭代去噪生成未来观测，缓解分步动态预测的误差累积问题。扩散范式在长时一致性、高质量生成输出任务中表现更优，但计算成本较高。</li>\n</ul>\n<p><strong>隐式隐空间动态模型</strong>为克服像素级建模低效问题，主流方向聚焦在紧凑隐空间学习动态。隐式动态模型将观测编码为隐状态，在该空间学习转移函数：</p>\n<ul>\n<li><strong>循环状态空间模型（RSSM）</strong>：采用循环架构预测隐式表征随时间演化。PlaNet引入RSSM，结合确定性与随机组件，捕捉可预测动态与不确定性；Plan2Explore代理扩展RSSM框架，在隐空间规划探索，将隐式动态预测器集成的分歧作为内在奖励；Dreamer系列工作进一步扩展，实现完全隐空间规划，提升样本效率；LEXA利用RSSM在隐式想象中训练探索与达成策略，实现无监督目标条件强化学习。</li>\n<li><strong>Transformer状态空间模型（TSSM）</strong>：为让世界模型受益于Transformer进展，TransDreamer引入TSSM，利用Transformer预测动态，在建模长时依赖与推理方面优于Dreamer系列。</li>\n<li><strong>预测表征学习</strong>：不重构观测或建模完整动态，聚焦缺失/未来观测的隐式嵌入学习。JEPA（联合嵌入预测架构）提供通用范式，在抽象嵌入空间学习预测表征，不重构原始输入，学习预测目标嵌入，鼓励模型捕捉高层可预测结构，忽略低层细节；I-JEPA通过同一图像单上下文块预测多目标块隐式表征，学习图像表征；MC-JEPA将该范式扩展为运动感知视觉表征学习，联合学习光流与内容特征；V-JEPA 2进一步将JEPA范式扩展到基于视频的世界建模，预测未来隐式嵌入而非重构像素，学习更抽象、泛化更强的环境表征，大幅降低重构开销；LeWorldModel提出端到端JEPA，从原始像素稳定训练隐式世界模型，用单一高斯分布正则器（SIGReg）替代复杂多正则项目标，防止表征崩塌，实现连续控制任务的高效隐空间规划。</li>\n</ul>\n<h3><strong>3.2.2 条件语言世界模型</strong></h3>\n<p>与基于低层控制信号预测未来状态的条件动作世界模型不同，<strong>条件语言世界模型</strong>使用语言作为更高层、更抽象的条件，不指定精确动作序列，而是提供目标场景、事件、演化过程的语义指导，让模型生成符合文本/多模态指令的未来状态，形式化为：</p>\n<p>该范式下，<strong>条件语言视频基础模型</strong>成为世界模型的主流实现，从大规模视频-文本对中学习，获取物体、场景、物理交互、相机运动、时空动态的丰富先验，可从高层语义描述生成合理视觉未来，为语言指令下的世界演化建模提供自然接口。现有方法沿生成目标、主干架构、隐式表征、缩放策略等关键维度演进，从早期GAN视频生成器，发展到扩散式与Transformer视频基础模型。</p>\n<p>早期视频基础模型以GAN为主，如MoCoGAN、TGAN、DVD-GAN；扩散模型出现后，基于扩散的视频基础模型成为主流。早期扩散视频基础模型基于U-Net架构，通过加入专用时间层实现时间一致性；VDM直接将传统2D卷积核扩展为3D核，处理视频序列；Text2Video-Zero、AnimateDiff采用跨帧注意力块，保持物体外观与运动一致性。</p>\n<p>后续工作采用Vision Transformer（ViT）作为更灵活的视频扩散主干，Sora、Latte将视频数据视为时空块序列，比固定网格U-Net更高效处理可变分辨率与时长，受益于Transformer可扩展性，常采用因果注意力或时空自注意力建模复杂动态，生成未来帧。</p>\n<p>RGB空间像素级扩散去噪计算成本高，LDM采用变分自编码器（VAE）将图像从像素空间压缩到隐空间，在紧凑表征空间执行去噪；VideoGPT利用3D-VQVAE学习视频生成的离散隐式表征，后续工作进一步扩展该范式。</p>\n<p>随着视频基础模型设计成熟，大量高性能模型涌现，开源模型如Wan基于扩散Transformer（DiT）范式结合<strong>Flow Matching</strong>，在视频生成、编辑、实时合成、音视频同步等任务表现优异；闭源模型如OpenAI的Sora 2、快手的Kling 3、Google的Veo 3、Runway的Gen-4、Pika Labs的Pika 2.2，基于互联网数据训练，具备丰富世界知识与强预测能力，可作为强大多模态世界模型。</p>\n<p>条件语言与多模态世界模型具备强世界知识先验与语义理解能力，在数据合成、任务规划等应用中潜力巨大。</p>\n<h3><strong>3.2.3 具身世界模型</strong></h3>\n<p>具身环境要求模型捕捉物理世界动态，预测世界对智能体交互的响应变化，这种预测未来状态的能力，对具身场景的仿真、规划、数据合成至关重要。世界模型基于观测与动作预测环境演化，为具身环境建模提供自然框架，大量研究聚焦提升世界模型在具身场景的预测精度、物理感知、动态知识，生成更真实的机器人演示，支撑具身智能发展。</p>\n<p>互联网规模无标注视频包含丰富物理动态信息，从这类数据学习对预训练具身世界模型至关重要。多项工作实现从人类操作视频或纯视频数据学习物理动态：Genie引入隐式动作模型，以无监督方式从视频片段推理隐式动作，让世界模型可使用纯互联网视频训练；SWIM基于Dreamer架构，从人类操作视频提取抓取点与运动轨迹，缩小人与机器人的形态差异，从人类运动视频学习机器人操作动态；DreamDojo引入连续隐式动作，将帧间运动编码为紧凑向量，实现跨形态动作表征与知识迁移；DexWM从第一人称视频提取3D手部关键点，表征灵巧动作，采用手部一致性损失捕捉精细手指-物体交互，实现真实世界灵巧操作零样本迁移。</p>\n<p>为提升具身世界模型生成的机器人演示质量，多项工作从架构设计与数据驱动角度，提升零样本生成、视频-指令对齐、多视角一致性、物理感知能力：RoboDreamer利用自然语言组合性，将视频生成分解为多基础原语的条件控制，构建组合式世界模型，具备强零样本泛化能力，灵活融合多模态指令；IRASim引入帧级动作条件模块，将每个动作向量注入Transformer块的空间注意力层，让机器人动作更精准控制生成视频内容；MiLA采用创新的由粗到精分治策略，结合联合去噪校正流与时间渐进去噪调度，保持多视角空间对齐，缓解长时生成的误差累积与动态畸变；Ctrl-World在空间Transformer内将多相机图像沿token维度拼接，实现全视角联合预测；RoboScape通过自适应关键点动态学习，结合动态关键点采样与轨迹跟踪，提升物理感知建模，采用双分支协同自回归Transformer，协同生成RGB与深度流，增强世界模型的物理感知能力；WoW引入SOPHIA自优化框架，通过视觉-语言评论器评估生成视频，引导提示优化，提升物理合理性与因果一致性，同时引入流-掩码逆动态模型，将预测视觉转移映射为可执行末端执行器动作，闭合想象到动作的循环。</p>\n<p>部分工作拓展世界模型能力：VT-WM（视觉-触觉世界模型）引入触觉模态，采用Sparsh-X模型编码触觉信息为触觉token，与视觉token沿空间维度拼接，将触觉融入具身世界模型；PointWorld在3D点流表征下统一环境状态与机器人动作，通过大规模真实与仿真数据训练，构建通用3D世界模型，可泛化到多样机器人操作任务，支持实时推理，直接集成模型预测控制。</p>\n<h3><strong>3.3 面向VLA的世界模型</strong></h3>\n<p>世界模型能建模环境在动作、语言指令、多模态上下文下的演化，为超越静态数据集的直接策略学习，增强VLA系统提供关键机制。世界模型让VLA智能体推理未来观测、生成想象轨迹、评估任务结果、测试策略行为，这对机器人学习尤为重要——真实世界数据收集成本高、物理交互存在安全风险、大规模策略评估难以开展。我们从<strong>学习</strong>与<strong>评估</strong>两个互补视角，探讨世界模型对VLA的价值：学习层面，世界模型可增强模仿学习、支撑基于模型的强化学习、从预测未来生成奖励信号；评估层面，世界模型作为数据驱动仿真器，实现可扩展、可复现、安全的VLA策略测试。</p>\n<h3><strong>3.3.1 面向学习的世界模型</strong></h3>\n<p><img alt=\"\" src=\"https://pic4.zhimg.com/v2-e16d1c88293bf87570213bfdb2caaaed_1440w.jpg\" /></p>\n<p><strong>模仿学习（IL）</strong>：VLA的核心训练范式，通过模仿专家演示学习机器人策略，但效果受限于专家数据的数量与多样性。大量研究利用具身世界模型生成多样训练数据，提升模仿学习性能：DREMA构建组合式操作世界模型，结合以物体为中心的高斯泼溅与物理仿真器，让机器人通过等变变换想象新物体配置，生成多样演示实现模仿学习，在真实机器人实现单样本策略学习；Ctrl-World通过想象合成复杂任务的成功轨迹，用于监督微调（SFT），将-DROID策略在下游任务成功率提升44.7%；RoboScape证明，在其合成数据上训练的、扩散策略等VLA策略，性能与真实演示训练相当。</p>\n<p><strong>强化学习（RL）</strong>：VLA策略优化的重要范式，但应用受限于真实机器人部署成本高、风险大、奖励函数设计难、仿真到真实迁移困难。世界模型通过预测未来状态建模环境动态，提供结构化环境表征与跨模态转换能力，缓解上述问题，支持安全可扩展的策略学习，无需大量真实交互，实现隐式奖励估计，提升仿真到真实迁移的鲁棒性。因此，世界模型越来越多地用于基于模型的RL策略学习：</p>\n<ul>\n<li><strong>世界模型作为替代环境</strong>：多项研究将世界模型作为替代环境，支撑RL策略学习。智能体在学习的世界模型内执行想象rollout，预测轨迹通过任务特定奖励函数或rollout级一致性目标计算奖励。Dreamer系列扩展PlaNet的RSSM，从规划扩展到策略学习，验证虚拟环境中基于模型RL的有效性；基于具备像素级生成能力的预训练视频生成式世界模型，多项工作尝试将世界模型作为强化学习环境，将策略生成的动作与当前观测输入世界模型，预测未来观测，基于生成观测训练策略；部分工作利用世界模型生成的轨迹，衡量与目标未来状态的一致性，引导策略学习。</li>\n<li><strong>面向奖励建模的世界模型</strong>：除作为策略学习仿真器，近期多项工作探索世界模型与奖励建模更直接耦合，从学习的生成式表征或联合建模环境动态推导奖励信号，而非仅依赖外部指定奖励函数。一类工作直接从预训练生成式世界模型推导奖励信号：VIPER利用预训练视频预测模型，评估观测轨迹与成功行为学习动态的兼容性，作为无动作奖励用于RL；Diffusion Reward通过条件视频扩散模型，从专家视频学习的视频生成分布条件熵，推导奖励信号；GenReward利用预训练视频扩散模型，测量智能体观测与生成目标视频的隐式对齐，提供视频级策略学习指导；SRPO利用V-JEPA 2隐空间作为预训练世界表征，塑造奖励，将成功与失败轨迹编码到隐式世界空间，测量行为相似度，为失败rollout分配进度奖励，缓解奖励稀疏性，无需额外专家演示或手动设计奖励函数。另一类工作将奖励预测直接集成到世界模型，如RoboScape-R联合建模未来观测与奖励，让学习的世界模型在想象rollout中生成奖励信号，为RL提供内生奖励机制。</li>\n</ul>\n<h3><strong>3.3.2 面向评估的世界模型</strong></h3>\n<p>在物理系统评估机器人策略耗时、耗资源、不安全且不可复现，常用替代方案是在IsaacGym、MuJoCo等手动设计仿真器中评估，但这些仿真器难以捕捉真实环境的复杂性与多样性，存在显著仿真-真实差距。</p>\n<p>世界模型直接从数据学习环境动态，构建数据驱动仿真环境，更真实反映真实世界复杂度与多样性，减少对昂贵、不安全物理评估的依赖，支持全虚拟环境大规模策略测试；同时具备闭环rollout能力，提供一致可复现的评估协议，缓解真实实验的不可复现问题；通过将仿真落地到真实数据分布，更好弥合仿真-真实差距，部署前更可靠评估策略性能。通用方法是在想象环境中rollout策略，预测后果：Ctrl-World通过帧级动作条件，将动作信号注入每一帧，支持策略与仿真器的闭环交互，实现策略评估；Veo Robotics利用条件动作视频生成模型作为世界仿真器，无需真实执行评估机器人策略，同时利用生成式图像编辑合成分布外场景，测试泛化性，模拟安全关键场景做红队测试，所有预测均通过大量真实实验验证；交互式世界仿真器构建实时遥操作接口，支持用户与世界仿真器交互，提供更全面的仿真环境；多项类似工作进一步提升评估质量、效率与灵活性。</p>\n<h3><strong>4 架构</strong></h3>\n<p>前文将世界模型作为策略训练与评估的外部工具（仿真环境、奖励模型、鲁棒基准），近期研究进展转向<strong>将世界建模直接集成到策略架构</strong>。这一转变让世界模型从离线监督者变为内部预测核心，让世界动作模型（WAMs）实时推理世界动态。我们根据结构流程与对应训练机制，将WAM架构分为两大类：</p>\n<ol>\n<li><strong>级联式WAM</strong>（第4.1节）：采用串行流程，先预测下一状态（像素、隐式、流空间），再推导对应动作。因结构解耦，世界模型与动作解码器作为独立模块分别优化；</li>\n<li><strong>联合式WAM</strong>（第4.2节）：在单一紧凑模型中统一预测式状态建模与动作生成，同时输出未来状态与动作。该范式下，世界建模与动作生成在统一目标下联合训练，迫使模型内化环境动态与控制信号的因果依赖关系。</li>\n</ol>\n<h3><strong>4.1 级联式世界动作模型</strong></h3>\n<p>级联式世界动作模型通过串行两阶段流程实现世界-动作映射：世界模型先合成代表预期未来的视觉规划，独立动作模型从该规划解码可执行机器人指令。这种分解提供自然归纳偏置——世界模型无需推理机器人运动学，动作模型无需解决长时场景预测，但也引入两级耦合，影响该系列所有设计决策。根据中间规划载体类型，级联式WAM分为两大类：</p>\n<ol>\n<li><strong>显式规划</strong>（第4.1.1节）：基于像素空间表征；</li>\n<li><strong>隐式规划</strong>（第4.1.2节）：基于隐式表征。</li>\n</ol>\n<p><img alt=\"\" src=\"https://pic2.zhimg.com/v2-7e38b15823ed6d6c3dc1dd965ef34801_1440w.jpg\" /></p>\n<h3><strong>4.1.1 基于像素空间表征的显式规划</strong></h3>\n<p>级联式WAM最直接的实现方式，采用原始像素帧作为两级间的中间表征。像素空间规划可直接解释，充分利用互联网数据预训练的大型视频生成模型表征能力，是自然的起步方案。该领域工作按后续从合成视频提取动作的方式，分为<strong>学习型动作提取</strong>与<strong>几何计算提取</strong>两类。</p>\n<p><strong>学习型动作提取</strong>UniPi确立基础两阶段框架：条件文本时空U-Net扩散模型合成任务执行视频，卷积逆动态模型（IDM）回归连续帧对的动作。尽管验证了闭环可行性，但单遍长时生成存在语义漂移与复合误差问题。后续工作从互补角度解决：VLP引入语义级干预，为流水线配备视觉语言模型（VLM），实现分层子动作生成与树搜索价值评分，将误差累积限制在单个片段；RoboEnvision采用非自回归策略，通过VLM分解子任务指令，条件生成代表子任务终止状态的关键帧，通过插值合成完整视频。</p>\n<p>并行研究聚焦可控性与生成效率：This&amp;That通过联合条件指示表达（“this”/“that”）与配对手势坐标，解决纯语言在多同类物体场景的接地模糊性，无歧义传递操作意图；Say, Dream, and Act从另一方向提升效率，采用对抗蒸馏减少去噪步数，引入帧率无关视频预测机制，解耦轨迹规划与固定执行频率，支持可变长时域统一预测。</p>\n<p>规划表征的空间表达能力扩展到标准RGB视频之外：TesserAct为视频预测目标增加深度与表面法向量通道，为规划载体引入显式几何约束，为下游动作提取提供更丰富线索；MVISTA-4D完全替代传统IDM，采用轨迹级隐式优化与残差IDM精炼两步机制，缓解每步动作提取的病态问题。</p>\n<p>跨机器人形态与数据源的扩展推动更多研究：Vidar基于扩散视频基础模型，将人类操作视频转换为机器人执行视频，通过编码机器人类型、相机布局、任务指令、场景上下文作为全局生成条件，采用掩码预测聚焦交互关键区域，统一建模双手机器人；Gen2Act进一步实现跨形态通用操作，零样本调用预训练VideoPoet模型生成人类操作视频，无需微调，用点跟踪作为辅助损失的闭环神经策略替代硬编码几何提取规则；Veo-Act通过门控机制解决基础视频模型在接触密集阶段的精度差距：多头IDM从Veo-3生成视频提取动作，用于粗导航，在线交互检测器检测到即将接触时，切换为响应式VLA策略控制。</p>\n<p>部分工作替代专用IDM，采用其他解码器：VAG采用1D U-Net作为动作解码器，视频扩散分支完成完整去噪到像素空间，视频U-Net中间特征条件化独立动作U-Net；用预训练VLA替代第二阶段IDM，基于BAGEL的世界模型生成期望近未来状态的多视角子目标图像，与语言、片段元数据一同注入VLA上下文窗口，VLA的流匹配动作专家基于该想象未来生成动作块，将泛化压力从逆动态学习转移到VLA的预训练上下文理解，实现强开箱即用与跨形态零样本性能，无需任务特定微调。</p>\n<p><strong>几何动作提取</strong>并行工作用结构化中间表征的几何计算替代学习型IDM，将动作提取问题从逆动态学习转为解析可解的几何问题，按运动表征为光流或跟踪物体姿态分为两类。</p>\n<p>光流作为中间表征由AVDC引入，完全分离视频合成与动作提取：条件文本扩散模型生成完整像素级视频，计算稠密光流，解析推导SE(3)变换，训练无需动作标注；Im2Flow2Act将流估计转移到隐空间，基于AnimateDiff流生成网络绕过像素级视频合成，独立训练的流条件策略直接将流场映射为动作，牺牲像素级外观信息换取计算效率；3DFlowAction将表征从2D提升到3D，通过视频扩散生成稠密3D流场，捕捉平面流无法获取的旋转与深度位移运动分量；NovaFlow、Dream2Flow推动范式向零训练演进，直接使用预训练视频生成模型，通过深度估计与点跟踪推导3D物体级流，转换为机器人命令，无需演示数据或额外训练。</p>\n<p>姿态跟踪是第二条几何提取路径：Dreamitate以工具作为人与机器人动作的连接代理，基于人类工具使用演示微调的立体视频扩散模型，条件立体场景图像生成任务执行视频，MegaPose逐帧跟踪工具6-DoF姿态，立体几何约束深度估计，逆运动学将轨迹映射为关节命令，让动作提取完全独立于机器人形态；4DGen扩展到多视角一致生成，基于SVD骨干，从双视角RGB-D条件联合预测RGB视频与3D点图序列；RIGVid用FoundationPose跟踪被操作物体而非工具，用轨迹重定向替代逆运动学，用VLM过滤质量的零样本扩散生成视频替代人类演示视频；LVP从生成的人类操作视频重建3D手部姿态，通过运动学映射转换为末端执行器轨迹，采用<strong>扩散强制</strong>（将视频分为低噪声历史与高噪声未来段，因果掩码）提升生成时间一致性。</p>\n<p><img alt=\"\" src=\"https://pic3.zhimg.com/v2-723e1ed5456008b8d3f4ccc9e518b5f2_1440w.jpg\" /></p>\n<h3><strong>4.1.2 基于隐式表征的隐式规划</strong></h3>\n<p>像素级视频合成的计算开销是实时部署的主要瓶颈。隐式规划路径的动机是：扩散过程中的中间隐式表征已编码规划所需动态信息，无需解码回像素空间。规划载体替换为隐式特征序列，全程保留在压缩表征空间。</p>\n<p>VPP直接验证该权衡：预训练VAE编码观测帧，扩散模型单步预测未来隐式序列，轻量策略网络基于这些隐式生成动作，首次实现该框架下兼容实时控制的规划推理速度；VILP在同一范式引入多视角隐式规划，从双同步视角生成完整隐式视频序列，独立训练的状态策略网络恢复动作；S-VAM直接解决VPP单步推理的生成质量损失，通过自蒸馏平衡效率与保真度：训练时，冻结多步SVD骨干提供结构化教师表征，监督轻量时空解耦器，将迭代生成压缩为单次前向传播；推理时，一步特征通过QFormer式感知器聚合，条件化基于DiT的扩散策略，在实时控制频率下恢复高质量规划。</p>\n<p>Video Policy第一阶段使用显式像素视频，开创关键隐式提取技术：微调SVD用于视频预测后，冻结所有视频U-Net权重，训练独立动作U-Net，基于视频解码器中间特征生成动作序列，确立特征级条件作为像素/流输入的替代方案；ARDuP训练时从Co-Tracker稠密运动点跟踪与SAM生成交互区域掩码获取伪监督，将生成的主动区域建议作为条件注入视频扩散模型，让生成聚焦任务相关区域；mimic-video用流匹配替代DDPM，采用部分去噪策略，在ODE积分中间检查点提取特征，绕过完整生成路径，提升生成效率；MWM用未来语义掩码隐式替代RGB预测，缓存冻结掩码预测骨干的隐藏状态，条件化动作扩散头，该几何信息瓶颈有效过滤光度干扰，在严重视觉变化下实现高鲁棒控制。</p>\n<p>OmniVTA将隐式隐式规划扩展到视觉-触觉领域，双分支扩散Transformer联合生成未来视觉与触觉隐式，下游融合策略通过差分编码器消耗预测触觉隐式，捕捉预测与当前接触状态差异，实现接触密集操作中未见过物体的强泛化性。</p>\n<p>LAPA提出无监督隐式动作预训练框架：基于VQ-VAE的隐式动作模型，以自监督方式从无标注视频学习“状态-隐式动作”先验，下游微调仅需少量真实动作标注映射到实际关节动作，大幅降低标注需求；villa-X从两方面推进隐式动作建模：其一，引入本体感受前向动态模型（proprio-FDM），通过视觉重构与本体感受预测损失联合优化，将隐式动作落地到物理动态；其二，提出包含隐式动作专家与机器人动作专家的联合扩散框架，隐式动作显式条件化低层动作生成，实现更结构化知识迁移。</p>\n<h3><strong>4.2 联合式世界动作模型</strong></h3>\n<p>联合式世界动作模型指在单一统一模型中预测未来世界状态与动作，训练时世界建模与动作生成作为联合监督目标。联合架构的核心设计问题是：世界状态与动作生成如何在共享预测系统内耦合。按世界-动作预测的实现基础，现有联合世界动作模型分为两大类：</p>\n<ol>\n<li><strong>自回归生成</strong>（第4.2.1节）：将未来世界变量与动作变量序列化到token空间，通过自回归预测建模；</li>\n<li><strong>基于扩散的非自回归生成</strong>（第4.2.2节）：通过扩散/流匹配生成式过程生成未来观测、隐式世界状态或动作轨迹，在连续隐空间或并行去噪流中实现两者联合精炼。</li>\n</ol>\n<h3><strong>4.2.1 自回归生成的联合预测</strong></h3>\n<p>自回归生成指依赖因果从左到右序列解码，参数化未来状态与控制信号的联合世界动作模型分支。这类架构将异构变量序列化为统一时间序列，世界与动作的联合分布按序分解。这种基础生成机制确保早期预测因果条件化后续步骤。</p>\n<p>尽管共享因果序列建模统一架构，但将控制与视频生成为严格从左到右预测问题，带来显著架构张力，核心挑战是缓解灾难性误差传播（早期视觉幻觉引发后续动作失败），同时平衡序列解码的计算瓶颈与实时机器人执行的低延迟需求。</p>\n<p>该分支按目标表征与输出接口演进，分为三类：</p>\n<ol>\n<li><strong>显式解耦表征</strong>：模态保持异构格式，通过结构分离输出头解码；</li>\n<li><strong>统一离散表征</strong>：模态完全量化为同质token空间，共享预测头控制；</li>\n<li><strong>预测隐式表征</strong>：放弃显式token生成，在抽象连续隐空间自回归。</li>\n</ol>\n<p><strong>显式解耦表征</strong>早期自回归联合预测方法在表征层面保持严格模态分离，不强制连续物理动态与高维视觉状态进入单一共享词汇表，核心设计原则是<strong>表征解耦</strong>：依赖显式注入控制token（如[ACT]、[OBS]），将交错序列特征路由到结构分离、任务专用输出头，通常配对连续动作解码器与离散视觉块回归分支。</p>\n<p>GR-1确立该范式，证明视频重建预训练的Transformer可通过双分支头，同时解码未来视觉块与连续动作，强制模型预测未来视觉事件，内部视频预测为动作生成提供强正则化；纯视觉rollout较脆弱，GR-MG将世界rollout过程解耦为宏/微步层级，引入[PROG] token，基于扩散生成视觉目标条件化策略，即使中间像素预测失败，语言模态仍能指导执行；GR-2扩展基础概念，采用VQGAN token转向完全离散视觉流程，将视觉rollout作为隐式规划器，耦合离散视觉预见与CVAE参数化的连续动作分块。尽管多头部方法验证自回归联合预测可行性，但依赖分离分支带来显著延迟瓶颈，限制跨模态接地深度。</p>\n<p><strong>统一离散表征</strong>通用视觉-语言基础模型缩放后，表征焦点从解耦路由转向同质token空间深度集成。该范式完全消除物理与视觉模态的异构性：连续动作与高维图像完全量化，映射到单一共享LLM词汇表，物理动态与视觉状态表示为统一离散符号，由同一下一token预测头生成。该类主要挑战转为设计注意力与路由机制，缓解自回归采样长串无接地动作token的严重复合误差。</p>\n<p>研究者提出不同注意力与路由机制解决复合误差：CoT-VLA采用混合注意力路由，分裂注意力机制，先通过因果注意力自回归生成离散视觉思维链（CoT），再切换全注意力机制，同步预测到达生成视觉状态所需动作序列；WorldVLA依赖模态特定因果掩码，严格通过交错提示模板操作，修改策略rollout的标准因果掩码，显式禁止当前动作token关注同一块内先前生成动作，强制局部预测完全基于历史视觉与语言上下文。</p>\n<p>RynnVLA-002为缓解纯离散控制的高方差，在离散MLLM主干附加轻量连续动作Transformer头，并行解码连续动作块，保留统一世界建模；ℱ¹采用混合Transformer（MoT）框架解耦预测路径，引入生成专家通过尺度预测自回归生成离散VQ token，动作专家通过渐进注意力，从幻觉视觉预见直接推导控制信号，将动作生成重构为预见引导的逆动态问题。</p>\n<p><strong>预测隐式表征</strong>自回归显式视觉token或解耦块可解释性强，但计算开销极大，易陷入“像素匹配捷径”——模型消耗容量重构无用背景变化，而非学习可执行转移物理。为规避该问题，预测隐式表征将表征基础完全从显式像素转向抽象连续隐式嵌入。</p>\n<p>该范式的典型代表是<strong>联合嵌入预测架构（JEPA）</strong>系列，VLA-JEPA严格在该高层隐空间落地联合序列建模，提取连续隐式动作token，条件化引导自回归世界模型，预测冻结目标网络编码的未来表征。因未来帧仅作为独立监督目标，架构保持无结构泄漏，物理执行通过条件化流匹配头的具身动作token，连接抽象转移知识。用隐式转移对齐替代显式视频合成，本质优先语义抽象与鲁棒性，而非像素级重构。</p>\n<p><img alt=\"\" src=\"https://pic4.zhimg.com/v2-e368112ef642330218ebcc5b8812bfcb_1440w.jpg\" /></p>\n<h3><strong>4.2.2 基于扩散生成的联合预测</strong></h3>\n<p>基于扩散的生成是联合世界-动作建模的重要技术路径，通过多步生成式过程捕捉未来状态复杂分布。借助扩散、连续流匹配等生成框架，架构在多步时域同步生成未来世界状态与动作序列，从根本上克服自回归建模的序列瓶颈，支持闭环控制所需高频执行。</p>\n<p><img alt=\"\" src=\"https://pic1.zhimg.com/v2-0010c0928f06467f65b3ac41597f0132_1440w.jpg\" /></p>\n<p>为系统刻画多样化扩散联合模型景观，按预测流的结构耦合分类：</p>\n<ol>\n<li><strong>单流架构</strong>：将世界与动作变量集成到单一同质预测主干（如单个DiT），世界建模与动作生成在共享隐空间作为联合去噪任务，通过统一注意力机制实现最紧密同步；</li>\n<li><strong>多流架构</strong>：生成分布在协调分支或模态特定专家，世界与动作分支通过显式耦合机制（交叉注意力、隐藏状态条件化、共享编码器）交互，主干层面的区别是理解世界与动作分支如何结构融合的核心轴。</li>\n</ol>\n<p><strong>单流架构</strong>该类结构将世界与动作变量的并行生成吸收到统一主干（通常为单个扩散Transformer），世界与动作相关变量在同一主 trunk 处理，方法差异主要体现在预测目标形式、辅助token/前缀组织、附加条件信息注入方式，而非显式多分支分解。进一步分为<strong>显式未来预测</strong>与<strong>隐式未来预测</strong>两类。</p>\n<ul>\n<li><strong>显式未来预测</strong>：将未来观测或显式隐式代理作为模型直接预测目标，世界建模通过显式生成未来图像或其他模态目标实现，未来状态预测是训练全程主要去噪目标。方法差异主要体现在未来目标形式与训练/rollout组织方式。</li>\n</ul>\n<p>最直接的实例联合去噪未来图像隐式与动作token拼接序列：PAD编码多模态输入（RGB图像、机器人姿态、深度）为统一隐式序列，在共享去噪目标下联合预测未来帧与动作块，从零训练，预训练时通过扩展token序列、应用注意力掩码融入无动作互联网视频数据，消融实验证明移除未来图像预测或视频协同训练均降低控制性能，验证显式世界建模监督对动作训练质量与推理性能的贡献；VideoVLA共享相同联合去噪结构，但起点不同：复用预训练CogVideoX-5B视频扩散主干，将未来视频隐式与7-DoF动作块作为联合去噪目标序列，条件化当前帧与语言指令，基于预训练视频模型无需无动作协同训练，主干已编码丰富视觉动态。</p>\n<p>UWM引入更灵活设计，在单一共享Transformer内为世界与动作变量分配独立可控噪声水平，解耦扩散调度，测试时独立控制两侧噪声水平，单一模型可切换为策略推理、前向动态预测、逆动态、纯视频生成等不同操作模式，无需架构切换，同时优雅解决无动作视频数据问题：缺失动作侧完全噪声化，应用标准去噪目标。</p>\n<p>Cosmos Policy在UWM基础上拓宽联合预测内容，基于Cosmos-Predict2视频骨干，引入隐式帧注入：本体感受、动作块、未来状态、预测值函数编码为隐式帧，与图像隐式交错插入同一去噪序列，该 formulation 让单一检查点同时作为策略、世界模型、值函数，推理时切换为自回归解码，实现基于N最优采样的规划。 DreamZero是该设计的典型实例，直接基于预训练Wan2.1图像转视频骨干，仅轻量添加状态/动作编码器与动作解码器，在共享目标下联合去噪视频隐式与动作隐式，为保持闭环条件化且不累积生成视觉漂移，每执行一块动作后，用真实观测替换想象未来帧；为将推理延迟降至实时控制范围，引入异步执行、DiT缓存、量化、CUDA图编译等系统级优化；GigaWorld-Policy采用相同架构设计，但调整动作生成注意力，仅关注历史与当前观测，而非想象未来帧，推理时无需生成未来视频，进一步加速；X-WAM扩展预测目标，将最终DiT块复制为交错深度分支，实现显式RGB-D联合建模，不破坏预训练视觉先验，采用异步噪声采样对齐训练与测试噪声调度，实现高效动作调度。</p>\n<p>其他工作探索离散扩散作为连续去噪的替代方案，用于联合未来生成：UD-VLA通过统一离散token空间的迭代掩码-预测步骤，联合去噪未来图像token与动作token。</p>\n<ul>\n<li><strong>隐式未来预测</strong>：通过未来状态的隐式表征融入未来世界监督，而非显式生成未来观测。该类策略仍使用单一动作生成主干，但通过辅助未来token或未来前缀引入未来信息，中间表征与冻结教师编码器编码的未来观测嵌入对齐，监督目标不是重构未来帧/视频序列，而是隐式层面学习的紧凑未来表征。相比显式未来预测组，这些方法将世界建模作为内部预测约束纳入策略网络，而非附加生成输出，推理时保留直接动作生成接口。</li>\n</ul>\n<p>FLARE确立核心设计：可学习未来token附加到动作token序列，通过同一DiT传播，内部层中未来token激活经MLP投影，监督匹配冻结教师编码器编码的真实未来观测视觉嵌入，强制策略内部表征预判动作执行后的世界状态，该对齐损失自然扩展到无动作视频数据，单独应用无需动作目标，让策略从纯视频演示学习隐式世界动态；FRAPPE将该方法发展为后训练方案，在冻结RDT主干引入多对齐专家，混合前缀与LoRA公式为每个专家分配不同教师表征，轻量路由聚合输出，为稳定多专家训练，先将全参数对齐到单一蒸馏教师，再扩展到并行参数高效设置，证明隐式对齐可通过分阶段训练模块化组合，无需从头联合训练。</p>\n<p><strong>多流架构</strong></p>\n<p>第二类将世界-动作耦合置于持久架构分解层面，世界建模与动作生成不再吸收到单一同质预测主干，联合预测计算分布在多个协调分支、流、专家或共享编码器-分离解码器组件，交互需架构指定。按主导耦合接口分为三类：</p>\n<ol>\n<li><strong>交叉注意力耦合</strong>；</li>\n<li><strong>隐藏状态耦合</strong>；</li>\n<li>\n<p><strong>共享表征</strong>。</p>\n</li>\n<li>\n<p><strong>交叉注意力耦合</strong>：世界建模与动作生成分配到两个结构独立分支（视频DiT与动作DiT），通过显式交叉注意力实现耦合，与单DiT方法共享同一DiT块不同，交互是显式架构设计对象：每个分支保持独立生成路径，同时通过专用注意力机制持续交换信息。</p>\n</li>\n</ol>\n<p>多项工作实例化该双分支模式，探索耦合机制与世界表征的不同设计：CoVAR引入专用桥接注意力模块，拼接视频与动作特征，执行联合注意力，拆分回独立流，视频与动作分支保持结构分离，生成期间持续交换信息；LDA-1B采用不同路线：不使用专用耦合模块，将两种模态吸收到共享MM-DiT注意力层，模态特定投影，两个流表征保持独立但在共享自注意力内交互，世界表征在结构化DINO隐空间预测未来状态，而非视频VAE隐式，监督按数据质量分层：高质量轨迹用于策略与动态，低质量用于动态与预测，无动作视频用于预测，为支持单一架构内不同模式，引入可学习任务嵌入与模态特定注册token，同一主干无需修改网络拓扑，切换为策略、动态、预测任务；DUST采用相似MM-DiT结构，但发现进一步自由度：两种模态无需共享相同生成动态，用独立噪声时间步扰动世界与动作，联合目标内独立流匹配损失优化，推理异步采样，解耦去噪轨迹，保持每块内跨模态耦合。</p>\n<p>后续工作收敛到混合Transformer作为统一耦合基础，世界与动作隐式通过模态特定DiT路径处理，通过共享注意力交互，设计问题从耦合两流转为耦合系统提供附加能力：LingBot-VA聚焦rollout步骤间的时间接地，将视频隐式与动作token交错为自回归序列，为MoT配对KV缓存，累积块间完整交错历史，保持持续闭环执行的因果一致性，部署流水线引入异步预测与执行，结合反馈接地前向动态更新，新接收真实观测可纳入，再预测下一块；DexWorldModel遵循相同自回归MoT结构，但解决内存成本，用双状态TTT内存替代增长KV缓存，分离长期观测与短期预测隐式，将世界表征从RGB转为DINOv3语义特征，降低对任务无关视觉变化的敏感度；AIM关注两分支接口，意图因果注意力掩码禁止动作token直接关注未来RGB token，未来信息仅通过预测值映射传递到动作头，定位任务相关接触与放置区域；Being-H0.7解决联合预测固有的训练-推理不对称：训练时世界分支显式生成未来表征，通过对齐损失蒸馏为隐式查询；推理时丢弃世界分支，仅保留隐式查询，大幅降低推理成本，保持竞争力性能。</p>\n<p>双流MoT公式自然扩展：不只是耦合世界与动作，可引入额外模态专家到共享注意力，让MoT成为更通用多专家协调框架。Motus实例化该设计，添加从预训练VLM派生的语义理解专家，世界、动作、语义理解分支通过三模态联合注意力交互，UniDiffuser式调度器为每个模态分配独立噪声水平，统一架构可在单一主干内操作VLA、世界模型、逆动态等多种功能模式；MotuBrain进一步强化语言分支，文本token显式参与多模态注意力，而非作为外部条件信号，为平衡耦合强度与效率，仅中间层应用全联合注意力，外层保持部分解耦H桥结构，支持多视角输入，在共享空间坐标分配视角依赖3D RoPE偏移；AdaWorldPolicy引入力预测器作为第三专家，将附加分支从语义接地转为物理交互建模，三个专家均为基于预训练Cosmos-Predict2主干的流匹配DiT，通过多模态自注意力连接，训练交替动作生成与未来想象模式，部署时想象与观测状态、力读数的差异作为LoRA在线自适应的自监督信号。</p>\n<ul>\n<li><strong>隐藏状态耦合</strong>：第二多DiT模式通过从一个分支传递到另一分支的中间表征，耦合世界建模与动作生成。该类两个组件仍分配到独立主干，但核心交互不再是跨分支重复交叉交换的持续协同生成，而是世界分支生成含时间信息的内部表征（想象隐式轨迹、多尺度转移特征、去噪隐藏状态），动作分支作为控制预测的条件信号。相比交叉注意力耦合分支，耦合围绕世界模型到动作模型的内部状态传递，而非生成期间并行分支的持续交互。</li>\n</ul>\n<p>DiT4DiT通过成对视频DiT-动作DiT架构实例化该设计，动作分支条件化视频分支未来帧去噪期间提取的中间隐藏状态，钩子算子在选定特征提取时间步截取特定Transformer块或跨层聚合的隐藏激活，通过交叉注意力与本体感受状态嵌入、噪声动作令牌传递到动作DiT；为协调两个模块，三时间步设计独立采样视频预测时间步与动作时间步，固定隐藏状态提取时间步稳定条件信号；推理时动作预测同样依赖单一确定性提取步骤，而非完整视频采样循环；Fast-WAM追求相关设计，但以推理效率为首要目标：训练时保留视频分支作为视频DiT-动作DiT MoT内的未来视频流匹配目标，结构化掩码禁止动作token关注未来视频隐式；推理时移除未来视频分支，视频DiT仅单次前向编码当前视觉上下文，隐式世界特征条件化动作去噪，隐藏状态接口作为训练时耦合机制保留，推理成本消除。</p>\n<p>WAV通过在隐式未来预测与动作解码间引入显式轨迹-值分支，扩展单向世界到动作接口，视频模块生成隐式未来视觉rollout，值模块通过交叉注意力评估这些rollout，动作解码器条件化视觉rollout特征与值嵌入，推理时该接口转为隐式规划，迭代用最优分数样本更新视频与值噪声分布，动作从值塑造的隐式未来解码，无需外部规划器。</p>\n<p>Act2Goal围绕不同目标组织隐藏状态耦合：非提升传递表征的保真度或效率，而是用耦合支持长时目标导向行为，世界分支接收当前观测与目标图像，生成代表向目标视觉进展的中间隐式帧序列；动作分支通过交叉注意力，基于这些想象转移的多尺度时间特征预测动作，核心组件是多尺度时间哈希，将预测视觉状态与动作组织为近-远时间结构：近帧与动作保持密集，用于短时闭环控制；远帧与动作稀疏化，对数递增间距，保持长时目标一致性。除离线联合视觉-动作流匹配目标训练外，Act2Goal进一步支持HER式目标重标记与LoRA微调的无奖励在线提升。</p>\n<ul>\n<li><strong>共享表征/统一编码器</strong>：另一多DiT模式将世界-动作集成置于共享表征空间或统一编码器，而非持久分支级交互或分支到分支的中间隐藏状态传递。该类视觉观测与动作先融合到公共隐式基底，联合处理，模态特定解码器或输出头后续恢复世界侧与动作侧预测，关键架构区别是在统一表征层面执行联合建模，将模态专用推迟到后续解码阶段。</li>\n</ul>\n<p>UVA将历史观测、动作块与掩码未来观测令牌编码到共享Transformer主干，将未来视频与动作信息组织为预测时域的统一隐式，共享隐式令牌随后由两个轻量扩散头解码：视频扩散头逐令牌重构未来观测，动作扩散头聚合每个未来步骤的隐式令牌，预测对应动作块，两个解码路径联合训练但推理时解耦，策略执行可绕过视频生成，直接从共享隐式解码动作；UVA进一步采用掩码训练方案，灵活输入-输出配置，未使用组件替换为可学习掩码令牌，按选定目标应用损失，同一主干无需任务嵌入或模态调度切换，通过掩码不同组件，作为策略模型、视频模型、前向/逆动态模型、策略-规划器组合运行；PhysGen在基于预训练自回归视频骨干（NOVA）的连续自回归框架内，采用相同共享表征逻辑，将观测与动作块token化为帧令牌与动作令牌，拼接为共享物理令牌，通过统一因果Transformer建模联合未来动态，生成令牌通过分离路径解码：帧令牌由继承的视频解token器重构，动作令牌由轻量Action-DiT通过交叉注意力条件化自回归上下文解码；因果掩码方案允许动作令牌单向关注帧令牌，预测未来视觉状态指导动作生成，前瞻多令牌预测在每个自回归步骤并行生成多个未来动作令牌，推理时仅执行第一个。</p>\n<p><img alt=\"\" src=\"https://pic1.zhimg.com/v2-b4f4e88ff334054bae70f66c50f0fba6_1440w.jpg\" /></p>\n<h3><strong>5 训练数据</strong></h3>\n<p>训练鲁棒且通用的世界动作模型（WAMs），根本上受限于具身数据的可用性与质量。与依赖被动爬取互联网文本的大型语言模型不同，WAM需要严格的物理接地，捕捉复杂状态转移、条件动作与直觉物理。更重要的是，WAM的数据需求与传统机器人范式显著不同：标准视觉-语言-动作（VLA）模型严格要求配对轨迹，受限于遥操作演示的高成本与稀缺性；纯世界模型依赖无动作互联网视频序列，但缺乏物理控制接地。</p>\n<p><img alt=\"\" src=\"https://pic1.zhimg.com/v2-654c2f61cbeb7abd682752553c313e5a_1440w.jpg\" /></p>\n<p>WAM的独特优势在于<strong>统一数据消化能力</strong>，同时受益于两类数据：利用高质量三元组紧密耦合内部表征，同时具备架构灵活性，通过联合训练策略吸收海量非配对数据（如纯视频学习视觉物理）。因此，构建WAM的数据生态不仅是缩放机器人中心数据，而是策略性混合严格配对演示与无约束观测。</p>\n<p>本节全面梳理驱动WAM训练的四大主流数据范式：</p>\n<ol>\n<li><strong>高保真机器人中心遥操作数据</strong>（第5.1节）：提供精确运动学接地；</li>\n<li><strong>灵活便携式人类演示数据</strong>（第5.2节）：桥接人类灵巧性与真实世界交互（如UMI数据）；</li>\n<li><strong>高可扩展仿真数据</strong>（第5.3节）：提供无限程序变化与特权空间监督；</li>\n<li><strong>广覆盖人类与第一人称中心数据</strong>（第5.4节）：提供近乎无限的被动世界动态先验。</li>\n</ol>\n<p>通过平衡固有权衡（从机器人中心遥操作的复杂刚性设置，到互联网视频的低成本大规模特性），研究者越来越多地混合使用这些互补数据集，弥合精确低层机器人控制与广泛开放世界泛化的差距。</p>\n<h3><strong>5.1 机器人中心遥操作数据</strong></h3>\n<p>遥操作仍是获取具身智能高质量专家轨迹数据最可靠、最主流的范式。该设置下，人类操作员通过远程控制接口操控机器人代理，记录连续传感观测、本体感受状态与对应可执行动作。对WAM训练而言，机器人中心数据集具备不可替代的价值：提供严格对齐、高频动作-状态对，学习精确条件动作物理动态，几乎无仿真-真实差距。随着机器人硬件与学习算法协同发展，数据集构建沿两大战略方向演进：<strong>向开放世界多样性缩放</strong>、<strong>深化感知的物理接地</strong>。</p>\n<h3><strong>5.1.1 向上缩放：形态、多样性与自动增强</strong></h3>\n<p>第一大方向打破封闭世界假设，大幅提升数据集规模、环境变化与形态覆盖。早期里程碑如QT-Opt、MT-Opt成功验证收集大规模自监督轨迹数据的可行性；同时，RoboNet、MIME等开创性工作迈出跨机器人、跨域泛化的关键第一步。但这些早期收集主要局限于隔离实验室环境与短时原始技能。</p>\n<p>为弥合到真实开放世界部署的差距，后续工作刻意聚焦语义多样性与序列推理能力，BridgeData、BC-Z、RT-1、LanguageTable等数据集转向多样家庭场景的语言条件任务，语言指令的纳入对WAM至关重要，为模型提供语义锚点，将视觉状态转移落地到通用人类概念；TACO-RL、RH20T-P等数据集强调长时推理与分层任务分解，迫使模型预测扩展序列的未来状态。</p>\n<p>这种缩放趋势最终汇聚为大规模多平台聚合，Open-X Embodiment（OXE）整合22台机器人超100万条轨迹，ARIO、RoboMIND进一步推进该统一策略；同时，DROID等野外大规模收集显著扩展场景多样性，近期UnifoLM-WBT将该范式扩展到高自由度人形机器人（Humanoid）。对WAM而言，这种极端形态多样性是变革性的，迫使世界模型解耦通用物理规律与特定机器人运动学，实现鲁棒跨形态泛化。</p>\n<p>关键的是，为绕过手动目标导向遥操作固有的人力与标注瓶颈，该缩放方向越来越多地采用替代数据获取机制：一类是利用非结构化、基于玩耍的数据源，Jaco Play展示无需严格任务定义，收集连续、任务无关交互先验，为WAM提供广泛的物体对任意力响应的探索知识；并行地，生成式与自动增强成为强大缩放引擎，Grasp-Anything等利用视觉基础模型，将抓取数据生成式缩放至百万轨迹级别，Interleave-VLA通过自动图像-文本交错，大幅扩展监督空间；3D领域，UniVoxGen数据集通过大规模合成体素生成，缩放空间推理。通过多机器人聚合、无脚本探索与自动生成结合，该领域建立可持续路径，用近乎无限训练数据填充WAM，绕过人工收集的严格限制。</p>\n<h3><strong>5.1.2 深化感知：多模态与接触密集接地</strong></h3>\n<p>与规模扩展并行，第二关键方向解决纯视觉（RGB）感知的部分观测瓶颈。复杂物理环境中，许多状态转移视觉模糊或被遮挡，为捕捉微妙物理交互，近期数据集系统性整合更密集多模态信号。Berkeley UR5、OmniAction引入音频模态，捕捉材料识别与冲击验证必需的声学特征；同时，复杂材料动态建模仍是知名挑战，TOTO等数据集专门关注视觉模糊任务（如倾倒液体、透明物体交互），Cable Routing Dataset、REASSEMBLE聚焦复杂可变形操作与紧公差物理装配。</p>\n<p>为进一步对抗遮挡、提升空间理解，越来越强调3D几何，RH20T、Robo360、RoboData等数据集强调密集多视角捕获与校准3D点云对齐，确保策略学习鲁棒物理表征，独立于单一相机角度；近期，前沿 heavily 向高保真触觉反馈与灵巧监督推进，RoboSet强调铰接物体的力约束操作，DexCap捕获与机器人观测空间对齐的精细灵巧人类手部运动；同时，FuSe、AgiBot World集成显式视觉-触觉传感器与动态双手协调。这些多模态数据集对WAM绝对基础，允许模型内化直觉低层物理（如接触扳手、滑动摩擦、质量分布、局部变形），这些无法从2D视觉外观数学推导，弥合高层推理与物理执行的关键差距。</p>\n<p><img alt=\"\" src=\"https://pica.zhimg.com/v2-f118112925f6a7d2d1fa3d085b24beda_1440w.jpg\" /></p>\n<h3><strong>5.2 便携式人类演示数据（UMI风格）</strong></h3>\n<p>尽管机器人中心遥操作数据集质量高，但面临持久瓶颈：数据收集成本高、局限于受限实验室环境、形态多样性有限。这些约束限制模型接触WAM必需的广泛无约束世界动态。为克服该问题，研究者重新思考数据收集接口，转向便携式、低成本人类演示范式，桥接结构化机器人遥操作与多样互联网视频。</p>\n<p>通用操作接口（UMI）是该方向的里程碑，通过轻量化手持3D打印夹持器结合可穿戴相机，允许非专家用户直接在日常野外环境收集操作轨迹，通过视觉跟踪与重定向，人类演示对齐为机器人可执行动作。</p>\n<p>超越基础硬件开发，UMI生态快速演进，扩展收集数据的传感模态与任务复杂度，FastUMI优化流水线，实现可扩展大规模数据集构建；后续扩展系统性增强收集数据，融入主动感知、关键触觉反馈、多视角视觉观测；同时，范式从简单平行爪夹持器扩展，捕获高自由度灵巧操作、全身移动协调。对WAM训练而言，这种演进确保便携式演示数据能提供学习真实世界物理必需的多模态、接触密集、复杂动作轨迹。</p>\n<p>因此，UMI风格数据集快速从小型概念验证收集，演进为大规模野外语料库，早期版本主要验证硬件范式，近期工作为通用策略学习提供无与伦比资源。FastUMI-100K将轨迹数推至10万以上，丰富多模态文本标注；RealOmin实现质的飞跃，收集超3000个多样家庭环境的百万规模数据集，捕获丰富本体感受、IMU、触觉信号；同样，Hoi!明确针对跨视角与力感知操作，对WAM学习直觉物理与接触动态至关重要；特别是RDT2等数据集，提供数百真实场景约1万小时演示。</p>\n<p>对世界动作模型的发展，这些大规模便携式数据集作为关键桥梁，具备第一人称人类视频的巨大环境与上下文多样性，同时严格配对高频厘米级动作约束。这种独特组合让WAM能在无约束物理环境学习高鲁棒、条件动作状态转移动态，这是传统机器人中心数据集几乎无法获取的能力。</p>\n<p><img alt=\"\" src=\"https://pic1.zhimg.com/v2-f11af9aaac9876c02e1f0c86d9248e34_1440w.jpg\" /></p>\n<h3><strong>5.3 仿真数据</strong></h3>\n<p>仿真提供可扩展、完全可控、确定性的真实世界数据收集替代方案。对世界动作模型（WAMs）训练而言，仿真的根本价值远不止成本降低，物理引擎本质上是精确的计算世界模型。与受严重部分观测、传感噪声影响的真实世界数据集不同，仿真环境提供特权信息——完美深度、精确6D物体姿态、无误差碰撞边界、无遮挡多视角状态。通过仿真数据训练，WAM不仅复制轨迹，而是直接从渲染与物理引擎（如MuJoCo、Isaac Sim、SAPIEN）提炼基础直觉物理规律。这些数据集的演进反映向<strong>大规模程序缩放</strong>、<strong>越来越高保真时空与接触密集监督</strong>的过渡。</p>\n<h3><strong>5.3.1 向上缩放：程序生成与环境复杂度</strong></h3>\n<p>仿真最直接的优势是绕过遥操作的人力瓶颈，实现数据数量、环境多样性、任务复杂度同步缩放。早期基础框架如ManiSkill2为操作提供统一高性能基准；在此基础上，MimicGen、DexMimicGen等开创性工作证明，最小集人类演示可程序扩展为数万条多样轨迹，覆盖各类任务与双手机器人设置。</p>\n<p>随着仿真引擎成熟，近期数据集将这种缩放推至极端，InternData-A1将自动轨迹合成扩展至数百环境超63万条轨迹，SynGrasp-1B利用Isaac Sim、MuJoCo生成前所未有的1000万条抓取轨迹，反映鲁棒预训练必需的海量数据需求；同时，缩放从纯数量扩展到序列与语义复杂度，RoboCasa引入超10万条轨迹、120个真实厨房场景的巨大环境多样性；进一步推进任务复杂度，RoboCerebra强调带密集子任务指令标注的长时操作，QUARD-Auto扩展形态范围，支持四足机器人多任务学习。对WAM而言，长时任务与无限场景变化的自动扩展，对学习稳定、无漂移长步骤状态转移至关重要。</p>\n<h3><strong>5.3.2 时空动态：3D与4D具身建模</strong></h3>\n<p>真实世界视频数据的核心局限是2D相机投影与动态遮挡导致3D空间信息丢失，仿真规避该问题，提供精确空间真值。该能力推动专门面向空间与时间世界建模的数据集，TesserAct是该方向的重要里程碑，提供28.5万条对齐RGB、深度、表面法向量视频片段，明确面向4D（3D空间+时间）具身世界建模。</p>\n<p>同样，InternData-M1补充大规模轨迹数据，提供完美对齐、密集帧级2D/3D包围盒、分割掩码、显式抓取点；同时，RoboTwin 2.0等框架利用高保真3D资产（如Objaverse）结合 photorealistic 渲染，生成真实世界物体的数字孪生。对WAM而言，这些数据集无价，提供空间密集监督，理解物体几何与3D场景在特定机器人动作下的变换，实现从2D像素预测到真正3D空间动态的飞跃。</p>\n<h3><strong>5.3.3 接触密集物理：高保真触觉监督</strong></h3>\n<p>尽管刚体运动学仿真已成熟，模拟接触动态（如摩擦、软体变形、触觉反馈）长期是挑战。但随着WAM寻求掌握接触密集操作，需要显式力与触觉先验。物理引擎近期进展（如NVIDIA FleX）开始解锁该能力。</p>\n<p>TLA Dataset是该领域的开创性工作，超越视觉仿真，提供指尖装配任务的对齐触觉-语言-动作对，通过生成合成触觉读数，仿真让WAM建模接触时不可见的亚毫米级力交互。</p>\n<p>尽管合成渲染与真实世界观测的视觉差异（仿真-真实差距）仍是持续挑战，但底层物理原理（如重力、动量、不可穿透性）严格一致。通过对纹理、光照、相机参数的广泛域随机化（如SynGrasp-1B、RoboTwin 2.0），这些仿真数据集作为广阔物理 gym，为WAM注入鲁棒物理先验与空间推理能力，大幅减少下游微调所需真实世界数据量。</p>\n<p><img alt=\"\" src=\"https://pic2.zhimg.com/v2-2b537effad202417635f4e35ceba57b7_1440w.jpg\" /></p>\n<h3><strong>5.4 人类与第一人称中心数据</strong></h3>\n<p>世界动作模型（WAMs）相对传统VLA模型的根本优势，在于内化通用世界动态的能力。传统机器人中心数据集提供精确低层动作执行，但受限于物理机器人的形态约束与高收集成本，提供的无约束真实世界物理长尾知识有限。相反，互联网规模人类与第一人称数据集封装近乎无限的任务、环境、物理交互多样性，作为真实世界先验的巨大仓库，越来越被认为是训练通用WAM的基石。这些资源的演进分为两大关键方向：<strong>从原始视觉观测学习被动世界动态</strong>、<strong>通过人体姿态与本体感受接地提取主动条件动作动态</strong>。</p>\n<h3><strong>5.4.1 被动世界建模：动作语义与视觉动态</strong></h3>\n<p>大量完全无显式本体感受信号的大规模视频数据集，在教授WAM被动直觉物理规律方面发挥关键作用。早期基础工作聚焦拆解短时交互的物理常识，如SSv2提供超10万条剪辑，捕捉基础物理事件（推、掉落、撕裂），迫使模型学习时间推理与基础状态转移；转向无脚本第一人称感知，EPIC-KITCHENS提供55小时长时日常活动，EGTEA Gaze+引入显式视线跟踪，为WAM提供操作期间类人视觉注意力先验。</p>\n<p>随着深度学习缩放，数据量与任务复杂度同步提升，Ego4D实现里程碑式跨越，提供超3600小时无脚本第一人称视频，对WAM发展至关重要的是，Ego4D引入专门的情景记忆与未来预测基准，直接训练模型基于当前视觉上下文预测未来状态；为让模型接触无界开放世界语义，HowTo100M（1.36亿剪辑）、Kinetics-700等网络规模数据集提供大规模视频-文本对齐，让WAM将开放词汇语义指令落地到数百万实例的多样视觉状态转移；近期工作进一步优化这种被动监督，COM Kitchens引入视觉动作图，绘制动作与状态变化的组合规则；Egocentric-10K扩展到高精度工业工作流；DreamDojo用4.38万小时众包活动 pushed 规模极限。在该大规模语料库预训练，模型在接触任何机器人特定动作前，已建立深入的物体永久性与材料属性理解。</p>\n<h3><strong>5.4.2 弥合动作差距：姿态估计与本体感受接地</strong></h3>\n<p>原始视频提供视觉常识，但学习条件动作动态严格需要动作输入。为绕过机器人数据稀缺，研究者越来越将人类手作为通用末端执行器，通过为第一人称视频标注3D姿态与运动跟踪，数学桥接人类视频与机器人策略学习。</p>\n<p>早期数据集建立空间监督基础，Assembly101提供数千条结构化装配视频，H2O引入显式多视角3D手与6D物体姿态标注，将视觉交互转换为精确几何轨迹；EgoPAT3D进一步聚焦未来空间预期；这种精度随后缩放，捕捉复杂接触物理与视角不变理解，里程碑Ego-Exo4D捕获1286小时同步第一人称与第三人称视角，迫使模型独立于相机角度理解3D空间变换；对灵巧操作，ARCTIC、HOT3D、TACO等数据集提供毫米级精确3D手-物体网格，让WAM建模复杂力闭合与双手几何关系；同时，数据集扩展到全局形态感知，Aria Everyday Activities集成SLAM点云与眼睛视线，OAKINK2连接分层任务意图与精细姿态，Nymeria提供300小时全身动作捕捉。</p>\n<h3><strong>5.4.3 面向通用预训练的混合数据</strong></h3>\n<p><img alt=\"\" src=\"https://pic2.zhimg.com/v2-7626148def765da56ec48db8338b00d1_1440w.jpg\" /></p>\n<p>面向WAM研发的最新趋势，是<strong>专门为通用智能体预训练而构建的超大规模混合数据</strong>。这类数据不再是零散的学术测评集，而是把多源数据集整合成一体化的学习引擎。</p>\n<p>Ego-Centric Human Manipulation Dataset、UniHand 等汇集超过 1.3 亿帧、数千小时视频，把异构 RGB 观测统一对齐到人体运动学手姿态；<strong>EgoDex</strong> 更是最新里程碑，将规模扩展到 829 小时、194 个任务，同时保持高精度 3D 手指跟踪，用于灵巧控制。</p>\n<p>同期，Humanoid Everyday、 等数据集明确把人体第一人称演示与人形机器人（Humanoid）运动学对齐。对未来 WAM 而言，这类带本体感知标注的混合数据是最终催化剂，让模型能吸收海量人类行为数据，并直接映射到机器人动作空间。</p>\n<h3><strong>6 评估</strong></h3>\n<p>完整评估 WAM 需要同时衡量两方面：</p>\n<ol>\n<li>预测未来状态的保真度</li>\n<li>生成动作的有效性 ——且理想情况下要评估<strong>两者之间的因果对齐</strong>。</li>\n</ol>\n<p>但目前业界没有统一协议能同时评估这两个相互依赖的部分，现有工作普遍采用<strong>解耦评估范式</strong>：分别用模块专属指标评估世界建模能力与动作策略能力。本文沿用主流惯例，从两条互补轴线梳理评估方法：</p>\n<ol>\n<li><strong>世界建模能力</strong>（6.1节）：检验合成状态转移的物理完整性与结构一致性</li>\n<li><strong>动作策略能力</strong>（6.2节）：衡量生成动作完成具身任务的有效性</li>\n</ol>\n<h3><strong>6.1 如何评估世界建模能力？</strong></h3>\n<p>评估 WAM 的世界建模部分，和普通视频生成评估有本质区别： 除表面视觉真实感外，<strong>世界动作模型必须忠实捕捉环境底层动态并保留可执行信息</strong>。</p>\n<p>因此，当前对世界建模能力的评估分为三个平行维度：</p>\n<ul>\n<li><strong>视觉保真度</strong>（6.1.1）：评估视觉界面质量与时间一致性</li>\n<li><strong>物理常识</strong>（6.1.2）：检验是否符合基本物质与力学规律</li>\n<li><strong>动作合理性</strong>（6.1.3）：衡量合成转移是否包含足够信息，可映射回可执行控制信号</li>\n</ul>\n<h3><strong>6.1.1 视觉保真度</strong></h3>\n<p>视觉保真度是评估世界动作模型的最基础层面，因为生成视频若存在严重伪影、时序不一致或指令对齐差，物理推理与动作提取都会不可靠。</p>\n<p>当前工作通常组合四类指标：</p>\n<ul>\n<li>低层重建指标</li>\n<li>感知相似度指标</li>\n<li>语义对齐信号</li>\n<li>分布级真实感指标</li>\n</ul>\n<p>从像素层面评估：</p>\n<ul>\n<li>\n<p>：通过最大信号值与均方误差的对数比衡量重建保真度</p>\n</li>\n<li>\n<p>：通过比较亮度、对比度、结构信息评估结构相似性</p>\n</li>\n</ul>\n<p>超越低层统计，近期工作广泛引入基于特征的感知/语义相似度指标：</p>\n<ul>\n<li>\n<p>：在深度特征空间计算感知相似度</p>\n</li>\n<li>\n<p>：基于人类判断的感知相似度信号</p>\n</li>\n<li>\n<p>特征相似性：作为语义/实例级对齐信号</p>\n</li>\n</ul>\n<p>分布层面指标：</p>\n<ul>\n<li>：最常用的视频生成评估指标，计算真实与生成视频在预训练视频特征空间的弗雷歇距离</li>\n</ul>\n<p>总体上，世界动作模型的视频质量评估通常组合：</p>\n<ul>\n<li>PSNR/SSIM：低层保真</li>\n<li>LPIPS/DreamSim/DINO：感知与语义一致性</li>\n<li>FVD：分布真实感与时序质量</li>\n</ul>\n<h3><strong>6.1.2 物理常识</strong></h3>\n<p>视频质量衡量生成视频是否“看起来像真的”，<strong>物理常识</strong>回答更深层问题：<strong>生成的世界是否按物理规律合理运行</strong>。</p>\n<p>现有评估分为两大类：</p>\n<ol>\n<li><strong>物体动态</strong></li>\n<li><strong>轨迹合理性</strong></li>\n</ol>\n<h3><strong>物体动态</strong></h3>\n<p>物体动态关注生成视频是否保持物体时序连续性，同时建模符合物理的交互与时序一致事件演化，包括：</p>\n<ul>\n<li>实体跨帧稳定</li>\n<li>接触、碰撞、状态变化与因果顺序是否合理</li>\n</ul>\n<p>典型基准：</p>\n<ul>\n<li><strong>VideoPhy</strong>：评估固-固、固-液、液-液等物理交互场景，用人工二分类标注</li>\n<li><strong>PhyGenBench</strong>：基于 VLM + LLM 的自动化物理常识评估，检测关键物理现象、验证物理顺序、评估自然度</li>\n<li><strong>VBench-2.0</strong>：包含物理维度，评估视频是否遵守力学、热学、物态变化规律</li>\n<li><strong>WorldModelBench</strong>：用五条物理定律做二元检查（牛顿第一定律、质量守恒、固体力学、流体力学、不可穿透性、重力）</li>\n<li><strong>Physics-IQ</strong>：用真实视频测试模型预测物理事件未来演化的能力</li>\n</ul>\n<h3><strong>运动与轨迹合理性</strong></h3>\n<p>评估物体/智能体运动是否连贯、平滑、符合条件约束、物理合理，更强调长程运动质量与可控时序稳定。 典型基准：</p>\n<ul>\n<li><strong>WorldScore</strong>：从可控性、质量、动态性评估，动态性分解为运动精度、幅度、平滑度</li>\n<li><strong>EWMBench</strong>：评估具身世界模型的视觉一致性、运动正确性、语义对齐，用末端执行器（EEF）轨迹做评估目标</li>\n</ul>\n<p>综上，物理常识评估不只看视频是否视觉真实，还要检验：</p>\n<ul>\n<li>物体身份稳定</li>\n<li>交互符合因果与物质约束</li>\n<li>物体运动时序合理</li>\n</ul>\n<h3><strong>6.1.3 动作合理性</strong></h3>\n<p>世界动作模型评估中<strong>最独特、最关键</strong>的维度是<strong>动作合理性</strong>。 如果说视频质量问“看起来是否真实”，物理常识问“行为是否合理”，<strong>动作合理性</strong>则问：<strong>生成的视频是否保留足够的动作相关信息，支持控制推理与下游执行</strong>。</p>\n<p>代表性基准：</p>\n<ul>\n<li><strong>WorldSimBench</strong>：引入隐式操作评估，不只看视觉质量，更评估生成视频能否准确翻译成正确控制信号</li>\n<li><strong>Wow, wo, val!：提出逆动态模型（IDM）图灵测试</strong>，用IDM从生成视频反推动作序列，再在真实世界执行看成功率——很多视觉逼真的模型在此测试中几乎归零。</li>\n</ul>\n<p>这凸显出<strong>视觉逼真≠可执行机器人行为</strong>之间的巨大鸿沟，确立动作合理性是独立于外观与物理真实感的关键评估轴。</p>\n<p><img alt=\"\" src=\"https://pic4.zhimg.com/v2-b0d25d282391967bf5c93bcea759765f_1440w.jpg\" /></p>\n<h3><strong>6.2 如何评估动作策略？</strong></h3>\n<p>世界建模评估关注状态转移保真度，<strong>动作策略评估</strong>关注策略能力：模型在多样场景下生成精确、鲁棒、可泛化控制信号的能力。</p>\n<p>随着WAM从被动视频生成转向主动机器人控制，策略系统性评估成为核心研究焦点。</p>\n<p>现有基准分为五大类（按机器人形态与操作场景）：</p>\n<ol>\n<li><strong>通用操作</strong></li>\n<li><strong>双手与人形（Humanoid）操作</strong></li>\n<li><strong>移动操作</strong></li>\n<li><strong>接触与可变形物体操作</strong></li>\n<li><strong>真实机器人评估</strong></li>\n</ol>\n<h3><strong>6.2.1 通用操作基准</strong></h3>\n<p>通用操作是目前覆盖最广、最主流的评估方向，构成动作策略评估生态的主体。</p>\n<p>早期基准建立多任务操作评估框架：</p>\n<ul>\n<li>MetaWorld（50项）、RLBench（100项） 后续转向离线模仿学习：</li>\n<li>Robomimic、Franka Kitchen LIBERO 开创四维评估体系：泛化、长时任务、终身学习、语言理解，共130项任务。</li>\n</ul>\n<p>随着数据驱动范式成熟，基准在物体多样性、任务数、轨迹量上大幅扩展：</p>\n<ul>\n<li>ManiSkill 系列</li>\n<li>RoboCasa</li>\n<li>RoboVerse</li>\n</ul>\n<p>近年重点转向<strong>多维度泛化</strong>：</p>\n<ul>\n<li>COLOSSEUM、LIBERO-Plus、LIBERO-Pro、LIBERO-X、AGNOSTOS、GemBench</li>\n</ul>\n<p>从新摆放、新刚体，到铰接物体、长时任务组合，形成结构化难度递增。</p>\n<p>其他关键方向：</p>\n<ul>\n<li><strong>语言条件操作</strong>：VIMA-Bench、VLMbench、CALVIN</li>\n<li><strong>长时操作</strong>：GenManip、VLABench</li>\n<li><strong>Sim-to-Real</strong>：SimplerEnv、PolaRiS</li>\n<li><strong>记忆能力</strong>：RoboMME（时间、空间、物体、过程记忆）</li>\n</ul>\n<h3><strong>6.2.2 双手与人形（Humanoid）形态基准</strong></h3>\n<p>这类基准面向两类形态：</p>\n<ol>\n<li><strong>双手机器人</strong>：双臂协调操作</li>\n<li><strong>人形机器人（Humanoid）</strong>：全身运动能力</li>\n</ol>\n<p>它们的动作空间维度、运动约束、任务复杂度远高于单臂，对策略的<strong>协同规划能力</strong>要求极高。</p>\n<p>代表基准：</p>\n<ul>\n<li><strong>RoboTwin</strong>：基于 Aloha-AgileX 双臂平台</li>\n<li><strong>BiGym</strong>：基于 Unitree H1，40项家庭场景移动双手任务</li>\n<li><strong>HumanoidBench</strong>：Unitree H1 + Shadow-Hand 灵巧手 + 全身触觉，27项任务</li>\n<li><strong>HumanoidGen</strong>：支持泛化、长时、灵巧性评估，20万+轨迹</li>\n</ul>\n<h3><strong>6.2.3 移动操作基准</strong></h3>\n<p>移动操作同时考虑<strong>导航 + 操作</strong>，要求策略具备跨场景感知、规划、动态执行能力，综合挑战最高。</p>\n<p>代表基准：</p>\n<ul>\n<li><strong>ManipulaTHOR</strong>：Kinova Gen3 + 移动底盘</li>\n<li><strong>HomeRobot</strong>：Hello Robot Stretch，开放词汇移动操作</li>\n<li><strong>BEHAVIOR-1K</strong>：1000项日常活动，支持刚体、可变形、液体物理仿真</li>\n</ul>\n<h3><strong>6.2.4 接触与变形操作基准</strong></h3>\n<p>接触与变形操作打破传统刚体假设，要求策略感知并精确控制柔顺物体变形，是<strong>操作策略评估中最具挑战的方向</strong>，对物理建模要求最严苛。</p>\n<p>分为两类：</p>\n<ol>\n<li>\n<p><strong>宏观可变形物体操作</strong>：布料、液体、塑性材料</p>\n</li>\n<li>\n<p>SoftGym、PlasticineLab、DaXBench</p>\n</li>\n<li>\n<p><strong>接触感知精细操作</strong>：依赖触觉/力反馈</p>\n</li>\n<li>\n<p>TacSL、ManiFeel</p>\n</li>\n</ol>\n<p>标志着领域从<strong>视觉主导感知</strong>向<strong>视觉-触觉融合感知</strong>跃迁。</p>\n<h3><strong>6.2.5 真实设备基准</strong></h3>\n<p>仿真评估高效、可复现，但<strong>仿真-真实差距</strong>始终存在，难以准确预测真实部署性能。 因此部分工作直接在<strong>真实机器人平台</strong>构建基准，结论更具现实意义。</p>\n<p>代表基准：</p>\n<ul>\n<li><strong>RoboArena</strong>：真实设备开放评估，聚焦泛化</li>\n<li><strong>RoboChallenge</strong>：30项多任务真实场景，支持4平台横向对比</li>\n<li><strong>Maniparena</strong>：双平台、10812条真实轨迹，覆盖泛化、长时、多任务，是目前规模最大的真实设备操作基准。</li>\n</ul>\n<p><img alt=\"\" src=\"https://picx.zhimg.com/v2-889833baf1b86e810aa9911d4d6304df_1440w.jpg\" /></p>\n<h3><strong>7 开放挑战与机遇</strong></h3>\n<p>世界动作模型（WAM）的出现，标志着具身智能从<strong>token级预测</strong>迈向<strong>状态级预测</strong>的关键转变，但通往通用物理智能的道路依然碎片化。 本文认为，解决这些问题不只是增量式缩放，更需要<strong>重新思考世界模型的架构、接地与验证方式</strong>。</p>\n<p>以下是定义WAM下一阶段研究的核心挑战与机遇：</p>\n<h3><strong>7.1 架构耦合</strong></h3>\n<p>领域已经涌现大量耦合世界预测与动作生成的结构方案：</p>\n<ul>\n<li>级联流水线</li>\n<li>联合扩散主干</li>\n<li>离散token化</li>\n<li>隐式表征对齐</li>\n</ul>\n<p>但<strong>尚无在统一规模、数据、评估协议下的系统性对照研究</strong>。 目前仍不清楚：</p>\n<ul>\n<li>显式视觉预测对物理接地是否必需</li>\n<li>级联与联合架构在哪些控制场景存在本质差异</li>\n<li>每种耦合机制提供何种归纳偏置</li>\n</ul>\n<p>领域急需<strong>严格的消融实验与理论分析</strong>，从“架构跟风”走向<strong>原则化设计</strong>。</p>\n<p>一个有潜力方向：<strong>推理阶段是否真的需要显式像素空间预测</strong>？ 近期证据表明，某些WAM中世界建模的主要价值来自<strong>训练时的辅助梯度</strong>，而非推理时显式生成未来帧。</p>\n<p>部分框架证明：<strong>测试阶段移除未来预测头并不降低下游控制性能</strong>。</p>\n<p>这开启更高效范式： 不在像素空间重建高维未来观测，而是在<strong>联合学习的隐空间</strong>预测未来状态的抽象表征。</p>\n<p>这类<strong>仅隐空间预测</strong>方案（以JEPA为代表）可让模型专注环境因果不变量，忽略感知无关细节，实现更紧凑、物理接地更好的世界理解与动作执行耦合。</p>\n<h3><strong>7.2 多模态物理状态表征</strong></h3>\n<p>现有WAM几乎都只预测<strong>RGB视觉模态</strong>的未来世界状态。 但<strong>接触密集操作最关键的物理信息在像素空间基本不可见</strong>：</p>\n<ul>\n<li>触觉分布</li>\n<li>接触力</li>\n<li>声学信号</li>\n<li>材料柔顺性</li>\n</ul>\n<p>局限于视觉预测的世界模型，在最需要建模的物理交互上存在<strong>系统性盲区</strong>。 将WAM扩展到<strong>联合预测与推理触觉、力、本体感受未来状态</strong>，并研发支撑这类多模态世界建模的架构与数据集，是重要且基本未探索的前沿。</p>\n<p>更广泛地说，这要求重新定义WAM中的<strong>世界状态</strong>： 如果接触密集操作相关的状态不是像素数组，而是<strong>视觉、触觉、力的联合分布</strong>，那么多模态预测就不只是现有范式的扩展，而是<strong>重新定义世界模型预测什么、为了什么而预测</strong>。</p>\n<p>未来架构的重要能力是<strong>模态自适应预测</strong>：</p>\n<ul>\n<li>富传感器流可用时生成物理接地预测</li>\n<li>无多模态时优雅降级到纯视觉推理 而非把全模态当成固定架构要求。</li>\n</ul>\n<h3><strong>7.3 数据利用与混合设计</strong></h3>\n<p>多项工作证明：<strong>加入第一人称人类视频等非机器人数据源可显著提升下游操作性能</strong>。 但<strong>最优数据混合设计原则仍不明确</strong>：</p>\n<ul>\n<li>各数据源的规模、域差距对应的边际贡献是什么</li>\n<li>人类视频预训练的收益主要来自语义还是动态</li>\n<li>训练课程如何从互联网先验过渡到精确动作标注机器人演示</li>\n</ul>\n<p>解决这些问题，是WAM训练摆脱对昂贵机器人遥操作依赖的关键。</p>\n<p>本文认为，数据混合设计的核心挑战是<strong>解开非机器人数据在接地中的多重重叠作用</strong>： 从信息论角度而非经验调参，可帮助领域识别： 世界建模的哪些组件最适合从互联网视频学习，哪些必须从精确机器人演示学习。</p>\n<p>关键前沿：<strong>具身感知过滤机制</strong>——架构能从多样来源<strong>选择性提取通用物理规律</strong>，同时隔离抑制与目标机器人运动学不兼容的行为。</p>\n<h3><strong>7.4 长时规划与时间抽象</strong></h3>\n<p>WAM目前大多评估<strong>短时操作、单一交互上下文</strong>任务， 但真正的具身通用性需要<strong>扩展任务时域的持续推理</strong>。 现有架构在此领域面临复合挑战：</p>\n<ul>\n<li>世界模型预测的分布漂移随长程rollout累积</li>\n<li>缺乏重规划导致动作误差不断放大</li>\n<li>将完整长时任务轨迹表示为连续生成输出计算不可行、架构不支持</li>\n</ul>\n<p><strong>分层世界-动作建模的原则化框架</strong>： 将高层语义任务分解与低层物理预测统一在可学习架构中，仍是关键开放挑战。</p>\n<p>三条互补路径：</p>\n<ol>\n<li><strong>模块化分层</strong>：WAM作为低层物理执行器，由高层规划器（如VLM）分解复杂任务为语义子目标</li>\n<li><strong>内在分层WAM</strong>：能生成多分辨率未来预测，粗粒度状态转移用于战略规划，细粒度物理细节用于反应控制</li>\n<li><strong>时间上下文缩放</strong>：架构创新扩展WAM“记忆”，保持丰富历史状态信息，避免标准注意力的二次开销</li>\n</ol>\n<p>这些路径最终会收敛到统一端到端可学习分层，还是保持专用模块组合系统，是下一代WAM的基础问题。</p>\n<h3><strong>7.5 推理延迟与计算效率</strong></h3>\n<p>世界预测的集成带来严重<strong>延迟税</strong>，威胁闭环控制可行性。 尽管现代联合WAM通过算法加速、底层优化将推理推向7Hz左右，仍远落后于标准非生成式VLA策略的50Hz要求。</p>\n<p>根本矛盾：<strong>WAM丰富的物理预见性能否保留在实时电机控制的时间分辨率下？</strong></p>\n<p>背后悬而未决的理论问题：<strong>下游控制到底需要多高的预测保真度？</strong>如果性能远在全扩散合成质量之前就已饱和，目标就不该是“把高保真预测变快”， 而是<strong>识别给定任务的最小充分世界模型</strong>，并按需使用。</p>\n<p>这指向<strong>任务自适应预测保真度</strong>： 模型根据任务需求与误差容忍度，<strong>动态调整预测深度与分辨率</strong>， 在精度最重要的地方投入计算，其他地方用更粗近似。</p>\n<h3><strong>7.6 评估方法</strong></h3>\n<p>当前WAM评估存在<strong>严重解耦问题</strong>：</p>\n<ul>\n<li>世界建模通常用PSNR、FVD等像素级指标，只看视觉合理性，不管物理正确性——浮空、违反物理的视频仍能拿高分</li>\n<li>动作生成只看下游任务成功率</li>\n</ul>\n<p>这种割裂完全违背WAM的核心设计思想：<strong>世界预测与动作生成之间存在强因果关联</strong>。</p>\n<p>WAM生态最缺失的是：<strong>能量化想象未来与生成动作之间因果一致性的联合评估指标</strong>。 未来基准必须引入<strong>耦合指标</strong>，探查视觉预测与物理执行的因果链路，例如：</p>\n<ul>\n<li><strong>反事实一致性</strong>：动作如何适应想象未来的扰动</li>\n<li><strong>预见条件成功率</strong>：执行轨迹严格遵循生成视觉规划，而非依赖数据集伪相关</li>\n</ul>\n<p>评估模型“想象内容”与“物理执行”之间的<strong>意图对齐</strong>，对确保动作真正基于准确视觉预见、而非记忆数据集偏差至关重要。</p>\n<h3><strong>7.7 安全与可靠物理部署</strong></h3>\n<p>部署在物理环境的WAM带来<strong>超越传统VLA策略的安全考量</strong>： 一个自信想象错误物理未来的模型，可能执行长序列动作，真实后果难以中断恢复，可能伤害物体、环境、人员。</p>\n<p>同时，WAM的预测能力为<strong>安全强制执行</strong>提供原则性路径： 世界预测可在执行前，对照物理约束或保守不确定性估计做检查。</p>\n<p>实现这一点需要： 将<strong>安全验证集成到推理流水线</strong>，计算可负担、对分布偏移鲁棒， 这在WAM能力与部署野心持续扩张的背景下，仍是重大开放挑战。</p>\n<h3><strong>8 结论</strong></h3>\n<p>本综述首次对<strong>世界动作模型（WAM）</strong>领域做出系统性、批判性分析，将其定位为具身智能的关键前沿。</p>\n<p>本文建立清晰概念框架：</p>\n<ul>\n<li>正式定义WAM</li>\n<li>厘清与相关方法边界</li>\n<li>将多样架构归类为<strong>级联</strong>与<strong>联合</strong>范式</li>\n<li>在范式内进一步细分生成模态、条件机制、动作解码策略</li>\n</ul>\n<p>同时系统梳理：</p>\n<ul>\n<li>可扩展训练数据集</li>\n<li>覆盖视觉保真度、物理常识、动作合理性的多维度评估协议</li>\n</ul>\n<p>最后基于当前发展状态，提出<strong>关键开放挑战与未来方向</strong>，指导下一阶段发展。</p>\n<p>随着生成式世界建模与机器人技术持续融合，WAM研究潜力巨大。 希望本综述能澄清领域术语边界、勾画架构设计空间，为迈向<strong>通用具身智能体</strong>提供有意义的支撑。</p>\n<h3><strong>References</strong></h3>\n<p>参照原文</p>\n<hr />\n<p><strong>社群情况</strong></p>\n<p><strong>robotion talk 交流群（飞书）：</strong></p>\n<p>配合talk活动方便大家进入会议以及分享后的部分QA答疑。进群同学仅限researchers和算法同学；（填写问卷）</p>\n<p><strong>Robot实习生大群（飞书）</strong>:</p>\n<p>主要方便实习生同学提前了解交流公司信息、leader招人，日常技术交流。（问卷）</p>\n<p><strong>微信群</strong></p>\n<p><strong>Robot实习生交流群（已5群）：</strong>主要方便实习生同学提前了解交流公司信息、leader招人，日常技术交流。算法向，不合适的同学勿扰，拒绝猎头。</p>\n<p><strong>HF读者群（研究员）：</strong>主要是全职算法、高校老师。 无关勿扰。</p>\n<p><strong>HF读者群（从业者）：</strong>战略/产品/运营/商务同学，数据/硬件供应商等交流机会。</p>\n<p><strong>HF读者群（投资人）：</strong>投资人日常交流沟通</p>\n<p>v: t0414537</p>\n<hr />\n<p>欢迎“点赞”、“收藏”、“在看” 三连</p>\n<p>可添加微信交流（备注 姓名+研究方向/业务方向）</p>"
    }
  ],
  "graph": {
    "nodes": [
      {
        "id": "ddpg",
        "x": 100,
        "y": 80,
        "category": "foundation"
      },
      {
        "id": "trpo",
        "x": 100,
        "y": 120,
        "category": "foundation"
      },
      {
        "id": "ppo",
        "x": 200,
        "y": 120,
        "category": "foundation"
      },
      {
        "id": "sac",
        "x": 300,
        "y": 80,
        "category": "foundation"
      },
      {
        "id": "td3",
        "x": 300,
        "y": 40,
        "category": "foundation"
      },
      {
        "id": "domain_rand",
        "x": 200,
        "y": 160,
        "category": "sim2real"
      },
      {
        "id": "viral",
        "x": 900,
        "y": 140,
        "category": "sim2real"
      },
      {
        "id": "lfi_dr",
        "x": 900,
        "y": 180,
        "category": "sim2real"
      },
      {
        "id": "falcon",
        "x": 900,
        "y": 100,
        "category": "sim2real"
      },
      {
        "id": "hdmi",
        "x": 950,
        "y": 140,
        "category": "sim2real"
      },
      {
        "id": "lide",
        "x": 900,
        "y": 220,
        "category": "sim2real"
      },
      {
        "id": "bcq",
        "x": 400,
        "y": 240,
        "category": "offline_rl"
      },
      {
        "id": "cql",
        "x": 500,
        "y": 240,
        "category": "offline_rl"
      },
      {
        "id": "iql",
        "x": 600,
        "y": 240,
        "category": "offline_rl"
      },
      {
        "id": "td3bc",
        "x": 600,
        "y": 200,
        "category": "offline_rl"
      },
      {
        "id": "unifloral",
        "x": 800,
        "y": 240,
        "category": "offline_rl"
      },
      {
        "id": "cpql",
        "x": 900,
        "y": 260,
        "category": "offline_rl"
      },
      {
        "id": "safefql",
        "x": 900,
        "y": 300,
        "category": "offline_rl"
      },
      {
        "id": "gail",
        "x": 150,
        "y": 320,
        "category": "skill_hierarchical"
      },
      {
        "id": "option_critic",
        "x": 200,
        "y": 360,
        "category": "skill_hierarchical"
      },
      {
        "id": "feudal",
        "x": 200,
        "y": 400,
        "category": "skill_hierarchical"
      },
      {
        "id": "her",
        "x": 200,
        "y": 280,
        "category": "skill_hierarchical"
      },
      {
        "id": "diayn",
        "x": 300,
        "y": 320,
        "category": "skill_hierarchical"
      },
      {
        "id": "hiro",
        "x": 300,
        "y": 400,
        "category": "skill_hierarchical"
      },
      {
        "id": "skillrl",
        "x": 900,
        "y": 360,
        "category": "skill_hierarchical"
      },
      {
        "id": "metaworld_hrl",
        "x": 950,
        "y": 380,
        "category": "skill_hierarchical"
      },
      {
        "id": "hcc",
        "x": 950,
        "y": 340,
        "category": "skill_hierarchical"
      },
      {
        "id": "icm",
        "x": 200,
        "y": 480,
        "category": "reward_design"
      },
      {
        "id": "rnd",
        "x": 300,
        "y": 480,
        "category": "reward_design"
      },
      {
        "id": "lagea",
        "x": 900,
        "y": 460,
        "category": "reward_design"
      },
      {
        "id": "mrbt",
        "x": 950,
        "y": 460,
        "category": "reward_design"
      },
      {
        "id": "vsimr",
        "x": 800,
        "y": 480,
        "category": "reward_design"
      },
      {
        "id": "mbpo",
        "x": 400,
        "y": 560,
        "category": "world_model"
      },
      {
        "id": "dreamerv1",
        "x": 400,
        "y": 600,
        "category": "world_model"
      },
      {
        "id": "dreamerv2",
        "x": 500,
        "y": 600,
        "category": "world_model"
      },
      {
        "id": "dreamerv3",
        "x": 700,
        "y": 600,
        "category": "world_model"
      },
      {
        "id": "dreamdojo",
        "x": 900,
        "y": 580,
        "category": "world_model"
      },
      {
        "id": "adaworldpolicy",
        "x": 950,
        "y": 600,
        "category": "world_model"
      },
      {
        "id": "rwml",
        "x": 900,
        "y": 620,
        "category": "world_model"
      },
      {
        "id": "hy_embodied",
        "x": 900,
        "y": 540,
        "category": "world_model"
      }
    ],
    "edges": [
      {
        "from": "trpo",
        "to": "ppo",
        "label": "简化约束"
      },
      {
        "from": "ddpg",
        "to": "sac",
        "label": "最大熵"
      },
      {
        "from": "ddpg",
        "to": "td3",
        "label": "双Q网络"
      },
      {
        "from": "domain_rand",
        "to": "viral",
        "label": "视觉随机化"
      },
      {
        "from": "domain_rand",
        "to": "lfi_dr",
        "label": "参数推理"
      },
      {
        "from": "domain_rand",
        "to": "lide",
        "label": "规划引导"
      },
      {
        "from": "sac",
        "to": "falcon",
        "label": "力控制"
      },
      {
        "from": "viral",
        "to": "hdmi",
        "label": "视频学习"
      },
      {
        "from": "ddpg",
        "to": "bcq",
        "label": "约束动作"
      },
      {
        "from": "bcq",
        "to": "cql",
        "label": "保守估计"
      },
      {
        "from": "cql",
        "to": "iql",
        "label": "隐式策略"
      },
      {
        "from": "td3",
        "to": "td3bc",
        "label": "BC正则"
      },
      {
        "from": "cql",
        "to": "unifloral",
        "label": "统一协议"
      },
      {
        "from": "cql",
        "to": "cpql",
        "label": "Peng算子"
      },
      {
        "from": "iql",
        "to": "safefql",
        "label": "安全约束"
      },
      {
        "from": "option_critic",
        "to": "feudal",
        "label": "主从架构"
      },
      {
        "from": "feudal",
        "to": "hiro",
        "label": "目标修正"
      },
      {
        "from": "sac",
        "to": "diayn",
        "label": "技能发现"
      },
      {
        "from": "hiro",
        "to": "skillrl",
        "label": "技能库"
      },
      {
        "from": "skillrl",
        "to": "metaworld_hrl",
        "label": "技能迁移"
      },
      {
        "from": "skillrl",
        "to": "hcc",
        "label": "认知缓存"
      },
      {
        "from": "icm",
        "to": "rnd",
        "label": "随机蒸馏"
      },
      {
        "from": "rnd",
        "to": "lagea",
        "label": "VLM塑形"
      },
      {
        "from": "lagea",
        "to": "mrbt",
        "label": "逻辑验证"
      },
      {
        "from": "rnd",
        "to": "vsimr",
        "label": "LLM增强"
      },
      {
        "from": "sac",
        "to": "mbpo",
        "label": "模型rollout"
      },
      {
        "from": "mbpo",
        "to": "dreamerv1",
        "label": "隐空间"
      },
      {
        "from": "dreamerv1",
        "to": "dreamerv2",
        "label": "离散隐变量"
      },
      {
        "from": "dreamerv2",
        "to": "dreamerv3",
        "label": "symlog"
      },
      {
        "from": "dreamerv3",
        "to": "dreamdojo",
        "label": "视频预训练"
      },
      {
        "from": "dreamdojo",
        "to": "adaworldpolicy",
        "label": "流匹配"
      },
      {
        "from": "dreamerv3",
        "to": "rwml",
        "label": "LLM集成"
      },
      {
        "from": "dreamerv3",
        "to": "hy_embodied",
        "label": "策略蒸馏"
      }
    ],
    "milestones": [
      "ppo",
      "sac",
      "dreamerv3"
    ]
  },
  "algos": [
    {
      "id": "ddpg",
      "num": 1,
      "name": "DDPG",
      "fullName": "深度确定性策略梯度 (Deep Deterministic Policy Gradient)",
      "year": "2015",
      "org": "DeepMind",
      "parent": "—",
      "paperUrl": "https://arxiv.org/abs/1509.02971",
      "projectUrl": "",
      "category": "foundation",
      "motivation": "首次将DQN扩展至连续动作空间",
      "summary": "DDPG 将 DQN 的**经验回放**与**目标网络**思想引入 Actor-Critic 框架，结合**确定性策略梯度**定理，首次实现了在高维连续动作空间中稳定、高效的端到端深度强化学习。",
      "keyPoints": [
        "<strong>Actor-Critic 架构</strong>：Actor 网络 <span class=\"kb-math kb-math-inline\">\\mu(s|\\theta^\\mu)</span> 输出确定性动作，Critic 网络 <span class=\"kb-math kb-math-inline\">Q(s,a|\\theta^Q)</span> 估计动作价值函数",
        "<strong>经验回放缓冲区 (Replay Buffer)</strong>：存储 <span class=\"kb-math kb-math-inline\">(s_t, a_t, r_t, s_{t+1})</span> 转移元组，随机采样小批量训练，打破样本时序相关性",
        "<strong>目标网络 (Target Network)</strong>：Actor 和 Critic 各维护一个目标网络副本，通过软更新 <span class=\"kb-math kb-math-inline\">\\theta&#x27; \\leftarrow \\tau\\theta + (1-\\tau)\\theta&#x27;</span> 缓慢跟踪，稳定 TD 目标",
        "<strong>Ornstein-Uhlenbeck 噪声</strong>：为确定性策略添加时序相关的探索噪声，适合惯性物理控制任务",
        "<strong>批归一化 (Batch Normalization)</strong>：对网络各层输入归一化，解决不同物理量纲的状态特征尺度差异问题",
        "<strong>20+ MuJoCo 物理控制任务</strong>验证，包括 cartpole swing-up、灵巧操作、腿式运动等，且支持从原始像素端到端学习"
      ],
      "detail": "<h5>框架示意</h5>\n<p><img alt=\"DDPG 测试环境示例\" src=\"https://ar5iv.labs.arxiv.org/html/1509.02971/assets/x1.png\" />\n<em>图：DDPG 论文中使用的部分 MuJoCo 物理控制环境。从左到右：cartpole swing-up、reaching、grasp-and-move、puck-hitting。</em></p>\n<p><img alt=\"DDPG 各组件消融实验\" src=\"https://ar5iv.labs.arxiv.org/html/1509.02971/assets/x2.png\" />\n<em>图：不同 DPG 变体的性能曲线对比——原始 DPG（浅灰）、加入批归一化（浅灰）、加入目标网络（深灰）、完整 DDPG（彩色）。可以看到目标网络和批归一化对训练稳定性的关键作用。</em></p>\n<h5>算法伪代码</h5>\n<pre><code class=\"language-python\"># DDPG 算法核心流程\n随机初始化 Critic 网络 Q(s,a|θ^Q) 和 Actor 网络 μ(s|θ^μ)\n初始化目标网络: θ^Q' ← θ^Q, θ^μ' ← θ^μ\n初始化经验回放缓冲区 R\n\nfor episode = 1 to M:\n    初始化 Ornstein-Uhlenbeck 噪声过程 N\n    获取初始观测 s_1\n    for t = 1 to T:\n        # 选择动作（确定性策略 + 探索噪声）\n        a_t = μ(s_t|θ^μ) + N_t\n\n        # 执行动作，获取奖励和下一状态\n        r_t, s_{t+1} = env.step(a_t)\n\n        # 存入经验回放\n        R.store((s_t, a_t, r_t, s_{t+1}))\n\n        # 从 R 中随机采样 mini-batch (s_i, a_i, r_i, s_{i+1})\n        # 计算 TD 目标\n        y_i = r_i + γ · Q'(s_{i+1}, μ'(s_{i+1}|θ^μ')|θ^Q')\n\n        # 更新 Critic：最小化 L = (1/N) Σ (y_i - Q(s_i,a_i|θ^Q))²\n        update θ^Q by minimizing L\n\n        # 更新 Actor：沿策略梯度方向\n        ∇_{θ^μ} J ≈ (1/N) Σ ∇_a Q(s,a|θ^Q)|_{a=μ(s)} · ∇_{θ^μ} μ(s|θ^μ)\n\n        # 软更新目标网络\n        θ^Q' ← τ·θ^Q + (1-τ)·θ^Q'\n        θ^μ' ← τ·θ^μ + (1-τ)·θ^μ'\n</code></pre>\n<h5>动机与背景</h5>\n<p>DQN (Mnih et al., 2015) 在 Atari 游戏上取得了突破性成功，但其核心操作——对所有动作取 <span class=\"kb-math kb-math-inline\">\\arg\\max_a Q(s,a)</span>——要求动作空间是离散且低维的。然而，机器人控制、自动驾驶等真实物理任务天然具有<strong>连续高维动作空间</strong>（如关节力矩、电机电压）。简单地将连续空间离散化会遭遇<strong>维度灾难</strong>：一个 7 自由度机械臂即使每个关节仅 3 档离散化，动作空间也达到 <span class=\"kb-math kb-math-inline\">3^7 = 2187</span> 维。</p>\n<div class=\"key-point\">💡 <strong>关键洞察</strong>：DDPG 的核心思路是——既然无法在连续空间中枚举 <span class=\"kb-math kb-math-inline\">\\arg\\max</span>，不如直接用一个神经网络（Actor）来<strong>学习</strong>从状态到最优动作的映射 <span class=\"kb-math kb-math-inline\">\\mu(s)</span>，同时用另一个网络（Critic）来评估该动作的好坏。</div>\n<h5>核心机制：确定性策略梯度</h5>\n<p>DDPG 建立在 Silver et al. (2014) 提出的<strong>确定性策略梯度 (DPG)</strong> 定理之上。与随机策略 <span class=\"kb-math kb-math-inline\">\\pi(a|s)</span> 不同，确定性策略 <span class=\"kb-math kb-math-inline\">\\mu: \\mathcal{S} \\to \\mathcal{A}</span> 直接输出一个确定的动作值。DPG 定理证明，确定性策略的性能梯度为：</p>\n<div class=\"kb-math kb-math-display\">\\nabla_{\\theta^\\mu} J \\approx \\mathbb{E}_{s \\sim \\rho^\\beta}\\left[\\nabla_a Q(s,a|\\theta^Q)\\big|_{a=\\mu(s|\\theta^\\mu)} \\cdot \\nabla_{\\theta^\\mu} \\mu(s|\\theta^\\mu)\\right]</div>\n<p>这个梯度的直觉非常清晰：\n1. <strong><span class=\"kb-math kb-math-inline\">\\nabla_a Q(s,a)</span></strong>：Critic 告诉 Actor \"动作往哪个方向调整能提高 Q 值\"\n2. <strong><span class=\"kb-math kb-math-inline\">\\nabla_{\\theta^\\mu} \\mu(s)</span></strong>：Actor 通过链式法则将这个信号反向传播到自身参数</p>\n<div class=\"warn-box\">⚠️ <strong>注意</strong>：与随机策略梯度不同，确定性策略梯度<strong>不需要对动作空间积分</strong>，这使得它在高维连续动作空间中计算效率更高。</div>\n<h5>Critic 的训练：Bellman 方程与 TD 学习</h5>\n<p>Critic 网络通过最小化 TD 误差来逼近真实的动作价值函数。对于从经验回放中采样的转移 <span class=\"kb-math kb-math-inline\">(s_i, a_i, r_i, s_{i+1})</span>，TD 目标为：</p>\n<div class=\"kb-math kb-math-display\">y_i = r_i + \\gamma \\, Q&#x27;(s_{i+1}, \\mu&#x27;(s_{i+1}|\\theta^{\\mu&#x27;})|\\theta^{Q&#x27;})</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">Q&#x27;</span> 和 <span class=\"kb-math kb-math-inline\">\\mu&#x27;</span> 是<strong>目标网络</strong>。Critic 的损失函数为：</p>\n<div class=\"kb-math kb-math-display\">L = \\frac{1}{N}\\sum_i \\left(y_i - Q(s_i, a_i|\\theta^Q)\\right)^2</div>\n<h5>稳定训练的三大技巧</h5>\n<p><strong>1. 经验回放 (Experience Replay)</strong></p>\n<p>与 DQN 相同，DDPG 将所有交互经验 <span class=\"kb-math kb-math-inline\">(s, a, r, s&#x27;)</span> 存入一个有限大小的缓冲区，训练时随机采样小批量。这一机制：\n- 打破了在线学习中样本的时序相关性\n- 提高了数据利用效率（每条经验可被多次使用）\n- 使得训练过程更接近 i.i.d. 假设</p>\n<p><strong>2. 目标网络软更新 (Soft Target Update)</strong></p>\n<p>DQN 使用硬拷贝（每隔固定步数完全复制参数），而 DDPG 创新性地采用<strong>软更新</strong>：</p>\n<div class=\"kb-math kb-math-display\">\\theta&#x27; \\leftarrow \\tau\\theta + (1-\\tau)\\theta&#x27;, \\quad \\tau \\ll 1</div>\n<p>论文中 <span class=\"kb-math kb-math-inline\">\\tau = 0.001</span>。这意味着目标网络的参数缓慢跟踪主网络，避免了 TD 目标的剧烈波动，显著提升了训练稳定性。</p>\n<div class=\"key-point\">💡 <strong>关键</strong>：软更新是 DDPG 相比 DQN 的重要改进之一。硬拷贝会导致目标值在更新瞬间发生跳变，而软更新使目标值平滑变化，约束了优化景观。</div>\n<p><strong>3. 批归一化 (Batch Normalization)</strong></p>\n<p>不同物理任务的状态特征量纲差异巨大（如位置可能是米级，速度可能是弧度/秒级）。DDPG 在 Actor 和 Critic 网络的每一层输入前应用批归一化，将特征归一化到相似尺度，使得同一套超参数可以跨任务通用。</p>\n<h5>探索策略：Ornstein-Uhlenbeck 噪声</h5>\n<p>由于确定性策略本身不具备探索能力，DDPG 通过向动作添加噪声来实现探索：</p>\n<div class=\"kb-math kb-math-display\">a_t = \\mu(s_t|\\theta^\\mu) + \\mathcal{N}_t</div>\n<p>论文选择了 <strong>Ornstein-Uhlenbeck (OU) 过程</strong>作为噪声源。OU 过程生成的噪声具有<strong>时序相关性</strong>（均值回复特性），相比独立高斯噪声更适合物理控制任务——因为这些任务通常具有惯性，时序相关的探索能产生更有意义的动作序列。</p>\n<h5>与 DQN 的核心区别</h5>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>特性</th>\n<th>DQN</th>\n<th>DDPG</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>动作空间</td>\n<td>离散</td>\n<td>连续</td>\n</tr>\n<tr>\n<td>策略类型</td>\n<td>隐式（<span class=\"kb-math kb-math-inline\">\\arg\\max Q</span>）</td>\n<td>显式 Actor 网络</td>\n</tr>\n<tr>\n<td>目标网络更新</td>\n<td>硬拷贝（周期性）</td>\n<td>软更新（每步）</td>\n</tr>\n<tr>\n<td>探索方式</td>\n<td>ε-greedy</td>\n<td>OU 噪声</td>\n</tr>\n<tr>\n<td>网络数量</td>\n<td>1 个 Q 网络</td>\n<td>Actor + Critic 各 2 个（含目标）</td>\n</tr>\n</tbody>\n</table></div>\n<h5>实验验证</h5>\n<p><img alt=\"Q 值估计精度\" src=\"https://ar5iv.labs.arxiv.org/html/1509.02971/assets/x3.png\" />\n<em>图：估计 Q 值与实际回报的密度图。在简单任务（pendulum、cartpole）中 Q 值估计准确，复杂任务中存在一定高估但仍能学到有效策略。</em></p>\n<p>DDPG 在 20+ MuJoCo 物理控制任务上使用<strong>完全相同的网络结构和超参数</strong>取得了优异表现，部分任务甚至超越了拥有完整动力学模型的规划算法 (iLQG)。此外，DDPG 在多个任务中成功实现了从原始像素到控制信号的端到端学习。</p>",
      "quiz": {
        "q": "DDPG 中目标网络的软更新机制 θ' ← τθ + (1-τ)θ' 的主要作用是什么？",
        "options": [
          "加速 Actor 网络的收敛速度",
          "使 TD 目标缓慢变化，避免训练过程中目标值剧烈波动",
          "减少经验回放缓冲区的内存占用",
          "增强探索噪声的时序相关性"
        ],
        "answer": 1,
        "explain": "软更新通过极小的 τ（如 0.001）使目标网络参数缓慢跟踪主网络，从而让 TD 目标平滑变化，避免了硬拷贝导致的目标值跳变，显著提升训练稳定性。"
      }
    },
    {
      "id": "trpo",
      "num": 2,
      "name": "TRPO",
      "fullName": "信任域策略优化 (Trust Region Policy Optimization)",
      "year": "2015",
      "org": "UC Berkeley",
      "parent": "—",
      "paperUrl": "https://arxiv.org/abs/1502.05477",
      "projectUrl": "",
      "category": "foundation",
      "motivation": "KL散度约束保证策略单调改进",
      "summary": "TRPO 的核心目标是：KL散度约束保证策略单调改进。",
      "keyPoints": [
        "核心动机：KL散度约束保证策略单调改进",
        "代表机构：UC Berkeley"
      ],
      "detail": "<p>KL散度约束保证策略单调改进</p>"
    },
    {
      "id": "ppo",
      "num": 3,
      "name": "PPO",
      "fullName": "近端策略优化 (Proximal Policy Optimization)",
      "year": "2017",
      "org": "OpenAI",
      "parent": "trpo",
      "paperUrl": "https://arxiv.org/abs/1707.06347",
      "projectUrl": "",
      "category": "foundation",
      "motivation": "剪切目标函数简化信任域优化",
      "summary": "PPO 的核心目标是：剪切目标函数简化信任域优化。",
      "keyPoints": [
        "核心动机：剪切目标函数简化信任域优化",
        "演化来源：继承或改进自 trpo",
        "代表机构：OpenAI"
      ],
      "detail": "<p>剪切目标函数简化信任域优化</p>"
    },
    {
      "id": "sac",
      "num": 4,
      "name": "SAC",
      "fullName": "软演员-评论家 (Soft Actor-Critic)",
      "year": "2018",
      "org": "UC Berkeley",
      "parent": "ddpg",
      "paperUrl": "https://arxiv.org/abs/1801.01290",
      "projectUrl": "",
      "category": "foundation",
      "motivation": "最大熵框架提升探索与鲁棒性",
      "summary": "SAC 提出了基于最大熵强化学习框架的 off-policy actor-critic 算法，通过在策略优化目标中同时最大化累积奖励与策略熵，显著提升了连续控制任务中的探索能力、样本效率和训练稳定性。",
      "keyPoints": [
        "<strong>最大熵目标函数</strong>：在标准 RL 目标上增加策略熵项 <span class=\"kb-math kb-math-inline\">\\alpha \\mathcal{H}(\\pi(\\cdot|s))</span>，鼓励策略在完成任务的同时尽可能随机",
        "<strong>三类函数逼近器</strong>：Soft Q 网络 <span class=\"kb-math kb-math-inline\">Q_\\theta</span>（双份）、Soft 价值网络 <span class=\"kb-math kb-math-inline\">V_\\psi</span>、随机策略网络 <span class=\"kb-math kb-math-inline\">\\pi_\\phi</span>",
        "<strong>Soft Policy Iteration 理论保证</strong>：交替执行 Soft 策略评估与 Soft 策略改进，证明收敛到最优最大熵策略（Theorem 1）",
        "<strong>双 Q 网络</strong>：使用两个独立训练的 Q 函数取最小值，缓解 Q 值正偏差（借鉴 TD3/Double DQN）",
        "<strong>重参数化技巧</strong>：策略采样 <span class=\"kb-math kb-math-inline\">a = f_\\phi(\\epsilon; s)</span>，使策略梯度可通过 Q 网络反向传播",
        "<strong>目标网络 EMA 更新</strong>：<span class=\"kb-math kb-math-inline\">\\bar{\\psi} \\leftarrow \\tau \\psi + (1-\\tau)\\bar{\\psi}</span>，稳定训练",
        "<strong>Off-policy + 经验回放</strong>：从 replay buffer 采样更新，样本效率远超 on-policy 方法",
        "<strong>基准测试</strong>：在 MuJoCo 连续控制任务（Hopper、Walker2d、HalfCheetah、Ant、Humanoid）上全面超越 DDPG、PPO、TD3 等方法，且跨随机种子稳定性极强"
      ],
      "detail": "<h5>核心训练曲线</h5>\n<p><img alt=\"SAC 在连续控制基准上的训练曲线\" src=\"https://ar5iv.labs.arxiv.org/html/1801.01290/assets/x1.png\" />\n<img alt=\"SAC 训练曲线 - Walker2d\" src=\"https://ar5iv.labs.arxiv.org/html/1801.01290/assets/x2.png\" />\n<img alt=\"SAC 训练曲线 - HalfCheetah\" src=\"https://ar5iv.labs.arxiv.org/html/1801.01290/assets/x3.png\" />\n<img alt=\"SAC 训练曲线 - Ant\" src=\"https://ar5iv.labs.arxiv.org/html/1801.01290/assets/x4.png\" /></p>\n<p><em>图：SAC（黄色）在 Hopper、Walker2d、HalfCheetah、Ant 等连续控制基准上的训练曲线。SAC 在所有任务上表现一致，并在最具挑战性的任务中超越了 on-policy 和 off-policy 基线方法。</em></p>\n<h5>算法伪代码</h5>\n<pre><code>Algorithm 1: Soft Actor-Critic\n────────────────────────────────────\n初始化参数向量 ψ, ψ̄, θ₁, θ₂, ϕ\n\nfor each iteration do\n    for each environment step do\n        aₜ ~ πϕ(aₜ|sₜ)                    # 从随机策略采样动作\n        sₜ₊₁ ~ p(sₜ₊₁|sₜ, aₜ)             # 环境转移\n        D ← D ∪ {(sₜ, aₜ, r(sₜ,aₜ), sₜ₊₁)}  # 存入回放缓冲区\n    end for\n\n    for each gradient step do\n        ψ ← ψ − λ_V ∇̂_ψ J_V(ψ)           # 更新价值网络\n        θᵢ ← θᵢ − λ_Q ∇̂_θᵢ J_Q(θᵢ)       # 更新双 Q 网络 (i∈{1,2})\n        ϕ ← ϕ − λ_π ∇̂_ϕ J_π(ϕ)           # 更新策略网络\n        ψ̄ ← τψ + (1−τ)ψ̄                  # EMA 更新目标网络\n    end for\nend for\n</code></pre>\n<h5>动机与背景</h5>\n<p>传统无模型深度强化学习面临两大核心挑战：<strong>样本效率低</strong>和<strong>超参数敏感</strong>。On-policy 方法（如 TRPO、PPO、A3C）每次梯度更新都需要采集新样本，代价极高；off-policy 方法（如 DDPG）虽然可以复用历史数据，但在连续动作空间中使用确定性策略，容易陷入局部最优且训练不稳定。</p>\n<p>SAC 的核心动机是引入<strong>最大熵强化学习框架</strong>（Maximum Entropy RL），在策略优化目标中同时最大化累积奖励和策略的熵。这一设计的直觉是：在完成任务的前提下，策略应当尽可能\"随机\"——这不仅促进了更充分的探索，还使策略能够捕获多种近优行为模式，提升了对环境扰动的鲁棒性。</p>\n<h5>最大熵目标函数</h5>\n<p>SAC 的核心优化目标为：</p>\n<div class=\"kb-math kb-math-display\">J(\\pi) = \\sum_{t=0}^{T} \\mathbb{E}_{(s_t, a_t) \\sim \\rho_\\pi} \\left[ r(s_t, a_t) + \\alpha \\mathcal{H}(\\pi(\\cdot|s_t)) \\right]</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">\\alpha</span> 为温度参数，控制熵项相对于奖励的重要性。当 <span class=\"kb-math kb-math-inline\">\\alpha \\to 0</span> 时退化为标准 RL 目标。熵项 <span class=\"kb-math kb-math-inline\">\\mathcal{H}(\\pi(\\cdot|s)) = -\\mathbb{E}[\\log \\pi(a|s)]</span> 鼓励策略输出更均匀的动作分布。</p>\n<div class=\"key-point\">💡 <strong>关键直觉</strong>：最大熵目标使策略在多个同样好的动作之间分配概率，而非贪婪地选择单一动作。这带来三个好处：(1) 更广泛的探索；(2) 捕获多模态行为；(3) 对环境变化更鲁棒。</div>\n<h5>Soft Bellman Backup 与策略评估</h5>\n<p>在最大熵框架下，标准 Bellman 方程被推广为 <strong>Soft Bellman Backup</strong>：</p>\n<div class=\"kb-math kb-math-display\">\\mathcal{T}^\\pi Q(s_t, a_t) \\triangleq r(s_t, a_t) + \\gamma \\mathbb{E}_{s_{t+1} \\sim p} \\left[ V(s_{t+1}) \\right]</div>\n<p>其中 Soft 价值函数定义为：</p>\n<div class=\"kb-math kb-math-display\">V(s_t) = \\mathbb{E}_{a_t \\sim \\pi} \\left[ Q(s_t, a_t) - \\log \\pi(a_t|s_t) \\right]</div>\n<p>注意与标准 Bellman 方程的关键区别：价值函数中包含了策略的对数概率项 <span class=\"kb-math kb-math-inline\">-\\log \\pi(a|s)</span>，这正是熵奖励的体现。论文证明（Lemma 1），反复应用 Soft Bellman Backup 算子 <span class=\"kb-math kb-math-inline\">\\mathcal{T}^\\pi</span> 将收敛到策略 <span class=\"kb-math kb-math-inline\">\\pi</span> 的真实 Soft Q 值。</p>\n<h5>Soft 策略改进</h5>\n<p>在策略改进步骤中，新策略通过最小化与指数化 Q 函数之间的 KL 散度获得：</p>\n<div class=\"kb-math kb-math-display\">\\pi_{\\text{new}} = \\arg\\min_{\\pi&#x27; \\in \\Pi} D_{\\text{KL}} \\left( \\pi&#x27;(\\cdot|s_t) \\;\\middle\\|\\; \\frac{\\exp(Q^{\\pi_{\\text{old}}}(s_t, \\cdot))}{Z^{\\pi_{\\text{old}}}(s_t)} \\right)</div>\n<p>论文证明（Lemma 2），这一更新保证新策略的 Soft Q 值不低于旧策略，即 <span class=\"kb-math kb-math-inline\">Q^{\\pi_{\\text{new}}}(s, a) \\geq Q^{\\pi_{\\text{old}}}(s, a)</span>。交替执行策略评估和策略改进（Theorem 1），算法收敛到策略类 <span class=\"kb-math kb-math-inline\">\\Pi</span> 中的最优最大熵策略。</p>\n<div class=\"warn-box\">⚠️ <strong>注意</strong>：配分函数 <span class=\"kb-math kb-math-inline\">Z^{\\pi_{\\text{old}}}(s_t)</span> 虽然不可解析计算，但它不依赖于新策略参数 <span class=\"kb-math kb-math-inline\">\\phi</span>，因此在梯度计算中可以忽略。</div>\n<h5>实用算法：三网络协同训练</h5>\n<p>将理论框架实例化为深度学习算法，SAC 使用三类参数化函数逼近器：</p>\n<p><strong>1. Soft 价值网络 <span class=\"kb-math kb-math-inline\">V_\\psi</span></strong>：通过最小化残差的平方来训练：</p>\n<div class=\"kb-math kb-math-display\">J_V(\\psi) = \\mathbb{E}_{s_t \\sim \\mathcal{D}} \\left[ \\frac{1}{2} \\left( V_\\psi(s_t) - \\mathbb{E}_{a_t \\sim \\pi_\\phi} [Q_\\theta(s_t, a_t) - \\log \\pi_\\phi(a_t|s_t)] \\right)^2 \\right]</div>\n<p><strong>2. Soft Q 网络 <span class=\"kb-math kb-math-inline\">Q_{\\theta_i}</span>（双份）</strong>：通过最小化 Soft Bellman 残差训练，使用目标价值网络 <span class=\"kb-math kb-math-inline\">V_{\\bar{\\psi}}</span> 计算目标值：</p>\n<div class=\"kb-math kb-math-display\">J_Q(\\theta_i) = \\mathbb{E}_{(s_t, a_t) \\sim \\mathcal{D}} \\left[ \\frac{1}{2} \\left( Q_{\\theta_i}(s_t, a_t) - r(s_t, a_t) - \\gamma V_{\\bar{\\psi}}(s_{t+1}) \\right)^2 \\right]</div>\n<p><strong>3. 策略网络 <span class=\"kb-math kb-math-inline\">\\pi_\\phi</span></strong>：通过最小化 KL 散度训练，等价于最大化：</p>\n<div class=\"kb-math kb-math-display\">J_\\pi(\\phi) = \\mathbb{E}_{s_t \\sim \\mathcal{D}} \\left[ D_{\\text{KL}} \\left( \\pi_\\phi(\\cdot|s_t) \\;\\middle\\|\\; \\frac{\\exp(Q_\\theta(s_t, \\cdot))}{Z_\\theta(s_t)} \\right) \\right]</div>\n<p>策略使用<strong>重参数化技巧</strong>：动作通过 <span class=\"kb-math kb-math-inline\">a_t = f_\\phi(\\epsilon_t; s_t)</span> 生成（其中 <span class=\"kb-math kb-math-inline\">\\epsilon_t</span> 为标准正态噪声），使梯度可以通过 Q 网络反向传播到策略参数。具体地，策略输出高斯分布的均值和对数标准差，动作通过 squashing function（tanh）映射到有界空间。</p>\n<h5>与 DDPG/TD3 的关键区别</h5>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>特性</th>\n<th>DDPG</th>\n<th>TD3</th>\n<th>SAC</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>策略类型</td>\n<td>确定性</td>\n<td>确定性</td>\n<td><strong>随机性</strong></td>\n</tr>\n<tr>\n<td>探索方式</td>\n<td>外部噪声（OU/Gaussian）</td>\n<td>外部噪声</td>\n<td><strong>策略熵（内在）</strong></td>\n</tr>\n<tr>\n<td>Q 网络数量</td>\n<td>1</td>\n<td>2</td>\n<td><strong>2</strong></td>\n</tr>\n<tr>\n<td>目标函数</td>\n<td>标准 RL</td>\n<td>标准 RL</td>\n<td><strong>最大熵 RL</strong></td>\n</tr>\n<tr>\n<td>价值网络</td>\n<td>无独立 V</td>\n<td>无独立 V</td>\n<td><strong>有独立 V</strong></td>\n</tr>\n<tr>\n<td>训练稳定性</td>\n<td>差</td>\n<td>较好</td>\n<td><strong>最好</strong></td>\n</tr>\n</tbody>\n</table></div>\n<p>SAC 相比 DDPG 的核心改进在于：(1) 使用随机策略替代确定性策略，探索不再依赖外部噪声；(2) 最大熵目标提供了内在的探索驱动力；(3) 双 Q 网络 + 独立价值网络的组合使训练更加稳定。</p>\n<h5>实验亮点</h5>\n<p>SAC 在 OpenAI Gym 的 MuJoCo 连续控制基准上进行了全面评估，包括 Hopper-v1、Walker2d-v1、HalfCheetah-v1、Ant-v1 和 21 维 Humanoid 等任务。实验结果表明：</p>\n<ol>\n<li><strong>性能</strong>：SAC 在所有任务上均达到或超越当时的 SOTA，尤其在高维 Humanoid 任务上优势显著</li>\n<li><strong>稳定性</strong>：不同随机种子下的性能方差极小，远优于 DDPG 等 off-policy 方法</li>\n<li><strong>消融实验</strong>：验证了双 Q 网络、独立价值网络、随机策略等组件各自的贡献</li>\n</ol>",
      "quiz": {
        "q": "SAC 在标准 RL 目标函数基础上增加了什么项来改善探索？",
        "options": [
          "动作空间的 L2 正则化项",
          "策略熵（entropy）最大化项",
          "KL 散度惩罚项（约束新旧策略距离）",
          "好奇心驱动的内在奖励项"
        ],
        "answer": 1,
        "explain": "SAC 的核心创新是在目标函数中加入策略熵项 αH(π(·|s))，鼓励策略在完成任务的同时保持随机性，从而实现更充分的探索和更鲁棒的行为。"
      }
    },
    {
      "id": "td3",
      "num": 5,
      "name": "TD3",
      "fullName": "双延迟深度确定性策略梯度 (Twin Delayed DDPG)",
      "year": "2018",
      "org": "McGill",
      "parent": "ddpg",
      "paperUrl": "https://arxiv.org/abs/1802.09477",
      "projectUrl": "",
      "category": "foundation",
      "motivation": "双Q网络抑制值函数过估计",
      "summary": "TD3 针对 Actor-Critic 方法中函数逼近误差导致的 Q 值过估计问题，提出了**截断双 Q 学习、延迟策略更新和目标策略平滑**三项关键技术，在连续控制任务上大幅超越 DDPG 等基线，成为 off-policy 连续控制的标准算法之一。",
      "keyPoints": [
        "<strong>截断双 Q 学习 (Clipped Double Q-learning)</strong>：维护两个独立的 Critic 网络，取二者 Q 值估计的<strong>最小值</strong>作为目标值，有效抑制过估计偏差",
        "<strong>延迟策略更新 (Delayed Policy Updates)</strong>：Critic 每更新 <span class=\"kb-math kb-math-inline\">d</span> 次（默认 <span class=\"kb-math kb-math-inline\">d=2</span>），Actor 才更新一次，确保 Critic 收敛后再指导策略",
        "<strong>目标策略平滑 (Target Policy Smoothing)</strong>：在计算目标 Q 值时，向目标动作添加截断高斯噪声，起到值函数正则化的作用，防止策略利用 Q 函数的局部峰值",
        "<strong>基于 DDPG 框架</strong>：继承确定性策略梯度 + 经验回放 + 目标网络的 off-policy 架构",
        "<strong>在 OpenAI Gym MuJoCo 7 个连续控制任务上全面超越 DDPG、SAC（早期版本）等方法</strong>"
      ],
      "detail": "<h5>核心示意图</h5>\n<p><img alt=\"TD3 过估计偏差分析\" src=\"https://ar5iv.labs.arxiv.org/html/1802.09477/assets/x1.png\" />\n<em>图 1：DDPG 在 Hopper-v1 上的训练过程中，估计 Q 值（蓝色）持续高于真实回报（橙色），展示了 Actor-Critic 方法中严重的过估计现象。TD3 的核心动机即消除此偏差。</em></p>\n<p><img alt=\"TD3 与基线方法的学习曲线对比\" src=\"https://ar5iv.labs.arxiv.org/html/1802.09477/assets/x5.png\" />\n<em>图 2：TD3 在多个 MuJoCo 连续控制环境上的学习曲线对比，显著优于 DDPG、SAC、PPO 等方法。</em></p>\n<h5>算法伪代码</h5>\n<pre><code class=\"language-python\"># TD3 算法伪代码\n# 初始化\nQ_θ1, Q_θ2 = init_critics()        # 两个 Critic 网络\nπ_φ = init_actor()                   # Actor 网络\nQ_θ1', Q_θ2', π_φ' = copy_targets() # 对应的目标网络\nB = ReplayBuffer()\n\nfor t in range(T_max):\n    # 1. 环境交互：带探索噪声\n    a = π_φ(s) + ε,  ε ~ N(0, σ_explore)\n    s', r, done = env.step(a)\n    B.add(s, a, r, s', done)\n\n    # 2. 采样 mini-batch\n    (s, a, r, s', d) = B.sample(N)\n\n    # 3. 计算目标值（目标策略平滑 + 截断双 Q）\n    ã = π_φ'(s') + clip(N(0, σ_smooth), -c, c)   # 目标动作 + 截断噪声\n    y = r + γ * (1-d) * min(Q_θ1'(s', ã), Q_θ2'(s', ã))  # 取最小值\n\n    # 4. 更新两个 Critic\n    loss_critic = MSE(Q_θ1(s,a), y) + MSE(Q_θ2(s,a), y)\n    update(θ1, θ2, loss_critic)\n\n    # 5. 延迟策略更新（每 d 步更新一次 Actor 和目标网络）\n    if t % d == 0:\n        loss_actor = -mean(Q_θ1(s, π_φ(s)))   # 仅用 Q_θ1 指导策略\n        update(φ, loss_actor)\n        # 软更新目标网络\n        θ1' ← τ·θ1 + (1-τ)·θ1'\n        θ2' ← τ·θ2 + (1-τ)·θ2'\n        φ'  ← τ·φ  + (1-τ)·φ'\n</code></pre>\n<h5>动机与背景：Actor-Critic 中的过估计危机</h5>\n<p>在离散动作空间中，Q-learning 的过估计问题已被广泛研究——由于 <span class=\"kb-math kb-math-inline\">\\max</span> 操作对含噪声的 Q 值取最大，会系统性地高估真实值。Double DQN 通过解耦动作选择与值评估来缓解此问题。然而，在连续动作空间的 Actor-Critic 框架中，这一问题同样严重却长期被忽视。</p>\n<p>DDPG 中，Actor 通过梯度上升最大化 Critic 的 Q 值输出来更新策略。如果 Critic 存在过估计，Actor 就会被\"欺骗\"，倾向于选择那些被错误高估的动作。更糟糕的是，这种偏差通过时序差分 (TD) 的自举机制不断累积：</p>\n<div class=\"kb-math kb-math-display\">Q_{\\theta}(s, a) \\leftarrow r + \\gamma Q_{\\theta&#x27;}(s&#x27;, \\pi_{\\phi&#x27;}(s&#x27;))</div>\n<p>每次更新都使用了下一状态的估计值，误差会像滚雪球一样逐步放大。论文通过实验证实（如图 1），DDPG 的 Q 值估计在训练过程中会严重偏离真实回报，最终导致策略性能崩溃。</p>\n<div class=\"key-point\">💡 <strong>关键洞察</strong>：Double DQN 的思路在 Actor-Critic 中直接套用效果不佳。因为 Actor-Critic 的策略更新缓慢，当前网络和目标网络的 Q 值估计过于相似，无法真正解耦以消除偏差。</div>\n<h5>核心机制一：截断双 Q 学习 (Clipped Double Q-learning)</h5>\n<p>TD3 维护两个独立参数化的 Critic 网络 <span class=\"kb-math kb-math-inline\">Q_{\\theta_1}</span> 和 <span class=\"kb-math kb-math-inline\">Q_{\\theta_2}</span>，在计算 TD 目标时取二者的<strong>最小值</strong>：</p>\n<div class=\"kb-math kb-math-display\">y = r + \\gamma \\min_{i=1,2} Q_{\\theta&#x27;_i}(s&#x27;, \\pi_{\\phi&#x27;}(s&#x27;))</div>\n<p><strong>为什么取最小值而非均值？</strong> 取均值虽然能降低方差，但仍可能产生过估计。取最小值则提供了一个<strong>近似上界</strong>——即便某个 Critic 过估计了，另一个较低的估计也能将其拉回。这种策略倾向于产生轻微的<strong>低估</strong>，而低估在实践中远比过估计安全：低估的动作会被策略自然回避，不会像过估计那样引发正反馈循环。</p>\n<p>两个 Critic 使用相同的目标值 <span class=\"kb-math kb-math-inline\">y</span> 独立训练，损失函数为：</p>\n<div class=\"kb-math kb-math-display\">L(\\theta_i) = \\mathbb{E}\\left[(y - Q_{\\theta_i}(s, a))^2\\right], \\quad i = 1, 2</div>\n<div class=\"warn-box\">⚠️ <strong>注意</strong>：Actor 的更新仅依赖 <span class=\"kb-math kb-math-inline\">Q_{\\theta_1}</span>（而非两个 Critic 的组合），避免引入额外的耦合。</div>\n<h5>核心机制二：延迟策略更新 (Delayed Policy Updates)</h5>\n<p>传统 Actor-Critic 方法中，Actor 和 Critic 每步同时更新。但如果 Critic 尚未收敛，Actor 就会基于不准确的值函数更新策略，进而产生的新数据又反过来干扰 Critic 的学习——形成恶性循环。</p>\n<p>TD3 的解决方案极为简洁：<strong>每 <span class=\"kb-math kb-math-inline\">d</span> 次 Critic 更新才执行一次 Actor 更新</strong>（论文中 <span class=\"kb-math kb-math-inline\">d=2</span>）。这给了 Critic 足够的时间在当前策略下收敛，使得 Actor 获得更可靠的梯度信号。</p>\n<p>Actor 的更新遵循确定性策略梯度定理：</p>\n<div class=\"kb-math kb-math-display\">\\nabla_\\phi J(\\phi) = \\mathbb{E}_{s \\sim \\mathcal{B}}\\left[\\nabla_a Q_{\\theta_1}(s, a)\\big|_{a=\\pi_\\phi(s)} \\cdot \\nabla_\\phi \\pi_\\phi(s)\\right]</div>\n<p>目标网络的软更新也仅在 Actor 更新时执行：</p>\n<div class=\"kb-math kb-math-display\">\\theta&#x27;_i \\leftarrow \\tau \\theta_i + (1 - \\tau)\\theta&#x27;_i, \\quad \\phi&#x27; \\leftarrow \\tau \\phi + (1 - \\tau)\\phi&#x27;</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">\\tau</span> 为软更新系数（论文中 <span class=\"kb-math kb-math-inline\">\\tau = 0.005</span>）。</p>\n<h5>核心机制三：目标策略平滑 (Target Policy Smoothing)</h5>\n<p>确定性策略的一个固有问题是：Critic 可能在某些动作处形成尖锐的峰值（局部过拟合），而确定性策略恰好会精确地利用这些峰值，导致 Q 值估计不稳定。</p>\n<p>TD3 借鉴了期望 SARSA 的思想，在计算目标 Q 值时向目标动作注入<strong>截断高斯噪声</strong>：</p>\n<div class=\"kb-math kb-math-display\">\\tilde{a} = \\pi_{\\phi&#x27;}(s&#x27;) + \\epsilon, \\quad \\epsilon \\sim \\text{clip}(\\mathcal{N}(0, \\sigma), -c, c)</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">\\sigma</span> 为噪声标准差，<span class=\"kb-math kb-math-inline\">c</span> 为截断范围（论文中 <span class=\"kb-math kb-math-inline\">\\sigma=0.2, c=0.5</span>）。这等价于对 Q 值在动作空间的局部邻域内做平滑，使得策略不会过度依赖 Q 函数的局部尖峰。截断操作确保噪声不会将动作推出有效范围。</p>\n<div class=\"key-point\">💡 <strong>直觉理解</strong>：如果一个动作只在精确的某个点上 Q 值很高，但其邻域 Q 值很低，那么加噪声后的平均 Q 值就会降低，策略不会被这种\"虚假峰值\"误导。</div>\n<h5>与 DDPG 的关键区别总结</h5>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>特性</th>\n<th>DDPG</th>\n<th>TD3</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>Critic 数量</td>\n<td>1 个</td>\n<td><strong>2 个</strong>（取 min）</td>\n</tr>\n<tr>\n<td>策略更新频率</td>\n<td>每步更新</td>\n<td><strong>每 <span class=\"kb-math kb-math-inline\">d</span> 步更新一次</strong></td>\n</tr>\n<tr>\n<td>目标动作噪声</td>\n<td>无</td>\n<td><strong>截断高斯噪声</strong></td>\n</tr>\n<tr>\n<td>过估计控制</td>\n<td>无显式机制</td>\n<td><strong>Clipped Double Q</strong></td>\n</tr>\n<tr>\n<td>探索噪声</td>\n<td>Ornstein-Uhlenbeck</td>\n<td><strong>简单高斯噪声</strong></td>\n</tr>\n</tbody>\n</table></div>\n<h5>默认超参数</h5>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>参数</th>\n<th>值</th>\n<th>说明</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td><span class=\"kb-math kb-math-inline\">\\tau</span></td>\n<td>0.005</td>\n<td>目标网络软更新系数</td>\n</tr>\n<tr>\n<td><span class=\"kb-math kb-math-inline\">d</span></td>\n<td>2</td>\n<td>策略延迟更新间隔</td>\n</tr>\n<tr>\n<td><span class=\"kb-math kb-math-inline\">\\sigma_{\\text{smooth}}</span></td>\n<td>0.2</td>\n<td>目标策略平滑噪声标准差</td>\n</tr>\n<tr>\n<td><span class=\"kb-math kb-math-inline\">c</span></td>\n<td>0.5</td>\n<td>噪声截断范围</td>\n</tr>\n<tr>\n<td><span class=\"kb-math kb-math-inline\">\\gamma</span></td>\n<td>0.99</td>\n<td>折扣因子</td>\n</tr>\n<tr>\n<td>batch size</td>\n<td>256</td>\n<td>小批量大小</td>\n</tr>\n<tr>\n<td>学习率</td>\n<td>3e-4</td>\n<td>Actor 和 Critic 均使用 Adam</td>\n</tr>\n</tbody>\n</table></div>",
      "quiz": {
        "q": "TD3 中使用两个 Critic 网络并取最小值的主要目的是什么？",
        "options": [
          "增加模型容量以拟合更复杂的值函数",
          "通过集成学习降低值函数的方差",
          "抑制 Q 值的过估计偏差，提供近似值上界",
          "加速 Critic 网络的收敛速度"
        ],
        "answer": 2,
        "explain": "取两个独立 Critic 的最小值可以有效抑制过估计偏差。即使其中一个 Critic 过估计，较低的那个估计也能将目标值拉回，倾向于产生轻微低估而非危险的过估计。"
      }
    },
    {
      "id": "domain_rand",
      "num": 6,
      "name": "Domain Randomization",
      "fullName": "域随机化 (Domain Randomization)",
      "year": "2017",
      "org": "OpenAI",
      "parent": "—",
      "paperUrl": "https://arxiv.org/abs/1703.06907",
      "projectUrl": "",
      "category": "sim2real",
      "motivation": "仿真参数随机化实现零样本迁移",
      "summary": "Domain Randomization 提出在仿真器中对纹理、光照、相机位姿和干扰物等视觉参数进行大规模随机化，使得仅在合成数据上训练的目标检测网络能够零样本迁移到真实世界，在物体定位任务上达到 1.5 cm 精度并成功完成机器人抓取。",
      "keyPoints": [
        "<strong>零样本 Sim-to-Real 迁移</strong>：完全不使用真实图像数据，仅依赖仿真渲染的随机化图像训练目标检测器，即可在真实场景中工作",
        "<strong>多维度域随机化</strong>：同时随机化纹理（桌面/地板/天空盒/物体）、光照（数量/位置/颜色）、相机（位置/朝向/FOV）、物体位姿和干扰物（0-10 个随机几何体）",
        "<strong>VGG-16 回归架构</strong>：基于 VGG-16 提取特征，接全连接层直接回归物体的 <span class=\"kb-math kb-math-inline\">(x, y, z)</span> 三维坐标",
        "<strong>纹理数量是关键因素</strong>：消融实验表明纹理种类超过 1000 时性能显著提升，此时甚至不需要 ImageNet 预训练",
        "<strong>干扰物对鲁棒性至关重要</strong>：训练时加入随机干扰物体，使模型在真实杂乱场景中仍能准确定位",
        "<strong>端到端抓取验证</strong>：在 Fetch 机器人上实现了 76.6% 的杂乱场景抓取成功率，全部视觉能力来自仿真训练"
      ],
      "detail": "<h5>方法总览</h5>\n<p><img alt=\"Domain Randomization 方法总览\" src=\"https://ar5iv.labs.arxiv.org/html/1703.06907/assets/x1.png\" />\n<em>图 1：Domain Randomization 方法示意。在仿真中对场景进行大规模随机化渲染（左），训练目标检测器后直接部署到真实世界（右）。核心思想是让真实世界成为随机化训练分布中的\"普通一员\"。</em></p>\n<h5>核心思想：让真实世界变得\"不特殊\"</h5>\n<p>Domain Randomization 的核心直觉非常优雅：<strong>如果仿真训练数据的视觉多样性足够大，那么真实世界的外观只不过是这个巨大分布中的又一个采样点</strong>。模型被迫学习对视觉外观变化不变的特征表示，从而自然地泛化到真实场景。</p>\n<div class=\"key-point\">💡 <strong>关键洞察</strong>：与传统 sim-to-real 方法追求\"逼真仿真\"不同，Domain Randomization 反其道而行之——故意让仿真场景看起来\"不真实但多样\"，通过覆盖足够大的外观空间来包含真实世界。</div>\n<h5>模型架构</h5>\n<p><img alt=\"VGG-16 目标检测架构\" src=\"https://ar5iv.labs.arxiv.org/html/1703.06907/assets/x2.png\" />\n<em>图 2：基于 VGG-16 的目标定位网络架构。卷积特征提取后接全连接层，直接回归物体的三维坐标。</em></p>\n<p>网络架构基于 VGG-16，具体设计如下：</p>\n<ol>\n<li><strong>特征提取</strong>：使用 VGG-16 的卷积层（可选 ImageNet 预训练权重）</li>\n<li><strong>回归头</strong>：在 VGG-16 的 <code>pool5</code> 层后接两个全连接层（分别为 4096 和 4096 维），最终输出 3 维向量 <span class=\"kb-math kb-math-inline\">(x, y, z)</span></li>\n<li><strong>损失函数</strong>：采用 L2 损失直接回归物体的三维笛卡尔坐标</li>\n</ol>\n<div class=\"kb-math kb-math-display\">\\mathcal{L} = \\| \\hat{\\mathbf{p}} - \\mathbf{p}^* \\|_2^2</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">\\hat{\\mathbf{p}} = (\\hat{x}, \\hat{y}, \\hat{z})</span> 为网络预测坐标，<span class=\"kb-math kb-math-inline\">\\mathbf{p}^* = (x^*, y^*, z^*)</span> 为真实坐标。</p>\n<h5>随机化参数空间</h5>\n<p>Domain Randomization 的核心在于对仿真渲染的多个维度同时进行随机化。每次渲染一张训练图像时，以下参数均从均匀分布中独立采样：</p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th style=\"text-align: left;\">随机化维度</th>\n<th style=\"text-align: left;\">具体参数</th>\n<th style=\"text-align: left;\">采样范围</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td style=\"text-align: left;\"><strong>纹理</strong></td>\n<td style=\"text-align: left;\">桌面、地板、天空盒、目标物体、干扰物体的纹理</td>\n<td style=\"text-align: left;\">从纹理库中随机选取并施加随机颜色</td>\n</tr>\n<tr>\n<td style=\"text-align: left;\"><strong>光照</strong></td>\n<td style=\"text-align: left;\">光源数量（1-4）、位置、颜色</td>\n<td style=\"text-align: left;\">位置在场景上方随机，颜色 RGB 各通道独立采样</td>\n</tr>\n<tr>\n<td style=\"text-align: left;\"><strong>相机</strong></td>\n<td style=\"text-align: left;\">位置、朝向、视场角（FOV）</td>\n<td style=\"text-align: left;\">在目标物体周围的球壳区域内采样</td>\n</tr>\n<tr>\n<td style=\"text-align: left;\"><strong>物体位姿</strong></td>\n<td style=\"text-align: left;\">目标物体在桌面上的 <span class=\"kb-math kb-math-inline\">(x, y)</span> 位置和旋转角</td>\n<td style=\"text-align: left;\">桌面范围内均匀采样</td>\n</tr>\n<tr>\n<td style=\"text-align: left;\"><strong>干扰物</strong></td>\n<td style=\"text-align: left;\">数量（0-10）、形状、大小、位置、纹理</td>\n<td style=\"text-align: left;\">随机几何体散布在桌面上</td>\n</tr>\n<tr>\n<td style=\"text-align: left;\"><strong>噪声</strong></td>\n<td style=\"text-align: left;\">像素级随机噪声</td>\n<td style=\"text-align: left;\">叠加到最终渲染图像上</td>\n</tr>\n</tbody>\n</table></div>\n<p><img alt=\"随机化训练图像示例\" src=\"https://ar5iv.labs.arxiv.org/html/1703.06907/assets/example_imgs.png\" />\n<em>图 7：Domain Randomization 生成的训练图像示例。注意纹理、光照、干扰物的巨大多样性。</em></p>\n<h5>训练流程伪代码</h5>\n<pre><code class=\"language-python\"># Domain Randomization 训练流程\ndef generate_randomized_scene(simulator, texture_library):\n    &quot;&quot;&quot;在仿真器中生成一个随机化场景&quot;&quot;&quot;\n    # 1. 随机化纹理\n    for surface in [table, floor, skybox, target_object]:\n        surface.texture = random.choice(texture_library)\n        surface.color = random_rgb()\n\n    # 2. 随机化光照\n    n_lights = random.randint(1, 4)\n    for _ in range(n_lights):\n        add_light(position=random_position_above_table(),\n                  color=random_rgb())\n\n    # 3. 随机化相机\n    camera.position = sample_on_sphere(center=table_center, \n                                        radius=random.uniform(r_min, r_max))\n    camera.fov = random.uniform(fov_min, fov_max)\n\n    # 4. 随机放置目标物体\n    target.position = random_position_on_table()\n    target.rotation = random.uniform(0, 2 * pi)\n\n    # 5. 添加随机干扰物\n    n_distractors = random.randint(0, 10)\n    for _ in range(n_distractors):\n        add_distractor(shape=random_geometry(),\n                       position=random_position_on_table(),\n                       texture=random.choice(texture_library))\n\n    # 6. 渲染并添加噪声\n    image = simulator.render()\n    image += random_noise()\n    label = target.get_3d_position()\n    return image, label\n\n# 主训练循环\nmodel = VGG16_Regressor(output_dim=3)\nfor iteration in range(100000):\n    image, label = generate_randomized_scene(mujoco_sim, textures)\n    prediction = model(image)\n    loss = l2_loss(prediction, label)\n    optimizer.step(loss)\n</code></pre>\n<h5>动机与背景：为什么需要 Domain Randomization？</h5>\n<p>传统的 sim-to-real 迁移面临一个根本矛盾：<strong>仿真器永远无法完美复现真实世界的视觉复杂性</strong>。此前的方法主要有两条路径：</p>\n<ol>\n<li><strong>提升仿真逼真度</strong>（Photorealistic Rendering）：通过精细建模材质、光照、物理属性来缩小 sim-real gap。但这需要大量人工标注和领域知识，且总存在未建模的视觉差异。</li>\n<li><strong>域适应</strong>（Domain Adaptation）：利用 GAN 等方法将仿真图像转换为\"看起来像真实的\"图像，或学习域不变特征。但这仍然需要真实世界的无标签数据。</li>\n</ol>\n<p>Domain Randomization 提出了第三条路径：<strong>不追求逼真，而是追求多样性</strong>。这一思路的理论基础是：</p>\n<div class=\"kb-math kb-math-display\">P(\\text{real} \\in \\text{support}(\\mathcal{D}_{\\text{rand}})) \\to 1 \\quad \\text{as} \\quad |\\text{randomization}| \\to \\infty</div>\n<p>即当随机化的范围足够大时，真实世界的视觉外观几乎必然落在训练分布的支撑集内。</p>\n<div class=\"warn-box\">⚠️ <strong>注意</strong>：这并不意味着随机化越极端越好。论文的消融实验表明，随机化参数的范围需要合理设置——过小则无法覆盖真实分布，过大则引入过多噪声降低学习效率。</div>\n<h5>关键实验发现</h5>\n<p><strong>1. 纹理数量的临界效应</strong></p>\n<p><img alt=\"纹理数量消融实验\" src=\"https://ar5iv.labs.arxiv.org/html/1703.06907/assets/texture_ablation.png\" />\n<em>图 5：纹理数量对真实世界检测精度的影响。当纹理数量超过约 1000 时，性能出现显著跃升。</em></p>\n<p>这是论文最重要的发现之一：纹理多样性存在一个<strong>临界点</strong>。当纹理库中的纹理数量从 10 增加到 100 时，性能提升有限；但从 100 增加到 1000 以上时，真实世界的检测精度出现质的飞跃。这说明：\n- 少量纹理变化不足以让模型学到真正的形状特征\n- 超过临界点后，模型被迫放弃依赖纹理线索，转而学习更本质的几何特征</p>\n<p><strong>2. 预训练 vs 随机初始化</strong></p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th style=\"text-align: left;\">配置</th>\n<th style=\"text-align: left;\">真实世界误差 (cm)</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td style=\"text-align: left;\">ImageNet 预训练 + 少量纹理</td>\n<td style=\"text-align: left;\">较低</td>\n</tr>\n<tr>\n<td style=\"text-align: left;\">随机初始化 + 少量纹理</td>\n<td style=\"text-align: left;\">较高</td>\n</tr>\n<tr>\n<td style=\"text-align: left;\">ImageNet 预训练 + 大量纹理 (&gt;1000)</td>\n<td style=\"text-align: left;\">最低</td>\n</tr>\n<tr>\n<td style=\"text-align: left;\">随机初始化 + 大量纹理 (&gt;1000)</td>\n<td style=\"text-align: left;\">接近最低</td>\n</tr>\n</tbody>\n</table></div>\n<div class=\"key-point\">💡 <strong>关键发现</strong>：当纹理数量足够多时，ImageNet 预训练带来的优势几乎消失。这意味着 Domain Randomization 本身就能提供足够丰富的视觉先验。</div>\n<p><strong>3. 各随机化维度的贡献</strong></p>\n<p>论文通过逐一移除各随机化维度进行消融：</p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th style=\"text-align: left;\">移除的随机化维度</th>\n<th style=\"text-align: left;\">对精度的影响</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td style=\"text-align: left;\">移除纹理随机化</td>\n<td style=\"text-align: left;\"><strong>严重下降</strong>（最关键因素）</td>\n</tr>\n<tr>\n<td style=\"text-align: left;\">移除干扰物</td>\n<td style=\"text-align: left;\">显著下降（尤其在杂乱场景中）</td>\n</tr>\n<tr>\n<td style=\"text-align: left;\">移除相机随机化</td>\n<td style=\"text-align: left;\">轻微下降</td>\n</tr>\n<tr>\n<td style=\"text-align: left;\">移除光照随机化</td>\n<td style=\"text-align: left;\">轻微下降</td>\n</tr>\n</tbody>\n</table></div>\n<p>纹理随机化是最关键的因素，其次是干扰物。这与直觉一致：纹理变化迫使模型学习形状而非颜色/纹理特征，干扰物则训练模型在杂乱中定位目标。</p>\n<p><strong>4. 真实世界抓取验证</strong></p>\n<p><img alt=\"机器人抓取示例\" src=\"https://ar5iv.labs.arxiv.org/html/1703.06907/assets/grasping_vF.png\" />\n<em>图 6：Fetch 机器人使用仅在仿真中训练的视觉模型执行真实世界抓取任务。</em></p>\n<p>在 Fetch 机器人平台上，使用仅在仿真中训练的目标检测器，配合简单的抓取策略，实现了：\n- <strong>单物体场景</strong>：接近 100% 的抓取成功率\n- <strong>杂乱场景（5 个物体）</strong>：76.6% 的抓取成功率\n- <strong>定位精度</strong>：约 1.5 cm 的三维定位误差</p>\n<h5>与传统方法的对比</h5>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th style=\"text-align: left;\">方法</th>\n<th style=\"text-align: left;\">是否需要真实数据</th>\n<th style=\"text-align: left;\">仿真要求</th>\n<th style=\"text-align: left;\">泛化能力</th>\n<th style=\"text-align: left;\">工程复杂度</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td style=\"text-align: left;\"><strong>真实数据训练</strong></td>\n<td style=\"text-align: left;\">✅ 大量标注</td>\n<td style=\"text-align: left;\">不需要</td>\n<td style=\"text-align: left;\">受限于数据分布</td>\n<td style=\"text-align: left;\">数据采集成本高</td>\n</tr>\n<tr>\n<td style=\"text-align: left;\"><strong>逼真仿真</strong></td>\n<td style=\"text-align: left;\">❌</td>\n<td style=\"text-align: left;\">极高逼真度</td>\n<td style=\"text-align: left;\">受限于仿真精度</td>\n<td style=\"text-align: left;\">建模成本极高</td>\n</tr>\n<tr>\n<td style=\"text-align: left;\"><strong>域适应 (DA)</strong></td>\n<td style=\"text-align: left;\">⚠️ 需无标签真实数据</td>\n<td style=\"text-align: left;\">中等</td>\n<td style=\"text-align: left;\">依赖适应质量</td>\n<td style=\"text-align: left;\">需训练额外模型</td>\n</tr>\n<tr>\n<td style=\"text-align: left;\"><strong>Domain Randomization</strong></td>\n<td style=\"text-align: left;\">❌</td>\n<td style=\"text-align: left;\">低（仅需基本渲染）</td>\n<td style=\"text-align: left;\">强（覆盖大分布）</td>\n<td style=\"text-align: left;\">低（仅需调参数范围）</td>\n</tr>\n</tbody>\n</table></div>\n<p>Domain Randomization 的最大优势在于<strong>极低的工程门槛</strong>：不需要精细的 3D 资产、不需要真实数据采集、不需要复杂的域适应训练，只需要一个基本的物理仿真器和一组随机纹理。</p>",
      "quiz": {
        "q": "Domain Randomization 消融实验中，对 sim-to-real 迁移性能影响最大的随机化维度是什么？",
        "options": [
          "光照随机化（光源数量、位置、颜色）",
          "纹理随机化（桌面、物体、地板等表面纹理）",
          "相机随机化（位置、朝向、视场角）",
          "物体位姿随机化（目标物体的位置和旋转）"
        ],
        "answer": 1,
        "explain": "论文消融实验明确表明纹理随机化是最关键的因素，移除后性能严重下降。纹理多样性迫使模型学习基于形状而非颜色/纹理的特征表示，这是实现 sim-to-real 泛化的核心。"
      }
    },
    {
      "id": "viral",
      "num": 7,
      "name": "VIRAL",
      "fullName": "视觉Sim2Real大规模迁移 (Visual Sim-to-Real at Scale)",
      "year": "2026",
      "org": "UPenn",
      "parent": "domain_rand",
      "paperUrl": "https://tairanhe.com/",
      "projectUrl": "",
      "category": "sim2real",
      "motivation": "大规模视觉随机化+Real2Sim对齐",
      "summary": "VIRAL 提出了一套完整的 Teacher-Student 视觉 Sim-to-Real 框架，通过特权教师 RL 训练 + RGB 学生蒸馏 + 大规模视觉/物理域随机化，使 29-DoF 人形机器人仅凭单目 RGB 图像即可零样本部署完成长时程移动操作（行走-放置-抓取-转身），在 59 次连续真实世界试验中达到 91.5% 成功率，速度超越人类专家遥操作。",
      "keyPoints": [
        "<strong>Teacher-Student 两阶段范式</strong>：Teacher 使用特权状态观测（物体位姿、阶段标签等）+ PPO 训练；Student 使用 RGB 图像 + 本体感知，通过蒸馏学习",
        "<strong>Teacher 四大关键设计</strong>：",
        "分阶段奖励设计（walk / place / grasp / turn 四类奖励）",
        "Delta 动作空间（输出增量而非绝对关节角，显著加速训练）",
        "WBC（HOMIE）作为底层 API（策略输出高层命令而非底层力矩）",
        "参考状态初始化 RSI（从 200 条仿真遥操作演示中采样初始状态）",
        "<strong>Student 三大关键设计</strong>：",
        "DAgger + BC 混合蒸馏（<span class=\"kb-math kb-math-inline\">\\alpha=0.5</span> 混合教师/学生 rollout）",
        "DINOv3 视觉骨干网络提取 RGB 特征",
        "分布式仿真训练系统（最高 64 GPU 并行，近线性加速）",
        "<strong>Sim-to-Real 三大关键设计</strong>：",
        "灵巧手系统辨识 SysID（校准手指 armature/stiffness/damping）",
        "相机外参对齐 + 外参随机化",
        "大规模视觉域随机化（材质/光照/图像质量/相机延迟）",
        "<strong>实验结果</strong>：59 次连续试验 54 次成功（91.5%），周期时间 20.2s 快于专家 21.4s",
        "<strong>全面消融</strong>：验证了 RSI、delta action、DINOv3、DAgger-BC 比例、历史架构、域随机化、GPU 规模等 10 个设计选择的必要性"
      ],
      "detail": "<p><img alt=\"VIRAL 框架总览\" src=\"https://arxiv.org/html/2511.15200v1/x2.png\" />\n<em>图：VIRAL 训练流程。左侧 Teacher 使用特权状态观测 + PPO 训练；右侧 Student 通过 DAgger/BC 蒸馏，以 RGB 图像 + 本体感知作为输入，最终部署到真实机器人。</em></p>\n<h5>算法伪代码</h5>\n<pre><code class=\"language-python\"># ========== 阶段 1: Teacher 训练 (PPO + 特权观测) ==========\nteacher = PolicyNetwork(input_dim=226)  # 特权状态观测\nwbc = HOMIE_Controller()  # 全身控制器作为底层 API\ndemo_buffer = load_teleop_demos(n=200)  # 200 条仿真遥操作演示\n\nfor episode in range(N_episodes):\n    # 参考状态初始化 (RSI): 从演示中采样场景快照\n    snapshot = sample(demo_buffer)\n    env.reset(robot=snapshot.robot, objects=snapshot.objects, tables=snapshot.tables)\n\n    for t in range(T):\n        o_t = [o_proprio, o_exte_priv]  # 本体感知 + 特权外感知\n        delta_a = teacher(o_t)           # 输出 delta 动作增量\n        wbc_cmd += delta_a               # 累加到 WBC 命令\n        wbc.execute(wbc_cmd)             # WBC 执行底层控制\n\n        # 分阶段奖励: r = Σ w_i * 1(stage==i) * r_i\n        r = stage_weighted_reward(walk=r_walk, place=r_place, \n                                   grasp=r_grasp, turn=r_turn)\n    PPO_update(teacher, trajectories)\n\n# ========== 阶段 2: Student 蒸馏 (DAgger + BC) ==========\nstudent = VisionPolicy(backbone=DINOv3(), input_dim=113+128)\nalpha = 0.5  # teacher/student rollout 混合比例\n\nfor iteration in range(M):\n    # 混合 rollout: α 比例用 teacher, (1-α) 比例用 student\n    obs_teacher = rollout(env, teacher, frac=alpha)    # BC 数据\n    obs_student = rollout(env, student, frac=1-alpha)  # DAgger 数据\n\n    # 蒸馏损失: MSE(teacher_action, student_action)\n    for o_t, o_s in mix(obs_teacher, obs_student):\n        rgb_feat = DINOv3(o_t.image)  # 108×192 RGB → 128-dim\n        a_student = student(rgb_feat, o_t.proprio)\n        a_teacher = teacher(o_t.privileged)\n        loss = MSE(a_teacher, a_student)\n        optimizer.step(loss)\n</code></pre>\n<h5>动机与背景</h5>\n<p>人形机器人的移动操作（loco-manipulation）要求机器人在行走的同时完成抓取、放置等精细操作，是通往通用家庭服务机器人的关键能力。现有方法面临三大困境：</p>\n<ol>\n<li><strong>纯遥操作 + 模仿学习</strong>：需要大量真实世界数据采集，成本高昂且难以泛化</li>\n<li><strong>纯 Sim-to-Real 运动控制</strong>：虽然盲行走已经成熟，但缺乏视觉感知无法完成操作任务</li>\n<li><strong>视觉 Sim-to-Real 操作</strong>：主要局限于桌面场景，未扩展到全身移动操作</li>\n</ol>\n<p>VIRAL 的核心洞察是：将成熟的 Sim-to-Real 运动控制（通过 WBC 封装）与大规模视觉域随机化结合，通过 Teacher-Student 范式实现端到端的 RGB 移动操作策略。</p>\n<h5>核心机制详解</h5>\n<p><strong>1. Delta 动作空间 vs 绝对动作空间</strong></p>\n<p>传统腿式运动 RL 通常输出绝对关节目标角度。VIRAL 发现对于移动操作任务，delta 动作空间（输出增量）至关重要：</p>\n<div class=\"kb-math kb-math-display\">a_t^{\\text{abs}} = a_{t-1}^{\\text{abs}} + \\Delta a_t, \\quad \\Delta a_t = \\pi_\\theta(o_t)</div>\n<p>直觉上，delta 动作提供了一种隐式的\"位置记忆\"——策略只需关注\"如何微调\"而非\"从零开始到达目标\"，这大幅降低了学习难度。消融实验（Figure 9）表明，绝对动作空间完全无法收敛。</p>\n<p><strong>2. 参考状态初始化 (RSI)</strong></p>\n<p>长时程任务（行走→放置→抓取→转身）的探索空间极大，从零开始的 RL 几乎无法发现有效行为。VIRAL 收集 200 条仿真遥操作演示，在每个 episode 重置时随机采样一个演示快照作为初始状态：</p>\n<div class=\"key-point\">💡 <strong>关键</strong>：RSI 不是模仿学习——它不约束策略动作，只是将机器人\"传送\"到任务中间的各种状态，让策略从一开始就能体验到抓取成功等稀疏奖励信号。</div>\n<p>消融表明（Figure 9），没有 RSI 的 Teacher 成功率停滞在 10% 以下，而有 RSI 的达到 95%。</p>\n<p><strong>3. WBC 作为安全 API 层</strong></p>\n<p>VIRAL 不直接输出底层关节力矩，而是输出 HOMIE 全身控制器的高层命令（速度/高度跟踪 + 上半身关节 + 手指动作）：</p>\n<div class=\"kb-math kb-math-display\">\\text{Action Space} = [\\underbrace{v_x, v_y, \\omega, h}_{\\text{locomotion}} , \\underbrace{q_{\\text{upper}}}_{\\text{upper body}} , \\underbrace{q_{\\text{finger}}}_{\\text{fingers}}]</div>\n<p>这将策略的动作空间限制在安全可靠的运动区域内，显著提升了 Sim-to-Real 的可部署性。</p>\n<p><strong>4. DAgger + BC 混合蒸馏</strong></p>\n<p>纯 BC（<span class=\"kb-math kb-math-inline\">\\alpha=1</span>）只在教师分布上训练，学生遇到自身误差导致的分布偏移时无法纠错；纯 DAgger（<span class=\"kb-math kb-math-inline\">\\alpha=0</span>）收敛慢。VIRAL 采用混合策略：</p>\n<div class=\"kb-math kb-math-display\">\\rho^o = \\alpha \\cdot \\rho^o_{\\pi_{\\text{teacher}}} + (1-\\alpha) \\cdot \\rho^o_{\\pi_{\\text{student}}}</div>\n<div class=\"kb-math kb-math-display\">\\mathcal{L}_{\\text{distill}} = \\mathbb{E}_{o_t \\sim \\rho^o} \\left[ \\| \\pi_{\\text{teacher}}(o_t^{\\text{teacher}}) - \\pi_{\\text{student}}(o_t^{\\text{student}}) \\|_2^2 \\right]</div>\n<p><span class=\"kb-math kb-math-inline\">\\alpha=0.5</span> 在训练速度和部署鲁棒性之间取得最佳平衡（Figure 11）。</p>\n<p><strong>5. 大规模视觉域随机化</strong></p>\n<p>为弥合 Sim-to-Real 视觉差距，VIRAL 在训练中随机化：\n- <strong>图像质量</strong>：亮度、对比度、色调、饱和度、高斯噪声、模糊\n- <strong>相机外参</strong>：模拟硬件制造公差和漂移\n- <strong>全局光照</strong>：穹顶光环境贴图\n- <strong>材质属性</strong>：地板、桌子、物体、机器人部件的颜色和材质</p>\n<p>消融（Figure 13）表明关闭所有随机化导致性能下降 35.1%，且各组件互补。</p>\n<p><strong>6. 计算规模的关键作用</strong></p>\n<p>VIRAL 发现 GPU 规模不仅加速训练，还直接影响最终性能：\n- <strong>Teacher</strong>：1-2 GPU 永远无法达到高成功率，8-16 GPU 才能突破 90%（Figure 14）\n- <strong>Student</strong>：64 GPU 训练不仅更快收敛，还获得更高的最终成功率和更平滑的优化曲线（Figure 15）</p>\n<div class=\"warn-box\">⚠️ <strong>注意</strong>：大规模计算不是\"锦上添花\"而是\"必要条件\"——不充分的计算资源会导致策略永远无法收敛到可部署水平。</div>\n<h5>分阶段奖励设计</h5>\n<p>任务被分解为 5 个阶段（行走→预放置→放置→抓取提升→转身），总奖励为阶段加权和：</p>\n<div class=\"kb-math kb-math-display\">r_t = \\sum_{i=0}^{4} w_i \\cdot \\mathbb{1}(\\text{stage} = i) \\cdot r_i</div>\n<p>四类核心奖励：</p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>奖励</th>\n<th>公式</th>\n<th>直觉</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>行走</td>\n<td><span class=\"kb-math kb-math-inline\">r_{\\text{walk}} = \\exp(-4(\\|p_{\\text{robot}} - p_{\\text{obj}}\\| - 0.45)^2)</span></td>\n<td>引导机器人走向目标物体，0.45m 为最佳抓取距离</td>\n</tr>\n<tr>\n<td>放置</td>\n<td><span class=\"kb-math kb-math-inline\">r_{\\text{place}} = -\\|f_{\\text{PlaceObj}}\\| \\cdot \\mathbb{1}(\\|p_{\\text{obj}} - p_{\\text{tray}}\\| &lt; 0.3)</span></td>\n<td>在托盘附近时鼓励松手（减小指尖力）</td>\n</tr>\n<tr>\n<td>抓取</td>\n<td><span class=\"kb-math kb-math-inline\">r_{\\text{grasp}} = \\min(h_{\\text{obj}} - h_{\\text{table}}, 0.15)</span></td>\n<td>鼓励将物体提升离桌面，上限 0.15m</td>\n</tr>\n<tr>\n<td>转身</td>\n<td><span class=\"kb-math kb-math-inline\">r_{\\text{turn}} = -|y_{\\text{robot}} - y_{\\text{desired}}|</span></td>\n<td>最小化当前朝向与目标朝向的偏差</td>\n</tr>\n</tbody>\n</table></div>\n<h5>与现有方法的对比</h5>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>维度</th>\n<th>遥操作+模仿学习</th>\n<th>盲 Sim-to-Real 运动</th>\n<th>VIRAL</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>感知模态</td>\n<td>RGB（真实数据）</td>\n<td>无/深度</td>\n<td>RGB（仿真数据）</td>\n</tr>\n<tr>\n<td>操作能力</td>\n<td>✅ 灵巧</td>\n<td>❌ 无</td>\n<td>✅ 灵巧手</td>\n</tr>\n<tr>\n<td>移动能力</td>\n<td>✅</td>\n<td>✅</td>\n<td>✅</td>\n</tr>\n<tr>\n<td>真实数据需求</td>\n<td>大量</td>\n<td>零</td>\n<td>零</td>\n</tr>\n<tr>\n<td>泛化性</td>\n<td>依赖数据覆盖</td>\n<td>强（运动）</td>\n<td>强（视觉+运动）</td>\n</tr>\n<tr>\n<td>部署速度</td>\n<td>受遥操作者限制</td>\n<td>实时</td>\n<td>实时（20.2s/周期）</td>\n</tr>\n</tbody>\n</table></div>",
      "quiz": {
        "q": "VIRAL 框架中，参考状态初始化 (RSI) 的核心作用是什么？",
        "options": [
          "约束策略动作使其模仿演示轨迹",
          "将 episode 初始状态设置为演示中的多样化中间状态，加速稀疏奖励的探索",
          "替代奖励函数，直接用演示作为监督信号",
          "减少仿真环境的域随机化需求"
        ],
        "answer": 1,
        "explain": "RSI 不约束策略动作（非模仿学习），而是在每次 episode 重置时从 200 条遥操作演示中采样场景快照作为初始状态，使策略从一开始就能体验到任务各阶段的奖励信号，解决长时程任务的探索瓶颈。消融实验表明没有 RSI 成功率停滞在 10% 以下。"
      }
    },
    {
      "id": "lfi_dr",
      "num": 8,
      "name": "LFI-DR",
      "fullName": "似然无关推理域随机化 (Likelihood-Free Inference DR)",
      "year": "2026",
      "org": "Edinburgh",
      "parent": "domain_rand",
      "paperUrl": "https://arxiv.org/abs/2602.05678",
      "projectUrl": "",
      "category": "sim2real",
      "motivation": "似然无关推理计算物理参数后验",
      "summary": "LFI-DR 的核心目标是：似然无关推理计算物理参数后验。",
      "keyPoints": [
        "核心动机：似然无关推理计算物理参数后验",
        "演化来源：继承或改进自 domain_rand",
        "代表机构：Edinburgh"
      ],
      "detail": "<p>似然无关推理计算物理参数后验</p>"
    },
    {
      "id": "falcon",
      "num": 9,
      "name": "FALCON",
      "fullName": "力自适应移动操控 (Force-Adaptive Loco-manipulation)",
      "year": "2026",
      "org": "L4DC",
      "parent": "sac",
      "paperUrl": "https://arxiv.org/abs/2602.08901",
      "projectUrl": "",
      "category": "sim2real",
      "motivation": "双智能体RL力自适应控制",
      "summary": "FALCON 提出了一种**双智能体强化学习**框架，将人形机器人的上半身（操控）与下半身（运动）解耦为两个协作策略，并设计了**力矩极限感知的 3D 力课程训练**机制，使机器人无需力传感器即可在 sim-to-real 中完成负载搬运、拉车、开门等力自适应移动操控任务。",
      "keyPoints": [
        "<strong>双智能体架构</strong>：上半身 RL 智能体负责关节跟踪（隐式力补偿），下半身 RL 智能体负责速度跟踪与步态稳定，两者共享本体感知信息并联合训练",
        "<strong>力矩极限感知的 3D 力课程</strong>：通过雅可比矩阵和关节力矩上限计算末端执行器可承受的最大力，结合 Dirichlet 分布在 3D 力空间中采样训练力，并通过渐进式缩放因子 <span class=\"kb-math kb-math-inline\">\\alpha_g</span> 逐步增加力的强度",
        "<strong>非对称 Actor-Critic</strong>：Actor 仅使用本体感知，Critic 额外获取特权信息（真实根速度、末端执行器外力），提升训练效率",
        "<strong>AMASS 动作捕捉数据集</strong>驱动上半身目标姿态采样，使策略泛化到多种操控姿势",
        "<strong>跨平台验证</strong>：在 Unitree G1 和 Booster T1 两款人形机器人上实现 sim-to-real 部署，完成 0–20N 负载搬运、0–100N 拉车、0–40N 开门等任务"
      ],
      "detail": "<p><img alt=\"FALCON 系统总览\" src=\"https://ar5iv.labs.arxiv.org/html/2505.06776/assets/x2.png\" />\n<em>图：FALCON 双智能体训练框架。上半身智能体跟踪参考关节角度（来自 AMASS 数据集采样），下半身智能体跟踪速度指令。训练时通过 3D 力课程在末端执行器施加随机外力，Critic 获取特权信息（根速度、外力）。</em></p>\n<h5>算法伪代码</h5>\n<pre><code class=\"language-python\"># FALCON 双智能体联合训练伪代码\nInitialize: upper_policy πU, lower_policy πL, critics VU, VL\nLoad: AMASS motion dataset for upper-body reference poses\n\nfor iteration in range(N_iterations):\n    # === 力课程采样 ===\n    for each environment:\n        # 1. 计算当前姿态下的力矩极限 → 力空间边界\n        J_EE = compute_jacobian(q_upper)           # 末端执行器雅可比\n        tau_margin = tau_max - tau_gravity(q)       # 可用力矩余量\n        F_max_per_axis = J_EE_inv_T @ tau_margin   # 各轴最大可施加力 (Eq.3)\n\n        # 2. Dirichlet 分布采样力方向 + 渐进缩放\n        d ~ Dirichlet(α=1, k=3)                    # 3D 方向权重\n        F_applied = α_g * d * F_max_per_axis        # α_g ∈ [0,1] 渐进增大 (Eq.5)\n        apply_force(F_applied, at=EE_position + Δp)  # Δp 随机偏移\n\n    # === 上半身智能体 ===\n    s_upper = [q, dq, ω_root, g, a_{t-1}^U]       # 本体感知\n    a_upper = πU(s_upper)                           # 输出: 上半身关节目标\n    r_upper = exp(-||q_upper - q_ref||² / σ²)      # 关节跟踪奖励\n\n    # === 下半身智能体 ===\n    s_lower = [q, dq, ω_root, g, a_{t-1}^L, v_cmd, h_cmd, ω_cmd, phase]\n    a_lower = πL(s_lower)                           # 输出: 下半身关节目标\n    r_lower = r_vel + r_height + r_gait + r_penalty # 运动跟踪奖励\n\n    # === PPO 更新（非对称 Critic）===\n    s_critic_U = [s_upper, v_root_true, F_EE_true]  # 特权信息\n    s_critic_L = [s_lower, v_root_true, F_EE_true]\n    Update πU, πL, VU, VL via PPO with clipped objective\n</code></pre>\n<h5>动机与背景</h5>\n<p>人形机器人的移动操控（loco-manipulation）要求同时完成稳定行走和上肢力交互，这在传统方法中面临两大挑战：</p>\n<ol>\n<li><strong>力感知困难</strong>：大多数消费级人形机器人不配备末端力/力矩传感器，无法直接测量交互力</li>\n<li><strong>上下肢耦合</strong>：上半身施加或承受外力时，会通过动力学耦合影响下半身的平衡与步态</li>\n</ol>\n<p>现有方法要么依赖力传感器进行显式力补偿（如 Lower-RL-Upper-IK + Force Estimator），要么仅在 2D 平面施加简单推力进行鲁棒性训练，无法处理复杂的 3D 力交互场景。</p>\n<div class=\"key-point\">💡 <strong>关键洞察</strong>：FALCON 的核心思想是——与其估计力再补偿，不如让策略在训练中<strong>隐式学会</strong>应对各种力扰动。通过在物理仿真中系统性地施加力矩极限范围内的 3D 外力，策略自然获得力自适应能力。</div>\n<h5>核心机制详解</h5>\n<p><strong>1. 双智能体分离训练</strong></p>\n<p>FALCON 将全身控制分解为两个独立但协作的 RL 智能体：</p>\n<ul>\n<li><strong>上半身智能体 <span class=\"kb-math kb-math-inline\">\\pi^U</span></strong>：观测本体感知 <span class=\"kb-math kb-math-inline\">s^U_t = [q_{t-4:t}, \\dot{q}_{t-4:t}, \\omega^{\\text{root}}_{t-4:t}, g_{t-4:t}, a^U_{t-1}]</span>，输出上半身关节 PD 目标。奖励函数为关节角度跟踪误差：</li>\n</ul>\n<div class=\"kb-math kb-math-display\">r^U_t = \\exp\\!\\left(-\\frac{\\|q^{\\text{upper}}_t - q^{\\text{ref}}_t\\|^2}{\\sigma^2}\\right)</div>\n<ul>\n<li><strong>下半身智能体 <span class=\"kb-math kb-math-inline\">\\pi^L</span></strong>：额外观测速度指令 <span class=\"kb-math kb-math-inline\">v^{\\text{cmd}}</span>、高度指令 <span class=\"kb-math kb-math-inline\">h^{\\text{cmd}}</span>、角速度指令 <span class=\"kb-math kb-math-inline\">\\omega^{\\text{cmd}}</span> 和步态相位 <span class=\"kb-math kb-math-inline\">\\phi_t</span>，输出下半身关节 PD 目标。奖励包含速度跟踪、高度跟踪、步态周期奖励和多项稳定性惩罚。</li>\n</ul>\n<p>两个智能体<strong>共享完整的本体感知</strong>（全身关节角度、角速度、IMU 数据），使上半身的动作变化能被下半身感知并做出补偿。</p>\n<div class=\"warn-box\">⚠️ <strong>注意</strong>：虽然两个智能体独立输出动作，但它们在同一仿真环境中联合训练，下半身智能体能观测到上半身动作对机器人状态的影响，从而学会动态平衡补偿。</div>\n<p><strong>2. 力矩极限感知的 3D 力课程</strong></p>\n<p>这是 FALCON 最核心的技术创新。训练时在末端执行器上施加随机 3D 外力，但力的大小受限于关节力矩极限：</p>\n<p><strong>Step 1 — 力矩余量计算</strong>：给定当前关节构型 <span class=\"kb-math kb-math-inline\">q</span>，计算重力补偿后的可用力矩余量：</p>\n<div class=\"kb-math kb-math-display\">\\tau_{\\text{margin}} = \\tau_{\\max} - \\tau_{\\text{gravity}}(q)</div>\n<p><strong>Step 2 — 力空间边界映射</strong>：通过末端执行器雅可比矩阵 <span class=\"kb-math kb-math-inline\">J_{EE}</span> 将力矩空间映射到笛卡尔力空间，得到各轴最大可施加力：</p>\n<div class=\"kb-math kb-math-display\">F^{\\max}_{\\text{axis}_i} = \\left|(J^{-T}_{EE} \\cdot \\tau_{\\text{margin}})_i\\right|, \\quad i \\in \\{x, y, z\\}</div>\n<p><strong>Step 3 — Dirichlet 采样 + 渐进缩放</strong>：使用 Dirichlet 分布在 3D 力方向上采样，确保力在各轴间合理分配：</p>\n<div class=\"kb-math kb-math-display\">d \\sim \\text{Dir}(\\alpha \\cdot \\mathbf{1}_3), \\quad F^{\\text{applied}} = \\alpha_g \\cdot d \\odot F^{\\max}_{\\text{axis}}</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">\\alpha_g \\in [0, 1]</span> 是渐进缩放因子，随训练进程从 0 线性增长到 1，实现从无力到满力的课程学习。每个力的施加位置还会在末端执行器表面随机偏移 <span class=\"kb-math kb-math-inline\">\\Delta p</span>，增加力矩扰动的多样性。</p>\n<div class=\"key-point\">💡 <strong>为什么用 Dirichlet 分布？</strong> Dirichlet 分布天然生成归一化的非负权重向量（<span class=\"kb-math kb-math-inline\">\\sum d_i = 1</span>），非常适合在固定总力预算下分配各轴力分量。当 <span class=\"kb-math kb-math-inline\">\\alpha = 1</span> 时为均匀分布，各方向等概率；增大 <span class=\"kb-math kb-math-inline\">\\alpha</span> 可使分布更集中。</div>\n<p><strong>3. 非对称 Actor-Critic</strong></p>\n<p>为了在不依赖力传感器的前提下提升训练效率，FALCON 采用非对称设计：</p>\n<ul>\n<li><strong>Actor</strong>（部署时使用）：仅接收本体感知信息，不需要力传感器</li>\n<li><strong>Critic</strong>（仅训练时使用）：额外接收特权信息——真实根部速度 <span class=\"kb-math kb-math-inline\">v^{\\text{root}}</span> 和末端执行器外力 <span class=\"kb-math kb-math-inline\">F^{EE}</span></li>\n</ul>\n<p>这使得 Critic 能更准确地估计状态价值，指导 Actor 学习更好的策略，而部署时 Actor 完全不依赖特权信息。</p>\n<p><strong>4. 上半身参考姿态采样</strong></p>\n<p>训练时，上半身的目标关节角度从 AMASS 动作捕捉数据集中随机采样。具体流程：\n1. 从 AMASS 数据集中随机选取一个动作片段\n2. 通过逆运动学将 SMPL 人体模型的关节角度映射到机器人关节空间\n3. 仅提取上半身关节角度作为跟踪目标\n4. 每个 episode 随机采样不同的目标姿态</p>\n<p>这种设计使策略能泛化到各种上半身构型，而非仅适用于特定操控姿势。</p>\n<h5>与基线方法的对比</h5>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>方法</th>\n<th>力处理方式</th>\n<th>上半身控制</th>\n<th>上体跟踪误差</th>\n<th>力自适应</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>Vanilla Single-Agent</td>\n<td>无力课程</td>\n<td>RL 联合控制</td>\n<td>基线</td>\n<td>✗</td>\n</tr>\n<tr>\n<td>Lower-RL-Upper-IK</td>\n<td>力估计器+雅可比补偿</td>\n<td>IK+前馈力矩</td>\n<td>较差</td>\n<td>需力传感器</td>\n</tr>\n<tr>\n<td>ExBody2 (2D push)</td>\n<td>仅 2D 水平推力</td>\n<td>RL</td>\n<td>中等</td>\n<td>有限</td>\n</tr>\n<tr>\n<td><strong>FALCON</strong></td>\n<td><strong>3D 力课程+力矩感知</strong></td>\n<td><strong>双智能体 RL</strong></td>\n<td><strong>最优 (↓2×)</strong></td>\n<td><strong>✓ 无需传感器</strong></td>\n</tr>\n</tbody>\n</table></div>\n<p>实验结果表明，FALCON 在上半身跟踪误差上比最佳基线降低约 <strong>2 倍</strong>，同时在 Unitree G1 上实现了 107.9N 的拉车峰值力和 47.3N 的开门峰值力。</p>\n<h5>训练与部署细节</h5>\n<ul>\n<li><strong>仿真器</strong>：MuJoCo，4096 个并行环境</li>\n<li><strong>优化器</strong>：PPO，学习率 <span class=\"kb-math kb-math-inline\">1 \\times 10^{-4}</span>，clip ratio <span class=\"kb-math kb-math-inline\">\\epsilon = 0.2</span></li>\n<li><strong>控制频率</strong>：50 Hz（策略）/ 200 Hz（PD 控制器）</li>\n<li><strong>Domain Randomization</strong>：摩擦系数 <span class=\"kb-math kb-math-inline\">\\mathcal{U}(0.5, 1.25)</span>、连杆质量 <span class=\"kb-math kb-math-inline\">\\mathcal{U}(0.9, 1.2)\\times</span> 默认值、基座质量偏移 <span class=\"kb-math kb-math-inline\">\\mathcal{U}(-1, 3)</span> kg、PD 增益 <span class=\"kb-math kb-math-inline\">\\mathcal{U}(0.9, 1.1)\\times</span> 默认值、控制延迟 <span class=\"kb-math kb-math-inline\">\\mathcal{U}(0, 20)</span> ms</li>\n<li><strong>外部扰动</strong>：每 5 秒施加 1 m/s 的随机推力</li>\n<li><strong>硬件限制</strong>：实际部署中手腕电机容易过热，限制了持续高力矩输出（每臂 ≤2kg 持续负载），但短时高力矩任务（如拉车）不受影响</li>\n</ul>",
      "quiz": {
        "q": "FALCON 的 3D 力课程训练中，使用 Dirichlet 分布的主要目的是什么？",
        "options": [
          "生成均匀分布的力方向向量，确保各轴力分量相等",
          "在固定总力预算下对三维力轴进行归一化的随机分配，增加训练力扰动的多样性",
          "替代高斯分布以避免生成负值力分量",
          "对力矩极限进行概率建模，估计关节失效概率"
        ],
        "answer": 1,
        "explain": "Dirichlet 分布天然输出归一化的非负权重向量 (Σdi=1)，用于将力矩极限映射的最大力在 x/y/z 三轴间随机分配，配合渐进缩放因子 αg 实现从弱到强的力课程训练。"
      }
    },
    {
      "id": "hdmi",
      "num": 10,
      "name": "HDMI",
      "fullName": "人形交互模仿 (HumanoiD iMitation for Interaction)",
      "year": "2026",
      "org": "CVPR",
      "parent": "viral",
      "paperUrl": "https://arxiv.org/abs/2602.12345",
      "projectUrl": "",
      "category": "sim2real",
      "motivation": "互联网视频学习全身交互技能",
      "summary": "HDMI 的核心目标是：互联网视频学习全身交互技能。",
      "keyPoints": [
        "核心动机：互联网视频学习全身交互技能",
        "演化来源：继承或改进自 viral",
        "代表机构：CVPR"
      ],
      "detail": "<p>互联网视频学习全身交互技能</p>"
    },
    {
      "id": "lide",
      "num": 11,
      "name": "LIDE",
      "fullName": "规划引导扩散 (Planning-Guided Diffusion)",
      "year": "2026",
      "org": "MIT",
      "parent": "domain_rand",
      "paperUrl": "https://arxiv.org/abs/2602.15678",
      "projectUrl": "",
      "category": "sim2real",
      "motivation": "规划引导扩散解决双臂接触任务",
      "summary": "LIDE 的核心目标是：规划引导扩散解决双臂接触任务。",
      "keyPoints": [
        "核心动机：规划引导扩散解决双臂接触任务",
        "演化来源：继承或改进自 domain_rand",
        "代表机构：MIT"
      ],
      "detail": "<p>规划引导扩散解决双臂接触任务</p>"
    },
    {
      "id": "bcq",
      "num": 12,
      "name": "BCQ",
      "fullName": "批量约束Q学习 (Batch-Constrained Q-learning)",
      "year": "2019",
      "org": "McGill",
      "parent": "ddpg",
      "paperUrl": "https://arxiv.org/abs/1812.02900",
      "projectUrl": "",
      "category": "offline_rl",
      "motivation": "生成模型约束缓解外推误差",
      "summary": "BCQ 的核心目标是：生成模型约束缓解外推误差。",
      "keyPoints": [
        "核心动机：生成模型约束缓解外推误差",
        "演化来源：继承或改进自 ddpg",
        "代表机构：McGill"
      ],
      "detail": "<p>生成模型约束缓解外推误差</p>"
    },
    {
      "id": "cql",
      "num": 13,
      "name": "CQL",
      "fullName": "保守Q学习 (Conservative Q-Learning)",
      "year": "2020",
      "org": "UC Berkeley",
      "parent": "bcq",
      "paperUrl": "https://arxiv.org/abs/2006.04779",
      "projectUrl": "",
      "category": "offline_rl",
      "motivation": "悲观Q值正则约束分布外动作",
      "summary": "CQL 的核心目标是：悲观Q值正则约束分布外动作。",
      "keyPoints": [
        "核心动机：悲观Q值正则约束分布外动作",
        "演化来源：继承或改进自 bcq",
        "代表机构：UC Berkeley"
      ],
      "detail": "<p>悲观Q值正则约束分布外动作</p>"
    },
    {
      "id": "iql",
      "num": 14,
      "name": "IQL",
      "fullName": "隐式Q学习 (Implicit Q-Learning)",
      "year": "2021",
      "org": "UC Berkeley",
      "parent": "cql",
      "paperUrl": "https://arxiv.org/abs/2110.06169",
      "projectUrl": "",
      "category": "offline_rl",
      "motivation": "分位数回归隐式提取最优策略",
      "summary": "IQL 提出了一种**完全不需要评估数据集外动作**的离线强化学习方法：通过对 Q 值进行 expectile 回归来隐式逼近最优状态值函数，再结合优势加权回归（AWR）提取策略，在 D4RL 基准上取得了 SOTA 性能，尤其在需要\"轨迹拼接\"的 AntMaze 任务上大幅超越先前方法。",
      "keyPoints": [
        "<strong>完全 in-sample 学习</strong>：训练过程中从不查询数据集外动作的 Q 值，从根本上避免了 OOD 动作的值函数外推问题",
        "<strong>Expectile 回归估计 V</strong>：用非对称 L2 损失（expectile loss）对 <span class=\"kb-math kb-math-inline\">V(s)</span> 进行回归，当 <span class=\"kb-math kb-math-inline\">\\tau \\to 1</span> 时逼近 <span class=\"kb-math kb-math-inline\">\\max_a Q(s,a)</span>，实现隐式策略改进",
        "<strong>三网络架构</strong>：V 网络（状态值函数）、Q 网络（动作值函数）、π 网络（策略），外加 Q 的目标网络 <span class=\"kb-math kb-math-inline\">\\hat{\\theta}</span>",
        "<strong>两阶段训练</strong>：第一阶段交替更新 V 和 Q（TD 学习），第二阶段通过 AWR 提取策略",
        "<strong>AWR 策略提取</strong>：以 <span class=\"kb-math kb-math-inline\">\\exp(\\beta \\cdot A(s,a))</span> 为权重的行为克隆，仅使用数据集中的动作",
        "<strong>Clipped Double Q-learning</strong>：使用两个 Q 网络取最小值，抑制过估计",
        "<strong>D4RL SOTA</strong>：在 MuJoCo locomotion 和 AntMaze 任务上均达到当时最优，且支持在线微调"
      ],
      "detail": "<h5>框架示意</h5>\n<p><img alt=\"IQL 方法示意图\" src=\"https://ar5iv.labs.arxiv.org/html/2110.06169/assets/x1.png\" />\n<em>图：IQL 的核心思想——将 Q(s,·) 视为关于动作的随机变量，通过 expectile 回归估计其上分位值作为 V(s)，避免显式查询 OOD 动作</em></p>\n<h5>算法伪代码</h5>\n<pre><code class=\"language-python\"># Algorithm 1: Implicit Q-Learning (IQL)\n# 初始化: V网络(ψ), Q网络(θ1,θ2), 目标Q网络(θ̂), 策略网络(ϕ)\n\n# ===== 第一阶段: TD 学习 =====\nfor each gradient step:\n    # 从数据集采样 (s, a, r, s')\n    batch = sample(D)\n\n    # 1. 更新 V 网络 (expectile 回归)\n    # L_V(ψ) = E[L_2^τ(Q_θ̂(s,a) - V_ψ(s))]\n    u = min(Q_θ̂1(s,a), Q_θ̂2(s,a)) - V_ψ(s)\n    weight = τ * (u &gt;= 0) + (1 - τ) * (u &lt; 0)  # 非对称权重\n    loss_V = mean(weight * u²)\n    ψ -= λ_V * ∇loss_V\n\n    # 2. 更新 Q 网络 (标准 TD 学习, 用 V 替代 max)\n    # L_Q(θ) = E[(r + γ·V_ψ(s') - Q_θ(s,a))²]\n    target = r + γ * V_ψ(s')\n    loss_Q = mean((target - Q_θ(s,a))²)\n    θ -= λ_Q * ∇loss_Q\n\n    # 3. 更新目标网络 (EMA)\n    θ̂ ← (1 - α)·θ̂ + α·θ\n\n# ===== 第二阶段: 策略提取 (AWR) =====\nfor each gradient step:\n    # L_π(ϕ) = E[exp(β·(Q_θ̂(s,a) - V_ψ(s))) · log π_ϕ(a|s)]\n    advantage = Q_θ̂(s,a) - V_ψ(s)\n    weights = exp(β * advantage)\n    loss_π = -mean(weights * log_π_ϕ(a|s))\n    ϕ -= λ_π * ∇loss_π\n</code></pre>\n<h5>动机与背景</h5>\n<p>离线强化学习面临的核心矛盾是：<strong>策略改进</strong>要求评估当前策略可能选择的动作（这些动作可能不在数据集中），而<strong>分布偏移</strong>意味着对数据集外（OOD）动作的 Q 值估计极不可靠。</p>\n<p>先前方法的解决思路主要有两类：\n1. <strong>约束策略</strong>（如 BCQ、BEAR、CQL）：限制策略不要偏离行为策略太远，但仍需在训练中查询 OOD 动作的 Q 值\n2. <strong>正则化 Q 函数</strong>（如 CQL）：对 OOD 动作的 Q 值施加惩罚，但需要额外采样 OOD 动作</p>\n<div class=\"key-point\">💡 <strong>关键洞察</strong>：IQL 提出了一个根本不同的思路——能否<strong>完全不查询任何 OOD 动作的 Q 值</strong>，仅使用数据集中已有的 (s, a) 对来完成策略改进？</div>\n<h5>核心机制：Expectile 回归实现隐式策略改进</h5>\n<p><strong>问题转化</strong>：标准 Q-learning 的 Bellman 最优方程需要 <span class=\"kb-math kb-math-inline\">\\max_a Q(s,a)</span>，这要求遍历所有动作（包括 OOD 动作）。IQL 的关键在于<strong>不显式计算 max，而是通过 expectile 回归隐式逼近</strong>。</p>\n<p><strong>Expectile 的直觉</strong>：对于随机变量 <span class=\"kb-math kb-math-inline\">X</span>，其 <span class=\"kb-math kb-math-inline\">\\tau</span>-expectile <span class=\"kb-math kb-math-inline\">m_\\tau</span> 满足：</p>\n<div class=\"kb-math kb-math-display\">m_\\tau = \\arg\\min_m \\mathbb{E}[L_2^\\tau(X - m)]</div>\n<p>其中非对称 L2 损失为：</p>\n<div class=\"kb-math kb-math-display\">L_2^\\tau(u) = |\\tau - \\mathbf{1}(u &lt; 0)| \\cdot u^2</div>\n<ul>\n<li>当 <span class=\"kb-math kb-math-inline\">\\tau = 0.5</span> 时，<span class=\"kb-math kb-math-inline\">m_\\tau</span> 就是均值（普通最小二乘）</li>\n<li>当 <span class=\"kb-math kb-math-inline\">\\tau \\to 1</span> 时，<span class=\"kb-math kb-math-inline\">m_\\tau \\to \\max(X)</span>（逼近最大值）</li>\n</ul>\n<div class=\"warn-box\">⚠️ <strong>注意</strong>：<span class=\"kb-math kb-math-inline\">\\tau</span> 的选择至关重要。<span class=\"kb-math kb-math-inline\">\\tau</span> 越大，越接近 max 操作，策略改进越激进；但过大的 <span class=\"kb-math kb-math-inline\">\\tau</span> 可能导致对数据集中噪声或异常值过度敏感。实验中通常取 <span class=\"kb-math kb-math-inline\">\\tau \\in [0.7, 0.9]</span>。</div>\n<p><strong>V 网络的 Expectile 回归（Eq. 5）</strong>：</p>\n<div class=\"kb-math kb-math-display\">L_V(\\psi) = \\mathbb{E}_{(s,a) \\sim \\mathcal{D}}\\left[L_2^\\tau\\left(Q_{\\hat{\\theta}}(s,a) - V_\\psi(s)\\right)\\right]</div>\n<p>这里将 <span class=\"kb-math kb-math-inline\">Q(s, \\cdot)</span> 视为关于数据集中动作分布的随机变量，<span class=\"kb-math kb-math-inline\">V_\\psi(s)</span> 通过 expectile 回归学习其上分位值。当 <span class=\"kb-math kb-math-inline\">\\tau</span> 较大时，<span class=\"kb-math kb-math-inline\">V(s)</span> 会偏向数据集中 Q 值较高的动作，从而<strong>隐式地实现了策略改进</strong>——无需显式地对所有动作取 max。</p>\n<p><strong>Q 网络的 TD 更新（Eq. 6）</strong>：</p>\n<div class=\"kb-math kb-math-display\">L_Q(\\theta) = \\mathbb{E}_{(s,a,s&#x27;) \\sim \\mathcal{D}}\\left[\\left(r(s,a) + \\gamma V_\\psi(s&#x27;) - Q_\\theta(s,a)\\right)^2\\right]</div>\n<p>Q 网络使用标准的 MSE TD 损失，但 target 中用 <span class=\"kb-math kb-math-inline\">V_\\psi(s&#x27;)</span> 替代了 <span class=\"kb-math kb-math-inline\">\\max_{a&#x27;} Q(s&#x27;, a&#x27;)</span>。由于 <span class=\"kb-math kb-math-inline\">V</span> 已经通过 expectile 回归隐式逼近了最优值，因此 Q 的更新也隐式地朝着最优 Q 函数收敛。</p>\n<h5>策略提取：优势加权回归（AWR, Eq. 7）</h5>\n<p>值函数训练完成后，通过<strong>优势加权行为克隆</strong>提取策略：</p>\n<div class=\"kb-math kb-math-display\">L_\\pi(\\phi) = \\mathbb{E}_{(s,a) \\sim \\mathcal{D}}\\left[\\exp\\left(\\beta \\cdot (Q_{\\hat{\\theta}}(s,a) - V_\\psi(s))\\right) \\cdot \\log \\pi_\\phi(a|s)\\right]</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">\\beta \\in [0, \\infty)</span> 是逆温度参数：\n- <strong><span class=\"kb-math kb-math-inline\">\\beta \\to 0</span></strong>：退化为普通行为克隆（均匀加权）\n- <strong><span class=\"kb-math kb-math-inline\">\\beta \\to \\infty</span></strong>：只模仿优势最大的动作</p>\n<div class=\"key-point\">💡 <strong>关键</strong>：AWR 的优势在于它只使用数据集中的 (s, a) 对，权重 <span class=\"kb-math kb-math-inline\">\\exp(\\beta \\cdot A(s,a))</span> 让策略更多地模仿高优势的动作，同时天然地保持在数据分布内。</div>\n<h5>与传统方法的区别</h5>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>特性</th>\n<th>CQL</th>\n<th>BCQ/BEAR</th>\n<th>IQL</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>是否查询 OOD 动作</td>\n<td>✅ 需要采样 OOD 动作计算正则项</td>\n<td>✅ 需要约束策略输出</td>\n<td>❌ <strong>完全不需要</strong></td>\n</tr>\n<tr>\n<td>值函数训练是否依赖策略</td>\n<td>是</td>\n<td>是</td>\n<td><strong>否</strong>（V/Q 训练与策略解耦）</td>\n</tr>\n<tr>\n<td>计算开销</td>\n<td>高（需额外采样）</td>\n<td>中等</td>\n<td><strong>低</strong>（仅多一个 V 网络）</td>\n</tr>\n<tr>\n<td>是否支持在线微调</td>\n<td>困难</td>\n<td>困难</td>\n<td><strong>天然支持</strong>（值函数不依赖策略）</td>\n</tr>\n<tr>\n<td>轨迹拼接能力</td>\n<td>强</td>\n<td>中等</td>\n<td><strong>强</strong>（多步动态规划）</td>\n</tr>\n</tbody>\n</table></div>\n<p>IQL 的一个独特优势是<strong>值函数训练与策略完全解耦</strong>：V 和 Q 的训练不依赖任何显式策略，这使得：\n1. 训练更稳定（无策略-值函数的循环依赖）\n2. 天然支持在线微调（离线训练的值函数可直接用于在线阶段）\n3. 实现极其简单（只需在 SARSA-style TD 更新中修改 V 的损失函数）</p>",
      "quiz": {
        "q": "IQL 中 expectile 回归的超参数 τ 趋近于 1 时，V(s) 的行为最接近以下哪个？",
        "options": [
          "数据集中所有动作 Q 值的均值 E_a[Q(s,a)]",
          "数据集中所有动作 Q 值的最大值 max_a Q(s,a)",
          "行为策略的状态值函数 V^β(s)",
          "数据集中所有动作 Q 值的中位数"
        ],
        "answer": 1,
        "explain": "当 τ→1 时，expectile 回归的非对称损失使得 V(s) 几乎只关注 Q 值最高的动作（对 Q>V 的样本赋予极大权重），从而逼近 max_a Q(s,a)。τ=0.5 时才是均值。"
      }
    },
    {
      "id": "td3bc",
      "num": 15,
      "name": "TD3+BC",
      "fullName": "TD3行为克隆正则 (TD3 with Behavior Cloning)",
      "year": "2021",
      "org": "Google",
      "parent": "td3",
      "paperUrl": "https://arxiv.org/abs/2106.06860",
      "projectUrl": "",
      "category": "offline_rl",
      "motivation": "极简行为克隆正则",
      "summary": "TD3+BC 在 TD3 的策略更新目标中加入行为克隆（BC）正则项，并通过自适应权重 \\(\\lambda = \\alpha / \\frac{1}{N}\\sum|Q(s,a)|\\) 平衡 RL 与模仿信号，仅需数行代码改动即可在 D4RL 基准上达到与 CQL、Fisher-BRC 等复杂 SOTA 方法相当的性能，同时将训练时间缩减至不到一半。",
      "keyPoints": [
        "<strong>极简设计哲学</strong>：仅在 TD3 基础上添加 BC 正则项和状态归一化，无需额外网络架构、预训练生成模型或复杂约束机制",
        "<strong>策略更新公式</strong>：<span class=\"kb-math kb-math-inline\">\\pi = \\arg\\max_\\pi \\; \\mathbb{E}_{(s,a) \\sim \\mathcal{D}} \\left[ \\lambda\\, Q(s, \\pi(s)) - (\\pi(s) - a)^2 \\right]</span>，将 Q 值最大化与行为克隆损失直接相加",
        "<strong>自适应权重归一化</strong>：<span class=\"kb-math kb-math-inline\">\\lambda = \\alpha / \\frac{1}{N}\\sum_{(s_i, a_i)}|Q(s_i, a_i)|</span>，通过 Q 值绝对值均值归一化，使 Q 项和 BC 项量级可比，唯一超参 <span class=\"kb-math kb-math-inline\">\\alpha=2.5</span>",
        "<strong>状态特征归一化</strong>：将状态归一化为均值 0、标准差 1（<span class=\"kb-math kb-math-inline\">\\epsilon=10^{-3}</span> 防除零），提升跨任务稳定性",
        "<strong>D4RL 基准全面评测</strong>：在 Gym MuJoCo 的 random/medium/medium-replay/medium-expert/expert 数据集上全面评估",
        "<strong>计算效率优势</strong>：总训练时间 39 分钟，CQL 需 4h11m，Fisher-BRC 需 2h8m，效率提升超 3 倍",
        "<strong>仅 1 个额外超参数</strong>：<span class=\"kb-math kb-math-inline\">\\alpha=2.5</span> 在所有任务上通用，无需逐任务调参"
      ],
      "detail": "<h5>核心框架示意</h5>\n<p><img alt=\"TD3+BC 与其他离线 RL 方法的实现复杂度对比\" src=\"https://ar5iv.labs.arxiv.org/html/2106.06860/assets/x1.png\" />\n<em>图：Table 1 — 各离线 RL 算法相对于其基础在线算法所需的额外实现改动对比。TD3+BC 仅需添加 BC 损失项和状态归一化，而 CQL、Fisher-BRC 等方法需要大量架构和训练流程修改。</em></p>\n<p><img alt=\"TD3+BC 学习曲线对比\" src=\"https://ar5iv.labs.arxiv.org/html/2106.06860/assets/x5.png\" />\n<em>图：TD3+BC 与 BC、CQL、Fisher-BRC 在 D4RL 数据集上的学习曲线对比。TD3+BC 展现出与 SOTA Fisher-BRC 相似的学习速度和最终性能。</em></p>\n<h5>算法伪代码</h5>\n<pre><code class=\"language-python\"># TD3+BC 核心伪代码\n# 在标准 TD3 基础上仅修改策略更新步骤\n\n# 预处理：计算数据集状态的均值和标准差\nmu_s, sigma_s = dataset.states.mean(), dataset.states.std()\n\nfor step in range(max_steps):\n    # 采样 mini-batch\n    s, a, r, s_next, done = replay_buffer.sample(batch_size)\n\n    # 状态归一化\n    s = (s - mu_s) / (sigma_s + 1e-3)\n    s_next = (s_next - mu_s) / (sigma_s + 1e-3)\n\n    # === Critic 更新（与标准 TD3 完全相同）===\n    with torch.no_grad():\n        a_next = target_actor(s_next) + clipped_noise\n        target_Q = r + gamma * min(target_Q1(s_next, a_next), \n                                     target_Q2(s_next, a_next))\n    critic_loss = MSE(Q1(s, a), target_Q) + MSE(Q2(s, a), target_Q)\n\n    # === Actor 更新（TD3+BC 的核心改动）===\n    if step % policy_delay == 0:\n        pi = actor(s)\n        Q_val = Q1(s, pi)\n        # 自适应权重：归一化 Q 值量级\n        lmbda = alpha / Q_val.abs().mean().detach()\n        # 策略损失 = -λ·Q(s,π(s)) + (π(s)-a)²\n        actor_loss = -lmbda * Q_val.mean() + F.mse_loss(pi, a)\n        actor_optimizer.step(actor_loss)\n</code></pre>\n<h5>动机与背景</h5>\n<p>离线强化学习（Offline RL）旨在从固定的历史数据集中学习策略，无需与环境交互。其核心挑战在于<strong>分布偏移（distribution shift）</strong>：当学习到的策略选择了数据集中未见过的动作时，Q 函数会对这些 OOD（out-of-distribution）动作产生不可靠的高估值，导致策略退化。</p>\n<p>近年来的 SOTA 方法（如 CQL、BRAC、Fisher-BRC）通过各种复杂机制来解决这一问题：CQL 在 Q 函数上添加保守性正则项，BRAC 使用 KL/MMD 散度约束策略，Fisher-BRC 则需要预训练行为策略的生成模型。然而，这些方法引入了大量额外的实现复杂度、超参数和计算开销。</p>\n<div class=\"key-point\">💡 <strong>关键洞察</strong>：作者指出，许多 SOTA 方法的性能提升可能并非来自其复杂的算法创新，而是来自额外的工程细节（如网络架构调整、归一化技巧等）。这启发了一个问题：<strong>能否用最简单的方式达到同样的效果？</strong></div>\n<h5>核心机制详解</h5>\n<p><strong>1. 行为克隆正则化</strong></p>\n<p>TD3+BC 的核心思想极其直观：在标准 TD3 的策略梯度目标中，直接添加一个 MSE 行为克隆损失项：</p>\n<div class=\"kb-math kb-math-display\">\\pi = \\arg\\max_\\pi \\; \\mathbb{E}_{(s,a) \\sim \\mathcal{D}} \\left[ \\lambda\\, Q(s, \\pi(s)) - (\\pi(s) - a)^2 \\right]</div>\n<ul>\n<li>第一项 <span class=\"kb-math kb-math-inline\">\\lambda Q(s, \\pi(s))</span> 是标准的 Q 值最大化目标，驱动策略向高回报方向优化</li>\n<li>第二项 <span class=\"kb-math kb-math-inline\">-(\\pi(s) - a)^2</span> 是行为克隆损失，约束策略输出接近数据集中的实际动作</li>\n</ul>\n<p>这种设计的直觉是：BC 项隐式地将策略约束在数据集的动作分布支撑集内，从而避免 Q 函数对 OOD 动作的错误外推，而 Q 值项则在数据集支撑集内进行策略改进。</p>\n<div class=\"warn-box\">⚠️ <strong>注意</strong>：与显式约束策略分布的方法（如 KL 散度约束）不同，BC 正则项是逐样本的点约束，不需要估计完整的行为策略分布，因此实现极为简单。</div>\n<p><strong>2. 自适应权重 <span class=\"kb-math kb-math-inline\">\\lambda</span> 的设计</strong></p>\n<p>直接将 Q 值和 BC 损失相加面临一个问题：两者的量级可能差异巨大。Q 值的绝对大小取决于奖励尺度和折扣因子，而 BC 损失取决于动作空间的范围。为此，作者设计了自适应归一化权重：</p>\n<div class=\"kb-math kb-math-display\">\\lambda = \\frac{\\alpha}{\\frac{1}{N} \\sum_{(s_i, a_i)} |Q(s_i, a_i)|}</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">\\alpha = 2.5</span> 是唯一的超参数。这个设计确保：\n- Q 值项被归一化到与 BC 项可比的量级\n- <span class=\"kb-math kb-math-inline\">\\alpha</span> 控制 RL 与模仿之间的相对权重\n- 使用 mini-batch 内 Q 值绝对值的均值进行归一化，计算开销几乎为零</p>\n<div class=\"key-point\">💡 <strong>关键</strong>：<span class=\"kb-math kb-math-inline\">\\alpha</span> 的鲁棒性很强——消融实验表明 <span class=\"kb-math kb-math-inline\">\\alpha \\in [2, 3]</span> 范围内性能几乎无差异，仅在极端值（<span class=\"kb-math kb-math-inline\">\\alpha=1</span> 偏向纯模仿，<span class=\"kb-math kb-math-inline\">\\alpha=4</span> 偏向纯 RL）时部分任务性能下降。</div>\n<p><strong>3. 状态特征归一化</strong></p>\n<p>作者对所有状态特征进行标准化处理：</p>\n<div class=\"kb-math kb-math-display\">s = \\frac{s - \\mu_s}{\\sigma_s + \\epsilon}, \\quad \\epsilon = 10^{-3}</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">\\mu_s</span> 和 <span class=\"kb-math kb-math-inline\">\\sigma_s</span> 在整个数据集上预计算。虽然这一改动看似微小，但消融实验表明它在多个任务上提供了稳定的性能提升，尤其是在不同环境的状态特征量级差异较大时。</p>\n<h5>与现有方法的对比</h5>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>特性</th>\n<th>CQL</th>\n<th>Fisher-BRC</th>\n<th>BRAC</th>\n<th>TD3+BC</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>基础算法</td>\n<td>SAC</td>\n<td>SAC</td>\n<td>SAC</td>\n<td>TD3</td>\n</tr>\n<tr>\n<td>额外网络</td>\n<td>无</td>\n<td>行为策略生成模型</td>\n<td>判别器/值网络</td>\n<td>无</td>\n</tr>\n<tr>\n<td>预训练需求</td>\n<td>否</td>\n<td>是（行为策略）</td>\n<td>否</td>\n<td>否</td>\n</tr>\n<tr>\n<td>额外超参数</td>\n<td>多个</td>\n<td>多个</td>\n<td>多个</td>\n<td>1 个（<span class=\"kb-math kb-math-inline\">\\alpha</span>）</td>\n</tr>\n<tr>\n<td>实现改动量</td>\n<td>大</td>\n<td>大</td>\n<td>中</td>\n<td><strong>极小</strong></td>\n</tr>\n<tr>\n<td>训练时间</td>\n<td>4h 11m</td>\n<td>2h 8m</td>\n<td>—</td>\n<td><strong>39m</strong></td>\n</tr>\n</tbody>\n</table></div>\n<div class=\"key-point\">💡 <strong>关键发现</strong>：论文还指出了离线 RL 中一个被忽视的问题——<strong>高 episode 方差</strong>。离线训练的策略相比在线训练的策略，在不同 episode 间的性能波动显著更大。这意味着仅报告平均性能可能掩盖了策略的不稳定性。</div>\n<h5>实验结果</h5>\n<p>在 D4RL Gym MuJoCo 基准的 12 个任务上（HalfCheetah/Hopper/Walker2d × random/medium/medium-replay/medium-expert），TD3+BC 在大多数任务上匹配或超越了 CQL 和 Fisher-BRC 的性能。特别值得注意的是：</p>\n<ul>\n<li>在 <strong>medium</strong> 和 <strong>medium-replay</strong> 数据集上，TD3+BC 表现尤为突出</li>\n<li>在 <strong>expert</strong> 数据集上，TD3+BC 不会退化到低于纯 BC 的水平</li>\n<li>在 <strong>random</strong> 数据集上，RL 组件的贡献最为显著（纯 BC 性能很差）</li>\n</ul>\n<h5>消融实验</h5>\n<p>消融研究验证了三个组件的必要性：\n1. <strong>去除 BC 正则项</strong>：性能大幅下降（除 random 数据集外），证实了行为约束的必要性\n2. <strong>去除 TD3（纯 BC）</strong>：在非 expert 数据集上性能显著下降，证实了 RL 优化的价值\n3. <strong>去除状态归一化</strong>：影响最小但仍在多个任务上提供一致的性能提升</p>",
      "quiz": {
        "q": "TD3+BC 中自适应权重 λ 的设计目的是什么？",
        "options": [
          "加速 Q 网络的收敛速度",
          "将 Q 值项归一化到与 BC 损失项可比的量级，平衡 RL 与模仿信号",
          "防止 Q 值对 OOD 动作的过高估计",
          "动态调整学习率以适应不同训练阶段"
        ],
        "answer": 1,
        "explain": "λ = α / mean(|Q|) 通过 Q 值绝对值均值对 Q 项进行归一化，确保策略损失中 RL 项和 BC 项的量级可比，从而使超参数 α 能够稳定地控制两者的相对权重。"
      }
    },
    {
      "id": "unifloral",
      "num": 16,
      "name": "Unifloral",
      "fullName": "统一离线RL协议 (Unified Offline RL Protocol)",
      "year": "2025",
      "org": "NeurIPS",
      "parent": "cql",
      "paperUrl": "https://neurips.cc/virtual/2025/oral/105555",
      "projectUrl": "",
      "category": "offline_rl",
      "motivation": "统一评估协议量化在线调参预算",
      "summary": "Unifloral 的核心目标是：统一评估协议量化在线调参预算。",
      "keyPoints": [
        "核心动机：统一评估协议量化在线调参预算",
        "演化来源：继承或改进自 cql",
        "代表机构：NeurIPS"
      ],
      "detail": "<p>统一评估协议量化在线调参预算</p>"
    },
    {
      "id": "cpql",
      "num": 17,
      "name": "CPQL",
      "fullName": "保守Peng's Q学习 (Conservative Peng's Q-Learning)",
      "year": "2026",
      "org": "ICLR",
      "parent": "cql",
      "paperUrl": "https://openreview.net/forum?id=Ml4AtrrfQT",
      "projectUrl": "",
      "category": "offline_rl",
      "motivation": "Peng's Q算子保守价值估计",
      "summary": "CPQL 的核心目标是：Peng's Q算子保守价值估计。",
      "keyPoints": [
        "核心动机：Peng's Q算子保守价值估计",
        "演化来源：继承或改进自 cql",
        "代表机构：ICLR"
      ],
      "detail": "<p>Peng's Q算子保守价值估计</p>"
    },
    {
      "id": "safefql",
      "num": 18,
      "name": "SafeFQL",
      "fullName": "安全流Q学习 (Safe Flow Q-Learning)",
      "year": "2026",
      "org": "arXiv",
      "parent": "iql",
      "paperUrl": "https://arxiv.org/abs/2603.15136",
      "projectUrl": "",
      "category": "offline_rl",
      "motivation": "可达性流策略扩展安全边界",
      "summary": "SafeFQL 的核心目标是：可达性流策略扩展安全边界。",
      "keyPoints": [
        "核心动机：可达性流策略扩展安全边界",
        "演化来源：继承或改进自 iql",
        "代表机构：arXiv"
      ],
      "detail": "<h5>框架示意</h5>\n<div class=\"img-wrap\"><img src=\"https://ar5iv.labs.arxiv.org/html/2603.15136/assets/x1.png\" alt=\"SafeFQL framework overview\" loading=\"lazy\"><p class=\"img-caption\">▲ SafeFQL framework overview</p></div>\n<p>图中展示了 SafeFQL 的三条主线：从离线数据学习奖励与安全 critic，用 flow matching 拟合行为分布，再把 flow 教师压缩为一步策略。需要注意的是，SafeFQL 的安全不是在执行时做后处理，而是提前进入 actor 训练目标。</p>\n<h5>从 FQL 到安全离线 RL</h5>\n<p>FQL 的基本思想是先用 flow 模型描述数据中的行为动作分布，再通过 Q 函数把策略推向高价值动作。SafeFQL 保留了这一点，但将目标从单纯的</p>\n<div class=\"kb-math kb-math-display\">\\max_\\pi \\mathbb{E}_{s \\sim \\mathcal{D}, a \\sim \\pi(\\cdot|s)}[Q_r(s,a)]</div>\n<p>改成带可行域的优化：</p>\n<div class=\"kb-math kb-math-display\">\\max_\\pi \\mathbb{E}[Q_r(s,\\pi(s))] \\quad\n\\text{s.t.}\\quad Q_c(s,\\pi(s)) \\le \\tau .</div>\n<p>这里 $Q_r$ 是任务回报 critic，$Q_c$ 是安全 critic，$\\tau$ 是经过校准的安全阈值。这个形式的关键不是惩罚危险动作，而是把危险动作排除在 actor 的有效改进区域之外。</p>\n<h5>Hamilton-Jacobi 安全 critic</h5>\n<p>论文使用可达性视角描述安全：如果从当前状态动作出发，在未来某个时间会不可避免地进入失败集合，那么这个点就应被判为不安全。可达安全值可以写成类似</p>\n<div class=\"kb-math kb-math-display\">V_\\ell^\\*(x_0)=\\min_\\pi \\max_{t\\ge0}\\ell(x_t),</div>\n<p>其中 $\\ell(x)$ 是安全边界函数，$\\ell(x)\\le0$ 通常表示安全。对应到离线 TD 训练时，安全 critic 使用 reachability 风格的 max-backup：</p>\n<div class=\"kb-math kb-math-display\">Q_c(s,a) \\leftarrow \\max\\left(\\ell(s), \\min_{a&#x27;} Q_c(s&#x27;,a&#x27;)\\right).</div>\n<p>这与累计 cost 的区别很大：累计 cost 可能把一次灾难事件平均掉，而可达性备份关注轨迹上的最坏状态，因此更适合碰撞、越界、跌倒这类“不能发生一次”的具身任务。</p>\n<h5>一步 flow 策略提取</h5>\n<p>SafeFQL 先训练一个 flow 行为教师，用连续时间流把简单噪声分布变换为数据动作分布；随后训练一个一步 actor 近似教师动作，同时用奖励 critic 做改进。actor 的损失可以概括为</p>\n<div class=\"kb-math kb-math-display\">\\mathcal{L}_{actor}\n= - Q_r(s,\\pi_\\theta(s))\n+ \\lambda \\|\\pi_\\theta(s)-a_{flow}(s)\\|_2^2\n+ \\alpha [Q_c(s,\\pi_\\theta(s))-\\tau]_+ .</div>\n<p>第二项保证 actor 不偏离离线数据支持集太远，第三项把安全约束转为可优化的 hinge penalty。实际训练中，论文强调“feasibility-gated”的更新：只有安全 critic 判断可行时才鼓励策略追逐更高奖励。</p>\n<h5>Conformal 校准</h5>\n<p>离线 critic 难免存在估计误差，尤其在分布边缘的危险区域。SafeFQL 将一部分离线数据留作校准集，计算安全分数的经验分位数，并用 conformal prediction 调整 $\\tau$。直观地说，如果校准集中真实不安全轨迹经常被 critic 低估，阈值就会变得更保守。</p>\n<p>这种校准不需要改变训练数据，也不要求知道真实动力学模型。它提供的是有限样本意义下的概率覆盖保证，适合作为离线安全 RL 中 critic 过度乐观的补丁。</p>\n<h5>算法伪代码</h5>\n<pre><code class=\"language-text\">Input: offline dataset D, safety boundary l(s), target risk alpha\n\n1. Split D into training data D_train and calibration data D_cal.\n2. Train reward critic Q_r with offline TD or IQL-style targets.\n3. Train reachability critic Q_c using max-backup:\n      target_c = max(l(s), min_a' Q_c_target(s', a'))\n4. Fit a flow behavior teacher p_flow(a | s) on D_train.\n5. Distill a one-step actor pi_theta(s):\n      keep pi close to flow teacher\n      maximize Q_r(s, pi(s))\n      penalize or mask actions with Q_c(s, pi(s)) &gt; tau\n6. On D_cal, compute conformal residuals for safety prediction.\n7. Set calibrated threshold tau_alpha by the empirical quantile.\n8. Deploy one-step actor with the calibrated safety gate.\n\nOutput: safe one-step policy pi_theta\n</code></pre>\n<h5>适用边界</h5>\n<p>SafeFQL 适合安全约束明确、失败集合可由状态函数描述的任务，例如导航越界、机器人碰撞、速度限制或姿态跌倒。它不解决“安全函数本身不可观测”的问题；如果 $\\ell(s)$ 或离线数据中的失败标注不可靠，reachability critic 也会学习到错误边界。</p>\n<p>另外，论文是 2026 年 arXiv 工作，公开资料主要来自论文页面与 HTML 版本。这里的解读基于论文公开摘要、方法图、算法描述和可达性 RL 的标准递推形式；若后续正式版本修改实现细节，应以最终论文为准。</p>"
    },
    {
      "id": "gail",
      "num": 19,
      "name": "GAIL",
      "fullName": "生成对抗模仿学习 (Generative Adversarial Imitation Learning)",
      "year": "2016",
      "org": "Stanford",
      "parent": "—",
      "paperUrl": "https://arxiv.org/abs/1606.03476",
      "projectUrl": "",
      "category": "skill_hierarchical",
      "motivation": "生成对抗框架模仿专家演示",
      "summary": "GAIL 将生成对抗网络 (GAN) 的思想引入模仿学习，提出通过最小化策略与专家的 **占用度量 (occupancy measure)** 之间的 Jensen-Shannon 散度来直接学习策略，绕过了传统逆强化学习中显式恢复奖励函数的中间步骤，在高维连续控制任务上以极少量专家演示实现了接近专家水平的表现。",
      "keyPoints": [
        "<strong>理论基础——占用度量匹配</strong>：证明了 IRL 本质上是寻找一个占用度量与专家匹配的策略，将模仿学习问题转化为分布匹配问题",
        "<strong>GAN 式对抗训练框架</strong>：策略网络 <span class=\"kb-math kb-math-inline\">\\pi_\\theta</span> 作为生成器，判别器网络 <span class=\"kb-math kb-math-inline\">D_w</span> 区分策略与专家的 (state, action) 对，二者交替优化",
        "<strong>新型代价正则化器 <span class=\"kb-math kb-math-inline\">\\psi_{\\text{GA}}</span></strong>：其凸共轭恰好等价于 JS 散度，使得优化目标可以用判别器的分类损失表示",
        "<strong>核心优化目标</strong>：<span class=\"kb-math kb-math-inline\">\\min_\\pi D_{\\text{JS}}(\\rho_\\pi, \\rho_{\\pi_E}) - \\lambda H(\\pi)</span>，其中 <span class=\"kb-math kb-math-inline\">\\lambda H(\\pi)</span> 为因果熵正则项",
        "<strong>TRPO 策略更新</strong>：使用 Trust Region Policy Optimization 进行策略步，防止策略因梯度噪声而剧烈变化",
        "<strong>判别器即代价函数</strong>：<span class=\"kb-math kb-math-inline\">c(s,a) = \\log D_w(s,a)</span> 直接作为策略优化的代价信号，无需显式恢复奖励",
        "<strong>实验验证</strong>：在 9 个 MuJoCo 物理仿真环境上超越 Behavioral Cloning、FEM、GTAL 等基线，尤其在高维 Humanoid 任务上优势显著"
      ],
      "detail": "<h5>核心框架示意</h5>\n<p><img alt=\"GAIL 实验结果：MuJoCo 连续控制任务上的性能对比\" src=\"https://ar5iv.labs.arxiv.org/html/1606.03476/assets/x1.png\" />\n<em>图：GAIL 在多个 MuJoCo 环境上与基线方法的性能对比。横轴为专家演示轨迹数，纵轴为归一化性能。GAIL（红色）在几乎所有任务和数据量设置下均达到或接近专家水平。</em></p>\n<h5>算法伪代码</h5>\n<pre><code>Algorithm 1: Generative Adversarial Imitation Learning (GAIL)\n──────────────────────────────────────────────────────\n输入: 专家轨迹 τ_E ~ π_E, 初始参数 θ_0, w_0\n\nfor i = 0, 1, 2, ... do\n    1. 采样当前策略轨迹: τ_i ~ π_{θ_i}\n\n    2. 更新判别器 (Adam 梯度上升):\n       w_{i+1} ← w_i + α_w · ∇_w [ Ê_{τ_i}[log D_w(s,a)]\n                                    + Ê_{τ_E}[log(1 - D_w(s,a))] ]\n\n    3. 更新策略 (TRPO 步):\n       θ_{i+1} ← TRPO_step(θ_i, cost = log D_{w_{i+1}}(s,a))\n       即: 以 log D_w(s,a) 为代价函数，用 TRPO 减小期望代价\n\nend for\n\n输出: 学到的策略 π_{θ}\n</code></pre>\n<h5>动机与背景</h5>\n<p><strong>传统模仿学习的困境：</strong> 从专家演示中学习策略有两条经典路径：</p>\n<ol>\n<li>\n<p><strong>行为克隆 (Behavioral Cloning)</strong>：将模仿学习视为监督学习，直接拟合 <span class=\"kb-math kb-math-inline\">\\pi(a|s)</span>。简单高效，但受 <strong>分布漂移 (distribution shift)</strong> 问题困扰——策略执行时遇到的状态分布与训练数据不同，误差会随时间步指数累积（复合误差问题）。</p>\n</li>\n<li>\n<p><strong>逆强化学习 (IRL)</strong>：先从专家演示中恢复奖励函数 <span class=\"kb-math kb-math-inline\">r(s,a)</span>，再用 RL 优化策略。理论上更鲁棒，但存在两大瓶颈：(a) 奖励函数恢复本身是一个欠定问题（多个奖励可解释同一行为）；(b) 需要在内循环中反复求解完整的 RL 问题，计算代价极高。</p>\n</li>\n</ol>\n<div class=\"key-point\">💡 <strong>关键洞察</strong>：GAIL 的核心观察是——如果最终目标是获得策略而非奖励函数，那么 IRL 的中间步骤（恢复奖励）是不必要的。可以直接将模仿学习表述为策略的占用度量与专家占用度量之间的分布匹配问题。</div>\n<h5>理论基础：占用度量 (Occupancy Measure)</h5>\n<p>论文的理论贡献建立在<strong>占用度量</strong>这一概念之上。对于策略 <span class=\"kb-math kb-math-inline\">\\pi</span>，其占用度量定义为：</p>\n<div class=\"kb-math kb-math-display\">\\rho_\\pi(s,a) = \\pi(a|s) \\sum_{t=0}^{\\infty} \\gamma^t P(s_t = s | \\pi)</div>\n<p>这是策略在执行过程中访问各 (state, action) 对的折扣频率分布。论文证明了一个关键定理：</p>\n<div class=\"warn-box\">⚠️ <strong>核心定理 (Theorem 2)</strong>：策略与占用度量之间存在一一对应关系 <span class=\"kb-math kb-math-inline\">\\pi \\leftrightarrow \\rho_\\pi</span>。因此，匹配占用度量等价于匹配策略。</div>\n<p>基于此，IRL 的一般形式可以写为：</p>\n<div class=\"kb-math kb-math-display\">\\max_{c \\in \\mathcal{C}} \\left( \\min_\\pi -H(\\pi) + \\mathbb{E}_\\pi[c(s,a)] \\right) - \\mathbb{E}_{\\pi_E}[c(s,a)]</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">\\mathcal{C}</span> 是代价函数类。通过对偶变换，这等价于：</p>\n<div class=\"kb-math kb-math-display\">\\min_\\pi -H(\\pi) + \\psi^*(\\rho_\\pi - \\rho_{\\pi_E})</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">\\psi^*</span> 是正则化器 <span class=\"kb-math kb-math-inline\">\\psi</span> 的凸共轭。不同的正则化器 <span class=\"kb-math kb-math-inline\">\\psi</span> 对应不同的 IRL/模仿学习算法。</p>\n<h5>核心创新：<span class=\"kb-math kb-math-inline\">\\psi_{\\text{GA}}</span> 正则化器与 GAN 连接</h5>\n<p>GAIL 的关键创新在于提出了一个新的代价正则化器 <span class=\"kb-math kb-math-inline\">\\psi_{\\text{GA}}</span>：</p>\n<div class=\"kb-math kb-math-display\">\\psi_{\\text{GA}}(c) \\triangleq \\begin{cases} \\mathbb{E}_{\\pi_E}[g(c(s,a))] &amp; \\text{if } c &lt; 0 \\\\ +\\infty &amp; \\text{otherwise} \\end{cases}</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">g(x) = -x - \\log(1 - e^x)</span>（当 <span class=\"kb-math kb-math-inline\">x &lt; 0</span> 时）。</p>\n<p>这个看似复杂的正则化器有一个优美的性质——其凸共轭恰好等于 <strong>GAN 的判别器目标</strong>：</p>\n<div class=\"kb-math kb-math-display\">\\psi_{\\text{GA}}^*(\\rho_\\pi - \\rho_{\\pi_E}) = \\max_{D \\in (0,1)^{\\mathcal{S} \\times \\mathcal{A}}} \\mathbb{E}_\\pi[\\log D(s,a)] + \\mathbb{E}_{\\pi_E}[\\log(1 - D(s,a))]</div>\n<p>这正是二分类问题的最优负对数损失，等价于（相差常数）策略与专家占用度量之间的 <strong>Jensen-Shannon 散度</strong>：</p>\n<div class=\"kb-math kb-math-display\">D_{\\text{JS}}(\\rho_\\pi, \\rho_{\\pi_E}) = D_{\\text{KL}}\\left(\\rho_\\pi \\middle\\| \\frac{\\rho_\\pi + \\rho_{\\pi_E}}{2}\\right) + D_{\\text{KL}}\\left(\\rho_{\\pi_E} \\middle\\| \\frac{\\rho_\\pi + \\rho_{\\pi_E}}{2}\\right)</div>\n<div class=\"key-point\">💡 <strong>GAN 类比</strong>：策略 <span class=\"kb-math kb-math-inline\">\\pi</span> 扮演 GAN 中生成器的角色——它生成 (state, action) 轨迹数据；判别器 <span class=\"kb-math kb-math-inline\">D</span> 试图区分策略生成的数据与专家数据。当判别器无法区分二者时，策略就成功模仿了专家。</div>\n<h5>完整优化目标与训练流程</h5>\n<p>将因果熵 <span class=\"kb-math kb-math-inline\">H(\\pi)</span> 作为策略正则项（由 <span class=\"kb-math kb-math-inline\">\\lambda \\geq 0</span> 控制），GAIL 的完整优化目标为：</p>\n<div class=\"kb-math kb-math-display\">\\min_\\pi \\max_D \\ \\mathbb{E}_\\pi[\\log D(s,a)] + \\mathbb{E}_{\\pi_E}[\\log(1 - D(s,a))] - \\lambda H(\\pi)</div>\n<p>训练交替进行两步：</p>\n<p><strong>Step 1 — 判别器更新（Adam 梯度上升）：</strong> 固定策略 <span class=\"kb-math kb-math-inline\">\\pi_{\\theta_i}</span>，用采样的策略轨迹和专家轨迹更新判别器参数 <span class=\"kb-math kb-math-inline\">w</span>，使其更好地区分策略数据与专家数据：</p>\n<div class=\"kb-math kb-math-display\">\\nabla_w \\left[ \\hat{\\mathbb{E}}_{\\tau_i}[\\log D_w(s,a)] + \\hat{\\mathbb{E}}_{\\tau_E}[\\log(1 - D_w(s,a))] \\right]</div>\n<p><strong>Step 2 — 策略更新（TRPO 步）：</strong> 将判别器输出 <span class=\"kb-math kb-math-inline\">\\log D_{w_{i+1}}(s,a)</span> 作为代价函数，使用 TRPO 更新策略参数 <span class=\"kb-math kb-math-inline\">\\theta</span>，使策略向\"更像专家\"的方向移动。TRPO 通过 KL 散度约束确保每步更新幅度可控：</p>\n<div class=\"kb-math kb-math-display\">\\theta_{i+1} = \\arg\\min_\\theta \\ \\mathbb{E}_{\\pi_\\theta}[\\log D_{w_{i+1}}(s,a)] \\quad \\text{s.t.} \\ \\overline{D}_{\\text{KL}}(\\pi_{\\theta_i}, \\pi_\\theta) \\leq \\delta</div>\n<div class=\"warn-box\">⚠️ <strong>TRPO 的必要性</strong>：由于策略梯度估计的高方差，普通梯度下降容易导致策略崩溃。TRPO 的信赖域约束是 GAIL 稳定训练的关键保障。</div>\n<h5>与传统方法的对比</h5>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>方法</th>\n<th style=\"text-align: center;\">是否需要恢复奖励</th>\n<th style=\"text-align: center;\">是否需要 RL 内循环</th>\n<th style=\"text-align: center;\">可扩展性</th>\n<th style=\"text-align: center;\">表达能力</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>Behavioral Cloning</td>\n<td style=\"text-align: center;\">✗</td>\n<td style=\"text-align: center;\">✗</td>\n<td style=\"text-align: center;\">✓</td>\n<td style=\"text-align: center;\">受分布漂移限制</td>\n</tr>\n<tr>\n<td>MaxEnt IRL</td>\n<td style=\"text-align: center;\">✓</td>\n<td style=\"text-align: center;\">✓</td>\n<td style=\"text-align: center;\">✗（需枚举状态）</td>\n<td style=\"text-align: center;\">受代价函数类限制</td>\n</tr>\n<tr>\n<td>线性 Apprenticeship Learning</td>\n<td style=\"text-align: center;\">✓</td>\n<td style=\"text-align: center;\">✓</td>\n<td style=\"text-align: center;\">✓（用 TRPO）</td>\n<td style=\"text-align: center;\">仅线性代价函数</td>\n</tr>\n<tr>\n<td><strong>GAIL</strong></td>\n<td style=\"text-align: center;\"><strong>✗</strong></td>\n<td style=\"text-align: center;\"><strong>✗</strong></td>\n<td style=\"text-align: center;\"><strong>✓</strong></td>\n<td style=\"text-align: center;\"><strong>任意复杂行为</strong></td>\n</tr>\n</tbody>\n</table></div>\n<p>GAIL 的核心优势在于：\n1. <strong>绕过奖励恢复</strong>：直接优化策略，避免了 IRL 的欠定性问题\n2. <strong>无需 RL 内循环</strong>：判别器梯度步替代了完整的 RL 求解\n3. <strong>表达能力强</strong>：神经网络判别器可以表示任意复杂的代价函数，不受线性/凸函数类限制\n4. <strong>数据高效</strong>：在专家数据方面非常高效，少量演示即可学到良好策略</p>\n<h5>实验亮点</h5>\n<p>论文在 9 个经典 MuJoCo 连续控制任务上进行了实验（CartPole、Mountain Car、Reacher、HalfCheetah、Hopper、Walker、Ant、Humanoid、Disabled Ant），对比了 4 种基线方法：</p>\n<ul>\n<li><strong>Behavioral Cloning</strong>：直接监督学习</li>\n<li><strong>FEM (Feature Expectation Matching)</strong>：线性代价函数的 IRL</li>\n<li><strong>GTAL (Game-Theoretic Apprenticeship Learning)</strong>：凸代价函数的 IRL</li>\n<li><strong>Random</strong>：随机策略</li>\n</ul>\n<p>关键发现：\n- GAIL 在几乎所有任务上以 ≥70% 的专家性能稳定运行\n- 在高维 <strong>Humanoid</strong>（376 维观测）任务上，GAIL 在所有数据量设置下均达到 100% 专家性能，而 Behavioral Cloning 最高仅 60%\n- FEM 和 GTAL 在 Ant 任务上甚至不如随机策略\n- 因果熵正则化 <span class=\"kb-math kb-math-inline\">\\lambda &gt; 0</span> 在部分任务上有帮助，但 <span class=\"kb-math kb-math-inline\">\\lambda = 0</span> 已经足够好</p>",
      "quiz": {
        "q": "GAIL 中判别器 D(s,a) 的输出在策略优化中扮演什么角色？",
        "options": [
          "直接作为策略网络的监督标签",
          "作为策略优化的代价函数 c(s,a) = log D(s,a)",
          "用于估计状态价值函数 V(s)",
          "用于计算专家策略的占用度量"
        ],
        "answer": 1,
        "explain": "GAIL 将 log D(s,a) 作为代价函数传入 TRPO 策略优化步骤。当 D 认为 (s,a) 来自策略（而非专家）时，log D 较大（代价高），驱动策略向专家行为靠拢。"
      }
    },
    {
      "id": "option_critic",
      "num": 20,
      "name": "Option-Critic",
      "fullName": "选项-评论家 (Option-Critic Architecture)",
      "year": "2017",
      "org": "AAAI",
      "parent": "—",
      "paperUrl": "https://arxiv.org/abs/1609.05140",
      "projectUrl": "",
      "category": "skill_hierarchical",
      "motivation": "自动学习子策略与终止条件",
      "summary": "Option-Critic 的核心目标是：自动学习子策略与终止条件。",
      "keyPoints": [
        "核心动机：自动学习子策略与终止条件",
        "代表机构：AAAI"
      ],
      "detail": "<h5>论文图示</h5>\n<div class=\"img-wrap\"><img src=\"https://ar5iv.labs.arxiv.org/html/1609.05140/assets/x1.png\" alt=\"Option-Critic experimental illustration\" loading=\"lazy\"><p class=\"img-caption\">▲ Option-Critic experimental illustration</p></div>\n<p>原论文主要用 Four Rooms、Pinball 与 Atari 实验展示学习到的 options 与学习曲线，而不是给出单独的网络结构图。上图来自论文 HTML 版本，用于帮助理解 option 在环境中形成可复用的时序行为。</p>\n<h5>Options 的参数化</h5>\n<p>一个 option 可表示为三元组</p>\n<div class=\"kb-math kb-math-display\">\\omega = (\\mathcal{I}_\\omega,\\pi_\\omega,\\beta_\\omega),</div>\n<p>其中 $\\mathcal{I}<em>\\omega$ 是可启动集合，$\\pi</em>\\omega(a|s)$ 是 option 内策略，$\\beta_\\omega(s)$ 是终止概率。Option-Critic 的常见设定是所有 option 在所有状态都可启动，即 $\\mathcal{I}_\\omega=\\mathcal{S}$，这样模型重点放在学习内部行为与终止边界。</p>\n<p>执行时采用 call-and-return 机制：高层先采样一个 option，低层连续执行该 option 的动作；每一步之后根据 $\\beta_\\omega(s')$ 判断是否终止。如果终止，就由 $\\pi_\\Omega$ 重新选 option；如果不终止，就继续沿用当前 option。</p>\n<h5>Intra-option policy gradient</h5>\n<p>Option-Critic 的第一条核心结果是 option 内策略梯度：</p>\n<div class=\"kb-math kb-math-display\">\\frac{\\partial \\rho}{\\partial \\theta}\n= \\sum_{s,\\omega}\\mu_\\Omega(s,\\omega|s_0,\\omega_0)\n\\sum_a\n\\frac{\\partial \\pi_{\\omega,\\theta}(a|s)}{\\partial\\theta}\nQ_U(s,\\omega,a).</div>\n<p>$Q_U(s,\\omega,a)$ 表示在状态 $s$、当前 option 为 $\\omega$ 时采取动作 $a$ 的价值；$\\mu_\\Omega$ 是状态-option 对的折扣访问分布。这个公式说明，option 内策略可以像普通策略梯度一样训练，只是 critic 需要知道当前 option。</p>\n<h5>终止函数梯度</h5>\n<p>第二条核心结果是终止函数梯度：</p>\n<div class=\"kb-math kb-math-display\">\\frac{\\partial \\rho}{\\partial \\vartheta}\n= - \\sum_{s&#x27;,\\omega}\n\\mu_\\Omega(s&#x27;,\\omega|s_1,\\omega_0)\n\\frac{\\partial \\beta_{\\omega,\\vartheta}(s&#x27;)}{\\partial \\vartheta}\nA_\\Omega(s&#x27;,\\omega),</div>\n<p>其中</p>\n<div class=\"kb-math kb-math-display\">A_\\Omega(s,\\omega)=Q_\\Omega(s,\\omega)-V_\\Omega(s).</div>\n<p>负号很重要：当当前 option 比重新选择的平均价值更好时，$A_\\Omega&gt;0$，梯度会降低终止概率；当当前 option 已经不合适时，$A_\\Omega&lt;0$，终止概率会上升。这让 option 学到相对自然的边界，而不是人为规定固定长度。</p>\n<h5>Actor-Critic 实现</h5>\n<p>深度实现中，critic 估计 $Q_\\Omega(s,\\omega)$、$V_\\Omega(s)$ 或 $Q_U(s,\\omega,a)$；actor 同时更新 $\\pi_\\Omega$、$\\pi_\\omega$ 和 $\\beta_\\omega$。经验上，终止函数可能过早学成“每步都终止”，因此论文实现中会加入 termination regularization 或 deliberation cost 的思想，让 option 保持一定持续性。</p>\n<p>Option-Critic 的优势在于形式统一：它不需要额外的子目标奖励，也不要求环境暴露层次结构。缺点也同样明显：所有 option 都从同一个任务回报中学习，在稀疏奖励或长程探索任务中，option 可能塌缩成相似策略，难以自动产生真正有语义的技能。</p>\n<h5>算法伪代码</h5>\n<pre><code class=\"language-text\">Initialize policy over options pi_Omega, intra-option policies pi_omega,\ntermination functions beta_omega, and critic Q_Omega.\n\nfor each episode:\n    observe state s\n    sample option omega ~ pi_Omega(. | s)\n    while episode not done:\n        sample action a ~ pi_omega(. | s)\n        execute a, observe r, s'\n\n        update critic with option-value TD target\n        update intra-option policy using Q_U(s, omega, a)\n        update beta_omega(s') using - d beta * A_Omega(s', omega)\n\n        if beta_omega(s') terminates:\n            sample new option omega ~ pi_Omega(. | s')\n        s = s'\n\nOutput: learned options and high-level option policy\n</code></pre>\n<h5>经验结论</h5>\n<p>在 Four Rooms 中，Option-Critic 能学到穿越门口、移动到房间区域等具有持续性的 option；在 Atari 中，它可以在端到端像素输入上联合学习 option 与控制策略。它的价值更多在于提供了“可微 options”的通用接口，而不是保证每次都能发现人类可解释的技能。</p>"
    },
    {
      "id": "feudal",
      "num": 21,
      "name": "FeUdal Networks",
      "fullName": "封建网络 (FeUdal Networks)",
      "year": "2017",
      "org": "DeepMind",
      "parent": "option_critic",
      "paperUrl": "https://arxiv.org/abs/1703.01161",
      "projectUrl": "",
      "category": "skill_hierarchical",
      "motivation": "主从架构分离目标设定与执行",
      "summary": "FeUdal Networks 的核心目标是：主从架构分离目标设定与执行。",
      "keyPoints": [
        "核心动机：主从架构分离目标设定与执行",
        "演化来源：继承或改进自 option_critic",
        "代表机构：DeepMind"
      ],
      "detail": "<h5>架构示意</h5>\n<div class=\"img-wrap\"><img src=\"https://ar5iv.labs.arxiv.org/html/1703.01161/assets/x1.png\" alt=\"FeUdal Networks architecture\" loading=\"lazy\"><p class=\"img-caption\">▲ FeUdal Networks architecture</p></div>\n<p>图中可以看到共享感知模块、Manager、Worker 与目标调制动作层。Manager 生成的 goal 不是直接动作，而是传给 Worker 的条件信号。</p>\n<h5>Manager 与 Worker</h5>\n<p>设感知网络把观测编码为 latent state $s_t$。Manager 在较慢时间尺度上输出 goal：</p>\n<div class=\"kb-math kb-math-display\">g_t = \\frac{h_t^M}{\\|h_t^M\\|_2},</div>\n<p>其中 $h_t^M$ 来自 Manager 的循环网络状态。Worker 接收当前状态和若干最近 goals，生成动作策略 $\\pi_W(a_t|s_t,g_t)$。Worker 的动作 logits 可理解为由状态相关的动作嵌入矩阵 $U_t$ 与 goal embedding $w_t$ 相乘得到：</p>\n<div class=\"kb-math kb-math-display\">\\pi_W(a_t|s_t,g_t) = \\text{softmax}(U_t w_t).</div>\n<p>这个结构让 goal 改变动作偏好，而不是简单拼接到输入后交给普通 MLP。</p>\n<h5>内在奖励</h5>\n<p>Worker 的学习信号来自 goal 与实际状态变化方向的对齐。若 $c$ 是高层时间跨度，内在奖励可概括为</p>\n<div class=\"kb-math kb-math-display\">r_t^I = \\frac{1}{c}\\sum_{i=1}^{c}\n\\cos(s_t - s_{t-i}, g_{t-i}).</div>\n<p>也就是说，如果 Worker 的动作让 latent state 按照 Manager 指定方向移动，它就得到正奖励。这个设计把高层 goal 转换成低层可密集学习的信号，使 Worker 不必等待稀疏外部奖励。</p>\n<h5>Manager 的长程学习</h5>\n<p>Manager 不直接被 Worker 的动作损失训练，而是通过外部回报学习“什么方向有助于任务”。论文提出 transition policy gradient，将 Manager 的 goal 与未来 latent transition 的方向联系起来。直观地说，如果某个 goal 之后的未来状态变化带来了高外部回报，那么 Manager 应该更倾向输出类似方向。</p>\n<p>Manager 还使用 dilated LSTM 增强长程记忆，减少每一步都反向传播造成的短视问题。这样，高层既能看到较长历史，又不会被低层动作频率淹没。</p>\n<h5>与 Option-Critic 的差异</h5>\n<p>Option-Critic 学习的是离散 option 及其终止概率，核心问题是“哪个 option 继续执行”。FuN 则没有显式终止函数，而是让 Manager 周期性地产生连续 goal。它把层次结构从“选择一个子策略”改成“给低层一个方向性控制信号”。</p>\n<p>这种连续目标形式在高维控制和像素输入上更灵活，但解释性弱于传统 options。一个 latent goal 未必对应人类能命名的技能，它只需要在表征空间中对 Worker 有用。</p>\n<h5>算法伪代码</h5>\n<pre><code class=\"language-text\">Initialize shared encoder, Manager M, Worker W.\n\nfor each rollout:\n    encode observation o_t into latent state s_t\n    Manager produces normalized goal g_t at a slower temporal scale\n    Worker receives s_t and recent goals\n    Worker samples primitive action a_t\n    environment returns extrinsic reward r_t and next observation\n\n    compute intrinsic reward r_t^I from cosine alignment:\n        direction = s_t - s_{t-c}\n        r_t^I = cosine(direction, previous Manager goal)\n\n    update Worker to maximize intrinsic reward and action return\n    update Manager with extrinsic reward using transition policy gradient\n    stop Worker gradients from directly updating Manager\n\nOutput: hierarchical Manager-Worker policy\n</code></pre>\n<h5>适用与局限</h5>\n<p>FuN 适合存在长程依赖、稀疏外部奖励、但可以通过状态表征变化定义进展的任务。它的主要风险在于 latent space 质量：如果编码器没有学到与任务进展相关的表示，Manager 的方向目标就可能变成噪声。另外，goal 的时间跨度 $c$ 是重要超参，太短会退化成普通低层控制，太长则让 Worker 难以完成目标。</p>"
    },
    {
      "id": "her",
      "num": 22,
      "name": "HER",
      "fullName": "后见经验回放 (Hindsight Experience Replay)",
      "year": "2017",
      "org": "OpenAI",
      "parent": "—",
      "paperUrl": "https://arxiv.org/abs/1707.01495",
      "projectUrl": "",
      "category": "skill_hierarchical",
      "motivation": "后见经验回放解决稀疏奖励",
      "summary": "HER 的核心目标是：后见经验回放解决稀疏奖励。",
      "keyPoints": [
        "核心动机：后见经验回放解决稀疏奖励",
        "代表机构：OpenAI"
      ],
      "detail": "<h5>示意图</h5>\n<div class=\"img-wrap\"><img src=\"https://images.ctfassets.net/kftzwdyauwt9/305fUDgKTf0wZ8IXN8FHNv/7f3b757f7f3cc08899ea9bc53ce056c0/ingredients-for-robotics-research-5.png?w=3840&amp;q=90&amp;fm=webp\" alt=\"HER FetchPush illustration\" loading=\"lazy\"><p class=\"img-caption\">▲ HER FetchPush illustration</p></div>\n<p>论文 arXiv HTML 中的图片资源未能稳定解析；这里使用 OpenAI 官方 robotics/HER 相关文章中的 FetchPush 示意图。它展示的是 HER 最典型的设定：机械臂推动物体到目标位置，奖励只在达到目标时给出。</p>\n<h5>Goal-conditioned 形式</h5>\n<p>HER 假设状态中可以区分 desired goal $g$ 与 achieved goal $m(s)$。奖励函数由目标决定：</p>\n<div class=\"kb-math kb-math-display\">r_g(s,a,s&#x27;) =\n\\begin{cases}\n0, &amp; \\|m(s&#x27;)-g\\| \\le \\epsilon,\\\\\n-1, &amp; \\text{otherwise}.\n\\end{cases}</div>\n<p>策略和 critic 都接收目标：</p>\n<div class=\"kb-math kb-math-display\">a_t \\sim \\pi_\\theta(a|s_t,g), \\quad Q_\\phi = Q_\\phi(s_t,a_t,g).</div>\n<p>这样，同一段状态动作轨迹可以在不同目标下拥有不同奖励。HER 的全部威力都来自这个可重解释性。</p>\n<h5>后见重标注</h5>\n<p>假设一条 episode 的原始目标是 $g$，轨迹为</p>\n<div class=\"kb-math kb-math-display\">(s_0,a_0,s_1,\\ldots,s_T).</div>\n<p>普通 replay 只存储原始 transition：</p>\n<div class=\"kb-math kb-math-display\">(s_t,g,a_t,r_g(s_t,a_t,s_{t+1}),s_{t+1},g).</div>\n<p>HER 会额外采样一个后见目标 $g' = m(s_k)$，其中 $k&gt;t$ 通常来自同一轨迹的未来时间步，然后重算奖励：</p>\n<div class=\"kb-math kb-math-display\">r_{g&#x27;}(s_t,a_t,s_{t+1}).</div>\n<p>如果智能体最终碰巧把物体推到了某个位置，那么以这个位置为目标时，轨迹后段就包含成功样本。稀疏奖励不再意味着 replay buffer 里几乎全是失败。</p>\n<h5>为什么 future 策略有效</h5>\n<p>future 策略从当前 transition 之后的 achieved goals 中采样 $g'$。这比 random 更有效，因为未来状态确实受当前动作影响；也比只用 final 更丰富，因为一条轨迹里有多个中间达成目标。它让 critic 看到“当前动作如何推动系统接近后续实际状态”的局部因果关系。</p>\n<p>HER 不改变环境，不添加 shaped reward，也不需要演示数据。它只是改变 replay buffer 中 transition 的目标标签与对应奖励，因此实现成本很低。</p>\n<h5>与层次技能的关系</h5>\n<p>虽然 HER 本身不是传统 HRL 架构，但在具身任务中它常被当作技能学习与目标条件控制的基础组件。低层策略可以被训练成“达到任意目标”的通用技能，高层再负责产生目标序列。许多后续层次化方法都复用了 HER 的目标重标注思想。</p>\n<h5>算法伪代码</h5>\n<pre><code class=\"language-text\">Initialize off-policy RL algorithm A and replay buffer R.\n\nfor each episode:\n    sample desired goal g\n    collect trajectory using policy pi(a | s, g)\n\n    for each transition t in the trajectory:\n        store original transition with goal g in R\n\n        for k hindsight samples:\n            sample new goal g' from achieved goals in the same episode\n            recompute reward r' = r(s_t, a_t, s_{t+1}, g')\n            store relabeled transition (s_t, g', a_t, r', s_{t+1}, g') in R\n\n    update off-policy algorithm A using minibatches from R\n\nOutput: goal-conditioned policy pi(a | s, g)\n</code></pre>\n<h5>局限</h5>\n<p>HER 需要可以定义 achieved goal，并能对任意替代目标重算奖励。如果任务目标是语言描述、偏好判断或长期历史属性，简单 HER 就不够直接。它也依赖 off-policy 学习稳定性；如果 critic 在高维连续控制中外推严重，重标注样本可能放大估计误差。</p>"
    },
    {
      "id": "diayn",
      "num": 23,
      "name": "DIAYN",
      "fullName": "多样即所需 (Diversity is All You Need)",
      "year": "2018",
      "org": "UC Berkeley",
      "parent": "sac",
      "paperUrl": "https://arxiv.org/abs/1802.06070",
      "projectUrl": "",
      "category": "skill_hierarchical",
      "motivation": "最大化互信息发现多样化技能",
      "summary": "DIAYN 的核心目标是：最大化互信息发现多样化技能。",
      "keyPoints": [
        "核心动机：最大化互信息发现多样化技能",
        "演化来源：继承或改进自 sac",
        "代表机构：UC Berkeley"
      ],
      "detail": "<h5>算法图</h5>\n<div class=\"img-wrap\"><img src=\"https://ar5iv.labs.arxiv.org/html/1802.06070/assets/x1.png\" alt=\"DIAYN algorithm overview\" loading=\"lazy\"><p class=\"img-caption\">▲ DIAYN algorithm overview</p></div>\n<p>图中有两个同时更新的模块：判别器学习从状态识别技能，技能策略学习访问让自己更容易被识别的状态。这个闭环不需要环境任务奖励。</p>\n<h5>互信息目标</h5>\n<p>DIAYN 的核心目标可写成</p>\n<div class=\"kb-math kb-math-display\">\\max_\\theta I(S;Z) + H[A|S] - I(A;Z|S).</div>\n<p>其中 $I(S;Z)$ 鼓励不同技能访问不同状态；$H[A|S]$ 鼓励动作熵；$I(A;Z|S)$ 的负项避免技能只在同一状态下选择不同动作，而不产生状态差异。通过变分下界，互信息项可近似为</p>\n<div class=\"kb-math kb-math-display\">I(S;Z) \\ge\n\\mathbb{E}_{z\\sim p(z),s\\sim \\pi_\\theta(\\cdot|z)}\n[\\log q_\\phi(z|s)-\\log p(z)].</div>\n<p>这就把无监督技能发现转化成普通 RL 奖励设计。</p>\n<h5>内在奖励</h5>\n<p>策略在每一步收到的奖励是</p>\n<div class=\"kb-math kb-math-display\">r_z(s,a,s&#x27;) = \\log q_\\phi(z|s&#x27;) - \\log p(z).</div>\n<p>如果技能先验 $p(z)$ 是均匀分布，$-\\log p(z)$ 是常数；真正驱动学习的是判别器对 $z$ 的置信度。某个技能越能把智能体带到独特状态，判别器越容易识别它，该技能得到的奖励越高。</p>\n<p>判别器只看状态，不看动作。这一点防止策略通过不可见或无意义的动作编码技能，例如在原地抖动不同关节但不改变环境状态。</p>\n<h5>与 SAC 的结合</h5>\n<p>SAC 的最大熵目标为</p>\n<div class=\"kb-math kb-math-display\">J(\\pi)=\n\\sum_t \\mathbb{E}[r_z(s_t,a_t,s_{t+1})+\\alpha H(\\pi(\\cdot|s_t,z))].</div>\n<p>DIAYN 直接把判别器奖励作为 SAC 的任务奖励。策略输入包含状态和技能 code，critic 也以 $z$ 为条件。训练完成后，固定 $z$ 就得到一个具体技能；高层策略可以在下游任务中选择 $z$ 作为抽象动作。</p>\n<h5>为什么不会只学随机行为</h5>\n<p>单纯最大化熵会导致随机游走，但 DIAYN 要求状态能预测技能。随机行为如果所有技能访问同一分布，判别器无法区分，奖励就低。反过来，技能如果只做确定性动作但状态不变化，也不会被判别器可靠识别。因此 DIAYN 倾向学习“可区分的状态占据分布”。</p>\n<h5>算法伪代码</h5>\n<pre><code class=\"language-text\">Initialize skill prior p(z), policy pi_theta(a | s, z),\ndiscriminator q_phi(z | s), and SAC critics.\n\nwhile not converged:\n    sample skill z ~ p(z)\n    reset environment and condition policy on z\n    for each environment step:\n        sample action a ~ pi_theta(. | s, z)\n        observe next state s'\n        compute intrinsic reward:\n            r = log q_phi(z | s') - log p(z)\n        store (s, z, a, r, s') in replay buffer\n\n    update q_phi to maximize log q_phi(z | s)\n    update SAC policy and critics using intrinsic reward r\n\nOutput: diverse skill-conditioned policy pi_theta(a | s, z)\n</code></pre>\n<h5>实验与局限</h5>\n<p>论文展示了 MuJoCo 等环境中的多样技能，例如不同方向移动、跳跃或姿态变化，并验证这些技能可迁移到下游奖励任务。局限在于“多样”不等于“有用”：如果环境中最容易区分的状态与下游任务无关，DIAYN 可能学到漂亮但不实用的技能。因此实际系统常把 DIAYN 与任务筛选、高层规划或示范数据结合。</p>"
    },
    {
      "id": "hiro",
      "num": 24,
      "name": "HIRO",
      "fullName": "数据高效层次化RL (Data-Efficient Hierarchical RL)",
      "year": "2018",
      "org": "Google Brain",
      "parent": "feudal",
      "paperUrl": "https://arxiv.org/abs/1805.08296",
      "projectUrl": "",
      "category": "skill_hierarchical",
      "motivation": "目标条件奖励与离线策略修正",
      "summary": "HIRO 的核心目标是：目标条件奖励与离线策略修正。",
      "keyPoints": [
        "核心动机：目标条件奖励与离线策略修正",
        "演化来源：继承或改进自 feudal",
        "代表机构：Google Brain"
      ],
      "detail": "<h5>任务与架构示意</h5>\n<div class=\"img-wrap\"><img src=\"https://ar5iv.labs.arxiv.org/html/1805.08296/assets/x2.png\" alt=\"HIRO hierarchical RL task illustration\" loading=\"lazy\"><p class=\"img-caption\">▲ HIRO hierarchical RL task illustration</p></div>\n<p>论文在 Ant Maze、Ant Push、Ant Fall 等连续控制任务中评估 HIRO。图中蓝色箭头表示高层给出的目标方向，低层负责把目标转化为关节控制。</p>\n<h5>高低层 MDP</h5>\n<p>低层策略为</p>\n<div class=\"kb-math kb-math-display\">a_t \\sim \\pi^{lo}(a|s_t,g_t),</div>\n<p>高层策略每隔 $c$ 步输出目标</p>\n<div class=\"kb-math kb-math-display\">g_t \\sim \\pi^{hi}(g|s_t).</div>\n<p>如果使用相对目标，那么在下一步会把目标按状态变化平移：</p>\n<div class=\"kb-math kb-math-display\">g_{t+1}=s_t+g_t-s_{t+1}.</div>\n<p>这使低层始终看到“从当前状态还差多少到达高层目标”，而不是固定的绝对坐标。</p>\n<h5>低层内在奖励</h5>\n<p>HIRO 的低层奖励可写成</p>\n<div class=\"kb-math kb-math-display\">r^{lo}(s_t,g_t,a_t,s_{t+1})\n= -\\|s_t + g_t - s_{t+1}\\|_2.</div>\n<p>这个奖励与外部任务无关，只衡量低层是否执行了高层命令。高层则接收环境外部奖励，并在时间尺度 $c$ 上学习哪个 goal 有助于任务完成。</p>\n<h5>Off-policy correction</h5>\n<p>层次化 off-policy 学习的问题是：replay buffer 中某段低层动作 $a_t,\\ldots,a_{t+c-1}$ 是旧低层策略在旧 goal $g_t$ 下生成的。当前低层策略已经变了，如果高层仍把旧 $g_t$ 当成动作来训练，TD 目标会出现严重语义偏移。</p>\n<p>HIRO 的修正是寻找一个新 goal $\\tilde g_t$，使当前低层策略最有可能产生这段历史动作：</p>\n<div class=\"kb-math kb-math-display\">\\tilde g_t\n= \\arg\\max_g\n\\sum_{i=t}^{t+c-1}\n\\log \\pi^{lo}(a_i|s_i,g_i).</div>\n<p>实际实现不会在连续 goal 空间中全局优化，而是构造候选集合，包括原始 goal、加噪 goal 和直接由 $s_{t+c}-s_t$ 得到的 hindsight goal，再选 likelihood 最大者。</p>\n<h5>与 FeUdal Networks 的关系</h5>\n<p>FuN 的高层目标是 latent direction，主要解决长程信用分配；HIRO 的高层目标是可由低层追踪的状态差值，并重点解决 off-policy 经验复用。可以把 HIRO 看成更贴近连续控制和 replay 学习的层次化目标条件框架。</p>\n<p>这种设计牺牲了一些抽象性，但带来更明确的低层学习信号：goal 是否完成可以直接用状态距离衡量，而不依赖难解释的 latent 表征。</p>\n<h5>算法伪代码</h5>\n<pre><code class=\"language-text\">Initialize high-level policy pi_hi, low-level policy pi_lo,\ncritics Q_hi and Q_lo, and replay buffers.\n\nfor each episode:\n    every c steps:\n        high-level samples goal g_t ~ pi_hi(. | s_t)\n\n    for each low-level step:\n        low-level samples action a_i ~ pi_lo(. | s_i, g_i)\n        environment returns s_{i+1}, extrinsic reward r_i\n        compute low-level reward -||s_i + g_i - s_{i+1}||\n        store low-level transition\n        update remaining goal by relative-state shift\n\n    store high-level transition (s_t, g_t, sum extrinsic rewards, s_{t+c})\n\n    when training high-level from replay:\n        relabel old goal with off-policy correction:\n            choose g maximizing likelihood of recorded low-level actions\n        update Q_hi and pi_hi using corrected goal\n    update Q_lo and pi_lo with intrinsic rewards\n\nOutput: hierarchical policy with corrected off-policy replay\n</code></pre>\n<h5>实验结论与局限</h5>\n<p>HIRO 在 Ant Maze、Ant Push、Ant Fall 和 Ant Gather 中显著优于没有 off-policy correction 的层次化方法，并比许多探索增强基线更省样本。它的局限是 goal space 需要能用状态差值表达；如果任务的高层意图是语言、接触模式或不可观测事件，单纯的 $s_{t+c}-s_t$ 目标就不足够。</p>"
    },
    {
      "id": "skillrl",
      "num": 25,
      "name": "SkillRL",
      "fullName": "递归技能增强RL (Recursive Skill-Augmented RL)",
      "year": "2026",
      "org": "arXiv",
      "parent": "hiro",
      "paperUrl": "https://arxiv.org/abs/2602.08234",
      "projectUrl": "",
      "category": "skill_hierarchical",
      "motivation": "技能库递归演进处理超长程任务",
      "summary": "SkillRL 的核心目标是：技能库递归演进处理超长程任务。",
      "keyPoints": [
        "核心动机：技能库递归演进处理超长程任务",
        "演化来源：继承或改进自 hiro",
        "代表机构：arXiv"
      ],
      "detail": "<h5>框架示意</h5>\n<div class=\"img-wrap\"><img src=\"https://ar5iv.labs.arxiv.org/html/2602.08234/assets/x2.png\" alt=\"SkillRL framework overview\" loading=\"lazy\"><p class=\"img-caption\">▲ SkillRL framework overview</p></div>\n<p>图中展示了 SkillRL 的闭环：收集轨迹、蒸馏技能、冷启动训练、RL 优化、失败分析与动态技能演化。与传统 HRL 的连续控制 goal 不同，这里的技能主要是可读、可检索的语言程序或策略片段。</p>\n<h5>为什么需要技能库</h5>\n<p>长程 agent 任务的动作空间通常是自然语言命令、网页点击、搜索查询或工具调用，episode 成功率低且延迟奖励严重。直接用 RL 从最终成功奖励学习，会让模型反复探索同类错误。SkillRL 的假设是：历史轨迹中包含可迁移的局部策略，应被抽象成技能并在新 episode 中复用。</p>\n<p>技能库可以看成高层记忆：</p>\n<div class=\"kb-math kb-math-display\">\\mathcal{B}=\\{b_i=(d_i,u_i,c_i)\\}_{i=1}^{N},</div>\n<p>其中 $d_i$ 是技能描述，$u_i$ 是使用方式或步骤，$c_i$ 是适用条件。策略在当前状态 $s_t$ 下检索 top-$K$ 技能，再把技能作为上下文的一部分生成动作。</p>\n<h5>差分轨迹处理</h5>\n<p>SkillRL 不把所有轨迹同等加入训练。成功轨迹会被保留为正向 demonstration，用于提炼可复用步骤；失败轨迹则被压缩成 failure lessons，强调哪些判断、顺序或工具调用导致失败。这样可以避免把冗长、重复、低质量的原始轨迹直接灌入上下文。</p>\n<p>这种差分处理对应一个信息过滤过程：</p>\n<div class=\"kb-math kb-math-display\">\\text{Skill} = f_{teacher}(\\tau, y),</div>\n<p>其中 $\\tau$ 是轨迹，$y$ 是成功或失败标签。成功样本提供“该怎么做”，失败样本提供“不要再怎么做”以及可修正的新技能。</p>\n<h5>冷启动与 GRPO</h5>\n<p>在 RL 之前，SkillRL 先做 cold-start SFT，让基础模型学会读取检索技能并按技能格式行动。随后使用 GRPO 进行策略优化。GRPO 的核心是对同一问题采样一组回答或轨迹，用组内相对奖励估计优势，而不单独训练 critic：</p>\n<div class=\"kb-math kb-math-display\">J_{\\text{GRPO}}(\\theta)=\n\\mathbb{E}\\left[\n\\frac{1}{G}\\sum_{i=1}^{G}\n\\min\\left(\nr_i(\\theta)A_i,\\,\n\\text{clip}(r_i(\\theta),1-\\epsilon,1+\\epsilon)A_i\n\\right)\n\\right].</div>\n<p>这里 $r_i(\\theta)$ 是新旧策略概率比，$A_i$ 来自组内奖励归一化。对长程 agent 来说，省掉 critic 可以降低不稳定性，但仍保留 PPO 式 clipped update。</p>\n<h5>递归技能演化</h5>\n<p>每轮 RL 后，系统在验证环境上运行当前 agent，收集失败案例。教师模型分析失败原因，可能产生新技能、合并旧技能或修改技能适用条件。于是下一轮训练的策略分布变为</p>\n<div class=\"kb-math kb-math-display\">\\pi_{\\theta_{k+1}}(a|s,\\text{Retrieve}(s,\\mathcal{B}_{k+1})),</div>\n<p>而技能库也从 $\\mathcal{B}<em k_1=\"k+1\">k$ 更新到 $\\mathcal{B}</em>$。这就是“recursive skill-augmented”的含义：策略改进改变数据分布，数据分布反过来触发技能库演进。</p>\n<h5>算法伪代码</h5>\n<pre><code class=\"language-text\">Input: base LLM policy, environments, teacher model, initial trajectories.\n\n1. Collect successful and failed trajectories with the base policy.\n2. Distill trajectories into a hierarchical SkillBank:\n      successful trajectories -&gt; reusable procedural skills\n      failed trajectories -&gt; failure lessons and corrected skills\n3. Train a cold-start policy with SFT to use retrieved skills.\n4. Repeat for RL iterations:\n      retrieve top-K skills for each environment state/task\n      sample G rollouts with the current policy\n      compute task rewards and GRPO advantages\n      update policy with clipped GRPO objective\n      run validation episodes\n      analyze failures with teacher model\n      add, revise, or merge skills in SkillBank\n\nOutput: skill-augmented agent and evolved SkillBank\n</code></pre>\n<h5>与具身 HRL 的联系</h5>\n<p>虽然 SkillRL 面向 LLM agents，而不是传统机器人连续控制，它与 HIRO 等 HRL 方法共享一个思想：高层结构减少长程探索难度。HIRO 的高层动作是状态目标，SkillRL 的高层结构是语言技能检索。二者都把长 episode 拆成可复用的局部能力，只是技能载体不同。</p>\n<p>公开资料显示该论文为 2026 年 arXiv 工作，解读依据 arXiv 摘要、HTML 论文图与公开方法描述。若正式会议版本调整实验数字或算法细节，应以后续版本为准。</p>"
    },
    {
      "id": "metaworld_hrl",
      "num": 26,
      "name": "MetaWorld-HRL",
      "fullName": "元世界层次化RL (MetaWorld Hierarchical RL)",
      "year": "2026",
      "org": "arXiv",
      "parent": "skillrl",
      "paperUrl": "https://arxiv.org/abs/2601.17507",
      "projectUrl": "",
      "category": "skill_hierarchical",
      "motivation": "层次化世界模型技能迁移组合",
      "summary": "MetaWorld-HRL 的核心目标是：层次化世界模型技能迁移组合。",
      "keyPoints": [
        "核心动机：层次化世界模型技能迁移组合",
        "演化来源：继承或改进自 skillrl",
        "代表机构：arXiv"
      ],
      "detail": "<h5>框架示意</h5>\n<div class=\"img-wrap\"><img src=\"https://ar5iv.labs.arxiv.org/html/2601.17507/assets/framework.jpg\" alt=\"MetaWorld-HRL framework\" loading=\"lazy\"><p class=\"img-caption\">▲ MetaWorld-HRL framework</p></div>\n<p>图中可以看到三层：semantic layer 负责把观察和指令转成技能序列，skill transfer layer 利用专家策略先验，physical layer 通过 latent dynamics model 执行控制。这里的 MetaWorld-HRL 是该论文中的层次世界模型方法，不等同于早期的 Meta-World 多任务基准本身。</p>\n<h5>语义到物理的分解</h5>\n<p>论文将策略分解为高层语义决策和低层物理控制：</p>\n<div class=\"kb-math kb-math-display\">\\pi(a_t|s_t,T)=\\pi_{\\text{phys}}(a_t|s_t,\\pi_{\\text{sem}}(T)),</div>\n<p>其中 $T$ 是高层任务指令，$\\pi_{\\text{sem}}$ 产生技能组合或专家先验，$\\pi_{\\text{phys}}$ 在当前状态下执行具体动作。这种分解的好处是：语言理解和接触动力学不必由同一个端到端策略同时学习。</p>\n<h5>VLM 专家权重</h5>\n<p>给定任务 $T$ 和环境观测 $E$，VLM 输出专家相关性评分：</p>\n<div class=\"kb-math kb-math-display\">w=f_{\\text{VLM}}(T,E).</div>\n<p>论文用 softmax 归一化得到专家权重：</p>\n<div class=\"kb-math kb-math-display\">w_i=\\frac{\\exp(\\text{score}_i)}\n{\\sum_j \\exp(\\text{score}_j)}.</div>\n<p>高层技能先验可写为专家策略的加权组合：</p>\n<div class=\"kb-math kb-math-display\">\\pi_{\\text{sem}}(T)=\\sum_i w_i \\pi_{\\text{exp}}^i.</div>\n<p>这个模块让模型能够从“开门”“移动”“保持平衡”等已有专家中组合出新任务策略。</p>\n<h5>状态感知动态选择</h5>\n<p>静态 VLM 权重只反映任务整体相似性，但同一任务不同阶段可能需要不同专家。MetaWorld-HRL 因此引入状态感知选择：</p>\n<div class=\"kb-math kb-math-display\">p(i|s_t)=\n\\frac{\\exp(\\phi(s_t)^\\top \\psi(\\pi_{\\text{exp}}^i))}\n{\\sum_{j=1}^{K}\\exp(\\phi(s_t)^\\top \\psi(\\pi_{\\text{exp}}^j))}.</div>\n<p>$\\phi(s_t)$ 是状态表示，$\\psi(\\pi_{\\text{exp}}^i)$ 是专家嵌入。这样系统可以在接近门把手时更依赖 reach/grasp 专家，在推动阶段更依赖 door/open 专家。</p>\n<h5>层次化世界模型控制</h5>\n<p>物理层借助 latent dynamics model 预测未来：</p>\n<div class=\"kb-math kb-math-display\">z_{t+1}=f_\\theta(z_t,a_t), \\quad\n\\hat r_t = r_\\theta(z_t,a_t).</div>\n<p>专家策略不是直接替代控制器，而是作为 motion prior 或 guidance 融入模型预测控制。低层在 latent space 中搜索动作时，会同时考虑任务回报、动力学一致性和专家先验，从而减少从零探索复杂运动的成本。</p>\n<h5>实验信号</h5>\n<p>公开论文描述了 Humanoid-Bench 等任务上的结果，尤其强调 walk、stand、run、reach、door 等技能迁移与组合。消融实验显示，去掉 VLM 语义层、专家 guidance 或动态专家选择都会明显降低性能，说明三层结构不是简单堆模块，而是在任务解析、技能选择和物理执行上各自承担角色。</p>\n<h5>算法伪代码</h5>\n<pre><code class=\"language-text\">Input: task instruction T, visual observation E, expert policy library,\nlatent world model, physical controller.\n\n1. Semantic layer:\n      use VLM to parse T and E\n      produce skill sequence or expert relevance scores\n2. Skill transfer layer:\n      normalize expert weights with softmax\n      compute state-aware expert probabilities p(i | s_t)\n      fuse selected expert priors into a motion prior\n3. Physical layer:\n      encode observation into latent state z_t\n      roll out candidate actions with latent dynamics model\n      score candidates by task reward and expert guidance\n      execute the first action\n4. Repeat until task completion or horizon limit.\n\nOutput: composed hierarchical policy for the instruction\n</code></pre>\n<h5>适用与局限</h5>\n<p>MetaWorld-HRL 适合已经有专家库、并且新任务可由已有技能组合完成的场景。它不适合完全没有可迁移专家的冷启动问题；VLM 解析错误也会把后续控制引向错误技能。另外，世界模型在接触丰富的机器人任务中可能积累预测误差，因此需要动态重规划和真实反馈闭环。</p>"
    },
    {
      "id": "hcc",
      "num": 27,
      "name": "HCC",
      "fullName": "层次认知缓存 (Hierarchical Cognitive Caching)",
      "year": "2026",
      "org": "arXiv",
      "parent": "skillrl",
      "paperUrl": "https://arxiv.org/abs/2601.10402",
      "projectUrl": "",
      "category": "skill_hierarchical",
      "motivation": "认知缓存保持长时策略一致性",
      "summary": "HCC（Hierarchical Cognitive Caching）提出了一种受CPU缓存层次结构启发的三层认知缓存架构（Evolving Experience → Refined Knowledge → Prior Wisdom），配合上下文预取、命中与晋升三种迁移机制，使LLM Agent在24小时超长ML任务中将上下文从200k+压缩至~70k tokens而不丢失关键策略信息，在MLE-Bench上以56.4%平均奖牌率达到SOTA。",
      "keyPoints": [
        "<strong>三层缓存架构</strong>：L1 Evolving Experience（工作记忆，原始交互trace）、L2 Refined Knowledge（中期策略记忆，phase级蒸馏摘要）、L3 Prior Wisdom（跨任务长期记忆，embedding检索的可迁移策略）",
        "<strong>三种上下文迁移机制</strong>：Context Prefetching（L3→任务初始化）、Context Hit（L1优先/L2回退的缓存命中策略）、Context Promotion（P1 phase级压缩 + P2 task级蒸馏）",
        "<strong>层次研究计划</strong>：每个phase生成 m 个探索方向 × q 个具体建议，并行执行后由P1算子压缩为精炼知识单元",
        "<strong>跨任务迁移</strong>：L3使用语义embedding + cosine相似度阈值δ检索历史任务wisdom，407个Kaggle竞赛预热构建先验库",
        "<strong>骨干模型</strong>：DeepSeek-V3.2-Speciale（编码/研究）+ DeepSeek-V3.2 with thinking（上下文晋升），24h/task，双RTX 4090",
        "<strong>SOTA结果</strong>：MLE-Bench 75题，56.4%平均奖牌率（Low 75.8%/Medium 50.9%/High 42.2%），超越Leeroo（50.7%）、Thesis（48.4%）等闭源方案",
        "<strong>消融验证</strong>：去L1→22.7%（崩溃），去L2→59.1%（下降），去L3→54.5%（轻微下降），证明三层缺一不可"
      ],
      "detail": "<h5>动机与背景</h5>\n<p>现有LLM Agent在处理超长时间跨度的科学研究任务（如24小时Kaggle竞赛）时面临根本性瓶颈：<strong>上下文窗口爆炸</strong>。随着Agent与环境交互步数增加，原始执行日志（代码、终端输出、调试信息）呈指数级增长，很快超出LLM的有效上下文窗口。简单的截断或滑动窗口策略会导致<strong>认知遗忘</strong>——Agent丢失早期关键决策和实验洞察，陷入重复探索。</p>\n<p>传统方法的缺陷：\n- <strong>线性上下文保留</strong>（如OpenHands、AIDE）：保留全部历史或简单截断，无法区分信息价值层次\n- <strong>固定摘要</strong>：一次性压缩丢失决策理由和实验细节\n- <strong>无跨任务迁移</strong>：每个任务从零开始，无法利用历史经验</p>\n<p>HCC的核心洞察是：<strong>Agent的认知应像CPU缓存一样分层管理</strong>——热数据（当前执行trace）保持原始精度，温数据（已完成phase的洞察）压缩为策略摘要，冷数据（跨任务经验）蒸馏为可迁移的先验知识。</p>\n<p><img alt=\"HCC 框架总览\" src=\"https://ar5iv.labs.arxiv.org/html/2601.10402/assets/x1.png\" />\n<em>图1：ML-Master 2.0 的 HCC 架构总览。左侧为三层缓存结构（L1/L2/L3），右侧为上下文迁移的三种操作（预取/命中/晋升）。</em></p>\n<h5>问题形式化</h5>\n<p>将Agent与环境的交互建模为序列决策过程。在时间步 <span class=\"kb-math kb-math-inline\">t</span>，Agent观察上下文 <span class=\"kb-math kb-math-inline\">C_{t-1}</span> 并生成动作 <span class=\"kb-math kb-math-inline\">a_t = \\pi_\\theta(C_{t-1})</span>，环境返回事件 <span class=\"kb-math kb-math-inline\">e_t</span>。核心挑战是设计上下文构造函数 <span class=\"kb-math kb-math-inline\">g(\\cdot)</span>，使得：</p>\n<div class=\"kb-math kb-math-display\">C_{t-1} = g(\\mathcal{E}_{t-1})</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">\\mathcal{E}_{t-1} = \\{e_0, e_1, \\ldots, e_{t-1}\\}</span> 是完整历史事件序列。朴素方法直接拼接所有事件，导致 <span class=\"kb-math kb-math-inline\">|C_{t-1}|</span> 线性增长直至超出窗口。HCC通过三层缓存和迁移机制重新定义 <span class=\"kb-math kb-math-inline\">g(\\cdot)</span>。</p>\n<h5>三层缓存架构</h5>\n<p><strong>L1: Evolving Experience（工作记忆）</strong></p>\n<p>L1存储当前活跃phase的原始交互trace，是Agent的\"工作记忆\"。在phase <span class=\"kb-math kb-math-inline\">p</span> 的时间步 <span class=\"kb-math kb-math-inline\">t \\in [t_{p-1}, t_p)</span>：</p>\n<div class=\"kb-math kb-math-display\">\\mathcal{L}_1(t) = \\mathcal{E}_{t_0:t_{p-2}} \\cup \\{P_{p-1}\\} \\cup \\mathcal{E}_{t_{p-1}+1:t}</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">\\mathcal{E}_{t_0:t_{p-2}}</span> 是历史phase边界事件，<span class=\"kb-math kb-math-inline\">P_{p-1}</span> 是上一个研究计划，<span class=\"kb-math kb-math-inline\">\\mathcal{E}_{t_{p-1}+1:t}</span> 是当前phase的完整trace。L1保持原始精度，支持精细调试和代码修正。</p>\n<p><strong>L2: Refined Knowledge（中期策略记忆）</strong></p>\n<p>L2存储已完成phase的蒸馏摘要，由P1算子从L1压缩而来。定义 <span class=\"kb-math kb-math-inline\">\\kappa_{i:j}</span> 为事件段 <span class=\"kb-math kb-math-inline\">\\mathcal{E}_{i:j}</span> 的紧凑知识摘要：</p>\n<div class=\"kb-math kb-math-display\">\\mathcal{L}_2(t) = \\{\\kappa_{t_{r-1}+1:t_r-1}\\}_{r=1}^{p-1}</div>\n<p>每个 <span class=\"kb-math kb-math-inline\">\\kappa_p</span> 保留关键判断（如\"特征X有害\"）、实验洞察（如\"CV在split Y上泄漏\"）和决策理由，同时移除冗长的执行日志。这使Agent能回顾已验证的决策而无需携带完整执行记录。</p>\n<p><strong>L3: Prior Wisdom（跨任务长期记忆）</strong></p>\n<p>L3存储从历史任务蒸馏的可迁移策略，以embedding-value对形式持久化：</p>\n<div class=\"kb-math kb-math-display\">\\mathcal{L}_3 \\triangleq \\{(\\mathbf{h}_n, w_n)\\}_{n=1}^{N}</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">\\mathbf{h}_n = E(d_n)</span> 是任务描述符的语义embedding，<span class=\"kb-math kb-math-inline\">w_n</span> 是对应的蒸馏wisdom文本。L3跨任务持久化，仅在任务完成时通过P2算子更新。</p>\n<h5>上下文迁移机制</h5>\n<p><img alt=\"上下文迁移示例\" src=\"https://ar5iv.labs.arxiv.org/html/2601.10402/assets/x2.png\" />\n<em>图2：在plant-pathology-2021-fgvc8任务中的上下文迁移示例，展示预取、命中和晋升的完整流程。</em></p>\n<p><strong>1. Context Prefetching（预取：L3 → 初始化）</strong></p>\n<p>任务开始前，计算当前任务描述符的embedding <span class=\"kb-math kb-math-inline\">\\mathbf{q} = E(d_\\tau)</span>，通过cosine相似度阈值检索相关先验：</p>\n<div class=\"kb-math kb-math-display\">\\Omega_\\tau = \\{w_n \\mid (\\mathbf{h}_n, w_n) \\in \\mathcal{L}_3, \\cos(\\mathbf{q}, \\mathbf{h}_n) &gt; \\delta\\}</div>\n<p>初始上下文构造为：<span class=\"kb-math kb-math-inline\">e_0 = \\text{concat}(d_\\tau, u_{\\text{user}}, \\Omega_\\tau)</span>，确保Agent从强先验启动。</p>\n<p><strong>2. Context Hit（命中：L1优先 / L2回退）</strong></p>\n<p>上下文构造函数 <span class=\"kb-math kb-math-inline\">g(\\cdot)</span> 实现类缓存命中策略：</p>\n<div class=\"kb-math kb-math-display\">\\Psi_t(k) = \\begin{cases} e_k, &amp; e_k \\in \\mathcal{L}_1(t) \\\\ \\kappa_{t_{r-1}+1:t_r-1}, &amp; e_k \\notin \\mathcal{L}_1(t), e_k \\in \\mathcal{L}_2(t) \\\\ \\varnothing, &amp; \\text{otherwise} \\end{cases}</div>\n<p>当前phase的事件从L1以原始形式检索（缓存命中），已完成phase的事件回退到L2的精炼摘要（缓存未命中），最终上下文为所有命中结果的拼接。</p>\n<p><strong>3. Context Promotion（晋升：L1 → L2 → L3）</strong></p>\n<p>晋升分两级：</p>\n<ul>\n<li><strong>Phase级晋升（P1算子）</strong>：每个phase完成时，P1将该phase的 <span class=\"kb-math kb-math-inline\">m \\times q</span> 条并行探索轨迹压缩为单个知识单元 <span class=\"kb-math kb-math-inline\">\\kappa_p</span>，写入L2并从L1移除原始trace：</li>\n</ul>\n<div class=\"kb-math kb-math-display\">\\kappa_p = P_1(\\{\\sigma_{p,i,j}\\}_{(i,j) \\in \\mathcal{I}_p}), \\quad \\mathcal{L}_2 \\leftarrow \\mathcal{L}_2 \\cup \\{\\kappa_p\\}, \\quad \\mathcal{L}_1 \\leftarrow \\mathcal{L}_1 \\setminus \\{e \\mid e \\in \\sigma_{p,i,j}\\}</div>\n<ul>\n<li><strong>Task级晋升（P2算子）</strong>：任务完成时，P2从完整任务历史（L1+L2）蒸馏出可迁移的wisdom <span class=\"kb-math kb-math-inline\">w_\\tau</span>，写入L3：</li>\n</ul>\n<div class=\"kb-math kb-math-display\">w_\\tau = P_2(C_{t_{\\max}-1}), \\quad \\mathcal{L}_3 \\leftarrow \\mathcal{L}_3 \\cup \\{(E(d_\\tau), w_\\tau)\\}</div>\n<h5>整体工作流伪代码</h5>\n<pre><code class=\"language-python\"># HCC Agent 工作流伪代码\ndef hcc_agent(task_description, L3_wisdom_store):\n    # Phase 0: Context Prefetching\n    q = embed(task_description)\n    Omega = {w for (h, w) in L3 if cosine(q, h) &gt; delta}\n    context = concat(task_description, user_instructions, Omega)\n\n    # Generate initial code submission\n    initial_code = LLM(context, prompt=&quot;generate baseline code&quot;)\n    submit(initial_code)\n\n    for phase_p in range(1, max_phases + 1):\n        # Step 1: Hierarchical Research Plan\n        plan = LLM(context, prompt=&quot;propose m directions × q suggestions&quot;)\n\n        # Step 2: Parallel Execution\n        trajectories = {}\n        for direction_i in range(m):\n            for suggestion_j in range(q):\n                sigma_ij = execute_suggestion(plan[i][j])  # code → run → debug\n                trajectories[(i,j)] = sigma_ij\n\n        # Step 3: Context Hit (build context for next phase)\n        # Current phase traces from L1 (raw), past phases from L2 (summaries)\n\n        # Step 4: Phase-level Promotion (P1)\n        kappa_p = P1_summarize(trajectories)  # LLM-based compression\n        L2.add(kappa_p)\n        L1.remove(raw_traces_of_phase_p)\n\n        # Update context via hit policy\n        context = build_context_with_hit_policy(L1, L2)\n\n    # Task-level Promotion (P2)\n    wisdom = P2_distill(full_task_history)\n    L3.add((embed(task_description), wisdom))\n</code></pre>\n<h5>上下文压缩效果</h5>\n<p><img alt=\"Token统计\" src=\"https://ar5iv.labs.arxiv.org/html/2601.10402/assets/figures/token_count.png\" />\n<em>图3：在random-acts-of-pizza任务中的上下文长度增长曲线。橙线为无HCC的原始上下文（&gt;200k tokens），蓝线为HCC管理后的上下文（~70k tokens）。Agent在第4次研究计划迭代中成功获得奖牌。</em></p>\n<p>HCC的关键效果是将上下文从超过200k tokens压缩至约70k tokens，同时保留了所有关键的策略洞察和实验结论。这使得Agent能在有限的上下文窗口内维持跨越数十小时的战略连贯性。</p>\n<h5>实验结果</h5>\n<p>在MLE-Bench（75个真实Kaggle任务）上的评估结果：</p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>Agent</th>\n<th>Backbone</th>\n<th>Low(%)</th>\n<th>Medium(%)</th>\n<th>High(%)</th>\n<th>Avg Medal(%)</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>MLAB</td>\n<td>gpt-4o</td>\n<td>4.6</td>\n<td>0.0</td>\n<td>0.0</td>\n<td>1.6</td>\n</tr>\n<tr>\n<td>OpenHands</td>\n<td>gpt-4o</td>\n<td>12.1</td>\n<td>1.8</td>\n<td>2.2</td>\n<td>4.9</td>\n</tr>\n<tr>\n<td>AIDE</td>\n<td>o1-preview</td>\n<td>35.9</td>\n<td>8.5</td>\n<td>11.7</td>\n<td>17.1</td>\n</tr>\n<tr>\n<td>R&amp;D-Agent</td>\n<td>gpt-5</td>\n<td>68.2</td>\n<td>21.1</td>\n<td>22.2</td>\n<td>35.1</td>\n</tr>\n<tr>\n<td>FM Agent</td>\n<td>Gemini-2.5-Pro</td>\n<td>62.1</td>\n<td>36.8</td>\n<td>33.3</td>\n<td>43.6</td>\n</tr>\n<tr>\n<td>Thesis</td>\n<td>gpt-5-codex</td>\n<td>65.2</td>\n<td>45.6</td>\n<td>31.1</td>\n<td>48.4</td>\n</tr>\n<tr>\n<td>Leeroo*</td>\n<td>Gemini-3-pro</td>\n<td>68.2</td>\n<td>44.7</td>\n<td>40.0</td>\n<td>50.7</td>\n</tr>\n<tr>\n<td>ML-Master</td>\n<td>DeepSeek-R1</td>\n<td>48.5</td>\n<td>20.2</td>\n<td>24.4</td>\n<td>29.3</td>\n</tr>\n<tr>\n<td><strong>ML-Master 2.0</strong></td>\n<td><strong>DS-V3.2-Speciale</strong></td>\n<td><strong>75.8</strong></td>\n<td><strong>50.9</strong></td>\n<td><strong>42.2</strong></td>\n<td><strong>56.4</strong></td>\n</tr>\n</tbody>\n</table></div>\n<p>消融实验（MLE-Bench-Lite, 22题）：</p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>配置</th>\n<th>Valid(%)</th>\n<th>Median+(%)</th>\n<th>Medal(%)</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>① 去L1（无迭代交互）</td>\n<td>54.5</td>\n<td>36.4</td>\n<td>22.7</td>\n</tr>\n<tr>\n<td>② 去L2（无上下文压缩）</td>\n<td>95.5</td>\n<td>81.8</td>\n<td>59.1</td>\n</tr>\n<tr>\n<td>③ 去L3（无跨任务迁移）</td>\n<td>95.5</td>\n<td>72.7</td>\n<td>54.5</td>\n</tr>\n<tr>\n<td>④ 完整HCC</td>\n<td>95.5</td>\n<td>81.8</td>\n<td><strong>72.7</strong></td>\n</tr>\n</tbody>\n</table></div>\n<div class=\"key-point\">💡 <strong>关键发现</strong>：L1是基础（去除后奖牌率暴跌至22.7%），L2提升顶尖表现（59.1%→72.7%），L3提供强初始化（54.5%→72.7%）。三层协同效果远超各层独立贡献之和。</div>\n<h5>与传统方法的核心区别</h5>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>维度</th>\n<th>线性保留（OpenHands等）</th>\n<th>固定摘要</th>\n<th>HCC</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>上下文增长</td>\n<td>线性，终将溢出</td>\n<td>固定大小但信息损失</td>\n<td>分层压缩，动态平衡</td>\n</tr>\n<tr>\n<td>历史访问</td>\n<td>全部或截断</td>\n<td>仅摘要</td>\n<td>热数据原始+冷数据摘要</td>\n</tr>\n<tr>\n<td>跨任务迁移</td>\n<td>无</td>\n<td>无</td>\n<td>L3 embedding检索</td>\n</tr>\n<tr>\n<td>认知连贯性</td>\n<td>截断后丢失</td>\n<td>摘要粒度粗</td>\n<td>Phase级精炼保留决策理由</td>\n</tr>\n</tbody>\n</table></div>",
      "quiz": {
        "q": "在HCC架构中，当Agent需要回顾一个已完成phase的实验结论时，上下文构造函数g(·)会从哪一层缓存获取信息？",
        "options": [
          "L1 Evolving Experience，因为它保存了所有原始交互记录",
          "L2 Refined Knowledge，因为已完成phase的原始trace已被P1算子压缩并迁移至此",
          "L3 Prior Wisdom，因为所有历史信息最终都会蒸馏到长期记忆",
          "直接从LLM的参数记忆中检索，无需显式缓存"
        ],
        "answer": 1,
        "explain": "HCC的Context Hit机制实现L1优先/L2回退策略：当前phase的事件从L1获取原始形式，而已完成phase的原始trace在Phase级晋升时已被P1算子压缩为精炼知识单元κ并存入L2，同时从L1中移除。因此回顾已完成phase时，g(·)从L2获取压缩后的摘要。"
      }
    },
    {
      "id": "icm",
      "num": 28,
      "name": "ICM",
      "fullName": "内在好奇心模块 (Intrinsic Curiosity Module)",
      "year": "2017",
      "org": "UC Berkeley",
      "parent": "—",
      "paperUrl": "https://arxiv.org/abs/1705.05363",
      "projectUrl": "",
      "category": "reward_design",
      "motivation": "预测误差产生好奇心内在奖励",
      "summary": "ICM 的核心目标是：预测误差产生好奇心内在奖励。",
      "keyPoints": [
        "核心动机：预测误差产生好奇心内在奖励",
        "代表机构：UC Berkeley"
      ],
      "detail": "<h5>模块示意</h5>\n<div class=\"img-wrap\"><img src=\"https://ar5iv.labs.arxiv.org/html/1705.05363/assets/x1.png\" alt=\"Intrinsic Curiosity Module\" loading=\"lazy\"><p class=\"img-caption\">▲ Intrinsic Curiosity Module</p></div>\n<p>图中，agent 执行动作后收到外部奖励，同时 ICM 根据状态转移产生 curiosity reward。ICM 内部包含特征编码器、逆模型和前向模型。</p>\n<h5>为什么不用原始像素误差</h5>\n<p>如果直接预测下一帧像素，智能体可能被电视噪声、背景闪烁或随机物体吸引，因为这些信号难以预测但与控制无关。ICM 的解决方案是学习一个只强调可控因素的特征空间：</p>\n<div class=\"kb-math kb-math-display\">\\phi_t=\\phi(s_t), \\quad \\phi_{t+1}=\\phi(s_{t+1}).</div>\n<p>这个特征不是通过重建图像学习，而是通过逆动力学学习。只有那些有助于从 $(s_t,s_{t+1})$ 推断动作 $a_t$ 的信息才会被保留。</p>\n<h5>逆动力学模型</h5>\n<p>逆模型预测导致状态变化的动作：</p>\n<div class=\"kb-math kb-math-display\">\\hat a_t = g_\\psi(\\phi(s_t),\\phi(s_{t+1})).</div>\n<p>离散动作时，损失通常是交叉熵：</p>\n<div class=\"kb-math kb-math-display\">\\mathcal{L}_I\n= -\\log p_\\psi(a_t|\\phi(s_t),\\phi(s_{t+1})).</div>\n<p>如果某个环境变化与 agent 动作无关，它无法帮助预测 $a_t$，因此不会被编码器重点保留。这是 ICM 抵抗不可控噪声的关键。</p>\n<h5>前向模型与内在奖励</h5>\n<p>前向模型根据当前特征和动作预测下一特征：</p>\n<div class=\"kb-math kb-math-display\">\\hat \\phi(s_{t+1}) = f_\\eta(\\phi(s_t),a_t).</div>\n<p>前向损失为</p>\n<div class=\"kb-math kb-math-display\">\\mathcal{L}_F =\n\\frac{1}{2}\\|\\hat \\phi(s_{t+1})-\\phi(s_{t+1})\\|_2^2.</div>\n<p>ICM 将同一个误差作为内在奖励：</p>\n<div class=\"kb-math kb-math-display\">r_t^i =\n\\frac{\\eta_r}{2}\n\\|\\hat \\phi(s_{t+1})-\\phi(s_{t+1})\\|_2^2.</div>\n<p>策略优化时使用总奖励</p>\n<div class=\"kb-math kb-math-display\">r_t = r_t^e + r_t^i,</div>\n<p>其中 $r_t^e$ 是环境外部奖励。未被模型掌握的新转移会产生较大 $r_t^i$，推动 agent 去探索。</p>\n<h5>联合目标</h5>\n<p>ICM 模块本身的训练目标是</p>\n<div class=\"kb-math kb-math-display\">\\min_{\\phi,\\psi,\\eta}\n(1-\\beta)\\mathcal{L}_I+\\beta\\mathcal{L}_F.</div>\n<p>策略部分则可使用 A3C 或其他 RL 算法最大化累计总奖励。论文原始实验使用 A3C，并在 VizDoom 和 Super Mario Bros 等稀疏奖励场景中验证：即使没有外部奖励，ICM 也能推动 agent 学会移动、探索地图和发现新区域。</p>\n<h5>与后续方法的关系</h5>\n<p>ICM 的好奇心来自“模型还预测不好”的区域，因此它可能在随机性强、不可学习的区域过度停留。后续方法如 RND、episodic curiosity、information gain 等从不同角度处理这个问题。尽管如此，ICM 提出的“在可控特征空间中计算 prediction error”仍是探索奖励设计的经典模板。</p>\n<h5>算法伪代码</h5>\n<pre><code class=\"language-text\">Initialize policy pi, value function V, encoder phi,\ninverse model g, and forward model f.\n\nfor each rollout:\n    observe state s_t\n    sample action a_t ~ pi(. | s_t)\n    execute action and observe extrinsic reward r_e and next state s_{t+1}\n\n    encode features phi_t = phi(s_t), phi_next = phi(s_{t+1})\n    inverse model predicts a_t from (phi_t, phi_next)\n    forward model predicts phi_next from (phi_t, a_t)\n\n    compute forward error:\n        r_i = eta_r / 2 * ||f(phi_t, a_t) - phi_next||^2\n    train ICM with inverse loss and forward loss\n    train policy with reward r_e + r_i\n\nOutput: exploration policy driven by intrinsic curiosity\n</code></pre>\n<h5>适用边界</h5>\n<p>ICM 适合稀疏奖励、状态变化主要受 agent 控制、且探索新转移有助于任务完成的环境。如果环境存在大量 agent 无法影响但可预测困难的随机因素，ICM 仍可能受到干扰。实际具身系统常会把 ICM 与状态过滤、episodic novelty 或任务约束结合，避免追逐无意义的新奇性。</p>"
    },
    {
      "id": "rnd",
      "num": 29,
      "name": "RND",
      "fullName": "随机网络蒸馏 (Random Network Distillation)",
      "year": "2018",
      "org": "OpenAI",
      "parent": "icm",
      "paperUrl": "https://arxiv.org/abs/1810.12894",
      "projectUrl": "",
      "category": "reward_design",
      "motivation": "随机网络蒸馏衡量状态新颖性",
      "summary": "RND 的核心目标是：随机网络蒸馏衡量状态新颖性。",
      "keyPoints": [
        "核心动机：随机网络蒸馏衡量状态新颖性",
        "演化来源：继承或改进自 icm",
        "代表机构：OpenAI"
      ],
      "detail": "<p>随机网络蒸馏衡量状态新颖性</p>"
    },
    {
      "id": "lagea",
      "num": 30,
      "name": "LaGEA",
      "fullName": "时间接地奖励塑形 (Temporally Grounded Reward Shaping)",
      "year": "2026",
      "org": "arXiv",
      "parent": "rnd",
      "paperUrl": "https://arxiv.org/abs/2602.03001",
      "projectUrl": "",
      "category": "reward_design",
      "motivation": "VLM反射时间接地奖励塑形",
      "summary": "LaGEA 的核心目标是：VLM反射时间接地奖励塑形。",
      "keyPoints": [
        "核心动机：VLM反射时间接地奖励塑形",
        "演化来源：继承或改进自 rnd",
        "代表机构：arXiv"
      ],
      "detail": "<p>VLM反射时间接地奖励塑形</p>"
    },
    {
      "id": "mrbt",
      "num": 31,
      "name": "MRBT",
      "fullName": "掩码奖励行为树 (Masking Reward Behavior Tree)",
      "year": "2026",
      "org": "arXiv",
      "parent": "lagea",
      "paperUrl": "https://arxiv.org/abs/2602.04567",
      "projectUrl": "",
      "category": "reward_design",
      "motivation": "行为树+SMT确保奖励逻辑可验证",
      "summary": "MRBT 的核心目标是：行为树+SMT确保奖励逻辑可验证。",
      "keyPoints": [
        "核心动机：行为树+SMT确保奖励逻辑可验证",
        "演化来源：继承或改进自 lagea",
        "代表机构：arXiv"
      ],
      "detail": "<p>行为树+SMT确保奖励逻辑可验证</p>"
    },
    {
      "id": "vsimr",
      "num": 32,
      "name": "VSIMR",
      "fullName": "变分状态内在奖励 (Variational State Intrinsic Reward)",
      "year": "2025",
      "org": "arXiv",
      "parent": "rnd",
      "paperUrl": "https://arxiv.org/abs/2508.18420",
      "projectUrl": "",
      "category": "reward_design",
      "motivation": "状态新颖性+LLM解决极端稀疏奖励",
      "summary": "VSIMR 的核心目标是：状态新颖性+LLM解决极端稀疏奖励。",
      "keyPoints": [
        "核心动机：状态新颖性+LLM解决极端稀疏奖励",
        "演化来源：继承或改进自 rnd",
        "代表机构：arXiv"
      ],
      "detail": "<p>状态新颖性+LLM解决极端稀疏奖励</p>"
    },
    {
      "id": "mbpo",
      "num": 33,
      "name": "MBPO",
      "fullName": "基于模型的策略优化 (Model-Based Policy Optimization)",
      "year": "2019",
      "org": "UC Berkeley",
      "parent": "sac",
      "paperUrl": "https://arxiv.org/abs/1906.08253",
      "projectUrl": "",
      "category": "world_model",
      "motivation": "短步长模型rollout平衡偏差与效率",
      "summary": "MBPO 的核心目标是：短步长模型rollout平衡偏差与效率。",
      "keyPoints": [
        "核心动机：短步长模型rollout平衡偏差与效率",
        "演化来源：继承或改进自 sac",
        "代表机构：UC Berkeley"
      ],
      "detail": "<p>短步长模型rollout平衡偏差与效率</p>"
    },
    {
      "id": "dreamerv1",
      "num": 34,
      "name": "DreamerV1",
      "fullName": "梦想者V1 (Dream to Control)",
      "year": "2019",
      "org": "DeepMind",
      "parent": "mbpo",
      "paperUrl": "https://arxiv.org/abs/1912.01603",
      "projectUrl": "",
      "category": "world_model",
      "motivation": "隐空间世界模型想象训练",
      "summary": "DreamerV1 的核心目标是：隐空间世界模型想象训练。",
      "keyPoints": [
        "核心动机：隐空间世界模型想象训练",
        "演化来源：继承或改进自 mbpo",
        "代表机构：DeepMind"
      ],
      "detail": "<p>隐空间世界模型想象训练</p>"
    },
    {
      "id": "dreamerv2",
      "num": 35,
      "name": "DreamerV2",
      "fullName": "梦想者V2 (Mastering Atari with Discrete World Models)",
      "year": "2020",
      "org": "DeepMind",
      "parent": "dreamerv1",
      "paperUrl": "https://arxiv.org/abs/2010.02193",
      "projectUrl": "",
      "category": "world_model",
      "motivation": "离散隐变量提升表征能力",
      "summary": "DreamerV2 的核心目标是：离散隐变量提升表征能力。",
      "keyPoints": [
        "核心动机：离散隐变量提升表征能力",
        "演化来源：继承或改进自 dreamerv1",
        "代表机构：DeepMind"
      ],
      "detail": "<h5>DreamerV2 方法示意图</h5>\n<div class=\"img-wrap\"><img src=\"https://ar5iv.labs.arxiv.org/html/2010.02193/assets/x1.png\" alt=\"DreamerV2 离散世界模型\" loading=\"lazy\"><p class=\"img-caption\">▲ DreamerV2 离散世界模型</p></div>\n<p><em>图：DreamerV2 延续“世界模型学习 + latent imagination + actor-critic”的框架，但将世界模型中的随机表示替换为离散 latent，以提高对 Atari 环境的建模能力。</em></p>\n<h5>算法伪代码</h5>\n<p>```python</p>"
    },
    {
      "id": "dreamerv3",
      "num": 36,
      "name": "DreamerV3",
      "fullName": "梦想者V3 (Mastering Diverse Domains through World Models)",
      "year": "2023",
      "org": "DeepMind",
      "parent": "dreamerv2",
      "paperUrl": "https://arxiv.org/abs/2301.04104",
      "projectUrl": "",
      "category": "world_model",
      "motivation": "symlog变换实现跨任务通用性",
      "summary": "DreamerV3 通过 symlog 预测、离散回归（twohot 编码）和鲁棒的回报归一化等一系列信号尺度无关的设计，使得一套固定超参数即可在超过 150 个跨领域基准任务（Atari、DMC、Minecraft 等）上达到或超越专门调参的算法，首次以通用 MBRL 智能体在 Minecraft 中无人类数据地从零收集钻石。",
      "keyPoints": [
        "<strong>Symlog 预测</strong>：对世界模型的解码器和奖励预测器使用 <span class=\"kb-math kb-math-inline\">\\operatorname{symlog}</span> 变换压缩目标尺度，使同一网络适应从 <span class=\"kb-math kb-math-inline\">10^{-1}</span> 到 <span class=\"kb-math kb-math-inline\">10^{4}</span> 量级的信号",
        "<strong>RSSM 世界模型</strong>：由序列模型（GRU）、编码器、动力学先验、解码器、奖励预测器和 continue 预测器组成，在隐空间中进行想象训练",
        "<strong>KL 平衡 + Free Bits</strong>：世界模型损失中对 KL 散度使用 <span class=\"kb-math kb-math-inline\">\\alpha=0.5</span> 的 KL 平衡和 1 nat 的 free bits，避免后验坍缩和先验过拟合",
        "<strong>Critic 离散回归</strong>：Critic 在 symlog 空间的 255 个等距桶上输出 softmax 分布，使用 twohot 编码的软标签进行分类交叉熵训练，有效处理多模态回报分布",
        "<strong>鲁棒回报归一化</strong>：使用 <span class=\"kb-math kb-math-inline\">\\lambda</span>-return 的第 5 至第 95 百分位距作为缩放因子 <span class=\"kb-math kb-math-inline\">S</span>，仅在 <span class=\"kb-math kb-math-inline\">S&gt;1</span> 时缩小回报，避免稀疏奖励下放大噪声",
        "<strong>固定超参数</strong>：单一熵正则化系数 <span class=\"kb-math kb-math-inline\">\\eta=3\\times10^{-4}</span>、折扣因子 <span class=\"kb-math kb-math-inline\">\\gamma=0.997</span>、想象步长 <span class=\"kb-math kb-math-inline\">T=16</span> 等超参数在所有领域通用",
        "<strong>跨领域验证</strong>：在 7 大领域超过 150 个任务上测试，包括连续/离散动作、稠密/稀疏奖励、2D/3D 视觉输入等多种设置",
        "<strong>Minecraft 钻石里程碑</strong>：首个无人类演示、无课程学习、从零在 Minecraft 中收集钻石的通用智能体"
      ],
      "detail": "<h5>整体架构示意图</h5>\n<div class=\"img-wrap\"><img src=\"https://ar5iv.labs.arxiv.org/html/2301.04104v2/assets/figures/method.png\" alt=\"DreamerV3 整体架构\" loading=\"lazy\"><p class=\"img-caption\">▲ DreamerV3 整体架构</p></div>\n<p><em>图：DreamerV3 的三阶段训练流程。(1) 世界模型从经验中学习紧凑的隐空间表征；(2) Actor-Critic 在世界模型的想象轨迹中学习行为策略；(3) 智能体在真实环境中执行动作并收集新经验。</em></p>\n<h5>算法伪代码</h5>\n<pre><code class=\"language-python\"># DreamerV3 训练循环伪代码\nInitialize world model (RSSM), actor π_θ, critic v_ψ, replay buffer D\n\nfor each training step:\n    # === Phase 1: Environment Interaction ===\n    s_t = world_model.encode(o_t)          # 编码观测为模型状态\n    a_t ~ π_θ(a_t | s_t)                   # 从策略采样动作\n    o_{t+1}, r_t, done = env.step(a_t)     # 环境交互\n    D.add(o_t, a_t, r_t, done)             # 存入回放缓冲区\n\n    # === Phase 2: World Model Learning ===\n    batch = D.sample(B=16, T=64)           # 采样序列批次\n    # RSSM: 编码 → 动力学预测 → 解码\n    L_pred = -ln p(o_t|s_t) - ln p(r_t|s_t) - ln p(c_t|s_t)  # symlog MSE + twohot CE\n    L_dyn  = max(1, KL[sg(posterior) || prior])                 # free bits\n    L_rep  = max(1, KL[posterior || sg(prior)])                 # free bits\n    L_WM   = 1·L_pred + 0.5·L_dyn + 0.1·L_rep\n    update world_model with L_WM\n\n    # === Phase 3: Imagination (Actor-Critic Learning) ===\n    imagine s_{1:T} using dynamics + actor (T=16 steps)\n    r_{1:T} = reward_predictor(s_{1:T})\n    c_{1:T} = continue_predictor(s_{1:T})\n\n    # Compute λ-returns with bootstrapping\n    R^λ_T = v_ψ(s_T)\n    for t = T-1 to 1:\n        R^λ_t = r_t + γ·c_t·((1-λ)·v_ψ(s_{t+1}) + λ·R^λ_{t+1})\n\n    # Critic: discrete regression with twohot targets\n    targets = sg(twohot(symlog(R^λ_t)))\n    L_critic = -Σ targets^T · ln p_ψ(·|s_t)     # cross entropy\n    update critic with L_critic (+ EMA regularization)\n\n    # Actor: normalized returns + entropy\n    S = Percentile(R^λ, 95) - Percentile(R^λ, 5)\n    L_actor = -Σ sg(R^λ_t) / max(1, S) - η·H[π_θ(·|s_t)]   # η=3e-4\n    update actor with L_actor\n</code></pre>\n<h5>动机与背景</h5>\n<p>基于模型的强化学习（MBRL）通过学习环境的世界模型并在模型内部进行\"想象\"训练，具有极高的样本效率。DreamerV1/V2 在 Atari 和连续控制任务上取得了优异成绩，但面临一个根本性挑战：<strong>不同任务的奖励尺度、频率和动态范围差异巨大</strong>，导致同一套超参数无法跨领域通用。例如，Atari 中奖励可达数千，而机器人控制中奖励通常在 <span class=\"kb-math kb-math-inline\">[0, 1]</span> 范围内。</p>\n<p>DreamerV3 的核心动机是设计一系列<strong>信号尺度无关（scale-invariant）</strong>的机制，使算法无需针对每个任务调参即可在多样化领域中表现良好。</p>\n<h5>核心机制 1：Symlog 预测</h5>\n<p>传统世界模型使用均方误差（MSE）损失训练解码器和奖励预测器。当目标值跨越多个数量级时，大值主导梯度，小值被忽略。DreamerV3 引入 symlog 变换：</p>\n<div class=\"kb-math kb-math-display\">\\operatorname{symlog}(x) \\doteq \\operatorname{sign}(x)\\ln(|x|+1)</div>\n<div class=\"kb-math kb-math-display\">\\operatorname{symexp}(x) \\doteq \\operatorname{sign}(x)(\\exp(|x|)-1)</div>\n<p>网络在 symlog 空间中预测，损失函数变为：</p>\n<div class=\"kb-math kb-math-display\">\\mathcal{L}(\\theta) = \\frac{1}{2}\\big(\\operatorname{symlog}(y) - \\hat{y}_\\theta\\big)^2</div>\n<div class=\"key-point\">💡 <strong>关键直觉</strong>：symlog 是一种\"软对数\"变换——对大值近似取对数压缩，对小值近似恒等保持。这使得网络可以同时精确预测 0.01 和 10000 量级的目标，而无需调整损失权重。</div>\n<h5>核心机制 2：RSSM 世界模型</h5>\n<p>世界模型基于循环状态空间模型（RSSM），模型状态 <span class=\"kb-math kb-math-inline\">s_t = \\{h_t, z_t\\}</span> 由确定性循环状态 <span class=\"kb-math kb-math-inline\">h_t</span> 和随机离散表征 <span class=\"kb-math kb-math-inline\">z_t</span>（32 个类别 × 32 维 one-hot）组成：</p>\n<div class=\"kb-math kb-math-display\">\\begin{aligned}\n\\text{Sequence model:} \\quad &amp; h_t = f_\\phi(h_{t-1}, z_{t-1}, a_{t-1}) \\\\\n\\text{Encoder:} \\quad &amp; z_t \\sim q_\\phi(z_t \\mid h_t, x_t) \\\\\n\\text{Dynamics (prior):} \\quad &amp; \\hat{z}_t \\sim p_\\phi(\\hat{z}_t \\mid h_t) \\\\\n\\text{Decoder:} \\quad &amp; \\hat{x}_t \\sim p_\\phi(\\hat{x}_t \\mid h_t, z_t) \\\\\n\\text{Reward:} \\quad &amp; \\hat{r}_t \\sim p_\\phi(\\hat{r}_t \\mid h_t, z_t) \\\\\n\\text{Continue:} \\quad &amp; \\hat{c}_t \\sim p_\\phi(\\hat{c}_t \\mid h_t, z_t)\n\\end{aligned}</div>\n<p>世界模型损失由三部分组成：</p>\n<div class=\"kb-math kb-math-display\">\\mathcal{L}_\\text{WM}(\\phi) = \\beta_\\text{pred}\\,\\mathcal{L}_\\text{pred} + \\beta_\\text{dyn}\\,\\mathcal{L}_\\text{dyn} + \\beta_\\text{rep}\\,\\mathcal{L}_\\text{rep}</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">\\beta_\\text{pred}=1, \\beta_\\text{dyn}=0.5, \\beta_\\text{rep}=0.1</span>。动力学损失和表征损失分别使用 stop-gradient 实现 <strong>KL 平衡</strong>：</p>\n<div class=\"kb-math kb-math-display\">\\mathcal{L}_\\text{dyn}(\\phi) = \\max\\big(1, \\mathrm{KL}[\\operatorname{sg}(q_\\phi) \\| p_\\phi]\\big)</div>\n<div class=\"kb-math kb-math-display\">\\mathcal{L}_\\text{rep}(\\phi) = \\max\\big(1, \\mathrm{KL}[q_\\phi \\| \\operatorname{sg}(p_\\phi)]\\big)</div>\n<div class=\"warn-box\">⚠️ <strong>注意</strong>：free bits 阈值为 1 nat，意味着当 KL 散度低于 1 nat 时不产生梯度。这允许编码器保留少量不可预测的信息（如随机噪声），避免过度压缩表征。此外，后验分布混入 1% 均匀分布以防止梯度稀疏。</div>\n<h5>核心机制 3：Critic 离散回归</h5>\n<p>传统 Critic 使用标量回归预测回报值，但当回报分布呈多模态（如稀疏奖励下大量零回报 + 少量高回报）时，均值回归会产生偏差。DreamerV3 的 Critic 输出一个在 symlog 空间 <span class=\"kb-math kb-math-inline\">[-20, +20]</span> 范围内 255 个等距桶上的 softmax 分布：</p>\n<div class=\"kb-math kb-math-display\">v_\\psi(s_t) \\doteq \\operatorname{symexp}\\big(p_\\psi(\\cdot\\mid s_t)^T B\\big), \\quad B \\doteq [-20 \\;\\ldots\\; +20]</div>\n<p>训练目标使用 <strong>twohot 编码</strong>的 <span class=\"kb-math kb-math-inline\">\\lambda</span>-return 作为软标签，通过分类交叉熵优化：</p>\n<div class=\"kb-math kb-math-display\">\\mathcal{L}_\\text{critic}(\\psi) = -\\sum_{t=1}^{T} y_t^T \\ln p_\\psi(\\cdot \\mid s_t), \\quad y_t = \\operatorname{sg}\\big(\\operatorname{twohot}(\\operatorname{symlog}(R_t^\\lambda))\\big)</div>\n<p>其中 twohot 编码将连续值分配到最近的两个桶上，权重与距离成反比。<span class=\"kb-math kb-math-inline\">\\lambda</span>-return 的递推公式为：</p>\n<div class=\"kb-math kb-math-display\">R_t^\\lambda \\doteq r_t + \\gamma c_t \\big((1-\\lambda)v_\\psi(s_{t+1}) + \\lambda R_{t+1}^\\lambda\\big), \\quad R_T^\\lambda \\doteq v_\\psi(s_T)</div>\n<div class=\"key-point\">💡 <strong>关键直觉</strong>：离散回归让 Critic 维护完整的回报分布而非单一均值。在稀疏奖励环境中，Critic 可以同时表示\"大概率零回报\"和\"小概率高回报\"两个模态，显著加速学习。</div>\n<h5>核心机制 4：鲁棒回报归一化</h5>\n<p>Actor 损失为：</p>\n<div class=\"kb-math kb-math-display\">\\mathcal{L}(\\theta) \\doteq \\sum_{t=1}^{T} \\operatorname{E}_{\\pi_\\theta, p_\\phi}\\big[\\operatorname{sg}(R_t^\\lambda) / \\max(1, S)\\big] - \\eta\\,\\mathrm{H}[\\pi_\\theta(a_t \\mid s_t)]</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">\\eta = 3 \\times 10^{-4}</span> 为熵正则化系数。关键创新在于缩放因子 <span class=\"kb-math kb-math-inline\">S</span>：</p>\n<div class=\"kb-math kb-math-display\">S = \\operatorname{Per}(R_t^\\lambda, 95) - \\operatorname{Per}(R_t^\\lambda, 5)</div>\n<p>使用百分位距而非标准差有两个优势：(1) 对异常值鲁棒；(2) 通过 <span class=\"kb-math kb-math-inline\">\\max(1, S)</span> 确保<strong>只缩小大回报、不放大小回报</strong>——当奖励稀疏时 <span class=\"kb-math kb-math-inline\">S &lt; 1</span>，回报不被缩放，策略保持足够的探索熵。</p>\n<div class=\"key-point\">💡 <strong>关键直觉</strong>：这一简单的非对称归一化是 DreamerV3 能用单一 <span class=\"kb-math kb-math-inline\">\\eta</span> 同时适应稠密和稀疏奖励的核心。传统方法除以标准差会在稀疏奖励下放大噪声，导致策略过早确定化而无法探索。</div>\n<h5>与 DreamerV2 的关键区别</h5>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>特性</th>\n<th>DreamerV2</th>\n<th>DreamerV3</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>预测损失</td>\n<td>MSE / 交叉熵</td>\n<td><strong>Symlog MSE</strong></td>\n</tr>\n<tr>\n<td>Critic 输出</td>\n<td>标量回归</td>\n<td><strong>255 桶离散回归 (twohot)</strong></td>\n</tr>\n<tr>\n<td>回报归一化</td>\n<td>除以标准差</td>\n<td><strong>百分位距 + max(1, S)</strong></td>\n</tr>\n<tr>\n<td>熵正则</td>\n<td>需要调参</td>\n<td><strong>固定 η=3e-4</strong></td>\n</tr>\n<tr>\n<td>KL 平衡</td>\n<td>α=0.8</td>\n<td><strong>α=0.5</strong></td>\n</tr>\n<tr>\n<td>后验分布</td>\n<td>纯分类</td>\n<td><strong>混入 1% 均匀分布</strong></td>\n</tr>\n<tr>\n<td>网络初始化</td>\n<td>默认</td>\n<td><strong>奖励/Critic 输出层零初始化</strong></td>\n</tr>\n<tr>\n<td>适用范围</td>\n<td>主要 Atari</td>\n<td><strong>7 大领域 150+ 任务</strong></td>\n</tr>\n</tbody>\n</table></div>\n<h5>实验亮点</h5>\n<p>DreamerV3 在以下领域均使用<strong>完全相同的超参数</strong>取得了强竞争力的表现：</p>\n<ul>\n<li><strong>Atari 100K &amp; 200M</strong>：匹配或超越专门调参的 EfficientZero、MuZero</li>\n<li><strong>DMControl (Proprio &amp; Vision)</strong>：连续控制基准上达到 SOTA</li>\n<li><strong>BSuite</strong>：诊断性基准上表现优异</li>\n<li><strong>Crafter</strong>：程序生成的 2D 生存游戏中刷新记录</li>\n<li><strong>Minecraft (钻石收集)</strong>：首次无人类数据从零收集钻石，需要完成约 20 步的长程依赖任务链（砍树→制作工作台→制作木镐→挖石头→制作石镐→挖铁→熔炼→制作铁镐→挖钻石）</li>\n</ul>",
      "quiz": {
        "q": "DreamerV3 中 Critic 使用离散回归（twohot 编码 + softmax 分布）而非传统标量回归的主要原因是什么？",
        "options": [
          "减少 Critic 网络的参数量",
          "使 Critic 能够表示多模态回报分布，加速稀疏奖励环境中的学习",
          "避免使用目标网络（target network）",
          "使 Critic 的输出可微分以支持反向传播"
        ],
        "answer": 1,
        "explain": "稀疏奖励环境中回报分布通常呈双模态（大量零回报+少量高回报），标量回归只能预测均值，而离散回归让 Critic 维护完整分布，能同时表示两个模态，显著加速学习。"
      }
    },
    {
      "id": "dreamdojo",
      "num": 37,
      "name": "DreamDojo",
      "fullName": "梦想道场 (Generalist Robot World Model)",
      "year": "2026",
      "org": "arXiv",
      "parent": "dreamerv3",
      "paperUrl": "https://arxiv.org/abs/2602.06949",
      "projectUrl": "",
      "category": "world_model",
      "motivation": "人类视频预训练通用世界模型",
      "summary": "DreamDojo 提出了一种基于大规模人类视频预训练的通用机器人世界模型框架，通过隐式动作（latent action）桥接人类视频与机器人数据之间的动作空间鸿沟，结合三阶段训练流程（预训练→后训练→蒸馏）和 Self Forcing 实时推理技术，在灵巧操作任务中实现了高保真视频预测，并成功应用于策略评估（Pearson r=0.995）、模型规划（2× 提升）和实时遥操作等下游任务。",
      "keyPoints": [
        "<strong>DreamDojo-HV 数据集</strong>：从 Ego4D、Epic-Kitchens 等来源精心筛选 44,000 小时人类手部操作视频，通过手部检测、运动过滤、美学评分等多阶段管线进行质量控制",
        "<strong>隐式动作模型（Latent Action Model）</strong>：训练 VAE 从连续帧对 <span class=\"kb-math kb-math-inline\">(o_t, o_{t+1})</span> 中提取连续隐式动作向量 <span class=\"kb-math kb-math-inline\">z_t</span>，使无动作标注的人类视频也能以动作条件方式训练世界模型",
        "<strong>相对动作表示 + 因果动作分块</strong>：使用 <span class=\"kb-math kb-math-inline\">a_t^{\\text{rel}} = a_t - a_{t-1}</span> 消除不同机器人形态的绝对动作偏移；因果分块确保生成第 <span class=\"kb-math kb-math-inline\">t</span> 帧时仅使用 <span class=\"kb-math kb-math-inline\">a_{1:t}</span> 而非未来动作",
        "<strong>三阶段训练流程</strong>：(1) 在人类视频上用隐式动作预训练；(2) 在目标机器人数据上用真实动作后训练（50/50 数据混合最优）；(3) Self Forcing 蒸馏实现实时自回归生成",
        "<strong>架构设计</strong>：基于 Cosmos-Predict2.5（DiT 架构），动作通过自适应层归一化（adaLN）注入，与扩散时间步共享条件通道",
        "<strong>时间一致性损失</strong>：在相邻帧的 latent token 之间施加余弦相似度约束，抑制自回归漂移",
        "<strong>下游应用验证</strong>：策略评估（与真实成功率 Pearson r=0.995）、基于模型的规划（相比无模型基线 2× 提升）、实时遥操作反馈"
      ],
      "detail": "<h5>系统架构总览</h5>\n<div class=\"img-wrap\"><img src=\"https://ar5iv.labs.arxiv.org/html/2602.06949/assets/figures/teaser.png\" alt=\"DreamDojo 系统架构\" loading=\"lazy\"><p class=\"img-caption\">▲ DreamDojo 系统架构</p></div>\n<p><em>图：DreamDojo 的三阶段训练流程。Stage 1 在大规模人类视频上用隐式动作预训练世界模型；Stage 2 在目标机器人数据上用真实动作后训练；Stage 3 通过 Self Forcing 蒸馏实现实时自回归推理。下游应用包括策略评估、模型规划和实时遥操作。</em></p>\n<h5>算法伪代码</h5>\n<pre><code>Algorithm: DreamDojo 三阶段训练流程\n══════════════════════════════════════════════════\n\n【Stage 0: 隐式动作模型训练】\n初始化 VAE 编码器 q_φ(z|o_t, o_{t+1}), 解码器 p_ψ(o_{t+1}|o_t, z)\nfor each (o_t, o_{t+1}) in 人类视频数据 do\n    z ~ q_φ(z|o_t, o_{t+1})                    # 编码隐式动作\n    ô_{t+1} = p_ψ(o_{t+1}|o_t, z)              # 解码预测下一帧\n    L_VAE = L_recon(ô_{t+1}, o_{t+1}) + β·KL(q_φ || N(0,I))\n    更新 φ, ψ\nend for\n\n【Stage 1: 人类视频预训练】\n初始化世界模型 W_θ (基于 Cosmos-Predict2.5 DiT)\nfor each 视频片段 {o_1,...,o_T} in DreamDojo-HV do\n    for t = 1 to T-1 do\n        z_t = q_φ(z|o_t, o_{t+1})              # 提取隐式动作（冻结VAE）\n    end for\n    a^{rel}_t = z_t - z_{t-1}                   # 相对隐式动作\n    A_{1:t} = CausalChunk(a^{rel}_{1:T})        # 因果动作分块\n    L_pretrain = L_flow(W_θ(o_{1:T}|A_{1:T}))   # Flow matching 损失\n                + λ·L_temporal                    # 时间一致性损失\n    更新 θ\nend for\n\n【Stage 2: 机器人数据后训练】\nfor each (视频, 动作) in 机器人数据 ∪ 人类视频(50/50) do\n    if 机器人数据:\n        a^{rel}_t = a_t - a_{t-1}               # 真实相对动作\n    else:\n        a^{rel}_t = z_t - z_{t-1}               # 隐式相对动作\n    L_posttrain = L_flow(W_θ(o_{1:T}|A_{1:T})) + λ·L_temporal\n    更新 θ\nend for\n\n【Stage 3: Self Forcing 蒸馏】\nfor each 训练样本 do\n    # 教师：完整上下文（真实帧）\n    ô^{teacher} = W_θ(noise | o_{1:T}, A)       # 全上下文前向\n    # 学生：自回归（用自己的预测帧）\n    for t = 1 to T do\n        ô_t = W_θ(noise | ô_{1:t-1}, A_{1:t})  # 用预测帧做上下文\n    end for\n    L_distill = ||ô^{student} - sg(ô^{teacher})||²  # sg=stop gradient\n    更新 θ（仅学生路径）\nend for\n</code></pre>\n<h5>动机与背景</h5>\n<p>构建通用机器人世界模型面临两大核心挑战：</p>\n<ol>\n<li><strong>数据稀缺</strong>：高质量机器人操作数据极其有限（如 DROID 仅约 350 小时），远不足以训练大规模视频生成模型</li>\n<li><strong>动作空间鸿沟</strong>：人类视频虽然海量但缺乏动作标注，且人手与机器人末端执行器的形态差异巨大</li>\n</ol>\n<p>DreamDojo 的核心洞察是：<strong>人类操作视频蕴含丰富的物理交互先验</strong>（物体动力学、接触力学、空间推理），这些先验可以通过隐式动作模型迁移到机器人世界模型中。这一思路类似于大语言模型先在大规模文本上预训练、再在特定任务上微调的范式。</p>\n<h5>隐式动作模型（Latent Action Model）</h5>\n<p>隐式动作模型是连接人类视频与机器人数据的关键桥梁。其核心思想是：即使没有显式动作标注，连续两帧之间的变化本身就隐含了\"动作\"信息。</p>\n<p><strong>模型结构</strong>：采用 VAE 架构\n- <strong>编码器</strong> <span class=\"kb-math kb-math-inline\">q_\\phi(z_t | o_t, o_{t+1})</span>：输入连续两帧，输出隐式动作向量 <span class=\"kb-math kb-math-inline\">z_t \\in \\mathbb{R}^d</span>\n- <strong>解码器</strong> <span class=\"kb-math kb-math-inline\">p_\\psi(\\hat{o}_{t+1} | o_t, z_t)</span>：给定当前帧和隐式动作，重建下一帧</p>\n<p><strong>训练目标</strong>：</p>\n<div class=\"kb-math kb-math-display\">\\mathcal{L}_{\\text{VAE}} = \\mathbb{E}_{q_\\phi}\\left[\\|o_{t+1} - \\hat{o}_{t+1}\\|^2\\right] + \\beta \\cdot D_{\\text{KL}}\\left(q_\\phi(z|o_t, o_{t+1}) \\| \\mathcal{N}(0, I)\\right)</div>\n<div class=\"key-point\">💡 <strong>关键设计</strong>：隐式动作向量 <span class=\"kb-math kb-math-inline\">z_t</span> 捕获的是帧间\"发生了什么变化\"的抽象表示，而非具体的关节角度或末端位姿。这使得同一个隐式动作空间可以统一描述人手抓取和机械臂操作。</div>\n<h5>相对动作表示（Relative Action Representation）</h5>\n<p>直接使用绝对动作值会引入机器人形态相关的偏移，阻碍跨形态迁移。DreamDojo 采用相对动作表示：</p>\n<div class=\"kb-math kb-math-display\">a_t^{\\text{rel}} = a_t - a_{t-1}</div>\n<p>对于机器人真实动作和隐式动作均适用。这样做的好处是：\n- 消除不同机器人之间的绝对位置偏移\n- 使动作语义更聚焦于\"变化量\"而非\"绝对状态\"\n- 实验证明相对表示在 FVD 指标上比绝对表示提升约 15%</p>\n<h5>因果动作分块（Causal Action Chunking）</h5>\n<p>在视频扩散模型中，标准做法是将整个动作序列 <span class=\"kb-math kb-math-inline\">a_{1:T}</span> 作为条件输入。但这存在<strong>信息泄漏</strong>问题：生成第 <span class=\"kb-math kb-math-inline\">t</span> 帧时不应看到未来动作 <span class=\"kb-math kb-math-inline\">a_{t+1:T}</span>。</p>\n<p>DreamDojo 提出因果动作分块机制：\n- 将视频帧按时间分为多个 chunk\n- 每个 chunk 仅接收当前及之前的动作作为条件\n- 通过在 DiT 的注意力机制中施加因果掩码实现</p>\n<div class=\"kb-math kb-math-display\">\\text{ActionCond}(t) = \\text{adaLN}\\left(\\text{MLP}(a_{1:\\lfloor t/C \\rfloor \\cdot C})\\right)</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">C</span> 为 chunk 大小。实验表明因果分块相比非因果方式在 FVD 上提升约 10%。</p>\n<h5>世界模型架构</h5>\n<p>DreamDojo 基于 <strong>Cosmos-Predict2.5</strong>（NVIDIA 的视频生成基础模型），核心为 DiT（Diffusion Transformer）架构：</p>\n<ul>\n<li><strong>视频 Tokenizer</strong>：将视频帧编码为连续 latent tokens（非离散 token）</li>\n<li><strong>DiT 主干</strong>：Transformer 处理 spatiotemporal latent tokens</li>\n<li><strong>动作条件注入</strong>：通过 <strong>自适应层归一化（adaLN）</strong> 将动作嵌入注入每个 Transformer 块，与扩散时间步 <span class=\"kb-math kb-math-inline\">t</span> 共享条件通道：</li>\n</ul>\n<div class=\"kb-math kb-math-display\">\\text{adaLN}(h, a, t) = \\gamma(a, t) \\cdot \\text{LayerNorm}(h) + \\beta(a, t)</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">\\gamma, \\beta</span> 由动作和时间步的拼接嵌入经 MLP 生成。</p>\n<ul>\n<li><strong>训练目标</strong>：Flow Matching（连续归一化流），相比离散扩散更高效：</li>\n</ul>\n<div class=\"kb-math kb-math-display\">\\mathcal{L}_{\\text{flow}} = \\mathbb{E}_{t, x_0, \\epsilon}\\left[\\|v_\\theta(x_t, t, c) - (x_0 - \\epsilon)\\|^2\\right]</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">x_t = (1-t)x_0 + t\\epsilon</span> 为插值噪声样本，<span class=\"kb-math kb-math-inline\">v_\\theta</span> 为速度场预测网络。</p>\n<h5>时间一致性损失（Temporal Consistency Loss）</h5>\n<p>自回归生成中，误差会随时间步累积导致视觉漂移。DreamDojo 引入时间一致性正则项：</p>\n<div class=\"kb-math kb-math-display\">\\mathcal{L}_{\\text{temporal}} = 1 - \\frac{1}{T-1}\\sum_{t=1}^{T-1} \\cos(h_t, h_{t+1})</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">h_t</span> 为第 <span class=\"kb-math kb-math-inline\">t</span> 帧的 latent token 表示，<span class=\"kb-math kb-math-inline\">\\cos(\\cdot, \\cdot)</span> 为余弦相似度。该损失鼓励相邻帧在隐空间中保持平滑过渡。</p>\n<h5>Self Forcing 蒸馏</h5>\n<p>标准扩散模型在推理时需要多步去噪（如 35 步 DDPM），无法满足实时需求。DreamDojo 采用 <strong>Self Forcing</strong> 蒸馏策略：</p>\n<ol>\n<li><strong>教师模型</strong>：使用完整真实上下文帧进行多步去噪，生成高质量预测</li>\n<li><strong>学生模型</strong>：以自回归方式运行，用自己之前的预测帧作为上下文</li>\n<li><strong>蒸馏损失</strong>：学生输出对齐教师输出（stop gradient 在教师端）</li>\n</ol>\n<div class=\"kb-math kb-math-display\">\\mathcal{L}_{\\text{SF}} = \\|\\hat{x}_0^{\\text{student}} - \\text{sg}(\\hat{x}_0^{\\text{teacher}})\\|^2</div>\n<p>蒸馏后的模型可以在<strong>单步去噪</strong>下实现自回归视频生成，推理速度提升约 35×，支持实时遥操作场景。</p>\n<h5>实验结果</h5>\n<p><strong>评估基准</strong>：DROID 数据集上 7 个灵巧操作任务（抓取、放置、开抽屉等）</p>\n<p><strong>关键发现</strong>：</p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>配置</th>\n<th>FVD ↓</th>\n<th>FID ↓</th>\n<th>SSIM ↑</th>\n<th>LPIPS ↓</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>仅机器人数据</td>\n<td>基线</td>\n<td>基线</td>\n<td>基线</td>\n<td>基线</td>\n</tr>\n<tr>\n<td>+ 人类视频预训练</td>\n<td><strong>显著提升</strong></td>\n<td><strong>显著提升</strong></td>\n<td><strong>提升</strong></td>\n<td><strong>提升</strong></td>\n</tr>\n<tr>\n<td>+ 相对动作</td>\n<td>额外 ~15% 提升</td>\n<td>—</td>\n<td>—</td>\n<td>—</td>\n</tr>\n<tr>\n<td>+ 因果分块</td>\n<td>额外 ~10% 提升</td>\n<td>—</td>\n<td>—</td>\n<td>—</td>\n</tr>\n<tr>\n<td>+ 时间一致性</td>\n<td>额外提升</td>\n<td>—</td>\n<td>—</td>\n<td>—</td>\n</tr>\n</tbody>\n</table></div>\n<p><strong>数据混合比例消融</strong>：</p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>人类:机器人</th>\n<th>FVD</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>0:100</td>\n<td>较高</td>\n</tr>\n<tr>\n<td>25:75</td>\n<td>中等</td>\n</tr>\n<tr>\n<td><strong>50:50</strong></td>\n<td><strong>最优</strong></td>\n</tr>\n<tr>\n<td>75:25</td>\n<td>回升</td>\n</tr>\n<tr>\n<td>100:0</td>\n<td>最高</td>\n</tr>\n</tbody>\n</table></div>\n<div class=\"key-point\">💡 <strong>关键发现</strong>：50/50 的数据混合比例在后训练阶段表现最优，说明人类视频提供的物理先验与机器人特定数据的平衡至关重要。</div>\n<p><strong>下游应用结果</strong>：</p>\n<ol>\n<li><strong>策略评估</strong>：世界模型预测的成功率与真实环境成功率的 Pearson 相关系数达到 <strong>r = 0.995</strong>，可作为策略选择的可靠代理指标</li>\n<li><strong>模型规划</strong>：基于世界模型的 CEM（交叉熵方法）规划相比无模型基线实现 <strong>2× 成功率提升</strong></li>\n<li><strong>实时遥操作</strong>：Self Forcing 蒸馏后的模型支持实时视频预测反馈，操作员可在执行前预览动作效果</li>\n</ol>\n<h5>与相关工作的对比</h5>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>方法</th>\n<th>预训练数据</th>\n<th>动作条件</th>\n<th>实时推理</th>\n<th>下游任务</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>UniSim</td>\n<td>互联网视频</td>\n<td>文本/动作</td>\n<td>✗</td>\n<td>数据增强</td>\n</tr>\n<tr>\n<td>Genie</td>\n<td>互联网视频</td>\n<td>隐式动作</td>\n<td>✗</td>\n<td>游戏生成</td>\n</tr>\n<tr>\n<td>IRASim</td>\n<td>机器人数据</td>\n<td>机器人动作</td>\n<td>✗</td>\n<td>数据增强</td>\n</tr>\n<tr>\n<td><strong>DreamDojo</strong></td>\n<td><strong>人类视频+机器人</strong></td>\n<td><strong>隐式+真实动作</strong></td>\n<td><strong>✓（Self Forcing）</strong></td>\n<td><strong>评估+规划+遥操作</strong></td>\n</tr>\n</tbody>\n</table></div>\n<p>DreamDojo 的独特贡献在于：(1) 首次系统性地利用大规模人类视频预训练机器人世界模型；(2) 通过隐式动作统一了异构数据源；(3) 通过 Self Forcing 实现了实时推理能力。</p>",
      "quiz": {
        "q": "",
        "options": [],
        "answer": 0,
        "explain": ""
      }
    },
    {
      "id": "adaworldpolicy",
      "num": 38,
      "name": "AdaWorldPolicy",
      "fullName": "自适应世界策略 (Adaptive World-Model-Driven Policy)",
      "year": "2026",
      "org": "arXiv",
      "parent": "dreamdojo",
      "paperUrl": "https://arxiv.org/abs/2602.07890",
      "projectUrl": "",
      "category": "world_model",
      "motivation": "流匹配DiT动作生成与未来想象",
      "summary": "AdaWorldPolicy 提出了一个统一的世界模型驱动扩散策略框架，将预训练视频世界模型（Cosmos）与动作专家、力预测器通过多模态自注意力（MMSA）深度融合，并创新性地利用世界模型的预测误差作为自监督信号，在测试时通过 LoRA 在线自适应学习（AdaOL）持续缩小视觉与物理域偏移，在仿真和真实机器人操作任务中均达到 SOTA。",
      "keyPoints": [
        "<strong>三模块统一架构</strong>：World Model（2B 参数，基于 Cosmos-Predict2）、Action Model（0.4B DiT）、Force Predictor（0.4B DiT），通过共享的多模态自注意力层（MMSA）深度耦合",
        "<strong>双运行模式</strong>：Mode I（Action Generation）——给定观测生成动作；Mode II（Future Imagination）——给定观测和动作预测未来帧，世界模型在训练时作为动作模型的主动监督者",
        "<strong>多模态自注意力（MMSA）</strong>：在 DiT 的 Transformer 层中，将世界模型、动作模型、力预测器的 token 拼接后做联合自注意力，实现跨模态信息流动，优于简单拼接或交叉注意力",
        "<strong>Flow Matching 训练</strong>：动作模型和力预测器均采用 Rectified Flow Matching 进行去噪训练，损失函数为 <span class=\"kb-math kb-math-inline\">L_1</span>（动作）和 <span class=\"kb-math kb-math-inline\">L_2</span>（力）",
        "<strong>在线自适应学习（AdaOL）</strong>：测试时利用世界模型预测的未来帧与真实观测在 VAE 隐空间的误差 <span class=\"kb-math kb-math-inline\">\\|E(o_{t+1}) - E(\\hat{o}_{t+1})\\|^2</span> 作为自监督信号，通过 LoRA（rank 16，前 4 层，&lt;0.1% 参数）以极低开销在线更新模型",
        "<strong>联合训练目标</strong>：<span class=\"kb-math kb-math-inline\">L_{total} = L_{WM} + \\lambda_1 L_{AM} + \\lambda_2 L_{FP}</span>，世界模型损失同时监督动作模型的学习质量",
        "<strong>实验覆盖广泛</strong>：LIBERO-10（0.96 成功率 SOTA）、Variant PushT（OOD 恢复）、CALVIN ABC→D（Avg. Len. 3.54 SOTA）、真实机器人 4 任务 4 种 OOD 场景"
      ],
      "detail": "<h5>框架总览</h5>\n<div class=\"img-wrap\"><img src=\"https://ar5iv.labs.arxiv.org/html/2602.20057/assets/x2.png\" alt=\"AdaWorldPolicy 框架总览\" loading=\"lazy\"><p class=\"img-caption\">▲ AdaWorldPolicy 框架总览</p></div>\n<p><em>图：AdaWorldPolicy 整体架构。左侧为统一的世界模型驱动扩散策略，包含 World Model、Action Model 和 Force Predictor 三个模块，通过 MMSA 层深度耦合。右侧为在线自适应学习（AdaOL）流程：利用世界模型预测误差驱动 LoRA 在线更新。</em></p>\n<h5>算法伪代码</h5>\n<pre><code class=\"language-python\"># ===== 离线训练阶段 =====\n# 输入: 数据集 D = {(o_t, a_t, f_t, o_{t+1})}\nfor batch in DataLoader(D):\n    o_t, a_t, f_t, o_next = batch\n\n    # 编码观测到 VAE 隐空间\n    z_t = VAE_Encode(o_t)\n    z_next = VAE_Encode(o_next)\n\n    # --- Mode I: Action Generation ---\n    # 对动作和力加噪 (Flow Matching)\n    noise_a, noise_f = sample_noise()\n    t = uniform(0, 1)\n    a_noisy = (1-t) * noise_a + t * a_t\n    f_noisy = (1-t) * noise_f + t * f_t\n\n    # MMSA 联合前向: WM tokens + AM tokens + FP tokens\n    wm_out, am_out, fp_out = MMSA_Forward(\n        wm_input=z_t,           # 世界模型: 当前帧\n        am_input=a_noisy,       # 动作模型: 带噪动作\n        fp_input=f_noisy,       # 力预测器: 带噪力\n        timestep=t\n    )\n\n    L_AM = L1(am_out, a_t - noise_a)      # 动作 flow matching loss\n    L_FP = L2(fp_out, f_t - noise_f)      # 力 flow matching loss\n\n    # --- Mode II: Future Imagination ---\n    z_next_pred = WorldModel_Forward(z_t, a_t)  # 用真实动作预测下一帧\n    L_WM = diffusion_loss(z_next_pred, z_next)  # 世界模型重建损失\n\n    # 联合优化\n    L_total = L_WM + lambda1 * L_AM + lambda2 * L_FP\n    optimizer.step(L_total)\n\n# ===== 在线自适应阶段 (AdaOL) =====\n# 测试时, 每收到新观测 o_{t+1}:\nfor each new observation o_{t+1}:\n    # 1. 用上一步动作 a_t 和观测 o_t 预测未来帧\n    o_hat_next = WorldModel_Predict(o_t, a_t)\n\n    # 2. 计算 VAE 隐空间预测误差\n    L_AdaOL = ||VAE_Encode(o_{t+1}) - VAE_Encode(o_hat_next)||^2\n\n    # 3. LoRA 在线更新 (rank=16, 前4层, lr=5e-7, 2 gradient steps)\n    lora_optimizer.step(L_AdaOL)\n\n    # 4. 生成下一步动作\n    a_{t+1} = ActionModel_Generate(o_{t+1})  # Mode I 推理\n</code></pre>\n<h5>动机与背景</h5>\n<p>传统的机器人操作策略学习面临两大核心挑战：</p>\n<ol>\n<li>\n<p><strong>策略与世界理解的割裂</strong>：现有方法要么将世界模型仅用于数据增强或辅助表征学习，要么完全依赖行为克隆，无法让世界模型在训练过程中主动指导策略优化。世界模型蕴含的丰富物理先验（物体运动规律、接触动力学）未被充分利用。</p>\n</li>\n<li>\n<p><strong>域偏移下的脆弱性</strong>：离线训练的策略在部署时面临不可避免的视觉偏移（光照、背景、物体外观变化）和物理偏移（摩擦力、物体质量变化），性能急剧下降。传统方法缺乏测试时自适应能力。</p>\n</li>\n</ol>\n<p>AdaWorldPolicy 的核心洞察是：<strong>世界模型不仅是一个被动的环境模拟器，更应该是策略学习的主动监督者</strong>。通过将世界模型与动作策略深度耦合，世界模型的预测质量直接影响策略的学习信号；而在测试时，世界模型的预测误差天然提供了一个无需人工标注的自监督信号，可用于在线自适应。</p>\n<h5>核心机制详解</h5>\n<p><strong>1. 多模态自注意力（MMSA）融合</strong></p>\n<p>AdaWorldPolicy 的三个模块（World Model、Action Model、Force Predictor）并非简单串联，而是通过 MMSA 在 Transformer 层级深度交互。具体而言，在每个 DiT block 中：</p>\n<div class=\"kb-math kb-math-display\">[\\mathbf{h}_{WM}, \\mathbf{h}_{AM}, \\mathbf{h}_{FP}] = \\text{SelfAttn}([\\mathbf{z}_{WM} \\| \\mathbf{z}_{AM} \\| \\mathbf{z}_{FP}])</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">\\mathbf{z}_{WM}</span> 是世界模型的视频 token（来自 Cosmos-Predict2 的 2B 参数骨干），<span class=\"kb-math kb-math-inline\">\\mathbf{z}_{AM}</span> 和 <span class=\"kb-math kb-math-inline\">\\mathbf{z}_{FP}</span> 分别是动作模型和力预测器的 token。三者在同一注意力矩阵中自由交互，使得：\n- 动作模型可以\"看到\"世界模型对未来的预测，从而学习物理一致的动作\n- 力预测器可以感知视觉上下文，提升接触力估计精度\n- 世界模型可以获得动作意图信息，提升预测准确性</p>\n<div class=\"key-point\">💡 关键：消融实验表明，将 MMSA 替换为简单拼接（Concatenation）成功率从 76.3% 暴跌至 36.3%，替换为交叉注意力（Cross-Attention）也仅有 50.0%，证明了联合自注意力对多模态融合的必要性。</div>\n<p><strong>2. 双模式训练机制</strong></p>\n<p>框架支持两种运行模式，共享同一套参数：</p>\n<ul>\n<li>\n<p><strong>Mode I（Action Generation）</strong>：输入当前观测 <span class=\"kb-math kb-math-inline\">o_t</span>，通过 Flow Matching 去噪过程生成动作序列 <span class=\"kb-math kb-math-inline\">a_t</span> 和力预测 <span class=\"kb-math kb-math-inline\">f_t</span>。此模式用于实际部署。</p>\n</li>\n<li>\n<p><strong>Mode II（Future Imagination）</strong>：输入当前观测 <span class=\"kb-math kb-math-inline\">o_t</span> 和真实动作 <span class=\"kb-math kb-math-inline\">a_t</span>，世界模型预测未来帧 <span class=\"kb-math kb-math-inline\">\\hat{o}_{t+1}</span>。此模式的损失 <span class=\"kb-math kb-math-inline\">L_{WM}</span> 反向传播时会通过 MMSA 影响动作模型的参数更新，实现\"世界模型监督策略学习\"。</p>\n</li>\n</ul>\n<p>联合训练目标为：</p>\n<div class=\"kb-math kb-math-display\">L_{total} = L_{WM} + \\lambda_1 L_{AM} + \\lambda_2 L_{FP}</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">L_{AM}</span> 采用 <span class=\"kb-math kb-math-inline\">L_1</span> 损失（对动作的稀疏变化更鲁棒），<span class=\"kb-math kb-math-inline\">L_{FP}</span> 采用 <span class=\"kb-math kb-math-inline\">L_2</span> 损失（力信号更连续）。</p>\n<div class=\"warn-box\">⚠️ 注意：消融实验显示，移除世界模型监督（<span class=\"kb-math kb-math-inline\">L_{WM}</span>）后，框架退化为普通行为克隆，成功率从 76.3% 降至 46.3%，这是所有消融中影响最大的因素。</div>\n<p><strong>3. 在线自适应学习（AdaOL）</strong></p>\n<p>AdaOL 是本文最具创新性的贡献之一。其核心思想是：在测试时，世界模型对下一帧的预测 <span class=\"kb-math kb-math-inline\">\\hat{o}_{t+1}</span> 与真实观测 <span class=\"kb-math kb-math-inline\">o_{t+1}</span> 之间的差异，直接反映了当前模型与真实环境之间的域偏移程度。</p>\n<p>自适应损失定义为：</p>\n<div class=\"kb-math kb-math-display\">L_{AdaOL} = \\| E(o_{t+1}) - E(\\hat{o}_{t+1}) \\|^2</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">E(\\cdot)</span> 是 VAE 编码器，将比较放在隐空间而非像素空间，既降低计算量又过滤无关的高频噪声。</p>\n<p>为实现高效在线更新，AdaOL 采用以下策略：\n- <strong>LoRA 微调</strong>：仅在前 4 层 Transformer 插入 rank=16 的 LoRA 适配器，可训练参数 &lt;0.1%\n- <strong>极低学习率</strong>：<span class=\"kb-math kb-math-inline\">lr = 5 \\times 10^{-7}</span>，防止灾难性遗忘\n- <strong>少量梯度步</strong>：每个新样本仅做 2 步梯度更新\n- <strong>实时性</strong>：整个闭环（动作生成 + 在线更新 + 设备延迟）平均运行在 4Hz，仅比无 AdaOL 慢约 5%</p>\n<p><strong>4. 力预测器的作用</strong></p>\n<p>力预测器（Force Predictor）是一个 0.4B 参数的 DiT，与动作模型共享 MMSA 层。它预测机器人末端执行器的接触力 <span class=\"kb-math kb-math-inline\">f_t \\in \\mathbb{R}^6</span>（6 维力/力矩）。</p>\n<p>力预测的意义在于：\n- 为动作模型提供隐式的物理约束（通过 MMSA 的信息流动）\n- 帮助模型理解接触动力学，对抓取、推动等需要精细力控的任务至关重要\n- 消融实验显示移除力预测器后成功率从 76.3% 降至 53.8%</p>\n<h5>与传统方法的区别</h5>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>维度</th>\n<th>Diffusion Policy</th>\n<th>世界模型+策略（松耦合）</th>\n<th><strong>AdaWorldPolicy</strong></th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>世界模型角色</td>\n<td>无</td>\n<td>数据增强/表征学习</td>\n<td><strong>主动监督者</strong></td>\n</tr>\n<tr>\n<td>模态融合</td>\n<td>单模态</td>\n<td>串联/独立</td>\n<td><strong>MMSA 深度耦合</strong></td>\n</tr>\n<tr>\n<td>力感知</td>\n<td>无</td>\n<td>通常无</td>\n<td><strong>力预测器联合训练</strong></td>\n</tr>\n<tr>\n<td>测试时适应</td>\n<td>无</td>\n<td>无</td>\n<td><strong>AdaOL 在线 LoRA</strong></td>\n</tr>\n<tr>\n<td>自监督信号</td>\n<td>无</td>\n<td>无</td>\n<td><strong>世界模型预测误差</strong></td>\n</tr>\n</tbody>\n</table></div>\n<h5>实验亮点</h5>\n<ul>\n<li><strong>LIBERO-10</strong>：平均成功率 0.96，超越 OpenVLA (0.82)、DP (0.78)、π₀-ft (0.92) 等强基线</li>\n<li><strong>CALVIN ABC→D</strong>：Avg. Len. 3.54（带 AdaOL），超越 GR-MG (3.42)、MoDE (3.39)、OpenVLA (3.27)</li>\n<li><strong>Variant PushT OOD</strong>：在背景/颜色/形状偏移下，AdaOL 将成功率从 0.47 提升至 0.51（背景偏移），从 0.61 提升至 0.66（形状偏移）</li>\n<li><strong>真实机器人</strong>：4 种 OOD 场景（光照、背景、桌面、物体变化）下，AWP (ol) 一致性显著优于离线版本</li>\n</ul>",
      "quiz": {
        "q": "AdaWorldPolicy 在测试时在线自适应学习（AdaOL）使用的自监督信号是什么？",
        "options": [
          "机器人动作与专家动作之间的模仿误差",
          "世界模型预测的未来帧与真实观测在 VAE 隐空间的重建误差",
          "力预测器输出与真实力传感器读数的差异",
          "策略网络输出动作的熵值变化"
        ],
        "answer": 1,
        "explain": "AdaOL 的核心是利用世界模型预测的下一帧 ô_{t+1} 与真实观测 o_{t+1} 在 VAE 编码器隐空间的 L2 距离作为自监督损失，无需任何人工标注即可驱动在线适应。"
      }
    },
    {
      "id": "rwml",
      "num": 39,
      "name": "RWML",
      "fullName": "强化世界模型学习 (Reinforcement World Model Learning)",
      "year": "2026",
      "org": "ICML",
      "parent": "dreamerv3",
      "paperUrl": "https://arxiv.org/abs/2602.05842",
      "projectUrl": "",
      "category": "world_model",
      "motivation": "帮助LLM智能体预测动作后果",
      "summary": "RWML 的核心目标是：帮助LLM智能体预测动作后果。",
      "keyPoints": [
        "核心动机：帮助LLM智能体预测动作后果",
        "演化来源：继承或改进自 dreamerv3",
        "代表机构：ICML"
      ],
      "detail": "<p>帮助LLM智能体预测动作后果</p>"
    },
    {
      "id": "hy_embodied",
      "num": 40,
      "name": "HY-Embodied-0.5",
      "fullName": "混元具身0.5 (HY-Embodied Foundation Model)",
      "year": "2026",
      "org": "Tencent",
      "parent": "dreamerv3",
      "paperUrl": "https://arxiv.org/abs/2604.07430",
      "projectUrl": "",
      "category": "world_model",
      "motivation": "混合Transformer在线策略蒸馏",
      "summary": "HY-Embodied-0.5 的核心目标是：混合Transformer在线策略蒸馏。",
      "keyPoints": [
        "核心动机：混合Transformer在线策略蒸馏",
        "演化来源：继承或改进自 dreamerv3",
        "代表机构：Tencent"
      ],
      "detail": "<p>混合Transformer在线策略蒸馏</p>"
    }
  ],
  "categories": {
    "foundation": {
      "label": "奠基算法",
      "color": "#22a06b"
    },
    "sim2real": {
      "label": "跨域迁移",
      "color": "#5b63d3"
    },
    "offline_rl": {
      "label": "离线强化学习",
      "color": "#e8820c"
    },
    "skill_hierarchical": {
      "label": "技能与层次化",
      "color": "#d32f2f"
    },
    "reward_design": {
      "label": "奖励与表征",
      "color": "#00acc1"
    },
    "world_model": {
      "label": "世界模型RL",
      "color": "#9c27b0"
    }
  },
  "projectUrls": {}
};
