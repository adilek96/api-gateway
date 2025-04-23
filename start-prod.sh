#!/bin/bash

# Сборка проекта
echo "Building the project..."
npm run build

# Генерация Prisma клиента
echo "Generating Prisma client..."
npx prisma generate

# Запуск в production режиме
echo "Starting in production mode..."
NODE_ENV=production node dist/main.js 