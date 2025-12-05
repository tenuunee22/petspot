'use client';
import { createContext, useContext, useEffect, useState } from 'react';
import { auth } from '../lib/firebase';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from 'firebase/auth';

const AuthContext = createContext({});

export function useAuth() {
  return useContext(AuthContext);
}

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (u) => {
      setUser(u ? { uid: u.uid, email: u.email } : null);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const signup = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  // Phone auth: send OTP
  const sendPhoneOtp = async (phoneNumber, recaptchaContainerId = 'recaptcha-container') => {
    // initialize reCAPTCHA if not exists
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(
        recaptchaContainerId,
        { size: 'invisible' },
        auth
      );
    }

    const appVerifier = window.recaptchaVerifier;
    const confirmationResult = await signInWithPhoneNumber(auth, phoneNumber, appVerifier);
    // store confirmationResult for later verification
    window.__firebaseConfirmationResult = confirmationResult;
    return confirmationResult;
  };

  const verifyPhoneOtp = async (code) => {
    const confirmationResult = window.__firebaseConfirmationResult;
    if (!confirmationResult) throw new Error('No confirmation result. Request OTP first.');
    const credentialUser = await confirmationResult.confirm(code);
    // set user state based on returned user
    const u = credentialUser.user;
    setUser(u ? { uid: u.uid, phone: u.phoneNumber, email: u.email || null } : null);
    return credentialUser;
  };

  const logout = () => {
    return signOut(auth);
  };

  const value = {
    user,
    loading,
    signup,
    login,
    sendPhoneOtp,
    verifyPhoneOtp,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
