"use client";

import React, { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';

// --- SVG CUSTOM ICONS (strictly strokeWidth 1.5, size 14px-18px) ---
export const IconSearch = () => (
  <svg className="w-4 h-4 text-[#6B7280]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
  </svg>
);

export const IconBell = () => (
  <svg className="w-4 h-4 text-[#6B7280]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
  </svg>
);

export const IconHelp = () => (
  <svg className="w-4 h-4 text-[#6B7280]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

export const IconGithub = () => (
  <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.483 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.579.688.481C19.137 20.162 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
  </svg>
);

export const IconPlus = () => (
  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
  </svg>
);

export const IconHome = () => (
  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
  </svg>
);

export const IconDrafts = () => (
  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
  </svg>
);

export const IconYourWork = () => (
  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 002-2h2a2 2 0 002-2m-6 9l2 2 4-4" />
  </svg>
);

export const IconStickies = () => (
  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
  </svg>
);

export const IconChevronDown = () => (
  <svg className="w-3.5 h-3.5 text-[#6B7280]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
  </svg>
);

export const IconMenu = () => (
  <svg className="w-5 h-5 text-[#111827]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
  </svg>
);

export const IconClose = () => (
  <svg className="w-5 h-5 text-[#111827]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
  </svg>
);

export const IconFolder = () => (
  <svg className="w-4 h-4 text-[#6B7280]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
  </svg>
);

export const IconTuning = ({ className = "w-4 h-4 text-[#6B7280]" }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75" />
  </svg>
);

export const IconLayout = ({ className = "w-4 h-4 text-[#6B7280]" }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2" />
  </svg>
);

export const IconNewDoc = ({ className = "w-4 h-4 text-[#111827]" }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m3.75 9v6m3-3H9m1.5-12H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
  </svg>
);

export const IconShieldProject = () => (
  <svg className="w-4 h-4 shrink-0 text-[#0369a1] fill-current" viewBox="0 0 24 24">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    <circle cx="12" cy="11" r="3" fill="#F59E0B" />
  </svg>
);

export const IconLink = () => (
  <svg className="w-8 h-8 text-[#9CA3AF] stroke-[1.25]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
  </svg>
);

export const IconLinkSmall = () => (
  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
  </svg>
);

export const IconSuccess = () => (
  <svg className="w-4 h-4 text-[#10B981]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

export const IconCircle = () => (
  <svg className="w-4 h-4 text-[#9CA3AF]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
    <circle cx="12" cy="12" r="9" />
  </svg>
);

export const IconChartProject = () => (
  <svg className="w-4 h-4 text-[#F59E0B]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
  </svg>
);

export const IconCalendar = () => (
  <svg className="w-4 h-4 text-[#6B7280]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
  </svg>
);

export const IconTrash = () => (
  <svg className="w-3.5 h-3.5 text-[#EF4444]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
  </svg>
);

export const IconList = ({ className = "w-4 h-4 text-[#6B7280]" }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01" />
  </svg>
);

export const IconTableLayout = ({ className = "w-4 h-4 text-[#6B7280]" }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18M3 14h18M10 3v18M14 3v18M3 6a3 3 0 013-3h12a3 3 0 013 3v12a3 3 0 01-3 3H6a3 3 0 01-3-3V6z" />
  </svg>
);

export const IconTimeline = ({ className = "w-4 h-4 text-[#6B7280]" }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 6h8m4 0h6M3 12h4m4 0h10M3 18h6m4 0h8" />
    <circle cx="12" cy="6" r="1" fill="currentColor" />
    <circle cx="8" cy="12" r="1" fill="currentColor" />
    <circle cx="10" cy="18" r="1" fill="currentColor" />
  </svg>
);

// --- Sidebar Context (shared with child pages via SidebarToggleButton) ---
interface SidebarContextType {
  isSidebarCollapsed: boolean;
  toggleSidebar: () => void;
}

const SidebarContext = React.createContext<SidebarContextType>({
  isSidebarCollapsed: false,
  toggleSidebar: () => {},
});

/**
 * Renders a sidebar expand toggle button that only appears when the sidebar is collapsed.
 * Must be used inside DashboardShell's children tree (inside the context provider).
 */
export function SidebarToggleButton() {
  const { isSidebarCollapsed, toggleSidebar } = React.useContext(SidebarContext);
  if (!isSidebarCollapsed) return null;
  return (
    <button 
      onClick={toggleSidebar}
      className="hidden md:flex p-1 hover:bg-[#F3F4F6] rounded transition-colors cursor-pointer keyboard-focus"
      title="Expand sidebar"
    >
      <IconLayout className="w-4 h-4 text-[#6B7280]" />
    </button>
  );
}

interface Project {
  id: string;
  name: string;
  type: string;
}

const renderProjectIcon = (type: string) => {
  if (type === 'shield') return <IconShieldProject />;
  if (type === 'chart') return <IconChartProject />;
  if (type === 'calendar') return <IconCalendar />;
  return <span className="text-sm shrink-0 flex items-center justify-center w-4 h-4 select-none">{type}</span>;
};

interface DashboardShellProps {
  children: React.ReactNode;
  onOpenNewItemModal?: () => void;
  toastMessage?: string | null;
  setToastMessage?: (msg: string | null) => void;
}

export default function DashboardShell({
  children,
  onOpenNewItemModal,
  toastMessage: externalToast,
  setToastMessage: setExternalToast
}: DashboardShellProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState<{ email: string; name: string } | null>(null);

  // --- UI STATES ---
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [localToast, setLocalToast] = useState<string | null>(null);

  // --- INTERACTIVE FEATURES STATES ---
  const [collapsedFolders, setCollapsedFolders] = useState<Record<string, boolean>>({});
  const [projects, setProjects] = useState<Project[]>([]);
  const [isNewProjectModalOpen, setIsNewProjectModalOpen] = useState(false);
  const [newProjectName, setNewProjectName] = useState('');
  const [newProjectType, setNewProjectType] = useState<string>('💼');
  
  const [isProjectPlusDropdownOpen, setIsProjectPlusDropdownOpen] = useState(false);
  const [isMoreDropdownOpen, setIsMoreDropdownOpen] = useState(false);
  
  const [isWorkspaceDropdownOpen, setIsWorkspaceDropdownOpen] = useState(false);
  const [workspaces, setWorkspaces] = useState<string[]>(['SIMANTAP Workspace']);
  const [activeWorkspace, setActiveWorkspace] = useState('SIMANTAP Workspace');
  const [isNewWorkspaceModalOpen, setIsNewWorkspaceModalOpen] = useState(false);
  const [newWorkspaceName, setNewWorkspaceName] = useState('');

  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [activeProjectId, setActiveProjectId] = useState<string>('magangumra');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const proj = params.get('project') || 'magangumra';
      setActiveProjectId(proj);
    }
  }, [typeof window !== 'undefined' ? window.location.search : '']);

  const [commandSearch, setCommandSearch] = useState('');
  const [globalItems, setGlobalItems] = useState<any[]>([]);

  // Sync state with localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const collapsed = localStorage.getItem('sidebar-collapsed') === 'true';
      setIsSidebarCollapsed(collapsed);

      // Load Projects
      const storedProjects = localStorage.getItem('projects');
      if (storedProjects) {
        setProjects(JSON.parse(storedProjects));
      } else {
        const defaultProjects: Project[] = [
          { id: 'magangumra', name: 'MAGANG UMRAH 2026', type: 'shield' }
        ];
        localStorage.setItem('projects', JSON.stringify(defaultProjects));
        setProjects(defaultProjects);
      }

      // Load Workspaces
      const storedWorkspaces = localStorage.getItem('workspaces');
      const activeWS = localStorage.getItem('active-workspace');
      if (storedWorkspaces) {
        setWorkspaces(JSON.parse(storedWorkspaces));
      } else {
        localStorage.setItem('workspaces', JSON.stringify(['SIMANTAP Workspace']));
      }
      if (activeWS) {
        setActiveWorkspace(activeWS);
      }
    }
  }, []);

  // Sync workspaces to localStorage
  const saveWorkspaces = (newWS: string[]) => {
    setWorkspaces(newWS);
    localStorage.setItem('workspaces', JSON.stringify(newWS));
  };

  const handleSwitchWorkspace = (ws: string) => {
    setActiveWorkspace(ws);
    localStorage.setItem('active-workspace', ws);
    setIsWorkspaceDropdownOpen(false);
    showToast(`Switched to workspace: ${ws}`);
  };

  const handleCreateWorkspace = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newWorkspaceName.trim()) return;
    const wsName = newWorkspaceName.trim();
    if (workspaces.includes(wsName)) {
      showToast('Workspace already exists.');
      return;
    }
    const updated = [...workspaces, wsName];
    saveWorkspaces(updated);
    setActiveWorkspace(wsName);
    localStorage.setItem('active-workspace', wsName);
    setIsNewWorkspaceModalOpen(false);
    setNewWorkspaceName('');
    showToast(`Workspace "${wsName}" created successfully.`);
  };

  // Sync projects to localStorage
  const saveProjects = (newProjects: Project[]) => {
    setProjects(newProjects);
    localStorage.setItem('projects', JSON.stringify(newProjects));
  };

  const handleCreateProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProjectName.trim()) return;
    const name = newProjectName.trim();
    const newProjId = name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const newProj: Project = {
      id: newProjId,
      name: name,
      type: newProjectType
    };
    const updated = [...projects, newProj];
    saveProjects(updated);
    setIsNewProjectModalOpen(false);
    setNewProjectName('');
    showToast(`Project "${name}" created successfully.`);
    router.push(`/projects?project=${newProjId}`);
  };

  // Load items for command palette
  useEffect(() => {
    if (typeof window !== 'undefined' && isCommandPaletteOpen) {
      const storageKey = activeProjectId === 'magangumra' ? 'recents' : `recents_${activeProjectId}`;
      const stored = localStorage.getItem(storageKey);
      if (stored) {
        setGlobalItems(JSON.parse(stored));
      } else {
        setGlobalItems([]);
      }
    }
  }, [isCommandPaletteOpen, activeProjectId]);

  // Listen to Cmd+K / Ctrl+K globally
  useEffect(() => {
    const handleGlobalK = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsCommandPaletteOpen(prev => !prev);
      }
      if (e.key === 'Escape') {
        setIsCommandPaletteOpen(false);
        setIsNewProjectModalOpen(false);
        setIsNewWorkspaceModalOpen(false);
        setIsProjectPlusDropdownOpen(false);
        setIsMoreDropdownOpen(false);
        setIsWorkspaceDropdownOpen(false);
      }
    };
    window.addEventListener('keydown', handleGlobalK);
    return () => window.removeEventListener('keydown', handleGlobalK);
  }, []);

  const toggleSidebar = () => {
    setIsSidebarCollapsed(prev => {
      const next = !prev;
      localStorage.setItem('sidebar-collapsed', String(next));
      return next;
    });
  };

  const showToast = (message: string) => {
    if (setExternalToast) {
      setExternalToast(message);
      setTimeout(() => setExternalToast(null), 2500);
    } else {
      setLocalToast(message);
      setTimeout(() => setLocalToast(null), 2500);
    }
  };

  // Auth check
  useEffect(() => {
    const rawUser = localStorage.getItem('user');
    if (!rawUser) {
      router.push('/login');
    } else {
      setIsAuthenticated(true);
      setCurrentUser(JSON.parse(rawUser));
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    showToast('Logging out of GEMPAR...');
    setTimeout(() => {
      router.push('/login');
    }, 600);
  };

  if (!isAuthenticated || !currentUser) {
    return (
      <div className="w-full h-screen bg-white flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <div className="animate-pulse flex space-x-2">
            <div className="w-2.5 h-2.5 bg-[#9CA3AF] rounded-full"></div>
            <div className="w-2.5 h-2.5 bg-[#9CA3AF] rounded-full animate-bounce"></div>
            <div className="w-2.5 h-2.5 bg-[#9CA3AF] rounded-full"></div>
          </div>
        </div>
      </div>
    );
  }

  const userDisplayName = currentUser.name || 'Cahyadi Prasetyo';
  const userInitials = userDisplayName.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  const activeToast = externalToast || localToast;

  return (
    <SidebarContext.Provider value={{ isSidebarCollapsed, toggleSidebar }}>
    <div className="flex flex-col w-full h-screen bg-white text-[#111827] overflow-hidden select-none font-sans">
      
      {/* ==========================================
          TOP NAVIGATION BAR
          ========================================== */}
      <header className="h-[48px] border-b border-[#E5E7EB] bg-white flex items-center justify-between px-4 shrink-0 z-20">
        
        {/* Left Section: Brand Logo / Name */}
        <div className="flex items-center gap-3">
          {/* Hamburger Menu on Mobile */}
          <button 
            onClick={() => setIsMobileMenuOpen(prev => !prev)}
            className="p-1 hover:bg-[#F3F4F6] rounded-md md:hidden transition-colors cursor-pointer keyboard-focus"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <IconClose /> : <IconMenu />}
          </button>
          
          <div className="relative">
            <button
              onClick={() => setIsWorkspaceDropdownOpen(prev => !prev)}
              className="flex items-center gap-1.5 select-none cursor-pointer text-left focus:outline-none p-1 hover:bg-[#F3F4F6] rounded"
            >
              <div className="w-5 h-5 rounded-md bg-[#0369A1] flex items-center justify-center font-bold text-white text-[11px] shrink-0">
                {activeWorkspace[0]}
              </div>
              <span className="font-bold text-[14px] text-[#111827]">
                {activeWorkspace}
              </span>
              <IconChevronDown />
            </button>

            {isWorkspaceDropdownOpen && (
              <div className="absolute left-0 mt-1 w-52 bg-white border border-[#E5E7EB] rounded-[6px] py-1 z-30 premium-popover">
                <div className="px-3 py-1.5 text-[10px] font-bold text-[#9CA3AF] uppercase tracking-wider">Workspaces</div>
                {workspaces.map(ws => (
                  <button
                    key={ws}
                    onClick={() => handleSwitchWorkspace(ws)}
                    className="w-full text-left px-3 py-1.5 hover:bg-[#F9FAFB] text-xs text-[#111827] flex items-center justify-between"
                  >
                    <span>{ws}</span>
                    {ws === activeWorkspace && <IconSuccess />}
                  </button>
                ))}
                <button
                  onClick={() => {
                    setIsWorkspaceDropdownOpen(false);
                    setIsNewWorkspaceModalOpen(true);
                  }}
                  className="w-full text-left px-3 py-1.5 hover:bg-[#F9FAFB] text-xs text-[#0369A1] font-semibold border-t border-[#E5E7EB] flex items-center gap-1.5"
                >
                  <IconPlus />
                  <span>Create new workspace</span>
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Center Section: Search Input Placeholder */}
        <div 
          onClick={() => setIsCommandPaletteOpen(true)}
          className="hidden sm:flex flex-1 max-w-[460px] mx-4 relative cursor-pointer"
        >
          <div className="w-full h-8 px-3 rounded-[6px] border border-[#E5E7EB] bg-[#F9FAFB] text-left text-xs text-[#6B7280] flex items-center justify-between hover:bg-[#F3F4F6]/50 transition-colors">
            <div className="flex items-center gap-2">
              <IconSearch />
              <span>Search commands...</span>
            </div>
            <span className="kbd-key">⌘K</span>
          </div>
        </div>

        {/* Right Section: Actions & Avatar */}
        <div className="flex items-center gap-2">
          {/* GitHub Star */}
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:flex items-center gap-1.5 h-8 px-3 rounded-[6px] border border-[#E5E7EB] hover:bg-[#F3F4F6] text-xs font-medium text-[#6B7280] hover:text-[#111827] transition-colors keyboard-focus"
          >
            <IconGithub />
            <span>Star us on GitHub</span>
          </a>

          {/* Help */}
          <button 
            onClick={() => showToast('Help documentation is coming soon!')}
            className="p-1.5 rounded-[6px] border border-transparent hover:bg-[#F9FAFB] text-[#6B7280] hover:text-[#111827] cursor-pointer transition-colors keyboard-focus"
            title="Help"
          >
            <IconHelp />
          </button>

          {/* Notification */}
          <button 
            onClick={() => showToast('You have no new notifications.')}
            className="p-1.5 rounded-[6px] border border-transparent hover:bg-[#F9FAFB] text-[#6B7280] hover:text-[#111827] cursor-pointer transition-colors keyboard-focus relative"
            title="Notifications"
          >
            <IconBell />
            <span className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-[#10B981]"></span>
          </button>

          {/* Avatar Dropdown */}
          <div className="relative">
            <button 
              onClick={() => setIsUserMenuOpen(prev => !prev)}
              className="w-7 h-7 rounded-full bg-[#0369A1] hover:bg-[#0284C7] text-white flex items-center justify-center font-bold text-xs cursor-pointer keyboard-focus shadow-none border-none animate-none"
              aria-expanded={isUserMenuOpen}
            >
              {userInitials}
            </button>
            
            {isUserMenuOpen && (
              <div className="absolute right-0 mt-1 w-48 bg-white border border-[#E5E7EB] rounded-[6px] py-1 z-30 premium-popover">
                <div className="px-3 py-2 border-b border-[#E5E7EB]">
                  <p className="text-xs font-semibold text-[#111827] truncate">{userDisplayName}</p>
                  <p className="text-[10px] text-[#6B7280] truncate">{currentUser.email || 'cahyadi@work.com'}</p>
                </div>
                <Link
                  href="/profile"
                  onClick={() => setIsUserMenuOpen(false)}
                  className="block w-full text-left px-3 py-1.5 hover:bg-[#F9FAFB] text-xs text-[#111827] cursor-pointer transition-colors"
                >
                  My Profile & Analytics
                </Link>
                <button
                  onClick={() => { setIsUserMenuOpen(false); showToast('Settings opened.'); }}
                  className="w-full text-left px-3 py-1.5 hover:bg-[#F9FAFB] text-xs text-[#111827] cursor-pointer transition-colors"
                >
                  Settings
                </button>
                <button 
                  onClick={handleLogout}
                  className="w-full text-left px-3 py-1.5 hover:bg-[#EF4444]/5 text-xs text-[#EF4444] font-semibold cursor-pointer transition-colors border-t border-[#E5E7EB]"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>

      </header>

      {/* Main Workspace Frame */}
      <div className="flex-1 flex overflow-hidden relative">
        
        {/* Sidebar Overlay for Mobile */}
        {isMobileMenuOpen && (
          <div 
            onClick={() => setIsMobileMenuOpen(false)}
            className="fixed inset-0 bg-black/20 z-20 md:hidden"
          />
        )}

        {/* LEFT SIDEBAR */}
        <aside className={`
          fixed inset-y-0 left-0 z-30 transition-all duration-200 ease-in-out
          flex flex-col justify-between bg-white border-r border-[#E5E7EB] text-[13px] shrink-0 h-full
          ${isMobileMenuOpen ? 'translate-x-0 w-[240px]' : '-translate-x-full md:translate-x-0'}
          ${isSidebarCollapsed ? 'md:w-0 md:overflow-hidden md:border-r-0' : 'md:relative md:w-[240px] md:inset-y-auto md:h-full md:z-10'}
        `}>

          <div className="flex-1 bg-white p-3 flex flex-col justify-between overflow-y-auto">
            <div className="space-y-4">
              
              {/* Header inside card */}
              <div className="flex items-center justify-between pb-1 select-none">
                <span className="font-bold text-[14px] text-[#111827]">Projects</span>
                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => showToast('Filters opened.')}
                    className="p-1 hover:bg-[#F3F4F6] rounded transition-colors cursor-pointer"
                    title="Filters"
                  >
                    <IconTuning />
                  </button>
                  <button 
                    onClick={toggleSidebar}
                    className="p-1 hover:bg-[#F3F4F6] rounded transition-colors cursor-pointer"
                    title="Collapse sidebar"
                  >
                    <IconLayout />
                  </button>
                </div>
              </div>

              {/* New work item Button */}
              <div className="flex items-center justify-between gap-1.5">
                <button 
                  onClick={() => {
                    if (onOpenNewItemModal) {
                      onOpenNewItemModal();
                    } else {
                      showToast('Create modal opened.');
                    }
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full h-8 px-3 rounded-[6px] border border-[#E5E7EB] hover:bg-[#F3F4F6] text-xs font-semibold text-[#111827] flex items-center justify-center gap-1.5 cursor-pointer transition-colors keyboard-focus bg-white"
                >
                  <IconNewDoc />
                  <span>New work item</span>
                </button>
              </div>

              {/* Links list */}
              <nav className="space-y-1">
                <Link 
                  href="/"
                  className={`w-full flex items-center gap-2.5 px-2.5 py-1.5 rounded-[6px] text-xs text-left cursor-pointer transition-colors ${pathname === '/' ? 'bg-[#F3F4F6] text-[#111827] font-semibold' : 'text-[#6B7280] hover:text-[#111827] hover:bg-[#F3F4F6]/50'}`}
                  title="Home"
                >
                  <span className={pathname === '/' ? 'text-[#0369A1]' : ''}><IconHome /></span>
                  <span>Home</span>
                </Link>

                <Link 
                  href="/profile"
                  className={`w-full flex items-center gap-2.5 px-2.5 py-1.5 rounded-[6px] text-xs text-left cursor-pointer transition-colors ${pathname === '/profile' ? 'bg-[#F3F4F6] text-[#111827] font-semibold' : 'text-[#6B7280] hover:text-[#111827] hover:bg-[#F3F4F6]/50'}`}
                  title="Your work"
                >
                  <span className={pathname === '/profile' ? 'text-[#0369A1]' : ''}><IconYourWork /></span>
                  <span>Your work</span>
                </Link>
              </nav>

              {/* Workspace Category Section */}
              <div className="space-y-1.5 pt-2">
                <div className="px-2.5 py-0.5 text-[10px] font-bold text-[#9CA3AF] uppercase tracking-wider select-none">
                  Workspace
                </div>
                <Link 
                  href="/projects"
                  className={`w-full flex items-center gap-2.5 px-2.5 py-1.5 rounded-[6px] text-xs text-left cursor-pointer transition-colors ${pathname === '/projects' ? 'bg-[#F3F4F6] text-[#111827] font-semibold' : 'text-[#6B7280] hover:text-[#111827] hover:bg-[#F3F4F6]/50'}`}
                >
                  <IconFolder />
                  <span>Projects</span>
                </Link>
                <div className="relative">
                  <button 
                    onClick={() => setIsMoreDropdownOpen(prev => !prev)}
                    className="w-full flex items-center gap-2.5 px-2.5 py-1.5 rounded-[6px] text-xs text-[#6B7280] hover:text-[#111827] hover:bg-[#F3F4F6]/50 text-left cursor-pointer transition-colors"
                  >
                    <span className="font-bold tracking-widest text-[11px] leading-[4px]">···</span>
                    <span>More</span>
                  </button>
                  
                  {isMoreDropdownOpen && (
                    <div className="absolute left-2 bottom-8 w-44 bg-white border border-[#E5E7EB] rounded-[6px] py-1 z-30 premium-popover">
                      <button
                        onClick={() => {
                          setIsMoreDropdownOpen(false);
                          router.push('/profile');
                        }}
                        className="w-full text-left px-3 py-1.5 hover:bg-[#F9FAFB] text-xs text-[#111827]"
                      >
                        Profile Analytics
                      </button>
                      <button
                        onClick={() => {
                          setIsMoreDropdownOpen(false);
                          showToast('System Settings are coming soon!');
                        }}
                        className="w-full text-left px-3 py-1.5 hover:bg-[#F9FAFB] text-xs text-[#111827]"
                      >
                        System Settings
                      </button>
                      <button
                        onClick={() => {
                          setIsMoreDropdownOpen(false);
                          if (confirm('Apakah Anda yakin ingin menyetel ulang data platform?')) {
                            localStorage.clear();
                            showToast('Platform data reset successfully. Reloading...');
                            setTimeout(() => window.location.reload(), 1000);
                          }
                        }}
                        className="w-full text-left px-3 py-1.5 hover:bg-[#EF4444]/5 text-xs text-[#EF4444] font-semibold border-t border-[#E5E7EB]"
                      >
                        Reset Platform Data
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Projects Category Section */}
              <div className="space-y-1.5 pt-2">
                <div className="flex items-center justify-between px-2.5 py-0.5 text-[10px] font-bold text-[#9CA3AF] uppercase tracking-wider select-none relative">
                  <span>Projects</span>
                  <div className="flex items-center gap-1.5">
                    <button 
                      onClick={() => setIsProjectPlusDropdownOpen(prev => !prev)} 
                      className="hover:text-[#111827] cursor-pointer p-0.5 rounded hover:bg-[#F3F4F6]"
                      title="Create project options"
                    >
                      <svg className="w-3 h-3 text-[#9CA3AF] hover:text-[#6B7280]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                      </svg>
                    </button>
                    <button
                      onClick={() => setIsProjectPlusDropdownOpen(prev => !prev)}
                      className="hover:text-[#111827] cursor-pointer"
                    >
                      <svg className="w-2.5 h-2.5 text-[#9CA3AF]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                  </div>

                  {isProjectPlusDropdownOpen && (
                    <div className="absolute right-2 top-6 w-40 bg-white border border-[#E5E7EB] rounded-[6px] py-1 z-30 premium-popover">
                      <button
                        onClick={() => {
                          setIsProjectPlusDropdownOpen(false);
                          setIsNewProjectModalOpen(true);
                        }}
                        className="w-full text-left px-3 py-1.5 hover:bg-[#F9FAFB] text-xs text-[#111827] flex items-center gap-1.5"
                      >
                        <IconPlus />
                        <span>New Project</span>
                      </button>
                      <button
                        onClick={() => {
                          setIsProjectPlusDropdownOpen(false);
                          showToast('New Folder creation is coming soon!');
                        }}
                        className="w-full text-left px-3 py-1.5 hover:bg-[#F9FAFB] text-xs text-[#111827] flex items-center gap-1.5"
                      >
                        <IconFolder />
                        <span>New Folder</span>
                      </button>
                    </div>
                  )}
                </div>

                {/* Dynamic Projects folders list */}
                <div className="space-y-1">
                  {projects.map((proj) => {
                    const isCollapsed = collapsedFolders[proj.id];
                    const toggleFolder = (e: React.MouseEvent) => {
                      e.preventDefault();
                      e.stopPropagation();
                      setCollapsedFolders(prev => ({
                        ...prev,
                        [proj.id]: !prev[proj.id]
                      }));
                    };

                    return (
                      <div key={proj.id} className="space-y-0.5">
                        <div 
                          onClick={toggleFolder}
                          className={`w-full flex items-center gap-2 px-2.5 py-1.5 rounded-[6px] text-xs text-left cursor-pointer transition-colors ${pathname.startsWith(`/projects`) && activeProjectId === proj.id ? 'bg-[#F3F4F6]/40 text-[#111827] font-semibold' : 'text-[#6B7280] hover:text-[#111827] hover:bg-[#F3F4F6]/50'}`}
                        >
                          {renderProjectIcon(proj.type)}
                          <span className="truncate flex-1">{proj.name}</span>
                          <button 
                            onClick={toggleFolder}
                            className="p-0.5 hover:bg-[#F3F4F6] rounded transition-colors"
                          >
                            <svg 
                              className={`w-3 h-3 text-[#6B7280] transform transition-transform duration-150 ${isCollapsed ? '-rotate-90' : ''}`} 
                              fill="none" 
                              viewBox="0 0 24 24" 
                              stroke="currentColor" 
                              strokeWidth="2"
                            >
                              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                            </svg>
                          </button>
                        </div>

                        {/* Indented Sub-items */}
                        {!isCollapsed && (
                          <div className="pl-6 space-y-0.5">
                            <Link 
                              href={`/projects?project=${proj.id}`}
                              className={`w-full flex items-center gap-2 px-2.5 py-1 rounded-[6px] text-[11px] text-left cursor-pointer transition-colors ${pathname === '/projects' && activeProjectId === proj.id ? 'bg-[#F3F4F6] text-[#111827] font-semibold' : 'text-[#6B7280] hover:text-[#111827] hover:bg-[#F3F4F6]/50'}`}
                            >
                              <IconDrafts />
                              <span>Work items</span>
                            </Link>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

            </div>
          </div>
        </aside>

        {/* MAIN WORKSPACE WRAPPER */}
        <div className="flex-1 flex flex-col overflow-hidden">
          <main className="flex-1 overflow-y-auto bg-white flex flex-col items-stretch relative">
            {children}
          </main>
        </div>

      </div>

      {/* Toast Notification */}
      {activeToast && (
        <div className="fixed bottom-4 right-4 bg-white text-[#111827] text-xs px-3.5 py-2.5 rounded-[6px] border border-[#E5E7EB] flex items-center gap-2 z-50 select-none premium-popover">
          <div className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-pulse"></div>
          <span className="font-semibold">{activeToast}</span>
        </div>
      )}
      
      {/* ==========================================
          MODAL: COMMAND PALETTE SEARCH (Ctrl+K)
          ========================================== */}
      {isCommandPaletteOpen && (
        <div className="fixed inset-0 bg-black/10 backdrop-blur-[1px] flex items-start justify-center z-50 p-4 pt-[10vh]">
          <div className="w-full max-w-[560px] bg-white border border-[#E5E7EB] rounded-[8px] flex flex-col premium-popover max-h-[420px] overflow-hidden">
            {/* Search Input */}
            <div className="flex items-center px-3 border-b border-[#E5E7EB]">
              <IconSearch />
              <input
                type="text"
                placeholder="Search work items, projects, or commands..."
                value={commandSearch}
                onChange={(e) => setCommandSearch(e.target.value)}
                className="w-full h-11 px-3 text-xs bg-white text-[#111827] focus:outline-none placeholder-[#9CA3AF] font-medium"
                autoFocus
              />
              <span className="text-[10px] text-[#9CA3AF] font-mono border border-[#E5E7EB] rounded px-1.5 py-0.5 bg-[#F9FAFB]">ESC</span>
            </div>

            {/* Results list */}
            <div className="flex-1 overflow-y-auto py-1">
              {/* Section 1: Actions */}
              <div className="px-3 py-1.5 text-[9px] font-bold text-[#9CA3AF] uppercase tracking-wider select-none">Quick Actions</div>
              <button
                onClick={() => {
                  setIsCommandPaletteOpen(false);
                  if (onOpenNewItemModal) {
                    onOpenNewItemModal();
                  } else {
                    showToast("Opening work item modal...");
                  }
                }}
                className="w-full px-3 py-2 hover:bg-[#F9FAFB] text-xs text-[#111827] flex items-center gap-2 text-left font-medium"
              >
                <IconNewDoc className="w-3.5 h-3.5 text-[#6B7280]" />
                <span>Create New Work Item</span>
              </button>
              <button
                onClick={() => {
                  setIsCommandPaletteOpen(false);
                  setIsNewProjectModalOpen(true);
                }}
                className="w-full px-3 py-2 hover:bg-[#F9FAFB] text-xs text-[#111827] flex items-center gap-2 text-left font-medium"
              >
                <IconPlus />
                <span>Create New Project</span>
              </button>

              {/* Section 2: Work Items Matching Search */}
              <div className="px-3 py-1.5 text-[9px] font-bold text-[#9CA3AF] uppercase tracking-wider select-none mt-2">Work Items</div>
              {globalItems
                .filter(item => 
                  item.title.toLowerCase().includes(commandSearch.toLowerCase()) || 
                  item.id.toLowerCase().includes(commandSearch.toLowerCase())
                )
                .slice(0, 5)
                .map(item => (
                  <div
                    key={item.id}
                    onClick={() => {
                      setIsCommandPaletteOpen(false);
                      router.push('/projects');
                      showToast(`Navigated to work item ${item.id}`);
                    }}
                    className="w-full px-3 py-2 hover:bg-[#F9FAFB] text-xs text-[#111827] flex items-center justify-between text-left cursor-pointer border-b border-[#F3F4F6]/50 last:border-0"
                  >
                    <div className="flex items-center gap-2.5 truncate">
                      {item.completed ? <IconSuccess /> : <IconCircle />}
                      <span className="font-mono text-[10px] text-[#6B7280]">{item.id}</span>
                      <span className="truncate font-medium">{item.title}</span>
                    </div>
                    <span className="text-[10px] text-[#9CA3AF] px-1.5 py-0.5 rounded bg-[#F3F4F6]/50 uppercase font-bold">{item.status}</span>
                  </div>
                ))}
              {globalItems.filter(item => 
                item.title.toLowerCase().includes(commandSearch.toLowerCase()) || 
                item.id.toLowerCase().includes(commandSearch.toLowerCase())
              ).length === 0 && (
                <div className="px-3 py-4 text-center text-xs text-[#9CA3AF]">No results found for "{commandSearch}"</div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ==========================================
          MODAL: CREATE NEW PROJECT
          ========================================== */}
      {isNewProjectModalOpen && (
        <div className="fixed inset-0 bg-black/10 backdrop-blur-[1px] flex items-center justify-center z-50 p-4">
          <div className="w-full max-w-[440px] bg-white border border-[#E5E7EB] rounded-[6px] flex flex-col premium-popover">
            <div className="h-10 px-4 border-b border-[#E5E7EB] flex items-center justify-between bg-[#F9FAFB] text-xs font-semibold text-[#6B7280] select-none">
              <span>Create Project</span>
              <button 
                onClick={() => setIsNewProjectModalOpen(false)}
                className="hover:text-[#111827] text-sm cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateProject} className="p-4 space-y-4">
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-[#6B7280] uppercase tracking-wider">Project Name</label>
                <input 
                  type="text" 
                  placeholder="e.g. MAGANG UMRAH 2026"
                  value={newProjectName}
                  onChange={(e) => setNewProjectName(e.target.value)}
                  className="w-full h-8 px-2.5 bg-[#F9FAFB] border border-[#E5E7EB] rounded-[6px] text-xs focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#0369A1] transition-all font-medium text-[#111827]"
                  required
                  autoFocus
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-bold text-[#6B7280] uppercase tracking-wider">Project Icon / Emoji</label>
                <div className="grid grid-cols-6 gap-1.5 p-2 bg-[#F9FAFB] border border-[#E5E7EB] rounded-[6px]">
                  {[
                    { value: '💼', label: '💼 Work' },
                    { value: '🚀', label: '🚀 Launch' },
                    { value: '📊', label: '📊 Chart' },
                    { value: '📅', label: '📅 Calendar' },
                    { value: '🛡️', label: '🛡️ Shield' },
                    { value: '🎨', label: '🎨 Design' },
                    { value: '💻', label: '💻 Tech' },
                    { value: '🎯', label: '🎯 Target' },
                    { value: '🔥', label: '🔥 Urgent' },
                    { value: '⭐', label: '⭐ Star' },
                    { value: '💡', label: '💡 Idea' },
                    { value: '⚙️', label: '⚙️ Setting' }
                  ].map(emojiOption => (
                    <button
                      key={emojiOption.value}
                      type="button"
                      onClick={() => setNewProjectType(emojiOption.value)}
                      className={`h-9 w-9 rounded-md text-lg flex items-center justify-center hover:bg-white hover:shadow-sm border transition-all ${newProjectType === emojiOption.value ? 'bg-white border-[#0369A1] shadow-sm font-bold animate-none' : 'border-transparent bg-transparent'}`}
                      title={emojiOption.label}
                    >
                      {emojiOption.value}
                    </button>
                  ))}
                </div>
                <div className="flex items-center gap-2 pt-1">
                  <span className="text-[11px] text-[#6B7280]">Or type custom emoji:</span>
                  <input
                    type="text"
                    maxLength={4}
                    value={newProjectType}
                    onChange={(e) => setNewProjectType(e.target.value)}
                    className="w-12 h-7 text-center bg-[#F9FAFB] border border-[#E5E7EB] rounded-[6px] text-xs focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#0369A1] transition-all font-semibold text-[#111827]"
                  />
                </div>
              </div>

              <div className="pt-2 flex items-center justify-end gap-2 text-xs select-none">
                <button 
                  type="button"
                  onClick={() => setIsNewProjectModalOpen(false)}
                  className="h-8 px-4 border border-[#E5E7EB] hover:bg-[#F9FAFB] text-[#6B7280] hover:text-[#111827] rounded-[6px] cursor-pointer transition-colors font-semibold"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="h-8 px-4 bg-[#0369A1] hover:bg-[#0284C7] text-white rounded-[6px] cursor-pointer transition-colors font-semibold"
                >
                  Create
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ==========================================
          MODAL: CREATE NEW WORKSPACE
          ========================================== */}
      {isNewWorkspaceModalOpen && (
        <div className="fixed inset-0 bg-black/10 backdrop-blur-[1px] flex items-center justify-center z-50 p-4">
          <div className="w-full max-w-[440px] bg-white border border-[#E5E7EB] rounded-[6px] flex flex-col premium-popover">
            <div className="h-10 px-4 border-b border-[#E5E7EB] flex items-center justify-between bg-[#F9FAFB] text-xs font-semibold text-[#6B7280] select-none">
              <span>Create Workspace</span>
              <button 
                onClick={() => setIsNewWorkspaceModalOpen(false)}
                className="hover:text-[#111827] text-sm cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateWorkspace} className="p-4 space-y-4">
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-[#6B7280] uppercase tracking-wider">Workspace Name</label>
                <input 
                  type="text" 
                  placeholder="e.g. My Workspace"
                  value={newWorkspaceName}
                  onChange={(e) => setNewWorkspaceName(e.target.value)}
                  className="w-full h-8 px-2.5 bg-[#F9FAFB] border border-[#E5E7EB] rounded-[6px] text-xs focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#0369A1] transition-all font-medium text-[#111827]"
                  required
                  autoFocus
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-2 text-xs select-none">
                <button 
                  type="button"
                  onClick={() => setIsNewWorkspaceModalOpen(false)}
                  className="h-8 px-4 border border-[#E5E7EB] hover:bg-[#F9FAFB] text-[#6B7280] hover:text-[#111827] rounded-[6px] cursor-pointer transition-colors font-semibold"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="h-8 px-4 bg-[#0369A1] hover:bg-[#0284C7] text-white rounded-[6px] cursor-pointer transition-colors font-semibold"
                >
                  Create
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
    </SidebarContext.Provider>
  );
}
