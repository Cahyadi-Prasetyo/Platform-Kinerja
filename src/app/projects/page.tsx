"use client";
 
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import DashboardShell, {
  IconPlus,
  IconCircle,
  IconSuccess,
  IconChartProject,
  IconCalendar,
  IconTrash,
  IconChevronDown,
  SidebarToggleButton,
  IconLayout,
  IconList,
  IconTableLayout,
  IconTimeline,
} from '../../components/DashboardShell';

// --- DATA STRUCTURES ---
interface WorkItem {
  id: string;
  title: string;
  timestamp: string;
  completed: boolean;
  status: 'backlog' | 'todo' | 'inprogress' | 'completed' | 'cancelled';
  assignees: string[];
  projectBadge?: 'chart' | 'calendar';
  dateRange?: string;
  priority?: 'low' | 'medium' | 'high' | 'urgent';
  assigneeName?: string;
  labels?: string[];
  dueDate?: string;
  createdOn?: string;
  updatedOn?: string;
  linksCount?: number;
  attachmentsCount?: number;
  startDate?: string;
}

const IconChevronRight = () => (
  <svg className="w-3.5 h-3.5 text-[#6B7280]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
  </svg>
);

const IconTag = () => (
  <svg className="w-3.5 h-3.5 text-[#9CA3AF]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l6.499 6.499c.404.404.935.61 1.464.61s1.06-.206 1.464-.61l4.318-4.318c.404-.404.61-.935.61-1.464s-.206-1.06-.61-1.464L11.16 3.659A2.25 2.25 0 009.568 3z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 7.5h.008v.008H6V7.5z" />
  </svg>
);

const IconDots = () => (
  <svg className="w-3.5 h-3.5 text-[#9CA3AF]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 5h.01M12 12h.01M12 19h.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
  </svg>
);

// --- Custom Priority SVGs ---
const IconPriorityLow = () => (
  <svg className="w-3.5 h-3.5 text-[#3B82F6] shrink-0" viewBox="0 0 12 12" fill="currentColor">
    <rect x="1" y="8" width="2" height="3" rx="0.5" fill="currentColor" />
    <rect x="5" y="5" width="2" height="6" rx="0.5" fill="#E5E7EB" />
    <rect x="9" y="2" width="2" height="9" rx="0.5" fill="#E5E7EB" />
  </svg>
);

const IconPriorityMedium = () => (
  <svg className="w-3.5 h-3.5 text-[#EAB308] shrink-0" viewBox="0 0 12 12" fill="currentColor">
    <rect x="1" y="8" width="2" height="3" rx="0.5" fill="currentColor" />
    <rect x="5" y="5" width="2" height="6" rx="0.5" fill="currentColor" />
    <rect x="9" y="2" width="2" height="9" rx="0.5" fill="#E5E7EB" />
  </svg>
);

const IconPriorityHigh = () => (
  <svg className="w-3.5 h-3.5 text-[#F97316] shrink-0" viewBox="0 0 12 12" fill="currentColor">
    <rect x="1" y="8" width="2" height="3" rx="0.5" fill="currentColor" />
    <rect x="5" y="5" width="2" height="6" rx="0.5" fill="currentColor" />
    <rect x="9" y="2" width="2" height="9" rx="0.5" fill="currentColor" />
  </svg>
);

const IconPriorityUrgent = () => (
  <svg className="w-3.5 h-3.5 text-[#EF4444] shrink-0" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5">
    <circle cx="6" cy="6" r="5" />
    <line x1="6" y1="3" x2="6" y2="6" strokeLinecap="round" />
    <circle cx="6" cy="8.5" r="0.5" fill="currentColor" />
  </svg>
);

const IconLinkSmallTable = () => (
  <svg className="w-3.5 h-3.5 text-[#9CA3AF] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
  </svg>
);

const IconPaperclip = () => (
  <svg className="w-3.5 h-3.5 text-[#9CA3AF] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M18.364 5.636l-3.536 3.536m0 0l-5.656 5.656a4.002 4.002 0 11-5.656-5.656l8.485-8.485a6.002 6.002 0 128.486 8.486L10.5 17.75a2.002 2.002 0 11-2.828-2.828l5.656-5.656" />
  </svg>
);

// --- Custom Status Option SVGs matching screenshot ---
const IconStatusBacklog = () => (
  <svg className="w-3.5 h-3.5 text-gray-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 3">
    <circle cx="12" cy="12" r="9" />
  </svg>
);

const IconStatusTodo = () => (
  <svg className="w-3.5 h-3.5 text-gray-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
    <circle cx="12" cy="12" r="9" />
  </svg>
);

const IconStatusInProgress = () => (
  <svg className="w-3.5 h-3.5 text-orange-500 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <circle cx="12" cy="12" r="9" />
    <circle cx="12" cy="12" r="4" fill="currentColor" />
  </svg>
);

const IconStatusDone = () => (
  <svg className="w-3.5 h-3.5 text-green-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const IconStatusCancelled = () => (
  <svg className="w-3.5 h-3.5 text-gray-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
    <circle cx="12" cy="12" r="9" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M10 14l4-4m0 4l-4-4" />
  </svg>
);

