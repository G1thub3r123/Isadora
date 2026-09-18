/* ============================================================
   Появление содержимого.

   Один наблюдатель на всю страницу. Блок ждёт за нижней кромкой
   экрана и выходит в кадр, когда до него доходит прокрутка;
   соседи в одной группе выходят друг за другом с небольшой
   задержкой, поэтому ряд карточек читается как волна, а не как
   одновременная вспышка. Заголовки собираются по словам.

   Начальное положение задано в CSS под классом js-anim, который
   ставится в <head> — до первой отрисовки. Если сценарий не
   выполнится, страница останется просто статичной, без скрытого
   содержимого.
   ============================================================ */
(() => {
    const root = document.documentElement;
    if (!root.classList.contains('js-anim')) return;

    const calm = window.matchMedia('(prefers-reduced-motion: reduce)');

    // селектор, характер движения, шаг между соседями в группе
    const GROUPS = [
        ['.path-card',                              'up',   120],
        ['.event-card',                             'up',    90],
        ['.contact-item',                           'up',    90],
        ['.price-row',                              'up',    45],
        ['.direction-card',                         'up',   130],
        ['.paths-lead',                             'up',     0],
        ['.events-head',                            'up',     0],
        ['.reviews-strip',                          'up',     0],
        ['.leave-review',                           'up',     0],
        ['.note, .direction-note, .form-note',      'up',     0],
        ['.booking-form',                           'up',     0],
        ['.contact-content',                        'up',     0],
        // не zoom: карта во всю ширину, и увеличенная на 4% она вылезала
        // за правый край, пока не появилась
        ['.map-frame',                              'up',     0],
        ['.map-address',                            'up',     0],
        // карусель педагогов появляется целиком: её карточки двигает
        // собственный сценарий, и второй transform на них всё бы сломал
        ['.tutor-stage',                            'up',     0],
    ];

    // порог 0 плюс небольшой отступ снизу: блок трогается, когда его
    // верхний край поднялся чуть выше нижней кромки экрана. Порог в долях
    // не годится — элемент выше экрана его бы никогда не набрал
    const io = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add('in');
            io.unobserve(entry.target);
        });
    }, { threshold: 0, rootMargin: '0px 0px -80px 0px' });

    /* Страховка на самый низ страницы: отступ снизу означает, что элемент,
       упирающийся в конец документа, может не попасть в зону срабатывания —
       дальше уже не прокрутить. Дойдя до низа, показываем всё, что осталось. */
    function sweepBottom() {
        const doc = document.documentElement;
        if (window.innerHeight + window.scrollY < doc.scrollHeight - 4) return;
        document.querySelectorAll('[data-reveal]:not(.in), .rv-split:not(.in)')
            .forEach(el => { el.classList.add('in'); io.unobserve(el); });
    }

    window.addEventListener('scroll', sweepBottom, { passive: true });
    window.addEventListener('resize', sweepBottom, { passive: true });

    /** ставит элемент в очередь на появление */
    function arm(el, kind, delay) {
        if (el.dataset.reveal) return;
        el.dataset.reveal = kind;
        if (delay) el.style.setProperty('--d', delay + 'ms');
        io.observe(el);
    }

    /** разбивает заголовок на слова, сохраняя пробелы и переносы строк */
    function splitWords(el) {
        if (el.dataset.split || el.children.length) return false;
        const text = el.textContent;
        if (!text.trim()) return false;

        el.dataset.split = '1';
        el.classList.add('rv-split');

        const frag = document.createDocumentFragment();
        let i = 0;
        text.split(/(\s+)/).forEach(part => {
            if (!part) return;
            if (/^\s+$/.test(part)) {
                frag.appendChild(document.createTextNode(part));
                return;
            }
            const word = document.createElement('span');
            word.className = 'rv-word';
            word.textContent = part;
            word.style.setProperty('--d', (i++ * 55) + 'ms');
            frag.appendChild(word);
        });

        el.textContent = '';
        el.appendChild(frag);
        return true;
    }

    function start() {
        // заголовки — по словам
        document.querySelectorAll('.section-title, .page-hero h1').forEach(el => {
            // старые классы отдают управление новому слою
            el.classList.remove('fade-in', 'fade-in-delay');
            if (splitWords(el)) io.observe(el);
        });

        // блоки — группами, с шагом внутри одного родителя
        GROUPS.forEach(([selector, kind, step]) => {
            const seen = new Map();
            document.querySelectorAll(selector).forEach(el => {
                const parent = el.parentElement;
                const n = seen.get(parent) || 0;
                seen.set(parent, n + 1);
                arm(el, kind, step * n);
            });
        });

        // подзаголовок страницы идёт следом за её названием
        document.querySelectorAll('.page-hero p').forEach(el => {
            el.classList.remove('fade-in', 'fade-in-delay');
            el.dataset.reveal = 'up';
            el.style.setProperty('--d', '260ms');
            requestAnimationFrame(() => el.classList.add('in'));
        });

        // три строки поверх видео — сразу при открытии, по очереди
        const lead = document.querySelector('.hero-lead');
        if (lead) {
            lead.querySelectorAll('span').forEach((s, i) => {
                s.style.setProperty('--d', (420 + i * 160) + 'ms');
            });
            requestAnimationFrame(() => lead.classList.add('in'));
        }

        // если человек просил меньше движения — всё просто на месте
        if (calm.matches) {
            document.querySelectorAll('[data-reveal], .rv-split').forEach(el => {
                el.classList.add('in');
                io.unobserve(el);
            });
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', start, { once: true });
    } else {
        start();
    }
})();

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
        // ссылка на страницу, где мы уже стоим — это прокрутка, а не переход
        if (link.pathname === window.location.pathname) return;
        e.preventDefault();
        document.body.classList.add('page-leaving');
        setTimeout(() => { window.location.href = link.href; }, 320);
    });
});

