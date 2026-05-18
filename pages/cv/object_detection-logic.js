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
const GRAPH_STATE = {
  userPositions: {},
  drag: null
};

// 按时间 降序 排列（最新进展视图用）
const ALGOS_DESC = [...ALGOS].sort((a, b) => (b.year || '').localeCompare(a.year || ''));
// 按时间 升序 排列（时间线视图用）
const ALGOS_ASC  = [...ALGOS].sort((a, b) => (a.year || '').localeCompare(b.year || ''));

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function getMilestoneIds() {
  return new Set(
    (CFG.graph.milestones || []).map(item => (
      item && typeof item === 'object' ? item.id : item
    )).filter(Boolean)
  );
}

function getNodeLabelLines(name) {
  const text = String(name || '').trim();
  if (!text) return [''];
  if (text.length <= 12) return [text];
  const chunks = text.match(/.{1,10}/g) || [text];
  return chunks.slice(0, 2);
}

function ensureGraphHeight(container, count) {
  const desired = window.innerWidth <= 768
    ? Math.min(560, Math.max(420, 360 + count * 6))
    : Math.min(860, Math.max(600, 460 + count * 9));
  container.style.height = `${desired}px`;
  return desired;
}

function relaxNodePositions(nodes, W, H) {
  const positioned = nodes.map(n => ({
    ...n,
    px: n.sx,
    py: n.sy,
    ax: n.sx,
    ay: n.sy,
    radius: n.radius || 22
  }));

  for (let step = 0; step < 70; step += 1) {
    for (let i = 0; i < positioned.length; i += 1) {
      const a = positioned[i];
      for (let j = i + 1; j < positioned.length; j += 1) {
        const b = positioned[j];
        const dx = b.px - a.px;
        const dy = b.py - a.py;
        const dist = Math.hypot(dx, dy) || 0.001;
        const minDist = a.radius + b.radius + 24;
        if (dist >= minDist) continue;
        const push = (minDist - dist) * 0.5;
        const ux = dx / dist;
        const uy = dy / dist;
        a.px -= ux * push;
        a.py -= uy * push;
        b.px += ux * push;
        b.py += uy * push;
      }
    }

    positioned.forEach(n => {
      n.px += (n.ax - n.px) * 0.12;
      n.py += (n.ay - n.py) * 0.12;
      n.px = clamp(n.px, n.radius + 22, W - n.radius - 22);
      n.py = clamp(n.py, n.radius + 22, H - n.radius - 22);
    });
  }

  return positioned.map(n => ({
    ...n,
    sx: n.px,
    sy: n.py
  }));
}

function getNodePosition(nodes, id) {
  return nodes.find(n => n.id === id) || null;
}

function updateGraphSvg(svg, nodes, edges) {
  edges.forEach(edge => {
    const from = getNodePosition(nodes, edge.from);
    const to = getNodePosition(nodes, edge.to);
    if (!from || !to) return;
    const mx = (from.sx + to.sx) / 2;
    const my = (from.sy + to.sy) / 2;
    const dx = to.sx - from.sx;
    const dy = to.sy - from.sy;
    const curveStrength = clamp(Math.hypot(dx, dy) * 0.08, 12, 40);
    const cx = mx - (dy / (Math.hypot(dx, dy) || 1)) * curveStrength;
    const cy = my + (dx / (Math.hypot(dx, dy) || 1)) * curveStrength;
    const path = svg.querySelector(`[data-edge-from="${edge.from}"][data-edge-to="${edge.to}"]`);
    if (path) {
      path.setAttribute('d', `M${from.sx},${from.sy} Q${cx},${cy} ${to.sx},${to.sy}`);
    }
    const label = svg.querySelector(`[data-edge-label="${edge.from}__${edge.to}"]`);
    if (label) {
      label.setAttribute('x', String((from.sx + cx + to.sx) / 3));
      label.setAttribute('y', String((from.sy + cy + to.sy) / 3 - 8));
    }
  });

  nodes.forEach(node => {
    const el = svg.querySelector(`[data-node-id="${node.id}"]`);
    if (el) {
      el.setAttribute('transform', `translate(${node.sx},${node.sy})`);
    }
  });
}

