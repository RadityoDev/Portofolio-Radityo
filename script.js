Saya buatkan file `script.js` dengan fitur lengkap:
Action: file_editor create /app/script.js --file-text "/* =========================================================
   PORTFOLIO RADITYO — INTERACTIVE SCRIPT
   - Dark mode toggle (tersimpan di localStorage)
   - IG Slider otomatis + klik dots + swipe (mobile)
   - Smooth scroll + scroll reveal animation
   ========================================================= */

(function () {
  'use strict';

  /* -----------------------------------------------------
     1. DARK MODE TOGGLE + LOCAL STORAGE
  ----------------------------------------------------- */
  const toggleBtn = document.querySelector('.toggle-btn');
  const body = document.body;
  const STORAGE_KEY = 'radityo-theme';

  // Load tema tersimpan
  const savedTheme = localStorage.getItem(STORAGE_KEY);
  if (savedTheme === 'dark') {
    body.classList.add('dark');
  } else if (!savedTheme) {
    // Default: ikuti preferensi sistem
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      body.classList.add('dark');
    }
  }

  // Update teks tombol
  const updateToggleText = () => {
    if (!toggleBtn) return;
    const isDark = body.classList.contains('dark');
    toggleBtn.innerHTML = isDark ? '☀ Light Mode' : '🌙 Dark Mode';
  };
  updateToggleText();

  // Klik tombol
  if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
      body.classList.toggle('dark');
      const isDark = body.classList.contains('dark');
      localStorage.setItem(STORAGE_KEY, isDark ? 'dark' : 'light');
      updateToggleText();
    });
  }

  /* -----------------------------------------------------
     2. IG SLIDER (auto-play + dots + swipe)
  ----------------------------------------------------- */
  const slider = document.querySelector('.ig-slider');
  if (slider) {
    const slides = slider.querySelector('.ig-slides');
    const images = slides ? slides.querySelectorAll('img') : [];
    const dots = slider.querySelectorAll('.dots span');
    const total = images.length;

    if (total > 0) {
      let current = 0;
      let autoTimer = null;

      const goTo = (index) => {
        current = (index + total) % total;
        slides.style.transform = `translateX(-${current * 100}%)`;
        dots.forEach((d, i) => d.classList.toggle('active', i === current));
      };

      const next = () => goTo(current + 1);
      const prev = () => goTo(current - 1);

      const startAuto = () => {
        stopAuto();
        autoTimer = setInterval(next, 4000);
      };
      const stopAuto = () => {
        if (autoTimer) clearInterval(autoTimer);
        autoTimer = null;
      };

      // Klik dots
      dots.forEach((dot, i) => {
        dot.addEventListener('click', () => {
          goTo(i);
          startAuto();
        });
      });

      // Pause auto saat hover (desktop)
      slider.addEventListener('mouseenter', stopAuto);
      slider.addEventListener('mouseleave', startAuto);

      // Swipe support (mobile)
      let touchStartX = 0;
      let touchEndX = 0;
      slider.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
        stopAuto();
      }, { passive: true });
      slider.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        const diff = touchEndX - touchStartX;
        if (Math.abs(diff) > 50) {
          if (diff < 0) next(); else prev();
        }
        startAuto();
      }, { passive: true });

      // Mulai
      goTo(0);
      startAuto();
    }
  }

  /* -----------------------------------------------------
     3. SMOOTH SCROLL UNTUK ANCHOR LINKS
  ----------------------------------------------------- */
  document.querySelectorAll('a[href^=\"#\"]').forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
      const targetId = anchor.getAttribute('href');
      if (targetId.length > 1) {
        const target = document.querySelector(targetId);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    });
  });

  /* -----------------------------------------------------
     4. SCROLL REVEAL (fade-in saat section muncul)
  ----------------------------------------------------- */
  if ('IntersectionObserver' in window) {
    const sections = document.querySelectorAll('section');
    sections.forEach((s) => {
      s.style.opacity = '0';
      s.style.transform = 'translateY(24px)';
      s.style.transition = 'opacity 0.7s ease, transform 0.7s ease';
    });

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    sections.forEach((s) => observer.observe(s));
  }

  /* -----------------------------------------------------
     5. FORM FEEDBACK (loading state saat submit)
  ----------------------------------------------------- */
  const form = document.querySelector('#contact form');
  if (form) {
    form.addEventListener('submit', () => {
      const btn = form.querySelector('button[type=\"submit\"]');
      if (btn) {
        btn.disabled = true;
        btn.textContent = 'Mengirim...';
        btn.style.opacity = '0.7';
      }
    });
  }

})();
"
Observation: Create successful: /app/script.js
