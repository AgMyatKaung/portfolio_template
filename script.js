document.addEventListener('DOMContentLoaded', () => {

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    // Active nav link on scroll
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section');
    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (pageYOffset >= sectionTop - 60) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    });

    // Hero section typing effect
    const tagline = document.querySelector('.tagline');
    const phrases = ["UI/UX Designer", "Web Developer", "Creative Artist"];
    let phraseIndex = 0;
    let letterIndex = 0;
    let currentPhrase = "";

    function type() {
        if (letterIndex < phrases[phraseIndex].length) {
            currentPhrase += phrases[phraseIndex].charAt(letterIndex);
            tagline.textContent = currentPhrase;
            letterIndex++;
            setTimeout(type, 100);
        } else {
            setTimeout(erase, 2000);
        }
    }

    function erase() {
        if (letterIndex > 0) {
            currentPhrase = currentPhrase.substring(0, currentPhrase.length - 1);
            tagline.textContent = currentPhrase;
            letterIndex--;
            setTimeout(erase, 50);
        } else {
            phraseIndex = (phraseIndex + 1) % phrases.length;
            setTimeout(type, 500);
        }
    }

    type();

    // Gallery Lightbox
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const photoItems = document.querySelectorAll('.photo-item img');
    const closeLightbox = document.querySelector('.lightbox-close');

    photoItems.forEach(item => {
        item.addEventListener('click', () => {
            lightbox.style.display = 'flex';
            lightboxImg.src = item.src;
        });
    });

    closeLightbox.addEventListener('click', () => {
        lightbox.style.display = 'none';
    });

    // Testimonial Slider
    const testimonials = document.querySelectorAll('.testimonial-card');
    let currentTestimonial = 0;

    function showTestimonial(index) {
        testimonials.forEach((testimonial, i) => {
            testimonial.classList.remove('active');
            if (i === index) {
                testimonial.classList.add('active');
            }
        });
    }

    setInterval(() => {
        currentTestimonial = (currentTestimonial + 1) % testimonials.length;
        showTestimonial(currentTestimonial);
    }, 5000); // Change every 5 seconds

});
