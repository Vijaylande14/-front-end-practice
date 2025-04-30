const groceries = [
    { id: 1, name: "Apples", price: 30 },
    { id: 2, name: "Bananas", price: 10 },
    { id: 3, name: "Tomatoes", price: 25 },
    { id: 4, name: "Potatoes", price: 20 }
  ];
  
  let cart = [];
  
  const itemsContainer = document.getElementById("items");
  const cartItemsContainer = document.getElementById("cart-items");
  const totalElement = document.getElementById("total");
  
  function renderItems() {
    itemsContainer.innerHTML = "";
    groceries.forEach(item => {
      const itemDiv = document.createElement("div");
      itemDiv.className = "item";
      itemDiv.innerHTML = `
        <h3>${item.name}</h3>
        <p>Price: ₹${item.price}</p>
        <button onclick="addToCart(${item.id})">Add to Cart</button>
      `;
      itemsContainer.appendChild(itemDiv);
    });
  }
  
  function addToCart(id) {
    const found = cart.find(item => item.id === id);
    if (found) {
      found.quantity++;
    } else {
      const item = groceries.find(i => i.id === id);
      cart.push({ ...item, quantity: 1 });
    }
    renderCart();
  }
  
  function removeFromCart(id) {
    cart = cart.filter(item => item.id !== id);
    renderCart();
  }
  
  function renderCart() {
    cartItemsContainer.innerHTML = "";
    let total = 0;
    cart.forEach(item => {
      total += item.price * item.quantity;
      const cartDiv = document.createElement("div");
      cartDiv.className = "cart-item";
      cartDiv.innerHTML = `
        <strong>${item.name}</strong><br>
        Quantity: ${item.quantity}<br>
        ₹${item.price} × ${item.quantity} = ₹${item.price * item.quantity}
        <br><button class="remove" onclick="removeFromCart(${item.id})">Remove</button>
      `;
      cartItemsContainer.appendChild(cartDiv);
    });
    totalElement.textContent = total;
  }
  
  renderItems();
  