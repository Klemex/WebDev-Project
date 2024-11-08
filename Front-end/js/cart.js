// Cart functionality
class Cart {
    constructor() {
        this.items = this.getCartFromStorage() || [];
        this.renderCart();
        this.attachEventListeners();
    }

    getCartFromStorage() {
        return JSON.parse(localStorage.getItem('cart')) || [];
    }

    saveCartToStorage() {
        localStorage.setItem('cart', JSON.stringify(this.items));
    }

    addItem(product) {
        const existingItem = this.items.find(item => 
            item.id === product.id && item.selectedSize === product.selectedSize
        );

        if (existingItem) {
            existingItem.quantity += product.quantity;
        } else {
            this.items.push(product);
        }

        this.saveCartToStorage();
        this.renderCart();
    }

    removeItem(productId, size) {
        this.items = this.items.filter(item => 
            !(item.id === productId && item.selectedSize === size)
        );
        this.saveCartToStorage();
        this.renderCart();
    }

    updateQuantity(productId, size, newQuantity) {
        const item = this.items.find(item => 
            item.id === productId && item.selectedSize === size
        );
        if (item) {
            item.quantity = Math.max(1, newQuantity);
            this.saveCartToStorage();
            this.renderCart();
        }
    }

    calculateTotal() {
        return this.items.reduce((total, item) => {
            return total + (item.price * item.quantity);
        }, 0);
    }

    renderCart() {
        const cartItemsContainer = document.querySelector('.cart-items');
        if (!cartItemsContainer) return;

        cartItemsContainer.innerHTML = '';
        
        if (this.items.length === 0) {
            cartItemsContainer.innerHTML = '<p class="empty-cart">Your cart is empty</p>';
            this.updateSummary(0);
            return;
        }

        this.items.forEach(item => {
            const cartItemHTML = `
                <div class="cart-item" data-id="${item.id}" data-size="${item.selectedSize}">
                    <img src="${item.image}" alt="${item.name}" class="cart-item-image">
                    <div class="cart-item-details">
                        <h3>${item.name}</h3>
                        <p class="item-category">${item.category}</p>
                        <p class="item-size">Size: ${item.selectedSize}</p>
                        <div class="quantity-controls">
                            <button class="quantity-btn minus">-</button>
                            <input type="number" value="${item.quantity}" min="1" class="quantity-input">
                            <button class="quantity-btn plus">+</button>
                        </div>
                    </div>
                    <div class="cart-item-price">
                        <p class="price">₱${item.price.toFixed(2)}</p>
                        <button class="remove-item"><i class="fas fa-trash"></i> Remove</button>
                    </div>
                </div>
            `;
            cartItemsContainer.insertAdjacentHTML('beforeend', cartItemHTML);
        });

        this.updateSummary(this.calculateTotal());
    }

    updateSummary(subtotal) {
        const summaryContainer = document.querySelector('.cart-summary');
        if (!summaryContainer) return;

        const shipping = subtotal >= 3000 ? 0 : 10;
        const total = subtotal + shipping;

        const summaryHTML = `
            <h2>Order Summary</h2>
            <div class="summary-item">
                <span>Subtotal</span>
                <span>₱${subtotal.toFixed(2)}</span>
            </div>
            <div class="summary-item">
                <span>Shipping</span>
                <span>₱${shipping.toFixed(2)}</span>
            </div>
            <div class="summary-item total">
                <span>Total</span>
                <span>₱${total.toFixed(2)}</span>
            </div>
            <button class="checkout-btn">Proceed to Checkout</button>
        `;

        summaryContainer.innerHTML = summaryHTML;
    }

    attachEventListeners() {
        const cartItemsContainer = document.querySelector('.cart-items');
        if (!cartItemsContainer) return;

        cartItemsContainer.addEventListener('click', (e) => {
            const cartItem = e.target.closest('.cart-item');
            if (!cartItem) return;

            const productId = parseInt(cartItem.dataset.id);
            const size = cartItem.dataset.size;

            if (e.target.classList.contains('minus')) {
                const input = cartItem.querySelector('.quantity-input');
                this.updateQuantity(productId, size, parseInt(input.value) - 1);
            }
            else if (e.target.classList.contains('plus')) {
                const input = cartItem.querySelector('.quantity-input');
                this.updateQuantity(productId, size, parseInt(input.value) + 1);
            }
            else if (e.target.classList.contains('remove-item') || e.target.closest('.remove-item')) {
                this.removeItem(productId, size);
            }
        });

        cartItemsContainer.addEventListener('change', (e) => {
            if (e.target.classList.contains('quantity-input')) {
                const cartItem = e.target.closest('.cart-item');
                const productId = parseInt(cartItem.dataset.id);
                const size = cartItem.dataset.size;
                this.updateQuantity(productId, size, parseInt(e.target.value));
            }
        });
    }
}

// Initialize cart when the page loads
document.addEventListener('DOMContentLoaded', () => {
    window.cart = new Cart();
}); 