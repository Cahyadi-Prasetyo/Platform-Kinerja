"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

// Custom SIMANTAP Logo Component (using the existing public image)
const SimantapLogo = ({ className = "w-6 h-6" }: { className?: string }) => (
  <img 
    src="/logo.jpg" 
    alt="SIMANTAP Logo" 
    className={`${className} object-contain`} 
  />
);

export default function Login() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // Redirect if already logged in
  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) {
      router.push('/');
    }
  }, [router]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email.trim()) {
      setError('Please enter your email address.');
      return;
    }

    setLoading(true);

    setTimeout(() => {
      localStorage.setItem('user', JSON.stringify({ email, name: email.split('@')[0] }));
      setLoading(false);
      router.push('/');
    }, 700);
  };

  const handleGoogleLogin = () => {
    router.push('/login/choose-account');
  };

  return (
    <div className="min-h-screen bg-white flex flex-col justify-between font-sans antialiased text-[#111827] select-none p-6 md:p-8">
      {/* Top Header Logo */}
      <div className="flex items-center gap-2.5">
        <SimantapLogo className="w-8 h-8" />
        <span className="font-extrabold text-base tracking-tight text-[#111827]">SIMANTAP</span>
      </div>

      {/* Center Auth Area */}
      <div className="flex-1 flex items-center justify-center py-10">
        <div className="w-full max-w-[360px] flex flex-col space-y-6">
          
          {/* Tagline / Headings */}
          <div className="space-y-1">
            <h1 className="text-[19px] font-extrabold tracking-tight text-[#111827] leading-snug">
              Sistem Manajemen Team & Pantau Performa
            </h1>
            <p className="text-[13px] font-semibold text-[#6B7280]">
              Team Management & Performance Platform
            </p>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-100 text-red-600 text-xs px-3.5 py-2.5 rounded-lg font-semibold">
              {error}
            </div>
          )}

          {/* Google Sign-in */}
          <button 
            type="button" 
            onClick={handleGoogleLogin}
            className="w-full h-10 border border-[#E5E7EB] hover:bg-[#F9FAFB] rounded-lg text-xs font-bold text-[#374151] flex items-center justify-center gap-2.5 transition-colors cursor-pointer bg-white"
            disabled={loading}
          >
            {/* Google G Icon */}
            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24">
              <path fill="#EA4335" d="M12 5.04c1.67 0 3.17.58 4.35 1.71l3.25-3.25C17.65 1.58 14.98 1 12 1 7.35 1 3.4 3.65 1.58 7.5L5.04 10.2C5.9 7.35 8.65 5.04 12 5.04z" />
              <path fill="#4285F4" d="M23.5 12.25c0-.82-.07-1.6-.2-2.25H12v4.25h6.5c-.28 1.45-1.1 2.68-2.33 3.5l3.58 2.78c2.1-1.94 3.75-5.18 3.75-8.28z" />
              <path fill="#FBBC05" d="M5.04 13.8c-.22-.67-.35-1.4-.35-2.15s.13-1.48.35-2.15L1.58 6.7C.58 8.7 0 10.95 0 13.3s.58 4.6 1.58 6.6l3.46-3.1z" />
              <path fill="#34A853" d="M12 23c3.24 0 5.97-1.08 7.96-2.92l-3.58-2.78c-1.1.74-2.5 1.18-4.38 1.18-3.35 0-6.1-2.3-6.96-5.16L1.58 16.4C3.4 20.35 7.35 23 12 23z" />
            </svg>
            <span>Sign in with Google</span>
          </button>

          {/* Divider */}
          <div className="flex items-center gap-3 text-[11px] text-[#9CA3AF] select-none font-bold">
            <div className="flex-1 h-[1px] bg-[#E5E7EB]" />
            <span>or</span>
            <div className="flex-1 h-[1px] bg-[#E5E7EB]" />
          </div>

          {/* Email input & Continue */}
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="email-input" className="block text-[11px] font-bold text-[#374151]">
                Email
              </label>
              <input 
                id="email-input"
                type="email" 
                placeholder="name@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full h-10 px-3 border border-[#E5E7EB] rounded-lg text-xs text-[#111827] placeholder-[#9CA3AF] focus:outline-none focus:border-[#0284C7] transition-colors font-medium bg-white"
                disabled={loading}
                autoFocus
              />
            </div>

            <button 
              type="submit" 
              className={`w-full h-10 rounded-lg text-xs font-bold flex items-center justify-center transition-colors cursor-pointer ${
                email.trim() 
                  ? 'bg-[#0284C7] hover:bg-[#0369A1] text-white shadow-sm' 
                  : 'bg-[#F3F4F6] text-[#A3A3A3] cursor-not-allowed'
              }`}
              disabled={loading || !email.trim()}
            >
              {loading ? (
                <svg className="animate-spin h-5 w-5 text-current" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
              ) : (
                <span>Continue</span>
              )}
            </button>
          </form>

          {/* TOS / Privacy Agreement */}
          <div className="text-[10px] text-[#6B7280] text-center leading-relaxed font-semibold select-none pt-2">
            By signing in, you understand and agree to <br />
            our <a href="#" className="underline hover:text-[#111827]">Terms of Service</a> and <a href="#" className="underline hover:text-[#111827]">Privacy Policy</a>.
          </div>

        </div>
      </div>

      {/* Empty Footer spacing to match top height alignment */}
      <div className="h-8" />
    </div>
  );
}
