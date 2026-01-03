import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { coursesService, CreateCourseRequest } from '../services/courses';
import toast from 'react-hot-toast';

export function useCourses() {
  const queryClient = useQueryClient();

  const { data: courses = [], isLoading } = useQuery({
    queryKey: ['courses'],
    queryFn: coursesService.getAll,
  });

  const createMutation = useMutation({
    mutationFn: coursesService.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['courses'] });
      toast.success('קורס נוצר בהצלחה');
    },
    onError: () => {
      toast.error('שגיאה ביצירת קורס');
    },
  });

  const deleteMutation = useMutation({
    mutationFn: coursesService.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['courses'] });
      toast.success('קורס נמחק');
    },
    onError: () => {
      toast.error('שגיאה במחיקת קורס');
    },
  });

  return {
    courses,
    isLoading,
    createCourse: (data: CreateCourseRequest) => createMutation.mutate(data),
    deleteCourse: (id: number) => deleteMutation.mutate(id),
  };
}
