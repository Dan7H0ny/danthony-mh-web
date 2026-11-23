/* =========================================================
   CONTACTO (protegido)
   El número y el correo NO están escritos en texto plano: se
   guardan codificados y solo se arman en el momento en que un
   visitante pulsa un botón. Así los robots que recorren la web
   o GitHub buscando teléfonos/correos no los encuentran.
   ========================================================= */
const _k = {
  w: ["NDE5Nj", "Y5NTcxOTU="],
  m: ["bW9jLmxpYW", "1nQDk1N2ht", "eW5vaHRuYWQ="],
};
const reveal = (parts) => [...atob(parts.join(""))].reverse().join("");

/* =========================================================
   TARIFARIO (USD)
   ========================================================= */
const PRICES = {
  "Web": [
    ["Landing page", "$100–180"],
    ["Página personal", "$120–220"],
    ["Página empresarial", "$200–400"],
    ["Web corporativa avanzada", "$400–750"],
    ["Catálogo digital", "$180–350"],
    ["Tienda virtual básica", "$350–650"],
    ["Tienda virtual avanzada", "$650–1,200"],
    ["Portal institucional", "$400–900"],
    ["Plataforma personalizada", "Desde $600"],
  ],
  "Sistemas": [
    ["Inventario básico", "$300–500"],
    ["Sistema de ventas", "$350–650"],
    ["Reservas", "$250–450"],
    ["Sistema administrativo", "$400–750"],
    ["Sistema académico", "$450–900"],
    ["Sistema de laboratorio", "$500–1,000"],
    ["Sistema de licencias", "$400–800"],
    ["CRM", "$600–1,200"],
    ["ERP", "Desde $1,200"],
    ["Sistema empresarial avanzado", "Desde $900"],
  ],
  "Apps móviles": [
    ["Aplicación sencilla", "$300–500"],
    ["Aplicación con autenticación", "$500–850"],
    ["Aplicación conectada a base de datos", "$600–1,000"],
    ["Aplicación comercial", "$800–1,400"],
    ["Aplicación con panel administrativo", "$1,000–1,800"],
    ["Aplicación avanzada", "Desde $1,500"],
  ],
  "Escritorio": [
    ["Aplicación sencilla", "$180–350"],
    ["Sistema de registros", "$250–450"],
    ["Sistema administrativo", "$350–650"],
    ["Sistema con base de datos", "$400–800"],
    ["Software empresarial", "Desde $800"],
  ],
  "IA y datos": [
    ["Análisis de datos", "$100–250"],
    ["Dashboard analítico", "$150–350"],
    ["Modelo predictivo básico", "$250–500"],
    ["Predicción de ventas", "$350–750"],
    ["Integración de API de IA", "$100–250"],
    ["Chatbot con IA", "$250–600"],
    ["Automatización inteligente", "$200–600"],
    ["Sistema predictivo personalizado", "Desde $700"],
  ],
  "Servidores": [
    ["Configuración inicial de VPS", "$50–100"],
    ["Instalación de Linux", "$60–120"],
    ["Configuración de servidor web", "$40–90"],
    ["Dominio y DNS", "$20–50"],
    ["Configuración SSL", "$20–40"],
    ["Despliegue de aplicación", "$40–100"],
    ["Configuración de base de datos", "$40–100"],
    ["Configuración Docker", "$60–150"],
    ["Copias de seguridad", "$40–100"],
    ["Migración de servidor", "$80–200"],
    ["Optimización de servidor", "$50–120"],
    ["Monitoreo", "$50–120"],
  ],
  "Mantenimiento": [
    ["Mantenimiento web básico", "$20–40/mes"],
    ["Mantenimiento web profesional", "$40–80/mes"],
    ["Mantenimiento de sistemas", "$50–100/mes"],
    ["Administración básica de VPS", "$40–80/mes"],
    ["Administración empresarial", "$100–200/mes"],
    ["Soporte bajo demanda", "$10–15/hora"],
  ],
  "Complementarios": [
    ["Diseño UI/UX básico", "$80–150"],
    ["Diseño avanzado", "$150–300"],
    ["Modelado de base de datos", "$40–100"],
    ["API REST", "$80–200"],
    ["Integración de API", "$40–120"],
    ["Migración de datos", "$50–150"],
    ["Automatización", "$80–250"],
    ["Documentación técnica", "$40–120"],
    ["Capacitación", "$20–50/sesión"],
  ],
};

/* ========================================================= */

const $ = (s, el = document) => el.querySelector(s);

function openWhatsApp(text) {
  const url = `https://wa.me/${reveal(_k.w)}?text=${encodeURIComponent(text)}`;
  window.open(url, "_blank", "noopener");
}

/* ----- Tema claro / oscuro ----- */
function setupTheme() {
  const btn = $("#themeToggle");
  const root = document.documentElement;
  const isDark = () =>
    root.dataset.theme ? root.dataset.theme === "dark" : matchMedia("(prefers-color-scheme: dark)").matches;
  const sync = () => btn.setAttribute("aria-label", isDark() ? "Cambiar a modo claro" : "Cambiar a modo oscuro");
  btn.addEventListener("click", () => {
    const next = isDark() ? "light" : "dark";
    root.dataset.theme = next;
    try { localStorage.setItem("theme", next); } catch (e) { /* sin almacenamiento */ }
    sync();
  });
  sync();
}

