
  // ── TYPING ANIMATION ──
  const phrases = [
    'Ethical Hacker en formation...',
    'Passionné de Cybersécurité...',
    'Analyste Réseau junior...',
    'CTF Player / TryHackMe...',
    'Always learning, always hacking...'
  ];
  let pIdx = 0, cIdx = 0, deleting = false;
  const typingEl = document.getElementById('typingOut');

  function type() {
    const phrase = phrases[pIdx];
    if (!deleting) {
      typingEl.textContent = phrase.slice(0, ++cIdx);
      if (cIdx === phrase.length) { deleting = true; setTimeout(type, 2000); return; }
    } else {
      typingEl.textContent = phrase.slice(0, --cIdx);
      if (cIdx === 0) { deleting = false; pIdx = (pIdx + 1) % phrases.length; }
    }
    setTimeout(type, deleting ? 50 : 80);
  }
  type();

  // ── PARTICLES ──
  const pContainer = document.getElementById('particles');
  for (let i = 0; i < 30; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    const size = Math.random() * 3 + 1;
    p.style.cssText = `
      left: ${Math.random() * 100}%;
      width: ${size}px;
      height: ${size}px;
      animation-duration: ${Math.random() * 15 + 8}s;
      animation-delay: ${Math.random() * 10}s;
      --dx: ${(Math.random() - 0.5) * 200}px;
      opacity: ${Math.random() * 0.6 + 0.2};
      ${Math.random() > 0.5 ? 'background:#00ff9f;box-shadow:0 0 4px #00ff9f;' : ''}
    `;
    pContainer.appendChild(p);
  }

  // ── SCROLL PROGRESS BAR ──
  window.addEventListener('scroll', () => {
    const pct = window.scrollY / (document.body.scrollHeight - window.innerHeight);
    document.getElementById('progressBar').style.width = (pct * 100) + '%';
  });

  // ── REVEAL ON SCROLL ──
  const reveals = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
  }, { threshold: 0.1 });
  reveals.forEach(r => observer.observe(r));

  // ── SKILL BARS ──
  const barObserver = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        const fills = e.target.querySelectorAll('.skill-bar-fill');
        fills.forEach(f => {
          const pct = f.dataset.pct;
          f.style.setProperty('--pct', pct);
          f.style.transform = `scaleX(${pct})`;
          f.classList.add('animated');
        });
      }
    });
  }, { threshold: 0.3 });
  document.querySelectorAll('.skill-card').forEach(c => barObserver.observe(c));

  // ── CARD MOUSE GLOW ──
  document.querySelectorAll('.skill-card').forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      card.style.setProperty('--mx', x + '%');
      card.style.setProperty('--my', y + '%');
    });
  });

  // ── FORM ──
  document.querySelector('.form-submit').addEventListener('click', function() {
    this.textContent = '✓ MESSAGE ENVOYÉ';
    this.style.color = '#00ff9f';
    this.style.borderColor = '#00ff9f';
    setTimeout(() => {
      this.textContent = '▶ ENVOYER LE MESSAGE';
      this.style.color = '';
      this.style.borderColor = '';
    }, 3000);
  });
