window.addEventListener('scroll', () => {
  const backgroundRotate = document.querySelector('.background-rotate');
  backgroundRotate.style.transform = `rotate(${window.scrollY / 12}deg)`;
  backgroundRotate.style.background = window.scrollY > 10 ? 'conic-gradient(#808080)' : '';
});

const sr = ScrollReveal({
  distance: '80px',
  duration: 3000,
  reset: true
});

// From Top
sr.reveal(`#navbar, .about h1, .timeline, .block-title, #Portfolio h1, .cnt-main h1, .cnt-main h2, .cnt-main h3, .link-buttons`, {
  origin: 'top',
  interval: 400
});

// From Left
sr.reveal(`.left, #certifications h1, .about-image, .skill-set h1, .cnt-btn`, {
  origin: 'left',
  interval: 400
});

// From Right
sr.reveal(`.right img, .about-list, .skill-set img, .card, .cft-card, .s-box, .box`, {
  origin: 'right',
  interval: 400
});


window.addEventListener('load', () => {
  setTimeout(() => {
    document.body.classList.remove('loading');
    document.querySelector('.loading-overlay').style.display = 'none';
  }, 4000);
});
