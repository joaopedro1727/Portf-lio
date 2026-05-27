"use strict";

// ─── TEMA CLARO / ESCURO ──────────────────────────────────────────────────────

const btnTheme = document.getElementById("btn-theme");

function applyTheme(theme) {
  if (theme === "dark") {
    document.body.classList.add("dark");
    btnTheme.textContent = "☀️";
    btnTheme.setAttribute("aria-label", "Mudar para tema claro");
  } else {
    document.body.classList.remove("dark");
    btnTheme.textContent = "☾";
    btnTheme.setAttribute("aria-label", "Mudar para tema escuro");
  }
}

const savedTheme = localStorage.getItem("theme") || "light";
applyTheme(savedTheme);

btnTheme.addEventListener("click", () => {
  const isDark = document.body.classList.contains("dark");
  const next = isDark ? "light" : "dark";
  localStorage.setItem("theme", next);
  applyTheme(next);
});



const projetos = {
  ecommerce: {
    titulo: "E-commerce UI",
    descricao: "Interface completa de loja virtual com carrinho de compras, filtros dinâmicos por categoria e preço, página de produto detalhada e checkout responsivo. Desenvolvido com foco em UX e conversão.",
    tecnologias: ["React", "TypeScript", "Tailwind CSS", "Context API"]
  },
  dashboard: {
    titulo: "Dashboard Analytics",
    descricao: "Painel de métricas em tempo real com gráficos de linha, barra e pizza. Autenticação via Firebase, controle de permissões por perfil e exportação de relatórios.",
    tecnologias: ["Next.js", "Firebase", "Recharts", "TypeScript"]
  },
  tasks: {
    titulo: "App de Tarefas",
    descricao: "Aplicativo mobile-first com organização por listas, drag-and-drop para reordenar tarefas, notificações e sincronização em nuvem via REST API.",
    tecnologias: ["React", "Node.js", "REST API", "CSS Modules"]
  },
  parking: {
    titulo: "App de Estacionamento",
    descricao: "Aplicação desktop para gerenciamento de estacionamento: entrada e saída de veículos, cálculo automático de tarifas e geração de comprovantes em PDF.",
    tecnologias: ["Python", "Tkinter", "fpdf", "SQLite"]
  },
  tasks2: {
    titulo: "Gerenciador de Tarefas",
    descricao: "Aplicação desktop com categorias, prioridades, histórico de tarefas e persistência de dados usando SQLite. Exportação em formato JSON.",
    tecnologias: ["Python", "Tkinter", "SQLite", "JSON"]
  }
};

// ─── HEADER / SCROLL ──────────────────────────────────────────────────────────

const header = document.getElementById("header");

window.addEventListener("scroll", () => {
  header.classList.toggle("scrolled", window.scrollY > 40);
});

// ─── MENU MOBILE ─────────────────────────────────────────────────────────────

const navToggle = document.getElementById("nav-toggle");
const nav = document.getElementById("nav");

navToggle.addEventListener("click", () => {
  nav.classList.toggle("open");
});

nav.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => nav.classList.remove("open"));
});

// ─── SCROLL SUAVE ────────────────────────────────────────────────────────────

function scrollTo(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

// ─── ACTIVE LINK ─────────────────────────────────────────────────────────────

const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav a");

const sectionObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(a => a.classList.remove("active"));

      const match = document.querySelector(
        `.nav a[href="#${entry.target.id}"]`
      );

      if (match) match.classList.add("active");
    }
  });
}, { threshold: 0.4 });

sections.forEach(sec => sectionObserver.observe(sec));

// ─── REVEAL AO ROLAR ─────────────────────────────────────────────────────────

document.querySelectorAll(".section, .hero").forEach(el => {
  el.classList.add("reveal");
});

const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll(".reveal").forEach(el => revealObserver.observe(el));

// ─── CONTADORES ───────────────────────────────────────────────────────────────

function animateCount(el) {
  const target = parseInt(el.dataset.target, 10);
  const duration = 1600;
  const step = Math.ceil(target / (duration / 16));
  let current = 0;
  const timer = setInterval(() => {
    current = Math.min(current + step, target);
    el.textContent = current;
    if (current >= target) clearInterval(timer);
  }, 16);
}

const counterObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCount(entry.target);
      counterObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.6 });

document.querySelectorAll(".counter").forEach(el => counterObserver.observe(el));

const commitEl = document.getElementById("stat-commit");
if (commitEl) {
  const commitObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        let val = 0;
        const timer = setInterval(() => {
          val = Math.min(val + 2, 100);
          commitEl.textContent = val + "%";
          if (val >= 100) clearInterval(timer);
        }, 18);
        commitObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.6 });
  commitObserver.observe(commitEl);
}

// ─── MODAL ────────────────────────────────────────────────────────────────────

function openModal(key) {
  const p = projetos[key];
  if (!p) return;

  document.getElementById("modal-title").textContent = p.titulo;
  document.getElementById("modal-desc").textContent = p.descricao;

  document.getElementById("modal-tags").innerHTML = p.tecnologias
    .map(t => `<span>${t}</span>`)
    .join("");

  const modal = document.getElementById("modal");

  modal.classList.add("open");
  document.body.style.overflow = "hidden";
}
function closeModal() {
  document.getElementById("modal").classList.remove("open");
  document.body.style.overflow = "";
}

function handleKey(e, key) {
  if (e.key === "Enter" || e.key === " ") {
    e.preventDefault();
    openModal(key);
  }
}

document.getElementById("modal").addEventListener("click", e => {
  if (e.target === e.currentTarget) closeModal();
});

document.addEventListener("keydown", e => {
  if (e.key === "Escape") closeModal();
}); 
   
// ─── HABILIDADES ─────────────────────────────────────────────────────────────

const skills = [
  "HTML5",
  "CSS3",
  "JavaScript",
  "React",
  "TypeScript",
  "Python",
  "Git",
  "GitHub",
  "Figma",
  "Firebase",
  "SQLite",
  "Responsive Design"
];

const skillsContainer = document.getElementById("skills-container");

skills.forEach(skill => {
  const item = document.createElement("div");

  item.className = "skill-item";
  item.textContent = skill;

  skillsContainer.appendChild(item);
});