import { Response } from "express";
import { z } from "zod";

export const handleErrorResponse = (res: Response, error: unknown) => {
  if (error instanceof z.ZodError) {
    res.status(422).json({ message: "Validation error", errors: error.errors });
  } else if ((error as Error).message.includes("not found")) {
    res.status(404).json({ message: (error as Error).message });
  } else if (
    (error as Error).message.includes("unauthorized") ||
    (error as Error).message.includes("forbidden")
  ) {
    res.status(403).json({ message: (error as Error).message });
  } else {
    res.status(400).json({ message: (error as Error).message });
  }
};
