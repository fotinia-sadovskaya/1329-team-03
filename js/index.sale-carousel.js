function initSaleCarousel() {
  const carouselContainer = document.querySelector(".product-gallery__grid");
  const categoryFilter = document.querySelector("#category-filter");

  // Завантаження JSON-файлу
  fetch("api/sale.json")
    .then((response) => response.json())
    .then((products) => {
      let saleProducts = products.filter(
        (product) => product.promoLabel.toLowerCase() === "sale"
      );

      renderProducts(saleProducts);

      // Додаємо слухача змін на фільтрі категорій
      categoryFilter.addEventListener("change", function () {
        const selectedCategory = categoryFilter.value;
        let filteredProducts = saleProducts;

        if (selectedCategory !== "all") {
          filteredProducts = saleProducts.filter(
            (product) => product.category === selectedCategory
          );
        }

        renderProducts(filteredProducts);
      });
    })
    .catch((error) => console.error("Error loading products:", error));

  // Функція рендерингу товарів
  function renderProducts(products) {
    carouselContainer.innerHTML = ""; // Очищення контейнера

    products.forEach((product) => {
      const productCard = document.createElement("article");
      productCard.classList.add("product-card");

      productCard.innerHTML = `
          <a href="#" class="product-card__link">
            <img class="product-card__image" src="${product.image}" alt="${
        product.name
      }" />
            <button type="button" class="btn btn-secondary">${
              product.promoLabel
            }</button>
            ${
              product.stockStatus.toLowerCase() === "out of stock"
                ? `<div class="popular-products__badge-bottom-pro popular-products__badge-out-of-stock-pro">
                <span class="badge__out-of-stock">Out of stock</span>
              </div>`
                : ""
            }
          </a>
          <h5 class="product-card__title">
            <a href="#" class="product-card__name">${product.name}</a>
          </h5>
          <div class="prices">
            <span class="product-card__price-old">$${product.oldPrice.toFixed(
              2
            )}USD</span>
            <span class="product-card__price-new">$${product.price.toFixed(
              2
            )}USD</span>
          </div>
          <button class="btn ${
            product.stockStatus.toLowerCase() === "out of stock"
              ? "btn-disabled"
              : "btn-primary"
          }" type="button" ${
        product.stockStatus.toLowerCase() === "out of stock" ? "disabled" : ""
      }>
            Buy now
          </button>
        `;

      carouselContainer.appendChild(productCard);
    });

    // Ініціалізація каруселі
    initCarousel();
  }

  // Функція ініціалізації каруселі (залежить від бібліотеки, наприклад, Swiper)
  function initCarousel() {
    if (typeof Swiper !== "undefined") {
      new Swiper(".sale__carousel", {
        slidesPerView: 3,
        spaceBetween: 20,
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
        breakpoints: {
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        },
      });
    }
  }
}
