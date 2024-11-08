console.log('collection.js loaded');

// Initialize favorites array in localStorage if it doesn't exist
if (!localStorage.getItem('favorites')) {
    localStorage.setItem('favorites', JSON.stringify([]));
    console.log('Initialized empty favorites array');
}

// Collection page product data
const collectionProducts = {
    1: {
        name: "Fragment Design x Nike",
        brand: "Nike",
        category: "men",
        price: "₱4,600.00",
        description: "Premium collaboration sneaker featuring Fragment Design aesthetics.",
        image: "Pictures/2345715567bdafb7e54f11fcfa316ba8.jpg",
        sizes: ["40", "41", "42", "43"]
    },
    2: {
        name: "Travis Scott x Nike Air",
        brand: "Nike",
        category: "women",
        price: "₱1,240.00",
        description: "Exclusive Travis Scott collaboration with unique design elements.",
        image: "Pictures/7857e1fc08bb25f8706c3ae245568f7b.jpg",
        sizes: ["40", "41", "42", "43"]
    },
    3: {
        name: "Women's Air Jordan",
        brand: "Nike",
        category: "women",
        price: "₱3,200.00",
        description: "Stylish women's sneakers with premium comfort.",
        image: "Pictures/e7d594974256984c501450438c01df02.jpg",
        sizes: ["36", "37", "38", "39", "40"]
    },
    4: {
        name: "Kids Sport Runner",
        brand: "Nike",
        category: "kids",
        price: "₱2,100.00",
        description: "Comfortable and durable kids' running shoes.",
        image: "Pictures/e7d594974256984c501450438c01df02.jpg",
        sizes: ["32", "33", "34", "35"]
    }
    // Add more products as needed...
};

document.addEventListener('DOMContentLoaded', function() {
    const container = document.querySelector('.container');
    
    // Generate product items dynamically
    Object.entries(collectionProducts).forEach(([id, product]) => {
        // Get current page path
        const currentPage = window.location.pathname.toLowerCase();
        
        // Only show products that match the current page category
        if (
            (currentPage.includes('mens.html') && product.category !== 'men') ||
            (currentPage.includes('women.html') && product.category !== 'women') ||
            (currentPage.includes('kids.html') && product.category !== 'kids')
        ) {
            return; // Skip products that don't match the current page category
        }

        const productHTML = `
            <div class="product-item" data-category="${product.category}">
                <button class="favorite-btn">
                    <i class="fas fa-heart"></i>
                </button>
                <a href="product-details.html?id=${id}" class="product-link">
                    <img src="${product.image}" alt="${product.name}">
                    <h3>${product.name}</h3>
                    <p>${product.description}</p>
                    <span class="price">${product.price}</span>
                </a>
                <div class="size-selector">
                    <p>Select Size:</p>
                    <div class="sizes">
                        ${product.sizes.map(size => `
                            <label class="size-option">
                                <input type="radio" name="size-${id}" value="${size}">
                                <span class="size-label">${size}</span>
                            </label>
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

    // Rest of your event listeners...
});

// Add click event listeners to all product links
document.querySelectorAll('.product-link').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault(); // Prevent default link behavior
        
        // Get the product data from the clicked item
        const productItem = this.closest('.product-item');
        const product = {
            id: this.getAttribute('href').split('=')[1], // Get the ID from the URL
            name: productItem.querySelector('h3').textContent,
            image: productItem.querySelector('img').src,
            description: productItem.querySelector('p').textContent,
            price: productItem.querySelector('.price').textContent,
            sizes: Array.from(productItem.querySelectorAll('.size-label')).map(size => size.textContent)
        };

        // Store the product data in localStorage
        localStorage.setItem('selectedProduct', JSON.stringify(product));
        
        // Navigate to product details page
        window.location.href = this.getAttribute('href');
    });
});

// Add click event listeners to all favorite buttons
document.querySelectorAll('.favorite-btn').forEach(btn => {
    console.log('Found favorite button'); // Debug log
    
    btn.addEventListener('click', function(e) {
        console.log('Favorite button clicked'); // Debug log
        e.preventDefault();
        e.stopPropagation();
        
        // Get the parent product-item
        const productItem = this.closest('.product-item');
        
        // Create product object from the item's data
        const product = {
            name: productItem.querySelector('h3').textContent,
            image: productItem.querySelector('img').src,
            description: productItem.querySelector('p').textContent,
            price: productItem.querySelector('.price').textContent,
            sizes: Array.from(productItem.querySelectorAll('.size-label')).map(size => size.textContent)
        };

        // Handle favorites functionality
        let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
        const existingIndex = favorites.findIndex(item => item.name === product.name);
        
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
});

// Size selector functionality
const sizeOptions = document.querySelectorAll('.size-option input');
sizeOptions.forEach(option => {
    option.addEventListener('change', function() {
        // Handle size selection
        const productItem = this.closest('.product-item');
        const sizeOptions = productItem.querySelectorAll('.size-option input');
        sizeOptions.forEach(opt => {
            opt.closest('.size-option').classList.remove('selected');
        });
        this.closest('.size-option').classList.add('selected');
    });
});

// Check and mark already favorited items on page load
const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
document.querySelectorAll('.product-item').forEach(item => {
    const productName = item.querySelector('h3').textContent;
    const isFavorite = favorites.some(fav => fav.name === productName);
    
    if (isFavorite) {
        const favBtn = item.querySelector('.favorite-btn');
        favBtn.querySelector('i').style.color = 'red';
        favBtn.classList.add('active');
    }
});

document.addEventListener('DOMContentLoaded', function() {
    // Get the current page URL
    const currentPage = window.location.pathname.split('/').pop();
    console.log('Current page:', currentPage); // Debug log
    
    // Get all product items
    const products = document.querySelectorAll('.product-item');
    console.log('Found products:', products.length); // Debug log
    
    // Filter products based on the current page
    switch(currentPage) {
        case 'Mens.html':
            console.log('Filtering for mens category'); // Debug log
            filterProducts('mens');
            break;
        case 'women.html':
            filterProducts('womens');
            break;
        case 'kids.html':
            filterProducts('kids');
            break;
        case 'collection.html':
            // Show all products
            products.forEach(product => product.style.display = 'block');
            break;
    }
    
    function filterProducts(category) {
        console.log('Filtering for category:', category); // Debug log
        products.forEach(product => {
            console.log('Product category:', product.dataset.category); // Debug log
            if (product.dataset.category === category) {
                product.style.display = 'block';
            } else {
                product.style.display = 'none';
            }
        });
    }
});