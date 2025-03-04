# AuthQuote

AuthQuote — это веб-приложение для аутентификации и работы с цитатами известных личностей. Включает в себя авторизацию, профиль пользователя и систему получения случайных цитат.

## 🚀 Функциональность

- Авторизация пользователя (mock API)
- Хранение токена в cookies
- Защищённые маршруты (Protected Routes)
- Запрос и отображение цитат

## 🛠️ Технологии

### **Frontend:**

- React + TypeScript
- React Router
- React Query
- Axios (для запросов к API)
- Ant Design (UI библиотека)

### **Backend:**

- Express.js
- CORS, Cookie-Parser
- Файловое хранилище сессий (`sessions.json`)

## 📂 Установка и запуск

### **1. Клонирование репозитория**

```sh
git clone https://github.com/AlekseiBarenkov/auth-quote.git
cd auth-quote
```

### **2. Установка зависимостей**

```sh
npm install
cd client && npm install
cd ../server && npm install
```

### **3. Запуск в режиме разработки**

```sh
cd ..
npm run dev
```

(одновременно запустится `client` и `server`)

## 🛡️ API Эндпоинты

### **Аутентификация**

- `POST /auth/login` — вход (токен в cookies)
- `DELETE /auth/logout` — выход

### **Компания**

- `GET /info` — получение данных о компании

### **Профиль**

- `GET /user/profile` — получение данных пользователя

### **Цитаты**

- `GET /quotes/author` — случайный автор
- `GET /quotes/quote?authorId=[id]` — случайная цитата
