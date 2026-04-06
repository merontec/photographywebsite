console.log('pot.js loaded and running!');

(function setupPortfolioLightbox() {
    const portfolioItems = Array.from(document.querySelectorAll('.portfolio-item'));
    const portfolioImages = Array.from(document.querySelectorAll('.portfolio-item img'));
    console.log('Portfolio items found:', portfolioItems.length);
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.getElementById('lightboxImage');
    const lightboxClose = document.getElementById('lightboxClose');
    const lightboxPrev = document.getElementById('lightboxPrev');
    const lightboxNext = document.getElementById('lightboxNext');
    const lightboxCounter = document.getElementById('lightboxCounter');
    let currentIndex = 0;
    let startX = 0;
    let endX = 0;

    if (!portfolioItems.length || !lightbox) {
        console.log('No portfolio items or lightbox found.');
        return;
    }

    portfolioItems.forEach((item, index) => {
        item.addEventListener('click', function() {
            console.log('Image clicked:', index);
            currentIndex = index;
            openLightbox();
        });
        item.style.cursor = 'pointer';
    });

    lightboxClose.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) closeLightbox();
    });
    lightboxPrev.addEventListener('click', prevImage);
    lightboxNext.addEventListener('click', nextImage);
    document.addEventListener('keydown', (e) => {
        if (!lightbox.classList.contains('active')) return;
        if (e.key === 'ArrowLeft') prevImage();
        if (e.key === 'ArrowRight') nextImage();
        if (e.key === 'Escape') closeLightbox();
    });
    lightbox.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
    });
    lightbox.addEventListener('touchend', (e) => {
        endX = e.changedTouches[0].clientX;
        handleSwipe();
    });
    function handleSwipe() {
        const swipeThreshold = 50;
        if (startX - endX > swipeThreshold) {
            nextImage();
        } else if (endX - startX > swipeThreshold) {
            prevImage();
        }
    }
    function openLightbox() {
        console.log('Opening lightbox for image:', currentIndex);
        lightboxImage.src = portfolioImages[currentIndex].src;
        lightbox.classList.add('active');
        updateCounter();
    }
    function closeLightbox() {
        console.log('Closing lightbox');
        lightbox.classList.remove('active');
    }
    function nextImage() {
        currentIndex = (currentIndex + 1) % portfolioImages.length;
        lightboxImage.src = portfolioImages[currentIndex].src;
        updateCounter();
    }
    function prevImage() {
        currentIndex = (currentIndex - 1 + portfolioImages.length) % portfolioImages.length;
        lightboxImage.src = portfolioImages[currentIndex].src;
        updateCounter();
    }
    function updateCounter() {
        lightboxCounter.textContent = `${currentIndex + 1} / ${portfolioImages.length}`;
    }
})()