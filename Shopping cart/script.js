const products = [
  {
    id: 1,
    title: 'Black-Shirt',
    price: 1499,
    image: 'images/image1.jpg' // Adjust path as per your folder structure
  },
  {
    id: 2,
    title: 'Half Shirt',
    price: 799,
    image: 'images/image2.jpg' // Adjust path as per your folder structure
  },
  {
    id: 3,
    title: 'printed shirt',
    price: 999,
    image: 'images/image3.jpg' // Adjust path as per your folder structure
  },
  {
    id: 4,
    title: 'white shirt',
    price: 1299,
    image: 'images/image4.jpg' // Adjust path as per your folder structure
  },
  {
    id: 5,
    title: 'full shirt',
    price: 899,
    image: 'images/image5.jpg' // Adjust path as per your folder structure
  }
];

function renderProducts() {
  const list = document.getElementById('product-list');
  list.innerHTML = '';
  products.forEach(product => {
    list.innerHTML += `
      <div class="col-md-4">
        <div class="product">
          <img src="${product.image}" alt="${product.title}" class="img-fluid" />
          <div class="product-title">${product.title}</div>
          <p>Price: Rs ${product.price}</p>
          <button class="btn btn-outline-primary" onclick="addToCart(${product.id})">Add to Cart</button>
        </div>
      </div>
    `;
  });
}

function addToCart(id) {
  const product = products.find(p => p.id === id);
  cart.push(product);
  updateCart();
  alert('Added to Cart');
}

function updateCart() {
  document.getElementById('cart-count').textContent = cart.length;
  const section = document.getElementById('checkout-section');
  const list = document.getElementById('cart-items');
  let total = 0;
  list.innerHTML = '';
  cart.forEach((item, index) => {
    total += item.price;
    list.innerHTML += `
      <li class="list-group-item d-flex justify-content-between align-items-center">
        ${item.title} - Rs ${item.price}
        <button class="btn btn-sm btn-danger" onclick="removeFromCart(${index})">Remove</button>
      </li>
    `;
  });
  document.getElementById('total-price').textContent = total;
  section.style.display = 'block';
}

function removeFromCart(index) {
  cart.splice(index, 1);
  updateCart();
}

function viewCart() {
  updateCart();
}

let cart = [];
renderProducts();
