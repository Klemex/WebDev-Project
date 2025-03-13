document.addEventListener("DOMContentLoaded", function() {
    // Retrieve cart data from localStorage
    const cartSummary = JSON.parse(localStorage.getItem('cartSummary'));

    if (cartSummary) {
        // Populate the order summary and total price
        const orderList = document.getElementById("order-list");
        const totalPriceElement = document.getElementById("total-price");

        // Example products: you can dynamically generate this list based on the cart data
        const products = [
            { name: "Product 1", price: 29.99 },
            { name: "Product 2", price: 15.99 }
        ];

        products.forEach(product => {
            const li = document.createElement("li");
            li.textContent = `${product.name} - $${product.price.toFixed(2)}`;
            orderList.appendChild(li);
        });

        // Display the subtotal, shipping, and total price
        document.getElementById("subtotal-price").textContent = `$${cartSummary.subtotal.toFixed(2)}`;
        document.getElementById("shipping-price").textContent = `$${cartSummary.shipping.toFixed(2)}`;
        totalPriceElement.textContent = cartSummary.total.toFixed(2);
    } else {
        alert("Cart data is missing");
    }

    // Form submission handlers (address and payment) are the same as before
    const addressForm = document.getElementById("address-form");
    const paymentForm = document.getElementById("payment-form");
    const changeAddressBtn = document.getElementById("change-address-btn");

    addressForm.addEventListener("submit", function(event) {
        event.preventDefault();
        alert("Address saved!");
    });

    paymentForm.addEventListener("submit", function(event) {
        event.preventDefault();
        alert("Payment successful!");
    });

    changeAddressBtn.addEventListener("click", function() {
        const nameInput = document.getElementById("name");
        const phoneInput = document.getElementById("phone");
        const addressInput = document.getElementById("address");

        nameInput.disabled = false;
        phoneInput.disabled = false;
        addressInput.disabled = false;

        nameInput.classList.remove("input-address");
        phoneInput.classList.remove("input-address");
        addressInput.classList.remove("input-address");

        changeAddressBtn.textContent = "Save Address";
        changeAddressBtn.removeEventListener("click", arguments.callee);
        changeAddressBtn.addEventListener("click", function() {
            alert("Address updated!");
            nameInput.disabled = true;
            phoneInput.disabled = true;
            addressInput.disabled = true;

            nameInput.classList.add("input-address");
            phoneInput.classList.add("input-address");
            addressInput.classList.add("input-address");

            changeAddressBtn.textContent = "Change Address";

            document.addEventListener('DOMContentLoaded', function() {
                const cartSummary = JSON.parse(localStorage.getItem('cartSummary'));
            
                if (!cartSummary) {
                    console.error('Cart summary not found');
                    return;
                }
            
                // Update the total price, subtotal, and shipping
                document.getElementById('total-price').textContent = cartSummary.total.toFixed(2);
                document.getElementById('subtotal-price').textContent = `₱${cartSummary.subtotal.toFixed(2)}`;
                document.getElementById('shipping-price').textContent = `₱${cartSummary.shipping.toFixed(2)}`;
            });
            
        });
    });
});
