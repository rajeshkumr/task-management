# Task Management Application

This is a full-stack task management application built using **Next.js** for the frontend and **NestJS** for the backend, along with **MongoDB** as the database. It allows users to perform task management with CRUD operations and includes user authentication (login, registration) and protected routes.

## Features

- User Registration and Login with JWT Authentication
- Protected Dashboard and Task Management Pages
- Task Management: Create, Read, Update, and Delete tasks
- MongoDB for storing user and task data
- Environment variable management via `.env` files
- Docker setup for easy containerization of both frontend and backend services

## Tech Stack

- **Frontend**: Next.js, React, Context API (for state management)
- **Backend**: NestJS, MongoDB
- **Database**: MongoDB
- **Authentication**: JWT

## Node and Npm

- Recommended node version: >18

## Prerequisites

- [Node.js](https://nodejs.org/)
- [MongoDB](https://www.mongodb.com/)
- [Docker](https://www.docker.com/) (for running with Docker)

---

## Getting Started

There are two ways to run the Task Management application: either by using Docker or running it locally on your machine.

---

### Clone the repository

```bash
  git clone https://github.com/your-repo/task-management.git
  cd task-management
```

### Install and setup mongodb

Please refer to link to install mongo db on your local machine - <https://www.mongodb.com/docs/manual/tutorial/>

**How to create tasks and users collections**

- Open terminal
- type `mongosh`. It opens the instance of mongodb to access the database and its collection

**Create a database:**

```bash
use taskdb
```

**Create a collection named tasks:**

```bash
db.createCollection("tasks")
```

**Insert a dummy entry into the tasks collection:**

```bash
db.tasks.insertOne({
  title: "Finish Project",
  description: "Complete the task management project",
  dueDate: new Date("2024-09-01"),
  status: "pending"
})
```

**Create a collection named users:**

```bash
db.createCollection("users")
```

**Insert a dummy entry into the users collection:**

```bash
db.users.insertOne({
  username: "testuser",
  password: "hashedpassword" // Remember to store the hashed password securely
})
```

## Running with Docker

Follow these steps to run both frontend and backend using Docker.

#### **Step 1: Create `.env` files**

Create `.env` files for both the frontend and backend.

- **Frontend `.env`** (`/frontend/.env`):

```bash
  NEXT_PUBLIC_HOST=http://localhost:3001
```

- **Backend `.env`** (`/frontend/.env`):

```bash
DATABASE_TYPE=mongodb
DATABASE_HOST=mongo
DATABASE_NAME=taskdb
PORT=27017
DATABASE_USE_UNIFIED_TOPOLOGY=true
DATABASE_SYNCHRONIZE=true
JWT_SECRET=your_jwt_secret
```

#### **Step 2: Build and run Docker containers**

```bash
docker-compose up --build
```

This will start both the frontend at <http://localhost:3000> and the backend at <http://localhost:3001>

#### **Step 3: Access the app**

##### Frontend: <http://localhost:3000>

##### Backend API: <http://localhost:3001>

### Running Locally

Follow these steps to run the app locally without Docker.

#### **Step 1: Install dependencies**

##### Fronetend

```bash
cd frontend
npm install
```

##### Backend

```bash
cd frontend
npm install
```

#### ** Step 2: Create `.env` files for both the frontend and backend***

- **Frontend `.env`** (`/frontend/.env`):

```bash
  NEXT_PUBLIC_HOST=http://localhost:3001
```

- **Backend `.env`** (`/frontend/.env`):

```bash
DATABASE_TYPE=mongodb
DATABASE_HOST=mongo
DATABASE_NAME=taskdb
PORT=27017
DATABASE_USE_UNIFIED_TOPOLOGY=true
DATABASE_SYNCHRONIZE=true
JWT_SECRET=your_jwt_secret
```

#### **Step 3: Start MongoDB**

Ensure MongoDB is running locally on the default port (27017).

#### **Step 4: Start the frontend and backend**

##### Fronetend

```bash
cd backend
npm run start:dev
```

##### Backend

```bash
cd frontend
npm run dev
```

#### **Step 5: Access the app**

- Frontend: <http://localhost:3000>
- Backend API: <http://localhost:3001>

## API Documentation (Backend app)

This document outlines the API endpoints for a task management application.

### Authentication

The API uses JWT (JSON Web Token) for authentication. You will need to register and login to access protected endpoints.

#### Register

**URL:** `POST /auth/register`

**Request Body (JSON):**

```json
{
  "username": "user",
  "password": "password"
}
```

**Response (JSON):**

```json
{
  "message": "User registered successfully"
}
```

#### Login

**URL:** `POST /auth/login`

**Request Body (JSON):**

```json
{
  "username": "user",
  "password": "password"
}
```

**Response (JSON):**

```json
{
 "access_token": "jwt_token"
}
```

### Task Management

#### Get all tasks (protected)

**URL:** `GET /tasks`

**Headers:**

```json
{
  "Authorization": "Bearer <your_jwt_token>"
}
```

**Response (JSON):**

```json
[
  {
    "id": 1,
    "title": "Task 1",
    "description": "Description for task 1",
    "status": "pending"
  },
  {
    "id": 2,
    "title": "Task 2",
    "description": "Description for task 2",
    "status": "completed"
  }
]
```

#### Create a new task (protected)

**URL:** `POST /tasks`

**Headers:**

```json
{
  "Authorization": "Bearer <your_jwt_token>"
}
```

**Request Body:**

```json
{
  "title": "New Task",
  "description": "Task description",
  "status": "pending"
}
```

#### Update a task (protected)

**URL:** `PATCH /tasks/:id`

**Headers:**

```json
{
  "Authorization": "Bearer <your_jwt_token>"
}
```

**Request Body:**

```json
{
  "title": "Updated Task",
  "description": "Updated description",
  "status": "completed"
}
```

#### Delete a task (protected)

**URL:** `DELETE /tasks/:id`

**Headers:**

```json
{
  "Authorization": "Bearer <your_jwt_token>"
}
```

## Pages (Front end app)

### Login Page

- **URL:** `/login`
- Allows users to log in using their credentials (username, password).
- Redirects to the dashboard upon successful login.

### Register Page

- **URL:** `/register`
- Allows new users to register.
- Redirects to login page after successful registration.

### Dashboard Page (Protected)

- **URL:** `/dashboard`
- Accessible only after login.
- Displays an overview of tasks and their statuses (total tasks, completed, pending).

### Tasks Page (Protected)

- **URL:** `/tasks`
- Accessible only after login.
- Shows a list of tasks with options to view, edit, or delete each task.
