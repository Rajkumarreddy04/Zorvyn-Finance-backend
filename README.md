**Finance Backend API**

1. Features
- JWT Authentication
- Role-Based Access Control (Admin, Analyst, Viewer)
- Financial Records CRUD
- Dashboard Analytics
- Secure password hashing using bcrypt
- Swagger API Documentation

2. Tech Stack
- Node.js
- Express.js
- Supabase
- JWT & bcrypt
- Swagger

3.Project Structure
 finance-backend/
├── config/
├── controllers/
├── middleware/
├── routes/
├── app.js
├── server.js
├── package.json

4.Installation
```bash
git clone https://github.com/Rajkumarreddy04/Zorvyn-Finance-backend.git
cd Zorvyn-Finance-backend
npm install

5. Environment Variables
```md
Environment Variables
Created a `.env` file in the root directory:

6.Run the Server
```bash
npm install
node server.js


7.API Documentation
```md
API Documentation

Swagger UI available at:
http://localhost:5000/api-docs


8.API Endpoints

 Auth
- POST /api/users/register
- POST /api/users/login

 Records
- POST /api/records
- GET /api/records
- PUT /api/records/:id
- DELETE /api/records/:id

 Dashboard
- GET /api/dashboard

9.Role Permissions

- Admin → Full access (CRUD)
- Analyst → Read + Dashboard
- Viewer → Limited access
