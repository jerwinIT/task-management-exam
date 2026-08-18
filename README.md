# Task Management Application

A fullstack task management application built as part of a practical fullstack development assessment.

The application allows users to create, manage, search, filter, and persist tasks through a Next.js frontend, NestJS REST API, Prisma ORM, and Supabase PostgreSQL database.

## Features

- Create tasks
- Edit task title and description
- Mark tasks as Completed or Incomplete
- Delete tasks
- Search tasks by title and description
- Filter tasks by:
  - All Tasks
  - Incomplete
  - Completed

- Combine search and status filtering
- Request validation
- API error handling
- Task not found handling
- PostgreSQL data persistence

> Authentication, due dates, categories, priorities, and other features outside the assessment requirements are intentionally not included.

---

## Tech Stack

### Frontend

- Next.js
- React
- TypeScript
- Tailwind CSS

### Backend

- NestJS
- TypeScript
- Prisma ORM
- PostgreSQL

### Database

- Supabase PostgreSQL
- Prisma ORM
- Prisma PostgreSQL adapter

### Development & Testing

- Git / GitHub
- Postman
- ESLint
- Prettier

---

## Architecture

The application follows a client-server architecture.

```text
┌────────────────────────────┐
│          Next.js           │
│          Frontend          │
│                            │
│  Task List                 │
│  Task Form                 │
│  Search                    │
│  Status Filters            │
└──────────────┬─────────────┘
               │
               │ REST API
               ▼
┌────────────────────────────┐
│          NestJS            │
│          Backend           │
│                            │
│  TasksController           │
│  TasksService              │
│  DTO Validation            │
└──────────────┬─────────────┘
               │
               │ Prisma ORM
               ▼
┌────────────────────────────┐
│     Supabase PostgreSQL    │
│                            │
│          Task              │
│          Table             │
└────────────────────────────┘
```

### Request Flow

For example, when creating a task:

```text
User
 │
 ▼
Next.js Task Form
 │
 │ POST /tasks
 ▼
NestJS TasksController
 │
 ▼
TasksService
 │
 ▼
PrismaService
 │
 ▼
Supabase PostgreSQL
 │
 ▼
Created Task
 │
 ▼
Next.js UI
```

---

## Project Structure

```text
task-management/
│
├── frontend/
│   ├── app/
│   ├── components/
│   ├── lib/
│   ├── types/
│   ├── public/
│   └── package.json
│
├── backend/
│   ├── src/
│   │   ├── tasks/
│   │   │   ├── dto/
│   │   │   │   ├── create-task.dto.ts
│   │   │   │   ├── update-task.dto.ts
│   │   │   │   └── task-query.dto.ts
│   │   │   ├── tasks.controller.ts
│   │   │   ├── tasks.service.ts
│   │   │   └── tasks.module.ts
│   │   │
│   │   ├── prisma/
│   │   │   └── prisma.module.ts
│   │   │
│   │   ├── prisma.service.ts
│   │   ├── app.module.ts
│   │   └── main.ts
│   │
│   ├── prisma/
│   │   └── schema.prisma
│   │
│   └── package.json
│
├── README.md
└── .gitignore
```

---

## Database

The application uses **PostgreSQL hosted on Supabase**, with Prisma ORM handling database access.

The database contains a `Task` model.

### Task Model

| Field         | Type     | Description               |
| ------------- | -------- | ------------------------- |
| `id`          | UUID     | Unique task identifier    |
| `title`       | String   | Task title                |
| `description` | String?  | Optional task description |
| `completed`   | Boolean  | Completion status         |
| `createdAt`   | DateTime | Task creation timestamp   |
| `updatedAt`   | DateTime | Last update timestamp     |

New tasks are created with:

```text
completed = false
```

The `id` is automatically generated using UUID.

The `createdAt` field is automatically populated when a task is created, while `updatedAt` is automatically updated whenever the task changes.

### Prisma + NestJS Setup

The Prisma integration follows the Prisma guide for using Prisma with NestJS.

The backend uses a dedicated `PrismaService` to provide database access to the application services.

The general database flow is:

```text
NestJS
   ↓
PrismaService
   ↓
PrismaPg Adapter
   ↓
PostgreSQL
   ↓
Supabase
```

