import cors from "cors";
import express, { Request, Response } from "express";
import { CLIENT_URL } from "./config/env";
import errorMiddleware from "./middlewares/errorMiddleware";
import authRoutes from "./routes/authRoutes";
import userRoutes from "./routes/userRoutes";
const app = express();

// CORS
app.use(cors({ origin: CLIENT_URL }));

// Error handling
app.use(errorMiddleware);

// JSON
app.use(express.json());

// Routes
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);

// test api
app.get("/", (req: Request, res: Response) => {
  try {
    res.status(200).json({ message: "API is working" });
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
});

export default app;
