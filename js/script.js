
// ==========================
// MOBILE MENU
// ==========================
const openMenu = document.getElementById("openMenu");
const mobileMenu = document.getElementById("mobileMenu");
const overlay = document.getElementById("overlay");
const closeMenu = document.getElementById("closeMenu");

openMenu.onclick = () => {
  mobileMenu.classList.add("active");
  overlay.classList.add("active");
};

closeMenu.onclick = () => {
  mobileMenu.classList.remove("active");
  overlay.classList.remove("active");
};

overlay.onclick = () => {
  mobileMenu.classList.remove("active");
  overlay.classList.remove("active");
};

// ==========================
// PRODUCT FILTER FUNCTIONALITY
// ==========================
// const heroSearch = document.getElementById("heroSearch");
// const searchInput = document.getElementById("searchInput");
// const categoryFilter = document.getElementById("categoryFilter");
// const products = document.querySelectorAll(".products .product-card");
// const noResult = document.getElementById("noResult");

const searchInput = document.getElementById("heroSearch");
const categoryButtons = document.querySelectorAll(".category-card");
const products = document.querySelectorAll(".product-card");

// Scroll to products from hero search
function scrollToProducts() {
  document.getElementById("new").scrollIntoView({ behavior: "smooth" });
  searchInput.value = heroSearch.value;
  filterProducts();
}

let selectedCategory = "all";
// CATEGORY CLICK
categoryButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    categoryButtons.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");

    selectedCategory = btn.dataset.category || btn.textContent.toLowerCase();
    filterProducts();
  });
});

// SEARCH INPUT
searchInput.addEventListener("input", filterProducts);

// category click
categoryButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    selectedCategory = btn.dataset.category;
    filterProducts();
  });
});

// MAIN FILTER FUNCTION
function filterProducts() {
  const searchText = searchInput.value.toLowerCase();
  let found = false;

  products.forEach(card => {
    const title = card.querySelector(".product-title").textContent.toLowerCase();
    const category = card.dataset.category;

    const matchSearch = title.includes(searchText);
    const matchCategory =
      selectedCategory === "all" || category === selectedCategory;

    if (matchSearch && matchCategory) {
      card.style.display = "block";
      found = true;
    } else {
      card.style.display = "none";
    }
  });

  // Optional no result message
  const noResult = document.getElementById("noResult");
  if (noResult) {
    noResult.style.display = found ? "none" : "block";
  }
}

// Events
