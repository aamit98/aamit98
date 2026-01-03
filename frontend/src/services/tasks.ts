import api from './api';
import { Task } from '../types';

export interface CreateTaskRequest {
  title: string;
  description?: string;
  type: 'STUDY' | 'LEETCODE' | 'JOB_PREP' | 'INTERVIEW' | 'PERSONAL';
  priority?: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  status?: 'TODO' | 'IN_PROGRESS' | 'BLOCKED' | 'DONE';
  dueDate?: string;
  estimateMinutes?: number;
  tags?: string[];
  relatedCourseId?: number;
  relatedApplicationId?: number;
}

export interface UpdateTaskRequest extends Partial<CreateTaskRequest> {
  actualMinutes?: number;
}

export const tasksService = {
  getAll: async (): Promise<Task[]> => {
    const response = await api.get('/tasks');
    return response.data;
  },

  getToday: async (): Promise<Task[]> => {
    const response = await api.get('/tasks/today');
    return response.data;
  },

  getByStatus: async (status: Task['status']): Promise<Task[]> => {
    const response = await api.get(`/tasks/status/${status}`);
    return response.data;
  },

  getById: async (id: number): Promise<Task> => {
    const response = await api.get(`/tasks/${id}`);
    return response.data;
  },

  create: async (data: CreateTaskRequest): Promise<Task> => {
    const response = await api.post('/tasks', data);
    return response.data;
  },

  update: async (id: number, data: UpdateTaskRequest): Promise<Task> => {
    const response = await api.put(`/tasks/${id}`, data);
    return response.data;
  },

  delete: async (id: number): Promise<void> => {
    await api.delete(`/tasks/${id}`);
  },
};
