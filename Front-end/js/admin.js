document.getElementById('productForm').addEventListener('submit', function (e) {
    e.preventDefault(); // Prevent the form from reloading the page

    const productName = document.getElementById('productName').value;
    const productImage = document.getElementById('productImage').value;
    const productDescription = document.getElementById('productDescription').value;
    const productPrice = parseFloat(document.getElementById('productPrice').value);
    const productCategory = document.getElementById('productCategory').value;

    const newProduct = {
        name: productName,
        image: productImage,
        description: productDescription,
        price: productPrice,
        category: productCategory
    };

    // Get existing products from localStorage
    let products = JSON.parse(localStorage.getItem('products')) || [];

    // Add new product to the array
    products.push(newProduct);

    // Save updated products back to localStorage
    localStorage.setItem('products', JSON.stringify(products));

    // Redirect to collection page after product is added
    window.location.href = 'collection.html';
});
