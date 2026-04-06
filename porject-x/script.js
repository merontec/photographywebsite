// Show background image on load
window.addEventListener('load', () => {
    const bgImage = document.getElementById('bgImage1');
    if (bgImage) {
        bgImage.classList.add('active');
    }
});

