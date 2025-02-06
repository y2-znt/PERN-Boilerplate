# PERN-BOILERPLATE

This project is a Docker boilerplate for an application using the PERN stack. <br/>
The PERN stack consists of PostgreSQL, Express, React (Next.js), and Node.js.

<img width="942" alt="PERN stack schema" src="https://github.com/user-attachments/assets/dc478aa0-6bc3-4237-afd8-332c5d3cfd76">

## 📖 Table of Contents

<details><summary>Table of Contents</summary>

1. 🔪 [Technologies Used](#technologies-used)
2. 🐳 [Docker Configuration](#docker-configuration)
3. 🤸 [Quick Start](#quick-start)
4. 🔧 [Contributing](#contributing)

</details>

## <a name="technologies-used">Technologies Used 🔪</a>

### Language

- **TypeScript**: A superset of JavaScript that compiles to plain JavaScript.

### Backend

- **Express**: A minimal and flexible Node.js web application framework.
- **Node.js**: A JavaScript runtime built on Chrome's V8 JavaScript engine.
- **Prisma**: ORM (Object-Relational Mapping) tool to facilitate interaction with PostgreSQL database and generate SQL queries more efficiently.
- **JWT**: JSON Web Token for secure user authentication and authorization.
- **bcrypt**: Library for hashing passwords to enhance security.
- **Zod**: Type-safe schema validation for incoming requests.

### Frontend

- **React (Next.js)**: A React framework for building server-side rendered applications.
- **TanStack Query**: A powerful data-fetching library for React.
- **React Hook Form**: A library for easy and efficient form management in React applications.
- **Zod**: A TypeScript-first schema declaration and validation library, used for validating and parsing user input.
- **Tailwind CSS**: A utility-first CSS framework for rapid UI development.
- **shadcn/ui**: A component library used for building the frontend.

### Database

- **PostgreSQL**: Relational database management system used for storing user data, product information, and order details.

### Containerization

- **Docker**: A platform for developing, shipping, and running applications in containers.

## <a name="docker-configuration">Docker Configuration 🐳</a>

### Docker Compose file

```dockerfile
# docker-compose.yaml

version: "3.8"

services:
  frontend:
    container_name: frontend
    build:
      context: ./frontend
      dockerfile: frontend.dockerfile
    ports:
      - "${FRONTEND_PORT}:3000"
    environment:
      - NEXT_PUBLIC_API_URL=${NEXT_PUBLIC_API_URL}
    volumes:
      - ./frontend:/app
      - /app/node_modules
    restart: always
    depends_on:
      - backend

  backend:
    container_name: backend
    image: backend:latest
    build:
      context: ./backend
      dockerfile: backend.dockerfile
    ports:
      - "${BACKEND_PORT}:4000"
    environment:
      - DATABASE_URL=postgresql://${POSTGRES_USER}:${POSTGRES_PASSWORD}@db:5432/${POSTGRES_DB}
      - JWT_SECRET=${JWT_SECRET}
      - SALT_ROUNDS=${SALT_ROUNDS}
      - TOKEN_EXPIRY=${TOKEN_EXPIRY}
      - CLIENT_URL=${CLIENT_URL}
    volumes:
      - ./backend:/app
      - /app/node_modules

  db:
    container_name: db
    image: postgres:latest
    restart: always
    environment:
      POSTGRES_USER: ${POSTGRES_USER}
      POSTGRES_PASSWORD: ${POSTGRES_PASSWORD}
      POSTGRES_DB: ${POSTGRES_DB}
    ports:
      - "${DB_PORT}:5432"
    volumes:
      - pgdata:/var/lib/postgresql/data

volumes:
  pgdata: {}
```

### Backend Dockerfile

```dockerfile
# backend.dockerfile

FROM node:20

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY prisma ./prisma

RUN npx prisma generate

COPY . .

EXPOSE 4000

CMD ["npm", "run", "dev"]

```

### Frontend Dockerfile

```dockerfile
# frontend.dockerfile

FROM node:18

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

CMD npm run dev
```

## <a name="quick-start">🤸 Quick Start</a>

To get started with this project, follow these steps:

1. Clone the repository:

   ```bash
   git clone https://github.com/y2-znt/PERN-Boilerplate.git

   cd PERN-Boilerplate
   ```

2. Set up your environment variables:
   Create a `.env` file in the `backend` directory and add your PostgreSQL connection string. This is required for Prisma schema generation, note that Docker will use its own environment variables defined in docker-compose.yml:

   ```
    DATABASE_URL=postgresql://example_user:example_password@localhost:5432/example_db?schema=public
   ```

3. Build and run the Docker containers:

   ```bash
   docker-compose up --build
   ```

4. Access the application:

   - Frontend: [http://localhost:3000](http://localhost:3000)
   - Backend API: [http://localhost:4000](http://localhost:4000)
   - DB: [http://localhost:5432](http://localhost:5432)

5. To create a new migration, run:
   ```bash
   npx prisma migrate dev --name init
   ```

## <a name="contributing">🔧 Contributing</a>

[![contributors](https://contrib.rocks/image?repo=yoni-deserbaix/yoni-deserbaix)](https://github.com/Yoni-Deserbaix/PERN-CRUD-Boilerplate/graphs/contributors)

Contributions are what make the open source community such an amazing place to learn, inspire, and
create. Any contributions you make are **greatly appreciated**.

To fix a bug or enhance an existing module, follow these steps:

1. Fork the repo
2. Create a new branch (`git checkout -b improve-feature`)
3. Make the appropriate changes in the files
4. Commit your changes (`git commit -am 'Improve feature'`)
5. Push to the branch (`git push origin improve-feature`)
6. Create a Pull Request 🎉

### 📩 Bug / Feature Request

If you find a bug (failure of a module to execute its intended function), kindly open an issue
[here](https://github.com/y2-znt/PERN-Boilerplate/issues/new) by including the issue with a
title and clear description.

If you'd like to request a new function, feel free to do so by opening an issue
[here](https://github.com/y2-znt/PERN-Boilerplate/issues/new). Please include sample queries
and their corresponding results.
