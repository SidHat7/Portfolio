(function () {
  'use strict';

  /* ── Menu mobile ── */
  const toggle = document.querySelector('.nav-toggle');
  const menu = document.getElementById('nav-menu');
  if (toggle && menu) {
    toggle.addEventListener('click', () => {
      const open = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', String(!open));
      toggle.setAttribute('aria-label', open ? 'Ouvrir le menu' : 'Fermer le menu');
      menu.classList.toggle('open', !open);
    });
    menu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
      toggle.setAttribute('aria-expanded', 'false');
      toggle.setAttribute('aria-label', 'Ouvrir le menu');
      menu.classList.remove('open');
    }));
  }

  /* ── Page CV : une carte par CV, boutons actifs seulement si le PDF existe ── */
  const cvCards = document.querySelectorAll('.cv-card[data-file]');
  if (cvCards.length) {
    const preview = document.getElementById('cv-preview');
    const frame = preview.querySelector('iframe');
    const previewTitle = document.getElementById('cv-preview-title');
    const wide = matchMedia('(min-width: 901px)');
    let shown = false;

    const showPreview = (card) => {
      if (!wide.matches) return;
      cvCards.forEach(c => c.classList.toggle('is-selected', c === card));
      frame.src = card.dataset.file + '#view=FitH';
      previewTitle.textContent = card.querySelector('h2').textContent;
      preview.hidden = false;
    };

    cvCards.forEach(card => {
      const file = card.dataset.file;
      const actions = document.createElement('div');
      actions.className = 'cv-actions';
      card.appendChild(actions);

      fetch(file, { method: 'HEAD', cache: 'no-store' })
        .then(r => { if (!r.ok) throw new Error(); })
        .then(() => {
          const dl = document.createElement('a');
          dl.className = 'btn btn-primary';
          dl.href = file;
          dl.setAttribute('download', card.dataset.download);
          dl.innerHTML = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 3v12"/><path d="m7 10 5 5 5-5"/><path d="M5 21h14"/></svg>';
          dl.appendChild(document.createTextNode(' Télécharger'));
          const open = document.createElement('a');
          open.className = 'btn btn-ghost';
          open.href = file; open.target = '_blank'; open.rel = 'noopener';
          open.textContent = 'Ouvrir ↗';
          actions.append(dl, open);
          if (wide.matches) {
            const pv = document.createElement('button');
            pv.type = 'button';
            pv.className = 'btn btn-ghost';
            pv.textContent = 'Aperçu';
            pv.addEventListener('click', () => { showPreview(card); preview.scrollIntoView({ behavior: 'smooth', block: 'start' }); });
            actions.appendChild(pv);
          }
          if (!shown && card.classList.contains('is-main')) { shown = true; showPreview(card); }
        })
        .catch(() => {
          const p = document.createElement('p');
          p.className = 'cv-missing';
          p.textContent = 'Bientôt disponible.';
          actions.appendChild(p);
        });
    });
  }

  /* ── Projets ── */
  const PROJECTS = window.PROJECTS || [];
  const CATS = window.PROJECT_CATS || {};

  function el(tag, cls, text) {
    const e = document.createElement(tag);
    if (cls) e.className = cls;
    if (text !== undefined) e.textContent = text;
    return e;
  }

  function card(p) {
    const btn = el('button', 'project-card reveal');
    btn.type = 'button';
    btn.dataset.cats = p.cats.join(' ');
    btn.setAttribute('aria-haspopup', 'dialog');
    const cats = el('div', 'pc-cats');
    p.cats.forEach(c => cats.appendChild(el('span', 'pc-cat', CATS[c] || c)));
    btn.appendChild(cats);
    btn.appendChild(el('h3', 'pc-title', p.title));
    btn.appendChild(el('p', 'pc-summary', p.summary));
    const tags = el('ul', 'tag-list tag-list-sm');
    p.tags.slice(0, 5).forEach(t => tags.appendChild(el('li', '', t)));
    btn.appendChild(tags);
    btn.appendChild(el('span', 'pc-more', 'Voir le détail →'));
    btn.addEventListener('click', () => openProject(p));
    return btn;
  }

  /* Modale (élément <dialog>) */
  let dialog = null;
  function ensureDialog() {
    if (dialog) return dialog;
    dialog = el('dialog', 'project-dialog');
    dialog.setAttribute('aria-labelledby', 'pd-title');
    dialog.addEventListener('click', e => { if (e.target === dialog) dialog.close(); });
    dialog.addEventListener('close', () => document.body.classList.remove('no-scroll'));
    document.body.appendChild(dialog);
    return dialog;
  }

  function diagram() {
    const wrap = el('figure', 'pd-diagram');
    const steps = [
      ['Sources', 'Réseau · hôtes · services'],
      ['Collecte', 'Snort · AIDE · Nagios'],
      ['Corrélation', 'SIEM OSSIM'],
      ['Réponse', 'Alertes · analyse · remédiation']
    ];
    const flow = el('ol', 'flow');
    steps.forEach(([t, d]) => {
      const li = el('li');
      li.appendChild(el('strong', '', t));
      li.appendChild(el('span', '', d));
      flow.appendChild(li);
    });
    wrap.appendChild(flow);
    wrap.appendChild(el('figcaption', '', 'Architecture de la chaîne de détection'));
    return wrap;
  }

  function openProject(p) {
    const d = ensureDialog();
    d.replaceChildren();
    const head = el('div', 'pd-head');
    head.appendChild(el('p', 'pd-context', p.context));
    const close = el('button', 'pd-close', '✕');
    close.type = 'button';
    close.setAttribute('aria-label', 'Fermer');
    close.addEventListener('click', () => d.close());
    head.appendChild(close);
    d.appendChild(head);

    const body = el('div', 'pd-body');
    const h = el('h2', 'pd-title', p.title);
    h.id = 'pd-title';
    body.appendChild(h);
    body.appendChild(el('p', 'pd-summary', p.summary));
    if (p.diagram) body.appendChild(diagram());
    body.appendChild(el('h3', 'pd-sub', 'Ce que j\'ai réalisé'));
    const ul = el('ul', 'pd-list');
    p.did.forEach(x => ul.appendChild(el('li', '', x)));
    body.appendChild(ul);
    if (p.parts && p.parts.length) {
      body.appendChild(el('h3', 'pd-sub', 'Ateliers regroupés'));
      const parts = el('ul', 'tag-list tag-list-outline');
      p.parts.forEach(x => parts.appendChild(el('li', '', x)));
      body.appendChild(parts);
    }
    body.appendChild(el('h3', 'pd-sub', 'Technologies'));
    const tags = el('ul', 'tag-list');
    p.tags.forEach(t => tags.appendChild(el('li', '', t)));
    body.appendChild(tags);
    if (p.repo) {
      const a = el('a', 'btn btn-ghost pd-repo', 'Voir le dépôt GitHub ↗');
      a.href = p.repo; a.target = '_blank'; a.rel = 'noopener';
      body.appendChild(a);
    }
    d.appendChild(body);
    document.body.classList.add('no-scroll');
    d.showModal();
    close.focus();
  }

  // Accueil : projets phares
  const featured = document.getElementById('featured-projects');
  if (featured) {
    const limit = parseInt(featured.dataset.limit, 10) || 3;
    PROJECTS.filter(p => p.featured).slice(0, limit).forEach(p => featured.appendChild(card(p)));
  }

  // Page projets
  const mainGrid = document.getElementById('projects-main');
  const otherGrid = document.getElementById('projects-other');
  const filters = document.getElementById('filters');
  if (mainGrid && otherGrid) {
    PROJECTS.forEach(p => (p.featured ? mainGrid : otherGrid).appendChild(card(p)));
    document.getElementById('count-main').textContent = PROJECTS.filter(p => p.featured).length;
    document.getElementById('count-other').textContent = PROJECTS.filter(p => !p.featured).length;
  }
  if (filters) {
    const all = el('button', 'filter is-active', 'Tous');
    all.type = 'button'; all.dataset.cat = 'all';
    all.setAttribute('aria-pressed', 'true');
    filters.appendChild(all);
    Object.entries(CATS).forEach(([k, v]) => {
      const b = el('button', 'filter', v);
      b.type = 'button'; b.dataset.cat = k;
      b.setAttribute('aria-pressed', 'false');
      filters.appendChild(b);
    });
    filters.addEventListener('click', e => {
      const b = e.target.closest('.filter');
      if (!b) return;
      filters.querySelectorAll('.filter').forEach(f => {
        const on = f === b;
        f.classList.toggle('is-active', on);
        f.setAttribute('aria-pressed', String(on));
      });
      const cat = b.dataset.cat;
      document.querySelectorAll('.project-card').forEach(c => {
        c.hidden = !(cat === 'all' || c.dataset.cats.split(' ').includes(cat));
      });
      document.querySelectorAll('.projects-block').forEach(block => {
        block.hidden = !block.querySelector('.project-card:not([hidden])');
      });
    });
  }

  /* ── Apparition au défilement ── */
  const reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const obs = new IntersectionObserver(entries => entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); }
    }), { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });
    reveals.forEach(r => obs.observe(r));
  } else {
    reveals.forEach(r => r.classList.add('visible'));
  }

  /* ── Formulaire de contact (Formspree) ── */
  const form = document.getElementById('contact-form');
  if (form) {
    const btn = document.getElementById('cf-btn');
    const status = document.getElementById('cf-status');
    const label = btn.textContent;
    const setStatus = (msg, type) => { status.textContent = msg; status.dataset.type = type || ''; };

    form.addEventListener('submit', async e => {
      e.preventDefault();
      const f = form.elements;
      const name = f.namedItem('name').value.trim();
      const email = f.namedItem('email').value.trim();
      const message = f.namedItem('message').value.trim();
      if (!name || !email || !message) { setStatus('Merci de remplir tous les champs.', 'error'); return; }
      if (!f.namedItem('email').checkValidity()) { setStatus('Adresse email invalide.', 'error'); return; }

      btn.disabled = true;
      btn.textContent = 'Envoi en cours…';
      setStatus('');
      try {
        const r = await fetch(form.action, {
          method: 'POST',
          headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
          body: JSON.stringify({ name, email, message })
        });
        if (!r.ok) throw new Error('HTTP ' + r.status);
        form.reset();
        setStatus('Message envoyé, merci ! Je vous réponds rapidement.', 'ok');
      } catch (err) {
        setStatus("L'envoi a échoué. Écrivez-moi directement à sidikdiomande00@gmail.com.", 'error');
      } finally {
        btn.disabled = false;
        btn.textContent = label;
      }
    });
  }
})();
