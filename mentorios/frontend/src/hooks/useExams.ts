import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { examsService, CreateExamRequest } from '../services/exams';
import toast from 'react-hot-toast';

export function useExams() {
  const queryClient = useQueryClient();

  const { data: exams = [], isLoading } = useQuery({
    queryKey: ['exams'],
    queryFn: examsService.getUpcoming,
  });

  const createMutation = useMutation({
    mutationFn: examsService.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['exams'] });
      toast.success('מבחן נוצר בהצלחה');
    },
    onError: () => {
      toast.error('שגיאה ביצירת מבחן');
    },
  });

  const deleteMutation = useMutation({
    mutationFn: examsService.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['exams'] });
      toast.success('מבחן נמחק');
    },
    onError: () => {
      toast.error('שגיאה במחיקת מבחן');
    },
  });

  return {
    exams,
    isLoading,
    createExam: (data: CreateExamRequest) => createMutation.mutate(data),
    deleteExam: (id: number) => deleteMutation.mutate(id),
  };
}
