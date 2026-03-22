const cartContainer = document.getElementById("cartItems");
const totalPriceEl = document.getElementById("totalPrice");

function loadCart() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  cartContainer.innerHTML = "";

  let total = 0;

  cart.forEach(item => {
    total += item.price * item.qty;

    const div = document.createElement("div");

    div.innerHTML = `
      <img src="${item.images?.[0] || './images/no-image.png'}" width="80">
      <h3>${item.name}</h3>
      <p>₹${item.price}</p>

      <button onclick="changeQty('${item._id}', -1)">-</button>
      ${item.qty}
      <button onclick="changeQty('${item._id}', 1)">+</button>

      <button onclick="removeItem('${item._id}')">Remove</button>
      <hr>
    `;

    cartContainer.appendChild(div);
  });

  totalPriceEl.innerText = "Total: ₹" + total;
}

function changeQty(id, change) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  cart = cart.map(item => {
    if (item._id === id) {
      item.qty += change;
      if (item.qty < 1) item.qty = 1;
    }
    return item;
  });

  localStorage.setItem("cart", JSON.stringify(cart));
  loadCart();
}

function removeItem(id) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  cart = cart.filter(item => item._id !== id);

  localStorage.setItem("cart", JSON.stringify(cart));
  loadCart();
}

loadCart();