export default function ProjectsPage() {
  const router = useRouter();
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Dynamic View & Display states
  const [currentView, setCurrentView] = useState<'list' | 'board' | 'timeline' | 'calendar' | 'table'>('table');
  const [activeProjectId, setActiveProjectId] = useState<string>('magangumra');
  const [projectName, setProjectName] = useState<string>('MAGANG UMRAH 2026');

  // Parse project search param client-side safely
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const proj = params.get('project') || 'magangumra';
      setActiveProjectId(proj);
    }
  }, [typeof window !== 'undefined' ? window.location.search : '']);

  // Load project name
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedProjects = localStorage.getItem('projects');
      if (storedProjects) {
        const parsed = JSON.parse(storedProjects);
        const match = parsed.find((p: any) => p.id === activeProjectId);
        if (match) {
          setProjectName(match.name);
        } else {
          setProjectName('MAGANG UMRAH 2026');
        }
      }
    }
  }, [activeProjectId]);

  // Load view preference per project (Default to 'list' for new projects, 'table' for magangumra)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedView = localStorage.getItem(`view-pref-${activeProjectId}`);
      if (savedView) {
        setCurrentView(savedView as any);
      } else {
        const defaultView = activeProjectId === 'magangumra' ? 'table' : 'list';
        setCurrentView(defaultView);
      }
    }
  }, [activeProjectId]);

  const changeView = (view: 'list' | 'board' | 'timeline' | 'calendar' | 'table') => {
    setCurrentView(view);
    localStorage.setItem(`view-pref-${activeProjectId}`, view);
  };
  const [isDisplayDropdownOpen, setIsDisplayDropdownOpen] = useState(false);
  const [groupBy, setGroupBy] = useState<'status' | 'assignee' | 'none'>('status');
  const [sortBy, setSortBy] = useState<'id' | 'title' | 'date'>('id');
  const [activeRowMenuId, setActiveRowMenuId] = useState<string | null>(null);
  
  // Interactive spreadsheet dropdowns state
  const [activeCellDropdown, setActiveCellDropdown] = useState<{ itemId: string, column: 'state' | 'priority' | 'assignees' | 'labels' } | null>(null);
  const [stateSearch, setStateSearch] = useState('');

  // Accordion expanded states
  const [expandedGroups, setExpandedGroups] = useState({
    backlog: false,
    todo: false,
    inprogress: false,
    done: true, // expand done by default
    cancelled: false
  });

  // Modals & form state
  const [isNewItemModalOpen, setIsNewItemModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newId, setNewId] = useState('');
  const [newStatus, setNewStatus] = useState<'backlog' | 'todo' | 'inprogress' | 'completed' | 'cancelled'>('completed');

  // Work items state
  const [items, setItems] = useState<WorkItem[]>([]);
  const [currentUser, setCurrentUser] = useState<{ email: string; name: string } | null>(null);

  // Close dropdowns on window clicks
  useEffect(() => {
    const handleOutsideClick = () => {
      setActiveCellDropdown(null);
    };
    window.addEventListener('click', handleOutsideClick);
    return () => window.removeEventListener('click', handleOutsideClick);
  }, []);

  useEffect(() => {
    const rawUser = localStorage.getItem('user');
    if (rawUser) {
      setCurrentUser(JSON.parse(rawUser));
    }

    if (typeof window !== 'undefined') {
      const storageKey = activeProjectId === 'magangumra' ? 'recents' : `recents_${activeProjectId}`;
      const storedRecents = localStorage.getItem(storageKey);
      if (storedRecents) {
        const parsed: any[] = JSON.parse(storedRecents);
        const mapped = parsed.map(item => {
          let mappedStatus = item.status;
          if (item.status === 'completed') mappedStatus = 'completed';
          if (item.status === 'todo') mappedStatus = 'inprogress';
          return {
            ...item,
            status: mappedStatus,
            priority: item.priority || 'medium',
            assigneeName: item.assigneeName || (item.assignees && item.assignees.length > 0 ? (item.assignees[0] === 'CP' ? 'Cahyadi Prasetyo' : item.assignees[0] === 'PA' ? 'Putra Adhi' : item.assignees[0] === 'PR' ? 'prasetyo' : item.assignees[0] === 'FI' ? 'fia magang' : item.assignees[0] === 'FL' ? 'fla magang' : item.assignees[0] === 'AB' ? 'Aldil Baihaqi' : item.assignees[0]) : 'Unassigned'),
            labels: item.labels || [],
            dueDate: item.dueDate || item.startDate || (item.dateRange ? item.dateRange.split(' - ')[0] : 'Mar 13, 2026'),
            createdOn: item.createdOn || 'Mar 06, 2026',
            updatedOn: item.updatedOn || 'Mar 06, 2026',
            linksCount: item.linksCount !== undefined ? item.linksCount : 0,
            attachmentsCount: item.attachmentsCount !== undefined ? item.attachmentsCount : 0,
            dateRange: item.dateRange || 'Mar 13 - 13, 2026'
          };
        });
        setItems(mapped);
      } else {
        if (activeProjectId === 'magangumra') {
          // Default list specified in STICH-2.md + user screenshot
          const defaultItems: WorkItem[] = [
            {
              id: "MAGANGUMRA-184",
              title: "Install Nitro PDF 14",
              timestamp: "just now",
              completed: true,
              status: "completed",
              priority: "low",
              assignees: ["CP", "PA"],
              assigneeName: "Cahyadi Prasetyo",
              labels: [],
              startDate: "Mar 13, 2026",
              dueDate: "Mar 13, 2026",
              createdOn: "Mar 13, 2026",
              updatedOn: "Mar 13, 2026",
              linksCount: 0,
              attachmentsCount: 0,
              projectBadge: 'calendar',
              dateRange: 'Mar 13 - 13, 2026'
            },
            {
              id: "MAGANGUMRA-183",
              title: "Melakukan responsivitas (mode mobile) website dashboard strategis Kepri",
              timestamp: "5 mins ago",
              completed: true,
              status: "completed",
              priority: "urgent",
              assignees: ["PR"],
              assigneeName: "prasetyo",
              labels: [],
              startDate: "Mar 05, 2026",
              dueDate: "Mar 05, 2026",
              createdOn: "Mar 06, 2026",
              updatedOn: "Mar 06, 2026",
              linksCount: 0,
              attachmentsCount: 0,
              projectBadge: 'chart',
              dateRange: 'Mar 05 - 05, 2026'
            },
            {
              id: "MAGANGUMRA-182",
              title: "Melakukan penginstallan software pada pc di Lt3",
              timestamp: "10 mins ago",
              completed: true,
              status: "completed",
              priority: "high",
              assignees: ["CP", "PA"],
              assigneeName: "Cahyadi Prasetyo",
              labels: [],
              startDate: "Mar 05, 2026",
              dueDate: "Mar 05, 2026",
              createdOn: "Mar 05, 2026",
              updatedOn: "Mar 05, 2026",
              linksCount: 0,
              attachmentsCount: 0,
              projectBadge: 'chart',
              dateRange: 'Mar 05 - 05, 2026'
            },
            {
              id: "MAGANGUMRA-181",
              title: "instalasi forticlient lt 2",
              timestamp: "15 mins ago",
              completed: true,
              status: "completed",
              priority: "medium",
              assignees: ["FI"],
              assigneeName: "fia magang",
              labels: [],
              startDate: "Mar 04, 2026",
              dueDate: "Mar 04, 2026",
              createdOn: "Mar 06, 2026",
              updatedOn: "Mar 06, 2026",
              linksCount: 0,
              attachmentsCount: 0,
              projectBadge: 'calendar',
              dateRange: 'Mar 04 - 04, 2026'
            },
            {
              id: "MAGANGUMRA-180",
              title: "Melakukan penambahan SSD dan RAM pada PC di ruangan kerja",
              timestamp: "20 mins ago",
              completed: true,
              status: "completed",
              priority: "medium",
              assignees: ["FL"],
              assigneeName: "fla magang",
              labels: [],
              startDate: "Mar 04, 2026",
              dueDate: "Mar 04, 2026",
              createdOn: "Mar 06, 2026",
              updatedOn: "Mar 06, 2026",
              linksCount: 0,
              attachmentsCount: 0,
              projectBadge: 'chart',
              dateRange: 'Mar 04 - 04, 2026'
            },
            {
              id: "MAGANGUMRA-179",
              title: "Melakukan responsivitas (mode mobile) website dashboard strategis Kepri",
              timestamp: "25 mins ago",
              completed: true,
              status: "completed",
              priority: "urgent",
              assignees: ["PR"],
              assigneeName: "prasetyo",
              labels: [],
              startDate: "Mar 04, 2026",
              dueDate: "Mar 04, 2026",
              createdOn: "Mar 06, 2026",
              updatedOn: "Mar 06, 2026",
              linksCount: 0,
              attachmentsCount: 0,
              projectBadge: 'chart',
              dateRange: 'Mar 04 - 04, 2026'
            },
            {
              id: "MAGANGUMRA-178",
              title: "Melakukan penginstallan software pada pc di Lab Komputer",
              timestamp: "30 mins ago",
              completed: true,
              status: "completed",
              priority: "high",
              assignees: ["CP", "PA"],
              assigneeName: "Cahyadi Prasetyo",
              labels: [],
              startDate: "Mar 04, 2026",
              dueDate: "Mar 04, 2026",
              createdOn: "Mar 06, 2026",
              updatedOn: "Mar 06, 2026",
              linksCount: 0,
              attachmentsCount: 0,
              projectBadge: 'calendar',
              dateRange: 'Mar 04 - 04, 2026'
            },
            {
              id: "MAGANGUMRA-177",
              title: "Troubleshooting terkait permasalahan jaringan di ruangan Sekretaris",
              timestamp: "35 mins ago",
              completed: true,
              status: "completed",
              priority: "high",
              assignees: ["PR"],
              assigneeName: "prasetyo",
              labels: [],
              startDate: "Mar 04, 2026",
              dueDate: "Mar 04, 2026",
              createdOn: "Mar 06, 2026",
              updatedOn: "Mar 06, 2026",
              linksCount: 0,
              attachmentsCount: 0,
              projectBadge: 'chart',
              dateRange: 'Mar 04 - 04, 2026'
            },
            {
              id: "MAGANGUMRA-176",
              title: "Monitoring wifi Pada Lt 4 dan 3",
              timestamp: "40 mins ago",
              completed: true,
              status: "completed",
              priority: "low",
              assignees: ["CP", "PA"],
              assigneeName: "Cahyadi Prasetyo",
              labels: [],
              startDate: "Mar 04, 2026",
              dueDate: "Mar 04, 2026",
              createdOn: "Mar 06, 2026",
              updatedOn: "Mar 06, 2026",
              linksCount: 0,
              attachmentsCount: 0,
              projectBadge: 'chart',
              dateRange: 'Mar 04 - 04, 2026'
            },
            {
              id: "MAGANGUMRA-175",
              title: "Revisi Layout dashboard map",
              timestamp: "45 mins ago",
              completed: true,
              status: "completed",
              priority: "urgent",
              assignees: ["CP", "PA"],
              assigneeName: "Cahyadi Prasetyo",
              labels: [],
              startDate: "Mar 03, 2026",
              dueDate: "Mar 03, 2026",
              createdOn: "Mar 06, 2026",
              updatedOn: "Mar 06, 2026",
              linksCount: 0,
              attachmentsCount: 0,
              projectBadge: 'calendar',
              dateRange: 'Mar 03 - 03, 2026'
            },
            {
              id: "MAGANGUMRA-174",
              title: "Deployment Aero ke VPS Magangers",
              timestamp: "50 mins ago",
              completed: true,
              status: "completed",
              priority: "high",
              assignees: ["AB"],
              assigneeName: "Aldil Baihaqi",
              labels: [],
              startDate: "Mar 03, 2026",
              dueDate: "Mar 03, 2026",
              createdOn: "Mar 06, 2026",
              updatedOn: "Mar 06, 2026",
              linksCount: 0,
              attachmentsCount: 0,
              projectBadge: 'chart',
              dateRange: 'Mar 03 - 03, 2026'
            },
            {
              id: "MAGANGUMRA-173",
              title: "Troubleshooting internet pada Lt 1 R.Arsip",
              timestamp: "55 mins ago",
              completed: true,
              status: "completed",
              priority: "medium",
              assignees: ["PR"],
              assigneeName: "prasetyo",
              labels: [],
              startDate: "Mar 03, 2026",
              dueDate: "Mar 03, 2026",
              createdOn: "Mar 06, 2026",
              updatedOn: "Mar 06, 2026",
              linksCount: 0,
              attachmentsCount: 0,
              projectBadge: 'chart',
              dateRange: 'Mar 03 - 03, 2026'
            }
          ];
          localStorage.setItem('recents', JSON.stringify(defaultItems));
          setItems(defaultItems);
        } else {
          setItems([]);
        }
      }
    }
  }, [activeProjectId]);

  const saveItems = (updated: WorkItem[]) => {
    setItems(updated);
    const storageKey = activeProjectId === 'magangumra' ? 'recents' : `recents_${activeProjectId}`;
    localStorage.setItem(storageKey, JSON.stringify(updated));
  };

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => setToastMessage(null), 2500);
  };

  const handleCreateWorkItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) {
      showToast('Work item title is required!');
      return;
    }
    const prefix = activeProjectId === 'magangumra' ? 'MAGANGUMRA' : activeProjectId.toUpperCase();
    const idString = newId.trim() 
      ? newId.trim().toUpperCase() 
      : (activeProjectId === 'magangumra' 
          ? `MAGANGUMRA-${items.length + 185}` 
          : `${prefix}-${items.length + 1}`);
    const newItem: WorkItem = {
      id: idString,
      title: newTitle.trim(),
      timestamp: 'just now',
      completed: newStatus === 'completed',
      status: newStatus,
      priority: 'medium',
      assignees: [currentUser ? currentUser.name.slice(0, 2).toUpperCase() : 'CP'],
      assigneeName: currentUser ? currentUser.name : 'Cahyadi Prasetyo',
      labels: [],
      startDate: 'Mar 13, 2026',
      dueDate: 'Mar 13, 2026',
      createdOn: 'Mar 13, 2026',
      updatedOn: 'Mar 13, 2026',
      linksCount: 0,
      attachmentsCount: 0,
      projectBadge: 'chart',
      dateRange: 'Mar 13 - 13, 2026'
    };
    const updated = [newItem, ...items];
    saveItems(updated);
    setIsNewItemModalOpen(false);
    setNewTitle('');
    setNewId('');
    showToast(`Work item ${idString} created successfully.`);
  };

  const toggleTaskCompleted = (id: string) => {
    const updated = items.map(item => {
      if (item.id === id) {
        const nextCompleted = !item.completed;
        showToast(nextCompleted ? `Marked ${id} as completed` : `Reopened ${id}`);
        return {
          ...item,
          completed: nextCompleted,
          status: nextCompleted ? 'completed' : 'inprogress' as 'completed' | 'inprogress'
        };
      }
      return item;
    });
    saveItems(updated);
  };

  const deleteTask = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const updated = items.filter(item => item.id !== id);
    saveItems(updated);
    showToast(`Deleted ${id}`);
  };

  const [collapsedFolders, setCollapsedFolders] = useState<Record<string, boolean>>({});

  // Sorting helper
  const sortItems = (itemArray: WorkItem[]) => {
    return [...itemArray].sort((a, b) => {
      if (sortBy === 'title') {
        return a.title.localeCompare(b.title);
      }
      if (sortBy === 'date') {
        return (a.dueDate || '').localeCompare(b.dueDate || '');
      }
      // Default 'id' sort descending (highest number first) to match chronological dashboard order
      return b.id.localeCompare(a.id);
    });
  };

  // Grouping elements
  const backlogItems = sortItems(items.filter(i => i.status === 'backlog'));
  const todoItems = sortItems(items.filter(i => i.status === 'todo'));
  const inProgressItems = sortItems(items.filter(i => i.status === 'inprogress'));
  const doneItems = sortItems(items.filter(i => i.status === 'completed'));
  const cancelledItems = sortItems(items.filter(i => (i.status as string) === 'cancelled'));

  // Render Row Menu Dropdown
  const renderRowMenu = (item: WorkItem, isNearBottom?: boolean) => {
    return (
      <div className={`absolute right-8 w-44 bg-white border border-[#E5E7EB] rounded-[6px] py-1.5 z-40 premium-popover text-left shadow-sm ${isNearBottom ? 'bottom-0' : 'top-0'}`}>
        <div className="px-3 py-1 text-[9px] font-bold text-[#9CA3AF] uppercase tracking-wider select-none">Actions</div>
        <button
          onClick={(e) => {
            e.stopPropagation();
            const nextTitle = prompt("Edit Work Item Title:", item.title);
            if (nextTitle && nextTitle.trim()) {
              const updated = items.map(it => it.id === item.id ? { ...it, title: nextTitle.trim() } : it);
              saveItems(updated);
              showToast(`Updated title for ${item.id}`);
            }
            setActiveRowMenuId(null);
          }}
          className="w-full text-left px-3 py-1 hover:bg-[#F9FAFB] text-xs font-semibold text-[#111827]"
        >
          Edit Title
        </button>

        <div className="border-t border-[#E5E7EB] my-1"></div>
        <div className="px-3 py-1 text-[9px] font-bold text-[#9CA3AF] uppercase tracking-wider select-none">Change Status</div>
        {(['backlog', 'todo', 'inprogress', 'completed', 'cancelled'] as const).map(st => (
          <button
            key={st}
            onClick={(e) => {
              e.stopPropagation();
              const updated = items.map(it => it.id === item.id ? { ...it, status: st, completed: st === 'completed' } : it);
              saveItems(updated);
              showToast(`Changed status of ${item.id} to ${st}`);
              setActiveRowMenuId(null);
            }}
            className="w-full text-left px-3 py-1 hover:bg-[#F9FAFB] text-xs text-[#111827] flex items-center justify-between"
          >
            <span className="capitalize">{st === 'completed' ? 'Done' : st}</span>
            {item.status === st && <IconSuccess />}
          </button>
        ))}

        <div className="border-t border-[#E5E7EB] my-1"></div>
        <div className="px-3 py-1 text-[9px] font-bold text-[#9CA3AF] uppercase tracking-wider select-none">Assignee</div>
        {(['CP', 'PA', 'CP, PA'] as const).map(asg => (
          <button
            key={asg}
            onClick={(e) => {
              e.stopPropagation();
              const updated = items.map(it => it.id === item.id ? { ...it, assignees: asg.split(', ') } : it);
              saveItems(updated);
              showToast(`Assigned ${item.id} to ${asg}`);
              setActiveRowMenuId(null);
            }}
            className="w-full text-left px-3 py-1 hover:bg-[#F9FAFB] text-xs text-[#111827] flex items-center justify-between"
          >
            <span>{asg}</span>
            {item.assignees.join(', ') === asg && <IconSuccess />}
          </button>
        ))}

        <div className="border-t border-[#E5E7EB] my-1"></div>
        <button
          onClick={(e) => {
            e.stopPropagation();
            deleteTask(item.id, e);
            setActiveRowMenuId(null);
          }}
          className="w-full text-left px-3 py-1.5 hover:bg-[#EF4444]/5 text-xs text-[#EF4444] font-semibold border-t border-[#E5E7EB]"
        >
          Delete Item
        </button>
      </div>
    );
  };

  // Render row helper for react items state
  const renderRow = (item: WorkItem, isNearBottom?: boolean) => {
    const isDone = item.status === 'completed' || item.completed;
    return (
      <div
        key={item.id}
        onClick={() => toggleTaskCompleted(item.id)}
        className={`group flex items-center justify-between h-[38px] px-3.5 hover:bg-[#F9FAFB] transition-colors cursor-pointer text-xs relative ${activeRowMenuId === item.id ? 'z-30' : ''}`}
      >
        <div className="flex items-center gap-3 flex-1 min-w-0 mr-4">
          <div className="shrink-0 flex items-center">
            {isDone ? <IconSuccess /> : <IconCircle />}
          </div>

          {item.projectBadge && (
            <div className="shrink-0 flex items-center">
              {item.projectBadge === 'chart' ? <IconChartProject /> : <IconCalendar />}
            </div>
          )}

          <span className="text-[11px] text-[#6B7280] font-mono shrink-0 select-all tracking-normal w-28">{item.id}</span>

          <span className={`truncate font-medium text-[#111827] ${isDone ? 'line-through text-[#9CA3AF]' : ''}`}>
            {item.title}
          </span>

          <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold uppercase leading-tight ml-2 border ${isDone ? 'bg-[#E5E7EB]/50 text-[#4B5563] border-transparent' : 'bg-orange-50 text-orange-600 border-orange-100'}`}>
            {isDone ? 'Done' : item.status.toUpperCase()}
          </span>
        </div>

        <div className="flex items-center gap-3 shrink-0 text-[#6B7280]">
          <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-75 flex items-center">
            <button
              onClick={(e) => deleteTask(item.id, e)}
              className="p-1 hover:bg-[#EF4444]/10 rounded text-[#EF4444] cursor-pointer"
              title="Delete Item"
            >
              <IconTrash />
            </button>
          </div>

          <IconTag />
          <span className="text-[11px] text-[#9CA3AF] font-medium font-mono select-none">{item.dateRange || 'Mar 13 - 13, 2026'}</span>

          <div className="flex items-center -space-x-1 ml-1 select-none">
            {item.assignees.map((init, index) => (
              <div
                key={index}
                className="w-4.5 h-4.5 rounded-full border border-white bg-[#0369A1] text-white flex items-center justify-center text-[7px] font-bold shrink-0"
                title={`Assignee: ${init}`}
              >
                {init}
              </div>
            ))}
          </div>

          <div className="relative">
            <button 
              onClick={(e) => {
                e.stopPropagation();
                setActiveRowMenuId(prev => prev === item.id ? null : item.id);
              }}
              className="p-1 hover:bg-[#F3F4F6] rounded select-none cursor-pointer"
            >
              <IconDots />
            </button>
            {activeRowMenuId === item.id && renderRowMenu(item, isNearBottom)}
          </div>
        </div>
      </div>
    );
  };

  // Helper for Gantt offsets
  const getTimelineOffsets = (dateRange: string) => {
    const range = dateRange.toLowerCase();
    if (range.includes('feb 10') || range.includes('feb 12')) return { start: 1, span: 1, color: 'bg-indigo-500/20 text-indigo-700 border-indigo-200' };
    if (range.includes('feb 15') || range.includes('feb 18')) return { start: 2, span: 1, color: 'bg-sky-500/20 text-sky-700 border-sky-200' };
    if (range.includes('mar 01') || range.includes('mar 02')) return { start: 4, span: 1, color: 'bg-emerald-500/20 text-emerald-700 border-emerald-200' };
    if (range.includes('mar 05') || range.includes('mar 08')) return { start: 4, span: 1, color: 'bg-yellow-500/20 text-yellow-700 border-yellow-200' };
    if (range.includes('mar 13') || range.includes('mar 10')) return { start: 5, span: 1, color: 'bg-rose-500/20 text-rose-700 border-rose-200' };
    return { start: 3, span: 1, color: 'bg-gray-500/20 text-gray-700 border-gray-200' };
  };

  // Helper for Calendar day tasks
  const getTasksForDay = (day: number) => {
    return items.filter(item => {
      const range = (item.dateRange || '').toLowerCase();
      if (day === 13 && range.includes('mar 13')) return true;
      if (day === 5 && range.includes('mar 05')) return true;
      if ((day === 1 || day === 2) && range.includes('mar 01')) return true;
      if ((day === 10 || day === 11 || day === 12) && range.includes('mar 10')) return true;
      return false;
    });
  };

  // Render Table Layout spreadsheet grid
  const renderTableView = () => {
    const sorted = sortItems(items);
    return (
      <div className="p-4 flex flex-col items-stretch select-none">
        
        {/* Horizontally scrollable wrapper */}
        <div className="overflow-x-auto border border-[#E5E7EB] rounded-[8px] bg-white shadow-none">
          <table className="min-w-[1500px] w-full table-fixed border-collapse border-spacing-0 text-xs">
            <thead>
              <tr className="bg-[#F9FAFB] border-b border-[#E5E7EB] text-[11px] font-bold text-[#6B7280] h-10 select-none">
                <th className="w-[320px] font-bold text-left px-3.5 border-r border-[#E5E7EB] align-middle sticky left-0 bg-[#F9FAFB] z-20 shadow-[1px_0_0_0_#E5E7EB]">Work items</th>
                <th className="w-[130px] font-bold text-left px-3.5 border-r border-[#E5E7EB] align-middle cursor-pointer hover:bg-[#F3F4F6]">
                  <div className="flex items-center justify-between">
                    <span>State</span>
                    <IconChevronDown />
                  </div>
                </th>
                <th className="w-[130px] font-bold text-left px-3.5 border-r border-[#E5E7EB] align-middle cursor-pointer hover:bg-[#F3F4F6]">
                  <div className="flex items-center justify-between">
                    <span>Priority</span>
                    <IconChevronDown />
                  </div>
                </th>
                <th className="w-[180px] font-bold text-left px-3.5 border-r border-[#E5E7EB] align-middle cursor-pointer hover:bg-[#F3F4F6]">
                  <div className="flex items-center justify-between">
                    <span>Assignees</span>
                    <IconChevronDown />
                  </div>
                </th>
                <th className="w-[130px] font-bold text-left px-3.5 border-r border-[#E5E7EB] align-middle cursor-pointer hover:bg-[#F3F4F6]">
                  <div className="flex items-center justify-between">
                    <span>Labels</span>
                    <IconChevronDown />
                  </div>
                </th>
                <th className="w-[150px] font-bold text-left px-3.5 border-r border-[#E5E7EB] align-middle cursor-pointer hover:bg-[#F3F4F6]">
                  <div className="flex items-center justify-between">
                    <span>Due date</span>
                    <IconChevronDown />
                  </div>
                </th>
                <th className="w-[120px] font-bold text-left px-3.5 border-r border-[#E5E7EB] align-middle cursor-pointer hover:bg-[#F3F4F6]">
                  <div className="flex items-center justify-between">
                    <span>Created on</span>
                    <IconChevronDown />
                  </div>
                </th>
                <th className="w-[120px] font-bold text-left px-3.5 border-r border-[#E5E7EB] align-middle cursor-pointer hover:bg-[#F3F4F6]">
                  <div className="flex items-center justify-between">
                    <span>Updated on</span>
                    <IconChevronDown />
                  </div>
                </th>
                <th className="w-[110px] font-bold text-left px-3.5 border-r border-[#E5E7EB] align-middle cursor-pointer hover:bg-[#F3F4F6]">
                  <div className="flex items-center justify-between">
                    <span>Link</span>
                    <IconChevronDown />
                  </div>
                </th>
                <th className="w-[140px] font-bold text-left px-3.5 align-middle cursor-pointer hover:bg-[#F3F4F6]">
                  <div className="flex items-center justify-between">
                    <span>Attachment</span>
                    <IconChevronDown />
                  </div>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E5E7EB] align-middle">
              {sorted.map((item, index) => {
                const isDone = item.status === 'completed' || item.completed;
                const isNearBottom = index >= sorted.length - 4;
                
                // Status options filtering
                const statuses = [
                  { id: 'backlog', label: 'Backlog', icon: <IconStatusBacklog /> },
                  { id: 'todo', label: 'Todo', icon: <IconStatusTodo /> },
                  { id: 'inprogress', label: 'In Progress', icon: <IconStatusInProgress /> },
                  { id: 'completed', label: 'Done', icon: <IconStatusDone /> },
                  { id: 'cancelled', label: 'Cancelled', icon: <IconStatusCancelled /> },
                ] as const;
                const filteredStatuses = statuses.filter(st => 
                  st.label.toLowerCase().includes(stateSearch.toLowerCase())
                );

                return (
                  <tr key={item.id} className="h-[38px] group hover:bg-[#F9FAFB]/60 transition-colors">
                    {/* Work items cell (Frozen sticky left) */}
                    <td className="px-3.5 border-r border-[#E5E7EB] font-medium align-middle sticky left-0 bg-white group-hover:bg-[#F9FAFB] z-10 transition-colors shadow-[1px_0_0_0_#E5E7EB]">
                      <div className="flex items-center gap-2">
                        <span className="text-[11px] text-[#6B7280] font-mono shrink-0 select-all tracking-normal w-28">{item.id}</span>
                        <span className={`truncate text-[#111827] font-semibold text-xs ${isDone ? 'line-through text-[#9CA3AF]' : ''}`}>
                          {item.title}
                        </span>
                      </div>
                    </td>
                    
                    {/* State cell (searchable popover) */}
                    <td className="px-3.5 border-r border-[#E5E7EB] align-middle">
                      <div className={`relative w-full ${activeCellDropdown?.itemId === item.id && activeCellDropdown?.column === 'state' ? 'z-30' : ''}`}>
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            setStateSearch('');
                            setActiveCellDropdown(prev => prev?.itemId === item.id && prev?.column === 'state' ? null : { itemId: item.id, column: 'state' });
                          }}
                          className="flex items-center gap-1.5 hover:bg-[#F3F4F6] px-1.5 py-0.5 rounded cursor-pointer text-left w-full justify-between"
                        >
                          <div className="flex items-center gap-1.5">
                            {item.status === 'completed' && <IconStatusDone />}
                            {item.status === 'todo' && <IconStatusTodo />}
                            {item.status === 'inprogress' && <IconStatusInProgress />}
                            {item.status === 'backlog' && <IconStatusBacklog />}
                            {item.status === 'cancelled' && <IconStatusCancelled />}
                            <span className="capitalize">{item.status === 'completed' ? 'Done' : item.status === 'inprogress' ? 'In Progress' : item.status}</span>
                          </div>
                          <IconChevronDown />
                        </button>
                        {activeCellDropdown?.itemId === item.id && activeCellDropdown?.column === 'state' && (
                          <div 
                            className={`absolute left-0 w-48 bg-white border border-[#E5E7EB] rounded-[6px] py-1 z-50 premium-popover shadow-md ${isNearBottom ? 'bottom-8' : 'top-8'}`}
                            onClick={(e) => e.stopPropagation()}
                          >
                            {/* Search box header */}
                            <div className="px-2 py-1.5 border-b border-[#E5E7EB] flex items-center gap-1.5 bg-white">
                              <svg className="w-3.5 h-3.5 text-[#9CA3AF] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                              </svg>
                              <input 
                                type="text" 
                                placeholder="Search" 
                                value={stateSearch} 
                                onChange={(e) => setStateSearch(e.target.value)}
                                className="w-full text-xs text-[#111827] placeholder-[#9CA3AF] focus:outline-none bg-transparent"
                                autoFocus
                              />
                            </div>

                            {/* List container */}
                            <div className="max-h-60 overflow-y-auto py-1">
                              {filteredStatuses.length > 0 ? (
                                filteredStatuses.map(st => (
                                  <button
                                    key={st.id}
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      const updated = items.map(it => it.id === item.id ? { ...it, status: st.id, completed: st.id === 'completed' } : it);
                                      saveItems(updated);
                                      setActiveCellDropdown(null);
                                      showToast(`Changed status to ${st.label}`);
                                    }}
                                    className={`w-full text-left px-3 py-1.5 hover:bg-[#F3F4F6]/50 text-xs text-[#111827] flex items-center justify-between ${item.status === st.id ? 'bg-[#F3F4F6]/30 font-semibold' : ''}`}
                                  >
                                    <div className="flex items-center gap-2">
                                      {st.icon}
                                      <span>{st.label}</span>
                                    </div>
                                    {item.status === st.id && (
                                      <svg className="w-3 h-3 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                      </svg>
                                    )}
                                  </button>
                                ))
                              ) : (
                                <div className="px-3 py-2 text-xs text-[#9CA3AF] text-center">No results found</div>
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    </td>

                    {/* Priority cell */}
                    <td className="px-3.5 border-r border-[#E5E7EB] align-middle">
                      <div className={`relative w-full ${activeCellDropdown?.itemId === item.id && activeCellDropdown?.column === 'priority' ? 'z-30' : ''}`}>
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            setActiveCellDropdown(prev => prev?.itemId === item.id && prev?.column === 'priority' ? null : { itemId: item.id, column: 'priority' });
                          }}
                          className="flex items-center gap-1.5 hover:bg-[#F3F4F6] px-1.5 py-0.5 rounded cursor-pointer text-left w-full justify-between"
                        >
                          <div className="flex items-center gap-1.5">
                            {item.priority === 'urgent' && <IconPriorityUrgent />}
                            {item.priority === 'high' && <IconPriorityHigh />}
                            {item.priority === 'medium' && <IconPriorityMedium />}
                            {item.priority === 'low' && <IconPriorityLow />}
                            <span className="capitalize">{item.priority || 'Medium'}</span>
                          </div>
                          <IconChevronDown />
                        </button>
                        {activeCellDropdown?.itemId === item.id && activeCellDropdown?.column === 'priority' && (
                          <div className={`absolute left-0 w-40 bg-white border border-[#E5E7EB] rounded-[6px] py-1 z-50 premium-popover shadow-sm ${isNearBottom ? 'bottom-8' : 'top-8'}`}>
                            {(['low', 'medium', 'high', 'urgent'] as const).map(pr => (
                              <button
                                key={pr}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  const updated = items.map(it => it.id === item.id ? { ...it, priority: pr } : it);
                                  saveItems(updated);
                                  setActiveCellDropdown(null);
                                  showToast(`Changed priority to ${pr}`);
                                }}
                                className="w-full text-left px-3 py-1.5 hover:bg-[#F9FAFB] text-xs text-[#111827] flex items-center justify-between"
                              >
                                <span className="capitalize">{pr}</span>
                                {item.priority === pr && <IconSuccess />}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    </td>

                    {/* Assignees cell */}
                    <td className="px-3.5 border-r border-[#E5E7EB] align-middle">
                      <div className={`relative w-full ${activeCellDropdown?.itemId === item.id && activeCellDropdown?.column === 'assignees' ? 'z-30' : ''}`}>
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            setActiveCellDropdown(prev => prev?.itemId === item.id && prev?.column === 'assignees' ? null : { itemId: item.id, column: 'assignees' });
                          }}
                          className="flex items-center gap-1.5 hover:bg-[#F3F4F6] px-1.5 py-0.5 rounded cursor-pointer text-left w-full justify-between"
                        >
                          <div className="flex items-center gap-2">
                            <div className="flex items-center -space-x-1 select-none">
                              {item.assignees.map((init, i) => (
                                <div 
                                  key={i}
                                  className={`w-4.5 h-4.5 rounded-full border border-white flex items-center justify-center text-[7px] font-bold shrink-0 text-white
                                    ${init === 'CP' ? 'bg-[#F59E0B]' : init === 'PA' ? 'bg-[#3B82F6]' : init === 'PR' ? 'bg-[#6B7280]' : init === 'FI' ? 'bg-[#14B8A6]' : init === 'FL' ? 'bg-[#6366F1]' : 'bg-[#D97706]'}`}
                                >
                                  {init}
                                </div>
                              ))}
                            </div>
                            <span className="truncate text-xs text-[#111827]">
                              {item.assigneeName || (item.assignees.length > 0 ? item.assignees.join(', ') : 'Unassigned')}
                            </span>
                          </div>
                          <IconChevronDown />
                        </button>
                        {activeCellDropdown?.itemId === item.id && activeCellDropdown?.column === 'assignees' && (
                          <div className={`absolute left-0 w-44 bg-white border border-[#E5E7EB] rounded-[6px] py-1 z-50 premium-popover shadow-sm ${isNearBottom ? 'bottom-8' : 'top-8'}`}>
                            {[
                              { name: 'Cahyadi Prasetyo', init: 'CP' },
                              { name: 'Putra Adhi', init: 'PA' },
                              { name: 'prasetyo', init: 'PR' },
                              { name: 'fia magang', init: 'FI' },
                              { name: 'fla magang', init: 'FL' },
                              { name: 'Aldil Baihaqi', init: 'AB' }
                            ].map(user => (
                              <button
                                key={user.name}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  const updated = items.map(it => it.id === item.id ? { 
                                    ...it, 
                                    assignees: [user.init],
                                    assigneeName: user.name
                                  } : it);
                                  saveItems(updated);
                                  setActiveCellDropdown(null);
                                  showToast(`Assigned to ${user.name}`);
                                }}
                                className="w-full text-left px-3 py-1.5 hover:bg-[#F9FAFB] text-xs text-[#111827] flex items-center justify-between"
                              >
                                <span>{user.name}</span>
                                {item.assigneeName === user.name && <IconSuccess />}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    </td>

                    {/* Labels cell */}
                    <td className="px-3.5 border-r border-[#E5E7EB] align-middle">
                      <div className={`relative w-full ${activeCellDropdown?.itemId === item.id && activeCellDropdown?.column === 'labels' ? 'z-30' : ''}`}>
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            setActiveCellDropdown(prev => prev?.itemId === item.id && prev?.column === 'labels' ? null : { itemId: item.id, column: 'labels' });
                          }}
                          className="flex items-center gap-1.5 hover:bg-[#F3F4F6] px-1.5 py-0.5 rounded cursor-pointer text-left w-full justify-between"
                        >
                          <div className="flex items-center gap-1.5 text-[#6B7280]">
                            <IconTag />
                            <span className="truncate text-xs">
                              {item.labels && item.labels.length > 0 ? item.labels.join(', ') : 'Select labels'}
                            </span>
                          </div>
                          <IconChevronDown />
                        </button>
                        {activeCellDropdown?.itemId === item.id && activeCellDropdown?.column === 'labels' && (
                          <div className={`absolute left-0 w-40 bg-white border border-[#E5E7EB] rounded-[6px] py-1 z-50 premium-popover shadow-sm ${isNearBottom ? 'bottom-8' : 'top-8'}`}>
                            {['Feature', 'Bug', 'Documentation', 'Refactor'].map(lbl => {
                              const hasLabel = item.labels?.includes(lbl);
                              return (
                                <button
                                  key={lbl}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    const currentLabels = item.labels || [];
                                    const nextLabels = hasLabel ? currentLabels.filter(l => l !== lbl) : [...currentLabels, lbl];
                                    const updated = items.map(it => it.id === item.id ? { ...it, labels: nextLabels } : it);
                                    saveItems(updated);
                                  }}
                                  className="w-full text-left px-3 py-1.5 hover:bg-[#F9FAFB] text-xs text-[#111827] flex items-center justify-between"
                                >
                                  <span>{lbl}</span>
                                  {hasLabel && <IconSuccess />}
                                </button>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    </td>

                    {/* Due Date cell */}
                    <td className="px-3.5 border-r border-[#E5E7EB] relative align-middle">
                      <div className="flex items-center justify-between w-full">
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            const newD = prompt("Edit Due Date (e.g. Mar 13, 2026):", item.dueDate || 'Mar 13, 2026');
                            if (newD !== null) {
                              const updated = items.map(it => it.id === item.id ? { ...it, dueDate: newD, dateRange: `${newD.split(',')[0]} - ${newD.split(',')[0]}, 2026` } : it);
                              saveItems(updated);
                              showToast(`Updated due date for ${item.id}`);
                            }
                          }}
                          className="flex items-center gap-1.5 hover:bg-[#F3F4F6] px-1 py-0.5 rounded cursor-pointer text-left text-xs"
                        >
                          <IconCalendar />
                          <span className="text-[11px] text-[#6B7280] font-medium font-mono">
                            {item.dueDate || 'Mar 13, 2026'}
                          </span>
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            const updated = items.map(it => it.id === item.id ? { ...it, dueDate: '-' } : it);
                            saveItems(updated);
                            showToast(`Cleared due date for ${item.id}`);
                          }}
                          className="p-0.5 hover:bg-slate-100 rounded text-slate-400 hover:text-slate-600"
                          title="Clear date"
                        >
                          ✕
                        </button>
                      </div>
                    </td>

                    {/* Created on cell */}
                    <td className="px-3.5 border-r border-[#E5E7EB] align-middle">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          const val = prompt("Edit Created Date:", item.createdOn || 'Mar 06, 2026');
                          if (val !== null) {
                            const updated = items.map(it => it.id === item.id ? { ...it, createdOn: val } : it);
                            saveItems(updated);
                          }
                        }}
                        className="hover:bg-[#F3F4F6] px-1.5 py-0.5 rounded text-[#4B5563] text-left w-full cursor-pointer"
                      >
                        {item.createdOn || 'Mar 06, 2026'}
                      </button>
                    </td>

                    {/* Updated on cell */}
                    <td className="px-3.5 border-r border-[#E5E7EB] align-middle">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          const val = prompt("Edit Updated Date:", item.updatedOn || 'Mar 06, 2026');
                          if (val !== null) {
                            const updated = items.map(it => it.id === item.id ? { ...it, updatedOn: val } : it);
                            saveItems(updated);
                          }
                        }}
                        className="hover:bg-[#F3F4F6] px-1.5 py-0.5 rounded text-[#4B5563] text-left w-full cursor-pointer"
                      >
                        {item.updatedOn || 'Mar 06, 2026'}
                      </button>
                    </td>

                    {/* Link cell */}
                    <td className="px-3.5 border-r border-[#E5E7EB] align-middle">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          const count = prompt("Edit Links count:", String(item.linksCount || 0));
                          if (count !== null) {
                            const updated = items.map(it => it.id === item.id ? { ...it, linksCount: parseInt(count) || 0 } : it);
                            saveItems(updated);
                          }
                        }}
                        className="flex items-center gap-1.5 hover:bg-[#F3F4F6] px-1.5 py-0.5 rounded text-[#6B7280] text-left w-full cursor-pointer"
                      >
                        <IconLinkSmallTable />
                        <span>{item.linksCount || 0} links</span>
                      </button>
                    </td>

                    {/* Attachment cell */}
                    <td className="px-3.5 align-middle">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          const count = prompt("Edit Attachments count:", String(item.attachmentsCount || 0));
                          if (count !== null) {
                            const updated = items.map(it => it.id === item.id ? { ...it, attachmentsCount: parseInt(count) || 0 } : it);
                            saveItems(updated);
                          }
                        }}
                        className="flex items-center gap-1.5 hover:bg-[#F3F4F6] px-1.5 py-0.5 rounded text-[#6B7280] text-left w-full cursor-pointer"
                      >
                        <IconPaperclip />
                        <span>{item.attachmentsCount || 0} attachments</span>
                      </button>
                    </td>

                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Add work item link below the table layout */}
        <div className="flex select-none">
          <button
            onClick={() => setIsNewItemModalOpen(true)}
            className="flex items-center gap-1.5 text-xs text-[#6B7280] hover:text-[#111827] font-semibold mt-3 px-1.5 cursor-pointer transition-colors"
          >
            <span className="text-sm font-bold">+</span>
            <span>Add work item</span>
          </button>
        </div>

      </div>
    );
  };

  // Render active view contents
  const renderViewContent = () => {
    if (currentView === 'table') {
      return renderTableView();
    }

    if (currentView === 'list') {
      if (groupBy === 'status') {
        return (
          <div className="max-w-full w-full">
            {/* Accordion 1: Backlog */}
            <div className="border-b border-[#E5E7EB]">
              <div
                onClick={() => setExpandedGroups(prev => ({ ...prev, backlog: !prev.backlog }))}
                className="w-full h-10 px-5 hover:bg-[#F9FAFB] flex items-center justify-between text-[13px] font-bold text-[#111827] select-none transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-2.5">
                  <svg className="w-4 h-4 text-[#9CA3AF]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="9" /></svg>
                  <span>Backlog</span>
                  <span className="text-[#9CA3AF] font-medium text-xs ml-1">{backlogItems.length}</span>
                </div>
                <button
                  onClick={(e) => { e.stopPropagation(); setNewStatus('backlog'); setIsNewItemModalOpen(true); }}
                  className="p-1 hover:bg-[#F3F4F6] rounded text-[#9CA3AF] hover:text-[#6B7280] cursor-pointer transition-colors"
                  title="Add backlog item"
                >
                  <IconPlus />
                </button>
              </div>
              {expandedGroups.backlog && (
                <div className="divide-y divide-[#E5E7EB]">
                  {backlogItems.length > 0 ? (
                    backlogItems.map((item, idx) => renderRow(item, idx >= backlogItems.length - 2))
                  ) : (
                    <div className="py-4 text-center text-xs text-[#9CA3AF]">No backlog items found.</div>
                  )}
                </div>
              )}
            </div>

            {/* Accordion 2: Todo */}
            <div className="border-b border-[#E5E7EB]">
              <div
                onClick={() => setExpandedGroups(prev => ({ ...prev, todo: !prev.todo }))}
                className="w-full h-10 px-5 hover:bg-[#F9FAFB] flex items-center justify-between text-[13px] font-bold text-[#111827] select-none transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-2.5">
                  <svg className="w-4 h-4 text-[#9CA3AF]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="9" /></svg>
                  <span>Todo</span>
                  <span className="text-[#9CA3AF] font-medium text-xs ml-1">{todoItems.length}</span>
                </div>
                <button
                  onClick={(e) => { e.stopPropagation(); setNewStatus('todo'); setIsNewItemModalOpen(true); }}
                  className="p-1 hover:bg-[#F3F4F6] rounded text-[#9CA3AF] hover:text-[#6B7280] cursor-pointer transition-colors"
                  title="Add todo item"
                >
                  <IconPlus />
                </button>
              </div>
              {expandedGroups.todo && (
                <div className="divide-y divide-[#E5E7EB]">
                  {todoItems.length > 0 ? (
                    todoItems.map((item, idx) => renderRow(item, idx >= todoItems.length - 2))
                  ) : (
                    <div className="py-4 text-center text-xs text-[#9CA3AF]">No todo items found.</div>
                  )}
                </div>
              )}
            </div>

            {/* Accordion 3: In Progress */}
            <div className="border-b border-[#E5E7EB]">
              <div
                onClick={() => setExpandedGroups(prev => ({ ...prev, inprogress: !prev.inprogress }))}
                className="w-full h-10 px-5 hover:bg-[#F9FAFB] flex items-center justify-between text-[13px] font-bold text-[#111827] select-none transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-2.5">
                  <svg className="w-4 h-4 text-[#F59E0B]" viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="6" /></svg>
                  <span>In Progress</span>
                  <span className="text-[#9CA3AF] font-medium text-xs ml-1">{inProgressItems.length}</span>
                </div>
                <button
                  onClick={(e) => { e.stopPropagation(); setNewStatus('inprogress'); setIsNewItemModalOpen(true); }}
                  className="p-1 hover:bg-[#F3F4F6] rounded text-[#9CA3AF] hover:text-[#6B7280] cursor-pointer transition-colors"
                  title="Add in-progress item"
                >
                  <IconPlus />
                </button>
              </div>
              {expandedGroups.inprogress && (
                <div className="divide-y divide-[#E5E7EB]">
                  {inProgressItems.length > 0 ? (
                    inProgressItems.map((item, idx) => renderRow(item, idx >= inProgressItems.length - 2))
                  ) : (
                    <div className="py-4 text-center text-xs text-[#9CA3AF]">No in-progress items found.</div>
                  )}
                </div>
              )}
            </div>

            {/* Accordion 4: Done */}
            <div className="border-b border-[#E5E7EB]">
              <div
                onClick={() => setExpandedGroups(prev => ({ ...prev, done: !prev.done }))}
                className="w-full h-10 px-5 hover:bg-[#F9FAFB] flex items-center justify-between text-[13px] font-bold text-[#111827] select-none transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-2.5">
                  <svg className="w-4 h-4 text-[#10B981]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  <span>Done</span>
                  <span className="text-[#9CA3AF] font-medium text-xs ml-1">{doneItems.length}</span>
                </div>
                <button
                  onClick={(e) => { e.stopPropagation(); setNewStatus('completed'); setIsNewItemModalOpen(true); }}
                  className="p-1 hover:bg-[#F3F4F6] rounded text-[#9CA3AF] hover:text-[#6B7280] cursor-pointer transition-colors"
                  title="Add done item"
                >
                  <IconPlus />
                </button>
              </div>
              {expandedGroups.done && (
                <div className="divide-y divide-[#E5E7EB]">
                  {doneItems.length > 0 ? (
                    doneItems.map((item, idx) => renderRow(item, idx >= doneItems.length - 2))
                  ) : (
                    <div className="py-4 text-center text-xs text-[#9CA3AF]">No completed items found.</div>
                  )}
                </div>
              )}
            </div>

            {/* Accordion 5: Cancelled */}
            <div className="border-b border-[#E5E7EB]">
              <div
                onClick={() => setExpandedGroups(prev => ({ ...prev, cancelled: !prev.cancelled }))}
                className="w-full h-10 px-5 hover:bg-[#F9FAFB] flex items-center justify-between text-[13px] font-bold text-[#111827] select-none transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-2.5">
                  <svg className="w-4 h-4 text-[#6B7280]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  <span>Cancelled</span>
                  <span className="text-[#9CA3AF] font-medium text-xs ml-1">{cancelledItems.length}</span>
                </div>
                <button
                  onClick={(e) => { e.stopPropagation(); setNewStatus('cancelled'); setIsNewItemModalOpen(true); }}
                  className="p-1 hover:bg-[#F3F4F6] rounded text-[#9CA3AF] hover:text-[#6B7280] cursor-pointer transition-colors"
                  title="Add cancelled item"
                >
                  <IconPlus />
                </button>
              </div>
              {expandedGroups.cancelled && (
                <div className="divide-y divide-[#E5E7EB]">
                  {cancelledItems.length > 0 ? (
                    cancelledItems.map((item, idx) => renderRow(item, idx >= cancelledItems.length - 2))
                  ) : (
                    <div className="py-4 text-center text-xs text-[#9CA3AF]">No cancelled items found.</div>
                  )}
                </div>
              )}
            </div>
          </div>
        );
      }

      if (groupBy === 'assignee') {
        const assignees = ['CP', 'PA', 'PR', 'FI', 'FL', 'AB', 'Unassigned'];
        return (
          <div className="max-w-full w-full">
            {assignees.map(asg => {
              const filtered = sortItems(items.filter(item => {
                if (asg === 'Unassigned') return item.assignees.length === 0;
                return item.assignees.includes(asg);
              }));
              const isCollapsed = collapsedFolders[asg];
              const toggleAsg = () => {
                setCollapsedFolders(prev => ({ ...prev, [asg]: !prev[asg] }));
              };

              return (
                <div key={asg} className="border-b border-[#E5E7EB]">
                  <div
                    onClick={toggleAsg}
                    className="w-full h-10 px-5 hover:bg-[#F9FAFB] flex items-center justify-between text-[13px] font-bold text-[#111827] select-none transition-colors cursor-pointer"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="w-4.5 h-4.5 rounded-full bg-[#0369A1] text-white flex items-center justify-center text-[7px] font-bold shrink-0">{asg}</div>
                      <span>{asg === 'Unassigned' ? 'Unassigned' : asg === 'CP' ? 'Cahyadi Prasetyo (CP)' : asg === 'PA' ? 'Putra Adhi (PA)' : asg === 'PR' ? 'prasetyo' : asg === 'FI' ? 'fia magang' : asg === 'FL' ? 'fla magang' : 'Aldil Baihaqi'}</span>
                      <span className="text-[#9CA3AF] font-medium text-xs ml-1">{filtered.length}</span>
                    </div>
                  </div>
                  {!isCollapsed && (
                    <div className="divide-y divide-[#E5E7EB]">
                      {filtered.length > 0 ? (
                        filtered.map((item, idx) => renderRow(item, idx >= filtered.length - 2))
                      ) : (
                        <div className="py-4 text-center text-xs text-[#9CA3AF]">No items for this assignee.</div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        );
      }

      // groupBy === 'none'
      return (
        <div className="divide-y divide-[#E5E7EB] w-full">
          {sortItems(items).map((item, idx, arr) => renderRow(item, idx >= arr.length - 2))}
        </div>
      );
    }

    if (currentView === 'board') {
      const columns = [
        { id: 'backlog', label: 'Backlog', dot: <svg className="w-3.5 h-3.5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><circle cx="12" cy="12" r="9" /></svg> },
        { id: 'todo', label: 'Todo', dot: <svg className="w-3.5 h-3.5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><circle cx="12" cy="12" r="9" /></svg> },
        { id: 'inprogress', label: 'In Progress', dot: <svg className="w-3.5 h-3.5 text-orange-500" fill="currentColor" viewBox="0 0 24 24"><circle cx="12" cy="12" r="6" /></svg> },
        { id: 'completed', label: 'Done', dot: <svg className="w-3.5 h-3.5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4" /></svg> },
        { id: 'cancelled', label: 'Cancelled', dot: <svg className="w-3.5 h-3.5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" /></svg> },
      ] as const;

      return (
        <div className="flex gap-4 p-5 overflow-x-auto min-h-[calc(100vh-100px)] bg-slate-50/40 select-none items-start">
          {columns.map(col => {
            const colItems = sortItems(items.filter(it => it.status === col.id));
            return (
              <div key={col.id} className="w-[280px] shrink-0 flex flex-col bg-white border border-[#E5E7EB] rounded-[8px] p-3 space-y-3">
                {/* Column Header */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-[#111827]">
                    {col.dot}
                    <span>{col.label}</span>
                    <span className="text-[#9CA3AF] font-medium font-mono text-[10px] ml-1">{colItems.length}</span>
                  </div>
                  <button
                    onClick={() => { setNewStatus(col.id); setIsNewItemModalOpen(true); }}
                    className="p-1 hover:bg-[#F3F4F6] rounded text-[#9CA3AF] hover:text-[#6B7280] cursor-pointer"
                  >
                    <IconPlus />
                  </button>
                </div>

                {/* Cards List */}
                <div className="flex-1 overflow-y-auto space-y-2 max-h-[65vh] pr-0.5">
                  {colItems.map(item => (
                    <div 
                      key={item.id}
                      className="bg-white border border-[#E5E7EB] hover:border-[#9CA3AF] rounded-[6px] p-3 space-y-2.5 relative transition-colors shadow-none"
                    >
                      <div className="flex justify-between items-start">
                        <span className="text-[10px] text-[#6B7280] font-mono select-all tracking-normal">{item.id}</span>
                        
                        <div className="relative">
                          <button 
                            onClick={(e) => {
                              e.stopPropagation();
                              setActiveRowMenuId(prev => prev === item.id ? null : item.id);
                            }}
                            className="p-0.5 hover:bg-[#F3F4F6] rounded text-[#9CA3AF] hover:text-[#6B7280] cursor-pointer"
                          >
                            <IconDots />
                          </button>
                          {activeRowMenuId === item.id && renderRowMenu(item)}
                        </div>
                      </div>

                      <p className="text-xs font-semibold text-[#111827] leading-relaxed line-clamp-3">{item.title}</p>
                      
                      <div className="flex items-center justify-between text-[10px] text-[#6B7280] pt-1">
                        <span className="font-mono text-[#9CA3AF]">{item.dueDate || 'Mar 13, 2026'}</span>
                        
                        <div className="flex items-center gap-1.5">
                          {/* Shifting Arrows */}
                          <div className="flex items-center border border-[#E5E7EB] rounded bg-white">
                            <button
                              disabled={col.id === 'backlog'}
                              onClick={() => {
                                const idx = columns.findIndex(c => c.id === col.id);
                                if (idx > 0) {
                                  const nextCol = columns[idx - 1].id;
                                  const updated = items.map(it => it.id === item.id ? { ...it, status: nextCol, completed: nextCol === 'completed' } : it);
                                  saveItems(updated);
                                  showToast(`Moved ${item.id} left`);
                                }
                              }}
                              className="px-1.5 py-0.5 hover:bg-[#F3F4F6] disabled:opacity-30 disabled:hover:bg-transparent rounded-l text-[#6B7280] cursor-pointer font-bold"
                            >
                              ←
                            </button>
                            <button
                              disabled={col.id === 'cancelled'}
                              onClick={() => {
                                const idx = columns.findIndex(c => c.id === col.id);
                                if (idx < columns.length - 1) {
                                  const nextCol = columns[idx + 1].id;
                                  const updated = items.map(it => it.id === item.id ? { ...it, status: nextCol, completed: nextCol === 'completed' } : it);
                                  saveItems(updated);
                                  showToast(`Moved ${item.id} right`);
                                }
                              }}
                              className="px-1.5 py-0.5 hover:bg-[#F3F4F6] disabled:opacity-30 disabled:hover:bg-transparent rounded-r border-l border-[#E5E7EB] text-[#6B7280] cursor-pointer font-bold"
                            >
                              →
                            </button>
                          </div>

                          {/* Assignee initials */}
                          <div className="flex -space-x-1 ml-1 select-none">
                            {item.assignees.map((init, i) => (
                              <div 
                                key={i}
                                className="w-4 h-4 rounded-full border border-white bg-[#0369A1] text-white flex items-center justify-center text-[7px] font-bold shrink-0"
                              >
                                {init}
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                  {colItems.length === 0 && (
                    <div className="py-8 text-center text-xs text-[#9CA3AF] border border-dashed border-[#E5E7EB] rounded-[6px]">
                      No items
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      );
    }

    if (currentView === 'timeline') {
      const weeks = [
        { id: 'w1', label: 'W1 (Feb 08-14)' },
        { id: 'w2', label: 'W2 (Feb 15-21)' },
        { id: 'w3', label: 'W3 (Feb 22-28)' },
        { id: 'w4', label: 'W4 (Mar 01-07)' },
        { id: 'w5', label: 'W5 (Mar 08-14)' }
      ];

      return (
        <div className="p-5 space-y-4 max-w-full select-none overflow-x-auto">
          <div className="min-w-[700px] border border-[#E5E7EB] rounded-[8px] bg-white overflow-hidden">
            {/* Header Row */}
            <div className="grid grid-cols-12 bg-[#F9FAFB] border-b border-[#E5E7EB] text-xs font-bold text-[#6B7280] h-9 items-center px-4">
              <div className="col-span-5 border-r border-[#E5E7EB] h-full flex items-center pr-2">Work Item</div>
              {weeks.map(wk => (
                <div key={wk.id} className="col-span-1.4 text-center truncate font-mono text-[10px] leading-tight font-semibold h-full flex items-center justify-center border-r border-[#E5E7EB]/50 last:border-0">{wk.label}</div>
              ))}
            </div>

            {/* Rows */}
            <div className="divide-y divide-[#E5E7EB] text-xs">
              {sortItems(items).map(item => {
                const timeline = getTimelineOffsets(item.dateRange || '');
                return (
                  <div key={item.id} className="grid grid-cols-12 h-11 items-center px-4 hover:bg-[#F9FAFB]/40 transition-colors">
                    
                    {/* Left Column Task Info */}
                    <div className="col-span-5 border-r border-[#E5E7EB] h-full flex items-center pr-4 truncate gap-2 relative">
                      <span className="font-mono text-[10px] text-[#6B7280] w-24 shrink-0">{item.id}</span>
                      <span className="truncate font-semibold text-[#111827]">{item.title}</span>
                    </div>

                    {/* Gantt Axis (cols 6-12) */}
                    <div className="col-span-7 grid grid-cols-7 h-full relative items-center px-2">
                      {[...Array(7)].map((_, i) => (
                        <div key={i} className="absolute top-0 bottom-0 border-r border-[#F3F4F6] last:border-0" style={{ left: `${(i + 1) * (100 / 7)}%` }} />
                      ))}

                      {/* Colored Gantt bar */}
                      <div 
                        className={`h-5 rounded-[4px] border px-2.5 flex items-center truncate text-[10px] font-bold ${timeline.color}`}
                        style={{ 
                          gridColumnStart: timeline.start, 
                          gridColumnEnd: timeline.start + timeline.span 
                        }}
                      >
                        <span className="truncate">{item.dueDate || 'Scheduled'}</span>
                      </div>
                    </div>

                  </div>
                );
              })}
            </div>
          </div>
        </div>
      );
    }

    // currentView === 'calendar'
    const calendarDays = Array.from({ length: 31 }, (_, i) => i + 1);
    return (
      <div className="p-5 space-y-4 select-none max-w-full overflow-x-auto">
        <div className="min-w-[650px] bg-white border border-[#E5E7EB] rounded-[8px] overflow-hidden">
          {/* Calendar Header Month */}
          <div className="h-10 px-4 bg-[#F9FAFB] border-b border-[#E5E7EB] flex items-center justify-between text-xs font-bold text-[#111827]">
            <span>March 2026</span>
            <span className="text-[10px] text-[#9CA3AF] font-normal uppercase">Monthly view</span>
          </div>

          {/* Weekday Names Header */}
          <div className="grid grid-cols-7 border-b border-[#E5E7EB] bg-[#F9FAFB]/50 text-center py-2 text-[10px] font-bold text-[#6B7280]">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(d => <div key={d}>{d}</div>)}
          </div>

          {/* Days Grid */}
          <div className="grid grid-cols-7 grid-rows-5 divide-x divide-y divide-[#E5E7EB]">
            {calendarDays.map(day => {
              const dayTasks = getTasksForDay(day);
              return (
                <div key={day} className="h-24 p-2 bg-white flex flex-col justify-between hover:bg-[#F9FAFB]/40 transition-colors">
                  <span className="text-[11px] font-bold text-[#6B7280]">{day}</span>
                  
                  {/* Tasks on this day */}
                  <div className="flex-1 overflow-y-auto mt-1 space-y-1">
                    {dayTasks.map(t => (
                      <div 
                        key={t.id}
                        onClick={(e) => {
                          e.stopPropagation();
                          showToast(`Task: ${t.id} - ${t.title}`);
                        }}
                        className={`text-[8px] font-bold px-1.5 py-0.5 rounded border truncate cursor-pointer leading-tight ${t.completed ? 'bg-green-50 text-green-700 border-green-200 line-through' : 'bg-orange-50 text-orange-700 border-orange-200'}`}
                        title={`${t.id}: ${t.title}`}
                      >
                        {t.id}
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  };

  return (
    <DashboardShell
      onOpenNewItemModal={() => setIsNewItemModalOpen(true)}
      toastMessage={toastMessage}
      setToastMessage={setToastMessage}
    >
      <div className="flex-1 flex flex-col items-stretch animate-none">

        {/* Workspace Breadcrumb Header */}
        <div className="h-11 px-4 border-b border-[#E5E7EB] bg-white flex items-center justify-between shrink-0 select-none">
          <div className="flex items-center gap-2 text-xs font-semibold text-[#6B7280]">
            <SidebarToggleButton />
            <span>{projectName}</span>
            <IconChevronRight />
            <span className="text-[#111827]">Work Items</span>
            <span className="ml-1 px-1.5 py-0.5 bg-[#F3F4F6] text-[#4B5563] text-[10px] font-bold rounded-full">
              {items.length}
            </span>
          </div>

          {/* Action Row */}
          <div className="flex items-center gap-2 select-none">
            {/* View selectors */}
            <div className="flex items-center border border-[#E5E7EB] rounded-[6px] p-0.5 bg-[#F9FAFB] gap-0.5">
              <button 
                onClick={() => changeView('list')}
                className={`p-1 rounded-[4px] transition-colors cursor-pointer ${currentView === 'list' ? 'bg-white border border-[#E5E7EB] text-[#111827]' : 'hover:bg-white/50 text-[#6B7280]'}`} 
                title="List view"
              >
                <IconList className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => changeView('board')}
                className={`p-1 rounded-[4px] transition-colors cursor-pointer ${currentView === 'board' ? 'bg-white border border-[#E5E7EB] text-[#111827]' : 'hover:bg-white/50 text-[#6B7280]'}`} 
                title="Board view"
              >
                <IconLayout className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => changeView('calendar')}
                className={`p-1 rounded-[4px] transition-colors cursor-pointer ${currentView === 'calendar' ? 'bg-white border border-[#E5E7EB] text-[#111827]' : 'hover:bg-white/50 text-[#6B7280]'}`} 
                title="Calendar view"
              >
                <IconCalendar />
              </button>
              <button
                onClick={() => changeView('table')}
                className={`p-1 rounded-[4px] transition-colors cursor-pointer ${currentView === 'table' ? 'bg-white border border-[#E5E7EB] text-[#111827]' : 'hover:bg-white/50 text-[#6B7280]'}`} 
                title="Table view"
              >
                <IconTableLayout className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => changeView('timeline')}
                className={`p-1 rounded-[4px] transition-colors cursor-pointer ${currentView === 'timeline' ? 'bg-white border border-[#E5E7EB] text-[#111827]' : 'hover:bg-white/50 text-[#6B7280]'}`} 
                title="Timeline view"
              >
                <IconTimeline className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Display options dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsDisplayDropdownOpen(prev => !prev)}
                className="h-7 px-3 border border-[#E5E7EB] hover:bg-[#F9FAFB] text-xs font-semibold text-[#6B7280] hover:text-[#111827] rounded-[6px] transition-colors cursor-pointer flex items-center gap-1"
              >
                <span>Display</span>
                <IconChevronDown />
              </button>
              
              {isDisplayDropdownOpen && (
                <div className="absolute right-0 mt-1 w-48 bg-white border border-[#E5E7EB] rounded-[6px] py-1.5 z-30 premium-popover text-left">
                  <div className="px-3 py-1 text-[9px] font-bold text-[#9CA3AF] uppercase tracking-wider">Group by</div>
                  {(['status', 'assignee', 'none'] as const).map(group => (
                    <button
                      key={group}
                      onClick={() => {
                        setGroupBy(group);
                        setIsDisplayDropdownOpen(false);
                        showToast(`Grouped by ${group}`);
                      }}
                      className="w-full text-left px-3 py-1 hover:bg-[#F9FAFB] text-xs text-[#111827] flex items-center justify-between"
                    >
                      <span className="capitalize">{group}</span>
                      {groupBy === group && <IconSuccess />}
                    </button>
                  ))}
                  <div className="border-t border-[#E5E7EB] my-1"></div>
                  <div className="px-3 py-1 text-[9px] font-bold text-[#9CA3AF] uppercase tracking-wider">Sort by</div>
                  {(['id', 'title', 'date'] as const).map(sort => (
                    <button
                      key={sort}
                      onClick={() => {
                        setSortBy(sort);
                        setIsDisplayDropdownOpen(false);
                        showToast(`Sorted by ${sort}`);
                      }}
                      className="w-full text-left px-3 py-1 hover:bg-[#F9FAFB] text-xs text-[#111827] flex items-center justify-between"
                    >
                      <span className="capitalize">{sort}</span>
                      {sortBy === sort && <IconSuccess />}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <button
              onClick={() => router.push('/profile')}
              className="h-7 px-3 border border-[#E5E7EB] hover:bg-[#F9FAFB] text-xs font-semibold text-[#6B7280] hover:text-[#111827] rounded-[6px] transition-colors cursor-pointer"
            >
              Analytics
            </button>
            <button
              onClick={() => setIsNewItemModalOpen(true)}
              className="h-7 px-3 bg-[#0369A1] hover:bg-[#0284C7] text-white text-xs font-semibold rounded-[6px] transition-colors cursor-pointer"
            >
              Add work item
            </button>
          </div>
        </div>

        {/* Main Contents (switchable based on currentView) */}
        <div className="flex-1 overflow-y-auto">
          {renderViewContent()}
        </div>

      </div>

      {/* ==========================================
          MODAL: CREATE NEW WORK ITEM
          ========================================== */}
      {isNewItemModalOpen && (
        <div className="fixed inset-0 bg-black/10 backdrop-blur-[1px] flex items-center justify-center z-50 p-4">
          <div className="w-full max-w-[480px] bg-white border border-[#E5E7EB] rounded-[6px] flex flex-col premium-popover">

            <div className="h-10 px-4 border-b border-[#E5E7EB] flex items-center justify-between bg-[#F9FAFB] text-xs font-semibold text-[#6B7280] select-none">
              <span>Create Work Item</span>
              <button
                onClick={() => setIsNewItemModalOpen(false)}
                className="hover:text-[#111827] text-sm cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateWorkItem} className="p-4 space-y-4">
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-[#6B7280] uppercase tracking-wider">Ticket ID (Optional)</label>
                <input
                  type="text"
                  placeholder={`e.g. ${activeProjectId === 'magangumra' ? 'MAGANGUMRA-185' : `${activeProjectId.toUpperCase()}-${items.length + 1}`}`}
                  value={newId}
                  onChange={(e) => setNewId(e.target.value)}
                  className="w-full h-8 px-2.5 bg-[#F9FAFB] border border-[#E5E7EB] rounded-[6px] text-xs focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#0369A1] transition-all font-medium text-[#111827]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold text-[#6B7280] uppercase tracking-wider">Work Item Title</label>
                <input
                  type="text"
                  placeholder="What needs to be done?"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full h-8 px-2.5 bg-[#F9FAFB] border border-[#E5E7EB] rounded-[6px] text-xs focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#0369A1] transition-all font-medium text-[#111827]"
                  required
                  autoFocus
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold text-[#6B7280] uppercase tracking-wider">Status</label>
                <select
                  value={newStatus}
                  onChange={(e: any) => setNewStatus(e.target.value)}
                  className="w-full h-8 px-2.5 bg-[#F9FAFB] border border-[#E5E7EB] rounded-[6px] text-xs focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#0369A1] transition-all font-medium text-[#111827]"
                >
                  <option value="backlog">Backlog</option>
                  <option value="todo">Todo</option>
                  <option value="inprogress">In Progress</option>
                  <option value="completed">Done</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>

              <div className="pt-2 flex items-center justify-end gap-2 text-xs select-none">
                <button
                  type="button"
                  onClick={() => setIsNewItemModalOpen(false)}
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
    </DashboardShell>
  );
}

// Render clean rows based on mock parameters
function renderMockRow(id: string, title: string, date: string, assignees: string[], icon: 'chart' | 'calendar') {
  return (
    <div key={id} className="flex items-center justify-between h-[38px] px-3.5 hover:bg-[#F9FAFB] transition-colors text-xs select-none">
      <div className="flex items-center gap-3 flex-1 min-w-0 mr-4">
        <div className="shrink-0 flex items-center"><IconSuccess /></div>

        {icon === 'chart' ? <IconChartProject /> : <IconCalendar />}

        <span className="text-[11px] text-[#6B7280] font-mono shrink-0 select-all tracking-normal w-28">{id}</span>
        <span className="truncate font-medium text-[#9CA3AF] line-through">{title}</span>

        <span className="px-2 py-0.5 rounded-full text-[9px] font-bold bg-[#E5E7EB]/50 text-[#4B5563] uppercase border border-transparent leading-tight ml-2">Done</span>
      </div>

      <div className="flex items-center gap-3 shrink-0 text-[#6B7280]">
        <IconTag />
        <span className="text-[11px] text-[#9CA3AF] font-medium font-mono select-none">{date}</span>

        <div className="flex items-center -space-x-1 ml-1">
          {assignees.map((init, index) => (
            <div
              key={index}
              className="w-4.5 h-4.5 rounded-full border border-white bg-[#0369A1] text-white flex items-center justify-center text-[7px] font-bold shrink-0"
            >
              {init}
            </div>
          ))}
        </div>

        <button className="p-1 hover:bg-[#F3F4F6] rounded">
          <IconDots />
        </button>
      </div>
    </div>
  );
}

// Render row helper for react items state
function renderRow(item: WorkItem, onToggle: (id: string) => void, onDelete: (id: string, e: React.MouseEvent) => void) {
  const isDone = item.status === 'completed' || item.completed;
  return (
    <div
      key={item.id}
      onClick={() => onToggle(item.id)}
      className="group flex items-center justify-between h-[38px] px-3.5 hover:bg-[#F9FAFB] transition-colors cursor-pointer text-xs"
    >
      <div className="flex items-center gap-3 flex-1 min-w-0 mr-4">
        <div className="shrink-0 flex items-center">
          {isDone ? <IconSuccess /> : <IconCircle />}
        </div>

        {item.projectBadge && (
          <div className="shrink-0 flex items-center">
            {item.projectBadge === 'chart' ? <IconChartProject /> : <IconCalendar />}
          </div>
        )}

        <span className="text-[11px] text-[#6B7280] font-mono shrink-0 select-all tracking-normal w-28">{item.id}</span>

        <span className={`truncate font-medium text-[#111827] ${isDone ? 'line-through text-[#9CA3AF]' : ''}`}>
          {item.title}
        </span>

        <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold uppercase leading-tight ml-2 border ${isDone ? 'bg-[#E5E7EB]/50 text-[#4B5563] border-transparent' : 'bg-orange-50 text-orange-600 border-orange-100'}`}>
          {isDone ? 'Done' : item.status.toUpperCase()}
        </span>
      </div>

      <div className="flex items-center gap-3 shrink-0 text-[#6B7280]">
        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-75 flex items-center">
          <button
            onClick={(e) => onDelete(item.id, e)}
            className="p-1 hover:bg-[#EF4444]/10 rounded text-[#EF4444] cursor-pointer"
            title="Delete Item"
          >
            <IconTrash />
          </button>
        </div>

        <IconTag />
        <span className="text-[11px] text-[#9CA3AF] font-medium font-mono select-none">{item.dateRange || 'Mar 13 - 13, 2026'}</span>

        <div className="flex items-center -space-x-1 ml-1 select-none">
          {item.assignees.map((init, index) => (
            <div
              key={index}
              className="w-4.5 h-4.5 rounded-full border border-white bg-[#0369A1] text-white flex items-center justify-center text-[7px] font-bold shrink-0"
              title={`Assignee: ${init}`}
            >
              {init}
            </div>
          ))}
        </div>

        <button className="p-1 hover:bg-[#F3F4F6] rounded select-none">
          <IconDots />
        </button>
      </div>
    </div>
  );
}
