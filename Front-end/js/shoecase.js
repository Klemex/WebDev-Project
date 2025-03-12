document.addEventListener("DOMContentLoaded", () => {
    const banner = document.querySelector(".main-banner"); // Select the banner
    const images = [
        "assets/pictures/84ed348d9f1d6cc6f8ee3a48637e3f59.jpg",
        "assets/pictures/7857e1fc08bb25f8706c3ae245568f7b.jpg",
        "assets/pictures/2345715567bdafb7e54f11fcfa316ba8.jpg",
        "assets/pictures/e7d594974256984c501450438c01df02.jpg",
        "assets/pictures/e71f480bd75e40b75dfb3b18e5611f45.jpg",
        "assets/pictures/NIKE+DUNK+LOW+RETRO.png",
        "assets/pictures/NIKE+GO+FLYEASE.png",
        "assets/pictures/NIKE+SB+MALOR.png"
    ];

    let currentIndex = 0;
    
    // Create an overlay div for the fading background
    const backgroundOverlay = document.createElement("div");
    backgroundOverlay.classList.add("background-overlay");
    banner.prepend(backgroundOverlay); // Add the overlay inside the banner

    function changeBackground() {
        backgroundOverlay.style.opacity = 0; // Start fade out
        setTimeout(() => {
            backgroundOverlay.style.backgroundImage = `url('${images[currentIndex]}')`;
            backgroundOverlay.style.opacity = 1; // Fade in
            currentIndex = (currentIndex + 1) % images.length; // Cycle images
        }, 1000); // Fade transition duration (1s)
    }

    // Initialize the first background image
    backgroundOverlay.style.backgroundImage = `url('${images[currentIndex]}')`;
    setInterval(changeBackground, 4000); // Change every 4 seconds
});
