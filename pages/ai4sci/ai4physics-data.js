/**
 * ai4physics-data.js — 由 pipeline/build.py 于 2026-06-15 17:41:26 自动生成。
 * 源文件：content/ai4sci/ai4physics.md
 * ⚠️  请勿手动修改；如需更新，修改源文档后重新编译。
 */
window.PAGE_CONFIG = {
  "meta": {
    "domain": "ai4sci",
    "topic_id": "ai4physics",
    "topic_name": "物理学AI",
    "page_title": "物理学AI 算法总结",
    "page_subtitle": "2026-06-15 版",
    "page_desc": "从PINN到神经算子，从流体仿真到物理定律发现，涵盖2016-2026年物理学AI核心算法演化",
    "page_icon": "⚛️",
    "hero_pills": [
      "🏷️ PINN · Neural Operators · AI4Sci",
      "🔬 PDE求解 · 流体仿真 · 物理发现"
    ],
    "count_pill": "{count} 个算法",
    "image_base": "../../content/ai4sci/ai4physics/assets/",
    "overview_from_doc": true,
    "latest_overview_from_doc": true
  },
  "overview": [
    {
      "title": "",
      "body_html": "<h1>物理AI（二）：物理AI数学原理及实操</h1>\n<ul>\n<li>来源平台: <strong>zhihu</strong>（知乎专栏文章）</li>\n<li>原文链接: <a href=\"https://zhuanlan.zhihu.com/p/2022408426345514546\">https://zhuanlan.zhihu.com/p/2022408426345514546</a></li>\n<li>作者: 邱choy</li>\n</ul>\n<hr />\n<p>物理AI（二）：物理AI数学原理及实操</p>\n<h1>物理AI（二）：物理AI数学原理及实操</h1>\n<p>作者: 邱choy, 赞: 10</p>\n<p>上一篇中我们讲了什么是物理AI，现在这一篇呢，我们就用万字长稿来仔细斟酌一下，物理AI所有的技术，数学，到底是甚？</p>\n<p><strong>回顾一下物理AI的核心技术：</strong></p>\n<ul>\n<li>先用数字孪生与物理仿真搭建“可控的训练场”，并通过合成数据与域随机化规模化生成覆盖多场景的数据；</li>\n<li>再用物理机器学习方法训练各类代理模型，把仿真数据、观测数据与物理规律结合起来形成可泛化的表示与预测能力；</li>\n<li>最后把这些能力落到感知与决策控制上（检测/定位/融合、强化学习/模仿学习/规划），并通过并行训练、实时推理与真机微调完成从仿真到现实的迁移与部署。</li>\n</ul>\n<p>我们就以仿真，数字孪生（新一代AI4S理解物理定律为基座的，不是老款），传感器细细说说，如果写累了我会省略很多~~~</p>\n<h2>1.仿真与数据</h2>\n<p>数字孪生/物理仿真（动力学、碰撞接触、传感器）+ 合成数据生成与域随机化（SDG、sim2real），这是咱们数据库，可以从高精度仿真中得到，满足物理定律，也可以测试得到，力图真实，然后混合，咱们就说说计算吧。</p>\n<p>计算方法如下：</p>\n<p><img alt=\"\" src=\"https://picx.zhimg.com/v2-f1664b3d35c312286a3099dacd0914c9_1440w.jpg\" /></p>\n<p>按照尺度划分仿真，宏观：流体（飞机压力场速度场），介观，微观：分子蛋白</p>\n<p>主要方法（连续场）：</p>\n<p><img alt=\"\" src=\"https://pica.zhimg.com/v2-f942a86df0bdc7bd0b1d79f389721a9c_1440w.jpg\" /></p>\n<p>按照方法分类</p>\n<p><img alt=\"\" src=\"https://pic1.zhimg.com/v2-f21929b43621878315a406140cb062b8_1440w.jpg\" /></p>\n<p>按照尺度分类</p>\n<p>这些方法其实在我另一篇幅有讲（数值仿真二，不过还在草稿箱，，，这篇文章发布后大家手动翻一番去看吧，而且koopman算子也在草稿有个单独篇章，我快点发的），这里的话就稍微讲解一下：</p>\n<h3>1.1FEM</h3>\n<p>有限元法是解决工程和数学物理问题的核心技术。它将复杂的连续体结构离散化为有限个简单单元的组合，通过求解每个单元的力学或物理方程，再组装成整体系统方程，从而模拟结构受力、热传导、电磁场等问题。它是现代CAE（计算机辅助工程）仿真的基石。</p>\n<p>一般地，偏微分方程与其对应的边界条件可等价于能量积分极值问题（变分问题），即从变分原理出发，在所有满足边界条件的解中，可以找到一个具有某种最小能量的解，这就是物理上的真正解。FEM有限元法作为一种域方法，以变分原理与分片插值为基础，在每个单元上用简单的多项式函数（即形函数）来近似真实解，最后将所有单元拼合起来得到全局近似解（通过加权残量法将控制方程转化为积分形式的“弱形式”）:</p>\n<p><strong>弱形式</strong></p>\n<p>考虑一个一维微分方程(你总可以用koopman方法将其升维在高维 空间成为线性的):</p>\n<p><img alt=\"Lu+ g= 0\" src=\"https://www.zhihu.com/equation?tex=Lu%2B+g%3D+0\" />, <img alt=\"a\\leq x\\leq b\" src=\"https://www.zhihu.com/equation?tex=a%5Cleq+x%5Cleq+b\" /></p>\n<p>L是一个微分算子，u(x)未知函数，g 是已知函数，做权重积分</p>\n<p>这里 v 是任意的：</p>\n<p><img alt=\"\\int_{a}^{b}v(Lu+g)dx=0\" src=\"https://www.zhihu.com/equation?tex=%5Cint_%7Ba%7D%5E%7Bb%7Dv%28Lu%2Bg%29dx%3D0\" /></p>\n<p>对上式做部分积分之后，才变成弱形式。</p>\n<p><strong>试探基函数假定近似解：</strong></p>\n<p><img alt=\"\\begin{aligned}&amp;\\mathbf{u}=\\psi_{1}a_{1}+\\psi_{2}a_{2}+...+\\psi_{n}a_{n}\\&amp;\\mathbf{u}=\\psi^{*}a^{+}\\end{aligned}\" src=\"https://www.zhihu.com/equation?tex=%5Cbegin%7Baligned%7D%26%5Cmathbf%7Bu%7D%3D%5Cpsi_%7B1%7Da_%7B1%7D%2B%5Cpsi_%7B2%7Da_%7B2%7D%2B...%2B%5Cpsi_%7Bn%7Da_%7Bn%7D%5C%5C%26%5Cmathbf%7Bu%7D%3D%5Cpsi%5E%7B%2A%7Da%5E%7B%2B%7D%5Cend%7Baligned%7D\" /></p>\n<p>a1,a2,“,an 是未知参数 -ψ1,ψ2,”,ψn 是 trial function, 事先给定 (通常为低次多项式，在其所属单元及相邻单元上非零，在 其他区域为零，形状如“帐篷”,从而保证生成的系统矩阵是稀疏的。),所以，一旦 a1,a2,“,an 已知，那么近似解 就知道了：</p>\n<p><img alt=\"\\int_a^bv(Lu+g)dx=0\" src=\"https://www.zhihu.com/equation?tex=%5Cint_a%5Ebv%28Lu%2Bg%29dx%3D0\" /></p>\n<p>但是由于u不是精确解所以Lu+g=e,存在残差。</p>\n<p><strong>权函数及矩阵化：</strong></p>\n<p>令权函数的一般形式可以表示为 (定义与u不一样，V1…Vn可以是任何基函数) :</p>\n<p><img alt=\"\\begin{aligned}&amp;\\mathrm{v}=V_1b_1+V_2b_2+...+V_nb_n\\&amp;\\mathrm{v}=Vb=b^+V\\end{aligned}\" src=\"https://www.zhihu.com/equation?tex=%5Cbegin%7Baligned%7D%26%5Cmathrm%7Bv%7D%3DV_1b_1%2BV_2b_2%2B...%2BV_nb_n%5C%5C%26%5Cmathrm%7Bv%7D%3DVb%3Db%5E%2BV%5Cend%7Baligned%7D\" /></p>\n<p>则任何v：</p>\n<p><img alt=\"b^+\\int_a^bV^+e=0\" src=\"https://www.zhihu.com/equation?tex=b%5E%2B%5Cint_a%5EbV%5E%2Be%3D0\" /></p>\n<p>那么就有<img alt=\":\\int_a^bV_1edx=0\" src=\"https://www.zhihu.com/equation?tex=%3A%5Cint_a%5EbV_1edx%3D0\" /> <img alt=\"\\ldots\" src=\"https://www.zhihu.com/equation?tex=%5Cldots\" /> <img alt=\"\\&amp;\" src=\"https://www.zhihu.com/equation?tex=%5C%26\" /> <img alt=\"e= L( \\psi ( x) a) + g= aL( \\psi ( x) ) + g\\Rightarrow \\int _{\\mathrm{a} }^{b}V^{+ }L( \\psi ( x) ) dxa= - \\int _{\\mathrm{a} }^{b}V^{+ }gdx\" src=\"https://www.zhihu.com/equation?tex=e%3D+L%28+%5Cpsi+%28+x%29+a%29+%2B+g%3D+aL%28+%5Cpsi+%28+x%29+%29+%2B+g%5CRightarrow+%5Cint+_%7B%5Cmathrm%7Ba%7D+%7D%5E%7Bb%7DV%5E%7B%2B+%7DL%28+%5Cpsi+%28+x%29+%29+dxa%3D+-+%5Cint+_%7B%5Cmathrm%7Ba%7D+%7D%5E%7Bb%7DV%5E%7B%2B+%7Dgdx\" /> <img alt=\"\\int_a^bV_nedx=0\" src=\"https://www.zhihu.com/equation?tex=%5Cint_a%5EbV_nedx%3D0\" /></p>\n<p><img alt=\"\\begin{aligned}&amp;\\int_{2}^{\\infty}\\&amp;let:\\quad K=\\int_{2}^{b}V^{+}L(\\psi(x))dx\\&amp;f=-\\int_{2}^{b}V^{+}gdx\\end{aligned}\\Rightarrow Ka=f\\Rightarrow\\begin{bmatrix}\\int_{2}^{b}V_{1}^{+}L(\\psi_{1}(x))dx&amp;...&amp;...&amp;\\int_{2}^{b}V_{1}^{+}L(\\psi_{n}(x))dx\\...&amp;...&amp;...&amp;...\\...&amp;...&amp;...&amp;...\\...&amp;...&amp;...&amp;...\\\\int_{2}^{b}V_{n}^{+}L(\\psi_{1}(x))dx&amp;...&amp;...&amp;\\int_{2}^{b}V_{n}^{+}L(\\psi_{n}(x))dx\\end{bmatrix}\\begin{bmatrix}a_{1}\\a_{2}\\a_{3}\\a_{4}\\end{bmatrix}=\\begin{bmatrix}\\int_{2}^{b}V_{1}^{+}gdx\\...\\...\\\\int_{2}^{b}V_{n}^{+}gdx\\end{bmatrix}\" src=\"https://www.zhihu.com/equation?tex=%5Cbegin%7Baligned%7D%26%5Cint_%7B2%7D%5E%7B%5Cinfty%7D%5C%5C%26let%3A%5Cquad+K%3D%5Cint_%7B2%7D%5E%7Bb%7DV%5E%7B%2B%7DL%28%5Cpsi%28x%29%29dx%5C%5C%26f%3D-%5Cint_%7B2%7D%5E%7Bb%7DV%5E%7B%2B%7Dgdx%5Cend%7Baligned%7D%5CRightarrow+Ka%3Df%5CRightarrow%5Cbegin%7Bbmatrix%7D%5Cint_%7B2%7D%5E%7Bb%7DV_%7B1%7D%5E%7B%2B%7DL%28%5Cpsi_%7B1%7D%28x%29%29dx%26...%26...%26%5Cint_%7B2%7D%5E%7Bb%7DV_%7B1%7D%5E%7B%2B%7DL%28%5Cpsi_%7Bn%7D%28x%29%29dx%5C%5C...%26...%26...%26...%5C%5C...%26...%26...%26...%5C%5C...%26...%26...%26...%5C%5C%5Cint_%7B2%7D%5E%7Bb%7DV_%7Bn%7D%5E%7B%2B%7DL%28%5Cpsi_%7B1%7D%28x%29%29dx%26...%26...%26%5Cint_%7B2%7D%5E%7Bb%7DV_%7Bn%7D%5E%7B%2B%7DL%28%5Cpsi_%7Bn%7D%28x%29%29dx%5Cend%7Bbmatrix%7D%5Cbegin%7Bbmatrix%7Da_%7B1%7D%5C%5Ca_%7B2%7D%5C%5Ca_%7B3%7D%5C%5Ca_%7B4%7D%5Cend%7Bbmatrix%7D%3D%5Cbegin%7Bbmatrix%7D%5Cint_%7B2%7D%5E%7Bb%7DV_%7B1%7D%5E%7B%2B%7Dgdx%5C%5C...%5C%5C...%5C%5C%5Cint_%7B2%7D%5E%7Bb%7DV_%7Bn%7D%5E%7B%2B%7Dgdx%5Cend%7Bbmatrix%7D\" /></p>\n<p>然后就怒解上述方程（当然是有技巧的，这里不多说，这矩阵很大）。我们一般给u和v赋予同样的基，大部分时候都是形函数。</p>\n<p><strong>krylov空间及arnoldi过程</strong></p>\n<p>这么大的矩阵咋办呢？而且大部分时候都是稀疏的，Krylov 子空间方法是一种处理大型稀疏矩阵线性方程组的有力的投影方法。它的基本思想是将一个大规模稀疏矩阵所在的空间下的某个维数较小的子空间中寻求近似解，所以我们可以用这个思想求解上面的巨大矩阵：例如用FGMRES。 设 <img alt=\"r\\in \\mathbb{R}^n,A\\in \\mathbb{R}^{n\\times n}\" src=\"https://www.zhihu.com/equation?tex=r%5Cin+%5Cmathbb%7BR%7D%5En%2CA%5Cin+%5Cmathbb%7BR%7D%5E%7Bn%5Ctimes+n%7D\" />, 我们称 （这里A就是我们的“刚度矩阵”）</p>\n<p><img alt=\"K_m(A,r):=\\text{span}(r,Ar,A^2r,\\cdots,A^{m-1}r)\" src=\"https://www.zhihu.com/equation?tex=K_m%28A%2Cr%29%3A%3D%5Ctext%7Bspan%7D%28r%2CAr%2CA%5E2r%2C%5Ccdots%2CA%5E%7Bm-1%7Dr%29\" /></p>\n<p>是 <img alt=\"A,r\" src=\"https://www.zhihu.com/equation?tex=A%2Cr\" /> 张成的 <img alt=\"m\" src=\"https://www.zhihu.com/equation?tex=m\" /> 阶 Krylov 子空间，注意它的维数不一定是 <img alt=\"m\" src=\"https://www.zhihu.com/equation?tex=m\" />（最大是），有时简写为 <img alt=\"K_m\" src=\"https://www.zhihu.com/equation?tex=K_m\" />. 高阶空间包含低阶空间，在给定 <img alt=\"A,r\" src=\"https://www.zhihu.com/equation?tex=A%2Cr\" /> 的前提下</p>\n<p><img alt=\" K_1\\subseteq K_2\\subseteq \\cdots \\subseteq K_m.\" src=\"https://www.zhihu.com/equation?tex=+K_1%5Csubseteq+K_2%5Csubseteq+%5Ccdots+%5Csubseteq+K_m.\" /></p>\n<p>此外 <img alt=\"LK_m(A,r)\" src=\"https://www.zhihu.com/equation?tex=LK_m%28A%2Cr%29\" /> 还可定义为 <img alt=\"{x=p(A)r}\" src=\"https://www.zhihu.com/equation?tex=%5C%7Bx%3Dp%28A%29r%5C%7D\" />，其中 <img alt=\"p(A)\" src=\"https://www.zhihu.com/equation?tex=p%28A%29\" /> 表示不超过 <img alt=\"m-1\" src=\"https://www.zhihu.com/equation?tex=m-1\" /> 次的矩阵多项式全体。 该算法是通过 Gram-Schmidt 正交化过程计算 <img alt=\"K_m\" src=\"https://www.zhihu.com/equation?tex=K_m\" /> 的一组基底的方法。步骤是</p>\n<ol>\n<li>先将 <img alt=\"r\" src=\"https://www.zhihu.com/equation?tex=r\" /> 标准化，即 <img alt=\"v_1=\\dfrac{r}{|r|},j=1\" src=\"https://www.zhihu.com/equation?tex=v_1%3D%5Cdfrac%7Br%7D%7B%7Cr%7C%7D%2Cj%3D1\" />.</li>\n<li>计算 A 宽数 <img alt=\"h_{ij}=(v_i,Av_j),i=1,2,\\cdots,j\" src=\"https://www.zhihu.com/equation?tex=h_%7Bij%7D%3D%28v_i%2CAv_j%29%2Ci%3D1%2C2%2C%5Ccdots%2Cj\" />.</li>\n<li>做投影 <img alt=\"w_j=Av_j-\\sum\\limits_{i=1}^jh_{ij}v_i\" src=\"https://www.zhihu.com/equation?tex=w_j%3DAv_j-%5Csum%5Climits_%7Bi%3D1%7D%5Ejh_%7Bij%7Dv_i\" />.</li>\n<li>若 <img alt=\"h_{i+1,j}:=|w_j|=0\" src=\"https://www.zhihu.com/equation?tex=h_%7Bi%2B1%2Cj%7D%3A%3D%7Cw_j%7C%3D0\" />，则计算结束，否则标准化 <img alt=\"v_{j+1}=\\dfrac{w_j}{h_{i+1,j}}\" src=\"https://www.zhihu.com/equation?tex=v_%7Bj%2B1%7D%3D%5Cdfrac%7Bw_j%7D%7Bh_%7Bi%2B1%2Cj%7D%7D\" />.</li>\n<li><img alt=\"j=j+1\" src=\"https://www.zhihu.com/equation?tex=j%3Dj%2B1\" />，循环第二步，直到 <img alt=\"j=m\" src=\"https://www.zhihu.com/equation?tex=j%3Dm\" /> 结束。 如果到第 <img alt=\"k(k&lt;m)\" src=\"https://www.zhihu.com/equation?tex=k%28k%3Cm%29\" /> 步时有 <img alt=\"h_{k+1,k}=0\" src=\"https://www.zhihu.com/equation?tex=h_%7Bk%2B1%2Ck%7D%3D0\" />，则算法将提前终止。此时 <img alt=\"Av_k\" src=\"https://www.zhihu.com/equation?tex=Av_k\" /> 必定可由 <img alt=\"v_1,v_2,\\cdots,v_k\" src=\"https://www.zhihu.com/equation?tex=v_1%2Cv_2%2C%5Ccdots%2Cv_k\" /> 线性表出。如果上述算法不提前终止，则向量 <img alt=\"v_1,v_2,\\cdots,v_m\" src=\"https://www.zhihu.com/equation?tex=v_1%2Cv_2%2C%5Ccdots%2Cv_m\" /> 构成 <img alt=\"K_m\" src=\"https://www.zhihu.com/equation?tex=K_m\" /> 的一组标准正交基。</li>\n</ol>\n<h3>1.2LBM</h3>\n<p>格子玻尔兹曼方法是一种基于微观动力学模型的流体模拟方法。它通过模拟流体粒子在规则格点上的分布函数及其碰撞、迁移过程，来再现宏观的流体运动（如Navier-Stokes方程）。其并行性极佳，特别擅长处理复杂边界、多孔介质和多相流问题。</p>\n<p>LBM的核心思想是将连续介质的流体流动问题转化为在离散空间中的粒子运动问题，它将流体空间离散为一个个栅格，另一方面又通过栅格上的概率密度函数来描述微观尺度下的粒子分布情况。如下图所示：</p>\n<p>每个格子还包含了一组粒子分布函数(distribution function)，它们描述了粒子在各个微观方向上流动的概率。以二维LBM最常用的D2Q9模型为例，流体在每个格子上的密度与流速可以由9个微观方向上的分布函数来描述:</p>\n<p><img alt=\"\" src=\"https://pic1.zhimg.com/v2-214a8d68561f7ea4a8e9e89a5c06c95a_1440w.jpg\" /></p>\n<p>D2Q9模式</p>\n<p>LBM在进行流体仿真时，核心操作包括两个步骤：碰撞和流动。这里”碰撞” 是指在每个格子上的粒子实现均衡。在D2Q9模型中，均衡分布的计算公式为 (其中，wi为每个微观方向上速度的权重。) :</p>\n<p><img alt=\"f_i^{eq}=\\rho w_i[1+3(\\nu_i\\bullet u)+\\frac{9}{2}(\\nu_i\\bullet u)^2-\\frac{3}{2}u^2]\" src=\"https://www.zhihu.com/equation?tex=f_i%5E%7Beq%7D%3D%5Crho+w_i%5B1%2B3%28%5Cnu_i%5Cbullet+u%29%2B%5Cfrac%7B9%7D%7B2%7D%28%5Cnu_i%5Cbullet+u%29%5E2-%5Cfrac%7B3%7D%7B2%7Du%5E2%5D\" /></p>\n<p>计算出均衡分布后就更新每个微观方向上的分布函数：</p>\n<p><img alt=\"f_i^\\text{new}=f_i+(f_i^{eq}-f_i)/T\" src=\"https://www.zhihu.com/equation?tex=f_i%5E%5Ctext%7Bnew%7D%3Df_i%2B%28f_i%5E%7Beq%7D-f_i%29%2FT\" /></p>\n<p>T为弛豫时间，它反映了流体的黏性。可以看到，LBM中的碰撞步骤实际上是对原始分布函数以及均衡分布进行线性插值。计算出新的分布函数后，粒子将沿微观速度方向传播到相邻的网格点，这一过程称为流动，通过交替进行碰撞和流动步骤，我们就能实现流体仿真。</p>\n<blockquote>\n<p>插叙：希尔伯特第六问题<br />\n希尔伯特第六问题的核心在于「物理学的公理化」，即通过选取一组最基本的物理学定律，系统地推导出其余的物理学定律。物理学的基础变得更加复杂和多样化。在量子物理，尤其是量子场论中，部分基础物理定律本身尚未被完全理解，公理化当然更无从谈起。尽管如此，希尔伯特在提出这一宏大问题时，作出了一个较为具体的补充：他希望在牛顿运动定律的基础上，严格推导出宏观现象中常见的连续性方程，例如流体力学中的纳维-斯托克斯方程。因此，希尔伯特第六问题的一个具体化版本便是流体力学的公理化问题，即能否从牛顿运动定律出发，推导出流体运动方程。<br />\n如果我们发现能从微观推导出宏观，那非线性系统实际上就是被无限维度（或者巨大维数）的粒子法能替代了，就可以跨尺度。并且，对仿真方法加速至关重要。</p>\n</blockquote>\n<h3>1.3DFT</h3>\n<p>DFT是一种基于量子力学的第一性原理电子结构计算方法。它通过求解电子密度（而非波函数）来确定系统的基态性质，如总能量、电子结构和几何构型。DFT是计算材料科学和量子化学的基石，用于预测材料的本征属性，但计算成本极高，通常限于数百个原子和静态计算。</p>\n<p>密度泛函理论的核心原理。其核心思想是用电子密度<img alt=\"n(\\mathbf{r})\" src=\"https://www.zhihu.com/equation?tex=n%28%5Cmathbf%7Br%7D%29\" />这个简单的物理量，替代复杂的多 电子波函数<img alt=\"\\Psi(\\mathbf{r}_1,\\mathbf{r}_2,\\ldots,\\mathbf{r}_N)\" src=\"https://www.zhihu.com/equation?tex=%5CPsi%28%5Cmathbf%7Br%7D_1%2C%5Cmathbf%7Br%7D_2%2C%5Cldots%2C%5Cmathbf%7Br%7D_N%29\" />来描述系统。 对于一个处于外部势场<img alt=\"V_{\\mathrm{ext}}( \\mathbf{r} )\" src=\"https://www.zhihu.com/equation?tex=V_%7B%5Cmathrm%7Bext%7D%7D%28+%5Cmathbf%7Br%7D+%29\" /> (通常由原子核产生)中的多电子系统，其基态电子密度 <img alt=\"n_0(\\mathbf{r})\" src=\"https://www.zhihu.com/equation?tex=n_0%28%5Cmathbf%7Br%7D%29\" />唯一地决定了该外部势场(除了一个无关紧要的常数外)。所有系统的基态性质(如能 量、结构)都是电子密度<img alt=\"n(\\mathbf{r})\" src=\"https://www.zhihu.com/equation?tex=n%28%5Cmathbf%7Br%7D%29\" />的泛函。可以定义一个关于电子密度<img alt=\"n(\\mathbf{r})\" src=\"https://www.zhihu.com/equation?tex=n%28%5Cmathbf%7Br%7D%29\" />的普适能量泛函<img alt=\"E[n]\" src=\"https://www.zhihu.com/equation?tex=E%5Bn%5D\" />,其对于给定的外部势场<img alt=\"V_\\mathrm{ext}\" src=\"https://www.zhihu.com/equation?tex=V_%5Cmathrm%7Bext%7D\" />,在精确的基态密度 <img alt=\"n_{0}\" src=\"https://www.zhihu.com/equation?tex=n_%7B0%7D\" /> 处取得极小值，且该极小值等于系统的精确基态能量<img alt=\"E_0.\" src=\"https://www.zhihu.com/equation?tex=E_0.\" /></p>\n<p><img alt=\"E_0=\\min_{n(\\mathbf{r})}E[n]=E[n_0]\" src=\"https://www.zhihu.com/equation?tex=E_0%3D%5Cmin_%7Bn%28%5Cmathbf%7Br%7D%29%7DE%5Bn%5D%3DE%5Bn_0%5D\" /></p>\n<p><img alt=\"E[n]=T[n]+E_\\text{H}[n]+E_\\text{xc}[n]+\\int V_\\text{ext}(\\mathbf{r})n(\\mathbf{r})d\\mathbf{r}\" src=\"https://www.zhihu.com/equation?tex=E%5Bn%5D%3DT%5Bn%5D%2BE_%5Ctext%7BH%7D%5Bn%5D%2BE_%5Ctext%7Bxc%7D%5Bn%5D%2B%5Cint+V_%5Ctext%7Bext%7D%28%5Cmathbf%7Br%7D%29n%28%5Cmathbf%7Br%7D%29d%5Cmathbf%7Br%7D\" /></p>\n<p>只要找到使总能量泛函<img alt=\"E[n]\" src=\"https://www.zhihu.com/equation?tex=E%5Bn%5D\" />最小的那个电子密度<img alt=\"n(\\mathbf{r})\" src=\"https://www.zhihu.com/equation?tex=n%28%5Cmathbf%7Br%7D%29\" />,我们就得到了系统的基态。能量泛 函由以下几部分构成： <img alt=\"T[n]\" src=\"https://www.zhihu.com/equation?tex=T%5Bn%5D\" />:动能泛函。电子作为动能的泛函(未知且难以精确表达)。 <img alt=\"E_{\\mathrm{H}}[n]\" src=\"https://www.zhihu.com/equation?tex=E_%7B%5Cmathrm%7BH%7D%7D%5Bn%5D\" />: Hartree能，描述电子间的经典库仑排斥。</p>\n<p><img alt=\"E_\\text{H}[n]=\\dfrac{1}{2}\\iint\\dfrac{n(\\textbf{r})n(\\textbf{r}')}{|\\textbf{r}-\\textbf{r}'|}d\\textbf{r}d\\textbf{r}'\" src=\"https://www.zhihu.com/equation?tex=E_%5Ctext%7BH%7D%5Bn%5D%3D%5Cdfrac%7B1%7D%7B2%7D%5Ciint%5Cdfrac%7Bn%28%5Ctextbf%7Br%7D%29n%28%5Ctextbf%7Br%7D%27%29%7D%7B%7C%5Ctextbf%7Br%7D-%5Ctextbf%7Br%7D%27%7C%7Dd%5Ctextbf%7Br%7Dd%5Ctextbf%7Br%7D%27\" /></p>\n<p><img alt=\"E_\\mathrm{xc}[n]\" src=\"https://www.zhihu.com/equation?tex=E_%5Cmathrm%7Bxc%7D%5Bn%5D\" />:交换-关联能泛函。这是DFT的“心脏”和全部奥秘所在，它包含了所有非经典的电子相互作用 (由于泡利不相容原理产生的交换作用，以及电子关联效应)以及动能泛函的未知部分。 <img alt=\"\\int V_\\text{ext}nd\\mathbf{r} :\" src=\"https://www.zhihu.com/equation?tex=%5Cint+V_%5Ctext%7Bext%7Dnd%5Cmathbf%7Br%7D+%3A\" />外势能，电子在原子核场中的势能。</p>\n<p>上述 <img alt=\"T[n]\" src=\"https://www.zhihu.com/equation?tex=T%5Bn%5D\" /> 和 <img alt=\"E_{xc}[n]\" src=\"https://www.zhihu.com/equation?tex=E_%7Bxc%7D%5Bn%5D\" /> 的具体形式未知。我们就用一个假想的、无相互作用的辅助系统来代替真实的、有相互作用的电子系统。这个辅助系统的电子密度与真实系统完全相同，这个无相互作用系统的动能 <img alt=\"T_s[n]\" src=\"https://www.zhihu.com/equation?tex=T_s%5Bn%5D\" /> 可以精确计算（其波函数是单电子轨道的斯莱特行列式）。我们把所有未知的、复杂的部分都塞进交换-关联泛函 <img alt=\"E_{xc}[n]\" src=\"https://www.zhihu.com/equation?tex=E_%7Bxc%7D%5Bn%5D\" /> 中。Kohn-Sham方程（通过变分法推导得出）：</p>\n<p><img alt=\"\\left[-\\frac{1}{2}\\nabla^2 + V_{\\mathrm{eff}}(\\mathbf{r})\\right]\\psi_i(\\mathbf{r}) = \\epsilon_i\\psi_i(\\mathbf{r})\" src=\"https://www.zhihu.com/equation?tex=%5Cleft%5B-%5Cfrac%7B1%7D%7B2%7D%5Cnabla%5E2+%2B+V_%7B%5Cmathrm%7Beff%7D%7D%28%5Cmathbf%7Br%7D%29%5Cright%5D%5Cpsi_i%28%5Cmathbf%7Br%7D%29+%3D+%5Cepsilon_i%5Cpsi_i%28%5Cmathbf%7Br%7D%29\" /></p>\n<p><img alt=\"\\epsilon_i\" src=\"https://www.zhihu.com/equation?tex=%5Cepsilon_i\" />: 对应的轨道能。 <img alt=\"V_{\\mathrm{eff}}(\\mathbf{r})\" src=\"https://www.zhihu.com/equation?tex=V_%7B%5Cmathrm%7Beff%7D%7D%28%5Cmathbf%7Br%7D%29\" />: 有效势，它依赖于电子密度，是计算的关键：</p>\n<p><img alt=\" V_{\\mathrm{eff}}(\\mathbf{r}) = V_{\\mathrm{ext}}(\\mathbf{r}) + V_{\\mathrm{H}}(\\mathbf{r}) + V_{\\mathrm{xc}}(\\mathbf{r})\" src=\"https://www.zhihu.com/equation?tex=+V_%7B%5Cmathrm%7Beff%7D%7D%28%5Cmathbf%7Br%7D%29+%3D+V_%7B%5Cmathrm%7Bext%7D%7D%28%5Cmathbf%7Br%7D%29+%2B+V_%7B%5Cmathrm%7BH%7D%7D%28%5Cmathbf%7Br%7D%29+%2B+V_%7B%5Cmathrm%7Bxc%7D%7D%28%5Cmathbf%7Br%7D%29\" /></p>\n<p><img alt=\"V_{\\mathrm{H}}(\\mathbf{r}) = \\int \\frac{n(\\mathbf{r}^\\prime)}{|\\mathbf{r}-\\mathbf{r}^\\prime|} d\\mathbf{r}^\\prime\" src=\"https://www.zhihu.com/equation?tex=V_%7B%5Cmathrm%7BH%7D%7D%28%5Cmathbf%7Br%7D%29+%3D+%5Cint+%5Cfrac%7Bn%28%5Cmathbf%7Br%7D%5E%5Cprime%29%7D%7B%7C%5Cmathbf%7Br%7D-%5Cmathbf%7Br%7D%5E%5Cprime%7C%7D+d%5Cmathbf%7Br%7D%5E%5Cprime\" />: Hartree势。 <img alt=\"V_{\\mathrm{xc}}(\\mathbf{r}) = \\frac{\\partial E_{\\mathrm{xc}}[n]}{\\partial n(\\mathbf{r})}\" src=\"https://www.zhihu.com/equation?tex=V_%7B%5Cmathrm%7Bxc%7D%7D%28%5Cmathbf%7Br%7D%29+%3D+%5Cfrac%7B%5Cpartial+E_%7B%5Cmathrm%7Bxc%7D%7D%5Bn%5D%7D%7B%5Cpartial+n%28%5Cmathbf%7Br%7D%29%7D\" />: 交换-关联势，是交换-关联能对密度的泛函导数。· 电子密度由 Kohn-Sham 轨道构造：</p>\n<p><img alt=\"n(\\mathbf{r}) = \\sum_{i=1}^{N} |\\psi_i(\\mathbf{r})|^2\" src=\"https://www.zhihu.com/equation?tex=n%28%5Cmathbf%7Br%7D%29+%3D+%5Csum_%7Bi%3D1%7D%5E%7BN%7D+%7C%5Cpsi_i%28%5Cmathbf%7Br%7D%29%7C%5E2\" /></p>\n<p>1.猜一个初始电子密度<img alt=\"n_\\mathrm{initial}( \\mathbf{r} )\" src=\"https://www.zhihu.com/equation?tex=n_%5Cmathrm%7Binitial%7D%28+%5Cmathbf%7Br%7D+%29\" />。</p>\n<p>2.由<img alt=\"n(\\mathbf{r})\" src=\"https://www.zhihu.com/equation?tex=n%28%5Cmathbf%7Br%7D%29\" />构造有效势<img alt=\"V_{\\mathrm{eff}}( \\mathbf{r} )\" src=\"https://www.zhihu.com/equation?tex=V_%7B%5Cmathrm%7Beff%7D%7D%28+%5Cmathbf%7Br%7D+%29\" />。</p>\n<p>3.求解 Kohn-Sham方程，得到一组新的 Kohn-Sham轨道<img alt=\"{\\psi_i}\" src=\"https://www.zhihu.com/equation?tex=%5C%7B%5Cpsi_i%5C%7D\" />。</p>\n<p>4.由新轨道计算新的电子密度<img alt=\"n_\\mathrm{new}( \\mathbf{r} )\" src=\"https://www.zhihu.com/equation?tex=n_%5Cmathrm%7Bnew%7D%28+%5Cmathbf%7Br%7D+%29\" />。</p>\n<p>5.比较<img alt=\"n_\\mathrm{new}\" src=\"https://www.zhihu.com/equation?tex=n_%5Cmathrm%7Bnew%7D\" />和<img alt=\"n_\\mathrm{old}\" src=\"https://www.zhihu.com/equation?tex=n_%5Cmathrm%7Bold%7D\" />,如果未收敛，则混合两者作为新的输入密度，返回步骤2。如果收敛， 则计算总能量。</p>\n<p>3.2IMU：复杂的多电子问题，转化为在一个自治的有效势中求解单电子方程的问题。所有多体效应的复杂性都被封装在交换-关联泛函<img alt=\"E_\\mathrm{xc}[n]\" src=\"https://www.zhihu.com/equation?tex=E_%5Cmathrm%7Bxc%7D%5Bn%5D\" />中。但实际计算中<img alt=\"E_\\mathrm{xc}[n]\" src=\"https://www.zhihu.com/equation?tex=E_%5Cmathrm%7Bxc%7D%5Bn%5D\" />必须近似(如LDA，GGA,hybrid泛函等)。计算结果的精度几乎完全取决于所选的交换-关联泛函的好坏。</p>\n<h3>1.4koopman算子</h3>\n<p>库普曼算子<img alt=\"\\mathcal{K}_{t\\text{}}\" src=\"https://www.zhihu.com/equation?tex=%5Cmathcal%7BK%7D_%7Bt%5Ctext%7B%7D%7D\" />是一个无限维线性算子，作用于测量函数g上：</p>\n<p><img alt=\"\\mathcal{K}_tg=g\\circ\\mathbf{F}_t\" src=\"https://www.zhihu.com/equation?tex=%5Cmathcal%7BK%7D_tg%3Dg%5Ccirc%5Cmathbf%7BF%7D_t\" /></p>\n<p>其中 o 是复合运算符。对于一个具有时间步长<img alt=\"\\Delta t_\\mathrm{}\" src=\"https://www.zhihu.com/equation?tex=%5CDelta+t_%5Cmathrm%7B%7D\" /> 的离散时间系统，这变为：</p>\n<p><img alt=\"\\mathcal{K}_{\\Delta t}g(\\mathbf{x}_k)=g(\\mathbf{F}_{\\Delta t}(\\mathbf{x}_k))=g(\\mathbf{x}_{k+1}).\" src=\"https://www.zhihu.com/equation?tex=%5Cmathcal%7BK%7D_%7B%5CDelta+t%7Dg%28%5Cmathbf%7Bx%7D_k%29%3Dg%28%5Cmathbf%7BF%7D_%7B%5CDelta+t%7D%28%5Cmathbf%7Bx%7D_k%29%29%3Dg%28%5Cmathbf%7Bx%7D_%7Bk%2B1%7D%29.\" /></p>\n<p>换句话说，库音曼算子定义了一个无限维线性动力系统，将状态观测<img alt=\"g_k=g(\\mathbf{x}_k)_{\\text{推进到下一个时间步：}}\" src=\"https://www.zhihu.com/equation?tex=g_k%3Dg%28%5Cmathbf%7Bx%7D_k%29_%7B%5Ctext%7B%E6%8E%A8%E8%BF%9B%E5%88%B0%E4%B8%8B%E4%B8%80%E4%B8%AA%E6%97%B6%E9%97%B4%E6%AD%A5%EF%BC%9A%7D%7D\" /></p>\n<p><img alt=\"g(\\mathbf{x}_{k+1})=\\mathcal{K}_{\\Delta t}g(\\mathbf{x}_k).\" src=\"https://www.zhihu.com/equation?tex=g%28%5Cmathbf%7Bx%7D_%7Bk%2B1%7D%29%3D%5Cmathcal%7BK%7D_%7B%5CDelta+t%7Dg%28%5Cmathbf%7Bx%7D_k%29.\" /></p>\n<p><img alt=\"\" src=\"https://pic4.zhimg.com/v2-94578b9414d364a2ea58c943a031bf03_1440w.jpg\" /></p>\n<p>koopman算子和观测量演化的线性化</p>\n<p>为了用有限的计算资源和数据来近似无限维算子<img alt=\"\\mathcal{K}\" src=\"https://www.zhihu.com/equation?tex=%5Cmathcal%7BK%7D\" />,最简单的方法是投影到一系列有限维子空间上。首先选择一个字典</p>\n<p><img alt=\"\\mathcal{D}=^{{\\psi_1,\\ldots,\\psi_N}}\" src=\"https://www.zhihu.com/equation?tex=%5Cmathcal%7BD%7D%3D%5E%7B%5C%7B%5Cpsi_1%2C%5Cldots%2C%5Cpsi_N%5C%7D%7D\" />,即<img alt=\"L^2(\\mathcal{X},\\omega)\" src=\"https://www.zhihu.com/equation?tex=L%5E2%28%5Cmathcal%7BX%7D%2C%5Comega%29\" />空间中的一组可观测量列表。函数<img alt=\"\\psi_n\" src=\"https://www.zhihu.com/equation?tex=%5Cpsi_n\" />不需要是归一化或正交的，但我们假设它们是线性无关的。用</p>\n<p><img alt=\"V_N=\\operatorname{span}{\\psi_1,\\ldots,\\psi_N}_\\text{}{\\mathcal{P}_N}\" src=\"https://www.zhihu.com/equation?tex=V_N%3D%5Coperatorname%7Bspan%7D%5C%7B%5Cpsi_1%2C%5Cldots%2C%5Cpsi_N%5C%7D_%5Ctext%7B%7D%7B%5Cmathcal%7BP%7D_N%7D\" />表示字典张成的空间，并用Pn表示从 <img alt=\"L^2( \\mathcal{X} , \\omega ) _\\text{到 }V_N\" src=\"https://www.zhihu.com/equation?tex=L%5E2%28+%5Cmathcal%7BX%7D+%2C+%5Comega+%29+_%5Ctext%7B%E5%88%B0+%7DV_N\" />的正交投影。目标是当 <img alt=\"N\\to\\infty\" src=\"https://www.zhihu.com/equation?tex=N%5Cto%5Cinfty\" />时，构造越来越精确的近似。</p>\n<p>K的有限截面近似：</p>\n<p><img alt=\" _\\text{ }\\mathcal{K} _N= \\mathcal{P} _{V_N}\\mathcal{K} \\mathcal{P} _{V_N}^* : V_N\\to V_N\" src=\"https://www.zhihu.com/equation?tex=+_%5Ctext%7B+%7D%5Cmathcal%7BK%7D+_N%3D+%5Cmathcal%7BP%7D+_%7BV_N%7D%5Cmathcal%7BK%7D+%5Cmathcal%7BP%7D+_%7BV_N%7D%5E%2A+%3A+V_N%5Cto+V_N\" />, 是可以将其扩展到整个<img alt=\"L^2( \\mathcal{X} , \\omega ) _\\text{ }\" src=\"https://www.zhihu.com/equation?tex=L%5E2%28+%5Cmathcal%7BX%7D+%2C+%5Comega+%29+_%5Ctext%7B+%7D\" />空间为 <img alt=\"{\\mathcal{K} _N}\\mathcal{P} _{V_N}\" src=\"https://www.zhihu.com/equation?tex=%7B%5Cmathcal%7BK%7D+_N%7D%5Cmathcal%7BP%7D+_%7BV_N%7D\" /> 这种方法在库 普曼理论之外已有悠久的历史。在库普曼理论背景下，它是扩展动态模态分解 (EDMD)的基础。</p>\n<p>我们寻找<img alt=\"\\mathcal{P} _{V_N}\\mathcal{K} \\mathcal{P} _{V_N\\text{}}^* \" src=\"https://www.zhihu.com/equation?tex=%5Cmathcal%7BP%7D+_%7BV_N%7D%5Cmathcal%7BK%7D+%5Cmathcal%7BP%7D+_%7BV_N%5Ctext%7B%7D%7D%5E%2A+\" />, 的 一 个 矩 阵 表 示 <img alt=\"\\mathbb{K} _N\" src=\"https://www.zhihu.com/equation?tex=%5Cmathbb%7BK%7D+_N\" /> 使得：</p>\n<p><img alt=\"\\mathcal{K}\\psi_i=\\psi_i(F(x))=\\sum_{j=1}^N[\\mathbb{K}_N]_{ji}\\psi_j(x)+\\rho_i(x),\\quad i=1,\\ldots,N,\\quad x\\in\\mathcal{X},\" src=\"https://www.zhihu.com/equation?tex=%5B%5Cmathcal%7BK%7D%5Cpsi_i%5D%28x%29%3D%5Cpsi_i%28F%28x%29%29%3D%5Csum_%7Bj%3D1%7D%5EN%5B%5Cmathbb%7BK%7D_N%5D_%7Bji%7D%5Cpsi_j%28x%29%2B%5Crho_i%28x%29%2C%5Cquad+i%3D1%2C%5Cldots%2CN%2C%5Cquad+x%5Cin%5Cmathcal%7BX%7D%2C\" /></p>\n<p>其中<img alt=\"^{\\rho_i}\" src=\"https://www.zhihu.com/equation?tex=%5E%7B%5Crho_i%7D\" />是残差。通过避择第<img alt=\"i\" src=\"https://www.zhihu.com/equation?tex=i\" />列<img alt=\"{\\mathbb{K}_N(:,i)}\" src=\"https://www.zhihu.com/equation?tex=%7B%5Cmathbb%7BK%7D_N%28%3A%2Ci%29%7D\" />使得<img alt=\"\\int _\\mathcal{X} | \\rho _i( x) | ^2\" src=\"https://www.zhihu.com/equation?tex=%5Cint+_%5Cmathcal%7BX%7D+%7C+%5Crho+_i%28+x%29+%7C+%5E2\" />d<img alt=\"\\omega ( x) _\\text{ }\" src=\"https://www.zhihu.com/equation?tex=%5Comega+%28+x%29+_%5Ctext%7B+%7D\" />最小化可以得到投影<img alt=\"\\mathcal{P} _N\\mathcal{K} \\psi _i\" src=\"https://www.zhihu.com/equation?tex=%5Cmathcal%7BP%7D+_N%5Cmathcal%7BK%7D+%5Cpsi+_i\" /> ，等价地，残差与<img alt=\"{V_N}\" src=\"https://www.zhihu.com/equation?tex=%7BV_N%7D\" />正交，这可以表达为：</p>\n<p><img alt=\"\\mathcal{K}_N\\psi_i-\\sum_{j=1}^N[\\mathbb{K}_N]_{ji}\\psi_j\\perp\\psi_\\ell\\Longleftrightarrow\\sum_{j=1}^N\\langle\\psi_j,\\psi_\\ell\\rangle[\\mathbb{K}_N]_{ji}=\\langle\\mathcal{K}_N\\psi_i,\\psi_\\ell\\rangle,\\quad\\ell=1,\\ldots,N.\" src=\"https://www.zhihu.com/equation?tex=%5Cmathcal%7BK%7D_N%5Cpsi_i-%5Csum_%7Bj%3D1%7D%5EN%5B%5Cmathbb%7BK%7D_N%5D_%7Bji%7D%5Cpsi_j%5Cperp%5Cpsi_%5Cell%5CLongleftrightarrow%5Csum_%7Bj%3D1%7D%5EN%5Clangle%5Cpsi_j%2C%5Cpsi_%5Cell%5Crangle%5B%5Cmathbb%7BK%7D_N%5D_%7Bji%7D%3D%5Clangle%5Cmathcal%7BK%7D_N%5Cpsi_i%2C%5Cpsi_%5Cell%5Crangle%2C%5Cquad%5Cell%3D1%2C%5Cldots%2CN.\" /></p>\n<p>用人话来说就是：</p>\n<p>选择一组可观察量 <img alt=\"{g_1(x), g_2(x), \\cdots, g_m(x)}\" src=\"https://www.zhihu.com/equation?tex=%5C%7Bg_1%28x%29%2C+g_2%28x%29%2C+%5Ccdots%2C+g_m%28x%29%5C%7D\" />。 我们可以构造矩阵</p>\n<p><img alt=\"X = \\begin{pmatrix} g_1(x_{t_0}) &amp; g_2(x_{t_0}) &amp; \\cdots &amp; g_m(x_{t_0}) \\ g_1(x_{t_1}) &amp; g_2(x_{t_1}) &amp; \\cdots &amp; g_m(x_{t_1}) \\ \\cdots &amp; \\cdots &amp; \\cdots &amp; \\cdots \\ g_1(x_{t_{n-1}}) &amp; g_2(x_{t_{n-1}}) &amp; \\cdots &amp; g_m(x_{t_{n-1}}) \\end{pmatrix},\" src=\"https://www.zhihu.com/equation?tex=X+%3D+%5Cbegin%7Bpmatrix%7D+g_1%28x_%7Bt_0%7D%29+%26+g_2%28x_%7Bt_0%7D%29+%26+%5Ccdots+%26+g_m%28x_%7Bt_0%7D%29+%5C%5C+g_1%28x_%7Bt_1%7D%29+%26+g_2%28x_%7Bt_1%7D%29+%26+%5Ccdots+%26+g_m%28x_%7Bt_1%7D%29+%5C%5C+%5Ccdots+%26+%5Ccdots+%26+%5Ccdots+%26+%5Ccdots+%5C%5C+g_1%28x_%7Bt_%7Bn-1%7D%7D%29+%26+g_2%28x_%7Bt_%7Bn-1%7D%7D%29+%26+%5Ccdots+%26+g_m%28x_%7Bt_%7Bn-1%7D%7D%29+%5Cend%7Bpmatrix%7D%2C\" /></p>\n<p><img alt=\"Y = \\begin{pmatrix} g_1(x_{t_0 + \\tau}) &amp; g_2(x_{t_0 + \\tau}) &amp; \\cdots &amp; g_m(x_{t_0 + \\tau}) \\ g_1(x_{t_1 + \\tau}) &amp; g_2(x_{t_1 + \\tau}) &amp; \\cdots &amp; g_m(x_{t_1 + \\tau}) \\ \\cdots &amp; \\cdots &amp; \\cdots &amp; \\cdots \\ g_1(x_{t_{n-1} + \\tau}) &amp; g_2(x_{t_{n-1} + \\tau}) &amp; \\cdots &amp; g_m(x_{t_{n-1} + \\tau}) \\end{pmatrix},\" src=\"https://www.zhihu.com/equation?tex=Y+%3D+%5Cbegin%7Bpmatrix%7D+g_1%28x_%7Bt_0+%2B+%5Ctau%7D%29+%26+g_2%28x_%7Bt_0+%2B+%5Ctau%7D%29+%26+%5Ccdots+%26+g_m%28x_%7Bt_0+%2B+%5Ctau%7D%29+%5C%5C+g_1%28x_%7Bt_1+%2B+%5Ctau%7D%29+%26+g_2%28x_%7Bt_1+%2B+%5Ctau%7D%29+%26+%5Ccdots+%26+g_m%28x_%7Bt_1+%2B+%5Ctau%7D%29+%5C%5C+%5Ccdots+%26+%5Ccdots+%26+%5Ccdots+%26+%5Ccdots+%5C%5C+g_1%28x_%7Bt_%7Bn-1%7D+%2B+%5Ctau%7D%29+%26+g_2%28x_%7Bt_%7Bn-1%7D+%2B+%5Ctau%7D%29+%26+%5Ccdots+%26+g_m%28x_%7Bt_%7Bn-1%7D+%2B+%5Ctau%7D%29+%5Cend%7Bpmatrix%7D%2C\" /></p>\n<p>有限维近似 <img alt=\"U^\\tau\" src=\"https://www.zhihu.com/equation?tex=U%5E%5Ctau\" /></p>\n<p><img alt=\"U^\\tau X = Y, \\text{  } U^\\tau = Y X^T (X X^T)^{-1}\" src=\"https://www.zhihu.com/equation?tex=U%5E%5Ctau+X+%3D+Y%2C+%5Ctext%7B++%7D+U%5E%5Ctau+%3D+Y+X%5ET+%28X+X%5ET%29%5E%7B-1%7D\" /></p>\n<p>koopman是一种将非线性动力系统“线性化”的现代数学框架。其核心思想是寻找一组观测函数，将系统的非线性状态空间映射到一个更高维的线性空间，从而可以用线性算子的谱理论来分析复杂的非线性动态。它是数据驱动建模和系统辨识的强大工具。</p>\n<p>下图就是我们在流体中基于koopman算子找到的g空间中两个最大的基和截断：</p>\n<p><img alt=\"\" src=\"https://pic2.zhimg.com/v2-1354c3bfda0fc9c14b2299aebb2854b9_1440w.jpg\" /></p>\n<p>通过koopman流体的“正交pattern”模态（g空间）</p>\n<p><img alt=\"\" src=\"https://pic1.zhimg.com/v2-4f5fe35c6b4dfb3365efbcec8edc07f8_1440w.jpg\" /></p>\n<p>非线性动力学，洛伦兹吸引子</p>\n<p>上图清晰地展示了 “数据驱动的混沌系统分析与预测”​ 的完整流程。它从经典的非线性动力系统（洛伦兹吸引子）出发，演示了如何利用观测数据重构动力学并预测其未来状态。</p>\n<p>系统在三维相空间（v1, v2, v3）中演化，形成著名的洛伦兹吸引子轨迹。我们通常无法直接测量所有状态变量。图中假设我们只能观测到其中一个变量随时间的变化 x(t)。从单变量时间序列 x(t)重构出等价的高维状态空间，取 x(t)， x(t-τ)， x(t-2τ)... 作为新的坐标轴（图中 v1, v2, v3）。根据koopman重构出的轨迹在拓扑意义上与原系统动力学等价，保留了其核心几何与微分结构。</p>\n<p>当然算子法，数值法，我们还可以通过链接主义找到koopman算子的g空间：</p>\n<p><img alt=\"\" src=\"https://pic1.zhimg.com/v2-6b53c408008b0c154356e31e5fd9d956_1440w.jpg\" /></p>\n<p>koopman网络</p>\n<p>非线性动力系统找到一个可逆的坐标变换<img alt=\"\\varphi\" src=\"https://www.zhihu.com/equation?tex=%5Cvarphi\" />,将状态<img alt=\"x\" src=\"https://www.zhihu.com/equation?tex=x\" />映射到一个新的空间(潜在空间), 使得在该空间中的动力学演化是线性的，即满足：<img alt=\"\\varphi(x_{k+1})=K\\varphi(x_k)\" src=\"https://www.zhihu.com/equation?tex=%5Cvarphi%28x_%7Bk%2B1%7D%29%3DK%5Cvarphi%28x_k%29\" />。其中<img alt=\"K\" src=\"https://www.zhihu.com/equation?tex=K\" />是一个(可能是无穷维的)线性算子，称为Koopman算子。 核心挑战在于如何处理具有连续特征值谱的系统。传统方法(如广义谐波分析)需要用无限多个谐波(傅里叶基)来逼近这种频率移动，导致潜在空间的维度极高，失去了Koopman方法<img alt=\"“用线性系统描述非线性”的简洁性和计算优势\" src=\"https://www.zhihu.com/equation?tex=%E2%80%9C%E7%94%A8%E7%BA%BF%E6%80%A7%E7%B3%BB%E7%BB%9F%E6%8F%8F%E8%BF%B0%E9%9D%9E%E7%BA%BF%E6%80%A7%E2%80%9D%E7%9A%84%E7%AE%80%E6%B4%81%E6%80%A7%E5%92%8C%E8%AE%A1%E7%AE%97%E4%BC%98%E5%8A%BF\" />。 编码器<img alt=\"\\varphi{:\\text{一个神经网络，将系统在时刻}k\\text{的状态 }x_k}\" src=\"https://www.zhihu.com/equation?tex=%5Cvarphi%7B%3A%5Ctext%7B%E4%B8%80%E4%B8%AA%E7%A5%9E%E7%BB%8F%E7%BD%91%E7%BB%9C%EF%BC%8C%E5%B0%86%E7%B3%BB%E7%BB%9F%E5%9C%A8%E6%97%B6%E5%88%BB%7Dk%5Ctext%7B%E7%9A%84%E7%8A%B6%E6%80%81+%7Dx_k%7D\" />映射为潜在表示<img alt=\"y_k=\\varphi(x_k)\" src=\"https://www.zhihu.com/equation?tex=y_k%3D%5Cvarphi%28x_k%29\" />。线性动力学约束：强制潜在变量满足线性演化，即最小化损失<img alt=\"\\mathcal{L}_{\\mathrm{lin}}=|\\varphi(x_{k+1})-K\\varphi(x_k)|^2\" src=\"https://www.zhihu.com/equation?tex=%5Cmathcal%7BL%7D_%7B%5Cmathrm%7Blin%7D%7D%3D%5C%7C%5Cvarphi%28x_%7Bk%2B1%7D%29-K%5Cvarphi%28x_k%29%5C%7C%5E2\" /> 这里的<img alt=\"K\" src=\"https://www.zhihu.com/equation?tex=K\" />是一个可学习的线性矩阵。 解码器<img alt=\"\\psi\\approx\\varphi^{-1}\" src=\"https://www.zhihu.com/equation?tex=%5Cpsi%5Capprox%5Cvarphi%5E%7B-1%7D\" />:另一个神经网络，从潜在变量<img alt=\"y_k\" src=\"https://www.zhihu.com/equation?tex=y_k\" />重构出原始状态<img alt=\"\\hat{x}_k=\\psi(y_k)\" src=\"https://www.zhihu.com/equation?tex=%5Chat%7Bx%7D_k%3D%5Cpsi%28y_k%29\" />,通过最 小化重构损失<img alt=\"\\mathcal{L}_\\mathrm{rec}=|x_k-\\psi(\\varphi(x_k))|^2\" src=\"https://www.zhihu.com/equation?tex=%5Cmathcal%7BL%7D_%5Cmathrm%7Brec%7D%3D%5C%7Cx_k-%5Cpsi%28%5Cvarphi%28x_k%29%29%5C%7C%5E2\" />来保证表示的完备性。 总目标：通过联合优化<img alt=\"\\mathcal{L}_\\mathrm{rec}+\\mathcal{L}_\\mathrm{lin}\" src=\"https://www.zhihu.com/equation?tex=%5Cmathcal%7BL%7D_%5Cmathrm%7Brec%7D%2B%5Cmathcal%7BL%7D_%5Cmathrm%7Blin%7D\" />,网络自动发现一个潜在的线性子空间。|</p>\n<p><img alt=\"\" src=\"https://picx.zhimg.com/v2-81b3234b6e4dbda063d6cc1a37238beb_1440w.jpg\" /></p>\n<p>koopman加强网络</p>\n<p>在基本自编码器的基础上，增加了一个辅助网络，其输入是系统的某种标识（如初始状态或潜在变量），输出是对应的特征值 λ，系统不再被描述为单个线性矩阵 K，而是被视为一个连续的特征值族。对于给定的系统状态或轨迹，辅助网络预测出该状态下主导的Koopman特征值 λ。无需为每个可能频率分配独立的维度，从而能用极低维的潜空间（如2维）精确捕捉像经典摆这样的系统。该方法为湍流、非线性波等具有宽带频率谱的系统提供了通用的低维线性表示框架。 总结 这套方法通过深度学习，实现了对非线性动力系统Koopman表示的自动化、自适应发现。</p>\n<h2>2.AI模型</h2>\n<p>代理模型/物理机器学习（PINN、神经算子 FNO/DeepONet、世界模型/降阶/残差校正），是把物理规律或仿真数据融入学习。物理AI里说的“物理神经网络”通常不是一个单一模型，而是一类 把物理规律/仿真先验融入网络 的方法与结构。在英伟达的物理AI（机器人/仿真）里，最常直接落地的是： 混合残差模型（校准/补偿）+ 神经算子/ROM（做场的代理） ；更常见在“已知方程、想少数据反演/求解”的科研与工程建模场景。</p>\n<p><img alt=\"\" src=\"https://picx.zhimg.com/v2-4fcf6eb772f776b0ec8376824c3e66e7_1440w.jpg\" /></p>\n<p>英伟达框架</p>\n<h3>2.1PINN</h3>\n<p>考虑一个一般的PDE问题：</p>\n<p><img alt=\"\\mathcal{N}[u(\\mathbf{x},t)]=0,\\quad \\mathbf{x}\\in\\Omega,\\ t\\in[0,T]\" src=\"https://www.zhihu.com/equation?tex=%5Cmathcal%7BN%7D%5Bu%28%5Cmathbf%7Bx%7D%2Ct%29%5D%3D0%2C%5Cquad+%5Cmathbf%7Bx%7D%5Cin%5COmega%2C%5C+t%5Cin%5B0%2CT%5D\" /></p>\n<p><img alt=\" \\mathcal{B}[u(\\mathbf{x},t)]=g(\\mathbf{x},t),\\quad \\mathbf{x}\\in\\partial\\Omega\" src=\"https://www.zhihu.com/equation?tex=+%5Cmathcal%7BB%7D%5Bu%28%5Cmathbf%7Bx%7D%2Ct%29%5D%3Dg%28%5Cmathbf%7Bx%7D%2Ct%29%2C%5Cquad+%5Cmathbf%7Bx%7D%5Cin%5Cpartial%5COmega\" /></p>\n<p><img alt=\"\\mathcal{I}[u(\\mathbf{x},0)]=h(\\mathbf{x}),\\quad \\mathbf{x}\\in\\Omega\" src=\"https://www.zhihu.com/equation?tex=%5Cmathcal%7BI%7D%5Bu%28%5Cmathbf%7Bx%7D%2C0%29%5D%3Dh%28%5Cmathbf%7Bx%7D%29%2C%5Cquad+%5Cmathbf%7Bx%7D%5Cin%5COmega\" /></p>\n<p>其中：</p>\n<ul>\n<li><img alt=\"u(\\mathbf{x},t)\" src=\"https://www.zhihu.com/equation?tex=u%28%5Cmathbf%7Bx%7D%2Ct%29\" /> 是我们要求的未知物理场（如温度、流速）。</li>\n<li><img alt=\"\\mathcal{N}\" src=\"https://www.zhihu.com/equation?tex=%5Cmathcal%7BN%7D\" /> 是PDE算子（如Navier-Stokes、波动方程）。</li>\n<li><img alt=\"\\mathcal{B}\" src=\"https://www.zhihu.com/equation?tex=%5Cmathcal%7BB%7D\" /> 和 <img alt=\"\\mathcal{I}\" src=\"https://www.zhihu.com/equation?tex=%5Cmathcal%7BI%7D\" /> 分别是边界条件和初始条件算子。</li>\n<li><img alt=\"\\Omega\" src=\"https://www.zhihu.com/equation?tex=%5COmega\" /> 是空间域，<img alt=\"\\partial\\Omega\" src=\"https://www.zhihu.com/equation?tex=%5Cpartial%5COmega\" /> 是其边界。</li>\n</ul>\n<p>我们构建一个神经网络 <img alt=\"u_{\\text{NN}}(\\mathbf{x}, t; \\boldsymbol{\\theta})\" src=\"https://www.zhihu.com/equation?tex=u_%7B%5Ctext%7BNN%7D%7D%28%5Cmathbf%7Bx%7D%2C+t%3B+%5Cboldsymbol%7B%5Ctheta%7D%29\" />，其输入是坐标 <img alt=\"(\\mathbf{x}, t)\" src=\"https://www.zhihu.com/equation?tex=%28%5Cmathbf%7Bx%7D%2C+t%29\" />，输出是对物理场 <img alt=\"u\" src=\"https://www.zhihu.com/equation?tex=u\" /> 的预测值，<img alt=\"\\boldsymbol{\\theta}\" src=\"https://www.zhihu.com/equation?tex=%5Cboldsymbol%7B%5Ctheta%7D\" /> 是网络的所有权重和偏置参数。网络的目标就是学习逼近真实的解 <img alt=\"u(\\mathbf{x}, t)\" src=\"https://www.zhihu.com/equation?tex=u%28%5Cmathbf%7Bx%7D%2C+t%29\" />。构建“物理信息”损失函数 这是PINN最核心的创新。损失函数由三部分（或更多）构成，强制网络同时拟合数据和物理规律： <img alt=\"\\mathcal{L}(\\boldsymbol{\\theta}) = \\lambda_{\\text{PDE}} \\mathcal{L}_{\\text{PDE}} + \\lambda_{\\text{BC}} \\mathcal{L}_{\\text{BC}} + \\lambda_{\\text{IC}} \\mathcal{L}_{\\text{IC}} + \\lambda_{\\text{Data}} \\mathcal{L}_{\\text{Data}}\" src=\"https://www.zhihu.com/equation?tex=%5Cmathcal%7BL%7D%28%5Cboldsymbol%7B%5Ctheta%7D%29+%3D+%5Clambda_%7B%5Ctext%7BPDE%7D%7D+%5Cmathcal%7BL%7D_%7B%5Ctext%7BPDE%7D%7D+%2B+%5Clambda_%7B%5Ctext%7BBC%7D%7D+%5Cmathcal%7BL%7D_%7B%5Ctext%7BBC%7D%7D+%2B+%5Clambda_%7B%5Ctext%7BIC%7D%7D+%5Cmathcal%7BL%7D_%7B%5Ctext%7BIC%7D%7D+%2B+%5Clambda_%7B%5Ctext%7BData%7D%7D+%5Cmathcal%7BL%7D_%7B%5Ctext%7BData%7D%7D\" />PDE残差损失 <img alt=\"\\mathcal{L}_{\\text{PDE}}\" src=\"https://www.zhihu.com/equation?tex=%5Cmathcal%7BL%7D_%7B%5Ctext%7BPDE%7D%7D\" />：在计算域内部随机采样一批“配置点”，要求网络预测的解满PDE。 <img alt=\" \\mathcal{L}_{\\text{PDE}} = \\frac{1}{N_{\\text{PDE}}} \\sum_{i=1}^{N_{\\text{PDE}}} \\left| \\mathcal{N}[u_{\\text{NN}}(\\mathbf{x}_{\\text{PDE}}^i, t_{\\text{PDE}}^i; \\boldsymbol{\\theta})] \\right|^2\" src=\"https://www.zhihu.com/equation?tex=+%5Cmathcal%7BL%7D_%7B%5Ctext%7BPDE%7D%7D+%3D+%5Cfrac%7B1%7D%7BN_%7B%5Ctext%7BPDE%7D%7D%7D+%5Csum_%7Bi%3D1%7D%5E%7BN_%7B%5Ctext%7BPDE%7D%7D%7D+%5Cleft%7C+%5Cmathcal%7BN%7D%5Bu_%7B%5Ctext%7BNN%7D%7D%28%5Cmathbf%7Bx%7D_%7B%5Ctext%7BPDE%7D%7D%5Ei%2C+t_%7B%5Ctext%7BPDE%7D%7D%5Ei%3B+%5Cboldsymbol%7B%5Ctheta%7D%29%5D+%5Cright%7C%5E2\" /><br />\n计算 <img alt=\"\\mathcal{N}[u_{\\text{NN}}]\" src=\"https://www.zhihu.com/equation?tex=%5Cmathcal%7BN%7D%5Bu_%7B%5Ctext%7BNN%7D%7D%5D\" /> 需要对网络输出 <img alt=\"u_{\\text{NN}}\" src=\"https://www.zhihu.com/equation?tex=u_%7B%5Ctext%7BNN%7D%7D\" /> 关于输入 <img alt=\"(\\mathbf{x}, t)\" src=\"https://www.zhihu.com/equation?tex=%28%5Cmathbf%7Bx%7D%2C+t%29\" /> 求导（如 <img alt=\"\\nabla u\" src=\"https://www.zhihu.com/equation?tex=%5Cnabla+u\" />, <img alt=\"\\frac{\\partial u}{\\partial t}\" src=\"https://www.zhihu.com/equation?tex=%5Cfrac%7B%5Cpartial+u%7D%7B%5Cpartial+t%7D\" />, <img alt=\"\\nabla^2 u\" src=\"https://www.zhihu.com/equation?tex=%5Cnabla%5E2+u\" />）。这通过自动微分（AD）高效、精确地实现，无需任何离散化。</p>\n<p>边界条件损失 <img alt=\"\\mathcal{L}_{\\mathrm{BC}}\" src=\"https://www.zhihu.com/equation?tex=%5Cmathcal%7BL%7D_%7B%5Cmathrm%7BBC%7D%7D\" />：在边界上采样点，强制满足边界条件。</p>\n<p><img alt=\"\\mathcal{L}_{\\mathrm{BC}} = \\frac{1}{N_{\\mathrm{BC}}} \\sum_{i=1}^{N_{\\mathrm{BC}}} \\left| \\mathcal{B}[u_{\\mathrm{NN}}(\\mathbf{x}_{\\mathrm{BC}}^i, t_{\\mathrm{BC}}^i; \\theta)] - g(\\mathbf{x}_{\\mathrm{BC}}^i, t_{\\mathrm{BC}}^i) \\right|^2\" src=\"https://www.zhihu.com/equation?tex=%5Cmathcal%7BL%7D_%7B%5Cmathrm%7BBC%7D%7D+%3D+%5Cfrac%7B1%7D%7BN_%7B%5Cmathrm%7BBC%7D%7D%7D+%5Csum_%7Bi%3D1%7D%5E%7BN_%7B%5Cmathrm%7BBC%7D%7D%7D+%5Cleft%7C+%5Cmathcal%7BB%7D%5Bu_%7B%5Cmathrm%7BNN%7D%7D%28%5Cmathbf%7Bx%7D_%7B%5Cmathrm%7BBC%7D%7D%5Ei%2C+t_%7B%5Cmathrm%7BBC%7D%7D%5Ei%3B+%5Ctheta%29%5D+-+g%28%5Cmathbf%7Bx%7D_%7B%5Cmathrm%7BBC%7D%7D%5Ei%2C+t_%7B%5Cmathrm%7BBC%7D%7D%5Ei%29+%5Cright%7C%5E2\" /></p>\n<p>初始条件损失 <img alt=\"\\mathcal{L}_{\\mathrm{IC}}\" src=\"https://www.zhihu.com/equation?tex=%5Cmathcal%7BL%7D_%7B%5Cmathrm%7BIC%7D%7D\" />：在初始时刻采样点，强制满足初始条件。</p>\n<p><img alt=\" \\mathcal{L}_{\\mathrm{IC}} = \\frac{1}{N_{\\mathrm{IC}}} \\sum_{i=1}^{N_{\\mathrm{IC}}} \\left| u_{\\mathrm{NN}}(\\mathbf{x}_{\\mathrm{IC}}^i, 0; \\theta) - h(\\mathbf{x}_{\\mathrm{IC}}^i) \\right|^2\" src=\"https://www.zhihu.com/equation?tex=+%5Cmathcal%7BL%7D_%7B%5Cmathrm%7BIC%7D%7D+%3D+%5Cfrac%7B1%7D%7BN_%7B%5Cmathrm%7BIC%7D%7D%7D+%5Csum_%7Bi%3D1%7D%5E%7BN_%7B%5Cmathrm%7BIC%7D%7D%7D+%5Cleft%7C+u_%7B%5Cmathrm%7BNN%7D%7D%28%5Cmathbf%7Bx%7D_%7B%5Cmathrm%7BIC%7D%7D%5Ei%2C+0%3B+%5Ctheta%29+-+h%28%5Cmathbf%7Bx%7D_%7B%5Cmathrm%7BIC%7D%7D%5Ei%29+%5Cright%7C%5E2\" /></p>\n<p>数据损失 <img alt=\"\\mathcal{L}_{\\mathrm{Data}}\" src=\"https://www.zhihu.com/equation?tex=%5Cmathcal%7BL%7D_%7B%5Cmathrm%7BData%7D%7D\" />（可选）：如果有部分实验或模拟数据 <img alt=\"{(\\mathbf{x}_{\\mathrm{Data}}^i, t_{\\mathrm{Data}}^i), u^i}\" src=\"https://www.zhihu.com/equation?tex=%5C%7B%28%5Cmathbf%7Bx%7D_%7B%5Cmathrm%7BData%7D%7D%5Ei%2C+t_%7B%5Cmathrm%7BData%7D%7D%5Ei%29%2C+u%5Ei%5C%7D\" />，可以加入此项进行监督。</p>\n<p><img alt=\"\\mathcal{L}_{\\mathrm{Data}} = \\frac{1}{N_{\\mathrm{Data}}} \\sum_{i=1}^{N_{\\mathrm{Data}}} \\left| u_{\\mathrm{NN}}(\\mathbf{x}_{\\mathrm{Data}}^i, t_{\\mathrm{Data}}^i; \\theta) - u^i \\right|^2\" src=\"https://www.zhihu.com/equation?tex=%5Cmathcal%7BL%7D_%7B%5Cmathrm%7BData%7D%7D+%3D+%5Cfrac%7B1%7D%7BN_%7B%5Cmathrm%7BData%7D%7D%7D+%5Csum_%7Bi%3D1%7D%5E%7BN_%7B%5Cmathrm%7BData%7D%7D%7D+%5Cleft%7C+u_%7B%5Cmathrm%7BNN%7D%7D%28%5Cmathbf%7Bx%7D_%7B%5Cmathrm%7BData%7D%7D%5Ei%2C+t_%7B%5Cmathrm%7BData%7D%7D%5Ei%3B+%5Ctheta%29+-+u%5Ei+%5Cright%7C%5E2\" /></p>\n<p><img alt=\"\\lambda\" src=\"https://www.zhihu.com/equation?tex=%5Clambda\" /> 是权衡各项重要性的超参数。PINN的原理本质上是将求解PDE的定解问题转化为一个受物理方程约束的优化问题。它利用神经网络的万能逼近能力来表示解，利用自动微分来精确计算物理约束，从而创造了一种融合“数据”与“物理”的新型建模范式。它在流体力学、固体力学、生物医学等领域的正/逆问题中展现出巨大潜力。</p>\n<p><img alt=\"\" src=\"https://pic4.zhimg.com/v2-96383945196b235a3ab4689528f1b50d_1440w.jpg\" /></p>\n<p>PINN网络</p>\n<p><img alt=\"\" src=\"https://picx.zhimg.com/v2-7a730397828d221259ba6c9526be74c1_1440w.jpg\" /></p>\n<p>PINN在生物流体（血液）上的应用（斯托克斯流）</p>\n<h3>2.2算子神经网络</h3>\n<p>在传统神经网络中，我们学习的是有限维向量空间之间的映射（Mapping between Finite-dimensional Euclidean Spaces）。例如，识别一张猫的照片，是将像素矩阵映射为标签向量。而在神经算子中，我们学习的是无限维函数空间之间的映射。</p>\n<p>神经算子的江湖目前由三大流派主导：作为开山鼻祖的 DeepONet，利用频域魔法的 FNO，以及基于注意力机制的 Transformer 变体。理解它们，就理解了 AI for Science 的底层逻辑。下面我们就介绍两种最常用的结构fno和deeponet：</p>\n<ul>\n<li>fno</li>\n</ul>\n<p><img alt=\"\" src=\"https://pic2.zhimg.com/v2-b3be9b64c616d8b1c64842f873c03ef5_1440w.jpg\" /></p>\n<p>FNO</p>\n<p>(a)表示的是这个神经网络结构整体的框架图， 作为输入，经过 这个神经网络映射到高维，然后经历T个Fourier Layer，经过 之后恢复回 。图(b)则表达了一个Fourier Layer内部都经历了哪些过程，其中 进来以后，经过Fourier变换，将其转化到Fourier空间， 则是一个线性变换，目的是滤掉高频模态，然后用Fourier逆变换将其转化回源空间， 之所以不选用神经网络映射是因为实验发现线性效果更好，下面那条支路就类似于ResNet的“短路”结构，相加求和之后，经过激活函数进行非线性映射。</p>\n<p>总结一下，该框架写成一般形式则如下，其中 <img alt=\"P\" src=\"https://www.zhihu.com/equation?tex=P\" /> 和 <img alt=\"Q\" src=\"https://www.zhihu.com/equation?tex=Q\" /> 可以理解成 encoder 和 decoder，即使用神经网络映射成更高维度的 channel space，然后最后再恢复回目标的 channel space。</p>\n<p><img alt=\"v_0(x) = P(x, a(x), a_\\epsilon(x), \\nabla a_\\epsilon(x)) + p\" src=\"https://www.zhihu.com/equation?tex=v_0%28x%29+%3D+P%28x%2C+a%28x%29%2C+a_%5Cepsilon%28x%29%2C+%5Cnabla+a_%5Cepsilon%28x%29%29+%2B+p\" /></p>\n<p><img alt=\" v_{t+1}(x) = \\sigma\\left(W v_t(x) + \\int_{B(x,r)} \\kappa_\\phi(x,y,a(x),a(y)) v_t(y) dy\\right)\" src=\"https://www.zhihu.com/equation?tex=+v_%7Bt%2B1%7D%28x%29+%3D+%5Csigma%5Cleft%28W+v_t%28x%29+%2B+%5Cint_%7BB%28x%2Cr%29%7D+%5Ckappa_%5Cphi%28x%2Cy%2Ca%28x%29%2Ca%28y%29%29+v_t%28y%29+dy%5Cright%29\" /></p>\n<p><img alt=\"u(x) = Q v_T(x) + q\" src=\"https://www.zhihu.com/equation?tex=u%28x%29+%3D+Q+v_T%28x%29+%2B+q\" /></p>\n<p>换种表达形式就是</p>\n<p><img alt=\" u = Q (K_l \\circ \\sigma_l \\circ \\cdots \\circ \\sigma_1 \\circ K_0) P v\" src=\"https://www.zhihu.com/equation?tex=+u+%3D+Q+%28K_l+%5Ccirc+%5Csigma_l+%5Ccirc+%5Ccdots+%5Ccirc+%5Csigma_1+%5Ccirc+K_0%29+P+v\" /></p>\n<p><img alt=\"(\\mathcal{K}(\\phi) v_t)(x) = \\mathcal{F}^{-1}\\left(R_\\phi \\cdot (\\mathcal{F} v_t)\\right)(x) \\quad \\forall x \\in D\" src=\"https://www.zhihu.com/equation?tex=%28%5Cmathcal%7BK%7D%28%5Cphi%29+v_t%29%28x%29+%3D+%5Cmathcal%7BF%7D%5E%7B-1%7D%5Cleft%28R_%5Cphi+%5Ccdot+%28%5Cmathcal%7BF%7D+v_t%29%5Cright%29%28x%29+%5Cquad+%5Cforall+x+%5Cin+D\" /></p>\n<p><img alt=\"\" src=\"https://pic2.zhimg.com/v2-4d6e348ed26d57b5d0c99757220fc8a1_1440w.jpg\" /></p>\n<p>fno的准确性可以</p>\n<ul>\n<li>deeponet</li>\n</ul>\n<p><img alt=\"\" src=\"https://pic2.zhimg.com/v2-11037ff310a6ed3f643f2982d1f81079_1440w.jpg\" /></p>\n<p>deeponet</p>\n<p>DeepOnet可用的网络结构，主要由两部分组成，主干网络（trunk net）和分支网络（branch net），主干网络主要是编码输出函数的locations，分支网络主要是由固定的sensor组成。</p>\n<p>目标是学习算子<img alt=\"G\" src=\"https://www.zhihu.com/equation?tex=G\" />,需要输入一组组函数<img alt=\"u\" src=\"https://www.zhihu.com/equation?tex=u\" />(<img alt=\"G(u)\" src=\"https://www.zhihu.com/equation?tex=G%28u%29\" /> 对应上面一维算例中方程左边的方程形 式即算子),先讨论一次输入，即这次输入应该先固定一个特定的函数<img alt=\"u\" src=\"https://www.zhihu.com/equation?tex=u\" />,在 <img alt=\"x_1,x_2,\\ldots,x_m\" src=\"https://www.zhihu.com/equation?tex=x_1%2Cx_2%2C%5Cldots%2Cx_m\" />这些点上可以得到确定的一组<img alt=\"\\left[u\\left(x_1\\right),u\\left(x_2\\right),\\ldots,u\\left(x_m\\right)\\right]\" src=\"https://www.zhihu.com/equation?tex=%5Cleft%5Bu%5Cleft%28x_1%5Cright%29%2Cu%5Cleft%28x_2%5Cright%29%2C%5Cldots%2Cu%5Cleft%28x_m%5Cright%29%5Cright%5D\" />值(这里可以理解为一种工况，即一个确定的PDE方程，这些点为sensors，这些sensor对应着问题的解)。而<img alt=\"y\" src=\"https://www.zhihu.com/equation?tex=y\" />可能比较难理解，这个就代表<img alt=\"G(u)\" src=\"https://www.zhihu.com/equation?tex=G%28u%29\" />的自变量。换言之，<img alt=\"y\" src=\"https://www.zhihu.com/equation?tex=y\" />就是算子<img alt=\"G\" src=\"https://www.zhihu.com/equation?tex=G\" />在作用于函数<img alt=\"u\" src=\"https://www.zhihu.com/equation?tex=u\" />时的自变量，而<img alt=\"G(u)(y)\" src=\"https://www.zhihu.com/equation?tex=G%28u%29%28y%29\" />即是算子<img alt=\"G\" src=\"https://www.zhihu.com/equation?tex=G\" />在作用于函数<img alt=\"u\" src=\"https://www.zhihu.com/equation?tex=u\" />时代入具体自变量<img alt=\"y\" src=\"https://www.zhihu.com/equation?tex=y\" />后对应的值，它可以也可以不和<img alt=\"x\" src=\"https://www.zhihu.com/equation?tex=x\" />的位置相同。通过这样的网络学习学习到了方程的算子，即变量间的表示关系(不同s对应下<img alt=\"u\" src=\"https://www.zhihu.com/equation?tex=u\" /> )。</p>\n<p>A) 是比较暴力的直接把<img alt=\"u\" src=\"https://www.zhihu.com/equation?tex=u\" />在固定一组位置<img alt=\"x\" src=\"https://www.zhihu.com/equation?tex=x\" />的值和一组任意点<img alt=\"y\" src=\"https://www.zhihu.com/equation?tex=y\" />直接作为神经网络的输 入，然后输出对应的值<img alt=\"G(u)(y)\" src=\"https://www.zhihu.com/equation?tex=G%28u%29%28y%29\" /> ,是一组和<img alt=\"y\" src=\"https://www.zhihu.com/equation?tex=y\" />规模相当的实数向量。</p>\n<p>B)则算是比较直观的说明了模型的输入<img alt=\"u(x)\" src=\"https://www.zhihu.com/equation?tex=u%28x%29\" />和输出<img alt=\"G(u)(y)\" src=\"https://www.zhihu.com/equation?tex=G%28u%29%28y%29\" />到底是什么样的，可以看出-组固定的自变量<img alt=\"x\" src=\"https://www.zhihu.com/equation?tex=x\" /> ,在各种各样的函数<img alt=\"u\" src=\"https://www.zhihu.com/equation?tex=u\" />上的一组组<img alt=\"\\left[u\\left(x_1\\right),u\\left(x_2\\right),\\ldots,u\\left(x_m\\right)\\right]\" src=\"https://www.zhihu.com/equation?tex=%5Cleft%5Bu%5Cleft%28x_1%5Cright%29%2Cu%5Cleft%28x_2%5Cright%29%2C%5Cldots%2Cu%5Cleft%28x_m%5Cright%29%5Cright%5D\" />作为输入，输出则是一组组<img alt=\"G(u)\" src=\"https://www.zhihu.com/equation?tex=G%28u%29\" />在给定的一组<img alt=\"y\" src=\"https://www.zhihu.com/equation?tex=y\" />上的结果<img alt=\"G(u)(y)\" src=\"https://www.zhihu.com/equation?tex=G%28u%29%28y%29\" /> 。</p>\n<p>C)是stacked DeepONet,即不同的点<img alt=\"x_i\" src=\"https://www.zhihu.com/equation?tex=x_i\" />都对应着不同的p个branch net,也就是说<img alt=\"x_{i}\" src=\"https://www.zhihu.com/equation?tex=x_%7Bi%7D\" /> 这个位置在不同的函数<img alt=\"u(x)\" src=\"https://www.zhihu.com/equation?tex=u%28x%29\" />下的值都进入相同的这个branch网络中。至于m个点和p个oranch net是怎么对应的貌似没有具体的依据。点<img alt=\"y\" src=\"https://www.zhihu.com/equation?tex=y\" />则进入trunk net,得到一组中间结果。之后，将二者的输出做点积。</p>\n<p>D) 是unstacked DeepONet, 和C同理，只不过只有一个branch net和一个trunk net。</p>\n<ul>\n<li>算子神经网络和Koopman算子的关系/及RG解释（未来）：</li>\n</ul>\n<p>无论是用koopman算子做数值计算，还是用算子神经网络，本质上他们都是一种寻找g空间的方法，而如何解释他们需要用到RG重整化。（这里不多探讨）</p>\n<p><img alt=\"\" src=\"https://pic1.zhimg.com/v2-201f039ca05900b6feaf0bdc27a137ca_1440w.jpg\" /></p>\n<p>随着湍流的发展，我们时不时会瞥见一个熟悉的模式：高维相空间中的降维（子流形上的结构与动力学）</p>\n<p><img alt=\"\" src=\"https://pic1.zhimg.com/v2-d91b3a3405eed1d31cad6b145e8899a6_1440w.jpg\" /></p>\n<p>从典型轨道上的近似重复轨道段开始，可以找到数百个循环。左侧显示了三个位于中心的环和一个位于侧边的环。</p>\n<p>上面可以看出来基于数据驱动的非线性系统总可以找到不变环面上的紧致集作为其g空间（有关这个话题我在另一篇我的AI4S有讲，目前没上线，在草稿箱，，，大家以后可以翻翻）,所以算子神经网络正是一个可以基于koopman算子用重整化理论诠释的最好的可解释性神经网络，这个可解释性甚至可以精细到网络结构层面，这是一个很好的方向，我也觉得自己要在这个方向上研究探索！~</p>\n<h2>3.决策与落地</h2>\n<p>机器人感知与控制（检测/位姿/SLAM，多传感器融合；强化学习/模仿学习/MPC），再做训练加速与部署（并行训练、实时推理、真机微调）。</p>\n<p>在这里主要就将FMCW，IMU的原理写出来，至于lidar，有位神人说了“我们不用”，那先不写了，，，</p>\n<h3>3.1雷达</h3>\n<p><img alt=\"\" src=\"https://pic1.zhimg.com/v2-91e9d65ea72929f5e16358ddc138db52_1440w.jpg\" /></p>\n<p>注意看y轴是频率，这是连续调频波，时间域上不是规律性的</p>\n<p><img alt=\"\" src=\"https://pic2.zhimg.com/v2-5a0671362e5ee0e21c4b09fe6a687217_1440w.jpg\" /></p>\n<p>嗯，左图就是时域了，当然还有频谱，右边是返回的波</p>\n<p>FMCW脉冲雷达距离测量的方式很容易想到，雷达发射一个脉冲，测量脉冲信号从发射到返回的“飞行时间Time of Flight—ToF”即可得到，这种方式在激光雷达上十分普遍。当然，实际上车用雷达并不用这种方式，而是采用 “调频连续波FMCW——Frequency Modulated Continuous Wave”。雷达发射电磁波的频率呈线性变化（注意：是频率线性变化），因此其回波信号也呈线性变化，通过测量当前发射频率与接受频率之差，可得到探测物体的距离。</p>\n<p>发射信号是一个频率随时间线性扫描（锯齿波或三角波）的连续波。其瞬时相位和频率为：<img alt=\"\\omega_t(t) = 2\\pi(f_c + \\alpha t)\" src=\"https://www.zhihu.com/equation?tex=%5Comega_t%28t%29+%3D+2%5Cpi%28f_c+%2B+%5Calpha+t%29\" /><br />\n 其中，<img alt=\"f_c\" src=\"https://www.zhihu.com/equation?tex=f_c\" /> 是中心载频，<img alt=\"\\alpha = B/T_c\" src=\"https://www.zhihu.com/equation?tex=%5Calpha+%3D+B%2FT_c\" /> 是调频率（<img alt=\"B\" src=\"https://www.zhihu.com/equation?tex=B\" /> 为带宽，<img alt=\"T_c\" src=\"https://www.zhihu.com/equation?tex=T_c\" /> 为扫频周期）。瞬时相位通过对角频率积分得到： <img alt=\" \\phi_t(t) = 2\\pi \\int_0^t f_t(\\tau)d\\tau = 2\\pi f_c t + \\pi \\alpha t^2 + \\phi_0\" src=\"https://www.zhihu.com/equation?tex=+%5Cphi_t%28t%29+%3D+2%5Cpi+%5Cint_0%5Et+f_t%28%5Ctau%29d%5Ctau+%3D+2%5Cpi+f_c+t+%2B+%5Cpi+%5Calpha+t%5E2+%2B+%5Cphi_0\" /><br />\n 通常设初始相位 <img alt=\"\\phi_0 = 0\" src=\"https://www.zhihu.com/equation?tex=%5Cphi_0+%3D+0\" />。发射信号的数学模型为： <img alt=\"s_t(t) = A_t \\cos(\\phi_t(t)) = A_t \\cos(2\\pi f_c t + \\pi \\alpha t^2)\" src=\"https://www.zhihu.com/equation?tex=s_t%28t%29+%3D+A_t+%5Ccos%28%5Cphi_t%28t%29%29+%3D+A_t+%5Ccos%282%5Cpi+f_c+t+%2B+%5Cpi+%5Calpha+t%5E2%29\" /></p>\n<p>假设一个静止目标在距离 <img alt=\"R\" src=\"https://www.zhihu.com/equation?tex=R\" /> 处，电磁波以光速 <img alt=\"c\" src=\"https://www.zhihu.com/equation?tex=c\" /> 传播，产生时间延迟 <img alt=\"\\tau = 2R/c\" src=\"https://www.zhihu.com/equation?tex=%5Ctau+%3D+2R%2Fc\" />。接收信号是发射信号的延迟版本： <img alt=\"s_r(t) = A_r \\cos\\left(2\\pi f_c (t - \\tau) + \\pi \\alpha (t - \\tau)^2\\right)\" src=\"https://www.zhihu.com/equation?tex=s_r%28t%29+%3D+A_r+%5Ccos%5Cleft%282%5Cpi+f_c+%28t+-+%5Ctau%29+%2B+%5Cpi+%5Calpha+%28t+-+%5Ctau%29%5E2%5Cright%29\" />将发射信号与接收信号进行混频（相乘），并通过低通滤波器滤除高频分量，得到中频信号 <img alt=\"s_{if}(t)\" src=\"https://www.zhihu.com/equation?tex=s_%7Bif%7D%28t%29\" />。 <img alt=\" s_{if}(t) \\propto \\cos\\left(\\phi_t(t) - \\phi_r(t)\\right)\" src=\"https://www.zhihu.com/equation?tex=+s_%7Bif%7D%28t%29+%5Cpropto+%5Ccos%5Cleft%28%5Cphi_t%28t%29+-+%5Cphi_r%28t%29%5Cright%29\" /><img alt=\"= \\cos\\left[(2\\pi f_c t + \\pi \\alpha t^2) - \\left(2\\pi f_c (t - \\tau) + \\pi \\alpha (t - \\tau)^2\\right)\\right]\" src=\"https://www.zhihu.com/equation?tex=%3D+%5Ccos%5Cleft%5B%282%5Cpi+f_c+t+%2B+%5Cpi+%5Calpha+t%5E2%29+-+%5Cleft%282%5Cpi+f_c+%28t+-+%5Ctau%29+%2B+%5Cpi+%5Calpha+%28t+-+%5Ctau%29%5E2%5Cright%29%5Cright%5D\" /><img alt=\" = \\cos\\left(2\\pi f_c \\tau + 2\\pi \\alpha \\tau t - \\pi \\alpha \\tau^2\\right)\" src=\"https://www.zhihu.com/equation?tex=+%3D+%5Ccos%5Cleft%282%5Cpi+f_c+%5Ctau+%2B+2%5Cpi+%5Calpha+%5Ctau+t+-+%5Cpi+%5Calpha+%5Ctau%5E2%5Cright%29\" />其中 <img alt=\"\\pi \\alpha \\tau^2\" src=\"https://www.zhihu.com/equation?tex=%5Cpi+%5Calpha+%5Ctau%5E2\" /> 项非常小，通常可忽略。忽略微小项后，中频信号是一个频率固定的正弦波： <img alt=\"s_{if}(t) \\approx \\cos\\left(2\\pi f_{if} t + \\varphi_0\\right)\" src=\"https://www.zhihu.com/equation?tex=s_%7Bif%7D%28t%29+%5Capprox+%5Ccos%5Cleft%282%5Cpi+f_%7Bif%7D+t+%2B+%5Cvarphi_0%5Cright%29\" /></p>\n<p>中频频率 <img alt=\"f_{if}\" src=\"https://www.zhihu.com/equation?tex=f_%7Bif%7D\" /> 为：</p>\n<p><img alt=\"f_{if} = \\frac{B}{\\alpha \\tau} = \\frac{2R}{T_c} \\cdot \\frac{B}{c}\" src=\"https://www.zhihu.com/equation?tex=f_%7Bif%7D+%3D+%5Cfrac%7BB%7D%7B%5Calpha+%5Ctau%7D+%3D+%5Cfrac%7B2R%7D%7BT_c%7D+%5Ccdot+%5Cfrac%7BB%7D%7Bc%7D\" /></p>\n<p>通过测量 <img alt=\"f_{if}\" src=\"https://www.zhihu.com/equation?tex=f_%7Bif%7D\" /> 即可解算出距离 <img alt=\"R\" src=\"https://www.zhihu.com/equation?tex=R\" />：</p>\n<p><img alt=\"R = \\frac{c T_c}{2 B} f_{if}\" src=\"https://www.zhihu.com/equation?tex=R+%3D+%5Cfrac%7Bc+T_c%7D%7B2+B%7D+f_%7Bif%7D\" /></p>\n<p>这表明距离与中频频率成正比。</p>\n<p>对于速度为<img alt=\"v\" src=\"https://www.zhihu.com/equation?tex=v\" />的移动目标，时间延迟不再是常数，且会产生多音勒频移。</p>\n<p>往返延迟变为：<img alt=\"\\tau(t)=2（R+vt)/c\" src=\"https://www.zhihu.com/equation?tex=%5Ctau%28t%29%3D2%EF%BC%88R%2Bvt%29%2Fc\" /></p>\n<p>在三角波调制的一个扫频周期内(如上扫频段和下扫频段),中频频率会不同：</p>\n<p>上扫频段(频率增加):<img alt=\"f_if^+=f_{if}-f_d\" src=\"https://www.zhihu.com/equation?tex=f_if%5E%2B%3Df_%7Bif%7D-f_d\" /></p>\n<p>下扫频段(频率减小):<img alt=\"f_if^-=f_{if}+f_d\" src=\"https://www.zhihu.com/equation?tex=f_if%5E-%3Df_%7Bif%7D%2Bf_d\" /></p>\n<p>其中，<img alt=\"f_{if}=\\frac BT_c\\cdot\\frac{2R}c\" src=\"https://www.zhihu.com/equation?tex=f_%7Bif%7D%3D%5Cfrac+BT_c%5Ccdot%5Cfrac%7B2R%7Dc\" />是由距离引起的拍频，<img alt=\"f_d=\\frac{2vf_c}c\" src=\"https://www.zhihu.com/equation?tex=f_d%3D%5Cfrac%7B2vf_c%7Dc\" /> 是由速度引起的多普勒频移。</p>\n<p>·通过测量上下扫频段的中频频率<img alt=\"f_{if}^+\" src=\"https://www.zhihu.com/equation?tex=f_%7Bif%7D%5E%2B\" />和<img alt=\"f_{if}^-\" src=\"https://www.zhihu.com/equation?tex=f_%7Bif%7D%5E-\" />,可以解算出距离和速度：</p>\n<p>距离拍频 : <img alt=\"f_{b}= \\frac {f_{if}^{+ }+ f_{if}^{- }}2\\Rightarrow\" src=\"https://www.zhihu.com/equation?tex=f_%7Bb%7D%3D+%5Cfrac+%7Bf_%7Bif%7D%5E%7B%2B+%7D%2B+f_%7Bif%7D%5E%7B-+%7D%7D2%5CRightarrow\" /> <img alt=\"R= \\frac {cT_{c}}{2B}f_{b}\" src=\"https://www.zhihu.com/equation?tex=R%3D+%5Cfrac+%7BcT_%7Bc%7D%7D%7B2B%7Df_%7Bb%7D\" /></p>\n<p>多普勒频移 : <img alt=\"f_{d}= \\frac {f_{if}^{- }- f_{if}^{+ }}2\\Rightarrow\" src=\"https://www.zhihu.com/equation?tex=f_%7Bd%7D%3D+%5Cfrac+%7Bf_%7Bif%7D%5E%7B-+%7D-+f_%7Bif%7D%5E%7B%2B+%7D%7D2%5CRightarrow\" /> <img alt=\"v= \\frac c{2f_{c}}f_{d}\" src=\"https://www.zhihu.com/equation?tex=v%3D+%5Cfrac+c%7B2f_%7Bc%7D%7Df_%7Bd%7D\" /></p>\n<p>如果实际场景中有多个目标，中频信号是多个正弦波的叠加。通过以下步骤解析：</p>\n<ol>\n<li>距离维FFT（快时间FFT）：对单个扫频周期内的中频信号采样进行FFT，峰值位置对应fif​从而得到目标的距离。</li>\n<li>速度维FFT（慢时间FFT）：对连续多个扫频周期在相同距离门上的中频信号相位做FFT，峰值位置对应多普勒频移fd​，从而得到目标的径向速度。</li>\n</ol>\n<p>FMCW雷达通过测量发射与接收线性调频信号之间的频率差（拍频）来测距，利用上下扫频的拍频差异或多普勒效应来测速。其数学核心是线性调频信号的时延与频率差的线性关系，并通过二维FFT高效提取多目标的距离和速度信息。</p>\n<h3>3.2 IMU</h3>\n<p>IMU（惯性测量单元）由陀螺仪、加速度计和磁力计组成，可测量物体在三维空间的角速度、加速度及磁场信息，通过传感器融合算法获得精准姿态。</p>\n<ul>\n<li>陀螺仪基于科里奥利力原理测量角速度，优点是短时精度高，但存在温漂和积分漂移。</li>\n<li>加速度计利用牛顿第二定律测量三轴加速度，可直接推算俯仰和横滚角，但易受运动加速度干扰。</li>\n<li>磁力计基于霍尔效应测量地磁场强度，提供航向角参考，但易受环境磁干扰。</li>\n</ul>\n<p><img alt=\"\" src=\"https://pic3.zhimg.com/v2-83c617d14f40fdba4a792a72acc6829a_1440w.jpg\" /></p>\n<p>加表和陀螺仪简单原理（当然光纤陀螺比这复杂多了，又是解耦地球又是标定和接触漂移噪声，咱们不说这个，有机会单独说光纤的）</p>\n<p>姿态表示方法包括：</p>\n<ul>\n<li>欧拉角：直观但存在万向节死锁问题。</li>\n<li>旋转矩阵：数学严谨，计算量大。</li>\n<li>四元数：无奇异性，适合实时姿态解算。</li>\n</ul>\n<p>我个人认为四元数好，但至少要懂得SU(2)群。</p>\n<p>四元数乘法是其核心运算，用于组合三维旋转。四元数一般表示为<img alt=\"q=a+b\\mathbf{i}+c\\mathbf{j}+d\\mathbf{k}\" src=\"https://www.zhihu.com/equation?tex=q%3Da%2Bb%5Cmathbf%7Bi%7D%2Bc%5Cmathbf%7Bj%7D%2Bd%5Cmathbf%7Bk%7D\" />,其中<img alt=\"a\" src=\"https://www.zhihu.com/equation?tex=a\" />为标量部，<img alt=\"(b,c,d)\" src=\"https://www.zhihu.com/equation?tex=%28b%2Cc%2Cd%29\" />为向量部。</p>\n<p><img alt=\"\\mathbf{i,j,k}\" src=\"https://www.zhihu.com/equation?tex=%5Cmathbf%7Bi%2Cj%2Ck%7D\" />为虚数单位并满足以下基本规则：</p>\n<p><img alt=\"\\mathbf{i}^2=\\mathbf{j}^2=\\mathbf{k}^2=\\mathbf{i}\\mathbf{j}\\mathbf{k}=-1\" src=\"https://www.zhihu.com/equation?tex=%5Cmathbf%7Bi%7D%5E2%3D%5Cmathbf%7Bj%7D%5E2%3D%5Cmathbf%7Bk%7D%5E2%3D%5Cmathbf%7Bi%7D%5Cmathbf%7Bj%7D%5Cmathbf%7Bk%7D%3D-1\" /></p>\n<p>由此可推导出两两相乘的规则：</p>\n<p><img alt=\"\\mathrm{ij=k,\\quad ji=-k;\\quad jk=i,\\quad kj=-i;\\quad ki=j,\\quad ik=-j}\" src=\"https://www.zhihu.com/equation?tex=%5Cmathrm%7Bij%3Dk%2C%5Cquad+ji%3D-k%3B%5Cquad+jk%3Di%2C%5Cquad+kj%3D-i%3B%5Cquad+ki%3Dj%2C%5Cquad+ik%3D-j%7D\" /></p>\n<p>乘法公式 给定两个四元数 <img alt=\"p = a + bi + cj + dk\" src=\"https://www.zhihu.com/equation?tex=p+%3D+a+%2B+bi+%2B+cj+%2B+dk\" /> 和 <img alt=\"q = e + fi + gj + hk\" src=\"https://www.zhihu.com/equation?tex=q+%3D+e+%2B+fi+%2B+gj+%2B+hk\" />，分量展开式： <img alt=\"p \\otimes q = (ae - bf - cg - dh) \\ + (af + be + ch - dg)i \\ + (ag - bh + ce + df)j \\ + (ah + bg - cf + de)k\" src=\"https://www.zhihu.com/equation?tex=p+%5Cotimes+q+%3D+%28ae+-+bf+-+cg+-+dh%29+%5C%5C+%2B+%28af+%2B+be+%2B+ch+-+dg%29i+%5C%5C+%2B+%28ag+-+bh+%2B+ce+%2B+df%29j+%5C%5C+%2B+%28ah+%2B+bg+-+cf+%2B+de%29k\" />标量-向量形式（令 <img alt=\"\\mathbf{v} = (b, c, d)\" src=\"https://www.zhihu.com/equation?tex=%5Cmathbf%7Bv%7D+%3D+%28b%2C+c%2C+d%29\" />，<img alt=\"\\mathbf{u} = (f, g, h)\" src=\"https://www.zhihu.com/equation?tex=%5Cmathbf%7Bu%7D+%3D+%28f%2C+g%2C+h%29\" />）： <img alt=\"p \\otimes q = (ae - \\mathbf{v} \\cdot \\mathbf{u}) + (a\\mathbf{u} + e\\mathbf{v} + \\mathbf{v} \\times \\mathbf{u})\" src=\"https://www.zhihu.com/equation?tex=p+%5Cotimes+q+%3D+%28ae+-+%5Cmathbf%7Bv%7D+%5Ccdot+%5Cmathbf%7Bu%7D%29+%2B+%28a%5Cmathbf%7Bu%7D+%2B+e%5Cmathbf%7Bv%7D+%2B+%5Cmathbf%7Bv%7D+%5Ctimes+%5Cmathbf%7Bu%7D%29\" /></p>\n<p>其中“<img alt=\"\\cdot\" src=\"https://www.zhihu.com/equation?tex=%5Ccdot\" />”为点积，“<img alt=\"\\times\" src=\"https://www.zhihu.com/equation?tex=%5Ctimes\" />”为叉积。此形式清晰地揭示了乘法包含点积和叉积的混合运算。在三维旋转中，一个绕单位轴 <img alt=\"\\mathbf{n}\" src=\"https://www.zhihu.com/equation?tex=%5Cmathbf%7Bn%7D\" />旋转<img alt=\"\\theta\" src=\"https://www.zhihu.com/equation?tex=%5Ctheta\" />角的操作可用单位四元数 <img alt=\"q=\\cos(\\theta/2)+\\sin(\\theta/2)\\mathbf{n}\" src=\"https://www.zhihu.com/equation?tex=q%3D%5Ccos%28%5Ctheta%2F2%29%2B%5Csin%28%5Ctheta%2F2%29%5Cmathbf%7Bn%7D\" />表示。对点 v (视为纯四元数)进行旋 转，运算为 <img alt=\"\\mathbf{v}^{\\prime}=q\\otimes\\mathbf{v}\\otimes q^{-1}\" src=\"https://www.zhihu.com/equation?tex=%5Cmathbf%7Bv%7D%5E%7B%5Cprime%7D%3Dq%5Cotimes%5Cmathbf%7Bv%7D%5Cotimes+q%5E%7B-1%7D\" />。连续饷转即对应四元数的连续乘法：先执行旋转<img alt=\"q_1\" src=\"https://www.zhihu.com/equation?tex=q_1\" />再执行<img alt=\"q_2\" src=\"https://www.zhihu.com/equation?tex=q_2\" />,等价于用四元数 <img alt=\"q=q_2\\otimes q_1\" src=\"https://www.zhihu.com/equation?tex=q%3Dq_2%5Cotimes+q_1\" />进行单次 旋转(注意乘序：后发生的旋转乘在前面)。</p>\n<p>四元数与三维旋转的关系是理解现代旋转表示的核心，其背后是李群SO3)与 SU(2)的深刻联系。四元数单位球与 SU(2)群同构，而 SU(2)是 SO(3)的双重覆盖 (2:1 映射)。这意味着每个三维旋转对应两个符号相反的单位四元数。</p>\n<p>定义为所有行列式为1的3x3实正交矩阵构成的群：</p>\n<p><img alt=\"SO(3)={R\\in\\mathbb{R}^{3\\times3}\\mid R^TR=I,\\mathrm{~det}(R)=1}\" src=\"https://www.zhihu.com/equation?tex=SO%283%29%3D%5C%7BR%5Cin%5Cmathbb%7BR%7D%5E%7B3%5Ctimes3%7D%5Cmid+R%5ETR%3DI%2C%5Cmathrm%7B~det%7D%28R%29%3D1%5C%7D\" /></p>\n<p>它描述了三维空间中的所有刚体旋转。其对应的李代数 so(3)是所有3x3实反对称矩阵的集合：</p>\n<p><img alt=\"so(3)={\\omega\\in\\mathbb{R}^{3\\times3}\\mid\\omega^T=-\\omega}\" src=\"https://www.zhihu.com/equation?tex=so%283%29%3D%5C%7B%5Comega%5Cin%5Cmathbb%7BR%7D%5E%7B3%5Ctimes3%7D%5Cmid%5Comega%5ET%3D-%5Comega%5C%7D\" /></p>\n<p>其中每个元素<img alt=\"\\omega\" src=\"https://www.zhihu.com/equation?tex=%5Comega\" />对应一个旋转轴和角度，可通过指数映射<img alt=\"R=\\exp(\\omega)\" src=\"https://www.zhihu.com/equation?tex=R%3D%5Cexp%28%5Comega%29\" />得到旋转矩阵。</p>\n<p>SU(2) 特殊酉群定义为所有行列式为1的2×2复酉矩阵构成的群：</p>\n<p><img alt=\"SU(2)={U\\in\\mathbb{C}^{2\\times 2}\\mid U^\\dagger U=I,\\ \\det(U)=1}\" src=\"https://www.zhihu.com/equation?tex=SU%282%29%3D%5C%7BU%5Cin%5Cmathbb%7BC%7D%5E%7B2%5Ctimes+2%7D%5Cmid+U%5E%5Cdagger+U%3DI%2C%5C+%5Cdet%28U%29%3D1%5C%7D\" /></p>\n<p>其一般形式可写为：</p>\n<p><img alt=\" U=\\begin{pmatrix}\\alpha&amp;-\\bar{\\beta}\\\\beta&amp;\\bar{\\alpha}\\end{pmatrix},\\quad |\\alpha|^2+|\\beta|^2=1\" src=\"https://www.zhihu.com/equation?tex=+U%3D%5Cbegin%7Bpmatrix%7D%5Calpha%26-%5Cbar%7B%5Cbeta%7D%5C%5C%5Cbeta%26%5Cbar%7B%5Calpha%7D%5Cend%7Bpmatrix%7D%2C%5Cquad+%7C%5Calpha%7C%5E2%2B%7C%5Cbeta%7C%5E2%3D1\" /></p>\n<p>其李代数 su(2) 是所有迹为零的2×2反厄米特矩阵的集合。 单位四元数 所有满足 <img alt=\"a^2+b^2+c^2+d^2=1\" src=\"https://www.zhihu.com/equation?tex=a%5E2%2Bb%5E2%2Bc%5E2%2Bd%5E2%3D1\" /> 的四元数 <img alt=\"q=a+bi+cj+dk\" src=\"https://www.zhihu.com/equation?tex=q%3Da%2Bbi%2Bcj%2Bdk\" /> 构成一个三球面 <img alt=\"S^3\" src=\"https://www.zhihu.com/equation?tex=S%5E3\" />。四元数 <img alt=\"\\longleftrightarrow\" src=\"https://www.zhihu.com/equation?tex=%5Clongleftrightarrow\" /> SU(2) 存在一个同构关系。将四元数 <img alt=\"q=a+bi+cj+dk\" src=\"https://www.zhihu.com/equation?tex=q%3Da%2Bbi%2Bcj%2Bdk\" /> 映射到 SU(2) 矩阵：</p>\n<p><img alt=\"q\\mapsto U=\\begin{pmatrix}a+di&amp;-b+ci\\b+ci&amp;a-di\\end{pmatrix}=aI+b(i\\sigma_x)+c(i\\sigma_y)+d(i\\sigma_z)\" src=\"https://www.zhihu.com/equation?tex=q%5Cmapsto+U%3D%5Cbegin%7Bpmatrix%7Da%2Bdi%26-b%2Bci%5C%5Cb%2Bci%26a-di%5Cend%7Bpmatrix%7D%3DaI%2Bb%28i%5Csigma_x%29%2Bc%28i%5Csigma_y%29%2Bd%28i%5Csigma_z%29\" /></p>\n<p>其中<img alt=\"\\sigma_x,\\sigma_y,\\sigma_z\" src=\"https://www.zhihu.com/equation?tex=%5Csigma_x%2C%5Csigma_y%2C%5Csigma_z\" />是泡利矩阵。这个映射是一一对应的，因此单位四元数群与 SU(2)在群结构上完全相同。</p>\n<p>在导航坐标系 (通常为“东北天”ENU或“北东地”NED) 到载体坐标系 (前-有-下)的变换中，当前姿态完全由一个单位四元数<img alt=\"\\Psi^{n}\" src=\"https://www.zhihu.com/equation?tex=%5CPsi%5E%7Bn%7D\" />描述。它代表了从载体坐标系(b)到导航坐标系(n)的旋转。导航系下的向量 <img alt=\"\\mathbf{v}^{n}\" src=\"https://www.zhihu.com/equation?tex=%5Cmathbf%7Bv%7D%5E%7Bn%7D\" />与载体系下的向量 <img alt=\"\\mathbf{v}^{b}\" src=\"https://www.zhihu.com/equation?tex=%5Cmathbf%7Bv%7D%5E%7Bb%7D\" />通过四元数关联：</p>\n<p><img alt=\"\\mathbf{v}^n=\\mathbf{q}_b^n\\otimes\\mathbf{v}^b\\otimes(\\mathbf{q}_b^n)^*\" src=\"https://www.zhihu.com/equation?tex=%5Cmathbf%7Bv%7D%5En%3D%5Cmathbf%7Bq%7D_b%5En%5Cotimes%5Cmathbf%7Bv%7D%5Eb%5Cotimes%28%5Cmathbf%7Bq%7D_b%5En%29%5E%2A\" /></p>\n<p>其中 <img alt=\"\\otimes\" src=\"https://www.zhihu.com/equation?tex=%5Cotimes\" />是四元数乘法，*表示共轭。当载体以角速度<img alt=\"\\omega^b=[\\omega_x,\\omega_y,\\omega_z]^T\" src=\"https://www.zhihu.com/equation?tex=%5Comega%5Eb%3D%5B%5Comega_x%2C%5Comega_y%2C%5Comega_z%5D%5ET\" /> (在载体坐标系中测量，通常来自陀螺仪)旋转时，姿态四元数遵循以下微分方程：</p>\n<p><img alt=\"\\dot{\\mathbf{q}}_{b}^{n}=\\frac{1}{2}\\mathbf{q}_{b}^{n}\\otimes\\boldsymbol{\\omega}_{q}^{b}\" src=\"https://www.zhihu.com/equation?tex=%5Cdot%7B%5Cmathbf%7Bq%7D%7D_%7Bb%7D%5E%7Bn%7D%3D%5Cfrac%7B1%7D%7B2%7D%5Cmathbf%7Bq%7D_%7Bb%7D%5E%7Bn%7D%5Cotimes%5Cboldsymbol%7B%5Comega%7D_%7Bq%7D%5E%7Bb%7D\" /></p>\n<p>其中<img alt=\"\\omega_q^b=[0,\\omega_x,\\omega_y,\\omega_z]_\\text{。}\" src=\"https://www.zhihu.com/equation?tex=%5Comega_q%5Eb%3D%5B0%2C%5Comega_x%2C%5Comega_y%2C%5Comega_z%5D_%5Ctext%7B%E3%80%82%7D\" /></p>\n<p>则其离散化求解：</p>\n<p><img alt=\"\\mathbf{q}_b^n(t+\\Delta t)\\approx\\mathbf{q}_b^n(t)\\otimes\\left(\\cos\\left(\\frac{|\\boldsymbol{\\omega}|\\Delta t}2\\right)\\mathbf{I}+\\frac{\\sin\\left(\\frac{|\\boldsymbol{\\omega}|\\Delta t}2\\right)}{|\\boldsymbol{\\omega}|}\\boldsymbol{\\omega}_q^b\\right)\" src=\"https://www.zhihu.com/equation?tex=%5Cmathbf%7Bq%7D_b%5En%28t%2B%5CDelta+t%29%5Capprox%5Cmathbf%7Bq%7D_b%5En%28t%29%5Cotimes%5Cleft%28%5Ccos%5Cleft%28%5Cfrac%7B%5C%7C%5Cboldsymbol%7B%5Comega%7D%5C%7C%5CDelta+t%7D2%5Cright%29%5Cmathbf%7BI%7D%2B%5Cfrac%7B%5Csin%5Cleft%28%5Cfrac%7B%5C%7C%5Cboldsymbol%7B%5Comega%7D%5C%7C%5CDelta+t%7D2%5Cright%29%7D%7B%5C%7C%5Cboldsymbol%7B%5Comega%7D%5C%7C%7D%5Cboldsymbol%7B%5Comega%7D_q%5Eb%5Cright%29\" /></p>\n<p>这本质上是将每个时间步内的小旋转 (由陀螺仪数据给出)通过四元数乘法累加到当前姿态上。此方法避免了欧拉角积分时的奇异性 (万向节锁)问题。</p>\n<p>传感器噪声与校准 IMU误差分为确定性误差（零偏、尺度因子、非正交）和随机误差（高斯白噪声、随机游走）。 常用校准方法：</p>\n<ul>\n<li>六面法：静态放置六个方向，标定零偏与尺度因子。</li>\n<li>Allan方差法：分析随机噪声特性，提取随机游走参数。</li>\n</ul>\n<p>姿态解算算法（不写了不写了，这些都可以查到，自己查吧~~）</p>\n<ul>\n<li>互补滤波：融合陀螺仪高频与加速度/磁力计低频信息，简单高效。</li>\n<li>AHRS（如Mahony、Madgwick）：基于四元数的非线性优化，动态性能优良。</li>\n<li>卡尔曼滤波：建立状态空间模型，融合多源观测，精度高但计算量大。</li>\n</ul>\n<h2>总结：</h2>\n<p><img alt=\"\" src=\"https://pic1.zhimg.com/v2-76d6149d602874cbe01fdced43dd3ba2_1440w.jpg\" /></p>\n<p>物理AI韦恩图/与人类对比</p>\n<p>我觉得这张图总结到位了，不需要说啥了。</p>\n<p>以上就是物理AI以我个人爱好方向（AI4S为重，数学为重）的一个简介，夹杂了一些我对于未来方向的思考~~~</p>"
    }
  ],
  "latest_overview": [
    {
      "title": "",
      "body_html": "<h1>当物理遇上AI：深度学习里的物理元素（下）</h1>\n<ul>\n<li>来源平台: <strong>zhihu</strong>（知乎专栏文章）</li>\n<li>原文链接: <a href=\"https://zhuanlan.zhihu.com/p/2045400658237469383\">https://zhuanlan.zhihu.com/p/2045400658237469383</a></li>\n<li>作者: 金白石</li>\n</ul>\n<hr />\n<p>当物理遇上AI：深度学习里的物理元素（下）</p>\n<h1>当物理遇上AI：深度学习里的物理元素（下）</h1>\n<p>作者: 金白石, 赞: 41</p>\n<h3>引子</h3>\n<p>上篇梳理了物理学已经嵌进AI的部分。能量、熵、自由能、Hopfield、对称性、重整化群，这些是既成事实，板上钉钉。整个深度学习的数学骨架里，物理学的工具一件件被借了过去，用得很顺手。</p>\n<p><a href=\"https://zhuanlan.zhihu.com/p/2043573397960099395\">当物理遇上AI：深度学习里的物理元素（上）</a></p>\n<p>但AI这门学科除了既成事实，还有一批更深的问题。Scaling Law为什么是幂律？某些能力为什么在某个规模突然出现？双下降曲线为什么和经典统计学唱反调？Grokking这种”过拟合之后突然学会泛化”的现象到底是怎么回事？所有AI的研究人员都看到了这些现象，但没有人能从理论上解释。它们被业内称为AI的open questions。</p>\n<p>一个物理学家看到这批问题，会有一种特殊的感受：似曾相识。物理学过去一百多年里，面对自然界时碰到过结构上非常相似的谜。幂律对应临界标度律，突然出现对应相变，”过拟合后突然好”对应过冷液体的晶化，违反经典统计学预期的双下降对应高维统计的相变现象。每一个AI open question都能在物理工具箱里找到一个长相相似的兄弟。</p>\n<p>这种”似曾相识”有几分是真的？是物理工具箱里的工具真的能拿来推AI的现象，还是只是表面像？这是本篇要追问的第一件事。</p>\n<p>第二件事更重要：物理学家如何在AI里下注。这件事已经做了二十年，有一套被群体默契接受的标准流程，产生了少数中奖的彩票（扩散模型最出名），也产生了大量没中奖的彩票（自旋玻璃→损失曲面、重整化群→深度学习、张量网络→分类器）。把成功案例和失败案例放到一起，能看出物理方法论在AI里真正的命中率，以及下一步有没有更好的方式。</p>\n<p>这两件事合到一起，指向一个更大的问题。物理学在自己的领地停滞了半个世纪，它的工具被AI接管使用，自己却没获得新的研究问题。AI会不会反过来给物理学带来第二春？答案藏在那些还没被认真试过的物理根族里：可积系统、Lindblad开放系统、KPZ表面生长、Hubbard-Heisenberg。下一张中奖的彩票可能就藏在其中某一个。</p>\n<p><img alt=\"\" src=\"https://pic2.zhimg.com/v2-68a70a5edaae8b7da9df477f01e29c65_1440w.jpg\" /></p>\n<h2>一、物理类比 AI：哪些是真同构，哪些只是看起来像</h2>\n<p>上篇讲了两层物理在AI里的位置。底层是物理数学直接嵌进AI，玻尔兹曼分布、变分自由能、Langevin动力学这些工具被搬过来当训练目标和采样机制。中层是物理直觉塑造了网络的形状，Hopfield的Ising能量函数、CNN的平移对称性、AlphaFold的E(3) 等变性、深度网络的”层”结构对应重整化群的逐层粗粒化。</p>\n<p>这两层有一个共同特征：物理的具体工具被用进AI了。要么公式直接搬过来用，要么物理直觉指导了架构设计。读者能看到一个清楚的因果链，是物理在主动贡献。</p>\n<p>第三层的性质不同。它讲的是另一种关系：”AI里有某个现象，它的行为规律和物理里某个已知现象的规律在数学上是同构的”。两边的研究对象完全不同，但是用同一套数学描述。</p>\n<p>这种同构如果成立，意义会很大。物理学已经有一套处理那个现象的完整理论，这套理论可以直接拿来预测AI的行为，给出定量预言。不需要在AI里再造一遍轮子。</p>\n<p>1900年的普朗克（Max Planck）面对黑体辐射就是这样。黑体辐射的实验曲线和经典理论完全对不上，多年没人能解释，直到普朗克找到了和谐振子能量量子化的同构。整个量子力学从这一刻炸出来。同构本身就是发现，找到了同构，剩下的工作有现成的数学。</p>\n<p>AI的open questions里，有没有哪个是”等待着自己的普朗克时刻”的黑体辐射？这是本篇要认真追问的问题。</p>\n<p>先说结论。AI的几个核心open questions里，物理第三层的证据强弱差异很大。</p>\n<p>第一档证据强的两个：Scaling Law和临界标度律的形式对应几乎严丝合缝，双下降的随机矩阵理论已经在线性模型上给出了严格推导。这两个有可能真的是数学上的同构。</p>\n<p>第二档证据中等的两个：损失曲面和球面自旋玻璃模型有严格的等价证明（但需要假设数据随机），Grokking和过冷液体晶化的物理图像很贴，但数学还没建立起来。</p>\n<p>第三档证据弱但有潜力的几个：涌现和相变形式上像，但Schaeffer等人的工作让这个对应变得有争议。神经网络表示空间的几何结构和拓扑物质有形式对应，但还在早期。In-Context Learning几乎找不到物理对应。</p>\n<p>这张分级地图就是本篇前半段的骨架。下面五章逐个展开。</p>\n<h2>二、第一朵乌云：Scaling Law 与临界标度律</h2>\n<p>物理第三层里证据最强、数学工作最扎实的方向，是Scaling Law。</p>\n<h3>2.1 一条不能解释的幂律</h3>\n<p>2020年1月，OpenAI的Jared Kaplan等人在arXiv上传《Scaling Laws for Neural Language Models》（arXiv:2001.08361）。这篇论文系统测量了一件事：语言模型的性能（test loss）随参数量N、数据量D、算力C的变化曲线。</p>\n<p>结果干净得让人意外。三条曲线都是幂律。Loss ∝ N^(-α），Loss ∝ D^(-β），把它们画在对数坐标轴上是直线。指数α_N约0.076，α_D约0.095。</p>\n<p><img alt=\"\" src=\"https://pic4.zhimg.com/v2-570d2f31282f270037507ca85345a9cf_1440w.jpg\" /></p>\n<p>Figure from Scaling Laws for Neural Language Models</p>\n<p>Kaplan测的参数范围从约1000到15亿（6个数量级），数据规模从22M到23B tokens（也是6个数量级），全程都成立。他还报告：在测的范围里，网络宽度、深度这些架构细节对幂律指数影响很小。模型性能怎么随规模涨，背后有一条对架构相对不敏感的规律。</p>\n<p>但没人能从理论上推导出这条幂律。也没人知道为什么指数是这两个数。一个工程界靠它指导训练GPT-3、GPT-4的核心经验规律，在理论上完全是黑箱。</p>\n<p>2022年DeepMind的Jordan Hoffmann等人在Chinchilla论文里重新检验了Kaplan的指数，发现Kaplan系统性低估了数据规模的重要性。修正后的核心结论：对每倍模型大小，token数应该等比例倍增（约20 tokens/parameter，跟Kaplan测的比例差很多）。这条修正没改变”幂律本身存在”的判断，只是改了具体指数。Scaling Law作为一个经验现象更加稳固，但它的精确形式仍在被持续修正。</p>\n<p><img alt=\"\" src=\"https://pic2.zhimg.com/v2-2cc70bf4f6c80a797c2727d66606e7f1_1440w.jpg\" /></p>\n<p>Figure from Jordan Hoffmann et al. (2022)</p>\n<h3>2.2 物理学家认出了这个形状</h3>\n<p>这个形状物理学家见过太多次。物理里有一类标准结构叫<strong>临界标度律</strong>。</p>\n<p>物理系统在相变临界点附近，几乎所有可观测物理量都服从幂律。比如铁磁体在居里温度T_c附近，磁化强度M ∝ (T-T_c)^β，比热C ∝ |T-T_c|^(-α）。关键的事实是：这些临界指数对所有满足同一对称性的材料都一样。不同的材料，不同的微观相互作用，临界指数完全相同。物理学把这种现象叫”普适类”（universality class），意思是临界点附近的行为由系统的深层对称性决定，跟微观细节无关。</p>\n<p>AI的Scaling Law和这个形式完全一样。都是幂律，指数对实现细节不敏感，跨越多个数量级。Kaplan的论文里”换架构不影响指数”那句话，在物理学家眼里就是universality class的标志。</p>\n<p>还有一层：临界标度律的背后是<strong>重整化群</strong>。系统在临界点附近的行为由重整化群的不动点决定。如果AI的Scaling Law真的是临界标度律，上篇5.x节讲过的重整化群在这里又一次出现了。物理工具箱里的同一把工具，被用在AI里的不同层级。</p>\n<p><img alt=\"\" src=\"https://pic3.zhimg.com/v2-6f4a8ab00ebb8d5ec05397d26be91094_1440w.jpg\" /></p>\n<h3>2.3 有人开始认真做这件事</h3>\n<p>Eric Michaud、Liu、Girit、Tegmark 2023年那篇arXiv:2303.13506《The Quantization Model of Neural Scaling》是这个方向走得比较深的一次尝试，2024年正式收进NeurIPS。</p>\n<p>他们的想法是把Scaling Law拆解成”quanta”（离散的能力块）的累积。每个quantum是模型在数据里学到的一个具体技能。当quanta按使用频率降序学习时，频率分布本身的幂律就能解释loss随规模的幂律下降。这套框架同时预测了Scaling Law和涌现，因为新quanta被学会的时刻对应能力的突然出现。</p>\n<p>这种工作走得更远。它要从理论上推出指数α、β应该是多少，然后和实验对照，而不是停留在”Scaling Law看起来像临界标度律”这个判断上。如果这条路走通，AI的Scaling Law会从”经验观测到的规律”变成”可以从第一性原理推导的理论预言”。意义会非常大。</p>\n<p><img alt=\"\" src=\"https://pica.zhimg.com/v2-15770bf91008635c0d37ed6628895a4c_1440w.jpg\" /></p>\n<h3>2.4 诚实地说：机制层面还没打通</h3>\n<p>临界标度律的物理来源是重整化群不动点。要把这套理论严格推到AI上，要回答几个问题：AI的”不动点”是什么？”临界点”在哪个维度上？”序参量”在AI语境下是什么？这些问题目前还没有清楚的答案。</p>\n<p>形式上的对应极强。指数普适、跨数量级、对细节不敏感，这些特征AI和物理临界现象都有。但机制层面的对应还差一步。AI不一定真的处在临界点附近，可能只是某种深层的统计普适性碰巧产生了类似的形式。</p>\n<p>诚实评估：这是AI的open questions里物理第三层证据最强的一个。有可能是真实的同构，但还没被严格证明。这是本篇里最值得长期跟踪的一个方向。</p>\n<h2>三、第二朵乌云：涌现与相变</h2>\n<p>第二个open question是涌现。这是物理第三层里最戏剧性的对应，但也是被质疑过的。</p>\n<h3>3.1 一件让所有人困惑的事</h3>\n<p>语言模型有一种特别的行为：某个能力在小规模时完全不存在，超过某个规模突然出现，像开关被拨动。</p>\n<p>2022年6月，Google的Jason Wei等人在arXiv上传了《Emergent Abilities of Large Language Models》（arXiv:2206.07682），TMLR同年发表。论文系统记录了一组”涌现能力”：算术推理、多步推理、语言类比、TruthfulQA等等。</p>\n<p><img alt=\"\" src=\"https://pic2.zhimg.com/v2-9f87538ea341a9a259249e880196723d_1440w.jpg\" /></p>\n<p>模型的“涌现”能力 from Wei et al. (2022)</p>\n<p>这些能力的图像有多奇怪？以三位数加法为例：在1000亿参数以下，所有不同规模的模型准确率都接近零。超过某个规模阈值，准确率突然跳到70% 以上。中间的过程几乎完全不可见。</p>\n<p>这种”突然”在工程上很麻烦。它意味着小模型的能力曲线无法外推到大模型。GPT-3之前没人能用GPT-2的曲线预言GPT-3会出现什么新能力。</p>\n<h3>3.2 物理学家的反应：这不就是相变？</h3>\n<p>水到一百度突然变成蒸汽，铁磁体过居里点突然失磁。这种”突然”在物理里有严格的定义，是热力学极限下的不连续。系统的某个宏观量（密度、磁化、序参量）在某个控制参数处发生不连续跳变。</p>\n<p>朗道（Lev Landau）1937年的相变理论给了这件事一个数学骨架。定义一个序参量（order parameter），它在相变点从零跳到非零，对应一个对称性的破缺。一阶相变是序参量本身的不连续跳变，二阶相变是序参量的导数不连续。</p>\n<p><img alt=\"\" src=\"https://pic3.zhimg.com/v2-756b5a69e4fccfed34e2b36d5c066116_1440w.jpg\" /></p>\n<p>物质的相变 from wiki</p>\n<p>AI涌现和这个形式上几乎完全一样。把准确率当成序参量，参数规模当成控制参数。某个规模处准确率从近零跳到高值，看起来正是朗道理论里的相变。物理学家看到Wei那篇论文时的第一反应几乎都是这个。</p>\n<h3>3.3 一个严重的质疑</h3>\n<p>但2023年4月，Stanford的Rylan Schaeffer、Brando Miranda、Sanmi Koyejo在arXiv上传《Are Emergent Abilities of Large Language Models a Mirage?》（arXiv:2304.15004），论文当年拿了NeurIPS 2023的Outstanding Paper Award。</p>\n<p>他们提出一个问题：AI的”涌现”是不是测量方式造成的幻觉？</p>\n<p>他们的发现：如果换一个更连续的指标（比如token-level的log-likelihood，而不是整道题对错的0-1准确率），涌现现象消失了，曲线变成连续平滑增长。</p>\n<p>意思是：离散的准确率指标本身造成了”看起来像突然出现”的错觉，底层的连续量其实是平滑增长的。当模型从”做对5% 的步骤”涨到”做对95% 的步骤”时，整道题的对错从0跳到1，但底层的步骤准确率是连续涨的。</p>\n<p>这个发现让”AI涌现 = 真实相变”这个类比的基础动摇。如果离散指标的幻觉解释了大多数涌现，那物理第三层在这里就只是测量伪影，不是真同构。</p>\n<h3>3.4 争议没有结束</h3>\n<p>Schaeffer的质疑也被反质疑。并不是所有涌现都能被连续指标消解。某些算法能力（比如多位数乘法、特定的推理任务）即使在更细的指标下也确实存在阈值。Anthropic和Google DeepMind后续的工作里都报告过某些任务有真正的相变特征。</p>\n<p>Michaud那套Quantization Model在这里也提供了一个新视角。如果模型的能力是由离散的quanta累积的，每学到一个新quantum对应一个能力跳变，那物理上像一阶相变是有可能的。但quanta本身的频率分布决定了宏观曲线是平滑的，所以又像Schaeffer说的”测量幻觉”。两种观点在这个框架下可以同时成立。</p>\n<p>诚实评估：这是物理第三层里最戏剧性的类比，但证据有争议。目前的状态是”可能是真实相变，也可能只是测量幻觉，可能两者都有”，尚未定论。这是本篇里最需要继续观察实验结果的一个方向。</p>\n<h2>四、第三朵乌云：双下降与随机矩阵</h2>\n<p>双下降是物理工具进AI进得最深的一条。其他open question里物理工具大多还停在”形式上像”的层次，这一条已经走完了下一步。物理学的数学工具被直接拿来，把这条AI曲线精确地推出来了。两边能画等号。</p>\n<h3>4.1 一条让统计学教科书翻车的曲线</h3>\n<p>机器学习教科书的第一章都会先讲一条U形曲线，叫<strong>偏差-方差权衡</strong>。这条曲线的故事是这样。模型太简单时学不会东西，误差大（这叫”欠拟合”）。模型变复杂之后误差降下来。到某个甜蜜点之后，模型开始死记硬背训练数据，新数据反而做不好，误差又涨上去（这叫”过拟合”）。整体画出来一个U形，最优解在U的底部。这条规律统治了统计学几十年，是几乎所有人的常识。</p>\n<p>2018年底，Ohio State的Mikhail Belkin和几个合作者做了一件让所有人意外的事。他们没停在U形的底部，继续把模型变大，看看会发生什么。结果在一个特定的点（模型参数数刚好等于训练数据点数）之后，误差不仅没继续上升，反过来重新开始下降，最终比U形底部还低。这条”先降后升再降”的曲线被他们叫做<strong>双下降</strong>（double descent，论文2019年发在PNAS，arXiv:1812.11118）。</p>\n<p><img alt=\"\" src=\"https://picx.zhimg.com/v2-6ba50c6e640bb3d82cc8c41dd8b6561b_1440w.jpg\" /></p>\n<p>Double Descent示意图</p>\n<p>这件事直接打脸了几十年统计学教科书。但它对今天的大模型时代意义重大。GPT-4有上万亿参数，按经典统计学早就该过拟合烂掉了，实际却越大越好。双下降是”为什么大模型work”这个谜的关键侧面。它告诉所有人，大模型工作的机制跟教科书写的完全是另一套。</p>\n<h3>4.2 物理工具直接推出了它</h3>\n<p>经典统计学解释不了双下降，但物理学家手里有一套现成的工具，直接把它推出来了。</p>\n<p>这套工具叫<strong>随机矩阵理论</strong>。它的出身在核物理。1950年代物理学家想算重原子核里几百个核子的能级分布，发现一个个算下去根本算不动，太复杂了。物理学家Eugene Wigner换了个思路：既然算不清精确解，那就用一个随机矩阵当核子相互作用的代理，问”随机矩阵的特征值大致按什么规律分布”。这个看起来粗暴的简化竟然给出了和实验对得上号的预言。从那以后物理学家磨这个工具磨了快70年，整理出一整套描述”随机矩阵谱性质”的数学。</p>\n<p><img alt=\"\" src=\"https://pic2.zhimg.com/v2-6c7f48eb64fb4921c6cd7df49a7798cd_1440w.jpg\" /></p>\n<p>2019年，Stanford的Trevor Hastie联合Andrea Montanari等人把这套核物理工具搬到了双下降上（arXiv:1903.08560，2022年正式发表在Annals of Statistics）。做法是这样：把神经网络的训练问题改写成一个高维矩阵问题，然后用物理学家磨好的工具去算这个矩阵的行为。结果是一组定量预言，包括双下降的峰值出现在哪、峰值有多高、过了峰值之后衰减得多快。全部能从理论上推出来，和实验严格对得上号。</p>\n<p>这一步意义在哪？前面几章讲的物理对应都还停在”AI里有现象，物理里有像的现象，形式上对得上”的类比层级。这一条不一样，物理学的数学工具直接给出了AI现象的精确数学描述。两边能画等号。</p>\n<p>物理学家看这件事还有一个直观图像：模型参数刚好等于数据点数那个临界点，AI系统从一个”相”切到了另一个”相”，整个行为机制变了。这跟水到100度突然变蒸汽是同一类现象（叫相变）。双下降的那个峰值就是相变点。</p>\n<h3>4.3 还在往真正的深度网络推</h3>\n<p>目前严格的随机矩阵分析主要做完了线性模型和核方法这种相对简单的对象。真正的深度神经网络（几十层、带非线性激活、几十亿参数）还没有完整的严格推导，但方向是对的，在一步步往那个目标推。</p>\n<p>几个代表性工作。Song Mei和Andrea Montanari 2019年（arXiv:1908.05355）把分析推到了两层神经网络的简化版本上。Jeffrey Pennington从ICML 2017起一系列工作用自由概率（随机矩阵理论的进阶版）研究了深度网络的关键性质。每一步都是物理工具在往神经网络的真实复杂度上推。</p>\n<p><img alt=\"\" src=\"https://pic4.zhimg.com/v2-d4a759d1800354e9c3aabe33fcb413df_1440w.jpg\" /></p>\n<p>Figure from Song Mei &amp; Andrea Montanari (2019)</p>\n<p>一个自然的问题是：能不能给GPT-4这种规模的真实网络也算出它的双下降曲线？从线性模型到真实深度网络，数学复杂度跨了好几个台阶，能不能做到、什么时候能做到，目前都是开放问题。</p>\n<p>诚实评估：这是物理工具进AI进得最深的一条。线性模型已经严格做完，深度网络是下一步。在本篇所有open question里，这是最接近”物理直接拿来用”那个理想状态的一个。</p>\n<h2>五、Grokking 与亚稳态</h2>\n<p>Grokking是几个open question里最神秘的一个。物理学家有一个非常对应的图像（过冷液体晶化），但严格的数学还没人做出来。</p>\n<h3>5.1 一个像”突然顿悟”的现象</h3>\n<p>想象一个学生第一周就把所有作业题的答案背了下来，作业卷子全对，但拿一道新题给他立刻不会做。继续让他做题做几十倍长时间，某一天他突然”开窍”了，从”背答案”切换成”懂底层规律”，新题也能做对了。这种”长期机械记忆之后突然懂”的现象在机器学习里也观察到了，叫grokking（这个词来自Heinlein科幻小说，意思是”彻底理解”）。</p>\n<p>2022年初，OpenAI的Alethea Power和几个合作者在一类小算法任务（比如模运算加法）上发现了这个现象（arXiv:2201.02177）。他们的Transformer训练几百步就把训练集的误差降到接近零，明显过拟合了。这时候测试集准确率接近瞎猜。按经典学习理论，这就是死局，已经背完了，继续训练只会更过拟合。但他们没停手，继续训练到原来的几十倍甚至几百倍时间。然后在某一刻，测试集准确率突然快速爬升，最终达到接近完美的泛化。</p>\n<p><img alt=\"\" src=\"https://pic4.zhimg.com/v2-b170b5ef6ef52adc6a19dd9a37eb3bad_1440w.jpg\" /></p>\n<p>这件事颠覆了一个常识。整个机器学习里有一条规则叫”早停”（early stopping）：一看到训练误差降下来而测试误差开始涨，就停。grokking说明这条规则在某些情况下是错的。继续训练下去可能会有”顿悟”。这背后的机制是什么，到今天还是开放问题。</p>\n<h3>5.2 物理图像：过冷液体的晶化</h3>\n<p>最接近的物理图像是<strong>亚稳态与晶化</strong>。把瓶装水放进冰箱缓慢降到零度以下，水仍然保持液体状态，没有结冰。这是一个<strong>亚稳态</strong>：能量比真正的冰高，但被某个能量势垒挡住了，没法直接跳过去。给它足够长的时间或者一点扰动（比如轻轻一敲），它会在某个时刻突然结晶，从亚稳态翻越势垒进入稳定态。</p>\n<p>神经网络在过拟合状态可以看作一个亚稳态。它找到了一个能完美拟合训练集的”记忆解”，但这个解没有真正学到底层规律。继续训练相当于在等它”结晶”到一个能量更低的”算法解”。这个算法解被某个势垒挡住，需要时间或随机扰动（梯度下降里的噪声）才能翻过去。</p>\n<p>这个图像后来被神经网络可解释性的实验证实了。2023年初Neel Nanda等人（arXiv:2301.05217，ICLR 2023）把grokking之后的Transformer”打开”看里面学到了什么，发现网络确实在内部实现了一个具体的算法：用离散傅里叶变换加三角恒等式做模加法。grokking是真实的模式切换过程，从”死记硬背”切到了”推导算法”，不是噪声里抖出来的偶然。”记忆”是亚稳态，”算法”是稳定态，跟过冷液体晶化的图像对得很贴。</p>\n<p><img alt=\"\" src=\"https://pic1.zhimg.com/v2-ec1e7bea8029ae2e6fa2c7714426ab66_1440w.jpg\" /></p>\n<h3>5.3 物理图像清楚，数学还没人做</h3>\n<p>物理上的图像清楚，但严格的数学还没建立。要把过冷液体的相变理论严格用到grokking上，要先把神经网络的损失曲面映射到一个有清晰势垒结构的物理系统，目前没人做到。Nanda那篇是机制层面的实验观察，不是物理数学层面的推导。</p>\n<p>诚实评估：这是几个open question里物理对应最贴、最值得物理学家认真做一遍的现象。物理图像现成，亚稳态和晶化的数学工具在统计物理里很成熟，工程上差的是”把它对到神经网络上”的具体桥梁。这件事谁先做出来，可能就是下一个像扩散模型那样的”物理→AI”成功案例。</p>\n<h2>六、其他值得关注的 open questions</h2>\n<p>前面四章讲了证据相对集中的四个open question。剩下的几个，物理对应强弱不一，每个单独写一章撑不起来。这一章一起过，给出一个完整地图。</p>\n<h3>6.1 损失曲面与自旋玻璃</h3>\n<p>神经网络训练的过程是在一个超高维空间里找解。这个空间里有无数个”局部最优”，也就是稍微动一下就变差的点。按常识，梯度下降应该掉进某个差的局部最优出不来，结果实际训练下来梯度下降总能找到不错的解。为什么？</p>\n<p>物理学家在一类无序磁性材料（叫<strong>自旋玻璃</strong>）里碰到过非常相似的局面。这类材料里几百万个小磁针互相耦合，能量曲面也有无数个局部最优。Giorgio Parisi（2021年诺贝尔物理奖得主之一）几十年前研究自旋玻璃时给出过一个反常识的预言：绝大多数局部最优的能量都接近全局最优。换句话说，掉进任何一个都不亏。</p>\n<p>如果神经网络的损失曲面真的和自旋玻璃等价，这条预言正好解释了梯度下降为什么能work。2015年Anna Choromanska联合Yann LeCun等人在AISTATS发了一篇论文（arXiv:1412.0233），严格证明了在数据是随机的假设下，深度网络的损失曲面和球面自旋玻璃模型数学等价。</p>\n<p>但这个等价有个核心假设：数据随机。真实数据有结构，跟随机数据差很远。后来的实验观察发现，真实的损失曲面比球面自旋玻璃友好得多，有大片平坦的极小值区域和低损失的连接路径，跟”无序自旋玻璃”那种崎岖图像差距明显。Choromanska的工作框架对了一半，预言对了一半，但工程影响有限。</p>\n<p><img alt=\"\" src=\"https://pic4.zhimg.com/v2-4434dc7186221d4c227270a4e1ece9fd_1440w.jpg\" /></p>\n<h3>6.2 表示空间几何与拓扑物质</h3>\n<p>训练好的神经网络内部，词汇和概念被表示成高维向量。这些向量之间有奇特的几何关系。最有名的例子是 <code>king - man + woman ≈ queen</code>：词向量的加减法对应了语义关系。</p>\n<p>物理学里有一类类似的现象叫<strong>拓扑保护</strong>。凝聚态物理里某些材料的性质（比如电流方向）对参数微小扰动稳健，不会因为细节改变而消失，是被”拓扑”这个全局结构保护的。神经网络表示空间里那些”跨模型稳定”的几何结构（不同模型训出来都有 <code>king - man + woman ≈ queen</code>），跟拓扑保护在形式上有对应。</p>\n<p>研究者已经在用<strong>拓扑数据分析</strong>（一种数学工具，能从一堆高维数据里识别出”洞”、”环”这种全局结构）研究神经网络的表示空间。但这是一个正在生长的方向，距离能给出定量预言还很远。</p>\n<p>诚实评估：物理对应有，但还在早期。</p>\n<p><img alt=\"\" src=\"https://picx.zhimg.com/v2-0237641146bdc258ee5957d9dd98edc3_1440w.jpg\" /></p>\n<h3>6.3 In-Context Learning：物理对应最弱的一个</h3>\n<p>你给GPT-4输入五个加法例子（”1+1=2, 3+5=8, 7+2=9, 4+4=8, 6+3=9”），然后问 “8+5=?“，它能直接答对。重点是它没有更新任何参数，纯粹通过读这五个例子，在前向推理过程中”学会”了你想问什么。这种现象叫 <strong>in-context learning</strong>（上下文学习，简写ICL）。</p>\n<p>ICL不止能做加法。给它几个英中翻译例子，它能跟着翻译。给它几个情感分类例子，它能跟着分类。给它”按JSON格式输出”的几个示范，它能照做。任何能在prompt里举例的任务都能现学现用。这件事2020年GPT-3论文（Brown等人）当成核心demo推出来之后，成了大模型今天所有”少样本能力”和”按指令做事”的底层基础。</p>\n<p>这件事在机制上很怪。传统机器学习里”学习”这个词有一个清楚的定义：参数被梯度下降一步步更新，损失函数因此下降。没有参数更新就没有学习。ICL完全跳过了这一步，输入序列里几个例子，模型就”懂”了任务。这逼着所有人重新问”学习到底是什么”。</p>\n<p>现有的解释路径都不在物理这条线上。Garg等人2022年那篇工作（arXiv:2208.01066）证明Transformer在推理时内部能跑出一个梯度下降算法，等于说”学习”还在发生，只是从训练时的参数空间挪到了推理时的中间激活空间。Anthropic的Catherine Olsson等人2022年发现Transformer里有一种叫 <strong>induction heads</strong> 的电路，专门干”前面出现过的模式在后面复现时把它抓出来”这件事，是ICL的机制硬件。</p>\n<p>这些解释都属于计算机科学层面（说明Transformer在做什么计算）。物理意义上的同构（”这跟物理里某个已知现象在数学结构上对得上”）至今没人找到。前几章用的那些物理工具（统计力学、相变、随机矩阵、亚稳态）都直接套不上来。</p>\n<p>如果有人能找到严格的物理对应，是个开放的潜力方向。但目前看，ICL也可能要等一个跟物理学没什么关系的全新数学框架，从可计算性理论、动态系统或者别的方向来。这是本篇所有open question里物理工具最够不着的一个。</p>\n<p><img alt=\"\" src=\"https://pic3.zhimg.com/v2-e7fd3389a2b8b45b601c37053fd69c08_1440w.jpg\" /></p>\n<h3>6.4 这一章的小结</h3>\n<p>把六七个open question放到一起，按物理对应的证据强度排列：</p>\n<p><strong>证据强</strong>：Scaling Law（临界标度律）、双下降（随机矩阵理论严格推导）</p>\n<p><strong>证据中等</strong>：损失曲面（自旋玻璃，但需要数据随机假设）、Grokking（亚稳态图像清楚，数学未严格）</p>\n<p><strong>证据弱但有潜力</strong>：涌现（相变图像，被Schaeffer质疑）、表示几何（拓扑物质对应，还在早期）</p>\n<p><strong>几乎空白</strong>：In-Context Learning</p>\n<p>这张地图里有一个值得注意的模式：证据最强的方向，正好和数学工具最成熟的方向重叠。Scaling Law对应的临界标度律和重整化群是凝聚态物理几十年磨出来的核心成果。双下降对应的随机矩阵理论是统计物理的成熟工具。Grokking的亚稳态理论也是非平衡统计力学的现成工具。</p>\n<p>这背后有道理：物理学家在AI里看到的同构，受限于他们手里有什么工具。”有工具的人才能看到对应”这件事，既是物理方法论的力量，也是它的盲区。In-Context Learning这种没有现成物理工具的现象，可能要等一个全新的数学框架，跟物理学没什么关系。</p>\n<h2>七、用物理工具造 AI 模型：一套”买彩票”的活动</h2>\n<p>前面六章讲了物理和AI结合的第三层，用物理来类比AI的问题。从这一章开始，我们来说物理+AI的第四层，也就是方法论的层面：物理工具是否可以直接运用在AI建模中，把物理模型搬到AI模型上去。这样的方法，命中率多少，都是谁在做？</p>\n<p>物理工具箱里有上百件工具，每件工具都可以拿来尝试造一个AI模型，等于买一张彩票。绝大多数彩票没中，少数大成。第七章讲买彩票这套活动本身，第八章把几张没中的彩票摆出来，第九章把那张中了大奖的（扩散模型）完整讲完。</p>\n<h3>7.1 物理工具箱：能造 AI 模型的原材料</h3>\n<p>物理学几代人积累了一个庞大的数学工具箱。每一件工具原则上都可以拿来尝试造一个AI模型或一类训练方法。</p>\n<p>部分清单：</p>\n<ul>\n<li><strong>统计力学</strong>（玻尔兹曼分布、配分函数）→ 玻尔兹曼机、能量模型EBM</li>\n<li><strong>Ising / Hopfield模型</strong> → Hopfield网络、associative memory、Modern Hopfield</li>\n<li><strong>变分自由能</strong> → VAE、ELBO训练目标</li>\n<li><strong>Langevin / Fokker-Planck方程</strong> → 扩散模型、Flow Matching</li>\n<li><strong>对称性和群论</strong> → CNN、E(3) 等变网络（AlphaFold核心）</li>\n<li><strong>重整化群</strong> → 深度网络的层级解释</li>\n<li><strong>张量网络</strong>（MPS、PEPS） → 用作分类器和压缩工具</li>\n<li><strong>自旋玻璃</strong> → 损失曲面分析</li>\n<li>此外还有路径积分、混沌动力学、临界现象、Hamilton力学、拓扑物质等十几件</li>\n</ul>\n<p><img alt=\"\" src=\"https://pica.zhimg.com/v2-9190df599960ef5f30dff3e23775701c_1440w.jpg\" /></p>\n<p>工具箱里至少有上百件这样的工具。每一件背后是物理学家几十年到上百年的积累。AI这门学科出现之前，这些工具已经在物理里有完整的数学和直觉。把它们搬到AI上看会发生什么，是一次次的尝试。</p>\n<h3>7.2 买一张彩票：怎么用一件物理工具尝试造一个 AI 模型</h3>\n<p>每”买一张彩票”在操作上有一些共同步骤。这套步骤没有谁规定，是过去二十年这群人在反复试错里磨出来的共同工作方式。</p>\n<p>第一步：在AI现象里识别一个数学形状。幂律、相变、无序极小值、对称性破缺这些形状物理学家见过太多次，一眼就认出来。这是识别”哪件物理工具可能套得上”的入口。</p>\n<p>第二步：从工具箱里挑那件对应的物理工具，造一个简化的AI模型。把网络宽度推到无穷（mean-field limit），把数据假设成高斯分布，把非线性换成简单形式。在这个玩具版本上推出一个具体的训练目标或架构。</p>\n<p>第三步：在MNIST或CIFAR-10上把这个模型跑起来，看它work不work。物理学家做验证的标准是”曲线形状对、定性结论对”，不追求SOTA。</p>\n<p>第四步：写论文，标题挂上物理关键词。thermodynamics、renormalization、phase transition、spin glass、free energy这些词会让物理学家感到亲切，也让ML审稿人觉得”理论有点意思”。</p>\n<p>第五步：投NeurIPS、ICML或物理顶刊。等。</p>\n<p>每完成一轮，相当于买完一张彩票。下一篇论文换一件物理工具再买一张。</p>\n<p><img alt=\"\" src=\"https://pic3.zhimg.com/v2-9f93900da372e5a2a731ac29b3f3b318_1440w.jpg\" /></p>\n<h3>7.3 命中率：几百比一甚至更低</h3>\n<p>这套买彩票活动的命中率非常低。</p>\n<p>过去二十年，用物理工具造AI模型的严肃尝试发了几百上千篇论文。真正变成工程界天天用的工具的只有少数：</p>\n<ul>\n<li><strong>中了的</strong>：扩散模型（Sohl-Dickstein 2015 → DDPM → 主流图像 / 视频生成器）、Hopfield网络（被2020年Modern Hopfield重新捡起，证明跟Transformer attention数学等价）、等变网络（AlphaFold的核心架构）</li>\n<li><strong>没中的</strong>：自旋玻璃损失曲面（Choromanska 2015）、重整化群RBM（Mehta-Schwab 2014）、张量网络分类器（Stoudenmire-Schwab 2016）、自由能原理通用AI（Friston持续二十年）</li>\n</ul>\n<p>这是一个典型的长尾分布。少数中奖的工作改变了整个行业，绝大多数发完论文之后停在”理论上漂亮、工程上没人用”的状态。每一篇论文都是买了一张彩票，要中的概率不超过百分之几。</p>\n<p>第八章把四张没中的卡具体摆出来，第九章把那张中了大奖的卡（扩散模型）完整讲完。读这两章时记住：每一个案例背后是一次具体的”用某件物理工具尝试造AI模型”的尝试，所有这些尝试用的都是上面这套五步的流程。</p>\n<h3>7.4 谁在买彩票</h3>\n<p>买彩票这件事的玩家分两群。</p>\n<p>第一群是<strong>学术派</strong>，集中在几个核心实验室，有一个有名字的细分研究community叫<strong>机器学习统计物理</strong>（statistical physics of machine learning），加起来几十个核心PI和几百个PhD / 博后：</p>\n<ul>\n<li><strong>EPFL</strong>：Lenka Zdeborová、Florent Krzakala、Matthieu Wyart</li>\n<li><strong>Stanford</strong>：Surya Ganguli、Andrea Montanari</li>\n<li><strong>MIT</strong>：Max Tegmark团队（含Eric Michaud、Ziming Liu），以及IAIFI研究所</li>\n<li><strong>Boston University</strong>：Pankaj Mehta</li>\n<li><strong>Harvard</strong>：Matthew Schwartz</li>\n</ul>\n<p>学术派买彩票的产出主要停在toy model级别和理论论文，命中率低但产出快。</p>\n<p>第二群是<strong>目标在造可用模型的物理出身研究者</strong>，跨学术界和工业界，没有统一社群名字，但贡献了大多数真正中奖的工作：</p>\n<ul>\n<li><strong>John Hopfield</strong>：凝聚态物理博士，早年在AT&amp;T Bell Labs工业研究院，1980年代到Caltech，后回普林斯顿。1982年那篇关键论文发在Caltech时期，把Ising模型搬进神经网络造了Hopfield网络，2024年诺贝尔物理学奖</li>\n<li><strong>Geoffrey Hinton</strong>：理论物理本科出身转认知科学博士，长期在多伦多大学，后在Google Brain工作十年。把Hopfield推进到Boltzmann机和RBM，开启2000年代深度学习复兴，2024年另半个诺贝尔物理学奖</li>\n<li><strong>Jascha Sohl-Dickstein</strong>：UC Berkeley生物物理博士，前NASA火星车研究员，后Google Brain、DeepMind，现Anthropic。造出了扩散模型</li>\n<li><strong>AlphaFold团队</strong>：DeepMind内部一批从物理转过来的研究者，把等变性原则推到蛋白结构预测的工业级落地，2024年诺贝尔化学奖</li>\n</ul>\n<p>两群人买彩票的风格不同。第一群每买一张发一篇论文，可以小规模快速试错。第二群每买一张要把模型工程化到能用，周期长、成本高，但一旦中奖回报巨大。下面两章讲的案例两边都有。</p>\n<h2>八、成功的物理模型</h2>\n<p>第七章讲了从物理模型到AI模型的方法论。这一章具体看这个方法论的成功率如何。</p>\n<p>成功的物理模型按工具源头分两支：一支是从Ising模型出发的自旋系统族（含对称性 / 等变这一脉），另一支是Diffusion Model。这两支在历史上几乎覆盖了”用物理工具造出来的、真正改变AI工程界的所有成功模型”。</p>\n<p>第一支在上篇3章和4章已经详细写过，这里只做方法论小结，把分散的成功案例归到同一条工具线上。第二支上篇只点了一句（”扩散模型是能量框架的第二次延伸”），这里完整展开它的九年时间线，因为它是物理→AI这条路上最干净的一次成功，路径对所有想做类似事的人都有参考价值。</p>\n<h3>8.1 自旋模型族：物理工具进 AI 命中率最高的一支</h3>\n<p>物理工具箱里命中率最高的一支是Ising模型这一族。它们的共同结构是”用能量函数定义系统行为”，工具来自统计力学（玻尔兹曼分布、配分函数、变分自由能）。把这族里中过奖的模型按时间排：</p>\n<p>1982年的<strong>Hopfield网络</strong>是这条线的起点。物理学家John Hopfield直接把Ising模型mapped成神经网络，做联想记忆。这是”用物理工具造AI模型”这件事的第一个标志性案例。完整故事见上篇3.1-3.3节。</p>\n<p>1980年代的<strong>Boltzmann机和RBM</strong>接着把Hopfield推进了一步。Hinton在Hopfield基础上加随机性，让网络能学到数据的概率分布。这条线后来发展出Deep Belief Network等架构，2000年代后期是深度学习的主力。完整故事见上篇3.4节。</p>\n<p>2020年的<strong>Modern Hopfield</strong>是这条线最戏剧的复活。Ramsauer等人发现Hopfield网络的连续版本跟Transformer的attention在数学上等价。Ising这条物理线在Transformer时代意外被认出来还在跑。完整故事见上篇3.5节。</p>\n<p>2010年代以来的<strong>EBM能量基础模型</strong>是Yann LeCun力推的统一深度学习框架，把概率分布定义为exp(-E）。完整故事见上篇3.6节。</p>\n<p>这条线最终拿到了诺贝尔奖。2024年诺贝尔物理学奖颁给了Hopfield和Hinton，颁奖词明确点了”用物理学方法做神经网络”这件事。从1982到2024，42年。</p>\n<p>跟自旋族并列、命中率也很高的另一支是<strong>对称性 / 诺特族</strong>，工具源头是物理学的群论。这一支里：</p>\n<p>1980年的Fukushima <strong>Neocognitron</strong>到1989年LeCun的<strong>CNN</strong>，把视觉皮层的平移对称性内置进网络。这是对称性进AI的第一次工程级落地。完整故事见上篇4.2节。</p>\n<p>2020年DeepMind的<strong>AlphaFold 2</strong>用SE(3）等变性把蛋白质折叠这个60年老问题基本解决了，2024年拿到诺贝尔化学奖。完整故事见上篇4.3节。</p>\n<p><img alt=\"\" src=\"https://pica.zhimg.com/v2-62d3efd404d680d449c4ec31069f1e0a_1440w.jpg\" /></p>\n<p>把自旋族和对称性族放到一起看，过去40年里物理工具进AI拿到诺贝尔奖的成功案例都在这里了。Hopfield + Boltzmann机走Ising这条线，CNN + AlphaFold走对称性这条线。两条线背后是同一个判断：把物理学积累几十年的数学结构（能量、对称性）写进网络架构里，比让网络自己从数据里学这些规律强一个数量级。</p>\n<h3>8.2 Diffusion Model：物理工具进 AI 命中率最干净的一次</h3>\n<p>（参考我写的另外一篇）：</p>\n<p><a href=\"https://zhuanlan.zhihu.com/p/2044437335031403804\">什么是 Diffusion Model？图片视频生成模型详细介绍</a></p>\n<p>跟自旋族和对称性族不同，Diffusion Model没有上一辈物理学家几十年的铺垫。它从Sohl-Dickstein 2015年那篇论文开始算起，到今天图像和视频生成器主导生成式AI的局面，前后只有十年。这十年的故事完整展示了”一篇物理论文如何在冷了五年之后被工程化激活，最终成为生成式AI的基础设施”，是物理→AI路径最清晰的一次成功样本。</p>\n<h3>8.2.1 一个生物物理博士的普通尝试</h3>\n<p>Jascha Sohl-Dickstein 2012年从UC Berkeley拿到生物物理博士学位，在Bruno Olshausen的Redwood理论神经科学中心做训练。他的研究方向是用统计力学和动力系统的思想处理复杂概率模型。博士前还在NASA喷气推进实验室做过Mars Exploration Rover上的尘埃动力学研究。</p>\n<p>2015年3月，他在arXiv上传《Deep Unsupervised Learning using Nonequilibrium Thermodynamics》（arXiv:1503.03585），ICML 2015发表。论文的思路：把有结构的数据（比如图像）按非平衡热力学里的扩散过程一步步加噪声变成完全无序的状态，然后训练一个神经网络学会反向走，从噪声里逐步恢复结构。</p>\n<p>论文摘要里直接写”核心思想受非平衡统计物理启发”。这是一篇典型的”物理学家用熟悉的工具尝试ML题目”的论文。</p>\n<h3>8.2.2 五年的沉默</h3>\n<p>发出来之后，冷了整整五年。</p>\n<p>2015到2019年间，这篇论文的引用数缓慢爬升，五年加起来不到两百次。同期GAN的原始论文每年引用是几千次。如果在2019年问任何ML研究者这篇论文，他们大概率没听说过什么叫做Diffusion Model。</p>\n<p>这五年里物理方法论圈里也没人把它当成”下一张中奖的大彩票”。生成模型这块阵地完全被GAN占领。BigGAN、StyleGAN、CycleGAN一个接一个出来，每一个都是NeurIPS的顶级oral。扩散模型只是ICML论文堆里一个看起来挺有意思但不知道怎么scale的尝试。</p>\n<p>Sohl-Dickstein本人在这五年里也没把扩散模型当作主线，他做了大量其他统计物理 × ML的工作。论文沉默时他在Google Brain，后来去了Google DeepMind，今天在Anthropic当Member of Technical Staff。</p>\n<h3>8.2.3 2020 年：何宏嘉的工程化</h3>\n<p>转折在2020年6月。何宏嘉（Jonathan Ho），UC Berkeley的CS博士生，他和Ajay Jain、Pieter Abbeel在arXiv上传《Denoising Diffusion Probabilistic Models》（arXiv:2006.11239，简称DDPM）。这篇论文做了一件关键的事：把Sohl-Dickstein那套复杂的变分推导简化成一个极其干净的训练目标，让网络在每一步预测”被加进去的噪声是什么”，损失函数是一个简单的均方误差。</p>\n<p>物理学语言在这一步开始消失。论文里没有”非平衡热力学”，没有”扩散过程的物理解释”，只有”前向加噪、反向去噪、预测噪声”。整个框架被翻译成了ML工程师能直接理解和实现的形式。</p>\n<p>结果是DDPM在CIFAR-10上获得FID 3.17、Inception Score 9.46，首次让扩散模型生成的图像质量超过GAN。第一次让所有人意识到这条线可能比GAN更好。</p>\n<p>这一年DDPM的引用还有限，关注度集中在小圈子。2021年起，引用数爆炸性增长，主流ML界开始大量做扩散模型工作。</p>\n<h3>8.2.4 宋飏的数学化</h3>\n<p>2021年ICLR，宋飏（Yang Song）和Sohl-Dickstein、Kingma、Kumar、Ermon、Ben Poole联合发表《Score-Based Generative Modeling through Stochastic Differential Equations》（arXiv:2011.13456，ICLR 2021 Oral）。</p>\n<p>这篇论文用随机微分方程（SDE）的语言重新统一了整个扩散框架。前向加噪是一个SDE，反向去噪是这个SDE的逆。从此扩散模型有了一个干净的数学骨架：score function是SDE的核心，DDPM、score matching、Langevin动力学都是这个统一框架的特例。论文在CIFAR-10上的FID进一步降到2.20。</p>\n<p>统计物理的语言到这一步被彻底替换成了数学语言。不再是”热力学”，是”SDE”。扩散模型在数学骨架上更接近经典随机过程理论，而不是统计物理。</p>\n<h3>8.2.5 之后</h3>\n<p>之后的故事大家都知道。2022年起开源图像生成器一波接一波，2023年消费级图像生成器走入大众，2024年扩散范式被推到了视频生成。今天主流的图像和视频生成产品几乎全是扩散模型的后代。</p>\n<p>Sohl-Dickstein 2015年那篇”普通的物理学家的普通尝试”，经过五年冷落、一次工程化简化、一次数学重表述，成了生成式AI革命的种子。前后跨度九年。</p>\n<p>如果想看扩散模型的技术细节展开，可以参考另一篇《<a href=\"https://link.zhihu.com/?target=https%3A//x.com/snowboat84\">什么是 Diffusion Model？全网最详细介绍</a>》。本节聚焦的是方法论：物理学家的论文走到工程师手里之后发生了什么。</p>\n<h3>8.2.6 这个故事真正说明什么</h3>\n<p>把扩散模型九年的故事拆解，能看到四步演化。第一步是物理学贡献了最初框架，Sohl-Dickstein 2015那篇是核心insight的源头，但在2020之前这个insight没有产生任何工程影响。第二步是工程化激活，何宏嘉2020年那篇DDPM做的核心工作是把变分推导简化到ML工程师能直接拿来用的形式（物理层面没有新创新），这一步剥掉了物理语言。第三步是数学化让它成为严肃理论，宋飏2021年的Score SDE把整个框架翻译成SDE语言，进一步剥掉了物理标签。第四步是物理标签彻底消失、框架成为基础设施，今天工程界讲”扩散模型”时几乎不再提”非平衡热力学”，物理出身的痕迹只剩论文引用里那篇2015的源头。</p>\n<p>这是物理方法论在AI里成功的标准路径：<strong>物理 → 工程化（剥语言）→ 数学化（剥标签）→ 成为基础设施</strong>。</p>\n<p>严格说，Diffusion Model是个边界案例。原始思路确实来自非平衡热力学，但最终爆发的工程版本已经把物理工具基本剥离了。今天写图像生成器训练代码的工程师不需要懂任何统计物理，只需要懂score function、noise prediction、SDE这些纯数学工具。如果按”用没用物理工具”严格筛选，Diffusion Model算是一个”借了物理的名字和最初灵感，但最终靠数学和工程接力跑出来的”案例。它跟自旋族（Hopfield直接mapped Ising）和对称性族（CNN/AlphaFold直接用群论）不一样，那两族是物理工具一直显式存在的。</p>\n<h2>九、失败的物理模型</h2>\n<p>第八章讲了中奖的物理模型。这一章把”造出来但没活下来”的物理模型摆出来，建立失败案例的分母。</p>\n<p>注意筛选标准：只算”真的造了一个AI模型并试图在主流任务上用”的案例。纯解释性工作（用自旋玻璃解释损失曲面、用临界标度律解释Scaling Law这种”用物理工具事后分析AI现象”的工作）不在这一章里。前面6.x节已经讨论过那些解释性工作的命运。下面四个失败案例每一个都是”物理学家造了一个AI模型”。</p>\n<h3>9.1 RBM 时代：从主流跌到边缘</h3>\n<p>Restricted Boltzmann Machine（RBM）是8.1节提过的Hinton力推的模型，2000年代后期到2010年代初期是深度学习的主力。Hinton 2006年那篇《A Fast Learning Algorithm for Deep Belief Nets》开启了深度学习复兴的浪潮，Deep Belief Network把RBM堆叠起来一度是ImageNet之前最强的图像识别架构。这条线的物理出身很硬：RBM本身就是Boltzmann机的简化版，背后是Ising模型那套统计力学。</p>\n<p>但2012年AlexNet在ImageNet上的胜利之后，工程界快速从RBM/DBN转向了CNN。RBM的训练算法（contrastive divergence）跟反向传播比效率低、可扩展性差，对GPU不友好。到2015年前后RBM在主流ML圈基本被淘汰，Hinton自己也转向了别的方向。</p>\n<p>Pankaj Mehta和David Schwab 2014年10月在arXiv上传《An exact mapping between the Variational Renormalization Group and Deep Learning》（arXiv:1410.3831），证明了RBM的逐层变换和Kadanoff块自旋变换在数学上严格等价。论文在物理学界引起极大关注，被认为是深度学习的理论解释突破，物理学家激动了好几年。但论文发出来时RBM已经是夕阳模型，CNN已经全面接管。这个漂亮的物理对应停在了数学层面，没产生任何工程影响。Transformer时代之后，更没人去找它跟新架构的对应。</p>\n<p><img alt=\"\" src=\"https://pic1.zhimg.com/v2-327af0c4e13ef5f484de3b8717e68ef2_1440w.jpg\" /></p>\n<p>玻尔兹曼机 vs 限制玻尔兹曼机。Credit: Zahid Akhtar</p>\n<p>RBM是个特殊的”半失败”案例：先成功（2006-2012年是深度学习的主力）后失败（2012年后被CNN淘汰）。它说明物理工具能造出一时的成功模型，但能不能持续下去取决于工程效率，跟物理上的优雅没关系。</p>\n<h3>9.2 张量网络分类器（Stoudenmire-Schwab，2016）</h3>\n<p>Edwin Stoudenmire和David Schwab 2016年的论文《Supervised Learning with Tensor Networks》（arXiv:1605.05775，NeurIPS 2016）展示了一件事：用矩阵积态（Matrix Product States，MPS）当分类器在MNIST上能跑到不到1% 测试错误。性能不差于当时的浅层网络。</p>\n<p>这条线的物理动机很硬。张量网络是量子多体物理里描述纠缠态的核心工具，被Roman Orus、Frank Verstraete这批人发展了二十多年。MPS本身是描述一维量子系统基态的标准方法。把它用进ML，相当于把量子物理的核心工具搬到机器学习。论文发出来引发了一批量子物理学家转入ML研究。</p>\n<p>但Vision Transformer 2020年出来之后，这条线彻底消失。Transformer的全局attention提供了比张量网络的固定一维拓扑灵活得多的关联结构。张量网络在图像上的固定拓扑反而成了束缚。工程影响极小，今天主要局限在量子化学和材料模拟的特定子领域。主流CV/NLP任务里完全看不到张量网络的身影。</p>\n<p>这条线的失败说明一件事：物理上漂亮的结构（描述纠缠态用的MPS）不一定是AI任务上漂亮的结构。Transformer那套”每个token都能关注任意其它token”的全局结构，在表达能力上彻底压过了固定一维拓扑的张量网络。</p>\n<p><img alt=\"\" src=\"https://picx.zhimg.com/v2-2bd9b61fe49a1c73483cb04602a1e7a3_1440w.jpg\" /></p>\n<h3>9.3 量子神经网络：在主流 AI 圈基本看不到的孤岛</h3>\n<p>量子神经网络（Quantum Neural Network，QNN）是物理学派造AI模型的另一条线，更直接地把量子物理搬进来。基本思路是用量子电路（quantum circuit）代替经典神经网络的层，理论上可以利用量子叠加和纠缠加速学习。Google、IBM、微软、Quantinuum这些有量子计算硬件的公司都做过相关研究。</p>\n<p>这条线在学术上一直在发文章，arXiv上每年几百篇QNN相关论文。商业上有少数pilot案例（SpinQ跟华夏银行子公司Longying Zhida做ATM调度的QNN，Quantinuum的lambeq在做语义搜索）。但在主流AI圈基本看不到。原因有几条：能用的量子硬件还是NISQ级别（noisy intermediate-scale quantum），量子比特少、噪声大、相干时间短。研究者社区高度依赖单一供应商的SDK，vendor lock-in是QML采用的最大非技术障碍。理论上预期的”量子加速”在大多数ML任务上没被验证出来。</p>\n<p>工程影响：基本为零。今天没有任何主流AI产品是基于QNN的。这条线的命运将来取决于通用量子计算什么时候真正落地，跟物理工具本身的优雅程度关系不大。</p>\n<p><img alt=\"\" src=\"https://pic4.zhimg.com/v2-3aa0ff9ec451598912d4f55bd7934641_1440w.jpg\" /></p>\n<h3>9.4 Hamiltonian Neural Networks：理论漂亮但工程影响小</h3>\n<p>2019年Sam Greydanus、Misko Dzamba、Jason Yosinski（Google Brain）在NeurIPS发表《Hamiltonian Neural Networks》（arXiv:1906.01563）。核心想法是把哈密顿力学（物理学描述守恒系统的标准框架）写进神经网络架构，让网络在训练时自动学到能量守恒。论文证明在双体问题、单摆这类物理系统上，HNN比普通神经网络训练得更快、泛化更好、时间上完美可逆。</p>\n<p>物理上这是个漂亮的工作。哈密顿力学是19世纪以来物理学的核心数学框架，把它嵌进神经网络是个elegant的想法。论文之后几年里也催生了一系列后续工作：Lagrangian Neural Networks、Symplectic Networks、Neural ODE的物理变体等等。</p>\n<p>但工程影响很小。HNN和它的后续主要还是在物理模拟、机器人控制、分子动力学这些”系统本身就守恒能量”的窄场景里有用。主流的图像、文本、推荐这些AI任务，输入输出之间根本没有能量守恒的物理结构，HNN没用武之地。今天没有任何主流AI产品是基于HNN的，它停在了”理论上漂亮 + 窄场景有用”的状态。</p>\n<p>HNN的失败模式跟张量网络类似：物理上漂亮的结构（哈密顿力学的辛几何）不一定能在AI任务上变成竞争优势。如果数据本身没有那个物理结构，强行把结构写进网络反而是束缚。</p>\n<p><img alt=\"\" src=\"https://pic2.zhimg.com/v2-6fb6ef7d14233f0b14723ca6866f776b_1440w.jpg\" /></p>\n<h3>9.5 这些失败案例的共同模式</h3>\n<p>把这四个失败案例放到一起，模式很清楚。</p>\n<p>它们都严肃。论文质量高，作者是顶级研究者，物理推导扎实。它们也都按7.2节那套流程做：识别数学形状、做玩具模型、跑MNIST对照、写挂物理关键词的论文、投NeurIPS或ICML。这套流程本身没毛病，只是命中率低。</p>\n<p>事后看，<strong>成功的案例都能找到一种”物理工具结构跟AI任务结构对得上”的故事</strong>。Hopfield联想记忆跟自旋吸引子对得上，CNN平移卷积核跟图像平移对称对得上，AlphaFold SE(3) 等变跟分子三维对称对得上，Diffusion加噪去噪跟非平衡过程对得上。失败的案例也能找到反过来的故事：RBM被CNN淘汰是因为CNN在自然图像上的归纳偏置更对路，张量网络在图像上的固定一维拓扑反而是束缚，HNN在没有能量守恒的通用AI任务上没用武之地。</p>\n<p>但要诚实承认这种解释有事后诸葛亮的味道。”成功的找匹配、失败的找不匹配”在论证形式上几乎不可证伪，给任何结果都能编出一个”是否匹配”的故事。这套解释帮助理解既有案例，但<strong>对未来的预测力很弱</strong>。物理学家四十年前不会预料到Hopfield网络在2020年突然被发现跟Transformer attention数学等价复活。</p>\n<p>更要承认的是，今天看”失败”的模型未来不一定一直失败。</p>\n<p>张量网络在量子计算硬件成熟之后可能复活，因为量子电路本身就是张量网络结构。HNN在AI for Science（分子动力学、物理模拟、可控机器人）这些”任务本身有守恒律”的细分场景里已经在悄悄变得有用，Lagrangian Networks、Symplectic Networks这一系列后续工作还在发。QNN的命运完全取决于通用量子计算什么时候真正落地，跟物理工具本身的优雅程度关系不大。RBM这种半失败的案例如果在某个新场景被重新发现价值，小规模复活也不是没可能。Modern Hopfield在2020年突然跟attention等价的故事就是个典型先例：一个看似过时的物理工具在新架构下被认出来还在跑。</p>\n<p>所以这一章列的”失败”，只是说截至今天这些模型在主流AI工程界没成主流，不是判它们永远没希望。哪天某个工程师在某个新场景里把张量网络或HNN拿出来重新做一次工程化，把物理标签剥掉、用新的语言重新表述出来，这一章里的某个名字就会移到第八章去。</p>\n<p>这套叙事在AI圈里通常只统计分子。媒体讨论”物理在AI里的成功”时不会列举失败案例。研究者写综述时不会回顾那些没改变工程的方向。但失败案例的数量决定了物理方法论真正的边际成本。每一张没中奖的彩票都是一组博士生几年的时间、一笔算力、一个团队的注意力。</p>\n<h2>十、工程化：一个不同的路线</h2>\n<p>最后一章讲一讲，作者认为下一步物理应该走的路线。这一章是一个提议，不是描述行业正在做的事。如果将来真有人按这条路做出来，再回头看这一章可能是历史的注脚。</p>\n<h3>10.1 演化的逻辑：让模型在生态位里自然竞争</h3>\n<p>过去十年的”用物理工具造AI模型”的尝试有两种思路。一种是”智能设计”的逻辑，预设一个统一原则（比如对称性），从原则推导出所有架构。这条路径的成败完全取决于”原则是否抓住了AI的核心特征”。事实证明单一原则覆盖不了AI模型的全部多样性。</p>\n<p>另一种是<strong>演化的逻辑</strong>：不预设统一原则，系统地创造大量物理启发的变种，让它们在不同生态位上竞争，让最适合每个生态位的存活。</p>\n<p>这条路的核心判断：<strong>AI的演进不会靠某一个统一框架解决所有问题。它会靠造出海量的物理启发模型、把它们工程化、然后按不同场合精准匹配</strong>。</p>\n<p>这条路接近生物进化。生物界没有一个”统一生物原则”指导所有物种该长什么样。物种是在各种环境里独立演化出来的，按生态位匹配。AI模型的演化更接近这个图像。</p>\n<p>物理工具箱里有上百个数学骨架可供尝试，7.1节已经列过完整清单（已严肃利用的几族、有早期尝试未成熟的几族、几乎空白的潜在金矿区），这里不重复展开。</p>\n<h3>10.2 工程化意味着什么</h3>\n<p>工程化不是”发一篇证明某物理概念在玩具模型上成立的论文”。第九章讲的失败案例里大多数都停在了这一步。工程化是走完从物理原理到可工业部署的完整链路：</p>\n<ol>\n<li>定义清楚一个物理根族在AI语境下的状态空间、参数化、目标函数</li>\n<li>实现为可训练的神经网络架构</li>\n<li>在标准benchmark上跑通baseline，与现有主流模型做能力对比</li>\n<li>记录它的强项、弱项、失败模式、适用场景</li>\n<li>做到”可以被工程师拿去用”的成熟度</li>\n</ol>\n<p>扩散模型从Sohl-Dickstein到何宏嘉的那一步是这条工程化路径最干净的标杆案例，完整故事见8.2节。何宏嘉2020那篇DDPM做的核心工作就是把1-5全部走完，让一个”在玩具实验上可行”的物理构想变成了”真实可用的AI工具”。</p>\n<p>工程化的核心动作是<strong>剥离物理语言</strong>。物理学家爱用的术语（变分自由能、非平衡热力学、规范不变性）在ML工程师眼里是噪声。工程化要把这些术语翻译成ML圈内能直接消费的语言（损失函数、训练目标、采样过程）。这件事看起来是表面功夫，实际上是这条路径里最关键的一步。</p>\n<h3>10.3 按场合匹配：AI 不是只需要一个模型</h3>\n<p>有一个今天AI界的主流叙事需要被质疑：Transformer适用于一切，不需要其他模型了。</p>\n<p>事实是Transformer在大多数场合表现强，但有几个场合它并不占优。长序列建模有更高效的state-space models。分子和晶体等科学数据需要等变网络。连续物理系统的生成上扩散模型有难以替代的优势。决策和控制问题Hamilton系统族的能量守恒结构更稳定。结构化表格数据上基于决策树的XGBoost、LightGBM至今没被神经网络打败。这些是系统性的现象，覆盖范围远超过”个别例外”那种程度。</p>\n<p><strong>正确的图景是：AI模型库应当像一个工具箱，针对不同问题取不同工具</strong>。建立”任务特征→最优物理根族”的匹配体系，是这件事的核心价值之一。</p>\n<p>这跟工程师在其他领域的做法一致。后端工程师不会用同一个数据库做所有任务。需要事务用PostgreSQL，需要全文搜索用Elasticsearch，需要key-value用Redis，需要时间序列用InfluxDB。AI模型库应该走同样的方向。</p>\n<h3>10.4 一个知识库的轮廓</h3>\n<p>要把上面这件事做起来，需要一个结构化的物理AI知识库作为基础设施。形态是按严格结构组织的可查询系统，既不同于描述性的书也不同于松散的文献综述。每个物理根族是一个有固定字段的对象，对象之间有形式化的关系图。</p>\n<p>按任务和根族两个维度展开，可以得到三张核心表。</p>\n<p><strong>表一：根族 × AI能力</strong>。每个根族能催生服务于哪类AI任务的模型。生成（分布建模式：扩散族、Flow Matching）、生成（自回归式：Transformer族）、判别/感知（CNN、等变网络）、决策/策略（Hamilton族、最优控制）、检索（embedding模型）。</p>\n<p><strong>表二：根族 × 物理能力</strong>。每个根族在物理里本来能描述什么。平衡态（Boltzmann）、非平衡演化（Langevin）、多体相互作用（Ising、Hubbard）、对称性与守恒（群论）、多尺度结构（重整化群）、无序系统（自旋玻璃）、开放系统（Lindblad）、表面生长（KPZ）。</p>\n<p><strong>表三：根族 × 转化成熟度</strong>。每个根族在AI里的开发程度。已经有成熟AI实例、有早期尝试但还没成熟、几乎空白但有潜力。</p>\n<p>这三张表合起来是这个工程的最小可行起点。它们能让”哪里被开发了、哪里没有、哪里是金矿区”一目了然。三张表成形之后，整个工作就从抽象的”建立知识库”变成具体的”把每一个空白格子填满”。</p>\n<p>填满空白格子的工作量大，但路径清楚。不再是赌某个物理根族会爆发，是系统地把所有根族都跑一遍。这跟7.2节那套”买彩票”流程的根本区别在于：不再依赖运气和直觉，是按工程方法穷举。</p>\n<h3>10.5 这件事谁来做</h3>\n<p>这套工作的人才结构有意思，需要三类人共同工作。</p>\n<p>第一类，<strong>懂物理工具箱深的人</strong>。统计物理、凝聚态物理、量子场论训练出来的研究者，知道每个根族在物理里能做什么，能写出严格的数学表述。</p>\n<p>第二类，<strong>懂ML工程的人</strong>。能把数学表述翻译成可训练的神经网络架构，能跑benchmark，能调超参，能把成熟度推到”工程师拿去用”那一步。</p>\n<p>第三类，<strong>懂任务匹配的人</strong>。知道在不同的AI应用场景里，什么样的物理根族可能最合适。这是产品视角，不是研究视角。</p>\n<p>这三类人在现在的AI圈里几乎是分开的。物理学家写论文，ML工程师做产品，产品经理决定用什么模型。这个工程要把三者绑在一起做。结构上跟扩散模型从Sohl-Dickstein到何宏嘉到工业部署那条链路一样：物理出原型，工程做简化，产品找场景。</p>\n<p>这套工作目前没人在系统做。诚实的状态是：物理→AI这条路在过去四十年是个体研究者各做各的、命中率极低的活动。把它变成一个系统工程是个提议，不是事实。这个提议要兑现，需要至少一个团队同时具备上面三类人才。如果哪一年这事真做起来，再回头看这一章可能是历史注脚。</p>\n<h2>结尾：物理学的第二春</h2>\n<p>到此，《当物理遇上AI》的下半篇也讲完了。</p>\n<p><img alt=\"\" src=\"https://pic3.zhimg.com/v2-ff6567c3ac236a687d6fbe58292b191a_1440w.jpg\" /></p>\n<p>把上下两篇合起来，物理学在AI里站的四层位置就清楚了：</p>\n<ul>\n<li>第一层在最底层，贡献了计算的骨架，能量、熵、自由能这些物理数学早就嵌进了AI的训练目标里</li>\n<li>第二层在中层，塑造了网络的形状，Hopfield的Ising能量函数、CNN的平移对称性、重整化群对应深度网络的层级结构。</li>\n<li>第三层在上层，提供了理解AI现象的语言，临界标度律、自旋玻璃、亚稳态这些物理工具被借来分析AI的open questions。</li>\n<li>第四层是方法论层，产生了极少数改变范式的成果，扩散模型是最干净的一例。</li>\n</ul>\n<p>第三层值得多说几句。物理用来类比AI现象，AI的open questions里有几个找到了真正的物理意义，物理工具的数学结构跟AI现象的数学结构在形式上能对得上。Scaling Law对应临界标度律，双下降可以用随机矩阵理论严格推导出来，Grokking的亚稳态物理图像也非常贴。这三个证据相对硬。涌现和In-Context Learning这两个证据仍然薄弱，可能只是表面相似。第三层有真东西，但要诚实区分哪些是真同构、哪些只是看起来像。</p>\n<p>第四层讲的是物理学家造AI模型这件事。把物理工具箱里的东西搬出来造一个新的AI模型，看会不会成功。过去四十年算下来，真正中过奖的只有三条线：自旋族（Hopfield、Boltzmann机、Modern Hopfield）、对称性族（CNN、AlphaFold）、扩散模型。这三条线背后已经拿了两个诺贝尔奖（物理 + 化学）。没中奖的几百个尝试散在RBM时代、张量网络、量子神经网络、Hamiltonian Neural Networks各处。下一步对的路是把这件事从”个体研究者各自买彩票”变成”系统工程化所有物理工具箱”，但这条路目前还只是一个提议，没人真的在做。</p>\n<p>这四层加起来，是一个微妙的事实：物理学有真实的贡献，分布在不同层次。有些已经成为AI的地基，连物理标签都消失了。有些还在探索。这是一个比”物理学拯救了AI”或”物理学对AI没什么用”都更接近真相的判断。</p>\n<p>物理学作为”研究自然界的学问”走到了边界。半个世纪没有产生标准模型之外的实验突破。但物理学作为一套”面对复杂系统的方法论”，没有失效。这套方法论正在从自然界搬家到AI世界，把工具一件一件搬过去，看哪些能在新的对象上重新生根。</p>\n<p>搬家还没有完成。那些空白根族（可积系统、Lindblad、KPZ、Hubbard）还没有人认真试过。下一个扩散模型可能就藏在其中某一个里，等着有人把物理原理和工程化简化放在一起，冷了几年之后被另一个人激活。</p>\n<p>物理学问了宇宙一遍”当无数个体互相作用，整体会涌现出什么”，答案叫统计力学、热力学、相变理论。现在它要问AI同一个问题。这一遍的答案叫什么，还没有人知道。但提问的工具已经在手里。</p>\n<hr />\n<h3>重返知乎的百日百篇系列</h3>\n<p><a href=\"https://zhuanlan.zhihu.com/p/2028278862048507118\">2026年第二季度，我启动了百日百篇原创系列（内有所有文章列表）</a></p>"
    }
  ],
  "graph": {
    "nodes": [
      {
        "id": "sindy",
        "x": 0.0,
        "y": 70,
        "category": "physics_discovery"
      },
      {
        "id": "nqs",
        "x": 10.0,
        "y": 110,
        "category": "quantum_particle"
      },
      {
        "id": "pde_net",
        "x": 20.0,
        "y": 10,
        "category": "pde_solving"
      },
      {
        "id": "neural_ode",
        "x": 20.0,
        "y": 90,
        "category": "physics_constrained"
      },
      {
        "id": "pinn",
        "x": 30.0,
        "y": 10,
        "category": "pde_solving"
      },
      {
        "id": "hnn",
        "x": 30.0,
        "y": 90,
        "category": "physics_constrained"
      },
      {
        "id": "xpinns",
        "x": 40.0,
        "y": 10,
        "category": "pde_solving"
      },
      {
        "id": "gns",
        "x": 40.0,
        "y": 30,
        "category": "fluid_simulation"
      },
      {
        "id": "meshgraphnets",
        "x": 40.0,
        "y": 30,
        "category": "fluid_simulation"
      },
      {
        "id": "jax_md",
        "x": 40.0,
        "y": 30,
        "category": "fluid_simulation"
      },
      {
        "id": "difftaichi",
        "x": 40.0,
        "y": 30,
        "category": "fluid_simulation"
      },
      {
        "id": "phiflow",
        "x": 40.0,
        "y": 30,
        "category": "fluid_simulation"
      },
      {
        "id": "ai_feynman",
        "x": 40.0,
        "y": 70,
        "category": "physics_discovery"
      },
      {
        "id": "ude",
        "x": 40.0,
        "y": 70,
        "category": "physics_discovery"
      },
      {
        "id": "lnn",
        "x": 40.0,
        "y": 90,
        "category": "physics_constrained"
      },
      {
        "id": "sympnets",
        "x": 40.0,
        "y": 90,
        "category": "physics_constrained"
      },
      {
        "id": "particlenet",
        "x": 40.0,
        "y": 110,
        "category": "quantum_particle"
      },
      {
        "id": "hp_vpinns",
        "x": 50.0,
        "y": 10,
        "category": "pde_solving"
      },
      {
        "id": "fno",
        "x": 50.0,
        "y": 10,
        "category": "pde_solving"
      },
      {
        "id": "deeponet",
        "x": 50.0,
        "y": 10,
        "category": "pde_solving"
      },
      {
        "id": "brax",
        "x": 50.0,
        "y": 30,
        "category": "fluid_simulation"
      },
      {
        "id": "canns",
        "x": 50.0,
        "y": 50,
        "category": "solid_mechanics"
      },
      {
        "id": "tanns",
        "x": 50.0,
        "y": 50,
        "category": "solid_mechanics"
      },
      {
        "id": "egnn",
        "x": 50.0,
        "y": 90,
        "category": "physics_constrained"
      },
      {
        "id": "noether_nets",
        "x": 50.0,
        "y": 90,
        "category": "physics_constrained"
      },
      {
        "id": "gpinn",
        "x": 60.0,
        "y": 10,
        "category": "pde_solving"
      },
      {
        "id": "causal_pinn",
        "x": 60.0,
        "y": 10,
        "category": "pde_solving"
      },
      {
        "id": "pi_deeponet",
        "x": 60.0,
        "y": 10,
        "category": "pde_solving"
      },
      {
        "id": "geo_fno",
        "x": 70.0,
        "y": 10,
        "category": "pde_solving"
      },
      {
        "id": "uno",
        "x": 70.0,
        "y": 10,
        "category": "pde_solving"
      },
      {
        "id": "pysr",
        "x": 70.0,
        "y": 70,
        "category": "physics_discovery"
      },
      {
        "id": "poseidon",
        "x": 80.0,
        "y": 10,
        "category": "pde_solving"
      },
      {
        "id": "walrus",
        "x": 100.0,
        "y": 10,
        "category": "pde_solving"
      },
      {
        "id": "transolver3",
        "x": 100.0,
        "y": 10,
        "category": "pde_solving"
      },
      {
        "id": "pf_pino",
        "x": 100.0,
        "y": 10,
        "category": "pde_solving"
      },
      {
        "id": "pikan",
        "x": 100.0,
        "y": 10,
        "category": "pde_solving"
      },
      {
        "id": "fedonet",
        "x": 100.0,
        "y": 10,
        "category": "pde_solving"
      },
      {
        "id": "fano",
        "x": 100.0,
        "y": 30,
        "category": "fluid_simulation"
      },
      {
        "id": "physicsnemo",
        "x": 100.0,
        "y": 30,
        "category": "fluid_simulation"
      },
      {
        "id": "simple_pinn",
        "x": 100.0,
        "y": 30,
        "category": "fluid_simulation"
      },
      {
        "id": "fe_pinns",
        "x": 100.0,
        "y": 50,
        "category": "solid_mechanics"
      },
      {
        "id": "aion1",
        "x": 100.0,
        "y": 90,
        "category": "physics_constrained"
      },
      {
        "id": "momentum_gnn",
        "x": 100.0,
        "y": 90,
        "category": "physics_constrained"
      }
    ],
    "edges": [
      {
        "from": "pinn",
        "to": "xpinns",
        "label": "域分解"
      },
      {
        "from": "gns",
        "to": "meshgraphnets",
        "label": "网格扩展"
      },
      {
        "from": "neural_ode",
        "to": "ude",
        "label": "混合建模"
      },
      {
        "from": "hnn",
        "to": "lnn",
        "label": "拉格朗日"
      },
      {
        "from": "hnn",
        "to": "sympnets",
        "label": "辛对称"
      },
      {
        "from": "pinn",
        "to": "hp_vpinns",
        "label": "变分细化"
      },
      {
        "from": "jax_md",
        "to": "brax",
        "label": "刚体引擎"
      },
      {
        "from": "pinn",
        "to": "gpinn",
        "label": "梯度增强"
      },
      {
        "from": "pinn",
        "to": "causal_pinn",
        "label": "因果加权"
      },
      {
        "from": "deeponet",
        "to": "pi_deeponet",
        "label": "物理嵌入"
      },
      {
        "from": "fno",
        "to": "geo_fno",
        "label": "几何自适应"
      },
      {
        "from": "fno",
        "to": "uno",
        "label": "多尺度"
      },
      {
        "from": "fno",
        "to": "poseidon",
        "label": "基础模型"
      },
      {
        "from": "poseidon",
        "to": "walrus",
        "label": "规模化扩展"
      },
      {
        "from": "fno",
        "to": "transolver3",
        "label": "大规模网格"
      },
      {
        "from": "fno",
        "to": "pf_pino",
        "label": "相场约束"
      },
      {
        "from": "pinn",
        "to": "pikan",
        "label": "架构演进"
      },
      {
        "from": "deeponet",
        "to": "fedonet",
        "label": "谱特征嵌入"
      },
      {
        "from": "fno",
        "to": "fano",
        "label": "平流增强"
      },
      {
        "from": "pinn",
        "to": "simple_pinn",
        "label": "算法融合"
      },
      {
        "from": "canns",
        "to": "fe_pinns",
        "label": "有限元集成"
      },
      {
        "from": "egnn",
        "to": "momentum_gnn",
        "label": "守恒律硬约束"
      }
    ],
    "milestones": [
      {
        "id": "neural_ode",
        "label": "连续深度模型奠基"
      },
      {
        "id": "pinn",
        "label": "物理信息嵌入范式"
      },
      {
        "id": "fno",
        "label": "算子学习突破"
      },
      {
        "id": "walrus",
        "label": "物理大模型时代"
      }
    ]
  },
  "algos": [
    {
      "id": "sindy",
      "num": 1,
      "name": "SINDy",
      "fullName": "稀疏识别动力学 (Sparse Identification of Nonlinear Dynamics)",
      "year": "2016",
      "org": "华盛顿大学",
      "parent": "—",
      "paperUrl": "https://www.pnas.org/doi/10.1073/pnas.1517384113",
      "projectUrl": "",
      "category": "physics_discovery",
      "motivation": "稀疏回归识别非线性控制方程",
      "summary": "SINDy 的核心目标是：稀疏回归识别非线性控制方程。",
      "keyPoints": [
        "核心动机：稀疏回归识别非线性控制方程",
        "代表机构：华盛顿大学"
      ],
      "detail": "<p>稀疏回归识别非线性控制方程</p>"
    },
    {
      "id": "nqs",
      "num": 2,
      "name": "NQS",
      "fullName": "神经量子态 (Neural Quantum States)",
      "year": "2017",
      "org": "ETH Zurich",
      "parent": "—",
      "paperUrl": "https://www.science.org/doi/10.1126/science.aag2302",
      "projectUrl": "",
      "category": "quantum_particle",
      "motivation": "RBM表示波函数解决多体问题",
      "summary": "NQS 的核心目标是：RBM表示波函数解决多体问题。",
      "keyPoints": [
        "核心动机：RBM表示波函数解决多体问题",
        "代表机构：ETH Zurich"
      ],
      "detail": "<p>RBM表示波函数解决多体问题</p>"
    },
    {
      "id": "pde_net",
      "num": 3,
      "name": "PDE-Net",
      "fullName": "偏微分方程网络 (PDE-Net)",
      "year": "2018",
      "org": "北京大学",
      "parent": "—",
      "paperUrl": "http://proceedings.mlr.press/v80/long18a.html",
      "projectUrl": "",
      "category": "pde_solving",
      "motivation": "卷积矩约束模拟微分算子",
      "summary": "PDE-Net 的核心目标是：卷积矩约束模拟微分算子。",
      "keyPoints": [
        "核心动机：卷积矩约束模拟微分算子",
        "代表机构：北京大学"
      ],
      "detail": "<p>卷积矩约束模拟微分算子</p>"
    },
    {
      "id": "neural_ode",
      "num": 4,
      "name": "Neural ODE",
      "fullName": "神经常微分方程 (Neural Ordinary Differential Equations)",
      "year": "2018",
      "org": "多伦多大学",
      "parent": "—",
      "paperUrl": "https://arxiv.org/abs/1806.07366",
      "projectUrl": "",
      "category": "physics_constrained",
      "motivation": "网络层视为连续时间演化",
      "summary": "Neural ODE 的核心目标是：网络层视为连续时间演化。",
      "keyPoints": [
        "核心动机：网络层视为连续时间演化",
        "代表机构：多伦多大学"
      ],
      "detail": "<p>网络层视为连续时间演化</p>"
    },
    {
      "id": "pinn",
      "num": 5,
      "name": "PINN",
      "fullName": "物理信息神经网络 (Physics-Informed Neural Networks)",
      "year": "2019",
      "org": "布朗大学",
      "parent": "—",
      "paperUrl": "https://doi.org/10.1016/j.jcp.2018.10.045",
      "projectUrl": "",
      "category": "pde_solving",
      "motivation": "将PDE残差嵌入Loss实现无网格求解",
      "summary": "PINN 的核心目标是：将PDE残差嵌入Loss实现无网格求解。",
      "keyPoints": [
        "核心动机：将PDE残差嵌入Loss实现无网格求解",
        "代表机构：布朗大学"
      ],
      "detail": "<p>将PDE残差嵌入Loss实现无网格求解</p>"
    },
    {
      "id": "hnn",
      "num": 6,
      "name": "HNN",
      "fullName": "哈密顿神经网络 (Hamiltonian Neural Networks)",
      "year": "2019",
      "org": "Google",
      "parent": "—",
      "paperUrl": "https://proceedings.neurips.cc/paper/2019/hash/26cd8ecadce0d4efd6cc8a8725cbd1f8-Abstract.html",
      "projectUrl": "",
      "category": "physics_constrained",
      "motivation": "学习哈密顿量确保能量守恒",
      "summary": "HNN 提出用神经网络直接参数化物理系统的哈密顿量 \\(H_\\theta(\\mathbf{q}, \\mathbf{p})\\)，并通过自动微分强制输出满足哈密顿正则方程（辛结构），从而在不显式编码能量守恒规则的前提下，让网络自动学会保持系统总能量——在弹簧、单摆、两体问题乃至像素级观测等任务上，能量守恒精度比普通基线网络高出数个数量级。",
      "keyPoints": [
        "<strong>核心思想</strong>：不直接拟合 <span class=\"kb-math kb-math-inline\">\\dot{\\mathbf{q}}, \\dot{\\mathbf{p}}</span>，而是让 NN 输出标量哈密顿量 <span class=\"kb-math kb-math-inline\">H_\\theta</span>，再通过辛梯度 <span class=\"kb-math kb-math-inline\">(\\partial H/\\partial \\mathbf{p},\\; -\\partial H/\\partial \\mathbf{q})</span> 得到动力学，结构性地保证能量守恒",
        "<strong>损失函数</strong>：直接监督哈密顿方程的左右两侧之差（Eq 3），无需能量标签",
        "<strong>5 个实验任务</strong>：理想弹簧（Task 1）、理想单摆（Task 2）、真实单摆视频数据（Task 3）、两体引力问题（Task 4）、像素级单摆（Task 5）",
        "<strong>像素扩展</strong>：Autoencoder + HNN 联合训练，辅助损失（Eq 7）使潜空间的后半部分 <span class=\"kb-math kb-math-inline\">\\mathbf{z_p}</span> 近似 <span class=\"kb-math kb-math-inline\">\\mathbf{z_q}</span> 的时间导数，从而满足正则坐标条件",
        "<strong>定量结果</strong>：在所有任务上，HNN 的能量 MSE 比基线低 1–3 个数量级（Table 1），而训练/测试损失与基线相当",
        "<strong>网络架构</strong>：极简 MLP（3 层全连接，200 隐藏单元，tanh 激活），训练使用 Adam（lr = 1e-3）"
      ],
      "detail": "<h5>核心架构示意图</h5>\n<p><img alt=\"HNN 核心思想对比图\" src=\"https://ar5iv.labs.arxiv.org/html/1906.01563/assets/x1.png\" />\n<em>图 1：左侧为基线方法——直接用 NN 拟合状态导数 <span class=\"kb-math kb-math-inline\">(\\dot{q}, \\dot{p})</span>；右侧为 HNN——NN 输出标量 <span class=\"kb-math kb-math-inline\">H_\\theta</span>，再通过辛梯度（自动微分）得到动力学。HNN 的相空间轨迹保持在等能量面上（右下角），而基线轨迹逐渐偏离（左下角）。</em></p>\n<h5>算法伪代码</h5>\n<pre><code class=\"language-python\"># HNN 训练与推理伪代码\nimport torch\nimport torch.autograd as autograd\n\n# === 模型定义 ===\nclass HNN(torch.nn.Module):\n    def __init__(self, input_dim, hidden_dim=200):\n        super().__init__()\n        self.net = torch.nn.Sequential(\n            torch.nn.Linear(input_dim, hidden_dim),  # (q,p) → hidden\n            torch.nn.Tanh(),\n            torch.nn.Linear(hidden_dim, hidden_dim),\n            torch.nn.Tanh(),\n            torch.nn.Linear(hidden_dim, 1)            # → 标量 H\n        )\n\n    def forward(self, q, p):\n        x = torch.cat([q, p], dim=-1)\n        return self.net(x)  # 输出标量哈密顿量\n\n    def time_derivative(self, q, p):\n        &quot;&quot;&quot;通过辛梯度计算 dq/dt, dp/dt&quot;&quot;&quot;\n        q.requires_grad_(True)\n        p.requires_grad_(True)\n        H = self.forward(q, p)\n        dH_dq = autograd.grad(H.sum(), q, create_graph=True)[0]\n        dH_dp = autograd.grad(H.sum(), p, create_graph=True)[0]\n        dq_dt = dH_dp       # Hamilton 方程: dq/dt = ∂H/∂p\n        dp_dt = -dH_dq      # Hamilton 方程: dp/dt = -∂H/∂q\n        return dq_dt, dp_dt\n\n# === 训练循环 ===\nmodel = HNN(input_dim=2)  # 1D 系统: q, p 各 1 维\noptimizer = torch.optim.Adam(model.parameters(), lr=1e-3)\n\nfor step in range(2000):\n    # 从数据中采样 (q, p, dq/dt_true, dp/dt_true)\n    q, p, dq_true, dp_true = sample_batch(data, batch_size=200)\n    dq_pred, dp_pred = model.time_derivative(q, p)\n    # 损失: 预测导数 vs 真实导数 (Eq 3)\n    loss = ((dq_pred - dq_true)**2 + (dp_pred - dp_true)**2).mean()\n    optimizer.zero_grad()\n    loss.backward()\n    optimizer.step()\n\n# === 推理: 用 RK4 积分生成轨迹 ===\ndef rk4_step(model, q, p, dt):\n    def f(q, p):\n        return model.time_derivative(q, p)\n    k1q, k1p = f(q, p)\n    k2q, k2p = f(q + dt/2*k1q, p + dt/2*k1p)\n    k3q, k3p = f(q + dt/2*k2q, p + dt/2*k2p)\n    k4q, k4p = f(q + dt*k3q, p + dt*k3p)\n    q_new = q + dt/6 * (k1q + 2*k2q + 2*k3q + k4q)\n    p_new = p + dt/6 * (k1p + 2*k2p + 2*k3p + k4p)\n    return q_new, p_new\n</code></pre>\n<h5>动机与背景</h5>\n<p>物理系统的动力学建模是科学计算的核心任务。传统的神经网络方法（如 Neural ODE）直接用网络拟合状态的时间导数 <span class=\"kb-math kb-math-inline\">\\dot{\\mathbf{x}} = f_\\theta(\\mathbf{x})</span>，虽然灵活，但<strong>完全忽略了物理系统的守恒律</strong>。对于保守力学系统，总能量 <span class=\"kb-math kb-math-inline\">H(\\mathbf{q}, \\mathbf{p})</span> 是一个运动常数——沿真实轨迹恒定不变。普通 NN 无法保证这一点，导致长时间积分时能量漂移、轨迹发散。</p>\n<div class=\"key-point\">💡 <strong>关键洞察</strong>：哈密顿力学提供了一个天然的归纳偏置——只要动力学由某个标量函数 <span class=\"kb-math kb-math-inline\">H</span> 的辛梯度给出，能量就自动守恒。HNN 的核心贡献就是将这一结构性约束嵌入神经网络。</div>\n<h5>哈密顿力学基础</h5>\n<p>对于一个具有广义坐标 <span class=\"kb-math kb-math-inline\">\\mathbf{q}</span> 和共轭动量 <span class=\"kb-math kb-math-inline\">\\mathbf{p}</span> 的力学系统，哈密顿量 <span class=\"kb-math kb-math-inline\">H(\\mathbf{q}, \\mathbf{p})</span> 是系统的总能量。<strong>哈密顿正则方程</strong>给出了系统的时间演化：</p>\n<div class=\"kb-math kb-math-display\">\\frac{d\\mathbf{q}}{dt} = \\frac{\\partial H}{\\partial \\mathbf{p}}, \\qquad \\frac{d\\mathbf{p}}{dt} = -\\frac{\\partial H}{\\partial \\mathbf{q}} \\tag{1}</div>\n<p>这组方程具有<strong>辛结构</strong>（symplectic structure），可以紧凑地写为：</p>\n<div class=\"kb-math kb-math-display\">\\frac{d}{dt}\\begin{pmatrix} \\mathbf{q} \\\\ \\mathbf{p} \\end{pmatrix} = \\begin{pmatrix} 0 &amp; I \\\\ -I &amp; 0 \\end{pmatrix} \\nabla_{(\\mathbf{q},\\mathbf{p})} H \\tag{2}</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">J = \\begin{pmatrix} 0 &amp; I \\\\ -I &amp; 0 \\end{pmatrix}</span> 是辛矩阵。辛结构的直接推论是：</p>\n<div class=\"kb-math kb-math-display\">\\frac{dH}{dt} = \\nabla H \\cdot \\dot{\\mathbf{x}} = \\nabla H \\cdot J \\nabla H = 0</div>\n<p>即 <strong><span class=\"kb-math kb-math-inline\">H</span> 沿轨迹恒为常数</strong>——能量自动守恒，无需额外约束。</p>\n<h5>HNN 的核心机制</h5>\n<p>HNN 的设计极为优雅：</p>\n<ol>\n<li>\n<p><strong>参数化哈密顿量</strong>：用一个神经网络 <span class=\"kb-math kb-math-inline\">H_\\theta: \\mathbb{R}^{2n} \\to \\mathbb{R}</span> 将相空间坐标 <span class=\"kb-math kb-math-inline\">(\\mathbf{q}, \\mathbf{p})</span> 映射为标量。网络不直接预测动力学，而是预测一个\"能量景观\"。</p>\n</li>\n<li>\n<p><strong>辛梯度提取动力学</strong>：利用自动微分计算 <span class=\"kb-math kb-math-inline\">\\partial H_\\theta / \\partial \\mathbf{p}</span> 和 <span class=\"kb-math kb-math-inline\">\\partial H_\\theta / \\partial \\mathbf{q}</span>，再通过哈密顿方程得到 <span class=\"kb-math kb-math-inline\">\\dot{\\mathbf{q}}</span> 和 <span class=\"kb-math kb-math-inline\">\\dot{\\mathbf{p}}</span>。这一步是 HNN 的灵魂——它将物理结构硬编码进了计算图。</p>\n</li>\n<li>\n<p><strong>损失函数（Eq 3）</strong>：</p>\n</li>\n</ol>\n<div class=\"kb-math kb-math-display\">\\mathcal{L}_{\\text{HNN}} = \\left\\| \\frac{\\partial H_\\theta}{\\partial \\mathbf{p}} - \\frac{d\\mathbf{q}}{dt} \\right\\|^2 + \\left\\| \\frac{\\partial H_\\theta}{\\partial \\mathbf{q}} + \\frac{d\\mathbf{p}}{dt} \\right\\|^2 \\tag{3}</div>\n<div class=\"warn-box\">⚠️ <strong>注意</strong>：训练数据只需要状态-导数对 <span class=\"kb-math kb-math-inline\">(\\mathbf{q}, \\mathbf{p}, \\dot{\\mathbf{q}}, \\dot{\\mathbf{p}})</span>，<strong>不需要能量标签</strong>。能量守恒是结构的自然结果，而非显式监督的目标。</div>\n<h5>从坐标到像素：Autoencoder + HNN</h5>\n<p>论文最具创新性的实验是 <strong>Task 5: Pixel Pendulum</strong>——直接从 28×28 灰度图像序列中学习哈密顿动力学。</p>\n<p><img alt=\"像素摆实验结果\" src=\"https://ar5iv.labs.arxiv.org/html/1906.01563/assets/x4.png\" />\n<em>图 4：像素摆实验。HNN 在潜空间中保持能量守恒，预测轨迹数百帧后仍接近真实值；基线模型迅速衰减到低能态。</em></p>\n<p>方法设计：\n- <strong>输入</strong>：连续两帧 28×28 图像拼接（batch × 28 × 28 × 2），双帧使速度可观测\n- <strong>Autoencoder</strong>：4 层全连接（200 隐藏单元，ReLU + 残差连接），潜空间维度为 2（<span class=\"kb-math kb-math-inline\">\\mathbf{z} = (\\mathbf{z_q}, \\mathbf{z_p})</span>）\n- <strong>HNN</strong>：在潜空间上运行，架构与坐标实验相同\n- <strong>辅助损失（Eq 7）</strong>：</p>\n<div class=\"kb-math kb-math-display\">\\mathcal{L}_{CC} = \\left\\| \\mathbf{z}^t_{\\mathbf{p}} - (\\mathbf{z}^t_{\\mathbf{q}} - \\mathbf{z}^{t+1}_{\\mathbf{q}}) \\right\\|_2 \\tag{7}</div>\n<p>该损失鼓励 <span class=\"kb-math kb-math-inline\">\\mathbf{z_p}</span> 近似 <span class=\"kb-math kb-math-inline\">\\dot{\\mathbf{z}}_{\\mathbf{q}}</span>（有限差分），使潜空间具有正则坐标 <span class=\"kb-math kb-math-inline\">(\\mathbf{q}, \\mathbf{p})</span> 的性质——这是哈密顿力学成立的前提条件。</p>\n<p>总损失 = HNN 损失 + 自编码器重建损失（L2 像素损失）+ 辅助正则坐标损失。</p>\n<h5>实验结果与对比</h5>\n<p>论文在 5 个任务上对比了 HNN 与基线（直接拟合导数的同架构 NN）：</p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>任务</th>\n<th>基线能量 MSE (×10³)</th>\n<th>HNN 能量 MSE (×10³)</th>\n<th>提升倍数</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>理想弹簧</td>\n<td>170 ± 20</td>\n<td><strong>0.38 ± 0.1</strong></td>\n<td>~450×</td>\n</tr>\n<tr>\n<td>理想单摆</td>\n<td>42 ± 10</td>\n<td><strong>25 ± 5</strong></td>\n<td>~1.7×</td>\n</tr>\n<tr>\n<td>真实单摆</td>\n<td>390 ± 7</td>\n<td><strong>14 ± 5</strong></td>\n<td>~28×</td>\n</tr>\n<tr>\n<td>两体问题</td>\n<td>—</td>\n<td>—</td>\n<td>约 10×</td>\n</tr>\n<tr>\n<td>像素单摆</td>\n<td>—</td>\n<td>—</td>\n<td>数量级提升</td>\n</tr>\n</tbody>\n</table></div>\n<div class=\"key-point\">💡 <strong>关键发现</strong>：HNN 与基线的训练/测试损失相当（两者拟合能力相似），但 HNN 在<strong>能量守恒</strong>指标上以压倒性优势胜出。这说明辛结构归纳偏置的价值不在于更好的拟合，而在于更好的<strong>泛化和长期稳定性</strong>。</div>\n<h5>与传统方法的对比</h5>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>特性</th>\n<th>传统 NN (Neural ODE)</th>\n<th>HNN</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>输出</td>\n<td>直接预测 <span class=\"kb-math kb-math-inline\">\\dot{\\mathbf{q}}, \\dot{\\mathbf{p}}</span></td>\n<td>预测标量 <span class=\"kb-math kb-math-inline\">H_\\theta</span>，辛梯度得动力学</td>\n</tr>\n<tr>\n<td>能量守恒</td>\n<td>无保证，长期漂移</td>\n<td>结构性保证（精确到数值积分误差）</td>\n</tr>\n<tr>\n<td>物理先验</td>\n<td>无</td>\n<td>哈密顿辛结构</td>\n</tr>\n<tr>\n<td>训练数据</td>\n<td>状态-导数对</td>\n<td>同样是状态-导数对（无需能量标签）</td>\n</tr>\n<tr>\n<td>长期积分</td>\n<td>轨迹迅速发散</td>\n<td>轨迹长期稳定</td>\n</tr>\n<tr>\n<td>局限</td>\n<td>灵活但不稳定</td>\n<td>要求系统为保守系统（无耗散）</td>\n</tr>\n</tbody>\n</table></div>\n<h5>讨论与局限</h5>\n<ul>\n<li><strong>正则坐标要求</strong>：HNN 假设输入为正则坐标 <span class=\"kb-math kb-math-inline\">(\\mathbf{q}, \\mathbf{p})</span>，对于像素等非正则输入需要额外的 Autoencoder 和辅助损失来学习正则表示</li>\n<li><strong>保守系统假设</strong>：HNN 天然不能处理耗散系统（如有摩擦的系统），后续工作如 Dissipative HNN 对此进行了扩展</li>\n<li><strong>数值积分误差</strong>：虽然 HNN 结构上保证 <span class=\"kb-math kb-math-inline\">dH/dt = 0</span>，但实际使用 RK4 等非辛积分器时仍有微小能量漂移；使用辛积分器（如 Leapfrog）可进一步改善</li>\n<li><strong>可扩展性</strong>：论文在两体和三体问题上展示了扩展性，但更高维系统的效果有待验证</li>\n</ul>",
      "quiz": {
        "q": "HNN 相比直接拟合时间导数的基线网络，其核心优势来源于什么？",
        "options": [
          "使用了更深的网络架构和更多的训练数据",
          "网络输出标量哈密顿量并通过辛梯度得到动力学，结构性地保证能量守恒",
          "在损失函数中显式加入了能量守恒的惩罚项",
          "使用了辛积分器（如 Leapfrog）替代 Runge-Kutta 进行时间积分"
        ],
        "answer": 1,
        "explain": "HNN 的核心创新在于让 NN 输出标量 H 而非直接输出导数，再通过自动微分计算辛梯度得到动力学。由于辛结构的数学性质（dH/dt = ∇H · J∇H = 0），能量守恒是结构的自然结果，无需显式惩罚项或特殊积分器。"
      }
    },
    {
      "id": "xpinns",
      "num": 7,
      "name": "XPINNs",
      "fullName": "扩展PINN (Extended Physics-Informed Neural Networks)",
      "year": "2020",
      "org": "布朗大学",
      "parent": "pinn",
      "paperUrl": "https://doi.org/10.4208/cicp.OA-2020-0164",
      "projectUrl": "",
      "category": "pde_solving",
      "motivation": "域分解策略支持复杂几何并行化",
      "summary": "XPINNs 的核心目标是：域分解策略支持复杂几何并行化。",
      "keyPoints": [
        "核心动机：域分解策略支持复杂几何并行化",
        "演化来源：继承或改进自 pinn",
        "代表机构：布朗大学"
      ],
      "detail": "<p>域分解策略支持复杂几何并行化</p>"
    },
    {
      "id": "gns",
      "num": 8,
      "name": "GNS",
      "fullName": "图网络模拟器 (Graph Network Simulators)",
      "year": "2020",
      "org": "DeepMind",
      "parent": "—",
      "paperUrl": "https://proceedings.mlr.press/v119/sanchez-gonzalez20a.html",
      "projectUrl": "",
      "category": "fluid_simulation",
      "motivation": "粒子图网络模拟流体与材料交互",
      "summary": "GNS 的核心目标是：粒子图网络模拟流体与材料交互。",
      "keyPoints": [
        "核心动机：粒子图网络模拟流体与材料交互",
        "代表机构：DeepMind"
      ],
      "detail": "<p>粒子图网络模拟流体与材料交互</p>"
    },
    {
      "id": "meshgraphnets",
      "num": 9,
      "name": "MeshGraphNets",
      "fullName": "网格图网络 (Mesh Graph Networks)",
      "year": "2020",
      "org": "DeepMind",
      "parent": "gns",
      "paperUrl": "https://arxiv.org/abs/2010.03409",
      "projectUrl": "",
      "category": "fluid_simulation",
      "motivation": "针对欧拉网格的非结构化图网络",
      "summary": "MeshGraphNets 的核心目标是：针对欧拉网格的非结构化图网络。",
      "keyPoints": [
        "核心动机：针对欧拉网格的非结构化图网络",
        "演化来源：继承或改进自 gns",
        "代表机构：DeepMind"
      ],
      "detail": "<p>针对欧拉网格的非结构化图网络</p>"
    },
    {
      "id": "jax_md",
      "num": 10,
      "name": "JAX MD",
      "fullName": "JAX分子动力学 (JAX Molecular Dynamics)",
      "year": "2020",
      "org": "Google",
      "parent": "—",
      "paperUrl": "https://proceedings.neurips.cc/paper/2020/hash/83d3d4b6c9579515e1679aca8cbc8033-Abstract.html",
      "projectUrl": "",
      "category": "fluid_simulation",
      "motivation": "端到端可微分分子动力学引擎",
      "summary": "JAX MD 的核心目标是：端到端可微分分子动力学引擎。",
      "keyPoints": [
        "核心动机：端到端可微分分子动力学引擎",
        "代表机构：Google"
      ],
      "detail": "<p>端到端可微分分子动力学引擎</p>"
    },
    {
      "id": "difftaichi",
      "num": 11,
      "name": "DiffTaichi",
      "fullName": "可微分太极 (Differentiable Taichi)",
      "year": "2020",
      "org": "MIT",
      "parent": "—",
      "paperUrl": "https://arxiv.org/abs/1910.00935",
      "projectUrl": "",
      "category": "fluid_simulation",
      "motivation": "命令式可微分编程支持流体控制",
      "summary": "DiffTaichi 的核心目标是：命令式可微分编程支持流体控制。",
      "keyPoints": [
        "核心动机：命令式可微分编程支持流体控制",
        "代表机构：MIT"
      ],
      "detail": "<p>命令式可微分编程支持流体控制</p>"
    },
    {
      "id": "phiflow",
      "num": 12,
      "name": "PhiFlow",
      "fullName": "流体物理库 (PhiFlow)",
      "year": "2020",
      "org": "慕尼黑工大",
      "parent": "—",
      "paperUrl": "https://github.com/tum-pbs/PhiFlow",
      "projectUrl": "",
      "category": "fluid_simulation",
      "motivation": "开源可微分流体仿真库",
      "summary": "PhiFlow 的核心目标是：开源可微分流体仿真库。",
      "keyPoints": [
        "核心动机：开源可微分流体仿真库",
        "代表机构：慕尼黑工大"
      ],
      "detail": "<p>开源可微分流体仿真库</p>"
    },
    {
      "id": "ai_feynman",
      "num": 13,
      "name": "AI Feynman",
      "fullName": "AI费曼 (AI Feynman)",
      "year": "2020",
      "org": "MIT",
      "parent": "—",
      "paperUrl": "https://www.science.org/doi/abs/10.1126/sciadv.aay2631",
      "projectUrl": "",
      "category": "physics_discovery",
      "motivation": "物理对称性与递归分解发现公式",
      "summary": "AI Feynman 的核心目标是：物理对称性与递归分解发现公式。",
      "keyPoints": [
        "核心动机：物理对称性与递归分解发现公式",
        "代表机构：MIT"
      ],
      "detail": "<p>物理对称性与递归分解发现公式</p>"
    },
    {
      "id": "ude",
      "num": 14,
      "name": "UDE",
      "fullName": "通用微分方程 (Universal Differential Equations)",
      "year": "2020",
      "org": "Christopher Rackauckas",
      "parent": "neural_ode",
      "paperUrl": "https://arxiv.org/abs/2001.04385",
      "projectUrl": "",
      "category": "physics_discovery",
      "motivation": "NN作为微分方程未知项补全物理",
      "summary": "UDE 的核心目标是：NN作为微分方程未知项补全物理。",
      "keyPoints": [
        "核心动机：NN作为微分方程未知项补全物理",
        "演化来源：继承或改进自 neural_ode",
        "代表机构：Christopher Rackauckas"
      ],
      "detail": "<p>NN作为微分方程未知项补全物理</p>"
    },
    {
      "id": "lnn",
      "num": 15,
      "name": "LNN",
      "fullName": "拉格朗日神经网络 (Lagrangian Neural Networks)",
      "year": "2020",
      "org": "DeepMind",
      "parent": "hnn",
      "paperUrl": "https://arxiv.org/abs/2003.04630",
      "projectUrl": "",
      "category": "physics_constrained",
      "motivation": "学习拉格朗日量处理约束动力学",
      "summary": "LNN 的核心目标是：学习拉格朗日量处理约束动力学。",
      "keyPoints": [
        "核心动机：学习拉格朗日量处理约束动力学",
        "演化来源：继承或改进自 hnn",
        "代表机构：DeepMind"
      ],
      "detail": "<p>学习拉格朗日量处理约束动力学</p>"
    },
    {
      "id": "sympnets",
      "num": 16,
      "name": "SympNets",
      "fullName": "辛神经网络 (Symplectic Neural Networks)",
      "year": "2020",
      "org": "Pengzhan Jin",
      "parent": "hnn",
      "paperUrl": "https://doi.org/10.1016/j.neunet.2020.08.028",
      "projectUrl": "",
      "category": "physics_constrained",
      "motivation": "本质满足辛对称消除数值耗散",
      "summary": "SympNets 的核心目标是：本质满足辛对称消除数值耗散。",
      "keyPoints": [
        "核心动机：本质满足辛对称消除数值耗散",
        "演化来源：继承或改进自 hnn",
        "代表机构：Pengzhan Jin"
      ],
      "detail": "<p>本质满足辛对称消除数值耗散</p>"
    },
    {
      "id": "particlenet",
      "num": 17,
      "name": "ParticleNet",
      "fullName": "粒子网络 (ParticleNet)",
      "year": "2020",
      "org": "Huilin Qu",
      "parent": "—",
      "paperUrl": "https://doi.org/10.1103/PhysRevD.101.056019",
      "projectUrl": "",
      "category": "quantum_particle",
      "motivation": "粒子云动态图卷积提升喷注鉴别",
      "summary": "ParticleNet 的核心目标是：粒子云动态图卷积提升喷注鉴别。",
      "keyPoints": [
        "核心动机：粒子云动态图卷积提升喷注鉴别",
        "代表机构：Huilin Qu"
      ],
      "detail": "<p>粒子云动态图卷积提升喷注鉴别</p>"
    },
    {
      "id": "hp_vpinns",
      "num": 18,
      "name": "hp-VPINNs",
      "fullName": "变分PINN (hp-Variational PINNs)",
      "year": "2021",
      "org": "布朗大学",
      "parent": "pinn",
      "paperUrl": "https://doi.org/10.1016/j.cma.2020.113533",
      "projectUrl": "",
      "category": "pde_solving",
      "motivation": "变分形式与hp细化优化精度",
      "summary": "hp-VPINNs 的核心目标是：变分形式与hp细化优化精度。",
      "keyPoints": [
        "核心动机：变分形式与hp细化优化精度",
        "演化来源：继承或改进自 pinn",
        "代表机构：布朗大学"
      ],
      "detail": "<p>变分形式与hp细化优化精度</p>"
    },
    {
      "id": "fno",
      "num": 19,
      "name": "FNO",
      "fullName": "傅里叶神经算子 (Fourier Neural Operator)",
      "year": "2021",
      "org": "Caltech",
      "parent": "—",
      "paperUrl": "https://openreview.net/forum?id=c8P9fhUhn9",
      "projectUrl": "",
      "category": "pde_solving",
      "motivation": "频率域积分运算实现分辨率无关",
      "summary": "FNO 的核心目标是：频率域积分运算实现分辨率无关。",
      "keyPoints": [
        "核心动机：频率域积分运算实现分辨率无关",
        "代表机构：Caltech"
      ],
      "detail": "<p>频率域积分运算实现分辨率无关</p>"
    },
    {
      "id": "deeponet",
      "num": 20,
      "name": "DeepONet",
      "fullName": "深度算子网络 (Deep Operator Network)",
      "year": "2021",
      "org": "宾大",
      "parent": "—",
      "paperUrl": "https://www.nature.com/articles/s42256-021-00302-5",
      "projectUrl": "",
      "category": "pde_solving",
      "motivation": "双分支架构学习函数空间映射",
      "summary": "DeepONet 的核心目标是：双分支架构学习函数空间映射。",
      "keyPoints": [
        "核心动机：双分支架构学习函数空间映射",
        "代表机构：宾大"
      ],
      "detail": "<p>双分支架构学习函数空间映射</p>"
    },
    {
      "id": "brax",
      "num": 21,
      "name": "Brax",
      "fullName": "JAX刚体引擎 (Brax)",
      "year": "2021",
      "org": "Google",
      "parent": "jax_md",
      "paperUrl": "https://github.com/google/brax",
      "projectUrl": "",
      "category": "fluid_simulation",
      "motivation": "高性能刚体动力学引擎",
      "summary": "Brax 的核心目标是：高性能刚体动力学引擎。",
      "keyPoints": [
        "核心动机：高性能刚体动力学引擎",
        "演化来源：继承或改进自 jax_md",
        "代表机构：Google"
      ],
      "detail": "<p>高性能刚体动力学引擎</p>"
    },
    {
      "id": "canns",
      "num": 22,
      "name": "CANNs",
      "fullName": "本构神经网络 (Constitutive Artificial Neural Networks)",
      "year": "2021",
      "org": "ETH Zurich",
      "parent": "—",
      "paperUrl": "https://doi.org/10.1016/j.jcp.2020.109841",
      "projectUrl": "",
      "category": "solid_mechanics",
      "motivation": "应变能密度嵌入确保本构稳定",
      "summary": "CANNs 的核心目标是：应变能密度嵌入确保本构稳定。",
      "keyPoints": [
        "核心动机：应变能密度嵌入确保本构稳定",
        "代表机构：ETH Zurich"
      ],
      "detail": "<p>应变能密度嵌入确保本构稳定</p>"
    },
    {
      "id": "tanns",
      "num": 23,
      "name": "TANNs",
      "fullName": "热力学神经网络 (Thermodynamics-based ANNs)",
      "year": "2021",
      "org": "希腊国立理工",
      "parent": "—",
      "paperUrl": "https://doi.org/10.1016/j.jmps.2020.104277",
      "projectUrl": "",
      "category": "solid_mechanics",
      "motivation": "强制热力学定律模拟粘塑性",
      "summary": "TANNs 的核心目标是：强制热力学定律模拟粘塑性。",
      "keyPoints": [
        "核心动机：强制热力学定律模拟粘塑性",
        "代表机构：希腊国立理工"
      ],
      "detail": "<p>强制热力学定律模拟粘塑性</p>"
    },
    {
      "id": "egnn",
      "num": 24,
      "name": "EGNN",
      "fullName": "等变图神经网络 (Equivariant Graph Neural Networks)",
      "year": "2021",
      "org": "阿姆斯特丹大学",
      "parent": "—",
      "paperUrl": "https://proceedings.mlr.press/v139/satorras21a.html",
      "projectUrl": "",
      "category": "physics_constrained",
      "motivation": "旋转平移反射等变保证物理一致",
      "summary": "EGNN 的核心目标是：旋转平移反射等变保证物理一致。",
      "keyPoints": [
        "核心动机：旋转平移反射等变保证物理一致",
        "代表机构：阿姆斯特丹大学"
      ],
      "detail": "<p>旋转平移反射等变保证物理一致</p>"
    },
    {
      "id": "noether_nets",
      "num": 25,
      "name": "Noether Networks",
      "fullName": "诺特网络 (Noether Networks)",
      "year": "2021",
      "org": "MIT",
      "parent": "—",
      "paperUrl": "https://proceedings.neurips.cc/paper/2021/hash/8e296a067a37563370ded05f5a3bf83e-Abstract.html",
      "projectUrl": "",
      "category": "physics_constrained",
      "motivation": "基于诺特定理自动发现守恒量",
      "summary": "Noether Networks 的核心目标是：基于诺特定理自动发现守恒量。",
      "keyPoints": [
        "核心动机：基于诺特定理自动发现守恒量",
        "代表机构：MIT"
      ],
      "detail": "<p>基于诺特定理自动发现守恒量</p>"
    },
    {
      "id": "gpinn",
      "num": 26,
      "name": "gPINN",
      "fullName": "梯度增强PINN (Gradient-enhanced PINN)",
      "year": "2022",
      "org": "宾大",
      "parent": "pinn",
      "paperUrl": "https://doi.org/10.1016/j.cma.2022.114823",
      "projectUrl": "",
      "category": "pde_solving",
      "motivation": "引入残差梯度项提升陡峭解精度",
      "summary": "gPINN 的核心目标是：引入残差梯度项提升陡峭解精度。",
      "keyPoints": [
        "核心动机：引入残差梯度项提升陡峭解精度",
        "演化来源：继承或改进自 pinn",
        "代表机构：宾大"
      ],
      "detail": "<p>引入残差梯度项提升陡峭解精度</p>"
    },
    {
      "id": "causal_pinn",
      "num": 27,
      "name": "Causal PINN",
      "fullName": "因果PINN (Causal Physics-Informed Neural Networks)",
      "year": "2022",
      "org": "宾大",
      "parent": "pinn",
      "paperUrl": "https://arxiv.org/abs/2203.07404",
      "projectUrl": "",
      "category": "pde_solving",
      "motivation": "时间因果律加权解决长时程收敛",
      "summary": "Causal PINN 的核心目标是：时间因果律加权解决长时程收敛。",
      "keyPoints": [
        "核心动机：时间因果律加权解决长时程收敛",
        "演化来源：继承或改进自 pinn",
        "代表机构：宾大"
      ],
      "detail": "<h3>Respecting Causality is All You Need for Training Physics-Informed Neural Networks</h3>\n<pre><code class=\"language-yaml\">标题: &quot;Respecting Causality is All You Need for Training Physics-Informed Neural Networks&quot;\n作者: [Sifan Wang, Shyam Sankaran, Paris Perdikaris]\n机构: University of Pennsylvania\n年份: 2022\n期刊/会议: arXiv:2203.07404\nDOI: https://doi.org/10.48550/arXiv.2203.07404\n代码: https://github.com/PredictiveIntelligenceLab/CausalPINNs\n关键词: [Physics-Informed Neural Networks, Causality, PDE Residual Weighting, Temporal Causality, Allen-Cahn, Navier-Stokes]\n</code></pre>\n<p>📝 <strong>一句话总结</strong>: 本文揭示了标准PINN训练中违反时间因果性的根本缺陷，提出通过指数加权残差损失强制因果约束的训练算法，在Allen-Cahn、Lorenz系统、Kuramoto-Sivashinsky方程和湍流Navier-Stokes方程上实现了比现有最优方法高1-2个数量级的精度提升。</p>\n<hr />\n<p>🎯 <strong>核心要点</strong>:</p>\n<ol>\n<li>\n<p><strong>问题诊断 — 因果性违反</strong>: 标准PINN将所有时间点的PDE残差同等对待，导致网络可能在尚未正确拟合初始条件和早期时间步时，就尝试最小化后期时间步的残差。这违反了PDE解的时间因果性（后时刻的解依赖于前时刻），是PINN在时间依赖问题上失败的根本原因。</p>\n</li>\n<li>\n<p><strong>因果加权损失</strong>: 提出将PDE残差损失按时间分组，并引入因果权重 $w_i = \\exp\\left(-\\varepsilon \\sum_{k=1}^{i-1} \\mathcal{L}_r(t_k, \\boldsymbol{\\theta})\\right)$，使得只有当前面时间步的残差被充分最小化后，后续时间步的权重才会被\"激活\"（趋近于1）。</p>\n</li>\n<li>\n<p><strong>收敛判据与ε退火</strong>: 监控 $\\min_i w_i &gt; \\delta$ 作为训练收敛的停止准则；采用ε递增退火策略避免超参数调优。</p>\n</li>\n<li>\n<p><strong>Modified MLP架构</strong>: 结合门控机制的改进MLP架构，通过全局编码向量U、V对每层隐藏状态进行仿射混合，进一步提升精度。</p>\n</li>\n<li>\n<p><strong>SOTA结果</strong>: Allen-Cahn方程L2误差从 $1.68 \\times 10^{-2}$ 降至 $1.39 \\times 10^{-4}$（提升120倍）；首次成功用PINN求解混沌Lorenz系统、Kuramoto-Sivashinsky方程和湍流Navier-Stokes方程。</p>\n</li>\n</ol>\n<hr />\n<p>🔬 <strong>深入细节</strong>:</p>\n<h4>示意图：因果训练 vs 标准训练</h4>\n<p><strong>标准PINN的失败模式（Allen-Cahn方程）：</strong></p>\n<div class=\"img-wrap\"><img src=\"https://ar5iv.labs.arxiv.org/html/2203.07404/assets/x1.png\" alt=\"标准PINN预测结果\" loading=\"lazy\"><p class=\"img-caption\">▲ 标准PINN预测结果</p></div>\n<p><em>图1: 标准PINN在Allen-Cahn方程上的预测。左图为预测解，中图为逐点误差，右图为真实解。可以看到网络在后期时间（t &gt; 0.5）产生了严重的预测偏差，因为训练过程中违反了时间因果性。</em></p>\n<p><strong>因果PINN的成功：</strong></p>\n<div class=\"img-wrap\"><img src=\"https://ar5iv.labs.arxiv.org/html/2203.07404/assets/x3.png\" alt=\"因果PINN预测结果\" loading=\"lazy\"><p class=\"img-caption\">▲ 因果PINN预测结果</p></div>\n<p><em>图3: 使用因果训练的PINN在Allen-Cahn方程上的预测。左图为预测解，中图为逐点误差，右图为真实解。因果加权确保网络按照时间顺序逐步学习，最终在整个时间域上都获得了高精度的预测。</em></p>\n<p><strong>训练过程中权重的演化：</strong></p>\n<div class=\"img-wrap\"><img src=\"https://ar5iv.labs.arxiv.org/html/2203.07404/assets/x4.png\" alt=\"训练收敛过程\" loading=\"lazy\"><p class=\"img-caption\">▲ 训练收敛过程</p></div>\n<p><em>图4: Allen-Cahn方程的因果训练过程。左：损失收敛曲线；中：不同训练迭代时的时间残差分布；右：不同训练迭代时的因果权重分布。可以看到权重从仅激活t=0逐步扩展到整个时间域，最终所有权重收敛到1。</em></p>\n<hr />\n<h4>伪代码：因果PINN训练算法（Algorithm 1）</h4>\n<pre><code>Algorithm: Causal Training for PINNs\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\nInput:\n  - 神经网络 u_θ(t, x)，满足精确边界条件\n  - 时间配点序列 {t_0, t_1, ..., t_{N_t}}（非递减）\n  - 空间配点集合\n  - ε退火序列 {ε_1, ε_2, ..., ε_K}（递增）\n  - 收敛阈值 δ ∈ (0, 1)\n  - IC权重系数 λ_ic\n\nOutput: 训练好的网络参数 θ*\n\nfor k = 1, 2, ..., K do:                    # ε退火循环\n    ε ← ε_k\n    while min_i(w_i) ≤ δ do:                # 收敛判据\n        # Step 1: 计算各时间步的残差损失\n        for i = 0, 1, ..., N_t do:\n            if i == 0:\n                L(t_0, θ) = λ_ic · L_ic(θ)  # 初始条件作为t=0残差\n            else:\n                L(t_i, θ) = (1/N_x) Σ_j |r_θ(t_i, x_j)|²  # PDE残差\n            end if\n        end for\n\n        # Step 2: 计算因果权重（stop_gradient!）\n        for i = 0, 1, ..., N_t do:\n            w_i = exp(-ε · Σ_{k=0}^{i-1} L(t_k, θ))  # Eq. 3.2\n        end for\n        w_i ← stop_gradient(w_i)            # 阻止梯度回传\n\n        # Step 3: 计算加权总损失\n        L(θ) = (1/N_t) Σ_{i=0}^{N_t} w_i · L(t_i, θ)  # Eq. 3.4\n\n        # Step 4: 梯度下降更新\n        θ ← θ - α · ∇_θ L(θ)\n    end while\nend for\nreturn θ\n</code></pre>\n<hr />\n<h4>方法解读</h4>\n<p><strong>1. 因果性违反的诊断与动机</strong></p>\n<p>物理系统的时间演化具有严格的因果性：$t$ 时刻的状态完全由初始条件和 $[0, t)$ 时间段内的动力学决定。然而，标准PINN的损失函数 $\\mathcal{L}<em i=\"1\">r(\\boldsymbol{\\theta}) = \\frac{1}{N} \\sum</em>_i)|^2$ 将所有时空配点的残差平等对待，完全忽略了这种时间依赖关系。作者通过对Allen-Cahn方程的详细分析揭示了这一问题的严重后果：在训练过程中，网络可能会优先降低后期时间步（如 $t \\approx 1.0$）的残差，而此时初始条件和早期时间步的残差仍然很大。这意味着网络在一个\"错误的\"初始状态基础上试图满足PDE约束，导致最终预测在后期时间严重偏离真实解。这一发现从根本上解释了为什么标准PINN在许多时间依赖问题上表现不佳，特别是对于具有复杂动力学行为（如相变、混沌、湍流）的系统。}^{N} |r_{\\boldsymbol{\\theta}}(t_i, \\mathbf{x</p>\n<p><strong>2. 因果加权机制的数学设计</strong></p>\n<p>因果训练的核心思想是通过一组自适应权重 ${w_i}$ 来强制执行时间因果性。具体而言，首先将PDE残差损失按时间分组：$\\mathcal{L}<em j=\"1\">r(t_i, \\boldsymbol{\\theta}) = \\frac{1}{N_x} \\sum</em>}^{N_x} |r_{\\boldsymbol{\\theta}}(t_i, \\mathbf{x<em i=\"1\">j)|^2$，然后定义加权损失 $\\mathcal{L}_r(\\boldsymbol{\\theta}) = \\frac{1}{N_t} \\sum</em>}^{N_t} w_i \\mathcal{L<em k=\"1\">r(t_i, \\boldsymbol{\\theta})$（Eq. 3.1）。权重的定义为 $w_i = \\exp\\left(-\\varepsilon \\sum</em>}^{i-1} \\mathcal{L<em ic=\"ic\">r(t_k, \\boldsymbol{\\theta})\\right)$（Eq. 3.2），这是一个精巧的设计：当前面所有时间步的累积残差很大时，$w_i$ 趋近于0，该时间步的损失贡献被抑制；只有当前面的残差被充分最小化（累积和趋近于0）时，$w_i$ 才趋近于1，该时间步才被\"激活\"。参数 $\\varepsilon$ 控制这种因果约束的强度——$\\varepsilon$ 越大，对因果顺序的要求越严格。为了避免 $\\varepsilon$ 的调优，作者采用退火策略，使用递增序列 ${\\varepsilon_1, \\varepsilon_2, \\ldots, \\varepsilon_K}$，逐步增强因果约束的严格程度。此外，初始条件损失 $\\mathcal{L}</em>$ 被视为 $t=0$ 时刻的特殊残差，统一纳入加权框架（Eq. 3.4），确保初始条件在所有PDE残差之前被优先拟合。</p>\n<p><strong>3. Modified MLP与实践细节</strong></p>\n<p>为了进一步提升PINN的表达能力和训练效率，作者引入了Modified MLP架构。该架构首先通过两个编码层将输入 $\\mathbf{X}$ 映射为全局特征向量 $\\mathbf{U} = \\sigma(\\mathbf{X}\\mathbf{W}_1 + \\mathbf{b}_1)$ 和 $\\mathbf{V} = \\sigma(\\mathbf{X}\\mathbf{W}_2 + \\mathbf{b}_2)$，然后在每个隐藏层中，使用门控机制将标准MLP的输出 $\\mathbf{Z}^{(l)}$ 与 $\\mathbf{U}$、$\\mathbf{V}$ 进行仿射混合：$\\mathbf{H}^{(l+1)} = (1 - \\mathbf{Z}^{(l)}) \\odot \\mathbf{U} + \\mathbf{Z}^{(l)} \\odot \\mathbf{V}$。这种设计使得每一层都能直接访问输入的全局编码信息，缓解了深层网络中的梯度消失问题，并增强了网络对高频特征的捕获能力。在实现层面，权重 $w_i$ 的计算使用 <code>lax.stop_gradient</code> 阻止梯度回传，确保权重仅作为损失的缩放因子而不影响梯度计算的方向。整个算法的额外计算开销可以忽略不计，因为权重的计算仅需要已经存储在计算图中的损失函数值。</p>\n<p><strong>4. 实验结果与关键数据</strong></p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>方法</th>\n<th>Allen-Cahn L2误差</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>标准PINN (MLP)</td>\n<td>不收敛</td>\n</tr>\n<tr>\n<td>最优基线方法 (NTK+RBA)</td>\n<td>$1.68 \\times 10^{-2}$</td>\n</tr>\n<tr>\n<td>因果PINN (MLP)</td>\n<td>$1.43 \\times 10^{-3}$</td>\n</tr>\n<tr>\n<td>因果PINN (Modified MLP)</td>\n<td>$\\mathbf{1.39 \\times 10^{-4}}$</td>\n</tr>\n</tbody>\n</table></div>\n<p>因果训练不仅在Allen-Cahn方程上取得了突破性结果，还首次成功将PINN应用于以下极具挑战性的问题：\n- <strong>Lorenz系统</strong>（混沌吸引子）：标准PINN完全无法追踪混沌轨迹，因果PINN能够准确预测\n- <strong>Kuramoto-Sivashinsky方程</strong>（时空混沌）：需要高精度捕获复杂的时空模式\n- <strong>湍流Navier-Stokes方程</strong>（Re=500）：首次用PINN求解高雷诺数湍流问题</p>\n<hr />\n<p>🧪 <strong>练习与思考</strong>:</p>\n<ol>\n<li>\n<p><strong>概念理解</strong>: 解释为什么在因果权重公式 $w_i = \\exp(-\\varepsilon \\sum_{k=1}^{i-1} \\mathcal{L}_r(t_k, \\boldsymbol{\\theta}))$ 中使用指数函数而非其他单调递减函数（如线性衰减）？指数形式带来了哪些数学和优化上的优势？</p>\n</li>\n<li>\n<p><strong>参数分析</strong>: 因果参数 $\\varepsilon$ 过小和过大分别会导致什么问题？请从优化景观的角度分析，并解释为什么退火策略（从小到大逐步增加 $\\varepsilon$）是一个有效的解决方案。</p>\n</li>\n<li>\n<p><strong>方法扩展</strong>: 本文主要处理具有周期边界条件的PDE。如果要将因果训练推广到具有Dirichlet或Neumann边界条件的问题，你会如何修改Algorithm 1？提示：考虑边界条件损失与时间因果性的关系。</p>\n</li>\n<li>\n<p><strong>实现练习</strong>: 使用PyTorch或JAX实现因果权重的计算函数。输入为各时间步的残差损失向量 $[\\mathcal{L}(t_1), \\mathcal{L}(t_2), \\ldots, \\mathcal{L}(t_N)]$ 和参数 $\\varepsilon$，输出为权重向量 $[w_1, w_2, \\ldots, w_N]$。注意要使用 <code>detach()</code>（PyTorch）或 <code>stop_gradient</code>（JAX）阻止梯度回传。</p>\n</li>\n<li>\n<p><strong>批判性思考</strong>: 因果训练假设PDE的解具有严格的时间因果性。对于椭圆型PDE（如Laplace方程）或稳态问题，这种方法是否适用？如果不适用，你能否提出类似的\"尊重物理结构\"的训练策略？</p>\n</li>\n</ol>"
    },
    {
      "id": "pi_deeponet",
      "num": 28,
      "name": "PI-DeepONet",
      "fullName": "物理信息DeepONet (Physics-Informed DeepONet)",
      "year": "2022",
      "org": "布朗大学",
      "parent": "deeponet",
      "paperUrl": "https://link.springer.com/book/10.1007/978-3-031-36644-4",
      "projectUrl": "",
      "category": "pde_solving",
      "motivation": "物理信息嵌入算子网络",
      "summary": "PI-DeepONet 的核心目标是：物理信息嵌入算子网络。",
      "keyPoints": [
        "核心动机：物理信息嵌入算子网络",
        "演化来源：继承或改进自 deeponet",
        "代表机构：布朗大学"
      ],
      "detail": "<p>物理信息嵌入算子网络</p>"
    },
    {
      "id": "geo_fno",
      "num": 29,
      "name": "Geo-FNO",
      "fullName": "几何傅里叶算子 (Geometry-Adaptive FNO)",
      "year": "2023",
      "org": "Caltech",
      "parent": "fno",
      "paperUrl": "https://jmlr.org/papers/v24/23-0064.html",
      "projectUrl": "",
      "category": "pde_solving",
      "motivation": "可学习坐标变换支持非规则几何",
      "summary": "Geo-FNO 通过学习一个可微的坐标变换将不规则物理域映射到规则计算域，使得 FFT 可以在计算域上高效执行，从而将 FNO 扩展到任意几何形状和非均匀网格上的 PDE 求解，比数值求解器快 \\(10^5\\) 倍，比直接插值方法精度提升约 2 倍。",
      "keyPoints": [
        "<strong>可学习坐标变换</strong>：学习微分同胚映射 <span class=\"kb-math kb-math-inline\">\\phi^{-1}: D_a \\to D_c</span>，将不规则物理域 <span class=\"kb-math kb-math-inline\">D_a</span> 映射到单位环面 <span class=\"kb-math kb-math-inline\">D_c = [0,1]^d</span>",
        "<strong>几何傅里叶变换</strong>：在计算域上定义正向/逆向几何傅里叶变换 <span class=\"kb-math kb-math-inline\">\\mathcal{F}_a, \\mathcal{F}_a^{-1}</span>，仅需 <span class=\"kb-math kb-math-inline\">\\phi^{-1}</span> 即可完成双向变换",
        "<strong>结构化网格特例</strong>：当输入为结构化网格时，索引直接提供规范坐标映射，Geo-FNO 退化为标准 FNO",
        "<strong>Fourier 延拓</strong>：对拓扑不规则域（如含孔洞），先嵌入到更大的规则域再做变换，训练时仅在原域计算损失",
        "<strong>变形网络设计</strong>：采用残差连接 <span class=\"kb-math kb-math-inline\">\\xi = f(x,a) + x</span>（初始化为恒等映射）+ 正弦特征提升表达力",
        "<strong>多场景验证</strong>：弹性力学（点云输入）、塑性锻造、跨声速翼型流动、弯管流动四类 PDE 问题",
        "<strong>逆向设计能力</strong>：训练后可端到端优化几何参数（如翼型形状），实现气动逆设计"
      ],
      "detail": "<h5>核心架构示意图</h5>\n<p><img alt=\"Geo-FNO 架构图\" src=\"https://ar5iv.labs.arxiv.org/html/2207.05209/assets/x1.png\" />\n<em>图：Geo-FNO 架构。(a) 标准 FNO 在规则域上操作；(b) Geo-FNO 通过坐标变换 <span class=\"kb-math kb-math-inline\">\\phi_a</span> 将不规则物理域映射到规则计算域，在计算域上执行 FFT，再映射回物理域。</em></p>\n<p><img alt=\"实验场景\" src=\"https://ar5iv.labs.arxiv.org/html/2207.05209/assets/x2.png\" />\n<em>图：弹性力学（含孔洞的单元胞）和塑性锻造问题示例。</em></p>\n<h5>算法伪代码</h5>\n<pre><code class=\"language-python\"># Geo-FNO 前向传播伪代码\ndef geo_fno_forward(x_phys, a, phi_inv_net, fno_layers, P, Q):\n    &quot;&quot;&quot;\n    x_phys: 物理域网格点坐标 [N, d]\n    a:      输入函数值（如几何参数、边界条件）[N, d_a]\n    phi_inv_net: 变形网络 φ^{-1}\n    &quot;&quot;&quot;\n    # Step 1: 坐标变换 — 物理域 → 计算域\n    xi = phi_inv_net(x_phys, a)  # ξ = f(x, a) + x (残差连接)\n    # xi 现在是 [0,1]^d 上的均匀网格\n\n    # Step 2: 提升通道维度\n    v = P(a)  # [N, d_a] → [N, d_v]\n\n    # Step 3: L 层 Fourier 卷积（在计算域上）\n    for l in range(L):\n        # 几何傅里叶变换（首层用 F_a，中间层用标准 FFT）\n        v_hat = FFT(v)                    # 在均匀计算网格上做 FFT\n        v_hat = R_l @ v_hat               # 频域线性变换（截断高频）\n        v_freq = IFFT(v_hat)              # 逆 FFT\n        v_local = W_l @ v + b_l           # 局部线性变换\n        v = activation(v_freq + v_local)  # 残差 + 激活\n\n    # Step 4: 投影到输出空间\n    u = Q(v)  # [N, d_v] → [N, d_u]\n\n    # Step 5: 逆变换回物理域（通过 ξ → x 对应关系）\n    return u  # 物理域上的解\n</code></pre>\n<h5>方法详解</h5>\n<p><strong>1. 动机与背景：FNO 的几何局限</strong></p>\n<p>标准 Fourier Neural Operator (FNO) 通过在频域进行全局卷积来学习 PDE 的解算子，其核心优势在于利用 FFT 实现 <span class=\"kb-math kb-math-inline\">O(N \\log N)</span> 的高效计算。然而，FFT 要求输入数据定义在<strong>均匀网格</strong>和<strong>规则域</strong>（如矩形/环面）上，这严重限制了 FNO 在实际工程问题中的应用——真实 PDE 问题通常涉及复杂几何（翼型、含孔洞结构等）和非均匀自适应网格。</p>\n<p>现有的解决方案包括：(1) 将不规则域插值到规则网格再用 FNO，但插值引入额外误差；(2) 使用图神经网络（GNO）处理任意网格，但失去了频域全局卷积的效率优势。Geo-FNO 的核心洞察是：<strong>与其改变算子，不如改变坐标系</strong>。</p>\n<div class=\"key-point\">💡 <strong>关键直觉</strong>：如果我们能找到一个光滑的坐标变换，把不规则的物理域\"拉直\"成规则的计算域，就可以在计算域上直接用 FFT，同时保持与物理域的精确对应关系。</div>\n<p><strong>2. 核心机制：可微坐标变换</strong></p>\n<p>Geo-FNO 的数学基础是微分同胚映射。定义坐标变换：</p>\n<div class=\"kb-math kb-math-display\">\\phi_a: D^c \\to D_a, \\quad \\xi \\mapsto x</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">D^c = [0,1]^d</span> 是单位环面（计算域），<span class=\"kb-math kb-math-inline\">D_a</span> 是物理域。该映射将计算域上的均匀网格 <span class=\"kb-math kb-math-inline\">\\mathcal{T}^c</span> 推前（pushforward）为物理域上的自适应网格：</p>\n<div class=\"kb-math kb-math-display\">\\mathcal{T}_a \\coloneqq \\phi_a(\\mathcal{T}^c), \\quad \\psi_a(x) \\coloneqq \\psi^c \\circ \\phi_a^{-1}(x)</div>\n<p>对于物理域上的函数 <span class=\"kb-math kb-math-inline\">v(x)</span>，通过拉回（pullback）变换到计算域：</p>\n<div class=\"kb-math kb-math-display\">v^c(\\xi) \\coloneqq v(\\phi_a(\\xi))</div>\n<p><strong>3. 几何傅里叶变换</strong></p>\n<p>基于坐标变换，定义正向几何傅里叶变换：</p>\n<div class=\"kb-math kb-math-display\">(\\mathcal{F}_a v)(k) = \\int_{D^c} v^c(\\xi) e^{-2i\\pi \\langle \\xi, k \\rangle} d\\xi \\approx \\frac{1}{|\\mathcal{T}^i|} \\sum_{x \\in \\mathcal{T}^i} m(x) v(x) e^{-2i\\pi \\langle \\phi^{-1}(x), k \\rangle}</div>\n<p>逆变换为：</p>\n<div class=\"kb-math kb-math-display\">(\\mathcal{F}_a^{-1} \\hat{v})(x) = \\sum_k \\hat{v}(k) e^{2i\\pi \\langle \\phi^{-1}(x), k \\rangle}</div>\n<div class=\"warn-box\">⚠️ <strong>重要性质</strong>：正向和逆向变换都只需要 <span class=\"kb-math kb-math-inline\">\\phi^{-1}</span>（物理域→计算域方向），无需显式计算 <span class=\"kb-math kb-math-inline\">\\phi</span>，这大大简化了实现。</div>\n<p>当 <span class=\"kb-math kb-math-inline\">\\phi^{-1}</span> 将输入网格映射为均匀网格时，权重 <span class=\"kb-math kb-math-inline\">m(x) = 1</span>，几何傅里叶变换退化为标准 FFT。</p>\n<p><strong>4. 变形网络的设计</strong></p>\n<p>变形网络 <span class=\"kb-math kb-math-inline\">\\phi_\\theta^{-1}</span> 将物理坐标和几何参数映射到计算坐标：</p>\n<div class=\"kb-math kb-math-display\">\\phi_\\theta^{-1}: (x_1, x_2, a) \\mapsto (\\xi_1, \\xi_2)</div>\n<p>关键设计选择：\n- <strong>残差连接</strong>：<span class=\"kb-math kb-math-inline\">\\xi = f(x, a) + x</span>，使 <span class=\"kb-math kb-math-inline\">\\phi^{-1}</span> 初始化为恒等映射，训练更稳定\n- <strong>正弦位置编码</strong>：使用 <span class=\"kb-math kb-math-inline\">\\sin(2^i x)</span> 特征提升网络对高频几何细节的表达能力\n- <strong>端到端训练</strong>：变形网络与 FNO 主体联合优化，损失函数为相对 L2 误差</p>\n<p><strong>5. 两种使用场景</strong></p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>场景</th>\n<th>坐标映射方式</th>\n<th>是否需要学习</th>\n<th>示例</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>结构化网格</td>\n<td>索引归一化：<span class=\"kb-math kb-math-inline\">\\phi^{-1}: \\mathcal{T}^i[i_1,...,i_d] \\mapsto (i_1/s_1,...,i_d/s_d)</span></td>\n<td>否</td>\n<td>翼型、管道</td>\n</tr>\n<tr>\n<td>点云/非结构网格</td>\n<td>神经网络参数化</td>\n<td>是</td>\n<td>弹性力学</td>\n</tr>\n</tbody>\n</table></div>\n<p><strong>6. Fourier 延拓处理拓扑不规则域</strong></p>\n<p>当物理域拓扑不规则（如含孔洞，不同胚于圆盘或环面）时，不存在到 <span class=\"kb-math kb-math-inline\">D^c</span> 的微分同胚。此时 Geo-FNO 先将域嵌入更大的规则域 <span class=\"kb-math kb-math-inline\">D_a \\hookrightarrow \\bar{D}_a</span>（如将含孔方形补全为完整方形），在 <span class=\"kb-math kb-math-inline\">\\bar{D}_a</span> 上做变换。训练时仅在原域 <span class=\"kb-math kb-math-inline\">D_a</span> 上计算损失，网络隐式学习延拓。</p>\n<p><strong>7. 实验结果</strong></p>\n<p>在弹性力学（点云输入）基准上，Geo-FNO 显著优于其他方法：</p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>模型</th>\n<th>测试误差</th>\n<th>训练时间/epoch</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td><strong>Geo-FNO (learned)</strong></td>\n<td><strong>2.29%</strong></td>\n<td>1s</td>\n</tr>\n<tr>\n<td>Geo-FNO (O-mesh)</td>\n<td>3.63%</td>\n<td>0.5s</td>\n</tr>\n<tr>\n<td>FNO + 插值</td>\n<td>5.08%</td>\n<td>0.5s</td>\n</tr>\n<tr>\n<td>UNet + 插值</td>\n<td>5.31%</td>\n<td>0.9s</td>\n</tr>\n<tr>\n<td>DeepONet</td>\n<td>9.65%</td>\n<td>45s</td>\n</tr>\n<tr>\n<td>GNO</td>\n<td>12.60%</td>\n<td>32s</td>\n</tr>\n</tbody>\n</table></div>\n<p>在翼型和管道流动（结构化网格）上，Geo-FNO 同样优于插值方法（翼型测试误差 1.38% vs FNO+插值 4.21%）。推理速度约 0.01 秒/样本，比数值求解器快 <span class=\"kb-math kb-math-inline\">10^5</span> 倍。</p>\n<div class=\"key-point\">💡 <strong>关键发现</strong>：学习到的变形比手工设计的启发式变形（R-mesh、O-mesh）更优，说明端到端学习坐标变换的有效性。训练后的 Geo-FNO 还可直接用于逆向设计——通过反向传播优化翼型形状参数以最小化阻力、最大化升力。</div>",
      "quiz": {
        "q": "Geo-FNO 中几何傅里叶变换的正向和逆向变换分别需要哪个方向的坐标映射？",
        "options": [
          "正向需要 φ（计算域→物理域），逆向需要 φ^{-1}（物理域→计算域）",
          "正向和逆向都只需要 φ^{-1}（物理域→计算域）",
          "正向和逆向都只需要 φ（计算域→物理域）",
          "正向需要 φ^{-1}，逆向需要 φ，因此必须显式计算两个方向的映射"
        ],
        "answer": 1,
        "explain": "论文的一个关键设计是正向变换 F_a 用 φ^{-1} 将输入函数拉回计算域，逆向变换 F_a^{-1} 用 φ^{-1} 将查询点映射到计算域以评估傅里叶基，因此只需定义 φ^{-1} 一个方向的映射。"
      }
    },
    {
      "id": "uno",
      "num": 30,
      "name": "U-NO",
      "fullName": "U形神经算子 (U-shaped Neural Operator)",
      "year": "2023",
      "org": "布朗大学",
      "parent": "fno",
      "paperUrl": "https://www.nature.com/articles/s41467-024-49411-w",
      "projectUrl": "",
      "category": "pde_solving",
      "motivation": "多尺度结构捕捉全局与局部特征",
      "summary": "U-NO 的核心目标是：多尺度结构捕捉全局与局部特征。",
      "keyPoints": [
        "核心动机：多尺度结构捕捉全局与局部特征",
        "演化来源：继承或改进自 fno",
        "代表机构：布朗大学"
      ],
      "detail": "<p>多尺度结构捕捉全局与局部特征</p>"
    },
    {
      "id": "pysr",
      "num": 31,
      "name": "PySR",
      "fullName": "Python符号回归 (PySR)",
      "year": "2023",
      "org": "Miles Cranmer",
      "parent": "—",
      "paperUrl": "https://arxiv.org/abs/2305.01582",
      "projectUrl": "",
      "category": "physics_discovery",
      "motivation": "进化算法提取物理表达式",
      "summary": "PySR 的核心目标是：进化算法提取物理表达式。",
      "keyPoints": [
        "核心动机：进化算法提取物理表达式",
        "代表机构：Miles Cranmer"
      ],
      "detail": "<p>进化算法提取物理表达式</p>"
    },
    {
      "id": "poseidon",
      "num": 32,
      "name": "Poseidon",
      "fullName": "PDE基础模型 (Poseidon)",
      "year": "2024",
      "org": "ETH Zurich",
      "parent": "fno",
      "paperUrl": "https://arxiv.org/abs/2405.19101",
      "projectUrl": "",
      "category": "pde_solving",
      "motivation": "首个大规模PDE基础模型",
      "summary": "Poseidon 的核心目标是：首个大规模PDE基础模型。",
      "keyPoints": [
        "核心动机：首个大规模PDE基础模型",
        "演化来源：继承或改进自 fno",
        "代表机构：ETH Zurich"
      ],
      "detail": "<p>首个大规模PDE基础模型</p>"
    },
    {
      "id": "walrus",
      "num": 33,
      "name": "Walrus",
      "fullName": "海象基础模型 (Walrus)",
      "year": "2026",
      "org": "Polymathic AI",
      "parent": "poseidon",
      "paperUrl": "https://www.simonsfoundation.org/2025/12/09/polymathic-ai-announces-walrus-and-aion-1-foundation-models-for-science/",
      "projectUrl": "",
      "category": "pde_solving",
      "motivation": "15TB数据训练跨领域物理基础模型",
      "summary": "Walrus 的核心目标是：15TB数据训练跨领域物理基础模型。",
      "keyPoints": [
        "核心动机：15TB数据训练跨领域物理基础模型",
        "演化来源：继承或改进自 poseidon",
        "代表机构：Polymathic AI"
      ],
      "detail": "<p>15TB数据训练跨领域物理基础模型</p>"
    },
    {
      "id": "transolver3",
      "num": 34,
      "name": "Transolver-3",
      "fullName": "超大规模求解器 (Transolver-3)",
      "year": "2026",
      "org": "清华大学/NVIDIA",
      "parent": "fno",
      "paperUrl": "https://arxiv.org/abs/2602.02414",
      "projectUrl": "",
      "category": "pde_solving",
      "motivation": "几何切片技术支持1.6亿单元网格",
      "summary": "Transolver-3 的核心目标是：几何切片技术支持1.6亿单元网格。",
      "keyPoints": [
        "核心动机：几何切片技术支持1.6亿单元网格",
        "演化来源：继承或改进自 fno",
        "代表机构：清华大学/NVIDIA"
      ],
      "detail": "<p>几何切片技术支持1.6亿单元网格</p>"
    },
    {
      "id": "pf_pino",
      "num": 35,
      "name": "PF-PINO",
      "fullName": "相场物理神经算子 (Phase-Field PINO)",
      "year": "2026",
      "org": "arXiv",
      "parent": "fno",
      "paperUrl": "https://arxiv.org/abs/2603.09693",
      "projectUrl": "",
      "category": "pde_solving",
      "motivation": "相场方程残差提升长期稳定性",
      "summary": "PF-PINO 的核心目标是：相场方程残差提升长期稳定性。",
      "keyPoints": [
        "核心动机：相场方程残差提升长期稳定性",
        "演化来源：继承或改进自 fno",
        "代表机构：arXiv"
      ],
      "detail": "<p>相场方程残差提升长期稳定性</p>"
    },
    {
      "id": "pikan",
      "num": 36,
      "name": "PIKAN",
      "fullName": "KAN物理信息网络 (Physics-Informed KAN)",
      "year": "2026",
      "org": "ResearchGate",
      "parent": "pinn",
      "paperUrl": "https://www.researchgate.net/publication/384994434",
      "projectUrl": "",
      "category": "pde_solving",
      "motivation": "KAN替代MLP增强高维处理能力",
      "summary": "PIKAN 的核心目标是：KAN替代MLP增强高维处理能力。",
      "keyPoints": [
        "核心动机：KAN替代MLP增强高维处理能力",
        "演化来源：继承或改进自 pinn",
        "代表机构：ResearchGate"
      ],
      "detail": "<p>KAN替代MLP增强高维处理能力</p>"
    },
    {
      "id": "fedonet",
      "num": 37,
      "name": "FEDONet",
      "fullName": "傅里叶嵌入DeepONet (Fourier-embedded DeepONet)",
      "year": "2026",
      "org": "JCP",
      "parent": "deeponet",
      "paperUrl": "https://www.sciencedirect.com/science/article/pii/S0021999126002846",
      "projectUrl": "",
      "category": "pde_solving",
      "motivation": "嵌入傅里叶特征实现谱精度学习",
      "summary": "FEDONet 的核心目标是：嵌入傅里叶特征实现谱精度学习。",
      "keyPoints": [
        "核心动机：嵌入傅里叶特征实现谱精度学习",
        "演化来源：继承或改进自 deeponet",
        "代表机构：JCP"
      ],
      "detail": "<p>嵌入傅里叶特征实现谱精度学习</p>"
    },
    {
      "id": "fano",
      "num": 38,
      "name": "FANO",
      "fullName": "傅里叶平流算子 (Fourier Advection Neural Operator)",
      "year": "2026",
      "org": "IEEE",
      "parent": "fno",
      "paperUrl": "https://ieeexplore.ieee.org/abstract/document/11358915/",
      "projectUrl": "",
      "category": "fluid_simulation",
      "motivation": "傅里叶平流机制用于天气预报",
      "summary": "FANO 将描述大气输运的平流方程（advection equation）嵌入傅里叶神经算子（FNO）框架，利用 Fourier 谱方法在频域仅需一次 FFT/IFFT 即可高效求解平流过程，并通过守恒量、梯度和散度三类物理约束增强模型的物理一致性，在天气预报任务上超越传统 NWP 模型并媲美最先进的深度学习方法。",
      "keyPoints": [
        "<strong>核心架构</strong>：基于 FNO 框架，将平流方程的求解嵌入 Fourier 层，形成 Fourier Advection Layer",
        "<strong>频域平流求解</strong>：利用 Fourier 谱方法将平流方程 <span class=\"kb-math kb-math-inline\">\\partial u / \\partial t + \\mathbf{v} \\cdot \\nabla u = 0</span> 转化为频域的逐点乘法，仅需单次 FFT + IFFT",
        "<strong>速度场学习</strong>：通过神经网络学习大气速度向量场 <span class=\"kb-math kb-math-inline\">\\mathbf{v}(x,t)</span>，驱动频域平流算子",
        "<strong>三类物理约束</strong>：守恒量约束（conserved quantities）、梯度约束（gradient constraints）、散度约束（divergence constraints）",
        "<strong>数据集</strong>：基于 ERA5 再分析数据，涵盖多个大气变量（含海表温度 SST 等）",
        "<strong>输入序列</strong>：支持可变长度输入序列（input sequence length），捕获时间演化信息",
        "<strong>性能</strong>：超越传统 NWP 模型（如 IFS），与 Pangu-Weather、FourCastNet、GraphCast 等 SOTA 深度学习模型性能相当",
        "<strong>效率</strong>：保持 FNO 的计算效率优势，频域操作为 <span class=\"kb-math kb-math-inline\">O(N \\log N)</span> 复杂度"
      ],
      "detail": "<h5>模型架构总览</h5>\n<p><img alt=\"FANO 架构示意图\" src=\"assets/fano_architecture.png\" />\n<em>图：FANO 模型架构示意。输入大气状态经 Lifting 层映射到高维空间，在 Fourier 域通过 Spectral Advection 算子（基于学习的速度场）进行平流求解，叠加物理约束后经 Projection 层输出预测结果。</em></p>\n<h5>算法伪代码</h5>\n<pre><code class=\"language-python\"># FANO 前向传播伪代码\ndef FANO_forward(x_t, num_layers=N):\n    &quot;&quot;&quot;\n    x_t: 输入大气状态张量 [B, C, H, W]，包含温度、风速、气压等变量\n    &quot;&quot;&quot;\n    # Step 1: Lifting — 将输入映射到高维隐空间\n    h = P(x_t)                          # h: [B, d_model, H, W]\n\n    # Step 2: N 层 Fourier Advection Block\n    for l in range(num_layers):\n        # 2a. 学习速度场 v(x, t)\n        v = VelocityNet_l(h)             # v: [B, 2, H, W] (2D velocity field)\n\n        # 2b. FFT 变换到频域\n        h_hat = FFT2(h)                  # h_hat: [B, d_model, K1, K2] (complex)\n\n        # 2c. 频域平流算子 — 核心创新\n        # 对于波数 k = (k1, k2)，平流方程的谱解为:\n        #   h_hat_new[k] = h_hat[k] * exp(-i * (v · k) * Δt)\n        # 等价于频域的逐点复数乘法\n        phase_shift = compute_advection_phase(v, k_grid, dt)\n        h_hat = h_hat * phase_shift      # point-wise multiplication\n\n        # 2d. IFFT 回到物理域\n        h_new = IFFT2(h_hat)             # h_new: [B, d_model, H, W]\n\n        # 2e. 残差连接 + 非线性激活\n        h = activation(h_new + h)\n\n    # Step 3: Projection — 映射回物理变量空间\n    x_pred = Q(h)                        # x_pred: [B, C, H, W]\n\n    # Step 4: 物理约束损失\n    L_conserve = conservation_loss(x_t, x_pred)   # 守恒量约束\n    L_gradient = gradient_loss(x_pred)              # 梯度平滑约束\n    L_diverge  = divergence_loss(x_pred)            # 散度约束\n    L_total = L_data + λ1*L_conserve + λ2*L_gradient + λ3*L_diverge\n\n    return x_pred, L_total\n</code></pre>\n<h5>动机与背景</h5>\n<p>天气预报是关系国计民生的核心科学问题。传统数值天气预报（NWP）模型通过求解描述大气运动的偏微分方程组（如 Navier-Stokes 方程、热力学方程等）来预测未来天气状态，代表性系统包括 ECMWF 的 IFS（Integrated Forecasting System）。然而，NWP 模型的计算成本极高——全球 0.25° 分辨率的 10 天预报通常需要数千 CPU 核心运行数小时。</p>\n<p>近年来，深度学习方法在天气预报领域取得了突破性进展：</p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>模型</th>\n<th>机构</th>\n<th>年份</th>\n<th>核心方法</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>FourCastNet</td>\n<td>NVIDIA</td>\n<td>2022</td>\n<td>AFNO (Adaptive Fourier Neural Operator)</td>\n</tr>\n<tr>\n<td>Pangu-Weather</td>\n<td>华为</td>\n<td>2023</td>\n<td>3D Earth-Specific Transformer</td>\n</tr>\n<tr>\n<td>GraphCast</td>\n<td>DeepMind</td>\n<td>2023</td>\n<td>Graph Neural Network on mesh</td>\n</tr>\n<tr>\n<td>FengWu</td>\n<td>上海 AI Lab</td>\n<td>2023</td>\n<td>Multi-modal Transformer</td>\n</tr>\n<tr>\n<td>GenCast</td>\n<td>DeepMind</td>\n<td>2024</td>\n<td>Diffusion model for ensemble</td>\n</tr>\n</tbody>\n</table></div>\n<p>这些模型虽然在推理速度上比 NWP 快数个数量级（秒级 vs 小时级），但普遍存在一个关键缺陷：<strong>缺乏显式的物理约束</strong>。它们本质上是纯数据驱动的黑盒模型，不保证预测结果满足基本的物理定律（如质量守恒、能量守恒），这限制了其在实际业务中的可靠性和可解释性。</p>\n<p>FANO 的核心动机正是弥合这一鸿沟：<strong>如何在保持深度学习计算效率的同时，将物理方程的约束显式嵌入模型架构？</strong></p>\n<h5>核心机制：频域平流求解</h5>\n<p><strong>平流方程</strong>是大气动力学中最基本的 PDE 之一，描述了物理量（如温度、湿度、污染物浓度）被风场输运的过程：</p>\n<div class=\"kb-math kb-math-display\">\\frac{\\partial u}{\\partial t} + \\mathbf{v} \\cdot \\nabla u = 0</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">u(x, y, t)</span> 是被输运的标量场，<span class=\"kb-math kb-math-inline\">\\mathbf{v} = (v_x, v_y)</span> 是速度（风）场。</p>\n<p>FANO 的关键洞察在于：<strong>平流方程在 Fourier 域有优雅的解析解</strong>。对上式做空间 Fourier 变换：</p>\n<div class=\"kb-math kb-math-display\">\\frac{\\partial \\hat{u}_{\\mathbf{k}}}{\\partial t} + i(\\mathbf{v} \\cdot \\mathbf{k}) \\hat{u}_{\\mathbf{k}} = 0</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">\\hat{u}_{\\mathbf{k}}</span> 是波数 <span class=\"kb-math kb-math-inline\">\\mathbf{k} = (k_x, k_y)</span> 处的 Fourier 系数。对于局部常速度场，其解为：</p>\n<div class=\"kb-math kb-math-display\">\\hat{u}_{\\mathbf{k}}(t + \\Delta t) = \\hat{u}_{\\mathbf{k}}(t) \\cdot \\exp\\left(-i (\\mathbf{v} \\cdot \\mathbf{k}) \\Delta t\\right)</div>\n<div class=\"key-point\">💡 <strong>关键洞察</strong>：平流方程在频域退化为<strong>逐点复数乘法</strong>（point-wise multiplication），这与 FNO 中 Fourier 层的操作形式天然一致！标准 FNO 的 Fourier 层执行 <span class=\"kb-math kb-math-inline\">\\hat{u}_{\\mathbf{k}}&#x27; = R_{\\mathbf{k}} \\cdot \\hat{u}_{\\mathbf{k}}</span>，其中 <span class=\"kb-math kb-math-inline\">R_{\\mathbf{k}}</span> 是可学习的复数权重矩阵。FANO 将 <span class=\"kb-math kb-math-inline\">R_{\\mathbf{k}}</span> 替换为物理驱动的相位旋转因子 <span class=\"kb-math kb-math-inline\">\\exp(-i(\\mathbf{v} \\cdot \\mathbf{k})\\Delta t)</span>，从而将 FNO 的频域操作赋予了明确的物理含义。</div>\n<p>这种设计的计算优势显著：整个平流求解过程仅需<strong>一次 FFT + 频域逐点乘法 + 一次 IFFT</strong>，时间复杂度为 <span class=\"kb-math kb-math-inline\">O(N \\log N)</span>，与标准 FNO 相同，远低于有限差分法的迭代求解。</p>\n<h5>速度场学习</h5>\n<p>与传统 NWP 中速度场由风速观测直接给出不同，FANO 通过一个子网络 <span class=\"kb-math kb-math-inline\">\\text{VelocityNet}(\\cdot)</span> 从当前大气状态中<strong>学习</strong>速度向量场 <span class=\"kb-math kb-math-inline\">\\mathbf{v}(x, y, t)</span>。这使得模型能够：</p>\n<ol>\n<li><strong>自适应捕获有效输运速度</strong>：学到的速度场不仅包含显式风速，还可能编码其他隐式输运机制（如波动传播、对流参数化效应）</li>\n<li><strong>处理多尺度动力学</strong>：不同 Fourier Advection Layer 可以学习不同尺度的速度场，分别捕获大尺度环流和中小尺度扰动</li>\n</ol>\n<h5>物理约束体系</h5>\n<p>FANO 嵌入三类物理约束作为正则化损失：</p>\n<p><strong>1. 守恒量约束（Conservation Loss）</strong></p>\n<p>大气中的总质量、总能量等物理量在封闭系统中应守恒。FANO 通过约束预测场的全局积分来近似实现：</p>\n<div class=\"kb-math kb-math-display\">\\mathcal{L}_{\\text{conserve}} = \\left\\| \\int_{\\Omega} x_{t+\\Delta t} \\, d\\Omega - \\int_{\\Omega} x_t \\, d\\Omega \\right\\|^2</div>\n<p>在离散网格上，这等价于约束预测场与输入场的全局均值一致，对应 Fourier 系数的零频分量 <span class=\"kb-math kb-math-inline\">\\hat{u}_{\\mathbf{0}}</span> 不变。</p>\n<p><strong>2. 梯度约束（Gradient Loss）</strong></p>\n<p>确保预测场的空间梯度合理，避免出现非物理的剧烈跳变：</p>\n<div class=\"kb-math kb-math-display\">\\mathcal{L}_{\\text{gradient}} = \\left\\| \\nabla x_{t+\\Delta t} \\right\\|_{\\text{reg}}</div>\n<p>这有助于保持天气场的空间平滑性，抑制 Gibbs 现象等频域方法的常见伪影。</p>\n<p><strong>3. 散度约束（Divergence Loss）</strong></p>\n<p>对于近似不可压缩的大气流动，速度场应满足连续性方程的约束：</p>\n<div class=\"kb-math kb-math-display\">\\mathcal{L}_{\\text{diverge}} = \\left\\| \\nabla \\cdot \\mathbf{v} \\right\\|^2</div>\n<div class=\"warn-box\">⚠️ <strong>注意</strong>：散度约束施加在学习到的速度场上而非预测的大气状态上，确保平流输运过程本身的物理合理性。</div>\n<p>总损失函数为：</p>\n<div class=\"kb-math kb-math-display\">\\mathcal{L} = \\mathcal{L}_{\\text{data}} + \\lambda_1 \\mathcal{L}_{\\text{conserve}} + \\lambda_2 \\mathcal{L}_{\\text{gradient}} + \\lambda_3 \\mathcal{L}_{\\text{diverge}}</div>\n<h5>与传统方法的对比</h5>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>特性</th>\n<th>传统 NWP (IFS)</th>\n<th>标准 FNO</th>\n<th>FANO</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>物理方程</td>\n<td>完整 PDE 组</td>\n<td>无显式物理</td>\n<td>平流方程</td>\n</tr>\n<tr>\n<td>求解方式</td>\n<td>有限差分/谱方法迭代</td>\n<td>数据驱动学习</td>\n<td>Fourier 谱方法 (解析)</td>\n</tr>\n<tr>\n<td>计算复杂度</td>\n<td>极高 (小时级)</td>\n<td>低 (秒级)</td>\n<td>低 (秒级)</td>\n</tr>\n<tr>\n<td>物理约束</td>\n<td>内建</td>\n<td>无</td>\n<td>守恒+梯度+散度</td>\n</tr>\n<tr>\n<td>频域操作含义</td>\n<td>—</td>\n<td>可学习滤波器</td>\n<td>物理驱动相位旋转</td>\n</tr>\n<tr>\n<td>可解释性</td>\n<td>高</td>\n<td>低</td>\n<td>中-高</td>\n</tr>\n</tbody>\n</table></div>\n<p>FANO 相比标准 FNO 的核心改进在于：将 Fourier 层中的<strong>任意可学习复数权重</strong>替换为<strong>物理驱动的平流算子</strong>，使频域操作具有明确的物理含义（相位旋转 = 空间平移 = 大气输运），同时通过物理约束损失进一步增强预测的物理一致性。</p>\n<h5>实验设置与结果</h5>\n<p>论文基于 ERA5 再分析数据集进行实验，该数据集由 ECMWF 提供，覆盖全球 0.25° 分辨率的多层大气变量。实验涵盖多个关键气象变量的预测，包括：\n- 位势高度（Geopotential, Z500）\n- 温度（Temperature, T850）\n- 海表温度（Sea Surface Temperature, SST）\n- 风速分量（U/V wind components）</p>\n<p>实验结果表明：\n1. <strong>超越传统 NWP</strong>：在多个变量和预报时效上，FANO 的 RMSE/ACC 指标优于 IFS 等传统模型\n2. <strong>媲美 SOTA DL</strong>：与 Pangu-Weather、FourCastNet 等最先进深度学习模型性能相当\n3. <strong>物理一致性更强</strong>：物理约束有效减少了非物理预测（如质量不守恒、梯度异常）\n4. <strong>计算高效</strong>：保持了 FNO 框架的推理速度优势</p>",
      "quiz": {
        "q": "FANO 将平流方程嵌入 FNO 框架的关键在于，平流方程在 Fourier 域的解具有什么特殊形式？",
        "options": [
          "卷积运算，需要多次迭代求解",
          "逐点复数乘法（相位旋转），可一步求解",
          "矩阵求逆运算，需要特征值分解",
          "非线性激活函数变换，需要反向传播"
        ],
        "answer": 1,
        "explain": "平流方程在 Fourier 域的解为 û_k(t+Δt) = û_k(t)·exp(-i(v·k)Δt)，即逐点复数乘法（相位旋转），这与 FNO 的 Fourier 层操作形式天然一致，仅需单次 FFT+IFFT 即可完成。"
      }
    },
    {
      "id": "physicsnemo",
      "num": 39,
      "name": "PhysicsNeMo",
      "fullName": "物理AI框架 (PhysicsNeMo)",
      "year": "2026",
      "org": "NVIDIA",
      "parent": "—",
      "paperUrl": "https://www.nvidia.com/en-us/ai-data-science/physics-nemo/",
      "projectUrl": "",
      "category": "fluid_simulation",
      "motivation": "开源物理AI产业化仿真框架",
      "summary": "PhysicsNeMo 的核心目标是：开源物理AI产业化仿真框架。",
      "keyPoints": [
        "核心动机：开源物理AI产业化仿真框架",
        "代表机构：NVIDIA"
      ],
      "detail": "<p>开源物理AI产业化仿真框架</p>"
    },
    {
      "id": "simple_pinn",
      "num": 40,
      "name": "SIMPLE-PINN",
      "fullName": "SIMPLE算法PINN (SIMPLE-PINN)",
      "year": "2026",
      "org": "arXiv",
      "parent": "pinn",
      "paperUrl": "https://arxiv.org/abs/2603.24013",
      "projectUrl": "",
      "category": "fluid_simulation",
      "motivation": "SIMPLE算法与PINN融合求解NS方程",
      "summary": "SIMPLE-PINN 的核心目标是：SIMPLE算法与PINN融合求解NS方程。",
      "keyPoints": [
        "核心动机：SIMPLE算法与PINN融合求解NS方程",
        "演化来源：继承或改进自 pinn",
        "代表机构：arXiv"
      ],
      "detail": "<p>SIMPLE算法与PINN融合求解NS方程</p>"
    },
    {
      "id": "fe_pinns",
      "num": 41,
      "name": "FE-PINNs",
      "fullName": "有限元PINN (Finite-Element-based PINNs)",
      "year": "2026",
      "org": "APL Machine Learning",
      "parent": "canns",
      "paperUrl": "https://pubs.aip.org/aip/aml/article/4/1/016106/3379950",
      "projectUrl": "",
      "category": "solid_mechanics",
      "motivation": "有限元基函数实现网格无关建模",
      "summary": "FE-PINNs 的核心目标是：有限元基函数实现网格无关建模。",
      "keyPoints": [
        "核心动机：有限元基函数实现网格无关建模",
        "演化来源：继承或改进自 canns",
        "代表机构：APL Machine Learning"
      ],
      "detail": "<p>有限元基函数实现网格无关建模</p>"
    },
    {
      "id": "aion1",
      "num": 42,
      "name": "AION-1",
      "fullName": "天文基础模型 (AION-1)",
      "year": "2026",
      "org": "Flatiron Institute",
      "parent": "—",
      "paperUrl": "https://www.simonsfoundation.org/2025/12/09/polymathic-ai-announces-walrus-and-aion-1-foundation-models-for-science/",
      "projectUrl": "",
      "category": "physics_constrained",
      "motivation": "31亿参数统一39种观测模态",
      "summary": "AION-1 的核心目标是：31亿参数统一39种观测模态。",
      "keyPoints": [
        "核心动机：31亿参数统一39种观测模态",
        "代表机构：Flatiron Institute"
      ],
      "detail": "<p>31亿参数统一39种观测模态</p>"
    },
    {
      "id": "momentum_gnn",
      "num": 43,
      "name": "Momentum-GNN",
      "fullName": "动量守恒图网络 (Momentum-conserving GNN)",
      "year": "2026",
      "org": "Nature Communications",
      "parent": "egnn",
      "paperUrl": "https://www.nature.com/articles/s41467-025-67802-5",
      "projectUrl": "",
      "category": "physics_constrained",
      "motivation": "严格线性角动量守恒防止能量漂移",
      "summary": "DYNAMI-CAL GraphNet 提出了一种物理约束的等变图神经网络，通过在边局部参考系中解码反对称力与力矩（\\(\\vec{F}_{ij}=-\\vec{F}_{ji}\\), \\(\\vec{A}_{ij}=-\\vec{A}_{ji}\\)），从架构层面严格保证线性动量和角动量守恒，解决了现有等变 GNN（如 EGNN、GMN）因消息不对称导致的动量漂移问题，并在颗粒碰撞、N 体动力学、人体运动、蛋白质分子动力学等六类任务上展现了卓越的长程稳定性与外推能力。",
      "keyPoints": [
        "<strong>边局部参考系</strong>：为每条边 <span class=\"kb-math kb-math-inline\">ij</span> 构建三个正交基向量 <span class=\"kb-math kb-math-inline\">\\vec{a}_{ij}, \\vec{b}_{ij}, \\vec{c}_{ij}</span>，满足 SO(3) 等变、T(3) 不变、节点交换反对称",
        "<strong>反对称力解码</strong>：力 <span class=\"kb-math kb-math-inline\">\\vec{F}_{ij} = \\sum_k \\psi_{e_f}(\\boldsymbol{\\epsilon}&#x27;_{ij})[k] \\cdot \\text{basis}_k</span>，由于基向量反对称，自动满足牛顿第三定律 <span class=\"kb-math kb-math-inline\">\\vec{F}_{ij} = -\\vec{F}_{ji}</span>，严格保守线性动量",
        "<strong>反对称力矩解码</strong>：角动量交互向量 <span class=\"kb-math kb-math-inline\">\\vec{A}_{ij} = -\\vec{A}_{ji}</span>，通过分离轨道分量得到自旋力矩，严格保守总角动量（轨道 + 自旋）",
        "<strong>时空消息传递</strong>：边嵌入通过 skip 连接跨时间步传递记忆，结合隐式 Euler 积分实现时空一致性",
        "<strong>Ghost 节点边界建模</strong>：通过反射生成 ghost 节点处理无网格边界，无需重新训练即可适配不同几何形状",
        "<strong>六类基准验证</strong>：颗粒 6-DoF 碰撞、动量守恒测试、旋转 hopper 外推（60→2073 球、平面→曲面）、约束 N 体、人体运动预测、蛋白质分子动力学"
      ],
      "detail": "<h5>核心架构示意图</h5>\n<div class=\"img-wrap\"><img src=\"https://media.springernature.com/full/springer-static/image/art%3A10.1038%2Fs41467-025-67802-5/MediaObjects/41467_2025_67802_Fig1_HTML.png\" alt=\"DYNAMI-CAL GraphNet 架构总览\" loading=\"lazy\"><p class=\"img-caption\">▲ DYNAMI-CAL GraphNet 架构总览</p></div>\n<p><em>图：DYNAMI-CAL GraphNet 的完整流程——从图构建、边局部参考系、反对称力/力矩解码到节点状态更新。核心创新在于边消息的物理约束设计，确保牛顿第三定律在架构层面被严格满足。</em></p>\n<h5>算法伪代码</h5>\n<pre><code class=\"language-python\"># DYNAMI-CAL GraphNet 单步前向传播\ndef forward(graph_t, edge_memory_prev):\n    # === 1. 编码 ===\n    h_i = φ_node(node_features_i)          # 节点标量嵌入\n\n    # === 2. 边局部参考系构建 ===\n    for edge (i, j) in graph:\n        d_ij = r_j - r_i                    # 位移向量\n        v_ij = v_j - v_i                    # 相对速度\n        a_ij = d_ij / ||d_ij||              # 第一基向量（沿连线）\n        c_ij = d_ij × v_ij                  # 第三基向量（叉积）\n        c_ij = c_ij / ||c_ij||\n        b_ij = c_ij × a_ij                  # 第二基向量（右手系）\n        # 关键性质: a_ij = -a_ji, b_ij = -b_ji, c_ij = -c_ji\n\n    # === 3. 边嵌入 + 时空消息传递 ===\n    for edge (i, j):\n        inv_features = [||d_ij||, d_ij·v_ij, ...]  # 不变量特征\n        ε_ij = φ_edge(h_i, h_j, inv_features)\n        ε_ij = ε_ij + skip_connection(edge_memory_prev[i,j])  # 时间记忆\n        ε'_ij = MLP_interaction(ε_ij)       # 交互嵌入\n\n    # === 4. 反对称力解码（线性动量守恒）===\n    for edge (i, j):\n        coeffs_f = ψ_ef(ε'_ij)              # 3个标量系数\n        F_ij = coeffs_f[0]*a_ij + coeffs_f[1]*b_ij + coeffs_f[2]*c_ij\n        # 自动满足 F_ij = -F_ji（因基向量反对称）\n\n    # === 5. 反对称力矩解码（角动量守恒）===\n    for edge (i, j):\n        coeffs_a = ψ_ea(ε'_ij)              # 3个标量系数\n        A_ij = coeffs_a[0]*a_ij + coeffs_a[1]*b_ij + coeffs_a[2]*c_ij\n        # A_ij = -A_ji（总角动量交互反对称）\n\n        # 对称参考点\n        w_i, w_j = ψ_n1(h_i), ψ_n1(h_j)\n        r0_ij = (w_i * r_i + w_j * r_j) / (w_i + w_j)  # r0_ij = r0_ji\n\n        # 分离自旋力矩\n        λ_ij = ψ_el(ε'_ij)                  # 稳定性标量\n        M_ij = A_ij - (r_j - r0_ij) × F_ij * λ_ij  # I_j·Δω_j\n\n    # === 6. 聚合 + 节点更新 ===\n    for node i:\n        ΔF_total = Σ_j F_ij                 # 合力\n        ΔM_total = Σ_j M_ij                 # 合力矩\n        Δv_i = ψ_n2(h_i) * ΔF_total         # 1/m_i · ΣF\n        Δω_i = ψ_n3(h_i) * ΔM_total         # 1/I_i · ΣM\n        Δv_ext = ψ_n4(h_i)                  # 外力（如重力）\n\n        v_new = v_i + Δv_i + Δv_ext\n        ω_new = ω_i + Δω_i\n        x_new = x_i + (v_i + v_new)/2 * Δt  # 梯形积分\n\n    return graph_t+1, edge_memory_current\n</code></pre>\n<h5>方法深入解析</h5>\n<p><strong>1. 动机与背景：等变 GNN 的动量漂移问题</strong></p>\n<p>现有等变 GNN（如 EGNN、GMN、ClofNet）虽然保证了 SE(3) 等变性，但<strong>不保证动量守恒</strong>。根本原因在于：这些模型的边消息 <span class=\"kb-math kb-math-inline\">m_{ij} \\neq m_{ji}</span>（或虽然力等变但不反对称），导致节点 <span class=\"kb-math kb-math-inline\">i</span> 对 <span class=\"kb-math kb-math-inline\">j</span> 施加的\"力\"与 <span class=\"kb-math kb-math-inline\">j</span> 对 <span class=\"kb-math kb-math-inline\">i</span> 的\"力\"不满足牛顿第三定律。在长程自回归推理中，这种微小的不对称性会累积，造成系统总动量漂移，最终导致物理不一致甚至轨迹发散。</p>\n<div class=\"key-point\">💡 <strong>关键洞察</strong>：等变性（输出随输入旋转而旋转）≠ 守恒性（系统总量不变）。DYNAMI-CAL GraphNet 的核心贡献是<strong>在保持等变性的同时，从架构层面强制守恒</strong>。</div>\n<p><strong>2. 核心机制一：边局部参考系</strong></p>\n<p>对每条边 <span class=\"kb-math kb-math-inline\">ij</span>，利用位移向量 <span class=\"kb-math kb-math-inline\">\\vec{d}_{ij} = \\vec{r}_j - \\vec{r}_i</span> 和相对速度 <span class=\"kb-math kb-math-inline\">\\vec{v}_{ij} = \\vec{v}_j - \\vec{v}_i</span> 构建正交基：</p>\n<div class=\"kb-math kb-math-display\">\\vec{a}_{ij} = \\frac{\\vec{d}_{ij}}{\\|\\vec{d}_{ij}\\|}, \\quad \\vec{c}_{ij} = \\frac{\\vec{d}_{ij} \\times \\vec{v}_{ij}}{\\|\\vec{d}_{ij} \\times \\vec{v}_{ij}\\|}, \\quad \\vec{b}_{ij} = \\vec{c}_{ij} \\times \\vec{a}_{ij}</div>\n<p>这组基向量具有三个关键性质：\n- <strong>SO(3) 等变</strong>：全局旋转 <span class=\"kb-math kb-math-inline\">R</span> 作用时，<span class=\"kb-math kb-math-inline\">\\vec{a}_{ij} \\to R\\vec{a}_{ij}</span>\n- <strong>T(3) 不变</strong>：平移不改变相对位移和相对速度\n- <strong>节点交换反对称</strong>：<span class=\"kb-math kb-math-inline\">\\vec{a}_{ij} = -\\vec{a}_{ji}</span>，<span class=\"kb-math kb-math-inline\">\\vec{b}_{ij} = -\\vec{b}_{ji}</span>，<span class=\"kb-math kb-math-inline\">\\vec{c}_{ij} = -\\vec{c}_{ji}</span></p>\n<div class=\"warn-box\">⚠️ <strong>注意</strong>：反对称性是守恒的关键——当 <span class=\"kb-math kb-math-inline\">\\vec{d}_{ij}</span> 变为 <span class=\"kb-math kb-math-inline\">\\vec{d}_{ji} = -\\vec{d}_{ij}</span> 时，叉积 <span class=\"kb-math kb-math-inline\">\\vec{d}_{ji} \\times \\vec{v}_{ji} = (-\\vec{d}_{ij}) \\times (-\\vec{v}_{ij}) = \\vec{d}_{ij} \\times \\vec{v}_{ij}</span>，但归一化后 <span class=\"kb-math kb-math-inline\">\\vec{a}_{ji} = -\\vec{a}_{ij}</span>，进而 <span class=\"kb-math kb-math-inline\">\\vec{b}_{ji} = \\vec{c}_{ji} \\times \\vec{a}_{ji} = (-\\vec{c}_{ij}) \\times (-\\vec{a}_{ij}) = ... = -\\vec{b}_{ij}</span>。</div>\n<p><strong>3. 核心机制二：反对称力与线性动量守恒</strong></p>\n<p>力通过不变标量系数调制反对称基向量来解码：</p>\n<div class=\"kb-math kb-math-display\">\\vec{F}_{ij} = \\psi_{e_f}(\\boldsymbol{\\epsilon}&#x27;_{ij})[0] \\cdot \\vec{a}_{ij} + \\psi_{e_f}(\\boldsymbol{\\epsilon}&#x27;_{ij})[1] \\cdot \\vec{b}_{ij} + \\psi_{e_f}(\\boldsymbol{\\epsilon}&#x27;_{ij})[2] \\cdot \\vec{c}_{ij}</div>\n<p>由于边嵌入 <span class=\"kb-math kb-math-inline\">\\boldsymbol{\\epsilon}&#x27;_{ij}</span> 仅依赖不变量（距离、内积等），对称边 <span class=\"kb-math kb-math-inline\">ij</span> 和 <span class=\"kb-math kb-math-inline\">ji</span> 产生相同的标量系数，但基向量反号，因此：</p>\n<div class=\"kb-math kb-math-display\">\\vec{F}_{ij} = -\\vec{F}_{ji} \\quad \\Longrightarrow \\quad \\sum_{i} \\Delta \\vec{p}_i = \\sum_{i} \\sum_{j \\in \\mathcal{N}(i)} \\vec{F}_{ij} = 0</div>\n<p>这就是牛顿第三定律的架构级实现，<strong>无需任何正则化或后处理</strong>即可严格保证线性动量守恒。</p>\n<p><strong>4. 核心机制三：角动量守恒的力矩解码</strong></p>\n<p>角动量守恒更为复杂，因为总角动量 = 轨道角动量 + 自旋角动量。论文定义边 <span class=\"kb-math kb-math-inline\">ij</span> 的总角动量交互向量：</p>\n<div class=\"kb-math kb-math-display\">\\vec{A}_{ij} = I_i(\\vec{\\omega}_i^{t+\\Delta t} - \\vec{\\omega}_i^t) + (\\vec{r}_i - \\vec{r}_0) \\times m_i(\\vec{v}_i^{t+\\Delta t} - \\vec{v}_i^t)</div>\n<p>同样通过反对称基向量解码，确保 <span class=\"kb-math kb-math-inline\">\\vec{A}_{ij} = -\\vec{A}_{ji}</span>。然后通过对称参考点 <span class=\"kb-math kb-math-inline\">\\vec{r}_{0_{ij}}</span> 分离自旋分量：</p>\n<div class=\"kb-math kb-math-display\">I_j \\cdot \\Delta\\vec{\\omega}_j = \\vec{A}_{ij} - (\\vec{r}_j - \\vec{r}_{0_{ij}}) \\times \\vec{F}_{ij} \\cdot \\lambda_{ij}</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">\\vec{r}_{0_{ij}} = \\frac{\\psi_{n1}(h_i) \\cdot \\vec{r}_i + \\psi_{n1}(h_j) \\cdot \\vec{r}_j}{\\psi_{n1}(h_i) + \\psi_{n1}(h_j)}</span> 在节点交换下保持不变（<span class=\"kb-math kb-math-inline\">\\vec{r}_{0_{ij}} = \\vec{r}_{0_{ji}}</span>），<span class=\"kb-math kb-math-inline\">\\lambda_{ij}</span> 是稳定性标量，防止微小噪声力产生不合理的大力矩。</p>\n<p><strong>5. 时空消息传递与边记忆</strong></p>\n<p>传统 GNN 每步独立处理图，丢失了时间连贯性。DYNAMI-CAL GraphNet 通过 <strong>skip 连接</strong>将上一时间步的边嵌入传递到当前步：</p>\n<div class=\"kb-math kb-math-display\">\\boldsymbol{\\epsilon}_{ij}^{(t)} = \\phi_{\\text{edge}}(\\text{features}_{ij}^{(t)}) + W_{\\text{skip}} \\cdot \\boldsymbol{\\epsilon}_{ij}^{(t-1)}</div>\n<p>这使得模型能够捕捉碰撞前后的时间相关性，类似于 RNN 的隐状态但作用在边上。配合隐式 Euler 积分（使用更新后的速度计算位移），提高了数值稳定性。</p>\n<p><strong>6. Ghost 节点：无网格边界处理</strong></p>\n<p>对于边界（如墙壁），论文提出将每个靠近边界的粒子关于边界面反射，生成 ghost 节点。Ghost 节点继承边界属性（如零速度、边界标识符），与原始粒子之间建立边连接。这种方法：\n- 无需显式编码边界几何\n- 可推广到任意形状（平面、曲面）\n- 训练时用平面墙，测试时可直接迁移到旋转圆柱 hopper</p>\n<p><strong>7. 与 EGNN/GMN 的关键区别</strong></p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>特性</th>\n<th>EGNN</th>\n<th>GMN</th>\n<th>DYNAMI-CAL GraphNet</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>等变性</td>\n<td>E(n)</td>\n<td>E(n)</td>\n<td>SE(3)</td>\n</tr>\n<tr>\n<td>消息对称性</td>\n<td><span class=\"kb-math kb-math-inline\">m_{ij} \\neq m_{ji}</span></td>\n<td><span class=\"kb-math kb-math-inline\">m_{ij} \\neq m_{ji}</span></td>\n<td><span class=\"kb-math kb-math-inline\">\\vec{F}_{ij} = -\\vec{F}_{ji}</span></td>\n</tr>\n<tr>\n<td>线性动量守恒</td>\n<td>✗</td>\n<td>✗</td>\n<td>✓（严格）</td>\n</tr>\n<tr>\n<td>角动量守恒</td>\n<td>✗</td>\n<td>✗</td>\n<td>✓（严格）</td>\n</tr>\n<tr>\n<td>旋转动力学</td>\n<td>不支持</td>\n<td>不支持</td>\n<td>6-DoF（平动+转动）</td>\n</tr>\n<tr>\n<td>时间记忆</td>\n<td>无</td>\n<td>无</td>\n<td>边 skip 连接</td>\n</tr>\n</tbody>\n</table></div>\n<div class=\"key-point\">💡 <strong>为什么 EGNN 不守恒？</strong> EGNN 的位置更新 <span class=\"kb-math kb-math-inline\">\\vec{x}_i&#x27; = \\vec{x}_i + \\sum_j (\\vec{x}_i - \\vec{x}_j) \\phi(m_{ij})</span> 中，<span class=\"kb-math kb-math-inline\">\\phi(m_{ij})</span> 是标量但 <span class=\"kb-math kb-math-inline\">m_{ij} \\neq m_{ji}</span>（因为消息聚合依赖节点特征），所以 <span class=\"kb-math kb-math-inline\">i</span> 对 <span class=\"kb-math kb-math-inline\">j</span> 的\"推力\"与 <span class=\"kb-math kb-math-inline\">j</span> 对 <span class=\"kb-math kb-math-inline\">i</span> 的不等，总动量不守恒。</div>\n<p><strong>8. 实验亮点</strong></p>\n<ul>\n<li><strong>旋转 hopper 外推</strong>：仅用 60 球 + 平面墙训练，成功预测 2073 球 + 旋转曲面墙的 16000 步演化，GNS 在早期即发散</li>\n<li><strong>动量守恒验证</strong>：两球斜碰实验中，DYNAMI-CAL GraphNet 精确保守所有分量的线性和角动量，GNS 和 EGNN 均出现明显漂移</li>\n<li><strong>蛋白质 MD</strong>：在 NPT 系综（300K, 1 bar）条件下准确预测蛋白质构象动力学</li>\n</ul>",
      "quiz": {
        "q": "DYNAMI-CAL GraphNet 如何从架构层面保证牛顿第三定律 F_ij = -F_ji？",
        "options": [
          "在损失函数中添加 ||F_ij + F_ji||² 正则化项",
          "使用节点交换反对称的边局部基向量，乘以对称的标量系数来解码力",
          "对每条边的消息取平均值 (m_ij + m_ji)/2 作为对称消息",
          "在后处理阶段将力投影到反对称子空间"
        ],
        "answer": 1,
        "explain": "DYNAMI-CAL GraphNet 构建的边局部参考系基向量满足 a_ij=-a_ji, b_ij=-b_ji, c_ij=-c_ji，而标量系数由不变量嵌入产生（ij 和 ji 相同），因此力 F_ij = Σ coeff_k · basis_k 自动满足 F_ij = -F_ji，无需正则化或后处理。"
      }
    }
  ],
  "categories": {
    "pde_solving": {
      "label": "偏微分方程求解",
      "color": "#3B82F6"
    },
    "fluid_simulation": {
      "label": "流体仿真",
      "color": "#10B981"
    },
    "solid_mechanics": {
      "label": "固体力学",
      "color": "#F59E0B"
    },
    "physics_discovery": {
      "label": "理论物理发现",
      "color": "#8B5CF6"
    },
    "physics_constrained": {
      "label": "物理约束学习",
      "color": "#EC4899"
    },
    "quantum_particle": {
      "label": "量子与粒子物理",
      "color": "#6366F1"
    }
  },
  "projectUrls": {}
};
