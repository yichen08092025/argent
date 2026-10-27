(() => {
  "use strict";
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const saveLabel = $("[data-save-label]");
  const saveState = $(".settings-savebar .ag-save");
  const saveBtn = $("[data-save-save]");
  const discardBtn = $("[data-save-discard]");
  const savebar = $("[data-savebar]");
  const fields = $$(".settings-content input, .settings-content textarea, .settings-content select");
  const initial = new Map(fields.map((field) => [field, field.value]));
  let dirty = false;

  function setDirty(next) {
    dirty = next;
    if (saveState) {
      saveState.classList.remove("is-dirty", "is-saving", "is-saved");
      saveState.classList.add(next ? "is-dirty" : "is-saved");
      saveState.querySelector("span:last-child").textContent = next ? "未保存的更改" : "所有更改已保存";
      saveState.querySelector("[data-icon]")?.setAttribute("data-icon", next ? "dot" : "check");
      if (window.Argent) window.Argent.injectIcons(saveState);
    }
    if (saveBtn) saveBtn.disabled = !next;
    if (discardBtn) discardBtn.disabled = !next;
    if (savebar) savebar.classList.toggle("is-visible", next);
  }

  fields.forEach((field) => {
    field.addEventListener("input", () => setDirty(true));
    field.addEventListener("change", () => setDirty(true));
  });

  saveBtn?.addEventListener("click", () => {
    if (!dirty) return;
    saveState.classList.remove("is-dirty");
    saveState.classList.add("is-saving");
    saveState.querySelector("span:last-child").textContent = "保存中…";
    saveBtn.disabled = true;
    setTimeout(() => {
      setDirty(false);
      window.Argent.toast({ title: "已保存", text: "工作区设置已更新。", type: "success", duration: 2200 });
    }, 850);
  });

  discardBtn?.addEventListener("click", () => {
    initial.forEach((value, field) => { field.value = value; });
    setDirty(false);
    window.Argent.toast({ title: "已放弃更改", text: "字段已恢复到上次保存的状态。", duration: 2200 });
  });

  $$("[data-toast]").forEach((button) => {
    button.addEventListener("click", () => {
      if (button.getAttribute("data-toast") === "invite") {
        window.Argent.toast({ title: "邀请链接已复制", text: "链接 7 天内有效，可以发给 3 位成员。", type: "success", duration: 2600 });
      }
    });
  });

  setDirty(false);
})();
