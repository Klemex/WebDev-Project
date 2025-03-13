document.addEventListener("DOMContentLoaded", () => {
    const banner = document.querySelector(".main-banner"); 
    const images = [
        "assets/pictures/NIKE+DUNK+LOW+RETRO.png",
        "assets/pictures/NIKE+GO+FLYEASE.png",
        "assets/pictures/NIKE+SB+MALOR.png",
        "assets/pictures/shoes1.png",
        "assets/pictures/shoes2.jpg",
        "assets/pictures/shoes3.jpg",
        "assets/pictures/shoes4.jpg",
        "assets/pictures/shoes5.jpg",
    ];

    let currentIndex = 0;
    
    
    const backgroundOverlay = document.createElement("div");
    backgroundOverlay.classList.add("background-overlay");
    banner.prepend(backgroundOverlay);

    function changeBackground() {
        backgroundOverlay.style.opacity = 0; 
        setTimeout(() => {
            backgroundOverlay.style.backgroundImage = `url('${images[currentIndex]}')`;
            backgroundOverlay.style.opacity = 1; 
            currentIndex = (currentIndex + 1) % images.length; 
        }, 2000); 
    }


    backgroundOverlay.style.backgroundImage = `url('${images[currentIndex]}')`;
    setInterval(changeBackground, 5000); 
});
