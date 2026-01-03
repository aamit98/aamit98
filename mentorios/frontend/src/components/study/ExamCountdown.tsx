import { Exam } from '../../types';
import { Calendar, MapPin, AlertTriangle } from 'lucide-react';
import { format } from 'date-fns';

interface ExamCountdownProps {
  exam: Exam;
  onDelete: (id: number) => void;
}

export default function ExamCountdown({ exam, onDelete }: ExamCountdownProps) {
  const getCountdownColor = (days: number) => {
    if (days < 0) return 'var(--text-secondary)';
    if (days <= 3) return 'var(--danger)';
    if (days <= 7) return 'var(--warning)';
    return 'var(--primary)';
  };

  const getCountdownText = (days: number) => {
    if (days < 0) return 'עבר';
    if (days === 0) return 'היום!';
    if (days === 1) return 'מחר!';
    return `${days} ימים`;
  };

  return (
    <div
      className="card"
      style={{
        borderRight: `4px solid ${getCountdownColor(exam.daysUntil)}`,
        padding: '1rem'
      }}
    >
      <div className="flex justify-between items-start" style={{ marginBottom: '0.5rem' }}>
        <div style={{ flex: 1 }}>
          <h3 style={{ fontSize: '1rem', fontWeight: '600', marginBottom: '0.25rem' }}>
            {exam.courseName} - {exam.name}
          </h3>
          <div className="flex items-center gap-2 text-xs text-secondary">
            <Calendar size={14} />
            {format(new Date(exam.examDate), 'dd/MM/yyyy HH:mm')}
          </div>
          {exam.location && (
            <div className="flex items-center gap-2 text-xs text-secondary" style={{ marginTop: '0.25rem' }}>
              <MapPin size={14} />
              {exam.location}
            </div>
          )}
        </div>

        <div style={{ textAlign: 'center', minWidth: '80px' }}>
          <div
            style={{
              fontSize: '1.5rem',
              fontWeight: 'bold',
              color: getCountdownColor(exam.daysUntil)
            }}
          >
            {getCountdownText(exam.daysUntil)}
          </div>
          {exam.daysUntil >= 0 && exam.daysUntil <= 7 && (
            <div className="flex items-center gap-1 text-xs" style={{ color: getCountdownColor(exam.daysUntil), justifyContent: 'center', marginTop: '0.25rem' }}>
              <AlertTriangle size={12} />
              קרוב!
            </div>
          )}
        </div>
      </div>

      {exam.scope && (
        <p className="text-sm text-secondary" style={{ marginTop: '0.5rem' }}>
          <strong>חומר:</strong> {exam.scope}
        </p>
      )}

      <button
        onClick={() => onDelete(exam.id)}
        className="btn btn-secondary text-xs"
        style={{ marginTop: '0.5rem', padding: '0.25rem 0.5rem' }}
      >
        מחק
      </button>
    </div>
  );
}
