import { Request } from "express";

// Extend the global Express namespace to include a custom User interface
declare global {
  namespace Express {
    // Define the User interface with userId and role properties
    interface User {
      userId: string;
      username: string;
      email: string;
    }
  }
}

// Define a custom AuthenticatedRequest interface that extends the standard Request
export interface AuthenticatedRequest extends Request {
  user?: {
    userId: string;
  };
}
