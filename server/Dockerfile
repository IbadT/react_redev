# Используем официальный образ Node.js
FROM node:18-alpine

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем package.json и package-lock.json (или yarn.lock)
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем исходный код приложения
COPY . .

# Собираем приложение (если используется TypeScript)
RUN npm run build

# Открываем порт, на котором работает приложение
EXPOSE 3000

# Команда для запуска приложения
# "start:dev": "nodemon",
# CMD ["nodemon", "src/main.ts"]

# "start:dev": "nest start --watch",
CMD ["npm", "run", "start:dev"]