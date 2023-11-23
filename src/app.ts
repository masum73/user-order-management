import express, { Application, Request, Response } from "express";
import cors from "cors";
import { UserRoutes } from "./modules/user/user.route";

const app: Application = express();

// parser
app.use(express.json());
app.use(cors());

// application routes
app.use("/api/", UserRoutes); //user route will be here

// application default route
app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: "Welcome to User Order Management System",
  });
});

export default app;
