# MentorOS

מערכת אישית לניהול לימודים ומסע למציאת עבודה בהייטק, מבוססת RAG על החומר שלך.

## Stack

- **Backend**: Spring Boot 3 + Spring Security + Spring Data JPA + Spring AI
- **Frontend**: React + TypeScript + Vite + TanStack Query
- **Database**: PostgreSQL + pgvector
- **RAG**: OpenAI embeddings + vector search
- **Infrastructure**: Docker Compose

## Features (Roadmap)

### ✅ M0: Skeleton (DONE)
- [x] Spring Boot API skeleton
- [x] JWT Authentication
- [x] React frontend with routing
- [x] Database migrations (Flyway)
- [x] Docker Compose setup

### ✅ M1: Tasks & Planner (DONE)
- [x] Tasks CRUD API
- [x] Task management UI (create/edit/delete)
- [x] Calendar blocks API
- [ ] Weekly planner UI (next)

### 🚧 M2: Study Tracker
- [ ] Courses & Topics
- [ ] Exams tracking
- [ ] Study sessions
- [ ] Question bank with spaced repetition

### 🚧 M3: Job Hunt CRM
- [ ] Applications pipeline (Kanban)
- [ ] Interviews tracking
- [ ] Resume versions
- [ ] Follow-up system

### 🚧 M4: RAG System
- [ ] Document upload & ingestion
- [ ] PDF parsing & chunking
- [ ] Vector embeddings & indexing
- [ ] Assistant with citations
- [ ] Grounded responses

### 🚧 M5: Intelligence
- [ ] Suggestion engine (auto-scheduling)
- [ ] Weekly review & analytics
- [ ] Progress tracking
- [ ] Smart recommendations

## Quick Start

### Prerequisites
- Docker & Docker Compose
- OpenAI API key (for RAG)

### Setup

1. Clone the repository:
```bash
cd mentorios
```

2. Create `.env` file:
```bash
cp .env.example .env
# Edit .env and add your OPENAI_API_KEY and JWT_SECRET
```

3. Start all services:
```bash
docker-compose up --build
```

4. Access the application:
- Frontend: http://localhost:5173
- Backend API: http://localhost:8080
- API Health: http://localhost:8080/api/health

### First Time Setup

1. Register a new account at http://localhost:5173/register
2. Login with your credentials
3. Start exploring!

## Development

### Backend (Spring Boot)
```bash
cd backend
./mvnw spring-boot:run
```

### Frontend (React)
```bash
cd frontend
npm install
npm run dev
```

### Database Migrations
Flyway migrations are located in `backend/src/main/resources/db/migration/`

## Project Structure

```
mentorios/
├── backend/                 # Spring Boot application
│   ├── src/main/
│   │   ├── java/com/mentorios/
│   │   │   ├── config/     # Security, CORS
│   │   │   ├── controller/ # REST endpoints
│   │   │   ├── dto/        # Data Transfer Objects
│   │   │   ├── model/      # JPA entities
│   │   │   ├── repository/ # Data access
│   │   │   ├── security/   # JWT, Auth
│   │   │   ├── service/    # Business logic
│   │   │   └── rag/        # RAG pipeline
│   │   └── resources/
│   │       └── db/migration/  # Flyway SQL migrations
│   └── pom.xml
├── frontend/               # React application
│   ├── src/
│   │   ├── components/    # Reusable components
│   │   ├── pages/         # Route pages
│   │   ├── services/      # API clients
│   │   ├── stores/        # Zustand state
│   │   └── types/         # TypeScript types
│   └── package.json
└── docker-compose.yml
```

## API Endpoints

### Auth
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login (returns JWT)

### Tasks (require Bearer token)
- `GET /api/tasks` - Get all tasks
- `GET /api/tasks/today` - Get today's tasks
- `GET /api/tasks/status/{status}` - Get tasks by status
- `GET /api/tasks/{id}` - Get task by ID
- `POST /api/tasks` - Create new task
- `PUT /api/tasks/{id}` - Update task
- `DELETE /api/tasks/{id}` - Delete task

### Calendar (require Bearer token)
- `GET /api/calendar/week?weekStart={date}` - Get week blocks
- `POST /api/calendar` - Create calendar block
- `DELETE /api/calendar/{id}` - Delete block

### Coming Soon
- Courses, Study tracking, Applications, Interviews, Documents, RAG Assistant

## Technologies

### Backend
- Spring Boot 3.2.1
- Spring Security + JWT
- Spring Data JPA
- Spring AI (RAG)
- PostgreSQL + pgvector
- Flyway (migrations)
- PDFBox (PDF parsing)

### Frontend
- React 18
- TypeScript
- Vite
- React Router
- TanStack Query
- Zustand (state)
- Axios
- Lucide Icons

## Environment Variables

See `.env.example` for required environment variables.

## License

Private project for personal use.

## Roadmap

**✅ M0 - Skeleton**: Spring Boot + React + Auth + DB ✓
**✅ M1 - Tasks**: CRUD API + UI ✓
**🚧 Current**: M1 - Weekly Planner UI
**Next**: M2 (Study) → M3 (Jobs) → M4 (RAG) → M5 (Intelligence)

## What's Working Now

1. **User Registration & Login** - JWT-based authentication
2. **Task Management** - Create, edit, delete, and track tasks
3. **Dashboard** - View all tasks with statistics
4. **Responsive UI** - Hebrew RTL interface

## What's Next

- Weekly calendar view with drag & drop
- Study tracker (courses, exams, question bank)
- Job hunt CRM (applications pipeline, interviews)
- **RAG Assistant** (the core feature - upload documents, get AI answers with citations)
