/* PM204 — La Aventura del Programador Móvil */
(function () {
  'use strict';

  // ─── Three.js Ember Particles ──────────────────────────────────────────────
  function initParticles() {
    var canvas = document.getElementById('bg-canvas');
    if (!canvas || typeof THREE === 'undefined') return;

    var renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);

    var scene  = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 200);
    camera.position.z = 6;

    // ── Layer 1: main embers ────────────────────────────────────────────────
    var N1  = 260;
    var p1  = new Float32Array(N1 * 3);
    var v1  = new Float32Array(N1);
    var d1  = new Float32Array(N1);

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
      size: 0.05,
      sizeAttenuation: true,
      color: new THREE.Color(0xc9a84c),
      transparent: true,
      opacity: 0.45,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });

    scene.add(new THREE.Points(g1, m1));

    // ── Layer 2: bright sparks ──────────────────────────────────────────────
    var N2 = 45;
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
      size: 0.13,
      sizeAttenuation: true,
      color: new THREE.Color(0xf0c060),
      transparent: true,
      opacity: 0.65,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });

    scene.add(new THREE.Points(g2, m2));

    window.addEventListener('resize', function () {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    });

    var t = 0;
    function tick() {
      requestAnimationFrame(tick);
      t += 0.016;

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

  // ─── Map node click: scroll to room ────────────────────────────────────────
  function wireMapNodes() {
    document.querySelectorAll('.map-node').forEach(function (node) {
      node.addEventListener('click', function () {
        var target = document.getElementById('room-' + node.dataset.room);
        if (target && !target.classList.contains('room-locked')) {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    });
  }

  // ─── GSAP Scroll Reveals ───────────────────────────────────────────────────
  function initScrollAnimations() {
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;
    gsap.registerPlugin(ScrollTrigger);

    ScrollTrigger.batch('.room-frame', {
      onEnter: function (batch) {
        gsap.to(batch, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' });
      },
      start: 'top 93%',
      once: true,
    });

    ScrollTrigger.batch('.rule-item, .oracle-card, .tl-item, .skill-node, .unit-item', {
      onEnter: function (batch) {
        gsap.to(batch, { opacity: 1, y: 0, duration: 0.5, stagger: 0.055, ease: 'power2.out' });
      },
      start: 'top 90%',
      once: true,
    });

    // Q1 cards only — Q2 is revealed programmatically when Q1 is answered
    ScrollTrigger.batch('#q-1-1, #q-2-1, #q-3-1, #q-4-1', {
      onEnter: function (batch) {
        gsap.to(batch, { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' });
      },
      start: 'top 90%',
      once: true,
    });
  }

  // ─── Room Unlock ──────────────────────────────────────────────────────────
  function unlockRoom(roomNum, animate) {
    var room = document.getElementById('room-' + roomNum);
    var lock = document.getElementById('lock-' + roomNum);
    if (!room) return;

    room.classList.remove('room-locked');

    if (animate && lock && typeof gsap !== 'undefined') {
      gsap.to(lock, {
        opacity: 0,
        duration: 0.55,
        ease: 'power2.in',
        onComplete: function () { lock.style.display = 'none'; },
      });
      setTimeout(function () {
        room.scrollIntoView({ behavior: 'smooth', block: 'start' });
        if (ScrollTrigger) ScrollTrigger.refresh();
      }, 520);
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

    // Restore
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
          { opacity: 1, y: 0, duration: 0.55, ease: 'power2.out' }
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
    if (typeof gsap !== 'undefined') {
      gsap.from(v, { opacity: 0, duration: 0.9, ease: 'power2.out' });
    }
    setTimeout(function () {
      v.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 700);
  }

  // ─── Hero → Adventure ─────────────────────────────────────────────────────
  function startAdventure(state) {
    var hero      = document.getElementById('hero');
    var adventure = document.getElementById('adventure');
    var map       = document.getElementById('progress-map');

    adventure.classList.remove('hidden');
    map.classList.remove('hidden');

    if (hero && typeof gsap !== 'undefined') {
      gsap.to(hero, {
        opacity: 0, duration: 0.55,
        onComplete: function () { hero.classList.add('hidden'); },
      });
    } else if (hero) {
      hero.classList.add('hidden');
    }

    var highest = 1;
    for (var r = 2; r <= 4; r++) {
      if (state['r' + (r - 1)] && state['r' + (r - 1)].sealed) highest = r;
    }
    updateMap(highest);
    wireMapNodes();
    initScrollAnimations();
    if (typeof ScrollTrigger !== 'undefined') ScrollTrigger.refresh();
  }

  // ─── Boot ──────────────────────────────────────────────────────────────────
  function boot() {
    initParticles();

    var state = loadState();

    // Setup all room quizzes before unlocking (restores visual state)
    for (var r = 1; r <= 4; r++) setupRoom(r, state);

    // Restore room unlock states silently
    for (var rr = 2; rr <= 4; rr++) {
      if (state['r' + (rr - 1)] && state['r' + (rr - 1)].sealed) {
        unlockRoom(rr, false);
      }
    }

    if (state.started) {
      startAdventure(state);
      if (state.victory) showVictory(null);
    } else {
      var btn = document.getElementById('begin-btn');
      if (btn) {
        btn.addEventListener('click', function () {
          state.started = true;
          saveState(state);
          startAdventure(state);
        });
      }
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
