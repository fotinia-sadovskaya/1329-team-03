function init() {
  import("./header.js");
  import("./index.hero.js");
  import("./index.popular-items.js");
  import("./index.categories.js");
  import("./index.sale-carousel.js");
  import("./index.swiper.js");
  import("./index.countdown.js");
  import("./index.news.js");
  import("./scroll-to-top.js");
  import("./global.cart.js");
  import("./shop.cat.js");
  import("./shop.category.js");
  import("./index.footer-contact-form.js");
  import("./footer.js");
}

const totalPartials = document.querySelectorAll(
  '[hx-trigger="load"], [data-hx-trigger="load"]'
).length;
let loadedPartialsCount = 0;

document.body.addEventListener("htmx:afterOnLoad", () => {
  loadedPartialsCount++;
  if (loadedPartialsCount === totalPartials) init();
});
