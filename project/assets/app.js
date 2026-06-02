/* ============================================================
   Hum — app logic
   ============================================================ */
(function () {
  "use strict";
  var root = document.documentElement;
  var LS = {
    theme: "hum.theme", lang: "hum.lang", accent: "hum.accent",
  };

  /* ---------- THEME ---------- */
  function applyTheme(theme, instant) {
    if (instant) { root.classList.add("theme-switching"); }
    root.setAttribute("data-theme", theme);
    try { localStorage.setItem(LS.theme, theme); } catch (e) {}
    var t = document.getElementById("themeToggle");
    if (t) t.setAttribute("aria-pressed", theme === "dark");
    if (instant) { requestAnimationFrame(function () { requestAnimationFrame(function(){ root.classList.remove("theme-switching"); }); }); }
  }
  function toggleTheme() {
    applyTheme(root.getAttribute("data-theme") === "dark" ? "light" : "dark", true);
  }

  /* ---------- I18N ---------- */
  var DICT = window.HUM_I18N || {};
  var curLang = "ja";
  function t(key) { var d = DICT[curLang] || DICT.ja; return (d && d[key]) || (DICT.ja && DICT.ja[key]) || key; }
  function applyLang(lang) {
    if (!DICT[lang]) lang = "ja";
    curLang = lang;
    root.setAttribute("lang", lang);
    try { localStorage.setItem(LS.lang, lang); } catch (e) {}
    document.querySelectorAll("[data-i18n]").forEach(function (el) {
      el.textContent = t(el.getAttribute("data-i18n"));
    });
    // language menu current state
    document.querySelectorAll(".lang__menu button").forEach(function (b) {
      b.setAttribute("aria-current", String(b.getAttribute("data-lang") === lang));
    });
    var cur = document.getElementById("langCurrent");
    if (cur && DICT[lang]) cur.textContent = DICT[lang]._sub;
    // restart transcript in new language
    Transcript.reset();
  }

  /* ---------- ACCENT (tweak) ---------- */
  function applyAccent(a) {
    if (a === "emerald") root.removeAttribute("data-accent");
    else root.setAttribute("data-accent", a);
    try { localStorage.setItem(LS.accent, a); } catch (e) {}
  }

  /* ---------- LIVE TRANSCRIPT ENGINE ---------- */
  var Transcript = (function () {
    var elPrev, elCur, wrap;
    var seq = [], i = 0, timer = null, pattern = "A", paused = false;
    var DURATION = 2400; // ms per line

    function buildSeq() {
      var langSets = (window.HUM_TRANSCRIPTS || {})[curLang] || {};
      var set = langSets[pattern] || langSets.A
              || (window.HUM_TRANSCRIPTS.ja[pattern] || window.HUM_TRANSCRIPTS.ja.A);
      seq = set;
    }
    function lineHTML(msg, isPrev) {
      var label = msg.r === "ai" ? "AI" : "YOU";
      var cls = "tline tline--" + msg.r + (isPrev ? " tline--prev" : " enter");
      var dot = msg.r === "ai" ? '<span class="dot" style="width:6px;height:6px"></span>' : '';
      return '<div class="' + cls + '">'
        + '<span class="tline__label">' + dot + label + '</span>'
        + '<span class="tline__text">' + msg.t + '</span></div>';
    }
    function render() {
      if (!wrap) return;
      var cur = seq[i % seq.length];
      var prev = seq[(i - 1 + seq.length) % seq.length];
      wrap.innerHTML = lineHTML(prev, true) + lineHTML(cur, false);
    }
    function step() {
      i++; render();
      schedule();
    }
    function schedule() {
      clearTimeout(timer);
      if (paused) return;
      timer = setTimeout(step, DURATION);
    }
    return {
      init: function () {
        wrap = document.getElementById("transcript");
        buildSeq(); i = 0; render(); schedule();
      },
      reset: function () { clearTimeout(timer); buildSeq(); i = 0; render(); schedule(); },
      setPattern: function (p) { pattern = p; this.reset(); },
      setPaused: function (p) { paused = p; if (p) clearTimeout(timer); else schedule(); },
    };
  })();

  /* ---------- NAV scroll state ---------- */
  function initNav() {
    var nav = document.getElementById("nav");
    function onScroll() {
      if (window.scrollY > 24) nav.classList.add("scrolled");
      else nav.classList.remove("scrolled");
      // hero parallax (subtle scale)
      var media = document.getElementById("heroMedia");
      if (media) {
        var y = Math.min(window.scrollY, window.innerHeight);
        media.style.transform = "scale(" + (1 + y / window.innerHeight * 0.08).toFixed(4) + ") translateY(" + (y * 0.06).toFixed(1) + "px)";
      }
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  /* ---------- LANGUAGE menu ---------- */
  function initLangMenu() {
    var lang = document.getElementById("lang");
    var btn = document.getElementById("langBtn");
    btn.addEventListener("click", function (e) { e.stopPropagation(); lang.classList.toggle("open"); });
    document.addEventListener("click", function () { lang.classList.remove("open"); });
    document.querySelectorAll(".lang__menu button").forEach(function (b) {
      b.addEventListener("click", function () { applyLang(b.getAttribute("data-lang")); lang.classList.remove("open"); });
    });
  }

  /* ---------- REVEAL on scroll (resilient) ---------- */
  function initReveal() {
    var nodes = Array.prototype.slice.call(document.querySelectorAll(".reveal"));
    if (!nodes.length) return;
    // gate the hidden state on JS being present — if anything below fails, content stays visible
    root.classList.add("js-reveal");

    function showAll() { nodes.forEach(function (el) { el.classList.add("in"); }); }
    function inView(el) {
      var r = el.getBoundingClientRect();
      return r.top < (window.innerHeight || 0) * 0.92 && r.bottom > 0;
    }
    // anything already on screen reveals immediately (no waiting on IO)
    nodes.forEach(function (el) { if (inView(el)) el.classList.add("in"); });

    if (!("IntersectionObserver" in window)) { showAll(); return; }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); } });
    }, { threshold: 0.12, rootMargin: "0px 0px -6% 0px" });
    nodes.forEach(function (el) { if (!el.classList.contains("in")) io.observe(el); });

    // safety net: never leave content hidden
    setTimeout(showAll, 2200);
  }

  /* ---------- VIDEO control (bulletproof autoplay) ---------- */
  function initVideo() {
    var video = document.getElementById("heroVideo");
    var toggle = document.getElementById("mediaToggle");
    if (!video) return;
    var userPaused = false;
    function tryPlay() { var p = video.play(); if (p && p.catch) p.catch(function () {}); }
    function setPaused(p) {
      userPaused = p;
      if (p) { video.pause(); toggle && toggle.classList.add("paused"); }
      else { tryPlay(); toggle && toggle.classList.remove("paused"); }
      Transcript.setPaused(p);
      if (toggle) toggle.setAttribute("aria-label", p ? "Play video" : "Pause video");
    }
    if (toggle) toggle.addEventListener("click", function () { setPaused(!userPaused); });

    // keep it playing unless the user explicitly paused (iframe autoplay policies can stall it)
    video.addEventListener("pause", function () { if (!userPaused) tryPlay(); });
    video.addEventListener("canplay", function () { if (!userPaused) tryPlay(); });
    video.addEventListener("loadeddata", function () { if (!userPaused) tryPlay(); });
    document.addEventListener("visibilitychange", function () { if (!document.hidden && !userPaused) tryPlay(); });
    ["pointerdown", "keydown", "touchstart"].forEach(function (ev) {
      window.addEventListener(ev, function () { if (!userPaused) tryPlay(); }, { once: true, passive: true });
    });
    tryPlay();
  }

  /* ---------- public API (used by Tweaks) ---------- */
  window.HumApp = {
    setTheme: function (th) { applyTheme(th, true); },
    setLang: applyLang,
    setAccent: applyAccent,
    setTranscriptPattern: function (p) { Transcript.setPattern(p); },
    setTranscriptPos: function (pos) {
      if (pos === "left") root.setAttribute("data-tpos", "left");
      else root.removeAttribute("data-tpos");
    },
    setHeroMode: function (mode) {
      if (mode === "cinematic") root.setAttribute("data-hero", "cinematic");
      else root.removeAttribute("data-hero");
    },
    setTranscriptVisible: function (v) {
      if (v) root.removeAttribute("data-transcript");
      else root.setAttribute("data-transcript", "off");
    },
    setTranscriptPanel: function (on) {
      var w = document.getElementById("transcript");
      if (w) w.classList.toggle("transcript--panel", !!on);
    },
    getState: function () {
      return { theme: root.getAttribute("data-theme"), lang: curLang, accent: localStorage.getItem(LS.accent) || "emerald" };
    },
  };

  /* ---------- boot ---------- */
  function boot() {
    var savedTheme = null, savedLang = null, savedAccent = null;
    try { savedTheme = localStorage.getItem(LS.theme); savedLang = localStorage.getItem(LS.lang); savedAccent = localStorage.getItem(LS.accent); } catch (e) {}
    applyTheme(savedTheme || "dark", false);
    if (savedAccent) applyAccent(savedAccent);
    applyLang(savedLang || "ja");

    var tt = document.getElementById("themeToggle");
    if (tt) tt.addEventListener("click", toggleTheme);

    initNav();
    initLangMenu();
    initReveal();
    Transcript.init();
    initVideo();
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot);
  else boot();
})();
