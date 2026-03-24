// ===============================
// LOAD HEADER
// ===============================
async function loadHeader() {
  try {
    const res = await fetch("../components/header.html");
    const data = await res.text();

    document.getElementById("header").innerHTML = data;

    // Initialize AFTER DOM injection
    initHeaderEvents();

    // Optional safe call
    if (typeof updateCartCount === "function") {
      updateCartCount();
    }

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
function initHeaderEvents(retry = 0) {
  const openMenuBtn = document.getElementById("openMenu");
  const closeMenuBtn = document.getElementById("closeMenu");
  const mobileMenu = document.getElementById("mobileMenu");
  const overlay = document.getElementById("overlay");

  if (!openMenuBtn || !mobileMenu || !overlay) {
    if (retry < 5) {
      return setTimeout(() => initHeaderEvents(retry + 1), 100);
    }
    console.warn("Header elements missing!");
    return;
  }

  let scrollY = 0;

  const openMenu = () => {
    scrollY = window.scrollY;

    mobileMenu.classList.add("active");
    overlay.classList.add("active");
    document.body.classList.add("menu-open");
    document.body.style.top = `-${scrollY}px`;
  };

  const closeMenu = () => {
    mobileMenu.classList.remove("active");
    overlay.classList.remove("active");
    document.body.classList.remove("menu-open");
    document.body.style.top = "";

    window.scrollTo(0, scrollY);
  };

  // openMenuBtn.addEventListener("click", openMenu);
  openMenuBtn.addEventListener("click", (e) => {
  e.preventDefault();
   e.stopPropagation(); 
  openMenu();
   });
  
  closeMenuBtn?.addEventListener("click", closeMenu);
  overlay.addEventListener("click", closeMenu);

 
    // Close menu when clicking ANY item inside (except header area)
     mobileMenu.addEventListener("click", (e) => {
       if (
         e.target.closest(".mobile-menu-header") ||
         e.target.closest(".dropdown-toggle")
       ) {
         return;
       }
       closeMenu();
     });
     
      // Optional: close on resize
       window.addEventListener("resize", () => {
          if (window.innerWidth > 768) closeMenu();
        });

        
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