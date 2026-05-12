/* PM204 — La Aventura del Programador Móvil */
(function () {
  'use strict';

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // ─── Three.js Ember Particles ──────────────────────────────────────────────
  function initParticles() {
    var canvas = document.getElementById('bg-canvas');
    if (!canvas || typeof THREE === 'undefined') return;

    var renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.setSize(window.innerWidth, window.innerHeight);

    var scene  = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 200);
    camera.position.z = 6;

    // Layer 1: main embers
    var N1 = reduceMotion ? 60 : 260;
    var p1 = new Float32Array(N1 * 3);
    var v1 = new Float32Array(N1);
    var d1 = new Float32Array(N1);

    function spawnEmber(i) {
      p1[i * 3]     = (Math.random() - 0.5) * 28;
      p1[i * 3 + 1] = Math.random() * -24 - 2;
      p1[i * 3 + 2] = (Math.random() - 0.5) * 8;
      v1[i]          = 0.003 + Math.random() * 0.007;
      d1[i]          = Math.random() * 120;
    }

    for (var i = 0; i < N1; i++) {
      spawnEmber(i);
      p1[i * 3 + 1] = (Math.random() - 0.5) * 24;
    }

    var g1 = new THREE.BufferGeometry();
    g1.setAttribute('position', new THREE.BufferAttribute(p1, 3));

    var m1 = new THREE.PointsMaterial({
      size: 0.05, sizeAttenuation: true,
      color: new THREE.Color(0xc9a84c),
      transparent: true, opacity: 0.45,
      depthWrite: false, blending: THREE.AdditiveBlending,
    });
    scene.add(new THREE.Points(g1, m1));

    // Layer 2: bright sparks
    var N2 = reduceMotion ? 10 : 45;
    var p2 = new Float32Array(N2 * 3);
    var v2 = new Float32Array(N2);
    var d2 = new Float32Array(N2);

    function spawnSpark(i) {
      p2[i * 3]     = (Math.random() - 0.5) * 22;
      p2[i * 3 + 1] = Math.random() * -22 - 2;
      p2[i * 3 + 2] = (Math.random() - 0.5) * 5;
      v2[i]          = 0.006 + Math.random() * 0.011;
      d2[i]          = Math.random() * 120;
    }

    for (var j = 0; j < N2; j++) {
      spawnSpark(j);
      p2[j * 3 + 1] = (Math.random() - 0.5) * 22;
    }

    var g2 = new THREE.BufferGeometry();
    g2.setAttribute('position', new THREE.BufferAttribute(p2, 3));

    var m2 = new THREE.PointsMaterial({
      size: 0.13, sizeAttenuation: true,
      color: new THREE.Color(0xf0c060),
      transparent: true, opacity: 0.65,
      depthWrite: false, blending: THREE.AdditiveBlending,
    });
    scene.add(new THREE.Points(g2, m2));

    window.addEventListener('resize', function () {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    });

    // Subtle mouse parallax on the particle field
    var mouseTargetX = 0, mouseTargetY = 0;
    if (!reduceMotion) {
      document.addEventListener('mousemove', function (e) {
        mouseTargetX = (e.clientX / window.innerWidth  - 0.5) * 0.6;
        mouseTargetY = (e.clientY / window.innerHeight - 0.5) * 0.3;
      });
    }

    var t = 0;
    function tick() {
      requestAnimationFrame(tick);
      if (!reduceMotion) {
        t += 0.016;
        // Lerp camera toward mouse for parallax depth
        camera.position.x += (mouseTargetX - camera.position.x) * 0.025;
        camera.position.y += (-mouseTargetY - camera.position.y) * 0.025;
      }

      for (var ii = 0; ii < N1; ii++) {
        p1[ii * 3 + 1] += v1[ii];
        p1[ii * 3]     += Math.sin(t * 0.55 + d1[ii]) * 0.0012;
        if (p1[ii * 3 + 1] > 14) spawnEmber(ii);
      }
      g1.attributes.position.needsUpdate = true;

      for (var jj = 0; jj < N2; jj++) {
        p2[jj * 3 + 1] += v2[jj];
        p2[jj * 3]     += Math.sin(t * 0.75 + d2[jj]) * 0.0018;
        if (p2[jj * 3 + 1] > 14) spawnSpark(jj);
      }
      g2.attributes.position.needsUpdate = true;

      renderer.render(scene, camera);
    }

    tick();
  }

  // ─── Hero Entrance ─────────────────────────────────────────────────────────
  function playHeroEntrance() {
    if (typeof gsap === 'undefined') return;

    // Set initial hidden state before animating in
    gsap.set('.hero-eyebrow', { opacity: 0, y: -16 });
    gsap.set('.title-line-1', { opacity: 0, y: 24 });
    gsap.set('.title-line-2', { opacity: 0, y: 32, scale: 0.97 });
    gsap.set('.hero-divider', { scaleX: 0 });
    gsap.set('.hero-lore',    { opacity: 0, y: 18 });
    gsap.set('.hero-meta',    { opacity: 0 });
    gsap.set('#begin-btn',    { opacity: 0, y: 14, scale: 0.96 });
    gsap.set('.ring-1',       { opacity: 0, scale: 0.55 });
    gsap.set('.ring-2',       { opacity: 0, scale: 0.55 });
    gsap.set('.ring-3',       { opacity: 0, scale: 0.55 });

    if (reduceMotion) {
      gsap.set('.hero-eyebrow, .title-line-1, .title-line-2, .hero-lore, .hero-meta, #begin-btn', { clearProps: 'all' });
      gsap.set('.hero-divider', { scaleX: 1 });
      gsap.set('.ring-1', { opacity: 0.25, scale: 1 });
      gsap.set('.ring-2', { opacity: 0.15, scale: 1 });
      gsap.set('.ring-3', { opacity: 0.08, scale: 1 });
      return;
    }

    var tl = gsap.timeline({ delay: 0.1 });
    tl.to('.ring-1',     { opacity: 0.25, scale: 1, duration: 2.5, ease: 'power3.out' }, 0)
      .to('.ring-2',     { opacity: 0.15, scale: 1, duration: 2.5, ease: 'power3.out' }, 0.25)
      .to('.ring-3',     { opacity: 0.08, scale: 1, duration: 2.5, ease: 'power3.out' }, 0.5)
      .to('.hero-eyebrow', { opacity: 1, y: 0, duration: 0.7, ease: 'power4.out' }, 0.2)
      .to('.title-line-1', { opacity: 1, y: 0, duration: 0.75, ease: 'power4.out' }, 0.4)
      .to('.title-line-2', { opacity: 1, y: 0, scale: 1, duration: 0.9, ease: 'power4.out' }, 0.55)
      .to('.hero-divider', { scaleX: 1, duration: 0.7, ease: 'power3.out', transformOrigin: 'center' }, 0.85)
      .to('.hero-lore',    { opacity: 1, y: 0, duration: 0.65, ease: 'power3.out' }, 0.95)
      .to('.hero-meta',    { opacity: 1, duration: 0.55, ease: 'power2.out' }, 1.1)
      .to('#begin-btn',    { opacity: 1, y: 0, scale: 1, duration: 0.7, ease: 'back.out(1.4)' }, 1.2);
  }

  // ─── LocalStorage State ────────────────────────────────────────────────────
  var STATE_KEY = 'pm204_v1';

  function loadState() {
    try { return JSON.parse(localStorage.getItem(STATE_KEY)) || {}; }
    catch (e) { return {}; }
  }

  function saveState(s) {
    try { localStorage.setItem(STATE_KEY, JSON.stringify(s)); } catch (e) {}
  }

  // ─── Progress Map ──────────────────────────────────────────────────────────
  function updateMap(highest) {
    for (var r = 1; r <= 4; r++) {
      var node = document.querySelector('.map-node[data-room="' + r + '"]');
      var path = document.getElementById('path-' + r + '-' + (r + 1));
      if (!node) continue;
      node.classList.remove('locked', 'active', 'unlocked');
      if (r < highest) {
        node.classList.add('unlocked');
        if (path) { path.classList.remove('locked'); path.classList.add('unlocked'); }
      } else if (r === highest) {
        node.classList.add('active');
      } else {
        node.classList.add('locked');
      }
    }
  }

  function wireMapNodes() {
    document.querySelectorAll('.map-node').forEach(function (node) {
      node.addEventListener('click', function () {
        var target = document.getElementById('room-' + node.dataset.room);
        if (target && !target.classList.contains('room-locked')) {
          target.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' });
        }
      });
    });
  }

  // ─── GSAP Scroll Reveals ───────────────────────────────────────────────────
  function initScrollAnimations() {
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;
    gsap.registerPlugin(ScrollTrigger);

    var dur     = reduceMotion ? 0.01 : 0.8;
    var durDense = reduceMotion ? 0.01 : 0.5;
    var stagger = reduceMotion ? 0 : 0.04;

    ScrollTrigger.batch('.room-frame', {
      onEnter: function (batch) {
        gsap.to(batch, { opacity: 1, y: 0, duration: dur, ease: 'power4.out' });
      },
      start: 'top 93%',
      once: true,
    });

    ScrollTrigger.batch('.rule-item, .oracle-card, .skill-node, .unit-item, .decree', {
      onEnter: function (batch) {
        gsap.to(batch, { opacity: 1, y: 0, duration: durDense, stagger: stagger, ease: 'power4.out' });
      },
      start: 'top 90%',
      once: true,
    });

    // Timeline items: alternate left/right entrance for cinematic depth
    document.querySelectorAll('.tl-item').forEach(function (item, idx) {
      var fromX = idx % 2 === 0 ? -30 : 30;
      gsap.fromTo(item,
        { opacity: 0, x: fromX, y: 12 },
        {
          opacity: 1, x: 0, y: 0,
          duration: reduceMotion ? 0.01 : 0.65,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: item,
            start: 'top 88%',
            once: true,
          },
        }
      );
    });

    ScrollTrigger.batch('#q-1-1, #q-2-1, #q-3-1, #q-4-1', {
      onEnter: function (batch) {
        gsap.to(batch, { opacity: 1, y: 0, duration: durDense, ease: 'power4.out' });
      },
      start: 'top 90%',
      once: true,
    });

    // Parallax: room headers drift slightly slower than the page
    if (!reduceMotion) {
      document.querySelectorAll('.room-header').forEach(function (header) {
        var room = header.closest('.room');
        if (!room) return;
        gsap.to(header, {
          scrollTrigger: {
            trigger: room,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.8,
          },
          y: -36,
          ease: 'none',
        });
      });

      // Lore boxes: subtle counter-parallax (float slightly forward)
      document.querySelectorAll('.lore-box').forEach(function (box) {
        gsap.to(box, {
          scrollTrigger: {
            trigger: box,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 2,
          },
          y: 14,
          ease: 'none',
        });
      });
    }
  }

  // ─── Room Unlock ──────────────────────────────────────────────────────────
  function unlockRoom(roomNum, animate) {
    var room = document.getElementById('room-' + roomNum);
    var lock = document.getElementById('lock-' + roomNum);
    if (!room) return;

    room.classList.remove('room-locked');

    if (animate && typeof gsap !== 'undefined') {
      // Gold flash across the viewport
      if (!reduceMotion) {
        var flash = document.createElement('div');
        flash.style.cssText = [
          'position:fixed', 'inset:0',
          'background:radial-gradient(ellipse at center,rgba(201,168,76,0.22) 0%,transparent 65%)',
          'pointer-events:none', 'z-index:500',
        ].join(';');
        document.body.appendChild(flash);
        gsap.to(flash, {
          opacity: 0, duration: 1.1, ease: 'power3.out',
          onComplete: function () { flash.parentNode && flash.parentNode.removeChild(flash); },
        });

        // Room frame entrance scale
        var frame = room.querySelector('.room-frame');
        if (frame) {
          gsap.fromTo(frame, { scale: 0.97 }, { scale: 1, duration: 0.9, ease: 'power4.out' });
        }
      }

      if (lock) {
        gsap.to(lock, {
          opacity: 0, duration: 0.5, ease: 'power2.in',
          onComplete: function () { lock.style.display = 'none'; },
        });
      }

      setTimeout(function () {
        room.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' });
        if (ScrollTrigger) ScrollTrigger.refresh();
      }, reduceMotion ? 50 : 520);
    } else {
      if (lock) lock.style.display = 'none';
    }
  }

  // ─── Quiz: visually restore an already-answered question ──────────────────
  function restoreCorrect(card) {
    var correct = card.dataset.correct;
    card.classList.add('q-correct');
    card.querySelectorAll('.opt').forEach(function (o) {
      o.setAttribute('disabled', '');
      o.classList.add(o.dataset.val === correct ? 'opt-correct' : 'opt-dim');
    });
    var fb = card.querySelector('.q-feedback');
    if (fb) { fb.textContent = 'Correcto. Has demostrado tu conocimiento.'; fb.className = 'q-feedback correct'; }
    if (typeof gsap !== 'undefined') gsap.set(card, { opacity: 1, y: 0 });
  }

  // ─── Quiz: wire option buttons for one question card ──────────────────────
  function wireQuestion(card, onCorrect) {
    var correct = card.dataset.correct;
    card.querySelectorAll('.opt').forEach(function (btn) {
      btn.addEventListener('click', function () {
        if (card.classList.contains('q-correct')) return;
        var opts = card.querySelectorAll('.opt');
        opts.forEach(function (o) { o.setAttribute('disabled', ''); });

        var fb = card.querySelector('.q-feedback');

        if (btn.dataset.val === correct) {
          btn.classList.add('opt-correct');
          opts.forEach(function (o) { if (o !== btn) o.classList.add('opt-dim'); });
          card.classList.add('q-correct');
          if (fb) { fb.textContent = 'Correcto. Has demostrado tu conocimiento.'; fb.className = 'q-feedback correct'; }
          onCorrect();
        } else {
          btn.classList.add('opt-wrong');
          if (fb) { fb.textContent = 'Incorrecto. Estudia el pergamino e inténtalo de nuevo.'; fb.className = 'q-feedback wrong'; }
          setTimeout(function () {
            opts.forEach(function (o) { o.removeAttribute('disabled'); });
            btn.classList.remove('opt-wrong');
            if (fb) { fb.textContent = ''; fb.className = 'q-feedback'; }
          }, 1100);
        }
      });
    });
  }

  // ─── Quiz: full room setup (restore + wire) ────────────────────────────────
  function setupRoom(roomNum, state) {
    var q1   = document.getElementById('q-' + roomNum + '-1');
    var q2   = document.getElementById('q-' + roomNum + '-2');
    var seal = document.getElementById('seal-' + roomNum);
    var chk  = document.getElementById('commit-' + roomNum);
    if (!q1 || !q2 || !seal || !chk) return;

    var rs = state['r' + roomNum] || {};

    if (rs.q1) restoreCorrect(q1);

    if (rs.q1) {
      q2.classList.remove('q-locked');
      if (typeof gsap !== 'undefined') gsap.set(q2, { opacity: 1, y: 0 });
    }

    if (rs.q2) restoreCorrect(q2);

    if (rs.q1 && rs.q2) seal.classList.remove('hidden');

    if (rs.sealed) chk.checked = true;

    // Wire Q1
    wireQuestion(q1, function () {
      state['r' + roomNum] = state['r' + roomNum] || {};
      state['r' + roomNum].q1 = true;
      saveState(state);

      q2.classList.remove('q-locked');
      if (typeof gsap !== 'undefined') {
        gsap.fromTo(q2,
          { opacity: 0, y: 18 },
          { opacity: 1, y: 0, duration: reduceMotion ? 0.01 : 0.55, ease: 'power4.out' }
        );
      }
    });

    // Wire Q2
    wireQuestion(q2, function () {
      state['r' + roomNum] = state['r' + roomNum] || {};
      state['r' + roomNum].q2 = true;
      saveState(state);
      seal.classList.remove('hidden');
    });

    // Commitment seal
    chk.addEventListener('change', function () {
      if (!chk.checked) return;
      state['r' + roomNum] = state['r' + roomNum] || {};
      state['r' + roomNum].sealed = true;
      saveState(state);

      if (roomNum < 4) {
        unlockRoom(roomNum + 1, true);
        updateMap(roomNum + 1);
      } else {
        showVictory(state);
      }
    });
  }

  // ─── Victory Screen ────────────────────────────────────────────────────────
  function showVictory(state) {
    if (state) { state.victory = true; saveState(state); }
    var v = document.getElementById('victory');
    if (!v) return;
    v.classList.remove('hidden');

    if (typeof gsap !== 'undefined' && !reduceMotion) {
      gsap.from(v, { opacity: 0, duration: 1, ease: 'power3.out' });
      gsap.from('.victory-content', { y: 40, opacity: 0, duration: 1.1, ease: 'power4.out', delay: 0.15 });
      gsap.from('.v-ring-1', { scale: 0.3, opacity: 0, duration: 1.8, ease: 'power3.out', delay: 0.1 });
      gsap.from('.v-ring-2', { scale: 0.3, opacity: 0, duration: 2.2, ease: 'power3.out', delay: 0.3 });
      gsap.from('.badge', { scale: 0, opacity: 0, duration: 0.6, ease: 'back.out(1.8)', stagger: 0.12, delay: 0.6 });
    }

    setTimeout(function () {
      v.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'center' });
    }, 700);
  }

  // ─── Hero → Adventure Transition ─────────────────────────────────────────
  function startAdventure(state) {
    var hero      = document.getElementById('hero');
    var adventure = document.getElementById('adventure');
    var map       = document.getElementById('progress-map');

    var highest = 1;
    for (var r = 2; r <= 4; r++) {
      if (state['r' + (r - 1)] && state['r' + (r - 1)].sealed) highest = r;
    }
    updateMap(highest);
    wireMapNodes();

    if (hero && typeof gsap !== 'undefined') {
      gsap.to(hero, {
        opacity: 0,
        duration: reduceMotion ? 0.01 : 0.65,
        ease: 'power3.in',
        onComplete: function () {
          hero.classList.add('hidden');
          adventure.classList.remove('hidden');
          map.classList.remove('hidden');
          // Init scroll animations AFTER adventure is visible and hero is gone
          requestAnimationFrame(function () {
            requestAnimationFrame(function () {
              initScrollAnimations();
              if (typeof ScrollTrigger !== 'undefined') ScrollTrigger.refresh();
            });
          });
        },
      });
    } else {
      if (hero) hero.classList.add('hidden');
      adventure.classList.remove('hidden');
      map.classList.remove('hidden');
      initScrollAnimations();
    }
  }

  // ─── Boot ──────────────────────────────────────────────────────────────────
  function boot() {
    initParticles();

    // Clear progress on every load so the quiz starts fresh
    try { localStorage.removeItem(STATE_KEY); } catch (e) {}

    var state = loadState();

    for (var r = 1; r <= 4; r++) setupRoom(r, state);

    for (var rr = 2; rr <= 4; rr++) {
      if (state['r' + (rr - 1)] && state['r' + (rr - 1)].sealed) {
        unlockRoom(rr, false);
      }
    }

    // Always show hero on load — progress is silently restored
    if (typeof gsap !== 'undefined') playHeroEntrance();

    var btn = document.getElementById('begin-btn');
    if (btn) {
      btn.addEventListener('click', function () {
        state.started = true;
        saveState(state);
        startAdventure(state);
      });
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
