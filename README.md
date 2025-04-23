# API Gateway для социальной сети

API Gateway - это центральный сервис, объединяющий три микросервиса нашей социальной сети:

- **Auth Service** - аутентификация и авторизация пользователей (GraphQL API)
- **Post Service** - управление постами пользователей (GraphQL API)
- **Media Upload Service** - загрузка и управление медиа-файлами (REST API)

## Технологии

- NestJS - основной фреймворк для разработки
- GraphQL - единое API для клиентских приложений
- Prisma - ORM для взаимодействия с базой данных
- Axios - для взаимодействия с микросервисами через HTTP

## Установка и запуск

1. Установка зависимостей:

```bash
npm install
```

2. Настройка переменных окружения:
   Создайте файл `.env` на основе `.env.example` в корне проекта и укажите настройки подключения к микросервисам.
   Пример файла `.env`:

```
PORT=3000
AUTH_SERVICE_HOST=localhost
AUTH_SERVICE_PORT=3001
POST_SERVICE_HOST=localhost
POST_SERVICE_PORT=3002
MEDIA_UPLOAD_SERVICE_HOST=localhost
MEDIA_UPLOAD_SERVICE_PORT=3003
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/social_network?schema=public"
```

3. Генерация Prisma клиента:

```bash
npx prisma generate
```

4. Запуск API Gateway:

```bash
npm run start:dev
```

## Структура проекта

```
src/
├── gateway/
│   ├── auth-service/        # Интеграция с Auth Service микросервисом (GraphQL API)
│   ├── post-service/        # Интеграция с Post Service микросервисом (GraphQL API)
│   └── media-upload-service/ # Интеграция с Media Upload Service микросервисом (REST API)
├── app.module.ts           # Основной модуль приложения
├── main.ts                 # Точка входа в приложение
└── schema.gql              # Сгенерированная GraphQL схема
```

## GraphQL API

После запуска API Gateway, GraphQL Playground будет доступен по адресу: http://localhost:3000/graphql

## Описание микросервисов

### Auth Service (GraphQL API)

- **Адрес**: http://192.168.100.45:4001/graphql
- **Основные возможности**:
  - Регистрация пользователей
  - Авторизация (email/password, Google, Facebook)
  - Верификация email
  - Управление токенами JWT
  - Выход из системы

### Post Service (GraphQL API)

- **Адрес**: http://192.168.100.45:4002/graphql
- **Основные возможности**:
  - Создание, чтение, обновление, удаление постов
  - Категоризация постов
  - Управление связанными медиафайлами
  - Кэширование через Redis

### Media Upload Service (REST API)

- **Адрес**: http://192.168.100.45:4003/media
- **Основные возможности**:
  - Загрузка изображений и видео
  - Валидация и оптимизация медиафайлов
  - Хранение в MinIO
  - Поддержка пакетной загрузки

> **Важно:** Для загрузки файлов клиенты должны напрямую использовать REST API медиа-сервиса. API Gateway предоставляет только GraphQL методы для получения информации о медиафайлах и их удаления. Это делает процесс загрузки файлов эффективнее, так как файлы не проходят через промежуточные слои.
>
> Основные эндпоинты для загрузки файлов:
>
> - `POST /media/upload` - загрузка одиночного файла
> - `POST /media/upload-multiple` - загрузка нескольких файлов
> - `POST /media/upload-batch` - пакетная загрузка файлов (возвращает информацию о неудачных загрузках)