The Prisma client is generated from the project's Prisma schema.

---

## Environment Variables

Environment variables are required for both the backend and frontend.

### Backend

Create a `.env` file inside the `backend` directory:

```env
DATABASE_URL="postgresql://postgres.PROJECT_REF:[PASSWORD]@aws-0-REGION.pooler.supabase.com:6543/postgres?pgbouncer=true"
```

Replace the placeholder values with the PostgreSQL connection string provided by Supabase.

The `DATABASE_URL` is used by Prisma to connect the NestJS backend to the Supabase PostgreSQL database.

> Never commit `.env` files or expose database passwords in source control.

### Frontend

Create a `.env.local` file inside the `frontend` directory:

```env
NEXT_PUBLIC_API_URL="http://localhost:5000"
```

This tells the frontend where the NestJS API is running.

> Never commit `.env.local` files containing secrets or environment-specific configuration.

---

## Prerequisites

Make sure the following are installed:

- Node.js
- npm
- Git

You will also need:

- A Supabase project
- A PostgreSQL database provided by Supabase
- The project's database connection string

---

## Installation

Clone the repository:

```bash
git clone <repository-url>
cd task-management
```

The frontend and backend have separate dependencies and must be installed independently.

---

## Backend Setup

Navigate to the backend:

```bash
cd backend
```

Install dependencies:

```bash
npm install
```

Create the backend environment file:

```text
backend/.env
```

Add your Supabase PostgreSQL connection string:

```env
DATABASE_URL="postgresql://postgres.PROJECT_REF:[PASSWORD]@aws-0-REGION.pooler.supabase.com:6543/postgres?pgbouncer=true"
```

Generate the Prisma client:

```bash
npx prisma generate
```

Make sure the database schema is synchronized with the Supabase database according to the project's Prisma schema.

Start the NestJS backend:

```bash
npm run start:dev
```

The backend runs at:

```text
http://localhost:5000
```

---

## Frontend Setup

Open another terminal and navigate to the frontend:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Create:

```text
frontend/.env.local
```

Add:

```env
NEXT_PUBLIC_API_URL="http://localhost:5000"
```

Start the frontend:

```bash
npm run dev
```

The frontend runs at:

```text
http://localhost:3000
```

---

## Running the Application

Both the frontend and backend need to be running.

### Terminal 1 — Backend

```bash
cd backend
npm run start:dev
```

Backend:

```text
http://localhost:5000
```

### Terminal 2 — Frontend

```bash
cd frontend
npm run dev
```

Frontend:

```text
http://localhost:3000
```

Open the frontend in your browser:

```text
http://localhost:3000
```

---

# API Documentation

The backend exposes a REST API under the `/tasks` endpoint.

## CRUD API

| Method   | Endpoint     | Purpose       |
| -------- | ------------ | ------------- |
| `POST`   | `/tasks`     | Create task   |
| `GET`    | `/tasks`     | Get all tasks |
| `GET`    | `/tasks/:id` | Get one task  |
| `PATCH`  | `/tasks/:id` | Update task   |
| `DELETE` | `/tasks/:id` | Delete task   |

### Create Task

```http
POST /tasks
```

Example request body:

```json
{
  "title": "Learn NestJS",
  "description": "Study NestJS modules, controllers, services, and dependency injection"
}
```

The API automatically generates the task ID and timestamps.

New tasks default to:

```json
{
  "completed": false
}
```

### Get All Tasks

```http
GET /tasks
```

Returns all tasks ordered by creation date.

### Get One Task

```http
GET /tasks/:id
```

Example:

```text
GET /tasks/7cc5fc47-53f2-4fc9-982f-9ac3da151f6e
```

If the task does not exist, the API returns a `404 Not Found` response.

### Update Task

```http
PATCH /tasks/:id
```

Example request body:

```json
{
  "completed": true
}
```

Another example:

```json
{
  "title": "Learn NestJS Controllers",
  "description": "Study NestJS controller implementation"
}
```

Only the fields provided in the request are updated.

### Delete Task

```http
DELETE /tasks/:id
```

If the task exists, it is removed from the database.

