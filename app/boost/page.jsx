'use client';
import { useState } from 'react';

export default function BoostPage() {
  const [selectedPackage, setSelectedPackage] = useState(null);

  const packages = [
    {
      id: 1,
      name: '🚀 Төлбөртэй Үйлчилгээ',
      price: 10000,
      duration: '3 өдөр',
      features: [
        '✅ Илүүтгэнд эхэлж харагдана',
        '✅ "Яаралтай" тэмдэгтэй гарна',
        '✅ Хайлтын үр дүнгийн дээд талд байрлана',
        '✅ Түргэн олдох магадлалыг нэмэгдүүлнэ'
      ],
      description: 'Та амьтныг хурдан олоход туслахын тулд постоо төлбөртэй болгож болно.'
    },
    {
      id: 2,
      name: '⭐ Premium Үйлчилгээ',
      price: 20000,
      duration: '7 өдөр',
      features: [
        '✅ Постыг онцгой өнгөтэй гаргана',
        '✅ SMS мессежээр хэрэглэгчдэд мэдэгдэнэ (1 удаа)',
        '✅ Сайтын бүхтэнд заасан байна',
        '✅ Илүү хурдан олдоход туслана'
      ],
      description: 'Постыг онцгой өнгөтэй, анхаарал татах байдлаар гаргана. SMS мессежээр хэрэглэгчдэд мэдэгдэнэ (1 удаа).'
    },
    {
      id: 3,
      name: '💎 Төлбөртэй Үйлчилгээ',
      price: 25000,
      duration: '14 өдөр',
      features: [
        '✅ Хамгийн түрүүнд харагдана',
        '✅ SMS мессежээр олон хүмүүст илгээнэ (1 удаа)',
        '✅ Сайтын бүхтэнд онцгой байдлаар заасан',
        '✅ Сошиал медиа дээр дэвшүүлнэ',
        '✅ Цахилгаан шуудан илгээнэ',
        '✅ 24/7 техник дэмжлэг'
      ],
      description: 'Бүх үйлчилгээний онцлогийг нэгтгэсэн хамгийн сайн сонголт. Амьтан байвал олоно гэдгээр ойлгоно.'
    }
  ];

  return (
    <main style={{ maxWidth: 1200, margin: '0 auto', padding: 20 }}>
      <section style={{
        backgroundColor: '#f0f8ff',
        padding: 40,
        borderRadius: 8,
        marginBottom: 40,
        textAlign: 'center'
      }}>
        <h1 style={{ fontSize: 40, marginBottom: 16 }}>🚀 Постыг өргөтгөх</h1>
        <p style={{ fontSize: 18, color: '#666' }}>
          Та нохойг хурдан олоход туслахын тулд постоо өргөтгөн болно
        </p>
      </section>

      <section style={{ marginBottom: 40 }}>
        <h2 style={{ fontSize: 28, marginBottom: 30, textAlign: 'center' }}>📦 Постыг өргөтгөх сараниуд</h2>
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr 1fr',
          gap: 20,
          marginBottom: 40
        }}>
          {packages.map((pkg) => (
            <div
              key={pkg.id}
              onClick={() => setSelectedPackage(pkg.id)}
              style={{
                border: selectedPackage === pkg.id ? '3px solid #2c5aa0' : '1px solid #ddd',
                borderRadius: 8,
                padding: 24,
                backgroundColor: selectedPackage === pkg.id ? '#f0f8ff' : 'white',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                boxShadow: selectedPackage === pkg.id ? '0 4px 12px rgba(44,90,160,0.3)' : '0 2px 4px rgba(0,0,0,0.1)'
              }}
            >
              <h3 style={{ fontSize: 20, marginBottom: 12, color: '#2c5aa0' }}>
                {pkg.name}
              </h3>

              <div style={{
                backgroundColor: '#fff3cd',
                padding: 12,
                borderRadius: 4,
                marginBottom: 16,
                textAlign: 'center'
              }}>
                <p style={{ margin: 0, fontSize: 28, fontWeight: 'bold', color: '#856404' }}>
                  ₮{pkg.price.toLocaleString()}
                </p>
                <p style={{ margin: '8px 0 0 0', fontSize: 12, color: '#856404' }}>
                  {pkg.duration}
                </p>
              </div>

              <p style={{ fontSize: 14, marginBottom: 16, color: '#666', lineHeight: 1.6 }}>
                {pkg.description}
              </p>

              <div style={{ marginBottom: 20 }}>
                {pkg.features.map((feature, idx) => (
                  <p key={idx} style={{ fontSize: 13, marginBottom: 8, color: '#333' }}>
                    {feature}
                  </p>
                ))}
              </div>

              <button style={{
                width: '100%',
                padding: '12px 16px',
                backgroundColor: selectedPackage === pkg.id ? '#2c5aa0' : '#6c757d',
                color: 'white',
                border: 'none',
                borderRadius: 4,
                cursor: 'pointer',
                fontSize: 14,
                fontWeight: 'bold'
              }}>
                {selectedPackage === pkg.id ? '✓ Сонгогдсон' : 'Сонгох'}
              </button>
            </div>
          ))}
        </div>
      </section>

      {selectedPackage && (
        <section style={{
          backgroundColor: '#e7f3ff',
          border: '2px solid #2c5aa0',
          padding: 30,
          borderRadius: 8,
          marginBottom: 40
        }}>
          <h2 style={{ marginBottom: 20 }}>💳 Төлбөр хийх</h2>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 20,
            marginBottom: 20
          }}>
            <div>
              <label style={{ display: 'block', marginBottom: 8, fontWeight: 'bold' }}>
                Таны нэр:
              </label>
              <input
                type="text"
                placeholder="Таны нэр"
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
                Таны утас:
              </label>
              <input
                type="tel"
                placeholder="88012345678"
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
                Сүүлтийг эрдэмтэй болгох хугацаа:
              </label>
              <input
                type="date"
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
                Төлбөрийн арга:
              </label>
              <select style={{
                width: '100%',
                padding: 10,
                border: '1px solid #ddd',
                borderRadius: 4,
                fontSize: 14,
                boxSizing: 'border-box'
              }}>
                <option>Khan Bank</option>
                <option>XacBank</option>
                <option>TDB</option>
                <option>Төлбөрийн картаар</option>
              </select>
            </div>
          </div>

          <div style={{
            backgroundColor: 'white',
            padding: 20,
            borderRadius: 4,
            marginBottom: 20,
            border: '1px solid #ddd'
          }}>
            <h4 style={{ marginBottom: 12 }}>📋 Төлбөрийн дэлгэрэнгүй:</h4>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
              <span>Сараний үнэ:</span>
              <span style={{ fontWeight: 'bold' }}>₮{packages[selectedPackage - 1].price.toLocaleString()}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
              <span>Хүргэлтийн хураамж:</span>
              <span>₮0</span>
            </div>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              paddingTop: 12,
              borderTop: '1px solid #ddd',
              fontSize: 18,
              fontWeight: 'bold'
            }}>
              <span>Нийт:</span>
              <span>₮{packages[selectedPackage - 1].price.toLocaleString()}</span>
            </div>
          </div>

          <button style={{
            width: '100%',
            padding: '14px 16px',
            backgroundColor: '#28a745',
            color: 'white',
            border: 'none',
            borderRadius: 4,
            cursor: 'pointer',
            fontSize: 16,
            fontWeight: 'bold'
          }}>
            💳 Төлбөр хийх
          </button>
        </section>
      )}

      <section style={{
        backgroundColor: '#f8f9fa',
        padding: 30,
        borderRadius: 8
      }}>
        <h2 style={{ marginBottom: 20 }}>❓ Байнга асуудаг асуултууд</h2>
        
        <div style={{ display: 'grid', gap: 16 }}>
          <div style={{
            border: '1px solid #ddd',
            padding: 16,
            borderRadius: 4,
            backgroundColor: 'white'
          }}>
            <h4 style={{ marginBottom: 8 }}>Төлбөр хийсний дараа яг л ямар болдог вэ?</h4>
            <p style={{ color: '#666', margin: 0 }}>
              Төлбөр хийсний дараа та сараниа сонгосон нохойн сүүлт нь нүүрийн эхэнд гарч эхлэнэ. 
              Хүмүүс нохойгоо олоход илүү сайн санал авах болно.
            </p>
          </div>

          <div style={{
            border: '1px solid #ddd',
            padding: 16,
            borderRadius: 4,
            backgroundColor: 'white'
          }}>
            <h4 style={{ marginBottom: 8 }}>СМС илгээл хэзээ хүрэх вэ?</h4>
            <p style={{ color: '#666', margin: 0 }}>
              СМС илгээл төлбөр хийсний дараа л даруй эхэлнэ. Харилцагчид нохойнийхоо 
              мэдээлэл сүүлтээ авч таны дугаарыг хүлээж авах болно.
            </p>
          </div>

          <div style={{
            border: '1px solid #ddd',
            padding: 16,
            borderRadius: 4,
            backgroundColor: 'white'
          }}>
            <h4 style={{ marginBottom: 8 }}>Хугацаа дуусахаас өмнө сараниа цуцлаж болох уу?</h4>
            <p style={{ color: '#666', margin: 0 }}>
              Тийм, та хугацаа дуусахаас өмнө сараниа цуцлаж болно. Үүний дараа урт нь арилна.
            </p>
          </div>

          <div style={{
            border: '1px solid #ddd',
            padding: 16,
            borderRadius: 4,
            backgroundColor: 'white'
          }}>
            <h4 style={{ marginBottom: 8 }}>Мөнгөө буцаан авч болох уу?</h4>
            <p style={{ color: '#666', margin: 0 }}>
              Мөнгөө буцаан авч болохгүй. Гэхдээ та урт нь дуусахаас өмнө сараниа цуцлаж болно 
              ба өөрийгөө илүүтгэлтэйгээр байлгахыг сонгож болно.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
