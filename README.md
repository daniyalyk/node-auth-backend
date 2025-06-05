# 🔐 Node Authentication Backend Projects

This repository contains **three backend authentication systems** built with Node.js and Express, demonstrating secure implementations using different databases and ORMs: **MongoDB (Mongoose)**, **PostgreSQL with Sequelize**, and **PostgreSQL with TypeORM**.

---

## 📁 Projects Overview

### 1. `Node-Express-Mongo`
- **Database**: MongoDB
- **ORM/ODM**: Mongoose
- **Use case**: NoSQL solution with JWT-based auth and hashed passwords.

### 2. `Node-Express-Postgres-Sequelize`
- **Database**: PostgreSQL
- **ORM**: Sequelize
- **Use case**: Relational DB support with model relationships and migrations.

### 3. `Node-Express-Postgres-TypeORM`
- **Database**: PostgreSQL
- **ORM**: TypeORM (TypeScript)
- **Use case**: Decorator-based SQL solution with full TypeScript support.

---
## 📂 Project Structure

node-auth-backend/
├── Node-Express-Mongo/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── .env.example
│   └── app.js

├── Node-Express-Postgres-Sequelize/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── migrations/
│   ├── routes/
│   ├── .env.example
│   └── app.js

└── Node-Express-Postgres-TypeORM/
    ├── src/
    │   ├── controllers/
    │   ├── entities/
    │   ├── middleware/
    │   ├── routes/
    │   └── app.ts
    ├── ormconfig.js
    ├── .env.example
    └── tsconfig.json

---

## 🛠️ Tech Stack

- **Languages**: JavaScript, TypeScript
- **Runtime**: Node.js
- **Framework**: Express.js
- **Databases**: MongoDB, PostgreSQL
- **ORM/ODM**: Mongoose, Sequelize, TypeORM
- **Authentication**: JWT, bcrypt
- **Tools**: dotenv, nodemon, Postman (for API testing)

---

## ⚙️ Environment Variables

Each project uses a `.env` file to manage environment-specific variables. Below is a generalized example:

```env
# Common
PORT=5000
JWT_SECRET=your_secret_key

# MongoDB project
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/<dbname>

# Sequelize and TypeORM projects
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=your_username
DB_PASSWORD=your_password
DB_NAME=your_database
```
---

## 🚀 Getting Started

Each project is self-contained. To run any of them:

1. Navigate to the desired project directory:
   ``` cd <project-directory> ```
   
   
2. Install dependencies:
      - ``` npm install ```
    
3. Run the app: 
      - ``` npm start ```

---

## ✨ Features
✅ JWT-based authentication

✅ User registration & login with bcrypt-hashed passwords

✅ Environment-based configuration with dotenv

✅ Middleware for route protection

✅ Modular and scalable architecture

✅ Support for NoSQL (MongoDB) and SQL (PostgreSQL)

✅ Sequelize & TypeORM migrations support

✅ TypeScript support in TypeORM version

---

## 👨‍💻 Author
Daniyal Yahya
📧 daniyalyk@yahoo.com
🔗 [LinkedIn Profile](https://pk.linkedin.com/in/daniyal-yahya)

---

## 🤝 Contributing
1. Contributions, issues, and feature requests are welcome!
2. Fork the repo
3. Create your feature branch (git checkout -b feature/my-feature)
4. Commit your changes (git commit -am 'Add new feature')
5. Push to the branch (git push origin feature/my-feature)
6. Open a pull request 🚀


