import type { Request, Response } from "express";
import * as teacherService from "./teacher.service.ts";
import { ValidationError } from "../../shared/errors.ts";


const sgPhoneRegex = /^[689]\d{7}$/;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function getTeachers(req: Request, res: Response) {
  const teachers = await teacherService.getAllTeachers();
  res.status(200).json({ data: teachers });
}

export async function createTeacher(req: Request, res: Response) {
  const { name, subject, email, contactNumber } = req.body;

  if (!name || !subject || !email || !contactNumber) {
    throw new ValidationError("All fields are required: name, subject, email, contactNumber.");
  }

  if (!emailRegex.test(email)) {
    throw new ValidationError("This email address is not invalid.");
  }

  if (!sgPhoneRegex.test(contactNumber)) {
    throw new ValidationError("The work contact number is not valid.");
  }

  await teacherService.registerTeacher({ name, subject, email, contactNumber });
  res.status(201).json({ message: "Teacher registered successfully." });
}
