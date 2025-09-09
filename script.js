document.addEventListener('DOMContentLoaded', () => {

    // Scroll Reveal
    const sections = document.querySelectorAll('section');
    const options = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = 1;
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, options);

    sections.forEach(section => {
        section.style.opacity = 0;
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(section);
    });

    // Project cards pop-up
    const projectButtons = document.querySelectorAll('.project-button');
    projectButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Simple alert for now, can be replaced with a modal
            alert('Project details are not yet implemented.');
        });
    });
});
