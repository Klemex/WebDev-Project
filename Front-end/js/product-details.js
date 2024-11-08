let currentProduct = null;

document.addEventListener('DOMContentLoaded', function() {
    console.log('Page loaded');
    
    // Get URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');
    console.log('Product ID:', productId);

    // Get DOM elements
    const elements = {
        title: document.querySelector('.product-title'),
        price: document.querySelector('.product-price'),
        image: document.querySelector('.main-image img'),
        description: document.querySelector('.product-description'),
        breadcrumb: document.querySelector('.breadcrumb span'),
        sizeContainer: document.querySelector('.sizes'),
        addToCartBtn: document.querySelector('.add-to-cart'),
        wishlistBtn: document.querySelector('.add-to-wishlist'),
        quantityInput: document.querySelector('.quantity-selector input')
    };

    // Load product data
    const product = productsData[productId];
    console.log('Product data:', product);

    if (!product) {
        console.error('Product not found');
        return;
    }

    // Store current product globally
    currentProduct = product;
    
    // Update UI with product data
    updateProductUI(product, elements);
    setupEventListeners(elements);
});

function updateProductUI(product, elements) {
    // Update text content
    elements.title.textContent = product.name;
    elements.price.textContent = formatPrice(product.price);
    elements.description.textContent = product.description;
    elements.breadcrumb.textContent = product.name;

    // Update image
    const imagePath = getImagePath(product.mainImage);
    elements.image.src = imagePath;
    elements.image.alt = product.name;
    setupImageHandling(elements.image, imagePath);

    // Update size options with stock status
    updateSizeOptions(product.sizes, elements.sizeContainer);
    
    // Update favorite button state
    updateFavoriteButtonState(product.id);
}

function setupEventListeners(elements) {
    // Quantity selector
    const minusBtn = document.querySelector('.minus');
    const plusBtn = document.querySelector('.plus');

    minusBtn.addEventListener('click', () => updateQuantity(-1, elements.quantityInput));
    plusBtn.addEventListener('click', () => updateQuantity(1, elements.quantityInput));

    // Add to cart
    elements.addToCartBtn.addEventListener('click', handleAddToCart);

    // Add to wishlist
    elements.wishlistBtn.addEventListener('click', () => handleFavoriteClick(currentProduct));
}

function handleFavoriteClick(product) {
    const favoriteBtn = document.getElementById('favoriteBtn');
    
    if (!isProductInFavorites(product.id)) {
        // Add to favorites
        if (addToFavorites(product)) {
            favoriteBtn.classList.add('active');
            favoriteBtn.querySelector('i').style.color = 'red';
            showNotification('Product added to favorites!');
        }
    } else {
        // Remove from favorites
        removeFromFavorites(product.id);
        favoriteBtn.classList.remove('active');
        favoriteBtn.querySelector('i').style.color = '';
        showNotification('Product removed from favorites!');
    }
}

function updateFavoriteButtonState(productId) {
    const favoriteBtn = document.getElementById('favoriteBtn');
    if (isProductInFavorites(productId)) {
        favoriteBtn.classList.add('active');
        favoriteBtn.querySelector('i').style.color = 'red';
    } else {
        favoriteBtn.classList.remove('active');
        favoriteBtn.querySelector('i').style.color = '';
    }
}

function updateQuantity(change, input) {
    const currentValue = parseInt(input.value);
    const newValue = currentValue + change;
    if (newValue >= 1) {
        input.value = newValue;
    }
}

function formatPrice(price) {
    return `₱${price.toLocaleString()}.00`;
}

function getImagePath(imagePath) {
    return !imagePath.startsWith('/') && !imagePath.startsWith('../') 
        ? '../' + imagePath 
        : imagePath;
}

function setupImageHandling(imageElement, imagePath) {
    imageElement.onerror = function() {
        console.error('Image failed to load:', imagePath);
        this.src = '../Pictures/placeholder.jpg';
    };
}

function updateSizeOptions(sizes, container) {
    container.innerHTML = sizes.map(size => `
        <label class="size-option">
            <input type="radio" name="size" value="${size}">
            <span class="size-label">${size}</span>
        </label>
    `).join('');
}

function handleAddToCart() {
    const selectedSize = document.querySelector('input[name="size"]:checked');
    if (!selectedSize) {
        alert('Please select a size');
        return;
    }

    const quantity = parseInt(document.querySelector('.quantity-selector input').value);
    
    StorageUtils.addToCart(currentProduct, selectedSize.value, quantity);
    showNotification('Product added to cart successfully!');
}

function showNotification(message) {
    // Create notification element if it doesn't exist
    let notification = document.querySelector('.notification');
    if (!notification) {
        notification = document.createElement('div');
        notification.className = 'notification';
        document.body.appendChild(notification);
    }

    // Show message
    notification.textContent = message;
    notification.classList.add('show');

    // Hide after 3 seconds
    setTimeout(() => {
        notification.classList.remove('show');
    }, 3000);
} 