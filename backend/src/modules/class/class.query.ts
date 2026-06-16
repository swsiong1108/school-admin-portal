import { query } from "../../db.ts";
import type { ClassResponse } from "./class.types.ts";

export async function findAllClasses(): Promise<ClassResponse[]> {
  const rows = await query<any[]>(
    `SELECT c.name, l.name AS level, u.name AS formTeacherName
     FROM classes c
     JOIN levels l ON c.level_id = l.id
     JOIN teachers t ON c.teacher_id = t.id
     JOIN users u ON t.user_id = u.id`
  );

  return rows.map((row) => ({
    name: row.name,
    level: row.level,
    formTeacher: { name: row.formTeacherName },
  }));
}

export async function findClassByName(name: string): Promise<{ id: number } | null> {
  const rows = await query<{ id: number }[]>(`SELECT id FROM classes WHERE name = ?`, [name]);
  return rows[0] ?? null;
}

export async function findLevelByName(level: string): Promise<{ id: number } | null> {
  const rows = await query<{ id: number }[]>(`SELECT id FROM levels WHERE name = ?`, [level]);
  return rows[0] ?? null;
}

export async function findTeacherIdByEmail(email: string): Promise<{ id: number } | null> {
  const rows = await query<{ id: number }[]>(
    `SELECT t.id
     FROM teachers t
     JOIN users u ON t.user_id = u.id
     WHERE u.email = ? AND u.is_deleted = FALSE`,
    [email]
  );
  return rows[0] ?? null;
}

export async function isTeacherAssignedToClass(teacherId: number): Promise<boolean> {
  const rows = await query<{ id: number }[]>(`SELECT id FROM classes WHERE teacher_id = ?`, [teacherId]);
  return rows.length > 0;
}

export async function insertClass(name: string, levelId: number, teacherId: number): Promise<void> {
  await query(
    `INSERT INTO classes (name, level_id, teacher_id) VALUES (?, ?, ?)`,
    [name, levelId, teacherId]
  );
}