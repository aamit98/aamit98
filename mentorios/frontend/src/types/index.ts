export interface User {
  id: number;
  username: string;
  email: string;
  fullName?: string;
  energyRating?: number;
}

export interface LoginRequest {
  username: string;
  password: string;
}

export interface RegisterRequest {
  username: string;
  email: string;
  password: string;
  fullName?: string;
}

export interface AuthResponse {
  token: string;
  type: string;
  id: number;
  username: string;
  email: string;
}

export interface Task {
  id: number;
  title: string;
  description?: string;
  type: 'STUDY' | 'LEETCODE' | 'JOB_PREP' | 'INTERVIEW' | 'PERSONAL';
  priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  status: 'TODO' | 'IN_PROGRESS' | 'BLOCKED' | 'DONE';
  dueDate?: string;
  estimateMinutes?: number;
  tags?: string[];
}

export interface Course {
  id: number;
  name: string;
  code?: string;
  semester?: string;
  status: 'ACTIVE' | 'COMPLETED' | 'DROPPED';
}

export interface Application {
  id: number;
  company: string;
  role: string;
  jobUrl?: string;
  status: 'WISHLIST' | 'APPLIED' | 'HR_SCREEN' | 'TECH_SCREEN' | 'TAKE_HOME' | 'ONSITE' | 'OFFER' | 'REJECTED';
  appliedDate?: string;
  resumeVersion?: string;
  notes?: string;
}

export interface Course {
  id: number;
  name: string;
  code?: string;
  semester?: string;
  credits?: number;
  status: 'ACTIVE' | 'COMPLETED' | 'DROPPED';
  createdAt: string;
  updatedAt: string;
}

export interface Exam {
  id: number;
  courseId: number;
  courseName: string;
  name: string;
  examDate: string;
  weight?: number;
  scope?: string;
  status: 'UPCOMING' | 'DONE' | 'MISSED';
  grade?: number;
  notes?: string;
  location?: string;
  daysUntil: number;
  createdAt: string;
}
