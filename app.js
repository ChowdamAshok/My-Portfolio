window.addEventListener('scroll', () => {
    const backgroundRotate = document.querySelector('.background-rotate');
    backgroundRotate.style.transform = `rotate(${window.scrollY / 12}deg)`;
    backgroundRotate.style.background = window.scrollY > 10 ? 'conic-gradient(#808080)' : '';
});

const sr = ScrollReveal({
    origin: 'top',
    distance: '80px',
    duration: 3000,
    reset: true
});

sr.reveal(`#navbar, .left, .right img, .link-buttons, .about-list, .about h1, .about-image,
   .timeline, .block-title, .box, .s-box, #Portfolio h1, .cft-card, .about h1, .skill-set h1,
    .skill-set img, .card, .cnt-main h1, .cnt-main h2, .cnt-main h3, .cnt-btn`, {
    interval: 400
});
