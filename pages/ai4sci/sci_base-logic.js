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
 *                      →  view-progress  (最新综述 + 按时间从新到旧的算法列表)
 */

/* ============ 1. 引用注入的数据 ============ */
// PAGE_CONFIG = { meta, overview, graph, algos, categories, projectUrls }
const CFG = window.PAGE_CONFIG;
const ALGOS = CFG.algos;
const CATEGORIES = CFG.categories;          // { id: {label, color} }
const PROJECT_URLS = CFG.projectUrls || {};
const CHAT_STORAGE_KEY = 'kp_page_chat_settings_v1';
const CHAT_DEFAULT_CONFIG = {
  base: 'https://api.openai.com',
  key: '',
  model: 'gpt-4.1-mini'
};
const GRAPH_STATE = {
  userPositions: {},
  drag: null
};
const CHAT_STATE = {
  config: loadChatConfig(),
  history: [],
  sending: false,
  settingsOpen: false
};

// 按时间 降序 排列（最新进展视图用）
const ALGOS_DESC = [...ALGOS].sort(compareAlgoDesc);
// 按时间 升序 排列（时间线视图用）
const ALGOS_ASC  = [...ALGOS].sort(compareAlgoAsc);

function parseAlgoYear(value) {
  const text = String(value || '').trim();
  if (!text) return { year: -9999, sub: -1 };
  const match = text.match(/^(\d{4})(?:[.\-/](\d+))?/);
  if (!match) return { year: -9999, sub: -1 };
  return {
    year: Number(match[1] || -9999),
    sub: Number(match[2] || 0)
  };
}

function compareAlgoDesc(a, b) {
  const ay = parseAlgoYear(a.year);
  const by = parseAlgoYear(b.year);
  if (ay.year !== by.year) return by.year - ay.year;
  if (ay.sub !== by.sub) return by.sub - ay.sub;
  return Number(b.num || 0) - Number(a.num || 0);
}

function compareAlgoAsc(a, b) {
  return -compareAlgoDesc(a, b);
}

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

function isGraphFullscreen(container) {
  return document.fullscreenElement === container;
}

function updateGraphFullscreenButton(container) {
  const btn = container.querySelector('#graph-fullscreen-btn');
  if (!btn) return;
  const active = isGraphFullscreen(container);
  btn.classList.toggle('active', active);
  btn.setAttribute('aria-label', active ? '退出全屏图谱' : '全屏查看图谱');
  btn.setAttribute('title', active ? '退出全屏' : '全屏查看');
  btn.innerHTML = active
    ? '<span class="graph-btn-icon">⤢</span><span class="graph-btn-text">退出全屏</span>'
    : '<span class="graph-btn-icon">⤢</span><span class="graph-btn-text">全屏查看</span>';
}

function toggleGraphFullscreen(container) {
  if (!container || !document.fullscreenEnabled) return;
  if (isGraphFullscreen(container)) {
    document.exitFullscreen().catch(() => {});
    return;
  }
  container.requestFullscreen().catch(() => {});
}

function ensureGraphToolbar(container) {
  let toolbar = container.querySelector('.graph-toolbar');
  if (!toolbar) {
    toolbar = document.createElement('div');
    toolbar.className = 'graph-toolbar';
    toolbar.innerHTML = `
      <span class="graph-hint">可拖动节点调整布局</span>
      <div class="graph-toolbar-actions">
        <button type="button" class="graph-btn graph-btn-icon-only" id="graph-fullscreen-btn" aria-label="全屏查看图谱" title="全屏查看">
          <span class="graph-btn-icon">⤢</span><span class="graph-btn-text">全屏查看</span>
        </button>
        <button type="button" class="graph-btn" id="graph-reset-btn">重置布局</button>
      </div>
    `;
    container.appendChild(toolbar);
  }
  const fullscreenBtn = toolbar.querySelector('#graph-fullscreen-btn');
  if (fullscreenBtn) {
    fullscreenBtn.onclick = () => toggleGraphFullscreen(container);
    updateGraphFullscreenButton(container);
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
    el.innerHTML = `${sec.title ? `<h3>${sec.title}</h3>` : ''}${sec.body_html}`;
    root.appendChild(el);
  });
})();

