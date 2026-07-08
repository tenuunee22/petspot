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
    if (!auth) {
      throw new Error('Firebase auth is not initialized. Check lib/firebase.js and your .env.local values.');
    }
    // initialize reCAPTCHA if not exists
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(recaptchaContainerId, { size: 'invisible' }, auth);
      // render ensures the underlying grecaptcha script is loaded and ready
      try {
        await window.recaptchaVerifier.render();
      } catch (renderErr) {
        // rendering can fail if grecaptcha is blocked; surface the error to caller
        console.error('reCAPTCHA render failed', renderErr);
        throw renderErr;
      }
    }

    const appVerifier = window.recaptchaVerifier;
    if (!appVerifier) {
      // This usually means grecaptcha failed to load or the verifier wasn't created.
      throw new Error('reCAPTCHA verifier not initialized. Ensure #recaptcha-container exists and grecaptcha is allowed (disable adblockers).');
    }
    try {
      const confirmationResult = await signInWithPhoneNumber(auth, phoneNumber, appVerifier);
      // store confirmationResult for later verification
      window.__firebaseConfirmationResult = confirmationResult;
      return confirmationResult;
    } catch (err) {
      // common cause: invalid/expired reCAPTCHA token or blocked grecaptcha
      // reset the verifier so caller can retry
      try {
        // some SDK builds expose a clear method on the verifier
        if (window.recaptchaVerifier && typeof window.recaptchaVerifier.clear === 'function') {
          window.recaptchaVerifier.clear();
        }
      } catch (clearErr) {
        console.warn('Failed to clear reCAPTCHA verifier', clearErr);
      }
      window.recaptchaVerifier = null;
      throw err;
    }
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
