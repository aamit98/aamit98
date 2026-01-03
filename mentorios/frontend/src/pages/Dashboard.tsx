import { useState } from 'react';
import { useAuthStore } from '../stores/authStore';
import { useTasks } from '../hooks/useTasks';
import { CheckCircle2, AlertCircle, Calendar, TrendingUp, Plus } from 'lucide-react';
import TaskModal from '../components/dashboard/TaskModal';
import TaskList from '../components/dashboard/TaskList';
import { Task } from '../types';

export default function Dashboard() {
  const user = useAuthStore((state) => state.user);
  const { tasks, isLoading, createTask, updateTask, deleteTask } = useTasks();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | undefined>();

  const todoTasks = tasks.filter(t => t.status === 'TODO' || t.status === 'IN_PROGRESS');
  const doneTasks = tasks.filter(t => t.status === 'DONE');

  const handleEdit = (task: Task) => {
    setEditingTask(task);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setEditingTask(undefined);
  };

  const handleModalSubmit = (data: any) => {
    if (editingTask) {
      updateTask(editingTask.id, data);
    } else {
      createTask(data);
    }
  };

  const handleStatusChange = (id: number, status: Task['status']) => {
    updateTask(id, { status });
  };

  return (
    <div>
      <div className="flex justify-between items-center" style={{ marginBottom: '0.5rem' }}>
        <h1 style={{ fontSize: '1.875rem', fontWeight: 'bold' }}>
          שלום, {user?.fullName || user?.username}
        </h1>
        <button onClick={() => setIsModalOpen(true)} className="btn btn-primary">
          <Plus size={18} />
          משימה חדשה
        </button>
      </div>
      <p className="text-secondary" style={{ marginBottom: '2rem' }}>
        היום: {new Date().toLocaleDateString('he-IL', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
      </p>

      {/* Quick Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
        <div className="card">
          <div className="flex items-center gap-2" style={{ marginBottom: '0.5rem' }}>
            <CheckCircle2 size={20} color="var(--success)" />
            <h3 className="text-sm text-secondary">משימות</h3>
          </div>
          <p style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{doneTasks.length} / {tasks.length}</p>
        </div>

        <div className="card">
          <div className="flex items-center gap-2" style={{ marginBottom: '0.5rem' }}>
            <AlertCircle size={20} color="var(--warning)" />
            <h3 className="text-sm text-secondary">בתהליך</h3>
          </div>
          <p style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{todoTasks.length}</p>
        </div>

        <div className="card">
          <div className="flex items-center gap-2" style={{ marginBottom: '0.5rem' }}>
            <Calendar size={20} color="var(--primary)" />
            <h3 className="text-sm text-secondary">שעות לימוד השבוע</h3>
          </div>
          <p style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>0</p>
        </div>

        <div className="card">
          <div className="flex items-center gap-2" style={{ marginBottom: '0.5rem' }}>
            <TrendingUp size={20} color="var(--success)" />
            <h3 className="text-sm text-secondary">בקשות בתהליך</h3>
          </div>
          <p style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>0</p>
        </div>
      </div>

      {/* Tasks */}
      <div className="card" style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1rem' }}>
          המשימות שלי
        </h2>
        {isLoading ? (
          <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-secondary)' }}>
            טוען...
          </div>
        ) : (
          <TaskList
            tasks={tasks}
            onEdit={handleEdit}
            onDelete={deleteTask}
            onStatusChange={handleStatusChange}
          />
        )}
      </div>

      <TaskModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        onSubmit={handleModalSubmit}
        task={editingTask}
      />
    </div>
  );
}
