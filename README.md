```markdown
# NestJS E-commerce Backend

This repository contains a full-featured NestJS backend implementing:

- PostgreSQL (TypeORM) for core data: users, products, categories, sliders, promo, cart, orders
- MongoDB Atlas (Mongoose) for likes and reviews
- JWT authentication, role-based access control (user, seller, admin)
- File uploads (images) via multer
- Swagger auto-generated API docs

Environment variables: see .env.example

Run:
- npm install
- configure .env
- npm run start:dev
- Swagger UI available at http://localhost:3000/api
```