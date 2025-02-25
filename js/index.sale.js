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

// let currentSlideIndex = 0;

// function renderSlides() {
//   const slidesContaner = document.querySelector(".carousel");
//   slidesContaner.innerHTML = slides[currentSlideIndex];
// }

// function nextSlide() {
//   currentSlideIndex =
//     currentSlideIndex + 1 >= slides.length ? 0 : currentSlideIndex + 1;
//   renderSlides();
// }
// setInterval(nextSlide, 3000);
// renderSlides();

// let currentSlideIndex = 0;

// function renderSlides() {
//   const slidesContaner = document.querySelector(".carousel");
//   slidesContaner.innerHTML = slides[currentSlideIndex];
// }

// renderSlides();

// function nextSlide() {
//   currentSlideIndex =
//     currentSlideIndex + 1 >= slides.length ? 0 : currentSlideIndex + 1;
//   renderSlides();
// }
// setInterval(nextSlide, 3000);

// const slides = [
//   `<div class="slide-article">
//       <article data-hx-trigger="load" data-hx-swap="outerHTML" data-hx-get="./cards/pixelview-flex.html"></article>
//     </div>`,
//   `<div class="slide-article">
//       <article data-hx-trigger="load" data-hx-swap="outerHTML" data-hx-get="./cards/pulsesound.html"></article>
//     </div>`,
//   `<div class="slide-article">
//       <article data-hx-trigger="load" data-hx-swap="outerHTML" data-hx-get="./cards/neurokey.html"></article>
//     </div>`,
//   `<div class="slide-article">
//       <article data-hx-trigger="load" data-hx-swap="outerHTML" data-hx-get="./cards/aerogrip.html"></article>
//     </div>`,
//   `<div class="slide-article">
//       <article data-hx-trigger="load" data-hx-swap="outerHTML" data-hx-get="./cards/syncview.html"></article>
//     </div>`,
// ];

// let currentSlideIndex = 0;
// let slidesPerView = getSlidesPerView();

// function getSlidesPerView() {
//   if (window.innerWidth >= 1200) return 5;
//   if (window.innerWidth >= 992) return 4;
//   if (window.innerWidth >= 768) return 3;
//   if (window.innerWidth >= 576) return 2;
//   return 1;
// }

// function renderSlides() {
//   const slidesContainer = document.querySelector(".carousel");

//   if (!slidesContainer) {
//     console.error("❌ Не знайдено контейнер для слайдів!");
//     return;
//   }

//   slidesContainer.innerHTML = slides
//     .map((_, i) => {
//       let index = (currentSlideIndex + i) % slides.length;
//       return slides[index];
//     })
//     .join("");

//   // **Оновлення HTMX після рендеру**
//   htmx.process(slidesContainer);
// }

// function slide(direction) {
//   const slidesContainer = document.querySelector(".carousel");
//   if (!slidesContainer) return;

//   const slideItems = slidesContainer.children;
//   if (slideItems.length === 0) return;

//   slidesContainer.style.transition = "opacity 0.5s ease-in-out";
//   slidesContainer.style.opacity = "0";

//   setTimeout(() => {
//     currentSlideIndex =
//       direction === "next"
//         ? (currentSlideIndex + 1) % slides.length
//         : currentSlideIndex - 1 < 0
//         ? slides.length - 1
//         : currentSlideIndex - 1;

//     renderSlides();

//     slidesContainer.style.opacity = "1";
//   }, 500);
// }

// // **Запускаємо рендеринг**
// renderSlides();

// // **Автозміна слайдів**
// setInterval(() => slide("next"), 3000);

// // **Обробники подій для кнопок**
// document.querySelector(".carousel-btn.next")?.addEventListener("click", () => slide("next"));
// document.querySelector(".carousel-btn.prev")?.addEventListener("click", () => slide("prev"));

// // **Слухаємо зміну розміру екрану**
// window.addEventListener("resize", () => {
//   slidesPerView = getSlidesPerView();
//   renderSlides();
// });

// const slides = [
//   `<div class="slide-article">
//       <article data-hx-trigger="load" data-hx-swap="outerHTML" data-hx-get="./cards/pixelview-flex.html"></article>
//     </div>`,
//   `<div class="slide-article">
//       <article data-hx-trigger="load" data-hx-swap="outerHTML" data-hx-get="./cards/pulsesound.html"></article>
//     </div>`,
//   `<div class="slide-article">
//       <article data-hx-trigger="load" data-hx-swap="outerHTML" data-hx-get="./cards/neurokey.html"></article>
//     </div>`,
//   `<div class="slide-article">
//       <article data-hx-trigger="load" data-hx-swap="outerHTML" data-hx-get="./cards/aerogrip.html"></article>
//     </div>`,
//   `<div class="slide-article">
//       <article data-hx-trigger="load" data-hx-swap="outerHTML" data-hx-get="./cards/syncview.html"></article>
//     </div>`,
// ];

// let currentSlideIndex = 0;
// let slidesPerView = getSlidesPerView();

// function getSlidesPerView() {
//   if (window.innerWidth >= 1200) return 4;
//   if (window.innerWidth >= 992) return 3;
//   if (window.innerWidth >= 768) return 2;
//   return 1;
// }

// function setSliderHeight() {
//   const slidesContainer = document.querySelector(".slider");
//   if (!slidesContainer) return;

//   // Отримуємо висоту найбільшого слайда
//   let maxHeight = 0;
//   slidesContainer.querySelectorAll(".slide-article").forEach((slide) => {
//     maxHeight = Math.max(maxHeight, slide.offsetHeight);
//   });

//   slidesContainer.style.height = `${maxHeight}px`; // Фіксуємо висоту
// }

// function renderSlides() {
//   const slidesContainer = document.querySelector(".slider");

//   if (!slidesContainer) {
//     console.error("❌ Не знайдено контейнер для слайдів!");
//     return;
//   }

//   slidesContainer.innerHTML = slides
//     .map((_, i) => {
//       let index = (currentSlideIndex + i) % slides.length;
//       return slides[index];
//     })
//     .join("");

//   htmx.process(slidesContainer);

//   // Після рендеру оновлюємо висоту
//   setTimeout(setSliderHeight, 100);
// }

// function slide(direction) {
//   const slidesContainer = document.querySelector(".slider");
//   if (!slidesContainer) return;

//   slidesContainer.style.transition = "opacity 0.5s ease-in-out";
//   slidesContainer.style.opacity = "0";

//   setTimeout(() => {
//     currentSlideIndex =
//       direction === "next"
//         ? (currentSlideIndex + 1) % slides.length
//         : currentSlideIndex - 1 < 0
//         ? slides.length - 1
//         : currentSlideIndex - 1;

//     renderSlides();

//     slidesContainer.style.opacity = "1";
//   }, 500);
// }

// // **Запускаємо рендеринг**
// renderSlides();

// // **Автозміна слайдів**
// setInterval(() => slide("next"), 3000);

// // **Обробники подій для кнопок**
// document.querySelector(".slider-btn.next")?.addEventListener("click", () => slide("next"));
// document.querySelector(".slider-btn.prev")?.addEventListener("click", () => slide("prev"));

// // **Слухаємо зміну розміру екрану**
// window.addEventListener("resize", () => {
//   slidesPerView = getSlidesPerView();
//   renderSlides();
// });
