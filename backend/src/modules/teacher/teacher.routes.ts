import { Router } from "express";
import { getTeachers, createTeacher } from "./teacher.controller.ts";

const router = Router();

router.get("/", getTeachers);
router.post("/", createTeacher);

export default router;