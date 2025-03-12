document.addEventListener("DOMContentLoaded", function() {
    // Example of dynamically adding products to the order list
    const orderList = document.getElementById("order-list");
    const products = [
        { name: "Product 1", price: 29.99 },
        { name: "Product 2", price: 15.99 }
    ];

    let totalPrice = 0;

    products.forEach(product => {
        const li = document.createElement("li");
        li.textContent = `${product.name} - $${product.price.toFixed(2)}`;
        orderList.appendChild(li);
        totalPrice += product.price;
    });

    // Update total price
    document.getElementById("total-price").textContent = totalPrice.toFixed(2);

    // Form submission handlers
    const addressForm = document.getElementById("address-form");
    const paymentForm = document.getElementById("payment-form");
    const changeAddressBtn = document.getElementById("change-address-btn");

    addressForm.addEventListener("submit", function(event) {
        event.preventDefault();
        alert("Address saved!");
        // Save address logic here
    });

    paymentForm.addEventListener("submit", function(event) {
        event.preventDefault();
        alert("Payment successful!");
        // Payment processing logic here
    });

    changeAddressBtn.addEventListener("click", function() {
        // Enable the address, name, and phone input fields for editing
        const nameInput = document.getElementById("name");
        const phoneInput = document.getElementById("phone");
        const addressInput = document.getElementById("address");

        nameInput.disabled = false;
        phoneInput.disabled = false;
        addressInput.disabled = false;

        nameInput.classList.remove("input-address");
        phoneInput.classList.remove("input-address");
        addressInput.classList.remove("input-address");

        changeAddressBtn.textContent = "Save Address"; // Change button text to "Save Address"
        changeAddressBtn.removeEventListener("click", arguments.callee);
        changeAddressBtn.addEventListener("click", function() {
            alert("Address updated!");
            nameInput.disabled = true;
            phoneInput.disabled = true;
            addressInput.disabled = true;

            nameInput.classList.add("input-address");
            phoneInput.classList.add("input-address");
            addressInput.classList.add("input-address");

            changeAddressBtn.textContent = "Change Address"; // Restore the button text
        });
    });
});
