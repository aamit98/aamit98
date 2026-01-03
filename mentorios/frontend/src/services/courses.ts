import api from './api';
import { Course } from '../types';

export interface CreateCourseRequest {
  name: string;
  code?: string;
  semester?: string;
  credits?: number;
}

export const coursesService = {
  getAll: async (): Promise<Course[]> => {
    const response = await api.get('/courses');
    return response.data;
  },

  getActive: async (): Promise<Course[]> => {
    const response = await api.get('/courses/active');
    return response.data;
  },

  getById: async (id: number): Promise<Course> => {
    const response = await api.get(`/courses/${id}`);
    return response.data;
  },

  create: async (data: CreateCourseRequest): Promise<Course> => {
    const response = await api.post('/courses', data);
    return response.data;
  },

  update: async (id: number, data: CreateCourseRequest): Promise<Course> => {
    const response = await api.put(`/courses/${id}`, data);
    return response.data;
  },

  delete: async (id: number): Promise<void> => {
    await api.delete(`/courses/${id}`);
  },
};
