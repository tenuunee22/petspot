'use client';
import Link from 'next/link';

export default function Navbar() {
  return (
    <nav style={{ 
      padding: 16, 
      borderBottom: '1px solid #eee',
      backgroundColor: '#f8f9fa',
      display: 'flex',
      gap: 24,
      alignItems: 'center'
    }}>
      <Link href="/" style={{ marginRight: 12, fontWeight: 'bold', fontSize: 18, textDecoration: 'none', color: '#333' }}>
        🐾 PetSpot
      </Link>
      <Link href="/lost-found" style={{ marginRight: 12, textDecoration: 'none', color: '#333' }}>
        Алга болсон / Олсон
      </Link>
      <Link href="/post/create" style={{ marginRight: 12, textDecoration: 'none', color: '#333' }}>
        Пост оруулах
      </Link>
      <Link href="/boost" style={{ marginRight: 12, textDecoration: 'none', color: '#333' }}>
        Постыг өргөтгөх
      </Link>
      <Link href="/profile" style={{ textDecoration: 'none', color: '#333' }}>
        Миний профайл
      </Link>
    </nav>
  );
}
