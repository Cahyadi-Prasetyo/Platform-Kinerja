"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

interface Issue {
  id: string;
  title: string;
  status: 'Backlog' | 'Todo' | 'Active' | 'Completed';
  priority: 'No Priority' | 'Low' | 'Medium' | 'High' | 'Urgent';
  team: string;
  assignee: string;
  date: string;
  completed: boolean;
  starred: boolean;
}

interface Project {
  id: string;
  name: string;
  health: 'Healthy' | 'Attention Needed' | 'No Update Expected';
  priority: 'Low' | 'Medium' | 'High' | 'Urgent';
  lead: string;
  date: string;
  issuesCount: number;
  progress: number;
}

// --- SVG CUSTOM ICONS (strokeWidth 1.5, size 14px/16px) ---
const IconSearch = () => (
  <svg className="w-3.5 h-3.5 text-text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
  </svg>
);

const IconInbox = () => (
  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0a2 2 0 01-2 2H6a2 2 0 01-2-2m16 0l-3.586-3.586a2 2 0 00-2.828 0L13 11m-9 2l3.586-3.586a2 2 0 012.828 0L11 11" />
  </svg>
);

const IconIssue = () => (
  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
    <circle cx="12" cy="12" r="9" strokeDasharray="3 3" />
  </svg>
);

const IconProjects = () => (
  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
  </svg>
);

const IconViews = () => (
  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 10h16M4 14h16M4 18h16" />
  </svg>
);

const IconBell = () => (
  <svg className="w-4 h-4 text-text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
  </svg>
);

const IconPlus = () => (
  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
  </svg>
);

const IconChevronDown = () => (
  <svg className="w-3 h-3 text-text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
  </svg>
);

interface IconStarProps {
  active: boolean;
}

