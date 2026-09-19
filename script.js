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
        /* лента целиком, а не карточка по отдельности: карточки в кольце
           уезжают за кадр, наблюдатель их там не застаёт, и долиставший до
           них видел бы пустое место вместо картинки */
        ['.events-track',                           'up',     0],
        ['.schedule-lead',                          'up',     0],
        ['.schedule-cta',                           'up',     0],
        ['.first-class-card',                       'up',    90],
        ['.contact-item',                           'up',    90],
        ['.price-row',                              'up',    45],
        ['.direction-card',                         'up',   130],
        ['.person',                                 'up',   120],
        ['.tag-list li',                            'up',    60],
        ['.about-lead',                             'up',     0],
        ['.about-text',                             'up',     0],
        ['.about-closing',                          'up',     0],
        ['.about-dream',                            'up',     0],
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
            if (entry.isIntersecting) {
                entry.target.classList.add('in');
                return;
            }
            /* Блок, уехавший за край экрана, снова прячется — вернувшись к
               нему, читатель увидит появление заново, а не готовую картинку.
               Но за нижней кромкой зоны наблюдения (её край поднят на 80px)
               элемент может оказаться и просто упёршись в конец документа:
               такой виден на экране, и прятать его нельзя. */
            const box = entry.boundingClientRect;
            const onScreen = box.top < window.innerHeight && box.bottom > 0;
            if (!onScreen) entry.target.classList.remove('in');
        });
    }, { threshold: 0, rootMargin: '0px 0px -80px 0px' });

    /* Страховка на самый низ страницы: отступ снизу означает, что элемент,
       упирающийся в конец документа, может не попасть в зону срабатывания —
       дальше уже не прокрутить. Дойдя до низа, показываем всё, что осталось. */
    function sweepBottom() {
        const doc = document.documentElement;
        if (window.innerHeight + window.scrollY < doc.scrollHeight - 4) return;
        document.querySelectorAll('[data-reveal]:not(.in), .rv-split:not(.in)')
            .forEach(el => el.classList.add('in'));
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
    // the panel covers the whole overlay, so the darkened margin around the
    // sheet is part of it — test against the sheet itself, not the overlay
    modal.addEventListener('click', (e) => {
        if (!e.target.closest('.tutor-modal-sheet')) closeModal();
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
        // Аренда — последний блок страницы, и на высоком телефоне её верх не
        // доходит до середины экрана даже в самом низу. Поэтому считаем не по
        // верхней кромке, а по тому, сколько блока видно.
        const box = rent.getBoundingClientRect();
        const seen = Math.min(box.bottom, window.innerHeight) - Math.max(box.top, 0);
        const atRent = seen > window.innerHeight * 0.3;
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

/* «Расписание» в меню: на главной раздел есть прямо на странице, и ссылка
   там ведёт на якорь — едем к нему прокруткой, не перезагружая страницу.
   На остальных страницах ссылка обычная и открывает отдельную страницу. */
document.addEventListener('DOMContentLoaded', () => {
    const section = document.getElementById('schedule');
    if (!section) return;

    document.querySelectorAll('a[href="#schedule"]').forEach(link => {
        link.addEventListener('click', (e) => {
            if (e.metaKey || e.ctrlKey || e.shiftKey) return;
            e.preventDefault();

            // шапка остаётся на виду, иначе после перехода бургер уедет за край
            holdNavbar();
            history.replaceState(null, '', '#schedule');

            /* Меню закрывается тем же кликом и только что сняло с body запрет
               прокрутки. Тронувшись сразу, телефон теряет команду — ждём, пока
               браузер применит новые стили. */
            requestAnimationFrame(() => requestAnimationFrame(() => {
                section.scrollIntoView({ behavior: 'smooth', block: 'start' });
                holdNavbar();
            }));
        });
    });
});

// Ленты-кольца: и события, и «Айседора глазами учениц» листаются одинаково
(() => {
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.events-track').forEach(ring);
});

function ring(track) {
    const originals = [...track.children];
    const count = originals.length;
    if (count < 2) return;

    /* Лента едет своим трансформом, а не прокруткой браузера. У нативной
       инерции нельзя забрать управление на ходу, а без этого кольцо не
       замкнуть: телефон рвал свою анимацию, и лента то замирала между
       карточками, то доезжала до настоящего конца и прыгала назад. Здесь
       позиция целиком наша, поэтому круг честный в обе стороны. */
    const rail = document.createElement('div');
    rail.className = 'events-rail';
    track.append(rail);
    originals.forEach(card => rail.append(card));

    // по набору с каждой стороны: соседи видны по краям кадра
    const copy = (card) => {
        const clone = card.cloneNode(true);
        clone.setAttribute('aria-hidden', 'true');
        // копии скрыты от чтения с экрана, поэтому и Tab их обходит
        clone.querySelectorAll('a, button').forEach(el => { el.tabIndex = -1; });
        // появление по месту отыгрывают настоящие карточки, копии просто есть
        clone.removeAttribute('data-reveal');
        clone.classList.add('in');
        return clone;
    };
    originals.map(copy).reverse().forEach(c => rail.prepend(c));
    originals.map(copy).forEach(c => rail.append(c));

    let index = count;      // середина кольца — первая настоящая карточка
    let stride = 0;
    let home = 0;

    function measure() {
        const gap = parseFloat(getComputedStyle(rail).gap) || 0;
        stride = originals[0].offsetWidth + gap;
        home = (track.clientWidth - originals[0].offsetWidth) / 2;
    }

    function place(animated) {
        rail.style.transition = animated ? 'transform .5s cubic-bezier(.16, 1, .3, 1)' : 'none';
        rail.style.transform = 'translate3d(' + (home - index * stride) + 'px, 0, 0)';
    }

    /* Возврат к тому же кадру в середине кольца: карточки в наборах
       одинаковые, поэтому подмена не видна, а запас хода снова полный. */
    function rewind() {
        if (index >= count && index < count * 2) return;
        index = count + (((index - count) % count) + count) % count;
        place(false);
    }

    measure();
    place(false);
    rail.addEventListener('transitionend', (e) => {
        if (e.propertyName === 'transform') rewind();
    });
    window.addEventListener('resize', () => { measure(); place(false); });

    let pointer = null;
    let startX = 0;
    let startY = 0;
    let base = 0;
    let shift = 0;
    let dragging = false;

    function settle() {
        place(true);
        // если переход не состоится (движения нет, анимации выключены),
        // transitionend не придёт — страхуем возврат таймером
        setTimeout(rewind, 620);
    }

    track.addEventListener('pointerdown', (e) => {
        if (pointer !== null || (e.pointerType === 'mouse' && e.button !== 0)) return;
        pointer = e.pointerId;
        startX = e.clientX;
        startY = e.clientY;
        base = home - index * stride;
        shift = 0;
        dragging = false;
        rail.style.transition = 'none';
    });

    track.addEventListener('pointermove', (e) => {
        if (e.pointerId !== pointer) return;
        const dx = e.clientX - startX;
        const dy = e.clientY - startY;
        if (!dragging) {
            if (Math.abs(dx) < 6 && Math.abs(dy) < 6) return;
            // жест вверх-вниз — это прокрутка страницы, лента не вмешивается
            if (Math.abs(dy) > Math.abs(dx)) { pointer = null; return; }
            dragging = true;
            track.setPointerCapture(pointer);
        }
        shift = dx;
        rail.style.transform = 'translate3d(' + (base + dx) + 'px, 0, 0)';
    });

    function release(e) {
        if (e.pointerId !== pointer) return;
        pointer = null;
        if (dragging) {
            // четверти карточки достаточно, чтобы понять намерение
            if (shift <= -stride / 4) index += 1;
            else if (shift >= stride / 4) index -= 1;
        }
        settle();
    }

    track.addEventListener('pointerup', release);
    track.addEventListener('pointercancel', release);

    // палец, протащивший ленту, не должен открывать карточку, на которой встал
    track.addEventListener('click', (e) => {
        if (Math.abs(shift) > 8) { e.preventDefault(); e.stopPropagation(); }
    }, true);

    // на трекпаде лента листается боковым жестом
    let wheelShift = 0;
    let wheelIdle;
    track.addEventListener('wheel', (e) => {
        if (Math.abs(e.deltaX) <= Math.abs(e.deltaY)) return;
        e.preventDefault();
        wheelShift += e.deltaX;
        clearTimeout(wheelIdle);
        if (Math.abs(wheelShift) >= stride / 3) {
            index += wheelShift > 0 ? 1 : -1;
            wheelShift = 0;
            settle();
        } else {
            wheelIdle = setTimeout(() => { wheelShift = 0; }, 160);
        }
    }, { passive: false });
}
})();

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

    /* Крутиться без остановки.

       Атрибута loop на телефоне мало: браузер останавливает фоновое видео,
       когда уходишь на другую вкладку, когда экономится заряд, а иногда и
       просто когда ролик уезжает за край экрана. Поэтому запуск повторяется
       при каждом таком случае, а не только один раз при открытии. */
    function resume() {
        if (!hero.classList.contains('has-video')) return;
        if (!video.paused && !video.ended) return;
        const again = video.play();
        if (again && again.catch) again.catch(() => {});
    }

    resume();

    // на случай, если loop почему-то не сработал — заводим сначала руками
    video.addEventListener('ended', () => {
        video.currentTime = 0;
        resume();
    });

    video.addEventListener('pause', () => {
        // пауза от браузера, а не от человека: кнопок управления здесь нет
        setTimeout(resume, 120);
    });

    document.addEventListener('visibilitychange', () => {
        if (!document.hidden) resume();
    });

    window.addEventListener('pageshow', resume);
    window.addEventListener('focus', resume);

    // вернулся в кадр после прокрутки — снова в ход
    if ('IntersectionObserver' in window) {
        new IntersectionObserver((entries) => {
            entries.forEach(e => { if (e.isIntersecting) resume(); });
        }, { threshold: 0.01 }).observe(video);
    }
});

