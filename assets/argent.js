/* ==========================================================================
   ARGENT — assets/argent.js
   Progressive enhancement for the Argent component system.
   No dependencies, no build step. Exposes window.Argent.
   ========================================================================== */

(() => {
  "use strict";

  const ICONS = {
    plus: '<path d="M9 3.5v11M3.5 9h11"/>',
    minus: '<path d="M3.5 9h11"/>',
    x: '<path d="m4.6 4.6 8.8 8.8M13.4 4.6l-8.8 8.8"/>',
    check: '<path d="m3.8 9.4 3.1 3.2 7.3-7.6"/>',
    "check-circle": '<circle cx="9" cy="9" r="6.6"/><path d="m5.8 9.2 2.2 2.2 4.2-4.4"/>',
    "alert-circle": '<circle cx="9" cy="9" r="6.6"/><path d="M9 5.4v4.2M9 12.4v.2"/>',
    "alert-triangle": '<path d="M9 2.7 16 15H2L9 2.7Z"/><path d="M9 7.2v3.4M9 13v.2"/>',
    info: '<circle cx="9" cy="9" r="6.6"/><path d="M9 8.2v4.2M9 5.4v.2"/>',
    help: '<circle cx="9" cy="9" r="6.6"/><path d="M7.1 6.8a2 2 0 1 1 2.6 1.9c-.6.2-.7.7-.7 1.2M9 12.9v.1"/>',
    "chevron-down": '<path d="m5 7.2 4 4 4-4"/>',
    "chevron-up": '<path d="m5 10.8 4-4 4 4"/>',
    "chevron-left": '<path d="m11 5-4 4 4 4"/>',
    "chevron-right": '<path d="m7 5 4 4-4 4"/>',
    "arrow-right": '<path d="M3.2 9h11.2M10.2 4.8 14.4 9l-4.2 4.2"/>',
    "arrow-left": '<path d="M14.8 9H3.6M7.8 4.8 3.6 9l4.2 4.2"/>',
    "arrow-up": '<path d="M9 14.8V3.6M4.8 7.8 9 3.6l4.2 4.2"/>',
    "arrow-down": '<path d="M9 3.2v11.2M4.8 10.2 9 14.4l4.2-4.2"/>',
    "arrow-up-right": '<path d="M5 13 13 5M6 5h7v7"/>',
    "arrow-down-right": '<path d="M5 5l8 8M6 13h7V6"/>',
    "up-down": '<path d="M6 3.8v10.4M3.4 11.6 6 14.2l2.6-2.6M12 14.2V3.8M9.4 6.4 12 3.8l2.6 2.6"/>',
    search: '<circle cx="8" cy="8" r="4.6"/><path d="m11.4 11.4 3.4 3.4"/>',
    filter: '<path d="M2.6 4.4h12.8l-5 5.6v3.8l-2.8 1.4V10L2.6 4.4Z"/>',
    sort: '<path d="M5 3.8v10.4M2.6 11.6 5 14l2.4-2.4M13 14.2V3.8M10.6 6.4 13 4l2.4 2.4"/>',
    settings: '<path d="M7.4 2.5h3.2l.4 1.8c.5.2.9.4 1.3.7l1.7-.6 1.6 2.8-1.4 1.2c.1.5.1 1 0 1.5l1.4 1.2-1.6 2.8-1.7-.6c-.4.3-.8.5-1.3.7l-.4 1.8H7.4l-.4-1.8c-.5-.2-.9-.4-1.3-.7l-1.7.6-1.6-2.8 1.4-1.2a5.3 5.3 0 0 1 0-1.5L2.4 7.2l1.6-2.8 1.7.6c.4-.3.8-.5 1.3-.7l.4-1.8Z"/><circle cx="9" cy="9" r="2.2"/>',
    sliders: '<path d="M2.5 4.5h4M9.5 4.5h6M2.5 9h7M12.5 9h3M2.5 13.5h2.2M7.7 13.5h7.8"/><circle cx="8" cy="4.5" r="1.5"/><circle cx="11" cy="9" r="1.5"/><circle cx="6.2" cy="13.5" r="1.5"/>',
    user: '<circle cx="9" cy="6.2" r="2.8"/><path d="M3.4 15c.5-3 2.6-4.4 5.6-4.4s5.1 1.4 5.6 4.4"/>',
    users: '<circle cx="7" cy="6.2" r="2.5"/><path d="M2.4 14.6c.4-2.6 2.2-4 4.6-4s4.2 1.4 4.6 4"/><path d="M11.5 4.2a2.4 2.4 0 0 1 0 4.4M12.4 10.8c1.7.2 2.9 1.4 3.2 3.4"/>',
    bell: '<path d="M4 12.2c.8-.8 1.1-1.8 1.1-3.1V7.3a3.9 3.9 0 0 1 7.8 0v1.8c0 1.3.3 2.3 1.1 3.1H4Z"/><path d="M7.2 14.2a1.9 1.9 0 0 0 3.6 0"/>',
    menu: '<path d="M3 5.2h12M3 9h12M3 12.8h12"/>',
    more: '<circle cx="4" cy="9" r="1"/><circle cx="9" cy="9" r="1"/><circle cx="14" cy="9" r="1"/>',
    "more-vertical": '<circle cx="9" cy="4" r="1"/><circle cx="9" cy="9" r="1"/><circle cx="9" cy="14" r="1"/>',
    edit: '<path d="M3.4 14.6h3.2L14.8 6.4a1.7 1.7 0 0 0-2.4-2.4L4.2 12.2l-.8 2.4Z"/><path d="m11.4 5 2.4 2.4"/>',
    trash: '<path d="M3.2 5h11.6M6.2 5V3.5h5.6V5M5.2 5l.7 9.4h6.2L12.8 5M7.5 7.8v4.5M10.5 7.8v4.5"/>',
    copy: '<rect x="6" y="6" width="8" height="9" rx="1.5"/><path d="M4 12V4.5c0-.8.7-1.5 1.5-1.5H11"/>',
    clipboard: '<rect x="4" y="3.5" width="10" height="12" rx="1.8"/><path d="M7 3.5V2.7h4v.8M6.5 7h5M6.5 10h5M6.5 13h3"/>',
    download: '<path d="M9 2.6v8.2M5.7 7.7 9 11l3.3-3.3M3.2 12.6v2.1h11.6v-2.1"/>',
    upload: '<path d="M9 11.4V3.2M5.7 6.5 9 3.2l3.3 3.3M3.2 12.6v2.1h11.6v-2.1"/>',
    share: '<circle cx="5" cy="9" r="2"/><circle cx="13" cy="4.5" r="2"/><circle cx="13" cy="13.5" r="2"/><path d="m6.8 8 4.4-2.6M6.8 10l4.4 2.6"/>',
    external: '<path d="M7 4H4.5c-.8 0-1.5.7-1.5 1.5v8c0 .8.7 1.5 1.5 1.5h8c.8 0 1.5-.7 1.5-1.5V11"/><path d="M10.5 3.5H14.5V7.5M14 4 8.5 9.5"/>',
    link: '<path d="M7.3 10.7a3.4 3.4 0 0 0 4.8 0l2-2a3.4 3.4 0 0 0-4.8-4.8l-1.1 1.1"/><path d="M10.7 7.3a3.4 3.4 0 0 0-4.8 0l-2 2a3.4 3.4 0 0 0 4.8 4.8l1.1-1.1"/>',
    refresh: '<path d="M14.6 8.2A5.7 5.7 0 0 0 4.2 5.6L2.8 7M3.4 9.8a5.7 5.7 0 0 0 10.4 2.6l1.4-1.4"/><path d="M2.8 3.8V7h3.2M15.2 14.2V11h-3.2"/>',
    play: '<path d="M6.5 4.2 13.6 9l-7.1 4.8V4.2Z" fill="currentColor" stroke="none"/>',
    pause: '<path d="M6.4 4v10M11.6 4v10"/>',
    stop: '<rect x="5" y="5" width="8" height="8" rx="1" fill="currentColor" stroke="none"/>',
    "skip-back": '<path d="M12 4.5 6.8 9l5.2 4.5V4.5Z" fill="currentColor" stroke="none"/><path d="M4.2 4.5v9"/>',
    "skip-forward": '<path d="M6 4.5 11.2 9 6 13.5V4.5Z" fill="currentColor" stroke="none"/><path d="M13.8 4.5v9"/>',
    lock: '<rect x="4" y="8" width="10" height="7" rx="1.6"/><path d="M6.2 8V6.2a2.8 2.8 0 0 1 5.6 0V8"/>',
    unlock: '<rect x="4" y="8" width="10" height="7" rx="1.6"/><path d="M6.2 8V6.2a2.8 2.8 0 0 1 5.4-.8"/>',
    eye: '<path d="M1.9 9S4.7 4.6 9 4.6 16.1 9 16.1 9 13.3 13.4 9 13.4 1.9 9 1.9 9Z"/><circle cx="9" cy="9" r="2.1"/>',
    "eye-off": '<path d="M2.2 2.2 15.8 15.8M6.5 5.1A8 8 0 0 1 9 4.6c4.3 0 7.1 4.4 7.1 4.4a12 12 0 0 1-2.4 2.9M4.1 6.2A12 12 0 0 0 1.9 9S4.7 13.4 9 13.4c1 0 1.9-.2 2.7-.6"/><path d="M7.7 7.7a1.9 1.9 0 0 0 2.6 2.6"/>',
    calendar: '<rect x="2.8" y="4" width="12.4" height="11" rx="1.8"/><path d="M5.6 2.6V5M12.4 2.6V5M2.8 7.2h12.4M5.6 9.8h1M8.5 9.8h1M11.4 9.8h1M5.6 12.2h1M8.5 12.2h1"/>',
    clock: '<circle cx="9" cy="9" r="6.6"/><path d="M9 5.2V9l2.6 1.5"/>',
    folder: '<path d="M2.5 5.2V4.4c0-.6.5-1.1 1.1-1.1h2.3c.4 0 .8.2 1 .5l.9 1.1h5.6c.6 0 1.1.5 1.1 1.1v7.4c0 .6-.5 1.1-1.1 1.1H3.6c-.6 0-1.1-.5-1.1-1.1V5.2Z"/>',
    "folder-plus": '<path d="M2.5 5.2V4.4c0-.6.5-1.1 1.1-1.1h2.3c.4 0 .8.2 1 .5l.9 1.1h5.6c.6 0 1.1.5 1.1 1.1v7.4c0 .6-.5 1.1-1.1 1.1H3.6c-.6 0-1.1-.5-1.1-1.1V5.2Z"/><path d="M9 8v4M7 10h4"/>',
    file: '<path d="M4.5 2.5h6l3 3v10h-9v-13Z"/><path d="M10.5 2.5v3h3M6.5 9h5M6.5 11.5h5"/>',
    "file-plus": '<path d="M4.5 2.5h6l3 3v10h-9v-13Z"/><path d="M10.5 2.5v3h3M9 8v4M7 10h4"/>',
    image: '<rect x="2.5" y="3.2" width="13" height="11.6" rx="1.8"/><circle cx="6.2" cy="6.7" r="1.1"/><path d="m3.6 12.6 3.5-3.3 2.6 2.3 2.4-2.1 2.5 2.2"/>',
    grid: '<rect x="2.6" y="2.6" width="4.4" height="4.4" rx="1"/><rect x="11" y="2.6" width="4.4" height="4.4" rx="1"/><rect x="2.6" y="11" width="4.4" height="4.4" rx="1"/><rect x="11" y="11" width="4.4" height="4.4" rx="1"/>',
    list: '<path d="M6 4.5h9M6 9h9M6 13.5h9"/><circle cx="3" cy="4.5" r=".7" fill="currentColor" stroke="none"/><circle cx="3" cy="9" r=".7" fill="currentColor" stroke="none"/><circle cx="3" cy="13.5" r=".7" fill="currentColor" stroke="none"/>',
    table: '<rect x="2.5" y="3.5" width="13" height="11" rx="1.5"/><path d="M2.5 7h13M7.5 7v7.5M12 7v7.5"/>',
    chart: '<path d="M3 14.5V10M7 14.5V6M11 14.5V8M15 14.5V3.5"/>',
    activity: '<path d="M2.2 9h3l2-5 3.4 10 2-5h3.2"/>',
    command: '<path d="M6.5 4.5a2 2 0 1 1-2 2h9a2 2 0 1 1-2-2v9a2 2 0 1 1 2-2h-9a2 2 0 1 1 2 2v-9Z"/>',
    mark: '<path d="M3.8 14.8 9 3.2l5.2 11.6M6.2 10.6h5.6"/>',
    keyboard: '<rect x="2" y="4.6" width="14" height="8.8" rx="1.8"/><path d="M4.6 7.2h.3M7.2 7.2h.3M9.8 7.2h.3M12.4 7.2h.3M5.6 10.4h6.8"/>',
    sun: '<circle cx="9" cy="9" r="3"/><path d="M9 1.8v1.5M9 14.7v1.5M1.8 9h1.5M14.7 9h1.5M3.9 3.9l1 1M13.1 13.1l1 1M14.1 3.9l-1 1M4.9 13.1l-1 1"/>',
    moon: '<path d="M11.2 2.7a6.7 6.7 0 1 0 4.1 8.4 5.4 5.4 0 0 1-4.1-8.4Z"/>',
    "panel-left": '<rect x="2.5" y="3" width="13" height="12" rx="1.6"/><path d="M7.2 3v12"/>',
    "panel-right": '<rect x="2.5" y="3" width="13" height="12" rx="1.6"/><path d="M10.8 3v12"/>',
    maximize: '<path d="M3 6.5V3h3.5M14.9 6.5V3h-3.4M3 11.5V15h3.5M14.9 11.5V15h-3.4"/>',
    minimize: '<path d="M6.5 3v3.5H3M11.5 3v3.5H15M6.5 15v-3.5H3M11.5 15v-3.5H15"/>',
    drag: '<circle cx="6" cy="6" r=".9" fill="currentColor" stroke="none"/><circle cx="12" cy="6" r=".9" fill="currentColor" stroke="none"/><circle cx="6" cy="9" r=".9" fill="currentColor" stroke="none"/><circle cx="12" cy="9" r=".9" fill="currentColor" stroke="none"/><circle cx="6" cy="12" r=".9" fill="currentColor" stroke="none"/><circle cx="12" cy="12" r=".9" fill="currentColor" stroke="none"/>',
    sparkles: '<path d="M9 2.2 10.2 6 14 7.3l-3.8 1.2L9 12.4 7.8 8.5 4 7.3 7.8 6 9 2.2Z"/><path d="M14 12v3M12.5 13.5h3"/>',
    layers: '<path d="m9 2.8 6.2 3.3L9 9.4 2.8 6.1 9 2.8Z"/><path d="m3 9.2 6 3.2 6-3.2M3 12.2l6 3.2 6-3.2"/>',
    database: '<ellipse cx="9" cy="4.5" rx="5.8" ry="2.2"/><path d="M3.2 4.5v9c0 1.2 2.6 2.2 5.8 2.2s5.8-1 5.8-2.2v-9M3.2 9c0 1.2 2.6 2.2 5.8 2.2s5.8-1 5.8-2.2"/>',
    cloud: '<path d="M5.2 13.5h8a3 3 0 0 0 .4-6 4.4 4.4 0 0 0-8.4-.8 3.4 3.4 0 0 0 0 6.8Z"/>',
    "credit-card": '<rect x="2.2" y="4" width="13.6" height="10" rx="1.8"/><path d="M2.2 7.3h13.6M5 10.5h2"/>',
    logout: '<path d="M10 3.2H4.8c-.8 0-1.4.6-1.4 1.4v8.8c0 .8.6 1.4 1.4 1.4H10"/><path d="M7.8 9h7.4M12.2 6.2 15 9l-2.8 2.8"/>',
    star: '<path d="m9 2.4 2 4.2 4.6.6-3.4 3.3.9 4.5L9 12.8 4.9 15l.9-4.5L2.4 7.2 7 6.6 9 2.4Z"/>',
    bookmark: '<path d="M4.5 2.8h9v12.4L9 12.4l-4.5 2.8V2.8Z"/>',
    tag: '<path d="M8.4 2.8H3.2c-.2 0-.4.2-.4.4v5.2l7.4 7.4 6-6-7.8-7Z"/><circle cx="6" cy="6" r="1"/>',
    pin: '<path d="m7 11 4-4M9.8 3.2l5 5-2.2 1.2-2.9 2.9-1.2 2.2-5-5 2.2-1.2L8.6 5.4l1.2-2.2Z"/>',
    globe: '<circle cx="9" cy="9" r="6.6"/><path d="M2.5 9h13M9 2.4c1.8 2 2.7 4.2 2.7 6.6S10.8 13.6 9 15.6C7.2 13.6 6.3 11.4 6.3 9S7.2 4.4 9 2.4Z"/>',
    mail: '<rect x="2.4" y="4" width="13.2" height="10" rx="1.8"/><path d="m3 5 6 5 6-5"/>',
    "map-pin": '<path d="M9 15.5c3-3.2 5-5.7 5-8a5 5 0 0 0-10 0c0 2.3 2 4.8 5 8Z"/><circle cx="9" cy="7.4" r="1.8"/>',
    scissors: '<circle cx="4.6" cy="12.8" r="2.1"/><circle cx="4.6" cy="5.2" r="2.1"/><path d="M6.3 11.5 14.5 3.2M6.3 6.5 14.5 14.8"/>',
    crop: '<path d="M5.4 2.2v10.4h10.4M2.2 5.4h10.4v10.4"/>',
    "zoom-in": '<circle cx="8" cy="8" r="4.6"/><path d="m11.4 11.4 3.4 3.4M6.2 8h3.6M8 6.2v3.6"/>',
    "zoom-out": '<circle cx="8" cy="8" r="4.6"/><path d="m11.4 11.4 3.4 3.4M6.2 8h3.6"/>',
    move: '<path d="M9 2.8v12.4M2.8 9h12.4M9 2.8 7 4.8M9 2.8l2 2M9 15.2l-2-2M9 15.2l2-2M2.8 9l2-2M2.8 9l2 2M15.2 9l-2-2M15.2 9l-2 2"/>',
    type: '<path d="M4 4.5h10M9 4.5v9M6.5 13.5h5"/>',
    undo: '<path d="M6.4 4.6 3 8l3.4 3.4"/><path d="M3 8h6.2c3 0 5.1 1.8 5.1 4.4"/>',
    redo: '<path d="m11.6 4.6 3.4 3.4-3.4 3.4"/><path d="M15 8H8.8C5.8 8 3.7 9.8 3.7 12.4"/>',
    save: '<path d="M3.2 3.2h9.6L15 5.4v9.4H3.2V3.2Z"/><path d="M6 3.2v4h6v-4M6 14.8v-4h6v4"/>',
    send: '<path d="m15.2 2.8-6 12.4-1.8-5.4-5.4-1.8 13.2-5.2Z"/><path d="M7.6 9.8 15.2 2.8"/>',
    paperclip: '<path d="m10.8 5.2-4.6 4.6a2.2 2.2 0 0 0 3.1 3.1l5-5a3.7 3.7 0 0 0-5.2-5.2L3.8 8.4a5.2 5.2 0 0 0 7.4 7.4l4-4"/>',
    microphone: '<rect x="6.7" y="2.2" width="4.6" height="8.4" rx="2.3"/><path d="M4.4 8.7a4.6 4.6 0 0 0 9.2 0M9 13.3V15.6M6.4 15.6h5.2"/>',
    camera: '<rect x="2.2" y="4.9" width="9.6" height="8.2" rx="1.8"/><path d="m11.8 7.3 4-2.2v7.8l-4-2.2"/>',
    volume: '<path d="M2.5 7h2.8L8.8 3.8v10.4L5.3 11H2.5V7Z"/><path d="M11.4 7a2.8 2.8 0 0 1 0 4M13.8 4.6a6 6 0 0 1 0 8.8"/>',
    loader: '<path d="M9 2.4a6.6 6.6 0 1 0 6.6 6.6" />',
    dot: '<circle cx="9" cy="9" r="2.2" fill="currentColor" stroke="none"/>',
    ruler: '<path d="M2.6 11.4 11.4 2.6l4 4-8.8 8.8-4-4Z"/><path d="m5.2 8.8 1.4 1.4M7.6 6.4 9 7.8M10 4l1.4 1.4"/>',
    rows: '<rect x="2.5" y="3.5" width="13" height="4.2" rx="1"/><rect x="2.5" y="10.3" width="13" height="4.2" rx="1"/>',
    inbox: '<path d="M2.5 10.5 4.4 3.5h9.2l1.9 7v4H2.5v-4Z"/><path d="M2.5 10.5h3.7l1 1.6h3.6l1-1.6h3.7"/>'
  };

  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

  function icon(name, cls = "") {
    const body = ICONS[name] || ICONS.dot;
    return '<svg class="ag-icon ' + cls + '" viewBox="0 0 18 18" aria-hidden="true">' + body + "</svg>";
  }

  function injectIcons(root = document) {
    $$("[data-icon]", root).forEach((host) => {
      const name = host.getAttribute("data-icon");
      const cls = host.getAttribute("data-icon-class") || "";
      const label = host.getAttribute("aria-label");
      host.innerHTML = icon(name, cls);
      host.classList.add("ag-icon-host");
      if (label) {
        host.setAttribute("role", "img");
        host.setAttribute("aria-label", label);
      }
    });
  }

  /* ---------------------------------------------------------------------
     Theme, density, brand, motion
     --------------------------------------------------------------------- */

  function readStored(key, fallback) {
    try { return localStorage.getItem(key) || fallback; } catch (e) { return fallback; }
  }
  function store(key, value) {
    try { localStorage.setItem(key, value); } catch (e) {}
  }

  function setTheme(theme, persist = true) {
    document.documentElement.setAttribute("data-theme", theme);
    $$("[data-theme-set]").forEach((el) => {
      el.classList.toggle("is-on", el.getAttribute("data-theme-set") === theme);
      if (el.getAttribute("role") === "tab") el.setAttribute("aria-selected", String(el.getAttribute("data-theme-set") === theme));
    });
    if (persist) store("argent-theme", theme);
  }
  function setDensity(density, persist = true) {
    document.documentElement.setAttribute("data-density", density);
    $$("[data-density-set]").forEach((el) => el.classList.toggle("is-on", el.getAttribute("data-density-set") === density));
    if (persist) store("argent-density", density);
    document.dispatchEvent(new CustomEvent("argent:density", { detail: { density } }));
  }
  function setBrand(brand, persist = true) {
    document.documentElement.setAttribute("data-brand", brand);
    $$("[data-brand-set]").forEach((el) => el.classList.toggle("is-on", el.getAttribute("data-brand-set") === brand));
    if (persist) store("argent-brand", brand);
  }
  function setMotion(mode) {
    document.documentElement.setAttribute("data-motion", mode);
    $$("[data-motion-set]").forEach((el) => el.classList.toggle("is-on", el.getAttribute("data-motion-set") === mode));
  }

  function initPreferences() {
    const params = new URLSearchParams(location.search);
    const theme = params.get("theme") || readStored("argent-theme", "light");
    const density = params.get("density") || readStored("argent-density", "comfortable");
    const brand = params.get("brand") || readStored("argent-brand", "graphite");
    setTheme(theme, false);
    setDensity(density, false);
    setBrand(brand, false);
    setMotion("on");

    $$("[data-theme-set]").forEach((el) => el.addEventListener("click", () => setTheme(el.getAttribute("data-theme-set"))));
    $$("[data-theme-toggle]").forEach((el) => el.addEventListener("click", () => setTheme(document.documentElement.getAttribute("data-theme") === "dark" ? "light" : "dark")));
    $$("[data-density-set]").forEach((el) => el.addEventListener("click", () => setDensity(el.getAttribute("data-density-set"))));
    $$("[data-brand-set]").forEach((el) => el.addEventListener("click", () => setBrand(el.getAttribute("data-brand-set"))));
    $$("[data-motion-set]").forEach((el) => el.addEventListener("click", () => setMotion(el.getAttribute("data-motion-set"))));
  }

  /* ---------------------------------------------------------------------
     Tabs / segments
     --------------------------------------------------------------------- */

  function activateTab(tab, options = {}) {
    const tabs = tab.closest("[data-tabs]");
    if (!tabs) return;
    const name = tab.getAttribute("data-tab");
    $$(".ag-tab", tabs).forEach((el) => {
      const on = el === tab;
      el.classList.toggle("is-active", on);
      el.setAttribute("aria-selected", String(on));
      el.tabIndex = on ? 0 : -1;
    });
    if (name) {
      $$("[data-tab-panel]").forEach((panel) => {
        const on = panel.getAttribute("data-tab-panel") === name;
        panel.hidden = !on;
        panel.classList.toggle("is-active", on);
      });
    }
    if (tabs.classList.contains("is-pill")) placeTabIndicator(tabs);
    if (options.focus) tab.focus();
    tabs.dispatchEvent(new CustomEvent("argent:tab", { bubbles: true, detail: { value: name } }));
  }

  function placeTabIndicator(tabs) {
    let indicator = $(".ag-tab-indicator", tabs);
    if (!indicator) {
      indicator = document.createElement("span");
      indicator.className = "ag-tab-indicator";
      tabs.prepend(indicator);
    }
    const on = $(".ag-tab.is-active", tabs);
    if (!on || !tabs.clientWidth) return;
    const tr = tabs.getBoundingClientRect();
    const r = on.getBoundingClientRect();
    indicator.style.width = r.width + "px";
    indicator.style.transform = "translateX(" + (r.left - tr.left - 3) + "px)";
  }

  function initTabs() {
    $$("[data-tabs]").forEach((tabs) => {
      const buttons = $$(".ag-tab", tabs);
      buttons.forEach((tab) => {
        tab.setAttribute("role", tab.getAttribute("role") || "tab");
        tab.addEventListener("click", () => activateTab(tab));
      });
      const active = $(".ag-tab.is-active", tabs) || buttons[0];
      if (active) activateTab(active);
      tabs.addEventListener("keydown", (event) => {
        if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;
        event.preventDefault();
        let index = buttons.indexOf($(".ag-tab.is-active", tabs));
        if (event.key === "ArrowLeft") index = (index + buttons.length - 1) % buttons.length;
        if (event.key === "ArrowRight") index = (index + 1) % buttons.length;
        if (event.key === "Home") index = 0;
        if (event.key === "End") index = buttons.length - 1;
        activateTab(buttons[index], { focus: true });
      });
    });
  }

  function placeSeg(seg) {
    let thumb = $(".ag-seg-thumb", seg);
    if (!thumb) {
      thumb = document.createElement("span");
      thumb.className = "ag-seg-thumb";
      seg.prepend(thumb);
    }
    const on = $(".ag-seg.is-on", seg);
    if (!on || !seg.clientWidth) return;
    thumb.style.width = on.offsetWidth + "px";
    thumb.style.transform = "translateX(" + Math.max(0, on.offsetLeft - 2) + "px)";
  }

  function initSegments() {
    $$("[data-segment]").forEach((seg) => {
      const buttons = $$(".ag-seg", seg);
      buttons.forEach((button) => {
        button.addEventListener("click", () => {
          $$(".ag-seg", seg).forEach((el) => {
            const on = el === button;
            el.classList.toggle("is-on", on);
            el.setAttribute("aria-selected", String(on));
          });
          placeSeg(seg);
          seg.dispatchEvent(new CustomEvent("argent:segment", { bubbles: true, detail: { value: button.getAttribute("data-value") || button.textContent.trim(), button } }));
        });
      });
      requestAnimationFrame(() => placeSeg(seg));
    });
  }

  function refreshLayout() {
    $$("[data-tabs].is-pill").forEach(placeTabIndicator);
    $$("[data-segment]").forEach(placeSeg);
  }

  /* ---------------------------------------------------------------------
     Popovers / menus
     --------------------------------------------------------------------- */

  let openPopover = null;

  function positionPopover(popover, trigger) {
    const r = trigger.getBoundingClientRect();
    const pw = popover.offsetWidth || 220;
    const ph = popover.offsetHeight || 200;
    let left = Math.min(r.left, innerWidth - pw - 12);
    let top = r.bottom + 6;
    if (top + ph > innerHeight - 12) top = Math.max(12, r.top - ph - 6);
    popover.style.position = "fixed";
    popover.style.left = Math.max(12, left) + "px";
    popover.style.top = top + "px";
  }

  function closePopovers(except) {
    $$(".ag-popover").forEach((popover) => {
      if (popover === except) return;
      popover.hidden = true;
      const id = popover.id;
      if (id) $$('[data-popover="' + id + '"]').forEach((t) => t.setAttribute("aria-expanded", "false"));
    });
    if (!except) openPopover = null;
  }

  function initPopovers() {
    $$("[data-popover]").forEach((trigger) => {
      const id = trigger.getAttribute("data-popover");
      const popover = document.getElementById(id);
      if (!popover) return;
      trigger.setAttribute("aria-haspopup", "menu");
      trigger.setAttribute("aria-expanded", "false");
      trigger.addEventListener("click", (event) => {
        event.stopPropagation();
        const willOpen = popover.hidden;
        closePopovers(popover);
        popover.hidden = !willOpen;
        trigger.setAttribute("aria-expanded", String(willOpen));
        if (willOpen) {
          positionPopover(popover, trigger);
          openPopover = popover;
        } else {
          openPopover = null;
        }
      });
    });
    document.addEventListener("pointerdown", (event) => {
      if (event.target.closest(".ag-popover") || event.target.closest("[data-popover]")) return;
      closePopovers();
    });
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") closePopovers();
    });
    $$(".ag-popover [data-close]").forEach((el) => el.addEventListener("click", () => closePopovers()));
    window.addEventListener("resize", () => closePopovers());
    window.addEventListener("scroll", () => closePopovers(), true);
  }

  /* ---------------------------------------------------------------------
     Dialogs / sheets
     --------------------------------------------------------------------- */

  function initDialogs() {
    $$("[data-dialog]").forEach((trigger) => {
      const id = trigger.getAttribute("data-dialog");
      trigger.addEventListener("click", () => {
        const dialog = document.getElementById(id);
        if (dialog && typeof dialog.showModal === "function") dialog.showModal();
      });
    });
    $$("dialog.ag-dialog").forEach((dialog) => {
      dialog.addEventListener("click", (event) => {
        if (event.target === dialog) dialog.close();
      });
    });
    $$("[data-dialog-close]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const dialog = btn.closest("dialog");
        if (dialog) dialog.close();
      });
    });
    $$("[data-sheet]").forEach((trigger) => {
      const id = trigger.getAttribute("data-sheet");
      trigger.addEventListener("click", () => {
        const sheet = document.getElementById(id);
        const scrim = $('.ag-scrim[data-scrim="' + id + '"]');
        if (sheet) sheet.classList.add("is-open");
        if (scrim) scrim.classList.add("is-open");
      });
    });
    $$("[data-sheet-close]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const sheet = document.getElementById(btn.getAttribute("data-sheet-close"));
        const scrim = $('.ag-scrim[data-scrim="' + btn.getAttribute("data-sheet-close") + '"]');
        if (sheet) sheet.classList.remove("is-open");
        if (scrim) scrim.classList.remove("is-open");
      });
    });
    $$(".ag-scrim").forEach((scrim) => scrim.addEventListener("click", () => {
      const id = scrim.getAttribute("data-scrim");
      if (id) {
        const sheet = document.getElementById(id);
        if (sheet) sheet.classList.remove("is-open");
      }
      scrim.classList.remove("is-open");
    }));
  }

  /* ---------------------------------------------------------------------
     Command palette
     --------------------------------------------------------------------- */

  function initCommand() {
    const scrim = $(".ag-cmdk-scrim");
    if (!scrim) return;
    const input = $("input", scrim);
    const items = $$(".ag-cmdk-item", scrim);
    function open() {
      scrim.classList.add("is-open");
      if (input) { input.value = ""; input.focus(); }
      items.forEach((item) => (item.hidden = false));
      items[0]?.classList.add("is-active");
    }
    function close() {
      scrim.classList.remove("is-open");
      items.forEach((item) => item.classList.remove("is-active"));
    }
    $$("[data-cmdk]").forEach((el) => el.addEventListener("click", open));
    scrim.addEventListener("click", (event) => { if (event.target === scrim) close(); });
    input?.addEventListener("input", () => {
      const q = input.value.toLowerCase();
      items.forEach((item) => {
        const hit = item.textContent.toLowerCase().includes(q);
        item.hidden = !hit;
        item.classList.remove("is-active");
      });
      items.find((item) => !item.hidden)?.classList.add("is-active");
    });
    items.forEach((item) => {
      item.addEventListener("click", () => {
        scrim.dispatchEvent(new CustomEvent("argent:command", { detail: { value: item.getAttribute("data-cmd") || item.textContent.trim() } }));
        close();
      });
    });
    document.addEventListener("keydown", (event) => {
      const isMac = navigator.platform.toUpperCase().includes("MAC");
      if ((isMac ? event.metaKey : event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        scrim.classList.contains("is-open") ? close() : open();
        return;
      }
      if (event.key === "Escape") close();
      if (event.key === "ArrowDown" || event.key === "ArrowUp") {
        const visible = items.filter((item) => !item.hidden);
        if (!visible.length) return;
        event.preventDefault();
        let index = visible.findIndex((item) => item.classList.contains("is-active"));
        index = (index + (event.key === "ArrowDown" ? 1 : visible.length - 1)) % visible.length;
        visible.forEach((item) => item.classList.remove("is-active"));
        visible[index].classList.add("is-active");
        visible[index].scrollIntoView({ block: "nearest" });
      }
      if (event.key === "Enter") {
        const active = items.find((item) => item.classList.contains("is-active"));
        if (active) active.click();
      }
    });
  }

  /* ---------------------------------------------------------------------
     Toasts
     --------------------------------------------------------------------- */

  function toast(options) {
    const opts = typeof options === "string" ? { title: options } : options || {};
    let stack = $(".ag-toast-stack");
    if (!stack) {
      stack = document.createElement("div");
      stack.className = "ag-toast-stack";
      document.body.appendChild(stack);
    }
    const type = opts.type || "default";
    const iconName = type === "success" ? "check-circle" : type === "danger" ? "alert-circle" : type === "warning" ? "alert-triangle" : "info";
    const el = document.createElement("div");
    el.className = "ag-toast";
    el.innerHTML =
      '<span class="ag-toast-icon">' + icon(iconName) + "</span>" +
      '<div class="ag-toast-body"><div class="ag-toast-title"></div><div class="ag-toast-text"></div></div>' +
      '<button class="ag-toast-close" aria-label="Dismiss">' + icon("x") + "</button>";
    el.querySelector(".ag-toast-title").textContent = opts.title || "Done";
    const text = el.querySelector(".ag-toast-text");
    if (opts.text) text.textContent = opts.text; else text.remove();
    el.querySelector(".ag-toast-close").addEventListener("click", () => remove(el));
    stack.appendChild(el);
    requestAnimationFrame(() => el.classList.add("is-open"));
    const timer = setTimeout(() => remove(el), opts.duration || 4200);
    function remove(node) {
      clearTimeout(timer);
      node.classList.remove("is-open");
      setTimeout(() => node.remove(), 300);
    }
    return el;
  }

  /* ---------------------------------------------------------------------
     Copy / range / stepper / password
     --------------------------------------------------------------------- */

  function copyText(text) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      return navigator.clipboard.writeText(text).catch(() => fallbackCopy(text));
    }
    return Promise.resolve(fallbackCopy(text));
  }
  function fallbackCopy(text) {
    const area = document.createElement("textarea");
    area.value = text;
    area.setAttribute("readonly", "");
    area.style.position = "fixed";
    area.style.opacity = "0";
    document.body.appendChild(area);
    area.select();
    try { document.execCommand("copy"); } catch (e) {}
    area.remove();
  }

  function initCopy() {
    $$("[data-copy]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const selector = btn.getAttribute("data-copy");
        const target = selector && selector !== "self" ? document.querySelector(selector) : btn.closest("[data-copy-source]");
        const text = target ? (target.innerText || target.textContent) : btn.getAttribute("data-copy-text") || "";
        copyText(text).then(() => toast({ title: "Copied", text: "Snippet copied to clipboard.", type: "success", duration: 2200 }));
      });
    });
  }

  function syncRange(input) {
    const min = Number(input.min || 0);
    const max = Number(input.max || 100);
    const value = Number(input.value);
    const pct = max === min ? 0 : ((value - min) / (max - min)) * 100;
    input.style.setProperty("--p", pct + "%");
    const row = input.closest(".ag-slider-row");
    const out = row ? row.querySelector("output") : null;
    if (out) {
      const suffix = input.getAttribute("data-suffix") || "";
      const decimals = Number(input.getAttribute("data-decimals") || 0);
      out.textContent = (decimals ? value.toFixed(decimals) : Math.round(value)) + suffix;
    }
  }

  function initRanges() {
    $$("input.ag-slider").forEach((input) => {
      input.addEventListener("input", () => syncRange(input));
      syncRange(input);
    });
  }

  function initSteppers() {
    $$("[data-stepper]").forEach((stepper) => {
      const input = $("input", stepper);
      $$("button", stepper).forEach((btn) => {
        btn.addEventListener("click", () => {
          const step = Number(btn.getAttribute("data-step") || 1);
          const min = input.min !== "" ? Number(input.min) : -Infinity;
          const max = input.max !== "" ? Number(input.max) : Infinity;
          input.value = String(Math.max(min, Math.min(max, Number(input.value || 0) + step)));
          input.dispatchEvent(new Event("input", { bubbles: true }));
        });
      });
    });
  }

  function initPasswordToggles() {
    $$("[data-password-toggle]").forEach((btn) => {
      const input = btn.parentElement.querySelector("input");
      if (!input) return;
      btn.addEventListener("click", () => {
        const show = input.type === "password";
        input.type = show ? "text" : "password";
        btn.innerHTML = icon(show ? "eye-off" : "eye");
        btn.setAttribute("aria-label", show ? "Hide password" : "Show password");
      });
    });
  }

  /* ---------------------------------------------------------------------
     Tables
     --------------------------------------------------------------------- */

  function initTables() {
    $$("[data-table]").forEach((table) => {
      const rows = $$("tbody tr", table);
      const all = $("[data-check-all]", table);
      const bulk = document.querySelector("[data-bulkbar]");
      const countEl = bulk ? bulk.querySelector("[data-bulk-count]") : null;
      function update() {
        const selected = rows.filter((row) => row.classList.contains("is-selected"));
        const boxes = rows.map((row) => $("[data-row-check]", row)).filter(Boolean);
        if (countEl) countEl.textContent = String(selected.length);
        if (bulk) bulk.classList.toggle("is-open", selected.length > 0);
        if (all) {
          all.checked = selected.length === rows.length && rows.length > 0;
          all.indeterminate = selected.length > 0 && selected.length < rows.length;
        }
        boxes.forEach((box) => {
          const row = box.closest("tr");
          row.classList.toggle("is-selected", box.checked);
        });
      }
      rows.forEach((row) => {
        const check = $("[data-row-check]", row);
        if (check) check.addEventListener("change", update);
      });
      all?.addEventListener("change", () => {
        rows.forEach((row) => {
          const check = $("[data-row-check]", row);
          if (check) check.checked = all.checked;
          row.classList.toggle("is-selected", all.checked);
        });
        update();
      });
      bulk?.querySelector("[data-bulk-clear]")?.addEventListener("click", () => {
        rows.forEach((row) => {
          const check = $("[data-row-check]", row);
          if (check) check.checked = false;
          row.classList.remove("is-selected");
        });
        if (all) all.checked = false;
        update();
      });
    });
  }

  /* ---------------------------------------------------------------------
     Save state helper
     --------------------------------------------------------------------- */

  function saveState(el, stateName, label) {
    if (!el) return;
    el.classList.toggle("is-saving", stateName === "saving");
    el.classList.toggle("is-dirty", stateName === "dirty");
    const text = el.querySelector("span");
    if (text && label) text.textContent = label;
  }

  /* ---------------------------------------------------------------------
     Boot
     --------------------------------------------------------------------- */

  function init(root = document) {
    injectIcons(root);
    initPreferences();
    initTabs();
    initSegments();
    initPopovers();
    initDialogs();
    initCommand();
    initCopy();
    initRanges();
    initSteppers();
    initPasswordToggles();
    initTables();
    refreshLayout();
  }

  window.Argent = {
    icon,
    injectIcons,
    init,
    toast,
    setTheme,
    setDensity,
    setBrand,
    setMotion,
    saveState,
    syncRange,
    refreshLayout,
    closePopovers
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => init());
  } else {
    init();
  }

  document.fonts?.ready.then(refreshLayout);
  window.addEventListener("resize", refreshLayout);
})();
