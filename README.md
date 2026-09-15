# Isadora Website

Полностью настроенный проект для работы с GitHub и Netlify.

## 📋 Структура проекта

```
isadora/
├── index.html           # Главная страница
├── src/
│   ├── styles.css       # Стили
│   └── script.js        # JavaScript
├── netlify.toml         # Конфигурация Netlify
├── package.json         # Зависимости и скрипты
├── vite.config.js       # Конфигурация Vite
├── .gitignore          # Игнорируемые файлы
└── README.md           # Этот файл
```

## 🚀 Начало работы

### 1. Установка зависимостей

```bash
npm install
```

### 2. Локальная разработка

```bash
npm run dev
```

Сайт откроется на `http://localhost:3000`

### 3. Сборка для продакшена

```bash
npm run build
```

Готовый код будет в папке `dist/`

## 🔗 Подключение GitHub к Netlify

### Шаг 1: Залить код на GitHub

```bash
git add .
git commit -m "Initial commit"
git push -u origin claude/github-netlify-setup-3byp1e
```

### Шаг 2: Подключить Netlify

1. Перейди на [netlify.com](https://netlify.com)
2. Нажми "New site from Git"
3. Выбери GitHub и авторизуйся
4. Выбери этот репозиторий
5. Нажми "Deploy site"

Netlify автоматически:
- Установит зависимости (`npm install`)
- Соберет проект (`npm run build`)
- Разместит файлы из папки `dist/`
- Выдаст ссылку на твой сайт

## 🔄 Автоматический деплой

Каждый раз, когда ты будешь делать `git push`, Netlify:
1. Заметит изменения
2. Автоматически соберет новую версию
3. Опубликует обновления на сайте

## 📝 EnvironmentVariables

Если понадобятся переменные окружения:

1. В Netlify зайди в `Site settings` → `Build & deploy` → `Environment`
2. Добавь переменные
3. Сделай новый деплой

## 🛠️ Полезные команды

| Команда | Описание |
|---------|---------|
| `npm install` | Установка зависимостей |
| `npm run dev` | Локальная разработка |
| `npm run build` | Сборка для продакшена |
| `npm run preview` | Предпросмотр собранного сайта |
| `npm run lint` | Проверка кода |

## 📱 Поддержка

- Сайт полностью адаптивный (работает на мобильных, планшетах, ПК)
- Оптимизирован для SEO
- Использует Vite для быстрой разработки

## 📄 Лицензия

MIT

---

**Готово!** Теперь ты можешь:
1. Редактировать `index.html` для изменения контента
2. Менять стили в `src/styles.css`
3. Добавлять функции в `src/script.js`
4. Каждый `git push` автоматически обновит сайт на Netlify
