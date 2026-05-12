/* ===== CUSTOM CURSOR ===== */
const cursor = document.getElementById('cursor');
const cursorDot = document.getElementById('cursor-dot');

let mouseX = 0, mouseY = 0;
let cursorX = 0, cursorY = 0;

document.addEventListener('mousemove', e => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  cursorDot.style.left = mouseX + 'px';
  cursorDot.style.top  = mouseY + 'px';
});

function animateCursor() {
  cursorX += (mouseX - cursorX) * 0.12;
  cursorY += (mouseY - cursorY) * 0.12;
  cursor.style.left = cursorX + 'px';
  cursor.style.top  = cursorY + 'px';
  requestAnimationFrame(animateCursor);
}
animateCursor();

document.querySelectorAll('a, button, .proj-card, .cert-card, .contact-link').forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursor.style.transform = 'translate(-50%,-50%) scale(1.6)';
    cursor.style.borderColor = 'var(--accent-2)';
    cursor.style.background = 'rgba(0,212,170,.06)';
  });
  el.addEventListener('mouseleave', () => {
    cursor.style.transform = 'translate(-50%,-50%) scale(1)';
    cursor.style.borderColor = 'var(--accent)';
    cursor.style.background = 'transparent';
  });
});

/* ===== NAV SCROLL ===== */
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 50);
});

/* ===== MOBILE MENU ===== */
const burger = document.getElementById('burger');
const mobileMenu = document.getElementById('mobile-menu');
burger.addEventListener('click', () => {
  mobileMenu.classList.toggle('open');
});
document.querySelectorAll('.mob-link').forEach(link => {
  link.addEventListener('click', () => mobileMenu.classList.remove('open'));
});

/* ===== SCROLL REVEAL ===== */
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('in');
      io.unobserve(e.target);

      // Trigger skill bar animations
      e.target.querySelectorAll('.bar-fill').forEach(bar => {
        bar.classList.add('animate');
      });
    }
  });
}, { threshold: 0.08 });

document.querySelectorAll('.reveal-up').forEach(el => io.observe(el));

// Also observe skill bars directly
const barIo = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('animate');
      barIo.unobserve(e.target);
    }
  });
}, { threshold: 0.3 });

document.querySelectorAll('.bar-fill').forEach(bar => barIo.observe(bar));

/* ===== ACTIVE NAV LINK HIGHLIGHT ===== */
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

const activeIo = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      const id = e.target.id;
      navLinks.forEach(a => {
        a.style.color = a.getAttribute('href') === '#' + id
          ? 'var(--text)'
          : '';
      });
    }
  });
}, { threshold: 0.4 });

sections.forEach(s => activeIo.observe(s));

/* ===== SMOOTH ACTIVE UNDERLINE ===== */
navLinks.forEach(link => {
  link.addEventListener('mouseenter', () => link.style.color = 'var(--text)');
  link.addEventListener('mouseleave', () => link.style.color = '');
});

/* ===== TYPED HERO SUBTITLE ===== */
const roles = [
  'ML & Data Science Engineer',
  'DeepFake Detection — AUC 0.98',
  'RAG Systems Builder',
  'AI Solutions Developer',
];
let roleIdx = 0, charIdx = 0, isDeleting = false;
const roleEl = document.querySelector('.hero-role');

if (roleEl) {
  const prefix = '<span class="role-prefix">—</span> ';
  function typeRole() {
    const current = roles[roleIdx];
    if (isDeleting) {
      charIdx--;
    } else {
      charIdx++;
    }
    roleEl.innerHTML = prefix + current.slice(0, charIdx);
    let speed = isDeleting ? 40 : 70;
    if (!isDeleting && charIdx === current.length) {
      speed = 2200;
      isDeleting = true;
    } else if (isDeleting && charIdx === 0) {
      isDeleting = false;
      roleIdx = (roleIdx + 1) % roles.length;
      speed = 400;
    }
    setTimeout(typeRole, speed);
  }
  // Start after a short delay
  setTimeout(typeRole, 1500);
}

/* ===== PARALLAX ORBS ===== */
document.addEventListener('mousemove', e => {
  const orbs = document.querySelectorAll('.orb');
  const cx = window.innerWidth / 2;
  const cy = window.innerHeight / 2;
  const dx = (e.clientX - cx) / cx;
  const dy = (e.clientY - cy) / cy;
  orbs.forEach((orb, i) => {
    const factor = (i + 1) * 8;
    orb.style.transform = `translate(${dx * factor}px, ${dy * factor}px)`;
  });
});
