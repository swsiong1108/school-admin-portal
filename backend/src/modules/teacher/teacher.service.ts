import * as teacherQuery from "./teacher.query.js";
import type { CreateTeacherRequest, TeacherResponse } from "./teacher.types.ts";
import { NotFoundError, ConflictError } from "../../shared/errors.ts";

export async function getAllTeachers(): Promise<TeacherResponse[]> {
  return teacherQuery.findAllTeachers();
}

export async function registerTeacher(data: CreateTeacherRequest): Promise<void> {
  const existing = await teacherQuery.findTeacherByEmail(data.email);
  if (existing) {
    throw new ConflictError("A teacher with this email already exists.");
  }

  const subject = await teacherQuery.findSubjectByName(data.subject);
  if (!subject) {
    throw new NotFoundError(`Subject "${data.subject}" not found.`);
  }

  await teacherQuery.insertTeacher(data, subject.id);
}