document.addEventListener('DOMContentLoaded', function() {
    // Get the current page URL
    const currentPage = window.location.pathname;
    
    // Get all product items
    const products = document.querySelectorAll('.product-item');
    
    // Determine which category to show based on the current page
    let categoryToShow = '';
    if (currentPage.includes('/pages/mens.html')) {
        categoryToShow = 'mens';
      } else if (currentPage.includes('/pages/women.html')) {
        categoryToShow = 'womens';
      } else if (currentPage.includes('/pages/kids.html')) {
        categoryToShow = 'kids';
      }
      
    // If we're on a category page, filter the products
    if (categoryToShow) {
        products.forEach(product => {
            if (product.dataset.category !== categoryToShow) {
                product.style.display = 'none';
            }
        });
    }
}); 