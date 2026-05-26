/* ── Scroll suave para seção ── */
function scrollToSection(id) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

/* ── Nav link ativo no scroll ── */
const navLinks = document.querySelectorAll('.nav-links a');
const sections = document.querySelectorAll('[id]');

const observerNav = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(link => link.classList.remove('active'));
      const active = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
      if (active) active.classList.add('active');
    }
  });
}, { threshold: 0.4 });

sections.forEach(sec => observerNav.observe(sec));

/* ── Reveal on scroll ── */
const revealItems = document.querySelectorAll('.reveal');
const observerReveal = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.classList.add('revealed');
      }, i * 80);
      observerReveal.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

revealItems.forEach(el => observerReveal.observe(el));

/* ── Animação das barras de skill ── */
const skillFills = document.querySelectorAll('.skill-fill[data-width]');
const observerSkills = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const fill = entry.target;
      setTimeout(() => {
        fill.style.width = fill.dataset.width;
      }, 200);
      observerSkills.unobserve(fill);
    }
  });
}, { threshold: 0.3 });

skillFills.forEach(fill => observerSkills.observe(fill));

/* ── Contador animado ── */
function animateCounter(el, target, suffix) {
  let current = 0;
  const step = Math.ceil(target / 40);
  const interval = setInterval(() => {
    current = Math.min(current + step, target);
    el.textContent = current + (suffix || '+');
    if (current >= target) clearInterval(interval);
  }, 40);
}

const counters = document.querySelectorAll('.counter');
const observerCounters = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el = entry.target;
      animateCounter(el, parseInt(el.dataset.target), '+');
      observerCounters.unobserve(el);
    }
  });
}, { threshold: 0.5 });

counters.forEach(c => observerCounters.observe(c));

/* Contador de comprometimento (100%) */
const commitEl = document.getElementById('stat-commitment');
if (commitEl) {
  const observerCommit = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        let v = 0;
        const iv = setInterval(() => {
          v = Math.min(v + 4, 100);
          commitEl.textContent = v + '%';
          if (v >= 100) clearInterval(iv);
        }, 30);
        observerCommit.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  observerCommit.observe(commitEl);
}

/* ── Dados dos projetos ── */
const projects = {
  ecommerce: {
    icon: '<i class="ti ti-shopping-cart" aria-hidden="true"></i>',
    title: 'E-commerce UI',
    desc: 'Interface completa de loja virtual com carrinho de compras, filtros dinâmicos por categoria e preço, página de produto com galeria, e checkout responsivo com formulário de pagamento. Design system consistente e acessível.',
    tags: ['React', 'TypeScript', 'Tailwind', 'Context API']
  },
  dashboard: {
    icon: '<i class="ti ti-chart-line" aria-hidden="true"></i>',
    title: 'Dashboard Analytics',
    desc: 'Painel de métricas em tempo real com gráficos interativos de linha, barra e pizza. Autenticação segura via Firebase Auth, filtros por período, exportação de dados e layout responsivo para desktop e mobile.',
    tags: ['Next.js', 'Firebase', 'Recharts', 'Auth']
  },
  tasks: {
    icon: '<i class="ti ti-device-mobile" aria-hidden="true"></i>',
    title: 'App de Tarefas',
    desc: 'Aplicativo mobile-first de produtividade com drag-and-drop entre colunas (Kanban), sincronização em nuvem em tempo real, notificações de prazo, categorias por cor e suporte offline via Service Worker.',
    tags: ['React', 'Node.js', 'REST API', 'PWA']
  }
};

function openProject(key) {
  const p = projects[key];
  if (!p) return;
  document.getElementById('modal-icon').innerHTML = p.icon;
  document.getElementById('modal-title').textContent = p.title;
  document.getElementById('modal-desc').textContent = p.desc;
  document.getElementById('modal-tags').innerHTML = p.tags
    .map(t => `<span class="proj-tag">${t}</span>`).join('');
  const modal = document.getElementById('project-modal');
  modal.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  document.getElementById('project-modal').classList.remove('open');
  document.body.style.overflow = '';
}

/* Fechar modal com Escape ou clique fora */
document.getElementById('project-modal').addEventListener('click', function(e) {
  if (e.target === this) closeModal();
});
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeModal();
});

/* Enter/Space nos cards de projeto */
document.querySelectorAll('.proj-card').forEach(card => {
  card.addEventListener('keydown', e => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      card.click();
    }
  });
});

/* ── Menu mobile ── */
const navToggle = document.getElementById('nav-toggle');
const mobileMenu = document.getElementById('nav-mobile-menu');

navToggle.addEventListener('click', () => {
  const isOpen = mobileMenu.classList.toggle('open');
  navToggle.querySelector('i').className = isOpen ? 'ti ti-x' : 'ti ti-menu-2';
});

document.querySelectorAll('.nav-mobile-link').forEach(link => {
  link.addEventListener('click', () => {
    mobileMenu.classList.remove('open');
    navToggle.querySelector('i').className = 'ti ti-menu-2';
  });
});

/* ── Toast ── */
function showToast(msg, duration = 3000) {
  const toast = document.getElementById('toast');
  toast.textContent = msg;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), duration);
}

/* Toast ao clicar em e-mail */
const emailLink = document.querySelector('a[href^="mailto"]');
if (emailLink) {
  emailLink.addEventListener('click', () => {
    showToast('Abrindo seu cliente de e-mail...');
  });
}

/* ── Scroll suave nos links do nav ── */
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', function(e) {
    e.preventDefault();
    const id = this.getAttribute('href').replace('#', '');
    scrollToSection(id);
  });
});