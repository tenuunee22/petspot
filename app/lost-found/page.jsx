'use client';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { collection, query, orderBy, onSnapshot, where } from 'firebase/firestore';
import { db } from '../../lib/firebase';

export default function LostFound() {
  const [filter, setFilter] = useState('all');
  const [searchType, setSearchType] = useState('all');
  const [posts, setPosts] = useState([]);
  const [highlightedPostId, setHighlightedPostId] = useState(null);
  const [showPublishedBanner, setShowPublishedBanner] = useState(false);
  const searchParams = useSearchParams();

  useEffect(() => {
    const q = query(collection(db, 'posts'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const items = snapshot.docs.map((doc) => ({ id: doc.id, ...(doc.data() || {}) }));
      setPosts(items);
    }, (err) => {
      console.error('Failed to subscribe to posts', err);
    });

    return () => unsubscribe();
  }, []);

    useEffect(() => {
      const q = query(
        collection(db, 'posts'),
        where('published', '==', true),
        where('status', '==', 'active'),
        orderBy('createdAt', 'desc')
      );
      const unsubscribe = onSnapshot(q, (snapshot) => {
        const items = snapshot.docs.map((doc) => ({ id: doc.id, ...(doc.data() || {}) }));
        setPosts(items);
      }, (err) => {
        console.error('Failed to subscribe to posts', err);
      });

      return () => unsubscribe();
    }, []);

    // Check for highlight param or session flag when component mounts
    useEffect(() => {
      try {
        const param = searchParams?.get('highlight');
        if (param) {
          setHighlightedPostId(param);
          setShowPublishedBanner(true);
          // hide banner after 4s
          setTimeout(() => setShowPublishedBanner(false), 4000);
        } else {
          // also check sessionStorage fallback
          const rec = sessionStorage.getItem('published_post');
          if (rec) {
            const parsed = JSON.parse(rec);
            if (parsed?.id) {
              setHighlightedPostId(parsed.id);
              setShowPublishedBanner(true);
              setTimeout(() => setShowPublishedBanner(false), 4000);
              // clear session flag
              sessionStorage.removeItem('published_post');
            }
          }
        }
      } catch (e) {
        // ignore
      }
    }, [searchParams]);

    // When posts load, auto-scroll to highlighted post if present
    useEffect(() => {
      if (!highlightedPostId || posts.length === 0) return;
      const el = document.getElementById(`post-${highlightedPostId}`);
      if (el) {
        // add temporary highlight
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        const original = el.style.boxShadow;
        el.style.boxShadow = '0 0 0 6px rgba(40,167,69,0.12)';
        setTimeout(() => { el.style.boxShadow = original || ''; }, 3500);
      }
    }, [posts, highlightedPostId]);
  const filtered = posts.filter((post) => {
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

      {showPublishedBanner && (
        <div style={{ backgroundColor: '#d4edda', border: '2px solid #28a745', color: '#155724', padding: 12, borderRadius: 8, marginBottom: 20, textAlign: 'center', fontWeight: 'bold' }}>
          ✅ Таны пост нийтэлэгдсэн! Та одоо пост руу шилжиж байна...
        </div>
      )}

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
            id={`post-${post.id}`}
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
                ⭐ ТОХИРУУЛСАН ПОСТ
              </div>
            )}

            <div style={{
              fontSize: 60,
              textAlign: 'center',
              padding: 20,
              backgroundColor: '#f8f9fa',
              minHeight: 200,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              overflow: 'hidden'
            }}>
              {post.photoUrl ? (
                <img 
                  src={post.photoUrl} 
                  alt={post.petName}
                  style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'cover' }}
                />
              ) : '🐕'}
            </div>

            <div style={{ padding: 16 }}>
              <h2 style={{
                fontSize: 18,
                marginBottom: 12,
                color: post.type === 'lost' ? '#dc3545' : '#28a745'
              }}>
                {post.type === 'lost' ? `Алга болсон: ${post.petName}` : `Олсон: ${post.petName}`}
              </h2>

              <div style={{ marginBottom: 12, fontSize: 14, color: '#666' }}>
                <p><strong>Төрөл:</strong> {post.breed || '-'}</p>
                <p><strong>Байршил:</strong> {post.location || '-'}</p>
                <p><strong>Огноо:</strong> {post.lostDate ? new Date(post.lostDate.seconds ? post.lostDate.seconds * 1000 : post.lostDate).toLocaleDateString() : (post.createdAt ? new Date(post.createdAt.seconds * 1000).toLocaleDateString() : '-')}</p>
              </div>

              <p style={{ marginBottom: 12, fontSize: 14, lineHeight: 1.6 }}>
                {post.description}
              </p>

              <div style={{
                backgroundColor: '#e7f3ff',
                padding: 12,
                borderRadius: 4,
                marginBottom: 12,
                borderLeft: '4px solid #2c5aa0'
              }}>
                <p style={{ margin: 0, fontSize: 14 }}>
                  <strong>📞 Холбоотын мэдээ:</strong> {post.phoneNumber}
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
