# Tasker (RBAC + JWT)

A full-stack Task Management System built with Node.js, Express, MongoDB, and a frontend (React/HTML) implementing JWT Authentication and Role-Based Access Control (RBAC).

---

## Live Demo

Tasker:  
<PASTE_FRONTEND_DEPLOYED_LINK_HERE>

---

## Demo Credentials

### Admin

- Email: admin@email.com
- Password: password

### Test User

- Email: testuser@gmail.com
- Password: testuser

---

## Features

### Authentication

- User Registration
- User Login (JWT-based authentication)
- Secure password hashing using bcrypt
- Token-based authorization
- Logout functionality

---

### Task Management

- Create new tasks
- Update task details
- Update task status (pending / completed)
- Delete tasks
- Fetch all tasks

---

### Role-Based Access Control (RBAC)

- **Admin**
  - Can create, update, and delete any task
  - Can assign tasks to any user
  - Can view all users and tasks

- **User**
  - Can create tasks for themselves
  - Can only access and modify their own assigned tasks

---

### Task Assignment

- Admin can assign tasks to any user
- Users can only assign tasks to themselves

Each task contains:

- createdBy
- assignedTo

---

## Tech Stack

### Backend

- Node.js
- Express.js
- MongoDB with Mongoose
- JWT (Authentication)
- bcrypt (Password hashing)

### Frontend

- React (or HTML + JavaScript for testing)
- Axios / Fetch API

---

## Project Structure

```
project/
│── controllers/
│── models/
│── routes/
│── middlewares/
│── config/
│── app.js
│── server.js
```

---

## API Endpoints

### User Routes

| Method | Endpoint               | Description           |
| ------ | ---------------------- | --------------------- |
| POST   | /api/v1/user/register  | Register user         |
| POST   | /api/v1/user/login     | Login user            |
| POST   | /api/v1/user/logout    | Logout user           |
| GET    | /api/v1/user/all-users | Get all users (Admin) |

---

### Task Routes

| Method | Endpoint                 | Description         |
| ------ | ------------------------ | ------------------- |
| POST   | /api/v1/task/new-task    | Create task         |
| POST   | /api/v1/task/assign-task | Assign task (Admin) |
| GET    | /api/v1/task/all-tasks   | Get all tasks       |
| PATCH  | /api/v1/task/update/:id  | Update task         |
| PATCH  | /api/v1/task/:id         | Update task status  |
| DELETE | /api/v1/task/:id         | Delete task         |

---

## Environment Variables

Create a `.env` file:

```
PORT=8000
MONGODB_URI=your_mongodb_connection
ACCESS_TOKEN_SECRET=your_secret
REFRESH_TOKEN_SECRET=your_secret
ACCESS_TOKEN_EXPIRY=1d
REFRESH_TOKEN_EXPIRY=7d
```

---

## Running the Project

### Install dependencies

```
npm install
```

### Start server

```
npm run dev
```

Server runs on:

```
http://localhost:8000
```

---

## Testing

You can test APIs using:

- Postman
- Swagger

---

## Important Notes

- Frontend must use correct API base URL:

```
http://localhost:8000/api/v1
```

- If frontend is deployed, backend must also be deployed (localhost will not work)

---

## Key Highlights

- Secure authentication system using JWT
- Clean modular backend architecture
- Proper RBAC implementation
- Admin task assignment system
- Scalable and maintainable structure

---

## Future Improvements

- Pagination and filtering
- Task search
- Notifications

---

## Author

Ankush  
Backend Developer (Node.js)
