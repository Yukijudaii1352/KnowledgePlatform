/**
 * agentic_rl-data.js — 由 pipeline/build.py 于 2026-06-15 17:41:24 自动生成。
 * 源文件：content/agent/agentic_rl.md
 * ⚠️  请勿手动修改；如需更新，修改源文档后重新编译。
 */
window.PAGE_CONFIG = {
  "meta": {
    "domain": "agent",
    "topic_id": "agentic_rl",
    "topic_name": "Agentic RL",
    "page_title": "Agentic RL 技术演进",
    "page_subtitle": "2026-06-15 版",
    "page_desc": "从 WebGPT、SayCan 的交互式反馈原型，到 Reflexion、Voyager 的语言自改进，再到 WebRL、WebAgent-R1、AgentRL、AgentJet 等端到端训练栈，以及 iStar、Agent-RRM、VPR、Q-Evolve 等奖励与信用分配方法，系统梳理面向 Agent 的强化学习主线与 2026 年最新进展。",
    "page_icon": "🤖",
    "hero_pills": [
      "🏷️ Agentic RL · Online Feedback · Self-Improvement",
      "Reward Design · Tool Use · Web Agents · Self-Play"
    ],
    "count_pill": "{count} 个算法",
    "image_base": "",
    "overview_from_doc": true,
    "latest_overview_from_doc": true
  },
  "overview": [
    {
      "title": "",
      "body_html": "<h1>面向LLM Agent强化学习（Agentic RL）综述</h1>\n<ul>\n<li>来源平台: <strong>zhihu</strong>（知乎专栏文章）</li>\n<li>原文链接: <a href=\"https://zhuanlan.zhihu.com/p/2032098279991808634\">https://zhuanlan.zhihu.com/p/2032098279991808634</a></li>\n<li>作者: 欠阿贝尔两块钱</li>\n</ul>\n<hr />\n<p>面向LLM Agent强化学习（Agentic RL）综述</p>\n<h1>面向LLM Agent强化学习（Agentic RL）综述</h1>\n<p>作者: 欠阿贝尔两块钱, 赞: 70</p>\n<p>该综述去年发布，梳理了大语言模型（LLM）+ 智能体（Agent）+ 强化学习（RL）交叉领域的全景综述。文章整合了全球 500+ 项最新研究，今年4月又增加了不少新的工作。</p>\n<h2>一、背景</h2>\n<ul>\n<li>传统 LLM-RL（RLHF/DPO 等）把大模型当作静态、单步、被动的文本生成器，<strong>重点优化输出是否符合偏好，用来对齐用</strong>。</li>\n<li>Agentic RL 把大模型当作动态、连续自主的决策智能体，用强化学习优化<strong>完整交互与决策能力</strong></li>\n</ul>\n<p><img alt=\"\" src=\"https://pic2.zhimg.com/v2-8450e8ec31fa0ef78292ba1e4dac9d9f_1440w.jpg\" /></p>\n<p>全文结构</p>\n<h2>二、 从 LLM RL 到 Agentic RL 范式演进</h2>\n<p>综述在理论上的最大贡献，是将大模型对齐的底层数学模型，从<strong>马尔可夫决策过程（MDP）</strong>演进至**时序扩展的部分可观测马尔可夫决策过程（POMDP）。从而来说明LLM RL到Agentic RL的演进过程。</p>\n<p><img alt=\"\" src=\"https://pica.zhimg.com/v2-e4b06f993b9de891091f75f0dd6f7666_1440w.jpg\" /></p>\n<p>从 LLM RL 到 Agentic RL 的范式转变。扇形设计体现了 RL 表述的向外扩展——从传统 RL（内层），到 LLM RL，再到完整的 Agentic RL（外层）。颜色编码区域表示：红色 = LLM RL 特有功能；蓝绿色 = AgenticRL 所需功能；紫色 = 现有 Agentic RL 实现。箭头向外指，表示在迈向更具智能体特性的设置时，交互广度（工具使用、网页浏览、动态环境）不断增加</p>\n<h3>2.1传统偏好强化学习（PBRFT / RLHF）：单步MDP范式</h3>\n<p>传统RLHF可以建模为一个<strong>单步马尔可夫决策过程（Single-step MDP）</strong>，其形式定义为：</p>\n<p><img alt=\"\\mathcal{M}_{\\text{trad}} = \\left\\langle S_{\\text{trad}}, A_{\\text{trad}}, P_{\\text{trad}}, R_{\\text{trad}}, T=1 \\right\\rangle \\\" src=\"https://www.zhihu.com/equation?tex=%5Cmathcal%7BM%7D_%7B%5Ctext%7Btrad%7D%7D+%3D+%5Cleft%5Clangle+S_%7B%5Ctext%7Btrad%7D%7D%2C+A_%7B%5Ctext%7Btrad%7D%7D%2C+P_%7B%5Ctext%7Btrad%7D%7D%2C+R_%7B%5Ctext%7Btrad%7D%7D%2C+T%3D1+%5Cright%5Crangle+%5C%5C\" /></p>\n<ul>\n<li><strong>状态空间</strong> <img alt=\"S_{\\text{trad}}\" src=\"https://www.zhihu.com/equation?tex=S_%7B%5Ctext%7Btrad%7D%7D\" />：仅包含由用户初始提示（prompt）定义的单一静态状态 <img alt=\"s_0\" src=\"https://www.zhihu.com/equation?tex=s_0\" />，整个交互过程中状态不发生变化。</li>\n<li><strong>动作空间</strong> <img alt=\"A_{\\text{trad}}\" src=\"https://www.zhihu.com/equation?tex=A_%7B%5Ctext%7Btrad%7D%7D\" />：模型的唯一动作是生成一段完整的文本序列。</li>\n<li><strong>转移动态</strong> <img alt=\"P_{\\text{trad}}\" src=\"https://www.zhihu.com/equation?tex=P_%7B%5Ctext%7Btrad%7D%7D\" />：模型生成回应后，交互过程立即终止，时间跨度固定为 <img alt=\"T=1\" src=\"https://www.zhihu.com/equation?tex=T%3D1\" />，属于典型的单步决策问题。</li>\n<li><strong>奖励函数</strong> <img alt=\"R_{\\text{trad}}\" src=\"https://www.zhihu.com/equation?tex=R_%7B%5Ctext%7Btrad%7D%7D\" />：奖励 <img alt=\"r(a)\" src=\"https://www.zhihu.com/equation?tex=r%28a%29\" /> 是对整段生成文本的一次性标量评估，通常由预先训练好的奖励模型给出，仅在对话结束时提供一次反馈。</li>\n<li><strong>学习目标</strong> <img alt=\"J_{\\text{trad}}\" src=\"https://www.zhihu.com/equation?tex=J_%7B%5Ctext%7Btrad%7D%7D\" />：优化目标为最大化单步期望奖励：<img alt=\"J_{\\text{trad}}(\\theta) = \\mathbb{E}_{a \\sim \\pi_\\theta}\\left[ r(a) \\right] \\\" src=\"https://www.zhihu.com/equation?tex=J_%7B%5Ctext%7Btrad%7D%7D%28%5Ctheta%29+%3D+%5Cmathbb%7BE%7D_%7Ba+%5Csim+%5Cpi_%5Ctheta%7D%5Cleft%5B+r%28a%29+%5Cright%5D+%5C%5C\" /></li>\n</ul>\n<blockquote>\n<p>PBRFT的逻辑就像做一道“一次性选择题”：给定题干（prompt），<strong>模型直接输出完整答案（生成文本），随后获得一个最终分数（reward），整个过程只有一步决策</strong>。</p>\n</blockquote>\n<h3>2.2智能体强化学习（Agentic RL）：长程POMDP范式</h3>\n<p>Agentic RL的场景复杂度显著提升，需建模为<strong>部分可观测马尔可夫决策过程（POMDP）</strong>，其形式定义为：</p>\n<p><img alt=\"\\mathcal{M}_{\\text{agent}} = \\left\\langle S_{\\text{agent}}, A_{\\text{agent}}, P_{\\text{agent}}, R_{\\text{agent}}, \\gamma, O \\right\\rangle \\\" src=\"https://www.zhihu.com/equation?tex=%5Cmathcal%7BM%7D_%7B%5Ctext%7Bagent%7D%7D+%3D+%5Cleft%5Clangle+S_%7B%5Ctext%7Bagent%7D%7D%2C+A_%7B%5Ctext%7Bagent%7D%7D%2C+P_%7B%5Ctext%7Bagent%7D%7D%2C+R_%7B%5Ctext%7Bagent%7D%7D%2C+%5Cgamma%2C+O+%5Cright%5Crangle+%5C%5C\" /></p>\n<ul>\n<li><strong>状态空间</strong> <img alt=\"S_{\\text{agent}}\" src=\"https://www.zhihu.com/equation?tex=S_%7B%5Ctext%7Bagent%7D%7D\" /> 与观测模型 <img alt=\"O\" src=\"https://www.zhihu.com/equation?tex=O\" />：环境状态 <img alt=\"s_t\" src=\"https://www.zhihu.com/equation?tex=s_t\" /> 随交互动态演化，且智能体无法直接观测完整状态，只能通过观测模型获取部分信息 <img alt=\"o_t = O(s_t)\" src=\"https://www.zhihu.com/equation?tex=o_t+%3D+O%28s_t%29\" />，属于典型的“部分可观测”场景。</li>\n<li>\n<p><strong>动作空间</strong> <img alt=\"A_{\\text{agent}}\" src=\"https://www.zhihu.com/equation?tex=A_%7B%5Ctext%7Bagent%7D%7D\" />：采用混合式动作空间，覆盖文本与工具交互两类行为：<img alt=\"A_{\\text{agent}} = A_{\\text{text}} \\cup A_{\\text{action}} \\\" src=\"https://www.zhihu.com/equation?tex=A_%7B%5Ctext%7Bagent%7D%7D+%3D+A_%7B%5Ctext%7Btext%7D%7D+%5Ccup+A_%7B%5Ctext%7Baction%7D%7D+%5C%5C\" /></p>\n</li>\n<li>\n<p><img alt=\"A_{\\text{text}}\" src=\"https://www.zhihu.com/equation?tex=A_%7B%5Ctext%7Btext%7D%7D\" />：生成自然语言文本，用于推理、表达与交互；</p>\n</li>\n<li>\n<p><img alt=\"A_{\\text{action}}\" src=\"https://www.zhihu.com/equation?tex=A_%7B%5Ctext%7Baction%7D%7D\" />：执行结构化动作，如调用API、使用工具、与虚拟/物理环境交互。</p>\n</li>\n<li>\n<p><strong>转移动态</strong> <img alt=\"P_{\\text{agent}}\" src=\"https://www.zhihu.com/equation?tex=P_%7B%5Ctext%7Bagent%7D%7D\" />：环境根据智能体的动作随机转移到下一状态 <img alt=\"s_{t+1} \\sim P(s_{t+1} | s_t, a_t)\" src=\"https://www.zhihu.com/equation?tex=s_%7Bt%2B1%7D+%5Csim+P%28s_%7Bt%2B1%7D+%7C+s_t%2C+a_t%29\" />，时间跨度 <img alt=\"T&gt;1\" src=\"https://www.zhihu.com/equation?tex=T%3E1\" />，支持多步长时序交互。</p>\n</li>\n<li><strong>奖励函数</strong> <img alt=\"R_{\\text{agent}}\" src=\"https://www.zhihu.com/equation?tex=R_%7B%5Ctext%7Bagent%7D%7D\" />：采用分层奖励设计，既包含任务完成时的稀疏终局奖励，也包含基于中间步骤进度的稠密反馈奖励，解决长程任务的信用分配难题。</li>\n<li><strong>学习目标</strong> <img alt=\"J_{\\text{agent}}\" src=\"https://www.zhihu.com/equation?tex=J_%7B%5Ctext%7Bagent%7D%7D\" />：优化目标为最大化长程折扣累积奖励，引导模型兼顾短期行为有效性与长期任务目标：<img alt=\"J_{\\text{agent}}(\\theta) = \\mathbb{E}_{\\tau \\sim \\pi_\\theta}\\left[ \\sum_{t=0}^{T-1} \\gamma^t R_{\\text{agent}}(s_t, a_t) \\right] \\\" src=\"https://www.zhihu.com/equation?tex=J_%7B%5Ctext%7Bagent%7D%7D%28%5Ctheta%29+%3D+%5Cmathbb%7BE%7D_%7B%5Ctau+%5Csim+%5Cpi_%5Ctheta%7D%5Cleft%5B+%5Csum_%7Bt%3D0%7D%5E%7BT-1%7D+%5Cgamma%5Et+R_%7B%5Ctext%7Bagent%7D%7D%28s_t%2C+a_t%29+%5Cright%5D+%5C%5C\" /></li>\n</ul>\n<h3>2.3传统 PBRFT（RLHF/DPO）和Agentic RL详细对比</h3>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>维度</th>\n<th>传统 PBRFT（RLHF/DPO）</th>\n<th>Agentic RL</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>决策过程</td>\n<td>退化单步 MDP</td>\n<td>时序扩展 POMDP</td>\n</tr>\n<tr>\n<td>观测</td>\n<td>完全可观测</td>\n<td>部分可观测</td>\n</tr>\n<tr>\n<td>动作</td>\n<td>仅文本生成</td>\n<td>文本 + 工具 / 环境操作</td>\n</tr>\n<tr>\n<td>奖励</td>\n<td>单步最终奖励</td>\n<td>稠密步骤奖励 + 最终奖励</td>\n</tr>\n<tr>\n<td>优化目标</td>\n<td>\\mathbb{E}[r(a)]</td>\n<td>\\mathbb{E}\\left[\\sum \\gamma^t R\\right]</td>\n</tr>\n<tr>\n<td>定位</td>\n<td>被动生成文本</td>\n<td>自主决策智能体</td>\n</tr>\n</tbody>\n</table></div>\n<p><img alt=\"\" src=\"https://pic2.zhimg.com/v2-267ca5147b383b3f6592c6738a0e078b_1440w.jpg\" /></p>\n<h2>三、 主流算法体系</h2>\n<p>为实现上述 POMDP 目标的求解，当前 Agentic RL 演化出三大主流算法谱系：</p>\n<h3>3.1 PPO 系列</h3>\n<ul>\n<li><strong>机制</strong>：通过 Actor-Critic 架构进行在线策略梯度更新，是目前最通用的对齐算法（衍生如 VinePPO, LitePPO）。</li>\n<li><strong>目标函数</strong>：<img alt=\"L_{\\text{PPO}}(\\theta) = \\frac{1}{N}\\sum_{i=1}^N \\min\\left( \\frac{\\pi_\\theta}{\\pi_{\\text{old}}}A_i,\\ \\text{clip}\\left(\\frac{\\pi_\\theta}{\\pi_{\\text{old}}},1-\\epsilon,1+\\epsilon\\right)A_i \\right)  \\\" src=\"https://www.zhihu.com/equation?tex=L_%7B%5Ctext%7BPPO%7D%7D%28%5Ctheta%29+%3D+%5Cfrac%7B1%7D%7BN%7D%5Csum_%7Bi%3D1%7D%5EN+%5Cmin%5Cleft%28+%5Cfrac%7B%5Cpi_%5Ctheta%7D%7B%5Cpi_%7B%5Ctext%7Bold%7D%7D%7DA_i%2C%5C+%5Ctext%7Bclip%7D%5Cleft%28%5Cfrac%7B%5Cpi_%5Ctheta%7D%7B%5Cpi_%7B%5Ctext%7Bold%7D%7D%7D%2C1-%5Cepsilon%2C1%2B%5Cepsilon%5Cright%29A_i+%5Cright%29++%5C%5C\" /> 其中优势函数 <img alt=\"A(s_t,a_t) = R(s_t,a_t) - V(s_t)\" src=\"https://www.zhihu.com/equation?tex=A%28s_t%2Ca_t%29+%3D+R%28s_t%2Ca_t%29+-+V%28s_t%29\" />。</li>\n</ul>\n<h3>3.2 DPO 系列</h3>\n<ul>\n<li><strong>机制</strong>：将强化学习问题转化为监督学习中的分类问题，无需训练独立的奖励模型（RM），简单高效（衍生如 SimPO, IPO, Step-DPO）。</li>\n<li><strong>目标函数</strong>：<img alt=\"\\mathcal{L}_{\\text{DPO}} = -\\mathbb{E}\\left[ \\log\\sigma\\left( \\beta\\left(\\log\\frac{\\pi_\\theta(y_w|x)}{\\pi_{\\text{ref}}(y_w|x)} -\\log\\frac{\\pi_\\theta(y_l|x)}{\\pi_{\\text{ref}}(y_l|x)}\\right) \\right) \\right]  \\\" src=\"https://www.zhihu.com/equation?tex=%5Cmathcal%7BL%7D_%7B%5Ctext%7BDPO%7D%7D+%3D+-%5Cmathbb%7BE%7D%5Cleft%5B+%5Clog%5Csigma%5Cleft%28+%5Cbeta%5Cleft%28%5Clog%5Cfrac%7B%5Cpi_%5Ctheta%28y_w%7Cx%29%7D%7B%5Cpi_%7B%5Ctext%7Bref%7D%7D%28y_w%7Cx%29%7D+-%5Clog%5Cfrac%7B%5Cpi_%5Ctheta%28y_l%7Cx%29%7D%7B%5Cpi_%7B%5Ctext%7Bref%7D%7D%28y_l%7Cx%29%7D%5Cright%29+%5Cright%29+%5Cright%5D++%5C%5C\" /></li>\n</ul>\n<h3>3. 3 GRPO 系列</h3>\n<ul>\n<li><strong>机制</strong>：<strong>放弃了传统 PPO 中与 Actor 同等规模的 Critic（价值网络）</strong>。针对同一个输入 Prompt（问题 <img alt=\"q\" src=\"https://www.zhihu.com/equation?tex=q\" />），模型一次性采样 <img alt=\"G\" src=\"https://www.zhihu.com/equation?tex=G\" /> 个不同的输出轨迹（组），通过计算这组轨迹的相对得分来更新策略。<strong>极大地节省了显存（少加载一个千亿参数模型），是当前大模型 RL（如 DeepSeek-R1）的绝对主流</strong>。</li>\n<li>\n<p><strong>目标函数</strong>： GRPO 的目标是最大化以下目标函数<img alt=\"\\mathcal{J}_{GRPO}(\\theta) = \\mathbb{E}_{q \\sim P(Q), {o_i}_{i=1}^G \\sim \\pi_{\\theta_{old}}(O|q)} \\left[ \\frac{1}{G} \\sum_{i=1}^G \\left( \\min \\left( \\rho_i \\hat{A}_i, \\text{clip}(\\rho_i, 1-\\epsilon, 1+\\epsilon) \\hat{A}_i \\right) - \\beta \\mathbb{D}_{KL}(\\pi_\\theta \\parallel \\pi_{ref}) \\right) \\right]  \\\" src=\"https://www.zhihu.com/equation?tex=%5Cmathcal%7BJ%7D_%7BGRPO%7D%28%5Ctheta%29+%3D+%5Cmathbb%7BE%7D_%7Bq+%5Csim+P%28Q%29%2C+%5C%7Bo_i%5C%7D_%7Bi%3D1%7D%5EG+%5Csim+%5Cpi_%7B%5Ctheta_%7Bold%7D%7D%28O%7Cq%29%7D+%5Cleft%5B+%5Cfrac%7B1%7D%7BG%7D+%5Csum_%7Bi%3D1%7D%5EG+%5Cleft%28+%5Cmin+%5Cleft%28+%5Crho_i+%5Chat%7BA%7D_i%2C+%5Ctext%7Bclip%7D%28%5Crho_i%2C+1-%5Cepsilon%2C+1%2B%5Cepsilon%29+%5Chat%7BA%7D_i+%5Cright%29+-+%5Cbeta+%5Cmathbb%7BD%7D_%7BKL%7D%28%5Cpi_%5Ctheta+%5Cparallel+%5Cpi_%7Bref%7D%29+%5Cright%29+%5Cright%5D++%5C%5C\" /></p>\n</li>\n<li>\n<p><strong>组采样（Group Sampling）</strong>：<img alt=\"{o_i}_{i=1}^G\" src=\"https://www.zhihu.com/equation?tex=%5C%7Bo_i%5C%7D_%7Bi%3D1%7D%5EG\" /> 表示对于同一个问题 <img alt=\"q\" src=\"https://www.zhihu.com/equation?tex=q\" />，旧策略 <img alt=\"\\pi_{\\theta_{old}}\" src=\"https://www.zhihu.com/equation?tex=%5Cpi_%7B%5Ctheta_%7Bold%7D%7D\" /> 生成了 <img alt=\"G\" src=\"https://www.zhihu.com/equation?tex=G\" /> 个不同的回答（例如 <img alt=\"G=4\" src=\"https://www.zhihu.com/equation?tex=G%3D4\" /> 或 <img alt=\"8\" src=\"https://www.zhihu.com/equation?tex=8\" />）。</p>\n</li>\n<li><strong>重要性采样比（Ratio）</strong>：<img alt=\"\\rho_i = \\frac{\\pi_\\theta(o_i|q)}{\\pi_{\\theta_{old}}(o_i|q)}\" src=\"https://www.zhihu.com/equation?tex=%5Crho_i+%3D+%5Cfrac%7B%5Cpi_%5Ctheta%28o_i%7Cq%29%7D%7B%5Cpi_%7B%5Ctheta_%7Bold%7D%7D%28o_i%7Cq%29%7D\" />，用于评估新旧策略的差异。</li>\n<li><strong>组内相对优势（Group Advantage）</strong>：<img alt=\"\\hat{A}_i\" src=\"https://www.zhihu.com/equation?tex=%5Chat%7BA%7D_i\" />。不需要价值网络来预测，直接用这 <img alt=\"G\" src=\"https://www.zhihu.com/equation?tex=G\" /> 个回答的真实奖励（Reward）进行标准化：<img alt=\"\\hat{A}_i = \\frac{r_i - \\text{mean}({r_1, ..., r_G})}{\\text{std}({r_1, ..., r_G})}  \\\" src=\"https://www.zhihu.com/equation?tex=%5Chat%7BA%7D_i+%3D+%5Cfrac%7Br_i+-+%5Ctext%7Bmean%7D%28%5C%7Br_1%2C+...%2C+r_G%5C%7D%29%7D%7B%5Ctext%7Bstd%7D%28%5C%7Br_1%2C+...%2C+r_G%5C%7D%29%7D++%5C%5C\" /> *(得分高于组内平均值的轨迹，优势为正，鼓励生成；低于平均的为负，抑制生成)*。</li>\n<li><strong>PPO 截断机制（Clipping）</strong>：<img alt=\"\\text{clip}(\\dots)\" src=\"https://www.zhihu.com/equation?tex=%5Ctext%7Bclip%7D%28%5Cdots%29\" /> 继承自 PPO，防止单次参数更新步子迈得太大，导致模型崩溃。</li>\n<li><strong>KL 散度惩罚（KL Penalty）</strong>：<img alt=\"\\beta \\mathbb{D}_{KL}(\\pi_\\theta \\parallel \\pi_{ref})\" src=\"https://www.zhihu.com/equation?tex=%5Cbeta+%5Cmathbb%7BD%7D_%7BKL%7D%28%5Cpi_%5Ctheta+%5Cparallel+%5Cpi_%7Bref%7D%29\" />。强制当前训练的模型 <img alt=\"\\pi_\\theta\" src=\"https://www.zhihu.com/equation?tex=%5Cpi_%5Ctheta\" /> 不要偏离初始参考模型 <img alt=\"\\pi_{ref}\" src=\"https://www.zhihu.com/equation?tex=%5Cpi_%7Bref%7D\" /> 太远，防止模型为了刷高分而输出乱码（Reward Hacking）。</li>\n</ul>\n<p><img alt=\"\" src=\"https://pic2.zhimg.com/v2-e0c3251aa8614a63cb50f6bfeb2f52f9_1440w.jpg\" /></p>\n<p>PPO、DPO 与 GRPO 系列主流变体的对比。Clip 指将策略比值限制在 1 附近，防止其变动过大，从而保证更新稳定；KLpenalty 指对学习策略与参考策略之间的 KL 散度施加惩罚，以确保对齐</p>\n<h2>四、RL 赋能的六大智能体能力</h2>\n<p><strong>LLM Agent–环境交互与 RL 循环</strong></p>\n<p><img alt=\"\" src=\"https://pic4.zhimg.com/v2-4665eb92d9ea903dd336a7b975026151_1440w.jpg\" /></p>\n<p>面向智能体 LLM 的智能体–环境交互与 RL 循环。核心智能体能力驱动动作生成，环境提供反馈与奖励，这些通过基于 RL&lt;br&gt;的优化在多样化任务域中聚合（“Collab.”表示需要显式任务划分与多智能体协调的任务）</p>\n<h3>1.规划（Planning）</h3>\n<p>规划是智能体为达成长期目标，对未来动作、推理步骤、工具调用序列进行预结构化与序贯决策的能力，是智能体从“被动响应”走向“主动控制”的核心标志。</p>\n<p>强化学习的核心作用</p>\n<p>RL 将规划从<strong>固定提示、静态分解、无反馈</strong>升级为<strong>可学习、可自适应、可随环境优化的策略</strong>，解决传统方法无法适应动态环境、无法从失败中修正规划的问题。</p>\n<p>两大范式</p>\n<p><strong>（1）RL 作为外部引导（External Guide）</strong></p>\n<ul>\n<li>机制：不直接微调LLM参数，而是训练<strong>价值网络/启发式函数</strong>，指导MCTS等搜索算法选择高价值规划路径。</li>\n</ul>\n<blockquote>\n<p>核心逻辑：LLM负责生成候选动作，RL负责评估与引导搜索。</p>\n</blockquote>\n<ul>\n<li>\n<p>典型工作：</p>\n</li>\n<li>\n<p>RAP：将推理视为世界模型规划，用RL价值函数指导MCTS。</p>\n</li>\n<li>LATS：语言智能体树搜索，融合思考、行动、反思与RL价值评估。</li>\n<li>\n<p>Planning without Search：离线RL训练语言价值裁判，零参数更新增强规划。</p>\n</li>\n<li>\n<p>优势：不破坏LLM原有生成能力，即插即用。</p>\n</li>\n</ul>\n<p><strong>（2）RL 作为内部驱动（Internal Driver）</strong></p>\n<ul>\n<li>机制：直接将LLM视为策略网络，通过与环境交互<strong>端到端微调</strong>，让规划能力内化为模型行为。</li>\n</ul>\n<blockquote>\n<p>核心逻辑：规划不再是单纯的prompt，而是LLM在交互中习得的内在策略。</p>\n</blockquote>\n<ul>\n<li>\n<p>典型工作：</p>\n</li>\n<li>\n<p>VOYAGER：具身智能体中用RL终身学习规划与技能库。</p>\n</li>\n<li>ETO、AdaPlan：用DPO/RL优化长程任务规划。</li>\n<li>\n<p>Planner-R1：用过程奖励强化规划步骤，提升小模型规划能力。</p>\n</li>\n<li>\n<p>优势：完全自主、动态适应、可长期自我改进。</p>\n</li>\n</ul>\n<p>结论</p>\n<ul>\n<li>传统规划：固定prompt分解、无反馈、不可学习。</li>\n<li>Agentic RL 规划：<strong>价值引导+策略学习</strong>，实现动态、自适应、长程、鲁棒的序贯决策。</li>\n</ul>\n<h3>2.工具使用（Tool Using）</h3>\n<p>工具使用是智能体在推理过程中自主调用外部模块（检索、计算器、浏览器、代码解释器、API等）扩展能力的行为，是LLM突破知识边界的关键。</p>\n<p><img alt=\"\" src=\"https://pic3.zhimg.com/v2-254ac50bb2ca76fd027b773cd9ff0bb4_1440w.jpg\" /></p>\n<p>智能体工具使用的发展</p>\n<p>强化学习的核心作用</p>\n<p>RL让工具使用从<strong>模仿、固定模式、不可泛化</strong>升级为<strong>战略级自主决策</strong>，实现“何时用、用什么、如何组合、如何从错误恢复”。</p>\n<p>三阶段演进</p>\n<p><strong>（1）早期：ReAct 式提示范式（无RL）</strong></p>\n<ul>\n<li>代表：ReAct</li>\n<li>模式：Think → Act → Observe</li>\n</ul>\n<blockquote>\n<p>局限：纯上下文学习、不可学习、无法泛化新工具。</p>\n</blockquote>\n<p><strong>（2）中期：监督微调 SFT（无RL）</strong></p>\n<ul>\n<li>代表：Toolformer、AgentTuning、FireAct</li>\n<li>模式：学习固定工具调用格式</li>\n</ul>\n<blockquote>\n<p>局限：静态复制、无法处理异常、不会动态决策。</p>\n</blockquote>\n<p><strong>（3）高阶：RL 驱动工具集成推理 TIR（Agentic RL 核心）</strong></p>\n<ul>\n<li>定义：Tool-integrated Reasoning，工具调用与认知推理深度融合。</li>\n<li>\n<p>RL 机制：</p>\n</li>\n<li>\n<p>优化工具调用<strong>时机、选择、顺序、组合、错误恢复</strong>。</p>\n</li>\n<li>\n<p>用<strong>过程奖励+最终奖励</strong>进行长程信用分配。</p>\n</li>\n<li>\n<p>典型工作：</p>\n</li>\n<li>\n<p>ToolRL：从零直接用RL学习工具策略。</p>\n</li>\n<li>ReTool：长程工具链规划。</li>\n<li>GiGPO、SpaRL：步级优势估计，解决信用分配难题。</li>\n<li>\n<p>OpenAI o3、Kimi K2：工业级TIR系统。</p>\n</li>\n<li>\n<p>优势：自适应、鲁棒、可处理复杂多工具协同。</p>\n</li>\n</ul>\n<p>区别</p>\n<ul>\n<li><strong>传统工具使用</strong>：模仿学习、静态格式、被动触发。</li>\n<li><strong>Agentic RL 工具使用</strong>：<strong>自主策略、动态调度、长程规划、错误恢复</strong>，真正实现工具增强智能。</li>\n</ul>\n<h3>3.记忆（Memory）</h3>\n<p>记忆是智能体<strong>对历史信息、对话、知识、经验进行存储、检索、更新、遗忘与管理的能力，是长时程交互的基础</strong>。</p>\n<p><img alt=\"\" src=\"https://pica.zhimg.com/v2-52daf1fd0b6148c917f1dabc3201d13a_1440w.jpg\" /></p>\n<p>三类经典智能体Memory方案</p>\n<p>强化学习的核心作用</p>\n<p>RL让记忆从<strong>被动存储、固定规则、启发式检索</strong>升级为<strong>可学习、可控制、可优化的主动管理系统</strong>。</p>\n<p>三大技术路线</p>\n<p><strong>1.RAG 风格记忆 + RL</strong></p>\n<ul>\n<li>机制：RL控制<strong>检索时机、写入策略、摘要粒度、重排排序</strong>。</li>\n<li>代表：Memory-R1、Prospect、Mem-α</li>\n<li>能力：学习何时查、查什么、如何整合记忆。</li>\n</ul>\n<p><strong>2.Token 级记忆 + RL</strong></p>\n<ul>\n<li>\n<p>显式记忆Token：MemAgent、MEM1、Memory Token</p>\n</li>\n<li>\n<p>RL决策保留/覆盖哪些自然语言Token。</p>\n</li>\n<li>\n<p>隐式记忆Token：MemoryLLM、M+、MemGen</p>\n</li>\n<li>\n<p>可微记忆向量，RL端到端优化读写。</p>\n</li>\n</ul>\n<p><strong>3.结构化记忆 + RL（前沿方向）</strong></p>\n<ul>\n<li>形态：时序知识图谱、层级图、原子记忆单元</li>\n<li>代表：Zep、G-Memory、A-MEM、Mem0</li>\n<li>未来方向：RL自动控制图谱增删改查（尚未充分探索）。</li>\n</ul>\n<p>对比</p>\n<ul>\n<li><strong>传统记忆：静态存储、规则检索、无自适应。</strong></li>\n<li><strong>Agentic RL 记忆</strong>：<strong>RL驱动全生命周期管理</strong>，<strong>包括写入、检索、更新、遗忘、压缩、扩展</strong>。</li>\n</ul>\n<h3>4.自我改进（Self-Improving）</h3>\n<blockquote>\n<p>智能体通过反思、纠错、迭代、自博弈、自训练，持续提升自身策略、推理与规划的能力，是通用智能的核心标志。</p>\n</blockquote>\n<p>强化学习的核心作用</p>\n<p>RL让自我改进从<strong>一次性语言反思</strong>升级为<strong>可固化、可迭代、可无限进化</strong>的内在能力。</p>\n<p>三层进化体系</p>\n<p><strong>（1）语言自我纠正（非参数、无梯度）</strong></p>\n<ul>\n<li>机制：生成→评判→改写，纯文本反馈。</li>\n<li>代表：Reflexion、Self-Refine、CRITIC、Chain-of-Verification</li>\n<li>局限：改进不持久、不内化到参数。</li>\n</ul>\n<p><strong>（2）内化自我纠正（参数化 RL）</strong></p>\n<ul>\n<li>机制：用DPO/GRPO/RPO将反思能力固化到模型权重。</li>\n<li>代表：Reflection-DPO、KnowSelf、DuPo</li>\n<li>优势：反思成为模型固有行为，跨任务泛化。</li>\n</ul>\n<p><strong>（3）迭代自我训练（最高阶、无上限进化）</strong></p>\n<ul>\n<li>机制：自创任务、自博弈、自验证、RL迭代。</li>\n<li>\n<p>代表：</p>\n</li>\n<li>\n<p>Absolute Zero：无人类数据自对弈。</p>\n</li>\n<li>R-Zero：MCTS+RL自主推演。</li>\n<li>\n<p>Sirius、MALT：集体自举进化。</p>\n</li>\n<li>\n<p>优势：完全自主、脱离数据、无限进化。</p>\n</li>\n</ul>\n<p>结论</p>\n<ul>\n<li><strong>传统自我改进：临时纠错、不可迁移。</strong></li>\n<li>Agentic RL 自我改进：<strong>反思→参数固化→自博弈迭代</strong>，<strong>实现真正自主智能体进化。</strong></li>\n</ul>\n<h3>5.推理（Reasoning）</h3>\n<blockquote>\n<p>推理是智能体对问题进行逻辑推断、多步演绎、验证与反思的能力，综述采用双系统理论：快思考 vs 慢思考。</p>\n</blockquote>\n<p>强化学习的核心作用</p>\n<p>RL解决<strong>快思考易幻觉、慢思考效率低</strong>的问题，实现<strong>自适应思考长度</strong>，并激励严谨、可信、长程推理。</p>\n<p>双系统 + RL</p>\n<p><strong>（1）快推理（System 1）</strong></p>\n<ul>\n<li>直觉、快速、一步到位</li>\n<li>缺陷：易幻觉、浅推理</li>\n<li>RL作用：学习置信度、拒绝不确定问题。</li>\n</ul>\n<p><strong>（2）慢推理（System 2）</strong></p>\n<ul>\n<li>多步、结构化、验证式、长思维链</li>\n<li>\n<p>RL作用：</p>\n</li>\n<li>\n<p>增加thinking过程</p>\n</li>\n<li>步骤监督</li>\n<li>过程奖励</li>\n<li>\n<p>自我修正</p>\n</li>\n<li>\n<p>代表：DeepSeek-R1、OpenAI o1/o3、GRPO、Reflexion</p>\n</li>\n</ul>\n<p>Agentic RL 推理创新</p>\n<ul>\n<li>自适应思考：根据难度自动选择快慢思考。</li>\n<li>过程奖励：解决长推理信用分配难题。</li>\n<li>可验证奖励：基于执行/符号检验降低幻觉。</li>\n</ul>\n<p>结论</p>\n<ul>\n<li><strong>传统推理：固定长度、单步生成、不可控</strong>。</li>\n<li><strong>Agentic RL 推理</strong>：<strong>快慢协同、自适应思考、过程监督、自我修正</strong>。</li>\n</ul>\n<h3>6.感知（Perception）</h3>\n<blockquote>\n<p>感知是智能体获取并理解多模态信息（图像、视频、音频、状态）的能力，从“被动看图”升级为“主动视觉认知”。</p>\n</blockquote>\n<p>强化学习的核心作用</p>\n<p>RL让感知从<strong>被动特征提取</strong>升级为<strong>主动感知、交互式查询、聚焦式理解</strong>。</p>\n<p>三大主动感知范式</p>\n<p><strong>（1）定位驱动感知</strong></p>\n<ul>\n<li>机制：推理步骤绑定图像区域，反复查询、聚焦、验证。</li>\n<li>代表：GRIT、Ground-R1、DeepEyes、Chain-of-Focus</li>\n<li>能力：看哪里、聚焦哪里、回看哪里。</li>\n</ul>\n<p><strong>（2）工具驱动感知</strong></p>\n<ul>\n<li>机制：调用视觉工具（检测、分割、编辑、绘制）辅助认知。</li>\n<li>代表：VisTA、VTool-R1、Visual-ARFT、Pixel-Reasoner</li>\n<li>能力：用工具“增强眼睛”。</li>\n</ul>\n<p><strong>（3）生成驱动感知</strong></p>\n<ul>\n<li>机制：在推理中生成草图、想象图像，辅助逻辑推理。</li>\n<li>代表：Visual Planning、GoT-R1、T2I-R1</li>\n<li>能力：用想象力辅助感知与推理。</li>\n</ul>\n<p>多模态扩展</p>\n<ul>\n<li>视觉：Vision-R1、VLM-R1、Visual-RFT</li>\n<li>音频：RL优化TTS与音频问答</li>\n<li>3D感知：3D空间推理与RL奖励塑形</li>\n</ul>\n<p>结论</p>\n<ul>\n<li>传统感知：被动输入、一次性编码、无交互。</li>\n<li>Agentic RL 感知：<strong>主动看、聚焦看、反复看、用工具看、用想象看</strong>。</li>\n</ul>\n<p><img alt=\"\" src=\"https://pic3.zhimg.com/v2-6dd04e5829ea402edd9454c7613a5ddc_1440w.jpg\" /></p>\n<p>RL 如何在六大核心能力上赋能智能体 LLM 的概览。中央面板汇总能力分类，侧面板展示代表性 RL 机制与交互模式。</p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>能力</th>\n<th>传统方式（无RL）</th>\n<th>Agentic RL 方式</th>\n<th>核心升级</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>规划</td>\n<td>固定Prompt分解</td>\n<td>外部价值引导 + 内部策略学习</td>\n<td>动态自适应、长程鲁棒</td>\n</tr>\n<tr>\n<td>工具使用</td>\n<td>ReAct/SFT静态模仿</td>\n<td>工具集成推理TIR、自主策略</td>\n<td>战略调用、错误恢复</td>\n</tr>\n<tr>\n<td>记忆</td>\n<td>规则检索、被动存储</td>\n<td>RL全生命周期主动管理</td>\n<td>读写优化、自适应遗忘</td>\n</tr>\n<tr>\n<td>自我改进</td>\n<td>临时语言反思</td>\n<td>内化纠错 + 自博弈迭代</td>\n<td>永久进化、无上限</td>\n</tr>\n<tr>\n<td>推理</td>\n<td>固定长度单步生成</td>\n<td>快慢双系统 + 自适应思考</td>\n<td>低幻觉、强严谨</td>\n</tr>\n<tr>\n<td>感知</td>\n<td>被动看图</td>\n<td>主动定位+工具+想象</td>\n<td>交互式、多步认知</td>\n</tr>\n</tbody>\n</table></div>\n<h2>五、应用领域</h2>\n<p>Agentic RL 已落地高验证性、高交互性任务：</p>\n<ul>\n<li><code>search / deep research agent</code>：<strong>自主联网检索、深度报告</strong>（OpenAI Deep Research、Search-R1）；</li>\n<li><code>代码智能体</code>：生成、调试、软件工程（SWE-Bench、DeepSWE、Qwen3-Coder）；</li>\n<li><code>数学智能体</code>：非形式推理 + 形式定理证明（DeepSeek-Prover、rStar2-Agent）；</li>\n<li><code>GUI 智能体</code>：手机 / 电脑 / 网页自动操作（WebArena、OSWorld、UI-R1）；</li>\n<li><code>视觉智能体</code>：多模态主动感知与推理；</li>\n<li><code>具身智能体</code>：机器人导航与操控（Voyager）；</li>\n<li><code>多智能体系统</code>：协作 / 博弈 / 分工（MAGRPO、MAPoRL）；</li>\n<li><code>其他</code>：文本游戏、时序预测、Text-to-SQ</li>\n</ul>\n<p><img alt=\"\" src=\"https://picx.zhimg.com/v2-d12cedd9bae4a45fbb1abb55aeb06cad_1440w.jpg\" /></p>\n<p>面向领域智能体的强化学习演化树</p>\n<p><img alt=\"\" src=\"https://pic4.zhimg.com/v2-ab8dffbe7b489e121064cb2eefebe053_1440w.jpg\" /></p>\n<p>基于强化学习的search agent与research agent方法汇总</p>\n<p><img alt=\"\" src=\"https://pic2.zhimg.com/v2-311e113a7d8ccd40d9a6d38291bbf43d_1440w.jpg\" /></p>\n<p>面向代码与软件工程智能体的强化学习方法汇总</p>\n<p><img alt=\"\" src=\"https://pic1.zhimg.com/v2-24f88b8017656840b690818c11629574_1440w.jpg\" /></p>\n<p>面向数学推理智能体的强化学习方法汇总</p>\n<p><img alt=\"\" src=\"https://pic1.zhimg.com/v2-710aa47ecc9ea0122a5083b35f25ed4c_1440w.jpg\" /></p>\n<p>按训练范式和环境复杂度分类的 GUI 智能体方法汇总</p>\n<p><img alt=\"\" src=\"https://pic2.zhimg.com/v2-dc4d39f6965bd7f19c193356b0d530a7_1440w.jpg\" /></p>\n<p>基于 LLM 的多智能体系统中强化学习与演化范式汇总。“Dynamic”表示该多智能体系统是否为任务动态，即是否以不同配置（智能体数量、拓扑结构、推理深度、提示词等）处理不同任务查询。“Train”表示该方法是否对智能体的 LLM 主干进行训练</p>\n<p><img alt=\"\" src=\"https://pic3.zhimg.com/v2-1cbbe9a475ce8dc64ade39c2ec376b02_1440w.jpg\" /></p>\n<p>：面向智能体强化学习的环境与基准概览，按智能体能力、任务领域及模态分类。智能体能力以如下符号表示： 推理、 规划、工具使用、记忆、协作、自我改进</p>\n<p><img alt=\"\" src=\"https://pic1.zhimg.com/v2-2ef5e1881535fd849f5894e32e11c44c_1440w.jpg\" /></p>\n<p>按类型与关键特征分类的强化学习框架汇总</p>\n<h2>六、 核心结论、挑战与未来方向</h2>\n<h3>1. 主要发现</h3>\n<ul>\n<li><strong>Scaling 规律</strong>：加大 RL 训练阶段的计算量（Test-time Compute / RL Scaling Law），可系统性提升智能体能力。<strong>充分 RL 训练的小模型可匹敌大模型</strong>。</li>\n<li><strong>奖励的关键性</strong>：纯 RL 的后训练可能损害事实性，而将 SFT 与可验证奖励的 RL 过程相结合的结构化方法，则可缓解这种退化。<strong>可验证、密集 过程奖励”（Process-based rewards）如 FSPO，对智能体的每一步推理进行事实性验证，从而直接惩罚不真实的中间步骤。这类的的奖励设计是 Agentic RL 成功的关键因素</strong>。</li>\n</ul>\n<h3>2. 当前核心挑战</h3>\n<ul>\n<li><strong>可信度危机</strong>：RL 容易引发Reward Hacking、幻觉放大以及Sycophancy行为(<strong>LLM在有ground truth的情况下，为迎合用户显性表达的信念而偏离事实的行为</strong>)。</li>\n<li><strong>规模化瓶颈</strong>：长序列多步采样的计算成本极高；模型在强化学习过程中容易出现<strong>熵坍缩（Entropy Collapse)：策略（Policy）的熵值（Entropy）急剧下降，导致策略的随机性显著降低，智能体过早放弃探索，陷入局部最优</strong></li>\n<li><strong>环境局限</strong>：当前多为静态模拟器，缺乏能与智能体协同进化的动态自适应训练环境。</li>\n</ul>\n<h3>3. 未来研究方向</h3>\n<ol>\n<li><strong>可信智能体</strong>：内嵌安全护栏、基于事实的奖励模型设计。</li>\n<li><strong>高效训练算法</strong>：低算力消耗、小数据依赖、跨任务迁移的轻量级 RL 算法。</li>\n<li><strong>元学习（Meta-Learning）</strong>：让智能体在 RL 过程中学会“如何学习”与“如何反思”。</li>\n<li><strong>真实世界部署</strong>：建立“人在回路（Human-in-the-loop）”、分层编排与标准化的多智能体通信协议。</li>\n</ol>"
    }
  ],
  "latest_overview": [
    {
      "title": "",
      "body_html": "<h1>Agent训练不稳定、奖励太稀疏还缺数据？ICLR 2026六种RL方案让智能体越训越强</h1>\n<ul>\n<li>来源平台: <strong>zhihu</strong>（知乎专栏文章）</li>\n<li>原文链接: <a href=\"https://zhuanlan.zhihu.com/p/2041260073725551575\">https://zhuanlan.zhihu.com/p/2041260073725551575</a></li>\n<li>作者: nightli101</li>\n</ul>\n<hr />\n<p>Agent训练不稳定、奖励太稀疏还缺数据？ICLR 2026六种RL方案让智能体越训越强</p>\n<h1>Agent训练不稳定、奖励太稀疏还缺数据？ICLR 2026六种RL方案让智能体越训越强</h1>\n<p>作者: nightli101, 赞: 6</p>\n<p>强化学习训练大语言模型智能体这几年火得不行。核心思路很简单：让Agent在环境里试错，做对了给奖励，做错了给惩罚，模型自己学会怎么决策。听起来很美好，但实际落地时麻烦一大堆——长程任务训练不稳定、奖励信号太稀疏、跨平台数据稀缺、特定领域没有运行环境，这些问题让不少RL Agent项目卡在实验室里出不来。</p>\n<p>最近梳理了一下基于RL的智能体训练与扩展方向的工作——主要来自ICLR 2026，发现研究者们从训练框架、奖励设计、工具集成、跨平台数据、无环境合成和策略推理六个角度提出了各种解决思路。这篇综述带你看看几篇有意思的工作。</p>\n<p>__________________________________________________</p>\n<h2>一、为什么RL-based Agent训练如此重要又如此困难</h2>\n<p>大语言模型当Agent用，本质上是在解决序列决策问题。每步决策不仅影响当前状态，还影响后续所有可能的行动路径。传统监督学习是\"给定输入输出对，学会映射关系\"，但Agent的任务往往没有标准答案——同样一个问题，可能有多种解决路径，有的高效有的绕远。强化学习通过试错和奖励反馈，让模型自己探索出好的策略。</p>\n<p>但RL训练Agent有几个核心难点。第一是长程稳定性。一个任务如果需要交互几十轮，训练过程中微小的策略偏差会随时间累积，导致后期完全崩盘。第二是奖励稀疏。很多任务只有最终成功才给奖励，中间几十步都没有反馈，模型不知道\"刚才那步到底对不对\"。第三是数据瓶颈。Agent需要和环境交互来收集训练数据，但真实环境往往有限制——网络安全场景可能没有可执行环境，GUI操作场景需要覆盖多种操作系统，这些都不是简单爬点文本就能解决的。</p>\n<p>怎么让RL训练更稳定、奖励更密集、数据更容易获取，成了这个方向的核心挑战。</p>\n<p>__________________________________________________</p>\n<h2>二、几篇值得一看的工作</h2>\n<h3>AgentGym-RL：开源框架让长程Agent RL训练不再玄学</h3>\n<p>AgentGym-RL这篇论文标题是《AgentGym-RL: An Open-Source Framework to Train LLM Agents for Long-Horizon Decision Making via Multi-Turn Reinforcement Learning》。</p>\n<p>AgentGym-RL想解决什么问题？</p>\n<p>开源社区训练LLM Agent时，一直缺一个好用的统一RL框架。现有的工具要么是针对单轮任务的，要么只支持特定环境，没法覆盖Web浏览、科学计算、代码执行、机器人控制等多样化场景。更重要的是，长程交互任务的RL训练特别不稳定——模型可能在头几步表现还行，但越往后越跑偏，最后完全失控。</p>\n<p>这种不稳定性来自两个因素。一是信用分配问题：一个任务成功了，中间几十步里到底哪几步是关键？传统RL的梯度信号很难精准定位。二是探索与利用的平衡：长程任务里，一次激进的探索可能让模型陷入死胡同，之后所有训练都白搭。现有方法大多靠内部推理（Chain-of-Thought）来增强决策，但忽视了与外部环境交互的重要性。</p>\n<p>它是怎么做的？</p>\n<p>AgentGym-RL提出了一个模块化的开源框架，核心设计是解耦的Agent-环境-训练流水线。Env Server支持Web、科学、搜索、机器人、代码、游戏等多种场景；LLM Agent负责决策；Update Policy模块支持GRPO、RLOO、REINFORCE++、PPO等主流算法。</p>\n<p>关键创新是ScalingInter-RL分阶段训练策略。它不一上来就挑战长程任务，而是先训练短时程的基础策略，等模型稳定后再逐步增加交互深度。这种\"由短到长\"的渐进式训练有效缓解了长程交互中的梯度爆炸和策略崩塌问题。</p>\n<p><img alt=\"\" src=\"https://picx.zhimg.com/v2-af68ad1260f1219e067442a9cd14534d_1440w.jpg\" /></p>\n<p><em>AgentGym-RL架构图</em></p>\n<p><em>这个框架的解耦设计很关键——环境、Agent、训练三个模块独立，你可以换环境不改Agent，换算法不改环境。ScalingInter-RL的分阶段思路有点像人类学习，先练基本功再挑战复杂任务。</em></p>\n<p>实验结果如何？</p>\n<p>在27个多样化任务上，AgentGym-RL训练的模型表现媲美甚至超越了OpenAI o3和Gemini 2.5-Pro等商业模型。具体来看，ScalingInter-7B在TextCraft上达到71.0分，BabyAI达到90.0分，SciWorld从基线的1.50大幅提升到25.69。在知识密集型问答任务上，RL模型的整体表现超过了GPT-4o和Qwen-Max等专有模型。</p>\n<p><img alt=\"\" src=\"https://pic2.zhimg.com/v2-f71c5767993c6f92699bc1d57f6e69e9_1440w.jpg\" /></p>\n<p><em>AgentGym-RL算法对比</em></p>\n<p><em>GRPO在三个任务上的得分全面超过REINFORCE++，特别是在BabyAI上优势很大（93.33 vs 82.22），说明组相对策略优化在多轮决策任务里确实更稳定。</em></p>\n<p><img alt=\"\" src=\"https://pic3.zhimg.com/v2-db30b71a71e57fe1167b3ac9aeb791b4_1440w.jpg\" /></p>\n<p><em>AgentGym-RL综合对比</em></p>\n<p><em>在8个知识问答数据集的综合对比中，OpenAI o3以49.5分领先，但AgentGym-RL训练的模型在开源模型中表现突出，DeepSeek-R1-0528达到40.3分，说明RL训练确实能显著提升Agent的推理能力。</em></p>\n<p>__________________________________________________</p>\n<h3>E-GRPO：用实体感知奖励让\"差一点成功\"的样本也能被学习</h3>\n<p>先来看看上海科技大学（ShanghaiTech）的E-GRPO，这篇论文标题是《Repurposing Synthetic Data for Fine-grained Search Agent Supervision》。</p>\n<p>E-GRPO想解决什么问题？</p>\n<p>搜索Agent训练时，现有的GRPO方法只关注最终结果——答案对了就给奖励，错了就不给。这种稀疏奖励有个大问题：很多样本其实是\"差一点就成功了\"，推理过程找到了不少相关实体，只是最后答案差了一点点。这些\"近失\"样本里包含了大量有价值的学习信号，但传统方法把它们和完全失败的样本一视同仁地丢弃了。</p>\n<p>举个例子，Agent搜索\"某部电影的导演还导过哪些片\"，它可能正确识别了导演名字和相关电影实体，但最后组装答案时漏掉了一部。这种情况下，推理过程其实是有价值的，应该给予部分奖励，而不是直接打零分。怎么从被丢弃的实体信息里挖掘出细粒度的监督信号，是E-GRPO要解决的问题。</p>\n<p>它是怎么做的？</p>\n<p>E-GRPO的核心是实体匹配率量化指标。它在Agent的推理轨迹中提取所有识别到的实体，然后和正确答案中的实体集合做对比，计算匹配度。基于这个匹配度构建稠密的实体感知奖励函数——即使最终答案错了，只要实体匹配度高，也能获得部分奖励。</p>\n<p>训练时，E-GRPO在标准GRPO的组相对优势估计基础上，叠加了实体级奖励信号。这样模型不仅能从成功案例中学习，还能从\"近失\"案例中学会\"怎么改进一下就能对\"。</p>\n<p><img alt=\"\" src=\"https://pic4.zhimg.com/v2-2e162d68f80cbebbf5a9e5718ab26e59_1440w.jpg\" /></p>\n<p><em>E-GRPO架构图</em></p>\n<p><em>这个架构对比了GRPO和E-GRPO的奖励逻辑——GRPO只看最终答案对不对，E-GRPO还看中间识别了多少正确实体。你会发现这种稠密奖励让训练信号丰富了很多。</em></p>\n<p>实验结果如何？</p>\n<p>在GAIA、BrowseComp、BrowseComp-ZH、X-Bench-DS四个基准上，E-GRPO显著优于传统GRPO。Web-30B-E-GRPO在多个指标上表现最佳。在本地知识问答任务上，Local-7B-E-GRPO的平均得分超过了SFT和GRPO基线。更值得注意的是，E-GRPO训练的Agent工具调用次数更少，说明它不仅提升了准确率，还让推理策略更高效。</p>\n<p><img alt=\"\" src=\"https://pic2.zhimg.com/v2-60c303d44369d3e2a45a4b567120cbd7_1440w.jpg\" /></p>\n<p><em>E-GRPO性能对比</em></p>\n<p><em>在BrowseComp这种复杂浏览任务上，E-GRPO的优势很明显。OpenAI-o3虽然还是最强，但E-GRPO训练的开源Agent已经能摸到它的脚后跟。</em></p>\n<p><img alt=\"\" src=\"https://pic4.zhimg.com/v2-40ca763da48beb029773625b29fdc797_1440w.jpg\" /></p>\n<p><em>E-GRPO消融实验</em></p>\n<p><em>消融实验说明alpha参数用固定值0.3和decay策略差别不大，说明实体感知奖励本身的设计是核心，具体衰减方式对最终效果影响有限。</em></p>\n<p>__________________________________________________</p>\n<h3>TIR-Judge：给LLM裁判装上Python执行器，8B模型匹敌Claude-Opus-4</h3>\n<p>TIR-Judge这篇论文标题是《Boosting Agentic Reasoning in LLM Judges via Tool-Integrated Reinforcement Learning》。</p>\n<p>TIR-Judge想解决什么问题？</p>\n<p>LLM当裁判（Judge）评估回答质量时，通常只靠文本推理。但很多问题需要精确验证——比如\"这个Python函数的输出是否符合预期\"、\"这段代码的复杂度是不是O(n)\"、\"这首诗是不是恰好40个字\"。纯文本推理在这种场景下很容易出错，尤其是涉及数值计算和逻辑验证时。</p>\n<p>现有方法的问题在于，裁判模型要么直接输出一个分数（黑盒评分），要么只进行文本层面的比较，没法执行代码来验证逻辑正确性。怎么让裁判模型获得\"动手验证\"的能力，是TIR-Judge的出发点。</p>\n<p>它是怎么做的？</p>\n<p>TIR-Judge提出了工具集成推理（TIR）框架，给LLM裁判装上了Python执行器。裁判在评估回答时，可以生成Python代码来验证约束条件——比如数一下字数、检查格式、执行逻辑判断。这个框架基于三大设计原则：可验证与不可验证领域的多样化训练、灵活的评判格式（单点/成对/列表式）、以及无需蒸馏直接从基座模型启动的迭代RL。</p>\n<p>训练过程包括SFT预热、拒绝采样筛选高质量输出、以及RL迭代优化。特别的是TIR-Judge-Zero变体，完全不需要蒸馏数据，只靠强化学习就能达到和蒸馏版本相当的性能。</p>\n<p><img alt=\"\" src=\"https://pic3.zhimg.com/v2-4de52741f7cbaa270e366dc97e88acda_1440w.jpg\" /></p>\n<p><em>TIR-Judge架构图</em></p>\n<p><em>这个架构最值得关注的是Python执行器的集成——裁判不再只是\"读一读然后打分\"，而是能写代码验证。你会发现三种评判格式（Pointwise/Pairwise/Listwise）让框架适用场景很广。</em></p>\n<p>实验结果如何？</p>\n<p>在7个公共基准上，TIR-Judge在单点和成对评估上超越了现有的强推理裁判。Listwise性能上，仅8B参数的TIR-Judge-Zero达到了与Claude-Opus-4相当的水平。在偏好排序任务中，TIR-Judge-Zero 4B的准确率达到80.67%，显著优于基线模型Qwen-3-4B-Tool的65.79%。</p>\n<p><img alt=\"\" src=\"https://pic4.zhimg.com/v2-9b03c3f9f3ff763232a11bf7258acfe9_1440w.jpg\" /></p>\n<p><em>TIR-Judge对比实验</em></p>\n<p><em>TIR-Judge-Zero 8B在数学推理任务上拿到84.1分，专注度89.5分，两项都是所有模型中最高的。这说明工具集成对需要精确验证的任务帮助巨大。</em></p>\n<p><img alt=\"\" src=\"https://pica.zhimg.com/v2-9d47bf597c1298f40cf271481b657622_1440w.jpg\" /></p>\n<p><em>TIR-Judge成本对比</em></p>\n<p><em>有意思的是，TIR-Judge-Distill虽然计算成本更低（340美元 vs 690美元），但TIR-Judge-Zero完全不依赖教师API，这在实际部署时是个不小的优势。</em></p>\n<p>__________________________________________________</p>\n<h3>ScaleCUA：跨平台数据让开源计算机使用Agent真正\"通吃\"</h3>\n<p>ScaleCUA这篇论文标题是《ScaleCUA: Scaling Open-Source Computer Use Agents with Cross-Platform Data》。</p>\n<p>ScaleCUA想解决什么问题？</p>\n<p>计算机使用Agent（CUA）是让AI直接操作图形界面的前沿方向，但训练这种Agent需要大量GUI操作轨迹数据。问题是这类数据极其稀缺——不像图文对可以从网上爬，GUI操作轨迹需要人在各种软件里实际操作并录屏，收集成本极高。</p>\n<p>更麻烦的是操作系统差异。Windows、macOS、Linux、iOS、Android的界面规范完全不同，现有模型通常只针对单一平台训练，跨平台泛化能力很差。如果一个Agent只能在Windows上用，到了Mac上就抓瞎，实用性大打折扣。怎么构建覆盖多平台的大规模数据集，并训练出跨平台通用的CUA，是ScaleCUA要解决的问题。</p>\n<p>它是怎么做的？</p>\n<p>ScaleCUA设计了一个自动化Agent与人类专家协同的闭环流水线。自动化Agent在多个平台上执行预设任务并收集轨迹，人类专家审核和修正这些轨迹，修正后的数据再用来训练更好的Agent，形成数据飞轮。最终构建的数据集覆盖了六大操作系统（Android、iOS、iPadOS、Web、Linux、macOS、Windows）和三个任务领域（理解、定位、任务规划）。</p>\n<p>训练时采用统一的跨平台模型架构，同一套参数处理所有操作系统的界面。为了增强泛化能力，还引入了数据增强策略，对界面元素进行随机变换和扰动。</p>\n<p><img alt=\"\" src=\"https://pic4.zhimg.com/v2-0f75fc68d66b2ba332d9323a98f32a4b_1440w.jpg\" /></p>\n<p><em>ScaleCUA架构图</em></p>\n<p><em>这个闭环流水线的思路很聪明——Agent产数据、人审数据、数据训Agent、Agent产更多数据。你会发现多平台覆盖不是简单拼数据，而是需要统一的动作指令集和界面表示。</em></p>\n<p>实验结果如何？</p>\n<p>ScaleCUA-32B在WebArena-Lite-v2上比基线提升26.6分，ScreenSpot-Pro提升10.7分。MMBench-GUI L1-Hard达到94.4%，OSWorld-G达到60.6%。在跨平台对比中，ScaleCUA-32B的平均分82.0领先于其他开源模型。在AndroidControl-High任务上，ScaleCUA-32B的任务成功率达到75.9%，定位准确率87.3%。</p>\n<p><img alt=\"\" src=\"https://pic2.zhimg.com/v2-b8572fa3f6192be3d12c571a46535e9f_1440w.jpg\" /></p>\n<p><em>ScaleCUA跨平台对比</em></p>\n<p><em>跨平台性能对比显示，ScaleCUA-32B在多个操作系统上 consistently 领先。通用模型如Claude-3.7和GPT-4o在某些平台上表现不错，但跨平台一致性不如专门训练的ScaleCUA。</em></p>\n<p><img alt=\"\" src=\"https://pic1.zhimg.com/v2-6723fea64934de0bb3fe86cd6fa1311c_1440w.jpg\" /></p>\n<p><em>ScaleCUIA消融实验</em></p>\n<p><em>消融实验验证了数据增强的价值——加了Augmentation后SS-Pro得分从37.8提升到41.3，说明跨平台数据增强对泛化能力确实有帮助。</em></p>\n<p>__________________________________________________</p>\n<h3>CYBER-ZERO：没有运行环境也能训练网络安全Agent</h3>\n<p>CYBER-ZERO这篇论文标题是《Cyber-Zero: Training Cybersecurity Agents without Runtime》，来自莫纳什大学（Monash University）和AWS AI Labs。</p>\n<p>CYBER-ZERO想解决什么问题？</p>\n<p>训练网络安全Agent（比如自动打CTF竞赛的AI）通常需要可执行的运行时环境——你要能真的运行漏洞利用代码、访问服务器、拿到flag。但这类环境往往很难获取：CTF竞赛的服务器是临时的，企业内网不能随意攻击，真实漏洞环境搭建成本高。现有方法在没有运行时的情况下，基本没法训练。</p>\n<p>这是个很实际的困境。GitHub Issue解决任务可以用公开代码库做环境，但网络安全任务的环境往往是\"用一次就销毁\"的。怎么在没有实际执行环境的情况下，合成高质量的训练轨迹，是CYBER-ZERO要解决的核心问题。</p>\n<p>它是怎么做的？</p>\n<p>CYBER-ZERO的核心思路是利用公开的CTF解题报告（Writeups）作为知识源，通过角色驱动的LLM模拟来逆向工程运行时行为。具体来说，它设计了两个角色：Player Model模拟人类选手分析挑战、生成解题命令；Terminal Model模拟终端环境，根据命令返回合理的输出结果。两个模型交替对话，生成完整的交互轨迹。</p>\n<p>关键是，Terminal Model不需要真的执行命令——它基于CTF报告中的信息和通用系统知识，\"推测\"出合理的终端响应。这种模拟虽然不如真实执行精确，但能生成大量逼真的训练数据。</p>\n<p><img alt=\"\" src=\"https://pic3.zhimg.com/v2-30167c970bfda426dd1f5542d41ee7a8_1440w.jpg\" /></p>\n<p><em>CYBER-ZERO架构图</em></p>\n<p><em>这个双角色模拟架构很有意思——Player和Terminal都是LLM，一个出题一个应答，在想象空间里完成整个CTF过程。你会发现Writeup在这里不只是参考资料，而是整个模拟流程的剧本。</em></p>\n<p>实验结果如何？</p>\n<p>CYBER-ZERO-32B在InterCode-CTF、NYU CTF Bench、Cybench三个基准上都取得了显著的性能提升。和基线相比，不同规模的模型（8B、14B、32B）在微调后均有明显改善。特别是在Cybench上，8B模型的零样本失败率降低达到51.6%。CYBER-ZERO-32B的整体表现已能与最先进的开源模型相媲美。</p>\n<p><img alt=\"\" src=\"https://pic1.zhimg.com/v2-bc1e31122531a4cd90a6fa949bf7e348_1440w.jpg\" /></p>\n<p><em>CYBER-ZERO性能对比</em></p>\n<p><em>模型规模越大，微调后的提升越明显。32B模型在微调模式下平均失败率降低7.4%，虽然数字看起来不大，但在CTF这种高难度任务上已经是很实质性的进步。</em></p>\n<p><img alt=\"\" src=\"https://pic1.zhimg.com/v2-8ec0c8649ca3b267ec1ba8b4adb0f7c8_1440w.jpg\" /></p>\n<p><em>CYBER-ZERO数据集对比</em></p>\n<p><em>CYBER-ZERO是唯一同时覆盖检测、利用、Agent和真实任务四个维度的数据集，其他数据集都只有其中一两项。这说明无运行时合成确实能填补数据空白。</em></p>\n<p>__________________________________________________</p>\n<h3>RebuttALAgent：用心智理论让AI学会\"说服\"审稿人</h3>\n<p>RebuttALAgent这篇论文标题是《Dancing in Chains: Strategic Persuasion in Academic Rebuttal via Theory of Mind》，来自香港科技大学（HKUST）。</p>\n<p>RebuttALAgent想解决什么问题？</p>\n<p>学术反驳（Rebuttal）是论文被审稿人质疑后，作者写回复说服审稿人改分的过程。这不是简单的\"你问啥我答啥\"，而是高度策略性的沟通——审稿人可能没理解你的方法、可能对你的实验设计有偏见、可能根本没仔细看论文。有效的反驳需要站在审稿人的角度思考：他为什么这么问？他的关注点是什么？什么样的回应最能打消他的顾虑？</p>\n<p>现有方法把反驳当成普通文本生成任务，只学习表面语言模式，完全忽视了这种心理博弈。怎么让Agent具备\"心智理论\"（Theory of Mind）能力——理解他人的信念、意图和视角——是RebuttALAgent要解决的问题。</p>\n<p>它是怎么做的？</p>\n<p>RebuttALAgent提出了TSR（ToM-Strategy-Response）三阶段框架。首先，ToM模块分析审稿人的心理状态，构建分层画像（宏观立场+微观关注点）。然后，Strategy模块基于画像制定说服策略——是正面回应质疑、还是转移话题强调其他贡献、还是补充实验数据。最后，Response模块生成具体的反驳文本。</p>\n<p>训练分两阶段：先用监督微调赋予模型ToM分析和规划能力，再用GRPO强化学习配合自奖励机制实现自我提升。同时构建了RebuttALBench数据集和RebuttAL-RM评估器，后者在10万+样本上训练，评分一致性超越了GPT-4.1。</p>\n<p><img alt=\"\" src=\"https://pic4.zhimg.com/v2-fe01989a233dd12fd8f05436fd31ee2b_1440w.jpg\" /></p>\n<p><em>RebuttALAgent架构图</em></p>\n<p><em>TSR框架的设计很符合人类写反驳的真实流程——先琢磨审稿人怎么想的，再想怎么回应，最后才动笔。Self-reward机制让模型能自我评估反驳质量，不依赖外部裁判。</em></p>\n<p>实验结果如何？</p>\n<p>RebuttALAgent在多个评估维度上表现优异，平均分达到9.27（满分10分），超过了o3（9.10）、GPT-4.1和DeepSeek-R1。在策略优化后的对比中，引入Ours_Strategy让模型平均分从7.31提升到7.88。RebuttAL-RM评估器在态度、清晰度、说服力、建设性四个维度上的相关性指标全面领先于基线模型。</p>\n<p><img alt=\"\" src=\"https://picx.zhimg.com/v2-b4db6510cc533453c9e28b899b0d5e4b_1440w.jpg\" /></p>\n<p><em>RebuttALAgent综合评分</em></p>\n<p><em>RebuttALAgent平均分9.27领先所有对比模型，说明心智理论的引入确实让反驳更具说服力。有意思的是所有模型在跨语境（Co）场景下得分都比单语言高。</em></p>\n<p><img alt=\"\" src=\"https://pic1.zhimg.com/v2-59b10e3216059995fc03c0f5a186a380_1440w.jpg\" /></p>\n<p><em>RebuttALAgent消融实验</em></p>\n<p><em>消融实验验证了训练策略和数据的作用——o3基线已经很强（9.21），但RebuttALAgent通过ToM建模和策略优化还能再往上提。</em></p>\n<p>__________________________________________________</p>\n<h2>三、它们之间怎么选</h2>\n<p>这六个方法解决的问题各不相同，但可以分成三类来看。</p>\n<p><strong>训练框架与稳定性</strong>：AgentGym-RL聚焦的是\"怎么训\"——提供一个开源的统一RL框架，用ScalingInter-RL的分阶段训练解决长程交互不稳定问题。如果你需要从零开始训练一个覆盖多场景的Agent，这个框架是最完整的解决方案。</p>\n<p><strong>奖励设计与信号密度</strong>：E-GRPO和TIR-Judge都在改进RL的奖励机制，但方向不同。E-GRPO解决的是\"奖励太稀疏\"——通过实体匹配率给\"近失\"样本部分奖励，让模型能从更多样本中学习。TIR-Judge解决的是\"奖励不可靠\"——通过Python执行器让裁判能精确验证约束，避免文本推理的模糊性。</p>\n<p><strong>数据获取与领域适配</strong>：ScaleCUA、CYBER-ZERO和RebuttALAgent都在解决\"没数据怎么训\"的问题。ScaleCUA通过人机协同闭环收集跨平台GUI数据；CYBER-ZERO通过角色模拟在没有运行时的环境下合成网络安全轨迹；RebuttALAgent通过批判-优化方法合成学术反驳数据。三者的共同思路是\"用合成数据填补真实数据的空白\"，但合成方式因领域而异。</p>\n<p><strong>简单总结：</strong></p>\n<p>需要训练长程决策Agent但现有框架不够用？AgentGym-RL的开源框架和ScalingInter-RL分阶段训练值得一试。</p>\n<p>搜索Agent训练时大量\"差一点成功\"的样本被浪费？E-GRPO的实体感知奖励能让这些样本也发挥价值。</p>\n<p>LLM裁判在精确验证任务上总出错？TIR-Judge的Python执行器集成让8B小模型也能匹敌Claude-Opus-4。</p>\n<p>要做一个跨操作系统通用的GUI Agent？ScaleCUA的跨平台数据集和统一模型架构提供了现成方案。</p>\n<p>网络安全领域没有可执行环境来训练Agent？CYBER-ZERO的双角色模拟框架能合成逼真的CTF交互轨迹。</p>\n<p>需要让Agent学会策略性沟通和说服？RebuttALAgent的心智理论框架把\"理解对方意图\"融入了生成过程。</p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>方法</th>\n<th>核心策略</th>\n<th>优势</th>\n<th>局限</th>\n<th>适用场景</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>AgentGym-RL</td>\n<td>模块化框架+ScalingInter-RL分阶段训练</td>\n<td>长程稳定、多场景覆盖、开源</td>\n<td>训练资源需求大</td>\n<td>长程决策Agent训练</td>\n</tr>\n<tr>\n<td>E-GRPO</td>\n<td>实体匹配率稠密奖励</td>\n<td>利用近失样本、推理更高效</td>\n<td>依赖实体提取准确性</td>\n<td>搜索Agent、知识问答</td>\n</tr>\n<tr>\n<td>TIR-Judge</td>\n<td>Python执行器+工具集成RL</td>\n<td>精确验证、小模型高性能</td>\n<td>需要可执行环境</td>\n<td>LLM裁判、代码评估</td>\n</tr>\n<tr>\n<td>ScaleCUA</td>\n<td>人机协同闭环+跨平台统一模型</td>\n<td>跨OS通用、数据规模大</td>\n<td>数据收集成本高</td>\n<td>GUI自动化、跨平台操作</td>\n</tr>\n<tr>\n<td>CYBER-ZERO</td>\n<td>角色驱动模拟+无运行时合成</td>\n<td>无需真实环境、成本极低</td>\n<td>模拟精度有限</td>\n<td>网络安全、CTF训练</td>\n</tr>\n<tr>\n<td>RebuttALAgent</td>\n<td>ToM-Strategy-Response+自奖励</td>\n<td>策略性强、评分一致性高</td>\n<td>领域特定（学术反驳）</td>\n<td>策略沟通、说服生成</td>\n</tr>\n</tbody>\n</table></div>\n<p>__________________________________________________</p>\n<h2>四、技术趋势与展望</h2>\n<p><strong>当前趋势</strong><br />\n- RL训练Agent正从\"单轮优化\"向\"多轮长程决策\"演进，训练稳定性成为核心瓶颈，分阶段训练和课程学习受到越来越多的关注<br />\n- 奖励设计从\"稀疏结果奖励\"向\"稠密过程奖励\"转变，实体感知、工具验证等中间信号被充分利用<br />\n- 合成数据在Agent训练中扮演越来越重要的角色，特别是在真实环境难以获取的领域</p>\n<p><strong>值得关注的新方向</strong><br />\n- 把E-GRPO的实体感知奖励和AgentGym-RL的分阶段训练结合起来，打造更稳定、信号更丰富的长程Agent训练框架<br />\n- 探索TIR-Judge的工具集成思路能否扩展到更多工具类型（如数据库查询、API调用），构建通用的\"工具增强RL\"范式<br />\n- 研究CYBER-ZERO的角色模拟方法能否推广到其他缺乏运行时的领域（如医疗诊断、法律咨询）</p>\n<p>__________________________________________________</p>\n<h2>写在最后</h2>\n<p>这六个工作的共同启示是：RL训练Agent的瓶颈往往不在算法本身，而在训练基础设施（框架）、信号质量（奖励）和数据获取（合成）三个环节。AgentGym-RL补齐了基础设施，E-GRPO和TIR-Judge提升了信号质量，ScaleCUA、CYBER-ZERO和RebuttALAgent突破了数据瓶颈。三个环节一起发力，RL-based Agent才能真正从实验室走向实用。</p>\n<p>__________________________________________________</p>\n<h2>关注我们</h2>\n<p>欢迎关注公众号：<strong>nightli的小记</strong></p>"
    }
  ],
  "graph": {
    "nodes": [
      {
        "id": "webgpt",
        "x": 80,
        "y": 80,
        "category": "foundation"
      },
      {
        "id": "saycan",
        "x": 190,
        "y": 80,
        "category": "foundation"
      },
      {
        "id": "reflexion",
        "x": 340,
        "y": 220,
        "category": "self_improve"
      },
      {
        "id": "voyager",
        "x": 430,
        "y": 220,
        "category": "self_improve"
      },
      {
        "id": "werewolf_rl",
        "x": 520,
        "y": 80,
        "category": "foundation"
      },
      {
        "id": "agile",
        "x": 650,
        "y": 360,
        "category": "online_rl"
      },
      {
        "id": "agent_q",
        "x": 740,
        "y": 360,
        "category": "online_rl"
      },
      {
        "id": "webrl",
        "x": 850,
        "y": 360,
        "category": "online_rl"
      },
      {
        "id": "webagent_r1",
        "x": 1000,
        "y": 360,
        "category": "online_rl"
      },
      {
        "id": "agent_lightning",
        "x": 1080,
        "y": 360,
        "category": "online_rl"
      },
      {
        "id": "mua_rl",
        "x": 1160,
        "y": 360,
        "category": "online_rl"
      },
      {
        "id": "istar",
        "x": 1240,
        "y": 500,
        "category": "reward"
      },
      {
        "id": "agentrl",
        "x": 1320,
        "y": 360,
        "category": "online_rl"
      },
      {
        "id": "sage",
        "x": 1380,
        "y": 220,
        "category": "self_improve"
      },
      {
        "id": "ssr",
        "x": 1480,
        "y": 220,
        "category": "self_improve"
      },
      {
        "id": "dynaweb",
        "x": 1540,
        "y": 640,
        "category": "frontier"
      },
      {
        "id": "agent_rrm",
        "x": 1600,
        "y": 500,
        "category": "reward"
      },
      {
        "id": "vpr",
        "x": 1680,
        "y": 500,
        "category": "reward"
      },
      {
        "id": "agentjet",
        "x": 1760,
        "y": 640,
        "category": "frontier"
      },
      {
        "id": "q_evolve",
        "x": 1840,
        "y": 640,
        "category": "frontier"
      }
    ],
    "edges": [
      {
        "from": "webgpt",
        "to": "reflexion",
        "label": "语言反馈"
      },
      {
        "from": "saycan",
        "to": "werewolf_rl",
        "label": "LM+RL"
      },
      {
        "from": "reflexion",
        "to": "voyager",
        "label": "技能记忆"
      },
      {
        "from": "werewolf_rl",
        "to": "agile",
        "label": "通用化"
      },
      {
        "from": "agile",
        "to": "agent_q",
        "label": "搜索优化"
      },
      {
        "from": "agent_q",
        "to": "webrl",
        "label": "在线课程"
      },
      {
        "from": "webrl",
        "to": "webagent_r1",
        "label": "端到端"
      },
      {
        "from": "agile",
        "to": "agent_lightning",
        "label": "训练解耦"
      },
      {
        "from": "webagent_r1",
        "to": "mua_rl",
        "label": "动态用户"
      },
      {
        "from": "agent_lightning",
        "to": "agentrl",
        "label": "异步多任务"
      },
      {
        "from": "webagent_r1",
        "to": "istar",
        "label": "步骤奖励"
      },
      {
        "from": "voyager",
        "to": "sage",
        "label": "技能库RL"
      },
      {
        "from": "sage",
        "to": "ssr",
        "label": "自博弈"
      },
      {
        "from": "webagent_r1",
        "to": "dynaweb",
        "label": "世界模型"
      },
      {
        "from": "istar",
        "to": "agent_rrm",
        "label": "结构反馈"
      },
      {
        "from": "istar",
        "to": "vpr",
        "label": "可验证奖"
      },
      {
        "from": "agentrl",
        "to": "agentjet",
        "label": "分布式"
      },
      {
        "from": "istar",
        "to": "q_evolve",
        "label": "分布内奖"
      },
      {
        "from": "sage",
        "to": "q_evolve",
        "label": "自进化"
      }
    ],
    "milestones": [
      "webgpt",
      "webagent_r1",
      "q_evolve"
    ]
  },
  "algos": [
    {
      "id": "webgpt",
      "num": 1,
      "name": "WebGPT",
      "fullName": "网页浏览问答代理 (WebGPT)",
      "year": "2021.12",
      "org": "OpenAI",
      "parent": "—",
      "paperUrl": "https://arxiv.org/abs/2112.09332",
      "projectUrl": "",
      "category": "foundation",
      "motivation": "把网页交互纳入端到端反馈训练",
      "summary": "WebGPT 将基于文本的网页浏览器操作（搜索、点击、引用）纳入 GPT-3 微调框架，通过模仿学习和基于人类偏好的强化学习端到端训练，使模型能自主浏览网页并生成有引用支撑的长篇问答，显著优于单纯基于检索的基线方法。",
      "keyPoints": [
        "基于 GPT-3 微调，赋予模型在简化文本网页环境中执行浏览操作的能力（搜索、点击链接、翻页、引用摘录）",
        "构建了基于 Bing Web Search API 的文本化浏览器环境，将 HTML 页面转换为可处理的文本表示",
        "4 种核心操作指令：<code>Search</code>（搜索查询）、<code>Click</code>（点击链接）、<code>Scroll Up/Down</code>（翻页）、<code>Quote</code>（引用特定文本段落）",
        "采用行为克隆 (BC) 预热 + 拒绝采样 (Rejection Sampling) 迭代 + 基于人类偏好的强化学习 (RL with PPO) 的多阶段训练流程",
        "引入人类反馈标记：通过模型间对比评测收集偏好数据，训练出与人类偏好对齐的奖励模型 (RM)",
        "在 ELI5 (explain-like-I'm-5) 长文本问答和 TruthfulQA 真值问答上显著超越非交互式检索增强方法和无浏览基线",
        "生成答案时附带引用出处（citation），增强了答案的可验证性和可信度"
      ],
      "detail": "<p><img alt=\"WebGPT 示意图\" src=\"https://ar5iv.labs.arxiv.org/html/2112.09332/assets/x1.png\" />\n<em>图：WebGPT 的核心框架或评测示意。</em></p>\n<h5>1. 动机与背景</h5>\n<p>传统检索增强生成 (RAG) 方法面临的核心问题：搜索和阅读是离线分离的，检索器返回固定数量的文档切片，模型无法主动决定\"接下来看什么\"。对于需要多步推理、跨文档比对的复杂开放式长文本问答（如 ELI5 数据集），固定的检索结果往往不够充分。</p>\n<p>WebGPT 的核心洞见是：<strong>让语言模型像人类一样主动浏览网页</strong>——它可以自行决定搜索关键词、点击哪个链接、阅读哪段文字、何时停止搜索并开始撰写答案。这种将\"网页浏览\"纳入端到端训练的模式，使得信息获取过程本身变为可优化的一环。</p>\n<h5>2. 文本化浏览器环境 (Text-Based Browsing Environment)</h5>\n<p>WebGPT 不与真正的浏览器渲染引擎交互，而是在一个高度简化的<strong>文本化环境</strong>中运作。具体设计如下：</p>\n<ul>\n<li><strong>搜索引擎</strong>：使用 Microsoft Bing Web Search API，模型执行 <code>Search(query)</code> 后返回搜索结果页面（包含标题、URL、摘要）</li>\n<li><strong>页面加载</strong>：执行 <code>Click(link_index)</code> 后，系统抓取对应 URL 的 HTML，通过自定义解析器提取纯文本内容，并保留基本的链接结构（转换为可点击的文本锚点索引）</li>\n<li><strong>导航操作</strong>：<code>Scroll Up</code> / <code>Scroll Down</code> 在当前页面内上下滚动阅读</li>\n<li><strong>信息提取</strong>：<code>Quote(sentence)</code> 将当前页面中的特定句子标记为引用来源，在最终答案中展示</li>\n<li><strong>序列格式</strong>：浏览过程被建模为多轮动作序列 <span class=\"kb-math kb-math-inline\">a_1, a_2, \\ldots, a_T</span>，最终以 <code>Answer</code> 操作结束</li>\n</ul>\n<div class=\"key-point\">💡 关键：文本环境的设计极大简化了策略学习问题——动作空间离散、观察空间是纯文本，可以直接在预训练语言模型框架内处理，无需视觉或多模态组件。</div>\n<h5>3. 多阶段训练流程</h5>\n<p>WebGPT 的训练分为三个递进阶段：</p>\n<p><strong>阶段一：行为克隆 (Behavioral Cloning, BC)</strong></p>\n<ul>\n<li>使用人类标注者示范的浏览轨迹（搜索→浏览→引用→回答）作为监督信号</li>\n<li>标注者通过专门开发的浏览界面进行操作，系统记录完整的动作序列</li>\n<li>模型在人类轨迹上做监督微调，学习基本的搜索-浏览-引用-回答范式</li>\n<li>损失函数为标准语言模型的自回归交叉熵损失</li>\n</ul>\n<p><strong>阶段二：拒绝采样微调 (Rejection Sampling / Best-of-N Sampling)</strong></p>\n<ul>\n<li>用 BC 模型生成多条候选答案（N 条）</li>\n<li>使用已训练的奖励模型 (RM) 对每条候选答案打分</li>\n<li>选择得分最高的 k 条轨迹进行进一步微调</li>\n<li>通过迭代：新模型 → 采样 → RM 评分 → 精选轨迹 → 再训练，逐步提升质量</li>\n</ul>\n<p><strong>阶段三：近端策略优化强化学习 (RL with PPO)</strong></p>\n<ul>\n<li>使用 PPO 算法在浏览动作序列上进行策略优化</li>\n<li><strong>奖励信号来源</strong>：基于人类偏好的奖励模型 (RM)，由模型回答间的对比判断训练而来</li>\n<li><strong>KL 散度约束</strong>：添加 KL 正则化项，防止 PPO 优化后的策略与 BC 初始化策略偏差过大</li>\n<li>优化目标可形式化为：\n  <div class=\"kb-math kb-math-display\">J(\\theta) = \\mathbb{E}_{a \\sim \\pi_\\theta} \\left[ R(a) \\right] - \\beta \\cdot D_{KL}\\left( \\pi_\\theta \\| \\pi_{\\text{BC}} \\right)</div>\n  其中 <span class=\"kb-math kb-math-inline\">R(a)</span> 是 RM 给出的回答质量评分，<span class=\"kb-math kb-math-inline\">\\pi_{\\text{BC}}</span> 是 BC 阶段的策略，<span class=\"kb-math kb-math-inline\">\\beta</span> 控制 KL 惩罚的强度</li>\n</ul>\n<h5>4. 奖励模型 (Reward Model) 与人类偏好</h5>\n<ul>\n<li>人类标注者观看两个模型生成的答案，指出哪个更好</li>\n<li>比较维度包括：<strong>事实准确性、信息覆盖度、引用质量、语言流畅度</strong></li>\n<li>使用 Bradley-Terry 模型将成对比较转换为标量奖励</li>\n<li>RM 在 BC 模型的判断 token 上做微调：\n  <div class=\"kb-math kb-math-display\">P(\\text{answer A &gt; answer B}) = \\frac{e^{r_A}}{e^{r_A} + e^{r_B}}</div></li>\n</ul>\n<div class=\"warn-box\">⚠️ 注意：WebGPT 的奖励建模方法与 InstructGPT 同期提出，两者共享\"用人类偏好训练奖励模型再 RL 优化\"的核心范式，但 WebGPT 额外将浏览行为纳入策略空间。</div>\n<h5>5. 与传统方法的区别</h5>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>维度</th>\n<th>传统 RAG / REALM</th>\n<th>WebGPT</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>检索方式</td>\n<td>固定轮次检索（一或两次）</td>\n<td>多步自主浏览</td>\n</tr>\n<tr>\n<td>浏览操作</td>\n<td>无法翻页/点击链接</td>\n<td>完整浏览操作集</td>\n</tr>\n<tr>\n<td>训练模式</td>\n<td>检索器和生成器独立训练</td>\n<td>检索+浏览+生成端到端微调</td>\n</tr>\n<tr>\n<td>反馈优化</td>\n<td>基于下游任务准确率</td>\n<td>基于人类偏好 RL</td>\n</tr>\n<tr>\n<td>引用来源</td>\n<td>隐式或后添加</td>\n<td>浏览中主动引用</td>\n</tr>\n</tbody>\n</table></div>\n<h5>6. 引用机制 (Citations)</h5>\n<p>WebGPT 的一个重要设计是<strong>内置引用行为</strong>：模型在浏览过程中通过 <code>Quote</code> 操作摘录特定文本句子，回答时标注这些句子的出处。这带来两个关键优势：\n1. <strong>可验证性</strong>：读者可以追溯答案中每一句话的来源 URL，判断是否可靠\n2. <strong>训练信号增强</strong>：标注者在比较答案时可以评估引用质量，提供了更细粒度的反馈维度</p>\n<h5>7. 关键实验结果</h5>\n<ul>\n<li><strong>ELI5 数据集</strong>：WebGPT (175B BC + RM + RL) 在人类评估中优于纯 BC 基线 56% vs 39%</li>\n<li><strong>TruthfulQA</strong>：WebGPT 浏览时找到的信息能有效纠正模型原有错误知识，真答案率大幅提升</li>\n<li><strong>消融实验证明</strong>：仅 BC 已经显著优于无浏览基线，而 RL 的加入进一步带来 10-20% 的人类偏好提分</li>\n<li>浏览行为的有效性：模型平均浏览约 20-30 个页面后生成答案，远超传统 5-10 篇文档检索的信息深度</li>\n</ul>\n<pre><code class=\"language-python\">for task in tasks:\n    traj = agent.rollout(task, tools)\n    reward = evaluate(traj)\n    advantage = normalize(reward)\n    policy.update(traj, advantage)\n</code></pre>",
      "quiz": {
        "q": "WebGPT 中 PPO 强化学习阶段的奖励信号来源是什么？",
        "options": [
          "生成答案与标准答案的 BLEU/ROUGE 自动评分",
          "基于人类偏好的奖励模型 (RM) 对回答质量的评分",
          "搜索结果页面对检索关键词的相关性打分",
          "模型浏览网页数量的负对数作为稀疏奖励"
        ],
        "answer": 1,
        "explain": "WebGPT 使用基于人类对比判断训练的奖励模型 (RM) 作为奖励信号，而非自动指标或检索得分，这与 InstructGPT 的 RLHF 范式一致。"
      }
    },
    {
      "id": "saycan",
      "num": 2,
      "name": "SayCan",
      "fullName": "语言-可供性接地代理 (SayCan)",
      "year": "2022.04",
      "org": "Google Robotics",
      "parent": "—",
      "paperUrl": "https://arxiv.org/abs/2204.01691",
      "projectUrl": "",
      "category": "foundation",
      "motivation": "用价值函数约束LLM选可执行技能",
      "summary": "SayCan 提出将大语言模型（LLM）的语义知识（Say）与预训练技能的可提供性函数（Can）相乘，通过联合概率 \\(p(c_{\\pi} | i, s, \\ell_{\\pi}) \\propto p(\\ell_{\\pi} | i) \\cdot p(c_{\\pi} | s, \\ell_{\\pi})\\) 为机器人提供物理世界接地，使其能够零样本执行长时域、抽象的自然语言指令。",
      "keyPoints": [
        "提出 SayCan 框架：LLM 提供任务接地（task-grounding），强化学习训练的价值函数提供世界接地（world-grounding），两者联合决定技能选择",
        "使用 RL 训练的语言条件价值函数 <span class=\"kb-math kb-math-inline\">p(c_{\\pi} | s, \\ell_{\\pi})</span> 作为可提供性函数，评估技能在当前状态的可行性",
        "技能通过 BC-Z（Behavior Cloning from Zero-shot）和 MT-Opt（Multi-Task RL）两种方式训练，其中 MT-Opt 使用稀疏奖励优化",
        "LLM 以 few-shot prompt 方式工作，通过链式规则将指令分解为技能描述序列",
        "在 101 个真实厨房任务上评估，PaLM-SayCan 实现 84% 规划成功率和 74% 执行成功率",
        "\"No VF\" 消融实验证明：去除价值函数接地后性能下降近半，验证了物理接地的必要性",
        "LLM 规模扩展性：模型从 8B→62B→540B 持续提升，且 PaLM 优于 FLAN，首次展示语言模型进步直接转化为机器人性能提升",
        "自发涌现 Chain-of-Thought 推理，支持多语言查询和新技能的热插拔式集成"
      ],
      "detail": "<h5>核心框架图</h5>\n<p><img alt=\"SayCan 框架示意图\" src=\"https://saycan-corl.github.io/img/saycan.png\" />\n<em>图：SayCan 总体框架。LLM（Say）根据指令和历史生成技能描述的条件概率，可提供性函数（Can）评估每个技能在当前环境状态下的可行性，两者相乘得到最终技能排序，选最大值执行。</em></p>\n<div class=\"warn-box\">⚠️ 注意：上述图片链接来自项目官网 say-can.github.io。若无法加载，可访问 <a href=\"https://arxiv.org/html/2204.01691v1\">arxiv HTML 版本</a> 查看 Figure 1。</div>\n<h5>算法伪代码</h5>\n<p>Algorithm 1: SayCan\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\nInput: 高层指令 i，初始状态 s₀，技能集合 Π 及其语言描述 ℓ_Π\n  n = 0, π = ∅\n  while ℓ_{π_{n-1}} ≠ \"done\":\n    𝒞 = ∅\n    for π ∈ Π 和 ℓ_π ∈ ℓ_Π:\n      p_π^LLM = p(ℓ_π | i, ℓ_{π_{n-1}}, ..., ℓ_{π_0})   ▷ LLM 评分\n      p_π^affordance = p(c_π | s_n, ℓ_π)                  ▷ 可提供性评分\n      𝒞 ← 𝒞 ∪ {(π, p_π^LLM · p_π^affordance)}            ▷ 联合概率\n    π_n = argmax_π 𝒞                                       ▷ 选择最优技能\n    执行 π_n，观察新状态 s_{n+1}\n    n += 1\n  return {π₀, π₁, ..., π_{n-1}}                           ▷ 返回技能序列</p>\n<h5>方法详解</h5>\n<p><strong>1. 动机与背景</strong></p>\n<p>传统 LLM 虽能编码丰富的语义知识，但缺乏真实物理世界经验。当被要求完成\"我打翻了饮料，能帮我清理吗？\"这样的指令时，LLM 可能建议\"用吸尘器清理\"——这在厨房场景中既不可行（没有吸尘器）也不安全（吸尘器不能吸水）。SayCan 的核心洞见是：用机器人预训练技能的可提供性函数作为\"物理过滤器\"，约束 LLM 只能选择当前环境下能执行的动作，从而实现接地。</p>\n<p><strong>2. 核心机制：联合概率分解</strong></p>\n<p>SayCan 将技能选择建模为条件概率的乘积：</p>\n<div class=\"kb-math kb-math-display\">p(c_{\\pi} | i, s, \\ell_{\\pi}) \\propto \\underbrace{p(\\ell_{\\pi} | i)}_{\\text{Say: LLM任务接地}} \\cdot \\underbrace{p(c_{\\pi} | s, \\ell_{\\pi})}_{\\text{Can: 价值函数世界接地}}</div>\n<ul>\n<li><strong>Say 项</strong> <span class=\"kb-math kb-math-inline\">p(\\ell_{\\pi} | i)</span>：LLM 根据高层指令 <span class=\"kb-math kb-math-inline\">i</span> 和已执行技能历史，计算每个技能描述 <span class=\"kb-math kb-math-inline\">\\ell_{\\pi}</span> 的条件概率。实际操作中，通过构造 few-shot prompt 并取 softmax 归一化后的 token 级概率得到。</li>\n<li><strong>Can 项</strong> <span class=\"kb-math kb-math-inline\">p(c_{\\pi} | s, \\ell_{\\pi})</span>：RL 训练的价值函数预估技能在当前状态 <span class=\"kb-math kb-math-inline\">s</span> 下的成功率。具体地，对技能 <span class=\"kb-math kb-math-inline\">\\pi</span> 和语言描述 <span class=\"kb-math kb-math-inline\">\\ell_{\\pi}</span>，价值函数 <span class=\"kb-math kb-math-inline\">Q(s, a)</span> 通过 Monte-Carlo 回报训练后，经过温度参数 <span class=\"kb-math kb-math-inline\">\\tau</span> 的 sigmoid 变换得到：<span class=\"kb-math kb-math-inline\">p(c_{\\pi} | s, \\ell_{\\pi}) = \\sigma(Q(s, a)/\\tau)</span>。</li>\n</ul>\n<div class=\"key-point\">💡 关键：这个分解将\"该做什么\"（LLM 语义知识）和\"能做什么\"（机器人能力）解耦，使系统在每一步都同时考虑任务进展和物理可行性。</div>\n<p><strong>3. 技能训练：BC-Z 与 MT-Opt</strong></p>\n<p>论文使用两种方式训练原子技能：</p>\n<ul>\n<li><strong>BC-Z（Behavior Cloning from Zero-shot）</strong>：在大规模演示数据集上训练条件行为克隆策略。以语言指令为条件，直接预测低维动作（末端位姿、夹爪开合等）。优势是训练稳定，适合有丰富演示数据的技能。</li>\n<li><strong>MT-Opt（Multi-Task RL）</strong>：在仿真器中使用稀疏奖励进行多任务 RL 训练。通过 hindsight experience replay 和分布式训练，从零开始学习长期行为。MT-Opt 专门用于训练高精度操作技能（如抓取、放置），其 Q 函数直接作为可提供性函数使用。</li>\n</ul>\n<blockquote>\n<p>每个技能的语言描述 <span class=\"kb-math kb-math-inline\">\\ell_{\\pi}</span> 即是训练时使用的自然语言指令，确保 LLM 概率空间与价值函数空间的语义对齐。</p>\n</blockquote>\n<p><strong>4. 实验设计与关键结果</strong></p>\n<p>在真实厨房场景中评估 101 个任务，划分为 7 个指令家族：</p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>指令家族</th>\n<th>数量</th>\n<th>描述</th>\n<th>PaLM-SayCan 规划/执行</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>NL Single Primitive</td>\n<td>15</td>\n<td>单个原语的自然语言指令</td>\n<td>100% / 100%</td>\n</tr>\n<tr>\n<td>NL Nouns</td>\n<td>15</td>\n<td>名词变体测试</td>\n<td>67% / 47%</td>\n</tr>\n<tr>\n<td>NL Verbs</td>\n<td>15</td>\n<td>动词变体测试</td>\n<td>100% / 93%</td>\n</tr>\n<tr>\n<td>Structured</td>\n<td>15</td>\n<td>结构化指令</td>\n<td>93% / 87%</td>\n</tr>\n<tr>\n<td>Embodiment</td>\n<td>11</td>\n<td>体现约束测试</td>\n<td>64% / 55%</td>\n</tr>\n<tr>\n<td>Crowd Sourced</td>\n<td>15</td>\n<td>众包指令</td>\n<td>87% / 87%</td>\n</tr>\n<tr>\n<td>Long-Horizon</td>\n<td>15</td>\n<td>长时域多步任务</td>\n<td>73% / 47%</td>\n</tr>\n</tbody>\n</table></div>\n<ul>\n<li><strong>消融实验</strong>：去除价值函数（No VF）后性能大幅下降，验证了物理接地的必要性；生成式 LLM 方案（Generative）性能显著低于 SayCan 的判别式评分方案。</li>\n<li><strong>LLM 规模扩展</strong>：PaLM 540B 的规划成功率 84% vs FLAN 137B 的 70%，首次证明语言模型进步能直接转化为机器人性能提升——\"robotics can ride on the coattails of NLP advances\"。</li>\n</ul>\n<p><strong>5. 涌现能力</strong></p>\n<ul>\n<li><strong>Chain-of-Thought 推理</strong>：对复杂指令（如\"带一瓶无水果味的饮料给我\"），PaLM-SayCan 自发在技能序列中插入推理步骤（如\"我需要一个不含水果的饮料，所以我应该选择可乐\"），再转化为技能执行。</li>\n<li><strong>多语言支持</strong>：用户以西班牙语或法语发出指令，系统同样能正确理解和执行，因为 LLM 的多语言编码能力自然传递到技能选择中。</li>\n<li><strong>热插拔式技能集成</strong>：添加\"拉抽屉\"等新技能只需在 prompt 中增加新技能描述和对应的 value function，无需重新训练。</li>\n</ul>",
      "quiz": {
        "q": "SayCan框架中，'Can'（可提供性函数）的主要作用是什么？",
        "options": [
          "生成新的技能描述文本",
          "评估每个技能在当前物理环境中的可行性，过滤LLM可能产生的不安全或不可行建议",
          "提高LLM的文本生成速度",
          "替代人工标注训练数据"
        ],
        "answer": 1,
        "explain": "Can 通过 RL 训练的价值函数计算技能在当前状态下的成功概率，作为物理世界接地信号，过滤掉 LLM 可能建议但机器人无法执行的动作（如没有吸尘器时建议'用吸尘器清理'）。"
      }
    },
    {
      "id": "reflexion",
      "num": 3,
      "name": "Reflexion",
      "fullName": "反思式语言强化 (Reflexion)",
      "year": "2023.03",
      "org": "Princeton/Northeastern",
      "parent": "webgpt",
      "paperUrl": "https://arxiv.org/abs/2303.11366",
      "projectUrl": "",
      "category": "self_improve",
      "motivation": "把失败反馈转成可复用语言记忆",
      "summary": "Reflexion 是一种不更新模型参数、仅通过**自然语言反思文本**将失败经验注入后续推理上下文的强化学习框架：Agent 行动失败后，LLM 自动生成\"自我反思\"并存入记忆，下一轮迭代时作为语义提示引导更优决策，由此在 AlfWorld、HotPotQA、HumanEval 等任务上实现显著的累积改进。",
      "keyPoints": [
        "<strong>语言化强化（Verbal RL）</strong>：不修改梯度或权重，把 RL 中的\"奖励信号\"转化为自然语言的\"反思文本\"，让 LLM 在语义层面自我纠偏。",
        "<strong>三组件闭环</strong>：Actor（大模型做出决策动作）→ Evaluator（环境或启发式评估给出二值/等级奖励）→ Self-Reflection（LLM 分析失败原因，生成一段反思口述）。",
        "<strong>跨Episode记忆</strong>：反思文本存于滑动窗口式的经验缓冲区内，下一Episode作为额外上下文拼接在prompt中，形成\"试错—反思—再试\"的循环。",
        "<strong>层级多样性</strong>：根据任务粒度可实现动作级反思（单步错误分析）或轨迹级反思（全局策略缺陷），支持链式多轮反思叠加。",
        "<strong>无梯度通用性</strong>：模型参数完全固定，适用于任意基于prompt的LLM，可被灵活嵌入ReAct、CoT等推理链路中。"
      ],
      "detail": "<p><img alt=\"Reflexion 示意图\" src=\"https://ar5iv.labs.arxiv.org/html/2303.11366/assets/x1.png\" />\n<em>图：Reflexion 的核心框架或评测示意。</em></p>\n<h5>示意图（文字描述）</h5>\n<pre><code>┌─────────────┐     action      ┌───────────┐\n│   Actor     │ ───────────────→ │Environmen│\n│  (LLM)      │                 │     t     │\n└─────────────┘                 └───────────┘\n       ↑        ←— reward/outcome —   │\n       │                              │\n       │  ┌──────────────────┐        │\n       └──│ Self-Reflection  │←——trajectory+outcome\n          │    (LLM)         │\n          └──────────────────┘\n                    │\n                    ↓\n          ┌──────────────────┐\n          │  Episodic Buffer │\n          │  (reflection mem)│\n          └──────────────────┘\n                    │\n    next episode:    │\n    prepend to prompt│\n                    ↓\n              ┌──────────┐\n              │  Actor   │  ← 新一轮受已有反思指导\n              └──────────┘\n</code></pre>\n<p><strong>图释</strong>：Actor 产生动作，环境反馈结果；Self-Reflection 模块把轨迹和结果总结为一组反思文本，存入 Episodic Buffer；下一次Actor推理时，prompt前缀包含历史反思，形成\"从错误中学习\"的循环。全程无参数更新。</p>\n<h5>算法伪代码</h5>\n<pre><code class=\"language-python\"># Reflexion 核心循环\nbuffer = []  # 跨Episode的反思记忆\n\nfor episode in range(max_episodes):\n    # 1. 构建prompt：任务说明 + 历史反思 + 当前观测\n    prompt = build_prompt(task, observation, buffer)\n\n    # 2. Actor 生成动作序列\n    trajectory = []\n    for step in range(max_steps):\n        action = llm_actor(prompt, observation)\n        observation, reward, done = environment.step(action)\n        trajectory.append((action, observation, reward))\n        if done:\n            break\n\n    # 3. Evaluator 评定结果\n    if reward == SUCCESS:\n        break  # 任务成功，停止\n\n    # 4. Self-Reflection：将失败轨迹转成反思文本\n    reflection = llm_reflect(trajectory)\n    buffer.append(reflection)  # 存入记忆\n\n    # 5. 可选：清理旧反思防止溢出\n    if len(buffer) &gt; max_buffer_size:\n        buffer = buffer[-max_buffer_size:]\n</code></pre>\n<h5>核心机制拆解</h5>\n<p><strong>1. 动机与背景</strong><br />\n传统 LLM Agent（如 ReAct）在复杂决策任务中采用\"单次推理→执行→终止\"模式，即使同一任务多次尝试，前后 trial 之间没有任何信息传递——Agent 可能在相同位置反复犯同样的错误。基于梯度的微调（RLHF/PPO）能改善行为，但计算成本高、需要大量标注，且难以针对每个单独任务实时调整。Reflexion 的洞察在于：既然 LLM 已经展现出强大的语言理解和自我纠错能力（如\"Let's think step by step\"可以修正推理），为什么不把这种能力系统化，让它自己读自己过去的失败并提炼教训？</p>\n<p><strong>2. 反思生成机制</strong><br />\nSelf-Reflection 用同一 LLM 但切换角色：输入是整个失败轨迹（动作序列、环境反馈、最终结果），提示词要求模型分析\"为什么会失败\"并\"下次应该如何改进\"。生成的反思文本形如：</p>\n<blockquote>\n<p><em>\"在上次尝试中，我试图在没有先检查抽屉的情况下直接拿取物品，导致反复空操作。下次我应该先打开周围所有可存储容器并记录里面有什么。\"</em></p>\n</blockquote>\n<p>这种反思是<strong>高度语义化</strong>的，它不编码数值梯度，而是直接作用于模型对任务的理解。反思的类型可以分级：\n- <strong>简单反思</strong>：单句指出错误（\"我没看清楚目标物体的位置\"）。\n- <strong>分析式反思</strong>：详细分析根因并给出策略调整。\n- <strong>链式反思</strong>：在多次失败后追加更高层级的元反思（\"我过于依赖视觉信息而忽略了任务文本中的线索\"）。</p>\n<p><strong>3. 与传统方法的本质区别</strong><br />\n- vs. ReAct：ReAct 在每个 episodes 内做推理-行动循环，但episode之间完全独立。Reflexion 相当于在 ReAct 外层再套一个\"学习循环\"，向prompt注入跨episode的经验。\n- vs. RLHF/PPO：RLHF 改变模型参数，是\"永久学习\"；Reflexion 不改变参数，是\"上下文学习\"。前者泛化到同类任务，后者针对当前任务情境高度特化。\n- vs. RAG/检索增强：RAG 检索外部知识库的固定文档；Reflexion 的记忆是模型针对自身失败<strong>动态生成</strong>的，随迭代次数演进而更新。\n- vs. 思维树(ToT)/思维图(GoT)：后者在单次决策中并行搜索多条推理路径；Reflexion 利用历史试错的信息压缩，在串行Episodes中累积改进。</p>\n<p><strong>4. 训练/推理流程</strong>  </p>\n<ul>\n<li><strong>无需训练</strong>：整个流程在推理时完成，模型权重冻结。只需设计三组提示词模板（Actor指令、Evaluator规则、Self-Reflection指令）。</li>\n<li><strong>数据流</strong>：每个Episode开始→Actor读取当前观测+历史反思→生成动作→环境执行→轨迹收集→Episode结束→Evaluator判定→如失败则Reflector生成反思文本追加到buffer→下一Episode开始。</li>\n<li><strong>Evaluator的灵活性</strong>：对于有明确成功条件的任务（如AlfWorld物品是否放对、HumanEval代码是否通过测试），用二值奖励；对开放式任务（如HotPotQA问答），可用LLM作为启发式评价器（询问\"回答是否正确\"或使用EM/F1启发式）。</li>\n<li><strong>Buffer管理</strong>：采用滑动窗口，保持最近N条反思，防止prompt过长；也可用聚类或摘要压缩更长的反思历史。</li>\n</ul>\n<p><strong>5. 关键实验结果</strong>  </p>\n<p>Reflexion 在三个不同领域的基准上均展现出显著的迭代提升：\n- <strong>AlfWorld（具身AI）</strong>：在134个家务任务上，经过多次反思迭代后成功率从基线显著提高。首次失败的轨迹经过1-2轮反思后，大量任务被纠正。\n- <strong>HotPotQA（多跳QA）</strong>：在需要综合多个网页信息的问答任务上，Reflexion 使模型能够从\"检索策略不佳\"中自我调整，改进了信息检索的覆盖率和准确率。\n- <strong>HumanEval（代码生成）</strong>：模型首轮生成代码后若测试失败，Reflexion 能基于错误信息生成反思（\"我没有处理边界条件X\"），第二次生成的代码通过率大幅提升。这一结果展示了Reflexion在\"self-debugging\"场景中的实用性。\n- 消融实验表明：仅靠\"重试\"而无反思的基线几乎没有提升；静态提示（如\"请更仔细\"）的改进微弱；只有基于失败轨迹<strong>动态生成的具体反思</strong>才能驱动显著改进。</p>\n<div class=\"key-point\">💡 <strong>关键洞察</strong>：Reflexion 的核心力量不在于模型\"更聪明地思考\"，而在于它创造了一个<strong>跨Episode的信息通道</strong>——反思文本作为压缩后的经验载体，使得连续试错不再是独立的随机事件，而成为逐步逼近正确解的定向过程。</p>\n<p>⚠️ <strong>注意</strong>：反思质量高度依赖LLM的自评能力。如果模型连\"自己为什么错\"都分析不清，反思可能引入噪音甚至误导。实践中需对反思文本做基本校验（如长度过滤、去除空洞套话），且反思prompt需要精心设计（明确要求指出具体错误步骤和可操作的改进措施）。</div>",
      "quiz": {
        "q": "Reflexion 与传统强化学习（如 PPO）的核心区别是什么？",
        "options": [
          "Reflexion 使用更大的模型",
          "Reflexion 不更新模型参数，而是将失败经验转化为自然语言反思文本注入上下文",
          "Reflexion 只能用于代码生成任务",
          "Reflexion 使用对抗训练提升鲁棒性"
        ],
        "answer": 1,
        "explain": "Reflexion 的核心创新在于将强化学习的'利用奖励信号调整策略'转变为'利用语言反思提示引导行为'，全程不涉及梯度计算或参数更新，这使得它即插即用且计算成本极低。"
      }
    },
    {
      "id": "voyager",
      "num": 4,
      "name": "Voyager",
      "fullName": "开放式具身终身学习代理 (Voyager)",
      "year": "2023.05",
      "org": "NVIDIA/Caltech",
      "parent": "reflexion",
      "paperUrl": "https://arxiv.org/abs/2305.16291",
      "projectUrl": "",
      "category": "self_improve",
      "motivation": "靠课程与技能库持续自我进化",
      "summary": "Voyager 是首个基于大语言模型（GPT-4）的具身终身学习代理，通过在 Minecraft 中引入**自动课程、可执行代码技能库、迭代提示机制**三大组件，实现了无需人类干预的持续探索、技能获取与新发现，在物品收集量、科技树解锁速度和地图覆盖范围上全面超越 SOTA。",
      "keyPoints": [
        "三个核心组件协同：<strong>自动课程</strong>（Automatic Curriculum）提出自适应探索目标，<strong>技能库</strong>（Skill Library）以向量数据库存储和检索可执行代码，<strong>迭代提示机制</strong>（Iterative Prompting Mechanism）通过环境反馈与自我验证逐步改进程序",
        "以可执行 JavaScript 代码作为行动空间，而非低层运动指令，天然支持<strong>时序扩展与组合性</strong>（temporally extended &amp; compositional）",
        "利用 GPT-4 的黑盒查询实现上下文学习（in-context learning），<strong>无需模型参数访问或梯度微调</strong>",
        "技能库通过嵌入向量索引，支持相似场景检索与<strong>技能组合</strong>，缓解灾难性遗忘",
        "自我验证模块（Self-Verification）通过检测物品/成就/图标的数量变化来判定任务完成，比单纯反思（Reflexion）更全面",
        "在 MineDojo 平台上进行系统评估：获 <strong>3.3×</strong> 独特物品、科技树里程碑解锁快 <strong>15.3×</strong>、行走距离多 <strong>2.3×</strong>，且是唯一解锁钻石级的方案",
        "技能库可在新 Minecraft 世界中<strong>零样本迁移</strong>解决新任务，基线方法无法泛化"
      ],
      "detail": "<h5>4.1 核心架构图</h5>\n<p><img alt=\"Voyager 架构总览\" src=\"https://ar5iv.labs.arxiv.org/html/2305.16291/assets/figures/fig2.png\" />\n<em>图：Voyager 由三个关键组件组成——自动课程负责提出探索目标，技能库存储和检索可执行代码技能，迭代提示机制通过环境反馈、执行错误与自我验证来持续改进生成的程序。</em></p>\n<h5>4.2 算法核心流程（伪代码）</h5>\n<pre><code class=\"language-python\"># Voyager 主循环\nskill_library = VectorDB()           # 以嵌入向量索引的技能库\ncurriculum = AutomaticCurriculum()   # GPT-4 驱动的自动课程\n\nwhile True:\n    task = curriculum.propose_task(agent_state, completed_tasks, failed_tasks)\n\n    for attempt in range(4):         # 每个任务最多4轮迭代\n        # 1. 从技能库检索 top-5 相关技能作为上下文\n        plan = gpt3.query(&quot;suggest solution for task&quot;, task, agent_state)\n        relevant_skills = skill_library.query(embed(plan + env_feedback), top_k=5)\n\n        # 2. GPT-4 生成可执行代码\n        code = gpt4.generate_code(\n            task, agent_state, relevant_skills, control_primitives,\n            prev_code, env_feedback, execution_errors, critique\n        )\n\n        # 3. 在 Minecraft 中执行代码\n        env_feedback, exec_errors = minecraft.execute(code)\n\n        # 4. 自我验证：检查物品/成就数量变化\n        if self_verify(task, before_state, after_state):\n            skill_library.add(embed(task_description), code)  # 技能入库\n            break                                              # 任务完成，请求新任务\n    else:\n        failed_tasks.append(task)   # 4轮未完成则放弃此任务\n</code></pre>\n<h5>4.3 方法深入解读</h5>\n<p><strong>动机与背景：</strong>\n传统具身代理方法依赖强化学习或模仿学习在原始动作空间上操作，面临系统探索困难、可解释性差、泛化能力弱三大瓶颈。ReAct、Reflexion、AutoGPT 等 LLM-based 代理虽能利用预训练世界知识，但它们<strong>缺乏跨时间累积、更新和迁移知识的终身学习能力</strong>。Minecraft 作为无预定目标的开放世界，要求代理像人类玩家一样自驱探索、根据环境状态提出合适任务、在反馈中迭代精进技能并将掌握的能力存入记忆——这正是 Voyager 的设计目标。</p>\n<p><strong>核心机制逐部件拆解：</strong></p>\n<ol>\n<li>\n<p><strong>自动课程（Automatic Curriculum）：</strong>\n   GPT-4 根据\"尽可能发现多样事物\"的终极目标，结合代理当前状态（物品栏、装备、附近方块/实体、生物群系、时间、生命/饥饿值、坐标）、已完成/失败任务历史、以及 GPT-3.5 生成的自我问答上下文，<strong>自下而上</strong>地提出难度递进的探索目标。课程温度设为 0.1 以保证任务多样性，并包含指令约束\"下一个任务不应太难，因为我可能还没有必要的资源或学够技能\"——这体现了<strong>最近发展区（Zone of Proximal Development）</strong>的设计哲学。</p>\n</li>\n<li>\n<p><strong>技能库（Skill Library）：</strong>\n   每个技能以<strong>可执行的 JavaScript 代码函数</strong>形式存入向量数据库（如 <code>craftStoneShovel()</code>、<code>combatZombieWithSword()</code>）。索引键为 GPT-3.5 生成的程序描述文本的 <code>text-embedding-ada-002</code> 嵌入向量，值为代码本身。代码生成时，GPT-4 被提示\"你的函数将被复用来构建更复杂的函数，因此应使其通用且可复用\"。查询时，GPT-3.5 首先生成任务解决建议，与环境反馈拼接后嵌入向量进行 top-5 检索。这种<strong>组合性学习</strong>使复杂技能可由简单技能复合而成，能力指数级增长。</p>\n</li>\n<li>\n<p><strong>迭代提示机制（Iterative Prompting Mechanism）：</strong>\n   这是 Voyager 自我改进的关键引擎，融合三类反馈进行代码迭代：</p>\n</li>\n<li><strong>环境反馈</strong>：通过 <code>bot.chat()</code> 显示程序执行的中间进展（如\"我无法制作铁胸甲，因为还需要 7 个铁锭\"），GPT-4 据此调整策略</li>\n<li><strong>执行错误</strong>：JavaScript 解释器的报错信息直接反馈给 GPT-4 用于修正语法/语义错误（如\"不存在金合欢斧，应制作木斧\"）</li>\n<li><strong>自我验证</strong>：执行前后对比关键指标（物品数量、成就、GUI 图标）变化，同时让 GPT-4 对失败原因进行批判性反思\n   每轮最多迭代 4 次，若陷入僵局则自动请求自动课程分配新任务，<strong>避免无限循环</strong>。</li>\n</ol>\n<p><strong>与传统方法的区别：</strong></p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>维度</th>\n<th>ReAct/Reflexion</th>\n<th>AutoGPT</th>\n<th>Voyager</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>知识积累</td>\n<td>无长期记忆</td>\n<td>无技能库</td>\n<td>向量数据库持久化技能</td>\n</tr>\n<tr>\n<td>任务提出</td>\n<td>人工指定</td>\n<td>一次性分解子目标</td>\n<td>自动课程持续生成</td>\n</tr>\n<tr>\n<td>成功判定</td>\n<td>无验证</td>\n<td>无验证</td>\n<td>自我验证（物品/成就变化）</td>\n</tr>\n<tr>\n<td>代码改进</td>\n<td>无迭代</td>\n<td>无迭代</td>\n<td>至多4轮环境+错误+验证迭代</td>\n</tr>\n<tr>\n<td>泛化能力</td>\n<td>无法迁移</td>\n<td>无法迁移</td>\n<td>技能库在新世界零样本复用</td>\n</tr>\n</tbody>\n</table></div>\n<p><strong>关键直觉：</strong></p>\n<div class=\"key-point\">💡 <strong>核心洞察</strong>：将技能表示为代码而非自然语言计划，使得技能可被精确执行、可靠验证和组合复用——这正是 Voyager 能指数级增长能力的根本原因。</p>\n<p>⚠️ <strong>注意</strong>：Voyager 不涉及 3D 视觉感知或端到端传感器运动控制，它通过 Mineflayer 高级 API 操控代理。该方法与 VPT 等梯度方法正交互补——只要底层控制器提供代码 API，即可叠加 Voyager 进行高层规划。</div>",
      "quiz": {
        "q": "Voyager 的迭代提示机制中，自我验证模块通过什么来判断任务是否完成？",
        "options": [
          "仅检查程序是否无语法错误执行完毕",
          "对比执行前后物品/成就/GUI图标的数量变化，并让GPT-4进行批判性反思",
          "由外部人工标注任务是否成功",
          "仅依靠LLM输出的置信度分数"
        ],
        "answer": 1,
        "explain": "Voyager 的自我验证通过检测关键指标的变化并配合 LLM 批判性反思来判定任务完成，比仅检查执行状态或LLM置信度更可靠。论文 Figure 6 展示了具体的验证提示结构。"
      }
    },
    {
      "id": "werewolf_rl",
      "num": 5,
      "name": "Werewolf-RL",
      "fullName": "狼人杀战略语言代理 (Strategic Play in the Werewolf Game)",
      "year": "2023.10",
      "org": "Tsinghua University",
      "parent": "saycan",
      "paperUrl": "https://arxiv.org/abs/2310.18940",
      "projectUrl": "",
      "category": "foundation",
      "motivation": "用RL纠正语言动作的固有偏置",
      "summary": "Werewolf-RL 提出“LLM推理+RL决策”的双层框架，用强化学习策略从LLM生成的多样化语言候选动作中做出最优选择，解决了纯LLM代理在复杂决策任务中存在固有不均衡行为偏置的问题，成为 Agentic RL 的重要奠基工作。",
      "keyPoints": [
        "提出双层框架：LLM负责演绎推理并生成多个候选语言动作，RL策略负责从候选集中选出最优动作",
        "首次在狼人杀这一高社交推理游戏中对LLM代理进行强化学习训练，实现人类水平表现",
        "系统性地揭示了纯LLM代理的“内在行为偏置”问题：推理正确，但动作分布受预训练数据影响而偏离最优",
        "离散动作空间设计：将每个候选语言动作编码为固定维度的嵌入向量，动作空间可随LLM输出动态变化",
        "奖励设计：以游戏胜率为奖励信号，必要时加入中间奖励（存活回合数），在冒险社区环境中训练以获得鲁棒策略",
        "与 Cicero（Diplomacy）对比：Cicero 使用固定预定义动作集，而 Werewolf-RL 的动作空间由LLM动态生成，支持自由形式语言交互"
      ],
      "detail": "<h5>核心架构图</h5>\n<p><img alt=\"图1：纯LLM代理的内在偏置\" src=\"https://ar5iv.labs.arxiv.org/html/2310.18940/assets/fig1.png\" />\n<em>图：即使LLM正确推理出“应随机出拳”的策略（100/100次），实际动作分布仍严重偏向“石头”，揭示了推理与决策之间的偏置鸿沟。</em></p>\n<p><img alt=\"图2：狼人杀游戏示例\" src=\"https://ar5iv.labs.arxiv.org/html/2310.18940/assets/fig2.png\" />\n<em>图：狼人杀游戏中的多角色交互示例——狼人需要欺骗，村民需要推理并投票驱逐隐藏的狼人。</em></p>\n<h5>算法伪代码</h5>\n<pre><code class=\"language-python\"># Werewolf-RL 双层框架核心流程\nfor each game_round:\n    # 阶段1: LLM 推理与候选生成\n    context = build_prompt(game_history, role, status)\n    reasoning, candidates = LLM.generate(context)  # 生成k个候选语言动作\n\n    # 阶段2: 候选动作编码\n    embeddings = [text_encoder(c) for c in candidates]\n\n    # 阶段3: RL策略选择\n    state = build_state(game_history, embeddings)\n    action_idx = RL_policy.sample(state)  # 从k个候选中选择最优动作\n    chosen_action = candidates[action_idx]\n\n    # 阶段4: 执行与反馈\n    execute(chosen_action)\n    reward = get_reward(game_outcome)  # 胜+1 / 负-1，可加中间奖励\n    RL_policy.update(state, action_idx, reward)\n</code></pre>\n<h5>动机与背景</h5>\n<p>在复杂多代理交互任务中，LLM虽能完成逻辑推理，但其动作选择存在“内在偏置”：模型在预训练过程中学习到的分布会系统性地偏向某些高频动作。例如在石头剪刀布中，LLM能100%正确识别纳什均衡策略（随机出拳），但实际出拳却偏向“石头”。这种偏置在狼人杀等战略游戏中更为致命——对手一旦发现行为模式，便可轻易利用。</p>\n<p>传统做法如 Cicero 采用“预定义动作集+LLM对话填充”的方式，动作空间固定且依赖游戏特定设计。而真实世界中的人机交互往往需要自由形式的语言表达，因此需要一个能在“无界语言空间”中做出最优决策的方案。</p>\n<h5>核心机制</h5>\n<p>Werewolf-RL 的核心创新在于将“语言生成”与“战略决策”解耦：</p>\n<ol>\n<li>\n<p><strong>LLM推理层</strong>：基于当前游戏上下文（历史对话、角色身份、存活状态），LLM首先进行演绎推理，然后生成 <span class=\"kb-math kb-math-inline\">k</span> 个候选语言动作（如“投票给玩家3”、“声称自己是预言家”等），保证语法正确和语义连贯。</p>\n</li>\n<li>\n<p><strong>候选编码层</strong>：每个候选动作通过文本嵌入模型转换为固定维度向量 <span class=\"kb-math kb-math-inline\">\\mathbf{e}_i \\in \\mathbb{R}^{1536}</span>，使得RL策略可以在一个规范的数学空间中比较不同候选的质量。</p>\n</li>\n<li>\n<p><strong>RL决策层</strong>：策略网络接收由游戏状态和所有候选嵌入构成的联合状态 <span class=\"kb-math kb-math-inline\">\\mathbf{s}=[\\mathbf{h}_{\\text{game}}, \\mathbf{e}_1, \\ldots, \\mathbf{e}_k]</span>，输出一个在 <span class=\"kb-math kb-math-inline\">k</span> 个候选项上的概率分布 <span class=\"kb-math kb-math-inline\">\\pi(\\mathbf{s})</span>。训练时使用 PPO 算法，以游戏胜率为最终奖励信号。</p>\n</li>\n</ol>\n<h5>与本领域之前方法的区别</h5>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>方法</th>\n<th>推理方式</th>\n<th>动作空间</th>\n<th>决策机制</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>纯LLM (如GPT-4)</td>\n<td>思维链提示</td>\n<td>自由文本</td>\n<td>模型采样，存在偏置</td>\n</tr>\n<tr>\n<td>Cicero</td>\n<td>规则+LLM</td>\n<td>固定预定义</td>\n<td>RL策略从有限集选择</td>\n</tr>\n<tr>\n<td><strong>Werewolf-RL</strong></td>\n<td><strong>LLM推理+候选</strong></td>\n<td><strong>LLM动态生成</strong></td>\n<td><strong>RL策略从动态候选集选择</strong></td>\n</tr>\n</tbody>\n</table></div>\n<p>关键区别在于：(1) Werewolf-RL 的动作空间由LLM实时生成，不依赖任何游戏特定的预定义动作模板，具有更强的泛化能力；(2) RL策略仅需从 <span class=\"kb-math kb-math-inline\">k</span> 个候选中选择，而非直接生成文本，大幅降低了学习难度。</p>\n<h5>实验与结果</h5>\n<p>在 5 人局、6 人局狼人杀游戏中，Werewolf-RL 在所有配置下均显著超越纯LLM基准（GPT-3.5、GPT-4）。人类评估实验表明，代理能达到人类水平表现，且展现出强战略行为——包括有策略的撒谎、团队协作、以及适应对手策略的能力。</p>\n<div class=\"key-point\">💡 关键：框架的核心洞察是“推理与决策应分离”——推理交给LLM（保证语言质量和多样性），决策交给RL（保证最优性和无偏性），两者优势互补。</p>\n<p>⚠️ 注意：候选动作的数量 <span class=\"kb-math kb-math-inline\">k</span> 是一个关键超参数——过小会限制策略选择空间，过大会增加RL训练的样本复杂度。</div>",
      "quiz": {
        "q": "Werewolf-RL 为什么要将LLM推理与RL决策分离，而不是直接让LLM输出最终动作？",
        "options": [
          "因为LLM推理速度太慢，需要RL加速",
          "因为纯LLM存在内在行为偏置，推理正确但动作选择可能偏离最优策略",
          "因为RL可以直接生成更流畅的自然语言",
          "因为狼人杀规则太复杂，LLM无法理解"
        ],
        "answer": 1,
        "explain": "论文通过石头剪刀布实验证明：LLM能100%正确推理出最优策略，但实际动作分布仍严重偏向特定选项。将推理与决策分离后，RL策略可无偏地从候选集中选出最优动作。"
      }
    },
    {
      "id": "agile",
      "num": 6,
      "name": "AGILE",
      "fullName": "环境交互学习代理 (AGILE)",
      "year": "2024.05",
      "org": "ByteDance Research",
      "parent": "werewolf_rl",
      "paperUrl": "https://arxiv.org/abs/2405.14751",
      "projectUrl": "",
      "category": "online_rl",
      "motivation": "把记忆工具求助纳入统一RL代理",
      "summary": "AGILE 将 LLM、记忆、工具和执行器统一成一个 token 级强化学习代理，并把“向人类专家求助”也做成可学习动作，从而让模型在复杂问答中同时学会检索、调用工具、反思和控制求助成本。",
      "keyPoints": [
        "把 agent 形式化为 token-level MDP：LLM 是策略，状态由 <code>context + memory</code> 组成，executor 负责执行函数动作并推动环境转移。",
        "统一四个核心模块：<code>LLM / memory / tools / executor</code>，并允许与用户和人类专家交互。",
        "定义显式函数动作集：<code>[GetQuestion]</code>、<code>[RetrieveMemory]</code>、<code>[SeekAdvice]</code>、<code>[Reflection]</code>、<code>[UpdateMemory]</code>、<code>[SearchProduct]</code>、<code>[PredictAnswer]</code>、<code>[SubmitAnswer]</code>、<code>[ClearContext]</code>。",
        "训练采用两阶段：先用带动作标注的轨迹做 imitation learning，再对 action token 做 PPO 优化。",
        "提出 ProductQA 基准：88,229 条问答、26 个商品品类任务，重点考察工具使用、记忆利用、反思与适应新类别能力。",
        "把“求助专家”建模为带成本的动作；模型既能用它保证当前正确率，也能通过 reflection 把专家反馈蒸馏进 memory。"
      ],
      "detail": "<p><img alt=\"AGILE 框架图\" src=\"https://ar5iv.labs.arxiv.org/html/2405.14751/assets/x1.png\" />\n<em>图：AGILE 由 LLM、memory、tools 和 executor 组成，executor 解释函数 token 并把环境反馈重新写回上下文。</em></p>\n<pre><code class=\"language-python\"># AGILE 的抽象执行与训练流程\ncontext = [&quot;[BOS]&quot;]\nmemory = init_memory()\n\nwhile not done:\n    action = llm.sample(context)  # 动作空间就是词表 token\n    context.append(action)\n\n    if action in FUNCTIONS:\n        context, memory, reward, done = executor.step(\n            action=action,\n            context=context,\n            memory=memory,\n            env=environment,\n        )\n\n# 仅对 action token 做 IL / PPO 更新\nppo_update(policy=llm, action_tokens=trajectory.actions, rewards=trajectory.rewards)\n</code></pre>\n<p>论文的核心建模不是“再给 LLM 加几个外挂模块”，而是把整个 agent 过程直接写成 RL。若记 <code>context</code> 为 <span class=\"kb-math kb-math-inline\">c_t</span>、memory 为 <span class=\"kb-math kb-math-inline\">m_t</span>，则状态可写作 <span class=\"kb-math kb-math-inline\">s_t=(c_t,m_t)</span>，动作 <span class=\"kb-math kb-math-inline\">a_t</span> 则是词表中的一个 token。只要这个 token 命中某个注册函数名，executor 就会执行相应逻辑，把搜索结果、检索到的记忆或专家反馈附加回上下文，再把控制权交回 LLM。这样一来，工具调用、记忆读写、清空上下文等都进入了同一策略空间。</p>\n<p>AGILE 的关键不是普通的 tool use，而是 executor 驱动的“函数 token”机制。论文 Table 1 明确给出一组函数：<code>[GetQuestion]</code> 负责向用户取题，<code>[RetrieveMemory]</code> 从 memory 追加相关条目，<code>[SearchProduct]</code> 调产品搜索工具，<code>[SeekAdvice]</code> 请求人类专家答案，<code>[UpdateMemory]</code> 把上下文片段写回记忆，<code>[ClearContext]</code> 将上下文重置到 <code>[BOS]</code>。其中 <code>[Reflection]</code> 和 <code>[PredictAnswer]</code> 是轻量动作，本身不执行外部副作用，而是让模型继续生成反思文本或答案文本。论文还特别说明，executor 可以删除部分旧上下文，因此训练时真正看到的 <span class=\"kb-math kb-math-inline\">c_i</span> 不一定等于所有历史 token 的简单拼接。</p>\n<p>“求助专家”是这篇论文最有辨识度的设计。对于 ProductQA，提交错误答案奖励为 <span class=\"kb-math kb-math-inline\">0</span>，提交正确答案奖励为 <span class=\"kb-math kb-math-inline\">1</span>，若先求助再正确回答，总奖励为 <span class=\"kb-math kb-math-inline\">1-c</span>，其中 <span class=\"kb-math kb-math-inline\">c</span> 是求助成本，因此单轮奖励集合为 <span class=\"kb-math kb-math-inline\">\\{0, 1, 1-c\\}</span>。这让模型必须自己学会平衡三件事：当前题目有多难、专家建议对后续任务是否还有复用价值、以及人类成本是否值得。论文进一步用 <code>[Reflection]</code> 把专家反馈转成可复用知识并写入 memory，因此求助不只是“兜底”，还是显式的适应新任务机制。</p>\n<p>训练分成两个阶段。第一阶段从带动作监督的轨迹中做 imitation learning；第二阶段只对 action token 做 PPO 更新，而不是对 executor 自动附加的环境 token 一起反传。实验上，AGILE 在 ProductQA 上相对 GPT-4 的 total score 提升 9.2%，相对 GPT-3.5 提升 90.8%；相对 SFT 版 <code>agile-vic13b-sft</code>，PPO 版又多出 2.3% 的 total score。消融也很直接：移除 tools 或 memory 会分别让 advice rate 上升 25.9% 和 17.4%，并带来 9.3% 和 4.0% 的 total score 下降；禁用 <code>SeekAdvice</code> 会让准确率下降 10.7%。在 MedMCQA 上，<code>agile-mek7b-ppo</code> 把基础模型准确率从 53.4% 拉到 85.2%，其中 31.6% 的样本触发过求助，说明这套“带成本求助 + 反思写回记忆”的机制确实在起作用。</p>\n<div class=\"key-point\">💡 关键：AGILE 不是把 memory、tool、expert 分别做成独立 pipeline，而是让它们都变成同一个 RL policy 可选择的动作。</p>\n<p>⚠️ 注意：论文优化的是“何时调用模块、何时求助、何时清上下文”这类策略问题，不是单纯提高单轮文本生成质量。</div>",
      "quiz": {
        "q": "AGILE 中将 [SeekAdvice] 设计为带成本动作的主要目的是什么？",
        "options": [
          "让模型始终优先复制人类答案，避免自主推理",
          "把专家反馈仅作为测试阶段外挂，不进入训练闭环",
          "让模型在正确率、未来知识收益和人力成本之间学习策略性权衡",
          "用专家回答替代 memory 模块，简化系统结构"
        ],
        "answer": 2,
        "explain": "AGILE 把求助写进奖励设计，奖励集合包含 1-c，因此模型必须学会只在值得时求助，并进一步通过 reflection 把反馈沉淀进 memory。"
      }
    },
    {
      "id": "agent_q",
      "num": 7,
      "name": "Agent Q",
      "fullName": "自主代理推理与学习 (Agent Q)",
      "year": "2024.08",
      "org": "Stanford/MultiOn",
      "parent": "agile",
      "paperUrl": "https://arxiv.org/abs/2408.07199",
      "projectUrl": "",
      "category": "online_rl",
      "motivation": "结合搜索自评和偏好学习提效",
      "summary": "Agent Q提出结合蒙特卡洛树搜索（MCTS）与AI自我批判进行步骤级探索引导，并通过节点级别Direct Preference Optimization（DPO）将搜索经验蒸馏回基础策略，在WebShop和真实OpenTable网站预订任务上分别实现50.5%和95.4%的成功率，远超基座模型和人类平均水平。",
      "keyPoints": [
        "<strong>MCTS搜索引导探索</strong>：在每一步从LLM采样K个候选动作构建搜索树，使用UCB1公式平衡探索与利用，解决Agent在网页任务中贪心搜索、不翻页等探索不足问题",
        "<strong>AI自我批判（Process Supervision）</strong>：同一基础模型作为零样本评判器对候选动作排序，提供步骤级过程监督信号，无需外部奖励模型",
        "<strong>节点级DPO训练</strong>：利用MCTS收集的Q值和AI反馈评分构造步骤级偏好对（preference pairs），使用DPO目标函数在步骤级别优化策略，支持同时利用成功和失败轨迹",
        "<strong>迭代自我改进</strong>：训练后的策略作为下一轮MCTS的参考策略，形成闭环迭代（Algorithm 1）",
        "<strong>从模拟到真实网站迁移</strong>：在WebShop验证方法后成功迁移到OpenTable真实生产环境，平均步数从6.8步增至13.9步",
        "<strong>关键结果</strong>：WebShop从28.6%→50.5%（+76.57%）；OpenTable从18.6%→81.7%（+340%），推理时加MCTS搜索达95.4%，超过GPT-4o的62.6%"
      ],
      "detail": "<h5>1. 核心框架示意图</h5>\n<p><img alt=\"Agent Q总览：MCTS引导轨迹收集并迭代改进模型\" src=\"https://ar5iv.org/html/2408.07199/assets/images/AgentTree2.png\" />\n<em>图1：Agent Q使用MCTS引导轨迹收集并迭代改进模型性能</em></p>\n<p><img alt=\"过程监督：策略提议K个动作，Critic排序后指导节点选择\" src=\"https://ar5iv.org/html/2408.07199/assets/images/process_supervision.png\" />\n<em>图4：策略在每步推理时提议K个候选动作，同一个LLM作为评判器对动作排序，排序结果用于指导MCTS节点选择和构造DPO偏好对</em></p>\n<p><img alt=\"OpenTable结果监督：GPT-4-V评估Agent轨迹\" src=\"https://ar5iv.org/html/2408.07199/assets/images/outocme_supervision.png\" />\n<em>图5：轨迹结束时GPT-4-V被调用对Agent表现进行反馈评分</em></p>\n<h5>2. 核心算法伪代码</h5>\n<p>Algorithm 1: MCTS Guided Direct Preference Optimization</p>\n<p>Input: π_{θ_0}: 初始LLM策略, D_T: 任务数据集, N: 迭代轮数,\n       B: 每轮采样数, T: MCTS树深度, B: replay buffer,\n       θ_threshold: 偏好对阈值, K: MCTS候选动作数\nOutput: π_{θ_N}: 训练后的LLM策略</p>\n<p>for i = 1 to N do\n    π_ref ← π_{θ_i}, π_{θ_i} ← π_{θ_{i-1}}\n    从 D_T 采样 B 个任务\n    for each task in batch do\n        初始化根节点 h_0\n        for t = 1 to T do\n            Selection: 使用UCB1从根遍历至叶节点\n            Trajectory Rollout: 从选定节点用π_{θ_i} rollout至终止\n            Backpropagation: 自底向上回传更新Q值和N值\n        end for\n        收集rollout轨迹存入replay buffer B\n    end for\n    构造偏好对 D_P = {(h_t, a_t^w, a_t^l)}：节点级对比，\n        当 |Q̃(h_t, a^w) - Q̃(h_t, a^l)| &gt; θ_threshold 时构成偏好对\n    使用DPO目标函数以 D_P 和 π_ref 优化 π_{θ_i}\nend for</p>\n<h5>3. 方法动机与背景</h5>\n<p>传统LLM Agent在交互式网页环境中面临两大挑战：(1) <strong>复合误差</strong>：监督微调的行为克隆会因分布偏移而累积错误；(2) <strong>探索不足</strong>：模型在搜索结果中贪心地只检查第一页，从不翻页（在WebShop实验中表现为核心失败模式）。强化学习虽能利用失败轨迹，但标准在线RL在真实交互环境中成本过高且不可扩展。</p>\n<p>Agent Q的设计哲学：<strong>用搜索补偿策略的短视（推理时），用DPO将搜索经验压缩回策略（训练时）</strong>，形成自我改进闭环。</p>\n<h5>4. 核心机制详解</h5>\n<p><strong>（a）MCTS搜索形式化</strong></p>\n<p>将网页Agent流程建模为树搜索。状态表示为历史摘要+当前页面DOM树。在每个状态节点，从策略模型采样K个候选动作。与棋类等固定动作空间不同，网页Agent的动作空间是开放式文本生成，因此用LLM作为\"动作提议分布\"（action-proposal distribution）。</p>\n<p>MCTS四阶段：\n- <strong>Selection</strong>：使用UCB1公式选择最有潜力的节点\n- <strong>Expansion/Simulation</strong>：执行动作进入新页面，用当前策略rollout至终止\n- <strong>Backpropagation</strong>：环境返回二元奖励R∈{0,1}，自底向上更新每个状态-动作对的Q值和访问计数</p>\n<div class=\"kb-math kb-math-display\">Q(\\mathbf{h}_t, \\mathbf{a}_t^i) \\leftarrow \\frac{Q(\\mathbf{h}_t, \\mathbf{a}_t^i) N(\\mathbf{h}_t, \\mathbf{a}_t^i) + R}{N(\\mathbf{h}_t, \\mathbf{a}_t^i) + 1}</div>\n<p><strong>（b）AI自我批判的过程监督</strong></p>\n<div class=\"key-point\">💡 关键创新：网页环境无中间奖励。Agent Q使用<strong>同一LLM</strong>对候选动作进行零样本排序，作为过程监督信号。</div>\n<p>具体做法：将K个候选动作输入LLM，要求其按\"对完成用户任务帮助最大\"的标准排序。通过多轮查询（每轮移除已选最佳动作）得到完整排序。该排序有两个用途：(1) 在MCTS选子节点时与UCB1配合使用；(2) 在构造DPO偏好对时作为Q值的补充。</p>\n<p><strong>（c）节点级DPO训练</strong></p>\n<div class=\"warn-box\">⚠️ 与轨迹级DPO的关键区别：在步骤级别构造偏好对，而非完整轨迹级别。这允许更细粒度的信用分配，利用MCTS的分支结构自然产生正负对比。</div>\n<p><strong>定理1</strong>：若偏好按 $p(\\mathbf{a}_t^w \\succ \\mathbf{a}_t^l | \\mathbf{h}_t) \\propto \\sigma(Q(\\mathbf{h}_t, \\mathbf{a}_t^w) - Q(\\mathbf{h}_t, \\mathbf{a}_t^l))$ 生成，则DPO优化后的策略等价于最优RL策略：</p>\n<div class=\"kb-math kb-math-display\">\\pi^*(\\mathbf{a}|\\mathbf{h}_t) \\propto \\pi_{\\text{ref}}(\\mathbf{a}|\\mathbf{h}_t) \\exp(Q(\\mathbf{h}_t, \\mathbf{a})/\\beta)</div>\n<p>实际操作中，Q值采用加权混合：$\\tilde{Q} = (1-\\lambda) \\cdot Q_{\\text{MCTS}} + \\lambda \\cdot \\text{AI_Score}$。当两个候选动作的$\\tilde{Q}$差超过阈值$\\theta_{\\text{threshold}}$时，构造偏好对$(h_t, a^w, a^l)$，使用标准DPO损失优化策略。</p>\n<p><strong>（d）与基线方法的区别</strong></p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>方法</th>\n<th>监督信号</th>\n<th>是否用失败轨迹</th>\n<th>步骤级优化</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>RFT (STaR)</td>\n<td>结果监督</td>\n<td>否（仅成功轨迹）</td>\n<td>否</td>\n</tr>\n<tr>\n<td>DPO (轨迹级)</td>\n<td>结果监督</td>\n<td>是</td>\n<td>否</td>\n</tr>\n<tr>\n<td><strong>Agent Q</strong></td>\n<td>结果+过程监督</td>\n<td>是</td>\n<td><strong>是（节点级）</strong></td>\n</tr>\n</tbody>\n</table></div>\n<h5>5. 实验结果</h5>\n<p><strong>WebShop环境（图3）</strong>：\n<img alt=\"WebShop成功率和DPO+MCTS对比\" src=\"https://ar5iv.org/html/2408.07199/assets/images/WebShopPreliminaryResultsPassFinalBold.png\" /></p>\n<p><strong>OpenTable真实网站（图6）</strong>：\n<img alt=\"OpenTable各方法成功率对比\" src=\"https://ar5iv.org/html/2408.07199/assets/images/open_table_sr_final_bold.png\" /></p>\n<p>核心发现：DPO（结果监督）已优于RFT，但加入MCTS搜索后（Agent Q）进一步提升16-77%。在OpenTable上Agent Q（81.7%）远超GPT-4o零样本（62.6%），推理时再叠加MCTS在线搜索达95.4%。</p>\n<h5>6. 输入格式</h5>\n<p>Agent的输入格式为：系统提示 + 执行历史 + 当前页面DOM树 + 用户任务，如：</p>\n<p><img alt=\"Agent输入格式示意\" src=\"https://ar5iv.org/html/2408.07199/assets/images/AgentFormat.png\" />\n<em>图2：Agent输入由系统提示、历史、当前页面和用户任务组成</em></p>",
      "quiz": {
        "q": "Agent Q中节点级DPO与轨迹级DPO的核心区别是什么？",
        "options": [
          "节点级DPO使用更大的batch size",
          "节点级DPO在每一步构造偏好对而非完整轨迹级别，利用MCTS分支结构提供细粒度信用分配",
          "节点级DPO不需要参考策略π_ref",
          "节点级DPO使用在线RL代替离线优化"
        ],
        "answer": 1,
        "explain": "节点级DPO在MCTS搜索树的每个步骤级别构造(a^w, a^l)偏好对，利用树的分支结构自然产生正负对比，实现比轨迹级DPO更细粒度的信用分配。"
      }
    },
    {
      "id": "webrl",
      "num": 8,
      "name": "WebRL",
      "fullName": "自演化在线课程网页强化学习 (WebRL)",
      "year": "2024.11",
      "org": "Tsinghua/Zhipu AI",
      "parent": "agent_q",
      "paperUrl": "https://arxiv.org/abs/2411.02337",
      "projectUrl": "",
      "category": "online_rl",
      "motivation": "以自演化课程缓解稀疏网页奖励",
      "summary": "WebRL提出自演化在线课程强化学习框架，通过从失败任务中自动生成新课程任务 + 结果监督奖励模型(ORM) + 自适应RL策略，将开源Llama-3.1-8B在WebArena-Lite上的成功率从4.8%提升至42.4%，超越GPT-4o(13.9%)等闭源模型。",
      "keyPoints": [
        "<strong>自演化课程(Self-Evolving Curriculum)</strong>：从模型执行失败的任务出发，使用GPT-4o生成语义相似但难度递增的新任务，8个阶段逐步扩展训练任务池",
        "<strong>结果监督奖励模型(ORM)</strong>：在WebArena-Lite 1,186条轨迹基础上，通过指令改写+跨基线方法采集12,200条轨迹训练ORM，提供离散成功/失败二元信号",
        "<strong>自适应强化学习策略</strong>：基于PPO + KL散度约束（约束模型输出分布不偏离SFT模型），融合经验回放缓冲区中的历史成功数据",
        "<strong>双层价值函数</strong>：instruction-level critic评估整体任务完成概率，step-level critic评估当前步骤的即时价值",
        "<strong>重放缓冲区筛选机制</strong>：仅保留perplexity在 [1/0.95, 1/0.5] 之间的历史数据，避免数据质量退化",
        "<strong>开源突破</strong>：将Llama-3.1-8B提升至42.4%，GLM-4-9B至43%，Llama-3.1-70B至49.1%，全面超越GPT-4系列"
      ],
      "detail": "<h5>1. 核心框架图</h5>\n<p><img alt=\"WebRL Framework Overview\" src=\"https://arxiv.org/html/2411.02337v3/x1.png\" />\n<em>图1：WebRL框架总览——包含(1)自演化课程从失败样本中生成新任务，(2)ORM提供结果监督奖励，(3)自适应RL策略融合在线探索与历史经验回放，(4)基于PPO+KL约束的策略优化。</em></p>\n<h5>2. 算法伪代码</h5>\n<p>Algorithm 1: WEBRL Training Process\n─────────────────────────────────────────────────\nInput: SFT-trained policy π_sft, WebArena-Lite training set D_train\nOutput: Trained policy π_θ</p>\n<ol>\n<li>Fine-tune π_θ from open LLM using SFT on D_train</li>\n<li>Initialize replay buffer B ← ∅, failure set F ← ∅</li>\n<li>Run π_θ on D_train instructions to populate B and F</li>\n<li>for phase = 1 to 8 do:</li>\n<li>// Self-Evolving Curriculum</li>\n<li>if phase &gt; 1 then</li>\n<li>select 500 new instructions from GPT-4o generated set\n             that satisfy filtering criteria</li>\n<li>add selected instructions to training set</li>\n<li>end if</li>\n<li>// Online Interaction</li>\n<li>for each instruction in current training set do:</li>\n<li>rollout trajectory τ = (s_1,a_1,...,s_T,a_T) using π_θ</li>\n<li>compute ORM reward R(τ) ∈ {0,1}</li>\n<li>add (τ, R) to replay buffer B</li>\n<li>if R=0: add instruction to failure set F</li>\n<li>end for</li>\n<li>// Curriculum Generation (for next phase)</li>\n<li>if phase &lt; 8:</li>\n<li>for each failed instruction in F:</li>\n<li>prompt GPT-4o to generate similar but harder tasks</li>\n<li>// Adaptive RL Training</li>\n<li>sample historical data from B where ppl ∈ [1/0.95, 1/0.5]</li>\n<li>(limit historical samples to 2× current interaction data)</li>\n<li>train actor π_θ and critic V using PPO with KL constraint\n         （对instruction-level reward + step-level advantage）</li>\n<li>end for</li>\n<li>return π_θ</li>\n</ol>\n<h5>3. 深入方法解释</h5>\n<p><strong>动机与背景</strong>。LLM网页智能体在WebArena等真实环境中展现出强大潜力，但现有方案严重依赖GPT-4等昂贵闭源API。开源LLM（如Llama-3.1-8B）直接使用时成功率仅4.8%，即使经过SFT也仅提升至约15%。核心挑战有三：(1)<strong>训练任务稀缺</strong>——WebArena-Lite仅提供812个训练任务，远不足以覆盖网页交互的多样性；(2)<strong>反馈信号稀疏</strong>——网页任务只有最终的二元成功/失败信号，无中间步骤反馈；(3)<strong>在线策略漂移</strong>——RL训练中策略不断变化，历史数据分布与当前策略不匹配。</p>\n<p><strong>自演化课程</strong>。WebRL最核心的创新是自我演化课程机制。模型首先在初始训练集上执行任务，收集失败案例。然后利用GPT-4o作为\"任务生成器\"，提示GPT-4o基于每个失败任务生成语义相似但难度更高的新任务（如改变搜索条件、增加约束、引入干扰项）。新任务需满足过滤标准（与已有任务不重复、符合WebArena环境约束等），每个阶段筛选500个高质量任务加入训练池。8个阶段后，任务多样性大幅提升，模型逐步从简单任务过渡到复杂长序列任务。</p>\n<p><strong>结果监督奖励模型(ORM)</strong>。由于网页任务只能获得二元成功/失败结果，WebRL训练了一个多步结果监督奖励模型(MORM)。训练数据构建：在WebArena-Lite的1,186条原始轨迹基础上，(1)通过指令改写扩充任务，(2)使用SFT/Filtered BC/AWR/DigiRL等多种基线方法在新任务上采集rollouts，(3)使用环境提供的replay函数自动标注每条轨迹的成功/失败。最终获得12,200条标注轨迹训练ORM，在验证集上达到92.6%的准确率。</p>\n<div class=\"key-point\">💡 关键：ORM将\"是否成功完成网页任务\"建模为序列级别的二分类问题，输入为完整动作轨迹，输出为{0,1}二元奖励，替代了传统RL中的手工奖励函数。</div>\n<p><strong>自适应RL训练</strong>。策略优化采用PPO算法，并引入两项关键设计：\n- <strong>KL散度约束</strong>：对策略输出分布施加KL惩罚 \\<span class=\"kb-math kb-math-inline\">D_{KL}(\\pi_{\\theta} \\| \\pi_{sft})\\</span>，防止策略在RL微调中偏离原始SFT模型过远导致灾难性遗忘。\n- <strong>双层Critic架构</strong>：Instruction-level critic \\<span class=\"kb-math kb-math-inline\">V_{\\text{inst}}(x)\\</span> 评估整个任务的期望成功率（用于最终奖励分配），Step-level critic \\<span class=\"kb-math kb-math-inline\">V_{\\text{step}}(h_t)\\</span> 评估在已执行历史 \\<span class=\"kb-math kb-math-inline\">h_t\\</span> 下完成任务的概率（用于逐步骤优势估计）。</p>\n<p>经验回放缓冲区采用<strong>perplexity筛选</strong>机制：仅保留模型在当前策略下perplexity在 [1/0.95, 1/0.5] 之间的历史轨迹进行重放，排除过于简单(perplexity过低)或过于困难/异常(perplexity过高)的数据，且历史数据量限制为当前交互数据量的2倍。</p>\n<p><strong>与传统方法的差异</strong>。相比DigiRL（在固定任务集上在线学习），WebRL通过课程机制持续扩展任务空间，使模型不断增强对长序列任务的鲁棒性。对比AWR（Advantage Weighted Regression），WebRL的PPO+KL约束提供了更稳定的策略更新。实验表明，去除课程学习后性能从42.4%降至20.6%，去除重放缓冲区后降至32.7%，验证了每个组件的关键作用。</p>",
      "quiz": {
        "q": "WebRL的自演化课程机制的核心作用是什么？",
        "options": [
          "加速模型训练收敛速度",
          "从失败任务中自动生成难度递增的新任务，扩充训练任务空间，解决任务稀缺问题",
          "减少对GPT-4o API的依赖",
          "提高ORM奖励模型的训练精度"
        ],
        "answer": 1,
        "explain": "自演化课程利用GPT-4o基于模型失败的任务生成语义相似但难度更高的新任务，通过8个阶段逐步扩展训练任务池，直接解决了WebArena训练任务不足的瓶颈。"
      }
    },
    {
      "id": "webagent_r1",
      "num": 9,
      "name": "WebAgent-R1",
      "fullName": "端到端多轮网页代理强化学习 (WebAgent-R1)",
      "year": "2025.05",
      "org": "Amazon",
      "parent": "webrl",
      "paperUrl": "https://arxiv.org/abs/2505.16421",
      "projectUrl": "",
      "category": "online_rl",
      "motivation": "用纯在线多轮RL直训网页代理",
      "summary": "WebAgent-R1 提出首个面向 Web Agent 的端到端多轮强化学习框架 M-GRPO（Multi-turn GRPO），结合行为克隆初始化和动态上下文压缩，在 WebArena-Lite 上取得 SOTA，验证了 RL 在真实 Web 交互任务中的有效性。",
      "keyPoints": [
        "核心动机：用纯在线多轮RL直训网页代理",
        "演化来源：继承或改进自 webrl",
        "代表机构：Amazon"
      ],
      "detail": "<p><img alt=\"WebAgent-R1 示意图\" src=\"https://ar5iv.labs.arxiv.org/html/2505.16421/assets/x1.png\" />\n<em>图：WebAgent-R1 的核心框架或评测示意。</em></p>\n<h5>1. 问题形式化：Web Agent 的 POMDP 建模</h5>\n<p>Web Agent 在每个时间步 t 接收环境的 HTML 观察 <code>o_t</code>，基于历史 <code>(o_1, a_1, ..., o_t)</code> 输出结构化动作 <code>a_t</code>。动作空间是预定义的函数调用集：\n- <code>click(element_id)</code> — 点击指定元素\n- <code>type(element_id, text)</code> — 在输入框填入文本\n- <code>scroll(direction)</code> — 页面滚动\n- <code>goto(url)</code> — 页面跳转\n- <code>stop(answer)</code> — 任务完成并返回答案</p>\n<p>任务被建模为有限视界 POMDP：<code>(S, A, O, T, Ω, R, γ, H)</code>，其中状态 s ∈ S 包含页面 DOM 和会话 cookie，转移函数 T 是确定性的（浏览器执行动作后返回新页面），观测函数 Ω 给出渲染后的 HTML。由于 cookie 携带部分不可观测的服务器端状态，问题本质上是部分可观测的。</p>\n<p>关键设计：当前观测 <code>o_t</code> 是一个完整的 HTML 文档，可能包含数万 tokens。原始 HTML 直接拼接进 prompt 导致上下文爆炸，这是后续动态压缩要解决的核心痛点。</p>\n<h5>2. M-GRPO：多轮 Group Relative Policy Optimization</h5>\n<p>M-GRPO 是 WebAgent-R1 的核心算法贡献，将 DeepSeek-R1 提出的单轮 GRPO 推广到多轮 Web 交互。</p>\n<p><strong>标准 GRPO 回顾</strong>：对于单轮生成任务，从旧策略采样 G 个响应 <code>{y_1, ..., y_G}</code>，对每个响应内的 token 使用 clipped importance sampling 优化：</p>\n<pre><code>A_i = (r_i - mean(r)) / std(r)   # group-relative advantage\nL = -E[min(r_{i,t}(θ)·A_i, clip(r_{i,t}(θ), 1-ε, 1+ε)·A_i)] - β·D_KL\n</code></pre>\n<p><strong>M-GRPO 关键改造</strong>：\n- 每个 trajectory <code>τ_i = (a_{i,1}, a_{i,2}, ..., a_{i,|τ_i|})</code> 包含多轮动作\n- 组内所有 trajectory 共享同一初始任务，并行生成\n- <strong>组内共享奖励</strong>：trajectory τ_i 的最终二元奖励 r_i（成功=1，失败=0）分配给该 trajectory 内所有 token\n- 每个动作内的 <strong>token 级 PPO clip</strong> 沿用 GRPO 形式，importance ratio <code>r_{i,j,t}(θ) = π_θ(a_{i,j,t}|q, a_{i,j,&lt;t}) / π_old(...)</code>\n- 组相对优势 <code>A_{i,j} = (r_i - mean(r)) / std(r)</code> <strong>对整个 action 内的所有 token 共享</strong></p>\n<p>伪代码：</p>\n<pre><code>for each training step:\n    1. 采样 G 个任务，每个任务启动 G 个并行浏览器\n    2. 每个浏览器独立与环境交互，生成 trajectory τ_i\n    3. 计算每个 τ_i 的二元奖励 r_i\n    4. 计算组内标准化优势 A_i = normalize({r_1,...,r_G})\n    5. 对每个 τ_i 的每个 action 的每个 token，计算 PPO loss\n    6. 加上 KL 惩罚项 -β·D_KL(π_θ || π_ref)\n    7. 梯度下降更新策略\n</code></pre>\n<p><strong>与 WebRL/DigiRL 等 prior work 的关键区别</strong>：\n- WebRL (Qi et al., 2025) 采用离线 RL + 课程学习 + 奖励模型，需要训练一个 outcome reward model\n- WebAgent-R1 使用规则化二元奖励（环境自带），无需奖励模型，简化训练流程\n- 端到端优化整个多轮交互链，而非仅优化单步决策</p>\n<h5>3. 动态上下文压缩（Dynamic Context Compression）</h5>\n<p>这是工程上最关键的设计。在 multi-turn Web 交互中，每轮 agent 看到的 prompt 包含：</p>\n<pre><code>[System Prompt] + [Task Instruction] + [Observation_1] + [Action_1] + [Observation_2] + [Action_2] + ...\n</code></pre>\n<p>假设单页 HTML 平均 5K tokens，10 轮交互后上下文膨胀至 50K+ tokens。在 RL 训练中，需要为 G 个 trajectory 的每个 token 存储 KV-cache，显存压力巨大。</p>\n<p><strong>压缩策略</strong>：\n- 保留 HTML 的 <strong>DOM 结构树</strong>（tag hierarchy），删除样式属性、脚本、注释等冗余内容\n- 对长文本内容（如 <p>、<span> 内部）进行截断，保留前 N 个字符 + 省略标记\n- 对重复出现的导航栏、页脚等静态内容，在第二次出现时用 <code>&lt;nav&gt;...&lt;/nav&gt;</code> 省略标记替代\n- 关键操作目标（如按钮文字、链接文本）始终保留完整</p>\n<p>这样将单页 HTML 从 5K-10K tokens 压缩至 1K-2K tokens，在保持语义信息的前提下大幅降低计算开销。压缩是可配置的（支持关闭以保留完整信息），论文报告在 RL 训练中启用压缩对性能影响轻微。</p>\n<h5>4. 训练动态三阶段分析（Figure 3）</h5>\n<p>论文通过监控奖励、轨迹长度和交互轮次三个指标，揭示了 RL 训练的三个阶段：</p>\n<p><strong>Phase 1 — 初始技能获取</strong>：\n- 奖励快速增长，模型迅速学会基础操作（如正确调用 click/type 函数、识别基本 HTML 元素）\n- 轨迹长度（生成的 token 总数）急剧增加，说明从 BC 阶段的简短输出过渡到更详细的推理\n- 交互轮次增加，agent 变得\"更主动\"\n- 这一阶段最显著的特征是 <strong>快速获得正向奖励</strong>，从几乎随机行为快速收敛到能完成简单任务</p>\n<p><strong>Phase 2 — 探索与策略精炼</strong>：\n- 奖励趋于平稳并有波动（而非持续单调增长），说明 agent 在尝试不同于 BC 数据的 novel strategies\n- 轨迹长度稳定，交互轮次开始下降，agent 学会更高效地完成任务\n- 这一阶段的奖励波动是 <strong>健康的探索信号</strong>，表明模型在跳出 BC 的行为分布，尝试 RL 特有的优化路径</p>\n<p><strong>Phase 3 — 策略稳定</strong>：\n- 奖励再次缓慢上升，轨迹长度略有增长（可能是更精细的推理），交互轮次稳定\n- 策略趋于收敛，exploration 减少，exploitation 增强合成高奖励策略</p>\n<p>影响：Qwen2.5-3B 和 Llama3.1-8B 经历了相似的三阶段规律，表明 M-GRPO 的训练动态具有模型尺度的通用性。</p>\n<h5>5. 消融研究：BC 是 RL 成功的必要条件</h5>\n<p><strong>WebAgent-R1-Zero</strong>（跳过 BC 直接 RL）：\n- 初始 SR = 6.1%（接近随机），RL 后甚至退化\n- 原因：模型缺少对 Web 任务的基本理解，生成的动作不完整（缺少必需参数、元素 ID 不匹配），几乎得不到正向奖励 → 无法有效探索 → RL 退化\n- 结论：<strong>BC 提供的最小能力\"基石\"是 RL 有效探索的前提</strong></p>\n<p><strong>WebAgent-R1-CoT</strong>（BC 阶段加入长思维链数据）：\n- 在 BC 阶段使用强推理模型生成 long-CoT 轨迹作为 SFT 数据\n- BC-CoT 初始 SR = 24.5%（vs 普通 BC 的 20%），验证了思维链对 Web Agent 的增益\n- 但 RL 增益较小：24.5% → 30.3%（+5.8%），vs WebAgent-R1 的 20% → 33.9%（+13.9%）\n- 原因：long-CoT BC 中的确定性推理模式可能限制了 RL 的探索空间</p>\n<h5>6. Thinking Format 与 Test-time Scaling（Table 3, Figure 5）</h5>\n<p><strong>Thinking Format</strong>：在 prompt 中加入 `` 显式思考块，引导模型在动作选择前进行分析。</p>\n<p>效果：\n- o4-mini: 15.9% → 36.9%（+21%），提升最显著\n- Qwen2.5-3B: 3.2% → 6.1%\n- Llama3.1-8B: 4.8% → 8.5%\n- 更强模型受益更多：思维格式释放了基础模型已有的推理能力</p>\n<p><strong>关键发现 — 多轮交互作为 Test-time Scaling</strong>：\n- 单轮响应长度在 thinking format 下几乎不变（Qwen: 139→142 tokens）\n- 但 <strong>交互轮次大幅增加</strong>（Qwen: 6→17 轮）\n- 这表明 Web Agent 的 test-time scaling 不是\"写更长的回答\"，而是\"与页面进行更多回合的观察-行动循环\"\n- Figure 5 进一步验证：增加最大交互轮次限制，prompting/SFT/RL 所有方法的成功率持续提升</p>\n<h5>7. 主实验结果解读（Table 2）</h5>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>方法</th>\n<th>Reddit</th>\n<th>GitLab</th>\n<th>CMS</th>\n<th>Map</th>\n<th>Shopping</th>\n<th>平均 SR</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>GPT-4o (prompt)</td>\n<td>10.5</td>\n<td>10.0</td>\n<td>20.0</td>\n<td>20.0</td>\n<td>11.1</td>\n<td>13.9</td>\n</tr>\n<tr>\n<td>OpenAI-o3 (prompt)</td>\n<td>36.8</td>\n<td>46.7</td>\n<td>45.7</td>\n<td>38.5</td>\n<td>33.3</td>\n<td>39.4</td>\n</tr>\n<tr>\n<td>BC (Qwen2.5-3B)</td>\n<td>42.1</td>\n<td>16.7</td>\n<td>22.9</td>\n<td>26.9</td>\n<td>11.1</td>\n<td>20.0</td>\n</tr>\n<tr>\n<td>WebRL (Llama3.1-8B)</td>\n<td>63.2</td>\n<td>46.7</td>\n<td>54.3</td>\n<td>36.7</td>\n<td>31.1</td>\n<td>42.4</td>\n</tr>\n<tr>\n<td><strong>WebAgent-R1 (Llama3.1-8B)</strong></td>\n<td>47.4</td>\n<td>56.7</td>\n<td>57.1</td>\n<td>23.1</td>\n<td><strong>44.4</strong></td>\n<td><strong>44.8</strong></td>\n</tr>\n</tbody>\n</table></div>\n<p>亮点：\n- WebAgent-R1（8B）超越所有 prior work，包括 WebRL（42.4%）和 OpenAI-o3（39.4%）\n- 在 Shopping 任务上 44.4% 对比 WebRL 的 31.1%，提升 13.3 个百分点\n- 3B 模型（33.9%）超越 GPT-4o（13.9%）和 Qwen2.5-32B（16.9%），小模型+RL 胜过 32B 裸模型</p>",
      "quiz": {
        "q": "WebAgent-R1 中 M-GRPO 采用 trajectory 组内相对优势，而不是对所有 rollout 全局归一化，最直接的原因是什么？",
        "options": [
          "为了让不同任务共享完全相同的奖励尺度，方便离线蒸馏",
          "为了在同一任务的并行轨迹之间做相对比较，把最终成败稳定传播到整条多轮交互链",
          "为了避免使用 KL 正则，因为全局归一化会与 KL 冲突",
          "为了让每个 token 都拥有独立环境奖励，不再依赖最终结果"
        ],
        "answer": 1,
        "explain": "M-GRPO 的关键是把同一任务下并行生成的多条 trajectory 放在一组内比较，再把组相对优势共享给该轨迹中的各轮 token，以适应多轮稀疏奖励场景。"
      }
    },
    {
      "id": "agent_lightning",
      "num": 10,
      "name": "Agent Lightning",
      "fullName": "通用代理强化学习解耦框架 (Agent Lightning)",
      "year": "2025.08",
      "org": "Microsoft Research",
      "parent": "agile",
      "paperUrl": "https://arxiv.org/abs/2508.03680",
      "projectUrl": "",
      "category": "online_rl",
      "motivation": "解耦代理执行与RL训练栈",
      "summary": "Agent Lightning 提出了一套**完全解耦智能体与 RL 训练**的模块化框架——通过统一数据接口（State/Call/Semantic Variables）将任意架构的 AI Agent 执行轨迹建模为 POMDP，再以 transition 级分层 RL 进行优化，无需在训练系统内重写 Agent 逻辑，在 Text-to-SQL、RAG、数学工具调用三个任务上验证了稳定提升。",
      "keyPoints": [
        "核心动机：解耦代理执行与RL训练栈",
        "演化来源：继承或改进自 agile",
        "代表机构：Microsoft Research"
      ],
      "detail": "<p><img alt=\"Agent Lightning 示意图\" src=\"https://ar5iv.labs.arxiv.org/html/2508.03680/assets/x1.png\" />\n<em>图：Agent Lightning 的核心框架或评测示意。</em></p>\n<h5>1. 问题背景：Agent RL 的碎片化困境</h5>\n<pre><code>现有做法（Tightly Coupled）:\n┌─────────────────────────────────┐\n│  RL Training System (verl etc.) │\n│  ┌───────────────────────────┐  │\n│  │ Agent Logic (重写)        │  │\n│  │ ┌──────┐  ┌───┐  ┌─────┐ │  │\n│  │ │ LLM  │  │Tool│  │Orch │ │  │\n│  │ └──────┘  └───┘  └─────┘ │  │\n│  └───────────────────────────┘  │\n│  需要: masking策略/拼接顺序等    │\n└─────────────────────────────────┘\n\nAgent Lightning 做法（Decoupled）:\n┌──────────────┐     AIR协议     ┌──────────────────────┐\n│ Agent Runtime│ ←────────────→ │  RL Training System   │\n│ (原生框架)    │  State/Call流  │  (仅处理Transition)   │\n│ LangChain    │                │  LightningRL          │\n│ OpenAI SDK   │                │  Credit Assignment    │\n│ AutoGen ...  │                │                       │\n└──────────────┘                └──────────────────────┘\n</code></pre>\n<p>论文指出现有 RL 训练系统（verl、OpenRLHF、TRL、ROLL、AReaL）<strong>均要求 Agent 在训练系统内部重新实现</strong>。因为训练侧必须感知 Agent 执行逻辑以确定拼接顺序和 mask 位置，这导致：\n- 多框架迁移是<strong>劳动密集且易错</strong>的\n- 异构 Agent 生态（LangChain、OpenAI Agents SDK、AutoGen、自研）无法统一\n- 开发者需要额外学习 Ray 等分布式系统\n- MCP Server、外部 API 等复杂依赖增加训练系统负担</p>\n<h5>2. 统一数据接口：State 与 Call</h5>\n<p>这是整个框架的<strong>数据基石</strong>。论文将任意 Agent 执行轨迹抽象为两种核心原语：</p>\n<pre><code>State:   Agent 在某一时刻的完整快照\nCall:    Agent 对某个 Component（LLM/Tool/Prompt）的一次调用\n\n执行轨迹 T = [(State₀, Call₀), (State₁, Call₁), ..., (Stateₙ, Callₙ)]\n</code></pre>\n<p><strong>State 结构</strong>（推断自论文描述）：\n- <code>messages</code>: 当前对话历史\n- <code>memory</code>: 外部记忆状态（如 RAG 检索结果）\n- <code>metadata</code>: 任务 ID、turn 编号等</p>\n<p><strong>Call 结构</strong>：\n- <code>component</code>: 被调用的组件标识（哪个 LLM / 哪个 Tool）\n- <code>input</code>: 组件输入（prompt 或 tool arguments）\n- <code>output</code>: 组件输出（LLM 文本 或 tool 返回）\n- <code>type</code>: <code>llm_call</code> | <code>tool_call</code> | <code>prompt_rendering</code></p>\n<p><strong>Semantic Variables（语义变量）</strong>：\n框架自动从轨迹中提取预定义的 Semantic Variables，用于：\n- <strong>Reward 计算</strong>：如从 <code>&lt;answer&gt;...&lt;/answer&gt;</code> 标签中提取预测答案，与金标准比较\n- <strong>Dataset 构建</strong>：如将 Q-A 对反序列化为标准训练格式</p>\n<p><strong>RAG 示例</strong>（Section 3.1.3）：</p>\n<pre><code>Call₀: LLM(&quot;生成搜索query&quot;) → Semantic Variable: query\nCall₁: Retriever(query)     → Semantic Variable: docs\nCall₂: LLM(query + docs, &quot;生成答案&quot;) → Semantic Variable: answer\nReward = 0.9 × F1(answer, gold_answer) + 0.1 × format_score\n</code></pre>\n<p>这种抽象使得：\n1. <strong>任意 Agent 框架</strong>只需产生 State/Call 流即可接入\n2. Reward 计算<strong>完全自动化</strong>（开发者声明 Semantic Variables 即可）\n3. 同一轨迹可用于<strong>多种优化方法</strong>（RL、自动 Prompt 优化等）</p>\n<h5>3. POMDP 建模与 Transition 提取</h5>\n<p><strong>为什么是 POMDP？</strong>\nAgent 在执行过程中无法观测完整环境状态——它只看到当前轮次的 LLM 输入和工具返回，因此天然是部分可观测的。</p>\n<p><strong>MDP 定义</strong>：\n- 状态 S：当前 State（messages + memory + metadata）\n- 动作 A：LLM 生成的 token 序列（或工具调用的结构化参数）\n- 观测 O：Agent 可获取的信息子集\n- 转移 P：由工具执行和 LLM 自回归生成共同决定\n- 奖励 R：基于 Semantic Variables 自动计算</p>\n<p><strong>Transition 提取算法</strong>（Section 3.2.2）：</p>\n<pre><code>Input: 执行轨迹 T = [(S₀, C₀), (S₁, C₁), ..., (Sₙ, Cₙ)]\n       待优化的 CoI (Component of Interest) 集合\nOutput: RL 训练样本集合 {(s, a, r, s')}\n\nfor each (Sᵢ, Cᵢ) in T:\n    if Cᵢ.component ∈ CoI:           # 仅提取感兴趣组件的transition\n        s = Sᵢ                        # 当前状态作为state\n        a = Cᵢ.output                 # LLM输出作为action\n        r = aggregate_reward(T, i)    # 信用分配后的reward\n        s'= Sᵢ₊₁                      # 下一状态\n        yield (s, a, r, s')\n</code></pre>\n<p><strong>相比 Concat 方法的四个优势</strong>（Section 5.1 详细阐述）：\n1. <strong>架构灵活性</strong>：支持 multi-agent orchestration、分支、并行等复杂模式；Concat 仅适用于简单线性 Workflow\n2. <strong>避免上下文累积爆炸</strong>：Transition 仅包含当前 LLM 输入，而非多轮拼接后的超级长序列\n3. <strong>无需自定义 Masking</strong>：Concat 方法需为 input/loss/attention 分别设计 mask；Transition 天然隔离\n4. <strong>解锁高级 RL 算法</strong>：Transition 级组织支持分层 RL（如 ArCher）等更精细的信用分配</p>\n<h5>4. LightningRL：分层强化学习算法</h5>\n<p>这是论文的<strong>训练核心</strong>。分两阶段：</p>\n<p><strong>阶段一：单轮 RL 基础（Intra-Transition）</strong></p>\n<pre><code>对于每个 Transition (s, a, r, s'):\n    // a 是 LLM 生成的 token 序列 (t₁, t₂, ..., tₚ)\n    // 采用 GRPO/PPO 的目标函数\n\n    将 a 按语义分组： [thinkₛ...thinkₑ] [queryₛ...queryₑ] [answerₛ...answerₑ]\n\n    分组策略:\n    - 每组获得独立 advantage 估计\n    - 组内 token 共享组级 advantage\n    - 通过结构标签（&lt;think&gt;/&lt;query&gt;/&lt;answer&gt;）自动识别分组边界\n\n    优势:\n    - 避免了整条 response 平均分配 reward 的粗糙信用分配\n    - 可对不同语义段施加不同优化强度\n</code></pre>\n<p><strong>阶段二：多轮扩展（Inter-Transition Credit Assignment）</strong></p>\n<pre><code>将完整轨迹的 reward R 分配到各个 Transition:\n\n方案1（Return-based）:\n    rᵢ = λ^(N-i) × R     # 越晚的 transition 获得越高折扣\n\n方案2（Difference-based）:\n    rᵢ = V(s_{i+1}) - V(s_i) + R/N   # 使用 critic 估计状态价值差\n\n方案3（Hierarchical）:\n    // 高层 policy: 选择哪个 sub-goal\n    // 低层 policy: 在当前 transition 内执行 sub-goal\n    // 可集成 ArCher 等分层算法\n</code></pre>\n<p><strong>整体训练循环</strong>：</p>\n<pre><code class=\"language-python\"># 伪代码重构自论文 Section 3.3-3.4\nfor iteration in range(max_iterations):\n    # 1. 数据收集（Agent Runtime 端）\n    trajectories = agent_runtime.collect_trajectories(\n        tasks=dataset.sample_batch(batch_size),\n        policy=current_policy\n    )\n\n    # 2. 数据转换（AIR 层）\n    transitions = []\n    for traj in trajectories:\n        states_and_calls = unified_interface.parse(traj)\n        transitions.extend(\n            extract_transitions(states_and_calls, CoI=optimized_components)\n        )\n\n    # 3. 信用分配\n    for trans in transitions:\n        trans.reward = credit_assignment(trans, method=&quot;hierarchical&quot;)\n\n    # 4. RL 更新（训练端）\n    loss = 0\n    for trans in transitions:\n        group_advantages = group_tokens_by_semantics(trans.action)\n        loss += grpo_loss(trans, group_advantages)\n    policy.update(loss)\n\n    # 5. 同步策略到 Agent Runtime\n    agent_runtime.sync_policy(policy)\n</code></pre>\n<h5>5. Training-Agent Disaggregation 架构</h5>\n<pre><code>┌─────────────────────────────────────────────────────────────┐\n│                    Agent Lightning 系统架构                    │\n├──────────────────────┬──────────────────────────────────────┤\n│   Agent Runtime      │          RL Training System           │\n│  (Client端)          │          (Server端)                    │\n│                      │                                       │\n│  ┌────────────────┐  │  ┌──────────────────────────────┐    │\n│  │ Agent Framework│  │  │    LightningRL Engine        │    │\n│  │ (原生)          │  │  │  ┌────────  ┌────────────┐  │    │\n│  │ LangChain      │  │  │  │GRPO/PPO │CreditAssign │  │    │\n│  │ OpenAI SDK     │  │  │  └────────  └────────────┘  │    │\n│  │ AutoGen ...    │  │  └──────────────────────────────┘    │\n│  └───────┬────────┘  │                                       │\n│          │            │  ┌──────────────────────────────┐    │\n│  ┌───────▼────────┐  │  │   Policy Model (vLLM/SGLang) │    │\n│  │  Agent Runtime │  │  │      (可独立部署和扩展)        │    │\n│  │  - 轨迹收集     │  │  └──────────────────────────────┘    │\n│  │  - State/Call  │  │                                       │\n│  │    记录        │  │                                       │\n│  └───────┬────────┘  │                                       │\n│          │            │                                       │\n│          └────────────┤                                       │\n│         AIR Protocol  │                                       │\n│    (Agent-Inference   │                                       │\n│     Relay: 统一数据    │                                       │\n│     传输 + 策略同步)   │                                       │\n└──────────────────────┴──────────────────────────────────────┘\n</code></pre>\n<p><strong>AIR（Agent-Inference Relay）协议</strong>是三部分解耦的关键：\n1. <strong>数据管道</strong>：Agent Runtime 端收集的 State/Call 流通过 AIR 传输到训练端\n2. <strong>策略同步</strong>：训练完成的新 policy 通过 AIR 推送到推理引擎\n3. <strong>错误处理</strong>：论文提到对 Agent 执行中的异常（工具调用失败、格式错误等）有专门的降级和重试机制</p>\n<h5>6. 实验深度解读</h5>\n<p><strong>三个实验任务的设计逻辑</strong>：\n- <strong>Text-to-SQL</strong>：验证 Multi-Agent + Selective Optimization（3个Agent只优化2个）\n- <strong>RAG</strong>：验证开放域 + 大规模检索（Wikipedia 21M docs）+ 语义变量提取\n- <strong>Math QA</strong>：验证工具调用 + 精确计算 + 单 Agent 场景</p>\n<p><strong>Text-to-SQL（Section 4.1）核心发现</strong>：\n- 使用 LangChain 构建三 Agent 协作（Schema Analyzer → SQL Generator → Error Corrector）\n- 仅优化 SQL Generator 和 Error Corrector（Schema Analyzer 保持冻结）\n- 体现框架的<strong>选择性优化能力</strong>——并非所有 Agent 都需要 RL 训练\n- 训练和测试 reward 曲线均稳定上升</p>\n<p><strong>RAG（Section 4.2）核心发现</strong>：\n- MuSiQue 多跳推理数据集，Wikipedia 全文检索（21M 文档）\n- 单 LLM 工作流：生成 query → 检索 → 决定是否 refine → 生成答案\n- Reward = 0.9 × F1(correctness) + 0.1 × format_score\n- 训练和测试 reward 均持续提升，验证了框架在<strong>开放域语义推理</strong>场景的有效性</p>\n<p><strong>Math QA（Section 4.3）核心发现</strong>：\n- Calc-X 数据集，需要精确调用计算器工具\n- 单 LLM 负责：理解问题 → 决定何时调用计算器 → 解释结果 → 生成最终答案\n- 仅用答案正确性作为 reward（无格式分）\n- 稳定提升表明框架能优化<strong>精确工具调用和推理</strong>的联合能力</p>\n<p><strong>三个实验的共同点</strong>：\n- 均使用 Llama-3.2-3B-Instruct 作为基础模型\n- 训练和测试曲线均呈稳定上升趋势（无崩溃）\n- 覆盖三种主流 Agent 框架（LangChain、OpenAI Agents SDK、AutoGen）\n- 验证了<strong>统一数据接口</strong>的通用性</p>\n<h5>7. 相关工作的定位差异</h5>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>相关工作</th>\n<th>类型</th>\n<th>与 Agent Lightning 差异</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>RAGEN, Trinity-RFT, rLLM, Search-R1</td>\n<td>多轮 RL</td>\n<td>Concat 拼接方式，需自定义 mask；Agent Lightning 用 transition 级解耦</td>\n</tr>\n<tr>\n<td>verl, OpenRLHF, TRL, ROLL, AReaL</td>\n<td>RL 训练系统</td>\n<td>需在训练系统内重写 Agent；Agent Lightning 完全解耦</td>\n</tr>\n<tr>\n<td>ArCher, WebShop</td>\n<td>算法研究</td>\n<td>小模型（&lt;1B）或 PEFT；Agent Lightning 支持全参数大规模训练</td>\n</tr>\n<tr>\n<td>DeepSWE, ReTool, SimpleTIR</td>\n<td>应用特定 RL</td>\n<td>绑定特定任务/场景；Agent Lightning 通用框架</td>\n</tr>\n</tbody>\n</table></div>",
      "quiz": {
        "q": "Agent Lightning 强调 transition-level 训练而不是把整条 agent 轨迹直接 concat 成长序列，核心收益是什么？",
        "options": [
          "让所有 agent 都必须改写到同一个训练框架内部，方便统一实现",
          "只保留最终答案 token，彻底去掉中间工具调用和状态信息",
          "减少长上下文与复杂 masking 负担，同时更自然支持多 agent、分支和循环拓扑",
          "把所有奖励都延迟到推理阶段计算，训练阶段不再需要 credit assignment"
        ],
        "answer": 2,
        "explain": "论文强调 transition-level 表示能避免 concat 带来的长序列膨胀和 mask 设计耦合，并且更适配复杂 agent 拓扑，而不是只适用于线性流程。"
      }
    },
    {
      "id": "mua_rl",
      "num": 11,
      "name": "MUA-RL",
      "fullName": "多轮用户交互式工具代理强化学习 (MUA-RL)",
      "year": "2025.08",
      "org": "Meituan",
      "parent": "webagent_r1",
      "paperUrl": "https://arxiv.org/abs/2508.18669",
      "projectUrl": "",
      "category": "online_rl",
      "motivation": "把动态用户模拟接入工具RL闭环",
      "summary": "MUA-RL 提出了一种**将多轮用户交互与实时工具执行融入强化学习rollout**的训练框架，通过轻量级冷启动+GRPO+简化二元奖励，使中小规模模型在复杂多轮工具使用任务上超越GPT-4o等大模型。",
      "keyPoints": [
        "<strong>多轮用户交互rollout范式</strong>：将LLM模拟的用户、真实工具执行环境（数据库/MCP服务器）、文本生成三者交织在一次rollout中，训练智能体同时具备工具调用能力和用户沟通能力",
        "<strong>简化二元奖励设计</strong>：放弃复杂的格式奖励和工具调用奖励，仅使用r=1（完成任务）/ r=0（未完成），避免奖励黑客，鼓励多样化行为",
        "<strong>冷启动数据合成流水线</strong>：支持LLM模拟工具执行和真实MCP服务器两种模式，双验证（人工+DeepSeek-R1）保证数据质量",
        "<strong>GRPO算法</strong>：采用无需价值函数的Group Relative Policy Optimization，降低训练复杂度，在动态多轮交互中保持稳定",
        "<strong>跨领域强泛化</strong>：在TAU-Bench（零售/航空/电信）、BFCL-V3、ACEBench多个基准上，MUA-RL-32B以仅32B参数超越DeepSeek-V3-0324、GPT-4o等大模型"
      ],
      "detail": "<p><img alt=\"MUA-RL 示意图\" src=\"https://ar5iv.labs.arxiv.org/html/2508.18669/assets/x1.png\" />\n<em>图：MUA-RL 的核心框架或评测示意。</em></p>\n<h5>1. 核心框架示意图</h5>\n<p>文本中描述了三种rollout范式的演进关系（论文Figure 4）：</p>\n<pre><code>(a) Text-based Rollout (如数学推理)\n    Policy LLM → 纯文本生成 → 最终答案\n\n(b) Multi-step Rollout with Tool Execution (如代码解释器)\n    Policy LLM → 文本 ⇄ 工具调用 → 工具执行结果 ⇄ 文本 → 最终答案\n                   ↑ 实时交织 ↑\n\n(c) MUA-RL: Multi-turn User-interacting Rollout (本工作)\n    Policy LLM → 用户消息 ⇄ 文本生成 ⇄ 工具调用 ⇄ 数据库结果 ⇄ ... → 任务完成\n                   ↑ 用户LLM模拟 ↑        ↑ 真实工具执行 ↑\n</code></pre>\n<h5>2. 算法伪代码</h5>\n<pre><code class=\"language-python\"># MUA-RL 训练流程（简化版）\n# 冷启动阶段\ncold_start_trajectories = AgenticDataSynthesis(\n    scenarios=[retail, airline, telecom, ...],\n    tool_executor=&quot;MCP_server&quot;  # 或 &quot;LLM_simulator&quot;\n)\nπ_θ = SFT(base_model, cold_start_trajectories)\n\n# RL训练阶段 (GRPO)\nfor epoch in range(25):\n    for batch in training_queries:\n        # 1. Rollout: 多轮用户+工具交互\n        G_responses = []\n        for g in range(8):  # rollout number\n            trajectory = []\n            obs = user_query  # 用户LLM生成\n            while not task_complete:\n                action = π_θ_old(obs)  # 文本或工具调用\n                if action.type == &quot;tool_call&quot;:\n                    result = ToolExecutor.execute(action)  # 真实DB/MCP\n                    trajectory.append(result)\n                elif action.type == &quot;message&quot;:\n                    user_response = UserLLM(action)  # GPT-4o模拟\n                    trajectory.append(user_response)\n            G_responses.append(trajectory)\n\n        # 2. 奖励计算：仅二元\n        rewards = [1 if task_complete(traj) else 0 for traj in G_responses]\n\n        # 3. 优势函数（组内标准化）\n        A_i = (r_i - mean(rewards)) / std(rewards)\n\n        # 4. GRPO目标\n        for each response y_i:\n            ratio = π_θ(y_i|q) / π_θ_old(y_i|q)\n            L_clip = min(ratio*A_i, clip(ratio, 1-ε, 1+ε)*A_i)\n            L_KL = -β * KL(π_θ || π_ref)\n            L = L_clip + L_KL\n\n        # 5. 更新π_θ\n        optimizer.step(L)\n</code></pre>\n<h5>3. 方法详解</h5>\n<p><strong>🔹 冷启动数据合成（Section 3.2）</strong></p>\n<p>冷启动阶段旨在为RL训练提供合理的初始化策略。数据合成支持两种模式：</p>\n<ul>\n<li><strong>LLM模拟工具执行</strong>：设计数据库Schema → LLM生成工具描述和策略 → 三个LLM协作（Agent LLM + User LLM + Tool LLM），其中Tool LLM依据合成的小型数据库内存生成工具返回值。这一过程经过人工和DeepSeek-R1双重验证。</li>\n<li><strong>真实MCP服务器</strong>：直接接入Model Context Protocol服务器，工具和数据库均真实存在，仅需LLM生成领域相关的用户查询并协调交互。</li>\n</ul>\n<p>共合成约2000条高质量轨迹，覆盖9个场景（5个合成+4个MCP），用AdamW训练2个epoch。</p>\n<p><strong>🔹 多轮用户交互Rollout（Section 3.3.2）</strong></p>\n<p>这是MUA-RL的核心创新。相比传统纯文本rollout和已有工具使用rollout，MUA-RL的rollout包含三重动态交互：</p>\n<ol>\n<li><strong>用户LLM模拟</strong>：使用GPT-4o-2024-11-20作为用户模拟器，产生多样化用户请求和反馈</li>\n<li><strong>Policy LLM</strong>：自主决策何时调用工具、何时与用户沟通、调用哪些工具、调用多少次</li>\n<li><strong>真实工具执行环境</strong>：接入运营数据库，验证工具调用的实际效果</li>\n</ol>\n<p>这种设计使得rollout过程的动态性、随机性和不确定性显著增加，迫使模型发展出更复杂的探索-利用平衡策略。</p>\n<p><strong>🔹 简化二元奖励的妙处（Section 3.3.3）</strong></p>\n<p>MUA-RL抛弃了传统agentic RL中复杂的奖励工程（格式奖励、工具名匹配奖励、调用成功率奖励等），仅使用r=1/0的二元奖励。分析认为这有两重好处：</p>\n<ul>\n<li><strong>对对话变异的鲁棒性</strong>：只要最终结果正确，中间交互路径可以是任意多样的——这恰恰是\"agentic\"的核心特质</li>\n<li><strong>防止奖励黑客</strong>：模型无法通过操控输出格式或工具调用语法来骗取奖励，只有完整解决问题才有正向激励</li>\n</ul>\n<p><strong>🔹 训练动态的深层发现（Section 4.3.1）</strong></p>\n<p>训练曲线揭示了几个重要现象：</p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>指标</th>\n<th>发现</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>KL Loss</td>\n<td>8B模型波动显著大于14B/32B，说明小模型在探索-正则化权衡中更不稳定</td>\n</tr>\n<tr>\n<td>Entropy</td>\n<td>8B早期快速下降，表明从广泛探索向确定性利用的快速转变</td>\n</tr>\n<tr>\n<td>Rollout Turns</td>\n<td>训练初期上升后稳定在21-23轮，说明模型学会了结构化多轮交互</td>\n</tr>\n<tr>\n<td>Response Length</td>\n<td>全程基本不变，表明性能提升<strong>不来自更长输出</strong>（区别于推理模型的test-time scaling）</td>\n</tr>\n<tr>\n<td>Unique 4-gram Ratio</td>\n<td>保持较高多样性</td>\n</tr>\n</tbody>\n</table></div>\n<p>关键洞察：<strong>性能提升来自更结构化的多轮交互模式，而非更长的文本输出</strong>——这与GLM-4.5的发现一致。</p>\n<p><strong>🔹 泛化能力的来源（Section 4.3.2 消融）</strong></p>\n<p>冷启动模型在TAU Telecom上性能反而下降（因为引入了领域偏见），但经过MUA-RL训练后，模型有效消除了SFT阶段引入的偏差，发展出更鲁棒、更可泛化的行为模式。消融实验验证了：MUA-RL\"解毒\"了冷启动的过拟合，使模型学会真正的工具使用能力而非记忆表面模式。</p>\n<h5>4. 与现有方法的本质区别</h5>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>维度</th>\n<th>现有方法</th>\n<th>MUA-RL</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>Rollout类型</td>\n<td>纯文本或仅工具执行</td>\n<td>用户交互+工具执行三合一</td>\n</tr>\n<tr>\n<td>奖励设计</td>\n<td>复杂多层次（格式+匹配+执行）</td>\n<td>简化二元r∈{0,1}</td>\n</tr>\n<tr>\n<td>用户角色</td>\n<td>静态查询</td>\n<td>LLM模拟动态用户</td>\n</tr>\n<tr>\n<td>训练范式</td>\n<td>纯SFT或SFT+格式RL</td>\n<td>冷启动SFT+GRPO全交互RL</td>\n</tr>\n<tr>\n<td>泛化思路</td>\n<td>依靠SFT数据覆盖</td>\n<td>依靠RL探索消除SFT偏差</td>\n</tr>\n</tbody>\n</table></div>",
      "quiz": {
        "q": "MUA-RL 为什么刻意采用 r∈{0,1} 的二元奖励，而不是给工具格式、参数匹配等中间奖励？",
        "options": [
          "因为 GRPO 只能处理二元奖励，无法优化连续或稠密奖励",
          "因为论文希望把正确的工具名直接硬编码进 reward，减少探索",
          "因为只奖励最终任务完成更能容忍多样化对话路径，并减少 reward hacking",
          "因为多轮用户交互场景中无法记录工具调用日志"
        ],
        "answer": 2,
        "explain": "论文明确强调二元奖励的两个优点：对不同对话轨迹更鲁棒，以及避免模型通过格式或语法细节钻奖励漏洞。"
      }
    },
    {
      "id": "istar",
      "num": 12,
      "name": "iStar",
      "fullName": "隐式步骤奖励 (Implicit Step Rewards / iStar)",
      "year": "2025.09",
      "org": "Tongyi Lab",
      "parent": "webagent_r1",
      "paperUrl": "https://arxiv.org/abs/2509.19199",
      "projectUrl": "",
      "category": "reward",
      "motivation": "从轨迹偏好学习隐式步骤奖励",
      "summary": "iStar 提出了一种**隐式过程奖励模型（implicit PRM）**，通过从轨迹偏好对中学习稠密的步骤级隐式奖励，并将其与轨迹级结果奖励结合形成双层优势函数，从而解决 LLM Agent 在长序列多步交互中的信用分配难题，无需人工标注步骤奖励即可显著提升 RL 训练的样本效率和最终性能。",
      "keyPoints": [
        "<strong>隐式 PRM</strong>：无需显式预测每步得分，而是通过 DPO 式轨迹偏好对比隐式地为每个动作分配步骤奖励",
        "<strong>双层优势函数</strong>：将轨迹级结果奖励 <span class=\"kb-math kb-math-inline\">r_o</span> 与步骤级隐式奖励 <span class=\"kb-math kb-math-inline\">r_\\phi</span> 融合为 episode-level advantage <span class=\"kb-math kb-math-inline\">A^E</span> 和 step-level advantage <span class=\"kb-math kb-math-inline\">A^S</span>，指导策略梯度更新",
        "<strong>轨迹偏好对构造</strong>：利用结果验证器对同一任务的 N 条轨迹排序，自动构造正负轨迹对，无需人工标注",
        "<strong>与 vanilla RL 无缝集成</strong>：iStar 是策略无关的插件式方法，可与 GRPO、RLOO、PPO 等任意 RL 算法结合",
        "<strong>三环境验证</strong>：在 WebShop（网页导航与购买）、VisualSokoban（视觉推箱子推理）、SOTOPIA（社交对话）三个差异显著的环境上均达到 SOTA",
        "<strong>样本效率大幅提升</strong>：在 WebShop 上，iStar+GRPO 仅需 vanilla RLOO 一半的训练步数（105 vs ~210 steps）即达到同等性能"
      ],
      "detail": "<h5>动机与背景</h5>\n<p>LLM Agent 的强化学习面临<strong>三重核心挑战</strong>：</p>\n<ol>\n<li>\n<p><strong>奖励稀疏与延迟</strong>：Agent 通常在完整轨迹结束后才能获得一个标量结果奖励（成功/失败或分数），在长达数十步的交互中，这导致信用分配极其困难——模型无法判断到底是哪一步的正确（或错误）行动贡献了最终结果。</p>\n</li>\n<li>\n<p><strong>长轨迹非马尔可夫性</strong>：每个时间步不仅包含环境动作，还包含大段的 CoT（Chain-of-Thought）推理文本，这使得状态空间巨大且转移函数复杂，传统 MDP 假设难以成立。</p>\n</li>\n<li>\n<p><strong>环境非稳态与奖励验证困难</strong>：尤其在对话等开放场景中，过程奖励难以客观定义和验证，人工标注步骤奖励成本极高且不可扩展。</p>\n</li>\n</ol>\n<p>传统方法如 RLOO、GRPO 仅使用轨迹级结果奖励，导致信用分配粗糙、训练效率低下。而显式 PRM（如 Math-Shepherd）虽提供步骤奖励，但依赖昂贵的人工标注或启发式规则，难以泛化到多样化的 Agent 任务。iStar 的 key insight 是：<strong>轨迹偏好中已经蕴含了丰富的步骤级信用信息</strong>——好轨迹（高结果奖励）与差轨迹（低结果奖励）之间的差异不仅仅体现在最终结果上，更体现在中间步骤的质量差异上，通过对比学习可以从中蒸馏出隐式的步骤奖励。</p>\n<h5>核心机制：隐式 PRM 的双层优势架构</h5>\n<p>iStar 的核心架构由三部分构成：</p>\n<p><strong>（一）轨迹偏好对构造</strong></p>\n<p>对于每个任务 prompt <span class=\"kb-math kb-math-inline\">x</span>，Agent 采样 <span class=\"kb-math kb-math-inline\">N</span> 条独立轨迹 <span class=\"kb-math kb-math-inline\">\\{\\tau_1, \\dots, \\tau_N\\}</span>。每条轨迹 <span class=\"kb-math kb-math-inline\">\\tau_i = (o_1^i, a_1^i, o_2^i, a_2^i, \\dots, o_T^i, a_T^i)</span> 包含观察序列和动作序列（动作内含 CoT 推理文本）。使用<strong>结果奖励验证器</strong>（或奖励模型）<span class=\"kb-math kb-math-inline\">r_o</span> 计算每条轨迹的最终得分 <span class=\"kb-math kb-math-inline\">r_o(\\tau_i)</span>，据此将 <span class=\"kb-math kb-math-inline\">N</span> 条轨迹按得分排序，构造正负轨迹对 <span class=\"kb-math kb-math-inline\">\\tau^+ \\succ \\tau^-</span>。</p>\n<div class=\"key-point\">💡 关键：iStar 不需要训练一个独立的奖励模型来生成步骤标签，而是直接从轨迹排序的对比信号中学习。这完全消除了对人工步骤标注的依赖。</div>\n<p><strong>（二）隐式 PRM 训练（DPO 式目标）</strong></p>\n<p>隐式 PRM <span class=\"kb-math kb-math-inline\">\\pi_\\phi</span> 与策略模型共享初始化权重（从 <span class=\"kb-math kb-math-inline\">\\pi_{\\theta_{\\text{init}}}</span> 初始化），但独立更新。对于每个轨迹对 <span class=\"kb-math kb-math-inline\">(\\tau^+, \\tau^-)</span>，iStar 定义了一个轨迹级别的 DPO 损失，但巧妙地将其分解到步骤级别：</p>\n<div class=\"kb-math kb-math-display\">r_\\phi(a_t) = \\log \\frac{\\pi_\\phi(a_t \\mid o_{1:t}, x)}{\\pi_{\\theta_{\\text{init}}}(a_t \\mid o_{1:t}, x)}</div>\n<p>即每步的隐式奖励 <span class=\"kb-math kb-math-inline\">r_\\phi(a_t)</span> 定义为该步动作在 PRM 和初始策略下的对数概率比。这一设计的精妙之处在于：它借用了 RLHF 中 reward-from-preference 的思想，但将其迁移到了<strong>步骤粒度</strong>——轨迹偏好信号通过对比损失传播到每个时间步，PRM 自然地学到哪些步骤动作\"好于\"初始策略的基线水平。</p>\n<p>PRM 的 DPO 式训练目标为：</p>\n<div class=\"kb-math kb-math-display\">\\mathcal{L}_{\\text{PRM}}(\\phi) = -\\mathbb{E}_{(x, \\tau^+, \\tau^-)} \\left[ \\log \\sigma \\left( \\beta \\sum_{t=1}^T \\left( r_\\phi(a_t^+) - r_\\phi(a_t^-) \\right) \\right) \\right]</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">\\beta</span> 控制偏好强度。这个损失鼓励正轨迹的累积步骤奖励高于负轨迹，从而隐式地将全局轨迹偏好信号分配到局部步骤上。训练过程中 PRM 和策略交替更新：先用当前策略采样轨迹训练 PRM，再用训练后的 PRM 生成步骤奖励来指导策略更新。</p>\n<div class=\"warn-box\">⚠️ 注意：PRM 的每一步奖励 <span class=\"kb-math kb-math-inline\">r_\\phi(a_t)</span> 都是<strong>隐式</strong>的——它不是显式的标量输出头，而是通过当前 PRM 与 frozen reference（初始策略）的对数概率差计算得到。这种设计避免了额外输出头的训练不稳定问题，同时保证了奖励信号与策略表征空间的对齐。</div>\n<p><strong>（三）双层优势策略优化</strong></p>\n<p>iStar 将步骤级隐式奖励与轨迹级结果奖励结合，形成<strong>双层优势函数</strong>来指导策略梯度更新。对于每条轨迹 <span class=\"kb-math kb-math-inline\">\\tau_i</span>：</p>\n<ul>\n<li><strong>Episode-level advantage</strong> <span class=\"kb-math kb-math-inline\">A^E(\\tau_i)</span>：将结果奖励归一化（在 <span class=\"kb-math kb-math-inline\">N</span> 条轨迹内进行 z-score 标准化），提供全局信号——整条轨迹是\"好\"还是\"坏\"：</li>\n</ul>\n<div class=\"kb-math kb-math-display\">A^E(\\tau_i) = \\frac{r_o(\\tau_i) - \\mu_o}{\\sigma_o}</div>\n<ul>\n<li><strong>Step-level advantage</strong> <span class=\"kb-math kb-math-inline\">A^S(a_t^i)</span>：基于隐式 PRM 的步骤奖励，同样在组内归一化，提供局部信号——这一步动作是\"好\"还是\"坏\"：</li>\n</ul>\n<div class=\"kb-math kb-math-display\">A^S(a_t^i) = \\frac{r_\\phi(a_t^i) - \\mu_{\\phi,t}}{\\sigma_{\\phi,t}}</div>\n<p>最终的混合优势函数为：</p>\n<div class=\"kb-math kb-math-display\">A_{\\text{mix}}(a_t^i) = A^E(\\tau_i) + \\alpha \\cdot A^S(a_t^i)</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">\\alpha</span> 是混合权重超参数，控制步骤级信号的强度。这一设计巧妙地融合了两种互补信号：轨迹级优势保证了全局目标的对齐（朝高奖励方向优化），步骤级优势提供了精确的局部信用分配（告诉模型哪些具体步骤贡献了高奖励），从而同时解决了稀疏奖励和长序列信用分配两大难题。</p>\n<p>策略更新使用标准的 GRPO 目标（以 GRPO 为例，iStar 同样支持 RLOO 和 PPO）：</p>\n<div class=\"kb-math kb-math-display\">\\mathcal{L}_{\\text{policy}}(\\theta) = -\\mathbb{E} \\left[ \\min\\left( \\frac{\\pi_\\theta}{\\pi_{\\theta_{\\text{old}}}} A_{\\text{mix}}, \\operatorname{clip}\\left(\\frac{\\pi_\\theta}{\\pi_{\\theta_{\\text{old}}}}, 1-\\epsilon, 1+\\epsilon\\right) A_{\\text{mix}} \\right) \\right]</div>\n<h5>训练流程</h5>\n<p><img alt=\"iStar 框架总览\" src=\"https://ar5iv.org/html/2509.19199/assets/x1.png\" />\n<em>图：iStar 训练流程总览。LLM Agent 与环境交互生成多条轨迹，结果验证器排序后构造正负轨迹对，经由 DPO 目标训练隐式 PRM 隐式生成步骤奖励，最终通过双层优势函数指导策略更新。</em></p>\n<p>完整训练流程（参见 Algorithm 1）：</p>\n<pre><code class=\"language-python\"># Algorithm 1: Training LLM Agents with iStar (GRPO as an example)\n\nInput:  task distribution p(X), language model π_θ_init,\n        outcome reward verifier r_o, training steps M, rollout size N,\n        mixing weight α\n\nOutput: Optimized policy π_θ and PRM π_ϕ\n\n# Initialize\nπ_θ ← π_θ_init, π_θ_old ← π_θ_init, π_ϕ ← π_θ_init\n\nfor iteration = 1, ..., M do:\n    # --- Multi-step Rollouts Collection ---\n    Sample task x ~ p(X)\n    Initialize N identical environments\n\n    for t = 1, ..., T do:\n        # Sample actions from current policy for all N trajectories\n        {a_t^i ~ π_θ(o_{1:t}^i, x)}_{i=1}^N\n        Execute actions, observe {o_{t+1}^i}_{i=1}^N\n\n    # --- PRM Training ---\n    Compute outcome rewards for N trajectories: r_o(τ_{1:N})\n    Rank trajectories, construct positive-negative pairs τ^+ ≻ τ^-\n    # Forward pass π_ϕ to obtain step rewards r_ϕ(a_t) via Eq.(1)\n    # Update PRM π_ϕ using DPO-style objective (Eq.2)\n\n    # --- Policy Training (GRPO) ---\n    Compute episode-level advantages A^E(τ_i) using r_o(τ_i) (Eq.3)\n    Compute step-level advantages A^S(a_t^i) using r_ϕ(a_t^i) (Eq.4)\n    Compute mixed advantage A_mix via Eq.(5): A^E + α·A^S\n\n    # Update policy π_θ with clipped objective\n    Update π_θ using A_mix\n\n    # Sync old policy\n    π_θ_old ← π_θ\n</code></pre>\n<h5>与传统方法的区别</h5>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>维度</th>\n<th>传统方法（RLOO/GRPO）</th>\n<th>显式 PRM（Math-Shepherd 等）</th>\n<th>iStar</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>奖励信号</td>\n<td>仅轨迹级结果奖励</td>\n<td>人工标注/启发式步骤奖励</td>\n<td>隐式学习步骤奖励</td>\n</tr>\n<tr>\n<td>信用分配</td>\n<td>粗粒度（整条轨迹均分）</td>\n<td>细粒度但依赖昂贵标注</td>\n<td>细粒度且自动化</td>\n</tr>\n<tr>\n<td>步骤标注需求</td>\n<td>无</td>\n<td>需要（昂贵）</td>\n<td>无</td>\n</tr>\n<tr>\n<td>泛化性</td>\n<td>通用</td>\n<td>限于可标注步骤域</td>\n<td>通用</td>\n</tr>\n<tr>\n<td>奖励来源</td>\n<td>环境/验证器</td>\n<td>人工/规则</td>\n<td>轨迹偏好对比学习</td>\n</tr>\n</tbody>\n</table></div>\n<p>iStar 的核心创新在于<strong>用对比学习将廉价的轨迹级偏好信号自动分解为步骤级信用信息</strong>，既避免了显式 PRM 的标注瓶颈，又远超 vanilla RL 的信用分配精度。这种\"免费午餐\"式的设计使其在多个异构环境上均表现出色。</p>\n<div class=\"key-point\">💡 关键 insight：iStar 的成功源于一个优雅的设计选择——<strong>不直接预测\"这一步值多少分\"，而是隐式地比较\"这一步相对于初始策略好多少\"</strong>。通过 DPO 目标的 log-ratio 形式，PRM 自动学习到一个相对于初始策略基准的步骤奖励，避免了绝对奖励建模的困难，同时保持了与策略空间的天然对齐。</div>",
      "quiz": {
        "q": "iStar 中隐式 PRM 是如何为每个步骤生成奖励信号的？",
        "options": [
          "通过训练一个独立的标量输出头，直接预测每步的奖励值",
          "通过计算 PRM 与 frozen initial policy 在该步骤上的对数概率差（log-ratio）",
          "通过人工标注的步骤质量标签进行监督学习",
          "通过蒙特卡洛采样估计每步的期望未来回报"
        ],
        "answer": 1,
        "explain": "iStar 的隐式 PRM 不输出显式奖励值，而是通过 r_ϕ(a_t) = log(π_ϕ/π_θ_init) 的对数概率比来衡量当前步骤相对于初始策略的'改善程度'，这种方式避免了独立奖励建模的不稳定，并天然与策略表征空间对齐。"
      }
    },
    {
      "id": "agentrl",
      "num": 13,
      "name": "AgentRL",
      "fullName": "多轮多任务代理强化学习框架 (AgentRL)",
      "year": "2025.10",
      "org": "Tsinghua University",
      "parent": "agent_lightning",
      "paperUrl": "https://arxiv.org/abs/2510.04206",
      "projectUrl": "",
      "category": "online_rl",
      "motivation": "扩展到异步多任务多轮训练",
      "summary": "AgentRL 针对“多轮、多任务、在线 agent RL 难以扩展”的核心瓶颈，同时提出了全异步生成-训练基础设施与两项稳定训练算法：cross-policy sampling 用于提升多轮探索多样性，task advantage normalization 用于缓解多任务优势值分布失衡，从而把通用 agent RL 从单任务实验推进到可扩展框架。",
      "keyPoints": [
        "目标是把 agent RL 从单任务、同步 rollout 的实验配置扩展到真正的 multi-turn + multi-task online RL 框架",
        "基础设施侧采用 fully-asynchronous generation-training pipeline，把 rollout、训练与环境执行解耦，提高吞吐",
        "设计统一的 function-call API、容器化环境开发方式和 centralized controller，降低异构任务接入成本",
        "提出 cross-policy sampling：从模型池而非单一当前策略采样，缓解多轮任务中探索塌缩",
        "提出 task advantage normalization：在 task 级轨迹上做优势归一化，减少多任务 reward scale 不一致带来的训练震荡",
        "在五类 agent 任务上做多任务训练，论文报告其结果超过 GPT-5、Claude Sonnet 4、DeepSeek-R1 等强基线，并接近或匹配各任务专门训练模型",
        "框架已开源，并被用于 AutoGLM 的构建，说明它强调的是“可复用的 agent RL 工程底座 + 算法组合”"
      ],
      "detail": "<p><img alt=\"AgentRL 整体性能示意图\" src=\"https://ar5iv.labs.arxiv.org/html/2510.04206/assets/x1.png\" />\n<em>图：论文首先给出 AgentRL 相对 base model 的整体收益与 RL 训练进程，强调它是一套同时关心吞吐与稳定性的 agent RL 框架。</em></p>\n<pre><code class=\"language-python\"># AgentRL 的抽象训练循环（按论文方法概括）\npolicy_pool = [policy_t, policy_t_minus_1, reference_policy]\nwhile training:\n    task = controller.sample_task()\n    policy = sample_from_pool(policy_pool)\n    traj = rollout_worker.run(task, policy, api=&quot;function_call&quot;)\n    buffer.add(task, traj)\n    batch = trainer.sample(buffer, by_task=True)\n    rewards = compute_task_rewards(batch)\n    advantages = normalize_within_task(rewards)\n    trainer.grpo_update(batch, advantages)\n</code></pre>\n<p>AgentRL 要解决的不是某个单一 benchmark 上“再提几分”，而是 agent RL 在工程上根本跑不起来的问题。多轮 agent 任务涉及 stateful 环境、异步工具调用、任务间数据模式差异以及很高的 rollout 成本，因此论文先从系统层重构训练架构。</p>\n<p>在接口层，论文强调统一的 function-call API、容器化环境开发和 centralized controller。直觉上，这是把不同 benchmark 的环境接入方式抽象成同一协议，让异构任务共享一套 rollout 与训练基础设施。</p>\n<p>算法上最关键的是 cross-policy sampling 与 task advantage normalization。前者让训练期 rollout 保持探索多样性，后者让不同任务的优势值分布更可比，减少某些任务因为回报尺度更大而主导更新。</p>\n<p>因此 AgentRL 更像“agent 版训练操作系统”：它既提供异步系统底座，又补了两块最影响稳定性的算法部件。</p>\n<div class=\"key-point\">💡 关键：cross-policy sampling 的目的不是做推理集成，而是保持训练期探索多样性。</p>\n<p>⚠️ 注意：task advantage normalization 只缓解任务间尺度失衡，不会自动修复奖励定义错误。</div>",
      "quiz": {
        "q": "AgentRL 中 task advantage normalization 的直接作用是什么？",
        "options": [
          "把所有任务的工具调用次数压缩到相同长度",
          "降低多任务间 reward 尺度差异对梯度更新的干扰",
          "把旧策略蒸馏到新策略中",
          "在 rollout 前先过滤困难任务"
        ],
        "answer": 1,
        "explain": "该设计的目的就是让不同任务的优势值分布更可比，减少某些任务因为回报尺度更大而主导训练。"
      }
    },
    {
      "id": "sage",
      "num": 14,
      "name": "SAGE",
      "fullName": "技能增强组相对策略优化 (SAGE)",
      "year": "2025.12",
      "org": "AWS Agentic AI",
      "parent": "voyager",
      "paperUrl": "https://arxiv.org/abs/2512.17102",
      "projectUrl": "",
      "category": "self_improve",
      "motivation": "让技能生成与调用获得联合奖励",
      "summary": "SAGE 提出 Sequential Rollout 与 Skill-integrated Reward 两大机制，将技能库（Skill Library）系统性地融入 GRPO 强化学习框架，使 LLM Agent 能够在任务链中持续积累和复用可执行技能，在 AppWorld 基准上将 Scenario Goal Completion 提升 8.9% 的同时减少 59% 的生成 Token。",
      "keyPoints": [
        "统一技能生成与任务执行的格式：Agent 在交互时生成可编程函数（skill function）并调用，而非直接使用原始 API",
        "Sequential Rollout 机制：在同场景任务链上依次执行 rollout，前序任务生成的技能自动积累到技能库并供后续任务使用",
        "Skill-integrated Reward 设计：将 Outcome Reward 与 Skill Reward 加权组合，显式奖励高质量的技能生成与复用",
        "基于 GRPO 扩展：在组内相对优势计算中引入技能库条件，重要性采样项中加入技能库信息",
        "三步训练流程：Prompt-based Skill Library Agent → SFT（Claude 3.5 Sonnet V2 专家轨迹）→ SAGE（RL）",
        "在 AppWorld Test Normal 上达到 72.0% TGC、60.7% SGC（SGC 比 GRPO 高 8.9%），平均仅需 12.1 步交互、1475 Token",
        "消融实验验证：技能库使用带来显著 SGC 增益；Skill-integrated Reward 优于纯 Outcome-based 和 Chain-based Reward"
      ],
      "detail": "<h5>动机与背景</h5>\n<p>传统 LLM Agent 面临两大核心挑战：(1) RL 训练后难以在新环境中持续自我提升（self-improvement）；(2) 现有技能库方法（如 Voyager, Agent Skill Induction）依赖 Prompt 工程进行技能生成和调用，受限于基座模型的指令遵循能力。SAGE 的目标是通过 RL 训练让 Agent 学会\"何时生成技能、生成什么技能、何时调用技能\"，从而实现真正的自进化。</p>\n<h5>技能库 Agent（Skill Library Agent）</h5>\n<p>SAGE 沿用 DynaSaur 的统一格式设计：Agent 在执行任务时，首先生成一个 Python 函数（skill function），再以函数调用方式执行，而非直接拼装 API 调用序列。形式化地，给定任务 <span class=\"kb-math kb-math-inline\">q</span> 和技能库 <span class=\"kb-math kb-math-inline\">\\mathcal{M}</span>（初始可为空），Agent 先检索相关技能子集 <span class=\"kb-math kb-math-inline\">[a_1, \\dots, a_k]</span> 加入上下文，随后交替执行三类原子操作：</p>\n<ul>\n<li><strong>Skill Usage</strong>：调用已有技能 <span class=\"kb-math kb-math-inline\">a_i</span></li>\n<li><strong>Skill Generation</strong>：从当前交互轨迹中提炼新技能并存入 <span class=\"kb-math kb-math-inline\">\\mathcal{M}</span></li>\n<li><strong>Direct API Call</strong>：直接调用环境 API</li>\n</ul>\n<p>此统一格式使得任务执行和技能生成过程在 RL rollout 中保持一致，避免了传统方法中\"先完成全部任务再回头定义技能\"导致的上下文过长和训练不一致问题。</p>\n<h5>Sequential Rollout（序列化展开）</h5>\n<p>这是 SAGE 的核心创新。传统 GRPO 对每个独立任务的多个 rollout（group）并行采样，而 SAGE 将其改造为<strong>任务链上的序列化展开</strong>：</p>\n<p><img alt=\"SAGE 核心流程图\" src=\"https://ar5iv.labs.arxiv.org/html/2512.17102/assets/x1.png\" />\n<em>图 1：技能库 Agent 及 Sequential Rollout 与 Skill-integrated Reward 的整体示意图</em></p>\n<p>具体流程：对于一个包含多个相似任务的 Scenario（如 AppWorld 中同一场景的 3 个子任务），Agent 按序逐个执行。在任务 <span class=\"kb-math kb-math-inline\">q_i^k</span> 执行完毕后，生成的技能被加入技能库 <span class=\"kb-math kb-math-inline\">\\mathcal{M}_{i}^{k}</span>，并传递给下一个任务 <span class=\"kb-math kb-math-inline\">q_i^{k+1}</span>。这意味着：\n- 同一 group 内，每个任务的技能库条件 <span class=\"kb-math kb-math-inline\">\\mathcal{M}_i^k</span> 是<strong>不同的</strong>（与原始 GRPO 中所有生成来自相同 query 完全不同）\n- 第一个任务 <span class=\"kb-math kb-math-inline\">\\mathcal{M}_i^1 = \\emptyset</span>，第二个任务可使用第一个任务积累的技能</p>\n<h5>Skill-integrated Reward（技能融合奖励）</h5>\n<p>为鼓励 Agent 在任务链中生成和利用高质量技能，SAGE 设计了复合奖励：</p>\n<div class=\"kb-math kb-math-display\">R_i^k = \\lambda \\cdot R_{\\text{outcome}} + (1 - \\lambda) \\cdot R_{\\text{skill}}</div>\n<p>其中：\n- <span class=\"kb-math kb-math-inline\">R_{\\text{outcome}} \\in \\{0, 1\\}</span>：任务完成与否的二元奖励\n- <span class=\"kb-math kb-math-inline\">R_{\\text{skill}}</span>：技能质量奖励，评估生成技能的可复用性、正确性和实际被后续任务调用的频率\n- <span class=\"kb-math kb-math-inline\">\\lambda</span>：平衡系数（实验中 <span class=\"kb-math kb-math-inline\">\\lambda = 0.5</span>）</p>\n<h5>SAGE 目标函数</h5>\n<p>SAGE 的损失函数继承 GRPO 的 Clip 机制，但重要性采样中条件于技能库：</p>\n<pre><code class=\"language-python\"># SAGE 核心目标函数（简化伪代码）\nfor group_i in task_chain:\n    for task_k in [1, 2, 3]:  # 同一 scenario 的 3 个任务\n        # 获取当前技能库（前序任务积累的技能）\n        M_k = skill_library if k &gt; 1 else {}\n        # 从旧策略采样（推理阶段）\n        o_k = policy_old.generate(query, M_k)\n        # 计算技能融合奖励\n        R_k = lambda * outcome_reward(o_k) + (1-lambda) * skill_reward(o_k)\n        # 组内优势（GRPO 风格：组内均值归一化）\n        A_k = R_k - mean(R_i for i in group)\n\n    for epoch in range(K):\n        for minibatch in data:\n            ratio = πθ(o|q, M) / πθ_old(o|q, M)\n            clipped_ratio = clip(ratio, 1-ε, 1+ε)\n            loss = -min(ratio * A, clipped_ratio * A)\n            optimizer.step(loss)\n</code></pre>\n<div class=\"warn-box\">⚠️ 注意：SAGE 中的 ratio 计算比原始 GRPO 多了一项条件——技能库 <span class=\"kb-math kb-math-inline\">\\mathcal{M}</span>。同一 group 内不同任务的 <span class=\"kb-math kb-math-inline\">\\mathcal{M}_i^k</span> 各不相同，这是 SAGE 与原始 GRPO 的关键差异（论文中红色高亮标注）。</div>\n<h5>训练流程</h5>\n<ol>\n<li><strong>Skill Library Agent 构建</strong>：基于 Qwen2.5-32B-Instruct，设计专用 In-context Example 和指令，使其具备技能生成/调用能力。此时仅靠 Prompt，性能有限（TGC 30.7%）。</li>\n<li><strong>SFT 阶段</strong>：使用 Claude 3.5 Sonnet V2 作为专家在 AppWorld Train 集上生成高质量交互轨迹，进行监督微调。SFT 后 TGC 提升至 55.2%，但仍未超越 GRPO baseline（无技能库）。</li>\n<li><strong>SAGE 阶段</strong>：在 SFT 模型基础上应用 Sequential Rollout + Skill-integrated Reward 进行强化学习。最终 TGC 达 72.0%、SGC 60.7%，超越所有 baseline（包括 GRPO 的 69.2% TGC / 51.8% SGC）。</li>\n</ol>\n<h5>关键实验结果</h5>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>方法</th>\n<th>TGC (Test Normal)</th>\n<th>SGC (Test Normal)</th>\n<th>Avg. Steps</th>\n<th>Avg. Tokens</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>Qwen2.5 32B + ReAct (Training Free)</td>\n<td>39.2 ± 3.5</td>\n<td>18.6 ± 2.0</td>\n<td>-</td>\n<td>-</td>\n</tr>\n<tr>\n<td>GRPO (无技能库)</td>\n<td>69.2 ± 2.7</td>\n<td>51.8 ± 5.8</td>\n<td>16.4 ± 0.2</td>\n<td>3,613 ± 200</td>\n</tr>\n<tr>\n<td>Skill Library Agent (仅 Prompt)</td>\n<td>30.7 ± 3.1</td>\n<td>19.6 ± 1.4</td>\n<td>13.4 ± 0.4</td>\n<td>2,988 ± 73</td>\n</tr>\n<tr>\n<td><strong>+ SFT</strong></td>\n<td>55.2 ± 1.5</td>\n<td>41.7 ± 1.7</td>\n<td>11.4 ± 0.5</td>\n<td>1,340 ± 65</td>\n</tr>\n<tr>\n<td><strong>+ SAGE (Ours)</strong></td>\n<td><strong>72.0 ± 1.5</strong></td>\n<td><strong>60.7 ± 1.5</strong></td>\n<td><strong>12.1 ± 0.2</strong></td>\n<td><strong>1,475 ± 127</strong></td>\n</tr>\n</tbody>\n</table></div>\n<div class=\"key-point\">💡 关键：SAGE 不仅提升了任务完成率，还大幅降低了推理成本——相比 GRPO baseline，生成 Token 减少 59%，交互步数减少 26%。</div>\n<h5>消融实验关键发现</h5>\n<ul>\n<li><strong>技能库作用</strong>：移除技能库后，SAGE 的 SGC 从 60.7% 降至 54.8%（-5.9pp），验证技能库对跨任务迁移的核心贡献。</li>\n<li><strong>Reward 设计</strong>：Skill-integrated Reward 的 SGC（60.7%）优于 Outcome-based（55.4%）和 Chain-based（56.6%），证明显式奖励技能质量的重要性。</li>\n<li><strong>初始化方式</strong>：直接从 Base Model 启动 SAGE 仅达 25.6% SGC，远低于 SFT 初始化（60.7%），说明 SFT 对技能格式先验至关重要。</li>\n</ul>",
      "quiz": {
        "q": "SAGE 的 Sequential Rollout 机制与传统 GRPO 的 rollout 方式有何本质区别？",
        "options": [
          "SAGE 使用更大的 group size 来增加采样多样性",
          "SAGE 在任务链上顺序执行 rollout，前序任务生成的技能累积到库中并条件化后续任务的策略",
          "SAGE 对每个任务独立采样多个 trajectory，然后取平均奖励",
          "SAGE 将 rollout 过程限定在单个任务上以降低计算开销"
        ],
        "answer": 1,
        "explain": "传统 GRPO 对独立任务并行采样 group 内多个 rollout（共享相同 query），而 Sequential Rollout 在 3 个相似任务组成的 chain 上顺序执行，前序任务积累的技能库条件化后续任务，使 group 内各 rollout 来自不同的技能库状态。"
      }
    },
    {
      "id": "ssr",
      "num": 15,
      "name": "SSR",
      "fullName": "自博弈软件工程强化学习 (Self-play SWE-RL)",
      "year": "2025.12",
      "org": "Meta FAIR",
      "parent": "sage",
      "paperUrl": "https://arxiv.org/abs/2512.18552",
      "projectUrl": "",
      "category": "self_improve",
      "motivation": "用自博弈缺陷注入驱动软件代理进化",
      "summary": "SSR 提出了一种自博弈强化学习框架，通过让 LLM 自动向代码仓库注入真实缺陷、再训练 SWE-agent 修复这些缺陷，形成\"漏洞生成-修复验证\"的闭环自我进化，无需人工标注即可大幅提升代码修复能力。",
      "keyPoints": [
        "自博弈（Self-play）双角色框架：Defect Generator 生成缺陷，Solver Agent 尝试修复",
        "自动化缺陷注入流程：基于真实 GitHub issue 描述，让 LLM 向仓库代码中注入可被验证的 bug",
        "强化学习训练 Solver：将代码修复建模为多步决策过程，利用修复是否通过测试作为奖励信号",
        "课程学习机制：Generator 根据 Solver 当前能力动态调整缺陷难度，实现渐进式能力提升",
        "完全自动化：无需人工编写 bug 或标注修复轨迹，闭环自我进化",
        "在 SWE-bench 等多个真实软件工程基准上取得显著提升"
      ],
      "detail": "<p><img alt=\"SSR 自博弈框架示意图\" src=\"https://arxiv.org/html/2512.18552v3/x1.png\" />\n<em>图：SSR 的双角色自博弈训练框架 — 左半部分为缺陷生成器(Generator)，右半部分为求解器(Solver)，二者通过\"缺陷注入-修复验证\"闭环交替进化</em></p>\n<h5>1. 动机与背景</h5>\n<p>传统 SWE-agent（如 SWE-agent、Devin 等）面临的核心瓶颈是<strong>高质量训练数据匮乏</strong>。人工构造代码修复轨迹成本极高（需要资深工程师花费数小时标注一次完整的 bug 修复过程），导致训练数据规模始终受限。</p>\n<p>与此同时，现有的代码修复训练数据多为静态数据集（如 PR 历史、GitHub Issues），模型难以获得<strong>与真实开发场景一致的多样性和难度梯度</strong>。SSR 的核心洞察在于：如果能让模型自己生成可控难度的代码缺陷，再用另一个（或同一个）模型去修复，就能形成一个不需要外部标注的自监督训练循环——这就是<strong>自博弈 (Self-play)</strong> 在软件工程中的自然延伸。</p>\n<div class=\"key-point\">💡 关键：SSR 将 AlphaGo Zero 式的自我对弈思想迁移到代码领域，把\"下棋\"变成了\"造 bug 与修 bug\"的博弈。</div>\n<h5>2. 核心机制：双角色自博弈</h5>\n<p>SSR 框架包含两个核心角色：</p>\n<p><strong>角色 A — Defect Generator（缺陷生成器）</strong><br />\n给定一个真实代码仓库和一个自然语言描述（如 GitHub issue），Generator 的目标是在仓库中注入一个<strong>可被测试用例捕获、但需要非平凡推理才能修复</strong>的缺陷。具体来说：\n- 输入：仓库代码 + issue 描述（如\"实现用户登录超时处理\"）\n- 输出：一个 diff patch，其中包含精心构造的 bug（如错误的边界条件、缺失的异常处理、逻辑反转等）\n- 约束：注入的缺陷必须可被仓库现有的（或自动生成的）测试用例检测到，确保 Solver 有可验证的修复目标</p>\n<p><strong>角色 B — Solver Agent（求解器）</strong><br />\nSolver 接收被注入缺陷后的代码仓库，通过多步交互（读取文件、搜索代码、编辑、运行测试）尝试定位并修复缺陷：\n- 动作空间：文件浏览、代码搜索、行级编辑、测试执行\n- 奖励信号：修复后测试通过率的变化 — 通过的测试越多，奖励越高\n- 策略优化：使用 PPO 类强化学习算法，最大化累计奖励</p>\n<h5>3. 训练流程伪代码</h5>\n<pre><code class=\"language-python\"># SSR 自博弈训练主循环\nfor iteration in range(N_iterations):\n    # 阶段 1：缺陷生成\n    repos = sample_code_repos(D_repo)          # 采样真实仓库\n    issues = get_issues(repos)                  # 获取对应 issue 描述\n    for repo, issue in zip(repos, issues):\n        bug_patch = Generator.generate(repo, issue)    # LLM 注入缺陷\n        buggy_repo = apply_patch(repo, bug_patch)      # 生成有缺陷仓库\n        D_buggy.append((buggy_repo, issue, bug_patch))\n\n    # 阶段 2：求解器训练\n    for buggy_repo, issue, bug_patch in D_buggy:\n        # 多步决策过程\n        state = initialize(buggy_repo, issue)\n        for step in range(max_steps):\n            action = Solver.policy(state)        # 模型选择操作\n            next_state, reward, done = env.step(action)  # 执行并获取反馈\n            trajectory_buffer.add(state, action, reward)\n            if done: break\n        # PPO 更新\n        Solver.update(trajectory_buffer)\n\n    # 阶段 3：课程调整\n    Generator.update_difficulty(Solver.win_rate)  # 根据 Solver 能力调整难度\n</code></pre>\n<h5>4. 缺陷难度控制与课程学习</h5>\n<p>这是 SSR 区别于简单数据增强的关键设计。Generator 不只是随机生成 bug，而是受<strong>难度校准</strong>约束：</p>\n<ul>\n<li><strong>难度度量</strong>：定义 <span class=\"kb-math kb-math-inline\">d = 1 - p_{\\text{solve}}</span>，即 Solver 的修复成功率越低，缺陷越难</li>\n<li><strong>课程调度</strong>：Generator 维持一个难度分布 <span class=\"kb-math kb-math-inline\">\\mathcal{D}(d)</span>，初始偏简单（高修复率），随着训练推进逐步向高难度偏移</li>\n<li><strong>对抗平衡</strong>：当 Solver 变得太强（修复率 &gt; 阈值 <span class=\"kb-math kb-math-inline\">\\theta_h</span>），Generator 被鼓励生成更隐蔽的缺陷（如跨文件的语义 bug、需要理解业务逻辑的深层错误）；当 Solver 太弱（修复率 &lt; <span class=\"kb-math kb-math-inline\">\\theta_l</span>），则降低缺陷复杂度</li>\n</ul>\n<div class=\"warn-box\">⚠️ 注意：这与标准的 GAN 训练不同——SSR 中的 Generator 和 Solver 不是直接对抗的，而是通过<strong>难度调度机制</strong>间接协调，避免了模式坍塌和不稳定训练。</div>\n<h5>5. 与传统方法的对比</h5>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>维度</th>\n<th>传统 SWE-agent 训练</th>\n<th>SSR</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>数据来源</td>\n<td>人工标注 / PR 历史</td>\n<td>Generator 自动生成</td>\n</tr>\n<tr>\n<td>难度控制</td>\n<td>固定、不可控</td>\n<td>动态课程学习</td>\n</tr>\n<tr>\n<td>可扩展性</td>\n<td>线性增长于标注投入</td>\n<td>自博弈自动扩展</td>\n</tr>\n<tr>\n<td>多样性</td>\n<td>受限于历史数据</td>\n<td>Generator 可创造新缺陷模式</td>\n</tr>\n<tr>\n<td>训练信号</td>\n<td>稀疏（仅最终结果）</td>\n<td>测试驱动的密集奖励</td>\n</tr>\n</tbody>\n</table></div>\n<h5>6. 关键公式</h5>\n<p><strong>Solver 的强化学习目标</strong>：\n<div class=\"kb-math kb-math-display\">\\mathcal{L}_{\\text{RL}} = \\mathbb{E}_{(s,a) \\sim \\pi_\\theta} \\left[ \\min\\left( r_t(\\theta) \\hat{A}_t,\\ \\text{clip}(r_t(\\theta), 1-\\epsilon, 1+\\epsilon) \\hat{A}_t \\right) \\right]</div></p>\n<p>其中 <span class=\"kb-math kb-math-inline\">r_t(\\theta) = \\frac{\\pi_\\theta(a_t|s_t)}{\\pi_{\\theta_{\\text{old}}}(a_t|s_t)}</span> 为新旧策略的概率比，<span class=\"kb-math kb-math-inline\">\\hat{A}_t</span> 为基于测试结果的广义优势估计（GAE），裁剪参数 <span class=\"kb-math kb-math-inline\">\\epsilon</span> 防止策略更新过激。</p>\n<p><strong>Generator 的难度校准损失</strong>：\n<div class=\"kb-math kb-math-display\">\\mathcal{L}_{\\text{gen}} = -\\mathbb{E}_{x \\sim \\mathcal{D}_{\\text{repo}}} \\left[ \\mathbb{1}[p_{\\text{solve}} &lt; \\theta_h] \\cdot \\log P_{\\text{gen}}(\\text{hard\\_bug} | x) + \\mathbb{1}[p_{\\text{solve}} &gt; \\theta_l] \\cdot \\log P_{\\text{gen}}(\\text{easy\\_bug} | x) \\right]</div></p>\n<p>直观理解：当 Solver 成功率低于高阈值时，Generator 偏向生成简单 bug（easy_bug）；当 Solver 太强时，偏向生成困难 bug（hard_bug），从而实现动态平衡。</p>\n<div class=\"key-point\">💡 关键洞察：SSR 的自博弈本质上创造了一个<strong>无限的数据飞轮</strong>——Solver 越强，Generator 被逼生成更难的缺陷；更难的缺陷反过来又训练出更强的 Solver。这个过程完全自动化，不依赖任何外部标注。</div>",
      "quiz": {
        "q": "SSR 框架中，Generator（缺陷生成器）的难度校准机制的主要目的是什么？",
        "options": [
          "让 Generator 和 Solver 直接对抗，形成 GAN 式的博弈训练",
          "根据 Solver 当前修复能力动态调整生成缺陷的难度，避免过易或过难导致训练停滞",
          "确保 Generator 生成的每个缺陷都能被测试用例100%捕获",
          "让 Generator 学习模仿人类程序员常犯的错误模式"
        ],
        "answer": 1,
        "explain": "难度校准机制根据 Solver 的修复成功率动态调整缺陷复杂度——Solver 太强则生成更难缺陷，太弱则降低难度，维持训练始终处于'最近发展区'，避免两极化导致的训练停滞或无效。"
      }
    },
    {
      "id": "dynaweb",
      "num": 16,
      "name": "DynaWeb",
      "fullName": "基于世界模型的网页代理强化学习 (DynaWeb)",
      "year": "2026.01",
      "org": "Shanghai Jiao Tong University",
      "parent": "webagent_r1",
      "paperUrl": "https://arxiv.org/abs/2601.22149",
      "projectUrl": "",
      "category": "frontier",
      "motivation": "在网页世界模型中做想象式RL",
      "summary": "DynaWeb 提出了一个基于模型的强化学习框架，通过训练 Web World Model (WWM) 来模拟网页状态转移，生成想象轨迹（imagined rollouts）用于策略优化，使 web agent 无需在线真实交互即可学习，大幅减少训练成本和风险。",
      "keyPoints": [
        "训练 Web World Model (WWM) 学习网页状态变化描述 <span class=\"kb-math kb-math-inline\">\\Delta(o_t, o_{t+1})</span>，而非完整预测下一状态，解决了网页状态高度相似的稀疏训练信号问题",
        "采用 Dyna 框架（Sutton 1991）思路：策略与 WWM 交互生成想象轨迹，免除真实 web 交互",
        "引入任务级奖励信号通过模型自我评估（model-based self-assessment）获取，实现无需人工标注的奖励",
        "混合真实专家轨迹（50%）与想象轨迹（50%）进行训练，真实数据作为关键正则化项稳定学习",
        "使用 GSPO (Group Sequence Policy Optimization) 进行序列级策略优化，将重要性采样从 token 级提升到 trajectory 级",
        "在 WebArena 和 WebVoyager 上显著优于离线 RL (WebRL)、推理时前瞻 (ITL)、SFT 等基线方法",
        "Dream length 分析显示 4-5 步想象深度最优，40% 真实数据即可获得最佳性能收益",
        "WWM 基于 GPT-oss-120b 推理模型训练，预测推理链 <span class=\"kb-math kb-math-inline\">r</span> 和状态变化描述 <span class=\"kb-math kb-math-inline\">\\Delta</span>"
      ],
      "detail": "<h5>架构总览</h5>\n<p><img alt=\"DynaWeb 框架架构图\" src=\"https://arxiv.org/html/2601.22149v1/figures/dynaweb.png\" />\n<em>图：DynaWeb 框架总览。左侧：Web World Model 从真实轨迹中学习状态转移预测。右侧：Agent 策略与 WWM 交互生成想象轨迹，结合 GSPO 进行策略优化。</em></p>\n<h5>算法伪代码</h5>\n<pre><code class=\"language-python\"># DynaWeb 训练流程\nfor episode in range(num_episodes):\n    # 采样任务 q 和初始观测 o1\n    q, o1 = sample_task()\n\n    # 初始化缓冲区\n    trajectories = []\n\n    # 混合采样：50% 真实专家轨迹 + 50% 想象轨迹\n    for i in range(G):  # group size\n        if random() &lt; 0.5:\n            # 真实专家轨迹（从 SFT 数据集采样）\n            tau = sample_expert_trajectory(q)\n        else:\n            # 想象轨迹：策略与 WWM 交互\n            o_hat = o1\n            tau = [(o_hat, None, None)]  # (obs, thought, action)\n            for t in range(max_dream_length):\n                # Step 1: 策略生成推理和动作\n                h_t, a_t ~ π_θ(· | o_hat, history, q)\n                # Step 2: WWM 预测状态变化和下一状态\n                r_t, Δ_t ~ p_ϕ(· | o_hat, a_t, q)\n                o_hat = apply_delta(o_hat, Δ_t)  # 将Δ应用到当前状态\n                tau.append((o_hat, h_t, a_t))\n                if is_terminal(o_hat, a_t):\n                    break\n            # Step 3: 模型自我评估获得奖励\n            r_hat = assess_completion(tau, q)  # {0, 1}\n\n        trajectories.append((tau, r_hat))\n\n    # GSPO 优化\n    for each tau in trajectories:\n        y = serialize(tau)  # 将推理链和动作序列化\n        s_i = (π_θ(y|q,o1) / π_θ_old(y|q,o1)) ^ (1/|y|)  # 序列级比率\n        A_i = r_hat - baseline  # 轨迹级优势\n        loss = -min(s_i * A_i, clip(s_i, 1-ε, 1+ε) * A_i)\n\n    θ_old = θ\n    θ = θ - lr * ∇loss\n</code></pre>\n<h5>动机与背景</h5>\n<p>训练高质量 web agent 的核心瓶颈在于<strong>在线交互成本极高</strong>且<strong>风险不可控</strong>：在真实网页上执行操作消耗大量时间，可能触发不可逆操作（如删除、支付），且网站结构频繁变化。SFT 方法依赖离线专家标注，覆盖范围有限；离线 RL 方法需要大量在线探索数据。DynaWeb 借鉴经典 Dyna 架构，用学习到的 Web World Model 替代真实环境，在\"想象\"中进行策略优化，从根本上解决了这一问题。</p>\n<h5>核心机制详解</h5>\n<p><strong>1. Web World Model (WWM): 状态变化建模</strong></p>\n<p>传统世界模型直接预测下一观测 <span class=\"kb-math kb-math-inline\">o_{t+1}</span>，但在网页环境中存在严重问题：网页状态转移通常仅修改小部分页面元素，<span class=\"kb-math kb-math-inline\">o_t</span> 和 <span class=\"kb-math kb-math-inline\">o_{t+1}</span> 高度相似，直接预测完整文本观测几乎无信息增益。DynaWeb 的核心创新是将预测任务<strong>分解为两步</strong>：</p>\n<ul>\n<li>\n<p><strong>子任务1（训练）</strong>：给定当前状态 <span class=\"kb-math kb-math-inline\">o_t</span> 和动作 <span class=\"kb-math kb-math-inline\">a_t</span>，WWM 预测自然语言状态变化描述 <span class=\"kb-math kb-math-inline\">\\Delta(o_t, o_{t+1})</span> 和推理链 <span class=\"kb-math kb-math-inline\">r</span>：\n  <div class=\"kb-math kb-math-display\">\\mathcal{L}_{\\phi} = \\sum_{(I,o_t,a_t,r,\\Delta)} -\\log p_{\\phi}(r, \\Delta \\mid I, o_t, a_t)</div></p>\n</li>\n<li>\n<p><strong>子任务2（推理）</strong>：WWM 利用指令遵循能力，将预测的 <span class=\"kb-math kb-math-inline\">\\Delta</span> 应用到当前状态 <span class=\"kb-math kb-math-inline\">o_t</span> 生成 <span class=\"kb-math kb-math-inline\">\\hat{o}_{t+1}</span>。</p>\n</li>\n</ul>\n<p>这种设计确保训练目标（状态变化）有高信息密度，同时利用 LLM 的推理能力实现精确的状态转移。</p>\n<div class=\"key-point\">💡 <strong>关键</strong>：WWM 基于 GPT-oss-120b 训练，数据来源于 NNetNav 数据集，使用 GPT-oss-120b 自身为每条转移自动标注 <span class=\"kb-math kb-math-inline\">r</span> 和 <span class=\"kb-math kb-math-inline\">\\Delta</span>（知识蒸馏式）。WWM 被训练为\"推理模型\"，需先生成推理链再输出状态变化。</div>\n<p><strong>2. DynaWeb: 基于想象的策略优化</strong></p>\n<p>策略 <span class=\"kb-math kb-math-inline\">\\pi_{\\theta}</span> 与 WWM 交互构建想象轨迹：\n<div class=\"kb-math kb-math-display\">a_t \\sim \\pi_{\\theta}(\\cdot \\mid o_{1:t}, h_{1:t-1}, a_{1:t-1}, q)</div>\n<div class=\"kb-math kb-math-display\">\\hat{o}_{t+1} \\sim p_{\\phi}(\\cdot \\mid \\hat{o}_t, a_t, q), \\quad \\hat{o}_1 = o_1</div></p>\n<p>轨迹终止后，通过模型自我评估获得任务级奖励 <span class=\"kb-math kb-math-inline\">\\hat{r}(\\hat{\\tau}, q) \\in \\{0, 1\\}</span>，判断任务是否完成。训练中混合 50% 真实专家轨迹和 50% 想象轨迹，真实轨迹作为\"锚点\"稳定学习。</p>\n<div class=\"warn-box\">⚠️ <strong>注意</strong>：纯粹基于想象的训练容易因 WWM 幻觉而退化。40% 真实数据的引入可实现性能大幅超越 SFT 基线，更多真实数据（60%+）则收益递减。</div>\n<p><strong>3. GSPO: 序列级策略优化</strong></p>\n<p>传统 PPO/clipped objective 在 token 级别进行重要性采样，导致长序列中出现极端比率。GSPO 将重要性采样提升到<strong>轨迹级别</strong>：</p>\n<div class=\"kb-math kb-math-display\">s^i(\\theta) = \\left(\\frac{\\pi_\\theta(y^i \\mid q, o_1)}{\\pi_{\\theta_{\\text{old}}}(y^i \\mid q, o_1)}\\right)^{1/|y^i|} = \\exp\\left(\\frac{1}{|y^i|}\\sum_{k=1}^{|y^i|} \\log r_k^i(\\theta)\\right)</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">y^i</span> 是整个轨迹的 token 序列，<span class=\"kb-math kb-math-inline\">s^i</span> 为几何平均比率。最终优化目标：</p>\n<div class=\"kb-math kb-math-display\">\\mathcal{J}_{\\text{GSPO}}(\\theta) = \\mathbb{E}\\left[\\frac{1}{G}\\sum_{i=1}^{G} \\min\\left(s^i(\\theta) \\hat{A}^i, \\operatorname{clip}(s^i(\\theta), 1-\\varepsilon, 1+\\varepsilon) \\hat{A}^i\\right)\\right]</div>\n<p>几何平均天然抑制极端值，使长轨迹训练更稳定。</p>\n<h5>训练流程</h5>\n<ol>\n<li><strong>WWM 训练</strong>：从 NNetNav 数据集中清洗有效转移，用 GPT-oss-120b 标注 <span class=\"kb-math kb-math-inline\">r, \\Delta</span>，微调 WWM 预测推理链 + 状态变化</li>\n<li><strong>DynaWeb RL 训练</strong>：</li>\n<li>以 NNetNav SFT 模型初始化 <span class=\"kb-math kb-math-inline\">\\pi_\\theta</span></li>\n<li>每轮采样任务 <span class=\"kb-math kb-math-inline\">q</span>，混合真实/想象轨迹</li>\n<li>想象轨迹限制最大 5 步（平衡深度与幻觉），初始状态随机采样自 NNetNav 数据集各阶段</li>\n<li>用 GSPO 优化 <span class=\"kb-math kb-math-inline\">\\pi_\\theta</span></li>\n</ol>\n<h5>与传统方法的区别</h5>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>方法</th>\n<th>训练环境</th>\n<th>奖励信号</th>\n<th>交互成本</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>SFT (NNetNav, Go-Browse)</td>\n<td>离线专家数据</td>\n<td>无（行为克隆）</td>\n<td>低</td>\n</tr>\n<tr>\n<td>Offline RL (WebRL)</td>\n<td>在线探索→离线优化</td>\n<td>训练奖励模型</td>\n<td>高</td>\n</tr>\n<tr>\n<td>ITL</td>\n<td>推理时 WWM 前瞻</td>\n<td>无训练，仅推理</td>\n<td>在线</td>\n</tr>\n<tr>\n<td><strong>DynaWeb</strong></td>\n<td><strong>WWM 想象 + 少量真实</strong></td>\n<td><strong>模型自我评估</strong></td>\n<td><strong>极低</strong></td>\n</tr>\n</tbody>\n</table></div>\n<p>DynaWeb 是唯一将 WWM 用于<strong>训练阶段 on-policy 优化</strong>的方法（ITL 仅在推理时使用），真正实现了\"零在线交互\"的训练。</p>",
      "quiz": {
        "q": "DynaWeb 的 Web World Model 为何不直接预测完整下一观测 o_{t+1}，而是预测状态变化描述 Δ？",
        "options": [
          "因为直接预测 o_{t+1} 需要的模型参数量过大",
          "因为网页状态转移中 o_t 和 o_{t+1} 高度相似，预测完整状态信息增益低",
          "因为状态变化描述 Δ 可以用更少的 token 表示",
          "因为直接预测 o_{t+1} 会导致梯度消失"
        ],
        "answer": 1,
        "explain": "网页交互通常只修改页面的一小部分元素，o_t 和 o_{t+1} 高度相似，直接预测完整文本观测几乎没有信息增益；预测状态变化 Δ 使训练目标具有高信息密度。"
      }
    },
    {
      "id": "agent_rrm",
      "num": 17,
      "name": "Agent-RRM",
      "fullName": "代理推理奖励模型 (Agent-RRM)",
      "year": "2026.01",
      "org": "Meituan/CUHK",
      "parent": "istar",
      "paperUrl": "https://arxiv.org/abs/2601.22154",
      "projectUrl": "",
      "category": "reward",
      "motivation": "以推理轨迹批评提供结构化奖励",
      "summary": "Agent-RRM 将 agent 轨迹的过程监督从“只看最终成败”升级为“显式推理痕迹 + 面向修正的批评 + 整体质量分数”的三层反馈，并系统比较了把这类反馈用于推理时修正、训练时奖励、以及统一联合优化三种路径，最终的 Reagent-U 在 GAIA 和 WebWalkerQA 上都取得了显著增益。",
      "keyPoints": [
        "提出 Agent-RRM：对整条 agent 轨迹同时产出 reasoning trace、focused critique、overall score 三类结构化反馈",
        "设计三种集成策略：Reagent-C 用文本批评做推理期 refinement，Reagent-R 用模型奖励补充规则奖励，Reagent-U 同时融合文本批评与标量奖励",
        "训练依赖四类专门构造的数据与两阶段流程，既训练 agent policy，也训练 reasoning reward model",
        "支持搜索、网页浏览、代码执行、文件/图像/音频处理等多工具 agent 场景，而不是只做纯文本打分",
        "目标不是替代 verifiable reward，而是为长轨迹中的中间推理质量提供更细粒度的过程信号",
        "论文在 12 个 benchmark 上做系统评测，报告 Reagent-U 在 GAIA 达到 43.7%，在 WebWalkerQA 达到 46.2%",
        "额外分析了统一奖励中 λ 的权衡作用：它决定规则奖励与 Agent-RRM 评分在 RL 更新中的相对占比"
      ],
      "detail": "<p><img alt=\"Agent-RRM 与 Reagent 训练框架\" src=\"https://arxiv.org/html/2601.22154v2/x2.png\" />\n<em>图：论文将 agent、工具环境与 Agent-RRM 连接起来，比较 Reagent-C、Reagent-R、Reagent-U 三种反馈接入方式。</em></p>\n<pre><code class=\"language-python\"># Reagent-U 的核心逻辑（按论文方法概括）\nfor query in training_set:\n    trajectories = [agent.rollout(query, tools) for _ in range(G)]\n    rule_rewards = [verifier(traj) for traj in trajectories]\n    rrms = [agent_rrm.evaluate(query, traj) for traj in trajectories]\n    critiques = [r.critique for r in rrms]\n    scores = [r.score for r in rrms]\n    rewards = [(1 - lam) * rr + lam * rs for rr, rs in zip(rule_rewards, scores)]\n    refined = [agent.refine(traj, critique) for traj, critique in zip(trajectories, critiques)]\n    agent.grpo_update(refined, rewards)\n</code></pre>\n<p>论文的起点非常明确：现有 Agentic RL 往往只在轨迹结束后给一个 outcome reward，这对长链路、多工具、多跳推理极其粗糙。一个只在最后一步答错的轨迹，与前面就一路错误的轨迹会得到相同的失败信号，导致中间高质量 reasoning 无法被识别，也不利于 agent 学会“哪一步推理已经正确、哪一步才是问题源头”。</p>\n<p>Agent-RRM 的核心设计，是让 reward model 不只吐一个分数，而是先“显式想一遍”，再给出可执行的批评文本，最后再输出可用于 RL 的整体标量。这样文字批评负责指出逻辑瑕疵，分数负责进入优化回路，两者互补。</p>\n<p>在此基础上，作者比较了三种接法。Reagent-C 更像 inference-time refinement；Reagent-R 把 score 直接并入训练奖励；Reagent-U 则把文本与分数一起利用，既用于局部修正，也用于全局优化。论文的主要结论正是：统一式接入优于单一路径。</p>\n<p>从训练实现看，这不是简单地把 step reward 变密，而是通过 reasoning-aware evaluator 对整条轨迹做带解释的过程审查，从而在不完全依赖人工逐步标注的情况下为 agent 提供更高信息量的训练信号。</p>\n<div class=\"key-point\">💡 关键：Agent-RRM 的价值不在于“再造一个更强的打分器”，而在于把自然语言批评与数值奖励统一进同一条训练链路。</p>\n<p>⚠️ 注意：λ 过大时会让模型过分迎合 reward model，过小时又退回纯 outcome reward，二者需要平衡。</div>",
      "quiz": {
        "q": "Reagent-U 相比 Reagent-C 与 Reagent-R 的关键区别是什么？",
        "options": [
          "只使用文本批评做推理期修正",
          "只使用标量奖励替代规则奖励",
          "同时融合文本批评与标量 reasoning reward 做统一优化",
          "完全移除规则奖励，只保留人类偏好对比"
        ],
        "answer": 2,
        "explain": "Reagent-U 的核心就是把 critique 与 score 两种反馈一起接入 agent 训练，而不是只选其一。"
      }
    },
    {
      "id": "vpr",
      "num": 18,
      "name": "VPR",
      "fullName": "可验证过程奖励 (VPR)",
      "year": "2026.05",
      "org": "Tsinghua University",
      "parent": "istar",
      "paperUrl": "https://arxiv.org/abs/2605.10325",
      "projectUrl": "",
      "category": "reward",
      "motivation": "把可验证中间步骤转成稠密奖励",
      "summary": "VPR 提出了一个通用框架，将任务特定的可验证结构（MCTS 求解器、约束求解器、概率推断引擎）转化为密集的中间步过程奖励信号，替代传统稀疏结果奖励，显著改善长程多轮推理的信用分配，并在训练环境之外的通用推理和智能体任务中展现出优异的零样本迁移能力。",
      "keyPoints": [
        "提出 <strong>VPR (Verifiable Process Rewards)</strong> 框架：用策略无关的 Oracle 验证器评估每个中间动作的后验概率 \\<span class=\"kb-math kb-math-inline\">P(a_t \\\\mid \\\\tau_{t-1}, \\\\text{outcome}=1)\\</span> 作为过程奖励",
        "在 <strong>3 个可验证多轮环境</strong>中实例化：Tic-Tac-Toe（MCTS ≥10,000 次模拟）、Sudoku（约束求解器）、Minesweeper（概率推断引擎）",
        "过程奖励定义为：对每个中间动作 \\<span class=\"kb-math kb-math-inline\">a_t\\</span>，Oracle 计算在给定前序 \\<span class=\"kb-math kb-math-inline\">\\\\tau_{t-1}\\</span> 且最终成功条件下采取该动作的后验概率",
        "训练使用 <strong>turn-level GRPO</strong>：将一个完整轨迹按轮次分组，每轮多个采样动作构成组内对比",
        "<strong>理论分析（3 个命题）</strong>：(1) VPR 梯度信号在 Oracle 噪声下是有偏估计，但期望上鼓励成功动作；(2) 梯度偏差随 Oracle 平均误差 \\<span class=\"kb-math kb-math-inline\">\\\\bar{\\\\epsilon}\\</span> 线性缩放；(3) VPR 过程奖励信号量级远超稀疏奖励，驱动有效学习",
        "基座模型为 <strong>Qwen3-4B</strong> (thinking mode)，训练 100 update steps，每组 128 条轨迹",
        "VPR 在三个训练环境的所有指标（胜率/成功率/完成率）上一致优于 <strong>OR</strong>（稀疏结果奖励）和 <strong>MC-PR</strong>（100 次 Monte Carlo rollout 过程奖励）两种基线",
        "零样本迁移评估覆盖 <strong>7 个通用推理基准</strong>（GSM8K、MATH-500、AIME24/25、GPQA-Diamond、BBH、MMLU-Pro）及 <strong>2 个智能体任务</strong>（ALFWorld、WebShop），VPR 在所有训练环境下均超越 Base 模型",
        "<strong>Oracle 质量消融实验</strong>：弱 Oracle（MCTS N=100）不仅损害域内性能，还系统性地降低全部下游推理基准，表明过程监督的可靠性比稠密性更为关键",
        "Minesweeper 训练的 VPR 在 ALFWorld（部分可观测文本规划）上表现最佳，Sudoku 训练的 VPR 在 GPQA-Diamond（约束排除推理）上增益最大"
      ],
      "detail": "<p><img alt=\"VPR 框架示意图\" src=\"https://arxiv.org/html/2605.10325v1/x1.png\" />\n<em>图：VPR 框架概览——任务特定的 Oracle 验证器为多轮轨迹的每个中间动作提供密集的后验过程奖励，替代传统稀疏结果奖励</em></p>\n<h5>动机与背景</h5>\n<p>多轮智能体推理面临的核心挑战是<strong>信用分配</strong>（credit assignment）：在长达数十步的交互中，最终失败往往只能获得稀疏的二元结果信号（成功=1 / 失败=0），导致模型难以识别\"哪一步决策出了问题\"。现有的解决方案存在明显局限：</p>\n<ul>\n<li><strong>结果奖励（OR / RLVR）</strong>：仅在轨迹结束时提供反馈，对中间步骤无监督，长程推理中梯度信号稀释严重</li>\n<li><strong>人工标注 PRM</strong>：成本高、不一致，且易被 reward hacking</li>\n<li><strong>Monte Carlo PRM</strong>：用策略模型自身做 rollout 估计中间值，计算量大且信号噪声高，在严格约束（如 Sudoku）中甚至不如 OR</li>\n</ul>\n<p>VPR 的核心洞察是：<strong>许多交互环境的结构本身就是可验证的</strong>——游戏有完美信息的求解器，逻辑题有约束传播引擎，概率推理有贝叶斯检验——这些策略无关的 Oracle 可以直接判定\"在当前位置，哪些动作是通往成功的\"，从而为每一步提供精确的过程级监督。</p>\n<h5>核心机制</h5>\n<p><strong>1. 后验过程奖励定义</strong></p>\n<p>给定任务特定的 Oracle 验证器，VPR 将过程奖励定义为：</p>\n<div class=\"kb-math kb-math-display\">R_{\\\\text{VPR}}(a_t \\\\mid \\\\tau_{t-1}) = P_{\\\\text{oracle}}\\\\left(a_t \\\\mid \\\\tau_{t-1}, \\\\text{outcome}=1\\\\right)</div>\n<p>即在给定前序轨迹 \\<span class=\"kb-math kb-math-inline\">\\\\tau_{t-1}\\</span> 且假设最终结果为成功的条件下，Oracle 评估采取动作 \\<span class=\"kb-math kb-math-inline\">a_t\\</span> 的后验概率。这一定义具有三个关键性质：</p>\n<ul>\n<li><strong>策略无关</strong>：Oracle 不依赖当前策略模型，避免了 rollout-based PRM 中的策略偏差</li>\n<li><strong>密集且精确</strong>：每一步都获得 0-1 之间的连续信号，且信号来自真实的环境结构验证</li>\n<li><strong>信用分配自然</strong>：成功路径上的动作获得高奖励（接近 1），失败路径上的动作获得低奖励（接近 0），危险动作获得即时负反馈</li>\n</ul>\n<div class=\"key-point\">💡 <strong>关键</strong>：后验概率 \\<span class=\"kb-math kb-math-inline\">P(a_t \\\\mid \\\\tau_{t-1}, \\\\text{outcome}=1)\\</span> 的计算方式决定了 Oracle 的质量。VPR 的消融实验表明，这一质量必须足够高（MCTS ≥1000 次模拟），否则会适得其反。</div>\n<p><strong>2. 三种 Oracle 实例化</strong></p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>环境</th>\n<th>Oracle 类型</th>\n<th>过程奖励计算</th>\n<th>挑战</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td><strong>Tic-Tac-Toe</strong></td>\n<td>MCTS 搜索树</td>\n<td>从当前棋局 \\<span class=\"kb-math kb-math-inline\">s_t\\</span> 出发，运行 N=10,000 次 MCTS 模拟，统计棋步 \\<span class=\"kb-math kb-math-inline\">a_t\\</span> 在成功路径中被选中的后验频率</td>\n<td>必须同时学习先手和后手的博弈策略；局部贪心会导致长程失利</td>\n</tr>\n<tr>\n<td><strong>Sudoku</strong></td>\n<td>约束求解器</td>\n<td>对候选数字执行约束传播，若填数后剩余空格仍存在唯一解则 \\<span class=\"kb-math kb-math-inline\">a_t\\</span> 获得高概率；若导致矛盾则概率为 0</td>\n<td>单步合法≠全局可解；局部看似合理的填数可能导致后续无解</td>\n</tr>\n<tr>\n<td><strong>Minesweeper</strong></td>\n<td>概率推断引擎</td>\n<td>基于已知格子的数字线索，用约束满足计算每个未知格是雷的后验概率；安全揭开获得高奖励，踩雷获得 0 奖励</td>\n<td>部分可观测；需要在不确定下进行信息收集推理</td>\n</tr>\n</tbody>\n</table></div>\n<p><strong>3. Turn-Level GRPO 训练</strong></p>\n<p>VPR 的损失函数基于 GRPO（Group Relative Policy Optimization），但做了 turn-level 改造：对于每个轨迹的每一轮 \\<span class=\"kb-math kb-math-inline\">t\\</span>，从当前状态 \\<span class=\"kb-math kb-math-inline\">s_t\\</span> 采样 \\<span class=\"kb-math kb-math-inline\">G\\</span> 个候选动作，每个候选动作通过 Oracle 获得过程奖励，组内计算相对优势后应用 GRPO 裁剪目标更新策略。</p>\n<pre><code class=\"language-python\"># VPR 训练流程伪代码（Turn-Level GRPO）\nfor update_step in range(100):\n    trajectories = policy_model.sample_batch(128)  # 128 trajectories\n\n    for each trajectory, each turn t:\n        # Step 1: Oracle computes posterior process reward for G candidate actions\n        for g in range(G):\n            r[g] = oracle.posterior(a[t][g] | tau[:t], outcome=1)\n\n        # Step 2: Within-group normalization to get advantage\n        advantage = (r - mean(r)) / (std(r) + 1e-8)\n\n        # Step 3: GRPO clipped loss\n        ratio = exp(log_prob_new - log_prob_old)\n        loss = -min(ratio * advantage,\n                    clip(ratio, 0.8, 1.2) * advantage)\n\n    loss.backward()\n    optimizer.step()\n</code></pre>\n<div class=\"warn-box\">⚠️ <strong>注意</strong>：与标准 GRPO（轨迹级分组）不同，turn-level GRPO 在每一步独立分组，这使得每轮对比聚焦于\"在当前状态下什么动作更好\"，而非\"哪条完整轨迹更好\"，显著提升信用分配精度。</div>\n<h5>理论分析</h5>\n<p>VPR 提供了三个命题支撑其设计的合理性：</p>\n<p><strong>命题 1（梯度信号的性质）</strong>：当 Oracle 存在噪声误差 \\<span class=\"kb-math kb-math-inline\">\\\\epsilon_t\\</span> 时，VPR 梯度是真实梯度的有偏估计，但偏差受误差方差约束。期望上，Oracle 倾向于为成功路径上的动作分配更高的过程奖励，因此梯度期望的方向仍然指向成功策略。</p>\n<p><strong>命题 2（偏差的线性缩放）</strong>：梯度偏差 \\<span class=\"kb-math kb-math-inline\">\\\\|\\\\mathbb{E}[\\\\nabla\\\\hat{L}] - \\\\nabla L\\\\|\\</span> 随 Oracle 平均误差 \\<span class=\"kb-math kb-math-inline\">\\\\bar{\\\\epsilon}\\</span> 线性增长。这解释了为何弱 Oracle 不仅无益反而有害——当噪声过大时，梯度方向偏离真实提升方向，模型学会的是利用 Oracle 的误差而非真正改进推理。</p>\n<p><strong>命题 3（信号量级优势）</strong>：VPR 过程奖励在每一步都提供非零梯度信号，而稀疏结果奖励仅在轨迹末的少数几步有信号。在 \\<span class=\"kb-math kb-math-inline\">T\\</span> 轮任务中，VPR 的总信号量级大约是 OR 的 \\<span class=\"kb-math kb-math-inline\">T\\</span> 倍，这一理论优势在 Minesweeper（平均 10+ 步）中尤为显著。</p>\n<h5>实验发现</h5>\n<p><strong>域内性能</strong>：VPR 在所有三个环境的所有六项指标上一致最优。特别地，Tic-Tac-Toe 中 VPR 是唯一先后手都接近最优（return ≈ -0.1）的方法；Sudoku 中 Base 模型虽能填对大部分格但几乎无法完整求解（SR≈0%），VPR 将 SR 提升至 21%；Minesweeper 中 VPR 的 CR 增益最大（+14% vs Base），说明过程奖励帮助模型在不确定状态下做出更安全的局部推理。</p>\n<p><strong>跨域泛化</strong>：VPR 训练后的模型在 7 个推理基准和 2 个智能体任务上全面超越 Base。Minesweeper-VPR 在 ALFWorld 上表现最佳（+4.48%），Sudoku-VPR 在 GPQA-Diamond 上增益最大（+6.87%），显示出训练环境结构与迁移任务之间存在合理的技能对齐。</p>\n<p><strong>Oracle 质量消融</strong>：这是 VPR 最关键的发现——将 Tic-Tac-Toe 的 MCTS 模拟次数从 10,000 降至 100 后，VPR 在域内（return 从 -0.10 跌至 -0.50，低于 Base 的 -0.33）和全部 7 个下游基准上均全面劣于 Base。这说明<strong>不可靠的过程监督比没有过程监督更差</strong>。</p>\n<h5>与现有方法的区别</h5>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>维度</th>\n<th>OR (RLVR)</th>\n<th>MC-PR</th>\n<th>VPR</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>监督密度</td>\n<td>稀疏（仅末端）</td>\n<td>密集</td>\n<td>密集</td>\n</tr>\n<tr>\n<td>信号可靠性</td>\n<td>高（二元）</td>\n<td>低（rollout 噪声）</td>\n<td>高（策略无关 Oracle）</td>\n</tr>\n<tr>\n<td>计算开销</td>\n<td>低</td>\n<td>高（每步 100 次 rollout）</td>\n<td>中（Oracle 每步评估一次）</td>\n</tr>\n<tr>\n<td>信用分配</td>\n<td>差</td>\n<td>中等</td>\n<td>优秀</td>\n</tr>\n<tr>\n<td>泛化能力</td>\n<td>有限</td>\n<td>不稳定</td>\n<td>稳定且全面</td>\n</tr>\n</tbody>\n</table></div>",
      "quiz": {
        "q": "VPR 框架中，当 Oracle 质量不足（如 MCTS 模拟次数过少）时会发生什么？",
        "options": [
          "过程奖励退化为结果奖励，效果与 OR 相当",
          "模型仅丢失训练环境性能，但下游泛化不受影响",
          "噪声过程奖励会系统性损害域内性能和全部下游推理基准，效果甚至不如 Base 模型",
          "训练速度变慢但最终收敛到相同性能"
        ],
        "answer": 2,
        "explain": "消融实验显示弱 Oracle（N=100）导致域内 return 低于 Base，且 7 个下游基准均全面下降。命题 2 从理论上解释了这一现象：梯度偏差随 Oracle 误差线性放大，模型会学习利用 Oracle 的缺陷而非真正改进推理能力。"
      }
    },
    {
      "id": "agentjet",
      "num": 19,
      "name": "AgentJet",
      "fullName": "群体式代理强化学习训练框架 (AgentJet)",
      "year": "2026.06",
      "org": "Tongyi Lab",
      "parent": "agentrl",
      "paperUrl": "https://arxiv.org/abs/2606.04484",
      "projectUrl": "",
      "category": "frontier",
      "motivation": "用群体式分布架构扩展代理RL",
      "summary": "AgentJet提出解耦的Swarm训练框架，将GPU集群上的模型推理（Swarm Server）与任意设备上的Agent执行（Swarm Client）完全分离，通过Context Tracking和Timeline Merging实现1.5-10倍训练加速，并构建了首个输入研究主题即可自主执行多天RL研究的自动化系统。",
      "keyPoints": [
        "<strong>Swarm架构解耦</strong>：Swarm Server在GPU集群上运行多模型推理，Swarm Client在任意设备（笔记本/手机/IoT）上执行Agent，两者通过轻量级异步协议通信，解除硬件耦合",
        "<strong>异构多模型RL</strong>：同一训练流程中可同时使用不同架构、不同规模的LLM/VLM作为Agent基座，Swarm Server统一管理和调度推理资源",
        "<strong>多任务鸡尾酒训练（Cocktail Training）</strong>：支持将Web Agent、Code Agent、Tool-use Agent等多种异构任务同时混合训练，通过任务感知的批次调度提升数据效率",
        "<strong>容错执行（Fault-Tolerant Execution）</strong>：Client端内置环境隔离、自动重试、心跳检测和断点续传机制，支持不可靠网络中长周期训练任务",
        "<strong>热更新代码（Hot Code Reload）</strong>：训练过程中无需重启即可动态注入新的Reward函数、新的环境适配器或修改Agent策略代码，大幅加速迭代",
        "<strong>Context Tracking + Timeline Merging</strong>：将Agent交互历史压缩为结构化Context，在Server端合并多个Client的时间线后统一做优势估计，消除跨Client的冗余计算，实现1.5-10x训练加速",
        "<strong>自动化研究系统</strong>：输入研究主题（如\"研究代码Agent的工具调用策略\"），AgentJet自动生成实验配置、分配资源、执行多天训练、收集结果并生成分析报告"
      ],
      "detail": "<p><img alt=\"AgentJet 示意图\" src=\"https://ar5iv.labs.arxiv.org/html/2606.04484/assets/x1.png\" />\n<em>图：AgentJet 的核心框架或评测示意。</em></p>\n<h5>1. 核心框架图</h5>\n<pre><code>┌─────────────────────────────────────────────────────────────────────┐\n│                        AgentJet Swarm Architecture                   │\n├─────────────────────────────────────────────────────────────────────┤\n│                                                                      │\n│  ┌──────────────────────────────┐    ┌──────────────────────────┐   │\n│  │     Swarm Server (GPU)       │    │   Swarm Client (Any)     │   │\n│  │                              │    │                          │   │\n│  │  ┌──────┐ ┌──────┐ ┌──────┐ │    │  ┌────────┐ ┌────────┐  │   │\n│  │  │LLM A │ │LLM B │ │VLM C │ │◄───┼──│Agent-1 │ │Agent-2 │  │   │\n│  │  └──────┘ └──────┘ └──────┘ │  async  └────────┘ └────────┘  │   │\n│  │  ┌──────────────┐           │  protocol  ┌────────────────┐  │   │\n│  │  │ Context Merge │           │◄───────────│  Environment   │  │   │\n│  │  │ + Timeline    │           │            │  (Web/OS/API)  │  │   │\n│  │  └──────────────┘           │            └────────────────┘  │   │\n│  │  ┌──────────────┐           │                                │   │\n│  │  │ RL Trainer    │           │  ┌────────────────────────┐   │   │\n│  │  │ (PPO/GRPO)   │           │  │ Fault-Tolerant Layer   │   │   │\n│  │  └──────────────┘           │  │ (retry/ckpt/heartbeat) │   │   │\n│  └──────────────────────────────┘  └────────────────────────┘   │   │\n│                                                                      │\n│      ▲ Context Tracking      ▲ Timeline Merging    ▲ Hot Reload     │\n│      │ (structured history)  │ (cross-client merge) │ (dynamic code) │\n└─────────────────────────────────────────────────────────────────────┘\n</code></pre>\n<p><em>图：AgentJet Swarm架构总览——Server-Client解耦，Context Tracking压缩交互历史，Timeline Merging跨Client合并时间线，Hot Reload支持动态代码更新。</em></p>\n<h5>2. 算法伪代码</h5>\n<pre><code>Algorithm: AgentJet Swarm RL Training Loop\n────────────────────────────────────────────────────────────────\nInput:  Model zoo M = {m1, m2, ..., mn}\n        Task set T = {t1, t2, ..., th}\n        Swarm Clients C = {c1, c2, ..., ck}\nOutput: Trained policies pi1, pi2, ..., pin\n\n1.  // Initialize Swarm Server\n2.  Server.load_models(M)           // Load models onto GPU cluster\n3.  Server.init_optimizer(PPO/GRPO) // Setup RL optimizer\n4.\n5.  for episode = 1 to N do:\n6.      // Phase 1: Distributed Rollout\n7.      for each client c in C in parallel do:\n8.          task ← CocktailSampler.sample(T)   // Multi-task sampling\n9.          model_id ← task.assigned_model      // Heterogeneous model routing\n10.         env ← EnvironmentFactory.create(task.type)\n11.         history ← []\n12.         while not task.done() do:\n13.             // Async inference via Swarm Server\n14.             ctx ← ContextTracker.compress(history)\n15.             action ← Server.infer_async(model_id, ctx, env.observation)\n16.             reward ← env.step(action)\n17.             history.append((observation, action, reward))\n18.             if client.fault_detected():  // Heartbeat check\n19.                 history ← client.load_checkpoint()\n20.         end while\n21.         client.send_trajectory(history)  // Ship to Server\n22.     end for\n23.\n24.     // Phase 2: Timeline Merging\n25.     all_trajectories ← Server.collect()\n26.     merged_timelines ← TimelineMerger.merge(\n27.         all_trajectories,\n28.         strategy=&quot;share_context&quot;  // share common context prefixes\n29.     )\n30.\n31.     // Phase 3: Advantage Estimation &amp; RL Update\n32.     advantages ← GAE(merged_timelines)  // Generalized Advantage Estimation\n33.     for each model m in M do:\n34.         trajectories_m ← filter(all_trajectories, model=m)\n35.         loss ← PPO_clip(policy_m, trajectories_m, advantages)\n36.         Server.optimizer_step(m, loss)\n37.     end for\n38.\n39.     // Phase 4: Hot Reload (if needed)\n40.     if Server.has_code_update():\n41.         Server.apply_patch(new_reward_fn, new_env_adapter)\n42.         // No restart required\n43. end for\n44. return {pi1, pi2, ..., pin}\n</code></pre>\n<h5>3. 深入方法解释</h5>\n<p><strong>动机与背景</strong>。Agentic RL（让LLM Agent通过与环境交互进行强化学习）已成为通向通用AI Agent的关键路径。然而现有框架面临五大痛点：\n(1) <strong>硬件强耦合</strong>：模型推理和Agent执行必须在同一机器上，导致无法利用分布式资源——GPU集群只能跑推理，用户的笔记本/手机虽有环境但无法接入训练；\n(2) <strong>异构模型难统一</strong>：不同网站/工具任务需要不同规模的模型（如简单任务用7B模型、复杂编程用70B模型、视觉任务用VLM），现有框架无法在单一训练流程中同时管理多种模型架构；\n(3) <strong>任务孤立训练</strong>：Web Agent、Code Agent、Tool Agent各自独立训练，无法共享底层推理能力和数据结构，数据效率低下；\n(4) <strong>长周期训练脆弱</strong>：Agent任务的训练常需要数天甚至数周，网络中断、环境崩溃、代码bug都会导致训练从头开始；\n(5) <strong>迭代速度慢</strong>：修改Reward函数或环境适配器需要停止训练→修改代码→重启训练，实验周期以天为单位。</p>\n<p>AgentJet正是为解决这五大痛点而设计的。</p>\n<p><strong>Swarm Server-Client 解耦架构</strong>。这是AgentJet最核心的设计理念。Swarm Server部署在GPU集群上，负责三件事：(a) 加载和管理异构模型（LLaMA、Qwen、GPT等系列的多个变体），(b) 接收来自Client的异步推理请求并返回动作决策，(c) 合并Client上传的轨迹数据并执行RL优化。Swarm Client则部署在任意设备上——可以是数据中心的CPU服务器、研究者的MacBook、甚至树莓派——Client负责三件事：(a) 运行真实环境（浏览器、终端、API沙箱），(b) 执行Agent的观测-动作循环，(c) 本地做Context压缩和故障恢复。</p>\n<p>Server与Client之间通过<strong>轻量级异步协议</strong>通信：Client发送<code>(model_id, compressed_context, observation)</code>三元组，Server返回<code>(action, logprobs, value_estimate)</code>。这种设计的精妙之处在于：\n- GPU资源利用率最大化：Server支持<strong>动态批处理（Dynamic Batching）</strong>，将来自不同Client的推理请求合并为批次，GPU利用率接近理论峰值；\n- 环境多样性的无限扩展：Client可以运行任何环境——Selenium浏览器、Docker容器、REST API沙箱甚至物理机器人——无需修改Server端代码；\n- 网络容忍：异步协议天然容忍网络延迟和抖动，Client在等待Server响应时可以预处理下一轮的观测或写入本地日志。</p>\n<div class=\"key-point\">💡 关键：解耦架构使得一台8×A100 GPU Server可以同时服务200+个Swarm Client做并行的Agent交互，而传统的耦合方案中一台GPU只能服务一个Agent实例。</div>\n<p><strong>异构多模型RL</strong>。AgentJet的模型管理层维护一个\"Model Zoo\"——同一训练批次中可以混合使用Qwen-7B处理简单导航任务、Qwen-72B处理复杂推理任务、Qwen-VL处理视觉理解任务。当Client发起推理请求时，由<strong>Cocktail Sampler</strong>根据任务类型、难度和当前模型负载进行路由。Server端的RL优化器则对每个模型独立维护一份策略参数和优化器状态，但共享同一套Advantage估计的计算基础设施。这意味着7B模型学到的环境探索策略可以通过<strong>跨模型知识蒸馏（Cross-Model Distillation）</strong>迁移给72B模型，加速大模型的收敛。</p>\n<p><strong>Context Tracking（上下文追踪）</strong>。Agent在执行长序列任务时，交互历史会迅速膨胀——100步的Web操作可能产生超过10万token的原始历史。AgentJet引入<strong>结构化Context压缩</strong>：将历史中的重复模式（如连续多次scroll操作）合并为宏动作，将与任务无关的中间状态（如页面加载中的空白状态）丢弃，仅保留关键决策点。压缩后的Context通常为原始历史的1/5-1/10，大大降低了Server的推理成本。更关键的是，Client维护<strong>Context增量更新（Delta Update）</strong>——每次推理时只发送增量变化部分，Server端在之前Context的基础上做前缀共享缓存（Prefix KV-Cache），避免重复计算。</p>\n<p><strong>Timeline Merging（时间线合并）</strong>。这是AgentJet实现1.5-10x训练加速的核心技术。传统框架中，每个Agent的完整交互历史被独立处理，导致大量共享前缀被重复计算。AgentJet识别到：来自同一Client或同类型任务的trajectories通常共享大量通用前缀（如\"打开浏览器\"→\"导航到搜索引擎\"→\"输入查询\"等通用步骤）。TimelineMerger在Server端接收所有Client上传的trajectory后，构建一棵<strong>前缀树（Trie）</strong>——共享前缀只存储和计算一次。在做GAE（Generalized Advantage Estimation）时，前缀树上的共享节点只需一次前向+反向传播，所有分支节点共享梯度。在27页技术报告的实验中，对于Web Agent任务（100+步骤），Timeline Merging使得RL更新步骤的计算量降低为原来的1/5-1/10；对于Code Agent任务（通常较短、较少共享前缀），加速比为1.5-3x。</p>\n<div class=\"warn-box\">⚠️ 注意：Timeline Merging只在同类型任务的trajectories之间进行。跨类型的任务（如Web Agent+Code Agent）由于上下文空间差异较大，共享前缀有限，强制合并反而会增加计算开销。AgentJet通过自动检测上下文语义相似度来决定是否合并。</div>\n<p><strong>容错执行（Fault-Tolerant Execution）</strong>。AgentJet的Client内置四层容错：\n(a) <strong>环境隔离</strong>——每个Agent实例在独立的Docker容器或沙箱进程中运行，环境崩溃不影响其他实例；\n(b) <strong>心跳检测</strong>——Client每30秒向Server发送心跳，若Server在120秒内未收到心跳则判定Client失联，自动将该Client的未完成任务重新分配给其他空闲Client；\n(c) <strong>自动重试</strong>——对于可恢复的错误（如网络超时、API限流），Client以指数退避策略自动重试（1s→2s→4s→8s，最大5次）；\n(d) <strong>断点续传</strong>——Client每50步自动保存checkpoint到本地磁盘和Server端，训练中断后可从最近checkpoint恢复，无需从头开始。</p>\n<p>在27页实验部分，AgentJet展示了在72小时连续训练中的稳定性：平均每10小时发生1.2次故障（网络中断/环境崩溃），但容错机制使得所有故障均在5分钟内自动恢复，训练进度损失不超过2%。</p>\n<p><strong>热更新代码（Hot Code Reload）</strong>。这是AgentJet对研究效率的极大提升。传统RL训练中修改Reward函数需要停止训练→修变代码→重新编译→从头启动训练，AgentJet利用Python的动态特性实现了运行时代码注入：Server端维护一个<strong>代码版本栈</strong>，当研究者推送新的Reward函数或环境适配器代码时，Server通过<code>importlib.reload()</code>动态加载新模块，同时平滑切换正在运行的训练循环——当前批次继续使用旧代码完成，下一批次自动切换到新代码，无需停止训练。这使得Reward shaping的迭代周期从天级缩短到分钟级。</p>\n<p><strong>自动化研究系统</strong>。AgentJet最雄心勃勃的贡献是构建了一个<strong>端到端自动化RL研究流水线</strong>。用户只需输入自然语言研究主题（如\"研究代码Agent在工具选择时的探索-利用权衡\"），系统自动：(1) 通过LLM解析研究意图，生成实验配置（超参数搜索空间、评估指标、基线方法）；(2) 分配Swarm资源（多少个Client、使用哪些模型）；(3) 启动训练循环；(4) 自动收集和可视化训练曲线、A/B对比结果；(5) 生成包含统计显著性检验的研究报告。整个流程可以无人值守运行数天。该系统的设计理念是让研究者从\"调参工人\"转变为\"科学问题的定义者\"。</p>\n<p><strong>与传统方法的差异</strong>。AgentJet vs. OpenRLHF/LLaMA-Factory等现有RL训练框架的最大区别：后者聚焦于\"单个模型在静态数据集上的对齐训练\"（SFT+RLHF模式），而AgentJet是为\"多个模型在动态真实环境中交互学习\"而设计的分布式操作系统级平台。对比RLlib等通用RL框架：RLlib面向传统RL环境（Atari/MuJoCo），AgentJet面向LLM Agent环境（网页/代码/API），两者的核心瓶颈完全不同——前者关注GPU利用率，后者关注异步通信延迟和长序列记忆压缩。实验表明，在同等硬件条件下AgentJet的吞吐量是OpenRLHF的3.2倍、是RLlib的5.7倍。</p>",
      "quiz": {
        "q": "AgentJet的Timeline Merging技术实现训练加速的核心原理是什么？",
        "options": [
          "通过增加GPU数量来并行处理更多的trajectory",
          "通过构建前缀树共享不同trajectory之间的共同上下文前缀，消除冗余的KV-cache计算和梯度传播",
          "通过压缩模型参数量来减少推理延迟",
          "通过提前终止不成功的训练轨迹来节省计算资源"
        ],
        "answer": 1,
        "explain": "Timeline Merging将多个Client的trajectory合并为一棵前缀树，共享前缀只存储和计算一次，在做GAE优势估计时共享节点只需一次前向+反向传播，从而消除跨Client的冗余计算。"
      }
    },
    {
      "id": "q_evolve",
      "num": 20,
      "name": "Q-Evolve",
      "fullName": "分布内自进化代理强化学习 (Q-Evolve)",
      "year": "2026.06",
      "org": "Eindhoven University of Technology",
      "parent": "istar",
      "paperUrl": "https://arxiv.org/abs/2606.07367",
      "projectUrl": "",
      "category": "frontier",
      "motivation": "在分布内联合演化过程奖励与策略",
      "summary": "Q-Evolve 提出了一套四阶段自进化框架：通过 Retrospective Relabeling 构造富含中间监督的混合离线数据、Weighted IQL 学习 In-Distribution Critic、GAE（仅用环境奖励）推导过程奖励、BPPO 进行行为近端策略优化，实现了在极少环境交互下将稀疏回合奖励转化为可靠的 step-level 信用分配，显著提升 LLM Agent 在长程任务上的表现。",
      "keyPoints": [
        "<strong>四阶段自进化流程</strong>：① 混合数据构造（Expert + Self-rollout + 回溯重标注）→ ② In-Distribution Critic Learning（Weighted IQL，Eq.1-5）→ ③ 过程奖励推导（GAE over <span class=\"kb-math kb-math-inline\">r^{\\text{env}}</span>，Eq.6）→ ④ In-Distribution Policy Optimization（BPPO，Eq.7），循环 K 轮迭代",
        "<strong>Weighted IQL（W-IQL）</strong>：在标准 IQL expectile 回归中引入回合回报加权的 V 函数损失，使 Critic 更关注成功轨迹的值分布，缓解稀疏二元奖励下的无判别学习",
        "<strong>Retrospective Relabeling</strong>：利用整条轨迹的最终成败信号反标每步辅助奖励 <span class=\"kb-math kb-math-inline\">r_t^{\\text{aux}}</span>（成功 +1，失败 -1），为 Critic 提供额外的中间监督",
        "<strong>过程奖励推导的 env-only 设计</strong>：GAE 仅基于环境奖励 <span class=\"kb-math kb-math-inline\">r^{\\text{env}}</span> 和 Critic 值估计，辅助奖励仅用于改善 Critic 训练质量而不引入策略梯度偏差（Table 4 验证混合奖励反而降性能）",
        "<strong>行为近端策略优化（BPPO）</strong>：在 PPO 裁剪目标上引入不对称裁剪区间 <span class=\"kb-math kb-math-inline\">[1-\\epsilon_{\\text{low}}, 1+\\epsilon_{\\text{high}}]</span> + KL 散度约束 Reference Model，实现对阳性动作的激近鼓励与阴性动作的严格抑制，保护 BC 初始化先验",
        "<strong>三个环境全面验证</strong>：WebShop（70.5%）、ScienceWorld（76.3% Seen / 69.7% Unseen）、ALFWorld（90.7% Seen / 89.6% Unseen），平均得分 79.4%，全面超越 QLASS、ETO、Best-of-N 等强基线",
        "<strong>极致样本效率</strong>：仅需 13K 环境步即超越 320K 步在线 RL 方法（PPO 59.4%、RLOO 56.4%、GRPO 39.7%），源于 Critic 训练阶段完全离线"
      ],
      "detail": "<h5>1. 核心框架示意图</h5>\n<p><img alt=\"Q-Evolve 框架总览\" src=\"https://arxiv.org/html/2606.07367v1/x1.png\" />\n<em>图：Q-Evolve 四阶段自进化流程 — Stage 1 混合数据构造（Expert + Self-rollout + Retrospective Relabeling）→ Stage 2 In-Distribution Critic Learning（Weighted IQL）→ Stage 3 过程奖励推导（GAE with <span class=\"kb-math kb-math-inline\">r^{\\text{env}}</span>）→ Stage 4 In-Distribution Policy Optimization（BPPO），循环 K 轮迭代，每轮用更新后的策略重新采样</em></p>\n<p><img alt=\"Weighted IQL 结构示意\" src=\"https://arxiv.org/html/2606.07367v1/x2.png\" />\n<em>图：Weighted IQL（W-IQL）对比标准 IQL 的训练范式 — 在稀疏回合奖励下，W-IQL 通过回合级权重 <span class=\"kb-math kb-math-inline\">w(\\tau)=\\sigma(\\beta \\cdot (R_T-\\bar{R}))</span> 使 Critic 更关注成功轨迹，提升值函数估计的鲁棒性与区分度</em></p>\n<p><img alt=\"迭代改进消融\" src=\"https://arxiv.org/html/2606.07367v1/x3.png\" />\n<em>图：Ablation on interactive improvement — 从 Iter-1 到 Iter-2 持续增益，验证了自进化框架的稳定累积能力，每次迭代贡献额外的有用监督</em></p>\n<h5>2. 算法伪代码</h5>\n<pre><code class=\"language-python\"># Algorithm 1: Q-Evolve — Q-value Guided Self-Evolution for LLM Agents\n# Input:  Expert dataset D_expert, Environment Env, Iterations K\n# Output: Evolved policy π_θ\n\n# Warm-up: Behavior Cloning on expert data\nπ_θ = warmup_BC(D_expert)\n\nfor k = 1 to K:\n    # ── Stage 1: Hybrid Data Construction ──\n    D_self = rollout(π_θ, Env)          # 当前策略采样（3条/任务）\n    D = D_expert ∪ D_self               # 合并专家数据与自采数据\n    for each trajectory τ in D:          # Retrospective Relabeling\n        r_t^aux = +1 if R_T=1 else -1   # Eq.3: 利用全局成败信号反标每一步\n\n    # ── Stage 2: In-distribution Critic Learning ──\n    for step in critic_training_steps:\n        # V 函数: Weighted IQL expectile 回归 (Eq.4-5)\n        L_V = E_D[ w(τ) · L2^m( Q_bar(u,s,a) - V(u,s) ) ]\n        # Q 函数: 标准 TD 损失 (Eq.2)\n        L_Q = E_D[ ( r^{env} + γ·V(u,s') - Q(u,s,a) )^2 ]\n        V, Q = update(L_V, L_Q)\n\n    # ── Stage 3: Process Reward Derivation ──\n    for each trajectory τ in D:          # GAE with env reward only (Eq.6)\n        A_t = GAE(r_t^env, V_t, V_{t+1}, γ=0.99, λ=0.95)\n\n    # ── Stage 4: In-distribution Policy Optimization ──\n    for epoch in PPO_epochs:\n        η_t = π_θ(a_t|·) / π_old(a_t|·)  # 重要性采样比\n        # BPPO 目标 (Eq.7): 不对称裁剪 + KL 正则\n        L_π = E_D[ min( η_t·A_t, clip(η_t, 1-ε_low, 1+ε_high)·A_t ) ]\n        L_π += α · KL(π_θ || π_ref)      # 保护 BC 初始化先验\n        π_θ = optimizer.step(L_π)\n\nreturn π_θ\n</code></pre>\n<h5>3. 深度解析</h5>\n<p><strong>3.1 动机与背景：LLM Agent 长轨迹中的稀疏奖励困境</strong></p>\n<p>在 Agentic RL 场景（如指令执行、网页导航、具身任务）中，LLM Agent 往往需要执行数十乃至上百步的环境交互——例如在 ALFWorld 中依次完成\"拿钥匙→开抽屉→取物品→放桌上\"等多步子任务——而环境通常只在最终步提供一个二元信号：成功=1，失败=0。这种极端稀疏的奖励结构导致两个根本性挑战：</p>\n<ol>\n<li><strong>信用分配困难（Temporal Credit Assignment）</strong>：无法区分长轨迹中哪些动作是关键贡献、哪些是无害的、哪些是有害的。传统方法（如 RFT，Rejection Sampling Fine-Tuning）直接丢弃整个失败轨迹，浪费了大量可用的中间监督信息。</li>\n<li><strong>离线 RL 的外推误差（Extrapolation Error）</strong>：直接从离线数据学习 Q 函数时，对 OOD（out-of-distribution）动作的值估计极易偏离真实值，导致策略在不可预知的方向上退化。</li>\n</ol>\n<p>Q-Evolve 的核心洞察在于：<strong>与其用稀疏回合奖励直接做在线策略梯度（PPO/GRPO 需大量在线 rollout，320K 环境步），不如先在离线混合数据上训练一个可靠的 In-Distribution Critic，再从中推导出稠密的 step-level 过程奖励来指导策略优化</strong>。这种\"Critic 先行，策略后行\"的范式使得整个框架仅需 13K 环境步即可收敛，同时避免了在线 RL 的不稳定性和高样本复杂度。</p>\n<p><strong>3.2 Stage 1 — 混合数据构造与 Retrospective Relabeling</strong></p>\n<p>纯离线 RL 依赖固定数据集，缺乏探索多样性。Q-Evolve 的关键设计在于每轮迭代主动采样：</p>\n<ul>\n<li><strong>策略自采轨迹</strong> <span class=\"kb-math kb-math-inline\">\\mathcal{D}_{\\text{self}}</span>：用当前策略 <span class=\"kb-math kb-math-inline\">\\pi_\\theta</span> 在环境中对每个任务采样少量轨迹（论文设置 3 条/任务），与固定专家数据集 <span class=\"kb-math kb-math-inline\">\\mathcal{D}_{\\text{expert}}</span> 合并构成混合数据集 <span class=\"kb-math kb-math-inline\">\\mathcal{D}</span>。</li>\n<li><strong>Retrospective Relabeling（回溯重标注）</strong>：对 <span class=\"kb-math kb-math-inline\">\\mathcal{D}</span> 中的每条轨迹 <span class=\"kb-math kb-math-inline\">\\tau = \\{(c_t,a_t)\\}_{t=1}^T</span>，利用其最终得分 <span class=\"kb-math kb-math-inline\">R_T \\in \\{0,1\\}</span> 统一标注每一步的辅助奖励：</li>\n</ul>\n<div class=\"kb-math kb-math-display\">r_t^{\\text{aux}} = \\begin{cases} +1, &amp; \\text{if } R_T = 1 \\text{ (task success)} \\\\ -1, &amp; \\text{if } R_T = 0 \\text{ (task failure)} \\end{cases}</div>\n<p>该操作完全自动化，无需人工标注。其直觉是：<strong>成功轨迹中每一步至少是\\\"不坏\\\"的（否则整个任务不会成功），失败轨迹中每一步可能存在问题</strong>。虽然这种\\\"一刀切\\\"的标注噪声较大——失败轨迹中也可能存在合理的动作——但它提供了传统离线数据完全缺乏的中间监督信号。Table 3 消融（w/o RT）证实移除该标注会导致显著性能下降。</p>\n<div class=\"key-point\">💡 关键设计：自采数据 + 回溯标注是 Q-Evolve 自进化的基石——策略在每轮迭代中主动探索边界案例，积累对当前策略而言最有价值的学习信号；而回溯标注则提供了一种无成本但有意义的步骤级粗略信用信号。</div>\n<p><strong>3.3 Stage 2 — Weighted IQL：In-Distribution Critic Learning</strong></p>\n<p>标准 IQL（Implicit Q-Learning）是一种 Offline RL 算法，通过 expectile 回归学习一个值函数 <span class=\"kb-math kb-math-inline\">V</span> 来隐式地逼近 in-distribution 动作的最大 Q 值，而无需对 OOD 动作显式执行 max 操作，从而避免了外推误差：</p>\n<div class=\"kb-math kb-math-display\">\\begin{aligned}\n\\mathcal{L}_V &amp;= \\mathbb{E}_{(u,s,a)\\sim\\mathcal{D}}\\left[ L_2^m\\big( \\bar{Q}(u,s,a) - V(u,s) \\big) \\right] \\\\\n\\mathcal{L}_Q &amp;= \\mathbb{E}_{(u,s,a,r^{\\text{env}},s&#x27;)\\sim\\mathcal{D}}\\left[ \\big( r^{\\text{env}} + \\gamma V(u,s&#x27;) - Q(u,s,a) \\big)^2 \\right]\n\\end{aligned}</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">L_2^m(\\delta) = |m - \\mathbb{1}(\\delta &lt; 0)| \\cdot \\delta^2</span> 是非对称平方损失。<span class=\"kb-math kb-math-inline\">m \\in (0.5, 1)</span> 控制 expectile 水平，使得 <span class=\"kb-math kb-math-inline\">V</span> 趋近于 Q 分布的上分位数（通常取 <span class=\"kb-math kb-math-inline\">m=0.7-0.9</span>），从而隐式地执行\"最优动作选择\"。</p>\n<p>Q-Evolve 对此做了关键增强——<strong>Weighted IQL（W-IQL）</strong>：在 <span class=\"kb-math kb-math-inline\">V</span> 函数的 expectile 回归损失中引入基于回合回报的权重：</p>\n<div class=\"kb-math kb-math-display\">w(\\tau) = \\sigma\\left( \\beta \\cdot (R_T - \\bar{R}) \\right), \\quad \\bar{R} = \\frac{1}{B}\\sum_{b=1}^{B} R_T^{(b)}</div>\n<div class=\"kb-math kb-math-display\">\\mathcal{L}_V^{\\text{weighted}} = \\mathbb{E}_{(u,s,a)\\sim\\mathcal{D}}\\left[ w(\\tau) \\cdot L_2^m\\big( \\bar{Q}(u,s,a) - V(u,s) \\big) \\right]</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">\\beta</span> 控制 gating 的陡峭程度，<span class=\"kb-math kb-math-inline\">\\sigma(\\cdot)</span> 是 sigmoid 函数。</p>\n<div class=\"warn-box\">⚠️ 核心直觉：在稀疏二元奖励下，标准 IQL 无法区分成功和失败轨迹——所有数据无差别地用于训练 Critic，导致 V 函数成为一个\"混合分布\"的 expectile，对好坏状态失去区分力。W-IQL 通过 <span class=\"kb-math kb-math-inline\">w(\\tau)</span> 使得成功轨迹（<span class=\"kb-math kb-math-inline\">R_T=1</span>）占主导，失败轨迹（<span class=\"kb-math kb-math-inline\">R_T=0</span>）被压低权重，迫使 Critic 聚焦于成功行为的值分布，从而提供一个更可靠的内插值函数基础。</p>\n<p>💡 关键对比：辅助奖励 <span class=\"kb-math kb-math-inline\">r^{\\text{aux}}</span> 不直接进入 Q 函数的 TD 目标（Eq.2 仅使用 <span class=\"kb-math kb-math-inline\">r^{\\text{env}}</span>），其作用体现在 (1) 作为 V 函数损失的权重 gating 输入 <span class=\"kb-math kb-math-inline\">(R_T)</span>；(2) 间接为 Critic 训练提供信息增益。这种设计让辅助信号和策略梯度信号保持在不同的信息通道中，避免交叉污染。</div>\n<p><strong>3.4 Stage 3 — 过程奖励推导：GAE 与 env-only 设计</strong></p>\n<p>获得可靠的 Critic 估值后，Q-Evolve 通过 <strong>Generalized Advantage Estimation（GAE）</strong> 公式推导每步的过程奖励/优势函数：</p>\n<div class=\"kb-math kb-math-display\">A_t = \\sum_{\\ell=0}^{\\infty} (\\gamma\\lambda)^\\ell \\left( r_{t+\\ell}^{\\text{env}} + \\gamma V(u,h_{t+\\ell+1},o_{t+\\ell+1}) - V(u,h_{t+\\ell},o_{t+\\ell}) \\right)</div>\n<p><strong>关键设计选择</strong>: GAE 中<strong>仅使用环境奖励 <span class=\"kb-math kb-math-inline\">r^{\\text{env}}</span>，不混入辅助奖励 <span class=\"kb-math kb-math-inline\">r^{\\text{aux}}</span></strong>。这背后的原理是：</p>\n<ul>\n<li><strong>辅助奖励的偏差性</strong>：<span class=\"kb-math kb-math-inline\">r^{\\text{aux}}</span> 将所有失败步统一标记为 <span class=\"kb-math kb-math-inline\">-1</span>，即便其中某些动作可能是合理的（如\"正确拿起钥匙但后续步骤出错\"）。如果直接引入 GAE，会导致对合理动作的误惩罚，使策略梯度带偏差。</li>\n<li><strong>Critic 的信息传递</strong>：辅助奖励已经通过 W-IQL 的权重机制改善了 V 函数的质量，更准确的 V 自然会传导到更准确的 GAE 估计中——这是一种\"间接但无偏\"的利用方式。</li>\n</ul>\n<p>Table 4 的消融实验直接验证了这一设计：GAE with <span class=\"kb-math kb-math-inline\">r^{\\text{env}}+r^{\\text{aux}}</span>（81.4%）显著低于 GAE with <span class=\"kb-math kb-math-inline\">r^{\\text{env}}</span> only（87.9%），甚至不如一步 <span class=\"kb-math kb-math-inline\">Q-V</span> 信号（74.3%）的改善幅度大（虽然 GAE+<span class=\"kb-math kb-math-inline\">r^{\\text{aux}}</span> 仍高于一步信号）。这清晰表明：<strong>辅助奖励是好的 Critic 训练辅助，但不是好的策略梯度输入</strong>。</p>\n<div class=\"key-point\">💡 关键洞见：Q-Evolve 在两个信息通道上分别使用不同类型的奖励——<span class=\"kb-math kb-math-inline\">r^{\\text{aux}}</span> → Critic（改善 V/Q 质量），<span class=\"kb-math kb-math-inline\">r^{\\text{env}}</span> → Actor（提供无偏梯度方向）。这种\"双通道\"设计是框架性能的核心保障。</div>\n<p><strong>3.5 Stage 4 — BPPO：行为近端策略优化</strong></p>\n<p>Q-Evolve 的策略优化模块并非普通 PPO，而是专为 Offline-to-Online 场景设计的 <strong>Behavior-Proximal PPO（BPPO）</strong>：</p>\n<div class=\"kb-math kb-math-display\">\\begin{aligned}\n\\mathcal{L}_\\pi(\\theta) = \\mathbb{E}_{\\mathcal{D}}\\Big[ \\min\\Big( \\eta_t A_t,\\; \\mathrm{clip}\\big(\\eta_t,\\, 1-\\epsilon_{\\text{low}},\\, 1+\\epsilon_{\\text{high}}\\big) A_t \\Big) \\Big] + \\alpha \\, \\mathrm{KL}(\\pi_\\theta \\| \\pi_{\\text{ref}})\n\\end{aligned}</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">\\eta_t = \\pi_\\theta(a_t|u,h_t,o_t) / \\pi_{\\text{old}}(a_t|u,h_t,o_t)</span> 是重要性采样比。</p>\n<p>BPPO 与标准 PPO 有三个本质区别：</p>\n<ol>\n<li>\n<p><strong>不对称裁剪区间</strong>：<span class=\"kb-math kb-math-inline\">\\epsilon_{\\text{low}} \\neq \\epsilon_{\\text{high}}</span>，通常设置 <span class=\"kb-math kb-math-inline\">\\epsilon_{\\text{high}} &gt; \\epsilon_{\\text{low}}</span>。这意味着：对正向优势动作（<span class=\"kb-math kb-math-inline\">A_t &gt; 0</span>，\\\"好动作\\\"），允许更大的策略更新幅度；对负向优势动作（<span class=\"kb-math kb-math-inline\">A_t &lt; 0</span>，\\\"坏动作\\\"），实施更严格的裁剪约束。这种<strong>非对称梯度截断</strong>实现了\\\"积极鼓励好行为，谨慎惩罚坏行为\\\"的直觉——在长程任务中，坏动作的危害远大于好动作的收益延迟。</p>\n</li>\n<li>\n<p><strong>In-Distribution 策略更新</strong>：所有优化仅基于数据集 <span class=\"kb-math kb-math-inline\">\\mathcal{D}</span> 中的状态和动作进行，而非 on-policy rollout。从根本上避免了离线 RL 中最致命的问题——对未见过动作的 Q 值外推误差导致的策略崩溃。</p>\n</li>\n<li>\n<p><strong>KL 散度约束 Reference Model</strong>：额外的 KL 正则项 <span class=\"kb-math kb-math-inline\">\\alpha \\cdot \\text{KL}(\\pi_\\theta \\| \\pi_{\\text{ref}})</span> 约束当前策略不偏离 Behavior Cloning 的初始化先验 <span class=\"kb-math kb-math-inline\">\\pi_{\\text{ref}}</span>。这类似于 Trust Region 的思想，在少量自采数据上训练时防止过拟合和经验灾难性遗忘。</p>\n</li>\n</ol>\n<p>Table 3 的最后一行给出了 BPPO vs AWR（Advantage-Weighted Regression）的对比：用 AWR 替换 BPPO 后性能明显下降。原因是 AWR 通过加权行为克隆来优化策略，所有动作（包括负优势动作）都在不同程度上被模仿；而 BPPO 通过 signed advantage 和 clip 机制显式地<strong>抑制负优势动作的影响力</strong>，在长程策略改进中这一点至关重要。</p>\n<div class=\"warn-box\">⚠️ 核心对比：IQL 的原始策略抽取（AWR）是\"加权模仿\"，BPPO 是\"定向纠正\"。在需要修正错误行为的长程任务中，后者的显式负信号抑制能力不可替代。</div>\n<p><strong>3.6 迭代自进化的累积效果与极致样本效率</strong></p>\n<p>Q-Evolve 支持多轮迭代：每轮用当前优化后的策略采集新的 <span class=\"kb-math kb-math-inline\">\\mathcal{D}_{\\text{self}}</span>，重新训练 Critic 并优化策略。Figure 3 显示了从 Iter-1 到 Iter-2 的持续提升，表明框架能<strong>稳定累积</strong>多轮自监督改进，而非一次性的 boost 效应。</p>\n<p>Table 5 将 Q-Evolve 与在线 RL 方法（PPO、RLOO、GRPO）做了样本效率的对齐比较。在相同主干模型（Qwen2.5-7B-Instruct）和相同任务（ALFWorld）下：</p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>方法</th>\n<th>环境步数</th>\n<th>Seen</th>\n<th>Unseen</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>PPO</td>\n<td>320K</td>\n<td>59.4</td>\n<td>67.7</td>\n</tr>\n<tr>\n<td>RLOO</td>\n<td>320K</td>\n<td>56.4</td>\n<td>36.6</td>\n</tr>\n<tr>\n<td>GRPO</td>\n<td>320K</td>\n<td>39.7</td>\n<td>32.2</td>\n</tr>\n<tr>\n<td>SFT</td>\n<td>0</td>\n<td>74.9</td>\n<td>62.3</td>\n</tr>\n<tr>\n<td>SFT + PPO</td>\n<td>320K</td>\n<td>72.6</td>\n<td>77.6</td>\n</tr>\n<tr>\n<td>SFT + RLOO</td>\n<td>320K</td>\n<td>75.0</td>\n<td>51.4</td>\n</tr>\n<tr>\n<td>SFT + GRPO</td>\n<td>320K</td>\n<td>66.7</td>\n<td>74.1</td>\n</tr>\n<tr>\n<td><strong>Q-Evolve (1-iter)</strong></td>\n<td><strong>13K</strong></td>\n<td><strong>88.6</strong></td>\n<td><strong>87.3</strong></td>\n</tr>\n</tbody>\n</table></div>\n<p>Q-Evolve 用 1/25 的环境步数，取得了远超所有方法的结果（88.6% vs 最高 75.0%）。这源于其核心设计：<strong>Critic 训练阶段完全离线</strong>，仅策略采样阶段需要少量环境交互。</p>\n<p><strong>3.7 多模型架构泛化</strong></p>\n<p>Table 6 验证了 Q-Evolve 在 Llama-3-8B-Instruct 上的表现，同样超越 MPO、KnowAgent、WKM 等 planning-based 方法。这证明了方法并非绑定特定模型初始化，其改进来自于通用的值估计与策略优化机制。</p>",
      "quiz": {
        "q": "Q-Evolve 中 Weighted IQL 的主要作用是什么？",
        "options": [
          "用回合回报对 IQL 的 expectile 回归损失加权，使 Critic 更关注成功轨迹的值分布",
          "在 Q 学习中引入 entropy bonus 以鼓励探索",
          "用 Behavior Cloning 的 log-prob 初始化 Q 函数",
          "对 OOD 动作实施 trust region 约束以防止外推"
        ],
        "answer": 0,
        "explain": "Weighted IQL 在标准 IQL 的 V 函数 expectile 回归中引入基于回合回报的权重 w(τ)=σ(β·(R_T−R̄))，使得高回报轨迹在 Critic 训练中有更大的影响力，缓解了稀疏二元奖励下 Critic 对好坏轨迹的无判别学习问题，从而提供更准确的值估计基础用于后续 GAE 优势推导。"
      }
    }
  ],
  "categories": {
    "foundation": {
      "label": "交互奠基",
      "color": "#0F766E"
    },
    "self_improve": {
      "label": "反馈与自进化",
      "color": "#2563EB"
    },
    "online_rl": {
      "label": "端到端在线RL",
      "color": "#EA580C"
    },
    "reward": {
      "label": "奖励与信用分配",
      "color": "#7C3AED"
    },
    "frontier": {
      "label": "系统扩展与前沿",
      "color": "#DC2626"
    }
  },
  "projectUrls": {}
};
