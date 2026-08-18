# Task Management Application

A fullstack task management application built as part of a practical fullstack development assessment.

The application allows users to create, manage, search, filter, and persist tasks through a React/Next.js frontend, NestJS REST API, Prisma ORM, and PostgreSQL database.

## Features

- Create a task
- Edit task title and description
- Mark tasks as Completed or Incomplete
- Delete tasks
- Search tasks by title
- Filter tasks by:
  - All Tasks
  - Incomplete
  - Completed

- Combine search and filtering
- Input validation
- API error handling
- PostgreSQL data persistence

> Authentication, due dates, categories, priorities, and other features outside the assessment requirements are intentionally not included.

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

### Development & Testing

- Git / GitHub
- Postman
- ESLint
- Prettier

## Architecture

The application follows a simple client-server architecture:

```text
┌─────────────────────────┐
│       Next.js           │
│       Frontend          │
│                         │
│  Task List              │
│  Task Form              │
│  Search                 │
│  Filters                │
└────────────┬────────────┘
             │
             │ REST API
             ▼
┌─────────────────────────┐
│        NestJS           │
│        Backend          │
│                         │
│  Controller             │
│  Service                │
│  DTO Validation         │
└────────────┬────────────┘
             │
             │ Prisma ORM
             ▼
┌─────────────────────────┐
│      PostgreSQL         │
│                         │
│         Task            │
│         Table           │
└─────────────────────────┘
```

### Request Flow

For example, when creating a task:

```text
User
 │
 ▼
Next.js Form
 │
 │ POST /tasks
 ▼
NestJS Controller
 │
 ▼
Tasks Service
 │
 ▼
Prisma
 │
 ▼
PostgreSQL
 │
 ▼
Created Task
 │
 ▼
Next.js UI
```

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
│   │   │   ├── tasks.controller.ts
│   │   │   ├── tasks.service.ts
│   │   │   └── tasks.module.ts
│   │   │
│   │   ├── app.module.ts
│   │   └── main.ts
│   │
│   ├── prisma/
│   │   └── schema.prisma
│   └── package.json
│
├── README.md
└── .gitignore
```

## Database

The application uses PostgreSQL with Prisma ORM.

### Task Model

| Field         | Type     | Description               |
| ------------- | -------- | ------------------------- |
| `id`          | UUID     | Unique task identifier    |
| `title`       | String   | Task title                |
| `description` | String?  | Optional task description |
| `completed`   | Boolean  | Completion status         |
| `createdAt`   | DateTime | Task creation timestamp   |
| `updatedAt`   | DateTime | Last update timestamp     |

New tasks are created with `completed` set to `false` by default.

## API Endpoints

| Method   | Endpoint     | Description         |
| -------- | ------------ | ------------------- |
| `POST`   | `/tasks`     | Create a task       |
| `GET`    | `/tasks`     | Get tasks           |
| `GET`    | `/tasks/:id` | Get a specific task |
| `PATCH`  | `/tasks/:id` | Update a task       |
| `DELETE` | `/tasks/:id` | Delete a task       |

### Search

Tasks can be searched using the `search` query parameter:

```text
GET /tasks?search=react
```

### Filtering

Filter by completion status:

```text
GET /tasks?status=completed
```

```text
GET /tasks?status=incomplete
```

To retrieve all tasks:

```text
GET /tasks
```

### Search + Filter

Search and filtering can be combined:

```text
GET /tasks?search=react&status=completed
```

This returns only completed tasks whose title matches the search term.

## Environment Variables

### Backend

Create a `.env` file inside the `backend` directory:

```env
DATABASE_URL="postgresql://USERNAME:PASSWORD@HOST:PORT/DATABASE_NAME"
```

Replace the values with your local PostgreSQL credentials.

### Frontend

Create a `.env.local` file inside the `frontend` directory:

```env
NEXT_PUBLIC_API_URL="http://localhost:3001"
```

Adjust the URL if the backend runs on a different port.

> Do not commit `.env` or `.env.local` files containing credentials or secrets.

## Prerequisites

Make sure the following are installed:

- Node.js
- npm
- PostgreSQL
- Git

## Installation

Clone the repository and navigate to the project:

```bash
git clone <repository-url>
cd task-management
```

### Backend Setup

Navigate to the backend:

```bash
cd backend
```

Install dependencies:

```bash
npm install
```

Configure the `.env` file with your PostgreSQL connection.

Run the Prisma migration:

```bash
npx prisma migrate dev
```

Start the backend:

```bash
npm run start:dev
```

The backend should be available at:

```text
http://localhost:3001
```

### Frontend Setup

Open another terminal and navigate to the frontend:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Configure `.env.local`:

```env
NEXT_PUBLIC_API_URL="http://localhost:3001"
```

Start the frontend:

```bash
npm run dev
```

The frontend should be available at:

```text
http://localhost:3000
```

## Running the Application

You need both the frontend and backend running.

### Terminal 1 — Backend

```bash
cd backend
npm run start:dev
```

### Terminal 2 — Frontend

```bash
cd frontend
npm run dev
```

Then open the frontend in your browser:

```text
http://localhost:3000
```

## Validation & Error Handling

The backend validates incoming request data before processing it.

Examples of handled cases include:

- Empty task title
- Invalid request data
- Task not found
- Failed API requests
- Database/API errors

The frontend provides appropriate loading and error states when communicating with the backend.

## Testing

The REST API can be tested using Postman.

Recommended API test flow:

1. Create a task
2. Retrieve all tasks
3. Retrieve a task by ID
4. Update the task
5. Mark the task as completed
6. Mark the task as incomplete
7. Search for the task
8. Test status filters
9. Test search + status filter
10. Delete the task
11. Verify the task no longer exists

## Scope

This project intentionally focuses only on the requirements of the practical assessment.

### Included

- Task CRUD
- Task completion status
- Search
- Filtering
- Search + filtering
- Validation
- Error handling
- PostgreSQL persistence
- REST API

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
- Other features outside the assessment requirements

## Development Principles

The project aims to demonstrate:

- Clear separation between frontend and backend
- RESTful API design
- Separation of controllers and business logic
- Database persistence using Prisma
- Reusable React components
- Type-safe development with TypeScript
- Input validation
- Appropriate error handling
- Simple and maintainable code

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
- Validation and error handling
- Frontend-backend integration
