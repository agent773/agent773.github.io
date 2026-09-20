// Portfolio lightbox
(function () {
  var lb = document.getElementById('lightbox');
  if (!lb) return;
  var buttons = Array.prototype.slice.call(document.querySelectorAll('.shotbtn'));
  var idx = 0;
  function render() {
    var b = buttons[idx];
    document.getElementById('lb-title').textContent = b.dataset.title;
    document.getElementById('lb-date').textContent = b.dataset.date;
    document.getElementById('lb-body').textContent = b.dataset.body;
    var img = document.getElementById('lb-img');
    img.src = b.dataset.image || '';
    img.alt = b.dataset.title;
    var specs = document.getElementById('lb-specs');
    specs.textContent = b.dataset.specs || '';
    specs.hidden = !b.dataset.specs;
  }
  var closeBtn = document.getElementById('lb-close');
  var opener = null;
  function open(i) {
    if (closing) return;
    idx = i;
    opener = buttons[i];
    render();
    lb.hidden = false;
    document.body.style.overflow = 'hidden';
    closeBtn.focus();
  }
  var closing = false;
  function finishClose() {
    lb.hidden = true;
    lb.classList.remove('lb-closing');
    closing = false;
    document.body.style.overflow = '';
    if (opener) opener.focus();
  }
  function close() {
    if (closing) return;
    if (reduceMotion.matches) { finishClose(); return; }
    closing = true;
    lb.classList.add('lb-closing');
    setTimeout(finishClose, 180);
  }
  var card = lb.querySelector('.lbcard');
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  var swapTimer = null;
  // Fade the card out, swap the content, then fade back in once the new photo has loaded.
  function step(d) {
    idx = (idx + d + buttons.length) % buttons.length;
    if (reduceMotion.matches) { render(); return; }
    var img = document.getElementById('lb-img');
    card.classList.add('lb-swap');
    clearTimeout(swapTimer);
    swapTimer = setTimeout(function () {
      var done = function () { card.classList.remove('lb-swap'); };
      img.onload = img.onerror = done;
      render();
      setTimeout(done, 800);
    }, 180);
  }
  buttons.forEach(function (b, i) {
    b.addEventListener('click', function () { open(i); });
  });
  closeBtn.addEventListener('click', close);
  lb.addEventListener('click', function (e) { if (e.target === lb) close(); });
  document.addEventListener('keydown', function (e) {
    if (lb.hidden) return;
    if (e.key === 'Escape') close();
    else if (e.key === 'ArrowLeft') step(-1);
    else if (e.key === 'ArrowRight') step(1);
  });
  document.getElementById('lb-prev').addEventListener('click', function () { step(-1); });
  document.getElementById('lb-next').addEventListener('click', function () { step(1); });
})();

// Discourage saving photos: no drag or right-click menu on images (text stays selectable)
(function () {
  function blockOnImage(e) { if (e.target.tagName === 'IMG') e.preventDefault(); }
  document.addEventListener('contextmenu', blockOnImage);
  document.addEventListener('dragstart', blockOnImage);
})();

// Light / dark theme
(function () {
  var btn = document.getElementById('theme-toggle');
  if (!btn) return;
  function apply(t) {
    document.body.dataset.theme = t;
    btn.textContent = t === 'dark' ? 'Light mode' : 'Dark mode';
  }
  apply(localStorage.getItem('prp-theme') || 'dark');
  btn.addEventListener('click', function () {
    var next = document.body.dataset.theme === 'dark' ? 'light' : 'dark';
    localStorage.setItem('prp-theme', next);
    apply(next);
  });
})();

// Contact email (stored base64-encoded in the HTML to avoid scrapers)
(function () {
  var a = document.getElementById('email-link');
  if (!a || !a.dataset.e) return;
  var addr = atob(a.dataset.e);
  a.href = 'mailto:' + addr;
  a.textContent = addr;
})();

// Fade transition when jumping to a section from the nav
(function () {
  var links = document.querySelectorAll('nav a[href^="#"]');
  var sections = document.querySelectorAll('section');
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
  var FADE_MS = 220;
  function jump(target) {
    window.scrollTo(0, target.getBoundingClientRect().top + window.pageYOffset);
    target.setAttribute('tabindex', '-1');
    target.focus({ preventScroll: true });
  }
  links.forEach(function (a) {
    a.addEventListener('click', function (e) {
      var target = document.querySelector(a.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      history.pushState(null, '', a.getAttribute('href'));
      if (reduce.matches) { jump(target); return; }
      sections.forEach(function (s) { s.classList.add('fade-out'); });
      setTimeout(function () {
        jump(target);
        sections.forEach(function (s) { s.classList.remove('fade-out'); });
      }, FADE_MS);
    });
  });
})
();