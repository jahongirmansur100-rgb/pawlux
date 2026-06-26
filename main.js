// ===== PawLux — Premium Animal Shop JavaScript =====

document.addEventListener('DOMContentLoaded', () => {
  // ===== Header Scroll Effect =====
  const header = document.getElementById('header');
  let lastScroll = 0;

  window.addEventListener('scroll', () => {
    const currentScroll = window.scrollY;
    if (currentScroll > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
    lastScroll = currentScroll;
  });

  // ===== Mobile Menu Toggle =====
  const menuToggle = document.getElementById('menuToggle');
  const navLinks = document.getElementById('navLinks');

  menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('active');
    navLinks.classList.toggle('open');
    document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
  });

  // Close mobile menu on link click
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      menuToggle.classList.remove('active');
      navLinks.classList.remove('open');
      document.body.style.overflow = '';
    });
  });

  // ===== Active Nav Link Highlight =====
  const sections = document.querySelectorAll('section[id]');
  const navItems = navLinks.querySelectorAll('a');

  const observerNav = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        navItems.forEach(item => {
          item.style.color = '';
          if (item.getAttribute('href') === `#${id}`) {
            item.style.color = 'var(--accent)';
          }
        });
      }
    });
  }, { rootMargin: '-40% 0px -55% 0px' });

  sections.forEach(section => observerNav.observe(section));

  // ===== Scroll Reveal Animation =====
  const revealElements = document.querySelectorAll('.reveal');

  const observerReveal = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observerReveal.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -50px 0px' });

  revealElements.forEach(el => observerReveal.observe(el));

  // ===== Product Filter =====
  const filterBtns = document.querySelectorAll('.filter-btn');
  const productCards = document.querySelectorAll('.product-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Update active state
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.dataset.filter;

      productCards.forEach(card => {
        const category = card.dataset.category;
        if (filter === 'all' || category === filter) {
          card.style.display = '';
          card.style.animation = 'fadeInUp 0.5s ease forwards';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // ===== Cart Functionality =====
  const cartBadge = document.getElementById('cartBadge');
  let cartCount = 3;

  document.querySelectorAll('.btn-add-cart').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      cartCount++;
      cartBadge.textContent = cartCount;

      // Button animation
      btn.style.transform = 'scale(1.3) rotate(180deg)';
      btn.textContent = '✓';
      btn.style.background = 'linear-gradient(135deg, #34d399, #10b981)';

      setTimeout(() => {
        btn.style.transform = '';
        btn.textContent = '+';
        btn.style.background = '';
      }, 1200);

      // Cart badge bounce
      cartBadge.style.transform = 'scale(1.4)';
      setTimeout(() => {
        cartBadge.style.transform = '';
      }, 300);

      // Show toast notification
      showToast('Added to cart! 🛒');
    });
  });

  // ===== Toast Notification =====
  function showToast(message) {
    const existing = document.querySelector('.toast');
    if (existing) existing.remove();

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    toast.style.cssText = `
      position: fixed;
      bottom: 32px;
      right: 32px;
      padding: 16px 28px;
      background: rgba(17, 17, 24, 0.95);
      backdrop-filter: blur(20px);
      border: 1px solid rgba(232, 168, 56, 0.3);
      border-radius: 14px;
      color: #f5f5f7;
      font-family: 'Inter', sans-serif;
      font-size: 0.9rem;
      font-weight: 500;
      z-index: 9999;
      animation: toastIn 0.4s cubic-bezier(0.16, 1, 0.3, 1);
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
    `;

    document.body.appendChild(toast);

    setTimeout(() => {
      toast.style.animation = 'toastOut 0.3s ease forwards';
      setTimeout(() => toast.remove(), 300);
    }, 2500);
  }

  // Inject toast keyframes
  const toastStyles = document.createElement('style');
  toastStyles.textContent = `
    @keyframes toastIn {
      from { opacity: 0; transform: translateY(20px) scale(0.95); }
      to { opacity: 1; transform: translateY(0) scale(1); }
    }
    @keyframes toastOut {
      from { opacity: 1; transform: translateY(0) scale(1); }
      to { opacity: 0; transform: translateY(20px) scale(0.95); }
    }
  `;
  document.head.appendChild(toastStyles);

  // ===== Duplicate Testimonials for Infinite Scroll =====
  const track = document.getElementById('testimonialTrack');
  if (track) {
    const cards = track.innerHTML;
    track.innerHTML = cards + cards; // Duplicate for seamless scroll
  }

  // ===== Newsletter Form =====
  const newsletterForm = document.getElementById('newsletterForm');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = newsletterForm.querySelector('input');
      if (input.value) {
        showToast('Welcome to the PawLux family! 🎉');
        input.value = '';
      }
    });
  }

  // ===== Smooth Hover Tilt on Category Cards =====
  document.querySelectorAll('.category-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = (y - centerY) / 20;
      const rotateY = (centerX - x) / 20;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });

  // ===== Adopt Now & Cart Button Interactions =====
  const adoptBtn = document.getElementById('adoptBtn');
  if (adoptBtn) {
    adoptBtn.addEventListener('click', () => {
      document.getElementById('products').scrollIntoView({ behavior: 'smooth' });
    });
  }

  const cartBtn = document.getElementById('cartBtn');
  if (cartBtn) {
    cartBtn.addEventListener('click', () => {
      showToast(`You have ${cartCount} items in your cart 🛒`);
    });
  }

  // ===== Parallax on Hero (subtle) =====
  window.addEventListener('scroll', () => {
    const hero = document.querySelector('.hero-visual');
    if (hero) {
      const scrolled = window.scrollY;
      if (scrolled < 800) {
        hero.style.transform = `translateY(${scrolled * 0.08}px)`;
      }
    }
  });

  // ===== Counter Animation for Hero Stats =====
  function animateCounter(element, target, suffix = '') {
    let current = 0;
    const increment = target / 60;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      const display = target >= 100 ? Math.floor(current) : current.toFixed(1);
      element.innerHTML = `${display}<span>${suffix}</span>`;
    }, 25);
  }

  const statsObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const stats = entry.target.querySelectorAll('.hero-stat .number');
        if (stats[0]) animateCounter(stats[0], 2, 'K+');
        if (stats[1]) animateCounter(stats[1], 500, '+');
        if (stats[2]) animateCounter(stats[2], 4.9, '★');
        statsObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  const heroStats = document.querySelector('.hero-stats');
  if (heroStats) statsObserver.observe(heroStats);
});