function bindGraphInteractions(svg, nodes, edges, W, H) {
  const getPoint = (event) => {
    const rect = svg.getBoundingClientRect();
    const viewBox = svg.viewBox.baseVal;
    const scaleX = viewBox.width / rect.width;
    const scaleY = viewBox.height / rect.height;
    return {
      x: (event.clientX - rect.left) * scaleX,
      y: (event.clientY - rect.top) * scaleY
    };
  };

  const syncNodeStorage = () => {
    nodes.forEach(node => {
      GRAPH_STATE.userPositions[node.id] = {
        x: Number((node.sx / W).toFixed(4)),
        y: Number((node.sy / H).toFixed(4))
      };
    });
  };

  const stopDrag = () => {
    if (!GRAPH_STATE.drag) return;
    const dragged = svg.querySelector(`[data-node-id="${GRAPH_STATE.drag.id}"]`);
    if (dragged) dragged.classList.remove('dragging');
    svg.classList.remove('graph-dragging');
    svg.style.cursor = '';
    GRAPH_STATE.drag = null;
  };

  svg.onpointerdown = (event) => {
    const target = event.target && event.target.closest ? event.target.closest('.graph-node') : null;
    if (!target) return;
    const node = getNodePosition(nodes, target.dataset.nodeId);
    if (!node) return;
    const point = getPoint(event);
    GRAPH_STATE.drag = {
      id: node.id,
      offsetX: point.x - node.sx,
      offsetY: point.y - node.sy,
      startX: point.x,
      startY: point.y,
      moved: false
    };
    target.classList.add('dragging');
    svg.classList.add('graph-dragging');
    svg.style.cursor = 'grabbing';
    svg.setPointerCapture(event.pointerId);
    event.preventDefault();
  };

  svg.onpointermove = (event) => {
    if (!GRAPH_STATE.drag) return;
    const node = getNodePosition(nodes, GRAPH_STATE.drag.id);
    if (!node) return;
    const point = getPoint(event);
    const travel = Math.hypot(point.x - GRAPH_STATE.drag.startX, point.y - GRAPH_STATE.drag.startY);
    node.sx = clamp(point.x - GRAPH_STATE.drag.offsetX, node.radius + 18, W - node.radius - 18);
    node.sy = clamp(point.y - GRAPH_STATE.drag.offsetY, node.radius + 18, H - node.radius - 18);
    GRAPH_STATE.drag.moved = GRAPH_STATE.drag.moved || travel > 4;
    syncNodeStorage();
    updateGraphSvg(svg, nodes, edges);
    event.preventDefault();
  };

  svg.onpointerup = (event) => {
    if (!GRAPH_STATE.drag) return;
    const { id, moved } = GRAPH_STATE.drag;
    stopDrag();
    if (!moved) showAlgo(id);
    event.preventDefault();
  };

  svg.onpointercancel = () => {
    if (GRAPH_STATE.drag) stopDrag();
  };
}

