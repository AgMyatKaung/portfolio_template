document.addEventListener('DOMContentLoaded', () => {

    // === Scroll Reveal Animation ===
    const sections = document.querySelectorAll('section');
    const options = {
        threshold: 0.1,
        rootMargin: "0px 0px -100px 0px"
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, options);

    sections.forEach(section => {
        observer.observe(section);
    });

    // === Hero Section Particle Background (Simplified) ===
    const particleBackground = document.querySelector('.particle-background');
    if (particleBackground) {
        for (let i = 0; i < 50; i++) {
            const particle = document.createElement('div');
            particle.classList.add('particle');
            particle.style.width = `${Math.random() * 3 + 1}px`;
            particle.style.height = particle.style.width;
            particle.style.left = `${Math.random() * 100}%`;
            particle.style.top = `${Math.random() * 100}%`;
            particle.style.animationDelay = `${Math.random() * 10}s`;
            particle.style.backgroundColor = `rgba(${Math.random() > 0.5 ? '0,255,255' : '255,0,255'}, ${Math.random() * 0.5 + 0.3})`;
            particleBackground.appendChild(particle);
        }
    }

    // === Project Modal Functionality ===
    const projectModal = document.getElementById('project-modal');
    const closeModalButton = projectModal.querySelector('.close-button');
    const projectButtons = document.querySelectorAll('.project-button');
    const modalProjectTitle = document.getElementById('modal-project-title');
    const modalProjectImage = document.getElementById('modal-project-image');
    const modalProjectDescription = document.getElementById('modal-project-description');
    const modalProjectLink = document.getElementById('modal-project-link');

    const projectDetails = {
        1: {
            title: 'NEON CITY INTERFACE',
            image: 'https://via.placeholder.com/600x400/ff00ff/0a0a1a?text=NEON+CITY',
            description: 'A sleek, interactive dashboard concept with real-time data visualization, blending cyberpunk aesthetics with modern UX principles. Features dynamic data charts and holographic projections.',
            link: '#'
        },
        2: {
            title: 'QUANTUM REALITY VR',
            image: 'https://via.placeholder.com/600x400/00ffff/0a0a1a?text=QUANTUM+VR',
            description: 'An immersive virtual reality experience exploring the fabric of space-time. Users navigate through abstract landscapes and interact with quantum phenomena in a breathtaking environment.',
            link: '#'
        },
        3: {
            title: 'AI SENTINEL NETWORK',
            image: 'https://via.placeholder.com/600x400/39ff14/0a0a1a?text=AI+SENTINEL',
            description: 'A secure, intelligent network monitoring system with predictive analytics, designed for high-security environments. Real-time threat detection and anomaly reporting are key features.',
            link: '#'
        },
        4: {
            title: 'CYBERNETIC CHRONICLES',
            image: 'https://via.placeholder.com/600x400/f0e68c/0a0a1a?text=CYBER+CHRONICLES',
            description: 'An interactive narrative experience set in a dystopian future, where choices influence the unfolding story. A blend of visual novel and point-and-click adventure with a dark, futuristic theme.',
            link: '#'
        }
    };

    projectButtons.forEach(button => {
        button.addEventListener('click', () => {
            const projectId = button.dataset.projectId;
            const details = projectDetails[projectId];

            if (details) {
                modalProjectTitle.textContent = details.title;
                modalProjectImage.src = details.image;
                modalProjectDescription.textContent = details.description;
                modalProjectLink.href = details.link;
                projectModal.style.display = 'block';
            }
        });
    });

    closeModalButton.addEventListener('click', () => {
        projectModal.style.display = 'none';
    });

    window.addEventListener('click', (event) => {
        if (event.target == projectModal) {
            projectModal.style.display = 'none';
        }
    });

    // === Testimonial Carousel Functionality ===
    const testimonialCarousel = document.querySelector('.testimonial-carousel');
    const carouselPrevButton = document.querySelector('.carousel-prev');
    const carouselNextButton = document.querySelector('.carousel-next');
    const testimonialCards = document.querySelectorAll('.testimonial-card');

    let currentIndex = 0;

    function showTestimonial(index) {
        testimonialCards.forEach((card, i) => {
            card.classList.remove('active');
            card.style.transform = `translateX(${-index * 100}%)`;
            if (i === index) {
                card.classList.add('active');
            }
        });
    }

    function nextTestimonial() {
        currentIndex = (currentIndex + 1) % testimonialCards.length;
        showTestimonial(currentIndex);
    }

    function prevTestimonial() {
        currentIndex = (currentIndex - 1 + testimonialCards.length) % testimonialCards.length;
        showTestimonial(currentIndex);
    }

    carouselNextButton.addEventListener('click', nextTestimonial);
    carouselPrevButton.addEventListener('click', prevTestimonial);

    // Initial display
    showTestimonial(currentIndex);

    // Auto-play carousel
    let autoPlayInterval = setInterval(nextTestimonial, 5000);

    // Pause auto-play on hover
    testimonialCarousel.addEventListener('mouseenter', () => {
        clearInterval(autoPlayInterval);
    });

    testimonialCarousel.addEventListener('mouseleave', () => {
        autoPlayInterval = setInterval(nextTestimonial, 5000);
    });

});