/* ============ 4. 最新进展综述 ============ */
(function renderLatestOverview() {
  const root = document.getElementById('latest-progress-overview');
  if (!root) return;
  if (!CFG.meta.latest_overview_from_doc) {
    const note = document.createElement('div');
    note.className = 'warn-box';
    note.textContent = '当前“最新进展综述”仍是编译器注入的模板占位，请在源知识文档中补充最近一个月的真实内容。';
    root.appendChild(note);
  }
  (CFG.latest_overview || []).forEach(sec => {
    const el = document.createElement('div');
    el.className = 'field-overview-section';
    el.innerHTML = `${sec.title ? `<h3>${sec.title}</h3>` : ''}${sec.body_html}`;
    root.appendChild(el);
  });
})();

/* ============ 5. 时间线 (升序) ============ */
function renderTimeline() {
  const c = document.getElementById('timeline-container');
  if (!c) return;
  const milestones = getMilestoneIds();
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

/* ============ 6. 图谱 (纯 SVG) ============ */
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

/* ============ 7. 算法详解 + 路线筛选（降序） ============ */
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
      <span class="route-filter-hint">按发布时间从新到旧排列</span>
    </div>`;

  // 渲染顺序：时间从新到旧
  const blocks = ALGOS_DESC.map((a, index) => {
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
          <div class="algo-num">${index + 1}</div>
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

/* ============ 8. 视图切换 ============ */
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

/* ============ 9. 交互辅助 ============ */
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

function scrollToAlgo(id) {
  enterView('progress');
  if (currentRouteFilter !== 'all') filterByRoute('all');
  setTimeout(() => {
    const el = document.getElementById('algo-' + id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
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
  if (w.classList.contains('kb-chat-expanded')) {
    if (!isChatConfigured()) {
      toggleChatSettings(true);
    }
    const input = document.getElementById('kb-chat-input');
    if (input && !input.disabled) input.focus();
  }
}

function loadChatConfig() {
  try {
    const raw = localStorage.getItem(CHAT_STORAGE_KEY);
    if (!raw) return { ...CHAT_DEFAULT_CONFIG };
    const parsed = JSON.parse(raw);
    return {
      base: String(parsed.base || CHAT_DEFAULT_CONFIG.base).trim(),
      key: String(parsed.key || '').trim(),
      model: String(parsed.model || CHAT_DEFAULT_CONFIG.model).trim()
    };
  } catch (_) {
    return { ...CHAT_DEFAULT_CONFIG };
  }
}

function saveChatConfig() {
  localStorage.setItem(CHAT_STORAGE_KEY, JSON.stringify(CHAT_STATE.config));
}

function clearChatConfig() {
  CHAT_STATE.config = { ...CHAT_DEFAULT_CONFIG, key: '' };
  localStorage.removeItem(CHAT_STORAGE_KEY);
}

function isChatConfigured() {
  return Boolean(
    CHAT_STATE.config.base &&
    CHAT_STATE.config.key &&
    CHAT_STATE.config.model
  );
}

function getChatEls() {
  return {
    widget: document.getElementById('kb-chat-widget'),
    config: document.getElementById('kb-chat-config'),
    base: document.getElementById('kb-chat-base'),
    key: document.getElementById('kb-chat-key'),
    model: document.getElementById('kb-chat-model'),
    status: document.getElementById('kb-chat-status'),
    input: document.getElementById('kb-chat-input'),
    send: document.getElementById('kb-chat-send-btn'),
    messages: document.getElementById('kb-chat-messages'),
    save: document.getElementById('kb-chat-save-btn'),
    clear: document.getElementById('kb-chat-clear-btn')
  };
}

function syncChatConfigForm() {
  const els = getChatEls();
  if (!els.base || !els.key || !els.model) return;
  els.base.value = CHAT_STATE.config.base || '';
  els.key.value = CHAT_STATE.config.key || '';
  els.model.value = CHAT_STATE.config.model || '';
}

function renderChatStatus() {
  const els = getChatEls();
  if (!els.status || !els.input || !els.send) return;
  if (CHAT_STATE.sending) {
    els.status.textContent = `正在调用 ${CHAT_STATE.config.model || '模型'}，并结合本页知识回答…`;
    els.input.disabled = true;
    els.send.disabled = true;
    return;
  }
  if (isChatConfigured()) {
    els.status.textContent = `已配置 ${CHAT_STATE.config.model} · 将结合本页知识内容回答`;
    els.input.disabled = false;
    els.send.disabled = false;
    els.input.placeholder = '例如：BERT 和 MAE 的关系是什么？';
  } else {
    els.status.textContent = '未配置 API。请先点击右上角 ⚙ 填写 API Base / API Key / Model。';
    els.input.disabled = true;
    els.send.disabled = true;
    els.input.placeholder = '请先配置 API Base / API Key / Model';
  }
}

function toggleChatSettings(forceOpen) {
  const els = getChatEls();
  if (!els.config) return;
  CHAT_STATE.settingsOpen = typeof forceOpen === 'boolean' ? forceOpen : !CHAT_STATE.settingsOpen;
  els.config.hidden = !CHAT_STATE.settingsOpen;
  if (CHAT_STATE.settingsOpen) syncChatConfigForm();
}

function renderChatText(text) {
  return String(text || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function appendChatMessage(role, text) {
  const els = getChatEls();
  if (!els.messages) return null;
  const div = document.createElement('div');
  div.className = `kb-chat-msg kb-chat-msg-${role}`;
  div.innerHTML = renderChatText(text);
  els.messages.appendChild(div);
  els.messages.scrollTop = els.messages.scrollHeight;
  return div;
}

function normalizeChatBase(base) {
  return String(base || '').trim().replace(/\/+$/, '');
}

function resolveChatEndpoint(base) {
  const normalized = normalizeChatBase(base);
  if (!normalized) return '';
  if (normalized.endsWith('/chat/completions')) return normalized;
  if (normalized.endsWith('/v1')) return `${normalized}/chat/completions`;
  return `${normalized}/v1/chat/completions`;
}

function htmlToPlainText(html) {
  const div = document.createElement('div');
  div.innerHTML = html || '';
  return (div.textContent || div.innerText || '').replace(/\s+/g, ' ').trim();
}

function trimText(text, maxChars) {
  const normalized = String(text || '').replace(/\s+/g, ' ').trim();
  if (normalized.length <= maxChars) return normalized;
  return `${normalized.slice(0, maxChars)}…`;
}

function extractSearchTerms(text) {
  const source = String(text || '').toLowerCase();
  const english = source.match(/[a-z0-9_+-]{2,}/g) || [];
  const chinese = [];
  const blocks = source.match(/[\u4e00-\u9fff]{2,}/g) || [];
  blocks.forEach(block => {
    chinese.push(block);
    for (let i = 0; i < block.length - 1; i += 1) {
      chinese.push(block.slice(i, i + 2));
    }
  });
  return [...new Set([...english, ...chinese])].slice(0, 40);
}

function scoreAlgoForChat(algo, terms, question) {
  const catLabel = CATEGORIES[algo.category]?.label || algo.category || '';
  const corpus = [
    algo.id,
    algo.name,
    algo.fullName,
    algo.year,
    algo.org,
    algo.parent,
    catLabel,
    algo.summary,
    ...(algo.keyPoints || []).map(htmlToPlainText),
    htmlToPlainText(algo.detail || '')
  ].join(' ').toLowerCase();

  let score = 0;
  const q = String(question || '').toLowerCase();
  if (algo.name && q.includes(String(algo.name).toLowerCase())) score += 80;
  if (algo.fullName && q.includes(String(algo.fullName).toLowerCase())) score += 70;
  if (algo.id && q.includes(String(algo.id).toLowerCase())) score += 50;
  terms.forEach(term => {
    if (term && corpus.includes(term)) score += Math.max(3, Math.min(10, term.length * 1.5));
  });
  if (/最新|recent|new|frontier/.test(q)) {
    score += parseAlgoYear(algo.year).year / 1000;
  }
  return score;
}

function rankRelevantAlgos(question) {
  const terms = extractSearchTerms(question);
  const ranked = ALGOS.map(algo => ({
    algo,
    score: scoreAlgoForChat(algo, terms, question)
  })).sort((a, b) => {
    if (b.score !== a.score) return b.score - a.score;
    return compareAlgoDesc(a.algo, b.algo);
  });
  const hit = ranked.filter(item => item.score > 0).slice(0, 6).map(item => item.algo);
  if (hit.length > 0) return hit;
  return ALGOS_DESC.slice(0, 6);
}

function buildAlgoContext(algo, index) {
  const catLabel = CATEGORIES[algo.category]?.label || algo.category || '未分类';
  const keyPoints = (algo.keyPoints || []).slice(0, 4).map(item => `- ${htmlToPlainText(item)}`).join('\n');
  const detail = trimText(htmlToPlainText(algo.detail || ''), index < 2 ? 900 : 420);
  return [
    `${index + 1}. ${algo.name} | ${algo.fullName || ''} | ${algo.year} | ${catLabel} | ${algo.org || '未知机构'}`,
    `一句话总结：${trimText(algo.summary || '', 280)}`,
    algo.parent && algo.parent !== '—' ? `演进关系：改进自 ${algo.parent}` : '演进关系：奠基性算法',
    keyPoints ? `核心要点：\n${keyPoints}` : '',
    detail ? `深入细节摘录：${detail}` : ''
  ].filter(Boolean).join('\n');
}

function buildGraphContext(relevantIds) {
  const edges = (CFG.graph?.edges || []).filter(edge => relevantIds.has(edge.from) || relevantIds.has(edge.to));
  return edges.slice(0, 12).map(edge => `- ${edge.from} -> ${edge.to}${edge.label ? ` (${edge.label})` : ''}`).join('\n');
}

function buildPageContextPrompt(question) {
  const relevantAlgos = rankRelevantAlgos(question);
  const relevantIds = new Set(relevantAlgos.map(algo => algo.id));
  const overviewText = trimText((CFG.overview || []).map(sec => htmlToPlainText(sec.body_html)).join('\n'), 2200);
  const latestOverviewText = trimText((CFG.latest_overview || []).map(sec => htmlToPlainText(sec.body_html)).join('\n'), 2200);
  const categoriesText = Object.entries(CATEGORIES).map(([key, value]) => `- ${key}: ${value.label}`).join('\n');
  const algosText = relevantAlgos.map((algo, index) => buildAlgoContext(algo, index)).join('\n\n');
  const graphText = buildGraphContext(relevantIds);

  return [
    '[页面主题]',
    `主题：${CFG.meta.page_title}`,
    `领域：${CFG.meta.domain}`,
    `说明：${CFG.meta.page_desc || '无'}`,
    '',
    '[类别]',
    categoriesText || '无',
    '',
    '[领域综述]',
    overviewText || '无',
    '',
    '[最新进展综述]',
    latestOverviewText || '无',
    '',
    '[与当前问题最相关的算法]',
    algosText || '无',
    '',
    '[相关图谱关系]',
    graphText || '无'
  ].join('\n');
}

function buildChatMessages(question) {
  const systemPrompt = [
    '你是当前知识页面的学习客服。',
    '你的任务是帮助用户学习本页内容，而不是泛泛闲聊。',
    '要求：',
    '- 优先严格依据提供的页面上下文回答。',
    '- 如果页面上下文不足以支持结论，明确说“本页没有足够信息支持这个问题”。',
    '- 默认用中文回答。',
    '- 优先解释概念、区别、联系、演进脉络和学习路径。',
    '- 回答尽量采用这个结构：先直接回答，再解释原因，最后建议用户下一步看本页哪个算法或板块。',
    '- 不要编造论文结论、实验数字、公式或页面里不存在的事实。'
  ].join('\n');

  const history = CHAT_STATE.history.slice(-6).map(item => ({
    role: item.role,
    content: item.content
  }));

  return [
    { role: 'system', content: systemPrompt },
    { role: 'system', content: buildPageContextPrompt(question) },
    ...history,
    { role: 'user', content: question }
  ];
}

function extractAssistantContent(payload) {
  const content = payload?.choices?.[0]?.message?.content;
  if (typeof content === 'string') return content.trim();
  if (Array.isArray(content)) {
    return content.map(part => {
      if (typeof part === 'string') return part;
      if (typeof part?.text === 'string') return part.text;
      return '';
    }).join('\n').trim();
  }
  return '';
}

function extractApiError(payload, fallbackStatus) {
  if (payload?.error?.message) return payload.error.message;
  if (payload?.message) return payload.message;
  return `请求失败（HTTP ${fallbackStatus}）`;
}

async function requestPageChat(messages) {
  const endpoint = resolveChatEndpoint(CHAT_STATE.config.base);
  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${CHAT_STATE.config.key}`
    },
    body: JSON.stringify({
      model: CHAT_STATE.config.model,
      messages
    })
  });

  let payload = null;
  try {
    payload = await response.json();
  } catch (_) {
    payload = null;
  }
  if (!response.ok) {
    throw new Error(extractApiError(payload, response.status));
  }
  const text = extractAssistantContent(payload);
  if (!text) throw new Error('模型返回为空。请检查模型名、API Base 或服务商兼容性。');
  return text;
}

