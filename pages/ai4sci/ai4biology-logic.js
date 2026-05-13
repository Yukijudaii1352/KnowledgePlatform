/**
 * 通用页面渲染逻辑 (page-logic.js) · v2
 *
 * 与模板 page-template.html 配套使用。
 * 该文件会被编译器原封不动地复制到每个 topic 页面目录：
 *   pages/{domain}/{topic_id}-logic.js
 *
 * 只读取全局变量 PAGE_CONFIG（由 {topic_id}-data.js 提供）。
 * 视图结构：
 *   view-picker (默认)  →  view-overview  (综述 + 时间线 + 图谱)
 *                      →  view-progress  (按时间从新到旧的算法列表)
 */

/* ============ 1. 引用注入的数据 ============ */
// PAGE_CONFIG = { meta, overview, graph, algos, categories, projectUrls }
const CFG = window.PAGE_CONFIG;
const ALGOS = CFG.algos;
const CATEGORIES = CFG.categories;          // { id: {label, color} }
const PROJECT_URLS = CFG.projectUrls || {};

// 按时间 降序 排列（最新进展视图用）
const ALGOS_DESC = [...ALGOS].sort((a, b) => (b.year || '').localeCompare(a.year || ''));
// 按时间 升序 排列（时间线视图用）
const ALGOS_ASC  = [...ALGOS].sort((a, b) => (a.year || '').localeCompare(b.year || ''));


/* ============ 2. Hero 区：count_pill + meta ============ */
(function renderHero() {
  const row = document.getElementById('hero-meta-row');
  if (!row) return;
  const pills = [];
  if (CFG.meta.count_pill) {
    pills.push(`<span class="pill"><strong>${ALGOS.length}</strong> ${CFG.meta.count_pill.replace('{count}','').trim()}</span>`);
  }
  (CFG.meta.hero_pills || []).forEach(t => pills.push(`<span class="pill">${t}</span>`));
  row.innerHTML = pills.join('');
})();

/* ============ 3. 领域综述 ============ */
(function renderOverview() {
  const root = document.getElementById('field-overview');
  if (!root) return;
  CFG.overview.forEach(sec => {
    const el = document.createElement('div');
    el.className = 'field-overview-section';
    el.innerHTML = `<h3>${sec.title}</h3>${sec.body_html}`;
    root.appendChild(el);
  });
})();

/* ============ 4. 时间线 (升序) ============ */
function renderTimeline() {
  const c = document.getElementById('timeline-container');
  if (!c) return;
  const milestones = new Set(CFG.graph.milestones || []);
  c.innerHTML = ALGOS_ASC.map(a => {
    const isMile = milestones.has(a.id);
    const paper = a.paperUrl ? `<a class="tl-paper-link" href="${a.paperUrl}" target="_blank" rel="noopener" onclick="event.stopPropagation()">📄 论文</a>` : '';
    const org   = a.org ? `<span class="tl-org-badge">${a.org}</span>` : '';
    const parent = (a.parent && a.parent !== '—')
      ? `<span class="tl-inherit">← 改进自 ${a.parent}</span>`
      : `<span class="tl-inherit">🏛️ 奠基</span>`;
    return `<div class="tl-item">
      <div class="tl-dot ${isMile ? 'milestone' : ''}"></div>
      <div class="tl-date">${a.year} ${org}</div>
      <div class="tl-card" onclick="showAlgo('${a.id}')">
        <h3>${a.name} — ${a.fullName || ''}</h3>
        <p class="tl-summary">${a.summary}</p>
        ${parent}${paper}
      </div>
    </div>`;
  }).join('');
  const td = document.getElementById('timeline-desc');
  if (td) td.textContent = `共 ${ALGOS.length} 个算法，按发布时间从早到晚排列。点击任意卡片可跳转至「最新进展」中该算法的详解。`;
}

