# MERN CRUD Sample Project

## Structure
- server/   -> Express + Mongoose API
- client/   -> React app (create-react-app style)
- docker-compose.yml -> run entire stack with Docker

## Quick start (with Docker)
1. Build & run:
   ```
   docker-compose up --build
   ```
2. Server API -> http://localhost:5000/api/users
3. Client UI -> http://localhost:3000

## Without Docker (local dev)
- Start MongoDB locally (or use Atlas), then:
  - Start server: cd server && npm install && npm run dev
  - Start client: cd client && npm install && npm start
