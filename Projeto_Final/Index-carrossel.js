const track = document.getElementById('track');
const slides = Array.from(track.children);
const dots = Array.from(document.querySelectorAll('.dot'));

let currentindex = 0;
const intervalTime = 2000;

function updateCarousel() {
  track.style.transform = `translateX(-${currentindex * 100}%)`;

  dots.forEach((dot, index) => {
    if (index === currentindex) {
      dot.classList.add('active');
    } else {
      dot.classList.remove('active');
    }
  });
}

function nextSlide() {
  currentindex = (currentindex + 1) % slides.length;
  updateCarousel();
}

let autoPlay = setInterval(nextSlide, intervalTime);

dots.forEach((dot, index) => {
  dot.addEventListener('click', () => {
    currentindex = index;
    updateCarousel();
    
    // Reinicia o temporizador ao clicar manualmente
    clearInterval(autoPlay);
    autoPlay = setInterval(nextSlide, intervalTime);
  });
});