/* ----- Precios ----- */
function setupPricing() {
  const tabs = $("#priceTabs");
  const panel = $("#pricePanel");

  function render(name) {
    tabs.querySelectorAll(".tab").forEach((t) => t.setAttribute("aria-selected", String(t.dataset.name === name)));
    panel.innerHTML = "";
    PRICES[name].forEach(([service, price], i) => {
      const row = document.createElement("div");
      row.className = "price-row";
      row.style.animationDelay = `${i * 30}ms`;
      row.innerHTML = `<div><span class="price-row__name"></span><button type="button" class="price-row__ask">Consultar por WhatsApp →</button></div><span class="price-row__price"></span>`;
      $(".price-row__name", row).textContent = service;
      $(".price-row__price", row).textContent = price;
      $(".price-row__ask", row).addEventListener("click", () =>
        openWhatsApp(`Hola DANTHONY MH, me interesa: ${service} (${name}, ${price}). ¿Podemos conversar?`)
      );
      panel.appendChild(row);
    });
  }

  Object.keys(PRICES).forEach((name, i) => {
    const b = document.createElement("button");
    b.className = "tab";
    b.type = "button";
    b.setAttribute("role", "tab");
    b.textContent = name;
    b.dataset.name = name;
    b.addEventListener("click", () => render(name));
    tabs.appendChild(b);
    if (i === 0) render(name);
  });
}

/* ----- Formulario: WhatsApp o correo ----- */
function setupForm() {
  const form = $("#contactForm");
  const msg = $("#formMsg");
  let via = "wa";

  form.querySelectorAll('button[type="submit"]').forEach((b) =>
    b.addEventListener("click", () => { via = b.dataset.via; })
  );

  const show = (text, type) => { msg.textContent = text; msg.className = `form__msg ${type || ""}`; };

  function validate(d) {
    form.querySelectorAll(".invalid").forEach((el) => el.classList.remove("invalid"));
    const bad = [];
    if (!d.nombre) bad.push("nombre");
    if (!d.servicio) bad.push("servicio");
    if (!d.mensaje) bad.push("mensaje");
    if (via === "mail" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(d.email)) bad.push("email");
    bad.forEach((n) => form.elements[n].classList.add("invalid"));
    if (bad.length) {
      show(bad.includes("email") && bad.length === 1
        ? "Escribe un correo válido para que pueda responderte."
        : "Completa los campos marcados.", "err");
      if (form.elements[bad[0]]) form.elements[bad[0]].focus();
      return false;
    }
    return true;
  }

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const f = new FormData(form);
    if (f.get("_honey")) return; // bot
    const d = {
      nombre: f.get("nombre").trim(),
      empresa: f.get("empresa").trim(),
      email: f.get("email").trim(),
      servicio: f.get("servicio"),
      presupuesto: f.get("presupuesto"),
      mensaje: f.get("mensaje").trim(),
    };
    if (!validate(d)) return;

    if (via === "wa") {
      const text = [
        `Hola DANTHONY MH, soy ${d.nombre}${d.empresa ? ` de ${d.empresa}` : ""}.`,
        `Servicio: ${d.servicio}`,
        `Presupuesto: ${d.presupuesto}`,
        d.email ? `Correo: ${d.email}` : "",
        "",
        d.mensaje,
      ].filter((l, i, a) => l !== "" || a[i - 1] !== "").join("\n");
      openWhatsApp(text);
      show("Abriendo WhatsApp… solo presiona enviar.", "ok");
      return;
    }

    // Envío por correo mediante FormSubmit (gratis, sin servidor propio)
    const buttons = form.querySelectorAll("button");
    buttons.forEach((b) => (b.disabled = true));
    show("Enviando…");
    try {
      const res = await fetch(`https://formsubmit.co/ajax/${reveal(_k.m)}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          _subject: `Nuevo cliente web: ${d.servicio} — ${d.nombre}`,
          _template: "table",
          _replyto: d.email,
          _captcha: "false",
          Nombre: d.nombre,
          Empresa: d.empresa || "-",
          Correo: d.email,
          Servicio: d.servicio,
          Presupuesto: d.presupuesto,
          Mensaje: d.mensaje,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || String(data.success) === "false") throw new Error(data.message || res.status);
      form.reset();
      show("¡Mensaje enviado! Te responderé a tu correo muy pronto.", "ok");
    } catch (err) {
      show("No se pudo enviar por correo. Intenta por WhatsApp, por favor.", "err");
    } finally {
      buttons.forEach((b) => (b.disabled = false));
    }
  });
}

/* ----- Navegación ----- */
function setupNav() {
  const toggle = $("#navToggle");
  const menu = $("#navMenu");
  const close = () => { menu.classList.remove("open"); toggle.setAttribute("aria-expanded", "false"); };
  toggle.addEventListener("click", () => {
    const open = menu.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(open));
  });
  menu.querySelectorAll("a").forEach((a) => a.addEventListener("click", close));
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") close(); });

  const nav = $("#nav");
  const onScroll = () => nav.classList.toggle("scrolled", window.scrollY > 8);
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  $("#waFloat").addEventListener("click", () =>
    openWhatsApp("Hola DANTHONY MH, quiero cotizar un proyecto.")
  );
}

/* ----- Animación al hacer scroll ----- */
function setupReveal() {
  if (!("IntersectionObserver" in window)) return;
  const els = document.querySelectorAll(
    ".section__head, .about > *, .card, .project, .stack__row, .timeline li, .plan, .pay, details, .contact__grid > *"
  );
  const io = new IntersectionObserver((entries) => {
    entries.forEach((en) => {
      if (en.isIntersecting) { en.target.classList.add("visible"); io.unobserve(en.target); }
    });
  }, { threshold: 0.1, rootMargin: "0px 0px -40px 0px" });
  els.forEach((el) => { el.classList.add("reveal"); io.observe(el); });
}

$("#year").textContent = new Date().getFullYear();
setupTheme();
setupPricing();
setupForm();
setupNav();
setupReveal();
