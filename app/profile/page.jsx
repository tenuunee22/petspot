'use client';
import { useAuth } from '../../context/AuthContext';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { collection, query, where, onSnapshot, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { deleteObject, ref } from 'firebase/storage';
import { storage } from '../../lib/firebase';

export default function Profile(){
  const { user, logout } = useAuth();
  const [userPosts, setUserPosts] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editFormData, setEditFormData] = useState({});
  const [loading, setLoading] = useState(true);

  // Fetch user's posts
  useEffect(() => {
    if (!user?.uid) {
      setLoading(false);
      return;
    }

    const q = query(collection(db, 'posts'), where('authorUid', '==', user.uid));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const posts = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setUserPosts(posts);
      setLoading(false);
    }, (err) => {
      console.error('Failed to fetch user posts', err);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [user?.uid]);

  const handleDelete = async (postId, photoUrl) => {
    if (!confirm('Энэ постыг устгахдаа зөв үү?')) return;

    try {
      // Delete photo from storage if exists
      if (photoUrl) {
        const photoRef = ref(storage, photoUrl);
        try {
          await deleteObject(photoRef);
        } catch (err) {
          console.warn('Failed to delete photo from storage', err);
        }
      }

      // Delete post from Firestore
      await deleteDoc(doc(db, 'posts', postId));
      alert('Пост амжилттай устгагдлаа');
    } catch (err) {
      console.error('Failed to delete post', err);
      alert('Постыг устгахад алдаа гарлаа');
    }
  };

  const handleEditStart = (post) => {
    setEditingId(post.id);
    setEditFormData({
      petName: post.petName,
      breed: post.breed,
      color: post.color,
      location: post.location,
      description: post.description,
      isPremium: post.isPremium || false
    });
  };

  const handleEditChange = (e) => {
    const { name, value, type, checked } = e.target;
    setEditFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleEditSave = async (postId) => {
    try {
      await updateDoc(doc(db, 'posts', postId), editFormData);
      setEditingId(null);
      alert('Пост амжилттай шинэчлэгдлээ');
    } catch (err) {
      console.error('Failed to update post', err);
      alert('Постыг шинэчлэхэд алдаа гарлаа');
    }
  };

  const handlePublish = async (postId, currentStatus) => {
    try {
      await updateDoc(doc(db, 'posts', postId), {
        published: !currentStatus,
        status: !currentStatus ? 'active' : 'draft',
        updatedAt: new Date()
      });
      alert(!currentStatus ? 'Пост нийтэлэгдлээ' : 'Пост хаагдлаа');
    } catch (err) {
      console.error('Failed to update post status', err);
      alert('Постын статусыг өөрчлөхөд алдаа гарлаа');
    }
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
          <p style={{ fontSize: 28, fontWeight: 'bold', color: '#2c5aa0', margin: 0 }}>{userPosts.length}</p>
        </div>

        <div style={{ backgroundColor: '#f0fff4', padding: 20, borderRadius: 8, textAlign: 'center' }}>
          <p style={{ fontSize: 14, color: '#666', marginBottom: 8 }}>Амжилттай олсон</p>
          <p style={{ fontSize: 28, fontWeight: 'bold', color: '#28a745', margin: 0 }}>{userPosts.filter(p => p.type === 'found').length}</p>
        </div>
      </div>

      {/* User Posts Section */}
      <section style={{ marginBottom: 30 }}>
        <h2 style={{ fontSize: 24, marginBottom: 20 }}>📝 Миний постууд</h2>

        {loading ? (
          <p style={{ textAlign: 'center', color: '#666' }}>Постуудыг ачаалж байна...</p>
        ) : userPosts.length === 0 ? (
          <div style={{ backgroundColor: '#f8f9fa', padding: 30, borderRadius: 8, textAlign: 'center' }}>
            <p style={{ fontSize: 16, color: '#666', marginBottom: 16 }}>Та одоогоор постгүй байна</p>
            <Link href="/post/create"><button style={{ padding: '10px 20px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: 4, cursor: 'pointer' }}>➕ Шинэ пост оруулах</button></Link>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 16 }}>
            {userPosts.map((post) => (
              <div key={post.id} style={{ backgroundColor: 'white', border: '1px solid #ddd', borderRadius: 8, padding: 16, overflow: 'hidden' }}>
                {editingId === post.id ? (
                  // Edit mode
                  <div>
                    <h3 style={{ marginTop: 0 }}>Постыг засах</h3>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 12 }}>
                      <div>
                        <label style={{ display: 'block', marginBottom: 6, fontWeight: 'bold', fontSize: 14 }}>Амьтны нэр:</label>
                        <input
                          type="text"
                          name="petName"
                          value={editFormData.petName}
                          onChange={handleEditChange}
                          style={{ width: '100%', padding: 8, border: '1px solid #ddd', borderRadius: 4, boxSizing: 'border-box' }}
                        />
                      </div>
                      <div>
                        <label style={{ display: 'block', marginBottom: 6, fontWeight: 'bold', fontSize: 14 }}>Төрөл:</label>
                        <input
                          type="text"
                          name="breed"
                          value={editFormData.breed}
                          onChange={handleEditChange}
                          style={{ width: '100%', padding: 8, border: '1px solid #ddd', borderRadius: 4, boxSizing: 'border-box' }}
                        />
                      </div>
                      <div>
                        <label style={{ display: 'block', marginBottom: 6, fontWeight: 'bold', fontSize: 14 }}>Өнгө:</label>
                        <input
                          type="text"
                          name="color"
                          value={editFormData.color}
                          onChange={handleEditChange}
                          style={{ width: '100%', padding: 8, border: '1px solid #ddd', borderRadius: 4, boxSizing: 'border-box' }}
                        />
                      </div>
                      <div>
                        <label style={{ display: 'block', marginBottom: 6, fontWeight: 'bold', fontSize: 14 }}>Байршил:</label>
                        <input
                          type="text"
                          name="location"
                          value={editFormData.location}
                          onChange={handleEditChange}
                          style={{ width: '100%', padding: 8, border: '1px solid #ddd', borderRadius: 4, boxSizing: 'border-box' }}
                        />
                      </div>
                    </div>
                    <div style={{ marginBottom: 12 }}>
                      <label style={{ display: 'block', marginBottom: 6, fontWeight: 'bold', fontSize: 14 }}>Тайлбар:</label>
                      <textarea
                        name="description"
                        value={editFormData.description}
                        onChange={handleEditChange}
                        style={{ width: '100%', padding: 8, border: '1px solid #ddd', borderRadius: 4, boxSizing: 'border-box', height: 80, fontFamily: 'Arial' }}
                      />
                    </div>
                    <label style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
                      <input
                        type="checkbox"
                        name="isPremium"
                        checked={editFormData.isPremium}
                        onChange={handleEditChange}
                      />
                      <span>💎 Өргөтгөсөн пост</span>
                    </label>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                      <button
                        onClick={() => handleEditSave(post.id)}
                        style={{ padding: '8px 12px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: 4, cursor: 'pointer', fontWeight: 'bold' }}
                      >
                        💾 Хадгалах
                      </button>
                      <button
                        onClick={() => setEditingId(null)}
                        style={{ padding: '8px 12px', backgroundColor: '#6c757d', color: 'white', border: 'none', borderRadius: 4, cursor: 'pointer', fontWeight: 'bold' }}
                      >
                        ❌ Цуцлах
                      </button>
                    </div>
                  </div>
                ) : (
                  // View mode
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: 12 }}>
                      <div>
                        <h3 style={{ margin: '0 0 8px 0', fontSize: 18, color: post.type === 'lost' ? '#dc3545' : '#28a745' }}>
                          {post.type === 'lost' ? '🆘 Алга болсон' : '🎉 Олсон'}: {post.petName}
                        </h3>
                        <p style={{ margin: 0, fontSize: 14, color: '#666' }}>
                          <strong>Төрөл:</strong> {post.breed || '-'} | <strong>Өнгө:</strong> {post.color || '-'} | <strong>Байршил:</strong> {post.location || '-'}
                        </p>
                      </div>
                      {post.isPremium && <span style={{ backgroundColor: '#ffc107', color: '#333', padding: '4px 8px', borderRadius: 4, fontSize: 12, fontWeight: 'bold' }}>⭐ ӨРГӨТГӨСӨН</span>}
                    </div>

                    {post.photoUrl && (
                      <img 
                        src={post.photoUrl} 
                        alt={post.petName}
                        style={{ maxWidth: '100%', maxHeight: 200, borderRadius: 4, marginBottom: 12, objectFit: 'cover' }}
                      />
                    )}

                    <p style={{ fontSize: 14, color: '#333', marginBottom: 12, lineHeight: 1.5 }}>
                      {post.description}
                    </p>

                    <div style={{ backgroundColor: '#e7f3ff', padding: 10, borderRadius: 4, marginBottom: 12, fontSize: 13 }}>
                      <strong>📞 Холбоо:</strong> {post.phoneNumber} {post.email ? `| ${post.email}` : ''}
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10, marginBottom: 12 }}>
                      <button
                        onClick={() => handleEditStart(post)}
                        style={{ padding: '8px 12px', backgroundColor: '#2c5aa0', color: 'white', border: 'none', borderRadius: 4, cursor: 'pointer', fontWeight: 'bold' }}
                      >
                        ✏️ Засах
                      </button>
                      <button
                        onClick={() => handlePublish(post.id, post.published)}
                        style={{ padding: '8px 12px', backgroundColor: post.published ? '#ff9800' : '#4caf50', color: 'white', border: 'none', borderRadius: 4, cursor: 'pointer', fontWeight: 'bold' }}
                      >
                        {post.published ? '🔒 Хаах' : '🌐 Нийтлэх'}
                      </button>
                      <button
                        onClick={() => handleDelete(post.id, post.photoUrl)}
                        style={{ padding: '8px 12px', backgroundColor: '#dc3545', color: 'white', border: 'none', borderRadius: 4, cursor: 'pointer', fontWeight: 'bold' }}
                      >
                        🗑️ Устгах
                      </button>
                    </div>
                    <div style={{ backgroundColor: post.published ? '#e8f5e9' : '#fff3e0', padding: 8, borderRadius: 4, fontSize: 12, textAlign: 'center', color: post.published ? '#2e7d32' : '#e65100' }}>
                      {post.published ? '✅ Нийтэд харагдаж байна' : '🔒 Нуугдсан'}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </section>

      <Link href="/post/create">
        <button style={{ width: '100%', padding: '14px', fontSize: 16, fontWeight: 'bold', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: 4, cursor: 'pointer' }}>
          ➕ Шинэ пост оруулах
        </button>
      </Link>
    </main>
  );
}
