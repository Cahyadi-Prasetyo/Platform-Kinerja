"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(true);
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

    if (!email.trim() || !password.trim()) {
      setError('Email dan password wajib diisi.');
      return;
    }

    setLoading(true);

    // Simulate network delay
    setTimeout(() => {
      localStorage.setItem('user', JSON.stringify({ email, name: email.split('@')[0] }));
      setLoading(false);
      router.push('/');
    }, 800);
  };

  const handleGoogleLogin = () => {
    setLoading(true);
    setTimeout(() => {
      localStorage.setItem('user', JSON.stringify({ email: 'cahyadi@gmail.com', name: 'Cahyadi Prasetyo' }));
      setLoading(false);
      router.push('/');
    }, 800);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-bg-canvas px-4 font-sans select-none antialiased relative overflow-hidden">
      {/* Background decoration to distinguish it from pure Linear */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-accent/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-accent/5 blur-[120px] pointer-events-none" />

      <div className="w-full max-w-[400px] flex flex-col items-center space-y-6 z-10">
        {/* Centered Logo & Title */}
        <div className="flex flex-col items-center space-y-3">
          <div className="w-14 h-14 bg-bg-surface border border-border-default rounded-xl shadow-sm flex items-center justify-center p-2.5 transition-transform duration-300 hover:scale-105">
            <Image 
              src="/logo.png" 
              alt="Platform Kinerja Logo" 
              width={40} 
              height={40}
              priority
              className="object-contain"
            />
          </div>
          <div className="text-center">
            <h1 className="text-lg font-bold text-text-primary tracking-tight">Platform Monitoring Kinerja</h1>
            <p className="text-xs text-text-secondary mt-0.5">Sistem monitoring terpadu kinerja tim Cahyadi Prasetyo</p>
          </div>
        </div>

        {/* Login Card */}
        <div className="w-full bg-bg-surface border border-border-default rounded-xl p-6 shadow-[0_8px_30px_rgb(0,0,0,0.02)] space-y-5">
          {error && (
            <div className="bg-danger/10 border border-danger/20 text-danger text-xs px-3 py-2 rounded-lg font-medium">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-text-secondary uppercase tracking-wider">Alamat Email</label>
              <input 
                type="email" 
                placeholder="nama@perusahaan.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full h-9 px-3 bg-bg-canvas/50 border border-border-default rounded-lg text-sm text-text-primary placeholder-text-muted focus:bg-bg-surface focus:outline-none focus:border-accent transition-colors duration-75 keyboard-focus"
                disabled={loading}
              />
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-[11px] font-bold text-text-secondary uppercase tracking-wider">Kata Sandi</label>
                <a href="#" className="text-[11px] font-medium text-accent hover:underline">Lupa sandi?</a>
              </div>
              <input 
                type="password" 
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full h-9 px-3 bg-bg-canvas/50 border border-border-default rounded-lg text-sm text-text-primary placeholder-text-muted focus:bg-bg-surface focus:outline-none focus:border-accent transition-colors duration-75 keyboard-focus"
                disabled={loading}
              />
            </div>

            <div className="flex items-center justify-between text-xs select-none">
              <label className="flex items-center gap-2 text-text-secondary cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="rounded border-border-default text-accent focus:ring-accent"
                />
                <span>Ingat saya</span>
              </label>
            </div>

            <button 
              type="submit" 
              className="w-full h-9 bg-accent hover:bg-accent/90 text-white font-semibold text-sm rounded-lg flex items-center justify-center transition-colors duration-75 shadow-sm cursor-pointer keyboard-focus"
              disabled={loading}
            >
              {loading ? (
                <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
              ) : (
                'Masuk ke Dashboard'
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center justify-between text-xs text-text-muted select-none">
            <span className="w-[35%] h-[1px] bg-border-default" />
            <span>atau</span>
            <span className="w-[35%] h-[1px] bg-border-default" />
          </div>

          {/* Google Login Button */}
          <button 
            type="button" 
            onClick={handleGoogleLogin}
            className="w-full h-9 bg-bg-surface hover:bg-bg-canvas border border-border-default text-text-primary font-semibold text-sm rounded-lg flex items-center justify-center gap-2 transition-colors duration-75 cursor-pointer keyboard-focus shadow-[0_1px_2px_rgba(0,0,0,0.02)]"
            disabled={loading}
          >
            {/* SVG Google Logo */}
            <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
              <path fill="#EA4335" d="M12 5.04c1.67 0 3.17.58 4.35 1.71l3.25-3.25C17.65 1.58 14.98 1 12 1 7.35 1 3.4 3.65 1.58 7.5L5.04 10.2C5.9 7.35 8.65 5.04 12 5.04z" />
              <path fill="#4285F4" d="M23.5 12.25c0-.82-.07-1.6-.2-2.25H12v4.25h6.5c-.28 1.45-1.1 2.68-2.33 3.5l3.58 2.78c2.1-1.94 3.75-5.18 3.75-8.28z" />
              <path fill="#FBBC05" d="M5.04 13.8c-.22-.67-.35-1.4-.35-2.15s.13-1.48.35-2.15L1.58 6.7C.58 8.7 0 10.95 0 13.3s.58 4.6 1.58 6.6l3.46-3.1z" />
              <path fill="#34A853" d="M12 23c3.24 0 5.97-1.08 7.96-2.92l-3.58-2.78c-1.1.74-2.5 1.18-4.38 1.18-3.35 0-6.1-2.3-6.96-5.16L1.58 16.4C3.4 20.35 7.35 23 12 23z" />
            </svg>
            <span>Masuk dengan Google</span>
          </button>
        </div>

        {/* Footer info */}
        <div className="text-[11px] text-text-muted text-center space-y-1 select-none">
          <div>Belum memiliki akun? <a href="#" className="text-accent hover:underline font-medium">Hubungi Admin</a></div>
          <div>Platform Kinerja v1.0.0 — &copy; {new Date().getFullYear()}</div>
        </div>
      </div>
    </div>
  );
}
