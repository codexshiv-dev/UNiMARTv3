const params = new URLSearchParams(window.location.search);

const name = params.get("name");
const price = params.get("price");
const desc = params.get("desc");
const img = params.get("img");

document.getElementById("productName").textContent = name;
document.getElementById("productPrice").textContent = "Rs. " + price;
document.getElementById("productDesc").textContent = desc;
document.getElementById("productImg").src = img;

// WhatsApp message
const message = `Hello Unimart Team 👋
I want to order:
Product: ${name}
Price: Rs.${price}`;

document.getElementById("whatsappBtn").href =
  `https://wa.me/9779700013011?text=${encodeURIComponent(message)}`;


// Related products
const relatedProducts = [
  { name: "Smart Watch", price: 2500, img: "images/watch.jpg" },
  { name: "Moon Lamp", price: 699, img: "images/lamp.jpg" },
  { name: "Mini Projector", price: 3500, img: "images/projector.jpg" }
];

const relatedDiv = document.getElementById("relatedProducts");

relatedProducts.forEach(p => {
  const div = document.createElement("article");
  div.className = "product-card";
  div.innerHTML = `
    <img src="${p.img}">
    <h3>${p.name}</h3>
    <p>Rs.${p.price}</p>
  `;
  relatedDiv.appendChild(div);
});