If the task does not exist, the API returns a `404 Not Found` response.

---

# Search and Filtering

The `GET /tasks` endpoint supports optional search and status query parameters.

| Request                                      | Meaning             |
| -------------------------------------------- | ------------------- |
| `GET /tasks`                                 | All tasks           |
| `GET /tasks?status=all`                      | All tasks           |
| `GET /tasks?status=completed`                | Completed tasks     |
| `GET /tasks?status=incomplete`               | Incomplete tasks    |
| `GET /tasks?search=nestjs`                   | Search tasks        |
| `GET /tasks?search=nestjs&status=completed`  | Search + completed  |
| `GET /tasks?search=nestjs&status=incomplete` | Search + incomplete |

## Search

Search using the `search` query parameter:

```text
GET /tasks?search=nestjs
```

The search checks both the task title and description.

Search is case-insensitive.

For example:

```text
GET /tasks?search=nestjs
```

can match:

```text
Learn NestJS
```

as well as a task whose description contains:

```text
Study NestJS controllers
```

## Status Filtering

### All Tasks

```text
GET /tasks
```

or:

```text
GET /tasks?status=all
```

### Completed Tasks

```text
GET /tasks?status=completed
```

### Incomplete Tasks

```text
GET /tasks?status=incomplete
```

## Search + Status Filtering

Search and filtering can be combined.

For example:

```text
GET /tasks?search=nestjs&status=completed
```

This returns tasks that:

1. Match `nestjs` in the title or description
2. Are marked as completed

Another example:

```text
GET /tasks?search=nestjs&status=incomplete
```

This returns tasks that:

1. Match `nestjs` in the title or description
2. Are still incomplete

---

## Validation & Error Handling

The backend uses request validation to validate incoming task data.

Examples include:

- Required task title
- String validation for title
- Optional string validation for description
- Valid task status filter values
- Task not found handling
- Invalid request handling
- Database/API error handling

### Example Invalid Request

An empty title is rejected:

```json
{
  "title": "",
  "description": "Invalid task"
}
```

The API returns:

```text
400 Bad Request
```

### Task Not Found

Requests involving a task ID that does not exist return:

```text
404 Not Found
```

This applies to:

```text
GET /tasks/:id
PATCH /tasks/:id
DELETE /tasks/:id
```

---

## CORS

The NestJS backend is configured to accept requests from the local Next.js frontend:

```text
http://localhost:3000
```

The backend runs separately on:

```text
http://localhost:5000
```

This allows the frontend and backend to communicate during local development.

---

## Testing

The REST API can be tested using Postman.

Recommended testing flow:

1. Create a task
2. Retrieve all tasks
3. Retrieve a task by ID
4. Update the task
5. Mark the task as completed
6. Mark the task as incomplete
7. Search for tasks
8. Test the completed filter
9. Test the incomplete filter
10. Test the all tasks filter
11. Test search + completed filter
12. Test search + incomplete filter
13. Delete a task
14. Verify the deleted task returns `404`
15. Test invalid input
16. Test non-existent task IDs

---

## Scope

This project intentionally focuses on the requirements of the practical assessment.

### Included

- Task CRUD
- Task completion status
- Search
- Status filtering
- Combined search and filtering
- Request validation
- Error handling
- PostgreSQL persistence
- REST API
- Frontend-backend integration

### Not Included

- Authentication
- User accounts
- Roles and permissions
- Due dates
- Categories
- Priorities
- Tags
- Notifications
- AI features
- Pagination
- Features outside the assessment requirements

---

## Development Principles

The project demonstrates:

- Clear separation between frontend and backend
- RESTful API design
- Separation of controllers and business logic
- Database persistence using Prisma
- Reusable React components
- Type-safe development with TypeScript
- Request validation
- Error handling
- Search and filtering
- Frontend-backend integration
- Simple and maintainable application architecture

---

## Assessment Goal

The primary goal of this project is to demonstrate practical understanding of fullstack development, including:

- Frontend component development
- React state management
- Event handling
- List rendering
- REST API development
- Backend business logic
- Database modeling
- CRUD operations
- Search and filtering
- Request validation
- Error handling
- Database persistence
- Frontend-backend integration
