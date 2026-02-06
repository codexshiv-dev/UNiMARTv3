// =====================

// GET URL PARAMS

// =====================

const params = new URLSearchParams(window.location.search);

const name = params.get("name");

const price = params.get("price");

const desc = params.get("desc");

const img = params.get("img");

// If no product data → go back home

if (!name || !price || !img) {

alert("No product data found. Please go back to shop.");

window.location.href = "index.html";

}

// =====================

// MULTIPLE IMAGES (FAKE FOR NOW)

// =====================

const images = [img, img, img];

// =====================

// SET PRODUCT DATA

// =====================

document.getElementById("productName").textContent = name;

document.getElementById("productPrice").textContent = "Rs. " + price;

document.getElementById("oldPrice").textContent = "Rs. " + (price * 1.3).toFixed(0);

document.getElementById("discount").textContent = "30% OFF";

document.getElementById("productDesc").textContent = desc;

// =====================

// MAIN IMAGE & THUMBNAILS

// =====================

const mainImg = document.getElementById("mainImg");

const thumbs = document.getElementById("thumbs");

mainImg.src = images[0];

images.forEach(src => {

const t = document.createElement("img");

t.src = src;

t.onclick = () => mainImg.src = src;

thumbs.appendChild(t);

});

// =====================

// WHATSAPP BUTTON

// =====================

const message = `Hello Unimart Team 👋

I want to order:

Product: ${name}

Price: Rs.${price}`;

document.getElementById("whatsappBtn").href =

`https://wa.me/9779700013011?text=${encodeURIComponent(message)}`;

// =====================

// SHARE BUTTON (ONLY ONCE)

// =====================

const shareBtn = document.getElementById("shareBtn");

shareBtn.onclick = () => {

const shareData = {

title: name,

text: `Check this product: ${name}`,

url: window.location.href

};

if (navigator.share) {

navigator.share(shareData);

} else {

navigator.clipboard.writeText(window.location.href);

alert("Product link copied!");

}

};

// =====================

// RELATED PRODUCTS

// =====================

// document.getElementById("shareBtn").onclick = () => {

//   if (navigator.share) {

//     navigator.share({

//       title: name,

//       text: "Check this product",

//       url: window.location.href

//     });

//   } else {

//     navigator.clipboard.writeText(window.location.href);

//     alert("Link copied!");

//   }

// };

// --------------------

// RELATED PRODUCTS

// --------------------

const relatedProducts = [

{ name: "Smart Watch", price: 2500, desc: "Bluetooth smart watch", img: "/images/img1.jpeg" },

{ name: "Moon Lamp", price: 699, desc: "3D moon night lamp", img: "/images/img2.jpeg" },

{ name: "Mini Projector", price: 3500, desc: "HD mini projector", img: "/images/img3.jpeg" }

];

const relatedDiv = document.getElementById("relatedProducts");

relatedProducts.forEach(p => {

const card = document.createElement("article");

div.className = "product-card";

card.innerHTML = `

<div class="product-img">

<img src="${p.img}" alt="${p.name}">

</div>

<div class="product-info">

<h3>${p.name}</h3>

<p>Rs.${p.price}</p>

</div>

`;

// make related product clickable

card.onclick = () => {

const url = `product.html?name=${encodeURIComponent(p.name)}

&price=${encodeURIComponent(p.price)}

&desc=${encodeURIComponent(p.desc)}

&img=${encodeURIComponent(p.img)}`;

window.location.href = url;

};

relatedDiv.appendChild(card);

});

function openRelatedProduct(p) {

const url = `product.html?name=${encodeURIComponent(p.name)}

&price=${encodeURIComponent(p.price)}

&desc=${encodeURIComponent(p.desc)}

&img=${encodeURIComponent(p.img)}`;

window.location.href = url;

}

//for share link

const shareBtn = document.getElementById("shareBtn");

shareBtn.addEventListener("click", () => {

const shareData = {

title: document.getElementById("productName").textContent,

text: "Check this product on UNIMART",

url: window.location.href

};

if (navigator.share) {

navigator.share(shareData);

} else {

navigator.clipboard.writeText(window.location.href);

alert("Product link copied!");

}

});