/* ============ 5. 图谱 (纯 SVG) ============ */
function renderGraph() {
  const container = document.getElementById('graph-container');
  const svg = document.getElementById('graph-svg');
  if (!container || !svg) return;
  // 如果容器当前不可见（display:none），clientWidth 会为 0，避免错算
  const cw = container.clientWidth;
  if (!cw) return;
  const W = cw;
  const H = container.clientHeight || 520;
  svg.setAttribute('viewBox', `0 0 ${W} ${H}`);

  const GN = CFG.graph.nodes || [];
  const GE = CFG.graph.edges || [];
  if (GN.length === 0) { svg.innerHTML = ''; return; }

  const maxX = Math.max(...GN.map(n => n.x)) + 100;
  const maxY = Math.max(...GN.map(n => n.y)) + 60;
  const scaleX = (W - 80) / maxX;
  const scaleY = (H - 60) / maxY;
  const nodes = GN.map(n => ({
    ...n,
    sx: n.x * scaleX + 40,
    sy: n.y * scaleY + 30,
    algo: ALGOS.find(a => a.id === n.id)
  }));

  let html = `<defs>
    <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="28" refY="3.5" orient="auto">
      <polygon points="0 0, 10 3.5, 0 7" fill="#9098b3" opacity="0.7"/>
    </marker>
    <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="1" stdDeviation="2" flood-color="#000" flood-opacity="0.08"/>
    </filter>
  </defs>`;

  GE.forEach(e => {
    const from = nodes.find(n => n.id === e.from);
    const to   = nodes.find(n => n.id === e.to);
    if (!from || !to) return;
    const mx = (from.sx + to.sx) / 2, my = (from.sy + to.sy) / 2;
    const dx = to.sx - from.sx, dy = to.sy - from.sy;
    const cx = mx - dy * 0.1, cy = my + dx * 0.1;
    html += `<path class="graph-link" d="M${from.sx},${from.sy} Q${cx},${cy} ${to.sx},${to.sy}"/>`;
    const lx = (from.sx + cx + to.sx) / 3;
    const ly = (from.sy + cy + to.sy) / 3 - 6;
    if (e.label) html += `<text class="graph-link-label" x="${lx}" y="${ly}" text-anchor="middle">${e.label}</text>`;
  });

  nodes.forEach(n => {
    const catMeta = CATEGORIES[n.category] || { color: '#888' };
    const isMilestone = (CFG.graph.milestones || []).includes(n.id);
    const r = isMilestone ? 26 : 22;
    html += `<g class="graph-node" onclick="showAlgo('${n.id}')" transform="translate(${n.sx},${n.sy})">
      <circle r="${r}" fill="white" stroke="${catMeta.color}" filter="url(#shadow)"/>
      <circle r="${r - 4}" fill="${catMeta.color}" opacity="0.1"/>
      <text text-anchor="middle" dy="-2" font-size="13">${n.algo ? n.algo.name : n.id}</text>
      <text class="node-sub" text-anchor="middle" dy="12">${n.algo ? n.algo.year : ''}</text>
    </g>`;
  });

  svg.innerHTML = html;

  // Legend
  const legend = document.getElementById('graph-legend');
  if (legend) {
    legend.innerHTML = Object.entries(CATEGORIES).map(([_, m]) =>
      `<div class="graph-legend-item"><div class="graph-legend-dot" style="background:${m.color}"></div>${m.label}</div>`
    ).join('');
  }

  const gd = document.getElementById('graph-desc');
  if (gd) gd.textContent = `节点代表算法，边代表继承/改进关系；颜色对应路线类别。点击节点可跳转至「最新进展」中该算法的详解。`;
}

/* ============ 6. 算法详解 + 路线筛选（降序） ============ */
let currentRouteFilter = 'all';

