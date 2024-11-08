// Product database with detailed information for each shoe
const productsData = {
    1: {
        name: "Fragment Design x Nike",
        brand: "Nike",
        category: "Men's Shoes",
        price: "₱4,600.00",
        color: "Black/Blue",
        description: "The Fragment Design x Nike collaboration brings together Hiroshi Fujiwara's minimalist aesthetic with Nike's innovative design. This exclusive sneaker features premium materials, iconic Fragment lightning bolt detailing, and superior comfort.",
        sizes: ["40", "41", "42", "43", "44", "45"],
        mainImage: "Pictures/2345715567bdafb7e54f11fcfa316ba8.jpg",
        additionalImages: [
            "Pictures/2345715567bdafb7e54f11fcfa316ba8.jpg",
            "Pictures/fragment_angle2.jpg",
            "Pictures/fragment_angle3.jpg",
            "Pictures/fragment_detail1.jpg"
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
        mainImage: "Pictures/7857e1fc08bb25f8706c3ae245568f7b.jpg",
        additionalImages: [
            "Pictures/7857e1fc08bb25f8706c3ae245568f7b.jpg",
            "Pictures/travis_angle2.jpg",
            "Pictures/travis_angle3.jpg",
            "Pictures/travis_detail1.jpg"
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
    // Add more products with detailed information...
};

document.addEventListener('DOMContentLoaded', function() {
    // Get the product ID from URL
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');
    
    // Get the product data
    const product = productsData[productId];
    
    if (product) {
        // Update page title
        document.title = `${product.name} - Sole Haven`;
        
        // Update the product details in the page
        const productImage = document.querySelector('.product-image');
        const productName = document.querySelector('.product-title');
        const productDescription = document.querySelector('.product-description');
        const productPrice = document.querySelector('.product-price');
        const productBrand = document.querySelector('.product-brand');
        const productColor = document.querySelector('.product-color');
        const productCategory = document.querySelector('.product-category');
        const productDetails = document.querySelector('.product-details');
        const additionalImages = document.querySelector('.additional-images');

        if (productImage) productImage.src = product.mainImage;
        if (productName) productName.textContent = product.name;
        if (productDescription) productDescription.textContent = product.description;
        if (productPrice) productPrice.textContent = product.price;
        if (productBrand) productBrand.textContent = product.brand;
        if (productColor) productColor.textContent = product.color;
        if (productCategory) productCategory.textContent = product.category;

        // Add additional images
        if (additionalImages && product.additionalImages) {
            product.additionalImages.forEach(imgSrc => {
                const img = document.createElement('img');
                img.src = imgSrc;
                img.className = 'thumbnail';
                img.alt = `${product.name} view`;
                img.addEventListener('click', () => {
                    productImage.src = imgSrc;
                });
                additionalImages.appendChild(img);
            });
        }

        // Add product details
        if (productDetails && product.details) {
            const ul = document.createElement('ul');
            product.details.forEach(detail => {
                const li = document.createElement('li');
                li.textContent = detail;
                ul.appendChild(li);
            });
            productDetails.appendChild(ul);
        }

        // Handle size selection
        const sizeContainer = document.querySelector('.size-options');
        if (sizeContainer) {
            product.sizes.forEach(size => {
                const sizeBtn = document.createElement('button');
                sizeBtn.className = 'size-btn';
                sizeBtn.textContent = size;
                sizeBtn.addEventListener('click', function() {
                    document.querySelectorAll('.size-btn').forEach(btn => {
                        btn.classList.remove('active');
                    });
                    this.classList.add('active');
                });
                sizeContainer.appendChild(sizeBtn);
            });
        }

        // Handle Add to Cart button
        const addToCartBtn = document.querySelector('.add-to-cart-btn');
        if (addToCartBtn) {
            addToCartBtn.addEventListener('click', function() {
                const selectedSize = document.querySelector('.size-btn.active');
                if (!selectedSize) {
                    alert('Please select a size');
                    return;
                }

                const cartItem = {
                    id: productId,
                    name: product.name,
                    price: product.price,
                    size: selectedSize.textContent,
                    image: product.mainImage,
                    quantity: 1
                };

                // Get existing cart or initialize new one
                let cart = JSON.parse(localStorage.getItem('cart')) || [];
                
                // Check if item already exists in cart
                const existingItemIndex = cart.findIndex(item => 
                    item.id === cartItem.id && item.size === cartItem.size
                );

                if (existingItemIndex > -1) {
                    cart[existingItemIndex].quantity += 1;
                } else {
                    cart.push(cartItem);
                }

                // Save updated cart
                localStorage.setItem('cart', JSON.stringify(cart));
                alert('Added to cart successfully!');
            });
        }

        // Handle favorite button
        const favoriteBtn = document.querySelector('.favorite-btn');
        if (favoriteBtn) {
            // Check if product is already in favorites
            const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
            const isFavorite = favorites.some(fav => fav.name === product.name);
            
            if (isFavorite) {
                favoriteBtn.querySelector('i').style.color = 'red';
                favoriteBtn.classList.add('active');
            }

            favoriteBtn.addEventListener('click', function() {
                const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
                const existingIndex = favorites.findIndex(fav => fav.name === product.name);

                if (existingIndex > -1) {
                    favorites.splice(existingIndex, 1);
                    this.querySelector('i').style.color = '#666';
                    this.classList.remove('active');
                } else {
                    favorites.push(product);
                    this.querySelector('i').style.color = 'red';
                    this.classList.add('active');
                }

                localStorage.setItem('favorites', JSON.stringify(favorites));
            });
        }
    } else {
        console.error('Product not found');
        // Optionally redirect to a 404 page or show an error message
    }
}); 