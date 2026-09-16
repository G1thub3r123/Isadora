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

let lastScrollY = window.scrollY;

window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    const y = window.scrollY;

    if (y > 50) {
        navbar.style.boxShadow = '0 4px 12px rgba(61, 16, 26, 0.14)';
    } else {
        navbar.style.boxShadow = '0 2px 8px rgba(61, 16, 26, 0.07)';
    }

    if (y > lastScrollY && y > 100) {
        navbar.classList.add('navbar-hidden');
    } else {
        navbar.classList.remove('navbar-hidden');
    }
    lastScrollY = y;

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

// Floating Button Particles
document.addEventListener('DOMContentLoaded', () => {
    const particleContainer = document.querySelector('.particles');
    if (!particleContainer) return;

    const CENTER = 75;
    const RADIUS = 40;

    function createParticle() {
        const ring = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        ring.setAttribute('cx', CENTER);
        ring.setAttribute('cy', CENTER);
        ring.setAttribute('r', RADIUS);
        ring.setAttribute('class', 'particle');

        particleContainer.appendChild(ring);
        ring.addEventListener('animationend', () => ring.remove());
    }

    setInterval(createParticle, 1500);
    createParticle();
});

// Карусель репетиторов
document.addEventListener('DOMContentLoaded', () => {
    const stage = document.querySelector('.tutor-stage');
    if (!stage) return;

    const cards = [...stage.querySelectorAll('.tutor-card')];
    const total = cards.length;
    if (!total) return;

    const IDLE_BEFORE_AUTOPLAY = 4500;
    const AUTOPLAY_STEP = 2250;

    let index = 0;
    let idleTimer;
    let autoTimer;

    function layout() {
        // Far enough out that a neighbour clears the centre circle instead of
        // tucking behind it; the stage crops whatever spills past its edge.
        // On narrow screens the stage alone is too tight, so the circle's own
        // width sets the floor.
        const step = Math.max(stage.offsetWidth * 0.42, cards[0].offsetWidth * 0.86);

        cards.forEach((card, i) => {
            // Shortest signed distance around the ring, so the last card sits
            // next to the first instead of travelling back through the middle.
            let d = i - index;
            if (d > total / 2) d -= total;
            if (d < -total / 2) d += total;

            const side = Math.sign(d);
            const near = Math.abs(d) <= 1;

            card.style.transform = near
                ? `translateX(${d * step}px) scale(${d === 0 ? 1 : 0.58})`
                : `translateX(${side * step * 1.6}px) scale(0.42)`;
            card.style.opacity = d === 0 ? 1 : (near ? 0.5 : 0);
            card.style.zIndex = near ? (d === 0 ? 3 : 2) : 1;
            card.style.pointerEvents = d === 0 ? 'auto' : 'none';
            card.setAttribute('aria-hidden', String(d !== 0));
        });
    }

    function go(step) {
        index = (index + step + total) % total;
        layout();
    }

    function stopAutoplay() {
        clearInterval(autoTimer);
        autoTimer = undefined;
    }

    function restartIdleCountdown() {
        stopAutoplay();
        clearTimeout(idleTimer);
        idleTimer = setTimeout(() => {
            // step straight away, otherwise the first move waits out the idle
            // delay *and* a full interval before anything happens
            go(1);
            autoTimer = setInterval(() => go(1), AUTOPLAY_STEP);
        }, IDLE_BEFORE_AUTOPLAY);
    }

    document.querySelector('.tutor-arrow.prev').addEventListener('click', () => {
        go(-1);
        restartIdleCountdown();
    });

    document.querySelector('.tutor-arrow.next').addEventListener('click', () => {
        go(1);
        restartIdleCountdown();
    });

    document.querySelector('.tutors').addEventListener('pointerdown', restartIdleCountdown);

    // Nothing to animate while the section is off-screen or the tab is hidden.
    const visible = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) restartIdleCountdown();
        else { stopAutoplay(); clearTimeout(idleTimer); }
    }, { threshold: 0.2 });
    visible.observe(stage);

    document.addEventListener('visibilitychange', () => {
        if (document.hidden) stopAutoplay();
        else restartIdleCountdown();
    });

    window.addEventListener('resize', layout);
    layout();
});
