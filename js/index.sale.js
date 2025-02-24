import { addProductToCart } from "./global.cart.js";

let productsData = []; // Глобальна змінна для збереження продуктів

function initSaleCarousel() {
  const carouselTrack = document.querySelector(".product-gallery__track");
  const prevButton = document.querySelector(".carousel__prev");
  const nextButton = document.querySelector(".carousel__next");
  const categoryFilter = document.querySelector("#category-filter");

  let slideIndex = 0;
  const slideWidth = 300; // Ширина одного товару (змінюй за потреби)
  const slidesToShow = 3; // Кількість товарів, що видно одночасно

  // Завантаження JSON
  fetch("api/cards.json")
    .then((response) => response.json())
    .then((products) => {
      let saleProducts = products.filter(
        (product) => product.promoLabel.toLowerCase() === "sale"
      );

      renderProducts(saleProducts);

      // Фільтр за категоріями
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

  function renderProducts(products) {
    carouselTrack.innerHTML = ""; // Очищення треку

    products.forEach((product) => {
      const productCard = document.createElement("article");
      productCard.classList.add("product-card");

      productCard.innerHTML = `
        <a href="#" class="product-card__link">
          <img class="product-card__image" src="${product.image}" alt="${product.name}" />
          <button type="button" class="btn btn-secondary">${product.promoLabel}</button>
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
          <span class="product-card__price-old">$${product.oldPrice.toFixed(2)} USD</span>
          <span class="product-card__price-new">$${product.price.toFixed(2)} USD</span>
        </div>
        <button class="btn ${
          product.stockStatus.toLowerCase() === "out of stock"
            ? "btn-disabled"
            : "btn-primary"
        } card__button--cart" type="button"
        data-name="${product.name}" data-price="${product.price}" ${
        product.stockStatus.toLowerCase() === "out of stock" ? "disabled" : ""
      }>
          Buy now
        </button>
      `;

      carouselTrack.appendChild(productCard);
    });

    // Додаємо обробник кліків для кнопок "Buy now"
    document.querySelectorAll(".card__button--cart").forEach((button) => {
      button.addEventListener("click", (event) => {
        const productName = event.target.dataset.name;
        const productPrice = parseFloat(event.target.dataset.price);

        if (productName && !isNaN(productPrice)) {
          addProductToCart(productName, productPrice);
          console.log(`Added to cart: ${productName}, $${productPrice}`);
        } else {
          console.error("Error: Product data is missing or incorrect");
        }
      });
    });

    // Перезапускаємо карусель
    slideIndex = 0;
    updateCarousel();
  }

  function updateCarousel() {
    const offset = -(slideIndex * slideWidth);
    carouselTrack.style.transform = `translateX(${offset}px)`;
  }

  prevButton.addEventListener("click", () => {
    if (slideIndex > 0) {
      slideIndex--;
      updateCarousel();
    }
  });

  nextButton.addEventListener("click", () => {
    const maxSlides = carouselTrack.children.length - slidesToShow;
    if (slideIndex < maxSlides) {
      slideIndex++;
      updateCarousel();
    }
  });
}

// Викликаємо функцію одразу
initSaleCarousel();


// import { addProductToCart } from "./global.cart.js";

// let productsData = []; // Глобальна змінна для збереження продуктів
// let currencies;

// // Функція отримання даних
// async function fetchProducts() {
//   try {
//     const response = await fetch("./api/sale.json"); // Завантажуємо JSON
//     if (!response.ok) {
//       throw new Error(`HTTP error! Status: ${response.status}`);
//     }
//     productsData = await response.json();
//     renderProducts(productsData);
//   } catch (error) {
//     console.error("Error loading products:", error);
//   }
// }

// // Функція рендерингу товарів
// function renderProducts(products, rate = 1, currencySymbol = "$") {
//   let productsHTML = "";
//   for (const product of products) {
//     productsHTML += `
//         <article class="product-card">
//           <a href="#" class="product-card__link">
//             <img
//               class="product-card__image"
//               alt="${product.name}"
//               src="${product.image}"
//               onerror="this.onerror=null; this.src='img/placeholder.png';"
//             />
//             ${
//               product.promoLabel
//                 ? `<button type="button" class="btn btn-secondary">${product.promoLabel}</button>`
//                 : ""
//             }
//             ${
//               product.stockStatus
//                 ? `<div class="popular-products__badge-bottom-pro popular-products__badge-${product.stockStatus.replace(
//                     " ",
//                     "-"
//                   )}-pro">
//                   <div class="badge__${product.stockStatus.replace(" ", "-")}">
//                     ${product.stockStatus}
//                   </div>
//                 </div>`
//                 : ""
//             }
//           </a>
//           <h5 class="product-card__title">
//             <a href="#" class="product-card__name">${product.name}</a>
//           </h5>
//           <div class="prices">
//             ${
//               product.oldPrice
//                 ? `<div class="product-card__price-old">${currencySymbol}${(
//                     product.oldPrice * rate
//                   ).toFixed(2)}</div>`
//                 : '<div class="product-card__price-old hidden">----------</div>'
//             }
//             <div class="product-card__price-new">${currencySymbol}${(
//       product.price * rate
//     ).toFixed(2)}</div>
//           </div>
//           <button class="btn ${
//             product.stockStatus === "out of stock"
//               ? "btn-disabled"
//               : "btn-primary"
//           } card__button--cart" type="button" data-name="${
//       product.name
//     }" data-price="${product.price * rate}" ${
//       product.stockStatus === "out of stock" ? "disabled" : ""
//     }>Buy now</button>
//         </article>
//       `;
//   }

//   const productsContainer = document.querySelector(".product-gallery__grid");
//   if (!productsContainer) {
//     console.error("Element .product-gallery__grid not found!");
//     return;
//   }

//   productsContainer.innerHTML = productsHTML;

//   // Додаємо обробник кліків для кнопок "Buy now"
//   document.querySelectorAll(".card__button--cart").forEach((button) => {
//     button.addEventListener("click", (event) => {
//       const productName = event.target.dataset.name;
//       const productPrice = parseFloat(event.target.dataset.price);

//       if (productName && !isNaN(productPrice)) {
//         addProductToCart(productName, productPrice);
//         console.log(`Added to cart: ${productName}, $${productPrice}`);
//       } else {
//         console.error("Error: Product data is missing or incorrect");
//       }
//     });
//   });
// }
