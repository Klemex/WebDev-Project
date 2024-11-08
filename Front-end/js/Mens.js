document.addEventListener('DOMContentLoaded', function() {
    const products = [
        {
            id: 1,
            name: "Nike Air Max 270",
            price: "$150",
            image: "../images/nike-air-max-270.jpg",
            description: "Men's Running Shoes",
            sizes: [40, 41, 42, 43, 44, 45]
        },
        {
            id: 2,
            name: "Adidas Ultraboost",
            price: "$180",
            image: "../images/adidas-ultraboost.jpg",
            description: "Men's Performance Running Shoes",
            sizes: [40, 41, 42, 43, 44]
        },
        {
            id: 3,
            name: "Jordan 1 Retro High",
            price: "$170",
            image: "../images/jordan1-retro.jpg",
            description: "Men's Basketball Shoes",
            sizes: [41, 42, 43, 44, 45]
        },
        {
            id: 4,
            name: "New Balance 574",
            price: "$80",
            image: "../images/nb-574.jpg",
            description: "Men's Classic Sneakers",
            sizes: [40, 41, 42, 43, 44]
        },
        {
            id: 5,
            name: "Puma RS-X",
            price: "$110",
            image: "../images/puma-rsx.jpg",
            description: "Men's Sport Style Shoes",
            sizes: [41, 42, 43, 44, 45]
        },
        {
            id: 6,
            name: "Reebok Classic Leather",
            price: "$75",
            image: "../images/reebok-classic.jpg",
            description: "Men's Classic Shoes",
            sizes: [40, 41, 42, 43, 44]
        }
    ];

    const container = document.querySelector('.container');

    products.forEach(product => {
        const productHTML = `
            <div class="product-item" data-id="${product.id}">
                <button class="favorite-btn">
                    <i class="fas fa-heart"></i>
                </button>
                <img src="${product.image}" alt="${product.name}">
                <h3>${product.name}</h3>
                <p>${product.description}</p>
                <span class="price">${product.price}</span>
                <div class="size-selector">
                    <p>Select Size:</p>
                    <div class="sizes">
                        ${product.sizes.map(size => `
                            <div class="size-option">
                                <input type="radio" name="size-${product.id}" id="size-${product.id}-${size}" value="${size}">
                                <label class="size-label" for="size-${product.id}-${size}">${size}</label>
                            </div>
                        `).join('')}
                    </div>
                </div>
                <button class="add-to-cart">
                    <i class="fas fa-shopping-cart"></i>
                    Add to Cart
                </button>
            </div>
        `;
        container.innerHTML += productHTML;
    });

    // Handle favorite button clicks
    document.querySelectorAll('.favorite-btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            this.classList.toggle('active');
            const productId = this.closest('.product-item').dataset.id;
            // Add your favorite functionality here
        });
    });

    // Handle add to cart clicks
    document.querySelectorAll('.add-to-cart').forEach(btn => {
        btn.addEventListener('click', function() {
            const productItem = this.closest('.product-item');
            const selectedSize = productItem.querySelector('input[type="radio"]:checked');
            
            if (!selectedSize) {
                alert('Please select a size first!');
                return;
            }
            
            // Add your cart functionality here
            alert('Product added to cart!');
        });
    });
}); 