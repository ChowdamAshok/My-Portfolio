document.addEventListener("DOMContentLoaded", () => {
  gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

  /* =========================
     SMOOTH SCROLL
  ========================== */
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href").trim();
      const target = document.querySelector(targetId);

      if (target) {
        gsap.to(window, {
          duration: 1,
          scrollTo: {
            y: target,
            offsetY: 70,
          },
          ease: "power2.out",
        });
      }
    });
  });

  /* =========================
     FLOATING PROFILE IMAGE
  ========================== */
  gsap.to(".profile-img", {
    y: -10,
    repeat: -1,
    duration: 2,
    yoyo: true,
    ease: "sine.inOut",
  });

  /* =========================
     HERO SECTION
  ========================== */
  gsap.from(".hero-title, .subtitle, .bio, .cta-buttons", {
    opacity: 0,
    y: 40,
    duration: 1,
    stagger: 0.25,
    ease: "power3.out",
    scrollTrigger: {
      trigger: "#home",
      start: "top 80%",
      toggleActions: "play none none none",
    },
  });

  /* =========================
     SKILL PROGRESS BARS
  ========================== */
  document.querySelectorAll(".progress").forEach((bar) => {
    const width = bar.getAttribute("data-width");

    if (width) {
      bar.style.width = "0";

      gsap.to(bar, {
        width: width,
        duration: 1.5,
        ease: "power2.out",
        scrollTrigger: {
          trigger: bar.closest(".skill-card"),
          start: "top 85%",
          toggleActions: "play none none none",
        },
      });
    }
  });

  /* =========================
     SKILL CARDS
  ========================== */
  gsap.utils.toArray(".skill-card").forEach((card) => {
    gsap.from(card, {
      opacity: 0,
      y: 50,
      duration: 0.8,
      ease: "power3.out",
      scrollTrigger: {
        trigger: card,
        start: "top 85%",
        toggleActions: "play none none none",
      },
    });
  });

  /* =========================
     PROJECT CARDS
  ========================== */
  gsap.utils.toArray(".project-card").forEach((card) => {
    gsap.from(card, {
      opacity: 0,
      y: 80,
      scale: 0.95,
      duration: 0.9,
      ease: "power3.out",
      scrollTrigger: {
        trigger: card,
        start: "top 75%",
        toggleActions: "play none none none",
      },
    });
  });

  /* =========================
     TIMELINE ITEMS
  ========================== */
  gsap.utils.toArray(".timeline-item").forEach((item, i) => {
    const isEven = i % 2 === 1;

    gsap.from(item, {
      opacity: 0,
      x: isEven ? 60 : -60,
      y: 30,
      duration: 0.9,
      ease: "power2.out",
      scrollTrigger: {
        trigger: item,
        start: "top 85%",
        toggleActions: "play none none none",
      },
    });
  });

  /* =========================
     CERTIFICATIONS
  ========================== */
  gsap.utils.toArray(".badge").forEach((badge) => {
    gsap.from(badge, {
      opacity: 0,
      scale: 0.85,
      y: 30,
      duration: 0.8,
      ease: "back.out(1.4)",
      scrollTrigger: {
        trigger: badge,
        start: "top 85%",
        toggleActions: "play none none none",
      },
    });
  });

  /* =========================
     CONTACT SECTION
  ========================== */
  gsap.from("#contact h2, #contact .section-subtitle", {
    opacity: 0,
    y: 30,
    duration: 0.8,
    stagger: 0.15,
    ease: "power3.out",
    scrollTrigger: {
      trigger: "#contact",
      start: "top 85%",
      toggleActions: "play none none none",
    },
  });

  gsap.utils.toArray(".contact-item").forEach((item, i) => {
    gsap.from(item, {
      opacity: 0,
      x: i % 2 === 0 ? -40 : 40,
      duration: 0.7,
      delay: i * 0.1,
      ease: "power2.out",
      scrollTrigger: {
        trigger: item,
        start: "top 90%",
        toggleActions: "play none none none",
      },
    });
  });

  gsap.from(".social-icon", {
    opacity: 0,
    y: 30,
    scale: 0.8,
    duration: 0.7,
    stagger: 0.15,
    ease: "back.out(1.4)",
    scrollTrigger: {
      trigger: ".social-links",
      start: "top 90%",
      toggleActions: "play none none none",
    },
  });

  gsap.from(".contact-divider", {
    opacity: 0,
    y: 20,
    duration: 0.7,
    ease: "power2.out",
    scrollTrigger: {
      trigger: ".contact-divider",
      start: "top 90%",
      toggleActions: "play none none none",
    },
  });

  /* =========================
     FOOTER
  ========================== */
  gsap.from("footer", {
    opacity: 0,
    y: 40,
    duration: 0.8,
    ease: "power3.out",
    scrollTrigger: {
      trigger: "footer",
      start: "top 95%",
      toggleActions: "play none none none",
    },
  });

  /* =========================
     HEADER SHADOW ON SCROLL
  ========================== */
  const header = document.getElementById("header");

  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      header.classList.add("sticky");
    } else {
      header.classList.remove("sticky");
    }
  });

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

      if (icon) {
        icon.classList.remove("fa-moon");
        icon.classList.add("fa-sun");
      }
    }

    themeToggle.addEventListener("click", () => {
      body.classList.toggle("dark-mode");

      if (body.classList.contains("dark-mode")) {
        localStorage.setItem("theme", "dark");

        if (icon) {
          icon.classList.remove("fa-moon");
          icon.classList.add("fa-sun");
        }
      } else {
        localStorage.setItem("theme", "light");

        if (icon) {
          icon.classList.remove("fa-sun");
          icon.classList.add("fa-moon");
        }
      }
    });
  }

  /* =========================
     REFRESH SCROLLTRIGGER
  ========================== */
  ScrollTrigger.refresh();
});
