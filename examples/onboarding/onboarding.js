(() => {
  "use strict";
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));

  const STEPS = {
    1: { kicker: "STEP 01 / SOURCE", title: "先选择来源。", desc: "可以连接生产数据库，也可以上传一个 CSV。导入只会读取，不会修改源数据。" },
    2: { kicker: "STEP 02 / MAPPING", title: "把字段对上。", desc: "Argent 自动匹配了 5 个字段。剩下两个需要你决定类型，之后可以随时修改。" },
    3: { kicker: "STEP 03 / REVIEW", title: "确认这次导入。", desc: "只读、可回滚。导入完成后，源数据库不会发生任何变化。" },
    4: { kicker: "COMPLETE", title: "已经接上了。", desc: "" },
  };

  let step = 1;
  const panels = $$("[data-step-panel]");
  const items = $$("[data-step-item]");
  const footer = $("[data-step-footer]");
  const next = $("[data-step-next]");
  const back = $("[data-step-back]");
  const title = $("[data-step-title]");
  const kicker = $("[data-step-kicker]");
  const desc = $("[data-step-desc]");
  const stepOf = $("[data-step-of]");

  function show(nextStep, options = {}) {
    step = Math.max(1, Math.min(4, nextStep));
    panels.forEach((panel) => { panel.hidden = Number(panel.getAttribute("data-step-panel")) !== step; });
    items.forEach((item) => {
      const index = Number(item.getAttribute("data-step-item"));
      item.classList.toggle("is-active", index === step);
      item.classList.toggle("is-done", index < step);
    });
    const meta = STEPS[step];
    kicker.textContent = meta.kicker;
    title.textContent = meta.title;
    desc.textContent = meta.desc;
    desc.style.display = meta.desc ? "" : "none";
    stepOf.textContent = "第 " + step + " 步，共 4 步";
    footer.hidden = step === 4;
    back.disabled = step === 1;
    if (step === 3) next.innerHTML = '开始导入 <span data-icon="arrow-right"></span>';
    else next.innerHTML = '继续 <span data-icon="arrow-right"></span>';
    if (window.Argent) window.Argent.injectIcons(next);
    if (options.scroll) window.scrollTo({ top: 0, behavior: "smooth" });
  }

  next?.addEventListener("click", () => {
    if (step === 3) {
      next.classList.add("is-loading");
      next.disabled = true;
      setTimeout(() => {
        next.classList.remove("is-loading");
        next.disabled = false;
        show(4);
        window.Argent.toast({ title: "导入完成", text: "3,421,908 行已写入 Northwind。", type: "success", duration: 3000 });
      }, 1400);
      return;
    }
    show(step + 1);
  });
  back?.addEventListener("click", () => show(step - 1));

  $$(".onboard-option").forEach((option) => {
    option.addEventListener("click", () => {
      $$(".onboard-option").forEach((item) => item.classList.remove("is-on"));
      option.classList.add("is-on");
    });
  });

  $("[data-test-connection]")?.addEventListener("click", (event) => {
    const button = event.currentTarget;
    button.classList.add("is-loading");
    button.disabled = true;
    setTimeout(() => {
      button.classList.remove("is-loading");
      button.disabled = false;
      const banner = $("[data-connection-result]");
      if (banner) banner.hidden = false;
      window.Argent.toast({ title: "连接成功", text: "12 张表可读。", type: "success", duration: 2200 });
    }, 900);
  });

  $("[data-restart]")?.addEventListener("click", () => {
    const banner = $("[data-connection-result]");
    if (banner) banner.hidden = true;
    show(1);
  });

  show(1);
})();
