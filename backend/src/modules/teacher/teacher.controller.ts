import type { Request, Response } from "express";
import * as teacherService from "./teacher.service.ts";
import { ValidationError } from "../../shared/errors.ts";

export async function getTeachers(req: Request, res: Response) {
  const teachers = await teacherService.getAllTeachers();
  res.status(200).json({ data: teachers });
}

export async function createTeacher(req: Request, res: Response) {
  const { name, subject, email, contactNumber } = req.body;

  if (!name || !subject || !email || !contactNumber) {
    throw new ValidationError("All fields are required: name, subject, email, contactNumber.");
  }

  await teacherService.registerTeacher({ name, subject, email, contactNumber });
  res.status(201).json({ message: "Teacher registered successfully." });
}