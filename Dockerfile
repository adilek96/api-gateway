# Этап сборки
FROM node:22-alpine as build

WORKDIR /app

# Копируем package.json и устанавливаем зависимости
COPY package*.json ./
RUN npm ci

# Копируем исходный код
COPY . .

# Генерируем клиента Prisma с поддержкой разных версий OpenSSL
RUN npx prisma generate

# Сборка проекта
RUN npm run build

# Этап продакшн
FROM node:22-alpine

WORKDIR /app

# Копируем необходимые файлы из этапа сборки
COPY --from=build /app/dist ./dist
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/package*.json ./
COPY --from=build /app/prisma ./prisma

ENV NODE_ENV=production

# Явно указываем, что используем только порт 4002
EXPOSE 4000

# Запускаем приложение из dist/src/main
CMD ["node", "dist/main.js"]
