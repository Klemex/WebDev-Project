const productsData = {
    1: {
        name: "Fragment Design x Nike",
        brand: "Nike",
        category: "Men's Shoes",
        price: "₱4,600.00",
        color: "Black/Blue",
        description: "The Fragment Design x Nike collaboration brings together Hiroshi Fujiwara's minimalist aesthetic with Nike's innovative design. This exclusive sneaker features premium materials, iconic Fragment lightning bolt detailing, and superior comfort.",
        sizes: ["40", "41", "42", "43", "44", "45"],
        mainImage: "assets/shoes/2345715567bdafb7e54f11fcfa316ba8.jpg",
        additionalImages: [
            "assets/shoes/2345715567bdafb7e54f11fcfa316ba8.jpg",
            "assets/shoes/fragment_angle2.jpg",
            "assets/shoes/fragment_angle3.jpg",
            "assets/shoes/fragment_detail1.jpg"
        ],
        details: [
            "Premium leather upper",
            "Fragment Design signature lightning bolt logo",
            "Foam midsole for lightweight cushioning",
            "Rubber outsole for durability",
            "Collaboration between Fragment Design and Nike",
            "Limited Edition Release",
            "Style Code: DJ4692-400"
        ],
        releaseDate: "2023-08-15",
        technology: [
            "Nike Air cushioning",
            "Premium leather construction",
            "Custom Fragment Design elements"
        ],
        care: [
            "Wipe clean with a damp cloth",
            "Store in a cool, dry place",
            "Use shoe trees to maintain shape"
        ]
    }
};

// When the page loads
document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');
    const product = productsData[productId];

    if (!product) {
        console.error('Product not found');
        return;
    }

    // Update UI elements
    const elements = {
        title: document.querySelector('.product-title'),
        price: document.querySelector('.product-price'),
        image: document.querySelector('.main-image img'),
        description: document.querySelector('.product-description'),
        breadcrumb: document.querySelector('.breadcrumb span'),
        sizeContainer: document.querySelector('.sizes')
    };
    updateProductUI(product, elements);
    setupEventListeners(product, elements);
});

// Update UI with product data
function updateProductUI(product, elements) {
    elements.title.textContent = product.name;
    elements.price.textContent = `₱${product.price}`;
    elements.description.textContent = product.description;
    elements.breadcrumb.textContent = product.name;
    elements.image.src = product.mainImage;
    elements.image.alt = product.name;
    updateSizeOptions(product.sizes, elements.sizeContainer);
}

// Update size options
function updateSizeOptions(sizes, container) {
    container.innerHTML = sizes.map(size => `
        <label class="size-option">
            <input type="radio" name="size" value="${size}">
            <span class="size-label">${size}</span>
        </label>
    `).join('');
}

// Add event listeners for "Add to Cart" and "Add to Wishlist"
function setupEventListeners(product, elements) {
    const addToCartBtn = document.querySelector('.add-to-cart');
    const wishlistBtn = document.querySelector('.add-to-wishlist');

    addToCartBtn.addEventListener('click', () => handleAddToCart(product));
    wishlistBtn.addEventListener('click', () => handleFavoriteClick(product));
}

// Handle adding product to the cart
function handleAddToCart(product) {
    const selectedSize = document.querySelector('input[name="size"]:checked');
    if (!selectedSize) {
        alert('Please select a size');
        return;
    }
    const quantity = parseInt(document.querySelector('.quantity-selector input').value);

    const cartItem = {
        id: product.id,
        name: product.name,
        size: selectedSize.value,
        price: product.price,
        quantity: quantity
    };

    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.push(cartItem);
    localStorage.setItem('cart', JSON.stringify(cart));

    console.log(`Added ${quantity} of ${product.name}, size ${selectedSize.value} to cart.`);
    alert(`${product.name} added to cart`);
}

// Handle adding product to favorites
function handleFavoriteClick(product) {
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    if (!favorites.some(fav => fav.id === product.id)) {
        favorites.push(product);
        localStorage.setItem('favorites', JSON.stringify(favorites));
        alert(`${product.name} added to favorites!`);
    } else {
        alert(`${product.name} is already in your favorites.`);
    }
}
