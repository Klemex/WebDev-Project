const productsData = {
    1: {
        name: "Fragment Design x Nike",
        brand: "Nike",
        category: "Men's Shoes",
        price: "₱4,600.00",
        color: "Black/Blue",
        description: "The Fragment Design x Nike collaboration brings together Hiroshi Fujiwara's minimalist aesthetic with Nike's innovative design. This exclusive sneaker features premium materials, iconic Fragment lightning bolt detailing, and superior comfort.",
        sizes: ["40", "41", "42", "43", "44", "45"],
        mainImage: "assets/2345715567bdafb7e54f11fcfa316ba8.jpg",
        additionalImages: [
            "assets/2345715567bdafb7e54f11fcfa316ba8.jpg",
            "assets/fragment_angle2.jpg",
            "assets/fragment_angle3.jpg",
            "assets/fragment_detail1.jpg"
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
    },
    2: {
        name: "Travis Scott x Nike Air",
        brand: "Nike",
        category: "Men's Shoes",
        price: "₱1,240.00",
        color: "Brown/White",
        description: "The Travis Scott x Nike collaboration features a unique reverse swoosh design, premium suede materials, and exclusive Travis Scott branding. This highly sought-after sneaker combines street style with premium craftsmanship.",
        sizes: ["40", "41", "42", "43", "44", "45"],
        mainImage: "assets/7857e1fc08bb25f8706c3ae245568f7b.jpg",
        additionalImages: [
            "assets/7857e1fc08bb25f8706c3ae245568f7b.jpg",
            "assets/travis_angle2.jpg",
            "assets/travis_angle3.jpg",
            "assets/travis_detail1.jpg"
        ],
        details: [
            "Premium suede upper",
            "Reverse swoosh design",
            "Travis Scott signature branding",
            "Hidden stash pocket",
            "Cactus Jack logo",
            "Limited Edition Release",
            "Style Code: CT5053-001"
        ],
        releaseDate: "2023-09-01",
        technology: [
            "Nike Air cushioning",
            "Premium suede construction",
            "Custom Travis Scott elements"
        ],
        care: [
            "Use suede brush for cleaning",
            "Apply suede protector before wear",
            "Store away from direct sunlight"
        ]
    },
    3: {
        name: "Yeezy Boost 350 V2",
        brand: "Adidas",
        category: "Unisex Shoes",
        price: "₱5,000.00",
        color: "Cream White",
        description: "Designed by Kanye West, the Yeezy Boost 350 V2 Cream White stands out for its minimalist aesthetic and innovative features. It includes Adidas' Boost technology for ultimate comfort and performance.",
        sizes: ["36", "37", "38", "39", "40", "41", "42", "43", "44"],
        mainImage: "assets/yeezy_cream_main.jpg",
        additionalImages: [
            "assets/yeezy_cream_main.jpg",
            "assets/yeezy_cream_angle2.jpg",
            "assets/yeezy_cream_angle3.jpg"
        ],
        details: [
            "Primeknit upper",
            "Boost midsole",
            "TPU sidewalls for stability",
            "Rubber outsole for traction",
            "Minimalist design by Kanye West",
            "Style Code: CP9366"
        ],
        releaseDate: "2023-05-21",
        technology: [
            "Adidas Boost cushioning",
            "Lightweight Primeknit construction"
        ],
        care: [
            "Hand wash with mild detergent",
            "Air dry away from heat",
            "Avoid contact with sharp objects"
        ]
    }
};



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
    setupEventListeners(elements);
});

function updateProductUI(product, elements) {
    elements.title.textContent = product.name;
    elements.price.textContent = `₱${product.price.toLocaleString()}.00`;
    elements.description.textContent = product.description;
    elements.breadcrumb.textContent = product.name;
    elements.image.src = getImagePath(product.mainImage);
    elements.image.alt = product.name;
    updateSizeOptions(product.sizes, elements.sizeContainer);
}

function getImagePath(imagePath) {
    return !imagePath.startsWith('/') && !imagePath.startsWith('../') 
        ? '../' + imagePath 
        : imagePath;
}

function setupEventListeners(elements) {
    // Add to cart button
    const addToCartBtn = document.querySelector('.add-to-cart');
    addToCartBtn.addEventListener('click', () => handleAddToCart(product, elements));

    // Wishlist button
    const wishlistBtn = document.querySelector('.add-to-wishlist');
    wishlistBtn.addEventListener('click', () => handleFavoriteClick(product));
}

function handleAddToCart(product, elements) {
    const selectedSize = document.querySelector('input[name="size"]:checked');
    if (!selectedSize) {
        alert('Please select a size');
        return;
    }
    const quantity = parseInt(document.querySelector('.quantity-selector input').value);
    console.log(`Added ${quantity} of ${product.name}, size ${selectedSize.value} to cart.`);
}

function handleFavoriteClick(product) {
    console.log(`${product.name} added to favorites!`);
}

function updateSizeOptions(sizes, container) {
    container.innerHTML = sizes.map(size => `
        <label class="size-option">
            <input type="radio" name="size" value="${size}">
            <span class="size-label">${size}</span>
        </label>
    `).join('');
}
