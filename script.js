document.addEventListener('DOMContentLoaded', () => {

    // === Scroll Reveal Animation ===
    const scrollElements = document.querySelectorAll('.scroll-reveal');

    const elementObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
            }
        });
    }, { threshold: 0.1 });

    scrollElements.forEach(element => {
        elementObserver.observe(element);
    });

    // === Project Modal Functionality ===
    const projectModal = document.getElementById('project-modal');
    if (projectModal) {
        const closeModalButton = projectModal.querySelector('.close-button');
        const projectButtons = document.querySelectorAll('.project-button');
        const modalProjectTitle = document.getElementById('modal-project-title');
        const modalProjectImage = document.getElementById('modal-project-image');
        const modalProjectDescription = document.getElementById('modal-project-description');
        const modalProjectLink = document.getElementById('modal-project-link');

        const projectDetails = {
            1: {
                title: 'NEON CITY INTERFACE',
                image: 'https://via.placeholder.com/600x400/ff00ff/0a0a1a?text=PROJECT+ALPHA+DETAILS',
                description: 'A sleek, interactive dashboard concept with real-time data visualization, blending cyberpunk aesthetics with modern UX principles. Features dynamic data charts and holographic projections.',
                link: '#'
            },
            2: {
                title: 'QUANTUM REALITY VR',
                image: 'https://via.placeholder.com/600x400/00ffff/0a0a1a?text=PROJECT+BETA+DETAILS',
                description: 'An immersive virtual reality experience exploring the fabric of space-time. Users navigate through abstract landscapes and interact with quantum phenomena in a breathtaking environment.',
                link: '#'
            },
            3: {
                title: 'AI SENTINEL NETWORK',
                image: 'https://via.placeholder.com/600x400/39ff14/0a0a1a?text=PROJECT+GAMMA+DETAILS',
                description: 'A secure, intelligent network monitoring system with predictive analytics, designed for high-security environments. Real-time threat detection and anomaly reporting are key features.',
                link: '#'
            },
            4: {
                title: 'CYBERNETIC CHRONICLES',
                image: 'https://via.placeholder.com/600x400/f0e68c/0a0a1a?text=PROJECT+DELTA+DETAILS',
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

        const closeModal = () => {
            projectModal.style.display = 'none';
        }

        closeModalButton.addEventListener('click', closeModal);

        window.addEventListener('click', (event) => {
            if (event.target == projectModal) {
                closeModal();
            }
        });
    }

    // === Scroll to Top Button ===
    const scrollToTopBtn = document.querySelector('.scroll-to-top-btn');
    if (scrollToTopBtn) {
        window.addEventListener('scroll', () => {
            if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
                scrollToTopBtn.classList.add('visible');
            } else {
                scrollToTopBtn.classList.remove('visible');
            }
        });

        scrollToTopBtn.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Smooth scrolling for nav links
    document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            if (this.getAttribute('href') !== '#') {
                e.preventDefault();
                let targetId = this.getAttribute('href');
                let targetElement = document.querySelector(targetId);
                if (targetElement) {
                     targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            } else {
                 e.preventDefault();
                 window.scrollTo({top: 0, behavior: 'smooth'});
            }
        });
    });

});