function renderAlgos() {
  const container = document.getElementById('algo-list');
  if (!container) return;

  // Filter bar
  const counts = { all: ALGOS.length };
  Object.keys(CATEGORIES).forEach(k => {
    counts[k] = ALGOS.filter(a => a.category === k).length;
  });
  const filters = [{ key: 'all', label: '全部' },
                   ...Object.entries(CATEGORIES).map(([k, m]) => ({ key: k, label: m.label }))];
  const filterBar = `
    <div class="route-filter-bar">
      <span class="route-filter-label">🔎 按路线筛选：</span>
      <div class="route-filter-chips">
        ${filters.filter(f => counts[f.key] > 0 || f.key === 'all').map(f => `
          <button class="route-chip route-chip-${f.key} ${currentRouteFilter === f.key ? 'active' : ''}"
                  data-filter="${f.key}" onclick="filterByRoute('${f.key}')">
            ${f.label}<span class="route-chip-count">${counts[f.key]}</span>
          </button>`).join('')}
      </div>
    </div>`;

  // 渲染顺序：时间从新到旧
  const blocks = ALGOS_DESC.map(a => {
    const cat = a.category || 'foundation';
    const catMeta = CATEGORIES[cat] || { label: cat, color: '#888' };
    const paperUrl = a.paperUrl;
    const projectUrl = a.projectUrl || PROJECT_URLS[a.id];
    const metaRow = `
      <div class="algo-meta-row">
        <span class="algo-route-badge" style="background:${catMeta.color}22;color:${catMeta.color}">${catMeta.label}</span>
        ${a.org ? `<span class="algo-org-badge">🏛️ ${a.org}</span>` : ''}
        ${a.year ? `<span class="algo-year-badge">📅 ${a.year}</span>` : ''}
        ${paperUrl ? `<a class="algo-link-badge algo-link-paper" href="${paperUrl}" target="_blank" rel="noopener" onclick="event.stopPropagation()">📄 论文</a>` : ''}
        ${projectUrl ? `<a class="algo-link-badge algo-link-project" href="${projectUrl}" target="_blank" rel="noopener" onclick="event.stopPropagation()">🔗 项目主页</a>` : ''}
      </div>`;
    return `
    <div class="algo-block" id="algo-${a.id}" data-route="${cat}">
      <div class="algo-header" onclick="toggleAlgo(this)">
        <div class="algo-header-left">
          <div class="algo-num">${a.num}</div>
          <div class="algo-header-text">
            <h3>${a.name}</h3>
            <div class="algo-subtitle">${a.fullName || ''}</div>
            ${metaRow}
          </div>
        </div>
        <div class="algo-header-right">
          <div class="mode-toggle" data-algo="${a.id}">
            <button class="mode-btn active" data-mode="key" onclick="event.stopPropagation();switchMode('${a.id}','key')">核心要点</button>
            <button class="mode-btn" data-mode="detail" onclick="event.stopPropagation();switchMode('${a.id}','detail')">深入细节</button>
          </div>
          <span class="algo-expand-icon">▼</span>
        </div>
      </div>
      <div class="algo-body" data-algo="${a.id}">
        <div class="algo-mode-key">
          ${a.motivation ? `<div class="key-point"><strong>动机：</strong>${a.motivation}</div>` : ''}
          <p>${a.summary}</p>
          <h4>核心要点</h4>
          <ul>${(a.keyPoints || []).map(p => '<li>' + p + '</li>').join('')}</ul>
        </div>
        <div class="algo-mode-detail" style="display:none">
          ${a.detail || '<p class="text-muted">（本算法尚无深入细节，欢迎补充。）</p>'}
          ${renderQuiz(a)}
        </div>
      </div>
    </div>`;
  }).join('');

  container.innerHTML = filterBar
    + '<div id="algo-empty-hint" class="algo-empty-hint" style="display:none">当前筛选下没有匹配的算法</div>'
    + blocks;
}

function filterByRoute(key) {
  currentRouteFilter = key;
  document.querySelectorAll('.route-chip').forEach(c => c.classList.toggle('active', c.dataset.filter === key));
  let vis = 0;
  document.querySelectorAll('.algo-block').forEach(b => {
    const show = (key === 'all') || (b.dataset.route === key);
    b.style.display = show ? '' : 'none';
    if (show) vis++;
  });
  const hint = document.getElementById('algo-empty-hint');
  if (hint) hint.style.display = vis === 0 ? '' : 'none';
}

function renderQuiz(a) {
  if (!a.quiz) return '';
  return `
    <div class="quiz-box" id="quiz-${a.id}">
      <h5>🧪 练习题</h5>
      <p>${a.quiz.q}</p>
      <div class="quiz-options">
        ${a.quiz.options.map((opt, i) =>
          `<div class="quiz-opt" onclick="checkQuiz('${a.id}', ${i}, ${a.quiz.answer})">${String.fromCharCode(65+i)}. ${opt}</div>`
        ).join('')}
      </div>
      <div class="quiz-explain" id="quiz-explain-${a.id}">${a.quiz.explain || ''}</div>
    </div>`;
}

/* ============ 7. 视图切换 ============ */
const VIEW_LABELS = { overview: '领域综述', progress: '最新进展' };

