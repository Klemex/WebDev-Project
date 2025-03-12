document.addEventListener('DOMContentLoaded', () => {
    displayFavorites();
});

function displayFavorites() {
    const favoritesContainer = document.querySelector('.favorites-container');
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];

    if (!favoritesContainer) {
        console.error('Favorites container not found');
        return;
    }

    if (favorites.length === 0) {
        favoritesContainer.innerHTML = `
            <div class="empty-favorites">
                <i class="fas fa-heart-broken"></i>
                <p>No favorites added yet!</p>
                <a href="collection.html" class="browse-btn">Browse Collection</a>
            </div>`;
        return;
    }

    const favoritesHTML = favorites.map(product => `
        <div class="product-card" data-product-id="${product.id}">
            <div class="product-image">
                <img src="${product.mainImage}" alt="${product.name}">
            </div>
            <div class="product-info">
                <h3>${product.name}</h3>
                <p class="price">₱${product.price.toLocaleString()}</p>
                <div class="product-card-actions">
                    <a href="../pages/product-details.html?id=${product.id}" class="view-details">View Details</a>
                    <button class="remove-favorite" onclick="removeFromFavoritesList(${product.id})">
                        <i class="fas fa-heart"></i>
                    </button>
                </div>
            </div>
        </div>
    `).join('');

    favoritesContainer.innerHTML = favoritesHTML;

    // Add click event listeners for remove buttons
    document.querySelectorAll('.remove-favorite').forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const productCard = button.closest('.product-card');
            const productId = parseInt(productCard.dataset.productId);
            removeFromFavoritesList(productId);
        });
    });
}

function removeFromFavoritesList(productId) {
    console.log('Removing product:', productId);
    const productCard = document.querySelector(`[data-product-id="${productId}"]`);
    
    if (productCard) {
        // Add fade-out animation
        productCard.style.opacity = '0';
        productCard.style.transform = 'scale(0.8)';
        
        // Wait for animation to complete before removing
        setTimeout(() => {
            if (removeFromFavorites(productId)) {
                displayFavorites(); // Refresh the display
                showNotification('Product removed from favorites');
            } else {
                // If removal failed, revert the animation
                productCard.style.opacity = '1';
                productCard.style.transform = 'scale(1)';
                showNotification('Failed to remove product', 'error');
            }
        }, 300);
    }
}

function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    document.body.appendChild(notification);

    // Trigger animation
    setTimeout(() => notification.classList.add('show'), 10);

    // Remove notification after delay
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    }, 2000);
}