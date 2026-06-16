export interface Class {
  id: number;
  name: string;
  level_id: number;
  teacher_id: number | null;
  created_at: string;
  updated_at: string;
}

export interface CreateClassRequest {
  name: string;
  level: string;
  teacherEmail: string;
}

export interface ClassResponse {
  name: string;
  level: string;
  formTeacher: {
    name: string;
  };
}