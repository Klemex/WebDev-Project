// Men's page product data
const mensProducts = {
    1: {
        name: "Nike Air Max 270",
        brand: "Nike",
        category: "men",
        price: "₱8,895.00",
        description: "Men's Running Shoes with revolutionary Air unit",
        image: "Pictures/NIKE+DUNK+LOW+RETRO.png",
        sizes: ["40", "41", "42", "43", "44", "45"]
    },
    2: {
        name: "Adidas Ultraboost",
        brand: "Adidas",
        category: "men",
        price: "₱9,500.00",
        description: "Men's Performance Running Shoes with Boost technology",
        image: "Pictures/NIKE+GO+FLYEASE.png",
        sizes: ["40", "41", "42", "43", "44"]
    },
    3: {
        name: "Jordan 1 Retro High",
        brand: "Jordan",
        category: "men",
        price: "₱12,345.00",
        description: "Men's Basketball Shoes with classic style",
        image: "Pictures/NIKE+SB+MALOR.png",
        sizes: ["41", "42", "43", "44", "45"]
    }
    // Add more men's products as needed...
};

// Override the collectionProducts with mensProducts for this page
const collectionProducts = mensProducts;

// The rest of the functionality will be handled by collection.js
console.log('Mens.js loaded - Using collection.js functionality'); 