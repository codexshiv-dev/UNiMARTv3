
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

