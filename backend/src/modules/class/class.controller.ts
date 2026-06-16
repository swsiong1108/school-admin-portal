import type { Request, Response, NextFunction } from "express";
import * as classService from "./class.service.ts";
import { NotFoundError, ConflictError, ValidationError } from "../../shared/errors.js";

export async function getClasses(req: Request, res: Response) {
  try {
    const classes = await classService.getAllClasses();
    res.status(200).json({ data: classes });
  } catch (err) {
    res.status(500).json({ error: "Failed to retrieve classes." });
  }
}

export async function createClass(req: Request, res: Response, next: NextFunction) {
  const { name, level, teacherEmail } = req.body;

  if (!name || !level || !teacherEmail) {
    throw new ValidationError("All fields are required: name, level, teacherEmail.");
  }

  await classService.createClass({ name, level, teacherEmail });
  res.status(201).json({ message: "Class created successfully." });
}