/* Заявка уходит в личку Instagram. Direct не умеет принимать готовый текст по
   ссылке — такого адреса у Instagram просто нет, — поэтому заявку кладём в
   буфер обмена: в переписке остаётся одно касание «вставить». Форма до этого
   не отправляла никуда вообще: кнопка молчала, и заявки терялись. */
document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('.booking-form');
    const sent = document.querySelector('.form-sent');
    if (!form || !sent) return;

    const note = sent.querySelector('.form-sent-note');
    const shown = sent.querySelector('.form-sent-text');
    const byHand = 'Заявка готова. Скопируйте текст ниже и пришлите его нам в Instagram.';

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        if (!form.reportValidity()) return;

        const value = (name) => (form.elements[name] ? form.elements[name].value.trim() : '');
        const lines = [
            'Заявка с сайта',
            'Имя: ' + value('name'),
            'Телефон: ' + value('phone'),
            'Направление: ' + value('course'),
        ];
        if (value('comment')) lines.push('Комментарий: ' + value('comment'));
        const text = lines.join('\n');

        shown.textContent = text;
        note.textContent = 'Заявка готова и скопирована. Откройте наш Instagram, нажмите «Написать сообщение» и вставьте её — мы ответим.';
        sent.hidden = false;
        sent.scrollIntoView({ behavior: 'smooth', block: 'center' });

        // буфер может быть закрыт настройками браузера: тогда текст остаётся
        // на виду, и его можно выделить руками
        if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(text).catch(() => { note.textContent = byHand; });
        } else {
            note.textContent = byHand;
        }
    });
});
