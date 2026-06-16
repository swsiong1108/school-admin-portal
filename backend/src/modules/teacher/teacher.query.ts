import { query, withTransaction } from "../../db.ts";
import type { CreateTeacherRequest, TeacherResponse } from "./teacher.types.ts";

export async function findAllTeachers(): Promise<TeacherResponse[]> {
  return query<TeacherResponse[]>(
    `SELECT u.name, s.name AS subject, u.email, u.contact AS contactNumber
     FROM teachers t
     JOIN users u ON t.user_id = u.id
     JOIN subjects s ON t.subject_id = s.id
     WHERE u.is_deleted = FALSE`
  );
}

export async function findTeacherByEmail(email: string): Promise<TeacherResponse | null> {
  const rows = await query<TeacherResponse[]>(
    `SELECT u.name, s.name AS subject, u.email, u.contact AS contactNumber
     FROM teachers t
     JOIN users u ON t.user_id = u.id
     JOIN subjects s ON t.subject_id = s.id
     WHERE u.email = ? AND u.is_deleted = FALSE`,
    [email]
  );
  return rows[0] ?? null;
}

export async function findSubjectByName(subject: string): Promise<{ id: number } | null> {
  const rows = await query<{ id: number }[]>(
    `SELECT id FROM subjects WHERE name = ?`,
    [subject]
  );
  return rows[0] ?? null;
}

export async function insertTeacher(data: CreateTeacherRequest, subjectId: number): Promise<void> {
  await withTransaction(async (conn) => {
    const [userResult] = await conn.query(
      `INSERT INTO users (name, email, contact) VALUES (?, ?, ?)`,
      [data.name, data.email, data.contactNumber]
    );
    const userId = (userResult as any).insertId;

    await conn.query(
      `INSERT INTO teachers (user_id, subject_id) VALUES (?, ?)`,
      [userId, subjectId]
    );
  });
}