/* Global placeholders - replace with your real links */
const GITHUB_URL = "https://github.com/Mihir-Rabari/ved-db-server/";
const DOWNLOAD_WINDOWS = "https://github.com/Mihir-Rabari/ved-db-server/releases/download/v0.0.1/veddb-server-windows.exe";
const DOWNLOAD_LINUX = "https://example.com/veddb-linux.tar.gz";

/* Basic links / actions */
function openGithub() {
  window.open(GITHUB_URL, "_blank");
}
function downloadAsset(url) {
  if (!url) return alert("Download URL not configured.");
  window.open(url, "_blank");
}
function downloadWin() {
  downloadAsset(DOWNLOAD_WINDOWS);
}

/* Modals */
function openChangelog() {
  const m = document.getElementById("changelogModal");
  if (!m) return;
  m.style.display = "flex";
  m.setAttribute("aria-hidden", "false");
}
function closeChangelog() {
  const m = document.getElementById("changelogModal");
  if (!m) return;
  m.style.display = "none";
  m.setAttribute("aria-hidden", "true");
}

/* Mobile nav */
function toggleMobileNav() {
  const menu = document.getElementById("mobileMenu");
  const hamburger = document.getElementById("hamburger");
  if (!menu) return;
  const open = menu.style.display === "block";
  menu.style.display = open ? "none" : "block";
  if (hamburger) {
    hamburger.setAttribute("aria-expanded", open ? "false" : "true");
  }
}

/* Copy to clipboard with UI feedback */
function copyToClipboard(text, btn) {
  if (!navigator.clipboard) {
    const ta = document.createElement("textarea");
    ta.value = text;
    document.body.appendChild(ta);
    ta.select();
    try {
      document.execCommand("copy");
      alert("Copied");
    } catch (e) {
      alert("Copy failed");
    }
    document.body.removeChild(ta);
    return;
  }
  navigator.clipboard.writeText(text).then(() => {
    if (btn) {
      const original = btn.innerHTML;
      btn.innerText = "Copied";
      setTimeout(() => (btn.innerHTML = original), 1500);
    }
  }).catch(() => alert("Copy failed"));
}

/* Smooth scroll helper */
function scrollToId(id) {
  const el = document.getElementById(id);
  if (!el) return;
  el.scrollIntoView({ behavior: "smooth", block: "start" });
}

/* Accordion */
function initAccordion() {
  const items = document.querySelectorAll(".accordion-item");
  items.forEach(it => {
    const toggle = it.querySelector(".accordion-toggle");
    const panel = it.querySelector(".accordion-panel");
    toggle.addEventListener("click", () => {
      const open = panel.style.display === "block";
      document.querySelectorAll(".accordion-panel").forEach(p => p.style.display = "none");
      panel.style.display = open ? "none" : "block";
    });
  });
}

/* Copy PowerShell command */
function copyCommand() {
  const command = "PS C:\\VedDB> veddb-server-windows.exe --create --name veddb_main --memory-mb 256 --workers 4 --port 50051 --debug";
  copyToClipboard(command);

  // Change icon temporarily
  const icon = document.querySelector(".lucide-copy");
  if (icon) {
    icon.classList.remove("lucide-copy");
    icon.classList.add("lucide-check");
    icon.innerHTML = '<path d="M20 6L9 17l-5-5" />';
    setTimeout(() => {
      icon.classList.remove("lucide-check");
      icon.classList.add("lucide-copy");
      icon.innerHTML = '<rect width="14" height="14" x="8" y="8" rx="2" ry="2"></rect><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"></path>';
    }, 2000);
  }
}

/* Click outside modal to close */
document.addEventListener("click", (e) => {
  const modal = document.getElementById("changelogModal");
  if (!modal || modal.style.display !== "flex") return;
  const panel = modal.querySelector(".modal-panel");
  if (panel && !panel.contains(e.target)) closeChangelog();
});

/* Init on DOM ready */
function initUI() {
  initAccordion();

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeChangelog();
  });

  const heroDownload = document.getElementById("btnDownloadHero");
  if (heroDownload) heroDownload.addEventListener("click", downloadWin);

  const winDownload = document.getElementById("btnDownloadWindows");
  if (winDownload) winDownload.addEventListener("click", downloadWin);

  const headerGithub = document.getElementById("btnHeaderGithub");
  if (headerGithub) headerGithub.addEventListener("click", openGithub);

  const starGithub = document.getElementById("btnStarGithub");
  if (starGithub) starGithub.addEventListener("click", openGithub);

  const copyBtn = document.getElementById("btnCopyCommand");
  if (copyBtn) copyBtn.addEventListener("click", copyCommand);
}
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initUI);
} else {
  initUI();
}

/* Canvas background animation */
(function canvasBg() {
  const canvas = document.getElementById("bgCanvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  let DPR = window.devicePixelRatio || 1;

  function resize() {
    DPR = window.devicePixelRatio || 1;
    canvas.width = Math.floor(canvas.clientWidth * DPR);
    canvas.height = Math.floor(canvas.clientHeight * DPR);
    ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
  }
  window.addEventListener("resize", resize, { passive: true });
  resize();

  const blobs = Array.from({ length: 10 }).map(() => ({
    x: Math.random() * canvas.clientWidth,
    y: Math.random() * canvas.clientHeight,
    r: 40 + Math.random() * 140,
    vx: (Math.random() - 0.5) * 0.2,
    vy: (Math.random() - 0.5) * 0.25,
    hue: 10 + Math.random() * 40,
    speed: 0.2 + Math.random() * 0.6,
    phase: Math.random() * Math.PI * 2,
  }));

  function draw() {
    const w = canvas.clientWidth, h = canvas.clientHeight;
    ctx.clearRect(0, 0, w, h);

    const g = ctx.createLinearGradient(0, 0, w, h);
    g.addColorStop(0, "rgba(6,6,8,0.35)");
    g.addColorStop(1, "rgba(0,0,0,0.7)");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, w, h);

    blobs.forEach((b) => {
      b.x += b.vx * b.speed;
      b.y += Math.sin(Date.now() / 1000 + b.phase) * 0.2 + b.vy * b.speed;
      if (b.x < -b.r) b.x = w + b.r;
      if (b.x > w + b.r) b.x = -b.r;
      if (b.y < -b.r) b.y = h + b.r;
      if (b.y > h + b.r) b.y = -b.r;

      const radius = b.r;
      const grad = ctx.createRadialGradient(b.x, b.y, radius * 0.08, b.x, b.y, radius);
      grad.addColorStop(0, "rgba(255,140,80,0.20)");
      grad.addColorStop(0.35, "rgba(255,80,60,0.12)");
      grad.addColorStop(1, "rgba(0,0,0,0)");

      ctx.beginPath();
      ctx.fillStyle = grad;
      ctx.arc(b.x, b.y, radius, 0, Math.PI * 2);
      ctx.fill();
    });

    ctx.globalCompositeOperation = "lighter";
    ctx.globalAlpha = 0.02;
    for (let i = 0; i < 4; i++) {
      ctx.beginPath();
      const rx = Math.random() * w;
      const ry = Math.random() * h;
      ctx.fillStyle = "rgba(255,180,120,0.02)";
      ctx.arc(rx, ry, 200 + Math.random() * 300, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.globalAlpha = 1;
    ctx.globalCompositeOperation = "source-over";

    requestAnimationFrame(draw);
  }
  requestAnimationFrame(draw);
})();
