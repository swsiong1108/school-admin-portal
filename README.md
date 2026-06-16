# School Admin Portal

A full-stack school administration portal for managing teachers and classes.

**Stack:** React + Vite + TypeScript + Material UI (Frontend) · Node.js + Express + TypeScript + MySQL (Backend)

---

## Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/) v18 or above
- [MySQL](https://dev.mysql.com/downloads/) v8 or above

---

## Database Setup

**1. Start MySQL and log in:**

```bash
mysql -u root -p
```

**2. Create the database:**

```sql
CREATE DATABASE school;
USE school;
```

**3. Run the schema and seed file:**

```bash
mysql -u root -p school < backend/init.sql
```

This creates all tables and seeds initial data for subjects and levels.

---

## Backend Setup

**1. Go to the backend folder:**

```bash
cd backend
```

**2. Install dependencies:**

```bash
npm install
```

**3. Create the environment file:**

```bash
cp .env.example .env
```

Open `.env` and fill in your MySQL credentials:

```
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=school
PORT=3000
```

**4. Start the backend:**

```bash
npm run dev
```

Backend runs at **http://localhost:3000**

---

## Frontend Setup

**1. Open a new terminal and go to the frontend folder:**

```bash
cd frontend
```

**2. Install dependencies:**

```bash
npm install
```

**3. Start the frontend:**

```bash
npm run dev
```

Frontend runs at **http://localhost:5173**

---

## Usage

Open **http://localhost:5173** in your browser.

| Page | URL |
|------|-----|
| Teachers | http://localhost:5173/teachers |
| Add Teacher | http://localhost:5173/teachers/add |
| Classes | http://localhost:5173/classes |
| Add Class | http://localhost:5173/classes/add |

---

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/teachers | List all teachers |
| POST | /api/teachers | Add a teacher |
| GET | /api/classes | List all classes |
| POST | /api/classes | Add a class |
| GET | /api/subjects | List all subjects |
| GET | /api/levels | List all levels |
