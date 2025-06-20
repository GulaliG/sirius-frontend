# Sirius AI-психодиагностика (Frontend)

**Деплоймент:** [https://sirius-frontend-beige.vercel.app/](https://sirius-frontend-beige.vercel.app/)

Полнофункциональный прототип SPA на React для AI-психодиагностики детей: от загрузки рисунков до получения детализированного PDF-отчёта.

---

## Описание проекта

Цель: предоставить родителям удобный интерфейс для загрузки трёх рисунков ребёнка, прохождения психодиагностического опроса и получения интерпретации результатов в формате PDF.

Ключевые возможности:

* Интуитивная загрузка и превью изображений
* Адаптивный многосекционный опросник
* Надёжная асинхронная обработка через backend API
* Визуальная обратная связь во время ожидания результатов
* Современные анимации и responsive дизайн

---

## Функциональные модули

1. **Приветственный экран** (`HomePage`)
   — Название теста, краткое введение, кнопка «Начать тест».

2. **Загрузка изображений** (`UploadPage` + `UploadBox`)
   — Три поля загрузки с подписями: «Дом/Дерево/Человек», «Несуществующее животное», «Автопортрет».
   — Предварительный просмотр, проверка формата (jpg, png, pdf) и размера (≤5 МБ), возможность перезагрузки.
   — Активация кнопки «Далее» только после заполнения всех трёх загрузочных полей.
   — Отправка файлов на `/upload` с помощью `FormData`, получение `task_id`.

3. **Анкетирование** (`SurveyPage` + `SurveySection`)
   — Автоматическая загрузка структуры опросника из `questions.json`.
   — Поддержка типов вопросов: шкала частоты, рейтинг 1–5, текстовые поля, emoji-выбор, datepicker (`DateInput`).
   — Валидация обязательных полей: без пропусков нельзя перейти дальше.
   — Отправка ответов на `/submit-survey` вместе с `task_id` в формате JSON.

4. **Проверка статуса отчёта** (`StatusPage`)
   — Polling API `/report/{task_id}` каждые 10 сек. до готовности или тайм-аута (5 минут).
   — Обработка ответов: 404 → повтор, 500 → ошибка.
   — Показ экранов: «Анализ в процессе…», «Отчёт готов», «Ошибка сервера» или «Тайм-аут».

5. **Экран результата** (`ReportResult`)
   — Отображение Markdown-отчёта (ReactMarkdown), кнопки для скачивания и шаринга PDF.

6. **Навигация и анимации**
   — Framer Motion (PageTransition), Preloader при загрузке приложения.

---

## Технический стек и инструментариум

* **React 18+** & Hooks
* **TypeScript**
* **Redux Toolkit** + **Redux Persist**
* **React Router v6**
* **Framer Motion**
* **Tailwind CSS**
* **React Datepicker** (локализация ru)
* **Vite** (HMR, fast build)

Дополнительно: ESLint/Prettier конфигурации, setupProxy для локальной разработки.

---

## Структура проекта

```bash
public/                           # статичные файлы: изображения, видео, шрифты
├─ assets/                        # иконки и изображения компонентов
├─ bg/                            # фоновые видео (bg_video.webm)
└─ fonts/                         # пользовательские шрифты CirceRounded

src/
├─ components/                   # атомарные UI-блоки
│  ├─ DateInput.tsx               #кастомный ReactDatepicker
│  ├─ PageTransition.tsx          # обёртка для анимаций переходов
│  ├─ Preloader.tsx               # экран загрузки при старте
│  ├─ ReportResult.tsx            # вывод Markdown + PDF-кнопки
│  ├─ SurveySection.tsx           # отрисовка блока вопросов
│  ├─ ToastProvider.tsx           # окно уведомлений
│  └─ UploadBox.tsx               # загрузка и превью файла

├─ pages/                        # страницы (роуты)
│  ├─ HomePage.tsx               # стартовый экран
│  ├─ StatusPage.tsx             # экран статуса и результата
│  ├─ SurveyPage.tsx             # экран опросника
│  └─ UploadPage.tsx             # экран загрузки изображений

├─ store/                        # управление состоянием
│  ├─ index.ts                   # конфигурация store + Redux Persist
│  ├─ hooks.ts                   # useAppDispatch/useAppSelector
│  └─ slices/                    # слайсы
│     └─ uploadSlice.ts          # task_id + previews state

├─ types/                        # TS-типизация (AnswerTypes, Section)
├─ questions.json               # структура опросника
├─ App.tsx                       # маршрутизация и global wrappers
├─ main.tsx                      # точка входа ReactDOM
├─ env.d.ts                      # объявление глобальных переменных
└─ index.css                     # глобальные стили и Tailwind imports

vite.config.ts                  # настройки Vite, proxy (upload, submit-survey, report)
README.md                       # эта документация
```

---

## Установка и локальная разработка

1. **Клонирование репозитория**

   ```bash
   git clone https://github.com/GulaliG/sirius-frontend
   cd sirius-frontend
   ```
2. **Установка зависимостей**

   ```bash
   npm install
   # или
   yarn install
   ```
3. **Конфигурация окружения**
   Создайте `.env.development` (и при необходимости `.env.production`):

   ```env
   VITE_API_URL=https://sirius-backend-4wsr.onrender.com
   ```
4. **Запуск dev-сервера**

   ```bash
   npm run dev
   ```
5. **Сборка и просмотр production-bundle**

   ```bash
   npm run build
   npm run serve
   ```

---

## Переменные окружения

| Переменная     | Описание                                                           |
| -------------- | ------------------------------------------------------------------ |
| `VITE_API_URL` | Базовый URL backend API для `/upload`, `/submit-survey`, `/report` |

---

## Обработка ошибок и уведомления

* **Клиентская валидация**: проверка формата и размера изображений до отправки.
* **React Toastify** (или аналог) для toast-уведомлений о статусе/ошибках.
* **Inline fallback**: если toast не доступен, показываем баннер под формой.
* **Network error handling**: дружелюбные сообщения при 404/500 и тайм-аутах.

---

## Доступность (A11Y)

* Все интерактивные элементы имеют `aria-label` и поддерживают keyboard-nav.
* Контраст текста и кнопок соответствует WCAG AA.
* Семантические теги (`<main>`, `<section>`, `<button>`) используются для улучшения доступности.

---

Made by **GulaliG**, © 2025
