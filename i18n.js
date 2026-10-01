/* ---------- Русский и английский ----------

   Сайт написан по-русски, и разметка остаётся русской: перевод кладётся
   сверху. Ниже словарь — ключ это ровно та строка, что стоит в HTML,
   значение — её английский вариант. Чтобы перевести новую надпись, её
   достаточно сюда дописать; трогать страницы не нужно.

   Файл подключён перед script.js и работает сразу, не дожидаясь
   DOMContentLoaded: заголовки позже разбираются по словам для появления,
   и к этому моменту текст уже должен быть на нужном языке.

   Имена людей переписаны латиницей, а не переведены: это имена.
   Цены, телефон и адрес остаются теми же. */

(function () {
    'use strict';

    var KEY = 'isadora-lang';

    var DICT = {
        /* ----- отзывы ----- */
        'Пришла в школу на групповые уроки растяжки. Обнаружила там Варвару Л. и последние два года занимаюсь с ней три раза в неделю индивидуально. Варвара — большой профессионал, составила для меня план тренировок, ни разу не опоздала, занятия всегда продуманы и подготовлены. Обладает абсолютно спортивным характером и мотивирует следовать за ней.':
            "I came to the school for group stretching classes. There I found Varvara L., and for the last two years I have been training with her one to one three times a week. Varvara is a true professional: she put together a training plan for me, has never once been late, and every class is thought through and prepared. She has a thoroughly athletic character and makes you want to follow her.",
        'Для меня максимально комфортная студия! Приятно прийти сюда после рабочего дня. Красивые, просторные залы. Опытные и талантливые педагоги. Очень нравится направление характерного танца у Варвары и растяжка у Ксении.':
            "The most comfortable studio there is for me! It is a pleasure to come here after a working day. Beautiful, spacious halls. Experienced and talented teachers. I love the character dance with Varvara and the stretching with Ksenia.",
        'Атмосферное место в центре СПб! Очень красивая, воздушная атмосфера! Изразцовые печки в залах просто шик! Преподаватели приятные, знают своё дело, сразу видно большой опыт. Балетные классы, растяжка — рекомендую.':
            "An atmospheric place in the centre of St. Petersburg! A very beautiful, airy feeling! The tiled stoves in the halls are pure chic! The teachers are lovely and know their craft — the experience shows at once. Ballet classes, stretching — I recommend it.",
        'Потрясающее место, лучшее в центре города: красивые залы, комфортные раздевалки, ощущение дворцового интерьера, профессиональные преподаватели. Дочь 6,5 лет занимается с удовольствием, цена адекватная.':
            "A wonderful place, the best in the city centre: beautiful halls, comfortable changing rooms, the feeling of a palace interior, professional teachers. My daughter of 6.5 takes classes with pleasure, and the price is fair.",
        'Удивительное место: историческое здание со своей атмосферой, с хорошим ремонтом, сильные преподаватели по балету. Даже если вы любитель, здесь можно посещать прекрасные классы.':
            "An amazing place: a historic building with a character of its own, nicely restored, with strong ballet teachers. Even if you dance as an amateur, you can take wonderful classes here.",

        /* ----- расписание ----- */
        'Расписание наших классов и групп можно найти в нашем телеграм-канале. Там мы регулярно обновляем информацию о времени занятий, расписании педагогов и специальных мероприятиях.':
            "The timetable of our classes and groups is published in our Telegram channel. We keep it up to date with class times, teachers' schedules and special events.",
        'Переходите в канал, чтобы не пропустить важные обновления и всегда быть в курсе всех изменений в расписании.':
            "Join the channel so you never miss an update and always know about changes in the timetable.",
        'Актуальное расписание занятий': "The current class timetable",
        'Расписание занятий и все изменения публикуем в телеграм-канале':
            "We publish the timetable and every change in our Telegram channel",
        'Перейти в телеграм-канал': "Open our Telegram channel",

        /* ----- о школе ----- */
        '«Айседора» даёт возможность каждому войти в мир, столетиями закрытый от глаз непрофессионалов, и прикоснуться к миру балета.':
            "“Isadora” lets anyone step into a world that stayed closed to outsiders for centuries and touch the world of ballet.",
        'Мы работаем с 2010 года, и за это время накопили колоссальный опыт практики преподавания танцевального искусства.':
            "We have been working since 2010, and in that time we have gathered an immense practical experience of teaching the art of dance.",
        'А наши преподаватели — тщательно подобранные и преданные мастера своего дела.':
            "And our teachers are carefully chosen masters, devoted to their craft.",
        'Если у Вас в детстве была мечта стать балериной — теперь есть возможность её осуществить!':
            "If you dreamed of becoming a ballerina as a child, now you have the chance to make it come true!",
        'В расписании школы можно найти не только классический танец у станка и растяжку, но и:':
            "The school timetable holds more than classical barre work and stretching:",
        'Философия «Айседоры» — сочетание красоты тела и духа.':
            "The philosophy of “Isadora” is the beauty of body and spirit together.",
        'Много лет проработавшая в Мариинском театре и получившая педагогическое образование в Академии Русского балета.':
            "She spent many years at the Mariinsky Theatre and trained as a teacher at the Academy of Russian Ballet.",
        'Заслуженный деятель искусств РФ, профессор и педагог классического танца АРБ им. Вагановой.':
            "Honoured Artist of Russia, professor and teacher of classical dance at the Vaganova Academy.",
        'Балетная школа Марии Бархатовой': "Maria Barkhatova’s ballet school",
        'Директор школы': "Director of the school",
        'Творческий куратор': "Creative curator",
        'Руководители': "Leadership",
        'Сертификаты': "Gift certificates",

        /* ----- педагоги ----- */
        'Высокопрофессиональный педагог классического балета с большим опытом работы со студентами разных уровней.':
            "A highly professional classical ballet teacher with wide experience of students at every level.",
        'Опытный педагог работает с детскими группами, создаёт позитивную и развивающую среду для обучения.':
            "An experienced teacher who works with children’s groups and builds a positive, nurturing place to learn.",
        'Разносторонний педагог с опытом в классическом балете и оздоровительных направлениях.':
            "A versatile teacher with experience in classical ballet and wellness classes.",
        'Опытный педагог, специализирующийся на обучении начинающих классическому балету.':
            "An experienced teacher who specialises in classical ballet for beginners.",
        'Высоко квалифицированный педагог классического балета для продвинутых учеников.':
            "A highly qualified classical ballet teacher for advanced students.",
        'Опытный педагог с специализацией в области растяжки и оздоровительного балета.':
            "An experienced teacher specialising in stretching and wellness ballet.",
        'Опытный педагог классического балета для продолжающих и продвинутых учеников.':
            "An experienced classical ballet teacher for intermediate and advanced students.",
        'Специалист современного танца, ведёт группы для начинающих и продолжающих.':
            "A contemporary dance specialist who leads beginner and intermediate groups.",
        'Педагог классического балета для начинающих с работой над репертуаром.':
            "A classical ballet teacher for beginners, with repertoire work.",
        'Опытный педагог классического балета и оздоровительных направлений.':
            "An experienced teacher of classical ballet and wellness classes.",
        'Специалист по оздоровительному растяжению с использованием гамаков.':
            "A specialist in wellness stretching with hammocks.",
        'Профессиональный педагог музыкального мастерства и аккомпанемента.':
            "A professional teacher of musicianship and accompaniment.",
        'Работа с импровизацией и партерной техникой. Приглашённый педагог.':
            "Works with improvisation and floor technique. Guest teacher.",
        'Разработчик авторской программы по формированию и укреплению мышц.':
            "The author of an original programme for shaping and strengthening muscles.",
        'Педагог классического балета с акцентом на репертуарную работу.':
            "A classical ballet teacher with a focus on repertoire work.",
        'Специалист в области латиноамериканских танцев.': "A specialist in Latin American dance.",
        'Педагог по «РАСТЯЖКА», «BODYBALLET», «БАЛЕТНАЯ ОСАНКА», «ГИБКАЯ СПИНА»':
            "Teacher of STRETCHING, BODY BALLET, BALLET POSTURE and FLEXIBLE BACK",
        'Узнайте больше о педагогах студии и их подходе к занятиям':
            "Learn more about the studio’s teachers and the way they work",
        'Педагоги Мариинского театра и Академии Вагановой':
            "Teachers from the Mariinsky Theatre and the Vaganova Academy",
        'Познакомиться с педагогами': "Meet the teachers",
        'Педагог по классике для продвинутого уровня': "Teacher of classical ballet, advanced level",
        'Педагог по классике, bodyballet и растяжке': "Teacher of classical ballet, body ballet and stretching",
        'Педагог по классике для начинающих': "Teacher of classical ballet for beginners",
        'Педагог по классике и bodyballet': "Teacher of classical ballet and body ballet",
        'Педагог по классике и репертуару': "Teacher of classical ballet and repertoire",
        'Педагог классики разных уровней': "Teacher of classical ballet at every level",
        'Педагог по стретчингу в гамаках': "Teacher of hammock stretching",
        'Работа с детскими группами': "Work with children’s groups",
        'Педагог по jazz-modern': "Teacher of jazz-modern",
        'Педагог по соло-латине': "Teacher of solo Latin",
        'Педагог детских групп': "Teacher of children’s groups",
        'Педагог по фортепиано': "Piano teacher",
        'Специализация': "Specialisation",

        /* ----- имена ----- */
        'Людмила Валентиновна Ковалёва': "Ludmila Valentinovna Kovaleva",
        'Татьяна Борисовна Лебедева': "Tatiana Borisovna Lebedeva",
        'Ольга Линкевич (Кавалерова)': "Olga Linkevich (Kavalerova)",
        'Маргарита Муратова': "Margarita Muratova",
        'Наталья Сержантова': "Natalia Serzhantova",
        'Дмитрий Рудаченко': "Dmitry Rudachenko",
        'Татьяна Лебедева': "Tatiana Lebedeva",
        'Варвара Лозован': "Varvara Lozovan",
        'Ирина Панфилова': "Irina Panfilova",
        'Мария Бархатова': "Maria Barkhatova",
        'Наталия Падалко': "Natalia Padalko",
        'Ольга Мухортова': "Olga Mukhortova",
        'Ольга Чистякова': "Olga Chistyakova",
        'Фарух Рузиматов': "Farukh Ruzimatov",
        'Дарья Русакова': "Daria Rusakova",
        'Ксения Михеева': "Ksenia Mikheeva",
        'Натали Балаян': "Natalie Balayan",
        'Екатерина': "Ekaterina",
        'Татьяна': "Tatiana",
        'Ирина': "Irina",
        'Настя': "Nastya",
        'Анна': "Anna",

        /* ----- направления ----- */
        'Классика + пуанты, Классика + прыжки, Репертуар (продвинутый уровень)':
            "Classical + pointe, Classical + jumps, Repertoire (advanced level)",
        'Классика для продолжающих, Классика для продвинутых, Репертуар':
            "Classical for intermediate, Classical for advanced, Repertoire",
        'Jazz-Modern (группы для начинающих и для продолжающих)':
            "Jazz-Modern (beginner and intermediate groups)",
        'Классика (продолжающие и продвинутые). Подробности уточняйте':
            "Classical (intermediate and advanced). Ask us for details",
        'Растяжка, Bodyballet, Балетная осанка, Гибкая спина':
            "Stretching, Body ballet, Ballet posture, Flexible back",
        'Скульптурирование тела (интенсив раз в год, летом)':
            "Body sculpting (an intensive once a year, in summer)",
        'Классика для продолжающих, Bodyballet, Пуанты':
            "Classical for intermediate, Body ballet, Pointe",
        'Авторская программа «Скульптурирование тела»': "The original “Body sculpting” programme",
        'Классика для продолжающих, Репертуар': "Classical for intermediate, Repertoire",
        'Классика для начинающих, Репертуар': "Classical for beginners, Repertoire",
        'Классика, Bodyballet, Растяжка': "Classical, Body ballet, Stretching",
        'Классика, современный танец и группы для детей': "Classical, contemporary dance and groups for children",
        'Станок и пуанты, body ballet и jazz modern': "Barre and pointe, body ballet and jazz modern",
        'Классика для начинающих': "Classical for beginners",
        'Классика — продолжающие': "Classical — intermediate",
        'Классика — продвинутые': "Classical — advanced",
        'Классика — начинающие': "Classical — beginners",
        'Классический балет': "Classical ballet",
        'Современный танец': "Contemporary dance",
        'Характерный танец': "Character dance",
        'характерный танец': "character dance",
        'Стретчинг в гамаках': "Hammock stretching",
        'стретчинг в гамаках': "hammock stretching",
        'Скульптурирование': "Body sculpting",
        'Балетная осанка': "Ballet posture",
        'Гибкая спина': "Flexible back",
        'Дети и молодёжь': "Children and teens",
        'Соло-Латина': "Solo Latin",
        'Репертуар': "Repertoire",
        'репертуар': "repertoire",
        'Растяжка': "Stretching",
        'Классика': "Classical",
        'Пуанты': "Pointe",
        'пуанты': "pointe",
        'Фортепиано': "Piano",
        'Дети': "Children",
        'В расписании': "In the timetable",
        '3–4 года': "3–4 years",
        '6–8 лет': "6–8 years",
        'только летом': "summer only",
        'вторник и четверг, 16:00': "Tuesday and Thursday, 16:00",
        'вторник и четверг, 17:30': "Tuesday and Thursday, 17:30",

        /* ----- главная ----- */
        '«Айседора» — с 2010 года учим тело говорить': "“Isadora” — teaching the body to speak since 2010",
        'С чего начать': "Where to start",
        'Познакомьтесь с педагогами, выберите направление и узнайте, сколько стоит заниматься':
            "Meet the teachers, choose a class and see what it costs",
        'Абонементы, разовые занятия и аренда залов': "Passes, single classes and hall rental",
        'Что взять на первый урок': "What to bring to your first class",
        'События в Айседоре': "Events at Isadora",
        'Готовы начать свой путь в мире танца?': "Ready to begin your path in the world of dance?",
        'Свяжитесь с нами': "Get in touch",
        'Занимались у нас? Расскажите, как всё прошло.': "Have you taken classes with us? Tell us how it went.",
        'Оставить отзыв на Яндекс Картах': "Leave a review on Yandex Maps",
        'Отзывы': "Reviews",
        'Подробнее': "More",

        /* ----- меню и шапка ----- */
        'Главная': "Home",
        'О школе': "About",
        'Прайс-лист': "Price list",
        'Интерьер': "Interior",
        'Направления': "Classes",
        'Педагоги': "Teachers",
        'Записаться': "Booking",
        'Расписание': "Timetable",
        'Контакты': "Contacts",
        'Мероприятия': "Events",
        'Абонементы': "Passes",
        'Аренда': "Rental",
        'пространство танца': "a space for dance",
        'Онлайн-запись': "Book online",
        '© Айседора с 2010': "© Isadora since 2010",

        /* ----- заголовки страниц ----- */
        'Айседора — балетная школа': "Isadora — ballet school",
        'О школе — Айседора': "About the school — Isadora",
        'Прайс-лист — Айседора': "Price list — Isadora",
        'Интерьер студии — Айседора': "Studio interior — Isadora",
        'Направления — Айседора': "Classes — Isadora",
        'Педагоги — Айседора': "Teachers — Isadora",
        'Записаться — Айседора': "Booking — Isadora",
        'Расписание — Айседора': "Timetable — Isadora",
        'Контакты — Айседора': "Contacts — Isadora",
        'Мероприятия — Айседора': "Events — Isadora",
        'Абонементы — Айседора': "Passes — Isadora",
        'Аренда — Айседора': "Hall rental — Isadora",

        /* ----- прайс-лист ----- */
        'Разовые занятия, абонементы и аренда зала': "Single classes, passes and hall rental",
        'Цена указана за один час. При покупке трёх занятий — скидка 10%, использовать их можно в течение двух недель.':
            "The price is for one hour. Buy three classes and get 10% off; they can be used within two weeks.",
        'К абонементу на 16 часов — бесплатная пауза на 2 недели, один раз':
            "The 16-hour pass comes with one free two-week pause",
        '10% на первый абонемент, если купить его в день пробного занятия':
            "10% off your first pass if you buy it on the day of your trial class",
        'На утренние часы действует скидка — уточняйте по телефону.':
            "Morning hours come at a discount — ask us by phone.",
        'Одно занятие идёт 55 минут': "One class lasts 55 minutes",
        'Месяц со дня активации': "One month from the day it is activated",
        'Скидка новичкам': "Discount for newcomers",
        'Срок абонемента': "How long a pass lasts",
        'Длительность': "Length",
        'Заморозка': "Pause",
        'Условия': "Terms",
        'Разовые занятия': "Single classes",
        'Разовое занятие': "Single class",
        'Разовое посещение': "Single visit",
        'Пробное занятие': "Trial class",
        'Индивидуальные занятия': "One-to-one classes",
        'Неделя дебюта': "Debut week",
        'три занятия': "three classes",
        '1 человек': "1 person",
        '2 человека': "2 people",
        'Ребёнок': "Child",
        'до 16 лет': "under 16",
        'Детям': "For children",
        'Абонемент на 4 часа': "4-hour pass",
        'Абонемент на 8 часов': "8-hour pass",
        '4 часа': "4 hours",
        '8 часов': "8 hours",
        '12 часов': "12 hours",
        '16 часов': "16 hours",
        '1 000 ₽ за час': "1,000 ₽ per hour",
        '1 150 ₽ за час': "1,150 ₽ per hour",
        '875 ₽ за час': "875 ₽ per hour",
        '967 ₽ за час': "967 ₽ per hour",
        '/час': "/hour",
        'от 1 300 ₽': "from 1,300 ₽",
        'от 2 000 ₽': "from 2,000 ₽",
        'Записаться на занятие': "Book a class",
        'Записаться на класс': "Book a class",

        /* ----- аренда и залы ----- */
        'Аренда зала': "Hall rental",
        'Залы для репетиций, съёмок и мероприятий': "Halls for rehearsals, filming and events",
        'Минимальная аренда — 1 час': "Minimum rental — 1 hour",
        'Минимальная аренда — 2 часа': "Minimum rental — 2 hours",
        'Для индивидуальных занятий': "For one-to-one classes",
        'Забронировать зал': "Book a hall",
        'Большой зал': "Big hall",
        'Малый зал': "Small hall",
        'Зеркальный зал': "Mirror hall",
        'Раздевалка': "Changing room",
        'Большой зал · 120 м²': "Big hall · 120 m²",
        'Малый зал · 60 м²': "Small hall · 60 m²",
        'Зеркальный зал · 80 м²': "Mirror hall · 80 m²",
        '120 м², до 25 человек': "120 m², up to 25 people",
        '60 м², до 10 человек': "60 m², up to 10 people",
        '80 м², до 15 человек': "80 m², up to 15 people",

        /* ----- интерьер ----- */
        'Интерьер студии': "Studio interior",
        'Три зала, созданных для танца': "Three halls made for dance",
        'Что внутри': "What is inside",
        'Зеркала во всю стену': "Mirrors along the whole wall",
        'Профессиональные станки на двух уровнях': "Professional barres at two heights",
        'Станки на двух уровнях': "Barres at two heights",
        'Звук': "Sound",
        'Акустическая система и рояль в большом зале': "A sound system and a grand piano in the big hall",
        'Рояль и акустика': "Grand piano and sound",
        'Комфорт': "Comfort",
        'Тёплый пол, вентиляция, душевые и зона отдыха': "Underfloor heating, ventilation, showers and a lounge",

        /* ----- мероприятия ----- */
        'Мастер-класс: современный танец': "Masterclass: contemporary dance",
        'Открытый урок классики': "Open classical ballet class",
        'Отчётный концерт студии': "The studio’s end-of-season concert",
        'Выступление всех групп сезона. Приглашаем родителей и друзей.':
            "Every group of the season on stage. Parents and friends welcome.",
        'Мастер-классы, концерты и открытые уроки': "Masterclasses, concerts and open classes",
        'Записаться на мероприятие': "Sign up for the event",
        '17:00 · Большой зал · вход свободный': "17:00 · Big hall · free entry",
        '18:30 · Зеркальный зал · 2.000₽': "18:30 · Mirror hall · 2,000 ₽",
        '19:00 · Большой зал · бесплатно': "19:00 · Big hall · free",
        'марта': "March",
        'апреля': "April",

        /* ----- запись и контакты ----- */
        'Оставьте заявку — мы обязательно вам перезвоним': "Leave a request and we will call you back",
        'Имя': "Name",
        'Телефон': "Phone",
        'Направление': "Class",
        'Комментарий': "Comment",
        'Другое': "Other",
        'Отправить заявку': "Send the request",
        'Нажимая кнопку, вы соглашаетесь на обработку персональных данных.':
            "By pressing the button you agree to the processing of your personal data.",
        'Написать нам в Instagram': "Message us on Instagram",
        'Адрес': "Address",
        'Почта': "Email",
        'Часы работы': "Opening hours",
        'Будни · 11:00 — 21:00': "Weekdays · 11:00 — 21:00",
        'Выходные · 11:00 — 17:00': "Weekends · 11:00 — 17:00",
        'г. Санкт-Петербург, ул. Пестеля, д. 13/15': "St. Petersburg, 13/15 Pestelya Street",
        'Как нас найти': "How to find us",
        'Ждём вас в студии': "We are waiting for you at the studio",
        'Для взрослых с любым уровнем подготовки. Знакомство со студией и педагогами.':
            "For adults at any level. A first look at the studio and its teachers.",

        /* ----- подписи для экранных читалок и картинок ----- */
        'Айседора': "Isadora",
        'ВКонтакте': "VKontakte",
        'Меню': "Menu",
        'Закрыть': "Close",
        'Как к вам обращаться': "What should we call you",
        'Удобное время, вопросы': "A convenient time, questions",
        'Оценка 5 из 5': "Rated 5 out of 5",
        'Предыдущий отзыв': "Previous review",
        'Следующий отзыв': "Next review",
        'Предыдущий педагог': "Previous teacher",
        'Следующий педагог': "Next teacher",
        'События, прокрутите вбок': "Events, scroll sideways",
        'Фотографии залов, прокрутите вбок': "Photos of the halls, scroll sideways",
        'Руки пианистки на клавишах рояля': "A pianist’s hands on the keys of a grand piano",
        'Айседора на карте — ул. Пестеля, 13/15': "Isadora on the map — 13/15 Pestelya Street",

        /* ----- то, что собирает сам сценарий ----- */
        'Заявка с сайта': "Request from the website",
        'Заявка готова. Скопируйте текст ниже и пришлите его нам в Instagram.':
            "Your request is ready. Copy the text below and send it to us on Instagram.",
        'Заявка готова и скопирована. Откройте наш Instagram, нажмите «Написать сообщение» и вставьте её — мы ответим.':
            "Your request is ready and copied. Open our Instagram, tap “Message” and paste it — we will reply."
    };

    /* В словаре ключи записаны обычными пробелами, а в вёрстке стоят
       неразрывные пробелы и переносы строк — приводим к одному виду. */
    function norm(s) {
        return s.replace(/\s+/g, ' ').trim();
    }

    var lang = 'ru';
    var stored = null;
    try { stored = localStorage.getItem(KEY); } catch (e) {}
    if (stored === 'en') lang = 'en';

    function translate(s) {
        if (lang === 'ru') return s;
        return DICT[norm(s)] || s;
    }

    /* Перевод всей страницы: сначала надписи, потом подписи в атрибутах. */
    function apply() {
        var walker = document.createTreeWalker(
            document.documentElement,
            NodeFilter.SHOW_TEXT,
            {
                acceptNode: function (node) {
                    var parent = node.parentNode;
                    if (!parent) return NodeFilter.FILTER_REJECT;
                    var tag = parent.nodeName.toLowerCase();
                    if (tag === 'script' || tag === 'style' || tag === 'svg' || tag === 'path') {
                        return NodeFilter.FILTER_REJECT;
                    }
                    return node.nodeValue.trim() ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;
                }
            }
        );

        var nodes = [];
        while (walker.nextNode()) nodes.push(walker.currentNode);

        nodes.forEach(function (node) {
            /* пробелы по краям — это отступы разметки, их сохраняем */
            var parts = /^(\s*)([\s\S]*?)(\s*)$/.exec(node.nodeValue);
            var en = DICT[norm(parts[2])];
            if (en) node.nodeValue = parts[1] + en + parts[3];
        });

        var attrs = ['placeholder', 'aria-label', 'alt', 'title', 'content'];
        Array.prototype.forEach.call(document.querySelectorAll('*'), function (el) {
            attrs.forEach(function (name) {
                if (!el.hasAttribute(name)) return;
                var en = DICT[norm(el.getAttribute(name))];
                if (en) el.setAttribute(name, en);
            });
        });

        document.documentElement.lang = 'en';
    }

    /* Кнопки RU / EN внизу бургер-меню. Активная набрана плотнее и залита
       фирменным красным, поэтому выбранный язык виден сразу. */
    function buttons() {
        var foot = document.querySelector('.menu-foot');
        if (!foot || foot.querySelector('.menu-lang')) return;

        var box = document.createElement('div');
        box.className = 'menu-lang';

        [['ru', 'RU'], ['en', 'EN']].forEach(function (pair) {
            var button = document.createElement('button');
            button.type = 'button';
            button.className = 'menu-lang-btn' + (pair[0] === lang ? ' active' : '');
            button.lang = 'en';
            button.textContent = pair[1];
            button.setAttribute('aria-pressed', pair[0] === lang ? 'true' : 'false');
            button.addEventListener('click', function () { switchTo(pair[0]); });
            box.appendChild(button);
        });

        foot.insertBefore(box, foot.firstChild);
    }

    /* Переключение перезагружает страницу: к моменту нажатия заголовки уже
       разобраны по словам, карусели размножили карточки — проще начать
       страницу заново, чем доводить до нужного языка каждую копию. */
    function switchTo(code) {
        if (code === lang) return;

        var saved = false;
        try {
            localStorage.setItem(KEY, code);
            saved = localStorage.getItem(KEY) === code;
        } catch (e) {}

        if (saved) {
            location.reload();
            return;
        }

        /* Память браузера закрыта настройками. Тогда переводим на месте: без
           перезагрузки выбор не сохранится, но кнопка хотя бы не мертва.
           Заголовки к этому времени разобраны по словам — собираем обратно,
           иначе словарь не узнает фразу. */
        if (code === 'en') {
            Array.prototype.forEach.call(document.querySelectorAll('.rv-word'), function (word) {
                var host = word.parentNode;
                if (host) host.textContent = norm(host.textContent);
            });
            lang = 'en';
            apply();
            Array.prototype.forEach.call(document.querySelectorAll('.menu-lang-btn'), function (b) {
                var on = b.textContent.toLowerCase() === 'en';
                b.classList.toggle('active', on);
                b.setAttribute('aria-pressed', on ? 'true' : 'false');
            });
        } else {
            location.reload();
        }
    }

    /* Сценарий подключён в конце страницы, разметка уже на месте: переводим
       сразу, до DOMContentLoaded, — иначе заголовки успеют разобраться по
       словам по-русски. */
    if (lang === 'en') apply();
    buttons();

    /* script.js собирает текст заявки сам — ему нужен доступ к словарю */
    window.isadoraI18n = { lang: lang, t: translate };
})();
