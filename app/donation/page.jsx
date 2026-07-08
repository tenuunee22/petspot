'use client';

export default function Donation(){
  const handleDonate = () => {
    // Энд Stripe эсвэл өөр төлбөрийн интеграц нэмнэ
    alert('Хандив хийх флоуг энд холбох ёстой (Stripe).');
  };

  return (
    <main style={{maxWidth:700, margin:'0 auto', padding:20}}>
      <h1>Хандив өгөх</h1>
      <p>Манай платформыг дэмжихийг хүсвэл эндээс хандив өгнө үү.</p>
      <button onClick={handleDonate}>₮ 5000 хандивлах</button>
    </main>
  );
}