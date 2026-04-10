// ===============================
// LOAD HEADER
// ===============================
async function loadHeader() {
  try {
    const res = await fetch("../components/header.html");
    const data = await res.text();
    document.getElementById("header").innerHTML = data;

    // 1. Setup Hamburger/Menu
    initHeaderEvents();

   // 2. Setup Search Logic
    // We wrap it in a function check to ensure script.js is ready
    const dInput = document.getElementById("searchInputDesktop");
    const mInput = document.getElementById("searchInputMobile");

    const triggerSearch = () => {
      if (typeof resetPageAndRender === "function") {
        resetPageAndRender();
      }
    };

    dInput?.addEventListener("input", triggerSearch);
    mInput?.addEventListener("input", triggerSearch);

    if (typeof updateCartCount === "function") updateCartCount();

  } catch (err) {
    console.error("Header load failed:", err);
  }
}

// ===============================
// LOAD FOOTER
// ===============================
async function loadFooter() {
  try {
    const res = await fetch("../components/footer.html");
    const data = await res.text();

    document.getElementById("footer").innerHTML = data;

  } catch (err) {
    console.error("Footer load failed:", err);
  }
}

// ===============================
// HEADER EVENTS (ALL HERE)
// ===============================
function initHeaderEvents() {
  const openMenuBtn = document.getElementById("openMenu");
  const closeMenuBtn = document.getElementById("closeMenu");
  const mobileMenu = document.getElementById("mobileMenu");
  const overlay = document.getElementById("overlay");

  if (!openMenuBtn || !mobileMenu || !overlay) return;

  const openMenu = (e) => {
    e.preventDefault();
    e.stopPropagation();
    mobileMenu.classList.add("active");
    overlay.classList.add("active");
    document.body.classList.add("menu-open");
  };

  const closeMenu = () => {
    mobileMenu.classList.remove("active");
    overlay.classList.remove("active");
    document.body.classList.remove("menu-open");
  };

  openMenuBtn.onclick = openMenu; // Direct assignment is safer for injected HTML
  closeMenuBtn.onclick = closeMenu;
  overlay.onclick = closeMenu;

  // FIX: Only close menu if a LINK (<a>) is clicked, not the whole container
 // 1. Handle the Dropdown Toggle separately with stopPropagation
  const dropdownToggle = mobileMenu.querySelector(".dropdown-toggle");
  const dropdownMenu = mobileMenu.querySelector(".dropdown-menu");

  dropdownToggle?.addEventListener("click", (e) => {
    e.preventDefault();
    e.stopPropagation(); // Prevents the click from reaching mobileMenu.onclick
    dropdownMenu?.classList.toggle("show");
  });

  // 2. Updated mobileMenu.onclick logic
  mobileMenu.onclick = (e) => {
    // Check if the click was on a link or a specific category button
    const isLink = e.target.tagName === 'A';
    const isCategoryBtn = e.target.classList.contains('mobile-category');
    
    // If it's a category or a link, close the sidebar
    if (isLink || isCategoryBtn) {
      closeMenu();
    }
  };
}
// ===============================
// INIT APP
// ===============================
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", () => {
    loadHeader();
    loadFooter();
  });
} else {
  loadHeader();
  loadFooter();
}