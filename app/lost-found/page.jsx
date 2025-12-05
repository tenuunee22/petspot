'use client';
import { useState } from 'react';

export default function LostFound() {
  const [filter, setFilter] = useState('all');
  const [searchType, setSearchType] = useState('all');

  // Sample posts data
  const posts = [
    {
      id: 1,
      type: 'lost',
      title: 'Алга болсон: Хар эргүүд бүхий улаан нохой',
      breed: 'Далматин',
      location: 'Улаанбаатар, Баянзүрх дүүрэг',
      date: '2025-12-03',
      photo: '🐕',
      contact: '88012345',
      details: 'Задгай хотын нэг нүүрэнд алга болсон. Маш эелтэй нохой. Олсон хүнд урамшуулал өгнө.',
      isPremium: false
    },
    {
      id: 2,
      type: 'lost',
      title: 'Алга болсон: Цагаан муур',
      breed: 'Перс',
      location: 'Улаанбаатар, Сүхбаатар дүүрэг',
      date: '2025-12-02',
      photo: '😸',
      contact: '88054321',
      details: 'Дотроо өсөж байсан муур сүүлийн өдрүүдэд алга болсон.',
      isPremium: true
    },
    {
      id: 3,
      type: 'found',
      title: 'Олсон: Бурийн өнгийн нохой',
      breed: 'Метис',
      location: 'Улаанбаатар, Хан-Уул дүүрэг',
      date: '2025-12-01',
      photo: '🐕',
      contact: '88087654',
      details: 'Ойр дахь үй хөрш дээр олсон нохой. Маш сайхан нохой. Эзэмшигч хайж байна.',
      isPremium: false
    },
    {
      id: 4,
      type: 'found',
      title: 'Олсон: Том шар нохой',
      breed: 'Лабрадор',
      location: 'Улаанбаатар, Баянгөл дүүрэг',
      date: '2025-11-30',
      photo: '🐕',
      contact: '88098765',
      details: 'Том шар нохойг олсон. Их сайхан байдаг. Эзэмшигчтэй холбоотун авна.',
      isPremium: true
    },
    {
      id: 5,
      type: 'lost',
      title: 'Алга болсон: Жижиг цагаан нохой',
      breed: 'Чихуахуа',
      location: 'Улаанбаатар, Сонгинохайрхан дүүрэг',
      date: '2025-12-04',
      photo: '🐕',
      contact: '88011111',
      details: 'Жижиг нохой 5 хоног алга болсон. Оченно сайн нохой. Олсон хүнээс асуу.',
      isPremium: true
    }
  ];

  const filtered = posts.filter(post => {
    let typeMatch = true;
    let filterMatch = true;

    if (searchType !== 'all') {
      typeMatch = post.type === searchType;
    }

    if (filter === 'lost') {
      filterMatch = post.type === 'lost';
    } else if (filter === 'found') {
      filterMatch = post.type === 'found';
    }

    return typeMatch && filterMatch;
  });

  return (
    <main style={{ maxWidth: 1200, margin: '0 auto', padding: 20 }}>
      <h1 style={{ fontSize: 32, marginBottom: 30 }}>🔍 Алга болсон / Олсон нохой, муур</h1>

      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: 20,
        marginBottom: 30,
        backgroundColor: '#f8f9fa',
        padding: 20,
        borderRadius: 8
      }}>
        <div>
          <label style={{ display: 'block', marginBottom: 8, fontWeight: 'bold' }}>
            Хайлтын төрөл:
          </label>
          <select
            value={searchType}
            onChange={(e) => setSearchType(e.target.value)}
            style={{
              width: '100%',
              padding: 10,
              border: '1px solid #ddd',
              borderRadius: 4,
              fontSize: 14
            }}
          >
            <option value="all">Бүгд</option>
            <option value="lost">Алга болсон</option>
            <option value="found">Олсон</option>
          </select>
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: 8, fontWeight: 'bold' }}>
            Төрөл:
          </label>
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            style={{
              width: '100%',
              padding: 10,
              border: '1px solid #ddd',
              borderRadius: 4,
              fontSize: 14
            }}
          >
            <option value="all">Бүгд</option>
            <option value="lost">Алга болсон</option>
            <option value="found">Олсон</option>
          </select>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
        {filtered.map((post) => (
          <div
            key={post.id}
            style={{
              border: '2px solid #ddd',
              borderRadius: 8,
              overflow: 'hidden',
              backgroundColor: 'white',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
              transition: 'all 0.3s ease',
              position: 'relative'
            }}
          >
            {post.isPremium && (
              <div style={{
                backgroundColor: '#ffc107',
                color: '#333',
                padding: 8,
                textAlign: 'center',
                fontWeight: 'bold',
                fontSize: 12
              }}>
                ⭐ СҮҮЛТЭЙ БОЛГОСОН ПОСТ
              </div>
            )}

            <div style={{
              fontSize: 60,
              textAlign: 'center',
              padding: 20,
              backgroundColor: '#f8f9fa'
            }}>
              {post.photo}
            </div>

            <div style={{ padding: 16 }}>
              <h2 style={{
                fontSize: 18,
                marginBottom: 12,
                color: post.type === 'lost' ? '#dc3545' : '#28a745'
              }}>
                {post.title}
              </h2>

              <div style={{ marginBottom: 12, fontSize: 14, color: '#666' }}>
                <p><strong>Төрөл:</strong> {post.breed}</p>
                <p><strong>Байршил:</strong> {post.location}</p>
                <p><strong>Огноо:</strong> {post.date}</p>
              </div>

              <p style={{ marginBottom: 12, fontSize: 14, lineHeight: 1.6 }}>
                {post.details}
              </p>

              <div style={{
                backgroundColor: '#e7f3ff',
                padding: 12,
                borderRadius: 4,
                marginBottom: 12,
                borderLeft: '4px solid #2c5aa0'
              }}>
                <p style={{ margin: 0, fontSize: 14 }}>
                  <strong>📞 Холбоотын мэдээ:</strong> {post.contact}
                </p>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                <button style={{
                  padding: '10px 16px',
                  backgroundColor: '#2c5aa0',
                  color: 'white',
                  border: 'none',
                  borderRadius: 4,
                  cursor: 'pointer',
                  fontSize: 14,
                  fontWeight: 'bold'
                }}>
                  📱 СМС илгээх
                </button>
                <button style={{
                  padding: '10px 16px',
                  backgroundColor: '#6c757d',
                  color: 'white',
                  border: 'none',
                  borderRadius: 4,
                  cursor: 'pointer',
                  fontSize: 14,
                  fontWeight: 'bold'
                }}>
                  💬 Мессеж
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div style={{
          textAlign: 'center',
          padding: 40,
          backgroundColor: '#f8f9fa',
          borderRadius: 8
        }}>
          <p style={{ fontSize: 18, color: '#666' }}>
            Хайлтын үр дүн олдсонгүй
          </p>
        </div>
      )}
    </main>
  );
}
