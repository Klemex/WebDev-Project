// Add this at the top of the file
if (!localStorage) {
    console.error('localStorage is not available');
}

// Storage utility functions
const StorageUtils = {
    getCart() {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        console.log('Getting cart:', cart);
        return cart;
    },

    setCart(cart) {
        console.log('Setting cart:', cart);
        localStorage.setItem('cart', JSON.stringify(cart));
    },

    getFavorites() {
        const favorites = localStorage.getItem('favorites');
        return favorites ? JSON.parse(favorites) : [];
    },

    setFavorites(favorites) {
        localStorage.setItem('favorites', JSON.stringify(favorites));
    },

    addToCart(product, size, quantity) {
        const cart = this.getCart();
        const existingItem = cart.find(item => 
            item.productId === product.id && item.size === size
        );

        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            cart.push({
                productId: product.id,
                name: product.name,
                price: product.price,
                size: size,
                quantity: quantity,
                image: product.mainImage
            });
        }

        this.setCart(cart);
    },

    toggleFavorite(product) {
        const favorites = this.getFavorites();
        const existingIndex = favorites.findIndex(item => item.id === product.id);
        
        if (existingIndex >= 0) {
            // Remove if already in favorites
            favorites.splice(existingIndex, 1);
            this.setFavorites(favorites);
            return false;
        } else {
            // Add to favorites
            favorites.push(product);
            this.setFavorites(favorites);
            return true;
        }
    }
};

function addToFavorites(product) {
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    
    // Check if product is already in favorites
    const isProductInFavorites = favorites.some(item => item.id === product.id);
    
    if (!isProductInFavorites) {
        favorites.push(product);
        localStorage.setItem('favorites', JSON.stringify(favorites));
        return true;
    }
    return false;
}

function removeFromFavorites(productId) {
    try {
        let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
        favorites = favorites.filter(item => item.id !== productId);
        localStorage.setItem('favorites', JSON.stringify(favorites));
        console.log(`Product ${productId} removed from favorites`);
        return true;
    } catch (error) {
        console.error('Error removing from favorites:', error);
        return false;
    }
}

function isProductInFavorites(productId) {
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    return favorites.some(item => item.id === productId);
} 