const IconStar: React.FC<IconStarProps> = ({ active }) => (
  <svg className={`w-3.5 h-3.5 ${active ? 'text-amber-400 fill-amber-400' : 'text-text-muted hover:text-amber-400'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.907c.961 0 1.36 1.242.588 1.81l-3.97 2.88a1 1 0 00-.364 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.971-2.88a1 1 0 00-1.175 0l-3.97 2.88c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.364-1.118l-3.97-2.88c-.773-.568-.375-1.81.588-1.81h4.907a1 1 0 00.95-.69l1.519-4.674z" />
  </svg>
);

const IconFilter = () => (
  <svg className="w-3.5 h-3.5 text-text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
  </svg>
);

const IconSort = () => (
  <svg className="w-3.5 h-3.5 text-text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12" />
  </svg>
);

const IconGrid = () => (
  <svg className="w-3.5 h-3.5 text-text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
  </svg>
);

const IconStatusBacklog = () => (
  <svg className="w-3.5 h-3.5 text-text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 3">
    <circle cx="12" cy="12" r="9" />
  </svg>
);

const IconStatusTodo = () => (
  <svg className="w-3.5 h-3.5 text-zinc-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
    <circle cx="12" cy="12" r="9" />
  </svg>
);

const IconStatusActive = () => (
  <svg className="w-3.5 h-3.5 text-amber-500 fill-amber-500/20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
    <circle cx="12" cy="12" r="9" />
    <path d="M12 8v4l2 2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const IconStatusCompleted = () => (
  <svg className="w-3.5 h-3.5 text-emerald-500 fill-emerald-500/10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
    <circle cx="12" cy="12" r="9" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4" />
  </svg>
);

// --- LOGO BRANDING ---
const LogoIcon = () => (
  <Image 
    src="/logo.png" 
    alt="Brand Logo" 
    width={18} 
    height={18}
    className="object-contain shrink-0" 
  />
);

export default function Home() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState<{ email: string; name: string } | null>(null);

  // --- STATE MANAGEMENT ---
  const [activeTab, setActiveTab] = useState<'issues' | 'projects' | 'views'>('issues');
  const [activeFilter, setActiveFilter] = useState<'all' | 'active' | 'backlog'>('all');
  
  // Data State
  const [issues, setIssues] = useState<Issue[]>([
    { id: 'CAH-1', title: 'Membiasakan diri dengan platform monitoring Linear', status: 'Todo', priority: 'Medium', team: 'Tech', assignee: 'Cahyadi', date: '29 Mei', completed: false, starred: true },
    { id: 'CAH-2', title: 'Mengatur alur koordinasi dan struktur tim internal', status: 'Todo', priority: 'High', team: 'Tech', assignee: 'Cahyadi', date: '29 Mei', completed: false, starred: false },
    { id: 'CAH-3', title: 'Menghubungkan API Supabase untuk monitoring real-time', status: 'Todo', priority: 'Urgent', team: 'Tech', assignee: 'Cahyadi', date: '30 Mei', completed: false, starred: false },
    { id: 'CAH-4', title: 'Impor data matriks KPI dari berkas perencanaan lama', status: 'Todo', priority: 'Low', team: 'Product', assignee: 'Prasetyo', date: '01 Jun', completed: false, starred: false },
    { id: 'CAH-5', title: 'Melakukan analisis kesenjangan UI vs berkas DESIGN.md', status: 'Active', priority: 'High', team: 'Design', assignee: 'Prasetyo', date: '28 Mei', completed: true, starred: false },
    { id: 'CAH-6', title: 'Menyiapkan repositori Github utama untuk kolaborasi', status: 'Backlog', priority: 'No Priority', team: 'Tech', assignee: 'Cahyadi', date: '15 Jun', completed: false, starred: false }
  ]);

  const [projects, setProjects] = useState<Project[]>([
    { id: 'PRJ-1', name: 'Platform Monitoring Kinerja', health: 'Healthy', priority: 'High', lead: 'Cahyadi P.', date: '31 Des 2026', issuesCount: 4, progress: 75 },
    { id: 'PRJ-2', name: 'Desain Sistem Komponen Atomik', health: 'Attention Needed', priority: 'Medium', lead: 'Prasetyo A.', date: '15 Jul 2026', issuesCount: 2, progress: 40 },
    { id: 'PRJ-3', name: 'Sistem Integrasi Pipeline CI/CD', health: 'No Update Expected', priority: 'Low', lead: 'Cahyadi P.', date: '01 Okt 2026', issuesCount: 0, progress: 10 }
  ]);

  // Modals & Menu Popover States
  const [isNewProjectModalOpen, setIsNewProjectModalOpen] = useState(false);
  const [isCommandMenuOpen, setIsCommandMenuOpen] = useState(false);
  const [isMoreMenuOpen, setIsMoreMenuOpen] = useState(false);
  const [isWorkspaceMenuOpen, setIsWorkspaceMenuOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  
  // States untuk Pembuatan Proyek Baru (Modal)
  const [newProjName, setNewProjName] = useState('');
  const [newProjSummary, setNewProjSummary] = useState('');
  const [newProjPriority, setNewProjPriority] = useState<'Low' | 'Medium' | 'High' | 'Urgent'>('Medium');
  const [newProjStatus, setNewProjStatus] = useState<'Backlog' | 'Active'>('Backlog');
  const [newProjLead, setNewProjLead] = useState('Cahyadi P.');

  // Input Inline untuk Tugas Baru
  const [isAddingInline, setIsAddingInline] = useState(false);
  const [inlineTitle, setInlineTitle] = useState('');

  // Pencarian Command Menu
  const [searchQuery, setSearchQuery] = useState('');

  // Tab Split View Kanan (Insight Panel)
  const [activeInsightTab, setActiveInsightTab] = useState<'health' | 'leads'>('health');

  // --- ROUTE PROTECTION & INITIALIZATION ---
  useEffect(() => {
    const rawUser = localStorage.getItem('user');
    if (!rawUser) {
      router.push('/login');
    } else {
      setIsAuthenticated(true);
      setCurrentUser(JSON.parse(rawUser));
    }
  }, [router]);

  // --- SHORTCUT DETECTOR (Cmd+K atau Ctrl+K, dan Navigasi Keyboard) ---
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Toggle Command Menu
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsCommandMenuOpen(prev => !prev);
      }
      
      // Close Modals on ESC
      if (e.key === 'Escape') {
        setIsCommandMenuOpen(false);
        setIsNewProjectModalOpen(false);
        setIsMoreMenuOpen(false);
        setIsWorkspaceMenuOpen(false);
        setIsAddingInline(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // --- TOAST TRIGGER HELPER ---
  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 2500);
  };

  // --- EVENT HANDLERS ---
  const handleToggleComplete = (id: string) => {
    setIssues(prev => prev.map(issue => {
      if (issue.id === id) {
        const nextState = !issue.completed;
        const nextStatus = nextState ? 'Completed' : 'Todo';
        showToast(nextState ? `Tugas ${issue.id} ditandai selesai` : `Tugas ${issue.id} dibuka kembali`);
        return { ...issue, completed: nextState, status: nextStatus };
      }
      return issue;
    }));
  };

  const handleToggleStar = (id: string) => {
    setIssues(prev => prev.map(issue => {
      if (issue.id === id) {
        return { ...issue, starred: !issue.starred };
      }
      return issue;
    }));
  };

  const handleCreateProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProjName.trim()) {
      showToast('Nama proyek tidak boleh kosong!');
      return;
    }

    const newProject: Project = {
      id: `PRJ-${projects.length + 1}`,
      name: newProjName,
      health: 'Healthy',
      priority: newProjPriority,
      lead: newProjLead,
      date: 'Des 2026',
      issuesCount: 0,
      progress: 0
    };

    setProjects(prev => [newProject, ...prev]);
    setIsNewProjectModalOpen(false);
    showToast(`Proyek "${newProjName}" berhasil dibuat!`);
    
    // Reset inputs
    setNewProjName('');
    setNewProjSummary('');
    setNewProjPriority('Medium');
    setNewProjStatus('Backlog');
  };

  const handleAddInlineIssue = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inlineTitle.trim()) {
      setIsAddingInline(false);
      return;
    }

    const nextIdNum = issues.length + 1;
    const newIssue: Issue = {
      id: `CAH-${nextIdNum}`,
      title: inlineTitle,
      status: 'Todo',
      priority: 'Medium',
      team: 'Tech',
      assignee: currentUser ? currentUser.name : 'Cahyadi',
      date: 'Hari ini',
      completed: false,
      starred: false
    };

    setIssues(prev => [newIssue, ...prev]);
    setInlineTitle('');
    setIsAddingInline(false);
    showToast(`Tugas baru CAH-${nextIdNum} berhasil dibuat.`);
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    showToast('Keluar dari aplikasi...');
    setTimeout(() => {
      router.push('/login');
    }, 500);
  };

  // Filter Issues
  const filteredIssues = issues.filter(issue => {
    if (activeFilter === 'active') return !issue.completed && issue.status !== 'Backlog';
    if (activeFilter === 'backlog') return issue.status === 'Backlog';
    return true; // 'all'
  });

  // Filter Command Menu Results
  const commandResults = issues.filter(issue => 
    issue.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    issue.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Avoid page flashing on redirect
  if (!isAuthenticated) {
    return (
      <div className="w-full h-screen bg-bg-canvas flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          {/* Subtle loading state */}
          <div className="animate-pulse flex space-x-2">
            <div className="w-2.5 h-2.5 bg-text-muted rounded-full"></div>
            <div className="w-2.5 h-2.5 bg-text-muted rounded-full animate-bounce"></div>
            <div className="w-2.5 h-2.5 bg-text-muted rounded-full"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex w-full h-screen bg-bg-canvas text-text-primary overflow-hidden select-none font-sans antialiased">
      
      {/* ==========================================
          SIDEBAR KIRI (Workspace Navigation)
          ========================================== */}
      <aside className="w-[240px] flex flex-col justify-between border-r border-border-default bg-bg-canvas py-3 px-3.5 text-[13px] shrink-0">
        <div>
          {/* Workspace Selector Dropdown (Sesuai dengan image_9ef397.png) */}
          <div className="relative">
            <div 
              onClick={() => setIsWorkspaceMenuOpen(!isWorkspaceMenuOpen)}
              className="flex items-center justify-between p-1.5 rounded-lg hover:bg-bg-element cursor-pointer mb-3.5 transition-colors duration-75"
            >
              <div className="flex items-center gap-2.5">
                {/* Logo kustom CP menggantikan inisial biasa */}
                <div className="w-5 h-5 rounded-md bg-bg-surface border border-border-default flex items-center justify-center p-0.5 shadow-[0_1px_2px_rgba(0,0,0,0.03)] shrink-0">
                  <LogoIcon />
                </div>
                <span className="font-bold text-text-primary tracking-tight truncate w-32">
                  {currentUser ? currentUser.name : 'Cahyadi P.'}
                </span>
              </div>
              <IconChevronDown />
            </div>

            {/* Dropdown Menu (Direproduksi penuh berdasarkan image_9ef397.png) */}
            {isWorkspaceMenuOpen && (
              <div className="absolute left-0 top-9 w-[220px] bg-bg-surface border border-border-default rounded-xl py-1 shadow-[0_8px_30px_rgb(0,0,0,0.06),0_1px_2px_rgb(0,0,0,0.04)] z-30">
                <div className="px-3 py-1 text-text-muted text-[10px] font-bold uppercase tracking-wider select-none">Menu Platform</div>
                
                <div className="px-3 py-1.5 hover:bg-bg-canvas cursor-pointer flex items-center justify-between text-text-primary text-[12px] font-medium" onClick={() => showToast('Membuka Pengaturan...')}>
                  <span>Pengaturan / Settings</span>
                  <span className="text-[10px] text-text-muted">G then S</span>
                </div>

                <div className="px-3 py-1.5 hover:bg-bg-canvas cursor-pointer text-text-primary text-[12px] font-medium" onClick={() => showToast('Membuka menu Undang Anggota...')}>
                  Undang & Kelola Anggota
                </div>

                <div className="px-3 py-1.5 hover:bg-bg-canvas cursor-pointer text-text-primary text-[12px] font-medium" onClick={() => showToast('Mendownload aplikasi desktop...')}>
                  Unduh Aplikasi Desktop
                </div>

                <hr className="my-1 border-border-default" />

                <div className="px-3 py-1.5 hover:bg-bg-canvas cursor-pointer flex items-center justify-between text-text-primary text-[12px] font-medium" onClick={() => showToast('Beralih Workspace...')}>
                  <span>Ganti Workspace</span>
                  <span className="text-[10px] text-text-muted">O then W</span>
                </div>

                <div 
                  onClick={handleLogout}
                  className="px-3 py-1.5 hover:bg-danger/10 hover:text-danger cursor-pointer flex items-center justify-between text-text-primary text-[12px] font-semibold"
                >
                  <span>Keluar / Log out</span>
                  <span className="text-[10px] text-text-muted">Alt ⇧ Q</span>
                </div>
              </div>
            )}
          </div>

          {/* Akses Pencarian Cepat */}
          <button 
            onClick={() => setIsCommandMenuOpen(true)}
            className="w-full flex items-center justify-between p-1.5 rounded-lg border border-border-default bg-bg-surface hover:bg-bg-canvas text-text-muted text-left mb-4 transition-colors duration-75 keyboard-focus"
          >
            <div className="flex items-center gap-2">
              <IconSearch />
              <span className="text-[12px] text-text-secondary">Cari sesuatu...</span>
            </div>
            <span className="text-[10px] text-text-muted font-mono tracking-widest bg-bg-canvas px-1 py-0.5 rounded border border-border-default">⌘K</span>
          </button>

          {/* Kategori Menu Utama */}
          <nav className="space-y-[3px]">
            <div className="flex items-center justify-between px-2 py-1 text-text-secondary hover:bg-bg-element/80 rounded-md cursor-pointer transition-none">
              <div className="flex items-center gap-2">
                <IconInbox />
                <span className="font-semibold text-text-secondary">Kotak Masuk</span>
              </div>
              <span className="w-4 h-4 bg-bg-element text-text-secondary rounded flex items-center justify-center text-[9px] font-bold">1</span>
            </div>

            <div className="flex items-center gap-2 px-2 py-1 text-text-secondary hover:bg-bg-element/80 rounded-md cursor-pointer transition-none">
              <IconIssue />
              <span className="font-semibold text-text-secondary">Isu Saya</span>
            </div>

            {/* Kelompok Menu: Workspace */}
            <div className="pt-3 pb-1 px-2 text-[10px] font-bold text-text-muted uppercase tracking-wider select-none">Workspace</div>
            
            <div 
              onClick={() => setActiveTab('projects')}
              className={`flex items-center gap-2 px-2 py-1 rounded-md cursor-pointer transition-none ${activeTab === 'projects' ? 'bg-bg-element text-text-primary font-bold shadow-[0_1px_2px_rgba(0,0,0,0.01)]' : 'text-text-secondary hover:bg-bg-element/80'}`}
            >
              <IconProjects />
              <span>Proyek</span>
            </div>

            <div 
              onClick={() => setActiveTab('views')}
              className={`flex items-center gap-2 px-2 py-1 rounded-md cursor-pointer transition-none ${activeTab === 'views' ? 'bg-bg-element text-text-primary font-bold shadow-[0_1px_2px_rgba(0,0,0,0.01)]' : 'text-text-secondary hover:bg-bg-element/80'}`}
            >
              <IconViews />
              <span>Tampilan Kustom</span>
            </div>

            {/* Menu Dropdown Kustom */}
            <div className="relative">
              <div 
                onClick={() => setIsMoreMenuOpen(!isMoreMenuOpen)}
                className="flex items-center gap-2 px-2 py-1 text-text-secondary hover:bg-bg-element/80 rounded-md cursor-pointer transition-none"
              >
                <span className="font-bold tracking-widest text-[11px]">···</span>
                <span>Lainnya</span>
              </div>
              
              {isMoreMenuOpen && (
                <div className="absolute left-1 top-7 w-[160px] bg-bg-surface border border-border-default rounded-lg py-1 shadow-[0_4px_12px_rgba(0,0,0,0.05),0_1px_2px_rgba(0,0,0,0.05)] z-20">
                  <div className="px-3 py-1.5 hover:bg-bg-canvas cursor-pointer flex items-center gap-2 text-text-secondary">
                    <div className="w-1.5 h-1.5 rounded-full bg-text-muted"></div>
                    <span>Daftar Tim</span>
                  </div>
                  <div className="px-3 py-1.5 hover:bg-bg-canvas cursor-pointer flex items-center gap-2 text-text-secondary">
                    <div className="w-1.5 h-1.5 rounded-full bg-text-muted"></div>
                    <span>Anggota</span>
                  </div>
                  <hr className="my-1 border-border-default" />
                  <div className="px-3 py-1.5 hover:bg-bg-canvas cursor-pointer text-text-muted hover:text-text-primary text-[12px]">
                    Kustomisasi Sidebar
                  </div>
                </div>
              )}
            </div>

            {/* Kelompok Menu: Teams */}
            <div className="pt-4 pb-1 px-2 text-[10px] font-bold text-text-muted uppercase tracking-wider flex items-center justify-between select-none">
              <span>Tim Kinerja</span>
            </div>

            <div 
              onClick={() => setActiveTab('issues')}
              className={`flex items-center justify-between px-2 py-1 rounded-md cursor-pointer transition-none ${activeTab === 'issues' ? 'bg-bg-element text-text-primary font-bold shadow-[0_1px_2px_rgba(0,0,0,0.01)]' : 'text-text-secondary hover:bg-bg-element/80'}`}
            >
              <div className="flex items-center gap-2">
                <span className="text-accent font-bold text-xs">⚡</span>
                <span className="font-semibold">Cahyadi Prasetyo</span>
              </div>
            </div>
            
            <div className="pl-6 space-y-[2px]">
              <div 
                onClick={() => { setActiveTab('issues'); setActiveFilter('all'); }}
                className="flex items-center justify-between px-2 py-1 text-text-secondary hover:bg-bg-element/80 rounded-md cursor-pointer transition-none"
              >
                <span>Semua Isu</span>
                <span className="text-[11px] text-text-muted font-mono">{issues.length}</span>
              </div>
              <div 
                onClick={() => { setActiveTab('issues'); setActiveFilter('active'); }}
                className={`px-2 py-1 rounded-md cursor-pointer transition-none ${activeFilter === 'active' && activeTab === 'issues' ? 'text-text-primary font-bold bg-bg-element/50' : 'text-text-secondary hover:bg-bg-element/80'}`}
              >
                Aktif
              </div>
              <div 
                onClick={() => { setActiveTab('issues'); setActiveFilter('backlog'); }}
                className={`px-2 py-1 rounded-md cursor-pointer transition-none ${activeFilter === 'backlog' && activeTab === 'issues' ? 'text-text-primary font-bold bg-bg-element/50' : 'text-text-secondary hover:bg-bg-element/80'}`}
              >
                Backlog
              </div>
            </div>
          </nav>
        </div>

        {/* Footer Sidebar */}
        <div className="space-y-2 border-t border-border-default pt-2 shrink-0 select-none">
          <div className="flex items-center gap-2 p-1 text-text-secondary hover:text-text-primary cursor-pointer transition-colors duration-75">
            <span className="font-mono text-text-muted text-[11px]">?</span>
            <span>Bantuan & Dukungan</span>
          </div>
          <div className="flex items-center justify-between text-text-muted text-[11px] px-1">
            <span>Umpan Balik</span>
            <span className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-success animate-pulse"></span>
              Aktif
            </span>
          </div>
        </div>
      </aside>

      {/* ==========================================
          AREA KONTEN UTAMA & WORKSPACE
          ========================================== */}
      <main className="flex-1 flex flex-col overflow-hidden bg-bg-canvas">
        
        {/* TOP HEADER BAR */}
        <header className="h-[48px] border-b border-border-default bg-bg-surface flex items-center justify-between px-6 shrink-0">
          <div className="flex items-center gap-2">
            <span className="text-text-muted hover:text-text-primary cursor-pointer text-[12px] font-medium transition-colors duration-75">Workspace</span>
            <span className="text-border-default text-xs">/</span>
            <h1 className="text-[13px] font-bold text-text-primary capitalize flex items-center gap-1.5 select-all">
              {activeTab === 'issues' ? 'Isu Utama' : activeTab === 'projects' ? 'Daftar Proyek Kinerja' : 'View Kustom'}
              <IconStar active={true} />
            </h1>
          </div>

          <div className="flex items-center gap-3">
            {/* Tombol aksi global */}
            <button 
              onClick={() => setIsNewProjectModalOpen(true)}
              className="h-7.5 px-3 bg-accent hover:bg-accent/90 text-white text-[12px] font-semibold rounded-lg flex items-center gap-1.5 shadow-sm transition-colors duration-75 cursor-pointer keyboard-focus"
            >
              <IconPlus />
              <span>Proyek Baru</span>
            </button>
            <div className="w-[1px] h-4 bg-border-default"></div>
            <button className="p-1 hover:bg-bg-element rounded-md transition-colors duration-75 cursor-pointer">
              <IconBell />
            </button>
            <div className="w-6.5 h-6.5 rounded-md bg-accent text-white flex items-center justify-center font-bold text-[10px] shadow-[0_1px_3px_rgba(94,106,210,0.2)]">
              {currentUser ? currentUser.name[0].toUpperCase() : 'C'}
            </div>
          </div>
        </header>

        {/* WORKSPACE VIEWPORT */}
        <div className="flex-1 overflow-y-auto p-6 flex flex-col">
          
          {/* ==========================================
              HALAMAN 1: SEMUA ISU / TASK MANAGER
              ========================================== */}
          {activeTab === 'issues' && (
            <div className="flex-1 flex flex-col space-y-4 max-w-6xl w-full mx-auto">
              {/* Kategori Filter Tab */}
              <div className="flex items-center justify-between">
                <div className="flex gap-1.5">
                  <button 
                    onClick={() => setActiveFilter('all')}
                    className={`h-7 px-3.5 text-[12px] rounded-full transition-colors duration-75 cursor-pointer font-medium ${activeFilter === 'all' ? 'bg-bg-surface border border-border-default text-text-primary shadow-[0_1px_2px_rgba(0,0,0,0.01)]' : 'text-text-secondary hover:bg-bg-surface/60'}`}
                  >
                    Semua Isu
                  </button>
                  <button 
                    onClick={() => setActiveFilter('active')}
                    className={`h-7 px-3.5 text-[12px] rounded-full transition-colors duration-75 cursor-pointer font-medium ${activeFilter === 'active' ? 'bg-bg-surface border border-border-default text-text-primary shadow-[0_1px_2px_rgba(0,0,0,0.01)]' : 'text-text-secondary hover:bg-bg-surface/60'}`}
                  >
                    Sedang Aktif
                  </button>
                  <button 
                    onClick={() => setActiveFilter('backlog')}
                    className={`h-7 px-3.5 text-[12px] rounded-full transition-colors duration-75 cursor-pointer font-medium ${activeFilter === 'backlog' ? 'bg-bg-surface border border-border-default text-text-primary shadow-[0_1px_2px_rgba(0,0,0,0.01)]' : 'text-text-secondary hover:bg-bg-surface/60'}`}
                  >
                    Daftar Backlog
                  </button>
                </div>

                <div className="flex items-center gap-1.5 select-none">
                  <button className="h-7 px-2.5 bg-bg-surface border border-border-default hover:bg-bg-canvas text-[12px] text-text-secondary rounded-lg flex items-center gap-1.5 transition-colors duration-75 cursor-pointer keyboard-focus">
                    <IconFilter />
                    <span>Filter</span>
                  </button>
                  <button className="h-7 px-2.5 bg-bg-surface border border-border-default hover:bg-bg-canvas text-[12px] text-text-secondary rounded-lg flex items-center gap-1.5 transition-colors duration-75 cursor-pointer keyboard-focus">
                    <IconSort />
                    <span>Urutkan</span>
                  </button>
                  <button className="p-1.5 bg-bg-surface border border-border-default hover:bg-bg-canvas rounded-lg transition-colors duration-75 cursor-pointer">
                    <IconGrid />
                  </button>
                </div>
              </div>

              {/* Kontainer Utama Box Putih (Design Tweak: Softer Rounded-xl & subtle border accent) */}
              <div className="bg-bg-surface border border-border-default rounded-xl overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.015)] border-l-4 border-l-accent/40">
                {/* Header Kolom Kelompok */}
                <div className="h-[38px] bg-[#fbfbfb] border-b border-border-default px-4 flex items-center justify-between text-text-secondary text-[11px] font-bold tracking-wider uppercase select-none">
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-text-muted"></span>
                    <span>Tugas Tim Aktif — Todo</span>
                    <span className="bg-bg-canvas text-text-secondary px-1.5 py-0.5 rounded text-[10px] font-normal tracking-normal lowercase">{filteredIssues.length} tugas</span>
                  </div>
                  <button 
                    onClick={() => setIsAddingInline(true)}
                    className="p-1 hover:bg-bg-element rounded-md text-text-muted hover:text-text-primary transition-colors duration-75 cursor-pointer"
                  >
                    <IconPlus />
                  </button>
                </div>

                {/* Input Inline */}
                {isAddingInline && (
                  <form onSubmit={handleAddInlineIssue} className="flex items-center h-9.5 px-4 border-b border-border-default bg-bg-canvas/30">
                    <div className="w-4 h-4 rounded-full border border-border-default mr-3 shrink-0"></div>
                    <input 
                      type="text" 
                      placeholder="Apa yang ingin dicapai selanjutnya? Tekan Enter untuk menyimpan..." 
                      value={inlineTitle}
                      onChange={(e) => setInlineTitle(e.target.value)}
                      className="flex-1 bg-transparent border-none text-[13px] text-text-primary focus:outline-none focus:ring-0 placeholder-text-muted"
                      autoFocus
                    />
                    <button type="submit" className="text-[11px] bg-bg-element hover:bg-border-default text-text-primary px-2.5 py-1 rounded-md transition-none cursor-pointer font-bold">Simpan</button>
                  </form>
                )}

                {/* Daftar Baris Kinerja (Row List - High Density max 36px) */}
                <div className="divide-y divide-border-default">
                  {filteredIssues.map((issue) => (
                    <div 
                      key={issue.id} 
                      className={`h-9 px-4 flex items-center justify-between group hover:bg-bg-element/40 transition-none text-[13px] ${issue.completed ? 'opacity-60 bg-bg-canvas/30' : ''}`}
                    >
                      <div className="flex items-center gap-3 flex-1 min-w-0 mr-4">
                        {/* Status Checkbox */}
                        <button 
                          onClick={() => handleToggleComplete(issue.id)}
                          className={`w-4 h-4 rounded-full flex items-center justify-center transition-colors duration-75 cursor-pointer ${issue.completed ? 'bg-accent/10 border border-accent/30' : 'border border-border-default hover:border-text-secondary bg-bg-surface'}`}
                        >
                          {issue.completed ? (
                            <div className="w-1.5 h-1.5 rounded-full bg-accent"></div>
                          ) : issue.status === 'Active' ? (
                            <div className="w-1.5 h-1.5 rounded-full bg-warning"></div>
                          ) : null}
                        </button>

                        {/* ID Metrik */}
                        <span className="text-[11px] text-text-secondary font-mono select-all shrink-0 w-12 tracking-normal">{issue.id}</span>
                        
                        {/* Status Icon */}
                        <span className="shrink-0 text-text-muted">
                          {issue.status === 'Completed' ? <IconStatusCompleted /> : issue.status === 'Active' ? <IconStatusActive /> : issue.status === 'Backlog' ? <IconStatusBacklog /> : <IconStatusTodo />}
                        </span>

                        {/* Judul Tugas */}
                        <span className={`truncate text-text-primary ${issue.completed ? 'line-through text-text-muted' : ''} font-medium`}>
                          {issue.title}
                        </span>
                      </div>

                      {/* Detail Atribut Sisi Kanan */}
                      <div className="flex items-center gap-4 shrink-0 text-text-secondary text-[11px]">
                        {/* Prioritas Badge */}
                        <span className={`px-2 py-0.5 rounded-md text-[10px] border font-semibold ${
                          issue.priority === 'Urgent' ? 'bg-danger/10 border-danger/20 text-danger' :
                          issue.priority === 'High' ? 'bg-warning/10 border-warning/20 text-warning' :
                          issue.priority === 'Medium' ? 'bg-bg-element border-border-default text-text-primary' :
                          'bg-bg-canvas border-border-default text-text-muted'
                        }`}>
                          {issue.priority}
                        </span>

                        {/* Star Toggle */}
                        <button onClick={() => handleToggleStar(issue.id)} className="cursor-pointer">
                          <IconStar active={issue.starred} />
                        </button>

                        {/* Penanggung Jawab */}
                        <div className="flex items-center gap-1.5">
                          <div className="w-4 h-4 rounded-md bg-accent text-white flex items-center justify-center text-[7px] font-bold shadow-[0_1px_2px_rgba(94,106,210,0.1)]">
                            {issue.assignee[0]}
                          </div>
                          <span className="hidden sm:inline text-text-secondary text-[11px] font-semibold">{issue.assignee}</span>
                        </div>

                        {/* Tenggat Waktu */}
                        <span className="w-12 text-right text-text-muted font-medium">{issue.date}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ==========================================
              HALAMAN 2: PROYEK & SPLIT-VIEW
              ========================================== */}
          {activeTab === 'projects' && (
            <div className="flex-1 flex gap-6 max-w-6xl w-full mx-auto">
              
              {/* Bagian Kiri: Daftar Proyek Utama (70% - 75% Lebar) */}
              <div className="flex-[3] flex flex-col space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-[13px] font-bold text-text-primary uppercase tracking-wider">Proyek Berjalan</h2>
                  <button 
                    onClick={() => setIsNewProjectModalOpen(true)}
                    className="h-7.5 px-3 bg-bg-surface border border-border-default hover:bg-bg-canvas rounded-lg text-[12px] flex items-center gap-1.5 cursor-pointer transition-colors duration-75 keyboard-focus"
                  >
                    <IconPlus />
                    <span>Tambah Proyek</span>
                  </button>
                </div>

                {/* Card Container: Softer rounded-xl and gradient border tweak */}
                <div className="bg-bg-surface border border-border-default rounded-xl overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.015)] border-l-4 border-l-accent/40">
                  {/* Table Header */}
                  <div className="h-9 bg-[#fbfbfb] border-b border-border-default px-4 flex items-center text-[11px] font-bold text-text-muted uppercase tracking-wider select-none">
                    <span className="w-1/2">Nama Proyek</span>
                    <span className="w-1/6 text-center">Kesehatan</span>
                    <span className="w-1/6 text-center">Kategori</span>
                    <span className="w-1/6 text-right">Target Selesai</span>
                  </div>

                  {/* Rows */}
                  <div className="divide-y divide-border-default">
                    {projects.map((proj) => (
                      <div key={proj.id} className="h-10 px-4 flex items-center hover:bg-bg-canvas/40 transition-none text-[13px]">
                        {/* Nama Proyek */}
                        <div className="w-1/2 flex items-center gap-2.5 min-w-0">
                          <div className="w-5 h-5 rounded bg-bg-canvas flex items-center justify-center border border-border-default text-[11px] shrink-0">📦</div>
                          <span className="font-bold text-text-primary truncate">{proj.name}</span>
                          <span className="text-[10px] bg-bg-canvas text-text-secondary px-1.5 py-0.5 rounded font-mono border border-border-default shrink-0">{proj.id}</span>
                        </div>

                        {/* Status Kesehatan */}
                        <div className="w-1/6 flex justify-center">
                          <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold border ${
                            proj.health === 'Healthy' ? 'bg-emerald-50 border-emerald-150 text-emerald-600' :
                            proj.health === 'Attention Needed' ? 'bg-warning/10 border-warning/20 text-warning' :
                            'bg-bg-canvas border-border-default text-text-muted'
                          }`}>
                            {proj.health}
                          </span>
                        </div>

                        {/* Prioritas / Progress */}
                        <div className="w-1/6 flex flex-col justify-center items-center">
                          <span className="text-[11px] text-text-secondary font-semibold">{proj.priority}</span>
                          {/* Progress bar mini */}
                          <div className="w-16 h-1.5 bg-bg-canvas rounded-full mt-1 overflow-hidden border border-border-default">
                            <div className="h-full bg-accent" style={{ width: `${proj.progress}%` }}></div>
                          </div>
                        </div>

                        {/* Tanggat Waktu */}
                        <span className="w-1/6 text-right text-text-secondary font-mono text-[11px] tracking-normal select-all">{proj.date}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Bagian Kanan: Split-View Detail Kesehatan (25% - 30% Lebar - Design Tweak: Softer Rounded-xl) */}
              <div className="flex-1 w-[280px] md:w-[300px] bg-bg-surface border border-border-default rounded-xl p-5 flex flex-col space-y-4 shrink-0 shadow-[0_4px_20px_rgba(0,0,0,0.015)] h-fit">
                <div className="flex border-b border-border-default pb-2">
                  <button 
                    onClick={() => setActiveInsightTab('health')}
                    className={`flex-1 text-center py-1 text-[12px] font-bold transition-colors duration-75 cursor-pointer ${activeInsightTab === 'health' ? 'text-text-primary border-b-2 border-accent' : 'text-text-muted hover:text-text-secondary'}`}
                  >
                    Kesehatan Tim
                  </button>
                  <button 
                    onClick={() => setActiveInsightTab('leads')}
                    className={`flex-1 text-center py-1 text-[12px] font-bold transition-colors duration-75 cursor-pointer ${activeInsightTab === 'leads' ? 'text-text-primary border-b-2 border-accent' : 'text-text-muted hover:text-text-secondary'}`}
                  >
                    Pimpinan
                  </button>
                </div>

                {activeInsightTab === 'health' ? (
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-success"></span>
                      <span className="text-[12px] font-bold text-text-primary">Seluruh tim sehat</span>
                    </div>
                    <p className="text-[11px] text-text-secondary leading-relaxed font-medium">
                      Target kinerja berjalan lancar. Belum ada hambatan (blockers) baru yang dilaporkan dalam 24 jam terakhir. Sinkronisasi data real-time aktif.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-[11px]">
                        <span className="font-bold text-text-primary">Cahyadi Prasetyo</span>
                        <span className="text-text-secondary font-semibold">Lead Tech (6 Isu)</span>
                      </div>
                      <div className="flex items-center justify-between text-[11px]">
                        <span className="font-bold text-text-primary">Prasetyo A.</span>
                        <span className="text-text-secondary font-semibold">Lead Design (2 Isu)</span>
                      </div>
                    </div>
                  </div>
                )}

                <div className="pt-3 border-t border-border-default">
                  <h4 className="text-[11px] font-bold text-text-muted uppercase tracking-wider mb-2 select-none">Metrik Kunci Proyek</h4>
                  <div className="space-y-2 text-[12px] font-semibold">
                    <div className="flex justify-between">
                      <span className="text-text-secondary">Isu Terbuka:</span>
                      <span className="text-text-primary font-mono tabular-nums">
                        {issues.filter(i => !i.completed).length} Isu
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-text-secondary">Proyek Aktif:</span>
                      <span className="text-text-primary font-mono tabular-nums">{projects.length} Proyek</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-text-secondary">Divisi Terlibat:</span>
                      <span className="text-accent">3 Divisi</span>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          )}

          {/* ==========================================
              HALAMAN 3: TAMPILAN KUSTOM
              ========================================== */}
          {activeTab === 'views' && (
            <div className="flex-1 flex flex-col space-y-4 max-w-6xl w-full mx-auto">
              {/* Box Pembuat View Kustom (Frameless Component - Tweak: Rounded-xl) */}
              <div className="bg-bg-surface border border-border-default rounded-xl p-5 shadow-[0_4px_20px_rgba(0,0,0,0.015)] border-l-4 border-l-accent/40 space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded bg-bg-canvas border border-border-default flex items-center justify-center text-text-secondary text-sm shrink-0">⚡</div>
                  <div className="flex-1 min-w-0">
                    <input 
                      type="text" 
                      placeholder="Nama Tampilan Kustom Baru..." 
                      className="w-full text-[15px] font-bold text-text-primary border-none p-0 focus:ring-0 placeholder-text-muted outline-none"
                    />
                    <input 
                      type="text" 
                      placeholder="Tambahkan deskripsi singkat mengenai visualisasi ini (opsional)..." 
                      className="w-full text-[12px] text-text-secondary border-none p-0 mt-1.5 focus:ring-0 placeholder-text-muted outline-none"
                    />
                  </div>
                  
                  <div className="flex gap-1.5 shrink-0 select-none">
                    <span className="text-[11px] bg-bg-canvas hover:bg-bg-element text-text-secondary px-2.5 py-1 rounded border border-border-default cursor-pointer flex items-center gap-1 font-semibold transition-colors">
                      🔒 Simpan ke Personal
                    </span>
                    <button className="h-7 px-3 bg-text-primary hover:bg-text-primary/95 text-bg-surface rounded-md text-[11px] font-bold cursor-pointer transition-colors duration-75">
                      Buat View
                    </button>
                  </div>
                </div>
              </div>

              {/* Tampilan Sederhana daftar isu yang difilter di bawahnya */}
              <div className="bg-bg-surface border border-border-default rounded-xl overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.015)] border-l-4 border-l-accent/20">
                <div className="px-4 py-2 bg-[#fbfbfb] border-b border-border-default text-text-muted text-[11px] font-mono select-none uppercase tracking-wider">
                  Isi visualisasi preview berdasarkan semua isu aktif
                </div>
                <div className="divide-y divide-border-default">
                  {issues.slice(0, 3).map(i => (
                    <div key={i.id} className="h-9 px-4 flex items-center justify-between text-text-primary text-[12px] hover:bg-bg-canvas/20">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-[10px] text-text-muted w-12 shrink-0">{i.id}</span>
                        <span className="font-bold text-text-primary">{i.title}</span>
                      </div>
                      <span className="text-[10px] bg-bg-canvas border border-border-default text-text-secondary px-2.5 py-0.5 rounded font-bold">{i.status}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

        </div>
      </main>

      {/* ==========================================
          MODAL: PEMBUATAN PROYEK BARU (Design Tweak: Rounded-xl)
          ========================================== */}
      {isNewProjectModalOpen && (
        <div className="fixed inset-0 bg-text-primary/10 backdrop-blur-[1px] flex items-center justify-center z-50">
          <div className="w-[640px] bg-bg-surface border border-border-default rounded-xl shadow-[0_20px_50px_rgba(0,0,0,0.1)] flex flex-col max-h-[90vh] overflow-hidden">
            
            {/* Header Modal */}
            <div className="h-10 px-4 border-b border-border-default flex items-center justify-between text-text-muted text-[11px] select-none uppercase tracking-wider bg-[#fbfbfb]">
              <div className="flex items-center gap-1 font-bold">
                <span>CAH</span>
                <span>&gt;</span>
                <span className="text-text-primary font-bold">Buat Proyek Baru</span>
              </div>
              <button 
                onClick={() => setIsNewProjectModalOpen(false)}
                className="hover:text-text-primary text-sm font-semibold cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* Konten Form */}
            <form onSubmit={handleCreateProject} className="flex-1 p-6 space-y-4 overflow-y-auto">
              <div className="space-y-1">
                {/* Judul Proyek Tanpa Bingkai (Borderless) */}
                <input 
                  type="text" 
                  placeholder="Nama Proyek Baru" 
                  value={newProjName}
                  onChange={(e) => setNewProjName(e.target.value)}
                  className="w-full text-xl font-bold text-text-primary placeholder-text-muted border-none p-0 focus:ring-0 focus:outline-none"
                  autoFocus
                />
                
                {/* Ringkasan */}
                <input 
                  type="text" 
                  placeholder="Tambahkan ringkasan performa atau deskripsi singkat..." 
                  value={newProjSummary}
                  onChange={(e) => setNewProjSummary(e.target.value)}
                  className="w-full text-[13px] text-text-secondary placeholder-text-muted border-none p-0 focus:ring-0 focus:outline-none mt-2.5"
                />
              </div>

              {/* Barisan Opsi Filter Kapsul (Metadata Pills setinggi 24px) */}
              <div className="flex flex-wrap gap-1.5 pt-3 border-t border-border-default select-none">
                <div className="h-6 px-2.5 bg-bg-canvas hover:bg-bg-element rounded-full border border-border-default text-text-secondary text-[11px] flex items-center gap-1 cursor-pointer transition-colors">
                  <span className="font-semibold text-text-muted">⚙️ Status:</span>
                  <select 
                    value={newProjStatus} 
                    onChange={(e) => setNewProjStatus(e.target.value as 'Backlog' | 'Active')}
                    className="bg-transparent border-none p-0 text-[11px] focus:ring-0 cursor-pointer font-bold text-text-primary outline-none"
                  >
                    <option value="Backlog">Backlog</option>
                    <option value="Active">Aktif</option>
                  </select>
                </div>

                <div className="h-6 px-2.5 bg-bg-canvas hover:bg-bg-element rounded-full border border-border-default text-text-secondary text-[11px] flex items-center gap-1 cursor-pointer transition-colors">
                  <span className="font-semibold text-text-muted">📊 Prioritas:</span>
                  <select 
                    value={newProjPriority} 
                    onChange={(e) => setNewProjPriority(e.target.value as 'Low' | 'Medium' | 'High' | 'Urgent')}
                    className="bg-transparent border-none p-0 text-[11px] focus:ring-0 cursor-pointer font-bold text-text-primary outline-none"
                  >
                    <option value="Low">Rendah (Low)</option>
                    <option value="Medium">Sedang (Medium)</option>
                    <option value="High">Tinggi (High)</option>
                    <option value="Urgent">Urgent</option>
                  </select>
                </div>

                <div className="h-6 px-2.5 bg-bg-canvas hover:bg-bg-element rounded-full border border-border-default text-text-secondary text-[11px] flex items-center gap-1 cursor-pointer transition-colors">
                  <span className="font-semibold text-text-muted">👤 Pemimpin:</span>
                  <select 
                    value={newProjLead} 
                    onChange={(e) => setNewProjLead(e.target.value)}
                    className="bg-transparent border-none p-0 text-[11px] focus:ring-0 cursor-pointer font-bold text-text-primary outline-none"
                  >
                    <option value="Cahyadi P.">Cahyadi P.</option>
                    <option value="Prasetyo A.">Prasetyo A.</option>
                  </select>
                </div>

                <div className="h-6 px-2.5 bg-bg-surface hover:bg-bg-canvas rounded-full border border-border-default text-text-muted hover:text-text-secondary text-[11px] flex items-center gap-1 cursor-pointer transition-colors">
                  <span>+ Anggota</span>
                </div>
                <div className="h-6 px-2.5 bg-bg-surface hover:bg-bg-canvas rounded-full border border-border-default text-text-muted hover:text-text-secondary text-[11px] flex items-center gap-1 cursor-pointer transition-colors">
                  <span>📅 Tanggal Target</span>
                </div>
                <div className="h-6 px-2.5 bg-bg-surface hover:bg-bg-canvas rounded-full border border-border-default text-text-muted hover:text-text-secondary text-[11px] flex items-center gap-1 cursor-pointer transition-colors">
                  <span>🏷️ Label</span>
                </div>
              </div>

              {/* Deskripsi Tambahan */}
              <div className="pt-3">
                <textarea 
                  rows={4}
                  placeholder="Tuliskan deskripsi lengkap, rencana performa divisi, atau kumpulkan ide kinerja tim di sini..."
                  className="w-full text-[13px] text-text-primary placeholder-text-muted border-none p-0 focus:ring-0 focus:outline-none resize-none"
                ></textarea>
              </div>

              {/* Milestones Accordion */}
              <div className="border border-border-default rounded-[6px] p-3 flex justify-between items-center text-[12px] bg-bg-canvas/30 cursor-pointer hover:bg-bg-canvas/50">
                <span className="font-semibold text-text-secondary">Milestone / Sasaran Utama</span>
                <span className="text-text-muted font-bold">+</span>
              </div>
            </form>

            {/* Footer Modal Action */}
            <div className="h-12 border-t border-border-default px-4 flex items-center justify-end gap-2 bg-[#fbfbfb] select-none">
              <button 
                type="button"
                onClick={() => setIsNewProjectModalOpen(false)}
                className="h-8 px-3 hover:bg-bg-element text-text-secondary hover:text-text-primary text-[12px] font-semibold rounded-md cursor-pointer"
              >
                Batalkan
              </button>
              <button 
                onClick={handleCreateProject}
                className="h-8 px-4 bg-accent hover:bg-accent/95 text-white text-[12px] font-semibold rounded-md cursor-pointer transition-colors duration-75 shadow-sm"
              >
                Buat Proyek
              </button>
            </div>

          </div>
        </div>
      )}

      {/* ==========================================
          MODAL MENU KOMANDO (Cmd+K atau Ctrl+K - Tweak: Rounded-xl & shadow)
          ========================================== */}
      {isCommandMenuOpen && (
        <div className="fixed inset-0 bg-text-primary/10 backdrop-blur-[1px] flex items-center justify-center z-50">
          <div className="w-[560px] md:w-[640px] bg-bg-surface border border-border-default rounded-xl shadow-[0_20px_50px_rgba(0,0,0,0.1)] flex flex-col overflow-hidden">
            
            {/* Input Pencarian */}
            <div className="flex items-center px-4 h-11 border-b border-border-default bg-[#fbfbfb]">
              <IconSearch />
              <input 
                type="text" 
                placeholder="Ketik kata kunci untuk mencari isu atau menjalankan tindakan..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 bg-transparent border-none text-[13px] text-text-primary focus:outline-none focus:ring-0 placeholder-text-muted ml-2.5 outline-none"
                autoFocus
              />
              <span className="text-[10px] text-text-muted bg-bg-canvas px-1.5 py-0.5 rounded font-mono border border-border-default select-none">ESC</span>
            </div>

            {/* Hasil Pencarian */}
            <div className="max-h-[300px] overflow-y-auto py-1 divide-y divide-border-default/40">
              <div className="px-3 py-1.5 text-[10px] font-bold text-text-muted uppercase tracking-wider select-none bg-bg-canvas/30">Isu & Tugas Terkait</div>
              
              {commandResults.length > 0 ? (
                commandResults.map(res => (
                  <div 
                    key={res.id}
                    onClick={() => {
                      setActiveTab('issues');
                      setIsCommandMenuOpen(false);
                      showToast(`Navigasi ke ${res.id}`);
                    }}
                    className="px-4 py-2 hover:bg-bg-canvas cursor-pointer flex items-center justify-between text-[12px] group"
                  >
                    <div className="flex items-center gap-2 min-w-0">
                      <span className="font-mono text-text-muted text-[10px] w-12 shrink-0 select-all">{res.id}</span>
                      <span className="truncate text-text-secondary group-hover:text-text-primary font-medium">{res.title}</span>
                    </div>
                    <span className="text-[10px] bg-bg-canvas text-text-secondary px-2 py-0.5 rounded border border-border-default uppercase font-mono font-medium">{res.status}</span>
                  </div>
                ))
              ) : (
                <div className="px-4 py-6 text-center text-text-muted text-[12px] select-none">
                  Tidak ada isu atau tugas yang cocok dengan pencarian Anda.
                </div>
              )}

              <div className="px-3 py-1.5 text-[10px] font-bold text-text-muted uppercase tracking-wider pt-2 select-none bg-bg-canvas/30">Tindakan Navigasi</div>
              <div 
                onClick={() => { setActiveTab('projects'); setIsCommandMenuOpen(false); }}
                className="px-4 py-2 hover:bg-bg-canvas cursor-pointer flex items-center justify-between text-[12px] font-medium"
              >
                <span className="text-text-secondary hover:text-text-primary">Buka Dashboard Proyek Kinerja</span>
                <span className="text-[10px] text-text-muted font-mono bg-bg-canvas px-1 rounded border border-border-default uppercase font-medium">Navigasi</span>
              </div>
              <div 
                onClick={() => { setIsNewProjectModalOpen(true); setIsCommandMenuOpen(false); }}
                className="px-4 py-2 hover:bg-bg-canvas cursor-pointer flex items-center justify-between text-[12px] font-medium"
              >
                <span className="text-text-secondary hover:text-text-primary">Buat Proyek Kinerja Baru</span>
                <span className="text-[10px] text-text-muted font-mono bg-bg-canvas px-1 rounded border border-border-default uppercase font-medium">Tindakan</span>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Toast Message */}
      {toastMessage && (
        <div className="fixed bottom-4 right-4 bg-bg-surface text-text-primary text-xs px-3.5 py-2.5 rounded-lg shadow-[0_4px_12px_rgba(0,0,0,0.05),0_1px_2px_rgba(0,0,0,0.05)] border border-border-default flex items-center gap-2 z-50 select-none">
          <div className="w-1.5 h-1.5 rounded-full bg-success"></div>
          <span className="font-semibold">{toastMessage}</span>
        </div>
      )}
      
    </div>
  );
}
