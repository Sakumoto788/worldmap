(function () {
  "use strict";

  const locations = window.ZHUTIAN_MAP_DATA.locations;
  const filters = [
    ["all", "全部地点"], ["main", "主线足迹"], ["branch", "追查支线"],
    ["danger", "危险区域"], ["unknown", "尚未确认"]
  ];
  const statusLabel = { explored: "已探索", current: "当前位置", danger: "高危", unverified: "未确认" };

  const viewport = document.getElementById("mapViewport");
  const canvas = document.getElementById("mapCanvas");
  const markerLayer = document.getElementById("markerLayer");
  const drawer = document.getElementById("locationDrawer");
  const filterRail = document.getElementById("filterRail");
  const routeLayer = document.getElementById("routeLayer");
  const zoomValue = document.getElementById("zoomValue");

  let selectedId = "old-outpost";
  let activeFilter = "all";
  let showRoutes = true;
  let showLabels = true;
  let view = { scale: 1, x: 0, y: 0 };
  const pointers = new Map();
  let drag = null;
  let pinch = null;

  const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

  function clampView(next) {
    const width = viewport.clientWidth;
    const height = viewport.clientHeight;
    return {
      scale: next.scale,
      x: clamp(next.x, width - width * next.scale, 0),
      y: clamp(next.y, height - height * next.scale, 0)
    };
  }

  function applyView() {
    canvas.style.transform = `translate3d(${view.x}px, ${view.y}px, 0) scale(${view.scale})`;
    zoomValue.textContent = `${Math.round(view.scale * 100)}%`;
  }

  function zoomAt(clientX, clientY, nextScale) {
    const rect = viewport.getBoundingClientRect();
    const scale = clamp(nextScale, 1, 3.2);
    const pointerX = clientX - rect.left;
    const pointerY = clientY - rect.top;
    const mapX = (pointerX - view.x) / view.scale;
    const mapY = (pointerY - view.y) / view.scale;
    view = clampView({ scale, x: pointerX - mapX * scale, y: pointerY - mapY * scale });
    applyView();
  }

  function renderFilters() {
    filterRail.innerHTML = "";
    filters.forEach(([id, label]) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = `filter-button${activeFilter === id ? " is-active" : ""}`;
      button.innerHTML = `<span class="filter-dot filter-dot--${id}"></span>${label}`;
      button.addEventListener("click", () => {
        activeFilter = id;
        renderFilters();
        renderMarkers();
      });
      filterRail.appendChild(button);
    });
  }

  function renderMarkers() {
    markerLayer.innerHTML = "";
    const visible = activeFilter === "all" ? locations : locations.filter(item => item.group === activeFilter);
    visible.forEach((location, index) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = `map-marker map-marker--${location.status}${selectedId === location.id ? " is-selected" : ""}`;
      button.style.left = `${location.x}%`;
      button.style.top = `${location.y}%`;
      button.style.animationDelay = `${index * 70}ms`;
      button.setAttribute("aria-label", `${location.name}，${statusLabel[location.status]}`);
      button.innerHTML = `<span class="marker-halo"></span><span class="marker-core"><i></i></span>${showLabels ? `<span class="marker-label"><small>${location.subtitle}</small><strong>${location.name}</strong></span>` : ""}`;
      button.addEventListener("click", event => {
        event.stopPropagation();
        selectedId = location.id;
        document.getElementById("gestureGuide").hidden = true;
        renderMarkers();
        renderDrawer();
      });
      markerLayer.appendChild(button);
    });
  }

  function renderDrawer() {
    const selected = locations.find(item => item.id === selectedId);
    if (!selected) {
      drawer.className = "location-drawer";
      drawer.innerHTML = "";
      return;
    }
    const index = String(locations.indexOf(selected) + 1).padStart(2, "0");
    drawer.className = "location-drawer is-open";
    drawer.innerHTML = `
      <button class="drawer-close" type="button" aria-label="关闭地点档案">×</button>
      <div class="drawer-index">LOC / ${index}</div>
      <div class="drawer-status-line"><span class="drawer-status drawer-status--${selected.status}">${statusLabel[selected.status]}</span><span>${selected.confidence}</span></div>
      <p class="drawer-subtitle">${selected.subtitle}</p>
      <h2>${selected.name}</h2>
      <div class="drawer-rule"><i></i></div>
      <p class="drawer-description">${selected.description}</p>
      <div class="drawer-events"><span class="drawer-label">关键记录</span><div>${selected.events.map(item => `<span>${item}</span>`).join("")}</div></div>
      ${selected.note ? `<div class="canon-note"><span>连续性备注</span><p>${selected.note}</p></div>` : ""}
      <div class="drawer-footer"><span>正史记录</span><strong>${selected.status === "current" ? "实时更新中" : "档案已收录"}</strong></div>`;
    drawer.querySelector(".drawer-close").addEventListener("click", () => {
      selectedId = "";
      renderMarkers();
      renderDrawer();
    });
  }

  function viewportCenter() {
    const rect = viewport.getBoundingClientRect();
    return { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 };
  }

  viewport.addEventListener("wheel", event => {
    event.preventDefault();
    zoomAt(event.clientX, event.clientY, view.scale * (event.deltaY > 0 ? 0.88 : 1.12));
  }, { passive: false });

  viewport.addEventListener("pointerdown", event => {
    if (event.target.closest("button")) return;
    viewport.setPointerCapture(event.pointerId);
    pointers.set(event.pointerId, { x: event.clientX, y: event.clientY });
    if (pointers.size === 1) {
      drag = { pointerId: event.pointerId, startX: event.clientX, startY: event.clientY, originX: view.x, originY: view.y };
      viewport.classList.add("is-dragging");
    } else if (pointers.size === 2) {
      const pts = [...pointers.values()];
      const rect = viewport.getBoundingClientRect();
      const centerX = (pts[0].x + pts[1].x) / 2 - rect.left;
      const centerY = (pts[0].y + pts[1].y) / 2 - rect.top;
      pinch = {
        distance: Math.hypot(pts[0].x - pts[1].x, pts[0].y - pts[1].y), scale: view.scale,
        mapX: (centerX - view.x) / view.scale, mapY: (centerY - view.y) / view.scale
      };
      drag = null;
    }
  });

  viewport.addEventListener("pointermove", event => {
    if (!pointers.has(event.pointerId)) return;
    pointers.set(event.pointerId, { x: event.clientX, y: event.clientY });
    if (pointers.size === 2 && pinch) {
      const pts = [...pointers.values()];
      const rect = viewport.getBoundingClientRect();
      const centerX = (pts[0].x + pts[1].x) / 2 - rect.left;
      const centerY = (pts[0].y + pts[1].y) / 2 - rect.top;
      const scale = clamp(pinch.scale * (Math.hypot(pts[0].x - pts[1].x, pts[0].y - pts[1].y) / pinch.distance), 1, 3.2);
      view = clampView({ scale, x: centerX - pinch.mapX * scale, y: centerY - pinch.mapY * scale });
      applyView();
      return;
    }
    if (drag && drag.pointerId === event.pointerId) {
      view = clampView({ scale: view.scale, x: drag.originX + event.clientX - drag.startX, y: drag.originY + event.clientY - drag.startY });
      applyView();
    }
  });

  function endPointer(event) {
    pointers.delete(event.pointerId);
    drag = null;
    pinch = null;
    viewport.classList.remove("is-dragging");
  }
  viewport.addEventListener("pointerup", endPointer);
  viewport.addEventListener("pointercancel", endPointer);

  viewport.addEventListener("keydown", event => {
    if (event.key === "Escape") { selectedId = ""; renderMarkers(); renderDrawer(); return; }
    const center = viewportCenter();
    if (event.key === "+" || event.key === "=") { zoomAt(center.x, center.y, view.scale * 1.18); return; }
    if (event.key === "-" || event.key === "_") { zoomAt(center.x, center.y, view.scale * 0.84); return; }
    const delta = event.key === "ArrowLeft" ? [48, 0] : event.key === "ArrowRight" ? [-48, 0] : event.key === "ArrowUp" ? [0, 48] : event.key === "ArrowDown" ? [0, -48] : null;
    if (delta) { event.preventDefault(); view = clampView({ ...view, x: view.x + delta[0], y: view.y + delta[1] }); applyView(); }
  });

  document.getElementById("zoomIn").addEventListener("click", () => { const c = viewportCenter(); zoomAt(c.x, c.y, view.scale * 1.2); });
  document.getElementById("zoomOut").addEventListener("click", () => { const c = viewportCenter(); zoomAt(c.x, c.y, view.scale * 0.82); });
  document.getElementById("resetView").addEventListener("click", () => { view = { scale: 1, x: 0, y: 0 }; applyView(); });
  document.getElementById("gestureGuide").addEventListener("click", event => { event.currentTarget.hidden = true; });
  document.getElementById("toggleRoutes").addEventListener("click", event => {
    showRoutes = !showRoutes; routeLayer.hidden = !showRoutes;
    event.currentTarget.classList.toggle("is-on", showRoutes); event.currentTarget.setAttribute("aria-pressed", String(showRoutes));
  });
  document.getElementById("toggleLabels").addEventListener("click", event => {
    showLabels = !showLabels; renderMarkers();
    event.currentTarget.classList.toggle("is-on", showLabels); event.currentTarget.setAttribute("aria-pressed", String(showLabels));
  });
  window.addEventListener("resize", () => { view = clampView(view); applyView(); });

  renderFilters();
  renderMarkers();
  renderDrawer();
  applyView();
})();
