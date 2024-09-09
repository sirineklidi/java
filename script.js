document.addEventListener('DOMContentLoaded', () => {
    const cartItems = [
        { id: 1, name: 'Item 1', price: 10.00, quantity: 1 },
        { id: 2, name: 'Item 2', price: 20.00, quantity: 2 },
        { id: 3, name: 'Item 3', price: 30.00, quantity: 1 }
    ];

    const cartElement = document.getElementById('cart-items');
    const totalPriceElement = document.getElementById('total-price');

    function renderCart() {
        cartElement.innerHTML = '';
        let totalPrice = 0;

        cartItems.forEach(item => {
            const itemTotal = item.price * item.quantity;
            totalPrice += itemTotal;

            const cartItemElement = document.createElement('li');
            cartItemElement.innerHTML = `
                <div class="item">
                    ${item.name} - $${item.price.toFixed(2)}
                </div>
                <div class="quantity">
                    <button class="decrease" data-id="${item.id}">-</button>
                    <span>${item.quantity}</span>
                    <button class="increase" data-id="${item.id}">+</button>
                </div>
                <div class="like" data-id="${item.id}">&#9825;</div>
                <div class="delete" data-id="${item.id}">&times;</div>
            `;

            cartElement.appendChild(cartItemElement);
        });

        totalPriceElement.textContent = totalPrice.toFixed(2);
    }

    function handleCartActions(event) {
        const button = event.target;
        const id = parseInt(button.getAttribute('data-id'));

        if (button.classList.contains('decrease')) {
            const item = cartItems.find(item => item.id === id);
            if (item && item.quantity > 1) {
                item.quantity--;
            }
        } else if (button.classList.contains('increase')) {
            const item = cartItems.find(item => item.id === id);
            if (item) {
                item.quantity++;
            }
        } else if (button.classList.contains('delete')) {
            const index = cartItems.findIndex(item => item.id === id);
            if (index > -1) {
                cartItems.splice(index, 1);
            }
        } else if (button.classList.contains('like')) {
            button.classList.toggle('liked');
        }

        renderCart();
    }

    document.getElementById('cart-items').addEventListener('click', handleCartActions);

    renderCart();
});
