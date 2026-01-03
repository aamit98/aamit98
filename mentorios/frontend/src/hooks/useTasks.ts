import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { tasksService, CreateTaskRequest, UpdateTaskRequest } from '../services/tasks';
import toast from 'react-hot-toast';

export function useTasks() {
  const queryClient = useQueryClient();

  const { data: tasks = [], isLoading } = useQuery({
    queryKey: ['tasks'],
    queryFn: tasksService.getAll,
  });

  const createMutation = useMutation({
    mutationFn: tasksService.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
      toast.success('משימה נוצרה בהצלחה');
    },
    onError: () => {
      toast.error('שגיאה ביצירת משימה');
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: UpdateTaskRequest }) =>
      tasksService.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
      toast.success('משימה עודכנה בהצלחה');
    },
    onError: () => {
      toast.error('שגיאה בעדכון משימה');
    },
  });

  const deleteMutation = useMutation({
    mutationFn: tasksService.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
      toast.success('משימה נמחקה');
    },
    onError: () => {
      toast.error('שגיאה במחיקת משימה');
    },
  });

  return {
    tasks,
    isLoading,
    createTask: (data: CreateTaskRequest) => createMutation.mutate(data),
    updateTask: (id: number, data: UpdateTaskRequest) => updateMutation.mutate({ id, data }),
    deleteTask: (id: number) => deleteMutation.mutate(id),
  };
}
