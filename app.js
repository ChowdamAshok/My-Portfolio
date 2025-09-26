document.addEventListener("DOMContentLoaded", () => {
  gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

  // Smooth scroll to sections
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href").trim();
      const target = document.querySelector(targetId);
      if (target) {
        gsap.to(window, {
          duration: 1,
          scrollTo: { y: target, offsetY: 70 },
          ease: "power2.out"
        });
      }
    });
  });

  // Floating profile image
  gsap.to(".profile-img", {
    y: -10,
    repeat: -1,
    duration: 2,
    yoyo: true,
    ease: "sine.inOut"
  });

  // Hero section
  gsap.from(".hero-title, .subtitle, .bio, .cta-buttons", {
    opacity: 0,
    y: 40,
    duration: 1,
    stagger: 0.25,
    ease: "power3.out",
    scrollTrigger: {
      trigger: "#home",
      start: "top 80%",
      toggleActions: "play reverse play reverse"
    }
  });

  // Skills: progress bars
  document.querySelectorAll(".progress").forEach(bar => {
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
          toggleActions: "play reverse play reverse"
        }
      });
    }
  });

  // Project cards
  gsap.utils.toArray(".project-card").forEach(card => {
    gsap.from(card, {
      opacity: 0,
      y: 80,
      scale: 0.95,
      duration: 0.9,
      ease: "power3.out",
      scrollTrigger: {
        trigger: card,
        start: "top 70%",
        toggleActions: "play reverse play reverse"
      }
    });
  });

  // Timeline items
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
        start: "top 80%",
        toggleActions: "play reverse play reverse"
      }
    });
  });

  // Certifications
  gsap.utils.toArray(".badge").forEach(badge => {
    const img = badge.querySelector("img");
    const animate = () => {
      gsap.from(badge, {
        opacity: 0,
        scale: 0.85,
        y: 30,
        duration: 0.7,
        ease: "back.out(1.3)",
        scrollTrigger: {
          trigger: badge,
          start: "top 85%",
          toggleActions: "play reverse play reverse"
        }
      });
    };

    if (img) {
      if (img.complete && img.naturalHeight !== 0) {
        animate();
      } else {
        img.addEventListener("load", animate);
        img.addEventListener("error", animate);
      }
    } else {
      animate();
    }
  });

  // Contact section
  gsap.from("#contact h2, #contact .section-subtitle", {
    opacity: 0,
    y: 30,
    duration: 0.7,
    stagger: 0.1,
    scrollTrigger: {
      trigger: "#contact",
      start: "top 85%",
      toggleActions: "play reverse play reverse"
    }
  });

  gsap.utils.toArray(".contact-item").forEach((item, i) => {
    gsap.from(item, {
      opacity: 0,
      x: i % 2 === 0 ? -40 : 40,
      duration: 0.6,
      delay: i * 0.1,
      ease: "power2.out",
      scrollTrigger: {
        trigger: item,
        start: "top 90%",
        toggleActions: "play reverse play reverse"
      }
    });
  });

  gsap.from(".social-icon", {
    opacity: 0,
    y: 30,
    scale: 0.8,
    duration: 0.6,
    stagger: 0.15,
    ease: "back.out(1.3)",
    scrollTrigger: {
      trigger: ".social-links",
      start: "top 90%",
      toggleActions: "play reverse play reverse"
    }
  });

  gsap.from(".contact-divider", {
    opacity: 0,
    y: 20,
    duration: 0.6,
    scrollTrigger: {
      trigger: ".contact-divider",
      start: "top 90%",
      toggleActions: "play reverse play reverse"
    }
  });

  // Footer
  gsap.from("footer", {
    opacity: 0,
    y: 30,
    duration: 0.8,
    ease: "power2.out",
    scrollTrigger: {
      trigger: "footer",
      start: "top 95%",
      toggleActions: "play reverse play reverse"
    }
  });

  // Theme toggle
  const themeToggle = document.getElementById("theme-toggle");
  const body = document.body;
  const icon = themeToggle.querySelector("i");

  const savedTheme = localStorage.getItem("theme") || "light";
  if (savedTheme === "dark") {
    body.classList.add("dark-mode");
    icon.classList.replace("fa-moon", "fa-sun");
  }

  themeToggle.addEventListener("click", () => {
    body.classList.toggle("dark-mode");
    if (body.classList.contains("dark-mode")) {
      localStorage.setItem("theme", "dark");
      icon.classList.replace("fa-moon", "fa-sun");
    } else {
      localStorage.setItem("theme", "light");
      icon.classList.replace("fa-sun", "fa-moon");
    }
  });
});