function ensureGraphToolbar(container) {
  let toolbar = container.querySelector('.graph-toolbar');
  if (!toolbar) {
    toolbar = document.createElement('div');
    toolbar.className = 'graph-toolbar';
    toolbar.innerHTML = `
      <span class="graph-hint">可拖动节点调整布局</span>
      <button type="button" class="graph-btn" id="graph-reset-btn">重置布局</button>
    `;
    container.appendChild(toolbar);
  }
  const resetBtn = toolbar.querySelector('#graph-reset-btn');
  if (resetBtn) {
    resetBtn.onclick = () => {
      GRAPH_STATE.userPositions = {};
      renderGraph();
    };
  }
}


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
  const GN = CFG.graph.nodes || [];
  const GE = CFG.graph.edges || [];
  if (GN.length === 0) { svg.innerHTML = ''; return; }
  const H = ensureGraphHeight(container, GN.length);
  const W = cw;
  svg.setAttribute('viewBox', `0 0 ${W} ${H}`);
  ensureGraphToolbar(container);

  const milestoneIds = getMilestoneIds();

  const xs = GN.map(n => Number(n.x) || 0);
  const ys = GN.map(n => Number(n.y) || 0);
  const minX = Math.min(...xs);
  const maxX = Math.max(...xs);
  const minY = Math.min(...ys);
  const maxY = Math.max(...ys);
  const padX = 72;
  const padY = 52;
  const rangeX = Math.max(1, maxX - minX);
  const rangeY = Math.max(1, maxY - minY);
  const scaleX = (W - padX * 2) / rangeX;
  const scaleY = (H - padY * 2) / rangeY;
  let nodes = GN.map(n => ({
    ...n,
    radius: milestoneIds.has(n.id) ? 28 : 24,
    algo: ALGOS.find(a => a.id === n.id)
  }));

  nodes = nodes.map(n => {
    const stored = GRAPH_STATE.userPositions[n.id];
    if (stored && Number.isFinite(stored.x) && Number.isFinite(stored.y)) {
      return {
        ...n,
        sx: clamp(stored.x * W, n.radius + 18, W - n.radius - 18),
        sy: clamp(stored.y * H, n.radius + 18, H - n.radius - 18)
      };
    }
    return {
      ...n,
      sx: ((Number(n.x) || 0) - minX) * scaleX + padX,
      sy: ((Number(n.y) || 0) - minY) * scaleY + padY
    };
  });

  if (Object.keys(GRAPH_STATE.userPositions).length === 0) {
    nodes = relaxNodePositions(nodes, W, H);
    nodes.forEach(node => {
      GRAPH_STATE.userPositions[node.id] = {
        x: Number((node.sx / W).toFixed(4)),
        y: Number((node.sy / H).toFixed(4))
      };
    });
  }

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
    const mx = (from.sx + to.sx) / 2;
    const my = (from.sy + to.sy) / 2;
    const dx = to.sx - from.sx;
    const dy = to.sy - from.sy;
    const curveStrength = clamp(Math.hypot(dx, dy) * 0.08, 12, 40);
    const cx = mx - (dy / (Math.hypot(dx, dy) || 1)) * curveStrength;
    const cy = my + (dx / (Math.hypot(dx, dy) || 1)) * curveStrength;
    html += `<path class="graph-link" data-edge-from="${e.from}" data-edge-to="${e.to}" d="M${from.sx},${from.sy} Q${cx},${cy} ${to.sx},${to.sy}"/>`;
    const lx = (from.sx + cx + to.sx) / 3;
    const ly = (from.sy + cy + to.sy) / 3 - 8;
    if (e.label) html += `<text class="graph-link-label" data-edge-label="${e.from}__${e.to}" x="${lx}" y="${ly}" text-anchor="middle">${e.label}</text>`;
  });

  nodes.forEach(n => {
    const catMeta = CATEGORIES[n.category] || { color: '#888' };
    const isMilestone = milestoneIds.has(n.id);
    const r = isMilestone ? 28 : 24;
    const labelLines = getNodeLabelLines(n.algo ? n.algo.name : n.id);
    const labelHtml = labelLines.map((line, index) => (
      `<tspan x="0" dy="${index === 0 ? '-3' : '13'}">${line}</tspan>`
    )).join('');
    html += `<g class="graph-node" data-node-id="${n.id}" transform="translate(${n.sx},${n.sy})">
      <circle r="${r}" fill="white" stroke="${catMeta.color}" filter="url(#shadow)"/>
      <circle r="${Math.max(r - 4, 12)}" fill="${catMeta.color}" opacity="0.1"/>
      <text text-anchor="middle" font-size="12.5">${labelHtml}</text>
      <text class="node-sub" text-anchor="middle" dy="18">${n.algo ? n.algo.year : ''}</text>
    </g>`;
  });

  svg.innerHTML = html;
  bindGraphInteractions(svg, nodes, GE, W, H);

  // Legend
  const legend = document.getElementById('graph-legend');
  if (legend) {
    legend.innerHTML = Object.entries(CATEGORIES).map(([_, m]) =>
      `<div class="graph-legend-item"><div class="graph-legend-dot" style="background:${m.color}"></div>${m.label}</div>`
    ).join('');
  }

  const gd = document.getElementById('graph-desc');
  if (gd) gd.textContent = `节点代表算法，边代表继承/改进关系；颜色对应路线类别。支持拖动节点调整布局，轻点节点可跳转至「最新进展」中的算法详解。`;
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
