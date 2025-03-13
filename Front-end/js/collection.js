console.log('collection.js loaded');

// Initialize favorites array in localStorage if it doesn't exist
if (!localStorage.getItem('favorites')) {
    localStorage.setItem('favorites', JSON.stringify([]));
    console.log('Initialized empty favorites array');
}

// Collection page product data will be fetched from localStorage
document.addEventListener('DOMContentLoaded', function() {
    const container = document.querySelector('.container');
    
    // Get the products from localStorage
    const products = JSON.parse(localStorage.getItem('products')) || [];
    
    // Filter products based on the current page's category (Men, Women, Kids)
    const currentPage = window.location.pathname.toLowerCase();
    
    // Generate product items dynamically
    products.forEach(product => {
        if (
            (currentPage.includes('mens.html') && product.category !== 'mens') ||
            (currentPage.includes('women.html') && product.category !== 'womens') ||
            (currentPage.includes('kids.html') && product.category !== 'kids') ||
            (currentPage.includes('collection.html'))
        ) {
            const productHTML = `
                <div class="product-item" data-category="${product.category}">
                    <button class="favorite-btn">
                        <i class="fas fa-heart"></i>
                    </button>
                    <a href="product-details.html?id=${product.name}" class="product-link">
                        <img src="${product.image}" alt="${product.name}">
                        <h3>${product.name}</h3>
                        <p>${product.description}</p>
                        <span class="price">₱${product.price.toFixed(2)}</span>
                    </a>
                    <div class="size-selector">
                        <p>Select Size:</p>
                        <div class="sizes">
                            <!-- Dummy size options -->
                            <label class="size-option">
                                <input type="radio" name="size-${product.name}" value="40">
                                <span class="size-label">40</span>
                            </label>
                            <label class="size-option">
                                <input type="radio" name="size-${product.name}" value="41">
                                <span class="size-label">41</span>
                            </label>
                        </div>
                    </div>
                    <button class="add-to-cart">
                        <i class="fas fa-shopping-cart"></i>
                        Add to Cart
                    </button>
                </div>
            `;
            container.innerHTML += productHTML;
        }
    });

    // Event listener for the "Add to Cart" and "Favorite" buttons
    document.querySelectorAll('.favorite-btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            const productItem = this.closest('.product-item');
            const product = {
                name: productItem.querySelector('h3').textContent,
                image: productItem.querySelector('img').src,
                description: productItem.querySelector('p').textContent,
                price: productItem.querySelector('.price').textContent,
            };
            
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
});
