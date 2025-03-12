// Simulated shoes data (you can fetch real data from your database or API)
const shoesData = {
    men: [
        { name: "Men's Running Shoes", price: "$50" },
        { name: "Men's Leather Boots", price: "$120" }
    ],
    women: [
        { name: "Women's Sneakers", price: "$45" },
        { name: "Women's Sandals", price: "$30" }
    ],
    kids: [
        { name: "Kids' Sports Shoes", price: "$35" },
        { name: "Kids' Casual Shoes", price: "$25" }
    ],
    all: [
        { name: "Men's Running Shoes", price: "$50" },
        { name: "Men's Leather Boots", price: "$120" },
        { name: "Women's Sneakers", price: "$45" },
        { name: "Women's Sandals", price: "$30" },
        { name: "Kids' Sports Shoes", price: "$35" },
        { name: "Kids' Casual Shoes", price: "$25" }
    ]
};

// Function to display shoes based on selected category
function filterCategory() {
    const category = document.getElementById("shoe-category").value;
    const shoesList = document.getElementById("shoes-list");
    shoesList.innerHTML = "";  // Clear existing items

    shoesData[category].forEach(shoe => {
        const shoeDiv = document.createElement("div");
        shoeDiv.classList.add("shoe-item");
        shoeDiv.innerHTML = `
            <h3>${shoe.name}</h3>
            <p>Price: ${shoe.price}</p>
        `;
        shoesList.appendChild(shoeDiv);
    });
}

// Initial load
window.onload = filterCategory;
