import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { Task } from '../../types';
import { CreateTaskRequest } from '../../services/tasks';

interface TaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: CreateTaskRequest) => void;
  task?: Task;
}

export default function TaskModal({ isOpen, onClose, onSubmit, task }: TaskModalProps) {
  const [formData, setFormData] = useState<CreateTaskRequest>({
    title: '',
    description: '',
    type: 'PERSONAL',
    priority: 'MEDIUM',
    status: 'TODO',
  });

  useEffect(() => {
    if (task) {
      setFormData({
        title: task.title,
        description: task.description,
        type: task.type,
        priority: task.priority,
        status: task.status,
        dueDate: task.dueDate,
        estimateMinutes: task.estimateMinutes,
        tags: task.tags,
      });
    } else {
      setFormData({
        title: '',
        description: '',
        type: 'PERSONAL',
        priority: 'MEDIUM',
        status: 'TODO',
      });
    }
  }, [task, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    onClose();
  };

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      background: 'rgba(0,0,0,0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 50
    }}>
      <div className="card" style={{ maxWidth: '500px', width: '100%', maxHeight: '90vh', overflow: 'auto' }}>
        <div className="flex justify-between items-center" style={{ marginBottom: '1.5rem' }}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>
            {task ? 'עריכת משימה' : 'משימה חדשה'}
          </h2>
          <button onClick={onClose} className="btn btn-secondary" style={{ padding: '0.25rem' }}>
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="label">כותרת</label>
            <input
              type="text"
              className="input"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required
            />
          </div>

          <div className="mb-4">
            <label className="label">תיאור</label>
            <textarea
              className="input"
              rows={3}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            />
          </div>

          <div className="flex gap-4" style={{ marginBottom: '1rem' }}>
            <div style={{ flex: 1 }}>
              <label className="label">סוג</label>
              <select
                className="input"
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value as any })}
              >
                <option value="STUDY">לימודים</option>
                <option value="LEETCODE">LeetCode</option>
                <option value="JOB_PREP">הכנה לעבודה</option>
                <option value="INTERVIEW">ראיון</option>
                <option value="PERSONAL">אישי</option>
              </select>
            </div>

            <div style={{ flex: 1 }}>
              <label className="label">עדיפות</label>
              <select
                className="input"
                value={formData.priority}
                onChange={(e) => setFormData({ ...formData, priority: e.target.value as any })}
              >
                <option value="LOW">נמוכה</option>
                <option value="MEDIUM">בינונית</option>
                <option value="HIGH">גבוהה</option>
                <option value="CRITICAL">קריטית</option>
              </select>
            </div>
          </div>

          <div className="flex gap-4" style={{ marginBottom: '1rem' }}>
            <div style={{ flex: 1 }}>
              <label className="label">סטטוס</label>
              <select
                className="input"
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
              >
                <option value="TODO">לעשות</option>
                <option value="IN_PROGRESS">בתהליך</option>
                <option value="BLOCKED">חסום</option>
                <option value="DONE">בוצע</option>
              </select>
            </div>

            <div style={{ flex: 1 }}>
              <label className="label">הערכת זמן (דקות)</label>
              <input
                type="number"
                className="input"
                value={formData.estimateMinutes || ''}
                onChange={(e) => setFormData({ ...formData, estimateMinutes: parseInt(e.target.value) || undefined })}
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="label">תאריך יעד</label>
            <input
              type="datetime-local"
              className="input"
              value={formData.dueDate?.slice(0, 16) || ''}
              onChange={(e) => setFormData({ ...formData, dueDate: e.target.value ? e.target.value + ':00' : undefined })}
            />
          </div>

          <div className="flex gap-2">
            <button type="submit" className="btn btn-primary" style={{ flex: 1 }}>
              {task ? 'עדכן' : 'צור'}
            </button>
            <button type="button" onClick={onClose} className="btn btn-secondary" style={{ flex: 1 }}>
              ביטול
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
