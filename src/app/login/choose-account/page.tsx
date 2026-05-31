"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function ChooseAccount() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const dummyAccounts = [
    {
      name: "2301020005 Cahyadi Prasetyo",
      email: "cprasetyo@student.umrah.ac.id",
      avatarText: "C",
      avatarBg: "bg-[#78909C]",
      avatarImg: ""
    },
    {
      name: "Cian",
      email: "cianbichir@gmail.com",
      avatarText: "C",
      avatarBg: "bg-[#AB47BC]",
      avatarImg: ""
    },
    {
      name: "Cahyadi Prasetyo",
      email: "cahyadiprasetyo659@gmail.com",
      avatarText: "C",
      avatarBg: "bg-[#4285F4]",
      avatarImg: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop"
    },
    {
      name: "Cahyadi Prasetyo",
      email: "cahyadi.informatics@gmail.com",
      avatarText: "C",
      avatarBg: "bg-[#EC407A]",
      avatarImg: ""
    },
    {
      name: "Cahyadi Prasetyo",
      email: "prasetyoc87@gmail.com",
      avatarText: "C",
      avatarBg: "bg-[#66BB6A]",
      avatarImg: ""
    },
    {
      name: "BIXXY F",
      email: "bixxyf@gmail.com",
      avatarText: "B",
      avatarBg: "bg-[#0D47A1]",
      avatarImg: ""
    },
    {
      name: "Cahyadi Prasetyo",
      email: "prasetyocahyadi220@gmail.com",
      avatarText: "C",
      avatarBg: "bg-[#0288D1]",
      avatarImg: ""
    },
    {
      name: "Cahyadi Prasetyo",
      email: "chcprasetyo@gmail.com",
      avatarText: "C",
      avatarBg: "bg-[#263238]",
      avatarImg: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=100&h=100&fit=crop"
    }
  ];

  const handleSelectAccount = (email: string, name: string) => {
    setLoading(true);
    setTimeout(() => {
      localStorage.setItem('user', JSON.stringify({ email, name }));
      setLoading(false);
      router.push('/');
    }, 800);
  };

  return (
    <div className="min-h-screen bg-[#F0F4F9] flex flex-col items-center justify-center font-sans antialiased text-[#202124] p-4 md:p-8 select-none">
      
      {/* Main card */}
      <div className="w-full max-w-[860px] bg-white rounded-[28px] border border-[#E3E3E3] shadow-[0_4px_24px_rgba(0,0,0,0.04)] flex flex-col overflow-hidden relative">
        
        {/* Top bar header */}
        <div className="px-6 md:px-10 py-4 border-b border-[#F0F4F9] flex items-center gap-3.5">
          <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24">
            <path fill="#EA4335" d="M12 5.04c1.67 0 3.17.58 4.35 1.71l3.25-3.25C17.65 1.58 14.98 1 12 1 7.35 1 3.4 3.65 1.58 7.5L5.04 10.2C5.9 7.35 8.65 5.04 12 5.04z" />
            <path fill="#4285F4" d="M23.5 12.25c0-.82-.07-1.6-.2-2.25H12v4.25h6.5c-.28 1.45-1.1 2.68-2.33 3.5l3.58 2.78c2.1-1.94 3.75-5.18 3.75-8.28z" />
            <path fill="#FBBC05" d="M5.04 13.8c-.22-.67-.35-1.4-.35-2.15s.13-1.48.35-2.15L1.58 6.7C.58 8.7 0 10.95 0 13.3s.58 4.6 1.58 6.6l3.46-3.1z" />
            <path fill="#34A853" d="M12 23c3.24 0 5.97-1.08 7.96-2.92l-3.58-2.78c-1.1.74-2.5 1.18-4.38 1.18-3.35 0-6.1-2.3-6.96-5.16L1.58 16.4C3.4 20.35 7.35 23 12 23z" />
          </svg>
          <span className="text-xs md:text-sm font-semibold text-[#1F1F1F]">Login dengan Google</span>
        </div>

        {/* Loader bar if select is loading */}
        {loading && (
          <div className="absolute top-[52px] left-0 right-0 h-[3px] bg-[#E8F0FE] overflow-hidden">
            <div className="h-full bg-[#0B57D0] w-1/3 rounded animate-[loading_0.8s_infinite_linear]" />
          </div>
        )}

        {/* Content body split layout */}
        <div className="flex flex-col md:flex-row p-6 md:p-10 gap-6 md:gap-10">
          
          {/* Left panel: headings */}
          <div className="md:w-[40%] flex flex-col justify-start text-left space-y-3 pt-1">
            <h1 className="text-[28px] md:text-[36px] font-normal text-[#1F1F1F] tracking-tight leading-tight">
              Pilih akun
            </h1>
            <p className="text-[14px] md:text-[15px] text-[#444746] font-normal leading-relaxed">
              Lanjutkan ke <span className="text-[#0B57D0] hover:underline cursor-pointer font-semibold transition-all">SIMANTAP</span>
            </p>
          </div>

          {/* Right panel: accounts list */}
          <div className="md:w-[60%] flex flex-col">
            <div className="flex flex-col">
              {dummyAccounts.map((account, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => handleSelectAccount(account.email, account.name)}
                  className="w-full py-3 px-3 flex items-center gap-4 hover:bg-[#F8F9FA] transition-all text-left focus:outline-none cursor-pointer border-b border-[#F0F4F9] rounded-lg group disabled:opacity-50"
                  disabled={loading}
                >
                  {account.avatarImg ? (
                    <img 
                      src={account.avatarImg} 
                      alt={account.name} 
                      className="w-9 h-9 rounded-full object-cover shrink-0 border border-gray-100"
                    />
                  ) : (
                    <div className={`w-9 h-9 rounded-full flex items-center justify-center text-white font-medium text-sm select-none shrink-0 ${account.avatarBg}`}>
                      {account.avatarText}
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <div className="text-[13.5px] font-semibold text-[#1F1F1F] group-hover:text-[#0B57D0] transition-colors truncate">
                      {account.name}
                    </div>
                    <div className="text-[11.5px] text-[#444746] truncate">
                      {account.email}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

        </div>

      </div>

      {/* Footer bar */}
      <div className="w-full max-w-[860px] flex flex-col sm:flex-row items-center justify-between text-[11px] text-[#747775] gap-3 pt-6 pb-2 px-4 select-none">
        <div>
          <button className="hover:bg-[#E8EAED] px-2 py-1.5 rounded-lg transition-colors cursor-pointer text-left focus:outline-none font-semibold flex items-center gap-1 text-[#444746]">
            Bahasa Indonesia
            <svg className="w-3 h-3 text-[#444746]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>
        <div className="flex items-center gap-6 font-semibold">
          <a href="#" className="hover:text-[#1F1F1F] transition-colors">Bantuan</a>
          <a href="#" className="hover:text-[#1F1F1F] transition-colors">Privasi</a>
          <a href="#" className="hover:text-[#1F1F1F] transition-colors">Persyaratan</a>
        </div>
      </div>

      {/* Embedded CSS style */}
      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 5px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #DADCE0;
          border-radius: 9999px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #BDC1C6;
        }
        @keyframes loading {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(300%); }
        }
      `}</style>
    </div>
  );
}
