"use client";
import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '../../../context/AuthContext';

export default function PaymentSuccess() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user } = useAuth();
  const [status, setStatus] = useState('processing');

  useEffect(() => {
    if (!user) {
      router.push('/auth/login');
      return;
    }

    // Get payment confirmation from URL parameters
    const invoiceId = searchParams.get('invoiceId');
    const status = searchParams.get('status');

    // Simulate verification (in production, verify with QPay API)
    setTimeout(() => {
      if (status === 'success' || Math.random() > 0.3) {
        // Mark payment as successful
        const paymentRecord = {
          userId: user.uid,
          amount: 3000,
          invoiceId: invoiceId,
          timestamp: new Date().toISOString(),
          status: 'completed'
        };

        localStorage.setItem(`payment_${user.uid}`, JSON.stringify(paymentRecord));
        setStatus('success');

        // Redirect to post creation after 2 seconds
        setTimeout(() => {
          router.push('/post/create');
        }, 2000);
      } else {
        setStatus('failed');
      }
    }, 1500);
  }, [user, router, searchParams]);

  if (status === 'processing') {
    return (
      <main style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#f8f9fa' }}>
        <div style={{
          backgroundColor: 'white',
          borderRadius: 12,
          boxShadow: '0 4px 16px rgba(0,0,0,0.15)',
          padding: 40,
          maxWidth: 500,
          textAlign: 'center'
        }}>
          <div style={{ fontSize: 48, marginBottom: 16 }}>⏳</div>
          <h2 style={{ fontSize: 28, marginBottom: 8, color: '#2c5aa0' }}>Төлөлт баталгаажуулж байна</h2>
          <p style={{ fontSize: 14, color: '#666' }}>Хэсэг хугацаа хүлээнэ үү...</p>
          <div style={{ marginTop: 20 }}>
            <div style={{
              width: 40,
              height: 40,
              border: '4px solid #f3f3f3',
              borderTop: '4px solid #2c5aa0',
              borderRadius: '50%',
              animation: 'spin 1s linear infinite',
              margin: '0 auto'
            }} />
          </div>
          <style>{`
            @keyframes spin {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
          `}</style>
        </div>
      </main>
    );
  }

  if (status === 'success') {
    return (
      <main style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#f8f9fa' }}>
        <div style={{
          backgroundColor: '#d4edda',
          border: '2px solid #28a745',
          color: '#155724',
          padding: 40,
          borderRadius: 12,
          textAlign: 'center',
          boxShadow: '0 4px 16px rgba(0,0,0,0.15)',
          maxWidth: 500
        }}>
          <h2 style={{ fontSize: 28, marginBottom: 16 }}>✅ Төлөлт амжилттай!</h2>
          <p style={{ fontSize: 16, marginBottom: 8 }}>Таны төлөлт баталгаажлаа.</p>
          <p style={{ fontSize: 14, color: '#155724', marginBottom: 24 }}>Пост үүсгэх хуудас руу шилжүүлж байна...</p>
          <div style={{
            width: 40,
            height: 40,
            border: '4px solid rgba(0,0,0,0.1)',
            borderTop: '4px solid #28a745',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
            margin: '0 auto'
          }} />
          <style>{`
            @keyframes spin {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
          `}</style>
        </div>
      </main>
    );
  }

  if (status === 'failed') {
    return (
      <main style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#f8f9fa' }}>
        <div style={{
          backgroundColor: '#ffebee',
          border: '2px solid #f44336',
          color: '#c62828',
          padding: 40,
          borderRadius: 12,
          textAlign: 'center',
          boxShadow: '0 4px 16px rgba(0,0,0,0.15)',
          maxWidth: 500
        }}>
          <h2 style={{ fontSize: 28, marginBottom: 16 }}>❌ Төлөлт амжилтгүй</h2>
          <p style={{ fontSize: 16, marginBottom: 24 }}>Төлөлтийн явц завершагдсан байна. Дахин оролдоно уу.</p>
          <button onClick={() => router.push('/post/payment')} style={{ padding: '12px 24px', backgroundColor: '#f44336', color: 'white', border: 'none', borderRadius: 4, cursor: 'pointer', fontWeight: 'bold' }}>
            🔄 Дахин төлөх
          </button>
        </div>
      </main>
    );
  }
}
