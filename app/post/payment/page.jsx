"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../../context/AuthContext';

export default function PaymentPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();
  const { user } = useAuth();

  const PAYMENT_AMOUNT = 3000; // 3,000 ₮

  // Check if user is logged in
  if (!user) {
    return (
      <main style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#f8f9fa' }}>
        <div style={{
          backgroundColor: '#fff3cd',
          border: '2px solid #856404',
          color: '#856404',
          padding: 40,
          borderRadius: 12,
          textAlign: 'center',
          boxShadow: '0 4px 16px rgba(0,0,0,0.15)',
          maxWidth: 500
        }}>
          <h2 style={{ fontSize: 28, marginBottom: 16 }}>⚠️ Нэвтрэх шаардлагатай</h2>
          <p style={{ fontSize: 16, marginBottom: 24 }}>Пост үүсгэхийн өмнө та нэвтрэх ёстой.</p>
          <button onClick={() => router.push('/auth/login')} style={{ padding: '12px 24px', backgroundColor: '#2c5aa0', color: 'white', border: 'none', borderRadius: 4, cursor: 'pointer', fontWeight: 'bold', fontSize: 16 }}>
            🔐 Нэвтрэх
          </button>
        </div>
      </main>
    );
  }

  const handlePayment = () => {
    try {
      // QPay Mongolia deep link format
      // qpay://payment?amount=3000&description=PetSpot+Post&callback_url=http://localhost:3000/post/payment/success
      
      const amount = PAYMENT_AMOUNT;
      const description = `PetSpot%20Post%20Payment%20-%20${user.uid}`;
      const invoiceId = `PETSPOT_${user.uid}_${Date.now()}`;
      const callbackUrl = `${window.location.origin}/post/payment/success`;

      // Create QPay deep link
      const qpayLink = `https://qpay.mn/payment/${invoiceId}?amount=${amount}&description=${description}&returnUrl=${encodeURIComponent(callbackUrl)}`;

      // Open QPay in new window/tab
      const paymentWindow = window.open(qpayLink, '_blank');
      
      if (!paymentWindow) {
        setError('Popup асаах боломжгүй. Popup блокер идэвхтэй эсэх шалгана уу.');
        return;
      }

      // For demo: Store payment record in localStorage after short delay
      // In production, this would be verified via webhook from QPay
      setTimeout(() => {
        const paymentRecord = {
          userId: user.uid,
          amount: PAYMENT_AMOUNT,
          invoiceId: invoiceId,
          timestamp: new Date().toISOString(),
          status: 'completed'
        };

        localStorage.setItem(`payment_${user.uid}`, JSON.stringify(paymentRecord));
        
        // Optionally close the original window after payment
        paymentWindow?.close();
        
        // Redirect to post creation page
        router.push('/post/create');
      }, 2000);

    } catch (err) {
      console.error('Payment error:', err);
      setError('Төлөлт эхлүүлэхэд алдаа гарлаа. Дахин оролдоно уу.');
    }
  };

  return (
    <main style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#f8f9fa', padding: 16 }}>
      <div style={{
        backgroundColor: 'white',
        borderRadius: 12,
        boxShadow: '0 4px 16px rgba(0,0,0,0.15)',
        padding: 40,
        maxWidth: 500,
        width: '100%'
      }}>
        <h1 style={{ fontSize: 28, marginBottom: 8, textAlign: 'center', color: '#2c5aa0' }}>💳 Төлөлт хийх</h1>
        <p style={{ fontSize: 14, textAlign: 'center', color: '#666', marginBottom: 32 }}>QPay дээр төлөлт хийх - Бүх банкаар төлөх боломжтой</p>

        <div style={{
          backgroundColor: '#f0f8ff',
          border: '2px solid #2c5aa0',
          borderRadius: 8,
          padding: 20,
          marginBottom: 24,
          textAlign: 'center'
        }}>
          <p style={{ fontSize: 14, color: '#666', margin: '0 0 8px 0' }}>Төлөх дүн:</p>
          <h2 style={{ fontSize: 36, color: '#2c5aa0', margin: 0, fontWeight: 'bold' }}>
            {PAYMENT_AMOUNT.toLocaleString()} ₮
          </h2>
        </div>

        <div style={{
          backgroundColor: '#e8f5e9',
          border: '1px solid #4caf50',
          borderRadius: 8,
          padding: 16,
          marginBottom: 24
        }}>
          <h3 style={{ fontSize: 16, color: '#2e7d32', marginBottom: 8 }}>✅ Төлөлтөөр авах үйлчилгээ:</h3>
          <ul style={{ margin: 0, paddingLeft: 20, color: '#2e7d32', fontSize: 14 }}>
            <li>📸 Нэг алүүдэртэй пост үүсгэх</li>
            <li>🔍 Нийтэд харагдах</li>
            <li>📱 Холбооны номер илэрхийлэх</li>
            <li>✏️ Пост засах боломж</li>
          </ul>
        </div>

        {error && (
          <div style={{
            backgroundColor: '#ffebee',
            border: '1px solid #f44336',
            color: '#c62828',
            padding: 12,
            borderRadius: 4,
            marginBottom: 16,
            fontSize: 14
          }}>
            {error}
          </div>
        )}

        <button
          onClick={handlePayment}
          disabled={loading}
          style={{
            width: '100%',
            padding: '14px 24px',
            backgroundColor: loading ? '#ccc' : '#1f7fbf',
            color: 'white',
            border: 'none',
            borderRadius: 4,
            cursor: loading ? 'not-allowed' : 'pointer',
            fontWeight: 'bold',
            fontSize: 16,
            marginBottom: 12
          }}
        >
          {loading ? '⏳ Төлөлт хийж байна...' : '💳 QPay дээр 3,000 ₮ төлөх'}
        </button>

        <button
          onClick={() => router.back()}
          disabled={loading}
          style={{
            width: '100%',
            padding: '12px 24px',
            backgroundColor: '#e0e0e0',
            color: '#333',
            border: 'none',
            borderRadius: 4,
            cursor: loading ? 'not-allowed' : 'pointer',
            fontWeight: 'bold',
            fontSize: 14
          }}
        >
          ← Буцах
        </button>

        <p style={{ fontSize: 12, color: '#999', textAlign: 'center', marginTop: 16 }}>
          🏦 QPay системээр Монгол Улсын бүх банкаар төлөлт хийх боломжтой. (XAC, Golomt, Khan, State Bank гэх мэт)
        </p>
      </div>
    </main>
  );
}