let lastScrollY = window.scrollY;

/* Шапка прячется, когда читатель уходит вниз. Но переход по якорю внутри
   страницы — это тоже движение вниз, и после него шапка уезжала за край
   вместе с бургером: меню становилось не открыть, пока не прокрутишь назад
   руками. Пока идёт такой переход, держим шапку на месте. */
let navbarHoldUntil = 0;

function holdNavbar(ms = 1600) {
    navbarHoldUntil = Date.now() + ms;
    const navbar = document.querySelector('.navbar');
    if (navbar) navbar.classList.remove('navbar-hidden');
}

window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    const y = window.scrollY;

    if (y > 50) {
        navbar.style.boxShadow = '0 4px 12px rgba(61, 16, 26, 0.14)';
    } else {
        navbar.style.boxShadow = '0 2px 8px rgba(61, 16, 26, 0.07)';
    }

    if (Date.now() < navbarHoldUntil) {
        navbar.classList.remove('navbar-hidden');
    } else if (y > lastScrollY && y > 100) {
        navbar.classList.add('navbar-hidden');
    } else {
        navbar.classList.remove('navbar-hidden');
    }
    lastScrollY = y;
});

/* Тот же случай, но переход пришёл с другой страницы: браузер сам
   прыгает к якорю, прыжок считается движением вниз — и шапка пряталась
   ещё до того, как человек успевал что-то сделать. */
if (location.hash) {
    holdNavbar(2000);
    window.addEventListener('load', () => holdNavbar(1200), { once: true });
}

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
        // the next ring starts the moment this one ends, so the pulse runs
        // without a gap; a timer would drift against the animation instead
        ring.addEventListener('animationend', () => {
            ring.remove();
            createParticle();
        }, { once: true });
    }

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

        // four tutors have no portrait on the source site; they keep the
        // plain gradient tile instead
        if (avatarImg) {
            if (!modalImg) {
                modalImg = document.createElement('img');
                modalImg.alt = '';
                modalPhoto.appendChild(modalImg);
            }
            modalImg.src = avatarImg.src;
        } else if (modalImg) {
            modalImg.remove();
        }
        modalPhoto.classList.toggle('no-photo', !avatarImg);
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

