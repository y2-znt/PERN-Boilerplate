import express, { Request, Response } from "express";
import corsMiddleware from "./middlewares/corsMiddleware";
import userRoutes from "./routes/userRoutes";

const app = express();

// JSON
app.use(express.json());

// CORS
app.use(corsMiddleware);

// Routes
app.use(userRoutes);

// test api
app.get("/", (req: Request, res: Response) => {
  try {
    res.status(200).json({ message: "API is working" });
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
});

export default app;
