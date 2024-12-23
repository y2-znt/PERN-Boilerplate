import cookieParser from "cookie-parser";
import express, { Request, Response } from "express";
import corsMiddleware from "./middlewares/corsMiddleware";
import errorMiddleware from "./middlewares/errorMiddleware";
import authRoutes from "./routes/authRoutes";
import userRoutes from "./routes/userRoutes";

const app = express();

// CORS
app.use(corsMiddleware);

// JSON
app.use(express.json());

// Cookie parser
app.use(cookieParser());

// Routes
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);

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
