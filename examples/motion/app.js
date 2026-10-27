(() => {
  "use strict";

  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const root = document.documentElement;

  const TAB_ORDER = ["frame", "opening", "zoom", "cursor", "camera", "audio"];
  const TAB_META = {
    frame: { title: "画面", scope: "全片" },
    opening: { title: "开场", scope: "全片" },
    zoom: { title: "运镜", scope: "缩放" },
    cursor: { title: "光标", scope: "全片" },
    camera: { title: "摄像头", scope: "全片基础布局" },
    audio: { title: "声音", scope: "全片" },
  };

  const SOURCES = {
    gradient: {
      pattern: "gradient",
      items: [
        { key: "deep", name: "深海" },
        { key: "dusk", name: "暮光" },
        { key: "graphite", name: "石墨" },
      ],
    },
    grid: {
      pattern: "grid",
      items: [
        { key: "grid-ink", name: "墨线" },
        { key: "grid-paper", name: "纸格" },
        { key: "grid-blue", name: "蓝图" },
      ],
    },
    motion: {
      pattern: "motion",
      items: [
        { key: "motion-aurora", name: "极光" },
        { key: "motion-tide", name: "潮汐" },
        { key: "motion-ember", name: "余烬" },
      ],
    },
    custom: {
      pattern: "custom",
      items: [
        { key: "solid-clay", name: "陶土" },
        { key: "solid-moss", name: "苔绿" },
        { key: "solid-ink", name: "墨黑" },
      ],
    },
  };

  const RATIOS = { "16:9": 16 / 9, "9:16": 9 / 16, "1:1": 1, "4:3": 4 / 3 };

  const state = {
    theme: "light",
    tab: "frame",
    sub: "background",
    ratio: "16:9",
    ratioValue: 16 / 9,
    wallpaper: "deep",
    wallpaperName: "深海",
    source: "gradient",
    time: 6.12,
    duration: 24,
    playing: false,
    exportRes: "1080",
    exportFps: "30",
    exportFmt: "mp4",
    exporting: false,
    exportDone: false,
  };

  const canvas = $("#canvas");
  const recWindow = $("#recWindow");
  const stage = $("#stage");
  const inspector = $("#inspector");
  const tabsEl = $(".inspector-tabs");
  const tabPill = $("#tabPill");
  const inspectorScroll = $("#inspectorScroll");
  const pageTitle = $("#pageTitle");
  const pageScope = $("#pageScope");
  const frameNav = $("#frameNav");
  const saveState = $("#saveState");
  const saveLabel = saveState.querySelector("span");
  const playBtn = $("#playBtn");
  const hudTime = $("#hudTime");
  const timeline = $(".timeline");
  const timelineContent = $("#timeline");
  const playhead = $("#playhead");
  const filmstrip = $("#filmstrip");
  const waveform = $("#waveform");
  const ruler = $("#ruler");
  const primaryClip = $("#primaryClip");
  const toast = $("#toast");
  const dialog = $("#exportDialog");
  const progress = $("#exportProgress");
  const progressBar = $(".progress-line i");
  const progressText = $("#progressText");
  const progressPct = $("#progressPct");
  const startExport = $("#startExport");
  const cancelExport = $("#cancelExport");
  const shadowRange = $("#windowShadow");
  const windowShadowOut = $("#windowShadowOut");
  const metaSub = $(".meta-sub");
  const swatchGrid = $("#swatchGrid");
  const ratioLabel = $("#ratioLabel");
  const curveLine = $("#curveLine");
  const curvePoints = $$(".curve-points circle");

  let saveTimer = 0;
  let toastTimer = 0;
  let raf = 0;
  let lastFrame = 0;
  let seekDragging = false;
  let exportTimer = 0;
  let openExportAfterFrame = 0;
  let currentZoom = 1.35;
  let booted = false;

  /* ---------------------------------------------------------------------
     Theme
     --------------------------------------------------------------------- */

  function storedTheme() {
    try {
      return localStorage.getItem("graphite-theme");
    } catch (error) {
      return null;
    }
  }

  function setTheme(theme, animate = true) {
    state.theme = theme;
    root.dataset.theme = theme;
    try {
      localStorage.setItem("graphite-theme", theme);
    } catch (error) {
      /* file:// may deny storage; the toggle still works for this visit. */
    }
    if (animate && !reducedMotion.matches) {
      root.classList.add("theme-anim");
      window.setTimeout(() => root.classList.remove("theme-anim"), 300);
    }
  }

  function toggleTheme() {
    setTheme(state.theme === "dark" ? "light" : "dark");
  }

  /* ---------------------------------------------------------------------
     Inspector tabs
     --------------------------------------------------------------------- */

  function placeTabPill() {
    if (!tabsEl.clientWidth) return;
    const index = Math.max(0, TAB_ORDER.indexOf(state.tab));
    const total = 5 * 44 + 86 + 10;
    const x = Math.max(0, (tabsEl.clientWidth - total) / 2 + index * 46);
    tabPill.style.width = "86px";
    tabPill.style.transform = "translate(" + x + "px, -50%)";
    tabsEl.classList.add("ready");
  }

  function animateIn(el, fromX, duration) {
    if (reducedMotion.matches || !el || !el.animate) return;
    el.animate(
      [
        { opacity: 0, transform: "translateX(" + fromX + "px)" },
        { opacity: 1, transform: "translateX(0)" },
      ],
      { duration, easing: "cubic-bezier(.2,.8,.2,1)" }
    );
  }

  function setTab(key, options = {}) {
    if (!TAB_META[key]) return;
    if (state.tab === key && !options.force) {
      if (options.focus) $("#tab-" + key).focus();
      return;
    }
    const previous = TAB_ORDER.indexOf(state.tab);
    const next = TAB_ORDER.indexOf(key);
    state.tab = key;

    $$(".tab").forEach((tab) => {
      const active = tab.dataset.tab === key;
      tab.classList.toggle("is-active", active);
      tab.setAttribute("aria-selected", String(active));
      tab.tabIndex = active ? 0 : -1;
    });

    const meta = TAB_META[key];
    pageTitle.textContent = meta.title;
    pageScope.textContent = meta.scope;
    frameNav.hidden = key !== "frame";

    $$(".panel").forEach((panel) => {
      const active = panel.dataset.panel === key;
      panel.classList.toggle("is-active", active);
      panel.hidden = !active;
    });

    inspectorScroll.scrollTop = 0;
    placeTabPill();
    window.requestAnimationFrame(() => {
      refreshSegs();
      placeTabPill();
    });

    const activePanel = $('.panel[data-panel="' + key + '"]');
    if (activePanel && previous !== next) {
      const direction = next > previous ? 14 : -14;
      animateIn(activePanel, direction, 280);
    }

    if (options.focus) {
      $("#tab-" + key).focus();
    }
  }

  $$(".tab").forEach((tab) => {
    tab.addEventListener("click", () => setTab(tab.dataset.tab));
  });

  tabsEl.addEventListener("keydown", (event) => {
    const keys = ["ArrowLeft", "ArrowRight", "Home", "End"];
    if (!keys.includes(event.key)) return;
    event.preventDefault();
    let index = TAB_ORDER.indexOf(state.tab);
    if (event.key === "ArrowLeft") index = (index + TAB_ORDER.length - 1) % TAB_ORDER.length;
    if (event.key === "ArrowRight") index = (index + 1) % TAB_ORDER.length;
    if (event.key === "Home") index = 0;
    if (event.key === "End") index = TAB_ORDER.length - 1;
    setTab(TAB_ORDER[index], { focus: true, force: true });
  });

  /* ---------------------------------------------------------------------
     Segmented controls
     --------------------------------------------------------------------- */

  function placeSegThumb(segmented) {
    if (!segmented || !segmented.clientWidth) return;
    let thumb = segmented.querySelector(".seg-thumb");
    if (!thumb) {
      thumb = document.createElement("span");
      thumb.className = "seg-thumb";
      segmented.prepend(thumb);
    }
    const active = segmented.querySelector(".seg.is-on") || segmented.querySelector(".seg");
    if (!active) return;
    thumb.style.width = active.offsetWidth + "px";
    thumb.style.transform = "translateX(" + Math.max(0, active.offsetLeft - 2) + "px)";
    segmented.classList.add("ready");
  }

  function refreshSegs(scope = document) {
    $$(".segmented", scope).forEach(placeSegThumb);
  }

  function selectSegment(segmented, button, multiple = false) {
    if (!segmented || !button) return;
    $$(".seg", segmented).forEach((item) => {
      const on = item === button;
      item.classList.toggle("is-on", on);
      item.setAttribute("aria-selected", String(on));
      if (multiple) item.setAttribute("aria-pressed", String(on));
    });
    placeSegThumb(segmented);
  }

  function setSubpanel(key) {
    if (!key || state.sub === key) return;
    state.sub = key;
    const activeButton = $('#frameNav .seg[data-sub="' + key + '"]');
    selectSegment($("#frameNav .segmented"), activeButton);
    $$(".subpanel").forEach((panel) => {
      const active = panel.dataset.subpanel === key;
      panel.classList.toggle("is-active", active);
      panel.hidden = !active;
    });
    inspectorScroll.scrollTop = 0;
    const panel = $('.subpanel[data-subpanel="' + key + '"]');
    animateIn(panel, 10, 240);
  }

  $$("#frameNav .seg").forEach((button) => {
    button.addEventListener("click", () => setSubpanel(button.dataset.sub));
    button.setAttribute("role", "tab");
    button.addEventListener("keydown", (event) => {
      if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
      event.preventDefault();
      const items = $$("#frameNav .seg");
      let index = items.indexOf(button);
      index = (index + (event.key === "ArrowRight" ? 1 : items.length - 1)) % items.length;
      items[index].click();
      items[index].focus();
    });
  });

  $$("#panel-zoom .seg").forEach((button) => {
    button.addEventListener("click", () => {
      selectSegment($("#panel-zoom .segmented"), button);
      const manual = button.dataset.zoommode === "manual";
      $(".focus-card").classList.toggle("is-manual", manual);
      if (manual) showToast("手动定位", "在预览里点按，指定缩放的焦点");
    });
  });

  /* ---------------------------------------------------------------------
     Sliders
     --------------------------------------------------------------------- */

  function bindRange(input, output, format, onInput) {
    if (!input) return;
    const update = () => {
      const min = Number(input.min);
      const max = Number(input.max);
      const value = Number(input.value);
      const percent = max === min ? 0 : ((value - min) / (max - min)) * 100;
      input.style.setProperty("--p", percent + "%");
      if (output) output.textContent = format(value);
      if (onInput) onInput(value);
    };
    input.addEventListener("input", update);
    update();
    return update;
  }

  bindRange($("#patternScale"), $("#patternScaleOut"), (v) => v.toFixed(1) + "×", (v) => {
    canvas.style.setProperty("--pattern-scale", v);
    markSaving();
  });
  bindRange($("#patternOpacity"), $("#patternOpacityOut"), (v) => Math.round(v) + "%", (v) => {
    canvas.style.setProperty("--pattern-opacity", v / 100);
    markSaving();
  });

  bindRange($("#canvasPad"), $("#canvasPadOut"), (v) => Math.round(v) + "%", (v) => {
    canvas.style.setProperty("--canvas-pad", v + "%");
    markSaving();
  });
  bindRange($("#windowRadius"), $("#windowRadiusOut"), (v) => Math.round(v) + " px", (v) => {
    canvas.style.setProperty("--window-radius", v + "px");
    markSaving();
  });

  const shadowNames = ["无", "柔和", "深"];
  function applyWindowShadow(level, fromSlider = false) {
    const clamped = Math.max(0, Math.min(2, Number(level)));
    recWindow.dataset.shadow = ["off", "soft", "deep"][clamped];
    windowShadowOut.textContent = shadowNames[clamped];
    const shadowSwitch = $("#shadowSwitch");
    const on = clamped !== 0;
    shadowSwitch.classList.toggle("is-on", on);
    shadowSwitch.setAttribute("aria-checked", String(on));
    if (!fromSlider) {
      shadowRange.value = clamped;
      shadowRange.dispatchEvent(new Event("input"));
    }
  }
  bindRange(shadowRange, windowShadowOut, (v) => shadowNames[Number(v)], (v) => {
    applyWindowShadow(v, true);
    markSaving();
  });

  bindRange($("#openingDuration"), $("#openingDurationOut"), (v) => v.toFixed(1) + " s");
  bindRange($("#cursorSize"), $("#cursorSizeOut"), (v) => Math.round(v) + "%");
  bindRange($("#camSize"), $("#camSizeOut"), (v) => Math.round(v) + "%");
  bindRange($("#camRadius"), $("#camRadiusOut"), (v) => Math.round(v) + " px");
  bindRange($("#masterGain"), $("#masterGainOut"), (v) => Math.round(v) + "%");
  bindRange($(".tl-zoom"), null, () => "", () => {});

  /* ---------------------------------------------------------------------
     Wallpapers
     --------------------------------------------------------------------- */

  function wallpaperClass(key) {
    return "wallpaper-" + key;
  }

  function clearWallpaperClasses(el) {
    Array.from(el.classList).forEach((name) => {
      if (name.startsWith("wallpaper-")) el.classList.remove(name);
    });
  }

  function applyWallpaper(key, name, options = {}) {
    const source = SOURCES[state.source];
    const item = source.items.find((entry) => entry.key === key) || source.items[0];
    state.wallpaper = item.key;
    state.wallpaperName = name || item.name;

    clearWallpaperClasses(canvas);
    canvas.classList.add(wallpaperClass(item.key));
    canvas.dataset.wallpaper = item.key;
    canvas.dataset.source = source.pattern;

    $$(".mini-canvas").forEach((mini) => {
      clearWallpaperClasses(mini);
      mini.classList.add(wallpaperClass(item.key));
      mini.dataset.wallpaper = item.key;
    });

    $$(".swatch").forEach((swatch) => {
      swatch.classList.toggle("is-on", swatch.dataset.wallpaper === item.key);
    });
    metaSub.textContent = state.ratio + " · " + state.wallpaperName;

    if (options.save !== false) markSaving();
  }

  function renderSwatches() {
    const source = SOURCES[state.source];
    swatchGrid.innerHTML = source.items
      .map((item) => {
        const on = item.key === state.wallpaper ? " is-on" : "";
        return (
          '<button class="swatch' + on + '" data-wallpaper="' + item.key +
          '" data-name="' + item.name + '" aria-label="背景：' + item.name +
          '"><span class="swatch-art wp-' + item.key + '"></span><span class="swatch-name">' +
          item.name + "</span></button>"
        );
      })
      .join("");
    $$(".swatch", swatchGrid).forEach((swatch) => {
      swatch.addEventListener("click", () => {
        applyWallpaper(swatch.dataset.wallpaper, swatch.dataset.name);
      });
    });
  }

  function setSource(key) {
    const source = SOURCES[key];
    if (!source) return;
    state.source = key;
    $$(".source-tile").forEach((tile) => tile.classList.toggle("is-on", tile.dataset.source === key));
    const item = source.items[0];
    applyWallpaper(item.key, item.name, { save: true });
    renderSwatches();
  }

  $$(".source-tile").forEach((tile) => {
    tile.addEventListener("click", () => setSource(tile.dataset.source));
  });

  $("#replaceBg").addEventListener("click", () => {
    const row = $(".source-row");
    row.animate(
      [{ transform: "scale(1)" }, { transform: "scale(1.02)" }, { transform: "scale(1)" }],
      { duration: 360, easing: "ease-out" }
    );
    showToast("选择背景素材", "在下方挑选渐变、网格或动态背景，画布会即时更新");
  });

  /* ---------------------------------------------------------------------
     Ratio + canvas fitting
     --------------------------------------------------------------------- */

  function setRatio(label) {
    if (!RATIOS[label]) return;
    state.ratio = label;
    state.ratioValue = RATIOS[label];
    ratioLabel.textContent = label;
    metaSub.textContent = label + " · " + state.wallpaperName;
    $$(".quad-tile[data-ratio]").forEach((tile) => {
      const on = tile.dataset.ratio === label;
      tile.classList.toggle("is-on", on);
      tile.setAttribute("aria-pressed", String(on));
    });
    fitCanvas();
    markSaving();
  }

  function fitCanvas() {
    if (!stage || !canvas) return;
    const style = getComputedStyle(stage);
    const padLeft = parseFloat(style.paddingLeft) || 0;
    const padRight = parseFloat(style.paddingRight) || 0;
    const padTop = parseFloat(style.paddingTop) || 0;
    const padBottom = parseFloat(style.paddingBottom) || 0;
    const availableWidth = Math.max(160, stage.clientWidth - padLeft - padRight);
    const availableHeight = Math.max(120, stage.clientHeight - padTop - padBottom);
    let width = Math.min(availableWidth, availableHeight * state.ratioValue);
    width = Math.max(140, Math.floor(width));
    const height = Math.floor(width / state.ratioValue);
    canvas.style.width = width + "px";
    canvas.style.height = height + "px";
  }

  $$(".quad-tile[data-ratio]").forEach((tile) => {
    tile.addEventListener("click", () => setRatio(tile.dataset.ratio));
  });

  /* ---------------------------------------------------------------------
     Choice tiles
     --------------------------------------------------------------------- */

  function setupChoice(selector, callback) {
    const items = $$(selector);
    items.forEach((item) => {
      item.addEventListener("click", () => {
        const group = item.parentElement;
        $$(":scope > button", group).forEach((sibling) => {
          sibling.classList.toggle("is-on", sibling === item);
          sibling.setAttribute("aria-pressed", String(sibling === item));
        });
        if (callback) callback(item, group);
      });
    });
  }

  setupChoice("[data-opening]", () => {});
  setupChoice("[data-cursor]", () => {});
  setupChoice("[data-cam]", (item) => {
    if (item.dataset.cam === "off") {
      showToast("摄像头布局", "这个项目没有摄像头素材，布局会在下次导入时生效");
    }
  });

  $$(".tri-tile[data-frame]").forEach((tile) => {
    tile.addEventListener("click", () => {
      $$(".tri-tile[data-frame]").forEach((sibling) => {
        sibling.classList.toggle("is-on", sibling === tile);
        sibling.setAttribute("aria-pressed", String(sibling === tile));
      });
      recWindow.dataset.frame = tile.dataset.frame;
      markSaving();
    });
  });

  $$(".display-btn").forEach((button) => {
    button.addEventListener("click", () => {
      const mode = button.dataset.display;
      $$(".display-btn").forEach((item) => {
        const on = item === button;
        item.classList.toggle("is-on", on);
        item.setAttribute("aria-pressed", String(on));
      });
      timeline.classList.toggle("wave-mode", mode === "wave");
      $(".clip-tag").textContent = mode === "wave" ? "波形 · 24.0s" : "屏幕录制 · 24.0s";
    });
  });

  /* ---------------------------------------------------------------------
     Switches
     --------------------------------------------------------------------- */

  $$(".switch").forEach((button) => {
    button.addEventListener("click", () => {
      const on = !button.classList.contains("is-on");
      button.classList.toggle("is-on", on);
      button.setAttribute("aria-checked", String(on));

      if (button.id === "shadowSwitch") {
        applyWindowShadow(on ? 1 : 0);
      }
      if (button.id === "urlSwitch") {
        recWindow.dataset.url = on ? "on" : "off";
      }
      if (button.id === "sysSwitch" || button.id === "micSwitch") {
        const row = button.closest(".audio-row");
        row.classList.toggle("is-off", !on);
        row.querySelector(".meter").style.opacity = on ? "" : "0.16";
      }
    });
  });

  /* ---------------------------------------------------------------------
     Save state
     --------------------------------------------------------------------- */

  function markSaving() {
    if (!booted) return;
    window.clearTimeout(saveTimer);
    saveState.classList.add("is-saving");
    saveLabel.textContent = "保存中…";
    saveTimer = window.setTimeout(() => {
      saveState.classList.remove("is-saving");
      saveLabel.textContent = "已保存";
    }, 620);
  }

  /* ---------------------------------------------------------------------
     Toast
     --------------------------------------------------------------------- */

  function showToast(title, body) {
    $("#toastTitle").textContent = title;
    $("#toastBody").textContent = body;
    toast.classList.add("show");
    window.clearTimeout(toastTimer);
    toastTimer = window.setTimeout(() => toast.classList.remove("show"), 3200);
  }

  /* ---------------------------------------------------------------------
     Canvas selection / focus point
     --------------------------------------------------------------------- */

  canvas.addEventListener("click", () => canvas.classList.toggle("is-selected"));
  canvas.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      canvas.classList.toggle("is-selected");
    }
  });

  const focusStage = $(".focus-stage");
  const focusRing = $("#focusRing");
  const focusX = $("#focusX");
  const focusY = $("#focusY");

  function setFocus(clientX, clientY) {
    const rect = focusStage.getBoundingClientRect();
    const x = Math.max(6, Math.min(94, ((clientX - rect.left) / rect.width) * 100));
    const y = Math.max(6, Math.min(94, ((clientY - rect.top) / rect.height) * 100));
    focusStage.style.setProperty("--fx", x + "%");
    focusStage.style.setProperty("--fy", y + "%");
    focusRing.style.setProperty("--fx", x + "%");
    focusRing.style.setProperty("--fy", y + "%");
    focusX.textContent = Math.round(x) + "%";
    focusY.textContent = Math.round(y) + "%";
  }

  focusStage.addEventListener("pointerdown", (event) => {
    focusStage.setPointerCapture(event.pointerId);
    setFocus(event.clientX, event.clientY);
    const move = (moveEvent) => setFocus(moveEvent.clientX, moveEvent.clientY);
    const up = () => {
      focusStage.removeEventListener("pointermove", move);
      focusStage.removeEventListener("pointerup", up);
    };
    focusStage.addEventListener("pointermove", move);
    focusStage.addEventListener("pointerup", up);
  });
  $("#focusReset").addEventListener("click", () => {
    const rect = focusStage.getBoundingClientRect();
    setFocus(rect.left + rect.width / 2, rect.top + rect.height / 2);
  });

  /* ---------------------------------------------------------------------
     Knobs
     --------------------------------------------------------------------- */

  function setupKnob(el, onChange) {
    const min = Number(el.dataset.min);
    const max = Number(el.dataset.max);
    const step = Number(el.dataset.step);
    const suffix = el.dataset.suffix || "";
    let value = Number(el.dataset.value);
    const valueLabel = el.querySelector(".k-val");

    function render() {
      const sweep = 270 * ((value - min) / (max - min));
      el.style.setProperty("--sweep", sweep + "deg");
      valueLabel.textContent = value.toFixed(2).replace(/\.?0+$/, "") + suffix;
      el.setAttribute("aria-valuenow", String(value));
      el.setAttribute("aria-valuetext", valueLabel.textContent);
    }

    function setValue(next) {
      value = Math.max(min, Math.min(max, Math.round(next / step) * step));
      render();
      if (onChange) onChange(value);
    }

    el.addEventListener("pointerdown", (event) => {
      event.preventDefault();
      el.setPointerCapture(event.pointerId);
      const startY = event.clientY;
      const startValue = value;
      const move = (moveEvent) => {
        const delta = (startY - moveEvent.clientY) * ((max - min) / 120);
        setValue(startValue + delta);
      };
      const up = () => {
        el.removeEventListener("pointermove", move);
        el.removeEventListener("pointerup", up);
      };
      el.addEventListener("pointermove", move);
      el.addEventListener("pointerup", up);
    });

    el.addEventListener("keydown", (event) => {
      const keys = ["ArrowUp", "ArrowDown", "ArrowRight", "ArrowLeft", "Home", "End"];
      if (!keys.includes(event.key)) return;
      event.preventDefault();
      if (event.key === "Home") setValue(min);
      else if (event.key === "End") setValue(max);
      else if (event.key === "ArrowUp" || event.key === "ArrowRight") setValue(value + step);
      else setValue(value - step);
    });

    render();
    return setValue;
  }

  function updateCurve(zoomValue) {
    const ratio = Math.max(1, Math.min(2.5, Number(zoomValue) || 1.35));
    const peak = 34 - ((ratio - 1) / 1.5) * 18;
    curveLine.setAttribute(
      "d",
      "M14 96C42 96 50 " + peak + " 88 " + peak + "C126 " + peak + " 150 " + peak +
        " 186 " + peak + "C224 " + peak + " 236 96 274 96"
    );
    if (curvePoints.length === 4) {
      curvePoints[1].setAttribute("cy", peak);
      curvePoints[2].setAttribute("cy", peak);
    }
  }

  setupKnob($("#knobZoom"), (value) => {
    currentZoom = value;
    updateCurve(value);
  });
  setupKnob($("#knobIn"), null);
  setupKnob($("#knobOut"), null);
  updateCurve(currentZoom);

  $("#applyZoom").addEventListener("click", () => {
    const label = "缩放 " + currentZoom.toFixed(1) + "× · 自动";
    $$(".zoom-clip .clip-label").forEach((el) => (el.textContent = label));
    showToast("倍率已应用", "两段缩放都会使用 " + currentZoom.toFixed(2) + "×，曲线保持不变");
    markSaving();
  });

  /* ---------------------------------------------------------------------
     Timeline
     --------------------------------------------------------------------- */

  function pad(value) {
    return String(value).padStart(2, "0");
  }

  function formatTime(seconds) {
    const clamped = Math.max(0, Math.min(state.duration, seconds));
    const minutes = Math.floor(clamped / 60);
    const whole = Math.floor(clamped % 60);
    const centis = Math.floor((clamped - Math.floor(clamped)) * 100);
    return pad(minutes) + ":" + pad(whole) + "." + pad(centis);
  }

  function setTime(seconds, options = {}) {
    state.time = Math.max(0, Math.min(state.duration, seconds));
    const percent = (state.time / state.duration) * 100;
    playhead.style.left = percent + "%";
    hudTime.innerHTML =
      "<b>" + formatTime(state.time) + "</b><span>/ " + formatTime(state.duration) + "</span>";
    if (!options.fromTick) lastFrame = performance.now();
  }

  function updatePlayUI() {
    playBtn.classList.toggle("is-playing", state.playing);
    playBtn.setAttribute("aria-label", state.playing ? "暂停" : "播放");
    playBtn.title = state.playing ? "暂停（空格）" : "播放（空格）";
    document.body.classList.toggle("is-playing", state.playing);
  }

  function pause() {
    state.playing = false;
    if (raf) cancelAnimationFrame(raf);
    raf = 0;
    updatePlayUI();
  }

  function tick(now) {
    if (!state.playing) return;
    const delta = Math.min(0.1, Math.max(0, (now - lastFrame) / 1000));
    lastFrame = now;
    const next = state.time + delta;
    if (next >= state.duration) {
      setTime(state.duration, { fromTick: true });
      pause();
      return;
    }
    setTime(next, { fromTick: true });
    raf = requestAnimationFrame(tick);
  }

  function play() {
    if (state.playing) return;
    if (state.time >= state.duration - 0.02) setTime(0);
    state.playing = true;
    lastFrame = performance.now();
    updatePlayUI();
    raf = requestAnimationFrame(tick);
  }

  playBtn.addEventListener("click", () => (state.playing ? pause() : play()));

  function seekFromClientX(clientX) {
    const rect = timelineContent.getBoundingClientRect();
    const ratio = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
    setTime(ratio * state.duration);
  }

  timelineContent.addEventListener("pointerdown", (event) => {
    if (event.target.closest(".effect, .primary-clip")) return;
    seekDragging = true;
    timelineContent.setPointerCapture(event.pointerId);
    seekFromClientX(event.clientX);
    clearClipSelection();
  });
  timelineContent.addEventListener("pointermove", (event) => {
    if (!seekDragging) return;
    seekFromClientX(event.clientX);
  });
  const endSeek = () => {
    seekDragging = false;
  };
  timelineContent.addEventListener("pointerup", endSeek);
  timelineContent.addEventListener("pointercancel", endSeek);

  $("#prevFrame").addEventListener("click", () => {
    pause();
    setTime(state.time - 1 / 30);
  });
  $("#nextFrame").addEventListener("click", () => {
    pause();
    setTime(state.time + 1 / 30);
  });

  function clearClipSelection() {
    $$(".effect").forEach((clip) => clip.classList.remove("is-selected"));
    $$(".label-row").forEach((row) => row.classList.remove("is-focused"));
  }

  function selectEffectClip(clip) {
    clearClipSelection();
    clip.classList.add("is-selected");
    const kind = clip.dataset.kind;
    const lane = kind === "zoom" ? ".zoom-lane" : kind === "camera" ? ".cam-lane" : ".overlay-lane";
    const row = $(lane);
    if (row) row.classList.add("is-focused");
    if (kind === "zoom") {
      setTab("zoom");
      pageScope.textContent = "缩放";
    } else if (kind === "camera") {
      setTab("camera");
    }
  }

  $$(".effect").forEach((clip) => {
    clip.addEventListener("click", (event) => {
      event.stopPropagation();
      selectEffectClip(clip);
    });
  });

  primaryClip.addEventListener("click", (event) => {
    event.stopPropagation();
    clearClipSelection();
    primaryClip.classList.add("is-selected");
    $(".primary").classList.add("is-focused");
    setTab("frame");
  });

  function buildMeters() {
    $$(".meter").forEach((meter, rowIndex) => {
      let seed = rowIndex % 2 === 0 ? 31 : 67;
      const bars = [];
      for (let index = 0; index < 56; index += 1) {
        seed = (seed * 1103515245 + 12345) % 2147483648;
        const level = 0.1 + (seed % 82) / 100;
        bars.push('<i style="--l:' + level.toFixed(2) + ';height:' + Math.round(level * 100) + '%"></i>');
      }
      meter.innerHTML = bars.join("");
    });
  }

  function buildTimeline() {
    const ticks = [];
    for (let second = 0; second <= 24; second += 1) {
      const percent = (second / 24) * 100;
      ticks.push(
        '<div class="tick" style="left:' + percent + '%"><span>' +
          formatTime(second).slice(0, 5) + "</span></div>"
      );
    }
    ruler.innerHTML = ticks.join("");

    const thumbs = [];
    for (let index = 0; index < 24; index += 1) {
      const sun = 58 + ((index * 7) % 30);
      thumbs.push('<div class="thumb" style="--i:' + index + ";--sun-x:" + sun + '%"></div>');
    }
    filmstrip.innerHTML = thumbs.join("");

    const bars = [];
    let seed = 19;
    for (let index = 0; index < 180; index += 1) {
      seed = (seed * 1103515245 + 12345) % 2147483648;
      const height = 8 + (seed % 92);
      const width = index % 17 === 0 ? 2 : 1;
      bars.push('<i style="height:' + height + "%;flex:" + width + " 0 " + width + 'px"></i>');
    }
    waveform.innerHTML = bars.join("");
  }

  /* ---------------------------------------------------------------------
     Export
     --------------------------------------------------------------------- */

  function exportSummary() {
    const resLabel = { source: "原始", "1080": "1080p", "1440": "1440p", "2160": "4K" };
    const resFactor = { source: 1, "1080": 1, "1440": 1.7, "2160": 3.6 };
    const fpsFactor = state.exportFps === "60" ? 1.55 : 1;
    const fmtFactor = state.exportFmt === "m4a" ? 0.15 : 1;
    const size = Math.max(4, Math.round(48 * resFactor[state.exportRes] * fpsFactor * fmtFactor));
    $("#exportSize").textContent = size + " MB";
    const codec = state.exportFmt === "m4a" ? "AAC · 48 kHz" : "H.264 · 硬件加速";
    $("#exportSize").closest(".export-summary").querySelectorAll("b")[1].textContent = codec;
    $(".export-thumb > span").textContent =
      resLabel[state.exportRes] + " · " + (state.exportFmt === "m4a" ? "M4A" : "H.264");
    return size;
  }

  function resetExport() {
    window.clearInterval(exportTimer);
    state.exporting = false;
    state.exportDone = false;
    dialog.classList.remove("is-done");
    progress.hidden = true;
    progressBar.style.width = "0%";
    progressPct.textContent = "0%";
    progressText.textContent = "正在编码…";
    startExport.disabled = false;
    cancelExport.disabled = false;
    startExport.innerHTML = '<svg class="ic"><use href="#i-share"></use></svg><span>开始导出</span>';
    exportSummary();
  }

  function openExport() {
    if (!dialog.open) dialog.showModal();
    resetExport();
    window.clearTimeout(openExportAfterFrame);
    openExportAfterFrame = window.setTimeout(() => refreshSegs(dialog), 30);
  }

  function closeExport() {
    window.clearInterval(exportTimer);
    state.exporting = false;
    cancelExport.disabled = false;
    startExport.disabled = false;
    if (dialog.open) dialog.close();
  }

  function finishExport() {
    window.clearInterval(exportTimer);
    state.exporting = false;
    state.exportDone = true;
    dialog.classList.add("is-done");
    progressBar.style.width = "100%";
    progressPct.textContent = "100%";
    progressText.textContent = "导出完成 · " + exportSummary() + " MB";
    startExport.disabled = false;
    cancelExport.disabled = false;
    startExport.innerHTML = '<svg class="ic"><use href="#i-check"></use></svg><span>完成</span>';
    showToast("导出完成", "文件已写入「影片 / Graphite」文件夹");
  }

  function startExportRun() {
    if (state.exportDone) {
      closeExport();
      return;
    }
    if (state.exporting) return;
    state.exporting = true;
    startExport.disabled = true;
    cancelExport.disabled = true;
    progress.hidden = false;
    progressBar.style.width = "0%";
    progressPct.textContent = "0%";
    progressText.textContent = "正在编码…";
    let progressValue = 0;
    exportTimer = window.setInterval(() => {
      progressValue = Math.min(100, progressValue + 2 + Math.random() * 7);
      progressBar.style.width = progressValue + "%";
      progressPct.textContent = Math.round(progressValue) + "%";
      progressText.textContent =
        progressValue < 72 ? "正在编码…" : progressValue < 94 ? "正在封装音轨…" : "正在写入文件…";
      if (progressValue >= 100) {
        window.clearInterval(exportTimer);
        finishExport();
      }
    }, 90);
  }

  $("#exportBtn").addEventListener("click", openExport);
  $("#closeExport").addEventListener("click", closeExport);
  $("#cancelExport").addEventListener("click", closeExport);
  startExport.addEventListener("click", startExportRun);
  dialog.addEventListener("close", () => {
    window.clearInterval(exportTimer);
    state.exporting = false;
  });
  dialog.addEventListener("click", (event) => {
    if (event.target === dialog) closeExport();
  });

  [["#resSeg", "res"], ["#fpsSeg", "fps"], ["#fmtSeg", "fmt"]].forEach(([selector, key]) => {
    $$(".seg", $(selector)).forEach((button) => {
      button.addEventListener("click", () => {
        selectSegment($(selector), button, true);
        if (key === "res") state.exportRes = button.dataset.res;
        if (key === "fps") state.exportFps = button.dataset.fps;
        if (key === "fmt") state.exportFmt = button.dataset.fmt;
        exportSummary();
      });
    });
  });

  /* ---------------------------------------------------------------------
     Misc chrome actions
     --------------------------------------------------------------------- */

  $("#themeBtn").addEventListener("click", toggleTheme);
  $("#presetBtn").addEventListener("click", () =>
    showToast("场景预设已保存", "当前画面、运镜与光标设置已打包为「潮汐 · 演示」")
  );
  $("#settingsBtn").addEventListener("click", () =>
    showToast("设置属于另一个窗口", "这个页面聚焦编辑器的工作区与时间线")
  );
  $("#projectChip").addEventListener("click", () =>
    showToast("项目：潮汐 · 产品演示", "24.0 秒 · 16:9 · 1080p · 已自动保存")
  );
  $("#cropBtn").addEventListener("click", () =>
    showToast("裁切模式", "拖动画面边缘裁切；演示里保留完整的画面")
  );
  $("#ratioBtn").addEventListener("click", () =>
    showToast("画布比例", "在检查器「画面 → 布局」里切换 16:9、9:16、1:1 或 4:3")
  );
  $("#undoBtn").addEventListener("click", () => showToast("没有更多可撤销的操作", "历史记录从打开项目时开始"));
  $("#redoBtn").addEventListener("click", () => showToast("没有更多可重做的操作", "历史记录从打开项目时开始"));
  $("#previewOpening").addEventListener("click", () => {
    pause();
    setTime(0);
    play();
    showToast("正在预览开场", "从 00:00 播放，时长 0.8 秒");
  });

  const markerButton = $('.timeline-top button[title^="添加标记"]');
  if (markerButton) {
    markerButton.addEventListener("click", () =>
      showToast("已添加标记", formatTime(state.time) + " · 这个标记不会进入成片")
    );
  }

  const trackButton = $('.timeline-top button[title="轨道显示"]');
  if (trackButton) {
    trackButton.addEventListener("click", () =>
      showToast("轨道显示", "缩放、摄像运动与叠加轨道都在时间线上")
    );
  }

  const addButton = $('.hud button[title="添加到画面"]');
  if (addButton) {
    addButton.addEventListener("click", () =>
      showToast("添加到画面", "可以加入柔化、突出或一张贴图")
    );
  }

  const previewButton = $('.hud button[title="预览选项"]');
  if (previewButton) {
    previewButton.addEventListener("click", () =>
      showToast("预览质量", "当前为完整分辨率；播放时也可以流畅预览")
    );
  }

  $("#trashBtn").addEventListener("click", () =>
    showToast("演示项目不会被删除", "这是一个只读的设计演示，可以放心把玩")
  );

  /* ---------------------------------------------------------------------
     Keyboard
     --------------------------------------------------------------------- */

  window.addEventListener("keydown", (event) => {
    const target = event.target;
    const editing =
      target instanceof HTMLElement &&
      (target.closest("input, textarea, select, button, [contenteditable]") || target.isContentEditable);
    if (dialog.open) return;
    if (editing) return;

    if (event.code === "Space") {
      event.preventDefault();
      state.playing ? pause() : play();
    } else if (event.key === "ArrowLeft") {
      event.preventDefault();
      pause();
      setTime(state.time - 1 / 30);
    } else if (event.key === "ArrowRight") {
      event.preventDefault();
      pause();
      setTime(state.time + 1 / 30);
    } else if (event.key.toLowerCase() === "d") {
      toggleTheme();
    } else if (event.key.toLowerCase() === "e" && !event.metaKey && !event.ctrlKey) {
      openExport();
    }
  });

  window.addEventListener("beforeunload", () => {
    if (raf) cancelAnimationFrame(raf);
    window.clearInterval(exportTimer);
  });

  /* ---------------------------------------------------------------------
     Boot
     --------------------------------------------------------------------- */

  const queryTheme = new URLSearchParams(location.search).get("theme");
  const initialTheme =
    queryTheme === "dark" || queryTheme === "light" ? queryTheme : storedTheme() || "light";
  setTheme(initialTheme, false);

  buildMeters();
  buildTimeline();
  renderSwatches();
  setTime(6.12);
  updatePlayUI();
  exportSummary();
  fitCanvas();
  booted = true;

  window.requestAnimationFrame(() => {
    placeTabPill();
    refreshSegs();
  });

  document.fonts.ready.then(() => {
    placeTabPill();
    refreshSegs();
  });

  const resizeObserver = new ResizeObserver(() => {
    fitCanvas();
    placeTabPill();
    refreshSegs();
  });
  resizeObserver.observe(stage);
  resizeObserver.observe(inspector);

  window.addEventListener("resize", () => {
    fitCanvas();
    placeTabPill();
    refreshSegs();
  });

  // A compact inspector is an overlay on narrow screens.
  $("#toolsBtn").addEventListener("click", () => {
    inspector.classList.toggle("is-open");
  });

  stage.addEventListener("pointerdown", () => {
    if (window.matchMedia("(max-width: 980px)").matches) inspector.classList.remove("is-open");
  });
})();
