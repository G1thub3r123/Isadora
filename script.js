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
});

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

    const IDLE_BEFORE_AUTOPLAY = 2000;
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

    function startAutoplayImmediate() {
        stopAutoplay();
        clearTimeout(idleTimer);
        autoTimer = setInterval(() => go(1), AUTOPLAY_STEP);
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
        startAutoplayImmediate();
    });

    document.querySelector('.tutor-arrow.next').addEventListener('click', () => {
        go(1);
        startAutoplayImmediate();
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

    // Подробнее: содержимое живёт скрытым в карточке и показывается только
    // по кнопке, поэтому прокруткой страницы его не найти
    const modal = document.getElementById('tutor-modal');
    if (!modal) return;

    const panel = modal.querySelector('.tutor-modal-panel');
    const closeBtn = modal.querySelector('.tutor-modal-close');
    let lastFocused = null;

    function openModal(card) {
        const avatar = card.querySelector('.tutor-avatar');
        const modalPhoto = modal.querySelector('.tutor-modal-photo');
        const avatarImg = avatar.querySelector('img');
        let modalImg = modalPhoto.querySelector('img');

        if (!modalImg) {
            modalImg = document.createElement('img');
            modalImg.alt = '';
            modalPhoto.appendChild(modalImg);
        }
        modalImg.src = avatarImg.src;
        modalPhoto.setAttribute('data-i', card.getAttribute('data-i'));
        modal.querySelector('.tutor-modal-name').textContent =
            card.querySelector('.tutor-name').textContent;
        modal.querySelector('.tutor-modal-role').textContent =
            card.querySelector('.tutor-role').textContent;
        modal.querySelector('.tutor-modal-body').innerHTML =
            card.querySelector('.tutor-details').innerHTML;

        lastFocused = document.activeElement;
        modal.hidden = false;
        document.body.classList.add('menu-open');
        stopAutoplay();
        clearTimeout(idleTimer);
        closeBtn.focus();
    }

    function closeModal() {
        if (modal.hidden) return;
        modal.hidden = true;
        document.body.classList.remove('menu-open');
        panel.scrollTop = 0;
        restartIdleCountdown();
        if (lastFocused) lastFocused.focus();
    }

    cards.forEach(card => {
        card.querySelector('.tutor-more').addEventListener('click', () => openModal(card));
    });

    closeBtn.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeModal();
    });
});

// Лента событий: бесконечная, листается только рукой
document.addEventListener('DOMContentLoaded', () => {
    const track = document.querySelector('.events-track');
    if (!track) return;

    const originals = [...track.children];
    if (originals.length < 2) return;

    // A full copy of the strip sits on each side, so swiping past either end
    // lands on identical cards and we can jump back to the middle unseen.
    const head = originals.map(c => c.cloneNode(true));
    const tail = originals.map(c => c.cloneNode(true));
    [...head, ...tail].forEach(c => c.setAttribute('aria-hidden', 'true'));
    head.reverse().forEach(c => track.prepend(c));
    tail.forEach(c => track.append(c));

    // where the strip must sit for `card` to be centred
    function centre(card) {
        return card.offsetLeft - (track.clientWidth - card.offsetWidth) / 2;
    }

    let home, span;

    function measure() {
        home = centre(originals[0]);
        span = centre(tail[0]) - home;   // one full set, gaps included
    }

    function jump(delta) {
        // snapping would fight an assignment to scrollLeft, so lift it briefly
        const snap = track.style.scrollSnapType;
        track.style.scrollSnapType = 'none';
        track.scrollLeft += delta;
        track.offsetWidth;
        track.style.scrollSnapType = snap;
    }

    measure();
    track.scrollLeft = home;

    let queued = false;
    track.addEventListener('scroll', () => {
        if (queued) return;
        queued = true;
        requestAnimationFrame(() => {
            queued = false;
            const d = track.scrollLeft - home;
            if (d < -span / 2) jump(span);
            else if (d > span / 2) jump(-span);
        });
    }, { passive: true });

    window.addEventListener('resize', () => {
        const offset = track.scrollLeft - home;
        measure();
        track.scrollLeft = home + offset;
    });
});

// Лента отзывов
document.addEventListener('DOMContentLoaded', () => {
    const track = document.querySelector('.reviews-track');
    const modal = document.getElementById('review-modal');
    if (!track || !modal) return;

    const originals = [...track.children];
    const count = originals.length;
    if (!count) return;

    const STEP_EVERY = 1500;

    // A second copy runs off the end so the strip can keep sliding past the
    // last card, then jump back invisibly once it lines up again.
    originals.forEach(card => {
        const clone = card.cloneNode(true);
        clone.setAttribute('aria-hidden', 'true');
        clone.tabIndex = -1;
        track.appendChild(clone);
    });

    let index = 0;
    let timer;

    function stride() {
        const card = originals[0].getBoundingClientRect().width;
        const gap = parseFloat(getComputedStyle(track).gap) || 0;
        return card + gap;
    }

    function render(animate = true) {
        track.style.transition = animate ? '' : 'none';
        track.style.transform = `translateX(${-index * stride()}px)`;
        if (!animate) track.offsetHeight; // flush, so the next move animates
    }

    function next() {
        index += 1;
        render(true);
        if (index >= count) {
            // once the clones have carried us a full length, snap back
            setTimeout(() => { index = 0; render(false); }, 700);
        }
    }

    function prev() {
        if (index === 0) {
            // the clone run looks identical here, so jump there unseen and
            // slide back from it
            index = count;
            render(false);
            requestAnimationFrame(() => { index -= 1; render(true); });
            return;
        }
        index -= 1;
        render(true);
    }

    function start() {
        clearInterval(timer);
        timer = setInterval(next, STEP_EVERY);
    }

    function stop() {
        clearInterval(timer);
    }

    track.querySelectorAll('.review-card').forEach(card => {
        card.addEventListener('click', () => {
            stop();
            modal.hidden = false;
            document.body.classList.add('menu-open');
            modal.querySelector('.review-modal-close').focus();
        });
    });

    function close() {
        if (modal.hidden) return;
        modal.hidden = true;
        document.body.classList.remove('menu-open');
        start();
    }

    document.querySelector('.review-arrow.prev').addEventListener('click', () => { prev(); start(); });
    document.querySelector('.review-arrow.next').addEventListener('click', () => { next(); start(); });

    modal.querySelector('.review-modal-close').addEventListener('click', close);
    modal.addEventListener('click', (e) => { if (e.target === modal) close(); });
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') close(); });

    window.addEventListener('resize', () => render(false));

    const seen = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting && modal.hidden) start();
        else stop();
    }, { threshold: 0.1 });
    seen.observe(track);

    document.addEventListener('visibilitychange', () => {
        if (document.hidden) stop();
        else if (modal.hidden) start();
    });
});
