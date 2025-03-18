# Invoice Management System

A full-stack invoice management application built with NestJS, React, and PostgreSQL.

## Features

- User authentication with JWT
- CRUD operations for invoices
- PostgreSQL database with Prisma ORM
- Docker support for development
- Modern UI with Tailwind CSS

## Tech Stack

### Backend
- NestJS
- PostgreSQL
- Prisma ORM
- JWT Authentication
- Docker

### Frontend
- React
- TypeScript
- Zustand for state management
- React Router
- Tailwind CSS
- Axios

## Getting Started

### Prerequisites
- Node.js (v18 or higher)
- Docker and Docker Compose
- PostgreSQL (if not using Docker)

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd invoice-management
```

2. Start the PostgreSQL database:
```bash
docker-compose up -d
```

3. Install backend dependencies:
```bash
cd server
npm install
```

4. Set up the environment variables:
```bash
cp .env.example .env
```

5. Run database migrations and seed data:
```bash
npx prisma migrate dev
npx prisma db seed
```

6. Start the backend server:
```bash
npm run start:dev
```

7. Install frontend dependencies:
```bash
cd ../client
npm install
```

8. Start the frontend development server:
```bash
npm run dev
```

The application will be available at:
- Frontend: http://localhost:5173
- Backend: http://localhost:3000

## Demo Credentials

```
Email: demo@example.com
Password: demo123
```

## API Documentation

### Authentication Endpoints

- POST /auth/login - Login with email and password
- POST /auth/register - Register a new user

### Invoice Endpoints

- GET /invoices - Get all invoices
- GET /invoices/:id - Get a specific invoice
- POST /invoices - Create a new invoice
- PATCH /invoices/:id - Update an invoice
- DELETE /invoices/:id - Delete an invoice

## License

MIT
