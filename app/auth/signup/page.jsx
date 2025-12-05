'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../../context/AuthContext';

export default function SignupPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();
  const { signup } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await signup(email, password);
      router.push('/profile');
    } catch (err) {
      setError(err.message || 'Алдаа гарлаа');
    }
  };

  return (
    <main style={{ maxWidth: 600, margin: '0 auto', padding: 20 }}>
      <h1 style={{ fontSize: 28, marginBottom: 20 }}>🔐 Бүртгүүлэх</h1>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: 12 }}>
          <label style={{ display: 'block', marginBottom: 8 }}>Имэйл</label>
          <input value={email} onChange={(e) => setEmail(e.target.value)} required style={{ width: '100%', padding: 10 }} />
        </div>
        <div style={{ marginBottom: 12 }}>
          <label style={{ display: 'block', marginBottom: 8 }}>Нууц үг</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required style={{ width: '100%', padding: 10 }} />
        </div>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button type="submit" style={{ padding: '10px 16px', backgroundColor: '#2c5aa0', color: 'white', border: 'none', borderRadius: 4 }}>Бүртгүүлэх</button>
      </form>
    </main>
  );
}
