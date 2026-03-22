// =====================
// PRODUCT PAGE LOGIC
// =====================
if (window.location.pathname.includes("product.html")) {

  const params = new URLSearchParams(window.location.search);
  const productId = params.get("id");

  if (!productId) {
    alert("No product selected.");
    window.location.href = "index.html";
  }

  let currentProduct = null;
  let quantity = 1;

  // =====================
  // FETCH PRODUCT
  // =====================
  fetch(`http://localhost:5000/api/products/${productId}`)
    .then(res => res.json())
    .then(product => {

      currentProduct = product;

      // =====================
      // IMAGE + THUMBNAILS
      // =====================
      const mainImg = document.getElementById("productImg");
      const thumbs = document.getElementById("thumbs");

      const images = product.images?.length
        ? product.images
        : ["./images/no-image.png"];

      mainImg.src = images[0];

      thumbs.innerHTML = "";

      images.forEach((src, index) => {
        const t = document.createElement("img");
        t.src = src;
        t.className = "thumb";

        if (index === 0) t.classList.add("active");

        t.onclick = () => {
          mainImg.src = src;

          document.querySelectorAll(".thumb").forEach(img =>
            img.classList.remove("active")
          );

          t.classList.add("active");
        };

        thumbs.appendChild(t);
      });

      // =====================
      // PRODUCT INFO
      // =====================
      document.getElementById("productName").textContent = product.name;
      document.getElementById("productPrice").textContent = `Rs. ${product.price}`;
      document.getElementById("oldPrice").textContent =
        product.oldPrice ? `Rs. ${product.oldPrice}` : "";
      document.getElementById("discount").textContent =
        product.discount ? `${product.discount}% OFF` : "";
      document.getElementById("productDesc").textContent = product.description;

      document.getElementById("productStock").textContent =
        product.stock > 0 ? `In Stock: ${product.stock}` : "Out of Stock";

      document.getElementById("productSKU").textContent =
        `SKU: ${product.sku || "-"}`;

      // =====================
      // TAGS
      // =====================
      const tagsList = document.getElementById("productTags");
      tagsList.innerHTML = "";

      product.tags?.forEach(tag => {
        const li = document.createElement("li");
        li.textContent = tag;
        tagsList.appendChild(li);
      });

      // =====================
      // CART BUTTON
      // =====================
      const btnCart = document.querySelector(".btn-cart");

      if (product.stock === 0) {
        btnCart.disabled = true;
        btnCart.textContent = "Out of Stock";
      } else {
        btnCart.disabled = false;

        btnCart.onclick = () => {
          btnCart.textContent = "Adding...";

          addToCart(product, quantity);

          setTimeout(() => {
            btnCart.textContent = "Add to Cart";
          }, 800);
        };
      }

      // =====================
      // WHATSAPP
      // =====================
      document.getElementById("whatsappBtn").href =
        `https://wa.me/9779700013011?text=${encodeURIComponent(
          `Hello 👋 I want to order ${product.name} - Rs.${product.price}`
        )}`;

      // =====================
      // SHARE
      // =====================
      document.getElementById("shareBtn").onclick = () => {
        if (navigator.share) {
          navigator.share({
            title: product.name,
            url: window.location.href
          });
        } else {
          navigator.clipboard.writeText(window.location.href);
          alert("Link copied!");
        }
      };

    })
    .catch(err => {
      console.error(err);
      alert("Error loading product");
      window.location.href = "index.html";
    });
}


// =====================
// ADD TO CART (ADVANCED)
// =====================
function addToCart(product, qty = 1) {

  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  const existing = cart.find(item => item._id === product._id);

  if (existing) {
    existing.qty += qty;
  } else {
    cart.push({
      _id: product._id,
      name: product.name,
      price: product.price,
      images: product.images,
      qty: qty
    });
  }

  localStorage.setItem("cart", JSON.stringify(cart));

  updateCartCount();

  alert("Added to cart ✅");
}


// =====================
// CART COUNT UPDATE
// =====================
function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const total = cart.reduce((sum, item) => sum + item.qty, 0);

  const el = document.getElementById("cartCount");
  if (el) el.textContent = total;
}
// =====================
// RELATED PRODUCTS (DYNAMIC)
// =====================
fetch("http://localhost:5000/api/products")
  .then(res => res.json())
  .then(allProducts => {

    const related = allProducts.filter(p =>
      p._id !== product._id &&
      p.category === product.category
    );

    renderRelatedProducts(related.slice(0, 6));
  });