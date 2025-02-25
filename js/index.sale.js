const slides = [
  `<div class="slide-article">
      <article data-hx-trigger="load" data-hx-swap="outerHTML" data-hx-get="./cards/pixelview-flex.html"></article>
    </div>`,
  `<div class="slide-article">
      <article data-hx-trigger="load" data-hx-swap="outerHTML" data-hx-get="./cards/pulsesound.html"></article>
    </div>`,
  `<div class="slide-article">
      <article data-hx-trigger="load" data-hx-swap="outerHTML" data-hx-get="./cards/neurokey.html"></article>
    </div>`,
  `<div class="slide-article">
      <article data-hx-trigger="load" data-hx-swap="outerHTML" data-hx-get="./cards/aerogrip.html"></article>
    </div>`,
  `<div class="slide-article">
      <article data-hx-trigger="load" data-hx-swap="outerHTML" data-hx-get="./cards/syncview.html"></article>
    </div>`,
];

let currentSlideIndex = 0;
let slidesPerView = getSlidesPerView();

function getSlidesPerView() {
  if (window.innerWidth >= 1200) return 5;
  if (window.innerWidth >= 992) return 4;
  if (window.innerWidth >= 768) return 3;
  if (window.innerWidth >= 496) return 2;
  return 1;
}

function renderSlides() {
  const slidesContainer = document.querySelector(".carousel");

  if (!slidesContainer) {
    console.error("❌ Не знайдено контейнер для слайдів!");
    return;
  }

  slidesContainer.innerHTML = "";

  for (let i = 0; i < slidesPerView; i++) {
    let index = (currentSlideIndex + i) % slides.length;
    slidesContainer.innerHTML += slides[index];
  }

  // **Оновлення HTMX після рендеру**
  htmx.process(slidesContainer);
}

function nextSlide() {
  currentSlideIndex = (currentSlideIndex + 1) % slides.length;
  renderSlides();
}

function prevSlide() {
  currentSlideIndex =
    currentSlideIndex - 1 < 0 ? slides.length - 1 : currentSlideIndex - 1;
  renderSlides();
}

// **Запускаємо рендеринг**
renderSlides();

// **Автозміна слайдів**
// setInterval(nextSlide, 3000);

// **Обробники подій для кнопок**
document
  .querySelector(".carousel-btn.next")
  ?.addEventListener("click", nextSlide);
document
  .querySelector(".carousel-btn.prev")
  ?.addEventListener("click", prevSlide);

// **Слухаємо зміну розміру екрану**
window.addEventListener("resize", () => {
  slidesPerView = getSlidesPerView();
  renderSlides();
});


// Animation carousel

// class Carousel {
//   constructor() {
//     this.container = document.querySelector('.carousel');
//     this.track = document.querySelector('.carousel-track');
//     this.slides = Array.from(document.querySelectorAll('.carousel-slide'));
//     this.prevButton = document.querySelector('.carousel-button.prev');
//     this.nextButton = document.querySelector('.carousel-button.next');
    
//     this.currentIndex = 0;
//     this.slidesPerView = this.getSlidesPerView();
    
//     // Clone slides for infinite scroll
//     this.setupInfiniteScroll();
    
//     // Event listeners
//     this.prevButton.addEventListener('click', () => this.slide('prev'));
//     this.nextButton.addEventListener('click', () => this.slide('next'));
//     window.addEventListener('resize', () => {
//       this.slidesPerView = this.getSlidesPerView();
//       this.updateSlidePositions();
//     });

//     // Initial position
//     this.updateSlidePositions();
//   }

//   getSlidesPerView() {
//     if (window.innerWidth >= 1024) return 3; // Desktop
//     if (window.innerWidth >= 768) return 2;  // Tablet
//     return 1; // Mobile
//   }

//   setupInfiniteScroll() {
//     // Clone slides and add to beginning and end
//     const firstSlideClones = this.slides.slice(0, this.getSlidesPerView()).map(slide => slide.cloneNode(true));
//     const lastSlideClones = this.slides.slice(-this.getSlidesPerView()).map(slide => slide.cloneNode(true));
    
//     firstSlideClones.forEach(clone => this.track.appendChild(clone));
//     lastSlideClones.reverse().forEach(clone => this.track.insertBefore(clone, this.track.firstChild));
    
//     // Update slides array with clones
//     this.slides = Array.from(document.querySelectorAll('.carousel-slide'));
//     this.currentIndex = this.getSlidesPerView();
//   }

//   updateSlidePositions() {
//     const slideWidth = 100 / this.slidesPerView;
//     this.slides.forEach(slide => {
//       slide.style.width = `${slideWidth}%`;
//     });
    
//     const offset = -this.currentIndex * (100 / this.slidesPerView);
//     this.track.style.transform = `translateX(${offset}%)`;
//   }

//   slide(direction) {
//     if (direction === 'next') {
//       this.currentIndex++;
//     } else {
//       this.currentIndex--;
//     }

//     this.track.style.transition = 'transform 0.5s ease-in-out';
//     this.updateSlidePositions();

//     // Handle infinite scroll
//     setTimeout(() => {
//       if (this.currentIndex >= this.slides.length - this.slidesPerView) {
//         this.currentIndex = this.getSlidesPerView();
//         this.track.style.transition = 'none';
//         this.updateSlidePositions();
//       } else if (this.currentIndex < this.getSlidesPerView()) {
//         this.currentIndex = this.slides.length - this.slidesPerView * 2;
//         this.track.style.transition = 'none';
//         this.updateSlidePositions();
//       }
//     }, 500);
//   }
// }

// // Initialize carousel
//   new Carousel();