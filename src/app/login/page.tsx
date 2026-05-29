"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

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
      setError('Alamat email dan kata sandi wajib diisi.');
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
    setLoading(true);
    setTimeout(() => {
      localStorage.setItem('user', JSON.stringify({ email: 'cahyadi@gmail.com', name: 'Cahyadi Prasetyo' }));
      setLoading(false);
      router.push('/');
    }, 700);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-bg-canvas bg-dot-pattern px-4 font-sans select-none antialiased relative overflow-hidden">
      {/* Premium ambient glow blur highlights */}
      <div className="absolute top-[-15%] left-[-15%] w-[50%] h-[50%] rounded-full bg-accent/3 blur-[140px] pointer-events-none" />
      <div className="absolute bottom-[-15%] right-[-15%] w-[50%] h-[50%] rounded-full bg-accent/3 blur-[140px] pointer-events-none" />

      <div className="w-full max-w-[390px] flex flex-col items-center space-y-7 z-10">
        
        {/* Brand Identity Widget */}
        <div className="flex flex-col items-center space-y-4">
          <div className="w-14 h-14 bg-bg-surface border border-border-default rounded-2xl flex items-center justify-center p-3 shadow-[0_1px_3px_rgba(0,0,0,0.02)] border-b-2 border-b-accent/30 hover:border-b-accent transition-all duration-300 hover:translate-y-[-2px]">
            <img 
              src="/logo.png?v=2" 
              alt="Brand Logo" 
              width={34} 
              height={34}
              className="object-contain"
            />
          </div>
          <div className="text-center">
            <h1 className="text-md font-bold text-text-primary tracking-tight">Platform Monitoring Kinerja</h1>
            <p className="text-[11px] text-text-secondary mt-1 font-medium">Sistem kendali performa divisi Cahyadi Prasetyo</p>
          </div>
        </div>

        {/* Custom Auth Card */}
        <div className="w-full bg-bg-surface border border-border-default rounded-2xl p-6 shadow-[0_8px_30px_rgb(0,0,0,0.015),0_1px_2px_rgb(0,0,0,0.01)] border-t-[3px] border-t-accent space-y-5 relative">
          
          {error && (
            <div className="bg-danger/5 border border-danger/10 text-danger text-[11px] px-3.5 py-2.5 rounded-lg font-semibold">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-text-secondary uppercase tracking-wider select-none">Alamat Email</label>
              <input 
                type="email" 
                placeholder="email@workplace.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full h-9.5 px-3 bg-bg-canvas/40 border border-border-default rounded-lg text-xs text-text-primary placeholder-text-muted focus:bg-bg-surface focus:outline-none focus:border-accent transition-all duration-75 keyboard-focus font-medium"
                disabled={loading}
              />
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between select-none">
                <label className="text-[10px] font-bold text-text-secondary uppercase tracking-wider">Kata Sandi</label>
                <a href="#" className="text-[10px] font-bold text-accent hover:underline">Lupa sandi?</a>
              </div>
              <input 
                type="password" 
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full h-9.5 px-3 bg-bg-canvas/40 border border-border-default rounded-lg text-xs text-text-primary placeholder-text-muted focus:bg-bg-surface focus:outline-none focus:border-accent transition-all duration-75 keyboard-focus font-medium"
                disabled={loading}
              />
            </div>

            <div className="flex items-center justify-between text-[11px] font-medium select-none">
              <label className="flex items-center gap-2 text-text-secondary cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="rounded border-border-default text-accent focus:ring-accent w-3.5 h-3.5"
                />
                <span>Simpan sesi masuk</span>
              </label>
            </div>

            {/* Custom Interactive Button with active scaling */}
            <button 
              type="submit" 
              className="w-full h-9.5 bg-accent hover:bg-accent/90 text-white font-bold text-xs rounded-lg flex items-center justify-center transition-all duration-75 shadow-[0_1px_2px_rgba(94,106,210,0.15)] cursor-pointer keyboard-focus btn-active-scale"
              disabled={loading}
            >
              {loading ? (
                <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
              ) : (
                <div className="flex items-center gap-1.5">
                  <span>Masuk ke Workspace</span>
                  <span className="kbd-key opacity-50 font-normal">↵</span>
                </div>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center justify-between text-[10px] font-bold text-text-muted select-none uppercase tracking-wider">
            <span className="w-[30%] h-[1px] bg-border-default" />
            <span>atau</span>
            <span className="w-[30%] h-[1px] bg-border-default" />
          </div>

          {/* Google Login Button */}
          <button 
            type="button" 
            onClick={handleGoogleLogin}
            className="w-full h-9.5 bg-bg-surface hover:bg-bg-canvas border border-border-default text-text-primary font-bold text-xs rounded-lg flex items-center justify-center gap-2.5 transition-all duration-75 cursor-pointer keyboard-focus shadow-[0_1px_2px_rgba(0,0,0,0.02)] btn-active-scale"
            disabled={loading}
          >
            <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24">
              <path fill="#EA4335" d="M12 5.04c1.67 0 3.17.58 4.35 1.71l3.25-3.25C17.65 1.58 14.98 1 12 1 7.35 1 3.4 3.65 1.58 7.5L5.04 10.2C5.9 7.35 8.65 5.04 12 5.04z" />
              <path fill="#4285F4" d="M23.5 12.25c0-.82-.07-1.6-.2-2.25H12v4.25h6.5c-.28 1.45-1.1 2.68-2.33 3.5l3.58 2.78c2.1-1.94 3.75-5.18 3.75-8.28z" />
              <path fill="#FBBC05" d="M5.04 13.8c-.22-.67-.35-1.4-.35-2.15s.13-1.48.35-2.15L1.58 6.7C.58 8.7 0 10.95 0 13.3s.58 4.6 1.58 6.6l3.46-3.1z" />
              <path fill="#34A853" d="M12 23c3.24 0 5.97-1.08 7.96-2.92l-3.58-2.78c-1.1.74-2.5 1.18-4.38 1.18-3.35 0-6.1-2.3-6.96-5.16L1.58 16.4C3.4 20.35 7.35 23 12 23z" />
            </svg>
            <span>Masuk dengan Akun Google</span>
          </button>
        </div>

        {/* Footer info */}
        <div className="text-[10px] text-text-muted text-center space-y-1.5 select-none font-medium">
          <div>Belum terdaftar? <a href="#" className="text-accent hover:underline font-bold">Hubungi Administrator</a></div>
          <div className="flex items-center justify-center gap-1.5 text-[9px]">
            <span>Platform Kinerja v1.0.0</span>
            <span>•</span>
            <span>TLS 1.3 Secure</span>
          </div>
        </div>
      </div>
    </div>
  );
}
