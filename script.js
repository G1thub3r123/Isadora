const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.addEventListener('DOMContentLoaded', () => {
    const elements = document.querySelectorAll(
        '.section-content, .section-image, .class-card, .section-title, .contact-content'
    );
    
    elements.forEach(el => {
        observer.observe(el);
    });
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)';
    } else {
        navbar.style.boxShadow = '0 2px 8px rgba(0,0,0,0.05)';
    }

    const sections = document.querySelectorAll('section, .hero-content');
    sections.forEach(section => {
        const rect = section.getBoundingClientRect();
        const elementCenter = rect.top + rect.height / 2;
        const screenCenter = window.innerHeight / 2;
        const distance = Math.abs(elementCenter - screenCenter);
        const maxDistance = window.innerHeight;

        const opacity = Math.max(0.3, 1 - (distance / maxDistance) * 1.2);
        section.style.opacity = opacity;
        section.style.transition = 'opacity 0.1s ease-out';
    });
});
