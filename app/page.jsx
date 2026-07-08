'use client';

export default function Home() {
  return (
    <main style={{ maxWidth: 1200, margin: '0 auto', padding: 20 }}>
      <section style={{ 
        backgroundColor: '#f0f8ff', 
        padding: 40, 
        borderRadius: 8, 
        marginBottom: 40,
        textAlign: 'center'
      }}>
        <h1 style={{ fontSize: 48, color: '#333', marginBottom: 16 }}>🐾 PetSpot</h1>
        <p style={{ fontSize: 20, color: '#666', marginBottom: 24 }}>
          Алга болсон эсвэл олдсон амьтдыг олоход туслаарай
        </p>
      </section>

      <section style={{ marginBottom: 40 }}>
        <h2 style={{ fontSize: 32, color: '#333', marginBottom: 24 }}>📋 Хэрхэн ашиглах вэ?</h2>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
          <div style={{ 
            border: '1px solid #ddd', 
            padding: 20, 
            borderRadius: 8,
            backgroundColor: '#fff'
          }}>
            <h3 style={{ color: '#2c5aa0', marginBottom: 12 }}>🆓 Үнэгүй пост</h3>
            <p>Та үнэгүй амьтны мэдээлэл оруулж болно. Постыг бүх хүн харах боломжтой бөгөөд хайх боломжтой.</p>
            <p style={{ fontWeight: 'bold', marginBottom: 8 }}>Заавар:</p>
            <ul>
              <li>Амьтны нэр, төрөл (жишээ: нохой, муур, бусад амьтад)</li>
              <li>Зураг</li>
              <li>Алга болсон эсвэл олдсон газар</li>
              <li>Таны холбоо барих мэдээлэл (утас, имэйл)</li>
            </ul>
            <p style={{ fontSize: 12, color: '#666', marginTop: 12, fontStyle: 'italic' }}>
              Энэхүү систем нь бүх төрлийн амьтанд зориулагдсан.
            </p>
          </div>

          <div style={{ 
            border: '1px solid #ddd', 
            padding: 20, 
            borderRadius: 8,
            backgroundColor: '#fff'
          }}>
            <h3 style={{ color: '#2c5aa0', marginBottom: 12 }}>💎 Boost / Premium Service</h3>
            <p>Та постоо Boost эсвэл Premium үйлчилгээ ашиглан өргөтгөж болно:</p>
            <ul>
              <li><strong>Boost:</strong> Илүү олон хүнд харагдана, хайлтын дээд хэсэгт гарна, “Яаралтай” тэмдэгтэй байна</li>
              <li><strong>Premium:</strong> Илүү олон хүнд харагдана, өнгөт пост гарна, SMS мессежээр мэдэгдэнэ, анхаарал татна</li>
            </ul>
          </div>
        </div>
      </section>

      <section style={{ marginBottom: 40 }}>
        <h2 style={{ fontSize: 32, color: '#333', marginBottom: 24 }}>💰 Амьтныг буцаан олбол урамшуулал авна! Та олсон амьтны эзэмшигчид буцаан олгоход урамшуулал авч болно. Урамшууллын хэмжээ эзэмшигчээс тодорхойлогдоно.</h2>
        <div style={{ 
          border: '2px solid #28a745', 
          padding: 30, 
          borderRadius: 8,
          backgroundColor: '#f0fff4',
          textAlign: 'center'
        }}>
          <h3 style={{ fontSize: 24, color: '#28a745', marginBottom: 16 }}>
            Амьтныг буцаан олбол урамшуулал авна!
          </h3>
          <p style={{ fontSize: 18, marginBottom: 16 }}>
            Та олсон амьтны эзэмшигчид буцаан олгоход урамшуулал авч болно. 
            Урамшууллын хэмжээ эзэмшигчээс тодорхойлогдоно.
          </p>
          <p style={{ fontSize: 16, color: '#666' }}>
            Олсон үйл явцын зөвлөмжийг "Алга болсон / Олсон" хэсэгт үзүүлнэ
          </p>
        </div>
      </section>

      <section style={{ marginBottom: 40 }}>
        <h2 style={{ fontSize: 32, color: '#333', marginBottom: 24 }}>🔒 Нэвтрэх ба бүртгүүлэх</h2>
        <div style={{ 
          border: '1px solid #ddd', 
          padding: 20, 
          borderRadius: 8,
          backgroundColor: '#fff',
          textAlign: 'center'
        }}>
          <p style={{ fontSize: 18, marginBottom: 20 }}>
            Пост оруулахын өмнө та нэвтрэх ба бүртгүүлэх хэрэгтэй
          </p>
          <button style={{
            padding: '12px 24px',
            fontSize: 16,
            backgroundColor: '#2c5aa0',
            color: 'white',
            border: 'none',
            borderRadius: 4,
            cursor: 'pointer'
          }}>
            Нэвтрэх / Бүртгүүлэх
          </button>
        </div>
      </section>

      <section style={{ 
        backgroundColor: '#fff3cd', 
        padding: 20, 
        borderRadius: 8,
        borderLeft: '4px solid #ffc107'
      }}>
        <h3 style={{ color: '#856404', marginBottom: 12 }}>⚠️ Чухал зөвлөмжүүд</h3>
        <ul style={{ color: '#856404', lineHeight: 1.8 }}>
          <li>Амьтны төрлийг болон өнгийг тодорхой бичнэ үү</li>
          <li>Алга болсон эсвэл олдсон газар, цагийг яг тодорхой бичнэ үү</li>
          <li>Холбоо барих мэдээлэл нь зөв ажиллах ёстой</li>
          <li>SMS болон утсаар холбоо барих боломжтой байх хэрэгтэй</li>
        </ul>
      </section>
    </main>
  );
}
