import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { authService } from '../services/auth';
import { useAuthStore } from '../stores/authStore';
import toast from 'react-hot-toast';

export default function Login() {
  const navigate = useNavigate();
  const setAuth = useAuthStore((state) => state.setAuth);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await authService.login({ username, password });
      setAuth(
        { id: response.id, username: response.username, email: response.email },
        response.token
      );
      toast.success('התחברת בהצלחה');
      navigate('/dashboard');
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'שגיאה בהתחברות');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div className="card" style={{ maxWidth: '400px', width: '100%' }}>
        <h1 style={{ marginBottom: '1.5rem', fontSize: '1.5rem', fontWeight: 'bold' }}>MentorOS</h1>
        <p className="text-secondary text-sm" style={{ marginBottom: '1.5rem' }}>
          התחבר כדי להמשיך
        </p>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="label">שם משתמש</label>
            <input
              type="text"
              className="input"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              disabled={loading}
            />
          </div>

          <div className="mb-4">
            <label className="label">סיסמה</label>
            <input
              type="password"
              className="input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={loading}
            />
          </div>

          <button type="submit" className="btn btn-primary" style={{ width: '100%' }} disabled={loading}>
            {loading ? 'מתחבר...' : 'התחבר'}
          </button>
        </form>

        <p className="text-sm text-secondary" style={{ marginTop: '1rem', textAlign: 'center' }}>
          אין לך חשבון?{' '}
          <Link to="/register" style={{ color: 'var(--primary)', textDecoration: 'none' }}>
            הירשם
          </Link>
        </p>
      </div>
    </div>
  );
}
