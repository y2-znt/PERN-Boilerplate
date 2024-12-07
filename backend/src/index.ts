import { PrismaClient } from "@prisma/client";
import express, { Request, Response } from "express";

const prisma = new PrismaClient();
const app = express();

// JSON
app.use(express.json());

// CORS
app.use((req: Request, res: Response, next: Function) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
});

// test api
app.get("/", (req: Request, res: Response) => {
  try {
    res.status(200).json({ message: "API is working" });
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
});

// get all users
app.get("/users", async (req: Request, res: Response) => {
  try {
    const users = await prisma.user.findMany();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
});

// get user by id
app.get("/users/:id", async (req: Request, res: Response) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.params.id },
    });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
});

// create user
app.post("/users", async (req: Request, res: Response) => {
  try {
    const user = await prisma.user.create({
      data: {
        name: req.body.name,
        email: req.body.email,
      },
    });
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
});

// update user
app.put("/users/:id", async (req: Request, res: Response) => {
  try {
    const user = await prisma.user.update({
      where: { id: req.params.id },
      data: {
        name: req.body.name,
        email: req.body.email,
      },
    });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
});

// delete user
app.delete("/users/:id", async (req: Request, res: Response) => {
  try {
    await prisma.user.delete({ where: { id: req.params.id } });
    res.status(200).json({ message: "User deleted" });
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
});

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
