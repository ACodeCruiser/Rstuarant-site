// Get the order from localStorage
let order = JSON.parse(localStorage.getItem('order')) || [];

// Select DOM elements
const orderList = document.getElementById('order-list');
const totalPriceEl = document.getElementById('total-price');
const clearCartBtn = document.getElementById('clear-cart');
const addItemBtn = document.getElementById('add-item'); // Button to add items (optional)

// Function to render the cart items
function renderCart() {
    orderList.innerHTML = ''; // Clear the list
    let totalPrice = 0;

    if (order.length === 0) {
        const emptyMessage = document.createElement('p');
        emptyMessage.textContent = 'Your cart is empty.';
        orderList.appendChild(emptyMessage);
    } else {
        order.forEach((item, index) => {
            const listItem = document.createElement('li');

            // Display item name and price
            listItem.innerHTML = `
                ${item.name} - $${item.price.toFixed(2)}
                <button class="remove-item" data-index="${index}">Remove</button>
            `;

            orderList.appendChild(listItem);
            totalPrice += item.price;
        });
    }

    // Update the total price
    totalPriceEl.textContent = `Total: $${totalPrice.toFixed(2)}`;
}

// Add functionality to remove an item
orderList.addEventListener('click', (event) => {
    if (event.target.classList.contains('remove-item')) {
        const index = event.target.dataset.index;
        order.splice(index, 1); // Remove item from the order array
        localStorage.setItem('order', JSON.stringify(order)); // Update localStorage
        renderCart(); // Re-render the cart
    }
});

// Add functionality to add an item (Optional - for demonstration)
addItemBtn.addEventListener('click', () => {
    const newItem = {
        name: prompt('Enter item name:'),
        price: parseFloat(prompt('Enter item price:'))
    };

    if (newItem.name && !isNaN(newItem.price)) {
        order.push(newItem); // Add the new item
        localStorage.setItem('order', JSON.stringify(order)); // Update localStorage
        renderCart(); // Re-render the cart
    } else {
        alert('Invalid input. Please enter valid name and price.');
    }
});

// Clear the cart
clearCartBtn.addEventListener('click', () => {
    localStorage.removeItem('order');
    order = []; // Clear the order array
    renderCart(); // Re-render the cart
});

// Initial render of the cart
renderCart();
