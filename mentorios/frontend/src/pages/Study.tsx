import { useState } from 'react';
import { Plus, BookOpen, GraduationCap } from 'lucide-react';
import { useCourses } from '../hooks/useCourses';
import { useExams } from '../hooks/useExams';
import ExamCountdown from '../components/study/ExamCountdown';
import CourseModal from '../components/study/CourseModal';
import ExamModal from '../components/study/ExamModal';

export default function Study() {
  const { courses, isLoading: coursesLoading, createCourse, deleteCourse } = useCourses();
  const { exams, isLoading: examsLoading, createExam, deleteExam } = useExams();
  const [isCourseModalOpen, setIsCourseModalOpen] = useState(false);
  const [isExamModalOpen, setIsExamModalOpen] = useState(false);

  const activeCourses = courses.filter(c => c.status === 'ACTIVE');

  return (
    <div>
      <h1 style={{ fontSize: '1.875rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
        לימודים
      </h1>
      <p className="text-secondary" style={{ marginBottom: '2rem' }}>
        ניהול קורסים, מבחנים, והתקדמות לימודית
      </p>

      {/* Upcoming Exams */}
      <div style={{ marginBottom: '2rem' }}>
        <div className="flex justify-between items-center" style={{ marginBottom: '1rem' }}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <GraduationCap size={24} />
            מבחנים קרובים
          </h2>
          <button
            onClick={() => setIsExamModalOpen(true)}
            className="btn btn-primary"
            disabled={activeCourses.length === 0}
          >
            <Plus size={18} />
            מבחן חדש
          </button>
        </div>

        <div className="card">
          {examsLoading ? (
            <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-secondary)' }}>
              טוען...
            </div>
          ) : exams.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-secondary)' }}>
              אין מבחנים קרובים.
              {activeCourses.length === 0 ? (
                <span> צור קורס תחילה.</span>
              ) : (
                <span> לחץ "מבחן חדש" להוספה.</span>
              )}
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {exams.map((exam) => (
                <ExamCountdown
                  key={exam.id}
                  exam={exam}
                  onDelete={deleteExam}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Courses */}
      <div>
        <div className="flex justify-between items-center" style={{ marginBottom: '1rem' }}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <BookOpen size={24} />
            הקורסים שלי
          </h2>
          <button onClick={() => setIsCourseModalOpen(true)} className="btn btn-primary">
            <Plus size={18} />
            קורס חדש
          </button>
        </div>

        <div className="card">
          {coursesLoading ? (
            <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-secondary)' }}>
              טוען...
            </div>
          ) : activeCourses.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-secondary)' }}>
              אין קורסים. לחץ "קורס חדש" להוספה.
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '1rem' }}>
              {activeCourses.map((course) => (
                <div
                  key={course.id}
                  style={{
                    padding: '1rem',
                    border: '1px solid var(--border)',
                    borderRadius: '8px',
                    background: 'var(--bg-secondary)'
                  }}
                >
                  <h3 style={{ fontSize: '1rem', fontWeight: '600', marginBottom: '0.5rem' }}>
                    {course.name}
                  </h3>
                  <div className="text-xs text-secondary" style={{ marginBottom: '0.5rem' }}>
                    {course.code && <div>קוד: {course.code}</div>}
                    {course.semester && <div>סמסטר: {course.semester}</div>}
                    {course.credits && <div>נקודות: {course.credits}</div>}
                  </div>
                  <button
                    onClick={() => deleteCourse(course.id)}
                    className="btn btn-secondary text-xs"
                    style={{ padding: '0.25rem 0.5rem' }}
                  >
                    מחק
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Modals */}
      <CourseModal
        isOpen={isCourseModalOpen}
        onClose={() => setIsCourseModalOpen(false)}
        onSubmit={createCourse}
      />

      <ExamModal
        isOpen={isExamModalOpen}
        onClose={() => setIsExamModalOpen(false)}
        onSubmit={createExam}
        courses={activeCourses}
      />
    </div>
  );
}