// Стоимость и аренда — одна страница, два пункта меню: подсвечиваем тот,
// к чьей половине страницы читатель сейчас ближе
document.addEventListener('DOMContentLoaded', () => {
    const rent = document.getElementById('rent');
    if (!rent) return;

    const links = [...document.querySelectorAll('a[href="classes.html"], a[href="classes.html#rent"]')];
    if (!links.length) return;

    function sync() {
        const atRent = rent.getBoundingClientRect().top <= window.innerHeight / 2;
        links.forEach(a => {
            const isRentLink = a.getAttribute('href').endsWith('#rent');
            a.classList.toggle('active', isRentLink === atRent);
        });
    }

    // уже на этой странице — не перезагружаем её ради якоря
    links.forEach(a => a.addEventListener('click', (e) => {
        if (e.metaKey || e.ctrlKey || e.shiftKey) return;
        e.preventDefault();

        const toRent = a.getAttribute('href').endsWith('#rent');
        // шапка остаётся на виду, иначе после перехода бургер уедет за край
        holdNavbar();

        // адресная строка должна отражать, где мы оказались: иначе кнопка
        // «назад» в браузере уводит со страницы вместо возврата к началу
        history.replaceState(null, '', toRent ? 'classes.html#rent' : 'classes.html');

        /* Ссылка из бургер-меню закрывает меню в этом же клике, а закрытие
           снимает с body запрет прокрутки. Если тронуться сразу, телефон
           ещё считает страницу незыблемой и просто теряет команду — со
           стороны выглядит так, будто нажатие ничего не сделало. Ждём, пока
           браузер применит новые стили, и только потом едем. */
        requestAnimationFrame(() => requestAnimationFrame(() => {
            if (toRent) {
                rent.scrollIntoView({ behavior: 'smooth', block: 'start' });
            } else {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
            holdNavbar();
            sync();
        }));
    }));

    sync();
    window.addEventListener('scroll', sync, { passive: true });
    window.addEventListener('resize', sync);
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
    [...head, ...tail].forEach(c => {
        c.setAttribute('aria-hidden', 'true');
        // the copies are hidden from assistive tech, so keep Tab out of them
        c.querySelectorAll('a, button').forEach(el => { el.tabIndex = -1; });
    });
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

// Лента отзывов: листается только стрелками, сама не крутится
document.addEventListener('DOMContentLoaded', () => {
    const track = document.querySelector('.reviews-track');
    if (!track) return;

    const originals = [...track.children];
    const count = originals.length;
    if (!count) return;

    // A copy of the run sits on each side, so the strip can slide past either
    // end onto identical cards and jump back unseen once it lines up again.
    // The leading copy is also what shows through on the left of the card
    // being read.
    const viewport = track.parentElement;

    function copy(card) {
        const clone = card.cloneNode(true);
        clone.setAttribute('aria-hidden', 'true');
        return clone;
    }

    originals.map(copy).reverse().forEach(c => track.prepend(c));
    originals.map(copy).forEach(c => track.append(c));

    let index = 0;

    function cardWidth() {
        return originals[0].getBoundingClientRect().width;
    }

    function stride() {
        const gap = parseFloat(getComputedStyle(track).gap) || 0;
        return cardWidth() + gap;
    }

    function render(animate = true) {
        // centre the card being read, so equal slivers of the one before and
        // the one after show on either side
        const inset = (viewport.clientWidth - cardWidth()) / 2;
        const x = (count + index) * stride() - inset;
        track.style.transition = animate ? '' : 'none';
        track.style.transform = `translateX(${-x}px)`;
        if (!animate) track.offsetHeight; // flush, so the next move animates
    }

    function next() {
        index += 1;
        render(true);
        if (index >= count) {
            // once the trailing copy has carried us a full run, snap back
            setTimeout(() => { index = 0; render(false); }, 700);
        }
    }

    function prev() {
        index -= 1;
        render(true);
        if (index < 0) {
            // stepped onto the leading copy, which looks the same; snap across
            setTimeout(() => { index = count - 1; render(false); }, 700);
        }
    }

    document.querySelector('.review-arrow.prev').addEventListener('click', prev);
    document.querySelector('.review-arrow.next').addEventListener('click', next);

    // the strip starts a whole run in, so place it before it is seen
    render(false);
    window.addEventListener('resize', () => render(false));
});

// ---- фоновое видео на главной ----
// класс has-video ставится только после того, как кадры реально пришли:
// пока файла hero.mp4 нет, секция выглядит так же, как раньше
document.addEventListener('DOMContentLoaded', () => {
    const hero = document.querySelector('.hero');
    const video = hero && hero.querySelector('.hero-video');
    if (!video) return;

    const show = () => hero.classList.add('has-video');
    const hide = () => hero.classList.remove('has-video');

    if (video.readyState >= 2) show();
    video.addEventListener('loadeddata', show);
    // ошибка <source> не всплывает, ловим её на фазе перехвата
    video.addEventListener('error', hide, true);

    const started = video.play();
    if (started && started.catch) started.catch(() => {});

    // некоторые мобильные браузеры останавливают видео при возврате на вкладку
    document.addEventListener('visibilitychange', () => {
        if (!document.hidden && video.paused && hero.classList.contains('has-video')) {
            const again = video.play();
            if (again && again.catch) again.catch(() => {});
        }
    });
});
