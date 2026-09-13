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

const animationObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.dataset.shown) {
            entry.target.dataset.shown = '1';
            entry.target.classList.add('fade-in');
            entry.target.addEventListener('animationend', () => {
                entry.target.classList.remove('fade-in');
            }, { once: true });
        }
    });
}, {
    threshold: 0.3,
    rootMargin: '0px 0px 0px 0px'
});

document.addEventListener('DOMContentLoaded', () => {
    const elements = document.querySelectorAll(
        '.section-content, .section-image, .class-card, .section-title, .contact-content, .gallery-item, .event, .price-card, .contact-item, .booking-form'
    );

    elements.forEach(el => {
        observer.observe(el);
        animationObserver.observe(el);
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

const burger = document.querySelector('.burger');
const mobileMenu = document.querySelector('.mobile-menu');

function setMenu(open) {
    burger.classList.toggle('open', open);
    mobileMenu.classList.toggle('open', open);
    document.body.classList.toggle('menu-open', open);
    burger.setAttribute('aria-expanded', String(open));
}

burger.addEventListener('click', () => {
    setMenu(!mobileMenu.classList.contains('open'));
});

mobileMenu.addEventListener('click', (e) => {
    if (e.target === mobileMenu) setMenu(false);
});

mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => setMenu(false));
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') setMenu(false);
});

document.querySelectorAll('a[href$=".html"]').forEach(link => {
    link.addEventListener('click', (e) => {
        if (e.metaKey || e.ctrlKey || e.shiftKey || link.target === '_blank') return;
        e.preventDefault();
        document.body.classList.add('page-leaving');
        setTimeout(() => { window.location.href = link.href; }, 320);
    });
});

window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)';
    } else {
        navbar.style.boxShadow = '0 2px 8px rgba(0,0,0,0.05)';
    }

    applyEdgeBlur();
});

const EDGE_ZONE = 0.1;
const MAX_BLUR = 3;

function applyEdgeBlur() {
    const vh = window.innerHeight;
    const zone = vh * EDGE_ZONE;
    const items = document.querySelectorAll(
        '.hero-content h1, .hero-content p, .section-content h2, .section-content p, .section-title, .class-card, .contact-content p, .page-hero h1, .page-hero p, .gallery-item, .event, .price-card, .contact-item'
    );

    items.forEach(item => {
        const rect = item.getBoundingClientRect();
        const center = rect.top + rect.height / 2;

        let ratio = 0;
        if (center < zone) {
            ratio = (zone - center) / zone;
        } else if (center > vh - zone) {
            ratio = (center - (vh - zone)) / zone;
        }

        ratio = Math.min(1, Math.max(0, ratio));
        item.style.filter = ratio > 0 ? `blur(${(ratio * MAX_BLUR).toFixed(2)}px)` : 'none';
        item.style.opacity = 1 - ratio * 0.4;
    });
}

window.addEventListener('resize', applyEdgeBlur);
// Ждём конца вступительных анимаций — inline opacity их перебивает
window.addEventListener('load', () => setTimeout(applyEdgeBlur, 1800));
