(() => {
  "use strict";

  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));
  const sections = $$("[data-section]").filter((el) => el.id && el.id !== "top");
  const tocLinks = $$("[data-toc]");
  const topLinks = $$("[data-top-link]");
  const top = $(".lab-top");
  const progress = $(".lab-progress i");

  const params = new URLSearchParams(location.search);
  if (params.get("spec") === "on") setSpec(true, false);
  if (params.get("theme")) {
    // Argent reads the same parameter on boot; keep the stage label in sync.
  }

  function setSpec(on, announce = true) {
    document.body.setAttribute("data-spec", on ? "on" : "off");
    const btn = $("[data-spec-toggle]");
    if (btn) btn.setAttribute("aria-pressed", String(on));
    if (announce && on && window.Argent) {
      window.Argent.toast({
        title: "Spec mode on",
        text: "8 px grid. Plate outlines. Measurements are now visible.",
        duration: 2600
      });
    }
  }

  $("[data-spec-toggle]")?.addEventListener("click", () => {
    setSpec(document.body.getAttribute("data-spec") !== "on");
  });

  function densityLabel(value) {
    return value === "compact" ? "Compact" : "Comfortable";
  }

  $("[data-density-toggle]")?.addEventListener("click", () => {
    const current = document.documentElement.getAttribute("data-density") || "comfortable";
    const next = current === "compact" ? "comfortable" : "compact";
    window.Argent.setDensity(next);
    const btn = $("[data-density-toggle]");
    if (btn) {
      btn.classList.toggle("is-on", next === "compact");
      btn.setAttribute("aria-label", "Density: " + densityLabel(next));
    }
    window.Argent.toast({
      title: densityLabel(next) + " density",
      text: next === "compact" ? "Rows 38 px, controls 30 px. Type unchanged." : "Rows 44 px, controls 34 px. The default rhythm.",
      duration: 2200
    });
  });

  document.addEventListener("argent:density", (event) => {
    const btn = $("[data-density-toggle]");
    if (btn) {
      const density = event.detail?.density || document.documentElement.getAttribute("data-density");
      btn.classList.toggle("is-on", density === "compact");
      btn.setAttribute("aria-label", "Density: " + densityLabel(density));
    }
  });

  // scroll spy
  let ticking = false;
  function updateScroll() {
    ticking = false;
    const y = window.scrollY + 160;
    let current = sections[0];
    for (const section of sections) {
      if (section.offsetTop <= y) current = section;
    }
    const id = current ? current.id : "";
    tocLinks.forEach((link) => link.classList.toggle("is-active", link.getAttribute("data-toc") === id));
    topLinks.forEach((link) => link.classList.toggle("is-active", link.getAttribute("data-top-link") === id));
    if (top) top.classList.toggle("is-scrolled", window.scrollY > 8);
    if (progress) {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      progress.style.width = (max > 0 ? Math.min(100, (window.scrollY / max) * 100) : 0) + "%";
    }
  }
  window.addEventListener("scroll", () => {
    if (!ticking) { ticking = true; requestAnimationFrame(updateScroll); }
  }, { passive: true });
  updateScroll();

  // command palette -> scroll
  document.addEventListener("argent:command", (event) => {
    const id = event.detail?.value;
    const target = id ? document.getElementById(id) : null;
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
      history.replaceState(null, "", "#" + id);
    }
  });

  // motion replay
  $$("[data-replay]").forEach((button) => {
    button.addEventListener("click", () => {
      const scope = button.closest(".lab-plate-stage") || document;
      const reduced = scope.querySelector(".reduced-square");
      if (reduced) {
        reduced.classList.toggle("is-moved");
        return;
      }
      const token = scope.querySelector(".motion-token");
      if (!token) return;
      token.classList.remove("is-playing");
      void token.offsetWidth;
      token.classList.add("is-playing");
      setTimeout(() => token.classList.remove("is-playing"), 620);
    });
  });

  // split demo
  $$("[data-split-toggle]").forEach((button) => {
    button.addEventListener("click", () => {
      const demo = $("[data-split-demo]");
      if (!demo) return;
      const collapsed = demo.classList.toggle("is-collapsed");
      button.setAttribute("aria-expanded", String(!collapsed));
      button.textContent = collapsed ? "Open inspector" : "Close inspector";
    });
  });

  // save state demo
  $$("[data-save-demo]").forEach((button) => {
    button.addEventListener("click", () => {
      const mode = button.getAttribute("data-save-demo");
      const state = $("[data-save-state], .pattern-save-copy .ag-save");
      const label = $("[data-save-label]");
      if (!state || !label) return;
      state.classList.remove("is-dirty", "is-saving");
      if (mode === "dirty") {
        state.classList.add("is-dirty");
        label.textContent = "Unsaved changes";
      } else if (mode === "saving") {
        state.classList.add("is-saving");
        label.textContent = "Saving…";
        setTimeout(() => {
          state.classList.remove("is-saving");
          label.textContent = "All changes saved";
        }, 900);
      } else {
        label.textContent = "All changes saved";
        window.Argent.toast({ title: "Saved", text: "Your changes are live.", type: "success", duration: 2000 });
      }
    });
  });

  // panel swap
  $$("[data-swap]").forEach((button) => {
    button.addEventListener("click", () => {
      const demo = $("[data-swap-demo]");
      if (!demo) return;
      $$(".swap-panel", demo).forEach((panel) => panel.classList.toggle("is-on"));
    });
  });

  // motion preference
  $$("[data-motion-toggle]").forEach((input) => {
    input.addEventListener("change", () => {
      window.Argent.setMotion(input.checked ? "on" : "off");
      const label = input.closest(".ag-switch")?.querySelector("span");
      if (label) label.textContent = input.checked ? "Motion on" : "Motion off";
    });
  });

  // demo toasts
  $$("[data-demo-toast]").forEach((button) => {
    button.addEventListener("click", () => {
      const type = button.getAttribute("data-demo-toast");
      const copy = type === "success"
        ? { title: "Changes published", text: "The new view is live for everyone." }
        : type === "danger"
          ? { title: "Could not save", text: "The server rejected the request. Try again." }
          : { title: "Draft restored", text: "We recovered the last version from 4 minutes ago." };
      window.Argent.toast({ ...copy, type: type === "danger" ? "danger" : type === "success" ? "success" : "default", duration: 3600 });
    });
  });

  // TOC links: mark current immediately on click
  $$("[data-toc], [data-top-link], .ag-cmdk-item").forEach((link) => {
    link.addEventListener("click", () => {
      const id = link.getAttribute("data-toc") || link.getAttribute("data-top-link") || link.getAttribute("data-cmd");
      if (!id) return;
      tocLinks.forEach((l) => l.classList.toggle("is-active", l.getAttribute("data-toc") === id));
      topLinks.forEach((l) => l.classList.toggle("is-active", l.getAttribute("data-top-link") === id));
    });
  });
})();
