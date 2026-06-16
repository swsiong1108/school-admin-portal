import express from "express";
import teacherRoutes from "./modules/teacher/teacher.routes.ts";
import classRoutes from "./modules/class/class.routes.ts";
import { AppError } from "./shared/errors.ts";

const app = express();

app.use(express.json());

app.use("/api/teachers", teacherRoutes);
app.use("/api/classes", classRoutes);

app.use((req, res) => {
  res.status(404).json({ error: "Route not found." });
});

app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  if (err instanceof AppError) {
    res.status(err.statusCode).json({ error: err.message });
    return;
  }
  console.error(err);
  res.status(500).json({ error: "Internal server error." });
});

export default app;