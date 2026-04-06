// =====================
// INITIALIZATION
// =====================
document.addEventListener("DOMContentLoaded", () => {
    renderCheckoutSummary();
});


// Helper for formatting currency (Must match your cart.js)
function formatINR(amount) {
    return amount.toLocaleString('en-IN', {
        maximumFractionDigits: 0,
        style: 'currency',
        currency: 'INR',
    });
}

// Helper to get cart safely if cart.js isn't linked
function getCartData() {
    return JSON.parse(localStorage.getItem("cart")) || [];
}

// =====================
// RENDER SUMMARY
// =====================
function renderCheckoutSummary() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const summaryEl = document.getElementById("priceSummary");
    
    if (!summaryEl) return;

    if (cart.length === 0) {
        summaryEl.innerHTML = `
            
            <div class="empty-cart-msg">
              <span class="icon">🛒</span>
              <h3>Your cart is empty!</h3>
              <p>Looks like you haven't added anything yet.</p>
              <a href="../index.html" class="shop-now-btn">Go Back to Shop</a>
            </div>
          `;
        return;
    }
   

    let subtotal = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
    let delivery = subtotal > 500 ? 0 : 40;
    let grandTotal = subtotal + delivery;

    summaryEl.innerHTML = `
        <div class="price-row">
            <span>Price (${cart.length} items)</span>
            <span>${formatINR(subtotal)}</span>
        </div>
        <div class="price-row">
            <span>Delivery Charges</span>
            <span class="${delivery === 0 ? 'free-text' : ''}" style="color: ${delivery === 0 ? '#388e3c' : '#212121'}">
                ${delivery === 0 ? "FREE" : formatINR(delivery)}
            </span>
        </div>
        <hr style="border:0; border-top: 1px dashed #e0e0e0; margin: 15px 0;">
        <div class="price-row total" style="font-size: 1.2rem; font-weight: bold;">
            <span>Total Amount</span>
            <span>${formatINR(grandTotal)}</span>
        </div>
        ${delivery === 0 ? `<p style="color: #388e3c; font-weight: 600; margin-top: 10px;">You saved ₹40 on this order!</p>` : ''}
    `;
}


// =====================
// CHECKOUT
// =====================
function handleCheckout() {
  const nameInput = document.getElementById("userName");
  const addressInput = document.getElementById("userAddress");
  const shippingForm = document.getElementById("shippingForm");
  
 
  // Validation for Inputs
  const name = nameInput ? nameInput.value.trim() : "";
  const address = addressInput ? addressInput.value.trim() : "";

  if (!name || !address) {
    alert("Please enter your name and address for delivery! 🚚");
    if (shippingForm) {
      shippingForm.scrollIntoView({ behavior: 'smooth', block: 'center' });
      nameInput.style.border = "2px solid #fb641b";
      addressInput.style.border = "2px solid #fb641b";
      // Focus on the first empty field
      if (!name) nameInput.focus();
      else addressInput.focus();
    }
    return;
  }
  
  
    // Payment Method Selection
    const paymentEl = document.querySelector('input[name="payment"]:checked');
    const selectedPayment = paymentEl ? paymentEl.value : "whatsapp";

  if (selectedPayment === "esewa") {
    alert("eSewa payment is being integrated! Please use WhatsApp for now. 🙏");
    return;
  }

  // --- NEW: SHOW THANK YOU OVERLAY ---
  const overlay = document.getElementById("orderOverlay");
  if (overlay) overlay.style.display = "flex";

  // WHATSAPP ORDER LOGIC
  const cart = getCart();
  if (cart.length === 0) {
    alert("Your cart is empty!");
    if (overlay) overlay.style.display = "none";
    return;
  }


  let subtotal = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
  let delivery = subtotal > 500 ? 0 : 40;
  let total = subtotal + delivery;

  // ---  MESSAGE ---
  let message = `*✨ NEW ORDER RECEIVED ✨*\n`;
  message += `--------------------------\n`;
  message += `👤 *Customer:* ${name}\n`;
  message += `📍 *Address:* ${address}\n`;
  message += `💳 *Payment:* WhatsApp (Manual)\n`;
  message += `--------------------------\n\n`;
  message += `*📦 ITEMS ORDERED:* \n\n`;
  cart.forEach((item, index) => {
    message += `*${index + 1}. ${item.name}*\n`;
    message += `🆔 ID: _${item._id || 'N/A'}_\n`; // Helps seller identify unique product
    message += `🔢 Qty: ${item.qty} x ${formatINR(item.price)}\n`;
    
    // Updated link to your live vercel app
    const productLink = `https://unimart-ecommerce.vercel.app/product.html?id=${item._id}`;
    message += `🔗 View: ${productLink}\n`;
    message += `--------------------------\n`;
  });


  message += `\n*💰 BILLING SUMMARY*\n`;
  message += `💰 *Subtotal:* ${formatINR(subtotal)}\n`;
  message += `🚚 *Delivery:* ${delivery === 0 ? ' ✅ FREE' : formatINR(delivery)}\n`;
  message += `✅ *TOTAL AMOUNT:* ${formatINR(total)}\n`;
  message += `--------------------------\n`;
  message += `_Please confirm my order!_`;

  const phone = "919170570583"; 
  const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;

  // Wait 2 seconds so the user sees the "Processing" screen, then redirect
  setTimeout(() => {
    
    //Clear the cart after redirecting
    localStorage.removeItem("cart");
    // location.reload(); 
    if (window.updateCartCount) window.updateCartCount();
     window.location.href = url;
    if (overlay) overlay.style.display = "none";
  }, 2000);

}