async function sendChatMessage() {
  const els = getChatEls();
  if (!els.input || CHAT_STATE.sending || !isChatConfigured()) return;
  const question = els.input.value.trim();
  if (!question) return;

  appendChatMessage('user', question);
  els.input.value = '';
  CHAT_STATE.sending = true;
  renderChatStatus();
  const pending = appendChatMessage('bot', '正在整理本页知识并思考…');

  try {
    const messages = buildChatMessages(question);
    const answer = await requestPageChat(messages);
    if (pending) pending.innerHTML = renderChatText(answer);
    CHAT_STATE.history.push({ role: 'user', content: question });
    CHAT_STATE.history.push({ role: 'assistant', content: answer });
  } catch (error) {
    const msg = `调用失败：${error.message || error}。如果你使用的是纯静态 GitHub Pages，请确认目标 API 允许浏览器直连（CORS），并检查 API Base / Key / Model 是否正确。`;
    if (pending) {
      pending.className = 'kb-chat-msg kb-chat-msg-error';
      pending.innerHTML = renderChatText(msg);
    } else {
      appendChatMessage('error', msg);
    }
  } finally {
    CHAT_STATE.sending = false;
    renderChatStatus();
    if (!els.input.disabled) els.input.focus();
  }
}

function initChatWidget() {
  const els = getChatEls();
  if (!els.messages) return;
  syncChatConfigForm();
  renderChatStatus();

  if (els.save) {
    els.save.onclick = () => {
      CHAT_STATE.config = {
        base: normalizeChatBase(els.base?.value || CHAT_DEFAULT_CONFIG.base),
        key: String(els.key?.value || '').trim(),
        model: String(els.model?.value || CHAT_DEFAULT_CONFIG.model).trim()
      };
      saveChatConfig();
      CHAT_STATE.settingsOpen = false;
      toggleChatSettings(false);
      renderChatStatus();
      appendChatMessage('bot', `配置已保存。后续回答将结合“${CFG.meta.page_title}”这一页的知识内容。`);
    };
  }

  if (els.clear) {
    els.clear.onclick = () => {
      clearChatConfig();
      syncChatConfigForm();
      toggleChatSettings(true);
      renderChatStatus();
      appendChatMessage('bot', '已清空本地 API 配置。请重新填写后再继续提问。');
    };
  }

  if (els.send) {
    els.send.onclick = () => sendChatMessage();
  }

  if (els.input) {
    els.input.addEventListener('keydown', event => {
      if (event.key === 'Enter' && !event.shiftKey) {
        event.preventDefault();
        sendChatMessage();
      }
    });
  }
}

/* ============ 10. KaTeX ============ */
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

/* ============ 11. Init ============ */
renderTimeline();
renderAlgos();

// 初始状态：两个视图都隐藏（由 CSS 默认隐藏），展示视图选择屏
document.addEventListener('DOMContentLoaded', () => {
  // 支持 URL hash 直达视图，方便用户分享/刷新
  const hash = (location.hash || '').replace('#','').trim();
  if (hash === 'overview' || hash === 'progress') {
    enterView(hash);
  }
  initChatWidget();
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
document.addEventListener('fullscreenchange', () => {
  const container = document.getElementById('graph-container');
  if (!container) return;
  updateGraphFullscreenButton(container);
  const vo = document.getElementById('view-overview');
  if (vo && vo.style.display !== 'none') {
    setTimeout(renderGraph, 40);
  }
});
