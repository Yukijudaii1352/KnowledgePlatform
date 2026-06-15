(function () {
  const THEME_KEY = 'kp_theme_v1';
  const reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const finePointer = window.matchMedia && window.matchMedia('(pointer: fine)').matches;

  function readStoredTheme() {
    try {
      const value = window.localStorage.getItem(THEME_KEY);
      return value === 'light' || value === 'dark' ? value : '';
    } catch (_) {
      return '';
    }
  }

  function writeStoredTheme(theme) {
    try {
      window.localStorage.setItem(THEME_KEY, theme);
    } catch (_) {}
  }

  function setTheme(theme, persist) {
    const next = theme === 'light' ? 'light' : 'dark';
    document.documentElement.dataset.theme = next;
    document.documentElement.style.colorScheme = next;
    document.querySelectorAll('.theme-toggle').forEach((button) => {
      button.setAttribute('aria-pressed', next === 'light' ? 'true' : 'false');
      button.setAttribute('title', next === 'light' ? '切换到夜晚主题' : '切换到白天主题');
    });
    if (persist) writeStoredTheme(next);
  }

  function ensureTheme() {
    const current = document.documentElement.dataset.theme;
    setTheme(current === 'light' || current === 'dark' ? current : (readStoredTheme() || 'dark'), false);
  }

  function initThemeToggle() {
    const topbar = document.querySelector('.topbar-inner');
    if (!topbar || topbar.querySelector('.theme-toggle')) return;

    let nav = topbar.querySelector('.nav-links');
    if (!nav) {
      nav = document.createElement('nav');
      nav.className = 'nav-links';
      topbar.appendChild(nav);
    }

    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'theme-toggle';
    button.setAttribute('aria-label', '切换白天/夜晚主题');
    button.innerHTML = '<span class="theme-toggle-track" aria-hidden="true"><span class="theme-toggle-thumb"></span></span>';
    button.addEventListener('click', () => {
      const current = document.documentElement.dataset.theme === 'light' ? 'light' : 'dark';
      setTheme(current === 'light' ? 'dark' : 'light', true);
    });
    nav.appendChild(button);
    setTheme(document.documentElement.dataset.theme || 'dark', false);

    window.addEventListener('storage', (event) => {
      if (event.key === THEME_KEY && (event.newValue === 'light' || event.newValue === 'dark')) {
        setTheme(event.newValue, false);
      }
    });
  }

  function initCursorGlow() {
    if (!finePointer) return;
    window.addEventListener('pointermove', (event) => {
      document.documentElement.style.setProperty('--cursor-x', event.clientX + 'px');
      document.documentElement.style.setProperty('--cursor-y', event.clientY + 'px');
    }, { passive: true });
  }

  function initTechFxLayer() {
    if (document.querySelector('.tech-fx-layer')) return;
    const layer = document.createElement('div');
    layer.className = 'tech-fx-layer';
    layer.setAttribute('aria-hidden', 'true');

    const starCount = reduceMotion ? 36 : 76;
    for (let i = 0; i < starCount; i += 1) {
      const star = document.createElement('i');
      star.className = 'tech-fx-star';
      star.style.left = ((i * 73 + 13) % 100) + '%';
      star.style.top = ((i * 41 + 7) % 100) + '%';
      star.style.setProperty('--s', (i % 3 === 0 ? 2.4 : i % 3 === 1 ? 1.4 : 1.9) + 'px');
      star.style.setProperty('--tw', (3 + (i % 6)) + 's');
      star.style.setProperty('--dl', ((i % 8) * 0.35).toFixed(2) + 's');
      layer.appendChild(star);
    }

    if (!reduceMotion) {
      const beams = [
        { x: 10, d: 5.5, delay: 0.2 }, { x: 23, d: 7, delay: 1.4 },
        { x: 38, d: 6.2, delay: 2.5 }, { x: 55, d: 8.4, delay: 0.7 },
        { x: 72, d: 6.6, delay: 3.1 }, { x: 87, d: 7.6, delay: 1.9 }
      ];
      beams.forEach((item) => {
        const beam = document.createElement('i');
        beam.className = 'tech-fx-beam';
        beam.style.left = item.x + '%';
        beam.style.setProperty('--bd', item.d + 's');
        beam.style.setProperty('--bdl', item.delay + 's');
        layer.appendChild(beam);
      });

      for (let i = 0; i < 10; i += 1) {
        const packet = document.createElement('i');
        packet.className = 'tech-fx-packet' + (i % 2 ? ' is-rev' : '');
        packet.style.top = `calc(${2 + i * 2} * 44px - 1px)`;
        packet.style.setProperty('--pd', (6.5 + (i % 4) * 0.8).toFixed(1) + 's');
        packet.style.setProperty('--pdl', (0.6 + i * 0.65).toFixed(2) + 's');
        layer.appendChild(packet);
      }
    }

    const canvas = document.querySelector('.tech-dotfield');
    if (canvas && canvas.parentNode) canvas.insertAdjacentElement('afterend', layer);
    else document.body.prepend(layer);
  }

  function initDotField() {
    const canvas = document.querySelector('.tech-dotfield');
    if (!canvas || !canvas.getContext) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    const mouse = { x: -9999, y: -9999, active: false };
    let dots = [];
    let raf = 0;
    let running = false;
    let w = 0;
    let h = 0;
    let dpr = 1;

    function resize() {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = canvas.getBoundingClientRect();
      w = Math.max(1, Math.floor(rect.width));
      h = Math.max(1, Math.floor(rect.height));
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      buildDots();
      draw(0);
    }

    function buildDots() {
      const spacing = window.innerWidth < 720 ? 22 : 16;
      const padX = (w % spacing) / 2;
      const padY = (h % spacing) / 2;
      dots = [];
      for (let y = padY; y <= h; y += spacing) {
        for (let x = padX; x <= w; x += spacing) {
          dots.push({ x, y, seed: (x * 17 + y * 29) % 97 });
        }
      }
    }

    function draw(t) {
      ctx.clearRect(0, 0, w, h);
      const isLight = document.documentElement.dataset.theme === 'light';
      const gradient = ctx.createLinearGradient(0, 0, w, h);
      if (isLight) {
        gradient.addColorStop(0, 'rgba(14, 116, 180, 0.28)');
        gradient.addColorStop(0.52, 'rgba(37, 99, 235, 0.18)');
        gradient.addColorStop(1, 'rgba(20, 184, 166, 0.18)');
      } else {
        gradient.addColorStop(0, 'rgba(125, 211, 252, 0.36)');
        gradient.addColorStop(0.52, 'rgba(96, 165, 250, 0.24)');
        gradient.addColorStop(1, 'rgba(167, 139, 250, 0.28)');
      }
      ctx.fillStyle = gradient;

      ctx.beginPath();
      for (const dot of dots) {
        let x = dot.x;
        let y = dot.y;
        if (!reduceMotion && finePointer && mouse.active) {
          const dx = x - mouse.x;
          const dy = y - mouse.y;
          const dist = Math.hypot(dx, dy);
          if (dist < 260) {
            const push = Math.pow(1 - dist / 260, 2) * 58;
            const angle = Math.atan2(dy, dx);
            x += Math.cos(angle) * push;
            y += Math.sin(angle) * push;
          }
        }
        const wave = reduceMotion ? 0 : Math.sin(t * 0.0012 + dot.x * 0.012 + dot.y * 0.009) * 0.42;
        const r = Math.max(0.55, 0.95 + wave + (dot.seed % 7 === 0 ? 0.35 : 0));
        ctx.moveTo(x + r, y);
        ctx.arc(x, y, r, 0, Math.PI * 2);
      }
      ctx.fill();
    }

    function tick(t) {
      draw(t);
      if (!reduceMotion) raf = window.requestAnimationFrame(tick);
      else running = false;
    }

    function wake() {
      if (reduceMotion || running) return;
      running = true;
      raf = window.requestAnimationFrame(tick);
    }

    let resizeTimer = 0;
    window.addEventListener('resize', () => {
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(resize, 120);
    });
    if (finePointer && !reduceMotion) {
      window.addEventListener('mousemove', (event) => {
        const rect = canvas.getBoundingClientRect();
        mouse.x = event.clientX - rect.left;
        mouse.y = event.clientY - rect.top;
        mouse.active = mouse.x >= 0 && mouse.x <= rect.width && mouse.y >= 0 && mouse.y <= rect.height;
        wake();
      }, { passive: true });
      window.addEventListener('mouseleave', () => {
        mouse.active = false;
      });
    }
    resize();
    if (!reduceMotion) wake();
    window.addEventListener('pagehide', () => {
      if (raf) window.cancelAnimationFrame(raf);
    });
  }

  function initCounters() {
    if (reduceMotion) return;
    const nums = document.querySelectorAll('.hero-stat-num, .domain-readout-num');
    nums.forEach((el) => {
      const first = Array.from(el.childNodes).find((node) => node.nodeType === Node.TEXT_NODE || node.nodeType === Node.ELEMENT_NODE);
      const targetEl = first && first.nodeType === Node.ELEMENT_NODE ? first : el;
      const raw = (targetEl.textContent || '').trim();
      const match = raw.match(/^(\d+)(.*)$/);
      if (!match) return;
      const target = Number(match[1]);
      const suffix = match[2] || '';
      if (!Number.isFinite(target) || target <= 0) return;
      targetEl.textContent = '0' + suffix;
      let start = 0;
      const run = (ts) => {
        if (!start) start = ts;
        const p = Math.min(1, (ts - start) / 900);
        const eased = 1 - Math.pow(1 - p, 3);
        targetEl.textContent = String(Math.round(target * eased)) + suffix;
        if (p < 1) window.requestAnimationFrame(run);
        else targetEl.textContent = raw;
      };
      window.requestAnimationFrame(run);
    });
  }

  function initTiltCards() {
    if (!finePointer || reduceMotion) return;
    document.querySelectorAll('.domain-card, .topic-card, .view-card, .page-sidebar-card').forEach((card) => {
      card.addEventListener('pointermove', (event) => {
        const rect = card.getBoundingClientRect();
        const px = (event.clientX - rect.left) / rect.width;
        const py = (event.clientY - rect.top) / rect.height;
        card.style.setProperty('--mx', (px * 100).toFixed(1) + '%');
        card.style.setProperty('--my', (py * 100).toFixed(1) + '%');
        card.style.setProperty('--rx', (-(py - 0.5) * 4).toFixed(2) + 'deg');
        card.style.setProperty('--ry', ((px - 0.5) * 6).toFixed(2) + 'deg');
      });
      card.addEventListener('pointerleave', () => {
        card.style.setProperty('--rx', '0deg');
        card.style.setProperty('--ry', '0deg');
      });
    });
  }

  function initReveal() {
    if (reduceMotion || !('IntersectionObserver' in window)) return;
    const targets = document.querySelectorAll('.hero-console, .hero-main, .hero-visual, .domain-card, .topic-card, .page-header, .domain-readout, .section-heading, .page-hero, .view-card, .page-sidebar-card');
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        io.unobserve(entry.target);
      });
    }, { threshold: 0.1 });
    targets.forEach((el, index) => {
      el.classList.add('reveal-ready');
      el.style.setProperty('--reveal-delay', Math.min(index * 0.028, 0.32) + 's');
      io.observe(el);
    });
  }

  function initGlitchText() {
    if (reduceMotion) return;
    const targets = document.querySelectorAll('.home-page .hero h1 em, .domain-index-page .page-header h1, .topic-page .page-hero h1');
    targets.forEach((el, index) => {
      el.classList.add('tech-glitch-text');
      el.setAttribute('data-text', (el.textContent || '').trim());
      const pulse = () => {
        el.classList.remove('is-glitching');
        window.requestAnimationFrame(() => el.classList.add('is-glitching'));
        window.setTimeout(() => el.classList.remove('is-glitching'), 460);
      };
      window.setTimeout(pulse, 320 + index * 120);
      window.setInterval(pulse, 12000 + index * 900);
      el.addEventListener('pointerenter', pulse);
    });
  }

  function initClock() {
    const els = document.querySelectorAll('.hero-clock, .topic-clock');
    if (!els.length) return;
    const tick = () => {
      let value;
      try {
        value = 'UTC+8 ' + new Date().toLocaleTimeString('en-GB', {
          timeZone: 'Asia/Shanghai',
          hour12: false
        });
      } catch (_) {
        value = 'UTC+8 ' + new Date().toLocaleTimeString('en-GB', { hour12: false });
      }
      els.forEach((el) => {
        el.textContent = value;
      });
    };
    tick();
    window.setInterval(tick, 1000);
  }

  ensureTheme();
  document.addEventListener('DOMContentLoaded', () => {
    ensureTheme();
    initThemeToggle();
    initCursorGlow();
    initTechFxLayer();
    initDotField();
    initClock();
    initCounters();
    initTiltCards();
    initReveal();
    initGlitchText();
  });
})();
