import * as classQuery from "./class.query.ts";
import type { ClassResponse, CreateClassRequest } from "./class.types.ts";
import { NotFoundError, ConflictError } from "../../shared/errors.js";

export async function getAllClasses(): Promise<ClassResponse[]> {
  return classQuery.findAllClasses();
}

export async function createClass(data: CreateClassRequest): Promise<void> {
  const existingClass = await classQuery.findClassByName(data.name);
  if (existingClass) {
    throw new ConflictError("A class with this name already exists.");
  }

  const level = await classQuery.findLevelByName(data.level);
  if (!level) {
    throw new NotFoundError(`Level "${data.level}" not found.`);
  }

  const teacher = await classQuery.findTeacherIdByEmail(data.teacherEmail);
  if (!teacher) {
    throw new NotFoundError(`Teacher with email "${data.teacherEmail}" not found.`);
  }

  const alreadyAssigned = await classQuery.isTeacherAssignedToClass(teacher.id);
  if (alreadyAssigned) {
    throw new ConflictError("This teacher is already assigned as a form teacher to another class.");
  }

  await classQuery.insertClass(data.name, level.id, teacher.id);
}