const track = document.getElementById('track');
const slides = Array.from(track.children);
const dots = Array.from(document.querySelectorAll('.dot'));

let currentIndex = 0;
const intervalTime = 2000;

function updateCarousel() {
  track.style.transform = `translateX(-${currentIndex * 100}%)`;

  dots.forEach((dot, Index) => {
    if (Index === currentIndex) {
      dot.classList.add('active');
    } else {
      dot.classList.remove('active');
    }
  });
}

function nextSlide() {
  currentIndex = (currentIndex + 1) % slides.length;
  updateCarousel();
}

let autoPlay = setInterval(nextSlide, intervalTime);

dots.forEach((dot, Index) => {
  dot.addEventListener('click', () => {
    currentIndex = Index;
    updateCarousel();
    
    clearInterval(autoPlay);
    autoPlay = setInterval(nextSlide, intervalTime);
  });
});