function enterView(name) {
  const picker = document.getElementById('view-picker');
  const vo = document.getElementById('view-overview');
  const vp = document.getElementById('view-progress');
  if (picker) picker.style.display = 'none';
  if (vo) vo.style.display = (name === 'overview') ? 'block' : 'none';
  if (vp) vp.style.display = (name === 'progress') ? 'block' : 'none';

  // 面包屑
  const wrap = document.getElementById('bc-view-wrap');
  const bc = document.getElementById('bc-view');
  if (wrap && bc) {
    wrap.style.display = '';
    bc.textContent = VIEW_LABELS[name] || '';
  }
  // URL hash 方便刷新/分享
  try { history.replaceState(null, '', '#' + name); } catch(_) {}
  window.scrollTo({ top: 0, behavior: 'instant' in window ? 'instant' : 'auto' });

  if (name === 'overview') {
    // 图谱尺寸依赖容器可见性，这里重新渲染一次
    setTimeout(renderGraph, 30);
  }
  reRenderMath();
}

function exitView() {
  const picker = document.getElementById('view-picker');
  const vo = document.getElementById('view-overview');
  const vp = document.getElementById('view-progress');
  if (picker) picker.style.display = '';
  if (vo) vo.style.display = 'none';
  if (vp) vp.style.display = 'none';
  const wrap = document.getElementById('bc-view-wrap');
  if (wrap) wrap.style.display = 'none';
  try { history.replaceState(null, '', location.pathname + location.search); } catch(_) {}
  window.scrollTo({ top: 0, behavior: 'instant' in window ? 'instant' : 'auto' });
}

/* ============ 8. 交互辅助 ============ */
function showAlgo(id) {
  // 跳转到「最新进展」并展开对应算法
  enterView('progress');
  if (currentRouteFilter !== 'all') filterByRoute('all');
  setTimeout(() => {
    const el = document.getElementById('algo-' + id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      const header = el.querySelector('.algo-header');
      if (header && !header.classList.contains('expanded')) header.click();
    }
    reRenderMath();
  }, 120);
}

function toggleAlgo(header) {
  const body = header.nextElementSibling;
  header.classList.toggle('expanded');
  body.classList.toggle('show');
  if (body.classList.contains('show')) reRenderMath();
}

function switchMode(id, mode) {
  const tg = document.querySelector(`.mode-toggle[data-algo="${id}"]`);
  if (!tg) return;
  tg.querySelectorAll('.mode-btn').forEach(b => b.classList.remove('active'));
  const btn = tg.querySelector(`[data-mode="${mode}"]`);
  if (btn) btn.classList.add('active');
  const body = document.querySelector(`.algo-body[data-algo="${id}"]`);
  if (!body) return;
  body.querySelector('.algo-mode-key').style.display    = mode === 'key' ? '' : 'none';
  body.querySelector('.algo-mode-detail').style.display = mode === 'key' ? 'none' : '';
  // 切到 detail 时自动展开该算法
  if (mode === 'detail') {
    const header = body.previousElementSibling;
    if (header && !header.classList.contains('expanded')) header.click();
  }
  reRenderMath();
}

function checkQuiz(id, sel, correct) {
  const q = document.getElementById('quiz-' + id);
  q.querySelectorAll('.quiz-opt').forEach((o, i) => {
    o.style.pointerEvents = 'none';
    if (i === correct) o.classList.add('correct');
    else if (i === sel && i !== correct) o.classList.add('wrong');
  });
  document.getElementById('quiz-explain-' + id).classList.add('show');
  reRenderMath();
}

function toggleChat() {
  const w = document.getElementById('kb-chat-widget');
  w.classList.toggle('kb-chat-collapsed');
  w.classList.toggle('kb-chat-expanded');
}

/* ============ 9. KaTeX ============ */
function reRenderMath() {
  if (typeof renderMathInElement !== 'undefined') {
    renderMathInElement(document.body, {
      delimiters: [
        { left: '$$', right: '$$', display: true },
        { left: '\\(', right: '\\)', display: false },
        { left: '\\[', right: '\\]', display: true }
      ],
      throwOnError: false,
      trust: true
    });
  }
}

/* ============ 10. Init ============ */
renderTimeline();
renderAlgos();

// 初始状态：两个视图都隐藏（由 CSS 默认隐藏），展示视图选择屏
document.addEventListener('DOMContentLoaded', () => {
  // 支持 URL hash 直达视图，方便用户分享/刷新
  const hash = (location.hash || '').replace('#','').trim();
  if (hash === 'overview' || hash === 'progress') {
    enterView(hash);
  }
  reRenderMath();
});
window.addEventListener('load', () => {
  reRenderMath();
  window.addEventListener('resize', () => {
    // 仅当综述视图可见时才需要重算
    const vo = document.getElementById('view-overview');
    if (vo && vo.style.display !== 'none') renderGraph();
  });
});
