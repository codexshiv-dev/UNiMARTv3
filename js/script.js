// ==========================
// MOBILE MENU
// ==========================
const openMenu = document.getElementById("openMenu");
const mobileMenu = document.getElementById("mobileMenu");
const overlay = document.getElementById("overlay");
const closeMenu = document.getElementById("closeMenu");

if (openMenu) {
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
}
// ==========================
//  PRODUCT FILTER + SEARCH
// ==========================

const products = document.querySelectorAll(".product-grid .product-card");
const heroSearch = document.getElementById("heroSearch");
const categoryButtons = document.querySelectorAll(".category-card");
const noResult = document.getElementById("noResult");

let activeCategory = "all";

// ================= CATEGORY CLICK =================
categoryButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    activeCategory = btn.dataset.category;

    // active style
    categoryButtons.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");

    filterProducts();
  });
});

// ================= SEARCH INPUT =================
heroSearch.addEventListener("input", filterProducts);

// =======================
// MAIN FILTER FUNCTION
// =======================
function filterProducts() {
  const searchText = heroSearch.value.toLowerCase().trim();
  let found = false;

  products.forEach(card => {
    const title = card.querySelector(".product-title").textContent.toLowerCase();
    const desc = card.dataset.desc.toLowerCase();
    const category = card.dataset.category;

    const matchSearch =
      title.includes(searchText) || desc.includes(searchText);

    const matchCategory =
      activeCategory === "all" || category === activeCategory;

    if (matchSearch && matchCategory) {
      card.style.display = "block";
      found = true;
    } else {
      card.style.display = "none";
    }
  });
}

  // Optional no result message
  if (noResult) {
    noResult.style.display = found ? "none" : "block";
  }


// Events
