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
        /* ----- отзывы — говорим так, как говорил бы человек по-английски ----- */
        'Пришла в школу на групповые уроки растяжки. Обнаружила там Варвару Л. и последние два года занимаюсь с ней три раза в неделю индивидуально. Варвара — большой профессионал, составила для меня план тренировок, ни разу не опоздала, занятия всегда продуманы и подготовлены. Обладает абсолютно спортивным характером и мотивирует следовать за ней.':
            "I came for the group stretching classes and found Varvara L. there. For two years now I have trained with her one to one, three times a week. Varvara is a real professional: she built me a training plan, has never once been late, and every class is thought through. She has an athlete’s character, and you want to keep up with her.",
        'Для меня максимально комфортная студия! Приятно прийти сюда после рабочего дня. Красивые, просторные залы. Опытные и талантливые педагоги. Очень нравится направление характерного танца у Варвары и растяжка у Ксении.':
            "The most comfortable studio I know. It is a joy to come here after work — beautiful, spacious halls and teachers who are experienced and genuinely talented. I love Varvara’s character dance and Ksenia’s stretching.",
        'Атмосферное место в центре СПб! Очень красивая, воздушная атмосфера! Изразцовые печки в залах просто шик! Преподаватели приятные, знают своё дело, сразу видно большой опыт. Балетные классы, растяжка — рекомендую.':
            "An atmospheric place in the middle of St Petersburg, beautiful and full of air. The tiled stoves in the halls are something else. The teachers are lovely and clearly know their craft. Ballet classes, stretching — recommended.",
        'Потрясающее место, лучшее в центре города: красивые залы, комфортные раздевалки, ощущение дворцового интерьера, профессиональные преподаватели. Дочь 6,5 лет занимается с удовольствием, цена адекватная.':
            "A wonderful place, the best in the city centre: beautiful halls, comfortable changing rooms, the feel of a palace, professional teachers. My six-and-a-half-year-old daughter loves her classes, and the price is fair.",
        'Удивительное место: историческое здание со своей атмосферой, с хорошим ремонтом, сильные преподаватели по балету. Даже если вы любитель, здесь можно посещать прекрасные классы.':
            "An amazing place — a historic building with a character of its own, beautifully kept, with strong ballet teachers. Even as an amateur you can take wonderful classes here.",

        /* ----- меню и шапка ----- */
        'Главная': "Home",
        'О школе': "About",
        'Прайс-лист': "Prices",
        'Интерьер': "Studio",
        'Направления': "Classes",
        'Педагоги': "Teachers",
        'Записаться': "Book",
        'Расписание': "Timetable",
        'Контакты': "Contact",
        'Мероприятия': "Events",
        'Абонементы': "Passes",
        'Аренда': "Rental",
        'пространство танца': "a space for dance",
        'Онлайн-запись': "Book online",
        '© Айседора с 2010': "© Isadora since 2010",

        /* ----- заголовки страниц — то, что видно в закладке браузера ----- */
        'Айседора — балетная школа': "Isadora — ballet school",
        'О школе — Айседора': "About — Isadora",
        'Прайс-лист — Айседора': "Prices — Isadora",
        'Интерьер студии — Айседора': "Our studio — Isadora",
        'Направления — Айседора': "Classes — Isadora",
        'Педагоги — Айседора': "Teachers — Isadora",
        'Записаться — Айседора': "Book a class — Isadora",
        'Расписание — Айседора': "Timetable — Isadora",
        'Контакты — Айседора': "Contact — Isadora",
        'Мероприятия — Айседора': "Events — Isadora",
        'Абонементы — Айседора': "Passes — Isadora",
        'Аренда — Айседора': "Hall rental — Isadora",

        /* ----- главная ----- */
        '«Айседора» — с 2010 года учим тело говорить': "Isadora — teaching the body to speak since 2010",
        'Станок и пуанты, body ballet и jazz modern': "Barre and pointe, body ballet and jazz modern",
        'Педагоги Мариинского театра и Академии Вагановой':
            "Teachers from the Mariinsky and the Vaganova Academy",
        'С чего начать': "Start here",
        'Познакомьтесь с педагогами, выберите направление и узнайте, сколько стоит заниматься':
            "Meet the teachers, pick a class, see the prices",
        'Узнайте больше о педагогах студии и их подходе к занятиям': "Who teaches here, and how they work",
        'Классика, современный танец и группы для детей': "Classical, contemporary and children’s groups",
        'Абонементы, разовые занятия и аренда залов': "Passes, drop-in classes and hall rental",
        'Подробнее': "See more",
        'Что взять на первый урок': "What to bring to your first class",
        'События в Айседоре': "What’s on at Isadora",
        'Готовы начать свой путь в мире танца?': "Ready to start dancing?",
        'Свяжитесь с нами': "Get in touch",
        'Занимались у нас? Расскажите, как всё прошло.': "Danced with us? Tell us how it went.",
        'Оставить отзыв на Яндекс Картах': "Write a review on Yandex Maps",
        'Отзывы': "Reviews",

        /* ----- о школе ----- */
        '«Айседора» даёт возможность каждому войти в мир, столетиями закрытый от глаз непрофессионалов, и прикоснуться к миру балета.':
            "For centuries ballet stayed closed to outsiders. Isadora opens the door and lets anyone in.",
        'Мы работаем с 2010 года, и за это время накопили колоссальный опыт практики преподавания танцевального искусства.':
            "We have been teaching dance since 2010, and those years have taught us a great deal.",
        'А наши преподаватели — тщательно подобранные и преданные мастера своего дела.':
            "Our teachers are hand-picked masters, devoted to what they do.",
        'Если у Вас в детстве была мечта стать балериной — теперь есть возможность её осуществить!':
            "If you dreamed of being a ballerina as a child, here is your chance.",
        'В расписании школы можно найти не только классический танец у станка и растяжку, но и:':
            "The timetable goes well beyond barre work and stretching:",
        'Философия «Айседоры» — сочетание красоты тела и духа.':
            "Isadora is about the beauty of body and spirit at once.",
        'Руководители': "Who runs the school",
        'Директор школы': "School director",
        'Творческий куратор': "Creative curator",
        'Балетная школа Марии Бархатовой': "Maria Barkhatova’s ballet school",
        'Много лет проработавшая в Мариинском театре и получившая педагогическое образование в Академии Русского балета.':
            "She spent years at the Mariinsky Theatre and trained as a teacher at the Academy of Russian Ballet.",
        'Заслуженный деятель искусств РФ, профессор и педагог классического танца АРБ им. Вагановой.':
            "Honoured Artist of Russia, professor of classical dance at the Vaganova Academy.",
        'Сертификаты': "Gift cards",

        /* ----- педагоги: кто что ведёт — под именем, без «педагог по» ----- */
        'Специализация': "Teaches",
        'Педагог по «РАСТЯЖКА», «BODYBALLET», «БАЛЕТНАЯ ОСАНКА», «ГИБКАЯ СПИНА»':
            "Stretching, Body ballet, Ballet posture, Flexible back",
        'Педагог по классике для продвинутого уровня': "Classical ballet, advanced level",
        'Педагог по классике, bodyballet и растяжке': "Classical ballet, body ballet and stretching",
        'Педагог по классике для начинающих': "Classical ballet for beginners",
        'Педагог по классике и bodyballet': "Classical ballet and body ballet",
        'Педагог по классике и репертуару': "Classical ballet and repertoire",
        'Педагог классики разных уровней': "Classical ballet at every level",
        'Педагог по стретчингу в гамаках': "Stretching in hammocks",
        'Работа с детскими группами': "Children’s groups",
        'Педагог по jazz-modern': "Jazz-modern",
        'Педагог по соло-латине': "Solo Latin",
        'Педагог детских групп': "Children’s groups",
        'Педагог по фортепиано': "Piano",
        'Высокопрофессиональный педагог классического балета с большим опытом работы со студентами разных уровней.':
            "A classical ballet teacher at the top of her craft, at home with students of any level.",
        'Опытный педагог работает с детскими группами, создаёт позитивную и развивающую среду для обучения.':
            "An experienced teacher of children’s groups who makes the class a warm, encouraging place.",
        'Разносторонний педагог с опытом в классическом балете и оздоровительных направлениях.':
            "A wide-ranging teacher, at home both in classical ballet and in the wellness classes.",
        'Опытный педагог, специализирующийся на обучении начинающих классическому балету.':
            "An experienced teacher who takes beginners through classical ballet.",
        'Высоко квалифицированный педагог классического балета для продвинутых учеников.':
            "A highly qualified classical ballet teacher for advanced students.",
        'Опытный педагог с специализацией в области растяжки и оздоровительного балета.':
            "An experienced teacher of stretching and wellness ballet.",
        'Опытный педагог классического балета для продолжающих и продвинутых учеников.':
            "An experienced classical ballet teacher for intermediate and advanced students.",
        'Специалист современного танца, ведёт группы для начинающих и продолжающих.':
            "A contemporary dance specialist; she takes the beginner and intermediate groups.",
        'Педагог классического балета для начинающих с работой над репертуаром.':
            "Classical ballet for beginners, with repertoire work.",
        'Опытный педагог классического балета и оздоровительных направлений.':
            "An experienced teacher of classical ballet and the wellness classes.",
        'Специалист по оздоровительному растяжению с использованием гамаков.':
            "A specialist in wellness stretching, in hammocks.",
        'Профессиональный педагог музыкального мастерства и аккомпанемента.':
            "A professional teacher of musicianship and accompaniment.",
        'Работа с импровизацией и партерной техникой. Приглашённый педагог.':
            "Improvisation and floor technique. Guest teacher.",
        'Разработчик авторской программы по формированию и укреплению мышц.':
            "She wrote the studio’s own programme for shaping and strengthening muscles.",
        'Педагог классического балета с акцентом на репертуарную работу.':
            "Classical ballet, with the accent on repertoire.",
        'Специалист в области латиноамериканских танцев.': "A specialist in Latin American dance.",
        'Познакомиться с педагогами': "Meet the teachers",

        /* ----- имена — латиницей, это имена, а не слова ----- */
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
        'Классический балет': "Classical ballet",
        'Современный танец': "Contemporary dance",
        'Характерный танец': "Character dance",
        'характерный танец': "character dance",
        'Стретчинг в гамаках': "Stretching in hammocks",
        'стретчинг в гамаках': "stretching in hammocks",
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
        'В расписании': "On the timetable",
        'Классика + пуанты, Классика + прыжки, Репертуар (продвинутый уровень)':
            "Classical + pointe, Classical + jumps, Repertoire (advanced)",
        'Классика для продолжающих, Классика для продвинутых, Репертуар':
            "Classical (intermediate), Classical (advanced), Repertoire",
        'Jazz-Modern (группы для начинающих и для продолжающих)':
            "Jazz-Modern (beginner and intermediate groups)",
        'Классика (продолжающие и продвинутые). Подробности уточняйте':
            "Classical (intermediate and advanced). Ask us for details",
        'Растяжка, Bodyballet, Балетная осанка, Гибкая спина':
            "Stretching, Body ballet, Ballet posture, Flexible back",
        'Скульптурирование тела (интенсив раз в год, летом)':
            "Body sculpting (a summer intensive, once a year)",
        'Классика для продолжающих, Bodyballet, Пуанты': "Classical (intermediate), Body ballet, Pointe",
        'Авторская программа «Скульптурирование тела»': "Our own Body sculpting programme",
        'Классика для продолжающих, Репертуар': "Classical (intermediate), Repertoire",
        'Классика для начинающих, Репертуар': "Classical (beginners), Repertoire",
        'Классика, Bodyballet, Растяжка': "Classical, Body ballet, Stretching",
        'Классика для начинающих': "Classical for beginners",
        'Классика — продолжающие': "Classical — intermediate",
        'Классика — продвинутые': "Classical — advanced",
        'Классика — начинающие': "Classical — beginners",
        '3–4 года': "ages 3–4",
        '6–8 лет': "ages 6–8",
        'только летом': "summer only",
        'вторник и четверг, 16:00': "Tuesdays and Thursdays, 16:00",
        'вторник и четверг, 17:30': "Tuesdays and Thursdays, 17:30",

        /* ----- прайс-лист ----- */
        'Разовые занятия, абонементы и аренда зала': "Drop-in classes, passes and hall rental",
        'Условия': "Good to know",
        'Длительность': "Class length",
        'Одно занятие идёт 55 минут': "Every class runs 55 minutes",
        'Срок абонемента': "Pass validity",
        'Месяц со дня активации': "A month from the day you activate it",
        'Скидка новичкам': "First-timer discount",
        '10% на первый абонемент, если купить его в день пробного занятия':
            "10% off your first pass if you buy it on the day of your trial class",
        'Заморозка': "Freeze",
        'К абонементу на 16 часов — бесплатная пауза на 2 недели, один раз':
            "The 16-hour pass can be frozen once, for two weeks, free of charge",
        'Разовые занятия': "Drop-in classes",
        'Пробное занятие': "Trial class",
        'Разовое посещение': "Drop-in class",
        'Разовое занятие': "Drop-in class",
        'Неделя дебюта': "Debut week",
        'три занятия': "three classes",
        '1 000 ₽ за час': "1 000 ₽ an hour",
        '1 150 ₽ за час': "1 150 ₽ an hour",
        '875 ₽ за час': "875 ₽ an hour",
        '967 ₽ за час': "967 ₽ an hour",
        '/час': "/hour",
        'Индивидуальные занятия': "Private lessons",
        '1 человек': "One person",
        '2 человека': "Two people",
        'Ребёнок': "Child",
        'до 16 лет': "under 16",
        'Цена указана за один час. При покупке трёх занятий — скидка 10%, использовать их можно в течение двух недель.':
            "Prices are per hour. Take three lessons and get 10% off — use them within two weeks.",
        'Детям': "For children",
        'Абонемент на 4 часа': "4-hour pass",
        'Абонемент на 8 часов': "8-hour pass",
        '4 часа': "4 hours",
        '8 часов': "8 hours",
        '12 часов': "12 hours",
        '16 часов': "16 hours",
        'Записаться на занятие': "Book a class",
        'Записаться на класс': "Book a class",
        'от 1 300 ₽': "from 1 300 ₽",
        'от 2 000 ₽': "from 2 000 ₽",

        /* ----- аренда и залы ----- */
        'Аренда зала': "Hall rental",
        'Залы для репетиций, съёмок и мероприятий': "Halls for rehearsals, shoots and events",
        'Минимальная аренда — 1 час': "Minimum booking: 1 hour",
        'Минимальная аренда — 2 часа': "Minimum booking: 2 hours",
        'Для индивидуальных занятий': "Good for private lessons",
        'На утренние часы действует скидка — уточняйте по телефону.':
            "Mornings come cheaper — call us for details.",
        'Забронировать зал': "Book a hall",
        'Большой зал': "Large hall",
        'Малый зал': "Small hall",
        'Зеркальный зал': "Mirror hall",
        'Раздевалка': "Changing room",
        'Большой зал · 120 м²': "Large hall · 120 m²",
        'Малый зал · 60 м²': "Small hall · 60 m²",
        'Зеркальный зал · 80 м²': "Mirror hall · 80 m²",
        '120 м², до 25 человек': "120 m², up to 25 people",
        '60 м², до 10 человек': "60 m², up to 10 people",
        '80 м², до 15 человек': "80 m², up to 15 people",

        /* ----- интерьер ----- */
        'Интерьер студии': "Our studio",
        'Три зала, созданных для танца': "Three halls built for dance",
        'Что внутри': "Inside",
        'Зеркала во всю стену': "Full-wall mirrors",
        'Профессиональные станки на двух уровнях': "Professional barres at two heights",
        'Станки на двух уровнях': "Barres at two heights",
        'Звук': "Sound",
        'Акустическая система и рояль в большом зале': "A sound system, and a grand piano in the large hall",
        'Рояль и акустика': "Grand piano and sound",
        'Комфорт': "Comfort",
        'Тёплый пол, вентиляция, душевые и зона отдыха':
            "Underfloor heating, ventilation, showers and a lounge",

        /* ----- события ----- */
        'Мастер-класс: современный танец': "Masterclass: contemporary dance",
        'Открытый урок классики': "Open classical class",
        'Отчётный концерт студии': "End-of-season show",
        'Выступление всех групп сезона. Приглашаем родителей и друзей.':
            "Every group of the season on stage. Bring parents and friends.",
        'Мастер-классы, концерты и открытые уроки': "Masterclasses, concerts and open classes",
        'Записаться на мероприятие': "Sign up",
        '17:00 · Большой зал · вход свободный': "17:00 · Large hall · free entry",
        '18:30 · Зеркальный зал · 2.000₽': "18:30 · Mirror hall · 2 000 ₽",
        '19:00 · Большой зал · бесплатно': "19:00 · Large hall · free",
        'марта': "March",
        'апреля': "April",

        /* ----- расписание ----- */
        'Актуальное расписание занятий': "The current timetable",
        'Расписание наших классов и групп можно найти в нашем телеграм-канале. Там мы регулярно обновляем информацию о времени занятий, расписании педагогов и специальных мероприятиях.':
            "Our timetable lives in our Telegram channel. We keep it up to date there — class times, who is teaching, and anything special coming up.",
        'Переходите в канал, чтобы не пропустить важные обновления и всегда быть в курсе всех изменений в расписании.':
            "Join the channel and no change will pass you by.",
        'Расписание занятий и все изменения публикуем в телеграм-канале':
            "We post the timetable and every change in our Telegram channel",
        'Перейти в телеграм-канал': "Open the Telegram channel",

        /* ----- запись и контакты ----- */
        'Оставьте заявку — мы обязательно вам перезвоним': "Send us a note and we will call you back",
        'Имя': "Name",
        'Телефон': "Phone",
        'Направление': "Class",
        'Комментарий': "Message",
        'Другое': "Something else",
        'Отправить заявку': "Send",
        'Нажимая кнопку, вы соглашаетесь на обработку персональных данных.':
            "By sending this you agree to our handling of your personal data.",
        'Написать нам в Instagram': "Message us on Instagram",
        'Адрес': "Address",
        'Почта': "Email",
        'Часы работы': "Opening hours",
        'Будни · 11:00 — 21:00': "Weekdays · 11:00 — 21:00",
        'Выходные · 11:00 — 17:00': "Weekends · 11:00 — 17:00",
        'г. Санкт-Петербург, ул. Пестеля, д. 13/15': "13/15 Pestelya Street, St Petersburg",
        'Как нас найти': "Finding us",
        'Ждём вас в студии': "See you at the studio",
        'Для взрослых с любым уровнем подготовки. Знакомство со студией и педагогами.':
            "For adults at any level — a first look at the studio and the teachers.",

        /* ----- подписи для картинок и экранных читалок ----- */
        'Айседора': "Isadora",
        'ВКонтакте': "VKontakte",
        'Меню': "Menu",
        'Закрыть': "Close",
        'Как к вам обращаться': "Your name",
        'Удобное время, вопросы': "A good time to call, questions",
        'Оценка 5 из 5': "Five out of five",
        'Предыдущий отзыв': "Previous review",
        'Следующий отзыв': "Next review",
        'Предыдущий педагог': "Previous teacher",
        'Следующий педагог': "Next teacher",
        'События, прокрутите вбок': "Events — swipe sideways",
        'Фотографии залов, прокрутите вбок': "Photos of the halls — swipe sideways",
        'Руки пианистки на клавишах рояля': "A pianist’s hands on the keys of a grand piano",
        'Айседора на карте — ул. Пестеля, 13/15': "Isadora on the map — 13/15 Pestelya Street",

        /* ----- то, что собирает сам сценарий ----- */
        'Заявка с сайта': "Enquiry from the website",
        'Заявка готова. Скопируйте текст ниже и пришлите его нам в Instagram.':
            "Copy the text below and send it to us on Instagram.",
        'Заявка готова и скопирована. Откройте наш Instagram, нажмите «Написать сообщение» и вставьте её — мы ответим.':
            "Copied. Open our Instagram, tap “Message”, paste it — and we will reply.",

        /* ----- название страницы и описание для поиска и мессенджеров ----- */
        'Айседора — балетная школа в Санкт-Петербурге': "Isadora — a ballet school in St Petersburg",
        'уточняйте': "ask us",
        'по телефону': "by phone",
        'ru_RU': "en_GB",
        'Балетная школа «Айседора» в центре Петербурга: классика и пуанты, body ballet, jazz modern, растяжка. Педагоги Мариинского театра и Академии Вагановой.':
            "Isadora ballet school in central St Petersburg: classical and pointe, body ballet, jazz modern, stretching. Teachers from the Mariinsky and the Vaganova Academy.",
        'О школе «Айседора»: с 2010 года учим танцу взрослых и детей. Руководители школы, её философия и направления занятий.':
            "About Isadora: we have been teaching adults and children to dance since 2010. Who runs the school, what it believes in, and what you can study.",
        'Прайс-лист «Айседоры»: пробное занятие, разовые занятия, абонементы, индивидуальные занятия, занятия для детей и аренда залов.':
            "The Isadora price list: trial class, drop-in classes, passes, private lessons, classes for children and hall rental.",
        'Интерьер студии «Айседора»: залы для танца, зеркала во всю стену, станки на двух уровнях, рояль и акустика, душевые и зона отдыха.':
            "Inside the Isadora studio: halls built for dance, full-wall mirrors, barres at two heights, a grand piano and a sound system, showers and a lounge.",
        'Направления в «Айседоре»: классический балет, пуанты, репертуар, body ballet, растяжка, jazz modern, характерный танец, соло-латина и группы для детей.':
            "Classes at Isadora: classical ballet, pointe, repertoire, body ballet, stretching, jazz modern, character dance, solo Latin and groups for children.",
        'Педагоги балетной школы «Айседора»: преподаватели Мариинского театра и Академии Вагановой — классика, современный танец, растяжка, работа с детьми.':
            "The teachers of the Isadora ballet school: they come from the Mariinsky and the Vaganova Academy — classical, contemporary dance, stretching and work with children.",
        'Запись на занятия в балетную школу «Айседора». Оставьте заявку — мы перезвоним. Телефон +7 911 000 57 55.':
            "Book a class at the Isadora ballet school. Send us a note and we will call you back. Phone +7 911 000 57 55.",
        'Расписание занятий балетной школы «Айседора» — в нашем телеграм-канале, там же все изменения.':
            "The timetable of the Isadora ballet school lives in our Telegram channel, along with every change to it.",
        'Контакты «Айседоры»: Санкт-Петербург, ул. Пестеля, 13/15. Телефон +7 911 000 57 55, часы работы и как нас найти.':
            "Isadora: 13/15 Pestelya Street, St Petersburg. Phone +7 911 000 57 55, opening hours and how to find us.",
        'Мероприятия «Айседоры»: мастер-классы, концерты и открытые уроки.':
            "What’s on at Isadora: masterclasses, concerts and open classes.",
        'Абонементы балетной школы «Айседора».': "Passes at the Isadora ballet school.",
        'Аренда залов «Айседоры» для репетиций, съёмок и мероприятий в центре Петербурга.':
            "Hall rental at Isadora for rehearsals, shoots and events in central St Petersburg."
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
