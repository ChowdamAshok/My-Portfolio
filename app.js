window.addEventListener('scroll', () => {
    const backgroundRotate = document.querySelector('.background-rotate');
    const scrollPosition = window.scrollY;
  
    // Set the rotation based on the scroll position
    backgroundRotate.style.transform = `rotate(${scrollPosition / 12}deg)`;
  
    // Change background color based on scroll position
    if (scrollPosition > 10) {
        backgroundRotate.style.background = 'conic-gradient(#808080)'; // Gray instead of blue
      } 
  });
  
    // Scroll Reveal
  const sr = ScrollReveal ({
    origin: 'top',
    distance: '80px',
    duration: 3000,
    reset: true
});


sr.reveal(`#navbar, .left,
            .right img, .link-buttons, .about p,.abt h1, .timeline,
            .box, .s-box, #Portfolio h1, 
            .Certifications, .skill-set h1, .skill-set img, .card, .cnt-main h1, .cnt-main h2, .cnt-main h3, 
            .cnt-btn`, {
    interval: 300
})
  
  