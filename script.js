// Мобильное меню
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

// Форма записи
const form = document.getElementById('booking-form');
if (form) {
    form.addEventListener('submit', function (e) {
        e.preventDefault();
        alert('Спасибо за заявку! Мы свяжемся с вами скорее.');
        form.reset();
    });
}

// Частицы плавающей кнопки
document.addEventListener('DOMContentLoaded', () => {
    const particleContainer = document.querySelector('.particles');
    if (!particleContainer) return;

    const CENTER = 110;
    const RADIUS = 62;

    function createParticle() {
        const angle = Math.random() * Math.PI * 2;
        const cos = Math.cos(angle);
        const sin = Math.sin(angle);
        const length = 10 + Math.random() * 12;
        const travel = 26 + Math.random() * 20;

        const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        line.setAttribute('x1', CENTER + cos * RADIUS);
        line.setAttribute('y1', CENTER + sin * RADIUS);
        line.setAttribute('x2', CENTER + cos * (RADIUS + length));
        line.setAttribute('y2', CENTER + sin * (RADIUS + length));
        line.setAttribute('class', 'particle');
        line.style.setProperty('--dx', `${cos * travel}px`);
        line.style.setProperty('--dy', `${sin * travel}px`);

        particleContainer.appendChild(line);
        line.addEventListener('animationend', () => line.remove());
    }

    setInterval(createParticle, 500);
    createParticle();
});

// Тень навбара при прокрутке
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)';
    } else {
        navbar.style.boxShadow = '0 4px 14px rgba(122, 22, 32, 0.06)';
    }
});
