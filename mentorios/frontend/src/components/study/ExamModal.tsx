import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { Course } from '../../types';

interface ExamModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
  courses: Course[];
}

export default function ExamModal({ isOpen, onClose, onSubmit, courses }: ExamModalProps) {
  const [formData, setFormData] = useState({
    courseId: '',
    name: '',
    examDate: '',
    weight: '',
    scope: '',
    location: '',
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      courseId: parseInt(formData.courseId),
      name: formData.name,
      examDate: formData.examDate,
      weight: formData.weight ? parseFloat(formData.weight) : undefined,
      scope: formData.scope || undefined,
      location: formData.location || undefined,
    });
    setFormData({ courseId: '', name: '', examDate: '', weight: '', scope: '', location: '' });
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
          <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>מבחן חדש</h2>
          <button onClick={onClose} className="btn btn-secondary" style={{ padding: '0.25rem' }}>
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="label">קורס</label>
            <select
              className="input"
              value={formData.courseId}
              onChange={(e) => setFormData({ ...formData, courseId: e.target.value })}
              required
            >
              <option value="">בחר קורס...</option>
              {courses.map((course) => (
                <option key={course.id} value={course.id}>
                  {course.name} ({course.code})
                </option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <label className="label">שם המבחן</label>
            <input
              type="text"
              className="input"
              placeholder="מועד א', מבחן אמצע..."
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
          </div>

          <div className="mb-4">
            <label className="label">תאריך ושעה</label>
            <input
              type="datetime-local"
              className="input"
              value={formData.examDate}
              onChange={(e) => setFormData({ ...formData, examDate: e.target.value })}
              required
            />
          </div>

          <div className="flex gap-4" style={{ marginBottom: '1rem' }}>
            <div style={{ flex: 1 }}>
              <label className="label">משקל (%)</label>
              <input
                type="number"
                step="0.01"
                className="input"
                value={formData.weight}
                onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
              />
            </div>

            <div style={{ flex: 1 }}>
              <label className="label">מיקום</label>
              <input
                type="text"
                className="input"
                placeholder="בניין 34..."
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="label">חומר למבחן</label>
            <textarea
              className="input"
              rows={3}
              placeholder="פרקים 1-5, נושאים A, B, C..."
              value={formData.scope}
              onChange={(e) => setFormData({ ...formData, scope: e.target.value })}
            />
          </div>

          <div className="flex gap-2">
            <button type="submit" className="btn btn-primary" style={{ flex: 1 }}>
              צור מבחן
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
