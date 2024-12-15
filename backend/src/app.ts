import express, { Request, Response } from "express";
import corsMiddleware from "./middlewares/corsMiddleware";
import errorMiddleware from "./middlewares/errorMiddleware";
import authRoutes from "./routes/authRoutes";
import userRoutes from "./routes/userRoutes";
import cookieParser from "cookie-parser";
const app = express();

// JSON
app.use(express.json());

// CORS
app.use(corsMiddleware);

// Cookie parser
app.use(cookieParser());

// Routes
app.use(userRoutes, authRoutes);

// Error handling
app.use(errorMiddleware);

// test api
app.get("/", (req: Request, res: Response) => {
  try {
    res.status(200).json({ message: "API is working" });
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
});

export default app;
