document.addEventListener("DOMContentLoaded", () => {
  gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

  // Mark body as JS-ready (enables will-change CSS)
  document.body.classList.add("js-ready");

  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;

  /* =========================
     SMOOTH SCROLL
  ========================== */
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href").trim();

      // Guard against bare "#" links (e.g. placeholder/back-to-top buttons),
      // which previously crashed querySelector and could leave click handling
      // in a broken state for subsequent clicks.
      if (!targetId || targetId === "#") {
        return;
      }

      let target;
      try {
        target = document.querySelector(targetId);
      } catch (err) {
        // Invalid selector — bail out quietly instead of throwing
        return;
      }

      if (target) {
        gsap.to(window, {
          duration: 0.85,
          scrollTo: { y: target, offsetY: 70 },
          ease: "power2.inOut",
          overwrite: true, // instantly takes over any scroll tween already running
          onComplete: () => ScrollTrigger.refresh(),
        });
      }
    });
  });

  /* =========================
     SKIP ALL ANIMATIONS if user prefers reduced motion
  ========================== */
  if (prefersReducedMotion) {
    gsap.to(".profile-img", { y: 0 });
    return;
  }

  /* =========================
     FLOATING PROFILE IMAGE
  ========================== */
  gsap.to(".profile-img", {
    y: -8,
    repeat: -1,
    duration: 2.5,
    yoyo: true,
    ease: "sine.inOut",
  });

  /* =========================
     HERO — set invisible first, then animate in
  ========================== */
  const heroEls = gsap.utils.toArray(
    ".hero-title, .subtitle, .bio, .cta-buttons",
  );
  gsap.set(heroEls, { autoAlpha: 0, y: 30 });
  gsap.to(heroEls, {
    autoAlpha: 1,
    y: 0,
    duration: 0.7,
    stagger: 0.18,
    ease: "power2.out",
    delay: 0.1,
  });

  /* =========================
     HELPER: batch animate with guaranteed visible fallback
     Uses autoAlpha so elements are NEVER stuck invisible
  ========================== */
  function batchAnimate(selector, yOffset = 35) {
    const els = gsap.utils.toArray(selector);
    if (!els.length) return;

    // Set start state
    gsap.set(els, { autoAlpha: 0, y: yOffset });

    ScrollTrigger.batch(els, {
      onEnter: (batch) => {
        gsap.to(batch, {
          autoAlpha: 1,
          y: 0,
          duration: 0.55,
          stagger: 0.07,
          ease: "power2.out",
          overwrite: "auto",
        });
      },
      // Fire early enough — elements become visible well before center of screen
      start: "top 95%",
      once: true,
    });
  }

  batchAnimate(".skill-category", 30);
  batchAnimate(".project-card", 35);
  batchAnimate(".badge", 25);

  /* Timeline items — slide from sides */
  const timelineItems = gsap.utils.toArray(".timeline-item");
  if (timelineItems.length) {
    gsap.set(timelineItems, { autoAlpha: 0, y: 30 });
    ScrollTrigger.batch(timelineItems, {
      onEnter: (batch) => {
        gsap.to(batch, {
          autoAlpha: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: "power2.out",
          overwrite: "auto",
        });
      },
      start: "top 95%",
      once: true,
    });
  }

  /* =========================
     CONTACT
  ========================== */
  const contactHeader = gsap.utils.toArray(
    "#contact h2, #contact .section-subtitle",
  );
  gsap.set(contactHeader, { autoAlpha: 0, y: 20 });
  ScrollTrigger.create({
    trigger: "#contact",
    start: "top 90%",
    once: true,
    onEnter: () => {
      gsap.to(contactHeader, {
        autoAlpha: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.12,
        ease: "power2.out",
      });
    },
  });

  const contactBoxes = gsap.utils.toArray(".contact-info, .contact-form-box");
  gsap.set(contactBoxes, { autoAlpha: 0, y: 25 });
  ScrollTrigger.create({
    trigger: ".contact-wrapper",
    start: "top 92%",
    once: true,
    onEnter: () => {
      gsap.to(contactBoxes, {
        autoAlpha: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.15,
        ease: "power2.out",
      });
    },
  });

  batchAnimate(".social-icon", 15);

  /* =========================
     FOOTER
  ========================== */
  gsap.set("footer", { autoAlpha: 0, y: 15 });
  ScrollTrigger.create({
    trigger: "footer",
    start: "top 98%",
    once: true,
    onEnter: () => {
      gsap.to("footer", {
        autoAlpha: 1,
        y: 0,
        duration: 0.5,
        ease: "power2.out",
      });
    },
  });

  /* =========================
     HEADER SHADOW — throttled
  ========================== */
  const header = document.getElementById("header");
  if (header) {
    let ticking = false;
    window.addEventListener(
      "scroll",
      () => {
        if (!ticking) {
          ticking = true;
          requestAnimationFrame(() => {
            try {
              header.classList.toggle("sticky", window.scrollY > 50);
            } finally {
              // Always release the lock, even if something above throws,
              // so the scroll listener never gets permanently stuck.
              ticking = false;
            }
          });
        }
      },
      { passive: true },
    );
  }

  /* =========================
     DARK / LIGHT MODE
  ========================== */
  const themeToggle = document.getElementById("theme-toggle");
  if (themeToggle) {
    const body = document.body;
    const icon = themeToggle.querySelector("i");
    const savedTheme = localStorage.getItem("theme") || "light";
    if (savedTheme === "dark") {
      body.classList.add("dark-mode");
      if (icon) icon.classList.replace("fa-moon", "fa-sun");
    }
    themeToggle.addEventListener("click", () => {
      body.classList.toggle("dark-mode");
      const isDark = body.classList.contains("dark-mode");
      localStorage.setItem("theme", isDark ? "dark" : "light");
      if (icon)
        icon.classList.replace(
          isDark ? "fa-moon" : "fa-sun",
          isDark ? "fa-sun" : "fa-moon",
        );
    });
  }

  /* =========================
     MOBILE HAMBURGER MENU
  ========================== */
  const hamburger = document.getElementById("hamburger");
  const navLinks = document.getElementById("navLinks");
  if (hamburger && navLinks) {
    const closeMenu = () => {
      hamburger.classList.remove("active");
      navLinks.classList.remove("open");
      hamburger.setAttribute("aria-expanded", "false");
    };

    hamburger.addEventListener("click", () => {
      const isOpen = navLinks.classList.toggle("open");
      hamburger.classList.toggle("active", isOpen);
      hamburger.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });

    // Close the menu after picking a link
    navLinks.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", closeMenu);
    });

    // If the viewport grows back to desktop size, make sure the
    // mobile panel doesn't stay stuck open underneath the full nav.
    window.addEventListener("resize", () => {
      if (window.innerWidth > 768) closeMenu();
    });
  }

  /* =========================
     REFRESH after layout settles
  ========================== */
  setTimeout(() => ScrollTrigger.refresh(), 400);
});

