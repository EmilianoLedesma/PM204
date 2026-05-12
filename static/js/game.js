/* PM204 — La Aventura del Programador Móvil
   Pixel Art Engine · Dungeon Floor · Minimap · Sprites */
(function () {
  'use strict';

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // ══════════════════════════════════════════
  //  PIXEL ART ENGINE  (game-assets pattern)
  // ══════════════════════════════════════════

  // Dark fantasy palette — matches CSS custom properties
  var PAL = [
    null,       // 0  transparent
    0x090b12,   // 1  void
    0x131624,   // 2  stone dark
    0x1a1e30,   // 3  stone mid
    0x2a2e45,   // 4  stone light
    0xc9a84c,   // 5  ember/torch
    0xe8c060,   // 6  bright flame
    0x7a6028,   // 7  dim ember
    0x6e0e0e,   // 8  blood
    0x2a5824,   // 9  moss
    0xdeccaa,   // 10 parchment
    0x242840,   // 11 stone wall
  ];

  function px(pixels, scale) {
    var h = pixels.length, w = pixels[0].length;
    var c = document.createElement('canvas');
    c.width  = w * scale;
    c.height = h * scale;
    c.style.imageRendering = 'pixelated';
    var ctx = c.getContext('2d');
    ctx.imageSmoothingEnabled = false;
    for (var y = 0; y < h; y++) {
      for (var x = 0; x < w; x++) {
        var idx = pixels[y][x];
        if (!idx || !PAL[idx]) continue;
        var col = PAL[idx];
        ctx.fillStyle = 'rgb(' + ((col>>16)&255) + ',' + ((col>>8)&255) + ',' + (col&255) + ')';
        ctx.fillRect(x * scale, y * scale, scale, scale);
      }
    }
    return c;
  }

  // ── Sprite definitions ──────────────────────────────────────────────────────

  // Stone floor tile 8×8
  var TILE = [
    [2,3,3,11,3,3,3,2],
    [3,4,3,3,3,4,3,3],
    [3,3,2,3,3,3,2,3],
    [11,3,3,4,3,3,3,3],
    [3,3,3,3,4,3,3,11],
    [3,2,3,3,3,2,3,3],
    [3,3,4,3,3,3,4,3],
    [2,3,3,3,11,3,3,2],
  ];

  // Torch 6×11 — room 1
  var SPR_TORCH = [
    [0,0,6,6,0,0],
    [0,6,5,5,6,0],
    [0,5,6,6,5,0],
    [0,0,5,5,0,0],
    [0,0,7,0,0,0],
    [0,7,7,7,0,0],
    [0,7,7,7,0,0],
    [0,7,7,7,0,0],
    [0,0,7,7,0,0],
    [0,0,7,0,0,0],
    [0,0,7,0,0,0],
  ];

  // Scroll/Oracle 10×8 — room 2
  var SPR_SCROLL = [
    [0,7,7,7,7,7,7,7,7,0],
    [7,5,10,10,10,10,10,10,5,7],
    [7,10,5,10,7,10,10,5,10,7],
    [7,10,10,10,10,10,10,10,10,7],
    [7,10,10,7,10,10,7,10,10,7],
    [7,10,5,10,10,10,10,5,10,7],
    [7,5,10,10,10,10,10,10,5,7],
    [0,7,7,7,7,7,7,7,7,0],
  ];

  // Lightning bolt 5×10 — room 3
  var SPR_BOLT = [
    [0,0,5,5,6],
    [0,5,5,5,0],
    [5,5,5,0,0],
    [0,5,5,5,0],
    [0,0,5,5,5],
    [0,0,0,5,5],
    [0,0,5,5,0],
    [0,5,5,0,0],
    [5,5,0,0,0],
    [5,0,0,0,0],
  ];

  // Hourglass 8×12 — room 4
  var SPR_GLASS = [
    [7,5,5,5,5,5,5,7],
    [0,7,5,5,5,5,7,0],
    [0,0,7,5,5,7,0,0],
    [0,0,0,7,7,0,0,0],
    [0,0,7,9,9,7,0,0],
    [0,7,9,9,9,9,7,0],
    [0,7,9,9,9,9,7,0],
    [0,0,7,9,9,7,0,0],
    [0,0,0,7,7,0,0,0],
    [0,0,7,5,5,7,0,0],
    [0,7,5,5,5,5,7,0],
    [7,5,5,5,5,5,5,7],
  ];

  var ROOM_SPRITES = [
    { id: 'room-1', data: SPR_TORCH,  scale: 4 },
    { id: 'room-2', data: SPR_SCROLL, scale: 3 },
    { id: 'room-3', data: SPR_BOLT,   scale: 4 },
    { id: 'room-4', data: SPR_GLASS,  scale: 3 },
  ];

  // ── Dungeon floor canvas ────────────────────────────────────────────────────
  function initDungeonFloor() {
    var tile = px(TILE, 7);  // 56×56 per tile — visible at normal screen size
    var floor = document.createElement('canvas');
    floor.id = 'dungeon-floor';
    floor.setAttribute('aria-hidden', 'true');
    floor.style.cssText = [
      'position:fixed', 'inset:0', 'z-index:0',
      'pointer-events:none', 'opacity:0',
      'image-rendering:pixelated',
      'transition:opacity 2s ease',
    ].join(';');

    document.body.prepend(floor);

    function draw() {
      floor.width  = window.innerWidth;
      floor.height = window.innerHeight;
      var ctx = floor.getContext('2d');
      ctx.imageSmoothingEnabled = false;
      var pat = ctx.createPattern(tile, 'repeat');
      ctx.fillStyle = pat;
      ctx.fillRect(0, 0, floor.width, floor.height);
    }

    draw();
    window.addEventListener('resize', draw);
    // Fade in fully visible — the vignette provides the edge darkening
    setTimeout(function () { floor.style.opacity = reduceMotion ? '0.1' : '0.28'; }, 600);
  }

  // ── Room sprites ───────────────────────────────────────────────────────────
  function initRoomSprites() {
    ROOM_SPRITES.forEach(function (s) {
      var room = document.getElementById(s.id);
      if (!room) return;
      var header = room.querySelector('.room-header');
      if (!header) return;
      var canvas = px(s.data, s.scale);
      canvas.className = 'room-sprite';
      canvas.setAttribute('aria-hidden', 'true');
      header.insertBefore(canvas, header.firstChild);
    });
  }

  // ── Canvas minimap ─────────────────────────────────────────────────────────
  var minimapCanvas = null;
  var minimapHighest = 1;

  function initMinimap() {
    var mapInner = document.querySelector('.map-inner');
    if (!mapInner) return;

    var c = document.createElement('canvas');
    c.id = 'dungeon-minimap';
    c.width  = 300;
    c.height = 48;
    c.setAttribute('role', 'img');
    c.setAttribute('aria-label', 'Mapa de progreso del dungeon');
    c.style.cssText = 'image-rendering:pixelated;cursor:pointer;display:block;flex:1;max-width:300px;';

    c.addEventListener('click', function (e) {
      var rect = c.getBoundingClientRect();
      var xRatio = (e.clientX - rect.left) / rect.width;
      var room = Math.min(4, Math.floor(xRatio * 4) + 1);
      var node = document.querySelector('.map-node[data-room="' + room + '"]');
      if (node && !node.classList.contains('locked')) node.click();
    });

    // Insert before .map-nodes
    var nodes = mapInner.querySelector('.map-nodes');
    if (nodes) nodes.insertAdjacentElement('beforebegin', c);
    else mapInner.appendChild(c);

    minimapCanvas = c;
  }

  function drawMinimap(highest) {
    minimapHighest = highest;
    if (!minimapCanvas) return;
    var W = minimapCanvas.width, H = minimapCanvas.height;
    var ctx = minimapCanvas.getContext('2d');
    ctx.imageSmoothingEnabled = false;
    ctx.clearRect(0, 0, W, H);

    var roomW = 48, roomH = 32;
    var step  = 75;
    var ox = 6, oy = 8;

    for (var r = 1; r <= 4; r++) {
      var rx = ox + (r - 1) * step;

      // Corridor
      if (r < 4) {
        var corOn = r < highest;
        ctx.fillStyle = corOn ? '#4a3818' : '#131624';
        ctx.fillRect(rx + roomW, oy + roomH / 2 - 2, step - roomW, 4);
        // Dots in corridor
        for (var d = 3; d < step - roomW - 3; d += 8) {
          ctx.fillStyle = corOn ? '#7a6028' : '#090b12';
          ctx.fillRect(rx + roomW + d, oy + roomH / 2 - 1, 3, 2);
        }
      }

      var isActive   = r === highest;
      var isUnlocked = r < highest;
      var isLocked   = r > highest;

      // Room outer wall
      ctx.fillStyle = isActive ? '#4a3818' : isUnlocked ? '#1e2a1a' : '#1a1e30';
      ctx.fillRect(rx, oy, roomW, roomH);

      // Room floor
      ctx.fillStyle = isActive ? '#1e2035' : isUnlocked ? '#141e12' : '#0d1020';
      ctx.fillRect(rx + 2, oy + 2, roomW - 4, roomH - 4);

      // Amber glow overlay for active room
      if (isActive) {
        ctx.fillStyle = 'rgba(200,160,60,0.12)';
        ctx.fillRect(rx + 2, oy + 2, roomW - 4, roomH - 4);
        // Torch dots
        ctx.fillStyle = '#e8c060';
        ctx.fillRect(rx + 4,          oy + 4, 2, 3);
        ctx.fillRect(rx + roomW - 6,  oy + 4, 2, 3);
      }

      // Moss tint for unlocked
      if (isUnlocked) {
        ctx.fillStyle = 'rgba(42,88,36,0.1)';
        ctx.fillRect(rx + 2, oy + 2, roomW - 4, roomH - 4);
        ctx.fillStyle = '#2a5824';
        ctx.fillRect(rx + 4, oy + 4, 2, 2);
        ctx.fillRect(rx + roomW - 6, oy + 4, 2, 2);
      }

      // Lock icon for locked rooms
      if (isLocked) {
        var lx = rx + roomW / 2 - 4;
        var ly = oy + 7;
        ctx.fillStyle = '#2a2e45';
        ctx.fillRect(lx, ly + 4, 8, 6);
        ctx.fillStyle = '#1a1e30';
        ctx.fillRect(lx + 2, ly + 5, 4, 4);
        ctx.fillStyle = '#2a2e45';
        ctx.fillRect(lx + 2, ly, 4, 6);
        ctx.fillStyle = '#1a1e30';
        ctx.fillRect(lx + 3, ly, 2, 5);
      }

      // Room number label
      ctx.font = 'bold 7px monospace';
      ctx.textAlign = 'center';
      ctx.fillStyle = isActive ? '#c9a84c' : isUnlocked ? '#3a7018' : '#2a2e45';
      ctx.fillText(['I', 'II', 'III', 'IV'][r - 1], rx + roomW / 2, oy + roomH - 5);

      // Active indicator — amber bottom bar
      if (isActive) {
        ctx.fillStyle = '#c9a84c';
        ctx.fillRect(rx + 4, oy + roomH - 3, roomW - 8, 2);
      }
    }
  }

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

    var N1 = reduceMotion ? 60 : 260;
    var p1 = new Float32Array(N1 * 3), v1 = new Float32Array(N1), d1 = new Float32Array(N1);

    function spawnEmber(i) {
      p1[i*3]   = (Math.random()-0.5)*28;
      p1[i*3+1] = Math.random()*-24-2;
      p1[i*3+2] = (Math.random()-0.5)*8;
      v1[i]     = 0.003+Math.random()*0.007;
      d1[i]     = Math.random()*120;
    }
    for (var i = 0; i < N1; i++) { spawnEmber(i); p1[i*3+1] = (Math.random()-0.5)*24; }

    var g1 = new THREE.BufferGeometry();
    g1.setAttribute('position', new THREE.BufferAttribute(p1, 3));
    scene.add(new THREE.Points(g1, new THREE.PointsMaterial({
      size:0.05, sizeAttenuation:true, color:new THREE.Color(0xc9a84c),
      transparent:true, opacity:0.45, depthWrite:false, blending:THREE.AdditiveBlending,
    })));

    var N2 = reduceMotion ? 10 : 45;
    var p2 = new Float32Array(N2 * 3), v2 = new Float32Array(N2), d2 = new Float32Array(N2);

    function spawnSpark(i) {
      p2[i*3]   = (Math.random()-0.5)*22;
      p2[i*3+1] = Math.random()*-22-2;
      p2[i*3+2] = (Math.random()-0.5)*5;
      v2[i]     = 0.006+Math.random()*0.011;
      d2[i]     = Math.random()*120;
    }
    for (var j = 0; j < N2; j++) { spawnSpark(j); p2[j*3+1] = (Math.random()-0.5)*22; }

    var g2 = new THREE.BufferGeometry();
    g2.setAttribute('position', new THREE.BufferAttribute(p2, 3));
    scene.add(new THREE.Points(g2, new THREE.PointsMaterial({
      size:0.13, sizeAttenuation:true, color:new THREE.Color(0xf0c060),
      transparent:true, opacity:0.65, depthWrite:false, blending:THREE.AdditiveBlending,
    })));

    window.addEventListener('resize', function () {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    });

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
        camera.position.x += (mouseTargetX - camera.position.x) * 0.025;
        camera.position.y += (-mouseTargetY - camera.position.y) * 0.025;
      }
      for (var ii = 0; ii < N1; ii++) {
        p1[ii*3+1] += v1[ii];
        p1[ii*3]   += Math.sin(t*0.55+d1[ii])*0.0012;
        if (p1[ii*3+1] > 14) spawnEmber(ii);
      }
      g1.attributes.position.needsUpdate = true;
      for (var jj = 0; jj < N2; jj++) {
        p2[jj*3+1] += v2[jj];
        p2[jj*3]   += Math.sin(t*0.75+d2[jj])*0.0018;
        if (p2[jj*3+1] > 14) spawnSpark(jj);
      }
      g2.attributes.position.needsUpdate = true;
      renderer.render(scene, camera);
    }
    tick();
  }

  // ─── Hero Entrance ─────────────────────────────────────────────────────────
  function playHeroEntrance() {
    if (typeof gsap === 'undefined') return;
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
      gsap.set('.hero-eyebrow,.title-line-1,.title-line-2,.hero-lore,.hero-meta,#begin-btn', { clearProps: 'all' });
      gsap.set('.hero-divider', { scaleX: 1 });
      gsap.set('.ring-1', { opacity: 0.3,  scale: 1 });
      gsap.set('.ring-2', { opacity: 0.18, scale: 1 });
      gsap.set('.ring-3', { opacity: 0.1,  scale: 1 });
      return;
    }

    var tl = gsap.timeline({ delay: 0.1 });
    tl.to('.ring-1',       { opacity: 0.3,  scale: 1, duration: 2.5, ease: 'power3.out' }, 0)
      .to('.ring-2',       { opacity: 0.18, scale: 1, duration: 2.5, ease: 'power3.out' }, 0.25)
      .to('.ring-3',       { opacity: 0.1,  scale: 1, duration: 2.5, ease: 'power3.out' }, 0.5)
      .to('.hero-eyebrow', { opacity: 1, y: 0, duration: 0.7, ease: 'power4.out' }, 0.2)
      .to('.title-line-1', { opacity: 1, y: 0, duration: 0.75, ease: 'power4.out' }, 0.4)
      .to('.title-line-2', { opacity: 1, y: 0, scale: 1, duration: 0.9, ease: 'power4.out' }, 0.55)
      .to('.hero-divider', { scaleX: 1, duration: 0.7, ease: 'power3.out', transformOrigin: 'center' }, 0.85)
      .to('.hero-lore',    { opacity: 1, y: 0, duration: 0.65, ease: 'power3.out' }, 0.95)
      .to('.hero-meta',    { opacity: 1, duration: 0.55, ease: 'power2.out' }, 1.1)
      .to('#begin-btn',    { opacity: 1, y: 0, scale: 1, duration: 0.7, ease: 'back.out(1.4)' }, 1.2);
  }

  // ─── LocalStorage ──────────────────────────────────────────────────────────
  var STATE_KEY = 'pm204_v1';
  function loadState()  { try { return JSON.parse(localStorage.getItem(STATE_KEY)) || {}; } catch (e) { return {}; } }
  function saveState(s) { try { localStorage.setItem(STATE_KEY, JSON.stringify(s)); } catch (e) {} }

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
    drawMinimap(highest);
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

    var dur      = reduceMotion ? 0.01 : 0.8;
    var durDense = reduceMotion ? 0.01 : 0.5;
    var stagger  = reduceMotion ? 0    : 0.04;

    ScrollTrigger.batch('.room-frame', {
      onEnter: function (b) { gsap.to(b, { opacity: 1, y: 0, duration: dur, ease: 'power4.out' }); },
      start: 'top 93%', once: true,
    });

    ScrollTrigger.batch('.rule-item, .oracle-card, .skill-node, .unit-item, .decree', {
      onEnter: function (b) { gsap.to(b, { opacity: 1, y: 0, duration: durDense, stagger: stagger, ease: 'power4.out' }); },
      start: 'top 90%', once: true,
    });

    document.querySelectorAll('.tl-item').forEach(function (el, idx) {
      gsap.fromTo(el,
        { opacity: 0, x: idx % 2 === 0 ? -30 : 30, y: 12 },
        { opacity: 1, x: 0, y: 0, duration: reduceMotion ? 0.01 : 0.65, ease: 'power4.out',
          scrollTrigger: { trigger: el, start: 'top 88%', once: true } }
      );
    });

    ScrollTrigger.batch('#q-1-1, #q-2-1, #q-3-1, #q-4-1', {
      onEnter: function (b) { gsap.to(b, { opacity: 1, y: 0, duration: durDense, ease: 'power4.out' }); },
      start: 'top 90%', once: true,
    });

    if (!reduceMotion) {
      document.querySelectorAll('.room-header').forEach(function (header) {
        var room = header.closest('.room');
        if (!room) return;
        gsap.to(header, {
          scrollTrigger: { trigger: room, start: 'top bottom', end: 'bottom top', scrub: 1.8 },
          y: -36, ease: 'none',
        });
      });

      document.querySelectorAll('.lore-box').forEach(function (box) {
        gsap.to(box, {
          scrollTrigger: { trigger: box, start: 'top bottom', end: 'bottom top', scrub: 2 },
          y: 14, ease: 'none',
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
      if (!reduceMotion) {
        var flash = document.createElement('div');
        flash.style.cssText = 'position:fixed;inset:0;background:radial-gradient(ellipse at center,rgba(200,160,60,0.2) 0%,transparent 65%);pointer-events:none;z-index:500;';
        document.body.appendChild(flash);
        gsap.to(flash, { opacity: 0, duration: 1.1, ease: 'power3.out',
          onComplete: function () { flash.parentNode && flash.parentNode.removeChild(flash); } });
        var frame = room.querySelector('.room-frame');
        if (frame) gsap.fromTo(frame, { scale: 0.97 }, { scale: 1, duration: 0.9, ease: 'power4.out' });
      }
      if (lock) gsap.to(lock, { opacity: 0, duration: 0.5, ease: 'power2.in',
        onComplete: function () { lock.style.display = 'none'; } });
      setTimeout(function () {
        room.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' });
        if (ScrollTrigger) ScrollTrigger.refresh();
      }, reduceMotion ? 50 : 520);
    } else {
      if (lock) lock.style.display = 'none';
    }
  }

  // ─── Quiz helpers ──────────────────────────────────────────────────────────
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

  // ─── Room Setup ────────────────────────────────────────────────────────────
  function setupRoom(roomNum, state) {
    var q1   = document.getElementById('q-' + roomNum + '-1');
    var q2   = document.getElementById('q-' + roomNum + '-2');
    var seal = document.getElementById('seal-' + roomNum);
    var chk  = document.getElementById('commit-' + roomNum);
    if (!q1 || !q2 || !seal || !chk) return;

    var rs = state['r' + roomNum] || {};
    if (rs.q1) restoreCorrect(q1);
    if (rs.q1) { q2.classList.remove('q-locked'); if (typeof gsap !== 'undefined') gsap.set(q2, { opacity: 1, y: 0 }); }
    if (rs.q2) restoreCorrect(q2);
    if (rs.q1 && rs.q2) seal.classList.remove('hidden');
    if (rs.sealed) chk.checked = true;

    wireQuestion(q1, function () {
      state['r' + roomNum] = state['r' + roomNum] || {};
      state['r' + roomNum].q1 = true;
      saveState(state);
      q2.classList.remove('q-locked');
      if (typeof gsap !== 'undefined')
        gsap.fromTo(q2, { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: reduceMotion ? 0.01 : 0.55, ease: 'power4.out' });
    });

    wireQuestion(q2, function () {
      state['r' + roomNum] = state['r' + roomNum] || {};
      state['r' + roomNum].q2 = true;
      saveState(state);
      seal.classList.remove('hidden');
    });

    chk.addEventListener('change', function () {
      if (!chk.checked) return;
      state['r' + roomNum] = state['r' + roomNum] || {};
      state['r' + roomNum].sealed = true;
      saveState(state);
      if (roomNum < 4) { unlockRoom(roomNum + 1, true); updateMap(roomNum + 1); }
      else showVictory(state);
    });
  }

  // ─── Victory ───────────────────────────────────────────────────────────────
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

  // ─── Hero Transition ───────────────────────────────────────────────────────
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
        opacity: 0, duration: reduceMotion ? 0.01 : 0.65, ease: 'power3.in',
        onComplete: function () {
          hero.classList.add('hidden');
          adventure.classList.remove('hidden');
          map.classList.remove('hidden');
          initMinimap();
          drawMinimap(minimapHighest);
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
      initMinimap();
      drawMinimap(minimapHighest);
      initScrollAnimations();
    }
  }

  // ─── Boot ──────────────────────────────────────────────────────────────────
  function boot() {
    // Always clear progress — fresh test every session
    try { localStorage.removeItem(STATE_KEY); } catch (e) {}

    initDungeonFloor();
    initParticles();
    initRoomSprites();

    var state = loadState();
    for (var r = 1; r <= 4; r++) setupRoom(r, state);
    for (var rr = 2; rr <= 4; rr++) {
      if (state['r' + (rr - 1)] && state['r' + (rr - 1)].sealed) unlockRoom(rr, false);
    }

    playHeroEntrance();

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
