const points = {
  menu: document.querySelectorAll(".menu"),
};

document.addEventListener("DOMContentLoaded", () => {
  // 1. Used # for ID selection
  const contact = document.querySelector("#contactuss");
  const footer = document.querySelector("#footer");
  const cart = document.querySelector("#cart");
  const cartcontainer = document.querySelector(".cartcontainer");
  const close= document.querySelector(".close");
  const m = document.querySelector(".menu");
  const s = document.querySelector(".shop");
  const foodsection = document.querySelector(".foodsection");

  // 2. Verified elements exist before adding the listener
  if (contact && footer) {
    contact.addEventListener("click", () => {
      footer.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    });
  }

     if (m && foodsection ) {
    m.addEventListener("click", () => {
      foodsection.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    });

  }
   if (s && foodsection ) {
    s.addEventListener("click", () => {
      foodsection.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    });

  }

  // cart conatiner
  cart.addEventListener("click", (e) => {
   
 cartcontainer.classList.toggle("open");
 
 
  });
  close.addEventListener("click",(e) => {
    e.stopPropagation();
    cartcontainer.classList.remove("open");
  })
});
// data container

let cartData = [];
const cartItemsList = document.getElementById("cart-items-list");
const cartTotalPriceHTML = document.getElementById("cart-total-price");

// Helper to format numbers nicely into Indian Rupees (en-IN format)
const rupeeFormatter = new Intl.NumberFormat('en-IN');

document.querySelectorAll(".addtocart").forEach(button => {
  button.addEventListener("click", (e) => {
    const id = e.target.getAttribute("data-id");
    const name = e.target.getAttribute("data-name");
    const price = parseFloat(e.target.getAttribute("data-price"));

    const existingItem = cartData.find(item => item.id === id);

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cartData.push({ id, name, price, quantity: 1 });
    }

    updateCartUI();
    cartcontainer.classList.add("open");
  });
});

function updateCartUI() {
  cartItemsList.innerHTML = "";
   cartItemsList.style.padding ="0";
  let total = 0;

  cartData.forEach(item => {
    const itemTotal = item.price * item.quantity;
    const li = document.createElement("li");
    li.style.display = "flex";
    li.style.width = "100%";
    li.style.justifyContent = "space-between";
    li.style.marginBottom = "1rem";
    
    // FIXED: Swapped $ for ₹ and applied the comma formatter
    li.innerHTML = `
      <span>${item.name} (x${item.quantity})</span>
      <span>₹${rupeeFormatter.format(itemTotal)}</span>
    `;
    
    cartItemsList.appendChild(li);
    total += itemTotal;
  });

  // FIXED: Updates final total using Indian commas layout
  cartTotalPriceHTML.textContent = rupeeFormatter.format(total);
}

 // api use 

 

  const  akey = '5XW4b2yyZUygQMYQ7GiFkH2vK8DOWpNnLOi9SvVjbcc';
 const skey = 'jyXkBExUQosJfT-Vnm3pQdCtSkvUTiARFkx9kyIzUOs';
  
fetch(`https://api.unsplash.com/search/photos?query=food&per_page=4&client_id=${akey}`)
 .then(response => {
    if (!response.ok) {
      throw new Error(`HTTP Error! Status: ${response.status}`);
    }
    return response.json();
  })
  .then(data => {
 document.getElementById("image").src  = data[0].urls.small;
    document.getElementById("image1").src = data[1].urls.small;
    document.getElementById("image2").src = data[2].urls.small;
    document.getElementById("image3").src = data[3].urls.small;
    console.log(data);
  })
  .catch(error => {
    console.error("Error loading image:", error);
  });