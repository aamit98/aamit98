import api from './api';
import { Exam } from '../types';

export interface CreateExamRequest {
  courseId: number;
  name: string;
  examDate: string;
  weight?: number;
  scope?: string;
  location?: string;
}

export const examsService = {
  getAll: async (): Promise<Exam[]> => {
    const response = await api.get('/exams');
    return response.data;
  },

  getUpcoming: async (): Promise<Exam[]> => {
    const response = await api.get('/exams/upcoming');
    return response.data;
  },

  getByCourse: async (courseId: number): Promise<Exam[]> => {
    const response = await api.get(`/exams/course/${courseId}`);
    return response.data;
  },

  create: async (data: CreateExamRequest): Promise<Exam> => {
    const response = await api.post('/exams', data);
    return response.data;
  },

  delete: async (id: number): Promise<void> => {
    await api.delete(`/exams/${id}`);
  },
};
