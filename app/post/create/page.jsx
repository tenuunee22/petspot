'use client';
import { useState } from 'react';

export default function CreatePost(){
  const [formData, setFormData] = useState({
    type: 'lost',
    petName: '',
    breed: '',
    color: '',
    lostDate: '',
    location: '',
    description: '',
    phoneNumber: '',
    email: '',
    isPremium: false,
    photo: null
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({
        ...prev,
        photo: file.name
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate required fields
    if (!formData.petName || !formData.location || !formData.phoneNumber) {
      alert('Пожалуйста, заполните все обязательные поля');
      return;
    }

    console.log('Form submitted:', formData);
    setSubmitted(true);
    
    // Reset form after 2 seconds
    setTimeout(() => {
      setFormData({
        type: 'lost',
        petName: '',
        breed: '',
        color: '',
        lostDate: '',
        location: '',
        description: '',
        phoneNumber: '',
        email: '',
        isPremium: false,
        photo: null
      });
      setSubmitted(false);
    }, 3000);
  };

  if (submitted) {
    return (
      <main style={{ maxWidth: 800, margin: '0 auto', padding: 20 }}>
        <div style={{
          backgroundColor: '#d4edda',
          border: '1px solid #c3e6cb',
          color: '#155724',
          padding: 30,
          borderRadius: 8,
          textAlign: 'center'
        }}>
          <h2 style={{ fontSize: 24, marginBottom: 16 }}>✅ Амжилттай!</h2>
          <p style={{ fontSize: 16, marginBottom: 16 }}>
            Таны пост амжилттай оруулагдлаа! Хүмүүс та нохойтохой олоход туслахаар л болно.
          </p>
          <p style={{ fontSize: 14, color: '#155724' }}>
            Таны утасны дугаарыг сонирхож байгаа хүмүүс холбоо авах болно.
          </p>
        </div>
      </main>
    );
  }

  return (
    <main style={{ maxWidth: 900, margin: '0 auto', padding: 20 }}>
      <h1 style={{ fontSize: 32, marginBottom: 30 }}>📝 Пост оруулах</h1>

      <form onSubmit={handleSubmit}>
        {/* Post Type Section */}
        <section style={{
          backgroundColor: '#f8f9fa',
          padding: 20,
          borderRadius: 8,
          marginBottom: 30,
          border: '1px solid #ddd'
        }}>
          <h2 style={{ fontSize: 18, marginBottom: 16 }}>📌 Пост төрөл</h2>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
            <label style={{
              border: formData.type === 'lost' ? '2px solid #dc3545' : '1px solid #ddd',
              padding: 16,
              borderRadius: 8,
              cursor: 'pointer',
              backgroundColor: formData.type === 'lost' ? '#fff5f5' : 'white'
            }}>
              <input
                type="radio"
                name="type"
                value="lost"
                checked={formData.type === 'lost'}
                onChange={handleChange}
                style={{ marginRight: 8 }}
              />
              <span style={{ fontSize: 16, fontWeight: 'bold' }}>🆘 Алга болсон нохой/муур</span>
            </label>

            <label style={{
              border: formData.type === 'found' ? '2px solid #28a745' : '1px solid #ddd',
              padding: 16,
              borderRadius: 8,
              cursor: 'pointer',
              backgroundColor: formData.type === 'found' ? '#f0fff4' : 'white'
            }}>
              <input
                type="radio"
                name="type"
                value="found"
                checked={formData.type === 'found'}
                onChange={handleChange}
                style={{ marginRight: 8 }}
              />
              <span style={{ fontSize: 16, fontWeight: 'bold' }}>🎉 Олсон нохой/муур</span>
            </label>
          </div>
        </section>

        {/* Pet Details Section */}
        <section style={{
          backgroundColor: '#f8f9fa',
          padding: 20,
          borderRadius: 8,
          marginBottom: 30,
          border: '1px solid #ddd'
        }}>
          <h2 style={{ fontSize: 18, marginBottom: 16 }}>🐾 Амьтны мэдээлэл</h2>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
            <div>
              <label style={{ display: 'block', marginBottom: 8, fontWeight: 'bold' }}>
                Нохойн / Муурны нэр *
              </label>
              <input
                type="text"
                name="petName"
                value={formData.petName}
                onChange={handleChange}
                placeholder="Жишээ: Бөмбө, Тайга"
                required
                style={{
                  width: '100%',
                  padding: 10,
                  border: '1px solid #ddd',
                  borderRadius: 4,
                  fontSize: 14,
                  boxSizing: 'border-box'
                }}
              />
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: 8, fontWeight: 'bold' }}>
                Төрөл
              </label>
              <input
                type="text"
                name="breed"
                value={formData.breed}
                onChange={handleChange}
                placeholder="Жишээ: Далматин, Метис"
                style={{
                  width: '100%',
                  padding: 10,
                  border: '1px solid #ddd',
                  borderRadius: 4,
                  fontSize: 14,
                  boxSizing: 'border-box'
                }}
              />
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: 8, fontWeight: 'bold' }}>
                Өнгө
              </label>
              <input
                type="text"
                name="color"
                value={formData.color}
                onChange={handleChange}
                placeholder="Жишээ: Хар, Цагаан, Шар"
                style={{
                  width: '100%',
                  padding: 10,
                  border: '1px solid #ddd',
                  borderRadius: 4,
                  fontSize: 14,
                  boxSizing: 'border-box'
                }}
              />
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: 8, fontWeight: 'bold' }}>
                Алга болсон / Олсон өдөр
              </label>
              <input
                type="date"
                name="lostDate"
                value={formData.lostDate}
                onChange={handleChange}
                style={{
                  width: '100%',
                  padding: 10,
                  border: '1px solid #ddd',
                  borderRadius: 4,
                  fontSize: 14,
                  boxSizing: 'border-box'
                }}
              />
            </div>
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: 8, fontWeight: 'bold' }}>
              Алга болсон / Олсон байршил *
            </label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="Жишээ: Улаанбаатар, Сүхбаатар дүүрэг, Энхтайваны өргөн чөлөө 3-р хотхон"
              required
              style={{
                width: '100%',
                padding: 10,
                border: '1px solid #ddd',
                borderRadius: 4,
                fontSize: 14,
                boxSizing: 'border-box',
                marginBottom: 16
              }}
            />
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: 8, fontWeight: 'bold' }}>
              Дэлгэрэнгүй тайлбар
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Жишээ: Хоёр нүдний хооронд цагаан толбо, сүүл эргүүтэй, маш сайхан нохой..."
              style={{
                width: '100%',
                padding: 10,
                border: '1px solid #ddd',
                borderRadius: 4,
                fontSize: 14,
                boxSizing: 'border-box',
                height: 100,
                fontFamily: 'Arial, sans-serif',
                marginBottom: 16
              }}
            />
          </div>
        </section>

        {/* Photo Section */}
        <section style={{
          backgroundColor: '#f8f9fa',
          padding: 20,
          borderRadius: 8,
          marginBottom: 30,
          border: '1px solid #ddd'
        }}>
          <h2 style={{ fontSize: 18, marginBottom: 16 }}>📸 Зураг</h2>

          <div style={{
            border: '2px dashed #ddd',
            padding: 30,
            borderRadius: 8,
            textAlign: 'center',
            backgroundColor: 'white'
          }}>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              style={{ display: 'none' }}
              id="photo-input"
            />
            <label htmlFor="photo-input" style={{
              cursor: 'pointer',
              display: 'block'
            }}>
              <p style={{ fontSize: 18, marginBottom: 8 }}>📷 Зургаа оруулна уу</p>
              <p style={{ fontSize: 14, color: '#666', margin: 0 }}>
                {formData.photo ? `Сонгогдсон: ${formData.photo}` : 'Клик хийнэ үү эсвэл сүүлээр буулгана уу'}
              </p>
            </label>
          </div>
        </section>

        {/* Contact Section */}
        <section style={{
          backgroundColor: '#f8f9fa',
          padding: 20,
          borderRadius: 8,
          marginBottom: 30,
          border: '1px solid #ddd'
        }}>
          <h2 style={{ fontSize: 18, marginBottom: 16 }}>☎️ Холбоотын мэдээ</h2>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <div>
              <label style={{ display: 'block', marginBottom: 8, fontWeight: 'bold' }}>
                Таны утасны дугаар *
              </label>
              <input
                type="tel"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                placeholder="88012345678"
                required
                style={{
                  width: '100%',
                  padding: 10,
                  border: '1px solid #ddd',
                  borderRadius: 4,
                  fontSize: 14,
                  boxSizing: 'border-box'
                }}
              />
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: 8, fontWeight: 'bold' }}>
                Цахим шуудан
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="example@gmail.com"
                style={{
                  width: '100%',
                  padding: 10,
                  border: '1px solid #ddd',
                  borderRadius: 4,
                  fontSize: 14,
                  boxSizing: 'border-box'
                }}
              />
            </div>
          </div>
        </section>

        {/* Premium Section */}
        <section style={{
          backgroundColor: '#fff3cd',
          padding: 20,
          borderRadius: 8,
          marginBottom: 30,
          border: '2px solid #ffc107'
        }}>
          <h2 style={{ fontSize: 18, marginBottom: 16 }}>💎 Постыг өргөтгөх</h2>

          <label style={{
            display: 'flex',
            alignItems: 'center',
            cursor: 'pointer',
            marginBottom: 12
          }}>
            <input
              type="checkbox"
              name="isPremium"
              checked={formData.isPremium}
              onChange={handleChange}
              style={{ marginRight: 12, width: 20, height: 20 }}
            />
            <span style={{ fontSize: 16 }}>
              💰 Энэ постыг өргөтгөх (₮5000 - ₮20000)
            </span>
          </label>

          {formData.isPremium && (
            <div style={{
              backgroundColor: 'rgba(255,255,255,0.7)',
              padding: 12,
              borderRadius: 4,
              fontSize: 14,
              color: '#666'
            }}>
              <p>✅ Та постоо өргөтгөсөн тохиолдолд:</p>
              <ul>
                <li>Нүүрийн эхэнд гарна</li>
                <li>Олон хүмүүст СМС илгээнэ</li>
                <li>Олоход орлуулаа өндөр байна</li>
              </ul>
              <p style={{ marginTop: 16, fontWeight: 'bold' }}>
                💡 Постыг өргөтгөх үйлчилгээ сонгохыг "Постыг өргөтгөх" хэсэгт үзүүлнэ
              </p>
            </div>
          )}
        </section>

        {/* Submit Button */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 20 }}>
          <button
            type="submit"
            style={{
              padding: '14px 24px',
              fontSize: 16,
              fontWeight: 'bold',
              backgroundColor: '#28a745',
              color: 'white',
              border: 'none',
              borderRadius: 4,
              cursor: 'pointer'
            }}
          >
            ✅ Пост оруулах
          </button>

          <button
            type="reset"
            style={{
              padding: '14px 24px',
              fontSize: 16,
              fontWeight: 'bold',
              backgroundColor: '#6c757d',
              color: 'white',
              border: 'none',
              borderRadius: 4,
              cursor: 'pointer'
            }}
          >
            🔄 Цэвэрлэх
          </button>
        </div>

        <div style={{
          backgroundColor: '#e7f3ff',
          padding: 16,
          borderRadius: 8,
          borderLeft: '4px solid #2c5aa0',
          fontSize: 14,
          color: '#333'
        }}>
          <p style={{ marginBottom: 8 }}>
            <strong>⚠️ Чухал:</strong> Таны утасны дугаарыг сонирхсон хүмүүс холбоо авах болно.
            Боломжтой цагт утсандаа гаргаж байх ёстой.
          </p>
          <p style={{ margin: 0 }}>
            * - Заавал бөглөх ёстой талбар
          </p>
        </div>
      </form>
    </main>
  );
}
