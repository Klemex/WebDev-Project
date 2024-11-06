function toggleFavorite(button) {
    // Toggle active class for visual feedback
    button.classList.toggle('active');
    
    // Get product information
    const productItem = button.closest('.product-item');
    const productInfo = {
        image: productItem.querySelector('img').src,
        name: productItem.querySelector('h3').textContent,
        price: productItem.querySelector('.price').textContent,
        description: productItem.querySelector('p').textContent,
        sizes: Array.from(productItem.querySelectorAll('.sizes span')).map(span => span.textContent)
    };

    // Get existing favorites from localStorage
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

    // Check if item is already in favorites
    const existingIndex = favorites.findIndex(item => item.name === productInfo.name);

    if (existingIndex === -1) {
        // Add to favorites
        favorites.push(productInfo);
        button.querySelector('i').style.color = '#ff0000';
    } else {
        // Remove from favorites
        favorites.splice(existingIndex, 1);
        button.querySelector('i').style.color = '#666';
    }

    // Save updated favorites to localStorage
    localStorage.setItem('favorites', JSON.stringify(favorites));
} 