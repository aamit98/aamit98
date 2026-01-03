import { useState } from 'react';
import { X } from 'lucide-react';

interface CourseModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
}

export default function CourseModal({ isOpen, onClose, onSubmit }: CourseModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    code: '',
    semester: '',
    credits: '',
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      credits: formData.credits ? parseInt(formData.credits) : undefined,
    });
    setFormData({ name: '', code: '', semester: '', credits: '' });
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
      <div className="card" style={{ maxWidth: '400px', width: '100%' }}>
        <div className="flex justify-between items-center" style={{ marginBottom: '1.5rem' }}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>קורס חדש</h2>
          <button onClick={onClose} className="btn btn-secondary" style={{ padding: '0.25rem' }}>
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="label">שם הקורס</label>
            <input
              type="text"
              className="input"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
          </div>

          <div className="mb-4">
            <label className="label">קוד קורס</label>
            <input
              type="text"
              className="input"
              value={formData.code}
              onChange={(e) => setFormData({ ...formData, code: e.target.value })}
            />
          </div>

          <div className="flex gap-4" style={{ marginBottom: '1rem' }}>
            <div style={{ flex: 1 }}>
              <label className="label">סמסטר</label>
              <input
                type="text"
                className="input"
                placeholder="2026/1"
                value={formData.semester}
                onChange={(e) => setFormData({ ...formData, semester: e.target.value })}
              />
            </div>

            <div style={{ flex: 1 }}>
              <label className="label">נקודות זכות</label>
              <input
                type="number"
                className="input"
                value={formData.credits}
                onChange={(e) => setFormData({ ...formData, credits: e.target.value })}
              />
            </div>
          </div>

          <div className="flex gap-2">
            <button type="submit" className="btn btn-primary" style={{ flex: 1 }}>
              צור קורס
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
