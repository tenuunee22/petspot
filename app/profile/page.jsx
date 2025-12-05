'use client';
import { useAuth } from '../../context/AuthContext';
import { useState } from 'react';
import Link from 'next/link';

export default function Profile(){
  const { user, logout } = useAuth();
  const [userInfo, setUserInfo] = useState({
    name: '',
    email: user?.email || '',
    phone: '',
    address: ''
  });

  const handleUserInfoChange = (e) => {
    const { name, value } = e.target;
    setUserInfo(prev => ({ ...prev, [name]: value }));
  };

  const handleSaveProfile = (e) => {
    e.preventDefault();
    alert('Профайл амжилттай хадгалагдлаа!');
  };

  if (!user) {
    return (
      <main style={{ maxWidth: 600, margin: '0 auto', padding: 20 }}>
        <h1 style={{ fontSize: 32, marginBottom: 30, textAlign: 'center' }}>👤 Миний профайл</h1>
        <div style={{ backgroundColor: '#f8f9fa', padding: 40, borderRadius: 8, textAlign: 'center' }}>
          <p style={{ fontSize: 18, color: '#666', marginBottom: 20 }}>Пост оруулахын өмнө нэвтрэх шаардлагатай</p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 12 }}>
            <Link href="/auth/login"><button style={{ padding: '12px 20px', backgroundColor: '#2c5aa0', color: 'white', border: 'none', borderRadius: 6 }}>🔐 Нэвтрэх</button></Link>
            <Link href="/auth/signup"><button style={{ padding: '12px 20px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: 6 }}>✍️ Бүртгүүлэх</button></Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main style={{ maxWidth: 900, margin: '0 auto', padding: 20 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 30 }}>
        <h1 style={{ fontSize: 32, margin: 0 }}>👤 Миний профайл</h1>
        <button onClick={() => logout()} style={{ padding: '10px 16px', backgroundColor: '#dc3545', color: 'white', border: 'none', borderRadius: 4, cursor: 'pointer', fontWeight: 'bold' }}>Нэвтэрэлт цуцлах</button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 30 }}>
        <div style={{ backgroundColor: '#e7f3ff', padding: 20, borderRadius: 8, textAlign: 'center' }}>
          <p style={{ fontSize: 14, color: '#666', marginBottom: 8 }}>Таны пост</p>
          <p style={{ fontSize: 28, fontWeight: 'bold', color: '#2c5aa0', margin: 0 }}>12</p>
        </div>

        <div style={{ backgroundColor: '#f0fff4', padding: 20, borderRadius: 8, textAlign: 'center' }}>
          <p style={{ fontSize: 14, color: '#666', marginBottom: 8 }}>Амжилттай олсон</p>
          <p style={{ fontSize: 28, fontWeight: 'bold', color: '#28a745', margin: 0 }}>3</p>
        </div>
      </div>

      <section style={{ backgroundColor: '#f8f9fa', padding: 30, borderRadius: 8, border: '1px solid #ddd' }}>
        <h2 style={{ fontSize: 24, marginBottom: 24 }}>⚙️ Профайлын мэдээлэл</h2>

        <form onSubmit={handleSaveProfile}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
            <div>
              <label style={{ display: 'block', marginBottom: 8, fontWeight: 'bold' }}>Таны нэр:</label>
              <input type="text" name="name" value={userInfo.name} onChange={handleUserInfoChange} style={{ width: '100%', padding: 10, border: '1px solid #ddd', borderRadius: 4 }} />
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: 8, fontWeight: 'bold' }}>Цахим шуудан:</label>
              <input type="email" name="email" value={userInfo.email} onChange={handleUserInfoChange} style={{ width: '100%', padding: 10, border: '1px solid #ddd', borderRadius: 4 }} />
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: 8, fontWeight: 'bold' }}>Утасны дугаар:</label>
              <input type="tel" name="phone" value={userInfo.phone} onChange={handleUserInfoChange} style={{ width: '100%', padding: 10, border: '1px solid #ddd', borderRadius: 4 }} />
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: 8, fontWeight: 'bold' }}>Хаяг:</label>
              <input type="text" name="address" value={userInfo.address} onChange={handleUserInfoChange} style={{ width: '100%', padding: 10, border: '1px solid #ddd', borderRadius: 4 }} />
            </div>
          </div>

          <button type="submit" style={{ width: '100%', padding: '12px 16px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: 4, fontSize: 14, fontWeight: 'bold' }}>💾 Профайл хадгалах</button>
        </form>
      </section>

      <section style={{ backgroundColor: '#fff3cd', padding: 20, borderRadius: 8, borderLeft: '4px solid #ffc107', marginTop: 20 }}>
        <h3 style={{ marginBottom: 12 }}>💳 Төлбөрийн түүх</h3>
        <div style={{ backgroundColor: 'white', padding: 12, borderRadius: 4, fontSize: 14, color: '#666' }}>
          <p><strong>2025-12-04:</strong> Постыг өргөтгөх - ₮5000</p>
          <p><strong>2025-12-01:</strong> Постыг өргөтгөх - ₮10000</p>
          <p><strong>2025-11-28:</strong> Постыг өргөтгөх - ₮20000</p>
        </div>
      </section>
    </main>
  );
}