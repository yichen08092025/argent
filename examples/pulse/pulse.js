(() => {
  "use strict";
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const shell = $("#shell");
  const inspector = $("#inspector");
  const rows = $$("[data-row]");

  const badgeMap = {
    Live: ["is-success", "is-success"],
    Paused: ["is-warning", "is-warning"],
    Draft: ["", ""],
    Failed: ["is-danger", "is-danger"],
  };

  function selectRow(row) {
    rows.forEach((item) => item.classList.remove("is-selected"));
    row.classList.add("is-selected");
    const name = row.getAttribute("data-name");
    const owner = row.getAttribute("data-owner");
    const events = row.getAttribute("data-events");
    const status = row.getAttribute("data-status");
    const source = row.getAttribute("data-source");
    $("#insName").textContent = name;
    $("#insOwner").textContent = owner;
    $("#insEvents").textContent = events;
    $("#insSource").textContent = source;
    $("#insStatus").textContent = status;
    const [badgeClass, dotClass] = badgeMap[status] || ["", ""];
    const badge = $("#insBadge");
    badge.className = "ag-badge " + badgeClass;
    badge.innerHTML = '<span class="ag-dot ' + dotClass + '"></span>' + status;
    shell.classList.remove("no-inspector");
    inspector.classList.add("is-open");
  }

  rows.forEach((row) => {
    row.addEventListener("click", (event) => {
      if (event.target.closest("input, button, a")) return;
      selectRow(row);
    });
  });

  $("[data-inspector-close]")?.addEventListener("click", () => {
    inspector.classList.remove("is-open");
    shell.classList.add("no-inspector");
  });

  document.addEventListener("argent:segment", (event) => {
    const value = event.detail?.value;
    if (["7", "30", "90"].includes(value)) {
      $("#rangeLabel").textContent = "过去 " + value + " 天";
      window.Argent.toast({ title: "时间范围已更新", text: "展示过去 " + value + " 天的信号。", duration: 1800 });
    }
  });

  $$("[data-toast]").forEach((button) => {
    button.addEventListener("click", () => {
      const type = button.getAttribute("data-toast");
      if (type === "export") {
        window.Argent.toast({ title: "导出已开始", text: "CSV 会出现在下载中，大约需要 10 秒。", type: "success" });
      } else {
        window.Argent.toast({ title: "新建信号", text: "这个示例没有连接后端；可以查看手册里的向导模式。", duration: 2600 });
      }
    });
  });


})();
