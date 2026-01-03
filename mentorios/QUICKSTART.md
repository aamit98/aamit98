# Quick Start Guide - MentorOS

## Prerequisites

1. **Docker Desktop** - Install from [docker.com](https://www.docker.com/products/docker-desktop/)
2. **(Optional) OpenAI API Key** - Only needed for M4 (RAG features). Get from [platform.openai.com](https://platform.openai.com/api-keys)

## 5-Minute Setup

### 1. Create Environment File

```bash
cd mentorios
cp .env.example .env
```

The default `.env` file works out of the box for local development. You can edit it later to add your OpenAI API key when you reach M4.

### 2. Start Everything

```bash
docker-compose up --build
```

This will:
- Build the Spring Boot backend
- Build the React frontend
- Start PostgreSQL with pgvector extension
- Run all database migrations

**First time?** This may take 5-10 minutes to download images and build.

### 3. Open Your Browser

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:8080/api/health

### 4. Create Your Account

1. Go to http://localhost:5173
2. Click "הירשם" (Register)
3. Fill in:
   - Username (e.g., `amit`)
   - Email (e.g., `amit@example.com`)
   - Password (min 6 characters)
4. Click "הירשם"
5. Login with your credentials

### 5. Start Using MentorOS!

You should now see the Dashboard. Try:
- Click "משימה חדשה" to create your first task
- Set a task type (לימודים, LeetCode, etc.)
- Set priority and due date
- Click "צור"

## Stopping the System

Press `Ctrl+C` in the terminal, then:

```bash
docker-compose down
```

## Restarting Later

Just run:

```bash
docker-compose up
```

No need to rebuild unless you changed code.

## Troubleshooting

### Port Already in Use

If ports 5173, 8080, or 5432 are taken:

```bash
# Stop all containers
docker-compose down

# Find what's using the port
# On Mac/Linux:
lsof -i :8080
# On Windows:
netstat -ano | findstr :8080

# Kill the process or change ports in docker-compose.yml
```

### Database Issues

```bash
# Reset everything (WARNING: deletes all data)
docker-compose down -v
docker-compose up --build
```

### Backend Won't Start

Check logs:
```bash
docker-compose logs backend
```

Common issues:
- Missing JWT_SECRET in .env → Copy from .env.example
- Database not ready → Wait 10 seconds and try again

### Frontend Won't Load

Check logs:
```bash
docker-compose logs frontend
```

Make sure backend is running at http://localhost:8080/api/health

## Development Tips

### View Logs

```bash
# All services
docker-compose logs -f

# Specific service
docker-compose logs -f backend
docker-compose logs -f frontend
```

### Access Database

```bash
docker exec -it mentorios-db psql -U mentorios_user -d mentorios
```

### Hot Reload

- **Frontend**: Already enabled (Vite HMR)
- **Backend**: Restart container after code changes:
  ```bash
  docker-compose restart backend
  ```

## Next Steps

1. ✅ Create some tasks
2. 🚧 Try the weekly planner (coming soon)
3. 🚧 Add your courses (M2)
4. 🚧 Track job applications (M3)
5. 🚧 Upload study materials and chat with RAG Assistant (M4)

## Need Help?

Check the main README.md for:
- Full API documentation
- Project structure
- Development without Docker
- Advanced configuration
