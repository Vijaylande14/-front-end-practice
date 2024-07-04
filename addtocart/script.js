var totalAmount = 0;

// Function to add items to the cart
function addToCart(itemName, itemPrice) {
    var cartItems = document.getElementById('cartItems');
    var li = document.createElement('li');
    li.textContent = itemName + ' - ₹' + itemPrice.toFixed(2);
    cartItems.appendChild(li);

    totalAmount += itemPrice;
    updateCartTotal();

    // Show slide-in notification with total amount
    showNotification('Total: ₹' + totalAmount.toFixed(2));
}

// Function to update cart total dynamically
function updateCartTotal() {
    var cartTotal = document.getElementById('cartTotal');
    cartTotal.textContent = 'Total: ₹' + totalAmount.toFixed(2);
}

// Function to show slide-in notification
function showNotification(message) {
    var notification = document.getElementById('totalNotification');
    notification.textContent = message;
    notification.style.display = 'block';

    // Hide notification after 3 seconds
    setTimeout(function() {
        notification.style.display = 'none';
    }, 3000);
}
