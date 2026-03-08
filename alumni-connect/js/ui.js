/* ============================================================
   ui.js — UI utilities: toast, nav, scroll effects, animations
   ============================================================ */

/* ── TOAST NOTIFICATION ── */
let toastTimer = null;

/**
 * Display a toast notification at the bottom-right of the screen
 * @param {string} message - The message to display inside the toast
 */
function showToast(message) {
  clearTimeout(toastTimer);

  const toast = document.getElementById('toast');
  toast.innerHTML = `<strong>✦</strong> ${message}`;
  toast.classList.add('show');

  toastTimer = setTimeout(() => {
    toast.classList.remove('show');
  }, 3500);
}

/* ── MOBILE NAV TOGGLE ── */

/**
 * Toggle the mobile navigation open/close
 */
function toggleNav() {
  const navLinks   = document.getElementById('navLinks');
  const hamburger  = document.getElementById('hamburger');
  const isOpen     = navLinks.classList.toggle('open');

  // Animate hamburger into X when open
  const spans = hamburger.querySelectorAll('span');
  if (isOpen) {
    spans[0].style.transform  = 'rotate(45deg) translate(5px, 5px)';
    spans[1].style.opacity    = '0';
    spans[2].style.transform  = 'rotate(-45deg) translate(5px, -5px)';
    document.body.style.overflow = 'hidden';
  } else {
    spans[0].style.transform  = '';
    spans[1].style.opacity    = '';
    spans[2].style.transform  = '';
    document.body.style.overflow = '';
  }
}

/**
 * Close mobile nav when a nav link is clicked
 * (links navigate to sections, so we close the overlay)
 */
function initNavLinkClose() {
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
      const navLinks = document.getElementById('navLinks');
      if (navLinks.classList.contains('open')) toggleNav();
    });
  });
}

/* ── NAVBAR SHADOW ON SCROLL ── */

/**
 * Add a subtle shadow to the navbar when the user scrolls down
 */
function initNavbarScroll() {
  window.addEventListener('scroll', () => {
    const nav = document.getElementById('navbar');
    if (window.scrollY > 40) {
      nav.style.boxShadow = '0 2px 20px rgba(13,13,13,0.1)';
    } else {
      nav.style.boxShadow = 'none';
    }
  });
}

/* ── SCROLL-REVEAL (INTERSECTION OBSERVER) ── */
let revealObserver = null;

/**
 * Create an IntersectionObserver that adds the 'visible' class
 * to elements with the 'reveal' class when they enter the viewport.
 * Safe to call multiple times — reuses the same observer instance.
 */
function observeReveal() {
  if (!revealObserver) {
    revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            // Unobserve after reveal so it fires only once
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );
  }

  // Attach observer to all current .reveal elements not yet visible
  document.querySelectorAll('.reveal:not(.visible)').forEach(el => {
    revealObserver.observe(el);
  });
}

/* ── ACTIVE NAV LINK HIGHLIGHT ON SCROLL ── */

/**
 * Highlight the nav link whose section is currently in view
 */
function initActiveNavHighlight() {
  const sections = document.querySelectorAll('section[id]');

  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 120;
      if (window.scrollY >= sectionTop) {
        current = section.getAttribute('id');
      }
    });

    document.querySelectorAll('.nav-links a').forEach(link => {
      link.classList.remove('active-link');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active-link');
      }
    });
  });
}
