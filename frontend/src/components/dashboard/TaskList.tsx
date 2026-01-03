import { useState } from 'react';
import { Edit2, Trash2, Calendar, Clock } from 'lucide-react';
import { Task } from '../../types';
import { format } from 'date-fns';

interface TaskListProps {
  tasks: Task[];
  onEdit: (task: Task) => void;
  onDelete: (id: number) => void;
  onStatusChange: (id: number, status: Task['status']) => void;
}

const priorityColors = {
  LOW: '#10b981',
  MEDIUM: '#f59e0b',
  HIGH: '#ef4444',
  CRITICAL: '#dc2626',
};

const statusLabels = {
  TODO: 'לעשות',
  IN_PROGRESS: 'בתהליך',
  BLOCKED: 'חסום',
  DONE: 'בוצע',
};

const typeLabels = {
  STUDY: 'לימודים',
  LEETCODE: 'LeetCode',
  JOB_PREP: 'הכנה לעבודה',
  INTERVIEW: 'ראיון',
  PERSONAL: 'אישי',
};

export default function TaskList({ tasks, onEdit, onDelete, onStatusChange }: TaskListProps) {
  if (tasks.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-secondary)' }}>
        אין משימות. צור משימה חדשה כדי להתחיל!
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
      {tasks.map((task) => (
        <div
          key={task.id}
          className="card"
          style={{
            borderRight: `4px solid ${priorityColors[task.priority]}`,
            padding: '1rem'
          }}
        >
          <div className="flex justify-between items-center" style={{ marginBottom: '0.5rem' }}>
            <div className="flex items-center gap-2" style={{ flex: 1 }}>
              <input
                type="checkbox"
                checked={task.status === 'DONE'}
                onChange={(e) => onStatusChange(task.id, e.target.checked ? 'DONE' : 'TODO')}
                style={{ width: '18px', height: '18px', cursor: 'pointer' }}
              />
              <h3
                style={{
                  fontSize: '1rem',
                  fontWeight: '500',
                  textDecoration: task.status === 'DONE' ? 'line-through' : 'none',
                  color: task.status === 'DONE' ? 'var(--text-secondary)' : 'var(--text-primary)'
                }}
              >
                {task.title}
              </h3>
              <span
                className="text-xs"
                style={{
                  background: 'var(--bg-tertiary)',
                  padding: '0.25rem 0.5rem',
                  borderRadius: '4px'
                }}
              >
                {typeLabels[task.type]}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => onEdit(task)}
                className="btn btn-secondary"
                style={{ padding: '0.375rem' }}
                title="ערוך"
              >
                <Edit2 size={16} />
              </button>
              <button
                onClick={() => onDelete(task.id)}
                className="btn btn-secondary"
                style={{ padding: '0.375rem' }}
                title="מחק"
              >
                <Trash2 size={16} />
              </button>
            </div>
          </div>

          {task.description && (
            <p className="text-sm text-secondary" style={{ marginBottom: '0.5rem' }}>
              {task.description}
            </p>
          )}

          <div className="flex items-center gap-4 text-xs text-secondary">
            {task.dueDate && (
              <div className="flex items-center gap-1">
                <Calendar size={14} />
                {format(new Date(task.dueDate), 'dd/MM/yyyy HH:mm')}
              </div>
            )}
            {task.estimateMinutes && (
              <div className="flex items-center gap-1">
                <Clock size={14} />
                {task.estimateMinutes} דקות
              </div>
            )}
            <div
              style={{
                marginRight: 'auto',
                padding: '0.25rem 0.5rem',
                borderRadius: '4px',
                background: task.status === 'DONE' ? 'var(--success)' :
                           task.status === 'IN_PROGRESS' ? 'var(--primary)' :
                           task.status === 'BLOCKED' ? 'var(--danger)' :
                           'var(--bg-tertiary)',
                color: task.status === 'TODO' ? 'var(--text-primary)' : 'white',
                fontSize: '0.75rem'
              }}
            >
              {statusLabels[task.status]}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
