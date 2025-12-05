"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../../../context/AuthContext";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // Phone / OTP state
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [phoneError, setPhoneError] = useState("");
  const [phoneLoading, setPhoneLoading] = useState(false);

  const router = useRouter();
  const { login, sendPhoneOtp, verifyPhoneOtp } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await login(email, password);
      router.push("/profile");
    } catch (err) {
      setError(err.message || "Алдаа гарлаа");
    }
  };

  const handleSendOtp = async () => {
    setPhoneError("");
    setPhoneLoading(true);
    try {
      await sendPhoneOtp(phone);
      setOtpSent(true);
    } catch (err) {
      setPhoneError(err.message || "OTP илгээхэд алдаа гарлаа");
    } finally {
      setPhoneLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    setPhoneError("");
    try {
      await verifyPhoneOtp(otp);
      router.push("/profile");
    } catch (err) {
      setPhoneError(err.message || "OTP шалгахад алдаа гарлаа");
    }
  };

  return (
    <main style={{ maxWidth: 700, margin: "0 auto", padding: 20 }}>
      <h1 style={{ fontSize: 28, marginBottom: 20 }}>🔐 Нэвтрэх</h1>

      {/* Email/password login */}
      <section style={{ marginBottom: 28, padding: 12, border: "1px solid #eee", borderRadius: 8 }}>
        <h2 style={{ fontSize: 18, marginBottom: 12 }}>Имэйл + Нууц үг</h2>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: 12 }}>
            <label style={{ display: "block", marginBottom: 8 }}>Имэйл</label>
            <input value={email} onChange={(e) => setEmail(e.target.value)} required style={{ width: "100%", padding: 10 }} />
          </div>
          <div style={{ marginBottom: 12 }}>
            <label style={{ display: "block", marginBottom: 8 }}>Нууц үг</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required style={{ width: "100%", padding: 10 }} />
          </div>
          {error && <p style={{ color: "red" }}>{error}</p>}
          <button type="submit" style={{ padding: "10px 16px", backgroundColor: "#2c5aa0", color: "white", border: "none", borderRadius: 4 }}>Нэвтрэх</button>
        </form>
      </section>

      {/* Phone OTP login */}
      <section style={{ padding: 12, border: "1px solid #eee", borderRadius: 8 }}>
        <h2 style={{ fontSize: 18, marginBottom: 12 }}>Утасны дугаар (OTP)</h2>

        <div style={{ marginBottom: 12 }}>
          <label style={{ display: "block", marginBottom: 8 }}>Утасны дугаар (жишээ: +97699123456)</label>
          <input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+976..." style={{ width: "100%", padding: 10 }} />
        </div>

        <div id="recaptcha-container" style={{ marginBottom: 12 }} />

        {!otpSent ? (
          <>
            {phoneError && <p style={{ color: "red" }}>{phoneError}</p>}
            <button type="button" onClick={handleSendOtp} disabled={phoneLoading || !phone} style={{ padding: "10px 16px", backgroundColor: "#0b7b3f", color: "white", border: "none", borderRadius: 4 }}>
              {phoneLoading ? "Илгээж байна..." : "OTP илгээх"}
            </button>
          </>
        ) : (
          <div style={{ marginTop: 8 }}>
            <div style={{ marginBottom: 12 }}>
              <label style={{ display: "block", marginBottom: 8 }}>Илгээсэн код</label>
              <input value={otp} onChange={(e) => setOtp(e.target.value)} style={{ width: "100%", padding: 10 }} />
            </div>
            {phoneError && <p style={{ color: "red" }}>{phoneError}</p>}
            <button type="button" onClick={handleVerifyOtp} style={{ padding: "10px 16px", backgroundColor: "#0b7b3f", color: "white", border: "none", borderRadius: 4 }}>
              Код шалгах
            </button>
          </div>
        )}
      </section>
    </main>
  );
}
