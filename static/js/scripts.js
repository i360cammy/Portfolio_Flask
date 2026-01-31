// Generate animated stars in header
function createStars(containerId, starCount = 50) {
    const container = document.getElementById(containerId);
    
    for (let i = 0; i < starCount; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        star.style.left = Math.random() * 100 + '%';
        star.style.top = Math.random() * 100 + '%';
        star.style.animationDelay = Math.random() * 3 + 's';
        star.style.animation = `twinkle ${2 + Math.random() * 2}s infinite`;
        container.appendChild(star);
    }
}

// Generate stars for intro section with rotation
function createIntroStars(containerId, starCount = 80) {
    const container = document.getElementById(containerId);
    const stars = [];

    const ORBIT_DURATION = 400000; // Duration for a full orbit in ms
    const ANGULAR_VELOCITY = (2 * Math.PI) / ORBIT_DURATION; // Radians per ms
    const FLATTENING = 0.6; // Flattening factor for elliptical orbits

    for (let i = 0; i < starCount; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        const size = 1 + Math.random() * 2;
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;
        star.style.animationDelay = Math.random() * 3 + 's';
        star.style.animation = `twinkle ${2 + Math.random() * 2}s infinite`;

        const minRadius = container.offsetHeight * 0.35;
            const maxRadius = Math.hypot(
            container.offsetWidth / 2,
            container.offsetHeight
        );

        const radius = minRadius + Math.random() * (maxRadius - minRadius);

        const initialAngle = Math.random() * 2 * Math.PI; // Initial angle

        stars.push({ 
            el: star,
            radius, 
            angle: initialAngle 
        });

        container.appendChild(star);
    }

    function animate(time) {
        stars.forEach(star => {
            const angle = star.angle - ANGULAR_VELOCITY * time;

            const x = star.radius * Math.cos(angle);
            const y = star.radius * Math.sin(angle);
            star.el.style.transform = `translate(-50%, 0) translate(${x}px, ${y}px)`;
        });
        requestAnimationFrame(animate);
    }

    requestAnimationFrame(animate);
}

createStars('stars-container', 50);
createIntroStars('intro-stars-container', 200);


// Header scroll effect
let lastScrollTop = 0;
const header = document.getElementById('header');

window.addEventListener('scroll', function() {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    if (scrollTop > lastScrollTop) {
        // Scroll down
        header.classList.add('hidden');
    } else {
        // Scroll up
        header.classList.remove('hidden');
    }
    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
});

// Carousel
const carouselContainer = document.querySelector('.carousel-container');
const slides = document.querySelectorAll('.slide');
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');
let currentIndex = 1; // Start with second slide as active

function updateCarousel() {
    slides.forEach((slide, index) => {
        slide.classList.remove('active');
        if (index === currentIndex) {
            slide.classList.add('active');
        }
    });
    const offset = -currentIndex * (60 + 10); // 60% width + 10% margin
    carouselContainer.style.transform = `translateX(${offset}%)`;
}

prevBtn.addEventListener('click', () => {
    currentIndex = (currentIndex > 0) ? currentIndex - 1 : slides.length - 1;
    updateCarousel();
});

nextBtn.addEventListener('click', () => {
    currentIndex = (currentIndex < slides.length - 1) ? currentIndex + 1 : 0;
    updateCarousel();
});

updateCarousel(); // Initial setup