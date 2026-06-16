export interface Teacher {
  id: number;
  user_id: number;
  subject_id: number;
  created_at: string;
  updated_at: string;
}

export interface CreateTeacherRequest {
  name: string;
  subject: string;
  email: string;
  contactNumber: string;
}

export interface TeacherResponse {
  name: string;
  subject: string;
  email: string;
  contactNumber: string;
}