/* =========================================================
   CONFIGURACIÓN — EDITA ESTOS DATOS ANTES DE PUBLICAR
   ========================================================= */
const CONFIG = {
  // Número de WhatsApp con código de país, solo dígitos. Bolivia = 591. Ej: "59171234567"
  whatsapp: "",
  // Correo profesional. Ej: "contacto@danthonymh.com"
  email: "",
  // URL de tu perfil de LinkedIn (déjalo vacío para ocultarlo)
  linkedin: "",
};

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

const $ = (s) => document.querySelector(s);

function waUrl(text) {
  const base = `https://wa.me/${CONFIG.whatsapp}`;
  return text ? `${base}?text=${encodeURIComponent(text)}` : base;
}

function mailUrl(subject, body) {
  return `mailto:${CONFIG.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

// Contact links (hide those not configured)
function setupContactLinks() {
  const greeting = "Hola DANTHONY MH, quiero cotizar un proyecto.";
  const wa = [$("#waLink"), $("#waFloat")];
  wa.forEach((a) => {
    if (CONFIG.whatsapp) a.href = waUrl(greeting);
    else a.hidden = true;
  });
  if (CONFIG.email) $("#mailLink").href = mailUrl("Cotización de proyecto", greeting);
  else $("#mailLink").parentElement.hidden = true;
  if (CONFIG.linkedin) $("#linkedinLink").href = CONFIG.linkedin;
  else $("#linkedinLink").parentElement.hidden = true;
  if (!CONFIG.whatsapp) $('#contactForm button[type="submit"]').hidden = true;
  if (!CONFIG.email) $("#sendMail").hidden = true;
}

// Pricing tabs
function setupPricing() {
  const tabs = $("#priceTabs");
  const panel = $("#pricePanel");
  const names = Object.keys(PRICES);

  function render(name) {
    tabs.querySelectorAll(".tab").forEach((t) => t.setAttribute("aria-selected", t.dataset.name === name));
    panel.innerHTML = PRICES[name]
      .map(([service, price]) => {
        const ask = CONFIG.whatsapp
          ? `<a href="${waUrl(`Hola, me interesa: ${service} (${name}). ¿Podemos conversar?`)}" target="_blank" rel="noopener">Consultar</a>`
          : "";
        return `<div class="price-row"><span>${service}${ask}</span><span>${price}</span></div>`;
      })
      .join("");
  }

  names.forEach((name, i) => {
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

// Contact form → WhatsApp / email
function setupForm() {
  const form = $("#contactForm");
  const err = $("#formError");

  function buildMessage() {
    const d = new FormData(form);
    const nombre = d.get("nombre").trim();
    const servicio = d.get("servicio");
    const mensaje = d.get("mensaje").trim();
    if (!nombre || !servicio || !mensaje) {
      err.textContent = "Completa tu nombre, el servicio y la descripción del proyecto.";
      return null;
    }
    err.textContent = "";
    const empresa = d.get("empresa").trim();
    return [
      `Hola DANTHONY MH, soy ${nombre}${empresa ? ` de ${empresa}` : ""}.`,
      `Servicio: ${servicio}`,
      `Presupuesto: ${d.get("presupuesto")}`,
      "",
      mensaje,
    ].join("\n");
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const msg = buildMessage();
    if (msg) window.open(waUrl(msg), "_blank", "noopener");
  });

  $("#sendMail").addEventListener("click", () => {
    const msg = buildMessage();
    if (msg) window.location.href = mailUrl("Cotización de proyecto", msg);
  });
}

// Mobile nav
function setupNav() {
  const toggle = $("#navToggle");
  const menu = $("#navMenu");
  const close = () => {
    menu.classList.remove("open");
    toggle.setAttribute("aria-expanded", "false");
  };
  toggle.addEventListener("click", () => {
    const open = menu.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(open));
  });
  menu.querySelectorAll("a").forEach((a) => a.addEventListener("click", close));
  const nav = $("#nav");
  const onScroll = () => nav.classList.toggle("scrolled", window.scrollY > 10);
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
}

// Reveal on scroll
function setupReveal() {
  const els = document.querySelectorAll(".section h2, .card, .project, .stack__row, .steps li, .plan, .terms, .checks li");
  if (!("IntersectionObserver" in window)) return;
  const io = new IntersectionObserver(
    (entries) => entries.forEach((en) => {
      if (en.isIntersecting) {
        en.target.classList.add("visible");
        io.unobserve(en.target);
      }
    }),
    { threshold: 0.12 }
  );
  els.forEach((el) => {
    el.classList.add("reveal");
    io.observe(el);
  });
}

$("#year").textContent = new Date().getFullYear();
setupContactLinks();
setupPricing();
setupForm();
setupNav();
setupReveal();
