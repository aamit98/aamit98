import { ReactNode } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../stores/authStore';
import {
  LayoutDashboard,
  Calendar,
  BookOpen,
  Briefcase,
  Code,
  MessageSquare,
  FileText,
  LogOut
} from 'lucide-react';

interface LayoutProps {
  children: ReactNode;
}

const navItems = [
  { path: '/dashboard', icon: LayoutDashboard, label: 'דאשבורד' },
  { path: '/planner', icon: Calendar, label: 'תכנון שבועי' },
  { path: '/study', icon: BookOpen, label: 'לימודים' },
  { path: '/jobs', icon: Briefcase, label: 'חיפוש עבודה' },
  { path: '/leetcode', icon: Code, label: 'LeetCode' },
  { path: '/assistant', icon: MessageSquare, label: 'עוזר AI' },
  { path: '/documents', icon: FileText, label: 'מסמכים' },
];

export default function Layout({ children }: LayoutProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, clearAuth } = useAuthStore();

  const handleLogout = () => {
    clearAuth();
    navigate('/login');
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      {/* Sidebar */}
      <aside style={{
        width: '240px',
        background: 'var(--bg-primary)',
        borderLeft: '1px solid var(--border)',
        padding: '1.5rem 0',
        display: 'flex',
        flexDirection: 'column'
      }}>
        <div style={{ padding: '0 1rem', marginBottom: '2rem' }}>
          <h1 style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>MentorOS</h1>
          <p className="text-xs text-secondary" style={{ marginTop: '0.25rem' }}>
            {user?.fullName || user?.username}
          </p>
        </div>

        <nav style={{ flex: 1 }}>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  padding: '0.75rem 1rem',
                  color: isActive ? 'var(--primary)' : 'var(--text-primary)',
                  background: isActive ? 'var(--bg-tertiary)' : 'transparent',
                  textDecoration: 'none',
                  fontSize: '0.875rem',
                  fontWeight: isActive ? '500' : '400',
                  transition: 'all 0.2s'
                }}
              >
                <Icon size={18} />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <button
          onClick={handleLogout}
          className="btn btn-secondary"
          style={{ margin: '0 1rem', justifyContent: 'center' }}
        >
          <LogOut size={18} />
          התנתק
        </button>
      </aside>

      {/* Main Content */}
      <main style={{ flex: 1, overflow: 'auto' }}>
        <div className="container" style={{ padding: '2rem 1rem' }}>
          {children}
        </div>
      </main>
    </div>
  );
}