/* =========================
   EARLY WORK TOGGLE
========================== */
function toggleEarlyWork() {
  const grid = document.getElementById("earlyWorkGrid");
  const icon = document.getElementById("toggleIcon");
  if (!grid) return;

  const isOpen = grid.classList.contains("open");
  grid.classList.toggle("open", !isOpen);
  if (icon) icon.classList.toggle("rotated", !isOpen);

  if (!isOpen) {
    // Animate newly revealed cards
    const newCards = grid.querySelectorAll(".project-card");
    gsap.fromTo(
      newCards,
      { autoAlpha: 0, y: 20 },
      { autoAlpha: 1, y: 0, duration: 0.45, stagger: 0.07, ease: "power2.out" },
    );
    setTimeout(() => ScrollTrigger.refresh(), 350);
  } else {
    // Closing the panel changes page height too — refresh so ScrollTrigger
    // positions don't go stale and cause later scroll-jank/"stuck" sections.
    setTimeout(() => ScrollTrigger.refresh(), 350);
  }
}

/* =========================
   CONTACT FORM — Formspree
   Replace YOUR_FORM_ID with your actual ID from formspree.io
========================== */
async function sendContactForm() {
  const name = document.getElementById("contact-name").value.trim();
  const email = document.getElementById("contact-email").value.trim();
  const message = document.getElementById("contact-message").value.trim();
  const btn = document.querySelector(".btn-full");

  if (!name || !email || !message) {
    showFormError("Please fill in all fields before sending.");
    return;
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    showFormError("Please enter a valid email address.");
    return;
  }

  const FORMSPREE_ENDPOINT = "https://formspree.io/f/xjgdnlaj";

  btn.disabled = true;
  btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';

  try {
    const res = await fetch(FORMSPREE_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ name, email, message }),
    });

    if (res.ok) {
      document.getElementById("contact-form-content").style.display = "none";
      document.getElementById("form-success").style.display = "block";
    } else {
      const data = await res.json();
      const errMsg =
        (data.errors || []).map((e) => e.message).join(", ") ||
        "Something went wrong.";
      showFormError(errMsg);
      resetBtn(btn);
    }
  } catch {
    showFormError("Network error — email me directly at cvashok124@gmail.com");
    resetBtn(btn);
  }
}

function showFormError(msg) {
  let err = document.getElementById("form-error");
  if (!err) {
    err = document.createElement("p");
    err.id = "form-error";
    err.style.cssText =
      "color:#e74c3c;font-size:0.88rem;margin-top:10px;font-weight:600;";
    document.getElementById("contact-form-content").appendChild(err);
  }
  err.textContent = msg;
}

function resetBtn(btn) {
  btn.disabled = false;
  btn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
}
