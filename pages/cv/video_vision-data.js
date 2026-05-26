/**
 * video_vision-data.js — 由 pipeline/build.py 于 2026-05-26 14:20:22 自动生成。
 * 源文件：content/cv/video_vision.md
 * ⚠️  请勿手动修改；如需更新，修改源文档后重新编译。
 */
window.PAGE_CONFIG = {
  "meta": {
    "domain": "cv",
    "topic_id": "video_vision",
    "topic_name": "视频视觉",
    "page_title": "视频视觉技术演进",
    "page_subtitle": "2026-05-26 版",
    "page_desc": "从手工特征到深度学习，再到视频基础模型与世界模型的技术演进",
    "page_icon": "🎬",
    "hero_pills": [
      "视频理解 · 动作识别 · 时序建模 · 视频大模型"
    ],
    "count_pill": "{count} 个算法",
    "image_base": "",
    "overview_from_doc": true,
    "latest_overview_from_doc": true
  },
  "overview": [
    {
      "title": "待补充：阶段性领域总结",
      "body_html": "<p>请补充一篇纵观一段时间以来的总结性文档，建议使用 <code>!INCLUDE_RAW path/to/article.md</code> 引入人工筛选后的 Markdown。</p>"
    }
  ],
  "latest_overview": [
    {
      "title": "待补充：最近一个月最新动向",
      "body_html": "<p>请补充最近一个月该领域最新动向的综述文档，建议使用 <code>!INCLUDE_RAW path/to/article.md</code> 引入人工筛选后的 Markdown。</p>"
    }
  ],
  "graph": {
    "nodes": [
      {
        "id": "idt",
        "x": 0,
        "y": 0,
        "category": "traditional_feature"
      },
      {
        "id": "two_stream",
        "x": 1,
        "y": 1,
        "category": "cnn_rnn"
      },
      {
        "id": "c3d",
        "x": 2,
        "y": 1,
        "category": "cnn_rnn"
      },
      {
        "id": "lrcn",
        "x": 2,
        "y": 1.5,
        "category": "cnn_rnn"
      },
      {
        "id": "tsn",
        "x": 3,
        "y": 1,
        "category": "cnn_rnn"
      },
      {
        "id": "i3d",
        "x": 4,
        "y": 1,
        "category": "cnn_rnn"
      },
      {
        "id": "non_local",
        "x": 5,
        "y": 2,
        "category": "transformer"
      },
      {
        "id": "r2plus1d",
        "x": 5,
        "y": 1,
        "category": "cnn_rnn"
      },
      {
        "id": "tsm",
        "x": 6,
        "y": 1,
        "category": "cnn_rnn"
      },
      {
        "id": "slowfast",
        "x": 6,
        "y": 1.5,
        "category": "cnn_rnn"
      },
      {
        "id": "timesformer",
        "x": 8,
        "y": 2,
        "category": "transformer"
      },
      {
        "id": "vivit",
        "x": 8,
        "y": 2.5,
        "category": "transformer"
      },
      {
        "id": "clip4clip",
        "x": 8,
        "y": 3,
        "category": "foundation_model"
      },
      {
        "id": "video_swin",
        "x": 9,
        "y": 2,
        "category": "transformer"
      },
      {
        "id": "videomae",
        "x": 9,
        "y": 3,
        "category": "foundation_model"
      },
      {
        "id": "internvideo",
        "x": 9,
        "y": 3.5,
        "category": "foundation_model"
      },
      {
        "id": "mamba3",
        "x": 13,
        "y": 2,
        "category": "transformer"
      },
      {
        "id": "cosmos",
        "x": 13,
        "y": 3,
        "category": "foundation_model"
      },
      {
        "id": "worldreel",
        "x": 13,
        "y": 3.5,
        "category": "foundation_model"
      },
      {
        "id": "kangaroo",
        "x": 13,
        "y": 4,
        "category": "foundation_model"
      },
      {
        "id": "trajtok",
        "x": 13,
        "y": 3.2,
        "category": "foundation_model"
      }
    ],
    "edges": [
      {
        "from": "idt",
        "to": "c3d",
        "label": "深度学习化"
      },
      {
        "from": "two_stream",
        "to": "lrcn",
        "label": "时序建模"
      },
      {
        "from": "two_stream",
        "to": "tsn",
        "label": "长视频采样"
      },
      {
        "from": "c3d",
        "to": "i3d",
        "label": "权重膨胀"
      },
      {
        "from": "c3d",
        "to": "r2plus1d",
        "label": "卷积分解"
      },
      {
        "from": "tsn",
        "to": "tsm",
        "label": "时序移位"
      },
      {
        "from": "i3d",
        "to": "non_local",
        "label": "自注意力"
      },
      {
        "from": "i3d",
        "to": "slowfast",
        "label": "双速采样"
      },
      {
        "from": "non_local",
        "to": "timesformer",
        "label": "纯注意力"
      },
      {
        "from": "timesformer",
        "to": "vivit",
        "label": "时空因子化"
      },
      {
        "from": "vivit",
        "to": "video_swin",
        "label": "窗口注意力"
      },
      {
        "from": "video_swin",
        "to": "videomae",
        "label": "自监督"
      },
      {
        "from": "video_swin",
        "to": "mamba3",
        "label": "线性注意力"
      },
      {
        "from": "videomae",
        "to": "internvideo",
        "label": "多模态对齐"
      },
      {
        "from": "videomae",
        "to": "trajtok",
        "label": "轨迹Token"
      },
      {
        "from": "internvideo",
        "to": "cosmos",
        "label": "世界模型"
      },
      {
        "from": "internvideo",
        "to": "kangaroo",
        "label": "长上下文"
      },
      {
        "from": "cosmos",
        "to": "worldreel",
        "label": "4D生成"
      }
    ],
    "milestones": [
      "c3d",
      "timesformer",
      "videomae"
    ]
  },
  "algos": [
    {
      "id": "idt",
      "num": 1,
      "name": "iDT",
      "fullName": "改进密集轨迹 (Improved Dense Trajectories)",
      "year": "2013",
      "org": "INRIA",
      "parent": "—",
      "paperUrl": "https://hal.inria.fr/hal-00803241",
      "projectUrl": "",
      "category": "traditional_feature",
      "motivation": "相机运动补偿的手工特征巅峰",
      "summary": "iDT 在密集轨迹（Dense Trajectories）框架基础上引入相机运动估计与补偿机制，通过人体检测排除前景干扰后估计全局单应性变换来消除背景光流中的相机运动分量，使得提取的轨迹描述子（尤其是 MBH）更纯粹地反映人体动作，成为深度学习时代之前动作识别领域的性能巅峰方法。",
      "keyPoints": [
        "相机运动补偿：利用人体检测器排除前景区域，在背景区域匹配 SURF 特征点并估计帧间单应性矩阵，对光流进行 warp 去除相机运动",
        "密集轨迹提取：在多尺度密集网格上采样特征点，利用中值滤波光流跟踪，轨迹长度限制为 L=15 帧",
        "四种局部描述子：沿轨迹在 <span class=\"kb-math kb-math-inline\">N_\\sigma \\times N_\\sigma \\times N_\\tau</span> 时空体积内计算 Trajectory Shape、HOG、HOF、MBH",
        "MBH（运动边界直方图）为最具判别力的单一描述子，计算光流的空间梯度方向直方图",
        "Fisher Vector 编码：使用 256 个高斯分量的 GMM，对每种描述子独立编码后拼接",
        "线性 SVM 分类：对 Fisher Vector 进行 power normalization 和 L2 归一化后用线性 SVM",
        "在 Hollywood2（64.3%）、HMDB51（57.2%）、UCF101（85.9%）上达到当时最优"
      ],
      "detail": "<p><img alt=\"iDT 管线示意图\" src=\"https://lear.inrialpes.fr/people/wang/fig/pipeline.png\" />\n<em>图：iDT 整体流程。在密集采样点上通过光流跟踪生成轨迹，沿轨迹提取多种描述子，经 Fisher Vector 编码后用线性 SVM 分类。相机运动补偿通过估计全局单应性并 warp 光流实现。</em></p>\n<pre><code class=\"language-python\"># iDT 核心流程伪代码\ndef iDT(video):\n    # Step 1: 密集采样特征点（多尺度网格，间隔 W=5 像素）\n    points = dense_sample(video[0], step=5, num_scales=8)\n\n    # Step 2: 相机运动估计与补偿\n    for t in range(1, len(video)):\n        # 2a: 人体检测，获取前景 mask\n        human_mask = person_detector(video[t])\n        # 2b: 在背景区域匹配 SURF 特征点\n        matches = match_surf(video[t-1], video[t], exclude=human_mask)\n        # 2c: RANSAC 估计单应性矩阵 H\n        H = estimate_homography(matches)\n        # 2d: 用 H warp 前一帧，计算补偿后光流\n        warped = warp_frame(video[t-1], H)\n        flow_compensated[t] = optical_flow(warped, video[t])\n\n    # Step 3: 中值滤波光流跟踪（L=15 帧）\n    trajectories = track_points(points, flow_compensated, max_length=15)\n\n    # Step 4: 沿轨迹提取描述子（32x32x15 时空体积，2x2x3 网格）\n    for traj in trajectories:\n        shape_desc = trajectory_shape(traj)           # 30-d\n        hog_desc = compute_HOG(video, traj)           # 96-d\n        hof_desc = compute_HOF(flow_compensated, traj) # 108-d\n        mbhx_desc = compute_MBH(flow_x, traj)        # 96-d\n        mbhy_desc = compute_MBH(flow_y, traj)        # 96-d\n\n    # Step 5: Fisher Vector 编码 + 线性 SVM\n    fv = fisher_vector_encode(all_descriptors, gmm_256)\n    prediction = linear_svm(fv)\n    return prediction\n</code></pre>\n<p><strong>动机与背景</strong></p>\n<p>在 iDT 之前，Wang 等人于 2011 年提出了 Dense Trajectories（DT）方法，通过在视频中密集采样点并利用光流进行跟踪，沿轨迹提取局部描述子，在动作识别上取得了优异表现。然而，DT 方法存在一个关键缺陷：</p>\n<ol>\n<li><strong>相机运动干扰</strong>：当相机发生平移、旋转或缩放时，光流场中包含大量与人体动作无关的相机运动分量，导致提取的轨迹和描述子被噪声污染。</li>\n<li><strong>背景轨迹噪声</strong>：相机运动产生的背景光流会生成大量无意义的背景轨迹，降低描述子的判别力。</li>\n</ol>\n<p>iDT 正是为了解决相机运动带来的干扰而提出的改进方案。</p>\n<p><strong>核心机制一：相机运动估计与补偿</strong></p>\n<p>iDT 的核心创新在于估计并去除相机运动。具体步骤如下：</p>\n<ol>\n<li>\n<p><strong>人体检测排除前景</strong>：使用基于 DPM（Deformable Part Model）的人体检测器定位视频中的人体区域。在估计相机运动时排除这些区域，避免人体运动干扰全局运动估计。</p>\n</li>\n<li>\n<p><strong>SURF 特征点匹配</strong>：在排除人体区域后的背景中提取 SURF 特征点，在相邻帧间进行匹配。</p>\n</li>\n<li>\n<p><strong>单应性估计</strong>：利用 RANSAC 算法从匹配点对中鲁棒估计帧间单应性矩阵 <span class=\"kb-math kb-math-inline\">H</span>：</p>\n</li>\n</ol>\n<div class=\"kb-math kb-math-display\">\\mathbf{x}&#x27; \\sim H \\mathbf{x}</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">\\mathbf{x}</span> 和 <span class=\"kb-math kb-math-inline\">\\mathbf{x}&#x27;</span> 分别是前后帧中的对应点齐次坐标。单应性矩阵 <span class=\"kb-math kb-math-inline\">H</span> 是 3×3 矩阵，可以建模相机的旋转、平移和缩放。</p>\n<ol>\n<li><strong>光流补偿</strong>：利用估计的单应性 <span class=\"kb-math kb-math-inline\">H</span> 将前一帧 warp 到当前帧的视角，然后重新计算光流：</li>\n</ol>\n<div class=\"kb-math kb-math-display\">\\mathbf{w}^*(x, y) = \\mathbf{w}(x, y) - \\mathbf{w}_H(x, y)</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">\\mathbf{w}</span> 是原始光流，<span class=\"kb-math kb-math-inline\">\\mathbf{w}_H</span> 是由单应性 <span class=\"kb-math kb-math-inline\">H</span> 引起的运动场，<span class=\"kb-math kb-math-inline\">\\mathbf{w}^*</span> 是补偿后的光流，仅包含前景物体的独立运动。</p>\n<div class=\"key-point\">💡 关键：选择单应性而非仿射变换的原因是——单应性（8 自由度）能更好地建模真实相机运动（包括透视变换），而仿射变换（6 自由度）在相机旋转较大时误差显著。</div>\n<p><strong>核心机制二：密集轨迹提取</strong></p>\n<p>轨迹提取沿用 DT 的框架：</p>\n<ol>\n<li>\n<p><strong>密集采样</strong>：在 8 个空间尺度上，以 <span class=\"kb-math kb-math-inline\">W=5</span> 像素间隔在网格上采样特征点。为避免无纹理区域的无效跟踪，使用特征值阈值过滤（Shi-Tomasi 角点准则）。</p>\n</li>\n<li>\n<p><strong>中值滤波跟踪</strong>：对于每个采样点 <span class=\"kb-math kb-math-inline\">\\mathbf{P}_t = (x_t, y_t)</span>，利用光流场通过中值滤波进行跟踪：</p>\n</li>\n</ol>\n<div class=\"kb-math kb-math-display\">\\mathbf{P}_{t+1} = (x_{t+1}, y_{t+1}) = (x_t, y_t) + (\\mathcal{M} * \\mathbf{w}^*)|_{(\\bar{x}_t, \\bar{y}_t)}</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">\\mathcal{M}</span> 是 3×3 中值滤波核，<span class=\"kb-math kb-math-inline\">\\mathbf{w}^*</span> 是补偿后的光流。中值滤波相比双线性插值更鲁棒。</p>\n<ol>\n<li><strong>轨迹长度限制</strong>：最大长度 <span class=\"kb-math kb-math-inline\">L=15</span> 帧。超过此长度的轨迹被截断并重新采样，以避免漂移累积。</li>\n</ol>\n<p><strong>核心机制三：局部描述子</strong></p>\n<p>沿每条轨迹，在 <span class=\"kb-math kb-math-inline\">N_\\sigma \\times N_\\sigma \\times N_\\tau = 2 \\times 2 \\times 3</span> 的时空网格中计算描述子：</p>\n<ol>\n<li>\n<p><strong>Trajectory Shape（30-d）</strong>：归一化的位移向量序列 <span class=\"kb-math kb-math-inline\">(\\Delta P_t, \\ldots, \\Delta P_{t+L-1})</span>，描述轨迹的形状。</p>\n</li>\n<li>\n<p><strong>HOG（96-d）</strong>：方向梯度直方图，捕获外观信息。在 <span class=\"kb-math kb-math-inline\">2 \\times 2 \\times 3</span> 网格的每个 cell 中计算 8-bin 方向直方图。</p>\n</li>\n<li>\n<p><strong>HOF（108-d）</strong>：光流方向直方图，捕获运动方向。每个 cell 计算 9-bin 直方图（8 个方向 + 1 个幅度小于阈值的 bin）。</p>\n</li>\n<li>\n<p><strong>MBH（192-d = 96+96）</strong>：运动边界直方图，分别对光流的水平分量 <span class=\"kb-math kb-math-inline\">u</span> 和垂直分量 <span class=\"kb-math kb-math-inline\">v</span> 计算空间梯度，再对梯度方向做直方图：</p>\n</li>\n</ol>\n<div class=\"kb-math kb-math-display\">\\text{MBH}_x = \\text{HOG}(\\nabla u), \\quad \\text{MBH}_y = \\text{HOG}(\\nabla v)</div>\n<div class=\"key-point\">💡 关键：MBH 是 iDT 中最强的描述子。其优势在于——对光流取空间梯度天然消除了恒定运动（如相机平移导致的均匀光流），因此即使不做显式相机运动补偿，MBH 也具有一定的鲁棒性。而 iDT 的相机运动补偿进一步提升了 MBH 的判别力。</div>\n<p><strong>核心机制四：Fisher Vector 编码</strong></p>\n<p>将局部描述子编码为固定长度的视频级表示：</p>\n<ol>\n<li><strong>PCA 降维</strong>：将每种描述子降至原维度的一半。</li>\n<li><strong>GMM 训练</strong>：对每种描述子独立训练 <span class=\"kb-math kb-math-inline\">K=256</span> 个高斯分量的 GMM。</li>\n<li><strong>Fisher Vector 计算</strong>：对于一组局部描述子 <span class=\"kb-math kb-math-inline\">\\{x_1, \\ldots, x_T\\}</span>，Fisher Vector 编码一阶和二阶统计量：</li>\n</ol>\n<div class=\"kb-math kb-math-display\">\\mathcal{G}_{\\mu_k} = \\frac{1}{T\\sqrt{\\pi_k}} \\sum_{t=1}^T \\gamma_t(k) \\frac{x_t - \\mu_k}{\\sigma_k}</div>\n<div class=\"kb-math kb-math-display\">\\mathcal{G}_{\\sigma_k} = \\frac{1}{T\\sqrt{2\\pi_k}} \\sum_{t=1}^T \\gamma_t(k) \\left[\\frac{(x_t - \\mu_k)^2}{\\sigma_k^2} - 1\\right]</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">\\gamma_t(k)</span> 是第 <span class=\"kb-math kb-math-inline\">t</span> 个描述子对第 <span class=\"kb-math kb-math-inline\">k</span> 个高斯分量的后验概率。</p>\n<ol>\n<li>\n<p><strong>归一化</strong>：依次进行 power normalization（<span class=\"kb-math kb-math-inline\">f(x) = \\text{sign}(x)|x|^\\alpha, \\alpha=0.5</span>）和 L2 归一化。</p>\n</li>\n<li>\n<p><strong>多描述子融合</strong>：各描述子的 Fisher Vector 独立计算后拼接，最终维度为 <span class=\"kb-math kb-math-inline\">2 \\times K \\times d_i</span> 对每种描述子 <span class=\"kb-math kb-math-inline\">i</span>。</p>\n</li>\n</ol>\n<p><strong>与 Dense Trajectories 的对比</strong></p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>方法</th>\n<th>相机运动补偿</th>\n<th>HOF mAP (Hollywood2)</th>\n<th>MBH mAP (Hollywood2)</th>\n<th>总体 mAP</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>DT</td>\n<td>✗</td>\n<td>53.2%</td>\n<td>55.1%</td>\n<td>58.2%</td>\n</tr>\n<tr>\n<td><strong>iDT</strong></td>\n<td><strong>✓</strong></td>\n<td><strong>57.6%</strong></td>\n<td><strong>60.5%</strong></td>\n<td><strong>64.3%</strong></td>\n</tr>\n</tbody>\n</table></div>\n<div class=\"warn-box\">⚠️ 注意：相机运动补偿对 HOF 的提升最为显著（+4.4%），因为 HOF 直接依赖光流方向，受相机运动干扰最大。MBH 由于本身对恒定运动具有鲁棒性，提升相对较小但依然明显（+5.4%）。Trajectory Shape 描述子的提升也很大，因为相机运动会严重扭曲轨迹形状。</div>\n<p><strong>iDT 的历史地位</strong></p>\n<p>iDT 是深度学习方法（如双流网络、C3D）出现之前动作识别领域的统治性方法。即使在深度学习早期（2014-2016），iDT 特征与深度特征的融合仍能带来显著提升，证明了手工特征与学习特征的互补性。直到 TSN、I3D 等方法的出现，iDT 才逐渐被完全取代。</p>",
      "quiz": {
        "q": "iDT 中相机运动补偿的关键步骤是什么？",
        "options": [
          "使用 3D 卷积网络学习相机运动模式",
          "在排除人体区域后的背景中估计帧间单应性矩阵，warp 光流去除相机运动",
          "对所有光流向量减去全局均值来消除平移运动",
          "使用 IMU 传感器数据直接获取相机运动参数"
        ],
        "answer": 1,
        "explain": "iDT 通过人体检测排除前景后，在背景区域匹配 SURF 特征点并用 RANSAC 估计单应性矩阵 H，然后利用 H 对光流进行 warp 补偿，从而去除相机运动分量。"
      }
    },
    {
      "id": "two_stream",
      "num": 2,
      "name": "Two-Stream",
      "fullName": "双流卷积网络 (Two-Stream ConvNets)",
      "year": "2014",
      "org": "Oxford",
      "parent": "—",
      "paperUrl": "https://arxiv.org/abs/1406.2199",
      "projectUrl": "",
      "category": "cnn_rnn",
      "motivation": "RGB与光流双流解耦架构",
      "summary": "Two-Stream ConvNets 提出将视频动作识别解耦为空间流（单帧外观）和时间流（堆叠光流）两条独立 ConvNet，通过晚期融合实现互补，首次证明了深度学习在视频理解中可与手工特征（如 IDT）媲美的性能。",
      "keyPoints": [
        "双流架构：空间流 ConvNet 处理单帧 RGB 图像捕获外观信息，时间流 ConvNet 处理堆叠密集光流捕获运动信息",
        "光流输入设计：提出光流堆叠（optical flow stacking）、轨迹堆叠（trajectory stacking）、双向光流三种输入配置",
        "时间流输入：将连续 <span class=\"kb-math kb-math-inline\">L</span> 帧的水平/垂直光流分量堆叠为 <span class=\"kb-math kb-math-inline\">2L</span> 通道张量作为 ConvNet 输入",
        "均值光流减除：通过减去位移场均值补偿全局相机运动",
        "多任务学习：联合 UCF-101 和 HMDB-51 分类任务训练时间流网络，缓解小数据集过拟合",
        "晚期融合策略：对两流 softmax 分数进行平均或 SVM 融合",
        "空间流预训练：利用 ImageNet ILSVRC-2012 预训练解决视频数据集规模不足问题",
        "网络架构：基于 CNN-M-2048（类似 Zeiler &amp; Fergus 网络），5 层卷积 + 3 层全连接",
        "在 UCF-101 达到 88.0%、HMDB-51 达到 59.4% 准确率，与当时最优手工特征方法持平"
      ],
      "detail": "<p><img alt=\"Two-Stream Architecture\" src=\"https://arxiv.org/html/1406.2199v2/extracted/figures/two_stream_arch.png\" />\n<em>图：Two-Stream ConvNet 架构示意。上方为空间流（输入单帧 RGB），下方为时间流（输入多帧堆叠光流），最终通过晚期融合得到动作分类结果。</em></p>\n<div class=\"key-point\">💡 <strong>核心思想</strong>：受神经科学中视觉皮层\"双通路假说\"（腹侧通路负责物体识别，背侧通路负责运动感知）启发，将视频理解分解为外观识别和运动识别两个独立子问题。</div>\n<pre><code class=\"language-python\"># Two-Stream ConvNet 推理伪代码\ndef two_stream_predict(video):\n    # 1. 空间流：随机采样帧 → ImageNet预训练ConvNet\n    frames = sample_frames(video, n=25)\n    spatial_scores = spatial_convnet(frames)  # 输入: 224x224x3\n\n    # 2. 时间流：计算光流 → 堆叠L=10帧 → ConvNet\n    for frame_t in frames:\n        flow_volume = stack_optical_flow(video, t=frame_t, L=10)\n        # flow_volume shape: 224x224x20 (dx,dy × 10帧)\n        flow_volume -= flow_volume.mean(axis=(0,1))  # 均值减除\n    temporal_scores = temporal_convnet(flow_volume)\n\n    # 3. 晚期融合\n    # 方式A: 平均融合\n    final_score = (spatial_scores + temporal_scores) / 2\n    # 方式B: SVM融合 (L2归一化后拼接，训练线性SVM)\n    # final_score = svm(l2_norm(spatial_scores), l2_norm(temporal_scores))\n\n    return argmax(final_score)\n</code></pre>\n<h5>动机与背景</h5>\n<p>2014 年之前，视频动作识别领域主要依赖手工特征方法，如改进密集轨迹（Improved Dense Trajectories, IDT），其通过 HOF、MBH 等手工描述子编码光流信息。虽然 CNN 在图像分类上已取得突破（AlexNet, 2012），但直接将 CNN 应用于视频面临两大挑战：</p>\n<ol>\n<li><strong>时序建模困难</strong>：简单堆叠 RGB 帧（如 Karpathy 等人的\"slow fusion\"）效果远不如手工特征，因为 CNN 难以从原始像素中隐式学习运动模式</li>\n<li><strong>训练数据不足</strong>：当时最大的标注视频数据集 UCF-101 仅有 9.5K 训练视频，远不足以从零训练深度网络</li>\n</ol>\n<p>Two-Stream ConvNets 的核心洞察是：<strong>将运动信息显式化</strong>——用预计算的密集光流作为时间流的输入，而非让网络自行从原始帧中学习运动。</p>\n<h5>空间流 ConvNet</h5>\n<p>空间流接收单帧 RGB 图像（<span class=\"kb-math kb-math-inline\">224 \\times 224 \\times 3</span>），本质上执行静态图像的动作识别（类似物体/场景识别）。关键设计：</p>\n<ul>\n<li><strong>ImageNet 预训练</strong>：由于视频数据集过小，空间流使用在 ILSVRC-2012 上预训练的 CNN-M-2048 网络，仅微调最后分类层即可达到 72.8% 准确率（UCF-101）</li>\n<li>从零训练仅达 52.3%，证明预训练的必要性</li>\n<li>采用 dropout=0.5 的最后层训练策略</li>\n</ul>\n<h5>时间流 ConvNet——核心创新</h5>\n<p>时间流是本文最重要的贡献。它将密集光流显式编码为多通道\"图像\"输入 ConvNet：</p>\n<p><strong>光流堆叠（Optical Flow Stacking）</strong>：对于时刻 <span class=\"kb-math kb-math-inline\">\\tau</span> 的帧，将其前后 <span class=\"kb-math kb-math-inline\">L</span> 帧的光流水平分量 <span class=\"kb-math kb-math-inline\">d^x_t</span> 和垂直分量 <span class=\"kb-math kb-math-inline\">d^y_t</span> 堆叠：</p>\n<div class=\"kb-math kb-math-display\">I_\\tau(u, v, 2k-1) = d^x_{\\tau+k}(u, v), \\quad I_\\tau(u, v, 2k) = d^y_{\\tau+k}(u, v)</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">k = 0, \\ldots, L-1</span>，最终输入张量维度为 <span class=\"kb-math kb-math-inline\">w \\times h \\times 2L</span>。实验中 <span class=\"kb-math kb-math-inline\">L=10</span>，即 20 通道输入。</p>\n<p><strong>轨迹堆叠（Trajectory Stacking）</strong>：沿运动轨迹采样光流，而非固定空间位置：</p>\n<div class=\"kb-math kb-math-display\">I_\\tau(u, v, 2k-1) = d^x_{\\tau+k}(p_k), \\quad I_\\tau(u, v, 2k) = d^y_{\\tau+k}(p_k)</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">p_k</span> 为从 <span class=\"kb-math kb-math-inline\">(u,v)</span> 出发沿光流追踪到第 <span class=\"kb-math kb-math-inline\">k</span> 帧的位置。</p>\n<p><strong>双向光流</strong>：使用 <span class=\"kb-math kb-math-inline\">L/2</span> 帧前向光流 + <span class=\"kb-math kb-math-inline\">L/2</span> 帧后向光流，总通道数不变。</p>\n<div class=\"warn-box\">⚠️ <strong>关键发现</strong>：堆叠多帧光流（<span class=\"kb-math kb-math-inline\">L=10</span>）比单帧光流（<span class=\"kb-math kb-math-inline\">L=1</span>）提升约 7%，证明长程时序信息的重要性。光流堆叠略优于轨迹堆叠，双向光流仅带来微小提升。</div>\n<p><strong>均值光流减除</strong>：从每个位移场中减去其空间均值向量，补偿全局相机运动，类似于图像处理中的零均值化。实验证明这一简单操作可提升约 1% 准确率。</p>\n<h5>与手工特征的关系</h5>\n<p>论文深刻揭示了时间流 ConvNet 与传统手工描述子的联系：</p>\n<ul>\n<li><strong>HOF/MBH 描述子</strong>：基于光流方向直方图，可由第一层卷积（方向敏感滤波器）+ ReLU + 池化实现</li>\n<li><strong>运动学特征</strong>（散度、旋度、剪切）：基于光流梯度，同样可被卷积层捕获</li>\n<li><strong>轨迹特征</strong>：沿轨迹堆叠位移向量，对应轨迹堆叠输入方式</li>\n</ul>\n<p>第一层学到的 96 个滤波器（<span class=\"kb-math kb-math-inline\">7 \\times 7 \\times 20</span>）可视化显示：部分滤波器计算光流的空间导数（类似 MBH），部分计算时间导数（捕获运动变化）。</p>\n<h5>多任务学习</h5>\n<p>为缓解时间流在小数据集（尤其是 HMDB-51 仅 3.7K 训练视频）上的过拟合，采用多任务学习：</p>\n<ul>\n<li>在最后全连接层之上添加两个 softmax 分类头（UCF-101 和 HMDB-51）</li>\n<li>总损失为两个任务损失之和，通过反向传播联合优化</li>\n<li>HMDB-51 上从 46.6% 提升至 55.4%（+8.8%），UCF-101 上从 81.0% 提升至 81.5%</li>\n</ul>\n<h5>训练与测试细节</h5>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>配置项</th>\n<th>空间流</th>\n<th>时间流</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>输入尺寸</td>\n<td>224×224×3</td>\n<td>224×224×20</td>\n</tr>\n<tr>\n<td>预训练</td>\n<td>ImageNet ILSVRC-2012</td>\n<td>无（从零训练）</td>\n</tr>\n<tr>\n<td>Dropout</td>\n<td>0.5</td>\n<td>0.9</td>\n</tr>\n<tr>\n<td>学习率</td>\n<td>10⁻² → 10⁻³(14K) → stop(20K)</td>\n<td>10⁻² → 10⁻³(50K) → 10⁻⁴(70K) → stop(80K)</td>\n</tr>\n<tr>\n<td>数据增强</td>\n<td>随机裁剪 + 翻转 + RGB抖动</td>\n<td>随机裁剪 + 翻转</td>\n</tr>\n</tbody>\n</table></div>\n<ul>\n<li><strong>测试</strong>：均匀采样 25 帧，每帧 10 次裁剪（4角+中心 × 翻转），对所有分数取平均</li>\n<li><strong>光流计算</strong>：使用 Brox 等人的 GPU 实现（OpenCV），0.06s/帧对，预计算并 JPEG 压缩存储（UCF-101 从 1.5TB 压缩至 27GB）</li>\n<li><strong>多 GPU 训练</strong>：基于 Caffe，4× NVIDIA Titan，数据并行，3.2× 加速</li>\n</ul>\n<h5>晚期融合与最终结果</h5>\n<p>两流融合方式对比（UCF-101 split 1）：</p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>融合方式</th>\n<th>准确率</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>仅空间流</td>\n<td>72.8%</td>\n</tr>\n<tr>\n<td>仅时间流</td>\n<td>81.2%</td>\n</tr>\n<tr>\n<td>平均融合</td>\n<td>85.9%</td>\n</tr>\n<tr>\n<td>SVM 融合</td>\n<td>87.0%</td>\n</tr>\n</tbody>\n</table></div>\n<div class=\"key-point\">💡 <strong>互补性</strong>：融合后比单独时间流提升 6%，比空间流提升 14%，证明外观和运动信息高度互补。</div>\n<p><strong>与当时最优方法对比（3-split 平均）</strong>：</p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>方法</th>\n<th>UCF-101</th>\n<th>HMDB-51</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>IDT [Wang &amp; Schmid, 2013]</td>\n<td>85.9%</td>\n<td>57.2%</td>\n</tr>\n<tr>\n<td>IDT + 高维编码</td>\n<td>87.9%</td>\n<td>61.1%</td>\n</tr>\n<tr>\n<td>Slow Fusion ConvNet [Karpathy, 2014]</td>\n<td>65.4%</td>\n<td>-</td>\n</tr>\n<tr>\n<td><strong>Two-Stream (SVM 融合)</strong></td>\n<td><strong>88.0%</strong></td>\n<td><strong>59.4%</strong></td>\n</tr>\n</tbody>\n</table></div>\n<p>Two-Stream ConvNets 首次使深度学习方法在视频动作识别上达到与精心设计的手工特征方法持平的性能，开创了视频理解的双流范式。</p>",
      "quiz": {
        "q": "Two-Stream ConvNets 中时间流网络的输入是什么？",
        "options": [
          "连续多帧 RGB 图像堆叠",
          "单帧 RGB 图像的梯度图",
          "连续多帧的密集光流位移场堆叠",
          "视频帧的频域变换特征"
        ],
        "answer": 2,
        "explain": "时间流的核心创新在于使用预计算的密集光流作为显式运动表示，将连续 L=10 帧的水平和垂直光流分量堆叠为 2L=20 通道的输入张量，而非直接使用原始 RGB 帧。"
      }
    },
    {
      "id": "c3d",
      "num": 3,
      "name": "C3D",
      "fullName": "3D卷积网络 (Convolutional 3D Networks)",
      "year": "2015",
      "org": "Facebook",
      "parent": "idt",
      "paperUrl": "https://arxiv.org/abs/1412.0767",
      "projectUrl": "",
      "category": "cnn_rnn",
      "motivation": "3D卷积端到端时空特征学习",
      "summary": "C3D 提出使用统一的 \\(3 \\times 3 \\times 3\\) 小卷积核构建深度3D卷积网络，在大规模视频数据集 Sports-1M 上预训练后，其中间层特征（fc6）可作为通用的视频时空描述子，在动作识别、场景分类、动作相似度判断等多个视频分析任务上取得优异的迁移性能。",
      "keyPoints": [
        "<strong>统一的3D卷积核尺寸</strong>：系统实验证明 <span class=\"kb-math kb-math-inline\">3 \\times 3 \\times 3</span> 是3D卷积的最优核尺寸，兼顾时间和空间建模能力",
        "<strong>C3D网络架构</strong>：8层卷积 + 5层池化 + 2层全连接（4096维），输入为16帧 <span class=\"kb-math kb-math-inline\">112 \\times 112</span> 的视频片段",
        "<strong>大规模预训练</strong>：在 Sports-1M 数据集（110万视频，487类）上进行预训练",
        "<strong>通用视频特征</strong>：fc6 层的4096维激活值作为通用视频描述子，可直接迁移到多种下游任务",
        "<strong>高效紧凑表示</strong>：通过 PCA 降至仅10维仍保持52.8%的 UCF101 准确率，证明特征的高度紧凑性",
        "<strong>多任务验证</strong>：在动作识别（UCF101）、动作相似度（ASLAN）、场景识别（YUPENN/Maryland）、物体识别等任务上均表现优异"
      ],
      "detail": "<p><img alt=\"C3D 2D与3D卷积对比\" src=\"https://ar5iv.labs.arxiv.org/html/1412.0767/assets/x1.png\" />\n<em>图1：2D卷积 vs 3D卷积。2D卷积仅在空间维度操作，输出为2D特征图；3D卷积同时在时间和空间维度操作，输出保留时间信息的3D特征体。</em></p>\n<p><img alt=\"C3D网络架构\" src=\"https://ar5iv.labs.arxiv.org/html/1412.0767/assets/x2.png\" />\n<em>图2：C3D 网络架构。包含8个卷积层、5个池化层和2个全连接层，所有3D卷积核均为 3×3×3。</em></p>\n<h5>算法伪代码</h5>\n<pre><code class=\"language-python\"># C3D 特征提取流程\ndef extract_c3d_features(video):\n    # 1. 视频预处理：分割为16帧片段，8帧重叠\n    clips = split_video(video, clip_length=16, overlap=8)\n\n    features = []\n    for clip in clips:\n        # 2. 输入预处理：resize到 128x171，随机裁剪 112x112\n        x = preprocess(clip)  # shape: (3, 16, 112, 112)\n\n        # 3. 前向传播通过 C3D 网络\n        # Conv1a(64) -&gt; Pool1(1x2x2) \n        # Conv2a(128) -&gt; Pool2(2x2x2)\n        # Conv3a(256) -&gt; Conv3b(256) -&gt; Pool3(2x2x2)\n        # Conv4a(512) -&gt; Conv4b(512) -&gt; Pool4(2x2x2)\n        # Conv5a(512) -&gt; Conv5b(512) -&gt; Pool5(2x2x2)\n        # FC6(4096) -&gt; FC7(4096) -&gt; Softmax(487)\n        fc6 = forward_to_fc6(x)  # shape: (4096,)\n        features.append(fc6)\n\n    # 4. 平均池化所有片段特征\n    video_descriptor = mean(features)  # (4096,)\n\n    # 5. L2 归一化\n    video_descriptor = l2_normalize(video_descriptor)\n\n    return video_descriptor\n</code></pre>\n<h5>动机与背景</h5>\n<p>视频理解的核心挑战在于如何同时建模空间外观和时间运动信息。传统方法依赖手工设计的特征（如 HOG、HOF、MBH），虽然在特定任务上表现良好，但缺乏通用性和可扩展性。2D CNN 在图像领域取得了巨大成功，但直接应用于视频时会丢失时间维度的信息。</p>\n<p>早期的3D卷积网络（如 Ji et al. 2010, Karpathy et al. 2014）虽然尝试了时空建模，但存在以下问题：\n- 网络较浅，表达能力有限\n- 卷积核尺寸选择缺乏系统研究\n- 未充分利用大规模数据进行预训练\n- 特征迁移能力未被充分验证</p>\n<p>C3D 的核心动机是：<strong>构建一个简单而有效的3D卷积网络，使其学到的特征能够像 ImageNet 预训练的2D CNN 特征一样，成为视频分析的通用表示。</strong></p>\n<h5>核心机制：3×3×3 卷积核的系统验证</h5>\n<p>C3D 的第一个关键贡献是通过系统实验确定了最优的3D卷积核时间维度。作者在 UCF101 上对比了不同时间深度的卷积核：</p>\n<div class=\"kb-math kb-math-display\">L_{cls} = -\\sum_{i=1}^{N} y_i \\log(\\hat{y}_i)</div>\n<p>实验设置了以下变体进行对比：\n- <strong>同质网络</strong>：所有卷积层使用相同的时间核深度 <span class=\"kb-math kb-math-inline\">d \\in \\{1, 3, 5, 7\\}</span>\n- <strong>递增网络</strong>：时间核深度从浅层到深层递增（3-3-5-5-7）\n- <strong>递减网络</strong>：时间核深度从浅层到深层递减（7-5-5-3-3）</p>\n<div class=\"key-point\">💡 关键发现：<span class=\"kb-math kb-math-inline\">3 \\times 3 \\times 3</span> 核在所有变体中表现最佳。这与2D领域 VGGNet 的发现一致——小卷积核堆叠比大卷积核更有效，因为引入了更多非线性层，同时参数量更少。</div>\n<h5>C3D 网络架构详解</h5>\n<p>C3D 的最终架构设计如下：</p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>层</th>\n<th>输出尺寸</th>\n<th>卷积核/池化核</th>\n<th>通道数</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>Input</td>\n<td>3×16×112×112</td>\n<td>—</td>\n<td>3</td>\n</tr>\n<tr>\n<td>Conv1a</td>\n<td>64×16×112×112</td>\n<td>3×3×3</td>\n<td>64</td>\n</tr>\n<tr>\n<td>Pool1</td>\n<td>64×16×56×56</td>\n<td>1×2×2</td>\n<td>—</td>\n</tr>\n<tr>\n<td>Conv2a</td>\n<td>128×16×56×56</td>\n<td>3×3×3</td>\n<td>128</td>\n</tr>\n<tr>\n<td>Pool2</td>\n<td>128×8×28×28</td>\n<td>2×2×2</td>\n<td>—</td>\n</tr>\n<tr>\n<td>Conv3a</td>\n<td>256×8×28×28</td>\n<td>3×3×3</td>\n<td>256</td>\n</tr>\n<tr>\n<td>Conv3b</td>\n<td>256×8×28×28</td>\n<td>3×3×3</td>\n<td>256</td>\n</tr>\n<tr>\n<td>Pool3</td>\n<td>256×4×14×14</td>\n<td>2×2×2</td>\n<td>—</td>\n</tr>\n<tr>\n<td>Conv4a</td>\n<td>512×4×14×14</td>\n<td>3×3×3</td>\n<td>512</td>\n</tr>\n<tr>\n<td>Conv4b</td>\n<td>512×4×14×14</td>\n<td>3×3×3</td>\n<td>512</td>\n</tr>\n<tr>\n<td>Pool4</td>\n<td>512×2×7×7</td>\n<td>2×2×2</td>\n<td>—</td>\n</tr>\n<tr>\n<td>Conv5a</td>\n<td>512×2×7×7</td>\n<td>3×3×3</td>\n<td>512</td>\n</tr>\n<tr>\n<td>Conv5b</td>\n<td>512×2×7×7</td>\n<td>3×3×3</td>\n<td>512</td>\n</tr>\n<tr>\n<td>Pool5</td>\n<td>512×1×4×4</td>\n<td>2×2×2</td>\n<td>—</td>\n</tr>\n<tr>\n<td>FC6</td>\n<td>4096</td>\n<td>—</td>\n<td>—</td>\n</tr>\n<tr>\n<td>FC7</td>\n<td>4096</td>\n<td>—</td>\n<td>—</td>\n</tr>\n<tr>\n<td>Softmax</td>\n<td>487</td>\n<td>—</td>\n<td>—</td>\n</tr>\n</tbody>\n</table></div>\n<div class=\"warn-box\">⚠️ 注意：Pool1 的时间维度步长为1（即 <span class=\"kb-math kb-math-inline\">1 \\times 2 \\times 2</span>），这是为了在早期保留时间信息。从 Pool2 开始使用 <span class=\"kb-math kb-math-inline\">2 \\times 2 \\times 2</span> 的池化核，逐步降低时空分辨率。</div>\n<h5>训练策略</h5>\n<p>C3D 在 Sports-1M 数据集上训练，关键超参数：\n- <strong>优化器</strong>：SGD，动量0.9\n- <strong>批量大小</strong>：30\n- <strong>初始学习率</strong>：0.003，每150K次迭代减半\n- <strong>总迭代次数</strong>：1.9M（约13个epoch）\n- <strong>数据增强</strong>：随机裁剪 <span class=\"kb-math kb-math-inline\">16 \\times 112 \\times 112</span>，50%概率水平翻转\n- <strong>Dropout</strong>：0.5（应用于FC6和FC7）</p>\n<h5>特征迁移与应用</h5>\n<p>C3D 的核心价值在于其学到的特征具有强大的迁移能力。特征提取流程：</p>\n<ol>\n<li>将视频分割为16帧的片段，相邻片段有8帧重叠</li>\n<li>每个片段通过 C3D 网络前向传播，提取 fc6 层的4096维激活值</li>\n<li>对所有片段的特征取平均，得到视频级描述子</li>\n<li>L2 归一化</li>\n</ol>\n<p>在下游任务中，C3D 特征可以直接配合简单的线性 SVM 分类器使用，无需微调网络：</p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>任务</th>\n<th>数据集</th>\n<th>C3D 性能</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>动作识别</td>\n<td>UCF101</td>\n<td>82.3%（单网络）/ 90.4%（+iDT）</td>\n</tr>\n<tr>\n<td>动作相似度</td>\n<td>ASLAN</td>\n<td>78.3% accuracy</td>\n</tr>\n<tr>\n<td>场景识别</td>\n<td>YUPENN</td>\n<td>98.1%</td>\n</tr>\n<tr>\n<td>场景识别</td>\n<td>Maryland</td>\n<td>87.7%</td>\n</tr>\n</tbody>\n</table></div>\n<h5>与传统方法的对比</h5>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>特性</th>\n<th>手工特征(iDT)</th>\n<th>2D CNN</th>\n<th>C3D</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>时间建模</td>\n<td>光流+轨迹</td>\n<td>无/有限</td>\n<td>3D卷积</td>\n</tr>\n<tr>\n<td>特征维度</td>\n<td>高维稀疏</td>\n<td>4096</td>\n<td>4096</td>\n</tr>\n<tr>\n<td>计算效率</td>\n<td>慢（光流计算）</td>\n<td>快</td>\n<td>快（91.5 fps）</td>\n</tr>\n<tr>\n<td>通用性</td>\n<td>仅动作</td>\n<td>仅外观</td>\n<td>时空通用</td>\n</tr>\n<tr>\n<td>紧凑性</td>\n<td>差</td>\n<td>中等</td>\n<td>优（10维仍52.8%）</td>\n</tr>\n</tbody>\n</table></div>\n<div class=\"key-point\">💡 关键优势：C3D 的计算效率极高，在单GPU上可达 313 fps 的特征提取速度（仅卷积部分），完整流程约 91.5 fps，比实时处理快数倍。同时，C3D 特征与 iDT 互补，二者融合可进一步提升性能。</div>",
      "quiz": {
        "q": "C3D 网络中 Pool1 层使用 1×2×2 的池化核（时间维度步长为1）的主要原因是什么？",
        "options": [
          "减少计算量，加速训练过程",
          "在网络早期保留时间信息，避免过早丢失时序细节",
          "与2D池化保持兼容，方便迁移学习",
          "防止梯度消失，提升训练稳定性"
        ],
        "answer": 1,
        "explain": "作者发现在第一层池化时对时间维度进行下采样会导致时间信息过早丢失，因此Pool1仅在空间维度进行2×2下采样，保持16帧的时间分辨率不变。"
      }
    },
    {
      "id": "lrcn",
      "num": 4,
      "name": "LRCN",
      "fullName": "长程循环网络 (Long-term Recurrent ConvNets)",
      "year": "2015",
      "org": "UC Berkeley",
      "parent": "two_stream",
      "paperUrl": "https://arxiv.org/abs/1411.4389",
      "projectUrl": "",
      "category": "cnn_rnn",
      "motivation": "CNN+LSTM端到端时序建模",
      "summary": "LRCN 提出将深度卷积网络（CNN）与长短期记忆网络（LSTM）端到端结合的通用架构，统一处理视觉序列输入（视频活动识别）和序列输出（图像/视频描述生成）任务，证明了深度时序建模相比单帧静态特征的显著优势。",
      "keyPoints": [
        "<strong>统一架构</strong>：LRCN 是一种同时具备空间深度（CNN）和时间深度（LSTM）的通用模型，可处理序列输入、序列输出或两者兼有的视觉任务",
        "<strong>端到端训练</strong>：CNN 视觉特征提取器与 LSTM 序列模型联合训练，梯度从 LSTM 反传至 CNN 实现微调",
        "<strong>三大任务验证</strong>：活动识别（UCF-101）、图像描述生成（COCO 2014）、视频描述生成（YouTube/TACoS）",
        "<strong>视觉特征逐帧输入</strong>：不同于仅在首帧输入图像特征的方法，LRCN 在每个时间步都输入视觉特征",
        "<strong>分层（Factored）架构</strong>：多层 LSTM 中将视觉输入传递到各层，增强视觉信息利用",
        "<strong>RGB + 光流互补融合</strong>：通过加权平均两种输入模态的预测分数提升活动识别性能",
        "<strong>关键训练技巧</strong>：使用 0.9 的高 dropout 率防止过拟合；fc6 特征优于 fc7"
      ],
      "detail": "<p><img alt=\"LRCN 整体架构图\" src=\"https://ar5iv.labs.arxiv.org/html/1411.4389/assets/x1.png\" />\n<em>图 1：LRCN 模型总览。视觉输入经 CNN 提取特征后，逐帧送入 LSTM 进行时序建模。该架构可灵活应用于序列输入（活动识别）、序列输出（图像描述）或序列到序列（视频描述）任务。</em></p>\n<p><img alt=\"任务特定实例化\" src=\"https://ar5iv.labs.arxiv.org/html/1411.4389/assets/x3.png\" />\n<em>图 3：LRCN 在三个任务上的具体实例化方式——活动识别（左）、图像描述（中）、视频描述（右）。</em></p>\n<h5>算法伪代码</h5>\n<pre><code class=\"language-python\"># LRCN 端到端训练流程（活动识别）\n# 输入：视频片段 V = {f_1, f_2, ..., f_T}，T=16帧\n# CNN: CaffeNet (类AlexNet)，提取 fc6 特征 (4096-d)\n\nfor clip in training_clips:\n    frames = sample_frames(clip, T=16)  # 连续16帧\n\n    # CNN 特征提取（权重共享）\n    for t in range(T):\n        x_t = CNN(frames[t])  # fc6: 4096-d 向量\n\n    # LSTM 序列建模\n    h_0 = zeros(hidden_size)  # flow: 1024, RGB: 256\n    for t in range(T):\n        h_t = LSTM(x_t, h_{t-1})\n\n    # 分类：对所有时间步预测取平均\n    logits = mean([Linear(h_t) for t in range(T)])\n    loss = CrossEntropy(logits, label)\n\n    # 端到端反向传播（含CNN微调）\n    loss.backward()  # 梯度流经 LSTM → CNN\n    optimizer.step()  # dropout=0.9\n</code></pre>\n<pre><code class=\"language-python\"># LRCN 图像描述生成\n# 输入：单张图像 I，词汇表 vocab\n# CNN: VGGNet，提取 fc7 特征\n\ndef generate_caption(image):\n    v = CNN(image)  # 视觉特征，每步都输入\n\n    words = [BOS]  # 起始符\n    h = zeros(hidden_size)\n\n    for t in range(max_len):\n        # 视觉特征 + 词嵌入拼接后输入 LSTM\n        input_t = concat(v, embed(words[-1]))\n        h = LSTM(input_t, h)\n\n        # 预测下一个词\n        prob = softmax(Linear(h))\n        next_word = sample(prob, temperature=1.5, N=100)\n\n        if next_word == EOS:\n            break\n        words.append(next_word)\n\n    return words\n</code></pre>\n<h5>动机与背景</h5>\n<p>传统视频理解方法面临两大挑战：（1）手工设计的时序特征（如 iDT）难以端到端优化；（2）早期深度学习方法（如 Karpathy 等人的大规模视频分类）仅在固定时间窗口内进行池化，无法建模长程时序依赖。同时，图像描述生成任务需要模型既理解视觉内容又能生成自然语言序列，传统方法依赖检索或模板填充。</p>\n<p>LRCN 的核心动机是：<strong>能否设计一个统一的深度架构，既能从原始像素中学习视觉表示，又能建模任意长度的时序动态？</strong> 答案是将 CNN 的空间特征学习能力与 LSTM 的长程序列建模能力端到端结合。</p>\n<h5>核心机制</h5>\n<p><strong>1. LSTM 序列建模</strong></p>\n<p>LRCN 采用标准 LSTM 单元，其核心计算为：</p>\n<div class=\"kb-math kb-math-display\">i_t = \\sigma(W_{xi}x_t + W_{hi}h_{t-1} + b_i)</div>\n<div class=\"kb-math kb-math-display\">f_t = \\sigma(W_{xf}x_t + W_{hf}h_{t-1} + b_f)</div>\n<div class=\"kb-math kb-math-display\">o_t = \\sigma(W_{xo}x_t + W_{ho}h_{t-1} + b_o)</div>\n<div class=\"kb-math kb-math-display\">g_t = \\tanh(W_{xg}x_t + W_{hg}h_{t-1} + b_g)</div>\n<div class=\"kb-math kb-math-display\">c_t = f_t \\odot c_{t-1} + i_t \\odot g_t</div>\n<div class=\"kb-math kb-math-display\">h_t = o_t \\odot \\tanh(c_t)</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">i_t, f_t, o_t</span> 分别为输入门、遗忘门和输出门，<span class=\"kb-math kb-math-inline\">c_t</span> 为记忆单元状态。遗忘门允许网络选择性地保留或丢弃历史信息，这是建模长程依赖的关键。</p>\n<div class=\"key-point\">💡 关键：与普通 RNN 相比，LSTM 通过门控机制解决了梯度消失问题，使得网络能够学习跨越数十帧的时序模式。</div>\n<p><strong>2. CNN 视觉编码器</strong></p>\n<p>视觉特征提取采用预训练的 CaffeNet（类似 AlexNet）或 VGGNet。实验发现 <span class=\"kb-math kb-math-inline\">fc_6</span> 层特征（4096 维）略优于 <span class=\"kb-math kb-math-inline\">fc_7</span>，因为 <span class=\"kb-math kb-math-inline\">fc_6</span> 保留了更多的视觉细节信息。CNN 权重在端到端训练中被微调，使视觉表示适应具体任务。</p>\n<p><strong>3. 分层（Factored）LSTM 架构</strong></p>\n<p><img alt=\"分层架构变体\" src=\"https://ar5iv.labs.arxiv.org/html/1411.4389/assets/x4.png\" />\n<em>图 4：三种 LRCN 图像描述架构变体。左：单层直接输入；中：两层但视觉仅输入第一层；右：分层架构，视觉特征同时输入两层 LSTM。</em></p>\n<p>在多层 LSTM 中，分层架构将视觉输入不仅传递给第一层，还直接传递给更高层。这使得高层 LSTM 能够直接访问视觉信息，而非仅依赖低层的隐状态表示。实验证明分层架构在图像描述任务上带来了显著提升。</p>\n<p><strong>4. 双流融合策略</strong></p>\n<p>对于活动识别，LRCN 分别训练 RGB 和光流两个网络，推理时通过加权平均融合：</p>\n<div class=\"kb-math kb-math-display\">P_{final} = \\alpha \\cdot P_{RGB} + (1-\\alpha) \\cdot P_{flow}</div>\n<p>实验中 <span class=\"kb-math kb-math-inline\">\\alpha = 1/3</span>（即光流权重 2/3）时效果最佳，因为光流网络（77.28%）显著优于 RGB 网络（68.20%），运动信息对动作识别更为关键。</p>\n<div class=\"warn-box\">⚠️ 注意：RGB 和光流的互补性体现在不同类别上——\"Typing\" 等依赖物体外观的动作由 RGB 主导，而 \"SoccerJuggling\" 等依赖运动模式的动作由光流主导。</div>\n<h5>训练与推理流程</h5>\n<p><strong>活动识别训练：</strong>\n- 从视频中随机采样 16 帧连续片段\n- 光流使用 Brox 算法计算，以 x/y 方向光流图作为输入\n- 光流 LSTM 隐藏层 1024 维，RGB LSTM 隐藏层 256 维\n- 所有时间步的预测取平均作为最终分类结果\n- 使用 SGD 优化，dropout 率 0.9</p>\n<p><strong>图像描述生成：</strong>\n- 训练时以 teacher forcing 方式输入真实词序列\n- 推理时采用采样策略：从模型分布中采样 <span class=\"kb-math kb-math-inline\">N=100</span> 个候选句子，温度 <span class=\"kb-math kb-math-inline\">T=1.5</span>，选择对数似然最高的\n- Beam search（宽度 3-5）也有效，但采样策略在 CIDEr-D 指标上更优</p>\n<p><strong>视频描述生成：</strong>\n- 采用两阶段方法：先用 CNN 提取帧级特征并均值池化为视频级表示\n- 再用 LSTM 解码器生成描述（与图像描述共享架构）</p>\n<h5>与传统方法的对比</h5>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>方面</th>\n<th>传统方法</th>\n<th>LRCN</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>时序建模</td>\n<td>手工特征 + SVM/HMM</td>\n<td>LSTM 端到端学习</td>\n</tr>\n<tr>\n<td>视觉特征</td>\n<td>固定 CNN 特征</td>\n<td>CNN 端到端微调</td>\n</tr>\n<tr>\n<td>长程依赖</td>\n<td>滑动窗口池化</td>\n<td>LSTM 记忆单元</td>\n</tr>\n<tr>\n<td>任务通用性</td>\n<td>任务特定设计</td>\n<td>统一架构适配多任务</td>\n</tr>\n<tr>\n<td>图像描述</td>\n<td>检索/模板</td>\n<td>序列生成</td>\n</tr>\n</tbody>\n</table></div>\n<p>与 Simonyan &amp; Zisserman 的双流网络相比，LRCN 的核心区别在于用 LSTM 替代了简单的时间池化，能够建模帧间的顺序关系而非仅聚合统计量。在 UCF-101 上，LRCN（82.34%）与双流网络（87.6%）存在差距，主要因为双流网络使用了更深的 VGGNet 和更大的光流堆叠窗口。</p>\n<p>与 Karpathy 等人的方法（65.4%）相比，LRCN 的 LSTM 时序建模带来了巨大提升，验证了序列模型对视频理解的重要性。</p>\n<h5>关键实验结果</h5>\n<ul>\n<li><strong>UCF-101 活动识别</strong>：LRCN-fc6 RGB 68.20%，Flow 77.28%，加权融合 82.34%（超越单帧基线 3.40%）</li>\n<li><strong>COCO 图像描述</strong>：CIDEr-D 0.934，BLEU-4 0.585，与 Google NIC（0.946）接近</li>\n<li><strong>生成策略</strong>：采样（N=100, T=1.5）优于贪心搜索和 beam search</li>\n</ul>",
      "quiz": {
        "q": "LRCN 中为什么在每个时间步都输入视觉特征，而非仅在第一步输入？",
        "options": [
          "为了减少 LSTM 的参数量",
          "因为 LSTM 的遗忘门会逐渐丢失早期输入的视觉信息，持续输入可保持视觉信号强度",
          "为了使模型能够处理不同分辨率的图像",
          "因为 CNN 在不同时间步提取的特征完全不同"
        ],
        "answer": 1,
        "explain": "LSTM 的遗忘门机制会随时间衰减早期信息，若仅在首帧输入视觉特征，后续时间步的视觉信号会逐渐减弱。每步都输入视觉特征确保序列模型在生成每个词时都能充分利用图像信息。"
      }
    },
    {
      "id": "tsn",
      "num": 5,
      "name": "TSN",
      "fullName": "时序分段网络 (Temporal Segment Networks)",
      "year": "2016",
      "org": "CUHK",
      "parent": "two_stream",
      "paperUrl": "https://arxiv.org/abs/1608.00859",
      "projectUrl": "",
      "category": "cnn_rnn",
      "motivation": "稀疏采样与段共识机制",
      "summary": "TSN 提出基于稀疏时序采样与段共识函数的视频级表示学习框架，通过将长视频均匀分段并聚合各段特征，以极低计算开销建模完整视频的时序结构，在动作识别任务上取得了当时最优性能。",
      "keyPoints": [
        "稀疏时序采样策略：将视频均匀划分为 K 个段，每段随机采样一个片段（snippet），以低成本覆盖整段视频",
        "段共识函数（Segment Consensus）：通过聚合函数 <span class=\"kb-math kb-math-inline\">G</span>（均值、最大值、加权平均等）融合各段预测，实现视频级分类",
        "多模态输入：支持 RGB、光流（Optical Flow）、RGB 差分（Warped Optical Flow）三种输入模态",
        "跨模态预训练（Cross-modality Pre-training）：利用 RGB 模型的 ImageNet 预训练权重初始化光流网络",
        "部分批归一化（Partial BN）：冻结除第一层外的所有 BN 层均值/方差，缓解小数据集过拟合",
        "数据增强策略：角点裁剪（Corner Cropping）与多尺度裁剪（Multi-scale Cropping）",
        "在 UCF101 上达到 94.2%，HMDB51 上达到 69.4% 的识别准确率"
      ],
      "detail": "<p><img alt=\"TSN 框架示意图\" src=\"https://ar5iv.labs.arxiv.org/html/1608.00859/assets/x1.png\" />\n<em>图：TSN 的整体框架。视频被均匀分为 K 段，每段随机采样一个片段送入共享权重的 ConvNet，最终通过段共识函数聚合得到视频级预测。</em></p>\n<pre><code class=\"language-python\"># TSN 核心逻辑伪代码\ndef TSN(video, K=3, consensus='avg'):\n    # Step 1: 将视频均匀分为 K 段\n    segments = divide_video(video, K)\n\n    # Step 2: 从每段随机采样一个 snippet\n    snippets = [random_sample(seg) for seg in segments]\n\n    # Step 3: 共享权重的 ConvNet 提取各段特征\n    scores = [ConvNet(snippet, W) for snippet in snippets]\n\n    # Step 4: 段共识函数聚合\n    if consensus == 'avg':\n        video_score = mean(scores)\n    elif consensus == 'max':\n        video_score = max(scores)\n    elif consensus == 'weighted':\n        video_score = weighted_mean(scores)\n\n    # Step 5: Softmax 输出最终预测\n    prediction = softmax(video_score)\n    return prediction\n</code></pre>\n<p><strong>动机与背景</strong></p>\n<p>在 TSN 之前，双流卷积网络（Two-Stream ConvNets）已经证明了结合 RGB 外观信息和光流运动信息对视频理解的有效性。然而，传统双流方法存在两个关键缺陷：</p>\n<ol>\n<li><strong>时序建模不足</strong>：双流网络仅在单帧或短片段（如连续 10 帧光流）上操作，无法捕获长程时序结构。</li>\n<li><strong>训练数据有限</strong>：视频数据集（如 UCF101 仅约 9.5K 训练视频）规模远小于图像数据集（ImageNet 120 万张），深度网络容易过拟合。</li>\n</ol>\n<p>TSN 正是为了解决这两个问题而提出的。</p>\n<p><strong>核心机制：稀疏采样与段共识</strong></p>\n<p>TSN 的核心思想可以用一个公式概括：</p>\n<div class=\"kb-math kb-math-display\">\\text{TSN}(T_1, T_2, \\ldots, T_K) = \\mathcal{H}\\left(\\mathcal{G}\\left(\\mathcal{F}(T_1; W), \\mathcal{F}(T_2; W), \\ldots, \\mathcal{F}(T_K; W)\\right)\\right)</div>\n<p>其中：\n- <span class=\"kb-math kb-math-inline\">T_k</span> 是第 <span class=\"kb-math kb-math-inline\">k</span> 段中随机采样的片段\n- <span class=\"kb-math kb-math-inline\">\\mathcal{F}(T_k; W)</span> 是共享参数 <span class=\"kb-math kb-math-inline\">W</span> 的卷积网络对片段 <span class=\"kb-math kb-math-inline\">T_k</span> 的类别得分输出\n- <span class=\"kb-math kb-math-inline\">\\mathcal{G}</span> 是段共识函数，聚合所有段的预测\n- <span class=\"kb-math kb-math-inline\">\\mathcal{H}</span> 是预测函数（如 Softmax）</p>\n<div class=\"key-point\">💡 关键：稀疏采样的精妙之处在于——不需要密集处理所有帧，只需从每个时间段中采样一个代表性片段。这使得计算成本与处理单个片段几乎相同（因为段数 K 通常仅为 3），却能覆盖整个视频的时序范围。</div>\n<p><strong>段共识函数的选择</strong></p>\n<p>论文探索了多种聚合函数 <span class=\"kb-math kb-math-inline\">\\mathcal{G}</span>：</p>\n<ol>\n<li><strong>均值聚合（Average）</strong>：<span class=\"kb-math kb-math-inline\">\\mathcal{G}(F_1, \\ldots, F_K) = \\frac{1}{K}\\sum_{k=1}^K F_k</span></li>\n<li><strong>最大值聚合（Max）</strong>：取各段得分的逐类最大值</li>\n<li><strong>加权平均</strong>：根据段的重要性分配权重</li>\n<li><strong>Top-K 聚合</strong>：取得分最高的 K 个段</li>\n</ol>\n<p>实验表明，简单的均值聚合即可取得最优效果，这也体现了方法的简洁优雅。</p>\n<p><strong>训练与优化</strong></p>\n<p>基于段共识函数，TSN 的损失函数为标准交叉熵：</p>\n<div class=\"kb-math kb-math-display\">L(y, \\mathcal{G}) = -\\sum_{i=1}^C y_i \\left( g_i - \\log \\sum_{j=1}^C \\exp(g_j) \\right)</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">C</span> 为类别数，<span class=\"kb-math kb-math-inline\">g_i</span> 为共识函数输出的第 <span class=\"kb-math kb-math-inline\">i</span> 类得分。梯度通过共识函数反传到各段的 ConvNet：</p>\n<div class=\"kb-math kb-math-display\">\\frac{\\partial L}{\\partial W} = \\frac{\\partial L}{\\partial \\mathcal{G}} \\sum_{k=1}^K \\frac{\\partial \\mathcal{G}}{\\partial \\mathcal{F}(T_k)} \\frac{\\partial \\mathcal{F}(T_k)}{\\partial W}</div>\n<p><strong>Good Practices：解决过拟合</strong></p>\n<p>TSN 提出了一系列训练技巧来应对视频数据集规模小的问题：</p>\n<ol>\n<li>\n<p><strong>跨模态预训练</strong>：光流输入为单通道（或双通道 x/y），无法直接使用 ImageNet 预训练的 RGB 模型。TSN 提出将 RGB 模型第一层卷积核沿通道维度取平均，再复制到光流通道数，从而实现跨模态权重迁移。</p>\n</li>\n<li>\n<p><strong>部分批归一化（Partial BN）</strong>：微调时冻结除第一个 BN 层外的所有 BN 层统计量。第一层保留更新是因为输入分布（光流 vs ImageNet 图像）差异较大，需要适配。</p>\n</li>\n<li>\n<p><strong>数据增强</strong>：</p>\n</li>\n<li>角点裁剪：仅从图像的四角和中心裁剪，避免过度关注中心区域</li>\n<li>多尺度裁剪：在 {256, 224, 192, 168} 多个尺度上裁剪，增加尺度多样性</li>\n</ol>\n<p><strong>测试时融合策略</strong></p>\n<p>推理时，TSN 对每个视频均匀采样 25 帧，每帧进行 10 次裁剪（4 角 + 1 中心 × 2 翻转），最终对所有采样帧的预测取平均作为视频级预测。多模态融合采用加权平均：RGB : Flow : Warped Flow = 1 : 1.5 : 1.5。</p>\n<p><strong>与传统方法的对比</strong></p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>方法</th>\n<th>时序建模范围</th>\n<th>计算开销</th>\n<th>UCF101</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>Two-Stream</td>\n<td>单帧/10帧</td>\n<td>低</td>\n<td>88.0%</td>\n</tr>\n<tr>\n<td>C3D</td>\n<td>16帧</td>\n<td>高</td>\n<td>85.2%</td>\n</tr>\n<tr>\n<td>LRCN</td>\n<td>全视频(RNN)</td>\n<td>高</td>\n<td>82.9%</td>\n</tr>\n<tr>\n<td><strong>TSN</strong></td>\n<td><strong>全视频(稀疏)</strong></td>\n<td><strong>低</strong></td>\n<td><strong>94.2%</strong></td>\n</tr>\n</tbody>\n</table></div>\n<div class=\"warn-box\">⚠️ 注意：TSN 的核心优势在于以极低的额外计算成本（仅 K=3 个片段）实现了全视频时序建模，避免了 RNN/3D 卷积等方法的高计算代价。</div>",
      "quiz": {
        "q": "TSN 中段共识函数（Segment Consensus）的主要作用是什么？",
        "options": [
          "对视频帧进行时序卷积以提取运动特征",
          "聚合各时间段的片段级预测，生成视频级表示",
          "计算相邻帧之间的光流场",
          "对不同模态的特征进行通道拼接"
        ],
        "answer": 1,
        "explain": "段共识函数 G 将 K 个时间段各自的 ConvNet 输出聚合为统一的视频级预测，是 TSN 实现长程时序建模的核心机制。"
      }
    },
    {
      "id": "i3d",
      "num": 6,
      "name": "I3D",
      "fullName": "膨胀3D网络 (Inflated 3D ConvNet)",
      "year": "2017",
      "org": "DeepMind",
      "parent": "c3d",
      "paperUrl": "https://arxiv.org/abs/1705.07750",
      "projectUrl": "",
      "category": "cnn_rnn",
      "motivation": "2D权重膨胀至3D+Kinetics预训练",
      "summary": "I3D 提出将成熟的 2D 图像分类网络（Inception-V1）的卷积核和池化核沿时间维度膨胀为 3D，通过 \"boring-video fixed point\" 策略继承 ImageNet 预训练权重，并结合大规模 Kinetics 数据集预训练，在 UCF-101 和 HMDB-51 上取得了当时最优的动作识别性能。",
      "keyPoints": [
        "<strong>膨胀策略（Inflation）</strong>：将 2D 卷积核 <span class=\"kb-math kb-math-inline\">N \\times N</span> 扩展为 3D 卷积核 <span class=\"kb-math kb-math-inline\">N \\times N \\times N</span>，使网络能够学习时空特征",
        "<strong>Boring-Video Fixed Point 初始化</strong>：将 2D 预训练权重沿时间维度重复 N 次后除以 N，保证对静态视频的输出与原 2D 网络一致",
        "<strong>时间感受野节奏控制（Receptive Field Pacing）</strong>：前两个 max-pooling 不做时间池化（<span class=\"kb-math kb-math-inline\">1 \\times 3 \\times 3</span>），后续使用对称核，平衡时空感受野增长",
        "<strong>双流架构（Two-Stream I3D）</strong>：RGB 流 + 光流流分别训练，预测时取平均，互补外观和运动信息",
        "<strong>Kinetics 数据集</strong>：400 类人体动作，约 240k 训练视频，为视频理解提供类似 ImageNet 的大规模预训练基础",
        "<strong>迁移学习验证</strong>：Kinetics 预训练后在 UCF-101 达 98.0%、HMDB-51 达 80.9%，大幅超越此前方法"
      ],
      "detail": "<h5>核心架构图</h5>\n<p><img alt=\"I3D 架构对比图\" src=\"https://ar5iv.labs.arxiv.org/html/1705.07750/assets/figs/architecture-finalversion.png\" />\n<em>图：论文中对比的五种视频架构。从左到右：(a) 2D ConvNet + LSTM，(b) 3D ConvNet (C3D)，(c) Two-Stream 2D ConvNet，(d) 3D-Fused Two-Stream，(e) Two-Stream I3D（本文提出）。K 为总帧数，N 为单次输入帧数。</em></p>\n<p><img alt=\"Inflated Inception-V1 网络结构\" src=\"https://ar5iv.labs.arxiv.org/html/1705.07750/assets/figs/inflated_net.png\" />\n<em>图：Inflated Inception-V1 的整体网络结构（左）及其 Inception 子模块细节（右）。所有 2D 卷积和池化操作均被膨胀为对应的 3D 版本。</em></p>\n<h5>算法伪代码</h5>\n<pre><code class=\"language-python\"># I3D 膨胀与初始化伪代码\ndef inflate_conv2d_to_3d(conv2d_weight, temporal_kernel_size=N):\n    &quot;&quot;&quot;\n    将 2D 卷积权重 [C_out, C_in, H, W] 膨胀为 3D [C_out, C_in, T, H, W]\n    使用 boring-video fixed point 策略\n    &quot;&quot;&quot;\n    # 沿时间维度重复 N 次\n    weight_3d = conv2d_weight.unsqueeze(2).repeat(1, 1, N, 1, 1)\n    # 除以 N 保证对静态输入的响应不变\n    weight_3d = weight_3d / N\n    return weight_3d\n\n# Two-Stream I3D 推理\ndef two_stream_i3d_predict(video_frames, optical_flow):\n    rgb_logits = i3d_rgb(video_frames)        # [B, 400]\n    flow_logits = i3d_flow(optical_flow)      # [B, 400]\n    final_prediction = (rgb_logits + flow_logits) / 2\n    return final_prediction\n</code></pre>\n<h5>动机与背景</h5>\n<p>视频动作识别的核心挑战在于如何有效建模时空信息。在 I3D 之前，主流方法包括：</p>\n<ol>\n<li><strong>2D ConvNet + 时序聚合</strong>（如 LSTM、时间池化）：丢失了底层的时间结构信息</li>\n<li><strong>C3D（3D ConvNet）</strong>：使用 3D 卷积直接建模时空，但由于参数量大，只能在较小数据集上从头训练，且无法利用 ImageNet 预训练</li>\n<li><strong>Two-Stream 方法</strong>：分别处理 RGB 和光流，但仍使用 2D 卷积，无法在卷积层内捕获时间模式</li>\n</ol>\n<div class=\"key-point\">💡 关键：I3D 的核心洞察是——既然 2D 网络在 ImageNet 上已经学到了强大的空间特征，为什么不直接将这些特征\"膨胀\"到时间维度，让网络在保留空间表征能力的同时获得时间建模能力？</div>\n<h5>核心机制：膨胀（Inflation）</h5>\n<p><strong>2D → 3D 膨胀</strong>：对于一个预训练的 2D 卷积核 <span class=\"kb-math kb-math-inline\">W \\in \\mathbb{R}^{C_{out} \\times C_{in} \\times d \\times d}</span>，膨胀为 3D 核：</p>\n<div class=\"kb-math kb-math-display\">W_{3D} = \\frac{1}{t} \\cdot \\text{repeat}(W, t) \\in \\mathbb{R}^{C_{out} \\times C_{in} \\times t \\times d \\times d}</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">t</span> 为时间维度的核大小。除以 <span class=\"kb-math kb-math-inline\">t</span> 的原因是保证 <strong>boring-video fixed point</strong> 性质：当输入为静态视频（每帧相同）时，3D 网络对每帧的输出与原始 2D 网络完全一致。</p>\n<p><strong>数学证明</strong>：设输入为静态视频 <span class=\"kb-math kb-math-inline\">x_1 = x_2 = \\cdots = x_t = x</span>，则 3D 卷积在时间维度的求和为：</p>\n<div class=\"kb-math kb-math-display\">\\sum_{i=1}^{t} \\frac{W}{t} * x = W * x</div>\n<p>这恰好等于原始 2D 卷积的输出，因此膨胀后的网络可以无损地继承 2D 预训练权重作为起点。</p>\n<h5>时间感受野节奏控制</h5>\n<p>并非所有层都使用对称的 3D 核。作者发现：</p>\n<ul>\n<li><strong>前两个 max-pooling 层</strong>：使用 <span class=\"kb-math kb-math-inline\">1 \\times 3 \\times 3</span> 核（不做时间池化），避免过早压缩时间信息</li>\n<li><strong>后续池化层</strong>：使用 <span class=\"kb-math kb-math-inline\">2 \\times 3 \\times 3</span> 核，逐步增大时间感受野</li>\n<li><strong>所有卷积层</strong>：使用 <span class=\"kb-math kb-math-inline\">3 \\times 3 \\times 3</span> 或 <span class=\"kb-math kb-math-inline\">1 \\times 1 \\times 1</span> 核</li>\n</ul>\n<div class=\"warn-box\">⚠️ 注意：这种非对称设计是关键的工程决策。如果在早期就做时间池化，会导致时间分辨率过快下降，丢失细粒度的运动信息。</div>\n<h5>训练流程</h5>\n<ol>\n<li><strong>ImageNet 预训练</strong>：使用 Inception-V1 在 ImageNet 上训练 2D 模型</li>\n<li><strong>膨胀初始化</strong>：将所有 2D 权重按 boring-video fixed point 策略膨胀为 3D</li>\n<li><strong>Kinetics 预训练</strong>：在 Kinetics-400 上端到端训练 I3D，输入为 64 帧 RGB（或光流），分辨率 224×224</li>\n<li><strong>下游微调</strong>：在目标数据集（UCF-101/HMDB-51）上微调，替换最后的分类层</li>\n</ol>\n<p>训练细节：\n- 输入：64 帧 @ 25fps（约 2.56 秒时间跨度）\n- 优化器：SGD + momentum 0.9\n- 数据增强：随机裁剪 224×224、随机左右翻转\n- 测试时：对整个视频均匀采样多个 clip，取平均预测</p>\n<h5>与传统方法的对比</h5>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>方法</th>\n<th>时间建模</th>\n<th>预训练利用</th>\n<th>UCF-101</th>\n<th>HMDB-51</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>Two-Stream (2014)</td>\n<td>光流</td>\n<td>ImageNet 2D</td>\n<td>88.0%</td>\n<td>59.4%</td>\n</tr>\n<tr>\n<td>C3D (2015)</td>\n<td>3D 卷积</td>\n<td>Sports-1M</td>\n<td>82.3%</td>\n<td>51.6%</td>\n</tr>\n<tr>\n<td>TSN (2016)</td>\n<td>段级采样</td>\n<td>ImageNet 2D</td>\n<td>94.2%</td>\n<td>69.4%</td>\n</tr>\n<tr>\n<td><strong>I3D (Two-Stream)</strong></td>\n<td><strong>3D 卷积 + 光流</strong></td>\n<td><strong>ImageNet → Kinetics</strong></td>\n<td><strong>98.0%</strong></td>\n<td><strong>80.9%</strong></td>\n</tr>\n</tbody>\n</table></div>\n<p>I3D 的优势在于：\n1. <strong>兼得 2D 预训练与 3D 时空建模</strong>：通过膨胀策略，不需要从头训练 3D 网络\n2. <strong>大规模视频预训练</strong>：Kinetics 提供了足够的视频数据来微调 3D 参数\n3. <strong>端到端时空学习</strong>：不同于后期融合方法，I3D 在每一层都同时处理时空信息</p>",
      "quiz": {
        "q": "I3D 中 boring-video fixed point 策略的核心操作是什么？",
        "options": [
          "将 2D 权重沿通道维度复制并求平均",
          "将 2D 权重沿时间维度重复 N 次后除以 N",
          "随机初始化时间维度的卷积核权重",
          "使用时间维度的均值池化替代卷积"
        ],
        "answer": 1,
        "explain": "Boring-video fixed point 将 2D 卷积核沿时间维度重复 N 次后除以 N，确保对静态视频（每帧相同）的响应与原始 2D 网络一致，从而无损继承预训练权重。"
      }
    },
    {
      "id": "non_local",
      "num": 7,
      "name": "Non-local",
      "fullName": "非局部神经网络 (Non-local Neural Networks)",
      "year": "2018",
      "org": "FAIR",
      "parent": "i3d",
      "paperUrl": "https://arxiv.org/abs/1711.07971",
      "projectUrl": "",
      "category": "transformer",
      "motivation": "自注意力捕捉长程时空依赖",
      "summary": "提出了非局部（Non-local）操作作为通用神经网络构建模块，通过计算所有位置间的加权响应直接捕获长程依赖关系，在视频分类、目标检测与分割、姿态估计等任务上均取得显著提升。",
      "keyPoints": [
        "提出通用的非局部操作公式：<span class=\"kb-math kb-math-inline\">y_i = \\frac{1}{\\mathcal{C}(x)} \\sum_{\\forall j} f(x_i, x_j) \\cdot g(x_j)</span>，一次操作即可聚合全局信息",
        "4 种成对函数实例化：Gaussian、Embedded Gaussian（等价于 self-attention）、Dot-product、Concatenation，实验证明效果相近",
        "设计可即插即用的 Non-local Block：包含残差连接 <span class=\"kb-math kb-math-inline\">z_i = W_z y_i + x_i</span>，可嵌入任意已有架构的任意位置",
        "效率优化：通道瓶颈（bottleneck）减半通道数 + 子采样（subsampling）将计算量降至约 1/4",
        "视频分类 Kinetics：NL I3D ResNet-101 达到 77.7% top-1（128帧），超越当时所有 RGB 方法",
        "视频分类 Charades：NL I3D 达到 39.5% mAP，超越 2017 竞赛冠军",
        "静态图像 COCO：仅加 1 个 NL block，目标检测 AP 提升 ~1 点，关键点检测 AP 提升 1.4 点",
        "证明非局部建模与 3D 卷积互补：NL + I3D 优于单独使用任一方法"
      ],
      "detail": "<p><img alt=\"Non-local Block 结构示意图\" src=\"https://ar5iv.labs.arxiv.org/html/1711.07971/assets/x2.png\" />\n<em>图：Non-local Block 的计算图。输入 x 经过 θ、φ、g 三个变换后计算成对关系，输出经 W_z 投影后与输入残差相加。</em></p>\n<pre><code class=\"language-python\"># Non-local Block 伪代码 (Embedded Gaussian 版本)\ndef non_local_block(x):\n    &quot;&quot;&quot;\n    x: 输入特征 [B, C, T, H, W] (视频) 或 [B, C, H, W] (图像)\n    &quot;&quot;&quot;\n    batch, C, *spatial = x.shape\n\n    # 1x1x1 卷积降维 (bottleneck, C -&gt; C//2)\n    theta = W_theta(x)  # [B, C//2, T*H*W]  query\n    phi = W_phi(x)      # [B, C//2, T*H*W]  key\n    g = W_g(x)          # [B, C//2, T*H*W]  value\n\n    # 可选: 对 phi 和 g 进行子采样 (max pooling) 减少计算\n    phi = max_pool(phi)  # [B, C//2, T*H*W / 4]\n    g = max_pool(g)      # [B, C//2, T*H*W / 4]\n\n    # 计算成对关系矩阵 (Embedded Gaussian)\n    attn = softmax(theta^T @ phi)  # [B, T*H*W, T*H*W/4]\n\n    # 加权聚合\n    y = attn @ g^T  # [B, T*H*W, C//2]\n\n    # 1x1x1 卷积恢复维度 + 残差连接\n    y = W_z(y)  # [B, C, T, H, W], W_z 的 BN 初始化为 0\n    return y + x  # 残差连接，初始时 block 为恒等映射\n</code></pre>\n<h5>动机与背景</h5>\n<p>传统深度网络依赖卷积和循环操作逐层堆叠来扩大感受野，存在以下根本局限：</p>\n<ol>\n<li><strong>局部性</strong>：卷积核仅覆盖局部邻域（如 3×3 或 3×3×3），捕获远程依赖需要堆叠大量层，信号在多层传播中逐渐衰减</li>\n<li><strong>序列瓶颈</strong>：RNN/LSTM 按时间步顺序处理，难以直接建模相距较远的帧间关系，且梯度传播路径长</li>\n<li><strong>计算效率</strong>：大卷积核（如全局卷积）虽然理论上可覆盖全局，但参数量和计算量不可接受</li>\n</ol>\n<p>受经典计算机视觉中非局部均值（Non-local Means）去噪算法的启发，作者提出将\"非局部操作\"引入深度网络——让每个位置直接与所有其他位置交互，一步到位地捕获全局依赖。</p>\n<h5>核心机制：非局部操作</h5>\n<p><strong>通用公式定义</strong>：</p>\n<div class=\"kb-math kb-math-display\">y_i = \\frac{1}{\\mathcal{C}(x)} \\sum_{\\forall j} f(x_i, x_j) \\cdot g(x_j)</div>\n<p>其中：\n- <span class=\"kb-math kb-math-inline\">i</span> 是输出位置（时空中的某一点），<span class=\"kb-math kb-math-inline\">j</span> 枚举所有可能位置\n- <span class=\"kb-math kb-math-inline\">f(x_i, x_j)</span> 是成对函数，计算位置 <span class=\"kb-math kb-math-inline\">i</span> 和 <span class=\"kb-math kb-math-inline\">j</span> 之间的关系/相似度\n- <span class=\"kb-math kb-math-inline\">g(x_j) = W_g x_j</span> 是对位置 <span class=\"kb-math kb-math-inline\">j</span> 特征的线性变换\n- <span class=\"kb-math kb-math-inline\">\\mathcal{C}(x)</span> 是归一化因子</p>\n<div class=\"key-point\">💡 关键直觉：非局部操作本质上是一种\"软注意力\"——对所有位置的特征做加权平均，权重由位置间的相似度决定。这使得网络可以在单层内直接\"看到\"并利用远处的信息。</div>\n<p><strong>四种成对函数 <span class=\"kb-math kb-math-inline\">f</span> 的实例化</strong>：</p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>变体</th>\n<th>公式</th>\n<th>归一化 <span class=\"kb-math kb-math-inline\">\\mathcal{C}(x)</span></th>\n<th>特点</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>Gaussian</td>\n<td><span class=\"kb-math kb-math-inline\">f = e^{x_i^T x_j}</span></td>\n<td><span class=\"kb-math kb-math-inline\">\\sum_j f(x_i, x_j)</span></td>\n<td>原始空间计算相似度</td>\n</tr>\n<tr>\n<td>Embedded Gaussian</td>\n<td><span class=\"kb-math kb-math-inline\">f = e^{\\theta(x_i)^T \\phi(x_j)}</span></td>\n<td><span class=\"kb-math kb-math-inline\">\\sum_j f(x_i, x_j)</span></td>\n<td><strong>等价于 self-attention</strong></td>\n</tr>\n<tr>\n<td>Dot-product</td>\n<td><span class=\"kb-math kb-math-inline\">f = \\theta(x_i)^T \\phi(x_j)</span></td>\n<td><span class=\"kb-math kb-math-inline\">N</span>（位置总数）</td>\n<td>无 softmax，更简洁</td>\n</tr>\n<tr>\n<td>Concatenation</td>\n<td><span class=\"kb-math kb-math-inline\">f = \\text{ReLU}(w_f^T [\\theta(x_i), \\phi(x_j)])</span></td>\n<td><span class=\"kb-math kb-math-inline\">N</span></td>\n<td>非对称关系建模</td>\n</tr>\n</tbody>\n</table></div>\n<p>其中 <span class=\"kb-math kb-math-inline\">\\theta(x_i) = W_\\theta x_i</span>，<span class=\"kb-math kb-math-inline\">\\phi(x_j) = W_\\phi x_j</span> 为嵌入变换。</p>\n<div class=\"warn-box\">⚠️ 重要发现：实验表明四种变体效果相近（Kinetics 上差异 &lt; 0.5%），说明<strong>非局部行为本身</strong>（而非特定的注意力归一化方式）才是性能提升的关键。</div>\n<h5>Non-local Block 的工程设计</h5>\n<p>为了将非局部操作无缝嵌入现有网络，作者设计了 Non-local Block：</p>\n<div class=\"kb-math kb-math-display\">z_i = W_z y_i + x_i</div>\n<p>关键设计选择：</p>\n<ol>\n<li><strong>残差连接</strong>：输出 = 非局部响应 + 原始输入。<span class=\"kb-math kb-math-inline\">W_z</span> 的 BatchNorm 层初始化为零，使得初始时整个 block 等价于恒等映射，不破坏预训练权重</li>\n<li><strong>瓶颈结构</strong>：<span class=\"kb-math kb-math-inline\">W_\\theta, W_\\phi, W_g</span> 将通道数从 <span class=\"kb-math kb-math-inline\">C</span> 降至 <span class=\"kb-math kb-math-inline\">C/2</span>，<span class=\"kb-math kb-math-inline\">W_z</span> 再恢复为 <span class=\"kb-math kb-math-inline\">C</span>，计算量减半</li>\n<li><strong>子采样技巧</strong>：对 <span class=\"kb-math kb-math-inline\">\\phi</span> 和 <span class=\"kb-math kb-math-inline\">g</span> 的空间维度做 max pooling（步长为2），将注意力矩阵大小缩减为 1/4，不影响性能</li>\n</ol>\n<h5>时空域中的非局部操作</h5>\n<p>在视频理解中，非局部操作可以在不同维度上应用：\n- <strong>时空联合</strong>（spacetime）：<span class=\"kb-math kb-math-inline\">j</span> 遍历所有帧的所有空间位置 → 效果最优\n- <strong>仅空间</strong>（space-only）：<span class=\"kb-math kb-math-inline\">j</span> 仅遍历当前帧内的空间位置\n- <strong>仅时间</strong>（time-only）：<span class=\"kb-math kb-math-inline\">j</span> 仅遍历同一空间位置在不同帧的特征</p>\n<p>实验证明时空联合版本最优（73.8% vs 72.9%/73.1%），因为它能同时捕获空间中的物体关系和时间中的运动模式。</p>\n<h5>与 Self-Attention 的关系</h5>\n<p>作者明确指出 Embedded Gaussian 版本的非局部操作<strong>数学上等价于 Transformer 中的 self-attention</strong>：</p>\n<div class=\"kb-math kb-math-display\">y = \\text{softmax}(x^T W_\\theta^T W_\\phi x) \\cdot g(x)</div>\n<p>但本文的贡献在于：\n1. 将 self-attention 从 NLP 序列推广到<strong>时空视觉特征</strong>\n2. 证明 softmax 归一化并非必要（dot-product 版本同样有效）\n3. 提出了实用的 block 设计使其可嵌入任意 CNN 架构</p>\n<h5>实验结果</h5>\n<p><strong>Kinetics 视频分类</strong>：</p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>模型</th>\n<th>Backbone</th>\n<th>帧数</th>\n<th>Top-1 (%)</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>C2D baseline</td>\n<td>R-50</td>\n<td>32</td>\n<td>71.8</td>\n</tr>\n<tr>\n<td>NL C2D (5 blocks)</td>\n<td>R-50</td>\n<td>32</td>\n<td>73.8</td>\n</tr>\n<tr>\n<td>NL C2D (5 blocks)</td>\n<td>R-101</td>\n<td>32</td>\n<td>75.1</td>\n</tr>\n<tr>\n<td>I3D</td>\n<td>R-50</td>\n<td>32</td>\n<td>73.3</td>\n</tr>\n<tr>\n<td>NL I3D (5 blocks)</td>\n<td>R-50</td>\n<td>32</td>\n<td>74.9</td>\n</tr>\n<tr>\n<td>NL I3D (5 blocks)</td>\n<td>R-101</td>\n<td>128</td>\n<td><strong>77.7</strong></td>\n</tr>\n</tbody>\n</table></div>\n<p><strong>COCO 目标检测/分割</strong>（Mask R-CNN + 1 NL block）：</p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>Backbone</th>\n<th>AP^box (baseline → +NL)</th>\n<th>AP^mask (baseline → +NL)</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>R-50</td>\n<td>38.0 → 39.0 (+1.0)</td>\n<td>34.6 → 35.5 (+0.9)</td>\n</tr>\n<tr>\n<td>R-101</td>\n<td>39.5 → 40.8 (+1.3)</td>\n<td>36.0 → 37.1 (+1.1)</td>\n</tr>\n<tr>\n<td>X-152</td>\n<td>44.1 → 45.0 (+0.9)</td>\n<td>39.7 → 40.3 (+0.6)</td>\n</tr>\n</tbody>\n</table></div>\n<p><strong>COCO 关键点检测</strong>：R-101 baseline 65.1 AP → +4 NL in head + 1 NL in backbone = 66.5 AP (+1.4)</p>\n<div class=\"key-point\">💡 关键洞察：即使在极深的 X-152 上，1 个 NL block 仍能带来提升，说明<strong>非局部依赖未被现有模型充分捕获</strong>，无论深度/容量如何增加。</div>",
      "quiz": {
        "q": "Non-local Neural Networks 中，Embedded Gaussian 版本的非局部操作与以下哪个机制数学上等价？",
        "options": [
          "LSTM 中的门控机制",
          "Transformer 中的 self-attention",
          "ResNet 中的跳跃连接",
          "GAN 中的判别器"
        ],
        "answer": 1,
        "explain": "Embedded Gaussian 使用 softmax(θ(x_i)^T φ(x_j)) 作为权重对 g(x_j) 加权求和，这与 Transformer self-attention 的 Query-Key-Value 机制在数学形式上完全一致。"
      }
    },
    {
      "id": "r2plus1d",
      "num": 8,
      "name": "R(2+1)D",
      "fullName": "分解3D卷积 (Factorized 3D Convolutions)",
      "year": "2018",
      "org": "Facebook",
      "parent": "c3d",
      "paperUrl": "https://arxiv.org/abs/1711.11248",
      "projectUrl": "",
      "category": "cnn_rnn",
      "motivation": "将3D卷积分解为2D空间+1D时间",
      "summary": "R(2+1)D 将 3D 卷积核分解为 2D 空间卷积和 1D 时间卷积的级联，在保持参数量不变的前提下，通过增加非线性变换的数量和简化优化过程，显著提升了视频动作识别的性能。",
      "keyPoints": [
        "系统性对比了 5 种时空卷积架构：R2D、MCx、rMCx、R3D、R(2+1)D",
        "核心创新：将 <span class=\"kb-math kb-math-inline\">t \\times d \\times d</span> 的 3D 卷积分解为 <span class=\"kb-math kb-math-inline\">1 \\times d \\times d</span> 的 2D 空间卷积 + <span class=\"kb-math kb-math-inline\">t \\times 1 \\times 1</span> 的 1D 时间卷积",
        "中间子空间维度 <span class=\"kb-math kb-math-inline\">M_i</span> 的计算公式保证分解后参数量与原始 3D 卷积一致",
        "双重优势：(1) 非线性数量翻倍（每次分解之间插入 ReLU）；(2) 优化更容易（训练损失更低）",
        "基于 ResNet-18/34 架构，在 clip 级别和 video 级别均达到 SOTA",
        "在 Kinetics、Sports-1M、UCF101、HMDB51 四个基准上验证有效性",
        "仅用 RGB 输入（无光流）即可达到甚至超过双流方法的性能"
      ],
      "detail": "<h5>示意图</h5>\n<p><img alt=\"R(2+1)D 时空卷积分解示意图\" src=\"https://ar5iv.labs.arxiv.org/html/1711.11248v3/assets/x1.png\" />\n<em>图：(a) 全 3D 卷积 vs (b) (2+1)D 分解卷积。3D 卷积核 <span class=\"kb-math kb-math-inline\">t \\times d \\times d</span> 被分解为空间 2D 卷积 <span class=\"kb-math kb-math-inline\">1 \\times d \\times d</span> 和时间 1D 卷积 <span class=\"kb-math kb-math-inline\">t \\times 1 \\times 1</span>，中间通过 ReLU 非线性连接。</em></p>\n<h5>算法伪代码</h5>\n<pre><code class=\"language-python\"># R(2+1)D 分解卷积块伪代码\ndef r2plus1d_block(x, N_in, N_out, t=3, d=3):\n    &quot;&quot;&quot;\n    x: 输入特征 [B, N_in, T, H, W]\n    N_in: 输入通道数\n    N_out: 输出通道数\n    t: 时间卷积核大小\n    d: 空间卷积核大小\n    &quot;&quot;&quot;\n    # 计算中间子空间维度 M_i，保证总参数量 ≈ 原始 3D 卷积\n    M_i = int(t * d * d * N_in * N_out / (d * d * N_in + t * N_out))\n\n    # 第一步：2D 空间卷积 (1 × d × d)\n    z = Conv3D(x, kernel=(1, d, d), in_ch=N_in, out_ch=M_i)\n    z = BatchNorm(z)\n    z = ReLU(z)  # 额外的非线性！\n\n    # 第二步：1D 时间卷积 (t × 1 × 1)\n    y = Conv3D(z, kernel=(t, 1, 1), in_ch=M_i, out_ch=N_out)\n    y = BatchNorm(y)\n    y = ReLU(y)\n\n    return y\n</code></pre>\n<h5>动机与背景</h5>\n<p>视频理解的核心挑战在于如何有效建模时空信息。早期方法如 C3D 和 I3D 直接使用 3D 卷积处理视频，但 3D 卷积存在两个关键问题：</p>\n<ol>\n<li><strong>参数量大、优化困难</strong>：3D 卷积核的参数空间比 2D 卷积大一个数量级，导致训练过程中更容易陷入局部最优。</li>\n<li><strong>时空耦合</strong>：3D 卷积同时学习空间和时间特征，但空间外观和时间运动本质上是两种不同性质的信息，强制耦合可能限制模型的表达能力。</li>\n</ol>\n<p>在此之前，已有一些工作尝试分解时空建模（如 P3D、S3D），但缺乏系统性的对比研究。本文的核心贡献在于：<strong>系统性地比较了多种时空卷积设计方案，并证明 (2+1)D 分解是最优选择。</strong></p>\n<h5>核心机制：(2+1)D 分解</h5>\n<p><strong>五种架构对比</strong></p>\n<p>论文系统研究了以下五种基于 ResNet 的时空卷积架构：</p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>架构</th>\n<th>描述</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td><strong>R2D</strong></td>\n<td>仅使用 2D 卷积，将视频帧拼接为多通道输入</td>\n</tr>\n<tr>\n<td><strong>MCx</strong></td>\n<td>前 x 层使用 3D 卷积（底层），其余使用 2D 卷积（高层）</td>\n</tr>\n<tr>\n<td><strong>rMCx</strong></td>\n<td>前 x 层使用 2D 卷积（底层），其余使用 3D 卷积（高层）</td>\n</tr>\n<tr>\n<td><strong>R3D</strong></td>\n<td>全部使用 3D 卷积</td>\n</tr>\n<tr>\n<td><strong>R(2+1)D</strong></td>\n<td>全部使用 (2+1)D 分解卷积</td>\n</tr>\n</tbody>\n</table></div>\n<div class=\"key-point\">💡 <strong>关键发现</strong>：MC 和 rMC 实验表明，3D 卷积放在高层（rMCx）比放在底层（MCx）效果更好，说明时间建模在高层语义空间中更有效。但 R(2+1)D 在所有层都使用分解卷积，效果最优。</div>\n<p><strong>中间维度 <span class=\"kb-math kb-math-inline\">M_i</span> 的设计</strong></p>\n<p>将 <span class=\"kb-math kb-math-inline\">N_{i-1}</span> 个输入通道的 <span class=\"kb-math kb-math-inline\">t \\times d \\times d</span> 3D 卷积分解为两步时，引入中间子空间维度 <span class=\"kb-math kb-math-inline\">M_i</span>：</p>\n<div class=\"kb-math kb-math-display\">M_i = \\left\\lfloor \\frac{t d^2 N_{i-1} N_i}{d^2 N_{i-1} + t N_i} \\right\\rfloor</div>\n<p>这个公式的推导逻辑是：</p>\n<ul>\n<li>原始 3D 卷积的参数量为 <span class=\"kb-math kb-math-inline\">t \\times d^2 \\times N_{i-1} \\times N_i</span></li>\n<li>分解后：2D 空间卷积参数量 <span class=\"kb-math kb-math-inline\">d^2 \\times N_{i-1} \\times M_i</span> + 1D 时间卷积参数量 <span class=\"kb-math kb-math-inline\">t \\times M_i \\times N_i</span></li>\n<li>令两者相等：<span class=\"kb-math kb-math-inline\">d^2 N_{i-1} M_i + t M_i N_i = t d^2 N_{i-1} N_i</span></li>\n<li>解出 <span class=\"kb-math kb-math-inline\">M_i</span></li>\n</ul>\n<div class=\"warn-box\">⚠️ 注意：<span class=\"kb-math kb-math-inline\">M_i</span> 的设计确保了 R(2+1)D 与 R3D 具有<strong>完全相同的参数量</strong>，因此性能提升完全来自架构设计而非参数增加。</div>\n<p><strong>为什么 (2+1)D 分解更优？</strong></p>\n<p>论文给出了两个核心原因：</p>\n<p><strong>1. 非线性数量翻倍</strong></p>\n<p>在每个残差块中，原始 3D 卷积后只有一个 ReLU 非线性。而 (2+1)D 分解在 2D 空间卷积和 1D 时间卷积之间额外插入了一个 ReLU，使得非线性变换的数量翻倍。更多的非线性意味着模型可以表示更复杂的函数空间。</p>\n<p><strong>2. 优化更容易</strong></p>\n<p>论文通过实验发现，R(2+1)D 在训练集上的损失比 R3D 更低（图 3），这表明分解后的优化景观（optimization landscape）更加平滑。直觉上，将复杂的 3D 时空滤波器分解为两个更简单的操作，降低了学习难度。</p>\n<h5>训练与推理流程</h5>\n<p><strong>训练设置</strong>：\n- 输入：从视频中采样 L 帧（L=8 或 32），空间裁剪为 <span class=\"kb-math kb-math-inline\">112 \\times 112</span>\n- 数据增强：随机裁剪、水平翻转\n- 优化器：SGD，初始学习率 0.01，在验证损失饱和时降低 10 倍\n- 预训练：先在 Sports-1M 上预训练，再在 Kinetics 上微调</p>\n<p><strong>推理方式</strong>：\n- <strong>Clip 级别</strong>：对单个 clip 进行中心裁剪预测\n- <strong>Video 级别</strong>：从视频中均匀采样 10 个 clip，取预测平均值</p>\n<p><strong>关键实验结果</strong>：</p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>方法</th>\n<th>Clip@1 (Kinetics)</th>\n<th>Video@1 (Kinetics)</th>\n<th>UCF101</th>\n<th>HMDB51</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>R3D-34</td>\n<td>63.0%</td>\n<td>—</td>\n<td>—</td>\n<td>—</td>\n</tr>\n<tr>\n<td>R(2+1)D-34</td>\n<td><strong>65.6%</strong></td>\n<td><strong>74.3%</strong></td>\n<td><strong>96.8%</strong></td>\n<td><strong>74.5%</strong></td>\n</tr>\n<tr>\n<td>I3D (RGB)</td>\n<td>—</td>\n<td>71.1%</td>\n<td>95.6%</td>\n<td>74.8%</td>\n</tr>\n<tr>\n<td>I3D (RGB+Flow)</td>\n<td>—</td>\n<td>74.2%</td>\n<td>98.0%</td>\n<td>80.7%</td>\n</tr>\n</tbody>\n</table></div>\n<div class=\"key-point\">💡 <strong>关键</strong>：R(2+1)D 仅使用 RGB 输入，在 Kinetics 上的 video 级别准确率（74.3%）就超过了使用 RGB+光流双流的 I3D（74.2%），证明了分解卷积的强大建模能力。</div>\n<h5>与传统方法的区别</h5>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>对比维度</th>\n<th>C3D / I3D (R3D)</th>\n<th>R(2+1)D</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>卷积类型</td>\n<td>完整 3D 卷积</td>\n<td>2D 空间 + 1D 时间分解</td>\n</tr>\n<tr>\n<td>非线性数量</td>\n<td>每个卷积后 1 个 ReLU</td>\n<td>每个分解块中 2 个 ReLU</td>\n</tr>\n<tr>\n<td>参数量</td>\n<td>基准</td>\n<td>与 R3D 相同</td>\n</tr>\n<tr>\n<td>优化难度</td>\n<td>较高（训练损失较高）</td>\n<td>较低（训练损失更低）</td>\n</tr>\n<tr>\n<td>时空建模</td>\n<td>耦合学习</td>\n<td>解耦学习，先空间后时间</td>\n</tr>\n<tr>\n<td>预训练利用</td>\n<td>需要 inflate 2D 权重</td>\n<td>2D 部分可直接加载 ImageNet 权重</td>\n</tr>\n</tbody>\n</table></div>\n<p>与 P3D、S3D 等同期工作相比，R(2+1)D 的独特之处在于：(1) 提供了系统性的架构对比实验；(2) 通过 <span class=\"kb-math kb-math-inline\">M_i</span> 公式严格控制参数量一致；(3) 从理论（非线性增加）和实验（优化景观更平滑）两个角度解释了分解的优势。</p>",
      "quiz": {
        "q": "R(2+1)D 相比 R3D 性能更优的核心原因是什么？",
        "options": [
          "R(2+1)D 使用了更多的参数",
          "R(2+1)D 引入了注意力机制",
          "分解增加了非线性数量并使优化更容易",
          "R(2+1)D 使用了光流作为额外输入"
        ],
        "answer": 2,
        "explain": "R(2+1)D 与 R3D 参数量相同，其优势来自两方面：(1) 2D 和 1D 卷积之间额外插入 ReLU 使非线性翻倍；(2) 将复杂的 3D 滤波器分解为两个简单操作使优化景观更平滑。"
      }
    },
    {
      "id": "tsm",
      "num": 9,
      "name": "TSM",
      "fullName": "时序移位模块 (Temporal Shift Module)",
      "year": "2019",
      "org": "MIT",
      "parent": "tsn",
      "paperUrl": "https://arxiv.org/abs/1811.08383",
      "projectUrl": "",
      "category": "cnn_rnn",
      "motivation": "零计算代价的通道时序移位",
      "summary": "TSM 提出了一种零额外计算量、零额外参数的**时序移位模块**，通过沿时间维度移动部分通道的特征图来实现帧间信息交换，使 2D CNN 获得与 3D CNN 相当的时序建模能力，同时保持 2D CNN 的推理效率。",
      "keyPoints": [
        "<strong>核心操作</strong>：将特征图中 1/4 的通道沿时间维度分别前移和后移一帧（各 1/8），实现相邻帧间信息融合",
        "<strong>零计算代价</strong>：移位操作仅涉及数据搬运，不引入任何乘加运算和额外参数",
        "<strong>部分移位策略 (Partial Shift)</strong>：仅移位少量通道（1/4），将数据搬运开销控制在 3% 以内，避免全通道移位带来的 ~14% 延迟增加",
        "<strong>残差移位策略 (Residual Shift)</strong>：将 TSM 插入残差分支内部而非外部，通过恒等映射保留当前帧的完整空间信息，避免空间建模能力退化",
        "<strong>双向 TSM (Bi-directional)</strong>：离线场景下同时融合过去帧和未来帧，适用于高吞吐离线视频识别",
        "<strong>单向 TSM (Uni-directional)</strong>：在线场景下仅从过去帧向当前帧移位，支持实时低延迟在线视频识别",
        "<strong>多层级时序融合</strong>：TSM 可插入每个残差块，实现从低层到高层的全层级时序建模",
        "<strong>发表时在 Something-Something 排行榜排名第一</strong>；在 Jetson Nano 和 Galaxy Note8 上分别实现 13ms 和 35ms 的在线识别延迟"
      ],
      "detail": "<h5>核心示意图</h5>\n<p><img alt=\"TSM 时序移位示意图\" src=\"https://ar5iv.labs.arxiv.org/html/1811.08383/assets/x1.png\" />\n<em>图 1：TSM 的核心操作示意。(a) 原始张量无移位；(b) 离线双向移位——同时向前和向后移动部分通道；(c) 在线单向移位——仅将过去帧的特征移入当前帧。</em></p>\n<p><img alt=\"部分移位开销与残差移位性能对比\" src=\"https://ar5iv.labs.arxiv.org/html/1811.08383/assets/x2.png\" />\n<em>图 2：(a) 不同移位比例下的延迟开销——部分移位（1/8）可将开销控制在 3%；(b) 残差移位在所有比例下均优于原地移位，1/4 比例达到最优。</em></p>\n<p><img alt=\"原地 TSM 与残差 TSM 对比\" src=\"https://ar5iv.labs.arxiv.org/html/1811.08383/assets/x3.png\" />\n<em>图 3：(a) 原地 TSM 在卷积层之前移位，会丢失当前帧信息；(b) 残差 TSM 在残差分支内部移位，通过 shortcut 保留完整的当前帧特征。</em></p>\n<h5>算法伪代码</h5>\n<pre><code class=\"language-python\"># TSM 核心操作伪代码\n# 输入: x — 形状为 (N*T, C, H, W) 的特征张量\n# fold: 移位通道比例，默认 1/8（前移 1/8 + 后移 1/8 = 总共 1/4）\n\ndef temporal_shift(x, T, fold_div=8):\n    N_T, C, H, W = x.shape\n    x = x.view(N_T // T, T, C, H, W)  # (N, T, C, H, W)\n    fold = C // fold_div  # 每个方向移位的通道数\n\n    out = x.clone()\n    # 前移: 将 t+1 帧的前 fold 个通道移到 t 帧\n    out[:, :-1, :fold, :, :] = x[:, 1:, :fold, :, :]\n    # 后移: 将 t-1 帧的第 fold~2*fold 个通道移到 t 帧\n    out[:, 1:, fold:2*fold, :, :] = x[:, :-1, fold:2*fold, :, :]\n    # 剩余 C - 2*fold 个通道保持不变\n\n    return out.view(N_T, C, H, W)\n\n# 残差 TSM 的插入方式（在 ResNet 残差块中）:\n# class ResBlock(nn.Module):\n#     def forward(self, x):\n#         identity = x\n#         x = temporal_shift(x, T)  # 在残差分支内部移位\n#         x = self.conv1(x)\n#         x = self.conv2(x)\n#         return x + identity  # identity 保留完整当前帧信息\n</code></pre>\n<h5>动机与背景</h5>\n<p>视频理解的核心挑战在于<strong>时序建模</strong>——例如区分\"打开盒子\"和\"关闭盒子\"需要理解帧的时间顺序。传统方法面临效率与性能的两难：</p>\n<ul>\n<li><strong>2D CNN（如 TSN）</strong>：对每帧独立处理后平均融合，计算高效但完全忽略时序关系</li>\n<li><strong>3D CNN（如 I3D、C3D）</strong>：联合学习时空特征，性能好但计算量巨大（通常是 2D 的 3~5 倍），难以部署到边缘设备</li>\n<li><strong>混合方法（如 ECO、R(2+1)D）</strong>：部分层使用 3D 卷积，牺牲了低层或高层的时序建模</li>\n</ul>\n<p>TSM 的核心洞察是：<strong>卷积操作可以分解为\"移位\"和\"乘加累积\"两步</strong>。如果在时间维度上执行移位，再将乘加累积折叠到后续的 2D 卷积中，就能以零额外计算实现时序建模。</p>\n<h5>核心机制详解</h5>\n<p><strong>1. 移位即时序卷积</strong></p>\n<p>考虑一维卷积 <span class=\"kb-math kb-math-inline\">Y_i = w_1 X_{i-1} + w_2 X_i + w_3 X_{i+1}</span>，它可以分解为：</p>\n<ul>\n<li><strong>移位步骤</strong>：生成三个移位版本 <span class=\"kb-math kb-math-inline\">X^{-1}_i = X_{i-1}</span>，<span class=\"kb-math kb-math-inline\">X^{0}_i = X_i</span>，<span class=\"kb-math kb-math-inline\">X^{+1}_i = X_{i+1}</span></li>\n<li><strong>乘加步骤</strong>：<span class=\"kb-math kb-math-inline\">Y = w_1 X^{-1} + w_2 X^{0} + w_3 X^{+1}</span></li>\n</ul>\n<p>TSM 的关键在于：<strong>移位步骤在时间维度上完成（零计算），乘加步骤被后续的 2D 空间卷积自然吸收</strong>。这等价于在时间维度上执行了卷积核大小为 3 的时序卷积，但不需要任何额外的参数或计算。</p>\n<p><strong>2. 朴素移位的两大问题</strong></p>\n<p>直接将所有通道进行时序移位会导致：</p>\n<ul>\n<li><strong>效率问题</strong>：全通道移位的数据搬运开销在 CPU 上高达 13.7%，GPU 上 12.4%，对于 5D 视频张量（<span class=\"kb-math kb-math-inline\">N \\times C \\times T \\times H \\times W</span>）尤为严重</li>\n<li><strong>精度问题</strong>：被移位的通道丢失了当前帧的信息，严重损害 2D 骨干网络的空间建模能力，导致准确率下降 2.6%</li>\n</ul>\n<p><strong>3. 部分移位 (Partial Shift)</strong></p>\n<p>TSM 仅移位 <strong>1/4 的通道</strong>（1/8 前移 + 1/8 后移），其余 3/4 通道保持不变。实验表明：</p>\n<div class=\"kb-math kb-math-display\">\\text{延迟开销} = \\begin{cases} \\sim 3\\% &amp; \\text{移位 1/8 通道} \\\\ \\sim 6\\% &amp; \\text{移位 1/4 通道} \\\\ \\sim 14\\% &amp; \\text{移位全部通道} \\end{cases}</div>\n<p>1/4 的移位比例在时序建模能力和数据搬运开销之间取得最佳平衡。</p>\n<p><strong>4. 残差移位 (Residual Shift)</strong></p>\n<p>将 TSM 插入残差块的<strong>内部分支</strong>而非外部：</p>\n<div class=\"kb-math kb-math-display\">\\mathbf{y} = \\mathcal{F}(\\text{TSM}(\\mathbf{x})) + \\mathbf{x}</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">\\mathcal{F}</span> 是残差分支中的卷积操作，<span class=\"kb-math kb-math-inline\">\\mathbf{x}</span> 是输入。由于恒等映射 <span class=\"kb-math kb-math-inline\">\\mathbf{x}</span> 保留了当前帧的完整信息，即使移位了部分通道，空间特征学习能力也不会退化。实验证明，残差移位在所有移位比例下均优于原地移位（in-place shift）。</p>\n<div class=\"key-point\">💡 <strong>关键</strong>：残差移位是 TSM 成功的核心设计——它让时序融合\"免费搭车\"于残差学习框架，既不破坏空间特征，又实现了多层级时序建模。</div>\n<p><strong>5. 离线双向 TSM</strong></p>\n<p>在离线视频识别中，TSM 采用双向移位：</p>\n<ul>\n<li>从视频中均匀采样 <span class=\"kb-math kb-math-inline\">T</span> 帧（通常 8 或 16 帧）</li>\n<li>在每个残差块中，1/8 通道从未来帧移入、1/8 通道从过去帧移入</li>\n<li>所有帧堆叠为 batch 维度，共享同一个 2D CNN 骨干（如 ResNet-50）</li>\n<li>最终对所有帧的 logits 取平均得到预测</li>\n</ul>\n<p>这与 TSN 的流程完全一致，唯一区别是在每个残差块中插入了 TSM，因此参数量和计算量与 2D 基线完全相同。</p>\n<p><strong>6. 在线单向 TSM</strong></p>\n<p>在线场景中不能访问未来帧，TSM 改为单向移位：</p>\n<ul>\n<li>每帧到达时，缓存当前帧 1/8 通道的特征图</li>\n<li>下一帧处理时，用缓存的旧特征替换对应通道（7/8 当前 + 1/8 缓存）</li>\n<li>仅需 <strong>0.9MB</strong> 内存缓存（ResNet-50），实现逐帧实时预测</li>\n</ul>\n<div class=\"warn-box\">⚠️ <strong>注意</strong>：在线 TSM 的延迟几乎等于单帧 2D CNN 推理延迟，而非多帧累积，这是相比 ECO 等方法的关键优势。</div>\n<h5>与传统方法的对比</h5>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>方法</th>\n<th>时序建模</th>\n<th>额外计算</th>\n<th>额外参数</th>\n<th>部署友好</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>TSN (2D CNN)</td>\n<td>❌ 无</td>\n<td>0</td>\n<td>0</td>\n<td>✅</td>\n</tr>\n<tr>\n<td>I3D (3D CNN)</td>\n<td>✅ 强</td>\n<td>~3-5×</td>\n<td>~1.5×</td>\n<td>❌</td>\n</tr>\n<tr>\n<td>R(2+1)D (分解 3D)</td>\n<td>✅ 中</td>\n<td>~1.5×</td>\n<td>~1.2×</td>\n<td>⚠️</td>\n</tr>\n<tr>\n<td>ECO (混合)</td>\n<td>⚠️ 部分层</td>\n<td>~1.5×</td>\n<td>~1.2×</td>\n<td>⚠️</td>\n</tr>\n<tr>\n<td><strong>TSM (本文)</strong></td>\n<td><strong>✅ 全层级</strong></td>\n<td><strong>0</strong></td>\n<td><strong>0</strong></td>\n<td><strong>✅</strong></td>\n</tr>\n</tbody>\n</table></div>\n<p>TSM 的核心优势在于：它在<strong>不增加任何计算和参数</strong>的前提下，通过纯数据搬运操作实现了与 3D CNN 可比的时序建模能力，且完全兼容现有 2D CNN 骨干和预训练权重。</p>",
      "quiz": {
        "q": "TSM 将移位模块插入残差分支内部（而非外部）的主要目的是什么？",
        "options": [
          "减少模型的总参数量",
          "通过恒等映射保留当前帧的完整空间信息，避免空间建模能力退化",
          "加速移位操作的数据搬运效率",
          "使模型能够访问更多相邻帧的信息"
        ],
        "answer": 1,
        "explain": "残差移位通过 shortcut 连接保留了当前帧的完整特征，即使部分通道被移位到相邻帧，空间信息也不会丢失，从而避免了原地移位导致的精度下降。"
      }
    },
    {
      "id": "slowfast",
      "num": 10,
      "name": "SlowFast",
      "fullName": "双速网络 (SlowFast Networks)",
      "year": "2019",
      "org": "FAIR",
      "parent": "i3d",
      "paperUrl": "https://arxiv.org/abs/1812.03982",
      "projectUrl": "",
      "category": "cnn_rnn",
      "motivation": "双速采样捕捉外观与运动",
      "summary": "SlowFast 提出了一种双路径视频识别网络，其中 Slow 路径以低帧率捕捉空间语义信息，Fast 路径以高帧率（\\(\\alpha\\) 倍）但极轻量（\\(\\beta\\) 倍通道）的方式捕捉细粒度时序运动信息，两条路径通过横向连接融合，在无需光流或 ImageNet 预训练的情况下取得了视频识别的全面 SOTA。",
      "keyPoints": [
        "<strong>双路径架构</strong>：Slow pathway（低帧率、高通道容量）捕捉空间语义，Fast pathway（高帧率、低通道容量）捕捉时序运动",
        "<strong>关键超参数</strong>：速度比 <span class=\"kb-math kb-math-inline\">\\alpha = 8</span>（Fast 帧率是 Slow 的 8 倍），通道比 <span class=\"kb-math kb-math-inline\">\\beta = 1/8</span>（Fast 通道数仅为 Slow 的 1/8）",
        "<strong>计算高效</strong>：Fast pathway 仅占总计算量约 20%，整体网络高效",
        "<strong>横向连接（Lateral Connections）</strong>：Fast→Slow 的单向信息融合，支持 Time-to-Channel、Time-strided Sampling、Time-strided Convolution 三种实现",
        "<strong>无需光流输入</strong>：直接从 RGB 帧学习运动表征，端到端训练",
        "<strong>无需 ImageNet 预训练</strong>：从头训练（train from scratch）即可超越所有依赖预训练的方法",
        "<strong>生物学启发</strong>：类比视网膜神经节细胞中 P-cells（~80%，低时频高空间分辨率）和 M-cells（~15-20%，高时频低空间分辨率）的功能分工",
        "<strong>全面 SOTA</strong>：Kinetics-400（79.8% top-1）、Kinetics-600（81.8% top-1）、Charades（42.5% mAP）、AVA（28.3% mAP）"
      ],
      "detail": "<h5>架构总览</h5>\n<p><img alt=\"SlowFast 网络架构示意图\" src=\"https://ar5iv.labs.arxiv.org/html/1812.03982/assets/x1.png\" />\n<em>图：SlowFast 网络架构。上方为 Slow pathway（低帧率，高通道），下方为 Fast pathway（高帧率，轻量通道），通过横向连接（Lateral Connections）在每个阶段进行信息融合。</em></p>\n<h5>算法伪代码</h5>\n<pre><code class=\"language-python\"># SlowFast Networks 前向传播伪代码\ndef slowfast_forward(video_clip, tau=16, alpha=8):\n    &quot;&quot;&quot;\n    video_clip: 原始视频片段，共 T_total 帧\n    tau: Slow pathway 采样步长\n    alpha: Fast/Slow 帧率比\n    &quot;&quot;&quot;\n    # 1. 帧采样\n    slow_frames = sample_every(video_clip, stride=tau)        # T 帧 (e.g., 4)\n    fast_frames = sample_every(video_clip, stride=tau//alpha)  # αT 帧 (e.g., 32)\n\n    # 2. 双路径独立处理 + 横向连接融合\n    for stage in [res2, res3, res4, res5]:\n        slow_feat = slow_pathway[stage](slow_feat)    # 通道: C\n        fast_feat = fast_pathway[stage](fast_feat)     # 通道: βC (β=1/8)\n\n        # 横向连接: Fast → Slow (单向)\n        lateral_feat = lateral_connection(fast_feat)   # 变换时间维度匹配\n        slow_feat = concat(slow_feat, lateral_feat)    # 沿通道维度拼接\n\n    # 3. 全局池化 + 分类\n    slow_out = global_avg_pool(slow_feat)  \n    fast_out = global_avg_pool(fast_feat)\n    logits = fc(concat(slow_out, fast_out))\n    return logits\n</code></pre>\n<h5>动机与背景</h5>\n<p>视频理解的核心挑战在于同时建模<strong>空间语义</strong>（场景中有什么物体、人物）和<strong>时序运动</strong>（动作如何随时间变化）。传统方法主要有两条技术路线：</p>\n<ol>\n<li><strong>双流网络（Two-Stream）</strong>：分别处理 RGB 帧（空间流）和光流（时间流），但光流计算代价极高且需要预计算存储</li>\n<li><strong>3D 卷积网络（C3D/I3D）</strong>：将 2D 卷积扩展为 3D 以同时建模时空，但对所有通道使用相同的时间分辨率，无法区分空间语义和运动信息的不同需求</li>\n</ol>\n<div class=\"key-point\">💡 <strong>关键洞察</strong>：识别视觉内容的\"类别\"（如识别一个人在做什么动作的类型）变化相对缓慢，不需要高帧率；而捕捉运动的\"细节\"（如手的快速移动方向）需要高时间分辨率。这两类信息的计算需求天然不对称。</div>\n<p>这一洞察与灵长类视觉系统的生物学发现高度吻合：视网膜中约 80% 的神经节细胞为 <strong>P-cells</strong>（Parvocellular），对空间细节和颜色敏感但时间响应慢；约 15-20% 为 <strong>M-cells</strong>（Magnocellular），时间分辨率高但对空间细节和颜色不敏感。SlowFast 网络正是对这种生物学分工的计算建模。</p>\n<h5>核心机制详解</h5>\n<p><strong>1. Slow Pathway — 空间语义建模</strong></p>\n<p>Slow pathway 以较大的时间步长 <span class=\"kb-math kb-math-inline\">\\tau</span>（默认 16）对视频进行稀疏采样，输入 <span class=\"kb-math kb-math-inline\">T</span> 帧（通常 <span class=\"kb-math kb-math-inline\">T = 4</span> 或 <span class=\"kb-math kb-math-inline\">T = 8</span>）。它使用完整的通道容量来建模丰富的空间语义信息：</p>\n<div class=\"kb-math kb-math-display\">T_{slow} = T, \\quad \\text{采样步长} = \\tau</div>\n<p>Slow pathway 可以是任何时空卷积网络（如 ResNet-50/101 的 3D 变体）。在默认配置中，Slow pathway 仅在较深的阶段（res<span class=\"kb-math kb-math-inline\">_4</span> 和 res<span class=\"kb-math kb-math-inline\">_5</span>）使用时间卷积（temporal kernel size = 3），浅层不做时间建模，这与其\"关注空间语义\"的设计目标一致。</p>\n<p><strong>2. Fast Pathway — 时序运动建模</strong></p>\n<p>Fast pathway 以 <span class=\"kb-math kb-math-inline\">\\alpha</span> 倍更高的帧率采样，输入 <span class=\"kb-math kb-math-inline\">\\alpha T</span> 帧（默认 <span class=\"kb-math kb-math-inline\">\\alpha = 8</span>，即 32 帧），但通道数仅为 Slow 的 <span class=\"kb-math kb-math-inline\">\\beta</span> 倍（默认 <span class=\"kb-math kb-math-inline\">\\beta = 1/8</span>）：</p>\n<div class=\"kb-math kb-math-display\">T_{fast} = \\alpha T, \\quad \\text{采样步长} = \\tau / \\alpha</div>\n<div class=\"kb-math kb-math-display\">C_{fast} = \\beta \\cdot C_{slow}</div>\n<div class=\"warn-box\">⚠️ <strong>关键设计</strong>：Fast pathway 的计算量约为 <span class=\"kb-math kb-math-inline\">\\beta^2 \\times \\alpha \\approx (1/8)^2 \\times 8 \\approx 12.5\\%</span> 的 Slow pathway 计算量。这意味着增加 Fast pathway 仅带来约 20% 的额外计算开销，但显著提升了运动建模能力。</div>\n<p>Fast pathway 的另一关键特征是<strong>全程无时间下采样</strong>（no temporal downsampling via pooling）。在所有阶段中，时间维度保持不变（或仅通过 stride=1 的时间卷积），确保细粒度的时间信息不被丢失。同时，Fast pathway 在每个残差块中都使用时间卷积（temporal kernel size = 3），充分利用高时间分辨率。</p>\n<p><strong>3. 横向连接（Lateral Connections）— 信息融合</strong></p>\n<p>两条路径通过横向连接在每个阶段进行融合，方向为 <strong>Fast → Slow</strong>（单向）。由于两条路径的时间维度不同（<span class=\"kb-math kb-math-inline\">\\alpha T</span> vs <span class=\"kb-math kb-math-inline\">T</span>），需要进行时间维度变换。论文探索了三种方式：</p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>方式</th>\n<th>操作</th>\n<th>输出通道数</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>Time-to-Channel</td>\n<td>将 <span class=\"kb-math kb-math-inline\">\\alpha T</span> 帧 reshape 为 <span class=\"kb-math kb-math-inline\">T</span> 帧，通道扩展 <span class=\"kb-math kb-math-inline\">\\alpha</span> 倍</td>\n<td><span class=\"kb-math kb-math-inline\">\\alpha \\beta C</span></td>\n</tr>\n<tr>\n<td>Time-strided Sampling</td>\n<td>每隔 <span class=\"kb-math kb-math-inline\">\\alpha</span> 帧采样一帧</td>\n<td><span class=\"kb-math kb-math-inline\">\\beta C</span></td>\n</tr>\n<tr>\n<td>Time-strided Convolution</td>\n<td>使用 5×1² 卷积，时间 stride=<span class=\"kb-math kb-math-inline\">\\alpha</span></td>\n<td><span class=\"kb-math kb-math-inline\">2\\beta C</span></td>\n</tr>\n</tbody>\n</table></div>\n<p>融合方式为在通道维度上拼接（concatenation）到 Slow pathway 的特征上。实验表明 <strong>Time-strided Convolution</strong> 效果最佳（75.6% vs 75.3%/74.9%）。</p>\n<p><strong>4. 网络实例化</strong></p>\n<p><img alt=\"SlowFast 网络实例化架构表\" src=\"https://ar5iv.labs.arxiv.org/html/1812.03982/assets/x2.png\" />\n<em>图：SlowFast 网络的具体实例化架构（基于 ResNet-50），展示了 Slow 和 Fast 两条路径在每个阶段的具体配置。</em></p>\n<p>基于 ResNet-50 的 SlowFast 网络具体配置：</p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>阶段</th>\n<th>Slow pathway</th>\n<th>Fast pathway</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>输入</td>\n<td><span class=\"kb-math kb-math-inline\">T \\times 224^2</span>，<span class=\"kb-math kb-math-inline\">T=4</span> 或 8</td>\n<td><span class=\"kb-math kb-math-inline\">\\alpha T \\times 224^2</span>，32 或 64 帧</td>\n</tr>\n<tr>\n<td>conv<span class=\"kb-math kb-math-inline\">_1</span></td>\n<td>1×7² stride 1,1,2</td>\n<td>5×7² stride 1,1,2</td>\n</tr>\n<tr>\n<td>res<span class=\"kb-math kb-math-inline\">_2</span></td>\n<td>1×1,1×3,1×1 ×3</td>\n<td>3×1,1×3,3×1 ×3</td>\n</tr>\n<tr>\n<td>res<span class=\"kb-math kb-math-inline\">_3</span></td>\n<td>1×1,1×3,1×1 ×4</td>\n<td>3×1,1×3,3×1 ×4</td>\n</tr>\n<tr>\n<td>res<span class=\"kb-math kb-math-inline\">_4</span></td>\n<td>3×1,1×3,3×1 ×6</td>\n<td>3×1,1×3,3×1 ×6</td>\n</tr>\n<tr>\n<td>res<span class=\"kb-math kb-math-inline\">_5</span></td>\n<td>3×1,1×3,3×1 ×3</td>\n<td>3×1,1×3,3×1 ×3</td>\n</tr>\n<tr>\n<td>通道数</td>\n<td>64→2048</td>\n<td>8→256</td>\n</tr>\n</tbody>\n</table></div>\n<div class=\"key-point\">💡 <strong>注意</strong>：Slow pathway 在 res<span class=\"kb-math kb-math-inline\">_2</span>、res<span class=\"kb-math kb-math-inline\">_3</span> 使用时间 kernel=1（无时间卷积），仅在 res<span class=\"kb-math kb-math-inline\">_4</span>、res<span class=\"kb-math kb-math-inline\">_5</span> 使用时间 kernel=3；而 Fast pathway 在所有阶段都使用时间 kernel=3，体现了其专注于时间建模的设计。</div>\n<h5>训练与推理</h5>\n<p><strong>训练细节</strong>：\n- 从随机初始化训练（不使用 ImageNet 预训练），使用同步 SGD，128 GPU\n- 使用半周期余弦学习率调度，基础学习率 0.1（线性缩放）\n- 输入：随机裁剪 224×224，随机水平翻转\n- Batch Normalization 使用 synchronized BN</p>\n<p><strong>推理策略</strong>：\n- 时间维度：均匀采样 10 个 clip\n- 空间维度：3 个 crop（左、中、右）\n- 最终预测为 30 个 view 的 softmax 平均</p>\n<h5>与传统方法的对比</h5>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>特性</th>\n<th>双流网络</th>\n<th>I3D/C3D</th>\n<th>SlowFast</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>运动输入</td>\n<td>光流（需预计算）</td>\n<td>RGB（隐式）</td>\n<td>RGB（显式双路径）</td>\n</tr>\n<tr>\n<td>时间分辨率</td>\n<td>固定</td>\n<td>固定</td>\n<td>自适应（双帧率）</td>\n</tr>\n<tr>\n<td>计算分配</td>\n<td>两流等量</td>\n<td>统一</td>\n<td>不对称（Slow重+Fast轻）</td>\n</tr>\n<tr>\n<td>预训练依赖</td>\n<td>ImageNet</td>\n<td>ImageNet</td>\n<td>无需</td>\n</tr>\n<tr>\n<td>K400 top-1</td>\n<td>~73%</td>\n<td>~75%</td>\n<td><strong>79.8%</strong></td>\n</tr>\n</tbody>\n</table></div>\n<p>SlowFast 的核心优势在于：(1) 通过不对称的通道分配实现了高效的计算利用；(2) 无需光流即可显式建模运动；(3) 端到端可训练，无需分阶段预训练。</p>\n<h5>实验亮点</h5>\n<p><img alt=\"SlowFast 在 AVA 数据集上的检测结果\" src=\"https://ar5iv.labs.arxiv.org/html/1812.03982/assets/x3.png\" />\n<em>图：SlowFast 在 AVA 动作检测数据集上的可视化结果，展示了对多人多动作场景的精确检测能力。</em></p>\n<ul>\n<li><strong>Kinetics-400</strong>：SlowFast R101+NL 达到 <strong>79.8% top-1</strong>，比此前最佳（无预训练）高出 <strong>+5.9%</strong></li>\n<li><strong>Kinetics-600</strong>：<strong>81.8% top-1</strong></li>\n<li><strong>Charades</strong>：<strong>42.5% mAP</strong>（+12.6% 绝对提升）</li>\n<li><strong>AVA v2.1</strong>：<strong>28.3% mAP</strong>（+4.7% 绝对提升）</li>\n<li>消融实验验证了 <span class=\"kb-math kb-math-inline\">\\alpha=8, \\beta=1/8</span> 为最优配置，Fast pathway 不使用时间下采样至关重要</li>\n</ul>",
      "quiz": {
        "q": "SlowFast 网络中 Fast pathway 的设计核心是什么？",
        "options": [
          "使用更大的空间分辨率输入以捕捉细节",
          "使用更高帧率但更少通道数，专注于时序运动建模",
          "使用光流作为输入来显式编码运动信息",
          "使用更深的网络层数来提升特征表达能力"
        ],
        "answer": 1,
        "explain": "Fast pathway 的核心设计是以 α 倍更高的帧率采样（α=8），但仅使用 β 倍的通道数（β=1/8），从而以极低的计算开销（~20%）专注于捕捉细粒度的时序运动信息。"
      }
    },
    {
      "id": "timesformer",
      "num": 11,
      "name": "TimeSformer",
      "fullName": "时空Transformer (TimeSformer)",
      "year": "2021",
      "org": "Facebook",
      "parent": "non_local",
      "paperUrl": "https://arxiv.org/abs/2102.05095",
      "projectUrl": "",
      "category": "transformer",
      "motivation": "分层时空自注意力机制",
      "summary": "TimeSformer 提出了首个纯 Transformer 视频理解架构，通过将自注意力分解为**时间注意力**和**空间注意力**两个独立步骤（Divided Space-Time Attention），在保持高效计算的同时实现了对视频时空特征的有效建模，取代了传统 3D 卷积方法。",
      "keyPoints": [
        "<strong>纯 Transformer 架构</strong>：完全基于自注意力机制进行视频理解，不使用任何卷积操作，将 ViT 从图像扩展到视频领域",
        "<strong>5 种时空注意力方案系统对比</strong>：Space-only (S)、Joint Space-Time (ST)、Divided Space-Time (T+S)、Sparse Local-Global (L+G)、Axial (T+W+H)",
        "<strong>Divided Space-Time Attention 最优</strong>：先在时间维度（同一空间位置跨帧）做注意力，再在空间维度（同一帧内跨位置）做注意力，使用独立的 Q/K/V 参数",
        "<strong>计算复杂度优势</strong>：Divided 方案每个 patch 仅需 <span class=\"kb-math kb-math-inline\">N + F + 2</span> 次比较（<span class=\"kb-math kb-math-inline\">N</span> 为每帧 patch 数，<span class=\"kb-math kb-math-inline\">F</span> 为帧数），远低于 Joint 方案的 <span class=\"kb-math kb-math-inline\">NF + 1</span>",
        "<strong>高效训练</strong>：仅需 416 V100 GPU 小时即可在 K400 上达到 75.8% 准确率，而 SlowFast 需要 3840 GPU 小时才达到 75.6%",
        "<strong>三种模型变体</strong>：TimeSformer (8×224×224)、TimeSformer-HR (16×448×448 高分辨率)、TimeSformer-L (96×224×224 长视频)",
        "<strong>ImageNet 预训练至关重要</strong>：从头训练仅达 64.8%，ImageNet-21K 预训练可达 80.7% (K400)",
        "<strong>基准结果</strong>：K400 Top-1 80.7%（TimeSformer-L）、K600 82.2%、SSv2 62.4%、Diving-48 81.0%"
      ],
      "detail": "<p><img alt=\"TimeSformer 五种时空注意力方案对比\" src=\"https://ar5iv.labs.arxiv.org/html/2102.05095/assets/x1.png\" />\n<em>图：TimeSformer 提出的五种时空自注意力方案。蓝色 patch 为查询位置，非蓝色彩色 patch 为该查询对应的注意力计算范围。(a) Space-only；(b) Joint Space-Time；(c) Divided Space-Time（最优方案）；(d) Sparse Local-Global；(e) Axial</em></p>\n<h5>动机与背景</h5>\n<p>3D 卷积网络（如 I3D、SlowFast）是视频理解的主流方法，但存在以下问题：\n- <strong>训练成本极高</strong>：SlowFast 需要 3840 V100 GPU 小时，对计算资源要求苛刻\n- <strong>感受野有限</strong>：3D 卷积核通常为 3×3×3，需要堆叠多层才能捕获长程依赖\n- <strong>难以处理长视频</strong>：通常限制在 8-32 帧输入</p>\n<p>Transformer 的自注意力机制天然具有全局感受野，且 ViT 已在图像分类上证明了纯 Transformer 的可行性。TimeSformer 的核心问题是：<strong>如何将 ViT 的自注意力从 2D 图像高效扩展到 3D 视频？</strong></p>\n<h5>输入表示与 Patch Embedding</h5>\n<p>给定视频片段 <span class=\"kb-math kb-math-inline\">X \\in \\mathbb{R}^{H \\times W \\times 3 \\times F}</span>（<span class=\"kb-math kb-math-inline\">F</span> 帧，每帧 <span class=\"kb-math kb-math-inline\">H \\times W \\times 3</span>），TimeSformer 将每帧分割为 <span class=\"kb-math kb-math-inline\">N = HW/P^2</span> 个不重叠的 patch（<span class=\"kb-math kb-math-inline\">P = 16</span>）。每个 patch 通过线性嵌入映射到 <span class=\"kb-math kb-math-inline\">D</span> 维向量：</p>\n<div class=\"kb-math kb-math-display\">\\mathbf{z}^{(0)}_{(p,t)} = E \\cdot \\mathbf{x}_{(p,t)} + \\mathbf{e}^{pos}_{(p,t)}</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">E \\in \\mathbb{R}^{D \\times 3P^2}</span> 为线性嵌入矩阵，<span class=\"kb-math kb-math-inline\">\\mathbf{e}^{pos}_{(p,t)}</span> 为可学习的时空位置编码。额外添加一个分类 token <span class=\"kb-math kb-math-inline\">\\mathbf{z}^{(0)}_{(0,0)}</span>，最终输入序列长度为 <span class=\"kb-math kb-math-inline\">NF + 1</span>。</p>\n<div class=\"key-point\">💡 <strong>关键</strong>：位置编码同时编码空间位置和时间位置，实验表明时空位置编码比纯空间编码在 SSv2 上高出 7%（59.5% vs 52.5%），因为 SSv2 需要复杂的时序推理。</div>\n<h5>自注意力计算</h5>\n<p>每个编码块中，对查询 patch <span class=\"kb-math kb-math-inline\">\\mathbf{z}^{(\\ell)}_{(p,t)}</span> 计算 Query、Key、Value：</p>\n<div class=\"kb-math kb-math-display\">\\mathbf{q}^{(\\ell, a)}_{(p,t)} = W_Q^{(\\ell, a)} \\text{LN}(\\mathbf{z}^{(\\ell-1)}_{(p,t)}) \\quad \\in \\mathbb{R}^{D_h}</div>\n<div class=\"kb-math kb-math-display\">\\mathbf{k}^{(\\ell, a)}_{(p,t)} = W_K^{(\\ell, a)} \\text{LN}(\\mathbf{z}^{(\\ell-1)}_{(p,t)}) \\quad \\in \\mathbb{R}^{D_h}</div>\n<div class=\"kb-math kb-math-display\">\\mathbf{v}^{(\\ell, a)}_{(p,t)} = W_V^{(\\ell, a)} \\text{LN}(\\mathbf{z}^{(\\ell-1)}_{(p,t)}) \\quad \\in \\mathbb{R}^{D_h}</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">a \\in \\{1, \\dots, A\\}</span> 为注意力头索引，<span class=\"kb-math kb-math-inline\">D_h = D/A</span>，LN 为 LayerNorm。注意力权重通过缩放点积计算：</p>\n<div class=\"kb-math kb-math-display\">\\alpha^{(\\ell, a)}_{(p,t)} = \\text{SM}\\left(\\frac{\\mathbf{q}^{(\\ell, a)}_{(p,t)} \\cdot [\\mathbf{k}^{(\\ell, a)}_{(p&#x27;,t&#x27;)}]_{(p&#x27;,t&#x27;) \\in \\Omega}}{\\sqrt{D_h}}\\right)</div>\n<h5>五种时空注意力方案</h5>\n<p><strong>核心区别在于注意力集合 <span class=\"kb-math kb-math-inline\">\\Omega</span> 的定义</strong>，即每个查询 patch 关注哪些其他 patch：</p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>方案</th>\n<th>注意力范围 <span class=\"kb-math kb-math-inline\">\\Omega</span></th>\n<th>每 patch 比较数</th>\n<th>参数量</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>Space-only (S)</td>\n<td>同帧所有 patch + CLS</td>\n<td><span class=\"kb-math kb-math-inline\">N + 1</span></td>\n<td>85.9M</td>\n</tr>\n<tr>\n<td>Joint Space-Time (ST)</td>\n<td>所有帧所有 patch + CLS</td>\n<td><span class=\"kb-math kb-math-inline\">NF + 1</span></td>\n<td>85.9M</td>\n</tr>\n<tr>\n<td><strong>Divided Space-Time (T+S)</strong></td>\n<td><strong>先：同位置跨帧 + CLS；后：同帧跨位置 + CLS</strong></td>\n<td><strong><span class=\"kb-math kb-math-inline\">N + F + 2</span></strong></td>\n<td><strong>121.4M</strong></td>\n</tr>\n<tr>\n<td>Sparse Local-Global (L+G)</td>\n<td>相邻帧局部 + 全局稀疏</td>\n<td><span class=\"kb-math kb-math-inline\">\\sim H/2 \\cdot F + N + 2</span></td>\n<td>121.4M</td>\n</tr>\n<tr>\n<td>Axial (T+W+H)</td>\n<td>分别沿时间/宽度/高度轴</td>\n<td><span class=\"kb-math kb-math-inline\">F + H/P + W/P + 3</span></td>\n<td>156.8M</td>\n</tr>\n</tbody>\n</table></div>\n<h5>Divided Space-Time Attention（核心创新）</h5>\n<p>这是 TimeSformer 的核心设计，每个编码块包含<strong>两步注意力</strong>：</p>\n<p><strong>第一步——时间注意力</strong>：对位置 <span class=\"kb-math kb-math-inline\">(p, t)</span> 的 patch，关注<strong>所有帧中相同空间位置</strong>的 patch：</p>\n<div class=\"kb-math kb-math-display\">\\mathbf{a}^{(\\ell, a)time}_{(p,t)} = \\sum_{t&#x27;=1}^{F} \\alpha^{(\\ell, a)}_{(p,t)(p,t&#x27;)} \\cdot \\mathbf{v}^{(\\ell, a)}_{(p,t&#x27;)}</div>\n<p><strong>第二步——空间注意力</strong>：对时间注意力的输出，关注<strong>同一帧中所有空间位置</strong>的 patch：</p>\n<div class=\"kb-math kb-math-display\">\\mathbf{a}^{(\\ell, a)space}_{(p,t)} = \\sum_{p&#x27;=1}^{N} \\alpha^{(\\ell, a)}_{(p,t)(p&#x27;,t)} \\cdot \\mathbf{v}^{(\\ell, a)}_{(p&#x27;,t)}</div>\n<div class=\"key-point\">💡 <strong>关键设计选择</strong>：时间注意力和空间注意力使用<strong>独立的 Q/K/V 权重矩阵</strong>，这赋予了模型更大的学习容量。虽然参数量从 85.9M 增加到 121.4M，但计算复杂度从 <span class=\"kb-math kb-math-inline\">O(NF)</span> 降低到 <span class=\"kb-math kb-math-inline\">O(N + F)</span>，在高分辨率或长视频场景下优势显著。</div>\n<pre><code class=\"language-python\"># Divided Space-Time Attention 伪代码\ndef divided_spacetime_attention(x, temporal_qkv, spatial_qkv):\n    &quot;&quot;&quot;\n    x: (B, F, N, D) — B:batch, F:frames, N:patches/frame, D:dim\n    &quot;&quot;&quot;\n    # Step 1: Temporal Attention — 同一空间位置，跨帧交互\n    for p in range(N):\n        x_temporal = x[:, :, p, :]          # (B, F, D) — 所有帧的第p个patch\n        q, k, v = temporal_qkv(LN(x_temporal))\n        attn = softmax(q @ k.T / sqrt(D_h))\n        x[:, :, p, :] += attn @ v           # 残差连接\n\n    # Step 2: Spatial Attention — 同一帧内，跨空间位置交互\n    for t in range(F):\n        x_spatial = x[:, t, :, :]            # (B, N, D) — 第t帧所有patch\n        q, k, v = spatial_qkv(LN(x_spatial))\n        attn = softmax(q @ k.T / sqrt(D_h))\n        x[:, t, :, :] += attn @ v           # 残差连接\n\n    # MLP\n    x = x + MLP(LN(x))\n    return x\n</code></pre>\n<h5>计算效率分析</h5>\n<p>Divided 方案的核心优势在于<strong>将二次复杂度分解为两个较小的二次项</strong>：</p>\n<ul>\n<li><strong>Joint</strong>: 注意力矩阵大小 <span class=\"kb-math kb-math-inline\">(NF+1) \\times (NF+1)</span>，计算量 <span class=\"kb-math kb-math-inline\">O(N^2F^2)</span></li>\n<li><strong>Divided</strong>: 时间注意力 <span class=\"kb-math kb-math-inline\">O(NF^2)</span> + 空间注意力 <span class=\"kb-math kb-math-inline\">O(FN^2)</span>，总计 <span class=\"kb-math kb-math-inline\">O(NF(N+F))</span></li>\n</ul>\n<p>当 <span class=\"kb-math kb-math-inline\">N = 196</span>（224×224/16²）、<span class=\"kb-math kb-math-inline\">F = 8</span> 时：\n- Joint: <span class=\"kb-math kb-math-inline\">196 \\times 8 + 1 = 1569</span> 个 token 的全注意力\n- Divided: 时间 <span class=\"kb-math kb-math-inline\">8+1=9</span> + 空间 <span class=\"kb-math kb-math-inline\">196+1=197</span> = 每 patch 仅 206 次比较</p>\n<div class=\"warn-box\">⚠️ <strong>注意</strong>：Joint 方案在分辨率达到 448 像素或帧数增至 32 时会导致 GPU 内存溢出，而 Divided 方案可以处理 96 帧 224×224 或 16 帧 448×448 的输入。</div>\n<h5>训练细节与预训练策略</h5>\n<ul>\n<li><strong>骨干网络</strong>：ViT-Base（12 层，768 维，12 头）</li>\n<li><strong>预训练</strong>：ImageNet-1K 或 ImageNet-21K 上的 ViT 权重初始化</li>\n<li><strong>时间注意力权重初始化</strong>：从预训练的空间注意力权重复制，确保训练初期模型行为与 ViT 一致</li>\n<li><strong>推理</strong>：1 个时间 clip × 3 个空间 crop（左上、中心、右下），取平均分数</li>\n<li><strong>帧采样</strong>：默认 1/32 采样率（即每 32 帧取 1 帧）</li>\n</ul>\n<h5>与传统方法的对比</h5>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>维度</th>\n<th>3D CNN (SlowFast/I3D)</th>\n<th>TimeSformer</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>基本操作</td>\n<td>3D 卷积</td>\n<td>自注意力</td>\n</tr>\n<tr>\n<td>感受野</td>\n<td>局部（需堆叠扩大）</td>\n<td>全局（每层即全局）</td>\n</tr>\n<tr>\n<td>时空建模</td>\n<td>隐式耦合</td>\n<td>显式分解（T+S）</td>\n</tr>\n<tr>\n<td>训练成本</td>\n<td>3840 GPU·h (SlowFast)</td>\n<td>416 GPU·h</td>\n</tr>\n<tr>\n<td>长视频能力</td>\n<td>8-32 帧</td>\n<td>最多 96 帧</td>\n</tr>\n<tr>\n<td>预训练依赖</td>\n<td>可从头训练</td>\n<td>强依赖 ImageNet 预训练</td>\n</tr>\n<tr>\n<td>K400 准确率</td>\n<td>79.8% (SlowFast 16×8 R101)</td>\n<td>80.7% (TimeSformer-L)</td>\n</tr>\n</tbody>\n</table></div>\n<div class=\"key-point\">💡 <strong>关键洞察</strong>：在 K400 上，Space-only 注意力（无时间建模）即可达到 76.9%，说明该数据集偏重空间场景信息。而在 SSv2 上，Space-only 仅 36.6%，Divided 达 59.5%，凸显了时间建模对时序推理任务的必要性。</div>",
      "quiz": {
        "q": "TimeSformer 中 Divided Space-Time Attention 相比 Joint Space-Time Attention 的主要优势是什么？",
        "options": [
          "参数量更少，模型更轻量",
          "通过分解时空注意力降低计算复杂度，同时使用独立参数提升学习容量",
          "不需要位置编码，简化了模型设计",
          "仅在空间维度计算注意力，忽略时间信息以提高效率"
        ],
        "answer": 1,
        "explain": "Divided 方案将注意力分解为时间和空间两步，复杂度从 O(N²F²) 降至 O(NF(N+F))，且使用独立的 Q/K/V 参数增加学习容量。虽然参数量从 85.9M 增至 121.4M，但计算量大幅降低，尤其在高分辨率和长视频场景下优势显著。"
      }
    },
    {
      "id": "vivit",
      "num": 12,
      "name": "ViViT",
      "fullName": "视频视觉Transformer (Video Vision Transformer)",
      "year": "2021",
      "org": "Google",
      "parent": "timesformer",
      "paperUrl": "https://arxiv.org/abs/2103.15691",
      "projectUrl": "",
      "category": "transformer",
      "motivation": "多种时空因子化方案",
      "summary": "ViViT 提出了四种基于纯 Transformer 的视频分类模型变体，通过不同粒度的时空注意力因子化策略，在大幅降低计算复杂度的同时实现了五个主流视频基准上的 SOTA 性能。",
      "keyPoints": [
        "提出 4 种时空注意力模型变体：联合时空注意力(Model 1)、因子化编码器(Model 2)、因子化自注意力(Model 3)、因子化点积注意力(Model 4)",
        "两种视频 token 化方法：均匀帧采样(Uniform frame sampling) 和 管状嵌入(Tubelet embedding, 3D卷积)",
        "管状嵌入的\"中心帧初始化\"策略优于传统的滤波器膨胀(filter inflation)方法",
        "从预训练 ViT 有效初始化视频模型：位置嵌入时间维重复 + 管状嵌入中心帧初始化",
        "针对小数据集的正则化策略组合：随机深度 + RandAugment + 标签平滑 + Mixup（+5.3% on Epic Kitchens）",
        "在 Kinetics 400/600、Epic Kitchens 100、Something-Something v2、Moments in Time 五个基准上达到 SOTA"
      ],
      "detail": "<p><img alt=\"ViViT 模型架构总览\" src=\"https://ar5iv.labs.arxiv.org/html/2103.15691v1/assets/x1.png\" />\n<em>图：ViViT 的四种模型变体示意图。从左到右分别为：联合时空注意力、因子化编码器、因子化自注意力、因子化点积注意力。</em></p>\n<pre><code class=\"language-python\"># ViViT 因子化编码器 (Model 2) 伪代码\ndef vivit_factorised_encoder(video, spatial_transformer, temporal_transformer):\n    # Step 1: Tokenization - 提取 tubelet embeddings\n    # video: [B, T, H, W, C] -&gt; tubelets via 3D conv\n    tokens = tubelet_embedding(video)  # [B, n_t, n_h*n_w, d]\n\n    # Step 2: 空间编码器 - 独立处理每帧的空间token\n    spatial_outputs = []\n    for t in range(n_t):\n        frame_tokens = tokens[:, t]  # [B, n_h*n_w, d]\n        frame_tokens = prepend_cls(frame_tokens)\n        encoded = spatial_transformer(frame_tokens)  # L_s layers\n        spatial_outputs.append(encoded[:, 0])  # CLS token as frame repr\n\n    # Step 3: 时间编码器 - 聚合帧级表示\n    temporal_tokens = stack(spatial_outputs)  # [B, n_t, d]\n    temporal_tokens = prepend_cls(temporal_tokens)\n    output = temporal_transformer(temporal_tokens)  # L_t layers\n\n    # Step 4: 分类\n    return classify(output[:, 0])  # final CLS token\n</code></pre>\n<p><strong>动机与背景</strong></p>\n<p>视频理解长期依赖 3D 卷积网络（如 I3D、SlowFast），但卷积的感受野有限且随深度线性增长，难以高效建模长程时空依赖。Vision Transformer (ViT) 在图像分类上展现了纯注意力架构的潜力，但直接将 ViT 扩展到视频面临严峻的计算挑战：对于 <span class=\"kb-math kb-math-inline\">n_t</span> 帧、每帧 <span class=\"kb-math kb-math-inline\">n_h \\times n_w</span> 个 patch 的视频，联合注意力的复杂度为 <span class=\"kb-math kb-math-inline\">O((n_t \\cdot n_h \\cdot n_w)^2)</span>，这在实际视频长度下是不可接受的。</p>\n<p><strong>核心机制：四种时空因子化策略</strong></p>\n<p><strong>Model 1 — 联合时空注意力（Spatio-temporal attention）</strong></p>\n<p>最直接的方案：将视频所有时空 token 拼接后送入标准 Transformer 编码器。每个 token 可以关注所有其他时空位置，建模能力最强但计算量最大：</p>\n<div class=\"kb-math kb-math-display\">\\mathbf{y} = \\text{MSA}(\\text{LN}(\\mathbf{z})) + \\mathbf{z}, \\quad \\text{复杂度} = O((n_t \\cdot n_h \\cdot n_w)^2)</div>\n<p><strong>Model 2 — 因子化编码器（Factorised encoder）</strong></p>\n<p>将编码过程分为两个串联阶段：首先用空间 Transformer 独立编码每帧的空间 token，提取帧级 CLS 表示；然后用时间 Transformer 聚合所有帧的表示进行时序建模。</p>\n<div class=\"kb-math kb-math-display\">\\mathbf{h}_s^i = \\text{SpatialTransformer}(\\mathbf{z}^i), \\quad i = 1, \\ldots, n_t</div>\n<div class=\"kb-math kb-math-display\">\\mathbf{y} = \\text{TemporalTransformer}([\\mathbf{h}_s^1, \\ldots, \\mathbf{h}_s^{n_t}])</div>\n<div class=\"key-point\">💡 关键：Model 2 将复杂度从 <span class=\"kb-math kb-math-inline\">O((n_t \\cdot n_s)^2)</span> 降至 <span class=\"kb-math kb-math-inline\">O(n_t \\cdot n_s^2 + n_t^2)</span>，其中 <span class=\"kb-math kb-math-inline\">n_s = n_h \\cdot n_w</span>。实验显示仅需 <span class=\"kb-math kb-math-inline\">L_t = 4</span> 层时间 Transformer 即可达到饱和性能，推理速度比 Model 1 快 3.4 倍。</div>\n<p><strong>Model 3 — 因子化自注意力（Factorised self-attention）</strong></p>\n<p>在同一个 Transformer 编码器的每一层内，将多头自注意力分为两步：先计算空间注意力（同一时间步内的 token 互相关注），再计算时间注意力（同一空间位置跨时间步互相关注）：</p>\n<div class=\"kb-math kb-math-display\">\\mathbf{a}_s = \\text{MSA}_{\\text{spatial}}(\\text{LN}(\\mathbf{z})), \\quad \\mathbf{y} = \\text{MSA}_{\\text{temporal}}(\\text{LN}(\\mathbf{a}_s))</div>\n<p><strong>Model 4 — 因子化点积注意力（Factorised dot-product attention）</strong></p>\n<p>最细粒度的因子化：在注意力头级别操作。将每层的注意力头分为两组，一半计算空间注意力，另一半计算时间注意力，最后拼接输出：</p>\n<div class=\"kb-math kb-math-display\">\\text{Attention}_{\\text{spatial}}(\\mathbf{Q}_s, \\mathbf{K}_s, \\mathbf{V}_s), \\quad \\text{Attention}_{\\text{temporal}}(\\mathbf{Q}_t, \\mathbf{K}_t, \\mathbf{V}_t)</div>\n<div class=\"kb-math kb-math-display\">\\mathbf{y} = \\text{Concat}(\\text{head}_s^1, \\ldots, \\text{head}_s^{N_h/2}, \\text{head}_t^1, \\ldots, \\text{head}_t^{N_h/2}) \\mathbf{W}_O</div>\n<p><strong>Tokenization 与初始化</strong></p>\n<p>两种 token 化方法：\n1. <strong>均匀帧采样</strong>：从视频中均匀采样 <span class=\"kb-math kb-math-inline\">n_t</span> 帧，每帧独立用 2D 卷积（ViT 的 patch embedding）提取 token\n2. <strong>管状嵌入（Tubelet embedding）</strong>：用 3D 卷积核 <span class=\"kb-math kb-math-inline\">\\mathbb{R}^{t \\times h \\times w}</span> 直接从视频体中提取时空 token，可在 tokenization 阶段即融合时间信息</p>\n<p>从 ViT 预训练权重初始化 3D 管状嵌入的三种策略：\n- <strong>滤波器膨胀</strong>：将 2D 卷积核沿时间维复制并除以 <span class=\"kb-math kb-math-inline\">t</span>（77.6%）\n- <strong>中心帧初始化</strong>：仅在中心时间位置放置 2D 权重，其余置零（<strong>79.2%，最优</strong>）\n- <strong>随机初始化</strong>：仅随机初始化 3D 卷积（73.2%，最差）</p>\n<div class=\"warn-box\">⚠️ 注意：中心帧初始化优于滤波器膨胀 1.6%，这是因为它在训练初期保持了与 ViT 完全一致的行为（仅看中心帧），然后逐步学习时间信息。</div>\n<p><strong>效率与精度权衡</strong></p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>模型</th>\n<th>K400 Top-1</th>\n<th>FLOPs (×10⁹)</th>\n<th>参数量 (M)</th>\n<th>推理时间 (ms)</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>Model 1: 联合时空</td>\n<td>80.0</td>\n<td>455.2</td>\n<td>88.9</td>\n<td>58.9</td>\n</tr>\n<tr>\n<td>Model 2: 因子化编码器</td>\n<td>78.8</td>\n<td>284.4</td>\n<td>115.1</td>\n<td>17.4</td>\n</tr>\n<tr>\n<td>Model 3: 因子化自注意力</td>\n<td>77.4</td>\n<td>372.3</td>\n<td>117.3</td>\n<td>31.7</td>\n</tr>\n<tr>\n<td>Model 4: 因子化点积</td>\n<td>76.3</td>\n<td>277.1</td>\n<td>88.9</td>\n<td>22.9</td>\n</tr>\n</tbody>\n</table></div>\n<p>Model 2 在精度仅损失 1.2% 的情况下，推理速度提升 3.4 倍，是最佳的精度-效率折中方案。</p>\n<p><strong>SOTA 结果</strong></p>\n<p>使用 ViViT-H/14x2 (JFT 预训练) 配合 Factorised Encoder，在 Kinetics 400 达到 <strong>84.9%</strong> Top-1，Kinetics 600 达到 <strong>85.8%</strong> Top-1，大幅超越此前基于 3D CNN 的方法（SlowFast: 79.8%）和同期 TimeSformer（82.2%）。</p>\n<p><strong>与传统方法的区别</strong></p>\n<p>与 3D CNN（I3D、SlowFast）相比：ViViT 通过全局自注意力在每一层即可建模任意距离的时空依赖，无需堆叠多层来扩大感受野。与同期 TimeSformer 相比：ViViT 提出了更多样化的因子化方案（尤其是 Model 2 的双编码器设计），并通过系统的正则化策略在小数据集上取得更好效果（SSv2 上超出 TimeSformer 2.9%）。</p>",
      "quiz": {
        "q": "ViViT 的因子化编码器(Model 2)相比联合时空注意力(Model 1)的主要优势是什么？",
        "options": [
          "精度更高，因为分开建模空间和时间更有效",
          "推理速度提升约3.4倍，精度仅损失约1.2%",
          "参数量更少，因此更容易训练",
          "不需要预训练模型即可达到SOTA"
        ],
        "answer": 1,
        "explain": "Model 2 将时空注意力分解为串联的空间编码器和时间编码器，复杂度从 O((n_t·n_s)²) 降至 O(n_t·n_s² + n_t²)，推理时间从58.9ms降至17.4ms（快3.4倍），而K400精度仅从80.0%降至78.8%。"
      }
    },
    {
      "id": "clip4clip",
      "num": 13,
      "name": "CLIP4Clip",
      "fullName": "CLIP视频检索 (CLIP for Video Retrieval)",
      "year": "2021",
      "org": "Alibaba",
      "parent": "—",
      "paperUrl": "https://arxiv.org/abs/2104.08860",
      "projectUrl": "",
      "category": "foundation_model",
      "motivation": "CLIP迁移至视频文本检索",
      "summary": "CLIP4Clip 的核心目标是：CLIP迁移至视频文本检索。",
      "keyPoints": [
        "核心动机：CLIP迁移至视频文本检索",
        "代表机构：Alibaba"
      ],
      "detail": "<p>CLIP迁移至视频文本检索</p>"
    },
    {
      "id": "video_swin",
      "num": 14,
      "name": "Video Swin",
      "fullName": "视频Swin Transformer (Video Swin Transformer)",
      "year": "2022",
      "org": "MSRA",
      "parent": "vivit",
      "paperUrl": "https://arxiv.org/abs/2106.13230",
      "projectUrl": "",
      "category": "transformer",
      "motivation": "3D偏移窗口注意力",
      "summary": "Video Swin 的核心目标是：3D偏移窗口注意力。",
      "keyPoints": [
        "核心动机：3D偏移窗口注意力",
        "演化来源：继承或改进自 vivit",
        "代表机构：MSRA"
      ],
      "detail": "<p>3D偏移窗口注意力</p>"
    },
    {
      "id": "videomae",
      "num": 15,
      "name": "VideoMAE",
      "fullName": "视频掩码自编码器 (VideoMAE)",
      "year": "2022",
      "org": "Nanjing University",
      "parent": "video_swin",
      "paperUrl": "https://arxiv.org/abs/2203.12602",
      "projectUrl": "",
      "category": "foundation_model",
      "motivation": "90%高掩码率自监督预训练",
      "summary": "VideoMAE 提出了针对视频数据的掩码自编码预训练方法，通过管状掩码（tube masking）策略和极高掩码比率（90-95%）克服视频时间冗余导致的信息泄漏问题，在多个视频理解基准上以极少数据实现了优异性能。",
      "keyPoints": [
        "提出 Tube Masking 策略：对所有帧施加相同的空间掩码模式，防止时间维度的信息泄漏",
        "采用极高掩码比率（90-95%），远超图像 MAE 的 75%，利用视频的时间冗余特性",
        "使用 Cube Embedding 将视频 token 化：每个 token 为 <span class=\"kb-math kb-math-inline\">2 \\times 16 \\times 16</span> 的时空立方体",
        "非对称 Encoder-Decoder 架构：Encoder 仅处理可见 token（10%），Decoder 轻量（4层，宽度为 Encoder 一半）",
        "骨干网络为 vanilla ViT + Joint Space-Time Attention，无需归纳偏置",
        "在像素空间使用 MSE 损失进行重建",
        "数据高效：仅用 3.5k 视频（SSv2）即可达到有竞争力的性能",
        "主要结果：Kinetics-400 87.4%、Something-Something V2 75.4%、UCF101 91.3%"
      ],
      "detail": "<p><img alt=\"VideoMAE 框架总览图\" src=\"https://ar5iv.labs.arxiv.org/html/2203.12602/assets/x1.png\" />\n<em>图：VideoMAE 整体框架。视频经 Cube Embedding 后施加 Tube Masking，仅可见 token 送入 Encoder，Decoder 在完整 token 序列上重建被掩码的像素。</em></p>\n<p><img alt=\"Masking 策略对比\" src=\"https://ar5iv.labs.arxiv.org/html/2203.12602/assets/x2.png\" />\n<em>图：不同掩码策略对比。(a) Frame Random：每帧独立随机掩码；(b) Tube Masking：所有帧共享同一掩码模式，有效防止时间信息泄漏。</em></p>\n<h5>算法伪代码</h5>\n<pre><code class=\"language-python\"># VideoMAE 预训练伪代码\ndef videomae_pretrain(video, mask_ratio=0.9):\n    # 1. Cube Embedding: 将视频分割为时空 token\n    # video: [T, H, W, 3] → tokens: [T/2 × H/16 × W/16, D]\n    tokens = cube_embed(video, patch_size=(2, 16, 16))\n\n    # 2. Tube Masking: 生成空间掩码并跨时间复制\n    spatial_mask = random_mask(H//16 * W//16, mask_ratio)  # 空间维度\n    tube_mask = repeat(spatial_mask, T//2)  # 时间维度复制\n\n    # 3. Encoder: 仅处理可见 token (约10%)\n    visible_tokens = tokens[~tube_mask]\n    visible_tokens += positional_embedding[~tube_mask]\n    encoded = encoder(visible_tokens)  # ViT-Base/Large/Huge\n\n    # 4. Decoder: 在完整序列上重建\n    full_tokens = concat(encoded, mask_tokens)  # 补回 mask token\n    full_tokens += positional_embedding\n    decoded = decoder(full_tokens)  # 4层, 宽度为encoder一半\n\n    # 5. Loss: 仅对被掩码位置计算 MSE\n    pred_pixels = linear_proj(decoded[tube_mask])\n    target_pixels = original_pixels[tube_mask]\n    loss = MSE(pred_pixels, target_pixels)\n    return loss\n</code></pre>\n<h5>动机与背景</h5>\n<p>视频自监督学习面临的核心挑战是<strong>时间冗余</strong>。与图像不同，视频相邻帧之间存在极高的相似性，这使得简单地将图像 MAE 扩展到视频时，模型可以通过\"偷看\"相邻帧中对应位置的可见 patch 来轻松完成重建任务，而无需真正学习语义表示。</p>\n<p>传统的对比学习方法（如 MoCo、BYOL 的视频扩展）需要大量负样本和精心设计的数据增强，且对小数据集效果有限。VideoMAE 的核心洞察是：<strong>通过设计合适的掩码策略，可以将视频重建变成一个具有挑战性的自监督任务</strong>。</p>\n<h5>核心机制详解</h5>\n<p><strong>1. Cube Embedding（时空立方体嵌入）</strong></p>\n<p>VideoMAE 将输入视频 <span class=\"kb-math kb-math-inline\">V \\in \\mathbb{R}^{T \\times H \\times W \\times 3}</span> 通过 3D 卷积划分为不重叠的时空立方体 token。每个 token 覆盖 <span class=\"kb-math kb-math-inline\">2 \\times 16 \\times 16</span> 的时空区域，总共生成 <span class=\"kb-math kb-math-inline\">\\frac{T}{2} \\times \\frac{H}{16} \\times \\frac{W}{16}</span> 个 token。</p>\n<p>时间维度的下采样率为 2（而非 16），这是因为输入视频已经经过了时间采样（stride <span class=\"kb-math kb-math-inline\">\\tau = 4</span> 或 2），进一步的时间压缩会丢失运动信息。</p>\n<p><strong>2. Tube Masking（管状掩码）</strong></p>\n<div class=\"key-point\">💡 关键：Tube Masking 是 VideoMAE 最核心的设计创新。</div>\n<p>传统的 frame-level random masking 对每帧独立采样掩码位置，导致同一空间位置在不同帧中可能被掩码或可见。由于视频时间连续性，模型可以从相邻帧的可见 patch \"复制\" 信息来完成重建，使预训练任务过于简单。</p>\n<p>Tube Masking 的解决方案极其简洁：<strong>在空间维度生成一次随机掩码 <span class=\"kb-math kb-math-inline\">M \\in \\{0,1\\}^{\\frac{H}{16} \\times \\frac{W}{16}}</span>，然后将其沿时间维度复制到所有帧</strong>。这样，如果某个空间位置被掩码，它在所有帧中都不可见，彻底消除了时间维度的信息泄漏。</p>\n<div class=\"kb-math kb-math-display\">M_{tube} = \\text{repeat}(M_{spatial}, \\frac{T}{2})</div>\n<p>消融实验验证：在 SSv2 数据集上，tube masking（75.4%）显著优于 frame random masking（72.0%），证明了防止时间泄漏的重要性。</p>\n<p><strong>3. 极高掩码比率（90-95%）</strong></p>\n<div class=\"warn-box\">⚠️ 注意：视频 MAE 的最优掩码率远高于图像 MAE（75%）。</div>\n<p>由于视频的时间冗余，即使使用 tube masking，较低的掩码率（如 75%）仍然使任务过于简单。VideoMAE 发现 <strong>90%</strong> 的掩码率在 Kinetics-400 上最优，<strong>95%</strong> 在 Something-Something V2 上最优。</p>\n<p>这带来了显著的计算优势：Encoder 仅需处理 10% 的 token，使得预训练效率极高。对于 ViT-Base 处理 16 帧 224×224 视频，总 token 数为 <span class=\"kb-math kb-math-inline\">8 \\times 14 \\times 14 = 1568</span>，90% 掩码后 Encoder 仅处理约 157 个 token。</p>\n<p><strong>4. 非对称 Encoder-Decoder 架构</strong></p>\n<ul>\n<li><strong>Encoder</strong>：标准 ViT（Base/Large/Huge），使用 Joint Space-Time Attention，仅处理可见 token</li>\n<li><strong>Decoder</strong>：轻量设计，4 个 Transformer block，嵌入维度为 Encoder 的一半（如 ViT-B Encoder 768 维，Decoder 384 维）</li>\n</ul>\n<p>Decoder 接收完整的 token 序列（可见 token 的 Encoder 输出 + 可学习的 mask token），添加位置编码后进行自注意力处理，最终通过线性层投影到像素空间。</p>\n<p><strong>5. 重建目标</strong></p>\n<p>VideoMAE 使用简单的像素级 MSE 损失，仅在被掩码的 token 位置计算：</p>\n<div class=\"kb-math kb-math-display\">\\mathcal{L} = \\frac{1}{|\\mathcal{M}|} \\sum_{i \\in \\mathcal{M}} \\| \\hat{x}_i - x_i \\|^2</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">\\mathcal{M}</span> 为被掩码 token 的索引集合，<span class=\"kb-math kb-math-inline\">\\hat{x}_i</span> 为预测像素，<span class=\"kb-math kb-math-inline\">x_i</span> 为原始像素。</p>\n<p>消融实验表明，简单的归一化像素值作为目标即可获得最佳效果，无需使用 tokenizer（如 dVAE）或其他复杂目标。</p>\n<h5>训练与微调流程</h5>\n<p><strong>预训练阶段：</strong>\n- 输入：16 帧视频片段，分辨率 224×224\n- 时间采样：stride <span class=\"kb-math kb-math-inline\">\\tau = 4</span>（K400）或 <span class=\"kb-math kb-math-inline\">\\tau = 2</span>（SSv2）\n- 训练 800/1600/2400 epochs（数据集越小需要越多 epochs）\n- 优化器：AdamW，学习率 1.5e-4，cosine schedule</p>\n<p><strong>微调阶段：</strong>\n- 移除 Decoder，仅使用 Encoder\n- 在 Encoder 输出的 [CLS] token 或全局平均池化上添加分类头\n- 微调所有参数，学习率较低</p>\n<h5>与传统方法的区别</h5>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>方面</th>\n<th>对比学习（MoCo/BYOL）</th>\n<th>VideoMAE</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>预训练任务</td>\n<td>实例判别/不变性学习</td>\n<td>像素重建</td>\n</tr>\n<tr>\n<td>数据增强依赖</td>\n<td>高（需精心设计）</td>\n<td>低（仅基本增强）</td>\n</tr>\n<tr>\n<td>负样本需求</td>\n<td>需要大量负样本</td>\n<td>无需负样本</td>\n</tr>\n<tr>\n<td>小数据集表现</td>\n<td>较差</td>\n<td>优异（3.5k视频即有效）</td>\n</tr>\n<tr>\n<td>计算效率</td>\n<td>需要动量编码器</td>\n<td>90%掩码大幅降低计算量</td>\n</tr>\n<tr>\n<td>时间建模</td>\n<td>通常较弱</td>\n<td>通过掩码重建强制学习时间关系</td>\n</tr>\n</tbody>\n</table></div>\n<p>与图像 MAE 相比，VideoMAE 的关键创新在于：(1) tube masking 解决时间泄漏；(2) 更高掩码率适应视频冗余；(3) 证明了视频领域 vanilla ViT 无需时间归纳偏置即可通过 MAE 预训练获得强表示。</p>",
      "quiz": {
        "q": "VideoMAE 采用 Tube Masking 而非 Frame Random Masking 的主要原因是什么？",
        "options": [
          "Tube Masking 计算效率更高，减少了掩码生成的开销",
          "防止模型利用相邻帧中同一空间位置的可见 patch 泄漏信息",
          "Tube Masking 能生成更多训练样本，增加数据多样性",
          "Tube Masking 使得 Decoder 结构可以更简单"
        ],
        "answer": 1,
        "explain": "视频相邻帧高度相似，Frame Random Masking 下同一空间位置在不同帧可能可见，模型可直接'复制'而非学习语义。Tube Masking 确保被掩码位置在所有帧中都不可见，迫使模型学习真正的时空表示。"
      }
    },
    {
      "id": "internvideo",
      "num": 16,
      "name": "InternVideo",
      "fullName": "通用视频模型 (InternVideo)",
      "year": "2022",
      "org": "Shanghai AI Lab",
      "parent": "videomae",
      "paperUrl": "https://arxiv.org/abs/2212.03191",
      "projectUrl": "",
      "category": "foundation_model",
      "motivation": "多任务统一表征与多模态对齐",
      "summary": "InternVideo 提出了一种双路径视频基础模型框架，将自监督掩码视频建模（VideoMAE）与多模态视频-语言对比学习通过跨模型注意力（CMA）机制统一融合，在动作识别、视频-语言对齐和开放世界理解等 39 个数据集上取得 SOTA 表现。",
      "keyPoints": [
        "<strong>双路径架构</strong>：掩码视频编码器（VideoMAE ViT-Huge）+ 多模态视频编码器（UniformerV2 + CLIP-ViT-L/14），分别学习时空表征与视频-语言对齐表征",
        "<strong>跨模型注意力（CMA）</strong>：冻结两个骨干网络，通过可学习的多头交叉注意力模块在两条路径间进行知识迁移与表征对齐",
        "<strong>Kinetics-710 数据集</strong>：合并 K400/K600/K700 并去重，构建包含 710 个类别、65 万视频的统一动作识别数据集",
        "<strong>UnlabeledHybrid 数据集</strong>：融合 K710、SSv2、AVA、WebVid2M 和自采集视频共约 1200 万视频片段，用于掩码视频预训练",
        "<strong>大规模多模态训练</strong>：在 WebVid2M/10M + HowTo100M + LAION-100M 上进行视频-语言联合训练，视频-图像交替迭代",
        "<strong>tanh 门控机制</strong>：CMA 模块采用 Flamingo 风格的 tanh 门控，确保新增模块初始输出为零，不破坏原始表征",
        "<strong>39 个数据集 SOTA</strong>：K400 达 91.1%、SSv2 达 77.2%，在视频检索、视频问答等任务上全面领先"
      ],
      "detail": "<p><img alt=\"InternVideo 整体框架图\" src=\"https://ar5iv.labs.arxiv.org/html/2212.03191/assets/x1.png\" />\n<em>图 1：InternVideo 整体框架。左侧为掩码视频编码器（VideoMAE），右侧为多模态视频编码器（UniformerV2），两者通过跨模型注意力（CMA）进行交互融合。</em></p>\n<p><img alt=\"跨模型注意力（CMA）示意图\" src=\"https://ar5iv.labs.arxiv.org/html/2212.03191/assets/x4.png\" />\n<em>图 2：Cross-Model Attention 的模型交互机制。冻结双骨干，通过交叉注意力模块实现双向知识迁移。</em></p>\n<h5>动机与背景</h5>\n<p>视频理解任务种类繁多，包括动作识别、时序定位、视频检索、视频问答等。传统方法通常只关注单一预训练范式：要么使用掩码自编码（如 VideoMAE）学习细粒度的时空表征，要么使用对比学习（如 CLIP）学习语义对齐的多模态表征。然而，这两种范式各有优劣：</p>\n<ul>\n<li><strong>掩码视频建模</strong>（生成式）：擅长捕捉局部时空细节，在动作识别等细粒度任务上表现优异，但缺乏语言语义对齐能力</li>\n<li><strong>视频-语言对比学习</strong>（判别式）：擅长语义级别的跨模态对齐，在检索、问答等任务上表现出色，但对细粒度时空建模能力有限</li>\n</ul>\n<p>InternVideo 的核心思想是：<strong>将两种互补的预训练范式统一到一个框架中</strong>，通过跨模型注意力机制让两个编码器相互增强，构建一个真正通用的视频基础模型。</p>\n<h5>掩码视频编码器（Masked Video Encoder）</h5>\n<p>掩码视频编码器基于 <strong>VideoMAE</strong> 框架，使用 <strong>ViT-Huge</strong>（632M 参数）作为骨干网络。核心训练流程：</p>\n<ol>\n<li><strong>预训练数据</strong>：在 UnlabeledHybrid 数据集（~12M 视频片段）上进行自监督预训练</li>\n<li><strong>掩码策略</strong>：采用管状掩码（tube masking），掩码比例高达 <strong>90%</strong>，迫使模型学习强大的时空表征</li>\n<li><strong>训练配置</strong>：在 64 块 A100 GPU 上训练 <strong>1200 个 epoch</strong>，学习率 <span class=\"kb-math kb-math-inline\">2.5 \\times 10^{-4}</span>，余弦退火调度</li>\n<li><strong>后续微调</strong>：在 K710 上用 32 块 GPU 微调 40 个 epoch，基础学习率 0.001，层衰减 0.8</li>\n</ol>\n<p>掩码视频建模的核心目标函数为像素级重建损失：</p>\n<div class=\"kb-math kb-math-display\">\\mathcal{L}_{\\text{MAE}} = \\frac{1}{|\\mathcal{M}|} \\sum_{i \\in \\mathcal{M}} \\| \\hat{x}_i - x_i \\|^2</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">\\mathcal{M}</span> 是被掩码的 token 集合，<span class=\"kb-math kb-math-inline\">\\hat{x}_i</span> 是重建的像素值，<span class=\"kb-math kb-math-inline\">x_i</span> 是原始像素值。</p>\n<div class=\"key-point\">💡 <strong>关键</strong>：90% 的超高掩码比例是 VideoMAE 的核心设计——视频帧间存在大量冗余，高掩码比例迫使模型真正理解时空结构而非简单插值。</div>\n<h5>多模态视频编码器（Multimodal Video Encoder）</h5>\n<p>多模态路径基于 <strong>UniformerV2</strong> 架构，以 <strong>CLIP-ViT-L/14</strong> 作为视觉骨干：</p>\n<ol>\n<li><strong>架构设计</strong>：在 ViT 的最后 4 层插入全局 UniBlock，实现多阶段时空融合。额外参数初始化为使输出与原始 CLIP 模型一致，这对保持零样本性能至关重要</li>\n<li><strong>视频字幕模块</strong>：标准 6 层 Transformer 解码器（<span class=\"kb-math kb-math-inline\">c=768</span>），后接两层 MLP</li>\n<li><strong>训练数据</strong>：WebVid2M/10M + HowTo100M（视频-文本）+ LAION-100M（图像-文本），视频和图像交替迭代训练</li>\n<li><strong>训练配置</strong>：128 块 A100 GPU 训练 2 周，共 400K 步；视频-文本 batch size 14,336，图像-文本 batch size 86,016；学习率 <span class=\"kb-math kb-math-inline\">8 \\times 10^{-5}</span></li>\n</ol>\n<p>多模态训练采用标准的对比学习损失：</p>\n<div class=\"kb-math kb-math-display\">\\mathcal{L}_{\\text{contrast}} = -\\frac{1}{N} \\sum_{i=1}^{N} \\left[ \\log \\frac{\\exp(\\text{sim}(v_i, t_i) / \\tau)}{\\sum_{j=1}^{N} \\exp(\\text{sim}(v_i, t_j) / \\tau)} \\right]</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">v_i, t_i</span> 分别是视频和文本的嵌入表示，<span class=\"kb-math kb-math-inline\">\\tau</span> 是温度参数。</p>\n<div class=\"warn-box\">⚠️ <strong>注意</strong>：图像-文本数据的引入是关键设计——视频-文本数据集规模远小于 CLIP 的 400M 图像-文本对，因此通过图像-文本联合训练弥补数据不足。</div>\n<h5>跨模型注意力（Cross-Model Attention, CMA）</h5>\n<p>CMA 是 InternVideo 的核心创新，用于在两个冻结的骨干网络之间建立知识桥梁：</p>\n<pre><code class=\"language-python\"># CMA 伪代码\n# 阶段1: 冻结两个预训练骨干\nfreeze(masked_video_encoder)\nfreeze(multimodal_video_encoder)\n\n# 阶段2: 添加可学习的CMA模块\nfor layer_i in range(num_cma_layers - 1):\n    # 多模态编码器的中间token作为K/V\n    # 掩码编码器的token作为Q\n    K, V = multimodal_encoder.intermediate_tokens[layer_i]\n    Q = masked_encoder.tokens[layer_i]\n    cma_out = MultiHeadCrossAttention(Q, K, V)\n    cma_out = tanh_gate * FFN(cma_out)  # tanh门控，初始为0\n    masked_encoder.tokens[layer_i] += cma_out\n\n# 最后一层CMA: 方向反转\nK, V = masked_encoder.final_tokens\nQ = multimodal_encoder.class_token\ncma_out_final = MultiHeadCrossAttention(Q, K, V)\nmultimodal_encoder.class_token += tanh_gate * FFN(cma_out_final)\n\n# 阶段3: 动态加权融合预测分数\nscore = w1 * masked_score + w2 * multimodal_score  # w1, w2可学习，初始为0\n</code></pre>\n<p>CMA 的设计有以下关键特点：</p>\n<ol>\n<li><strong>双向知识迁移</strong>：前 N-1 层 CMA 将多模态知识迁移到掩码编码器（多模态→掩码），最后一层反向迁移掩码编码器的细粒度时空知识到多模态编码器（掩码→多模态）</li>\n<li><strong>tanh 门控</strong>：借鉴 Flamingo 的设计，在 MHCA 和 FFN 后添加 tanh 门控层，参数初始化为零，确保训练初期 CMA 输出为零，不破坏预训练表征</li>\n<li><strong>动态分数融合</strong>：最终预测通过可学习的线性组合动态融合两个编码器的预测分数，权重初始化为零</li>\n<li><strong>训练效率</strong>：仅更新 CMA 模块、分类层和多模态编码器的 query token，大幅减少可训练参数</li>\n</ol>\n<h5>Kinetics-710 数据集</h5>\n<p>InternVideo 提出了 <strong>Kinetics-710（K710）</strong> 数据集，通过合并 K400、K600、K700 三个 Kinetics 版本并去除重复类别构建：</p>\n<ul>\n<li>K400 有 400 类，K600 有 600 类，K700 有 700 类，三者存在大量类别重叠</li>\n<li>去重后得到 <strong>710 个唯一类别</strong>，共约 <strong>65 万个训练视频</strong></li>\n<li>作为统一的动作识别微调数据集，避免了在不同 Kinetics 版本间重复实验的问题</li>\n</ul>\n<h5>与传统方法的区别</h5>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>维度</th>\n<th>传统单路径方法</th>\n<th>InternVideo</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>预训练范式</td>\n<td>仅掩码建模 或 仅对比学习</td>\n<td>双路径融合：掩码 + 对比</td>\n</tr>\n<tr>\n<td>表征能力</td>\n<td>偏向细粒度 或 偏向语义</td>\n<td>兼具细粒度时空 + 语义对齐</td>\n</tr>\n<tr>\n<td>模型交互</td>\n<td>无</td>\n<td>CMA 跨模型注意力双向迁移</td>\n</tr>\n<tr>\n<td>任务覆盖</td>\n<td>单一类型任务</td>\n<td>39 个数据集，3 大类任务</td>\n</tr>\n<tr>\n<td>数据规模</td>\n<td>通常单一数据集</td>\n<td>12M 视频 + 100M 图文对</td>\n</tr>\n</tbody>\n</table></div>\n<div class=\"key-point\">💡 <strong>核心洞察</strong>：InternVideo 的成功表明，生成式（掩码建模）和判别式（对比学习）预训练是互补的——前者提供细粒度的时空理解，后者提供语义级别的跨模态对齐，两者通过 CMA 融合后能显著超越任一单独路径。</div>",
      "quiz": {
        "q": "InternVideo 中跨模型注意力（CMA）最后一层的设计与前面层有何不同？",
        "options": [
          "最后一层使用更大的隐藏维度",
          "最后一层的 Query 来自多模态编码器的 class token，Key/Value 来自掩码编码器",
          "最后一层不使用 tanh 门控机制",
          "最后一层同时融合两个编码器的所有 token"
        ],
        "answer": 1,
        "explain": "前 N-1 层 CMA 以掩码编码器 token 为 Q、多模态编码器 token 为 K/V（多模态→掩码方向），而最后一层反转方向：以多模态编码器的 class token 为 Q、掩码编码器 token 为 K/V，实现掩码→多模态的知识迁移。"
      }
    },
    {
      "id": "mamba3",
      "num": 17,
      "name": "Mamba-3",
      "fullName": "状态空间模型3代 (Mamba-3 Architecture)",
      "year": "2026",
      "org": "Princeton",
      "parent": "video_swin",
      "paperUrl": "https://pli.princeton.edu/mamba3",
      "projectUrl": "",
      "category": "transformer",
      "motivation": "线性注意力解决长视频瓶颈",
      "summary": "Mamba-3 的核心目标是：线性注意力解决长视频瓶颈。",
      "keyPoints": [
        "核心动机：线性注意力解决长视频瓶颈",
        "演化来源：继承或改进自 video_swin",
        "代表机构：Princeton"
      ],
      "detail": "<p>线性注意力解决长视频瓶颈</p>"
    },
    {
      "id": "cosmos",
      "num": 18,
      "name": "Cosmos",
      "fullName": "世界模型策略 (Cosmos World Model Policy)",
      "year": "2026",
      "org": "NVIDIA",
      "parent": "internvideo",
      "paperUrl": "https://research.nvidia.com/cosmos",
      "projectUrl": "",
      "category": "foundation_model",
      "motivation": "视频预训练转化机器人策略",
      "summary": "Cosmos 的核心目标是：视频预训练转化机器人策略。",
      "keyPoints": [
        "核心动机：视频预训练转化机器人策略",
        "演化来源：继承或改进自 internvideo",
        "代表机构：NVIDIA"
      ],
      "detail": "<p>视频预训练转化机器人策略</p>"
    },
    {
      "id": "worldreel",
      "num": 19,
      "name": "WorldReel",
      "fullName": "4D世界视频 (WorldReel 4D Generation)",
      "year": "2026",
      "org": "CVPR",
      "parent": "cosmos",
      "paperUrl": "https://cvpr2026.thecvf.com",
      "projectUrl": "",
      "category": "foundation_model",
      "motivation": "几何一致4D视频生成",
      "summary": "WorldReel 提出了一种前馈式统一 4D 视频生成框架，在潜空间中将深度和光流与 RGB 联合编码（Geo-Motion Augmented Latent），并通过时序 DPT 解码器同时预测点云、相机轨迹、场景流和动态掩码，配合两阶段联合训练策略，在保持视觉质量的同时显著提升了动态场景的几何一致性和运动连贯性。",
      "keyPoints": [
        "<strong>统一 4D 表示</strong>：单次前向推理同时输出 RGB 视频、逐像素点云 <span class=\"kb-math kb-math-inline\">P_i</span>、相机内外参 <span class=\"kb-math kb-math-inline\">C_i</span>、3D 场景流 <span class=\"kb-math kb-math-inline\">F_i^{3d}</span> 和动态前景掩码 <span class=\"kb-math kb-math-inline\">M_i</span>，所有几何量统一在首帧规范坐标系下",
        "<strong>Geo-Motion 增强潜空间</strong>：将逐帧深度图和光流通过同一 3D VAE 编码为 geo-motion latent，与 RGB latent 在通道维度拼接后送入 DiT，通过零初始化策略保留预训练权重",
        "<strong>时序 DPT 多任务解码器</strong>：基于 DPT 架构引入时序 Transformer，从扩散潜空间提取多尺度特征，共享解码器 + 轻量任务头分别预测深度/点云/相机/流/掩码，实现参数高效的几何正则化",
        "<strong>两阶段训练策略</strong>：第一阶段分别训练 DiT（扩散损失）和 DPT heads（多任务损失）；第二阶段端到端联合训练，加入背景深度一致性正则 <span class=\"kb-math kb-math-inline\">\\mathcal{L}_{\\text{reg}}^{\\text{depth}}</span> 和前景流平滑正则 <span class=\"kb-math kb-math-inline\">\\mathcal{L}_{\\text{reg}}^{\\text{flow}}</span>",
        "<strong>混合数据策略</strong>：合成数据（PointOdyssey、BEDLAM、Dynamic Replica、Omniworld-Game）提供精确标注 + 真实视频（SpatialVid 筛选的 Panda-70M）通过 GeometryCrafter/ViPE/SEA-RAFT 生成高质量伪标签",
        "<strong>场景流伪标签生成</strong>：利用光流 + 点云对应关系计算稠密 3D 场景流，结合前景掩码、不确定性和前后向一致性检查过滤噪声",
        "<strong>基座模型</strong>：CogVideoX-5B-I2V，480×720 分辨率，49 帧，4D 表示在下采样的 13 帧上预测"
      ],
      "detail": "<p><img alt=\"WorldReel 框架总览\" src=\"https://arxiv.org/html/2512.07821v1/x2.png\" />\n<em>图：WorldReel 整体架构。左侧为 Geo-Motion Augmented DiT，将 RGB 与深度/光流的联合潜空间输入扩散 Transformer；右侧为 Temporal DPT Decoder，从去噪后的潜空间解码出统一的 4D 场景表示（点云、相机、场景流、掩码）。</em></p>\n<pre><code class=\"language-python\"># WorldReel 推理伪代码\ndef worldreel_inference(image, text_prompt):\n    # 1. 编码输入图像为 RGB latent\n    z_rgb = vae_3d.encode(image)  # 3D VAE (CogVideoX)\n\n    # 2. 初始化 geo-motion latent (深度+光流通道)\n    z_gm = zeros_like(z_rgb, channels=C_gm)  # 零初始化\n    z_input = concat([z_rgb, z_gm], dim=channel)  # 通道拼接\n\n    # 3. 扩散去噪过程 (DiT with geo-motion augmented latent)\n    for t in reversed(range(T)):\n        z_input = dit_denoise_step(z_input, t, text_prompt)\n\n    # 4. 分离 RGB 和 geo-motion latent\n    z_rgb_clean, z_gm_clean = split(z_input, dim=channel)\n\n    # 5. 解码 RGB 视频\n    video = vae_3d.decode(z_rgb_clean)  # [49, H, W, 3]\n\n    # 6. Temporal DPT 解码 4D 表示 (13 个下采样帧)\n    features = temporal_dpt.extract_multiscale(z_gm_clean)\n    unified_feat = temporal_dpt.fuse(features)\n\n    depth = depth_head(unified_feat)       # [13, H, W, 1]\n    pointmap = pointmap_head(unified_feat)  # [13, H, W, 3]\n    camera = camera_head(unified_feat)      # [13, 9]\n    scene_flow = flow_head(unified_feat)    # [13, H, W, 3]\n    dyn_mask = mask_head(unified_feat)      # [13, H, W, 1]\n\n    return video, depth, pointmap, camera, scene_flow, dyn_mask\n</code></pre>\n<h5>动机与背景</h5>\n<p>现有视频生成模型（如 CogVideoX、Sora 等）虽然能生成视觉逼真的视频，但缺乏对底层 3D 世界状态的显式建模。这导致两个核心问题：</p>\n<ol>\n<li><strong>几何不一致</strong>：生成的视频在不同帧之间缺乏一致的 3D 结构，物体形状和场景布局会随时间漂移</li>\n<li><strong>运动不连贯</strong>：相机运动和物体运动纠缠在一起，难以生成具有复杂动态的场景</li>\n</ol>\n<p>已有的 4D 视频生成方法（如 GeoVideo、4DNeX）尝试引入几何约束，但存在关键缺陷：\n- <strong>GeoVideo</strong> 仅建模静态几何（深度 + 相机），忽略了物体运动，导致模型倾向于生成近静态内容以维持几何一致性\n- <strong>4DNeX</strong> 虽然输出点云，但其极低的动态度（dynamic degree 仅 0.03）表明模型坍缩为近静态生成\n- <strong>DimensionX</strong> 将空间和时间维度分离建模，无法捕捉几何与运动的耦合关系</p>\n<div class=\"key-point\">💡 关键洞察：<strong>几何一致性和运动连贯性不应被分开处理</strong>。只有同时显式建模静态结构和动态运动，才能避免\"为保持几何一致性而牺牲动态性\"的困境。</div>\n<h5>核心机制一：Geo-Motion 增强潜空间</h5>\n<p>WorldReel 的第一个核心设计是将几何和运动信息直接注入扩散模型的潜空间。具体做法：</p>\n<p><strong>编码</strong>：对于每帧视频，除了 RGB 图像外，还有对应的深度图 <span class=\"kb-math kb-math-inline\">D_i</span> 和光流 <span class=\"kb-math kb-math-inline\">F_i^{2d}</span>。将深度图复制为 3 通道、光流补零为 3 通道后，使用与 RGB <strong>相同的预训练 3D VAE</strong> 分别编码：</p>\n<div class=\"kb-math kb-math-display\">\\mathbf{z}^{\\text{gm}} = \\text{VAE}_{\\text{enc}}(\\text{concat}[D_{\\text{rep}}, F^{2d}_{\\text{pad}}])</div>\n<p><strong>拼接</strong>：将 geo-motion latent 与 RGB latent 在通道维度拼接，形成增强输入：</p>\n<div class=\"kb-math kb-math-display\">\\mathbf{z}_{\\text{input}} = [\\mathbf{z}^{\\text{rgb}}; \\mathbf{z}^{\\text{gm}}] \\in \\mathbb{R}^{T&#x27; \\times H&#x27; \\times W&#x27; \\times 2C}</div>\n<p><strong>零初始化</strong>：DiT 输入层新增通道的权重初始化为零，确保训练初期模型行为与预训练一致，避免破坏已有的视频生成能力。</p>\n<div class=\"warn-box\">⚠️ 注意：复用同一 3D VAE 编码几何信息是一个巧妙的设计选择——虽然深度/光流与 RGB 的分布不同，但 3D VAE 的时空压缩能力可以被有效迁移，避免了训练额外编码器的开销。</div>\n<h5>核心机制二：时序 DPT 多任务解码器</h5>\n<p>从去噪后的 geo-motion latent 中解码出完整的 4D 表示，WorldReel 设计了一个基于 DPT（Dense Prediction Transformer）的时序解码器：</p>\n<ol>\n<li><strong>多尺度特征提取</strong>：从 DiT 的不同层提取多尺度稠密特征</li>\n<li><strong>时序 Transformer 融合</strong>：在 DPT 融合骨干中引入时序 Transformer，建模帧间关系</li>\n<li><strong>共享解码 + 任务头分离</strong>：所有任务共享同一个 DPT 解码器，仅在最终输出层使用轻量级任务头分别预测：</li>\n<li>深度图 <span class=\"kb-math kb-math-inline\">D_i \\in \\mathbb{R}^{H \\times W}</span></li>\n<li>点云 <span class=\"kb-math kb-math-inline\">P_i \\in \\mathbb{R}^{H \\times W \\times 3}</span>（首帧规范坐标系）</li>\n<li>相机参数 <span class=\"kb-math kb-math-inline\">C_i \\in \\mathbb{R}^{9}</span>（内参 + 外参，采用 VGGT 参数化）</li>\n<li>3D 场景流 <span class=\"kb-math kb-math-inline\">F_i^{3d} \\in \\mathbb{R}^{H \\times W \\times 3}</span></li>\n<li>动态掩码 <span class=\"kb-math kb-math-inline\">M_i \\in \\mathbb{R}^{H \\times W}</span></li>\n</ol>\n<div class=\"key-point\">💡 关键：共享解码器不仅节省参数，更重要的是作为<strong>强正则化</strong>，迫使模型学习统一的几何一致表示。各任务之间的高度相关性（深度↔点云↔相机）通过共享特征自然传递。</div>\n<h5>核心机制三：两阶段联合训练</h5>\n<p><strong>第一阶段（分离训练）</strong>：\n- DiT 微调 20K 步：标准扩散损失 <span class=\"kb-math kb-math-inline\">\\mathcal{L}_{\\text{diff}} = \\mathcal{L}_{\\text{diff}}^{\\text{rgb}} + \\mathcal{L}_{\\text{diff}}^{\\text{gm}}</span>\n- DPT heads 从头训练 100K 步：以干净的 geo-motion latent 为输入，多任务损失：</p>\n<div class=\"kb-math kb-math-display\">\\mathcal{L}_{\\text{dpt}} = \\mathcal{L}_{\\text{depth}} + \\mathcal{L}_{\\text{pc}} + \\mathcal{L}_{\\text{cam}} + \\mathcal{L}_{\\text{mask}} + \\lambda_{\\text{flow}} \\mathcal{L}_{\\text{flow}}</div>\n<p>其中深度和点云用 masked L1 loss，相机用 Huber loss，掩码用 BCE loss，场景流按前景掩码重加权。</p>\n<p><strong>第二阶段（联合训练 10K 步）</strong>：端到端优化，加入关键正则化项：</p>\n<ul>\n<li><strong>背景深度一致性</strong>：利用相机变换将深度投影到其他帧，在静态背景区域强制一致：</li>\n</ul>\n<div class=\"kb-math kb-math-display\">\\mathcal{L}_{\\text{reg}}^{\\text{depth}} = \\sum_i \\sum_j \\left\\| \\hat{M}_i^{\\text{bg}} \\odot \\left( D_j - \\text{Proj}(D_i, T_{i \\to j}) \\right) \\right\\|_2</div>\n<ul>\n<li><strong>前景流平滑</strong>：对动态前景区域的场景流施加空间平滑约束：</li>\n</ul>\n<div class=\"kb-math kb-math-display\">\\mathcal{L}_{\\text{reg}}^{\\text{flow}} = \\sum_i \\left( \\left\\| \\hat{M}_i^{\\text{fg}} \\odot \\nabla_x F_i^{3d} \\right\\|_2 + \\left\\| \\hat{M}_i^{\\text{fg}} \\odot \\nabla_y F_i^{3d} \\right\\|_2 \\right)</div>\n<p>总损失：<span class=\"kb-math kb-math-inline\">\\mathcal{L} = \\mathcal{L}_{\\text{diff}} + \\lambda_{\\text{dpt}} \\mathcal{L}_{\\text{dpt}} + \\lambda_{\\text{reg}} \\mathcal{L}_{\\text{reg}}</span>，其中 <span class=\"kb-math kb-math-inline\">\\lambda_{\\text{dpt}}=0.1</span>，<span class=\"kb-math kb-math-inline\">\\lambda_{\\text{reg}}=0.5</span>。</p>\n<div class=\"key-point\">💡 关键设计：正则化项<strong>按动态掩码分区处理</strong>——背景强制多视图一致，前景强制运动平滑。这种解耦策略避免了对动态区域施加过强的几何约束，从而不会抑制复杂运动的生成。</div>\n<h5>与现有方法的关键区别</h5>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>特性</th>\n<th>CogVideoX</th>\n<th>GeoVideo</th>\n<th>4DNeX</th>\n<th><strong>WorldReel</strong></th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>几何建模</td>\n<td>❌</td>\n<td>深度+相机</td>\n<td>点云</td>\n<td><strong>深度+点云+相机</strong></td>\n</tr>\n<tr>\n<td>运动建模</td>\n<td>隐式</td>\n<td>❌</td>\n<td>❌</td>\n<td><strong>场景流+光流+掩码</strong></td>\n</tr>\n<tr>\n<td>动态场景</td>\n<td>✅</td>\n<td>偏静态</td>\n<td>近静态</td>\n<td><strong>✅ 强动态</strong></td>\n</tr>\n<tr>\n<td>潜空间增强</td>\n<td>❌</td>\n<td>深度</td>\n<td>❌</td>\n<td><strong>深度+光流</strong></td>\n</tr>\n<tr>\n<td>联合训练</td>\n<td>❌</td>\n<td>冻结DPT</td>\n<td>❌</td>\n<td><strong>端到端+正则化</strong></td>\n</tr>\n</tbody>\n</table></div>\n<h5>实验关键数据</h5>\n<p><strong>视频生成质量</strong>（Table 1，Complex motion split）：</p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>方法</th>\n<th style=\"text-align: center;\">Dynamic Degree ↑</th>\n<th style=\"text-align: center;\">FVD ↓</th>\n<th style=\"text-align: center;\">FID ↓</th>\n<th style=\"text-align: center;\">Subject Consistency ↑</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>CogVideoX-I2V</td>\n<td style=\"text-align: center;\">0.52</td>\n<td style=\"text-align: center;\">824.8</td>\n<td style=\"text-align: center;\">52.97</td>\n<td style=\"text-align: center;\">0.916</td>\n</tr>\n<tr>\n<td>4DNeX</td>\n<td style=\"text-align: center;\">0.19</td>\n<td style=\"text-align: center;\">632.8</td>\n<td style=\"text-align: center;\">49.79</td>\n<td style=\"text-align: center;\">0.983</td>\n</tr>\n<tr>\n<td>GeoVideo</td>\n<td style=\"text-align: center;\">0.79</td>\n<td style=\"text-align: center;\">409.9</td>\n<td style=\"text-align: center;\">49.92</td>\n<td style=\"text-align: center;\">0.914</td>\n</tr>\n<tr>\n<td><strong>WorldReel</strong></td>\n<td style=\"text-align: center;\"><strong>1.00</strong></td>\n<td style=\"text-align: center;\"><strong>394.2</strong></td>\n<td style=\"text-align: center;\"><strong>44.95</strong></td>\n<td style=\"text-align: center;\"><strong>0.927</strong></td>\n</tr>\n</tbody>\n</table></div>\n<p><strong>4D 几何质量</strong>（Table 2）：</p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>方法</th>\n<th style=\"text-align: center;\">Depth log-RMSE ↓</th>\n<th style=\"text-align: center;\">δ₁.₂₅ ↑</th>\n<th style=\"text-align: center;\">Camera ATE ↓</th>\n<th style=\"text-align: center;\">RTE ↓</th>\n<th style=\"text-align: center;\">RRE ↓</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>GeoVideo</td>\n<td style=\"text-align: center;\">0.353</td>\n<td style=\"text-align: center;\">63.4</td>\n<td style=\"text-align: center;\">0.011</td>\n<td style=\"text-align: center;\">0.012</td>\n<td style=\"text-align: center;\">0.443</td>\n</tr>\n<tr>\n<td><strong>WorldReel</strong></td>\n<td style=\"text-align: center;\"><strong>0.287</strong></td>\n<td style=\"text-align: center;\"><strong>71.1</strong></td>\n<td style=\"text-align: center;\"><strong>0.005</strong></td>\n<td style=\"text-align: center;\"><strong>0.007</strong></td>\n<td style=\"text-align: center;\"><strong>0.317</strong></td>\n</tr>\n</tbody>\n</table></div>\n<p><strong>消融实验</strong>（Table 3）关键发现：\n- 移除 geo-motion latent（\"w/o g.m.\"）：Complex motion FVD 从 394.2 恶化至 452.8，证明几何-运动潜空间对复杂动态建模至关重要\n- 移除联合训练（\"w/o joint\"）：深度 log-RMSE 从 0.287 恶化至 0.399，证明端到端联合优化对几何精度的关键作用\n- 冻结 DPT（\"freeze dpt\"）：FVD 略优（382.3 vs 394.2），但几何精度下降，表明 DPT 参与联合训练有助于几何-外观对齐</p>\n<h5>局限性</h5>\n<ul>\n<li>依赖 4D 监督信号（相机、几何、场景流），当前通过合成数据和伪标签获取，存在域差距</li>\n<li>有限的时序窗口（49 帧）在拓扑剧变、严重遮挡和快速运动场景下会出现失败</li>\n<li>伪标签质量受限于标注模型（ViPE、GeometryCrafter 等）的精度上限</li>\n</ul>",
      "quiz": {
        "q": "WorldReel 中 Geo-Motion Augmented Latent 的核心设计意图是什么？",
        "options": [
          "用额外的 VAE 编码深度和光流，增加模型容量",
          "将几何和运动信息注入扩散潜空间，使 DiT 在去噪过程中感知 3D 结构和动态",
          "替代 RGB latent 以减少计算量",
          "仅用于训练阶段的数据增强，推理时不使用"
        ],
        "answer": 1,
        "explain": "Geo-Motion Augmented Latent 将深度和光流编码后与 RGB latent 通道拼接，使扩散 Transformer 在去噪过程中同时处理外观和几何-运动信息，从而将几何一致性的梯度反传到潜空间，实现外观与 3D 结构的联合优化。"
      }
    },
    {
      "id": "kangaroo",
      "num": 20,
      "name": "Kangaroo",
      "fullName": "长视频语言模型 (Kangaroo VLM)",
      "year": "2026",
      "org": "IJCV",
      "parent": "internvideo",
      "paperUrl": "https://link.springer.com/kangaroo",
      "projectUrl": "",
      "category": "foundation_model",
      "motivation": "超长上下文视频语言对齐",
      "summary": "Kangaroo 提出了一套系统化的数据策划流程与渐进式课程训练策略，构建了支持超长视频输入（160帧/22K tokens）的 8B 参数视频语言大模型，在多个视频理解基准上超越同等规模开源模型并在长视频任务上媲美商用模型。",
      "keyPoints": [
        "<strong>模型架构</strong>：EVA-CLIP-L 视觉编码器 + 轻量线性投影器 + 时空 Patchify 模块 + Llama-3-8B-Instruct LLM",
        "<strong>时序位置编码（TPE）</strong>：使用正弦编码注入帧的实际浮点时间戳（而非帧索引），保留视频元信息",
        "<strong>数据策划系统</strong>：构建 300M 图像 + 60M 视频的大规模预训练数据集，并精炼出 15M 高质量子集用于预训练精炼阶段",
        "<strong>五阶段课程训练</strong>：图像预训练 → 视频预训练 → 预训练精炼 → 指令微调 → 长视频微调，逐步解锁组件",
        "<strong>长视频支持</strong>：高分辨率输入（448×448）+ 最多 160 帧 + 22K 上下文长度 + 动态帧采样 + 序列打包策略",
        "<strong>SOTA 性能</strong>：在 MVBench、MLVU、MMBench-Video、VideoMME、EgoSchema 等基准上达到 8B 级开源模型最优，部分指标超越 GPT-4V"
      ],
      "detail": "<p><img alt=\"Kangaroo 模型架构图\" src=\"https://arxiv.org/html/2408.15542v1/x2.png\" />\n<em>图：Kangaroo 整体架构。视频帧经视觉编码器提取特征后注入时序位置编码，通过 Patchify 模块压缩并经投影器映射到 LLM 嵌入空间。</em></p>\n<h5>算法伪代码：课程训练流程</h5>\n<pre><code class=\"language-python\"># Kangaroo 五阶段课程训练\n# Stage I: 图像预训练 - 对齐视觉与语言特征空间\ntrain(data=300M_images, resolution=224, trainable=[projector], frozen=[ViT, LLM])\n\n# Stage II: 视频预训练 - 引入时序建模能力  \ntrain(data=60M_videos, frames=8, resolution=224, trainable=[projector, ViT], frozen=[LLM])\n\n# Stage III: 预训练精炼 - 高分辨率 + Patchify 压缩\ntrain(data=15M_refined, frames=16, resolution=448, trainable=[all], frozen=[])\n\n# Stage IV: 指令微调 - 多任务对话能力\ntrain(data=instruction_data, frames=64_max, resolution=448, context=10K,\n      trainable=[projector, patchify, LLM], frozen=[ViT])\n\n# Stage V: 长视频微调 - 扩展上下文处理能力\ntrain(data=long_videos_subset, frames=160_max, resolution=448, context=22K,\n      trainable=[projector, patchify, LLM], frozen=[ViT])\n</code></pre>\n<h5>动机与背景</h5>\n<p>现有视频语言大模型面临两大核心挑战：（1）<strong>高质量视频-文本数据稀缺</strong>——网络视频字幕噪声大、描述粗糙，难以支撑精细的视频语言对齐学习；（2）<strong>长视频处理能力受限</strong>——受限于 LLM 上下文窗口和视觉 token 数量爆炸，多数模型仅能处理 8-16 帧的短片段，无法捕获长视频的全局语义。</p>\n<p>Kangaroo 针对这两个问题分别提出了数据策划系统和课程训练策略。</p>\n<h5>核心机制一：时序位置编码（TPE）</h5>\n<p>传统视频模型使用帧索引作为位置信息，丢失了帧间的实际时间间隔。Kangaroo 设计了基于正弦函数的时序位置编码：</p>\n<div class=\"kb-math kb-math-display\">TPE(t) = \\begin{pmatrix} \\sin(t/\\theta^{0/d}) \\\\ \\cos(t/\\theta^{1/d}) \\\\ \\vdots \\\\ \\sin(t/\\theta^{(d-2)/d}) \\\\ \\cos(t/\\theta^{(d-1)/d}) \\end{pmatrix}</div>\n<div class=\"kb-math kb-math-display\">\\hat{Z_f^t} = Z_f^t + TPE(t)</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">t</span> 是帧的<strong>实际浮点时间戳</strong>（秒），而非帧序号。这使得模型能感知视频的真实时间结构——例如区分匀速采样和变速采样的帧序列。增强后的视觉特征沿时间维度拼接并经投影器映射：</p>\n<div class=\"kb-math kb-math-display\">Z_V = \\text{Projector}(\\hat{Z_f^0} \\oplus \\hat{Z_f^1} \\oplus \\ldots \\oplus \\hat{Z_f^n})</div>\n<div class=\"key-point\">💡 <strong>关键</strong>：使用实际时间戳而非帧索引，使模型能够编码视频的时间元信息（如总时长、采样密度），这对长视频理解尤为重要。</div>\n<h5>核心机制二：数据策划系统</h5>\n<p>Kangaroo 构建了一套多阶段数据处理流水线：</p>\n<ol>\n<li><strong>预训练数据</strong>：收集 300M 图像-文本对（含 LLaVA-558K、ALLaVA 等）和 60M 视频-文本对（Panda-70M、InternVid 等），用于初始的视觉-语言对齐</li>\n<li><strong>预训练精炼数据</strong>（15M）：从预训练数据中精选高质量子集，采用多维度过滤：</li>\n<li>视频质量过滤：分辨率 &gt; 224、时长 &gt; 5s、美学评分筛选</li>\n<li>文本质量过滤：CLIP 相似度阈值、文本长度和信息密度</li>\n<li>去重：基于 CLIP 特征的语义去重</li>\n<li><strong>指令微调数据</strong>：整合多任务数据集覆盖 caption、QA、对话、推理等任务，并使用 GPT-4 对低质量标注进行重写增强</li>\n</ol>\n<h5>核心机制三：课程训练策略</h5>\n<p>五阶段渐进式训练的设计逻辑：</p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>阶段</th>\n<th>目标</th>\n<th>分辨率</th>\n<th>帧数</th>\n<th>上下文</th>\n<th>可训练组件</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>I. 图像预训练</td>\n<td>视觉-语言对齐</td>\n<td>224</td>\n<td>1</td>\n<td>512</td>\n<td>Projector</td>\n</tr>\n<tr>\n<td>II. 视频预训练</td>\n<td>时序建模</td>\n<td>224</td>\n<td>8</td>\n<td>2560</td>\n<td>ViT + Projector</td>\n</tr>\n<tr>\n<td>III. 预训练精炼</td>\n<td>高分辨率适应</td>\n<td>448</td>\n<td>16</td>\n<td>2560</td>\n<td>All</td>\n</tr>\n<tr>\n<td>IV. 指令微调</td>\n<td>多任务能力</td>\n<td>448</td>\n<td>≤64</td>\n<td>10K</td>\n<td>Proj + Patchify + LLM</td>\n</tr>\n<tr>\n<td>V. 长视频微调</td>\n<td>长上下文泛化</td>\n<td>448</td>\n<td>≤160</td>\n<td>22K</td>\n<td>Proj + Patchify + LLM</td>\n</tr>\n</tbody>\n</table></div>\n<div class=\"warn-box\">⚠️ <strong>注意</strong>：分辨率从 224 提升到 448 时，ViT 序列长度从 256 增至 1024（4倍），因此引入 Spatial-Temporal Patchify 模块进行 token 压缩，避免 LLM 输入过长。</div>\n<h5>核心机制四：长视频处理技术</h5>\n<p>为支持长视频输入，Kangaroo 采用三项关键技术：</p>\n<ol>\n<li><strong>动态帧采样</strong>：根据视频时长自适应调整采样帧数（16~160），长视频多采样以覆盖全局内容，短视频少采样避免冗余</li>\n<li><strong>序列打包（Sequence Packing）</strong>：将不同长度的多模态序列聚合为一个复合实例（配合注意力掩码），消除 padding 带来的无效计算</li>\n<li><strong>渐进式上下文扩展</strong>：从 512 → 2560 → 10K → 22K 逐步扩展 LLM 上下文窗口，避免一步到位导致的训练不稳定</li>\n</ol>\n<h5>与传统方法的区别</h5>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>对比维度</th>\n<th>传统视频 LMM</th>\n<th>Kangaroo</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>输入帧数</td>\n<td>8-16 帧固定</td>\n<td>16-160 帧动态</td>\n</tr>\n<tr>\n<td>位置编码</td>\n<td>帧索引</td>\n<td>实际时间戳</td>\n</tr>\n<tr>\n<td>训练策略</td>\n<td>1-2 阶段</td>\n<td>5 阶段课程学习</td>\n</tr>\n<tr>\n<td>数据处理</td>\n<td>直接使用公开数据</td>\n<td>系统化策划+质量精炼</td>\n</tr>\n<tr>\n<td>上下文长度</td>\n<td>2-4K</td>\n<td>22K</td>\n</tr>\n</tbody>\n</table></div>\n<p>Kangaroo 在 8B 参数规模下，于 MLVU（61.0）、LVBench（39.4）等长视频基准上超越 20B+ 参数模型和 GPT-4V，验证了数据质量与训练策略的重要性。</p>",
      "quiz": {
        "q": "Kangaroo 的时序位置编码（TPE）使用什么作为输入，而非传统的帧索引？",
        "options": [
          "帧的像素均值",
          "帧的实际浮点时间戳（秒）",
          "帧在视频中的相对位置百分比",
          "帧的 CLIP 特征向量"
        ],
        "answer": 1,
        "explain": "Kangaroo 使用帧的实际浮点时间戳（float-type timestamp）作为 TPE 输入，而非帧索引，从而将视频的时间元信息（如总时长、采样间隔）编码到视觉特征中。"
      }
    },
    {
      "id": "trajtok",
      "num": 21,
      "name": "TrajTok",
      "fullName": "轨迹Token (Learning Trajectory Tokens)",
      "year": "2026",
      "org": "Tsinghua/CAS",
      "parent": "videomae",
      "paperUrl": "https://arxiv.org/abs/2604.trajtok",
      "projectUrl": "",
      "category": "foundation_model",
      "motivation": "端到端轨迹Token解耦时长",
      "summary": "TrajTok 的核心目标是：端到端轨迹Token解耦时长。",
      "keyPoints": [
        "核心动机：端到端轨迹Token解耦时长",
        "演化来源：继承或改进自 videomae",
        "代表机构：Tsinghua/CAS"
      ],
      "detail": "<p>端到端轨迹Token解耦时长</p>"
    }
  ],
  "categories": {
    "traditional_feature": {
      "label": "传统特征方法",
      "color": "#8B4513"
    },
    "cnn_rnn": {
      "label": "CNN/RNN架构",
      "color": "#2E8B57"
    },
    "transformer": {
      "label": "Transformer时序建模",
      "color": "#4169E1"
    },
    "foundation_model": {
      "label": "视频基础模型",
      "color": "#9932CC"
    }
  },
  "projectUrls": {}
};
